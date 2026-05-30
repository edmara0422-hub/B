'use client'

import { useEffect, useState, useMemo } from 'react'

export function MiniEsg() {
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

  // Dynamic compliance index affected by target pressure
  const complianceScore = useMemo(() => {
    return Math.max(70, Math.round(98 - pressaoMetas * 2.8))
  }, [pressaoMetas])

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      <div className="flex justify-between items-center w-full z-10">
        <div className="live-tag">
          <div className="dot" />
          <span>ESG & Governança · Real-Time · LIVE</span>
        </div>
        <div className="badge text-[8px] bg-[#d4b87a]/15 text-[#d4b87a] px-1.5 py-0.5 rounded font-mono uppercase font-bold">
          COMPL. {complianceScore}%
        </div>
      </div>

      {/* SVG Materiality Ring & ODS Indicators (Real Analytical Widget) */}
      <div className="relative w-full h-[60px] flex items-center justify-between mt-2 mb-1 border-b border-white/5 pb-1 gap-2">
        <div className="absolute top-0 left-0 text-[7px] text-white/30 uppercase tracking-widest font-mono font-bold">
          Materialidade & Carbono
        </div>
        
        {/* Left Side: Circular SVG Compliance Ring */}
        <div className="flex items-center gap-2 mt-2">
          <div className="relative h-[36px] w-[36px] shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-white/5" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-[#d4b87a] transition-all duration-300" strokeDasharray={`${complianceScore}, 100`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[7.5px] font-mono font-bold text-[#d4b87a]">
              {complianceScore}%
            </div>
          </div>
          <div className="text-left">
            <div className="text-[7.5px] uppercase font-bold text-white/50 leading-none">Matriz Energética</div>
            <div className="text-[9px] font-mono font-bold text-[#d4b87a] mt-0.5 leading-none">94.0% Renovável</div>
          </div>
        </div>

        {/* Right Side: Carbon & Diversity indicators */}
        <div className="text-right mt-2 flex flex-col justify-end">
          <div className="text-[7px] uppercase font-bold text-white/30 leading-none">Carbon Footprint</div>
          <div className="text-[10px] font-mono font-bold text-white/80 mt-0.5 leading-none">13.50t CO2e</div>
          <div className="text-[6.5px] text-white/40 mt-1">Liderança Fem: <span className="text-[#d4b87a] font-bold font-mono">17%</span></div>
        </div>
      </div>

      {/* ODS Vitals */}
      <div className="grid grid-cols-3 gap-2 mt-1 relative z-10 text-left">
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">ODS 03</span>
          <b className="text-[9.5px] text-[#d4b87a] font-mono mt-0.5 block leading-none">
            Saúde Humana
          </b>
        </div>
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">ODS 09</span>
          <b className="text-[9.5px] text-[#d4b87a] font-mono mt-0.5 block leading-none">
            Infr. & Inov.
          </b>
        </div>
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="text-[7.5px] uppercase text-white/30 block font-bold leading-none">ODS 12</span>
          <b className="text-[9.5px] text-[#d4b87a] font-mono mt-0.5 block leading-none">
            Eficiên. Cloud
          </b>
        </div>
      </div>
      
      <div className="title-area relative z-10 mt-1 select-none flex justify-between items-end">
        <div>
          <span className="text-[8px] uppercase text-white/40 block leading-none font-bold">Materialidade & Sustentabilidade</span>
          <h2 className="text-white text-xs font-bold mt-0.5 tracking-wider uppercase leading-none flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm bg-[#d4b87a]" /> Governança & ESG
          </h2>
        </div>
        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest leading-none font-semibold">ESG 6D</span>
      </div>
    </div>
  )
}
