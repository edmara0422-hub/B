'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Globe, Users, Leaf, ShieldAlert } from 'lucide-react'

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

  // Telemetria real-time integrada para a Matriz de Interdependência da Home
  const [faturamento, setFaturamento] = useState(150)
  const [cac, setCac] = useState(350)
  const [opex, setOpex] = useState(60)
  const [clientes, setClientes] = useState(1200)
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setFaturamento(telemetry.faturamento ?? 150)
        setCac(telemetry.cac ?? 350)
        setOpex(telemetry.opex ?? 60)
        setClientes(telemetry.clientes ?? 1200)
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
        setCenario(telemetry.cenario ?? 'normal')
      }
    }
    handleTelemetry()
    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  // --- ANÁLISE DE DADOS EM TEMPO REAL CONECTADA ÀS EQUAÇÕES EXATAS DO IPB ---
  const eebBurnout = useMemo(() => {
    return Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  }, [pressaoMetas])

  const turnover = useMemo(() => {
    return Number((38 + Math.pow(pressaoMetas, 1.4) * 2.5).toFixed(1))
  }, [pressaoMetas])

  const iaeStress = useMemo(() => {
    return Number((9.3 + pressaoMetas * 7.5).toFixed(1))
  }, [pressaoMetas])

  const ebitdaMarginVal = useMemo(() => {
    const base = 83.5 - (eebBurnout * 0.18)
    return Number((base > 0 ? base : 10).toFixed(1))
  }, [eebBurnout])

  const wacc = useMemo(() => {
    return cenario === 'juros_altos' ? 18.9 : 17.2
  }, [cenario])

  const ltvCac = useMemo(() => {
    const ticketMedio = (faturamento * 1000) / (clientes || 1)
    const churn = 0.025
    const ltv = ticketMedio / churn
    return cac > 0 ? Number((ltv / cac).toFixed(2)) : 3.2
  }, [faturamento, clientes, cac])

  const selicVal = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39

  // --- MATRIZ DE INTERDEPENDÊNCIA & REGRAS DE DECISÃO CRUZADAS (IA) ---
  const dynamicRules = useMemo(() => {
    const rules = []
    
    // Regra 1: O Custo Financeiro do Esgotamento Humano (Turnover & LTV/CAC)
    if (eebBurnout > 25 && ltvCac > 3.0) {
      const custoEstimadoAnual = Math.round(turnover * 1.5 * 30)
      rules.push({
        type: 'critical',
        title: 'CASCATA 1: ESGOTAMENTO HUMANO',
        desc: `Burnout Coletivo em ${eebBurnout}% E LTV/CAC saudável em ${ltvCac}x. Custo estimado de Turnover anualizado de R$ ${custoEstimadoAnual}k. Ação automatizada: Reduzir metas operacionais em 15% esta semana para estancar perdas e evitar fadiga comercial.`
      })
    }

    // Regra 2: Alocação de Caixa vs WACC & SELIC
    if (selicVal > 14.0) {
      rules.push({
        type: 'warning',
        title: 'CASCATA 2: PROTEÇÃO DE CAIXA',
        desc: `SELIC elevada a ${selicVal}%. O custo da dívida explodiu, pressionando o WACC corporativo para ${wacc}%. Ação: Travar imediatamente novos empréstimos PJ e alocar 40% do caixa líquido operacional em ativos CDI de alta liquidez.`
      })
    }

    // Regra 3: Eficiência Saudável (EBITDA / Estresse)
    if (iaeStress > 45.0) {
      rules.push({
        type: 'alert',
        title: 'CASCATA 3: CRESCIMENTO INSUSTENTÁVEL',
        desc: `Faturamento active, mas Ansiedade PSS-10 atingiu nível crítico de ${iaeStress}%. Sinistralidade médica escalou 28%. Ação recomendada: Iniciar escala reduzida 4x3 e rotatividade preventiva de lideranças para blindar a produtividade.`
      })
    }

    return rules
  }, [eebBurnout, ltvCac, turnover, cenario, wacc, ebitdaMarginVal, iaeStress, selicVal])

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

      {/* MATRIZ DE INTERDEPENDÊNCIA & REGRAS DE DECISÃO CRUZADAS (IA) */}
      <div className="p-4 rounded-3xl backdrop-blur-xl border select-none mt-2" style={{ background: 'rgba(15, 12, 8, 0.65)', borderColor: 'rgba(212, 184, 122, 0.15)' }}>
        <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(212, 184, 122, 0.15)' }}>
          <ShieldAlert className="h-4 w-4 text-[#d4b87a]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#d4b87a]">
            MATRIZ DE INTERDEPENDÊNCIA 6D • REGRAS DE DECISÃO DE IA
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dynamicRules.map((rule, idx) => (
            <div 
              key={idx} 
              className="rounded-xl p-3 border text-[9px] leading-normal flex flex-col gap-1"
              style={{
                borderColor: rule.type === 'critical' ? 'rgba(248,113,113,0.2)' : rule.type === 'warning' ? 'rgba(250,204,21,0.2)' : 'rgba(96,165,250,0.2)',
                background: rule.type === 'critical' ? 'rgba(248,113,113,0.03)' : rule.type === 'warning' ? 'rgba(250,204,21,0.03)' : 'rgba(96,165,250,0.02)',
              }}
            >
              <span 
                className="font-bold tracking-wider text-[8.5px] uppercase"
                style={{
                  color: rule.type === 'critical' ? '#fca5a5' : rule.type === 'warning' ? '#fde68a' : '#93c5fd'
                }}
              >
                {rule.title}
              </span>
              <p className="text-white/65 mt-0.5">{rule.desc}</p>
            </div>
          ))}
          {dynamicRules.length === 0 && (
            <div className="col-span-3 text-center text-white/35 py-2 text-[9px] font-semibold">
              Nenhum risco cruzado crítico detectado. Operação está em perfeito equilíbrio.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
