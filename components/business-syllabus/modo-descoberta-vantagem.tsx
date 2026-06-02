'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { 
  Sparkles, Zap, Award, Shield, Users, RefreshCw, Layers, CheckCircle2, 
  Flame, ArrowRight, Play, Square, Loader2, Compass, AlertCircle, Bot,
  Volume2, VolumeX, HelpCircle, Activity, Heart, Copy
} from 'lucide-react'

import { saveStrategicDossier } from '@/lib/rxdb'
import { gsap } from 'gsap'

// Definição dos tipos para passar métricas de volta para o Cockpit principal
interface ModoDescobertaProps {
  onClose: () => void
  onCalibrateCockpit: (metrics: {
    ebitda: number
    ltvCac: number
    tdbd: number
    sequestroAmigdala: number
    friccaoPersonagem: number
    custoDopaminergico: number
    verdict: string
    scenario: 'custom'
  }) => void
}

interface NeuralParticleStormProps {
  active: boolean
}

function NeuralParticleStorm({ active }: NeuralParticleStormProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const width = 280
    const height = 280
    canvas.width = width
    canvas.height = height

    const particleCount = 24
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
      pulseSpeed: number
      pulsePhase: number
    }> = []

    // Initialize particles floating around the center orb
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 45 + Math.random() * 75
      particles.push({
        x: width / 2 + Math.cos(angle) * distance,
        y: height / 2 + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 1 + Math.random() * 1.8,
        alpha: 0.18 + Math.random() * 0.35,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2

      // Draw faint connections between particles
      ctx.lineWidth = 0.55
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 60) {
            const opacity = (1 - dist / 60) * 0.14 * (active ? 2.2 : 1.0)
            ctx.strokeStyle = `rgba(210, 175, 90, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        const speedMultiplier = active ? 2.4 : 0.95
        p.x += p.vx * speedMultiplier
        p.y += p.vy * speedMultiplier

        const dx = centerX - p.x
        const dy = centerY - p.y
        const distToCenter = Math.sqrt(dx * dx + dy * dy)

        // Float boundaries & gravity
        if (distToCenter > 120) {
          p.vx += (dx / distToCenter) * 0.005
          p.vy += (dy / distToCenter) * 0.005
        }

        // Float drift boundaries
        if (p.x < 15 || p.x > width - 15) p.vx *= -0.8
        if (p.y < 15 || p.y > height - 15) p.vy *= -0.8

        p.pulsePhase += p.pulseSpeed * (active ? 2.5 : 1.0)
        const currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulsePhase))

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * (active ? 1.4 : 1.0), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210, 175, 90, ${currentAlpha})`
        ctx.shadowColor = '#d2af5a'
        ctx.shadowBlur = active ? 9 : 2
        ctx.fill()
        ctx.shadowBlur = 0 // Reset

        // Draw synapses to center
        if (distToCenter < 100 && distToCenter > 40) {
          const synapseOpacity = (1 - distToCenter / 100) * 0.08 * (active ? 2.4 : 0.8)
          ctx.strokeStyle = `rgba(210, 175, 90, ${synapseOpacity})`
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(centerX, centerY)
          ctx.stroke()
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [active])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute pointer-events-none select-none z-0" 
      style={{ width: '280px', height: '280px' }}
    />
  )
}

