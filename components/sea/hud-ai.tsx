'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles, ArrowUp } from 'lucide-react'

interface Message {
  sender: 'bot' | 'user'
  text: string
}

export function MiniAi() {
  return (
    <>
      <div className="header-ai">
        <div className="ai-orb" />
        <div>
          <span>Apoio Digital</span>
          <b>Assistente <em>IPB-AI</em></b>
        </div>
      </div>
      <p>Dúvidas em ventilação ou protocolos rápidos? Peça cenários, quiz ou resumos práticos.</p>
      <div className="chips">
        <span className="gold">Curva P-V</span>
        <span>PCR</span>
        <span>Glasgow</span>
      </div>
    </>
  )
}

export function HudAi() {
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { sender: 'bot', text: 'Olá, <em>Edmara</em>. Sou o assistente <em>IPB-AI</em>. Como posso te auxiliar no cockpit operacional hoje?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, isLoading])

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    setChatHistory((prev) => [...prev, { sender: 'user', text }])
    setInputValue('')
    setIsLoading(true)

    // Simulate clinical response
    setTimeout(() => {
      setIsLoading(false)
      let reply = "Perdão, não compreendi totalmente. Como assistente especializado, posso te instruir sobre: a <em>Curva Pressão-Volume (P-V)</em> na ventilação mecânica, condutas práticas na <em>PCR em ambiente hospitalar</em> e orientações de <em>desmame ventilatório seguro</em>."

      const lower = text.toLowerCase()
      if (lower.includes('curva') || lower.includes('pv') || lower.includes('pressão') || lower.includes('complacência')) {
        reply = "A <b>Curva Pressão-Volume (P-V)</b> é a representação gráfica que relaciona as mudanças de volume pulmonar com a pressão aplicada em vias aéreas. O ponto de inflexão inferior (PII) ajuda a definir a PEEP ideal para evitar o colapso alveolar cíclico, enquanto o ponto de inflexão superior (PIS) evita a hiperdistensão pulmonar prejudicial."
      } else if (lower.includes('pcr') || lower.includes('cardio') || lower.includes('parada') || lower.includes('ritmo')) {
        reply = "Diante de um ritmo chocável como <b>Fibrilação Ventricular (FV)</b> ou Taquicardia Ventricular Sem Pulso (TVSP): 1. Solicite o Desfibrilador; 2. Inicie ciclos de RCP 30:2; 3. Aplique o choque (200J); 4. Retorne a RCP imediatamente por 2 min antes de nova checagem de ritmo."
      } else if (lower.includes('desmame') || lower.includes('vm') || lower.includes('ventilação') || lower.includes('protetora')) {
        reply = "Para iniciar o desmame seguro do ventilador mecânico, certifique-se de que a causa da intubação foi resolvida, paciente está estável hemodinamicamente, possui reflexo de tosse e apresenta <b>Índice RSBI menor que 105</b> durante o Teste de Respiração Espontânea (TRE)."
      }

      setChatHistory((prev) => [...prev, { sender: 'bot', text: reply }])
    }, 1200)
  }

  const triggerQuickAi = (option: string) => {
    setChatHistory((prev) => [...prev, { sender: 'user', text: option }])
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      let reply = ""
      if (option.includes('Curva')) {
        reply = "A <b>Curva P-V</b> no simulador demonstra o grau de colapsabilidade alveolar. Ao subir o slider da <em>PEEP</em> no painel de controle, você verá a curva de complacência deslocar-se para a zona de recrutamento ideal, reduzindo o esforço do ventilador e prevenindo o atelectotrauma."
      } else if (option.includes('PCR')) {
        reply = "Simulei um ritmo de <b>Taquicardia Ventricular</b> no seu monitor. O protocolo manda carregar o cardioversor/desfibrilador. Clique no botão de emergência <em>'Desferir Choque'</em> no painel de controle para cardioverter o paciente de volta ao ritmo sinusal estável."
      } else if (option.includes('Estratégia') || option.includes('Desmame')) {
        reply = "Estratégias protetoras em VM focam em limitar o volume corrente a <b>6 ml/kg de peso ideal</b>, mantendo a pressão de platô (Pplat) abaixo de 30 cmH₂O e a Driving Pressure (DP = Pplat - PEEP) rigidamente menor que 15 cmH₂O."
      }

      setChatHistory((prev) => [...prev, { sender: 'bot', text: reply }])
    }, 1000)
  }

  return (
    <>
      <div className="scanlines" />

      <div className="hero-header">
        <div className="live-head text-[#d4b87a]">
          <div className="pulse-dot" />
          <span>Assistente IPB-AI Clínico</span>
        </div>
        <div className="ch-label">INTELLIGENCE V3.5</div>
      </div>

      <div className="hero-content" style={{ gridTemplateColumns: '1fr', paddingBottom: '12px' }}>
        <div className="ai-chat-screen">
          <div className="ai-chat-messages">
            {chatHistory.map((m, idx) => (
              <div
                key={idx}
                className={`chat-msg ${m.sender}`}
                dangerouslySetInnerHTML={{ __html: m.text }}
              />
            ))}
            
            {isLoading && (
              <div className="chat-loading-bubble">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-3 relative z-20">
            <span
              className="cursor-pointer px-3 py-1.5 text-[11px] font-medium rounded-full bg-[#d4b87a]/10 border border-[#d4b87a]/30 text-[#d4b87a] hover:bg-[#d4b87a]/20 hover:border-[#d4b87a]/55 hover:scale-[1.03] active:scale-[0.97] transition-all"
              onClick={() => triggerQuickAi('Explicar Curva P-V')}
            >
              Explicar Curva P-V
            </span>
            <span
              className="cursor-pointer px-3 py-1.5 text-[11px] font-medium rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-all"
              onClick={() => triggerQuickAi('Protocolo PCR Prático')}
            >
              Protocolo PCR
            </span>
            <span
              className="cursor-pointer px-3 py-1.5 text-[11px] font-medium rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:scale-[1.03] active:scale-[0.97] transition-all"
              onClick={() => triggerQuickAi('Estratégia Protetora VM')}
            >
              Desmame VM
            </span>
          </div>

          <div className="ai-chat-input-bar">
            <input
              type="text"
              placeholder="Pergunte ao assistente sobre casos, fórmulas ou condutas..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendChatMessage(inputValue)
              }}
            />
            <button onClick={() => sendChatMessage(inputValue)}>›</button>
          </div>
        </div>
      </div>

      <div className="hero-footer" style={{ paddingTop: '12px' }}>
        <div className="title-group">
          <span className="area">Apoio Decisor</span>
          <h2>Assistente <em>IPB AI</em></h2>
          <p>Tire suas dúvidas ou gere simulados instantâneos de forma guiada no prompt interativo acima. Contextualizado com as suas sessões ativas.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene">✦ Entrar na cena</button>
        </div>
      </div>
    </>
  )
}
