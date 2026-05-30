'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Globe, Users, Leaf } from 'lucide-react'

import dynamic from 'next/dynamic'

// Lightweight Mini components are imported from separate lightweight files
import { MiniEstrategia } from './mini-estrategia'
import { MiniCapitalHumano } from './mini-capital-humano'
import { MiniFinancas } from './mini-financas'
import { MiniEsg } from './mini-esg'
import { MiniAi } from './mini-ai'

// Heavy HUD components are lazy loaded to prevent UI blocking
const HudEstrategia = dynamic(() => import('./hud-estrategia').then(m => m.HudEstrategia), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudCapitalHumano = dynamic(() => import('./hud-capital-humano').then(m => m.HudCapitalHumano), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudFinancas = dynamic(() => import('./hud-financas').then(m => m.HudFinancas), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudEsg = dynamic(() => import('./hud-esg').then(m => m.HudEsg), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudAi = dynamic(() => import('./hud-ai').then(m => m.HudAi), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })

type SystemId = 'ai' | 'financas' | 'estrategia' | 'capital_humano' | 'esg'

interface SystemDef {
  id: SystemId
  title: string
  icon: any
  color: string
}

const SYSTEMS: Record<SystemId, SystemDef> = {
  ai: { id: 'ai', title: 'IPB AI', icon: Sparkles, color: '#d4b87a' },
  financas: { id: 'financas', title: 'Finanças', icon: TrendingUp, color: '#d4b87a' },
  estrategia: { id: 'estrategia', title: 'Estratégia', icon: Globe, color: '#d4b87a' },
  capital_humano: { id: 'capital_humano', title: 'Cap. Humano', icon: Users, color: '#d4b87a' },
  esg: { id: 'esg', title: 'Governança & ESG', icon: Leaf, color: '#d4b87a' },
}

const ALL_SYSTEMS: SystemId[] = ['capital_humano', 'estrategia', 'financas', 'ai', 'esg']

export function InteractiveCockpit() {
  // L1, L2, Center, R1, R2
  const [layout, setLayout] = useState<SystemId[]>(['capital_humano', 'estrategia', 'financas', 'ai', 'esg'])

  const handleSwap = (clickedId: SystemId) => {
    if (layout[2] === clickedId) return // Already center

    setLayout((prev) => {
      const newLayout = [...prev]
      const centerIdx = 2
      const clickedIdx = newLayout.indexOf(clickedId)

      // Swap
      const temp = newLayout[centerIdx]
      newLayout[centerIdx] = newLayout[clickedIdx]
      newLayout[clickedIdx] = temp

      return newLayout
    })
  }

  // Render a specific card (either mini or hero)
  const renderCard = (sysId: SystemId) => {
    const index = layout.indexOf(sysId)
    const isHero = index === 2
    const isInteractive = !isHero

    // Tradução de IDs para manter compatibilidade com as classes CSS de globals.css
    const styleClass = sysId === 'financas' ? 'pneumo' : sysId === 'estrategia' ? 'cardio' : sysId === 'capital_humano' ? 'neuro' : sysId

    // Determine the exact class based on system ID and whether it's hero
    const wrapperClass = isHero
      ? `hero-wrapper ${styleClass}`
      : sysId === 'ai'
        ? 'mini-ai-card'
        : sysId === 'esg'
          ? 'mini-esg-card'
          : `mini-sim-card ${styleClass}`

    const cardProps = {
      className: `cockpit-card ${wrapperClass} w-full h-full`,
      onClick: isInteractive ? () => handleSwap(sysId) : undefined,
      style: {
        cursor: isInteractive ? 'pointer' : 'default',
      },
    }

    const slotClass = `slot-${
      index === 0 ? 'L1' : index === 1 ? 'L2' : index === 2 ? 'C' : index === 3 ? 'R1' : 'R2'
    }`

    return (
      <motion.div
        layout
        key={sysId}
        className={`cockpit-slot ${slotClass}`}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
      >
        <div {...cardProps}>
          {/* We keep both mini and hero contents mounted so canvases stay alive. */}
          <div className="mini-container" style={{ display: isHero ? 'none' : 'block', height: '100%', width: '100%' }}>
            {renderMiniContent(sysId)}
          </div>
          <div className="hero-inner-scroll" style={{ display: isHero ? 'flex' : 'none', flex: 1, overflowY: 'auto', minHeight: 0, flexDirection: 'column', paddingBottom: '100px', height: '100%' }}>
            {renderHeroContent(sysId)}
          </div>
          {isInteractive && (
            <div className="card-expand-hint">
              <span>Abrir</span> no Centro
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  const renderHeroContent = (sysId: SystemId) => {
    switch (sysId) {
      case 'estrategia': return <HudEstrategia />
      case 'capital_humano': return <HudCapitalHumano />
      case 'financas': return <HudFinancas />
      case 'esg': return <HudEsg />
      case 'ai': return <HudAi />
      default: return null
    }
  }

  const renderMiniContent = (sysId: SystemId) => {
    switch (sysId) {
      case 'estrategia': return <MiniEstrategia />
      case 'capital_humano': return <MiniCapitalHumano />
      case 'financas': return <MiniFinancas />
      case 'esg': return <MiniEsg />
      case 'ai': return <MiniAi />
      default: return null
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Mobile Systems Switcher */}
      <div className="flex min-[1025px]:hidden items-center justify-between gap-1 p-1 rounded-2xl bg-black/45 border border-white/5 backdrop-blur-xl">
        {ALL_SYSTEMS.map((sysId) => {
          const sys = SYSTEMS[sysId]
          const active = layout[2] === sysId
          const Icon = sys.icon
          return (
            <button
              key={sysId}
              onClick={() => handleSwap(sysId)}
              className="flex flex-col items-center gap-1 flex-1 py-2 rounded-xl transition cursor-pointer"
              style={{
                background: active ? 'rgba(212, 184, 122, 0.12)' : 'transparent',
                border: active ? '0.2px solid rgba(212, 184, 122, 0.35)' : '0.2px solid transparent',
                boxShadow: active ? 'inset 0 1px 0 rgba(212,184,122,0.12), 0 4px 12px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              <Icon className="h-4 w-4 shrink-0" style={{ color: active ? '#d4b87a' : 'rgba(255,255,255,0.36)' }} />
              <span className="text-[7.5px] font-semibold tracking-wider uppercase text-center" style={{ color: active ? '#fff' : 'rgba(255,255,255,0.26)' }}>
                {sys.title.split(' ')[0]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Grid */}
      <div className="cockpit-stage-grid">
        {/* The 5 absolute-positioned card slots */}
        {ALL_SYSTEMS.map((sysId) => renderCard(sysId))}
      </div>
    </div>
  )
}


