'use client'

import React, { useState, useEffect } from 'react'

type EsgDimension = 'E' | 'S' | 'G'

type Question = {
  id: string
  tag: string
  dim: EsgDimension
  text: string
  options: { label: string; value: number }[]
}

export function SigEsgPanel() {
  const [activeSubTab, setActiveSubTab] = useState<'diagnostico' | 'frameworks'>('diagnostico')

  const [answers, setAnswers] = useState<Record<string, number>>({
    q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0
  })

  const [scoreE, setScoreE] = useState(0)
  const [scoreS, setScoreS] = useState(0)
  const [scoreG, setScoreG] = useState(0)
  const [overallScore, setOverallScore] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [iaRecommendation, setIaRecommendation] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const questions: Question[] = [
    {
      id: 'q1',
      tag: 'ENV · Q1',
      dim: 'E',
      text: 'Sua operação gera resíduos, emissões ou consome recursos naturais?',
      options: [
        { label: 'Gera muito (indústria, produção)', value: 10 },
        { label: 'Gera pouco (escritório, digital)', value: 80 },
        { label: 'Não sei mensurar', value: 0 }
      ]
    },
    {
      id: 'q2',
      tag: 'ENV · Q2',
      dim: 'E',
      text: 'Usa energia renovável ou tem meta de redução de carbono?',
      options: [
        { label: 'Sim, temos metas e energia limpa', value: 100 },
        { label: 'Parcialmente', value: 50 },
        { label: 'Não, nunca pensei nisso', value: 0 }
      ]
    },
    {
      id: 'q3',
      tag: 'SOC · Q3',
      dim: 'S',
      text: 'Como trata diversidade, inclusão e gap salarial?',
      options: [
        { label: 'Temos política formal e métricas', value: 100 },
        { label: 'Fazemos informalmente', value: 50 },
        { label: 'Não temos nada', value: 0 }
      ]
    },
    {
      id: 'q4',
      tag: 'SOC · Q4',
      dim: 'S',
      text: 'Investe na comunidade ao redor (educação, saúde, cultura)?',
      options: [
        { label: 'Sim, com orçamento definido (ISP)', value: 100 },
        { label: 'Ações pontuais', value: 40 },
        { label: 'Não', value: 0 }
      ]
    },
    {
      id: 'q5',
      tag: 'GOV · Q5',
      dim: 'G',
      text: 'Tem canal de denúncias, auditoria e conselho consultivo/admin?',
      options: [
        { label: 'Sim, estrutura completa', value: 100 },
        { label: 'Apenas canal de denúncias', value: 50 },
        { label: 'Nenhum', value: 0 }
      ]
    },
    {
      id: 'q6',
      tag: 'GOV · Q6',
      dim: 'G',
      text: 'Possui código de ética e política anticorrupção treinados?',
      options: [
        { label: 'Documentado e com treinamento anual', value: 100 },
        { label: 'Temos o documento, mas sem treino', value: 50 },
        { label: 'Não possuímos', value: 0 }
      ]
    },
    {
      id: 'q7',
      tag: 'STRAT · Q7',
      dim: 'G',
      text: 'Sua cadeia de fornecedores passa por due diligence ASG?',
      options: [
        { label: 'Auditamos rigorosamente', value: 100 },
        { label: 'Avaliamos informalmente', value: 40 },
        { label: 'Apenas preço e prazo importam', value: 0 }
      ]
    },
    {
      id: 'q8',
      tag: 'STRAT · Q8',
      dim: 'G',
      text: 'Existe matriz de materialidade definindo os riscos do negócio?',
      options: [
        { label: 'Sim, atualizada com stakeholders', value: 100 },
        { label: 'Temos noção interna de risco', value: 50 },
        { label: 'Não sei o que é isso', value: 0 }
      ]
    },
    {
      id: 'q9',
      tag: 'MKT · Q9',
      dim: 'S',
      text: 'Como é a transparência sobre composição/origem do produto?',
      options: [
        { label: 'Rastreabilidade total e clara', value: 100 },
        { label: 'Rótulos básicos legais', value: 60 },
        { label: 'Não comunicamos isso', value: 0 }
      ]
    },
    {
      id: 'q10',
      tag: 'MKT · Q10',
      dim: 'E',
      text: 'O modelo de negócio resolve intencionalmente um problema socioambiental?',
      options: [
        { label: 'Sim, somos um negócio de impacto (Core)', value: 100 },
        { label: 'É um efeito colateral positivo', value: 30 },
        { label: 'Apenas lucro tradicional', value: 0 }
      ]
    }
  ]

  useEffect(() => {
    // Calculate ESG Scores
    const answersList = Object.entries(answers)
    const activeAnswers = answersList.filter(([_, val]) => val !== undefined)
    setAnsweredCount(activeAnswers.filter(([_, val]) => val > 0 || val === 10 || val === 0).length)

    // Group by dimension
    const eVals = questions.filter(q => q.dim === 'E').map(q => answers[q.id] || 0)
    const sVals = questions.filter(q => q.dim === 'S').map(q => answers[q.id] || 0)
    const gVals = questions.filter(q => q.dim === 'G').map(q => answers[q.id] || 0)

    const avg = (vals: number[]) => Math.round(vals.reduce((acc, curr) => acc + curr, 0) / vals.length)

    const scoreEComputed = avg(eVals)
    const scoreSComputed = avg(sVals)
    const scoreGComputed = avg(gVals)

    setScoreE(scoreEComputed)
    setScoreS(scoreSComputed)
    setScoreG(scoreGComputed)
    setOverallScore(Math.round((scoreEComputed + scoreSComputed + scoreGComputed) / 3))
  }, [answers])

  function handleSelectChange(qId: string, value: number) {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }

  function handleAnalyze() {
    setAnalyzing(true)
    setTimeout(() => {
      let recText = `🌱 <b>Análise Diagnóstica do IPBA ESG Advisor:</b> O seu score geral consolidado é de <b>${overallScore}/100</b>.`
      if (overallScore < 40) {
        recText += ` Sua operação está em nível de <b>Alta Exposição a Riscos Regulatórios e Reputacionais</b>. A falta de um canal de denúncias estruturado e de auditorias de cadeia de valor abre passivos consideráveis. Priorize criar um código de conduta básica e homologar o Canal de Denúncias no portal.`
      } else if (overallScore < 70) {
        recText += ` Você possui uma base informal estruturada (nível <b>Mapeado/Parcial</b>). O seu principal gargalo está no pilar <b>${scoreE < scoreS && scoreE < scoreG ? 'Ambiental' : scoreS < scoreG ? 'Social' : 'Governança'}</b>. Recomenda-se integrar metas de redução de carbono ativas e formalizar auditorias de due diligence com fornecedores críticos.`
      } else {
        recText += ` Excelente maturidade regulatória e aderência aos frameworks de impacto (nível <b>Excelente/Conforme</b>). Você se destaca em sustentabilidade digital e governança transparente. O próximo passo é obter certificações formais como Sistema B e reportar sob a estrutura GRI.`
      }
      setIaRecommendation(recText)
      setAnalyzing(false)
    }, 1000)
  }

  // Circular gauge math for 36x36 viewBox (r=15.9155 gives circum = 100)
  const circum = 100
  const offsetE = circum - (scoreE / 100) * circum
  const offsetS = circum - (scoreS / 100) * circum
  const offsetG = circum - (scoreG / 100) * circum

  return (
    <div className="w-full">
      <style>{`
        .dash-card-esg {
          background: rgba(5, 5, 5, 0.45) !important;
          backdrop-filter: blur(28px) saturate(130%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
          border: none !important;
          border-radius: 14px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(0, 0, 0, 0.85),
            0 12px 40px rgba(0, 0, 0, 0.55) !important;
          transition: all .3s cubic-bezier(.22,.61,.36,1);
        }
        .dash-card-esg::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(90deg, #cbd5e1 0%, #c9943a 100%) !important;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .sec-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 24px; gap: 20px }
        .sec-head .lhs { display: flex; flex-direction: column; gap: 5px }
        .sec-id { display: flex; align-items: center; gap: 12px }
        .sec-id .num {
          font-family: monospace; font-size: 9.5px; letter-spacing: .1em; color: #c9943a; font-weight: 500;
          border: 0.2px solid rgba(255, 255, 255, 0.08); padding: 3px 9px; border-radius: 4px; background: rgba(218,165,32,.04);
        }
        .sec-id .tag { font-family: monospace; font-size: 10px; letter-spacing: .1em; color: #8a9098; text-transform: uppercase }
        .sec-h {
          font-family: inherit; font-size: 22px; letter-spacing: -.02em;
          font-weight: 300; line-height: 1.2; color: #fff;
          margin-top: 4px; margin-bottom: 0;
        }
        .sec-h .em {
          background: linear-gradient(135deg, #b8975a 0%, #c9943a 28%, #e8cc88 50%, #c9943a 72%, #b8975a 100%);
          background-clip: text; -webkit-background-clip: text;
          color: transparent; -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
        .sec-sub { font-size: 11.5px; color: #8a9098; margin-top: 4px; font-weight: 200 }
        .sec-meta { display: flex; flex-direction: column; gap: 4px; font-family: monospace; font-size: 10px; letter-spacing: .04em; color: #8a9098; text-align: right }
        .sec-meta b { color: #fff; font-weight: 600 }

        .esg-rings-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 25px;
        }
        .esg-ring-item {
          background: rgba(255, 255, 255, 0.01);
          border: 0.2px solid rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .esg-ring-item:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(201, 148, 58, 0.15);
        }
        .esg-ring-svg {
          width: 60px;
          height: 60px;
          position: relative;
        }
        .esg-ring-item b {
          font-size: 11px;
          color: #fff;
          font-weight: 500;
        }
        .esg-ring-item span {
          font-family: monospace;
          font-size: 13px;
          font-weight: bold;
          color: #c9943a;
        }

        .sub-tab-btn {
          font-family: inherit; font-size: 11px; letter-spacing: .03em;
          color: #8a9098; background: transparent; border: none;
          padding: 6px 16px; border-radius: 6px; cursor: pointer;
          transition: all .2s ease-in-out;
        }
        .sub-tab-btn.active {
          background: rgba(201, 148, 58, 0.1) !important;
          border: 0.2px solid rgba(201, 148, 58, 0.3) !important;
          color: #e0c887 !important;
        }

        .esg-questions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        @media (max-width: 768px) {
          .esg-questions-grid {
            grid-template-columns: 1fr;
          }
        }
        .esg-q-card {
          background: rgba(255, 255, 255, 0.01);
          border: 0.2px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
        }
        .esg-q-tag {
          font-family: monospace;
          font-size: 8px;
          letter-spacing: .05em;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 3px;
          align-self: flex-start;
          text-transform: uppercase;
        }
        .esg-q-tag.env { background: rgba(93,202,165,0.12); color: #5dcaa5; }
        .esg-q-tag.soc { background: rgba(250,199,117,0.12); color: #fac775; }
        .esg-q-tag.gov { background: rgba(80,130,230,0.12); color: #5082e6; }
        .esg-q-tag.strat { background: rgba(201, 148, 58,0.12); color: #c9943a; }
        .esg-q-tag.mkt { background: rgba(226,232,240,0.1); color: #cbd5e1; }
        
        .esg-q-text {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          line-height: 1.45;
        }
        .esg-q-select {
          background: rgba(5, 5, 5, 0.45);
          border: 0.2px solid rgba(255, 255, 255, 0.08);
          border-radius: 5px;
          color: #fff;
          font-size: 10px;
          padding: 6px 10px;
          outline: none;
          cursor: pointer;
          width: 100%;
        }
        .esg-q-select option {
          background: #0b0b0c;
          color: #fff;
        }
      `}</style>

      <div className="dash-card-esg">
        <div className="sec-head">
          <div className="lhs">
            <div className="sec-id">
              <span className="num">SEC · 03</span>
              <span className="tag">Conformidade</span>
            </div>
            <h2 className="sec-h">
              Diagnóstico <span className="em">ESG</span> &amp; Governança
            </h2>
            <div className="sec-sub">Métricas ambientais, sociais e corporativas integradas</div>
          </div>
          <div className="rhs">
            <div className="sec-meta">
              <span>
                Score Geral ESG: <b id="lblEsgOverall">{overallScore}</b>/100
              </span>
              <span>
                Sync <b>Real-time</b>
              </span>
            </div>
          </div>
        </div>

        {/* SVG ESG Progress Rings */}
        <div className="esg-rings-container">
          <div className="esg-ring-item">
            <div className="esg-ring-svg">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#5dcaa5"
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset={offsetE}
                  style={{ transition: 'stroke-dashoffset 0.6s ease', strokeLinecap: 'round' }}
                />
              </svg>
            </div>
            <b>Ambiental (E)</b>
            <span>{scoreE}%</span>
          </div>

          <div className="esg-ring-item">
            <div className="esg-ring-svg">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#fac775"
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset={offsetS}
                  style={{ transition: 'stroke-dashoffset 0.6s ease', strokeLinecap: 'round' }}
                />
              </svg>
            </div>
            <b>Social (S)</b>
            <span>{scoreS}%</span>
          </div>

          <div className="esg-ring-item">
            <div className="esg-ring-svg">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#5082e6"
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset={offsetG}
                  style={{ transition: 'stroke-dashoffset 0.6s ease', strokeLinecap: 'round' }}
                />
              </svg>
            </div>
            <b>Governança (G)</b>
            <span>{scoreG}%</span>
          </div>
        </div>

        {/* Sub-tabs row */}
        <div className="flex gap-2.5 mt-6 mb-5 border-b border-white/[0.06] pb-2.5">
          <button
            className={`sub-tab-btn ${activeSubTab === 'diagnostico' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('diagnostico')}
          >
            Diagnóstico
          </button>
          <button
            className={`sub-tab-btn ${activeSubTab === 'frameworks' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('frameworks')}
          >
            Frameworks
          </button>
        </div>

        {activeSubTab === 'diagnostico' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-normal text-white/90">Diagnóstico ESG Inteligente</h3>
                <span className="text-[10px] text-white/40">10 perguntas · 8 frameworks · IA recomenda o caminho</span>
              </div>
              <div className="bg-[#c9943a]/10 border border-[#c9943a]/30 px-3.5 py-1.5 rounded-full text-[#c9943a] font-mono text-[10px]">
                {answeredCount}/10 RESPONDIDAS
              </div>
            </div>

            <div className="esg-questions-grid">
              {questions.map(q => {
                const tagColorClass =
                  q.dim === 'E' ? 'env' : q.dim === 'S' ? 'soc' : q.tag.startsWith('STRAT') ? 'strat' : 'gov'
                return (
                  <div key={q.id} className="esg-q-card">
                    <div className={`esg-q-tag ${tagColorClass}`}>{q.tag}</div>
                    <p className="esg-q-text">{q.text}</p>
                    <select
                      className="esg-q-select"
                      value={answers[q.id] || ''}
                      onChange={(e) => handleSelectChange(q.id, Number(e.target.value))}
                    >
                      <option value="">Selecionar...</option>
                      {q.options.map((opt, idx) => (
                        <option key={idx} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 text-right">
              <button
                className="bg-[#c9943a]/15 hover:bg-[#c9943a]/25 border border-[#c9943a]/30 text-[#c9943a] text-[10px] font-mono uppercase tracking-widest px-6 py-2.5 rounded-md transition"
                onClick={handleAnalyze}
                disabled={answeredCount === 0 || analyzing}
                style={{ opacity: answeredCount === 0 ? 0.5 : 1 }}
              >
                {analyzing ? 'Analisando...' : 'Analisar Diagnóstico IA'}
              </button>
            </div>

            {iaRecommendation && (
              <div className="mt-5 bg-black/40 border border-white/[0.08] rounded-xl p-5 text-[11.5px] leading-relaxed text-white/90">
                <p dangerouslySetInnerHTML={{ __html: iaRecommendation }} className="m-0" />
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-normal text-white/90 mb-1">Bússola de Frameworks Globais</h3>
            <p className="text-[10px] text-white/45 mb-5">
              A inteligência mapeou a aderência atual da sua operação aos 4 principais standards de mercado.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-lg p-4 text-center space-y-2">
                <b className="text-sm block">GRI</b>
                <span className="text-[9px] opacity-40 block">Global Reporting Initiative</span>
                <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c9943a] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(overallScore * 1.1, 100)}%` }}
                  />
                </div>
              </div>
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-lg p-4 text-center space-y-2">
                <b className="text-sm block">SASB</b>
                <span className="text-[9px] opacity-40 block">Sustainability Accounting</span>
                <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5dcaa5] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(scoreS * 1.2, 100)}%` }}
                  />
                </div>
              </div>
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-lg p-4 text-center space-y-2">
                <b className="text-sm block">TCFD</b>
                <span className="text-[9px] opacity-40 block">Climate-Related Financial</span>
                <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e24b4a] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(scoreE * 1.3, 100)}%` }}
                  />
                </div>
              </div>
              <div className="bg-white/[0.01] border border-white/[0.04] rounded-lg p-4 text-center space-y-2">
                <b className="text-sm block">ODS / UN</b>
                <span className="text-[9px] opacity-40 block">Objetivos Desenvolvimento</span>
                <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5082e6] rounded-full transition-all duration-1000"
                    style={{ width: `${overallScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
