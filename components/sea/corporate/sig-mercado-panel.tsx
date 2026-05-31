'use client'

import React, { useState, useEffect } from 'react'

type CheckboxItem = {
  id: string
  label: string
  weight: number
  checked: boolean
}

export function SigMercadoPanel() {
  const [items, setItems] = useState<CheckboxItem[]>([
    { id: 'chk-lgpd', label: 'LGPD (Lei Geral de Proteção de Dados)', weight: 25, checked: true },
    { id: 'chk-iso', label: 'ISO/IEC 27001 (Segurança da Informação)', weight: 30, checked: true },
    { id: 'chk-open', label: 'API Open Finance Integration', weight: 20, checked: true },
    { id: 'chk-soc', label: 'SOC 2 Type II Audited', weight: 25, checked: false }
  ])

  const [score, setScore] = useState(75)
  const [level, setLevel] = useState('Conforme')
  const [color, setColor] = useState('#5dcaa5')

  useEffect(() => {
    const sum = items.reduce((acc, item) => acc + (item.checked ? item.weight : 0), 0)
    setScore(sum)

    if (sum >= 90) {
      setLevel('Excelente')
      setColor('#5dcaa5')
    } else if (sum >= 70) {
      setLevel('Conforme')
      setColor('#5dcaa5')
    } else if (sum >= 40) {
      setLevel('Parcial')
      setColor('#fac775')
    } else {
      setLevel('Risco')
      setColor('#e24b4a')
    }
  }, [items])

  function handleToggle(id: string) {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  // Circular dial calculations
  const circum = 314.16 // 2 * Math.PI * 50
  const offset = circum - (score / 100) * circum

  // Sector Audit Status
  const chkLgpd = items.find(i => i.id === 'chk-lgpd')?.checked ?? false
  const chkIso = items.find(i => i.id === 'chk-iso')?.checked ?? false
  const chkOpen = items.find(i => i.id === 'chk-open')?.checked ?? false
  const chkSoc = items.find(i => i.id === 'chk-soc')?.checked ?? false

  return (
    <div className="w-full">
      <style>{`
        .dash-card-mercado {
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
        .dash-card-mercado::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(90deg, #cbd5e1 0%, #d2af5a 100%) !important;
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
          font-family: monospace; font-size: 9.5px; letter-spacing: .1em; color: #d2af5a; font-weight: 500;
          border: 0.2px solid rgba(255, 255, 255, 0.08); padding: 3px 9px; border-radius: 4px; background: rgba(218,165,32,.04);
        }
        .sec-id .tag { font-family: monospace; font-size: 10px; letter-spacing: .1em; color: #8a9098; text-transform: uppercase }
        .sec-h {
          font-family: inherit; font-size: 22px; letter-spacing: -.02em;
          font-weight: 300; line-height: 1.2; color: #fff;
          margin-top: 4px; margin-bottom: 0;
        }
        .sec-h .em {
          background: linear-gradient(135deg, #b8975a 0%, #d2af5a 28%, #e8cc88 50%, #d2af5a 72%, #b8975a 100%);
          background-clip: text; -webkit-background-clip: text;
          color: transparent; -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
        .sec-sub { font-size: 11.5px; color: #8a9098; margin-top: 4px; font-weight: 200 }
        .sec-meta { display: flex; flex-direction: column; gap: 4px; font-family: monospace; font-size: 10px; letter-spacing: .04em; color: #8a9098; text-align: right }
        .sec-meta b { color: #fff; font-weight: 600 }
        .mercado-check-label {
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(255, 255, 255, 0.02); border: 0.2px solid rgba(255, 255, 255, 0.05);
          padding: 10px 12px; border-radius: 6px; font-size: 11.5px; cursor: pointer; transition: all 0.2s;
        }
        .mercado-check-label:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(201, 148, 58, 0.25);
        }
        .heatmap-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>

      <div className="dash-card-mercado">
        <div className="sec-head">
          <div className="lhs">
            <div className="sec-id">
              <span className="num">SEC · 02</span>
              <span className="tag">Mercado &amp; Setor</span>
            </div>
            <h2 className="sec-h">
              Inteligência de <span className="em">Mercado &amp; Setor</span>
            </h2>
            <div className="sec-sub">
              Auditorias de standards globais, benchmark de CAC/LTV e Heatmap setorial ativo.
            </div>
          </div>
          <div className="rhs">
            <div className="sec-meta">
              <span>
                Aderência Setorial: <b style={{ color: '#d2af5a' }}>{score}%</b>
              </span>
              <span>
                Status: <b style={{ color: color }}>{level}</b>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative z-10">
          {/* LEFT COLUMN: AUDITORIA DE STANDARDS & DIAL */}
          <div className="lg:col-span-5 bg-black/25 border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
            <b className="font-mono text-[10px] text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.08] pb-2">
              STANDARDS DE CONFORMIDADE
            </b>

            <div className="flex items-center gap-5 bg-[#d2af5a]/[0.02] p-4 rounded-lg border border-[#d2af5a]/[0.08]">
              {/* SVG Circular Dial */}
              <div className="relative w-20 h-20 shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#d2af5a"
                    strokeWidth="8"
                    strokeDasharray="314.16"
                    strokeDashoffset={offset}
                    style={{
                      transition: 'stroke-dashoffset 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      strokeLinecap: 'round',
                      filter: 'drop-shadow(0 0 4px rgba(201, 148, 58,0.4))'
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ fontFamily: 'monospace', fontSize: '15px', fontWeight: 600, color: '#fff' }}>
                    {score}%
                  </span>
                </div>
              </div>
              <div>
                <span className="text-[10px] opacity-60 block">Maturidade Regulatória</span>
                <span className="font-semibold text-xs block mt-0.5" style={{ color: color }}>
                  {level}
                </span>
                <p className="text-[9px] opacity-50 mt-1 leading-normal">
                  Aderência baseada na calibragem dos standards selecionados abaixo.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {items.map(item => (
                <label key={item.id} className="mercado-check-label select-none">
                  <span className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggle(item.id)}
                      className="h-3.5 w-3.5 accent-[#d2af5a] cursor-pointer"
                    />
                    <span className="text-[11px] text-white/80 truncate">{item.label}</span>
                  </span>
                  <b className="text-[#d2af5a] font-mono text-[9px]">{item.weight}%</b>
                </label>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: SECTOR STANDARDS HEATMAP */}
          <div className="lg:col-span-7 bg-black/25 border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
            <b className="font-mono text-[10px] text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.08] pb-2">
              HEATMAP DE ADERÊNCIA SETORIAL (AUDIT)
            </b>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-white/60">
                    <th className="py-2.5 px-1">Setor</th>
                    <th className="py-2.5 px-1 text-center">LGPD</th>
                    <th className="py-2.5 px-1 text-center">ISO 27001</th>
                    <th className="py-2.5 px-1 text-center">Open Finance</th>
                    <th className="py-2.5 px-1 text-center">SOC 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="heatmap-row border-b border-white/[0.04] transition">
                    <td className="py-3 px-1 font-semibold text-white/95">SaaS B2B</td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                        100%
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                        100%
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-white/[0.04] text-white/30 px-2 py-0.5 rounded text-[9px]">N/A</span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      {chkSoc ? (
                        <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                          100%
                        </span>
                      ) : (
                        <span className="bg-[#fac775]/12 text-[#fac775] px-2 py-0.5 rounded text-[9px] border border-[#fac775]/25">
                          Pendente
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="heatmap-row border-b border-white/[0.04] transition">
                    <td className="py-3 px-1 font-semibold text-white/95">Fintech</td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                        100%
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                        100%
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      {chkOpen ? (
                        <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                          Ativo
                        </span>
                      ) : (
                        <span className="bg-[#fac775]/12 text-[#fac775] px-2 py-0.5 rounded text-[9px] border border-[#fac775]/25">
                          Pendente
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-1 text-center">
                      {chkSoc ? (
                        <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                          100%
                        </span>
                      ) : (
                        <span className="bg-[#fac775]/12 text-[#fac775] px-2 py-0.5 rounded text-[9px] border border-[#fac775]/25">
                          Pendente
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="heatmap-row border-b border-white/[0.04] transition">
                    <td className="py-3 px-1 font-semibold text-white/95">E-commerce</td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                        100%
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      {chkIso ? (
                        <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                          100%
                        </span>
                      ) : (
                        <span className="bg-[#fac775]/12 text-[#fac775] px-2 py-0.5 rounded text-[9px] border border-[#fac775]/25">
                          Pendente
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-white/[0.04] text-white/30 px-2 py-0.5 rounded text-[9px]">N/A</span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-white/[0.04] text-white/30 px-2 py-0.5 rounded text-[9px]">N/A</span>
                    </td>
                  </tr>
                  <tr className="heatmap-row border-b border-white/[0.04] transition">
                    <td className="py-3 px-1 font-semibold text-white/95">Healthtech</td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                        100%
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      {chkIso ? (
                        <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                          100%
                        </span>
                      ) : (
                        <span className="bg-[#fac775]/12 text-[#fac775] px-2 py-0.5 rounded text-[9px] border border-[#fac775]/25">
                          Pendente
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-white/[0.04] text-white/30 px-2 py-0.5 rounded text-[9px]">N/A</span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      {chkSoc ? (
                        <span className="bg-[#5dcaa5]/15 text-[#5dcaa5] px-2 py-0.5 rounded text-[9px] border border-[#5dcaa5]/20">
                          100%
                        </span>
                      ) : (
                        <span className="bg-[#fac775]/12 text-[#fac775] px-2 py-0.5 rounded text-[9px] border border-[#fac775]/25">
                          Pendente
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#d2af5a]/[0.02] p-3 rounded-lg border border-[#d2af5a]/[0.08] text-[10px] opacity-80 leading-normal">
              💡 <b>Insight do Setor:</b> A regulação de segurança (ISO 27001) e proteção de dados (LGPD) são pré-requisitos vitais para empresas de tecnologia no Brasil.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
