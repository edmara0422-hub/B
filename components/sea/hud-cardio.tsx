'use client'

import { useState, useEffect, useRef } from 'react'
import { Activity, Zap, Volume2, VolumeX } from 'lucide-react'
import dynamic from 'next/dynamic'

const CardioHeroScene = dynamic(
  () => import('@/components/experience/cardio-hero-scene').then((m) => m.CardioHeroScene),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5" /> }
)



export function HudCardio() {
  const [hr, setHr] = useState(72)
  const [rhythm, setRhythm] = useState('sinusal')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [charging, setCharging] = useState(false)
  const [chargeProgress, setChargeProgress] = useState(0)
  const [shockPower, setShockPower] = useState(0)
  const [epinephrineCount, setEpinephrineCount] = useState(0)
  const [clinicalStatus, setClinicalStatus] = useState('Estável')
  const [guideline, setGuideline] = useState('Monitoração contínua padrão')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const hrRef = useRef(hr)
  const rhythmRef = useRef(rhythm)
  const soundEnabledRef = useRef(soundEnabled)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    hrRef.current = hr
    rhythmRef.current = rhythm
  }, [hr, rhythm])

  useEffect(() => {
    soundEnabledRef.current = soundEnabled
  }, [soundEnabled])

  // Play audio beeps using Web Audio API
  const playBeep = (freq: number, duration: number) => {
    if (!soundEnabledRef.current) return
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
      console.warn('Audio Context error:', e)
    }
  }

  // Defibrillator screen flash
  const triggerFlash = () => {
    const flash = document.createElement('div')
    flash.style.cssText = 'position:fixed; inset:0; background:#fff; z-index:9999; pointer-events:none; opacity:0.95; transition: opacity 0.12s ease-out;'
    document.body.appendChild(flash)
    setTimeout(() => {
      flash.style.opacity = '0'
      setTimeout(() => flash.remove(), 120)
    }, 50)
  }

  // Low bass sawtooth shock thump
  const playThump = () => {
    if (!soundEnabledRef.current) return
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
      osc.frequency.value = 55
      osc.type = 'sawtooth'
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6)
      osc.start()
      osc.stop(audioCtx.currentTime + 0.6)
    } catch (e) {}
  }

  // Canvas ECG trace loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let w = canvas.width = canvas.parentElement?.clientWidth || 400
    let h = canvas.height = 180

    const handleResize = () => {
      if (!canvas) return
      w = canvas.width = canvas.parentElement?.clientWidth || 400
      h = canvas.height = 180
      points = new Array(w).fill(h / 2)
    }

    window.addEventListener('resize', handleResize)

    let points = new Array(w).fill(h / 2)
    let step = 0

    const draw = () => {
      if (!canvas || !ctx) return
      
      // Clear canvas for transparency
      ctx.clearRect(0, 0, w, h)

      // Telemetry grid
      ctx.strokeStyle = 'rgba(248, 113, 113, 0.04)'
      ctx.lineWidth = 1
      for (let i = 0; i < w; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for (let j = 0; j < h; j += 20) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
      }

      // Generate ECG waveform based on rhythm
      let val = h / 2
      step++

      const currentRhythm = rhythmRef.current
      const currentHr = hrRef.current

      if (currentRhythm === 'assistolia' || currentHr === 0) {
        // Flatline with minimal static noise
        val = h / 2 + (Math.random() - 0.5) * 0.6
        if (step % 80 === 0) {
          playBeep(320, 0.12)
        }
      } 
      else if (currentRhythm === 'pcr') {
        // Chaotic VF (PCR)
        val = h / 2 + (Math.sin(step * 0.45) * 13) + (Math.cos(step * 0.85) * 9) + (Math.random() - 0.5) * 2
        if (step % 20 === 0) {
          playBeep(220 + Math.random() * 40, 0.03)
        }
      } 
      else {
        // Normal sinus or tachycardia wave
        const beatPeriod = Math.max(16, Math.round(3600 / currentHr))
        const subStep = step % beatPeriod

        const pStart = Math.round(beatPeriod * 0.12)
        const qStart = Math.round(beatPeriod * 0.20)
        const rStart = Math.round(beatPeriod * 0.24)
        const sStart = Math.round(beatPeriod * 0.28)
        const tStart = Math.round(beatPeriod * 0.48)
        const tEnd = Math.round(beatPeriod * 0.62)

        if (subStep === pStart) val = h / 2 - 4
        else if (subStep === pStart + 2) val = h / 2
        else if (subStep === qStart) val = h / 2 + 5
        else if (subStep === rStart) {
          val = h / 2 - 46 // R spike
          playBeep(840 + (currentHr - 72) * 1.6, 0.07)
        }
        else if (subStep === sStart) val = h / 2 + 13
        else if (subStep === sStart + 2) val = h / 2
        else if (subStep === tStart) val = h / 2 - 7
        else if (subStep === tEnd) val = h / 2
      }

      points.shift()
      points.push(val)

      // Draw trace
      ctx.strokeStyle = '#f87171' // var(--rose)
      ctx.lineWidth = 2.5
      ctx.shadowColor = 'rgba(248, 113, 113, 0.5)'
      ctx.shadowBlur = 10
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
      ctx.arc(w - 2, points[w - 1], 4.5, 0, Math.PI * 2)
      ctx.fill()

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Force preselected rhythm presets
  const handleSelectRhythm = (r: string) => {
    setRhythm(r)
    playBeep(720, 0.08)
    if (r === 'sinus' || r === 'sinusal') {
      setHr(72)
      setClinicalStatus('Estável')
      setGuideline('Monitoração contínua padrão')
    } else if (r === 'taqui') {
      setHr(140)
      setClinicalStatus('Taquicardia Sustentada')
      setGuideline('Avaliar pulso · Considerar adenosina')
    } else if (r === 'pcr') {
      setHr(160)
      setClinicalStatus('PCR — Fibrilação Ventricular')
      setGuideline('Iniciar RCP · Carregar Desfibrilador!')
    } else if (r === 'assistolia') {
      setHr(0)
      setClinicalStatus('ASSISTOLIA')
      setGuideline('RCP + Adrenalina IMEDIATA')
    }
  }

  const handleCharge = () => {
    if (rhythm !== 'pcr') {
      alert('Ritmo não chocável! Desfibrilação recomendada apenas para PCR/FV.')
      return
    }
    if (charging) return
    setCharging(true)
    setChargeProgress(0)

    let progress = 0
    const maxProgress = 200
    const interval = setInterval(() => {
      progress += 4
      setChargeProgress(Math.min(progress, maxProgress))
      playBeep(400 + (progress * 2), 0.04)

      if (progress >= maxProgress) {
        clearInterval(interval)
        playBeep(1200, 0.5)
        setShockPower(200)
      }
    }, 80)
  }

  const fireShock = () => {
    setCharging(false)
    setShockPower(0)
    setChargeProgress(0)

    triggerFlash()
    playThump()

    // Cardiovert to sinus after short shock delay
    setTimeout(() => {
      setHr(72)
      setRhythm('sinusal')
      setClinicalStatus('Pós-Choque Estável')
      setGuideline('Checar pulso e ventilação')
      playBeep(880, 0.2)
    }, 300)
  }

  const administerEpinephrine = () => {
    setEpinephrineCount((prev) => prev + 1)
    playBeep(800, 0.15)
    setClinicalStatus('Epinefrina ativa')
    setGuideline(`Dose ${epinephrineCount + 1}mg · Aguardar RCP 2min`)

    // Progressive HR drift over 10 seconds (epinephrine pharmacodynamics)
    const startFC = hr
    const targetFC = Math.min(180, startFC + 30)
    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += 500
      const progress = elapsed / 10000
      const nextHr = Math.round(startFC + (targetFC - startFC) * Math.min(1, progress))
      setHr(nextHr)
      if (elapsed >= 10000) {
        clearInterval(interval)
      }
    }, 500)
  }

  return (
    <>
      <div className="scanlines z-10" />

      {/* Defibrillator charge overlay */}
      {charging && (
        <div
          id="defib-overlay"
          className="absolute inset-0 z-30 bg-black/85 flex flex-col items-center justify-center gap-4 rounded-[28px] border border-red-500/20"
        >
          <span className="text-[13px] text-red-400 font-bold tracking-widest animate-pulse">
            ⚡ CARREGANDO CAPACITORES
          </span>
          <div className="w-[70%] h-2.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-[80ms]"
              style={{ width: `${(chargeProgress / 200) * 100}%`, boxShadow: '0 0 12px rgba(248,113,113,0.6)' }}
            />
          </div>
          <span className="text-2xl font-black font-mono text-white">
            {chargeProgress} J
          </span>
          {shockPower >= 200 && (
            <button
              onClick={fireShock}
              className="px-8 py-3.5 border-2 border-red-500 bg-red-500/25 hover:bg-red-500/40 text-white text-[13px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-[0_0_15px_#f87171] animate-[pulse_1s_infinite_alternate]"
            >
              ⚡ DISPARAR CHOQUE 200J
            </button>
          )}
        </div>
      )}

      <div className="hero-header relative z-20">
        <div className="live-head text-red-400 flex items-center gap-2">
          <div className="pulse-dot" />
          <span>Monitor ECG • {rhythm === 'pcr' ? 'FV/PCR' : rhythm === 'assistolia' ? 'Assistolia' : 'Sinusal'}</span>
        </div>
        <div className="ch-label flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-[#d2af5a] bg-white/5 hover:bg-white/10 p-1.5 rounded-lg border border-[#d2af5a]/20 transition-all"
            title={soundEnabled ? 'Mutar Telemetria' : 'Desmutar Telemetria'}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>
          <span>CH-04 • ECG ENGINE</span>
        </div>
      </div>

      <div className="hero-content">
        {/* Painel Central Visual */}
        <div className="hero-visual-pane relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-100 z-0">
            <CardioHeroScene transparent />
          </div>
          <div className="cardio-sim-screen relative z-10 w-full flex flex-col gap-3">
            <div className="cardio-ecg-screen relative border border-red-500/15 rounded-xl bg-transparent overflow-hidden w-full h-[180px] shrink-0">
              <canvas ref={canvasRef} className="w-full h-full block" />

              <div className="absolute left-4 top-4 font-mono flex gap-6 pointer-events-none">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/45">BPM</span>
                  <b className="text-base text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]">
                    {rhythm === 'assistolia' ? '0' : rhythm === 'pcr' ? 'Caótico' : hr}
                  </b>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/45">RITMO</span>
                  <b className="text-base text-red-400">
                    {rhythm === 'pcr' ? 'FV/PCR' : rhythm === 'assistolia' ? 'ASSISTOLIA' : 'SINUSAL'}
                  </b>
                </div>
              </div>
              
              <div className="absolute right-4 top-4 text-red-400 animate-pulse drop-shadow-[0_0_8px_#f87171] pointer-events-none font-bold text-2xl">
                ♥
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5 shrink-0">
              <button
                onClick={() => handleSelectRhythm('sinusal')}
                className={`cardio-btn py-2 text-[10px] ${rhythm === 'sinusal' ? 'on text-[#fff] font-bold border-red-400/40 shadow-[0_0_10px_rgba(248,113,113,0.2)] bg-red-500/10' : ''}`}
              >
                Sinusal
              </button>
              <button
                onClick={() => handleSelectRhythm('taqui')}
                className={`cardio-btn py-2 text-[10px] ${rhythm === 'taqui' ? 'on text-[#fff] font-bold border-red-400/40 shadow-[0_0_10px_rgba(248,113,113,0.2)] bg-red-500/10' : ''}`}
              >
                Taquia. 140
              </button>
              <button
                onClick={() => handleSelectRhythm('pcr')}
                className={`cardio-btn py-2 text-[10px] ${rhythm === 'pcr' ? 'on text-[#fff] font-bold border-red-400/40 shadow-[0_0_10px_rgba(248,113,113,0.2)] bg-red-500/10' : ''}`}
              >
                PCR / FV
              </button>
              <button
                onClick={() => handleSelectRhythm('assistolia')}
                className={`cardio-btn py-2 text-[10px] ${rhythm === 'assistolia' ? 'on text-[#fff] font-bold border-red-400/40 shadow-[0_0_10px_rgba(248,113,113,0.2)] bg-red-500/10' : ''}`}
              >
                Assistolia
              </button>
            </div>
          </div>
        </div>

        {/* Controles Laterais */}
        <div className="hero-controls-pane">
          <div>
            <h3 className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Controles Clínicos <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </h3>

            <div className="c-slider-group mb-5">
              <label>Freq. Cardíaca (FC) <span>{hr} bpm</span></label>
              <input
                type="range"
                min="20"
                max="200"
                value={hr}
                disabled={rhythm === 'assistolia'}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setHr(val)
                  playBeep(700 + val * 0.8, 0.02)
                }}
                className="c-slider-input text-red-400"
              />
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label className="text-[11px] text-white/70 font-medium">Procedimento PCR / FV</label>
              <button
                onClick={handleCharge}
                className="cardio-btn flex items-center justify-center gap-2 border-red-500/30 text-red-200 hover:bg-red-500/10 py-2.5 font-bold uppercase tracking-wider text-[11px]"
              >
                ⚡ Desferir Choque
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] text-white/70 font-medium">Farmacologia de Emergência</label>
              <button
                onClick={administerEpinephrine}
                className="cardio-btn border-orange-500/30 text-orange-200 hover:bg-orange-500/10 py-2.5 font-semibold text-[11px]"
              >
                💉 Epinefrina 1mg {epinephrineCount > 0 && `(×${epinephrineCount})`}
              </button>
            </div>

            <div className="border-t border-white/5 pt-3 mt-6 flex flex-col gap-1.5 font-mono text-[10px] text-white/45">
              <div>Estado Clínico: <b className="text-teal-400 font-bold">{clinicalStatus}</b></div>
              <div>Conduta: <b className="text-white font-bold">{guideline}</b></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer relative z-20">
        <div className="title-group">
          <div className="area">Sistema Cardíaco</div>
          <h2>Coração • Arritmias</h2>
          <p>Simulador fisiológico cardiovascular e laboratório de PCR em tempo real. Escolha o ritmo clínico, administre doses de epinefrina e desfire choques sincronizados.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene text-[#1a120a]" onClick={() => playBeep(440, 0.1)}>
            ✦ Entrar na cena
          </button>
        </div>
      </div>
    </>
  )
}
