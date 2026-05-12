import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com'])

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

  // Use admin to revoke all sessions for this user
  const admin = getSupabaseAdminClient()

  // signOut with scope 'global' invalidates all sessions for the user
  // Reference: https://supabase.com/docs/reference/javascript/auth-admin-signout
  try {
    const { error } = await admin.auth.admin.signOut(userId, 'global')
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  } catch (e) {
    // Fallback: delete sessions via SQL if signOut not available
    const msg = e instanceof Error ? e.message : 'Falha ao invalidar sessões.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
