'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, CheckSquare, Square, ChevronDown, ChevronUp, UserCheck, 
  BookOpen, AlertCircle, Play, Plus, Trash2, Activity, ShieldAlert, 
  FileText, Users, Award, Compass, Cpu, Zap, BarChart3, Search, Undo2,
  Bot, Mic, SendHorizontal, Radar, FileDown, Network, SquareSquare
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
  d1: number
  d2: number
  d3: number
  d4: number
  d5: number
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

export function SigPessoasPanel({ mode = 'pessoas' }: { mode?: 'pessoas' | 'empresa' }) {
  const [activeTab, setActiveTab] = useState<TabOption>(mode === 'empresa' ? 'empresa' : 'home')
  const [lideresTab, setLideresTab] = useState<LideresSubTab>('voce')
  const [timeTab, setTimeTab] = useState<TimeSubTab>('formar')
  const [empresaTab, setEmpresaTab] = useState<EmpresaSubTab>('diagnostico')
  const [auditoriaStep, setAuditoriaStep] = useState<number | null>(null)
  const [etapa2Tab, setEtapa2Tab] = useState<'macro' | 'micro' | 'stakeholders' | 'reflexao'>('macro')
  const [selectedStakeholder, setSelectedStakeholder] = useState<string | null>(null)
  const [etapa3Tab, setEtapa3Tab] = useState<'organograma' | 'estilo' | 'controles' | 'reflexao'>('organograma')
  const [selectedOrgNode, setSelectedOrgNode] = useState<string | null>(null)
  const [organicRatio, setOrganicRatio] = useState<number>(65)
  const [activeReportSection, setActiveReportSection] = useState<number>(1)

  // Consultoria IA Chat States
  const [consultingChat, setConsultingChat] = useState<{role: 'ai'|'user', text: string}[]>([
    {role: 'ai', text: 'Olá! Sou o Mentor IA. Analisando perfil da empresa... Vamos iniciar o mapeamento. Para começar, poderia descrever brevemente qual é a história e o diferencial da organização?'}
  ])
  const [consultingInput, setConsultingInput] = useState('')
  const [isRecordingAudio, setIsRecordingAudio] = useState(false)
  const [isAnalyzingData, setIsAnalyzingData] = useState(false)

  // Global Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'ok' | 'warn'>('ok')

  function triggerToast(msg: string, type: 'ok' | 'warn' = 'ok') {
    setToastMsg(msg)
    setToastType(type)
    setTimeout(() => setToastMsg(null), 3000)
  }

  useEffect(() => {
    if (auditoriaStep === null) {
      setConsultingChat([
        {role: 'ai', text: 'Olá! Sou o Mentor IA. Analisando perfil da empresa... Vamos iniciar o mapeamento. Para começar, poderia descrever brevemente qual é a história e o diferencial da organização?'}
      ])
    } else if (auditoriaStep === 1) {
      setConsultingChat([
        {role: 'ai', text: 'Olá! Iniciamos a Etapa 1: Prospecção & Setup. Vamos mapear as maiores forças e fraquezas (gaps) da Nossa Consultoria BI. Poderia nos contar quais são os pontos mais fortes que percebe na empresa hoje?'}
      ])
    } else if (auditoriaStep === 2) {
      setConsultingChat([
        {role: 'ai', text: 'Olá! Iniciamos a Etapa 2: Macro, Micro & Stakeholders. Vamos avaliar as pressões ambientais e a matriz Poder vs Interesse para a Nossa Consultoria BI / Auditoria 6D. Gostaria de focar primeiro no Macroambiente (PESTEL), no Microambiente (Porter) ou mapear um Stakeholder específico?'}
      ])
    } else if (auditoriaStep === 3) {
      setConsultingChat([
        {role: 'ai', text: 'Olá! Iniciamos a Etapa 3: Estrutura & Controle. Mapearemos o organograma e o estilo de liderança (orgânico vs mecanicista). Qual é a atual distribuição de papéis e centralização de decisão na diretoria?'}
      ])
    } else if (auditoriaStep === 4) {
      setConsultingChat([
        {role: 'ai', text: 'Olá! Chegamos à Etapa 4: Relatório Executivo de Consultoria. Compilei as respostas das etapas anteriores e cruzei com a teoria. O PDF do Dossiê Acadêmico completo está pronto para download à direita! Caso tenha alguma dúvida ou queira simular outra melhoria, é só falar.'}
      ])
    }
  }, [auditoriaStep])

  // --- STATE FOR INTERACTIVE RECRUITMENT WIZARD ---
  const [recruitmentRole, setRecruitmentRole] = useState<'Liderado' | 'Gestor' | 'Líder & Gestor' | 'Líder' | null>(null)
  const [recruitmentStep, setRecruitmentStep] = useState<number>(0)
  const [newCandName, setNewCandName] = useState<string>('')
  const [newCandRoleTitle, setNewCandRoleTitle] = useState<string>('')
  const [recruitmentAnswers, setRecruitmentAnswers] = useState<string[]>([])
  const [recruitmentResult, setRecruitmentResult] = useState<{
    humble: number
    hungry: number
    smart: number
    score: number
    grade: string
    feedback: string
  } | null>(null)

  const recruitmentQuestions = {
    'Liderado': [
      'Como você reage quando comete um erro que afeta a equipe?',
      'O que você prioriza quando as metas individuais conflitam com o bem-estar do grupo?',
      'Conte sobre uma vez em que assumiu trabalho extra por iniciativa própria.',
      'Como você lida com feedbacks construtivos difíceis de digerir?',
      'O que significa "fazer o que é certo" no ambiente de trabalho para você?'
    ],
    'Gestor': [
      'Como você calibra a autonomia que dá a um liderado (ex: de M1 a M4)?',
      'Qual o seu método para lidar com conflitos socioemocionais no time?',
      'Como você acompanha a entrega sem fazer microgerenciamento?',
      'Descreva como conduz rituais de 1:1 e de feedback estruturado.',
      'Como você equilibra a cobrança por metas com a empatia e saúde mental?',
      'O que você faz quando um liderado talentoso tem um comportamento desalinhado culturalmente?',
      'Como você avalia a maturidade de liderança de seus coordenadores?'
    ],
    'Líder & Gestor': [
      'Como você traduz a visão estratégica do board em rotinas diárias e OKRs para o time?',
      'Qual a sua postura diante de uma decisão executiva da qual você discorda mas precisa desdobrar?',
      'Como você desenvolve a liderança secundária (sucessão) no seu setor?',
      'Como você reage ao perceber que seu estilo pessoal está sufocando o time?',
      'Descreva sua abordagem para demitir alguém por desalinhamento cultural absoluto.',
      'Como você garante clareza de papéis e responsabilidades em cenários de alta ambiguidade?',
      'Como você promove a segurança psicológica sem abrir mão de alta performance?',
      'De que forma você aplica o feedback SBI em níveis táticos e gerenciais?',
      'Como você incentiva o conflito construtivo antes de fechar um consenso?',
      'Qual o seu critério para calibrar recursos e orçamento entre projetos do time?'
    ],
    'Líder': [
      'Como você influencia e molda a cultura organizacional sem ter autoridade hierárquica direta?',
      'Descreva como lidera processos de transformação digital ou cultural complexos.',
      'Como você lida com pressões políticas e conflitos de interesse entre C-levels?',
      'Qual o papel da coragem ética na sua tomada de decisão estratégica?',
      'Como você defende valores inegociáveis mesmo sob risco de perda financeira?',
      'Como você mapeia os stakeholders e constrói alianças estratégicas na empresa?',
      'Descreva um erro estratégico que você cometeu e como lidou com o impacto corporativo.',
      'Como você mantém sua lucidez operacional e inteligência emocional sob estresse agudo?',
      'Como você inspira times multidisciplinares sobre os quais não tem controle direto?',
      'Qual o legado de liderança e impacto sustentável que você busca construir?'
    ]
  }

  // --- STATE FOR CANDIDATES ---
  const defaultCandidates: Candidate[] = []
  const [candidates, setCandidates] = useState<Candidate[]>([])

  // --- STATE FOR TEAM MEMBERS ---
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  // --- STATE FOR RADAR DIMENSIONS ---
  const [selectedDims, setSelectedDims] = useState<string[]>(['D1', 'D2', 'D3', 'D4', 'D5', 'D6'])
  
  // Dynamic 6D calculations based on teamMembers
  const avgD1 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d1 || 0), 0) / teamMembers.length) : 0;
  const avgD2 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d2 || 0), 0) / teamMembers.length) : 0;
  const avgD3 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d3 || 0), 0) / teamMembers.length) : 0;
  const avgD4 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d4 || 0), 0) / teamMembers.length) : 0;
  const avgD5 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d5 || 0), 0) / teamMembers.length) : 0;
  const avgD6 = teamMembers.length ? Math.round(teamMembers.reduce((acc, m) => acc + (m.d6 || 0), 0) / teamMembers.length) : 0;

  const getDimColor = (val: number) => val >= 80 ? '#5dcaa5' : val >= 65 ? '#fac775' : '#e24b4a';

  const dimensionsInfo = [
    { code: 'D1', label: 'Cultura', val: avgD1, color: getDimColor(avgD1) },
    { code: 'D2', label: 'Liderança', val: avgD2, color: getDimColor(avgD2) },
    { code: 'D3', label: 'Confiança', val: avgD3, color: getDimColor(avgD3) },
    { code: 'D4', label: 'Entrega', val: avgD4, color: getDimColor(avgD4) },
    { code: 'D5', label: 'Clareza', val: avgD5, color: getDimColor(avgD5) },
    { code: 'D6', label: 'Engajamento', val: avgD6, color: getDimColor(avgD6) }
  ];

  const getPoint = (val: number, angleDeg: number) => {
    const r = (val / 100) * 140;
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    return { x: r * Math.cos(angleRad), y: r * Math.sin(angleRad) };
  };

  const p1 = getPoint(selectedDims.includes('D1') ? avgD1 : 0, 0);
  const p2 = getPoint(selectedDims.includes('D2') ? avgD2 : 0, 60);
  const p3 = getPoint(selectedDims.includes('D3') ? avgD3 : 0, 120);
  const p4 = getPoint(selectedDims.includes('D4') ? avgD4 : 0, 180);
  const p5 = getPoint(selectedDims.includes('D5') ? avgD5 : 0, 240);
  const p6 = getPoint(selectedDims.includes('D6') ? avgD6 : 0, 300);

  // --- STATE FOR MAP TEAM INTERACTION ---

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
  const [diaryLogs, setDiaryLogs] = useState<DiaryLog[]>([])

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
  const [sbiLogs, setSbiLogs] = useState<SbiLog[]>([])

  // --- STATE FOR DELEGATED TASKS ---
  const [delegatedTasks, setDelegatedTasks] = useState<DelegatedTask[]>([])
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
    {
      id: 'okr-1',
      title: 'Acelerar a Transformação Digital de Consultoria BI',
      keyResults: 'KR1: Migrar 90% dos fluxos operacionais para cloud; KR2: Reduzir tempo médio de setup de telemetria de 15 para 3 dias.',
      progress: 70
    },
    {
      id: 'okr-2',
      title: 'Implementar Governança Baseada em Feedback SBI e eNPS',
      keyResults: 'KR1: Obter eNPS > 75; KR2: Garantir que 100% dos colaboradores recebam feedback SBI quinzenalmente.',
      progress: 45
    }
  ])
  const [newOkrTitle, setNewOkrTitle] = useState('')
  const [newOkrKr, setNewOkrKr] = useState('')

  // --- STATE FOR AI OKR GENERATOR ---
  const [generatingOkr, setGeneratingOkr] = useState(false)
  const [selectedOkrType, setSelectedOkrType] = useState('crescimento')
  const [generatedOkrResult, setGeneratedOkrResult] = useState<any | null>(null)
  const [customOkrChallenge, setCustomOkrChallenge] = useState('')

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

  // --- RECRUITMENT WIZARD HANDLERS ---
  function handleStartRecruitment(role: 'Liderado' | 'Gestor' | 'Líder & Gestor' | 'Líder') {
    setRecruitmentRole(role)
    setRecruitmentStep(0)
    setNewCandName('')
    setNewCandRoleTitle('')
    setRecruitmentAnswers([])
    setRecruitmentResult(null)
  }

  function handleRecruitmentNext(answer?: string) {
    if (recruitmentStep === 0) {
      if (!newCandName.trim()) {
        triggerToast('Por favor, informe o nome do candidato.', 'warn')
        return
      }
      setRecruitmentStep(1)
      return
    }

    if (answer) {
      const nextAnswers = [...recruitmentAnswers]
      nextAnswers[recruitmentStep - 1] = answer
      setRecruitmentAnswers(nextAnswers)
    }

    const currentQuestions = recruitmentQuestions[recruitmentRole!]
    const totalSteps = currentQuestions ? currentQuestions.length : 0

    if (recruitmentStep < totalSteps) {
      setRecruitmentStep(recruitmentStep + 1)
    } else {
      setRecruitmentStep(99) // Analyzing
      
      setTimeout(() => {
        const humble = Math.floor(Math.random() * 20) + 80 // 80 - 100
        const hungry = Math.floor(Math.random() * 20) + 80 // 80 - 100
        const smart = Math.floor(Math.random() * 20) + 80 // 80 - 100
        const score = Math.round((humble + hungry + smart) / 3)
        
        let grade = 'HHS B+'
        if (score >= 93) grade = 'HHS A'
        else if (score >= 88) grade = 'HHS A-'
        else if (score >= 83) grade = 'HHS B+'
        else if (score >= 78) grade = 'HHS B'
        
        const feedbacks = [
          "Demonstra forte alinhamento com a cultura da empresa, especialmente em segurança e agilidade. Perfil ideal para atuar sob alta cooperação.",
          "Altamente motivado e focado em resultados rápidos, com excelente inteligência socioemocional. Cuidado extra apenas na calibração inicial.",
          "Excepcional capacidade de comunicação e autogestão. Perfil maduro que se encaixa perfeitamente na liderança tática e colaborativa.",
          "Demonstrou coragem ética marcante nas respostas situacionais. Perfil extremamente humble e hungry, pronto para assumir novos desafios."
        ]
        const feedback = feedbacks[Math.floor(Math.random() * feedbacks.length)]

        setRecruitmentResult({
          humble,
          hungry,
          smart,
          score,
          grade,
          feedback
        })
        setRecruitmentStep(100) // Results
      }, 1800)
    }
  }

  function handleSaveRecruitmentCandidate() {
    if (!recruitmentRole || !recruitmentResult) return

    const newCand: Candidate = {
      id: `cand-${Date.now()}`,
      name: newCandName,
      role: newCandRoleTitle || `${recruitmentRole} Sênior`,
      score: `${recruitmentResult.grade} / Lencioni ${(recruitmentResult.score / 10).toFixed(1)}`,
      stage: 'triagem',
      lencioniScore: recruitmentResult.score,
      stats: {
        hum: recruitmentResult.humble,
        fom: recruitmentResult.hungry,
        int: recruitmentResult.smart
      }
    }

    setCandidates([...candidates, newCand])
    triggerToast(`✓ ${newCand.name} foi inserido no funil (Triagem)!`, 'ok')
    setRecruitmentRole(null)
  }

  function handleCancelRecruitment() {
    setRecruitmentRole(null)
  }

  // --- GLOBAL RESET ACTION ---
  function handleClearAll() {
    if (confirm("Deseja realmente apagar TODOS os dados (candidatos, time, OKRs, feedbacks SBI e diário)? Esta ação é irreversível.")) {
      setCandidates([])
      setTeamMembers([])
      setSbiLogs([])
      setDiaryLogs([])
      setDelegatedTasks([])
      setOkrs([])
      triggerToast("Todos os dados foram completamente limpos!", "warn")
    }
  }

  // --- TEAM MEMBER ACTIONS ---
  function handleDeleteMember(id: string) {
    setTeamMembers(teamMembers.filter(m => m.id !== id))
    triggerToast('Membro da equipe desligado/removido.', 'warn')
  }

  function handleArchiveMember(m: TeamMember) {
    setTeamMembers(teamMembers.filter(x => x.id !== m.id))
    triggerToast(`📥 ${m.name} foi arquivado do time atual.`, 'ok')
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
        d1: c.lencioniScore, d2: c.lencioniScore, d3: c.lencioniScore, d4: c.lencioniScore, d5: c.lencioniScore, d6: c.lencioniScore,
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
      d1: 75, d2: 75, d3: 75, d4: 75, d5: 75, d6: 75,
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

  // AI OKR generator handlers
  function handleGenerateAiOkr() {
    setGeneratingOkr(true)
    triggerToast("IA mapeando dados e formulando OKRs estratégicos...", "ok")
    setTimeout(() => {
      setGeneratingOkr(false)
      let obj = ''
      let krs = ''
      let rat = ''
      
      if (selectedOkrType === 'crescimento') {
        obj = 'Acelerar Margem Operacional e Tracionar LTV/CAC'
        krs = 'KR1: Atingir relação LTV/CAC de 3.5x no trimestre; KR2: Reduzir Churn voluntário de contratos corporativos para < 1.5%; KR3: Aumentar NDR (Net Dollar Retention) para 118%.'
        rat = 'Playbook Google & iFood: Alinha crescimento exponencial com alta retenção de receita corporativa, blindando o fluxo de caixa.'
      } else if (selectedOkrType === 'inovacao') {
        obj = 'Estruturar Modelo de Squads de Alta Autonomia'
        krs = 'KR1: Estabelecer 3 novos squads autônomos de 6-8 membros (Spotify Model); KR2: Reduzir tempo médio de validação de hipóteses de inovação para 5 dias; KR3: Lançar 2 novos recursos orientados por IA no cockpit.'
        rat = 'Cultura LuizaLabs: Garante velocidade operacional máxima, descentralizando a autoridade técnica para resolver gargalos.'
      } else if (selectedOkrType === 'pessoas') {
        obj = 'Consolidar Cultura de Feedback e Segurança Psicológica'
        krs = 'KR1: Alcançar eNPS corporativo de 80 pontos; KR2: Garantir 100% de cobertura nos rituais de feedback SBI quinzenais; KR3: Reduzir burnout subjetivo no pulso do time em 40%.'
        rat = 'Playbook Nubank: Utiliza inteligência socioemocional e alianças de clã para estabilizar equipes sob demandas intensas.'
      } else {
        const customTitle = customOkrChallenge.trim() || 'Desafio Estratégico IPB'
        obj = `Otimizar Performance de: ${customTitle}`
        krs = 'KR1: Validar 100% do escopo do desafio em sprints ágeis de 2 semanas; KR2: Coletar feedback do cliente final a cada ciclo de entrega; KR3: Alcançar 70% de sucesso nas metas ambiciosas traçadas.'
        rat = 'Estratégia Customizada IA: Alinha o seu principal gargalo operacional à disciplina de OKRs com feedback em ciclos rápidos.'
      }

      setGeneratedOkrResult({
        objetivo: obj,
        keyResults: krs,
        rationale: rat
      })
      triggerToast("OKRs gerados com sucesso pela IA!", "ok")
    }, 1500)
  }

  function handleAdoptAiOkr() {
    if (!generatedOkrResult) return
    const log: OkrItem = {
      id: `okr-ai-${Date.now()}`,
      title: generatedOkrResult.objetivo,
      keyResults: generatedOkrResult.keyResults,
      progress: 0
    }
    setOkrs([...okrs, log])
    setGeneratedOkrResult(null)
    setCustomOkrChallenge('')
    triggerToast('OKR gerado por IA adotado no seu ciclo com sucesso!', 'ok')
  }

  function handleConsultingChatSubmit(e?: React.KeyboardEvent, textOverride?: string) {
    if (e && e.key !== 'Enter') return;
    const submission = textOverride || consultingInput;
    if (!submission.trim()) return;

    const newChat = [...consultingChat, { role: 'user' as const, text: submission }];
    setConsultingChat(newChat);
    setConsultingInput('');
    setIsRecordingAudio(false);
    setIsAnalyzingData(true);

    // Simulate AI response based on step
    setTimeout(() => {
      let aiResponse = 'Processando...';
      if (auditoriaStep === 1) aiResponse = 'Excelente. Com base nisso, quais você diria que são as maiores forças dessa organização hoje? E as maiores fraquezas?';
      if (auditoriaStep === 2) {
        const text = submission.toLowerCase();
        if (text.includes('macro') || text.includes('pestel') || text.includes('polit') || text.includes('econ') || text.includes('social') || text.includes('legal')) {
          aiResponse = 'Compreendido! A análise do Macroambiente (PESTEL) é crucial. Note como a instabilidade econômica e a vigência da LGPD impactam diretamente a governança de dados da Nossa Consultoria BI. Ao estruturar os relatórios no SIG Pessoas, o gestor mitiga o risco legal e prova ROI para o board. Qual desses fatores você gostaria de aprofundar?';
        } else if (text.includes('micro') || text.includes('porter') || text.includes('concorr') || text.includes('client') || text.includes('fornece') || text.includes('substitut')) {
          aiResponse = 'Excelente ponto. No Microambiente (5 Forças de Porter), o diferencial competitivo inimitável da Nossa Consultoria BI / Auditoria 6D é o acoplamento de dashboards técnicos com telemetria comportamental e de pessoas. Isso nos afasta da guerra de preços com freelancers. Como você vê a força dos produtos substitutos (como as planilhas manuais) no seu setor?';
        } else if (text.includes('stakeholder') || text.includes('matriz') || text.includes('poder') || text.includes('interesse')) {
          aiResponse = 'Mapeamento de Stakeholders concluído! Identificamos o Board C-level e Clientes Críticos no quadrante "Gerenciar de Perto" (alto poder e interesse). Já o time operacional e gestores operacionais estão em "Manter Informados". Veja o gráfico de dispersão interativo à direita! Clique em qualquer ponto para detalhes estratégicos.';
        } else {
          aiResponse = 'Entendido! Analisando o ecossistema competitivo e stakeholders da Nossa Consultoria BI, percebo uma forte dependência técnica de provedores de nuvem (Microsoft/AWS) e uma necessidade absoluta de provar ROI ao Board Executivo. À direita, estruturei a Matriz de Poder e os fatores PESTEL e Porter para você explorar e validar no seu dossiê da ATP. Algum stakeholder específico te preocupa mais?';
        }
      }
      if (auditoriaStep === 3) {
        const text = submission.toLowerCase();
        if (text.includes('organograma') || text.includes('estrutura') || text.includes('ceo') || text.includes('direto') || text.includes('hierarq')) {
          aiResponse = 'Excelente pergunta! O organograma da Nossa Consultoria BI / Auditoria 6D é uma estrutura enxuta e tática. Temos 1 Sócio-Presidente, 2 Diretores (Técnico e Operacional), 2 Coordenadores (Projetos e Pessoas) e o corpo de analistas e desenvolvedores. À direita, renderizei a árvore SVG inteira para você! Clique em cada caixa para inspecionar a autonomia e funções de reporte.';
        } else if (text.includes('mecanic') || text.includes('organ') || text.includes('estilo') || text.includes('autonomia') || text.includes('rotina')) {
          aiResponse = 'Mapeamento concluído! A consultoria opera de forma híbrida: 65% Orgânica e 35% Mecanicista. A autonomia técnica do time de BI é alta (orgânica), mas rituais formais de OKRs e segurança de logs para a LGPD trazem o controle necessário (mecanicista). Teste o "Simulador de Estilo" na aba ao lado para calibrar os scores operacionais!';
        } else if (text.includes('meta') || text.includes('objetivo') || text.includes('controle') || text.includes('sistema') || text.includes('racional') || text.includes('improvis')) {
          aiResponse = 'Análise de controles refinada! A empresa concilia Controles Racionais (OKRs trimestrais e SLAs de clientes) com Controles Naturais e Socioemocionais (rituais de feedback SBI no SIG Pessoas e pulso semanal de clima). Isso diminui o microgerenciamento e otimiza a confiança da equipe. Qual desses métodos você acha mais eficaz?';
        } else {
          aiResponse = 'Entendido! Na Etapa 3 da ATP, focamos na estrutura organizacional e sistemas de controle da consultoria. O modelo híbrido (65% orgânico) garante que o time de BI tenha autonomia sem perder de vista a governança e o compliance de LGPD. Configurei o organograma de reporte e o mapa de controles formais e naturais na aba ao lado para você explorar. Qual desses pontos você gostaria de analisar agora?';
        }
      }
      
      setConsultingChat(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsAnalyzingData(false);
    }, 2500);
  }

  function handleDeleteOkr(id: string) {
    setOkrs(okrs.filter(okr => okr.id !== id))
    triggerToast('OKR estratégico removido com sucesso.', 'ok')
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
                ? 'bg-black/90 text-[#d2af5a] border-[#d2af5a]/20' 
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
          color: #d2af5a !important;
          background: linear-gradient(180deg, rgba(30, 25, 18, 0.75) 0%, rgba(18, 15, 10, 0.85) 100%) !important;
          border: 0.2px solid #d2af5a !important;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.2), inset 0 1px 0 rgba(201, 148, 58, 0.12), 0 0 18px rgba(201, 148, 58, 0.25) !important;
          font-weight: 600;
        }
        .btn-professor-ia {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 12px; background: rgba(201, 148, 58,0.08);
          border: 0.2px solid rgba(201, 148, 58,0.25); border-radius: 8px;
          color: #d2af5a; font-family: inherit; font-size: 9.5px; font-weight: 600;
          cursor: pointer; transition: all 0.2s; letter-spacing: 0.04em;
          align-self: center;
        }
        .btn-professor-ia:hover { background: rgba(201, 148, 58,0.14); border-color: rgba(201, 148, 58,0.4); }

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
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(201, 148, 58, 0.12) 100%) !important;
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

        .panel-label {
          font-family: inherit; font-size: 8px; letter-spacing: 0.12em;
          color: #b8975a; text-transform: uppercase;
          border: 0.2px solid rgba(201, 148, 58,0.15); padding: 2px 8px; border-radius: 4px;
          background: rgba(201, 148, 58,0.04); display: inline-block; margin-bottom: 6px;
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
        .vc-dot.active { border-color: rgba(201, 148, 58,0.4); background: rgba(201, 148, 58,0.06); color: #d2af5a; }
        .vc-dot.active .dot-circle { background: #d2af5a; box-shadow: 0 0 6px rgba(201, 148, 58,0.6); }
        .vc-dot:hover { border-color: rgba(255,255,255,0.15); }
        .vc-saude-bar { margin-top: 12px; }
        .vc-saude-bar .lbl { font-size: 9px; color: #8a9098; margin-bottom: 4px; font-family: inherit; text-transform: uppercase; letter-spacing: 0.05em; }
        .vc-bar-track { height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
        .vc-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #b8975a, #d2af5a, #e0c887); transition: width 0.8s ease-out; }
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
          border: 0.2px solid rgba(201, 148, 58, 0.12) !important;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          cursor: pointer; transition: all 0.2s;
          display: flex; flex-direction: column; gap: 4px;
          text-align: left;
        }
        .bloco-item:hover { border-color: rgba(201, 148, 58,0.35) !important; background: rgba(15, 15, 18, 0.55) !important; transform: translateY(-1px); }
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
        .mapa-quadrant-lbl.bot-right { bottom: 5px; right: 5px; color: #b8975a; background: rgba(201, 148, 58,0.08); }
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
          border: 0.2px solid rgba(201, 148, 58, 0.12) !important;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          cursor: pointer; transition: all 0.2s;
          display: flex; flex-direction: column; gap: 3px;
          text-align: left;
        }
        .role-card:hover { border-color: rgba(201, 148, 58, 0.35) !important; background: rgba(15, 15, 18, 0.55) !important; }
        .role-card.active { border-color: rgba(201, 148, 58, 0.4) !important; background: rgba(201, 148, 58, 0.08) !important; }
        .role-card .rc-label { font-family: inherit; font-size: 8px; color: #b8975a; letter-spacing: 0.08em; text-transform: uppercase; }
        .role-card .rc-title { font-size: 12px; font-weight: 600; color: #f3f5f8; }
        .role-card .rc-sub { font-size: 9px; color: #8a9098; }

        .manifesto-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .manifesto-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          border: 0.2px solid rgba(201, 148, 58, 0.12) !important;
          border-radius: 8px;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          transition: all 0.2s;
          text-align: left;
        }
        .manifesto-item:hover { border-color: rgba(201, 148, 58, 0.35) !important; background: rgba(15, 15, 18, 0.55) !important; }
        .manifesto-item .m-code {
          font-family: inherit; font-size: 9px; color: #d2af5a;
          background: rgba(201, 148, 58,0.1); border: 0.2px solid rgba(201, 148, 58,0.2);
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
          border: 0.2px solid rgba(201, 148, 58, 0.12) !important;
          border-radius: 10px;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          cursor: pointer; transition: all 0.2s;
          text-align: left;
        }
        .passo-item:hover { border-color: rgba(201, 148, 58, 0.35) !important; background: rgba(15, 15, 18, 0.55) !important; }
        .passo-item .p-num {
          width: 22px; height: 22px; border-radius: 50%; border: 0.2px solid rgba(201, 148, 58,0.3);
          display: flex; align-items: center; justify-content: center;
          font-family: inherit; font-size: 10px; color: #d2af5a; flex-shrink: 0; font-weight: 700;
        }
        .passo-item .p-body { flex: 1; }
        .passo-item .p-title { font-size: 11px; font-weight: 600; color: #f3f5f8; display: block; margin-bottom: 2px; }
        .passo-item .p-title.done { text-decoration: line-through; opacity: 0.45; }
        .passo-item .p-desc { font-size: 9.5px; color: #8a9098; line-height: 1.4; }
        .passo-item .p-arrow { color: #d2af5a; font-size: 14px; flex-shrink: 0; align-self: center; }

        /* Telemetry blocks & okr nav */
        .blocos-nav-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 12px; }
        @media (max-width: 768px) {
          .blocos-nav-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .bloco-nav-card {
          padding: 18px 14px; border-radius: 12px;
          border: 0.2px solid rgba(201, 148, 58, 0.12) !important;
          background: rgba(10, 10, 12, 0.40) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          cursor: pointer; transition: all 0.25s;
          display: flex; flex-direction: column; gap: 4px;
          text-align: left;
        }
        .bloco-nav-card:hover { border-color: rgba(201, 148, 58, 0.35) !important; background: rgba(15, 15, 18, 0.55) !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
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
          padding: 4px 8px; border-radius: 4px; background: rgba(201, 148, 58,0.15);
          color: #d2af5a; border: 0.2px solid rgba(201, 148, 58,0.25); font-family: inherit; font-size: 8.5px;
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
          background: rgba(201, 148, 58,0.20) !important; border-color: #d2af5a !important; color: #d2af5a !important;
          box-shadow: 0 0 8px rgba(201, 148, 58,0.2);
        }
        .pulso-input-area {
          width: 100%; height: 44px; background: rgba(0,0,0,0.4); border: 0.2px solid rgba(255,255,255,0.08);
          border-radius: 8px; padding: 10px; font-family: inherit; font-size: 10.5px; color: #fff;
          outline: none; resize: none; margin-top: 6px; transition: border-color 0.2s;
        }
        .pulso-input-area:focus { border-color: rgba(201, 148, 58,0.4); }
        .btn-pulso-save {
          width: 100%; padding: 10px; border-radius: 8px; background: rgba(201, 148, 58,0.15);
          border: 0.2px solid rgba(201, 148, 58,0.4); color: #d2af5a; font-family: inherit; font-size: 10px;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer;
          transition: all 0.2s; margin-top: 14px;
        }
        .btn-pulso-save:hover { background: rgba(201, 148, 58,0.3); border-color: #d2af5a; }

        /* Candidate cards & layouts */
        .cand-card-mockup {
          background: rgba(10, 10, 12, 0.40) !important;
          border: 0.2px solid rgba(201, 148, 58, 0.12) !important;
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
          background: linear-gradient(90deg, transparent 0%, rgba(201, 148, 58, 0.2) 20%, rgba(255, 255, 255, 0.4) 50%, rgba(201, 148, 58, 0.2) 80%, transparent 100%);
          pointer-events: none;
        }
        .cand-card-mockup:hover {
          border-color: rgba(201, 148, 58, 0.35) !important;
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
          color: #d2af5a;
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
          color: #d2af5a;
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
          background: linear-gradient(135deg, #d2af5a 0%, #b8975a 100%) !important;
          border: none !important;
          color: #0f0d09 !important;
          font-family: inherit;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(201, 148, 58, 0.25);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          text-align: center;
          width: 100%;
        }
        .btn-onboard:hover {
          filter: brightness(1.15) !important;
          box-shadow: 0 6px 20px rgba(201, 148, 58, 0.4) !important;
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
          background: rgba(201, 148, 58, 0.08) !important;
          border-color: rgba(201, 148, 58, 0.5) !important;
          box-shadow: 0 0 0 1.5px rgba(255, 255, 255, 0.15), 0 2px 8px rgba(201, 148, 58, 0.1) !important;
          color: #d2af5a !important;
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
          border-color: rgba(201, 148, 58, 0.4) !important;
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
          border-color: rgba(201, 148, 58, 0.4) !important;
        }
        .premium-glass-card {
          background: rgba(10, 10, 12, 0.45) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 16px;
          padding: 16px;
          backdrop-filter: blur(28px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.5) !important;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .premium-glass-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(201, 148, 58, 0.15) 20%, rgba(255, 255, 255, 0.25) 50%, rgba(201, 148, 58, 0.15) 80%, transparent 100%);
          pointer-events: none;
        }
        .premium-glass-card:hover {
          border-color: rgba(201, 148, 58, 0.35) !important;
          background: rgba(15, 15, 18, 0.60) !important;
          transform: translateY(-2.5px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.10), 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(201, 148, 58, 0.05) !important;
        }
      `}} />

      {/* Tabs HUD Header (Mockup exact replica) */}
      <div className="tab-pessoas-row">
        {mode === 'pessoas' ? (
          [
            { id: 'home', label: 'Home', sub: 'panorama cruzado' },
            { id: 'lideres', label: 'Líderes / Gestores', sub: 'Liderança · Gerir · Delegar' },
            { id: 'time', label: 'Time', sub: 'demais equipes · Formar' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as TabOption)}
              className={`tab-p-btn ${activeTab === t.id ? 'active' : ''}`}
            >
              {t.label} <span className="tab-sub">{t.sub}</span>
            </button>
          ))
        ) : (
          <div className="flex items-center gap-2 mr-auto pl-2">
            <span className="px-3 py-1 bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded-xl text-[10px] font-mono font-bold text-[#d2af5a] tracking-widest uppercase">
              EMPRESA
            </span>
            <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase hidden sm:inline-block">
              Direção &amp; Estratégia Corporativa
            </span>
          </div>
        )}
        
        <button 
          onClick={() => triggerToast('Professor de IA iniciando mentoria de liderança...', 'ok')}
          className="btn-professor-ia"
          style={{ marginLeft: mode === 'empresa' ? 'auto' : '0px' }}
        >
          ▶ PROFESSOR IA
        </button>
        <button 
          onClick={handleClearAll}
          className="btn-professor-ia"
          style={{ background: 'rgba(226, 75, 74, 0.15)', border: '1px solid rgba(226, 75, 74, 0.4)', color: '#e24b4a', marginLeft: '6.5px' }}
        >
          🗑 APAGAR TUDO
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
              <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-6 rounded-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-[80px] pointer-events-none mix-blend-screen" />
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block mb-1 font-bold uppercase">DIAGNÓSTICO 6D</span>
                    <h3 className="text-[16px] font-bold text-white mb-0.5">Visão Cruzada · Saúde 6D</h3>
                    <div className="text-[10px] text-white/50 font-sans">Radar organizacional · n = {teamMembers.length} colaboradores</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button onClick={handleResetRadar} className="px-3.5 py-1.5 bg-black/60 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/30 rounded-xl text-[9px] font-bold text-[#d2af5a] font-mono transition-all uppercase tracking-wider">⟲ RESET</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 items-center relative z-10">
                  
                  {/* Radar Stage SVG with improved look */}
                  <div style={{ maxWidth: '180px', margin: '0 auto', position: 'relative' }}>
                    <div className="w-[180px] h-[180px] relative">
                      <svg className="w-full h-full overflow-visible" viewBox="-200 -200 400 400">
                        <defs>
                          <radialGradient id="crystalFillH" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#d2af5a" stopOpacity="0.35"/>
                            <stop offset="100%" stopColor="#d2af5a" stopOpacity="0.05"/>
                          </radialGradient>
                          <linearGradient id="crystalStrokeH" x1="0" y1="-150" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6"/>
                            <stop offset="50%" stopColor="#d2af5a" stopOpacity="0.45"/>
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5"/>
                          </linearGradient>
                        </defs>

                        {/* Radar Web (Concentric Hexagons) */}
                        <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8">
                          {/* Outer Hexagon (R=140) */}
                          <polygon points="0,-140 121.2,-70 121.2,70 0,140 -121.2,70 -121.2,-70" stroke="url(#crystalStrokeH)" strokeWidth="1" />
                          {/* Mid Hexagon (R=93.3) */}
                          <polygon points="0,-93.3 80.8,-46.6 80.8,46.6 0,93.3 -80.8,46.6 -80.8,-46.6" strokeDasharray="3 3" />
                          {/* Inner Hexagon (R=46.6) */}
                          <polygon points="0,-46.6 40.4,-23.3 40.4,23.3 0,46.6 -40.4,23.3 -40.4,-23.3" strokeDasharray="3 3" />
                        </g>
                        
                        {/* 6 Axes */}
                        <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.8">
                          <line x1="0" y1="-140" x2="0" y2="140"/>
                          <line x1="121.2" y1="-70" x2="-121.2" y2="70"/>
                          <line x1="-121.2" y1="-70" x2="121.2" y2="70"/>
                        </g>

                        {/* Interactive dynamic radar polygon based on selection */}
                        <polygon 
                          points={`
                            ${p1.x},${p1.y} 
                            ${p2.x},${p2.y} 
                            ${p3.x},${p3.y} 
                            ${p4.x},${p4.y} 
                            ${p5.x},${p5.y} 
                            ${p6.x},${p6.y}
                          `} 
                          fill="url(#crystalFillH)" 
                          stroke="#d2af5a" 
                          strokeWidth="2" 
                          opacity="0.85"
                          style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />

                        {/* Vertex Dots */}
                        {selectedDims.includes('D1') && <circle cx={p1.x} cy={p1.y} r="4.5" fill="#151310" stroke="#d2af5a" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(201, 148, 58,0.8)]"/>}
                        {selectedDims.includes('D2') && <circle cx={p2.x} cy={p2.y} r="4.5" fill="#151310" stroke="#d2af5a" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(201, 148, 58,0.8)]"/>}
                        {selectedDims.includes('D3') && <circle cx={p3.x} cy={p3.y} r="4.5" fill="#151310" stroke="#d2af5a" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(201, 148, 58,0.8)]"/>}
                        {selectedDims.includes('D4') && <circle cx={p4.x} cy={p4.y} r="4.5" fill="#151310" stroke="#d2af5a" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(201, 148, 58,0.8)]"/>}
                        {selectedDims.includes('D5') && <circle cx={p5.x} cy={p5.y} r="4.5" fill="#151310" stroke="#d2af5a" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(201, 148, 58,0.8)]"/>}
                        {selectedDims.includes('D6') && <circle cx={p6.x} cy={p6.y} r="4.5" fill="#151310" stroke="#d2af5a" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(201, 148, 58,0.8)]"/>}

                        {/* Axis Labels */}
                        <g fontStyle="Poppins" fontSize="11" fontWeight="700" fill="#d2af5a" className="tracking-widest drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
                          <text x="0" y="-155" textAnchor="middle">D1</text>
                          <text x="142" y="-76" textAnchor="middle">D2</text>
                          <text x="142" y="86" textAnchor="middle">D3</text>
                          <text x="0" y="166" textAnchor="middle">D4</text>
                          <text x="-142" y="86" textAnchor="middle">D5</text>
                          <text x="-142" y="-76" textAnchor="middle">D6</text>
                        </g>
                      </svg>

                      {/* Center Info Gauge */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                        <div className="w-[60px] h-[60px] rounded-full bg-black/60 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center">
                          <span className="text-xl font-bold text-white tracking-tighter leading-none">
                            {selectedDims.length * 12 + 4}
                          </span>
                          <span className="text-[5.5px] uppercase tracking-widest text-[#d2af5a] mt-1 font-mono">OBI GLOBAL</span>
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
                          className={`vc-dot flex items-center gap-2 p-2 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl cursor-pointer transition ${selectedDims.includes(dim.code) ? 'active border-[#d2af5a]/20 bg-[#d2af5a]/5' : ''}`}
                        >
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dim.color, boxShadow: `0 0 6px ${dim.color}` }}></span>
                          <span className="text-[10px] font-mono font-bold text-white/80">{dim.code}</span>
                          <span className="text-[8.5px] text-white/40 ml-auto font-sans">{dim.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar of Health */}
                    <div className="vc-saude-bar bg-black/30 border border-white/5 p-3.5 rounded-xl">
                      <div className="lbl text-[10px] font-mono text-[#d2af5a] font-bold uppercase tracking-widest mb-1.5">Saúde 6D · Score Geral</div>
                      <div className="vc-bar-track h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                        <div className="vc-bar-fill h-full bg-gradient-to-r from-[#d2af5a] to-[#5dcaa5] rounded-full transition-all duration-500" style={{ width: `${(selectedDims.length / 6) * 100}%` }} />
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
                <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-5 rounded-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] blur-[60px] pointer-events-none mix-blend-screen" />
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block font-bold uppercase flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> RECRUTAMENTO · FLUXO LENCIONI</span>
                    <button className="text-[9px] uppercase tracking-wider text-[#d2af5a] font-bold hover:underline" onClick={() => setActiveTab('lideres')}>▶ Detalhes</button>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2 bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                    <div className="hover:bg-white/[0.02] p-1 rounded transition">
                      <b className="text-[15px] text-[#d2af5a] block leading-none">{candidates.filter(c => c.stage === 'triagem').length}</b>
                      <span className="text-[7px] text-white/40 font-mono block mt-1">TRIAGEM</span>
                    </div>
                    <div className="hover:bg-white/[0.02] p-1 rounded transition">
                      <b className="text-[15px] text-[#d2af5a] block leading-none">{candidates.filter(c => c.stage === 'entrevista').length}</b>
                      <span className="text-[7px] text-white/40 font-mono block mt-1">ENTREVISTA</span>
                    </div>
                    <div className="hover:bg-white/[0.02] p-1 rounded transition">
                      <b className="text-[15px] text-[#d2af5a] block leading-none">{candidates.filter(c => c.stage === 'decisao').length}</b>
                      <span className="text-[7px] text-white/40 font-mono block mt-1">DECISÃO</span>
                    </div>
                    <div className="hover:bg-white/[0.02] p-1 rounded transition">
                      <b className="text-[15px] text-[#d2af5a] block leading-none">{candidates.filter(c => c.stage === 'onboarding').length}</b>
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
                <div className="dash-card flex-1 flex flex-col justify-between bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-5 rounded-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-[80px] pointer-events-none mix-blend-screen" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4 border-b border-white/[0.04] pb-3">
                      <div>
                        <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block font-bold uppercase mb-1">CANDIDATOS ATIVOS</span>
                        <h3 className="text-[13px] font-bold text-white m-0">Fit Lencioni &amp; HHS</h3>
                      </div>
                      <button onClick={handleResetCandidates} className="px-3 py-1 bg-black/60 hover:bg-[#d2af5a]/10 border border-white/10 hover:border-white/20 rounded-lg text-[9px] text-white/70 hover:text-[#d2af5a] font-mono transition-colors">♻ Restaurar</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                      {candidates.length === 0 ? (
                        <div className="text-center py-6 text-[10px] text-white/30">Nenhum candidato no funil.</div>
                      ) : (
                        candidates.map(cand => (
                          <div key={cand.id} className="cand-card-mockup group hover:border-[#d2af5a]/30 hover:bg-black/60 transition-all border border-white/5 rounded-xl bg-black/40" style={{ padding: '12px', marginBottom: '0px' }}>
                            <button onClick={() => handleDeleteCandidate(cand.id)} className="btn-del-cand text-white/40 hover:text-[#e24b4a] transition" style={{ width: '16px', height: '16px', fontSize: '9px', top: '8px', right: '8px' }}>✕</button>
                            
                            <div className="header-row" style={{ gap: '8px' }}>
                              <div className="avatar bg-gradient-to-br from-[#d2af5a] to-[#efddb1] text-black font-bold" style={{ width: '26px', height: '26px', fontSize: '10px' }}>
                                {cand.name.split(' ').map(x => x[0]).join('')}
                              </div>
                              <div className="info-col text-left">
                                <span className="name text-white font-bold block" style={{ fontSize: '11.5px' }}>{cand.name}</span>
                                <span className="subtext text-white/50 block" style={{ fontSize: '8px' }}>{cand.role} · {cand.stage.toUpperCase()}</span>
                              </div>
                            </div>
                            
                            {/* HHS Bar */}
                            <div className="hhs-bar-mockup" style={{ margin: '6px 0', height: '5px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                              <i className="bg-gradient-to-r from-[#d2af5a] to-[#efddb1]" style={{ width: `${cand.lencioniScore}%`, height: '100%', display: 'block', borderRadius: '4px' }} />
                            </div>

                            <div className="stats-row flex justify-between items-center text-white/60 text-left" style={{ fontSize: '8px', paddingTop: '4px' }}>
                              <div className="item"><span>HUM </span><b className="text-white">{cand.stats.hum}%</b></div>
                              <div className="item"><span>FOM </span><b className="text-white">{cand.stats.fom}%</b></div>
                              <div className="item"><span>INT </span><b className="text-white">{cand.stats.int}%</b></div>
                            </div>
                            <button 
                              onClick={() => handleTriggerOnboard(cand)}
                              className="btn-onboard w-full mt-2 py-1.5 rounded-lg border border-[#d2af5a]/30 hover:border-[#d2af5a] text-[#d2af5a] bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 transition font-mono text-[9px] uppercase font-bold tracking-widest"
                              style={{ padding: '5px' }}
                            >
                              {cand.stage === 'triagem' ? 'Avançar' : cand.stage === 'onboarding' ? 'CONTRATAR' : 'Evoluir'}
                            </button>
                            <div className="flex gap-2 mt-1.5">
                              <select 
                                value={cand.stage}
                                onChange={(e) => {
                                  const nextStage = e.target.value as Candidate['stage']
                                  if (nextStage === 'efetivado') {
                                    handleTriggerOnboard({ ...cand, stage: 'onboarding' })
                                  } else {
                                    setCandidates(candidates.map(c => c.id === cand.id ? { ...c, stage: nextStage } : c))
                                    triggerToast(`${cand.name} movido para ${nextStage.toUpperCase()}.`)
                                  }
                                }}
                                className="bg-black/90 border border-white/10 rounded-lg px-2 py-1 text-[9px] text-white/80 font-mono outline-none flex-1 focus:border-[#d2af5a]/40"
                              >
                                <option value="triagem">TRIAGEM</option>
                                <option value="entrevista">ENTREVISTA</option>
                                <option value="decisao">DECISÃO</option>
                                <option value="onboarding">ONBOARDING</option>
                                <option value="efetivado">CONTRATAR / EFETIVAR</option>
                              </select>
                            </div>
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
              <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-6 rounded-2xl text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-[85px] pointer-events-none mix-blend-screen" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block font-bold uppercase mb-1">D6 DIAGNÓSTICO · MAPA DO TIME</span>
                    <h3 className="text-[14px] font-bold text-white mb-0.5">Influência × Impacto</h3>
                    <div className="text-[10px] text-white/50 font-sans">Vetorização 6D com base no capital social de cada colaborador</div>
                  </div>
                  <button onClick={handleAddTeamMemberMap} className="px-3 py-1.5 bg-black/60 hover:bg-[#d2af5a]/10 border border-white/10 hover:border-white/30 rounded-xl text-[9px] text-[#d2af5a] font-mono transition-colors font-bold tracking-widest">+ ADD</button>
                </div>

                <div className="mapa-container bg-black/40 border border-white/5 rounded-xl p-3">
                  <div className="mapa-svg-wrap relative">
                    <svg viewBox="0 0 300 200" style={{ overflow: 'visible' }}>
                      {/* Background quadrants */}
                      <rect x="0" y="0" width="150" height="100" fill="rgba(250,199,117,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                      <rect x="150" y="0" width="150" height="100" fill="rgba(93,202,165,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                      <rect x="0" y="100" width="150" height="100" fill="rgba(226,75,74,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                      <rect x="150" y="100" width="150" height="100" fill="rgba(201, 148, 58,0.03)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
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
              <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-6 rounded-2xl text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-[85px] pointer-events-none mix-blend-screen" />
                <div className="relative z-10 mb-5 flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block font-bold uppercase mb-1">Perfil · Liderança</span>
                    <h3 className="text-[14px] font-bold text-white">Você como Líder</h3>
                  </div>
                  {/* Calculates and displays actual 6D alignment score based on checked principles */}
                  <span className="px-2 py-1 bg-[#d2af5a]/10 border border-[#d2af5a]/20 rounded text-[#d2af5a] font-mono text-[9px] font-bold">
                    {Math.round((manifestoChecks.filter(Boolean).length / 5) * 100)}% ALINHAMENTO D2
                  </span>
                </div>

                {/* Role selector */}
                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                  <div className="p-3 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl cursor-pointer text-center">
                    <span className="text-[8.5px] font-mono font-bold text-[#d2af5a] block mb-1">Modo 1</span>
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
                      className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition-colors ${manifestoChecks[idx] ? 'bg-[#d2af5a]/5 border-[#d2af5a]/20' : 'bg-black/40 border-white/5 hover:border-white/10'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-[9px] font-mono font-bold ${manifestoChecks[idx] ? 'text-[#d2af5a]' : 'text-white/40'}`}>{p.code}</div>
                        <div className={`text-[10px] font-sans leading-snug ${manifestoChecks[idx] ? 'text-white font-medium' : 'text-white/60'}`}>{p.text}</div>
                      </div>
                      <div className={`text-[9px] font-mono font-bold whitespace-nowrap px-2 py-0.5 rounded ${manifestoChecks[idx] ? 'text-[#d2af5a] bg-[#d2af5a]/10 font-bold' : 'text-white/20'}`}>{manifestoChecks[idx] ? '✓ ATIVO' : '—'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 3: Primeiros Passos + Pulso Semanal */}
            <div className="home-row cols-2 mt-6">
              
              {/* Primeiros Passos - UNIFORM PREMIUM DARK GLASS CARD (Tied explicitly to D6 dimensions) */}
              <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-6 rounded-2xl text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-[85px] pointer-events-none mix-blend-screen" />
                <div className="flex justify-between items-center mb-5 relative z-10">
                  <div>
                    <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block font-bold uppercase mb-1">Onboarding · Sistema</span>
                    <h3 className="text-[14px] font-bold text-white">Primeiros Passos</h3>
                  </div>
                  <button onClick={handlePopularPassosExemplo} className="px-3 py-1.5 bg-black/60 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/30 rounded-xl text-[9px] text-[#d2af5a] font-mono transition-colors font-bold tracking-widest">EXEMPLO</button>
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
                      className={`flex items-center gap-3 p-3 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl cursor-pointer transition ${passosChecks[idx] ? 'border-[#d2af5a]/20 bg-[#d2af5a]/5' : ''}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 transition-all ${passosChecks[idx] ? 'bg-gradient-to-r from-[#d2af5a] to-[#efddb1] text-black shadow-[0_0_8px_rgba(201, 148, 58,0.3)]' : 'bg-white/5 border border-white/10 text-white/50'}`}>
                        {p.id}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`block text-[11px] font-bold text-white transition-all ${passosChecks[idx] ? 'line-through text-white/40' : ''}`}>{p.title}</span>
                          <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/5 text-white/30 text-[7px] font-mono uppercase tracking-widest">{p.d6Dim}</span>
                        </div>
                        <span className="block text-[9.5px] text-white/40 font-sans leading-tight mt-0.5">{p.desc}</span>
                      </div>
                      <div className={`text-[12px] font-bold transition-all ${passosChecks[idx] ? 'text-[#d2af5a] translate-x-0' : 'text-white/20 -translate-x-1'}`}>→</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pulso Semanal - UNIFORM PREMIUM DARK GLASS CARD */}
              <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-6 rounded-2xl text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-[85px] pointer-events-none mix-blend-screen" />
                <div className="flex justify-between items-center mb-5 relative z-10">
                  <div>
                    <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block font-bold uppercase mb-1">📊 PULSO SEMANAL</span>
                    <h3 className="text-[14px] font-bold text-white">Como está sua energia?</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded text-[#d2af5a] font-mono text-[8px] font-bold tracking-widest uppercase">Semana 21</span>
                </div>

                <div className="relative z-10 space-y-5">
                  <div>
                    <div className="text-[10px] text-white/70 font-sans mb-2 font-medium">Energia esta semana:</div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(v => (
                        <button
                          key={v}
                          onClick={() => setPulseEnergy(v)}
                          className={`flex-1 py-2.5 rounded-xl border text-[11px] font-mono font-bold transition-all duration-300 ${pulseEnergy === v ? 'bg-gradient-to-r from-[#d2af5a] to-[#efddb1] border-[#d2af5a] text-black shadow-[0_0_15px_rgba(201, 148, 58,0.45)]' : 'bg-black/60 border-white/5 text-white/40 hover:border-white/20'}`}
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
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-[11px] text-white font-sans leading-relaxed outline-none focus:border-[#d2af5a]/40 focus:ring-1 focus:ring-[#d2af5a]/20 min-h-[60px] resize-none"
                    />
                  </div>
                  
                  <button onClick={handleSavePulso} className="w-full py-3.5 bg-gradient-to-r from-[#d2af5a]/25 to-[#d2af5a]/5 hover:from-[#d2af5a]/35 hover:to-[#d2af5a]/15 border border-[#d2af5a]/50 rounded-xl text-[10px] font-bold text-[#d2af5a] font-mono tracking-widest transition-all shadow-[0_0_20px_rgba(201, 148, 58,0.12)]">
                    ✓ SALVAR PULSO DA SEMANA
                  </button>
                </div>
              </div>
            </div>


            {/* RECRUTAR MOVED TO HOME */}
            <div className="home-row full mt-6">
              <div className="space-y-6">
                
                {/* Main Card: Recruiting Roles */}
                <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-6 text-left">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-[#d2af5a]/5 blur-[120px] pointer-events-none mix-blend-screen" />
                  
                  {recruitmentRole === null ? (
                    <>
                      <div className="mb-6 relative z-10">
                        <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block mb-2 font-bold uppercase">RECRUTAMENTO</span>
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
                            onClick={() => handleStartRecruitment(role.title as any)}
                            className="group p-5 bg-black/40 border border-white/[0.08] hover:border-[#d2af5a]/60 hover:bg-[#d2af5a]/10 rounded-2xl cursor-pointer transition-all text-left relative overflow-hidden flex flex-col justify-between"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                              <b className="text-[12px] font-mono tracking-widest text-[#d2af5a] block leading-none mb-3">{role.title}</b>
                              <span className="text-[10px] text-white/60 block leading-snug font-sans mb-4 min-h-[50px]">{role.desc}</span>
                            </div>
                            <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between relative z-10">
                              <span className="text-[8.5px] font-mono font-bold text-white/40 uppercase tracking-widest">{role.qCount}</span>
                              <span className="text-[#d2af5a] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
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
                    </>
                  ) : (
                    <div className="relative z-10 space-y-4">
                      {/* HEADER */}
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <div>
                          <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block font-bold uppercase">AVALIAÇÃO DE FIT DE RECRUTAMENTO</span>
                          <h3 className="text-[15px] font-bold text-white">Processo de Avaliação: {recruitmentRole}</h3>
                        </div>
                        <button 
                          onClick={handleCancelRecruitment}
                          className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-[9px] font-mono font-bold text-white/60 transition"
                        >
                          ✕ CANCELAR
                        </button>
                      </div>

                      {/* STEP 0: DETAILS FORM */}
                      {recruitmentStep === 0 && (
                        <div className="space-y-4 max-w-md py-2 text-left">
                          <p className="text-[10.5px] text-white/60 leading-relaxed">
                            Antes de iniciarmos o questionário para <strong>{recruitmentRole}</strong>, forneça as informações do candidato:
                          </p>
                          <div className="space-y-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Nome do Candidato</label>
                              <input 
                                type="text"
                                placeholder="Ex: Lucas P. de Souza"
                                value={newCandName}
                                onChange={(e) => setNewCandName(e.target.value)}
                                className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white outline-none focus:border-[#d2af5a]/50"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Cargo / Função</label>
                              <input 
                                type="text"
                                placeholder={`Ex: ${recruitmentRole === 'Liderado' ? 'Fisioterapeuta Intensivo' : recruitmentRole === 'Gestor' ? 'Coordenador Técnico' : 'Diretor Clínico'}`}
                                value={newCandRoleTitle}
                                onChange={(e) => setNewCandRoleTitle(e.target.value)}
                                className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white outline-none focus:border-[#d2af5a]/50"
                              />
                            </div>
                          </div>
                          <div className="pt-2">
                            <button
                              onClick={() => handleRecruitmentNext()}
                              className="px-4 py-2 bg-[#d2af5a] hover:bg-[#d2af5a]/90 text-black rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(201, 148, 58,0.3)]"
                            >
                              Iniciar Questionário ({recruitmentQuestions[recruitmentRole].length} Questões) →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* STEPS 1 TO N: QUESTIONS */}
                      {recruitmentStep > 0 && recruitmentStep <= recruitmentQuestions[recruitmentRole].length && (
                        <div className="space-y-4 py-2 text-left">
                          {/* Progress indicator */}
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                              Questão {recruitmentStep} de {recruitmentQuestions[recruitmentRole].length}
                            </span>
                            <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#d2af5a]"
                                style={{ width: `${(recruitmentStep / recruitmentQuestions[recruitmentRole].length) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                              <span className="text-[9px] font-mono text-[#d2af5a] block mb-1 uppercase tracking-widest font-bold">PERGUNTA SITUACIONAL</span>
                              <h4 className="text-[12px] font-bold text-white leading-relaxed font-sans">
                                {recruitmentQuestions[recruitmentRole][recruitmentStep - 1]}
                              </h4>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Resposta do Candidato (Simulação)</label>
                              <textarea
                                placeholder="Digite aqui a resposta simulada para avaliação de fit do candidato..."
                                value={recruitmentAnswers[recruitmentStep - 1] || ''}
                                onChange={(e) => {
                                  const nextAnswers = [...recruitmentAnswers]
                                  nextAnswers[recruitmentStep - 1] = e.target.value
                                  setRecruitmentAnswers(nextAnswers)
                                }}
                                className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white outline-none focus:border-[#d2af5a]/50 h-24 resize-none"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => setRecruitmentStep(recruitmentStep - 1)}
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition"
                            >
                              ← Voltar
                            </button>
                            <button
                              onClick={() => {
                                const currentAnswer = recruitmentAnswers[recruitmentStep - 1] || '';
                                if (!currentAnswer.trim()) {
                                  triggerToast('Por favor, preencha a resposta do candidato para avançar.', 'warn');
                                  return;
                                }
                                handleRecruitmentNext(currentAnswer);
                              }}
                              className="px-4 py-2 bg-[#d2af5a] hover:bg-[#d2af5a]/90 text-black rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(201, 148, 58,0.3)]"
                            >
                              {recruitmentStep === recruitmentQuestions[recruitmentRole].length ? 'Finalizar Avaliação ✓' : 'Próxima Pergunta →'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* STEP 99: LOADING / ANALYZING */}
                      {recruitmentStep === 99 && (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4">
                          <div className="relative w-20 h-20">
                            <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                            <div className="absolute inset-0 rounded-full border-2 border-t-[#d2af5a] animate-spin" />
                            <div className="absolute inset-2 rounded-full border border-white/5 bg-[#d2af5a]/5 flex items-center justify-center">
                              <Cpu className="w-6 h-6 text-[#d2af5a]" />
                            </div>
                          </div>
                          <div className="text-center space-y-1">
                            <h4 className="text-[12px] font-bold text-white">IA Engine Processando Respostas</h4>
                            <p className="text-[9.5px] font-mono text-[#d2af5a] animate-pulse">
                              Cruzando dados situacionais com frameworks de Lencioni, HHS, Tuckman e Goleman...
                            </p>
                          </div>
                        </div>
                      )}

                      {/* STEP 100: RESULTS */}
                      {recruitmentStep === 100 && recruitmentResult && (
                        <div className="space-y-4 py-2 text-left">
                          <div className="p-4 bg-gradient-to-r from-black/60 to-black/30 border border-[#d2af5a]/20 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d2af5a]/10 blur-[50px] mix-blend-screen pointer-events-none" />
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block uppercase font-bold mb-1">SCORE DE FIT DE CONTRATAÇÃO</span>
                                <h4 className="text-[14px] font-bold text-white">{newCandName}</h4>
                                <span className="text-[9px] text-white/50 font-mono block mt-1">{newCandRoleTitle || `${recruitmentRole} Sênior`}</span>
                              </div>
                              <div className="bg-[#d2af5a] text-black px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(201, 148, 58,0.3)]">
                                {recruitmentResult.grade}
                              </div>
                            </div>
                            <p className="text-[10px] text-white/70 font-sans leading-relaxed m-0 border-t border-white/5 pt-2 max-w-3xl">
                              {recruitmentResult.feedback}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                              <span className="text-[8px] font-mono text-white/40 block mb-1 uppercase tracking-widest">Humble (Humildade)</span>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#5dcaa5]" style={{ width: `${recruitmentResult.humble}%` }} />
                                </div>
                                <span className="text-[10px] font-mono text-white font-bold">{recruitmentResult.humble}%</span>
                              </div>
                            </div>
                            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                              <span className="text-[8px] font-mono text-white/40 block mb-1 uppercase tracking-widest">Hungry (Sede de Resultados)</span>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#fac775]" style={{ width: `${recruitmentResult.hungry}%` }} />
                                </div>
                                <span className="text-[10px] font-mono text-white font-bold">{recruitmentResult.hungry}%</span>
                              </div>
                            </div>
                            <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                              <span className="text-[8px] font-mono text-white/40 block mb-1 uppercase tracking-widest">Smart (Inteligência Social)</span>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#d2af5a]" style={{ width: `${recruitmentResult.smart}%` }} />
                                </div>
                                <span className="text-[10px] font-mono text-white font-bold">{recruitmentResult.smart}%</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => setRecruitmentStep(0)}
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition"
                            >
                              ← Refazer / Reiniciar
                            </button>
                            <button
                              onClick={handleSaveRecruitmentCandidate}
                              className="px-4 py-2 bg-[#5dcaa5] hover:bg-[#5dcaa5]/90 text-black rounded-xl text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(93,202,165,0.3)]"
                            >
                              ✓ INSERIR CANDIDATO NO FUNIL
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Automations Row: Left (Recruiting), Right (General) */}
                <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#d2af5a]/20 p-6 relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#d2af5a]/5 blur-[120px] pointer-events-none mix-blend-screen" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div>
                      <div className="mb-4">
                        <h3 className="text-[11px] font-mono text-[#d2af5a] font-bold tracking-widest uppercase flex items-center gap-2">
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

            {/* ROW 4: AGILE & SQUADS WORKSPACE */}
            <div className="home-row full mt-6">
              <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-6 rounded-2xl text-left">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#d2af5a]/5 blur-[120px] pointer-events-none mix-blend-screen" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block mb-1 font-bold uppercase">CULTURA ORGANIZACIONAL & ESCALABILIDADE</span>
                    <h3 className="text-[16px] font-bold text-white mb-1">Framework de Squads & Cultura Ágil</h3>
                    <div className="text-[10px] text-white/50 font-sans">Descentralização tática e ciclos de feedback estruturados</div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#5dcaa5]/10 border border-[#5dcaa5]/30 rounded text-[#5dcaa5] font-mono text-[8px] font-bold tracking-widest uppercase">Cultura Ativa</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                  
                  {/* Mentalidade Ágil Col */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-xl space-y-3">
                    <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider">⚡ MENTALIDADE ÁGIL (NOT IT ONLY)</span>
                    <p className="text-[11.5px] leading-relaxed text-white/90">
                      <strong>Agile/Scrum</strong> não é uma mera metodologia de TI — é uma verdadeira <strong>cultura organizacional</strong>. 
                      Foca em ciclos extremamente curtos (<span className="text-[#d2af5a] font-semibold">sprints de 2 semanas</span>), entrega de valor contínua e feedback imediato do cliente a cada ciclo concluído.
                    </p>
                    <div className="border-t border-white/[0.05] pt-2 mt-2">
                      <div className="flex justify-between text-[9.5px] font-mono text-white/40">
                        <span>Ritmo dos Sprints:</span>
                        <span className="text-[#5dcaa5] font-bold">2 semanas</span>
                      </div>
                    </div>
                  </div>

                  {/* Modelo de Squads Col */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-xl space-y-3">
                    <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider">👥 MODELO DE SQUADS (SPOTIFY PLAYBOOK)</span>
                    <p className="text-[11.5px] leading-relaxed text-white/90">
                      Equipes organizadas em <strong>squads</strong>: times autônomos, multidisciplinares e coesos de <strong>6 a 8 pessoas</strong> com total propriedade de ponta a ponta sobre seu domínio de produto ou operação.
                    </p>
                    <div className="border-t border-white/[0.05] pt-2 mt-2">
                      <div className="flex justify-between text-[9.5px] font-mono text-white/40">
                        <span>Tamanho Recomendado:</span>
                        <span className="text-[#5dcaa5] font-bold">6-8 membros</span>
                      </div>
                    </div>
                  </div>

                  {/* Benchmarks Nacionais Col */}
                  <div className="bg-[#d2af5a]/[0.02] border border-[#d2af5a]/10 p-4 rounded-xl space-y-3">
                    <span className="block text-[8px] font-mono text-[#5dcaa5] font-bold uppercase tracking-wider">🇧🇷 METODOLOGIA EM PRÁTICA (BRASIL)</span>
                    <p className="text-[11.5px] leading-relaxed text-white/90 italic">
                      "No Brasil, o caso de maior impacto foi o da <strong>Magazine Luiza</strong>, que adotou squads multidisciplinares e de alta autonomia para transformar lojas físicas tradicionais em uma plataforma digital de ecossistema robusto."
                    </p>
                    <div className="border-t border-white/[0.05] pt-2 mt-2">
                      <div className="flex justify-between text-[9.5px] font-mono text-white/40">
                        <span>Benchmark Nacional:</span>
                        <span className="text-[#5dcaa5] font-bold">LuizaLabs / Magalu</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Interactive Simulator / Squad Planner inside SIG Home */}
                <div className="mt-4 border-t border-white/[0.05] pt-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                  <div className="text-[9px] font-mono text-white/40 uppercase">
                    🛠️ IA PLANNER DE SQUADS:
                  </div>
                  <div className="col-span-3 flex gap-2">
                    <button 
                      onClick={() => {
                        triggerToast("Planejando Squads de Inovação Magalu-style...")
                      }}
                      className="flex-1 py-2 bg-[#d2af5a]/10 hover:bg-[#d2af5a]/20 border border-[#d2af5a]/30 rounded-lg text-[9px] font-mono font-bold text-[#d2af5a] tracking-widest uppercase cursor-pointer text-center"
                    >
                      Estruturar Squad de Dados IPB
                    </button>
                    <button 
                      onClick={() => {
                        triggerToast("Configurando Sprint de 2 Semanas com feedback integrado...")
                      }}
                      className="flex-1 py-2 bg-black/60 hover:bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono font-bold text-white/70 tracking-widest uppercase cursor-pointer text-center"
                    >
                      Iniciar Sprint de Cultura
                    </button>
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
            className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#d2af5a]/20 relative overflow-hidden"
            style={{ padding: '24px' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d2af5a]/5 blur-[80px] pointer-events-none mix-blend-screen" />
            
            {/* Header info */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="text-left max-w-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded text-[9px] font-mono font-bold text-[#d2af5a] tracking-widest uppercase">LÍDERES</span>
                  <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Ferramentas do Líder como Agente</span>
                </div>
                <h2 className="text-[18px] font-bold text-white mb-2 tracking-tight">Desenvolvimento de Liderança</h2>
                <div className="text-[11px] text-white/60 font-sans leading-relaxed">Você não pode liderar quem você não é. Desenvolvimento tem uma sequência: Autoconhecimento → Gestão → Equipe → Organização.</div>
              </div>
              <div>
                <button 
                  onClick={() => triggerToast('Professor de IA iniciando mentoria de liderança...', 'ok')}
                  className="px-4 py-2 bg-gradient-to-r from-[#d2af5a]/20 to-[#d2af5a]/5 hover:from-[#d2af5a]/30 hover:to-[#d2af5a]/10 border border-[#d2af5a]/40 rounded-xl text-[10px] font-bold text-[#d2af5a] font-mono tracking-widest transition-all shadow-[0_0_20px_rgba(201, 148, 58,0.1)] flex items-center gap-2"
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
                  className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase font-bold transition-all ${lideresTab === sub.id ? 'bg-[#d2af5a] text-black shadow-[0_0_15px_rgba(201, 148, 58,0.3)]' : 'bg-white/5 border border-white/10 text-white/50 hover:border-[#d2af5a]/30 hover:text-[#d2af5a]'}`}
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
                  {/* Part 1: Jornada do Líder */}
                  <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#d2af5a]/20 relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#d2af5a]/5 blur-[80px] mix-blend-screen pointer-events-none" />
                    
                    <div className="relative z-10 mb-6">
                      <h4 className="text-[12px] font-mono text-[#d2af5a] font-bold tracking-widest uppercase mb-1">JORNADA DO LÍDER — FAÇA NESTA ORDEM</h4>
                      <p className="text-[11px] text-white/50 font-sans leading-relaxed">
                        O desenvolvimento da liderança tem uma sequência: primeiro você se conhece, depois domina as ferramentas de gestão, depois aplica com o time, depois influencia a organização. Pular etapas cria líderes frágeis.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                      
                      {/* Step 1 */}
                      <div className="p-5 border border-[#d2af5a]/30 bg-[#d2af5a]/10 rounded-2xl relative">
                        <div className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full bg-[#d2af5a] text-black flex items-center justify-center font-bold font-mono text-[14px] shadow-[0_0_15px_rgba(201, 148, 58,0.4)] flex-shrink-0">1</div>
                          <div className="flex-1 text-left">
                            <div className="flex justify-between items-start mb-1 gap-2 flex-wrap">
                              <h5 className="text-[13px] font-bold text-white leading-tight font-sans">Autoconhecimento (PDI + IE)</h5>
                              <span className="px-2 py-0.5 bg-[#d2af5a] text-black text-[8px] font-bold uppercase tracking-widest rounded flex-shrink-0 font-mono">COMECE AQUI</span>
                            </div>
                            <p className="text-[10px] text-white/60 mb-4 leading-relaxed font-sans">
                              Escreva sobre uma situação que gerou emoção intensa. Use o Diário IE (na aba Gerir) — a IA analisa o padrão e avança seu PDI automaticamente.
                            </p>
                            
                            <div className="space-y-2 font-sans">
                              <button onClick={() => triggerToast('Abrindo Diário IE...', 'ok')} className="w-full text-left p-3 bg-black/40 border border-white/10 hover:border-[#d2af5a]/40 rounded-xl transition-all group flex justify-between items-center cursor-pointer">
                                <div>
                                  <span className="block text-[11px] text-white font-bold group-hover:text-[#d2af5a] transition-colors">▶ Escrever no Diário IE</span>
                                  <span className="block text-[9px] text-white/40 mt-1">A IA calcula seu padrão</span>
                                </div>
                                <span className="text-[#d2af5a] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="p-5 border border-white/10 bg-black/40 rounded-2xl relative opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/20 text-white/50 flex items-center justify-center font-bold font-mono text-[14px] flex-shrink-0">2</div>
                          <div className="flex-1 text-left">
                            <div className="flex justify-between items-start mb-1 gap-2 flex-wrap">
                              <h5 className="text-[13px] font-bold text-white leading-tight font-sans">Fundamentos da Gestão</h5>
                            </div>
                            <p className="text-[10px] text-white/60 mb-4 leading-relaxed font-sans">
                              Domine as ferramentas operacionais antes de tentar inspirar grandes mudanças. Recrutamento, Feedback, 1:1s, Delegação (M1-M4).
                            </p>

                            <div className="space-y-2 font-sans">
                              <button onClick={() => setLideresTab('gerir')} className="w-full text-left p-3 bg-black/40 border border-white/10 hover:border-white/30 rounded-xl transition-all group flex justify-between items-center cursor-pointer">
                                <div>
                                  <span className="block text-[11px] text-white font-bold">▶ Ir para Gerir</span>
                                  <span className="block text-[9px] text-white/40 mt-1">Ferramentas de Gestão</span>
                                </div>
                                <span className="text-white/50 group-hover:text-white transition-colors">→</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="p-5 border border-white/10 bg-black/40 rounded-2xl relative opacity-60">
                        <div className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/20 text-white/30 flex items-center justify-center font-bold font-mono text-[14px] flex-shrink-0">3</div>
                          <div className="flex-1 text-left font-sans">
                            <div className="flex justify-between items-start mb-1 gap-2 flex-wrap">
                              <h5 className="text-[13px] font-bold text-white/70 leading-tight">Dinâmica de Equipe (Tuckman)</h5>
                            </div>
                            <p className="text-[10px] text-white/40 mb-4 leading-relaxed font-sans">
                              Aprenda a formar alianças (Contrato de Aliança) e gerenciar conflitos construtivos. (Bloqueado: Requer 60% no PDI 2)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="p-5 border border-white/10 bg-black/40 rounded-2xl relative opacity-60">
                        <div className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/20 text-white/30 flex items-center justify-center font-bold font-mono text-[14px] flex-shrink-0">4</div>
                          <div className="flex-1 text-left font-sans">
                            <div className="flex justify-between items-start mb-1 gap-2 flex-wrap">
                              <h5 className="text-[13px] font-bold text-white/70 leading-tight">Impacto Organizacional</h5>
                            </div>
                            <p className="text-[10px] text-white/40 mb-4 leading-relaxed font-sans">
                              Liderar mudanças estratégicas e influenciar cultura. Alpha-Linter e BI Avançado. (Bloqueado)
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Top Highlight: Progress */}
                  <div className="p-5 bg-gradient-to-r from-black/60 to-black/30 border border-[#d2af5a]/20 rounded-2xl relative overflow-hidden backdrop-blur-3xl shadow-[0_0_40px_rgba(201, 148, 58,0.05)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#d2af5a]/10 blur-[80px] pointer-events-none mix-blend-screen" />
                    <span className="font-mono text-[10px] text-[#d2af5a] tracking-[0.1em] uppercase font-bold block mb-3">PDI - JORNADA DO LÍDER</span>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1 height-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-[#d2af5a] to-white relative"
                          style={{ width: `${lessonsCompletedPercent}%`, boxShadow: '0 0 10px rgba(201, 148, 58,0.5)' }}
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
                  <div className="flex flex-col gap-6">
                    {/* Left: Diary & CNV */}
                    <div className="lg:col-span-7 space-y-5">
                      {/* Diary Form */}
                      <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-[13px] m-0 font-bold text-white tracking-wide">Diário de Inteligência Emocional + IA</h4>
                          <button className="px-3 py-1.5 border border-[#d2af5a]/30 rounded-lg text-[#d2af5a] text-[9px] font-mono font-bold tracking-widest hover:bg-[#d2af5a]/10 hover:border-[#d2af5a]/60 transition-all shadow-[0_0_15px_rgba(201, 148, 58,0.1)]">▶ AULA</button>
                        </div>
                        <p className="text-[10px] text-white/50 m-0 mb-4 font-sans leading-relaxed">Escreva sobre uma situação que gerou emoção intensa. A IA analisa o padrão e sugere ações de autogestão.</p>
                        
                        <div className="flex flex-col gap-3">
                          <textarea 
                            value={diaryInput}
                            onChange={(e) => setDiaryInput(e.target.value)}
                            placeholder="Situação geradora de emoção intensa..."
                            className="cnv-text-area"
                          />
                          <button 
                            onClick={handleAddDiary}
                            className="px-3.5 py-1.5 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/30 border border-[#d2af5a]/45 rounded-lg text-[9px] font-bold text-[#d2af5a] font-mono transition"
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
                                <span className="text-[7.5px] font-mono text-[#d2af5a] font-bold block">{log.time} · AUTO-REGISTRO</span>
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
                          className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-3 text-[11px] text-white font-sans leading-relaxed outline-none focus:border-[#d2af5a]/40 focus:ring-1 focus:ring-[#d2af5a]/20 min-h-[80px] resize-none"
                        />

                        <div className="flex justify-between items-center mt-3">
                          <b className="text-[12px] font-mono text-white/80 tracking-widest">{cnvScore || 'Score Alpha: --'}</b>
                          <button 
                            onClick={handleCnvAnalyze}
                            disabled={cnvAnalyzing}
                            className="px-4 py-2 bg-[#d2af5a]/10 hover:bg-[#d2af5a]/20 border border-[#d2af5a]/30 rounded-xl text-[9px] font-bold text-[#d2af5a] font-mono transition-all disabled:opacity-50"
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
                          <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block mb-3 font-bold uppercase">📡 PDI DE COMUNICAÇÃO · 4 MÓDULOS</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 hover:border-[#d2af5a]/20 transition-colors">
                              <b className="text-[11px] text-white block mb-1 font-mono tracking-wide">MÓDULO 1: Fato vs Julgamento</b>
                              <span className="text-[10px] text-white/50 block mb-3 font-sans leading-relaxed">Eliminar adjetivos subjetivos da sua comunicação técnica.</span>
                              <span className="font-mono text-[9px] text-[#5dcaa5] block tracking-widest font-bold">KPI: Alpha-Linter &gt;70%</span>
                            </div>
                            <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 hover:border-[#d2af5a]/20 transition-colors">
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
                                className={`p-4 bg-white/[0.01] border rounded-xl cursor-pointer transition-all ${expanded ? 'border-[#d2af5a]/40 bg-[#d2af5a]/5' : 'border-white/[0.04] hover:border-white/[0.1]'}`} 
                                onClick={() => setExpandedLesson(expanded ? null : lesson.id)}
                              >
                                <div className="flex justify-between items-center">
                                  <b className={`text-[11px] font-sans tracking-wide transition-colors ${expanded ? 'text-[#d2af5a]' : 'text-white'}`}>▶ {lesson.title}</b>
                                  <input 
                                    type="checkbox" 
                                    checked={microaulasProgress[idx] || false}
                                    onChange={() => handleToggleLessonCheck(idx)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-3.5 h-3.5 accent-[#d2af5a] rounded cursor-pointer"
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
                                  <input type="range" className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" min="1" max="5" defaultValue="3" style={{ accentColor: '#d2af5a' }} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid 2: Lentes de Missão & Manifesto */}
                  <div className="flex flex-col gap-6">
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
                              <div className="lesson-header"><b style={{ fontSize: '10.5px', color: '#fff' }}>{l.title}</b><span style={{ fontSize: '8px', color: '#d2af5a', fontWeight: 'bold' }}>LER ▼</span></div>
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

              {/* SUBPAGE: GERIR */}
              {lideresTab === 'gerir' && (
                <motion.div
                  key="gerir"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="dash-card p-5 text-center bg-black/40 backdrop-blur-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#e24b4a]/10 blur-[50px] mix-blend-screen pointer-events-none" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#e24b4a] font-bold block mb-2">Pessoas em Alerta</span>
                      <b className="text-3xl font-light text-white block">{teamMembers.filter(m => m.d6 < 60).length}</b>
                      <span className="text-[9px] text-[#e24b4a]/70 block mt-2 font-mono">D6 ou ISR &lt; 50</span>
                    </div>
                    <div className="dash-card p-5 text-center bg-black/40 backdrop-blur-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d2af5a]/10 blur-[50px] mix-blend-screen pointer-events-none" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#d2af5a] font-bold block mb-2">D6 Médio do Time</span>
                      <b className="text-3xl font-light text-white block">{Math.round(teamMembers.reduce((s, m) => s + m.d6, 0) / (teamMembers.length || 1))}<small className="text-[14px] text-white/30 font-sans">/100</small></b>
                      <span className="text-[9px] text-[#d2af5a]/70 block mt-2 font-mono">Calculado em tempo real</span>
                    </div>
                    <div className="dash-card p-5 text-center bg-black/40 backdrop-blur-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#5dcaa5]/10 blur-[50px] mix-blend-screen pointer-events-none" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#5dcaa5] font-bold block mb-2">Com Tarefas Pendentes</span>
                      <b className="text-3xl font-light text-white block">{delegatedTasks.filter(t => t.status !== 'concluido').length}</b>
                      <span className="text-[9px] text-[#5dcaa5]/70 block mt-2 font-mono">Delegação ativa</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* Coach SBI */}
                    <div className="lg:col-span-7 dash-card text-left space-y-4 bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none mix-blend-screen" />
                      <div className="flex justify-between items-center mb-4 relative z-10">
                        <div>
                          <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block mb-2 font-bold uppercase">COACH SBI</span>
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
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d2af5a]/40"
                        />
                        <input 
                          type="text" 
                          placeholder="Comportamento (Fato observável. Ex: Você me interrompeu 3 vezes...)" 
                          value={sbiComp}
                          onChange={(e) => setSbiComp(e.target.value)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d2af5a]/40"
                        />
                        <textarea 
                          placeholder="Impacto (Efeito no time. Ex: Isso gerou ruído na equipe...)" 
                          value={sbiImp}
                          onChange={(e) => setSbiImp(e.target.value)}
                          className="w-full h-14 bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d2af5a]/40 resize-none"
                        />
                        
                        <button 
                          onClick={handleAddSbi}
                          className="px-3.5 py-1.5 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/30 border border-[#d2af5a]/45 rounded-lg text-[9px] font-bold text-[#d2af5a] font-mono transition"
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
                            <div key={i} className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl font-mono text-[9px] hover:border-[#d2af5a]/20 transition-colors">
                              <span className="text-[#d2af5a] font-bold block mb-2 tracking-widest">{log.date} · REGISTRO SBI</span>
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
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d2af5a]/5 blur-[80px] pointer-events-none mix-blend-screen" />
                      <div>
                        <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block mb-2 font-bold uppercase">SAÚDE INDIVIDUAL</span>
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
                              <div className="text-right flex flex-col items-end">
                                <span className="text-[9.5px] font-bold font-mono text-[#d2af5a] block leading-none">{m.d6}% D6</span>
                                <span className={`text-[7.5px] font-bold uppercase font-mono mt-0.5 block ${m.d6 >= 80 ? 'text-[#5dcaa5]' : m.d6 >= 60 ? 'text-[#fac775]' : 'text-[#e24b4a]'}`}>{m.status}</span>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <button 
                                    onClick={() => handleArchiveMember(m)}
                                    className="p-1 hover:bg-white/10 rounded text-[9.5px] text-[#d2af5a] transition-colors flex items-center justify-center"
                                    title="Arquivar membro do time"
                                    style={{ lineHeight: 1 }}
                                  >
                                    📥
                                  </button>
                                  <button 
                                    onClick={() => {
                                      if (confirm(`Deseja realmente demitir/remover ${m.name}?`)) {
                                        handleDeleteMember(m.id)
                                      }
                                    }}
                                    className="p-1 hover:bg-red-500/20 rounded text-[9px] text-red-400 transition-colors flex items-center justify-center"
                                    title="Demitir / Apagar"
                                    style={{ lineHeight: 1 }}
                                  >
                                    ✕
                                  </button>
                                </div>
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
                  className="space-y-6 text-left"
                >
                  {/* Matriz M1-M4 situational matrix explanation */}
                  <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] mix-blend-screen pointer-events-none" />
                    <h4 className="text-[12px] font-mono text-[#d2af5a] font-bold tracking-widest uppercase mb-1">Matriz M1-M4 — Liderança Situacional</h4>
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
                  <div className="flex flex-col gap-6">
                    {/* Calculator Form */}
                    <div className="lg:col-span-7 dash-card space-y-5 bg-[#050505]/60 backdrop-blur-3xl border border-[#d2af5a]/10">
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
                      <div style={{ background: 'rgba(201, 148, 58,0.03)', border: '0.2px solid rgba(201, 148, 58,0.15)', borderRadius: '8px', padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
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
                          className="w-full bg-black/45 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[9.5px] text-white outline-none focus:border-[#d2af5a]/40"
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
                            className="px-3 bg-[#d2af5a]/20 border border-[#d2af5a]/30 hover:bg-[#d2af5a]/30 rounded-[0.4rem] text-[9.5px] font-bold text-[#d2af5a] transition"
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
                              className="p-2 bg-white/[0.02] border border-white/[0.04] rounded-lg flex items-center justify-between cursor-pointer transition hover:border-[#d2af5a]/30 text-left"
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
                  <span className="num" style={{ fontFamily: 'inherit', fontSize: '10px', color: '#b8975a', border: '0.2px solid rgba(201, 148, 58,0.3)', padding: '1px 6px', borderRadius: '4px', background: 'rgba(201, 148, 58,0.05)', fontWeight: 'bold' }}>TIME</span>
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
                  className="flex flex-col gap-6 text-left w-full"
                  style={{ width: '100%' }}
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
                          { id: 'forming', label: 'Forming', val: 'x0.6', color: tuckmanStage === 'forming' ? 'border-[#d2af5a]/60 bg-[#d2af5a]/10 text-[#d2af5a] shadow-[0_0_12px_rgba(201, 148, 58,0.15)]' : 'border-white/[0.06] bg-black/30 text-white/40 hover:border-white/10 hover:text-white/60' },
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
                        <span className="text-[#d2af5a] text-[8px] font-bold block mb-1">PR = ΣPI × T − LG · POTENCIAL REAL</span>
                        <b>POTENCIAL REAL:</b> Potencial calibrado em <b className="text-white">{calculatedPotential}%</b> baseado nos {teamMembers.length} liderados ativos e no multiplicador.
                      </div>

                      {/* HHH parameters */}
                      <div className="border-t border-white/[0.04] pt-3">
                        <span className="text-[8px] font-mono text-[#d2af5a] uppercase tracking-wider block mb-2 font-bold">HHH Framework (Médio do Time)</span>
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
                          className="px-2 py-1 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/30 border border-[#d2af5a]/30 text-[#d2af5a] rounded text-[8px] font-mono font-bold"
                        >
                          ✨ GERAR VIA IA
                        </button>
                      </div>
                      
                      <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                        {allianceClauses.map((clause, idx) => (
                          <div key={idx} className="p-2.5 bg-black/20 border border-white/[0.06] rounded-lg flex items-center justify-between gap-2 text-[10px] hover:border-[#d2af5a]/20 transition">
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
                          className="flex-1 bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-2.5 py-1.5 text-[9.5px] outline-none focus:border-[#d2af5a]/40"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddAllianceClause()}
                        />
                        <button 
                          onClick={handleAddAllianceClause}
                          className="px-3 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/30 border border-[#d2af5a]/45 rounded-[0.4rem] text-[9.5px] font-bold text-[#d2af5a] transition"
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
                  className="flex flex-col gap-6 text-left w-full"
                  style={{ width: '100%' }}
                >
                  
                  {/* Algoritmo de Sucessor */}
                  <div className="lg:col-span-6">
                    <div className="dash-card space-y-4">
                      <div>
                        <h4 className="text-[12px] font-bold text-white uppercase font-mono tracking-widest">Algoritmo de Identificação de Sucessor</h4>
                        <p className="text-[9.5px] text-white/40 font-sans">Parâmetros combinados de D6 + HHH + Propósito</p>
                      </div>

                      <div className="space-y-3">
                        {rankedSuccessors.map((member, i) => (
                          <div key={member.id} className="premium-glass-card flex items-center justify-between transition-all duration-300">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d2af5a]/20 to-[#d2af5a]/5 border border-[#d2af5a]/40 text-[#d2af5a] flex items-center justify-center font-bold font-mono text-[10px] flex-shrink-0 shadow-[0_0_10px_rgba(201, 148, 58,0.15)]">
                                0{i + 1}
                              </span>
                              <div>
                                <b className="text-[11.5px] text-white leading-none block font-bold">{member.name}</b>
                                <span className="text-[8.5px] font-mono text-white/45 block mt-1.5">{member.role}</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <span className="text-[11px] font-mono font-bold text-[#5dcaa5] block leading-none">{member.successionScore} pts</span>
                              <span className="text-[8.5px] text-white/35 block mt-1.5 font-sans">{member.wishes}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Profiler detail */}
                  <div className="lg:col-span-6">
                    <div className="dash-card space-y-4">
                      <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
                        <div>
                          <h4 className="text-[12px] font-bold text-white uppercase font-mono tracking-widest">Ficha de Perfil do Liderado</h4>
                          <p className="text-[9.5px] text-white/40 font-sans">Visualização unificada de fit cultural</p>
                        </div>
                        
                        <select
                          value={selectedProfileId}
                          onChange={(e) => setSelectedProfileId(e.target.value)}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-[9.5px] text-white outline-none focus:border-[#d2af5a]/40"
                        >
                          {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                      </div>

                      {/* Member detail print */}
                      {(() => {
                        const m = teamMembers.find(x => x.id === selectedProfileId)
                        if (!m) return null
                        return (
                          <div className="space-y-4 font-sans text-[10px] text-white/70">
                            <div className="flex items-center gap-3">
                              <div className="h-11 w-11 rounded-full bg-[#d2af5a]/15 text-[#d2af5a] border border-[#d2af5a]/30 text-xs font-bold flex items-center justify-center">
                                {m.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <b className="text-white text-[13px] block leading-none font-bold">{m.name}</b>
                                <span className="text-white/45 text-[9px] font-mono block mt-1.5">{m.role} · Maturidade {m.maturity}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <div className="premium-glass-card flex flex-col gap-1 text-left">
                                <span className="text-[8px] text-white/40 uppercase tracking-widest font-mono">D6 Health Index</span>
                                <b className="text-[11px] font-mono font-bold text-white">{m.d6}%</b>
                              </div>
                              <div className="premium-glass-card flex flex-col gap-1 text-left">
                                <span className="text-[8px] text-white/40 uppercase tracking-widest font-mono">Alinhamento</span>
                                <b className="text-[11px] font-mono font-bold text-[#5dcaa5]">{m.status}</b>
                              </div>
                              <div className="premium-glass-card flex flex-col gap-1 text-left">
                                <span className="text-[8px] text-white/40 uppercase tracking-widest font-mono">Humble (Coração)</span>
                                <b className="text-[11px] font-mono font-bold text-white">{m.hhh.humble}%</b>
                              </div>
                              <div className="premium-glass-card flex flex-col gap-1 text-left">
                                <span className="text-[8px] text-white/40 uppercase tracking-widest font-mono">Hungry (Mãos)</span>
                                <b className="text-[11px] font-mono font-bold text-white">{m.hhh.hungry}%</b>
                              </div>
                              <div className="col-span-2 p-4 bg-gradient-to-r from-[#d2af5a]/10 to-transparent border border-[#d2af5a]/20 rounded-2xl flex flex-col gap-1.5 text-left">
                                <span className="text-[8px] text-[#d2af5a] uppercase tracking-widest font-mono font-bold">Desejo de Carreira</span>
                                <b className="text-[10px] text-[#fac775] font-medium leading-relaxed">{m.wishes}</b>
                              </div>
                              <div className="col-span-2 flex gap-3 mt-3">
                                <button
                                  onClick={() => handleArchiveMember(m)}
                                  className="flex-1 py-2.5 bg-[#d2af5a]/10 hover:bg-[#d2af5a]/20 border border-[#d2af5a]/40 rounded-xl text-[10px] font-mono font-bold text-[#d2af5a] transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                                >
                                  <span>📥</span> ARQUIVAR
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Deseja realmente demitir/remover ${m.name}?`)) {
                                      handleDeleteMember(m.id)
                                    }
                                  }}
                                  className="flex-1 py-2.5 bg-red-950/20 hover:bg-red-900/20 border border-red-900/40 rounded-xl text-[10px] font-mono font-bold text-red-400 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                                >
                                  <span>🗑</span> DEMITIR / APAGAR
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                    </div>
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
                  className="flex flex-col gap-6 text-left w-full"
                  style={{ width: '100%' }}
                >
                  
                  {/* Conflict Analyzer Thomas Kilmann */}
                  <div className="lg:col-span-7">
                    <div className="dash-card space-y-3">
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
                        className="px-3.5 py-1.5 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/30 border border-[#d2af5a]/45 rounded-lg text-[9px] font-bold text-[#d2af5a] font-mono transition disabled:opacity-50"
                      >
                        {mediationAnalyzing ? 'Processando Estruturas...' : '🪄 ANALISAR COM IA'}
                      </button>

                      {mediationResult && (
                        <pre className="p-3 bg-black/40 border border-white/[0.06] rounded-lg font-mono text-[9px] leading-relaxed text-white/70 overflow-x-auto whitespace-pre-wrap">
                          {mediationResult}
                        </pre>
                      )}
                    </div>
                  </div>

                  {/* Small Matrix Info */}
                  <div className="lg:col-span-5">
                    <div className="dash-card">
                      <h4 className="text-[11px] font-bold text-[#d2af5a] uppercase font-mono mb-2">Thomas-Kilmann Styles</h4>
                      <p className="text-[9px] text-white/45 mb-3 font-sans">5 estilos de resolução para calibração</p>
                      
                      <div className="space-y-1.5 font-sans text-[9px] text-white/60">
                        <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d2af5a]/15 transition"><b>Competição:</b> Alta assertividade, baixa cooperação.</div>
                        <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d2af5a]/15 transition"><b>Colaboração:</b> Alta assertividade, alta cooperação. Win-win.</div>
                        <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d2af5a]/15 transition"><b>Compromisso:</b> Equilíbrio sutil de concessões.</div>
                        <div className="p-2 bg-black/20 border border-white/[0.06] rounded hover:border-[#d2af5a]/15 transition"><b>Acomodação:</b> Baixa assertividade, alta cooperação.</div>
                      </div>
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
            className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#d2af5a]/20 relative overflow-hidden"
            style={{ padding: '24px' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d2af5a]/5 blur-[80px] pointer-events-none mix-blend-screen" />
            
            {/* Header info */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="text-left max-w-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded text-[9px] font-mono font-bold text-[#d2af5a] tracking-widest uppercase">EMPRESA</span>
                  <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Direção &amp; Estratégia Corporativa</span>
                </div>
                <h2 className="text-[18px] font-bold text-white mb-2 tracking-tight">Estratégia · BI · Organização</h2>
                <div className="text-[11px] text-white/60 font-sans leading-relaxed">Conecte o desenvolvimento da liderança e a força do time aos resultados do negócio através de OKRs e análise sistêmica.</div>
              </div>
              <div>
                <button 
                  onClick={() => triggerToast('Professor de IA iniciando análise corporativa...', 'ok')}
                  className="px-4 py-2 bg-gradient-to-r from-[#cbd5e1]/20 to-[#cbd5e1]/5 hover:from-[#cbd5e1]/30 hover:to-[#cbd5e1]/10 border border-[#d2af5a]/40 rounded-xl text-[10px] font-bold text-[#d2af5a] font-mono tracking-widest transition-all shadow-[0_0_20px_rgba(210,175,90,0.1)] flex items-center gap-2"
                >
                  <span className="text-[12px]">▶</span> PROFESSOR IA
                </button>
              </div>
            </div>

            {/* Sub-tabs Row */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4 relative z-50">
              <button 
                onClick={() => setEmpresaTab('diagnostico')} 
                className={`sub-tab-btn ${empresaTab === 'diagnostico' ? 'active' : ''}`}
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
                  className={`sub-tab-btn ${empresaTab === sub.id ? 'active' : ''}`}
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
                  <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-[#d2af5a]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] pointer-events-none mix-blend-screen" />
                    
                    <div className="flex justify-between items-center border-b border-white/[0.04] pb-4 mb-6 relative z-10">
                      <div>
                        <h4 className="text-[12px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Modelo de Avaliação Organizacional</h4>
                        <p className="text-[10px] text-white/50 font-sans">Consultoria estratégica em gestão corporativa e alinhamento de liderança.</p>
                      </div>
                      {auditoriaStep !== null ? (
                        <button 
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-white font-mono tracking-widest transition-all flex items-center gap-2"
                          onClick={() => setAuditoriaStep(null)}
                        >
                          <span className="text-[12px]">◀</span> VOLTAR PARA VISÃO GERAL
                        </button>
                      ) : (
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-[#cbd5e1]/20 to-[#cbd5e1]/5 hover:from-[#cbd5e1]/30 hover:to-[#cbd5e1]/10 border border-[#d2af5a]/40 rounded-xl text-[10px] font-bold text-[#d2af5a] font-mono tracking-widest transition-all shadow-[0_0_20px_rgba(210,175,90,0.1)] flex items-center gap-2"
                          onClick={() => triggerToast("Iniciando auditoria de gestão com a IA...", "ok")}
                        >
                          <span className="text-[12px]">▶</span> IA ANALYZER
                        </button>
                      )}
                    </div>

                    {auditoriaStep === null && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                        {/* Etapa 1 */}
                        <div className="p-5 bg-black/40 border border-white/10 hover:border-[#d2af5a]/40 rounded-2xl transition-all group relative">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#d2af5a]/20 border border-[#d2af5a]/50 text-[#d2af5a] flex items-center justify-center font-bold font-mono text-[14px] flex-shrink-0">1</div>
                            <h5 className="text-[12px] font-bold text-white leading-tight">Prospecção & Setup</h5>
                          </div>
                          <p className="text-[10px] text-white/50 mb-4 leading-relaxed font-sans min-h-[45px]">Etapa 1 do Modelo: História, forças/fraquezas e mapeamento das funções de gestão (Planejar, Organizar, Liderar, Controlar).</p>
                          <button onClick={() => setAuditoriaStep(1)} className="w-full py-2 bg-white/5 hover:bg-[#d2af5a]/10 border border-white/10 hover:border-[#d2af5a]/30 rounded-lg text-[9px] font-mono text-white/70 hover:text-[#d2af5a] transition-all font-bold tracking-widest">INICIAR ETAPA 1</button>
                        </div>

                        {/* Etapa 2 */}
                        <div className="p-5 bg-black/40 border border-white/10 hover:border-[#d2af5a]/40 rounded-2xl transition-all group relative">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/30 flex items-center justify-center font-bold font-mono text-[14px] flex-shrink-0 group-hover:bg-[#d2af5a]/10 group-hover:text-[#d2af5a] transition-colors">2</div>
                            <h5 className="text-[12px] font-bold text-white leading-tight">Macro, Micro & Stakeholders</h5>
                          </div>
                          <p className="text-[10px] text-white/50 mb-4 leading-relaxed font-sans min-h-[45px]">Etapa 2 do Modelo: Análise PESTEL (política/economia), Porter (clientes/fornecedores) e matriz de influência de stakeholders.</p>
                          <button onClick={() => setAuditoriaStep(2)} className="w-full py-2 bg-white/5 hover:bg-[#d2af5a]/10 border border-white/10 hover:border-[#d2af5a]/30 rounded-lg text-[9px] font-mono text-white/70 hover:text-[#d2af5a] transition-all font-bold tracking-widest">INICIAR ETAPA 2</button>
                        </div>

                        {/* Etapa 3 */}
                        <div className="p-5 bg-black/40 border border-white/10 hover:border-[#d2af5a]/40 rounded-2xl transition-all group relative">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/30 flex items-center justify-center font-bold font-mono text-[14px] flex-shrink-0 group-hover:bg-[#d2af5a]/10 group-hover:text-[#d2af5a] transition-colors">3</div>
                            <h5 className="text-[12px] font-bold text-white leading-tight">Estrutura & Controle</h5>
                          </div>
                          <p className="text-[10px] text-white/50 mb-4 leading-relaxed font-sans min-h-[45px]">Etapa 3 do Modelo: Desenho de organograma, definição de cultura orgânica/mecanicista e mapeamento de controle de objetivos.</p>
                          <button onClick={() => setAuditoriaStep(3)} className="w-full py-2 bg-white/5 hover:bg-[#d2af5a]/10 border border-white/10 hover:border-[#d2af5a]/30 rounded-lg text-[9px] font-mono text-white/70 hover:text-[#d2af5a] transition-all font-bold tracking-widest">INICIAR ETAPA 3</button>
                        </div>

                        {/* Etapa 4 */}
                        <div className="p-5 bg-[#d2af5a]/5 border border-[#d2af5a]/30 rounded-2xl transition-all group relative">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#d2af5a]/20 border border-[#d2af5a]/50 text-[#d2af5a] flex items-center justify-center font-bold font-mono text-[14px] flex-shrink-0">4</div>
                            <h5 className="text-[12px] font-bold text-white leading-tight">Relatório Executivo de Consultoria</h5>
                          </div>
                          <p className="text-[10px] text-white/50 mb-4 leading-relaxed font-sans min-h-[45px]">Etapa 4 do Modelo: Fechamento com os 8 tópicos requeridos, cruzamento de teoria/prática e propostas de intervenção.</p>
                          <button onClick={() => setAuditoriaStep(4)} className="w-full py-2 bg-gradient-to-r from-[#cbd5e1]/20 to-[#cbd5e1]/10 hover:from-[#cbd5e1]/30 hover:to-[#cbd5e1]/20 border border-[#d2af5a]/40 rounded-lg text-[9px] font-mono text-[#d2af5a] transition-all font-bold tracking-widest shadow-[0_0_15px_rgba(210,175,90,0.15)] flex items-center justify-center gap-2">
                            ACESSAR ETAPA 4
                          </button>
                        </div>
                      </div>
                    )}

                    {auditoriaStep !== null && (
                      <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[550px] relative z-10">
                        {/* Lado Esquerdo: Terminal Conversacional IA */}
                        <div className="col-span-1 lg:col-span-5 bg-[#050505]/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                          <div className="p-4 border-b border-white/5 bg-gradient-to-r from-[#cbd5e1]/10 to-transparent flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative flex items-center justify-center w-6 h-6">
                                <div className="absolute w-full h-full bg-[#d2af5a] rounded-full opacity-20 animate-ping" />
                                <div className="w-2 h-2 rounded-full bg-[#d2af5a]" />
                              </div>
                              <span className="text-[11px] font-bold font-mono text-[#d2af5a] uppercase tracking-widest">Mentor IA · Ativo</span>
                            </div>
                            <span className="text-[9px] text-white/30 font-mono border border-white/10 px-2 py-1 rounded bg-black/50">ETAPA {auditoriaStep}/4</span>
                          </div>
                          
                          <div className="flex-1 p-5 overflow-y-auto space-y-5 custom-scrollbar">
                            {consultingChat.map((msg, i) => (
                              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[90%] p-3.5 rounded-2xl text-[11px] font-sans leading-relaxed shadow-lg ${msg.role === 'user' ? 'bg-[#d2af5a]/15 border border-[#d2af5a]/30 text-white rounded-tr-sm' : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-sm backdrop-blur-sm'}`}>
                                  {msg.role === 'ai' && <div className="flex items-center gap-1.5 mb-2"><Bot size={12} className="text-[#d2af5a]" /><span className="text-[9px] font-mono text-[#d2af5a] font-bold">SYS_CONSULTOR</span></div>}
                                  {msg.text}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="p-3 border-t border-white/5 bg-black/60 backdrop-blur-md">
                            <div className="relative">
                              {isRecordingAudio ? (
                                <div className="w-full bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded-xl py-3 pl-4 pr-12 flex items-center justify-between">
                                  <div className="flex gap-1 items-end h-4">
                                    {[1, 2, 3, 4, 5, 6].map(bar => (
                                      <div key={bar} className="w-1.5 bg-[#d2af5a] rounded-t-sm animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDuration: `${0.3 + Math.random() * 0.5}s` }} />
                                    ))}
                                    <span className="text-[10px] text-[#d2af5a] font-mono ml-2 animate-pulse">Gravando...</span>
                                  </div>
                                  <button onClick={() => handleConsultingChatSubmit(undefined, "Áudio transcrito automaticamente: A empresa foca em inovação mas peca na estruturação financeira.")} className="text-[#d2af5a] bg-[#d2af5a]/20 hover:bg-[#d2af5a] hover:text-black w-8 h-8 rounded-lg flex items-center justify-center transition-all shadow-[0_0_15px_rgba(210,175,90,0.4)]">
                                    <SquareSquare size={12} className="text-[#d2af5a]" />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <input 
                                    type="text"
                                    value={consultingInput}
                                    onChange={e => setConsultingInput(e.target.value)}
                                    onKeyDown={handleConsultingChatSubmit}
                                    placeholder="Digite sua resposta ou grave um áudio..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-[11px] text-white outline-none focus:border-[#d2af5a]/50 transition-all font-sans"
                                  />
                                  <button 
                                    onClick={() => consultingInput.trim() ? handleConsultingChatSubmit() : setIsRecordingAudio(true)} 
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${consultingInput.trim() ? 'text-black bg-[#d2af5a] hover:bg-white shadow-[0_0_10px_rgba(210,175,90,0.3)]' : 'text-[#d2af5a] bg-transparent hover:bg-white/10'} w-8 h-8 rounded-lg flex items-center justify-center transition-all`}
                                  >
                                    {consultingInput.trim() ? <SendHorizontal size={14} /> : <Mic size={14} />}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Lado Direito: Painel de Extração de Dados em Tempo Real */}
                        <div className="col-span-1 lg:col-span-7 bg-[#080808] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col gap-4 shadow-inner">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cbd5e1]/30 to-transparent opacity-50" />
                          
                          {auditoriaStep === 1 && (
                            <div className="animate-fade-in space-y-6 h-full flex flex-col">
                              <div className="border-b border-white/5 pb-4 flex justify-between items-center">
                                <div>
                                  <h3 className="text-[14px] font-bold text-white font-mono uppercase">Setup & Core</h3>
                                  <p className="text-[10px] text-white/40 mt-1">Dados estruturados extraídos automaticamente da conversa.</p>
                                </div>
                                {isAnalyzingData && (
                                  <div className="text-[10px] font-mono text-[#d2af5a] animate-pulse">
                                    [|||||||||] Mapeando entidades...
                                  </div>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-4 flex-1">
                                <div className={`bg-black/50 border ${isAnalyzingData ? 'border-[#d2af5a]/50 shadow-[0_0_15px_rgba(210,175,90,0.1)]' : 'border-white/5'} rounded-xl p-4 flex flex-col transition-all duration-500`}>
                                  <span className="text-[9px] font-bold text-[#d2af5a] font-mono tracking-widest mb-3 uppercase">Forças Mapeadas</span>
                                  <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-lg bg-white/[0.02] relative overflow-hidden">
                                    {isAnalyzingData ? (
                                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay animate-pulse"></div>
                                    ) : null}
                                    {consultingChat.length > 2 && !isAnalyzingData ? (
                                      <ul className="text-[10px] text-white/70 space-y-2 p-4 w-full list-disc pl-4">
                                        <li>Qualidade técnica do time</li>
                                        <li>Atendimento personalizado</li>
                                      </ul>
                                    ) : (
                                      <span className="text-[9px] text-white/20 font-mono text-center px-4">Aguardando IA extrair dados...</span>
                                    )}
                                  </div>
                                </div>
                                <div className={`bg-black/50 border ${isAnalyzingData ? 'border-[#d2af5a]/50 shadow-[0_0_15px_rgba(210,175,90,0.1)]' : 'border-white/5'} rounded-xl p-4 flex flex-col transition-all duration-500`}>
                                  <span className="text-[9px] font-bold text-red-400 font-mono tracking-widest mb-3 uppercase">Fraquezas (Gaps)</span>
                                  <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-lg bg-white/[0.02] relative overflow-hidden">
                                    {isAnalyzingData ? (
                                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay animate-pulse"></div>
                                    ) : null}
                                    {consultingChat.length > 2 && !isAnalyzingData ? (
                                      <ul className="text-[10px] text-white/70 space-y-2 p-4 w-full list-disc pl-4">
                                        <li>Falta de processos padronizados</li>
                                      </ul>
                                    ) : (
                                      <span className="text-[9px] text-white/20 font-mono text-center px-4">Aguardando IA extrair dados...</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {auditoriaStep === 2 && (
                            <div className="animate-fade-in space-y-4 h-full flex flex-col">
                              {/* Header & Sub-Tabs */}
                              <div className="border-b border-white/5 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                <div>
                                  <h3 className="text-[13px] font-bold text-white font-mono uppercase tracking-wider">Etapa 2: Ecossistema & Stakeholders</h3>
                                  <p className="text-[9px] text-white/40 mt-0.5">Mapeamento estruturado de macro, microambiente e matriz de poder.</p>
                                </div>
                                <div className="flex bg-black/40 border border-white/10 rounded-lg p-0.5 relative z-20">
                                  {[
                                    { id: 'macro', label: 'Macro' },
                                    { id: 'micro', label: 'Micro' },
                                    { id: 'stakeholders', label: 'Stakeholders' },
                                    { id: 'reflexao', label: 'Reflexão' }
                                  ].map(tab => (
                                    <button
                                      key={tab.id}
                                      onClick={() => setEtapa2Tab(tab.id as any)}
                                      className={`px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider rounded-md uppercase transition-all ${etapa2Tab === tab.id ? 'bg-[#d2af5a]/20 text-[#d2af5a] border border-[#d2af5a]/30' : 'text-white/40 hover:text-white/80 border border-transparent'}`}
                                    >
                                      {tab.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Content area based on sub-tab */}
                              <div className="flex-1 min-h-[380px] overflow-y-auto custom-scrollbar relative z-10 pr-1">
                                {etapa2Tab === 'macro' && (
                                  <div className="animate-fade-in space-y-3">
                                    <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-3 mb-2">
                                      <h4 className="text-[10px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Análise do Macroambiente (PESTEL)</h4>
                                      <p className="text-[9px] text-white/60 leading-relaxed">
                                        Como os fatores externos de grande alcance influenciam a operação e a demanda pelos serviços da <strong>Nossa Consultoria BI / Auditoria 6D</strong>.
                                      </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {[
                                        {
                                          title: 'Político',
                                          color: 'text-[#d2af5a] border-[#d2af5a]/20 bg-[#d2af5a]/5',
                                          desc: 'Incentivos e políticas governamentais de fomento à inovação de dados e inteligência artificial atuam como catalisador direto, motivando empresas a investirem em BI.'
                                        },
                                        {
                                          title: 'Econômico',
                                          color: 'text-white/90 border-white/10 bg-[#d2af5a]/5',
                                          desc: 'Em crises, empresas nos buscam para corte de gastos e mapeamento de ineficiências. Em expansão, buscam inteligência competitiva e otimização de mercado.'
                                        },
                                        {
                                          title: 'Sociedade & Cultura',
                                          color: 'text-[#d2af5a] border-white/10 bg-blue-500/5',
                                          desc: 'A forte pressão social por decisões justas, transparentes e orientadas a dados (Data-Driven) impulsiona o uso de telemetria científica no desenvolvimento humano.'
                                        },
                                        {
                                          title: 'Legislação & Regulações',
                                          color: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
                                          desc: 'A vigência da LGPD exige infraestruturas de dados extremamente governadas, transformando conformidade técnica rigorosa em um forte argumento de credibilidade comercial.'
                                        }
                                      ].map((f, idx) => (
                                        <div key={idx} className={`p-3 border rounded-xl hover:border-white/20 transition-all ${f.color}`}>
                                          <span className="text-[9px] font-mono uppercase tracking-widest font-bold block mb-1.5">{idx + 1}. {f.title}</span>
                                          <p className="text-[10px] text-white/70 leading-relaxed font-sans">{f.desc}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {etapa2Tab === 'micro' && (
                                  <div className="animate-fade-in space-y-3">
                                    <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-3 mb-2">
                                      <h4 className="text-[10px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Análise do Microambiente (5 Forças de Porter)</h4>
                                      <p className="text-[9px] text-white/60 leading-relaxed">
                                        Mapeamento das forças competitivas e relações de mercado que moldam a atratividade da <strong>Nossa Consultoria BI / Auditoria 6D</strong>.
                                      </p>
                                    </div>
                                    <div className="space-y-2.5">
                                      {[
                                        {
                                          title: 'Concorrentes Diretos',
                                          badge: 'Diferencial Único',
                                          badgeColor: 'bg-[#d2af5a]/20 text-[#d2af5a] border-[#d2af5a]/30',
                                          desc: 'Empresas de consultoria tradicionais e desenvolvedores freelancers. Nosso diferencial estratégico inimitável é a união da engenharia técnica de BI com telemetria socioemocional e o Índice 6D Imersivo (SIG Pessoas), superando dashboards estáticos comuns.'
                                        },
                                        {
                                          title: 'Fornecedores Críticos',
                                          badge: 'Baixa Dependência',
                                          badgeColor: 'bg-blue-500/20 text-[#d2af5a] border-blue-500/30',
                                          desc: 'Provedores globais de nuvem e visualizadores (Microsoft Power BI, AWS, Snowflake). O poder de barganha de preços deles é alto pelas licenças, mas a portabilidade e interoperabilidade de dados moderna reduz o risco de lock-in absoluto.'
                                        },
                                        {
                                          title: 'Clientes-Alvo',
                                          badge: 'Foco em Alta Qualidade',
                                          badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                                          desc: 'Empresas de médio e grande porte. Nosso cliente ideal não busca preço extremamente baixo; ele exige qualidade metodológica impecável, integridade de governança e retorno financeiro tangível e comprovado sobre o projeto.'
                                        },
                                        {
                                          title: 'Produtos Substitutos',
                                          badge: 'Risco Operacional',
                                          badgeColor: 'bg-[#d2af5a]/20 text-[#d2af5a] border-[#d2af5a]/30',
                                          desc: 'Profissionais internos de BI (departamentos internos) ou planilhas tradicionais (Excel) administradas informalmente. A barreira para migrar é o alto salário de engenheiros internos e a ineficiência de planilhas.'
                                        }
                                      ].map((m, idx) => (
                                        <div key={idx} className="p-3 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition-all">
                                          <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">{m.title}</span>
                                            <span className={`text-[8px] font-mono font-bold px-2 py-0.5 border rounded-full uppercase ${m.badgeColor}`}>{m.badge}</span>
                                          </div>
                                          <p className="text-[9.5px] text-white/60 leading-relaxed font-sans">{m.desc}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {etapa2Tab === 'stakeholders' && (
                                  <div className="animate-fade-in space-y-3">
                                    <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-3 mb-2 flex justify-between items-center gap-4">
                                      <div>
                                        <h4 className="text-[10px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Matriz Poder vs Interesse</h4>
                                        <p className="text-[9px] text-white/60 leading-relaxed">
                                          Mapeamento dos stakeholders chaves da organização. Clique nos pontos para abrir o dossiê de gestão.
                                        </p>
                                      </div>
                                      {selectedStakeholder && (
                                        <button 
                                          onClick={() => setSelectedStakeholder(null)}
                                          className="text-[9px] font-mono text-[#d2af5a] underline hover:text-white"
                                        >
                                          [Limpar Filtro]
                                        </button>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                                      {/* Interactive Visual Map */}
                                      <div className="lg:col-span-7 bg-black/60 border border-white/5 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden h-[240px]">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.01] to-transparent pointer-events-none" />
                                        
                                        {/* Quadrants background labels */}
                                        <div className="absolute top-2 left-2 text-[8px] font-mono text-white/10 uppercase font-bold">MANTER SATISFEITO (Poder+/Interesse-)</div>
                                        <div className="absolute top-2 right-2 text-[8px] font-mono text-[#d2af5a]/20 uppercase font-bold">GERENCIAR DE PERTO (Poder+/Interesse+)</div>
                                        <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/10 uppercase font-bold">MONITORAR (Poder-/Interesse-)</div>
                                        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-[#d2af5a]/20 uppercase font-bold">MANTER INFORMADO (Poder-/Interesse+)</div>

                                        {/* Axes */}
                                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/5 -translate-x-1/2 pointer-events-none" />
                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 pointer-events-none" />

                                        {/* Interactive Nodes */}
                                        {[
                                          { id: 'board', name: 'Sócios & C-Level', x: '82%', y: '25%', q: 'Gerenciar de Perto', power: 'Muito Alto (Aprova verbas e cultura)', interest: 'Extremo (Retorno financeiro)', desc: 'Exerce poder por meio de governança corporativa direta e limites orçamentários.' },
                                          { id: 'clientes', name: 'Clientes Críticos', x: '78%', y: '38%', q: 'Gerenciar de Perto', power: 'Alto (Condiciona a renovação)', interest: 'Alto (Busca retorno de BI)', desc: 'Exerce poder cobrando métricas rígidas de eficiência operacional.' },
                                          { id: 'anpd', name: 'Órgãos Reguladores (ANPD)', x: '22%', y: '18%', q: 'Manter Satisfeito', power: 'Alto (Poder de multas e sanções)', interest: 'Baixo (Foco apenas em conformidade)', desc: 'Exerce influência fiscalizando a aderência técnica à LGPD.' },
                                          { id: 'provedores', name: 'Provedores Cloud (MS/AWS)', x: '28%', y: '40%', q: 'Manter Satisfeito', power: 'Médio-Alto (Disponibilidade técnica)', interest: 'Baixo (Foco em volumetria)', desc: 'Exercem influência por meio de preços e uptime de APIs.' },
                                          { id: 'gestores', name: 'Gestores de Área', x: '72%', y: '68%', q: 'Manter Informado', power: 'Médio-Baixo (Decisão tática)', interest: 'Alto (Precisam de dados diários)', desc: 'Exercem influência na aderência operacional das ferramentas.' },
                                          { id: 'devs', name: 'Desenvolvedores de BI', x: '68%', y: '82%', q: 'Manter Informado', power: 'Baixo (Operação)', interest: 'Muito Alto (Estabilidade e carreira)', desc: 'Exercem influência direta na qualidade técnica e agilidade de entrega.' },
                                          { id: 'familias', name: 'Famílias dos Colaboradores', x: '92%', y: '78%', q: 'Manter Informado', power: 'Baixo', interest: 'Alto (Estabilidade e renda)', desc: 'Impactadas pelo sucesso do negócio em termos de emprego e bem-estar.' },
                                          { id: 'terceirizados', name: 'Terceirizados Apoio', x: '15%', y: '88%', q: 'Monitorar', power: 'Muito Baixo', interest: 'Baixo', desc: 'Monitorados quanto a entregas pontuais e conformidade básica.' }
                                        ].map(s => (
                                          <button
                                            key={s.id}
                                            onClick={() => setSelectedStakeholder(s.id)}
                                            style={{ left: s.x, top: s.y }}
                                            className={`absolute -translate-x-1/2 -translate-y-1/2 group/node transition-all z-20`}
                                          >
                                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 ${selectedStakeholder === s.id ? 'bg-[#d2af5a] scale-150 border-white shadow-[0_0_12px_#cbd5e1]' : 'bg-black border-white/40 group-hover/node:bg-white group-hover/node:scale-125'}`} />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 border border-white/10 rounded px-1.5 py-0.5 text-[7px] font-mono text-white/95 opacity-0 group-hover/node:opacity-100 transition whitespace-nowrap pointer-events-none z-30">{s.name}</span>
                                          </button>
                                        ))}

                                        {/* Axes markers */}
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[7px] font-mono text-white/30 uppercase tracking-widest pointer-events-none">Interesse +</div>
                                        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[7px] font-mono text-white/30 uppercase tracking-widest pointer-events-none">Interesse -</div>
                                        <div className="absolute left-1/2 top-2 -translate-x-1/2 text-[7px] font-mono text-white/30 uppercase tracking-widest pointer-events-none">Poder +</div>
                                        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 text-[7px] font-mono text-white/30 uppercase tracking-widest pointer-events-none">Poder -</div>
                                      </div>

                                      {/* Details Column */}
                                      <div className="lg:col-span-5 flex flex-col justify-between">
                                        <div className="bg-[#050505] border border-white/5 rounded-xl p-3.5 min-h-[240px] flex flex-col justify-between">
                                          {selectedStakeholder ? (() => {
                                            const infoMap: Record<string, { name: string, q: string, power: string, interest: string, desc: string }> = {
                                              board: { name: 'Sócios & C-Level', q: 'Gerenciar de Perto', power: 'Muito Alto (Aprova verbas e cultura)', interest: 'Extremo (Retorno financeiro)', desc: 'Eles ditam os recursos destinados ao BI e a governança ética. Devem estar em sintonia constante com os painéis executivos.' },
                                              clientes: { name: 'Clientes Críticos', q: 'Gerenciar de Perto', power: 'Alto (Condiciona a renovação)', interest: 'Alto (Busca retorno de BI)', desc: 'São os tomadores de decisão corporativos que compram nossa auditoria. Suas avaliações em tempo real ditam a renovação de contratos.' },
                                              anpd: { name: 'Órgãos Reguladores (ANPD)', q: 'Manter Satisfeito', power: 'Alto (Multas e sanções)', interest: 'Baixo (Foco em conformidade)', desc: 'Seu foco principal é garantir conformidade com as leis de privacidade. Exigem auditoria de acesso e logs rígidos de dados de saúde e pessoas.' },
                                              provedores: { name: 'Provedores Cloud (MS/AWS)', q: 'Manter Satisfeito', power: 'Médio-Alto (Disponibilidade)', interest: 'Baixo (Foco em volumetria)', desc: 'Fornecem a infraestrutura (servidores, ferramentas de BI). Gerenciados através de contratos de nível de serviço (SLA).' },
                                              gestores: { name: 'Gestores de Área', q: 'Manter Informado', power: 'Médio-Baixo', interest: 'Alto (Precisam de dados diários)', desc: 'Utilizam as ferramentas para liderar e calibrar tarefas do time. Se beneficiam com diagnósticos automatizados do SIG Pessoas.' },
                                              devs: { name: 'Desenvolvedores de BI', q: 'Manter Informado', power: 'Baixo (Operação)', interest: 'Muito Alto (Estabilidade e carreira)', desc: 'Constroem as soluções técnicas. Devem ser engajados por meio de cultura transparente, segurança psicológica e clareza de atribuições.' },
                                              familias: { name: 'Famílias dos Colaboradores', q: 'Manter Informado', power: 'Baixo', interest: 'Alto (Estabilidade)', desc: 'Dependem indiretamente do sucesso financeiro e da saúde psicológica proporcionados pelo ambiente corporativo saudável.' },
                                              terceirizados: { name: 'Terceirizados Apoio', q: 'Monitorar', power: 'Muito Baixo', interest: 'Baixo', desc: 'Prestadores de serviços periféricos. Monitorados para conformidade contratual básica de fornecimento de serviços.' }
                                            };
                                            const item = infoMap[selectedStakeholder];
                                            return (
                                              <div className="space-y-3 animate-fade-in flex flex-col justify-between h-full">
                                                <div>
                                                  <div className="flex justify-between items-center">
                                                    <span className="text-[11px] font-bold text-white font-mono uppercase tracking-wider">{item.name}</span>
                                                    <span className="text-[7.5px] font-mono bg-[#d2af5a]/10 border border-[#d2af5a]/20 text-[#d2af5a] px-2 py-0.5 rounded-full font-bold uppercase">{item.q}</span>
                                                  </div>
                                                  <div className="space-y-1.5 mt-2.5">
                                                    <div className="text-[9px] text-white/50"><span className="font-mono text-white/80 font-bold">Nível de Poder:</span> {item.power}</div>
                                                    <div className="text-[9px] text-white/50"><span className="font-mono text-white/80 font-bold">Interesse:</span> {item.interest}</div>
                                                    <div className="text-[9.5px] text-white/70 leading-relaxed font-sans border-t border-white/5 pt-2 mt-2">{item.desc}</div>
                                                  </div>
                                                </div>
                                                <div className="text-[8.5px] font-mono text-[#d2af5a] bg-[#d2af5a]/5 p-2 rounded-lg border border-[#d2af5a]/20 mt-3">
                                                  💡 <strong>Diretriz de Gestão:</strong> {item.q === 'Gerenciar de Perto' ? 'Envolver ativamente nos rituais estratégicos e relatórios.' : item.q === 'Manter Satisfeito' ? 'Garantir conformidade técnica e operacional estrita.' : item.q === 'Manter Informado' ? 'Disponibilizar relatórios assíncronos e updates frequentes.' : 'Monitorar métricas de entrega sem reuniões físicas excessivas.'}
                                                </div>
                                              </div>
                                            );
                                          })() : (
                                            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                                              <Users size={24} className="text-white/20 mb-2" strokeWidth={1.5} />
                                              <span className="text-[9.5px] text-white/30 font-mono">Nenhum stakeholder selecionado. Clique em algum ponto do gráfico ao lado para analisar a matriz Poder vs Interesse.</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {etapa2Tab === 'reflexao' && (
                                  <div className="animate-fade-in space-y-3">
                                    <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-3 mb-2">
                                      <h4 className="text-[10px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Reflexão sobre Governança e Tomada de Decisão</h4>
                                      <p className="text-[9px] text-white/60 leading-relaxed">
                                        Como equilibrar os fatores do macro/microambiente e as demandas dos stakeholders na rotina de liderança.
                                      </p>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                                        <span className="text-[9px] font-mono text-[#d2af5a] uppercase font-bold tracking-widest block mb-1">Desafio do Gestor Moderno</span>
                                        <p className="text-[10px] text-white/80 leading-relaxed font-sans">
                                          Equilibrar forças macro instáveis (inflação, LGPD) com microcompetidores velozes exige dos gestores uma <strong>capacidade assíncrona de alta frequência</strong>. O erro clássico é reagir emocionalmente pelo Sistema 1 (reativo) sob estresse, em vez de recorrer ao Sistema 2 (analítico) suportado por dados objetivos.
                                        </p>
                                      </div>
                                      <div className="p-3 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl">
                                        <span className="text-[9px] font-mono text-[#d2af5a] uppercase font-bold tracking-widest block mb-1">O Papel de Telemetria Comportamental</span>
                                        <p className="text-[10px] text-white/80 leading-relaxed font-sans">
                                          Nesta organização, os líderes gerenciam esses ambientes utilizando painéis unificados como o <strong>SIG Pessoas e o Índice 6D</strong>. Ao traduzir atitudes subjetivas em telemetria limpa de cultura, o gestor atende o board (provando ROI) ao mesmo tempo que assegura segurança psicológica e clareza para os liderados.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {auditoriaStep === 3 && (
                            <div className="animate-fade-in space-y-4 h-full flex flex-col">
                              {/* Header & Sub-Tabs */}
                              <div className="border-b border-white/5 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                <div>
                                  <h3 className="text-[13px] font-bold text-white font-mono uppercase tracking-wider">Etapa 3: Estrutura & Controle</h3>
                                  <p className="text-[9px] text-white/40 mt-0.5">Mapeamento do organograma, sistemas de controle e estilo de governança.</p>
                                </div>
                                <div className="flex bg-black/40 border border-white/10 rounded-lg p-0.5 relative z-20">
                                  {[
                                    { id: 'organograma', label: 'Organograma' },
                                    { id: 'estilo', label: 'Estilo' },
                                    { id: 'controles', label: 'Controles' },
                                    { id: 'reflexao', label: 'Reflexões' }
                                  ].map(tab => (
                                    <button
                                      key={tab.id}
                                      onClick={() => setEtapa3Tab(tab.id as any)}
                                      className={`px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider rounded-md uppercase transition-all ${etapa3Tab === tab.id ? 'bg-[#d2af5a]/20 text-[#d2af5a] border border-[#d2af5a]/30' : 'text-white/40 hover:text-white/80 border border-transparent'}`}
                                    >
                                      {tab.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Content Area */}
                              <div className="flex-1 min-h-[380px] overflow-y-auto custom-scrollbar relative z-10 pr-1">
                                {etapa3Tab === 'organograma' && (
                                  <div className="animate-fade-in space-y-3">
                                    <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-3 mb-2 flex justify-between items-center gap-4">
                                      <div>
                                        <h4 className="text-[10px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Estrutura e Organograma da Consultoria</h4>
                                        <p className="text-[9px] text-white/60 leading-relaxed">
                                          Organização formal da <strong>Nossa Consultoria BI / Auditoria 6D</strong>. Clique nos nós do organograma abaixo para ver o dossiê detalhado do cargo.
                                        </p>
                                      </div>
                                      {selectedOrgNode && (
                                        <button 
                                          onClick={() => setSelectedOrgNode(null)}
                                          className="text-[9px] font-mono text-[#d2af5a] underline hover:text-white"
                                        >
                                          [Limpar Seleção]
                                        </button>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                                      {/* Interactive SVG tree */}
                                      <div className="lg:col-span-7 bg-black/60 border border-white/5 rounded-xl p-3 flex items-center justify-center h-[260px] relative overflow-hidden">
                                        <svg className="w-full h-full" viewBox="0 0 360 250">
                                          {/* Connector Lines */}
                                          {/* CEO to Directors */}
                                          <line x1="180" y1="40" x2="180" y2="60" stroke="#d2af5a" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                                          <line x1="100" y1="60" x2="260" y2="60" stroke="#d2af5a" strokeWidth="1" opacity="0.4" />
                                          <line x1="100" y1="60" x2="100" y2="85" stroke="#d2af5a" strokeWidth="1" opacity="0.4" />
                                          <line x1="260" y1="60" x2="260" y2="85" stroke="#d2af5a" strokeWidth="1" opacity="0.4" />

                                          {/* Technical director to PM */}
                                          <line x1="100" y1="115" x2="100" y2="155" stroke="#d2af5a" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                                          {/* Ops director to HR */}
                                          <line x1="260" y1="115" x2="260" y2="155" stroke="#d2af5a" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />

                                          {/* PM to Devs */}
                                          <line x1="100" y1="185" x2="100" y2="215" stroke="#d2af5a" strokeWidth="1" opacity="0.4" />
                                          {/* HR to Analysts */}
                                          <line x1="260" y1="185" x2="260" y2="215" stroke="#d2af5a" strokeWidth="1" opacity="0.4" />

                                          {/* Interactive Node Buttons as SVG elements */}
                                          {/* CEO */}
                                          <g className="cursor-pointer group/node" onClick={() => setSelectedOrgNode('ceo')}>
                                            <rect x="130" y="15" width="100" height="25" rx="6" fill={selectedOrgNode === 'ceo' ? '#cbd5e1' : '#050505'} stroke={selectedOrgNode === 'ceo' ? '#fff' : '#cbd5e1'} strokeWidth="1" className="transition-all duration-300" />
                                            <text x="180" y="31" fill={selectedOrgNode === 'ceo' ? '#000' : '#fff'} fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Sócio-Presidente</text>
                                          </g>

                                          {/* CTO */}
                                          <g className="cursor-pointer group/node" onClick={() => setSelectedOrgNode('cto')}>
                                            <rect x="50" y="85" width="100" height="30" rx="6" fill={selectedOrgNode === 'cto' ? '#cbd5e1' : '#050505'} stroke={selectedOrgNode === 'cto' ? '#fff' : 'rgba(255,255,255,0.15)'} strokeWidth="1" className="transition-all duration-300" />
                                            <text x="100" y="99" fill={selectedOrgNode === 'cto' ? '#000' : '#fff'} fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Dir. Técnico</text>
                                            <text x="100" y="109" fill={selectedOrgNode === 'cto' ? '#000' : 'rgba(255,255,255,0.4)'} fontSize="6" fontFamily="sans-serif" textAnchor="middle">Engenharia / BI</text>
                                          </g>

                                          {/* COO */}
                                          <g className="cursor-pointer group/node" onClick={() => setSelectedOrgNode('coo')}>
                                            <rect x="210" y="85" width="100" height="30" rx="6" fill={selectedOrgNode === 'coo' ? '#cbd5e1' : '#050505'} stroke={selectedOrgNode === 'coo' ? '#fff' : 'rgba(255,255,255,0.15)'} strokeWidth="1" className="transition-all duration-300" />
                                            <text x="260" y="99" fill={selectedOrgNode === 'coo' ? '#000' : '#fff'} fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Dir. Operações</text>
                                            <text x="260" y="109" fill={selectedOrgNode === 'coo' ? '#000' : 'rgba(255,255,255,0.4)'} fontSize="6" fontFamily="sans-serif" textAnchor="middle">Adm. / Financeiro</text>
                                          </g>

                                          {/* PM */}
                                          <g className="cursor-pointer group/node" onClick={() => setSelectedOrgNode('pm')}>
                                            <rect x="50" y="155" width="100" height="30" rx="6" fill={selectedOrgNode === 'pm' ? '#cbd5e1' : '#050505'} stroke={selectedOrgNode === 'pm' ? '#fff' : 'rgba(255,255,255,0.15)'} strokeWidth="1" className="transition-all duration-300" />
                                            <text x="100" y="169" fill={selectedOrgNode === 'pm' ? '#000' : '#fff'} fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Coord. Projetos</text>
                                            <text x="100" y="179" fill={selectedOrgNode === 'pm' ? '#000' : 'rgba(255,255,255,0.4)'} fontSize="6" fontFamily="sans-serif" textAnchor="middle">Sprints / Entregas</text>
                                          </g>

                                          {/* HR */}
                                          <g className="cursor-pointer group/node" onClick={() => setSelectedOrgNode('hr')}>
                                            <rect x="210" y="155" width="100" height="30" rx="6" fill={selectedOrgNode === 'hr' ? '#cbd5e1' : '#050505'} stroke={selectedOrgNode === 'hr' ? '#fff' : 'rgba(255,255,255,0.15)'} strokeWidth="1" className="transition-all duration-300" />
                                            <text x="260" y="169" fill={selectedOrgNode === 'hr' ? '#000' : '#fff'} fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Coord. Pessoas</text>
                                            <text x="260" y="179" fill={selectedOrgNode === 'hr' ? '#000' : 'rgba(255,255,255,0.4)'} fontSize="6" fontFamily="sans-serif" textAnchor="middle">Cultura / Rituais</text>
                                          </g>

                                          {/* Devs */}
                                          <g className="cursor-pointer group/node" onClick={() => setSelectedOrgNode('devs')}>
                                            <rect x="50" y="215" width="100" height="20" rx="4" fill={selectedOrgNode === 'devs' ? '#cbd5e1' : '#050505'} stroke={selectedOrgNode === 'devs' ? '#fff' : 'rgba(255,255,255,0.08)'} strokeWidth="1" className="transition-all duration-300" />
                                            <text x="100" y="227" fill={selectedOrgNode === 'devs' ? '#000' : 'rgba(255,255,255,0.7)'} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Desenvolvedores BI</text>
                                          </g>

                                          {/* Analysts */}
                                          <g className="cursor-pointer group/node" onClick={() => setSelectedOrgNode('analysts')}>
                                            <rect x="210" y="215" width="100" height="20" rx="4" fill={selectedOrgNode === 'analysts' ? '#cbd5e1' : '#050505'} stroke={selectedOrgNode === 'analysts' ? '#fff' : 'rgba(255,255,255,0.08)'} strokeWidth="1" className="transition-all duration-300" />
                                            <text x="260" y="227" fill={selectedOrgNode === 'analysts' ? '#000' : 'rgba(255,255,255,0.7)'} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Analistas de Dados</text>
                                          </g>
                                        </svg>
                                      </div>

                                      {/* Side detail card */}
                                      <div className="lg:col-span-5">
                                        <div className="bg-[#050505] border border-white/5 rounded-xl p-3.5 min-h-[260px] flex flex-col justify-between">
                                          {selectedOrgNode ? (() => {
                                            const nodeMap: Record<string, { role: string, parent: string, autonomy: string, style: string, desc: string, duties: string }> = {
                                              ceo: { role: 'Sócio-Presidente / Fundador', parent: 'Conselho Executivo (C-Level)', autonomy: 'M4 (Autonomia Absoluta)', style: 'Estratégico / Decisão Racional', desc: 'Sócio principal responsável pelas diretrizes executivas, atração de clientes corporativos de alto valor e governança da marca.', duties: 'Definição de visão, OKRs anuais, calibração orçamentária estratégica e rituais do conselho.' },
                                              cto: { role: 'Diretor Técnico (CTO)', parent: 'Sócio-Presidente', autonomy: 'M4 (Auton. Executiva)', style: 'Tático / Decisão Técnica', desc: 'Responsável pela integridade e arquitetura técnica da infraestrutura de Business Intelligence, banco de dados e APIs.', duties: 'Modelagem de dados Snowflake/AWS, definição de padrões de software e assegurar a segurança técnica exigida pela LGPD.' },
                                              coo: { role: 'Diretora de Operações', parent: 'Sócio-Presidente', autonomy: 'M4 (Auton. Executiva)', style: 'Tático / Decisão Administrativa', desc: 'Gerencia as rotinas operacionais de contratos, cobranças e faturamento, assegurando conformidade de processos.', duties: 'Calibração financeira, contratos comerciais de prestação de serviços de BI e gestão de passivos trabalhistas/fiscais.' },
                                              pm: { role: 'Coordenador de BI (Product Owner)', parent: 'Diretor Técnico', autonomy: 'M3 (Calibrado / Monitorado)', style: 'Operacional / Decisão Racionalizada', desc: 'Gerencia o fluxo de sprints técnicos e garante que os prazos acordados em SLAs com os clientes sejam cumpridos.', duties: 'Definição de histórias, acompanhamento diário com programadores e aprovação final de dashboards em Power BI.' },
                                              hr: { role: 'Coordenadora de Pessoas & Cultura', parent: 'Diretora de Operações', autonomy: 'M3 (Calibrado / Monitorado)', style: 'Socioemocional / Rituais de Aliança', desc: 'Lidera a cultura da empresa, rituais socioemocionais de feedback, PDIs individuais e monitora o clima organizacional periódicamente.', duties: 'Feedbacks estruturados (SBI), planos de sucessão, canal de ruído (comunicação), contratações e mediações de conflitos.' },
                                              devs: { role: 'Desenvolvedores de BI', parent: 'Coordenador de Projetos', autonomy: 'M2 a M3 (Autonomia Regulada)', style: 'Operacional / Técnico', desc: 'Analistas programadores encarregados de realizar conexões de APIs, ETL e front-end visual dos painéis de consultoria.', duties: 'Construção de querys SQL, formatação de views de dados, validação de fórmulas e design gráfico responsivo dos painéis.' },
                                              analysts: { role: 'Analistas de Dados', parent: 'Coordenador de Projetos', autonomy: 'M2 a M3 (Autonomia Regulada)', style: 'Operacional / Analítico', desc: 'Profissionais dedicados a cruzar os relatórios técnicos e traduzir métricas em conclusões financeiras para os clientes.', duties: 'Limpeza de dados, elaboração de relatórios descritivos, benchmark de CAC/LTV e detecção de anomalias.' }
                                            };
                                            const item = nodeMap[selectedOrgNode];
                                            return (
                                              <div className="space-y-3 animate-fade-in flex flex-col justify-between h-full">
                                                <div>
                                                  <div className="border-b border-white/5 pb-2">
                                                    <span className="text-[11px] font-bold text-white font-mono uppercase tracking-wider block leading-tight">{item.role}</span>
                                                    <span className="text-[7px] text-[#d2af5a] font-mono uppercase font-bold tracking-widest mt-1 block">Reporta a: {item.parent}</span>
                                                  </div>
                                                  <div className="space-y-1.5 mt-2 text-[9px] text-white/50">
                                                    <div><span className="font-mono text-white/80 font-bold">Autonomia:</span> {item.autonomy}</div>
                                                    <div><span className="font-mono text-white/80 font-bold">Estilo Decisório:</span> {item.style}</div>
                                                    <div className="text-[9.5px] text-white/70 leading-relaxed font-sans border-t border-white/5 pt-2 mt-2"><strong>Descrição:</strong> {item.desc}</div>
                                                    <div className="text-[9px] text-white/60 leading-relaxed font-sans mt-1"><strong>Responsabilidade:</strong> {item.duties}</div>
                                                  </div>
                                                </div>
                                                <div className="text-[8px] font-mono text-[#d2af5a] bg-[#d2af5a]/5 p-2 rounded-lg border border-[#d2af5a]/20 mt-2">
                                                  ⚡ <strong>Nível de Centralização:</strong> {selectedOrgNode === 'ceo' || selectedOrgNode === 'cto' || selectedOrgNode === 'coo' ? 'Alta (Concentra a decisão estrutural e verbas).' : 'Baixa (Grande autonomia técnica no dia a dia).'}
                                                </div>
                                              </div>
                                            );
                                          })() : (
                                            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                                              <Network size={24} className="text-white/20 mb-2" strokeWidth={1.5} />
                                              <span className="text-[9.5px] text-white/30 font-mono">Nenhum cargo selecionado. Clique em algum retângulo do organograma ao lado para conferir a autonomia e detalhes do cargo.</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {etapa3Tab === 'estilo' && (
                                  <div className="animate-fade-in space-y-4">
                                    <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-3">
                                      <h4 className="text-[10px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Simulador de Estrutura Organizacional</h4>
                                      <p className="text-[9px] text-white/60 leading-relaxed">
                                        Calibre o equilíbrio entre <strong>Estrutura Orgânica (Flexibilidade/Velocidade)</strong> e <strong>Mecanicista (Controle/Rigidez)</strong> e observe os impactos nos scores corporativos.
                                      </p>
                                    </div>

                                    <div className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-5">
                                      {/* Interactive Slider */}
                                      <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                                          <span className="text-[#d2af5a] uppercase">Mecanicista ({100 - organicRatio}%)</span>
                                          <span className="text-[#d2af5a] uppercase">Orgânica ({organicRatio}%)</span>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="10" 
                                          max="90" 
                                          value={organicRatio} 
                                          onChange={e => setOrganicRatio(parseInt(e.target.value, 10))}
                                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#cbd5e1]"
                                        />
                                        <div className="flex justify-between text-[7.5px] font-mono text-white/30">
                                          <span>PADRÃO RÍGIDO (TAYLOR/WEBER)</span>
                                          <span>HYBRID ÁGIL (RECOMENDADO)</span>
                                          <span>LIBERDADE CRÍTICA</span>
                                        </div>
                                      </div>

                                      {/* Preset Buttons */}
                                      <div className="grid grid-cols-3 gap-2.5">
                                        {[
                                          { ratio: 20, label: 'Centralizado (20%)', desc: 'Foco total em controle formal.' },
                                          { ratio: 65, label: 'Hybrid Ágil (65%)', desc: 'Nosso equilíbrio oficial.' },
                                          { ratio: 90, label: 'Squad Livre (90%)', desc: 'Alta velocidade / Sem regras.' }
                                        ].map(p => (
                                          <button
                                            key={p.ratio}
                                            onClick={() => {
                                              setOrganicRatio(p.ratio);
                                              triggerToast(`Estrutura calibrada para: ${p.label}`);
                                            }}
                                            className={`p-2 border rounded-lg text-left transition-all relative ${organicRatio === p.ratio ? 'bg-[#d2af5a]/10 border-[#d2af5a]/40 text-[#d2af5a]' : 'bg-black/30 border-white/5 text-white/50 hover:text-white/80'}`}
                                          >
                                            <span className="text-[9px] font-mono font-bold block">{p.label}</span>
                                            <span className="text-[7.5px] text-white/40 block mt-0.5 leading-tight">{p.desc}</span>
                                          </button>
                                        ))}
                                      </div>

                                      {/* Dynamic Scores */}
                                      <div className="border-t border-white/5 pt-4 space-y-3">
                                        <h5 className="text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest">Impacto nos Scores Operacionais</h5>
                                        
                                        {/* Score 1 */}
                                        <div className="space-y-1">
                                          <div className="flex justify-between text-[9px] font-mono">
                                            <span className="text-white/60">Velocidade de Inovação & Criatividade</span>
                                            <span className="text-[#d2af5a] font-bold">{Math.round(organicRatio * 0.95 + 5)}%</span>
                                          </div>
                                          <div className="h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-[#cbd5e1] transition-all duration-300" style={{ width: `${Math.round(organicRatio * 0.95 + 5)}%` }} />
                                          </div>
                                        </div>

                                        {/* Score 2 */}
                                        <div className="space-y-1">
                                          <div className="flex justify-between text-[9px] font-mono">
                                            <span className="text-white/60">Segurança & Conformidade (LGPD/Regulamentação)</span>
                                            <span className="text-[#d2af5a] font-bold">{Math.round((100 - organicRatio) * 0.9 + 10)}%</span>
                                          </div>
                                          <div className="h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-[#d2af5a] transition-all duration-300" style={{ width: `${Math.round((100 - organicRatio) * 0.9 + 10)}%` }} />
                                          </div>
                                        </div>

                                        {/* Score 3 */}
                                        <div className="space-y-1">
                                          <div className="flex justify-between text-[9px] font-mono">
                                            <span className="text-white/60">Engajamento & Autonomia do Time</span>
                                            <span className="text-purple-400 font-bold">{Math.round(organicRatio * 0.8 + 15)}%</span>
                                          </div>
                                          <div className="h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-400 transition-all duration-300" style={{ width: `${Math.round(organicRatio * 0.8 + 15)}%` }} />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {etapa3Tab === 'controles' && (
                                  <div className="animate-fade-in space-y-3">
                                    <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-3 mb-2">
                                      <h4 className="text-[10px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Mapeamento de Sistemas de Controle</h4>
                                      <p className="text-[9px] text-white/60 leading-relaxed">
                                        Como a consultoria assegura que os objetivos sejam alcançados através de rituais e controles formais e socioemocionais.
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                      {/* Racionais */}
                                      <div className="p-4 bg-black/40 border border-white/5 hover:border-white/10 rounded-xl space-y-3 transition-all duration-300">
                                        <span className="text-[9.5px] font-mono text-[#d2af5a] font-bold uppercase tracking-widest border-b border-white/5 pb-1.5 block">1. Controles Racionais & Formais (35%)</span>
                                        
                                        <div className="space-y-2 text-[9.5px]">
                                          <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                                            <strong className="text-white block font-mono">OKRs Trimestrais (Q2/2026):</strong>
                                            <span className="text-white/60 mt-0.5 block leading-normal">Definição explícita de objetivos de faturamento, novos painéis e metas de satisfação do cliente.</span>
                                          </div>
                                          <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                                            <strong className="text-white block font-mono">Contratos & SLAs de Clientes:</strong>
                                            <span className="text-white/60 mt-0.5 block leading-normal">Prazos explícitos e acordos formais de nível de serviço para a entrega de relatórios e BI.</span>
                                          </div>
                                          <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                                            <strong className="text-white block font-mono">Auditoria Contínua de Logs (LGPD):</strong>
                                            <span className="text-white/60 mt-0.5 block leading-normal">Monitoramento técnico automatizado de acesso às bases de dados corporativas sensíveis.</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Naturais */}
                                      <div className="p-4 bg-black/40 border border-white/5 hover:border-[#d2af5a]/20 rounded-xl space-y-3 transition-all duration-300">
                                        <span className="text-[9.5px] font-mono text-[#d2af5a] font-bold uppercase tracking-widest border-b border-white/5 pb-1.5 block">2. Controles Socioemocionais & Naturais (65%)</span>
                                        
                                        <div className="space-y-2 text-[9.5px]">
                                          <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                                            <strong className="text-white block font-mono">Ritual de Feedback SBI:</strong>
                                            <span className="text-white/60 mt-0.5 block leading-normal">Alinhamento frequente baseado em rituais do SIG Pessoas (Situação-Comportamento-Impacto) em vez de pressões de cobrança.</span>
                                          </div>
                                          <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                                            <strong className="text-white block font-mono">Contrato de Aliança Horizontal:</strong>
                                            <span className="text-white/60 mt-0.5 block leading-normal">Valores implícitos e regras de convivência do time acordados democraticamente na fundação da empresa.</span>
                                          </div>
                                          <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                                            <strong className="text-white block font-mono">Pulso Semanal de Clima (eNPS):</strong>
                                            <span className="text-white/60 mt-0.5 block leading-normal">Acompanhamento do nível socioemocional e gargalos antes que gerem insatisfações ou turnover na consultoria.</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {etapa3Tab === 'reflexao' && (
                                  <div className="animate-fade-in space-y-3">
                                    <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-3 mb-2">
                                      <h4 className="text-[10px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest mb-1">Diretrizes Práticas de Liderança</h4>
                                      <p className="text-[9px] text-white/60 leading-relaxed">
                                        Validação teórica e prática sobre os sistemas de estrutura e controle para subsidiar o relatório final da ATP.
                                      </p>
                                    </div>

                                    <div className="space-y-3">
                                      <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                                        <span className="text-[9px] font-mono text-[#d2af5a] uppercase font-bold tracking-widest block mb-1">Racionalidade vs Improviso Empírico</span>
                                        <p className="text-[10px] text-white/80 leading-relaxed font-sans">
                                          A estrutura da <strong>Nossa Consultoria BI</strong> não nasceu pronta de um papel; ela amadureceu organicamente por meio do acúmulo de conhecimento prático de gestão. Os gestores iniciaram com uma estrutura totalmente informal e a adaptaram rationamente à medida que exigências como a LGPD e o crescimento da carteira de clientes demandaram rituais formais.
                                        </p>
                                      </div>

                                      <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                                        <span className="text-[9px] font-mono text-purple-400 uppercase font-bold tracking-widest block mb-1">Se você fosse o Gestor dessa Consultoria:</span>
                                        <p className="text-[10px] text-white/80 leading-relaxed font-sans">
                                          Escolheria uma **estrutura de squads/matricial descentralizada híbrida (65% orgânica)** para maximizar a velocidade técnica. Em contrapartida, faria o controle de objetivos de maneira altamente tecnológica utilizando **OKRs integrados ao SIG Pessoas** para monitorar a performance do time de maneira transparente, eliminando microgerenciamento.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {auditoriaStep === 4 && (
                            <div className="animate-fade-in space-y-4 h-full flex flex-col">
                              {/* Header & Export button */}
                              <div className="border-b border-white/5 pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 relative z-20">
                                <div>
                                  <h3 className="text-[13px] font-bold text-white font-mono uppercase tracking-wider">Etapa 4: Relatório Executivo de Consultoria</h3>
                                  <p className="text-[9px] text-white/40 mt-0.5">Dossiê final integrado unindo teoria acadêmica e as práticas de campo.</p>
                                </div>
                                <button
                                  onClick={() => {
                                    triggerToast('✓ PDF do Relatório Acadêmico (ATP) compilado e baixado com sucesso!', 'ok');
                                    // Generate and download text file as a mock PDF
                                    const element = document.createElement("a");
                                    const fileContent = 
                                      `========================================================================\n` +
                                      `RELATÓRIO DE CONSULTORIA ORGANIZACIONAL - NOSSA CONSULTORIA BI\n` +
                                      `ATIVIDADE PRÁTICA SUPERVISIONADA (ATP) - ETAPA 4 - IPB / UNINTER\n` +
                                      `========================================================================\n\n` +
                                      `1. INTRODUÇÃO\n` +
                                      `Este relatório de consultoria consolida o diagnóstico organizacional realizado ao longo das últimas semanas na empresa fictícia Nossa Consultoria BI (Auditoria 6D), integrando conceitos teóricos da gestão à prática observada. O estudo abrangeu o setup core das funções administrativas, a análise detalhada do macroambiente (político, econômico, sociocultural e legal) e microambiente competitivo (cinco forças de Porter). Além disso, mapeou-se a matriz de poder e interesse dos stakeholders internos e externos, a estrutura do organograma híbrido adotado e os sistemas de controle operacionais de metas e comportamento. A ATP nos permitiu compreender como o acúmulo de conhecimento prático de gestão compensa a falta de planejamento racional e estruturado inicial. O resultado final é uma proposta de governança corporativa transparente que descentraliza decisões técnicas sem abrir mão de segurança e conformidade de dados, gerando recomendações aplicáveis de intervenção estratégica no negócio.\n\n` +
                                      `2. ANÁLISE DA GESTÃO DA ORGANIZAÇÃO\n` +
                                      `A gestão na Nossa Consultoria BI foi analisada à luz das quatro funções administrativas clássicas: planejar, organizar, liderar e controlar. No planejamento, observou-se que a empresa carece de um planejamento estratégico de longo prazo formalizado e sistemático. A teoria ensina que o planejamento define a direção e reduz a incerteza; na prática, as decisões iniciais ocorreram empiricamente, baseadas na demanda de projetos de curto prazo. Na organização de recursos, a consultoria adota uma estrutura ágil para alocar analistas aos projetos. Embora essa descentralização promova dinamismo, a literatura de Taylor e Fayol enfatiza a necessidade de clareza de atribuições para evitar desperdício de esforço. No SIG Pessoas, notamos que a indefinição de escopo em picos de demanda gera gargalos. A liderança é exercida de forma colaborativa e aberta pelos diretores fundadores, promovendo um ambiente de alta segurança psicológica e confiança mútua. Esse estilo de liderança participativa é alinhado com as teorias contemporâneas, motivando a equipe técnica de tecnologia a propor inovações frequentes. Por fim, o controle é exercido de maneira informal no comportamento cotidiano e formalizado através de entregas técnicas pontuais e SLAs de satisfação do cliente. A lacuna identificada reside na ausência de indicadores operacionais globais de performance unificados. Conclui-se que o acúmulo de experiência dos gestores foi vital para suprir as fragilidades do planejamento formal original. A transição gradual para rituais mais estruturados, mantendo a flexibilidade ágil, surge como a recomendação principal para consolidar o crescimento sustentável da organização no mercado altamente competitivo de inteligência corporativa.\n\n` +
                                      `3. ANÁLISE DO MACROAMBIENTE\n` +
                                      `O macroambiente exerce uma influência profunda e contínua sobre o desempenho estratégico e financeiro da Nossa Consultoria BI. Por meio da análise PESTEL, articulamos os impactos políticos, econômicos, socioculturais e legais na operação. No âmbito político, diretrizes estatais e incentivos governamentais para a inovação digital impulsionam a modernização corporativa, gerando novos negócios para projetos de business intelligence. Sob a ótica econômica, a instabilidade inflacionária e oscilações de juros alteram diretamente a capacidade de investimento dos clientes. Em momentos de contração econômica, as empresas nos contratam focadas no corte rigoroso de custos e aumento de eficiência interna. Em períodos expansivos, a demanda migra para inteligência competitiva e captação de mercados. Socioculturalmente, a ascensão da cultura orientada a dados (Data-Driven) reflete um anseio social por transparência ética nas tomadas de decisão. Isso se reflete no SIG Pessoas, onde colaboradores demandam avaliações baseadas em fatos objetivos e não julgamentos subjetivos. No pilar tecnológico, o surgimento contínuo de novas APIs e inteligência artificial generativa atua simultaneamente como catalisador e ameaça. A consultoria precisa se atualizar freneticamente para não se tornar obsoleta perante ferramentas self-service integradas. Finalmente, as regulações legais, especialmente a Lei Geral de Proteção de Dados (LGPD), afetam diretamente a governança da consultoria. A manipulação de bases de dados exige criptografia e trilhas de auditoria complexas. A conformidade regulatória rigorosa encarece a operação técnica, mas se consolidou como um forte argumento de credibilidade comercial perante corporações exigentes. Compreender esse ecossistema externo complexo permite que a consultoria antecipe ameaças de mercado e as converta em oportunidades de valor para os clientes.\n\n` +
                                      `4. ANÁLISE DO MICROAMBIENTE\n` +
                                      `A dinâmica competitiva da Nossa Consultoria BI foi mapeada por meio do modelo das cinco forças de Porter, cruzando a realidade prática com a teoria clássica de microeconomia. A rivalidade entre os concorrentes diretos é intensa, impulsionada por grandes firmas globais e desenvolvedores freelancers. Contudo, nossa estratégia de competição é focada estritamente na qualidade metodológica e não no preço baixo. Oferecemos o Índice 6D Imersivo e telemetria socioemocional no desenvolvimento humano (SIG Pessoas), um diferencial único e de difícil imitação, afastando-nos da commodity do mercado técnico. O poder de barganha dos fornecedores, constituído por provedores globais de computação em nuvem e ferramentas de visualização (como Microsoft, AWS e Snowflake), é elevado devido ao monopólio técnico das licenças. Para mitigar esse risco de lock-in, a consultoria adota soluções com alta portabilidade de dados em código aberto. Por outro lado, o poder de negociação dos clientes de médio e grande porte é expressivo. Eles exigem entregas de alto valor, integridade ética nos relatórios de conformidade e retorno sobre investimento (ROI) mensurável em curto prazo. Quanto à ameaça de produtos substitutos, o principal risco reside em planilhas informais descentralizadas em Excel ou na contratação de engenheiros internos dedicados. Embora a informalidade seja barata, ela gera custos invisíveis por falhas humanas. A contratação de equipes próprias é onerosa perante o modelo sob demanda da consultoria. Articular essas forças do microambiente ajuda a direcionar nosso posicionamento estratégico rumo a um segmento premium resiliente às pressões de margem.\n\n` +
                                      `5. ANÁLISE DOS STAKEHOLDERS\n` +
                                      `A governança ética da Nossa Consultoria BI depende da administração balanceada de suas partes interessadas. Articulando a teoria de Mitchell com a prática, mapeamos os stakeholders com base em poder, legitimidade e urgência. No quadrante de alta influência e alto interesse (Gerenciar de Perto), localizam-se os sócios diretores e os clientes corporativos críticos. O conselho executivo exerce seu poder por decisões orçamentárias estratégicas e definição da cultura organizativa. Os clientes críticos exercem poder direto condicionando a renovação de contratos à qualidade técnica e ROI tangível. Estes grupos devem participar ativamente de rituais consultivos recorrentes. Os fornecedores globais de cloud e órgãos de regulação da LGPD (como a ANPD) possuem alto poder, mas baixo interesse em nossa operation interna, devendo ser mantidos satisfeitos através de conformidade estrita e relatórios técnicos. Em contrapartida, os gestores operacionais e a equipe interna de analistas e desenvolvedores de BI apresentam baixo poder decisório, mas alto interesse no sucesso financeiro e na estabilidade de carreira da empresa. De acordo com as diretrizes teóricas de desenvolvimento de pessoas, estes stakeholders internos são mantidos informados por meio de transparência assíncrona, OKRs claras e rituais horizontais de feedback, o que estimula o engajamento e a segurança psicológica organizacional. Por fim, as famílias dos colaboradores e prestadores de serviços secundários encontram-se em níveis inferiores de influência, exigindo monitoramento básico de clima e pontualidade. Gerenciar de perto os stakeholders certos e manter a comunicação transparente reduz os ruídos e assegura o alinhamento estratégico indispensável para a eficiência corporativa.\n\n` +
                                      `6. ANÁLISE DA ESTRUTURA E ORGANOGRAMA\n` +
                                      `A Nossa Consultoria BI adota uma estrutura organizacional híbrida que equilibra o modelo orgânico (65%) e mecanicista (35%). O organograma é desenhado em formato tático enxuto, onde o sócio-presidente centraliza decisões estratégicas globais, mas reporta-se de forma direta a dois diretores técnicos e operacionais, que por sua vez lideram coordenadores de projetos e pessoas. Essa estrutura descentraliza as tomadas de decisão sobre a execução técnica dos analistas e desenvolvedores. A grande vantagem desse arranjo híbrido, conforme a literatura de Burns e Stalker, é a flexibilidade operacional extrema e a alta velocidade de inovação técnica para responder a demandas complexas de projetos. No entanto, a desvantagem reside na ambiguidade de papéis em momentos de pico de atividade e na dispersão dos fluxos de autoridade. Para mitigar isso, a empresa utiliza metas e OKRs. Alternativamente, a literatura propõe estruturas puramente mecanicistas com hierarquias rígidas e regras burocráticas estritas. Em nosso campo de tecnologia da informação, a adoção de um estilo puramente mecanicista sufocaria a autonomia dos programadores, destruindo o engajamento. Uma estrutura puramente orgânica, por sua vez, criaria caos e vulnerabilidade regulatória frente à LGPD. Portanto, o estilo híbrido ágil adotado é a escolha mais lógica e racional para as contingências do negócio. Recomendamos apenas institucionalizar squads temporários focados em projetos específicos com o papel de Product Owner explicitamente definido para refinar o escopo de reporte tático e as atribuições funcionais da equipe técnica no dia a dia operante.\n\n` +
                                      `7. ANÁLISE DOS SISTEMAS DE CONTROLE\n` +
                                      `Os sistemas de controle organizacional da Nossa Consultoria BI misturam ferramentas formais racionais com mecanismos informais comportamentais. No pilar racional (mecanicista), a empresa baseia-se em OKRs trimestrais formais e no controle rígido de SLAs de projetos técnicos e faturamento mensal. Esse tipo de controle sobre os outputs é vital para garantir previsibilidade e mensurar o retorno. No entanto, no controle de processos internos e comportamento do time, a consultoria apoia-se em controles naturais e informais (orgânicos). Estes rituais compreendem reuniões de feedback recorrentes baseadas na metodologia SBI (Situação-Comportamento-Impacto) e no contrato de aliança estabelecido cooperativamente. A teoria de Ouchi aponta que controles de clã (informais) geram alta confiança mútua e reduzem o microgerenciamento restritivo. A nossa proposta para melhorar a eficácia reside na integração tecnológica de dashboards de performance transparentes, como no SIG Pessoas, onde o colaborador visualiza suas próprias métricas de engajamento de forma assíncrona. A adoção de controles comportamentais sistematizados, sem caráter punitivo, ajuda os profissionais de BI a calibrar suas tarefas e prioridades em tempo real, gerando eficácia de entregas e alta segurança psicológica. O alinhamento automatizado de metas reduz em até 40% a necessidade de reuniões de alinhamento desnecessárias, diminuindo os custos invisíveis operacionais e otimizando a energia da liderança de pessoas. Portanto, robustecer as ferramentas de telemetria sem engessar a rotina ágil é a melhor avenida estratégica para alcançar os objetivos organizacionais com a máxima eficácia e harmonia corporativa.\n\n` +
                                      `8. CONCLUSÕES E IMPLICAÇÕES GERENCIAIS (RECOMENDAÇÕES)\n` +
                                      `Sugestão 1: Padronização de Rituais de Feedback Ativo via SIG Pessoas\n` +
                                      `Recomendamos formalizar reuniões 1:1 quinzenais pautadas no modelo de feedback estruturado SBI (Situação, Comportamento e Impacto). A fundamentação teórica de Daniel Goleman ensina que a inteligência emocional coletiva e a clareza de atribuições nas equipes são alimentadas por ciclos frequentes de alinhamento. A ferramenta SIG Pessoas automatiza o registro histórico desses logs, permitindo que a coordenação de pessoas acompanhe as tendências de desenvolvimento socioemocional e crie planos de desenvolvimento individual (PDI) específicos. Isso elimina as avaliações subjetivas vagas que geram desconfiança, otimizando o engajamento e a harmonia operacional da consultoria técnica.\n\n` +
                                      `Sugestão 2: Implantação de Squads Matriciais com Papéis de Product Owner Definidos\n` +
                                      `Sugerimos estruturar a consultoria em squads (times multidisciplinares temporários) com autonomia técnica de ponta a ponta para cada projeto corporativo. Cada squad contará com um Product Owner (PO) tático encarregado de intermediar o escopo diretamente com o cliente e calibrações. A fundamentação teórica de contingência de Lawrence e Lorsch demonstra que empresas ágeis em ambientes mutáveis precisam de alta diferenciação e integração. O PO reduz a ambiguidade de papéis que sobrecarrega os diretores técnicos, provendo velocidade operacional, clareza nos prazos e controle rígido das entregas contratadas via SLAs formais.\n\n` +
                                      `Sugestão 3: Consolidação da Telemetria de OKRs e Governança LGPD Integrada\n` +
                                      `Propomos integrar as metas estratégicas e OKRs corporativos em um dashboard executivo automatizado com trilhas de auditoria contínua de acessos aos bancos de dados de saúde e pessoas. A fundamentação teórica de controle cibernético de Wiener estabelece que sistemas complexos necessitam de loops de feedback de dados constantes para correções de desvios. O uso de criptografia e logs de auditoria automatizados assegura conformidade estrita com a LGPD e mitiga passivos regulatórios catastróficos, ao mesmo tempo em que a visibilidade pública interna das metas reduz o microgerenciamento e orienta a equipe de BI rumo ao alto desempenho data-driven.\n`;
                                    const file = new Blob([fileContent], {type: 'text/plain'});
                                    element.href = URL.createObjectURL(file);
                                    element.download = "Relatorio_Final_Consultoria_ATP.txt";
                                    document.body.appendChild(element);
                                    element.click();
                                    document.body.removeChild(element);
                                  }}
                                  className="px-4 py-2 bg-gradient-to-r from-[#cbd5e1]/20 to-[#cbd5e1]/5 hover:from-[#cbd5e1]/30 hover:to-[#cbd5e1]/10 border border-[#d2af5a]/40 rounded-xl text-[10px] font-bold text-[#d2af5a] font-mono tracking-widest transition-all shadow-[0_0_15px_rgba(210,175,90,0.1)] flex items-center gap-2"
                                >
                                  <FileDown size={13} /> EXPORTAR ATP COMPLETA (.TXT)
                                </button>
                              </div>

                              {/* 8 Section buttons grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-20">
                                {[
                                  { id: 1, label: '1. Introdução', words: '151 p.', req: '100-200 p.' },
                                  { id: 2, label: '2. Análise da Gestão', words: '267 p.', req: '250-300 p.' },
                                  { id: 3, label: '3. Macroambiente', words: '275 p.', req: '250-350 p.' },
                                  { id: 4, label: '4. Microambiente', words: '264 p.', req: '250-350 p.' },
                                  { id: 5, label: '5. Stakeholders', words: '259 p.', req: '250-350 p.' },
                                  { id: 6, label: '6. Estrutura & Organograma', words: '259 p.', req: '250-350 p.' },
                                  { id: 7, label: '7. Sistemas de Controle', words: '256 p.', req: '250-350 p.' },
                                  { id: 8, label: '8. Conclusões & Propostas', words: '3 Sugestões', req: 'Mínimo 3' }
                                ].map(s => (
                                  <button
                                    key={s.id}
                                    onClick={() => setActiveReportSection(s.id)}
                                    className={`p-2 rounded-xl text-left transition-all border ${activeReportSection === s.id ? 'bg-[#d2af5a]/15 border-[#d2af5a]/45 text-white shadow-inner animate-pulse' : 'bg-black/30 border-white/5 text-white/50 hover:text-white/80 hover:bg-white/[0.01]'}`}
                                  >
                                    <span className="text-[9px] font-bold block">{s.label}</span>
                                    <div className="flex justify-between items-center mt-1 text-[7px] font-mono text-white/30">
                                      <span>Calibrado: {s.words}</span>
                                      <span className="text-[#d2af5a] font-bold">{s.req} [✓]</span>
                                    </div>
                                  </button>
                                ))}
                              </div>

                              {/* Full-width Content viewer */}
                              <div className="flex-1 bg-[#050505] border border-white/5 rounded-2xl p-5 overflow-y-auto custom-scrollbar min-h-[300px] flex flex-col justify-between relative z-10">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d2af5a]/3 blur-3xl pointer-events-none" />
                                <div className="space-y-4">
                                  {activeReportSection === 1 && (
                                    <div className="animate-fade-in space-y-3">
                                      <h4 className="text-[12px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider pb-1.5 border-b border-white/5">1. Introdução da Atividade Prática</h4>
                                      <p className="text-[10.5px] text-white/80 leading-relaxed font-sans text-justify">
                                        Este relatório de consultoria consolida o diagnóstico organizacional realizado ao longo das últimas semanas na empresa fictícia <strong>Nossa Consultoria BI (Auditoria 6D)</strong>, integrando conceitos teóricos da gestão à prática observada. O estudo abrangeu o setup core das funções administrativas, a análise detalhada do macroambiente (político, econômico, sociocultural e legal) e microambiente competitivo (cinco forças de Porter). Além disso, mapeou-se a matriz de poder e interesse dos stakeholders internos e externos, a estrutura do organograma híbrido adotado e os sistemas de controle operacionais de metas e comportamento. A ATP nos permitiu compreender como o acúmulo de conhecimento prático de gestão compensa a falta de planejamento racional e estruturado inicial. O resultado final é uma proposta de governança corporativa transparente que descentraliza decisões técnicas sem abrir mão de segurança e conformidade de dados, gerando recomendações aplicáveis de intervenção estratégica no negócio.
                                      </p>
                                    </div>
                                  )}

                                  {activeReportSection === 2 && (
                                    <div className="animate-fade-in space-y-3">
                                      <h4 className="text-[12px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider pb-1.5 border-b border-white/5">2. Análise da Gestão da Organização (FOPL)</h4>
                                      <p className="text-[10.5px] text-white/80 leading-relaxed font-sans text-justify">
                                        A gestão na Nossa Consultoria BI foi analisada à luz das quatro funções administrativas clássicas: planejar, organizar, liderar e controlar. No planejamento, observou-se que a empresa carece de um planejamento estratégico de longo prazo formalizado e sistemático. A teoria ensina que o planejamento define a direção e reduz a incerteza; na prática, as decisões iniciais ocorreram empiricamente, baseadas na demanda de projetos de curto prazo. Na organização de recursos, a consultoria adota uma estrutura ágil para alocar analistas aos projetos. Embora essa descentralização promova dinamismo, a literatura de Taylor e Fayol enfatiza a necessidade de clareza de atribuições para evitar desperdício de esforço. No SIG Pessoas, notamos que a indefinição de escopo em picos de demanda gera gargalos. A liderança é exercida de forma colaborativa e aberta pelos diretores fundadores, promovendo um ambiente de alta segurança psicológica e confiança mútua. Esse estilo de liderança participativa é alinhado com as teorias contemporâneas, motivando a equipe técnica de tecnologia a propor inovações frequentes. Por fim, o controle é exercido de maneira informal no comportamento cotidiano e formalizado através de entregas técnicas pontuais e SLAs de satisfação do cliente. A lacuna identificada reside na ausência de indicadores operacionais globais de performance unificados. Conclui-se que o acúmulo de experiência dos gestores foi vital para suprir as fragilidades do planejamento formal original. A transição gradual para rituais mais estruturados, mantendo a flexibilidade ágil, surge como a recomendação principal para consolidar o crescimento sustentável da organização no mercado altamente competitivo de inteligência corporativa.
                                      </p>
                                    </div>
                                  )}

                                  {activeReportSection === 3 && (
                                    <div className="animate-fade-in space-y-3">
                                      <h4 className="text-[12px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider pb-1.5 border-b border-white/5">3. Análise do Macroambiente (PESTEL)</h4>
                                      <p className="text-[10.5px] text-white/80 leading-relaxed font-sans text-justify">
                                        O macroambiente exerce uma influência profunda e contínua sobre o desempenho estratégico e financeiro da Nossa Consultoria BI. Por meio da análise PESTEL, articulamos os impactos políticos, econômicos, socioculturais e legais na operação. No âmbito político, diretrizes estatais e incentivos governamentais para a inovação digital impulsionam a modernização corporativa, gerando novos negócios para projetos de business intelligence. Sob a ótica econômica, a instabilidade inflacionária e oscilações de juros alteram diretamente a capacidade de investimento dos clientes. Em momentos de contração econômica, as empresas nos contratam focadas no corte rigoroso de custos e aumento de eficiência interna. Em períodos expansivos, a demanda migra para inteligência competitiva e captação de mercados. Socioculturalmente, a ascensão da cultura orientada a dados (Data-Driven) reflete um anseio social por transparência ética nas tomadas de decisão. Isso se reflete no SIG Pessoas, onde colaboradores demandam avaliações baseadas em fatos objetivos e não julgamentos subjetivos. No pilar tecnológico, o surgimento contínuo de novas APIs e inteligência artificial generativa atua simultaneamente como catalisador e ameaça. A consultoria precisa se atualizar freneticamente para não se tornar obsoleta perante ferramentas self-service integradas. Finalmente, as regulações legais, especialmente a Lei Geral de Proteção de Dados (LGPD), afetam diretamente a governança da consultoria. A manipulação de bases de dados exige criptografia e trilhas de auditoria complexas. A conformidade regulatória rigorosa encarece a operação técnica, mas se consolidou como um forte argumento de credibilidade comercial perante corporações exigentes. Compreender esse ecossistema externo complexo permite que a consultoria antecipe ameaças de mercado e as converta em oportunidades de valor para os clientes.
                                      </p>
                                    </div>
                                  )}

                                  {activeReportSection === 4 && (
                                    <div className="animate-fade-in space-y-3">
                                      <h4 className="text-[12px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider pb-1.5 border-b border-white/5">4. Análise do Microambiente (Porter)</h4>
                                      <p className="text-[10.5px] text-white/80 leading-relaxed font-sans text-justify">
                                        A dinâmica competitiva da Nossa Consultoria BI foi mapeada por meio do modelo das cinco forças de Porter, cruzando a realidade prática com a teoria clássica de microeconomia. A rivalidade entre os concorrentes diretos é intensa, impulsionada por grandes firmas globais e desenvolvedores freelancers. Contudo, nossa estratégia de competição é focada estritamente na qualidade metodológica e não no preço baixo. Oferecemos o Índice 6D Imersivo e telemetria socioemocional no desenvolvimento humano (SIG Pessoas), um diferencial único e de difícil imitação, afastando-nos da commodity do mercado técnico. O poder de barganha dos fornecedores, constituído por provedores globais de computação em nuvem e ferramentas de visualização (como Microsoft, AWS e Snowflake), é elevado devido ao monopólio técnico das licenças. Para mitigar esse risco de lock-in, a consultoria adota soluções com alta portabilidade de dados in código aberto. Por outro lado, o poder de negociação dos clientes de médio e grande porte é expressivo. Eles exigem entregas de alto valor, integridade ética nos relatórios de conformidade e retorno sobre investimento (ROI) mensurável em curto prazo. Quanto à ameaça de produtos substitutos, o principal risco reside em planilhas informais descentralizadas em Excel ou na contratação de engenheiros internos dedicados. Embora a informalidade seja barata, ela gera custos invisíveis por falhas humanas. A contratação de equipes próprias é onerosa perante o modelo sob demanda da consultoria. Articular essas forças do microambiente ajuda a direcionar nosso posicionamento estratégico rumo a um segmento premium resiliente às pressões de margem.
                                      </p>
                                    </div>
                                  )}

                                  {activeReportSection === 5 && (
                                    <div className="animate-fade-in space-y-3">
                                      <h4 className="text-[12px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider pb-1.5 border-b border-white/5">5. Análise dos Stakeholders</h4>
                                      <p className="text-[10.5px] text-white/80 leading-relaxed font-sans text-justify">
                                        A governança ética da Nossa Consultoria BI depende da administração balanceada de suas partes interessadas. Articulando a teoria de Mitchell com a prática, mapeamos os stakeholders com base em poder, legitimidade e urgência. No quadrante de alta influência e alto interesse (Gerenciar de Perto), localizam-se os sócios diretores e os clientes corporativos críticos. O conselho executivo exerce seu poder por decisões orçamentárias estratégicas e definição da cultura organizativa. Os clientes críticos exercem poder direto condicionando a renovação de contratos à qualidade técnica e ROI tangível. Estes grupos devem participar ativamente de rituais consultivos recorrentes. Os fornecedores globais de cloud e órgãos de regulação da LGPD (como a ANPD) possuem alto poder, mas baixo interesse em nossa operação interna, devendo ser mantidos satisfeitos através de conformidade estrita e relatórios técnicos. Em contrapartida, os gestores operacionais e a equipe interna de analistas e desenvolvedores de BI apresentam baixo poder decisório, mas alto interesse no sucesso financeiro e na estabilidade de carreira da empresa. De acordo com as diretrizes teóricas de desenvolvimento de pessoas, estes stakeholders internos são mantidos informados por meio de transparência assíncrona, OKRs claras e rituais horizontais de feedback, o que estimula o engajamento e a segurança psicológica organizacional. Por fim, as famílias dos colaboradores e prestadores de serviços secundários encontram-se em níveis inferiores de influência, exigindo monitoramento básico de clima e pontualidade. Gerenciar de perto os stakeholders certos e manter a comunicação transparente reduz os ruídos e assegura o alinhamento estratégico indispensável para a eficiência corporativa.
                                      </p>
                                    </div>
                                  )}

                                  {activeReportSection === 6 && (
                                    <div className="animate-fade-in space-y-3">
                                      <h4 className="text-[12px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider pb-1.5 border-b border-white/5">6. Estrutura e Organograma</h4>
                                      <p className="text-[10.5px] text-white/80 leading-relaxed font-sans text-justify">
                                        A Nossa Consultoria BI adota uma estrutura organizacional híbrida que equilibra o modelo orgânico (65%) e mecanicista (35%). O organograma é desenhado em formato tático enxuto, onde o sócio-presidente centraliza decisões estratégicas globais, mas reporta-se de forma direta a dois diretores técnicos e operacionais, que por sua vez lideram coordenadores de projetos e pessoas. Essa estrutura descentraliza as tomadas de decisão sobre a execução técnica dos analistas e desenvolvedores. A grande vantagem desse arranjo híbrido, conforme a literatura de Burns e Stalker, é a flexibilidade operacional extrema e a alta velocidade de inovação técnica para responder a demandas complexas de projetos. No entanto, a desvantagem reside na ambiguidade de papéis em momentos de pico de atividade e na dispersão dos fluxos de autoridade. Para mitigar isso, a empresa utiliza metas e OKRs. Alternativamente, a literatura propõe estruturas puramente mecanicistas com hierarquias rígidas e regras burocráticas estritas. Em nosso campo de tecnologia da informação, a adoção de um estilo puramente mecanicista sufocaria a autonomia dos programadores, destruindo o engajamento. Uma estrutura puramente orgânica, por sua vez, criaria caos e vulnerabilidade regulatória frente à LGPD. Portanto, o estilo híbrido ágil adotado é a escolha mais lógica e racional para as contingências do negócio. Recomendamos apenas institucionalizar squads temporários focados em projetos específicos com o papel de Product Owner explicitamente definido para refinar o escopo de reporte tático e as atribuições funcionais da equipe técnica no dia a dia operante.
                                      </p>
                                    </div>
                                  )}

                                  {activeReportSection === 7 && (
                                    <div className="animate-fade-in space-y-3">
                                      <h4 className="text-[12px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider pb-1.5 border-b border-white/5">7. Sistemas de Controle Organizacional</h4>
                                      <p className="text-[10.5px] text-white/80 leading-relaxed font-sans text-justify">
                                        Os sistemas de controle organizacional da Nossa Consultoria BI misturam ferramentas formais racionais com mecanismos informais comportamentais. No pilar racional (mecanicista), a empresa baseia-se em OKRs trimestrais formais e no controle rígido de SLAs de projetos técnicos e faturamento mensal. Esse tipo de controle sobre os outputs é vital para garantir previsibilidade e mensurar o retorno. No entanto, no controle de processos internos e comportamento do time, a consultoria apoia-se em controles naturais e informais (orgânicos). Estes rituais compreendem reuniões de feedback recorrentes baseadas na metodologia SBI (Situação-Comportamento-Impacto) e no contrato de aliança estabelecido cooperativamente. A teoria de Ouchi aponta que controles de clã (informais) geram alta confiança mútua e reduzem o microgerenciamento restritivo. A nossa proposta para melhorar a eficácia reside na integração tecnológica de dashboards de performance transparentes, como no SIG Pessoas, onde o colaborador visualiza suas próprias métricas de engajamento de forma assíncrona. A adoção de controles comportamentais sistematizados, sem caráter punitivo, ajuda os profissionais de BI a calibrar suas tarefas e prioridades em tempo real, gerando eficácia de entregas e alta segurança psicológica. O alinhamento automatizado de metas reduz em até 40% a necessidade de reuniões de alinhamento desnecessárias, diminuindo os custos invisíveis operacionais e otimizando a energia da liderança de pessoas. Portanto, robustecer as ferramentas de telemetria sem engessar a rotina ágil é a melhor avenida estratégica para alcançar os objetivos organizacionais com a máxima eficácia e harmonia corporativa.
                                      </p>
                                    </div>
                                  )}

                                  {activeReportSection === 8 && (
                                    <div className="animate-fade-in space-y-3.5">
                                      <h4 className="text-[12px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider pb-1.5 border-b border-white/5">8. Conclusões e Recomendações de Consultoria</h4>
                                      
                                      <div className="space-y-3">
                                        {[
                                          {
                                            title: 'Recomendação 1: Padronização de Rituais via SIG Pessoas',
                                            text: 'Recomendamos formalizar reuniões 1:1 quinzenais pautadas no modelo de feedback estruturado SBI (Situação, Comportamento e Impacto). A fundamentação teórica de Daniel Goleman ensina que a inteligência emocional coletiva e a clareza de atribuições nas equipes são alimentadas por ciclos frequentes de alinhamento. A ferramenta SIG Pessoas automatiza o registro histórico desses logs, permitindo que a coordenação de pessoas acompanhe as tendências de desenvolvimento socioemocional e crie planos de desenvolvimento individual (PDI) específicos. Isso elimina as avaliações subjetivas vagas que geram desconfiança, otimizando o engajamento e a harmonia operacional da consultoria técnica.'
                                          },
                                          {
                                            title: 'Recomendação 2: Implantação de Squads Matriciais com POs',
                                            text: 'Sugerimos estruturar a consultoria em squads (times multidisciplinares temporários) com autonomia técnica de ponta a ponta para cada projeto corporativo. Cada squad contará com um Product Owner (PO) tático encarregado de intermediar o escopo diretamente com o cliente e calibrações. A fundamentação teórica de contingência de Lawrence e Lorsch demonstra que empresas ágeis em ambientes mutáveis precisam de alta differentiation e integração. O PO reduz a ambiguidade de papéis que sobrecarrega os diretores técnicos, provendo velocidade operacional, clareza nos prazos e controle rígido das entregas contratadas via SLAs formais.'
                                          },
                                          {
                                            title: 'Recomendação 3: Telemetria de OKRs e Governança LGPD Integrada',
                                            text: 'Propomos integrar as metas estratégicas e OKRs corporativos em um dashboard executivo automatizado com trilhas de auditoria contínua de acessos aos bancos de dados de saúde e pessoas. A fundamentação teórica de controle cibernético de Wiener estabelece que sistemas complexos necessitam de loops de feedback de dados constantes para correções de desvios. O uso de criptografia e logs de auditoria automatizados assegura conformidade estrita com a LGPD e mitiga passivos regulatórios catastróficos, ao mesmo tempo em que a visibilidade pública interna das metas reduz o microgerenciamento e orienta a equipe de BI rumo ao alto desempenho data-driven.'
                                          }
                                        ].map((r, idx) => (
                                          <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 hover:border-[#d2af5a]/30 rounded-xl transition-all">
                                            <span className="text-[9.5px] font-mono text-[#d2af5a] font-bold block mb-1">{r.title}</span>
                                            <p className="text-[9.5px] text-white/70 leading-relaxed font-sans text-justify">{r.text}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left w-full"
                  style={{ width: '100%' }}
                >
                  {/* Left: OKR list and add */}
                  <div className="lg:col-span-7 dash-card space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[12px] font-bold text-white uppercase font-mono tracking-widest">OKRs Trimestrais · Q2 2026</h4>
                        <p className="text-[9.5px] text-white/40 font-sans">41 dias restantes · Q2 consolidado</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {okrs.length === 0 ? (
                        <div className="text-center py-6 text-[10px] text-white/30 border border-white/5 rounded-2xl bg-black/20">Nenhum OKR cadastrado ainda. Crie um novo objetivo estratégico abaixo.</div>
                      ) : (
                        okrs.map(okr => (
                          <div key={okr.id} className="premium-glass-card space-y-2.5 transition-all duration-300 relative group">
                            <button 
                              onClick={() => handleDeleteOkr(okr.id)} 
                              className="absolute top-3 right-3 text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition text-[10px] font-bold p-1 hover:bg-white/5 rounded z-10"
                              title="Remover OKR"
                            >
                              ✕
                            </button>
                            <div className="flex justify-between text-[11px] font-bold">
                              <span className="text-white/95 font-bold">{okr.title}</span>
                              <span className="font-mono text-[#d2af5a]">{okr.progress}%</span>
                            </div>
                            <span className="text-[8.5px] font-mono text-white/45 block leading-tight">{okr.keyResults}</span>
                            <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-gradient-to-r from-[#d2af5a] to-[#cbd5e1] rounded-full transition-all duration-300" style={{ width: `${okr.progress}%` }} />
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* OKR add form */}
                    <div className="border-t border-white/[0.04] pt-4 space-y-3">
                      <span className="text-[8px] font-mono text-[#d2af5a] uppercase tracking-wider block font-bold">Criar Novo OKR Estratégico</span>
                      <input 
                        type="text" 
                        placeholder="Objetivo principal (ex: Reduzir churn em 10%)..." 
                        value={newOkrTitle}
                        onChange={(e) => setNewOkrTitle(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-[10.5px] text-white outline-none focus:border-[#d2af5a]/40"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Key Results (ex: KR1: LTV > 12 meses, KR2: zero bugs)..." 
                          value={newOkrKr}
                          onChange={(e) => setNewOkrKr(e.target.value)}
                          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-[10.5px] text-white outline-none focus:border-[#d2af5a]/40"
                        />
                        <button 
                          onClick={handleAddOkr}
                          className="px-4 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/30 border border-[#d2af5a]/45 rounded-xl text-[10px] font-bold text-[#d2af5a] font-mono transition"
                        >
                          DEFINIR
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: AI Strategic OKR Generator */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="dash-card bg-[#050505]/60 backdrop-blur-3xl border border-white/5 relative overflow-hidden p-5 rounded-2xl flex flex-col justify-between min-h-[460px]">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-[80px] pointer-events-none mix-blend-screen" />
                      
                      <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-mono text-[9px] text-[#d2af5a] tracking-widest block mb-1 font-bold uppercase flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 animate-pulse" /> IA OKR COPILOT</span>
                            <h4 className="text-[14px] font-bold text-white mb-0.5">Gerador de OKRs Estratégicos</h4>
                            <div className="text-[9.5px] text-white/50 font-sans">Alinhe inovação com resultados (Google, Nubank & iFood style)</div>
                          </div>
                        </div>

                        {/* Objective Type Selection */}
                        <div className="space-y-1.5">
                          <label className="block text-[8.5px] font-mono uppercase text-white/40 tracking-wider">Selecione o Pilar da Sugestão:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'crescimento', label: 'Crescimento', sub: 'LTV/CAC & MRR' },
                              { id: 'inovacao', label: 'Inovação', sub: 'Squads & TI' },
                              { id: 'pessoas', label: 'Pessoas', sub: 'SBI & eNPS' },
                              { id: 'custom', label: 'Customizado', sub: 'Seu Desafio' }
                            ].map(t => (
                              <button
                                key={t.id}
                                onClick={() => setSelectedOkrType(t.id)}
                                className={`p-2 rounded-lg border text-left transition cursor-pointer select-none flex flex-col justify-between min-h-[50px] ${
                                  selectedOkrType === t.id 
                                    ? 'bg-[#d2af5a]/10 border-[#d2af5a]/50 text-white shadow-[0_0_10px_rgba(210,175,90,0.1)]'
                                    : 'bg-black/25 border-white/[0.04] text-white/40 hover:border-white/10 hover:text-white/60'
                                }`}
                              >
                                <span className="block text-[8.5px] font-mono tracking-wider font-bold uppercase">{t.label}</span>
                                <span className="block text-[7.5px] leading-tight text-white/40">{t.sub}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom Challenge input if custom is selected */}
                        {selectedOkrType === 'custom' && (
                          <div className="space-y-1.5 animate-fadeIn">
                            <label className="block text-[8.5px] font-mono uppercase text-white/40 tracking-wider">Descreva o desafio estratégico:</label>
                            <input 
                              type="text"
                              value={customOkrChallenge}
                              onChange={(e) => setCustomOkrChallenge(e.target.value)}
                              placeholder="Ex: Escalar canais de inbound marketing..."
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-white outline-none focus:border-[#d2af5a]/40"
                            />
                          </div>
                        )}

                        {/* Action trigger button */}
                        <button
                          onClick={handleGenerateAiOkr}
                          disabled={generatingOkr}
                          className="w-full py-2.5 bg-gradient-to-r from-[#d2af5a] to-[#efddb1] hover:brightness-110 active:scale-[0.98] transition text-black font-mono text-[9px] font-black tracking-widest uppercase rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(210,175,90,0.15)]"
                        >
                          {generatingOkr ? (
                            <>
                              <Cpu className="w-3.5 h-3.5 animate-spin" />
                              Calculando Diretrizes...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5" />
                              Gerar Proposta OKR com IA
                            </>
                          )}
                        </button>
                      </div>

                      {/* AI Generated Result Display */}
                      <div className="mt-4 border-t border-white/[0.05] pt-4 relative z-10">
                        {generatingOkr ? (
                          <div className="flex flex-col justify-center items-center py-6 text-center gap-2">
                            <span className="text-[9px] font-mono text-[#d2af5a] animate-pulse">
                              Consultando IA Advisor estrategista...
                            </span>
                          </div>
                        ) : generatedOkrResult ? (
                          <div className="space-y-3 animate-fadeIn">
                            <div className="p-3 bg-[#d2af5a]/5 border border-[#d2af5a]/15 rounded-xl space-y-2 text-[10.5px]">
                              <div>
                                <span className="block text-[7.5px] font-mono text-[#d2af5a] font-bold uppercase">🎯 OBJETIVO RECOMENDADO (IA)</span>
                                <span className="block text-white/95 font-semibold mt-0.5">{generatedOkrResult.objetivo}</span>
                              </div>
                              <div>
                                <span className="block text-[7.5px] font-mono text-[#5dcaa5] font-bold uppercase">📊 KEY RESULTS (KR MENSURÁVEIS)</span>
                                <span className="block text-white/75 mt-0.5 leading-snug font-mono text-[9.5px]">{generatedOkrResult.keyResults}</span>
                              </div>
                              <div className="border-t border-white/[0.05] pt-1.5 mt-1">
                                <span className="block text-[7.5px] font-mono text-[#fac775] font-bold uppercase">💡 INTELIGÊNCIA / RATIONALE</span>
                                <span className="block text-white/50 mt-0.5 leading-normal italic text-[9.5px]">{generatedOkrResult.rationale}</span>
                              </div>
                            </div>

                            {/* 70% Atingimento Alert Callout */}
                            <div className="p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-lg text-[9px] text-white/60 leading-normal flex items-start gap-2">
                              <span className="text-[#fac775] font-bold">⚠️ NOTA:</span>
                              <span>
                                Em OKRs, os objetivos são extremamente <strong>ambiciosos por definição</strong>. Atingir <strong>70%</strong> da meta já é considerado sucesso!
                              </span>
                            </div>

                            {/* Adopt Button */}
                            <button
                              onClick={handleAdoptAiOkr}
                              className="w-full py-2 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/25 border border-[#d2af5a]/30 text-[#d2af5a] font-mono text-[9px] font-bold tracking-widest uppercase rounded-lg transition-colors cursor-pointer text-center"
                            >
                              ✓ Adotar Proposta no meu Ciclo
                            </button>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-[9px] text-white/30 font-mono">
                            Nenhuma proposta ativa. Escolha um pilar acima e clique em "Gerar Proposta OKR com IA" para formular objetivos do nível do Google, Nubank ou iFood.
                          </div>
                        )}
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
                  className="flex flex-col gap-6 text-left w-full"
                  style={{ width: '100%' }}
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
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d2af5a]/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Latência Executiva (%)</label>
                        <input 
                          type="number" 
                          value={climateLatency}
                          onChange={(e) => setClimateLatency(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d2af5a]/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Taxa de Retrabalho (%)</label>
                        <input 
                          type="number" 
                          value={climateRework}
                          onChange={(e) => setClimateRework(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d2af5a]/40"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Risco de Turnover (%)</label>
                        <input 
                          type="number" 
                          value={climateTurnover}
                          onChange={(e) => setClimateTurnover(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/[0.08] rounded-[0.4rem] px-3 py-1.5 text-[10px] text-white outline-none focus:border-[#d2af5a]/40"
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
                      <span className="text-[8px] font-mono text-[#d2af5a] uppercase block font-bold">Zona de Calibração</span>
                      <b className="text-3xl font-mono text-[#d2af5a] font-bold">+74</b>
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
                      className="px-3.5 py-1.5 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/30 border border-[#d2af5a]/45 text-[#d2af5a] rounded-[0.4rem] text-[8.5px] font-mono font-bold transition"
                    >
                      IMPRIMIR RELATÓRIO
                    </button>
                  </div>

                  <div className="p-3 bg-black/30 rounded-lg text-[9.5px] font-mono leading-relaxed text-white/75 space-y-2">
                    <span className="text-[#d2af5a] font-bold block">✓ CONSOLIDAÇÃO COCKPIT · MAIO DE 2026</span>
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
                  className="flex flex-col gap-6 text-left w-full"
                  style={{ width: '100%' }}
                >
                  
                  {/* Channels noise calculator */}
                  <div className="lg:col-span-8 dash-card space-y-4">
                    <div>
                      <h4 className="text-[12px] font-bold text-white uppercase font-mono tracking-widest">Score de Ruído de Canais</h4>
                      <p className="text-[9.5px] text-white/40 font-sans">Análise cruzada de complexidade da mensagem contra a sincronia do meio</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Complexidade da Mensagem</label>
                        <select 
                          value={msgComplexity}
                          onChange={(e) => setMsgComplexity(parseInt(e.target.value) as any)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-[10.5px] text-white outline-none focus:border-[#d2af5a]/40"
                        >
                          <option value="1">1: Baixa (Transacional / Aviso simples)</option>
                          <option value="2">2: Média (Definição / Alinhamento tático)</option>
                          <option value="3">3: Alta (Feedback SBI / Alinhamento de propósito / Demissão)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8.5px] font-mono text-white/40 block font-bold">Canal Utilizado</label>
                        <select 
                          value={channelUsed}
                          onChange={(e) => setChannelUsed(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-[10.5px] text-white outline-none focus:border-[#d2af5a]/40"
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

                    <div className="premium-glass-card flex justify-between items-center transition duration-300">
                      <div>
                        <span className="text-[8.5px] font-mono text-white/45 block mb-1">Índice de Ruído Calculado</span>
                        <b className={`text-lg font-mono font-bold ${noiseScore > 70 ? 'text-[#e24b4a]' : 'text-[#d2af5a]'}`} style={{ textShadow: noiseScore > 70 ? '0 0 10px rgba(226, 75, 74, 0.4)' : '0 0 10px rgba(203, 213, 225, 0.4)' }}>{noiseScore}%</b>
                      </div>
                      <span className="text-[9.5px] font-mono text-white/50">{channelFeedback}</span>
                    </div>
                  </div>

                  {/* C2 Communication Styles */}
                  <div className="lg:col-span-4 dash-card space-y-4">
                    <h4 className="text-[12px] font-bold text-[#d2af5a] uppercase font-mono tracking-widest">C² Communication Matrix</h4>
                    
                    <div className="space-y-2.5 font-sans text-[9.5px] text-white/60">
                      <div className="premium-glass-card space-y-1 transition duration-300">
                        <b className="text-white block mb-1 font-bold">Direto:</b> 
                        <span>Objetivo e focado em fatos de entrega. Indicado para maturidades técnicas M3/M4.</span>
                      </div>
                      <div className="premium-glass-card space-y-1 transition duration-300">
                        <b className="text-white block mb-1 font-bold">Analítico:</b> 
                        <span>Data-driven, focado em métricas e calibração objetiva do plantão.</span>
                      </div>
                      <div className="premium-glass-card space-y-1 transition duration-300">
                        <b className="text-white block mb-1 font-bold">Relacional:</b> 
                        <span>Empático, focado na calibração emocional e segurança psicológica.</span>
                      </div>
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
