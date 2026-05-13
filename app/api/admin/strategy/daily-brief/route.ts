import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com'])
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

export async function GET(request: Request) {
  // Auth
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

  const admin = getSupabaseAdminClient()
  
  // Tenta pegar o brief atual do strategic_state (chave daily_brief)
  const { data: stateRes } = await admin.rpc('admin_get_strategic_state')
  type StateRow = { key: string; value: Record<string, unknown>; updated_at: string }
  const state: Record<string, unknown> = {}
  ;(stateRes as StateRow[] ?? []).forEach((r) => { state[r.key] = r.value })

  const currentBrief = state.daily_brief as { question: string; action: string; created_at: string } | undefined
  
  // Se já existe um brief de hoje (mesmo dia), retorna ele. Se não, gera um novo.
  const today = new Date().toISOString().split('T')[0]
  if (currentBrief && currentBrief.created_at.startsWith(today)) {
    return NextResponse.json({ brief: currentBrief })
  }

  return generateBrief(admin, state)
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const force = body.force === true

  // Auth
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

  const admin = getSupabaseAdminClient()
  const { data: stateRes } = await admin.rpc('admin_get_strategic_state')
  const state: Record<string, unknown> = {}
  ;(stateRes as any[] ?? []).forEach((r) => { state[r.key] = r.value })

  return generateBrief(admin, state)
}

async function generateBrief(admin: any, state: Record<string, unknown>) {
  const GROQ_KEY = process.env.GROQ_API_KEY
  if (!GROQ_KEY) return NextResponse.json({ error: 'GROQ_API_KEY não configurada' }, { status: 500 })

  // Coleta estatísticas em tempo real
  const [profilesRes, subsRes] = await Promise.all([
    admin.from('profiles').select('id').not('role', 'eq', 'admin'),
    admin.from('subscriptions').select('id, status'),
  ])

  const totalUsers = (profilesRes.data ?? []).length
  const activeSubs = (subsRes.data ?? []).filter((s: any) => s.status === 'active').length
  const mrr = (state.financials as any)?.mrr ?? 0

  const systemPrompt = `Você é um Consultor Estratégico de IA (padrão IPB) para o SEA FISIO.
Seu objetivo é analisar os dados de TRL, Hype Cycle, MRR e Maturidade para gerar um diagnóstico diário seco, direto e provocativo.

DADOS ATUAIS:
- TRL: ${(state.trl as any)?.level ?? 1} (${(state.trl as any)?.label ?? 'N/A'})
- Hype Cycle: ${(state.hype_cycle as any)?.label ?? 'N/A'}
- Fase: ${(state.phase as any)?.label ?? 'N/A'}
- MRR: R$${mrr}
- Usuários: ${totalUsers} (Ativos: ${activeSubs})
- Maturidade SGI: ${JSON.stringify(state.maturity_sgi ?? {})}
- Prontidão Estrutural: ${(state.readiness as any)?.score ?? 60}%

DIRETRIZES:
- Gere uma "Pergunta do Dia" que ataque o maior gap estratégico real.
- Gere uma "Ação de Hoje" prática (max 100 caracteres).
- Tom: Fundador experiente e pragmático.
- EQUILÍBRIO: Se TRL >= 7 e MRR = 0, avalie: O problema é medo de vender (perfeccionismo) OU instabilidade na estrutura básica (erros críticos e falta de fundação)?
- Se a Prontidão Estrutural for baixa, priorize estabilização antes de vendas.

RETORNE JSON:
{
  "question": "...",
  "action": "..."
}`

  try {
    const res = await fetch(GROQ_API, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: systemPrompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    })
    const json = await res.json()
    const content = JSON.parse(json?.choices?.[0]?.message?.content ?? '{}')
    
    const newBrief = {
      ...content,
      created_at: new Date().toISOString(),
    }

    // Lógica de Gatilho (Trigger) Automático de Fase
    const currentPhase = (state.phase as any)?.current
    if (mrr > 0 && currentPhase === 'validacao') {
      const newPhase = { current: 'crescimento', label: 'Crescimento', goal_users: 100 }
      await admin.rpc('admin_update_strategic_state', { p_key: 'phase', p_value: newPhase })
      newBrief.action = `🚀 FASE ATUALIZADA: MRR > 0 Detectado! Mudamos para fase de Crescimento automaticamente.`
    }

    // Salva no strategic_state
    await admin.rpc('admin_update_strategic_state', { p_key: 'daily_brief', p_value: newBrief })

    return NextResponse.json({ brief: newBrief })
  } catch (e) {
    return NextResponse.json({ error: 'Falha na IA' }, { status: 500 })
  }
}
