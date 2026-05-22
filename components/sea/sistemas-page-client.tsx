'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Calculator, Cpu, FileText, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ProntuarioSystemPanel } from '@/components/sea/prontuario-system-panel'
import { VMSystemPanel } from '@/components/sea/vm-system-panel'
import { ICUSystemPanel } from '@/components/sea/icu-system-panel'

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
    title: 'IPB ICU',
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
  {
    id: 'S3',
    title: 'Referência Clínica',
    icon: BookOpen,
    overview: 'Protocolos, condutas e fluxos clínicos organizados por sistema — referência rápida à beira do leito.',
    panel: () => <ICUSystemPanel />,
  },
]

type SidebarGroup = {
  id: string
  label: string
  code: string
  items: {
    id: string
    title: string
    desc?: string
    isClinical?: boolean
    clinicalIndex?: number
  }[]
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    id: 'clin',
    code: 'CLIN',
    label: 'CLÍNICO',
    items: [
      { id: 'S1', title: 'IPB ICU', desc: 'S1 · Módulo Clínico', isClinical: true, clinicalIndex: 0 },
      { id: 'S2', title: 'Calculadoras', desc: 'S2 · Módulo Clínico', isClinical: true, clinicalIndex: 1 },
      { id: 'S3', title: 'Referência Clínica', desc: 'S3 · Módulo Clínico', isClinical: true, clinicalIndex: 2 },
    ]
  },
  {
    id: 'sig',
    code: 'SIG',
    label: 'GERENCIAL',
    items: [
      { id: 'sig-pessoas', title: 'Pessoas', desc: 'Líderes & Gestores' },
      { id: 'sig-mercado', title: 'Mercado', desc: 'Panorama Cruzado' },
      { id: 'sig-esg', title: 'ESG', desc: 'Sustentabilidade & Governança' },
      { id: 'sig-feedback', title: 'Feedback & NPS', desc: 'Cultura & Feedback' },
      { id: 'arquivos', title: 'Arquivos', desc: 'Relatórios do Cockpit' },
    ]
  },
  {
    id: 'sie',
    code: 'SIE',
    label: 'ESTRATÉGICO',
    items: [
      { id: 'meu-negocio', title: 'Meu Negócio', desc: 'Runway · OKRs · TRL' },
      { id: 'sie-forecast', title: 'Cenários & Forecast', desc: 'Planejamento e forecast' },
      { id: 'sie-inovacao', title: 'Inovação', desc: 'Ambiente P&D' },
      { id: 'sie-canvas', title: 'Canvas & Pitch', desc: 'Modelo Canvas' },
    ]
  },
  {
    id: 'sio',
    code: 'SIO',
    label: 'OPERACIONAL',
    items: [
      { id: 'sio-ia', title: 'IA Advisor', desc: 'Análise de dados preditivos' },
      { id: 'sio-finance', title: 'Cockpit Financeiro', desc: 'Liquidez e despesas' },
      { id: 'sio-pricing', title: 'Smart Pricing', desc: 'Estratégia de preços' },
      { id: 'sio-processos', title: 'Processos', desc: 'Fluxogramas e SOPs' },
    ]
  },
  {
    id: 'comp',
    code: 'COMP',
    label: 'COMPLIANCE',
    items: [
      { id: 'comp-denuncias', title: 'Canal de Denúncias', desc: 'Governança IPB' },
      { id: 'comp-governanca', title: 'Governança', desc: 'Políticas & Contratos' },
    ]
  }
]

const ease = [0.16, 1, 0.3, 1] as const

// ── Workspace Sidebar — padrão Accordion Premium da NASA ──────────

