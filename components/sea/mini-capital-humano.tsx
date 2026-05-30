'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal } from 'lucide-react'

export function MiniCapitalHumano() {
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

  // Mathematical alignment to return mockup baselines exactly at pressaoMetas = 5
  const burnoutEEB = useMemo(() => {
    return Math.round(31 + (pressaoMetas - 5) * 3.4)
  }, [pressaoMetas])

  const turnoverAnual = useMemo(() => {
    return Number((38 + (pressaoMetas - 5) * 1.8).toFixed(1))
  }, [pressaoMetas])

  const estresseIAE = useMemo(() => {
    return Number((9.3 + (pressaoMetas - 5) * 1.2).toFixed(1))
  }, [pressaoMetas])

  // Sparkline data representing Humor Pulse Surveys over 7 weeks
  const sparklineData = useMemo(() => {
    const basePoints = [85, 88, 82, 86, 75, 78, 82]
    const pressureDrop = pressaoMetas * 4.5
    return basePoints.map((val, idx) => {
      const drop = idx >= 4 ? pressureDrop : pressureDrop * (idx / 4)
      return Math.max(10, Math.min(100, val - drop))
    })
  }, [pressaoMetas])

  const polylinePoints = useMemo(() => {
    const xPositions = [32, 44, 56, 68, 80, 92, 104]
    return sparklineData.map((val, idx) => {
      const x = xPositions[idx]
      const y = 48 - (val / 100) * 36
      return `${x},${y}`
    }).join(' ')
  }, [sparklineData])

  const areaPoints = useMemo(() => {
    if (sparklineData.length === 0) return ''
    const xPositions = [32, 44, 56, 68, 80, 92, 104]
    const points = sparklineData.map((val, idx) => {
      const x = xPositions[idx]
      const y = 48 - (val / 100) * 36
      return `${x},${y}`
    })
    return `32,48 ${points.join(' ')} 104,48`
  }, [sparklineData])

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      {/* Header Premium (Poppins Fina) */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-xs font-normal text-white/95 tracking-wide">Pilar 1: Cap. Humano & Liderança</span>
        <MoreHorizontal className="h-4 w-4 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-2 py-2">
        
        {/* Left Side: SVG Sparkline with X/Y axes and coordinate labels */}
        <div className="w-[52%] h-[120px] flex flex-col justify-between border-r border-white/5 pr-2">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-[7.5px] font-normal text-white/45 tracking-wide">Live SVG humor pulse sparkline</span>
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          
          <div className="flex-1 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 115 60">
              <defs>
                <linearGradient id="humorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9943a" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#c9943a" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              
              {/* Axes lines */}
              <line x1="32" y1="48" x2="108" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="32" y1="8" x2="32" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              
              {/* Y Axis Grid lines */}
              <line x1="32" y1="28" x2="108" y2="28" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="32" y1="12" x2="108" y2="12" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* Shaded Area & Line */}
              <polygon points={areaPoints} fill="url(#humorGrad)" />
              <polyline fill="none" stroke="#c9943a" strokeWidth="1.5" points={polylinePoints} />
              
              {sparklineData.length > 0 && (
                <circle
                  cx={104}
                  cy={48 - (sparklineData[sparklineData.length - 1] / 100) * 36}
                  r="1.8"
                  fill="#fff"
                  stroke="#c9943a"
                  strokeWidth="0.8"
                />
              )}

              {/* Y Axis labels exactly as mockup in clean sans-serif */}
              {['100', '50', '0', '-5', '-10'].map((lbl, idx) => {
                const y = 8 + idx * 10
                return (
                  <text key={idx} x="27" y={y + 2} fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">{lbl}</text>
                )
              })}

              {/* X Axis labels exactly as mockup in clean sans-serif */}
              <text x="34" y="56" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="start" fontFamily="sans-serif" fontWeight="300">18:00</text>
              <text x="106" y="56" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">19:00</text>
            </svg>
          </div>
        </div>

        {/* Right Side: Metrics as Beautiful Gold-Bordered Capsules (Mockup Style with exact values) */}
        <div className="flex-1 flex flex-col justify-center space-y-2 pl-1.5">
          {/* Burnout Capsule */}
          <div className="border border-[#c9943a]/15 bg-[#0e0d0a]/40 px-2.5 py-1 rounded-xl flex justify-between items-center text-[9px] hover:border-[#c9943a]/35 transition-colors">
            <span className="font-light text-white/55">Burnout EEB</span>
            <span className="font-normal text-[#c9943a] text-[9.5px]">({burnoutEEB}%)</span>
          </div>

          {/* Turnover Capsule */}
          <div className="border border-[#c9943a]/15 bg-[#0e0d0a]/40 px-2.5 py-1 rounded-xl flex justify-between items-center text-[9px] hover:border-[#c9943a]/35 transition-colors">
            <span className="font-light text-white/55">Turnover</span>
            <span className="font-normal text-[#c9943a] text-[9.5px]">({turnoverAnual}%)</span>
          </div>

          {/* Estresse Capsule */}
          <div className="border border-[#c9943a]/15 bg-[#0e0d0a]/40 px-2.5 py-1 rounded-xl flex justify-between items-center text-[9px] hover:border-[#c9943a]/35 transition-colors">
            <span className="font-light text-white/55">Estresse IAE</span>
            <span className="font-normal text-[#c9943a] text-[9.5px]">{estresseIAE}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
