import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

type CookieToSet = { name: string; value: string; options?: CookieOptions }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** Server client with the caller's session (reads cookies). Use to verify identity. */
export async function getSupabaseServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local')
  }
  const cookieStore = await cookies()
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet: CookieToSet[]) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          /* set from a Server Component — Next.js does not allow; safe to ignore */
        }
      },
    },
  })
}

/** Admin client with service-role privileges. NEVER expose to the browser. */
export function getSupabaseAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL ausente em .env.local')
  }
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY ausente em .env.local — adicione a service role key do projeto (Supabase Dashboard → Project Settings → API)')
  }
  return createServerClient(supabaseUrl, key, {
    cookies: { getAll: () => [], setAll: () => {} },
    auth: { autoRefreshToken: false, persistSession: false },
  })
}