'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'

export function PrivacyShield() {
  const profile = useAuthStore(s => s.profile)
  const user = useAuthStore(s => s.user)
  const [blurred, setBlurred] = useState(false)

  // Blur toda a tela quando o app perde foco (troca de aba ou alt+tab)
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
  if (!label) return null

  // SVG com o identificador do usuário em diagonal — rastreável em qualquer print
  const wm = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="160">` +
    `<text x="140" y="80" text-anchor="middle" dominant-baseline="middle"` +
    ` transform="rotate(-30 140 80)" font-family="system-ui,sans-serif"` +
    ` font-size="12" fill="rgba(255,255,255,0.042)" letter-spacing="1">${label}</text>` +
    `</svg>`
  )

  return (
    <>
      {/* Marca d'água: identificador em diagonal cobrindo toda a tela */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 select-none"
        style={{
          zIndex: 9990,
          backgroundImage: `url("data:image/svg+xml,${wm}")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Blur: esconde conteúdo quando app perde foco */}
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
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/20">
            SEA Fisio
          </span>
        </div>
      )}
    </>
  )
}