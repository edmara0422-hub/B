'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal, Shield, Flame, Activity } from 'lucide-react'

export function HudFinancas() {
  const [capVal, setCapVal] = useState(1000)
  const [finVal, setFinVal] = useState(1240)
  const [soldVal, setSoldVal] = useState(100)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) win.IPBTelemetry = {}
      win.IPBTelemetry.faturamento = Math.round(capVal / 5 + finVal / 10)
      win.IPBTelemetry.cac = Math.round(soldVal * 0.7)
      win.IPBTelemetry.opex = 60
      win.IPBTelemetry.clientes = Math.round(finVal * 1.2)
      win.IPBTelemetry.pressaoMetas = Math.round((capVal + finVal - 2240) / 100 + 5)
      window.dispatchEvent(new CustomEvent('ipb-telemetry'))
    }
  }, [capVal, finVal, soldVal])

  const bellPath = useMemo(() => {
    const points = []
    const mean = 135
    const stdDev = 36
    for (let x = 30; x <= 240; x += 2) {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))
      const y = 80 - (70 * Math.exp(exponent))
      points.push(`${x},${y}`)
    }
    return `M 30,80 L ${points.join(' ')} L 240,80 Z`
  }, [])

  const sigmoidPath = useMemo(() => {
    const points = []
    for (let x = 30; x <= 240; x += 2) {
      const t = (x - 135) / 28
      const y = 80 - (70 / (1 + Math.exp(-t)))
      points.push(`${x},${y}`)
    }
    return `M 30,80 L ${points.join(' ')} L 240,80 Z`
  }, [])

  const triggerMetricClick = (metricId: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ipb-metric-click', { detail: { metricId } }))
    }
  }

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-5 bg-[#08080a]/85 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-xl select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .gold-slider-premium {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(210, 175, 90, 0.15);
          border-radius: 4px;
          outline: none;
        }
        .gold-slider-premium::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #d2af5a;
          border: 1.5px solid #000;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(210, 175, 90, 0.85);
          transition: transform 0.1s ease;
        }
        .gold-slider-premium::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        .rotate-y-label {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          transform-origin: center;
        }
      `}} />

      {/* Header Bicolor com 3 Pontos */}
      <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#d2af5a] font-bold">Pilar 2:</span> Finanças & Controladoria
        </span>
        <MoreHorizontal className="h-4 w-4 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      {/* Marcadores de saúde financeira clicáveis e interativos (NASA-tech) */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div 
          onClick={() => triggerMetricClick('wacc')} 
          className="py-1 px-1.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-xl cursor-pointer text-center transition-all duration-200 active:scale-95"
        >
          <span className="text-[7.5px] text-white/45 uppercase block font-mono tracking-wider">WACC</span>
          <span className="text-[11px] font-bold text-[#d2af5a] font-mono">17.2%</span>
        </div>
        <div 
          onClick={() => triggerMetricClick('ltv_cac')} 
          className="py-1 px-1.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-xl cursor-pointer text-center transition-all duration-200 active:scale-95"
        >
          <span className="text-[7.5px] text-white/45 uppercase block font-mono tracking-wider">LTV / CAC</span>
          <span className="text-[11px] font-bold text-[#d2af5a] font-mono">3.2x</span>
        </div>
        <div 
          onClick={() => triggerMetricClick('ebitda')} 
          className="py-1 px-1.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-xl cursor-pointer text-center transition-all duration-200 active:scale-95"
        >
          <span className="text-[7.5px] text-white/45 uppercase block font-mono tracking-wider">EBITDA</span>
          <span className="text-[11px] font-bold text-[#d2af5a] font-mono">24.5%</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-3">
        {/* Sliders de Mesa de Controle do Mockup */}
        <div className="space-y-1.5">
          {/* Cap */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[9px] font-light text-white/55">Cap</span>
              <span className="text-[10px] font-semibold text-[#d2af5a]">{capVal}</span>
            </div>
            <input type="range" min="100" max="2000" step="10" value={capVal} onChange={(e) => setCapVal(Number(e.target.value))} className="gold-slider-premium" />
          </div>

          {/* Fin */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[9px] font-light text-white/55">Fin</span>
              <span className="text-[10px] font-semibold text-[#d2af5a]">{finVal}</span>
            </div>
            <input type="range" min="100" max="2000" step="10" value={finVal} onChange={(e) => setFinVal(Number(e.target.value))} className="gold-slider-premium" />
          </div>

          {/* Sold */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[9px] font-light text-white/55">Sold</span>
              <span className="text-[10px] font-semibold text-[#d2af5a]">${soldVal}</span>
            </div>
            <input type="range" min="10" max="1000" step="5" value={soldVal} onChange={(e) => setSoldVal(Number(e.target.value))} className="gold-slider-premium" />
          </div>
        </div>

        {/* Eixos de Curvas de Telemetria com Tooltips do Mockup */}
        <div className="flex-1 flex flex-col space-y-3 pt-2 border-t border-white/5">
          {/* 1. Probability Density */}
          <div className="relative w-full h-[85px] flex items-center pr-2">
            <div className="w-[18px] flex items-center justify-center text-[6px] uppercase font-bold text-white/35 tracking-widest rotate-y-label">
              Density
            </div>
            <div className="flex-1 h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 260 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d2af5a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#d2af5a" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                <line x1="30" y1="80" x2="245" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                <line x1="30" y1="10" x2="30" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                <line x1="30" y1="45" x2="245" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="135" y1="10" x2="135" y2="80" stroke="rgba(210,175,90,0.22)" strokeWidth="0.8" strokeDasharray="2,2" />
                <path d={bellPath} fill="url(#bellGrad)" />
                <path d={bellPath} fill="none" stroke="#d2af5a" strokeWidth="1.2" />
                <circle cx="85" cy="62" r="1.5" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
                <circle cx="185" cy="62" r="1.5" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
                {['-3', '-2', '-1', '0', '1', '2', '3'].map((lbl, idx) => (
                  <text key={idx} x={30 + idx * 35} y="88" fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="middle" fontFamily="monospace">{lbl}</text>
                ))}
                {['0', '0.1', '0.2', '0.3', '0.4'].map((lbl, idx) => (
                  <text key={idx} x="24" y={80 - idx * 16.5 + 2} fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="end" fontFamily="monospace">{lbl}</text>
                ))}
              </svg>
              {/* Tooltip do Mockup */}
              <div className="absolute left-[54%] top-[1%] pointer-events-none text-[6px] font-mono text-[#d2af5a] bg-[#070708]/95 px-1.5 py-0.5 rounded border border-[#d2af5a]/30 shadow-md">
                Probability density = 0.930
              </div>
            </div>
          </div>
          <div className="text-[6.5px] uppercase text-white/35 font-bold tracking-[0.15em] text-center w-full mt-[-8px] mb-1">
            Probability density
          </div>

          {/* 2. Cumulative Forecast */}
          <div className="relative w-full h-[85px] flex items-center pr-2">
            <div className="w-[18px] flex items-center justify-center text-[6px] uppercase font-bold text-white/35 tracking-widest rotate-y-label">
              Cumulative forecast
            </div>
            <div className="flex-1 h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 260 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sigmoidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d2af5a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#d2af5a" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                <line x1="30" y1="80" x2="245" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                <line x1="30" y1="10" x2="30" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                <line x1="30" y1="45" x2="245" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="135" y1="10" x2="135" y2="80" stroke="rgba(210,175,90,0.15)" strokeWidth="0.8" strokeDasharray="2,2" />
                <path d={sigmoidPath} fill="url(#sigmoidGrad)" />
                <path d={sigmoidPath} fill="none" stroke="#d2af5a" strokeWidth="1.2" />
                <circle cx="160" cy="28" r="1.5" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
                <circle cx="110" cy="62" r="1.5" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
                {['-30', '-20', '-10', '0', '10', '20', '30'].map((lbl, idx) => (
                  <text key={idx} x={30 + idx * 35} y="88" fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="middle" fontFamily="monospace">{lbl}</text>
                ))}
                {['0', '25', '50', '75', '100'].map((lbl, idx) => (
                  <text key={idx} x="24" y={80 - idx * 16.5 + 2} fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="end" fontFamily="monospace">{lbl}</text>
                ))}
              </svg>
              {/* Tooltips do Mockup */}
              <div className="absolute left-[33%] top-[45%] pointer-events-none text-[6px] font-mono text-[#d2af5a] bg-[#070708]/95 px-1.5 py-0.5 rounded border border-[#d2af5a]/30 shadow-md">
                Lignaà: 0.17%
              </div>
              <div className="absolute right-[21%] top-[24%] pointer-events-none text-[6px] font-mono text-[#d2af5a] bg-[#070708]/95 px-1.5 py-0.5 rounded border border-[#d2af5a]/30 shadow-md">
                Sigmoid: 0.35%
              </div>
            </div>
          </div>
          <div className="text-[6.5px] uppercase text-white/35 font-bold tracking-[0.15em] text-center w-full mt-[-8px]">
            Forecast (mnh)
          </div>
        </div>
      </div>
    </div>
  )
}
