import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function DELETE(_request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
  }

  const admin = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  // 1. Delete user clinical data from icu_sessions
  await admin.from('icu_sessions').delete().eq('session_id', user.id)

  // 2. Delete user database profile row
  const { error: profileError } = await admin.from('profiles').delete().eq('id', user.id)
  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  // 3. Delete the user from Supabase Auth completely
  const { error: authDeleteError } = await admin.auth.admin.deleteUser(user.id)
  if (authDeleteError) {
    console.warn('[DeleteAccount] Auth delete warning (could be deleted by database trigger):', authDeleteError.message)
  }

  return NextResponse.json({ success: true })
}