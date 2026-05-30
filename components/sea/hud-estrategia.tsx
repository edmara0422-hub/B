'use client'

import { useEffect, useRef, useState } from 'react'
import { Compass, AlertTriangle, Lightbulb, Zap, Terminal as TerminalIcon } from 'lucide-react'

export function HudEstrategia() {
  // Inputs (Sliders sincronizados via Telemetria Global)
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')
  const [metaBudgetPercent, setMetaBudgetPercent] = useState(80)

  // Variáveis recebidas de outros módulos (via Telemetria Global)
  const [faturamento, setFaturamento] = useState(150)
  const [clientes, setClientes] = useState(1200)

  // Logs de processamento estratégico
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Inicializando IPB Estratégia & Market Engine...',
    '[BIGQUERY] Analisando 12M+ de requisições no Google Trends (Keyword: Business Inteligência)',
    '[VERTEX] Processando elasticidade de anúncios...'
  ])

  // Constantes vivas
  const selic = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39
  const juroReal = (selic - ipca).toFixed(2)
  const peRatioBR = cenario === 'juros_altos' ? '6.8x' : '8.2x'

  // Pontuação dinâmica PESTEL (Camada 3)
  const politicoScore = cenario === 'juros_altos' ? 30 : 55
  const economicoScore = cenario === 'juros_altos' ? 20 : 45
  const socialScore = cenario === 'ia_boom' ? 88 : 65
  const tecnologicoScore = cenario === 'ia_boom' ? 98 : 80
  const ecol_legalScore = 75
  const averagePestel = Math.round((politicoScore + economicoScore + socialScore + tecnologicoScore + ecol_legalScore) / 5)

  // Dados SWOT Viva
  const tiktokCpm = 6.80 
  const metaCpm = 12.40 
  const shareOrganicoQueda = 4.2

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // --- TELEMETRIA GLOBAL: Sincronização em Tempo Real ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) {
        win.IPBTelemetry = {
          cenario,
          metaBudgetPercent,
          faturamento,
          clientes
        }
      } else {
        setCenario(win.IPBTelemetry.cenario ?? 'normal')
        setMetaBudgetPercent(win.IPBTelemetry.metaBudgetPercent ?? 80)
        setFaturamento(win.IPBTelemetry.faturamento ?? 150)
        setClientes(win.IPBTelemetry.clientes ?? 1200)
      }
    }

    const handleTelemetry = (e: Event) => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setCenario(telemetry.cenario ?? 'normal')
        setMetaBudgetPercent(telemetry.metaBudgetPercent ?? 80)
        setFaturamento(telemetry.faturamento ?? 150)
        setClientes(telemetry.clientes ?? 1200)
      }
    }

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  const updateTelemetry = (updates: Partial<typeof window.IPBTelemetry>) => {
    if (typeof window !== 'undefined') {
      const win = window as any
      win.IPBTelemetry = { ...win.IPBTelemetry, ...updates }
      window.dispatchEvent(new CustomEvent('ipb-telemetry'))
    }
  }

  // --- TERMINAL LOGS ---
  useEffect(() => {
    const messages = [
      `Choque de cenário ativo: ${cenario.toUpperCase()}`,
      `AwesomeAPI sync: Moedas USD/BRL atualizado.`,
      `Elasticidade de mídia recalculada (Meta CPM: US$ ${metaCpm}, TikTok CPM: US$ ${tiktokCpm})`,
      `Índice PESTEL consolidado recalculado para: ${averagePestel}%`,
      `Google Trends indicando aumento de 32% em buscas por "EBITDA automatizado"`,
      `Arbitragem de Meta/TikTok Ads budget rebalanceado para ${metaBudgetPercent}% / ${100 - metaBudgetPercent}%`,
    ]

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      const timestamp = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomMsg}`])
    }, 4500)

    return () => clearInterval(interval)
  }, [cenario, metaBudgetPercent, averagePestel])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // --- CANVAS: Radar Orbital PESTEL com Laser Sweep 360° (NASA Style) ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0, raf: number

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const maxR = Math.min(cx, cy) * 0.82

      // 1. Círculos e Grelhas Concorrentes
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.05)'
      ctx.lineWidth = 1
      for (let r = 0.2; r <= 1; r += 0.2) {
        ctx.beginPath()
        ctx.arc(cx, cy, maxR * r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Eixos Angulares
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.08)'
      const axesCount = 5
      for (let i = 0; i < axesCount; i++) {
        const angle = (i * Math.PI * 2) / axesCount - Math.PI / 2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR)
        ctx.stroke()
      }

      // 2. Laser Radar Sweep (Varredor 360° NASA)
      const sweepAngle = (frame * 0.02) % (Math.PI * 2)
      
      // Desenha o rastro do laser sweep
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
      ctx.fillStyle = 'rgba(96, 165, 250, 0.03)'
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, maxR, sweepAngle - 0.2, sweepAngle, false)
      ctx.closePath()
      ctx.fill()

      // Feixe do laser principal
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.35)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR)
      ctx.stroke()

      // 3. Área Poligonal PESTEL
      const scores = [politicoScore, economicoScore, socialScore, tecnologicoScore, ecol_legalScore]
      ctx.fillStyle = cenario === 'ia_boom' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(96, 165, 250, 0.18)'
      ctx.strokeStyle = cenario === 'ia_boom' ? '#34d399' : '#60a5fa'
      ctx.lineWidth = 2
      ctx.shadowBlur = 10
      ctx.shadowColor = cenario === 'ia_boom' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(96, 165, 250, 0.3)'

      ctx.beginPath()
      scores.forEach((s, i) => {
        const angle = (i * Math.PI * 2) / axesCount - Math.PI / 2
        const radius = (s / 100) * maxR
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.shadowBlur = 0 // Reseta o shadow blur

      // Desenha pequenos satélites orbitais sobre as pontas das forças
      scores.forEach((s, i) => {
        const angle = (i * Math.PI * 2) / axesCount - Math.PI / 2
        const radius = (s / 100) * maxR
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius

        // Satélite girando
        const satAngle = frame * 0.05 + i
        const satX = x + Math.cos(satAngle) * 5
        const satY = y + Math.sin(satAngle) * 5

        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(satX, satY, 1.8, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.stroke()
      })

      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [cenario, politicoScore, economicoScore, socialScore, tecnologicoScore, ecol_legalScore])

  return (
    <div className="hud-card-container relative w-full h-full flex flex-col justify-between">
      <div className="scanlines z-10" />

      {/* Header do Painel */}
      <div className="hero-header relative z-20">
        <div className="live-head text-blue-400 flex items-center gap-2">
          <div className="pulse-dot" />
          <span>ST-02 • INTEGRAÇÃO MACROECONÔMICA VIVA</span>
        </div>
        <div className="ch-label">JUROS REAL SELIC: {juroReal}% • P/E BR: {peRatioBR}</div>
      </div>

      {/* Conteúdo Principal */}
      <div className="hero-content">
        {/* Radar e SWOT */}
        <div className="hero-visual-pane relative overflow-hidden">
          <div className="pneumo-sim-screen w-full h-full relative z-10 grid grid-rows-[1fr_95px] gap-2">
            
            {/* Canvas PESTEL */}
            <div className="pneumo-lung-box flex items-center justify-center relative min-h-[140px]">
              <canvas ref={canvasRef} width={220} height={220} className="block select-none" />
              <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none text-[8.5px] font-mono">
                <div className="text-center text-teal-400 font-bold uppercase tracking-wider">Tecnológico / IA</div>
                <div className="flex justify-between w-full">
                  <div className="text-rose-400 font-bold uppercase tracking-wider">Econômico</div>
                  <div className="text-[#d4b87a] font-bold uppercase tracking-wider">Político</div>
                </div>
                <div className="flex justify-between w-full mt-auto">
                  <div className="text-purple-400 font-bold uppercase tracking-wider">Ecológico / Legal</div>
                  <div className="text-cyan-400 font-bold uppercase tracking-wider">Social</div>
                </div>
              </div>
            </div>

            {/* SWOT VIVA Real-time */}
            <div className="w-full bg-[#000]/70 p-2.5 rounded-xl border border-white/5 text-[9.5px] flex flex-col justify-center gap-1 font-mono">
              <div className="text-blue-400 font-bold uppercase flex items-center gap-1"><Zap className="h-3 w-3 animate-pulse" /> SWOT Viva e Alocação</div>
              <div className="text-white/70 leading-relaxed text-[8.5px]">
                O share orgânico recuou <span className="text-rose-400 font-bold">{shareOrganicoQueda}%</span>. 
                {metaBudgetPercent > 50 ? (
                  <span className="text-amber-400"> Sugere-se migrar 20% do orçamento para o TikTok Ads, aproveitando CPM de US$ {tiktokCpm.toFixed(2)} vs US$ {metaCpm.toFixed(2)} do Meta.</span>
                ) : (
                  <span className="text-green-400"> Otimização do orçamento amortizou e blindou a marca contra a queda do orgânico!</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Fórmulas Matemáticas PESTEL (Estilo NASA) */}
        <div className="my-3 p-2.5 bg-black/60 border border-blue-400/20 rounded-xl text-white font-mono text-[9px] select-none">
          <div className="text-[7.5px] uppercase tracking-wider text-blue-400 mb-1.5 font-bold flex justify-between">
            <span>Matriz Multivariada</span>
            <span>Índice Macroeconômico</span>
          </div>
          <div className="flex justify-center items-center py-2.5 bg-black/30 rounded-lg border border-white/5 text-center text-[10px]">
            <span>
              PESTEL<sub>Score</sub> = 
              <span className="inline-flex flex-col text-center align-middle mx-1.5">
                <span className="border-b border-white/40 leading-none pb-0.5">∑ S<sub>i</sub> · w<sub>i</sub></span>
                <span className="leading-none pt-0.5">K</span>
              </span>
              = {averagePestel}%
            </span>
          </div>
          <div className="flex justify-between items-center text-[7.5px] text-white/50 mt-1.5 px-1 border-t border-white/5 pt-1.5">
            <span>S<sub>i</sub>: Peso de Fatores</span>
            <span>SELIC Viva: {selic.toFixed(2)}% (Banco Central)</span>
          </div>
        </div>

        {/* Cenários e Sliders */}
        <div className="hero-controls-pane select-none mt-2">
          <div>
            <h3 className="text-[11px] text-blue-400 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              PESTEL Choques 6D <div className="h-px flex-1 bg-gradient-to-r from-blue-400/20 to-transparent" />
            </h3>

            {/* Choque de Cenário */}
            <div className="c-slider-group mb-4">
              <label>Simulador de Eventos de Mercado</label>
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                <button 
                  onClick={() => {
                    setCenario('normal')
                    updateTelemetry({ cenario: 'normal' })
                  }} 
                  className={`cardio-btn py-2 ${cenario === 'normal' ? 'on text-white bg-blue-500/10' : 'text-white/40'}`}
                  style={{ borderColor: cenario === 'normal' ? '#60a5fa' : 'rgba(255,255,255,0.06)' }}
                >
                  Estável
                </button>
                <button 
                  onClick={() => {
                    setCenario('juros_altos')
                    updateTelemetry({ cenario: 'juros_altos' })
                  }} 
                  className={`cardio-btn py-2 ${cenario === 'juros_altos' ? 'on text-white bg-rose-500/10' : 'text-white/40'}`}
                  style={{ borderColor: cenario === 'juros_altos' ? '#f87171' : 'rgba(255,255,255,0.06)' }}
                >
                  SELIC Alta
                </button>
                <button 
                  onClick={() => {
                    setCenario('ia_boom')
                    updateTelemetry({ cenario: 'ia_boom' })
                  }} 
                  className={`cardio-btn py-2 ${cenario === 'ia_boom' ? 'on text-white bg-emerald-500/10' : 'text-white/40'}`}
                  style={{ borderColor: cenario === 'ia_boom' ? '#34d399' : 'rgba(255,255,255,0.06)' }}
                >
                  IA Boom
                </button>
              </div>
            </div>

            {/* Slider de Orçamento de Mídia */}
            <div className="c-slider-group mb-4">
              <label>Foco de Orçamento (Meta vs TikTok) <span>{metaBudgetPercent}% Meta</span></label>
              <input 
                type="range" 
                min="10" 
                max="90" 
                value={metaBudgetPercent} 
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setMetaBudgetPercent(val)
                  updateTelemetry({ metaBudgetPercent: val })
                }}
                className="c-slider-input text-blue-400"
              />
            </div>
          </div>

          {/* Regras de Decisão da IA (Camada 4) */}
          <div className="border-t border-white/5 pt-3 mt-4 space-y-2">
            {selic >= 14.40 && (
              <div className="flex items-start gap-1.5 text-[9px] text-[#d4b87a] bg-[#d4b87a]/5 p-2 rounded-lg border border-[#d4b87a]/20">
                <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span><b>CDI Recomendado:</b> Taxa real a {juroReal}%. Alocar faturamento excedente em investimentos liquidez CDI é mais lucrativo que expansão PJ no curto prazo.</span>
              </div>
            )}

            {cenario === 'ia_boom' && (
              <div className="flex items-start gap-1.5 text-[9px] text-green-400 bg-green-400/5 p-2 rounded-lg border border-green-400/20">
                <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span><b>IA Eficiência:</b> Disrupção de criação e marketing ativa. Custos de copywriting e criativos reduzidos em 60%. Acelerar via LLMs locais.</span>
              </div>
            )}
          </div>
        </div>

        {/* Micro-Terminal de Processamento em Tempo Real */}
        <div className="mt-4 border border-blue-400/20 bg-[#070707] rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-black/80 px-3 py-1.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[8px] font-bold">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>IPB TRENDS SCANNER TERMINAL</span>
            </div>
            <div className="text-[7.5px] font-mono text-white/30">ACTIVE SCAN</div>
          </div>
          <div className="p-2.5 font-mono text-[7.5px] text-blue-400/90 h-[70px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
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
          <div className="area">Estratégia & Análise de Mercado</div>
          <h2>Radar Macroeconômico PESTEL 6D</h2>
          <p>Varredor e monitor que correlaciona inflação (IPCA), taxa de juros reais e oscilações do share digital de canais para gerar relatórios de SWOT viva.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene text-[#1a120a]">
            <Compass className="h-4 w-4" />
            <span>Ver SWOT Viva 6D</span>
          </button>
        </div>
      </div>
    </div>
  )
}
