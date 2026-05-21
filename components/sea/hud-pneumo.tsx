'use client'

import { useState } from 'react'
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
        VMI • Pressão
      </div>
      <div className="mini-bg-art">
        <Wind size={48} strokeWidth={1} />
      </div>
      <div className="hud-vitals">
        <div><span>Volume:</span><b>450 mL</b></div>
        <div><span>Pressão:</span><b>22 cmH2O</b></div>
        <div><span>Fluxo:</span><b>40 L/min</b></div>
      </div>
      <div className="title-area">
        <span>Módulo Simulação</span>
        <h2><div className="indicator-box" /> Pulmão</h2>
      </div>
      <div className="badge">PNEUMO</div>
    </>
  )
}

export function HudPneumo() {
  const [vol, setVol] = useState(450)
  const [peep, setPeep] = useState(5)
  const [fio2, setFio2] = useState(40)

  return (
    <>
      <div className="scanlines z-10" />

      <div className="hero-header relative z-20">
        <div className="live-head text-blue-400">
          <div className="pulse-dot" />
          <span>Ventilador Ativo (PCV)</span>
        </div>
        <div className="ch-label">PN-03</div>
      </div>

      <div className="hero-content">
        <div className="hero-visual-pane relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-80 z-0">
            <PneumoHeroScene transparent />
          </div>
          <div className="pneumo-sim-screen w-full h-full relative z-10">
            <div className="canvas-graph-container">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 text-blue-400">
                <Wind size={100} strokeWidth={0.5} />
              </div>
              <div className="graph-overlay-vals">
                <span>Pico: <b>{Math.floor(peep + (vol / 25))}</b></span>
                <span>Platô: <b>{Math.floor(peep + (vol / 30))}</b></span>
                <span>PEEP: <b>{peep}</b></span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-3 flex flex-col items-center justify-center">
                <span className="text-[10px] text-blue-300/60 uppercase">Vol. Corrente</span>
                <b className="text-xl text-blue-400">{vol}</b>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-3 flex flex-col items-center justify-center">
                <span className="text-[10px] text-blue-300/60 uppercase">PEEP</span>
                <b className="text-xl text-blue-400">{peep}</b>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-3 flex flex-col items-center justify-center">
                <span className="text-[10px] text-blue-300/60 uppercase">FiO2</span>
                <b className="text-xl text-blue-400">{fio2}%</b>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-controls-pane">
          <div>
            <h3 className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Parâmetros Ventilatórios <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </h3>

            <div className="c-slider-group mb-5">
              <label>Volume Corrente (mL) <span>{vol}</span></label>
              <input type="range" min="200" max="800" step="10" value={vol} onChange={e => setVol(Number(e.target.value))} className="c-slider-input text-blue-400" />
            </div>

            <div className="c-slider-group mb-5">
              <label>PEEP (cmH2O) <span>{peep}</span></label>
              <input type="range" min="0" max="20" value={peep} onChange={e => setPeep(Number(e.target.value))} className="c-slider-input text-blue-400" />
            </div>

            <div className="c-slider-group">
              <label>FiO2 (%) <span>{fio2}</span></label>
              <input type="range" min="21" max="100" value={fio2} onChange={e => setFio2(Number(e.target.value))} className="c-slider-input text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer relative z-20">
        <div className="title-group">
          <div className="area">Simulação Avançada</div>
          <h2>Pulmão & VM</h2>
          <p>Ventilação Mecânica interativa. Ajuste parâmetros e veja as curvas e loops mudarem em tempo real.</p>
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
