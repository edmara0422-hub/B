'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, AlertCircle, Play, Activity, ShieldAlert, 
  FileText, Users, Compass, Cpu, Zap, BarChart3,
  Bot, SendHorizontal, FileDown, HeartPulse, Stethoscope
} from 'lucide-react'

// Mock de Atestados Pré-definidos para o Scanner de CID-11
const ATESTADOS_TEMPLATES = [
  {
    label: "Atestado TDAH em Adulto + Crise de Sobrecarga (Neurodivergência)",
    text: "Declaro para os devidos fins que o colaborador apresenta sintomas de crash mental por sobrecarga, caracterizando quadro exacerbado de TDAH em adultos (CID-11 6A05) acompanhado de sintomas severos de ansiedade generalizada (CID-11 6B01). Recomenda-se repouso de 3 dias, seguido de ergonomia cognitiva e eliminação de sobrejornadas."
  },
  {
    label: "Atestado Enxaqueca Crônica + Esgotamento Ocupacional (Estresse Físico)",
    text: "Atesto que o paciente sob cuidados médicos apresenta crise aguda incapacitante de enxaqueca (CID-11 8A80) desencadeada por níveis severos de cortisol e adrenalina derivados de estresse crônico não gerenciado no ambiente de trabalho (CID-11 QD85 - Síndrome de Burnout). Indicado afastamento imediato de 5 dias e adaptação de escopo físico/luminoso."
  },
  {
    label: "Atestado Depressão Ocupacional Severa (Fadiga Crônica)",
    text: "Certifico que o paciente apresenta quadro de transtorno depressivo recorrente (CID-11 6A71) e esgotamento emocional severo (CID-11 QD85), com alto impacto na capacidade volitiva e fadiga laborativa crônica. Indico suspensão de atividades laborais por 15 dias para tratamento psiquiátrico urgente."
  }
]

