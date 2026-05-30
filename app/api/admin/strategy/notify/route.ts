import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['erbusiness0422@gmail.com'])

// ─────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────
type NotificationLevel = 'info' | 'warning' | 'critical'

interface StrategicAlert {
  id: string
  level: NotificationLevel
  title: string
  message: string
  action?: string
  created_at: string
  read: boolean
}

// ─────────────────────────────────────────────────────────────
// GET — retorna alertas salvos no state
// ─────────────────────────────────────────────────────────────
export async function GET() {
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
  type StateRow = { key: string; value: unknown }
  const state: Record<string, unknown> = {}
  ;(stateRes as StateRow[] ?? []).forEach((r) => { state[r.key] = r.value })

  const alerts = (state.strategic_alerts as StrategicAlert[] | undefined) ?? []
  return NextResponse.json({ alerts })
}

// ─────────────────────────────────────────────────────────────
// POST — Analisa dados e gera alertas estratégicos automaticamente
// ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
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

  // Coleta estado e dados em paralelo
  const [stateRes, profilesRes, subsRes] = await Promise.all([
    admin.rpc('admin_get_strategic_state'),
    admin.from('profiles').select('id, created_at, last_login').not('role', 'eq', 'admin'),
    admin.from('subscriptions').select('id, status, started_at'),
  ])

  type StateRow = { key: string; value: unknown }
  const state: Record<string, unknown> = {}
  ;(stateRes.data as StateRow[] ?? []).forEach((r) => { state[r.key] = r.value })

  const profiles = (profilesRes.data ?? []) as Array<{ id: string; created_at: string; last_login: string | null }>
  const subs = (subsRes.data ?? []) as Array<{ id: string; status: string; started_at: string }>
  const activeSubs = subs.filter((s) => s.status === 'active').length
  const pricingFromState = ((state.financials as Record<string, unknown> | undefined)?.pricing as number | undefined) ?? 156
  const mrr = activeSubs * pricingFromState
  const totalUsers = profiles.length
  const trl = (state.trl as { level?: number } | undefined)?.level ?? 1
  const hypeStage = (state.hype_cycle as { stage_num?: number } | undefined)?.stage_num ?? 0
  const phase = (state.phase as { current?: string } | undefined)?.current ?? 'validacao'

  const newAlerts: StrategicAlert[] = []
  const now = new Date().toISOString()

  // ── ALERTA 1: Janela de mercado aberta mas sem receita ──
  if (trl >= 7 && (hypeStage === 3 || hypeStage === 4) && mrr === 0) {
    newAlerts.push({
      id: 'window-open-no-mrr',
      level: 'critical',
      title: '⚠️ Janela de Mercado Aberta · MRR R$0',
      message: 'Produto pronto (TRL 7+) + mercado receptivo, mas sem receita. Pare de construir, comece a vender.',
      action: 'Enviar proposta para os primeiros 3 leads quentes hoje.',
      created_at: now,
      read: false,
    })
  }

  // ── ALERTA 2: Usuários sem conversão ──
  if (totalUsers >= 5 && activeSubs === 0) {
    newAlerts.push({
      id: 'users-no-conversion',
      level: 'warning',
      title: '📊 Gap de Conversão Detectado',
      message: `${totalUsers} usuários cadastrados mas zero assinantes. Há um bloqueio no funil de vendas.`,
      action: 'Ligar para 5 usuários inativos e perguntar o que falta.',
      created_at: now,
      read: false,
    })
  }

  // ── ALERTA 3: Crescimento de usuários estagnado ──
  const newUsersLast7d = profiles.filter(
    (u) => Date.now() - new Date(u.created_at).getTime() < 7 * 86400000
  ).length
  if (totalUsers > 0 && newUsersLast7d === 0) {
    newAlerts.push({
      id: 'stagnant-growth',
      level: 'warning',
      title: '📉 Aquisição Parada',
      message: 'Nenhum novo usuário nos últimos 7 dias. O motor de crescimento está desligado.',
      action: 'Publicar conteúdo estratégico no LinkedIn hoje.',
      created_at: now,
      read: false,
    })
  }

  // ── ALERTA 4: MRR > 0 → Fase de crescimento ──
  if (mrr > 0 && phase === 'validacao') {
    newAlerts.push({
      id: 'first-revenue',
      level: 'info',
      title: '🚀 Primeira Receita Detectada!',
      message: `MRR R$${mrr} confirmado. Parabéns! É hora de sair do modo validação e entrar no modo crescimento.`,
      action: 'Ativar automação de onboarding e focar em retração de churn.',
      created_at: now,
      read: false,
    })
    // Trigger: atualiza fase automaticamente
    await admin.rpc('admin_update_strategic_state', {
      p_key: 'phase',
      p_value: { current: 'crescimento', label: 'Crescimento', goal_users: 100 }
    })
  }

  // ── ALERTA 5: TRL baixo ──
  if (trl < 5) {
    newAlerts.push({
      id: 'low-trl',
      level: 'info',
      title: '🔬 Produto em Fase de Desenvolvimento',
      message: `TRL ${trl}/9. Foco em validação técnica e testes com usuários reais antes de escalar.`,
      action: 'Completar ao menos 2 sessões de teste com usuário real esta semana.',
      created_at: now,
      read: false,
    })
  }

  // Salva alertas no strategic_state (sobrescreve)
  await admin.rpc('admin_update_strategic_state', {
    p_key: 'strategic_alerts',
    p_value: newAlerts
  })

  // Dispara webhook externo (Zoho / Slack / Email) se houver alertas críticos
  const criticalAlerts = newAlerts.filter((a) => a.level === 'critical')
  if (criticalAlerts.length > 0) {
    await dispatchWebhooks(criticalAlerts)
  }

  return NextResponse.json({ alerts: newAlerts, triggered: newAlerts.length })
}

