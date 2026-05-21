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

  return (
    <motion.nav
      data-sea-bottom-nav="true"
      className="fixed bottom-6 left-1/2 z-50 p-1.5 rounded-full border border-white/12 w-[calc(100%-2rem)] max-w-xs"
      style={{
        background: 'rgba(3, 3, 6, 0.60)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
      }}
      initial={{ y: 70, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative grid w-full grid-cols-2 gap-1">
        {/* Background sliding active pill */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            className="h-full rounded-full border border-amber-500/50"
            style={{
              width: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(212,175,90,0.12) 100%)',
              boxShadow: '0 4px 14px rgba(232, 204, 136, 0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
            animate={{ x: isExplore ? '100%' : '0%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          />
        </div>

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
      className="relative flex items-center justify-center gap-2 rounded-full py-2.5 text-[9.5px] font-bold tracking-[0.16em] transition-all duration-300 cursor-pointer select-none z-10"
    >
      <div
        className={`flex items-center gap-1.5 transition-all duration-300 ${
          active
            ? 'text-[#e8cc88] drop-shadow-[0_0_8px_rgba(232,204,136,0.5)] scale-[1.03]'
            : 'text-white/40 hover:text-white/70 scale-100'
        }`}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
    </button>
  )
}
