'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Brain, Wind, Leaf, Sparkles } from 'lucide-react'

import dynamic from 'next/dynamic'

// Lightweight Mini components remain statically imported
import { MiniCardio } from './hud-cardio'
import { MiniNeuro } from './hud-neuro'
import { MiniPneumo } from './hud-pneumo'
import { MiniEsg } from './hud-esg'
import { MiniAi } from './hud-ai'

// Heavy HUD components are lazy loaded to prevent UI blocking
const HudCardio = dynamic(() => import('./hud-cardio').then(m => m.HudCardio), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudNeuro = dynamic(() => import('./hud-neuro').then(m => m.HudNeuro), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudPneumo = dynamic(() => import('./hud-pneumo').then(m => m.HudPneumo), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudEsg = dynamic(() => import('./hud-esg').then(m => m.HudEsg), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudAi = dynamic(() => import('./hud-ai').then(m => m.HudAi), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })

type SystemId = 'ai' | 'pneumo' | 'cardio' | 'neuro' | 'esg'

interface SystemDef {
  id: SystemId
  title: string
  icon: any
  color: string
}

const SYSTEMS: Record<SystemId, SystemDef> = {
  ai: { id: 'ai', title: 'IPB AI', icon: Sparkles, color: '#d4b87a' },
  pneumo: { id: 'pneumo', title: 'Pulmão', icon: Wind, color: '#60a5fa' },
  cardio: { id: 'cardio', title: 'Coração', icon: Activity, color: '#f87171' },
  neuro: { id: 'neuro', title: 'Cérebro', icon: Brain, color: '#4ade80' },
  esg: { id: 'esg', title: 'Governança & ESG', icon: Leaf, color: '#d4b87a' },
}

export function InteractiveCockpit() {
  // L1, L2, Center, R1, R2
  const [layout, setLayout] = useState<SystemId[]>(['ai', 'pneumo', 'cardio', 'neuro', 'esg'])

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
  const renderCard = (sysId: SystemId, isHero: boolean) => {
    const isInteractive = !isHero

    // Determine the exact class based on system ID and whether it's hero
    const wrapperClass = isHero
      ? `hero-wrapper ${sysId}`
      : sysId === 'ai'
        ? 'mini-ai-card'
        : sysId === 'esg'
          ? 'mini-esg-card'
          : `mini-sim-card ${sysId}`

    const cardProps = {
      layoutId: `card-${sysId}`,
      className: `cockpit-card ${wrapperClass}`,
      onClick: isInteractive ? () => handleSwap(sysId) : undefined,
      style: {
        height: '100%',
        cursor: isInteractive ? 'pointer' : 'default',
      },
    }

    return (
      <motion.div {...cardProps} key={sysId} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        {isHero ? (
          <div className="hero-inner-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column', paddingBottom: '100px' }}>
            {renderHeroContent(sysId)}
          </div>
        ) : renderMiniContent(sysId)}
        {isInteractive && (
          <div className="card-expand-hint">
            <span>Abrir</span> no Centro
          </div>
        )}
      </motion.div>
    )
  }

  const renderHeroContent = (sysId: SystemId) => {
    switch (sysId) {
      case 'cardio': return <HudCardio />
      case 'neuro': return <HudNeuro />
      case 'pneumo': return <HudPneumo />
      case 'esg': return <HudEsg />
      case 'ai': return <HudAi />
      default: return null
    }
  }

  const renderMiniContent = (sysId: SystemId) => {
    switch (sysId) {
      case 'cardio': return <MiniCardio />
      case 'neuro': return <MiniNeuro />
      case 'pneumo': return <MiniPneumo />
      case 'esg': return <MiniEsg />
      case 'ai': return <MiniAi />
      default: return null
    }
  }

  return (
    <div className="w-full">
      {/* Main Grid */}
      <div className="cockpit-stage-grid">
        {/* Left Column */}
        <div className="cockpit-grid-col cockpit-mini-col flex flex-col h-full">
          <div className="cockpit-col-label shrink-0">Simulações</div>
          <div className="flex-1 min-h-0">{renderCard(layout[0], false)}</div>
          <div className="flex-1 min-h-0">{renderCard(layout[1], false)}</div>
        </div>

        {/* Center Column (Hero) */}
        <div className="cockpit-grid-col cockpit-hero-col">
          {renderCard(layout[2], true)}
        </div>

        {/* Right Column */}
        <div className="cockpit-grid-col cockpit-mini-col flex flex-col h-full">
          <div className="cockpit-col-label shrink-0">Inteligência & Valor</div>
          <div className="flex-1 min-h-0">{renderCard(layout[3], false)}</div>
          <div className="flex-1 min-h-0">{renderCard(layout[4], false)}</div>
        </div>
      </div>
    </div>
  )
}
