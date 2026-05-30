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

  const jurosReais = useMemo(() => {
    if (cenario === 'normal') return '10.01'
    return cenario === 'juros_altos' ? '12.44' : '8.12'
  }, [cenario])

  const peRatio = '8.2x'

  const trendsData = useMemo(() => {
    const base = [30, 42, 50, 58, 68, 78, 55, 65]
    const multiplier = cenario === 'ia_boom' ? 1.25 : cenario === 'juros_altos' ? 0.85 : 1.0
    return base.map(v => Math.min(100, Math.round(v * multiplier)))
  }, [cenario])

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .gold-metallic-gradient {
          background: linear-gradient(90deg, #c9943a 0%, #e0b85e 50%, #c9943a 100%);
          color: #0c0a07;
        }
        .dark-glass-value {
          background: rgba(10, 10, 12, 0.45);
          border: 1px solid rgba(197, 151, 64, 0.25);
        }
      `}} />

      {/* Header Bicolor com 3 Pontos */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#c9943a] font-bold">Pilar 3:</span> Economia & Mercado
        </span>
        <MoreHorizontal className="h-3.5 w-3.5 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      <div className="flex-1 flex items-center gap-2 py-1">
        {/* Barras 3D Cilíndricas do Google Trends */}
        <div className="w-[52%] h-[120px] flex flex-col justify-between border-r border-white/5 pr-2">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-[7px] font-normal text-white/45 tracking-wide">Google Trends style</span>
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="flex-1 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 115 60">
              <defs>
                {/* O Gradiente que gera o efeito cilíndrico metálico 3D real */}
                <linearGradient id="cylinderGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9c732c" />
                  <stop offset="35%" stopColor="#e0b85e" />
                  <stop offset="65%" stopColor="#ecd399" />
                  <stop offset="100%" stopColor="#835f1e" />
                </linearGradient>
              </defs>
              
              <line x1="32" y1="48" x2="108" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="32" y1="8" x2="32" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              
              <line x1="32" y1="28" x2="108" y2="28" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="32" y1="18" x2="108" y2="18" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="32" y1="38" x2="108" y2="38" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />

              {trendsData.map((val, idx) => {
                const barWidth = 5
                const barGap = 3.2
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
                    rx="0.8"
                    fill="url(#cylinderGold)"
                  />
                )
              })}

              {['100', '75', '50', '25', '0'].map((lbl, idx) => {
                const y = 8 + idx * 10
                return (
                  <text key={idx} x="27" y={y + 2} fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">{lbl}</text>
                )
              })}

              <text x="36" y="56" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2019</text>
              <text x="66" y="56" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2020</text>
              <text x="102" y="56" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2024</text>
            </svg>
          </div>
        </div>

        {/* Lado Direito: Cápsulas de Categoria Split */}
        <div className="flex-1 flex flex-col justify-center h-[105px] pl-1.5 space-y-2">
          {/* Juro Real */}
          <div className="flex flex-col w-full">
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              Juro Real
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[11px] font-bold font-mono rounded-b-lg leading-tight">
              {jurosReais}%
            </div>
          </div>

          {/* P/E Ratio */}
          <div className="flex flex-col w-full">
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              P/E Ratio
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[11px] font-bold font-mono rounded-b-lg leading-tight">
              {peRatio}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
