'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Brain, Wind, Leaf, Sparkles } from 'lucide-react'

// Sub-components that we will create next
import { HudCardio, MiniCardio } from './hud-cardio'
import { HudNeuro, MiniNeuro } from './hud-neuro'
import { HudPneumo, MiniPneumo } from './hud-pneumo'
import { HudEsg, MiniEsg } from './hud-esg'
import { HudAi, MiniAi } from './hud-ai'

type SystemId = 'ai' | 'pneumo' | 'cardio' | 'neuro' | 'esg'

interface SystemDef {
  id: SystemId
  title: string
  icon: any
  color: string
}

const SYSTEMS: Record<SystemId, SystemDef> = {
  ai: { id: 'ai', title: 'IPB AI', icon: Sparkles, color: '#e8cc88' },
  pneumo: { id: 'pneumo', title: 'Pulmão', icon: Wind, color: '#60a5fa' },
  cardio: { id: 'cardio', title: 'Coração', icon: Activity, color: '#f87171' },
  neuro: { id: 'neuro', title: 'Cérebro', icon: Brain, color: '#4ade80' },
  esg: { id: 'esg', title: 'Governança & ESG', icon: Leaf, color: '#c5a55a' },
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
        height: isHero ? '100%' : undefined,
        cursor: isInteractive ? 'pointer' : 'default',
      },
    }

    return (
      <motion.div {...cardProps} key={sysId} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        {isHero ? renderHeroContent(sysId) : renderMiniContent(sysId)}
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
        <div className="cockpit-grid-col cockpit-mini-col">
          <div className="cockpit-col-label">Simulações</div>
          <div style={{ height: '160px' }}>{renderCard(layout[0], false)}</div>
          <div style={{ height: '180px' }}>{renderCard(layout[1], false)}</div>
        </div>

        {/* Center Column (Hero) */}
        <div className="cockpit-grid-col cockpit-hero-col">
          {renderCard(layout[2], true)}
        </div>

        {/* Right Column */}
        <div className="cockpit-grid-col cockpit-mini-col">
          <div className="cockpit-col-label">Inteligência & Valor</div>
          <div style={{ height: '160px' }}>{renderCard(layout[3], false)}</div>
          <div style={{ height: '180px' }}>{renderCard(layout[4], false)}</div>
        </div>
      </div>
    </div>
  )
}
