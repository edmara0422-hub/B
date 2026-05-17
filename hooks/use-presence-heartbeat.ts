'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/stores/authStore'

// Gera fingerprint estável por device baseado em propriedades do navegador
function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return 'ssr'
  const stored = localStorage.getItem('sea-device-fp')
  if (stored) return stored
  // Gera um id curto por instalação do app (não muda entre sessões no mesmo browser)
  const fp = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  try { localStorage.setItem('sea-device-fp', fp) } catch { /* ignore */ }
  return fp
}

const HEARTBEAT_INTERVAL_MS = 30_000

/**
 * Manda um ping ao Supabase a cada 30s enquanto a aba está visível
 * (Page Visibility API pausa quando vai pra background — não desperdiça bateria).
 * Marca presença em public.user_presence — admin lê pra mostrar "ATIVO AGORA".
 */
export function usePresenceHeartbeat() {
  const userId = useAuthStore((s) => s.user?.id ?? null)

  useEffect(() => {
    if (!userId || userId === 'guest' || !supabase) return
    if (typeof window === 'undefined') return

    const fp = getDeviceFingerprint()
    const ua = window.navigator?.userAgent ?? null

    let cancelled = false
    let timer: ReturnType<typeof setInterval> | null = null

    const ping = () => {
      if (cancelled || !supabase) return
      if (document.visibilityState !== 'visible') return
      supabase.rpc('heartbeat', { p_device_fp: fp, p_user_agent: ua }).then(() => {})
    }

    // Ping imediato + a cada 30s
    ping()
    timer = setInterval(ping, HEARTBEAT_INTERVAL_MS)

    // Quando a aba volta a ficar visível, dispara um ping imediato
    const onVisibility = () => {
      if (document.visibilityState === 'visible') ping()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      if (timer) clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [userId])
}
