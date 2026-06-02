const fs = require('fs');

const content = `
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, CheckSquare, Square, ChevronDown, ChevronUp, UserCheck, 
  BookOpen, AlertCircle, Play, Plus, Trash2, Activity, ShieldAlert, 
  FileText, Users, Award, Compass, Cpu, Zap, BarChart3, Search, Undo2,
  Crosshair, Rocket, Target, Brain, Radar
} from 'lucide-react'

type TabOption = 'home' | 'lideres' | 'time' | 'empresa'
type LideresSubTab = 'recrutar' | 'gerir' | 'delegar' | 'voce'
type TimeSubTab = 'formar' | 'pessoas' | 'influencia'
type EmpresaSubTab = 'estrategia' | 'bi' | 'relatorio' | 'canais'

type Candidate = {
  id: string
  name: string
  role: string
  type: 'liderado' | 'gestor' | 'lider-gestor' | 'lider'
  score: string
  stage: 'triagem' | 'entrevista' | 'decisao' | 'onboarding' | 'efetivado'
}

type TeamMember = {
  id: string
  name: string
  role: string
  type: 'liderado' | 'gestor' | 'lider-gestor' | 'lider'
  d6: number
  influence: number
  impact: number
  maturity: 'M1' | 'M2' | 'M3' | 'M4'
}

export function SigPessoasPanel() {
  const [activeTab, setActiveTab] = useState<TabOption>('home')
  const [lideresTab, setLideresTab] = useState<LideresSubTab>('recrutar')
  const [timeTab, setTimeTab] = useState<TimeSubTab>('formar')
  const [empresaTab, setEmpresaTab] = useState<EmpresaSubTab>('estrategia')

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  function triggerToast(msg: string) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 'c1', name: 'Ana Beatriz', role: 'Head de Growth', type: 'lider', score: 'HHS A / Lencioni 9.2', stage: 'triagem' },
    { id: 'c2', name: 'Bruno Melo', role: 'Dev Pleno', type: 'liderado', score: 'HHS B+', stage: 'entrevista' },
  ])

  const [team, setTeam] = useState<TeamMember[]>([
    { id: 't1', name: 'Rodrigo Silva', role: 'Coordenador', type: 'gestor', d6: 82, influence: 80, impact: 60, maturity: 'M3' }
  ])

  // Recrutamento Modal
  const [showRecruitModal, setShowRecruitModal] = useState(false)
  const [recruitRole, setRecruitRole] = useState('')
  const [recruitType, setRecruitType] = useState<'liderado'|'gestor'|'lider-gestor'|'lider'>('liderado')

  function handleAddCandidate() {
    if (!recruitRole) return
    const novo: Candidate = {
      id: \`c\${Date.now()}\`,
      name: 'Novo Candidato',
      role: recruitRole,
      type: recruitType,
      score: 'Pendente IA',
      stage: 'triagem'
    }
    setCandidates([...candidates, novo])
    setShowRecruitModal(false)
    setRecruitRole('')
    triggerToast('Candidato adicionado para triagem IA.')
  }

  function handleEvolveCandidate(c: Candidate) {
    if (c.stage === 'triagem') {
      setCandidates(candidates.map(x => x.id === c.id ? { ...x, stage: 'entrevista' } : x))
    } else if (c.stage === 'entrevista') {
      setCandidates(candidates.map(x => x.id === c.id ? { ...x, stage: 'decisao' } : x))
    } else if (c.stage === 'decisao') {
      setCandidates(candidates.map(x => x.id === c.id ? { ...x, stage: 'onboarding' } : x))
    } else if (c.stage === 'onboarding') {
      setCandidates(candidates.map(x => x.id === c.id ? { ...x, stage: 'efetivado' } : x))
      
      setTeam([...team, {
        id: \`t\${Date.now()}\`,
        name: c.name,
        role: c.role,
        type: c.type,
        d6: 75,
        influence: 0,
        impact: 0,
        maturity: 'M2'
      }])
      triggerToast(\`\${c.name} Contratado(a)!\`)

      // Flow routing based on user concept
      if (c.type === 'lider' || c.type === 'gestor' || c.type === 'lider-gestor') {
        setActiveTab('lideres')
        setLideresTab('voce')
        triggerToast('Líder recrutado! Bem-vindo à aba VOCÊ para calibração 6D.')
      } else {
        setActiveTab('time')
        setTimeTab('pessoas')
        triggerToast('Liderado recrutado! Bem-vindo à aba TIME.')
      }
    }
  }

  const renderHome = () => (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 4 Blocos Nav */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { id: 'lideres', title: 'Líderes', icon: Award, desc: 'Recrutar & Você', color: 'text-[#d4b87a]' },
          { id: 'time', title: 'Time', icon: Users, desc: 'Formar & Aliança', color: 'text-white' },
          { id: 'gerir', title: 'Gerir', icon: Activity, desc: 'Diário & 1:1', color: 'text-white' },
          { id: 'empresa', title: 'Empresa', icon: Target, desc: 'OKRs & Estratégia', color: 'text-white' }
        ].map(b => (
          <button 
            key={b.id}
            onClick={() => setActiveTab(b.id as any)}
            className="group relative flex flex-col p-5 rounded-2xl bg-[#0c0905]/80 border border-white/5 hover:border-[#d4b87a]/40 overflow-hidden transition-all text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
            <b.icon className={\`w-6 h-6 mb-3 \${b.color}\`} />
            <span className="text-xs font-mono text-white/50 tracking-wider uppercase">{b.title}</span>
            <span className="text-[10px] text-white/30 mt-1">{b.desc}</span>
          </button>
        ))}
      </div>

      {/* Cockpit Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Radar 6D & Pulse */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4b87a]/10 blur-[50px] mix-blend-screen" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-xs font-mono text-[#d4b87a] tracking-widest uppercase">Saúde 6D</h3>
              <Radar className="w-4 h-4 text-white/20" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {[
                { label: 'D1 Cultura', val: '82%', color: 'bg-green-500/20 text-green-400' },
                { label: 'D2 Liderança', val: '76%', color: 'bg-yellow-500/20 text-yellow-400' },
                { label: 'D3 Confiança', val: '91%', color: 'bg-green-500/20 text-green-400' },
                { label: 'D4 Entrega', val: '88%', color: 'bg-green-500/20 text-green-400' },
                { label: 'D5 Clareza', val: '64%', color: 'bg-red-500/20 text-red-400' },
                { label: 'D6 Engajamento', val: '74%', color: 'bg-yellow-500/20 text-yellow-400' },
              ].map(d => (
                <div key={d.label} className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest">{d.label}</span>
                  <span className={\`text-lg font-light \${d.color.split(' ')[1]}\`}>{d.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-[#d4b87a]/20 backdrop-blur-xl shadow-[0_0_30px_rgba(212,184,122,0.05)]">
            <h3 className="text-xs font-mono text-white/60 tracking-widest uppercase mb-4">Pulso Semanal</h3>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-white/40 uppercase mb-2 block">Sua Energia (1-5)</span>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} className="flex-1 py-1.5 rounded-md bg-white/5 hover:bg-[#d4b87a]/20 text-white/50 text-xs border border-white/5 hover:border-[#d4b87a]/50 transition-colors">{n}</button>
                  ))}
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-[#d4b87a]/10 text-[#d4b87a] text-xs font-medium border border-[#d4b87a]/30 hover:bg-[#d4b87a]/20 transition-all uppercase tracking-widest">
                Salvar Pulso
              </button>
            </div>
          </div>
        </div>

        {/* Col 2: Manifesto & Passos */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex-1">
            <h3 className="text-xs font-mono text-white/60 tracking-widest uppercase mb-5">Saúde Manifesto</h3>
            <div className="space-y-3">
              {[
                { id: 'P01', txt: 'Autoconhecimento radical', status: true },
                { id: 'P02', txt: 'Conflito produtivo', status: false },
                { id: 'P03', txt: 'Delegação com clareza', status: true },
                { id: 'P04', txt: 'Feedback estruturado', status: true },
                { id: 'P05', txt: 'Estratégia com significado', status: false },
              ].map(p => (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className={\`w-5 h-5 rounded-md flex items-center justify-center \${p.status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}\`}>
                    {p.status ? <CheckSquare className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                  </div>
                  <span className="text-xs text-white/70">{p.id} - {p.txt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Mapa do Time */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex-1 relative flex flex-col">
            <h3 className="text-xs font-mono text-[#d4b87a] tracking-widest uppercase mb-2">Mapa de Influência</h3>
            <p className="text-[10px] text-white/40 mb-6">Impacto x Influência (NASA OS)</p>
            
            <div className="flex-1 min-h-[200px] border border-white/10 rounded-2xl relative bg-white/[0.02]">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-white/10" />
                <div className="h-full w-px bg-white/10 absolute" />
              </div>
              {/* Quadrant labels */}
              <span className="absolute top-2 left-2 text-[8px] text-white/30 uppercase font-mono">Orientar (Neutros)</span>
              <span className="absolute top-2 right-2 text-[8px] text-[#5dcaa5]/50 uppercase font-mono">Delegar (Aliados)</span>
              <span className="absolute bottom-2 left-2 text-[8px] text-red-400/50 uppercase font-mono">Direcionar (Bloq)</span>
              <span className="absolute bottom-2 right-2 text-[8px] text-[#fac775]/50 uppercase font-mono">Apoiar (Exec)</span>

              {/* Dots */}
              {team.map(t => (
                <div 
                  key={t.id}
                  className="absolute w-3 h-3 rounded-full bg-[#d4b87a] shadow-[0_0_10px_rgba(212,184,122,0.8)] -ml-1.5 -mt-1.5 cursor-pointer group"
                  style={{ left: \`\${50 + (t.influence/2)}%\`, top: \`\${50 - (t.impact/2)}%\` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 rounded bg-black/90 border border-white/10 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.name} ({t.type})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )

  const renderLideres = () => (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sub Nav Lideres */}
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
            className={\`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all \${
              lideresTab === t.id 
                ? 'bg-[#d4b87a] text-black shadow-[0_0_20px_rgba(212,184,122,0.3)]' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
            }\`}
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
              <p className="text-xs text-white/50 mb-6">Inicie a triagem orientada por IA baseada em HHS e Lencioni.</p>
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
                <div className="flex justify-between items-center text-[10px] text-white/60"><span>LinkedIn Import</span><span className="text-yellow-400">Pendente</span></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl min-h-[500px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-mono text-white/60 tracking-widest uppercase">Funil de Recrutamento (NASA OS)</h3>
                <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-white/40">{candidates.length} Ativos no Processo</span>
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
                          onClick={() => handleEvolveCandidate(c)}
                          className="mt-2 text-[9px] w-full py-1.5 rounded-lg bg-[#d4b87a]/10 text-[#d4b87a] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all"
                        >
                          {stage === 'onboarding' ? 'CONTRATAR' : 'AVANÇAR'}
                        </button>
                      </div>
                    ))}
                    {candidates.filter(c => c.stage === stage).length === 0 && (
                      <div className="text-center py-6 text-[10px] text-white/20 italic">Vazio</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {lideresTab === 'voce' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c0905] to-[#050505] border border-[#d4b87a]/20 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b87a]/5 blur-[80px] mix-blend-screen" />
            <h3 className="text-sm font-mono text-[#d4b87a] tracking-widest uppercase mb-2">O Equilíbrio do Líder</h3>
            <p className="text-xs text-white/50 mb-8 leading-relaxed max-w-md">Para liderar de verdade, você não pode apenas ser um Gestor Técnico. Você deve equilibrar Complexidade e Mudança.</p>
            
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-[#5dcaa5]">
                <h4 className="text-xs font-mono text-white/90 uppercase tracking-widest mb-1">GESTOR (Complexidade)</h4>
                <p className="text-[11px] text-white/60">Foca em previsibilidade, planilhas, controle de processo e alinhamento operacional.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-[#fac775]">
                <h4 className="text-xs font-mono text-white/90 uppercase tracking-widest mb-1">LÍDER (Mudança)</h4>
                <p className="text-[11px] text-white/60">Foca em propósito, cultura, inovação, resiliência da equipe e comunicação de valores.</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-[#d4b87a]/10 border border-[#d4b87a]/20 text-center cursor-pointer hover:bg-[#d4b87a]/20 transition-all">
              <span className="text-[10px] text-[#d4b87a] uppercase font-bold tracking-widest block mb-1">Deseja recalibrar seu perfil?</span>
              <span className="text-[9px] text-white/50">Clique para iniciar a trilha de Inteligência Emocional (IE).</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex-1 flex flex-col justify-center items-center text-center">
              <Compass className="w-12 h-12 text-white/10 mb-4" />
              <h4 className="text-sm text-white/80 font-medium mb-2">Microaulas de Liderança</h4>
              <p className="text-xs text-white/40 max-w-sm mb-6">Aprenda a liderar pessoas com base no modelo 6D (Janela de Johari, Sistema 1 e 2, Estilos Comportamentais).</p>
              <button className="px-6 py-2.5 rounded-full bg-white/10 text-white/60 text-xs hover:bg-white/20 transition-colors">Acessar Trilha de PDI</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderTime = () => (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-2 p-1.5 bg-[#080808]/80 border border-white/10 rounded-2xl w-fit">
        {[
          { id: 'pessoas', label: 'Pessoas (Equipe)' },
          { id: 'formar', label: 'Formar (Tuckman)' },
          { id: 'influencia', label: 'Influência' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTimeTab(t.id as any)}
            className={\`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all \${
              timeTab === t.id 
                ? 'bg-[#d4b87a] text-black shadow-[0_0_20px_rgba(212,184,122,0.3)]' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
            }\`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {timeTab === 'pessoas' && (
        <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl min-h-[400px]">
          <h3 className="text-xs font-mono text-[#d4b87a] tracking-widest uppercase mb-6">Sua Equipe Oficial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map(t => (
              <div key={t.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#d4b87a]/40 transition-all flex flex-col gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white/90">{t.name}</h4>
                  <span className="text-[10px] text-[#d4b87a]/70">{t.role}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/30 uppercase tracking-widest">Score 6D</span>
                    <span className="text-xs text-white/80">{t.d6}%</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] text-white/30 uppercase tracking-widest">Maturidade</span>
                    <span className="text-xs text-[#5dcaa5] font-bold">{t.maturity}</span>
                  </div>
                </div>
              </div>
            ))}
            {team.length === 0 && (
              <div className="col-span-3 py-12 text-center text-xs text-white/30 italic">Nenhum membro no time. Recrute líderes ou liderados na aba LÍDERES.</div>
            )}
          </div>
        </div>
      )}

      {timeTab === 'formar' && (
        <div className="p-8 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex flex-col items-center text-center">
          <Rocket className="w-12 h-12 text-[#fac775] mb-4" />
          <h3 className="text-base font-semibold text-white/90 mb-2">Dinâmica de Tuckman</h3>
          <p className="text-xs text-white/50 max-w-lg mb-8 leading-relaxed">Forming ➔ Storming ➔ Norming ➔ Performing.<br/>Sua equipe está estruturando o Contrato de Aliança para acelerar a fase de Normatização e evitar conflitos destrutivos.</p>
          <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
            <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-mono border-b border-white/5 pb-2">Contrato de Aliança Ativo</h4>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-white/70">1. Feedback direto e respeitoso sempre em ambiente privado.</div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-white/70">2. Conflito produtivo na reunião, unidade total na execução após a decisão.</div>
          </div>
        </div>
      )}
    </div>
  )

  const renderEmpresa = () => (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-12 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl text-center flex flex-col items-center">
        <Target className="w-12 h-12 text-white/10 mb-4" />
        <h3 className="text-base font-medium text-white/60 mb-2">Área Corporativa</h3>
        <p className="text-xs text-white/40 max-w-md">Estratégia, OKRs, BI e Relatórios estarão centralizados aqui para visão C-Level.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 font-sans selection:bg-[#d4b87a]/30">
      
      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl backdrop-blur-md bg-black/90 text-[#d4b87a] border border-[#d4b87a]/20 tracking-wide uppercase"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4b87a]/10 blur-[60px]" />
              <button onClick={() => setShowRecruitModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">✕</button>
              
              <h2 className="text-lg font-medium text-[#d4b87a] mb-2">Novo Candidato</h2>
              <p className="text-xs text-white/50 mb-8">Defina o perfil para a inteligência artificial calibrar a entrevista HHS/Lencioni.</p>

              <div className="space-y-5 relative z-10">
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-mono">Papel / Cargo</label>
                  <input 
                    value={recruitRole} onChange={e => setRecruitRole(e.target.value)}
                    placeholder="Ex: Desenvolvedor Senior, Head de Vendas..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#d4b87a]/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest block mb-3 font-mono">Nível de Atuação (Workflow Routing)</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'liderado', title: 'Liderado', desc: 'Membro do time. Foco: Fit + Colaboração (5 pergs)' },
                      { id: 'gestor', title: 'Gestor', desc: 'Gere processos. Foco: Mediação + Feedback (7 pergs)' },
                      { id: 'lider-gestor', title: 'Líder & Gestor', desc: 'Estratégico + Operacional (10 pergs)' },
                      { id: 'lider', title: 'Líder', desc: 'C-Level/Diretor. Foco: Visão + Coragem Ética (10 pergs)' }
                    ].map(r => (
                      <button
                        key={r.id}
                        onClick={() => setRecruitType(r.id as any)}
                        className={\`p-3 rounded-xl border flex flex-col items-start transition-all text-left \${
                          recruitType === r.id 
                            ? 'bg-[#d4b87a]/10 border-[#d4b87a] shadow-[0_0_15px_rgba(212,184,122,0.15)]' 
                            : 'bg-black/30 border-white/5 hover:border-white/20'
                        }\`}
                      >
                        <span className={\`text-xs font-semibold \${recruitType === r.id ? 'text-[#d4b87a]' : 'text-white/80'}\`}>{r.title}</span>
                        <span className="text-[10px] text-white/40 mt-1">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddCandidate}
                  disabled={!recruitRole}
                  className="w-full mt-6 bg-[#d4b87a] text-black font-semibold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:bg-[#e0c887] transition-colors disabled:opacity-50"
                >
                  Iniciar Triagem IA
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/30 mb-8 border-b border-white/5 pb-4">
          <span className="hover:text-white/70 cursor-pointer">SIG OS</span>
          <span>/</span>
          <span className="text-[#d4b87a]">{activeTab}</span>
        </div>

        {activeTab === 'home' && renderHome()}
        {activeTab === 'lideres' && renderLideres()}
        {activeTab === 'time' && renderTime()}
        {activeTab === 'empresa' && renderEmpresa()}
        
      </div>
    </div>
  )
}
`

fs.writeFileSync('components/business-syllabus/corporate/sig-pessoas-panel.tsx', content);
console.log('Done redesigning SIG PESSOAS');