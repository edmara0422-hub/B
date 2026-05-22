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
    <>
      {/* SVG gradient definitions — prata real e dourado champanhe */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <linearGradient id="nav-silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="18%"  stopColor="#f1f5f9" />
            <stop offset="40%"  stopColor="#cbd5e1" />
            <stop offset="60%"  stopColor="#94a3b8" />
            <stop offset="82%"  stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="nav-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff8e7" />
            <stop offset="25%"  stopColor="#f0d080" />
            <stop offset="55%"  stopColor="#d4b87a" />
            <stop offset="80%"  stopColor="#b8975a" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          <filter id="icon-glow-active">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Floating pill nav — fica suspenso acima da borda inferior */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
      >
        <motion.nav
          data-sea-bottom-nav="true"
          className="pointer-events-auto relative overflow-hidden"
          style={{
            width: 'calc(100% - 32px)',
            maxWidth: '400px',
            background: 'linear-gradient(160deg, rgba(18, 16, 22, 0.92) 0%, rgba(8, 7, 12, 0.96) 100%)',
            backdropFilter: 'blur(40px) saturate(200%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(0.9)',
            border: '1.5px solid rgba(212, 184, 122, 0.30)',
            borderRadius: '100px',
            boxShadow: [
              '0 -2px 0 rgba(255,255,255,0.06) inset',
              '0 1px 0 rgba(212,184,122,0.12) inset',
              '0 16px 48px rgba(0,0,0,0.80)',
              '0 4px 16px rgba(212,184,122,0.12)',
              '0 0 0 1px rgba(255,255,255,0.04)',
            ].join(', '),
            padding: '6px 8px',
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brilho superior — linha de reflexo da cápsula */}
          <div
            className="absolute left-6 right-6 top-0 h-[1.5px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 35%, rgba(212,184,122,0.4) 55%, rgba(255,255,255,0.55) 75%, transparent 100%)',
              borderRadius: '100px',
            }}
          />

          {/* Reflexo lateral esquerdo */}
          <div
            className="absolute left-0 top-2 bottom-2 w-[1.5px] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
            }}
          />

          {/* Reflexo lateral direito */}
          <div
            className="absolute right-0 top-2 bottom-2 w-[1.5px] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            }}
          />

          <div className="relative flex w-full items-center">
            {/* Sliding active highlight */}
            <motion.div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                width: '50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(212,184,122,0.08) 100%)',
                border: '1px solid rgba(212,184,122,0.28)',
                borderRadius: '90px',
                boxShadow: '0 0 20px rgba(212,184,122,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
              }}
              animate={{ x: isExplore ? '100%' : '0%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />

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
      </div>
    </>
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
      className="relative flex-1 flex items-center justify-center gap-2.5 py-3 text-[10.5px] font-extrabold tracking-[0.16em] transition-all duration-300 cursor-pointer select-none z-10"
      style={{ borderRadius: '90px' }}
    >
      <div
        className={`flex items-center gap-2.5 transition-all duration-300 ${
          active ? 'scale-[1.06]' : 'opacity-50 hover:opacity-80 scale-100'
        }`}
      >
        {/* Ícone com gradiente metálico */}
        <Icon
          className="h-[18px] w-[18px] transition-all duration-300"
          style={{
            strokeWidth: active ? '2.5px' : '1.8px',
            stroke: active ? 'url(#nav-silver-grad)' : 'rgba(200,210,220,0.55)',
            filter: active
              ? 'drop-shadow(0 0 5px rgba(255,255,255,0.5)) drop-shadow(0 1px 3px rgba(0,0,0,0.6))'
              : 'none',
          }}
        />

        {/* Label com gradiente — prata no ativo, ouro no Explorar quando ativo */}
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            background: active
              ? label === 'EXPLORAR'
                ? 'linear-gradient(135deg, #fff8e7 0%, #f0d080 30%, #d4b87a 65%, #b8975a 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 35%, #cbd5e1 65%, #94a3b8 100%)'
              : 'rgba(200,210,220,0.55)',
            WebkitBackgroundClip: active ? 'text' : undefined,
            WebkitTextFillColor: active ? 'transparent' : undefined,
            backgroundClip: active ? 'text' : undefined,
            filter: active ? 'drop-shadow(0 0 6px rgba(255,255,255,0.2))' : 'none',
          }}
        >
          {label}
        </span>
      </div>
    </button>
  )
}
