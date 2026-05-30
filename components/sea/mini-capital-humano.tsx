'use client'

import { useEffect, useState, useMemo } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

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

  const burnoutEEB = useMemo(() => {
    return Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  }, [pressaoMetas])

  const turnoverAnual = useMemo(() => {
    return Number((38 + Math.pow(pressaoMetas, 1.4) * 2.5).toFixed(1))
  }, [pressaoMetas])

  const estresseIAE = useMemo(() => {
    return Number((9.3 + pressaoMetas * 7.5).toFixed(1))
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
    return sparklineData.map((val, idx) => {
      const x = (idx / 6) * 110 // adapted width
      const y = 60 - (val / 100) * 45 // adapted height
      return `${x},${y}`
    }).join(' ')
  }, [sparklineData])

  const areaPoints = useMemo(() => {
    if (sparklineData.length === 0) return ''
    const points = sparklineData.map((val, idx) => {
      const x = (idx / 6) * 110
      const y = 60 - (val / 100) * 45
      return `${x},${y}`
    })
    return `0,60 ${points.join(' ')} 110,60`
  }, [sparklineData])

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      {/* Header */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[10px] font-black text-white tracking-widest uppercase">1) CAP. HUMANO & LIDERANÇA</span>
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest font-bold">Pessoas & Saúde</span>
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-3 py-2">
        {/* Left Side: SVG Sparkline */}
        <div className="w-[50%] h-[75px] flex flex-col justify-between border-r border-white/5 pr-3">
          <div className="flex justify-between items-center">
            <span className="text-[7px] uppercase tracking-wider text-white/30 font-bold">Humor Pulse (7w)</span>
            <span className="text-[9px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5">
              {100 - burnoutEEB}% {burnoutEEB < 35 ? <TrendingUp className="h-2.5 w-2.5 text-emerald-400" /> : <TrendingDown className="h-2.5 w-2.5 text-amber-500" />}
            </span>
          </div>
          <div className="flex-1 flex items-end">
            <svg className="w-full h-[50px] overflow-visible" viewBox="0 0 110 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="humorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#d4b87a" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              <polygon points={areaPoints} fill="url(#humorGrad)" />
              <polyline fill="none" stroke="#d4b87a" strokeWidth="1.8" points={polylinePoints} />
              {sparklineData.length > 0 && (
                <circle
                  cx="110"
                  cy={60 - (sparklineData[sparklineData.length - 1] / 100) * 45}
                  r="2.5"
                  fill="#fff"
                  stroke="#d4b87a"
                  strokeWidth="1.2"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Right Side: Metrics */}
        <div className="flex-1 flex flex-col justify-center space-y-1.5 pl-1.5">
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">Burnout EEB</span>
            <span className="text-sm font-bold text-[#d4b87a] font-mono leading-none mt-1">{burnoutEEB}%</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">Turnover</span>
            <span className="text-sm font-bold text-[#d4b87a] font-mono leading-none mt-1">{turnoverAnual}%</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">Estresse IAE</span>
            <span className="text-sm font-bold text-[#d4b87a] font-mono leading-none mt-1">{estresseIAE}%</span>
          </div>
        </div>
      </div>

      {/* Footer Vitals */}
      <div className="flex justify-between items-center text-[7.5px] text-white/20 border-t border-white/5 pt-1">
        <span>Pulse Surveys · Estresse</span>
        <span className="font-bold text-[#d4b87a]/60 font-mono">LIVE FEED</span>
      </div>
    </div>
  )
}
