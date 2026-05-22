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
    { id: 'chk-lgpd', label: 'LGPD & Regulamentação CFM', weight: 25, checked: true },
    { id: 'chk-iso', label: 'ISO 27001 / Segurança da Informação', weight: 30, checked: true },
    { id: 'chk-esg', label: 'Políticas de ESG & Sustentabilidade', weight: 20, checked: true },
    { id: 'chk-aud', label: 'Auditoria de Canal & LGPD Interna', weight: 25, checked: false }
  ])

  const [score, setScore] = useState(0)
  const [level, setLevel] = useState('Parcial')
  const [color, setColor] = useState('#fac775')

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
  const chkIso = items.find(i => i.id === 'chk-iso')?.checked ?? false
  const chkEsg = items.find(i => i.id === 'chk-esg')?.checked ?? false

  return (
    <div className="ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] space-y-6">
      <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
        <div>
          <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">SIG · MERCADO</span>
          <h3 className="text-sm font-semibold text-white/90">Auditoria & Panorama Cruzado</h3>
          <p className="text-[10px] text-white/40">Calibração ativa do índice de governança setorial no ecossistema IPB</p>
        </div>
        <span className="text-[8.5px] font-mono text-white/40">S21 / 2026</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Compliance Circular Dial */}
        <div className="md:col-span-4 flex flex-col items-center justify-center relative">
          <div className="w-[160px] h-[160px] relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1.5"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#mercadoDialGrad)"
                strokeWidth="2"
                strokeDasharray={`${circum}`}
                style={{
                  strokeDashoffset: offset,
                  transition: 'stroke-dashoffset 0.6s ease'
                }}
              />
              <defs>
                <linearGradient id="mercadoDialGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d4b87a" />
                  <stop offset="100%" stopColor="#b8975a" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-mono text-white">{score}%</span>
              <span 
                className="text-[9px] uppercase tracking-widest mt-1 font-semibold transition"
                style={{ color: color }}
              >
                {level}
              </span>
            </div>
          </div>
        </div>

        {/* Weights checklist */}
        <div className="md:col-span-8 space-y-3">
          <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 block mb-1">Checklist de Conformidade</span>
          <div className="space-y-2">
            {items.map(item => (
              <label 
                key={item.id} 
                className="flex items-center justify-between p-2.5 bg-black/25 hover:bg-black/35 border border-white/[0.03] rounded-[0.6rem] transition cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggle(item.id)}
                    className="h-3.5 w-3.5 accent-[#d4b87a] cursor-pointer"
                  />
                  <span className="text-[11px] text-white/80">{item.label}</span>
                </div>
                <span className="text-[9px] font-mono text-[#d4b87a]/80 font-bold bg-white/[0.02] px-2 py-0.5 rounded-[0.3rem]">
                  +{item.weight}%
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Sector status matrix */}
      <div className="border-t border-white/[0.04] pt-4">
        <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 block mb-3">Matriz de Governança por Setor</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'SaaS / Tech', detail: 'Social Compliance', ok: chkEsg },
            { name: 'Fintech', detail: 'Data Integrity', ok: chkEsg },
            { name: 'E-commerce', detail: 'ISO standard', ok: chkIso },
            { name: 'Health', detail: 'Patient privacy', ok: chkIso && chkEsg }
          ].map((sec, idx) => (
            <div key={idx} className="p-3 bg-black/25 border border-white/[0.03] rounded-[0.8rem] space-y-1">
              <span className="text-[9px] font-medium text-white/60 block">{sec.name}</span>
              <span className="text-[7.5px] text-white/30 block leading-tight">{sec.detail}</span>
              <div className="pt-1.5 flex items-center justify-between">
                <span className="text-[7.5px] font-mono text-white/40">Status:</span>
                <span 
                  className={`text-[8.5px] font-semibold px-2 py-0.5 rounded-[0.3rem] font-mono ${
                    sec.ok 
                      ? 'bg-[#5dcaa5]/15 text-[#5dcaa5] border border-[#5dcaa5]/20' 
                      : 'bg-[#fac775]/12 text-[#fac775] border border-[#fac775]/25'
                  }`}
                >
                  {sec.ok ? '100%' : 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
