'use client'

import { useEffect, useState, useMemo } from 'react'
import { Globe, TrendingUp, Compass } from 'lucide-react'

export function MiniEstrategia() {
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')
  const [metaBudgetPercent, setMetaBudgetPercent] = useState(80)

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setCenario(telemetry.cenario ?? 'normal')
        setMetaBudgetPercent(telemetry.metaBudgetPercent ?? 80)
      }
    }

    handleTelemetry()

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  const selic = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39
  const politicoScore = cenario === 'juros_altos' ? 30 : 55
  const economicoScore = cenario === 'juros_altos' ? 20 : 45
  const socialScore = cenario === 'ia_boom' ? 88 : 65
  const tecnologicoScore = cenario === 'ia_boom' ? 98 : 80
  const ecol_legalScore = 75
  const averagePestel = Math.round((politicoScore + economicoScore + socialScore + tecnologicoScore + ecol_legalScore) / 5)

  // Google Trends Search Volume over 8 months for "Inteligência de Negócios"
  const trendsData = useMemo(() => {
    // In an IA boom, the technology search volume skyrockets!
    const base = [35, 42, 50, 48, 62, 58, 70, 75]
    const multiplier = cenario === 'ia_boom' ? 1.35 : cenario === 'juros_altos' ? 0.85 : 1.0
    return base.map(v => Math.min(100, Math.round(v * multiplier)))
  }, [cenario])

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      <div className="flex justify-between items-center w-full z-10">
        <div className="live-tag">
          <div className="dot" />
          <span>PESTEL Index · Real-Time · LIVE</span>
        </div>
        <div className="badge text-[8px] bg-[#d4b87a]/15 text-[#d4b87a] px-1.5 py-0.5 rounded font-mono uppercase font-bold">
          SELIC {Number(selic).toFixed(1)}%
        </div>
      </div>

      {/* Google Trends Search Volume Bar Chart (Real Analytical Widget) */}
      <div className="relative w-full h-[60px] flex flex-col justify-end mt-2 mb-1 border-b border-white/5 pb-1">
        <div className="absolute top-0 left-0 text-[7px] text-white/30 uppercase tracking-widest font-mono font-bold">
          Google Trends: Demand Index
        </div>
        <div className="absolute top-0 right-0 text-[8.5px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5">
          {cenario === 'ia_boom' ? 'IA Disrupção' : 'Estável'}
        </div>
        
        {/* SVG Bar Chart */}
        <svg className="w-full h-[40px] overflow-visible" viewBox="0 0 160 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4b87a" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {trendsData.map((val, idx) => {
            const barWidth = 14
            const barGap = 6
            const x = idx * (barWidth + barGap) + 4
            const barHeight = (val / 100) * 35
            const y = 50 - barHeight
            return (
              <rect
                key={idx}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="1.5"
                fill="url(#barGrad)"
                className="transition-all duration-300"
              />
            )
          })}
        </svg>
      </div>

      {/* PESTEL dynamic Vitals */}
      <div className="grid grid-cols-3 gap-2 mt-1 relative z-10 text-left">
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">SELIC</span>
          <b className="text-[12.5px] text-[#d4b87a] font-mono mt-0.5 block leading-none">
            {Number(selic).toFixed(2)}%
          </b>
        </div>
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">IPCA (12M)</span>
          <b className="text-[12.5px] text-[#d4b87a] font-mono mt-0.5 block leading-none">
            {Number(ipca).toFixed(2)}%
          </b>
        </div>
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">PESTEL</span>
          <b className="text-[12.5px] text-[#d4b87a] font-mono mt-0.5 block leading-none">
            {averagePestel}%
          </b>
        </div>
      </div>
      
      <div className="title-area relative z-10 mt-1 select-none flex justify-between items-end">
        <div>
          <span className="text-[8px] uppercase text-white/40 block leading-none font-bold">Ambiente & Tendências</span>
          <h2 className="text-white text-xs font-bold mt-0.5 tracking-wider uppercase leading-none flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm bg-[#d4b87a]" /> Estratégia
          </h2>
        </div>
        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none font-semibold">Macro & SWOT</span>
      </div>
    </div>
  )
}
