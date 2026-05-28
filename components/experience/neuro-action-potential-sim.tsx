'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { 
  Play, 
  Pause, 
  Zap, 
  RotateCcw, 
  ShieldAlert,
  Gauge,
  Activity,
  ZapOff
} from 'lucide-react'

/* ─────────────────────── types ─────────────────────── */

interface IonParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  type: 'na' | 'k'
  radius: number
  state: 'free' | 'rushing' // 'rushing' means flowing through open channels
  channelType?: 'na' | 'k'
  flowProgress: number
}

/* ─────────────────────── constants ─────────────────────── */

const FPS = 35
const FRAME_MS = 1000 / FPS

// colors
const COL_BG = '#07080f'
const COL_MEMBRANE = 'rgba(20, 38, 55, 0.7)'
const COL_MEMBRANE_EDGE = 'rgba(56, 189, 248, 0.35)' // sky-400
const COL_CHANNEL_NA = 'rgba(45, 212, 191, 0.9)' // teal-400
const COL_CHANNEL_K = 'rgba(251, 113, 133, 0.9)' // rose-400
const COL_CHANNEL_CLOSED = 'rgba(71, 85, 105, 0.7)'
const COL_NA = '#f43f5e' // Na+ ions (rose)
const COL_NA_GLOW = 'rgba(244, 63, 94, 0.4)'
const COL_K = '#06b6d4' // K+ ions (cyan)
const COL_K_GLOW = 'rgba(6, 182, 212, 0.4)'
const COL_TEXT = '#f8fafc'
const COL_TEXT_DIM = '#64748b'
const COL_TEAL_ACCENT = '#2dd4bf'

const FONT_MONO = '"SF Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace'

// Voltage curve coordinate constants
const V_MIN = -90
const V_MAX = 50
const T_MIN = 0
const T_MAX = 11

/* ─────────────────────── helpers ─────────────────────── */

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function remap01(v: number, lo: number, hi: number): number {
  if (v <= lo) return 0
  if (v >= hi) return 1
  return (v - lo) / (hi - lo)
}

