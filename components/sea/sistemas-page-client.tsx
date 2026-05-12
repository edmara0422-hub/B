'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calculator, FileText, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ProntuarioSystemPanel } from '@/components/sea/prontuario-system-panel'
import { VMSystemPanel } from '@/components/sea/vm-system-panel'

// ── Módulos de Sistemas ────────────────────────────────────────────────────────

type SystemModule = {
  id: string
  title: string
  icon: LucideIcon
  overview: string
  panel: () => React.ReactNode
}

const SYSTEMS: SystemModule[] = [
  {
    id: 'S1',
    title: 'Prontuário ICU',
    icon: FileText,
    overview: 'Registros clínicos, balanços, evolução, indicadores e exportação à beira do leito.',
    panel: () => <ProntuarioSystemPanel />,
  },
  {
    id: 'S2',
    title: 'Calculadoras',
    icon: Calculator,
    overview: 'Mecânica respiratória, complacência, RSBI, P/F, HACOR, SOFA, escalas funcionais e VM.',
    panel: () => <VMSystemPanel />,
  },
]

const ease = [0.16, 1, 0.3, 1] as const

// ── Workspace Sidebar — mesmo padrão do Intelligence Kit de Conteúdos ──────────

function WorkspaceSidebar({
  modules,
  activeIndex,
  onSelect,
  onClose,
}: {
  modules: SystemModule[]
  activeIndex: number | null
  onSelect: (i: number) => void
  onClose: () => void
}) {
  const [search, setSearch] = useState('')
  const q = search.toLowerCase().trim()

  return (
    <div
      className="ipb-soft flex flex-col overflow-hidden rounded-[1.65rem]"
      style={{ height: 'calc(100vh - 9rem)' }}
    >
      {/* Header fixo no topo da sidebar */}
      <div
        className="shrink-0 rounded-t-[1.65rem] px-4 pb-3 pt-4"
        style={{ borderBottom: '1px solid rgba(210,175,90,0.12)' }}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-[0.44em] text-white/40">Sistemas</p>
          <button
            onClick={onClose}
            title="Fechar sidebar"
            className="flex h-6 w-6 items-center justify-center rounded-[0.5rem] text-white/36 transition hover:bg-white/[0.08] hover:text-white/64"
          >
            <PanelLeftClose className="h-3.5 w-3.5" />
          </button>
        </div>
        {/* Busca */}
        <div
          className="flex items-center gap-2 rounded-[0.85rem] px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <Search className="h-3 w-3 shrink-0 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar sistema..."
            className="flex-1 bg-transparent text-[11px] text-white/70 outline-none placeholder:text-white/25"
          />
        </div>
      </div>

      {/* Lista de sistemas — scroll interno (estilo Business) */}
      <div className="ipb-thinscroll flex-1 overflow-y-auto px-2 py-2">
        {modules.map((mod, idx) => {
          const isActive = activeIndex === idx
          const ModIcon = mod.icon
          const matches =
            !q ||
            mod.title.toLowerCase().includes(q) ||
            mod.overview.toLowerCase().includes(q) ||
            mod.id.toLowerCase().includes(q)
          if (q && !matches) return null

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
                        border: '1px solid rgba(210,175,90,0.22)',
                        boxShadow: 'inset 0 1px 0 rgba(210,175,90,0.14)',
                      }
                    : { border: '1px solid transparent' }
                }
              >
                <ModIcon
                  className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-[#d2af5a]' : 'text-white/32'}`}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[9px] uppercase tracking-[0.22em] ${
                      isActive ? 'text-[#d2af5a]/60' : 'text-white/20'
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
                <div
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${
                    isActive ? 'bg-[#d2af5a]' : 'bg-white/16'
                  }`}
                />
              </button>
            </div>
          )
        })}
        {q &&
          modules.every(
            (m) =>
              !m.title.toLowerCase().includes(q) &&
              !m.overview.toLowerCase().includes(q) &&
              !m.id.toLowerCase().includes(q),
          ) && (
            <p className="mt-4 px-3 text-[10px] text-white/30">Nenhum sistema encontrado.</p>
          )}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SistemasPageClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const current = activeIndex !== null ? SYSTEMS[activeIndex] : null
  const CurrentIcon = current?.icon

  function handleSelect(index: number) {
    setActiveIndex(index)
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <main className="relative z-10 px-2 pb-32 pt-8 md:px-4 md:pt-10">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/explore">
              <motion.div
                whileTap={{ scale: 0.92 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/4 transition-colors hover:bg-white/8"
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
                Sistemas
              </button>
            )}
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-white/30" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">Sistemas</span>
            </div>
          </div>

          {/* Sidebar (desktop) + Conteúdo — Intelligence Kit: 280px largura, altura natural */}
          <div className={sidebarOpen ? 'lg:grid lg:grid-cols-[280px_1fr] lg:gap-5 lg:items-start' : ''}>
            {/* Sidebar — só em desktop quando aberta */}
            {sidebarOpen && (
              <div className="hidden lg:block">
                <WorkspaceSidebar
                  modules={SYSTEMS}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            )}

            {/* Coluna direita: hero + panel */}
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {current ? (
                  <motion.div
                    key={`system-${current.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease }}
                    className="space-y-3"
                  >
                    {/* Hero do sistema ativo — ipb-soft puro (igual Home) */}
                    <div className="ipb-soft relative overflow-hidden rounded-[2rem] px-6 py-6 md:px-8">
                      <div className="flex items-start gap-5">
                        <div className="chrome-subtle flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem]">
                          {CurrentIcon && <CurrentIcon className="h-7 w-7 text-white/88" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-2 text-[9px] uppercase tracking-[0.44em] text-white/26">Sistema {current.id}</p>
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
                      </div>
                    </div>

                    {/* Panel real (Prontuário ICU ou Calculadoras) — funções intactas */}
                    <div className="ipb-soft relative overflow-hidden rounded-[2rem]">
                      <div className="p-5 md:p-6">{current.panel()}</div>
                    </div>
                  </motion.div>
                ) : (
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
                        S?
                      </p>
                      <div className="h-px w-10 bg-white/12" />
                      <p className="text-[10px] uppercase tracking-[0.38em] text-white/28">Selecione um sistema</p>
                      <p className="max-w-xs text-[13px] leading-relaxed text-white/44">
                        Escolha um sistema na trilha lateral para abrir o painel.
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