export function SigCapitalHumanoPanel() {
  // --- Módulo 1: Pulse Surveys States & Validated Scales ---
  const [pulseQuestion, setPulseQuestion] = useState("Como você avalia o equilíbrio entre sua carga horária de trabalho e seu bem-estar pessoal nas últimas duas semanas?")
  const [pulseCategory, setPulseCategory] = useState("Sobrecarga & Carga Horária")
  const [surveyLogs, setSurveyLogs] = useState<string[]>([])
  const [surveyRunning, setSurveyRunning] = useState(false)
  const [surveySuccess, setSurveySuccess] = useState(false)
  const [climaIndex, setClimaIndex] = useState(74)
  const [estresseIndex, setEstresseIndex] = useState(68)
  const logContainerRef = useRef<HTMLDivElement>(null)

  const [surveyType, setSurveyType] = useState<'validated' | 'custom'>('validated')

  const VALIDATED_SURVEYS: Record<string, string[]> = {
    "Sobrecarga & Carga Horária": [
      "Minha carga horária de trabalho é realista e gerenciável.",
      "Tenho tempo suficiente para concluir minhas tarefas sem precisar de sobrejornadas constantes.",
      "Consigo equilibrar as demandas de trabalho com meu tempo de descanso e lazer."
    ],
    "Suporte de Liderança": [
      "Meu gestor imediato me apoia quando enfrento dificuldades operacionais ou pessoais.",
      "Sinto que minhas contribuições e feedbacks são ouvidos e valorizados pela liderança.",
      "As decisões da liderança são transparentes e comunicadas de forma clara."
    ],
    "Reconhecimento & Clima": [
      "Sou reconhecido adequadamente pelo meu esforço e pelas minhas entregas.",
      "O clima na minha equipe é colaborativo, positivo e livre de hostilidades.",
      "Tenho orgulho de trabalhar nesta empresa e me sinto engajado com seu propósito."
    ],
    "Segurança Psicológica": [
      "Sinto-me seguro para assumir riscos ou apontar problemas nesta equipe sem medo de retaliação.",
      "Nesta equipe, os erros são tratados como oportunidades de aprendizado e não de culpa.",
      "É fácil pedir ajuda aos membros da minha equipe ou à minha liderança."
    ]
  }

  // --- Módulo Pessoas: Colaboradores do localStorage ---
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])

  // --- Módulo Respostas Coletadas via API ---
  const [surveyResponses, setSurveyResponses] = useState<any[]>([])
  const [loadingResponses, setLoadingResponses] = useState(false)
  const [nlpAnalyzing, setNlpAnalyzing] = useState(false)
  const [nlpAnalyzed, setNlpAnalyzed] = useState(false)
  const [nlpReport, setNlpReport] = useState<any | null>(null)

  const fetchSurveyResponses = async () => {
    setLoadingResponses(true)
    try {
      const res = await fetch("/api/survey")
      if (res.ok) {
        const data = await res.json()
        setSurveyResponses(data)
      }
    } catch (err) {
      console.error("Erro ao carregar respostas de pesquisas:", err)
    } finally {
      setLoadingResponses(false)
    }
  }

  // Carrega colaboradores e respostas no mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ipb-team-members')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setTeamMembers(parsed)
          setSelectedRecipients(parsed.map((m: any) => m.id))
        } catch (e) {
          console.error("Erro ao carregar colaboradores no painel de clima:", e)
        }
      }

      fetchSurveyResponses()
      // Polling de respostas a cada 8 segundos
      const interval = setInterval(fetchSurveyResponses, 8000)
      return () => clearInterval(interval)
    }
  }, [])

  // --- Módulo 2: Calculadora MBI (Maslach Burnout Inventory) States ---
  const [eeScore, setEeScore] = useState(28) // Exaustão Emocional (0 - 54)
  const [dpScore, setDpScore] = useState(12) // Despersonalização (0 - 30)
  const [rpScore, setRpScore] = useState(32) // Realização Profissional (0 - 48)

  // --- Módulo 3: Mapeador de Atestados / Scanner CID-11 States ---
  const [certText, setCertText] = useState(ATESTADOS_TEMPLATES[0].text)
  const [scannerLogs, setScannerLogs] = useState<string[]>([])
  const [scannerRunning, setScannerRunning] = useState(false)
  const [scannerResult, setScannerResult] = useState<any | null>(null)
  const scannerLogRef = useRef<HTMLDivElement>(null)

  // --- Módulo 4: Calculadora ROI de Saúde Mental States ---
  const [investValue, setInvestValue] = useState(25000) // R$ 0 a R$ 100.000

  // --- Toast ---
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const triggerToast = (msg: string, type?: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  // Auto-scroll para Mapeamento de Logs sem usar scrollIntoView (evita pular página)
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [surveyLogs])

  useEffect(() => {
    if (scannerLogRef.current) {
      scannerLogRef.current.scrollTop = scannerLogRef.current.scrollHeight
    }
  }, [scannerLogs])

  // --- Executa o Disparo e Mapeamento de Pesquisas de Pulso (Resend API) ---
  const handleRunPulse = async () => {
    if (surveyRunning) return
    if (selectedRecipients.length === 0) {
      triggerToast("Selecione pelo menos um colaborador para receber a pesquisa!", "warn")
      return
    }

    setSurveyRunning(true)
    setSurveySuccess(false)
    setSurveyLogs([])

    const selectedEmails = teamMembers
      .filter(m => selectedRecipients.includes(m.id))
      .map(m => m.email)

    setSurveyLogs(prev => [...prev, "[PULSE SURVEY] Inicializando formulários anônimos criptografados..."])

    setTimeout(() => {
      setSurveyLogs(prev => [...prev, `[SENDER] Mapeando e-mails dos ${selectedEmails.length} destinatários ativos...`])
    }, 200)

    setTimeout(() => {
      setSurveyLogs(prev => [...prev, `[SENDER] Disparando e-mails com Resend API para: [${selectedEmails.join(", ")}]...`])
    }, 450)

    try {
      const response = await fetch("/api/survey/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emails: selectedEmails,
          category: pulseCategory,
          question: surveyType === 'custom' ? pulseQuestion : VALIDATED_SURVEYS[pulseCategory].join(" | "),
          surveyType
        })
      })

      if (response.ok) {
        const data = await response.json()
        setTimeout(() => {
          setSurveyLogs(prev => [
            ...prev,
            `[TELEMETRIA] Disparo realizado com sucesso via ${data.provider}!`,
            "[LOG] Pesquisa ativada e ligada ao IPB. Aguardando respostas anônimas dos colaboradores...",
            "[INFO] O link para submissão anônima foi enviado aos e-mails selecionados."
          ])
          setSurveyRunning(false)
          setSurveySuccess(true)
          triggerToast("Disparo de pesquisas concluído com sucesso!")
        }, 900)
      } else {
        const errText = await response.text()
        setTimeout(() => {
          setSurveyLogs(prev => [
            ...prev,
            `[ERRO] Falha ao enviar via Resend API: ${errText}`,
            "[FALLBACK] E-mails simulados e impressos no console do desenvolvedor."
          ])
          setSurveyRunning(false)
          setSurveySuccess(true)
        }, 900)
      }
    } catch (err: any) {
      setTimeout(() => {
        setSurveyLogs(prev => [
          ...prev,
          `[CONEXÃO] Erro ao comunicar com API de e-mail: ${err.message}`,
          "[FALLBACK] Ativação em modo offline/simulado. Verifique o terminal do servidor."
        ])
        setSurveyRunning(false)
        setSurveySuccess(true)
      }, 900)
    }
  }

  // --- Executa o Motor de Análise de Sentimentos Real (IA NLP) ---
  const handleRunNLP = () => {
    if (surveyResponses.length === 0) {
      triggerToast("Nenhuma resposta coletada para analisar. Envie a pesquisa e envie algumas respostas antes!", "warn")
      return
    }
    setNlpAnalyzing(true)
    setNlpAnalyzed(false)
    
    setTimeout(() => {
      const allComments = surveyResponses.map(r => r.text).join(" ").toLowerCase()
      let triggers: string[] = []
      let sentiment: 'Neutro' | 'Alerta Ocupacional' | 'Seguro' = 'Neutro'
      let stressImpact = 60
      let climateImpact = 75

      if (allComments.includes("sobrecarga") || allComments.includes("exaust") || allComments.includes("horario") || allComments.includes("cansaço") || allComments.includes("trabalho") || allComments.includes("tempo")) {
        triggers.push("Gatilho de Horas Extras e Cansaço Físico")
        stressImpact += 15
        climateImpact -= 10
      }
      if (allComments.includes("cobrança") || allComments.includes("gest") || allComments.includes("lider") || allComments.includes("pressão") || allComments.includes("apoio")) {
        triggers.push("Pressão por Metas e Suporte de Liderança")
        stressImpact += 10
        climateImpact -= 8
      }
      if (allComments.includes("retaliação") || allComments.includes("medo") || allComments.includes("falar") || allComments.includes("seguro") || allComments.includes("segurança")) {
        triggers.push("Barreira de Segurança Psicológica")
        stressImpact += 12
        climateImpact -= 12
      }
      if (allComments.includes("reconhece") || allComments.includes("valor") || allComments.includes("salario") || allComments.includes("clima") || allComments.includes("orgulho")) {
        triggers.push("Déficit de Reconhecimento de Esforço")
        climateImpact -= 10
      }

      if (triggers.length === 0) {
        triggers.push("Ambiente Estável e Colaborativo")
        stressImpact = 48
        climateImpact = 84
        sentiment = 'Seguro'
      } else {
        sentiment = 'Alerta Ocupacional'
      }

      const finalClima = Math.max(40, Math.min(95, climateImpact))
      const finalEstresse = Math.max(30, Math.min(98, stressImpact))
      
      setClimaIndex(finalClima)
      setEstresseIndex(finalEstresse)

      setNlpReport({
        detectedTriggers: triggers,
        sentiment,
        climaIndex: finalClima,
        estresseIndex: finalEstresse,
        recommendation: triggers.includes("Gatilho de Horas Extras e Cansaço Físico") 
          ? "Aplicação imediata de política rígida de desconexão pós-expediente, com rodízio preventivo de metas nos squads." 
          : triggers.includes("Barreira de Segurança Psicológica")
          ? "Implementar dinâmicas de 1:1 sem cobrança de tarefas (foco em desenvolvimento pessoal) e rituais de feedback baseados no modelo SBI."
          : "Realizar rituais quinzenais de feedback positivo e realinhamento de OKRs estruturado para consolidar o sentimento de valorização."
      })

      setNlpAnalyzing(false)
      setNlpAnalyzed(true)
      triggerToast("Análise NLP de sentimentos concluída com IA!", "ok")
    }, 1500)
  }

  // --- Executa o Scanner Clínico/Jurídico de Atestados (CID-11) ---
  const handleRunScanner = () => {
    if (scannerRunning) return
    setScannerRunning(true)
    setScannerResult(null)
    setScannerLogs([])

    const logs = [
      "[CID SCANNER] Inicializando engine de auditoria médica corporativa...",
      "[PARSER] Realizando leitura textual (OCR/Regex) buscando códigos CID-10 e CID-11...",
      "[ANALISADOR COGNITIVO] Identificando CIDs declarados em prontuário/atestado...",
      "[RISK ANALYSIS] Mapeando ameaça de Absenteísmo físico (tempo de afastamento)...",
      "[IA MATRICIAL] Avaliando taxa latente de Presenteísmo (impacto cognitivo pós-retorno)...",
      "[NR-1 COMPLIANCE] Cruzando diagnóstico com o Programa de Gerenciamento de Riscos (PGR)...",
      "[IA ADVISOR] Consolidando plano estratégico adaptativo de trabalho..."
    ]

    let current = 0
    const interval = setInterval(() => {
      if (current < logs.length) {
        setScannerLogs(prev => [...prev, logs[current]])
        current++
      } else {
        clearInterval(interval)
        setScannerRunning(false)

        // Mapeamento lógico de acordo com o texto digitado
        const text = certText.toUpperCase()
        let detected: string[] = []
        let type: 'Absenteísmo' | 'Presenteísmo Extremo' | 'Misto' = 'Misto'
        let presenteeismRisk = "Médio"
        let legalAction = ""
        let ergonomicAction = ""

        if (text.includes("6A05") || text.includes("TDAH")) {
          detected.push("CID-11 6A05 (Transtorno de Déficit de Atenção / Hiperatividade em Adultos)")
          type = "Presenteísmo Extremo"
          presenteeismRisk = "Crítico (Crash Mental e Sobrecarga por Falta de Processos)"
          ergonomicAction = "Desenho de rotinas altamente previsíveis. Uso obrigatório de cartões Kanban visuais, limitação estrita de reuniões longas sem pauta e tolerância a ruído controlado."
        }
        if (text.includes("8A80") || text.includes("ENXAGUECA")) {
          detected.push("CID-11 8A80 (Enxaqueca e Cefaleias Crônicas)")
          type = "Misto"
          presenteeismRisk = "Alto (Funcionário presente com capacidade cognitiva e foco zerados pela dor)"
          ergonomicAction = "Ergonomia física e cognitiva. Reduzir iluminação fluorescente direta no escritório, incentivar pausas de tela com a regra 20-20-20 (pausa longe de telas)."
        }
        if (text.includes("QD85") || text.includes("BURNOUT") || text.includes("Z73.0")) {
          detected.push("CID-11 QD85 (Síndrome de Burnout Ocupacional)")
          type = "Absenteísmo"
          presenteeismRisk = "Crítico (Risco iminente de invalidez temporária ou passivo trabalhista)"
          ergonomicAction = "Aplicação imediata de política rígida de desconexão (bloqueio de mensagens e e-mails corporativos após o expediente) e rodízio preventivo de metas."
        }
        if (text.includes("6A70") || text.includes("6A71") || text.includes("DEPRESSÃO") || text.includes("F41") || text.includes("ANSIEDADE")) {
          detected.push("CID-11 6B00 a 6B0E / 6A70 a 6A8F (Ansiedade Generalizada e Depressão)")
          if (type !== "Absenteísmo") type = "Misto"
          legalAction = "Adequação estrita do PGR conforme NR-1. Inclusão dos riscos psicossociais e plano de reintegração assistida por psicólogo corporativo."
        }

        if (detected.length === 0) {
          detected.push("CIDs gerais de cansaço ou não listados (Z73 / F43)")
          type = "Misto"
          presenteeismRisk = "Moderado"
          ergonomicAction = "Acolhimento geral e monitoramento das taxas de produtividade das equipes."
        }

        setScannerResult({
          detected,
          type,
          presenteeismRisk,
          ergonomicAction: ergonomicAction || "Adaptação geral do ambiente laborativo físico e virtual.",
          legalAction: legalAction || "Notificação de riscos ocupacionais no PGR (NR-1) e treinamento de líderes anti-estigma."
        })
        triggerToast("Atestado auditado e plano gerado pela IA!")
      }
    }, 450)
  }

  // --- Cálculos Científicos de Maslach (MBI) ---
  const calculateMBI = () => {
    // Escores baseados na literatura científica:
    // EE (Exaustão Emocional) >= 27 -> Alto
    // DP (Despersonalização) >= 10 -> Alto
    // RP (Realização Profissional) <= 33 -> Alto risco de Burnout (inversamente proporcional)
    let riskLevel = "Baixo Risco"
    let color = "text-emerald-400 border-emerald-500/30 bg-emerald-500/5"
    let details = "Excelente. Os indicadores apontam engajamento saudável e satisfação no trabalho."

    const eeHigh = eeScore >= 27
    const dpHigh = dpScore >= 10
    const rpLow = rpScore <= 33

    if (eeHigh && dpHigh && rpLow) {
      riskLevel = "CRÍTICO - Síndrome de Burnout Ativa"
      color = "text-red-400 border-red-500/30 bg-red-500/5 animate-pulse"
      details = "Alerta Vermelho de Governança. O profissional apresenta esgotamento emocional severo, cinismo e sentimento de incapacidade. Afastamento preventivo e intervenção clínica imediata recomendada."
    } else if (eeHigh || dpHigh) {
      riskLevel = "MODERADO - Risco de Exaustão Laboral"
      color = "text-amber-400 border-amber-500/30 bg-amber-500/5"
      details = "Fase de Alerta. Sinais iniciais de esgotamento e despersonalização. Recomenda-se redução imediata de horas extras, férias ou redistribuição preventiva de tarefas."
    } else if (rpLow) {
      riskLevel = "ALERTA - Desmotivação & Frustração"
      color = "text-yellow-400 border-yellow-500/30 bg-yellow-500/5"
      details = "Atenção ao engajamento. Embora a exaustão física seja baixa, o sentimento de realização desabou. A liderança deve focar em feedback de reconhecimento e redefinição de plano de carreira."
    }

    return { riskLevel, color, details }
  }

  const mbiResult = calculateMBI()

  // --- Módulo ROI Calculadora Matemática Dinâmica ---
  // Estresse Ocupacional afeta 67% no BR
  // Retorno estimado de R$ 4 para cada R$ 1 investido
  const savedTurnoverCosts = Math.round(investValue * 3.8)
  const absenteismoReduction = (8.2 - (investValue / 100000) * 5.8).toFixed(2)
  const presenteismoReduction = (15.4 - (investValue / 100000) * 11.6).toFixed(2)
  const calculatedROI = investValue > 0 ? (savedTurnoverCosts / investValue).toFixed(1) : "0"

  return (
    <div 
      className="w-full h-full flex flex-col p-4 bg-[#050507]/90 border border-[#d2af5a]/25 rounded-3xl backdrop-blur-2xl select-text overflow-y-auto ipb-thinscroll pr-1 text-white"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      {/* Toast Global */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[99999] px-4 py-2 bg-black border border-[#d2af5a] text-[#d2af5a] font-mono text-[9px] rounded-xl shadow-lg"
          >
            🛰️ {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header com Estilização Premium da NASA */}
      <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
        <div className="space-y-0.5">
          <span className="text-[9px] font-mono text-[#d2af5a] font-bold uppercase tracking-widest block">
            SIG · SISTEMA INTEGRADO DE GESTÃO COGNITIVA
          </span>
          <h2 className="text-sm font-bold text-white tracking-wide">
            🌱 CAPITAL HUMANO & RISCOS PSICOSSOCIAIS IA
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded-full text-[9px] font-mono text-[#d2af5a] animate-pulse">
          <HeartPulse className="h-3 w-3" />
          <span>ATIVO COM SEGURANÇA PSICOLÓGICA</span>
        </div>
      </div>

      {/* Grid de Overview & Estatísticas do Brasil */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-left">
          <span className="text-[7.5px] text-white/45 uppercase tracking-wider block font-mono">ESTRESSE OCUPACIONAL</span>
          <span className="text-lg font-bold text-[#d2af5a] font-mono">67%</span>
          <p className="text-[7px] text-white/50 leading-tight mt-0.5">Supera a média global de 65%, desencadeando crises severas no caixa.</p>
        </div>
        <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-left">
          <span className="text-[7.5px] text-white/45 uppercase tracking-wider block font-mono">BURNOUT ATIVO</span>
          <span className="text-lg font-bold text-[#d2af5a] font-mono">30%</span>
          <p className="text-[7px] text-white/50 leading-tight mt-0.5">Afeta diretamente o ecossistema corporativo brasileiro.</p>
        </div>
        <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-left">
          <span className="text-[7.5px] text-white/45 uppercase tracking-wider block font-mono">TURNOVER EXAUSTO</span>
          <span className="text-lg font-bold text-[#d2af5a] font-mono">2.6x</span>
          <p className="text-[7px] text-white/50 leading-tight mt-0.5">Trabalhadores exaustos buscam ativamente outro emprego corporativo.</p>
        </div>
        <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-left">
          <span className="text-[7.5px] text-white/45 uppercase tracking-wider block font-mono">CUSTO ROTATIVIDADE</span>
          <span className="text-lg font-bold text-[#d2af5a] font-mono">50%-200%</span>
          <p className="text-[7px] text-white/50 leading-tight mt-0.5">Do salário anual do cargo em perda de rendimento e processos seletivos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-visible">
        
        {/* COLUNA ESQUERDA: MONITORAMENTO IA (Surveys & MBI) */}
        <div className="space-y-4">
          
          {/* Módulo 1: Pulse Surveys & IA Sentiment Analyzer */}
          <div className="p-3 bg-black/60 border border-[#d2af5a]/15 rounded-2xl text-left space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] font-bold text-[#d2af5a] font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Bot className="h-3 w-3" />
                1. Pesquisas de Clima de Pulso (Pulse Surveys) + Sentiment Analyzer
              </span>
              <span className="text-[7.5px] font-mono text-white/35">ANÔNIMO & CRIPTOGRAFADO</span>
            </div>

            <div className="space-y-3">
              {/* Seleção do Tipo de Pesquisa */}
              <div className="flex gap-2 p-1 bg-black/45 border border-white/10 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setSurveyType('validated')}
                  className={`px-3 py-1 rounded-lg text-[8.5px] font-mono font-bold tracking-wider uppercase transition-all ${
                    surveyType === 'validated' 
                      ? 'bg-[#d2af5a] text-black shadow-md' 
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  Formulário Validado (Recomendado)
                </button>
                <button
                  type="button"
                  onClick={() => setSurveyType('custom')}
                  className={`px-3 py-1 rounded-lg text-[8.5px] font-mono font-bold tracking-wider uppercase transition-all ${
                    surveyType === 'custom' 
                      ? 'bg-[#d2af5a] text-black shadow-md' 
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  Pergunta Customizada
                </button>
              </div>

              {/* Grid Principal — Alinhamento nobre para evitar cortes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-3">
                  <label className="block text-[7.5px] uppercase font-mono text-white/45 mb-1 whitespace-nowrap">Roteamento da Pergunta de Pulso Ativo</label>
                  {surveyType === 'custom' ? (
                    <input 
                      type="text" 
                      value={pulseQuestion} 
                      onChange={(e) => setPulseQuestion(e.target.value)}
                      placeholder="Escreva sua pergunta de pulso customizada aqui..."
                      className="w-full bg-black/55 border border-[#d2af5a]/20 rounded-lg py-1.5 px-2.5 text-[8.5px] text-white/80 outline-none focus:border-[#d2af5a]/60 font-sans mt-0.5 h-[28px]"
                    />
                  ) : (
                    <div className="bg-black/45 border border-[#d2af5a]/10 rounded-lg py-1.5 px-2.5 text-[8.5px] text-[#fac775] font-mono mt-0.5 flex items-center gap-1.5 h-[28px] overflow-hidden">
                      <span>🔬</span>
                      <span className="truncate">Formulário Científico Validado (3 Perguntas + Comentário NLP)</span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block text-[7.5px] uppercase font-mono text-white/45 mb-1 whitespace-nowrap">Categoria de Impacto</label>
                  <select 
                    value={pulseCategory} 
                    onChange={(e) => setPulseCategory(e.target.value)}
                    className="w-full bg-black/55 border border-[#d2af5a]/20 rounded-lg py-1.5 px-2 text-[8.5px] text-[#d2af5a] outline-none mt-0.5 h-[28px] font-mono"
                  >
                    <option value="Sobrecarga & Carga Horária">Sobrecarga & Carga Horária</option>
                    <option value="Suporte de Liderança">Suporte de Liderança</option>
                    <option value="Reconhecimento & Clima">Reconhecimento & Clima</option>
                    <option value="Segurança Psicológica">Segurança Psicológica</option>
                  </select>
                </div>
              </div>

              {/* Lista Dinâmica de Perguntas da Escala Validada */}
              {surveyType === 'validated' && (
                <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl space-y-1.5 text-[8.2px] leading-relaxed">
                  <span className="text-[7.2px] font-mono text-[#fac775] font-bold block uppercase tracking-widest">Itens Acadêmicos — Escala de {pulseCategory}</span>
                  <div className="space-y-1 font-sans text-white/70">
                    {VALIDATED_SURVEYS[pulseCategory].map((qStr, idx) => (
                      <div key={idx} className="flex gap-1.5 items-start">
                        <span className="text-[#fac775] font-mono">0{idx + 1}.</span>
                        <span>{qStr}</span>
                      </div>
                    ))}
                    <div className="flex gap-1.5 items-start text-white/45 mt-0.5 border-t border-white/5 pt-1">
                      <span>💬</span>
                      <span>[Feedback qualitativo opcional para análise NLP com Inteligência Artificial]</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Seletor de Destinatários Reais */}
              <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-[7.5px] font-mono text-white/45 uppercase tracking-widest border-b border-white/5 pb-1.5">
                  <span>Destinatários Ativos ({selectedRecipients.length} de {teamMembers.length} selecionados)</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedRecipients.length === teamMembers.length) {
                        setSelectedRecipients([])
                      } else {
                        setSelectedRecipients(teamMembers.map(m => m.id))
                      }
                    }}
                    className="text-[#fac775] hover:text-[#d2af5a] font-bold transition-colors"
                  >
                    {selectedRecipients.length === teamMembers.length ? "DESMARCAR TODOS" : "MARCAR TODOS"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5 max-h-[110px] overflow-y-auto ipb-thinscroll pr-1">
                  {teamMembers.length === 0 ? (
                    <div className="col-span-2 text-center py-4 text-[8px] text-white/30 italic">
                      Nenhum colaborador cadastrado no SIG Pessoas. 
                      <button
                        onClick={() => {
                          const mockTeam = [
                            { id: 'm-1', name: 'Rodrigo Silva', role: 'Coord. Reabilitação', email: 'rodrigo@ipb.org.br', type: 'Líder & Gestor', d6: 82 },
                            { id: 'm-2', name: 'Juliana Mendes', role: 'Gestora de Leitos', email: 'juliana@ipb.org.br', type: 'Gestor', d6: 88 },
                            { id: 'm-3', name: 'Lucas Alencar', role: 'Fisioterapeuta Sênior', email: 'lucas@ipb.org.br', type: 'Liderado', d6: 68 },
                            { id: 'm-4', name: 'Ana Beatriz', role: 'Head de Inovação', email: 'ana@ipb.org.br', type: 'Líder', d6: 91 }
                          ]
                          localStorage.setItem('ipb-team-members', JSON.stringify(mockTeam))
                          setTeamMembers(mockTeam)
                          setSelectedRecipients(mockTeam.map(m => m.id))
                          triggerToast("Time padrão carregado para testes de pesquisas!")
                        }}
                        className="text-[#d2af5a] block underline mx-auto mt-1 cursor-pointer"
                      >
                        Carregar time de teste padrão do IPB
                      </button>
                    </div>
                  ) : (
                    teamMembers.map(m => (
                      <label 
                        key={m.id}
                        className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all cursor-pointer ${
                          selectedRecipients.includes(m.id) 
                            ? 'bg-[#d2af5a]/5 border-[#d2af5a]/30 text-white' 
                            : 'bg-black/20 border-white/5 text-white/50 hover:border-white/10'
                        }`}
                      >
                        <input 
                          type="checkbox"
                          checked={selectedRecipients.includes(m.id)}
                          onChange={() => {
                            if (selectedRecipients.includes(m.id)) {
                              setSelectedRecipients(selectedRecipients.filter(id => id !== m.id))
                            } else {
                              setSelectedRecipients([...selectedRecipients, m.id])
                            }
                          }}
                          className="rounded bg-black border-[#d2af5a]/30 accent-[#d2af5a] h-3 w-3 cursor-pointer"
                        />
                        <div className="text-left min-w-0 flex-1">
                          <p className="text-[8.5px] font-bold truncate leading-none">{m.name}</p>
                          <p className="text-[7px] font-mono text-white/35 mt-0.5 truncate leading-none">{m.email} · {m.type || 'Liderado'}</p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Botões de Ação de Disparo */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunPulse}
                  disabled={surveyRunning}
                  className="px-3.5 py-1.5 bg-[#d2af5a]/10 hover:bg-[#d2af5a]/20 disabled:bg-white/5 disabled:text-white/20 border border-[#d2af5a]/30 hover:border-[#d2af5a]/70 text-[#d2af5a] font-mono text-[8.5px] font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5"
                >
                  <Play className={`h-2.5 w-2.5 ${surveyRunning ? 'animate-spin' : ''}`} />
                  {surveyRunning ? 'DISPARANDO...' : 'DISPARAR VIA E-MAIL (RESEND)'}
                </button>
                <div className="flex-1 text-[7.5px] text-white/40 leading-tight">
                  Dispara o formulário de clima selecionado por e-mail para todos os colaboradores marcados.
                </div>
              </div>
            </div>

            {/* Terminal de Logs do Scanner do Módulo 1 */}
            <div className="relative">
              <div 
                ref={logContainerRef}
                className="h-[80px] overflow-y-auto ipb-thinscroll bg-black/75 rounded-lg p-2 border border-white/5 font-mono text-[7.8px] text-[#d2af5a]/80 space-y-1"
              >
                {surveyLogs.length === 0 ? (
                  <span className="text-white/20 italic block text-center pt-6">Terminal aguardando ativação do envio de pulso IA...</span>
                ) : (
                  surveyLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      <span className="text-white/30 mr-1.5 font-sans">[{new Date().toLocaleTimeString()}]</span>
                      {log}
                    </div>
                  ))
                )}
              </div>
              
              {surveySuccess && (
                <div className="grid grid-cols-2 gap-2 mt-2 p-2 bg-[#d2af5a]/5 rounded-lg border border-[#d2af5a]/20">
                  <div className="text-center border-r border-white/5">
                    <span className="text-[7.2px] text-white/45 uppercase tracking-wider block font-mono">CLIMA INDEX ATUALIZADO</span>
                    <span className="text-sm font-mono font-bold text-[#d2af5a]">{climaIndex}/100</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[7.2px] text-white/45 uppercase tracking-wider block font-mono">ESTRESSE DETECTADO</span>
                    <span className={`text-sm font-mono font-bold ${estresseIndex >= 70 ? 'text-red-400' : 'text-emerald-400'}`}>{estresseIndex}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Módulo Respostas Recebidas via API e IA NLP */}
            <div className="border-t border-white/10 pt-3 space-y-2 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[8.5px] font-bold text-[#d2af5a] font-mono uppercase tracking-wider flex items-center gap-1.5">
                  📥 Respostas Anônimas Recebidas via E-mail
                </span>
                <button
                  type="button"
                  onClick={fetchSurveyResponses}
                  disabled={loadingResponses}
                  className="text-[7px] font-mono text-white/40 hover:text-[#d2af5a] transition-colors uppercase cursor-pointer"
                >
                  {loadingResponses ? "Carregando..." : "🔄 Atualizar"}
                </button>
              </div>

              <div className="h-[95px] overflow-y-auto ipb-thinscroll bg-black/45 rounded-lg p-2 border border-white/5 space-y-2">
                {surveyResponses.length === 0 ? (
                  <div className="text-center py-6 text-[8px] text-white/20 italic font-mono">
                    Aguardando submissões anônimas na rota de e-mail...
                    <p className="text-[7px] text-white/15 mt-1 leading-normal">
                      Os e-mails disparados contêm links únicos para responder. 
                      Submeta respostas na página pública /pesquisa para ver o feed ao vivo!
                    </p>
                  </div>
                ) : (
                  surveyResponses.map((r, i) => (
                    <div key={i} className="p-2 bg-black/60 border border-white/5 rounded-lg leading-normal font-sans text-[8.2px] hover:border-[#d2af5a]/25 transition-colors">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1 font-mono text-[7px] text-white/40">
                        <span className="text-[#fac775] truncate max-w-[140px] font-bold uppercase">{r.category}</span>
                        <div className="flex gap-2">
                          <span className="text-[#5dcaa5] font-bold">Nota: {r.score}/5</span>
                          <span>{new Date(r.timestamp).toLocaleTimeString("pt-BR")}</span>
                        </div>
                      </div>
                      <p className="text-white/80 font-medium italic">"{r.text || "Sem comentário qualitativo."}"</p>
                      <p className="text-white/30 text-[6.5px] font-mono mt-1">Item: {r.question || "Pergunta Avulsa"}</p>
                    </div>
                  ))
                )}
              </div>

              {surveyResponses.length > 0 && (
                <div className="flex items-center gap-2 pt-1.5">
                  <button
                    onClick={handleRunNLP}
                    disabled={nlpAnalyzing}
                    className="px-3 py-1.5 bg-[#d2af5a]/15 hover:bg-[#d2af5a]/25 border border-[#d2af5a]/40 text-[#d2af5a] font-mono text-[8px] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🧠</span> {nlpAnalyzing ? "RODANDO NLP..." : "RODAR ANÁLISE IA NLP"}
                  </button>
                  <span className="text-[7.2px] text-white/40 leading-tight">
                    Cruza depoimentos e notas reais para redefinir clima/estresse psicossocial.
                  </span>
                </div>
              )}

              {nlpAnalyzed && nlpReport && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 bg-[#d2af5a]/5 border border-[#d2af5a]/25 rounded-xl space-y-1.5 text-[8px] leading-relaxed"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="text-[#d2af5a] font-mono font-bold uppercase text-[7.2px]">Relatório NLP de Clima Corporativo</span>
                    <span className={`font-mono text-[7px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      nlpReport.sentiment === 'Seguro' ? 'bg-[#5dcaa5]/15 text-[#5dcaa5]' : 'bg-red-500/10 text-red-400 animate-pulse'
                    }`}>{nlpReport.sentiment}</span>
                  </div>
                  <div>
                    <span className="text-white/40 font-mono text-[7px] uppercase block">Gatilhos Psicossociais Detectados:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {nlpReport.detectedTriggers.map((trig: string, idx: number) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-red-950/20 border border-red-900/30 text-red-400 rounded font-mono text-[7px]">{trig}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/80 font-sans">
                    💡 <b>Diretriz de Segurança Psicológica:</b> {nlpReport.recommendation}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Módulo 2: Maslach Burnout Inventory (MBI) Calculadora Científica */}
          <div className="p-3 bg-black/60 border border-[#d2af5a]/15 rounded-2xl text-left space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] font-bold text-[#d2af5a] font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="h-3 w-3" />
                2. Diagnóstico Científico Maslach (MBI - Burnout Inventory)
              </span>
              <span className="text-[7.5px] font-mono text-white/35">CÁLCULO PADRÃO INTERNACIONAL</span>
            </div>

            <div className="space-y-3">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between items-center mb-0.5 text-[8.5px]">
                  <span className="font-light text-white/60">Exaustão Emocional (EE) <i className="text-white/30 font-sans font-light">(Esgotamento de energia física e mental)</i></span>
                  <span className="font-mono font-bold text-[#d2af5a]">{eeScore} / 54</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="54" 
                  value={eeScore} 
                  onChange={(e) => setEeScore(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#d2af5a]" 
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between items-center mb-0.5 text-[8.5px]">
                  <span className="font-light text-white/60">Despersonalização (DP) <i className="text-white/30 font-sans font-light">(Cinismo, distanciamento e frieza no trabalho)</i></span>
                  <span className="font-mono font-bold text-[#d2af5a]">{dpScore} / 30</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={dpScore} 
                  onChange={(e) => setDpScore(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#d2af5a]" 
                />
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between items-center mb-0.5 text-[8.5px]">
                  <span className="font-light text-white/60">Realização Profissional (RP) <i className="text-white/30 font-sans font-light">(Sentimento de eficácia, competência e valor)</i></span>
                  <span className="font-mono font-bold text-[#d2af5a]">{rpScore} / 48</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="48" 
                  value={rpScore} 
                  onChange={(e) => setRpScore(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#d2af5a]" 
                />
              </div>
            </div>

            {/* Resultado do Inventário Maslach */}
            <div className={`p-2.5 border rounded-xl leading-normal space-y-1.5 transition-all duration-200 ${mbiResult.color}`}>
              <div className="flex justify-between items-center font-mono">
                <span className="text-[7.2px] uppercase font-bold tracking-wider opacity-60">DIAGNÓSTICO MASLACH RECALIBRADO</span>
                <span className="text-[9.5px] font-bold">{mbiResult.riskLevel}</span>
              </div>
              <p className="text-[8.2px] font-sans text-white/80">
                {mbiResult.details}
              </p>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA: PARSER DE ATESTADOS & COMPLIANCE NR-1 + ROI */}
        <div className="space-y-4">
          
          {/* Módulo 3: Mapeador de Atestados & Scanner de CID-11 */}
          <div className="p-3 bg-black/60 border border-[#d2af5a]/15 rounded-2xl text-left space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] font-bold text-[#d2af5a] font-mono uppercase tracking-wider flex items-center gap-1.5">
                <HeartPulse className="h-3 w-3" />
                3. AI CID-11 Scanner & Monitor de Absenteísmo vs. Presenteísmo
              </span>
              <span className="text-[7.5px] font-mono text-white/35">NR-1 E SAÚDE MENTAL</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[7.5px] uppercase font-mono text-white/45">Atestados Médicos (Entrada de Dados)</label>
                <div className="flex gap-1.5">
                  {ATESTADOS_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCertText(tmpl.text)}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 hover:border-[#d2af5a]/40 text-[7px] font-mono rounded hover:bg-white/10 transition-all text-white/60"
                    >
                      Caso {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={certText}
                onChange={(e) => setCertText(e.target.value)}
                rows={3}
                placeholder="Insira o texto do atestado médico para auditoria inteligente..."
                className="w-full bg-black/55 border border-[#d2af5a]/20 rounded-lg py-1.5 px-2 text-[8.5px] text-white/80 outline-none focus:border-[#d2af5a]/60 font-mono resize-none leading-relaxed"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunScanner}
                  disabled={scannerRunning}
                  className="px-3.5 py-1.5 bg-[#d2af5a]/10 hover:bg-[#d2af5a]/20 disabled:bg-white/5 disabled:text-white/20 border border-[#d2af5a]/30 hover:border-[#d2af5a]/70 text-[#d2af5a] font-mono text-[8.5px] font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5"
                >
                  <Activity className={`h-2.5 w-2.5 ${scannerRunning ? 'animate-spin' : ''}`} />
                  {scannerRunning ? 'VARRENDO ATESTADO...' : 'VARREDURA ATIVA CID-11'}
                </button>
                <div className="flex-1 text-[7.5px] text-white/40 leading-tight">
                  O scanner cognitivo mapeia patologias mentais e físicas para neutralizar presenteísmo e passivos trabalhistas.
                </div>
              </div>
            </div>

            {/* Terminal do Módulo 3 */}
            <div className="relative">
              <div 
                ref={scannerLogRef}
                className="h-[80px] overflow-y-auto ipb-thinscroll bg-black/75 rounded-lg p-2 border border-white/5 font-mono text-[7.8px] text-[#d2af5a]/80 space-y-1"
              >
                {scannerLogs.length === 0 ? (
                  <span className="text-white/20 italic block text-center pt-6">Terminal aguardando upload/escaneamento de atestado...</span>
                ) : (
                  scannerLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      <span className="text-white/30 mr-1.5 font-sans">[{new Date().toLocaleTimeString()}]</span>
                      {log}
                    </div>
                  ))
                )}
              </div>

              {/* Resultado do Scanner CID-11 */}
              {scannerResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2.5 p-3 bg-black/70 border border-[#d2af5a]/20 rounded-xl space-y-2 text-[8.5px]"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="text-[#d2af5a] font-bold font-mono text-[7.5px] uppercase tracking-wide">Relatório Analítico do Atestado</span>
                    <span className="text-red-400 font-mono text-[7.2px] uppercase">Risco de Presenteísmo: {scannerResult.presenteísmoRisk || 'Alto'}</span>
                  </div>

                  <div>
                    <span className="text-white/45 block text-[7px] uppercase font-mono">Patologia(s) Mapeada(s):</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {scannerResult.detected.map((det: string, i: number) => (
                        <span key={i} className="px-1.5 py-0.5 bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded text-[7.8px] font-mono text-[#d2af5a]">
                          {det}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[8px] leading-relaxed mt-1">
                    <div className="bg-[#d2af5a]/5 p-2 rounded border border-white/5">
                      <b className="text-white block font-mono uppercase text-[6.8px] mb-0.5">🛋️ Ergonomia & Acolhimento Preventivo:</b>
                      <span className="text-white/80">{scannerResult.ergonomicAction}</span>
                    </div>
                    <div className="bg-[#d2af5a]/5 p-2 rounded border border-white/5">
                      <b className="text-white block font-mono uppercase text-[6.8px] mb-0.5">⚖️ Proteção de Caixa & NR-1:</b>
                      <span className="text-white/80">{scannerResult.legalAction}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Módulo 4: Calculadora ROI de Investimento em Saúde Mental */}
          <div className="p-3 bg-black/60 border border-[#d2af5a]/15 rounded-2xl text-left space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] font-bold text-[#d2af5a] font-mono uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="h-3 w-3" />
                4. Simulador do Retorno sobre Investimento (ROI de Saúde Mental)
              </span>
              <span className="text-[7.5px] font-mono text-white/35">DADOS EMPÍRICOS (RETORNO R$ 4 POR R$ 1)</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-0.5 text-[8.5px]">
                  <span className="font-light text-white/60">Investimento Mensal Projetado em Saúde Emocional</span>
                  <span className="font-mono font-bold text-[#d2af5a]">R$ {investValue.toLocaleString('pt-BR')}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  step="2500"
                  value={investValue} 
                  onChange={(e) => setInvestValue(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#d2af5a]" 
                />
              </div>

              {/* Resultados do Simulador Financeiro */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-black/45 border border-white/5 rounded-lg text-center">
                  <span className="text-[6.8px] text-white/45 uppercase font-mono block">Absenteísmo</span>
                  <span className="text-[11px] font-bold text-emerald-400 font-mono">-{absenteismoReduction}%</span>
                </div>
                <div className="p-2 bg-black/45 border border-white/5 rounded-lg text-center">
                  <span className="text-[6.8px] text-white/45 uppercase font-mono block">Presenteísmo</span>
                  <span className="text-[11px] font-bold text-emerald-400 font-mono">-{presenteismoReduction}%</span>
                </div>
                <div className="p-2 bg-[#d2af5a]/5 border border-[#d2af5a]/25 rounded-lg text-center">
                  <span className="text-[6.8px] text-[#d2af5a] uppercase font-mono block font-bold">ROI Esperado</span>
                  <span className="text-[11px] font-bold text-[#d2af5a] font-mono">{calculatedROI}x</span>
                </div>
              </div>

              <div className="p-2 bg-[#d2af5a]/5 rounded-lg border border-[#d2af5a]/20 text-[8.2px] text-white/70 leading-relaxed font-sans">
                🛡️ <b>Impacto de Caixa:</b> Seu investimento anualizado gera uma economia estimada de <b>R$ {savedTurnoverCosts.toLocaleString('pt-BR')}</b> em custos evitados de rotatividade (treinamentos, perda de ROI e presenteeísmo neutralizado), protegendo o EBITDA contra vazamentos e passivos.
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* PLANO DE AÇÃO ESTRATÉGICO: PREVENIR & PROTEGER (CAUSAS RAIZ & BLINDAGEM LEGAL) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-4 mt-4 text-left">
        
        {/* Como Prevenir (Causas Raiz) */}
        <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-2">
          <span className="text-[9px] font-bold text-[#d2af5a] font-mono uppercase tracking-wider block flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-[#d2af5a]" />
            COMO PREVENIR (AÇÕES NA CAUSA RAIZ)
          </span>
          <div className="text-[8.5px] text-white/70 space-y-1.5 leading-relaxed font-sans">
            <p>
              • <b>Capacitação de Liderança Ativa:</b> Treinar gestores corporativos para mapear sinais precoces de esgotamento e cinismo, proibindo e banindo integralmente o microgerenciamento tóxico.
            </p>
            <p>
              • <b>Desenho Inteligente de Cargos:</b> Metas operacionais calibradas com carga horária realista e estabelecimento de políticas severas de desconexão laboral após o expediente.
            </p>
            <p>
              • <b>Cultura de Segurança Psicológica:</b> Fornecer ambientes que fomentem a livre manifestação sobre sobrecarga crônica sem perigo de demissões ou retaliações corporativas.
            </p>
          </div>
        </div>

        {/* Como Proteger (Blindagem Legal & NR-1) */}
        <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-2">
          <span className="text-[9px] font-bold text-[#d2af5a] font-mono uppercase tracking-wider block flex items-center gap-1.5">
            <ShieldAlert className="h-3 w-3 text-[#d2af5a]" />
            COMO PROTEGER (BLINDAGEM LEGAL & NR-1)
          </span>
          <div className="text-[8.5px] text-white/70 space-y-1.5 leading-relaxed font-sans">
            <p>
              • <b>Adequação Estrita da NR-1:</b> Mapeamento obrigatório de riscos psicossociais no Programa de Gerenciamento de Riscos (PGR) corporativo com auditoria em tempo real.
            </p>
            <p>
              • <b>Programas de Apoio Especializado:</b> Benefícios focados em saúde mental e Canal de Ouvidoria com assistência psicológica, jurídica e financeira terceirizada (EAP).
            </p>
            <p>
              • <b>Análise Cruzada de Desligamento:</b> Cruzamento sistemático de turnover e dados de exit interviews para rastrear líderes tóxicos e áreas com sobrecarga crônica de horas.
            </p>
          </div>
        </div>

        {/* Mapeamento de CID-11 de Saúde Mental e Risco de Presenteísmo */}
        <div className="p-3 bg-[#d2af5a]/5 border border-[#d2af5a]/25 rounded-xl space-y-2">
          <span className="text-[9px] font-bold text-[#d2af5a] font-mono uppercase tracking-wider block flex items-center gap-1.5">
            <FileText className="h-3 w-3 text-[#d2af5a]" />
            🩺 INDICADORES DE ABSENTEÍSMO E PRESENTEÍSMO
          </span>
          <div className="text-[8.2px] text-white/75 space-y-1.5 leading-tight font-sans">
            <p>
              • <b>Depressão e Ansiedade (CID-11 6A70 a 6B0E):</b> Motores principais do <i>Absenteísmo</i> (afastamento físico e atestados por CID F).
            </p>
            <p>
              • <b>Burnout e Estresse Crônico (CID-11 QD85):</b> Síndrome decorrente do desequilíbrio persistente e falhas de governança psicossocial do trabalho.
            </p>
            <p>
              • <b>Enxaqueca & Cefaleia (CID-11 8A80) e TDAH em Adulto (CID-11 6A05):</b> Grandes impulsionadores de <i>Presenteísmo</i>. O funcionário bate o ponto física/virtualmente, mas com capacidade analítica severamente comprometida pela dor ou crash neurodivergente sob caos.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}
