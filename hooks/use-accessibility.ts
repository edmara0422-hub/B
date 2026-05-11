'use client'

import { useEffect, useState, useCallback } from 'react'

/**
 * Hook de acessibilidade — controla o zoom de fonte (A−/A+) persistido em
 * localStorage. Use em conjunto com `style={{ zoom: fontScale }}` na div
 * principal de cada área (Home, Perfil, Painel Admin etc).
 *
 * Range: 0.6 a 1.6 (60% a 160%), passo de 0.1.
 */
export function useAccessibility() {
  const [fontScale, setFontScale] = useState<number>(() => {
    if (typeof window === 'undefined') return 1
    const stored = localStorage.getItem('sea_font_scale')
    const parsed = stored ? parseFloat(stored) : NaN
    return Number.isFinite(parsed) ? Math.max(0.6, Math.min(1.6, parsed)) : 1
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try { localStorage.setItem('sea_font_scale', String(fontScale)) } catch { /* quota */ }
  }, [fontScale])

  const increaseFontScale = useCallback(() => {
    setFontScale((s) => Math.min(1.6, Math.round((s + 0.1) * 10) / 10))
  }, [])

  const decreaseFontScale = useCallback(() => {
    setFontScale((s) => Math.max(0.6, Math.round((s - 0.1) * 10) / 10))
  }, [])

  const resetFontScale = useCallback(() => setFontScale(1), [])

  return { fontScale, increaseFontScale, decreaseFontScale, resetFontScale }
}
