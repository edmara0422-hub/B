'use client'

import { useState, useEffect, useMemo } from 'react'
import { Sparkles, TrendingUp, Globe, Users, Leaf, ChevronRight } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'

// Importando os componentes tridimensionais procedurais exportados
import { BrainParticles } from './mini-capital-humano'
import { StrategyGlobe } from './mini-estrategia'
import { EsgShield } from './mini-esg'

// Importação dinâmica dos painéis de detalhes (HUDs) para performance impecável
const HudEstrategia = dynamic(() => import('./hud-estrategia').then(m => m.HudEstrategia), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudCapitalHumano = dynamic(() => import('./hud-capital-humano').then(m => m.HudCapitalHumano), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudFinancas = dynamic(() => import('./hud-financas').then(m => m.HudFinancas), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudEsg = dynamic(() => import('./hud-esg').then(m => m.HudEsg), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudAi = dynamic(() => import('./hud-ai').then(m => m.HudAi), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })

type SystemId = 'financas' | 'capital_humano' | 'estrategia' | 'esg' | 'ai'

export function InteractiveCockpit() {
  const [activePanel, setActivePanel] = useState<SystemId>('financas')
  const [mounted, setMounted] = useState(false)

  // Telemetria real-time integrada para cálculo de dados do dashboard
  const [faturamento, setFaturamento] = useState(150)
  const [opex, setOpex] = useState(60)
  const [cac, setCac] = useState(350)
  const [clientes, setClientes] = useState(1200)
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  useEffect(() => {
    setMounted(true)
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setFaturamento(telemetry.faturamento ?? 150)
        setOpex(telemetry.opex ?? 60)
        setCac(telemetry.cac ?? 350)
        setClientes(telemetry.clientes ?? 1200)
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
        setCenario(telemetry.cenario ?? 'normal')
      }
    }
    handleTelemetry()
    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  // --- ANÁLISE DE DADOS EM TEMPO REAL CONECTADA À TELEMETRIA ---
  
  // 1. Métricas de Capital Humano derivadas da simulação financeira
  const engagement = useMemo(() => {
    return Math.round(Math.max(40, 95 - pressaoMetas * 3.5 + (cenario === 'ia_boom' ? 8 : 0)))
  }, [pressaoMetas, cenario])

  const retention = useMemo(() => {
    const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
    return Number((100 - turnoverAnual * 0.85).toFixed(1))
  }, [pressaoMetas])

  const talent = useMemo(() => {
    return Number((15 + (100 - pressaoMetas * 10) * 0.15).toFixed(1))
  }, [pressaoMetas])

  // 2. Métricas de Estratégia derivadas da receita, clientes e CAC
  const globalMarketSharePercent = useMemo(() => {
    return Number((5.5 + clientes * 0.005 + (cenario === 'ia_boom' ? 15 : 0)).toFixed(1))
  }, [clientes, cenario])

  const growthOutlookVal = useMemo(() => {
    // Projeta o crescimento com base no faturamento virtual e cac
    const base = (faturamento * 1.5 - opex * 0.2)
    return Number((base > 0 ? base : 50.4).toFixed(1))
  }, [faturamento, opex])

  // 3. Métricas de Sustentabilidade baseadas no compliance e opex
  const esgPerformance = useMemo(() => {
    return Math.round(Math.max(50, 98 - pressaoMetas * 3.2))
  }, [pressaoMetas])

  const carbonFootprint = useMemo(() => {
    // Menos opex de infraestrutura e maior eficiência diminui a pegada de carbono
    const base = 15.5 - (esgPerformance / 15) + (opex * 0.05)
    return Number((base > 0 ? base : 13.5).toFixed(2))
  }, [esgPerformance, opex])

  // Renderiza o painel ativo na coluna direita
  const renderHeroContent = () => {
    switch (activePanel) {
      case 'financas': return <HudFinancas />
      case 'capital_humano': return <HudCapitalHumano />
      case 'estrategia': return <HudEstrategia />
      case 'esg': return <HudEsg />
      case 'ai': return <HudAi />
      default: return <HudFinancas />
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-container {
          background: rgba(10, 10, 12, 0.45);
          border: 1px solid rgba(212, 184, 122, 0.08);
        }
        .cockpit-side-card {
          height: 235px;
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cockpit-side-card:hover {
          border-color: rgba(212, 184, 122, 0.40) !important;
          background: rgba(15, 14, 12, 0.85) !important;
          box-shadow: 0 0 25px rgba(212, 184, 122, 0.15) !important;
        }
      `}} />

      {/* Cabeçalho Executivo Dourado do Cockpit */}
      <div className="w-full flex justify-between items-center dashboard-container p-4 rounded-2xl backdrop-blur-md select-none">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#d4b87a] animate-pulse" />
          <h1 className="text-white text-lg font-black tracking-widest uppercase">
            BUSINESS INTELLIGENCE <span className="text-[#d4b87a]">COCKPIT</span>
          </h1>
        </div>
        <span className="text-xs font-mono text-white/40 font-bold uppercase tracking-wider">
          SEP 2024
        </span>
      </div>

      {/* Grade Principal de 2 Colunas Fixas (Mockup Idêntico) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[38%_62%] gap-6 items-stretch min-h-[750px]">
        
        {/* COLUNA ESQUERDA: Os 3 Cards Analíticos Tridimensionais Fixados */}
        <div className="flex flex-col gap-5 justify-between">
          
          {/* Card 1: CAP. HUMANO */}
          <div 
            onClick={() => setActivePanel('capital_humano')}
            className={`cockpit-side-card cockpit-card mini-sim-card neuro flex flex-col justify-between cursor-pointer select-none rounded-3xl ${
              activePanel === 'capital_humano' ? 'border-[#d4b87a] bg-[#0f0e0a]/95 shadow-[0_0_25px_rgba(212,184,122,0.2)]' : 'border-white/10'
            }`}
          >
            {/* Background WebGL 3D Canvas - Alinhado à esquerda */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas camera={{ position: [0.45, 0, 1.8], fov: 45 }}>
                  <ambientLight intensity={1.8} />
                  <BrainParticles pressaoMetas={pressaoMetas} />
                </Canvas>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-[10.5px] font-bold text-white tracking-widest uppercase">1) CAP. HUMANO</span>
              <button className="text-[9.5px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5 hover:text-white transition-colors">
                Cap. Humano <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Content (Métricas Douradas Direitas do Mockup) */}
            <div className="flex-1 w-full flex items-center z-10 pointer-events-none select-none">
              <div className="ml-auto w-[52%] flex flex-col justify-center pl-2 space-y-2.5">
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Engagement</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{engagement}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Retention</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{retention}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Talent</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{talent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: ESTRATÉGIA */}
          <div 
            onClick={() => setActivePanel('estrategia')}
            className={`cockpit-side-card cockpit-card mini-sim-card cardio flex flex-col justify-between cursor-pointer select-none rounded-3xl ${
              activePanel === 'estrategia' ? 'border-[#d4b87a] bg-[#0f0e0a]/95 shadow-[0_0_25px_rgba(212,184,122,0.2)]' : 'border-white/10'
            }`}
          >
            {/* Background WebGL 3D Canvas - Alinhado à esquerda */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas camera={{ position: [0.45, 0, 1.8], fov: 45 }}>
                  <ambientLight intensity={1.8} />
                  <StrategyGlobe cenario={cenario} />
                </Canvas>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-[10.5px] font-bold text-white tracking-widest uppercase">2) ESTRATÉGIA</span>
              <button className="text-[9.5px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5 hover:text-white transition-colors">
                Estratégia <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Content (Métricas Douradas Direitas do Mockup) */}
            <div className="flex-1 w-full flex items-center z-10 pointer-events-none select-none">
              <div className="ml-auto w-[52%] flex flex-col justify-center pl-2 space-y-2.5">
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Global Market Share</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">+{globalMarketSharePercent}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Global Market Share</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">88%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Growth Outlook</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">${growthOutlookVal}k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: SUSTENTABILIDADE */}
          <div 
            onClick={() => setActivePanel('esg')}
            className={`cockpit-side-card cockpit-card mini-esg-card flex flex-col justify-between cursor-pointer select-none rounded-3xl ${
              activePanel === 'esg' ? 'border-[#d4b87a] bg-[#0f0e0a]/95 shadow-[0_0_25px_rgba(212,184,122,0.2)]' : 'border-white/10'
            }`}
          >
            {/* Background WebGL 3D Canvas - Alinhado à esquerda */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas camera={{ position: [0.45, 0, 1.8], fov: 45 }}>
                  <ambientLight intensity={1.8} />
                  <EsgShield />
                </Canvas>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-[10.5px] font-bold text-white tracking-widest uppercase">3) SUSTENTABILIDADE</span>
              <button className="text-[9.5px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5 hover:text-white transition-colors">
                Sustentabilidade <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Content (Métricas Douradas Direitas do Mockup) */}
            <div className="flex-1 w-full flex items-center z-10 pointer-events-none select-none">
              <div className="ml-auto w-[52%] flex flex-col justify-center pl-2 space-y-4">
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">ESG Performance</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{esgPerformance}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Carbon Footprint</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{carbonFootprint}M</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA: O Painel de Análise Dinâmico Ativo */}
        <div className="flex-1 flex flex-col">
          {renderHeroContent()}
        </div>

      </div>
    </div>
  )
}
