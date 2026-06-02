'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'

// Rotas clínicas onde a marca d'água aparece
const CLINICAL_ROUTES = ['/explore/sistemas', '/sistemas', '/area']

export function PrivacyShield() {
  const pathname = usePathname()
  const profile = useAuthStore(s => s.profile)
  const user = useAuthStore(s => s.user)
  const [blurred, setBlurred] = useState(false)

  // Blur toda a tela quando o app perde foco (Alt+Tab, troca de aba)
  useEffect(() => {
    const onVisibility = () => setBlurred(document.visibilityState === 'hidden')
    const onBlur = () => setBlurred(true)
    const onFocus = () => setBlurred(false)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  const label = profile?.name || user?.email || ''
  const isClinicRoute = CLINICAL_ROUTES.some(r => pathname?.startsWith(r))

  // Marca d'água: só em rotas clínicas (/sistemas, /area)
  const watermarkSvg = isClinicRoute && label
    ? encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="160">` +
        `<text x="150" y="72" text-anchor="middle" dominant-baseline="middle"` +
        ` transform="rotate(-25 150 80)"` +
        ` font-family="system-ui,sans-serif" font-size="11"` +
        ` fill="rgba(255,255,255,0.052)" letter-spacing="2">${label}</text>` +
        `<text x="150" y="90" text-anchor="middle" dominant-baseline="middle"` +
        ` transform="rotate(-25 150 80)"` +
        ` font-family="system-ui,sans-serif" font-size="7"` +
        ` fill="rgba(255,255,255,0.028)" letter-spacing="4">IPB</text>` +
        `</svg>`
      )
    : null

  return (
    <>
      {/* Marca d'água elegante — nome + IPB em diagonal, só em Sistemas */}
      {watermarkSvg && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 select-none"
          style={{
            zIndex: 9990,
            backgroundImage: `url("data:image/svg+xml,${watermarkSvg}")`,
            backgroundRepeat: 'repeat',
          }}
        />
      )}

      {/* Blur — esconde conteúdo em qualquer página ao perder foco */}
      {blurred && (
        <div
          aria-hidden
          className="fixed inset-0 flex items-center justify-center select-none"
          style={{
            zIndex: 9999,
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            background: 'rgba(1,1,1,0.75)',
          }}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">
            IPB
          </span>
        </div>
      )}
    </>
  )
}