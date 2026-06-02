'use client'

import { Wind } from 'lucide-react'

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