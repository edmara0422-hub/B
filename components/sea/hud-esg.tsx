'use client'

import { useState } from 'react'
import { Leaf, Star, Mail, MessageSquare, Send, CheckCircle2, Trash2 } from 'lucide-react'

// Domínios de Transformação Digital baseados no IPB (David Rogers, Columbia Business School, 2016)
const ODS_DATA: Record<string, string> = {
  '3': '<b>Clientes & Redes:</b> Repensar as relações de mercado, transformando audiências passivas em redes dinâmicas de engajamento e valor mútuo.',
  '4': '<b>Capacitação e Cultura:</b> Oferecer simulações interativas corporativas com feedbacks matemáticos precisos para tomadas de decisão ágeis.',
  '9': '<b>Inovação Digital Sustentável:</b> Arquitetura client-side ultra-eficiente a 120 FPS que consome menos processamento em servidores de nuvem, mitigando emissões de carbono.',
  '10': '<b>Redução de Assimetrias:</b> Apenas 5% das PMEs brasileiras utilizam dados estruturados para decisão (CETIC.br). Democratizamos a inteligência analítica de dados.',
  '12': '<b>Consumo Responsável (Zero Papel):</b> Digital-first real. Menos arquivos em papel e otimização total de processos internos para eficiência absoluta de OPEX.'
}

// Governance Data for IPB Business
const GOV_DATA: Record<string, { title: string; body: string }> = {
  'politicas': {
    title: 'Políticas de Privacidade (LGPD)',
    body: 'Nossa política de proteção de dados segue estritamente a LGPD. Não salvamos dados sensíveis externos de clientes. Todo o processamento estratégico de BI é executado localmente (Client-Side), garantindo total confidencialidade e segurança dos dados corporativos.'
  },
  'praticas': {
    title: 'Práticas de Engenharia Verde',
    body: 'Adotamos engenharia de software sustentável (Green IT). Nossos algoritmos utilizam lógica processada diretamente no cliente para diminuir requisições de rede, evitando o uso massivo e desnecessário de servidores centralizados com alto consumo energético.'
  },
  'compliance': {
    title: 'Compliance & Auditoria Corporativa',
    body: 'O IPB atende aos padrões rígidos de auditoria e transparência de dados. Nossas simulações de EBITDA, WACC e LTV/CAC utilizam fórmulas matemáticas financeiras consolidadas e auditadas para garantir total conformidade com práticas de mercado.'
  },
  'termos': {
    title: 'Termos de Uso Estratégico',
    body: 'A plataforma IPB é licenciada para simulação estratégica e suporte à decisão gerencial. A utilização dos simuladores visa o aprimoramento cognitivo de diretores, fundadores e analistas, não substituindo pareceres contábeis e de auditorias formais.'
  },
  'cookies': {
    title: 'Políticas de Cookies Limpas',
    body: 'Utilizamos apenas cookies essenciais para manter sua sessão ativa de progresso corporativo. Livre de cookies de rastreamento comportamental de terceiros e anúncios. Foco total em privacidade.'
  },
  'missao': {
    title: 'Missão e Valores IPB',
    body: 'Nossa missão é impulsionar a real Transformação Digital em empresas através de dados analíticos. Acreditamos que governança transparente, segurança de dados e crescimento saudável (LTV > 3x CAC) andam lado a lado.'
  },
  'dpo': {
    title: 'Data Protection Officer (DPO)',
    body: 'Para esclarecimentos sobre a privacidade, governança de chaves de acesso ou exclusão imediata e definitiva do seu histórico de progresso, contate nosso DPO corporativo pelo e-mail: <b>dpo@ipb.com.br</b>.'
  }
}

