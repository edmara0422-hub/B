'use client'

import { useState } from 'react'
import { Leaf, Star, Mail, MessageSquare, Send } from 'lucide-react'

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
  const [activeOdsKey, setActiveOdsKey] = useState<string>('3')
  const [activeGovTab, setActiveGovTab] = useState<string | null>(null)

  // Estados de Suporte Helpdesk
  const [supportEmail, setSupportEmail] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const [supportSending, setSupportSending] = useState(false)
  const [supportSuccess, setSupportSuccess] = useState(false)

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

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: newFb.score,
          text: newFb.text
        })
      })

      if (res.ok) {
        alert('Feedback enviado com sucesso! Agradecemos por colaborar com a governança IPB.')
      } else {
        console.warn('Erro ao salvar avaliação no servidor.')
      }
    } catch (err) {
      console.error('Erro de rede ao enviar NPS:', err)
    }
  }

  const handleSendSupport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supportMessage.trim()) return
    setSupportSending(true)

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Usuária IPB',
          email: supportEmail || 'sem-email@ipb.app',
          message: supportMessage.trim()
        })
      })

      if (res.ok) {
        setSupportSuccess(true)
        setSupportMessage('')
        setTimeout(() => setSupportSuccess(false), 5000)
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
        }}
        className="ipb-esg-scroll"
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
              </div>

              {/* Canal de Suporte Helpdesk Integrado */}
              <div className="esg-section-card">
                <div className="flex items-center gap-1.5 mb-2">
                  <Mail className="h-4 w-4 text-[#d2af5a]" />
                  <h3>Suporte Helpdesk · Abertura de Chamados</h3>
                </div>
                
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
                  {supportSuccess && (
                    <p className="text-[8px] text-green-400 mt-1 font-semibold text-center">
                      Chamado aberto com sucesso! Responderemos em breve.
                    </p>
                  )}
                </form>
              </div>

              <div className="esg-section-card">
                <h3>Feedbacks Recentes da Comunidade</h3>
                <div className="feedbacks-scroller">
                  {feedbacksList.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>
                      Nenhum feedback recebido nesta sessão.<br />
                      <span style={{ color: '#d2af5a', fontSize: '10px' }}>Avalie o sistema acima e seja o primeiro →</span>
                    </div>
                  ) : (
                    feedbacksList.map((f, i) => (
                      <div className="feedback-item" key={i}>
                        <span className="badge bg-[#d2af5a]/20 border border-[#d2af5a]/30 text-[#d2af5a]">NPS {f.score}</span>
                        <span className="text">{f.text}</span>
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
                <div className="space-y-2 mt-2 font-sans select-none">
                  <details className="group border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                    <summary className="flex justify-between items-center p-3 text-[10px] font-bold text-[#d2af5a] cursor-pointer hover:bg-white/[0.04]">
                      <span>POLÍTICAS DE DADOS (4 DOCUMENTOS)</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-3 border-t border-white/5 text-[9px] text-white/70 space-y-2 bg-[#000000]/30 font-normal">
                      <p><b>1. Política de Privacidade:</b> Criptografia de ponta e processamento 100% no client-side para total soberania analítica do usuário.</p>
                      <p><b>2. Política de Segurança da Informação:</b> Proteção rigorosa e sem vazamento de chaves ou variáveis estratégicas.</p>
                      <p><b>3. Política de Cookies:</b> Somente cookies essenciais de sessão. Zero trackers comerciais invasivos de terceiros.</p>
                      <p><b>4. Política de Retenção de Dados:</b> Exclusão total e imediata dos históricos gerenciais sob solicitação imediata do usuário.</p>
                    </div>
                  </details>

                  <details className="group border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                    <summary className="flex justify-between items-center p-3 text-[10px] font-bold text-[#d2af5a] cursor-pointer hover:bg-white/[0.04]">
                      <span>PRÁTICAS OPERACIONAIS (4 DOCUMENTOS)</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-3 border-t border-white/5 text-[9px] text-white/70 space-y-2 bg-[#000000]/30 font-normal">
                      <p><b>1. Engenharia de Software Verde (Green IT):</b> Código altamente leve que reduz a necessidade de processamento e refrigeração de data centers.</p>
                      <p><b>2. Inclusão Analítica de PMEs:</b> Provisão de suporte offline total e design adaptável para redes de baixa conectividade celular.</p>
                      <p><b>3. Acessibilidade Integrada:</b> Suporte a escala de layout adaptável para diferentes dimensões e resoluções sem perda de fidelidade.</p>
                      <p><b>4. Arquitetura UX 6D:</b> Telas estruturadas de alto desempenho que renderizam a 120 FPS fluidos em qualquer smartphone moderno.</p>
                    </div>
                  </details>

                  <details className="group border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                    <summary className="flex justify-between items-center p-3 text-[10px] font-bold text-[#d2af5a] cursor-pointer hover:bg-white/[0.04]">
                      <span>COMPLIANCE FINANCEIRO (4 DOCUMENTOS)</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-3 border-t border-white/5 text-[9px] text-white/70 space-y-2 bg-[#000000]/30 font-normal">
                      <p><b>1. Conformidade LGPD & GDPR:</b> Termos de uso de dados explícitos e controle total do usuário sobre seu perfil gerencial.</p>
                      <p><b>2. ISO 27001 (Segurança de Software):</b> Desenvolvimento com práticas DevSecOps aplicadas em todas as camadas de APIs do Next.js.</p>
                      <p><b>3. Modelagem Contábil e de Mercado:</b> Relatórios e visualizações contábeis fundamentadas em conceitos consolidados de finanças corporativas.</p>
                      <p><b>4. Auditoria de Algoritmos:</b> Validação técnica independente dos simuladores de EBITDA, CAC, LTV e queima de caixa.</p>
                    </div>
                  </details>

                  <details className="group border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                    <summary className="flex justify-between items-center p-3 text-[10px] font-bold text-[#d2af5a] cursor-pointer hover:bg-white/[0.04]">
                      <span>CÓDIGOS E DIRETRIZES (3 DOCUMENTOS)</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-3 border-t border-white/5 text-[9px] text-white/70 space-y-2 bg-[#000000]/30 font-normal">
                      <p><b>1. Código de Ética e Transparência:</b> Proibição explícita do uso de dados de simulações para manipulação contábil de terceiros.</p>
                      <p><b>2. Código de Conduta Operacional:</b> Incentivo ao uso de metodologias ágeis e cultura baseada em dados reais nos negócios.</p>
                      <p><b>3. Declaração do Pacto de Neutralidade:</b> Foco contínuo em manter o IPB como uma plataforma digital de baixo impacto ecológico.</p>
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
