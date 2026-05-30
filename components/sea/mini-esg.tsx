'use client'

import { MoreHorizontal, RefreshCw, Footprints, Users } from 'lucide-react'

export function MiniEsg() {
  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      {/* Header Bicolor com 3 Pontos */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#c9943a] font-bold">Governança</span> & ESG
        </span>
        <MoreHorizontal className="h-3.5 w-3.5 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      <div className="flex-1 flex items-center gap-2 py-1">
        {/* Donut progress bar elegante de compliance */}
        <div className="w-[45%] h-[120px] flex flex-col justify-center items-center relative border-r border-white/5 pr-1">
          <svg className="w-[72px] h-[72px]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(197, 151, 64, 0.08)" strokeWidth="4.5" />
            <circle 
              cx="50" 
              cy="50" 
              r="38" 
              fill="none" 
              stroke="#c9943a" 
              strokeWidth="5" 
              strokeDasharray="238.7" 
              strokeDashoffset="35.8" // 85% preenchido
              strokeLinecap="round" 
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pb-1">
            <span className="text-[7.5px] font-light text-white/90 leading-tight">Compliance</span>
            <span className="text-[7.5px] font-light text-white/55 leading-tight">progress</span>
          </div>
        </div>

        {/* ODS Valores alinhados perfeitamente ao mockup */}
        <div className="flex-1 flex flex-col justify-center space-y-2 pl-2">
          <span className="text-[7px] text-white/35 font-mono uppercase tracking-widest mb-0.5">ODS valores</span>

          {/* Item 1 */}
          <div className="flex items-center justify-between text-[7.5px] leading-tight">
            <div className="flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 text-[#c9943a] shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">Renewabilide</span>
                <span className="text-white/40 text-[6.5px]">ecomómica</span>
              </div>
            </div>
            <span className="font-bold text-[#c9943a] text-[10px] font-mono">94%</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between text-[7.5px] leading-tight">
            <div className="flex items-center gap-1.5">
              <Footprints className="h-3.5 w-3.5 text-[#c9943a] shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">Footprint carbont</span>
                <span className="text-white/40 text-[6.5px]">data rha OC 1023.00/t/h</span>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between text-[7.5px] leading-tight">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[#c9943a] shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-white/80">Mulher C-Level</span>
                <span className="text-white/40 text-[6.5px]">representação</span>
              </div>
            </div>
            <span className="font-bold text-[#c9943a] text-[10px] font-mono">17%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
