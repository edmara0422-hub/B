'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal, RefreshCw, Footprints, Users } from 'lucide-react'

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
    return Math.max(70, Math.round(94 - (pressaoMetas - 5) * 3))
  }, [pressaoMetas])

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      {/* Header Premium (Poppins Fina) */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-xs font-normal text-white/95 tracking-wide">Governança & ESG</span>
        <MoreHorizontal className="h-4 w-4 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-2 py-2">
        
        {/* Left Side: Circular Compliance SVG Ring with centered text (Mockup Style) */}
        <div className="w-[45%] h-[120px] flex flex-col justify-center items-center border-r border-white/5 pr-2">
          <div className="relative h-[68px] w-[68px] shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Background ring */}
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3.2" />
              {/* Foreground glowing gold ring */}
              <circle 
                cx="18" 
                cy="18" 
                r="15.9155" 
                fill="none" 
                stroke="#c9943a" 
                strokeWidth="3" 
                strokeDasharray={`${complianceScore}, 100`} 
                strokeLinecap="round" 
                className="transition-all duration-300"
                style={{ filter: 'drop-shadow(0 0 6px rgba(201, 148, 58, 0.4))' }}
              />
            </svg>
            
            {/* Centered label exactly as in the mockup */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1 leading-tight select-none">
              <span className="text-[7.5px] font-medium text-white/80 leading-none">Compliance</span>
              <span className="text-[6.5px] text-white/40 font-normal leading-none mt-0.5">progress</span>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed ODS Metrics with Icons & Capsules (Mockup Style) */}
        <div className="flex-1 flex flex-col justify-center space-y-1.5 pl-1 font-sans">
          <div className="text-[7.5px] uppercase tracking-widest text-white/40 font-bold leading-none mb-1">ODS valores</div>
          
          {/* Renewability Capsule */}
          <div className="border border-[#c9943a]/15 bg-[#0e0d0a]/40 px-2.5 py-1.5 rounded-xl flex justify-between items-center text-[8.5px] hover:border-[#c9943a]/35 transition-colors">
            <div className="flex items-center gap-1.5">
              <RefreshCw className="h-2.5 w-2.5 text-[#c9943a]" />
              <span className="font-light text-white/55">Renewabilide ecomómica</span>
            </div>
            <span className="font-normal text-[#c9943a] text-[9.5px]">94%</span>
          </div>

          {/* Carbon Footprint Capsule */}
          <div className="border border-[#c9943a]/15 bg-[#0e0d0a]/40 px-2.5 py-1.5 rounded-xl flex justify-between items-center text-[8.5px] hover:border-[#c9943a]/35 transition-colors">
            <div className="flex items-center gap-1.5">
              <Footprints className="h-2.5 w-2.5 text-[#c9943a]" />
              <span className="font-light text-white/55">Footprint carbont</span>
            </div>
            <span className="font-normal text-[#c9943a] text-[8.5px] scale-95 whitespace-nowrap">data rha OC 1023.00/t/h</span>
          </div>

          {/* Female C-Level Capsule */}
          <div className="border border-[#c9943a]/15 bg-[#0e0d0a]/40 px-2.5 py-1.5 rounded-xl flex justify-between items-center text-[8.5px] hover:border-[#c9943a]/35 transition-colors">
            <div className="flex items-center gap-1.5">
              <Users className="h-2.5 w-2.5 text-[#c9943a]" />
              <span className="font-light text-white/55">Mulher C-Level representação</span>
            </div>
            <span className="font-normal text-[#c9943a] text-[9.5px]">17%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
