'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Scale, Send, CheckCircle2, ChevronDown, FileText } from 'lucide-react'

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
  const [denunciaFeed, setDenunciaFeed] = useState<Denuncia[]>([
    {
      id: 'd1',
      tipo: 'Conflito de interesses',
      descricao: 'Alegado conflito de interesse em compras.',
      data: 'Há 2 dias',
      status: 'Em Análise',
      statusColor: '#fac775'
    }
  ])
  const [submitted, setSubmitted] = useState(false)

  // State for Governança accordions
  const [activeAcc, setActiveAcc] = useState<string | null>(null)

  // State for document generation
  const [generating, setGenerating] = useState(false)
  const [generatedDoc, setGeneratedDoc] = useState('')

  const handleSubmitDenuncia = () => {
    if (!tipoDenuncia) {
      alert('Por favor, selecione o tipo da denúncia!')
      return
    }
    if (!descricao.trim()) {
      alert('Por favor, descreva o que aconteceu!')
      return
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
    setTipoDenuncia('')
    setDescricao('')

    setTimeout(() => {
      setSubmitted(false)
    }, 4000)
  }

  const handleGenerateDoc = () => {
    setGenerating(true)
    setTimeout(() => {
      setGeneratedDoc('📄 Código de Conduta e Governança Corporativa V1.0 gerado com base nas diretrizes do IPB e em conformidade com as melhores práticas de ESG e Compliance.')
      setGenerating(false)
    }, 1500)
  }

  const toggleAccordion = (id: string) => {
    setActiveAcc(activeAcc === id ? null : id)
  }

  return (
    <div className="w-full space-y-4">
      {/* Sub tabs Row */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-2.5">
        {(['denuncias', 'governanca'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-4 py-2 text-[11px] lg:text-xs rounded-md font-medium tracking-wide transition ${
              subTab === tab
                ? 'bg-[#d4b87a]/10 border border-[#d4b87a]/30 text-[#e0c887]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            {tab === 'denuncias' && 'Canal de Denúncias'}
            {tab === 'governanca' && 'Governança IPB'}
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
            <div className="ipb-soft relative overflow-hidden rounded-[1.2rem] p-6 lg:p-8 border border-white/[0.06]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d4b87a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 01 ◆ Compliance</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Canal de <span className="text-[#d4b87a] font-medium">Denúncias</span>
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-lg">
                    Este canal é 100% anônimo. Protegido pela LGPD e sob rigoroso protocolo de integridade.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d4b87a]/5 border border-[#d4b87a]/15 text-[8.5px] font-mono text-[#d4b87a]">
                  <Scale className="h-3 w-3" />
                  <span>PROTOCOLO CRÍTICO</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-white/85">Tipo da denúncia</label>
                    <select
                      value={tipoDenuncia}
                      onChange={(e) => setTipoDenuncia(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2.5 text-xs text-white outline-none focus:border-[#d4b87a]/50 transition"
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

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-white/85">Descreva o que aconteceu</label>
                    <textarea
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Ninguém saberá quem enviou..."
                      className="w-full h-32 bg-black/40 border border-white/10 rounded-md px-3 py-2.5 text-xs text-white outline-none focus:border-[#d4b87a]/50 resize-none transition"
                    />
                  </div>

                  {submitted && (
                    <div className="p-3 bg-[#5dcaa5]/5 border border-[#5dcaa5]/30 text-[#5dcaa5] rounded-md text-[11px] flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Sua denúncia anônima foi enviada para triagem interna com sucesso! Obrigado por colaborar.</span>
                    </div>
                  )}

                  <button
                    onClick={handleSubmitDenuncia}
                    className="w-full py-2.5 rounded-md bg-[#d4b87a] hover:bg-[#c5a55a] text-black font-semibold text-xs tracking-wider transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Enviar Denúncia Anônima</span>
                  </button>
                </div>

                {/* Complaints Feed */}
                <div className="bg-black/25 p-5 rounded-xl border border-white/[0.04] flex flex-col">
                  <span className="block text-[10px] font-mono font-bold text-[#d4b87a] tracking-wider uppercase border-b border-white/[0.06] pb-3 mb-4">
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
                          className="p-3.5 bg-black/40 border-l-2 rounded-r-md border-white/10"
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
            <div className="ipb-soft relative overflow-hidden rounded-[1.2rem] p-6 lg:p-8 border border-white/[0.06]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d4b87a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 02 ◆ Governança IPB</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Políticas, Práticas e <span className="text-[#d4b87a] font-medium">Códigos</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d4b87a]/5 border border-[#d4b87a]/15 text-[8.5px] font-mono text-[#d4b87a]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>CONFORMIDADE</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="space-y-2.5 mb-6">
                {/* Politicas */}
                <div className="bg-black/15 border border-white/[0.04] rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('politicas')}
                    className="w-full px-5 py-4 flex justify-between items-center text-xs font-semibold text-white/90"
                  >
                    <span>Políticas <span className="text-[9px] text-white/40 ml-1.5 font-normal">(4 documentos)</span></span>
                    <ChevronDown className={`h-4 w-4 text-[#d4b87a] transition-transform duration-300 ${activeAcc === 'politicas' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAcc === 'politicas' && (
                    <div className="px-5 pb-4 space-y-2 pt-1.5 border-t border-white/[0.03] bg-black/25">
                      <div className="p-2.5 bg-black/35 rounded border border-white/5 text-[11px] text-white/80 flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-[#d4b87a] shrink-0" />
                        <span>📄 Política de Privacidade e Dados (LGPD)</span>
                      </div>
                      <div className="p-2.5 bg-black/35 rounded border border-white/5 text-[11px] text-white/80 flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-[#d4b87a] shrink-0" />
                        <span>📄 Política de Diversidade e Inclusão</span>
                      </div>
                      <div className="p-2.5 bg-black/35 rounded border border-white/5 text-[11px] text-white/80 flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-[#d4b87a] shrink-0" />
                        <span>📄 Política de Segurança da Informação</span>
                      </div>
                      <div className="p-2.5 bg-black/35 rounded border border-white/5 text-[11px] text-white/80 flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-[#d4b87a] shrink-0" />
                        <span>📄 Política de Uso Aceitável</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Praticas */}
                <div className="bg-black/15 border border-white/[0.04] rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('praticas')}
                    className="w-full px-5 py-4 flex justify-between items-center text-xs font-semibold text-white/90"
                  >
                    <span>Práticas <span className="text-[9px] text-white/40 ml-1.5 font-normal">(4 documentos)</span></span>
                    <ChevronDown className={`h-4 w-4 text-[#d4b87a] transition-transform duration-300 ${activeAcc === 'praticas' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAcc === 'praticas' && (
                    <div className="px-5 pb-4 pt-2 text-xs text-white/50 border-t border-white/[0.03] bg-black/25">
                      Diretrizes e manuais de melhores práticas corporativas IPB homologadas.
                    </div>
                  )}
                </div>

                {/* Compliance */}
                <div className="bg-black/15 border border-white/[0.04] rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('compliance')}
                    className="w-full px-5 py-4 flex justify-between items-center text-xs font-semibold text-white/90"
                  >
                    <span>Compliance <span className="text-[9px] text-white/40 ml-1.5 font-normal">(4 documentos)</span></span>
                    <ChevronDown className={`h-4 w-4 text-[#d4b87a] transition-transform duration-300 ${activeAcc === 'compliance' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAcc === 'compliance' && (
                    <div className="px-5 pb-4 pt-2 text-xs text-white/50 border-t border-white/[0.03] bg-black/25">
                      Registros de auditorias de governança, relatórios tributários e fiscais em conformidade.
                    </div>
                  )}
                </div>

                {/* Codigos */}
                <div className="bg-black/15 border border-white/[0.04] rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('codigos')}
                    className="w-full px-5 py-4 flex justify-between items-center text-xs font-semibold text-white/90"
                  >
                    <span>Códigos <span className="text-[9px] text-white/40 ml-1.5 font-normal">(3 documentos)</span></span>
                    <ChevronDown className={`h-4 w-4 text-[#d4b87a] transition-transform duration-300 ${activeAcc === 'codigos' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAcc === 'codigos' && (
                    <div className="px-5 pb-4 pt-2 text-xs text-white/50 border-t border-white/[0.03] bg-black/25">
                      Código de conduta e ética comercial do IPB para colaboradores e fornecedores.
                    </div>
                  )}
                </div>
              </div>

              {/* IA Document Generator */}
              <div className="bg-gradient-to-br from-[#d4b87a]/10 to-transparent border border-[#d4b87a]/20 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <b className="block text-xs font-bold text-[#d4b87a]">Gerador de Documentos para Empresas</b>
                  <p className="block text-[11px] text-white/70 max-w-lg">
                    A IA gera políticas, códigos e relatórios de compliance personalizados para o CNPJ e setor da sua empresa.
                  </p>
                </div>
                <button
                  onClick={handleGenerateDoc}
                  disabled={generating}
                  className="px-4 py-2.5 rounded bg-[#d4b87a] hover:bg-[#c5a55a] text-black font-semibold text-xs tracking-wide transition disabled:opacity-40 shrink-0"
                >
                  {generating ? 'Gerando com IA...' : 'Gerar com IA'}
                </button>
              </div>

              {generatedDoc && (
                <div className="mt-4 p-4 bg-[#5dcaa5]/5 border border-[#5dcaa5]/30 text-[#5dcaa5] rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{generatedDoc}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
