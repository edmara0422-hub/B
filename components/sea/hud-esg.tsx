'use client'

import { useState } from 'react'
import { Leaf } from 'lucide-react'

// ODS Descriptions from Mockup
const ODS_DATA: Record<string, string> = {
  '3': '<b>ODS 3 — Saúde e Bem-Estar:</b> Garantir o acesso à saúde de qualidade e promover o bem-estar. Reduzindo complicações e tempo de VM na UTI.',
  '4': '<b>ODS 4 — Educação de Qualidade:</b> Oferecer simulações baseadas em evidências com feedbacks práticos para capacitação acelerada.',
  '9': '<b>ODS 9 — Indústria, Inovação e Infraestrutura:</b> Arquitetura digital sustentável e de baixo consumo energético via simulação 3D.',
  '10': '<b>ODS 10 — Redução das Desigualdades:</b> Suporte offline e baixo consumo de dados móveis democratizam o aprendizado.',
  '12': '<b>ODS 12 — Consumo Responsável:</b> Digital-first real. Zero papel e uso otimizado de processamento em nuvem reduzindo pegada de carbono.'
}

// Governance Data from Mockup (adjusted references from SEA to IPB)
const GOV_DATA: Record<string, { title: string; body: string }> = {
  'politicas': {
    title: 'Políticas de Privacidade',
    body: 'Nossa política de proteção de dados segue estritamente a LGPD. Não coletamos dados de pacientes nas simulações clínicas. Todo o processamento dos sinais de ventilação, ECG e EEG é executado localmente na sua máquina (Client-Side), garantindo total soberania de dados.'
  },
  'praticas': {
    title: 'Práticas de Desenvolvimento',
    body: 'Adotamos engenharia de software sustentável. Nossos algoritmos utilizam modelos matemáticos baseados em equações fisiológicas puras em JavaScript em vez de rodar inteligência artificial pesada em servidores de GPU. Menos requisições de rede = menor consumo de energia.'
  },
  'compliance': {
    title: 'Compliance & Auditoria',
    body: 'O IPB atende aos mais rígidos padrões éticos internacionais de simulação clínica educacional. Não realizamos diagnósticos médicos em tempo real; todas as ferramentas são simuladores didáticos auditados por colegiados acadêmicos.'
  },
  'termos': {
    title: 'Termos de Uso',
    body: 'Os simuladores do IPB são licenciados exclusivamente para uso educacional e treinamento clínico supervisionado. Ao utilizar o software, você concorda que o aprendizado gerado serve para aprimoramento profissional e não substitui avaliações clínicas in loco.'
  },
  'cookies': {
    title: 'Políticas de Cookies',
    body: 'Utilizamos apenas cookies estritamente necessários para manter sua sessão ativa de progresso. Sem cookies de rastreamento de terceiros ou anúncios invasivos. Privacidade plena por padrão.'
  },
  'missao': {
    title: 'Missão e Valores',
    body: 'Nossa missão é salvar vidas por meio de um treinamento clínico de excelência, inclusivo e digital-first. Capacitar o profissional da ponta diminui o tempo de internação nas UTIs, criando um impacto social e econômico virtuoso.'
  },
  'dpo': {
    title: 'Data Protection Officer (DPO)',
    body: 'Para esclarecimentos sobre a privacidade e exclusão permanente de dados de sua conta de estudante, entre em contato diretamente com o nosso DPO pelo e-mail: <b>dpo@ipb.com.br</b>.'
  }
}

