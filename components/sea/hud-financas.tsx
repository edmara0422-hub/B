'use client'

import { useEffect, useState, useMemo } from 'react'

export function HudFinancas() {
  // Sliders reativos do Mockup
  const [capVal, setCapVal] = useState(800)
  const [finVal, setFinVal] = useState(1240)
  const [soldVal, setSoldVal] = useState(520)
  const [bottomVal1, setBottomVal1] = useState(200)
  const [bottomVal2, setBottomVal2] = useState(12)

  // Sincronização de Telemetria com os mini-cards da Home
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) win.IPBTelemetry = {}
      win.IPBTelemetry.faturamento = Math.round(capVal / 5 + finVal / 10)
      win.IPBTelemetry.cac = Math.round(soldVal * 0.7)
      win.IPBTelemetry.opex = Math.round(bottomVal1 * 0.3)
      win.IPBTelemetry.clientes = Math.round(finVal * 1.2)
      win.IPBTelemetry.pressaoMetas = Math.round(bottomVal2 * 0.5)
      
      // Despacha evento de atualização
      window.dispatchEvent(new CustomEvent('ipb-telemetry'))
    }
  }, [capVal, finVal, soldVal, bottomVal1, bottomVal2])

  // --- SVG PATH GENERATION FOR GAUSSIAN BELL CURVE ---
  const bellPath = useMemo(() => {
    // Generates a beautiful SVG path for a Gaussian curve centered at X=100
    const points = []
    const mean = 100
    const stdDev = 32
    for (let x = 10; x <= 190; x += 2) {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))
      const y = 85 - (80 * Math.exp(exponent)) // Peak at Y=5 (85 - 80)
      points.push(`${x},${y}`)
    }
    return `M 10,85 L ${points.join(' ')} L 190,85 Z`
  }, [])

  // --- SVG PATH GENERATION FOR SIGMOID S-CURVE ---
  const sigmoidPath = useMemo(() => {
    // Generates a beautiful S-curve path
    const points = []
    for (let x = 10; x <= 190; x += 2) {
      const t = (x - 100) / 28
      const y = 85 - (80 / (1 + Math.exp(-t))) // Sigmoid equation
      points.push(`${x},${y}`)
    }
    return `M 10,85 L ${points.join(' ')} L 190,85 Z`
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 bg-[#0a0a0c]/90 border border-[#d4b87a]/15 rounded-3xl backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] select-none">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .gold-slider-premium {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(212, 184, 122, 0.15);
          border-radius: 4px;
          outline: none;
        }
        .gold-slider-premium::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #d4b87a;
          border: 2px solid #000;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(212, 184, 122, 0.8);
          transition: transform 0.15s ease, background-color 0.15s ease;
        }
        .gold-slider-premium::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          background: #e5cb93;
        }
      `}} />

      {/* Header Premium */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
        <h2 className="text-white text-sm font-black tracking-widest uppercase">Pilar 2: Finanças & Controladoria</h2>
        <span className="text-[9px] font-mono text-[#d4b87a] uppercase tracking-widest bg-[#d4b87a]/10 px-2 py-0.5 rounded-full font-bold">FN-01 • ACTIVE 6D</span>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-4">
        
        {/* Sliders Superiores (Cap, Fin, Sold) */}
        <div className="space-y-3.5">
          
          {/* Slider 1: Cap */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Cap</span>
              <span className="text-xs font-mono font-bold text-[#d4b87a]">{capVal}</span>
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
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Fin</span>
              <span className="text-xs font-mono font-bold text-[#d4b87a]">{finVal}</span>
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
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Sold</span>
              <span className="text-xs font-mono font-bold text-[#d4b87a]">${soldVal}</span>
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

        {/* Charts Container side-by-side (Identical to Mockup) */}
        <div className="grid grid-cols-2 gap-4 py-1 border-t border-b border-white/5 my-2">
          
          {/* Probability Density Bell Curve */}
          <div className="flex flex-col items-center">
            <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold mb-1 font-mono">Probability density = 0.930</span>
            <div className="w-full h-[95px] relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d4b87a" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {/* Axes */}
                <line x1="10" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <line x1="10" y1="5" x2="10" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                
                {/* Grid Lines */}
                <line x1="10" y1="45" x2="190" y2="45" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="100" y1="5" x2="100" y2="85" stroke="rgba(212,184,122,0.15)" strokeWidth="0.8" strokeDasharray="2,2" />

                {/* Shaded Area */}
                <path d={bellPath} fill="url(#bellGrad)" />
                {/* Golden Line */}
                <path d={bellPath} fill="none" stroke="#d4b87a" strokeWidth="1.8" />
                
                {/* Dots on Curve */}
                <circle cx="50" cy="65" r="2.5" fill="#fff" stroke="#d4b87a" strokeWidth="1" />
                <circle cx="150" cy="65" r="2.5" fill="#fff" stroke="#d4b87a" strokeWidth="1" />

                {/* X Axis Labels */}
                {['-3', '-2', '-1', '0', '1', '2', '3'].map((lbl, idx) => {
                  const x = 10 + idx * 30
                  return (
                    <text key={idx} x={x} y="95" fill="rgba(255,255,255,0.3)" fontSize="6.5" textAnchor="middle" fontFamily="monospace">{lbl}</text>
                  )
                })}
                {/* Y Axis Labels */}
                {['0.0', '0.2', '0.4', '0.6'].map((lbl, idx) => {
                  const y = 85 - idx * 25
                  return (
                    <text key={idx} x="5" y={y + 2.5} fill="rgba(255,255,255,0.3)" fontSize="6.5" textAnchor="end" fontFamily="monospace">{lbl}</text>
                  )
                })}
              </svg>
            </div>
            <span className="text-[7.5px] uppercase text-white/35 font-bold tracking-widest mt-1">Probability density</span>
          </div>

          {/* Cumulative Forecast Sigmoid S-Curve */}
          <div className="flex flex-col items-center">
            <span className="text-[8px] uppercase tracking-wider text-white/35 font-bold mb-1 font-mono">Cumulative forecast</span>
            <div className="w-full h-[95px] relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sigmoidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d4b87a" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {/* Axes */}
                <line x1="10" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <line x1="10" y1="5" x2="10" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                
                {/* Grid Lines */}
                <line x1="10" y1="45" x2="190" y2="45" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3,3" />

                {/* Shaded Area */}
                <path d={sigmoidPath} fill="url(#sigmoidGrad)" />
                {/* Golden Line */}
                <path d={sigmoidPath} fill="none" stroke="#d4b87a" strokeWidth="1.8" />
                
                {/* Dots on Curve */}
                <circle cx="120" cy="30" r="2.5" fill="#fff" stroke="#d4b87a" strokeWidth="1" />
                <circle cx="80" cy="60" r="2.5" fill="#fff" stroke="#d4b87a" strokeWidth="1" />

                {/* X Axis Labels */}
                {['-30', '-20', '-10', '0', '10', '20', '30'].map((lbl, idx) => {
                  const x = 10 + idx * 30
                  return (
                    <text key={idx} x={x} y="95" fill="rgba(255,255,255,0.3)" fontSize="6.5" textAnchor="middle" fontFamily="monospace">{lbl}</text>
                  )
                })}
                {/* Y Axis Labels */}
                {['0', '50', '100'].map((lbl, idx) => {
                  const y = 85 - idx * 38
                  return (
                    <text key={idx} x="5" y={y + 2.5} fill="rgba(255,255,255,0.3)" fontSize="6.5" textAnchor="end" fontFamily="monospace">{lbl}</text>
                  )
                })}
              </svg>

              {/* Exact Text Overlay Bubbles as shown in the Mockup */}
              <div className="absolute left-[38%] top-[38%] pointer-events-none text-[6.5px] font-mono font-bold text-[#d4b87a] bg-black/90 px-1 py-0.5 rounded border border-[#d4b87a]/20 scale-90 leading-none">
                Lignaà: 0.17%
              </div>
              <div className="absolute right-[12%] top-[50%] pointer-events-none text-[6.5px] font-mono font-bold text-[#d4b87a] bg-black/90 px-1 py-0.5 rounded border border-[#d4b87a]/20 scale-90 leading-none">
                Sigmoid: 0.35%
              </div>
            </div>
            <span className="text-[7.5px] uppercase text-white/35 font-bold tracking-widest mt-1">Forecast (mnh)</span>
          </div>

        </div>

        {/* Sliders Inferiores (200, 12x) */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          
          {/* Bottom Slider 1 */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider">Scale Factor</span>
              <span className="text-xs font-mono font-bold text-[#d4b87a]">{bottomVal1}</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="500" 
              step="5" 
              value={bottomVal1} 
              onChange={(e) => setBottomVal1(Number(e.target.value))}
              className="gold-slider-premium"
            />
          </div>

          {/* Bottom Slider 2 */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider">Atrito Multiplier</span>
              <span className="text-xs font-mono font-bold text-[#d4b87a]">{bottomVal2}x</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="30" 
              step="1" 
              value={bottomVal2} 
              onChange={(e) => setBottomVal2(Number(e.target.value))}
              className="gold-slider-premium"
            />
          </div>

        </div>

      </div>
    </div>
  )
}
