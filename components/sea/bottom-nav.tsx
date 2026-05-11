'use client'

import { motion } from 'framer-motion'
import { Compass, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function BottomNav({
  onSwitch,
}: {
  active?: string
  onSwitch?: (tab: string) => void
}) {
  const pathname = usePathname()

  const p = pathname?.replace(/\/$/, '') ?? ''
  const isHome = p === '/sea' || p === '/home' || p === ''
  const isExplore = p === '/explore' || p.startsWith('/explore/')

  const tabClass = (active: boolean) =>
    `flex items-center justify-center gap-1.5 rounded-[0.7rem] px-3 py-1 text-[8px] font-semibold tracking-[0.16em] transition-colors duration-200 ${
      active ? 'chrome-active text-[#050505]' : 'text-white/72 hover:text-white'
    }`

  // Sem o block grosso h-20 que tampava conteúdo. Apenas o pill flutuante na base
  // com backdrop-blur — conteúdo fica visível atrás dele.
  return (
    <motion.nav
      data-sea-bottom-nav="true"
      className="fixed bottom-2 left-0 right-0 z-50 px-2.5 md:bottom-3 md:px-8"
      initial={{ y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="chrome-pill mx-auto grid max-w-2xl grid-cols-2 gap-0.5 rounded-[1.2rem] p-0.5 px-1 shadow-[0_6px_16px_rgba(0,0,0,0.3)] backdrop-blur-xl">
        <button className={tabClass(isHome)} onClick={() => onSwitch?.('home')}>
          <Home className="h-3.5 w-3.5" />
          <span>HOME</span>
        </button>

        <button className={tabClass(isExplore)} onClick={() => onSwitch?.('explorar')}>
          <Compass className="h-3.5 w-3.5" />
          <span>EXPLORAR</span>
        </button>
      </div>
    </motion.nav>
  )
}
