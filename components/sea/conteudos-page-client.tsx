'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Heart, 
  Wind, 
  Radar, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Search, 
  FileText, 
  Briefcase, 
  Play, 
  Bell, 
  Clock, 
  ChevronRight, 
  Maximize2 
} from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { CadernoModulePanel } from '@/components/caderno/caderno-module'
import { loadModuleContent } from '@/data/caderno-content-loader'
import { IpbBackground } from '@/components/sea/ipb-background'

// ── Module data ───────────────────────────────────────────────────────────────

type Module = {
  id: string
  title: string
  icon: LucideIcon
  overview: string
  eyebrow: string
  concepts: string[]
}

const MODULES: Module[] = [
  {
    id: 'M1',
    title: 'Neuro',
    icon: Brain,
    eyebrow: 'Neuroscience',
    overview: 'Plasticidade neural, mapas funcionais e correlações clínicas. Avaliação neurológica e reabilitação pós-AVC.',
    concepts: [
      'Plasticidade cortical e reorganização sináptica após lesão central',
      'Acoplamento neurovascular e suprimento hemodinâmico local',
      'Vias eferentes e regulação do tônus muscular na espasticidade'
    ]
  },
  {
    id: 'M2',
    title: 'Pneumo / VM',
    icon: Wind,
    eyebrow: 'Pulmonology',
    overview: 'Ventilação mecânica protetora, mecânica pulmonar, parâmetros ventilatórios e desmame.',
    concepts: [
      'Ventilação protetora sob restrição de pressão e complacência',
      'Troca gasosa, relação V/Q e shunt intrapulmonar em decúbito',
      'Desmame ventilatório orientado por índices preditivos e fisiológicos'
    ]
  },
  {
    id: 'M3',
    title: 'Cardio',
    icon: Heart,
    eyebrow: 'Cardiology',
    overview: 'ECG, hemodinâmica e reabilitação cardiovascular. Exercício supervisionado e protocolo cardíaco.',
    concepts: [
      'Fisiologia do esforço e consumo de oxigênio miocárdico',
      'Variabilidade da frequência cardíaca e modulação autonômica',
      'Protocolos de condicionamento seguro pós-infarto agudo'
    ]
  },
  {
    id: 'M4',
    title: 'BUSINESS',
    icon: Briefcase,
    eyebrow: 'Executive Business',
    overview: 'Liderança executiva de alta performance, inteligência competitiva de mercado, ESG corporativo, cultura de feedback e governança de arquivos.',
    concepts: [
      'Liderança de impacto e construção de segurança psicológica',
      'Inteligência competitiva baseada em modelagem de dados',
      'ESG e sustentabilidade corporativa como mitigação de riscos'
    ]
  },
]

const ease = [0.16, 1, 0.3, 1] as const

// ── Sub-components from mockup ────────────────────────────────────────────────

