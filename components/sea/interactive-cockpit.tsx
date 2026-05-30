'use client'

import { useState, useEffect, useMemo } from 'react'
import { Sparkles, TrendingUp, Globe, Users, Leaf, ShieldAlert, AlertTriangle, Settings, Database, Activity } from 'lucide-react'

import { MiniEstrategia } from './mini-estrategia'
import { MiniCapitalHumano } from './mini-capital-humano'
import { MiniEsg } from './mini-esg'
import { MiniAi } from './mini-ai'
import { HudFinancas } from './hud-financas'

export function InteractiveCockpit() {
  const [pressaoMetas, setPressaoMetas] = useState(5)

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
      }
    }
    handleTelemetry()
    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  // As 5 cascatas reais da Matriz correspondendo aos ícones do seu mockup
  const matrizRules = useMemo(() => {
    return [
      {
        icon: AlertTriangle,
        title: 'AI decisión alert cascade',
        desc: 'Aiontis de decisións reportams a mobilidades de economi...'
      },
      {
        icon: Settings,
        title: 'AI decisión alert cascade',
        desc: 'Alerriz de decisão para movidanes em othheridarie desnic...'
      },
      {
        icon: Database,
        title: 'AI decisión alert cascade',
        desc: 'Cada do csculento para vido rlesoort a areas de decisións...'
      },
      {
        icon: ShieldAlert,
        title: 'AI decisión alert cascade',
        desc: 'Suana invsamento e contempo de realiividades decisións...'
      },
      {
        icon: Activity,
        title: 'AI decisión alert cascade',
        desc: 'Alertiz iaimento de contagios: concrata dex-ræksão, fiolout...'
      }
    ]
  }, [])

  return (
    <div className="w-full flex flex-col gap-6" style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}>
      
      {/* Cabeçalho Executivo do Cockpit */}
      <div className="w-full flex justify-between items-center bg-black/45 border border-white/5 p-4 rounded-2xl backdrop-blur-md select-none">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#d2af5a] animate-pulse" />
          <h1 className="text-white text-xs font-light tracking-[0.15em] uppercase">
            BUSINESS INTELLIGENCE <span className="text-[#d2af5a] font-normal">COCKPIT 6D</span>
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 border border-white/5 rounded-xl text-[9px] text-white/50 tracking-wider font-mono">
          <span>(D) MAIO 2026 · LIVE</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cockpit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 1024px) {
          .cockpit-grid {
            grid-template-columns: 38% 62% !important;
          }
        }
      `}} />

      {/* Grade Principal */}
      <div className="w-full cockpit-grid items-stretch min-h-[750px]">
        
        {/* COLUNA ESQUERDA: Os 4 Mini-Cards em vidro e dourado (Aumento para h-[210px] para acomodar elementos GIGANTES) */}
        <div className="flex flex-col gap-5 justify-between">
          {/* Card 1: Pessoas */}
          <div className="group relative overflow-hidden flex flex-col justify-between p-0.5 bg-[#0a0a0c]/85 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-xl transition-all duration-300 h-[210px]">
            <MiniCapitalHumano />
          </div>

          {/* Card 2: Estratégia */}
          <div className="group relative overflow-hidden flex flex-col justify-between p-0.5 bg-[#0a0a0c]/85 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-xl transition-all duration-300 h-[210px]">
            <MiniEstrategia />
          </div>

          {/* Card 3: ESG */}
          <div className="group relative overflow-hidden flex flex-col justify-between p-0.5 bg-[#0a0a0c]/85 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-xl transition-all duration-300 h-[210px]">
            <MiniEsg />
          </div>

          {/* Card 4: AI Assistant */}
          <div className="group relative overflow-hidden flex flex-col justify-between p-0.5 bg-[#0a0a0c]/85 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-xl transition-all duration-300 h-[210px]">
            <MiniAi />
          </div>
        </div>

        {/* COLUNA DIREITA: Finanças & Controladoria (HUD) + Matriz 6D no Rodapé */}
        <div className="flex-1 flex flex-col gap-5 justify-start">
          {/* HUD de Finanças */}
          <div className="w-full">
            <HudFinancas />
          </div>

          {/* MATRIZ DE INTERDEPENDÊNCIA 6D (Lista Vertical idêntica ao Mockup) */}
          <div className="p-5 rounded-3xl backdrop-blur-xl border" style={{ background: 'rgba(8, 8, 10, 0.85)', borderColor: 'rgba(210, 175, 90, 0.25)' }}>
            <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(210, 175, 90, 0.15)' }}>
              <ShieldAlert className="h-4 w-4 text-[#d2af5a]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#d2af5a]">
                MATRIZ DE INTERDEPENDÊNCIA 6D
              </span>
            </div>
            
            {/* Lista Vertical de Alertas */}
            <div className="flex flex-col gap-2.5">
              {matrizRules.map((rule, idx) => {
                const IconComp = rule.icon
                return (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200"
                    style={{
                      borderColor: 'rgba(210, 175, 90, 0.12)',
                      background: 'rgba(255, 255, 255, 0.01)',
                    }}
                  >
                    {/* Círculo do Ícone */}
                    <div className="h-7 w-7 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: 'rgba(210, 175, 90, 0.35)', background: 'rgba(210, 175, 90, 0.05)' }}>
                      <IconComp className="h-3.5 w-3.5 text-[#d2af5a]" />
                    </div>
                    {/* Textos */}
                    <div className="flex flex-col leading-tight">
                      <span className="text-[#d2af5a] text-[9.5px] font-bold tracking-wider font-mono uppercase">
                        {rule.title}
                      </span>
                      <span className="text-white/45 text-[8.5px] font-medium font-mono mt-0.5">
                        {rule.desc}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
