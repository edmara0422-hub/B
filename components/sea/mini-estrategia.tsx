'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal } from 'lucide-react'

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

  // Exact mockup baselines
  const jurosReais = useMemo(() => {
    if (cenario === 'normal') return '10.01'
    return cenario === 'juros_altos' ? '12.44' : '8.12'
  }, [cenario])

  const peRatio = '8.2x'

  // Google Trends Search Volume over 7 months for "Inteligência de Negócios"
  const trendsData = useMemo(() => {
    const base = [30, 42, 50, 58, 68, 78, 55] // 7 bars to fit perfectly inside the axes margins
    const multiplier = cenario === 'ia_boom' ? 1.25 : cenario === 'juros_altos' ? 0.85 : 1.0
    return base.map(v => Math.min(100, Math.round(v * multiplier)))
  }, [cenario])

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      {/* Header Premium (Poppins Fina) */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-xs font-normal text-white/95 tracking-wide">Pilar 3: Economia & Mercado</span>
        <MoreHorizontal className="h-4 w-4 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-2 py-2">
        
        {/* Left Side: SVG Bar Chart with Y/X axes and coordinates */}
        <div className="w-[52%] h-[120px] flex flex-col justify-between border-r border-white/5 pr-2">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-[7.5px] font-normal text-white/45 tracking-wide">Google Trends style</span>
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          
          <div className="flex-1 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 115 60">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#d4b87a" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              
              {/* Axes lines */}
              <line x1="32" y1="48" x2="108" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="32" y1="8" x2="32" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              
              {/* Y Axis Grid lines */}
              <line x1="32" y1="28" x2="108" y2="28" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="32" y1="18" x2="108" y2="18" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="32" y1="38" x2="108" y2="38" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* Bars */}
              {trendsData.map((val, idx) => {
                const barWidth = 6
                const barGap = 4
                const x = 36 + idx * (barWidth + barGap)
                const barHeight = (val / 100) * 36
                const y = 48 - barHeight
                return (
                  <rect
                    key={idx}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="0.5"
                    fill="url(#barGrad)"
                    className="transition-all duration-300"
                  />
                )
              })}

              {/* Y Axis labels exactly as mockup inside clean sans-serif */}
              {['100', '75', '50', '25', '0'].map((lbl, idx) => {
                const y = 8 + idx * 10
                return (
                  <text key={idx} x="27" y={y + 2} fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">{lbl}</text>
                )
              })}

              {/* X Axis labels exactly as mockup inside clean sans-serif */}
              <text x="36" y="56" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2019</text>
              <text x="66" y="56" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2020</text>
              <text x="102" y="56" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2024</text>
            </svg>
          </div>
        </div>

        {/* Right Side: Metrics as Beautiful Gold-Bordered Capsules (Mockup Style) */}
        <div className="flex-1 flex flex-col justify-center space-y-2 pl-1 font-sans">
          {/* Juro Real Capsule */}
          <div className="border border-[#d4b87a]/15 bg-[#0e0d0a]/40 px-2.5 py-1 rounded-xl flex justify-between items-center text-[9px] hover:border-[#d4b87a]/35 transition-colors">
            <span className="font-light text-white/55">Juro Real</span>
            <span className="font-normal text-[#d4b87a] text-[9.5px]">{jurosReais}%</span>
          </div>

          {/* P/E Ratio Capsule */}
          <div className="border border-[#d4b87a]/15 bg-[#0e0d0a]/40 px-2.5 py-1 rounded-xl flex justify-between items-center text-[9px] hover:border-[#d4b87a]/35 transition-colors">
            <span className="font-light text-white/55">P/E Ratio</span>
            <span className="font-normal text-[#d4b87a] text-[9.5px]">{peRatio}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
