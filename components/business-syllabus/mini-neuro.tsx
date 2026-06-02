'use client'

import { Brain } from 'lucide-react'

export function MiniNeuro() {
  return (
    <>
      <div className="live-tag neuro">
        <div className="dot" />
        <span>EEG Monitor · 10 Hz · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <Brain size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>GCS:</span><b>15</b></div>
        <div><span>EEG:</span><b>14 Hz</b></div>
        <div><span>Estímulo:</span><b>Normal</b></div>
      </div>
      <div className="title-area">
        <span>Sistema Neural</span>
        <h2><div className="indicator-box" /> Neuro</h2>
      </div>
      <div className="badge">EEG 14 Hz</div>
    </>
  )
}