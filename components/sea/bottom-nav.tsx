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
      className="fixed bottom-0 left-0 right-0 z-50 px-3 pt-1.5"
      style={{
        background: 'linear-gradient(0deg, rgba(2,2,3,0.97) 0%, rgba(5,5,7,0.92) 100%)',
        backdropFilter: 'blur(32px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.4)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.5)',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
      initial={{ y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gold shimmer line at top — mirrors topbar */}
      <div
        className="absolute left-0 right-0 top-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 8%, rgba(212,184,122,0.18) 28%, rgba(232,204,136,0.52) 50%, rgba(212,184,122,0.18) 72%, transparent 92%)',
          opacity: 0.82,
        }}
      />

      <div className="grid w-full grid-cols-2 gap-2">
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
      className="relative flex items-center justify-center gap-2 rounded-[1rem] px-3 py-2.5 text-[10px] font-semibold tracking-[0.12em] transition-all duration-300"
      style={
        active
          ? {
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(6,6,10,0.90) 100%)',
              border: '1px solid rgba(232,204,136,0.60)', // Gold border only
              boxShadow: '0 0 18px rgba(232,204,136,0.08), inset 0 1px 0 rgba(255,255,255,0.15)',
            }
          : {
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(5,5,7,0.85) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
            }
      }
    >
      <div className={`flex items-center gap-2 ${active ? 'metal-text drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-silver-light hover:text-white'}`}>
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      {/* Gold underline indicator for active tab */}
      {active && (
        <span
          className="absolute -bottom-1.5 left-8 right-8 h-0.5 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(232,204,136,0.8) 50%, transparent)',
            boxShadow: '0 0 8px rgba(232,204,136,0.4)',
          }}
        />
      )}
    </button>
  )
}

