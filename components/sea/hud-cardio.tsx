'use client'

import { useState } from 'react'
import { Activity, Zap } from 'lucide-react'
import dynamic from 'next/dynamic'

const CardioHeroScene = dynamic(
  () => import('@/components/experience/cardio-hero-scene').then((m) => m.CardioHeroScene),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5" /> }
)

export function MiniCardio() {
  return (
    <>
      <div className="live-tag cardio">
        <div className="dot" />
        Monitorização
      </div>
      <div className="mini-bg-art">
        <Activity size={48} strokeWidth={1} />
      </div>
      <div className="hud-vitals">
        <div><span>FC:</span><b>128 bpm</b></div>
        <div><span>Ritmo:</span><b>Taqui. Sinusal</b></div>
        <div><span>PA:</span><b>90x60 mmHg</b></div>
      </div>
      <div className="title-area">
        <span>Módulo Simulação</span>
        <h2><div className="indicator-box" /> Coração</h2>
      </div>
      <div className="badge">CARDIO</div>
    </>
  )
}

export function HudCardio() {
  const [hr, setHr] = useState(128)
  const [rhythm, setRhythm] = useState('taqui')
  const [shockPower, setShockPower] = useState(0)

  const handleCharge = () => setShockPower(200)
  const handleShock = () => setShockPower(0)

  return (
    <>
      <div className="scanlines z-10" />

      <div className="hero-header relative z-20">
        <div className="live-head text-red-400">
          <div className="pulse-dot" />
          <span>Cardio • Monitor Ativo</span>
        </div>
        <div className="ch-label">CH-02</div>
      </div>

      <div className="hero-content">
        {/* Painel Central Visual */}
        <div className="hero-visual-pane relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-100 z-0">
            <CardioHeroScene transparent />
          </div>
          <div className="cardio-sim-screen relative z-10 w-full flex flex-col gap-3">
            <div className="cardio-ecg-screen relative border border-red-500/15 rounded-xl bg-[#040806]/40 backdrop-blur-[2px] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] overflow-hidden w-full h-[180px] shrink-0">
              {/* Fake ECG Line for now */}
              <div className="absolute inset-0 flex items-center justify-center text-red-500 opacity-20">
                <Activity size={120} strokeWidth={0.5} />
              </div>

              <div className="absolute left-4 top-4 font-mono flex gap-6">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/45">BPM</span>
                  <b className="text-base text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]">{hr}</b>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/45">RITMO</span>
                  <b className="text-base text-red-400">{rhythm.toUpperCase()}</b>
                </div>
              </div>
              
              <div className="absolute right-4 top-4 text-red-400 animate-pulse drop-shadow-[0_0_8px_#f87171]">
                <Activity size={24} />
              </div>
            </div>

            {/* Desfibrilador */}
            <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-red-300 uppercase tracking-widest font-semibold">Desfibrilador Manual</span>
                <span className="font-mono text-sm text-red-400 font-bold">{shockPower}J</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(shockPower / 200) * 100}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button onClick={handleCharge} className="bg-white/5 hover:bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-lg border border-white/10 transition-colors">
                  Carregar 200J
                </button>
                <button onClick={handleShock} disabled={shockPower === 0} className="bg-red-500/20 hover:bg-red-500/40 text-red-200 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-lg border border-red-500/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1">
                  <Zap size={12} /> Choque
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controles Laterais */}
        <div className="hero-controls-pane">
          <div>
            <h3 className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Controles <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </h3>

            <div className="c-slider-group mb-5">
              <label>Frequência Cardíaca <span>{hr} bpm</span></label>
              <input type="range" min="20" max="200" value={hr} onChange={(e) => setHr(Number(e.target.value))} className="c-slider-input text-red-400" />
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label className="text-[11px] text-white/70 font-medium">Forçar Ritmo</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setRhythm('sinusal')} className={`cardio-btn ${rhythm === 'sinusal' ? 'on' : ''}`}>Sinusal</button>
                <button onClick={() => setRhythm('taqui')} className={`cardio-btn ${rhythm === 'taqui' ? 'on' : ''}`}>Taqui.</button>
                <button onClick={() => setRhythm('pcr')} className={`cardio-btn ${rhythm === 'pcr' ? 'on' : ''}`}>PCR (FV)</button>
                <button onClick={() => setRhythm('assistolia')} className={`cardio-btn ${rhythm === 'assistolia' ? 'on' : ''}`}>Assistolia</button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] text-white/70 font-medium">Farmacologia</label>
              <button className="cardio-btn border-orange-500/30 text-orange-200 hover:bg-orange-500/10">
                Administrar Epinefrina 1mg
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-footer relative z-20">
        <div className="title-group">
          <div className="area">Simulação Avançada</div>
          <h2>Coração</h2>
          <p>Treinamento de ACLS, arritmias e manejo hemodinâmico. Simule choques e medicações em tempo real.</p>
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
