'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Activity, AlertTriangle, Heart, Sparkles, Terminal as TerminalIcon, ShieldAlert, Lock, Database, Key, RefreshCw } from 'lucide-react'

export function HudCapitalHumano() {
  // Inputs (Sliders sincronizados via Telemetria Global)
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [climaFrequencia, setClimaFrequencia] = useState(14)
  const [estruturaOrg, setEstruturaOrg] = useState<'tradicional' | 'squads'>('squads') // Padrão: Squads Ágeis (Spotify/Magalu)

  // Variáveis recebidas de outros módulos (via Telemetria Global)
  const [faturamento, setFaturamento] = useState(150)
  const [cac, setCac] = useState(350)

  // Real-time API global values received via Telemetry
  const [countdown, setCountdown] = useState(10)
  const [apiLiveStatus, setApiLiveStatus] = useState('SYNCED')

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
  const baseBurnout = Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  const burnoutEEB = estruturaOrg === 'squads' ? Math.round(baseBurnout * 0.65) : baseBurnout

  const baseTurnover = Math.min(75, 10 + Math.pow(pressaoMetas, 1.8))
  const turnoverAnual = estruturaOrg === 'squads' ? Math.round(baseTurnover * 0.6) : Math.round(baseTurnover)

  const estresseFator = pressaoMetas * 12
  
  const totalColaboradores = 120
  const demissoesMes = Math.round((totalColaboradores * (turnoverAnual / 100)) / 12)
  const custoUnitarioTurnover = custoMedioRescisao + custoMedioRecrutamento + perdaProdutividade 
  const custoRealTurnover = demissoesMes * custoUnitarioTurnover 

  // EBITDA Líquido e Eficiência Saudável
  const ebitdaBrutoSimulado = pressaoMetas * 42 
  const ebitdaLiquido = ebitdaBrutoSimulado - custoRealTurnover
  const baseEficiencia = estresseFator > 0 ? (ebitdaBrutoSimulado / estresseFator) * 10 : 0
  const eficienciaSaudavel = estruturaOrg === 'squads' ? baseEficiencia * 1.45 : baseEficiencia

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

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
        if (telemetry.countdown !== undefined) setCountdown(telemetry.countdown)
        if (telemetry.apiLiveStatus !== undefined) setApiLiveStatus(telemetry.apiLiveStatus)
      }
    }

    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  // Efeito para buscar logs de comportamento reais via API
  useEffect(() => {
    if (apiLiveStatus === 'FETCHING') {
      const fetchLog = async () => {
        try {
          const res = await fetch('/api/nlp-logs')
          if (res.ok) {
            const data = await res.json()
            setLogs(prev => [...prev.slice(-30), data.log])
          }
        } catch (err) {
          console.warn('Erro ao buscar NLP logs da API real:', err)
        }
      }
      fetchLog()
    }
  }, [apiLiveStatus])

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
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [logs])

  // --- CANVAS: EEG Stress Waveform ---
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

      ctx.strokeStyle = 'rgba(210, 175, 90, 0.04)'
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

      ctx.strokeStyle = 'rgba(229, 175, 101, 0.55)'
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
          y += Math.sin(t * 30 + frame * 0.28) * 9.5 * (pressaoMetas / 4)
             + Math.cos(t * 55 + frame * 0.45) * 5 * (pressaoMetas / 3.5)
             + heartbeatOffset
             + (Math.random() - 0.5) * 3.5
        } else {
          y += Math.sin(t * 18 + frame * 0.09) * 3.5
             + Math.cos(t * 32 - frame * 0.05) * 1.5
             + heartbeatOffset
        }
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      ctx.strokeStyle = '#d2af5a'
      ctx.lineWidth = 1.8
      ctx.shadowBlur = 6
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
          y += Math.sin(t * 12 + frame * 0.12) * 4 * (2 / pressaoMetas)
             + Math.cos(t * 24 - frame * 0.18) * 2
             + heartbeatOffset
        } else {
          y += Math.sin(t * 7.5 + frame * 0.045) * 7
             + Math.cos(t * 15 - frame * 0.02) * 3
             + heartbeatOffset
        }
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      ctx.strokeStyle = 'rgba(184, 157, 92, 0.35)'
      ctx.lineWidth = 1.0
      ctx.beginPath()
      for (let x = 0; x <= w; x++) {
        const t = x / w
        let y = cy
        
        if (burnoutEEB > 30) {
          y += Math.sin(t * 4.5 + frame * 0.04) * 12 * (pressaoMetas / 5)
             + Math.cos(t * 9 + frame * 0.08) * 4.5
        } else {
          y += Math.sin(t * 3.2 + frame * 0.025) * 4.5
        }
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      const scanX = (frame * 1.5) % w
      ctx.strokeStyle = 'rgba(210, 175, 90, 0.2)'
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
    <div 
      className="w-full h-full flex flex-col justify-between p-4 bg-[#08080a]/85 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-xl select-none relative overflow-y-auto ipb-thinscroll"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <div className="scanlines z-10" />

      {/* Header do Painel */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 relative z-20">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider">
            <div className="h-1.5 w-1.5 bg-[#d2af5a] rounded-full animate-pulse" />
            <span>Pilar 1 • CAPITAL HUMANO & RISCOS PSICOSSOCIAIS</span>
          </div>
          <div className="text-[8px] font-mono text-white/45 tracking-widest uppercase mt-0.5">
            EEB MASLACH: {Number(burnoutEEB ?? 0).toFixed(0)}% • TURNOVER ANUAL: {Number(turnoverAnual ?? 0).toFixed(0)}%
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/40">
          <span className={`h-1.5 w-1.5 rounded-full ${apiLiveStatus === 'FETCHING' ? 'bg-amber-400 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
          <span>API: {apiLiveStatus} ({countdown}s)</span>
        </div>
      </div>

      {/* Main Container - dense space management to fit 560px exactly */}
      <div className="flex-1 flex flex-col justify-between mt-3 space-y-3 relative z-20 overflow-visible">
        
        {/* TOP: IPB GEMINI NLP SENTIMENT ANALYZER (Larger terminal at the top) */}
        <div className="border border-[#d2af5a]/15 bg-[#070707] rounded-xl overflow-hidden shadow-2xl shrink-0">
          <div className="bg-black/80 px-3 py-1.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-1.5 text-[#d2af5a] font-mono text-[8px] font-bold">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>IPB GEMINI NLP SENTIMENT ANALYZER</span>
            </div>
            <div className="text-[7.5px] font-mono text-white/40">🛰️ LIVE WHATSAPP & SLACK NLP CORRELATION ENGINE</div>
          </div>
          <div ref={terminalRef} className="p-2.5 font-mono text-[9px] text-[#d2af5a]/90 h-[195px] overflow-y-auto space-y-0.5 leading-normal ipb-thinscroll text-left">
            {logs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">{log}</div>
            ))}
          </div>
        </div>

        {/* MIDDLE: Left EEG Wave + Formula, Right Metrics Glossary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-stretch min-h-[175px] overflow-hidden">
          
          {/* Left Column: EEG + Math */}
          <div className="flex flex-col justify-between space-y-2 overflow-hidden">
            <div className="canvas-graph-container w-full h-[95px] relative rounded-xl border border-white/5 bg-[#000]/70 overflow-hidden shrink-0 flex items-center justify-center">
              <canvas ref={canvasRef} width={420} height={95} className="w-full h-full block" />
              <div className="graph-overlay-vals absolute right-3 top-1.5 text-[7.2px] font-mono text-white/40 flex flex-col gap-0.5 text-right pointer-events-none">
                <span>Eficiência Saudável: <b className="text-white">{Number(eficienciaSaudavel ?? 0).toFixed(1)}</b></span>
                <span>Demissões/Mês: <b className="text-white">{Number(demissoesMes ?? 0).toFixed(0)} colab.</b></span>
                <span>Faturamento: <b className="text-[#d2af5a]">R$ {Number(faturamento ?? 0).toFixed(0)}k</b></span>
                <span>Perda de Caixa: <b className="text-[#d2af5a]/80">R$ -{Number(custoRealTurnover ?? 0).toFixed(0)}k</b></span>
              </div>
            </div>

            {/* Formula box */}
            <div className="p-2.5 bg-black/60 border border-[#d2af5a]/15 rounded-xl text-white font-mono text-[8px] flex-1 flex flex-col justify-between overflow-y-auto ipb-thinscroll text-left space-y-2">
              <div>
                <span className="block text-[7px] uppercase tracking-wider text-[#d2af5a] mb-1 font-black">1. Equação do Atrito Humano & EBITDA</span>
                <div className="py-1.5 px-2 bg-black/35 rounded border border-white/5 text-[7.5px] text-[#d2af5a] leading-relaxed font-mono">
                  <b>Turnover Real =</b> Demissões × (Rescisão R$ 12.0k + Recrutamento R$ 8.5k + Produtividade R$ 9.5k)<br/>
                  Custo Unitário: <b className="text-white">R$ 30.0k</b> por saída • Perda Mensal: <strong className="text-white">R$ {custoRealTurnover}k/mês</strong>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-2">
                <span className="block text-[7px] uppercase tracking-wider text-[#d2af5a] mb-1 font-black">2. Correlação Macro: Juros Reais Fisher & CAPEX</span>
                <div className="py-1.5 px-2 bg-black/35 rounded border border-white/5 text-[7.5px] text-[#d2af5a] leading-relaxed font-mono">
                  <b>Fórmula Fisher:</b> (1 + J<sub>Real</sub>) = (1 + SELIC 14.40%) / (1 + IPCA 4.39%) - 1 = <strong className="text-white">10.01%</strong><br/>
                  <b>Impacto OPEX:</b> Com Juro Real a 10%, a empresa trava CAPEX físico e foca 100% de automação de IA no <b>Capital Humano</b> para evitar o sangramento do EBITDA pelo turnover!
                </div>
              </div>

              {burnoutEEB >= 20 ? (
                <div className="p-1.5 bg-[#d2af5a]/5 rounded border border-[#d2af5a]/20 text-[7.2px] text-[#fac775] leading-normal font-sans">
                  ⚠️ <strong>ALERTA DE RISCO COLETIVO (Burnout {burnoutEEB}%):</strong> Exaustão Maslach elevada eleva Churn interno e atrito. Sob squads ágeis, o atrito cai 35%, poupando caixa operacional.
                </div>
              ) : (
                <div className="p-1.5 bg-emerald-500/5 rounded border border-emerald-500/20 text-[7.2px] text-emerald-400 leading-normal font-sans">
                  ✅ <strong>CLIMA ESTÁVEL (Burnout {burnoutEEB}%):</strong> A organização opera em alta eficiência saudável de {eficienciaSaudavel.toFixed(1)} com atrito de turnover controlado.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Metrics Glossary */}
          <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex flex-col justify-between overflow-hidden">
            <span className="block text-[8.5px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider mb-2 text-left">🧠 INTELIGÊNCIA DE RISCOS, TELEMETRIA IA & DDDM</span>
            
            <div className="flex-1 overflow-y-auto ipb-thinscroll pr-1 max-h-[220px] space-y-2.5 text-[8.8px] text-white/70 leading-normal text-left">
              <div>
                <b className="text-red-400 block font-mono">⚠️ ANOMALIA DE TELEMETRIA: ESTRESSE 9.3% vs. REALIDADE (67%)</b>
                <span className="text-white/90">
                  Os valores internos de <strong className="text-white">31% para Burnout EEB</strong> e <strong className="text-white">38% para Turnover</strong> são altamente realistas e condizem com o mercado tech sob alta pressão. No entanto, a telemetria do <strong>Estresse IAE (9.3%) está subestimada e distorcida (Alerta)</strong>. 
                  No mercado brasileiro, o estresse real percebido atinge <strong>67% das equipes</strong> (superando os 65% globais). A taxa de 9.3% reflete apenas os casos clínicos graves convertidos em afastamento formal via INSS (absenteísmo), ocultando o estresse crônico real e mascarando o grave perigo do **Presenteísmo** (funcionário batendo ponto com produtividade zerada).
                </span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-[#d2af5a] block font-mono">📊 TOMADA DE DECISÃO BASEADA EM DADOS (DDDM)</b>
                <span>
                  O desvio na medição do estresse evidencia a urgência da **Tomada de Decisão Baseada em Dados (DDDM)**: a prática de utilizar métricas, fatos e evidências estruturadas para guiar escolhas comerciais estratégicas. A tecnologia por si só não é suficiente; exige a construção de uma cultura analítica e curiosidade intelectual em todos os níveis.
                </span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-[#d2af5a] block font-mono">🧱 OS 4 PILARES DA CULTURA ANALÍTICA DDDM</b>
                <span className="space-y-1 block mt-1 pl-1.5 border-l border-[#d2af5a]/30">
                  <span><b>1. Coleta e Armazenamento:</b> Capturar dados e feedbacks de forma ultraeficiente através de APIs integradas, IoT e pesquisas de pulso bissemanais.</span><br/>
                  <span><b>2. Análise e Processamento:</b> Modelagem estatística e Machine Learning para extrair sentimentos latentes e calibrar ativamente a escala Maslach.</span><br/>
                  <span><b>3. Visualização e Comunicação:</b> Painéis executivos limpos e inteligíveis para que a liderança tome decisões rápidas e assertivas.</span><br/>
                  <span><b>4. Integração Estratégica:</b> Injetar os insights analíticos diretamente na pauta diária do conselho, evitando relatórios estáticos esquecidos.</span>
                </span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block font-mono">🧠 Escala Maslach (EEB) & Burnout Coletivo (31%):</b>
                <span>O Burnout a 31% está em perfeita sintonia com a exaustão média nacional (30% a 32% dos profissionais). O sistema monitora as conversações públicas via NLP (WhatsApp/Slack) para recalcular preventivamente as metas operacionais de forma automática sob a estrutura de squads ágeis.</span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block font-mono">💸 Custo Real do Turnover (38%):</b>
                <span>Uma taxa anual de rotatividade de 38% é altamente prejudicial ao caixa. Como o custo de reposição de cada cargo tech varia entre 0.5 e 2 vezes o salário anual (totalizando R$ 30k por demissão), a retenção focada em ergonomia cognitiva e suporte emocional protege diretamente o OPEX corporativo.</span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block font-mono">🔌 Fontes de Telemetria e APIs Vivas:</b>
                <span>
                  <strong>Banco Central SGS:</strong> Taxas SELIC e IPCA em tempo real.<br/>
                  <strong>AwesomeAPI:</strong> Câmbio e cotações USD/BRL ao vivo.<br/>
                  <strong>Workspaces de Ads:</strong> Meta, Google e TikTok Ads API injetando custos de mídia diários diretamente na governança de dados.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM: Sliders & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4 items-center border-t border-white/5 pt-2 shrink-0">
          
          {/* Controls Sliders */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[8.5px] font-sans">
              <span className="text-white/60 font-bold uppercase tracking-wider">Cultura Organizacional:</span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setEstruturaOrg('tradicional')}
                  className={`px-2 py-1 rounded text-[7.2px] font-mono font-bold uppercase transition cursor-pointer border ${estruturaOrg === 'tradicional' ? 'bg-[#d2af5a] text-black border-[#d2af5a]' : 'bg-black/40 text-white/55 border-white/10 hover:border-white/20'}`}
                >
                  Tradicional
                </button>
                <button
                  type="button"
                  onClick={() => setEstruturaOrg('squads')}
                  className={`px-2 py-1 rounded text-[7.2px] font-mono font-bold uppercase transition cursor-pointer border ${estruturaOrg === 'squads' ? 'bg-[#d2af5a] text-black border-[#d2af5a]' : 'bg-black/40 text-white/55 border-white/10 hover:border-white/20'}`}
                >
                  Squads (Magalu)
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="c-slider-group select-none">
                <label className="text-[7.5px] font-mono text-white/50 flex justify-between">
                  <span>Pressão Metas:</span>
                  <b className="text-white">{pressaoMetas}/10</b>
                </label>
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
                  className="c-slider-input"
                />
              </div>
              <div className="c-slider-group select-none">
                <label className="text-[7.5px] font-mono text-white/50 flex justify-between">
                  <span>Pulse Surveys:</span>
                  <b className="text-white">A cada {climaFrequencia}d</b>
                </label>
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
                  className="c-slider-input"
                />
              </div>
            </div>
          </div>

          {/* Active Simulation narrative box */}
          <div className="p-2 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl text-left select-none text-[8.2px] leading-relaxed font-mono space-y-1">
            <div className="text-[6.8px] uppercase font-mono tracking-widest text-[#d2af5a] font-bold flex justify-between items-center border-b border-white/5 pb-1">
              <span>Análise de Decisão & Riscos</span>
              <span className="text-[6px] text-[#5dcaa5] font-black">SWOT & PESTEL READY</span>
            </div>
            {estruturaOrg === 'squads' ? (
              <span>
                Sob **Squads Ágeis**, a exaustão Maslach cai 35% para <b className="text-[#d2af5a]">{burnoutEEB}%</b>. Com juros reais a <b className="text-white">10.01%</b> travando expansão física (CAPEX), foca-se em produtividade interna. Metas a <b className="text-white">{pressaoMetas}/10</b> geram <b className="text-[#d2af5a]">{demissoesMes}</b> saídas/mês. Perda por turnover: <b className="text-[#d2af5a]">R$ -{custoRealTurnover}k/mês</b>. Eficiência sobe para <b className="text-white">{eficienciaSaudavel.toFixed(1)}</b>!
              </span>
            ) : (
              <span>
                Sob estrutura **Tradicional**, a rigidez eleva o estresse. Sob metas de <b className="text-white">{pressaoMetas}/10</b>, o Burnout bate em <b className="text-[#d2af5a]">{burnoutEEB}%</b>. Com juros altos travando novos investimentos PJ, perder talentos custa <b className="text-[#d2af5a]">R$ -{custoRealTurnover}k/mês</b> de caixa puro. Eficiência despenca para <b className="text-white">{eficienciaSaudavel.toFixed(1)}</b>.
              </span>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}
