'use client'

import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'

export function MiniEstrategia() {
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setCenario(telemetry.cenario ?? 'normal')
      }
    }

    handleTelemetry()

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  const selic = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39
  const politicoScore = cenario === 'juros_altos' ? 30 : 55
  const economicoScore = cenario === 'juros_altos' ? 20 : 45
  const socialScore = cenario === 'ia_boom' ? 88 : 65
  const tecnologicoScore = cenario === 'ia_boom' ? 98 : 80
  const ecol_legalScore = 75
  const averagePestel = Math.round((politicoScore + economicoScore + socialScore + tecnologicoScore + ecol_legalScore) / 5)

  return (
    <>
      <div className="live-tag">
        <div className="dot" />
        <span>PESTEL Index · Real-Time · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <Globe size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>SELIC:</span><b>{Number(selic).toFixed(2)}%</b></div>
        <div><span>IPCA:</span><b>{Number(ipca).toFixed(2)}%</b></div>
        <div><span>PESTEL:</span><b>{averagePestel}%</b></div>
      </div>
      <div className="title-area">
        <span>Ambiente & Tendências</span>
        <h2><div className="indicator-box" /> Estratégia</h2>
      </div>
      <div className="badge">SELIC {Number(selic).toFixed(1)}%</div>
    </>
  )
}
