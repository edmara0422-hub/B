import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['erbusiness0422@gmail.com'])

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

  // 1. Get user info (always present — last_sign_in_at is on auth.users)
  let lastSignIn: string | null = null
  try {
    const { data: userData, error: userErr } = await admin.auth.admin.getUserById(userId)
    if (!userErr && userData?.user) {
      lastSignIn = userData.user.last_sign_in_at ?? null
    }
  } catch { /* ignore */ }

  // 2. Audit log entries — via RPC (função SECURITY DEFINER no schema public)
  const sinceIso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const debug: { auditError?: string; sessionsError?: string; rawAuditCount?: number } = {}

  let events: AuditEvent[] = []
  try {
    const { data: auditRows, error: auditErr } = await admin.rpc('admin_get_user_audit', {
      target_user: userId,
      since_iso: sinceIso,
    })
    if (auditErr) debug.auditError = auditErr.message
    debug.rawAuditCount = auditRows?.length ?? 0
    events = (auditRows ?? []) as AuditEvent[]
  } catch (e) {
    debug.auditError = e instanceof Error ? e.message : 'audit rpc failed'
  }

  // 3. Sessions — via RPC
  let sessions: SessionRow[] = []
  try {
    const { data: sessionRows, error: sessionErr } = await admin.rpc('admin_get_user_sessions', {
      target_user: userId,
    })
    if (sessionErr) debug.sessionsError = sessionErr.message
    sessions = (sessionRows ?? []) as SessionRow[]
  } catch (e) {
    debug.sessionsError = e instanceof Error ? e.message : 'sessions rpc failed'
  }

  // 4. login_events — tabela própria capturando TODOS os logins (trigger + RPC client)
  type LoginEvent = { id: string; user_id: string; ip: string | null; user_agent: string | null; event_type: string; created_at: string }
  let loginEvents: LoginEvent[] = []
  try {
    const { data: leRows, error: leErr } = await admin.rpc('admin_get_login_events', {
      target_user: userId,
    })
    if (!leErr) loginEvents = (leRows ?? []) as LoginEvent[]
  } catch { /* ignore */ }

  // 5. presence — heartbeat real-time (client manda ping a cada 30s)
  type PresenceRow = { device_fingerprint: string; user_agent: string | null; last_seen: string }
  let presence: PresenceRow[] = []
  try {
    const { data: pRows, error: pErr } = await admin.rpc('admin_get_user_presence', {
      target_user: userId,
    })
    if (!pErr) presence = (pRows ?? []) as PresenceRow[]
  } catch { /* ignore */ }

  // Mescla audit (Supabase) + login_events (próprio) num histórico unificado
  const mergedEvents: AuditEvent[] = [
    ...events,
    ...loginEvents.map((le) => ({
      ip_address: le.ip,
      payload: {
        action: le.event_type,
        actor_id: le.user_id,
        traits: { user_agent: le.user_agent ?? undefined },
      },
      created_at: le.created_at,
    } as AuditEvent)),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const suspicion = computeSuspicion(mergedEvents, sessions)

  return NextResponse.json({
    lastSignIn,
    events: mergedEvents.slice(0, 50).map((e) => ({
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
    presence: presence.map((p) => ({
      device_fingerprint: p.device_fingerprint,
      device: parseUserAgent(p.user_agent),
      ua: p.user_agent,
      last_seen: p.last_seen,
    })),
    suspicion,
    debug,
  })
}