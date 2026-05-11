'use client'

import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { trackLogin } from '@/lib/analytics/track'
import type { User, Session } from '@supabase/supabase-js'

// Admin emails that are always recognized as admin, even if Supabase profile
// fetch is slow/fails. Keeps the admin panel reachable through sync hiccups.
const ADMIN_EMAILS = new Set<string>([
  'edmararbusiness1@gmail.com',
  'edmararbusiness1@er-site.com',
  'edmara0422@gmail.com',
])

const ADMIN_CACHE_KEY = 'sea_is_admin'

function readCachedAdmin(): boolean {
  if (typeof window === 'undefined') return false
  try { return localStorage.getItem(ADMIN_CACHE_KEY) === '1' } catch { return false }
}
function writeCachedAdmin(isAdmin: boolean) {
  if (typeof window === 'undefined') return
  try {
    if (isAdmin) localStorage.setItem(ADMIN_CACHE_KEY, '1')
    else localStorage.removeItem(ADMIN_CACHE_KEY)
  } catch { /* ignore quota / private-mode errors */ }
}
function isAdminByEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.has(email.toLowerCase())
}

// Wraps a thenable with a hard timeout so a hanging Supabase call cannot freeze
// the auth UI (button stays in spinner forever). Resolves with `null` on timeout.
// Typed loosely on purpose: Supabase types aren't present in this project so we
// rely on the call sites to narrow the result shape.
function withTimeout<T = unknown>(p: PromiseLike<T>, ms: number, label: string): Promise<T | null> {
  return new Promise<T | null>((resolve) => {
    const t = setTimeout(() => {
      console.warn(`[authStore] ${label} timed out after ${ms}ms`)
      resolve(null)
    }, ms)
    Promise.resolve(p).then(
      (v) => { clearTimeout(t); resolve(v) },
      (e) => { clearTimeout(t); console.warn(`[authStore] ${label} failed:`, e); resolve(null) },
    )
  })
}

export type Profile = {
  id: string
  name: string | null
  email: string | null
  photo_url: string | null
  role: 'user' | 'admin'
  notifications_enabled: boolean
  theme: string
  created_at: string
  updated_at: string
}

type AuthState = {
  user: User | null
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  isAdmin: boolean
  initialized: boolean
}

type AuthActions = {
  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
  fetchProfile: (userId: string) => Promise<void>
  updateProfile: (data: Partial<Pick<Profile, 'name' | 'photo_url' | 'notifications_enabled' | 'theme'>>) => Promise<{ error: string | null }>
  setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  // Start false so the auth-form button is never disabled before the user has
  // tried anything. isLoading flips true only during an in-flight signIn/signUp.
  isLoading: false,
  isAdmin: false,
  initialized: false,

  initialize: async () => {
    if (!supabase || get().initialized) return
    // Hydrate isAdmin instantly from localStorage cache so the admin panel
    // link stays reachable even before Supabase responds.
    if (readCachedAdmin()) set({ isAdmin: true })

    // Resolve the existing session FIRST so AuthGuard can decide reliably
    // whether to render or redirect. 8s timeout prevents infinite spinner if
    // Supabase hangs — after timeout we just proceed as "no session" without
    // wiping the cached admin flag.
    const sessionResult = await withTimeout<{ data: { session: Session | null } }>(
      supabase.auth.getSession(),
      8000,
      'getSession',
    )
    const session = sessionResult?.data?.session ?? null
    if (session?.user) {
      set({ user: session.user, session })
      if (isAdminByEmail(session.user.email)) {
        set({ isAdmin: true })
        writeCachedAdmin(true)
      }
      // Fire-and-forget: profile fills in when it arrives; doesn't block UI.
      get().fetchProfile(session.user.id)
    }
    // Mark initialized only AFTER session check — AuthGuard now sees the
    // correct user/null and won't bounce a logged-in user to /auth on reload.
    set({ initialized: true })

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, session })
      if (session?.user) {
        if (isAdminByEmail(session.user.email)) {
          set({ isAdmin: true })
          writeCachedAdmin(true)
        }
        get().fetchProfile(session.user.id)
      } else {
        set({ profile: null, isAdmin: false })
        writeCachedAdmin(false)
      }
    })
  },

  fetchProfile: async (userId: string) => {
    if (!supabase) return
    const res = await withTimeout<{ data: Profile | null; error: { message: string } | null }>(
      supabase.from('profiles').select('*').eq('id', userId).single(),
      8000,
      'fetchProfile',
    )
    if (!res) return
    const { data, error } = res
    if (error) {
      console.warn('[authStore] fetchProfile error:', error.message)
      // Profile fetch failed — keep email/cache-based isAdmin so the admin
      // panel link isn't pulled out from under a real admin during a sync hiccup.
      return
    }
    if (data) {
      const profile = data as Profile
      const isAdmin = profile.role === 'admin' || isAdminByEmail(profile.email)
      set({ profile, isAdmin })
      writeCachedAdmin(isAdmin)
    }
  },

  signIn: async (email, password) => {
    if (!supabase) return { error: 'Supabase nao configurado.' }
    set({ isLoading: true })
    const res = await withTimeout<{ error: { message: string } | null }>(
      supabase.auth.signInWithPassword({ email, password }),
      12000,
      'signInWithPassword',
    )
    set({ isLoading: false })
    if (!res) return { error: 'Servidor demorou para responder. Verifique sua conexão e tente novamente.' }
    const { error } = res
    if (error) {
      if (error.message.includes('Invalid login')) return { error: 'Email ou senha incorretos.' }
      if (error.message.includes('Email not confirmed')) return { error: 'Confirme seu email antes de entrar.' }
      return { error: error.message }
    }
    trackLogin()
    return { error: null }
  },

  signUp: async (email, password, name) => {
    if (!supabase) return { error: 'Supabase nao configurado.' }
    set({ isLoading: true })
    const res = await withTimeout<{ error: { message: string } | null }>(
      supabase.auth.signUp({ email, password, options: { data: { name } } }),
      12000,
      'signUp',
    )
    set({ isLoading: false })
    if (!res) return { error: 'Servidor demorou para responder. Verifique sua conexão e tente novamente.' }
    const { error } = res
    if (error) {
      if (error.message.includes('already registered')) return { error: 'Este email ja esta cadastrado.' }
      if (error.message.includes('Password')) return { error: 'Senha deve ter no minimo 6 caracteres.' }
      return { error: error.message }
    }
    return { error: null }
  },

  signOut: async () => {
    if (!supabase) return
    try { await supabase.auth.signOut() } catch { /* empty */ }
    set({ user: null, session: null, profile: null, isAdmin: false, initialized: false })
    // Clear any localStorage remnants
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sea_user')
    }
    writeCachedAdmin(false)
  },

  resetPassword: async (email) => {
    if (!supabase) return { error: 'Supabase nao configurado.' }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) return { error: error.message }
    return { error: null }
  },

  updateProfile: async (data) => {
    if (!supabase) return { error: 'Supabase nao configurado.' }
    const user = get().user
    if (!user) return { error: 'Nao autenticado.' }
    const updateData = { ...data, updated_at: new Date().toISOString() }
    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user.id)
    if (error) {
      console.warn('[authStore] updateProfile error:', error.message)
      return { error: error.message }
    }
    await get().fetchProfile(user.id)
    return { error: null }
  },

  setSession: (session) => {
    set({ user: session?.user ?? null, session })
  },
}))
