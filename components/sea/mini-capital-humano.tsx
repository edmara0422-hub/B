'use client'

import { useEffect, useState, useMemo } from 'react'
import { Users, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

export function MiniCapitalHumano() {
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [climaFrequencia, setClimaFrequencia] = useState(14)

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
        setClimaFrequencia(telemetry.climaFrequencia ?? 14)
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

  const climaIndex = useMemo(() => {
    return 100 - burnoutEEB
  }, [burnoutEEB])

  // Sparkline data representing Humor Pulse Surveys over 7 weeks
  const sparklineData = useMemo(() => {
    // Under high pressure, the trend drops significantly
    const basePoints = [85, 88, 82, 86, 75, 78, 82]
    const pressureDrop = pressaoMetas * 4.5
    return basePoints.map((val, idx) => {
      const drop = idx >= 4 ? pressureDrop : pressureDrop * (idx / 4)
      return Math.max(10, Math.min(100, val - drop))
    })
  }, [pressaoMetas])

  // Compute SVG polyline path for the sparkline
  const polylinePoints = useMemo(() => {
    return sparklineData.map((val, idx) => {
      const x = (idx / 6) * 160 // x-axis mapping
      const y = 50 - (val / 100) * 35 // y-axis mapping (inverted y in SVG)
      return `${x},${y}`
    }).join(' ')
  }, [sparklineData])

  // Compute SVG gradient area path
  const areaPoints = useMemo(() => {
    if (sparklineData.length === 0) return ''
    const points = sparklineData.map((val, idx) => {
      const x = (idx / 6) * 160
      const y = 50 - (val / 100) * 35
      return `${x},${y}`
    })
    return `0,50 ${points.join(' ')} 160,50`
  }, [sparklineData])

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      <div className="flex justify-between items-center w-full z-10">
        <div className="live-tag">
          <div className="dot" />
          <span>Pulse Surveys · Estresse · LIVE</span>
        </div>
        <div className="badge text-[8px] bg-[#d4b87a]/15 text-[#d4b87a] px-1.5 py-0.5 rounded font-mono uppercase font-bold">
          EEB {burnoutEEB}%
        </div>
      </div>

      {/* Sparkline of Humor Pulse Trend (Real Analytical Widget) */}
      <div className="relative w-full h-[60px] flex flex-col justify-end mt-2 mb-1 border-b border-white/5 pb-1">
        <div className="absolute top-0 left-0 text-[7px] text-white/30 uppercase tracking-widest font-mono font-bold">
          Humor Pulse Trend (7w)
        </div>
        <div className="absolute top-0 right-0 text-[8.5px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5">
          {climaIndex}% {climaIndex > 65 ? <TrendingUp className="h-3 w-3 text-emerald-400" /> : <TrendingDown className="h-3 w-3 text-amber-500" />}
        </div>
        <svg className="w-full h-[40px] overflow-visible" viewBox="0 0 160 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="humorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#d4b87a" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          {/* Shaded Area */}
          <polygon points={areaPoints} fill="url(#humorGrad)" />
          {/* Trend Line */}
          <polyline
            fill="none"
            stroke="#d4b87a"
            strokeWidth="1.8"
            points={polylinePoints}
          />
          {/* Indicator Dot on the last point */}
          {sparklineData.length > 0 && (
            <circle
              cx="160"
              cy={50 - (sparklineData[sparklineData.length - 1] / 100) * 35}
              r="2.5"
              fill="#fff"
              stroke="#d4b87a"
              strokeWidth="1.2"
            />
          )}
        </svg>
      </div>

      {/* Vitals Grid with Gauge Reading */}
      <div className="grid grid-cols-3 gap-2 mt-1 relative z-10 text-left">
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">Burnout EEB</span>
          <b className={`text-[12.5px] font-mono mt-0.5 block leading-none ${burnoutEEB > 35 ? 'text-amber-500' : 'text-[#d4b87a]'}`}>
            {burnoutEEB}%
          </b>
        </div>
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">Turnover</span>
          <b className="text-[12.5px] text-[#d4b87a] font-mono mt-0.5 block leading-none">
            {turnoverAnual}%
          </b>
        </div>
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">Clima Index</span>
          <b className="text-[12.5px] text-[#d4b87a] font-mono mt-0.5 block leading-none">
            {climaIndex}/100
          </b>
        </div>
      </div>
      
      <div className="title-area relative z-10 mt-1 select-none flex justify-between items-end">
        <div>
          <span className="text-[8px] uppercase text-white/40 block leading-none font-bold">Pessoas & Liderança</span>
          <h2 className="text-white text-xs font-bold mt-0.5 tracking-wider uppercase leading-none flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm bg-[#d4b87a]" /> Cap. Humano
          </h2>
        </div>
        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none font-semibold">Pulse surveys</span>
      </div>
    </div>
  )
}
