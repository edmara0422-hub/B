'use client'

export function MiniAi() {
  return (
    <>
      <div className="header-ai">
        <div className="ai-orb" />
        <div>
          <span>Apoio Digital</span>
          <b>Assistente <em>IPB-AI Ultra</em></b>
        </div>
      </div>
      <p>Dúvidas em EBITDA, WACC ou PESTEL? Peça resumos práticos, destile modelos de LLM na Vertex AI ou analise cenários.</p>
      <div className="chips">
        <span className="gold">Gemini 3.5 Flash</span>
        <span>Grok 4.3</span>
        <span>Voyage 3.5</span>
        <span>MiMo MoE</span>
      </div>
    </>
  )
}