function MiniNetworkGraph() {
  const center = { x: 50, y: 50 }
  const nodes = [
    { x: 18, y: 25 }, { x: 82, y: 22 }, { x: 14, y: 70 },
    { x: 85, y: 75 }, { x: 50, y: 12 }, { x: 50, y: 88 },
  ]

  return (
    <div className="relative w-full h-[130px] rounded-lg overflow-hidden bg-radial-glow mt-2" style={{
      background: 'radial-gradient(circle at 50% 50%, rgba(212, 184, 122, 0.06) 0%, transparent 70%)'
    }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((n, i) => (
          <line
            key={`line-${i}`}
            x1={`${center.x}%`}
            y1={`${center.y}%`}
            x2={`${n.x}%`}
            y2={`${n.y}%`}
            stroke="url(#lineGradient)"
            strokeWidth="0.8"
            strokeDasharray="2 1"
          />
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(212, 184, 122, 0.1)" />
            <stop offset="50%" stopColor="rgba(212, 184, 122, 0.45)" />
            <stop offset="100%" stopColor="rgba(212, 184, 122, 0.1)" />
          </linearGradient>
        </defs>
      </svg>

      <div 
        className="absolute w-3 h-3 rounded-full"
        style={{
          left: `calc(${center.x}% - 6px)`,
          top: `calc(${center.y}% - 6px)`,
          background: 'radial-gradient(circle, #f4d03f, #d4b87a)',
          boxShadow: '0 0 10px rgba(212, 184, 122, 0.8)',
          zIndex: 10
        }}
      />

      {nodes.map((n, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full cursor-pointer"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            left: `calc(${n.x}% - 3px)`,
            top: `calc(${n.y}% - 3px)`,
            background: 'radial-gradient(circle, #d4b87a, #b8975a)',
            boxShadow: '0 0 6px rgba(212, 184, 122, 0.6)',
            zIndex: 5
          }}
          whileHover={{ scale: 1.4, boxShadow: '0 0 10px rgba(255,215,0,0.9)' }}
        />
      ))}
    </div>
  )
}

function TelemetriaSparkline() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="h-14 rounded-md border border-white/[0.06] bg-black/60 relative overflow-hidden flex items-center justify-between px-3">
        <div className="flex flex-col">
          <span className="text-[7.5px] uppercase tracking-wider text-white/30">Mapeamento</span>
          <span className="text-[10px] font-semibold text-white/80">98.4% ativo</span>
        </div>
        <div className="flex gap-1 items-end h-8">
          {[40, 60, 45, 75, 55, 90, 70, 85, 95].map((h, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-t bg-gradient-to-t from-[#b8975a] to-[#d4b87a]"
              initial={{ height: 2 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
      <div className="h-[46px] w-full">
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4b87a" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#d4b87a" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,28 L12,22 L24,26 L36,15 L48,20 L60,10 L72,18 L84,8 L100,14 L100,40 L0,40 Z" fill="url(#sparkFill)"/>
          <path d="M0,28 L12,22 L24,26 L36,15 L48,20 L60,10 L72,18 L84,8 L100,14" fill="none" stroke="#d4b87a" strokeWidth="1.4"/>
        </svg>
      </div>
    </div>
  )
}

function FloatingVideoPlayer({ moduleTitle }: { moduleTitle: string }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(36)

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
    }, 500)
    return () => clearInterval(interval)
  }, [playing])

  return (
    <div className="ipb-glass-card w-[260px] flex flex-col pointer-events-auto shadow-2xl transition-all duration-300">
      <div className="relative aspect-[16/10] bg-black/80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,184,122,0.15),transparent_70%)]" />
        
        <motion.button 
          onClick={() => setPlaying(!playing)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: 'radial-gradient(circle at 30% 25%, rgba(212,184,122,0.35) 0%, rgba(212,184,122,0.18) 50%, rgba(20,16,8,0.92) 100%)',
            border: '0.2px solid rgba(212, 184, 122, 0.5)',
            boxShadow: '0 0 18px rgba(212,184,122,0.38), inset 0 1px 1px rgba(255,235,180,0.30)'
          }}
        >
          {playing ? (
            <div className="flex gap-1 justify-center items-center">
              <div className="w-1 h-3 bg-white/90 rounded-sm" />
              <div className="w-1 h-3 bg-white/90 rounded-sm" />
            </div>
          ) : (
            <div className="w-0 h-0 border-l-[9px] border-l-white/90 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5" />
          )}
        </motion.button>
      </div>

      <div className="p-3 flex flex-col">
        <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-medium">Vídeo Aula</span>
        <h4 className="text-[11px] font-semibold text-white/90 leading-tight mt-0.5">{moduleTitle}</h4>
        
        <div className="flex justify-between items-center text-[9px] text-white/40 mt-3 font-mono">
          <span>{playing ? 'Reproduzindo' : 'Pausado'}</span>
          <span>{Math.floor((progress/100)*45)}:10 / 45:10</span>
        </div>
        
        <div className="h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#b8975a] to-[#d4b87a] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 py-2 text-white/40 border-t border-white/[0.04] bg-black/20">
        <button className="text-[9px] hover:text-white transition">⏮</button>
        <button 
          onClick={() => setPlaying(!playing)}
          className="text-[9px] bg-white/5 hover:bg-[#d4b87a]/15 hover:border-[#d4b87a]/40 w-6 h-6 rounded-full flex items-center justify-center border border-white/10 text-white/90 transition"
        >
          {playing ? '⏸' : '▶'}
        </button>
        <button className="text-[9px] hover:text-white transition">⏭</button>
      </div>
    </div>
  )
}

// ── Workspace Sidebar — lógica IPB Intelligence Kit ──────────────────────────

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
    <div className="ipb-soft flex flex-col overflow-hidden rounded-[1.2rem] h-full lg:rounded-[1.65rem]">
      {/* Header: label + busca + close */}
      <div
        className="shrink-0 rounded-t-[1.65rem] px-2 pb-2 pt-2.5 lg:px-4 lg:pb-3 lg:pt-4"
        style={{ borderBottom: '1px solid rgba(212,184,122,0.12)' }}
      >
        <div className="mb-2 flex items-center justify-between lg:mb-3">
          <p className="text-[7px] uppercase tracking-[0.22em] text-[#d4b87a] lg:text-[9px] lg:tracking-[0.44em]">Academic Trilha</p>
          <button
            onClick={onClose}
            title="Fechar sidebar"
            className="flex h-5 w-5 items-center justify-center rounded-[0.4rem] text-white/36 transition hover:bg-white/[0.08] hover:text-white/64 lg:h-6 lg:w-6 lg:rounded-[0.5rem]"
          >
            <PanelLeftClose className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
          </button>
        </div>
        {/* Busca */}
        <div
          className="hidden lg:flex items-center gap-2 rounded-[0.85rem] px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <Search className="h-3 w-3 shrink-0 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="flex-1 bg-transparent text-[11px] text-white/70 outline-none placeholder:text-white/25"
          />
        </div>
      </div>

      {/* Árvore */}
      <div className="ipb-thinscroll flex-1 overflow-y-auto px-2 py-2">
        {modules.map((mod, idx) => {
          const isActive = activeIndex === idx
          const ModIcon = mod.icon
          const topics = topicsMap[mod.id] ?? []

          const modMatches =
            !q || mod.title.toLowerCase().includes(q) || mod.overview.toLowerCase().includes(q) || mod.id.toLowerCase().includes(q)
          const topicMatches = q
            ? topics.filter((t) => t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
            : topics
          const hasAnyMatch = modMatches || topicMatches.length > 0
          if (q && !hasAnyMatch) return null

          const visibleTopics = q ? topicMatches : topics

          return (
            <div key={mod.id}>
              {idx > 0 && <div className="mx-3 my-2 h-px bg-white/[0.06]" />}

              <button
                onClick={() => onSelectModule(idx)}
                className="module-item flex w-full items-center gap-1.5 rounded-[0.8rem] px-2 py-1.5 text-left transition lg:gap-2 lg:rounded-[0.9rem] lg:px-2 lg:py-1.5"
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, rgba(212,184,122,0.12), rgba(20,16,8,0.7))',
                        border: '1px solid rgba(212,184,122,0.32)',
                        boxShadow: 'inset 0 1px 0 rgba(212,184,122,0.18)',
                      }
                    : { border: '1px solid transparent' }
                }
              >
                <div className={`module-icon flex h-6 w-6 items-center justify-center rounded-[6px] shrink-0 ${isActive ? 'bg-[#d4b87a]/15 text-[#d4b87a]' : 'bg-white/5 text-white/32'}`}>
                  <ModIcon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[7px] uppercase tracking-[0.16em] lg:text-[8px] lg:tracking-[0.22em] ${
                      isActive ? 'text-[#d4b87a]/80' : 'text-white/20'
                    }`}
                  >
                    {mod.id} · {topics.length || '…'}
                  </p>
                  <p
                    className={`hidden lg:block truncate text-[9.5px] font-medium leading-snug lg:text-[10px] ${
                      isActive ? 'text-white/92' : 'text-white/55'
                    }`}
                  >
                    {mod.title}
                  </p>
                </div>
                <div
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${
                    isActive ? 'bg-[#d4b87a] shadow-[0_0_6px_rgba(212,184,122,0.8)]' : 'bg-white/16'
                  }`}
                />
              </button>

              {visibleTopics.length > 0 && (
                <div className="relative mt-1 ml-[0.9rem] space-y-0.5 border-l border-white/[0.07] pl-1.5 lg:mt-1.5 lg:ml-[1.45rem] lg:pl-2.5">
                  {visibleTopics.map((t, ti) => {
                    const isTopicActive = activeTopicId === t.id && isActive
                    return (
                      <button
                        key={t.id}
                        onClick={() => onSelectTopic(idx, t.id)}
                        className="flex w-full items-center gap-1 rounded-[0.5rem] px-1.5 py-1 text-left transition lg:gap-1.5 lg:rounded-[0.6rem] lg:px-1.5 lg:py-1"
                        style={
                          isTopicActive
                            ? {
                                background: 'rgba(212,184,122,0.06)',
                                boxShadow: 'inset 0 0 0 1px rgba(212,184,122,0.18)',
                              }
                            : { background: 'transparent' }
                        }
                      >
                        <FileText
                          className={`h-2.5 w-2.5 shrink-0 lg:h-3 lg:w-3 ${isTopicActive ? 'text-[#d4b87a]' : 'text-white/28'}`}
                        />
                        <span
                          className={`shrink-0 font-mono text-[7px] tracking-[0.04em] lg:text-[7.5px] lg:tracking-[0.06em] ${
                            isTopicActive ? 'text-[#d4b87a]/70' : 'text-white/26'
                          }`}
                        >
                          {String(ti + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`hidden lg:inline truncate text-[8.5px] leading-snug lg:text-[9.5px] ${
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
    <div className="ipb-soft relative overflow-hidden rounded-[1.8rem] px-5 py-6 md:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[0.7rem] border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <BookOpen className="h-4 w-4 text-[#d4b87a]" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4b87a]">Trilha de Módulos</span>
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-white/30 uppercase">{modules.length} Módulos</span>
      </div>

      {/* Rail nodes */}
      <div className="relative px-2 md:px-4">
        {/* Horizontal glowing line */}
        <div className="pointer-events-none absolute inset-x-0 top-[2.25rem] h-[1px]" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(200,205,215,0.10) 8%, rgba(212,184,122,0.28) 35%, rgba(212,184,122,0.40) 50%, rgba(212,184,122,0.28) 65%, rgba(200,205,215,0.10) 92%, transparent 100%)'
        }} />

        <div className="relative flex items-start justify-between gap-2 md:gap-4">
          {modules.map((module, index) => {
            const active = index === activeIndex
            const done = activeIndex !== null && index < activeIndex
            const ModuleIcon = module.icon

            return (
              <button
                key={module.id}
                onClick={() => onSelect(index)}
                className="group flex min-w-0 flex-1 flex-col items-center gap-2 text-center cursor-pointer"
                title={module.title}
              >
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 md:h-11 md:w-11"
                    style={
                      active
                        ? {
                            borderColor: 'rgba(212, 184, 122, 0.55)',
                            background: 'radial-gradient(circle at 30% 28%, rgba(212,184,122,0.55) 0%, rgba(212,184,122,0.35) 45%, rgba(40,28,8,0.95) 100%)',
                            boxShadow: '0 0 16px rgba(212, 184, 122, 0.32), 0 0 32px rgba(212, 184, 122, 0.16), inset 0 0.2px 0.2px rgba(255,235,180,0.32)',
                            color: '#fff',
                          }
                        : done
                        ? {
                            borderColor: 'rgba(212, 184, 122, 0.32)',
                            background: 'linear-gradient(180deg, rgba(212,184,122,0.20) 0%, rgba(20,16,8,0.92) 100%)',
                            color: 'rgba(255,255,255,0.85)',
                          }
                        : {
                            borderColor: 'rgba(200,205,215,0.14)',
                            background: 'linear-gradient(180deg, rgba(200,205,215,0.10) 0%, rgba(20,22,28,0.92) 100%)',
                            color: 'rgba(255,255,255,0.5)',
                          }
                    }
                  >
                    <ModuleIcon className="h-3.5 w-3.5" />
                  </motion.div>
                </div>

                <div
                  className="h-1.5 w-1.5 rounded-full transition-all duration-300 mt-1"
                  style={
                    active
                      ? { background: '#d4b87a', boxShadow: '0 0 8px rgba(212,184,122,0.8)' }
                      : done
                      ? { background: 'rgba(212,184,122,0.45)' }
                      : { background: 'rgba(200,205,215,0.20)' }
                  }
                />

                <span
                  className="max-w-[5rem] text-center text-[9px] leading-tight tracking-[0.06em] mt-1 transition-colors duration-200"
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
  const [clockTime, setClockTime] = useState('14:45')

  // Real-time clock update (mounting only)
  useEffect(() => {
    const update = () => {
      const d = new Date()
      setClockTime(
        String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
      )
    }
    update()
    const timer = setInterval(update, 10000)
    return () => clearInterval(timer)
  }, [])

  // Dynamic loader
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
    setActiveTopicId(null)
    requestAnimationFrame(() => setActiveTopicId(topicId))
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Space environment starry background */}
      <IpbBackground subtle={true} />

      {/* Embedded CSS rules for premium glass and borders */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .ipb-soft {
            background: rgba(5, 5, 5, 0.45) !important;
            backdrop-filter: blur(28px) saturate(130%) !important;
            -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
            border: none !important;
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            box-shadow: 
              inset 0 1px 0 rgba(255, 255, 255, 0.06),
              inset 0 -1px 0 rgba(0, 0, 0, 0.85),
              0 12px 40px rgba(0, 0, 0, 0.75) !important;
            transition: all .3s cubic-bezier(.22,.61,.36,1);
          }
          .ipb-soft::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 20px;
            padding: 1.2px;
            background: linear-gradient(90deg, #cbd5e1 0%, #d4b87a 100%) !important;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: 1;
          }
          .ipb-glass-card {
            background: rgba(5, 5, 5, 0.45) !important;
            backdrop-filter: blur(28px) saturate(130%) !important;
            -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
            border: none !important;
            border-radius: 14px;
            position: relative;
            overflow: hidden;
            box-shadow: 
              inset 0 1px 0 rgba(255, 255, 255, 0.05),
              inset 0 -1px 0 rgba(0, 0, 0, 0.8),
              0 8px 32px rgba(0, 0, 0, 0.6) !important;
            transition: all .3s ease;
          }
          .ipb-glass-card::before {
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
          .ipb-glass-card:hover {
            border-color: rgba(212,184,122,0.35) !important;
            transform: translateY(-2px);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 36px rgba(0,0,0,0.75) !important;
          }
        `
      }} />

      <main className="relative z-10 px-2 pb-32 pt-8 md:px-4 md:pt-10">
        <div className="w-full space-y-6">

          {/* Back + Title Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/explore">
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
                >
                  <ArrowLeft className="h-4 w-4 text-white/60" />
                </motion.div>
              </Link>
              <div className="h-px w-24 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent)]" />
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-2 rounded-[0.85rem] border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
                >
                  <PanelLeftOpen className="h-3.5 w-3.5" />
                  Trilha
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#d4b87a]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4b87a]">Academic Cockpit</span>
            </div>
          </div>

          {/* Content Layout */}
          <div className={sidebarOpen ? 'grid grid-cols-[86px_1fr] items-stretch gap-2 sm:grid-cols-[140px_1fr] sm:gap-3 lg:grid-cols-[240px_1fr] lg:gap-4' : ''}>
            
            {/* Left Sidebar */}
            {sidebarOpen && (
              <WorkspaceSidebar
                modules={MODULES}
                activeIndex={activeIndex}
                topicsMap={topicsMap}
                activeTopicId={activeTopicId}
                onSelectModule={handleSelectModule}
                onSelectTopic={handleSelectTopic}
                onClose={() => setSidebarOpen(false)}
              />
            )}

            {/* Right Container: Rail + Dynamic Cockpit */}
            <div className="min-w-0 flex flex-col gap-6">
              
              {/* Timeline Track */}
              <ModuleRail modules={MODULES} activeIndex={activeIndex} onSelect={handleSelectModule} />

              <AnimatePresence mode="wait">
                {current ? (
                  <motion.div
                    key={`module-${current.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease }}
                    className="space-y-4"
                  >
                    
                    {/* Premium Cockpit Dashboard */}
                    <div className="ipb-soft flex flex-col">
                      
                      {/* Sub-Header / Topbar */}
                      <div className="flex items-center justify-between px-6 py-3.5 border-bottom border-white/[0.04]" style={{ borderBottom: '0.2px solid rgba(255,255,255,0.04)' }}>
                        <div className="flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-widest">
                          <Radar className="h-3.5 w-3.5 text-[#d4b87a]" />
                          <span>Operational Module System</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Live Clock */}
                          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-[10px] font-mono text-white/80">
                            <Clock className="h-3 w-3 text-[#d4b87a]" />
                            <span>{clockTime}</span>
                          </div>
                          {/* Notifications */}
                          <div className="relative w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 cursor-pointer hover:text-white transition">
                            <Bell className="h-3.5 w-3.5" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#d4b87a] shadow-[0_0_5px_rgba(212,184,122,0.8)]" />
                          </div>
                          {/* User Avatar */}
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-1.5 pr-3 py-1 cursor-pointer hover:border-white/20 transition">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#cbd5e1] to-[#d4b87a] flex items-center justify-center text-black text-[9px] font-bold">
                              A
                            </div>
                            <span className="text-[10px] font-medium text-white/80">A. Silva</span>
                          </div>
                        </div>
                      </div>

                      {/* Hero Section */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 pt-6 pb-4">
                        <div className="flex items-center gap-4">
                          {/* Hero Module Orb */}
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              background: 'radial-gradient(circle at 30% 25%, rgba(212,184,122,0.35) 0%, rgba(212,184,122,0.20) 50%, rgba(20,16,8,0.95) 100%)',
                              border: '0.2px solid rgba(212, 184, 122, 0.40)',
                              boxShadow: 'inset 0 1px 1px rgba(255,235,180,0.22), 0 0 16px rgba(212,184,122,0.18)'
                            }}
                          >
                            <span className="text-[12px] font-bold text-white tracking-wider">{current.id}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-[#d4b87a] uppercase tracking-[0.25em] font-semibold">{current.eyebrow}</span>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 leading-tight mt-0.5">
                              {current.title}
                            </h1>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-full md:w-48">
                            <Search className="h-3 w-3 text-white/30 shrink-0" />
                            <input 
                              placeholder="Buscar no caderno..." 
                              className="bg-transparent border-0 outline-none text-[10px] text-white/70 placeholder:text-white/20 w-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sub-cards Dashboard Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr_1fr] gap-4 px-6 pb-6 relative items-stretch">
                        
                        {/* Card 1: Conceitos */}
                        <div className="ipb-glass-card p-4 flex flex-col justify-between">
                          <div>
                            <span className="text-[7.5px] uppercase tracking-wider text-[#d4b87a] font-medium">Fundamentos</span>
                            <h4 className="text-xs font-semibold text-white/90 mt-1 mb-2">Conceito de {current.title}</h4>
                            <p className="text-[10px] text-white/40 leading-relaxed">
                              {current.overview}
                            </p>
                          </div>
                          <ul className="mt-3 space-y-1.5 border-t border-white/[0.04] pt-3">
                            {current.concepts.map((concept, idx) => (
                              <li key={idx} className="text-[9px] text-white/50 flex items-start gap-1.5">
                                <span className="text-[#d4b87a] mt-0.5">•</span>
                                <span>{concept}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Card 2: Mapa Mental (Network Connections Graph) */}
                        <div className="ipb-glass-card p-4 flex flex-col justify-between">
                          <div>
                            <span className="text-[7.5px] uppercase tracking-wider text-[#d4b87a] font-medium">Mapa de Conexões</span>
                            <h4 className="text-xs font-semibold text-white/90 mt-1">Rede Neuronal de Conhecimento</h4>
                          </div>
                          <MiniNetworkGraph />
                        </div>

                        {/* Card 3: Telemetria / Indicadores */}
                        <div className="ipb-glass-card p-4 flex flex-col justify-between">
                          <div>
                            <span className="text-[7.5px] uppercase tracking-wider text-[#d4b87a] font-medium">Indicadores</span>
                            <h4 className="text-xs font-semibold text-white/90 mt-1">Mapeamento e Telemetria</h4>
                          </div>
                          <TelemetriaSparkline />
                        </div>

                        {/* Floating Interactive Video Player */}
                        <div className="md:absolute md:-right-4 md:top-[8px] md:z-20 md:pointer-events-none flex justify-center w-full md:w-auto mt-4 md:mt-0">
                          <FloatingVideoPlayer moduleTitle={current.title} />
                        </div>
                      </div>

                      {/* Material de Apoio Support Grid */}
                      <div className="border-t border-white/[0.04] px-6 py-5 bg-black/20">
                        <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-3">Material de Apoio</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          
                          {/* PDF Card */}
                          <div className="ipb-glass-card p-3 flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#d4b87a]/10 border border-[#d4b87a]/30 flex items-center justify-center text-[#d4b87a] group-hover:bg-[#d4b87a]/20 transition-all duration-300">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10.5px] font-semibold text-white/90 leading-tight">PDF Complementar</span>
                                <span className="text-[9px] text-white/30">Documentação técnica PDF</span>
                              </div>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 text-[#d4b87a] opacity-50 group-hover:opacity-100 transition-all" />
                          </div>

                          {/* Slides Card */}
                          <div className="ipb-glass-card p-3 flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#d4b87a]/10 border border-[#d4b87a]/30 flex items-center justify-center text-[#d4b87a] group-hover:bg-[#d4b87a]/20 transition-all duration-300">
                                <Maximize2 className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10.5px] font-semibold text-white/90 leading-tight">Slides Expositivos</span>
                                <span className="text-[9px] text-white/30">Apresentação e esquemas</span>
                              </div>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 text-[#d4b87a] opacity-50 group-hover:opacity-100 transition-all" />
                          </div>

                          {/* Quiz Card */}
                          <div className="ipb-glass-card p-3 flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#d4b87a]/10 border border-[#d4b87a]/30 flex items-center justify-center text-[#d4b87a] group-hover:bg-[#d4b87a]/20 transition-all duration-300">
                                <Radar className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10.5px] font-semibold text-white/90 leading-tight">Quiz de Revisão</span>
                                <span className="text-[9px] text-white/30">Autoavaliação e fixação</span>
                              </div>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 text-[#d4b87a] opacity-50 group-hover:opacity-100 transition-all" />
                          </div>

                        </div>
                      </div>

                    </div>

                    {/* Operational Notebook Content Viewer */}
                    <div className="ipb-soft relative overflow-hidden rounded-[2rem]">
                      <div className="p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/[0.04] pb-3">
                          <BookOpen className="h-4 w-4 text-[#d4b87a]" />
                          <span className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">Caderno Interativo de Conteúdo</span>
                        </div>
                        <CadernoModulePanel moduleId={current.id} openTopicId={activeTopicId} />
                      </div>
                    </div>

                  </motion.div>
                ) : (
                  /* Elegant Empty State */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.28, ease }}
                    className="flex flex-1 items-center justify-center rounded-[1.8rem] min-h-[360px]"
                    style={{ 
                      background: 'rgba(5, 5, 5, 0.45)', 
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}
                  >
                    <div className="flex flex-col items-center gap-4 text-center p-6">
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-2"
                      >
                        <BookOpen className="h-7 w-7 text-[#d4b87a]" />
                      </motion.div>
                      <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <p className="text-[10px] uppercase tracking-[0.38em] text-[#d4b87a] font-semibold">Plataforma Acadêmica IPB</p>
                      <p className="max-w-xs text-[12px] leading-relaxed text-white/44">
                        Selecione um dos módulos acadêmicos acima na trilha para inicializar o cockpit operacional e carregar o caderno de estudos.
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
