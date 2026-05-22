'use client'

import { useState, useEffect, useRef } from 'react'
import { Wind } from 'lucide-react'
import dynamic from 'next/dynamic'

const PneumoHeroScene = dynamic(
  () => import('@/components/experience/pneumo-hero-scene').then((m) => m.PneumoHeroScene),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5" /> }
)

export function MiniPneumo() {
  return (
    <>
      <div className="live-tag pneumo">
        <div className="dot" />
        <span>Curva P-V · 20 Hz · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <Wind size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>PEEP:</span><b>8 cmH₂O</b></div>
        <div><span>FiO2:</span><b>0.40</b></div>
        <div><span>Pplat:</span><b>22 cmH₂O</b></div>
      </div>
      <div className="title-area">
        <span>Sistema Pulmonar · VM</span>
        <h2><div className="indicator-box" /> Pulmão</h2>
      </div>
      <div className="badge">PEEP 8</div>
    </>
  )
}

export function HudPneumo() {
  const [vol, setVol] = useState(500)
  const [peep, setPeep] = useState(8)
  const [fio2, setFio2] = useState(40)
  const [fr, setFr] = useState(16)
  const [preset, setPreset] = useState('normal')
  const [compliance, setCompliance] = useState(50)
  const [resistance, setResistance] = useState(8)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const lungSvgRef = useRef<SVGSVGElement | null>(null)

  // Sync state values with refs for use in drawing loop
  const volRef = useRef(vol)
  const peepRef = useRef(peep)
  const frRef = useRef(fr)
  const complianceRef = useRef(compliance)
  const resistanceRef = useRef(resistance)

  useEffect(() => {
    volRef.current = vol
    peepRef.current = peep
    frRef.current = fr
    complianceRef.current = compliance
    resistanceRef.current = resistance
  }, [vol, peep, fr, compliance, resistance])

  // Handle pathophysiological compliance/resistance presets
  const changePreset = (val: string) => {
    setPreset(val)
    if (val === 'normal') {
      setCompliance(50)
      setResistance(8)
    } else if (val === 'ards') {
      setCompliance(25)
      setResistance(15)
    } else if (val === 'copd') {
      setCompliance(60)
      setResistance(25)
    }
  }

  // Live calculations (static with respect to time `t`, changes on slider shifts)
  const T_tot = 60 / fr
  const T_insp = T_tot / 3 // 1:2 ratio
  const T_pause = 0.22
  const T_flow = T_insp - T_pause
  const inspFlowLps = (vol / 1000) / T_flow
  const inspFlowLmin = inspFlowLps * 60

  const PIP = peep + (vol / compliance) + (inspFlowLps * resistance)
  const Pplat = peep + (vol / compliance)
  const DP = Pplat - peep
  const mechanicalPower = 0.098 * fr * (vol / 1000) * (PIP - (DP / 2))

  // Waveform renderer canvas loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let w = canvas.width = canvas.parentElement?.clientWidth || 400
    let h = canvas.height = 110

    const handleResize = () => {
      if (!canvas) return
      w = canvas.width = canvas.parentElement?.clientWidth || 400
      h = canvas.height = 110
      pressPoints = new Array(w).fill(55)
      flowPoints = new Array(w).fill(85)
    }

    window.addEventListener('resize', handleResize)

    let pressPoints = new Array(w).fill(55) // Baseline y for pressure trace
    let flowPoints = new Array(w).fill(85)   // Baseline y for flow trace

    const draw = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, w, h)

      // Draw light telemetry grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)'
      ctx.lineWidth = 1
      for (let i = 0; i < w; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for (let j = 0; j < h; j += 20) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
      }

      // Separator dashed center line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 0.75
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(0, 55)
      ctx.lineTo(w, 55)
      ctx.stroke()
      ctx.setLineDash([]) // Clear dash

      // Axis Labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.font = '8px monospace'
      ctx.fillText("PAW", 8, 12)
      ctx.fillText("FLOW", 8, 68)

      // Extract current parameter ref states
      const activeFR = frRef.current
      const activePEEP = peepRef.current
      const activeComp = complianceRef.current
      const activeRes = resistanceRef.current
      const activeVT = volRef.current

      const cT_tot = 60 / activeFR
      const cT_insp = cT_tot / 3
      const cT_pause = 0.22
      const cT_flow = cT_insp - cT_pause

      const t = (Date.now() / 1000) % cT_tot

      let pressValue = activePEEP
      let flowValue = 0
      let lungScale = 1.0

      const cInspFlowLps = (activeVT / 1000) / cT_flow
      const cInspFlowLmin = cInspFlowLps * 60
      const cPplat = activePEEP + (activeVT / activeComp)
      const cPIP = activePEEP + (activeVT / activeComp) + (cInspFlowLps * activeRes)

      if (t < cT_flow) {
        // 1. ACTIVE FLOW INSPIRATION
        const ratio = t / cT_flow
        const currentVol = activeVT * ratio
        pressValue = activePEEP + (currentVol / activeComp) + (cInspFlowLps * activeRes)
        flowValue = cInspFlowLmin
        lungScale = 0.96 + (ratio * 0.14)
      } else if (t < cT_insp) {
        // 2. PLATEAU PAUSE
        pressValue = cPplat
        flowValue = 0
        lungScale = 1.10
      } else {
        // 3. EXPIRATION DECAY
        const t_exp = t - cT_insp
        const tau = (activeRes * activeComp) / 1000
        pressValue = activePEEP + (cPplat - activePEEP) * Math.exp(-t_exp / tau)
        
        const expFlowLps = -((activeVT / 1000) / tau) * Math.exp(-t_exp / tau)
        flowValue = expFlowLps * 60
        if (flowValue < -85) flowValue = -85 // clamp graph range
        
        lungScale = 1.10 - (1.10 - 0.96) * (1 - Math.exp(-t_exp / tau))
      }

      // Append coordinates
      pressPoints.shift()
      // Map pressure (range 0 to 45) to top half y (range 5 to 50)
      const mapPressY = 50 - ((pressValue / 45) * 45)
      pressPoints.push(mapPressY)

      flowPoints.shift()
      // Map flow (range -90 to +90) to bottom half y (range 60 to 105)
      const mapFlowY = 85 - ((flowValue / 90) * 22)
      flowPoints.push(mapFlowY)

      // Draw Pressure Curve (Azure)
      ctx.strokeStyle = '#60a5fa' // var(--azure)
      ctx.lineWidth = 2.0
      ctx.shadowColor = 'rgba(96, 165, 250, 0.35)'
      ctx.shadowBlur = 6
      ctx.beginPath()
      for (let i = 0; i < w; i++) {
        if (i === 0) ctx.moveTo(i, pressPoints[i])
        else ctx.lineTo(i, pressPoints[i])
      }
      ctx.stroke()

      // Draw Flow Curve (Gold)
      ctx.strokeStyle = '#d4b87a' // var(--g-3)
      ctx.lineWidth = 1.75
      ctx.shadowColor = 'rgba(232, 204, 136, 0.35)'
      ctx.shadowBlur = 6
      ctx.beginPath()
      for (let i = 0; i < w; i++) {
        if (i === 0) ctx.moveTo(i, flowPoints[i])
        else ctx.lineTo(i, flowPoints[i])
      }
      ctx.stroke()
      ctx.shadowBlur = 0 // Clear glow

      // Sweep lead heads
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(w - 2, pressPoints[w - 1], 3.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(w - 2, flowPoints[w - 1], 3.5, 0, Math.PI * 2)
      ctx.fill()

      // Perform extremely light-weight DOM updates of SVG scale using Ref
      if (lungSvgRef.current) {
        lungSvgRef.current.style.transform = `scale(${lungScale})`
      }

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
      <div className="scanlines z-10" />

      <div className="hero-header relative z-20">
        <div className="live-head text-blue-400 flex items-center gap-2">
          <div className="pulse-dot" />
          <span>Ventilador Clínico Ativo • Curva P-V</span>
        </div>
        <div className="ch-label">PN-03 • LUNG SIMULATOR</div>
      </div>

      <div className="hero-content">
        <div className="hero-visual-pane relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-100 z-0">
            <PneumoHeroScene transparent />
          </div>
          <div className="pneumo-sim-screen w-full h-full relative z-10 grid grid-rows-[1fr_110px] gap-3">
            <div className="pneumo-lung-box flex items-center justify-center gap-6">
              <svg
                ref={lungSvgRef}
                className="pneumo-lung-svg w-32 h-32 transition-transform duration-75 filter drop-shadow-[0_0_16px_rgba(96,165,250,0.25)]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 20C42 12 25 15 22 28C19 41 26 75 48 80C49 80.5 51 80.5 52 80C74 75 81 41 78 28C75 15 58 12 50 20Z"
                  fill="rgba(96, 165, 250, 0.18)"
                  stroke="#60a5fa"
                  strokeWidth="2"
                />
                <path d="M50 25V80" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
              <div className="text-left select-none">
                <h4 className="margin-0 text-[10px] text-white/45 uppercase font-medium">Volume Corrente (VT)</h4>
                <b className="font-mono text-2xl text-white">
                  {vol} <span className="text-xs text-white/45">ml</span>
                </b>
                <p className="margin-0 mt-1 text-[10px] text-green-400 font-semibold">Modo VCV • Protetor</p>
              </div>
            </div>

            <div className="canvas-graph-container w-full h-[110px] relative rounded-xl border border-white/5 bg-[#000]/50 shrink-0 overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div className="graph-overlay-vals absolute right-3 top-3 text-[9px] font-mono text-white/45 flex flex-col gap-0.5 text-right pointer-events-none">
                <span>Pmax: <b className="text-white">{PIP.toFixed(0)} cmH₂O</b></span>
                <span>Pplat: <b className="text-white">{Pplat.toFixed(0)} cmH₂O</b></span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-controls-pane select-none">
          <div>
            <h3 className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Ajustes do Respirador <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </h3>

            <div className="c-slider-group mb-4">
              <label className="text-[10px] text-white/60">Preset Pulmonar</label>
              <select
                value={preset}
                onChange={(e) => changePreset(e.target.value)}
                className="bg-[#0b0d12] border border-[#d4b87a]/15 text-white rounded-lg p-2 text-[10px] w-full outline-none mt-1 focus:border-[#d4b87a]/45"
              >
                <option value="normal">Pulmão Sadio (Complacência 50)</option>
                <option value="ards">SDRA / SARA (Complacência 25)</option>
                <option value="copd">DPOC / Enfisema (Complacência 60)</option>
              </select>
            </div>

            <div className="c-slider-group mb-4">
              <label>Volume Corrente (VT) <span>{vol} ml</span></label>
              <input
                type="range"
                min="200"
                max="800"
                step="10"
                value={vol}
                onChange={(e) => setVol(Number(e.target.value))}
                className="c-slider-input text-blue-400"
              />
            </div>

            <div className="c-slider-group mb-4">
              <label>PEEP (Pressão Exp) <span>{peep} cmH₂O</span></label>
              <input
                type="range"
                min="0"
                max="20"
                value={peep}
                onChange={(e) => setPeep(Number(e.target.value))}
                className="c-slider-input text-blue-400"
              />
            </div>

            <div className="c-slider-group mb-4">
              <label>FiO₂ (Oxigênio) <span>{fio2}%</span></label>
              <input
                type="range"
                min="21"
                max="100"
                value={fio2}
                onChange={(e) => setFio2(Number(e.target.value))}
                className="c-slider-input text-blue-400"
              />
            </div>

            <div className="c-slider-group">
              <label>Frequência (FR) <span>{fr} irpm</span></label>
              <input
                type="range"
                min="8"
                max="40"
                value={fr}
                onChange={(e) => setFr(Number(e.target.value))}
                className="c-slider-input text-blue-400"
              />
            </div>

            <div className="border-t border-white/5 pt-3 mt-4 flex flex-col gap-1 font-mono text-[10px] text-white/45">
              <div className="flex justify-between"><span>Complacência (C):</span><b className="text-white">{compliance} ml/cmH₂O</b></div>
              <div className="flex justify-between"><span>Driving Press (DP):</span><b className="text-green-400">{DP.toFixed(0)} cmH₂O</b></div>
              <div className="flex justify-between"><span>Power Mecânico:</span><b className="text-[#d4b87a]">{mechanicalPower.toFixed(1)} J/min</b></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer relative z-20">
        <div className="title-group">
          <div className="area">Sistema Pulmonar • VMI</div>
          <h2>Pulmão • Curvas Clínicas</h2>
          <p>Simulador fisiológico respiratório avançado. Altere presets de doenças (como SDRA restritivo ou DPOC obstrutivo) e observe o comportamento dinâmico e o Mechanical Power protetor.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene text-[#1a120a]">
            ✦ Entrar na cena
          </button>
        </div>
      </div>
    </>
  )
}
