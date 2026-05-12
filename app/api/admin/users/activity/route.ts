import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com'])

type AuditEvent = {
  ip_address: string | null
  payload: { action?: string; actor_id?: string; actor_username?: string; traits?: { user_agent?: string } } | null
  created_at: string
}

type SessionRow = {
  id: string
  user_id: string
  created_at: string
  updated_at: string | null
  user_agent: string | null
  ip: string | null
  not_after: string | null
}

// Parse user-agent string into friendly device label
function parseUserAgent(ua: string | null | undefined): string {
  if (!ua) return 'Desconhecido'
  const lower = ua.toLowerCase()
  let device = 'Desconhecido'
  let browser = ''
  if (/iphone/.test(lower)) device = 'iPhone'
  else if (/ipad/.test(lower)) device = 'iPad'
  else if (/android/.test(lower)) device = 'Android'
  else if (/macintosh|mac os x/.test(lower)) device = 'Mac'
  else if (/windows/.test(lower)) device = 'Windows'
  else if (/linux/.test(lower)) device = 'Linux'

  if (/edg\//.test(lower)) browser = 'Edge'
  else if (/chrome/.test(lower) && !/edg/.test(lower)) browser = 'Chrome'
  else if (/firefox/.test(lower)) browser = 'Firefox'
  else if (/safari/.test(lower) && !/chrome/.test(lower)) browser = 'Safari'

  return browser ? `${device} · ${browser}` : device
}

// Suspicion score:
// - 3+ unique IPs in 24h → yellow
// - 2+ active sessions with different IPs → red
// - 5+ login events in 1h → red
function computeSuspicion(events: AuditEvent[], sessions: SessionRow[]): { level: 'ok' | 'medium' | 'high'; reasons: string[] } {
  const reasons: string[] = []
  let level: 'ok' | 'medium' | 'high' = 'ok'

  const now = Date.now()
  const day = 24 * 60 * 60 * 1000
  const hour = 60 * 60 * 1000

  const eventsLast24h = events.filter((e) => now - new Date(e.created_at).getTime() < day)
  const uniqueIps24h = new Set(eventsLast24h.map((e) => e.ip_address).filter(Boolean))
  if (uniqueIps24h.size >= 3) {
    reasons.push(`${uniqueIps24h.size} IPs distintos em 24h`)
    level = 'medium'
  }

  const loginsLastHour = events.filter(
    (e) => e.payload?.action === 'login' && now - new Date(e.created_at).getTime() < hour,
  )
  if (loginsLastHour.length >= 5) {
    reasons.push(`${loginsLastHour.length} logins em 1h`)
    level = 'high'
  }

  const activeIps = new Set(sessions.map((s) => s.ip).filter(Boolean))
  if (activeIps.size >= 2) {
    reasons.push(`${activeIps.size} sessões ativas em IPs distintos`)
    level = 'high'
  }

  return { level, reasons }
}

export async function POST(request: Request) {
  let body: { userId?: unknown } = {}
  try {
    body = (await request.json()) as { userId?: unknown }
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const userId = typeof body.userId === 'string' ? body.userId : ''
  if (!userId) return NextResponse.json({ error: 'userId obrigatório' }, { status: 400 })

  // Verify caller is admin
  try {
    const supa = await getSupabaseServerClient()
    const { data: { user }, error: userErr } = await supa.auth.getUser()
    if (userErr || !user) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    const callerEmail = (user.email ?? '').toLowerCase()
    const { data: profile } = await supa.from('profiles').select('role').eq('id', user.id).single()
    const isAllowed = profile?.role === 'admin' || ALWAYS_ADMIN_EMAILS.has(callerEmail)
    if (!isAllowed) return NextResponse.json({ error: 'Permissão negada.' }, { status: 403 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Falha ao verificar identidade.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  // Use admin client to read auth schema tables
  const admin = getSupabaseAdminClient()

  // Audit log entries — last 30 days, max 50
  const sinceIso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const { data: auditRows, error: auditErr } = await admin
    .schema('auth')
    .from('audit_log_entries')
    .select('ip_address, payload, created_at')
    .gte('created_at', sinceIso)
    .order('created_at', { ascending: false })
    .limit(200)

  if (auditErr) {
    return NextResponse.json({ error: `audit: ${auditErr.message}` }, { status: 500 })
  }

  // Filter audit by actor_id matching userId (the payload has actor_id)
  const events: AuditEvent[] = (auditRows ?? []).filter((r) => {
    const p = r.payload as AuditEvent['payload']
    return p?.actor_id === userId
  }) as AuditEvent[]

  // Sessions — active for this user
  const { data: sessionRows, error: sessionErr } = await admin
    .schema('auth')
    .from('sessions')
    .select('id, user_id, created_at, updated_at, user_agent, ip, not_after')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (sessionErr) {
    return NextResponse.json({ error: `sessions: ${sessionErr.message}` }, { status: 500 })
  }

  const sessions: SessionRow[] = sessionRows ?? []
  const suspicion = computeSuspicion(events, sessions)

  return NextResponse.json({
    events: events.slice(0, 50).map((e) => ({
      action: e.payload?.action ?? 'unknown',
      ip: e.ip_address ?? null,
      device: parseUserAgent(e.payload?.traits?.user_agent),
      ua: e.payload?.traits?.user_agent ?? null,
      created_at: e.created_at,
    })),
    sessions: sessions.map((s) => ({
      id: s.id,
      ip: s.ip,
      device: parseUserAgent(s.user_agent),
      ua: s.user_agent,
      created_at: s.created_at,
      updated_at: s.updated_at,
      not_after: s.not_after,
    })),
    suspicion,
  })
}
