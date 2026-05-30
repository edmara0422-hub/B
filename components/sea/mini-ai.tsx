'use client'

import { MoreHorizontal } from 'lucide-react'

export function MiniAi() {
  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      {/* Header Premium (Poppins Fina) */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-xs font-normal text-white/95 tracking-wide">IPB AI Assistant</span>
        <MoreHorizontal className="h-4 w-4 text-white/40 hover:text-white/80 cursor-pointer" />
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-2 py-2">
        
        {/* Left Side: Glowing SVG Holographic AI Orb on Metallic Pedestal (Mockup Style) */}
        <div className="w-[50%] h-[120px] flex flex-col justify-center items-center border-r border-white/5 pr-2 relative overflow-hidden">
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
            @keyframes pulseWave {
              0% { r: 24px; opacity: 0.6; stroke-width: 0.8px; }
              50% { r: 34px; opacity: 0.35; stroke-width: 0.6px; }
              100% { r: 44px; opacity: 0; stroke-width: 0.3px; }
            }
            .glow-orb-glass {
              animation: pulseOrbGlass 4s infinite ease-in-out;
            }
            .rotate-pedestal-ring {
              animation: rotatePedestal 25s linear infinite;
              transform-origin: center;
            }
            .pulse-radar-1 {
              animation: pulseWave 3s infinite linear;
              transform-origin: center;
            }
            .pulse-radar-2 {
              animation: pulseWave 3s infinite linear;
              animation-delay: 1.5s;
              transform-origin: center;
            }
          `}} />
          
          <svg className="w-[78px] h-[78px] glow-orb-glass" viewBox="0 0 100 100">
            <defs>
              {/* High-Fidelity 3D Glass Sphere Gradients using rich bronze-gold #c9943a */}
              <radialGradient id="holoCore3D" cx="35%" cy="35%" r="65%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#fff8e7" stopOpacity="0.6" />
                <stop offset="75%" stopColor="#c9943a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#9a7a42" stopOpacity="0.05" />
              </radialGradient>

              <radialGradient id="goldSphereBorder" cx="50%" cy="50%" r="50%">
                <stop offset="90%" stopColor="#c9943a" stopOpacity="0.1" />
                <stop offset="98%" stopColor="#c9943a" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
              </radialGradient>

              <linearGradient id="pedestalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#c9943a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1e180d" stopOpacity="0.9" />
              </linearGradient>

              <filter id="aiTextGlow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Pulsing radar waves */}
            <circle cx="50" cy="46" r="24" fill="none" stroke="#c9943a" className="pulse-radar-1" />
            <circle cx="50" cy="46" r="24" fill="none" stroke="#c9943a" className="pulse-radar-2" />

            {/* Concentric high-tech background coordinates */}
            <circle cx="50" cy="46" r="42" fill="none" stroke="#c9943a" strokeWidth="0.5" strokeDasharray="3,6" className="rotate-pedestal-ring" opacity="0.2" />
            <circle cx="50" cy="46" r="38" fill="none" stroke="#c9943a" strokeWidth="0.4" strokeDasharray="10,8" className="rotate-pedestal-ring" style={{ animationDirection: 'reverse' }} opacity="0.15" />

            {/* 3D Glass Sphere Backing Aura */}
            <circle cx="50" cy="46" r="28" fill="#c9943a" fillOpacity="0.04" stroke="url(#goldSphereBorder)" strokeWidth="0.8" />

            {/* Holographic glowing grids inside sphere */}
            <g opacity="0.3">
              <ellipse cx="50" cy="46" rx="28" ry="8" fill="none" stroke="#c9943a" strokeWidth="0.5" />
              <ellipse cx="50" cy="46" rx="8" ry="28" fill="none" stroke="#c9943a" strokeWidth="0.5" />
              <ellipse cx="50" cy="46" rx="20" ry="20" fill="none" stroke="#fff" strokeWidth="0.4" strokeDasharray="2,2" />
            </g>

            {/* Core 3D Volumetric fill */}
            <circle cx="50" cy="46" r="27.5" fill="url(#holoCore3D)" />

            {/* Exact Mockup central Glowing AI Text */}
            <text 
              x="50" 
              y="52" 
              fill="#ffffff" 
              fontSize="16" 
              fontWeight="900" 
              fontFamily="sans-serif" 
              textAnchor="middle" 
              letterSpacing="0.05em" 
              filter="url(#aiTextGlow)"
              style={{ textShadow: '0 0 10px rgba(255,255,255,0.95), 0 0 20px rgba(201, 148, 58, 0.85)' }}
            >
              AI
            </text>

            {/* Glare spotlight */}
            <circle cx="40" cy="36" r="3.5" fill="#ffffff" opacity="0.65" filter="blur(0.4px)" />

            {/* HIGH-TECH METALLIC PEDESTAL (Mockup Style) */}
            <g transform="translate(0, 1)">
              {/* Pedestal Base light reflection */}
              <ellipse cx="50" cy="74" rx="26" ry="3.5" fill="rgba(201,148,58,0.18)" filter="blur(1.5px)" />

              {/* Pedestal Bottom Base */}
              <path d="M 28,78 L 72,78 L 68,82 L 32,82 Z" fill="url(#pedestalGrad)" stroke="rgba(201,148,58,0.3)" strokeWidth="0.5" />
              
              {/* Pedestal Neck and Ring */}
              <path d="M 36,73 L 64,73 L 60,78 L 40,78 Z" fill="#0d0d0f" stroke="rgba(201,148,58,0.4)" strokeWidth="0.5" />
              
              {/* Telemetry coordinate ticks under base */}
              <line x1="22" y1="84" x2="78" y2="84" stroke="#c9943a" strokeWidth="0.5" strokeDasharray="1,4" opacity="0.6" />
            </g>
          </svg>
        </div>

        {/* Right Side: Three Stacked Gold Buttons with Connector Lines (Mockup Style) */}
        <div className="flex-1 flex flex-col justify-center space-y-2.5 pl-1.5 relative">
          
          {/* Button 1: Gemini */}
          <div className="relative flex items-center">
            {/* Connector Line Grid */}
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#c9943a] shrink-0" style={{ transform: 'translateX(4px)' }} />
            </div>
            
            <button className="w-full text-center py-1.5 bg-black/45 hover:bg-[#c9943a]/10 border border-[#c9943a]/30 hover:border-[#c9943a]/65 rounded-xl text-[10px] font-normal text-white tracking-widest uppercase transition-all duration-200 shadow-md">
              Gemini
            </button>
          </div>

          {/* Button 2: Grok */}
          <div className="relative flex items-center">
            {/* Connector Line Grid */}
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#c9943a] shrink-0" style={{ transform: 'translateX(4px)' }} />
            </div>
            
            <button className="w-full text-center py-1.5 bg-black/45 hover:bg-[#c9943a]/10 border border-[#c9943a]/30 hover:border-[#c9943a]/65 rounded-xl text-[10px] font-normal text-white tracking-widest uppercase transition-all duration-200 shadow-md">
              Grok
            </button>
          </div>

          {/* Button 3: LLaMA */}
          <div className="relative flex items-center">
            {/* Connector Line Grid */}
            <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
              <div className="h-[0.5px] w-full bg-[#c9943a]/45" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#c9943a] shrink-0" style={{ transform: 'translateX(4px)' }} />
            </div>
            
            <button className="w-full text-center py-1.5 bg-black/45 hover:bg-[#c9943a]/10 border border-[#c9943a]/30 hover:border-[#c9943a]/65 rounded-xl text-[10px] font-normal text-white tracking-widest uppercase transition-all duration-200 shadow-md">
              LLaMA
            </button>
          </div>
        </div>
      </div>

      {/* Footer Vitals */}
      <div className="flex justify-between items-center text-[7.5px] text-white/30 border-t border-white/5 pt-1.5">
        <span>Vortex AI Node · AWS Cluster</span>
        <span className="font-bold text-[#c9943a] tracking-widest uppercase">COCKPIT INTEGRATED</span>
      </div>
    </div>
  )
}