function WorkspaceSidebar({
  activeNavId,
  onSelectNav,
  onClose,
}: {
  activeNavId: string
  onSelectNav: (id: string, clinicalIndex?: number) => void
  onClose: () => void
}) {
  const [search, setSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState<string | null>('clin')
  const q = search.toLowerCase().trim()

  return (
    <div className="ipb-soft flex flex-col overflow-hidden rounded-[1.2rem] h-full lg:rounded-[1.65rem] border border-white/[0.04]">
      {/* Header: label + busca + close */}
      <div
        className="shrink-0 rounded-t-[1.65rem] px-2 pb-2 pt-2.5 lg:px-4 lg:pb-3 lg:pt-4"
        style={{ borderBottom: '1px solid rgba(210,175,90,0.12)' }}
      >
        <div className="mb-2 flex items-center justify-between lg:mb-3">
          <p className="text-[7px] uppercase tracking-[0.22em] text-white/40 lg:text-[9px] lg:tracking-[0.44em]">Sistemas</p>
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

      {/* Lista Accordion — scroll interno */}
      <div className="ipb-thinscroll flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {SIDEBAR_GROUPS.map((group) => {
          // Filtrar items por busca
          const filteredItems = group.items.filter(item => {
            if (!q) return true
            return (
              item.title.toLowerCase().includes(q) ||
              (item.desc && item.desc.toLowerCase().includes(q)) ||
              item.id.toLowerCase().includes(q)
            )
          })

          if (filteredItems.length === 0) return null

          const isExpanded = activeGroup === group.id || q.length > 0

          return (
            <div 
              key={group.id} 
              className={`sidebar-hexagon-group ${isExpanded ? 'active' : ''}`}
            >
              {/* Header do Acordeão */}
              <div 
                className={`hex-tab ${isExpanded ? 'active' : ''}`}
                onClick={() => setActiveGroup(isExpanded ? null : group.id)}
              >
                <div className="frame">
                  <div className="code">{group.code}</div>
                </div>
                <div className="name">{group.label}</div>
              </div>

              {/* Sub-itens */}
              <div className="sidebar-sub-menu w-full mt-2 space-y-1">
                {filteredItems.map((item) => {
                  const isActive = activeNavId === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectNav(item.id, item.clinicalIndex)}
                      className={`side-nav-item w-full ${isActive ? 'active' : ''}`}
                    >
                      <span className="bullet"></span>
                      <div className="info min-w-0">
                        <span className="label truncate">{item.title}</span>
                        {item.desc && <span className="desc truncate">{item.desc}</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Telemetry AI Gateway Mock */}
        <div className="telemetry-widget border border-white/[0.04] bg-black/25 mt-4">
          <div className="title-row flex justify-between items-center text-[7.5px] font-mono text-[#d4b87a] font-bold">
            <span>AI_GATEWAY</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#5dcaa5] animate-pulse"></span>
          </div>
          <div className="flex justify-between text-[7px] text-white/40 mt-1">
            <span>LATENCY</span>
            <b className="text-white/70">124ms</b>
          </div>
          <div className="flex justify-between text-[7px] text-white/40">
            <span>CACHE HIT</span>
            <b className="text-white/70">86.4%</b>
          </div>
          <div className="flex justify-between text-[7px] text-white/40">
            <span>SAVINGS</span>
            <b className="text-[#d4b87a]">$0.084</b>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SistemasPageClient() {
  const [activeNavId, setActiveNavId] = useState<string>('S1')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Encontrar o sistema clínico ativo (se houver)
  const currentClinicalIndex = SYSTEMS.findIndex(s => s.id === activeNavId)
  const current = currentClinicalIndex !== -1 ? SYSTEMS[currentClinicalIndex] : null
  const CurrentIcon = current?.icon

  // Encontrar o título do item ativo para o painel de integração
  let activeTitle = ''
  for (const group of SIDEBAR_GROUPS) {
    const item = group.items.find(i => i.id === activeNavId)
    if (item) {
      activeTitle = item.title
      break
    }
  }

  function handleSelectNav(id: string, clinicalIndex?: number) {
    setActiveNavId(id)
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

          {/* Sidebar lado-a-lado mobile e desktop */}
          <div className={sidebarOpen ? 'grid grid-cols-[100px_1fr] items-stretch gap-2 sm:grid-cols-[160px_1fr] sm:gap-3 lg:grid-cols-[240px_1fr] lg:gap-4' : ''}>
            {sidebarOpen && (
              <div className="sticky top-4 h-[calc(100vh-140px)]">
                <WorkspaceSidebar
                  activeNavId={activeNavId}
                  onSelectNav={handleSelectNav}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            )}

            {/* Coluna direita: hero + panel */}
            <div className="min-w-0 flex flex-col gap-3">
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
                    {/* Hero do sistema ativo */}
                    <div className="ipb-soft relative overflow-hidden rounded-[1.2rem] px-3 py-3 lg:rounded-[2rem] lg:px-6 lg:py-6 lg:md:px-8">
                      <div className="flex items-start gap-2 lg:gap-5">
                        <div className="chrome-subtle flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.8rem] lg:h-16 lg:w-16 lg:rounded-[1.4rem]">
                          {CurrentIcon && <CurrentIcon className="h-4 w-4 text-white/88 lg:h-7 lg:w-7" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-[7px] uppercase tracking-[0.22em] text-white/26 lg:mb-2 lg:text-[9px] lg:tracking-[0.44em]">Sistema {current.id}</p>
                          <h3
                            className="text-[12px] font-semibold leading-tight tracking-[-0.01em] text-white/94 lg:text-[clamp(1.3rem,2.8vw,1.9rem)]"
                            style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
                          >
                            {current.title}
                          </h3>
                          <p className="mt-1 max-w-xl text-[9px] leading-relaxed text-white/44 lg:mt-3 lg:text-[13px]">
                            {current.overview}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Panel real */}
                    <div className="relative">{current.panel()}</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`integration-${activeNavId}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease }}
                    className="space-y-3"
                  >
                    {/* Mock Corporate Integrated Panel */}
                    <div className="ipb-soft relative overflow-hidden rounded-[1.8rem] p-6 lg:p-8 border border-white/[0.06] min-h-[380px] flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-[#d4b87a] animate-pulse" />
                          <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4b87a]/80">Cockpit Geral · Módulo Integrado</p>
                        </div>
                        <h3 className="text-[16px] lg:text-2xl font-light text-white tracking-wide">{activeTitle}</h3>
                        <p className="text-[11px] lg:text-sm leading-relaxed text-white/50 max-w-xl">
                          Este módulo corporativo está ativo e em execução sincronizada com o Cockpit Geral (Tier II). Para visualização completa de dados, análise preditiva por inteligência bioneural, relatórios consolidados e ferramentas de auditoria ativa, acesse a central de controle de governança.
                        </p>
                      </div>

                      {/* Futuristic telemetry display */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.04] mt-8">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-white/30 font-mono">Status de Rede</p>
                          <p className="text-[11px] lg:text-xs font-semibold text-[#7fa37a] mt-1 font-mono">Sincronizado</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-white/30 font-mono">Maturidade BI</p>
                          <p className="text-[11px] lg:text-xs font-semibold text-white/80 mt-1 font-mono">94.8% (Tier II)</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-white/30 font-mono">Última Auditoria</p>
                          <p className="text-[11px] lg:text-xs font-semibold text-[#d4b87a] mt-1 font-mono">Hoje, 14:02</p>
                        </div>
                      </div>
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
