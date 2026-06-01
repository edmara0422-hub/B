'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { Sparkles, TrendingUp, Globe, Users, Leaf, ShieldAlert, AlertTriangle, Settings, Database, Activity, X, Info, HelpCircle, Layers, CheckCircle, Play, SendHorizontal, Flame, Award, Bot, RefreshCw, Copy } from 'lucide-react'

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

import { ModoDescobertaVantagem } from './modo-descoberta-vantagem'

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

  // Estados do Novo Simulador de Vantagem Real (IVRS)
  const [compFactor, setCompFactor] = useState<'transparencia' | 'evidencia' | 'auditoria'>('transparencia')
  const [effortValue, setEffortValue] = useState<number>(75)
  const [marketLogs, setMarketLogs] = useState<string[]>([])
  const [simRunning, setSimRunning] = useState<boolean>(false)
  const [simFinished, setSimFinished] = useState<boolean>(false)
  const simLogRef = useRef<HTMLDivElement>(null)

  // Novo: Controle de abas da Home (Orbe vs Console), Input de IA e Preset de Cenários
  const [rightPanelTab, setRightPanelTab] = useState<'orb' | 'terminal'>('orb')
  const [simScenario, setSimScenario] = useState<'app_vendas' | 'gurus' | 'saas_bi' | 'custom'>('app_vendas')
  const [businessModelInput, setBusinessModelInput] = useState<string>('Um aplicativo de monitoria de conteúdos e estudos de competição de pessoa para pessoa, focado em auditoria 100% aberta e suporte consultivo por especialistas humanos')
  const [copilotAnswer, setCopilotAnswer] = useState<string | null>(null)
  const [copilotLoading, setCopilotLoading] = useState<boolean>(false)
  
  // Novos Estados IA-Agentica
  const [calibrationSource, setCalibrationSource] = useState<'ia' | 'manual'>('ia')
  const [aiVerdict, setAiVerdict] = useState<string>('Aguardando simulação inteligente...')
  const [aiVerdictStatus, setAiVerdictStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')

  // Estados do Simulador de Vantagem Real & Contra-Xeque-Mate (IVRS)
  const [isXequeMateModalOpen, setIsXequeMateModalOpen] = useState<boolean>(false)
  const [magicPromise, setMagicPromise] = useState<string>('Fature R$ 10.000 em 7 dias com Robô de Vendas Automático')
  const [customPromise, setCustomPromise] = useState<string>('')
  
  // As Variáveis Reais de Eficiência de Mercado & Sustentabilidade Cognitiva
  const [ebitda, setEbitda] = useState<number>(80) // Margem EBITDA (%)
  const [ltvCac, setLtvCac] = useState<number>(6) // Relação LTV/CAC Ratio
  const [tdbd, setTdbd] = useState<number>(95) // Tomada de Decisão Baseada em Dados (TDBD %)
  const [sequestroAmigdala, setSequestroAmigdala] = useState<number>(20) // Sequestro da Amígdala (Risco de Liderança %)
  const [friccaoPersonagem, setFriccaoPersonagem] = useState<number>(30) // Dissociação Cognitiva (Fricção do Personagem %)
  const [custoDopaminergico, setCustoDopaminergico] = useState<number>(15) // Custo Dopaminérgico (Manipulação Emocional %)
 
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
    
    // Custo Dopaminérgico alto aumenta o glitter concorrente
    const hypeFactor = custoDopaminergico * 0.15
    score += hypeFactor
 
    return Math.min(Math.round(score), 100)
  }, [currentPromise, custoDopaminergico])
 
  const ivrsScoreVal = useMemo(() => {
    const ebitdaFactor = ebitda / 100
    const ltvCacFactor = ltvCac
    const tdbdFactor = tdbd / 100
    const friccaoFactor = friccaoPersonagem / 100 // Dissociação Cognitiva / Fricção
    const dopaminaFactor = custoDopaminergico / 100 // Custo Dopaminérgico
    const amigdalaFactor = sequestroAmigdala / 100 // Sequestro da Amígdala
 
    const num = (ebitdaFactor * ltvCacFactor) * tdbdFactor
    const den = Math.max(0.05, (friccaoFactor + dopaminaFactor + (amigdalaFactor * 0.2)))
    const ivrs = num / den
 
    // Normalize IVRS to a beautiful score out of 100%
    const normalizedScore = Math.min(100, Math.max(10, Math.round((ivrs / 10.0) * 100)))
 
    // Penalidade concorrencial de Glitter
    const penalty = Math.max(0, (glitterIndex - 30) * 0.12)
 
    return Math.max(10, Math.min(100, Math.round(normalizedScore - penalty)))
  }, [ebitda, ltvCac, tdbd, sequestroAmigdala, friccaoPersonagem, custoDopaminergico, glitterIndex])
 
  const radarPoints = useMemo(() => {
    const r1 = (ebitda / 100) * 80
    const r2 = (ltvCac / 10) * 80
    const r3 = (tdbd / 100) * 80
    const r4 = ((100 - sequestroAmigdala) / 100) * 80 // Inverted: lower Sequestro is better!
    const r5 = ((100 - friccaoPersonagem) / 100) * 80 // Inverted: lower Fricção is better!
    const r6 = ((100 - custoDopaminergico) / 100) * 80 // Inverted: lower Custo Dopaminérgico is better!
 
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
  }, [ebitda, ltvCac, tdbd, sequestroAmigdala, friccaoPersonagem, custoDopaminergico])
 
  const competitorRadarPoints = useMemo(() => {
    const r1 = 0.2 * 80
    const r2 = 0.12 * 80
    const r3 = 0.1 * 80
    const r4 = 0.1 * 80
    const r5 = 0.05 * 80
    const r6 = 0.05 * 80
 
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

  // Função para mudar cenário (Preset Concorrencial + Sincronização do texto descritivo)
  const handleScenarioChange = (scenario: 'app_vendas' | 'gurus' | 'saas_bi' | 'custom') => {
    setSimScenario(scenario)
    setCopilotAnswer(null)
    setCalibrationSource('ia')
    
    let text = ''
    if (scenario === 'app_vendas') {
      text = 'Um aplicativo de monitoria de conteúdos e estudos de competição de pessoa para pessoa, focado em auditoria 100% aberta, dados reais e suporte síncrono por especialistas humanos'
    } else if (scenario === 'gurus') {
      text = 'Gurus tradicionais de mentoria de vendas focados em marketing agressivo de caixa preta, com falsas promessas de ganhos fáceis e suporte frio automatizado por robôs'
    } else if (scenario === 'saas_bi') {
      text = 'Um software genérico corporativo de Business Intelligence e dashboards estáticos pré-programados, sem suporte consultivo ou acompanhamento personalizado'
    }
    
    if (text) {
      setBusinessModelInput(text)
      // Auto-trigger simulator engine
      setTimeout(() => {
        const btn = document.getElementById('run-sim-btn')
        if (btn) btn.click()
      }, 50)
    }
  }

  // Função inteligente que executa a Simulação por IA baseada na descrição textual
  const handleRunMarketSim = () => {
    if (simRunning) return
    setSimRunning(true)
    setSimFinished(false)
    setMarketLogs([])
    setCalibrationSource('ia')
    setAiVerdictStatus('pending')
    setAiVerdict('Processando inteligência de mercado e dados neuropsicológicos...')

    const text = businessModelInput.toLowerCase()
    
    // 1. NLP Parser Engine
    let ebitda_val = 50 // default
    if (text.includes('alta margem') || text.includes('lucro') || text.includes('ebitda') || text.includes('saas') || text.includes('recorrente') || text.includes('eficiente') || text.includes('financeiro')) ebitda_val += 25
    if (text.includes('serviço') || text.includes('agência') || text.includes('customizado') || text.includes('operação pesada') || text.includes('humano') || text.includes('especialista')) ebitda_val -= 15
    ebitda_val = Math.max(10, Math.min(100, ebitda_val))

    let ltvCac_val = 4.0 // default
    if (text.includes('recorrência') || text.includes('saas') || text.includes('assinatura') || text.includes('retenção') || text.includes('longo prazo') || text.includes('ltv') || text.includes('fidelidade') || text.includes('pessoa para pessoa')) ltvCac_val += 2.5
    if (text.includes('indicação') || text.includes('baixo custo de aquisição') || text.includes('orgânico') || text.includes('viral') || text.includes('cac')) ltvCac_val += 1.5
    if (text.includes('marketing agressivo') || text.includes('anúncio caro') || text.includes('tráfego pago') || text.includes('guru') || text.includes('hype')) ltvCac_val -= 2.0
    ltvCac_val = Math.max(1, Math.min(10, ltvCac_val))

    let tdbd_val = 60 // default
    if (text.includes('dados') || text.includes('tdbd') || text.includes('auditável') || text.includes('métricas') || text.includes('indicadores') || text.includes('analítico') || text.includes('dashboard') || text.includes('bi') || text.includes('rastreabilidade')) tdbd_val += 30
    if (text.includes('intuição') || text.includes('sentimento') || text.includes('gurus') || text.includes('ilusão') || text.includes('hype') || text.includes('caixa preta') || text.includes('achismos')) tdbd_val -= 25
    tdbd_val = Math.max(10, Math.min(100, tdbd_val))

    let amigdala_val = 40 // default
    if (text.includes('ataque') || text.includes('defesa') || text.includes('agressivo') || text.includes('bloqueia') || text.includes('arrogante') || text.includes('reativo') || text.includes('emocional') || text.includes('arrogância')) amigdala_val += 35
    if (text.includes('inteligência emocional') || text.includes('suporte consultivo') || text.includes('pessoa para pessoa') || text.includes('empatia') || text.includes('escuta') || text.includes('equipe')) amigdala_val -= 20
    amigdala_val = Math.max(10, Math.min(100, amigdala_val))

    let friccao_val = 40 // default
    if (text.includes('personagem') || text.includes('mentira') || text.includes('engodo') || text.includes('caixa preta') || text.includes('promessa falsa') || text.includes('marketing agressivo') || text.includes('aparência')) friccao_val += 40
    if (text.includes('verdade radical') || text.includes('eu integral') || text.includes('rastreabilidade') || text.includes('autêntico') || text.includes('fatos')) friccao_val -= 25
    friccao_val = Math.max(10, Math.min(100, friccao_val))

    let dopamina_val = 40 // default
    if (text.includes('fature rápido') || text.includes('promessa') || text.includes('robô de vendas') || text.includes('ganho fácil') || text.includes('enriquecer') || text.includes('milagre') || text.includes('fórmula') || text.includes('fácil') || text.includes('dormindo')) dopamina_val += 35
    if (text.includes('medo') || text.includes('escassez') || text.includes('ganância') || text.includes('fomo') || text.includes('urgência')) dopamina_val += 20
    if (text.includes('transparência') || text.includes('fatos') || text.includes('ciência') || text.includes('realidade') || text.includes('pessoa para pessoa') || text.includes('educação')) dopamina_val -= 25
    dopamina_val = Math.max(10, Math.min(100, dopamina_val))

    // 2. Cognitive logs generating dynamic NLP step outputs
    const logs = [
      `[AI SCANNER] Escaneando a infraestrutura operacional descrita: "${businessModelInput.substring(0, 70)}..."`,
      `[NLP ANALYSIS] Mapeando vetores de rentabilidade real, atração concorrencial e blindagem dopaminérgica...`,
      `[EBITDA CALIBRATION] Margem EBITDA estimada em: ${ebitda_val}% (Eficiência financeira real da operação).`,
      `[LTV/CAC CALIBRATION] Relação LTV/CAC calibrada em: ${ltvCac_val.toFixed(1)}x (Sustentabilidade de aquisição).`,
      `[TDBD CALIBRATION] Tomada de Decisão Baseada em Dados (TDBD) indexada em: ${tdbd_val}% (Rituais de dados vs. achismo).`,
      `[SEQUESTRO DA AMÍGDALA] Nível de reatividade emocional da gestão calibrado em: ${amigdala_val}% (Sequestro da Amígdala).`,
      `[FRICÇÃO COGNITIVA] Dissociação de Personagem calculada em: ${friccao_val}% (Custo para manter a mentira).`,
      `[CUSTO DOPAMINÉRGICO] Pico de dopamina artificial e FOMO no cliente: ${dopamina_val}% (Risco de arrependimento).`,
      `[VERDICT COMPILING] Consolidando Indicadores Financeiros e Neuropsicológicos para Cálculo do IVRS...`
    ]

    let current = 0
    const interval = setInterval(() => {
      if (current < logs.length) {
        setMarketLogs(prev => [...prev, logs[current]])
        // Animate the sliders one by one as the AI logs execute
        if (current === 2) setEbitda(ebitda_val)
        if (current === 3) setLtvCac(ltvCac_val)
        if (current === 4) setTdbd(tdbd_val)
        if (current === 5) setSequestroAmigdala(amigdala_val)
        if (current === 6) setFriccaoPersonagem(friccao_val)
        if (current === 7) setCustoDopaminergico(dopamina_val)
        current++
      } else {
        clearInterval(interval)
        
        // 3. Final AI Strategic Verdict Logic
        let finalVerdict = ''
        let status: 'approved' | 'rejected' = 'approved'

        if (dopamina_val > 55 || tdbd_val < 40 || amigdala_val > 75 || ebitda_val < 25) {
          finalVerdict = `⚠️ ESTRATÉGIA REJEITADA POR EXCESSO DE ILUSÃO: Alto Custo Dopaminérgico (${dopamina_val}%) e baixa integridade de dados (TDBD de ${tdbd_val}%). O "personagem" corre risco crítico de colapso por sequestro da amígdala constante e falta de processos sustentáveis (EBITDA ${ebitda_val}%).`
          status = 'rejected'
        } else if (tdbd_val >= 85 && amigdala_val <= 30 && dopamina_val <= 30 && ltvCac_val >= 4.0) {
          finalVerdict = `✅ OPERAÇÃO DE VANTAGEM REAL APROVADA: Altíssima integridade de dados (TDBD ${tdbd_val}%), controle emocional da liderança, baixo desgaste dopaminérgico (${dopamina_val}%) e LTV/CAC sustentável de ${ltvCac_val.toFixed(1)}x. Blindagem anticópia ativa!`
          status = 'approved'
        } else {
          finalVerdict = `💡 MODELO COM RESSALVAS COGNITIVAS: Operação financeiramente rentável, mas o fundador corre risco de burnout pelo cansaço da liderança (Fadiga ${friccao_val}%) ou alta reatividade emocional (${amigdala_val}%). Reduza o Hype e use mais Dados (TDBD).`
          status = 'approved'
        }

        setAiVerdict(finalVerdict)
        setAiVerdictStatus(status)
        setMarketLogs(prev => [...prev, `[VERDITO FINAL] ${finalVerdict}`])
        setSimRunning(false)
        setSimFinished(true)
      }
    }, 280)
  }

  // Função para mudar dimensão e cair no customizado
  const handleDimensionChange = (dimension: 'ebitda' | 'ltvCac' | 'tdbd' | 'sequestroAmigdala' | 'friccaoPersonagem' | 'custoDopaminergico', value: number) => {
    setSimScenario('custom')
    setCalibrationSource('manual')
    if (dimension === 'ebitda') setEbitda(value)
    else if (dimension === 'ltvCac') setLtvCac(value)
    else if (dimension === 'tdbd') setTdbd(value)
    else if (dimension === 'sequestroAmigdala') setSequestroAmigdala(value)
    else if (dimension === 'friccaoPersonagem') setFriccaoPersonagem(value)
    else if (dimension === 'custoDopaminergico') setCustoDopaminergico(value)
  }

  // AI Strategic Copilot Q&A handler
  const askCopilot = (questionKey: 'famosos' | 'sla' | 'math' | 'zero' | 'pivot' | 'saas') => {
    setCopilotLoading(true)
    setCopilotAnswer(null)
    setTimeout(() => {
      let answer = ''
      if (questionKey === 'famosos') {
        answer = `🤖 [Mentor IA - Xeque-Mate Concorrencial]: Como vencer gurus famosos e promessas vazias de mercado?
        
👉 Use o contraste de Transparência de Dados (TDBD): O mercado opera em caixa preta, vendendo ilusão de palco com promessas de ganhos sem esforço. Ao adotar ${tdbd}% de TDBD no seu negócio, você quebra essa ilusão com dados frios e auditáveis.
👉 O "Xeque-Mate" do Córtex Pré-Frontal: Confrontar o concorrente com dados e rastreabilidade ativa o Sequestro da Amígdala dele, expondo o colapso do personagem que reage com ataque (arrogância/deboche) ou fuga (bloqueio). Apresente o seu IVRS de ${ivrsScoreVal}% vs. o do Guru (${18}%).`
      } else if (questionKey === 'sla') {
        answer = `🤖 [Mentor IA - Inteligência Emocional & Sanidade]: Como provar e posicionar o diferencial de estabilidade emocional?
        
👉 Enquanto o concorrente opera em reatividade constante e sob sequestro contínuo da amígdala (90% de estresse e urgência artificial), você constrói uma operação baseada na verdade e no equilíbrio mental.
👉 Provar que a reatividade da sua gestão é de apenas ${sequestroAmigdala}% de Sequestro da Amígdala (comprovando clareza estratégica no Córtex Pré-Frontal) cria uma barreira anticópia definitiva. Um negócio mentalmente saudável cresce de forma sustentável e sem esgotamento de pessoas.`
      } else if (questionKey === 'math') {
        answer = `🤖 [Mentor IA - A Matemática da Sanidade]: Qual é a ciência por trás da fórmula do IVRS?
        
👉 A fórmula do Índice de Vantagem Real Sustentável (IVRS) prova cientificamente que um negócio não sobrevive só de números de EBITDA:
   IVRS = (EBITDA * (LTV/CAC) * TDBD) / (Fricção do Personagem + Custo Dopaminérgico + 0.2 * Sequestro da Amígdala).
👉 Se o EBITDA e a atração são ótimos, mas a liderança sofre com Sequestro da Amígdala e o produto exige mentiras brutais que geram Custo Dopaminérgico (FOMO/Medo) e arrependimento de compra no cliente, o denominador explode e o IVRS desmorona. A matemática comprova: integridade de dados e sanidade humana geram mais lucro no longo prazo.`
      } else if (questionKey === 'zero') {
        answer = `🤖 [Advisor AI - Começando do Absoluto Zero]:
        
👉 ALERTA ANTICÓPIA: Pare de tentar copiar o palco dos outros por medo ou síndrome do impostor! O sistema ativou o Modo Descoberta baseado no "Eu Integral".
👉 INTERSEÇÃO IMEDIATA: A IA cruzou seu histórico de vida. Se você é Fisioterapeuta Intensivista (8 anos de UTI) e agora estuda Business e Tecnologia, o cruzamento de [UTI + Business + Tech + Saúde Mental] cria um posicionamento anticópia absoluto. Ninguém compete com sua história.
👉 TERRITÓRIO ÚNICO: Invista em um modelo focado em Rastreabilidade Técnica, Auditoria Aberta e Tomada de Decisão Baseada em Dados (TDBD).`
      } else if (questionKey === 'pivot') {
        answer = `🤖 [Advisor AI - Repensar & Pivotar Carreira]:
        
👉 DESCONSTRUÇÃO DE ATIVOS: Cansado do modelo tradicional? Não jogue sua bagagem no lixo! A IA desestruturou seus anos de experiência em UTI em blocos de competência pura.
👉 TRANSIÇÃO ESTRATÉGICA: Sua capacidade extrema de liderança sob estresse, tomada de decisão veloz à beira do leito e auditoria rigorosa de processos são ativos de ouro para o mercado de Business e Tecnologia de Automação Digital.
👉 ROTA: A IA redesenhou seu posicionamento. Crie uma consultoria de mitigação de riscos e inteligência emocional em startups de saúde mental de alta complexidade. Vantagem imediata e anticópia.`
      } else if (questionKey === 'saas') {
        answer = `🤖 [Advisor AI - Criador de SaaS & novos modelos]:
        
👉 MINERAÇÃO DE ÓDIO (Friction Scraping): Analisamos os concorrentes tradicionais. A principal dor relatada pelos clientes é o cansaço gerado por sistemas complexos de altíssima Carga Cognitiva (${friccaoPersonagem}%).
👉 O GAP DE MERCADO: Crie um micro-SaaS super enxuto focado em simplificar e automatizar o cálculo de transparência de dados (TDBD) para pequenas empresas, com usabilidade leve e suporte humano direto. Risco baixo, LTV altíssimo.`
      }
      setCopilotAnswer(answer)
      setCopilotLoading(false)
    }, 600)
  }

  const runAudit = () => {
    if (isAuditing) return
    setIsAuditing(true)
    setAuditDone(false)
    setAuditLogs([])

    const text = currentPromise.toLowerCase()
    let glitter = 20
    if (text.includes('fature') || text.includes('ganhe') || text.includes('milhões') || text.includes('10k') || text.includes('10.000')) glitter += 25
    if (text.includes('7 dias') || text.includes('rápido') || text.includes('fácil') || text.includes('sem esforço')) glitter += 30
    if (text.includes('robô') || text.includes('bot') || text.includes('automático')) glitter += 15
    const hypeFactor = Math.round((100 - (100 - custoDopaminergico)) * 0.15)
    glitter = Math.min(100, glitter + hypeFactor)

    const logs = [
      `[INICIALIZANDO SCANNER] Ativando Auditoria de Verdade Radical e NLP Concorrencial contra o "Efeito Ilusão"...`,
      `[NLP PARSE] Analisando promessa concorrente: "${currentPromise}"`,
      `[GLITTER DETECTED] Mapeado em ${glitter}% de ruído e hype de mercado.`,
      `[EBITDA COMPARISON] Concorrente queima caixa (0% EBITDA) vs. sua Operação de Margem Real de ${ebitda}% (EBITDA).`,
      `[LTV/CAC AUDIT] Guru concorrente opera com CAC inflado por tráfego agressivo vs. sua Relação LTV/CAC sustentável de ${ltvCac.toFixed(1)}x.`,
      `[TDBD CHECK] Promessa do Guru baseia-se em ilusão motivacional vs. seu sistema com ${tdbd}% de Tomada de Decisão Baseada em Dados (TDBD).`,
      `[AMÍGDALA SEQUESTRADA] Concorrente opera sob reatividade constante e medo (90% Sequestro da Amígdala) vs. seu Controle Emocional de ${sequestroAmigdala}% (Liderança ativa).`,
      `[DISSOCIAÇÃO COGNITIVA] Personagem oco gasta 95% de energia pré-frontal sustentando a mentira vs. seu Eu Integral com apenas ${friccaoPersonagem}% de fricção.`,
      `[CUSTO DOPAMINÉRGICO] Guru gera pico dopaminérgico artificial com promessa milagrosa (95% manipulação) vs. sua entrega ética e limpa com apenas ${custoDopaminergico}% de custo dopaminérgico.`,
      `[XEQUE-MATE COMPILING] Consolidando Vantagem Competitiva Real (IVRS: ${ivrsScoreVal}%) vs. Ilusão de Caixa Preta do concorrente...`,
      `[VEREDITO] Xeque-mate na ilusão comercial! Operação pautada na verdade de dados e neuropsicologia homologada com sucesso.`
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
    }, 300)
  }

  useEffect(() => {
    if (auditLogRef.current) {
      auditLogRef.current.scrollTop = auditLogRef.current.scrollHeight
    }
  }, [auditLogs])




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
            BUSINESS INTELLIGENCE <span className="text-[#d2af5a] font-normal">COCKPIT DE VANTAGEM REAL (IVRS)</span>
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

        {/* COLUNA DIREITA: HUD Ativo + Simulador de Vantagem Real no Rodapé */}
        <div className="flex flex-col gap-[20px] h-full justify-between">
          
          {/* Container do HUD Ativo (Travado em 520px de altura para alinhamento milimétrico com nova altura do rodapé) */}
          <div className="w-full h-[520px]">
            {activePillar === 'financas' && <HudFinancas />}
            {activePillar === 'capital_humano' && <HudCapitalHumano />}
            {activePillar === 'estrategia' && <HudEstrategia />}
            {activePillar === 'esg' && <HudEsg />}
            {activePillar === 'ai' && <HudAi />}
          </div>

          {/* SIMULADOR DE VANTAGEM REAL (Travado em 300px de altura) */}
          {aiVerdictStatus !== 'approved' ? (
            /* CASO 1: AGUARDANDO PROTOCOLO DESCOBERTA REAL */
            <div className="p-3.5 rounded-3xl backdrop-blur-xl border flex flex-col justify-between h-[300px] relative overflow-hidden select-text" style={{ background: 'rgba(8, 8, 10, 0.85)', borderColor: 'rgba(210, 175, 90, 0.25)' }}>
              
              {/* Ambient gold glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,175,90,0.04),transparent_65%)] pointer-events-none" />

              {/* Header do Portal */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2 shrink-0 relative z-10 select-none">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#d2af5a] animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d2af5a] font-mono">
                    🛰️ SIMULADOR DE VANTAGEM COMPETITIVA & CONTRA-XEQUE-MATE (IVRS)
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#d2af5a]/10 border border-[#d2af5a]/30 text-[#d2af5a] font-mono text-[7px] rounded-md font-bold select-none animate-pulse">
                  IA ATIVA
                </span>
              </div>

              {/* Corpo: Chamada Visual de Alto Impacto para Tomada de Decisão */}
              <div className="flex-1 flex flex-col justify-center py-1.5 relative z-10 text-left">
                <h3 className="text-white text-xs font-bold leading-normal tracking-wide">
                  Mapeie e valide as barreiras de entrada e o posicionamento da sua operação
                </h3>
                <p className="text-white/50 text-[10px] leading-relaxed mt-1.5 font-sans">
                  A plataforma de inteligência analisará a convergência de seus ativos corporativos e técnicos, identificando fricções de mercado e gerando uma barreira de entrada estruturada baseada em dados e resiliência operacional.
                </p>
                
                {/* Indicador visual das 4 etapas */}
                <div className="flex items-center gap-2.5 mt-3 select-none text-[7.5px] font-mono text-white/30">
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#d2af5a]"></span> 1. Ativos & Origens</span>
                  <span className="text-white/10">➔</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#d2af5a]"></span> 2. Diálogo de Alinhamento</span>
                  <span className="text-white/10">➔</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#d2af5a]"></span> 3. Diagnóstico de Fricções</span>
                  <span className="text-white/10">➔</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#d2af5a]"></span> 4. Matriz de Blindagem</span>
                </div>
              </div>

              {/* Rodapé: Botão de Ação de Grande Destaque */}
              <div className="pt-1.5 border-t border-white/5 flex items-center justify-between shrink-0 relative z-10">
                <span className="text-[7.5px] font-mono text-white/25">
                  *Tomada de Decisão Baseada em Dados (TDBD) & Neurociência aplicada.
                </span>
                <button
                  onClick={() => {
                    setIsXequeMateModalOpen(true)
                    setTimeout(() => runAudit(), 100)
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#d2af5a] to-amber-500 hover:brightness-110 text-black font-bold uppercase tracking-wider text-[9px] rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(210,175,90,0.25)] animate-pulse"
                >
                  <Sparkles className="h-3 w-3 text-black animate-spin" style={{ animationDuration: '4s' }} />
                  Iniciar Protocolo Descoberta Real
                </button>
              </div>
              
            </div>
          ) : (
            /* CASO 2: MODO BLINDADO ATIVO - POSICIONAMENTO CRISTALIZADO */
            <div className="p-3 rounded-3xl backdrop-blur-xl border flex flex-col justify-between h-[300px] relative overflow-hidden select-text animate-in fade-in zoom-in-95 duration-300" style={{ background: 'rgba(8, 8, 10, 0.85)', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
              
              {/* Ambient green/emerald glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_65%)] pointer-events-none" />

              {/* Header da Blindagem */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2 shrink-0 relative z-10 select-none">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 font-mono">
                    🏆 BLINDAGEM DE POSICIONAMENTO ESTRATÉGICO ATIVA
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[7px] rounded-md font-bold select-none">
                  IVRS HOMOLOGADO
                </span>
              </div>

              {/* Corpo: Dados da sua Operação Forgada */}
              <div className="flex-1 flex gap-4 py-1.5 relative z-10 items-stretch overflow-hidden">
                
                {/* Lado Esquerdo: Pitch e Posicionamento */}
                <div className="flex-1 flex flex-col justify-center text-left">
                  <span className="text-[7.5px] font-mono text-white/35 uppercase tracking-wider block mb-1">
                    POSICIONAMENTO DE OCEANO AZUL (PRESET AUTÊNTICO):
                  </span>
                  <p className="text-white text-[10px] font-serif leading-snug italic pr-1">
                    {ebitda === 85 
                      ? '"Eu trago a calma e resiliência extrema de 8 anos salvando vidas em UTI para desintegrar a ilusão dos gurus de palco, aplicando TDBD para blindar seu negócio e sua sanidade contra o caos competitivo."'
                      : `"${aiVerdict.replace('✅ OPERAÇÃO DE EXCELÊNCIA INTEGRAL APROVADA: ', '').replace('✅ OPERAÇÃO DE VANTAGEM REAL APROVADA: ', '').split('.')[0]}."`
                    }
                  </p>
                  <span className="text-[7.5px] font-mono text-[#d2af5a] mt-1.5 block leading-tight">
                    {aiVerdict.length > 80 ? aiVerdict.substring(0, 100) + '...' : aiVerdict}
                  </span>
                </div>

                {/* Lado Direito: Grid de Métrica Otimizada */}
                <div className="w-[38%] border-l border-white/5 pl-3 flex flex-col justify-center gap-1.5 shrink-0">
                  <div className="p-1 px-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
                    <span className="text-[5.5px] font-mono text-white/40 uppercase">Eficiência (IVRS)</span>
                    <span className="text-[10px] font-extrabold font-mono text-[#d2af5a]">{ebitda}%</span>
                  </div>
                  <div className="p-1 px-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
                    <span className="text-[5.5px] font-mono text-white/40 uppercase">Tomada Decisão (TDBD)</span>
                    <span className="text-[10px] font-extrabold font-mono text-emerald-400">{tdbd}%</span>
                  </div>
                  <div className="p-1 px-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
                    <span className="text-[5.5px] font-mono text-white/40 uppercase">Risco Liderança</span>
                    <span className="text-[10px] font-extrabold font-mono text-red-400">{sequestroAmigdala}%</span>
                  </div>
                </div>

              </div>

              {/* Rodapé: Botões de Ação */}
              <div className="pt-1.5 border-t border-white/5 flex items-center justify-between shrink-0 relative z-10 select-none">
                <span className="text-[7.5px] font-mono text-emerald-400/60 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Sincronizado com os Sliders do Painel
                </span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const pitchCopy = ebitda === 85
                        ? "Eu trago a calma e resiliência extrema de 8 anos salvando vidas em UTI para desintegrar a ilusão dos gurus de palco, aplicando tomada de decisão baseada em dados reais (TDBD) para blindar seu negócio e sua sanidade contra o caos competitivo."
                        : `Mesclando minha base com negócios e tecnologia, eu crio uma fortaleza de tomada de decisão baseada em dados reais, quebrando a barreira da cópia genérica com processos auditáveis e integridade absoluta de pessoa para pessoa.`;
                      navigator.clipboard.writeText(pitchCopy);
                      alert("Argumento de Venda de Ouro copiado com sucesso!");
                    }}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-mono text-[7.5px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Copy className="h-2.5 w-2.5" />
                    Copiar Pitch
                  </button>

                  <button
                    onClick={() => {
                      setIsXequeMateModalOpen(true)
                    }}
                    className="px-2 py-1 bg-[#d2af5a]/10 hover:bg-[#d2af5a]/25 border border-[#d2af5a]/30 hover:border-[#d2af5a]/60 text-[#d2af5a] font-mono text-[7.5px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-[#d2af5a]" />
                    Recalibrar Posicionamento
                  </button>
                </div>
              </div>
              
            </div>
          )}

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
                  <span className="text-[10px] font-bold font-mono tracking-widest text-[#d2af5a] uppercase">MÉTRICA CORPORATIVA REAL (IVRS)</span>
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
                      Regra de Decisão Cruzada & Impacto Estratégico (IVRS)
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

      {/* POPUP MODAL SIMULADOR AVANÇADO CONTRA-XEQUE-MATE (IVRS) */}
      {isXequeMateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300">
          <div className="modal-glass w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200 text-left select-text" style={{ borderColor: 'rgba(210, 175, 90, 0.4)' }}>
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#d2af5a]/20 flex justify-between items-start bg-black/40 select-none">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#d2af5a] animate-pulse" />
                  <span className="text-[10px] font-bold font-mono tracking-[0.2em] text-[#d2af5a] uppercase">🛰️ SIMULADOR DE VANTAGEM COMPETITIVA & CONTRA-XEQUE-MATE (IVRS)</span>
                </div>
                <h2 className="text-white text-lg font-bold tracking-wide mt-1">
                  Contra-Xeque-Mate: Validação de Diferencial Corporativo
                </h2>
                <p className="text-white/45 text-[10px] font-mono leading-relaxed mt-1">
                  Análise profunda de ativos técnicos, fricção operacional e resiliência executiva para forjar barreiras de entrada reais.
                </p>
              </div>
              <button 
                onClick={() => setIsXequeMateModalOpen(false)}
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#d2af5a]/10 hover:border-[#d2af5a]/40 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content - Novo Modo Descoberta de Vantagem Real */}
            <div className="p-6 overflow-y-auto max-h-[60vh] ipb-thinscroll flex-1 min-h-0 bg-black/25 flex flex-col gap-6">
              <ModoDescobertaVantagem 
                onClose={() => setIsXequeMateModalOpen(false)}
                onCalibrateCockpit={(metrics) => {
                  setEbitda(metrics.ebitda)
                  setLtvCac(metrics.ltvCac)
                  setTdbd(metrics.tdbd)
                  setSequestroAmigdala(metrics.sequestroAmigdala)
                  setFriccaoPersonagem(metrics.friccaoPersonagem)
                  setCustoDopaminergico(metrics.custoDopaminergico)
                  setAiVerdict(metrics.verdict)
                  setAiVerdictStatus('approved')
                  setSimScenario('custom')
                  setCalibrationSource('ia')
                  
                  // Atualizar logs de auditoria do cockpit
                  setAuditLogs([
                    `[CALIBRAÇÃO DESCOBERTA] Importando dados refinados do Modo Descoberta de Vantagem Real...`,
                    `[TDBD CHECK] Sua Operação Real calibrada em ${metrics.tdbd}% de TDBD de alta fidelidade.`,
                    `[AMÍGDALA SEQUESTRADA] Controle emocional de Córtex Pré-Frontal calibrado em ${metrics.sequestroAmigdala}% de risco.`,
                    `[FRICÇÃO COGNITIVA] Fricção do Personagem otimizada para apenas ${metrics.friccaoPersonagem}% devido ao Eu Integral.`,
                    `[VEREDITO FINAL] Vantagem Real anticópia ativa com IVRS de ${metrics.ebitda + 7}% vs. Guru Hype (18%).`
                  ])
                  setAuditDone(true)
                }}
              />
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
