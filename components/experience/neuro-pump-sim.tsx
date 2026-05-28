'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { 
  Play, 
  Pause, 
  Zap, 
  Thermometer, 
  RotateCcw, 
  Activity, 
  ShieldAlert,
  Gauge
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
  state: 'free' | 'capturing' | 'bound' | 'released'
  targetSiteIdx?: number
  captureProgress: number // 0 to 1
}

interface BindingSite {
  x: number
  y: number
  ionType: 'na' | 'k'
  occupiedBy: number | null // particle id or null
}

/* ─────────────────────── constants ─────────────────────── */

const FPS = 35
const FRAME_MS = 1000 / FPS

// colors
const COL_BG = '#07080f'
const COL_MEMBRANE = 'rgba(20, 45, 40, 0.7)'
const COL_MEMBRANE_EDGE = 'rgba(45, 212, 191, 0.35)'
const COL_PUMP_BODY = 'rgba(24, 60, 55, 0.9)'
const COL_PUMP_STROKE = 'rgba(45, 212, 191, 0.5)'
const COL_PUMP_ACTIVE = 'rgba(45, 212, 191, 0.95)'
const COL_NA = '#f43f5e' // rose-500
const COL_NA_GLOW = 'rgba(244, 63, 94, 0.4)'
const COL_K = '#06b6d4' // cyan-500
const COL_K_GLOW = 'rgba(6, 182, 212, 0.4)'
const COL_ATP = '#fbbf24' // amber-400
const COL_ATP_GLOW = 'rgba(251, 191, 36, 0.4)'
const COL_ADP = '#b45309' // amber-700
const COL_TEXT = '#f8fafc'
const COL_TEXT_DIM = '#64748b'
const COL_TEAL_ACCENT = '#2dd4bf'

