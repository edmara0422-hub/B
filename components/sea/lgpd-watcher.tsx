'use client'

import { useEffect } from 'react'

// Roda no layout principal (toda página autenticada).
// Se o horário de corte do plantão já passou, apaga todos os dados
// clínicos do localStorage antes de qualquer renderização.
// Admins nunca têm 'sea-shift-cutoff', então o wipe nunca afeta o admin.
export function LgpdWatcher() {
  useEffect(() => {
    try {
      const cutoff = localStorage.getItem('sea-shift-cutoff')
      if (!cutoff) return
      if (new Date() < new Date(cutoff)) return

      const toRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key) continue
        if (
          key.startsWith('sea-icu-records') ||
          key.startsWith('sea-icu-archive') ||
          key.startsWith('sea-icu-workspaces') ||
          key.startsWith('sea-icu-active-workspace')
        ) toRemove.push(key)
      }
      toRemove.forEach(k => localStorage.removeItem(k))
      localStorage.removeItem('sea-shift-cutoff')
      localStorage.removeItem('sea-shift-start')
      localStorage.removeItem('sea-shift-duration')

      console.log('[LGPD] Plantão expirado. Dados clínicos removidos.')
    } catch { /* ignore erros de quota ou modo privado */ }
  }, [])

  return null
}