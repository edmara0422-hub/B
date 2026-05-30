'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

  // Telemetria local sincronizada em tempo real
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  useEffect(() => {
    setMounted(true)
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
        setCenario(telemetry.cenario ?? 'normal')
      }
    }
    handleTelemetry()
    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

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
      {/* Cabeçalho Executivo Dourado do Cockpit */}
      <div className="w-full flex justify-between items-center bg-black/40 border border-white/5 p-4 rounded-2xl backdrop-blur-md select-none">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#d4b87a] animate-pulse" />
          <h1 className="text-white text-lg font-black tracking-widest uppercase">
            BUSINESS INTELLIGENCE <span className="text-[#d4b87a]">COCKPIT</span>
          </h1>
        </div>
        <span className="text-xs font-mono text-white/40 font-bold uppercase tracking-wider">
          (D) SEP 2024
        </span>
      </div>

      {/* Grade Principal de 2 Colunas Fixas (Igual ao Mockup) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[38%_62%] gap-6 items-stretch min-h-[750px]">
        
        {/* COLUNA ESQUERDA: Os 3 Mini-Cards Tridimensionais Fixados */}
        <div className="flex flex-col gap-5 justify-between">
          
          {/* Card 1: CAP. HUMANO */}
          <div 
            onClick={() => setActivePanel('capital_humano')}
            className={`group relative overflow-hidden flex flex-col justify-between p-4 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl transition-all duration-300 cursor-pointer select-none h-[235px] ${
              activePanel === 'capital_humano' 
                ? 'border-[#d4b87a] shadow-[0_0_20px_rgba(212,184,122,0.15)] bg-[#0f0e0a]/90' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-xs font-bold text-white tracking-widest uppercase">1) CAP. HUMANO</span>
              <button className="text-[10px] font-mono font-bold text-[#d4b87a] hover:text-white transition-colors flex items-center gap-0.5">
                Cap. Humano <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Corpo (2 Colunas) */}
            <div className="flex items-center flex-1 w-full mt-2">
              {/* Left Side: 3D Brain Canvas */}
              <div className="w-[155px] h-[155px] relative shrink-0">
                {mounted && (
                  <div className="absolute inset-0 pointer-events-none opacity-90">
                    <Canvas camera={{ position: [0, 0, 2.3], fov: 45 }}>
                      <ambientLight intensity={1.5} />
                      <BrainParticles pressaoMetas={pressaoMetas} />
                    </Canvas>
                  </div>
                )}
              </div>

              {/* Right Side: Métricas do Mockup */}
              <div className="flex-1 flex flex-col justify-center pl-4 space-y-2.5 z-10">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold">Engagement</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">88%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold">Retention</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">47.7%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold">Talent</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">17.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: ESTRATÉGIA */}
          <div 
            onClick={() => setActivePanel('estrategia')}
            className={`group relative overflow-hidden flex flex-col justify-between p-4 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl transition-all duration-300 cursor-pointer select-none h-[235px] ${
              activePanel === 'estrategia' 
                ? 'border-[#d4b87a] shadow-[0_0_20px_rgba(212,184,122,0.15)] bg-[#0f0e0a]/90' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-xs font-bold text-white tracking-widest uppercase">2) ESTRATÉGIA</span>
              <button className="text-[10px] font-mono font-bold text-[#d4b87a] hover:text-white transition-colors flex items-center gap-0.5">
                Estratégia <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Corpo (2 Colunas) */}
            <div className="flex items-center flex-1 w-full mt-2">
              {/* Left Side: 3D Earth Globe Canvas */}
              <div className="w-[155px] h-[155px] relative shrink-0">
                {mounted && (
                  <div className="absolute inset-0 pointer-events-none opacity-90">
                    <Canvas camera={{ position: [0, 0, 2.3], fov: 45 }}>
                      <ambientLight intensity={1.5} />
                      <StrategyGlobe cenario={cenario} />
                    </Canvas>
                  </div>
                )}
              </div>

              {/* Right Side: Métricas do Mockup */}
              <div className="flex-1 flex flex-col justify-center pl-4 space-y-2.5 z-10">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold">Global Market Share</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">+12.5%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold">Global Market Share</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">88%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold">Growth Outlook</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">$205.4k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: SUSTENTABILIDADE */}
          <div 
            onClick={() => setActivePanel('esg')}
            className={`group relative overflow-hidden flex flex-col justify-between p-4 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl transition-all duration-300 cursor-pointer select-none h-[235px] ${
              activePanel === 'esg' 
                ? 'border-[#d4b87a] shadow-[0_0_20px_rgba(212,184,122,0.15)] bg-[#0f0e0a]/90' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-xs font-bold text-white tracking-widest uppercase">3) SUSTENTABILIDADE</span>
              <button className="text-[10px] font-mono font-bold text-[#d4b87a] hover:text-white transition-colors flex items-center gap-0.5">
                Sustentabilidade <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Corpo (2 Colunas) */}
            <div className="flex items-center flex-1 w-full mt-2">
              {/* Left Side: 3D Compliance Shield Canvas */}
              <div className="w-[155px] h-[155px] relative shrink-0">
                {mounted && (
                  <div className="absolute inset-0 pointer-events-none opacity-90">
                    <Canvas camera={{ position: [0, 0, 2.3], fov: 45 }}>
                      <ambientLight intensity={1.5} />
                      <EsgShield />
                    </Canvas>
                  </div>
                )}
              </div>

              {/* Right Side: Métricas do Mockup */}
              <div className="flex-1 flex flex-col justify-center pl-4 space-y-4 z-10">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold">ESG Performance</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">70%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold">Carbon Footprint</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">13.50M</span>
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
