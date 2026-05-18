import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com', 'edmara0422@gmail.com'])

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

  // Em paralelo: strategic state + financials computados a partir do banco
  const [stateRes, profilesRes, subsRes, loginEventsRes, feedbacksRes] = await Promise.all([
    admin.rpc('admin_get_strategic_state'),
    admin.from('profiles').select('id, role, created_at, last_login').not('role', 'eq', 'admin'),
    admin.from('subscriptions').select('id, user_id, plan, status, started_at, expires_at, cancelled_at'),
    admin.from('login_events').select('user_id, created_at').gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString()),
    admin.from('sea_feedback').select('id, type, score, message, created_at'),
  ])

  type StateRow = { key: string; value: Record<string, unknown>; updated_at: string }
  const state: Record<string, unknown> = {}
  ;(stateRes.data as StateRow[] ?? []).forEach((r) => { state[r.key] = r.value })

  type Profile = { id: string; role: string | null; created_at: string; last_login: string | null }
  type Sub = { id: string; user_id: string; plan: string; status: string; started_at: string; expires_at: string | null; cancelled_at: string | null }
  type LoginEvent = { user_id: string; created_at: string }
  type Feedback = { id: string; type: string; score: number | null; message: string | null; created_at: string }

  const profiles = (profilesRes.data ?? []) as Profile[]
  const subs = (subsRes.data ?? []) as Sub[]
  const loginEvents = (loginEventsRes.data ?? []) as LoginEvent[]
  const feedbacks = (feedbacksRes.data ?? []) as Feedback[]

  // Computar financials reais
  const activeSubs = subs.filter((s) => s.status === 'active')
  const trialSubs = subs.filter((s) => s.status === 'trial')
  const cancelledSubs = subs.filter((s) => s.status === 'cancelled')
  const pricingFromState = ((state.financials as Record<string, unknown> | undefined)?.pricing as number | undefined) ?? 156
  const mrr = activeSubs.length * pricingFromState
  const arr = mrr * 12
  const totalUsers = profiles.length
  const last7d = profiles.filter((u) => u.last_login && Date.now() - new Date(u.last_login).getTime() < 7 * 86400000).length
  const last30d = profiles.filter((u) => u.last_login && Date.now() - new Date(u.last_login).getTime() < 30 * 86400000).length
  const newLast30d = profiles.filter((u) => Date.now() - new Date(u.created_at).getTime() < 30 * 86400000).length

  // Churn proxy = cancelados / (cancelados + ativos)
  const churnRate = activeSubs.length + cancelledSubs.length > 0
    ? Math.round((cancelledSubs.length / (activeSubs.length + cancelledSubs.length)) * 100)
    : 0

  // Engajamento: % de usuários que logaram nos últimos 7 dias
  const dau7d = totalUsers > 0 ? Math.round((last7d / totalUsers) * 100) : 0
  const dau30d = totalUsers > 0 ? Math.round((last30d / totalUsers) * 100) : 0

  // NPS Net
  const npsScores = feedbacks.filter((f) => f.type === 'nps' && f.score !== null).map((f) => f.score as number)
  const promoters = npsScores.filter((s) => s >= 9).length
  const detractors = npsScores.filter((s) => s <= 6).length
  const npsNet = npsScores.length > 0 ? Math.round(((promoters - detractors) / npsScores.length) * 100) : null

  // Eventos de telemetria nos últimos 30 dias
  const eventsLast30d = loginEvents.length

  // Compliance score — checa se documentos legais existem em arquivos do projeto seria caro,
  // então usamos config do strategic_state ou flags manuais. Aqui usa estado salvo.
  type ComplianceState = { lgpd: boolean; privacy: boolean; terms: boolean; cookies: boolean; dpo: boolean; canal_denuncias: boolean }
  const complianceState = (state.compliance as ComplianceState | undefined) ?? {
    lgpd: false, privacy: false, terms: false, cookies: false, dpo: false, canal_denuncias: false,
  }
  const complianceTotal = Object.values(complianceState).filter(Boolean).length
  const complianceMax = Object.values(complianceState).length

  return NextResponse.json({
    state, // trl, hype_cycle, phase, financials, adoption_trail, sprint_alpha, weekly_checks
    cockpit: {
      financials: {
        mrr,
        arr,
        pricing: pricingFromState,
        active_subs: activeSubs.length,
        trial_subs: trialSubs.length,
        cancelled_subs: cancelledSubs.length,
        churn_rate_pct: churnRate,
        runway_months: 0, // sem despesas mapeadas — pode ser preenchido em strategic_state
      },
      users: {
        total: totalUsers,
        new_30d: newLast30d,
        active_7d: last7d,
        active_30d: last30d,
        dau7d_pct: dau7d,
        dau30d_pct: dau30d,
      },
      engagement: {
        events_30d: eventsLast30d,
        feedbacks: feedbacks.length,
        nps_net: npsNet,
      },
      compliance: {
        score: complianceTotal,
        max: complianceMax,
        items: complianceState,
      },
    },
    timestamp: new Date().toISOString(),
  })
}
