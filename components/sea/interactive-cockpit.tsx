'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { Sparkles, TrendingUp, Globe, Users, Leaf, ShieldAlert, AlertTriangle, Settings, Database, Activity, X, Info, HelpCircle, Layers, CheckCircle, Play, SendHorizontal, Flame, Award, Bot, RefreshCw } from 'lucide-react'

import { MiniEstrategia } from './mini-estrategia'
import { MiniCapitalHumano } from './mini-capital-humano'
import { MiniEsg } from './mini-esg'
import { MiniAi } from './mini-ai'
import { MiniFinancas } from './mini-financas'

import { HudFinancas } from './hud-financas'
import { HudCapitalHumano } from './hud-capital-humano'
import { HudEstrategia } from './hud-estrategia'
import { HudEsg } from './hud-esg'
import { HudAi } from './hud-ai'

interface MetricDetail {
  id: string
  title: string
  disciplines: string[]
  whatIs: string
  whyImportant: string
  formula: string
  howToCalculate: string
  cruzamento: string
  swot: string
  pestel: string
  stakeholders: string
}

export function InteractiveCockpit() {
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'info' | 'formula' | 'cruzamento' | 'swot'>('info')
  const [apiLiveStatus, setApiLiveStatus] = useState('SYNCED')
  const [usdRate, setUsdRate] = useState(4.98)
  const [activePillar, setActivePillar] = useState<'financas' | 'capital_humano' | 'estrategia' | 'esg' | 'ai'>('financas')
  const [countdown, setCountdown] = useState(10)

  // Estados do Novo Simulador de Vantagem Competitiva 6D
  const [compFactor, setCompFactor] = useState<'transparencia' | 'evidencia' | 'auditoria'>('transparencia')
  const [effortValue, setEffortValue] = useState<number>(75)
  const [marketLogs, setMarketLogs] = useState<string[]>([])
  const [simRunning, setSimRunning] = useState<boolean>(false)
  const [simFinished, setSimFinished] = useState<boolean>(false)
  const simLogRef = useRef<HTMLDivElement>(null)

  // Estados do Novo Simulador Xeque-Mate Avançado 6D (Modal Popup)
  const [isXequeMateModalOpen, setIsXequeMateModalOpen] = useState<boolean>(false)
  const [magicPromise, setMagicPromise] = useState<string>('Fature R$ 10.000 em 7 dias com Robô de Vendas Automático')
  const [customPromise, setCustomPromise] = useState<string>('')
  // As 6 Dimensões Reais de Esforço e Vantagem Competitiva (D1 a D6)
  const [d1SalesHours, setD1SalesHours] = useState<number>(4) // D1: Execução de Vendas (horas/dia)
  const [d2IntelHours, setD2IntelHours] = useState<number>(2) // D2: Inteligência Concorrencial (horas/dia)
  const [d3ContentDensity, setD3ContentDensity] = useState<number>(75) // D3: Densidade de Monitoria (%)
  const [d4HumanSla, setD4HumanSla] = useState<number>(15) // D4: Tempo de Resposta Humana (minutos)
  const [d5Traceability, setD5Traceability] = useState<number>(85) // D5: Rastreabilidade de Funil (%)
  const [d6HypeImmunity, setD6HypeImmunity] = useState<number>(90) // D6: Imunidade a Hype/Filtro de Ruído (%)

  const [auditLogs, setAuditLogs] = useState<string[]>([])
  const [isAuditing, setIsAuditing] = useState<boolean>(false)
  const [auditDone, setAuditDone] = useState<boolean>(false)
  const [showDirectContactAlert, setShowDirectContactAlert] = useState<boolean>(false)
  const auditLogRef = useRef<HTMLDivElement>(null)

  const currentPromise = customPromise || magicPromise

  const glitterIndex = useMemo(() => {
    let score = 20
    const text = currentPromise.toLowerCase()
    
    if (text.includes('fature') || text.includes('ganhe') || text.includes('enriquecer') || text.includes('10k') || text.includes('10.000') || text.includes('100.000') || text.includes('milhões')) score += 25
    if (text.includes('7 dias') || text.includes('rápido') || text.includes('imediato') || text.includes('fácil') || text.includes('sem esforço') || text.includes('dormindo') || text.includes('fórmula')) score += 30
    if (text.includes('robô') || text.includes('bot') || text.includes('automático') || text.includes('piloto automático')) score += 15
    
    // Imunidade a hype reduz o impacto do glitter concorrente
    const hypeFactor = (100 - d6HypeImmunity) * 0.15
    score += hypeFactor

    return Math.min(Math.round(score), 100)
  }, [currentPromise, d6HypeImmunity])

  const ivc6DScore = useMemo(() => {
    // Normalização das 6 Dimensões para escala 0-100:
    const valD1 = (d1SalesHours / 12) * 100
    const valD2 = (d2IntelHours / 8) * 100
    const valD3 = d3ContentDensity
    // SLA Humano: menor é melhor. 5min = 100, 180min = 10.
    const valD4 = Math.max(10, Math.round(100 - ((d4HumanSla - 5) / 175) * 90))
    const valD5 = d5Traceability
    const valD6 = d6HypeImmunity

    // Cálculo da Média Geométrica das 6 dimensões
    const product = Math.max(1, valD1 * valD2 * valD3 * valD4 * valD5 * valD6)
    const geometricMean = Math.pow(product, 1/6)

    // Penalidade concorrencial de Glitter
    const penalty = Math.max(0, (glitterIndex - 30) * 0.12)

    return Math.max(10, Math.min(100, Math.round(geometricMean - penalty)))
  }, [d1SalesHours, d2IntelHours, d3ContentDensity, d4HumanSla, d5Traceability, d6HypeImmunity, glitterIndex])

  const radarPoints = useMemo(() => {
    const r1 = (d1SalesHours / 12) * 80
    const r2 = (d2IntelHours / 8) * 80
    const r3 = (d3ContentDensity / 100) * 80
    const r4 = (Math.max(10, Math.round(100 - ((d4HumanSla - 5) / 175) * 90)) / 100) * 80
    const r5 = (d5Traceability / 100) * 80
    const r6 = (d6HypeImmunity / 100) * 80

    const p1x = 100 + r1 * Math.cos(0)
    const p1y = 100 + r1 * Math.sin(0)

    const p2x = 100 + r2 * Math.cos(Math.PI / 3)
    const p2y = 100 + r2 * Math.sin(Math.PI / 3)

    const p3x = 100 + r3 * Math.cos((2 * Math.PI) / 3)
    const p3y = 100 + r3 * Math.sin((2 * Math.PI) / 3)

    const p4x = 100 + r4 * Math.cos(Math.PI)
    const p4y = 100 + r4 * Math.sin(Math.PI)

    const p5x = 100 + r5 * Math.cos((4 * Math.PI) / 3)
    const p5y = 100 + r5 * Math.sin((4 * Math.PI) / 3)

    const p6x = 100 + r6 * Math.cos((5 * Math.PI) / 3)
    const p6y = 100 + r6 * Math.sin((5 * Math.PI) / 3)

    return `${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y} ${p5x},${p5y} ${p6x},${p6y}`
  }, [d1SalesHours, d2IntelHours, d3ContentDensity, d4HumanSla, d5Traceability, d6HypeImmunity])

  const competitorRadarPoints = useMemo(() => {
    const r1 = 0.8 * 80
    const r2 = 0.05 * 80
    const r3 = 0.15 * 80
    const r4 = 0.1 * 80
    const r5 = 0.1 * 80
    const r6 = 0.2 * 80

    const p1x = 100 + r1 * Math.cos(0)
    const p1y = 100 + r1 * Math.sin(0)

    const p2x = 100 + r2 * Math.cos(Math.PI / 3)
    const p2y = 100 + r2 * Math.sin(Math.PI / 3)

    const p3x = 100 + r3 * Math.cos((2 * Math.PI) / 3)
    const p3y = 100 + r3 * Math.sin((2 * Math.PI) / 3)

    const p4x = 100 + r4 * Math.cos(Math.PI)
    const p4y = 100 + r4 * Math.sin(Math.PI)

    const p5x = 100 + r5 * Math.cos((4 * Math.PI) / 3)
    const p5y = 100 + r5 * Math.sin((4 * Math.PI) / 3)

    const p6x = 100 + r6 * Math.cos((5 * Math.PI) / 3)
    const p6y = 100 + r6 * Math.sin((5 * Math.PI) / 3)

    return `${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y} ${p5x},${p5y} ${p6x},${p6y}`
  }, [])


  const runAudit = () => {
    if (isAuditing) return
    setIsAuditing(true)
    setAuditDone(false)
    setAuditLogs([])

    const logs = [
      `[INICIALIZANDO] Ativando Auditoria 6D de Verdade Radical e Tecnologia Concorrencial...`,
      `[NLP PARSING] Analisando promessa: "${currentPromise}"`,
      `[DETECTOR DE BRILHO] Glitter Index mapeado em: ${glitterIndex}% (Apelo Ilusório).`,
      `[MODEL_D1] Auditando Execução de Vendas (D1): ${d1SalesHours} horas/dia de prospecção ativa.`,
      `[MODEL_D2] Auditando Inteligência Concorrencial (D2): ${d2IntelHours} horas/dia de mapeamento real.`,
      `[MODEL_D3] Auditando Densidade de Monitoria (D3): ${d3ContentDensity}% de material e suporte estruturado.`,
      `[MODEL_D4] Auditando SLA de Resposta Humana (D4): Média de ${d4HumanSla} minutos de resposta com empatia.`,
      `[MODEL_D5] Auditando Rastreabilidade do Funil (D5): ${d5Traceability}% de dados íntegros sem achismos.`,
      `[MODEL_D6] Auditando Filtro de Hype Concorrente (D6): Imunidade avaliada em ${d6HypeImmunity}%.`,
      `[6D_COMPUTATION] Processando Média Geométrica das 6 Dimensões Operacionais...`,
      `[VERDICT] Xeque-mate na ilusão! Vantagem Humana real estabelecida com sucesso. IVC-6D: ${ivc6DScore}%.`
    ]

    let current = 0
    const interval = setInterval(() => {
      if (current < logs.length) {
        setAuditLogs(prev => [...prev, logs[current]])
        current++
      } else {
        clearInterval(interval)
        setIsAuditing(false)
        setAuditDone(true)
      }
    }, 400)
  }

  useEffect(() => {
    if (auditLogRef.current) {
      auditLogRef.current.scrollTop = auditLogRef.current.scrollHeight
    }
  }, [auditLogs])


  const handleRunMarketSim = () => {
    if (simRunning) return
    setSimRunning(true)
    setSimFinished(false)
    setMarketLogs([])

    const logs = [
      "[INIT] Inicializando Simulador Real de Vantagem Competitiva 6D...",
      "[AUDIT] Filtrando 'efeito brilho' e promessas de ganho mágico...",
      "[ANALYSIS] Contra-Xeque-Mate ativo. Desmistificando concorrência...",
      `[MODEL] Aplicando esforço de suor real calibrado a: ${effortValue}%...`,
      `[FACTS] Analisando diferenciais do pilar selecionado: [${compFactor === 'transparencia' ? 'Transparência Radical e Design de Realidade' : compFactor === 'evidencia' ? 'Garantia de Processo e Metodologia Rastreável' : 'Engenharia do Diferencial Técnico'}]...`,
      "[CONVERSATION] Conectando de pessoa para pessoa (Empatia Prática ativa)...",
      "[DADOS CONTRA NARRATIVAS] Mapeamento de concorrência limpa consolidado...",
      "[STRATEGY] Xeque-Mate desfeito! Vantagem competitiva humana homologada na nuvem."
    ]

    let current = 0
    const interval = setInterval(() => {
      if (current < logs.length) {
        setMarketLogs(prev => [...prev, logs[current]])
        current++
      } else {
        clearInterval(interval)
        setSimRunning(false)
        setSimFinished(true)
      }
    }, 350)
  }

  useEffect(() => {
    if (simLogRef.current) {
      simLogRef.current.scrollTop = simLogRef.current.scrollHeight
    }
  }, [marketLogs])

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
      }
    }
    handleTelemetry()
    window.addEventListener('ipb-telemetry', handleTelemetry)
    
    // Escuta cliques em métricas vindo de qualquer mini-card
    const handleMetricClick = (e: any) => {
      if (e.detail?.metricId) {
        setSelectedMetric(e.detail.metricId)
        setActiveTab('info')
      }
    }
    window.addEventListener('ipb-metric-click', handleMetricClick)

    // Função para buscar cotação real de USD do backend IPB
    const fetchUsdRate = async () => {
      setApiLiveStatus('FETCHING')
      try {
        const res = await fetch('/api/usd-rate')
        if (res.ok) {
          const data = await res.json()
          setUsdRate(data.rate)
        }
      } catch (err) {
        console.warn('Erro ao buscar cotação do dólar na API real:', err)
      } finally {
        setTimeout(() => setApiLiveStatus('SYNCED'), 600)
      }
    }

    // Cronômetro decrescente para a API global viva
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          fetchUsdRate()
          return 10
        }
        return prev - 1
      })
    }, 1000)

    // Busca inicial de cotação real ao montar a tela
    fetchUsdRate()

    return () => {
      window.removeEventListener('ipb-telemetry', handleTelemetry)
      window.removeEventListener('ipb-metric-click', handleMetricClick)
      clearInterval(timer)
    }
  }, [])

  // Efeito adicional para expor as variáveis globais a outros HUDs/minicards em tempo real
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      if (!win.IPBTelemetry) win.IPBTelemetry = {}
      win.IPBTelemetry.usdRate = usdRate
      win.IPBTelemetry.countdown = countdown
      win.IPBTelemetry.apiLiveStatus = apiLiveStatus
      window.dispatchEvent(new CustomEvent('ipb-telemetry'))
    }
  }, [usdRate, countdown, apiLiveStatus])

  // As 5 cascatas reais da Matriz correspondendo aos ícones do seu mockup
  const matrizRules = useMemo(() => {
    return [
      {
        icon: AlertTriangle,
        title: 'AI decisión alert cascade',
        desc: 'Aiontis de decisións reportams a mobilidades de economi...'
      },
      {
        icon: Settings,
        title: 'AI decisión alert cascade',
        desc: 'Alerriz de decisão para movidanes em othheridarie desnic...'
      },
      {
        icon: Database,
        title: 'AI decisión alert cascade',
        desc: 'Cada do csculento para vido rlesoort a areas de decisións...'
      },
      {
        icon: ShieldAlert,
        title: 'AI decisión alert cascade',
        desc: 'Suana invsamento e contempo de realiividades decisións...'
      },
      {
        icon: Activity,
        title: 'AI decisión alert cascade',
        desc: 'Alertiz iaimento de contagios: concrata dex-ræksão, fiolout...'
      }
    ]
  }, [])

  // Dicionário com todas as 8 Métricas descritas pelo usuário
  const metricsData: Record<string, MetricDetail> = {
    burnout: {
      id: 'burnout',
      title: 'Índice de Burnout Coletivo (EEB)',
      disciplines: ['Liderança e Gestão de Equipes', 'Ética Empresarial', 'Filosofia', 'Empreendedorismo Social'],
      whatIs: 'Mede o nível de exaustão emocional, cinismo e despersonalização da equipe ou de si mesmo.',
      whyImportant: 'Serve para prever quedas abruptas de produtividade e erros operacionais críticos antes que eles ocorram.',
      formula: 'EEB = \\frac{\\sum \\text{Maslach IA Adaptado}}{\\text{Total Respondentes}}',
      howToCalculate: 'Aplicação automatizada e anônima do Inventário de Burnout de Maslach (MBI) adaptado por IA via micro-pesquisas semanais de humor (Pulse Surveys).',
      cruzamento: 'Se o Burnout sobe, a Eficiência Operacional despenca e o CAC tende a subir de forma reflexa (equipes exaustas performam muito pior em campanhas de marketing, anúncios e funis de vendas).',
      swot: 'Fraqueza interna de cultura organizacional. Se não mitigada, anula as oportunidades de crescimento e se torna uma grave ameaça operacional.',
      pestel: 'Fator Social e Tecnológico: A exaustão reduz o capital humano disponível e sabota a adoção de novas ferramentas de IA no fluxo de trabalho.',
      stakeholders: 'Impacta diretamente os colaboradores (saúde mental) e os clientes (piora no atendimento e entrega do produto).'
    },
    turnover: {
      id: 'turnover',
      title: 'Taxa de Rotatividade (Turnover)',
      disciplines: ['Liderança e Gestão de Equipes', 'Análise Financeira', 'Economia de Empresa'],
      whatIs: 'Mede o fluxo percentual de entrada e saída de pessoas da empresa.',
      whyImportant: 'No painel atual, está em alarmantes 38%. Serve para avaliar se a liderança é tóxica, se o plano de cargos está defasado ou se o ambiente corporativo está insustentável.',
      formula: '\\text{Turnover} = \\frac{\\text{Admissões} + \\text{Demissões}}{2 \\times \\text{Total de Funcionários}}',
      howToCalculate: 'Extração automática mensal baseada no fluxo de admissões e desligamentos processados nos sistemas de RH.',
      cruzamento: 'Conecta-se diretamente ao WACC corporativo e à Análise Financeira. Perder um talento de alto nível custa, em média, de 1,5 a 2 vezes o salário anual dele (custos de rescisão, recrutamento, nova contratação e treinamento), provocando um sangramento invisível e contínuo no caixa.',
      swot: 'Grave fraqueza operacional. A perda contínua de conhecimento interno corrói a força competitiva contra novos entrantes.',
      pestel: 'Fator Econômico e Legal: Elevados encargos trabalhistas de rescisão somados ao aumento do custo geral de capital da empresa.',
      stakeholders: 'Prejudica severamente os investidores (queima de margem líquida) e mina a reputação perante o ecossistema de contratação.'
    },
    estresse: {
      id: 'estresse',
      title: 'Índice de Ansiedade e Estresse Clínico (IAE)',
      disciplines: ['Filosofia', 'Ética Empresarial', 'Sustentabilidade em Negócios'],
      whatIs: 'Avalia o impacto da pressão externa e interna no bem-estar psicológico e físico da equipe.',
      whyImportant: 'O Brasil lidera os índices com 9,3% no painel. Serve para definir limites de carga horária, estratégias de acolhimento e a viabilidade de escalas alternativas (como 4x3).',
      formula: '\\text{IAE} = \\text{Média(Escala PSS-10 tabulada por IA)}',
      howToCalculate: 'Questionários baseados na Escala de Estresse Percebido (PSS-10) tabulados eletronicamente e correlacionados por processamento de linguagem natural.',
      cruzamento: 'Correlaciona-se diretamente com as Demonstrações Contábeis (especificamente na linha de despesas com atestados médicos, sinistralidade de planos de saúde e absenteísmo).',
      swot: 'Ameaça latente ao fluxo operacional da empresa. O estresse crônico destrói o clima e atua como catalisador de litígios.',
      pestel: 'Fator Social e Legal: Necessidade de conformidade estrita com leis de saúde ocupacional e novos enquadramentos de riscos psicossociais.',
      stakeholders: 'Impacta colaboradores, familiares e prestadores de serviços de saúde.'
    },
    wacc: {
      id: 'wacc',
      title: 'WACC (Custo Médio Ponderado de Capital)',
      disciplines: ['Demonstrações Contábeis', 'Matemática Financeira', 'Análise Estatística'],
      whatIs: 'É o custo financeiro real ponderado para a empresa captar dinheiro no mercado (sócio ou dívida) e continuar operando.',
      whyImportant: 'Se o WACC for maior que o retorno de investimento (ROIC), a empresa está destruindo valor financeiro. No Brasil do painel, está em pesados 17,2%.',
      formula: '\\text{WACC} = K_e \\left( \\frac{E}{V} \\right) + K_d (1 - T) \\left( \\frac{D}{V} \\right)',
      howToCalculate: 'Cálculo ponderado onde Ke é o custo do capital próprio, Kd é o custo da dívida, T é a alíquota fiscal, E é capital próprio, D é dívida e V = E + D.',
      cruzamento: 'Cruza-se diretamente com a SELIC. Com a SELIC a 14,40%, o custo da dívida explode, empurrando o WACC para cima e inviabilizando empréstimos PJ que exijam alavancagem.',
      swot: 'Ameaça macroeconômica. Reduz drasticamente as margens e a capacidade de investimento próprio.',
      pestel: 'Fator Econômico: Juros elevados forçam uma reestruturação do balanço patrimonial para evitar insolvência.',
      stakeholders: 'Afeta diretamente acionistas (retorno exigido maior) e credores (risco de inadimplência).'
    },
    ltv_cac: {
      id: 'ltv_cac',
      title: 'LTV / CAC & Churn (Tripé de Crescimento)',
      disciplines: ['Cálculo Aplicado a Negócios', 'Growth Analytics', 'Análise Financeira', 'Matemática Financeira'],
      whatIs: 'LTV (valor gerado ao longo da vida do cliente), CAC (custo para trazer o cliente) e Churn (taxa de cancelamento que esvazia a base) são as 3 métricas vitais que definem se o crescimento da sua empresa é real ou suicida.',
      whyImportant: 'A Regra de Ouro: LTV deve ser maior que 3x o CAC (LTV > 3x CAC). Crescer com um LTV/CAC < 1 significa pagar para trabalhar; quanto mais a empresa cresce sob essa condição, mais rápido ela queima caixa e caminha para a falência total.',
      formula: '\\text{LTV} = \\frac{\\text{Receita Média por Cliente} \\times \\text{Margem}}{\\text{Churn}} \\quad \\text{vs} \\quad \\text{CAC} = \\frac{\\text{Investimento Total de Mídia}}{\\text{Novos Clientes}}',
      howToCalculate: 'Dividindo o Lifetime Value consolidado (LTV) pelo Custo de Aquisição de Clientes (CAC) e cruzando ativamente com o Churn mensal da base de usuários.',
      cruzamento: 'Regra de Decisão do Tripé: Se o Churn aumenta, a vida média do cliente (LTV) encolhe drasticamente, empurrando o índice LTV/CAC para níveis perigosos. A IA do sistema monitora essa relação e, caso atinja níveis de risco, sugere otimizações no pós-venda, ajuste de metas e realocação de mídia.',
      swot: 'Força principal de sustentabilidade. Manter o LTV > 3x CAC com Churn sob controle protege a geração de caixa livre contra oscilações de mercado.',
      pestel: 'Fator Econômico e Tecnológico: A automação inteligente de CRM/NLP atua diretamente para reter o cliente, reduzindo o Churn e otimizando a eficiência de mídia.',
      stakeholders: 'Fornece garantia de longevidade e segurança financeira para fundadores, sócios e investidores.'
    },
    ebitda: {
      id: 'ebitda',
      title: 'Margem EBITDA Operacional',
      disciplines: ['Demonstrações Contábeis', 'Análise Financeira', 'Cálculo Aplicado'],
      whatIs: 'Mede a pura lucratividade operacional da operação, eliminando efeitos de juros, impostos, depreciação e amortização.',
      whyImportant: 'Mostra se o coração operacional do negócio é rentável e eficiente por si só.',
      formula: '\\text{EBITDA} = \\text{Lucro Operacional} + \\text{Depreciação} + \\text{Amortização}',
      howToCalculate: 'A partir da DRE (Demonstração do Resultado do Exercício), somando-se depreciação e amortização ao LAJIR.',
      cruzamento: 'Conecta-se intimamente ao Burnout. Empresas que inflam o EBITDA no curto prazo esfolando e esgotando a saúde mental da equipe criam um passivo perigoso, pois o Turnover e os atestados subsequentes destroem as margens nos meses seguintes.',
      swot: 'Força operacional central. Um EBITDA robusto protege o caixa das tempestades financeiras externas.',
      pestel: 'Fator Econômico: Capacidade de resiliência e geração de fluxo de caixa livre sob alta inflação e juros reais elevadíssimos.',
      stakeholders: 'Mapeado com prioridade por analistas de M&A, fundos de investimento e conselho de administração.'
    },
    juros_real: {
      id: 'juros_real',
      title: 'Taxa Real de Juros',
      disciplines: ['Ambiente Macroecônomico', 'Matemática Financeira', 'Análise Estatística'],
      whatIs: 'É a taxa de juros nominal da economia (SELIC) descontada a taxa de inflação (IPCA).',
      whyImportant: 'Com SELIC a 14,40% e IPCA a 4,39%, o juro real brasileiro está em alarmantes ~10,01%, travando investimentos industriais e de infraestrutura física.',
      formula: '\\text{Taxa Real} = \\frac{1 + \\text{SELIC}}{1 + \\text{IPCA}} - 1',
      howToCalculate: 'Calculado dividindo 1 + taxa Selic acumulada por 1 + inflação oficial (IPCA), subtraindo-se 1.',
      cruzamento: 'Cruza-se com as decisões de CAPEX. Com juro real a 10%, a tentativa de decisão inteligente da IA recomenda travar investimentos físicos pesados e focar em eficiência digital, SaaS e automação inteligente.',
      swot: 'Ameaça externa persistente do ambiente macroeconômico.',
      pestel: 'Fator Econômico: Direcionador essencial que esmaga o poder de consumo geral do varejo tradicional.',
      stakeholders: 'Direciona as decisões de alocação de caixa de tesouraria de sócios e diretores de investimento.'
    },
    pe_ratio: {
      id: 'pe_ratio',
      title: 'P/E Ratio (Preço / Lucro da Bolsa)',
      disciplines: ['Ambiente Macroecônomico', 'Análise Financeira', 'Inovação & Mercado'],
      whatIs: 'Mede o nível de múltiplos que o investidor aceita pagar pelo lucro das ações negociadas.',
      whyImportant: 'No Brasil está em descontados 8,2x (barato devido aos juros altos) vs. 17,2x no mercado global (otimista). Mostra o valuation relativo.',
      formula: '\\text{P/E Ratio} = \\frac{\\text{Preço da Ação}}{\\text{Lucro por Ação (LPA)}}',
      howToCalculate: 'Divisão do valor de mercado total da empresa pelo seu lucro líquido consolidado do exercício.',
      cruzamento: 'Cruza-se com o custo de oportunidade. A bolsa subvalorizada reflete o fluxo de investidores migrando para a segurança da renda fixa devido aos juros altos do CDI.',
      swot: 'Oportunidade (para M&A e aquisições baratas) e Ameaça (para captação de recursos públicos via IPO).',
      pestel: 'Fator Econômico: Desvalorização sistêmica dos múltiplos das empresas locais frente a moedas fortes.',
      stakeholders: 'Afeta acionistas majoritários e fundadores interessados em liquidez.'
    }
  }

  const selectedMetricInfo = selectedMetric ? metricsData[selectedMetric] : null

  return (
    <div className="w-full flex flex-col gap-6" style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}>
      
      {/* Cabeçalho Executivo do Cockpit com LEDs e Status da API Vivos */}
      <div className="w-full flex justify-between items-center bg-black/45 border border-white/5 p-4 rounded-2xl backdrop-blur-md select-none">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#d2af5a] animate-pulse shadow-[0_0_8px_#d2af5a]" />
          <h1 className="text-white text-xs font-light tracking-[0.15em] uppercase">
            BUSINESS INTELLIGENCE <span className="text-[#d2af5a] font-normal">COCKPIT 6D</span>
          </h1>
        </div>
        
        {/* Telemetria Real-Time de Conexão NASA-level */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-black/55 border border-[#d2af5a]/15 rounded-xl text-[8.5px] font-mono tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span className="text-white/30">APIs GLOBAL SYNC:</span>
            <span className={`font-bold ${apiLiveStatus === 'FETCHING' ? 'text-amber-400' : 'text-emerald-400'}`}>{apiLiveStatus}</span>
            <span className="text-white/20">|</span>
            <span className="text-white/30">REFRESH EM:</span>
            <span className="text-[#d2af5a] font-bold">{countdown}s</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-black/40 border border-white/5 rounded-xl text-[9px] text-white/50 tracking-wider font-mono">
            <span>(D) MAIO 2026 · LIVE DATA SYSTEM</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cockpit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 1024px) {
          .cockpit-grid {
            grid-template-columns: 38% 62% !important;
            height: 840px !important; /* Alinhamento milimétrico exato e perfeito */
          }
        }
        .hud-card-interactive {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hud-card-interactive:hover {
          border-color: rgba(210, 175, 90, 0.5) !important;
          box-shadow: 0 0 20px rgba(210, 175, 90, 0.12) !important;
          transform: translateY(-2px);
        }
        .modal-glass {
          background: rgba(10, 10, 14, 0.94);
          backdrop-filter: blur(35px);
          border: 1.5px solid rgba(210, 175, 90, 0.45);
          box-shadow: 0 0 45px rgba(210, 175, 90, 0.18);
        }
      `}} />

      {/* Grade Principal */}
      <div className="w-full cockpit-grid items-stretch">
        
        {/* COLUNA ESQUERDA: Os 4 Mini-Cards em vidro e dourado (Altura travada exata em 195px por card + gaps de 20px = 840px) */}
        <div className="flex flex-col gap-[20px] h-full justify-between">
          
          {/* Card 1: Pessoas (Pilar 1 ou Pilar 2 se ativo) */}
          <div 
            onClick={() => setActivePillar(activePillar === 'capital_humano' ? 'financas' : 'capital_humano')}
            className={`hud-card-interactive group relative overflow-hidden flex flex-col justify-between p-0.5 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl h-[195px] transition-all ${activePillar === 'capital_humano' ? 'border-[#d2af5a] shadow-[0_0_15px_rgba(210,175,90,0.25)]' : 'border-[#d2af5a]/25'}`}
          >
            {activePillar === 'capital_humano' ? <MiniFinancas /> : <MiniCapitalHumano />}
          </div>

          {/* Card 2: Estratégia (Pilar 3 ou Pilar 2 se ativo) */}
          <div 
            onClick={() => setActivePillar(activePillar === 'estrategia' ? 'financas' : 'estrategia')}
            className={`hud-card-interactive group relative overflow-hidden flex flex-col justify-between p-0.5 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl h-[195px] transition-all ${activePillar === 'estrategia' ? 'border-[#d2af5a] shadow-[0_0_15px_rgba(210,175,90,0.25)]' : 'border-[#d2af5a]/25'}`}
          >
            {activePillar === 'estrategia' ? <MiniFinancas /> : <MiniEstrategia />}
          </div>

          {/* Card 3: ESG (ESG ou Pilar 2 se ativo) */}
          <div 
            onClick={() => setActivePillar(activePillar === 'esg' ? 'financas' : 'esg')}
            className={`hud-card-interactive group relative overflow-hidden flex flex-col justify-between p-0.5 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl h-[195px] transition-all ${activePillar === 'esg' ? 'border-[#d2af5a] shadow-[0_0_15px_rgba(210,175,90,0.25)]' : 'border-[#d2af5a]/25'}`}
          >
            {activePillar === 'esg' ? <MiniFinancas /> : <MiniEsg />}
          </div>

          {/* Card 4: AI Assistant (Persistente no final da coluna esquerda, agora interativo!) */}
          <div 
            onClick={() => setActivePillar(activePillar === 'ai' ? 'financas' : 'ai')}
            className={`hud-card-interactive group relative overflow-hidden flex flex-col justify-between p-0.5 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl h-[195px] transition-all ${activePillar === 'ai' ? 'border-[#d2af5a] shadow-[0_0_15px_rgba(210,175,90,0.25)]' : 'border-[#d2af5a]/25'}`}
          >
            {activePillar === 'ai' ? <MiniFinancas /> : <MiniAi />}
          </div>
        </div>

        {/* COLUNA DIREITA: HUD Ativo + Matriz 6D no Rodapé */}
        <div className="flex flex-col gap-[20px] h-full justify-between">
          
          {/* Container do HUD Ativo (Travado em 560px de altura para alinhamento milimétrico) */}
          <div className="w-full h-[560px]">
            {activePillar === 'financas' && <HudFinancas />}
            {activePillar === 'capital_humano' && <HudCapitalHumano />}
            {activePillar === 'estrategia' && <HudEstrategia />}
            {activePillar === 'esg' && <HudEsg />}
            {activePillar === 'ai' && <HudAi />}
          </div>

          {/* MATRIZ DE INTERDEPENDÊNCIA 6D (Travado em 260px de altura - Agora convertida no Simulador Concorrencial Contra-Xeque-Mate 6D) */}
          <div className="p-3 rounded-3xl backdrop-blur-xl border flex flex-col justify-between h-[260px] select-text" style={{ background: 'rgba(8, 8, 10, 0.85)', borderColor: 'rgba(210, 175, 90, 0.25)' }}>
            
            {/* Header do Simulador */}
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5 shrink-0">
              <div className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-[#d2af5a] animate-pulse" />
                <span className="text-[8.5px] font-bold uppercase tracking-[0.15em] text-[#d2af5a]">
                  🛰️ SIMULADOR DE VANTAGEM COMPETITIVA & CONTRA-XEQUE-MATE 6D
                </span>
              </div>
              <span className="text-[6.5px] font-mono text-white/35 uppercase tracking-widest">Pessoa para Pessoa • 100% Auditável</span>
            </div>

            {/* Layout Interno em Duas Colunas */}
            <div className="flex-1 flex gap-3 pt-2 overflow-hidden items-stretch">
              
              {/* Coluna Esquerda: Painel 6D de Esforço & Sliders Avançados (58% largura) */}
              <div className="w-[58%] flex flex-col justify-between text-left space-y-1.5 overflow-visible shrink-0 pr-1 border-r border-white/5">
                
                {/* 6D Metrics Mini-Grid */}
                <div className="space-y-1 select-none">
                  <span className="block text-[6.8px] font-mono text-white/45 uppercase tracking-widest leading-none">
                    Métricas de Esforço Real & Blindagem 6D
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="p-1 rounded bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[5.5px] font-mono text-white/45 uppercase">D1: Execução</span>
                      <span className="text-[7.8px] font-bold font-mono text-[#d2af5a]">{d1SalesHours}h/dia</span>
                    </div>
                    <div className="p-1 rounded bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[5.5px] font-mono text-white/45 uppercase">D2: Intel</span>
                      <span className="text-[7.8px] font-bold font-mono text-[#d2af5a]">{d2IntelHours}h/dia</span>
                    </div>
                    <div className="p-1 rounded bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[5.5px] font-mono text-white/45 uppercase">D3: Monitoria</span>
                      <span className="text-[7.8px] font-bold font-mono text-[#d2af5a]">{d3ContentDensity}%</span>
                    </div>
                    <div className="p-1 rounded bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[5.5px] font-mono text-white/45 uppercase">D4: SLA</span>
                      <span className="text-[7.8px] font-bold font-mono text-[#d2af5a]">{d4HumanSla}m</span>
                    </div>
                    <div className="p-1 rounded bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[5.5px] font-mono text-white/45 uppercase">D5: Rastreio</span>
                      <span className="text-[7.8px] font-bold font-mono text-[#d2af5a]">{d5Traceability}%</span>
                    </div>
                    <div className="p-1 rounded bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[5.5px] font-mono text-white/45 uppercase">D6: Imunidade</span>
                      <span className="text-[7.8px] font-bold font-mono text-[#d2af5a]">{d6HypeImmunity}%</span>
                    </div>
                  </div>
                </div>

                {/* Sliders rápidos da Home */}
                <div className="space-y-1 select-none">
                  <div className="flex justify-between items-center text-[7px] font-mono text-white/55 leading-none">
                    <span>Ajustar D1 (Prospecção Diária):</span>
                    <b className="text-white font-mono font-bold">{d1SalesHours}h/dia</b>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={d1SalesHours}
                    onChange={(e) => setD1SalesHours(Number(e.target.value))}
                    className="w-full h-0.5 bg-white/5 rounded appearance-none cursor-pointer accent-[#d2af5a]"
                  />
                  <div className="flex justify-between items-center text-[7px] font-mono text-white/55 leading-none">
                    <span>Ajustar D4 (SLA Resposta):</span>
                    <b className="text-white font-mono font-bold">{d4HumanSla} min</b>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="180"
                    step="5"
                    value={d4HumanSla}
                    onChange={(e) => setD4HumanSla(Number(e.target.value))}
                    className="w-full h-0.5 bg-white/5 rounded appearance-none cursor-pointer accent-[#d2af5a]"
                  />
                </div>

                {/* Botões de Ativação do Simulador */}
                <div className="flex items-center gap-2 pt-0.5 select-none">
                  <button
                    onClick={handleRunMarketSim}
                    disabled={simRunning}
                    className="px-2 py-1.5 bg-black/40 hover:bg-[#d2af5a]/10 disabled:bg-white/5 disabled:text-white/20 border border-[#d2af5a]/20 hover:border-[#d2af5a]/60 text-white/80 hover:text-[#d2af5a] font-mono text-[8px] font-bold rounded-lg transition-all duration-200 flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Play className={`h-2.5 w-2.5 ${simRunning ? 'animate-spin text-[#d2af5a]' : 'text-[#d2af5a]'}`} />
                    {simRunning ? 'RODANDO...' : 'SIMULAÇÃO RÁPIDA'}
                  </button>

                  <button
                    onClick={() => {
                      setIsXequeMateModalOpen(true)
                      setTimeout(() => runAudit(), 100)
                    }}
                    className="px-2 py-1.5 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/25 border border-[#d2af5a]/40 hover:border-[#d2af5a] text-[#d2af5a] hover:text-white font-mono text-[8px] font-bold rounded-lg transition-all duration-200 flex items-center gap-1 cursor-pointer shrink-0 animate-pulse"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-[#d2af5a]" />
                    🔍 REJEITAR ILUSÃO: SIMULADOR 6D
                  </button>
                  
                  <span className="text-[6.2px] text-white/35 leading-tight overflow-hidden text-ellipsis whitespace-nowrap hidden xl:inline max-w-[80px]">
                    {compFactor === 'transparencia' && "Transparência"}
                    {compFactor === 'evidencia' && "Evidências"}
                    {compFactor === 'auditoria' && "Auditoria"}
                  </span>
                </div>
              </div>

              {/* Coluna Direita: Terminal IA de Monitoria Concorrencial (42% largura) */}
              <div className="flex-1 flex flex-col justify-between space-y-1.5 overflow-hidden">
                {/* Terminal de Logs */}
                <div 
                  ref={simLogRef}
                  className="flex-1 bg-[#050507] border border-white/5 rounded-xl p-2 font-mono text-[7.5px] text-[#d2af5a]/95 space-y-0.5 overflow-y-auto ipb-thinscroll text-left leading-relaxed"
                >
                  {marketLogs.length === 0 ? (
                    <div className="text-white/20 italic pt-6 text-center leading-normal">
                      Aguardando ativação...<br/>
                      Inicie a simulação para escanear a vantagem concorrencial real 6D.
                    </div>
                  ) : (
                    marketLogs.map((log, idx) => (
                      <div key={idx}>
                        <span className="text-white/20 font-sans mr-1">[{new Date().toLocaleTimeString()}]</span>
                        {log}
                      </div>
                    ))
                  )}
                </div>

                {/* Painel de Resultados do Contra-Xeque-Mate */}
                <div className="grid grid-cols-3 gap-1 bg-[#d2af5a]/5 p-1 rounded-lg border border-[#d2af5a]/15 text-center shrink-0">
                  <div>
                    <span className="text-[6px] text-white/45 uppercase font-mono block">Engodo Mágico</span>
                    <span className="text-[8.5px] font-bold text-red-400 font-mono">0% (Filtro)</span>
                  </div>
                  <div>
                    <span className="text-[6px] text-white/45 uppercase font-mono block">Rastreabilidade</span>
                    <span className="text-[8.5px] font-bold text-emerald-400 font-mono">100% Auditável</span>
                  </div>
                  <div>
                    <span className="text-[6px] text-white/45 uppercase font-mono block">Confiança Real</span>
                    <span className="text-[8.5px] font-bold text-[#d2af5a] font-mono">{simFinished ? '98%' : '74%'}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* POPUP MODAL INTERATIVO DE ALTA FIDELIDADE (SWOT, PESTEL, INTEGRAL) */}
      {selectedMetricInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300">
          <div className="modal-glass w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col select-none relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#d2af5a]/20 flex justify-between items-start bg-black/40">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Info className="h-4.5 w-4.5 text-[#d2af5a]" />
                  <span className="text-[10px] font-bold font-mono tracking-widest text-[#d2af5a] uppercase">MÉTRICA CORPORATIVA 6D</span>
                </div>
                <h2 className="text-white text-lg font-bold tracking-wide mt-1">
                  {selectedMetricInfo.title}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedMetricInfo.disciplines.map((d, i) => (
                    <span key={i} className="text-[7.5px] font-semibold text-white/55 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setSelectedMetric(null)}
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#d2af5a]/10 hover:border-[#d2af5a]/40 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="flex border-b border-[#d2af5a]/15 bg-black/25">
              <button 
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-3 text-center text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'info' ? 'text-[#d2af5a] border-b-2 border-[#d2af5a] bg-[#d2af5a]/5' : 'text-white/40 hover:text-white/80'}`}
              >
                O que é & Para que serve
              </button>
              <button 
                onClick={() => setActiveTab('formula')}
                className={`flex-1 py-3 text-center text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'formula' ? 'text-[#d2af5a] border-b-2 border-[#d2af5a] bg-[#d2af5a]/5' : 'text-white/40 hover:text-white/80'}`}
              >
                Fórmula & Cálculo
              </button>
              <button 
                onClick={() => setActiveTab('cruzamento')}
                className={`flex-1 py-3 text-center text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'cruzamento' ? 'text-[#d2af5a] border-b-2 border-[#d2af5a] bg-[#d2af5a]/5' : 'text-white/40 hover:text-white/80'}`}
              >
                Interdependência (Cruzamentos)
              </button>
              <button 
                onClick={() => setActiveTab('swot')}
                className={`flex-1 py-3 text-center text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'swot' ? 'text-[#d2af5a] border-b-2 border-[#d2af5a] bg-[#d2af5a]/5' : 'text-white/40 hover:text-white/80'}`}
              >
                SWOT & PESTEL Vivas
              </button>
            </div>

            {/* Modal Contents */}
            <div className="p-6 overflow-y-auto max-h-[350px] bg-black/10">
              
              {/* TAB 1: INFO */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <h3 className="text-[#d2af5a] text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Definição Operacional</h3>
                    <p className="text-white/85 text-xs font-light leading-relaxed">
                      {selectedMetricInfo.whatIs}
                    </p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <h3 className="text-[#d2af5a] text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Finalidade Corporativa (Para que serve)</h3>
                    <p className="text-white/85 text-xs font-light leading-relaxed">
                      {selectedMetricInfo.whyImportant}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: FORMULA */}
              {activeTab === 'formula' && (
                <div className="space-y-4">
                  <div className="p-5 bg-black/60 border border-[#d2af5a]/20 rounded-2xl flex flex-col items-center justify-center min-h-[90px]">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-3">Modelagem Matemática / Equação</span>
                    <span className="text-white text-base font-mono font-medium select-all hover:text-[#d2af5a] transition-colors leading-none tracking-wide text-center">
                      {selectedMetricInfo.formula}
                    </span>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <h3 className="text-[#d2af5a] text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Método de Cálculo</h3>
                    <p className="text-white/85 text-xs font-light leading-relaxed">
                      {selectedMetricInfo.howToCalculate}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: CRUZAMENTO */}
              {activeTab === 'cruzamento' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#d2af5a]/5 border border-[#d2af5a]/25 rounded-2xl">
                    <h3 className="text-[#d2af5a] text-[10px] font-bold uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      Regra de Decisão Cruzada & Impacto 6D
                    </h3>
                    <p className="text-white/90 text-xs font-light leading-relaxed">
                      {selectedMetricInfo.cruzamento}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: SWOT & PESTEL */}
              {activeTab === 'swot' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <h3 className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Enquadramento SWOT</h3>
                      <p className="text-white/80 text-xs font-light leading-relaxed">
                        {selectedMetricInfo.swot}
                      </p>
                    </div>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <h3 className="text-[#d2af5a] text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Análise PESTEL Dinâmica</h3>
                      <p className="text-white/80 text-xs font-light leading-relaxed">
                        {selectedMetricInfo.pestel}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <h3 className="text-sky-400 text-[10px] font-bold uppercase tracking-widest font-mono mb-2">Impacto nos Stakeholders</h3>
                    <p className="text-white/80 text-xs font-light leading-relaxed">
                      {selectedMetricInfo.stakeholders}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#d2af5a]/15 bg-black/40 flex justify-between items-center text-[8.5px] font-mono text-white/35">
              <span>Vertex AI Google Developer Ultra Processed</span>
              <button 
                onClick={() => setSelectedMetric(null)}
                className="px-4 py-1.5 rounded-lg bg-[#d2af5a] hover:bg-[#d2af5a]/80 text-[#0c0a07] font-bold uppercase tracking-wider text-[8px] transition-all cursor-pointer"
              >
                Fechar Painel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* POPUP MODAL SIMULADOR AVANÇADO CONTRA-XEQUE-MATE 6D */}
      {isXequeMateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300">
          <div className="modal-glass w-full max-w-4xl rounded-3xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200 text-left select-text" style={{ borderColor: 'rgba(210, 175, 90, 0.4)' }}>
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#d2af5a]/20 flex justify-between items-start bg-black/40 select-none">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#d2af5a] animate-pulse" />
                  <span className="text-[10px] font-bold font-mono tracking-[0.2em] text-[#d2af5a] uppercase">SIMULADOR CONCORRENCIAL 6D</span>
                </div>
                <h2 className="text-white text-lg font-bold tracking-wide mt-1">
                  Contra-Xeque-Mate: O Diferencial Humano Sem Filtro
                </h2>
                <p className="text-white/45 text-[10px] font-mono leading-relaxed mt-1">
                  Escanear, auditar e vencer o "efeito brilho" e as falsas promessas de mercado com dados, processo e suor.
                </p>
              </div>
              <button 
                onClick={() => setIsXequeMateModalOpen(false)}
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#d2af5a]/10 hover:border-[#d2af5a]/40 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[500px] bg-black/25 flex flex-col gap-6">
              
              {/* Grid de Entrada e Análise */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                
                {/* COLUNA ESQUERDA: Configuração de Cenários (Inputs) */}
                <div className="flex flex-col gap-5 bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
                  
                  {/* Seção 1: A Promessa Concorrente (Hype) */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[#d2af5a] text-[9.5px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 select-none">
                      <Sparkles className="h-3.5 w-3.5 text-[#d2af5a] animate-pulse" />
                      1. A Promessa Mágica Concorrente (Efeito Brilho)
                    </span>
                    
                    {/* Templates rápidos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 select-none">
                      {[
                        'Fature R$ 10.000 em 7 dias com Robô do WhatsApp',
                        'Aprenda Persuasão Avançada em 4 Horas sem Esforço',
                        'Garantia de 100% de Aprovação em Concursos sem Estudo',
                        'Estudos de Competição Inteligente 100% no Piloto Automático'
                      ].map((promise, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setMagicPromise(promise);
                            setCustomPromise('');
                          }}
                          className={`px-2 py-1.5 rounded-lg text-[9px] font-mono text-left transition border leading-tight ${magicPromise === promise && !customPromise ? 'bg-[#d2af5a]/15 text-[#d2af5a] border-[#d2af5a]/40' : 'bg-black/35 text-white/50 border-white/5 hover:border-white/15'}`}
                        >
                          {promise}
                        </button>
                      ))}
                    </div>

                    {/* Custom Input */}
                    <div className="flex flex-col gap-1 mt-1">
                      <span className="text-[8px] font-mono text-white/30 uppercase select-none">Ou digite uma promessa específica:</span>
                      <input
                        type="text"
                        value={customPromise}
                        placeholder="Ex: Fique rico investindo 5 minutos por dia..."
                        onChange={(e) => setCustomPromise(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d2af5a]/50"
                      />
                    </div>
                  </div>

                  {/* Seção 2: As 6 Dimensões Operacionais do Esforço Real */}
                  <div className="flex flex-col gap-3.5 border-t border-white/5 pt-4">
                    <span className="text-[#d2af5a] text-[9.5px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 select-none">
                      <Flame className="h-3.5 w-3.5 text-amber-500" />
                      2. Configurar as 6 Dimensões de Esforço Real (Fatos)
                    </span>

                    {/* D1 */}
                    <div className="flex flex-col gap-0.5 bg-black/25 p-2.5 border border-white/5 rounded-xl">
                      <div className="flex justify-between items-center text-[9px] font-mono select-none">
                        <span className="text-white/80 font-bold">D1: Execução de Vendas (Sales outreach)</span>
                        <b className="text-[#d2af5a] font-mono font-bold">{d1SalesHours} horas/dia</b>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="1"
                        value={d1SalesHours}
                        onChange={(e) => setD1SalesHours(Number(e.target.value))}
                        className="w-full h-1 bg-white/5 rounded appearance-none cursor-pointer accent-[#d2af5a] select-none"
                      />
                      <span className="text-[7.5px] text-white/35 font-sans leading-none mt-1 select-none">
                        *Como medir: Quantidade de horas de prospecção ativa de leads e reuniões comerciais por dia.
                      </span>
                    </div>

                    {/* D2 */}
                    <div className="flex flex-col gap-0.5 bg-black/25 p-2.5 border border-white/5 rounded-xl">
                      <div className="flex justify-between items-center text-[9px] font-mono select-none">
                        <span className="text-white/80 font-bold">D2: Inteligência Concorrencial (Market Intel)</span>
                        <b className="text-[#d2af5a] font-mono font-bold">{d2IntelHours} horas/dia</b>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="8"
                        step="1"
                        value={d2IntelHours}
                        onChange={(e) => setD2IntelHours(Number(e.target.value))}
                        className="w-full h-1 bg-white/5 rounded appearance-none cursor-pointer accent-[#d2af5a] select-none"
                      />
                      <span className="text-[7.5px] text-white/35 font-sans leading-none mt-1 select-none">
                        *Como medir: Horas gastas por dia auditando preços, features e funis de marketing dos concorrentes.
                      </span>
                    </div>

                    {/* D3 */}
                    <div className="flex flex-col gap-0.5 bg-black/25 p-2.5 border border-white/5 rounded-xl">
                      <div className="flex justify-between items-center text-[9px] font-mono select-none">
                        <span className="text-white/80 font-bold">D3: Densidade de Monitoria (Mentorship Ratio)</span>
                        <b className="text-[#d2af5a] font-mono font-bold">{d3ContentDensity}%</b>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={d3ContentDensity}
                        onChange={(e) => setD3ContentDensity(Number(e.target.value))}
                        className="w-full h-1 bg-white/5 rounded appearance-none cursor-pointer accent-[#d2af5a] select-none"
                      />
                      <span className="text-[7.5px] text-white/35 font-sans leading-none mt-1 select-none">
                        *Como medir: Proporção de materiais, aulas gravadas e reuniões de mentoria entregues vs. promessas rasas.
                      </span>
                    </div>

                    {/* D4 */}
                    <div className="flex flex-col gap-0.5 bg-black/25 p-2.5 border border-white/5 rounded-xl">
                      <div className="flex justify-between items-center text-[9px] font-mono select-none">
                        <span className="text-white/80 font-bold">D4: SLA de Resposta Humana (Human Response)</span>
                        <b className="text-[#d2af5a] font-mono font-bold">{d4HumanSla} minutos</b>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="180"
                        step="5"
                        value={d4HumanSla}
                        onChange={(e) => setD4HumanSla(Number(e.target.value))}
                        className="w-full h-1 bg-white/5 rounded appearance-none cursor-pointer accent-[#d2af5a] select-none"
                      />
                      <span className="text-[7.5px] text-white/35 font-sans leading-none mt-1 select-none">
                        *Como medir: SLA médio em minutos que um especialista real leva para responder dúvidas críticas de leads/clientes.
                      </span>
                    </div>

                    {/* D5 */}
                    <div className="flex flex-col gap-0.5 bg-black/25 p-2.5 border border-white/5 rounded-xl">
                      <div className="flex justify-between items-center text-[9px] font-mono select-none">
                        <span className="text-white/80 font-bold">D5: Rastreabilidade de Funil (CRM Integrity)</span>
                        <b className="text-[#d2af5a] font-mono font-bold">{d5Traceability}%</b>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={d5Traceability}
                        onChange={(e) => setD5Traceability(Number(e.target.value))}
                        className="w-full h-1 bg-white/5 rounded appearance-none cursor-pointer accent-[#d2af5a] select-none"
                      />
                      <span className="text-[7.5px] text-white/35 font-sans leading-none mt-1 select-none">
                        *Como medir: Percentual de interações de vendas e acompanhamento registradas ativamente no CRM sem "achismos".
                      </span>
                    </div>

                    {/* D6 */}
                    <div className="flex flex-col gap-0.5 bg-black/25 p-2.5 border border-white/5 rounded-xl">
                      <div className="flex justify-between items-center text-[9px] font-mono select-none">
                        <span className="text-white/80 font-bold">D6: Imunidade a Hype & Filtro de Ruído</span>
                        <b className="text-[#d2af5a] font-mono font-bold">{d6HypeImmunity}%</b>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={d6HypeImmunity}
                        onChange={(e) => setD6HypeImmunity(Number(e.target.value))}
                        className="w-full h-1 bg-white/5 rounded appearance-none cursor-pointer accent-[#d2af5a] select-none"
                      />
                      <span className="text-[7.5px] text-white/35 font-sans leading-none mt-1 select-none">
                        *Como medir: Resistência interna de processos corporativos contra modas do mercado e táticas insustentáveis.
                      </span>
                    </div>

                  </div>

                </div>

                {/* COLUNA DIREITA: Visualização 6D Radar, Pitch de Vendas & Terminal */}
                <div className="flex flex-col gap-4 justify-between bg-white/[0.01] border border-white/5 p-4 rounded-2xl overflow-hidden">
                  
                  {/* Título da Telemetria Visual */}
                  <div className="flex justify-between items-center select-none">
                    <span className="text-[#d2af5a] text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-[#d2af5a]" />
                      3. Arena de Cristalização 6D (Radar de Fatos vs. Hype)
                    </span>
                    <div className="flex gap-2 text-[6.5px] font-mono">
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#d2af5a]" /> Seu Negócio</span>
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Concorrente</span>
                    </div>
                  </div>

                  {/* ARENA DE CRISTALIZAÇÃO: O Radar SVG Reativo */}
                  <div className="flex items-center justify-center bg-black/60 p-2.5 border border-white/5 rounded-2xl relative select-none">
                    
                    <svg viewBox="0 0 200 200" className="w-[185px] h-[185px] drop-shadow-[0_0_10px_rgba(210,175,90,0.15)]">
                      {/* Concentric rings representam intervalos de 25%, 50%, 75%, 100% */}
                      <circle cx="100" cy="100" r="20" className="stroke-white/5 fill-none" strokeWidth="0.5" strokeDasharray="1,2" />
                      <circle cx="100" cy="100" r="40" className="stroke-white/5 fill-none" strokeWidth="0.5" strokeDasharray="1,2" />
                      <circle cx="100" cy="100" r="60" className="stroke-white/10 fill-none" strokeWidth="0.5" />
                      <circle cx="100" cy="100" r="80" className="stroke-[#d2af5a]/10 fill-none" strokeWidth="0.8" />

                      {/* Eixos Grid e Linhas Radiais de Conexão */}
                      {Array.from({ length: 6 }).map((_, idx) => {
                        const angle = (idx * Math.PI) / 3;
                        const targetX = 100 + 80 * Math.cos(angle);
                        const targetY = 100 + 80 * Math.sin(angle);
                        return (
                          <line
                            key={idx}
                            x1="100"
                            y1="100"
                            x2={targetX}
                            y2={targetY}
                            className="stroke-white/5"
                            strokeWidth="0.5"
                          />
                        );
                      })}

                      {/* Polígono Vermelho: O Concorrente Hype (Opaco, distorcido e fraco fora da D1) */}
                      <polygon
                        points={competitorRadarPoints}
                        className="stroke-red-500/70 fill-red-500/15 transition-all duration-300"
                        strokeWidth="1"
                      />

                      {/* Polígono Dourado: Sua Operação Real baseada nas 6 dimensões */}
                      <polygon
                        points={radarPoints}
                        className="stroke-[#d2af5a] fill-[#d2af5a]/25 transition-all duration-500 shadow-[0_0_15px_#d2af5a]"
                        strokeWidth="1.5"
                      />

                      {/* Lápis de Vértices e Tags de Dimensão */}
                      <text x="180" y="103" className="fill-white/60 font-mono text-[5.5px] font-bold text-center leading-none">D1</text>
                      <text x="135" y="180" className="fill-white/60 font-mono text-[5.5px] font-bold text-center leading-none">D2</text>
                      <text x="50" y="180" className="fill-white/60 font-mono text-[5.5px] font-bold text-center leading-none">D3</text>
                      <text x="10" y="103" className="fill-white/60 font-mono text-[5.5px] font-bold text-center leading-none">D4</text>
                      <text x="50" y="23" className="fill-white/60 font-mono text-[5.5px] font-bold text-center leading-none">D5</text>
                      <text x="135" y="23" className="fill-white/60 font-mono text-[5.5px] font-bold text-center leading-none">D6</text>
                    </svg>

                    {/* Badge do Score Geométrico */}
                    <div className="absolute top-2 left-2 flex flex-col items-center bg-black/80 border border-[#d2af5a]/20 px-2 py-1 rounded-xl shadow-lg">
                      <span className="text-[5.5px] font-mono text-white/40 uppercase leading-none">IVC-6D SCORE</span>
                      <b className="text-[12px] font-mono font-bold text-[#d2af5a] mt-0.5">{ivc6DScore}%</b>
                    </div>

                    <div className="absolute top-2 right-2 flex flex-col items-center bg-black/80 border border-red-500/20 px-2 py-1 rounded-xl shadow-lg">
                      <span className="text-[5.5px] font-mono text-white/40 uppercase leading-none">GLITTER INDEX</span>
                      <b className="text-[12px] font-mono font-bold text-red-400 mt-0.5">{glitterIndex}%</b>
                    </div>
                  </div>

                  {/* GERADOR DE ARGUMENTO DE VENDAS E PITCH (CONTRA-XEQUE-MATE) */}
                  <div className="p-3 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl relative select-text">
                    <span className="block text-[7.5px] font-mono text-[#d2af5a] font-bold uppercase tracking-widest mb-1 select-none">
                      📢 GERADOR DE PITCH COMERCIAL CONTRA-XEQUE-MATE (DADOS REAIS):
                    </span>
                    <p className="text-white/85 text-[8.5px] leading-relaxed italic font-sans">
                      "Ao apresentar para seu cliente ou parceiro, use o brilho do processo real: <b className="text-[#d2af5a] font-sans">Enquanto o mercado atua em caixa preta, com promessas de ganhos fáceis e suporte por robôs limitados, nós eliminamos toda dúvida abrindo o jogo: garantimos {d1SalesHours} horas diárias de execução direta (D1), tempo de resposta humano de {d4HumanSla} minutos (D4) e {d5Traceability}% de rastreabilidade completa no CRM (D5).</b> Escolha o processo real de pessoa para pessoa."
                    </p>
                    {/* Botão de Cópia Rápida */}
                    <button
                      onClick={() => {
                        const text = `Enquanto o mercado atua em caixa preta com promessas de ganhos fáceis e suporte por robôs limitados, nós eliminamos toda dúvida abrindo o jogo: garantimos ${d1SalesHours} horas diárias de execução direta, tempo de resposta humano de ${d4HumanSla} minutos e ${d5Traceability}% de rastreabilidade completa no CRM. Escolha o processo real de pessoa para pessoa.`;
                        navigator.clipboard.writeText(text);
                        alert("Argumento de Vendas copiado para o clipboard com sucesso!");
                      }}
                      className="absolute top-1 right-2 text-[#d2af5a] hover:text-white transition font-mono text-[6.5px] font-bold uppercase cursor-pointer select-none"
                    >
                      [Copiar Argumento]
                    </button>
                  </div>

                  {/* Terminal de Auditoria NLP */}
                  <div className="flex flex-col gap-1 overflow-hidden h-[95px]">
                    <div className="flex justify-between items-center text-[7.5px] font-mono uppercase select-none">
                      <span className="text-white/40">Console de Desconstrução Concorrencial:</span>
                      <button
                        onClick={runAudit}
                        disabled={isAuditing}
                        className="text-[#d2af5a] hover:underline font-bold transition flex items-center gap-1 cursor-pointer disabled:text-white/20"
                      >
                        <RefreshCw className={`h-2.5 w-2.5 ${isAuditing ? 'animate-spin text-[#d2af5a]' : 'text-[#d2af5a]'}`} />
                        {isAuditing ? 'Auditando...' : 'Re-auditar Concorrente'}
                      </button>
                    </div>

                    <div 
                      ref={auditLogRef}
                      className="flex-1 bg-[#050507] border border-white/5 rounded-xl p-2 font-mono text-[7.5px] text-[#d2af5a]/95 space-y-0.5 overflow-y-auto ipb-thinscroll leading-relaxed"
                    >
                      {auditLogs.length === 0 ? (
                        <div className="text-white/20 italic pt-3 text-center leading-normal">
                          Inicie a calibragem das 6 dimensões acima para rodar a auditoria de narrativa.
                        </div>
                      ) : (
                        auditLogs.map((log, idx) => (
                          <div key={idx}>
                            <span className="text-white/20 font-sans mr-1">[{new Date().toLocaleTimeString()}]</span>
                            {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

              </div>

              {/* Tabela de Comparação Direta: Pessoa para Pessoa */}
              <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/15 rounded-2xl p-5 flex flex-col gap-3">
                <span className="text-[#d2af5a] text-[10px] font-mono font-bold uppercase tracking-wider select-none">
                  ⚖️ Matriz de Verdade: Narrativas do Mercado vs. Sua Vantagem Humana Sem Filtro
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-950/10 border border-red-950/30 rounded-xl space-y-1.5">
                    <span className="text-red-400 text-[9px] font-mono font-bold uppercase block select-none">O "Efeito Brilho" Concorrente (Caixa Preta)</span>
                    <ul className="text-white/60 text-[9.5px] space-y-1 list-disc pl-3">
                      <li><b>Ganhos Rápidos:</b> Promessas de sucesso sem esforço e enriquecimento automatizado.</li>
                      <li><b>Operação Oculta:</b> Algoritmos secretos e "caixas pretas" que impedem o usuário de auditar dados.</li>
                      <li><b>Suporte Virtual:</b> Bots e robôs de chat genéricos que frustram na hora da dor.</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded-xl space-y-1.5">
                    <span className="text-[#d2af5a] text-[9px] font-mono font-bold uppercase block select-none">Sua Vantagem Humana Prática (Com IPB)</span>
                    <ul className="text-white/85 text-[9.5px] space-y-1 list-disc pl-3">
                      <li><b>Verdade Radical:</b> Design de realidade que exibe os dias difíceis e diagnósticos técnicos.</li>
                      <li><b>Rastreabilidade Total:</b> Metodologias abertas e consolidadas em fatos públicos.</li>
                      <li><b>Empatia Prática:</b> Acesso a especialistas reais para suporte consultivo no momento de crise.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Botão de Suporte Humano */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-white/40 leading-relaxed font-sans max-w-lg">
                    🛡️ <b>Compromisso Humano:</b> Este app rejeita ilusões e treina você para lidar com dados reais e pessoas reais no mercado corporativo de alta competição.
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setShowDirectContactAlert(true)
                      setTimeout(() => setShowDirectContactAlert(false), 3000)
                    }}
                    className="px-4 py-2 rounded-lg bg-[#d2af5a] hover:bg-[#d2af5a]/90 text-black font-bold uppercase tracking-wider text-[9px] transition-all cursor-pointer select-none flex items-center gap-1.5"
                  >
                    <Users className="h-3 w-3 text-black" />
                    Falar com Especialista Humano
                  </button>
                </div>
              </div>

              {showDirectContactAlert && (
                <div className="bg-emerald-950/40 border border-emerald-500/35 text-emerald-400 px-4 py-2.5 rounded-xl text-[9.5px] text-center font-mono animate-in fade-in select-none">
                  ✅ <b>Chamado de Atendimento Prático Iniciado!</b> Um consultor sênior da equipe IPB foi acionado e está revisando seu modelo competitivo.
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#d2af5a]/15 bg-black/40 flex justify-between items-center text-[8.5px] font-mono text-white/35 select-none">
              <span>Google Vertex AI Real-Time Concurrence Auditor v2.6</span>
              <button 
                onClick={() => setIsXequeMateModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-[#d2af5a]/10 hover:border-[#d2af5a]/40 text-white font-bold uppercase tracking-wider text-[8px] transition-all cursor-pointer"
              >
                Fechar Simulador
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
