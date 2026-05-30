import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['erbusiness0422@gmail.com'])
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

// Cache 30 min
let cache: { data: unknown; expiresAt: number } | null = null
const CACHE_TTL_MS = 30 * 60 * 1000

export async function GET(request: Request) {
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

  const url = new URL(request.url)
  const forceRefresh = url.searchParams.get('refresh') === '1'
  if (!forceRefresh && cache && cache.expiresAt > Date.now()) {
    return NextResponse.json({ ...cache.data as Record<string, unknown>, cached: true })
  }

  const GROQ_KEY = process.env.GROQ_API_KEY
  if (!GROQ_KEY) return NextResponse.json({ error: 'GROQ_API_KEY não configurada' }, { status: 500 })

  const admin = getSupabaseAdminClient()

  type Feedback = { id: string; type: string; score: number | null; message: string | null; created_at: string }
  const { data: feedbacks, error: fbErr } = await admin
    .from('sea_feedback')
    .select('id, type, score, message, created_at')
    .not('message', 'is', null)
    .order('created_at', { ascending: false })
    .limit(100)

  if (fbErr) return NextResponse.json({ error: `feedbacks: ${fbErr.message}` }, { status: 500 })

  const valid = ((feedbacks ?? []) as Feedback[]).filter((f) => (f.message ?? '').trim().length > 3)

  if (valid.length === 0) {
    const empty = {
      summary: 'Sem feedbacks ainda — cadê os usuários pra perguntar?',
      sentiment_distribution: { positive: 0, neutral: 0, negative: 0 },
      top_themes: [],
      critical: [],
      praise: [],
      generatedAt: new Date().toISOString(),
      total: 0,
      cached: false,
    }
    cache = { data: empty, expiresAt: Date.now() + CACHE_TTL_MS }
    return NextResponse.json(empty)
  }

  const systemPrompt = `Você é um analista de Customer Insights especializado em early-stage SaaS de saúde no Brasil.

Sua função: ler comentários de feedback/NPS do IPB (app pra fisioterapeutas intensivistas) e devolver análise estruturada.

REGRAS:
- Português brasileiro técnico mas direto
- Classifica cada comentário em: positive (elogio/feature loved), neutral (pergunta/observação), negative (crítica/bug)
- Identifica TEMAS recorrentes (no máximo 6 temas únicos)
- Foque em sinais de churn ou validation
- Tom: consultor sênior, não otimista falso

RETORNE JSON ESTRITO (sem markdown):
{
  "summary": "1 frase resumindo o sentimento geral (máx 80 chars)",
  "sentiment_distribution": { "positive": N, "neutral": N, "negative": N },
  "top_themes": [
    { "theme": "nome curto do tema (2-4 palavras)", "count": N, "tone": "positive|neutral|negative", "sample": "exemplo curto de comentário (máx 60 chars)" }
  ],
  "critical": [
    { "id": "feedback id", "excerpt": "trecho relevante (máx 80 chars)", "severity": "high|medium" }
  ],
  "praise": [
    { "id": "feedback id", "excerpt": "trecho elogioso (máx 80 chars)" }
  ]
}

Máximo 4 críticos, 3 elogios. Se zero feedbacks negativos, critical = [].`

  const feedbackList = valid.map((f) => {
    return `id=${f.id} | type=${f.type} | score=${f.score ?? 'n/a'} | data=${f.created_at.slice(0,10)}\n"${(f.message ?? '').slice(0, 400)}"`
  }).join('\n\n')

  const userPrompt = `${valid.length} feedbacks do IPB (mais recentes primeiro):

${feedbackList}

Analisa e devolve o JSON.`

  let aiData: Record<string, unknown>
  try {
    const groqRes = await fetch(GROQ_API, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 2000,
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
    total: valid.length,
    generatedAt: new Date().toISOString(),
    cached: false,
  }
  cache = { data: result, expiresAt: Date.now() + CACHE_TTL_MS }

  return NextResponse.json(result)
}
