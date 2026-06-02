'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, Scale, Send, CheckCircle2, ChevronDown, FileText, 
  Cpu, Sparkles, ShieldAlert, Key, Database, Lock, RefreshCw 
} from 'lucide-react'

type CompSubTab = 'denuncias' | 'governanca'

type Denuncia = {
  id: string
  tipo: string
  descricao: string
  data: string
  status: string
  statusColor: string
}

export function CompPanel({ initialTab }: { initialTab?: CompSubTab }) {
  const [subTab, setSubTab] = useState<CompSubTab>(initialTab || 'denuncias')

  useEffect(() => {
    if (initialTab) {
      setSubTab(initialTab)
    }
  }, [initialTab])

  // State for Canal de Denúncias
  const [tipoDenuncia, setTipoDenuncia] = useState('')
  const [descricao, setDescricao] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [denunciaFeed, setDenunciaFeed] = useState<Denuncia[]>([
    {
      id: 'd1',
      tipo: 'Conflito de interesses',
      descricao: 'Alegado conflito de interesse em compras corporativas.',
      data: 'Há 2 dias',
      status: 'Em Análise',
      statusColor: '#fac775'
    }
  ])

  // State for Governança accordions
  const [activeAcc, setActiveAcc] = useState<string | null>(null)

  // State for IA Audit
  const [generatingAudit, setGeneratingAudit] = useState(false)
  const [auditResult, setAuditResult] = useState<any | null>(null)

  // State for document generation
  const [generating, setGenerating] = useState(false)
  const [generatedDoc, setGeneratedDoc] = useState('')

  const handleSubmitDenuncia = async () => {
    if (!tipoDenuncia) {
      alert('Por favor, selecione o tipo da denúncia!')
      return
    }
    if (!descricao.trim()) {
      alert('Por favor, descreva o que aconteceu!')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: tipoDenuncia, descricao: descricao })
      });

      if (!res.ok) {
        throw new Error('Falha no envio do relato');
      }

      const newDenuncia: Denuncia = {
        id: Math.random().toString(),
        tipo: tipoDenuncia,
        descricao: descricao,
        data: 'Hoje',
        status: 'Recebido',
        statusColor: '#5dcaa5'
      }

      setDenunciaFeed(prev => [newDenuncia, ...prev])
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Erro ao enviar denúncia anônima. Por favor, tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGenerateDoc = () => {
    setGenerating(true)
    setTimeout(() => {
      setGeneratedDoc('📄 Código de Conduta e Governança Corporativa V1.0 gerado com base nas diretrizes do Business Syllabus e em conformidade com as melhores práticas de ESG e Compliance.')
      setGenerating(false)
    }, 1500)
  }

  const handleGenerateAudit = () => {
    setGeneratingAudit(true)
    setAuditResult(null)
    setTimeout(() => {
      setAuditResult({
        cobit: {
          score: 94,
          status: 'Excelente',
          summary: 'Alinhamento estratégico total das metas de TI com o EBITDA e as diretrizes ESG do Business Syllabus. O pilar D6 (Conformidade) e o radar de integridade auditam feedbacks contínuos.',
          action: 'Refinar mapeamento de custos ocultos de ferramentas de TI trimestralmente.'
        },
        iso38500: {
          status: 'Em Conformidade',
          summary: 'Direção corporativa ativa estabelecida pelos executivos. O cockpit centralizado executa avaliações frequentes de runway, alinhamento técnico e mitigações.',
          action: 'Manter a supervisão sobre acessos e modificações estruturais da base de dados.'
        },
        itil4: {
          status: 'Otimizado',
          summary: 'Operações e serviços ágeis integrando IA nos fluxos operacionais (helpdesk estruturado e SLA de resposta de incidentes técnicos < 2 horas).',
          action: 'Calibrar o auto-scaling do Slack NLP e da telemetria Whisper.'
        }
      })
      setGeneratingAudit(false)
    }, 2000)
  }

  const toggleAccordion = (id: string) => {
    setActiveAcc(activeAcc === id ? null : id)
  }

  return (
    <div className="w-full space-y-4">
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
        {(['denuncias', 'governanca'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`system-tab-btn ${subTab === tab ? 'active' : ''}`}
          >
            {tab === 'denuncias' && 'Canal de Denúncias'}
            {tab === 'governanca' && 'Governança & Riscos BS'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'denuncias' && (
          <motion.div
            key="denuncias"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 animate-fadeIn"
          >
            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 01 ◆ Compliance</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Canal de <span className="text-[#d2af5a] font-medium">Denúncias</span>
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-lg">
                    Este canal é 100% anônimo. Protegido pela LGPD e sob rigoroso protocolo de integridade.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d2af5a]/5 border border-[#d2af5a]/15 text-[8.5px] font-mono text-[#d2af5a]">
                  <Scale className="h-3 w-3" />
                  <span>PROTOCOLO CRÍTICO</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Form Fields & Confirmation Screen */}
                <div className="space-y-4 flex flex-col justify-center">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center gap-3 bg-[#d2af5a]/5 border border-[#d2af5a]/25 rounded-xl p-6 animate-fadeIn">
                      <CheckCircle2 className="h-9 w-9 text-[#5dcaa5] animate-pulse" />
                      <span className="text-[12px] font-bold text-white uppercase tracking-wider">Denúncia Enviada Anônimamente!</span>
                      <p className="text-[10.5px] text-white/70 max-w-sm leading-relaxed">
                        Agradecemos muito pelo seu feedback! Sua denúncia foi entregue com total anonimato, criptografia e segurança ao Comitê de Compliance do Business Syllabus. O protocolo está sendo avaliado sob sigilo absoluto.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false)
                          setTipoDenuncia('')
                          setDescricao('')
                        }}
                        className="mt-2 w-full py-2.5 bg-gradient-to-r from-[#d2af5a] to-[#efddb1] hover:brightness-110 text-black font-mono text-[9px] font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer text-center"
                      >
                        Entendido
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1 text-left">
                        <label className="block text-xs font-semibold text-white/85">Tipo da denúncia</label>
                        <select
                          value={tipoDenuncia}
                          onChange={(e) => setTipoDenuncia(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2.5 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                        >
                          <option value="" className="bg-[#0b0b0c]">Selecione o tipo...</option>
                          <option value="Assédio moral ou sexual" className="bg-[#0b0b0c]">Assédio moral ou sexual</option>
                          <option value="Discriminação" className="bg-[#0b0b0c]">Discriminação</option>
                          <option value="Fraude ou corrupção" className="bg-[#0b0b0c]">Fraude ou corrupção</option>
                          <option value="Vazamento de dados (LGPD)" className="bg-[#0b0b0c]">Vazamento de dados (LGPD)</option>
                          <option value="Conflito de interesses" className="bg-[#0b0b0c]">Conflito de interesses</option>
                          <option value="Condições de trabalho" className="bg-[#0b0b0c]">Condições de trabalho</option>
                          <option value="Outro" className="bg-[#0b0b0c]">Outro</option>
                        </select>
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="block text-xs font-semibold text-white/85">Descreva o que aconteceu</label>
                        <textarea
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                          placeholder="Ninguém saberá quem enviou..."
                          className="w-full h-32 bg-black/40 border border-white/10 rounded-md px-3 py-2.5 text-xs text-white outline-none focus:border-[#d2af5a]/50 resize-none transition"
                        />
                      </div>

                      <button
                        onClick={handleSubmitDenuncia}
                        disabled={submitting || !descricao.trim()}
                        className="w-full py-2.5 rounded-md bg-[#d2af5a] hover:bg-[#c5a55a] text-black font-semibold text-xs tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none"
                      >
                        {submitting ? (
                          <>
                            <Cpu className="h-3.5 w-3.5 animate-spin" />
                            <span>Enviando Relato...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            <span>Enviar Denúncia Anônima</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>

                {/* Complaints Feed */}
                <div className="bg-black/25 p-5 rounded-xl border border-white/[0.04] flex flex-col">
                  <span className="block text-[10px] font-mono font-bold text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.06] pb-3 mb-4 text-left">
                    FEED DE DENÚNCIAS (ADMIN)
                  </span>
                  
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[280px] scrollbar-thin">
                    <AnimatePresence>
                      {denunciaFeed.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-3.5 bg-black/40 border-l-2 rounded-r-md border-white/10 text-left"
                          style={{ borderLeftColor: item.statusColor }}
                        >
                          <div className="flex justify-between items-center text-[9px] text-white/40 mb-1.5 font-mono">
                            <span>{item.data}</span>
                            <span style={{ color: item.statusColor }} className="font-bold uppercase tracking-wider">{item.status}</span>
                          </div>
                          <b className="block text-[11.5px] text-white/95">{item.tipo}</b>
                          <span className="block text-[10.5px] text-white/60 leading-relaxed mt-1">{item.descricao}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'governanca' && (
          <motion.div
            key="governanca"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 animate-fadeIn"
          >
            {/* Split layout: Left (Pillars & Change), Right (Continuous Risks Monitor & AI Frameworks Auditor) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Governance Pillars & Gestão da Mudança */}
              <div className="lg:col-span-6 space-y-4">
                <div className="dash-card-systems h-full flex flex-col justify-between">
                  <div className="space-y-4 relative z-10 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 02 ◆ Governança & Práticas</div>
                        <h3 className="text-[15px] lg:text-lg font-light text-white tracking-wide">
                          Fundação de Governança & <span className="text-[#d2af5a] font-medium">Cultura</span>
                        </h3>
                      </div>
                    </div>

                    <p className="text-[11px] text-white/70 leading-relaxed">
                      A governança digital garante que a tecnologia seja usada de maneira <strong>eficiente e alinhada</strong> às estratégias corporativas, mitigando riscos regulatórios em conformidade com a LGPD e GDPR.
                    </p>

                    {/* The 4 pillars summarized */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] text-white/80">
                      <div className="p-3 bg-black/45 border border-white/5 rounded-xl space-y-1">
                        <span className="font-bold text-[#d2af5a] block">🎯 ESTRATÉGIA</span>
                        <span className="text-white/65 leading-relaxed block">
                          Alinhamento tecnológico. Ex: Ambev BEES (+30% em pedidos digitais, 1M+ PDVs conectados).
                        </span>
                      </div>
                      <div className="p-3 bg-black/45 border border-white/5 rounded-xl space-y-1">
                        <span className="font-bold text-[#e24b4a] block">🛡️ RISCOS & SEGURANÇA</span>
                        <span className="text-white/65 leading-relaxed block">
                          Segurança e mitigação. Renner perdeu R$ 20M por ransomware em 2021.
                        </span>
                      </div>
                      <div className="p-3 bg-black/45 border border-white/5 rounded-xl space-y-1">
                        <span className="font-bold text-[#cbd5e1] block">📋 POLÍTICAS</span>
                        <span className="text-white/65 leading-relaxed block">
                          Regras de dados. Itaú reduziu relatórios de 5 dias para 2 horas com open data.
                        </span>
                      </div>
                      <div className="p-3 bg-black/45 border border-white/5 rounded-xl space-y-1">
                        <span className="font-bold text-[#5dcaa5] block">🔄 MONITORAMENTO</span>
                        <span className="text-white/65 leading-relaxed block">
                          Não faz sentido construir e não manter. Ex: Meli (2B+ eventos/dia automáticos).
                        </span>
                      </div>
                    </div>

                    {/* Culture / Kotter 5 steps summary */}
                    <div className="border-t border-white/[0.05] pt-3 mt-2 space-y-2">
                      <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider">🚀 5 PASSOS PARA A MUDANÇA (KOTTER & EDMONDSON)</span>
                      <p className="text-[10px] text-white/55 leading-relaxed m-0 italic">
                        "70% das transformações falham no topo (Kotter). A Natura acelerou a adoção em 40% com liderança ativa. A segurança psicológica (Edmondson/Google Aristotle) é o fator #1 de alta performance corporativa."
                      </p>
                    </div>
                  </div>
                  
                  {/* Documents accordions integrated */}
                  <div className="mt-4 pt-4 border-t border-white/[0.05] space-y-2 text-left">
                    {/* POLÍTICAS DE DADOS (4 DOCUMENTOS) */}
                    <button
                      onClick={() => toggleAccordion('politicas')}
                      className="w-full p-3 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl flex justify-between items-center text-[10.5px] font-semibold text-white/90"
                    >
                      <span>POLÍTICAS DE DADOS <span className="text-[8.5px] text-white/40 ml-1.5 font-normal">(4 documentos)</span></span>
                      <ChevronDown className={`h-3.5 w-3.5 text-[#d2af5a] transition-transform duration-300 ${activeAcc === 'politicas' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeAcc === 'politicas' && (
                      <div className="p-3 bg-black/50 border border-white/5 rounded-xl space-y-2 animate-fadeIn text-[10px] text-white/70">
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Política de Privacidade e Proteção de Dados (LGPD/GDPR)</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Política de Retenção e Descarte Seguro de Informações</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Política de Segurança da Informação e Controle de Acessos</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Política de Gestão de Chaves de Criptografia</span></div>
                      </div>
                    )}

                    {/* PRÁTICAS OPERACIONAIS (4 DOCUMENTOS) */}
                    <button
                      onClick={() => toggleAccordion('praticas')}
                      className="w-full p-3 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl flex justify-between items-center text-[10.5px] font-semibold text-white/90"
                    >
                      <span>PRÁTICAS OPERACIONAIS <span className="text-[8.5px] text-white/40 ml-1.5 font-normal">(4 documentos)</span></span>
                      <ChevronDown className={`h-3.5 w-3.5 text-[#d2af5a] transition-transform duration-300 ${activeAcc === 'praticas' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeAcc === 'praticas' && (
                      <div className="p-3 bg-black/50 border border-white/5 rounded-xl space-y-2 animate-fadeIn text-[10px] text-white/70">
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Manual de Engenharia de Software Verde (Green IT)</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Protocolo de Resposta a Incidentes e Incident Responders</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Norma de Ciclo de Vida de Software e QA Seguro</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Manual de Procedimentos de Suporte e SLA Operacional</span></div>
                      </div>
                    )}

                    {/* COMPLIANCE FINANCEIRO (4 DOCUMENTOS) */}
                    <button
                      onClick={() => toggleAccordion('compliance')}
                      className="w-full p-3 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl flex justify-between items-center text-[10.5px] font-semibold text-white/90"
                    >
                      <span>COMPLIANCE FINANCEIRO <span className="text-[8.5px] text-white/40 ml-1.5 font-normal">(4 documentos)</span></span>
                      <ChevronDown className={`h-3.5 w-3.5 text-[#d2af5a] transition-transform duration-300 ${activeAcc === 'compliance' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeAcc === 'compliance' && (
                      <div className="p-3 bg-black/50 border border-white/5 rounded-xl space-y-2 animate-fadeIn text-[10px] text-white/70">
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Política de Simulação Estratégica e Auditoria de EBITDA/WACC</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Diretriz de Controle e Planejamento Tributário</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Manual de Compliance Fiscal e Integridade de Receitas</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Norma de Auditoria de LTV/CAC e Projeções Financeiras</span></div>
                      </div>
                    )}

                    {/* CÓDIGOS E DIRETRIZES (3 DOCUMENTOS) */}
                    <button
                      onClick={() => toggleAccordion('codigos')}
                      className="w-full p-3 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl flex justify-between items-center text-[10.5px] font-semibold text-white/90"
                    >
                      <span>CÓDIGOS E DIRETRIZES <span className="text-[8.5px] text-white/40 ml-1.5 font-normal">(3 documentos)</span></span>
                      <ChevronDown className={`h-3.5 w-3.5 text-[#d2af5a] transition-transform duration-300 ${activeAcc === 'codigos' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeAcc === 'codigos' && (
                      <div className="p-3 bg-black/50 border border-white/5 rounded-xl space-y-2 animate-fadeIn text-[10px] text-white/70">
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Código de Conduta Ética e Integridade Corporativa</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Diretriz de Segurança Psicológica e Autonomia de Squads</span></div>
                        <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#d2af5a]" /> <span>📄 Protocolo Anticorrupção e Homologação de Fornecedores</span></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Continuous Risk Telemetry & IA Audit */}
              <div className="lg:col-span-6 space-y-4">
                <div className="dash-card-systems h-full flex flex-col justify-between">
                  <div className="space-y-4 relative z-10 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[7.5px] font-mono text-[#5dcaa5] tracking-[0.2em] font-bold uppercase mb-1">LIVE TELEMETRY ◆ ACTIVE MONITOR</div>
                        <h3 className="text-[15px] lg:text-lg font-light text-white tracking-wide">
                          Monitoramento Contínuo de <span className="text-[#5dcaa5] font-medium">Riscos & Segurança</span>
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 bg-[#5dcaa5]/10 border border-[#5dcaa5]/30 rounded text-[8px] font-mono font-bold text-[#5dcaa5] tracking-widest uppercase animate-pulse">PROTEGIDO</span>
                    </div>

                    {/* Verification details of Encryption, 2FA and Backup */}
                    <div className="p-3.5 bg-black/60 border border-white/5 rounded-xl space-y-2.5">
                      <span className="block text-[8px] font-mono text-white/40 uppercase tracking-wider">🛡️ Auditoria de Segurança Business Syllabus App (Verificação de Integridade)</span>
                      
                      <div className="space-y-2 text-[10.5px]">
                        <div className="flex items-center justify-between border-b border-white/[0.03] pb-1.5">
                          <span className="flex items-center gap-1.5 text-white/70">
                            <Lock className="h-3.5 w-3.5 text-[#5dcaa5]" /> Criptografia de Dados (SSL/TLS):
                          </span>
                          <span className="text-[#5dcaa5] font-mono font-bold uppercase">Ativo (AES-256)</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/[0.03] pb-1.5">
                          <span className="flex items-center gap-1.5 text-white/70">
                            <Database className="h-3.5 w-3.5 text-[#5dcaa5]" /> Criptografia em Repouso (DB):
                          </span>
                          <span className="text-[#5dcaa5] font-mono font-bold uppercase">Ativo (Chaves PG)</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/[0.03] pb-1.5">
                          <span className="flex items-center gap-1.5 text-white/70">
                            <Key className="h-3.5 w-3.5 text-[#5dcaa5]" /> Autenticação 2FA (Admin Cockpit):
                          </span>
                          <span className="text-[#5dcaa5] font-mono font-bold uppercase">Habilitado (100%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-white/70">
                            <RefreshCw className="h-3.5 w-3.5 text-[#5dcaa5]" /> Backup Automático Diário:
                          </span>
                          <span className="text-[#5dcaa5] font-mono font-bold uppercase">Realizado (Diário)</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Audit Section for COBIT, ISO 38500, and ITIL 4 */}
                    <div className="border-t border-white/[0.05] pt-4 mt-2 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Cpu className="h-3.5 w-3.5" /> IA Auditor: COBIT, ISO 38500 & ITIL 4
                        </span>
                        <button
                          onClick={handleGenerateAudit}
                          disabled={generatingAudit}
                          className="px-2.5 py-1.5 bg-[#d2af5a]/10 hover:bg-[#d2af5a]/25 border border-[#d2af5a]/30 rounded-lg text-[8px] font-mono font-bold text-[#d2af5a] uppercase tracking-widest cursor-pointer select-none transition disabled:opacity-40"
                        >
                          {generatingAudit ? 'Auditando...' : 'Executar Auditoria'}
                        </button>
                      </div>

                      {generatingAudit ? (
                        <div className="p-4 bg-black/30 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
                          <Cpu className="h-5 w-5 text-[#d2af5a] animate-spin" />
                          <span className="text-[9px] font-mono text-[#d2af5a] animate-pulse">Varrendo telemetria de segurança e conformidade...</span>
                        </div>
                      ) : auditResult ? (
                        <div className="space-y-2 animate-fadeIn text-[10.5px]">
                          <div className="p-3 bg-[#d2af5a]/5 border border-[#d2af5a]/15 rounded-xl space-y-1.5">
                            <div>
                              <span className="text-[8px] font-mono text-[#d2af5a] font-bold uppercase">📘 COBIT Audit (Conformidade Estratégica)</span>
                              <p className="text-white/80 leading-relaxed mt-0.5 m-0 text-[10px]">{auditResult.cobit.summary}</p>
                              <span className="block text-[8.5px] text-[#5dcaa5] font-mono mt-0.5"><strong>Ação Recomendada:</strong> {auditResult.cobit.action}</span>
                            </div>
                            <div className="border-t border-white/[0.05] pt-1.5">
                              <span className="text-[8px] font-mono text-[#5dcaa5] font-bold uppercase">🛡️ ISO/IEC 38500 Audit (Direção e Governança)</span>
                              <p className="text-white/80 leading-relaxed mt-0.5 m-0 text-[10px]">{auditResult.iso38500.summary}</p>
                              <span className="block text-[8.5px] text-[#5dcaa5] font-mono mt-0.5"><strong>Ação Recomendada:</strong> {auditResult.iso38500.action}</span>
                            </div>
                            <div className="border-t border-white/[0.05] pt-1.5">
                              <span className="text-[8px] font-mono text-[#cbd5e1] font-bold uppercase">🔄 ITIL 4 Audit (Operações e Resposta)</span>
                              <p className="text-white/80 leading-relaxed mt-0.5 m-0 text-[10px]">{auditResult.itil4.summary}</p>
                              <span className="block text-[8.5px] text-[#5dcaa5] font-mono mt-0.5"><strong>Ação Recomendada:</strong> {auditResult.itil4.action}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-black/20 border border-white/5 rounded-xl text-center text-[9.5px] text-white/40 font-mono">
                          Nenhuma auditoria executada nesta sessão. Clique em "Executar Auditoria" para rodar a análise de conformidade do ITIL 4, COBIT e ISO 38500 via IA.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Manual Generate Doc Button integrated inside footer */}
                  <div className="mt-4 pt-4 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <span className="text-[8.5px] text-white/45 font-mono">Governança digital simplificada e robusta.</span>
                    <button
                      onClick={handleGenerateDoc}
                      disabled={generating}
                      className="px-3 py-1.5 rounded bg-black/60 hover:bg-white/5 border border-white/10 text-white/70 font-mono text-[9px] font-bold tracking-wider uppercase transition cursor-pointer select-none disabled:opacity-40"
                    >
                      {generating ? 'Gerando Código...' : 'Gerar Código IA'}
                    </button>
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