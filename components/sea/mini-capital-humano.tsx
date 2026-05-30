'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal, Activity } from 'lucide-react'

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
    return Math.round(31 + (pressaoMetas - 5) * 3.4)
  }, [pressaoMetas])

  const turnoverAnual = useMemo(() => {
    return Number((38 + (pressaoMetas - 5) * 1.8).toFixed(1))
  }, [pressaoMetas])

  const estresseIAE = useMemo(() => {
    return Number((9.3 + (pressaoMetas - 5) * 1.2).toFixed(1))
  }, [pressaoMetas])

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
      const y = 52 - (val / 100) * 40
      return `${x},${y}`
    }).join(' ')
  }, [sparklineData])

  const areaPoints = useMemo(() => {
    if (sparklineData.length === 0) return ''
    const xPositions = [32, 44, 56, 68, 80, 92, 104]
    const points = sparklineData.map((val, idx) => {
      const x = xPositions[idx]
      const y = 52 - (val / 100) * 40
      return `${x},${y}`
    })
    return `32,52 ${points.join(' ')} 104,52`
  }, [sparklineData])

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
        }
      `}} />

      {/* Header Bicolor Premium com 3 Pontos */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#d2af5a] font-bold">Pilar 1:</span> Cap. Humano & Liderança
        </span>
        <MoreHorizontal className="h-3.5 w-3.5 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      {/* Body: 2 Colunas */}
      <div className="flex-1 flex items-center gap-2 py-1">
        {/* Lado Esquerdo: Sparkline Neon e Eixos Reais */}
        <div className="w-[52%] h-[155px] flex flex-col justify-between border-r border-white/5 pr-2">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[7px] font-normal text-white/45 tracking-wide">Live SVG humor pulse sparkline</span>
            <div className="flex items-center gap-0.5">
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
              <Activity className="h-2.5 w-2.5 text-white/40" />
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 115 65">
              <defs>
                <linearGradient id="humorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d2af5a" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#d2af5a" stopOpacity="0.01" />
                </linearGradient>
                <filter id="neonGlowLine" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              <line x1="32" y1="52" x2="108" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="32" y1="8" x2="32" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              
              <line x1="32" y1="30" x2="108" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="32" y1="14" x2="108" y2="14" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />

              <polygon points={areaPoints} fill="url(#humorGrad)" />
              <polyline fill="none" stroke="#d2af5a" strokeWidth="1.5" points={polylinePoints} filter="url(#neonGlowLine)" />
              
              {sparklineData.length > 0 && (
                <circle
                  cx={104}
                  cy={52 - (sparklineData[sparklineData.length - 1] / 100) * 40}
                  r="1.8"
                  fill="#fff"
                  stroke="#d2af5a"
                  strokeWidth="0.8"
                />
              )}

              {['100', '50', '0', '-5', '-10'].map((lbl, idx) => {
                const y = 8 + idx * 11
                return (
                  <text key={idx} x="27" y={y + 2} fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">{lbl}</text>
                )
              })}

              <text x="34" y="61" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="start" fontFamily="sans-serif" fontWeight="300">18:00</text>
              <text x="106" y="61" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">19:00</text>
            </svg>
          </div>
        </div>

        {/* Lado Direito: Cápsulas Empilhadas tridimensionais (Split Capsules) */}
        <div className="flex-1 flex flex-col justify-between h-[135px] pl-1.5 space-y-1">
          {/* Burnout */}
          <div className="flex flex-col w-full">
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              Burnout EEB
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[11px] font-bold font-mono rounded-b-lg leading-tight">
              {burnoutEEB}%
            </div>
          </div>

          {/* Turnover */}
          <div className="flex flex-col w-full">
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              Turnover
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[11px] font-bold font-mono rounded-b-lg leading-tight">
              {turnoverAnual}%
            </div>
          </div>

          {/* Estresse */}
          <div className="flex flex-col w-full">
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              Estresse IAE
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[11px] font-bold font-mono rounded-b-lg leading-tight">
              {estresseIAE}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
