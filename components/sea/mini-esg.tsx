'use client'

import { MoreHorizontal, RefreshCw, Footprints, Users } from 'lucide-react'

export function MiniEsg() {
  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rotateClockwiseSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseGlowCompliance {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(210, 175, 90, 0.3)); opacity: 0.9; }
          50% { filter: drop-shadow(0 0 8px rgba(210, 175, 90, 0.75)); opacity: 1; }
        }
        .rotate-clockwise-slow {
          animation: rotateClockwiseSlow 25s linear infinite;
          transform-origin: center;
        }
        .pulse-glow-compliance {
          animation: pulseGlowCompliance 4s infinite ease-in-out;
        }
      `}} />

      {/* Header Bicolor com 3 Pontos */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#d2af5a] font-bold">Governança</span> & ESG
        </span>
        <MoreHorizontal className="h-3.5 w-3.5 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      <div className="flex-1 flex items-center gap-2 py-1">
        {/* Donut progress bar elegante e ampliado para 110px GIGANTE */}
        <div className="w-[48%] h-[155px] flex flex-col justify-center items-center relative border-r border-white/5 pr-1">
          <div className="relative w-[110px] h-[110px] flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full rotate-clockwise-slow" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="goldComplianceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d2af5a" />
                  <stop offset="50%" stopColor="#f3ddaa" />
                  <stop offset="100%" stopColor="#d2af5a" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(210, 175, 90, 0.08)" strokeWidth="4.5" />
              <circle 
                cx="50" 
                cy="50" 
                r="38" 
                fill="none" 
                stroke="url(#goldComplianceGrad)" 
                strokeWidth="5" 
                strokeDasharray="238.7" 
                strokeDashoffset="35.8" // 85% preenchido
                strokeLinecap="round" 
                className="pulse-glow-compliance"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[8px] font-semibold text-white/95 leading-tight">Compliance</span>
              <span className="text-[8.5px] font-light text-[#d2af5a] leading-tight">progress</span>
              <span className="text-[14px] font-bold text-white font-mono mt-0.5">85%</span>
            </div>
          </div>
        </div>

        {/* ODS Valores alinhados perfeitamente ao mockup com os valores corretos na direita */}
        <div className="flex-1 flex flex-col justify-center space-y-2.5 pl-2">
          <span className="text-[7px] text-white/35 font-mono uppercase tracking-widest mb-0.5">ODS valores</span>

          {/* Item 1 */}
          <div className="flex items-center justify-between text-[7.5px] leading-tight">
            <div className="flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 text-[#d2af5a] shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-white/85">Renewabilide</span>
                <span className="text-white/40 text-[6.5px]">ecomómica</span>
              </div>
            </div>
            <span className="font-bold text-[#d2af5a] text-[10px] font-mono pl-1">94%</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between text-[7.5px] leading-tight">
            <div className="flex items-center gap-1.5">
              <Footprints className="h-3.5 w-3.5 text-[#d2af5a] shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-white/85">Footprint carbont</span>
                <span className="text-white/40 text-[6.5px]">data rha OC</span>
              </div>
            </div>
            <span className="font-bold text-[#d2af5a] text-[8.5px] font-mono pl-1 leading-none text-right">1023/t/h</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between text-[7.5px] leading-tight">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[#d2af5a] shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-white/85">Mulher C-Level</span>
                <span className="text-white/40 text-[6.5px]">representação</span>
              </div>
            </div>
            <span className="font-bold text-[#d2af5a] text-[10px] font-mono pl-1">17%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
