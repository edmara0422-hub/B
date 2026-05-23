'use client'

import React, { useState } from 'react'

type FeedbackLog = {
  id: string
  squad: string
  time: string
  metrics: string
  text: string
}

export function SigFeedbackPanel() {
  const [energy, setEnergy] = useState(75)
  const [focus, setFocus] = useState(80)
  const [comment, setComment] = useState('')

  // SBI Form States
  const [sbiSit, setSbiSit] = useState('')
  const [sbiBeh, setSbiBeh] = useState('')
  const [sbiImp, setSbiImp] = useState('')
  const [sbiResult, setSbiResult] = useState<string | null>(null)

  const [feedbacks, setFeedbacks] = useState<FeedbackLog[]>([
    { id: 'f-1', squad: 'CS Squad', time: 'Há 2h', metrics: 'Energia 80% · Foco 90%', text: 'O novo fluxo de onboarding resolveu 100% dos blockers operacionais de integração.' },
    { id: 'f-2', squad: 'Vendas Squad', time: 'Ontem', metrics: 'Energia 60% · Foco 55%', text: 'Falta clareza nas metas de comissão deste trimestre. Aguardamos reunião de alinhamento com a diretoria.' }
  ])

  function handlePulseSubmit() {
    if (!comment.trim()) return

    const newFeed: FeedbackLog = {
      id: `f-${Date.now()}`,
      squad: 'Operações (Você)',
      time: 'Agora mesmo',
      metrics: `Energia ${energy}% · Foco ${focus}%`,
      text: comment
    }

    setFeedbacks([newFeed, ...feedbacks])
    setComment('')
  }

  function handleBuildSbi() {
    if (!sbiSit.trim() || !sbiBeh.trim() || !sbiImp.trim()) return

    setSbiResult(
      `"Durante a reunião de passagem de plantão ontem (Situação), você apresentou os relatórios de calibração de complacência de forma estruturada (Comportamento), o que permitiu ao time tomar decisões assertivas sobre os parâmetros dos pacientes (Impacto)."`
    )
  }

  return (
    <div className="w-full">
      <style>{`
        .dash-card-feedback {
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
        .dash-card-feedback::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(90deg, #cbd5e1 0%, #d4b87a 100%) !important;
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
          font-family: monospace; font-size: 9.5px; letter-spacing: .1em; color: #d4b87a; font-weight: 500;
          border: 0.2px solid rgba(255, 255, 255, 0.08); padding: 3px 9px; border-radius: 4px; background: rgba(218,165,32,.04);
        }
        .sec-id .tag { font-family: monospace; font-size: 10px; letter-spacing: .1em; color: #8a9098; text-transform: uppercase }
        .sec-h {
          font-family: inherit; font-size: 22px; letter-spacing: -.02em;
          font-weight: 300; line-height: 1.2; color: #fff;
          margin-top: 4px; margin-bottom: 0;
        }
        .sec-h .em {
          background: linear-gradient(135deg, #b8975a 0%, #d4b87a 28%, #e8cc88 50%, #d4b87a 72%, #b8975a 100%);
          background-clip: text; -webkit-background-clip: text;
          color: transparent; -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
        .sec-sub { font-size: 11.5px; color: #8a9098; margin-top: 4px; font-weight: 200 }
        .sec-meta { display: flex; flex-direction: column; gap: 4px; font-family: monospace; font-size: 10px; letter-spacing: .04em; color: #8a9098; text-align: right }
        .sec-meta b { color: #fff; font-weight: 600 }

        .pulse-slider {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          outline: none;
          accent-color: #d4b87a;
          margin: 8px 0;
          cursor: pointer;
        }
        .p-btn {
          background: rgba(212,184,122,0.1) !important;
          border: 0.2px solid rgba(212,184,122,0.3) !important;
          color: #d4b87a;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .p-btn:hover {
          background: rgba(212,184,122,0.2) !important;
        }
      `}</style>

      <div className="dash-card-feedback">
        <div className="sec-head">
          <div className="lhs">
            <div className="sec-id">
              <span className="num">SEC · 04</span>
              <span className="tag">Escuta Ativa</span>
            </div>
            <h2 className="sec-h">
              Mural <span className="em">Pulse</span> &amp; NPS
            </h2>
            <div className="sec-sub">Pesquisa de clima instantânea e monitoramento NPS</div>
          </div>
          <div className="rhs">
            <div className="sec-meta">
              <span>
                NPS Médio <b>42</b>
              </span>
              <span>
                Respostas <b>n=65</b>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative z-10">
          {/* LEFT COLUMN: NPS Display & Pulse form */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-black/25 border border-white/[0.06] rounded-xl p-5 flex flex-col gap-3">
              <span className="font-mono text-[8px] color-[#8a9098] tracking-widest uppercase">NPS Categoria</span>
              <div className="flex justify-between items-end">
                <span className="text-xl font-semibold text-[#d4b87a]">NPS 42</span>
                <span className="text-[#5dcaa5] text-[10.5px]">▲ +4 pts vs S20</span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden flex mt-1">
                <div style={{ width: '58%', background: '#5dcaa5', height: '100%' }}></div>
                <div style={{ width: '26%', background: '#fac775', height: '100%' }}></div>
                <div style={{ width: '16%', background: '#e24b4a', height: '100%' }}></div>
              </div>
              <div className="flex justify-between text-[8.5px] font-mono text-white/40 mt-1">
                <span>Promotores 58%</span>
                <span>Neutros 26%</span>
                <span>Detratores 16%</span>
              </div>
            </div>

            <div className="bg-black/25 border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
              <span className="font-mono text-[9px] text-[#d4b87a] tracking-wider uppercase border-b border-white/[0.08] pb-2">
                PULSE SEMANAL (CLIMA)
              </span>

              <div>
                <div className="flex justify-between text-[11px] text-white/85">
                  <span>Energia / Ânimo</span>
                  <b className="text-[#d4b87a]">{energy}%</b>
                </div>
                <input
                  type="range"
                  className="pulse-slider"
                  min="0"
                  max="100"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-white/85">
                  <span>Foco / Direção</span>
                  <b className="text-[#d4b87a]">{focus}%</b>
                </div>
                <input
                  type="range"
                  className="pulse-slider"
                  min="0"
                  max="100"
                  value={focus}
                  onChange={(e) => setFocus(Number(e.target.value))}
                />
              </div>

              <div>
                <span className="text-[10px] text-white/50 block mb-1">Feedback Anônimo (Opcional)</span>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escreva seu blocker ou sugestão semanal..."
                  style={{
                    width: '100%',
                    height: '50px',
                    background: 'rgba(5, 5, 5, 0.45)',
                    border: '0.2px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '8px',
                    fontSize: '10px',
                    color: '#fff',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button className="p-btn w-full" onClick={handlePulseSubmit}>
                Submeter Pulse
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Feed & SBI Compiler */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* SBI Feedback Compiler */}
            <div className="bg-black/25 border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
              <span className="font-mono text-[9px] text-[#d4b87a] tracking-wider uppercase border-b border-white/[0.08] pb-2">
                SBI COACHING: MAPEADOR DE FEEDBACK
              </span>

              <div className="flex flex-col gap-2">
                <input
                  value={sbiSit}
                  onChange={(e) => setSbiSit(e.target.value)}
                  placeholder="Situação (Onde/Quando?)"
                  style={{
                    width: '100%',
                    background: 'rgba(5, 5, 5, 0.45)',
                    border: '0.2px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '10.5px',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
                <input
                  value={sbiBeh}
                  onChange={(e) => setSbiBeh(e.target.value)}
                  placeholder="Comportamento (O que fez concretamente?)"
                  style={{
                    width: '100%',
                    background: 'rgba(5, 5, 5, 0.45)',
                    border: '0.2px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '10.5px',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
                <input
                  value={sbiImp}
                  onChange={(e) => setSbiImp(e.target.value)}
                  placeholder="Impacto (Qual foi o resultado prático?)"
                  style={{
                    width: '100%',
                    background: 'rgba(5, 5, 5, 0.45)',
                    border: '0.2px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '10.5px',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              {sbiResult && (
                <div className="p-3 bg-[#d4b87a]/5 border border-[#d4b87a]/15 rounded-md text-[11px] leading-relaxed text-[#d4b87a]/90 font-medium italic">
                  {sbiResult}
                </div>
              )}

              <button className="p-btn w-full" onClick={handleBuildSbi}>
                Compilar Modelo SBI
              </button>
            </div>

            {/* Live Mural Feed */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#8a9098] uppercase tracking-wider">Feed Mural Anônimo</span>
              <div className="flex flex-col gap-2.5 max-h-[175px] overflow-y-auto pr-1">
                {feedbacks.map(feed => (
                  <div
                    key={feed.id}
                    className="background-rgba(255,255,255,0.02) border border-white/[0.04] p-3 rounded-lg flex flex-col gap-1.5"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="flex justify-between items-center text-[9px] text-[#d4b87a] font-mono">
                      <span>
                        {feed.squad} · {feed.time}
                      </span>
                      <span className="text-white/40">{feed.metrics}</span>
                    </div>
                    <p className="m-0 text-[10.5px] text-white/80 leading-normal">{feed.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
