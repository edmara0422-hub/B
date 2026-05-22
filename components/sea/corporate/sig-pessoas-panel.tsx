'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, CheckSquare, Square, ChevronDown, ChevronUp, UserCheck, 
  BookOpen, AlertCircle, Play, Plus, Trash2, Activity, ShieldAlert, 
  FileText, Users, Award, Compass, Cpu, Zap, BarChart3, Search, Undo2 
} from 'lucide-react'

type TabOption = 'home' | 'lideres' | 'time' | 'empresa'
type LideresSubTab = 'recrutar' | 'gerir' | 'lideranca' | 'delegar' | 'significado'
type TimeSubTab = 'formar' | 'pessoas' | 'influencia'
type EmpresaSubTab = 'estrategia' | 'bi' | 'relatorio' | 'canais'

type Candidate = {
  id: string
  name: string
  role: string
  score: string
  stage: 'triagem' | 'entrevista' | 'decisao' | 'onboarding' | 'efetivado'
  lencioniScore: number
  stats: { hum: number; fom: number; int: number }
}

type TeamMember = {
  id: string
  name: string
  role: string
  d6: number
  hhh: { smart: number; humble: number; hungry: number }
  influence: number // x position in -150 to 150
  impact: number    // y position in -100 to 100
  maturity: 'M1' | 'M2' | 'M3' | 'M4'
  status: 'Excelente' | 'Alinhado' | 'Atenção'
  successionScore: number
  wishes: string
}

type DiaryLog = {
  time: string
  text: string
}

type SbiLog = {
  situation: string
  behavior: string
  impact: string
  date: string
}

type DelegatedTask = {
  id: string
  title: string
  assignee: string
  maturity: string
  status: 'pendente' | 'calibrado' | 'concluido'
}

type OkrItem = {
  id: string
  title: string
  keyResults: string
  progress: number
}

