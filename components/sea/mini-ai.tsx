'use client'

import { MoreHorizontal } from 'lucide-react'

export function MiniAi() {
  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none overflow-hidden"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseOrbGlass {
          0%, 100% { 
            transform: scale(1); 
            filter: drop-shadow(0 0 15px rgba(210, 175, 90, 0.5)) drop-shadow(0 0 25px rgba(210, 175, 90, 0.2));
            opacity: 0.95;
          }
          50% { 
            transform: scale(1.03); 
            filter: drop-shadow(0 0 25px rgba(210, 175, 90, 0.85)) drop-shadow(0 0 45px rgba(210, 175, 90, 0.45));
            opacity: 1;
          }
        }
        @keyframes rotateClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateCounter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes heartbeat {
          0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 5px #fff); }
          50% { opacity: 1; filter: drop-shadow(0 0 15px #d2af5a); }
        }
        @keyframes scanline {
          0% { transform: translateY(-3px); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(6px); opacity: 0; }
        }

        .glow-orb-glass {
          animation: pulseOrbGlass 4s infinite ease-in-out;
        }
        .orbit-rotate-fast {
          animation: rotateClockwise 12s linear infinite;
          transform-origin: 50px 46px;
        }
        .orbit-rotate-slow {
          animation: rotateCounter 22s linear infinite;
          transform-origin: 50px 46px;
        }
        .orbit-rotate-tilted {
          animation: rotateClockwise 30s linear infinite;
          transform-origin: 50px 46px;
        }
        .ai-text-pulse {
          animation: heartbeat 3s infinite ease-in-out;
        }
        .base-scan {
          animation: scanline 2.5s infinite linear;
        }
      `}} />

      {/* Header Bicolor Premium com 3 Pontos */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#d2af5a] font-bold">IPB</span> AI Assistant
        </span>
        <MoreHorizontal className="h-3.5 w-3.5 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      <div className="flex-1 flex items-center gap-2 py-0">
        {/* Holograma da Esfera de IA GIGANTE (Aumentada para 145px) */}
        <div className="w-[52%] h-[165px] flex flex-col justify-center items-center border-r border-white/5 pr-2 relative overflow-hidden">
          <svg className="w-[145px] h-[145px] glow-orb-glass mt-1" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="holoCore3D" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#fffbf2" stopOpacity="0.75" />
                <stop offset="75%" stopColor="#d2af5a" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#7a5b18" stopOpacity="0.05" />
              </radialGradient>
              <radialGradient id="goldSphereBorder" cx="50%" cy="50%" r="50%">
                <stop offset="90%" stopColor="#d2af5a" stopOpacity="0.2" />
                <stop offset="98%" stopColor="#d2af5a" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
              </radialGradient>
              <filter id="aiTextGlow">
                <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Anéis de Coordenadas do Grid Externo */}
            <circle cx="50" cy="46" r="44" fill="none" stroke="#d2af5a" strokeWidth="0.5" strokeDasharray="3,6" className="orbit-rotate-fast" opacity="0.25" />
            <circle cx="50" cy="46" r="28" fill="#d2af5a" fillOpacity="0.05" stroke="url(#goldSphereBorder)" strokeWidth="0.8" />

            {/* Eixo 1: Órbitas Horárias Rápidas */}
            <g className="orbit-rotate-fast" opacity="0.65">
              <ellipse cx="50" cy="46" rx="28" ry="8" fill="none" stroke="#d2af5a" strokeWidth="0.7" />
              <ellipse cx="50" cy="46" rx="8" ry="28" fill="none" stroke="#d2af5a" strokeWidth="0.7" />
              <circle cx="50" cy="18" r="1.2" fill="#ffffff" />
              <circle cx="50" cy="74" r="1.2" fill="#ffffff" />
            </g>

            {/* Eixo 2: Órbitas Anti-Horárias Médias */}
            <g className="orbit-rotate-slow" opacity="0.6">
              <ellipse cx="50" cy="46" rx="28" ry="16" fill="none" stroke="#d2af5a" strokeWidth="0.6" />
              <ellipse cx="50" cy="46" rx="16" ry="28" fill="none" stroke="#d2af5a" strokeWidth="0.6" />
              <circle cx="22" cy="46" r="1.2" fill="#ffffff" />
              <circle cx="78" cy="46" r="1.2" fill="#ffffff" />
            </g>

            {/* Eixo 3: Órbitas Tilted Lentas */}
            <g className="orbit-rotate-tilted" opacity="0.5">
              <ellipse cx="50" cy="46" rx="27" ry="10" fill="none" stroke="#d2af5a" strokeWidth="0.5" transform="rotate(30, 50, 46)" />
              <ellipse cx="50" cy="46" rx="27" ry="10" fill="none" stroke="#d2af5a" strokeWidth="0.5" transform="rotate(-30, 50, 46)" />
            </g>

            <circle cx="50" cy="46" r="27.5" fill="url(#holoCore3D)" />
            
            {/* Texto AI Central Pulsante */}
            <text x="50" y="52" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle" filter="url(#aiTextGlow)" className="ai-text-pulse" style={{ fontFamily: "monospace" }}>
              AI
            </text>

            {/* Glare spotlight */}
            <circle cx="40" cy="36" r="3.5" fill="#ffffff" opacity="0.65" filter="blur(0.4px)" />

            {/* Pedestal de Anéis Metálicos com Scanline de Varredura */}
            <g transform="translate(0, 1)">
              <ellipse cx="50" cy="74" rx="26" ry="3.5" fill="rgba(210,175,90,0.25)" filter="blur(1.5px)" />
              <path d="M 28,78 L 72,78 L 68,82 L 32,82 Z" fill="#1e180d" stroke="rgba(210,175,90,0.45)" strokeWidth="0.5" />
              <path d="M 36,73 L 64,73 L 60,78 L 40,78 Z" fill="#0d0d0f" stroke="rgba(210,175,90,0.45)" strokeWidth="0.5" />
              
              {/* Scanline ativo */}
              <line x1="34" y1="74" x2="66" y2="74" stroke="#ffffff" strokeWidth="0.8" className="base-scan" opacity="0.6" />
              
              <line x1="22" y1="84" x2="78" y2="84" stroke="#d2af5a" strokeWidth="0.5" strokeDasharray="1,4" opacity="0.6" />
            </g>
          </svg>
        </div>

        {/* Lado Direito: Botões de Lançamento */}
        <div className="flex-1 flex flex-col justify-center space-y-3 pl-1.5 relative">
          {/* Gemini */}
          <div className="relative flex items-center">
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
              <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
            </div>
            <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
              <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
            </div>
            <button className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#d2af5a]/12 border border-[#d2af5a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200 shadow-md active:scale-98">
              Gemini
            </button>
          </div>

          {/* Grok */}
          <div className="relative flex items-center">
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
              <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
            </div>
            <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
              <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
            </div>
            <button className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#d2af5a]/12 border border-[#d2af5a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200 shadow-md active:scale-98">
              Grok
            </button>
          </div>

          {/* LLaMA */}
          <div className="relative flex items-center">
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
              <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
            </div>
            <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
              <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
            </div>
            <button className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#d2af5a]/12 border border-[#d2af5a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200 shadow-md active:scale-98">
              LLaMA
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
