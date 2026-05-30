'use client'

import { TrendingUp } from 'lucide-react'

export function MiniFinancas() {
  return (
    <>
      <div className="live-tag pneumo">
        <div className="dot" />
        <span>Tração Digital · 6D Feed · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <TrendingUp size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>M. EBITDA:</span><b>32%</b></div>
        <div><span>Runway:</span><b>18 Meses</b></div>
        <div><span>LTV/CAC:</span><b>4.2x</b></div>
      </div>
      <div className="title-area">
        <span>Controladoria & Caixa</span>
        <h2><div className="indicator-box" /> Finanças</h2>
      </div>
      <div className="badge">LTV/CAC 4.2x</div>
    </>
  )
}
