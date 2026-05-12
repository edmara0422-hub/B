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

  // Edge-to-edge real (sem max-w). Padrão IPB BUSINESS-COMPLETE-KIT.
  return (
    <motion.nav
      data-sea-bottom-nav="true"
      className="fixed bottom-0 left-0 right-0 z-50 px-2 pt-1.5 pb-1.5 md:px-4"
      style={{
        background: 'rgba(5,5,5,0.82)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(192,192,192,0.06)',
        paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))',
      }}
      initial={{ y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid w-full grid-cols-2 gap-1">
        <NavButton icon={Home} label="HOME" active={isHome} onClick={() => onSwitch?.('home')} />
        <NavButton icon={Compass} label="EXPLORAR" active={isExplore} onClick={() => onSwitch?.('explorar')} />
      </div>
    </motion.nav>
  )
}

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Home
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 rounded-[0.8rem] px-2 py-2 text-[9px] font-semibold tracking-[0.1em] transition-all duration-300 ${
        active ? 'chrome-active text-[#050505]' : 'text-white/65 hover:text-white hover:bg-white/[0.04]'
      }`}
    >
      <Icon className="h-3 w-3" />
      <span>{label}</span>
    </button>
  )
}
