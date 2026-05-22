'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { ICU_REFERENCE_SYSTEMS } from '@/lib/generated/icu-reference-data'

type ClinicalSystem = (typeof ICU_REFERENCE_SYSTEMS)[number]
type ClinicalProblem = ClinicalSystem['problems'][number] & { block?: string; goals?: readonly string[]; assess?: readonly string[]; interv?: readonly string[]; phases?: readonly { timeframe: string; interv?: readonly string[] }[] }

function SystemGlyph({ path, color }: { path: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" className="h-3 w-3 shrink-0">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SystemGlyphLarge({ path, color }: { path: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" className="w-12 h-12 opacity-20 transition-all duration-300">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const SYSTEM_METRICS: Record<string, {
  subtitle: string
  shortName: string
  liveText: string
  vitals: { label: string; value: string }[]
  badgeText: string
}> = {
  cardiovascular: {
    subtitle: "Sistema Cardíaco",
    shortName: "Coração",
    liveText: "Ciclo ECG · 1 Hz · LIVE",
    vitals: [
      { label: "FC", value: "72 bpm" },
      { label: "SpO2", value: "98%" },
      { label: "MAP", value: "90 mmHg" }
    ],
    badgeText: "72 BPM"
  },
  respiratory: {
    subtitle: "Sistema Pulmonar",
    shortName: "Pulmão",
    liveText: "Fluxo O2 · Titulado",
    vitals: [
      { label: "FR", value: "16 irpm" },
      { label: "SpO2", value: "96%" },
      { label: "PEEP", value: "5 cmH2O" }
    ],
    badgeText: "16 IRPM"
  },
  neurological: {
    subtitle: "Sistema Nervoso",
    shortName: "Cérebro",
    liveText: "EEG Contínuo · Estável",
    vitals: [
      { label: "PIC", value: "12 mmHg" },
      { label: "PPC", value: "78 mmHg" },
      { label: "Glasgow", value: "15" }
    ],
    badgeText: "GCS 15"
  },
  functional: {
    subtitle: "Motor & Funcional",
    shortName: "Funcional",
    liveText: "Grau de Mobilidade",
    vitals: [
      { label: "Mobilidade", value: "Grau 3" },
      { label: "Força", value: "Grau 4" },
      { label: "Deambular", value: "Assistido" }
    ],
    badgeText: "MOT 3"
  },
  trauma: {
    subtitle: "Trauma & Cirurgia",
    shortName: "Trauma",
    liveText: "Pós-Op Crítico · Monitorado",
    vitals: [
      { label: "Estado", value: "Estável" },
      { label: "Dreno", value: "Ativo" },
      { label: "Dor EVA", value: "EVA 3" }
    ],
    badgeText: "PO CRÍTICO"
  },
  perioperative: {
    subtitle: "Módulo Perioperatório",
    shortName: "Perioperatório",
    liveText: "Pós-Anestésico · Ativo",
    vitals: [
      { label: "Temperatura", value: "36.6 °C" },
      { label: "Bloqueio", value: "Ausente" },
      { label: "Diurese", value: "100 mL/h" }
    ],
    badgeText: "RPA ATIVO"
  },
  populations: {
    subtitle: "Populações Especiais",
    shortName: "Especiais",
    liveText: "Direcionado · LIVE",
    vitals: [
      { label: "Risco", value: "Geriátrico" },
      { label: "Fragilidade", value: "Moderada" },
      { label: "Cuidados", value: "Contínuo" }
    ],
    badgeText: "ESPECIAL"
  }
}

function SectionList({
  title,
  items,
  accent,
}: {
  title: string
  items?: readonly string[]
  accent: string
}) {
  if (!items?.length) return null

  return (
    <div className="space-y-1.5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/36">{title}</p>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={`${title}-${item}`} className="flex gap-2 text-[9px] leading-snug text-white/68">
            <span className="mt-px shrink-0 text-[10px]" style={{ color: accent }}>•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ICUSystemPanel() {
  const [query, setQuery] = useState('')
  const [activeSystemId, setActiveSystemId] = useState<string>(ICU_REFERENCE_SYSTEMS[0]?.id ?? '')
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null)

  const HIDDEN_SYSTEMS = new Set(['renal', 'infectious', 'metabolic', 'gastrointestinal', 'hematologic', 'infectionsSepsis'])

  const filteredSystems = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return ICU_REFERENCE_SYSTEMS.filter((s) => !HIDDEN_SYSTEMS.has(s.id)).map((system) => {
      if (!normalized) return system

      const problems = system.problems.filter((rawProblem) => {
        const problem = rawProblem as ClinicalProblem
        const haystack = [
          problem.name,
          'desc' in problem ? (problem as { desc?: string }).desc : '',
          problem.block ?? '',
          ...(problem.goals ?? []),
          ...(problem.assess ?? []),
          ...(problem.interv ?? []),
          ...(problem.phases?.flatMap((phase) => [phase.timeframe, ...(phase.interv ?? [])]) ?? []),
        ]
          .join(' ')
          .toLowerCase()

        return haystack.includes(normalized)
      })

      return { ...system, problems }
    }).filter((system) => system.problems.length > 0)
  }, [query])

  useEffect(() => {
    if (!filteredSystems.length) {
      setExpandedProblemId(null)
      return
    }
    if (!filteredSystems.some((system) => system.id === activeSystemId)) {
      setActiveSystemId(filteredSystems[0].id)
    }
  }, [activeSystemId, filteredSystems])

  const activeSystem = filteredSystems.find((system) => system.id === activeSystemId) ?? filteredSystems[0] ?? null

  useEffect(() => {
    setExpandedProblemId(null)
  }, [activeSystemId])

  const groupedProblems = useMemo(() => {
    if (!activeSystem) return []
    const groups = new Map<string, ClinicalProblem[]>()
    activeSystem.problems.forEach((rawProblem) => {
      const problem = rawProblem as ClinicalProblem
      const block = problem.block || 'Base clinica'
      const current = groups.get(block) ?? []
      current.push(problem)
      groups.set(block, current)
    })
    return Array.from(groups.entries()).map(([block, problems]) => ({ block, problems }))
  }, [activeSystem])

  return (
    <div className="space-y-3">

      {/* Search */}
      <div className="chrome-panel rounded-[0.9rem] p-1.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-white/36" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar..."
            className="w-full rounded-[0.6rem] border border-white/10 bg-black/20 py-1 pl-7 pr-2 text-[10px] text-white outline-none transition-all placeholder:text-white/26 focus:border-white/18"
          />
        </div>
      </div>

      {/* System selector — Premium Glassmorphic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredSystems.map((system) => {
          const active = system.id === activeSystem?.id
          const metrics = SYSTEM_METRICS[system.id] || {
            subtitle: "Referência Clínica",
            shortName: system.name.replace("Sistema ", "").replace("Módulo ", ""),
            liveText: "Monitoramento Ativo",
            vitals: [
              { label: "Problemas", value: `${system.problems.length}` },
              { label: "Módulo", value: "Referência" },
              { label: "Status", value: "Estável" }
            ],
            badgeText: "S3 CLIN"
          }

          return (
            <motion.button
              key={system.id}
              onClick={() => setActiveSystemId(system.id)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`cockpit-card mini-sim-card relative h-[180px] w-full text-left overflow-hidden rounded-[20px] transition-all p-5 flex flex-col justify-between`}
              style={{
                borderColor: active ? system.color : 'rgba(255, 255, 255, 0.08)',
                boxShadow: active 
                  ? `0 24px 64px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 25px ${system.color}25`
                  : undefined,
                color: system.color,
                background: active ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.32)'
              }}
            >
              {/* Shimmer gradient line based on system color */}
              <div 
                className="absolute top-0 left-5 right-5 h-[1.5px] opacity-75"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 30%, ${system.color} 50%, rgba(255,255,255,0.15) 70%, transparent)`
                }}
              />

              {/* Status indicator / Live tag */}
              <div className="flex items-center justify-between w-full z-10">
                <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider uppercase font-medium">
                  <div className="relative w-1.5 h-1.5 rounded-full" style={{ backgroundColor: system.color }}>
                    <div 
                      className="absolute inset-[-4px] rounded-full border border-current animate-ping opacity-60"
                      style={{ color: system.color }}
                    />
                  </div>
                  <span className="text-white/60">{metrics.liveText}</span>
                </div>

                {/* Card expand hint */}
                <div 
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full border bg-black/60 text-[8px] font-medium transition-all ${
                    active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    borderColor: active ? `${system.color}40` : 'rgba(255,255,255,0.12)'
                  }}
                >
                  <span style={{ color: system.color }}>{active ? 'ATIVO' : 'ABRIR'}</span>
                </div>
              </div>

              {/* Vector Ring / Large Icon in background */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full border border-dashed flex items-center justify-center pointer-events-none opacity-20"
                style={{ borderColor: system.color }}
              >
                <div 
                  className="w-[70px] h-[70px] rounded-full border flex items-center justify-center"
                  style={{ borderColor: system.color }}
                >
                  <SystemGlyphLarge path={system.icon} color={system.color} />
                </div>
              </div>

              {/* Vitals Section */}
              <div className="flex flex-col gap-0.5 text-[9px] text-white/40 z-10 w-full">
                {metrics.vitals.map((v, i) => (
                  <div key={i} className="flex justify-between border-b border-white/[0.03] py-0.5">
                    <span>{v.label}:</span>
                    <b className="text-white/80 font-medium font-mono">{v.value}</b>
                  </div>
                ))}
              </div>

              {/* Title area & Badge */}
              <div className="flex items-end justify-between w-full z-10 mt-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] uppercase tracking-wider text-white/40">{metrics.subtitle}</span>
                  <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-[4px] opacity-70" 
                      style={{ backgroundColor: system.color }}
                    />
                    {metrics.shortName}
                  </h3>
                </div>

                <div 
                  className="text-[8.5px] font-mono font-semibold px-2 py-0.5 rounded-full border bg-black/50 tracking-wider shadow-sm"
                  style={{ 
                    borderColor: `${system.color}40`,
                    color: system.color
                  }}
                >
                  {system.problems.length} PROBS
                </div>
              </div>

            </motion.button>
          )
        })}
      </div>

      {/* Active system content */}
      {activeSystem ? (
        <div>

          {/* Premium Header */}
          <div className="glass-panel p-3.5 mb-4 flex items-center justify-between border-l-2" style={{ borderLeftColor: activeSystem.color }}>
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/40 border"
                style={{ borderColor: `${activeSystem.color}40`, boxShadow: `0 0 10px ${activeSystem.color}20` }}
              >
                <SystemGlyph path={activeSystem.icon} color={activeSystem.color} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                  {activeSystem.name}
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeSystem.color }} />
                </p>
                <p className="text-[9px] text-white/50 font-mono tracking-wide mt-0.5">
                  {groupedProblems.length} BLOCOS · {activeSystem.problems.length} PROBLEMAS CLÍNICOS {query ? ' · FILTRADO' : ''}
                </p>
              </div>
            </div>
            <div 
              className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-black/30 border border-white/5 text-white/60"
            >
              REF_CLÍNICA_S3
            </div>
          </div>

          {/* Blocks */}
          <div className="space-y-3">
            {groupedProblems.map(({ block, problems }) => (
              <div key={block}>
                <div className="mb-1.5 flex items-center justify-between gap-2 px-0.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: activeSystem.color }}>
                    {block}
                  </p>
                  <span className="text-[9px] text-white/30">
                    {problems.length}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {problems.map((problem) => {
                    const open = expandedProblemId === problem.name

                    return (
                      <div
                        key={problem.name}
                        className={`rounded-[0.9rem] border transition-all ${
                          open ? 'border-white/14 bg-white/[0.03]' : 'border-white/8 bg-transparent'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedProblemId(open ? null : problem.name)}
                          className="flex w-full items-start justify-between gap-3 px-3 py-2.5 text-left"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-[9px] font-semibold leading-snug text-white/88">{problem.name}</p>
                            <p className="mt-0.5 text-[10px] leading-snug text-white/50">{problem.desc}</p>
                          </div>
                          <span
                            className="mt-0.5 shrink-0 rounded-full border px-1.5 py-px text-[9px] uppercase tracking-[0.14em]"
                            style={{
                              borderColor: `${activeSystem.color}28`,
                              color: open ? activeSystem.color : 'rgba(255,255,255,0.36)',
                            }}
                          >
                            {open ? '▲' : '▼'}
                          </span>
                        </button>

                        {open ? (
                          <div className="border-t border-white/7 px-3 py-3">
                            <div className="grid gap-3 sm:grid-cols-2">
                              <SectionList
                                title="Objetivos"
                                items={problem.goals}
                                accent={activeSystem.color}
                              />
                              <SectionList
                                title="Avaliação"
                                items={problem.assess}
                                accent={activeSystem.color}
                              />
                            </div>

                            {problem.phases?.length ? (
                              <div className="mt-3 space-y-2">
                                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/36">Fases</p>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  {problem.phases.map((phase) => (
                                    <div
                                      key={`${problem.name}-${phase.timeframe}`}
                                      className="rounded-[0.8rem] border border-white/7 bg-black/14 p-2.5"
                                    >
                                      <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: activeSystem.color }}>
                                        {phase.timeframe}
                                      </p>
                                      <div className="space-y-1">
                                        {(phase.interv ?? []).map((item) => (
                                          <div
                                            key={`${phase.timeframe}-${item}`}
                                            className="flex gap-1.5 text-[9px] leading-snug text-white/62"
                                          >
                                            <span className="mt-px shrink-0 text-[10px]" style={{ color: activeSystem.color }}>→</span>
                                            <span>{item}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}

                            <div className="mt-3">
                              <SectionList
                                title="Condutas e intervenções"
                                items={problem.interv}
                                accent={activeSystem.color}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="chrome-panel rounded-[1.4rem] p-6 text-center">
          <p className="text-[9px] text-white/46">Nenhum sistema corresponde ao filtro.</p>
        </div>
      )}
    </div>
  )
}
