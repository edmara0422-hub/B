'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Brain, Heart, Wind, Radar, PanelLeftClose, PanelLeftOpen, Search, FileText } from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { CadernoModulePanel } from '@/components/caderno/caderno-module'
import { loadModuleContent } from '@/data/caderno-content-loader'

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

// ── Workspace Sidebar — lógica IPB Intelligence Kit ──────────────────────────
// Header label + busca · árvore hierárquica (módulo → tópicos) · estados ouro/prata.

type TopicSummary = { id: string; title: string }
type ModuleTopicsMap = Record<string, TopicSummary[]>

function WorkspaceSidebar({
  modules,
  activeIndex,
  topicsMap,
  activeTopicId,
  onSelectModule,
  onSelectTopic,
  onClose,
}: {
  modules: Module[]
  activeIndex: number | null
  topicsMap: ModuleTopicsMap
  activeTopicId: string | null
  onSelectModule: (i: number) => void
  onSelectTopic: (moduleIndex: number, topicId: string) => void
  onClose: () => void
}) {
  const [search, setSearch] = useState('')
  const q = search.toLowerCase().trim()

  return (
    <div
      className="ipb-soft flex h-full flex-col overflow-hidden rounded-[1.65rem] lg:h-[calc(100vh-9rem)]"
    >
      {/* Header: label + busca + close (lógica Intelligence Kit) — fixo no topo da sidebar */}
      <div
        className="shrink-0 rounded-t-[1.65rem] px-4 pb-3 pt-4"
        style={{ borderBottom: '1px solid rgba(210,175,90,0.12)' }}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-[0.44em] text-white/40">Trilha de Estudo</p>
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
            placeholder="Buscar módulo ou tópico..."
            className="flex-1 bg-transparent text-[11px] text-white/70 outline-none placeholder:text-white/25"
          />
        </div>
      </div>

      {/* Árvore: módulo (pai) → tópicos (filhos) — scroll interno (estilo Business) */}
      <div className="ipb-thinscroll flex-1 overflow-y-auto px-2 py-2">
        {modules.map((mod, idx) => {
          const isActive = activeIndex === idx
          const ModIcon = mod.icon
          const topics = topicsMap[mod.id] ?? []

          // Busca: aceita módulo OU tópico
          const modMatches =
            !q || mod.title.toLowerCase().includes(q) || mod.overview.toLowerCase().includes(q) || mod.id.toLowerCase().includes(q)
          const topicMatches = q
            ? topics.filter((t) => t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
            : topics
          const hasAnyMatch = modMatches || topicMatches.length > 0
          if (q && !hasAnyMatch) return null

          // SEMPRE expandido — usuário pediu pra ver TODOS os tópicos de todos os módulos
          // sem precisar clicar pra abrir. A sidebar rola natural se ficar maior que a tela.
          const visibleTopics = q ? topicMatches : topics

          return (
            <div key={mod.id}>
              {/* Hair-line separator entre módulos */}
              {idx > 0 && <div className="mx-3 my-2 h-px bg-white/[0.06]" />}

              {/* Linha do módulo (clicável) — ativo com border dourada */}
              <button
                onClick={() => onSelectModule(idx)}
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
                    {mod.id} · {topics.length || '…'} tópicos
                  </p>
                  <p
                    className={`truncate text-[11px] font-medium leading-snug ${
                      isActive ? 'text-white/92' : 'text-white/55'
                    }`}
                  >
                    {mod.title}
                  </p>
                </div>
                {/* Dot indicador (igual Intelligence Kit) */}
                <div
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${
                    isActive ? 'bg-[#d2af5a]' : 'bg-white/16'
                  }`}
                />
              </button>

              {/* Tópicos aninhados — SEMPRE visíveis (não é toggle) */}
              {visibleTopics.length > 0 && (
                <div className="relative mt-1.5 ml-[1.45rem] space-y-0.5 border-l border-white/[0.07] pl-2.5">
                  {visibleTopics.map((t, ti) => {
                    const isTopicActive = activeTopicId === t.id && isActive
                    return (
                      <button
                        key={t.id}
                        onClick={() => onSelectTopic(idx, t.id)}
                        className="flex w-full items-center gap-2 rounded-[0.7rem] px-2 py-1.5 text-left transition"
                        style={
                          isTopicActive
                            ? {
                                background: 'rgba(210,175,90,0.06)',
                                boxShadow: 'inset 0 0 0 1px rgba(210,175,90,0.18)',
                              }
                            : { background: 'transparent' }
                        }
                      >
                        <FileText
                          className={`h-3 w-3 shrink-0 ${isTopicActive ? 'text-[#d2af5a]' : 'text-white/28'}`}
                        />
                        <span
                          className={`shrink-0 font-mono text-[8.5px] tracking-[0.06em] ${
                            isTopicActive ? 'text-[#d2af5a]/70' : 'text-white/26'
                          }`}
                        >
                          {String(ti + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`truncate text-[10.5px] leading-snug ${
                            isTopicActive ? 'text-white/90' : 'text-white/52'
                          }`}
                        >
                          {t.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
              {/* Skeleton enquanto os tópicos ainda carregam */}
              {!q && topics.length === 0 && (
                <div className="ml-[1.45rem] mt-1.5 space-y-1 border-l border-white/[0.06] pl-2.5">
                  {[60, 80, 50].map((w, i) => (
                    <div
                      key={i}
                      className="h-[6px] rounded-full"
                      style={{ width: `${w}%`, background: 'rgba(255,255,255,0.05)' }}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
        {q && modules.every((m) => {
          const topics = topicsMap[m.id] ?? []
          const modOk = m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)
          const topicOk = topics.some((t) => t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
          return !modOk && !topicOk
        }) && (
          <p className="mt-4 px-3 text-[10px] text-white/30">Nenhum módulo ou tópico encontrado.</p>
        )}
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
    <div className="ipb-soft relative overflow-hidden rounded-[1.8rem] px-5 py-6 md:px-8">
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
  const [topicsMap, setTopicsMap] = useState<ModuleTopicsMap>({})
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null)

  // Mobile: fecha sidebar por padrão (desktop ≥ 1024px mantém aberto)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [])

  // Pré-carrega os títulos dos tópicos de cada módulo para a árvore da sidebar
  useEffect(() => {
    let cancelled = false
    MODULES.forEach((mod) => {
      loadModuleContent(mod.id).then((content) => {
        if (cancelled || !content) return
        setTopicsMap((prev) =>
          prev[mod.id]
            ? prev
            : { ...prev, [mod.id]: content.topics.map((t) => ({ id: t.id, title: t.title })) },
        )
      })
    })
    return () => {
      cancelled = true
    }
  }, [])

  const current = activeIndex !== null ? MODULES[activeIndex] : null
  const CurrentIcon = current?.icon

  function handleSelectModule(index: number) {
    if (activeIndex === index) {
      setActiveIndex(null)
      setActiveTopicId(null)
    } else {
      setActiveIndex(index)
      setActiveTopicId(null)
    }
  }

  function handleSelectTopic(moduleIndex: number, topicId: string) {
    setActiveIndex(moduleIndex)
    // Força re-trigger do useEffect no CadernoModulePanel mesmo se for o mesmo id
    setActiveTopicId(null)
    requestAnimationFrame(() => setActiveTopicId(topicId))
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <main className="relative z-10 px-2 pb-32 pt-8 md:px-4 md:pt-10">
        <div className="w-full space-y-6">

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

          {/* Sidebar (desktop) + Rail + Conteúdo — Intelligence Kit:
              280px largura, altura NATURAL (curta), todos os tópicos visíveis,
              página rola pra mostrar tudo. Header de busca sticky por dentro. */}
          <div className={sidebarOpen ? 'lg:grid lg:grid-cols-[280px_1fr] lg:gap-5 lg:items-start' : ''}>
            {/* Sidebar — drawer mobile + coluna desktop */}
            {sidebarOpen && (
              <>
                {/* Backdrop só no mobile pra fechar tocando fora */}
                <div
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                />
                {/* Sidebar: fixo (drawer) no mobile, relativo (grid) no desktop */}
                <div className="fixed inset-y-4 left-2 right-2 z-50 max-w-[320px] lg:relative lg:inset-auto lg:left-auto lg:right-auto lg:z-auto lg:max-w-none">
                  <WorkspaceSidebar
                    modules={MODULES}
                    activeIndex={activeIndex}
                    topicsMap={topicsMap}
                    activeTopicId={activeTopicId}
                    onSelectModule={handleSelectModule}
                    onSelectTopic={handleSelectTopic}
                    onClose={() => setSidebarOpen(false)}
                  />
                </div>
              </>
            )}

            {/* Coluna direita: rail + conteúdo */}
            <div className="space-y-6">
              {/* Rail (com bolas) */}
              <ModuleRail modules={MODULES} activeIndex={activeIndex} onSelect={handleSelectModule} />

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
                {/* Module hero card — ipb-soft puro (igual Home) */}
                <div className="ipb-soft relative overflow-hidden rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
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

                {/* Caderno + sidebar — ipb-soft puro (igual Home) */}
                <div className="ipb-soft relative overflow-hidden rounded-[2rem]">
                  <div className="p-5 md:p-6">
                    <CadernoModulePanel moduleId={current.id} openTopicId={activeTopicId} />
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
