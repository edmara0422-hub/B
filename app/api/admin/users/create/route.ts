import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

type Body = { name?: unknown; email?: unknown; password?: unknown }

export async function POST(request: Request) {
  let body: Body = {}
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Preencha nome, email e senha.' }, { status: 400 })
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Senha deve ter no mínimo 6 caracteres.' }, { status: 400 })
  }

  // Lista exclusiva de admins server-side — espelha o client e blinda a API
  // contra qualquer tentativa de uso por outros usuários, mesmo com role='admin'.
  const ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com'])

  // 1. Verify the caller is the authorized admin
  let callerId: string
  try {
    const supa = await getSupabaseServerClient()
    const { data: { user }, error: userErr } = await supa.auth.getUser()
    if (userErr || !user) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }
    const callerEmail = (user.email ?? '').toLowerCase()
    if (!ADMIN_EMAILS.has(callerEmail)) {
      return NextResponse.json({ error: 'Permissão negada.' }, { status: 403 })
    }
    callerId = user.id
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Falha ao verificar identidade.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  // 2. Create the user with the admin client (auto-confirms email)
  let admin
  try {
    admin = getSupabaseAdminClient()
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Admin client indisponível.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  })

  if (error || !data?.user) {
    const msg = error?.message || 'Não foi possível criar o usuário.'
    if (/already.*registered|already.*exists/i.test(msg)) {
      return NextResponse.json({ error: 'Este email já está cadastrado.' }, { status: 409 })
    }
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  // 3. Ensure profile row exists with the provided name (trigger creates a default row;
  //    we update it so the name reflects what the admin typed).
  await admin
    .from('profiles')
    .update({ name, email })
    .eq('id', data.user.id)

  return NextResponse.json({
    id: data.user.id,
    email: data.user.email,
    createdBy: callerId,
  })
}
