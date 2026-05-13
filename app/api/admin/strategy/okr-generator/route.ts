import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com'])
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

let cache: { data: unknown; expiresAt: number } | null = null
const CACHE_TTL_MS = 60 * 60 * 1000

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
  const force = url.searchParams.get('refresh') === '1'
  if (!force && cache && cache.expiresAt > Date.now()) {
    return NextResponse.json({ ...cache.data as Record<string, unknown>, cached: true })
  }

  const GROQ_KEY = process.env.GROQ_API_KEY
  if (!GROQ_KEY) return NextResponse.json({ error: 'GROQ_API_KEY não configurada' }, { status: 500 })

  // Reúne estado pra dar contexto ao IA
  const admin = getSupabaseAdminClient()
  const [stateRes, profilesRes, subsRes] = await Promise.all([
    admin.rpc('admin_get_strategic_state'),
    admin.from('profiles').select('id').not('role', 'eq', 'admin'),
    admin.from('subscriptions').select('id, status'),
  ])

  type StateRow = { key: string; value: Record<string, unknown> }
  const state: Record<string, unknown> = {}
  ;(stateRes.data as StateRow[] ?? []).forEach((r) => { state[r.key] = r.value })

  const totalUsers = (profilesRes.data ?? []).length
  const activeSubs = ((subsRes.data ?? []) as Array<{ status: string }>).filter((s) => s.status === 'active').length

  const ctx = {
    trl: state.trl,
    hype_cycle: state.hype_cycle,
    phase: state.phase,
    users: totalUsers,
    active_subs: activeSubs,
    mrr: ((state.financials as Record<string, unknown> | undefined)?.mrr ?? 0),
  }

  const systemPrompt = `Você é um Chief of Staff de healthtech early-stage no Brasil. Sua função: gerar OKRs trimestrais ambiciosos e mensuráveis pro SEA FISIO (SaaS clínico pra fisioterapeutas intensivistas).

REGRAS:
- 2 Objetivos no máximo (aspiracional, qualitativo, ≤ 12 palavras)
- 3 KRs por objetivo (mensurável, com número e prazo, ≤ 20 palavras)
- KRs devem ser AMBICIOSOS (70% de execução já é sucesso)
- Adapte ao TRL/fase atual — em validação foque em PRIMEIROS CLIENTES, não em escala
- Tom: consultor sênior, sem rodeios

RETORNE JSON (sem markdown):
{
  "horizon": "Q3 2026",
  "rationale": "1 frase explicando porque esses OKRs fazem sentido NA FASE ATUAL (máx 80 chars)",
  "objectives": [
    {
      "id": 1,
      "title": "objetivo 1 (qualitativo, aspiracional)",
      "key_results": [
        { "id": 1, "kr": "KR 1 com número e prazo" },
        { "id": 2, "kr": "KR 2 com número e prazo" },
        { "id": 3, "kr": "KR 3 com número e prazo" }
      ]
    },
    { "id": 2, "title": "...", "key_results": [...] }
  ]
}`

  const userPrompt = `Estado SEA FISIO hoje:
- TRL: ${(ctx.trl as { level?: number })?.level ?? '?'} / 9 (${(ctx.trl as { label?: string })?.label ?? '?'})
- Hype Cycle: ${(ctx.hype_cycle as { label?: string })?.label ?? '?'}
- Fase: ${(ctx.phase as { label?: string })?.label ?? '?'}
- Usuários (excl. admin): ${ctx.users}
- Assinaturas ativas: ${ctx.active_subs}
- MRR atual: R$${ctx.mrr}

Gere OKRs realistas pra próximo trimestre. Foque em onde DÓI mais.`

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
        temperature: 0.5,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      }),
    })
    if (!groqRes.ok) {
      const errText = await groqRes.text()
      return NextResponse.json({ error: `Groq ${groqRes.status}: ${errText.slice(0, 200)}` }, { status: 500 })
    }
    const groqJson = await groqRes.json()
    aiData = JSON.parse(groqJson?.choices?.[0]?.message?.content ?? '{}')
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'AI fail' }, { status: 500 })
  }

  const result = {
    ...aiData,
    generatedAt: new Date().toISOString(),
    cached: false,
  }
  cache = { data: result, expiresAt: Date.now() + CACHE_TTL_MS }
  return NextResponse.json(result)
}
