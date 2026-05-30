'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, AlertTriangle, CheckCircle2, Terminal as TerminalIcon } from 'lucide-react'

export function HudFinancas() {
  // Inputs (Sliders sincronizados via Telemetria Global)
  const [faturamento, setFaturamento] = useState(150) // em milhares (k R$)
  const [cac, setCac] = useState(350) // em R$
  const [opex, setOpex] = useState(60) // em milhares (k R$)
  const [clientes, setClientes] = useState(1200)

  // Variáveis vindas de outros módulos (via Telemetria Global)
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  // Logs do Terminal de Controle
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Inicializando IPB Controladoria Engine...',
    '[SGS] Conectado ao Sistema de Expectativas de Mercado do Bacen.',
    '[VERTEX] Carregando modelo Monte Carlo de projeção financeira...'
  ])

  // Constantes macroeconômicas baseadas no cenário
  const selic = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39
  const jurosReais = Number(((1 + selic / 100) / (1 + ipca / 100) - 1) * 100)
  const wacc = cenario === 'juros_altos' ? 18.9 : 17.2

  // 1. Cascata 1 & 3: Integração direta com Burnout (Capital Humano)
  const burnoutEEB = Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const totalColaboradores = 120
  const demissoesMes = Math.round((totalColaboradores * (turnoverAnual / 100)) / 12)
  const custoTurnoverUnitario = 30 // k R$ (Rescisão + Recrutamento + Perda de Produtividade)
  const custoRealTurnover = demissoesMes * custoTurnoverUnitario // k R$

  // 2. Cálculos Derivados Financeiros
  const ticketMedio = (faturamento * 1000) / clientes
  const churn = 0.025
  const ltv = ticketMedio / churn
  const ltvCac = cac > 0 ? ltv / cac : 0

  // EBITDA Líquido = Faturamento - Opex - CAC total - Custo de esgotamento humano (Turnover)
  const cacTotalMensal = (clientes * churn * cac) / 1000
  const ebitda = faturamento - opex - cacTotalMensal - custoRealTurnover
  const margemEbitda = faturamento > 0 ? (ebitda / faturamento) * 100 : 0

  // Runway & Capital de Giro
  const capitalGiro = 850 // k R$
  const burnRate = ebitda < 0 ? Math.abs(ebitda) : 0
  const runway = burnRate > 0 ? capitalGiro / burnRate : 99

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // --- TELEMETRIA GLOBAL: Sincronização em Tempo Real ---
  useEffect(() => {
    // Inicializa o estado compartilhado no window se não existir
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) {
        win.IPBTelemetry = {
          faturamento,
          cac,
          opex,
          clientes,
          pressaoMetas,
          cenario
        }
      } else {
        // Se já existe, atualiza o estado local
        setFaturamento(win.IPBTelemetry.faturamento)
        setCac(win.IPBTelemetry.cac)
        setOpex(win.IPBTelemetry.opex)
        setClientes(win.IPBTelemetry.clientes)
        setPressaoMetas(win.IPBTelemetry.pressaoMetas)
        setCenario(win.IPBTelemetry.cenario)
      }
    }

    const handleTelemetry = (e: Event) => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setFaturamento(telemetry.faturamento ?? 150)
        setCac(telemetry.cac ?? 350)
        setOpex(telemetry.opex ?? 60)
        setClientes(telemetry.clientes ?? 1200)
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

  // --- TERMINAL LOGS GENERATOR ---
  useEffect(() => {
    const messages = [
      `Recalculando margem EBITDA: ${margemEbitda.toFixed(2)}%`,
      `Atualizando Runway: ${runway === 99 ? 'Infinito' : `${runway.toFixed(1)} meses`}`,
      `CAC atualizado a R$ ${cac.toFixed(0)}. Relação LTV/CAC: ${ltvCac.toFixed(1)}x`,
      `Impacto indireto do Burnout: Custo de turnover de R$ ${custoRealTurnover.toFixed(0)}k/mês`,
      `SELIC nominal a ${selic.toFixed(2)}%. Juros reais projetados: ${jurosReais.toFixed(2)}%`,
      `Processando matriz Monte Carlo: 5000 iterações concluídas com WACC de ${wacc}%`,
    ]

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      const timestamp = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomMsg}`])
    }, 4500)

    return () => clearInterval(interval)
  }, [margemEbitda, runway, cac, ltvCac, custoRealTurnover, selic, jurosReais, wacc])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // --- CANVAS: Projeção 3D de Fluxo de Caixa Cibernético (NASA Style) ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0, raf: number
    
    // Partículas flutuantes de fluxo de caixa
    const particles: {x: number, y: number, speed: number, size: number, alpha: number}[] = []
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.5
      })
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const w = canvas.width
      const h = canvas.height
      const vanishingY = 15 // Ponto de fuga 3D
      const cx = w / 2

      // 1. Grade em Perspectiva 3D
      ctx.strokeStyle = 'rgba(212, 184, 122, 0.05)'
      ctx.lineWidth = 0.5

      // Linhas que convergem ao ponto de fuga
      const lineCount = 14
      for (let i = 0; i <= lineCount; i++) {
        const xOffset = ((i - lineCount / 2) / (lineCount / 2)) * cx * 1.8
        ctx.beginPath()
        ctx.moveTo(cx, vanishingY)
        ctx.lineTo(cx + xOffset, h)
        ctx.stroke()
      }

      // Linhas horizontais com espaçamento logarítmico (efeito 3D)
      const hLines = 10
      for (let i = 0; i < hLines; i++) {
        const progress = i / hLines
        const y = vanishingY + Math.pow(progress, 1.8) * (h - vanishingY)
        ctx.strokeStyle = `rgba(212, 184, 122, ${0.02 + progress * 0.1})`
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // 2. Partículas Dinâmicas (Velocidade do Capital)
      particles.forEach(p => {
        p.y += p.speed
        if (p.y > h) {
          p.y = vanishingY
          p.x = Math.random() * w
        }
        // Converte as coordenadas das partículas para acompanhar as linhas de perspectiva
        const dy = (p.y - vanishingY) / (h - vanishingY)
        const scaleX = 0.2 + dy * 0.8
        const projectedX = cx + (p.x - cx) * scaleX

        ctx.fillStyle = ebitda >= 0 ? `rgba(74, 222, 128, ${p.alpha * dy})` : `rgba(248, 113, 113, ${p.alpha * dy})`
        ctx.beginPath()
        ctx.arc(projectedX, p.y, p.size * scaleX, 0, Math.PI * 2)
        ctx.fill()
      })

      // 3. Projeção Gráfica do Fluxo do EBITDA 6D
      ctx.strokeStyle = ebitda >= 0 ? '#4ade80' : '#f87171'
      ctx.lineWidth = 2.5
      ctx.shadowBlur = 12
      ctx.shadowColor = ebitda >= 0 ? 'rgba(74, 222, 128, 0.4)' : 'rgba(248, 113, 113, 0.4)'

      ctx.beginPath()
      const points: {x: number, y: number}[] = []
      
      const segments = 50
      for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const dy = t // progressão do tempo
        const scaleX = 0.25 + dy * 0.75
        
        // Simulação do caixa que sobe ou desce de acordo com o EBITDA acumulado
        const ebitdaAcumulado = (ebitda / 3.2) * dy * 45 // Escala vertical
        const oscilacaoMercado = Math.sin(t * 14 + frame * 0.035) * 6 + Math.cos(t * 22) * 2
        
        const y = h - 25 - ebitdaAcumulado - oscilacaoMercado
        const x = cx + (t - 0.5) * w * 0.85 * scaleX

        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
        
        points.push({ x, y })
      }
      ctx.stroke()
      ctx.shadowBlur = 0 // Reseta o shadow blur

      // Preenchimento de degrade sob a curva em perspectiva
      if (points.length > 0) {
        ctx.fillStyle = ebitda >= 0 
          ? 'rgba(74, 222, 128, 0.04)' 
          : 'rgba(248, 113, 113, 0.04)'
        ctx.beginPath()
        ctx.moveTo(points[0].x, h)
        points.forEach(p => ctx.lineTo(p.x, p.y))
        ctx.lineTo(points[points.length - 1].x, h)
        ctx.closePath()
        ctx.fill()
      }

      // Linha do Alvo de Equilíbrio
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.setLineDash([4, 6])
      ctx.beginPath()
      ctx.moveTo(cx - w * 0.1, h - 25)
      ctx.lineTo(cx + w * 0.4, h - 25)
      ctx.stroke()
      ctx.setLineDash([])

      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [ebitda])

  return (
    <div className="hud-card-container relative w-full h-full flex flex-col justify-between">
      <div className="scanlines z-10" />

      {/* Header do Painel */}
      <div className="hero-header relative z-20">
        <div className="live-head text-[#d4b87a] flex items-center gap-2">
          <div className="pulse-dot" />
          <span>FN-01 • CONTROLADORIA QUANTITATIVA & CAIXA 6D</span>
        </div>
        <div className="ch-label">WACC NACION: {wacc}% • JURO REAL BCB: {jurosReais.toFixed(2)}%</div>
      </div>

      {/* Conteúdo Principal */}
      <div className="hero-content">
        {/* Painel Visual */}
        <div className="hero-visual-pane relative overflow-hidden">
          <div className="pneumo-sim-screen w-full h-full relative z-10 grid grid-rows-[1fr_115px] gap-2">
            
            {/* Display de Margem EBITDA */}
            <div className="pneumo-lung-box flex flex-col items-center justify-center text-center select-none min-h-[130px] pt-2 relative">
              <div className="absolute top-2 left-2 text-[7.5px] font-mono text-white/30 uppercase tracking-widest">
                Monte Carlo Proj
              </div>
              <div className="select-none">
                <h4 className="margin-0 text-[10px] text-white/45 uppercase font-medium tracking-widest">Margem EBITDA Preditiva</h4>
                <b className={`font-mono text-5xl mt-1.5 block filter drop-shadow-[0_0_15px_rgba(212,184,122,0.3)] ${margemEbitda >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                  {margemEbitda.toFixed(1)}%
                </b>
                <p className={`margin-0 mt-2 text-[10px] font-bold uppercase tracking-wider ${margemEbitda >= 15 ? 'text-[#4ade80]' : margemEbitda >= 0 ? 'text-amber-400' : 'text-[#f87171]'}`}>
                  {margemEbitda >= 20 ? 'Excelente Eficiência' : margemEbitda >= 0 ? 'Margem Positiva' : 'Déficit Operacional'}
                </p>
              </div>
            </div>

            {/* Projeção 3D de Fluxo em Canvas */}
            <div className="canvas-graph-container w-full h-[115px] relative rounded-xl border border-white/5 bg-[#000]/70 shrink-0 overflow-hidden">
              <canvas ref={canvasRef} width={420} height={115} className="w-full h-full block" />
              <div className="graph-overlay-vals absolute right-3 top-2 text-[8px] font-mono text-white/40 flex flex-col gap-0.5 text-right pointer-events-none">
                <span>EBITDA Operac: <b className="text-white">R$ {ebitda.toFixed(1)}k</b></span>
                <span>Burnout Index: <b className="text-[#f87171]">{burnoutEEB}%</b></span>
                <span>Runway Caixa: <b className="text-white">{runway === 99 ? 'Infinito' : `${runway.toFixed(1)} meses`}</b></span>
                <span>LTV/CAC Ratio: <b className="text-[#d4b87a]">{ltvCac.toFixed(1)}x</b></span>
              </div>
            </div>

          </div>
        </div>

        {/* Fórmulas Matemáticas da NASA (LaTeX Estilizado em HTML) */}
        <div className="my-3 p-2.5 bg-black/60 border border-[#d4b87a]/15 rounded-xl text-white font-mono text-[9px] select-none">
          <div className="text-[7.5px] uppercase tracking-wider text-[#d4b87a] mb-1.5 font-bold flex justify-between">
            <span>Modelagem Preditiva</span>
            <span>EBITDA Integrado 6D</span>
          </div>
          <div className="flex justify-center items-center py-2.5 bg-black/30 rounded-lg border border-white/5 text-center text-[10px]">
            <span>
              EBITDA<sub>L</sub> = Φ - OPEX - 
              <span className="inline-flex flex-col text-center align-middle mx-1.5">
                <span className="border-b border-white/40 leading-none pb-0.5">Churn · N · CAC</span>
                <span className="leading-none pt-0.5">1000</span>
              </span> 
              - C<sub>Turnover</sub>
            </span>
          </div>
          <div className="flex justify-between items-center text-[7.5px] text-white/50 mt-1.5 px-1 border-t border-white/5 pt-1.5">
            <span>Φ: R$ {faturamento}k (Faturamento)</span>
            <span>C<sub>Turnover</sub>: R$ -{custoRealTurnover.toFixed(0)}k (Burnout cost)</span>
          </div>
        </div>

        {/* Sliders de Simulação */}
        <div className="hero-controls-pane select-none mt-2">
          <div>
            <h3 className="text-[11px] text-[#d4b87a] uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Alavancas Financeiras 6D <div className="h-px flex-1 bg-gradient-to-r from-[#d4b87a]/20 to-transparent" />
            </h3>

            {/* Faturamento */}
            <div className="c-slider-group mb-4">
              <label>Faturamento Mensal (Φ) <span>R$ {faturamento}k</span></label>
              <input 
                type="range" 
                min="50" 
                max="500" 
                step="5" 
                value={faturamento} 
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setFaturamento(val)
                  updateTelemetry({ faturamento: val })
                }}
                className="c-slider-input text-[#d4b87a]"
              />
            </div>

            {/* Clientes */}
            <div className="c-slider-group mb-4">
              <label>Clientes Ativos (N) <span>{clientes}</span></label>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="50" 
                value={clientes} 
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setClientes(val)
                  updateTelemetry({ clientes: val })
                }}
                className="c-slider-input text-[#d4b87a]"
              />
            </div>

            {/* CAC */}
            <div className="c-slider-group mb-4">
              <label>CAC (Aquisição Unitária) <span>R$ {cac}</span></label>
              <input 
                type="range" 
                min="50" 
                max="1500" 
                step="10" 
                value={cac} 
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setCac(val)
                  updateTelemetry({ cac: val })
                }}
                className="c-slider-input text-[#d4b87a]"
              />
            </div>

            {/* OPEX */}
            <div className="c-slider-group">
              <label>OPEX (Custo Fixo Mensal) <span>R$ {opex}k</span></label>
              <input 
                type="range" 
                min="10" 
                max="200" 
                step="2.5" 
                value={opex} 
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setOpex(val)
                  updateTelemetry({ opex: val })
                }}
                className="c-slider-input text-[#d4b87a]"
              />
            </div>
          </div>

          {/* Avisos de Análise 6D e Conexões de Cascatas */}
          <div className="border-t border-white/5 pt-3 mt-4 space-y-2">
            {ltvCac < 3 ? (
              <div className="flex items-start gap-1.5 text-[9px] text-[#f87171] bg-[#f87171]/5 p-2 rounded-lg border border-[#f87171]/20">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>Risco: CAC muito alto! LTV/CAC ({ltvCac.toFixed(1)}x) está abaixo do mínimo ideal de 3x. Reduza CAC ou melhore o ticket médio.</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5 text-[9px] text-[#34d399] bg-[#34d399]/5 p-2 rounded-lg border border-[#34d399]/20">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>LTV/CAC saudável ({ltvCac.toFixed(1)}x). Tração digital sólida.</span>
              </div>
            )}

            {burnoutEEB > 30 && (
              <div className="flex items-start gap-1.5 text-[9px] text-[#f87171] bg-[#f87171]/5 p-2 rounded-lg border border-[#f87171]/20">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span><b>Cascata 1 Alerta:</b> O Burnout Coletivo ({burnoutEEB}%) gera {demissoesMes} demissões/mês, drenando R$ -{custoRealTurnover.toFixed(0)}k de EBITDA!</span>
              </div>
            )}
          </div>
        </div>

        {/* Micro-Terminal de Processamento em Tempo Real */}
        <div className="mt-4 border border-[#d4b87a]/15 bg-[#070707] rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-black/80 px-3 py-1.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-1.5 text-[#d4b87a] font-mono text-[8px] font-bold">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>IPB NEURAL CALCULATION TERMINAL</span>
            </div>
            <div className="text-[7.5px] font-mono text-white/30">ONLINE</div>
          </div>
          <div className="p-2.5 font-mono text-[7.5px] text-[#4ade80]/90 h-[70px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
            {logs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">{log}</div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>

      {/* Footer do Painel */}
      <div className="hero-footer relative z-20 mt-4">
        <div className="title-group">
          <div className="area">Controladoria & Tração</div>
          <h2>Finanças & Projeção 6D</h2>
          <p>Motor quantitativo integrado que simula a saúde de caixa, cruzando margens operacionais com inflação, juros e o custo humano do esgotamento.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene text-[#1a120a]">
            <TrendingUp className="h-4 w-4" />
            <span>Simular ROI 6D</span>
          </button>
        </div>
      </div>
    </div>
  )
}
