'use client'

import { MoreHorizontal } from 'lucide-react'

export function MiniAi() {
  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseOrbGlass {
          0%, 100% { 
            transform: scale(1); 
            filter: drop-shadow(0 0 12px rgba(201, 148, 58, 0.45)) drop-shadow(0 0 20px rgba(201, 148, 58, 0.2));
            opacity: 0.95;
          }
          50% { 
            transform: scale(1.04); 
            filter: drop-shadow(0 0 20px rgba(201, 148, 58, 0.75)) drop-shadow(0 0 35px rgba(201, 148, 58, 0.4));
            opacity: 1;
          }
        }
        @keyframes rotatePedestal {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .glow-orb-glass {
          animation: pulseOrbGlass 4s infinite ease-in-out;
        }
        .rotate-pedestal-ring {
          animation: rotatePedestal 25s linear infinite;
          transform-origin: center;
        }
      `}} />

      {/* Header Bicolor com 3 Pontos */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#c59740] font-bold">IPB</span> AI Assistant
        </span>
        <MoreHorizontal className="h-3.5 w-3.5 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      <div className="flex-1 flex items-center gap-2 py-1">
        {/* Holograma da Esfera de IA 3D */}
        <div className="w-[50%] h-[120px] flex flex-col justify-center items-center border-r border-white/5 pr-2 relative overflow-hidden">
          <svg className="w-[82px] h-[82px] glow-orb-glass" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="holoCore3D" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#fff8e7" stopOpacity="0.65" />
                <stop offset="75%" stopColor="#c9943a" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#9a7a42" stopOpacity="0.05" />
              </radialGradient>
              <radialGradient id="goldSphereBorder" cx="50%" cy="50%" r="50%">
                <stop offset="90%" stopColor="#c9943a" stopOpacity="0.15" />
                <stop offset="98%" stopColor="#c9943a" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
              </radialGradient>
              <filter id="aiTextGlow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <circle cx="50" cy="46" r="44" fill="none" stroke="#c9943a" strokeWidth="0.5" strokeDasharray="3,6" className="rotate-pedestal-ring" opacity="0.2" />
            <circle cx="50" cy="46" r="28" fill="#c9943a" fillOpacity="0.04" stroke="url(#goldSphereBorder)" strokeWidth="0.8" />

            {/* Malha Matemática de Elipses 3D Rotativas */}
            <g opacity="0.55" className="rotate-pedestal-ring">
              <ellipse cx="50" cy="46" rx="28" ry="8" fill="none" stroke="#c9943a" strokeWidth="0.6" />
              <ellipse cx="50" cy="46" rx="28" ry="16" fill="none" stroke="#c9943a" strokeWidth="0.5" />
              <ellipse cx="50" cy="46" rx="8" ry="28" fill="none" stroke="#c9943a" strokeWidth="0.6" />
              <ellipse cx="50" cy="46" rx="16" ry="28" fill="none" stroke="#c9943a" strokeWidth="0.5" />
              <ellipse cx="50" cy="46" rx="27" ry="10" fill="none" stroke="#c9943a" strokeWidth="0.5" transform="rotate(30, 50, 46)" />
              <ellipse cx="50" cy="46" rx="27" ry="10" fill="none" stroke="#c9943a" strokeWidth="0.5" transform="rotate(-30, 50, 46)" />
              <circle cx="50" cy="18" r="1.2" fill="#ffffff" />
              <circle cx="50" cy="74" r="1.2" fill="#ffffff" />
              <circle cx="22" cy="46" r="1.2" fill="#ffffff" />
              <circle cx="78" cy="46" r="1.2" fill="#ffffff" />
            </g>

            <circle cx="50" cy="46" r="27.5" fill="url(#holoCore3D)" />
            <text x="50" y="52" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle" filter="url(#aiTextGlow)" style={{ textShadow: '0 0 10px rgba(255,255,255,0.95), 0 0 20px rgba(201, 148, 58, 0.9)' }}>
              AI
            </text>
            <circle cx="40" cy="36" r="3.5" fill="#ffffff" opacity="0.65" filter="blur(0.4px)" />

            {/* Pedestal de Anéis Metálicos com Ticks */}
            <g transform="translate(0, 1)">
              <ellipse cx="50" cy="74" rx="26" ry="3.5" fill="rgba(201,148,58,0.18)" filter="blur(1.5px)" />
              <path d="M 28,78 L 72,78 L 68,82 L 32,82 Z" fill="#1e180d" stroke="rgba(201,148,58,0.4)" strokeWidth="0.5" />
              <path d="M 36,73 L 64,73 L 60,78 L 40,78 Z" fill="#0d0d0f" stroke="rgba(201,148,58,0.4)" strokeWidth="0.5" />
              <line x1="22" y1="84" x2="78" y2="84" stroke="#c9943a" strokeWidth="0.5" strokeDasharray="1,4" opacity="0.6" />
            </g>
          </svg>
        </div>

        {/* Lado Direito: Botões com Conectores de Dados do Mockup */}
        <div className="flex-1 flex flex-col justify-center space-y-2.5 pl-1.5 relative">
          
          {/* Gemini */}
          <div className="relative flex items-center">
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
              <div className="h-1.5 w-[0.5px] bg-[#c9943a]" />
            </div>
            <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-1.5 w-[0.5px] bg-[#c9943a]" />
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
            </div>
            <button className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#c9943a]/12 border border-[#c9943a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200">
              Gemini
            </button>
          </div>

          {/* Grok */}
          <div className="relative flex items-center">
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
              <div className="h-1.5 w-[0.5px] bg-[#c9943a]" />
            </div>
            <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-1.5 w-[0.5px] bg-[#c9943a]" />
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
            </div>
            <button className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#c9943a]/12 border border-[#c9943a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200">
              Grok
            </button>
          </div>

          {/* LLaMA */}
          <div className="relative flex items-center">
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
              <div className="h-1.5 w-[0.5px] bg-[#c9943a]" />
            </div>
            <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-1.5 w-[0.5px] bg-[#c9943a]" />
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
            </div>
            <button className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#c9943a]/12 border border-[#c9943a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200">
              LLaMA
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
