'use client'

import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

export function MiniCapitalHumano() {
  const [pressaoMetas, setPressaoMetas] = useState(5)

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
      }
    }

    handleTelemetry()

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  const burnoutEEB = Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const climaIndex = 100 - burnoutEEB

  return (
    <>
      <div className="live-tag">
        <div className="dot" />
        <span>Pulse Surveys · Estresse · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <Users size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>Burnout EEB:</span><b>{burnoutEEB}%</b></div>
        <div><span>Turnover:</span><b>{Number(turnoverAnual).toFixed(0)}%</b></div>
        <div><span>Clima Index:</span><b>{climaIndex}/100</b></div>
      </div>
      <div className="title-area">
        <span>Comportamento & ESG</span>
        <h2><div className="indicator-box" /> Cap. Humano</h2>
      </div>
      <div className="badge">EEB {burnoutEEB}%</div>
    </>
  )
}
