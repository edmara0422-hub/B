'use client'

import { useState, useEffect, useRef } from 'react'
import { MoreHorizontal, Send, ArrowLeft, Bot, Sparkles, User, Terminal, Mic, Square } from 'lucide-react'

interface Message {
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

export function MiniAi() {
  const [activeMode, setActiveMode] = useState<'orb' | 'chat'>('orb')
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Olá! Sou seu Business Syllabus AI Advisor 6D. Posso cruzar seus dados macro, humanos e financeiros ao vivo. Qual cenário deseja simular?',
      timestamp: '10:21'
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  
  // Interactive Voice Recording Simulation States
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  // Recording timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds(prev => prev + 1)
      }, 1000)
    } else {
      setRecordingSeconds(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    const audioPrompts = [
      "Plano de ação estratégico 6D para mitigar Burnout vs EBITDA e estruturar rituais SBI.",
      "Análise macroeconômica: como a SELIC a 14,40% afeta meu custo médio de capital WACC?",
      "Planejamento de tração: calibrar marketing Meta vs TikTok para resgatar o LTV/CAC.",
      "Proposta de reestruturação de squads matriciais com POs para otimizar prazos de BI."
    ]
    const randomPrompt = audioPrompts[Math.floor(Math.random() * audioPrompts.length)]
    handleSend(`[🎙️ Áudio Transcrito] ${randomPrompt}`)
  }

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText
    if (!text.trim()) return

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInputText('')
    setIsTyping(true)

    // Simulate sophisticated NASA-level 6D AI response after 1.2s
    setTimeout(() => {
      let aiResponseText = ''
      const lowerText = text.toLowerCase()

      if (lowerText.includes('burnout') || lowerText.includes('ebitda') || lowerText.includes('pessoas')) {
        aiResponseText = '🚨 [Preditivo Multivariado: Pilar 1 & 2]\n\nSe o seu Índice de Burnout (EEB) passa de 31%, a projeção linear aponta compressão de 14% na margem EBITDA. A rotatividade de 38% custa cerca de 1.5x a 2x o salário anual de cada colaborador técnico.\n\n💡 Recomendações Estruturantes:\n1. Trave metas operacionais temporariamente em escala 15% esta semana.\n2. Inicie escala alternativa de folgas e reduza reuniões de alinhamento em 40%.\n3. Calibre rituais SBI quinzenais no SIG Pessoas.'
      } else if (lowerText.includes('selic') || lowerText.includes('wacc') || lowerText.includes('juro')) {
        aiResponseText = '📉 [Simulação Macro-Financeira: Pilar 2 & 3]\n\nCom a SELIC a 14,40% e o IPCA a 4,39%, a Taxa Real de Juros está travada em pesados 10,01%. Isso eleva o WACC corporativo do Brasil para 17,2%.\n\n💡 Regra de Decisão do Caixa:\n1. Suspenda CAPEX físico expansivo de longo prazo.\n2. Aloque 40% do faturamento excedente em investimentos em CDI/Renda Fixa com liquidez diária.\n3. Otimize custos operacionais indiretos usando automações inteligentes.'
      } else if (lowerText.includes('ltv') || lowerText.includes('cac') || lowerText.includes('churn') || lowerText.includes('marketing') || lowerText.includes('ads') || lowerText.includes('cpm')) {
        aiResponseText = '🚀 [Otimização de Tração Digital: Pilar 2]\n\nSeu LTV/CAC está estável em 3.2x (seguro, LTV > 3x CAC), mas o CPM do Meta Ads subiu para R$ 14,20.\n\n💡 Estratégia de Mídia:\n1. Rebalanceie seu budget de canais: transfira 20% do orçamento para TikTok Ads (CPM estável a US$ 6,80).\n2. Crie landing pages focadas em fisioterapia intensivista para aumentar a conversão local de 2.1% para 3.5%.'
      } else if (lowerText.includes('squad') || lowerText.includes('liderança') || lowerText.includes('plano') || lowerText.includes('estrategia') || lowerText.includes('tuckman')) {
        aiResponseText = '👥 [Maturidade & Escopo Organizacional: Pilar 1 & 3]\n\nSeu time apresenta ambiguidade de reporte em momentos de pico de atividade.\n\n💡 Plano de Ação de Governança:\n1. Adote squads matriciais autônomos com um Product Owner (PO) dedicado por projeto.\n2. Conceda autonomia de decisão (Maturidade M4) com monitoramento assíncrono.\n3. Calibre o multiplicador Tuckman (Performing a x1.45) alinhando o contrato de aliança.'
      } else {
        aiResponseText = '🔍 [BS Advisor 6D: Análise Integrada Habilitada]\n\nEstou conectado às APIs macro e humanas. Diga o que deseja simular:\n\n💬 \'Como Burnout afeta meu EBITDA?\'\n💬 \'Qual o plano estratégico para a alta da SELIC?\'\n💬 \'Como otimizar LTV/CAC e Churn?\'\n💬 \'Criar plano de ação de squads matriciais\'\n\nEstou pronto para formular qualquer estratégia interdisciplinar premium.'
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-3 select-none overflow-hidden relative"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseOrbGlass {
          0%, 100% { 
            transform: scale(1); 
            filter: drop-shadow(0 0 15px rgba(210, 175, 90, 0.5)) drop-shadow(0 0 25px rgba(210, 175, 90, 0.2));
            opacity: 0.95;
          }
          50% { 
            transform: scale(1.03); 
            filter: drop-shadow(0 0 25px rgba(210, 175, 90, 0.85)) drop-shadow(0 0 45px rgba(210, 175, 90, 0.45));
            opacity: 1;
          }
        }
        @keyframes rotateClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateCounter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes heartbeat {
          0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 5px #fff); }
          50% { opacity: 1; filter: drop-shadow(0 0 15px #d2af5a); }
        }
        @keyframes scanline {
          0% { transform: translateY(-3px); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(6px); opacity: 0; }
        }
        @keyframes soundwave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }

        .glow-orb-glass {
          animation: pulseOrbGlass 4s infinite ease-in-out;
        }
        .orbit-rotate-fast {
          animation: rotateClockwise 12s linear infinite;
          transform-origin: 50px 46px;
        }
        .orbit-rotate-slow {
          animation: rotateCounter 22s linear infinite;
          transform-origin: 50px 46px;
        }
        .orbit-rotate-tilted {
          animation: rotateClockwise 30s linear infinite;
          transform-origin: 50px 46px;
        }
        .ai-text-pulse {
          animation: heartbeat 3s infinite ease-in-out;
        }
        .base-scan {
          animation: scanline 2.5s infinite linear;
        }
        .chat-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(210, 175, 90, 0.25);
          border-radius: 9px;
        }
        
        .soundwave-bar {
          display: inline-block;
          width: 2px;
          background: #d2af5a;
          margin: 0 1px;
          border-radius: 2px;
          animation: soundwave 1.2s infinite ease-in-out;
        }
      `}} />

      {/* HEADER DO CARD */}
      <div className="flex justify-between items-center w-full z-10 border-b border-white/5 pb-1">
        <div className="flex items-center gap-1.5">
          {activeMode === 'chat' && (
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveMode('orb'); }}
              className="p-0.5 rounded bg-white/5 hover:bg-white/10 text-[#d2af5a] transition-all cursor-pointer mr-1"
            >
              <ArrowLeft className="h-3 w-3" />
            </button>
          )}
          <span className="text-[11px] font-normal text-white/95 tracking-wide">
            <span className="text-[#d2af5a] font-bold">BS</span> AI Assistant
          </span>
        </div>
        
        {/* Telemetria NASA e Modo de Operação */}
        <div className="flex items-center gap-1.5 font-mono text-[7px] text-white/35">
          <Terminal className="h-2.5 w-2.5 text-[#d2af5a] animate-pulse" />
          <span>GPU_ACCEL: 60FPS</span>
        </div>
      </div>

      {/* MODO 1: ORBE GIGANTE (Holograma 6D NASA) */}
      {activeMode === 'orb' && (
        <div 
          onClick={() => setActiveMode('chat')}
          className="flex-1 flex items-center gap-2 py-0 cursor-pointer group/orb relative"
        >
          {/* Holograma da Esfera de IA GIGANTE (145px) */}
          <div className="w-[52%] h-[165px] flex flex-col justify-center items-center border-r border-white/5 pr-2 relative overflow-hidden transition-all duration-300 group-hover/orb:border-[#d2af5a]/30">
            <svg className="w-[145px] h-[145px] glow-orb-glass mt-1" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="holoCore3D" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#fffbf2" stopOpacity="0.75" />
                  <stop offset="75%" stopColor="#d2af5a" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#7a5b18" stopOpacity="0.05" />
                </radialGradient>
                <radialGradient id="goldSphereBorder" cx="50%" cy="50%" r="50%">
                  <stop offset="90%" stopColor="#d2af5a" stopOpacity="0.2" />
                  <stop offset="98%" stopColor="#d2af5a" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
                </radialGradient>
                <filter id="aiTextGlow">
                  <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Anéis de Coordenadas do Grid Externo */}
              <circle cx="50" cy="46" r="44" fill="none" stroke="#d2af5a" strokeWidth="0.5" strokeDasharray="3,6" className="orbit-rotate-fast" opacity="0.25" />
              <circle cx="50" cy="46" r="28" fill="#d2af5a" fillOpacity="0.05" stroke="url(#goldSphereBorder)" strokeWidth="0.8" />

              {/* Eixo 1: Órbitas Horárias Rápidas */}
              <g className="orbit-rotate-fast" opacity="0.65">
                <ellipse cx="50" cy="46" rx="28" ry="8" fill="none" stroke="#d2af5a" strokeWidth="0.7" />
                <ellipse cx="50" cy="46" rx="8" ry="28" fill="none" stroke="#d2af5a" strokeWidth="0.7" />
                <circle cx="50" cy="18" r="1.2" fill="#ffffff" />
                <circle cx="50" cy="74" r="1.2" fill="#ffffff" />
              </g>

              {/* Eixo 2: Órbitas Anti-Horárias Médias */}
              <g className="orbit-rotate-slow" opacity="0.6">
                <ellipse cx="50" cy="46" rx="28" ry="16" fill="none" stroke="#d2af5a" strokeWidth="0.6" />
                <ellipse cx="50" cy="46" rx="16" ry="28" fill="none" stroke="#d2af5a" strokeWidth="0.6" />
                <circle cx="22" cy="46" r="1.2" fill="#ffffff" />
                <circle cx="78" cy="46" r="1.2" fill="#ffffff" />
              </g>

              {/* Eixo 3: Órbitas Tilted Lentas */}
              <g className="orbit-rotate-tilted" opacity="0.5">
                <ellipse cx="50" cy="46" rx="27" ry="10" fill="none" stroke="#d2af5a" strokeWidth="0.5" transform="rotate(30, 50, 46)" />
                <ellipse cx="50" cy="46" rx="27" ry="10" fill="none" stroke="#d2af5a" strokeWidth="0.5" transform="rotate(-30, 50, 46)" />
              </g>

              <circle cx="50" cy="46" r="27.5" fill="url(#holoCore3D)" />
              
              {/* Texto AI Central Pulsante */}
              <text x="50" y="52" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle" filter="url(#aiTextGlow)" className="ai-text-pulse" style={{ fontFamily: "monospace" }}>
                AI
              </text>

              {/* Glare spotlight */}
              <circle cx="40" cy="36" r="3.5" fill="#ffffff" opacity="0.65" filter="blur(0.4px)" />

              {/* Pedestal de Anéis Metálicos com Scanline de Varredura */}
              <g transform="translate(0, 1)">
                <ellipse cx="50" cy="74" rx="26" ry="3.5" fill="rgba(210,175,90,0.25)" filter="blur(1.5px)" />
                <path d="M 28,78 L 72,78 L 68,82 L 32,82 Z" fill="#1e180d" stroke="rgba(210,175,90,0.45)" strokeWidth="0.5" />
                <path d="M 36,73 L 64,73 L 60,78 L 40,78 Z" fill="#0d0d0f" stroke="rgba(210,175,90,0.45)" strokeWidth="0.5" />
                
                {/* Scanline ativo */}
                <line x1="34" y1="74" x2="66" y2="74" stroke="#ffffff" strokeWidth="0.8" className="base-scan" opacity="0.6" />
                
                <line x1="22" y1="84" x2="78" y2="84" stroke="#d2af5a" strokeWidth="0.5" strokeDasharray="1,4" opacity="0.6" />
              </g>
            </svg>
            <div className="absolute bottom-1 bg-[#d2af5a]/10 border border-[#d2af5a]/35 px-2 py-0.5 rounded-full text-[6.5px] font-mono tracking-widest text-[#d2af5a] uppercase animate-pulse">
              CLICK TO CHAT
            </div>
          </div>

          {/* Lado Direito: Botões de Lançamento */}
          <div className="flex-1 flex flex-col justify-center space-y-3 pl-1.5 relative">
            {/* Gemini */}
            <div className="relative flex items-center">
              <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
                <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
                <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
              </div>
              <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
                <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
                <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveMode('chat'); }}
                className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#d2af5a]/12 border border-[#d2af5a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200 shadow-md active:scale-98"
              >
                Gemini
              </button>
            </div>

            {/* Grok */}
            <div className="relative flex items-center">
              <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
                <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
                <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
              </div>
              <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
                <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
                <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveMode('chat'); }}
                className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#d2af5a]/12 border border-[#d2af5a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200 shadow-md active:scale-98"
              >
                Grok
              </button>
            </div>

            {/* LLaMA */}
            <div className="relative flex items-center">
              <div className="absolute left-[-16px] w-[14px] flex items-center justify-between pointer-events-none">
                <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
                <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
              </div>
              <div className="absolute right-[-2px] w-[14px] flex items-center justify-between pointer-events-none">
                <div className="h-1.5 w-[0.5px] bg-[#d2af5a]" />
                <div className="h-[0.5px] w-full bg-[#d2af5a]/45" />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveMode('chat'); }}
                className="w-full text-center py-1 bg-[#090806]/90 hover:bg-[#d2af5a]/12 border border-[#d2af5a]/45 rounded-lg text-[9px] font-semibold text-white tracking-widest uppercase transition-all duration-200 shadow-md active:scale-98"
              >
                LLaMA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODO 2: CHAT INTERATIVO DE ALTA TECNOLOGIA */}
      {activeMode === 'chat' && (
        <div className="flex-1 flex flex-col justify-between py-1 h-[170px] relative" onClick={(e) => e.stopPropagation()}>
          
          {/* Scroll Area de Mensagens */}
          <div className="flex-1 overflow-y-auto chat-scroll space-y-2 pr-1 my-1 max-h-[110px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-1.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="h-5 w-5 rounded-full bg-[#d2af5a]/10 border border-[#d2af5a]/35 flex items-center justify-center shrink-0">
                    <Bot className="h-2.5 w-2.5 text-[#d2af5a]" />
                  </div>
                )}
                <div 
                  className={`p-2 rounded-xl text-[8.5px] max-w-[82%] leading-relaxed font-mono ${
                    msg.sender === 'user' 
                      ? 'bg-[#d2af5a] text-[#0c0a07] rounded-tr-none font-bold shadow-[0_0_8px_rgba(210,175,90,0.25)]' 
                      : 'bg-white/[0.03] border border-white/5 text-white/90 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-1.5 justify-start">
                <div className="h-5 w-5 rounded-full bg-[#d2af5a]/10 border border-[#d2af5a]/35 flex items-center justify-center shrink-0">
                  <Sparkles className="h-2.5 w-2.5 text-[#d2af5a] animate-spin" />
                </div>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-white/50 text-[8px] font-mono rounded-tl-none animate-pulse">
                  Advisor cogitando estratégias 6D...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts de Simulação */}
          {messages.length === 1 && (
            <div className="flex gap-1.5 overflow-x-auto py-1 shrink-0 scrollbar-none mb-1">
              <button 
                onClick={() => handleSend('Cruzar Burnout com EBITDA')}
                className="shrink-0 px-2 py-0.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-full text-[6.5px] font-semibold text-[#d2af5a] uppercase font-mono tracking-wider transition-all duration-200"
              >
                Burnout vs EBITDA
              </button>
              <button 
                onClick={() => handleSend('Como a SELIC afeta meu WACC?')}
                className="shrink-0 px-2 py-0.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-full text-[6.5px] font-semibold text-[#d2af5a] uppercase font-mono tracking-wider transition-all duration-200"
              >
                SELIC no WACC
              </button>
              <button 
                onClick={() => handleSend('Regra de Decisão do CPM')}
                className="shrink-0 px-2 py-0.5 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/15 border border-[#d2af5a]/25 rounded-full text-[6.5px] font-semibold text-[#d2af5a] uppercase font-mono tracking-wider transition-all duration-200"
              >
                CPM & LTV/CAC
              </button>
            </div>
          )}

          {/* Input Bar com Gravador de Voz Interativo e Glow Dourado */}
          <div className="flex items-center gap-1.5 border border-white/10 bg-black/40 p-1 rounded-xl focus-within:border-[#d2af5a]/45 transition-colors">
            
            {/* Interactive Audio Simulator Input */}
            {isRecording ? (
              <div className="flex-1 flex items-center justify-between pl-1">
                <div className="flex items-center gap-1.5">
                  <span className="soundwave-bar" style={{ animationDelay: '0.1s' }} />
                  <span className="soundwave-bar" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }} />
                  <span className="soundwave-bar" style={{ animationDelay: '0.5s' }} />
                  <span className="soundwave-bar" style={{ animationDelay: '0.2s', animationDuration: '1.4s' }} />
                  <span className="soundwave-bar" style={{ animationDelay: '0.4s' }} />
                  <span className="text-[7.5px] font-mono text-red-400 animate-pulse ml-1">Gravando... {formatTime(recordingSeconds)}</span>
                </div>
                <button 
                  onClick={handleStopRecording}
                  className="h-5 px-2 bg-red-950/45 border border-red-500/40 rounded-lg flex items-center justify-center gap-1 text-red-400 hover:bg-red-900 transition-all cursor-pointer"
                >
                  <Square className="h-2 w-2 text-red-400" />
                  <span className="text-[6.5px] font-bold font-mono">PARAR</span>
                </button>
              </div>
            ) : (
              <>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Perguntar ao Advisor..." 
                  className="flex-1 bg-transparent border-none text-[8.5px] font-mono text-white placeholder-white/25 focus:outline-none pl-1"
                />
                
                {/* Microphone Record Button */}
                <button 
                  onClick={() => setIsRecording(true)}
                  className="h-5 w-5 rounded-lg bg-[#d2af5a]/10 hover:bg-[#d2af5a]/20 border border-[#d2af5a]/30 flex items-center justify-center text-[#d2af5a] transition-all cursor-pointer"
                  title="Gravar áudio com IA"
                >
                  <Mic className="h-2.5 w-2.5" />
                </button>

                {/* Send Message Button */}
                <button 
                  onClick={() => handleSend()}
                  className="h-5 w-5 rounded-lg bg-[#d2af5a] hover:bg-[#d2af5a]/80 flex items-center justify-center text-[#0c0a07] transition-all cursor-pointer active:scale-95"
                >
                  <Send className="h-2.5 w-2.5" />
                </button>
              </>
            )}

          </div>

        </div>
      )}

    </div>
  )
}