'use client'

import { create } from 'zustand'

/**
 * Store global de acessibilidade — compartilhado entre TopBar (botões A−/A+)
 * e MainShell/pages (onde o zoom é aplicado via CSS `zoom: fontScale`).
 *
 * Range: 14 steps discretos de [0.2 ... 2.0] (20% até 200%).
 * Persiste em localStorage('sea_font_scale').
 * Toast feedback visual em cada mudança (igual IPB).
 */

const FONT_SCALES = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.15, 1.3, 1.5, 1.75, 2.0] as const
const FONT_SCALE_KEY = 'sea_font_scale'

type AccessibilityState = {
  fontScale: number
  increaseFontScale: () => void
  decreaseFontScale: () => void
  resetFontScale: () => void
}

function readInitial(): number {
  if (typeof window === 'undefined') return 1
  try {
    const stored = localStorage.getItem(FONT_SCALE_KEY)
    const parsed = stored ? parseFloat(stored) : NaN
    if (Number.isFinite(parsed) && (FONT_SCALES as readonly number[]).includes(parsed)) return parsed
    return 1
  } catch {
    return 1
  }
}

function persist(v: number) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(FONT_SCALE_KEY, String(v)) } catch { /* quota */ }
}

function showToast(message: string) {
  if (typeof document === 'undefined') return
  const old = document.getElementById('sea-accessibility-toast')
  if (old) old.remove()

  const toast = document.createElement('div')
  toast.id = 'sea-accessibility-toast'
  toast.textContent = message
  toast.style.cssText =
    'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
    'background:rgba(93,173,226,0.95);color:#fff;padding:10px 20px;' +
    'border-radius:12px;font-size:13px;font-weight:600;' +
    "font-family:'Poppins',system-ui,sans-serif;" +
    'z-index:99999;box-shadow:0 8px 24px rgba(0,0,0,0.4);' +
    'pointer-events:none;opacity:0;transition:opacity 200ms ease-out'
  document.body.appendChild(toast)
  requestAnimationFrame(() => { toast.style.opacity = '1' })
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => toast.remove(), 250)
  }, 2000)
}

export const useAccessibility = create<AccessibilityState>((set, get) => ({
  fontScale: readInitial(),
  increaseFontScale: () => {
    const prev = get().fontScale
    const idx = FONT_SCALES.indexOf(prev as typeof FONT_SCALES[number])
    const next = FONT_SCALES[Math.min(idx + 1, FONT_SCALES.length - 1)]
    if (next === prev) return
    set({ fontScale: next })
    persist(next)
    showToast(`Texto ${Math.round(next * 100)}%`)
  },
  decreaseFontScale: () => {
    const prev = get().fontScale
    const idx = FONT_SCALES.indexOf(prev as typeof FONT_SCALES[number])
    const next = FONT_SCALES[Math.max(idx - 1, 0)]
    if (next === prev) return
    set({ fontScale: next })
    persist(next)
    showToast(`Texto ${Math.round(next * 100)}%`)
  },
  resetFontScale: () => {
    set({ fontScale: 1 })
    persist(1)
    showToast('Texto 100%')
  },
}))
