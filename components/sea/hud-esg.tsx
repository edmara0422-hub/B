'use client'

import { useState } from 'react'
import { Leaf, Shield, Heart, Scale } from 'lucide-react'

export function MiniEsg() {
  return (
    <div className="mini-esg-card">
      <div className="header-esg">
        <div className="seal"><Leaf size={20} /></div>
        <div>
          <span>Relatório Aberto</span>
          <b>Governança <em>&</em> ESG</b>
        </div>
      </div>
      <div className="nps-row">
        <div className="nps-box"><div className="val gold">98</div><div className="lbl">NPS Score</div></div>
        <div className="nps-box"><div className="val">1.2k</div><div className="lbl">Avaliações</div></div>
        <div className="nps-box"><div className="val">340</div><div className="lbl">Feedbacks</div></div>
      </div>
      <div className="ods-row">
        <span><b>3</b> Saúde</span>
        <span><b>4</b> Educação</span>
        <span><b>9</b> Inovação</span>
        <span><b>10</b> Desigualdade</span>
      </div>
      <div className="features-strip">
        <div className="feat-pill"><div className="d" /> Privacidade</div>
        <div className="feat-pill gold"><div className="d" /> Transparência</div>
      </div>
    </div>
  )
}

export function HudEsg() {
  const [activeTab, setActiveTab] = useState('gov')

  return (
    <>
      <div className="scanlines" />

      <div className="hero-header">
        <div className="live-head text-[#d4b87a]">
          <div className="pulse-dot" />
          <span>Portal de Transparência</span>
        </div>
        <div className="ch-label">ESG-01</div>
      </div>

      <div className="hero-content">
        <div className="esg-dashboard-grid">
          {/* Coluna Esquerda: ESG & ODS */}
          <div className="esg-scroll-panel">
            <div className="esg-dashboard-header mb-2">
              <div className="seal-big"><Leaf size={24} /></div>
              <div>
                <span className="text-[11px] text-white/50 uppercase tracking-widest">Compromisso Global</span>
                <b className="text-xl text-white font-semibold">Impacto <em className="text-[#e8cc88] not-italic">Socioambiental</em></b>
              </div>
            </div>

            <div className="esg-section-card">
              <h3>Triple Bottom Line (TBL)</h3>
              <div className="esg-pillar-box">
                <div className="esg-pillar-card">
                  <b>Planeta</b>
                  <p>Digital-first, offline mode e zero papel na UTI.</p>
                </div>
                <div className="esg-pillar-card">
                  <b>Pessoas</b>
                  <p>Inclusão, diversidade e acessibilidade clínica.</p>
                </div>
                <div className="esg-pillar-card">
                  <b>Prosperidade</b>
                  <p>Menos tempo VM = menos custo. Valor compartilhado.</p>
                </div>
              </div>
            </div>

            <div className="esg-section-card">
              <h3>Sustentabilidade Digital</h3>
              <div className="esg-digital-grid">
                <div className="esg-digital-card">
                  <b>Offline-First</b>
                  <p>Menos requisições ao servidor reduz o consumo de energia de datacenters.</p>
                </div>
                <div className="esg-digital-card">
                  <b>Eco-eficiência</b>
                  <p>Código otimizado e bundling inteligente reduzem a pegada de carbono digital.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Governança & NPS */}
          <div className="esg-scroll-panel pl-2 border-l border-white/5">
            <div className="esg-section-card mb-3">
              <h3>Governança Corporativa</h3>
              <div className="esg-gov-accordion">
                <div className="esg-gov-tab active"><div className="indicator" /> Políticas Internas</div>
                <div className="esg-gov-tab"><div className="indicator" /> Práticas Clínicas</div>
                <div className="esg-gov-tab"><div className="indicator" /> Compliance & Ética</div>
                <div className="esg-gov-tab"><div className="indicator" /> LGPD & Privacidade</div>
                <div className="esg-gov-tab"><div className="indicator" /> Termos de Uso</div>
                <div className="esg-gov-tab"><div className="indicator" /> Canal de Denúncias</div>
              </div>
            </div>

            <div className="esg-section-card flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3>NPS & Satisfação</h3>
                <span className="text-[10px] text-[#e8cc88] font-bold px-2 py-1 bg-[#e8cc88]/10 rounded-md">SCORE: 98</span>
              </div>
              <p className="text-[11px] text-white/50 mb-2">Avalie sua experiência com a plataforma SEA Fisio</p>
              <div className="esg-nps-widget">
                {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button key={n} className={`esg-nps-btn ${n === 10 ? 'active' : ''}`}>{n}</button>
                ))}
              </div>
              <div className="esg-nps-feedback-box mt-3">
                <input type="text" placeholder="Deixe um feedback construtivo ou denúncia (anônimo)..." />
                <button>Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
