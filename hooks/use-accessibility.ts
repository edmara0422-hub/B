'use client'

import { create } from 'zustand'

/**
 * Store global de acessibilidade — compartilhado entre TopBar (onde os botões
 * A−/A+ vivem) e MainShell (onde o zoom é aplicado). Sem Zustand, cada hook
 * teria seu próprio state e o zoom não funcionaria de fato.
 *
 * Range: 0.6 → 1.6 em passos de 0.1. Persiste em localStorage('sea_font_scale').
 */

type AccessibilityState = {
  fontScale: number
  increaseFontScale: () => void
  decreaseFontScale: () => void
  resetFontScale: () => void
}

function readInitial(): number {
  if (typeof window === 'undefined') return 1
  try {
    const stored = localStorage.getItem('sea_font_scale')
    const parsed = stored ? parseFloat(stored) : NaN
    return Number.isFinite(parsed) ? Math.max(0.6, Math.min(1.6, parsed)) : 1
  } catch {
    return 1
  }
}

function persist(v: number) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem('sea_font_scale', String(v)) } catch { /* quota */ }
}

export const useAccessibility = create<AccessibilityState>((set, get) => ({
  fontScale: readInitial(),
  increaseFontScale: () => {
    const next = Math.min(1.6, Math.round((get().fontScale + 0.1) * 10) / 10)
    set({ fontScale: next })
    persist(next)
  },
  decreaseFontScale: () => {
    const next = Math.max(0.6, Math.round((get().fontScale - 0.1) * 10) / 10)
    set({ fontScale: next })
    persist(next)
  },
  resetFontScale: () => {
    set({ fontScale: 1 })
    persist(1)
  },
}))
