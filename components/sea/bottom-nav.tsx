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
  const isHome    = p === '/sea' || p === '/home' || p === ''
  const isExplore = p === '/explore' || p.startsWith('/explore/')
  const hasActive = isHome || isExplore

  return (
    <>
      {/* SVG gradients — prata real e dourado champanhe */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <linearGradient id="nav-silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="18%"  stopColor="#f1f5f9" />
            <stop offset="42%"  stopColor="#cbd5e1" />
            <stop offset="65%"  stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="nav-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff8e7" />
            <stop offset="25%"  stopColor="#f0d080" />
            <stop offset="58%"  stopColor="#d4b87a" />
            <stop offset="82%"  stopColor="#b8975a" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>

      {/*
        ── ESTRUTURA:
        div fixo (mesmo posicionamento que top bar: left/right 16px)
          └── wrapper de gradiente da borda (esq prata → dir dourado)
                └── motion.nav (conteúdo escuro com blur)
      ──────────────────────────────────────────────────────── */}
      <div
        className="fixed z-50 pointer-events-none"
        style={{
          left: '16px',
          right: '16px',
          bottom: '12px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <motion.div
          className="pointer-events-auto"
          style={{
            borderRadius: '100px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.75), 0 4px 16px rgba(212,184,122,0.10)',
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav
            data-sea-bottom-nav="true"
            style={{
              background: 'rgba(3, 3, 5, 0.75)',
              backdropFilter: 'blur(28px) saturate(140%)',
              WebkitBackdropFilter: 'blur(28px) saturate(140%)',
              borderRadius: '100px',
              padding: '5px 8px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Hollow gradient border: silver on the left, gold on the right */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                padding: '0.2px',
                background: 'linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 45%, #d4b87a 55%, #b8975a 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
                zIndex: 30,
              }}
            />
            {/* Brilho superior interno */}
            <div
              style={{
                position: 'absolute',
                left: '10%',
                right: '10%',
                top: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(200,210,220,0.50) 30%, rgba(255,255,255,0.70) 50%, rgba(212,184,122,0.50) 70%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', display: 'flex', width: '100%', alignItems: 'center' }}>
              {/* Sliding highlight — só visível quando há tab ativa */}
              {hasActive && (
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '50%',
                    background: isHome
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(200,205,215,0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(212,184,122,0.07) 100%)',
                    border: isHome
                      ? '0.2px solid rgba(200, 205, 215, 0.30)'
                      : '0.2px solid rgba(212, 184, 122, 0.35)',
                    borderRadius: '90px',
                    boxShadow: isHome
                      ? '0 0 18px rgba(200, 205, 215, 0.20), inset 0 0.2px 0 rgba(255, 255, 255, 0.15)'
                      : '0 0 18px rgba(212, 184, 122, 0.22), inset 0 0.2px 0 rgba(255, 255, 255, 0.15)',
                    pointerEvents: 'none',
                  }}
                  animate={{ x: isExplore ? '100%' : '0%' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}

              <NavButton
                icon={Home}
                label="HOME"
                active={isHome}
                gradientId="nav-silver-grad"
                activeTextGradient="linear-gradient(135deg, #ffffff 0%, #e8edf5 35%, #cbd5e1 65%, #94a3b8 100%)"
                onClick={() => onSwitch?.('home')}
              />
              <NavButton
                icon={Compass}
                label="EXPLORAR"
                active={isExplore}
                gradientId="nav-gold-grad"
                activeTextGradient="linear-gradient(135deg, #fff8e7 0%, #f0d080 30%, #d4b87a 65%, #b8975a 100%)"
                onClick={() => onSwitch?.('explorar')}
              />
            </div>
          </nav>
        </motion.div>
      </div>
    </>
  )
}

function NavButton({
  icon: Icon,
  label,
  active,
  gradientId,
  activeTextGradient,
  onClick,
}: {
  icon: typeof Home
  label: string
  active: boolean
  gradientId: string
  activeTextGradient: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '11px 8px',
        fontSize: '10.5px',
        fontWeight: 300,
        letterSpacing: '0.16em',
        fontFamily: 'Poppins, sans-serif',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        zIndex: 10,
        borderRadius: '90px',
        transition: 'all 0.3s cubic-bezier(0.22,0.61,0.36,1)',
        opacity: active ? 1 : 0.48,
        transform: active ? 'scale(1.04)' : 'scale(1)',
        background: 'transparent',
        border: 'none',
        outline: 'none',
      }}
    >
      {/* Ícone — gradiente metálico quando ativo */}
      <Icon
        style={{
          width: 18,
          height: 18,
          strokeWidth: active ? '2.5px' : '1.8px',
          stroke: active ? `url(#${gradientId})` : 'rgba(190,200,215,0.65)',
          filter: active
            ? 'drop-shadow(0 0 5px rgba(255,255,255,0.45)) drop-shadow(0 1px 3px rgba(0,0,0,0.7))'
            : 'none',
          flexShrink: 0,
          transition: 'all 0.3s ease',
        }}
      />

      {/* Label — BUG FIX: inativo usa `color`, NÃO `background` */}
      {active ? (
        <span
          style={{
            background: activeTextGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {label}
        </span>
      ) : (
        <span style={{ color: 'rgba(190,200,215,0.65)' }}>
          {label}
        </span>
      )}
    </button>
  )
}
