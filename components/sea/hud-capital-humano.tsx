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
          cac
        }
      } else {
        setPressaoMetas(win.IPBTelemetry.pressaoMetas ?? 5)
        setClimaFrequencia(win.IPBTelemetry.climaFrequencia ?? 14)
        setFaturamento(win.IPBTelemetry.faturamento ?? 150)
        setCac(win.IPBTelemetry.cac ?? 350)
      }
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

  const updateTelemetry = (updates: Partial<typeof window.IPBTelemetry>) => {
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

      // Desenha a onda principal EEG reativa
      ctx.strokeStyle = burnoutEEB > 35 ? '#f87171' : '#34d399'
      ctx.lineWidth = 1.8
      ctx.shadowBlur = 10
      ctx.shadowColor = burnoutEEB > 35 ? 'rgba(248, 113, 113, 0.4)' : 'rgba(52, 211, 153, 0.4)'

      ctx.beginPath()
      for (let x = 0; x <= w; x++) {
        const t = x / w
        let y = cy

        // Simulando batimento cardíaco (QRS Complex) no meio da onda de clima
        const pulseCycle = (frame * 0.02) % 1
        const distToPulse = Math.abs(t - pulseCycle)
        let heartbeatOffset = 0
        
        if (distToPulse < 0.05) {
          const pulseT = (distToPulse / 0.05) * Math.PI
          // Pico QRS: alta perturbação
          heartbeatOffset = Math.sin(pulseT * 2.5) * 16 * (burnoutEEB > 35 ? 1.5 : 1)
        }

        if (burnoutEEB > 30) {
          // Onda errática e caótica com spikes e ruídos digitais de ansiedade
          y += Math.sin(t * 22 + frame * 0.18) * 8 * (pressaoMetas / 3.5)
             + Math.cos(t * 44 + frame * 0.35) * 4 * (pressaoMetas / 4)
             + heartbeatOffset
             + (Math.random() - 0.5) * 4.5 // Ruído digital errático
        } else {
          // Onda harmônica tranquila de alta performance em equilíbrio
          y += Math.sin(t * 8 + frame * 0.05) * 5.5
             + Math.cos(t * 16 - frame * 0.02) * 2.2
             + heartbeatOffset
        }

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0 // Reseta o shadow blur

      // Desenha varredor de pulso vertical (efeito scanner de osciloscópio)
      const scanX = (frame * 1.5) % w
      ctx.strokeStyle = burnoutEEB > 35 ? 'rgba(248, 113, 113, 0.3)' : 'rgba(52, 211, 153, 0.3)'
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
        <div className="live-head text-emerald-400 flex items-center gap-2">
          <div className="pulse-dot" />
          <span>HR-03 • CAPITAL HUMANO & RISCOS PSICOSSOCIAIS</span>
        </div>
        <div className="ch-label">EEB MASLACH: {burnoutEEB}% • TURNOVER ANUAL: {turnoverAnual.toFixed(0)}%</div>
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
                <b className={`font-mono text-5xl mt-1.5 block filter drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] ${burnoutEEB > 35 ? 'text-[#f87171]' : 'text-[#34d399]'}`}>
                  {burnoutEEB}%
                </b>
                <p className={`margin-0 mt-2 text-[10px] font-bold uppercase tracking-wider ${burnoutEEB > 35 ? 'text-[#f87171]' : 'text-[#34d399]'}`}>
                  {burnoutEEB > 35 ? 'Risco Alto de Estafa/Burnout' : 'Ambiente Saudável e Resiliente'}
                </p>
              </div>
            </div>

            {/* Onda de Estresse em Canvas */}
            <div className="canvas-graph-container w-full h-[115px] relative rounded-xl border border-white/5 bg-[#000]/70 shrink-0 overflow-hidden">
              <canvas ref={canvasRef} width={420} height={115} className="w-full h-full block" />
              <div className="graph-overlay-vals absolute right-3 top-2 text-[8px] font-mono text-white/40 flex flex-col gap-0.5 text-right pointer-events-none">
                <span>Eficiência Saudável: <b className="text-white">{eficienciaSaudavel.toFixed(1)}</b></span>
                <span>Demissões/Mês: <b className="text-white">{demissoesMes} colab.</b></span>
                <span>Faturamento (Φ): <b className="text-[#d4b87a]">R$ {faturamento}k</b></span>
                <span>Perda de Caixa: <b className="text-rose-400">R$ -{custoRealTurnover.toFixed(0)}k</b></span>
              </div>
            </div>

          </div>
        </div>

        {/* Fórmulas Matemáticas do Esgotamento Humano (LaTeX em HTML) */}
        <div className="my-3 p-2.5 bg-black/60 border border-emerald-500/20 rounded-xl text-white font-mono text-[9px] select-none">
          <div className="text-[7.5px] uppercase tracking-wider text-emerald-400 mb-1.5 font-bold flex justify-between">
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
            <h3 className="text-[11px] text-emerald-400 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Alavancas Psico-Operacionais <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/20 to-transparent" />
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
                className="c-slider-input text-emerald-400"
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
                className="c-slider-input text-emerald-400"
              />
            </div>
          </div>

          {/* Análises das Cascatas 1 e 3 */}
          <div className="border-t border-white/5 pt-3 mt-4 space-y-2">
            {burnoutEEB > 30 ? (
              <div className="flex items-start gap-1.5 text-[9px] text-[#f87171] bg-[#f87171]/5 p-2 rounded-lg border border-[#f87171]/20">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span><b>Cascata 1 Ativa:</b> Burnout de {burnoutEEB}% gera desligamento em massa. Custo do turnover totaliza R$ {custoRealTurnover.toFixed(0)}k/mês. EBITDA Líquido cai para R$ {ebitdaLiquido.toFixed(0)}k!</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5 text-[9px] text-emerald-400 bg-emerald-400/5 p-2 rounded-lg border border-emerald-400/20">
                <Heart className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span><b>Equilíbrio Saudável:</b> A produtividade está em excelente harmonia com a saúde da equipe (Eficiência: {eficienciaSaudavel.toFixed(1)}).</span>
              </div>
            )}
          </div>
        </div>

        {/* Micro-Terminal de NLP em Tempo Real */}
        <div className="mt-4 border border-emerald-500/20 bg-[#070707] rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-black/80 px-3 py-1.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[8px] font-bold">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>IPB GEMINI NLP SENTIMENT ANALYZER</span>
            </div>
            <div className="text-[7.5px] font-mono text-white/30">NLP SCANNING</div>
          </div>
          <div className="p-2.5 font-mono text-[7.5px] text-emerald-400/90 h-[70px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
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
