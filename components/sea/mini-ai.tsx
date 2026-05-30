'use client'

export function MiniAi() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none" style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}>
      {/* Header */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[10px] font-black text-white tracking-widest uppercase">4) IPB AI ASSISTANT</span>
        <span className="text-[8px] font-mono text-[#d4b87a] uppercase tracking-widest font-bold bg-[#d4b87a]/10 px-1.5 py-0.5 rounded border border-[#d4b87a]/20">Active Engine</span>
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-3 py-2">
        {/* Left Side: Glowing SVG Holographic AI Orb */}
        <div className="w-[50%] h-[80px] flex flex-col justify-center items-center border-r border-white/5 pr-3 relative overflow-hidden">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes pulseOrb3D {
              0%, 100% { 
                transform: scale(1); 
                filter: drop-shadow(0 0 15px rgba(212, 184, 122, 0.45)) drop-shadow(0 0 30px rgba(212, 184, 122, 0.2)); 
                opacity: 0.95;
              }
              50% { 
                transform: scale(1.06); 
                filter: drop-shadow(0 0 25px rgba(212, 184, 122, 0.8)) drop-shadow(0 0 45px rgba(212, 184, 122, 0.4)); 
                opacity: 1;
              }
            }
            @keyframes rotateRingClockwise {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes rotateRingCounter {
              0% { transform: rotate(360deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes pulseWave {
              0% { r: 24px; opacity: 0.7; stroke-width: 1px; }
              50% { r: 36px; opacity: 0.3; stroke-width: 0.8px; }
              100% { r: 46px; opacity: 0; stroke-width: 0.4px; }
            }
            .glow-orb-3d {
              animation: pulseOrb3D 3.5s infinite ease-in-out;
            }
            .rotate-ring-cw {
              animation: rotateRingClockwise 20s linear infinite;
              transform-origin: center;
            }
            .rotate-ring-ccw {
              animation: rotateRingCounter 14s linear infinite;
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
          
          <svg className="w-[60px] h-[60px] glow-orb-3d" viewBox="0 0 100 100">
            <defs>
              {/* Premium holographic 3D gradients */}
              <radialGradient id="goldHoloCore" cx="35%" cy="35%" r="65%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#fff5db" />
                <stop offset="60%" stopColor="#d4b87a" />
                <stop offset="85%" stopColor="#9a7a42" />
                <stop offset="100%" stopColor="#3d2c12" />
              </radialGradient>
              
              <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#9a7a42" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              
              <filter id="hologramGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur1" />
                <feGaussianBlur stdDeviation="2" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient Background Aura */}
            <circle cx="50" cy="50" r="48" fill="url(#ambientGlow)" />

            {/* Pulsing Radar Waves */}
            <circle cx="50" cy="50" r="24" fill="none" stroke="#d4b87a" className="pulse-radar-1" />
            <circle cx="50" cy="50" r="24" fill="none" stroke="#d4b87a" className="pulse-radar-2" />

            {/* Concentric Telemetry Rings */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#d4b87a" strokeWidth="0.75" strokeDasharray="4,8" className="rotate-ring-cw" opacity="0.4" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#d4b87a" strokeWidth="0.5" strokeDasharray="18,12" className="rotate-ring-ccw" opacity="0.3" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#fff" strokeWidth="0.4" strokeDasharray="2,4" className="rotate-ring-cw" opacity="0.2" />

            {/* Volumetric 3D Core Sphere */}
            <circle cx="50" cy="50" r="22" fill="url(#goldHoloCore)" filter="url(#hologramGlow)" />

            {/* Quantum Intelligence Grid Overlays */}
            <g opacity="0.35">
              {/* Rotating inner network coordinates */}
              <line x1="50" y1="28" x2="50" y2="72" stroke="#ffffff" strokeWidth="0.5" className="rotate-ring-cw" />
              <line x1="28" y1="50" x2="72" y2="50" stroke="#ffffff" strokeWidth="0.5" className="rotate-ring-cw" />
              
              {/* Connected node stars */}
              <circle cx="50" cy="34" r="1.5" fill="#ffffff" className="rotate-ring-cw" />
              <circle cx="50" cy="66" r="1.5" fill="#ffffff" className="rotate-ring-cw" />
              <circle cx="34" cy="50" r="1.5" fill="#ffffff" className="rotate-ring-cw" />
              <circle cx="66" cy="50" r="1.5" fill="#ffffff" className="rotate-ring-cw" />
            </g>

            {/* Specular Glare Dot for 3D realism */}
            <circle cx="43" cy="43" r="3.5" fill="#ffffff" opacity="0.7" filter="blur(0.5px)" />
          </svg>
        </div>

        {/* Right Side: Chips/Engines list */}
        <div className="flex-1 flex flex-col justify-center space-y-1.5 pl-1">
          <div className="text-[7.5px] uppercase tracking-widest text-white/40 font-bold leading-none mb-1">Mecanismos de IA</div>
          
          <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-1 rounded-lg text-[8px] text-white/90 font-bold leading-none justify-between hover:border-[#d4b87a]/30 transition-colors">
            <span>Gemini Pro 1.5</span>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-1 rounded-lg text-[8px] text-white/90 font-bold leading-none justify-between hover:border-[#d4b87a]/30 transition-colors">
            <span>Grok 2.0 Ultra</span>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-1 rounded-lg text-[8px] text-white/90 font-bold leading-none justify-between hover:border-[#d4b87a]/30 transition-colors">
            <span>LLaMA 3.1 Instruct</span>
            <div className="h-1.5 w-1.5 rounded-full bg-[#d4b87a] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer Vitals */}
      <div className="flex justify-between items-center text-[7.5px] text-white/30 border-t border-white/5 pt-1.5">
        <span>Vortex AI Node · AWS Cluster</span>
        <span className="font-bold text-[#d4b87a] tracking-widest uppercase">COCKPIT INTEGRATED</span>
      </div>
    </div>
  )
}

