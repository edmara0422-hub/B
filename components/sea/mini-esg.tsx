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
      {/* Header */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[10px] font-black text-white tracking-widest uppercase">3) SUSTENTABILIDADE & ESG</span>
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest font-bold">Governança</span>
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-3 py-2">
        {/* Left Side: Circular Compliance SVG Ring */}
        <div className="w-[50%] h-[75px] flex flex-col justify-center items-center border-r border-white/5 pr-3">
          <span className="text-[7px] uppercase tracking-wider text-white/30 font-bold mb-1 block">Compliance progress</span>
          <div className="relative h-[44px] w-[44px] shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-white/5" stroke="currentColor" strokeWidth="3.2" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-[#d4b87a] transition-all duration-300" strokeDasharray={`${complianceScore}, 100`} stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
              <span className="text-[8px] font-mono font-bold text-[#d4b87a]">{complianceScore}%</span>
            </div>
          </div>
        </div>

        {/* Right Side: Metrics */}
        <div className="flex-1 flex flex-col justify-center space-y-1.5 pl-1.5">
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">Renewability</span>
            <span className="text-xs font-bold text-[#d4b87a] font-mono leading-none mt-1">94%</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">Carbon footprint</span>
            <span className="text-xs font-bold text-[#d4b87a] font-mono leading-none mt-1">13.50t CO2e</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none">Women C-Level</span>
            <span className="text-xs font-bold text-[#d4b87a] font-mono leading-none mt-1">17%</span>
          </div>
        </div>
      </div>

      {/* Footer Vitals */}
      <div className="flex justify-between items-center text-[7.5px] text-white/20 border-t border-white/5 pt-1">
        <span>ODS 03, 09 & 12 · Carbon Free</span>
        <span className="font-bold text-[#d4b87a]/60 font-mono">LIVE FEED</span>
      </div>
    </div>
  )
}
