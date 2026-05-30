'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { TrendingUp, AlertTriangle, CheckCircle2, Terminal as TerminalIcon } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export function HudFinancas() {
  // Sliders Dourados Premium (Mockup DESEMPENHO FINANCEIRO)
  const [ebitdaMargin, setEbitdaMargin] = useState(83.5) // em %
  const [revenueGrowth, setRevenueGrowth] = useState(12.5) // em %
  const [opexSlider, setOpexSlider] = useState(27.0) // em $M
  const [cashFlowSlider, setCashFlowSlider] = useState(50.4) // em $M

  // Variáveis vindas de outros módulos (via Telemetria Global)
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  // Logs do Terminal de Controle
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Inicializando IPB Controladoria & Tração 6D Engine...',
    '[SGS] Conectado ao Sistema de Expectativas de Mercado do Bacen.',
    '[VERTEX] Carregando modelo Monte Carlo de projeção financeira...'
  ])

  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Cálculos Macroeconômicos baseados no cenário
  const selic = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39
  const jurosReais = Number(((1 + selic / 100) / (1 + ipca / 100) - 1) * 100)
  const wacc = cenario === 'juros_altos' ? 18.9 : 17.2

  // 1. Cascata 1 & 3: Integração direta com Burnout (Capital Humano)
  const burnoutEEB = Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const totalColaboradores = 120
  const demissoesMes = Math.round((totalColaboradores * (turnoverAnual / 100)) / 12)
  const custoTurnoverUnitario = 30 // k R$
  const custoRealTurnover = demissoesMes * custoTurnoverUnitario // k R$

  // --- TELEMETRIA GLOBAL: Sincronização em Tempo Real ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) {
        win.IPBTelemetry = {
          faturamento: 150,
          cac: 350,
          opex: 60,
          clientes: 1200,
          pressaoMetas: 5,
          cenario: 'normal',
          climaFrequencia: 14,
          metaBudgetPercent: 80
        }
      } else {
        win.IPBTelemetry = {
          faturamento: 150,
          cac: 350,
          opex: 60,
          clientes: 1200,
          pressaoMetas: 5,
          cenario: 'normal',
          climaFrequencia: 14,
          metaBudgetPercent: 80,
          ...win.IPBTelemetry
        }
      }
      
      // Atualiza estado local inicial a partir do global
      setPressaoMetas(win.IPBTelemetry.pressaoMetas ?? 5)
      setCenario(win.IPBTelemetry.cenario ?? 'normal')
    }

    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
        setCenario(telemetry.cenario ?? 'normal')
      }
    }

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  const updateTelemetry = (updates: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      const win = window as any
      win.IPBTelemetry = { ...win.IPBTelemetry, ...updates }
      window.dispatchEvent(new CustomEvent('ipb-telemetry'))
    }
  }

  // Sincroniza novos sliders com variáveis antigas da telemetria para compatibilidade retroativa
  useEffect(() => {
    const virtualFaturamento = Math.round(cashFlowSlider * 2.5 + revenueGrowth * 10)
    const virtualOpex = Math.round(opexSlider * 2.2)
    const virtualCac = Math.round((opexSlider * 12) / (revenueGrowth || 1) + 200)
    const virtualClientes = 1000 + Math.round(revenueGrowth * 95)

    updateTelemetry({
      faturamento: virtualFaturamento,
      opex: virtualOpex,
      cac: virtualCac,
      clientes: virtualClientes
    })
  }, [ebitdaMargin, revenueGrowth, opexSlider, cashFlowSlider])

  // --- TERMINAL LOGS GENERATOR ---
  useEffect(() => {
    const safeMargem = Number(ebitdaMargin || 0)
    const safeGrowth = Number(revenueGrowth || 0)
    const safeOpex = Number(opexSlider || 0)
    const safeCash = Number(cashFlowSlider || 0)
    const safeWacc = Number(wacc || 0)
    const safeJuros = Number(jurosReais || 0)

    const messages = [
      `EBITDA Margin recalibrada: ${safeMargem.toFixed(1)}%`,
      `Projeção de Crescimento anual indexada a +${safeGrowth.toFixed(1)}%`,
      `Simulando impacto de OPEX estrutural em $${safeOpex.toFixed(1)}M`,
      `Fluxo de Caixa livre operacionalizado em $${safeCash.toFixed(1)}M`,
      `Processando iterações Monte Carlo com WACC de ${safeWacc.toFixed(1)}%`,
      `Curva Gaussiana centralizada em μ=${safeMargem.toFixed(1)}% com desvio de σ=10.0`,
      `Alerta de esgotamento: Burnout Coletivo calculado em ${burnoutEEB}%`,
      `SELIC nominal a ${selic.toFixed(2)}%. Juros reais projetados: ${safeJuros.toFixed(2)}%`,
    ]

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      const timestamp = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomMsg}`])
    }, 4500)

    return () => clearInterval(interval)
  }, [ebitdaMargin, revenueGrowth, opexSlider, cashFlowSlider, wacc, jurosReais, burnoutEEB])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // --- MODELAGEM MATEMÁTICA PARA GRÁFICOS RECHARTS ---

  // 1. Gaussiana (Probability Density Bell Curve) baseada em ebitdaMargin
  const probabilityData = useMemo(() => {
    const data = []
    const mean = ebitdaMargin
    const stdDev = 5
    const startX = Math.max(40, mean - 15)
    const endX = Math.min(100, mean + 15)
    
    for (let x = startX; x <= endX; x += 1) {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent) * 5
      data.push({
        x: Math.round(x) + '%',
        y: Number(y.toFixed(3))
      })
    }
    return data
  }, [ebitdaMargin])

  // 2. Sigmóide (Cumulative Forecast S-Curve) baseada em cashFlowSlider
  const cumulativeData = useMemo(() => {
    const data = []
    const x0 = cashFlowSlider
    const startX = Math.max(10, x0 - 30)
    const endX = Math.min(200, x0 + 30)

    for (let x = startX; x <= endX; x += 5) {
      const y = 1 / (1 + Math.exp(-0.15 * (x - x0)))
      data.push({
        x: Math.round(x) + '%',
        y: Number(y.toFixed(2))
      })
    }
    return data
  }, [cashFlowSlider])

  // 3. EBITDA Forecast 2024 Timeline (Confidence Interval Band)
  const forecastData = useMemo(() => {
    const scalePoints = [180, 160, 180, 200, 220, 240, 260]
    const baseValue = cashFlowSlider * 3.8
    const growth = 1 + (revenueGrowth / 100)

    return scalePoints.map((xVal, index) => {
      const t = index / 6
      const projected = baseValue * Math.pow(growth, t) * (1 + 0.02 * Math.sin(t * Math.PI))
      const lower = projected * (0.88 - 0.02 * t)
      const upper = projected * (1.12 + 0.02 * t)
      
      return {
        month: `$${xVal}M`,
        projected: Number(projected.toFixed(1)),
        lower: Number(lower.toFixed(1)),
        upper: Number(upper.toFixed(1))
      }
    })
  }, [cashFlowSlider, revenueGrowth])

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#0a0a0c]/90 border border-[#d4b87a]/15 rounded-3xl backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <style dangerouslySetInnerHTML={{ __html: `
        .gold-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(212, 184, 122, 0.15);
          border-radius: 4px;
          outline: none;
        }
        .gold-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #d4b87a;
          border: 2px solid #000;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(212, 184, 122, 0.8);
          transition: transform 0.15s ease, background-color 0.15s ease;
        }
        .gold-slider::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          background: #e5cb93;
        }
        .recharts-default-tooltip {
          background-color: rgba(10, 8, 5, 0.9) !important;
          border: 1px solid rgba(212, 184, 122, 0.3) !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
        }
      `}} />

      {/* Header Premium */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
        <h2 className="text-white text-base font-semibold tracking-wider select-none uppercase">DESEMPENHO FINANCEIRO</h2>
        <span className="text-[9px] font-mono text-[#d4b87a] uppercase tracking-widest bg-[#d4b87a]/10 px-2 py-0.5 rounded-full">FN-01 • ACTIVE 6D</span>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-5">
        
        {/* Sliders Dourados do Mockup */}
        <div className="space-y-4">
          
          {/* Slider 1: EBITDA Margin */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">EBITDA Margin</span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded">83.5</span>
                <span className="text-xs font-mono font-bold text-[#d4b87a]">{ebitdaMargin.toFixed(1)}%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="30" 
              max="95" 
              step="0.5" 
              value={ebitdaMargin} 
              onChange={(e) => setEbitdaMargin(Number(e.target.value))}
              className="gold-slider"
            />
          </div>

          {/* Slider 2: Revenue Growth */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Revenue Growth</span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded">+1200</span>
                <span className="text-xs font-mono font-bold text-[#d4b87a]">+{revenueGrowth.toFixed(1)}%</span>
              </div>
            </div>
            <input 
              type="range" 
              min="2" 
              max="45" 
              step="0.5" 
              value={revenueGrowth} 
              onChange={(e) => setRevenueGrowth(Number(e.target.value))}
              className="gold-slider"
            />
          </div>

          {/* Slider 3: OPEX */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">OPEX</span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded">27.0</span>
                <span className="text-xs font-mono font-bold text-[#d4b87a]">${opexSlider.toFixed(1)}M</span>
              </div>
            </div>
            <input 
              type="range" 
              min="5" 
              max="80" 
              step="0.5" 
              value={opexSlider} 
              onChange={(e) => setOpexSlider(Number(e.target.value))}
              className="gold-slider"
            />
          </div>

          {/* Slider 4: Cash Flow */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Cash Flow</span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded">50.4</span>
                <span className="text-xs font-mono font-bold text-[#d4b87a]">${cashFlowSlider.toFixed(1)}M</span>
              </div>
            </div>
            <input 
              type="range" 
              min="10" 
              max="180" 
              step="0.5" 
              value={cashFlowSlider} 
              onChange={(e) => setCashFlowSlider(Number(e.target.value))}
              className="gold-slider"
            />
          </div>

        </div>

        {/* EBITDA Simulation (Lado a Lado) */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10.5px] uppercase font-bold text-white tracking-widest">EBITDA Simulation</span>
            <span className="text-[8px] uppercase font-bold text-white/40 tracking-wider bg-white/5 px-2 py-0.5 rounded">Cumulative forecast</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            
            {/* Probability Density (Bell Curve) */}
            <div className="flex flex-col h-[110px]">
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={probabilityData} margin={{ top: 5, right: 5, left: -32, bottom: 0 }}>
                    <defs>
                      <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4b87a" stopOpacity={0.22}/>
                        <stop offset="95%" stopColor="#d4b87a" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(212, 184, 122, 0.05)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="x" stroke="rgba(255,255,255,0.2)" fontSize={7.5} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={7.5} tickLine={false} />
                    <Area type="monotone" dataKey="y" stroke="#d4b87a" strokeWidth={1.5} fillOpacity={1} fill="url(#bellGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-[7.5px] font-semibold text-center text-white/40 tracking-wider mt-1 uppercase">Probability Density</span>
            </div>

            {/* Cumulative Forecast (Sigmoid) */}
            <div className="flex flex-col h-[110px]">
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cumulativeData} margin={{ top: 5, right: 5, left: -32, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sigmoidGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4b87a" stopOpacity={0.22}/>
                        <stop offset="95%" stopColor="#d4b87a" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(212, 184, 122, 0.05)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="x" stroke="rgba(255,255,255,0.2)" fontSize={7.5} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={7.5} tickLine={false} />
                    <Area type="monotone" dataKey="y" stroke="#d4b87a" strokeWidth={1.5} fillOpacity={1} fill="url(#sigmoidGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-[7.5px] font-semibold text-center text-white/40 tracking-wider mt-1 uppercase">Cumulative Forecast</span>
            </div>

          </div>
        </div>

        {/* EBITDA FORECAST 2024 (Full Width com Banda de Projeção Dourada) */}
        <div className="flex flex-col h-[150px] border-t border-white/5 pt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10.5px] uppercase font-bold text-white tracking-widest">EBITDA FORECAST 2024</span>
            <span className="text-[8px] uppercase font-bold text-white/40 tracking-wider bg-white/5 px-2 py-0.5 rounded">Confidence Interval</span>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4b87a" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#d4b87a" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(212, 184, 122, 0.04)" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={8} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={8} tickLine={false} domain={[100, 300]} ticks={[100, 150, 200, 225, 300]} />
                {/* Banda de Confiança */}
                <Area type="monotone" dataKey="upper" stroke="none" fill="url(#forecastGrad)" />
                <Area type="monotone" dataKey="lower" stroke="none" fill="#000" fillOpacity={0.55} />
                {/* Linha Central de Projeção Real */}
                <Area type="monotone" dataKey="projected" stroke="#d4b87a" strokeWidth={1.8} fill="none" dot={{ r: 2.5, stroke: '#d4b87a', strokeWidth: 1, fill: '#0a0a0c' }} />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Overlay da Banda do Mockup */}
            <div className="absolute right-[45%] top-[30%] pointer-events-none text-[8.5px] font-mono text-[#d4b87a] bg-black/80 px-2 py-0.5 rounded border border-[#d4b87a]/30">
              $180M - $225M
            </div>
            <div className="absolute right-[12%] top-[45%] pointer-events-none text-[8.5px] font-mono text-[#d4b87a] bg-black/80 px-2 py-0.5 rounded border border-[#d4b87a]/30">
              $180M - $225M
            </div>
          </div>
          <span className="text-[7.5px] font-semibold text-center text-white/40 tracking-wider mt-1 uppercase">Projected EBITDA</span>
        </div>

        {/* Alertas de Cascata de Burnout */}
        <div className="flex items-start gap-1.5 text-[8.5px] text-amber-500/80 bg-amber-500/5 p-2 rounded-xl border border-amber-500/20 leading-normal select-none">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span><b>Atrito Preditivo 6D:</b> Risco de Burnout Coletivo calculado em {burnoutEEB}% impacta o caixa através de turnover indireto, drenando R$ -{custoRealTurnover.toFixed(0)}k/mês.</span>
        </div>

        {/* Micro-Terminal Cibernético */}
        <div className="border border-[#d4b87a]/15 bg-black/60 rounded-xl overflow-hidden">
          <div className="bg-black/90 px-3 py-1 flex items-center justify-between border-b border-white/5 select-none">
            <div className="flex items-center gap-1.5 text-[#d4b87a] font-mono text-[7.5px] font-bold">
              <TerminalIcon className="h-3 w-3" />
              <span>IPB ANALYTICAL CAIXA TERMINAL</span>
            </div>
            <div className="text-[6.5px] font-mono text-white/30">ONLINE</div>
          </div>
          <div className="p-2 font-mono text-[7px] text-[#d4b87a]/90 h-[40px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
            {logs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">{log}</div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>
    </div>
  )
}
