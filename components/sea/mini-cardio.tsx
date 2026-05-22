'use client'

import { Activity } from 'lucide-react'

export function MiniCardio() {
  return (
    <>
      <div className="live-tag cardio">
        <div className="dot" />
        <span>Ciclo ECG · 1 Hz · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <Activity size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>FC:</span><b>72 bpm</b></div>
        <div><span>SpO2:</span><b>98%</b></div>
        <div><span>MAP:</span><b>90 mmHg</b></div>
      </div>
      <div className="title-area">
        <span>Sistema Cardíaco</span>
        <h2><div className="indicator-box" /> Coração</h2>
      </div>
      <div className="badge">72 BPM</div>
    </>
  )
}
