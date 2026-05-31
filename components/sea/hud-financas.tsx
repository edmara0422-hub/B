'use client'

import { useEffect, useState, useMemo } from 'react'
import { MoreHorizontal, Shield, Flame, Activity, Compass } from 'lucide-react'

export function HudFinancas() {
  const [capVal, setCapVal] = useState(1000)
  const [finVal, setFinVal] = useState(1240)
  const [soldVal, setSoldVal] = useState(100)

  // Real-time API global values received via Telemetry
  const [usdRate, setUsdRate] = useState(4.98)
  const [countdown, setCountdown] = useState(10)
  const [apiLiveStatus, setApiLiveStatus] = useState('SYNCED')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) win.IPBTelemetry = {}
      win.IPBTelemetry.faturamento = Math.round(capVal / 5 + finVal / 10)
      win.IPBTelemetry.cac = Math.round(soldVal * 0.7)
      win.IPBTelemetry.opex = 60
      win.IPBTelemetry.clientes = Math.round(finVal * 1.2)
      win.IPBTelemetry.pressaoMetas = Math.round((capVal + finVal - 2240) / 100 + 5)
      window.dispatchEvent(new CustomEvent('ipb-telemetry'))
    }
  }, [capVal, finVal, soldVal])

  // Sync with global cockpit telemetry
  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        if (telemetry.usdRate !== undefined) setUsdRate(telemetry.usdRate)
        if (telemetry.countdown !== undefined) setCountdown(telemetry.countdown)
        if (telemetry.apiLiveStatus !== undefined) setApiLiveStatus(telemetry.apiLiveStatus)
      }
    }
    handleTelemetry()
    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  // Math equations based on input sliders
  const faturamento = Math.round(capVal / 5 + finVal / 10)
  const cac = Math.round(soldVal * 0.7)
  const opex = 60
  const clientes = Math.round(finVal * 1.2)
  const pressaoMetas = Math.round((capVal + finVal - 2240) / 100 + 5)
  const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const demissoesMes = Math.round((120 * (turnoverAnual / 100)) / 12)
  const ebitda = faturamento - opex - ((clientes * 0.025 * cac) / 1000) - (demissoesMes * 30)
  const margemEbitda = faturamento > 0 ? (ebitda / faturamento) * 100 : 0
  const ltvCac = cac > 0 ? (((faturamento * 1000) / (clientes || 1)) / 0.025) / cac : 0
  const runway = ebitda < 0 ? 850 / Math.abs(ebitda) : 99

  const baseBurnout = Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  const burnoutEEB = Math.round(baseBurnout * 0.65)
  const estresseEquipe = pressaoMetas * 10
  const eficienciaSaudavelVal = estresseEquipe > 0 ? (ebitda / estresseEquipe) * 10 : 0
  const selic = 14.40
  const ipca = 4.39

  const bellPath = useMemo(() => {
    const points = []
    const mean = 135
    const stdDev = 36
    for (let x = 30; x <= 240; x += 2) {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))
      const y = 80 - (70 * Math.exp(exponent))
      points.push(`${x},${y}`)
    }
    return `M 30,80 L ${points.join(' ')} L 240,80 Z`
  }, [])

  const sigmoidPath = useMemo(() => {
    const points = []
    for (let x = 30; x <= 240; x += 2) {
      const t = (x - 135) / 28
      const y = 80 - (70 / (1 + Math.exp(-t)))
      points.push(`${x},${y}`)
    }
    return `M 30,80 L ${points.join(' ')} L 240,80 Z`
  }, [])

  const triggerMetricClick = (metricId: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ipb-metric-click', { detail: { metricId } }))
    }
  }

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-4 bg-[#08080a]/85 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-xl select-none overflow-y-auto ipb-thinscroll pr-1"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .gold-slider-premium {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(210, 175, 90, 0.15);
          border-radius: 4px;
          outline: none;
        }
        .gold-slider-premium::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #d2af5a;
          border: 1.5px solid #000;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(210, 175, 90, 0.85);
          transition: transform 0.1s ease;
        }
        .gold-slider-premium::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        .rotate-y-label {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          transform-origin: center;
        }
      `}} />

      {/* Header Bicolor com Status da API e Countdown */}
      <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1.5">
        <span className="text-[11px] font-normal text-white/95 tracking-wide">
          <span className="text-[#d2af5a] font-bold">Pilar 3:</span> Finanças & Controladoria
        </span>
        <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-white/40">
          <span className={`h-1.5 w-1.5 rounded-full ${apiLiveStatus === 'FETCHING' ? 'bg-amber-400 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
          <span>API: {apiLiveStatus} ({countdown}s)</span>
        </div>
      </div>

      {/* Marcadores de saúde financeira clicáveis e unificados */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        <div 
          onClick={() => triggerMetricClick('wacc')} 
          className="py-1 px-1.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-xl cursor-pointer text-center transition-all duration-200 active:scale-95"
        >
          <span className="text-[8px] text-white/45 uppercase block font-mono tracking-wider">WACC</span>
          <span className="text-[12.5px] font-bold text-[#d2af5a] font-mono">17.2%</span>
        </div>
        <div 
          onClick={() => triggerMetricClick('ltv_cac')} 
          className="py-1 px-1.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-xl cursor-pointer text-center transition-all duration-200 active:scale-95"
        >
          <span className="text-[8px] text-white/45 uppercase block font-mono tracking-wider">LTV / CAC</span>
          <span className="text-[12.5px] font-bold text-[#d2af5a] font-mono">{ltvCac.toFixed(1)}x</span>
        </div>
        <div 
          onClick={() => triggerMetricClick('ebitda')} 
          className="py-1 px-1.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-xl cursor-pointer text-center transition-all duration-200 active:scale-95"
        >
          <span className="text-[8px] text-white/45 uppercase block font-mono tracking-wider">EBITDA %</span>
          <span className="text-[12.5px] font-bold text-[#d2af5a] font-mono">{margemEbitda.toFixed(1)}%</span>
        </div>
        <div 
          onClick={() => triggerMetricClick('juros_real')} 
          className="py-1 px-1.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-xl cursor-pointer text-center transition-all duration-200 active:scale-95"
        >
          <span className="text-[8px] text-white/45 uppercase block font-mono tracking-wider">USD API</span>
          <span className="text-[12.5px] font-bold text-[#d2af5a] font-mono">R$ {usdRate.toFixed(4)}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-2 overflow-visible">
        {/* Sliders de Mesa de Controle do Mockup */}
        <div className="space-y-1">
          {/* Cap */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[9px] font-light text-white/55">Cap (Investimento)</span>
              <span className="text-[10px] font-semibold text-[#d2af5a]">{capVal}</span>
            </div>
            <input type="range" min="100" max="2000" step="10" value={capVal} onChange={(e) => setCapVal(Number(e.target.value))} className="gold-slider-premium" />
          </div>

          {/* Fin */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[9px] font-light text-white/55">Fin (Captação)</span>
              <span className="text-[10px] font-semibold text-[#d2af5a]">{finVal}</span>
            </div>
            <input type="range" min="100" max="2000" step="10" value={finVal} onChange={(e) => setFinVal(Number(e.target.value))} className="gold-slider-premium" />
          </div>

          {/* Sold */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[9px] font-light text-white/55">Sold (Volume Vendas)</span>
              <span className="text-[10px] font-semibold text-[#d2af5a]">${soldVal}</span>
            </div>
            <input type="range" min="10" max="1000" step="5" value={soldVal} onChange={(e) => setSoldVal(Number(e.target.value))} className="gold-slider-premium" />
          </div>
        </div>

        {/* Eixos de Curvas de Telemetria com Tooltips do Mockup */}
        <div className="flex-1 flex flex-col space-y-2.5 pt-1.5 border-t border-white/5">
          {/* 1. Probability Density */}
          <div className="relative w-full h-[65px] flex items-center pr-2">
            <div className="w-[18px] flex items-center justify-center text-[5.5px] uppercase font-bold text-white/35 tracking-widest rotate-y-label">
              Density
            </div>
            <div className="flex-1 h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 260 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d2af5a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#d2af5a" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                <line x1="30" y1="80" x2="245" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                <line x1="30" y1="10" x2="30" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                <line x1="30" y1="45" x2="245" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="135" y1="10" x2="135" y2="80" stroke="rgba(210,175,90,0.22)" strokeWidth="0.8" strokeDasharray="2,2" />
                <path d={bellPath} fill="url(#bellGrad)" />
                <path d={bellPath} fill="none" stroke="#d2af5a" strokeWidth="1.2" />
                <circle cx="85" cy="62" r="1.5" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
                <circle cx="185" cy="62" r="1.5" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
                {['-3', '-2', '-1', '0', '1', '2', '3'].map((lbl, idx) => (
                  <text key={idx} x={30 + idx * 35} y="88" fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="middle" fontFamily="monospace">{lbl}</text>
                ))}
                {['0', '0.1', '0.2', '0.3', '0.4'].map((lbl, idx) => (
                  <text key={idx} x="24" y={80 - idx * 16.5 + 2} fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="end" fontFamily="monospace">{lbl}</text>
                ))}
              </svg>
              {/* Tooltip do Mockup */}
              <div className="absolute left-[54%] top-[1%] pointer-events-none text-[5.5px] font-mono text-[#d2af5a] bg-[#070708]/95 px-1.5 py-0.5 rounded border border-[#d2af5a]/30 shadow-md">
                Probability density = 0.930
              </div>
            </div>
          </div>
          <div className="text-[6px] uppercase text-white/35 font-bold tracking-[0.15em] text-center w-full mt-[-8px]">
            Probability density
          </div>

          {/* 2. Cumulative Forecast */}
          <div className="relative w-full h-[65px] flex items-center pr-2">
            <div className="w-[18px] flex items-center justify-center text-[5.5px] uppercase font-bold text-white/35 tracking-widest rotate-y-label">
              Cumulative forecast
            </div>
            <div className="flex-1 h-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 260 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sigmoidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d2af5a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#d2af5a" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                <line x1="30" y1="80" x2="245" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                <line x1="30" y1="10" x2="30" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
                <line x1="30" y1="45" x2="245" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="135" y1="10" x2="135" y2="80" stroke="rgba(210,175,90,0.15)" strokeWidth="0.8" strokeDasharray="2,2" />
                <path d={sigmoidPath} fill="url(#sigmoidGrad)" />
                <path d={sigmoidPath} fill="none" stroke="#d2af5a" strokeWidth="1.2" />
                <circle cx="160" cy="28" r="1.5" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
                <circle cx="110" cy="62" r="1.5" fill="#fff" stroke="#d2af5a" strokeWidth="0.8" />
                {['-30', '-20', '-10', '0', '10', '20', '30'].map((lbl, idx) => (
                  <text key={idx} x={30 + idx * 35} y="88" fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="middle" fontFamily="monospace">{lbl}</text>
                ))}
                {['0', '25', '50', '75', '100'].map((lbl, idx) => (
                  <text key={idx} x="24" y={80 - idx * 16.5 + 2} fill="rgba(255,255,255,0.25)" fontSize="5.5" textAnchor="end" fontFamily="monospace">{lbl}</text>
                ))}
              </svg>
              {/* Tooltips do Mockup */}
              <div className="absolute left-[33%] top-[45%] pointer-events-none text-[5.5px] font-mono text-[#d2af5a] bg-[#070708]/95 px-1.5 py-0.5 rounded border border-[#d2af5a]/30 shadow-md">
                Lignaà: 0.17%
              </div>
              <div className="absolute right-[21%] top-[24%] pointer-events-none text-[5.5px] font-mono text-[#d2af5a] bg-[#070708]/95 px-1.5 py-0.5 rounded border border-[#d2af5a]/30 shadow-md">
                Sigmoid: 0.35%
              </div>
            </div>
          </div>
          <div className="text-[6px] uppercase text-white/35 font-bold tracking-[0.15em] text-center w-full mt-[-8px]">
            Forecast (mnh)
          </div>
        </div>

        {/* NOVO: Glossário de Tomada de Decisão & Lógica IA */}
        <div className="border-t border-white/10 pt-4 mt-4 select-none space-y-4">
          <span className="block text-[10px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider border-b border-white/5 pb-1">
            🛰️ CENTRAL DE TOMADA DE DECISÃO COGNITIVA & AVALIAÇÃO DE RISCOS (SWOT/PESTEL VIVA)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bloco 1: WACC */}
            <div className="p-3 bg-black/60 border border-[#d2af5a]/15 rounded-xl text-left space-y-2 text-[9px] text-white/70 leading-relaxed font-sans">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-[9.5px]">📊 WACC (Custo Médio Ponderado de Capital)</span>
                <span className="text-[#d2af5a] font-mono font-bold">17.2% no Brasil</span>
              </div>
              <p>
                <strong>O que é e para que serve:</strong> É o custo real para a empresa captar dinheiro para funcionar. Se o WACC for maior que o retorno que o negócio dá, a empresa está destruindo valor.
              </p>
              
              <div className="flex items-center justify-center bg-black/40 border border-white/5 py-1 px-2 my-1 rounded font-mono text-[9px] text-[#d2af5a] font-bold">
                <span>WACC = </span>
                <div className="flex flex-col items-center mx-1">
                  <span className="border-b border-[#d2af5a] px-1 pb-[1px]">E</span>
                  <span className="pt-[1px]">V</span>
                </div>
                <span className="mx-0.5">· K<sub>e</sub> +</span>
                <div className="flex flex-col items-center mx-1">
                  <span className="border-b border-[#d2af5a] px-1 pb-[1px]">D</span>
                  <span className="pt-[1px]">V</span>
                </div>
                <span className="mx-0.5">· K<sub>d</sub> · (1 - T<sub>c</sub>)</span>
              </div>
              <div className="text-[7.5px] text-white/40 font-mono text-center">
                (E = Cap. Próprio, D = Cap. Terceiros, V = E+D, K<sub>e</sub> = Custo Cap. Próprio, K<sub>d</sub> = Custo Dívida, T<sub>c</sub> = Imposto)
              </div>

              <p className="border-t border-white/5 pt-1.5 text-[8.5px]">
                <strong>Como cruzar:</strong> Cruze o WACC com a SELIC. Com a SELIC em <b className="text-white">14.40%</b>, o custo da dívida (K<sub>d</sub>) explode, empurrando o WACC para cima e inviabilizando empréstimos bancários PJ, forçando a empresa a focar em geração de caixa próprio.
              </p>
            </div>

            {/* Bloco 2: LTV / CAC */}
            <div className="p-3 bg-black/60 border border-[#d2af5a]/15 rounded-xl text-left space-y-2 text-[9px] text-white/70 leading-relaxed font-sans">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-[9.5px]">🚀 LTV / CAC (Índice de Eficiência de Tração)</span>
                <span className="text-[#d2af5a] font-mono font-bold">Atual: {ltvCac.toFixed(2)}x</span>
              </div>
              <p>
                <strong>O que é e para que serve:</strong> É a métrica de sobrevivência de qualquer plataforma ou produto digital. Mostra se o cliente se paga e deixa lucro ao longo do tempo. O ideal de mercado é acima de <b>3.2x</b>.
              </p>

              <div className="flex items-center justify-center bg-black/40 border border-white/5 py-1 px-2 my-1 rounded font-mono text-[9px] text-[#d2af5a] font-bold">
                <span>LTV = </span>
                <div className="flex flex-col items-center mx-1">
                  <span className="border-b border-[#d2af5a] px-1 pb-[1px]">ARPU · Margem</span>
                  <span className="pt-[1px]">Churn</span>
                </div>
                <span className="mx-2">;</span>
                <span>Eficiência = </span>
                <div className="flex flex-col items-center mx-1">
                  <span className="border-b border-[#d2af5a] px-1 pb-[1px]">LTV</span>
                  <span className="pt-[1px]">CAC</span>
                </div>
              </div>

              <p className="border-t border-white/5 pt-1.5 text-[8.5px]">
                <strong>Como cruzar:</strong> Cruze o CAC com o leilão de mídia (Meta Ads vs. TikTok Ads). Se o CPM do Meta está em R$ 14,20 e o do TikTok está mais baixo, a regra de decisão inteligente do sistema manda o orçamento para o canal mais barato imediatamente para amortizar o CAC e proteger o caixa.
              </p>
            </div>

            {/* Bloco 3: EBITDA */}
            <div className="p-3 bg-black/60 border border-[#d2af5a]/15 rounded-xl text-left space-y-2 text-[9px] text-white/70 leading-relaxed font-sans">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-[9.5px]">💸 EBITDA (Margem e Saúde Operacional)</span>
                <span className="text-[#d2af5a] font-mono font-bold">Atual: {margemEbitda.toFixed(1)}%</span>
              </div>
              <p>
                <strong>O que é e para que serve:</strong> Mede a pura saúde operacional da empresa, sem contar o peso dos impostos e das dívidas que ela tem. Mostra se o coração do negócio é viável.
              </p>

              <div className="flex items-center justify-center bg-black/40 border border-white/5 py-2 px-2 my-1 rounded font-mono text-[9px] text-[#d2af5a] font-bold text-center">
                EBITDA = Lucro Líquido + Juros + Impostos + Depreciação + Amortização
              </div>

              <p className="border-t border-white/5 pt-1.5 text-[8.5px]">
                <strong>Como cruzar:</strong> Conecte o EBITDA ao Burnout. Empresas que aumentam o EBITDA esfolando a saúde mental da equipe têm um teto de crescimento rápido, pois o Turnover subsequente (custando R$ 30k por demissão) destrói a margem operacional nos meses seguintes.
              </p>
            </div>

            {/* Bloco 4: Taxa Real de Juros */}
            <div className="p-3 bg-black/60 border border-[#d2af5a]/15 rounded-xl text-left space-y-2 text-[9px] text-white/70 leading-relaxed font-sans">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-[9.5px]">📈 Taxa Real de Juros (Fisher Equation)</span>
                <span className="text-[#d2af5a] font-mono font-bold">Real: ~10.01% a.a.</span>
              </div>
              <p>
                <strong>O que é e para que serve:</strong> É o juro descontado da inflação. Serve para decidir se vale a pena arriscar o capital abrindo/expandindo uma empresa física ou se é mais lucrativo deixar o caixa rendendo no banco.
              </p>

              <div className="flex items-center justify-center bg-black/40 border border-white/5 py-1.5 px-2 my-1 rounded font-mono text-[9px] text-[#d2af5a] font-bold">
                <span>1 + Juro Real = </span>
                <div className="flex flex-col items-center mx-1">
                  <span className="border-b border-[#d2af5a] px-1 pb-[1px]">1 + SELIC (14.40%)</span>
                  <span className="pt-[1px]">1 + IPCA (4.39%)</span>
                </div>
              </div>

              <p className="border-t border-white/5 pt-1.5 text-[8.5px]">
                <strong>Como cruzar:</strong> Cruza-se com o CAPEX/Receita. Com juros reais a pesados ~10%, as empresas travam expansões físicas complexas (CAPEX) e focam 100% em eficiência digital e automações baseadas em IA para reduzir despesas de forma imediata.
              </p>
            </div>

            {/* Bloco 5: Equilíbrio Vida vs Trabalho (Eu Integral) */}
            <div className="p-3 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl text-left space-y-2 text-[9px] text-white/70 leading-relaxed font-sans">
              <span className="block font-bold text-white text-[9.5px] uppercase tracking-wide">🌿 EQUILÍBRIO VIDA vs TRABALHO ("EU INTEGRAL")</span>
              <p>
                O sistema cruza filosofia humanizada com dados brutos de gestão, criando métricas que impedem o colapso operacional invisível:
              </p>
              
              <div className="flex items-center justify-center bg-black/40 border border-white/5 py-1 px-2 my-1 rounded font-mono text-[9px] text-[#d2af5a] font-bold">
                <span>Eficiência Saudável = </span>
                <div className="flex flex-col items-center mx-1">
                  <span className="border-b border-[#d2af5a] px-1 pb-[1px]">EBITDA Gerado (R$ {ebitda.toFixed(0)}k)</span>
                  <span className="pt-[1px]">Estresse da Equipe ({estresseEquipe}%)</span>
                </div>
                <span className="mx-1">=</span>
                <span className="text-white">{eficienciaSaudavelVal.toFixed(2)}</span>
              </div>

              <p className="text-[8.5px] border-t border-white/5 pt-1.5">
                {burnoutEEB >= 30 ? (
                  <span className="text-[#fac775]">⚠️ <b>ALERTA DE GOVERNANÇA:</b> O faturamento subiu, mas o estresse e a ansiedade da equipe romperam a banda saudável. O crescimento atual é <b>INSUSTENTÁVEL</b> a médio prazo! Risco iminente de turnover em massa e passivos. A IA sugere rodízio urgente ou aplicação da escala.</span>
                ) : (
                  <span className="text-emerald-400">✅ <b>CLIMA OPERACIONAL SAUDÁVEL:</b> O estresse coletivo está sob controle ({estresseEquipe}%). O crescimento é estável, garantindo a produtividade de longo prazo sem queimar o ativo humano.</span>
                )}
              </p>
            </div>

            {/* Bloco 6: Tomada de Decisão, Risco & SWOT/PESTEL */}
            <div className="p-3 bg-[#070708] border border-[#d2af5a]/15 rounded-xl text-left space-y-2 text-[9px] text-white/70 leading-relaxed font-sans flex flex-col justify-between">
              <div>
                <span className="block font-bold text-[#d2af5a] text-[9.5px] uppercase tracking-wide">🛡️ INTELIGÊNCIA SWOT, PESTEL & SEGURANÇA</span>
                <p className="text-[8.5px] mt-1 text-white/80">
                  A IA não apenas calcula, ela **avalia riscos de forma cruzada** para blindar o negócio:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[7.8px] bg-black/35 p-1.5 rounded border border-white/5">
                <div>
                  <b className="text-white block font-mono">SWOT VIVA:</b>
                  <span>• <i>Força:</i> LTV/CAC ótimo ({ltvCac.toFixed(1)}x)<br/>• <i>Fraqueza:</i> Estresse elevado ({estresseEquipe}%) afeta EBITDA.<br/>• <i>Ameaça:</i> Selic a 14.40% encarece capital.</span>
                </div>
                <div>
                  <b className="text-white block font-mono">PESTEL 6D:</b>
                  <span>• <i>Econômico:</i> Juros Reais a 10.01% travan CAPEX.<br/>• <i>Social:</i> Síndrome Maslach avaliada via NLP.<br/>• <i>Legal:</i> Sandbox da ANPD & LGPD.</span>
                </div>
              </div>

              <p className="text-[8px] text-white/50 border-t border-white/5 pt-1">
                <b>Segurança Ativa:</b> A inteligência cognitiva monitora e cruza dados macro (PESTEL) e internos (SWOT) para desviar verbas ineficientes e criar colchões de liquidez protetores de caixa.
              </p>
            </div>
          </div>

          {/* Seção da Lógica Executada pela IA em Python */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-[#070708] border border-[#d2af5a]/15 rounded-xl text-left space-y-2">
              <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider">🛰️ REAL-TIME AI COGNITIVE LOGIC (RULES ENGINE)</span>
              
              <div className="bg-black/60 rounded-lg p-2.5 font-mono text-[8.2px] text-[#d2af5a]/90 space-y-1.5 border border-white/5 leading-normal overflow-x-auto">
                <div className="text-white/45 text-[7px] uppercase tracking-widest border-b border-white/5 pb-1 mb-1 font-bold">Lógica de Decisão Executada pela IA da Plataforma:</div>
                <div>
                  <span className="text-purple-400">se</span> SELIC &gt; <span className="text-amber-400">14.0</span> <span className="text-purple-400">e</span> Capital_de_Giro_Disponivel == <span className="text-green-400">"Alto"</span>:
                </div>
                <div className="pl-4">
                  Acao_Automatizada(<span className="text-green-400">"Alocar 40% do caixa livre em investimentos atrelados ao CDI"</span>)
                </div>
                <div className="pl-4">
                  Mensagem_ao_Lider(
                </div>
                <div className="pl-8 text-white/70">
                  "A taxa real de juros do país está em <span className="text-amber-400">10.01%</span>.<br/>
                  Deixar o dinheiro rendendo no banco é mais seguro e lucrativo<br/>
                  do que expandir a operação física ou contrair dívidas<br/>
                  bancárias PJ que custariam ~36.0% a.a."
                </div>
                <div className="pl-4">
                  )
                </div>
              </div>
            </div>

            {/* Decisão Estratégica Aplicada ao Vivo */}
            <div className="p-3 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl text-left flex flex-col justify-between select-none">
              <div>
                <span className="text-[#d2af5a] font-bold font-mono text-[8px] uppercase tracking-wider block">Decisão Estratégica Tomada ao Vivo pela IA:</span>
                <p className="text-[8.5px] text-white/75 mt-1.5 leading-relaxed font-sans">
                  {selic > 14.0 && capVal > 800 ? (
                    <span>
                      💰 <b>CDI Hedge Ativo:</b> SELIC a 14.40% identificada. Com Capital de Giro Alto (Cap em {capVal}), a IA programou a alocação de 40% do caixa excedente no CDI, rendendo juros reais de 10.01% sem qualquer risco de mercado.
                    </span>
                  ) : (
                    <span>
                      ⚠️ <b>Alocação Conservadora:</b> Caixa abaixo do patamar ideal de expansão. A IA recomenda suspender contratações e manter capital em liquidez diária.
                    </span>
                  )}
                </p>
              </div>

              <div className="p-2 bg-black/40 rounded border border-white/5 text-[8.2px] font-mono text-[#d2af5a] mt-2">
                📢 <b>Arbitragem de Marketing:</b> O CAC simulado é <b>R$ {cac}</b>. O leilão de mídia em tempo real sinaliza CPM menor no TikTok Ads vs. Meta Ads (R$ 14.20). A regra inteligente iniciou a realocação orçamentária imediata.
              </div>
            </div>
          </div>
        </div>

        {/* Simulador Financeiro Ativo */}
        <div className="p-2.5 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl text-left select-none shrink-0">
          <div className="text-[7.5px] uppercase font-mono tracking-widest text-[#d2af5a] font-bold mb-1 flex justify-between">
            <span>Simulação Financeira Ativa</span>
            <span className="animate-pulse">● LIVE INTERACTIVE</span>
          </div>
          <p className="text-[8.5px] text-white/70 leading-relaxed font-mono">
            Com faturamento simulado em <b className="text-white">R$ {faturamento}k</b> e CAC em <b className="text-white">R$ {cac}</b>, seu LTV/CAC atual é de <b className="text-[#d2af5a]">{ltvCac.toFixed(1)}x</b>. A queima mensal pelo opex/turnover gera runway de <b className="text-white">{ebitda < 0 ? runway.toFixed(1) + 'm' : 'Infinito'}</b>. O EBITDA Líquido está em <b className="text-[#d2af5a]">{margemEbitda.toFixed(1)}%</b>.
          </p>
        </div>
      </div>
    </div>
  )
}
