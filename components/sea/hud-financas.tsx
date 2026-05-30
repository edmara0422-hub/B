'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal } from 'lucide-react'

export function HudFinancas() {
  // Sliders reativos do Mockup
  const [capVal, setCapVal] = useState(1000)
  const [finVal, setFinVal] = useState(1240)
  const [soldVal, setSoldVal] = useState(100)

  // Sincronização de Telemetria com os mini-cards da Home
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) win.IPBTelemetry = {}
      win.IPBTelemetry.faturamento = Math.round(capVal / 5 + finVal / 10)
      win.IPBTelemetry.cac = Math.round(soldVal * 0.7)
      win.IPBTelemetry.opex = 60
      win.IPBTelemetry.clientes = Math.round(finVal * 1.2)
      win.IPBTelemetry.pressaoMetas = Math.round((capVal + finVal - 2240) / 100 + 5)
      
      // Despacha evento de atualização
      window.dispatchEvent(new CustomEvent('ipb-telemetry'))
    }
  }, [capVal, finVal, soldVal])

  // --- SVG PATH GENERATION FOR GAUSSIAN BELL CURVE ---
  const bellPath = useMemo(() => {
    const points = []
    const mean = 135
    const stdDev = 36
    for (let x = 30; x <= 240; x += 2) {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))
      const y = 80 - (70 * Math.exp(exponent)) // Peak at Y=10
      points.push(`${x},${y}`)
    }
    return `M 30,80 L ${points.join(' ')} L 240,80 Z`
  }, [])

  // --- SVG PATH GENERATION FOR SIGMOID S-CURVE ---
  const sigmoidPath = useMemo(() => {
    const points = []
    for (let x = 30; x <= 240; x += 2) {
      const t = (x - 135) / 28
      const y = 80 - (70 / (1 + Math.exp(-t))) // Sigmoid equation
      points.push(`${x},${y}`)
    }
    return `M 30,80 L ${points.join(' ')} L 240,80 Z`
  }, [])

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-5 bg-[#0a0a0c]/85 border border-white/10 rounded-3xl backdrop-blur-xl select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .gold-slider-premium {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(201, 148, 58, 0.15);
          border-radius: 4px;
          outline: none;
        }
        .gold-slider-premium::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #c9943a;
          border: 1.5px solid #000;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(201, 148, 58, 0.7);
          transition: transform 0.15s ease, background-color 0.15s ease;
        }
        .gold-slider-premium::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          background: #e0b85e;
        }
        .rotate-y-label {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          transform-origin: center;
        }
      `}} />

      {/* Header Premium (Poppins Fina) */}
      <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-normal text-white/95 tracking-wide">Pilar 2: Finanças & Controladoria</span>
        </div>
        <MoreHorizontal className="h-4 w-4 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-4">
        
        {/* Sliders Superiores (Cap, Fin, Sold) - Alinhamento e estilo do Mockup */}
        <div className="space-y-3">
          
          {/* Slider 1: Cap */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-normal text-white/55 tracking-wide">Cap</span>
              <span className="text-[11px] font-normal text-[#c9943a]">{capVal}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="2000" 
              step="10" 
              value={capVal} 
              onChange={(e) => setCapVal(Number(e.target.value))}
              className="gold-slider-premium"
            />
          </div>

          {/* Slider 2: Fin */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-normal text-white/55 tracking-wide">Fin</span>
              <span className="text-[11px] font-normal text-[#c9943a]">{finVal}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="2000" 
              step="10" 
              value={finVal} 
              onChange={(e) => setFinVal(Number(e.target.value))}
              className="gold-slider-premium"
            />
          </div>

          {/* Slider 3: Sold */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-normal text-white/55 tracking-wide">Sold</span>
              <span className="text-[11px] font-normal text-[#c9943a]">${soldVal}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="1000" 
              step="5" 
              value={soldVal} 
              onChange={(e) => setSoldVal(Number(e.target.value))}
              className="gold-slider-premium"
            />
          </div>

        </div>

        {/* Charts stacked vertically (Exactly like Mockup!) */}
        <div className="flex-1 flex flex-col space-y-4 pt-1 border-t border-white/5 mt-2">
          
          {/* 1. Probability Density Bell Curve (Gaussian Curve) */}
          <div className="relative w-full h-[105px] flex items-center pr-2">
            {/* Rotated Y-axis label */}
            <div className="w-[20px] flex items-center justify-center text-[7px] uppercase font-bold text-white/30 tracking-widest rotate-y-label">
              Density
            </div>
            
            <div className="flex-1 h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 260 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9943a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#c9943a" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {/* Axes */}
                <line x1="30" y1="80" x2="245" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <line x1="30" y1="10" x2="30" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                
                {/* Grid Lines */}
                <line x1="30" y1="45" x2="245" y2="45" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="135" y1="10" x2="135" y2="80" stroke="rgba(201,148,58,0.22)" strokeWidth="0.8" strokeDasharray="2,2" />

                {/* Shaded Area */}
                <path d={bellPath} fill="url(#bellGrad)" />
                {/* Golden Line */}
                <path d={bellPath} fill="none" stroke="#c9943a" strokeWidth="1.5" />
                
                {/* Dots on Curve */}
                <circle cx="85" cy="62" r="2" fill="#fff" stroke="#c9943a" strokeWidth="0.8" />
                <circle cx="185" cy="62" r="2" fill="#fff" stroke="#c9943a" strokeWidth="0.8" />

                {/* X Axis Labels */}
                {['-3', '-2', '-1', '0', '1', '2', '3'].map((lbl, idx) => {
                  const x = 30 + idx * 35
                  return (
                    <text key={idx} x={x} y="88" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle" fontFamily="monospace">{lbl}</text>
                  )
                })}
                {/* Y Axis Labels */}
                {['0', '0.1', '0.2', '0.3', '0.4'].map((lbl, idx) => {
                  const y = 80 - idx * 16.5
                  return (
                    <text key={idx} x="24" y={y + 2} fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end" fontFamily="monospace">{lbl}</text>
                  )
                })}
              </svg>

              {/* Exact floating Gold Tooltip at Peak as shown in the Mockup */}
              <div 
                className="absolute left-[52%] top-[3%] pointer-events-none text-[6.5px] font-mono text-[#c9943a] bg-[#0c0a06]/95 px-1.5 py-0.5 rounded border border-[#c9943a]/25 scale-90 leading-none whitespace-nowrap shadow-md"
                style={{ transform: 'translateX(-50%)' }}
              >
                Probability density = 0.930
              </div>
            </div>
          </div>
          
          {/* Label under bell curve */}
          <div className="text-[7px] uppercase text-white/35 font-bold tracking-[0.15em] text-center w-full mt-[-8px] mb-1">
            Probability density
          </div>

          {/* 2. Cumulative Forecast Sigmoid S-Curve */}
          <div className="relative w-full h-[105px] flex items-center pr-2">
            {/* Rotated Y-axis label */}
            <div className="w-[20px] flex items-center justify-center text-[7px] uppercase font-bold text-white/30 tracking-widest rotate-y-label">
              Cumulative forecast
            </div>
            
            <div className="flex-1 h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 260 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sigmoidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9943a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#c9943a" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {/* Axes */}
                <line x1="30" y1="80" x2="245" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <line x1="30" y1="10" x2="30" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                
                {/* Grid Lines */}
                <line x1="30" y1="45" x2="245" y2="45" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="135" y1="10" x2="135" y2="80" stroke="rgba(201,148,58,0.15)" strokeWidth="0.8" strokeDasharray="2,2" />

                {/* Shaded Area */}
                <path d={sigmoidPath} fill="url(#sigmoidGrad)" />
                {/* Golden Line */}
                <path d={sigmoidPath} fill="none" stroke="#c9943a" strokeWidth="1.5" />
                
                {/* Dots on Curve */}
                <circle cx="160" cy="28" r="2" fill="#fff" stroke="#c9943a" strokeWidth="0.8" />
                <circle cx="110" cy="62" r="2" fill="#fff" stroke="#c9943a" strokeWidth="0.8" />

                {/* X Axis Labels */}
                {['-30', '-20', '-10', '0', '10', '20', '30'].map((lbl, idx) => {
                  const x = 30 + idx * 35
                  return (
                    <text key={idx} x={x} y="88" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle" fontFamily="monospace">{lbl}</text>
                  )
                })}
                {/* Y Axis Labels */}
                {['0', '25', '50', '75', '100'].map((lbl, idx) => {
                  const y = 80 - idx * 16.5
                  return (
                    <text key={idx} x="24" y={y + 2} fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="end" fontFamily="monospace">{lbl}</text>
                  )
                })}
              </svg>

              {/* Exact floating Tooltip Bubbles overlay as shown in the Mockup */}
              <div 
                className="absolute left-[34%] top-[45%] pointer-events-none text-[6.5px] font-mono text-[#c9943a] bg-[#0c0a06]/95 px-1.5 py-0.5 rounded border border-[#c9943a]/25 scale-90 leading-none whitespace-nowrap shadow-md"
                style={{ transform: 'translateY(-50%)' }}
              >
                Lignaà: 0.17%
              </div>
              <div 
                className="absolute right-[22%] top-[24%] pointer-events-none text-[6.5px] font-mono text-[#c9943a] bg-[#0c0a06]/95 px-1.5 py-0.5 rounded border border-[#c9943a]/25 scale-90 leading-none whitespace-nowrap shadow-md"
                style={{ transform: 'translateY(-50%)' }}
              >
                Sigmoid: 0.35%
              </div>
            </div>
          </div>
          
          {/* Label under S-curve */}
          <div className="text-[7px] uppercase text-white/35 font-bold tracking-[0.15em] text-center w-full mt-[-8px]">
            Forecast (mnh)
          </div>

        </div>

      </div>
    </div>
  )
}