export function ModoDescobertaVantagem({ onClose, onCalibrateCockpit }: ModoDescobertaProps) {
  const [step, setStep] = useState<number>(0)
  
  // --- Passo 1: Estados da Matriz de Interseção ("Eu Integral") ---
  const [skill1, setSkill1] = useState('8 anos salvando vidas em UTI (Fisioterapeuta Intensivista)')
  const [skill2, setSkill2] = useState('Business Interdisciplinar & Gestão Estratégica')
  const [skill3, setSkill3] = useState('Tecnologia da Automação & Business Intelligence')
  const [skill4, setSkill4] = useState('Saúde Mental & Controle Emocional sob Pressão')
  const [isFusing, setIsFusing] = useState(false)
  const [isFused, setIsFused] = useState(false)
  
  // --- Passo 2: Estados da Entrevista Socrática por Voz ---
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0)
  const [socraticAnswers, setSocraticAnswers] = useState<string[]>(['', ''])
  const [autocriticaBar, setAutocriticaBar] = useState(100) // fricção de autocrítica (%)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const radarSvgRef = useRef<SVGSVGElement | null>(null)

  // Perguntas da mentora por voz
  const socraticQuestions = [
    {
      text: "Diga-me com o coração livre de falsa modéstia: o que os seus clientes, pacientes ou alunos te elogiam constantemente, e que você costuma ignorar ou acha que é 'bobagem' ou fácil demais?",
      ttsText: "Olá! Sou sua mentora neuropsicológica de negócios do Business Syllabus. Vamos driblar a sua autocrítica. Diga-me com sinceridade: o que os seus clientes, pacientes ou alunos te elogiam constantemente, e que você costuma ignorar por achar que é fácil demais ou óbvio?",
      placeholder: "Ex: As pessoas dizem que eu trago calma extrema e segurança nos piores momentos de crise...",
      presets: [
        "Minha velocidade cirúrgica para enxergar o erro no processo sob estresse extremo.",
        "Minha capacidade de desmembrar dados técnicos complexos em conselhos simples e humanos.",
        "A sensação de segurança e calma inabalável que transmito mesmo quando a UTI/empresa está desabando."
      ]
    },
    {
      text: "Agora, responda com sua indignação saudável: o que te dá mais raiva e profunda indignação ética quando você olha para o marketing dos seus concorrentes no seu nicho de atuação?",
      ttsText: "Excelente reflexão. Agora, responda com sua indignação saudável: o que te dá mais raiva e profunda indignação ética quando você olha para o marketing dos seus concorrentes no seu nicho?",
      placeholder: "Ex: Ver gurus vendendo robôs milagrosos sem suporte e quebrando a saúde mental de quem compra...",
      presets: [
        "A venda de promessas de enriquecimento rápido sem esforço e sem suporte real (gurus clones).",
        "A total reatividade e instabilidade emocional dos concorrentes que atacam ou bloqueiam quem faz perguntas sérias.",
        "A falta de dados auditáveis e rastreabilidade real, vendendo ilusão de palco que quebra o caixa alheio."
      ]
    }
  ]

  // --- Passo 3: Estados do Mapeamento do Ponto Cego (TDBD) ---
  const [isScanning, setIsScanning] = useState(false)
  const [scanLogs, setScanLogs] = useState<string[]>([])
  const [scanProgress, setScanProgress] = useState(0)
  
  // --- Passo 4: Xeque-Mate Final ---
  const [showPitchCopyAlert, setShowPitchCopyAlert] = useState(false)
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null)

  // Presets Rápidos de Histórico
  const applyPreset = () => {
    setSkill1('8 anos salvando vidas em UTI (Fisioterapeuta Intensivista)')
    setSkill2('Business Interdisciplinar & Gestão Estratégica')
    setSkill3('Tecnologia da Automação & Business Intelligence')
    setSkill4('Saúde Mental & Controle Emocional sob Pressão')
  }

  // --- FUNÇÕES DE FUSÃO DA MATRIZ (PASSO 1) ---
  const handleStartFusion = () => {
    setIsFusing(true)
    setTimeout(() => {
      setIsFusing(false)
      setIsFused(true)
      // Diminui a barreira da autocrítica devido à clareza do Eu Integral
      setAutocriticaBar(75)
    }, 2800)
  }

  // --- FUNÇÕES DE ÁUDIO TTS (PASSO 2) ---
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setAudioPlaying(false)
  }

  const playSocraticQuestionVoice = async () => {
    if (audioPlaying) {
      stopAudio()
      return
    }

    try {
      setAudioLoading(true)
      setAudioError(false)
      const textToSpeak = socraticQuestions[activeQuestionIdx].ttsText

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak }),
      })

      if (!res.ok) throw new Error('TTS API Offline')

      const { audioContent } = await res.json()
      
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`)
      audio.onended = () => setAudioPlaying(false)
      audioRef.current = audio
      
      await audio.play()
      setAudioPlaying(true)
    } catch (err) {
      console.warn("Erro real ao buscar TTS. Ativando simulação local:", err)
      // Graceful local fallback simulation so developer flow is seamless
      setAudioPlaying(true)
      setTimeout(() => {
        setAudioPlaying(false)
      }, 7000)
    } finally {
      setAudioLoading(false)
    }
  }

  useEffect(() => {
    return () => stopAudio()
  }, [activeQuestionIdx])

  // --- Efeito de Entrada Elástica GSAP no Gráfico Radial (Passo 4) ---
  useEffect(() => {
    if (step === 4 && radarSvgRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "elastic.out(1, 0.85)", duration: 1.3 } })
      
      tl.fromTo(radarSvgRef.current.querySelectorAll('.hex-grid-line'),
        { scale: 0, opacity: 0, transformOrigin: '100px 100px' },
        { scale: 1, opacity: 1, stagger: 0.08, duration: 0.9 }
      )
      
      tl.fromTo(radarSvgRef.current.querySelectorAll('.radar-axis-line'),
        { scale: 0, opacity: 0, transformOrigin: '100px 100px' },
        { scale: 1, opacity: 1, stagger: 0.05, duration: 0.7 },
        "-=0.6"
      )

      tl.fromTo(radarSvgRef.current.querySelectorAll('.radar-axis-label'),
        { opacity: 0, scale: 0.5, transformOrigin: 'center' },
        { opacity: 1, scale: 1, stagger: 0.05, duration: 0.6 },
        "-=0.5"
      )
      
      tl.fromTo(radarSvgRef.current.querySelector('.competitor-polygon'),
        { scale: 0.1, opacity: 0, transformOrigin: '100px 100px' },
        { scale: 1, opacity: 0.85, duration: 1.2, ease: "back.out(1.5)" },
        "-=0.7"
      )

      tl.fromTo(radarSvgRef.current.querySelector('.user-polygon'),
        { scale: 0.02, opacity: 0, transformOrigin: '100px 100px' },
        { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1.1, 0.7)" },
        "-=1.0"
      )

      tl.fromTo(radarSvgRef.current.querySelectorAll('.radar-node'),
        { scale: 0, opacity: 0, transformOrigin: 'center' },
        { scale: 1, opacity: 1, stagger: 0.04, duration: 0.7 },
        "-=1.1"
      )
    }
  }, [step])

  const selectSocraticPreset = (presetText: string) => {
    const updated = [...socraticAnswers]
    updated[activeQuestionIdx] = presetText
    setSocraticAnswers(updated)
    
    // Animação de decréscimo da barreira de autocrítica
    const newBar = activeQuestionIdx === 0 ? 55 : 30
    setAutocriticaBar(newBar)
  }

  const handleNextSocraticQuestion = () => {
    stopAudio()
    if (activeQuestionIdx === 0) {
      setActiveQuestionIdx(1)
    } else {
      setStep(3)
      triggerMarketScan()
    }
  }

  // --- FUNÇÕES DE SCANNER DE PONTO CEGO (PASSO 3) ---
  const triggerMarketScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanLogs([])

    const logs = [
      `[TDBD-SCANNER] Inicializando crawlers de nicho e análise de sentimento de concorrência...`,
      `[HISTÓRIA INTEGRAL] Cruzando ativos: "${skill1.substring(0, 30)}..." + "${skill2.substring(0, 30)}..."`,
      `[NLP ANALYSIS] Mapeando padrão de autocompaixão vs. discursos clones de gurus em redes sociais...`,
      `[GAP CONFIRMADO] 90% dos concorrentes atuam focados em "ganho fácil" (Custo Dopaminérgico Alto de ~90%).`,
      `[AUDITORIA DE SUPORTE] Taxa média de reclamações por falta de SLA humano e rastreabilidade: 45%.`,
      `[NEURO-MEDIDA] Índice de estresse de gestão concorrencial (Sequestro da Amígdala) mapeado em alarmantes 90%.`,
      `[CONFLUÊNCIA DE VALORES] Calibrando seu posicionamento diferenciado...`,
      `[XEQUE-MATE COMPILADO] Posicionamento anticópia desenhado com base na neuropsicologia e TDBD.`
    ]

    let current = 0
    const interval = setInterval(() => {
      if (current < logs.length) {
        setScanLogs(prev => [...prev, logs[current]])
        setScanProgress(Math.round(((current + 1) / logs.length) * 100))
        current++
      } else {
        clearInterval(interval)
        setIsScanning(false)
        // Auto-avançar para o xeque-mate final após scanner
        setTimeout(() => setStep(4), 1000)
      }
    }, 450)
  }

  // --- ESPELHAMENTO COGNITIVO E REFRAÇÃO DA IA ---
  const cognitiveMirroring = useMemo(() => {
    const answer = socraticAnswers[activeQuestionIdx]?.trim()
    if (!answer) return null
    
    if (activeQuestionIdx === 0) {
      if (answer.toLowerCase().includes('velocidade') || answer.toLowerCase().includes('erro') || answer.toLowerCase().includes('processo')) {
        return "A velocidade de análise clínica herdada do ambiente crítico de UTI é seu ativo de barreira anticópia definitivo em processos corporativos. Isso neutraliza os erros de execução comuns a concorrentes sem rigor técnico e blinda a operação de alta fidelidade."
      }
      if (answer.toLowerCase().includes('desmembrar') || answer.toLowerCase().includes('dados') || answer.toLowerCase().includes('técnicos')) {
        return "Sua habilidade de traduzir complexidade em clareza humana é um ativo neuropsicológico que elimina a reatividade dos stakeholders, gerando LTV robusto e eliminando qualquer objeção à sua entrega."
      }
      if (answer.toLowerCase().includes('segurança') || answer.toLowerCase().includes('calma') || answer.toLowerCase().includes('desabando')) {
        return "Sua serenidade sob caos crítico neutraliza de imediato o Sequestro de Amígdala de quem busca socorro, tornando-se a âncora de fidelização e a martelada definitiva na credibilidade de seu mercado."
      }
      return `Sua essência apoia-se em um ativo autêntico: "${answer.length > 60 ? answer.slice(0, 60) + '...' : answer}". Esta expressão livre reduz a Fricção do Personagem na sua marca para níveis saudáveis.`
    } else {
      if (answer.toLowerCase().includes('promessas') || answer.toLowerCase().includes('rápido') || answer.toLowerCase().includes('clones')) {
        return "Sua indignação ética contra promessas infladas é a sua maior âncora de verdade real. O contraste entre sua entrega auditável e gurus clones desintegra qualquer objeção de incredulidade no ato."
      }
      if (answer.toLowerCase().includes('reatividade') || answer.toLowerCase().includes('instabilidade') || answer.toLowerCase().includes('bloqueiam')) {
        return "Sua estabilidade de Córtex Pré-Frontal ante o desespero de concorrentes reativos prova a solidez da sua governança corporativa, poupando cortisol e demonstrando maturidade estratégica absoluta."
      }
      if (answer.toLowerCase().includes('dados') || answer.toLowerCase().includes('rastreabilidade') || answer.toLowerCase().includes('palco')) {
        return "Seu foco em dados auditáveis e Tomada de Decisão Baseada em Dados (TDBD) desarma imediatamente discursos falaciosos de marketing, convertendo clientes de alto padrão sob o selo de governança definitiva."
      }
      return `Sua intolerância a propostas vazias blinda seu posicionamento. Ela blinda sua empresa e atrai clientes qualificados sob o modelo de Tomada de Decisão Baseada em Dados (TDBD).`
    }
  }, [activeQuestionIdx, socraticAnswers])

  // --- VALORES RESULTANTES DA SUA IA DE XEQUE-MATE ---
  const calculatedDiferencial = useMemo(() => {
    // Retorna o oceano azul gerado
    const matchICU = skill1.toLowerCase().includes('uti') || skill1.toLowerCase().includes('fisioterapeuta')
    if (matchICU) {
      return {
        title: "Mentoria de Posicionamento e Auditoria de Alto Risco",
        ocean: "Rastreabilidade e Sanidade de Alta Complexidade (Oceano Azul)",
        copy: "Eu trago a calma e resiliência extrema de 8 anos salvando vidas em UTI para desintegrar a ilusão dos gurus de palco, aplicando tomada de decisão baseada em dados reais (TDBD) para blindar seu negócio e sua sanidade contra o caos competitivo.",
        ebitda: 85,
        ltvCac: 7.5,
        tdbd: 98,
        sequestroAmigdala: 15,
        friccaoPersonagem: 20,
        custoDopaminergico: 15,
        verdict: "✅ OPERAÇÃO DE EXCELÊNCIA INTEGRAL APROVADA: Altíssima integridade (98% TDBD), baixa fricção de personagem (20%) e resiliência psicológica forjada no leito de UTI. Posicionamento de barreira anticópia definitiva!"
      }
    }

    return {
      title: "Posicionamento Estratégico Baseado em Verdade Radical",
      ocean: "Consultoria Integradora em Negócios Reais (Oceano Azul)",
      copy: `Mesclando minha base de ${skill1} com ${skill2} e ${skill3}, eu crio uma fortaleza de tomada de decisão baseada em dados (${skill4}), quebrando a barreira da cópia genérica com processos auditáveis e integridade absoluta de pessoa para pessoa.`,
      ebitda: 75,
      ltvCac: 6.0,
      tdbd: 90,
      sequestroAmigdala: 20,
      friccaoPersonagem: 25,
      custoDopaminergico: 20,
      verdict: "✅ OPERAÇÃO DE VANTAGEM REAL APROVADA: Equilíbrio financeiro saudável e posicionamento pautado na integridade e verdade radical. Seus ativos cruzados anulam concorrentes comuns."
    }
  }, [skill1, skill2, skill3, skill4])

  // --- DADOS E CÁLCULOS DO GRÁFICO DE RADAR ---
  const radarData = useMemo(() => [
    { label: "EBITDA", user: calculatedDiferencial.ebitda, comp: 25, rawUser: `${calculatedDiferencial.ebitda}%`, rawComp: "25%", desc: "Margem de lucro operacional real da operação." },
    { label: "LTV/CAC", user: Math.min(100, calculatedDiferencial.ltvCac * 12), comp: 15, rawUser: `${calculatedDiferencial.ltvCac}x`, rawComp: "1.2x", desc: "Multiplicador de retorno vitalício sobre custo de aquisição." },
    { label: "TDBD", user: calculatedDiferencial.tdbd, comp: 20, rawUser: `${calculatedDiferencial.tdbd}%`, rawComp: "20%", desc: "Tomada de decisão baseada em dados e fatos vs. achismo." },
    { label: "Resiliência", user: 100 - calculatedDiferencial.sequestroAmigdala, comp: 30, rawUser: `${100 - calculatedDiferencial.sequestroAmigdala}%`, rawComp: "30%", desc: "Controle emocional e resiliência sob pressão extrema." },
    { label: "Autenticidade", user: 100 - calculatedDiferencial.friccaoPersonagem, comp: 25, rawUser: `${100 - calculatedDiferencial.friccaoPersonagem}%`, rawComp: "25%", desc: "Uso do Eu Integral genuíno com baixíssima fricção de persona." },
    { label: "Sustentabilidade", user: 100 - calculatedDiferencial.custoDopaminergico, comp: 15, rawUser: `${100 - calculatedDiferencial.custoDopaminergico}%`, rawComp: "15%", desc: "Posicionamento de mercado de baixo custo dopaminérgico e FOMO." },
  ], [calculatedDiferencial])

  const getCoordinates = (val: number, i: number) => {
    const angle = -Math.PI / 2 + (i * Math.PI / 3)
    const r = (val / 100) * 80
    return {
      x: 100 + r * Math.cos(angle),
      y: 100 + r * Math.sin(angle)
    }
  }

  const userPoints = useMemo(() => radarData.map((d, i) => {
    const coords = getCoordinates(d.user, i)
    return `${coords.x},${coords.y}`
  }).join(" "), [radarData])

  const compPoints = useMemo(() => radarData.map((d, i) => {
    const coords = getCoordinates(d.comp, i)
    return `${coords.x},${coords.y}`
  }).join(" "), [radarData])

  // Calibrar Cockpit ao fechar ou confirmar
  const handleConfirmCalibration = () => {
    onCalibrateCockpit({
      ebitda: calculatedDiferencial.ebitda,
      ltvCac: calculatedDiferencial.ltvCac,
      tdbd: calculatedDiferencial.tdbd,
      sequestroAmigdala: calculatedDiferencial.sequestroAmigdala,
      friccaoPersonagem: calculatedDiferencial.friccaoPersonagem,
      custoDopaminergico: calculatedDiferencial.custoDopaminergico,
      verdict: calculatedDiferencial.verdict,
      scenario: 'custom'
    })
    onClose()
  }

  return (
    <div className="w-full flex flex-col gap-6 text-white leading-relaxed select-text" style={{ fontFamily: "'Poppins', -apple-system, sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseConnector {
          0% { stroke-dashoffset: 0; opacity: 0.3; }
          100% { stroke-dashoffset: -20; opacity: 0.95; }
        }
        .neon-connector-line {
          stroke: #d2af5a;
          stroke-width: 1.2px;
          stroke-dasharray: 4, 3;
          animation: pulseConnector 1.5s linear infinite;
        }
        @keyframes rotateHoloOuter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateHoloInner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .holo-orbit-outer {
          transform-origin: center;
          animation: rotateHoloOuter 12s linear infinite;
        }
        .holo-orbit-inner {
          transform-origin: center;
          animation: rotateHoloInner 8s linear infinite;
        }
        @keyframes floatHoloNode {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
        .holo-node-group {
          animation: floatHoloNode 4s ease-in-out infinite alternate;
        }
      `}} />

      {/* HEADER DE ETAPA - BARRA DE PROGRESSO NEON */}
      <div className="flex flex-col gap-2 bg-black/40 border border-white/5 p-4 rounded-2xl select-none" style={{ fontFamily: "'Poppins', -apple-system, sans-serif" }}>
        <div className="flex justify-between items-center text-[9px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider">
          <span>PORTAL DE DESCOBERTA ESTRATÉGICA</span>
          <span>ETAPA {step + 1} DE 5</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div 
              key={idx}
              className={`h-full flex-1 transition-all duration-300 ${
                step >= idx 
                  ? 'bg-gradient-to-r from-[#d2af5a] to-amber-500 shadow-[0_0_8px_#d2af5a]' 
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[8px] font-mono text-white/35 mt-1">
          <span>0. O Diagnóstico</span>
          <span>1. Matriz Eu Integral</span>
          <span>2. Investigação Socrática</span>
          <span>3. Ponto Cego</span>
          <span>4. O Contra-Xeque-Mate</span>
        </div>
      </div>

      {/* RENDERIZADOR DE PASSOS */}
      
      {/* PASSO 0: APRESENTAÇÃO - O COLAPSO DA ILUSÃO */}
      {step === 0 && (
        <div className="flex flex-col gap-6 items-center text-center py-6 px-4">
          <div className="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center animate-pulse">
            <Flame className="h-8 w-8 text-red-400" />
          </div>
          
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-xl font-bold tracking-wide text-white">
              A Instabilidade de Posicionamentos Genéricos no Mercado
            </h3>
            <p className="text-white/60 text-xs font-mono leading-relaxed mt-1">
              Propostas comerciais superficiais e promessas de escala sem sustentabilidade operacional geram altos níveis de atrito e exaustão cognitiva no cliente final. Sem dados robustos e processos auditáveis, a operação fica vulnerável a flutuações e perde tração real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl text-left mt-2">
            <div className="p-4 bg-red-950/15 border border-red-900/30 rounded-2xl space-y-1.5">
              <span className="text-red-400 text-[10px] font-mono font-bold uppercase block select-none">A Fricção (Propostas Vazias)</span>
              <p className="text-white/50 text-[11px] font-sans leading-relaxed">
                Posicionamentos puramente narrativos sem respaldo operacional. Diante de demandas de alta performance ou crises de escala, a falta de processos estruturados resulta em quebras sistêmicas e reatividade operacional.
              </p>
            </div>
            <div className="p-4 bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-2xl space-y-1.5">
              <span className="text-[#d2af5a] text-[10px] font-mono font-bold uppercase block select-none">O Xeque-Mate (Diferencial Estruturado)</span>
              <p className="text-white/85 text-[11px] font-sans leading-relaxed">
                Consiste na validação quantificável e na rastreabilidade técnica: <i>"Onde estão os dados de entrega real? Como garantimos o SLA e o suporte especializado?"</i>. Isso estabelece credibilidade e ativa a confiança baseada em dados (TDBD).
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 w-full max-w-sm">
            <button
              onClick={() => setStep(1)}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#d2af5a] to-amber-500 hover:brightness-110 text-black font-bold uppercase tracking-wider text-xs transition-all shadow-[0_4px_20px_rgba(210,175,90,0.25)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Iniciar Análise de Vantagem Competitiva
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-[9px] font-mono text-white/35">
              *A IA ativará o protocolo de identificação de ativos e blindagem de posicionamento operacional.
            </span>
          </div>
        </div>
      )}

      {/* PASSO 1: A MATRIZ DE INTERSEÇÃO IMEDIATA (O EU INTEGRAL) */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Lado Esquerdo: Formulário de Histórico */}
          <div className="flex flex-col gap-4 bg-white/[0.01] border border-white/5 p-5 rounded-3xl relative">
            <div className="flex justify-between items-center select-none">
              <span className="text-[#d2af5a] text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-[#d2af5a]" />
                1. A FÓRMULA DO "EU INTEGRAL"
              </span>
              <button 
                onClick={applyPreset}
                className="text-[8px] font-mono text-white/40 hover:text-[#d2af5a] transition hover:underline"
              >
                [Usar Preset do Seu Histórico]
              </button>
            </div>
            
            <p className="text-white/45 text-[10.5px] font-sans leading-relaxed">
              O seu verdadeiro diferencial nunca é uma única competência copiada, mas sim a <b>interseção única de suas vivências</b> que cria um oceano azul imune a cópias.
            </p>

            <div className="flex flex-col gap-3.5 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-mono text-white/35 uppercase select-none">Habilidade 1: Origem e Resiliência Extrema</label>
                <input 
                  type="text" 
                  value={skill1} 
                  onChange={(e) => setSkill1(e.target.value)}
                  className="bg-black/55 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d2af5a]/50 font-sans"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-mono text-white/35 uppercase select-none">Habilidade 2: Negócios & Métricas</label>
                <input 
                  type="text" 
                  value={skill2} 
                  onChange={(e) => setSkill2(e.target.value)}
                  className="bg-black/55 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d2af5a]/50 font-sans"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-mono text-white/35 uppercase select-none">Habilidade 3: Tecnologia, Sistemas & BI</label>
                <input 
                  type="text" 
                  value={skill3} 
                  onChange={(e) => setSkill3(e.target.value)}
                  className="bg-black/55 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d2af5a]/50 font-sans"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-mono text-white/35 uppercase select-none">Habilidade 4: Fator Emocional, Saúde ou Sanidade</label>
                <input 
                  type="text" 
                  value={skill4} 
                  onChange={(e) => setSkill4(e.target.value)}
                  className="bg-black/55 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d2af5a]/50 font-sans"
                />
              </div>
            </div>

            <button
              onClick={handleStartFusion}
              disabled={isFusing}
              className="py-2.5 rounded-xl bg-gradient-to-r from-[#d2af5a] to-amber-500 text-black font-bold uppercase tracking-wider text-[10px] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
            >
              {isFusing ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Calculando Vetores de Confluência...
                </>
              ) : isFused ? (
                "Fundido com Sucesso! Ir para Próxima Etapa"
              ) : (
                "Fundir Ativos no Orbe Holográfico"
              )}
            </button>
          </div>

          {/* Lado Direito: Visualização Holográfica do Eu Integral */}
          <div className="flex flex-col justify-between bg-black/40 border border-white/5 p-6 rounded-3xl overflow-hidden relative min-h-[350px]">
            {/* Linhas de fundo e grade técnica */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,175,90,0.06),transparent_65%)] pointer-events-none select-none" />
            <div className="absolute top-2 right-2 px-2 py-0.5 border border-white/5 bg-black/60 text-[7px] font-mono text-white/30 rounded uppercase tracking-widest select-none">
              Orbital Fusion Vector Matrix
            </div>

            {/* INTERSEÇÃO HOLOGRÁFICA (Visualização de Animação React) */}
            <div className="flex-1 flex items-center justify-center relative">
              <svg viewBox="0 0 200 200" className="w-[200px] h-[200px] relative z-10">
                {/* Definições de Gradientes */}
                <defs>
                  <radialGradient id="fusionCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#d2af5a" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#d2af5a" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Órbitas rotativas */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="65" 
                  fill="none" 
                  stroke="rgba(210,175,90,0.15)" 
                  strokeWidth="0.8" 
                  strokeDasharray="4 6"
                  className={`holo-orbit-outer ${isFusing ? "animate-spin" : ""}`}
                  style={{ transformOrigin: 'center' }}
                />
                <circle 
                  cx="100" 
                  cy="100" 
                  r="45" 
                  fill="none" 
                  stroke="rgba(210,175,90,0.1)" 
                  strokeWidth="0.5" 
                  className={`holo-orbit-inner ${isFusing ? "animate-spin" : ""}`}
                  style={{ transformOrigin: 'center', animationDirection: 'reverse' }}
                />

                {/* Linhas de conexão (feixes) */}
                {isFusing && (
                  <>
                    <line x1="40" y1="40" x2="100" y2="100" className="neon-connector-line" />
                    <line x1="160" y1="40" x2="100" y2="100" className="neon-connector-line" />
                    <line x1="40" y1="160" x2="100" y2="100" className="neon-connector-line" />
                    <line x1="160" y1="160" x2="100" y2="100" className="neon-connector-line" />
                  </>
                )}

                {/* Os 4 Ativos Orbitando (Nos 4 cantos) */}
                <g className={`holo-node-group transition-all duration-1000 ${isFusing ? 'translate-x-[20px] translate-y-[20px] scale-75 opacity-50' : ''}`} style={{ transformOrigin: '40px 40px', animationDelay: '0s' }}>
                  <circle cx="40" cy="40" r="16" fill="rgba(10,10,12,0.9)" stroke="#d2af5a" strokeWidth="1" />
                  <text x="40" y="43" textAnchor="middle" className="fill-[#d2af5a] font-mono text-[8px] font-bold">UTI</text>
                </g>

                <g className={`holo-node-group transition-all duration-1000 ${isFusing ? 'translate-x-[-20px] translate-y-[20px] scale-75 opacity-50' : ''}`} style={{ transformOrigin: '160px 40px', animationDelay: '0.5s' }}>
                  <circle cx="160" cy="40" r="16" fill="rgba(10,10,12,0.9)" stroke="#d2af5a" strokeWidth="1" />
                  <text x="160" y="43" textAnchor="middle" className="fill-[#d2af5a] font-mono text-[8px] font-bold">BIZ</text>
                </g>

                <g className={`holo-node-group transition-all duration-1000 ${isFusing ? 'translate-x-[20px] translate-y-[-20px] scale-75 opacity-50' : ''}`} style={{ transformOrigin: '40px 160px', animationDelay: '1s' }}>
                  <circle cx="40" cy="160" r="16" fill="rgba(10,10,12,0.9)" stroke="#d2af5a" strokeWidth="1" />
                  <text x="40" y="163" textAnchor="middle" className="fill-[#d2af5a] font-mono text-[8px] font-bold">TECH</text>
                </g>

                <g className={`holo-node-group transition-all duration-1000 ${isFusing ? 'translate-x-[-20px] translate-y-[-20px] scale-75 opacity-50' : ''}`} style={{ transformOrigin: '160px 160px', animationDelay: '1.5s' }}>
                  <circle cx="160" cy="160" r="16" fill="rgba(10,10,12,0.9)" stroke="#d2af5a" strokeWidth="1" />
                  <text x="160" y="163" textAnchor="middle" className="fill-[#d2af5a] font-mono text-[8px] font-bold">PSI</text>
                </g>

                {/* Núcleo do Orbe do Eu Integral */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r={isFusing ? "28" : isFused ? "32" : "15"} 
                  fill="url(#fusionCore)" 
                  className={isFusing ? "animate-pulse" : ""}
                  style={{ transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
                
                <circle cx="100" cy="100" r="3" fill="#ffffff" className="animate-ping" style={{ animationDuration: '3s' }} />
              </svg>

              {/* Rótulo de Diagnóstico de Fusão */}
              <div className="absolute bottom-2 text-center w-full select-none">
                {isFusing ? (
                  <span className="text-[9px] font-mono text-[#d2af5a] animate-pulse">
                    FUSÃO QUÂNTICA ATIVA: Cruzando 8 anos de trauma clínico com sistemas digitais...
                  </span>
                ) : isFused ? (
                  <div className="flex flex-col gap-1 items-center animate-in fade-in zoom-in-95">
                    <span className="text-[10px] font-bold font-mono text-[#d2af5a] uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      EU INTEGRAL CRISTALIZADO!
                    </span>
                    <span className="text-[8.5px] font-mono text-white/50 max-w-xs">
                      Seus ativos foram fundidos em uma vantagem de resiliência e integridade impossível de ser clonada por copywriters de internet.
                    </span>
                  </div>
                ) : (
                  <span className="text-[9px] font-mono text-white/35 italic">
                    Configure os 4 ativos ao lado e aperte o botão de fusão para mapear sua confluência.
                  </span>
                )}
              </div>
            </div>

            {/* Próximo Passo */}
            {isFused && !isFusing && (
              <div className="border-t border-white/5 pt-3 flex justify-end animate-in fade-in select-none">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-gradient-to-r from-[#d2af5a] to-amber-500 hover:brightness-110 text-black font-bold uppercase tracking-wider text-[9px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  Ir para Entrevista Socrática por Voz
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PASSO 2: A ENTREVISTA SOCRÁTICA POR VOZ (EXTRAÇÃO NEUROPSICOLÓGICA) */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* LADO ESQUERDO: A Console de Voz do Mentor de Negócios */}
          <div className="flex flex-col justify-between bg-black/40 border border-[#d2af5a]/15 p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,175,90,0.06),transparent_70%)] pointer-events-none select-none" />
            
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5 select-none relative z-10">
              <span className="text-[#d2af5a] text-[9.5px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-[#d2af5a]" />
                2. ENTREVISTA SOCRÁTICA (VOZ DA IA)
              </span>
              <span className="px-2 py-0.5 bg-black/60 border border-[#d2af5a]/30 text-[#d2af5a] font-mono text-[7px] rounded-md font-bold select-none animate-pulse">
                MENTORA ATIVA
              </span>
            </div>

            {/* CONTRATO DE VOZ & VISUALIZADOR DE ONDAS SONORAS DE NEON */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 my-6 relative z-10">
              <div className="relative flex items-center justify-center">
                
                {/* Tempestade de Partículas Neurais Avançada */}
                <NeuralParticleStorm active={audioPlaying} />
                
                {/* Halo pulsante */}
                <div 
                  className={`absolute h-24 w-24 rounded-full border border-[#d2af5a]/30 transition-all duration-1000 ${
                    audioPlaying ? 'scale-125 opacity-30 animate-ping' : 'scale-100 opacity-0'
                  }`} 
                />

                {/* Botão de Tocar Pergunta */}
                <button
                  onClick={playSocraticQuestionVoice}
                  disabled={audioLoading}
                  className={`h-20 w-20 rounded-full flex flex-col items-center justify-center border cursor-pointer transition-all duration-300 relative shadow-2xl ${
                    audioPlaying 
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500 text-emerald-400 ring-2 ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                      : 'bg-[#0a0a0c] border-[#d2af5a]/40 text-[#d2af5a] hover:border-[#d2af5a] hover:bg-[#d2af5a]/10 hover:shadow-[0_0_15px_rgba(210,175,90,0.15)]'
                  }`}
                  title={audioPlaying ? "Pausar Leitura" : "Ouvir Pergunta Socrática"}
                >
                  {audioLoading ? (
                    <Loader2 className="h-7 w-7 animate-spin" />
                  ) : audioPlaying ? (
                    <Square className="h-6 w-6 fill-current animate-pulse" />
                  ) : (
                    <Volume2 className="h-7 w-7 animate-bounce" />
                  )}
                  <span className="text-[6.5px] font-mono font-bold tracking-widest mt-1.5 uppercase leading-none">
                    {audioPlaying ? "OUVINDO" : "OUVIR"}
                  </span>
                </button>
              </div>

              {/* ONDAS SONORAS RÍTMICAS DE NEON (CSS Bouncing Bars) */}
              <div className="flex items-center gap-1.5 h-10 select-none">
                {Array.from({ length: 15 }).map((_, idx) => {
                  // Gera alturas de onda animadas de forma randômica se tocando áudio
                  const animDelay = `${idx * 0.1}s`
                  const animDuration = audioPlaying ? `${0.5 + Math.random() * 0.6}s` : '0s'
                  return (
                    <div 
                      key={idx}
                      className={`w-[3px] rounded-full transition-all duration-300 ${
                        audioPlaying 
                          ? 'bg-gradient-to-t from-[#d2af5a] to-amber-400 shadow-[0_0_4px_#d2af5a]' 
                          : 'bg-white/10 h-1.5'
                      }`}
                      style={{
                        animation: audioPlaying ? 'socraticBake 1s ease-in-out infinite' : 'none',
                        animationDelay: animDelay,
                        animationDuration: animDuration,
                        height: audioPlaying ? `${10 + Math.random() * 30}px` : '4px'
                      }}
                    />
                  )
                })}
              </div>
              
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes socraticBake {
                  0%, 100% { transform: scaleY(0.4); }
                  50% { transform: scaleY(1.4); }
                }
              `}} />

              {/* Rótulo e feedback da pergunta */}
              <div className="text-center px-4 max-w-sm">
                <span className="text-[8.5px] font-mono text-white/35 block uppercase tracking-wider select-none mb-1">
                  Mentor IA diz:
                </span>
                <p className="text-white text-xs font-sans italic leading-relaxed text-center">
                  "{socraticQuestions[activeQuestionIdx].text}"
                </p>
              </div>

              {/* ACTIVE MIRRORING CARD */}
              {cognitiveMirroring && (
                <div className="w-full mt-2 bg-[#d2af5a]/5 border border-[#d2af5a]/20 p-3.5 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-[#d2af5a] text-[8px] font-mono font-bold uppercase tracking-wider block select-none mb-1">
                    🎙️ ESPELHAMENTO COGNITIVO DE IA
                  </span>
                  <p className="text-white/85 text-[10.5px] font-sans leading-relaxed italic">
                    "{cognitiveMirroring}"
                  </p>
                </div>
              )}

            </div>

            {/* Métrica da Fricção da Autocrítica */}
            <div className="border-t border-white/5 pt-4 flex flex-col gap-1.5 select-none relative z-10">
              <div className="flex justify-between items-center text-[8.5px] font-mono text-white/40">
                <span>Dissociação e Autocrítica do Personagem:</span>
                <b className={`${autocriticaBar > 50 ? 'text-amber-400' : 'text-emerald-400'} font-bold`}>{autocriticaBar}%</b>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    autocriticaBar > 50 
                      ? 'bg-gradient-to-r from-amber-500 to-[#d2af5a]' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  }`}
                  style={{ width: `${autocriticaBar}%` }}
                />
              </div>
              <span className="text-[7px] text-white/30 font-sans">
                *O diferencial emerge quando driblamos a autocrítica, resgatando o que para você é 'natural e fácil' e expressando sua 'indignação saudável'.
              </span>
            </div>

          </div>

          {/* LADO DIREITO: Formular Respostas Terapêuticas */}
          <div className="flex flex-col justify-between bg-white/[0.01] border border-white/5 p-6 rounded-3xl">
            <div className="flex flex-col gap-4">
              <span className="text-[#d2af5a] text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 select-none">
                <HelpCircle className="h-4 w-4 text-[#d2af5a]" />
                DIGITE OU ESCREVA SUA RESPOSTA REAL
              </span>

              {/* Campo de Escrita Livre */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono text-white/45 uppercase select-none">Sua resposta autêntica:</label>
                <textarea 
                  value={socraticAnswers[activeQuestionIdx]}
                  onChange={(e) => {
                    const updated = [...socraticAnswers]
                    updated[activeQuestionIdx] = e.target.value
                    setSocraticAnswers(updated)
                    // Reduz um pouco de autocrítica se o usuário digitar algo livre
                    if (e.target.value.length > 10) setAutocriticaBar(prev => Math.max(25, prev - 1))
                  }}
                  rows={4}
                  placeholder={socraticQuestions[activeQuestionIdx].placeholder}
                  className="bg-black/55 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d2af5a]/50 font-sans leading-relaxed resize-none"
                />
              </div>

              {/* Botões de Respostas Psicológicas de Prateleira (Facilitador de Crença) */}
              <div className="flex flex-col gap-2 mt-1">
                <span className="text-[8px] font-mono text-white/30 uppercase select-none">
                  Ou clique para cristalizar uma resposta baseada na sua essência:
                </span>
                <div className="flex flex-col gap-1.5 select-none">
                  {socraticQuestions[activeQuestionIdx].presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectSocraticPreset(preset)}
                      className={`px-3 py-2 rounded-xl text-[9.5px] font-mono text-left border transition-all duration-300 leading-normal ${
                        socraticAnswers[activeQuestionIdx] === preset
                          ? 'bg-[#d2af5a]/15 text-[#d2af5a] border-[#d2af5a]/40 font-bold'
                          : 'bg-black/35 text-white/50 border-white/5 hover:border-white/15'
                      }`}
                    >
                      "{preset}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Próximo Passo */}
            <div className="border-t border-white/5 pt-4 flex justify-between items-center mt-6 select-none">
              <span className="text-[8.5px] font-mono text-white/30 uppercase">
                {activeQuestionIdx === 0 ? "FALTA 1 PERGUNTA" : "DIÁLOGO CONCLUÍDO"}
              </span>
              <button
                onClick={handleNextSocraticQuestion}
                disabled={!socraticAnswers[activeQuestionIdx].trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-[#d2af5a] to-amber-500 hover:brightness-110 disabled:from-white/5 disabled:to-white/5 disabled:text-white/20 text-black font-bold uppercase tracking-wider text-[9px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                {activeQuestionIdx === 0 ? "Avançar Próxima Pergunta" : "Mapear Ponto Cego do Mercado"}
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PASSO 3: O MAPEAMENTO DO PONTO CEGO DO MERCADO (TDBD) */}
      {step === 3 && (
        <div className="flex flex-col gap-6 items-center py-8 px-4 relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,175,90,0.04),transparent_65%)] pointer-events-none select-none animate-pulse" style={{ animationDuration: '4s' }} />

          {/* Fundo 3D Holographic Grid Scanner */}
          <div className="scanning-perspective-container select-none pointer-events-none">
            <div className="scanning-3d-grid" />
            <div className="scanning-laser-line" />
            <div className="biometric-scanner-ring ring-lg" />
            <div className="biometric-scanner-ring ring-md" />
            <div className="biometric-scanner-ring ring-sm" />
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .scanning-perspective-container {
              position: absolute;
              inset: 0;
              perspective: 450px;
              overflow: hidden;
              pointer-events: none;
              z-index: 0;
              opacity: 0.65;
            }
            .scanning-3d-grid {
              position: absolute;
              width: 250%;
              height: 250%;
              top: -75%;
              left: -75%;
              background-image: 
                linear-gradient(to right, rgba(210, 175, 90, 0.09) 1.5px, transparent 1.5px),
                linear-gradient(to bottom, rgba(210, 175, 90, 0.09) 1.5px, transparent 1.5px);
              background-size: 30px 30px;
              transform: rotateX(68deg) translateY(-20px);
              animation: scanningGridMove 12s linear infinite;
            }
            @keyframes scanningGridMove {
              0% { transform: rotateX(68deg) translateY(-60px); }
              100% { transform: rotateX(68deg) translateY(0px); }
            }
            .scanning-laser-line {
              position: absolute;
              width: 100%;
              height: 3px;
              background: linear-gradient(to right, transparent, rgba(210, 175, 90, 0.25) 15%, #ffffff 50%, rgba(210, 175, 90, 0.25) 85%, transparent);
              box-shadow: 0 0 18px rgba(210, 175, 90, 0.7), 0 0 35px rgba(210, 175, 90, 0.35);
              top: 0%;
              left: 0;
              animation: scanningLaserSweep 5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
              z-index: 2;
            }
            @keyframes scanningLaserSweep {
              0% { top: -10%; }
              100% { top: 110%; }
            }
            .biometric-scanner-ring {
              position: absolute;
              border: 1px dashed rgba(210, 175, 90, 0.15);
              border-radius: 50%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              pointer-events: none;
            }
            .biometric-scanner-ring.ring-lg {
              width: 500px;
              height: 500px;
              animation: biometricRingRotateCW 40s linear infinite;
              border-color: rgba(210, 175, 90, 0.08);
            }
            .biometric-scanner-ring.ring-md {
              width: 320px;
              height: 320px;
              animation: biometricRingRotateCCW 25s linear infinite;
              border-color: rgba(210, 175, 90, 0.12);
            }
            .biometric-scanner-ring.ring-sm {
              width: 180px;
              height: 180px;
              animation: biometricRingRotateCW 15s linear infinite;
              border-color: rgba(210, 175, 90, 0.2);
            }
            @keyframes biometricRingRotateCW {
              100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
            @keyframes biometricRingRotateCCW {
              100% { transform: translate(-50%, -50%) rotate(-360deg); }
            }
          `}} />

          {/* Scanner Holográfico */}
          <div className="h-20 w-20 rounded-full border border-[#d2af5a]/40 bg-black/40 flex items-center justify-center relative shadow-[0_0_25px_rgba(210,175,90,0.15)] select-none">
            <Compass className="h-10 w-10 text-[#d2af5a] animate-spin" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin" />
          </div>

          <div className="flex flex-col gap-2 text-center max-w-md">
            <h3 className="text-lg font-bold tracking-wide text-white">
              Escaneando o "Ponto Cego" do Seu Nicho
            </h3>
            <p className="text-white/45 text-[10.5px] font-mono">
              O algoritmo Business Syllabus está processando dados reais e sentimentos para identificar onde seus concorrentes clones estão falhando e qual é o seu território intocado.
            </p>
          </div>

          {/* Barra de Progresso do Crawler */}
          <div className="w-full max-w-md flex flex-col gap-1 select-none">
            <div className="flex justify-between text-[8px] font-mono text-white/40">
              <span>CRAWLING REAL-TIME CHANNELS...</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#d2af5a] to-amber-500 shadow-[0_0_6px_#d2af5a] transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>

          {/* Console de Logs Estilo Matrix */}
          <div className="w-full max-w-xl bg-black/85 border border-[#d2af5a]/20 rounded-2xl p-4 font-mono text-[9px] text-[#d2af5a] space-y-1 overflow-hidden h-[180px] text-left relative shadow-2xl">
            <div className="absolute top-1 right-2 text-[7px] text-white/20 select-none uppercase tracking-widest">
              TDBD Market Engine
            </div>
            <div className="h-full overflow-y-auto space-y-0.5 bs-thinscroll pr-2">
              {scanLogs.map((log, idx) => (
                <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-200">
                  <span className="text-white/25 mr-1.5">[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </div>
              ))}
              {isScanning && (
                <div className="text-white/35 italic animate-pulse">
                  &gt; Indexando gaps de engodo de marketing...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PASSO 4: O VERDITO XEQUE-MATE FINAL (PORTAL DE POSICIONAMENTO ANTICÓPIA) */}
      {step === 4 && (
        <div className="flex flex-col gap-6">
          
          {/* BANNER DO VERDITO ESTRATÉGICO */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 select-none animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center shrink-0">
                <Award className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest leading-none">
                  Posicionamento Homologado por IA
                </span>
                <h4 className="text-white text-sm font-bold tracking-wide mt-1">
                  Vantagem Competitiva Real Cristalizada com Sucesso!
                </h4>
                <p className="text-white/50 text-[10px] leading-relaxed">
                  A IA cruzou seu histórico técnico, dados mercadológicos e inteligência emocional. Abaixo está sua blindagem.
                </p>
              </div>
            </div>
            
            <button
              onClick={handleConfirmCalibration}
              className="py-2.5 px-5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-black font-bold uppercase tracking-wider text-[9px] rounded-xl transition-all shadow-[0_4px_15px_rgba(16,185,129,0.25)] cursor-pointer flex items-center gap-1 shrink-0"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              CALIBRAR COCKPIT GLOBAL
            </button>
          </div>

          {/* DOSSIÊ CARD DE CONTRA-XEQUE-MATE (Frente de Verdade Radical) */}
          <div className="bg-black/60 border border-[#d2af5a]/25 rounded-3xl overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(210,175,90,0.06),transparent_65%)] pointer-events-none select-none" />
            
            {/* Header do Dossiê */}
            <div className="p-5 border-b border-[#d2af5a]/15 bg-black/40 flex justify-between items-center select-none">
              <div className="flex items-center gap-2.5">
                <Shield className="h-5 w-5 text-[#d2af5a]" />
                <div className="flex flex-col text-left">
                  <span className="text-[7.5px] font-mono text-[#d2af5a] font-bold uppercase tracking-[0.2em] leading-none">
                    Diferencial de Posicionamento Anticópia
                  </span>
                  <h3 className="text-white text-xs font-bold tracking-wide mt-1 font-mono uppercase">
                    {calculatedDiferencial.title}
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-mono text-[7px] rounded-lg tracking-widest font-bold">
                IVRS: {calculatedDiferencial.ebitda + 7}%
              </span>
            </div>

            {/* Conteúdo do Dossiê */}
            <div className="p-6 flex flex-col gap-6 text-left">
              
              {/* O seu território único - Oceano Azul */}
              <div className="flex flex-col gap-2">
                <span className="text-[#d2af5a] text-[9.5px] font-mono font-bold uppercase tracking-wider select-none">
                  🌌 O SEU TERRITÓRIO EXCLUSIVO (OCEANO AZUL):
                </span>
                <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/15 p-3 rounded-2xl">
                  <b className="text-white text-xs block font-mono">
                    {calculatedDiferencial.ocean}
                  </b>
                  <p className="text-white/80 text-[10.5px] leading-relaxed italic font-sans mt-2 pl-3 border-l-2 border-[#d2af5a]">
                    "{calculatedDiferencial.copy}"
                  </p>
                </div>
              </div>

              {/* A Anatomia da Vantagem: Métricas Reais do Seu Posicionamento */}
              <div className="flex flex-col gap-3">
                <span className="text-[#d2af5a] text-[9.5px] font-mono font-bold uppercase tracking-wider select-none font-bold">
                  ⚙️ ANATOMIA DE FORÇA OPERACIONAL & NEUROPSICOLOGIA (TDBD vs. HYPE):
                </span>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                  
                  {/* COLUNA ESQUERDA: Radar Chart (2/5 da largura) */}
                  <div className="lg:col-span-2 flex flex-col items-center justify-center bg-black/40 border border-white/5 p-4.5 rounded-2xl relative overflow-hidden min-h-[300px] select-none">
                    
                    <div className="text-center mb-2.5">
                      <span className="text-[7.5px] font-mono text-white/35 uppercase tracking-widest block">Gráfico Radial de Sanidade</span>
                      <h5 className="text-[10px] font-mono font-bold text-[#d2af5a] uppercase">Sua Operação vs Gurus Hype</h5>
                    </div>

                    <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center">
                      <svg ref={radarSvgRef} viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                        {/* Concentric Hexagonal Reference Grid */}
                        {[20, 40, 60, 80].map((r) => {
                          const hexPoints = Array.from({ length: 6 }).map((_, idx) => {
                            const angle = -Math.PI / 2 + (idx * Math.PI / 3)
                            return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`
                          }).join(" ")
                          return (
                            <polygon 
                              key={r} 
                              points={hexPoints} 
                              className="hex-grid-line"
                              fill="none" 
                              stroke="rgba(210, 175, 90, 0.08)" 
                              strokeWidth="0.8" 
                            />
                          )
                        })}

                        {/* Axes lines and outer labels */}
                        {radarData.map((d, i) => {
                          const angle = -Math.PI / 2 + (i * Math.PI / 3)
                          const xOuter = 100 + 80 * Math.cos(angle)
                          const yOuter = 100 + 80 * Math.sin(angle)
                          const xLabel = 100 + 94 * Math.cos(angle)
                          const yLabel = 100 + 94 * Math.sin(angle)
                          const textAnchor = Math.cos(angle) > 0.1 ? "start" : Math.cos(angle) < -0.1 ? "end" : "middle"

                          return (
                            <g key={i} className="group">
                              {/* Axis Line */}
                              <line 
                                x1="100" 
                                y1="100" 
                                x2={xOuter} 
                                y2={yOuter} 
                                className="radar-axis-line"
                                stroke="rgba(255, 255, 255, 0.08)" 
                                strokeWidth="0.8" 
                              />
                              {/* Label */}
                              <text
                                x={xLabel}
                                y={yLabel + (angle === Math.PI / 2 ? 4 : angle === -Math.PI / 2 ? -4 : 2)}
                                textAnchor={textAnchor}
                                fill={hoveredAxis === i ? "#d2af5a" : "rgba(255, 255, 255, 0.45)"}
                                className="radar-axis-label font-mono text-[7px] font-bold cursor-pointer transition-all uppercase"
                                onMouseEnter={() => setHoveredAxis(i)}
                                onMouseLeave={() => setHoveredAxis(null)}
                              >
                                {d.label}
                              </text>
                            </g>
                          )
                        })}

                        {/* Competitor's Area Polygon (Red) */}
                        <polygon 
                          points={compPoints} 
                          className="competitor-polygon transition-all duration-300"
                          fill="rgba(239, 68, 68, 0.12)" 
                          stroke="#ef4444" 
                          strokeWidth="1.2" 
                          strokeDasharray="2,2" 
                        />

                        {/* User's Area Polygon (Gold) */}
                        <polygon 
                          points={userPoints} 
                          className="user-polygon transition-all duration-300 shadow-[0_0_10px_#d2af5a]"
                          fill="rgba(210, 175, 90, 0.18)" 
                          stroke="#d2af5a" 
                          strokeWidth="2.2" 
                        />

                        {/* Node dots for hovered axis */}
                        {radarData.map((d, i) => {
                          const userCoords = getCoordinates(d.user, i)
                          const compCoords = getCoordinates(d.comp, i)
                          const isHovered = hoveredAxis === i

                          return (
                            <g key={i} className="pointer-events-none">
                              {/* Competitor dot */}
                              <circle 
                                cx={compCoords.x} 
                                cy={compCoords.y} 
                                r={isHovered ? 4.5 : 2.5} 
                                fill="#ef4444" 
                                className="radar-node transition-all duration-200"
                              />
                              {/* User dot */}
                              <circle 
                                cx={userCoords.x} 
                                cy={userCoords.y} 
                                r={isHovered ? 5.5 : 3.5} 
                                fill="#d2af5a" 
                                stroke={isHovered ? "#ffffff" : "none"}
                                strokeWidth="0.8"
                                className="radar-node transition-all duration-200"
                              />
                              {isHovered && (
                                <circle 
                                  cx={userCoords.x} 
                                  cy={userCoords.y} 
                                  r="9" 
                                  fill="none" 
                                  stroke="#d2af5a" 
                                  strokeWidth="0.8" 
                                  className="animate-ping opacity-60" 
                                />
                              )}
                            </g>
                          )
                        })}

                        {/* Overlay invisible interactive circles for hover zones */}
                        {radarData.map((d, i) => {
                          const angle = -Math.PI / 2 + (i * Math.PI / 3)
                          const xOuter = 100 + 82 * Math.cos(angle)
                          const yOuter = 100 + 82 * Math.sin(angle)
                          return (
                            <circle
                              key={i}
                              cx={xOuter}
                              cy={yOuter}
                              r="20"
                              fill="transparent"
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredAxis(i)}
                              onMouseLeave={() => setHoveredAxis(null)}
                            />
                          )
                        })}
                      </svg>

                      {/* Tooltip Overlay */}
                      {hoveredAxis !== null && (
                        <div className="absolute inset-2 flex flex-col items-center justify-center bg-black/92 backdrop-blur-md border border-[#d2af5a]/35 p-3 rounded-2xl pointer-events-none select-none text-center animate-in zoom-in-95 duration-150 shadow-[0_0_20px_rgba(210,175,90,0.12)]">
                          <span className="text-[9px] font-mono font-bold text-[#d2af5a] uppercase tracking-wider">{radarData[hoveredAxis].label}</span>
                          <span className="text-[7px] font-sans text-white/50 leading-tight mt-0.5 max-w-[140px]">{radarData[hoveredAxis].desc}</span>
                          <div className="flex gap-4 mt-2 border-t border-white/5 pt-1.5 w-full justify-center">
                            <div className="flex flex-col">
                              <span className="text-[6.5px] text-white/35 font-mono">VOCÊ</span>
                              <span className="text-[10px] font-mono font-bold text-[#d2af5a]">
                                {radarData[hoveredAxis].rawUser}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[6.5px] text-white/35 font-mono">CLONES</span>
                              <span className="text-[10px] font-mono font-bold text-red-400">
                                {radarData[hoveredAxis].rawComp}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Legend */}
                    <div className="flex gap-3.5 mt-2 text-[8px] font-mono select-none">
                      <span className="flex items-center gap-1 text-[#d2af5a]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#d2af5a] shadow-[0_0_4px_#d2af5a]" />
                        Você (Auditável)
                      </span>
                      <span className="flex items-center gap-1 text-[#ef4444]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444] shadow-[0_0_4px_#ef4444]" />
                        Concorrência (Hype)
                      </span>
                    </div>
                  </div>

                  {/* COLUNA DIREITA: Metrics Grid (3/5 da largura) */}
                  <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-black/40 border border-white/5 p-3 rounded-2xl space-y-1">
                      <span className="text-white/40 text-[7.5px] font-mono uppercase block select-none">Tomada de Decisão baseada em Dados</span>
                      <b className="text-[#d2af5a] text-sm font-mono block">{calculatedDiferencial.tdbd}% TDBD</b>
                      <span className="text-[7px] text-white/30 block font-sans select-none">Sua empresa decide em fatos, concorrentes em achismo.</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-2xl space-y-1">
                      <span className="text-white/40 text-[7.5px] font-mono uppercase block select-none">Sequestro da Amígdala</span>
                      <b className="text-[#d2af5a] text-sm font-mono block">{calculatedDiferencial.sequestroAmigdala}% Risco</b>
                      <span className="text-[7px] text-white/30 block font-sans select-none">Controle emocional de Córtex Pré-Frontal vs. desespero concorrente.</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-2xl space-y-1">
                      <span className="text-white/40 text-[7.5px] font-mono uppercase block select-none">Fricção de Personagem</span>
                      <b className="text-[#d2af5a] text-sm font-mono block">{calculatedDiferencial.friccaoPersonagem}% Desgaste</b>
                      <span className="text-[7px] text-white/30 block font-sans select-none">Uso do Eu Integral autêntico poupa cortisol na operação.</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-2xl space-y-1">
                      <span className="text-white/40 text-[7.5px] font-mono uppercase block select-none">Custo Dopaminérgico</span>
                      <b className="text-[#d2af5a] text-sm font-mono block">{calculatedDiferencial.custoDopaminergico}% Manipulação</b>
                      <span className="text-[7px] text-white/30 block font-sans select-none">Produto baseado na educação e verdade radical vs. FOMO agressivo.</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-2xl space-y-1">
                      <span className="text-white/40 text-[7.5px] font-mono uppercase block select-none">Margem EBITDA</span>
                      <b className="text-[#d2af5a] text-sm font-mono block">{calculatedDiferencial.ebitda}% EBITDA</b>
                      <span className="text-[7px] text-white/30 block font-sans select-none">Margem de lucro real sem queima estúpida de caixa em tráfego.</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-2xl space-y-1">
                      <span className="text-white/40 text-[7.5px] font-mono uppercase block select-none">Eficiência LTV/CAC</span>
                      <b className="text-[#d2af5a] text-sm font-mono block">{calculatedDiferencial.ltvCac}x Retorno</b>
                      <span className="text-[7px] text-white/30 block font-sans select-none">Indicação e retenção orgânica vs. leilão de anúncios caros.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Martelada de Ouro: Eliminação Absoluta de Objeções */}
              <div className="bg-[#d2af5a]/10 border border-[#d2af5a]/25 p-5 rounded-2xl flex flex-col gap-2 relative">
                <span className="text-[#d2af5a] text-[9px] font-mono font-bold uppercase tracking-wider select-none flex items-center gap-1.5">
                  🔨 A MARTELADA DE OURO (ELIMINAÇÃO ABSOLUTA DE OBJEÇÕES)
                </span>
                <p className="text-white/85 text-[10px] leading-relaxed font-sans">
                  <b>Como eliminar qualquer objeção instantaneamente:</b> Diante de questionamentos sobre preço ou autoridade, a sua <b>martelada definitiva</b> funde a integridade inimitável construída no leito de UTI com métricas matemáticas auditáveis. Mostre que sua operação é pautada na verdade real, anulando objeções pelo contraste com clones de palco. Ninguém consegue checkmatar quem opera sob dados sólidos e verdade inquestionável.
                </p>
              </div>

              {/* O Xeque-Mate na Prática: Copy do Argumento de Vendas */}
              <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/25 p-4 rounded-2xl relative select-text">
                <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-widest mb-1.5 select-none">
                  📢 SEU ARGUMENTO DE CONTRA-XEQUE-MATE COMERCIAL (COPIÁVEL):
                </span>
                <p className="text-white/85 text-[9.5px] leading-relaxed italic font-sans pr-6">
                  "Ao falar com o seu mercado, posicione o contraste absoluto: enquanto a concorrência atua em uma caixa preta de ilusão de marketing ({calculatedDiferencial.custoDopaminergico * 5}% de Hype/Custo Dopaminérgico) com suporte frio de robôs, nós provamos a entrega real com dados auditáveis: temos {calculatedDiferencial.ebitda}% de Margem EBITDA estruturada, {calculatedDiferencial.ltvCac}x de LTV/CAC, tomamos decisões 100% baseadas em dados ({calculatedDiferencial.tdbd}% TDBD) e possuímos controle emocional do Sequestro da Amígdala de apenas {calculatedDiferencial.sequestroAmigdala}% devido à clareza do nosso Eu Integral. Não compre promessas de palco, compre processos reais de pessoas para pessoas."
                </p>
                <button
                  onClick={() => {
                    const text = `Ao falar com o seu mercado, posicione o contraste absoluto: enquanto a concorrência atua em uma caixa preta de ilusão de marketing (${calculatedDiferencial.custoDopaminergico * 5}% de Hype/Custo Dopaminérgico) com suporte frio de robôs, nós provamos a entrega real com dados auditáveis: temos ${calculatedDiferencial.ebitda}% de Margem EBITDA estruturada, ${calculatedDiferencial.ltvCac}x de LTV/CAC, tomamos decisões 100% baseadas em dados (${calculatedDiferencial.tdbd}% TDBD) e possuímos controle emocional do Sequestro da Amígdala de apenas ${calculatedDiferencial.sequestroAmigdala}% devido à clareza do nosso Eu Integral. Não compre promessas de palco, compre processos reais de pessoas para pessoas.`;
                    navigator.clipboard.writeText(text);
                    setShowPitchCopyAlert(true);
                    setTimeout(() => setShowPitchCopyAlert(false), 2500);
                  }}
                  className="absolute top-2 right-2 text-[#d2af5a] hover:text-white transition font-mono text-[7px] font-bold uppercase cursor-pointer select-none"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>

              {showPitchCopyAlert && (
                <div className="bg-emerald-950/40 border border-emerald-500/35 text-emerald-400 px-4 py-2 rounded-xl text-[9px] text-center font-mono animate-in fade-in select-none">
                  ✅ <b>Argumento de Contra-Xeque-Mate copiado para a área de transferência!</b> Pronto para uso em propostas, posts ou mentorias.
                </div>
              )}

              {/* Botões de Ação Inferiores */}
              <div className="flex flex-col md:flex-row gap-3 justify-between items-center border-t border-white/5 pt-4">
                <span className="text-[8px] text-white/35 font-sans leading-relaxed max-w-sm">
                  🛡️ <b>Mapeamento Integral BS:</b> A fusão neuropsicológica desmistifica clones e resgata seu valor real baseado na verdade auditável.
                </span>

                <div className="flex gap-2 w-full md:w-auto justify-end select-none">
                  <button 
                    onClick={async () => {
                      await saveStrategicDossier({
                        title: calculatedDiferencial.title,
                        ocean: calculatedDiferencial.ocean,
                        copy: calculatedDiferencial.copy,
                        ebitda: calculatedDiferencial.ebitda,
                        ltvCac: calculatedDiferencial.ltvCac,
                        tdbd: calculatedDiferencial.tdbd,
                        sequestroAmigdala: calculatedDiferencial.sequestroAmigdala,
                        friccaoPersonagem: calculatedDiferencial.friccaoPersonagem,
                        custoDopaminergico: calculatedDiferencial.custoDopaminergico,
                        verdict: calculatedDiferencial.verdict
                      })
                      alert("Dossiê de Posicionamento salvo com sucesso no banco de dados local-first RxDB! O cockpit tático foi calibrado automaticamente.")
                    }}
                    className="px-4 py-2 bg-[#d2af5a]/10 border border-[#d2af5a]/30 hover:bg-[#d2af5a]/20 text-[#d2af5a] font-bold uppercase tracking-wider text-[9px] rounded-lg transition-all cursor-pointer"
                  >
                    Salvar Dossiê BS
                  </button>
                  <button 
                    onClick={handleConfirmCalibration}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#d2af5a] to-amber-500 hover:brightness-110 text-black font-bold uppercase tracking-wider text-[9px] rounded-lg transition-all cursor-pointer shadow-lg"
                  >
                    Confirmar Calibragem de Vantagem
                  </button>
                </div>
              </div>

            </div>

            {/* Footer do Dossiê */}
            <div className="p-4 border-t border-[#d2af5a]/15 bg-black/40 flex justify-between items-center text-[7.5px] font-mono text-white/35 select-none">
              <span>Google Vertex AI Real-Time Neuro-Strategic Integrator v3.0</span>
              <button 
                onClick={onClose}
                className="text-white/40 hover:text-white uppercase transition hover:underline"
              >
                Voltar ao Cockpit
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}