'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'

export function MiniFinancas() {
  const [faturamento, setFaturamento] = useState(150)
  const [cac, setCac] = useState(350)
  const [opex, setOpex] = useState(60)
  const [clientes, setClientes] = useState(1200)
  const [pressaoMetas, setPressaoMetas] = useState(5)

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setFaturamento(telemetry.faturamento ?? 150)
        setCac(telemetry.cac ?? 350)
        setOpex(telemetry.opex ?? 60)
        setClientes(telemetry.clientes ?? 1200)
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
      }
    }

    // Initial load
    handleTelemetry()

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  // Central equations synced with HUD
  const burnoutEEB = Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const totalColaboradores = 120
  const demissoesMes = Math.round((totalColaboradores * (turnoverAnual / 100)) / 12)
  const custoTurnoverUnitario = 30
  const custoRealTurnover = demissoesMes * custoTurnoverUnitario

  const ticketMedio = (faturamento * 1000) / (clientes || 1)
  const churn = 0.025
  const ltv = ticketMedio / churn
  const ltvCac = cac > 0 ? ltv / cac : 0
  const cacTotalMensal = (clientes * churn * cac) / 1000
  const ebitda = faturamento - opex - cacTotalMensal - custoRealTurnover
  const margemEbitda = faturamento > 0 ? (ebitda / faturamento) * 100 : 0

  const capitalGiro = 850
  const burnRate = ebitda < 0 ? Math.abs(ebitda) : 0
  const runway = burnRate > 0 ? capitalGiro / burnRate : 99

  return (
    <>
      <div className="live-tag">
        <div className="dot" />
        <span>Tração Digital · 6D Feed · LIVE</span>
      </div>
      <div className="mini-bg-art">
        <TrendingUp size={48} strokeWidth={1} className="opacity-20" />
      </div>
      <div className="hud-vitals">
        <div><span>M. EBITDA:</span><b>{Number(margemEbitda).toFixed(1)}%</b></div>
        <div><span>Runway:</span><b>{runway === 99 ? 'Infinito' : `${Number(runway).toFixed(1)} Meses`}</b></div>
        <div><span>LTV/CAC:</span><b>{Number(ltvCac).toFixed(1)}x</b></div>
      </div>
      <div className="title-area">
        <span>Controladoria & Caixa</span>
        <h2><div className="indicator-box" /> Finanças</h2>
      </div>
      <div className="badge">LTV/CAC {Number(ltvCac).toFixed(1)}x</div>
    </>
  )
}