export function MiniEsg() {
  return (
    <>
      <div className="header-esg">
        <div className="seal">✦</div>
        <div>
          <span>Compliance &amp; ESG</span>
          <b>Sustentabilidade <em>&amp; Gov</em></b>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', margin: '12px 0' }}>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', padding: '10px', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}>
          Nenhuma avaliação ainda<br />
          <span style={{ color: '#d4b87a', fontSize: '9px' }}>Seja o primeiro a avaliar →</span>
        </div>
      </div>
      <div className="ods-row">
        <span><b>03</b>Saúde</span>
        <span><b>04</b>Educ.</span>
        <span><b>09</b>Inov.</span>
      </div>
      <div className="features-strip">
        <div className="feat-pill gold"><div className="d" />Offline-First</div>
        <div className="feat-pill gold"><div className="d" />Pegada digital</div>
      </div>
    </>
  )
}

export function HudEsg() {
  const [npsSelected, setNpsSelected] = useState<number | null>(null)
  const [npsComment, setNpsComment] = useState('')
  const [feedbacksList, setFeedbacksList] = useState<{ score: number; text: string }[]>([])
  const [activeOdsKey, setActiveOdsKey] = useState<string>('3')
  const [activeGovTab, setActiveGovTab] = useState<string | null>(null)

  const handleNpsSubmit = () => {
    if (npsSelected === null) {
      alert('Por favor, selecione uma nota de 0 a 10.')
      return
    }
    const commentText = npsComment.trim() || 'Sem comentários adicionais.'
    setFeedbacksList((prev) => [
      { score: npsSelected, text: commentText },
      ...prev
    ])
    setNpsComment('')
    alert('Feedback enviado com sucesso! Obrigado pela colaboração com a governança IPB.')
  }

  return (
    <>
      <div className="scanlines" />

      <div className="hero-header">
        <div className="live-head text-[#d4b87a]">
          <div className="pulse-dot" />
          <span>Sustentabilidade &amp; ESG Dashboard</span>
        </div>
        <div className="ch-label">VERIFIED PRACTICES</div>
      </div>

      <div className="hero-content" style={{ gridTemplateColumns: '1fr', paddingBottom: '12px' }}>
        <div className="esg-dashboard-grid">
          
          {/* Coluna Esquerda */}
          <div className="esg-scroll-panel">
            <div className="esg-section-card">
              <h3>Avaliação de Satisfação · NPS Interativo</h3>
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
              <div className="esg-nps-feedback-box">
                <input
                  type="text"
                  placeholder="Escreva um comentário ou feedback sobre o sistema..."
                  value={npsComment}
                  onChange={(e) => setNpsComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNpsSubmit()
                  }}
                />
                <button onClick={handleNpsSubmit}>Enviar</button>
              </div>
            </div>

            <div className="esg-section-card">
              <h3>Feedbacks Recentes da Comunidade</h3>
              <div className="feedbacks-scroller">
                {feedbacksList.length === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>
                    Nenhum feedback ainda.<br />
                    <span style={{ color: '#d4b87a', fontSize: '10px' }}>Avalie o sistema acima e seja o primeiro →</span>
                  </div>
                ) : (
                  feedbacksList.map((f, i) => (
                    <div className="feedback-item" key={i}>
                      <span className="badge">NPS {f.score}</span>
                      <span className="text">{f.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="esg-section-card">
              <h3>Sustentabilidade · Triple Bottom Line</h3>
              <div className="esg-pillar-box">
                <div className="esg-pillar-card">
                  <b>Planeta</b>
                  <p>Zero papel · Digital-first · Eco-eficiência</p>
                </div>
                <div className="esg-pillar-card">
                  <b>Pessoas</b>
                  <p>Treinamento seguro = paciente a salvo</p>
                </div>
                <div className="esg-pillar-card">
                  <b>Prosperidade</b>
                  <p>Menos tempo em VM = menor custo hospitalar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="esg-scroll-panel">
            <div className="esg-section-card">
              <h3>ODS — clique para ver a evidência científica</h3>
              <div className="esg-ods-grid">
                <div className={`esg-ods-card ${activeOdsKey === '3' ? 'active' : ''}`} onClick={() => setActiveOdsKey('3')}>
                  <div className="num">03</div>
                  <div className="name">Saúde</div>
                </div>
                <div className={`esg-ods-card ${activeOdsKey === '4' ? 'active' : ''}`} onClick={() => setActiveOdsKey('4')}>
                  <div className="num">04</div>
                  <div className="name">Educ.</div>
                </div>
                <div className={`esg-ods-card ${activeOdsKey === '9' ? 'active' : ''}`} onClick={() => setActiveOdsKey('9')}>
                  <div className="num">09</div>
                  <div className="name">Inov.</div>
                </div>
                <div className={`esg-ods-card ${activeOdsKey === '10' ? 'active' : ''}`} onClick={() => setActiveOdsKey('10')}>
                  <div className="num">10</div>
                  <div className="name">Igual.</div>
                </div>
                <div className={`esg-ods-card ${activeOdsKey === '12' ? 'active' : ''}`} onClick={() => setActiveOdsKey('12')}>
                  <div className="num">12</div>
                  <div className="name">Consumo</div>
                </div>
              </div>
              <div
                className="esg-ods-details"
                dangerouslySetInnerHTML={{ __html: ODS_DATA[activeOdsKey] || '' }}
              />
            </div>

            <div className="esg-section-card">
              <h3>Governança Corporativa corporativa · clique para ler</h3>
              <div className="esg-gov-accordion">
                <div className={`esg-gov-tab ${activeGovTab === 'politicas' ? 'active' : ''}`} onClick={() => setActiveGovTab('politicas')}>
                  Políticas de Privacidade <span className="indicator"></span>
                </div>
                <div className={`esg-gov-tab ${activeGovTab === 'praticas' ? 'active' : ''}`} onClick={() => setActiveGovTab('praticas')}>
                  Práticas de Dev <span className="indicator"></span>
                </div>
                <div className={`esg-gov-tab ${activeGovTab === 'compliance' ? 'active' : ''}`} onClick={() => setActiveGovTab('compliance')}>
                  Compliance <span className="indicator"></span>
                </div>
                <div className={`esg-gov-tab ${activeGovTab === 'termos' ? 'active' : ''}`} onClick={() => setActiveGovTab('termos')}>
                  Termos de Uso <span className="indicator"></span>
                </div>
                <div className={`esg-gov-tab ${activeGovTab === 'cookies' ? 'active' : ''}`} onClick={() => setActiveGovTab('cookies')}>
                  Cookies <span className="indicator"></span>
                </div>
                <div className={`esg-gov-tab ${activeGovTab === 'missao' ? 'active' : ''}`} onClick={() => setActiveGovTab('missao')}>
                  Missão e Valores <span className="indicator"></span>
                </div>
                <div className={`esg-gov-tab ${activeGovTab === 'dpo' ? 'active' : ''}`} style={{ gridColumn: 'span 2' }} onClick={() => setActiveGovTab('dpo')}>
                  DPO e Proteção de Dados <span className="indicator"></span>
                </div>
              </div>
            </div>

            <div className="esg-section-card">
              <h3>Sustentabilidade Digital &amp; ESG</h3>
              <div className="esg-digital-grid">
                <div className="esg-digital-card">
                  <b>Offline-First como escolha ESG</b>
                  <p>Menos requisições de rede reduzem drasticamente as pegadas de CO₂ dos servidores.</p>
                </div>
                <div className="esg-digital-card">
                  <b>Código Limpo &amp; Eco-eficiente</b>
                  <p>Fórmulas clínicas puras client-side economizam processamento de nuvem.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="hero-footer" style={{ padding: '14px 20px' }}>
        <div className="title-group">
          <span className="area">Compliance &amp; Triple Bottom Line</span>
          <h2>Sustentabilidade &amp; ESG</h2>
          <p>Governança corporativa transparente e impacto ambiental otimizado. Práticas alinhadas aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU.</p>
        </div>
        <div className="action-group">
          <button className="btn-enter-scene">✦ Entrar na cena</button>
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
