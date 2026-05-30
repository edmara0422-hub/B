'use client'

import { useEffect, useState, useMemo } from 'react'

export function MiniEstrategia() {
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setCenario(telemetry.cenario ?? 'normal')
      }
    }

    handleTelemetry()

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  const selic = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39
  const jurosReais = useMemo(() => {
    return Number(((1 + selic / 100) / (1 + ipca / 100) - 1) * 100).toFixed(2)
  }, [selic, ipca])

  // Google Trends Search Volume over 8 months for "Inteligência de Negócios"
  const trendsData = useMemo(() => {
    const base = [35, 42, 50, 48, 62, 58, 70, 75]
    const multiplier = cenario === 'ia_boom' ? 1.35 : cenario === 'juros_altos' ? 0.85 : 1.0
    return base.map(v => Math.min(100, Math.round(v * multiplier)))
  }, [cenario])

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      {/* Header */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[10px] font-black text-white tracking-widest uppercase">2) ESTRATÉGIA & ECONOMIA</span>
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest font-bold">Macro & SWOT</span>
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-3 py-2">
        {/* Left Side: SVG Bar Chart */}
        <div className="w-[50%] h-[75px] flex flex-col justify-between border-r border-white/5 pr-3">
          <div className="flex justify-between items-center">
            <span className="text-[7px] uppercase tracking-wider text-white/30 font-bold">Google Trends (BI)</span>
            <span className="text-[8.5px] font-mono font-bold text-[#d4b87a]">
              {cenario === 'ia_boom' ? 'IA Disrupção' : 'Estável'}
            </span>
          </div>
          <div className="flex-1 flex items-end">
            <svg className="w-full h-[50px] overflow-visible" viewBox="0 0 110 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#d4b87a" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {trendsData.map((val, idx) => {
                const barWidth = 9
                const barGap = 4
                const x = idx * (barWidth + barGap) + 2
                const barHeight = (val / 100) * 45
                const y = 60 - barHeight
                return (
                  <rect
                    key={idx}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="1"
                    fill="url(#barGrad)"
                    className="transition-all duration-300"
                  />
                )
              })}
            </svg>
          </div>
        </div>

        {/* Right Side: Metrics */}
        <div className="flex-1 flex flex-col justify-center space-y-1.5 pl-1.5">
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">Juro Real</span>
            <span className="text-sm font-bold text-[#d4b87a] font-mono leading-none mt-1">{jurosReais}%</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">P/E Ratio</span>
            <span className="text-sm font-bold text-[#d4b87a] font-mono leading-none mt-1">8.2x</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">SELIC (Bacen)</span>
            <span className="text-sm font-bold text-[#d4b87a] font-mono leading-none mt-1">{Number(selic).toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* Footer Vitals */}
      <div className="flex justify-between items-center text-[7.5px] text-white/20 border-t border-white/5 pt-1">
        <span>SGS Bacen · IPCA 4.39%</span>
        <span className="font-bold text-[#d4b87a]/60 font-mono">LIVE FEED</span>
      </div>
    </div>
  )
}
