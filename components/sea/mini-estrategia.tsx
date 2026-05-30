'use client'

import { Globe } from 'lucide-react'

export function MiniEstrategia() {
  return (
    <>
      <div className="live-tag cardio">
        <div className="dot" />
        <span>PESTEL Index · Real-Time · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <Globe size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>SELIC:</span><b>14.40%</b></div>
        <div><span>IPCA:</span><b>4.39%</b></div>
        <div><span>USD/BRL:</span><b>R$ 4.98</b></div>
      </div>
      <div className="title-area">
        <span>Ambiente & Tendências</span>
        <h2><div className="indicator-box" /> Estratégia</h2>
      </div>
      <div className="badge">SELIC 14.4%</div>
    </>
  )
}
