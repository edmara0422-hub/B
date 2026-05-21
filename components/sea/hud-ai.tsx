'use client'

import { useState } from 'react'
import { Sparkles, ArrowUp } from 'lucide-react'

export function MiniAi() {
  return (
    <div className="mini-ai-card">
      <div className="header-ai">
        <div className="ai-orb" />
        <div>
          <span>Assistente Inteligente</span>
          <b>SEA <em>AI</em></b>
        </div>
      </div>
      <p>Treinado com guidelines clínicos globais para suporte à decisão na UTI.</p>
      <div className="chips">
        <span className="gold">Online</span>
        <span>ACLS</span>
        <span>Ventilação</span>
      </div>
    </div>
  )
}

export function HudAi() {
  return (
    <>
      <div className="scanlines" />

      <div className="hero-header">
        <div className="live-head text-[#e8cc88]">
          <div className="pulse-dot" />
          <span>Modelo Clínico Ativo</span>
        </div>
        <div className="ch-label">AI-Core</div>
      </div>

      <div className="hero-content">
        {/* Painel Central Visual (Chat) */}
        <div className="hero-visual-pane">
          <div className="ai-chat-screen w-full h-full">
            <div className="ai-chat-messages">
              <div className="chat-msg bot">
                Olá, Dr. Carlos. Sou a <em>SEA AI</em>. Estou analisando os dados do paciente do leito 04. Notei uma assincronia de fluxo na ventilação mecânica. Como posso ajudar?
              </div>
              <div className="chat-msg user">
                Qual o melhor ajuste de fluxo inspiratório para este caso?
              </div>
              <div className="chat-msg bot">
                Para corrigir o duplo disparo associado à assincronia de fluxo, recomendo aumentar o fluxo inspiratório para <strong>60 L/min</strong> e alterar o padrão de onda para decrescente, garantindo melhor atendimento à demanda do paciente.
              </div>
            </div>
            <div className="ai-chat-input-bar">
              <input type="text" placeholder="Pergunte sobre protocolos, cálculos ou casos clínicos..." />
              <button><ArrowUp size={18} /></button>
            </div>
          </div>
        </div>

        {/* Controles Laterais (Configurações da AI) */}
        <div className="hero-controls-pane">
          <div>
            <h3 className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Contexto Clínico <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </h3>
            
            <div className="flex flex-col gap-2 mb-6">
              <button className="text-left bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl transition-colors">
                <span className="block text-[10px] text-[#e8cc88] uppercase tracking-wider mb-1">Especialidade</span>
                <b className="text-sm text-white">Fisioterapia Intensiva</b>
              </button>
              <button className="text-left bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl transition-colors">
                <span className="block text-[10px] text-[#e8cc88] uppercase tracking-wider mb-1">Diretriz Ativa</span>
                <b className="text-sm text-white">Sobrevivência à Sepse 2021</b>
              </button>
            </div>

            <h3 className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              Ações Rápidas <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </h3>
            <div className="flex flex-col gap-2">
              <button className="cardio-btn !text-left !px-3">Analisar Gasometria Arterial</button>
              <button className="cardio-btn !text-left !px-3">Calcular Mecânica Respiratória</button>
              <button className="cardio-btn !text-left !px-3">Revisar Desmame Ventilatório</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
