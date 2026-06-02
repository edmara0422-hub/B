'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal } from 'lucide-react'

export function MiniEstrategia() {
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).BSTelemetry
      if (telemetry) {
        setCenario(telemetry.cenario ?? 'normal')
      }
    }
    handleTelemetry()
    window.addEventListener('bs-telemetry', handleTelemetry)
    return () => window.removeEventListener('bs-telemetry', handleTelemetry)
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

  const triggerMetricClick = (metricId: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bs-metric-click', { detail: { metricId } }))
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
        @keyframes floatBar {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.15);
          }
        }
        .animate-bar {
          animation: floatBar 4s ease-in-out infinite;
        }
      `}} />

      {/* Header Bicolor com 3 Pontos */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#d2af5a] font-bold">Pilar 3:</span> Economia & Mercado
        </span>
        <MoreHorizontal className="h-3.5 w-3.5 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      <div className="flex-1 flex items-center gap-2 py-1">
        {/* Barras 3D Cilíndricas do Google Trends com animação staggered e reflexo */}
        <div className="w-[52%] h-[155px] flex flex-col justify-between border-r border-white/5 pr-2">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-[7px] font-normal text-white/45 tracking-wide">Google Trends style</span>
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          
          <div className="flex-1 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 115 65">
              <defs>
                {/* Gradiente que gera o efeito cilíndrico metálico 3D real com o dourado real */}
                <linearGradient id="cylinderGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#967735" />
                  <stop offset="30%" stopColor="#d2af5a" />
                  <stop offset="50%" stopColor="#f7e6c4" />
                  <stop offset="70%" stopColor="#d2af5a" />
                  <stop offset="100%" stopColor="#6b5220" />
                </linearGradient>
              </defs>
              
              <line x1="32" y1="52" x2="108" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="32" y1="8" x2="32" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              
              <line x1="32" y1="30" x2="108" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="32" y1="19" x2="108" y2="19" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="32" y1="41" x2="108" y2="41" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,2" />

              {trendsData.map((val, idx) => {
                const barWidth = 5
                const barGap = 3.2
                const x = 36 + idx * (barWidth + barGap)
                const barHeight = (val / 100) * 42
                const y = 52 - barHeight
                const originX = x + barWidth / 2
                const originY = 52
                return (
                  <rect
                    key={idx}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="0.8"
                    fill="url(#cylinderGold)"
                    style={{
                      transformOrigin: `${originX}px ${originY}px`,
                      animationDelay: `${idx * 0.2}s`
                    }}
                    className="animate-bar"
                  />
                )
              })}

              {['100', '75', '50', '25', '0'].map((lbl, idx) => {
                const y = 8 + idx * 11
                return (
                  <text key={idx} x="27" y={y + 2} fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="end" fontFamily="sans-serif" fontWeight="300">{lbl}</text>
                )
              })}

              <text x="36" y="61" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2019</text>
              <text x="66" y="61" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2020</text>
              <text x="102" y="61" fill="rgba(255,255,255,0.35)" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="300">2024</text>
            </svg>
          </div>
        </div>

        {/* Lado Direito: Cápsulas de Categoria Split */}
        <div className="flex-1 flex flex-col justify-center h-[135px] pl-1.5 space-y-2.5">
          {/* Juro Real */}
          <div 
            onClick={() => triggerMetricClick('juros_real')}
            className="interactive-capsule flex flex-col w-full cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <div className="gold-metallic-gradient text-[7.5px] font-bold uppercase tracking-wider py-0.5 rounded-t-lg text-center font-mono leading-none">
              Juro Real
            </div>
            <div className="dark-glass-value text-white text-center py-1 text-[11px] font-bold font-mono rounded-b-lg leading-tight">
              {jurosReais}%
            </div>
          </div>

          {/* P/E Ratio */}
          <div 
            onClick={() => triggerMetricClick('pe_ratio')}
            className="interactive-capsule flex flex-col w-full cursor-pointer transition-transform duration-200 active:scale-95"
          >
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