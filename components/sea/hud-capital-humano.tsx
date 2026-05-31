'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity, AlertTriangle, Heart, Sparkles, Terminal as TerminalIcon } from 'lucide-react'

export function HudCapitalHumano() {
  // Inputs (Sliders sincronizados via Telemetria Global)
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [climaFrequencia, setClimaFrequencia] = useState(14)

  // Variáveis recebidas de outros módulos (via Telemetria Global)
  const [faturamento, setFaturamento] = useState(150)
  const [cac, setCac] = useState(350)

  // Logs do Terminal NLP de Riscos Psicossociais
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Inicializando IPB Comportamento & NLP Engine...',
    '[GEMINI NLP] Varrendo canais públicos do Slack & WhatsApp (Análise de sentimentos ativa)...',
    '[MASLACH] Calibrando escala Maslach coletiva de exaustão emocional...'
  ])

  // Constantes de RH
  const custoMedioRecrutamento = 8.5 
  const custoMedioRescisao = 12.0 
  const perdaProdutividade = 9.5 

  // Equações de Inteligência Central (Camada 2 & 3)
  const burnoutEEB = Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  const turnoverAnual = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const estresseFator = pressaoMetas * 12
  
  const totalColaboradores = 120
  const demissoesMes = Math.round((totalColaboradores * (turnoverAnual / 100)) / 12)
  const custoUnitarioTurnover = custoMedioRescisao + custoMedioRecrutamento + perdaProdutividade 
  const custoRealTurnover = demissoesMes * custoUnitarioTurnover 

  // EBITDA Líquido e Eficiência Saudável
  const ebitdaBrutoSimulado = pressaoMetas * 42 
  const ebitdaLiquido = ebitdaBrutoSimulado - custoRealTurnover
  const eficienciaSaudavel = estresseFator > 0 ? (ebitdaBrutoSimulado / estresseFator) * 10 : 0

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // --- TELEMETRIA GLOBAL: Sincronização em Tempo Real ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) {
        win.IPBTelemetry = {
          pressaoMetas,
          climaFrequencia,
          faturamento,
          cac,
          opex: 60,
          clientes: 1200,
          cenario: 'normal',
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

      setPressaoMetas(win.IPBTelemetry.pressaoMetas ?? 5)
      setClimaFrequencia(win.IPBTelemetry.climaFrequencia ?? 14)
      setFaturamento(win.IPBTelemetry.faturamento ?? 150)
      setCac(win.IPBTelemetry.cac ?? 350)
    }

    const handleTelemetry = (e: Event) => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
        setClimaFrequencia(telemetry.climaFrequencia ?? 14)
        setFaturamento(telemetry.faturamento ?? 150)
        setCac(telemetry.cac ?? 350)
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

  // --- TERMINAL NLP LOGS ---
  useEffect(() => {
    const sentimentosAlerts = [
      'Gemini NLP analisou mensagens Slack: Alerta de exaustão verbal (frequência de "urgente" subiu 42%)',
      'Maslach EEB recalibrado: Exaustão Emocional Coletiva em patamar crítico',
      'Satisfação interna recuou: Relação meta/estabilidade em desequilíbrio',
      'Predição de Burnout: 14% de risco de perda de talentos técnicos em 30 dias',
      'Taxa de atestados por estresse indicando curva ascendente',
      `Pulse surveys respondido por 92% da equipe. Clima Index: ${(100 - burnoutEEB).toFixed(0)}/100`,
    ]

    const interval = setInterval(() => {
      const randomMsg = sentimentosAlerts[Math.floor(Math.random() * sentimentosAlerts.length)]
      const timestamp = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomMsg}`])
    }, 4500)

    return () => clearInterval(interval)
  }, [burnoutEEB])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // --- CANVAS: EEG Stress Waveform + Heartbeat (NASA Style) ---
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
      const cy = h / 2

      // Desenha grade quadriculada de fundo (Telemetry Monitor style)
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.04)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < w; x += 15) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 15) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // 1. CANAL BETA (Alertness / Ansiedade - Âmbar Quente)
      ctx.strokeStyle = 'rgba(229, 175, 101, 0.65)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      for (let x = 0; x <= w; x++) {
        const t = x / w
        let y = cy
        const pulseCycle = (frame * 0.02) % 1
        const distToPulse = Math.abs(t - pulseCycle)
        let heartbeatOffset = 0
        
        if (distToPulse < 0.04) {
          const pulseT = (distToPulse / 0.04) * Math.PI
          heartbeatOffset = Math.sin(pulseT * 2.5) * 15 * (burnoutEEB > 35 ? 1.6 : 1)
        }

        if (burnoutEEB > 30) {
          // Ondas rápidas, erráticas de estresse ativo
          y += Math.sin(t * 30 + frame * 0.28) * 9.5 * (pressaoMetas / 4)
             + Math.cos(t * 55 + frame * 0.45) * 5 * (pressaoMetas / 3.5)
             + heartbeatOffset
             + (Math.random() - 0.5) * 3.5
        } else {
          // Ondas suaves de alerta concentrado
          y += Math.sin(t * 18 + frame * 0.09) * 3.5
             + Math.cos(t * 32 - frame * 0.05) * 1.5
             + heartbeatOffset
        }
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // 2. CANAL ALPHA (Foco Saudável - Dourado Premium)
      ctx.strokeStyle = '#d2af5a'
      ctx.lineWidth = 1.8
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(201, 148, 58, 0.35)'
      ctx.beginPath()
      for (let x = 0; x <= w; x++) {
        const t = x / w
        let y = cy
        const pulseCycle = (frame * 0.02) % 1
        const distToPulse = Math.abs(t - pulseCycle)
        let heartbeatOffset = 0
        
        if (distToPulse < 0.045) {
          const pulseT = (distToPulse / 0.045) * Math.PI
          heartbeatOffset = Math.sin(pulseT * 2.5) * 18 * (burnoutEEB > 35 ? 1.4 : 1)
        }

        if (burnoutEEB > 30) {
          // Alpha recua e fica irregular sob estresse alto
          y += Math.sin(t * 12 + frame * 0.12) * 4 * (2 / pressaoMetas)
             + Math.cos(t * 24 - frame * 0.18) * 2
             + heartbeatOffset
        } else {
          // Alpha regular, amplo e estável em alto desempenho
          y += Math.sin(t * 7.5 + frame * 0.045) * 7
             + Math.cos(t * 15 - frame * 0.02) * 3
             + heartbeatOffset
        }
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0 // Reseta sombra

      // 3. CANAL DELTA (Estresse Profundo subconsciente - Bronze Bronze)
      ctx.strokeStyle = 'rgba(184, 157, 92, 0.45)'
      ctx.lineWidth = 1.0
      ctx.beginPath()
      for (let x = 0; x <= w; x++) {
        const t = x / w
        let y = cy
        
        if (burnoutEEB > 30) {
          // Ondas lentas, porém pesadas de exaustão profunda
          y += Math.sin(t * 4.5 + frame * 0.04) * 12 * (pressaoMetas / 5)
             + Math.cos(t * 9 + frame * 0.08) * 4.5
        } else {
          y += Math.sin(t * 3.2 + frame * 0.025) * 4.5
        }
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Desenha varredor de pulso vertical (efeito scanner de osciloscópio)
      const scanX = (frame * 1.5) % w
      ctx.strokeStyle = burnoutEEB > 35 ? 'rgba(229, 175, 101, 0.25)' : 'rgba(201, 148, 58, 0.25)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(scanX, 0)
      ctx.lineTo(scanX, h)
      ctx.stroke()

      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [pressaoMetas, burnoutEEB])

  return (
    <div className="hud-card-container relative w-full h-full flex flex-col justify-between">
      <div className="scanlines z-10" />

      {/* Header do Painel */}
      <div className="hero-header relative z-20">
        <div className="live-head text-[#d2af5a] flex items-center gap-2">
          <div className="pulse-dot" />
          <span>HR-03 • CAPITAL HUMANO & RISCOS PSICOSSOCIAIS</span>
        </div>
        <div className="ch-label">EEB MASLACH: {Number(burnoutEEB ?? 0).toFixed(0)}% • TURNOVER ANUAL: {Number(turnoverAnual ?? 0).toFixed(0)}%</div>
      </div>

      {/* Conteúdo Principal */}
      <div className="hero-content">
        {/* Gráfico da Onda de Estresse Coletivo */}
        <div className="hero-visual-pane relative overflow-hidden">
          <div className="pneumo-sim-screen w-full h-full relative z-10 grid grid-rows-[1fr_115px] gap-2">
            
            {/* Display do Clima */}
            <div className="pneumo-lung-box flex flex-col items-center justify-center text-center select-none min-h-[130px] pt-2 relative">
              <div className="absolute top-2 left-2 text-[7.5px] font-mono text-white/30 uppercase tracking-widest">
                EEG Coletivo Scan
              </div>
              <div className="select-none">
                <h4 className="margin-0 text-[10px] text-white/45 uppercase font-medium tracking-widest">Estresse Coletivo Preditivo</h4>
                <b className={`font-mono text-5xl mt-1.5 block filter drop-shadow-[0_0_15px_rgba(201, 148, 58,0.3)] ${(burnoutEEB ?? 0) > 35 ? 'text-[#d2af5a]/80' : 'text-[#d2af5a]'}`}>
                  {Number(burnoutEEB ?? 0).toFixed(0)}%
                </b>
                <p className={`margin-0 mt-2 text-[10px] font-bold uppercase tracking-wider ${(burnoutEEB ?? 0) > 35 ? 'text-[#d2af5a]/80' : 'text-[#d2af5a]'}`}>
                  {(burnoutEEB ?? 0) > 35 ? 'Risco Alto de Estafa/Burnout' : 'Ambiente Saudável e Resiliente'}
                </p>
              </div>
            </div>

            {/* Onda de Estresse em Canvas */}
            <div className="canvas-graph-container w-full h-[115px] relative rounded-xl border border-white/5 bg-[#000]/70 shrink-0 overflow-hidden">
              <canvas ref={canvasRef} width={420} height={115} className="w-full h-full block" />
              <div className="graph-overlay-vals absolute right-3 top-2 text-[8px] font-mono text-white/40 flex flex-col gap-0.5 text-right pointer-events-none">
                <span>Eficiência Saudável: <b className="text-white">{Number(eficienciaSaudavel ?? 0).toFixed(1)}</b></span>
                <span>Demissões/Mês: <b className="text-white">{Number(demissoesMes ?? 0).toFixed(0)} colab.</b></span>
                <span>Faturamento (Φ): <b className="text-[#d2af5a]">R$ {Number(faturamento ?? 0).toFixed(0)}k</b></span>
                <span>Perda de Caixa: <b className="text-[#d2af5a]/80">R$ -{Number(custoRealTurnover ?? 0).toFixed(0)}k</b></span>
              </div>
            </div>

          </div>
        </div>

        {/* Fórmulas Matemáticas do Esgotamento Humano (LaTeX em HTML) */}
        <div className="my-3 p-2.5 bg-black/60 border border-[#d2af5a]/15 rounded-xl text-white font-mono text-[9px] select-none">
          <div className="text-[7.5px] uppercase tracking-wider text-[#d2af5a] mb-1.5 font-bold flex justify-between">
            <span>Modelagem Comportamental</span>
            <span>Estafa & Impacto Organizacional</span>
          </div>
          <div className="flex justify-center items-center py-2.5 bg-black/30 rounded-lg border border-white/5 text-center text-[10px]">
            <span>
              EEB<sub>Estresse</sub> = 
              <span className="inline-flex flex-col text-center align-middle mx-1.5">
                <span className="border-b border-white/40 leading-none pb-0.5">∫ P<sub>Metas</sub><sup>2.1</sup> · 28</span>
                <span className="leading-none pt-0.5">D<sub>Pulse</sub></span>
              </span>
              dt = {burnoutEEB}%
            </span>
          </div>
          <div className="flex justify-between items-center text-[7.5px] text-white/50 mt-1.5 px-1 border-t border-white/5 pt-1.5">
            <span>P<sub>Metas</sub>: Slider Escala {pressaoMetas}</span>
            <span>D<sub>Pulse</sub>: Período {climaFrequencia} dias</span>
          </div>
        </div>

        {/* Sliders e Controles de Pressão */}
        <div className="hero-controls-pane select-none mt-2">
          <div>
            <h3 className="text-[11px] text-[#d2af5a] uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Alavancas Psico-Operacionais <div className="h-px flex-1 bg-gradient-to-r from-[#d2af5a]/20 to-transparent" />
            </h3>

            {/* Pressão de Metas */}
            <div className="c-slider-group mb-4">
              <label>Pressão de Metas <span>Escala {pressaoMetas}</span></label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="1" 
                value={pressaoMetas} 
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setPressaoMetas(val)
                  updateTelemetry({ pressaoMetas: val })
                }}
                className="c-slider-input text-[#d2af5a]"
              />
            </div>

            {/* Frequência do Clima */}
            <div className="c-slider-group">
              <label>Frequência Pulse Surveys <span>A cada {climaFrequencia} dias</span></label>
              <input 
                type="range" 
                min="7" 
                max="30" 
                step="7" 
                value={climaFrequencia} 
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setClimaFrequencia(val)
                  updateTelemetry({ climaFrequencia: val })
                }}
                className="c-slider-input text-[#d2af5a]"
              />
            </div>
          </div>

          {/* Análises das Cascatas 1 e 3 */}
          <div className="border-t border-white/5 pt-3 mt-4 space-y-2">
            {burnoutEEB > 30 ? (
              <div className="flex items-start gap-1.5 text-[9px] text-[#d2af5a]/80 bg-[#d2af5a]/5 p-2 rounded-lg border border-[#d2af5a]/20">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span><b>Cascata 1 Ativa:</b> Burnout de {Number(burnoutEEB ?? 0).toFixed(0)}% gera desligamento em massa. Custo do turnover totaliza R$ {Number(custoRealTurnover ?? 0).toFixed(0)}k/mês. EBITDA Líquido cai para R$ {Number(ebitdaLiquido ?? 0).toFixed(0)}k!</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5 text-[9px] text-[#d2af5a] bg-[#d2af5a]/5 p-2 rounded-lg border border-[#d2af5a]/20">
                <Heart className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span><b>Equilíbrio Saudável:</b> A produtividade está em excelente harmonia com a saúde da equipe (Eficiência: {Number(eficienciaSaudavel ?? 0).toFixed(1)}).</span>
              </div>
            )}
          </div>
        </div>

        {/* Simulador Comportamental de RH */}
        <div className="mt-3 p-2.5 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl text-left select-none">
          <div className="text-[7.5px] uppercase font-mono tracking-widest text-[#d2af5a] font-bold mb-1 flex justify-between">
            <span>Simulação Comportamental Ativa</span>
            <span className="animate-pulse">● LIVE INTERACTIVE</span>
          </div>
          <p className="text-[8.5px] text-white/70 leading-relaxed font-mono">
            Sob pressão de metas no nível <b className="text-white">{pressaoMetas}/10</b>, a exaustão Maslach projetada atinge <b className="text-[#d2af5a]">{burnoutEEB}%</b>, gerando <b className="text-white">{demissoesMes}</b> desligamentos voluntários mensais. Com custos de rescisão e recrutamento em R$ <b className="text-white">{custoUnitarioTurnover}k</b> por colaborador, a perda de caixa invisível é de <b className="text-[#d2af5a]">R$ -{custoRealTurnover}k/mês</b>. Isso reduz a eficiência saudável do time para <b className="text-[#d2af5a]">{eficienciaSaudavel.toFixed(1)}</b>.
          </p>
        </div>

        {/* Micro-Terminal de NLP em Tempo Real */}
        <div className="mt-3 border border-[#d2af5a]/15 bg-[#070707] rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-black/80 px-3 py-1.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-1.5 text-[#d2af5a] font-mono text-[8px] font-bold">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>IPB GEMINI NLP SENTIMENT ANALYZER</span>
            </div>
            <div className="text-[7.5px] font-mono text-white/30">NLP SCANNING</div>
          </div>
          <div className="p-2.5 font-mono text-[7.5px] text-[#d2af5a]/90 h-[70px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
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
          <div className="area">Capital Humano & Riscos Psicossociais</div>
          <h2>Clima & Custos Invisíveis do Burnout</h2>
          <p>Mapeamento de clima organizacional por inteligência artificial, correlacionando fadiga laboral crônica com vazamentos diretos de rentabilidade.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene text-[#1a120a]">
            <Sparkles className="h-4 w-4" />
            <span>Ver Pulse NLP</span>
          </button>
        </div>
      </div>
    </div>
  )
}
