import React, { useState } from 'react'
import { Plus, Compass, Play } from 'lucide-react'
import { useSigPessoasStore, Candidate } from './store'
import { motion, AnimatePresence } from 'framer-motion'

export function SigPessoasLideres() {
  const { 
    lideresTab, setLideresTab, candidates, addCandidate, updateCandidateStage, addTeamMember, 
    setActiveTab, setTimeTab 
  } = useSigPessoasStore()
  
  const [showRecruitModal, setShowRecruitModal] = useState(false)
  const [recruitRole, setRecruitRole] = useState('')
  const [recruitType, setRecruitType] = useState<'liderado'|'gestor'|'lider-gestor'|'lider'>('liderado')

  function handleAdd() {
    if (!recruitRole) return
    const novo: Candidate = {
      id: `c${Date.now()}`,
      name: 'Novo Candidato',
      role: recruitRole,
      type: recruitType,
      score: 'Pendente IA',
      stage: 'triagem'
    }
    addCandidate(novo)
    setShowRecruitModal(false)
    setRecruitRole('')
  }

  function handleEvolve(c: Candidate) {
    if (c.stage === 'triagem') updateCandidateStage(c.id, 'entrevista')
    else if (c.stage === 'entrevista') updateCandidateStage(c.id, 'decisao')
    else if (c.stage === 'decisao') updateCandidateStage(c.id, 'onboarding')
    else if (c.stage === 'onboarding') {
      updateCandidateStage(c.id, 'efetivado')
      addTeamMember({
        id: `t${Date.now()}`, name: c.name, role: c.role, type: c.type,
        d6: 75, influence: 0, impact: 0, maturity: 'M2'
      })
      if (c.type === 'lider' || c.type === 'gestor' || c.type === 'lider-gestor') {
        setActiveTab('lideres')
        setLideresTab('voce')
      } else {
        setActiveTab('time')
        setTimeTab('pessoas')
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sub Nav */}
      <div className="flex gap-2 p-1.5 bg-[#080808]/80 border border-white/10 rounded-2xl w-fit">
        {[
          { id: 'recrutar', label: 'Recrutar' },
          { id: 'voce', label: 'Você (O Líder)' },
          { id: 'gerir', label: 'Gerir' },
          { id: 'delegar', label: 'Delegar' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setLideresTab(t.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
              lideresTab === t.id 
                ? 'bg-[#d4b87a] text-black shadow-[0_0_20px_rgba(212,184,122,0.3)]' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {lideresTab === 'recrutar' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl">
              <h3 className="text-xs font-mono text-[#d4b87a] tracking-widest uppercase mb-4">Novo Candidato</h3>
              <p className="text-xs text-white/50 mb-6">Triagem orientada por IA (HHS + Lencioni).</p>
              <button 
                onClick={() => setShowRecruitModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-[#d4b87a]/20 border border-white/10 hover:border-[#d4b87a] text-[#d4b87a] text-xs font-medium transition-all uppercase tracking-widest"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </div>
            
            <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl">
              <h3 className="text-xs font-mono text-white/40 tracking-widest uppercase mb-4">Automações</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] text-white/60"><span>IA Lencioni</span><span className="text-green-400">Ativo</span></div>
                <div className="flex justify-between items-center text-[10px] text-white/60"><span>HHS Scoring</span><span className="text-green-400">Ativo</span></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl min-h-[500px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-mono text-white/60 tracking-widest uppercase">Funil de Recrutamento (NASA OS)</h3>
                <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-white/40">{candidates.length} Ativos</span>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4">
                {['triagem', 'entrevista', 'decisao', 'onboarding'].map(stage => (
                  <div key={stage} className="flex-1 min-w-[220px] bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                    <h4 className="text-[10px] font-mono text-[#d4b87a] uppercase tracking-widest text-center pb-3 border-b border-white/5">{stage}</h4>
                    {candidates.filter(c => c.stage === stage).map(c => (
                      <div key={c.id} className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-[#d4b87a]/50 transition-all flex flex-col gap-2 relative group">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-white/90">{c.name}</span>
                          <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 uppercase">{c.type}</span>
                        </div>
                        <span className="text-[10px] text-[#d4b87a]/70">{c.role}</span>
                        <span className="text-[9px] text-white/40">{c.score}</span>
                        <button 
                          onClick={() => handleEvolve(c)}
                          className="mt-2 text-[9px] w-full py-1.5 rounded-lg bg-[#d4b87a]/10 text-[#d4b87a] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all"
                        >
                          {stage === 'onboarding' ? 'CONTRATAR' : 'AVANÇAR'}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {lideresTab === 'voce' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-[#080808]/90 border border-[#d4b87a]/20 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b87a]/5 blur-[80px] mix-blend-screen" />
            <h3 className="text-sm font-mono text-[#d4b87a] tracking-widest uppercase mb-2">O Equilíbrio do Líder</h3>
            <p className="text-xs text-white/50 mb-8 max-w-md">Equilibre a Complexidade (Gestor) e a Mudança (Líder).</p>
            
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-[#5dcaa5]">
                <h4 className="text-xs font-mono text-white/90 uppercase tracking-widest mb-1">GESTOR (Complexidade)</h4>
                <p className="text-[11px] text-white/60">Foca em processos, previsibilidade e alinhamento operacional.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-[#fac775]">
                <h4 className="text-xs font-mono text-white/90 uppercase tracking-widest mb-1">LÍDER (Mudança)</h4>
                <p className="text-[11px] text-white/60">Foca em propósito, cultura, inovação e visão de futuro.</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-mono text-[#d4b87a] uppercase tracking-widest">Diário IE + Alpha Linter</h4>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-[9px] text-[#d4b87a] font-bold uppercase"><Play className="w-3 h-3"/> Prof IA</button>
              </div>
              <textarea placeholder="Escreva sobre uma emoção intensa. A IA vai analisar fatos vs julgamentos (CNV)." className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#d4b87a]/50 resize-none mb-4" />
              <button className="w-full py-3 rounded-xl bg-white/10 text-white/80 text-xs font-medium hover:bg-[#d4b87a]/20 hover:text-[#d4b87a] transition-colors uppercase tracking-widest">Analisar & Salvar</button>
            </div>

            <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex-1">
              <h4 className="text-xs font-mono text-white/60 uppercase tracking-widest mb-4">Fase 1: Autoconhecimento</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 hover:border-[#d4b87a]/30 cursor-pointer"><span>Janela de Johari (Luft)</span><Play className="w-3 h-3 text-[#d4b87a]"/></div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 hover:border-[#d4b87a]/30 cursor-pointer"><span>Sistema 1 e 2 (Kahneman)</span><Play className="w-3 h-3 text-[#d4b87a]"/></div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 hover:border-[#d4b87a]/30 cursor-pointer"><span>Gatilhos Emocionais (Goleman)</span><Play className="w-3 h-3 text-[#d4b87a]"/></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recrutamento Modal */}
      <AnimatePresence>
        {showRecruitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#0c0905]/95 border border-[#d4b87a]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(212,184,122,0.1)] relative overflow-hidden"
            >
              <button onClick={() => setShowRecruitModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">✕</button>
              <h2 className="text-lg font-medium text-[#d4b87a] mb-2">Novo Candidato</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-mono">Papel</label>
                  <input value={recruitRole} onChange={e => setRecruitRole(e.target.value)} placeholder="Ex: Desenvolvedor Senior" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-3 font-mono">Nível de Atuação (Workflow Routing)</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'liderado', title: 'Liderado', desc: 'Membro do time (Time)' },
                      { id: 'gestor', title: 'Gestor', desc: 'Foco: Gestão de Processos (Você)' },
                      { id: 'lider', title: 'Líder', desc: 'Foco: Visão e Cultura (Você)' }
                    ].map(r => (
                      <button key={r.id} onClick={() => setRecruitType(r.id as any)} className={`p-3 rounded-xl border text-left ${recruitType === r.id ? 'bg-[#d4b87a]/10 border-[#d4b87a]' : 'bg-black/30 border-white/5'}`}>
                        <span className={`text-xs font-semibold ${recruitType === r.id ? 'text-[#d4b87a]' : 'text-white/80'}`}>{r.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={handleAdd} disabled={!recruitRole} className="w-full mt-6 bg-[#d4b87a] text-black font-semibold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:bg-[#e0c887] transition-colors disabled:opacity-50">Iniciar Triagem IA</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
