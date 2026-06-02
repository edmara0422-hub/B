'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BottomNav } from '@/components/business-syllabus/bottom-nav'
import { GlassPanel } from '@/components/business-syllabus/glass-panel'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Brain, Building2, Target, Users, Loader2, Play } from 'lucide-react'
import Link from 'next/link'

type FormFields = {
  historia: string
  produto: string
  concorrentes: string
  diferencial: string
  forcas: string
  fraquezas: string
  rotina: string
  planejamento: string
  organizacao: string
}

type Report = {
  macroambiente: string
  microambiente: string
  stakeholders: string
  estrutura_controle: string
  plano_acao: { titulo: string; descricao: string }[]
} | null

export default function ConsultoriaBusinessPage() {
  const [form, setForm] = useState<FormFields>({
    historia: '',
    produto: '',
    concorrentes: '',
    diferencial: '',
    forcas: '',
    fraquezas: '',
    rotina: '',
    planejamento: '',
    organizacao: ''
  })

  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<Report>(null)
  const [activeTab, setActiveTab] = useState<'macro' | 'micro' | 'stakeholders' | 'estrutura' | 'acao'>('macro')

  const handleInputChange = (field: keyof FormFields) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleGenerateReport = async () => {
    setLoading(true)
    setReport(null)
    
    try {
      const res = await fetch('/api/business/consultoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      const data = await res.json()
      if (res.ok && !data.error) {
        setReport(data)
      } else {
        alert(data.error || 'Erro ao gerar laudo.')
      }
    } catch (err) {
      console.error(err)
      alert('Falha na comunicação com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white pb-24 font-sans selection:bg-[#d4b87a]/30">
      
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4b87a]/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#cbd5e1]/10 blur-[150px] rounded-full mix-blend-screen opacity-30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div className="relative z-10 px-4 pt-12 max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex items-center gap-4">
          <Link href="/sistemas">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-medium tracking-tight text-white/90">Diagnostic OS</h1>
            <p className="text-sm text-white/40 font-light mt-0.5">Consultoria de Gestão e Liderança (ATP)</p>
          </div>
        </header>

        {/* Formulário vs Relatório */}
        <AnimatePresence mode="wait">
          {!report ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              <GlassPanel className="p-6 border-[#d4b87a]/20 bg-[#0c0905]/80">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#d4b87a]/10 border border-[#d4b87a]/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#d4b87a]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-white/90">Dados da Organização</h2>
                    <p className="text-xs text-white/50 mt-1">Preencha os dados da Etapa 1 da ATP.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    { key: 'historia', label: '1. História', placeholder: 'Qual a história da empresa?' },
                    { key: 'produto', label: '2. Produto/Serviço', placeholder: 'O que a empresa oferece?' },
                    { key: 'concorrentes', label: '3. Concorrentes', placeholder: 'Quem são os concorrentes?' },
                    { key: 'diferencial', label: '4. Diferencial', placeholder: 'Qual o grande diferencial?' },
                    { key: 'forcas', label: '5. Forças', placeholder: 'Principais pontos fortes.' },
                    { key: 'fraquezas', label: '6. Fraquezas', placeholder: 'Principais pontos fracos.' },
                    { key: 'rotina', label: '7. Rotina do Gestor', placeholder: 'Como é o dia a dia da gestão?' },
                    { key: 'planejamento', label: '8. Planejamento', placeholder: 'Há algum planejamento formal?' },
                    { key: 'organizacao', label: '9. Organização', placeholder: 'Como os recursos (humanos, financeiros) são organizados?' }
                  ].map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <label className="text-sm font-medium text-[#d4b87a]/80 pl-1">{field.label}</label>
                      <textarea
                        value={form[field.key as keyof FormFields]}
                        onChange={handleInputChange(field.key as keyof FormFields)}
                        placeholder={field.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4b87a]/50 transition-all min-h-[80px]"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <Button 
                    onClick={handleGenerateReport} 
                    disabled={loading}
                    className="w-full bg-[#d4b87a] hover:bg-[#d4b87a]/90 text-black font-semibold h-12 rounded-xl shadow-[0_0_20px_rgba(212,184,122,0.3)]"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Processando Análise (Gemini 1.5 Pro)</span>
                    ) : (
                      <span className="flex items-center gap-2"><Play className="w-4 h-4 fill-black" /> Gerar Relatório de Consultoria</span>
                    )}
                  </Button>
                </div>
              </GlassPanel>
            </motion.div>
          ) : (
            <motion.div 
              key="report"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Report Dashboard */}
              <GlassPanel className="p-6 border-[#d4b87a]/30 bg-[#0c0905]/90 overflow-hidden relative">
                
                {/* Header do Report */}
                <div className="flex items-start justify-between mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#d4b87a] to-[#cbd5e1] flex items-center justify-center p-[2px]">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-[#d4b87a]" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-white/90">Relatório Estratégico</h2>
                      <p className="text-sm text-[#d4b87a]/70 font-mono tracking-widest uppercase mt-1">Análise Concluída</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setReport(null)}
                    className="border-white/10 bg-white/5 text-white/60 hover:text-white"
                  >
                    Nova Consulta
                  </Button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
                  {[
                    { id: 'macro', label: 'Macroambiente', icon: Target },
                    { id: 'micro', label: 'Microambiente', icon: Target },
                    { id: 'stakeholders', label: 'Stakeholders', icon: Users },
                    { id: 'estrutura', label: 'Estrutura & Controle', icon: Building2 },
                    { id: 'acao', label: 'Plano de Ação', icon: Play },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                          ? 'bg-[#d4b87a]/15 text-[#d4b87a] border border-[#d4b87a]/30' 
                          : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                  {activeTab === 'macro' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80 leading-relaxed text-sm whitespace-pre-wrap">
                      <h3 className="text-lg font-medium text-white mb-4">Análise do Macroambiente (PESTEL)</h3>
                      {report.macroambiente}
                    </motion.div>
                  )}
                  {activeTab === 'micro' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80 leading-relaxed text-sm whitespace-pre-wrap">
                      <h3 className="text-lg font-medium text-white mb-4">Análise do Microambiente</h3>
                      {report.microambiente}
                    </motion.div>
                  )}
                  {activeTab === 'stakeholders' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80 leading-relaxed text-sm whitespace-pre-wrap">
                      <h3 className="text-lg font-medium text-white mb-4">Análise de Stakeholders</h3>
                      {report.stakeholders}
                    </motion.div>
                  )}
                  {activeTab === 'estrutura' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80 leading-relaxed text-sm whitespace-pre-wrap">
                      <h3 className="text-lg font-medium text-white mb-4">Estrutura e Sistemas de Controle</h3>
                      {report.estrutura_controle}
                    </motion.div>
                  )}
                  {activeTab === 'acao' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <h3 className="text-lg font-medium text-white mb-4">Proposições Gerenciais (As 3 Soluções)</h3>
                      {report.plano_acao.map((acao, idx) => (
                        <div key={idx} className="p-5 rounded-xl border border-white/10 bg-white/5 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#d4b87a]" />
                          <h4 className="text-[#d4b87a] font-medium text-base mb-2">Solução {idx + 1}: {acao.titulo}</h4>
                          <p className="text-white/70 text-sm leading-relaxed">{acao.descricao}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <BottomNav />
    </div>
  )
}
