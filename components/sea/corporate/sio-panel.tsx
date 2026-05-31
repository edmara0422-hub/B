'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Landmark, AlertCircle, Sparkles, Settings, ArrowRight, Play, CheckCircle2 } from 'lucide-react'

type SioSubTab = 'finance' | 'pricing' | 'ia' | 'processos'

export function SioPanel({ initialTab }: { initialTab?: SioSubTab }) {
  const [subTab, setSubTab] = useState<SioSubTab>(initialTab || 'finance')

  useEffect(() => {
    if (initialTab) {
      setSubTab(initialTab)
    }
  }, [initialTab])

  // State for Cockpit Financeiro
  const [receita, setReceita] = useState<number>(50000)
  const [despesa, setDespesa] = useState<number>(35000)
  const [caixa, setCaixa] = useState<number>(150000)
  const [mkt, setMkt] = useState<number>(5000)
  const [novosClientes, setNovosClientes] = useState<number>(10)

  // Calcs for Cockpit Financeiro
  const burnRate = despesa > receita ? despesa - receita : 0
  const runway = burnRate > 0 ? (caixa / burnRate).toFixed(1) : '∞'
  const cac = novosClientes > 0 ? (mkt / novosClientes).toFixed(0) : '0'
  const ticket = novosClientes > 0 ? (receita / novosClientes).toFixed(0) : '0'

  // State for IA Advisor
  const [advisorApplied, setAdvisorApplied] = useState(false)
  const [advisorFeedback, setAdvisorFeedback] = useState('')

  // State for Processos Checklists & Maturidade Gauge (Dynamic!)
  const [procChecks, setProcChecks] = useState({
    p1: { label: 'Identificação dos Gargalos Operacionais', weight: 15, checked: true },
    p2: { label: 'Desenho do Fluxo de Valor (VSA)', weight: 15, checked: true },
    p3: { label: 'Definição de Donos de Processo (SOP Owners)', weight: 10, checked: false },
    p4: { label: 'Integração de APIs & Webhooks', weight: 20, checked: false },
    p5: { label: 'Regras de Triagem e Alertas por IA', weight: 15, checked: false },
    p6: { label: 'SOPs (Manuais de Operação) Centralizados', weight: 15, checked: false },
    p7: { label: 'Auditorias de Processo Periódicas', weight: 10, checked: false },
  })

  // Calculate dynamic maturity based on checked weights
  const totalMaturity = Object.values(procChecks).reduce((acc, curr) => {
    return acc + (curr.checked ? curr.weight : 0)
  }, 0)

  const getMaturityLevel = (score: number) => {
    if (score >= 80) return { text: 'Excelente', color: '#5dcaa5' }
    if (score >= 50) return { text: 'Integrado', color: '#fac775' }
    return { text: 'Mapeado', color: '#d2af5a' }
  }
  const matLevel = getMaturityLevel(totalMaturity)

  const toggleProcCheck = (key: keyof typeof procChecks) => {
    setProcChecks(prev => ({
      ...prev,
      [key]: { ...prev[key], checked: !prev[key].checked }
    }))
  }

  const handleApplyAdvisor = () => {
    setAdvisorApplied(true)
    setAdvisorFeedback('Regra R1 (Trial 14d) foi provisionada com sucesso em produção para 100% dos leads! Monitorando conversão...')
  }

  return (
    <div className="w-full space-y-4">
      {/* Embedded custom styling for pyramid, cortex, checklist, gauge */}
      <style>{`
        /* LENCIONI PYRAMID FOR SMART PRICING */
        .pyramid {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .pyr-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 0.2px solid rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 8px 12px;
          position: relative;
          overflow: hidden;
        }
        .pyr-row::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #d2af5a;
          opacity: 0.3;
        }
        .pyr-row[data-active="true"]::before {
          background: #5dcaa5;
          opacity: 0.9;
        }
        .pyr-lvl {
          font-family: var(--f-mono);
          font-size: 10px;
          font-weight: 700;
          color: #d2af5a;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          background: rgba(201, 148, 58, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pyr-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pyr-name {
          font-size: 11.5px;
          font-weight: 550;
          color: #fff;
        }
        .pyr-bar {
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }
        .pyr-bar i {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: linear-gradient(90deg, #b8975a, #d2af5a);
          border-radius: 2px;
        }
        .pyr-val {
          font-family: var(--f-mono);
          font-size: 9px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* CORTEX FOR IA ADVISOR */
        .cortex {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .cortex {
            flex-direction: column;
            align-items: center;
          }
        }
        .cortex-orb {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 140px;
        }
        .cortex-orb .orb {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 148, 58, 0.25) 0%, transparent 70%);
          border: 0.2px solid rgba(201, 148, 58, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 20px rgba(201, 148, 58, 0.15);
        }
        .cortex-orb .orb .core {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b8975a, #d2af5a);
          box-shadow: 0 0 15px #d2af5a;
          animation: pulse 2s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; filter: blur(0.5px); }
          50% { transform: scale(1.15); opacity: 1; filter: blur(1.5px); }
        }
        .cortex-msg {
          flex: 1;
          background: rgba(255, 255, 255, 0.01);
          border: 0.2px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cortex-msg .ttl {
          display: flex;
          justify-content: space-between;
          font-family: var(--f-mono);
          font-size: 8px;
          color: #8a9098;
          border-bottom: 0.2px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 8px;
        }
        .cortex-msg .body {
          font-size: 12px;
          line-height: 1.6;
          color: #cbd5e1;
          text-align: justify;
        }
        .cortex-msg .actions {
          display: flex;
          gap: 10px;
        }
      `}</style>
      <style>{`
        .dash-card-systems {
          background: rgba(5, 5, 5, 0.45) !important;
          backdrop-filter: blur(28px) saturate(130%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
          border: none !important;
          border-radius: 14px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(0, 0, 0, 0.85),
            0 12px 40px rgba(0, 0, 0, 0.55) !important;
          transition: all .3s cubic-bezier(.22,.61,.36,1);
        }
        .dash-card-systems::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(90deg, #cbd5e1 0%, #d2af5a 100%) !important;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .system-tab-btn {
          font-family: inherit; font-size: 11px; letter-spacing: .03em;
          color: #8a9098; background: transparent; border: none;
          padding: 6px 16px; border-radius: 6px; cursor: pointer;
          transition: all .2s ease-in-out;
        }
        .system-tab-btn.active {
          background: rgba(201, 148, 58, 0.1) !important;
          border: 0.2px solid rgba(201, 148, 58, 0.3) !important;
          color: #e0c887 !important;
        }
      `}</style>
      {/* Sub tabs Row */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-2.5">
        {(['finance', 'pricing', 'ia', 'processos'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`system-tab-btn ${subTab === tab ? 'active' : ''}`}
          >
            {tab === 'finance' && 'Cockpit Financeiro'}
            {tab === 'pricing' && 'Smart Pricing'}
            {tab === 'ia' && 'IA Advisor'}
            {tab === 'processos' && 'Processos'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'finance' && (
          <motion.div
            key="finance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 animate-fadeIn"
          >
            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 01 ◆ Finanças</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Cockpit <span className="text-[#d2af5a] font-medium">Financeiro</span>
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-lg">
                    Calibragem de contexto · Diagnóstico de Caixa, Runway e CAC.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d2af5a]/5 border border-[#d2af5a]/15 text-[8.5px] font-mono text-[#d2af5a]">
                  <Landmark className="h-3 w-3" />
                  <span>CÁLCULO ATIVO</span>
                </div>
              </div>

              {/* Por que serve o cockpit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#d2af5a]/[0.02] border border-[#d2af5a]/10 rounded-xl p-5 mb-6">
                <div>
                  <span className="block text-[11px] font-bold text-[#d2af5a] mb-1">Parar de Chutar</span>
                  <p className="text-[10px] text-white/60 leading-relaxed">Diz se o seu preço (ticket) realmente paga o seu custo real (burn).</p>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-[#d2af5a] mb-1">Alerta de Colisão</span>
                  <p className="text-[10px] text-white/60 leading-relaxed">O Runway mostra quantos meses de fôlego você tem hoje.</p>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-[#d2af5a] mb-1">Filtro de Ruído</span>
                  <p className="text-[10px] text-white/60 leading-relaxed">Foco no gargalo real, não no que aparece mais.</p>
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-[#d2af5a] mb-1">Prova de Valor</span>
                  <p className="text-[10px] text-white/60 leading-relaxed">O que você mostra para provar viabilidade em números.</p>
                </div>
              </div>

              {/* Form Calibragem */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-[11.5px] font-mono text-white/80 flex items-center gap-1.5">
                    <Settings className="h-3.5 w-3.5 text-[#d2af5a]" />
                    <span>⚙ Calibragem de Contexto</span>
                  </span>
                  <button
                    onClick={() => {
                      setReceita(0)
                      setDespesa(0)
                      setCaixa(0)
                      setMkt(0)
                      setNovosClientes(0)
                    }}
                    className="text-[10px] text-[#e24b4a] hover:underline"
                  >
                    ✕ Limpar tudo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inputs LHS */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-white/80">Receita Mensal (R$)</label>
                      <input
                        type="number"
                        value={receita || ''}
                        onChange={(e) => setReceita(parseFloat(e.target.value) || 0)}
                        placeholder="Ex: 50000"
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                      />
                      <span className="block text-[9.5px] text-white/40">Tudo que entrou de vendas (sem empréstimos/aportes).</span>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-white/80">Despesas Operacionais (R$)</label>
                      <input
                        type="number"
                        value={despesa || ''}
                        onChange={(e) => setDespesa(parseFloat(e.target.value) || 0)}
                        placeholder="Ex: 35000"
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                      />
                      <span className="block text-[9.5px] text-white/40">Folha, aluguel, fornecedores, ferramentas, impostos.</span>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-white/80">Caixa Disponível (R$)</label>
                      <input
                        type="number"
                        value={caixa || ''}
                        onChange={(e) => setCaixa(parseFloat(e.target.value) || 0)}
                        placeholder="Ex: 150000"
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                      />
                      <span className="block text-[9.5px] text-white/40">Saldo atual nas contas bancárias.</span>
                    </div>
                  </div>

                  {/* Inputs RHS & Telemetria */}
                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-white/80">Verba Mkt / Aquisição (R$)</label>
                        <input
                          type="number"
                          value={mkt || ''}
                          onChange={(e) => setMkt(parseFloat(e.target.value) || 0)}
                          placeholder="Ex: 5000"
                          className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                        />
                        <span className="block text-[9.5px] text-white/40">Anúncios, tráfego pago, comissões.</span>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-white/80">Novos Clientes (Mês)</label>
                        <input
                          type="number"
                          value={novosClientes || ''}
                          onChange={(e) => setNovosClientes(parseInt(e.target.value) || 0)}
                          placeholder="Ex: 10"
                          className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                        />
                        <span className="block text-[9.5px] text-white/40">Total de vendas concluídas no período.</span>
                      </div>
                    </div>

                    {/* Resultados Box */}
                    <div className="bg-black/30 border border-white/[0.05] p-5 rounded-xl space-y-2 mt-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">Burn Rate Mês</span>
                        <b className="text-[#e24b4a] font-mono">R$ {burnRate.toLocaleString('pt-BR')}</b>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">Runway (Fôlego)</span>
                        <b className="text-[#fac775] font-mono">{runway === '∞' ? '∞' : `${runway} meses`}</b>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">CAC Médio</span>
                        <b className="text-[#d2af5a] font-mono">R$ {parseFloat(cac).toLocaleString('pt-BR')}</b>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">Ticket Médio</span>
                        <b className="text-[#5dcaa5] font-mono">R$ {parseFloat(ticket).toLocaleString('pt-BR')}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'pricing' && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 animate-fadeIn"
          >
            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 02 ◆ Smart Pricing</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Regras <span className="text-[#d2af5a] font-medium">Ativas</span>
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Pyramid Layout */}
                <div className="pyramid">
                  <div className="pyr-row" data-active="true">
                    <div className="pyr-lvl">R1</div>
                    <div className="pyr-body">
                      <div className="pyr-name">Trial 14d · Educação</div>
                      <div className="pyr-bar"><i style={{ width: '88%' }}></i></div>
                    </div>
                    <div className="pyr-val text-[#5dcaa5] bg-[#5dcaa5]/10 border border-[#5dcaa5]/20">ON</div>
                  </div>
                  <div className="pyr-row" data-active="true">
                    <div className="pyr-lvl">R2</div>
                    <div className="pyr-body">
                      <div className="pyr-name">Desconto Volume 5+ seats</div>
                      <div className="pyr-bar"><i style={{ width: '72%' }}></i></div>
                    </div>
                    <div className="pyr-val text-[#5dcaa5] bg-[#5dcaa5]/10 border border-[#5dcaa5]/20">ON</div>
                  </div>
                  <div className="pyr-row" data-active="true">
                    <div className="pyr-lvl">R3</div>
                    <div className="pyr-body">
                      <div className="pyr-name">Annual −15%</div>
                      <div className="pyr-bar"><i style={{ width: '55%' }}></i></div>
                    </div>
                    <div className="pyr-val text-[#5dcaa5] bg-[#5dcaa5]/10 border border-[#5dcaa5]/20">ON</div>
                  </div>
                  <div className="pyr-row" data-active="false">
                    <div className="pyr-lvl">R4</div>
                    <div className="pyr-body">
                      <div className="pyr-name">Bundle Premium</div>
                      <div className="pyr-bar"><i style={{ width: '0%' }}></i></div>
                    </div>
                    <div className="pyr-val text-white/30 bg-white/[0.04]">OFF</div>
                  </div>
                </div>

                {/* Notes box */}
                <div className="p-5 bg-white/[0.01] border border-white/[0.05] rounded-xl space-y-4">
                  <div className="text-xs font-mono font-bold text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.06] pb-2">
                    Otimização Recomendada
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2 items-start text-xs">
                      <span className="text-[#d2af5a] font-bold font-mono">α</span>
                      <p className="text-white/80">
                        R1 (Trial 14d) com <b>88% de retenção</b>. Migrar trial padrão de 7d→14d para todos segmentos.
                      </p>
                    </div>
                    <div className="flex gap-2 items-start text-xs">
                      <span className="text-[#d2af5a] font-bold font-mono">β</span>
                      <p className="text-white/80">
                        Impacto previsto: <b>+0.8pp em conversão</b>, ROI em ~5 semanas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'ia' && (
          <motion.div
            key="ia"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 animate-fadeIn"
          >
            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 03 ◆ IPBA AI</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Insight <span className="text-[#d2af5a] font-medium">Operacional</span>
                  </h3>
                </div>
              </div>

              <div className="cortex">
                <div className="cortex-orb">
                  <div className="orb">
                    <div className="core"></div>
                  </div>
                  <div className="text-[11px] font-bold text-white tracking-wide mt-2">IPBA AI</div>
                  <div className="text-[8.5px] text-white/50">Status · <b className="text-[#5dcaa5]">ATIVO</b></div>
                </div>

                <div className="cortex-msg">
                  <div className="ttl">
                    <span className="text-[#d2af5a] font-mono">INSIGHT · #4473</span>
                    <span>14:31:55 · OPERACIONAL</span>
                  </div>
                  <p className="body">
                    Cruzando Cockpit + Pricing + Alarmes: <b>4 clientes em risk-score alto</b> compartilham mesmo padrão — entraram via <b>Trial 7d</b>. A regra <b>R1 (Trial 14d · Edu)</b> está com 88% de retenção. Recomendo migrar trial padrão de 7d→14d para todos os segmentos. <b>Impacto previsto:</b> +0.8pp em conversão, ROI em ~5 semanas.
                  </p>
                  
                  {advisorApplied && (
                    <div className="p-3 bg-[#5dcaa5]/5 border border-[#5dcaa5]/30 text-[#5dcaa5] rounded-md text-[11px] flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{advisorFeedback}</span>
                    </div>
                  )}

                  <div className="actions mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={handleApplyAdvisor}
                      disabled={advisorApplied}
                      className="px-3.5 py-1.5 rounded bg-[#d2af5a] hover:bg-[#c5a55a] text-black font-semibold text-xs tracking-wider transition disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Aplicar Regra
                    </button>
                    <button className="px-3.5 py-1.5 rounded border border-white/10 hover:border-white/20 bg-white/[0.02] text-xs font-semibold tracking-wider text-white/80 transition">
                      Simular Impacto
                    </button>
                    <button className="px-3.5 py-1.5 rounded border border-white/10 hover:border-white/20 bg-white/[0.02] text-xs font-semibold tracking-wider text-white/80 transition">
                      Agendar Revisão
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'processos' && (
          <motion.div
            key="processos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 animate-fadeIn"
          >
            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 04 ◆ Processos</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Mapeamento & <span className="text-[#d2af5a] font-medium">Automação de Processos</span>
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-lg">
                    Mapeie fluxos operacionais, ative conexões e audite a governança operacional.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
                {/* Column 1: Checklists */}
                <div className="space-y-4">
                  {/* Section 1 */}
                  <div className="bg-black/15 p-5 rounded-xl border border-white/[0.04] space-y-4">
                    <h4 className="text-[10.5px] font-mono font-bold text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.06] pb-2">
                      1. Fase de Mapeamento
                    </h4>
                    <div className="space-y-3">
                      {(['p1', 'p2', 'p3'] as const).map(key => (
                        <label key={key} className="flex items-start gap-3 text-xs text-white/80 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={procChecks[key].checked}
                            onChange={() => toggleProcCheck(key)}
                            className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d2af5a] focus:ring-0 focus:ring-offset-0 accent-[#d2af5a] mt-0.5"
                          />
                          <div>
                            <b className="block text-white/95">{procChecks[key].label}</b>
                            <span className="block text-[10px] text-white/50 mt-0.5">
                              {key === 'p1' && 'Levantamento de horas desperdiçadas em processos manuais repetitivos.'}
                              {key === 'p2' && 'Mapeamento visual do estado atual e do estado futuro desejado.'}
                              {key === 'p3' && 'Designação formal de responsabilidade por cada fluxo desenhado.'}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="bg-black/15 p-5 rounded-xl border border-white/[0.04] space-y-4">
                    <h4 className="text-[10.5px] font-mono font-bold text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.06] pb-2">
                      2. Fase de Automação
                    </h4>
                    <div className="space-y-3">
                      {(['p4', 'p5'] as const).map(key => (
                        <label key={key} className="flex items-start gap-3 text-xs text-white/80 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={procChecks[key].checked}
                            onChange={() => toggleProcCheck(key)}
                            className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d2af5a] focus:ring-0 focus:ring-offset-0 accent-[#d2af5a] mt-0.5"
                          />
                          <div>
                            <b className="block text-white/95">{procChecks[key].label}</b>
                            <span className="block text-[10px] text-white/50 mt-0.5">
                              {key === 'p4' && 'Conexão automática entre CRMs, ERPs e ferramentas operacionais.'}
                              {key === 'p5' && 'Notificação inteligente ao time quando KPIs saírem da zona de tolerância.'}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="bg-black/15 p-5 rounded-xl border border-white/[0.04] space-y-4">
                    <h4 className="text-[10.5px] font-mono font-bold text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.06] pb-2">
                      3. Governança Operacional
                    </h4>
                    <div className="space-y-3">
                      {(['p6', 'p7'] as const).map(key => (
                        <label key={key} className="flex items-start gap-3 text-xs text-white/80 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={procChecks[key].checked}
                            onChange={() => toggleProcCheck(key)}
                            className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d2af5a] focus:ring-0 focus:ring-offset-0 accent-[#d2af5a] mt-0.5"
                          />
                          <div>
                            <b className="block text-white/95">{procChecks[key].label}</b>
                            <span className="block text-[10px] text-white/50 mt-0.5">
                              {key === 'p6' && 'Documentação acessível contendo o passo a passo operacional de tudo.'}
                              {key === 'p7' && 'Revisão mensal com donos para identificar desvios de processo.'}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Gauge and active flows */}
                <div className="space-y-6">
                  {/* Gauge Card */}
                  <div className="bg-[#d2af5a]/[0.02] border border-[#d2af5a]/15 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(201, 148, 58,0.05),transparent_60%)]">
                    <div className="text-[9px] font-mono tracking-wider text-white/50 uppercase mb-4">
                      Maturidade Operacional
                    </div>

                    {/* Circular gauge */}
                    <div className="relative w-[140px] height-[140px] flex items-center justify-center mb-4">
                      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
                        <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                        <circle
                          cx="70"
                          cy="70"
                          r="58"
                          fill="none"
                          stroke="url(#sioGoldGrad)"
                          strokeWidth="8"
                          strokeDasharray="364.4"
                          strokeDashoffset={364.4 - (364.4 * totalMaturity) / 100}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />
                        <defs>
                          <linearGradient id="sioGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f5d08b" />
                            <stop offset="100%" stopColor="#d2af5a" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Inner Text */}
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-bold font-mono text-white">{totalMaturity}%</span>
                        <span className="text-[8.5px] uppercase tracking-wider font-bold mt-0.5" style={{ color: matLevel.color }}>
                          {matLevel.text}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11.5px] text-white/60 leading-relaxed max-w-[200px]">
                      Seus processos principais já estão catalogados e visuais, mas falta integrar APIs e formalizar auditorias de consistência.
                    </p>
                  </div>

                  {/* Fluxos Criticos Pipeline */}
                  <div className="bg-black/15 border border-white/[0.04] p-5 rounded-xl space-y-4">
                    <h4 className="text-[10.5px] font-mono font-bold text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.06] pb-2">
                      Fluxos Críticos & Status
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-black/40 border-l-2 border-[#5dcaa5] rounded-r-md">
                        <div>
                          <b className="block text-xs text-white">Integração CRM → ERP</b>
                          <span className="block text-[9.5px] text-white/40 mt-0.5">Faturamento e impostos automáticos</span>
                        </div>
                        <span className="text-[8.5px] font-mono font-bold bg-[#5dcaa5]/10 text-[#5dcaa5] px-2 py-0.5 rounded">100% OK</span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-black/40 border-l-2 border-[#fac775] rounded-r-md">
                        <div>
                          <b className="block text-xs text-white">Onboarding de Cliente (CS)</b>
                          <span className="block text-[9.5px] text-white/40 mt-0.5">Liberação de acessos e email de boas-vindas</span>
                        </div>
                        <span className="text-[8.5px] font-mono font-bold bg-[#fac775]/10 text-[#fac775] px-2 py-0.5 rounded">70% TEST</span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-black/40 border-l-2 border-[#e24b4a] rounded-r-md">
                        <div>
                          <b className="block text-xs text-white">Auditoria Anual (D&O)</b>
                          <span className="block text-[9.5px] text-white/40 mt-0.5">Fechamento de conformidade legal IPB</span>
                        </div>
                        <span className="text-[8.5px] font-mono font-bold bg-[#e24b4a]/10 text-[#e24b4a] px-2 py-0.5 rounded">BLOQ</span>
                      </div>
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
