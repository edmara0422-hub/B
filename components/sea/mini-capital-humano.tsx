'use client'

import { Users } from 'lucide-react'

export function MiniCapitalHumano() {
  return (
    <>
      <div className="live-tag neuro">
        <div className="dot" />
        <span>Pulse Surveys · Estresse · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <Users size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>Burnout EEB:</span><b>12%</b></div>
        <div><span>Turnover:</span><b>38%</b></div>
        <div><span>Clima:</span><b>Estável</b></div>
      </div>
      <div className="title-area">
        <span>Comportamento & ESG</span>
        <h2><div className="indicator-box" /> Cap. Humano</h2>
      </div>
      <div className="badge">EEB 12%</div>
    </>
  )
}
