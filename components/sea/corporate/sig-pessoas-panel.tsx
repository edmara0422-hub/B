'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckSquare, Square, ChevronDown, ChevronUp, UserCheck, BookOpen, AlertCircle, Play, Plus, Trash2 } from 'lucide-react'

type TabOption = 'home' | 'lideres' | 'time' | 'empresa'

type Candidate = {
  id: string
  name: string
  role: string
  score: string
  stage: 'triagem' | 'entrevista' | 'decisao' | 'onboarding' | 'efetivado'
  lencioniScore: number
}

type DiaryLog = {
  time: string
  text: string
}

export function SigPessoasPanel() {
  const [activeTab, setActiveTab] = useState<TabOption>('home')
  
  // State for Radar Dimensions
  const [selectedDims, setSelectedDims] = useState<string[]>(['D1', 'D2', 'D3', 'D4', 'D5', 'D6'])
  const [pulseRating, setPulseRating] = useState<number | null>(null)
  const [pulseFocus, setPulseFocus] = useState<number | null>(null)
  
  // State for Lencioni & HHS Candidates
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 'cand-a', name: 'Juliana Mendes', role: 'Fisioterapeuta Intensiva', score: 'HHS A / Lencioni 9.2', stage: 'triagem', lencioniScore: 92 },
    { id: 'cand-b', name: 'Rodrigo Silva', role: 'Coord. Reabilitação', score: 'HHS A- / Lencioni 8.8', stage: 'entrevista', lencioniScore: 88 },
    { id: 'cand-c', name: 'Camila Rossi', role: 'Fisioterapeuta UTI', score: 'HHS B+ / Lencioni 7.6', stage: 'decisao', lencioniScore: 76 }
  ])

  // State for CNV Linter
  const [cnvInput, setCnvInput] = useState('')
  const [cnvScore, setCnvScore] = useState<string | null>(null)
  const [cnvFeedback, setCnvFeedback] = useState<React.ReactNode | null>(null)
  const [cnvAnalyzing, setCnvAnalyzing] = useState(false)

  // State for PDI Diary
  const [diaryInput, setDiaryInput] = useState('')
  const [diaryLogs, setDiaryLogs] = useState<DiaryLog[]>([
    { time: '14:32', text: 'Conduzi feedback SBI com o supervisor. Alinhamos a expectativa sobre a calibração de alarmes.' }
  ])

  // State for Microaulas
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)

  // SBI State
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'ok' | 'warn'>('ok')

  function triggerToast(msg: string, type: 'ok' | 'warn' = 'ok') {
    setToastMsg(msg)
    setToastType(type)
    setTimeout(() => setToastMsg(null), 3000)
  }

  function handleSelectDimension(dim: string) {
    if (selectedDims.includes(dim)) {
      setSelectedDims(selectedDims.filter(d => d !== dim))
      triggerToast(`Filtro removido: ${dim}`)
    } else {
      setSelectedDims([...selectedDims, dim])
      triggerToast(`Filtro aplicado: ${dim}`)
    }
  }

  function handleResetRadar() {
    setSelectedDims(['D1', 'D2', 'D3', 'D4', 'D5', 'D6'])
    triggerToast('Radar resetado para escala completa.')
  }

  function handleCnvAnalyze() {
    if (!cnvInput.trim()) {
      triggerToast('Por favor, digite uma frase para análise CNV.', 'warn')
      return
    }
    setCnvAnalyzing(true)
    setCnvScore('Calculando...')
    setCnvFeedback(
      <div className="text-white/40 text-[10px] animate-pulse">
        Analisando julgamentos morais e construindo fatos...
      </div>
    )

    setTimeout(() => {
      setCnvAnalyzing(false)
      setCnvScore('Score Alpha: 64%')
      setCnvFeedback(
        <div className="space-y-2 mt-2">
          <span className="text-[9px] font-mono text-[#5dcaa5] block">✓ ANÁLISE CONCLUÍDA</span>
          <p className="text-[11px] leading-relaxed text-white/80">
            A frase contém <strong>julgamentos e generalizações</strong> (ex: "preguiçoso", "sempre"). Sugerimos a conversão para fatos objetivos mensuráveis:
          </p>
          <div className="bg-[#5dcaa5]/10 border border-[#5dcaa5]/20 rounded-[0.4rem] p-3 text-[11px] font-medium text-[#5dcaa5]">
            "O colaborador entregou as últimas 3 tarefas da sprint com um atraso de 2 dias em relação ao cronograma acordado."
          </div>
        </div>
      )
      triggerToast('Análise de Comunicação Não-Violenta concluída.')
    }, 1200)
  }

  function handleAddDiary() {
    if (!diaryInput.trim()) {
      triggerToast('Por favor, escreva algo para salvar no diário.', 'warn')
      return
    }
    const now = new Date()
    const hhmm = [now.getHours(), now.getMinutes()].map(x => String(x).padStart(2, '0')).join(':')
    setDiaryLogs([{ time: hhmm, text: diaryInput }, ...diaryLogs])
    setDiaryInput('')
    triggerToast('Entrada arquivada com sucesso no diário do PDI.')
  }

  return (
    <div className="relative space-y-4">
      {/* Toast Alert floating */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 px-4 py-2 rounded-lg text-xs font-medium shadow-2xl backdrop-blur-md border ${
              toastType === 'ok' 
                ? 'bg-black/90 text-[#d4b87a] border-[#d4b87a]/20' 
                : 'bg-red-950/90 text-red-400 border-red-900/30'
            }`}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.04] pb-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'home', label: 'Home', sub: 'panorama geral' },
            { id: 'lideres', label: 'Líderes / Gestores', sub: 'Liderança · Gerir' },
            { id: 'time', label: 'Time', sub: 'equipes · Formar' },
            { id: 'empresa', label: 'Empresa', sub: 'Estratégia · BI' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as TabOption)}
              className={`flex flex-col items-start px-4 py-2 rounded-[0.8rem] border transition ${
                activeTab === t.id 
                  ? 'bg-white/[0.04] border-[#d4b87a]/30 text-white' 
                  : 'bg-transparent border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-[11px] font-semibold">{t.label}</span>
              <span className="text-[7.5px] uppercase tracking-wider opacity-60 mt-0.5">{t.sub}</span>
            </button>
          ))}
        </div>
        <button 
          onClick={() => triggerToast('Professor de IA iniciando mentoria de liderança...', 'ok')}
          className="flex items-center gap-2 rounded-[0.7rem] bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-[9px] uppercase tracking-widest text-[#d4b87a] transition hover:bg-[#d4b87a]/10"
        >
          <Play className="h-2.5 w-2.5 fill-[#d4b87a]" /> Professor IA
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4"
          >
            {/* Visualização Cruzada 4D / 6D */}
            <div className="lg:col-span-7 ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">SIG · Telemetria 6D</span>
                  <h3 className="text-sm font-semibold text-white/90 mt-0.5">Visão Cruzada · Dimensões Organizacionais</h3>
                  <p className="text-[10px] text-white/40">Radar multidimensional com base em feedbacks ativos (n = 87)</p>
                </div>
                <button onClick={handleResetRadar} className="text-[8px] uppercase tracking-widest text-white/40 hover:text-white border border-white/[0.06] rounded-[0.4rem] px-2 py-1">
                  ⟲ Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* SVG Radar */}
                <div className="sm:col-span-5 flex justify-center relative">
                  <div className="w-[180px] h-[180px] relative">
                    <svg className="w-full h-full" viewBox="-200 -200 400 400">
                      <circle cx="0" cy="0" r="160" fill="none" stroke="rgba(212,184,122,0.06)" stroke-width="0.7" stroke-dasharray="4 6"/>
                      <circle cx="0" cy="0" r="110" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
                      
                      {/* Interactive Radar Lines */}
                      <g stroke="rgba(255,255,255,0.06)" stroke-width="0.5">
                        <line x1="0" y1="-140" x2="0" y2="140"/>
                        <line x1="-121" y1="0" x2="121" y2="0"/>
                        <line x1="-121" y1="-70" x2="121" y2="70"/>
                        <line x1="-121" y1="70" x2="121" y2="-70"/>
                      </g>

                      {/* Area radar path representation */}
                      <polygon 
                        points="0,-115 100,-48 80,55 0,98 -70,38 -85,-52" 
                        fill="rgba(212, 184, 122, 0.12)" 
                        stroke="#d4b87a" 
                        stroke-width="1.5"
                      />

                      {/* Vertex circles */}
                      {selectedDims.includes('D1') && <circle cx="0" cy="-115" r="4.5" fill="#fff" stroke="#d4b87a" stroke-width="1.5"/>}
                      {selectedDims.includes('D2') && <circle cx="100" cy="-48" r="4.5" fill="#fff" stroke="#d4b87a" stroke-width="1.5"/>}
                      {selectedDims.includes('D3') && <circle cx="80" cy="55" r="4.5" fill="#fff" stroke="#d4b87a" stroke-width="1.5"/>}
                      {selectedDims.includes('D4') && <circle cx="0" cy="98" r="4.5" fill="#fff" stroke="#d4b87a" stroke-width="1.5"/>}
                      {selectedDims.includes('D5') && <circle cx="-70" cy="38" r="4.5" fill="#fff" stroke="#d4b87a" stroke-width="1.5"/>}
                      {selectedDims.includes('D6') && <circle cx="-85" cy="-52" r="4.5" fill="#fff" stroke="#d4b87a" stroke-width="1.5"/>}

                      <g font-family="Poppins" font-size="14" font-weight="600" fill="#d4b87a">
                        <text x="0" y="-152" text-anchor="middle">D1</text>
                        <text x="142" y="-76" text-anchor="middle">D2</text>
                        <text x="138" y="85" text-anchor="middle">D3</text>
                        <text x="0" y="158" text-anchor="middle">D4</text>
                        <text x="-138" y="85" text-anchor="middle">D5</text>
                        <text x="-142" y="-76" text-anchor="middle">D6</text>
                      </g>
                    </svg>

                    {/* Overall OBI indicator in the center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-semibold text-white leading-none">76</span>
                      <span className="text-[6.5px] uppercase tracking-wider text-[#d4b87a] mt-1 font-mono">OBI Global</span>
                      <span className="text-[6.5px] text-[#5dcaa5] mt-0.5">▲ +3.2</span>
                    </div>
                  </div>
                </div>

                {/* Dimension Legend Checklist & Custom Selection */}
                <div className="sm:col-span-7 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { code: 'D1', label: 'Cultura', val: '82', color: '#5dcaa5' },
                      { code: 'D2', label: 'Liderança', val: '76', color: '#fac775' },
                      { code: 'D3', label: 'Confiança', val: '71', color: '#e24b4a' },
                      { code: 'D4', label: 'Entrega', val: '88', color: '#5dcaa5' },
                      { code: 'D5', label: 'Clareza', val: '64', color: '#fac775' },
                      { code: 'D6', label: 'Engajamento', val: '74', color: '#5dcaa5' }
                    ].map(dim => {
                      const active = selectedDims.includes(dim.code)
                      return (
                        <div 
                          key={dim.code}
                          onClick={() => handleSelectDimension(dim.code)}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[0.5rem] border transition cursor-pointer ${
                            active 
                              ? 'bg-white/[0.03] border-[#d4b87a]/15 text-white' 
                              : 'bg-transparent border-transparent opacity-35 text-white/50'
                          }`}
                        >
                          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dim.color }} />
                          <span className="text-[10px] font-mono font-semibold text-[#d4b87a]">{dim.code}</span>
                          <span className="text-[10px] truncate flex-1">{dim.label}</span>
                          <span className="text-[10px] font-mono font-bold">{dim.val}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Progressive Horizontal Bar */}
                  <div className="border-t border-white/[0.04] pt-3">
                    <div className="flex justify-between text-[9px] text-white/50">
                      <span>Saúde Geral OBI</span>
                      <span className="font-mono text-[#d4b87a]">76% / Excelente</span>
                    </div>
                    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden mt-1.5">
                      <div className="h-full bg-gradient-to-r from-[#d4b87a] to-[#fff] rounded-full" style={{ width: '76%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Funil Lencioni & HHS Candidates */}
            <div className="lg:col-span-5 ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">LENCIONI & HHS</span>
                    <h3 className="text-sm font-semibold text-white/90">Funil de Atração & Cultura</h3>
                  </div>
                  <span className="text-[8px] font-mono text-[#5dcaa5] px-2 py-0.5 rounded-[0.3rem] bg-[#5dcaa5]/10">IA Ativa</span>
                </div>
                
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {candidates.map(cand => (
                    <div key={cand.id} className="p-3 bg-black/20 border border-white/[0.03] rounded-[0.6rem] flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-white/90">{cand.name}</p>
                        <p className="text-[9px] text-white/40">{cand.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-[#d4b87a]">{cand.score}</p>
                        <span className="text-[8px] uppercase tracking-widest text-white/40 block mt-0.5">{cand.stage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/[0.04] pt-3 mt-4 flex items-center justify-between">
                <div className="text-[9px] text-white/40 leading-snug">
                  Taxa de aprovação cultural: <strong className="text-white/80 font-mono">28.4%</strong>
                  <span className="block text-[8px] text-[#5dcaa5]">3 triados · 2 aprovados</span>
                </div>
                <button 
                  onClick={() => triggerToast('Integração com Supabase Candidates carregando...', 'ok')}
                  className="rounded-[0.5rem] bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-[8.5px] uppercase tracking-wider text-white/80 transition hover:bg-white/[0.08]"
                >
                  Novo Candidato
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'lideres' && (
          <motion.div
            key="lideres"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4"
          >
            {/* CNV Text Linter Analysis */}
            <div className="lg:col-span-6 ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">LIDERANÇA INTELIGENTE</span>
                    <h3 className="text-sm font-semibold text-white/90">Alpha-Linter: Comunicar Sem Julgamentos</h3>
                    <p className="text-[9.5px] text-white/40">Garante a aplicação prática da Comunicação Não-Violenta (CNV)</p>
                  </div>
                  {cnvScore && (
                    <span className="text-[10px] font-mono text-[#5dcaa5] font-semibold">{cnvScore}</span>
                  )}
                </div>

                <textarea
                  value={cnvInput}
                  onChange={(e) => setCnvInput(e.target.value)}
                  placeholder="Ex: O fisioterapeuta é desleixado e vive atrasando a passagem de plantão na UTI."
                  className="w-full h-[85px] bg-black/40 border border-white/[0.08] rounded-[0.6rem] p-3 text-[11px] outline-none text-white placeholder:text-white/20 resize-none focus:border-[#d4b87a]/45 transition"
                />

                {cnvFeedback && (
                  <div className="p-3 bg-black/35 border border-white/[0.04] rounded-[0.6rem]">
                    {cnvFeedback}
                  </div>
                )}
              </div>

              <button
                onClick={handleCnvAnalyze}
                disabled={cnvAnalyzing}
                className="w-full bg-[#d4b87a]/15 hover:bg-[#d4b87a]/25 border border-[#d4b87a]/30 py-2 rounded-[0.6rem] text-[10px] font-mono uppercase tracking-widest text-[#d4b87a] transition disabled:opacity-50"
              >
                {cnvAnalyzing ? 'Analisando Estruturas...' : 'Calcular Índice Alpha CNV'}
              </button>
            </div>

            {/* PDI IE Diary Tracker */}
            <div className="lg:col-span-6 ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">DESENVOLVIMENTO DE PESSOAS</span>
                  <h3 className="text-sm font-semibold text-white/90">Diário PDI & Auto-Registo de Inteligência</h3>
                  <p className="text-[9.5px] text-white/40">Fase 1 do PDI: Mapeamento de gatilhos emocionais da liderança</p>
                </div>

                <div className="flex gap-2">
                  <input
                    value={diaryInput}
                    onChange={(e) => setDiaryInput(e.target.value)}
                    placeholder="Situação geradora de emoção intensa..."
                    className="flex-1 bg-black/40 border border-white/[0.08] rounded-[0.6rem] px-3 py-2 text-[11px] outline-none text-white focus:border-[#d4b87a]/45 transition"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddDiary()}
                  />
                  <button 
                    onClick={handleAddDiary}
                    className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-3.5 rounded-[0.6rem] text-[10px] font-medium text-white transition flex items-center justify-center"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-2 max-h-[110px] overflow-y-auto pr-1">
                  {diaryLogs.map((log, idx) => (
                    <div key={idx} className="p-2.5 bg-white/[0.01] border border-white/[0.03] rounded-[0.5rem] relative">
                      <span className="text-[7.5px] font-mono text-[#d4b87a] block">{log.time} · AUTO-REGISTRO</span>
                      <p className="text-[10px] text-white/70 leading-relaxed mt-0.5">{log.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collapsible Microaulas */}
              <div className="border-t border-white/[0.04] pt-3">
                <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 block mb-2">Microaulas Disponíveis</span>
                <div className="space-y-1">
                  {[
                    { id: 'm1', title: 'Microaula 1: O segredo da CNV à beira do leito', dur: '4 min' },
                    { id: 'm2', title: 'Microaula 2: Modelo SBI de Feedback rápido', dur: '5 min' }
                  ].map(lesson => {
                    const expanded = expandedLesson === lesson.id
                    return (
                      <div key={lesson.id} className="border border-white/[0.03] rounded-[0.5rem] overflow-hidden">
                        <div 
                          onClick={() => setExpandedLesson(expanded ? null : lesson.id)}
                          className="flex items-center justify-between p-2 bg-white/[0.01] hover:bg-white/[0.03] cursor-pointer transition"
                        >
                          <span className="text-[9.5px] font-medium text-white/80">{lesson.title}</span>
                          <span className="text-[8px] font-mono text-[#d4b87a]">{lesson.dur}</span>
                        </div>
                        {expanded && (
                          <div className="p-2.5 bg-black/40 border-t border-white/[0.02] text-[9.5px] leading-relaxed text-white/50 space-y-1">
                            <p>Esta aula foca na remoção de <strong>ruídos de julgamento</strong> na passagem de plantão, aplicando o linter Alpha de CNV para manter foco estrito nos fatos clínicos.</p>
                            <button 
                              onClick={() => triggerToast(`Tocando vídeo ${lesson.title}...`, 'ok')}
                              className="text-[8px] uppercase tracking-widest text-[#d4b87a] font-mono font-bold block mt-1 hover:underline"
                            >
                              ▶ Iniciar Player
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'time' && (
          <motion.div
            key="time"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] space-y-4"
          >
            <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">OPERAÇÕES DE PESSOAS</span>
                <h3 className="text-sm font-semibold text-white/90">Checklist & Governança Relacional do Time</h3>
                <p className="text-[10px] text-white/40">Auditoria ativa e calibração periódica baseada nos níveis de Tuckman</p>
              </div>
              <span className="text-[8.5px] font-mono text-[#fac775] px-2 py-0.5 rounded-[0.3rem] bg-[#fac775]/10">Fase 2 (Normatização)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-[10.5px] font-semibold text-white/80">Checklist de Competências de UTI</h4>
                {[
                  'Cultura de Calibração diária de parâmetros de VM ativa',
                  'Passagem de plantão estruturada utilizando métricas objetivas',
                  'Auditoria ativa e conformidade regulatória',
                  'Feedback SBI trimestral realizado com 100% dos liderados'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] text-white/60">
                    <CheckSquare className="h-3.5 w-3.5 text-[#d4b87a] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-[10.5px] font-semibold text-white/80">Estágio de Tuckman & Resoluções</h4>
                {[
                  'Forming: Alinhamento de objetivos principais do cockpit',
                  'Storming: Mediação de conflito produtivo utilizando Alpha linter',
                  'Norming: Sincronização automatizada de métricas e analytics',
                  'Performing: Escala operacional com autonomia calibrada'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] text-white/60">
                    {idx < 3 ? (
                      <CheckSquare className="h-3.5 w-3.5 text-[#d4b87a] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="h-3.5 w-3.5 text-white/20 shrink-0 mt-0.5" />
                    )}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'empresa' && (
          <motion.div
            key="empresa"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] space-y-4"
          >
            <div>
              <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">ANALYTICS CORPORATIVO</span>
              <h3 className="text-sm font-semibold text-white/90">Sumário BI & Governança Corporativa</h3>
              <p className="text-[10px] text-white/40">Informações e métricas integradas para consolidação executiva</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { title: 'Índice de Retenção', val: '86.4%', desc: '7 dias ativo' },
                { title: 'NPS Global', val: '+42', desc: '48 respostas ativas' },
                { title: 'Score de Confiança', val: '7.1/10', desc: 'Zona de Calibração' },
                { title: 'Audit Rate', val: '94.8%', desc: 'Tier II consolidado' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-black/25 border border-white/[0.03] rounded-[0.8rem] space-y-1">
                  <span className="text-[8px] uppercase tracking-wider text-white/40 block">{item.title}</span>
                  <span className="text-lg font-mono font-bold text-[#d4b87a]">{item.val}</span>
                  <span className="text-[8px] text-[#5dcaa5] block">{item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