// ─────────────────────────────────────────────────────────────
// PATCH — marca alerta como lido
// ─────────────────────────────────────────────────────────────
export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}))
  const alertId = body.id as string | undefined
  if (!alertId) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 })

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
  type StateRow = { key: string; value: unknown }
  const state: Record<string, unknown> = {}
  ;(stateRes as StateRow[] ?? []).forEach((r) => { state[r.key] = r.value })

  const alerts = ((state.strategic_alerts as StrategicAlert[] | undefined) ?? []).map((a) =>
    a.id === alertId ? { ...a, read: true } : a
  )

  await admin.rpc('admin_update_strategic_state', { p_key: 'strategic_alerts', p_value: alerts })
  return NextResponse.json({ ok: true })
}

// ─────────────────────────────────────────────────────────────
// Helper: dispara webhooks externos (Zoho/Slack/Email)
// ─────────────────────────────────────────────────────────────
async function dispatchWebhooks(alerts: StrategicAlert[]) {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL
  const emailTo = process.env.ALERT_EMAIL_TO ?? 'erbusiness0422@gmail.com'

  const payload = {
    text: alerts.map((a) => `*${a.title}*\n${a.message}\n✅ Ação: ${a.action ?? '—'}`).join('\n\n'),
    alerts,
  }

  // Webhook Genérico (Zoho Cliq, Slack, etc.)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (e) {
      console.error('[notify] webhook falhou:', e)
    }
  }

  // Email via Resend (se configurado)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'cockpit@sea-fisio.com.br',
          to: emailTo,
          subject: `🚨 [IPB Cockpit] ${alerts.length} Alerta(s) Crítico(s)`,
          html: `
            <h2>IPB · Alertas Estratégicos</h2>
            ${alerts.map((a) => `
              <div style="border-left:4px solid #f87171; padding:12px; margin-bottom:16px;">
                <strong>${a.title}</strong><br/>
                <p>${a.message}</p>
                ${a.action ? `<p>✅ <em>Ação recomendada: ${a.action}</em></p>` : ''}
              </div>
            `).join('')}
          `,
        }),
      })
    } catch (e) {
      console.error('[notify] email falhou:', e)
    }
  }
}