function drawIon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  glowColor: string,
  label: string,
) {
  ctx.shadowBlur = 12
  ctx.shadowColor = glowColor
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0

  ctx.fillStyle = '#fff'
  ctx.font = `bold ${Math.max(8.5, radius * 0.85)}px ${FONT_MONO}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, x, y + 0.5)
}

export function NeuroActionPotentialSim({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulation interactive parameters in React state
  const [stimulusIntensity, setStimulusIntensity] = useState(60) // 0 to 100%
  const [blockTTX, setBlockTTX] = useState(false) // blocks Na+ channels
  const [blockTEA, setBlockTEA] = useState(false) // blocks K+ channels
  const [isMyelinated, setIsMyelinated] = useState(false) // conduction speed
  const [isPaused, setIsPaused] = useState(false)

  // Real-time telemetry counters
  const [potential, setPotential] = useState(-70) // millivolts
  const [activePhase, setActivePhase] = useState('Repouso')
  const [stimuliCount, setStimuliCount] = useState(0)

  // Internal state refs to feed the rendering loop without react re-triggering overhead
  const stateRef = useRef({
    timeT: 0, // 0..11 ms
    isSweeping: false,
    stimulusIntensity: 60,
    blockTTX: false,
    blockTEA: false,
    isMyelinated: false,
    isPaused: false,
    potential: -70.0,
    voltageHistory: [] as number[],
    particles: [] as IonParticle[],
    particleIdCounter: 1,
    stimuliCount: 0,
    alertMessage: '',
    lastTimestamp: 0,
    flashProgress: 0,
  })

  // Synchronize state values from React controls into loop refs
  useEffect(() => {
    stateRef.current.stimulusIntensity = stimulusIntensity
    stateRef.current.blockTTX = blockTTX
    stateRef.current.blockTEA = blockTEA
    stateRef.current.isMyelinated = isMyelinated
    stateRef.current.isPaused = isPaused
  }, [stimulusIntensity, blockTTX, blockTEA, isMyelinated, isPaused])

  // Restart / Trigger Action Potential
  const triggerStimulus = useCallback(() => {
    if (stateRef.current.isSweeping) return // already sweeping
    stateRef.current.isSweeping = true
    stateRef.current.timeT = 0
    stateRef.current.stimuliCount += 1
    setStimuliCount(stateRef.current.stimuliCount)
  }, [])

  // Auto-trigger a sweep 800ms after mounting so the simulation feels alive immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerStimulus()
    }, 800)
    return () => clearTimeout(timer)
  }, [triggerStimulus])

  const handleResetCounters = () => {
    setPotential(-70)
    setActivePhase('Repouso')
    setStimuliCount(0)
    stateRef.current.potential = -70.0
    stateRef.current.timeT = 0
    stateRef.current.isSweeping = false
    stateRef.current.stimuliCount = 0
    stateRef.current.voltageHistory = []
  }



  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0
    const state = stateRef.current

    // Render loop
    const render = (timestamp: number) => {
      if (state.lastTimestamp === 0) state.lastTimestamp = timestamp
      const elapsed = timestamp - state.lastTimestamp

      if (elapsed < FRAME_MS) {
        rafId = requestAnimationFrame(render)
        return
      }
      state.lastTimestamp = timestamp

      // Dynamic High-DPI canvas sizing
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const displayW = Math.floor(rect.width) || 300
      const displayH = Math.floor(rect.height) || 150

      if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
        canvas.width = displayW * dpr
        canvas.height = displayH * dpr
        ctx.scale(dpr, dpr)
      }

      const w = displayW
      const h = displayH

      // Layout split coordinates
      const simH = Math.max(140, h * 0.44) // top simulation part height
      const graphY = simH + 10 // top coordinates of bottom graph
      const graphH = h - graphY - 10

      const memY = simH * 0.5
      const memH = Math.max(48, simH * 0.28)
      const cx = w * 0.5
      const channelW = Math.max(42, w * 0.08)
      const channelH = memH + 18
      const ionR = Math.max(6.5, Math.min(9.5, w * 0.016))

      // Coordinates for Na+ channel (left of center) and K+ channel (right of center)
      const naChannelX = cx - channelW * 1.1
      const kChannelX = cx + channelW * 1.1

      /* ── Update Physics and States (if not paused) ── */
      let alertMsg = ''
      if (state.blockTTX) {
        alertMsg = 'BLOQUEIO DE Na⁺: INTOXICAÇÃO POR TTX (PARALISIA)'
      } else if (state.blockTEA) {
        alertMsg = 'FALHA DE REPOLARIZAÇÃO: BLOQUEIO DE K⁺ POR TEA'
      }
      state.alertMessage = alertMsg

      // 1. Action Potential Sweep Physics
      if (state.isSweeping && !state.isPaused) {
        // Conduction speed depends on myelination
        const timeStep = state.isMyelinated ? 0.28 : 0.085
        state.timeT += timeStep

        if (state.timeT >= T_MAX) {
          state.timeT = T_MAX
          state.isSweeping = false
        }

        const t = state.timeT
        let targetPotential = -70.0
        let phaseLabel = 'Repouso'

        // Classification of waveform mathematical phases
        if (t <= 2) {
          targetPotential = -70
          phaseLabel = 'Repouso'
        } else if (t <= 3) {
          const p = (t - 2) / 1.0
          const limVal = state.stimulusIntensity < 30 ? -62 : -55
          targetPotential = lerp(-70, limVal, p)
          phaseLabel = 'Estímulo'
        } else if (t <= 4) {
          const p = (t - 3) / 1.0
          const s = easeInOut(p)
          if (state.stimulusIntensity < 30) {
            targetPotential = lerp(-62, -70, s)
            phaseLabel = 'Estímulo Sub-Limiar'
            if (t >= 3.8) {
              state.isSweeping = false
              state.timeT = 0
            }
          } else if (state.blockTTX) {
            targetPotential = lerp(-55, -70, s)
            phaseLabel = 'Bloqueio (TTX)'
          } else {
            targetPotential = lerp(-55, 40, s)
            phaseLabel = 'Despolarização'
          }
        } else if (t <= 4.3) {
          targetPotential = 40
          phaseLabel = 'Pico de Potencial'
        } else if (t <= 7) {
          const p = (t - 4.3) / 2.7
          const s = easeInOut(p)
          if (state.blockTEA) {
            targetPotential = lerp(40, 20, s)
            phaseLabel = 'Bloqueio de Repolarização (TEA)'
          } else {
            targetPotential = lerp(40, -80, s)
            phaseLabel = 'Repolarização'
          }
        } else if (t <= 8.5) {
          targetPotential = state.blockTEA ? lerp(20, -70, (t - 7) / 1.5) : -80
          phaseLabel = state.blockTEA ? 'Decaimento Retardado' : 'Hiperpolarização'
        } else {
          const p = (t - 8.5) / 2.5
          targetPotential = lerp(-80, -70, p)
          phaseLabel = 'Retorno ao Repouso'
        }

        state.potential = targetPotential
        setActivePhase(phaseLabel)
      }

      // Record voltage telemetry history continuously
      if (timestamp % 20 < 1) {
        state.voltageHistory.push(state.potential)
        if (state.voltageHistory.length > 250) {
          state.voltageHistory.shift()
        }
      }

      // Sync state variables back to React periodically
      if (timestamp % 150 < 1) {
        setPotential(Number(state.potential.toFixed(1)))
      }

      /* ── DRAWING CANVAS ── */
      ctx.clearRect(0, 0, w, h)

      // background
      ctx.fillStyle = COL_BG
      ctx.fillRect(0, 0, w, h)

      // sci-fi grid patterns
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)'
      ctx.lineWidth = 1
      const gSize = 25
      ctx.beginPath()
      for (let lx = 0; lx < w; lx += gSize) {
        ctx.moveTo(lx, 0)
        ctx.lineTo(lx, h)
      }
      for (let ly = 0; ly < h; ly += gSize) {
        ctx.moveTo(0, ly)
        ctx.lineTo(w, ly)
      }
      ctx.stroke()

      // ── DRAW INTERACTIVE NERVE AXON PROPAGATION ──
      const axonY = memY
      const axonH = 20
      const startX = 30
      const endX = w - 30
      const axonW = endX - startX

      // Draw Axon tube
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)'
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.roundRect(startX, axonY - axonH / 2, axonW, axonH, 6)
      ctx.fill()
      ctx.stroke()

      // Draw myelin sheaths if myelinated
      if (state.isMyelinated) {
        const numBlocks = 4
        const blockW = (axonW - 30) / numBlocks
        ctx.fillStyle = 'rgba(45, 212, 191, 0.15)'
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.4)'
        ctx.lineWidth = 1
        for (let i = 0; i < numBlocks; i++) {
          const bx = startX + 5 + i * (blockW + 8)
          ctx.beginPath()
          ctx.roundRect(bx, axonY - axonH / 2 - 4, blockW, axonH + 8, 4)
          ctx.fill()
          ctx.stroke()
        }
      }

      // Draw Charge Indicators (+ and - signs) above and below membrane
      ctx.font = `bold 8px ${FONT_MONO}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const numCharges = 15
      const pulseProgress = state.isSweeping ? remap01(state.timeT, 0, 11) : 0
      const pulseX = startX + pulseProgress * axonW

      for (let i = 0; i < numCharges; i++) {
        const cxVal = startX + (i / (numCharges - 1)) * axonW
        const dist = Math.abs(cxVal - pulseX)

        let isDepolarized = state.isSweeping && (cxVal <= pulseX) && (dist < 40)

        // Above membrane (extracellular)
        ctx.fillStyle = isDepolarized ? '#f43f5e' : '#38bdf8' // red (-) if active, blue (+) if normal/rest
        ctx.fillText(isDepolarized ? '−' : '+', cxVal, axonY - axonH / 2 - 8)

        // Below membrane (intracellular)
        ctx.fillStyle = isDepolarized ? '#38bdf8' : '#f43f5e' // blue (+) if active, red (-) if normal/rest
        ctx.fillText(isDepolarized ? '+' : '−', cxVal, axonY + axonH / 2 + 8)
      }

      // Draw Traveling Action Potential Wave (Glowing Energy Pulse)
      if (state.isSweeping) {
        // Draw glow back-halo
        const grad = ctx.createRadialGradient(pulseX, axonY, 0, pulseX, axonY, 30)
        grad.addColorStop(0, 'rgba(45, 212, 191, 0.4)')
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(pulseX - 30, axonY - 30, 60, 60)

        // Wave front vertical marker
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.7)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(pulseX, axonY - 15)
        ctx.lineTo(pulseX, axonY + 15)
        ctx.stroke()

        // Tiny floating particles representing ions flowing
        ctx.fillStyle = COL_TEAL_ACCENT
        for (let pIdx = 0; pIdx < 8; pIdx++) {
          const px = pulseX + Math.sin(timestamp * 0.01 + pIdx) * 12
          const py = axonY + Math.cos(timestamp * 0.02 + pIdx) * 6
          ctx.beginPath()
          ctx.arc(px, py, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw axon labels
      ctx.fillStyle = COL_TEXT_DIM
      ctx.font = `8px ${FONT_MONO}`
      ctx.textAlign = 'left'
      ctx.fillText('BAINHA DE MIELINA' + (state.isMyelinated ? ' (ATIVA)' : ' (AUSENTE)'), startX, axonY - axonH / 2 - 18)
      ctx.textAlign = 'right'
      ctx.fillText('IMPULSO NERVOSO (PROPAGAÇÃO)', endX, axonY - axonH / 2 - 18)

      // ── DRAW OSCILLOSCOPE GRAPH ──
      // Background grid
      ctx.fillStyle = 'rgba(7, 10, 20, 0.8)'
      ctx.beginPath()
      ctx.roundRect(16, graphY, w - 32, graphH, 10)
      ctx.fill()
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)'
      ctx.stroke()

      // Graph coordinates conversion helpers
      const graphPadL = 52
      const graphPadR = 25
      const graphPadT = 24
      const graphPadB = 28
      const gW = w - 32 - graphPadL - graphPadR
      const gH = graphH - graphPadT - graphPadB

      const mapGX = (tVal: number): number => {
        return 16 + graphPadL + ((tVal - T_MIN) / (T_MAX - T_MIN)) * gW
      }
      const mapGY = (vVal: number): number => {
        return graphY + graphPadT + ((V_MAX - vVal) / (V_MAX - V_MIN)) * gH
      }

      // Draw Voltage Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      const gVoltages = [-80, -70, -55, 0, 40]
      const gLabels: Record<number, string> = {
        [-80]: '-80 (Hiper)',
        [-70]: '-70 (Repouso)',
        [-55]: '-55 (Limiar)',
        [0]: '0',
        [40]: '+40 (Pico)'
      }

      gVoltages.forEach(gv => {
        const gy = mapGY(gv)
        ctx.beginPath()
        ctx.moveTo(16 + graphPadL, gy)
        ctx.lineTo(w - 16 - graphPadR, gy)
        ctx.stroke()

        // text labels
        ctx.fillStyle = gv === -55 ? COL_TEAL_ACCENT : (gv === -70 ? 'rgba(255,255,255,0.7)' : COL_TEXT_DIM)
        ctx.font = `${gv === -55 || gv === -70 ? 'bold' : ''} 8.5px ${FONT_MONO}`
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(gLabels[gv], 16 + graphPadL - 8, gy)
      })

      // Draw mathematical potential wave
      const fullCurve = []
      const samples = 220
      for (let i = 0; i <= samples; i++) {
        const frac = i / samples
        const tVal = frac * T_MAX
        let vVal = -70.0

        if (tVal <= 2) {
          vVal = -70
        } else if (tVal <= 3) {
          const p = (tVal - 2) / 1.0
          const lim = state.stimulusIntensity < 30 ? -62 : -55
          vVal = lerp(-70, lim, p)
        } else if (tVal <= 4) {
          const p = (tVal - 3) / 1.0
          const s = easeInOut(p)
          if (state.stimulusIntensity < 30) {
            vVal = lerp(-62, -70, s)
          } else if (state.blockTTX) {
            vVal = lerp(-55, -70, s)
          } else {
            vVal = lerp(-55, 40, s)
          }
        } else if (tVal <= 4.3) {
          vVal = 40
        } else if (tVal <= 7) {
          const p = (tVal - 4.3) / 2.7
          const s = easeInOut(p)
          if (state.blockTEA) {
            vVal = lerp(40, 20, s)
          } else {
            vVal = lerp(40, -80, s)
          }
        } else if (tVal <= 8.5) {
          vVal = state.blockTEA ? lerp(20, -70, (tVal - 7) / 1.5) : -80
        } else {
          const p = (tVal - 8.5) / 2.5
          vVal = lerp(-80, -70, p)
        }

        fullCurve.push({ t: tVal, v: vVal })
      }

      // Draw the static outline of expected path
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      fullCurve.forEach((pt, idx) => {
        const px = mapGX(pt.t)
        const py = mapGY(pt.v)
        if (idx === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      })
      ctx.stroke()

      // Draw the current swept path
      if (state.isSweeping && state.timeT > 0) {
        ctx.strokeStyle = COL_TEAL_ACCENT
        ctx.shadowColor = COL_TEAL_ACCENT
        ctx.shadowBlur = 8
        ctx.lineWidth = 2.5
        ctx.beginPath()
        let count = 0
        fullCurve.forEach((pt, idx) => {
          if (pt.t <= state.timeT) {
            const px = mapGX(pt.t)
            const py = mapGY(pt.v)
            if (idx === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
            count++
          }
        })
        if (count > 1) ctx.stroke()
        ctx.shadowBlur = 0

        // Sweeper Moving Dot
        const currentY = mapGY(state.potential)
        const currentX = mapGX(state.timeT)
        ctx.fillStyle = COL_TEAL_ACCENT
        ctx.shadowColor = COL_TEAL_ACCENT
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(currentX, currentY, 4.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // vertical time sweep line
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.25)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(currentX, graphY + graphPadT)
        ctx.lineTo(currentX, graphY + graphH - graphPadB)
        ctx.stroke()
      }

      // Time axis ticks
      ctx.fillStyle = COL_TEXT_DIM
      ctx.font = `8px ${FONT_MONO}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      for (let tx = 0; tx <= 11; tx += 1) {
        const gx = mapGX(tx)
        ctx.fillText(`${tx}`, gx, graphY + graphH - graphPadB + 6)
      }
      ctx.fillText('Tempo (ms)', 16 + graphPadL + gW / 2, graphY + graphH - graphPadB + 16)

      // HUD Telemetry status display
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.font = `bold 12px ${FONT_MONO}`
      ctx.fillStyle = state.alertMessage ? '#ef4444' : COL_TEAL_ACCENT
      
      const statusIcon = state.alertMessage ? '⚠️' : '⚡'
      ctx.fillText(`${statusIcon} TELEMETRIA: ${state.alertMessage || activePhase.toUpperCase()}`, 16, 16)

      ctx.fillStyle = COL_TEXT_DIM
      ctx.font = `9.5px ${FONT_MONO}`
      ctx.fillText(`POTENCIAL TRANSELETRÔNICO: ${state.potential.toFixed(1)} mV`, 16, 29)

      // Sci-fi Telemetry Panel on the right (top-right)
      ctx.textAlign = 'right'
      ctx.textBaseline = 'top'
      ctx.font = `bold 8.5px ${FONT_MONO}`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.fillText('METRICAS DE FLUXO', w - 16, 16)

      ctx.fillStyle = COL_TEXT
      ctx.font = `9px ${FONT_MONO}`
      ctx.fillText(`ESTIMULOS: ${state.stimuliCount}`, w - 16, 28)
      ctx.fillText(`POTENCIAL: ${state.potential.toFixed(1)} mV`, w - 16, 40)
      ctx.fillStyle = state.isMyelinated ? '#38bdf8' : COL_TEXT_DIM
      ctx.fillText(`FIBRA: ${state.isMyelinated ? 'MIELINIZADA' : 'CONTÍNUA'}`, w - 16, 52)
      ctx.fillStyle = '#fbbf24'
      ctx.fillText(`LIMIAR: -55 mV`, w - 16, 64)

      // warning alerts overlay inside simulation box
      if (state.alertMessage) {
        ctx.save()
        ctx.fillStyle = 'rgba(239, 68, 68, 0.05)'
        ctx.fillRect(0, 0, w, simH)
        ctx.restore()
      }

      // stoichiometry bottom label
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.font = `10.5px ${FONT_MONO}`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
      ctx.fillText('Limiar: -55mV (Tudo-ou-Nada) | TTX: Bloqueia Na⁺ | TEA: Bloqueia K⁺', cx, simH - 12)

      /* ── Loop frame ── */
      rafId = requestAnimationFrame(render)
    }

    // Start loop
    state.lastTimestamp = performance.now()
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className={`flex flex-col lg:flex-row gap-4 h-full w-full min-h-0 ${className}`}>
      
      {/* ── Left main simulation screen ── */}
      <div className="relative flex-1 min-h-[220px] rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl flex flex-col justify-end">
        <canvas
          ref={canvasRef}
          onClick={triggerStimulus}
          onTouchStart={triggerStimulus}
          style={{ width: '100%', height: '100%', display: 'block', cursor: 'pointer', touchAction: 'manipulation' }}
          className="absolute inset-0"
        />

        {/* Warning panel overlay */}
        {stateRef.current.alertMessage && (
          <div className="absolute inset-0 bg-red-950/10 border border-red-500/10 pointer-events-none flex flex-col items-center justify-center p-4 backdrop-blur-[0.5px]">
            <div className="bg-black/90 border border-red-500/30 rounded-xl p-5 flex flex-col items-center max-w-[280px] shadow-[0_12px_30px_rgba(239,68,68,0.15)] animate-pulse pointer-events-auto">
              <ShieldAlert className="h-10 w-10 text-red-500 mb-2.5" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-black text-red-500 mb-1">Canais Bloqueados</span>
              <p className="text-[9px] font-mono text-white/70 text-center leading-normal">
                {stateRef.current.alertMessage}
              </p>
              <span className="text-[8px] text-white/30 font-mono mt-3 uppercase tracking-wider">Desmarque as toxinas ao lado</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Right control board (NASA-style) ── */}
      <div className="w-full lg:w-80 flex flex-col gap-4 p-4 rounded-2xl bg-black/50 border border-white/5 backdrop-blur-xl shrink-0 overflow-y-auto max-h-full">
        <div className="border-b border-white/[0.06] pb-2.5">
          <span className="text-[8px] uppercase tracking-[0.2em] font-black text-teal-400 block mb-0.5">CONTROLES DA UNIDADE</span>
          <h4 className="text-[12.5px] font-bold text-white/90 font-sans tracking-wide">Potencial de Ação 6D</h4>
        </div>



        {/* Dynamic Controls Sliders */}
        <div className="space-y-4 flex-1">
          {/* Stimulus intensity slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-amber-400" /> INTENSIDADE DO ESTÍMULO</span>
              <span className={`font-bold ${stimulusIntensity < 30 ? 'text-red-400' : 'text-amber-400'}`}>
                {stimulusIntensity}%
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={stimulusIntensity} 
              onChange={(e) => setStimulusIntensity(Number(e.target.value))}
              className="w-full accent-amber-400 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-[7.5px] font-mono text-white/30 block leading-tight">
              Abaixo de 30%, o potencial falha em cruzar o limiar (-55mV), demonstrando a Lei do Tudo-ou-Nada.
            </span>
          </div>

          {/* TTX channel blocker toggle */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-white/80 font-bold uppercase tracking-wider">Bloquear Na⁺ (TTX)</span>
              <span className="text-[7.5px] font-mono text-[#d4b87a] tracking-wide">Tetrodotoxina Ativa</span>
            </div>
            <button
              onClick={() => setBlockTTX(!blockTTX)}
              className={`px-3 py-1.5 text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                blockTTX 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)]' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white/80'
              }`}
            >
              {blockTTX ? 'Bloqueado' : 'Liberado'}
            </button>
          </div>

          {/* TEA channel blocker toggle */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-white/80 font-bold uppercase tracking-wider">Bloquear K⁺ (TEA)</span>
              <span className="text-[7.5px] font-mono text-[#d4b87a] tracking-wide">Tetraetilamônio Ativo</span>
            </div>
            <button
              onClick={() => setBlockTEA(!blockTEA)}
              className={`px-3 py-1.5 text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                blockTEA 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)]' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white/80'
              }`}
            >
              {blockTEA ? 'Bloqueado' : 'Liberado'}
            </button>
          </div>

          {/* Conduction speed / Myelination toggle */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-white/80 font-bold uppercase tracking-wider">Fibra Mielinizada</span>
              <span className="text-[7.5px] font-mono text-sky-400 tracking-wide">Condução Saltatória Rápida</span>
            </div>
            <button
              onClick={() => setIsMyelinated(!isMyelinated)}
              className={`px-3 py-1.5 text-[8.5px] font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                isMyelinated 
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.15)]' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white/80'
              }`}
            >
              {isMyelinated ? 'Mielinizada' : 'Contínua'}
            </button>
          </div>
        </div>

        {/* Bottom Switch Trigger Button */}
        <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono text-white/30 uppercase">Operação</span>
            <span className="text-[10px] font-mono text-white/70 font-semibold">{isPaused ? 'Espera' : 'Ativa'}</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <button 
              onClick={handleResetCounters}
              className="px-2.5 py-1.5 text-[8.5px] uppercase font-mono tracking-wider text-white/50 border border-white/10 hover:border-white/20 hover:text-white rounded-lg transition-all cursor-pointer"
            >
              Reset
            </button>
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`px-4 py-2 text-[10px] uppercase font-mono tracking-wider font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                isPaused 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              {isPaused ? <Play className="h-3 w-3 fill-emerald-400" /> : <Pause className="h-3 w-3 fill-amber-400" />}
              {isPaused ? 'Ligar' : 'Pausar'}
            </button>
            <button 
              onClick={triggerStimulus}
              className={`px-4 py-2 text-[10px] uppercase font-mono tracking-wider font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer bg-teal-500/10 border-teal-500/30 text-teal-400 hover:bg-teal-500/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]`}
            >
              <Zap className="h-3.5 w-3.5 fill-teal-400" />
              Estímulo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
