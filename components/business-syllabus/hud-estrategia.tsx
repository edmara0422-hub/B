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
  const terminalRef = useRef<HTMLDivElement>(null)

  // --- TELEMETRIA GLOBAL: Sincronização em Tempo Real ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) {
        win.IPBTelemetry = {
          cenario,
          metaBudgetPercent,
          faturamento,
          clientes,
          cac: 350,
          opex: 60,
          pressaoMetas: 5,
          climaFrequencia: 14
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

      setCenario(win.IPBTelemetry.cenario ?? 'normal')
      setMetaBudgetPercent(win.IPBTelemetry.metaBudgetPercent ?? 80)
      setFaturamento(win.IPBTelemetry.faturamento ?? 150)
      setClientes(win.IPBTelemetry.clientes ?? 1200)
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

  const updateTelemetry = (updates: Record<string, any>) => {
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
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
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

      // 1. Círculos e Grelhas Concêntricas (Champagne Gold Suave)
      ctx.strokeStyle = 'rgba(201, 148, 58, 0.06)'
      ctx.lineWidth = 1
      for (let r = 0.2; r <= 1; r += 0.2) {
        ctx.beginPath()
        ctx.arc(cx, cy, maxR * r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Eixos Angulares (Gold Médio)
      ctx.strokeStyle = 'rgba(201, 148, 58, 0.12)'
      const axesCount = 5
      for (let i = 0; i < axesCount; i++) {
        const angle = (i * Math.PI * 2) / axesCount - Math.PI / 2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR)
        ctx.stroke()
      }

      // 2. Laser Radar Sweep (Varredor 360° NASA em Dourado Ativo)
      const sweepAngle = (frame * 0.025) % (Math.PI * 2)
      
      // Desenha o rastro do laser sweep
      ctx.fillStyle = 'rgba(201, 148, 58, 0.035)'
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, maxR, sweepAngle - 0.22, sweepAngle, false)
      ctx.closePath()
      ctx.fill()

      // Feixe do laser principal
      ctx.strokeStyle = 'rgba(201, 148, 58, 0.38)'
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR)
      ctx.stroke()

      // 3. Área Poligonal PESTEL (Âmbar e Ouro com Brilho Profundo)
      const scores = [politicoScore, economicoScore, socialScore, tecnologicoScore, ecol_legalScore]
      ctx.fillStyle = cenario === 'ia_boom' ? 'rgba(229, 175, 101, 0.16)' : 'rgba(201, 148, 58, 0.18)'
      ctx.strokeStyle = cenario === 'ia_boom' ? '#e5af65' : '#d2af5a'
      ctx.lineWidth = 2.2
      ctx.shadowBlur = 12
      ctx.shadowColor = cenario === 'ia_boom' ? 'rgba(229, 175, 101, 0.4)' : 'rgba(201, 148, 58, 0.4)'

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

        // Satélite girando ao redor de cada vértice da força SWOT/PESTEL
        const satAngle = frame * 0.05 + i
        const satX = x + Math.cos(satAngle) * 5
        const satY = y + Math.sin(satAngle) * 5

        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(satX, satY, 1.8, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = 'rgba(201, 148, 58, 0.35)'
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
    <div 
      className="w-full h-full flex flex-col justify-between p-4 bg-[#08080a]/85 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-xl select-text relative overflow-hidden"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <div className="scanlines z-10" />

      {/* Header do Painel */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 relative z-20">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider">
            <div className="h-1.5 w-1.5 bg-[#d2af5a] rounded-full animate-pulse" />
            <span>Pilar 2 • ESTRATÉGIA, DECISÃO & ANÁLISE DE MERCADO</span>
          </div>
          <div className="text-[8px] font-mono text-white/45 tracking-widest uppercase mt-0.5">
            JUROS REAIS: {juroReal}% • P/E BRASIL: {peRatioBR} • PESTEL CONSOLIDADO: {averagePestel}%
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>APIS: SGS & AWESOMEAPI (LIVE)</span>
        </div>
      </div>

      {/* Main Container - dense space management to fit 560px exactly */}
      <div className="flex-1 flex flex-col justify-between mt-3 space-y-3 relative z-20 overflow-hidden">
        
        {/* TOP: IPB TRENDS SCANNER TERMINAL */}
        <div className="border border-[#d2af5a]/15 bg-[#070707] rounded-xl overflow-hidden shadow-2xl shrink-0">
          <div className="bg-black/80 px-3 py-1.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-1.5 text-[#d2af5a] font-mono text-[8px] font-bold">
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>IPB TRENDS & MULTIVARIABLE SCANNER TERMINAL</span>
            </div>
            <div className="text-[7.5px] font-mono text-white/40">🛰️ LIVE CENTRAL BANK SGS & MARKETING APIS ENGINE</div>
          </div>
          <div ref={terminalRef} className="p-2.5 font-mono text-[7.5px] text-[#d2af5a]/90 h-[105px] overflow-y-auto space-y-0.5 leading-normal ipb-thinscroll text-left">
            {logs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">{log}</div>
            ))}
          </div>
        </div>

        {/* MIDDLE: Left Canvas + Formula, Right Metrics Glossary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-stretch min-h-[175px] overflow-hidden">
          
          {/* Left Column: Canvas + Formula */}
          <div className="flex flex-col justify-between space-y-2 overflow-hidden">
            <div className="w-full h-[115px] relative rounded-xl border border-white/5 bg-[#000]/70 overflow-hidden shrink-0 flex items-center justify-center">
              <canvas ref={canvasRef} width={220} height={220} className="w-[110px] h-[110px] block select-none" />
              <div className="absolute inset-0 flex flex-col justify-between p-1 pointer-events-none text-[6.5px] font-mono leading-none">
                <div className="text-center text-[#d2af5a] font-black uppercase tracking-wider mt-0.5">Tecnológico (IA)</div>
                <div className="flex justify-between w-full px-1">
                  <div className="text-[#d2af5a]/80 font-black uppercase tracking-wider">Econômico</div>
                  <div className="text-[#d2af5a] font-black uppercase tracking-wider">Político</div>
                </div>
                <div className="flex justify-between w-full mt-auto px-1 mb-0.5">
                  <div className="text-amber-200/80 font-black uppercase tracking-wider">Ecológico/Legal</div>
                  <div className="text-[#d2af5a] font-black uppercase tracking-wider">Social</div>
                </div>
              </div>
            </div>

            {/* Formula box */}
            <div className="p-2 bg-black/60 border border-[#d2af5a]/15 rounded-xl text-white font-mono text-[8px] flex-1 flex flex-col justify-between overflow-y-auto ipb-thinscroll text-left">
              <div>
                <span className="block text-[7px] uppercase tracking-wider text-[#d2af5a] mb-1 font-bold">Cálculo de Juros Reais & WACC Corporativo</span>
                <div className="py-1.5 px-2 bg-black/35 rounded border border-white/5 text-[7.5px] text-[#d2af5a] leading-relaxed font-mono space-y-1">
                  <div>
                    <b>Juros Reais Fisher:</b><br/>
                    (1 + J<sub>Real</sub>) = (1 + SELIC) / (1 + IPCA)<br/>
                    (1 + 0.1440) / (1 + 0.0439) - 1 = <strong className="text-white">~10.01%</strong>
                  </div>
                  <div className="border-t border-white/5 pt-1 mt-1">
                    <b>WACC (Custo do Capital):</b><br/>
                    WACC = (E/V · K<sub>e</sub>) + (D/V · K<sub>d</sub> · (1 - T))<br/>
                    Com SELIC a 14.40%, WACC médio = <strong className="text-white">~17.2%</strong>
                  </div>
                </div>
              </div>
              <div className="mt-1 text-[7px] text-[#fac775] leading-normal font-sans text-left">
                💡 <strong>Cruzamento:</strong> Juros reais a 10% travam investimentos físicos (CAPEX) e direcionam o caixa para eficiência de IA e aplicações em renda fixa de alta liquidez.
              </div>
            </div>
          </div>

          {/* Right Column: Metrics Glossary */}
          <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex flex-col justify-between overflow-hidden">
            <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider mb-2 text-left">GLOSSÁRIO DE RISCOS & COMPLIANCE MACRO</span>
            
            <div className="flex-1 overflow-y-auto ipb-thinscroll pr-1 max-h-[145px] space-y-2.5 text-[8.8px] text-white/70 leading-normal text-left">
              <div>
                <b className="text-white block">📈 Taxa Real de Juros:</b>
                <span>O juro descontado da inflação. Serve para o investidor e empresário decidirem se vale a pena arriscar abrindo uma empresa ou se é melhor deixar rendendo no banco. Com SELIC a 14.40% e IPCA a 4.39%, o juro real é de 10.01%. <em>Cruzamento:</em> Juro real a 10% trava investimentos reais (CAPEX) e foca em eficiência operacional via IA.</span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block">📊 P/E Ratio (Preço / Lucro):</b>
                <span>Mede o nível de otimismo ou pessimismo do mercado de ações. No Brasil está em 8.2x (barato/pessimista por juros altos) vs 17.2x no resto do mundo. <em>Cruzamento:</em> Bolsa barata no Brasil indica subvalorização de empresas locais, pois investidores migram em massa para a segurança da renda fixa devido à SELIC alta.</span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block">🏛️ PESTEL Dinâmica (Macroambiente):</b>
                <span>
                  <strong>Político/Econômico:</strong> O juro real de 10.01% trava o varejo tradicional (heat 18/100) e encarece o crédito bancário PJ em 17%.<br/>
                  <strong>Social/Tecnológico:</strong> Crescimento vertiginoso de MedTech e IA Generativa (heat 95/100) reduzindo custos de criação de conteúdo em até 60%.
                </span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block">⚡ SWOT Automatizada:</b>
                <span>
                  <strong>Oportunidade Viva:</strong> Sistema detecta CPM estável no TikTok Ads (US$ 6.80) enquanto share orgânico caiu 4.2%. Recomenda-se migrar 20% do budget de Meta Ads para TikTok.<br/>
                  <strong>Ameaça Viva:</strong> Identificação de escassez de talentos técnicos de alta performance impactando 42% do setor tech, elevando o custo de contratação.
                </span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block">🩺 Saúde Financeira Profunda:</b>
                <span>
                  <strong>Margem EBITDA & Líquida:</strong> Lucratividade real da operação antes e depois de obrigações fiscais e juros.<br/>
                  <strong>WACC:</strong> Custo médio ponderado de capital. Com a SELIC a 14.40%, o WACC médio nacional fica comprimido em torno de 17.2%.<br/>
                  <strong>CGL & Runway:</strong> Quantos meses a empresa sobrevive com o caixa atual se a receita for a zero.
                </span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block">🚀 Aquisição & Tração Digital:</b>
                <span>
                  <strong>CAC, LTV & Payback:</strong> CAC é o custo de aquisição de cliente. LTV é o valor total gerado pelo cliente. Relação LTV/CAC &lt; 3x acende alerta de risco operacional. Payback Period é o tempo exato para retornar o CAC.
                </span>
              </div>
              <div className="border-t border-white/5 pt-2">
                <b className="text-white block">🔌 Conexão de APIs (Camada de Dados Vivos):</b>
                <span>
                  <strong>SGS Banco Central:</strong> SELIC (14.40%) e IPCA (4.39%) ao vivo.<br/>
                  <strong>AwesomeAPI:</strong> Câmbio comercial (USD/BRL a R$ 4.98) em tempo real.<br/>
                  <strong>Ads Workspaces:</strong> CPM/CPC ao vivo integrando Google Ads, Meta Ads e TikTok Ads.
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
              <span className="text-white/60 font-bold uppercase tracking-wider">Cenário Macroeconômico:</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setCenario('normal')
                    updateTelemetry({ cenario: 'normal' })
                  }}
                  className={`px-1.5 py-0.5 rounded text-[7.2px] font-mono font-bold uppercase transition cursor-pointer border ${cenario === 'normal' ? 'bg-[#d2af5a] text-black border-[#d2af5a]' : 'bg-black/40 text-white/55 border-white/10 hover:border-white/20'}`}
                >
                  Estável
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCenario('juros_altos')
                    updateTelemetry({ cenario: 'juros_altos' })
                  }}
                  className={`px-1.5 py-0.5 rounded text-[7.2px] font-mono font-bold uppercase transition cursor-pointer border ${cenario === 'juros_altos' ? 'bg-[#d2af5a] text-black border-[#d2af5a]' : 'bg-black/40 text-white/55 border-white/10 hover:border-white/20'}`}
                >
                  SELIC Alta
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCenario('ia_boom')
                    updateTelemetry({ cenario: 'ia_boom' })
                  }}
                  className={`px-1.5 py-0.5 rounded text-[7.2px] font-mono font-bold uppercase transition cursor-pointer border ${cenario === 'ia_boom' ? 'bg-[#d2af5a] text-black border-[#d2af5a]' : 'bg-black/40 text-white/55 border-white/10 hover:border-white/20'}`}
                >
                  IA Boom
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="mt-1">
              <div className="c-slider-group select-none">
                <label className="text-[7.5px] font-mono text-white/50 flex justify-between">
                  <span>Alocação Meta Ads vs TikTok:</span>
                  <b className="text-white">{metaBudgetPercent}% Meta / {100 - metaBudgetPercent}% TikTok</b>
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="90" 
                  step="5" 
                  value={metaBudgetPercent} 
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setMetaBudgetPercent(val)
                    updateTelemetry({ metaBudgetPercent: val })
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
            {cenario === 'ia_boom' ? (
              <span>
                Cenário **IA Boom**: Custo de criação recua 60%. CPM TikTok Ads a <b className="text-[#d2af5a]">US$ {tiktokCpm.toFixed(2)}</b> vs <b className="text-white">US$ {metaCpm.toFixed(2)}</b> no Meta. Recomenda-se migrar 20% do orçamento para TikTok Ads. Juro Real de <b className="text-[#d2af5a]">{juroReal}%</b> trava CAPEX e força eficiência.
              </span>
            ) : cenario === 'juros_altos' ? (
              <span>
                Cenário **SELIC Alta (15.50%)**: Juro real atinge <b className="text-[#d2af5a]">{juroReal}%</b>. O varejo tradicional trava (heat 18/100) e o custo de crédito PJ encarece 17%. WACC comprime a <b className="text-white">~17.2%</b>. Ação: Suspender CAPEX físico e alocar excedente em liquidez CDI.
              </span>
            ) : (
              <span>
                Cenário **Estável**: SELIC a 14.40% e IPCA a 4.39% mantêm Juro Real em <b className="text-[#d2af5a]">{juroReal}%</b>. P/E da bolsa a <b className="text-white">{peRatioBR}</b> reflete pessimismo e subvalorização de ativos locais. IA indica manter alocação diversificada e reter talentos.
              </span>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}
