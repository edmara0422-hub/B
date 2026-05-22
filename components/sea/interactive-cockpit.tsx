'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Brain, Wind, Leaf, Sparkles } from 'lucide-react'

import dynamic from 'next/dynamic'

// Lightweight Mini components are imported from separate lightweight files
import { MiniCardio } from './mini-cardio'
import { MiniNeuro } from './mini-neuro'
import { MiniPneumo } from './mini-pneumo'
import { MiniEsg } from './mini-esg'
import { MiniAi } from './mini-ai'

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

const ALL_SYSTEMS: SystemId[] = ['neuro', 'cardio', 'pneumo', 'ai', 'esg']

export function InteractiveCockpit() {
  // L1, L2, Center, R1, R2
  const [layout, setLayout] = useState<SystemId[]>(['neuro', 'cardio', 'pneumo', 'ai', 'esg'])

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

    // Determine the exact class based on system ID and whether it's hero
    const wrapperClass = isHero
      ? `hero-wrapper ${sysId}`
      : sysId === 'ai'
        ? 'mini-ai-card'
        : sysId === 'esg'
          ? 'mini-esg-card'
          : `mini-sim-card ${sysId}`

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


        {/* The 5 absolute-positioned card slots */}
        {ALL_SYSTEMS.map((sysId) => renderCard(sysId))}
      </div>
    </div>
  )
}

