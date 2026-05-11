import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

type Body = { userId?: unknown; password?: unknown }

// Edmara é sempre admin (fallback). Outros usuários precisam ter role='admin'
// no banco (promovidos via painel).
const ALWAYS_ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com'])

export async function POST(request: Request) {
  let body: Body = {}
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const userId = typeof body.userId === 'string' ? body.userId : ''
  const password = typeof body.password === 'string' ? body.password : ''
  if (!userId || !password) {
    return NextResponse.json({ error: 'Informe userId e password.' }, { status: 400 })
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Senha mínimo 6 caracteres.' }, { status: 400 })
  }

  // Verify the caller is an admin (role='admin' no banco OU Edmara por fallback)
  try {
    const supa = await getSupabaseServerClient()
    const { data: { user }, error: userErr } = await supa.auth.getUser()
    if (userErr || !user) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }
    const callerEmail = (user.email ?? '').toLowerCase()
    const { data: profile } = await supa.from('profiles').select('role').eq('id', user.id).single()
    const isAllowed = profile?.role === 'admin' || ALWAYS_ADMIN_EMAILS.has(callerEmail)
    if (!isAllowed) {
      return NextResponse.json({ error: 'Permissão negada.' }, { status: 403 })
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Falha ao verificar identidade.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  // Set the user's password directly via service role
  let admin
  try {
    admin = getSupabaseAdminClient()
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Admin client indisponível.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  const { error } = await admin.auth.admin.updateUserById(userId, { password })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
