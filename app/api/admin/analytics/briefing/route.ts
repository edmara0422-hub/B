import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['erbusiness0422@gmail.com'])
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

// Cache em memória (vive entre requests no mesmo cold container) — TTL 15 min
let cache: { data: unknown; expiresAt: number } | null = null
const CACHE_TTL_MS = 15 * 60 * 1000

export async function GET(request: Request) {
  // Verify admin
  try {
    const supa = await getSupabaseServerClient()
    const { data: { user }, error: userErr } = await supa.auth.getUser()
    if (userErr || !user) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    const callerEmail = (user.email ?? '').toLowerCase()
    const { data: profile } = await supa.from('profiles').select('role').eq('id', user.id).single()
    const isAllowed = profile?.role === 'admin' || ALWAYS_ADMIN_EMAILS.has(callerEmail)
    if (!isAllowed) return NextResponse.json({ error: 'Permissão negada.' }, { status: 403 })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'auth fail' }, { status: 500 })
  }

  // Force refresh via ?refresh=1
  const url = new URL(request.url)
  const forceRefresh = url.searchParams.get('refresh') === '1'

  // Return cache if fresh
  if (!forceRefresh && cache && cache.expiresAt > Date.now()) {
    return NextResponse.json({ ...cache.data as Record<string, unknown>, cached: true })
  }

  const GROQ_KEY = process.env.GROQ_API_KEY
  if (!GROQ_KEY) {
    return NextResponse.json({ error: 'GROQ_API_KEY não configurada no servidor' }, { status: 500 })
  }

  const admin = getSupabaseAdminClient()

  // Fetch telemetry data
  const [devicesRes, heatmapRes, feedRes, concurrentRes, geoRes] = await Promise.all([
    admin.rpc('admin_analytics_devices', { days_back: 30 }),
    admin.rpc('admin_analytics_hourly_heatmap', { days_back: 30 }),
    admin.rpc('admin_analytics_live_feed', { limit_n: 50 }),
    admin.rpc('admin_analytics_concurrent_24h'),
    admin.rpc('admin_analytics_geography', { days_back: 30 }),
  ])

  // Also fetch user counts + NPS + feedbacks for richer context
  const [usersRes, npsRes] = await Promise.all([
    admin.from('profiles').select('id, created_at, last_login, role').not('role', 'eq', 'admin'),
    admin.from('sea_feedback').select('type, score, message, created_at').order('created_at', { ascending: false }).limit(50),
  ])

  type DeviceRow = { device: string; count: number | string }
  type ConcurrentRow = { hour_bucket: string; unique_users: number | string }
  type FeedRow = { user_email: string | null; device: string; event_type: string; created_at: string }
  type GeoRow = { ip: string; city: string | null; country: string | null }
  type Profile = { id: string; created_at: string; last_login: string | null }
  type Feedback = { type: string; score: number | null; message: string | null; created_at: string }

  const devices = (devicesRes.data ?? []) as DeviceRow[]
  const concurrent = (concurrentRes.data ?? []) as ConcurrentRow[]
  const feed = (feedRes.data ?? []) as FeedRow[]
  const geography = (geoRes.data ?? []) as GeoRow[]
  const users = (usersRes.data ?? []) as Profile[]
  const feedbacks = (npsRes.data ?? []) as Feedback[]

  // Build context for AI
  const totalUsers = users.length
  const newLast7Days = users.filter((u) => u.created_at && Date.now() - new Date(u.created_at).getTime() < 7 * 86400000).length
  const activeLast7Days = users.filter((u) => u.last_login && Date.now() - new Date(u.last_login).getTime() < 7 * 86400000).length
  const totalEvents = feed.length
  const totalIps = geography.length
  const cities = [...new Set(geography.map((g) => g.city).filter(Boolean))]
  const npsScores = feedbacks.filter((f) => f.type === 'nps' && f.score !== null).map((f) => f.score as number)
  const npsCount = npsScores.length
  const promoters = npsScores.filter((s) => s >= 9).length
  const detractors = npsScores.filter((s) => s <= 6).length
  const npsNet = npsCount > 0 ? Math.round(((promoters - detractors) / npsCount) * 100) : null
  const feedbackTexts = feedbacks.filter((f) => f.message?.trim()).map((f) => f.message).slice(0, 10)
  const peakConcurrent = concurrent.reduce((max, c) => (Number(c.unique_users) > max ? Number(c.unique_users) : max), 0)
  const deviceSummary = devices.map((d) => `${d.device}: ${d.count}`).join(', ')

  const dateLabel = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

  const systemPrompt = `Você é um consultor estratégico em produtos SaaS de saúde, especialista em early-stage healthtech no Brasil.

Sua função: analisar a telemetria do IPB (app clínico para fisioterapeutas intensivistas) e gerar um briefing curto, direto e acionável.

REGRAS DURAS:
- Português brasileiro coloquial técnico
- Cada insight ≤ 30 palavras
- Use números reais que recebeu — não invente
- Tom: consultor sênior, sem rodeios, sem floreio
- Foque em ação, não em descrição
- Se dados são insuficientes (1 usuário), seja honesto e diga "fase de validação"

RETORNE JSON ESTRITO (não use markdown, não envolva em \`\`\`):
{
  "headline": "frase única de 1 linha resumindo o momento (máx 80 chars)",
  "mood": "ok" | "alert" | "win",
  "insights": [
    { "icon": "🎯|🚨|💡|🔥|📉|📈|🌍|👤", "title": "título curto (4-6 palavras)", "body": "ação concreta ou observação (máx 25 palavras)", "priority": "high"|"medium"|"low" }
  ],
  "next_action": "1 ação concreta pra fazer HOJE (máx 20 palavras)"
}

Mínimo 3, máximo 6 insights. Priorize: anomalias > oportunidades > problemas conhecidos.`

  const userPrompt = `Hoje é ${dateLabel}.

TELEMETRIA IPB — últimos 30 dias:
• Usuários cadastrados (sem admin): ${totalUsers}
• Novos últimos 7 dias: ${newLast7Days}
• Ativos últimos 7 dias: ${activeLast7Days}
• Pico de usuários simultâneos (24h): ${peakConcurrent}
• Total eventos no feed: ${totalEvents}
• Dispositivos: ${deviceSummary || 'sem dados'}
• IPs únicos: ${totalIps}
• Cidades detectadas: ${cities.join(', ') || 'aguardando geolocalização'}
• Feedbacks recebidos: ${feedbacks.length}
• NPS Score: ${npsNet === null ? 'sem dados' : `${npsNet} (${npsCount} avaliações)`}
${feedbackTexts.length > 0 ? `\nComentários recentes (até 10):\n${feedbackTexts.map((t) => `- "${t}"`).join('\n')}` : ''}

Gere o briefing estratégico. Foque em sinais claros, não em estatística rasa. Se com 1-2 usuários, pense em validação não em escala.`

  // Call Groq
  let aiData: { headline?: string; mood?: string; insights?: unknown[]; next_action?: string }
  try {
    const groqRes = await fetch(GROQ_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 1200,
        response_format: { type: 'json_object' },
      }),
    })
    if (!groqRes.ok) {
      const errText = await groqRes.text()
      return NextResponse.json({ error: `Groq ${groqRes.status}: ${errText.slice(0, 200)}` }, { status: 500 })
    }
    const groqJson = await groqRes.json()
    const content = groqJson?.choices?.[0]?.message?.content ?? '{}'
    aiData = JSON.parse(content)
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'AI fail' }, { status: 500 })
  }

  const result = {
    ...aiData,
    stats: {
      totalUsers,
      newLast7Days,
      activeLast7Days,
      peakConcurrent,
      npsNet,
      totalFeedbacks: feedbacks.length,
    },
    generatedAt: new Date().toISOString(),
    cached: false,
  }

  cache = { data: result, expiresAt: Date.now() + CACHE_TTL_MS }

  return NextResponse.json(result)
}
