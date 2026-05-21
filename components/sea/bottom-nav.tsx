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
      className="fixed bottom-0 left-0 right-0 w-full z-50 p-1"
      style={{
        background: 'rgba(3, 3, 5, 0.78)',
        backdropFilter: 'blur(28px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 -4px 32px rgba(0, 0, 0, 0.6)',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top dual-metal border shimmer (Silver edges, Gold center) */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.25) 20%, rgba(212,184,122,0.65) 50%, rgba(255,255,255,0.25) 80%, rgba(255,255,255,0.05) 100%)',
        }}
      />

      <div className="relative grid w-full grid-cols-2 gap-1 max-w-4xl mx-auto px-4">
        {/* Background sliding active block */}
        <div className="absolute inset-0 pointer-events-none z-0 px-4">
          <motion.div
            className="h-full relative"
            style={{
              width: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(212,184,122,0.06) 100%)',
            }}
            animate={{ x: isExplore ? '100%' : '0%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            {/* Top active tab dual-metal highlight (High-shine Silver + Gold) */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/70 via-[#d4b87a] to-white/70 shadow-[0_0_12px_rgba(212,184,122,0.4)]" />
          </motion.div>
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
      className="relative flex items-center justify-center gap-2 py-3.5 text-[10px] font-bold tracking-[0.18em] transition-all duration-300 cursor-pointer select-none z-10"
    >
      <div
        className={`flex items-center gap-2 transition-all duration-300 ${
          active
            ? 'text-[#d4b87a] drop-shadow-[0_0_8px_rgba(212,184,122,0.5)] scale-[1.03]'
            : 'text-white/40 hover:text-white/70 scale-100'
        }`}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
    </button>
  )
}
