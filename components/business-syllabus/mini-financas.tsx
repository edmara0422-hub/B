'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal, TrendingUp } from 'lucide-react'

export function MiniFinancas() {
  const [faturamento, setFaturamento] = useState(150)
  const [cac, setCac] = useState(350)
  const [opex, setOpex] = useState(60)
  const [clientes, setClientes] = useState(1200)
  const [pressaoMetas, setPressaoMetas] = useState(5)

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setFaturamento(telemetry.faturamento ?? 150)
        setCac(telemetry.cac ?? 350)
        setOpex(telemetry.opex ?? 60)
        setClientes(telemetry.clientes ?? 1200)
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
      }
    }
    handleTelemetry()
    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  // Central equations synced with HUD
  const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const demissoesMes = Math.round((120 * (turnoverAnual / 100)) / 12)
  const ebitda = faturamento - opex - ((clientes * 0.025 * cac) / 1000) - (demissoesMes * 30)
  const margemEbitda = faturamento > 0 ? (ebitda / faturamento) * 100 : 0
  const ltvCac = cac > 0 ? (((faturamento * 1000) / (clientes || 1)) / 0.025) / cac : 0
  const runway = ebitda < 0 ? 850 / Math.abs(ebitda) : 99

  const triggerMetricClick = (metricId: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ipb-metric-click', { detail: { metricId } }))
    }
  }

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .gold-metallic-gradient {
          background: linear-gradient(90deg, #d2af5a 0%, #f3ddaa 50%, #d2af5a 100%);
          color: #0c0a07;
        }
        .dark-glass-value {
          background: rgba(10, 10, 12, 0.45);
          border: 1px solid rgba(210, 175, 90, 0.25);
          transition: all 0.2s ease;
        }
        .interactive-capsule:hover .dark-glass-value {
          border-color: rgba(210, 175, 90, 0.7) !important;
          background: rgba(210, 175, 90, 0.1) !important;
        }
        .interactive-capsule:hover .gold-metallic-gradient {
          filter: brightness(1.1);
        }
      `}} />

      {/* Header Bicolor com 3 Pontos */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#d2af5a] font-bold">Pilar 2:</span> Finanças & Controladoria
        </span>
        <MoreHorizontal className="h-3.5 w-3.5 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      <div className="flex-1 flex items-center gap-2 py-1">
        {/* Lado Esquerdo: Mini Gráfico de Fluxo de Caixa */}
        <div className="w-[52%] h-[155px] flex flex-col justify-between border-r border-white/5 pr-2">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[7px] font-normal text-white/45 tracking-wide">Live cash flow telemetry</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="flex-1 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 115 65">
              <defs>
                <linearGradient id="financeMiniGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d2af5a" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#d2af5a" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              <line x1="32" y1="52" x2="108" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="32" y1="8" x2="32" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              
              {/* Curva de Fluxo de Caixa */}
              <path d="M 32,45 Q 52,18 72,32 T 108,12" fill="none" stroke="#d2af5a" strokeWidth="1.5" />
              <path d="M 32,45 Q 52,18 72,32 T 108,12 L 108,52 L 32,52 Z" fill="url(#financeMiniGrad)" />
              
              <circle cx="108" cy="12" r="1.8" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
              
              {['100', '50', '0'].map((lbl, idx) => {
                const y = 10 + idx * 21
                return (
                  <text key={idx} x="27" y={y + 2} fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">{lbl}</text>
                )
              })}
              <text x="34" y="61" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="start" fontFamily="sans-serif" fontWeight="300">DF</text>
              <text x="106" y="61" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">PF</text>
            </svg>
          </div>
        </div>

        {/* Lado Direito: Cápsulas Financeiras */}
        <div className="flex-1 flex flex-col justify-between h-[135px] pl-1.5 space-y-1">
          {/* EBITDA */}
          <div 
            onClick={() => triggerMetricClick('ebitda')}
            className="interactive-capsule flex flex-col w-full cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              EBITDA Margem
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[11px] font-bold font-mono rounded-b-lg leading-tight">
              {Number(margemEbitda).toFixed(1)}%
            </div>
          </div>

          {/* LTV / CAC */}
          <div 
            onClick={() => triggerMetricClick('ltv_cac')}
            className="interactive-capsule flex flex-col w-full cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              LTV / CAC
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[11px] font-bold font-mono rounded-b-lg leading-tight">
              {Number(ltvCac).toFixed(1)}x
            </div>
          </div>

          {/* Runway */}
          <div 
            onClick={() => triggerMetricClick('wacc')}
            className="interactive-capsule flex flex-col w-full cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              Runway
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[10px] font-bold font-mono rounded-b-lg leading-tight truncate">
              {runway === 99 ? 'Infinito' : `${Number(runway).toFixed(1)}m`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
