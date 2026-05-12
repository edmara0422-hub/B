'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Brain, Heart, Wind, Radar, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { CadernoModulePanel } from '@/components/caderno/caderno-module'

// ── Module data ───────────────────────────────────────────────────────────────

type Module = {
  id: string
  title: string
  icon: LucideIcon
  overview: string
}

const MODULES: Module[] = [
  {
    id: 'M1',
    title: 'Neuro',
    icon: Brain,
    overview: 'Plasticidade neural, mapas funcionais e correlações clínicas. Avaliação neurológica e reabilitação pós-AVC.',
  },
  {
    id: 'M2',
    title: 'Pneumo / VM',
    icon: Wind,
    overview: 'Ventilação mecânica protetora, mecânica pulmonar, parâmetros ventilatórios e desmame.',
  },
  {
    id: 'M3',
    title: 'Cardio',
    icon: Heart,
    overview: 'ECG, hemodinâmica e reabilitação cardiovascular. Exercício supervisionado e protocolo cardíaco.',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

// ── Workspace Sidebar (lateral esquerda, lista de módulos) ───────────────────

function WorkspaceSidebar({
  modules,
  activeIndex,
  onSelect,
  onClose,
}: {
  modules: Module[]
  activeIndex: number | null
  onSelect: (i: number) => void
  onClose: () => void
}) {
  return (
    <div
      className="ipb-card flex flex-col overflow-hidden rounded-[1.65rem]"
      style={{ maxHeight: 'calc(100vh - 140px)' }}
    >
      {/* Header */}
      <div className="shrink-0 px-4 pb-3 pt-4" style={{ borderBottom: '1px solid rgba(220,225,235,0.08)' }}>
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/40">Trilha de Estudo</p>
          <button
            onClick={onClose}
            title="Fechar sidebar"
            className="flex h-6 w-6 items-center justify-center rounded-[0.5rem] text-white/36 transition hover:bg-white/[0.08] hover:text-white/64"
          >
            <PanelLeftClose className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-white/40">{modules.length} módulos</p>
      </div>

      {/* Module list */}
      <div className="flex-1 overflow-y-auto px-2 py-2 ipb-thinscroll">
        {modules.map((mod, idx) => {
          const isActive = activeIndex === idx
          const ModIcon = mod.icon
          return (
            <div key={mod.id}>
              {idx > 0 && <div className="mx-3 my-2 h-px bg-white/[0.06]" />}
              <button
                onClick={() => onSelect(idx)}
                className="flex w-full items-center gap-2.5 rounded-[1rem] px-3 py-2.5 text-left transition"
                style={
                  isActive
                    ? {
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
                        border: '1px solid rgba(220,225,235,0.22)',
                        boxShadow: 'inset 0 1px 0 rgba(220,225,235,0.14)',
                      }
                    : { border: '1px solid transparent' }
                }
              >
                <ModIcon
                  className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-white/85' : 'text-white/32'}`}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[9px] uppercase tracking-[0.22em] ${
                      isActive ? 'text-white/55' : 'text-white/20'
                    }`}
                  >
                    {mod.id}
                  </p>
                  <p
                    className={`truncate text-[11px] font-medium leading-snug ${
                      isActive ? 'text-white/92' : 'text-white/55'
                    }`}
                  >
                    {mod.title}
                  </p>
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Module rail ───────────────────────────────────────────────────────────────

function ModuleRail({
  modules,
  activeIndex,
  onSelect,
}: {
  modules: Module[]
  activeIndex: number | null
  onSelect: (i: number) => void
}) {
  return (
    <div className="ipb-card relative overflow-hidden rounded-[1.8rem] px-5 py-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px silver-divider opacity-60" />
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[0.7rem] border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <BookOpen className="h-4 w-4 text-white/60" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/44">Conteúdos</span>
        </div>
        <span className="text-[10px] font-semibold tabular-nums text-white/28">{modules.length} módulos</span>
      </div>

      {/* Rail nodes */}
      <div className="relative px-2 md:px-4">
        <div className="pointer-events-none absolute inset-x-0 top-[2.75rem] h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.26)_18%,rgba(255,255,255,0.16)_52%,rgba(255,255,255,0.08)_100%)]" />

        <div className="relative flex items-start justify-between gap-2 md:gap-4">
          {modules.map((module, index) => {
            const active = index === activeIndex
            const ModuleIcon = module.icon
            const floatDuration = 3.6 + index * 0.22

            return (
              <button
                key={module.id}
                onClick={() => onSelect(index)}
                className="group flex min-w-0 flex-1 flex-col items-center gap-2.5 text-center"
                title={module.title}
              >
                <motion.div
                  animate={{ y: [0, active ? -5 : -2, 0] }}
                  transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
                  className="flex flex-col items-center gap-2"
                >
                  {/* Small icon above ball */}
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-200"
                    style={{
                      borderColor: active ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
                      background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                    }}
                  >
                    <ModuleIcon
                      className="h-3.5 w-3.5"
                      style={{ color: active ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.38)' }}
                    />
                  </div>

                  {/* Node ball */}
                  <motion.div
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 md:h-12 md:w-12"
                    style={{
                      borderColor: active ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.10)',
                      background: active
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(218,224,231,0.34) 20%, rgba(22,24,28,0.96) 100%)'
                        : 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(14,16,20,0.92) 100%)',
                      boxShadow: active
                        ? '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)'
                        : 'none',
                    }}
                  >
                    <div
                      className="absolute inset-[5px] rounded-full"
                      style={{
                        background: active
                          ? 'radial-gradient(circle, rgba(255,255,255,0.42) 0%, rgba(186,194,203,0.16) 45%, transparent 78%)'
                          : 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 72%)',
                      }}
                    />
                    <span
                      className="relative text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.54)' }}
                    >
                      {module.id}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Dot */}
                <div
                  className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: active ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.20)',
                    boxShadow: active ? '0 0 10px rgba(255,255,255,0.32)' : 'none',
                  }}
                />

                {/* Label */}
                <span
                  className="max-w-[5rem] text-center text-[9px] leading-tight tracking-[0.06em] transition-colors duration-200"
                  style={{ color: active ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.28)' }}
                >
                  {module.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ConteudosPageClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const current = activeIndex !== null ? MODULES[activeIndex] : null
  const CurrentIcon = current?.icon

  function handleSelect(index: number) {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <main className="relative z-10 px-2.5 pb-32 pt-8 md:px-8 md:pt-10">
        <div className="mx-auto max-w-2xl md:max-w-7xl space-y-6">

          {/* Back + title */}
          <div className="flex items-center gap-4">
            <Link href="/explore">
              <motion.div
                whileTap={{ scale: 0.92 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
              >
                <ArrowLeft className="h-4 w-4 text-white/60" />
              </motion.div>
            </Link>
            <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent)]" />
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 rounded-[0.85rem] border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
              >
                <PanelLeftOpen className="h-3.5 w-3.5" />
                Trilha
              </button>
            )}
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-white/30" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">Conteúdos</span>
            </div>
          </div>

          {/* Sidebar (desktop) + Rail + Conteúdo */}
          <div className={sidebarOpen ? 'lg:grid lg:grid-cols-[240px_1fr] lg:gap-5 lg:items-start' : ''}>
            {/* Sidebar — só em desktop quando aberta */}
            {sidebarOpen && (
              <div className="hidden lg:block">
                <WorkspaceSidebar
                  modules={MODULES}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            )}

            {/* Coluna direita: rail + conteúdo */}
            <div className="space-y-6">
              {/* Rail (com bolas) */}
              <ModuleRail modules={MODULES} activeIndex={activeIndex} onSelect={handleSelect} />

              {/* Module content */}
              <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={`module-${current.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease }}
                className="space-y-3"
              >
                {/* Module hero card */}
                <div className="ipb-card relative overflow-hidden rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
                  <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px silver-divider opacity-70" />
                  <div className="pointer-events-none absolute right-[8%] top-[20%] h-32 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_72%)] blur-2xl" />
                  <div className="pointer-events-none absolute left-[10%] bottom-0 h-20 w-32 rounded-full bg-[radial-gradient(circle,rgba(192,199,208,0.06)_0%,transparent_76%)] blur-2xl" />

                  <div className="flex items-start gap-5">
                    <div className="chrome-subtle flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem]">
                      {CurrentIcon && <CurrentIcon className="h-7 w-7 text-white/88" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-2 text-[9px] uppercase tracking-[0.44em] text-white/26">Módulo {current.id}</p>
                      <h3
                        className="text-[clamp(1.3rem,2.8vw,1.9rem)] font-semibold leading-tight tracking-[-0.01em] text-white/94"
                        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
                      >
                        {current.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-white/44">
                        {current.overview}
                      </p>
                    </div>
                    <div className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] px-2.5 py-1.5 md:flex">
                      <Radar className="h-3 w-3 text-white/42" />
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/38">{current.id}</span>
                    </div>
                  </div>
                </div>

                {/* Caderno + sidebar */}
                <div className="ipb-card relative overflow-hidden rounded-[2rem]">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px silver-divider opacity-40" />
                  <div className="p-5 md:p-6">
                    <CadernoModulePanel moduleId={current.id} />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.28, ease }}
                className="flex items-center justify-center rounded-[1.8rem] border border-white/[0.06] py-16"
                style={{ background: 'rgba(255,255,255,0.01)' }}
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <p
                    className="select-none text-[clamp(3rem,10vw,6rem)] font-semibold leading-none tracking-[-0.04em]"
                    style={{ color: 'rgba(255,255,255,0.05)', fontFamily: 'system-ui, sans-serif' }}
                  >
                    M?
                  </p>
                  <div className="h-px w-10 bg-white/12" />
                  <p className="text-[10px] uppercase tracking-[0.38em] text-white/28">Conteúdo clínico</p>
                  <p className="max-w-xs text-[13px] leading-relaxed text-white/44">
                    Selecione um módulo acima para abrir o caderno.
                  </p>
                </div>
              </motion.div>
            )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
