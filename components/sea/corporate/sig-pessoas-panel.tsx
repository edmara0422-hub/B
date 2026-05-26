'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, CheckSquare, Square, ChevronDown, ChevronUp, UserCheck, 
  BookOpen, AlertCircle, Play, Plus, Trash2, Activity, ShieldAlert, 
  FileText, Users, Award, Compass, Cpu, Zap, BarChart3, Search, Undo2 
} from 'lucide-react'

type TabOption = 'home' | 'lideres' | 'time' | 'empresa'
type LideresSubTab = 'recrutar' | 'gerir' | 'delegar' | 'voce'
type TimeSubTab = 'formar' | 'pessoas' | 'influencia'
type EmpresaSubTab = 'diagnostico' | 'estrategia' | 'bi' | 'relatorio' | 'canais'

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
  const [lideresTab, setLideresTab] = useState<LideresSubTab>('voce')
  const [timeTab, setTimeTab] = useState<TimeSubTab>('formar')
  const [empresaTab, setEmpresaTab] = useState<EmpresaSubTab>('diagnostico')

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

      <style dangerouslySetInnerHTML={{ __html: `
        /* Custom Pessoas Styles from Approved Mockup */
        .tab-pessoas-row {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          padding: 4px;
          background: rgba(10, 10, 10, 0.5) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 9px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0,0,0,0.3) !important;
          backdrop-filter: blur(12px);
          width: 100%;
        }
        .tab-p-btn {
          flex: 1;
          padding: 10px 14px;
          background: transparent;
          border: 0.2px solid transparent;
          color: #8a9098;
          font-family: inherit;
          font-size: 11.5px;
          font-weight: 500;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
          text-align: left;
        }
        .tab-sub {
          font-size: 9px;
          color: #cbd5e1;
          font-weight: 400;
          letter-spacing: 0.02em;
          opacity: 0.7;
        }
        .tab-p-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.04);
        }
        .tab-p-btn.active {
          color: #d4b87a !important;
          background: linear-gradient(180deg, rgba(30, 25, 18, 0.75) 0%, rgba(18, 15, 10, 0.85) 100%) !important;
          border: 0.2px solid #d4b87a !important;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.2), inset 0 1px 0 rgba(212, 184, 122, 0.12), 0 0 18px rgba(212, 184, 122, 0.25) !important;
          font-weight: 600;
        }
        .btn-professor-ia {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 12px; background: rgba(212,184,122,0.08);
          border: 0.2px solid rgba(212,184,122,0.25); border-radius: 8px;
          color: #d4b87a; font-family: inherit; font-size: 9.5px; font-weight: 600;
          cursor: pointer; transition: all 0.2s; letter-spacing: 0.04em;
          align-self: center;
        }
        .btn-professor-ia:hover { background: rgba(212,184,122,0.14); border-color: rgba(212,184,122,0.4); }

        /* Dashboard layout elements */
        .home-dashboard {
          display: flex; flex-direction: column; gap: 18px;
          padding: 10px 0px 40px;
        }
        .home-row { display: grid; gap: 16px; }
        .home-row.cols-2 { grid-template-columns: 1fr 1fr; }
        .home-row.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
        .home-row.cols-4 { grid-template-columns: repeat(4, 1fr); }
        .home-row.full { grid-template-columns: 1fr; }
        .home-row.split-6040 { grid-template-columns: 1.5fr 1fr; }

        @media (max-width: 1024px) {
          .home-row.split-6040, .home-row.cols-2, .home-row.cols-3, .home-row.cols-4 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .tab-pessoas-row {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            gap: 4px !important;
            width: 100% !important;
            scrollbar-width: none !important;
            padding: 3px !important;
          }
          .tab-pessoas-row::-webkit-scrollbar {
            display: none !important;
          }
          .tab-p-btn {
            flex-shrink: 0 !important;
            flex-grow: 0 !important;
            width: 120px !important;
            padding: 6px 8px !important;
            font-size: 10px !important;
          }
          .tab-sub {
            font-size: 7.5px !important;
          }
          .btn-professor-ia {
            flex-shrink: 0 !important;
            padding: 6px 10px !important;
            font-size: 8.5px !important;
          }
        }

        .dash-card {
          background: rgba(5, 5, 5, 0.45) !important;
          backdrop-filter: blur(28px) saturate(130%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
          border: none !important;
          border-radius: 14px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(0, 0, 0, 0.85),
            0 12px 40px rgba(0, 0, 0, 0.75) !important;
          transition: all .3s cubic-bezier(.22,.61,.36,1);
        }
        .dash-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(212, 184, 122, 0.12) 100%) !important;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          -webkit-mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .dash-card:hover {
          background: rgba(10, 10, 12, 0.55) !important;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 16px 48px rgba(0, 0, 0, 0.85),
            0 0 25px rgba(255, 255, 255, 0.05) !important;
          transform: translateY(-2.5px);
        }

        /* 6D Dimension Cards (Glowing custom borders & shadows) */
        .dash-card-d1::before {
          background: linear-gradient(135deg, rgba(93, 202, 165, 0.45) 0%, rgba(5, 5, 5, 0.6) 100%) !important;
        }
        .dash-card-d1:hover {
          background: rgba(93, 202, 165, 0.04) !important;
          box-shadow: 
            inset 0 1px 0 rgba(93, 202, 165, 0.25),
            0 16px 48px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(93, 202, 165, 0.15) !important;
        }

        .dash-card-d2::before {
          background: linear-gradient(135deg, rgba(250, 199, 117, 0.45) 0%, rgba(5, 5, 5, 0.6) 100%) !important;
        }
        .dash-card-d2:hover {
          background: rgba(250, 199, 117, 0.04) !important;
          box-shadow: 
            inset 0 1px 0 rgba(250, 199, 117, 0.25),
            0 16px 48px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(250, 199, 117, 0.15) !important;
        }

        .dash-card-d3::before {
          background: linear-gradient(135deg, rgba(226, 75, 74, 0.45) 0%, rgba(5, 5, 5, 0.6) 100%) !important;
        }
        .dash-card-d3:hover {
          background: rgba(226, 75, 74, 0.04) !important;
          box-shadow: 
            inset 0 1px 0 rgba(226, 75, 74, 0.25),
            0 16px 48px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(226, 75, 74, 0.15) !important;
        }

        .dash-card-d4::before {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.45) 0%, rgba(5, 5, 5, 0.6) 100%) !important;
        }
        .dash-card-d4:hover {
          background: rgba(59, 130, 246, 0.04) !important;
          box-shadow: 
            inset 0 1px 0 rgba(59, 130, 246, 0.25),
            0 16px 48px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(59, 130, 246, 0.15) !important;
        }

        .dash-card-d5::before {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.45) 0%, rgba(5, 5, 5, 0.6) 100%) !important;
        }
        .dash-card-d5:hover {
          background: rgba(14, 165, 233, 0.04) !important;
          box-shadow: 
            inset 0 1px 0 rgba(14, 165, 233, 0.25),
            0 16px 48px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(14, 165, 233, 0.15) !important;
        }

        .dash-card-d6::before {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.45) 0%, rgba(5, 5, 5, 0.6) 100%) !important;
        }
        .dash-card-d6:hover {
          background: rgba(168, 85, 247, 0.04) !important;
          box-shadow: 
            inset 0 1px 0 rgba(168, 85, 247, 0.25),
            0 16px 48px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(168, 85, 247, 0.15) !important;
        }

        .dash-card-radar::before {
          background: linear-gradient(135deg, rgba(212, 184, 122, 0.5) 0%, rgba(5, 5, 5, 0.6) 100%) !important;
        }
        .dash-card-radar:hover {
          background: rgba(212, 184, 122, 0.04) !important;
          box-shadow: 
            inset 0 1px 0 rgba(212, 184, 122, 0.25),
            0 16px 48px rgba(0, 0, 0, 0.85),
            0 0 35px rgba(212, 184, 122, 0.2) !important;
        }

        .panel-label {
          font-family: inherit; font-size: 8px; letter-spacing: 0.12em;
          color: #b8975a; text-transform: uppercase;
          border: 0.2px solid rgba(212,184,122,0.15); padding: 2px 8px; border-radius: 4px;
          background: rgba(212,184,122,0.04); display: inline-block; margin-bottom: 6px;
        }
        .panel-title {
          font-family: inherit; font-size: 14px; font-weight: 500; color: #f3f5f8; margin: 0;
        }
        .panel-sub {
          font-family: inherit; font-size: 9px; color: #8a9098; margin-top: 2px;
        }

        /* Radar layout classes */
        .vc-d-dots { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
        .vc-dot {
          display: flex; align-items: center; gap: 5px; padding: 4px 10px 4px 6px;
          border: 0.2px solid rgba(255,255,255,0.08); border-radius: 20px;
          font-family: inherit; font-size: 10px; cursor: pointer; transition: all 0.2s;
          background: rgba(255,255,255,0.02);
        }
        .vc-dot .dot-circle {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.25); transition: all 0.2s;
        }
        .vc-dot.active { border-color: rgba(212,184,122,0.4); background: rgba(212,184,122,0.06); color: #d4b87a; }
        .vc-dot.active .dot-circle { background: #d4b87a; box-shadow: 0 0 6px rgba(212,184,122,0.6); }
        .vc-dot:hover { border-color: rgba(255,255,255,0.15); }
        .vc-saude-bar { margin-top: 12px; }
        .vc-saude-bar .lbl { font-size: 9px; color: #8a9098; margin-bottom: 4px; font-family: inherit; text-transform: uppercase; letter-spacing: 0.05em; }
        .vc-bar-track { height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
        .vc-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #b8975a, #d4b87a, #e0c887); transition: width 0.8s ease-out; }
        .btn-reset-sm {
          padding: 5px 10px; border: 0.2px solid rgba(255,255,255,0.1); border-radius: 6px;
          font-family: inherit; font-size: 9px; color: #8a9098;
          background: transparent; cursor: pointer; transition: all 0.2s;
        }
        .btn-reset-sm:hover { color: #f3f5f8; border-color: rgba(255,255,255,0.2); }

        /* Block Status elements */
        .blocos-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; }
        @media (max-width: 768px) {
          .blocos-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .bloco-item {
          padding: 12px 14px; border-radius: 10px;
          border: 0.2px solid rgba(212, 184, 122, 0.12) !important;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          cursor: pointer; transition: all 0.2s;
          display: flex; flex-direction: column; gap: 4px;
          text-align: left;
        }
        .bloco-item:hover { border-color: rgba(212,184,122,0.35) !important; background: rgba(15, 15, 18, 0.55) !important; transform: translateY(-1px); }
        .bloco-item .b-code { font-family: inherit; font-size: 8px; color: #b8975a; letter-spacing: 0.1em; text-transform: uppercase; }
        .bloco-item .b-name { font-size: 12px; font-weight: 600; color: #f3f5f8; }
        .bloco-item .b-sub { font-size: 9px; color: #8a9098; }
        .bloco-item .b-status { font-family: inherit; font-size: 8px; margin-top: 4px; padding: 2px 6px; border-radius: 3px; display: inline-block; align-self: flex-start; }
        .bloco-item .b-status.ok { color: #5dcaa5; background: rgba(93,202,165,0.1); border: 0.2px solid rgba(93,202,165,0.2); }
        .bloco-item .b-status.warn { color: #fac775; background: rgba(250,199,117,0.1); border: 0.2px solid rgba(250,199,117,0.2); }
        .bloco-item .b-status.idle { color: #8a9098; background: rgba(255,255,255,0.03); border: 0.2px solid rgba(255,255,255,0.08); }

        /* Political Map Influencia */
        .mapa-container { position: relative; margin-top: 12px; }
        .mapa-svg-wrap { position: relative; aspect-ratio: 1.5; width: 100%; }
        .mapa-svg-wrap svg { width: 100%; height: 100%; }
        .mapa-quadrant-lbl {
          position: absolute; font-family: inherit; font-size: 8px;
          text-transform: uppercase; letter-spacing: 0.07em;
          padding: 2px 6px; border-radius: 3px; pointer-events: none;
        }
        .mapa-quadrant-lbl.top-right { top: 5px; right: 5px; color: #5dcaa5; background: rgba(93,202,165,0.08); }
        .mapa-quadrant-lbl.top-left { top: 5px; left: 5px; color: #fac775; background: rgba(250,199,117,0.08); }
        .mapa-quadrant-lbl.bot-right { bottom: 5px; right: 5px; color: #b8975a; background: rgba(212,184,122,0.08); }
        .mapa-quadrant-lbl.bot-left { bottom: 5px; left: 5px; color: #e24b4a; background: rgba(226,75,74,0.08); }
        .mapa-empty-msg {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          font-family: inherit; font-size: 9px; color: #8a9098;
          text-align: center; pointer-events: none;
        }

        /* Profile & Roles */
        .voce-role-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
        .role-card {
          padding: 14px; border-radius: 10px;
          border: 0.2px solid rgba(212, 184, 122, 0.12) !important;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          cursor: pointer; transition: all 0.2s;
          display: flex; flex-direction: column; gap: 3px;
          text-align: left;
        }
        .role-card:hover { border-color: rgba(212, 184, 122, 0.35) !important; background: rgba(15, 15, 18, 0.55) !important; }
        .role-card.active { border-color: rgba(212, 184, 122, 0.4) !important; background: rgba(212, 184, 122, 0.08) !important; }
        .role-card .rc-label { font-family: inherit; font-size: 8px; color: #b8975a; letter-spacing: 0.08em; text-transform: uppercase; }
        .role-card .rc-title { font-size: 12px; font-weight: 600; color: #f3f5f8; }
        .role-card .rc-sub { font-size: 9px; color: #8a9098; }

        .manifesto-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .manifesto-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          border: 0.2px solid rgba(212, 184, 122, 0.12) !important;
          border-radius: 8px;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          transition: all 0.2s;
          text-align: left;
        }
        .manifesto-item:hover { border-color: rgba(212, 184, 122, 0.35) !important; background: rgba(15, 15, 18, 0.55) !important; }
        .manifesto-item .m-code {
          font-family: inherit; font-size: 9px; color: #d4b87a;
          background: rgba(212,184,122,0.1); border: 0.2px solid rgba(212,184,122,0.2);
          padding: 2px 6px; border-radius: 4px; flex-shrink: 0; font-weight: 700;
        }
        .manifesto-item .m-text { font-size: 10.5px; color: #8a9098; flex: 1; line-height: 1.4; }
        .manifesto-item .m-val {
          font-family: inherit; font-size: 10px; color: #8a9098;
          flex-shrink: 0; font-style: italic;
        }
        .manifesto-item.done .m-text { color: #f3f5f8; }
        .manifesto-item.done .m-val { color: #5dcaa5; }

        /* Steps */
        .primeiros-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .passo-item {
          display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px;
          border: 0.2px solid rgba(212, 184, 122, 0.12) !important;
          border-radius: 10px;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          cursor: pointer; transition: all 0.2s;
          text-align: left;
        }
        .passo-item:hover { border-color: rgba(212, 184, 122, 0.35) !important; background: rgba(15, 15, 18, 0.55) !important; }
        .passo-item .p-num {
          width: 22px; height: 22px; border-radius: 50%; border: 0.2px solid rgba(212,184,122,0.3);
          display: flex; align-items: center; justify-content: center;
          font-family: inherit; font-size: 10px; color: #d4b87a; flex-shrink: 0; font-weight: 700;
        }
        .passo-item .p-body { flex: 1; }
        .passo-item .p-title { font-size: 11px; font-weight: 600; color: #f3f5f8; display: block; margin-bottom: 2px; }
        .passo-item .p-title.done { text-decoration: line-through; opacity: 0.45; }
        .passo-item .p-desc { font-size: 9.5px; color: #8a9098; line-height: 1.4; }
        .passo-item .p-arrow { color: #d4b87a; font-size: 14px; flex-shrink: 0; align-self: center; }

        /* Telemetry blocks & okr nav */
        .blocos-nav-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 12px; }
        @media (max-width: 768px) {
          .blocos-nav-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .bloco-nav-card {
          padding: 18px 14px; border-radius: 12px;
          border: 0.2px solid rgba(212, 184, 122, 0.12) !important;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          cursor: pointer; transition: all 0.25s;
          display: flex; flex-direction: column; gap: 4px;
          text-align: left;
        }
        .bloco-nav-card:hover { border-color: rgba(212, 184, 122, 0.35) !important; background: rgba(15, 15, 18, 0.55) !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .bloco-nav-card .bnc-icon { font-size: 22px; margin-bottom: 6px; }
        .bloco-nav-card .bnc-title { font-size: 11.5px; font-weight: 600; color: #f3f5f8; }
        .bloco-nav-card .bnc-sub { font-size: 9px; color: #8a9098; }
        .bloco-nav-card .bnc-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
        .bloco-nav-card .bnc-tag {
          font-family: inherit; font-size: 8px; color: #8a9098;
          border: 0.2px solid rgba(255,255,255,0.07); padding: 1px 5px; border-radius: 3px;
        }
        .bloco-nav-card .bnc-count {
          font-family: inherit; font-size: 10px; color: #8a9098;
          margin-top: 8px; padding-top: 8px; border-top: 0.2px solid rgba(255,255,255,0.05);
        }

        /* Twinkle & Pulso Rating styles */
        .pulso-semana-badge {
          padding: 4px 8px; border-radius: 4px; background: rgba(212,184,122,0.15);
          color: #d4b87a; border: 0.2px solid rgba(212,184,122,0.25); font-family: inherit; font-size: 8.5px;
        }
        .pulso-rating-row { display: flex; gap: 8px; margin-top: 6px; }
        .pulso-btn {
          flex: 1; text-align: center; padding: 6px 0; border-radius: 6px;
          border: 0.2px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.3);
          font-family: inherit; font-size: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s;
          color: #8a9098;
        }
        .pulso-btn:hover { border-color: rgba(255,255,255,0.15); color: #fff; }
        .pulso-btn.active {
          background: rgba(212,184,122,0.20) !important; border-color: #d4b87a !important; color: #d4b87a !important;
          box-shadow: 0 0 8px rgba(212,184,122,0.2);
        }
        .pulso-input-area {
          width: 100%; height: 44px; background: rgba(0,0,0,0.4); border: 0.2px solid rgba(255,255,255,0.08);
          border-radius: 8px; padding: 10px; font-family: inherit; font-size: 10.5px; color: #fff;
          outline: none; resize: none; margin-top: 6px; transition: border-color 0.2s;
        }
        .pulso-input-area:focus { border-color: rgba(212,184,122,0.4); }
        .btn-pulso-save {
          width: 100%; padding: 10px; border-radius: 8px; background: rgba(212,184,122,0.15);
          border: 0.2px solid rgba(212,184,122,0.4); color: #d4b87a; font-family: inherit; font-size: 10px;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer;
          transition: all 0.2s; margin-top: 14px;
        }
        .btn-pulso-save:hover { background: rgba(212,184,122,0.3); border-color: #d4b87a; }

        /* Candidate cards & layouts */
        .cand-card-mockup {
          background: rgba(10, 10, 12, 0.40) !important;
          border: 0.2px solid rgba(212, 184, 122, 0.12) !important;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 16px;
          backdrop-filter: blur(28px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.5) !important;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0 !important;
          text-align: left;
        }
        .cand-card-mockup::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212, 184, 122, 0.2) 20%, rgba(255, 255, 255, 0.4) 50%, rgba(212, 184, 122, 0.2) 80%, transparent 100%);
          pointer-events: none;
        }
        .cand-card-mockup:hover {
          border-color: rgba(212, 184, 122, 0.35) !important;
          background: rgba(15, 15, 18, 0.55) !important;
          transform: translateY(-2px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.10), 0 16px 36px rgba(0, 0, 0, 0.6) !important;
        }
        .cand-card-mockup .header-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cand-card-mockup .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #8a9098 0%, #ffffff 50%, #64748b 100%) border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          color: #d4b87a;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.15), inset 0 0 4px rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
        }
        .cand-card-mockup .info-col {
          flex: 1;
          min-width: 0;
        }
        .cand-card-mockup .name {
          font-size: 13px;
          font-weight: 700;
          color: #d4b87a;
          display: block;
        }
        .cand-card-mockup .subtext {
          font-size: 9px;
          color: #cbd5e1;
          letter-spacing: 0.02em;
        }
        .hhs-bar-mockup {
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          margin: 12px 0;
          overflow: hidden;
        }
        .hhs-bar-mockup i {
          display: block;
          height: 100%;
          background: linear-gradient(135deg, #8a9098 0%, #e2e8f0 25%, #ffffff 50%, #cbd5e1 75%, #64748b 100%);
          box-shadow: 0 0 8px rgba(255,255,255,0.5);
        }
        .cand-card-mockup .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          font-size: 8.5px;
          padding-top: 8px;
          position: relative;
          margin-top: 4px;
        }
        .cand-card-mockup .stats-row::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.22) 20%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.22) 80%, rgba(255, 255, 255, 0.02) 100%);
          pointer-events: none;
        }
        .cand-card-mockup .stats-row .item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 4px;
        }
        .cand-card-mockup .stats-row .item span {
          color: #94a3b8;
          letter-spacing: 0.03em;
        }
        .cand-card-mockup .stats-row .item b {
          color: #ffffff;
          font-weight: 700;
          text-shadow: 0 0 4px rgba(255, 255, 255, 0.15);
        }
        .cand-card-mockup .stats-row .item b small {
          color: #5dcaa5;
          margin-left: 2px;
          font-weight: bold;
        }
        .btn-onboard {
          margin-top: 14px;
          padding: 10px 14px;
          background: linear-gradient(135deg, #d4b87a 0%, #b8975a 100%) !important;
          border: none !important;
          color: #0f0d09 !important;
          font-family: inherit;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(212, 184, 122, 0.25);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          text-align: center;
          width: 100%;
        }
        .btn-onboard:hover {
          filter: brightness(1.15) !important;
          box-shadow: 0 6px 20px rgba(212, 184, 122, 0.4) !important;
          transform: translateY(-1px);
        }
        .btn-onboard:active {
          transform: scale(0.97);
        }
        .btn-del-cand {
          position: absolute; top: 10px; right: 10px;
          width: 20px; height: 20px; border-radius: 50%;
          border: 0.2px solid rgba(200,205,215,0.15);
          background: rgba(255,255,255,0.02);
          color: rgba(200,205,215,0.35);
          font-size: 11px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; font-family: inherit;
        }
        .btn-del-cand:hover {
          background: rgba(226,75,74,0.12);
          border-color: rgba(226,75,74,0.35);
          color: #e24b4a;
        }
        .btn-reset-fake {
          display: flex; align-items: center; gap: 5px;
          padding: 5px 10px;
          border: 0.2px solid rgba(200,205,215,0.15);
          border-radius: 6px;
          background: rgba(255,255,255,0.02);
          color: #8a9098;
          font-family: inherit; font-size: 8.5px;
          cursor: pointer; transition: all 0.2s;
          letter-spacing: 0.04em;
        }
        .btn-reset-fake:hover {
          border-color: rgba(226,75,74,0.3);
          color: #e24b4a;
          background: rgba(226,75,74,0.06);
        }

        /* Nested Sub-tabs for leaders, time, and company */
        .tab-lideres-row, .tab-time-row, .tab-empresa-row {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          border-bottom: 0.2px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 10px;
          flex-wrap: wrap;
        }
        .sub-tab-btn {
          background: rgba(255, 255, 255, 0.02) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.08) !important;
          color: #8a9098 !important;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sub-tab-btn:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
        .sub-tab-btn.active {
          background: rgba(212, 184, 122, 0.08) !important;
          border-color: rgba(212, 184, 122, 0.5) !important;
          box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.15), 0 2px 8px rgba(212, 184, 122, 0.1) !important;
          color: #d4b87a !important;
          font-weight: 600;
        }

        .p-sub-view {
          display: none;
        }
        .p-sub-view.active {
          display: block;
          animation: fadeInSubView 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes fadeInSubView {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Interactive lessons */
        .interactive-lesson {
          background: rgba(255, 255, 255, 0.02) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 8px;
          padding: 10px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 8px;
          text-align: left;
        }
        .interactive-lesson:hover {
          border-color: rgba(255, 255, 255, 0.12) !important;
          background: rgba(255, 255, 255, 0.04) !important;
        }
        .interactive-lesson .lesson-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .interactive-lesson .lesson-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, margin-top 0.3s ease;
          font-size: 10px;
          color: #cbd5e1;
          line-height: 1.4;
        }
        .interactive-lesson.expanded .lesson-body {
          max-height: 200px;
          margin-top: 8px;
        }

        /* CNV Linter & General forms */
        .cnv-text-area {
          width: 100%;
          height: 70px;
          background: rgba(0, 0, 0, 0.25) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 6px;
          padding: 10px;
          font-family: inherit;
          font-size: 10.5px;
          color: #fff;
          outline: none;
          resize: none;
          transition: border-color 0.2s;
        }
        .cnv-text-area:focus {
          border-color: rgba(212, 184, 122, 0.4) !important;
        }

        /* ROI calculators inputs */
        .calc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .calc-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }
        .calc-input-group label {
          font-size: 8.5px;
          font-family: inherit;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .calc-input-group input, .calc-input-group select {
          background: rgba(0, 0, 0, 0.25) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 6px;
          padding: 6px 10px;
          font-size: 10px;
          color: #fff;
          outline: none;
        }
        .calc-input-group input:focus, .calc-input-group select:focus {
          border-color: rgba(212, 184, 122, 0.4) !important;
        }
      `}} />

      {/* Tabs HUD Header (Mockup exact replica) */}
      <div className="tab-pessoas-row">
        {[
          { id: 'home', label: 'Home', sub: 'panorama cruzado' },
          { id: 'lideres', label: 'Líderes / Gestores', sub: 'Liderança · Gerir · Delegar' },
          { id: 'time', label: 'Time', sub: 'demais equipes · Formar' },
          { id: 'empresa', label: 'Empresa', sub: 'Estratégia · BI · Canais' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as TabOption)}
            className={`tab-p-btn ${activeTab === t.id ? 'active' : ''}`}
          >
            {t.label} <span className="tab-sub">{t.sub}</span>
          </button>
        ))}
        
        <button 
          onClick={() => triggerToast('Professor de IA iniciando mentoria de liderança...', 'ok')}
          className="btn-professor-ia"
        >
          ▶ PROFESSOR IA
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
            className="home-dashboard"
          >
            {/* ROW 1: Visão Cruzada + Candidates Funnel */}
            <div className="home-row split-6040">
              
              {/* Visão Cruzada 6D - UNIFORM PREMIUM DARK GLASS CARD */}
              <div className="dash-card dash-card-radar bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-6 rounded-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b87a]/[0.08] blur-[80px] pointer-events-none mix-blend-screen" />
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block mb-1 font-bold uppercase">DIAGNÓSTICO 6D</span>
                    <h3 className="text-[16px] font-bold text-white mb-0.5">Visão Cruzada · Saúde 6D</h3>
                    <div className="text-[10px] text-white/50 font-sans">Radar organizacional · n = {teamMembers.length} colaboradores</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={handleResetRadar} className="px-3.5 py-1.5 bg-black/60 hover:bg-[#d4b87a]/15 border border-[#d4b87a]/30 rounded-xl text-[9px] font-bold text-[#d4b87a] font-mono transition-all uppercase tracking-wider">⟲ RESET</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 items-center relative z-10">
                  
                  {/* Radar Stage SVG with improved look */}
                  <div style={{ maxWidth: '180px', margin: '0 auto', position: 'relative' }}>
                    <div className="w-[180px] h-[180px] relative">
                      <svg className="w-full h-full overflow-visible" viewBox="-200 -200 400 400">
                        <defs>
                          <radialGradient id="crystalFillH" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#151310" stopOpacity="0"/>
                          </radialGradient>
                          <linearGradient id="crystalStrokeH" x1="0" y1="-150" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6"/>
                            <stop offset="50%" stopColor="#d4b87a" stopOpacity="0.45"/>
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5"/>
                          </linearGradient>
                        </defs>

                        {/* Radar Circles */}
                        <circle cx="0" cy="0" r="160" fill="none" stroke="rgba(212,184,122,0.12)" strokeWidth="0.7" strokeDasharray="4 6"/>
                        <circle cx="0" cy="0" r="110" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                        <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4"/>
                        
                        {/* Star base polygon */}
                        <polygon points="0,-140 121,-70 121,70 0,140 -121,70 -121,-70" fill="none" stroke="url(#crystalStrokeH)" strokeWidth="1"/>
                        
                        <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.5">
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
                          strokeWidth="2" 
                          opacity="0.6"
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
                        <div className="w-[60px] h-[60px] rounded-full bg-black/60 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center">
                          <span className="text-xl font-bold text-white tracking-tighter leading-none">
                            {selectedDims.length * 12 + 4}
                          </span>
                          <span className="text-[5.5px] uppercase tracking-widest text-[#d4b87a] mt-1 font-mono">OBI GLOBAL</span>
                          <span className="text-[6.5px] text-[#5dcaa5] mt-0.5 font-bold">▲ +3.2</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Dimension list & checkmarks */}
                  <div className="text-left">
                    <div className="vc-d-dots grid grid-cols-3 md:grid-cols-2 gap-1.5 mb-4">
                      {dimensionsInfo.map(dim => (
                        <div 
                          key={dim.code}
                          onClick={() => handleSelectDimension(dim.code)}
                          className={`vc-dot flex items-center gap-2 p-2 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl cursor-pointer transition ${selectedDims.includes(dim.code) ? 'active border-[#d4b87a]/20 bg-[#d4b87a]/5' : ''}`}
                        >
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dim.color, boxShadow: `0 0 6px ${dim.color}` }}></span>
                          <span className="text-[10px] font-mono font-bold text-white/80">{dim.code}</span>
                          <span className="text-[8.5px] text-white/40 ml-auto font-sans">{dim.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar of Health */}
                    <div className="vc-saude-bar bg-black/30 border border-white/5 p-3.5 rounded-xl">
                      <div className="lbl text-[10px] font-mono text-[#d4b87a] font-bold uppercase tracking-widest mb-1.5">Saúde 6D · Score Geral</div>
                      <div className="vc-bar-track h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                        <div className="vc-bar-fill h-full bg-gradient-to-r from-[#d4b87a] to-[#5dcaa5] rounded-full transition-all duration-500" style={{ width: `${(selectedDims.length / 6) * 100}%` }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'inherit', fontSize: '9px', color: '#8a9098', marginTop: '5px' }}>
                        <span>S10</span><span className="text-[#5dcaa5] font-bold">S21 · AGORA</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Recrutamento Funil Lencioni & Candidates - UNIFORM PREMIUM DARK GLASS CARD */}
              <div className="flex flex-col gap-4 text-left">
                
                {/* 4 Stage recruit bar */}
                <div className="dash-card dash-card-d1 bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-5 rounded-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#5dcaa5]/[0.08] blur-[60px] pointer-events-none mix-blend-screen" />
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block font-bold uppercase flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> RECRUTAMENTO · FLUXO LENCIONI</span>
                    <button className="text-[9px] uppercase tracking-wider text-[#d4b87a] font-bold hover:underline" onClick={() => setActiveTab('lideres')}>▶ Detalhes</button>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2 bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <div className="hover:bg-white/[0.02] p-1 rounded transition">
                      <b className="text-[15px] text-[#d4b87a] block leading-none">{candidates.filter(c => c.stage === 'triagem').length}</b>
                      <span className="text-[7px] text-white/40 font-mono block mt-1">TRIAGEM</span>
                    </div>
                    <div className="hover:bg-white/[0.02] p-1 rounded transition">
                      <b className="text-[15px] text-[#d4b87a] block leading-none">{candidates.filter(c => c.stage === 'entrevista').length}</b>
                      <span className="text-[7px] text-white/40 font-mono block mt-1">ENTREVISTA</span>
                    </div>
                    <div className="hover:bg-white/[0.02] p-1 rounded transition">
                      <b className="text-[15px] text-[#d4b87a] block leading-none">{candidates.filter(c => c.stage === 'decisao').length}</b>
                      <span className="text-[7px] text-white/40 font-mono block mt-1">DECISÃO</span>
                    </div>
                    <div className="hover:bg-white/[0.02] p-1 rounded transition">
                      <b className="text-[15px] text-[#d4b87a] block leading-none">{candidates.filter(c => c.stage === 'onboarding').length}</b>
                      <span className="text-[7px] text-white/40 font-mono block mt-1">ONBOARD</span>
                    </div>
                    <div className="bg-[#5dcaa5]/5 border border-[#5dcaa5]/25 p-1 rounded transition">
                      <b className="text-[15px] text-[#5dcaa5] block leading-none">{teamMembers.length}</b>
                      <span className="text-[7px] text-[#5dcaa5] font-mono block mt-1 font-bold">CONTRATADO</span>
                    </div>
                  </div>
                  <p className="text-[8.5px] text-white/30 font-mono mt-3 leading-tight border-t border-white/[0.04] pt-2 mb-0">
                    * Scores obtidos via IA calibram automaticamente o indicador <b className="text-white/50">D1: Cultura</b> na ficha de onboarding.
                  </p>
                </div>

                {/* Candidate list stack with custom subtle flows */}
                <div className="dash-card dash-card-d1 flex-1 flex flex-col justify-between bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-5 rounded-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#5dcaa5]/[0.08] blur-[80px] pointer-events-none mix-blend-screen" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4 border-b border-white/[0.04] pb-3">
                      <div>
                        <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block font-bold uppercase mb-1">CANDIDATOS ATIVOS</span>
                        <h3 className="text-[13px] font-bold text-white m-0">Fit Lencioni &amp; HHS</h3>
                      </div>
                      <button onClick={handleResetCandidates} className="px-3 py-1 bg-black/60 hover:bg-[#d4b87a]/10 border border-white/10 hover:border-white/20 rounded-lg text-[9px] text-white/70 hover:text-[#d4b87a] font-mono transition-colors">♻ Restaurar</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                      {candidates.length === 0 ? (
                        <div className="text-center py-6 text-[10px] text-white/30">Nenhum candidato no funil.</div>
                      ) : (
                        candidates.map(cand => (
                          <div key={cand.id} className="cand-card-mockup group hover:border-[#d4b87a]/30 hover:bg-black/60 transition-all border border-white/5 rounded-xl bg-black/40" style={{ padding: '12px', marginBottom: '0px' }}>
                            <button onClick={() => handleDeleteCandidate(cand.id)} className="btn-del-cand text-white/40 hover:text-[#e24b4a] transition" style={{ width: '16px', height: '16px', fontSize: '9px', top: '8px', right: '8px' }}>✕</button>
                            
                            <div className="header-row" style={{ gap: '8px' }}>
                              <div className="avatar bg-gradient-to-br from-[#d4b87a] to-[#efddb1] text-black font-bold" style={{ width: '26px', height: '26px', fontSize: '10px' }}>
                                {cand.name.split(' ').map(x => x[0]).join('')}
                              </div>
                              <div className="info-col text-left">
                                <span className="name text-white font-bold block" style={{ fontSize: '11.5px' }}>{cand.name}</span>
                                <span className="subtext text-white/50 block" style={{ fontSize: '8px' }}>{cand.role} · {cand.stage.toUpperCase()}</span>
                              </div>
                            </div>
                            
                            {/* HHS Bar */}
                            <div className="hhs-bar-mockup" style={{ margin: '6px 0', height: '5px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                              <i className="bg-gradient-to-r from-[#d4b87a] to-[#efddb1]" style={{ width: `${cand.lencioniScore}%`, height: '100%', display: 'block', borderRadius: '4px' }} />
                            </div>

                            <div className="stats-row flex justify-between items-center text-white/60 text-left" style={{ fontSize: '8px', paddingTop: '4px' }}>
                              <div className="item"><span>HUM </span><b className="text-white">{cand.stats.hum}%</b></div>
                              <div className="item"><span>FOM </span><b className="text-white">{cand.stats.fom}%</b></div>
                              <div className="item"><span>INT </span><b className="text-white">{cand.stats.int}%</b></div>
                            </div>
                            <button 
                              onClick={() => handleTriggerOnboard(cand)}
                              className="btn-onboard w-full mt-2.5 py-1.5 rounded-lg border border-[#d4b87a]/30 hover:border-[#d4b87a] text-[#d4b87a] bg-[#d4b87a]/5 hover:bg-[#d4b87a]/15 transition font-mono text-[9px] uppercase font-bold tracking-widest"
                              style={{ padding: '6px' }}
                            >
                              {cand.stage === 'triagem' ? 'Avançar' : cand.stage === 'onboarding' ? 'CONTRATAR' : 'Evoluir'}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ROW 2: Mapa do Time + Você como Líder */}
            <div className="home-row cols-2 mt-6">
              
              {/* Mapa do Time - UNIFORM PREMIUM DARK GLASS CARD (Ties DOT colors to dynamic D6 values) */}
              <div className="dash-card dash-card-d3 bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-6 rounded-2xl text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#e24b4a]/[0.08] blur-[85px] pointer-events-none mix-blend-screen" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block font-bold uppercase mb-1">D6 DIAGNÓSTICO · MAPA DO TIME</span>
                    <h3 className="text-[14px] font-bold text-white mb-0.5">Influência × Impacto</h3>
                    <div className="text-[10px] text-white/50 font-sans">Vetorização 6D com base no capital social de cada colaborador</div>
                  </div>
                  <button onClick={handleAddTeamMemberMap} className="px-3 py-1.5 bg-black/60 hover:bg-[#d4b87a]/10 border border-white/10 hover:border-white/30 rounded-xl text-[9px] text-[#d4b87a] font-mono transition-colors font-bold tracking-widest">+ ADD</button>
                </div>

                <div className="mapa-container bg-black/40 border border-white/5 rounded-xl p-3">
                  <div className="mapa-svg-wrap relative">
                    <svg viewBox="0 0 300 200" style={{ overflow: 'visible' }}>
                      {/* Background quadrants */}
                      <rect x="0" y="0" width="150" height="100" fill="rgba(250,199,117,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                      <rect x="150" y="0" width="150" height="100" fill="rgba(93,202,165,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                      <rect x="0" y="100" width="150" height="100" fill="rgba(226,75,74,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                      <rect x="150" y="100" width="150" height="100" fill="rgba(212,184,122,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                      {/* Axes */}
                      <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="4 4"/>
                      <line x1="150" y1="0" x2="150" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="4 4"/>
                      {/* Axis labels */}
                      <text x="150" y="195" textAnchor="middle" fontFamily="inherit" fontSize="8" fill="rgba(255,255,255,0.3)">← baixa influência · alta influência →</text>
                      <text x="4" y="100" fontFamily="inherit" fontSize="7" fill="rgba(255,255,255,0.3)" writingMode="vertical-rl" transform="rotate(180,4,100)">alto impacto ↑</text>
                      
                      {/* Plot Dots - Colored dynamically by their real D6 health score */}
                      <g>
                        {teamMembers.map(m => {
                          const cx = ((m.influence + 150) / 300) * 280 + 10
                          const cy = 200 - (((m.impact + 100) / 200) * 180 + 10)
                          // 6D Color categorization: Green for healthy, Orange for mid, Red for risk
                          const d6Color = m.d6 >= 80 ? '#5dcaa5' : m.d6 >= 60 ? '#fac775' : '#e24b4a'
                          return (
                            <g key={m.id} className="cursor-pointer group" onClick={() => triggerToast(`${m.name} (${m.role}): D6=${m.d6}`)}>
                              <circle cx={cx} cy={cy} r="6.5" fill={d6Color} stroke="#fff" strokeWidth="1.2" className="transition duration-300 hover:scale-130" style={{ filter: `drop-shadow(0 0 6px ${d6Color})` }} />
                              <circle cx={cx} cy={cy} r="11" fill="none" stroke={d6Color} strokeWidth="0.5" opacity="0.2" className="animate-ping" style={{ transformOrigin: `${cx}px ${cy}px` }} />
                              <text x={cx} y={cy - 12} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black px-1.5 py-0.5 rounded border border-white/10">{m.name.split(' ')[0]} ({m.d6}%)</text>
                            </g>
                          )
                        })}
                      </g>
                    </svg>
                    {/* Quadrant labels */}
                    <div className="mapa-quadrant-lbl top-left text-[8px] uppercase tracking-wider text-white/30">neutralos · orientar</div>
                    <div className="mapa-quadrant-lbl top-right text-[8px] uppercase tracking-wider text-white/30">aliados · delegar</div>
                    <div className="mapa-quadrant-lbl bot-left text-[8px] uppercase tracking-wider text-white/30">bloqueador · direcionar</div>
                    <div className="mapa-quadrant-lbl bot-right text-[8px] uppercase tracking-wider text-white/30">exec · apoiar</div>
                  </div>
                </div>
              </div>

              {/* Você como Líder - UNIFORM PREMIUM DARK GLASS CARD */}
              <div className="dash-card dash-card-d2 bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-6 rounded-2xl text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#fac775]/[0.08] blur-[85px] pointer-events-none mix-blend-screen" />
                <div className="relative z-10 mb-5 flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block font-bold uppercase mb-1">Perfil · Liderança</span>
                    <h3 className="text-[14px] font-bold text-white">Você como Líder</h3>
                  </div>
                  {/* Calculates and displays actual 6D alignment score based on checked principles */}
                  <span className="px-2 py-1 bg-[#d4b87a]/10 border border-[#d4b87a]/20 rounded text-[#d4b87a] font-mono text-[9px] font-bold">
                    {Math.round((manifestoChecks.filter(Boolean).length / 5) * 100)}% ALINHAMENTO D2
                  </span>
                </div>

                {/* Role selector */}
                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                  <div className="p-3 bg-[#d4b87a]/5 border border-[#d4b87a]/20 rounded-xl cursor-pointer text-center">
                    <span className="text-[8.5px] font-mono font-bold text-[#d4b87a] block mb-1">Modo 1</span>
                    <span className="text-[12px] font-bold text-white block">Gestor</span>
                    <span className="text-[9px] text-white/50 block font-sans">Complexidade &amp; Processos</span>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl cursor-pointer text-center transition-colors">
                    <span className="text-[8.5px] font-mono font-bold text-white/40 block mb-1">Modo 2</span>
                    <span className="text-[12px] font-bold text-white block">Líder</span>
                    <span className="text-[9px] text-white/50 block font-sans">Mudança &amp; Propósito</span>
                  </div>
                </div>

                {/* Manifesto Checklist */}
                <div className="font-mono text-[9px] text-white/40 font-bold uppercase tracking-widest mt-5 mb-3 relative z-10">
                  Saúde Manifesto · 5 Princípios
                </div>
                <div className="space-y-2 relative z-10">
                  {manifestoPrinciples.map((p, idx) => (
                    <div 
                      key={p.code}
                      onClick={() => handleToggleManifesto(idx)}
                      className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition-colors ${manifestoChecks[idx] ? 'bg-[#d4b87a]/5 border-[#d4b87a]/20' : 'bg-black/40 border-white/5 hover:border-white/10'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-[9px] font-mono font-bold ${manifestoChecks[idx] ? 'text-[#d4b87a]' : 'text-white/40'}`}>{p.code}</div>
                        <div className={`text-[10px] font-sans leading-snug ${manifestoChecks[idx] ? 'text-white font-medium' : 'text-white/60'}`}>{p.text}</div>
                      </div>
                      <div className={`text-[9px] font-mono font-bold whitespace-nowrap px-2 py-0.5 rounded ${manifestoChecks[idx] ? 'text-[#d4b87a] bg-[#d4b87a]/10 font-bold' : 'text-white/20'}`}>{manifestoChecks[idx] ? '✓ ATIVO' : '—'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 3: Primeiros Passos + Pulso Semanal */}
            <div className="home-row cols-2 mt-6">
              
              {/* Primeiros Passos - UNIFORM PREMIUM DARK GLASS CARD (Tied explicitly to D6 dimensions) */}
              <div className="dash-card dash-card-d5 bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-6 rounded-2xl text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#14a5e9]/[0.08] blur-[85px] pointer-events-none mix-blend-screen" />
                <div className="flex justify-between items-center mb-5 relative z-10">
                  <div>
                    <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block font-bold uppercase mb-1">Onboarding · Sistema</span>
                    <h3 className="text-[14px] font-bold text-white">Primeiros Passos</h3>
                  </div>
                  <button onClick={handlePopularPassosExemplo} className="px-3 py-1.5 bg-black/60 hover:bg-[#d4b87a]/15 border border-[#d4b87a]/30 rounded-xl text-[9px] text-[#d4b87a] font-mono transition-colors font-bold tracking-widest">EXEMPLO</button>
                </div>
                <div className="primeiros-list space-y-2">
                  {/* Step list mapped with their corresponding 6D diagnostic dimensions */}
                  {[
                    { id: 1, title: 'Escreva a primeira entrada do Diário IE', desc: 'Calibra o indicador D2: Liderança no PDI', d6Dim: 'D2 Liderança' },
                    { id: 2, title: 'Adicione o primeiro liderado ao time', desc: 'Permite compilar análises cruzadas de fit e engajamento', d6Dim: 'D1 Cultura' },
                    { id: 3, title: 'Registre um SBI de reconhecimento', desc: 'Razão saudável: 2 feedbacks positivos para 1 de calibração', d6Dim: 'D3 Confiança' },
                    { id: 4, title: 'Defina o primeiro OKR trimestral', desc: 'Foco na direção para afastar desalinhamentos táticos', d6Dim: 'D4 Entrega' },
                    { id: 5, title: 'Configure o Contrato de Aliança do time', desc: 'Normas e combinados explícitos reduzem atritos', d6Dim: 'D5 Clareza' }
                  ].map((p, idx) => (
                    <div 
                      key={p.id}
                      onClick={() => handleTogglePassos(idx)}
                      className={`flex items-center gap-3 p-3 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl cursor-pointer transition ${passosChecks[idx] ? 'border-[#d4b87a]/20 bg-[#d4b87a]/5' : ''}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 transition-all ${passosChecks[idx] ? 'bg-gradient-to-r from-[#d4b87a] to-[#efddb1] text-black shadow-[0_0_8px_rgba(212,184,122,0.3)]' : 'bg-white/5 border border-white/10 text-white/50'}`}>
                        {p.id}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`block text-[11px] font-bold text-white transition-all ${passosChecks[idx] ? 'line-through text-white/40' : ''}`}>{p.title}</span>
                          <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/5 text-white/30 text-[7px] font-mono uppercase tracking-widest">{p.d6Dim}</span>
                        </div>
                        <span className="block text-[9.5px] text-white/40 font-sans leading-tight mt-0.5">{p.desc}</span>
                      </div>
                      <div className={`text-[12px] font-bold transition-all ${passosChecks[idx] ? 'text-[#d4b87a] translate-x-0' : 'text-white/20 -translate-x-1'}`}>→</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pulso Semanal - UNIFORM PREMIUM DARK GLASS CARD */}
              <div className="dash-card dash-card-d6 bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-6 rounded-2xl text-left border border-white/[0.08] shadow-[0_0_40px_rgba(168,85,247,0.05)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7]/[0.08] blur-[85px] pointer-events-none mix-blend-screen" />
                <div className="flex justify-between items-center mb-5 relative z-10">
                  <div>
                    <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block font-bold uppercase mb-1">📊 PULSO SEMANAL</span>
                    <h3 className="text-[14px] font-bold text-white">Como está sua energia?</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-[#d4b87a]/10 border border-[#d4b87a]/30 rounded text-[#d4b87a] font-mono text-[8px] font-bold tracking-widest uppercase">Semana 21</span>
                </div>

                <div className="relative z-10 space-y-5">
                  <div>
                    <div className="text-[10px] text-white/70 font-sans mb-2 font-medium">Energia esta semana:</div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(v => (
                        <button
                          key={v}
                          onClick={() => setPulseEnergy(v)}
                          className={`flex-1 py-2.5 rounded-xl border text-[11px] font-mono font-bold transition-all duration-300 ${pulseEnergy === v ? 'bg-gradient-to-r from-[#d4b87a] to-[#efddb1] border-[#d4b87a] text-black shadow-[0_0_15px_rgba(212,184,122,0.45)]' : 'bg-black/60 border-white/5 text-white/40 hover:border-white/20'}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-white/70 font-sans mb-2 font-medium">E seu foco?</div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(v => (
                        <button
                          key={v}
                          onClick={() => setPulseFocus(v)}
                          className={`flex-1 py-2.5 rounded-xl border text-[11px] font-mono font-bold transition-all duration-300 ${pulseFocus === v ? 'bg-gradient-to-r from-[#5dcaa5] to-[#efddb1] border-[#5dcaa5] text-black shadow-[0_0_15px_rgba(93,202,165,0.45)]' : 'bg-black/60 border-white/5 text-white/40 hover:border-white/20'}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-white/70 font-sans mb-2 font-medium">Qual o maior bloqueio agora? <span className="opacity-50 font-normal">(1 linha)</span></div>
                    <textarea 
                      value={pulseBlocker}
                      onChange={(e) => setPulseBlocker(e.target.value)}
                      placeholder="Descreva seu bloqueio principal desta semana..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-[11px] text-white font-sans leading-relaxed outline-none focus:border-[#d4b87a]/40 focus:ring-1 focus:ring-[#d4b87a]/20 min-h-[60px] resize-none"
                    />
                  </div>
                  
                  <button onClick={handleSavePulso} className="w-full py-3.5 bg-gradient-to-r from-[#d4b87a]/25 to-[#d4b87a]/5 hover:from-[#d4b87a]/35 hover:to-[#d4b87a]/15 border border-[#d4b87a]/50 rounded-xl text-[10px] font-bold text-[#d4b87a] font-mono tracking-widest transition-all shadow-[0_0_20px_rgba(212,184,122,0.12)]">
                    ✓ SALVAR PULSO DA SEMANA
                  </button>
                </div>
              </div>
            </div>


            {/* RECRUTAR MOVED TO HOME */}
            <div className="home-row full mt-6">
              <div className="space-y-6">
                
                {/* Main Card: Recruiting Roles */}
                <div className="dash-card dash-card-d1 bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-6 text-left">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-[#5dcaa5]/[0.08] blur-[120px] pointer-events-none mix-blend-screen" />
                  
                  <div className="mb-6 relative z-10">
                    <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block mb-2 font-bold uppercase">RECRUTAMENTO</span>
                    <h3 className="text-[16px] font-bold text-white mb-2">Novo Candidato: Para qual papel?</h3>
                    <p className="text-[11px] text-white/50 leading-relaxed font-sans max-w-3xl">
                      Cada papel tem critérios diferentes de avaliação. Líderes/Gestores precisam de mais perguntas porque o impacto cultural deles é maior.
                    </p>
                  </div>
                  
                  {/* 4 Roles in horizontal grid to prevent being narrow/squeezed */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
                    {[
                      { title: 'Liderado', desc: 'Alguém que vai compor seu time e reportar a você. Foco: fit cultural + comportamento + soft skills.', qCount: '5 perguntas' },
                      { title: 'Gestor', desc: 'Função de gestão (coordenador, gerente). Foco: capacidade gestora + desenvolvimento + mediação.', qCount: '7 perguntas' },
                      { title: 'Líder & Gestor', desc: 'Liderança estratégica que gere pessoas diretamente. Foco: visão + operação + cultura.', qCount: '10 perguntas' },
                      { title: 'Líder', desc: 'Liderança estratégica (head, C-level) sem gestão de pessoas. Foco: transformação + coragem ética.', qCount: '10 perguntas' }
                    ].map((role, idx) => (
                      <div 
                        key={idx}
                        onClick={() => triggerToast(`Parâmetros de fit para ${role.title} ativados.`, 'ok')}
                        className="group p-5 bg-black/40 border border-white/[0.08] hover:border-[#d4b87a]/60 hover:bg-[#d4b87a]/10 rounded-2xl cursor-pointer transition-all text-left relative overflow-hidden flex flex-col justify-between"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                          <b className="text-[12px] font-mono tracking-widest text-[#d4b87a] block leading-none mb-3">{role.title}</b>
                          <span className="text-[10px] text-white/60 block leading-snug font-sans mb-4 min-h-[50px]">{role.desc}</span>
                        </div>
                        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between relative z-10">
                          <span className="text-[8.5px] font-mono font-bold text-white/40 uppercase tracking-widest">{role.qCount}</span>
                          <span className="text-[#d4b87a] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Frameworks explanation in a modern wide horizontal glass box */}
                  <div className="p-6 bg-black/50 border border-[#5dcaa5]/20 rounded-2xl relative z-10">
                    <span className="font-mono text-[9.5px] text-[#5dcaa5] tracking-widest block mb-4 font-bold uppercase">◆ PRA QUÊ SERVEM ESSAS PERGUNTAS</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition">
                        <span className="text-[10px] font-mono text-[#5dcaa5] font-bold block mb-1">1. TRIAGEM</span>
                        <span className="text-[10.5px] text-white/60 leading-relaxed font-sans block">
                          Ordena automaticamente os candidatos por fit cultural em tempo real.
                        </span>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition">
                        <span className="text-[10px] font-mono text-[#5dcaa5] font-bold block mb-1">2. FICHA DO LIDERADO</span>
                        <span className="text-[10.5px] text-white/60 leading-relaxed font-sans block">
                          Alimenta e cria o histórico contínuo Lencioni / HHS da pessoa desde o dia zero.
                        </span>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition">
                        <span className="text-[10px] font-mono text-[#5dcaa5] font-bold block mb-1">3. ONBOARDING</span>
                        <span className="text-[10.5px] text-white/60 leading-relaxed font-sans block">
                          Personaliza e adapta o plano estratégico de integração dos primeiros 90 dias.
                        </span>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition">
                        <span className="text-[10px] font-mono text-[#5dcaa5] font-bold block mb-1">4. FOLHA MENSAL</span>
                        <span className="text-[10.5px] text-white/60 leading-relaxed font-sans block">
                          Cruza com a evolução de feedbacks do SBI e o índice D6 ao longo do tempo.
                        </span>
                      </div>
                    </div>
                    <p className="text-[9.5px] text-white/40 font-mono mt-4 pt-3 border-t border-white/5 m-0">
                      * Cada resposta é analisada por IA contra 6 frameworks fundamentais: Lencioni, HHS, SBI, Tuckman, Goleman e Big Five.
                    </p>
                  </div>
                </div>

                {/* Automations Row: Left (Recruiting), Right (General) */}
                <div className="dash-card dash-card-d4 bg-[#050505]/60 backdrop-blur-3xl relative overflow-hidden p-6 text-left">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b82f6]/[0.08] blur-[120px] pointer-events-none mix-blend-screen" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div>
                      <div className="mb-4">
                        <h3 className="text-[11px] font-mono text-[#d4b87a] font-bold tracking-widest uppercase flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5" /> AUTOMAÇÕES RECRUTAR
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono text-white/70">
                        <div className="flex justify-between items-center bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition">
                          <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-[#5dcaa5]" /> Whisper Transcrição</span>
                          <span className="text-[#5dcaa5] bg-[#5dcaa5]/10 px-2 py-0.5 rounded text-[9px] font-bold">ativo</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition">
                          <span className="flex items-center gap-2"><Cpu className="w-3 h-3 text-[#5dcaa5]" /> IA Lencioni</span>
                          <span className="text-[#5dcaa5] bg-[#5dcaa5]/10 px-2 py-0.5 rounded text-[9px] font-bold">ativo</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition">
                          <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-[#5dcaa5]" /> HHS Scoring</span>
                          <span className="text-[#5dcaa5] bg-[#5dcaa5]/10 px-2 py-0.5 rounded text-[9px] font-bold">ativo</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition">
                          <span className="flex items-center gap-2"><Square className="w-3 h-3 text-[#fac775]" /> LinkedIn - Gupy</span>
                          <span className="text-[#fac775] bg-[#fac775]/10 px-2 py-0.5 rounded text-[9px] font-bold">pendente</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <h3 className="text-[11px] font-mono text-white/60 font-bold tracking-widest uppercase flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5" /> AUTOMAÇÕES GERAIS
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono text-white/70">
                        <div className="flex justify-between items-center bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition">
                          <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-[#5dcaa5]" /> 1:1 Mobile</span>
                          <span className="text-[#5dcaa5] bg-[#5dcaa5]/10 px-2 py-0.5 rounded text-[9px] font-bold">ativo</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition">
                          <span className="flex items-center gap-2"><Cpu className="w-3 h-3 text-[#5dcaa5]" /> Slack NLP</span>
                          <span className="text-[#5dcaa5] bg-[#5dcaa5]/10 px-2 py-0.5 rounded text-[9px] font-bold">ativo</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition">
                          <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-[#5dcaa5]" /> Pulso Semanal</span>
                          <span className="text-[#5dcaa5] bg-[#5dcaa5]/10 px-2 py-0.5 rounded text-[9px] font-bold">ativo</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition">
                          <span className="flex items-center gap-2"><Square className="w-3 h-3 text-[#fac775]" /> HRIS Integrations</span>
                          <span className="text-[#fac775] bg-[#fac775]/10 px-2 py-0.5 rounded text-[9px] font-bold">pendente</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
            className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#d4b87a]/20 relative overflow-hidden"
            style={{ padding: '24px' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b87a]/5 blur-[80px] pointer-events-none mix-blend-screen" />
            
            {/* Header info */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="text-left max-w-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-[#d4b87a]/10 border border-[#d4b87a]/30 rounded text-[9px] font-mono font-bold text-[#d4b87a] tracking-widest uppercase">LÍDERES</span>
                  <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Ferramentas do Líder como Agente</span>
                </div>
                <h2 className="text-[18px] font-bold text-white mb-2 tracking-tight">Desenvolvimento de Liderança</h2>
                <div className="text-[11px] text-white/60 font-sans leading-relaxed">Você não pode liderar quem você não é. Desenvolvimento tem uma sequência: Autoconhecimento → Gestão → Equipe → Organização.</div>
              </div>
              <div>
                <button 
                  onClick={() => triggerToast('Professor de IA iniciando mentoria de liderança...', 'ok')}
                  className="px-4 py-2 bg-gradient-to-r from-[#d4b87a]/20 to-[#d4b87a]/5 hover:from-[#d4b87a]/30 hover:to-[#d4b87a]/10 border border-[#d4b87a]/40 rounded-xl text-[10px] font-bold text-[#d4b87a] font-mono tracking-widest transition-all shadow-[0_0_20px_rgba(212,184,122,0.1)] flex items-center gap-2"
                >
                  <span className="text-[12px]">▶</span> PROFESSOR IA
                </button>
              </div>
            </div>

            {/* Sub-tabs Row */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4 relative z-10">
              {[
                { id: 'voce', label: 'Líderes / Gestores' },
                { id: 'gerir', label: 'Gerir' },
                { id: 'delegar', label: 'Delegar' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setLideresTab(sub.id as LideresSubTab)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase font-bold transition-all ${lideresTab === sub.id ? 'bg-[#d4b87a] text-black shadow-[0_0_15px_rgba(212,184,122,0.3)]' : 'bg-white/5 border border-white/10 text-white/50 hover:border-[#d4b87a]/30 hover:text-[#d4b87a]'}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Inner pages dispatch */}
            <AnimatePresence mode="wait">
              
              {/* LIDERES SUB-TABS GO HERE */}
              
              {/* SUBPAGE: LÍDERES / GESTORES (VOCÊ) */}
              {lideresTab === 'voce' && (
                <motion.div
                  key="voce"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#d4b87a]/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#d4b87a]/5 blur-[80px] mix-blend-screen pointer-events-none" />
                    
                    <div className="relative z-10 mb-6">
                      <h4 className="text-[12px] font-mono text-[#d4b87a] font-bold tracking-widest uppercase mb-1">JORNADA DO LÍDER — FAÇA NESTA ORDEM</h4>
                      <p className="text-[11px] text-white/50 font-sans leading-relaxed">
                        O desenvolvimento da liderança tem uma sequência: primeiro você se conhece, depois domina as ferramentas de gestão, depois aplica com o time, depois influencia a organização. Pular etapas cria líderes frágeis.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                      
                      {/* Step 1 */}
                      <div className="p-5 border border-[#d4b87a]/30 bg-[#d4b87a]/10 rounded-2xl relative">
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#d4b87a] text-black flex items-center justify-center font-bold font-mono text-[14px] shadow-[0_0_15px_rgba(212,184,122,0.4)]">1</div>
                        <span className="px-2 py-0.5 bg-[#d4b87a] text-black text-[8px] font-bold uppercase tracking-widest rounded absolute top-3 right-3">COMECE AQUI</span>
                        
                        <h5 className="text-[13px] font-bold text-white mb-2 ml-4">Autoconhecimento (PDI + IE)</h5>
                        <p className="text-[10px] text-white/60 mb-4 ml-4 leading-relaxed font-sans">
                          Escreva sobre uma situação que gerou emoção intensa. Use o Diário IE (na aba Gerir) — a IA analisa o padrão e avança seu PDI automaticamente.
                        </p>
                        
                        <div className="ml-4 space-y-2">
                          <button onClick={() => triggerToast('Abrindo Diário IE...', 'ok')} className="w-full text-left p-3 bg-black/40 border border-white/10 hover:border-[#d4b87a]/40 rounded-xl transition-all group flex justify-between items-center">
                            <div>
                              <span className="block text-[11px] text-white font-bold group-hover:text-[#d4b87a] transition-colors">▶ Escrever no Diário IE</span>
                              <span className="block text-[9px] text-white/40 mt-1">A IA calcula seu padrão</span>
                            </div>
                            <span className="text-[#d4b87a] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </button>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="p-5 border border-white/10 bg-black/40 rounded-2xl relative opacity-80 hover:opacity-100 transition-opacity">
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/20 text-white/50 flex items-center justify-center font-bold font-mono text-[14px]">2</div>
                        
                        <h5 className="text-[13px] font-bold text-white mb-2 ml-4">Fundamentos da Gestão</h5>
                        <p className="text-[10px] text-white/60 mb-4 ml-4 leading-relaxed font-sans">
                          Domine as ferramentas operacionais antes de tentar inspirar grandes mudanças. Recrutamento, Feedback, 1:1s, Delegação (M1-M4).
                        </p>

                        <div className="ml-4 space-y-2">
                          <button onClick={() => setLideresTab('gerir')} className="w-full text-left p-3 bg-black/40 border border-white/10 hover:border-white/30 rounded-xl transition-all group flex justify-between items-center">
                            <div>
                              <span className="block text-[11px] text-white font-bold">▶ Ir para Gerir</span>
                              <span className="block text-[9px] text-white/40 mt-1">Ferramentas de Gestão</span>
                            </div>
                            <span className="text-white/50 group-hover:text-white transition-colors">→</span>
                          </button>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="p-5 border border-white/10 bg-black/40 rounded-2xl relative opacity-60">
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/20 text-white/30 flex items-center justify-center font-bold font-mono text-[14px]">3</div>
                        
                        <h5 className="text-[13px] font-bold text-white/70 mb-2 ml-4">Dinâmica de Equipe (Tuckman)</h5>
                        <p className="text-[10px] text-white/40 mb-4 ml-4 leading-relaxed font-sans">
                          Aprenda a formar alianças (Contrato de Aliança) e gerenciar conflitos construtivos. (Bloqueado: Requer 60% no PDI 2)
                        </p>
                      </div>

                      {/* Step 4 */}
                      <div className="p-5 border border-white/10 bg-black/40 rounded-2xl relative opacity-60">
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/20 text-white/30 flex items-center justify-center font-bold font-mono text-[14px]">4</div>
                        
                        <h5 className="text-[13px] font-bold text-white/70 mb-2 ml-4">Impacto Organizacional</h5>
                        <p className="text-[10px] text-white/40 mb-4 ml-4 leading-relaxed font-sans">
                          Liderar mudanças estratégicas e influenciar cultura. Alpha-Linter e BI Avançado. (Bloqueado)
                        </p>
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
                  className="p-sub-view active space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="dash-card p-5 text-center bg-black/40 backdrop-blur-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#e24b4a]/10 blur-[50px] mix-blend-screen pointer-events-none" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#e24b4a] font-bold block mb-2">Pessoas em Alerta</span>
                      <b className="text-3xl font-light text-white block">{teamMembers.filter(m => m.d6 < 60).length}</b>
                      <span className="text-[9px] text-[#e24b4a]/70 block mt-2 font-mono">D6 ou ISR &lt; 50</span>
                    </div>
                    <div className="dash-card p-5 text-center bg-black/40 backdrop-blur-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4b87a]/10 blur-[50px] mix-blend-screen pointer-events-none" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4b87a] font-bold block mb-2">D6 Médio do Time</span>
                      <b className="text-3xl font-light text-white block">{Math.round(teamMembers.reduce((s, m) => s + m.d6, 0) / (teamMembers.length || 1))}<small className="text-[14px] text-white/30 font-sans">/100</small></b>
                      <span className="text-[9px] text-[#d4b87a]/70 block mt-2 font-mono">Calculado em tempo real</span>
                    </div>
                    <div className="dash-card p-5 text-center bg-black/40 backdrop-blur-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#5dcaa5]/10 blur-[50px] mix-blend-screen pointer-events-none" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#5dcaa5] font-bold block mb-2">Com Tarefas Pendentes</span>
                      <b className="text-3xl font-light text-white block">{delegatedTasks.filter(t => t.status !== 'concluido').length}</b>
                      <span className="text-[9px] text-[#5dcaa5]/70 block mt-2 font-mono">Delegação ativa</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Coach SBI */}
                    <div className="lg:col-span-7 dash-card text-left space-y-4 bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none mix-blend-screen" />
                      <div className="flex justify-between items-center mb-4 relative z-10">
                        <div>
                          <span className="font-mono text-[9px] text-blue-400 tracking-widest block mb-2 font-bold uppercase">COACH SBI</span>
                          <h4 className="text-[14px] font-bold text-white mb-1">Registrar Feedback SBI</h4>
                          <div className="text-[10px] text-white/50 font-sans">Foque em Situação → Comportamento objetivo → Impacto</div>
                        </div>
                        <button className="btn-reset-sm" onClick={() => triggerToast('Carregando aula SBI...', 'ok')}>▶ AULA</button>
                      </div>

                      <div className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="Situação (Onde e quando ocorreu? Ex: Na reunião de OKRs de terça...)" 
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
                          placeholder="Impacto (Efeito no time. Ex: Isso gerou ruído na equipe...)" 
                          value={sbiImp}
                          onChange={(e) => setSbiImp(e.target.value)}
                          className="w-full h-14 bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40 resize-none"
                        />
                        
                        <button 
                          onClick={handleAddSbi}
                          className="px-3.5 py-1.5 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/45 rounded-lg text-[9px] font-bold text-[#d4b87a] font-mono transition"
                        >
                          + REGISTRAR FEEDBACK SBI
                        </button>
                      </div>

                      {/* Log feed */}
                      <div className="border-t border-white/[0.04] pt-4 max-h-[140px] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                        {sbiLogs.length === 0 ? (
                          <span className="text-[10px] italic opacity-50 block font-sans">Nenhum feedback SBI registrado hoje. Use em 1:1 semanais.</span>
                        ) : (
                          sbiLogs.map((log, i) => (
                            <div key={i} className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl font-mono text-[9px] hover:border-[#d4b87a]/20 transition-colors">
                              <span className="text-[#d4b87a] font-bold block mb-2 tracking-widest">{log.date} · REGISTRO SBI</span>
                              <div className="space-y-1">
                                <span className="text-white/40 block">Situação: <b className="text-white/80">{log.situation}</b></span>
                                <span className="text-white/40 block">Comportamento: <b className="text-white/80">{log.behavior}</b></span>
                                <span className="text-white/40 block">Impacto: <b className="text-[#e24b4a]/90">{log.impact}</b></span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Team Individual Health */}
                    <div className="lg:col-span-5 dash-card text-left space-y-4 bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b87a]/5 blur-[80px] pointer-events-none mix-blend-screen" />
                      <div>
                        <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block mb-2 font-bold uppercase">SAÚDE INDIVIDUAL</span>
                        <h4 className="text-[13px] font-bold text-white mb-1">Saúde Individual e Indicadores</h4>
                        <div className="text-[10px] text-white/50 font-sans">Filtro cruzado de calibração em tempo real</div>
                      </div>

                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {teamMembers.length === 0 ? (
                          <span className="text-[10px] opacity-50 italic block font-sans">Nenhum liderado cadastrado ainda. Vá em Home → Funil e contrate candidatos para popular a saúde individual.</span>
                        ) : (
                          teamMembers.map(m => (
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
                          ))
                        )}
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
                  className="p-sub-view active space-y-6 text-left"
                >
                  {/* Matriz M1-M4 situational matrix explanation */}
                  <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] mix-blend-screen pointer-events-none" />
                    <h4 className="text-[12px] font-mono text-[#d4b87a] font-bold tracking-widest uppercase mb-1">Matriz M1-M4 — Liderança Situacional</h4>
                    <p className="text-[10px] text-white/50 mb-6 font-sans leading-relaxed">Adapte sua liderança à maturidade técnica (M1 a M4) do seu liderado para cada tarefa específica.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { m: 'M1', label: 'INICIANTE', focus: 'Direcionar / Instruir', color: 'border-red-900/30 text-red-400 bg-red-900/10', desc: 'Alta motivação, baixa competência. Prescritivo: defina e monitore.' },
                        { m: 'M2', label: 'APRENDIZ', focus: 'Orientar / Treinar', color: 'border-yellow-900/30 text-yellow-400 bg-yellow-900/10', desc: 'Motivação cai no progresso. Direcione tarefas e apoie socioemocionalmente.' },
                        { m: 'M3', label: 'CAPAZ', focus: 'Apoiar / Facilitar', color: 'border-slate-700 text-slate-300 bg-slate-800/30', desc: 'Competência alta, confiança oscila. Coparticipe da decisão e incentive.' },
                        { m: 'M4', label: 'EXPERT', focus: 'Delegar Autonomia', color: 'border-[#5dcaa5]/30 text-[#5dcaa5] bg-[#5dcaa5]/10', desc: 'Maturidade máxima. Conceda autonomia de decisão com monitoramento assíncrono.' }
                      ].map(item => (
                        <div key={item.m} className={`p-4 border ${item.color} rounded-2xl space-y-2 hover:-translate-y-1 transition-transform`}>
                          <span className="text-[9px] font-mono font-bold block opacity-80">{item.m} · {item.label}</span>
                          <b className="text-[12px] block leading-none">{item.focus}</b>
                          <span className="text-[9.5px] opacity-70 block leading-relaxed font-sans">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculator Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 dash-card space-y-5 bg-[#050505]/60 backdrop-blur-3xl border border-[#d4b87a]/10">
                      <div>
                        <h4 className="text-[11px] font-mono text-white/90 font-bold tracking-widest uppercase mb-1">Cálculo de Custo de Oportunidade (ROI da Delegação)</h4>
                        <p className="text-[10px] text-white/50 font-sans">Regra dos 80%: descubra quanto vale a recuperação do seu tempo operacional.</p>
                      </div>

                      <div className="calc-grid">
                        <div className="calc-input-group">
                          <label>Seu Salário Mensal (R$)</label>
                          <input 
                            type="number" 
                            value={salary}
                            onChange={(e) => setSalary(parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="calc-input-group">
                          <label>Horas Operacionais/Semana</label>
                          <input 
                            type="number" 
                            value={operHours}
                            onChange={(e) => setOperHours(parseInt(e.target.value) || 0)}
                          />
                        </div>
                        
                        <div className="calc-input-group" style={{ gridColumn: 'span 2' }}>
                          <label>Maturidade do Liderado</label>
                          <select 
                            value={delegationMaturity}
                            onChange={(e) => setDelegationMaturity(e.target.value as any)}
                          >
                            <option value="M1">M1: Iniciante (Microgestão / Direcional - Baixo ROI)</option>
                            <option value="M2">M2: Aprendiz (Direção + Treinamento - Médio ROI)</option>
                            <option value="M3">M3: Capaz (Autonomia Assistida - Alto ROI)</option>
                            <option value="M4">M4: Expert (Delegação Plena - ROI Máximo)</option>
                          </select>
                        </div>
                      </div>

                      {/* Diagnostic Outputs */}
                      <div style={{ background: 'rgba(212,184,122,0.03)', border: '0.2px solid rgba(212,184,122,0.15)', borderRadius: '8px', padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
                        <div>
                          <span style={{ fontSize: '9px', opacity: 0.5, display: 'block' }}>Custo da Sua Hora</span>
                          <b style={{ fontSize: '13px', color: '#ffffff' }} className="font-mono">R$ {costPerHour}</b>
                        </div>
                        <div>
                          <span style={{ fontSize: '9px', opacity: 0.5, display: 'block' }}>Risco de Burnout</span>
                          <b style={{ fontSize: '13px', color: '#fac775' }}>{burnoutRisk}</b>
                        </div>
                        <div>
                          <span style={{ fontSize: '9px', opacity: 0.5, display: 'block' }}>ROI Estratégico Mensal</span>
                          <b style={{ fontSize: '13px', color: '#5dcaa5' }} className="font-mono">R$ {Math.round(opportunityRoi)}</b>
                        </div>
                        <div>
                          <span style={{ fontSize: '9px', opacity: 0.5, display: 'block' }}>Impacto Anual Gerado</span>
                          <b style={{ fontSize: '13px', color: '#5dcaa5' }} className="font-mono">R$ {annualRoi}</b>
                        </div>
                      </div>

                      <div style={{ fontSize: '9.5px', lineHeight: '1.4', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                        <b>DIAGNÓSTICO ALX:</b> Líder, seu gargalo de {operHours}h/semana gera um desperdício. Ao delegar para um {delegationMaturity}, você recupera R$ {Math.round(opportunityRoi)} mensais em valor estratégico.
                      </div>
                    </div>

                    {/* Delegated task checklist */}
                    <div className="lg:col-span-5 dash-card space-y-3">
                      <div className="flex justify-between items-center" style={{ marginBottom: '10px' }}>
                        <div>
                          <h4 className="panel-title" style={{ fontSize: '12px' }}>Painel de Tarefas Delegadas</h4>
                          <div className="panel-sub">Atribua metas baseadas na maturidade</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="Meta / Tarefa a ser delegada..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="w-full bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[9.5px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                        
                        <div className="flex gap-2">
                          <select 
                            value={newTaskAssignee}
                            onChange={(e) => setNewTaskAssignee(e.target.value)}
                            className="flex-1 bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-2 py-1.5 text-[9.5px] text-white outline-none"
                          >
                            {teamMembers.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                          </select>
                          <select 
                            value={newTaskMaturity}
                            onChange={(e) => setNewTaskMaturity(e.target.value)}
                            className="w-20 bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-2 py-1.5 text-[9.5px] text-white outline-none"
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
                        {delegatedTasks.length === 0 ? (
                          <span style={{ fontSize: '10px', fontStyle: 'italic', opacity: 0.5 }}>Nenhum liderado cadastrado hoje. Adicione colaboradores para delegar tarefas.</span>
                        ) : (
                          delegatedTasks.map(t => (
                            <div 
                              key={t.id} 
                              onClick={() => handleToggleTaskStatus(t.id)}
                              className="p-2 bg-white/[0.02] border border-white/[0.04] rounded-lg flex items-center justify-between cursor-pointer transition hover:border-[#d4b87a]/30 text-left"
                            >
                              <div>
                                <b className="text-[10px] text-white block leading-none">{t.title}</b>
                                <span className="text-[8px] font-mono text-white/40 block mt-1">{t.assignee} · {t.maturity}</span>
                              </div>
                              <span className={`text-[8.5px] font-mono uppercase font-bold ${t.status === 'concluido' ? 'text-[#5dcaa5]' : 'text-white/35'}`}>{t.status}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SUBPAGE: VOCÊ (PDI & SIGNIFICADO UNIFICADOS) */}
              {lideresTab === 'voce' && (
                <motion.div
                  key="voce"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-sub-view active space-y-5 text-left"
                >
                  {/* Top Highlight: Progress */}
                  <div className="p-5 bg-gradient-to-r from-black/60 to-black/30 border border-[#d4b87a]/20 rounded-2xl relative overflow-hidden backdrop-blur-3xl shadow-[0_0_40px_rgba(212,184,122,0.05)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b87a]/10 blur-[80px] pointer-events-none mix-blend-screen" />
                    <span className="font-mono text-[10px] text-[#d4b87a] tracking-[0.1em] uppercase font-bold block mb-3">PDI - JORNADA DO LÍDER</span>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1 height-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-[#d4b87a] to-white relative"
                          style={{ width: `${lessonsCompletedPercent}%`, boxShadow: '0 0 10px rgba(212,184,122,0.5)' }}
                        >
                          <div className="absolute inset-0 bg-white/30 mix-blend-overlay w-full h-full animate-pulse" />
                        </div>
                      </div>
                      <span className="font-mono text-[12px] font-bold text-white drop-shadow-md">{lessonsCompletedPercent}%</span>
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed m-0 font-sans max-w-3xl">
                      Seu PDI calcula automaticamente baseado nas suas ações reais registradas no cockpit (ex: Diário IE, Feedbacks SBI, OKRs). <b className="text-white/90">Não pule etapas!</b>
                    </p>
                  </div>

                  {/* Grid 1: Diário IE & Alpha Linter + Microaulas */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Diary & CNV */}
                    <div className="lg:col-span-7 space-y-5">
                      {/* Diary Form */}
                      <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-[13px] m-0 font-bold text-white tracking-wide">Diário de Inteligência Emocional + IA</h4>
                          <button className="px-3 py-1.5 border border-[#d4b87a]/30 rounded-lg text-[#d4b87a] text-[9px] font-mono font-bold tracking-widest hover:bg-[#d4b87a]/10 hover:border-[#d4b87a]/60 transition-all shadow-[0_0_15px_rgba(212,184,122,0.1)]">▶ AULA</button>
                        </div>
                        <p className="text-[10px] text-white/50 m-0 mb-4 font-sans leading-relaxed">Escreva sobre uma situation que gerou emoção intensa. A IA analisa o padrão e sugere ações de autogestão.</p>
                        
                        <div className="flex flex-col gap-3">
                          <textarea 
                            value={diaryInput}
                            onChange={(e) => setDiaryInput(e.target.value)}
                            placeholder="Situação geradora de emoção intensa..."
                            className="cnv-text-area"
                          />
                          <button 
                            onClick={handleAddDiary}
                            className="px-3.5 py-1.5 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/45 rounded-lg text-[9px] font-bold text-[#d4b87a] font-mono transition"
                            style={{ alignSelf: 'flex-end' }}
                          >
                            + ADICIONAR ENTRADA
                          </button>
                        </div>

                        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {diaryLogs.length === 0 ? (
                            <span style={{ fontSize: '10px', fontStyle: 'italic', opacity: 0.5 }}>Nenhuma entrada ainda. Comece hoje — autoconhecimento é a fase 1 do PDI.</span>
                          ) : (
                            diaryLogs.map((log, idx) => (
                              <div key={idx} className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                                <span className="text-[7.5px] font-mono text-[#d4b87a] font-bold block">{log.time} · AUTO-REGISTRO</span>
                                <p className="text-[9.5px] text-white/70 mt-1 leading-snug">{log.text}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* CNV Rosenberg linter */}
                      <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5dcaa5]/5 blur-[80px] pointer-events-none mix-blend-screen" />
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-[13px] m-0 font-bold text-white tracking-wide">Linter de Comunicação (Índice α)</h4>
                          <span className="font-mono text-[9px] text-[#5dcaa5] border border-[#5dcaa5]/20 bg-[#5dcaa5]/5 px-2 py-1 rounded">CNV Rosenberg</span>
                        </div>
                        <p className="text-[10px] text-white/50 m-0 mb-4 font-sans leading-relaxed">Reduza julgamentos e transforme sua comunicação executiva em fatos objetivos.</p>

                        <textarea 
                          value={cnvInput}
                          onChange={(e) => setCnvInput(e.target.value)}
                          placeholder="Ex: O colaborador é preguiçoso e sempre atrasa as entregas da sprint."
                          className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-3 text-[11px] text-white font-sans leading-relaxed outline-none focus:border-[#d4b87a]/40 focus:ring-1 focus:ring-[#d4b87a]/20 min-h-[80px] resize-none"
                        />

                        <div className="flex justify-between items-center mt-3">
                          <b className="text-[12px] font-mono text-white/80 tracking-widest">{cnvScore || 'Score Alpha: --'}</b>
                          <button 
                            onClick={handleCnvAnalyze}
                            disabled={cnvAnalyzing}
                            className="px-4 py-2 bg-[#d4b87a]/10 hover:bg-[#d4b87a]/20 border border-[#d4b87a]/30 rounded-xl text-[9px] font-bold text-[#d4b87a] font-mono transition-all disabled:opacity-50"
                          >
                            {cnvAnalyzing ? 'Analisando...' : 'CALCULAR ÍNDICE ALPHA'}
                          </button>
                        </div>

                        {cnvFeedback && (
                          <div className="mt-4 bg-black/30 border border-[#5dcaa5]/20 rounded-xl p-4 text-[11px] leading-relaxed text-white/80 font-sans border-l-2 border-l-[#5dcaa5]">
                            {cnvFeedback}
                          </div>
                        )}

                        <div className="mt-5 border-t border-white/[0.06] pt-5">
                          <span className="font-mono text-[9px] text-[#d4b87a] tracking-widest block mb-3 font-bold uppercase">📡 PDI DE COMUNICAÇÃO · 4 MÓDULOS</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 hover:border-[#d4b87a]/20 transition-colors">
                              <b className="text-[11px] text-white block mb-1 font-mono tracking-wide">MÓDULO 1: Fato vs Julgamento</b>
                              <span className="text-[10px] text-white/50 block mb-3 font-sans leading-relaxed">Eliminar adjetivos subjetivos da sua comunicação técnica.</span>
                              <span className="font-mono text-[9px] text-[#5dcaa5] block tracking-widest font-bold">KPI: Alpha-Linter &gt;70%</span>
                            </div>
                            <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 hover:border-[#d4b87a]/20 transition-colors">
                              <b className="text-[11px] text-white block mb-1 font-mono tracking-wide">MÓDULO 2: Assertividade (CNV)</b>
                              <span className="text-[10px] text-white/50 block mb-3 font-sans leading-relaxed">Fato + Sentimento + Necessidade + Pedido em conversas difíceis.</span>
                              <span className="font-mono text-[9px] text-[#5dcaa5] block tracking-widest font-bold">KPI: 3 conversas/mês</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Microaulas Checklist */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5">
                        <h4 className="text-[14px] font-bold text-white mb-4 tracking-wide">Fase 1: Autoconhecimento</h4>
                        <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-4 flex justify-between font-bold">
                          <span>0/5 MÓDULOS COMPLETOS</span>
                          <span className="text-white/80">{lessonsCompletedPercent}%</span>
                        </div>

                        <div className="space-y-2">
                          {lessons.map((lesson, idx) => {
                            const expanded = expandedLesson === lesson.id
                            return (
                              <div 
                                key={lesson.id} 
                                className={`p-4 bg-white/[0.01] border rounded-xl cursor-pointer transition-all ${expanded ? 'border-[#d4b87a]/40 bg-[#d4b87a]/5' : 'border-white/[0.04] hover:border-white/[0.1]'}`} 
                                onClick={() => setExpandedLesson(expanded ? null : lesson.id)}
                              >
                                <div className="flex justify-between items-center">
                                  <b className={`text-[11px] font-sans tracking-wide transition-colors ${expanded ? 'text-[#d4b87a]' : 'text-white'}`}>▶ {lesson.title}</b>
                                  <input 
                                    type="checkbox" 
                                    checked={microaulasProgress[idx] || false}
                                    onChange={() => handleToggleLessonCheck(idx)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-3.5 h-3.5 accent-[#d4b87a] rounded cursor-pointer"
                                  />
                                </div>
                                <div className={`mt-3 text-[10px] text-white/60 font-sans leading-relaxed overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  {lesson.body}
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Locked phases */}
                        <div style={{ background: 'rgba(0,0,0,0.3)', border: '0.2px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '12px', marginTop: '12px', opacity: 0.6 }}>
                          <span style={{ fontSize: '11px', display: 'block', fontWeight: 'bold', marginBottom: '2px', color: '#fff' }}>🔒 Fase 2: Ponte de Empatia</span>
                          <span style={{ fontSize: '9.5px', opacity: 0.5, display: 'block' }}>Complete ≥ 80% da Fase 1 para desbloquear.</span>
                        </div>
                      </div>

                      {/* Autoavaliação M1-M4 */}
                      <div className="dash-card">
                        <h4 style={{ fontSize: '12px', marginTop: 0, marginBottom: '4px', fontWeight: 'bold', color: '#fff' }}>Autoavaliação Liderança</h4>
                        <p style={{ fontSize: '9.5px', opacity: 0.5, marginBottom: '12px' }}>Avalie seu repertório em cada estilo. Reavalie a cada 90 dias.</p>
                        
                        <div className="space-y-2">
                          {[
                            { id: 'm1-eval', title: '1. M1 — Direcionar', q: 'Você dá instruções claras de processos?' },
                            { id: 'm2-eval', title: '2. M2 — Orientar', q: 'Você apoia e cobra entrega técnica?' },
                            { id: 'm3-eval', title: '3. M3 — Apoiar', q: 'Você estimula a iniciativa própria?' },
                            { id: 'm4-eval', title: '4. M4 — Delegar', q: 'Você concede autonomia plena com monitoramento?' }
                          ].map(item => {
                            const expanded = expandedLesson === item.id
                            return (
                              <div key={item.id} className={`interactive-lesson ${expanded ? 'expanded' : ''}`} onClick={() => setExpandedLesson(expanded ? null : item.id)}>
                                <div className="lesson-header">
                                  <b style={{ fontSize: '10.5px', color: '#fff' }}>{item.title}</b>
                                  <span style={{ fontSize: '9.5px', opacity: 0.6 }}>calibrado</span>
                                </div>
                                <div className="lesson-body" onClick={(e) => e.stopPropagation()}>
                                  <span style={{ fontSize: '9.5px', display: 'block', marginBottom: '6px' }}>{item.q}</span>
                                  <input type="range" className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" min="1" max="5" defaultValue="3" style={{ accentColor: '#d4b87a' }} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid 2: Lentes de Missão & Manifesto */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Lentes de Missão */}
                    <div className="lg:col-span-7 dash-card">
                      <h4 style={{ fontSize: '12px', marginTop: 0, marginBottom: '4px', fontWeight: 'bold', color: '#fff' }}>Lentes de Missão — Estudos Críticos OBI</h4>
                      <p style={{ fontSize: '9.5px', opacity: 0.5, marginBottom: '12px' }}>Fundamentos científicos da engenharia de comportamento humano.</p>
                      
                      <div className="space-y-2">
                        {[
                          { id: 'l1', title: '⚡ Gestão de Energia Cerebral', desc: 'O cérebro opera com energia limitada sob incerteza constante. Gerenciar onde e como você gasta a energia do time é estratégia de sobrevivência cognitiva. Reduza reuniões desnecessárias.' },
                          { id: 'l2', title: '🛡️ Cultura como Sistema Imunológico', desc: 'Cultura é o conjunto de comportamentos repetidos no dia a dia que definem como as pessoas decidem quando o líder não está olhando. Fortaleça-a co-criando o Contrato de Aliança.' },
                          { id: 'l3', title: '🔬 Baixa Entropia Interna — Shalom', desc: 'Para o sistema fluir sem desperdício de energia, a clareza deve ser absoluta e o peso morto de retrabalho e microgerenciamento deve ser cortado trimestralmente.' }
                        ].map(l => {
                          const expanded = expandedLesson === l.id
                          return (
                            <div key={l.id} className={`interactive-lesson ${expanded ? 'expanded' : ''}`} onClick={() => setExpandedLesson(expanded ? null : l.id)}>
                              <div className="lesson-header"><b style={{ fontSize: '10.5px', color: '#fff' }}>{l.title}</b><span style={{ fontSize: '8px', color: '#d4b87a', fontWeight: 'bold' }}>LER ▼</span></div>
                              <div className="lesson-body">{l.desc}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Manifesto de Liderança */}
                    <div className="lg:col-span-5 dash-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '12px', margin: 0, fontWeight: 'bold', color: '#fff' }}>Manifesto de Liderança: 5 Princípios</h4>
                      </div>
                      <p style={{ fontSize: '9.5px', opacity: 0.5, marginTop: 0, marginBottom: '12px' }}>Adereço prático diário ao legado principal. Calcule sua nota abaixo.</p>
                      
                      <div className="space-y-2">
                        {manifestoPrinciples.map((p, idx) => (
                          <div key={p.code} style={{ background: 'rgba(255,255,255,0.01)', border: '0.2px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input 
                              type="checkbox" 
                              checked={manifestoChecks[idx]}
                              onChange={() => handleToggleManifesto(idx)}
                              className="manifesto-checkbox"
                              style={{ width: '12px', height: '12px' }}
                            />
                            <div>
                              <b style={{ fontSize: '10.5px', display: 'block', color: '#fff' }}>{p.code} · {p.text.split(' como ')[0]}</b>
                              <span style={{ fontSize: '9px', opacity: 0.6, display: 'block' }}>{p.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit', fontSize: '11px' }}>
                        <span>Índice de Manifesto:</span>
                        <b style={{ color: '#5dcaa5' }}>{manifestoScoreVal}%</b>
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
            className="dash-card gold-border"
            style={{ padding: '24px' }}
          >
            {/* Header info */}
            <div className="sec-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="lhs" style={{ textAlign: 'left' }}>
                <div className="sec-id" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="num" style={{ fontFamily: 'inherit', fontSize: '10px', color: '#b8975a', border: '0.2px solid rgba(212,184,122,0.3)', padding: '1px 6px', borderRadius: '4px', background: 'rgba(212,184,122,0.05)', fontWeight: 'bold' }}>TIME</span>
                  <span className="tag" style={{ fontSize: '9px', color: 'var(--ink-mute)' }}>Saúde e Desenvolvimento Coletivo</span>
                </div>
                <h2 className="sec-h" style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginTop: '6px' }}>Gestão e Dinâmica de Equipe</h2>
                <div className="sec-sub" style={{ fontSize: '9.5px', color: 'var(--ink-mute)', marginTop: '2px' }}>A performance real do time depende da maturidade coletiva (Tuckman), do alinhamento HHH e da clareza do Contrato de Aliança.</div>
              </div>
              <div className="rhs">
                <button 
                  onClick={() => triggerToast('Carregando mentoria de dinâmica de equipes...', 'ok')}
                  className="btn-professor-ia"
                >
                  ▶ PROFESSOR IA
                </button>
              </div>
            </div>

            {/* Sub-tabs Row */}
            <div className="tab-time-row">
              {[
                { id: 'formar', label: 'Formar & Contrato' },
                { id: 'pessoas', label: 'Pessoas & Perfil' },
                { id: 'influencia', label: 'Influência & Mediação' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setTimeTab(sub.id as TimeSubTab)}
                  className={`sub-tab-btn ${timeTab === sub.id ? 'active' : ''}`}
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
                    <div className="dash-card space-y-3">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Velocidade Tuckman — Estágios do Time</h4>
                        <p className="text-[9px] text-white/45 font-sans">Calibre o multiplicador coletivo conforme o nível de maturidade:</p>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center font-mono">
                        {[
                          { id: 'forming', label: 'Forming', val: 'x0.6', color: tuckmanStage === 'forming' ? 'border-[#d4b87a]/60 bg-[#d4b87a]/10 text-[#d4b87a] shadow-[0_0_12px_rgba(212,184,122,0.15)]' : 'border-white/[0.06] bg-black/30 text-white/40 hover:border-white/10 hover:text-white/60' },
                          { id: 'storming', label: 'Storming', val: 'x0.4', color: tuckmanStage === 'storming' ? 'border-[#e24b4a]/60 bg-[#e24b4a]/10 text-[#e24b4a] shadow-[0_0_12px_rgba(226,75,74,0.15)]' : 'border-white/[0.06] bg-black/30 text-white/40 hover:border-white/10 hover:text-white/60' },
                          { id: 'norming', label: 'Norming', val: 'x0.95', color: tuckmanStage === 'norming' ? 'border-[#fac775]/60 bg-[#fac775]/10 text-[#fac775] shadow-[0_0_12px_rgba(250,199,117,0.15)]' : 'border-white/[0.06] bg-black/30 text-white/40 hover:border-white/10 hover:text-white/60' },
                          { id: 'performing', label: 'Performing', val: 'x1.45', color: tuckmanStage === 'performing' ? 'border-[#5dcaa5]/60 bg-[#5dcaa5]/10 text-[#5dcaa5] shadow-[0_0_12px_rgba(93,202,165,0.15)]' : 'border-white/[0.06] bg-black/30 text-white/40 hover:border-white/10 hover:text-white/60' }
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
                      <div className="p-3 bg-black/40 border border-white/[0.05] rounded-lg font-mono text-[9.5px] leading-normal text-white/60">
                        <span className="text-[#d4b87a] text-[8px] font-bold block mb-1">PR = ΣPI × T − LG · POTENCIAL REAL</span>
                        <b>POTENCIAL REAL:</b> Potencial calibrado em <b className="text-white">{calculatedPotential}%</b> baseado nos {teamMembers.length} liderados ativos e no multiplicador.
                      </div>

                      {/* HHH parameters */}
                      <div className="border-t border-white/[0.04] pt-3">
                        <span className="text-[8px] font-mono text-[#d4b87a] uppercase tracking-wider block mb-2 font-bold">HHH Framework (Médio do Time)</span>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg shadow-inner">
                            <span className="text-[8px] text-white/45 block">Smart (Cabeça)</span>
                            <b className="text-sm font-mono text-white mt-1 block font-bold">{avgHead}/100</b>
                          </div>
                          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg shadow-inner">
                            <span className="text-[8px] text-white/45 block">Humble (Coração)</span>
                            <b className="text-sm font-mono text-white mt-1 block font-bold">{avgHeart}/100</b>
                          </div>
                          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg shadow-inner">
                            <span className="text-[8px] text-white/45 block">Hungry (Mãos)</span>
                            <b className="text-sm font-mono text-white mt-1 block font-bold">{avgHands}/100</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contrato de Aliança */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="dash-card space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Contrato de Aliança</h4>
                        <button 
                          onClick={handleGenerateAllianceContract}
                          className="px-2 py-1 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/30 text-[#d4b87a] rounded text-[8px] font-mono font-bold"
                        >
                          ✨ GERAR VIA IA
                        </button>
                      </div>
                      
                      <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                        {allianceClauses.map((clause, idx) => (
                          <div key={idx} className="p-2.5 bg-black/20 border border-white/[0.06] rounded-lg flex items-center justify-between gap-2 text-[10px] hover:border-[#d4b87a]/20 transition">
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
                          className="flex-1 bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1.5 text-[9.5px] outline-none focus:border-[#d4b87a]/40"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddAllianceClause()}
                        />
                        <button 
                          onClick={handleAddAllianceClause}
                          className="px-3 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/45 rounded-[0.4rem] text-[9.5px] font-bold text-[#d4b87a] transition"
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
                  <div className="lg:col-span-6 dash-card space-y-3">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">Algoritmo de Identificação de Sucessor</h4>
                      <p className="text-[9.5px] text-white/40 font-sans">Parâmetros combinados de D6 + HHH + Propósito</p>
                    </div>

                    <div className="space-y-2">
                      {rankedSuccessors.map((member, i) => (
                        <div key={member.id} className="p-3 bg-black/35 border border-white/[0.06] rounded-lg flex items-center justify-between hover:border-[#d4b87a]/25 transition">
                          <div className="flex items-center gap-3">
                            <b className="text-[#d4b87a] font-mono text-[10px]">0{i + 1}</b>
                            <div>
                              <b className="text-[10.5px] text-white leading-none block font-bold">{member.name}</b>
                              <span className="text-[8.5px] font-mono text-white/40">{member.role}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-[10px] font-mono font-bold text-[#5dcaa5] block leading-none">{member.successionScore} pts</span>
                            <span className="text-[8px] text-white/35 block mt-0.5">{member.wishes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profiler detail */}
                  <div className="lg:col-span-6 dash-card space-y-3">
                    <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">Ficha de Perfil do Liderado</h4>
                        <p className="text-[9.5px] text-white/40 font-sans">Visualização unificada de fit cultural</p>
                      </div>
                      
                      <select
                        value={selectedProfileId}
                        onChange={(e) => setSelectedProfileId(e.target.value)}
                        className="bg-black/40 border border-white/[0.08] rounded px-2.5 py-1 text-[9.5px] text-white outline-none focus:border-[#d4b87a]/40"
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
                              <b className="text-white text-[12px] block leading-none font-bold">{m.name}</b>
                              <span className="text-white/45 text-[9px] font-mono block mt-1">{m.role} · Maturidade {m.maturity}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-white/60 bg-black/35 p-3 rounded-lg border border-white/[0.06]">
                            <div>D6 Health Index: <b className="text-white">{m.d6}%</b></div>
                            <div>Alinhamento: <b className="text-[#5dcaa5]">{m.status}</b></div>
                            <div>Humble: <b className="text-white">{m.hhh.humble}%</b></div>
                            <div>Hungry: <b className="text-white">{m.hhh.hungry}%</b></div>
                            <div className="col-span-2 mt-1 pt-1 border-t border-white/[0.04]">Desejo de Carreira: <b className="text-[#fac775]">{m.wishes}</b></div>
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
                  <div className="lg:col-span-7 dash-card space-y-3">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">Protocolo de Mediação ALX</h4>
                      <p className="text-[9.5px] text-white/40 font-sans">IA-Assisted Thomas-Kilmann conflict resolver</p>
                    </div>

                    <textarea 
                      value={conflictDesc}
                      onChange={(e) => setConflictDesc(e.target.value)}
                      placeholder="Descreva o conflito ocorrido na equipe de forma extremamente objetiva (ex: Discordância de metodologia de calibração bioneural)..."
                      className="cnv-text-area h-20"
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
                  <div className="lg:col-span-5 dash-card">
                    <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase font-mono mb-2">Thomas-Kilmann Styles</h4>
                    <p className="text-[9px] text-white/45 mb-3 font-sans">5 estilos de resolução para calibração</p>
                    
                    <div className="space-y-1.5 font-sans text-[9px] text-white/60">
                      <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>Competição:</b> Alta assertividade, baixa cooperação.</div>
                      <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>Colaboração:</b> Alta assertividade, alta cooperação. Win-win.</div>
                      <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>Compromisso:</b> Equilíbrio sutil de concessões.</div>
                      <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>Acomodação:</b> Baixa assertividade, alta cooperação.</div>
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
            className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#5dcaa5]/20 relative overflow-hidden"
            style={{ padding: '24px' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5dcaa5]/5 blur-[80px] pointer-events-none mix-blend-screen" />
            
            {/* Header info */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="text-left max-w-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-[#5dcaa5]/10 border border-[#5dcaa5]/30 rounded text-[9px] font-mono font-bold text-[#5dcaa5] tracking-widest uppercase">EMPRESA</span>
                  <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Direção &amp; Estratégia Corporativa</span>
                </div>
                <h2 className="text-[18px] font-bold text-white mb-2 tracking-tight">Estratégia · BI · Organização</h2>
                <div className="text-[11px] text-white/60 font-sans leading-relaxed">Conecte o desenvolvimento da liderança e a força do time aos resultados do negócio através de OKRs e análise sistêmica.</div>
              </div>
              <div>
                <button 
                  onClick={() => triggerToast('Professor de IA iniciando análise corporativa...', 'ok')}
                  className="px-4 py-2 bg-gradient-to-r from-[#5dcaa5]/20 to-[#5dcaa5]/5 hover:from-[#5dcaa5]/30 hover:to-[#5dcaa5]/10 border border-[#5dcaa5]/40 rounded-xl text-[10px] font-bold text-[#5dcaa5] font-mono tracking-widest transition-all shadow-[0_0_20px_rgba(93,202,165,0.1)] flex items-center gap-2"
                >
                  <span className="text-[12px]">▶</span> PROFESSOR IA
                </button>
              </div>
            </div>

            {/* Sub-tabs Row */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4 relative z-10">
              <button 
                onClick={() => setEmpresaTab('diagnostico')} 
                className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase font-bold transition-all ${empresaTab === 'diagnostico' ? 'bg-[#5dcaa5] text-black shadow-[0_0_15px_rgba(93,202,165,0.3)]' : 'bg-white/5 border border-white/10 text-white/50 hover:border-[#5dcaa5]/30 hover:text-[#5dcaa5]'}`}
              >
                Auditoria 6D
              </button>
              {[
                { id: 'estrategia', label: 'Estratégia & OKRs' },
                { id: 'bi', label: 'BI & Clima' },
                { id: 'relatorio', label: 'Relatório Mensal' },
                { id: 'canais', label: 'Canais & Ruído' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setEmpresaTab(sub.id as EmpresaSubTab)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase font-bold transition-all ${empresaTab === sub.id ? 'bg-[#5dcaa5] text-black shadow-[0_0_15px_rgba(93,202,165,0.3)]' : 'bg-white/5 border border-white/10 text-white/50 hover:border-[#5dcaa5]/30 hover:text-[#5dcaa5]'}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              
              {/* SUBVIEW: AUDITORIA 6D (DIAGNÓSTICO ATP) */}
              {empresaTab === 'diagnostico' && (
                <motion.div
                  key="diagnostico"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#5dcaa5]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] pointer-events-none mix-blend-screen" />
                    
                    <div className="flex justify-between items-center border-b border-white/[0.04] pb-4 mb-6 relative z-10">
                      <div>
                        <h4 className="text-[12px] font-bold text-[#5dcaa5] uppercase font-mono tracking-widest mb-1">Auditoria de Gestão 6D</h4>
                        <p className="text-[10px] text-white/50 font-sans">Consultoria estratégica em gestão corporativa e alinhamento de liderança (ATP).</p>
                      </div>
                      <button 
                        className="px-4 py-2 bg-gradient-to-r from-[#5dcaa5]/20 to-[#5dcaa5]/5 hover:from-[#5dcaa5]/30 hover:to-[#5dcaa5]/10 border border-[#5dcaa5]/40 rounded-xl text-[10px] font-bold text-[#5dcaa5] font-mono tracking-widest transition-all shadow-[0_0_20px_rgba(93,202,165,0.1)] flex items-center gap-2"
                        onClick={() => triggerToast("Iniciando auditoria de gestão com a IA...", "ok")}
                      >
                        <span className="text-[12px]">▶</span> IA ANALYZER
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                      {/* Fase 1 */}
                      <div className="p-5 bg-black/40 border border-white/10 hover:border-[#5dcaa5]/40 rounded-2xl transition-all group relative">
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#5dcaa5]/20 border border-[#5dcaa5]/50 text-[#5dcaa5] flex items-center justify-center font-bold font-mono text-[14px]">1</div>
                        <h5 className="text-[12px] font-bold text-white mb-2 ml-4">Mapeamento PESTEL</h5>
                        <p className="text-[10px] text-white/50 mb-4 ml-4 leading-relaxed font-sans">Análise Macroambiental. Identifique fatores Políticos, Econômicos e Tecnológicos que impactam a corporação.</p>
                        <button className="w-full py-2 bg-white/5 hover:bg-[#5dcaa5]/10 border border-white/10 hover:border-[#5dcaa5]/30 rounded-lg text-[9px] font-mono text-white/70 hover:text-[#5dcaa5] transition-all font-bold tracking-widest">INICIAR FASE 1</button>
                      </div>

                      {/* Fase 2 */}
                      <div className="p-5 bg-black/40 border border-white/10 hover:border-[#5dcaa5]/40 rounded-2xl transition-all group relative opacity-80">
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/30 flex items-center justify-center font-bold font-mono text-[14px]">2</div>
                        <h5 className="text-[12px] font-bold text-white mb-2 ml-4">Forças de Porter</h5>
                        <p className="text-[10px] text-white/50 mb-4 ml-4 leading-relaxed font-sans">Análise Microambiental. Avalie a rivalidade, novos entrantes e poder de negociação para ajustar o posicionamento.</p>
                        <button className="w-full py-2 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-white/20 cursor-not-allowed tracking-widest font-bold">BLOQUEADO</button>
                      </div>

                      {/* Fase 3 */}
                      <div className="p-5 bg-black/40 border border-white/10 hover:border-[#5dcaa5]/40 rounded-2xl transition-all group relative opacity-80">
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/30 flex items-center justify-center font-bold font-mono text-[14px]">3</div>
                        <h5 className="text-[12px] font-bold text-white mb-2 ml-4">VRIO &amp; Cadeia de Valor</h5>
                        <p className="text-[10px] text-white/50 mb-4 ml-4 leading-relaxed font-sans">Análise Interna. Identifique recursos Valiosos e Inimitáveis para sustentar a vantagem competitiva.</p>
                        <button className="w-full py-2 bg-black/40 border border-white/5 rounded-lg text-[9px] font-mono text-white/20 cursor-not-allowed tracking-widest font-bold">BLOQUEADO</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

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
                  <div className="lg:col-span-7 dash-card space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[11px] font-bold text-white uppercase font-mono">OKRs Trimestrais · Q2 2026</h4>
                        <p className="text-[9px] text-white/40 font-sans">41 dias restantes · Q2 consolidado</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {okrs.map(okr => (
                        <div key={okr.id} className="p-3.5 bg-black/35 border border-white/[0.06] rounded-lg space-y-2 hover:border-[#d4b87a]/20 transition">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-white/95 font-bold">{okr.title}</span>
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
                      <span className="text-[8px] font-mono text-[#d4b87a] uppercase tracking-wider block font-bold">Criar Novo OKR Estratégico</span>
                      <input 
                        type="text" 
                        placeholder="Objetivo principal (ex: Reduzir churn em 10%)..." 
                        value={newOkrTitle}
                        onChange={(e) => setNewOkrTitle(e.target.value)}
                        className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1.5 text-[9.5px] outline-none focus:border-[#d4b87a]/40"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Key Results (ex: KR1: LTV > 12 meses, KR2: zero bugs)..." 
                          value={newOkrKr}
                          onChange={(e) => setNewOkrKr(e.target.value)}
                          className="flex-1 bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1.5 text-[9.5px] outline-none focus:border-[#d4b87a]/40"
                        />
                        <button 
                          onClick={handleAddOkr}
                          className="px-3 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/45 rounded-[0.4rem] text-[9.5px] font-bold text-[#d4b87a] transition"
                        >
                          DEFINIR
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: strategic info bank */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="dash-card space-y-3">
                      <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase font-mono">Banco de Estratégias</h4>
                      <div className="space-y-1.5 font-sans text-[9px] text-white/50">
                        <div className="p-2.5 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>D6 Diagnóstico:</b> Visão cruzada 360 do time em 6 dimensões de saúde.</div>
                        <div className="p-2.5 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>eNPS Clima:</b> Frequência mensal de contentamento e disposição de indicar a equipe.</div>
                        <div className="p-2.5 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>ISR Score:</b> Relação de impacto e reconhecimento individual do colaborador.</div>
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
                  <div className="lg:col-span-8 dash-card space-y-3">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">ROI do Clima Organizacional (Custo Oculto)</h4>
                      <p className="text-[9.5px] text-white/40 font-sans">Estresses, ruídos e retrabalhos geram latência. Meça os custos ocultos sistêmicos:</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Salário Médio (R$)</label>
                        <input 
                          type="number" 
                          value={climateSalary}
                          onChange={(e) => setClimateSalary(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Latência Executiva (%)</label>
                        <input 
                          type="number" 
                          value={climateLatency}
                          onChange={(e) => setClimateLatency(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Taxa de Retrabalho (%)</label>
                        <input 
                          type="number" 
                          value={climateRework}
                          onChange={(e) => setClimateRework(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Risco de Turnover (%)</label>
                        <input 
                          type="number" 
                          value={climateTurnover}
                          onChange={(e) => setClimateTurnover(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 bg-red-950/25 border border-red-900/40 rounded-lg flex justify-between items-center shadow-inner">
                      <div>
                        <span className="text-[8.5px] font-mono text-white/45 block">Custo Oculto Estimado / Mês</span>
                        <b className="text-lg font-mono text-red-400">R$ {climateHiddenCost}</b>
                      </div>
                      <span className="text-[9.5px] font-mono text-white/30 uppercase tracking-wide font-bold">Turnover + Risco real</span>
                    </div>
                  </div>

                  {/* eNPS consolidated gauge */}
                  <div className="lg:col-span-4 dash-card space-y-3">
                    <h4 className="text-[11px] font-bold text-white uppercase font-mono">Consolidado eNPS</h4>
                    
                    <div className="p-5 bg-black/35 rounded-lg border border-white/[0.06] text-center space-y-1">
                      <span className="text-[8px] font-mono text-[#5dcaa5] uppercase block font-bold">Zona de Calibração</span>
                      <b className="text-3xl font-mono text-[#5dcaa5] font-bold">+74</b>
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
                  className="dash-card text-left space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                    <div>
                      <h4 className="text-[11px] font-bold text-white uppercase font-mono">Relatório Executivo Consolidador</h4>
                      <p className="text-[9px] text-white/45 font-sans">Compilação estratégica gerada com base nas interações reais da plataforma</p>
                    </div>
                    <button 
                      onClick={() => window.print()}
                      className="px-3.5 py-1.5 bg-[#d4b87a]/15 hover:bg-[#d4b87a]/30 border border-[#d4b87a]/45 text-[#d4b87a] rounded-[0.4rem] text-[8.5px] font-mono font-bold transition"
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
                  <div className="lg:col-span-8 dash-card space-y-3">
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
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
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
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
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

                    <div className="p-3.5 bg-black/35 rounded-lg border border-white/[0.06] flex justify-between items-center shadow-inner">
                      <div>
                        <span className="text-[8.5px] font-mono text-white/45 block">Índice de Ruído Calculado</span>
                        <b className={`text-lg font-mono ${noiseScore > 70 ? 'text-red-400' : 'text-[#5dcaa5]'}`}>{noiseScore}%</b>
                      </div>
                      <span className="text-[9px] font-mono text-white/50">{channelFeedback}</span>
                    </div>
                  </div>

                  {/* C2 Communication Styles */}
                  <div className="lg:col-span-4 dash-card space-y-3">
                    <h4 className="text-[11px] font-bold text-[#d4b87a] uppercase font-mono">C² Communication Matrix</h4>
                    
                    <div className="space-y-1.5 font-sans text-[8.5px] text-white/60">
                      <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>Direto:</b> Objetivo e focado em fatos. Indicado para M3/M4.</div>
                      <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>Analítico:</b> Data-driven, focado em métricas.</div>
                      <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d4b87a]/15 transition"><b>Relacional:</b> Empático, focado na calibração emocional.</div>
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
