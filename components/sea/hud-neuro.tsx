'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'

const BrainHeroScene = dynamic(
  () => import('@/components/experience/brain-hero-scene').then((m) => m.BrainHeroScene),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5" /> }
)

export function MiniNeuro() {
  return (
    <>
      <div className="live-tag neuro">
        <div className="dot" />
        Synaptic Net
      </div>
      <div className="mini-bg-art">
        <Brain size={48} strokeWidth={1} />
      </div>
      <div className="hud-vitals">
        <div><span>GCS:</span><b>15</b></div>
        <div><span>PIC:</span><b>12 mmHg</b></div>
        <div><span>Onda:</span><b>Beta Ativa</b></div>
      </div>
      <div className="title-area">
        <span>Módulo Simulação</span>
        <h2><div className="indicator-box" /> Cérebro</h2>
      </div>
      <div className="badge">NEURO</div>
    </>
  )
}

export function HudNeuro() {
  const [gcs, setGcs] = useState({ eye: 4, verbal: 5, motor: 6 })
  const totalGcs = gcs.eye + gcs.verbal + gcs.motor
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Resize
    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    let animationFrameId: number
    let offset = 0

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      ctx.beginPath()
      ctx.strokeStyle = '#4ade80'
      ctx.lineWidth = 1.5
      
      const pts = 200
      for (let i = 0; i < pts; i++) {
        const x = (i / pts) * w
        
        let freq = 0.05
        let amp = 20
        
        // Adjust wave based on GCS
        if (totalGcs === 3) {
          amp = 1; freq = 0.01 // Flatline
        } else if (totalGcs < 8) {
          amp = 8; freq = 0.02 // Delta
        } else if (totalGcs <= 12) {
          amp = 15; freq = 0.04 // Theta/Alpha
        }
        
        const noise = (Math.random() - 0.5) * (amp * 0.3)
        const y = h / 2 + Math.sin(x * freq + offset) * amp + noise
        
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      
      offset -= 0.1
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [totalGcs])

  return (
    <>
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
        <BrainHeroScene />
      </div>
      <div className="scanlines z-10" />

      <div className="hero-header relative z-20">
        <div className="live-head text-green-400">
          <div className="pulse-dot" />
          <span>Neuro • Synapse Grid</span>
        </div>
        <div className="ch-label">NR-01</div>
      </div>

      <div className="hero-content">
        <div className="hero-visual-pane">
          <div className="neuro-node-net w-full h-full">
            <div className="neuro-map-canvas">
              <svg viewBox="0 0 100 100" className="w-full h-full p-4">
                {/* Fake neural net paths */}
                <path d="M20,50 Q40,20 60,50 T80,30" className="neuro-connection" fill="none" />
                <path d="M20,50 Q40,80 60,50 T80,70" className="neuro-connection" fill="none" />
                <circle cx="20" cy="50" r="4" className="neuro-node fill-green-400" />
                <circle cx="60" cy="50" r="5" className="neuro-node fill-green-400" />
                <circle cx="80" cy="30" r="3" className="neuro-node fill-green-400" />
                <circle cx="80" cy="70" r="4" className="neuro-node fill-green-400" />
              </svg>
            </div>
            
            <div className="flex flex-col gap-2 relative border border-green-500/15 rounded-xl bg-[#040806] overflow-hidden">
              <div className="px-4 pt-3 flex justify-between items-end">
                <span className="text-[10px] text-green-500/70 uppercase tracking-widest font-semibold">Monitor EEG</span>
                <span className="font-mono text-sm text-green-400 font-bold drop-shadow-[0_0_8px_#4ade80]">ONDA {totalGcs > 12 ? 'BETA' : totalGcs > 8 ? 'ALPHA' : totalGcs > 3 ? 'DELTA' : 'ISOELÉTRICA'}</span>
              </div>
              <div className="flex-1 w-full relative">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-controls-pane">
          <div>
            <h3 className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Glasgow Coma Scale <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </h3>

            <div className="flex justify-between items-center mb-5 bg-white/5 border border-white/10 p-3 rounded-xl">
              <span className="text-[11px] text-white/70">Score Total</span>
              <span className="font-mono text-xl text-green-400 font-bold drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]">{totalGcs}</span>
            </div>

            {/* Ocular */}
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-[10px] text-white/60 uppercase">Abertura Ocular (1-4)</label>
              <div className="grid grid-cols-4 gap-1">
                {[1,2,3,4].map(v => (
                  <button key={v} onClick={() => setGcs(p => ({...p, eye: v}))} className={`py-1.5 rounded-lg border text-[11px] font-mono transition-colors ${gcs.eye === v ? 'bg-green-500/20 border-green-500/50 text-green-400 font-bold shadow-[0_0_8px_rgba(74,222,128,0.2)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>{v}</button>
                ))}
              </div>
            </div>

            {/* Verbal */}
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-[10px] text-white/60 uppercase">Resposta Verbal (1-5)</label>
              <div className="grid grid-cols-5 gap-1">
                {[1,2,3,4,5].map(v => (
                  <button key={v} onClick={() => setGcs(p => ({...p, verbal: v}))} className={`py-1.5 rounded-lg border text-[11px] font-mono transition-colors ${gcs.verbal === v ? 'bg-green-500/20 border-green-500/50 text-green-400 font-bold shadow-[0_0_8px_rgba(74,222,128,0.2)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>{v}</button>
                ))}
              </div>
            </div>

            {/* Motor */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-white/60 uppercase">Resposta Motora (1-6)</label>
              <div className="grid grid-cols-6 gap-1">
                {[1,2,3,4,5,6].map(v => (
                  <button key={v} onClick={() => setGcs(p => ({...p, motor: v}))} className={`py-1.5 rounded-lg border text-[11px] font-mono transition-colors ${gcs.motor === v ? 'bg-green-500/20 border-green-500/50 text-green-400 font-bold shadow-[0_0_8px_rgba(74,222,128,0.2)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer relative z-20">
        <div className="title-group">
          <div className="area">Simulação Avançada</div>
          <h2>Cérebro</h2>
          <p>Manejo de neurointensivismo, cálculo de Glasgow e identificação de padrões de EEG em tempo real.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene text-black">
            Entrar na Cena
          </button>
        </div>
      </div>
    </>
  )
}
