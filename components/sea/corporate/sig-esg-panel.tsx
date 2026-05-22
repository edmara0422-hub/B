'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Leaf, Heart, Shield, AlertCircle, CheckSquare, Square } from 'lucide-react'

type EsgIndicator = {
  id: string
  label: string
  weight: number
  checked: boolean
  category: 'E' | 'S' | 'G'
}

export function SigEsgPanel() {
  const [indicators, setIndicators] = useState<EsgIndicator[]>([
    { id: 'e1', label: 'Monitoramento e inventário de pegada de carbono (Gases de Efeito Estufa)', weight: 35, checked: true, category: 'E' },
    { id: 'e2', label: 'Redução e destinação inteligente de resíduos de TI / Lixo eletrônico', weight: 30, checked: true, category: 'E' },
    { id: 'e3', label: 'Compensação ativa de emissões através de créditos de carbono certificados', weight: 35, checked: false, category: 'E' },
    
    { id: 's1', label: 'Equidade e diversidade nos cargos de liderança (Mínimo de 40% de representação)', weight: 40, checked: true, category: 'S' },
    { id: 's2', label: 'Políticas ativas de saúde mental e bem-estar (Pulse Clima Semanal ativo)', weight: 35, checked: true, category: 'S' },
    { id: 's3', label: 'Programas de capacitação continuada e microaulas de competência', weight: 25, checked: false, category: 'S' },
    
    { id: 'g1', label: 'Canal de Denúncias 100% anônimo e independente integrado à LGPD', weight: 40, checked: true, category: 'G' },
    { id: 'g2', label: 'Conselho Consultivo composto por membros independentes e auditoria', weight: 30, checked: true, category: 'G' },
    { id: 'g3', label: 'Código de Conduta e Ética homologado por 100% dos colaboradores', weight: 30, checked: false, category: 'G' }
  ])

  const [scoreE, setScoreE] = useState(0)
  const [scoreS, setScoreS] = useState(0)
  const [scoreG, setScoreG] = useState(0)
  const [overallScore, setOverallScore] = useState(0)

  useEffect(() => {
    const eItems = indicators.filter(i => i.category === 'E')
    const sItems = indicators.filter(i => i.category === 'S')
    const gItems = indicators.filter(i => i.category === 'G')

    const calcCat = (items: EsgIndicator[]) => {
      const activeWeight = items.reduce((acc, i) => acc + (i.checked ? i.weight : 0), 0)
      return Math.round(activeWeight)
    }

    const valE = calcCat(eItems)
    const valS = calcCat(sItems)
    const valG = calcCat(gItems)

    setScoreE(valE)
    setScoreS(valS)
    setScoreG(valG)
    setOverallScore(Math.round((valE + valS + valG) / 3))
  }, [indicators])

  function handleToggle(id: string) {
    setIndicators(indicators.map(ind => ind.id === id ? { ...ind, checked: !ind.checked } : ind))
  }

  // Circular progress math
  const circum = 100.53 // 2 * Math.PI * 16 (for r=16 on a 36x36 viewBox)
  const offsetE = circum - (scoreE / 100) * circum
  const offsetS = circum - (scoreS / 100) * circum
  const offsetG = circum - (scoreG / 100) * circum

  return (
    <div className="ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] space-y-6">
      <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
        <div>
          <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">SIG · ESG</span>
          <h3 className="text-sm font-semibold text-white/90">Diagnóstico ESG &amp; Governança</h3>
          <p className="text-[10px] text-white/40">Métricas ambientais, sociais e corporativas integradas ao ecossistema IPB</p>
        </div>
        <div className="text-right">
          <span className="text-[7.5px] uppercase tracking-widest text-white/40 block">Score Geral ESG</span>
          <span className="text-sm font-bold font-mono text-[#d4b87a]">{overallScore}/100</span>
        </div>
      </div>

      {/* SVG ESG Progress Rings */}
      <div className="grid grid-cols-3 gap-4 py-2">
        {/* E - Environmental */}
        <div className="flex flex-col items-center justify-center space-y-2 p-3 bg-black/20 border border-white/[0.03] rounded-[0.8rem]">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2.5" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#d4b87a"
                strokeWidth="2.5"
                strokeDasharray={`${circum}`}
                style={{
                  strokeDashoffset: offsetE,
                  transition: 'stroke-dashoffset 0.5s ease',
                  strokeLinecap: 'round'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white">
              {scoreE}%
            </div>
          </div>
          <span className="text-[9px] font-semibold text-white/80 flex items-center gap-1">
            <Leaf className="h-2.5 w-2.5 text-[#5dcaa5]" /> Ambiental (E)
          </span>
        </div>

        {/* S - Social */}
        <div className="flex flex-col items-center justify-center space-y-2 p-3 bg-black/20 border border-white/[0.03] rounded-[0.8rem]">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2.5" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#d4b87a"
                strokeWidth="2.5"
                strokeDasharray={`${circum}`}
                style={{
                  strokeDashoffset: offsetS,
                  transition: 'stroke-dashoffset 0.5s ease',
                  strokeLinecap: 'round'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white">
              {scoreS}%
            </div>
          </div>
          <span className="text-[9px] font-semibold text-white/80 flex items-center gap-1">
            <Heart className="h-2.5 w-2.5 text-red-400" /> Social (S)
          </span>
        </div>

        {/* G - Governance */}
        <div className="flex flex-col items-center justify-center space-y-2 p-3 bg-black/20 border border-white/[0.03] rounded-[0.8rem]">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2.5" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#d4b87a"
                strokeWidth="2.5"
                strokeDasharray={`${circum}`}
                style={{
                  strokeDashoffset: offsetG,
                  transition: 'stroke-dashoffset 0.5s ease',
                  strokeLinecap: 'round'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white">
              {scoreG}%
            </div>
          </div>
          <span className="text-[9px] font-semibold text-white/80 flex items-center gap-1">
            <Shield className="h-2.5 w-2.5 text-[#5082e6]" /> Governança (G)
          </span>
        </div>
      </div>

      {/* Checklists per category */}
      <div className="space-y-4 pt-2">
        {['E', 'S', 'G'].map(cat => {
          const catLabel = cat === 'E' ? 'Ambiental' : cat === 'S' ? 'Social' : 'Governança'
          const catColor = cat === 'E' ? '#5dcaa5' : cat === 'S' ? '#fac775' : '#5082e6'
          const items = indicators.filter(i => i.category === cat)

          return (
            <div key={cat} className="space-y-2">
              <span 
                className="text-[7.5px] uppercase tracking-widest block font-bold"
                style={{ color: catColor }}
              >
                Iniciativas de Impacto {catLabel}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {items.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleToggle(item.id)}
                    className="flex items-center justify-between p-2.5 bg-black/25 hover:bg-black/35 border border-white/[0.03] rounded-[0.6rem] transition cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1 pr-2">
                      <input 
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}} // toggled on div click
                        className="h-3.5 w-3.5 accent-[#d4b87a] mt-0.5 cursor-pointer shrink-0"
                      />
                      <span className="text-[10.5px] text-white/80 leading-normal">{item.label}</span>
                    </div>
                    <span className="text-[8.5px] font-mono font-bold text-[#d4b87a] bg-white/[0.02] px-2 py-0.5 rounded-[0.3rem] shrink-0">
                      +{item.weight}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
