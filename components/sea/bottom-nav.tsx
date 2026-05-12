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

  // Mesmo estilo do TopBar: fundo preto translúcido edge-to-edge,
  // conteúdo em max-w-7xl, sem pill flutuante. Largura idêntica ao topo.
  return (
    <motion.nav
      data-sea-bottom-nav="true"
      className="fixed bottom-0 left-0 right-0 z-50 px-2 pb-2 pt-2 md:px-6 md:pb-3 md:pt-3"
      style={{
        background: 'rgba(5,5,5,0.82)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(192,192,192,0.06)',
      }}
      initial={{ y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
        <NavButton
          icon={Home}
          label="HOME"
          active={isHome}
          onClick={() => onSwitch?.('home')}
        />
        <NavButton
          icon={Compass}
          label="EXPLORAR"
          active={isExplore}
          onClick={() => onSwitch?.('explorar')}
        />
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
      className={`flex flex-1 max-w-[16rem] items-center justify-center gap-1.5 rounded-[0.7rem] px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 ${
        active ? 'chrome-active text-[#050505]' : 'text-white/72 hover:text-white border border-white/8'
      }`}
      style={
        active
          ? undefined
          : { background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(8,8,10,0.92) 100%)' }
      }
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </button>
  )
}