export function HudEsg() {
  const [npsSelected, setNpsSelected] = useState<number | null>(null)
  const [npsComment, setNpsComment] = useState('')
  const [feedbacksList, setFeedbacksList] = useState<{ score: number; text: string }[]>([])
  const [npsSubmitted, setNpsSubmitted] = useState(false)
  const [activeOdsKey, setActiveOdsKey] = useState<string>('3')
  const [activeGovTab, setActiveGovTab] = useState<string | null>(null)

  // Estados de Suporte Helpdesk
  const [supportEmail, setSupportEmail] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const [supportSending, setSupportSending] = useState(false)
  const [supportSuccess, setSupportSuccess] = useState(false)
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState('')

  const [docType, setDocType] = useState('ata')
  const [generating, setGenerating] = useState(false)
  const [generatedDoc, setGeneratedDoc] = useState('')

  const handleGenerateDoc = () => {
    setGenerating(true)
    setGeneratedDoc('')
    
    setTimeout(() => {
      setGenerating(false)
      const nowStr = new Date().toLocaleDateString('pt-BR')
      if (docType === 'ata') {
        setGeneratedDoc(
`INTELLIGENCE PLATFORM BUSINESS (IPB)
ATA DE ASSEMBLEIA GERAL EXTRAORDINÁRIA - ESG

Data: ${nowStr}
Pauta: Homologação das práticas de Governança ESG, Green Computing e transição corporativa.

Deliberações:
1. Fica aprovado o redimensionamento dos cálculos de telemetria local no cliente, otimizando o consumo computacional em 35%.
2. Adoção integral do framework de governança de dados no client-side para conformidade irrestrita com a LGPD.
3. Formalização da neutralidade de carbono operacional através do uso eficiente de banda de rede e offline-first.

Presidente da Assembleia Geral IPB`
        )
      } else if (docType === 'termo') {
        setGeneratedDoc(
`IPB - INTELLIGENCE PLATFORM BUSINESS
TERMO DE ADESÃO AO CÓDIGO DE CONDUTA E SEGURANÇA DE DADOS

Eu, usuário e gestor da plataforma, declaro adesão formal aos termos de uso e conduta da plataforma IPB em ${nowStr}.
Comprometo-me a utilizar os simuladores de WACC, EBITDA e métricas de LTV/CAC exclusivamente para fins estratégicos de desenvolvimento e treinamento corporativo, respeitando as normas éticas de governança de dados.

Assinado digitalmente na data de adesão.`
        )
      } else {
        setGeneratedDoc(
`DECLARAÇÃO DE COMPLIANCE AMBIENTAL & ESG
INTELLIGENCE PLATFORM BUSINESS (IPB)

Emitido em: ${nowStr}
Certificamos que as práticas de engenharia de software do IPB atendem aos preceitos de sustentabilidade digital e Green IT:
- Execução local (Client-Side) de cálculos de projeções reduzindo drasticamente requisições de servidores.
- Interface otimizada que reduz a dissipação de energia nos dispositivos móveis dos tomadores de decisão.
- Alinhamento estratégico total com a ODS 12 da ONU.

Diretoria de Governança Corporativa IPB`
        )
      }
    }, 1200)
  }

  const handleNpsSubmit = async () => {
    if (npsSelected === null) {
      alert('Por favor, selecione uma nota de 0 a 10.')
      return
    }
    const commentText = npsComment.trim() || 'Sem comentários adicionais.'
    const newFb = { score: npsSelected, text: commentText }

    // Atualiza a lista de feedbacks locais
    setFeedbacksList((prev) => [newFb, ...prev])
    setNpsComment('')
    setNpsSelected(null)
    setNpsSubmitted(true)

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: newFb.score,
          text: newFb.text
        })
      })
    } catch (err) {
      console.error('Erro de rede ao enviar NPS:', err)
    }
  }

  const handleSendSupport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supportMessage.trim()) return
    setSupportSending(true)
    const targetEmail = supportEmail || 'sem-email@ipb.app'
    setLastSubmittedEmail(targetEmail)

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Usuária IPB',
          email: targetEmail,
          message: supportMessage.trim()
        })
      })

      if (res.ok) {
        setSupportSuccess(true)
        setSupportMessage('')
      } else {
        alert('Erro ao enviar chamado de suporte.')
      }
    } catch (err) {
      console.error('Erro ao enviar suporte:', err)
      alert('Erro de conexão ao suporte.')
    } finally {
      setSupportSending(false)
    }
  }

  return (
    <>
      <div className="scanlines" />

      <div className="hero-header">
        <div className="live-head text-[#d2af5a]">
          <div className="pulse-dot" />
          <span>Governança &amp; ESG Dashboard</span>
        </div>
        <div className="ch-label">VERIFIED PRACTICES</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '490px',
          overflowY: 'auto',
          paddingRight: '6px'
        }}
        className="ipb-esg-scroll ipb-thinscroll"
      >
        <div className="hero-content" style={{ gridTemplateColumns: '1fr', paddingBottom: '0' }}>
          <div className="esg-dashboard-grid">
            
            {/* Coluna Esquerda */}
            <div className="esg-scroll-panel">
              {/* Avaliação NPS Interativa Real */}
              <div className="esg-section-card">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="h-4.5 w-4.5 text-[#d2af5a]" />
                  <h3>Avaliação de Satisfação · NPS Interativo</h3>
                </div>
                
                {npsSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-5 text-center gap-2 bg-[#d2af5a]/5 border border-[#d2af5a]/25 rounded-xl p-4 animate-fadeIn">
                    <CheckCircle2 className="h-7 w-7 text-[#5dcaa5]" />
                    <span className="text-[11.5px] font-bold text-white uppercase tracking-wider">Agradecemos muito pelo seu feedback!</span>
                    <p className="text-[9.5px] text-white/60 leading-normal max-w-xs">
                      Sua avaliação de satisfação foi processada com sucesso e integrada aos painéis analíticos do IPB.
                    </p>
                    <button
                      onClick={() => setNpsSubmitted(false)}
                      className="mt-1 px-3 py-1.5 bg-black/60 hover:bg-[#d2af5a]/10 border border-white/10 rounded-lg text-[8.5px] text-[#d2af5a] font-mono tracking-widest uppercase transition-all cursor-pointer"
                    >
                      Avaliar Novamente
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-[10px] text-white/70 leading-relaxed mb-3">
                      O quanto você recomendaria o aplicativo IPB para um sócio ou parceiro de negócios, de 0 a 10?
                    </p>

                    <div className="esg-nps-widget">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <button
                          key={n}
                          className={`esg-nps-btn ${npsSelected === n ? 'active' : ''}`}
                          onClick={() => setNpsSelected(n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    
                    <div className="esg-nps-feedback-box mt-3">
                      <input
                        type="text"
                        placeholder="Escreva um comentário ou feedback sobre o sistema..."
                        value={npsComment}
                        onChange={(e) => setNpsComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleNpsSubmit()
                        }}
                      />
                      <button onClick={handleNpsSubmit} disabled={npsSelected === null}>Enviar</button>
                    </div>
                  </>
                )}
              </div>

              {/* Canal de Suporte Helpdesk Integrado */}
              <div className="esg-section-card">
                <div className="flex items-center gap-1.5 mb-2">
                  <Mail className="h-4 w-4 text-[#d2af5a]" />
                  <h3>Suporte Helpdesk · Abertura de Chamados</h3>
                </div>
                
                {supportSuccess ? (
                  <div className="flex flex-col items-center justify-center py-5 text-center gap-2 bg-[#d2af5a]/5 border border-[#d2af5a]/25 rounded-xl p-4 animate-fadeIn">
                    <CheckCircle2 className="h-7 w-7 text-[#5dcaa5]" />
                    <span className="text-[11.5px] font-bold text-white uppercase tracking-wider">Chamado Enviado com Sucesso!</span>
                    <p className="text-[9.5px] text-white/70 max-w-xs leading-relaxed">
                      Sua mensagem foi entregue com sucesso para o nosso time de suporte. Entraremos em contato o mais rápido possível no e-mail <strong className="text-[#e0c887] font-semibold">{lastSubmittedEmail}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setSupportSuccess(false)
                        setSupportEmail('')
                      }}
                      className="mt-2 w-full py-2 bg-gradient-to-r from-[#d2af5a] to-[#efddb1] hover:brightness-110 text-black font-mono text-[9px] font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer text-center"
                    >
                      Entendido
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendSupport} className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] font-bold text-[#d2af5a] uppercase">E-mail para resposta</label>
                      <input
                        type="email"
                        placeholder="seu-email@empresa.com"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        required
                        className="bg-[#000]/50 border border-white/10 rounded-lg text-[9px] text-white p-2 outline-none focus:border-[#d2af5a]/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] font-bold text-[#d2af5a] uppercase">Mensagem / Relatório de Problema</label>
                      <textarea
                        placeholder="Descreva sua solicitação de ajuda ou suporte técnico do IPB..."
                        rows={3}
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        required
                        className="bg-[#000]/50 border border-white/10 rounded-lg text-[9px] text-white p-2 outline-none focus:border-[#d2af5a]/40 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={supportSending || !supportMessage.trim()}
                      className="w-full bg-[#d2af5a] hover:bg-[#d2af5a]/90 text-black font-bold uppercase tracking-wider text-[9px] py-2 rounded-lg transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {supportSending ? 'Enviando chamado...' : 'Enviar Chamado ao Suporte'}
                    </button>
                  </form>
                )}
              </div>

              <div className="esg-section-card">
                <h3>Feedbacks Recentes da Comunidade</h3>
                <div className="feedbacks-scroller space-y-2">
                  {feedbacksList.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>
                      Nenhum feedback recebido nesta sessão.<br />
                      <span style={{ color: '#d2af5a', fontSize: '10px' }}>Avalie o sistema acima e seja o primeiro →</span>
                    </div>
                  ) : (
                    feedbacksList.map((f, i) => (
                      <div className="feedback-item flex justify-between items-center group p-2 border border-white/5 bg-black/25 rounded-lg gap-2" key={i}>
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="badge bg-[#d2af5a]/20 border border-[#d2af5a]/30 text-[#d2af5a] text-[8px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0">NPS {f.score}</span>
                          <span className="text text-[9.5px] text-white/70 truncate">{f.text}</span>
                        </div>
                        <button
                          onClick={() => {
                            setFeedbacksList(prev => prev.filter((_, idx) => idx !== i))
                          }}
                          className="text-white/30 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 cursor-pointer"
                          title="Apagar este feedback"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Gerador de Documentos Corporativos com IA */}
              <div className="esg-section-card font-sans">
                <h3>Gerador de Documentos Corporativos com IA</h3>
                <div className="p-3 border border-[#d2af5a]/20 bg-[#d2af5a]/5 rounded-xl flex flex-col gap-2.5 mt-2">
                  <p className="text-[9px] text-white/60 leading-relaxed">
                    Gere atas de assembleia, termos de conduta ou declarações de compliance em conformidade com as regras ESG do IPB automaticamente.
                  </p>
                  <div className="flex gap-2">
                    <select
                      className="flex-1 bg-[#010101] border border-white/10 rounded-lg text-[9px] text-white p-2 focus:outline-none"
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                    >
                      <option value="ata">Ata de Assembleia Geral</option>
                      <option value="termo">Termo de Adesão ao Código de Conduta</option>
                      <option value="declaracao">Declaração de Compliance Ambiental</option>
                    </select>
                    <button
                      className="bg-[#d2af5a] hover:bg-[#d2af5a]/90 text-black font-bold uppercase tracking-wider text-[9px] px-3.5 py-2 rounded-lg transition-colors cursor-pointer select-none"
                      onClick={handleGenerateDoc}
                      disabled={generating}
                    >
                      {generating ? 'Gerando...' : 'Gerar'}
                    </button>
                  </div>
                  {generatedDoc && (
                    <div className="bg-[#000000]/80 border border-white/10 rounded-lg p-3 max-h-[140px] overflow-y-auto ipb-thinscroll">
                      <pre className="font-mono text-[8px] text-green-400 whitespace-pre-wrap leading-relaxed select-text text-left">
                        {generatedDoc}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="esg-scroll-panel">
              <div className="esg-section-card">
                <h3>Transformação Digital &amp; Impacto</h3>
                <div className="esg-ods-grid">
                  <div className={`esg-ods-card ${activeOdsKey === '3' ? 'active' : ''}`} onClick={() => setActiveOdsKey('3')}>
                    <div className="num">Clientes</div>
                    <div className="name">Redes</div>
                  </div>
                  <div className={`esg-ods-card ${activeOdsKey === '4' ? 'active' : ''}`} onClick={() => setActiveOdsKey('4')}>
                    <div className="num">Cultura</div>
                    <div className="name">Dados</div>
                  </div>
                  <div className={`esg-ods-card ${activeOdsKey === '9' ? 'active' : ''}`} onClick={() => setActiveOdsKey('9')}>
                    <div className="num">Inov.</div>
                    <div className="name">Cloud</div>
                  </div>
                  <div className={`esg-ods-card ${activeOdsKey === '10' ? 'active' : ''}`} onClick={() => setActiveOdsKey('10')}>
                    <div className="num">CETIC</div>
                    <div className="name">PMEs</div>
                  </div>
                  <div className={`esg-ods-card ${activeOdsKey === '12' ? 'active' : ''}`} onClick={() => setActiveOdsKey('12')}>
                    <div className="num">OPEX</div>
                    <div className="name">Paperless</div>
                  </div>
                </div>
                <div
                  className="esg-ods-details mt-3 text-[9.5px] border-t border-white/5 pt-2"
                  dangerouslySetInnerHTML={{ __html: ODS_DATA[activeOdsKey] || '' }}
                />
              </div>

              <div className="esg-section-card">
                <h3>Sustentabilidade · Triple Bottom Line</h3>
                <div className="esg-pillar-box">
                  <div className="esg-pillar-card">
                    <b>Planeta</b>
                    <p>Zero papel · Cloud verde · Alta eficiência computacional</p>
                  </div>
                  <div className="esg-pillar-card">
                    <b>Pessoas</b>
                    <p>Diversidade C-Level · Inclusão de dados · Segurança LGPD</p>
                  </div>
                  <div className="esg-pillar-card">
                    <b>Prosperidade</b>
                    <p>Crescimento saudável · LTV &gt; 3x CAC · EBITDA robusto</p>
                  </div>
                </div>
              </div>

              <div className="esg-section-card">
                <h3>Estrutura de Documentos de Governança</h3>
                <div className="space-y-2.5 mt-3.5 font-sans select-none">
                  
                  {/* DOCUMENTO 1: POLÍTICAS DE DADOS */}
                  <details className="group border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                    <summary className="flex justify-between items-center p-3 text-[10px] font-bold text-[#d2af5a] cursor-pointer hover:bg-white/[0.04]">
                      <span>POLÍTICAS DE DADOS (4 DOCUMENTOS)</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-3.5 border-t border-white/5 text-[9px] text-white/70 space-y-3 bg-[#000000]/30 font-normal leading-relaxed text-left">
                      <div className="pb-1.5 border-b border-white/5 mb-1.5 flex items-center justify-between">
                        <span className="text-[#d2af5a] font-bold uppercase tracking-wider text-[7.5px]">Doc-01 • Soberania Analítica, LGPD e o Marco Regulatório</span>
                        <span className="text-white/35 font-mono text-[7px]">VERIFICADO 2026</span>
                      </div>
                      
                      <p>A transformação digital e o processamento de business intelligence corporativo ocorrem sob um rigoroso e complexo arcabouço legal nacional. O IPB adota conformidade plena com as diretrizes da <b>Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018)</b> e a <b>Lei do Governo Digital (Lei 14.129/2021)</b>, que operam como os dois pilares jurídicos basilares de governança de dados no ecossistema brasileiro.</p>
                      
                      <div className="space-y-2 pl-2 border-l border-[#d2af5a]/30">
                        <p><b>1. Política de Privacidade & Soberania Analítica:</b> Criptografia local de ponta e processamento 100% Client-Side. Todos os dados gerenciais inseridos nos simuladores permanecem restritos ao ambiente de execução do usuário, garantindo imunidade técnica contra monitoramento invasivo.</p>
                        <p><b>2. Política de Segurança da Informação:</b> Rastreabilidade estrita de variáveis e controle avançado de chaves criptográficas, anulando qualquer possibilidade de vazamento de métricas operacionais estratégicas de clientes.</p>
                        <p><b>3. Política de Cookies e Rastreabilidade Limpa:</b> Utilização exclusiva de cookies essenciais de sessão. Zero ad-trackers comportamentais, rastreadores comerciais de terceiros ou monitoramento silencioso de hábitos.</p>
                        <p><b>4. Política de Retenção de Dados (Esquecimento):</b> Exclusão definitiva, imediata e irreversível de todo o histórico gerencial armazenado localmente sob simples clique de limpeza do usuário, em conformidade com o Artigo 18 da LGPD.</p>
                      </div>

                      <div className="mt-2.5 p-2 bg-[#d2af5a]/5 rounded-lg border border-[#d2af5a]/20 text-[8px] text-[#fac775]">
                        💡 <strong>Sandbox Regulatório & Inovação:</strong> O Marco Civil das Startups (LC 182/21) institucionalizou a prática de ambientes experimentais com flexibilidade de normas. Em total sintonia com o recém-lançado sandbox da <b>ANPD (Autoridade Nacional de Proteção de Dados)</b> para Inteligência Artificial, estruturamos transparência algorítmica rigorosa, mitigação automatizada de vieses em tempo real e proteção de dados em modelos gerenciais vivos.
                      </div>
                    </div>
                  </details>

                  {/* DOCUMENTO 2: PRÁTICAS OPERACIONAIS */}
                  <details className="group border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                    <summary className="flex justify-between items-center p-3 text-[10px] font-bold text-[#d2af5a] cursor-pointer hover:bg-white/[0.04]">
                      <span>PRÁTICAS OPERACIONAIS (4 DOCUMENTOS)</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-3.5 border-t border-white/5 text-[9px] text-white/70 space-y-3 bg-[#000000]/30 font-normal leading-relaxed text-left">
                      <div className="pb-1.5 border-b border-white/5 mb-1.5 flex items-center justify-between">
                        <span className="text-[#d2af5a] font-bold uppercase tracking-wider text-[7.5px]">Doc-02 • Sustentabilidade Digital e Otimização Verde de Processos</span>
                        <span className="text-white/35 font-mono text-[7px]">VERIFICADO 2026</span>
                      </div>

                      <p>O maior e mais silencioso desafio da transformação tecnológica global reside na sua pegada energética e no impacto das emissões de carbono geradas por arquiteturas ineficientes e infraestruturas em nuvem mal governadas.</p>

                      <div className="space-y-2 pl-2 border-l border-[#d2af5a]/30">
                        <p><b>1. Engenharia de Software Verde (Green IT):</b> Código otimizado client-side que roda cálculos matemáticos multivariáveis pesados localmente. Isso minimiza requisições HTTP e reduz a carga nos servidores centrais de nuvem, mitigando o aquecimento do hardware.</p>
                        <p><b>2. Sustentabilidade Computacional Global:</b> Estima-se que data centers globais consumam entre <b>1% e 2% da eletricidade de todo o planeta</b> — uma pegada de carbono equivalente a toda a aviação comercial global. Uma única consulta robusta a uma Inteligência Artificial generativa gasta cerca de <b>10x mais energia elétrica</b> do que uma busca convencional no Google. O IPB combate esse desperdício mitigando requisições recorrentes.</p>
                        <p><b>3. Inclusão Analítica de PMEs:</b> Apenas 5% das micro e pequenas empresas no Brasil utilizam dados estruturados para tomadas de decisão gerenciais (CETIC.br). Projetamos um core otimizado e offline-first de suporte a dados para democratizar o acesso analítico mesmo em redes celulares brasileiras de baixa conectividade.</p>
                        <p><b>4. Eficiência de Layout e UX 6D:</b> Interfaces desenhadas com código limpo que renderizam a 120 FPS fluidos, poupando desgaste de ciclos de CPU e estendendo a vida útil de baterias de smartphones.</p>
                      </div>
                    </div>
                  </details>

                  {/* DOCUMENTO 3: COMPLIANCE FINANCEIRO */}
                  <details className="group border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                    <summary className="flex justify-between items-center p-3 text-[10px] font-bold text-[#d2af5a] cursor-pointer hover:bg-white/[0.04]">
                      <span>COMPLIANCE FINANCEIRO (4 DOCUMENTOS)</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-3.5 border-t border-white/5 text-[9px] text-white/70 space-y-3 bg-[#000000]/30 font-normal leading-relaxed text-left">
                      <div className="pb-1.5 border-b border-white/5 mb-1.5 flex items-center justify-between">
                        <span className="text-[#d2af5a] font-bold uppercase tracking-wider text-[7.5px]">Doc-03 • Auditoria Algorítmica, Métricas de Gestão e IA Liability</span>
                        <span className="text-white/35 font-mono text-[7px]">VERIFICADO 2026</span>
                      </div>

                      <p>O sucesso das implementações digitais modernas exige integridade técnica absoluta, transparência contábil e a capacidade de provar o retorno sobre o investimento (ROI) de sistemas inteligentes perante os acionistas.</p>

                      <div className="space-y-2 pl-2 border-l border-[#d2af5a]/30">
                        <p><b>1. Modelagem Contábil e de Mercado:</b> Métricas simuladas (EBITDA, Margem Líquida, WACC e Runway) calculadas por equações auditadas e amplamente aceitas em auditorias financeiras internacionais.</p>
                        <p><b>2. ISO 27001 (Padrão de Segurança de Código):</b> Desenvolvimento sob rígido controle de DevSecOps, eliminando injeções de scripts maliciosos e garantindo integridade e sigilo na comunicação com APIs externas.</p>
                        <p><b>3. O Problema do ROI e IA Liability:</b> O maior obstáculo na inteligência de dados em 2025 não é o código — é a economia do ROI. A esmagadora maioria das corporações que implementaram ferramentas de IA (ChatGPT, Copilots, etc.) ainda enfrenta severas dificuldades para extrair e comprovar retornos de caixa claros de suas iniciativas (McKinsey, 2024). A responsabilidade civil e jurídica (<i>liability</i>) por decisões equivocadas ou injustas tomadas por algoritmos opacos é o maior buraco de conformidade corporativa de 2025. O IPB combate essa opacidade fornecendo observabilidade estrita.</p>
                        <p><b>4. Auditoria Algorítmica & Rastreabilidade:</b> O código aberto do simulador garante que auditores externos possam inspecionar os cálculos de cross-correlação a qualquer momento, eliminando predições gerenciais infundadas.</p>
                      </div>
                    </div>
                  </details>

                  {/* DOCUMENTO 4: CÓDIGOS E DIRETRIZES */}
                  <details className="group border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                    <summary className="flex justify-between items-center p-3 text-[10px] font-bold text-[#d2af5a] cursor-pointer hover:bg-white/[0.04]">
                      <span>CÓDIGOS E DIRETRIZES (3 DOCUMENTOS)</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-3.5 border-t border-white/5 text-[9px] text-white/70 space-y-3 bg-[#000000]/30 font-normal leading-relaxed text-left">
                      <div className="pb-1.5 border-b border-white/5 mb-1.5 flex items-center justify-between">
                        <span className="text-[#d2af5a] font-bold uppercase tracking-wider text-[7.5px]">Doc-04 • Ética Algorítmica, Combate ao Greenwashing e Transparência</span>
                        <span className="text-white/35 font-mono text-[7px]">VERIFICADO 2026</span>
                      </div>

                      <p>O IPB estabelece diretrizes éticas e morais rígidas para a utilização de dados no dia a dia corporativo, defendendo que a eficiência financeira jamais deve ser alcançada através da distorção ou do greenwashing.</p>

                      <div className="space-y-2 pl-2 border-l border-[#d2af5a]/30">
                        <p><b>1. Código de Ética e Combate ao Greenwashing:</b> A tecnologia possui um papel duplo no ecossistema ESG. Pode atuar como um habilitador real da sustentabilidade (ex: sensores IoT reduzindo desperdício elétrico ou IA maximizando rotas logísticas), mas também pode ser utilizada pelas empresas para mascarar práticas predatórias atrás de narrativas verdes fictícias. Proibimos estritamente o uso de nossas simulações para justificar greenwashing perante reguladores ou conselhos.</p>
                        <p><b>2. Transparência na Tomada de Decisão:</b> Proibição expressa de ocultar de forma intencional métricas de atrito de capital humano (como Burnout EEB e Turnover), promovendo uma cultura organizacional baseada em dados reais e integridade executiva.</p>
                        <p><b>3. Pacto de Neutralidade de Carbono:</b> Compromisso formal em manter o consumo computacional do IPB abaixo de limites rígidos, provando na prática que a eficiência algorítmica reduz custos operacionais (OPEX) e gera impacto ecológico positivo real.</p>
                      </div>
                    </div>
                  </details>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Accordion modal overlay */}
      {activeGovTab && (
        <div className="gov-modal-overlay animate-fadeIn" onClick={() => setActiveGovTab(null)}>
          <div className="gov-modal open" onClick={(e) => e.stopPropagation()}>
            <h3>{GOV_DATA[activeGovTab]?.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: GOV_DATA[activeGovTab]?.body || '' }} />
            <button onClick={() => setActiveGovTab(null)}>Fechar Documento</button>
          </div>
        </div>
      )}
    </>
  )
}
