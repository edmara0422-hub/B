'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, HelpCircle, Lightbulb, Edit3, Sparkles, Copy, Check } from 'lucide-react'

type SieSubTab = 'forecast' | 'inovacao' | 'canvas'

export function SiePanel({ initialTab }: { initialTab?: SieSubTab }) {
  const [subTab, setSubTab] = useState<SieSubTab>(initialTab || 'forecast')

  useEffect(() => {
    if (initialTab) {
      setSubTab(initialTab)
    }
  }, [initialTab])
  
  // State for Pitch Simulator
  const [pitchName, setPitchName] = useState('IP BUSINESS')
  const [pitchTarget, setPitchTarget] = useState('startups e PMEs de escala')
  const [pitchPain, setPitchPain] = useState('tomar decisões demoradas e erradas por falta de dados centralizados')
  const [pitchMarket, setPitchMarket] = useState('cockpit operacional inteligente')
  const [pitchDifference, setPitchDifference] = useState('nossa IA que correlaciona a saúde comportamental dos líderes com os números financeiros')
  const [pitchResult, setPitchResult] = useState('')
  const [optimizing, setOptimizing] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // State for Canvas Blocks (Interactive)
  const [canvasData, setCanvasData] = useState({
    problema: `• Decisões demoradas por falta de dados unificados.\n• Dificuldade em cruzar scores comportamentais (HHS) com runway financeiro.\n• Alternativas existentes: planilhas desconectadas e relatórios manuais.`,
    solucao: `• Cockpit operacional e estratégico unificado.\n• Score Lencioni/HHS nativo e automatizado.\n• AI Advisor em tempo real.`,
    metricas: `• LTV/CAC Ratio > 3x.\n• Runway > 18 meses.\n• Retenção Mensal (NDR) > 105%.`,
    proposta: `• Transformamos o caos operacional em previsibilidade financeira e alinhamento de liderança em 5 minutos diários.\n• Tese: Organização saudável + Finanças calibradas = Tração.`,
    vantagem: `• Algoritmo proprietário de correlação de produtividade comportamental e queima de caixa (Runway).`,
    canais: `• Vendas enterprise diretas (Outbound).\n• Redes de investidores e aceleradoras associadas.`,
    clientes: `• Startups de tecnologia em estágio de escala (Series A/B).\n• PMEs digitais em rápida expansão com times remotos.\n• Early adopters: C-Levels, Founders.`,
    custos: `• APIs de IA e Infraestrutura Cloud (40%)\n• R&D de Engenharia e Produto (40%)\n• CAC & Marketing Digital (20%)`,
    receitas: `• Assinatura SaaS recorrente por Tier (Setup: $5k flat, Licença: $1.2k/mês).\n• Upsells de análises preditivas customizadas de IA ($400/mês).`
  })

  // State for Forecast Sliders (Live Update)
  const [runwayMultiplier, setRunwayMultiplier] = useState(1)

  const handleCanvasChange = (key: keyof typeof canvasData, val: string) => {
    setCanvasData(prev => ({ ...prev, [key]: val }))
  }

  const handleSimulatePitch = () => {
    if (!pitchName || !pitchTarget || !pitchPain || !pitchMarket || !pitchDifference) {
      alert('Por favor, preencha todos os campos do Pitch!')
      return
    }
    const pitch = `Para ${pitchTarget} que sofrem com ${pitchPain}, o ${pitchName} é um ${pitchMarket} que entrega máxima clareza estratégica. Ao contrário de planilhas engessadas e relatórios manuais, nosso grande diferencial competitivo é ${pitchDifference}. Quer conhecer em uma demo de 5 minutos?`
    setPitchResult(pitch)
    setCopied(false)
  }

  const handleCopyPitch = () => {
    if (!pitchResult) return
    navigator.clipboard.writeText(pitchResult)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOptimizePitch = () => {
    if (!pitchResult) return
    setOptimizing(true)
    setTimeout(() => {
      let optimized = pitchResult.replace('entrega máxima clareza estratégica.', 'transforma dados desconectados em $120k economizados de desperdício em média.')
      optimized = optimized.replace('Quer conhecer em uma demo de 5 minutos?', 'Podemos sincronizar uma demonstração nesta terça às 14h?')
      setPitchResult(optimized)
      setOptimizing(false)
    }, 1000)
  }

  return (
    <div className="w-full space-y-4">
      {/* Sub tabs Row */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-2.5">
        {(['forecast', 'inovacao', 'canvas'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-4 py-2 text-[11px] lg:text-xs rounded-md font-medium tracking-wide transition ${
              subTab === tab
                ? 'bg-[#d4b87a]/10 border border-[#d4b87a]/30 text-[#e0c887]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            {tab === 'forecast' && 'Cenários & Forecast'}
            {tab === 'inovacao' && 'Inovação'}
            {tab === 'canvas' && 'Canvas & Pitch'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'forecast' && (
          <motion.div
            key="forecast"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="ipb-soft relative overflow-hidden rounded-[1.2rem] p-6 lg:p-8 border border-white/[0.06]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d4b87a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 01 ◆ Cenários & Forecast</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Cockpit <span className="text-[#d4b87a] font-medium">Estratégico</span>
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-lg">
                    Onde estamos hoje? Para onde vamos? Projeções de caixa e forecast de crescimento.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d4b87a]/5 border border-[#d4b87a]/15 text-[8.5px] font-mono text-[#d4b87a]">
                  <TrendingUp className="h-3 w-3" />
                  <span>PREVISÃO INTERATIVA</span>
                </div>
              </div>

              {/* Pergunta do Dia */}
              <div className="bg-[#d4b87a]/[0.02] border-l-2 border-[#d4b87a] p-4 rounded-r-md mb-6">
                <span className="block text-[8px] font-mono font-bold tracking-wider text-[#d4b87a] mb-1">PERGUNTA DO DIA</span>
                <p className="text-[11.5px] lg:text-xs italic text-white/90">
                  "Em qual fase estamos hoje? E em qual fase o mercado ao redor já chegou? A diferença entre as duas respostas é o gap que precisa ser fechado."
                </p>
              </div>

              {/* Forecast adjustment slider */}
              <div className="bg-black/25 border border-white/[0.04] p-4 rounded-xl mb-6 space-y-2">
                <div className="flex justify-between text-[9px] font-mono text-white/55">
                  <span>AJUSTE MULTIPLICADOR DE TRAÇÃO</span>
                  <span className="text-[#d4b87a] font-bold">{runwayMultiplier.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={runwayMultiplier}
                  onChange={(e) => setRunwayMultiplier(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4b87a]"
                />
              </div>

              {/* Forecast SVG Chart */}
              <div className="w-full bg-black/15 p-4 rounded-xl border border-white/[0.04]">
                <svg viewBox="0 0 800 280" className="w-full h-[220px] lg:h-[260px]">
                  <defs>
                    <linearGradient id="fcA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#e8cc88" stop-opacity={0.35 * runwayMultiplier}/>
                      <stop offset="100%" stop-color="#e8cc88" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  <g stroke="rgba(180,145,70,0.06)">
                    <line x1="0" y1="60" x2="800" y2="60"/>
                    <line x1="0" y1="120" x2="800" y2="120"/>
                    <line x1="0" y1="180" x2="800" y2="180"/>
                    <line x1="0" y1="240" x2="800" y2="240"/>
                  </g>
                  
                  {/* Fill Area Optimistic */}
                  <path d={`M0,230 L66,210 L133,190 L200,${165 / runwayMultiplier} L266,${140 / runwayMultiplier} L333,${110 / runwayMultiplier} L400,${85 / runwayMultiplier} L466,${65 / runwayMultiplier} L533,${50 / runwayMultiplier} L600,${38 / runwayMultiplier} L666,${30 / runwayMultiplier} L733,${22 / runwayMultiplier} L800,${18 / runwayMultiplier} L800,280 L0,280 Z`} fill="url(#fcA)"/>
                  
                  {/* Optimistic Line (Gold) */}
                  <path d={`M0,230 L66,210 L133,190 L200,${165 / runwayMultiplier} L266,${140 / runwayMultiplier} L333,${110 / runwayMultiplier} L400,${85 / runwayMultiplier} L466,${65 / runwayMultiplier} L533,${50 / runwayMultiplier} L600,${38 / runwayMultiplier} L666,${30 / runwayMultiplier} L733,${22 / runwayMultiplier} L800,${18 / runwayMultiplier}`} fill="none" stroke="#e8cc88" strokeWidth="2.5"/>
                  
                  {/* Base Line (Silver) */}
                  <path d={`M0,240 L66,232 L133,222 L200,${210 / (runwayMultiplier * 0.9)} L266,${196 / (runwayMultiplier * 0.9)} L333,${182 / (runwayMultiplier * 0.9)} L400,${166 / (runwayMultiplier * 0.9)} L466,${150 / (runwayMultiplier * 0.9)} L533,${138 / (runwayMultiplier * 0.9)} L600,${124 / (runwayMultiplier * 0.9)} L666,${114 / (runwayMultiplier * 0.9)} L733,${104 / (runwayMultiplier * 0.9)} L800,${96 / (runwayMultiplier * 0.9)}`} fill="none" stroke="#c0c5cc" strokeWidth="2"/>
                  
                  {/* Pessimistic Line (Dotted Gray) */}
                  <path d="M0,250 L66,246 L133,242 L200,236 L266,230 L333,222 L400,214 L466,208 L533,200 L600,194 L666,188 L733,182 L800,176" fill="none" stroke="#6e6a70" strokeWidth="1.8" strokeDasharray="6 4"/>
                  
                  {/* X Axis Labels */}
                  <g fill="#b8975a" font-family="Poppins, sans-serif" font-size="9" font-weight="500">
                    <text x="0" y="270">JAN</text>
                    <text x="200" y="270">ABR</text>
                    <text x="400" y="270">JUL</text>
                    <text x="600" y="270">OUT</text>
                    <text x="770" y="270">DEZ</text>
                  </g>

                  {/* Dynamic value chips */}
                  <g font-family="Poppins, sans-serif" font-size="10.5" font-weight="600">
                    <text x="796" y={Math.max(25, 18 / runwayMultiplier)} textAnchor="end" fill="#e8cc88">Otimista · R$ {(142 * runwayMultiplier).toFixed(0)}k</text>
                    <text x="796" y={Math.max(105, 96 / (runwayMultiplier * 0.9))} textAnchor="end" fill="#c0c5cc">Base · R$ {(98 * runwayMultiplier).toFixed(0)}k</text>
                    <text x="796" y="180" textAnchor="end" fill="#7a7680">Pessimista · R$ 62k</text>
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'inovacao' && (
          <motion.div
            key="inovacao"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="ipb-soft relative overflow-hidden rounded-[1.2rem] p-6 lg:p-8 border border-white/[0.06]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d4b87a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 02 ◆ Inovação</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Matriz de <span className="text-[#d4b87a] font-medium">Inovação</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d4b87a]/5 border border-[#d4b87a]/15 text-[8.5px] font-mono text-[#d4b87a]">
                  <Lightbulb className="h-3 w-3" />
                  <span>AMBIENTE P&D</span>
                </div>
              </div>

              {/* Tipo e Intensidade layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tipo de Inovação */}
                <div className="bg-black/15 p-5 rounded-xl border border-white/[0.04]">
                  <h4 className="text-[11px] lg:text-xs font-semibold text-white tracking-wider border-b border-white/[0.06] pb-3 mb-4 uppercase">
                    TIPO DE PRÁTICA DO IPB
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d4b87a] focus:ring-0 focus:ring-offset-0 accent-[#d4b87a]" />
                      <span>📦 Produto / Serviço</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d4b87a] focus:ring-0 focus:ring-offset-0 accent-[#d4b87a]" />
                      <span>⚙️ Processo</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer select-none">
                      <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d4b87a] focus:ring-0 focus:ring-offset-0 accent-[#d4b87a]" />
                      <span>🏛️ Organizacional</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d4b87a] focus:ring-0 focus:ring-offset-0 accent-[#d4b87a]" />
                      <span>♟️ Modelo de Negócio</span>
                    </label>
                  </div>
                </div>

                {/* Intensidade */}
                <div className="bg-black/15 p-5 rounded-xl border border-white/[0.04]">
                  <h4 className="text-[11px] lg:text-xs font-semibold text-white tracking-wider border-b border-white/[0.06] pb-3 mb-4 uppercase">
                    NÍVEL DE INTENSIDADE
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">
                      <span className="block text-[11px] font-bold text-[#5dcaa5]">Rotina</span>
                      <span className="block text-[10px] text-white/50 mt-0.5">Renovação incremental — baixo risco, baixo impacto.</span>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">
                      <span className="block text-[11px] font-bold text-[#fac775]">Radical</span>
                      <span className="block text-[10px] text-white/50 mt-0.5">Novas competências tecnológicas — alto investimento.</span>
                    </div>
                    <div className="p-3 bg-[#d4b87a]/5 border-l-2 border-[#d4b87a] rounded-r-lg">
                      <div className="flex justify-between items-center">
                        <span className="block text-[11px] font-bold text-[#d4b87a]">Disruptiva</span>
                        <span className="text-[7.5px] font-mono bg-[#d4b87a]/15 text-[#e0c887] px-1 rounded">ATUAL</span>
                      </div>
                      <span className="block text-[10px] text-white/70 mt-0.5">Mudança no modelo de negócio — escolhas estratégicas.</span>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">
                      <span className="block text-[11px] font-bold text-[#e24b4a]">Arquitetônica</span>
                      <span className="block text-[10px] text-white/50 mt-0.5">Maior impacto — afeta modelo E tecnologia simultaneamente.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hype Cycle Section */}
              <div className="mt-8">
                <h4 className="text-[11px] lg:text-xs font-semibold text-white tracking-wider border-b border-white/[0.06] pb-3 mb-5 uppercase">
                  HYPE CYCLE — ONDE ESTAMOS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-black/25 border border-white/[0.04] p-4 rounded-xl relative overflow-hidden">
                    <span className="absolute top-2 right-3 text-[14px] font-mono font-bold text-white/10">1</span>
                    <span className="block text-xs font-bold text-[#5dcaa5] mb-1">Gatilho Tecnológico</span>
                    <span className="block text-[10.5px] text-white/45 leading-relaxed">Tecnologia surge. Primeiras provas de conceito.</span>
                  </div>
                  <div className="bg-black/25 border border-white/[0.04] p-4 rounded-xl relative overflow-hidden">
                    <span className="absolute top-2 right-3 text-[14px] font-mono font-bold text-white/10">2</span>
                    <span className="block text-xs font-bold text-[#fac775] mb-1">Pico de Expectativas</span>
                    <span className="block text-[10.5px] text-white/45 leading-relaxed">Entusiasmo excessivo. Expectativas irrealistas.</span>
                  </div>
                  <div className="bg-[#d4b87a]/5 border border-[#d4b87a]/30 p-4 rounded-xl relative overflow-hidden">
                    <span className="absolute top-2 right-3 text-[11px] font-mono font-bold bg-[#d4b87a] text-black px-1.5 py-0.5 rounded">3 - NÓS</span>
                    <span className="block text-xs font-bold text-[#d4b87a] mb-1">Vale da Desilusão</span>
                    <span className="block text-[10.5px] text-white/80 leading-relaxed">Implementações falham. Interesse diminui. Onde os fortes constroem.</span>
                  </div>
                  <div className="bg-black/25 border border-white/[0.04] p-4 rounded-xl relative overflow-hidden">
                    <span className="absolute top-2 right-3 text-[14px] font-mono font-bold text-white/10">4</span>
                    <span className="block text-xs font-bold text-[#5dcaa5] mb-1">Encosta da Iluminação</span>
                    <span className="block text-[10.5px] text-white/45 leading-relaxed">Casos reais funcionam. Benefícios ficam claros.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'canvas' && (
          <motion.div
            key="canvas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 animate-fadeIn"
          >
            {/* Embedded styles for canvas layout */}
            <style>{`
              .canvas-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: auto auto auto;
                gap: 12px;
              }
              @media (max-width: 1024px) {
                .canvas-grid {
                  grid-template-columns: 1fr;
                  grid-template-rows: auto;
                }
              }
              .canvas-block {
                background: rgba(10, 10, 12, 0.45);
                border: 0.2px solid rgba(212, 184, 122, 0.12);
                border-radius: 10px;
                padding: 15px;
                transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                display: flex;
                flex-direction: column;
                gap: 8px;
                backdrop-filter: blur(12px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
              }
              .canvas-block:hover {
                border-color: rgba(212, 184, 122, 0.35);
                background: rgba(15, 15, 18, 0.6);
                transform: translateY(-2px);
              }
              .canvas-block h4 {
                font-family: var(--f-mono);
                font-size: 9px;
                color: #d4b87a;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin: 0;
                border-bottom: 0.2px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 6px;
                display: flex;
                align-items: center;
                gap: 6px;
              }
              .canvas-textarea {
                background: transparent;
                border: none;
                resize: none;
                font-size: 11px;
                color: #cbd5e1;
                width: 100%;
                min-height: 80px;
                outline: none;
                line-height: 1.5;
                font-family: var(--f-body);
              }
              .canvas-textarea:focus {
                color: #fff;
              }
            `}</style>

            <div className="ipb-soft relative overflow-hidden rounded-[1.2rem] p-6 lg:p-8 border border-white/[0.06]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d4b87a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 03 ◆ Canvas & Pitch</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Modelagem <span className="text-[#d4b87a] font-medium">Lean Canvas</span> & Pitch Simulator
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-lg">
                    Esboce a tese do negócio e simule um elevator pitch de alto impacto com IA.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#fac775]/5 border border-[#fac775]/15 text-[8.5px] font-mono text-[#fac775]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fac775] animate-pulse"></span>
                  <span>MODO SIMULAÇÃO ATIVO</span>
                </div>
              </div>

              <div className="bg-[#d4b87a]/[0.02] border-l-2 border-[#d4b87a] p-3 rounded-r-md text-[11px] text-white/80 leading-relaxed mb-6">
                💡 <b>Edição Dinâmica:</b> Clique diretamente em qualquer bloco do Lean Canvas para editar seu conteúdo em tempo real. As alterações alimentam as variáveis do simulador de pitch abaixo.
              </div>

              {/* LEAN CANVAS GRID */}
              <div className="canvas-grid">
                {/* Problema */}
                <div className="canvas-block lg:col-span-1 lg:row-span-2">
                  <h4>⚠️ Problema</h4>
                  <textarea
                    value={canvasData.problema}
                    onChange={(e) => handleCanvasChange('problema', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Quais as dores dos clientes?"
                  />
                </div>

                {/* Solução */}
                <div className="canvas-block lg:col-span-1 lg:row-span-1">
                  <h4>✔️ Solução</h4>
                  <textarea
                    value={canvasData.solucao}
                    onChange={(e) => handleCanvasChange('solucao', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Quais as soluções?"
                  />
                </div>

                {/* Métricas Chave */}
                <div className="canvas-block lg:col-span-1 lg:row-span-1">
                  <h4>📊 Métricas Chave</h4>
                  <textarea
                    value={canvasData.metricas}
                    onChange={(e) => handleCanvasChange('metricas', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Quais KPIs monitorar?"
                  />
                </div>

                {/* Proposta de Valor */}
                <div className="canvas-block lg:col-span-1 lg:row-span-2">
                  <h4>💎 Proposta de Valor</h4>
                  <textarea
                    value={canvasData.proposta}
                    onChange={(e) => handleCanvasChange('proposta', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Qual a sua promessa de valor?"
                  />
                </div>

                {/* Vantagem Injusta */}
                <div className="canvas-block lg:col-span-1 lg:row-span-1">
                  <h4>🛡️ Vantagem Injusta</h4>
                  <textarea
                    value={canvasData.vantagem}
                    onChange={(e) => handleCanvasChange('vantagem', e.target.value)}
                    className="canvas-textarea"
                    placeholder="O que te faz único?"
                  />
                </div>

                {/* Canais */}
                <div className="canvas-block lg:col-span-1 lg:row-span-1">
                  <h4>📣 Canais</h4>
                  <textarea
                    value={canvasData.canais}
                    onChange={(e) => handleCanvasChange('canais', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Como chegar ao cliente?"
                  />
                </div>

                {/* Segmento de Clientes */}
                <div className="canvas-block lg:col-span-1 lg:row-span-2">
                  <h4>👥 Clientes</h4>
                  <textarea
                    value={canvasData.clientes}
                    onChange={(e) => handleCanvasChange('clientes', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Quem é o comprador ideal?"
                  />
                </div>

                {/* Custos */}
                <div className="canvas-block lg:col-span-2 lg:row-span-1">
                  <h4>💸 Estrutura de Custos</h4>
                  <textarea
                    value={canvasData.custos}
                    onChange={(e) => handleCanvasChange('custos', e.target.value)}
                    className="canvas-textarea !min-height-[60px]"
                    placeholder="Quais os principais custos?"
                  />
                </div>

                {/* Receitas */}
                <div className="canvas-block lg:col-span-3 lg:row-span-1">
                  <h4>💰 Fluxo de Receitas</h4>
                  <textarea
                    value={canvasData.receitas}
                    onChange={(e) => handleCanvasChange('receitas', e.target.value)}
                    className="canvas-textarea !min-height-[60px]"
                    placeholder="Como a empresa ganha dinheiro?"
                  />
                </div>
              </div>

              {/* ELEVATOR PITCH SIMULATOR SECTION */}
              <div className="mt-8 border-t border-white/[0.06] pt-8 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-[#d4b87a] tracking-wider uppercase mb-1">SIMULADOR DE ELEVATOR PITCH</h3>
                  <p className="text-[10px] text-white/40">Calibre as variáveis do Pitch para gerar sua tese resumida de vendas</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* LHS Form Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">Nome do Produto/Startup</label>
                      <input
                        type="text"
                        value={pitchName}
                        onChange={(e) => setPitchName(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d4b87a]/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">Público Alvo (Segmento)</label>
                      <input
                        type="text"
                        value={pitchTarget}
                        onChange={(e) => setPitchTarget(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d4b87a]/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">A Dor Principal do Cliente</label>
                      <input
                        type="text"
                        value={pitchPain}
                        onChange={(e) => setPitchPain(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d4b87a]/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">Categoria de Mercado</label>
                      <input
                        type="text"
                        value={pitchMarket}
                        onChange={(e) => setPitchMarket(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d4b87a]/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">O Seu Grande Diferencial</label>
                      <input
                        type="text"
                        value={pitchDifference}
                        onChange={(e) => setPitchDifference(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d4b87a]/50 transition"
                      />
                    </div>
                    <button
                      onClick={handleSimulatePitch}
                      className="w-full py-2.5 rounded-md bg-[#d4b87a] hover:bg-[#c5a55a] text-black font-semibold text-xs tracking-wide transition flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>⚡ Simular Pitch de Elevador</span>
                    </button>
                  </div>

                  {/* RHS Result Display */}
                  <div className="relative border border-[#d4b87a]/20 bg-gradient-to-br from-[#1c150c]/60 to-[#0c0b0e]/85 rounded-xl p-6 flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(212,184,122,0.06),transparent_70%)]" />
                    
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-center text-[8.5px] font-mono text-[#d4b87a] tracking-wider">
                        <span>PITCH DE PONTO DE VISTA</span>
                        {pitchResult ? (
                          <span className="text-[#5dcaa5]">✓ PRONTO PARA EXECUTAR</span>
                        ) : (
                          <span className="text-white/30">AGUARDANDO SIMULAÇÃO</span>
                        )}
                      </div>
                      
                      <p className="text-white/80 text-[12.5px] leading-relaxed italic min-h-[120px] flex items-center">
                        {optimizing ? (
                          <span className="animate-pulse text-[#d4b87a]">Advisor analisando e aprimorando...</span>
                        ) : pitchResult ? (
                          `"${pitchResult}"`
                        ) : (
                          'Clique no botão "Simular Pitch de Elevador" ao lado para carregar e estruturar seu elevator pitch executivo com base nas variáveis do Lean Canvas...'
                        )}
                      </p>
                    </div>

                    <div className="flex gap-3 relative z-10 mt-6">
                      <button
                        onClick={handleCopyPitch}
                        disabled={!pitchResult}
                        className="flex-1 py-2 rounded border border-white/10 hover:border-white/20 bg-white/[0.02] text-xs font-medium transition flex items-center justify-center gap-1 text-white/80 disabled:opacity-40 disabled:pointer-events-none"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-[#5dcaa5]" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copied ? 'Copiado!' : '📋 Copiar Pitch'}</span>
                      </button>
                      <button
                        onClick={handleOptimizePitch}
                        disabled={!pitchResult || optimizing}
                        className="flex-1 py-2 rounded bg-[#d4b87a] text-black font-semibold text-xs transition flex items-center justify-center gap-1 disabled:opacity-40 disabled:pointer-events-none"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>🧠 Otimizar com AI Advisor</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
