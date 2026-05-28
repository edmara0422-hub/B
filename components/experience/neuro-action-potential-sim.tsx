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

  // Draw membrane lipids wiggling (Brownian motion)
  const drawMembraneLipids = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, memY: number, memH: number, time: number, cx: number, pumpW: number) => {
      // Bilayer base
      ctx.fillStyle = COL_MEMBRANE
      ctx.fillRect(0, memY - memH / 2, w, memH)

      ctx.strokeStyle = COL_MEMBRANE_EDGE
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, memY - memH / 2)
      ctx.lineTo(w, memY - memH / 2)
      ctx.moveTo(0, memY + memH / 2)
      ctx.lineTo(w, memY + memH / 2)
      ctx.stroke()

      // wiggling phospholipids head and tails (premium detailed graphics)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)'
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)'
      ctx.lineWidth = 1
      
      const spacing = 14
      for (let x = spacing / 2; x < w; x += spacing) {
        // Skip channel zones (Na+ channel on left-center, K+ channel on right-center)
        if (x > cx - pumpW * 1.5 && x < cx + pumpW * 1.5) continue

        const headWobble = Math.sin(time * 0.004 + x * 0.05) * 2

        // Top heads
        const topY = memY - memH / 2 + 4
        ctx.beginPath()
        ctx.arc(x, topY, 3, 0, Math.PI * 2)
        ctx.fill()

        // Top tails
        ctx.beginPath()
        ctx.moveTo(x, topY + 3)
        ctx.quadraticCurveTo(x - 2 + headWobble, topY + 12, x + headWobble, topY + 20)
        ctx.moveTo(x, topY + 3)
        ctx.quadraticCurveTo(x + 2 - headWobble, topY + 10, x - 1 - headWobble, topY + 20)
        ctx.stroke()

        // Bottom heads
        const botY = memY + memH / 2 - 4
        ctx.beginPath()
        ctx.arc(x, botY, 3, 0, Math.PI * 2)
        ctx.fill()

        // Bottom tails
        ctx.beginPath()
        ctx.moveTo(x, botY - 3)
        ctx.quadraticCurveTo(x + 2 - headWobble, botY - 12, x - headWobble, botY - 20)
        ctx.moveTo(x, botY - 3)
        ctx.quadraticCurveTo(x - 2 + headWobble, botY - 10, x + 1 + headWobble, botY - 20)
        ctx.stroke()
      }
    },
    [],
  )

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

      // 1. Particle spawning and kinetics
      if (!state.isPaused) {
        // Adjust particle density based on default constants
        const targetNaCount = 28
        const targetKCount = 20
        
        const currentNa = state.particles.filter(p => p.type === 'na' && p.state === 'free')
        const currentK = state.particles.filter(p => p.type === 'k' && p.state === 'free')

        // Spawn missing Na+ outside (top area)
        if (currentNa.length < targetNaCount) {
          state.particles.push({
            id: state.particleIdCounter++,
            x: Math.random() * w,
            y: Math.random() * (memY - memH / 2 - 8),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.2,
            type: 'na',
            radius: ionR,
            state: 'free',
            flowProgress: 0
          })
        }

        // Spawn missing K+ inside (bottom area)
        if (currentK.length < targetKCount) {
          state.particles.push({
            id: state.particleIdCounter++,
            x: Math.random() * w,
            y: memY + memH / 2 + 8 + Math.random() * (simH - (memY + memH / 2 + 8)),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.2,
            type: 'k',
            radius: ionR,
            state: 'free',
            flowProgress: 0
          })
        }

        // Kinetic motion step
        state.particles.forEach(p => {
          if (p.state === 'free') {
            p.x += p.vx
            p.y += p.vy

            // Canvas boundaries
            if (p.x < p.radius) { p.x = p.radius; p.vx *= -1 }
            if (p.x > w - p.radius) { p.x = w - p.radius; p.vx *= -1 }
            if (p.y < p.radius) { p.y = p.radius; p.vy *= -1 }
            if (p.y > simH - p.radius) { p.y = simH - p.radius; p.vy *= -1 }

            // Membrane boundaries (bounce unless they are inside open channel tunnels)
            const topBoundary = memY - memH / 2
            const bottomBoundary = memY + memH / 2

            // Na+ channel bounds
            const inNaTunnel = p.x > naChannelX - channelW * 0.4 && p.x < naChannelX + channelW * 0.4
            // K+ channel bounds
            const inKTunnel = p.x > kChannelX - channelW * 0.4 && p.x < kChannelX + channelW * 0.4

            if (p.y > topBoundary - p.radius && p.y < bottomBoundary + p.radius) {
              if (inNaTunnel || inKTunnel) {
                // let it drift through or get swept by channel state
              } else {
                // Bounce off membrane
                if (p.y - p.vy <= topBoundary - p.radius) {
                  p.y = topBoundary - p.radius
                  p.vy = -Math.abs(p.vy)
                } else if (p.y - p.vy >= bottomBoundary + p.radius) {
                  p.y = bottomBoundary + p.radius
                  p.vy = Math.abs(p.vy)
                } else {
                  p.vx *= -1
                }
              }
            }
          }
        })

        // 2. Action Potential Sweep Physics
        if (state.isSweeping) {
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
            // Resting phase
            targetPotential = -70
            phaseLabel = 'Repouso'
          } else if (t <= 3) {
            // Stimulus build-up
            const p = (t - 2) / 1.0
            const limVal = state.stimulusIntensity < 30 ? -62 : -55
            targetPotential = lerp(-70, limVal, p)
            phaseLabel = 'Estímulo'
          } else if (t <= 4) {
            // Depolarization (threshold logic)
            const p = (t - 3) / 1.0
            const s = easeInOut(p)
            if (state.stimulusIntensity < 30) {
              // Fail to trigger Action Potential (All-or-Nothing Law)
              targetPotential = lerp(-62, -70, s)
              phaseLabel = 'Estímulo Sub-Limiar'
              if (t >= 3.8) {
                state.isSweeping = false
                state.timeT = 0
              }
            } else if (state.blockTTX) {
              // Blocked by TTX
              targetPotential = lerp(-55, -70, s)
              phaseLabel = 'Bloqueio (TTX)'
            } else {
              targetPotential = lerp(-55, 40, s)
              phaseLabel = 'Despolarização'
            }
          } else if (t <= 4.3) {
            // Peak voltage
            targetPotential = 40
            phaseLabel = 'Pico de Potencial'
          } else if (t <= 7) {
            // Repolarization
            const p = (t - 4.3) / 2.7
            const s = easeInOut(p)
            if (state.blockTEA) {
              // Fail to repolarize correctly due to TEA blocker (plateau)
              targetPotential = lerp(40, 20, s)
              phaseLabel = 'Bloqueio de Repolarização (TEA)'
            } else {
              targetPotential = lerp(40, -80, s)
              phaseLabel = 'Repolarização'
            }
          } else if (t <= 8.5) {
            // Hyperpolarization hold
            targetPotential = state.blockTEA ? lerp(20, -70, (t - 7) / 1.5) : -80
            phaseLabel = state.blockTEA ? 'Decaimento Retardado' : 'Hiperpolarização'
          } else {
            // Return to rest
            const p = (t - 8.5) / 2.5
            targetPotential = lerp(-80, -70, p)
            phaseLabel = 'Retorno ao Repouso'
          }

          state.potential = targetPotential
          setActivePhase(phaseLabel)

          // 3. Ion flux animations through channels during active phases
          const naChannelOpen = t > 3 && t <= 4.3 && !state.blockTTX
          const kChannelOpen = t > 4.3 && t <= 7 && !state.blockTEA

          // Inward Na+ rush during depolarization
          if (naChannelOpen && Math.random() < 0.4) {
            // Pull free Na+ particles from top into the channel
            const candidate = state.particles.find(p => p.type === 'na' && p.state === 'free' && p.y < memY - 6)
            if (candidate) {
              candidate.state = 'rushing'
              candidate.channelType = 'na'
              candidate.flowProgress = 0
            }
          }

          // Outward K+ rush during repolarization
          if (kChannelOpen && Math.random() < 0.4) {
            // Pull free K+ particles from bottom into the channel
            const candidate = state.particles.find(p => p.type === 'k' && p.state === 'free' && p.y > memY + 6)
            if (candidate) {
              candidate.state = 'rushing'
              candidate.channelType = 'k'
              candidate.flowProgress = 0
            }
          }

          // Animate rushing particles
          state.particles.forEach(p => {
            if (p.state === 'rushing' && p.channelType !== undefined) {
              p.flowProgress += 0.08
              if (p.channelType === 'na') {
                // Flow from top (extracellular) to bottom (intracellular)
                p.x = lerp(p.x, naChannelX, p.flowProgress)
                p.y = lerp(p.y, memY + memH / 2 + 10, p.flowProgress)
                if (p.flowProgress >= 1) {
                  p.state = 'free'
                  p.vx = (Math.random() - 0.5) * 1.5
                  p.vy = Math.abs((Math.random() - 0.5) * 1.2) + 0.5
                }
              } else if (p.channelType === 'k') {
                // Flow from bottom (intracellular) to top (extracellular)
                p.x = lerp(p.x, kChannelX, p.flowProgress)
                p.y = lerp(p.y, memY - memH / 2 - 10, p.flowProgress)
                if (p.flowProgress >= 1) {
                  p.state = 'free'
                  p.vx = (Math.random() - 0.5) * 1.5
                  p.vy = -Math.abs((Math.random() - 0.5) * 1.2) - 0.5
                }
              }
            }
          })
        }
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

      // membrane
      drawMembraneLipids(ctx, w, h, memY, memH, timestamp, cx, channelW)

      // ── DRAW ION CHANNELS (Na+ on left, K+ on right) ──
      const tNow = state.timeT
      const naChannelOpen = tNow > 3 && tNow <= 4.3 && !state.blockTTX
      const kChannelOpen = tNow > 4.3 && tNow <= 7 && !state.blockTEA

      // Draw Na+ channel (Teal)
      ctx.fillStyle = state.blockTTX ? COL_CHANNEL_CLOSED : (naChannelOpen ? COL_CHANNEL_NA : 'rgba(45, 212, 191, 0.4)')
      ctx.strokeStyle = state.blockTTX ? '#ef4444' : COL_TEAL_ACCENT
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.roundRect(naChannelX - channelW / 2, memY - channelH / 2, channelW, channelH, 6)
      ctx.fill()
      ctx.stroke()

      // Na+ Channel tunnel gate visual representation
      ctx.fillStyle = '#07080f'
      ctx.fillRect(naChannelX - channelW * 0.15, memY - channelH / 2 + 2, channelW * 0.3, channelH - 4)

      // Na+ Channel Gates (activation comportas at the top)
      ctx.strokeStyle = COL_TEAL_ACCENT
      ctx.lineWidth = 3
      ctx.beginPath()
      if (naChannelOpen) {
        // Gates open wide
        ctx.moveTo(naChannelX - channelW * 0.15, memY - channelH / 2 + 3)
        ctx.lineTo(naChannelX - channelW * 0.35, memY - channelH / 2 - 4)
        ctx.moveTo(naChannelX + channelW * 0.15, memY - channelH / 2 + 3)
        ctx.lineTo(naChannelX + channelW * 0.35, memY - channelH / 2 - 4)
      } else {
        // Gates closed shut
        ctx.moveTo(naChannelX - channelW * 0.15, memY - channelH / 2 + 3)
        ctx.lineTo(naChannelX + channelW * 0.15, memY - channelH / 2 + 3)
      }
      ctx.stroke()

      // Na+ Channel Ball-and-chain inactivation gate (plugs channel from bottom at t > 4.3ms)
      const isNaInactivated = tNow > 4.3 && tNow <= 7.8 && !state.blockTTX
      ctx.fillStyle = COL_CHANNEL_NA
      ctx.strokeStyle = COL_TEAL_ACCENT
      ctx.lineWidth = 1.8
      ctx.beginPath()
      if (isNaInactivated) {
        // Chain is short, ball plugs the bottom tunnel
        ctx.moveTo(naChannelX - channelW * 0.25, memY + channelH / 2 - 2)
        ctx.lineTo(naChannelX, memY + channelH / 2 - 8)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(naChannelX, memY + channelH / 2 - 8, 5, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Chain hangs freely down
        ctx.moveTo(naChannelX - channelW * 0.25, memY + channelH / 2 - 2)
        ctx.quadraticCurveTo(naChannelX - channelW * 0.4, memY + channelH / 2 + 8, naChannelX - channelW * 0.2, memY + channelH / 2 + 14)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(naChannelX - channelW * 0.2, memY + channelH / 2 + 14, 5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw K+ channel (Rose)
      ctx.fillStyle = state.blockTEA ? COL_CHANNEL_CLOSED : (kChannelOpen ? COL_CHANNEL_K : 'rgba(251, 113, 133, 0.4)')
      ctx.strokeStyle = state.blockTEA ? '#ef4444' : 'rgba(251, 113, 133, 0.8)'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.roundRect(kChannelX - channelW / 2, memY - channelH / 2, channelW, channelH, 6)
      ctx.fill()
      ctx.stroke()

      // K+ Channel tunnel gate
      ctx.fillStyle = '#07080f'
      ctx.fillRect(kChannelX - channelW * 0.15, memY - channelH / 2 + 2, channelW * 0.3, channelH - 4)

      // K+ Channel activation comportas (at the bottom)
      ctx.strokeStyle = 'rgba(251, 113, 133, 1)'
      ctx.lineWidth = 3
      ctx.beginPath()
      if (kChannelOpen) {
        // Gates open wide downward
        ctx.moveTo(kChannelX - channelW * 0.15, memY + channelH / 2 - 3)
        ctx.lineTo(kChannelX - channelW * 0.35, memY + channelH / 2 + 4)
        ctx.moveTo(kChannelX + channelW * 0.15, memY + channelH / 2 - 3)
        ctx.lineTo(kChannelX + channelW * 0.35, memY + channelH / 2 + 4)
      } else {
        // Gates closed shut at bottom
        ctx.moveTo(kChannelX - channelW * 0.15, memY + channelH / 2 - 3)
        ctx.lineTo(kChannelX + channelW * 0.15, memY + channelH / 2 - 3)
      }
      ctx.stroke()

      // Channel Labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.font = `bold 8.5px ${FONT_MONO}`
      ctx.textAlign = 'center'
      ctx.fillText('Na⁺ Ch', naChannelX, memY - channelH / 2 - 10)
      ctx.fillText('K⁺ Ch', kChannelX, memY - channelH / 2 - 10)

      // ── DRAW ALL IONS ──
      state.particles.forEach(p => {
        const col = p.type === 'na' ? COL_NA : COL_K
        const glow = p.type === 'na' ? COL_NA_GLOW : COL_K_GLOW
        const lbl = p.type === 'na' ? 'Na⁺' : 'K⁺'
        drawIon(ctx, p.x, p.y, p.radius, col, glow, lbl)
      })

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
  }, [drawMembraneLipids])

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
