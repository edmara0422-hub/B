import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com', 'edmara0422@gmail.com'])
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

let cache: { data: unknown; expiresAt: number } | null = null
const CACHE_TTL_MS = 60 * 60 * 1000

export async function POST(request: Request) {
  return handleRequest(request)
}

export async function GET(request: Request) {
  return handleRequest(request)
}

async function handleRequest(request: Request) {
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
  const force = url.searchParams.get('refresh') === '1' || request.method === 'POST'
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

  const systemPrompt = `Você é um Consultor Estratégico especialista em Edtechs de Saúde e Plataformas Clínicas Médicas no Brasil. Sua função: gerar OKRs trimestrais ambiciosos, práticos e mensuráveis pro IPB (Plataforma de Estudo Avançado e Suporte a Decisão em Fisioterapia Intensiva e UTI).

Seu foco estratégico deve ser:
1. VALIDAÇÃO CLÍNICA: Adoção das calculadoras (RSBI, complacência de vias aéreas, gasometria) e simuladores (ECG Cardiovascular, Ventilação Mecânica) por fisioterapeutas intensivistas na rotina diária de plantão na UTI.
2. ADESÃO E CRESCIMENTO: Conversão de profissionais de saúde da fase de teste gratuito (trial) para planos individuais Premium e atração de novas contas.
3. PARCERIAS INSTITUCIONAIS: Prospecção de universidades (para estudantes de fisioterapia) e hospitais/UTIs (para treinamento de equipes).

REGRAS:
- 2 Objetivos no máximo (qualitativo, aspiracional, com tom forte de crescimento clínico, ≤ 12 palavras)
- 3 Resultados-Chave (KRs) por objetivo (mensurável, com número claro e prazo, ≤ 20 palavras)
- KRs devem ser focados em métricas de uso clínico real (cálculos efetuados, simuladores rodados, feedbacks coletados, novas assinaturas)
- Tom: Fundador sênior, pragmático e focado em excelência clínica.

RETORNE APENAS JSON (sem markdown, sem blocos de código):
{
  "horizon": "Próximo Ciclo",
  "rationale": "Uma frase explicando o foco estratégico na fase de validação/crescimento clínico (máx 80 caracteres)",
  "objectives": [
    {
      "id": 1,
      "title": "objetivo 1 (qualitativo, focado em adesão/qualidade clínica)",
      "key_results": [
        { "id": 1, "kr": "KR 1 com número e prazo" },
        { "id": 2, "kr": "KR 2 com número e prazo" },
        { "id": 3, "kr": "KR 3 com número e prazo" }
      ]
    },
    { "id": 2, "title": "...", "key_results": [...] }
  ]
}`

  const userPrompt = `Estado IPB hoje:
- Maturidade do Sistema (TRL): ${(ctx.trl as { level?: number })?.level ?? 7} / 9 (${(ctx.trl as { label?: string })?.label ?? 'Produção real'})
- Fase Atual: ${(ctx.phase as { label?: string })?.label ?? 'Validação Alpha'}
- Fisioterapeutas Cadastrados: ${ctx.users}
- Assinantes Premium Ativos: ${ctx.active_subs}
- Receita Mensal Recorrente (MRR): R$${ctx.mrr}

Gere OKRs realistas e focados em tração clínica e pedagógica para o próximo trimestre.`

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
