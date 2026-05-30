import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['erbusiness0422@gmail.com', 'edmara0422@gmail.com'])
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

  const systemPrompt = `Você é um Consultor Estratégico de IA especialista em Healthtechs e Edtechs Médicas, focado no IPB (Plataforma de Decisão Clínica e Estudo em Fisioterapia Intensiva).
Seu objetivo é analisar o progresso de validação clínica, uso dos simuladores, MRR e adesão de usuários para gerar um diagnóstico diário seco, direto, provocativo e focado em tração clínica.

DADOS ATUAIS DA PLATAFORMA:
- Maturidade do Sistema (TRL): ${(state.trl as any)?.level ?? 7} (${(state.trl as any)?.label ?? 'N/A'})
- Fase de Adoção: ${(state.phase as any)?.label ?? 'N/A'}
- Assinaturas Premium Ativas (B2C/B2B): ${activeSubs} (Faturamento MRR: R$${mrr})
- Fisioterapeutas Cadastrados (Total): ${totalUsers}
- Maturidade SGI Operacional: ${JSON.stringify(state.maturity_sgi ?? {})}
- Conformidade LGPD/Segurança: ${(state.readiness as any)?.score ?? 60}%

DIRETRIZES DO DIAGNÓSTICO:
- Gere uma "Pergunta do Dia" que ataque o maior gap real (ex: falta de vendas Premium, engajamento nos simuladores, validação das calculadoras de VM por profissionais seniores na UTI, etc.).
- Gere uma "Ação de Hoje" super prática e focada no avanço do produto ou atração de fisioterapeutas (máx 100 caracteres).
- Tom: Fundador experiente, profissional de saúde experiente e pragmático.
- EQUILÍBRIO: Se temos o produto com calculadoras prontas (TRL 7+) e receita R$0, desafie o medo de cobrar dos fisioterapeutas intensivistas e proponha ações de conversão ativa dos trials.

RETORNE APENAS JSON (sem markdown):
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