export function SigPessoasPanel() {
  const [activeTab, setActiveTab] = useState<TabOption>('home')
  const [lideresTab, setLideresTab] = useState<LideresSubTab>('recrutar')
  const [timeTab, setTimeTab] = useState<TimeSubTab>('formar')
  const [empresaTab, setEmpresaTab] = useState<EmpresaSubTab>('estrategia')

  // Global Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'ok' | 'warn'>('ok')

  function triggerToast(msg: string, type: 'ok' | 'warn' = 'ok') {
    setToastMsg(msg)
    setToastType(type)
    setTimeout(() => setToastMsg(null), 3000)
  }

  // --- STATE FOR CANDIDATES ---
  const defaultCandidates: Candidate[] = [
    { id: 'cand-a', name: 'Ana Beatriz', role: 'Head de Growth', score: 'HHS A / Lencioni 9.2', stage: 'triagem', lencioniScore: 92, stats: { hum: 85, fom: 92, int: 93 } },
    { id: 'cand-b', name: 'Bruno Melo', role: 'Tech Lead', score: 'HHS A- / Lencioni 8.8', stage: 'entrevista', lencioniScore: 88, stats: { hum: 90, fom: 80, int: 76 } },
    { id: 'cand-be', name: 'Beatriz Esteves', role: 'Líder de Design', score: 'HHS B+ / Lencioni 7.6', stage: 'decisao', lencioniScore: 76, stats: { hum: 82, fom: 89, int: 93 } }
  ]
  const [candidates, setCandidates] = useState<Candidate[]>(defaultCandidates)

  // --- STATE FOR TEAM MEMBERS ---
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 'm-1', name: 'Rodrigo Silva', role: 'Coord. Reabilitação', d6: 82, hhh: { smart: 85, humble: 80, hungry: 88 }, influence: 80, impact: 60, maturity: 'M3', status: 'Excelente', successionScore: 84, wishes: 'Evoluir para Head Estratégico' },
    { id: 'm-2', name: 'Juliana Mendes', role: 'Fisioterapeuta Intensiva', d6: 74, hhh: { smart: 78, humble: 92, hungry: 70 }, influence: -60, impact: 40, maturity: 'M2', status: 'Alinhado', successionScore: 78, wishes: 'Especialização em Neuro' },
    { id: 'm-3', name: 'Lucas Alencar', role: 'Supervisor de Enfermagem', d6: 45, hhh: { smart: 62, humble: 55, hungry: 50 }, influence: -40, impact: -60, maturity: 'M1', status: 'Atenção', successionScore: 48, wishes: 'Calibração de Processos' }
  ])

  // --- STATE FOR RADAR DIMENSIONS ---
  const [selectedDims, setSelectedDims] = useState<string[]>(['D1', 'D2', 'D3', 'D4', 'D5', 'D6'])
  const dimensionsInfo = [
    { code: 'D1', label: 'Cultura', val: '82', color: '#5dcaa5' },
    { code: 'D2', label: 'Liderança', val: '76', color: '#fac775' },
    { code: 'D3', label: 'Confiança', val: '71', color: '#e24b4a' },
    { code: 'D4', label: 'Entrega', val: '88', color: '#5dcaa5' },
    { code: 'D5', label: 'Clareza', val: '64', color: '#fac775' },
    { code: 'D6', label: 'Engajamento', val: '74', color: '#5dcaa5' }
  ]

  // --- STATE FOR MAP TEAM INTERACTION ---
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null)

  // --- STATE FOR MANIFESTO PRINCIPLES ---
  const [manifestoChecks, setManifestoChecks] = useState<boolean[]>([true, false, true, false, false])
  const manifestoPrinciples = [
    { code: 'P01', text: 'Autoconhecimento radical como base de liderança' },
    { code: 'P02', text: 'Conflito produtivo antes do consenso vazio' },
    { code: 'P03', text: 'Delegação com clareza, não com abandono' },
    { code: 'P04', text: 'Feedback estruturado como ritual, não reação' },
    { code: 'P05', text: 'Estratégia com significado, não só com metas' }
  ]

  // --- STATE FOR PRIMEIROS PASSOS ---
  const [passosChecks, setPassosChecks] = useState<boolean[]>([false, false, false, false, false])
  const primeirosPassos = [
    { id: 1, title: 'Escreva a primeira entrada do Diário IE', desc: 'Autoconhecimento é a Fase 1 do PDI' },
    { id: 2, title: 'Adicione o primeiro liderado ao time', desc: 'Sem time, as Fases 3 e 4 ficam zeradas' },
    { id: 3, title: 'Registre um SBI de reconhecimento', desc: 'Razão saudável: 2 feedbacks positivos para cada 1 de calibração' },
    { id: 4, title: 'Defina o primeiro OKR trimestral', desc: 'Sem direção, o time gira em torno de tarefas' },
    { id: 5, title: 'Configure o Contrato de Aliança do time', desc: 'Normas explícitas reduzem conflitos em 40%' }
  ]

  // --- STATE FOR PULSO SEMANAL ---
  const [pulseEnergy, setPulseEnergy] = useState<number | null>(null)
  const [pulseFocus, setPulseFocus] = useState<number | null>(null)
  const [pulseBlocker, setPulseBlocker] = useState('')

  // --- STATE FOR ROLE SPECIFIC PROFILE ---
  const [selectedProfileId, setSelectedProfileId] = useState<string>('m-1')

  // --- STATE FOR CNV LINTER ---
  const [cnvInput, setCnvInput] = useState('')
  const [cnvScore, setCnvScore] = useState<string | null>(null)
  const [cnvFeedback, setCnvFeedback] = useState<React.ReactNode | null>(null)
  const [cnvAnalyzing, setCnvAnalyzing] = useState(false)

  // --- STATE FOR DIARY IE ---
  const [diaryInput, setDiaryInput] = useState('')
  const [diaryLogs, setDiaryLogs] = useState<DiaryLog[]>([
    { time: '14:32', text: 'Conduzi feedback SBI com o supervisor. Alinhamos a expectativa sobre a calibração de alarmes da UTI.' },
    { time: '09:15', text: 'Senti irritação na passagem de plantão por falta de dados objetivos. Pratiquei respiração quadrada e redirecionei focando em fatos.' }
  ])

  // --- STATE FOR MICROAULAS ---
  const [microaulasProgress, setMicroaulasProgress] = useState<boolean[]>([false, false, false, false, false])
  const lessons = [
    { id: 'Johari', title: 'Janela de Johari', body: 'Luft & Ingham. O que você e os outros sabem sobre você. Foco em reduzir sua área cega pedindo feedback ativo toda semana.' },
    { id: 'Kahneman', title: 'Sistema 1 e Sistema 2', body: 'Daniel Kahneman. Sob estresse, seu cérebro reage pelo Sistema 1 (emocional/rápido). Lidere ativando o Sistema 2 (racional/analítico).' },
    { id: 'Goleman', title: 'Gatilhos Emocionais', body: 'Daniel Goleman. Mapeie as 3 palavras ou situações que fazem você perder a calma operacional. Domine-as antes que elas dominem seu time.' },
    { id: 'Marston', title: 'Estilo Dominante (DISC)', body: 'William Marston. Seu perfil natural impacta a equipe antes mesmo da sua fala. Lembre-se: flexibilidade comportamental é virtude de líder.' },
    { id: 'Collins', title: 'Valores Não-Negociáveis', body: 'Jim Collins. O que você defende mesmo quando custa caro ou gera conflito. Defina e comunique os seus limites éticos inegociáveis.' }
  ]
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)

  // --- STATE FOR COACH SBI ---
  const [sbiSit, setSbiSit] = useState('')
  const [sbiComp, setSbiComp] = useState('')
  const [sbiImp, setSbiImp] = useState('')
  const [sbiLogs, setSbiLogs] = useState<SbiLog[]>([
    { situation: 'Na reunião de OKRs de terça às 14h', behavior: 'Você me interrompeu 3 vezes com palpites não-fundamentados', impact: 'Isso gerou ruído na equipe e alongou a definição da meta em 25 minutos.', date: '22/05/2026' }
  ])

  // --- STATE FOR DELEGATED TASKS ---
  const [delegatedTasks, setDelegatedTasks] = useState<DelegatedTask[]>([
    { id: 'task-1', title: 'Mapeamento de desmame ventilatório no leito', assignee: 'Juliana Mendes', maturity: 'M2', status: 'calibrado' },
    { id: 'task-2', title: 'Calibração do sensor de fluxo bioneural', assignee: 'Rodrigo Silva', maturity: 'M3', status: 'concluido' }
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskAssignee, setNewTaskAssignee] = useState('Juliana Mendes')
  const [newTaskMaturity, setNewTaskMaturity] = useState('M3')

  // --- STATE FOR ROI DELEGATION CALCULATOR ---
  const [salary, setSalary] = useState(15000)
  const [operHours, setOperHours] = useState(10)
  const [delegationMaturity, setDelegationMaturity] = useState<'M1' | 'M2' | 'M3' | 'M4'>('M3')

  // --- STATE FOR TUCKMAN ---
  const [tuckmanStage, setTuckmanStage] = useState<'forming' | 'storming' | 'norming' | 'performing'>('forming')

  // --- STATE FOR ALLIANCE CONTRACT ---
  const [allianceClauses, setAllianceClauses] = useState<string[]>([
    'Feedback direto, respeitoso e imediato à beira do leito.',
    'Comprometimento absoluto com o combinado na sprint de calibração.',
    'Presença e escuta ativa nas reuniões estratégicas do time.'
  ])
  const [newClauseInput, setNewClauseInput] = useState('')

  // --- STATE FOR PROTOCOLO DE MEDIAÇÃO ---
  const [conflictDesc, setConflictDesc] = useState('')
  const [mediationResult, setMediationResult] = useState<string | null>(null)
  const [mediationAnalyzing, setMediationAnalyzing] = useState(false)

  // --- STATE FOR OKRS ---
  const [okrs, setOkrs] = useState<OkrItem[]>([
    { id: 'okr-1', title: 'Reduzir latência de calibração bioneural para < 4min', keyResults: 'KR1: Zero incidentes críticos, KR2: Calibração em 100% dos leitos', progress: 68 },
    { id: 'okr-2', title: 'Atingir eNPS Geral do Time > +70', keyResults: 'KR1: 100% de rituais 1:1 executados, KR2: Plano de PDI ativo', progress: 40 }
  ])
  const [newOkrTitle, setNewOkrTitle] = useState('')
  const [newOkrKr, setNewOkrKr] = useState('')

  // --- STATE FOR CLIMATE ROI ---
  const [climateSalary, setClimateSalary] = useState(8000)
  const [climateLatency, setClimateLatency] = useState(30)
  const [climateRework, setClimateRework] = useState(25)
  const [climateTurnover, setClimateTurnover] = useState(15)

  // --- STATE FOR SYNC NOISE CALCULATOR ---
  const [msgComplexity, setMsgComplexity] = useState<1 | 2 | 3>(3)
  const [channelUsed, setChannelUsed] = useState<string>('11')

  // --- INTERACTIVE ACTIONS ---

  // Candidate interactions
  function handleDeleteCandidate(id: string) {
    setCandidates(candidates.filter(c => c.id !== id))
    triggerToast('Candidato removido do funil.', 'ok')
  }

  function handleResetCandidates() {
    setCandidates(defaultCandidates)
    triggerToast('Exemplos de candidatos restaurados.', 'ok')
  }

  function handleTriggerOnboard(c: Candidate) {
    if (c.stage === 'triagem') {
      setCandidates(candidates.map(x => x.id === c.id ? { ...x, stage: 'entrevista' } : x))
      triggerToast(`${c.name} movido para Entrevista.`, 'ok')
    } else if (c.stage === 'entrevista') {
      setCandidates(candidates.map(x => x.id === c.id ? { ...x, stage: 'decisao' } : x))
      triggerToast(`${c.name} movido para Decisão.`, 'ok')
    } else if (c.stage === 'decisao') {
      setCandidates(candidates.map(x => x.id === c.id ? { ...x, stage: 'onboarding' } : x))
      triggerToast(`${c.name} movido para Onboarding.`, 'ok')
    } else if (c.stage === 'onboarding') {
      // Hire the candidate!
      setCandidates(candidates.map(x => x.id === c.id ? { ...x, stage: 'efetivado' } : x))
      
      const newMember: TeamMember = {
        id: `m-${Date.now()}`,
        name: c.name,
        role: c.role,
        d6: c.lencioniScore,
        hhh: { smart: c.stats.int, humble: c.stats.hum, hungry: c.stats.fom },
        influence: Math.floor(Math.random() * 200) - 100,
        impact: Math.floor(Math.random() * 140) - 70,
        maturity: 'M2',
        status: c.lencioniScore >= 85 ? 'Excelente' : 'Alinhado',
        successionScore: Math.floor(c.lencioniScore * 0.95),
        wishes: 'Plano de Integração Inicial'
      }

      setTeamMembers([...teamMembers, newMember])
      triggerToast(`✓ CONTRATADO! ${c.name} agora é membro oficial do time!`, 'ok')
    } else {
      triggerToast('Este candidato já faz parte da equipe!', 'ok')
    }
  }

  // Dimension / Radar interactions
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

  // Manifesto principle check
  function handleToggleManifesto(index: number) {
    const next = [...manifestoChecks]
    next[index] = !next[index]
    setManifestoChecks(next)
    triggerToast(`Princípio P0${index + 1} calibração: ${next[index] ? '✓ Ativo' : '✕ Desativado'}`)
  }

  const manifestoScoreVal = Math.round((manifestoChecks.filter(Boolean).length / manifestoChecks.length) * 100)

  // Primeiros passos interactions
  function handleTogglePassos(index: number) {
    const next = [...passosChecks]
    next[index] = !next[index]
    setPassosChecks(next)
  }

  function handlePopularPassosExemplo() {
    setPassosChecks([true, true, true, true, true])
    setPulseEnergy(5)
    setPulseFocus(5)
    setPulseBlocker('Nenhum bloqueador ativo esta semana. Alta performance operacional.')
    triggerToast('Primeiros passos populados com dados de alta performance!')
  }

  // Pulso semanal save
  function handleSavePulso() {
    if (pulseEnergy === null || pulseFocus === null) {
      triggerToast('Por favor, informe a nota de Energia e Foco antes de salvar.', 'warn')
      return
    }
    triggerToast('✓ Pulso Semanal arquivado e sincronizado com o dashboard executivo.', 'ok')
  }

  // Scatter plot add member
  function handleAddTeamMemberMap() {
    const name = prompt('Nome do colaborador:')
    if (!name) return
    const role = prompt('Papel (ex: Supervisor):') || 'Analista'
    const x = parseInt(prompt('Influência (-150 a 150):') || '0', 10)
    const y = parseInt(prompt('Impacto (-100 a 100):') || '0', 10)

    const newM: TeamMember = {
      id: `m-${Date.now()}`,
      name,
      role,
      d6: 75,
      hhh: { smart: 80, humble: 70, hungry: 75 },
      influence: x,
      impact: y,
      maturity: 'M3',
      status: 'Alinhado',
      successionScore: 76,
      wishes: 'Consolidar papel atual'
    }
    setTeamMembers([...teamMembers, newM])
    triggerToast(`✓ Colaborador ${name} adicionado no mapa!`)
  }

  // Alpha CNV analyze
  function handleCnvAnalyze() {
    if (!cnvInput.trim()) {
      triggerToast('Por favor, digite uma frase para análise CNV.', 'warn')
      return
    }
    setCnvAnalyzing(true)
    setCnvScore('Analisando...')
    setCnvFeedback(<div className="text-white/40 text-[10px] animate-pulse">Limpando julgamentos morais...</div>)

    setTimeout(() => {
      setCnvAnalyzing(false)
      setCnvScore('Score Alpha: 64%')
      setCnvFeedback(
        <div className="space-y-2 mt-2">
          <span className="text-[9px] font-mono text-[#5dcaa5] block">✓ ANÁLISE CONCLUÍDA</span>
          <p className="text-[11px] leading-relaxed text-white/80">
            A frase contém <strong>julgamentos de moralidade</strong> ("desleixado", "preguiçoso") e <strong>generalizações temporais</strong> ("sempre", "vive"). Sugerimos a conversão para fatos objetivos mensuráveis:
          </p>
          <div className="bg-[#5dcaa5]/10 border border-[#5dcaa5]/20 rounded-[0.5rem] p-3 text-[11px] font-medium text-[#5dcaa5]">
            "O colaborador entregou as últimas 3 passagens de plantão com um atraso de 15 minutos em relação ao horário regulamentar e com 2 campos de anamnese em branco."
          </div>
        </div>
      )
      triggerToast('Análise de Comunicação Não-Violenta concluída.')
    }, 1200)
  }

  // Diary add
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

  // Microaulas checklist
  function handleToggleLessonCheck(idx: number) {
    const next = [...microaulasProgress]
    next[idx] = !next[idx]
    setMicroaulasProgress(next)
    triggerToast(`Módulo ${idx + 1} concluído: ${next[idx] ? '✓ Sim' : '✕ Não'}`)
  }

  const lessonsCompletedPercent = Math.round((microaulasProgress.filter(Boolean).length / lessons.length) * 100)

  // Coach SBI save
  function handleAddSbi() {
    if (!sbiSit || !sbiComp || !sbiImp) {
      triggerToast('Por favor, preencha a Situação, o Comportamento e o Impacto.', 'warn')
      return
    }
    const log: SbiLog = {
      situation: sbiSit,
      behavior: sbiComp,
      impact: sbiImp,
      date: new Date().toLocaleDateString('pt-BR')
    }
    setSbiLogs([log, ...sbiLogs])
    setSbiSit('')
    setSbiComp('')
    setSbiImp('')
    triggerToast('Feedback SBI registrado com sucesso no perfil do colaborador.')
  }

  // Opportunity Calculator calculations
  const costPerHour = Math.round((salary / 160))
  let opportunityRoi = 0
  let burnoutRisk = 'BAIXO'

  if (delegationMaturity === 'M1') {
    opportunityRoi = costPerHour * operHours * 0.2 * 4.3 // 20% efficiency
    burnoutRisk = 'CRÍTICO'
  } else if (delegationMaturity === 'M2') {
    opportunityRoi = costPerHour * operHours * 0.5 * 4.3 // 50% efficiency
    burnoutRisk = 'ALTO'
  } else if (delegationMaturity === 'M3') {
    opportunityRoi = costPerHour * operHours * 0.85 * 4.3 // 85% efficiency
    burnoutRisk = 'MÉDIO'
  } else {
    opportunityRoi = costPerHour * operHours * 1.0 * 4.3 // 100% efficiency
    burnoutRisk = 'MÍNIMO'
  }

  const annualRoi = Math.round(opportunityRoi * 12)

  // Add Delegated task
  function handleAddDelegatedTask() {
    if (!newTaskTitle.trim()) {
      triggerToast('Por favor, defina o título da tarefa delegada.', 'warn')
      return
    }
    const task: DelegatedTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      assignee: newTaskAssignee,
      maturity: newTaskMaturity,
      status: 'pendente'
    }
    setDelegatedTasks([...delegatedTasks, task])
    setNewTaskTitle('')
    triggerToast(`✓ Tarefa delegada com sucesso para ${newTaskAssignee}.`)
  }

  function handleToggleTaskStatus(id: string) {
    setDelegatedTasks(delegatedTasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'pendente' ? 'calibrado' : t.status === 'calibrado' ? 'concluido' : 'pendente'
        return { ...t, status: nextStatus }
      }
      return t
    }))
  }

  // Tuckman calculation
  // Potential = Sum(Team D6) * TuckmanMultiplier - LatencyGargalo
  let tuckmanMult = 1.0
  if (tuckmanStage === 'forming') tuckmanMult = 0.6
  if (tuckmanStage === 'storming') tuckmanMult = 0.4
  if (tuckmanStage === 'norming') tuckmanMult = 0.95
  if (tuckmanStage === 'performing') tuckmanMult = 1.45

  const sumD6 = teamMembers.reduce((sum, m) => sum + m.d6, 0)
  const calculatedPotential = Math.round((sumD6 / teamMembers.length) * tuckmanMult)

  // HHH calculations
  const avgHead = Math.round(teamMembers.reduce((sum, m) => sum + m.hhh.smart, 0) / teamMembers.length)
  const avgHeart = Math.round(teamMembers.reduce((sum, m) => sum + m.hhh.humble, 0) / teamMembers.length)
  const avgHands = Math.round(teamMembers.reduce((sum, m) => sum + m.hhh.hungry, 0) / teamMembers.length)

  // Alliance contract addition / removal
  function handleAddAllianceClause() {
    if (!newClauseInput.trim()) return
    setAllianceClauses([...allianceClauses, newClauseInput.trim()])
    setNewClauseInput('')
    triggerToast('Cláusula adicionada ao contrato do time.')
  }

  function handleRemoveAllianceClause(idx: number) {
    setAllianceClauses(allianceClauses.filter((_, i) => i !== idx))
    triggerToast('Cláusula removida.')
  }

  function handleGenerateAllianceContract() {
    const aiClauses = [
      'Alinhamento assíncrono de telemetria duas vezes ao dia para cortar microgerenciamento.',
      'Calibração de alarmes respeitando o canal silencioso nas passagens de sprint.',
      'Sincronia física obrigatória apenas em revisões trimestrais de PDI e eNPS.'
    ]
    setAllianceClauses([...allianceClauses, ...aiClauses])
    triggerToast('✓ Cláusulas geradas via IA integradas ao contrato.')
  }

  // Protocolo de mediação
  function handleMediationAnalysis() {
    if (!conflictDesc.trim()) {
      triggerToast('Descreva o conflito para a análise com a IA.', 'warn')
      return
    }
    setMediationAnalyzing(true)
    setMediationResult(null)

    setTimeout(() => {
      setMediationAnalyzing(false)
      setMediationResult(
        `✓ DIAGNÓSTICO DE CONFLITO ALX (TUCKMAN & ROSENBERG)\n` +
        `-----------------------------------------------\n` +
        `Estágio Estimado: Storming (Conflito de Normatização)\n` +
        `Thomas-Kilmann Recomendado: Colaborativo (Integrativo)\n\n` +
        `Recomendação Prática de Passos:\n` +
        `1. Provoque um check-in de fatos (remova adjetivos de ataque).\n` +
        `2. Redefina a fronteira do Contrato de Aliança sobre quem assina a decisão.\n` +
        `3. Execute uma sessão 1:1 estruturada aplicando o linter Alpha de CNV Rosenberg.`
      )
      triggerToast('Análise de mediação concluída!')
    }, 1500)
  }

  // OKR add
  function handleAddOkr() {
    if (!newOkrTitle.trim()) return
    const log: OkrItem = {
      id: `okr-${Date.now()}`,
      title: newOkrTitle,
      keyResults: newOkrKr || 'Meta observável',
      progress: 0
    }
    setOkrs([...okrs, log])
    setNewOkrTitle('')
    setNewOkrKr('')
    triggerToast('OKR estratégico cadastrado com sucesso.')
  }

  // Climate ROI calculations
  // Hidden Cost = climateSalary * (climateLatency/100 + climateRework/100) * teamSize + turnoverCost
  const climateHiddenCost = Math.round(
    climateSalary * (climateLatency / 100 + climateRework / 100) * teamMembers.length +
    (climateTurnover / 100) * climateSalary * 4 * teamMembers.length
  )

  // Channels Noise Calculations
  let noiseScore = 0
  let channelFeedback = 'Canal adequado'
  
  const complexityWeight = msgComplexity // 1, 2, or 3
  let channelSyncWeight = 1.0 // Sincronia do canal

  if (channelUsed === 'slack') channelSyncWeight = 2.5
  if (channelUsed === 'email') channelSyncWeight = 3.0
  if (channelUsed === 'doc') channelSyncWeight = 2.0
  if (channelUsed === '11') channelSyncWeight = 0.5
  if (channelUsed === 'video') channelSyncWeight = 0.8
  if (channelUsed === 'presencial') channelSyncWeight = 0.4
  if (channelUsed === 'townhall') channelSyncWeight = 1.5

  noiseScore = Math.round((complexityWeight * channelSyncWeight) * 20)
  if (noiseScore > 100) noiseScore = 100

  if (noiseScore > 75) {
    channelFeedback = '⚠️ Alto Risco de Ruído! Use canal síncrono face-to-face.'
  } else if (noiseScore > 45) {
    channelFeedback = '⚡ Atenção: Recomenda-se canal síncrono ou doc sutil.'
  } else {
    channelFeedback = '✓ Canal altamente adequado para a complexidade.'
  }

  // Succession algorithm ranking
  const rankedSuccessors = [...teamMembers].sort((a, b) => b.successionScore - a.successionScore)

  return (
    <div className="relative space-y-4 font-sans text-white/90">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 px-4 py-2 rounded-lg text-xs font-semibold shadow-2xl backdrop-blur-md border ${
              toastType === 'ok' 
                ? 'bg-black/90 text-[#d4b87a] border-[#d4b87a]/20' 
                : 'bg-red-950/90 text-red-400 border-red-900/30'
            }`}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs HUD Header (Mockup exact replica) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.04] pb-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'home', label: 'Home', sub: 'panorama cruzado' },
            { id: 'lideres', label: 'Líderes / Gestores', sub: 'Liderança · Gerir · Delegar' },
            { id: 'time', label: 'Time', sub: 'demais equipes · Formar' },
            { id: 'empresa', label: 'Empresa', sub: 'Estratégia · BI · Canais' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as TabOption)}
              className={`flex flex-col items-start px-4 py-2.5 rounded-[0.8rem] border transition-all duration-300 ${
                activeTab === t.id 
                  ? 'bg-white/[0.05] border-[#d4b87a]/35 text-white shadow-[0_0_12px_rgba(212,184,122,0.1)]' 
                  : 'bg-transparent border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-[11px] font-bold tracking-tight">{t.label}</span>
              <span className="text-[8px] uppercase tracking-wider opacity-60 mt-0.5 font-mono">{t.sub}</span>
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => triggerToast('Professor de IA iniciando mentoria de liderança...', 'ok')}
          className="flex items-center gap-2 rounded-[0.7rem] bg-white/[0.04] border border-white/[0.08] px-3.5 py-2 text-[9px] uppercase tracking-widest text-[#d4b87a] transition hover:bg-[#d4b87a]/15 shadow-sm hover:border-[#d4b87a]/30"
        >
          <Play className="h-3 w-3 fill-[#d4b87a] stroke-none" /> PROFESSOR IA
        </button>
      </div>

      {/* CONTENT PAGES ROUTER */}
      <AnimatePresence mode="wait">
        
        {/* ================= HOME TAB ================= */}
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* ROW 1: Visão Cruzada + Candidates Funnel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Visão Cruzada 4D/6D */}
              <div className="lg:col-span-7 ipb-soft p-5 rounded-[1.2rem] space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono">SIG · OS</span>
                    <h3 className="text-sm font-bold text-white/95 mt-0.5">Visão Cruzada · 4 Dimensões OS</h3>
                    <p className="text-[10px] text-white/40">Radar multidimensional · n = {teamMembers.length} colaboradores</p>
                  </div>
                  <button onClick={handleResetRadar} className="text-[8px] uppercase tracking-widest text-white/45 hover:text-white border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1 transition font-mono">
                    ⟲ RESET
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  
                  {/* Radar Stage SVG */}
                  <div className="sm:col-span-5 flex justify-center relative py-2">
                    <div className="w-[180px] h-[180px] relative">
                      <svg className="w-full h-full overflow-visible" viewBox="-200 -200 400 400">
                        <defs>
                          <radialGradient id="crystalFillH" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#efddb1" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#151310" stopOpacity="0.02"/>
                          </radialGradient>
                          <linearGradient id="crystalStrokeH" x1="0" y1="-150" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7"/>
                            <stop offset="50%" stopColor="#d4b87a" stopOpacity="0.55"/>
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6"/>
                          </linearGradient>
                          <filter id="glow-h"><feGaussianBlur stdDeviation="3"/></filter>
                        </defs>

                        {/* Radar Circles */}
                        <circle cx="0" cy="0" r="160" fill="none" stroke="rgba(212,184,122,0.12)" strokeWidth="0.7" strokeDasharray="4 6"/>
                        <circle cx="0" cy="0" r="110" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                        
                        {/* Star base polygon */}
                        <polygon points="0,-140 121,-70 121,70 0,140 -121,70 -121,-70" fill="none" stroke="url(#crystalStrokeH)" strokeWidth="1"/>
                        
                        <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.6">
                          <line x1="0" y1="-140" x2="0" y2="140"/>
                          <line x1="-121" y1="0" x2="121" y2="0"/>
                          <line x1="-121" y1="-70" x2="121" y2="70"/>
                          <line x1="-121" y1="70" x2="121" y2="-70"/>
                        </g>

                        {/* Interactive dynamic radar polygon based on selection */}
                        <polygon 
                          points={`
                            0,${selectedDims.includes('D1') ? -115 : 0} 
                            ${selectedDims.includes('D2') ? 100 : 0},${selectedDims.includes('D2') ? -48 : 0} 
                            ${selectedDims.includes('D3') ? 80 : 0},${selectedDims.includes('D3') ? 55 : 0} 
                            0,${selectedDims.includes('D4') ? 98 : 0} 
                            ${selectedDims.includes('D5') ? -70 : 0},${selectedDims.includes('D5') ? 38 : 0} 
                            ${selectedDims.includes('D6') ? -85 : 0},${selectedDims.includes('D6') ? -52 : 0}
                          `} 
                          fill="url(#crystalFillH)" 
                          stroke="#d4b87a" 
                          strokeWidth="1.8" 
                          opacity="0.4"
                        />

                        {/* Vertex Dots */}
                        {selectedDims.includes('D1') && <circle cx="0" cy="-115" r="4.5" fill="#fff" stroke="#d4b87a" strokeWidth="1.5"/>}
                        {selectedDims.includes('D2') && <circle cx="100" cy="-48" r="4.5" fill="#fff" stroke="#d4b87a" strokeWidth="1.5"/>}
                        {selectedDims.includes('D3') && <circle cx="80" cy="55" r="4.5" fill="#fff" stroke="#d4b87a" strokeWidth="1.5"/>}
                        {selectedDims.includes('D4') && <circle cx="0" cy="98" r="4.5" fill="#fff" stroke="#d4b87a" strokeWidth="1.5"/>}
                        {selectedDims.includes('D5') && <circle cx="-70" cy="38" r="4.5" fill="#fff" stroke="#d4b87a" strokeWidth="1.5"/>}
                        {selectedDims.includes('D6') && <circle cx="-85" cy="-52" r="4.5" fill="#fff" stroke="#d4b87a" strokeWidth="1.5"/>}

                        <g fontStyle="Poppins" fontSize="13" fontWeight="600" fill="#d4b87a">
                          <text x="0" y="-152" textAnchor="middle">D1</text>
                          <text x="140" y="-78" textAnchor="middle">D2</text>
                          <text x="138" y="85" textAnchor="middle">D3</text>
                          <text x="0" y="158" textAnchor="middle">D4</text>
                          <text x="-138" y="85" textAnchor="middle">D5</text>
                          <text x="-140" y="-78" textAnchor="middle">D6</text>
                        </g>
                      </svg>

                      {/* Center Info Gauge */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                        <span className="text-2xl font-bold text-white tracking-tighter leading-none">
                          {selectedDims.length * 12 + 4}
                        </span>
                        <span className="text-[6px] uppercase tracking-widest text-[#d4b87a] mt-1 font-mono">OBI GLOBAL</span>
                        <span className="text-[7px] text-[#5dcaa5] mt-0.5 font-bold">▲ +3.2</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Dimension list & checkmarks */}
                  <div className="sm:col-span-7 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {dimensionsInfo.map(dim => {
                        const active = selectedDims.includes(dim.code)
                        return (
                          <div 
                            key={dim.code}
                            onClick={() => handleSelectDimension(dim.code)}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[0.5rem] border transition cursor-pointer select-none ${
                              active 
                                ? 'bg-white/[0.03] border-[#d4b87a]/15 text-white' 
                                : 'bg-transparent border-transparent opacity-35 text-white/50'
                            }`}
                          >
                            <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: dim.color }} />
                            <span className="text-[9px] font-mono font-bold text-[#d4b87a]">{dim.code}</span>
                            <span className="text-[9.5px] truncate flex-1 leading-none">{dim.label}</span>
                            <span className="text-[9px] font-mono font-bold">{dim.val}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Progress Bar of Health */}
                    <div className="border-t border-white/[0.04] pt-3">
                      <div className="flex justify-between text-[9px] text-white/45">
                        <span>Saúde 6D · Score Geral</span>
                        <span className="font-mono text-[#d4b87a] font-bold">{Math.round((selectedDims.length / 6) * 100)}%</span>
                      </div>
                      <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden mt-1.5">
                        <div className="h-full bg-gradient-to-r from-[#d4b87a] to-white rounded-full transition-all duration-500" style={{ width: `${(selectedDims.length / 6) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recrutamento Funil Lencioni & Candidates */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* 5 Stage recruit bar */}
                <div className="ipb-soft p-4 rounded-[1.2rem] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono">RECRUTAMENTO - 4 ESTÁGIOS</span>
                    <button className="text-[7.5px] uppercase tracking-wider text-[#d4b87a] font-bold hover:underline" onClick={() => setActiveTab('lideres')}>▶ Detalhes</button>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-1 text-center bg-black/25 border border-white/[0.03] rounded-lg p-2.5 font-mono text-[9px]">
                    <div>
                      <b className="text-[#d4b87a] text-sm block">{candidates.filter(c => c.stage === 'triagem').length}</b>
                      <span className="text-[6.5px] text-white/40 block">TRIAGEM</span>
                    </div>
                    <div>
                      <b className="text-[#d4b87a] text-sm block">{candidates.filter(c => c.stage === 'entrevista').length}</b>
                      <span className="text-[6.5px] text-white/40 block">ENTREVISTA</span>
                    </div>
                    <div>
                      <b className="text-[#d4b87a] text-sm block">{candidates.filter(c => c.stage === 'decisao').length}</b>
                      <span className="text-[6.5px] text-white/40 block">DECISÃO</span>
                    </div>
                    <div>
                      <b className="text-[#d4b87a] text-sm block">{candidates.filter(c => c.stage === 'onboarding').length}</b>
                      <span className="text-[6.5px] text-white/40 block">ONBOARD</span>
                    </div>
                    <div>
                      <b className="text-[#5dcaa5] text-sm block">{teamMembers.length}</b>
                      <span className="text-[6.5px] text-white/40 block">HIRED</span>
                    </div>
                  </div>
                </div>

                {/* Candidate list stack */}
                <div className="ipb-soft p-4 rounded-[1.2rem] flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                      <div>
                        <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono">HHS · SIG</span>
                        <h3 className="text-[12px] font-bold text-[#d4b87a]">Funil Lencioni &amp; HHS</h3>
                      </div>
                      <button onClick={handleResetCandidates} className="text-[7.5px] uppercase tracking-wider text-white/45 hover:text-white border border-white/[0.08] rounded-[0.3rem] px-2 py-0.5 transition font-mono">
                        ♻ Restaurar
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {candidates.length === 0 ? (
                        <div className="text-center py-6 text-[10px] text-white/30">Nenhum candidato no funil.</div>
                      ) : (
                        candidates.map(cand => (
                          <div key={cand.id} className="p-2.5 bg-black/20 border border-white/[0.03] rounded-[0.6rem] relative flex flex-col gap-1.5 transition-all hover:border-white/[0.08]">
                            <button onClick={() => handleDeleteCandidate(cand.id)} className="absolute top-2 right-2 text-white/30 hover:text-red-400 text-[9px] transition">✕</button>
                            
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-[#d4b87a]/15 text-[#d4b87a] font-bold text-[9px] flex items-center justify-center border border-[#d4b87a]/20">
                                {cand.name.split(' ').map(x => x[0]).join('')}
                              </div>
                              <div>
                                <h4 className="text-[10px] font-bold text-white/95 leading-none">{cand.name}</h4>
                                <span className="text-[8px] text-white/45 font-mono">{cand.role} · {cand.stage.toUpperCase()}</span>
                              </div>
                            </div>
                            
                            {/* HHS Bar */}
                            <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                              <div className="h-full bg-[#d4b87a] rounded-full" style={{ width: `${cand.lencioniScore}%` }} />
                            </div>

                            <div className="flex justify-between items-center text-[7.5px] font-mono text-white/50">
                              <div className="flex gap-2">
                                <span>HUM: <b className="text-white/80">{cand.stats.hum}%</b></span>
                                <span>FOM: <b className="text-white/80">{cand.stats.fom}%</b></span>
                                <span>INT: <b className="text-white/80">{cand.stats.int}%</b></span>
                              </div>
                              <button 
                                onClick={() => handleTriggerOnboard(cand)}
                                className="px-2 py-0.5 rounded-[0.25rem] bg-[#d4b87a]/15 border border-[#d4b87a]/30 text-[#d4b87a] font-bold hover:bg-[#d4b87a]/30 transition"
                              >
                                {cand.stage === 'triagem' ? 'Avançar' : cand.stage === 'onboarding' ? 'CONTRATAR' : 'Evoluir'}
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ROW 1.5: Status dos 4 Blocos OS */}
            <div className="ipb-soft p-4 rounded-[1.2rem]">
              <span className="text-[7.5px] uppercase tracking-widest text-white/40 font-mono block mb-2">OS · STATUS</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { code: 'BLOCO 01', name: 'Líderes', action: 'Recrutar', status: '✓ ativo', color: 'text-[#5dcaa5]', tab: 'lideres', sub: 'recrutar' },
                  { code: 'BLOCO 02', name: 'Time', action: 'Formar', status: '⚡ atenção', color: 'text-[#fac775]', tab: 'time', sub: 'formar' },
                  { code: 'BLOCO 03', name: 'Gerir', action: 'Diário', status: '✓ calibrado', color: 'text-[#5c9ae6]', tab: 'lideres', sub: 'gerir' },
                  { code: 'BLOCO 04', name: 'Empresa', action: 'Estratégia', status: '✓ ativo', color: 'text-[#5dcaa5]', tab: 'empresa', sub: 'estrategia' }
                ].map(b => (
                  <div 
                    key={b.code} 
                    onClick={() => {
                      setActiveTab(b.tab as TabOption)
                      if (b.tab === 'lideres') setLideresTab(b.sub as LideresSubTab)
                      if (b.tab === 'time') setTimeTab(b.sub as TimeSubTab)
                      if (b.tab === 'empresa') setEmpresaTab(b.sub as EmpresaSubTab)
                    }}
                    className="p-3 bg-black/30 border border-white/[0.04] rounded-lg transition-all hover:border-[#d4b87a]/40 hover:-translate-y-0.5 cursor-pointer text-left relative"
                  >
                    <span className="text-[7.5px] font-mono text-white/35 block">{b.code}</span>
                    <span className="text-[11px] font-bold text-white block mt-0.5">{b.name}</span>
                    <span className="text-[8px] font-mono text-white/45 block">{b.action}</span>
                    <span className={`text-[8px] font-bold ${b.color} absolute bottom-3 right-3`}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: Mapa do Time + Você como Líder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Mapa do Time */}
              <div className="ipb-soft p-5 rounded-[1.2rem] space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono font-bold">Mapa · Time</span>
                    <h3 className="text-sm font-bold text-white/90 leading-tight">Influência × Impacto</h3>
                    <p className="text-[9.5px] text-white/40 mt-0.5">Mapeamento estratégico com base no capital social</p>
                  </div>
                  <button onClick={handleAddTeamMemberMap} className="text-[8.5px] uppercase tracking-wider text-[#d4b87a] border border-[#d4b87a]/30 hover:bg-[#d4b87a]/15 rounded-[0.4rem] px-2.5 py-1 transition font-bold font-mono">
                    + ADD
                  </button>
                </div>

                <div className="relative aspect-[3/2] w-full border border-white/[0.06] rounded-xl overflow-hidden bg-black/40">
                  {/* Grid Quadrants */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    <div className="border-r border-b border-white/[0.03] bg-[#fac775]/[0.01] p-2 text-[7.5px] text-white/30 uppercase font-mono tracking-wider">neutralos · orientar</div>
                    <div className="border-b border-white/[0.03] bg-[#5dcaa5]/[0.01] p-2 text-[7.5px] text-white/30 uppercase font-mono tracking-wider text-right">aliados · delegar</div>
                    <div className="border-r border-white/[0.03] bg-[#e24b4a]/[0.01] p-2 text-[7.5px] text-white/30 uppercase font-mono tracking-wider flex items-end">bloqueador · direcionar</div>
                    <div className="bg-[#cbd5e1]/[0.01] p-2 text-[7.5px] text-white/30 uppercase font-mono tracking-wider flex items-end justify-end">exec · apoiar</div>
                  </div>

                  {/* Axes Lines */}
                  <div className="absolute inset-x-0 top-1/2 h-[0.7px] border-b border-dashed border-white/10" />
                  <div className="absolute inset-y-0 left-1/2 w-[0.7px] border-r border-dashed border-white/10" />

                  {/* Axis Label */}
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] font-mono text-white/20 uppercase tracking-widest">← Baixa Influência · Alta Influência →</span>
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[6.5px] font-mono text-white/20 uppercase tracking-widest">Alto Impacto ↑</span>

                  {/* Plot Dots */}
                  <div className="absolute inset-0">
                    {teamMembers.map(m => {
                      // Map -150..150 to 5%..95% and -100..100 to 5%..95%
                      const left = `${((m.influence + 150) / 300) * 90 + 5}%`
                      const bottom = `${((m.impact + 100) / 200) * 90 + 5}%`
                      return (
                        <div 
                          key={m.id}
                          className="absolute group cursor-pointer transition-all duration-300 hover:scale-125"
                          style={{ left, bottom }}
                          onClick={() => triggerToast(`${m.name} (${m.role}): D6=${m.d6}`)}
                        >
                          <div className="h-3 w-3 rounded-full bg-[#d4b87a] border border-white/40 shadow-[0_0_8px_#d4b87a]" />
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/95 border border-white/10 rounded px-1.5 py-0.5 text-[7.5px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            {m.name} ({m.role})
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Você como Líder */}
              <div className="ipb-soft p-5 rounded-[1.2rem] space-y-4">
                <div>
                  <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono">Perfil · Liderança</span>
                  <h3 className="text-sm font-bold text-white/95 leading-tight">Você como Líder</h3>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2.5 bg-white/[0.02] border border-white/[0.08] hover:border-[#d4b87a]/30 rounded-lg cursor-pointer transition text-left">
                    <span className="text-[7.5px] text-white/40 block">Modo 01</span>
                    <span className="text-[11px] font-bold text-[#d4b87a] block mt-0.5">Gestor</span>
                    <span className="text-[8px] text-white/50 block">Complexidade &amp; Orçamento</span>
                  </div>
                  <div className="p-2.5 bg-white/[0.04] border border-[#d4b87a]/35 rounded-lg cursor-pointer transition text-left shadow-[0_0_10px_rgba(212,184,122,0.06)]">
                    <span className="text-[7.5px] text-[#d4b87a] block">Modo 02</span>
                    <span className="text-[11px] font-bold text-white block mt-0.5">Líder</span>
                    <span className="text-[8px] text-white/50 block">Mudança &amp; Pessoas</span>
                  </div>
                </div>

                {/* Manifesto Checklist */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-white/40">Saúde Manifesto · 5 Princípios</span>
                    <span className="text-[9px] font-mono text-[#5dcaa5] font-bold">{manifestoScoreVal}%</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {manifestoPrinciples.map((p, idx) => (
                      <div 
                        key={p.code}
                        onClick={() => handleToggleManifesto(idx)}
                        className="flex items-center justify-between p-2 bg-black/20 border border-white/[0.03] rounded-lg transition hover:border-white/[0.08] cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-[8px] font-mono font-bold text-[#d4b87a]">{p.code}</span>
                          <span className="text-[10px] text-white/75">{p.text}</span>
                        </div>
                        <div className="shrink-0 cursor-pointer">
                          {manifestoChecks[idx] ? (
                            <CheckSquare className="h-3.5 w-3.5 text-[#5dcaa5]" />
                          ) : (
                            <Square className="h-3.5 w-3.5 text-white/20" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3: Primeiros Passos + Pulso Semanal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Primeiros Passos */}
              <div className="ipb-soft p-5 rounded-[1.2rem] space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono font-bold">Onboarding · Sistema</span>
                    <h3 className="text-sm font-bold text-white/90 leading-tight">Primeiros Passos</h3>
                  </div>
                  <button onClick={handlePopularPassosExemplo} className="text-[8px] uppercase tracking-wider text-white/45 hover:text-white border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1 transition font-mono">
                    popular exemplo
                  </button>
                </div>

                <div className="space-y-2">
                  {primeirosPassos.map((p, idx) => (
                    <div 
                      key={p.id}
                      onClick={() => handleTogglePassos(idx)}
                      className="flex items-center gap-3 p-2.5 bg-black/15 border border-white/[0.03] hover:border-white/[0.06] rounded-xl transition cursor-pointer"
                    >
                      <div className={`h-5 w-5 rounded-full text-[9px] font-bold font-mono flex items-center justify-center shrink-0 transition-all ${
                        passosChecks[idx] 
                          ? 'bg-[#5dcaa5]/20 text-[#5dcaa5] border border-[#5dcaa5]/30' 
                          : 'bg-white/[0.04] text-white/40 border border-white/[0.08]'
                      }`}>
                        {p.id}
                      </div>
                      <div className="flex-1 text-left">
                        <span className={`text-[10px] font-bold block ${passosChecks[idx] ? 'line-through text-white/30' : 'text-white/90'}`}>{p.title}</span>
                        <span className="text-[8px] text-white/35 block font-mono">{p.desc}</span>
                      </div>
                      <div className="text-white/20">→</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pulso Semanal */}
              <div className="ipb-soft p-5 rounded-[1.2rem] space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono">📊 PULSO SEMANAL</span>
                    <h3 className="text-sm font-bold text-white/90 leading-tight">Como está sua energia?</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-[0.3rem] bg-[#d4b87a]/15 text-[#d4b87a] border border-[#d4b87a]/20 text-[8.5px] font-mono">Semana 21</span>
                </div>

                <div className="space-y-3 text-left">
                  {/* Energy Row */}
                  <div>
                    <span className="text-[9.5px] font-bold text-white/45">Energia esta semana:</span>
                    <div className="flex gap-2 mt-1.5">
                      {[1, 2, 3, 4, 5].map(v => (
                        <button
                          key={v}
                          onClick={() => setPulseEnergy(v)}
                          className={`flex-1 py-1.5 rounded-md font-mono font-bold text-[10px] border transition ${
                            pulseEnergy === v
                              ? 'bg-[#d4b87a]/20 border-[#d4b87a]/70 text-[#d4b87a] shadow-[0_0_8px_rgba(212,184,122,0.2)]'
                              : 'bg-black/30 border-white/[0.06] text-white/40 hover:text-white/70'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Focus Row */}
                  <div>
                    <span className="text-[9.5px] font-bold text-white/45">E seu foco?</span>
                    <div className="flex gap-2 mt-1.5">
                      {[1, 2, 3, 4, 5].map(v => (
                        <button
                          key={v}
                          onClick={() => setPulseFocus(v)}
                          className={`flex-1 py-1.5 rounded-md font-mono font-bold text-[10px] border transition ${
                            pulseFocus === v
                              ? 'bg-[#d4b87a]/20 border-[#d4b87a]/70 text-[#d4b87a] shadow-[0_0_8px_rgba(212,184,122,0.2)]'
                              : 'bg-black/30 border-white/[0.06] text-white/40 hover:text-white/70'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Blocker Area */}
                  <div>
                    <span className="text-[9.5px] font-bold text-white/45 block mb-1">Qual o maior bloqueio agora? <span className="opacity-50 font-normal">(1 linha)</span></span>
                    <textarea 
                      value={pulseBlocker}
                      onChange={(e) => setPulseBlocker(e.target.value)}
                      placeholder="Descreva seu bloqueio principal desta semana..."
                      className="w-full h-11 bg-black/40 border border-white/[0.08] rounded-lg p-2 text-[10px] text-white outline-none resize-none focus:border-[#d4b87a]/40 transition"
                    />
                  </div>

                  <button 
                    onClick={handleSavePulso}
                    className="w-full py-2 rounded-lg bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/40 font-mono font-bold text-[10px] uppercase text-[#d4b87a] transition tracking-wider"
                  >
                    ✓ Salvar Pulso da Semana
                  </button>
                </div>
              </div>

            </div>

            {/* ROW 4: OS 4 BLOCOS NAV */}
            <div className="ipb-soft p-5 rounded-[1.2rem] space-y-3">
              <span className="text-[7.5px] uppercase tracking-widest text-white/40 font-mono block mb-2">Navegação · OS - Os 4 Blocos · Clica pra Entrar</span>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  { title: 'Líderes / Gestores', icon: '👥', desc: 'Recrutar · Gerir · Delegar', tags: ['Recrutar', 'Gerir', 'Você'], info: 'lideres', sub: 'recrutar' },
                  { title: 'Time', icon: '🎯', desc: 'Formar · Pessoas · Influência', tags: ['Formar', 'Pessoas', 'Influência'], info: 'time', sub: 'formar' },
                  { title: 'Gerir Diário', icon: '📓', desc: 'D6 · SBI · 1:1 · Config', tags: ['D6', 'SBI', '1:1'], info: 'lideres', sub: 'gerir' },
                  { title: 'Empresa', icon: '🏢', desc: 'Estratégia · BI · OKRs', tags: ['Estratégia', 'BI', 'Canais'], info: 'empresa', sub: 'estrategia' }
                ].map(n => (
                  <div 
                    key={n.title}
                    onClick={() => {
                      setActiveTab(n.info as TabOption)
                      if (n.info === 'lideres') setLideresTab(n.sub as LideresSubTab)
                      if (n.info === 'time') setTimeTab(n.sub as TimeSubTab)
                    }}
                    className="p-4 bg-black/20 border border-white/[0.03] hover:border-[#d4b87a]/35 rounded-xl transition cursor-pointer text-left flex flex-col justify-between h-[125px]"
                  >
                    <div>
                      <span className="text-xl block">{n.icon}</span>
                      <h4 className="text-[11px] font-bold text-white mt-1 leading-none">{n.title}</h4>
                      <span className="text-[8px] text-white/45 block mt-1 font-mono leading-tight">{n.desc}</span>
                    </div>
                    <div className="flex gap-1 flex-wrap mt-2">
                      {n.tags.map(t => <span key={t} className="px-1.5 py-0.5 bg-white/[0.04] rounded-[0.25rem] text-[6.5px] font-mono text-white/50">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= LIDERES TAB ================= */}
        {activeTab === 'lideres' && (
          <motion.div
            key="lideres"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="ipb-soft p-5 rounded-[1.2rem] space-y-4"
          >
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono">LÍDERES · GESTORES</span>
                <h3 className="text-sm font-bold text-white/90 leading-none mt-0.5 font-sans">Desenvolvimento de Liderança</h3>
                <p className="text-[9.5px] text-white/40 mt-1">Autoconhecimento → Gestão → Equipe → Organização</p>
              </div>
              <button 
                onClick={() => triggerToast('Carregando áudio de liderança Situacional...', 'ok')}
                className="rounded-[0.5rem] bg-white/[0.03] border border-white/[0.08] hover:border-[#d4b87a]/35 text-[#d4b87a] px-3 py-1.5 text-[8.5px] font-bold uppercase transition"
              >
                ▶ PROFESSOR IA
              </button>
            </div>

            {/* Sub-tabs Row */}
            <div className="flex gap-1.5 border-b border-white/[0.03] pb-2 overflow-x-auto">
              {[
                { id: 'recrutar', label: 'Recrutar' },
                { id: 'gerir', label: 'Gerir' },
                { id: 'lideranca', label: 'Você (PDI)' },
                { id: 'delegar', label: 'Delegar (M1-M4)' },
                { id: 'significado', label: 'Significado' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setLideresTab(sub.id as LideresSubTab)}
                  className={`px-3 py-1.5 rounded-[0.4rem] text-[9.5px] font-bold font-mono transition-all ${
                    lideresTab === sub.id
                      ? 'bg-white/[0.05] text-[#d4b87a] border border-[#d4b87a]/25 shadow-sm'
                      : 'bg-transparent text-white/40 hover:text-white/75 border border-transparent'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Inner pages dispatch */}
            <AnimatePresence mode="wait">
              
              {/* SUVPAGE: RECRUTAR */}
              {lideresTab === 'recrutar' && (
                <motion.div
                  key="recrutar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4"
                >
                  {/* Left: Role metrics */}
                  <div className="lg:col-span-8 space-y-4 text-left">
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03]">
                      <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase tracking-wider font-mono">Novo Candidato</h4>
                      <p className="text-[9.5px] text-white/40 mt-1">Selecione o papel desejado para parametrizar o formulário estruturado:</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        {[
                          { title: 'Liderado', desc: 'Foco: Fit cultural + comportamento + soft skills específicos.', qCount: '5 perguntas' },
                          { title: 'Gestor', desc: 'Foco: Capacidade gestora + desenvolvimento + mediação.', qCount: '7 perguntas' },
                          { title: 'Líder & Gestor', desc: 'Liderança estratégica que gere pessoas. Foco: Visão + Operação.', qCount: '10 perguntas' },
                          { title: 'Líder', desc: 'Head ou C-level estratégico. Foco: Transformação + Direção.', qCount: '10 perguntas' }
                        ].map((role, idx) => (
                          <div 
                            key={idx}
                            onClick={() => triggerToast(`Parâmetros de fit para ${role.title} ativados.`, 'ok')}
                            className="p-3 bg-black/20 border border-white/[0.05] hover:border-[#d4b87a]/45 rounded-lg cursor-pointer transition text-left"
                          >
                            <b className="text-[11px] text-[#d4b87a] block leading-none">{role.title}</b>
                            <span className="text-[8.5px] text-white/50 block mt-1 leading-snug">{role.desc}</span>
                            <span className="text-[8px] font-mono text-white/35 block mt-2">{role.qCount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Automations */}
                  <div className="lg:col-span-4 space-y-4 text-left">
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03]">
                      <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono mb-3">Automações Ativas</h4>
                      <div className="space-y-2 text-[9px] font-mono text-white/60">
                        <div className="flex justify-between"><span>Whisper Transcrição</span><span className="text-[#5dcaa5]">ativo</span></div>
                        <div className="flex justify-between"><span>IA Lencioni Evaluation</span><span className="text-[#5dcaa5]">ativo</span></div>
                        <div className="flex justify-between"><span>HHS Scoring Ranks</span><span className="text-[#5dcaa5]">ativo</span></div>
                        <div className="flex justify-between"><span>Conexão LinkedIn Gupy</span><span className="text-[#fac775]">pendente</span></div>
                        <div className="flex justify-between"><span>Slack NLP Watcher</span><span className="text-[#5dcaa5]">ativo</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SUBPAGE: GERIR */}
              {lideresTab === 'gerir' && (
                <motion.div
                  key="gerir"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="ipb-soft p-4 rounded-xl text-center">
                      <span className="text-[8px] uppercase tracking-wider font-mono text-white/40 block mb-1">Pessoas em Alerta</span>
                      <b className="text-2xl font-bold text-[#e24b4a]">{teamMembers.filter(m => m.d6 < 60).length}</b>
                      <span className="text-[8px] text-white/30 block mt-1 font-mono">D6 individual &lt; 60%</span>
                    </div>
                    <div className="ipb-soft p-4 rounded-xl text-center">
                      <span className="text-[8px] uppercase tracking-wider font-mono text-white/40 block mb-1">D6 Médio do Time</span>
                      <b className="text-2xl font-bold text-[#d4b87a]">{Math.round(teamMembers.reduce((s, m) => s + m.d6, 0) / teamMembers.length)}%</b>
                      <span className="text-[8px] text-white/30 block mt-1 font-mono">Calibrado em tempo real</span>
                    </div>
                    <div className="ipb-soft p-4 rounded-xl text-center">
                      <span className="text-[8px] uppercase tracking-wider font-mono text-white/40 block mb-1">Tarefas Ativas Delegadas</span>
                      <b className="text-2xl font-bold text-[#5c9ae6]">{delegatedTasks.length}</b>
                      <span className="text-[8px] text-white/30 block mt-1 font-mono">Liderança situacional</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Coach SBI */}
                    <div className="lg:col-span-7 ipb-soft p-4 rounded-xl text-left space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Registrar Feedback SBI</h4>
                        <p className="text-[9px] text-white/45">Foque em Fato → Comportamento objetivo → Impacto</p>
                      </div>

                      <div className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="Situação (Onde e quando ocorreu? Ex: Na reunião de OKRs...)" 
                          value={sbiSit}
                          onChange={(e) => setSbiSit(e.target.value)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                        <input 
                          type="text" 
                          placeholder="Comportamento (Fato observável. Ex: Você me interrompeu 3 vezes...)" 
                          value={sbiComp}
                          onChange={(e) => setSbiComp(e.target.value)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                        <textarea 
                          placeholder="Impacto (Efeito no time. Ex: Isso alongou a discussão em 20 min...)" 
                          value={sbiImp}
                          onChange={(e) => setSbiImp(e.target.value)}
                          className="w-full h-14 bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40 resize-none"
                        />
                        
                        <button 
                          onClick={handleAddSbi}
                          className="px-3.5 py-1.5 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/45 rounded-lg text-[9px] font-bold text-[#d4b87a] font-mono transition"
                        >
                          + REGISTRAR SBI
                        </button>
                      </div>

                      {/* Log feed */}
                      <div className="border-t border-white/[0.04] pt-3 max-h-[140px] overflow-y-auto space-y-2 pr-1">
                        {sbiLogs.map((log, i) => (
                          <div key={i} className="p-2 bg-white/[0.02] border border-white/[0.04] rounded-lg font-mono text-[9px]">
                            <span className="text-[#d4b87a] font-bold block">{log.date} · REGISTRO SBI</span>
                            <span className="text-white/40 block mt-1">Situação: <b className="text-white/70">{log.situation}</b></span>
                            <span className="text-white/40 block">Comportamento: <b className="text-white/70">{log.behavior}</b></span>
                            <span className="text-white/40 block">Impacto: <b className="text-white/70">{log.impact}</b></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team Individual Health */}
                    <div className="lg:col-span-5 ipb-soft p-4 rounded-xl text-left space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Saúde Individual do Time</h4>
                        <p className="text-[9px] text-white/45">Filtro cruzado de calibração</p>
                      </div>

                      <div className="space-y-1.5">
                        {teamMembers.map(m => (
                          <div key={m.id} className="p-2 bg-black/25 border border-white/[0.03] rounded-lg flex items-center justify-between">
                            <div>
                              <b className="text-[10px] text-white/90 block leading-tight">{m.name}</b>
                              <span className="text-[8px] font-mono text-white/40">{m.role}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9.5px] font-bold font-mono text-[#d4b87a] block leading-none">{m.d6}% D6</span>
                              <span className={`text-[7.5px] font-bold uppercase font-mono mt-0.5 block ${m.d6 >= 80 ? 'text-[#5dcaa5]' : m.d6 >= 60 ? 'text-[#fac775]' : 'text-[#e24b4a]'}`}>{m.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SUBPAGE: VOCÊ (PDI) */}
              {lideresTab === 'lideranca' && (
                <motion.div
                  key="lideranca"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left"
                >
                  
                  {/* Left: Diary & CNV */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Progress */}
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className="text-[#d4b87a] font-bold">PDI - Jornada do Líder</span>
                        <span>{lessonsCompletedPercent}% completo</span>
                      </div>
                      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#d4b87a] to-white rounded-full transition-all duration-500" style={{ width: `${lessonsCompletedPercent}%` }} />
                      </div>
                    </div>

                    {/* Diary Form */}
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Diário de Inteligência Emocional</h4>
                        <p className="text-[9.5px] text-white/40">Registre fatos marcantes para controle de reações sob estresse.</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Situação geradora de emoção..." 
                          value={diaryInput}
                          onChange={(e) => setDiaryInput(e.target.value)}
                          className="flex-1 bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddDiary()}
                        />
                        <button onClick={handleAddDiary} className="px-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-[0.4rem] text-[10px] font-bold transition flex items-center justify-center">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                        {diaryLogs.map((log, idx) => (
                          <div key={idx} className="p-2.5 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                            <span className="text-[7.5px] font-mono text-[#d4b87a] font-bold block">{log.time} · AUTO-REGISTRO</span>
                            <p className="text-[9.5px] text-white/70 mt-1 leading-snug">{log.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CNV Rosenberg linter */}
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Alpha-Linter: Comunicar Sem Julgamentos</h4>
                        <p className="text-[9.5px] text-white/40">Filtre acusações morais subjetivas e adote fatos verificáveis.</p>
                      </div>

                      <textarea 
                        value={cnvInput}
                        onChange={(e) => setCnvInput(e.target.value)}
                        placeholder="Ex: O colaborador é preguiçoso e sempre atrasa as entregas da sprint."
                        className="w-full h-16 bg-black/40 border border-white/[0.08] rounded-[0.4rem] p-2.5 text-[10.5px] text-white outline-none resize-none focus:border-[#d4b87a]/40 transition"
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono font-bold text-[#d4b87a]">{cnvScore || 'Score: --'}</span>
                        <button 
                          onClick={handleCnvAnalyze}
                          disabled={cnvAnalyzing}
                          className="px-3.5 py-1.5 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/45 rounded-lg text-[9px] font-bold text-[#d4b87a] font-mono transition disabled:opacity-50"
                        >
                          {cnvAnalyzing ? 'Analisando...' : 'Calcular Índice Alpha CNV'}
                        </button>
                      </div>

                      {cnvFeedback && (
                        <div className="p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                          {cnvFeedback}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Microaulas Checklist Accordion */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase font-mono">Microaulas de Autoconhecimento</h4>
                        <p className="text-[9px] text-white/45">Fase 1 do PDI: Marque os módulos concluídos após assistir.</p>
                      </div>

                      <div className="space-y-2">
                        {lessons.map((lesson, idx) => {
                          const expanded = expandedLesson === lesson.id
                          return (
                            <div key={lesson.id} className="border border-white/[0.04] rounded-lg overflow-hidden bg-black/20">
                              <div 
                                onClick={() => setExpandedLesson(expanded ? null : lesson.id)}
                                className="flex items-center justify-between p-2.5 bg-white/[0.01] hover:bg-white/[0.04] cursor-pointer transition select-none"
                              >
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="checkbox" 
                                    checked={microaulasProgress[idx] || false}
                                    onChange={() => handleToggleLessonCheck(idx)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-3 w-3 accent-[#d4b87a]"
                                  />
                                  <span className="text-[10px] font-bold text-white/80">{lesson.title}</span>
                                </div>
                                <span className="text-[7.5px] uppercase font-mono text-[#d4b87a]">VER ▼</span>
                              </div>

                              {expanded && (
                                <div className="p-3 bg-black/45 border-t border-white/[0.03] text-[9.5px] text-white/50 leading-relaxed space-y-2">
                                  <p>{lesson.body}</p>
                                  <button 
                                    onClick={() => triggerToast(`Tocando vídeo ${lesson.title}...`, 'ok')}
                                    className="text-[8px] font-mono font-bold text-[#d4b87a] uppercase hover:underline block"
                                  >
                                    ▶ INICIAR PLAYER VIDEO
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

              {/* SUBPAGE: DELEGAR */}
              {lideresTab === 'delegar' && (
                <motion.div
                  key="delegar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 text-left"
                >
                  {/* M1-M4 situational matrix explanation */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      { m: 'M1', label: 'Iniciante', focus: 'Direcionar', color: 'border-red-900/30 text-red-400', desc: 'Alta motivação, baixa competência. Prescritivo: defina e monitore.' },
                      { m: 'M2', label: 'Aprendiz', focus: 'Orientar', color: 'border-yellow-900/30 text-yellow-400', desc: 'Motivação cai no progresso. Direcione tarefas e apoie socioemocionalmente.' },
                      { m: 'M3', label: 'Capaz', focus: 'Apoiar', color: 'border-slate-700 text-slate-300', desc: 'Competência alta, confiança oscila. Coparticipe da decisão e incentive.' },
                      { m: 'M4', label: 'Expert', focus: 'Delegar', color: 'border-[#5dcaa5]/30 text-[#5dcaa5]', desc: 'Maturidade máxima. Conceda autonomia de decisão com monitoramento assíncrono.' }
                    ].map(item => (
                      <div key={item.m} className={`p-3 bg-black/20 border ${item.color} rounded-lg space-y-1`}>
                        <span className="text-[8px] font-mono font-bold block">{item.m} · {item.label.toUpperCase()}</span>
                        <b className="text-[11px] block leading-none">{item.focus}</b>
                        <span className="text-[9px] text-white/45 block leading-snug">{item.desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calculator Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 ipb-soft p-4 rounded-xl space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Calculadora de Custo de Oportunidade</h4>
                        <p className="text-[9px] text-white/45">Descubra o valor financeiro de recuperar seu tempo delegando tarefas</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div className="space-y-1">
                          <label className="text-[8.5px] font-mono text-white/40 block">Salário Mensal Estimado (R$)</label>
                          <input 
                            type="number" 
                            value={salary}
                            onChange={(e) => setSalary(parseInt(e.target.value) || 0)}
                            className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8.5px] font-mono text-white/40 block">Horas Gastas/Semana</label>
                          <input 
                            type="number" 
                            value={operHours}
                            onChange={(e) => setOperHours(parseInt(e.target.value) || 0)}
                            className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                          />
                        </div>
                        
                        <div className="col-span-2 space-y-1">
                          <label className="text-[8.5px] font-mono text-white/40 block">Maturidade do Liderado Destinado</label>
                          <select 
                            value={delegationMaturity}
                            onChange={(e) => setDelegationMaturity(e.target.value as any)}
                            className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                          >
                            <option value="M1">M1 - Iniciante (Supervisão constante - ROI Baixo)</option>
                            <option value="M2">M2 - Aprendiz (Orientação + Instrução - ROI Médio)</option>
                            <option value="M3">M3 - Capaz (Facilitação socioemocional - ROI Alto)</option>
                            <option value="M4">M4 - Expert (Autonomia Plena - ROI Máximo)</option>
                          </select>
                        </div>
                      </div>

                      {/* Diagnostic Outputs */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                        <div className="p-2 bg-black/35 border border-white/[0.03] rounded-lg">
                          <span className="text-[7.5px] font-mono text-white/40 block">Custo Hora</span>
                          <b className="text-[11px] text-white font-mono block">R$ {costPerHour}</b>
                        </div>
                        <div className="p-2 bg-black/35 border border-white/[0.03] rounded-lg">
                          <span className="text-[7.5px] font-mono text-white/40 block">Burnout Líder</span>
                          <b className="text-[11px] text-[#fac775] font-bold block">{burnoutRisk}</b>
                        </div>
                        <div className="p-2 bg-[#5dcaa5]/5 border border-[#5dcaa5]/20 rounded-lg">
                          <span className="text-[7.5px] font-mono text-white/40 block">ROI Mensal</span>
                          <b className="text-[11px] text-[#5dcaa5] font-mono block">R$ {Math.round(opportunityRoi)}</b>
                        </div>
                        <div className="p-2 bg-[#5dcaa5]/5 border border-[#5dcaa5]/20 rounded-lg">
                          <span className="text-[7.5px] font-mono text-white/40 block">Impacto Anual</span>
                          <b className="text-[11px] text-[#5dcaa5] font-mono block">R$ {annualRoi}</b>
                        </div>
                      </div>

                      <div className="p-2.5 bg-white/[0.02] border border-white/[0.05] rounded-lg font-mono text-[9px] leading-relaxed text-white/60">
                        <b>DIAGNÓSTICO ALX:</b> Seu gargalo operacional de {operHours}h/semana drena o orçamento. Ao delegar para um {delegationMaturity}, você recupera R$ {Math.round(opportunityRoi)} mensais em foco estratégico.
                      </div>
                    </div>

                    {/* Delegated task checklist */}
                    <div className="lg:col-span-5 ipb-soft p-4 rounded-xl space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Painel de Delegações Ativas</h4>
                        <p className="text-[9px] text-white/45">Atribua metas baseadas na maturidade</p>
                      </div>

                      <div className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="Meta / Tarefa a ser delegada..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="w-full bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-3 py-1 text-[9.5px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                        
                        <div className="flex gap-2">
                          <select 
                            value={newTaskAssignee}
                            onChange={(e) => setNewTaskAssignee(e.target.value)}
                            className="flex-1 bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-2 py-1 text-[9.5px] text-white outline-none"
                          >
                            {teamMembers.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                          </select>
                          <select 
                            value={newTaskMaturity}
                            onChange={(e) => setNewTaskMaturity(e.target.value)}
                            className="w-20 bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-2 py-1 text-[9.5px] text-white outline-none"
                          >
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                            <option value="M3">M3</option>
                            <option value="M4">M4</option>
                          </select>
                          <button 
                            onClick={handleAddDelegatedTask}
                            className="px-3 bg-[#d4b87a]/20 border border-[#d4b87a]/30 hover:bg-[#d4b87a]/30 rounded-[0.4rem] text-[9.5px] font-bold text-[#d4b87a] transition"
                          >
                            DELEGAR
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 max-h-[140px] overflow-y-auto pr-1">
                        {delegatedTasks.map(t => (
                          <div 
                            key={t.id} 
                            onClick={() => handleToggleTaskStatus(t.id)}
                            className="p-2 bg-white/[0.02] border border-white/[0.04] rounded-lg flex items-center justify-between cursor-pointer transition hover:border-[#d4b87a]/30"
                          >
                            <div>
                              <b className="text-[10px] text-white block leading-none">{t.title}</b>
                              <span className="text-[8px] font-mono text-white/40 block mt-1">{t.assignee} · {t.maturity}</span>
                            </div>
                            <span className={`text-[8.5px] font-mono uppercase font-bold ${t.status === 'concluido' ? 'text-[#5dcaa5]' : t.status === 'calibrado' ? 'text-[#fac775]' : 'text-white/35'}`}>{t.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* SUBPAGE: SIGNIFICADO */}
              {lideresTab === 'significado' && (
                <motion.div
                  key="significado"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left"
                >
                  
                  {/* Lentes de missão */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03]">
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono mb-2">Lentes de Missão — Estudos Críticos OBI</h4>
                      <div className="space-y-2">
                        {[
                          { title: '⚡ Gestão de Energia Cerebral', text: 'O cérebro opera com energia limitada sob estresse e incerteza constante. Cortar retrabalho e reuniões vazias é sobrevivência cognitiva.' },
                          { title: '🛡️ Cultura como Sistema Imunológico', text: 'Cultura é o conjunto de ações tomadas quando o líder não está olhando. Fortaleça-a co-criando o Contrato de Aliança.' },
                          { title: '🔬 Baixa Entropia Interna — Shalom', text: 'Para o organismo produzir sem fricção, a clareza e transparência devem ser absolutas em rituais semanais.' }
                        ].map((l, i) => (
                          <div key={i} className="p-3 bg-black/25 border border-white/[0.04] rounded-lg font-sans">
                            <b className="text-[10.5px] text-[#d4b87a] block leading-none">{l.title}</b>
                            <p className="text-[9.5px] text-white/60 mt-1.5 leading-relaxed">{l.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scripts */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03]">
                      <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase font-mono mb-3">Scripts de Liderança M1-M4</h4>
                      <div className="space-y-2 font-sans text-[9px] text-white/60">
                        <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded">
                          <b className="text-red-400 block font-mono">M1 Direcional:</b>
                          <span className="italic">"Vou te mostrar o passo a passo. Faça assim e me avise."</span>
                        </div>
                        <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded">
                          <b className="text-yellow-400 block font-mono">M2 Orientador:</b>
                          <span className="italic">"Você já tem o básico. O que travou no processo?"</span>
                        </div>
                        <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded">
                          <b className="text-slate-300 block font-mono">M3 Apoiador:</b>
                          <span className="italic">"Confio em você. O que você precisa de mim para decidir?"</span>
                        </div>
                        <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded">
                          <b className="text-[#5dcaa5] block font-mono">M4 Delegar:</b>
                          <span className="italic">"Você define o plano. Me mantenha informado dos marcos."</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </motion.div>
        )}

        {/* ================= TIME TAB ================= */}
        {activeTab === 'time' && (
          <motion.div
            key="time"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="ipb-soft p-5 rounded-[1.2rem] space-y-4"
          >
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono">TIME · ESTRUTURAR</span>
                <h3 className="text-sm font-bold text-white/90 leading-none mt-0.5 font-sans">Saúde e Desenvolvimento Coletivo</h3>
                <p className="text-[9.5px] text-white/40 mt-1 font-sans">Mapeamento integrado baseado nos níveis de Tuckman</p>
              </div>
              <button 
                onClick={() => triggerToast('Carregando mentoria de dinâmica de equipes...', 'ok')}
                className="rounded-[0.5rem] bg-white/[0.03] border border-white/[0.08] hover:border-[#d4b87a]/35 text-[#d4b87a] px-3 py-1.5 text-[8.5px] font-bold uppercase transition"
              >
                ▶ PROFESSOR IA
              </button>
            </div>

            {/* Sub-tabs Row */}
            <div className="flex gap-1.5 border-b border-white/[0.03] pb-2 overflow-x-auto">
              {[
                { id: 'formar', label: 'Formar & Contrato' },
                { id: 'pessoas', label: 'Pessoas & Perfil' },
                { id: 'influencia', label: 'Influência & Mediação' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setTimeTab(sub.id as TimeSubTab)}
                  className={`px-3 py-1.5 rounded-[0.4rem] text-[9.5px] font-bold font-mono transition-all ${
                    timeTab === sub.id
                      ? 'bg-white/[0.05] text-[#d4b87a] border border-[#d4b87a]/25'
                      : 'bg-transparent text-white/40 hover:text-white/75 border border-transparent'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Sub-view dispatch */}
            <AnimatePresence mode="wait">
              
              {/* SUBVIEW: FORMAR & CONTRATO */}
              {timeTab === 'formar' && (
                <motion.div
                  key="formar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left"
                >
                  {/* Tuckman Stages */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Velocidade Tuckman — Estágios do Time</h4>
                        <p className="text-[9px] text-white/45">Calibre o multiplicador coletivo conforme o nível de maturidade:</p>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center font-mono">
                        {[
                          { id: 'forming', label: 'Forming', val: 'x0.6', color: tuckmanStage === 'forming' ? 'border-[#d4b87a] bg-[#d4b87a]/15 text-[#d4b87a]' : 'border-white/5 bg-black/20 text-white/40' },
                          { id: 'storming', label: 'Storming', val: 'x0.4', color: tuckmanStage === 'storming' ? 'border-[#e24b4a] bg-[#e24b4a]/15 text-[#e24b4a]' : 'border-white/5 bg-black/20 text-white/40' },
                          { id: 'norming', label: 'Norming', val: 'x0.95', color: tuckmanStage === 'norming' ? 'border-[#fac775] bg-[#fac775]/15 text-[#fac775]' : 'border-white/5 bg-black/20 text-white/40' },
                          { id: 'performing', label: 'Performing', val: 'x1.45', color: tuckmanStage === 'performing' ? 'border-[#5dcaa5] bg-[#5dcaa5]/15 text-[#5dcaa5]' : 'border-white/5 bg-black/20 text-white/40' }
                        ].map(stage => (
                          <div 
                            key={stage.id}
                            onClick={() => {
                              setTuckmanStage(stage.id as any)
                              triggerToast(`Estágio Tuckman alterado para ${stage.label}.`)
                            }}
                            className={`p-2.5 border rounded-lg cursor-pointer transition select-none ${stage.color}`}
                          >
                            <b className="text-[10px] block leading-none">{stage.label}</b>
                            <span className="text-[8px] block mt-1">{stage.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Formula result */}
                      <div className="p-3 bg-black/30 border border-white/[0.04] rounded-lg font-mono text-[9.5px] leading-normal text-white/60">
                        <span className="text-[#d4b87a] text-[8px] font-bold block mb-1">PR = ΣPI × T − LG · POTENCIAL REAL</span>
                        <b>POTENCIAL REAL:</b> Potencial calibrado em <b className="text-white">{calculatedPotential}%</b> baseado nos {teamMembers.length} liderados ativos e no multiplicador.
                      </div>

                      {/* HHH parameters */}
                      <div className="border-t border-white/[0.04] pt-3">
                        <span className="text-[8px] font-mono text-[#d4b87a] uppercase tracking-wider block mb-2">HHH Framework (Médio do Time)</span>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                            <span className="text-[8px] text-white/45 block">Smart (Cabeça)</span>
                            <b className="text-sm font-mono text-white mt-1 block">{avgHead}/100</b>
                          </div>
                          <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                            <span className="text-[8px] text-white/45 block">Humble (Coração)</span>
                            <b className="text-sm font-mono text-white mt-1 block">{avgHeart}/100</b>
                          </div>
                          <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                            <span className="text-[8px] text-white/45 block">Hungry (Mãos)</span>
                            <b className="text-sm font-mono text-white mt-1 block">{avgHands}/100</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contrato de Aliança */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Contrato de Aliança</h4>
                        <button 
                          onClick={handleGenerateAllianceContract}
                          className="px-2 py-0.5 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/30 text-[#d4b87a] rounded text-[8px] font-mono"
                        >
                          ✨ GERAR VIA IA
                        </button>
                      </div>
                      
                      <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                        {allianceClauses.map((clause, idx) => (
                          <div key={idx} className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg flex items-center justify-between gap-2 text-[10px]">
                            <span className="text-white/80">{idx + 1} · {clause}</span>
                            <button onClick={() => handleRemoveAllianceClause(idx)} className="text-red-400 hover:text-red-500 font-bold px-1 text-[11px]">✕</button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Adicionar nova cláusula..." 
                          value={newClauseInput}
                          onChange={(e) => setNewClauseInput(e.target.value)}
                          className="flex-1 bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1 text-[9.5px] outline-none focus:border-[#d4b87a]/40"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddAllianceClause()}
                        />
                        <button 
                          onClick={handleAddAllianceClause}
                          className="px-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-[0.4rem] text-[9.5px] font-bold transition"
                        >
                          + ADD
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* SUBVIEW: PESSOAS & PERFIL */}
              {timeTab === 'pessoas' && (
                <motion.div
                  key="pessoas"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left"
                >
                  
                  {/* Algoritmo de Sucessor */}
                  <div className="lg:col-span-6 ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">Algoritmo de Identificação de Sucessor</h4>
                      <p className="text-[9.5px] text-white/40">Parâmetros combinados de D6 + HHH + Propósito</p>
                    </div>

                    <div className="space-y-2">
                      {rankedSuccessors.map((member, i) => (
                        <div key={member.id} className="p-3 bg-black/25 border border-white/[0.04] rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <b className="text-white/45 font-mono text-[10px]">0{i + 1}</b>
                            <div>
                              <b className="text-[10.5px] text-white leading-none block">{member.name}</b>
                              <span className="text-[8.5px] font-mono text-white/40">{member.role}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-[10px] font-mono font-bold text-[#d4b87a] block leading-none">{member.successionScore} pts</span>
                            <span className="text-[8px] text-white/35 block mt-0.5">{member.wishes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profiler detail */}
                  <div className="lg:col-span-6 ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                    <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Ficha de Perfil do Liderado</h4>
                        <p className="text-[9.5px] text-white/40">Visualização unificada de fit cultural</p>
                      </div>
                      
                      <select
                        value={selectedProfileId}
                        onChange={(e) => setSelectedProfileId(e.target.value)}
                        className="bg-black/40 border border-white/[0.08] rounded px-2 py-1 text-[9.5px] text-white outline-none"
                      >
                        {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>

                    {/* Member detail print */}
                    {(() => {
                      const m = teamMembers.find(x => x.id === selectedProfileId)
                      if (!m) return null
                      return (
                        <div className="space-y-3 font-sans text-[10px] text-white/70">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#d4b87a]/15 text-[#d4b87a] border border-[#d4b87a]/30 text-xs font-bold flex items-center justify-center">
                              {m.name.split(' ').map(x => x[0]).join('')}
                            </div>
                            <div>
                              <b className="text-white text-[12px] block leading-none">{m.name}</b>
                              <span className="text-white/45 text-[9px] font-mono block mt-1">{m.role} · Maturidade {m.maturity}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-white/60 bg-black/25 p-2.5 rounded-lg border border-white/[0.03]">
                            <div>D6 Health Index: <b className="text-white">{m.d6}%</b></div>
                            <div>Alinhamento: <b className="text-[#5dcaa5]">{m.status}</b></div>
                            <div>Humble: <b className="text-white">{m.hhh.humble}%</b></div>
                            <div>Hungry: <b className="text-white">{m.hhh.hungry}%</b></div>
                            <div className="col-span-2">Desejo de Carreira: <b className="text-[#fac775]">{m.wishes}</b></div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                </motion.div>
              )}

              {/* SUBVIEW: INFLUÊNCIA & MEDIAÇÃO */}
              {timeTab === 'influencia' && (
                <motion.div
                  key="influencia"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left"
                >
                  
                  {/* Conflict Analyzer Thomas Kilmann */}
                  <div className="lg:col-span-7 ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">Protocolo de Mediação ALX</h4>
                      <p className="text-[9.5px] text-white/40">IA-Assisted Thomas-Kilmann conflict resolver</p>
                    </div>

                    <textarea 
                      value={conflictDesc}
                      onChange={(e) => setConflictDesc(e.target.value)}
                      placeholder="Descreva o conflito ocorrido na equipe de forma extremamente objetiva (ex: Discordância de metodologia de calibração bioneural)..."
                      className="w-full h-20 bg-black/45 border border-white/[0.08] rounded-[0.4rem] p-2.5 text-[10px] text-white outline-none resize-none focus:border-[#d4b87a]/40 transition"
                    />

                    <button 
                      onClick={handleMediationAnalysis}
                      disabled={mediationAnalyzing}
                      className="px-3.5 py-1.5 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/45 rounded-lg text-[9px] font-bold text-[#d4b87a] font-mono transition disabled:opacity-50"
                    >
                      {mediationAnalyzing ? 'Processando Estruturas...' : '🪄 ANALISAR COM IA'}
                    </button>

                    {mediationResult && (
                      <pre className="p-3 bg-black/40 border border-white/[0.06] rounded-lg font-mono text-[9px] leading-relaxed text-white/70 overflow-x-auto whitespace-pre-wrap">
                        {mediationResult}
                      </pre>
                    )}
                  </div>

                  {/* Small Matrix Info */}
                  <div className="lg:col-span-5 ipb-soft p-4 rounded-xl border border-white/[0.03]">
                    <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase font-mono mb-2">Thomas-Kilmann Styles</h4>
                    <p className="text-[9px] text-white/45 mb-3">5 estilos de resolução para calibração</p>
                    
                    <div className="space-y-1.5 font-sans text-[9px] text-white/60">
                      <div className="p-1.5 bg-white/[0.01] border border-white/[0.03] rounded"><b>Competição:</b> Alta assertividade, baixa cooperação.</div>
                      <div className="p-1.5 bg-white/[0.01] border border-white/[0.03] rounded"><b>Colaboração:</b> Alta assertividade, alta cooperação. Win-win.</div>
                      <div className="p-1.5 bg-white/[0.01] border border-white/[0.03] rounded"><b>Compromisso:</b> Equilíbrio sutil de concessões.</div>
                      <div className="p-1.5 bg-white/[0.01] border border-white/[0.03] rounded"><b>Acomodação:</b> Baixa assertividade, alta cooperação.</div>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}

        {/* ================= EMPRESA TAB ================= */}
        {activeTab === 'empresa' && (
          <motion.div
            key="empresa"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="ipb-soft p-5 rounded-[1.2rem] space-y-4"
          >
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 font-mono">EMPRESA · ESTRATÉGICO</span>
                <h3 className="text-sm font-bold text-white/90 leading-none mt-0.5 font-sans">Mapeamento Corporativo &amp; BI</h3>
                <p className="text-[9.5px] text-white/40 mt-1 font-sans">OKRs trimestrais + Clima Organizacional + Auditoria de Canais</p>
              </div>
              <button 
                onClick={() => triggerToast('Carregando mentoria estratégica executiva...', 'ok')}
                className="rounded-[0.5rem] bg-white/[0.03] border border-white/[0.08] hover:border-[#d4b87a]/35 text-[#d4b87a] px-3 py-1.5 text-[8.5px] font-bold uppercase transition"
              >
                ▶ PROFESSOR IA
              </button>
            </div>

            {/* Sub-tabs Row */}
            <div className="flex gap-1.5 border-b border-white/[0.03] pb-2 overflow-x-auto">
              {[
                { id: 'estrategia', label: 'Estratégia & OKRs' },
                { id: 'bi', label: 'BI & Clima' },
                { id: 'relatorio', label: 'Relatório Mensal' },
                { id: 'canais', label: 'Canais & Ruído' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setEmpresaTab(sub.id as EmpresaSubTab)}
                  className={`px-3 py-1.5 rounded-[0.4rem] text-[9.5px] font-bold font-mono transition-all ${
                    empresaTab === sub.id
                      ? 'bg-white/[0.05] text-[#d4b87a] border border-[#d4b87a]/25'
                      : 'bg-transparent text-white/40 hover:text-white/75 border border-transparent'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              
              {/* SUBVIEW: ESTRATÉGIA & OKRS */}
              {empresaTab === 'estrategia' && (
                <motion.div
                  key="estrategia"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left"
                >
                  {/* Left: OKR list and add */}
                  <div className="lg:col-span-7 ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">OKRs Trimestrais · Q2 2026</h4>
                        <p className="text-[9px] text-white/40">41 dias restantes · Q2 consolidado</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {okrs.map(okr => (
                        <div key={okr.id} className="p-3 bg-black/25 border border-white/[0.04] rounded-lg space-y-2">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-white/95">{okr.title}</span>
                            <span className="font-mono text-[#d4b87a]">{okr.progress}%</span>
                          </div>
                          <span className="text-[8px] font-mono text-white/40 block leading-tight">{okr.keyResults}</span>
                          <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#d4b87a] to-white rounded-full transition-all duration-300" style={{ width: `${okr.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* OKR add form */}
                    <div className="border-t border-white/[0.04] pt-3 space-y-2">
                      <span className="text-[8px] font-mono text-[#d4b87a] uppercase tracking-wider block">Criar Novo OKR Estratégico</span>
                      <input 
                        type="text" 
                        placeholder="Objetivo principal (ex: Reduzir churn em 10%)..." 
                        value={newOkrTitle}
                        onChange={(e) => setNewOkrTitle(e.target.value)}
                        className="w-full bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1 text-[9.5px] outline-none"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Key Results (ex: KR1: LTV > 12 meses, KR2: zero bugs)..." 
                          value={newOkrKr}
                          onChange={(e) => setNewOkrKr(e.target.value)}
                          className="flex-1 bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1 text-[9.5px] outline-none"
                        />
                        <button 
                          onClick={handleAddOkr}
                          className="px-3 bg-[#d4b87a]/20 border border-[#d4b87a]/30 hover:bg-[#d4b87a]/30 rounded-[0.4rem] text-[9.5px] font-bold text-[#d4b87a]"
                        >
                          DEFINIR
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: strategic info bank */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                      <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase font-mono">Banco de Estratégias</h4>
                      <div className="space-y-1.5 font-sans text-[9px] text-white/50">
                        <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded"><b>D6 Diagnóstico:</b> Visão cruzada 360 do time em 6 dimensões de saúde.</div>
                        <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded"><b>eNPS Clima:</b> Frequência mensal de contentamento e disposição de indicar a equipe.</div>
                        <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded"><b>ISR Score:</b> Relação de impacto e reconhecimento individual do colaborador.</div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* SUBVIEW: BI & CLIMA */}
              {empresaTab === 'bi' && (
                <motion.div
                  key="bi"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left"
                >
                  
                  {/* Climate ROI Calculator */}
                  <div className="lg:col-span-8 ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">ROI do Clima Organizacional (Custo Oculto)</h4>
                      <p className="text-[9.5px] text-white/40">Estresses, ruídos e retrabalhos geram latência. Meça os custos ocultos sistêmicos:</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Salário Médio (R$)</label>
                        <input 
                          type="number" 
                          value={climateSalary}
                          onChange={(e) => setClimateSalary(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Latência Executiva (%)</label>
                        <input 
                          type="number" 
                          value={climateLatency}
                          onChange={(e) => setClimateLatency(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1 text-[10px] text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Taxa de Retrabalho (%)</label>
                        <input 
                          type="number" 
                          value={climateRework}
                          onChange={(e) => setClimateRework(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1 text-[10px] text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Risco de Turnover (%)</label>
                        <input 
                          type="number" 
                          value={climateTurnover}
                          onChange={(e) => setClimateTurnover(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1 text-[10px] text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-lg flex justify-between items-center">
                      <div>
                        <span className="text-[8.5px] font-mono text-white/45 block">Custo Oculto Estimado / Mês</span>
                        <b className="text-lg font-mono text-red-400">R$ {climateHiddenCost}</b>
                      </div>
                      <span className="text-[9.5px] font-mono text-white/30 uppercase tracking-wide">Turnover + Risco real</span>
                    </div>
                  </div>

                  {/* eNPS consolidated gauge */}
                  <div className="lg:col-span-4 ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                    <h4 className="text-[11px] font-bold text-white uppercase font-mono">Consolidado eNPS</h4>
                    
                    <div className="p-5 bg-black/35 rounded-lg border border-white/[0.03] text-center space-y-1">
                      <span className="text-[8px] font-mono text-[#5dcaa5] uppercase block">Zona de Calibração</span>
                      <b className="text-3xl font-mono text-[#5dcaa5]">+74</b>
                      <span className="text-[8px] text-white/45 block mt-1 font-mono">{teamMembers.length} respostas válidas</span>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* SUBVIEW: RELATÓRIO MENSAL */}
              {empresaTab === 'relatorio' && (
                <motion.div
                  key="relatorio"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ipb-soft p-5 rounded-xl border border-white/[0.03] text-left space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">Relatório Executivo Consolidador</h4>
                      <p className="text-[9px] text-white/45 font-sans">Compilação estratégica gerada com base nas interações reais da plataforma</p>
                    </div>
                    <button 
                      onClick={() => window.print()}
                      className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white rounded text-[8.5px] font-mono font-bold transition"
                    >
                      IMPRIMIR RELATÓRIO
                    </button>
                  </div>

                  <div className="p-3 bg-black/30 rounded-lg text-[9.5px] font-mono leading-relaxed text-white/75 space-y-2">
                    <span className="text-[#d4b87a] font-bold block">✓ CONSOLIDAÇÃO COCKPIT · MAIO DE 2026</span>
                    <p>Total de Liderados Habilitados: {teamMembers.length} (Rodrigo Silva, Juliana Mendes, Lucas Alencar...)</p>
                    <p>D6 Coletivo Médio: {Math.round(teamMembers.reduce((s, m) => s + m.d6, 0) / teamMembers.length)}% | Saúde e Conflitos Controlados</p>
                    <p>OKRs Consolidados Ativos: {okrs.length} objetivos estratégicos em calibração trimestral.</p>
                    <p>Estrutura de Liderança Situacional ativa (ROI Opportunity = R$ {Math.round(opportunityRoi)}/mês de valor retornado).</p>
                  </div>
                </motion.div>
              )}

              {/* SUBVIEW: CANAIS & RUÍDO */}
              {empresaTab === 'canais' && (
                <motion.div
                  key="canais"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left"
                >
                  
                  {/* Channels noise calculator */}
                  <div className="lg:col-span-8 ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">Score de Ruído de Canais</h4>
                      <p className="text-[9.5px] text-white/40 font-sans">Análise cruzada de complexidade da mensagem contra a sincronia do meio</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Complexidade da Mensagem</label>
                        <select 
                          value={msgComplexity}
                          onChange={(e) => setMsgComplexity(parseInt(e.target.value) as any)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1 text-[10px] text-white outline-none"
                        >
                          <option value="1">1: Baixa (Transacional / Aviso simples)</option>
                          <option value="2">2: Média (Definição / Alinhamento tático)</option>
                          <option value="3">3: Alta (Feedback SBI / Alinhamento de propósito / Demissão)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Canal Utilizado</label>
                        <select 
                          value={channelUsed}
                          onChange={(e) => setChannelUsed(e.target.value)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1 text-[10px] text-white outline-none"
                        >
                          <option value="slack">Slack / Chat escrito (Assíncrono)</option>
                          <option value="email">E-mail escrito (Assíncrono)</option>
                          <option value="doc">Dashboard central / Doc central (Assíncrono)</option>
                          <option value="11">Reunião 1:1 estruturada (Síncrono)</option>
                          <option value="video">Chamada de vídeo rápida (Síncrono)</option>
                          <option value="presencial">Reunião presencial (Síncrono)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-black/35 rounded-lg border border-white/[0.03] flex justify-between items-center">
                      <div>
                        <span className="text-[8.5px] font-mono text-white/45 block">Índice de Ruído Calculado</span>
                        <b className={`text-lg font-mono ${noiseScore > 70 ? 'text-red-400' : 'text-[#5dcaa5]'}`}>{noiseScore}%</b>
                      </div>
                      <span className="text-[9px] font-mono text-white/50">{channelFeedback}</span>
                    </div>
                  </div>

                  {/* C2 Communication Styles */}
                  <div className="lg:col-span-4 ipb-soft p-4 rounded-xl border border-white/[0.03] space-y-3">
                    <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase font-mono">C² Communication Matrix</h4>
                    
                    <div className="space-y-1.5 font-sans text-[8.5px] text-white/60">
                      <div className="p-1 bg-white/[0.01] border border-white/[0.03] rounded"><b>Direto:</b> Objetivo e focado em fatos. Indicado para M3/M4.</div>
                      <div className="p-1 bg-white/[0.01] border border-white/[0.03] rounded"><b>Analítico:</b> Data-driven, focado em métricas.</div>
                      <div className="p-1 bg-white/[0.01] border border-white/[0.03] rounded"><b>Relacional:</b> Empático, focado na calibração emocional.</div>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
