'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'

const BrainHeroScene = dynamic(
  () => import('@/components/experience/brain-hero-scene').then((m) => m.BrainHeroScene),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5" /> }
)



export function HudNeuro() {
  const [gcs, setGcs] = useState({ eye: 4, verbal: 5, motor: 6 })
  const totalGcs = gcs.eye + gcs.verbal + gcs.motor

  const [activeConnections, setActiveConnections] = useState<Record<string, boolean>>({})
  const [gammaBurst, setGammaBurst] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const gcsRef = useRef(gcs)
  const gammaBurstRef = useRef(gammaBurst)

  useEffect(() => {
    gcsRef.current = gcs
  }, [gcs])

  useEffect(() => {
    gammaBurstRef.current = gammaBurst
  }, [gammaBurst])

  // Play audio popping beep on synapse touch
  const playSynapseSound = (freq: number, duration: number) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const audioCtx = audioCtxRef.current
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
      osc.start()
      osc.stop(audioCtx.currentTime + duration)
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }

  // Trigger synapse pop & EEG gamma burst
  const pulseNode = (nodeName: string, connIds: string[]) => {
    setGammaBurst(120) // 120 frames (~2s) of high frequency burst
    gammaBurstRef.current = 120
    playSynapseSound(1080, 0.06)

    // Flash connected SVG lines
    setActiveConnections((prev) => {
      const next = { ...prev }
      connIds.forEach((id) => {
        next[id] = true
      })
      return next
    })

    // Turn off connection highlights after duration
    setTimeout(() => {
      setActiveConnections((prev) => {
        const next = { ...prev }
        connIds.forEach((id) => {
          delete next[id]
        })
        return next
      })
    }, 1800)
  }

  // Dynamic EEG Wave parameters based on Glasgow Coma Scale
  const getEEGParams = (currentGcs: number) => {
    if (gammaBurstRef.current > 0) {
      return { freq: 0.55, amp: 18, noise: 3.5, color: '#f5e9a0', shadow: 'rgba(212,184,122,0.5)' } // Gamma burst
    }
    if (currentGcs >= 14) {
      return { freq: 0.38, amp: 10, noise: 1.5, color: '#4ade80', shadow: 'rgba(74,222,128,0.4)' } // Beta
    }
    if (currentGcs >= 11) {
      return { freq: 0.22, amp: 13, noise: 2.0, color: '#4ade80', shadow: 'rgba(74,222,128,0.3)' } // Alpha
    }
    if (currentGcs >= 8) {
      return { freq: 0.14, amp: 17, noise: 2.5, color: '#60a5fa', shadow: 'rgba(96,165,250,0.4)' } // Theta
    }
    if (currentGcs >= 4) {
      return { freq: 0.07, amp: 24, noise: 3.0, color: '#f87171', shadow: 'rgba(248,113,113,0.4)' } // Delta
    }
    return { freq: 0, amp: 0.4, noise: 0.5, color: 'rgba(255,255,255,0.25)', shadow: 'rgba(255,255,255,0.1)' } // Isoelectric / Flatline
  }

  const eegLabel =
    totalGcs >= 14
      ? 'Beta (alerta)'
      : totalGcs >= 11
      ? 'Alpha (relaxado)'
      : totalGcs >= 8
      ? 'Theta (sonolento)'
      : totalGcs >= 4
      ? 'Delta (coma profundo)'
      : 'Morte encefálica'

  // Canvas EEG trace loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let w = canvas.width = canvas.parentElement?.clientWidth || 300
    let h = canvas.height = 110

    const handleResize = () => {
      if (!canvas) return
      w = canvas.width = canvas.parentElement?.clientWidth || 300
      h = canvas.height = 110
      points = new Array(w).fill(h / 2)
    }

    window.addEventListener('resize', handleResize)

    let points = new Array(w).fill(h / 2)
    let step = 0

    const draw = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, w, h)

      // Subtle telemetry grid lines
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.04)'
      ctx.lineWidth = 1
      for (let i = 0; i < w; i += 25) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }

      step++

      // Decay active gamma burst ref state
      if (gammaBurstRef.current > 0) {
        gammaBurstRef.current--
        setGammaBurst(gammaBurstRef.current)
      }

      const activeGcs = gcsRef.current.eye + gcsRef.current.verbal + gcsRef.current.motor
      const p = getEEGParams(activeGcs)

      let wave = 0
      if (p.freq > 0) {
        wave = Math.sin(step * p.freq) * p.amp
        wave += Math.sin(step * p.freq * 2.1 + 0.8) * (p.amp * 0.3) // Harmonic wave additions
        wave += (Math.random() - 0.5) * p.noise // High frequency artifacts
      } else {
        wave = (Math.random() - 0.5) * p.noise
      }

      points.shift()
      points.push(h / 2 + wave)

      // Trace line
      ctx.strokeStyle = p.color
      ctx.lineWidth = 2
      ctx.shadowColor = p.shadow
      ctx.shadowBlur = 7
      ctx.beginPath()
      for (let i = 0; i < w; i++) {
        if (i === 0) ctx.moveTo(i, points[i])
        else ctx.lineTo(i, points[i])
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Sweeping lead dot
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(w - 2, points[w - 1], 2.5, 0, Math.PI * 2)
      ctx.fill()

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <style>{`
        .neuro-node { cursor: pointer; transition: all 0.3s ease; }
        .neuro-node:hover { filter: drop-shadow(0 0 8px #4ade80); }
        .neuro-connection { stroke: #4ade80; stroke-width: 1.2px; stroke-dasharray: 4; animation: neuro-dash-crawl 15s linear infinite; }
        .neuro-connection.active { stroke: #fff; stroke-width: 2.2px; stroke-dasharray: 8 4; animation: neuro-dash-crawl 4s linear infinite; filter: drop-shadow(0 0 6px #4ade80); }
        @keyframes neuro-dash-crawl { to { stroke-dashoffset: -100; } }
      `}</style>

      <div className="scanlines z-10" />

      <div className="hero-header relative z-20">
        <div className="live-head text-green-400 flex items-center gap-2">
          <div className="pulse-dot" />
          <span>Monitor EEG Ativo • Synapse Grid</span>
        </div>
        <div className="ch-label">NR-01 • NEURAL ENGINE</div>
      </div>

      <div className="hero-content">
        <div className="hero-visual-pane relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-100 z-0">
            <BrainHeroScene />
          </div>
          <div className="neuro-node-net w-full relative z-10 flex flex-col gap-3 h-full justify-between">
            {/* Synaptic SVG Map */}
            <div className="neuro-map-canvas w-full h-[180px] shrink-0 border border-white/5 rounded-xl bg-black/30 overflow-hidden relative">
              <svg viewBox="0 0 100 100" className="w-full h-full p-4">
                <line
                  id="nc-0"
                  className={`neuro-connection ${activeConnections['nc-0'] ? 'active' : ''}`}
                  x1="20" y1="30" x2="50" y2="20"
                />
                <line
                  id="nc-1"
                  className={`neuro-connection ${activeConnections['nc-1'] ? 'active' : ''}`}
                  x1="50" y1="20" x2="80" y2="40"
                />
                <line
                  id="nc-2"
                  className={`neuro-connection ${activeConnections['nc-2'] ? 'active' : ''}`}
                  x1="20" y1="30" x2="40" y2="60"
                />
                <line
                  id="nc-3"
                  className={`neuro-connection ${activeConnections['nc-3'] ? 'active' : ''}`}
                  x1="40" y1="60" x2="80" y2="40"
                />
                <line
                  id="nc-4"
                  className={`neuro-connection ${activeConnections['nc-4'] ? 'active' : ''}`}
                  x1="40" y1="60" x2="50" y2="85"
                />
                
                <circle
                  className="neuro-node"
                  cx="20" cy="30" r="4.5"
                  fill="#4ade80"
                  onClick={() => pulseNode('Nó 1', ['nc-0', 'nc-2'])}
                />
                <circle
                  className="neuro-node"
                  cx="50" cy="20" r="6"
                  fill="#fff"
                  onClick={() => pulseNode('Córtex', ['nc-0', 'nc-1'])}
                />
                <circle
                  className="neuro-node"
                  cx="80" cy="40" r="5"
                  fill="#4ade80"
                  onClick={() => pulseNode('Hipocampo', ['nc-1', 'nc-3'])}
                />
                <circle
                  className="neuro-node"
                  cx="40" cy="60" r="5.5"
                  fill="#4ade80"
                  onClick={() => pulseNode('Tronco', ['nc-2', 'nc-4'])}
                />
                <circle
                  className="neuro-node"
                  cx="50" cy="85" r="4"
                  fill="#4ade80"
                  onClick={() => pulseNode('Medula', ['nc-4', 'nc-3'])}
                />
              </svg>
              <div className="absolute right-2.5 bottom-2 text-[8px] text-white/35 pointer-events-none uppercase">
                Toque nos nós neurais para simular
              </div>
            </div>

            <div className="flex-1 w-full relative h-[100px] border border-green-500/15 rounded-xl bg-[#040806]/85 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] overflow-hidden shrink-0 flex flex-col justify-between">
              <div className="px-3 pt-2 flex justify-between items-end select-none pointer-events-none">
                <span className="text-[9px] text-green-500/50 uppercase tracking-widest font-semibold font-mono">Monitor EEG</span>
                <span className="font-mono text-[10px] text-green-400 font-bold drop-shadow-[0_0_8px_#4ade80]">
                  EEG • {eegLabel}
                </span>
              </div>
              <div className="w-full h-[60px] relative">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-controls-pane select-none">
          <div>
            <h3 className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Glasgow Coma Scale <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </h3>

            <div className="flex justify-between items-center mb-4 bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <span className="text-[10px] text-white/70">GCS Total</span>
              <span className="font-mono text-xl text-green-400 font-bold drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]">
                {totalGcs}/15
              </span>
            </div>

            {/* Ocular */}
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-[9px] text-white/60 uppercase">Abertura Ocular (O) <b className="text-green-400 ml-1">{gcs.eye}</b>/4</label>
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((v) => (
                  <button
                    key={v}
                    onClick={() => setGcs((p) => ({ ...p, eye: v }))}
                    className={`py-1.5 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                      gcs.eye === v
                        ? 'bg-green-500/20 border-green-500/50 text-green-400 font-bold shadow-[0_0_8px_rgba(74,222,128,0.2)]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Verbal */}
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-[9px] text-white/60 uppercase">Resposta Verbal (V) <b className="text-green-400 ml-1">{gcs.verbal}</b>/5</label>
              <div className="grid grid-cols-5 gap-1">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setGcs((p) => ({ ...p, verbal: v }))}
                    className={`py-1.5 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                      gcs.verbal === v
                        ? 'bg-green-500/20 border-green-500/50 text-green-400 font-bold shadow-[0_0_8px_rgba(74,222,128,0.2)]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Motor */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-white/60 uppercase">Resposta Motora (M) <b className="text-green-400 ml-1">{gcs.motor}</b>/6</label>
              <div className="grid grid-cols-6 gap-1">
                {[1, 2, 3, 4, 5, 6].map((v) => (
                  <button
                    key={v}
                    onClick={() => setGcs((p) => ({ ...p, motor: v }))}
                    className={`py-1.5 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                      gcs.motor === v
                        ? 'bg-green-500/20 border-green-500/50 text-green-400 font-bold shadow-[0_0_8px_rgba(74,222,128,0.2)]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer relative z-20">
        <div className="title-group">
          <div className="area">Sistema Neural</div>
          <h2>Neuro • Glasgow &amp; EEG</h2>
          <p>Manejo adaptativo de neurointensivismo. Ajuste os componentes da Escala de Glasgow (GCS) e veja as ondas do EEG mudarem de Alfa/Beta ativas para Delta lentas. Clique no mapa de sinapses para disparar picos gama.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene text-[#1a120a]" onClick={() => playSynapseSound(600, 0.1)}>
            ✦ Entrar na cena
          </button>
        </div>
      </div>
    </>
  )
}