const FONT_MONO = '"SF Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace'

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
  ctx.shadowBlur = 14
  ctx.shadowColor = glowColor
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0

  ctx.fillStyle = '#fff'
  ctx.font = `bold ${Math.max(9, radius * 0.85)}px ${FONT_MONO}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, x, y + 0.5)
}

export function NeuroPumpSim({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Simulation interactive parameters in React state
  const [atpLevel, setAtpLevel] = useState(100) // 0 to 100
  const [temperature, setTemperature] = useState(37) // 0 to 50
  const [intracellularNa, setIntracellularNa] = useState(25) // amount of Na inside
  const [extracellularK, setExtracellularK] = useState(15) // amount of K outside
  const [isPaused, setIsPaused] = useState(false)
  
  // Real-time telemetry counters
  const [cycles, setCycles] = useState(0)
  const [atpConsumed, setAtpConsumed] = useState(0)
  const [naTransported, setNaTransported] = useState(0)
  const [kTransported, setKTransported] = useState(0)
  const [membranePotential, setMembranePotential] = useState(-70) // millivolts
  
  // Internal state refs to feed the rendering loop without react re-triggering overhead
  const stateRef = useRef({
    cycleT: 0, // 0..1 loop
    atpLevel: 100,
    temperature: 37,
    intracellularNa: 25,
    extracellularK: 15,
    isPaused: false,
    cycles: 0,
    atpConsumed: 0,
    naTransported: 0,
    kTransported: 0,
    potential: -70.0,
    voltageHistory: [] as number[],
    lastTimestamp: 0,
    particles: [] as IonParticle[],
    particleIdCounter: 1,
    pumpConformation: 'E1' as 'E1' | 'E1-P' | 'E2-P' | 'E2', // conformational states
    phosphateGlow: 0, // 0..1 phosphate binding glow
    bindingSites: [] as BindingSite[],
    atpParticle: null as { x: number; y: number; vx: number; vy: number; t: number; active: boolean } | null,
    flashProgress: 0,
    alertMessage: ''
  })

  // Synchronize state values from React controls into loop refs
  useEffect(() => {
    stateRef.current.atpLevel = atpLevel
    stateRef.current.temperature = temperature
    stateRef.current.intracellularNa = intracellularNa
    stateRef.current.extracellularK = extracellularK
    stateRef.current.isPaused = isPaused
  }, [atpLevel, temperature, intracellularNa, extracellularK, isPaused])

  // Reset counters
  const handleResetCounters = () => {
    setCycles(0)
    setAtpConsumed(0)
    setNaTransported(0)
    setKTransported(0)
    setMembranePotential(-70)
    stateRef.current.cycles = 0
    stateRef.current.atpConsumed = 0
    stateRef.current.naTransported = 0
    stateRef.current.kTransported = 0
    stateRef.current.potential = -70.0
    stateRef.current.voltageHistory = []
  }

  // Draw membrane lipids wiggling
  const drawMembraneLipids = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, memY: number, memH: number, time: number) => {
      // Background bilayer area
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

      // wobbling phospholipids head and tails (NASA-level realistic graphics)
      ctx.fillStyle = 'rgba(45, 212, 191, 0.4)'
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)'
      ctx.lineWidth = 1
      
      const spacing = 14
      for (let x = spacing / 2; x < w; x += spacing) {
        // Skip pump zone
        if (x > w * 0.38 && x < w * 0.62) continue

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

  // Draw 2D Voltmeter Graph
  const drawVoltageTelemetry = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, history: number[]) => {
      // background
      ctx.fillStyle = 'rgba(7, 10, 20, 0.75)'
      ctx.beginPath()
      ctx.roundRect(x, y, w, h, 8)
      ctx.fill()
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      // grid lines
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.06)'
      ctx.beginPath()
      for (let i = 1; i < 4; i++) {
        const lx = x + (w * i) / 4
        ctx.moveTo(lx, y)
        ctx.lineTo(lx, y + h)
      }
      for (let i = 1; i < 3; i++) {
        const ly = y + (h * i) / 3
        ctx.moveTo(x, ly)
        ctx.lineTo(x + w, ly)
      }
      ctx.stroke()

      // draw wave
      if (history.length > 1) {
        ctx.strokeStyle = COL_TEAL_ACCENT
        ctx.lineWidth = 1.6
        ctx.shadowColor = COL_TEAL_ACCENT
        ctx.shadowBlur = 6
        ctx.beginPath()

        const step = w / 60 // show last 60 readings
        const startIdx = Math.max(0, history.length - 60)
        
        for (let i = startIdx; i < history.length; i++) {
          const val = history[i]
          const px = x + (i - startIdx) * step
          // map -68mV -> top, -73mV -> bottom
          const py = y + h / 2 - (val - (-70)) * (h / 4)
          if (i === startIdx) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Title
      ctx.fillStyle = COL_TEXT_DIM
      ctx.font = `9px ${FONT_MONO}`
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.fillText('REGULADOR DE VOLTAGEM (mV)', x + 8, y + 6)
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

    // Set initial binding sites positions relative to center
    state.bindingSites = [
      // 3 sites for Na+ (intracellular when E1)
      { x: -16, y: 15, ionType: 'na', occupiedBy: null },
      { x: 0, y: 22, ionType: 'na', occupiedBy: null },
      { x: 16, y: 15, ionType: 'na', occupiedBy: null },
      // 2 sites for K+ (extracellular when E2)
      { x: -10, y: -20, ionType: 'k', occupiedBy: null },
      { x: 10, y: -20, ionType: 'k', occupiedBy: null },
    ]

    // Render loop
    const render = (timestamp: number) => {
      if (state.lastTimestamp === 0) state.lastTimestamp = timestamp
      const elapsed = timestamp - state.lastTimestamp

      if (elapsed < FRAME_MS) {
        rafId = requestAnimationFrame(render)
        return
      }
      state.lastTimestamp = timestamp

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

      // Layout coordinates
      const memY = h * 0.5
      const memH = Math.max(54, h * 0.16)
      const pumpW = Math.max(76, Math.min(120, w * 0.22))
      const pumpH = memH + 45
      const cx = w * 0.5
      const ionR = Math.max(8.5, Math.min(12, w * 0.024))

      /* ── Update Physics and States (if not paused) ── */
      let stateMessage = 'SISTEMA OPERACIONAL'
      let isSystemFault = false

      if (state.temperature < 10) {
        stateMessage = 'CRÍTICO: CONGELAMENTO MOLECULAR'
        isSystemFault = true
      } else if (state.temperature > 44) {
        stateMessage = 'FALHA: DESNATURAÇÃO PROTÉICA'
        isSystemFault = true
      } else if (state.atpLevel === 0) {
        stateMessage = 'ALERTA: ASFIXIA METABÓLICA (0% ATP)'
        isSystemFault = true
      }

      state.alertMessage = isSystemFault ? stateMessage : ''

      if (!state.isPaused) {
        // Adjust particle counts according to sliders dynamically
        const targetNaCount = Math.floor(state.intracellularNa)
        const targetKCount = Math.floor(state.extracellularK)
        
        // Count existing free ions on their correct sides
        const currentNa = state.particles.filter(p => p.type === 'na' && p.state === 'free')
        const currentK = state.particles.filter(p => p.type === 'k' && p.state === 'free')

        // Spawn missing Na+ inside (bottom area)
        if (currentNa.length < targetNaCount) {
          state.particles.push({
            id: state.particleIdCounter++,
            x: Math.random() * w,
            y: memY + memH / 2 + 10 + Math.random() * (h * 0.35),
            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8,
            type: 'na',
            radius: ionR,
            state: 'free',
            captureProgress: 0
          })
        } else if (currentNa.length > targetNaCount) {
          // Remove extra Na
          const idx = state.particles.findIndex(p => p.type === 'na' && p.state === 'free')
          if (idx !== -1) state.particles.splice(idx, 1)
        }

        // Spawn missing K+ outside (top area)
        if (currentK.length < targetKCount) {
          state.particles.push({
            id: state.particleIdCounter++,
            x: Math.random() * w,
            y: Math.random() * (memY - memH / 2 - 10),
            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8,
            type: 'k',
            radius: ionR,
            state: 'free',
            captureProgress: 0
          })
        } else if (currentK.length > targetKCount) {
          // Remove extra K
          const idx = state.particles.findIndex(p => p.type === 'k' && p.state === 'free')
          if (idx !== -1) state.particles.splice(idx, 1)
        }

        // Advance particles and bounce them
        state.particles.forEach(p => {
          if (p.state === 'free') {
            // Apply speed scaling based on temperature (kinetic theory)
            const speedScale = lerp(0.3, 2.2, remap01(state.temperature, 0, 50))
            p.x += p.vx * speedScale
            p.y += p.vy * speedScale

            // Bounce on canvas walls
            if (p.x < p.radius) { p.x = p.radius; p.vx *= -1 }
            if (p.x > w - p.radius) { p.x = w - p.radius; p.vx *= -1 }
            if (p.y < p.radius) { p.y = p.radius; p.vy *= -1 }
            if (p.y > h - p.radius) { p.y = h - p.radius; p.vy *= -1 }

            // Bounce against wiggling membrane limits
            const topBoundary = memY - memH / 2
            const bottomBoundary = memY + memH / 2

            // If ion is Na+ (inside) but tries to cross membrane from bottom
            if (p.type === 'na') {
              // Intracellular side bounce (cannot cross upward unless through pump)
              if (p.y < bottomBoundary + p.radius) {
                // If it is in the pump tunnel, don't bounce, let it float or capture
                if (p.x > cx - pumpW * 0.25 && p.x < cx + pumpW * 0.25) {
                  // inside pump tunnel
                } else {
                  p.y = bottomBoundary + p.radius
                  p.vy = Math.abs(p.vy) // force bounce down
                }
              }
            } else if (p.type === 'k') {
              // Extracellular side bounce (cannot cross downward unless through pump)
              if (p.y > topBoundary - p.radius) {
                if (p.x > cx - pumpW * 0.25 && p.x < cx + pumpW * 0.25) {
                  // inside pump tunnel
                } else {
                  p.y = topBoundary - p.radius
                  p.vy = -Math.abs(p.vy) // force bounce up
                }
              }
            }
          }
        })

        // ── PUMP BIOMECHANICS ──
        if (!isSystemFault) {
          // Adjust pump cycle speed based on temperature
          const cycleSpeed = lerp(0.001, 0.0075, remap01(state.temperature, 10, 44))
          state.cycleT += cycleSpeed

          if (state.cycleT >= 1) {
            state.cycleT = 0
          }

          const t = state.cycleT

          // Conformation states based on cycle progress
          if (t < 0.28) {
            state.pumpConformation = 'E1'
          } else if (t < 0.42) {
            state.pumpConformation = 'E1-P' // Phosphorylated
          } else if (t < 0.75) {
            state.pumpConformation = 'E2-P' // Morphing to E2 with phosphate bound
          } else {
            state.pumpConformation = 'E2' // Dephosphorylated / morphing back
          }

          // 1. Capture Na+ (Citoplasm) during E1 state
          if (state.pumpConformation === 'E1') {
            // Find unoccupied Na+ sites
            const naSites = state.bindingSites.slice(0, 3)
            naSites.forEach((site, sIdx) => {
              if (site.occupiedBy === null) {
                // Find closest free Na+ ion inside
                const candidate = state.particles
                  .filter(p => p.type === 'na' && p.state === 'free' && p.y > memY)
                  .sort((a, b) => {
                    const distA = Math.hypot(a.x - (cx + site.x), a.y - (memY + site.y))
                    const distB = Math.hypot(b.x - (cx + site.x), b.y - (memY + site.y))
                    return distA - distB
                  })[0]

                if (candidate) {
                  // Lock it
                  site.occupiedBy = candidate.id
                  candidate.state = 'capturing'
                  candidate.targetSiteIdx = sIdx
                  candidate.captureProgress = 0
                }
              }
            })
          }

          // 2. Animate capturing Na+ ions moving to sites
          state.particles.forEach(p => {
            if (p.state === 'capturing' && p.type === 'na' && p.targetSiteIdx !== undefined) {
              const site = state.bindingSites[p.targetSiteIdx]
              const targetX = cx + site.x
              const targetY = memY + site.y
              p.captureProgress += 0.06
              p.x = lerp(p.x, targetX, p.captureProgress)
              p.y = lerp(p.y, targetY, p.captureProgress)

              if (p.captureProgress >= 1) {
                p.x = targetX
                p.y = targetY
                p.state = 'bound'
              }
            }
          })

          // 3. Phosphorylation (ATP approaching)
          if (state.pumpConformation === 'E1-P') {
            // Spawn ATP approaching from intracellular
            if (!state.atpParticle) {
              state.atpParticle = {
                x: cx - pumpW * 1.5,
                y: memY + pumpH * 0.75,
                vx: 3.5,
                vy: -1.2,
                t: 0,
                active: true
              }
            } else if (state.atpParticle.active) {
              // move to pump cytoplasmic side
              const targetX = cx - 18
              const targetY = memY + pumpH / 2 - 4
              state.atpParticle.t += 0.08
              state.atpParticle.x = lerp(state.atpParticle.x, targetX, state.atpParticle.t)
              state.atpParticle.y = lerp(state.atpParticle.y, targetY, state.atpParticle.t)

              if (state.atpParticle.t >= 1) {
                // phosphorylation hit!
                state.atpParticle.active = false
                state.flashProgress = 1.0 // flash glow
                state.phosphateGlow = 1.0
                state.atpConsumed += 1

                // Voltmeter drops slightly as ATP is converted
                state.potential -= 0.3
              }
            }
          } else {
            state.atpParticle = null
          }

          // 4. E2-P Conformational shift: Eject Na+ and capture K+
          if (state.pumpConformation === 'E2-P') {
            // Eject bound Na+ ions to the outside
            state.particles.forEach(p => {
              if (p.state === 'bound' && p.type === 'na') {
                p.state = 'released'
                p.captureProgress = 0
                state.naTransported += 1
                
                // Release the binding site
                const site = state.bindingSites.find(s => s.occupiedBy === p.id)
                if (site) site.occupiedBy = null
              }
            })

            // Capture free K+ ions from outside
            const kSites = state.bindingSites.slice(3, 5)
            kSites.forEach((site, sIdx) => {
              if (site.occupiedBy === null) {
                // Find closest free K+ outside
                const candidate = state.particles
                  .filter(p => p.type === 'k' && p.state === 'free' && p.y < memY)
                  .sort((a, b) => {
                    const distA = Math.hypot(a.x - (cx + site.x), a.y - (memY + site.y))
                    const distB = Math.hypot(b.x - (cx + site.x), b.y - (memY + site.y))
                    return distA - distB
                  })[0]

                if (candidate) {
                  site.occupiedBy = candidate.id
                  candidate.state = 'capturing'
                  candidate.targetSiteIdx = 3 + sIdx
                  candidate.captureProgress = 0
                }
              }
            })
          }

          // 5. Animate K+ ions capturing and moving to sites
          state.particles.forEach(p => {
            if (p.state === 'capturing' && p.type === 'k' && p.targetSiteIdx !== undefined) {
              const site = state.bindingSites[p.targetSiteIdx]
              const targetX = cx + site.x
              const targetY = memY + site.y
              p.captureProgress += 0.06
              p.x = lerp(p.x, targetX, p.captureProgress)
              p.y = lerp(p.y, targetY, p.captureProgress)

              if (p.captureProgress >= 1) {
                p.x = targetX
                p.y = targetY
                p.state = 'bound'
              }
            }
          })

          // Animate released Na+ floating upward and away
          state.particles.forEach(p => {
            if (p.state === 'released' && p.type === 'na') {
              p.y -= 3.2
              p.x += Math.sin(p.y * 0.05) * 1.5
              if (p.y < memY - pumpH) {
                p.state = 'free'
                // Assign new outward velocity
                p.vx = (Math.random() - 0.5) * 1.8
                p.vy = -Math.abs((Math.random() - 0.5) * 1.2) - 0.5
              }
            }
          })

          // 6. Return back to E1 state: release K+ inside
          if (state.pumpConformation === 'E2') {
            // Dephosphorylate (decay phosphate glow)
            state.phosphateGlow = lerp(state.phosphateGlow, 0, 0.1)

            // Eject bound K+ inside
            state.particles.forEach(p => {
              if (p.state === 'bound' && p.type === 'k') {
                p.state = 'released'
                p.captureProgress = 0
                state.kTransported += 1

                const site = state.bindingSites.find(s => s.occupiedBy === p.id)
                if (site) site.occupiedBy = null
              }
            })
          }

          // Animate released K+ floating downward and away
          state.particles.forEach(p => {
            if (p.state === 'released' && p.type === 'k') {
              p.y += 3.2
              p.x += Math.sin(p.y * 0.05) * 1.5
              if (p.y > memY + pumpH) {
                p.state = 'free'
                p.vx = (Math.random() - 0.5) * 1.8
                p.vy = Math.abs((Math.random() - 0.5) * 1.2) + 0.5
              }
            }
          })

          // Calculate electrogenic potential oscillation (-70mV polarized)
          // 3 Na+ out (- charge intracellular) and 2 K+ in (+ charge intracellular)
          // Net result is hyperpolarizing/polarizing state
          const expectedPotential = -70.0 - (state.naTransported * 0.08) + (state.kTransported * 0.075)
          state.potential = lerp(state.potential, expectedPotential, 0.05)

          // Decouple flash
          if (state.flashProgress > 0) {
            state.flashProgress -= 0.08
          }
        }
      }

      // Record voltage telemetry history
      if (timestamp % 20 < 1) {
        state.voltageHistory.push(state.potential)
        if (state.voltageHistory.length > 200) {
          state.voltageHistory.shift()
        }
      }

      /* ── Sync refs into state React variables periodically ── */
      if (timestamp % 150 < 1) {
        setCycles(state.cycles)
        setAtpConsumed(state.atpConsumed)
        setNaTransported(state.naTransported)
        setKTransported(state.kTransported)
        setMembranePotential(Number(state.potential.toFixed(2)))
      }

      /* ── DRAWING CANVAS ── */
      ctx.clearRect(0, 0, w, h)

      // background
      ctx.fillStyle = COL_BG
      ctx.fillRect(0, 0, w, h)

      // grid patterns for sci-fi look
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)'
      ctx.lineWidth = 1
      const gridSize = 30
      ctx.beginPath()
      for (let lx = 0; lx < w; lx += gridSize) {
        ctx.moveTo(lx, 0)
        ctx.lineTo(lx, h)
      }
      for (let ly = 0; ly < h; ly += gridSize) {
        ctx.moveTo(0, ly)
        ctx.lineTo(w, ly)
      }
      ctx.stroke()

      // membrane
      drawMembraneLipids(ctx, w, h, memY, memH, timestamp)

      // draw E1/E2 morphing pump
      const isConformTransition = state.pumpConformation === 'E2-P' || state.pumpConformation === 'E2'
      const channelOpening = isConformTransition ? 1.0 : 0.0

      // Protein body rendering (E1 = wide bottom/narrow top; E2 = wide top/narrow bottom)
      const x = cx - pumpW / 2
      const y = memY - pumpH / 2
      const r = 16

      ctx.fillStyle = COL_PUMP_BODY
      ctx.strokeStyle = isSystemFault ? '#ef4444' : (state.phosphateGlow > 0.05 ? COL_PUMP_ACTIVE : COL_PUMP_STROKE)
      ctx.lineWidth = 3

      // Dynamic morph path based on E1 vs E2 conformation
      ctx.beginPath()
      if (channelOpening === 0) {
        // E1: Wide bottom, narrow top (open to inside)
        ctx.moveTo(cx - pumpW * 0.35, y) // top-left
        ctx.lineTo(cx + pumpW * 0.35, y) // top-right
        ctx.quadraticCurveTo(cx + pumpW * 0.45, memY, cx + pumpW * 0.5, y + pumpH) // bottom-right
        ctx.lineTo(cx - pumpW * 0.5, y + pumpH) // bottom-left
        ctx.quadraticCurveTo(cx - pumpW * 0.45, memY, cx - pumpW * 0.35, y)
      } else {
        // E2: Wide top, narrow bottom (open to outside)
        ctx.moveTo(cx - pumpW * 0.5, y) // top-left
        ctx.lineTo(cx + pumpW * 0.5, y) // top-right
        ctx.quadraticCurveTo(cx + pumpW * 0.45, memY, cx + pumpW * 0.35, y + pumpH) // bottom-right
        ctx.lineTo(cx - pumpW * 0.35, y + pumpH) // bottom-left
        ctx.quadraticCurveTo(cx - pumpW * 0.45, memY, cx - pumpW * 0.5, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // channel tunnel
      const channelW = pumpW * (0.24 + channelOpening * 0.08)
      const channelH = pumpH * 0.72
      const tx = cx - channelW / 2
      const ty = memY - channelH / 2

      const channelGrad = ctx.createLinearGradient(tx, ty, tx, ty + channelH)
      channelGrad.addColorStop(0, 'rgba(3, 5, 12, 0.85)')
      channelGrad.addColorStop(0.5, 'rgba(10, 32, 28, 0.9)')
      channelGrad.addColorStop(1, 'rgba(3, 5, 12, 0.85)')
      ctx.fillStyle = channelGrad
      ctx.beginPath()
      ctx.roundRect(tx, ty, channelW, channelH, 8)
      ctx.fill()

      // active glow
      if (state.phosphateGlow > 0.05) {
        ctx.save()
        ctx.shadowBlur = 18 * state.phosphateGlow
        ctx.shadowColor = COL_TEAL_ACCENT
        ctx.strokeStyle = `rgba(45, 212, 191, ${state.phosphateGlow})`
        ctx.lineWidth = 2
        ctx.beginPath()
        if (channelOpening === 0) {
          ctx.moveTo(cx - pumpW * 0.35 + 2, y + 2)
          ctx.lineTo(cx + pumpW * 0.35 - 2, y + 2)
          ctx.quadraticCurveTo(cx + pumpW * 0.45 - 2, memY, cx + pumpW * 0.5 - 2, y + pumpH - 2)
          ctx.lineTo(cx - pumpW * 0.5 + 2, y + pumpH - 2)
          ctx.quadraticCurveTo(cx - pumpW * 0.45 + 2, memY, cx - pumpW * 0.35 + 2, y + 2)
        } else {
          ctx.moveTo(cx - pumpW * 0.5 + 2, y + 2)
          ctx.lineTo(cx + pumpW * 0.5 - 2, y + 2)
          ctx.quadraticCurveTo(cx + pumpW * 0.45 - 2, memY, cx + pumpW * 0.35 - 2, y + pumpH - 2)
          ctx.lineTo(cx - pumpW * 0.35 + 2, y + pumpH - 2)
          ctx.quadraticCurveTo(cx - pumpW * 0.45 + 2, memY, cx - pumpW * 0.5 + 2, y + 2)
        }
        ctx.stroke()
        ctx.restore()
      }

      // Voltameter spikes / Flash hit glow
      if (state.flashProgress > 0.01) {
        ctx.fillStyle = `rgba(251, 191, 36, ${state.flashProgress * 0.35})`
        ctx.fillRect(0, 0, w, h)
      }

      // Draw phosphate P bonded to pump on phosphorylation
      if (state.phosphateGlow > 0.05) {
        const px = cx + pumpW * 0.35
        const py = memY + 12
        ctx.shadowBlur = 15 * state.phosphateGlow
        ctx.shadowColor = COL_ATP
        ctx.fillStyle = COL_ATP
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.fillStyle = '#000'
        ctx.font = `bold 8px ${FONT_MONO}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('P', px, py + 0.5)
      }

      // Draw ATP particle
      if (state.atpParticle && state.atpParticle.active) {
        drawIon(ctx, state.atpParticle.x, state.atpParticle.y, ionR * 0.9, COL_ATP, COL_ATP_GLOW, 'ATP')
      }

      // Draw all ions
      state.particles.forEach(p => {
        const col = p.type === 'na' ? COL_NA : COL_K
        const glow = p.type === 'na' ? COL_NA_GLOW : COL_K_GLOW
        const lbl = p.type === 'na' ? 'Na⁺' : 'K⁺'
        drawIon(ctx, p.x, p.y, p.radius, col, glow, lbl)
      })

      // draw telemetry graph
      drawVoltageTelemetry(ctx, 16, h - 90, 160, 75, state.voltageHistory)

      // HUD / operational message
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.font = `bold 12px ${FONT_MONO}`
      ctx.fillStyle = isSystemFault ? '#ef4444' : COL_TEAL_ACCENT
      
      const statusIcon = isSystemFault ? '⚠️' : '⚡'
      ctx.fillText(`${statusIcon} TELEMETRIA: ${stateMessage}`, 16, 16)

      ctx.fillStyle = COL_TEXT_DIM
      ctx.font = `9.5px ${FONT_MONO}`
      ctx.fillText(`POTENCIAL TRANSELETRÔNICO: ${state.potential.toFixed(2)} mV`, 16, 29)

      // Sci-fi Telemetry Panel on the right (top-right)
      ctx.textAlign = 'right'
      ctx.textBaseline = 'top'
      ctx.font = `bold 8.5px ${FONT_MONO}`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.fillText('METRICAS DE FLUXO', w - 16, 16)

      ctx.fillStyle = COL_TEXT
      ctx.font = `9px ${FONT_MONO}`
      ctx.fillText(`CICLOS: ${state.cycles}`, w - 16, 28)
      ctx.fillText(`Na⁺ SAIDA: ${state.naTransported}`, w - 16, 40)
      ctx.fillStyle = COL_K
      ctx.fillText(`K⁺ ENTRADA: ${state.kTransported}`, w - 16, 52)
      ctx.fillStyle = '#fbbf24' // ATP color
      ctx.fillText(`ATP GASTO: ${state.atpConsumed} mol`, w - 16, 64)

      // stoichiometry display
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.font = `10.5px ${FONT_MONO}`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
      ctx.fillText('E1: Sítio Na⁺ (Citoplasmático)  |  E2: Sítio K⁺ (Extracelular)', cx, h - 15)

      /* ── Loop frame ── */
      rafId = requestAnimationFrame(render)
    }

    // start loop
    state.lastTimestamp = performance.now()
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [drawMembraneLipids, drawVoltageTelemetry, drawMembraneLipids])

  return (
    <div className={`flex flex-col lg:flex-row gap-4 h-full w-full min-h-0 ${className}`}>
      
      {/* ── Left main simulation screen ── */}
      <div className="relative flex-1 min-h-[220px] rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl flex flex-col justify-end">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
          className="absolute inset-0"
        />

        {/* Warning panel overlay */}
        {stateRef.current.alertMessage && (
          <div className="absolute inset-0 bg-red-950/20 border border-red-500/20 pointer-events-none flex flex-col items-center justify-center p-4 backdrop-blur-[1px]">
            <div className="bg-black/85 border border-red-500/30 rounded-xl p-5 flex flex-col items-center max-w-[280px] shadow-[0_12px_30px_rgba(239,68,68,0.15)] animate-pulse">
              <ShieldAlert className="h-10 w-10 text-red-500 mb-2.5" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-black text-red-500 mb-1">Bloqueio Operacional</span>
              <p className="text-[9px] font-mono text-white/70 text-center leading-normal">
                {stateRef.current.alertMessage}
              </p>
              <span className="text-[8px] text-white/30 font-mono mt-3 uppercase tracking-wider">Ajuste os controles ao lado</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Right control board (NASA-style) ── */}
      <div className="w-full lg:w-80 flex flex-col gap-4 p-4 rounded-2xl bg-black/50 border border-white/5 backdrop-blur-xl shrink-0 overflow-y-auto max-h-full">
        <div className="border-b border-white/[0.06] pb-2.5">
          <span className="text-[8px] uppercase tracking-[0.2em] font-black text-teal-400 block mb-0.5">CONTROLES DA UNIDADE</span>
          <h4 className="text-[12.5px] font-bold text-white/90 font-sans tracking-wide">Bomba Na⁺/K⁺-ATPase 6D</h4>
        </div>

        {/* Dynamic Controls Sliders */}
        <div className="space-y-4 flex-1">
          {/* ATP Availability Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> DISPONIBILIDADE ATP</span>
              <span className={`font-bold ${atpLevel === 0 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}>
                {atpLevel}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={atpLevel} 
              onChange={(e) => setAtpLevel(Number(e.target.value))}
              className="w-full accent-amber-400 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-[7.5px] font-mono text-white/30 block leading-tight">
              A energia em ATP move a bomba de seu estado inicial. Se zerada (0%), ocorre asfixia mecânica.
            </span>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Thermometer className="h-3.5 w-3.5 text-purple-400" /> TEMPERATURA CELULAR</span>
              <span className={`font-bold ${(temperature < 10 || temperature > 44) ? 'text-red-500 animate-pulse' : 'text-purple-400'}`}>
                {temperature}°C
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={temperature} 
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-purple-400 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-[7.5px] font-mono text-white/30 block leading-tight">
              Regula a velocidade de reação e difusão cinética. Bloqueio abaixo de 10°C e desnaturação acima de 44°C.
            </span>
          </div>

          {/* Intracellular Na+ concentration slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-rose-500" /> CONCENTRAÇÃO INTRACELULAR Na⁺</span>
              <span className="font-bold text-rose-500">
                {intracellularNa} <span className="text-[8px] text-white/40">Íons</span>
              </span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="40" 
              value={intracellularNa} 
              onChange={(e) => setIntracellularNa(Number(e.target.value))}
              className="w-full accent-rose-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Extracellular K+ concentration slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-cyan-400" /> CONCENTRAÇÃO EXTRACELULAR K⁺</span>
              <span className="font-bold text-cyan-400">
                {extracellularK} <span className="text-[8px] text-white/40">Íons</span>
              </span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="30" 
              value={extracellularK} 
              onChange={(e) => setExtracellularK(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Bottom Switch Button */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono text-white/30 uppercase">Operação</span>
            <span className="text-[10px] font-mono text-white/70 font-semibold">{isPaused ? 'Espera' : 'Ativa'}</span>
          </div>
          <div className="flex gap-2">
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
              {isPaused ? <Play className="h-3.5 w-3.5 fill-emerald-400" /> : <Pause className="h-3.5 w-3.5 fill-amber-400" />}
              {isPaused ? 'Ligar' : 'Pausar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
