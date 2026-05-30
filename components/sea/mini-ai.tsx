'use client'

export function MiniAi() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 select-none">
      {/* Header */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <span className="text-[10px] font-black text-white tracking-widest uppercase">4) IPB AI ASSISTANT</span>
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest font-bold">Assistente</span>
      </div>

      {/* Body: 2 Columns */}
      <div className="flex-1 flex items-center gap-3 py-2">
        {/* Left Side: Glowing SVG Holographic AI Orb */}
        <div className="w-[50%] h-[75px] flex flex-col justify-center items-center border-r border-white/5 pr-3 relative overflow-hidden">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes pulseOrb {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(212, 184, 122, 0.4)); opacity: 0.8; }
              50% { transform: scale(1.08); filter: drop-shadow(0 0 25px rgba(212, 184, 122, 0.7)); opacity: 1; }
            }
            @keyframes rotateOrb {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .glow-orb {
              animation: pulseOrb 4s infinite ease-in-out;
            }
            .rotate-ring {
              animation: rotateOrb 15s linear infinite;
              transform-origin: center;
            }
          `}} />
          
          <svg className="w-[45px] h-[45px] glow-orb" viewBox="0 0 100 100">
            {/* Outer Rotating Ring */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="#d4b87a" strokeWidth="1" strokeDasharray="6,4" className="rotate-ring" opacity="0.35" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#d4b87a" strokeWidth="0.8" strokeDasharray="15,10" className="rotate-ring" style={{ animationDirection: 'reverse' }} opacity="0.25" />
            
            {/* Holographic Glowing Sphere Gradient */}
            <defs>
              <radialGradient id="aiOrbGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="30%" stopColor="#fbe9b8" />
                <stop offset="70%" stopColor="#d4b87a" />
                <stop offset="100%" stopColor="#675530" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Core Orb */}
            <circle cx="50" cy="50" r="28" fill="url(#aiOrbGrad)" filter="url(#glow)" opacity="0.9" />
            
            {/* Text overlay "AI" */}
            <text x="50" y="55" fill="#000" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="1">AI</text>
          </svg>
        </div>

        {/* Right Side: Chips/Engines list */}
        <div className="flex-1 flex flex-col justify-center space-y-1 pl-1.5 font-mono">
          <div className="text-[7.5px] uppercase tracking-wider text-white/35 font-bold leading-none font-sans mb-1">Modelos Integrados</div>
          
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[8px] text-white/80 font-bold leading-none justify-between">
            <span>Gemini 3.5</span>
            <div className="h-1 w-1 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[8px] text-white/80 font-bold leading-none justify-between">
            <span>Grok 4.3</span>
            <div className="h-1 w-1 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[8px] text-white/80 font-bold leading-none justify-between">
            <span>LLaMA 3.3</span>
            <div className="h-1 w-1 rounded-full bg-[#d4b87a]" />
          </div>
        </div>
      </div>

      {/* Footer Vitals */}
      <div className="flex justify-between items-center text-[7.5px] text-white/20 border-t border-white/5 pt-1">
        <span>Groq · Vertex AI Cloud</span>
        <span className="font-bold text-[#d4b87a]/60 font-mono">MODEL GARDEN</span>
      </div>
    </div>
  )
}
