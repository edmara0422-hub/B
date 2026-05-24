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
  Maximize2,
  HelpCircle,
  TrendingUp,
  Award,
  Shield,
  Users,
  Zap,
  Target,
  Layers
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

const MODULE_THEMES: Record<string, {
  primary: string
  secondary: string
  accent: string
  glow: string
  badgeBg: string
  badgeText: string
  gradient: string
}> = {
  M1: {
    primary: '#a855f7', // purple
    secondary: '#06b6d4', // cyan
    accent: 'rgba(168, 85, 247, 0.35)',
    glow: 'rgba(6, 182, 212, 0.18)',
    badgeBg: 'rgba(168, 85, 247, 0.14)',
    badgeText: '#c084fc',
    gradient: 'linear-gradient(90deg, #06b6d4 0%, #a855f7 100%)'
  },
  M2: {
    primary: '#3b82f6', // blue
    secondary: '#14b8a6', // teal
    accent: 'rgba(59, 82, 246, 0.35)',
    glow: 'rgba(20, 184, 166, 0.18)',
    badgeBg: 'rgba(59, 82, 246, 0.14)',
    badgeText: '#60a5fa',
    gradient: 'linear-gradient(90deg, #14b8a6 0%, #3b82f6 100%)'
  },
  M3: {
    primary: '#ef4444', // red
    secondary: '#10b981', // emerald
    accent: 'rgba(239, 68, 68, 0.35)',
    glow: 'rgba(16, 185, 129, 0.18)',
    badgeBg: 'rgba(239, 68, 68, 0.14)',
    badgeText: '#f87171',
    gradient: 'linear-gradient(90deg, #10b981 0%, #ef4444 100%)'
  },
  M4: {
    primary: '#d4b87a', // gold
    secondary: '#cbd5e1', // silver
    accent: 'rgba(212, 184, 122, 0.35)',
    glow: 'rgba(212, 184, 122, 0.18)',
    badgeBg: 'rgba(212, 184, 122, 0.14)',
    badgeText: '#d4b87a',
    gradient: 'linear-gradient(90deg, #cbd5e1 0%, #d4b87a 100%)'
  }
}

const ease = [0.16, 1, 0.3, 1] as const

// ── Sub-components from mockup ────────────────────────────────────────────────

function MiniNetworkGraph({ moduleId }: { moduleId?: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M4'] || MODULE_THEMES.M4
  const center = { x: 50, y: 50 }
  const nodes = [
    { x: 18, y: 25 }, { x: 82, y: 22 }, { x: 14, y: 70 },
    { x: 85, y: 75 }, { x: 50, y: 12 }, { x: 50, y: 88 },
  ]

  return (
    <div className="relative w-full h-[130px] rounded-lg overflow-hidden bg-radial-glow mt-2" style={{
      background: `radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 70%)`
    }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((n, i) => (
          <line
            key={`line-${i}`}
            x1={`${center.x}%`}
            y1={`${center.y}%`}
            x2={`${n.x}%`}
            y2={`${n.y}%`}
            stroke={`url(#lineGradient-${moduleId || 'M4'})`}
            strokeWidth="0.8"
            strokeDasharray="2 1"
          />
        ))}
        <defs>
          <linearGradient id={`lineGradient-${moduleId || 'M4'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.primary} stopOpacity="0.1" />
            <stop offset="50%" stopColor={theme.secondary} stopOpacity="0.45" />
            <stop offset="100%" stopColor={theme.primary} stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      <div 
        className="absolute w-3 h-3 rounded-full animate-pulse"
        style={{
          left: `calc(${center.x}% - 6px)`,
          top: `calc(${center.y}% - 6px)`,
          background: `radial-gradient(circle, ${theme.secondary}, ${theme.primary})`,
          boxShadow: `0 0 10px ${theme.primary}`,
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
            background: `radial-gradient(circle, ${theme.primary}, ${theme.secondary})`,
            boxShadow: `0 0 6px ${theme.accent}`,
            zIndex: 5
          }}
          whileHover={{ scale: 1.4, boxShadow: `0 0 10px ${theme.primary}` }}
        />
      ))}
    </div>
  )
}

function TelemetriaSparkline({ moduleId }: { moduleId?: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M4'] || MODULE_THEMES.M4
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
              className="w-1 rounded-t"
              style={{
                background: `linear-gradient(to top, ${theme.primary}, ${theme.secondary})`
              }}
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
            <linearGradient id={`sparkFill-${moduleId || 'M4'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.primary} stopOpacity="0.4"/>
              <stop offset="100%" stopColor={theme.primary} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,28 L12,22 L24,26 L36,15 L48,20 L60,10 L72,18 L84,8 L100,14 L100,40 L0,40 Z" fill={`url(#sparkFill-${moduleId || 'M4'})`}/>
          <path d="M0,28 L12,22 L24,26 L36,15 L48,20 L60,10 L72,18 L84,8 L100,14" fill="none" stroke={theme.primary} strokeWidth="1.4"/>
        </svg>
      </div>
    </div>
  )
}

function FloatingVideoPlayer({ moduleTitle, moduleId }: { moduleTitle: string; moduleId?: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M4'] || MODULE_THEMES.M4
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
    <div className="ipb-glass-card w-full flex flex-col pointer-events-auto transition-all duration-300">
      <div className="relative aspect-[16/10] bg-black/80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.glow}, transparent 70%)`
        }} />
        
        <motion.button 
          onClick={() => setPlaying(!playing)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${theme.accent} 0%, rgba(20,16,8,0.92) 100%)`,
            border: `0.2px solid ${theme.primary}`,
            boxShadow: `0 0 18px ${theme.accent}, inset 0 1px 1px rgba(255,255,255,0.2)`
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

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[8px] uppercase tracking-wider font-semibold animate-pulse" style={{ color: theme.primary }}>Vídeo Aula</span>
          <h4 className="text-[11px] font-semibold text-white/90 leading-tight mt-0.5">{moduleTitle}</h4>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center text-[9px] text-white/40 font-mono">
            <span>{playing ? 'Reproduzindo' : 'Pausado'}</span>
            <span>{Math.floor((progress/100)*45)}:10 / 45:10</span>
          </div>
          
          <div className="h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
            <div className="h-full transition-all duration-300" style={{ 
              width: `${progress}%`,
              background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
            }} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 py-2 text-white/40 border-t border-white/[0.04] bg-black/20">
        <button className="text-[9px] hover:text-white transition">⏮</button>
        <button 
          onClick={() => setPlaying(!playing)}
          className="text-[9px] bg-white/5 w-6 h-6 rounded-full flex items-center justify-center border border-white/10 text-white/90 transition"
          style={{
            borderColor: playing ? theme.primary : 'rgba(255,255,255,0.1)',
            background: playing ? `${theme.accent}` : 'rgba(255,255,255,0.05)'
          }}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <button className="text-[9px] hover:text-white transition">⏭</button>
      </div>
    </div>
  )
}

// ── Business Module Custom High-Fidelity Components ──────────────────────────

const BUSINESS_PLAYLIST = [
  {
    id: 'M4-T1',
    title: 'Inovação & Estratégia',
    subtitle: 'IE · Transformação Digital e Novos Negócios',
    duration: '42:10',
  },
  {
    id: 'M4-T2',
    title: 'Finanças & Inteligência Quantitativa',
    subtitle: 'FIQ · Valuation, Análise e Estatística',
    duration: '56:15',
  },
  {
    id: 'M4-T3',
    title: 'Liderança, Pessoas & Cultura',
    subtitle: 'LPC · Segurança Psicológica, DEI e Ética',
    duration: '38:40',
  },
  {
    id: 'M4-T4',
    title: 'Gestão & Operações Corporativas',
    subtitle: 'GOC · Métricas OKR e Economia Circular',
    duration: '34:25',
  },
  {
    id: 'M4-T5',
    title: 'Mercado & Macroeconomia',
    subtitle: 'MME · Ciclos de Mercado e Lógica Analítica',
    duration: '48:50',
  },
  {
    id: 'M4-T6',
    title: 'Impacto Social & Intervenção',
    subtitle: 'ISI · Projetos de Extensão e SROI',
    duration: '52:15',
  },
]

function ExecutiveMasterclassTheater({ 
  moduleTitle, 
  moduleId,
  onSelectTopic,
  activeTopicId
}: { 
  moduleTitle: string; 
  moduleId?: string;
  onSelectTopic?: (topicId: string) => void;
  activeTopicId?: string | null;
}) {
  const theme = MODULE_THEMES[moduleId ?? 'M4'] || MODULE_THEMES.M4
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(24)
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  // Sync with activeTopicId if set from outside
  useEffect(() => {
    if (activeTopicId) {
      const idx = BUSINESS_PLAYLIST.findIndex(item => item.id === activeTopicId)
      if (idx !== -1) {
        setActiveItemIndex(idx)
      }
    }
  }, [activeTopicId])

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4))
    }, 500)
    return () => clearInterval(interval)
  }, [playing])

  const activeLesson = BUSINESS_PLAYLIST[activeItemIndex]

  const handleLessonSelect = (index: number) => {
    setActiveItemIndex(index)
    setProgress(0)
    setPlaying(false)
    if (onSelectTopic) {
      onSelectTopic(BUSINESS_PLAYLIST[index].id)
    }
  }

  return (
    <div className="ipb-glass-card w-full flex flex-col pointer-events-auto transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-5 bg-black/60">
        
        {/* Visual Screen Area */}
        <div className="lg:col-span-3 relative aspect-[16/10] bg-black flex items-center justify-center overflow-hidden border-r border-white/[0.04]">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.glow}, transparent 80%)`
          }} />
          
          {playing && (
            <div className="absolute bottom-6 left-6 flex gap-1 items-end h-5 z-10 opacity-70">
              {[0.5, 0.9, 0.3, 0.7, 0.4, 0.8, 0.2].map((val, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 rounded-sm"
                  style={{ backgroundColor: theme.primary }}
                  animate={{ height: ['4px', '20px', '4px'] }}
                  transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          <div className="absolute top-4 left-4 z-10">
            <span className="text-[7px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-black/50 border border-white/10" style={{ color: theme.primary }}>
              Masterclass M4 · Aula {activeItemIndex + 1}
            </span>
          </div>

          <motion.button 
            onClick={() => setPlaying(!playing)}
            whileHover={{ scale: 1.08, boxShadow: `0 0 24px ${theme.accent}` }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: `radial-gradient(circle at 30% 25%, ${theme.accent} 0%, rgba(15,12,8,0.95) 100%)`,
              border: `0.5px solid ${theme.primary}`,
              boxShadow: `0 0 20px ${theme.accent}, inset 0 1px 1px rgba(255,255,255,0.2)`
            }}
          >
            {playing ? (
              <div className="flex gap-1.5 justify-center items-center">
                <div className="w-1.5 h-4 bg-white/90 rounded-sm" />
                <div className="w-1.5 h-4 bg-white/90 rounded-sm" />
              </div>
            ) : (
              <Play className="h-5 w-5 text-white/95 fill-white/80 ml-1" />
            )}
          </motion.button>
        </div>

        {/* Playlist Panel */}
        <div className="lg:col-span-2 flex flex-col border-t lg:border-t-0 border-white/[0.04] bg-black/40 h-full max-h-[300px] lg:max-h-[none] overflow-y-auto ipb-thinscroll">
          <div className="px-4 py-3 border-b border-white/[0.04] bg-black/30 flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Conteúdo da Trilha</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">{BUSINESS_PLAYLIST.length} Aulas</span>
          </div>
          <div className="flex-1 divide-y divide-white/[0.02]">
            {BUSINESS_PLAYLIST.map((item, idx) => {
              const isSelected = idx === activeItemIndex
              const isGold = idx % 2 === 0
              const itemColor = isGold ? '#d4b87a' : '#cbd5e1'
              const itemBgSelected = isGold ? 'rgba(212,184,122,0.08)' : 'rgba(203,213,225,0.08)'
              const itemBgHover = isGold ? 'hover:bg-[#d4b87a]/[0.02]' : 'hover:bg-[#cbd5e1]/[0.02]'
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleLessonSelect(idx)}
                  className={`w-full text-left p-3.5 flex gap-3 transition-all duration-200 cursor-pointer relative pl-5 ${itemBgHover}`}
                  style={{
                    background: isSelected ? itemBgSelected : 'transparent',
                    borderLeft: `3px solid ${isSelected ? itemColor : 'rgba(255,255,255,0.02)'}`
                  }}
                >
                  <span className="font-mono text-[9px] mt-0.5" style={{ color: isSelected ? itemColor : 'rgba(255,255,255,0.3)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-semibold truncate leading-tight ${isSelected ? 'text-white' : 'text-white/60'}`}>
                      {item.title}
                    </p>
                    <p className="text-[8.5px] text-white/30 truncate mt-0.5 leading-normal">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0 self-center">
                    <span className="text-[8px] font-mono text-white/30">
                      {item.duration}
                    </span>
                    <span className="text-[6.5px] tracking-wider px-1 py-0.2 rounded font-mono uppercase scale-90 border" style={{
                      background: `${itemColor}10`,
                      borderColor: `${itemColor}20`,
                      color: itemColor
                    }}>
                      {isGold ? 'OURO · T' + (idx + 1) : 'PRATA · T' + (idx + 1)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Control bar and timeline progress */}
      <div className="p-4 flex flex-col justify-between bg-black/30 border-t border-white/[0.04]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="min-w-0">
            <span className="text-[7.5px] uppercase tracking-widest font-bold" style={{ color: theme.primary }}>Execução de Masterclass</span>
            <h4 className="text-[11.5px] font-bold text-white/90 leading-tight mt-0.5 truncate">{activeLesson.title}</h4>
            <p className="text-[9px] text-white/40 truncate mt-0.5">{activeLesson.subtitle}</p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0 mt-2 md:mt-0">
            <div className="flex justify-between items-center text-[9px] text-white/40 font-mono gap-3">
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8.5px]" style={{ color: playing ? theme.primary : 'inherit' }}>
                {playing ? 'Reproduzindo' : 'Pausado'}
              </span>
              <span>{Math.floor((progress/100)*35)}:14 / {activeLesson.duration}</span>
            </div>
          </div>
        </div>
        
        {/* Timeline Bar */}
        <div className="mt-3 relative">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
            <div className="h-full transition-all duration-300" style={{ 
              width: `${progress}%`,
              background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ExecutivePerformanceDashboard({ moduleId }: { moduleId?: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M4'] || MODULE_THEMES.M4
  const [activeKpi, setActiveKpi] = useState<'ie' | 'fiq' | 'lpc' | 'goc' | 'mme' | 'isi'>('ie')

  const kpis = {
    ie: {
      title: 'Inovação & Estratégia',
      metric: '94.2%',
      desc: 'Competitividade e Transformação Digital',
      detail: 'Mapeamento de modelagens disruptivas e agilidade cultural corporativa baseada em novas tecnologias.',
      badge: 'Transformação Exponencial',
      icon: Zap,
      subjects: [
        'Inovação, Criatividade e Sustentabilidade',
        'Inovação, Transformação e Ferramentas Digitais',
        'Pensamento Criativo',
        'Empreendedorismo e Inovação',
        'Empreendedorismo e Estratégia'
      ],
      progress: '94.2%'
    },
    fiq: {
      title: 'Finanças & Quantitativa',
      metric: '+18.4%',
      desc: 'Valuation, Margens e Decisões Financeiras',
      detail: 'Análise de investimentos sob incerteza mercadológica, otimização marginal e modelagens de demonstrações contábeis robustas.',
      badge: 'High ROI & Margins',
      icon: TrendingUp,
      subjects: [
        'Finanças Avançadas',
        'Análise Financeira',
        'Matemática Financeira',
        'Demonstrações Contábeis',
        'Precificação',
        'Cálculo Aplicado a Negócios',
        'Análise Estatística'
      ],
      progress: '85%'
    },
    lpc: {
      title: 'Liderança, Pessoas & Cultura',
      metric: 'AAA',
      desc: 'Segurança Psicológica, DEI e Ética de Liderança',
      detail: 'Construção de times de alta performance fundamentados em transparência extrema, equidade social e conduta ética Tone-from-the-Top.',
      badge: 'Cultura Altamente Segura',
      icon: Users,
      subjects: [
        'Liderança e Gestão de Equipes',
        'Mercado e Pessoas',
        'Educação, Identidade e Solidariedade',
        'Ética'
      ],
      progress: '100%'
    },
    goc: {
      title: 'Gestão & Operações',
      metric: '91.5%',
      desc: 'Balanced Scorecard, OKRs e Circularidade',
      detail: 'Desenho de processos táticos altamente eficientes com acompanhamento de metas ágeis e transições completas para a economia circular.',
      badge: 'Operação de Alta Eficiência',
      icon: Target,
      subjects: [
        'Fundamentos de Gestão',
        'Gestão de Negócios',
        'Sustentabilidade em Negócios'
      ],
      progress: '91.5%'
    },
    mme: {
      title: 'Mercado & Macroeconomia',
      metric: 'A+',
      desc: 'Ciclos Monetários e Análise de Ecossistema',
      detail: 'Compreensão aprofundada de concorrência setorial, forças mercadológicas de Porter e proteção contra oscilações de juros ou PIBs globais.',
      badge: 'Inteligência de Mercado',
      icon: Shield,
      subjects: [
        'Economia de Empresa e Análise Mercadológica',
        'Ambiente Macroeconômico',
        'Lógica e Humanidades',
        'Filosofia'
      ],
      progress: '93%'
    },
    isi: {
      title: 'Impacto Social & Intervenção',
      metric: '88.6%',
      desc: 'Projetos Transversais e SROI Sustentável',
      detail: 'Solução tática de mazelas comunitárias através de extensão social ativa e pesquisas científicas de validação estatística de campo.',
      badge: 'Social Impact Certified',
      icon: Award,
      subjects: [
        'Pesquisa Aplicada a Negócios',
        'Projeto de Intervenção em Negócios',
        'Empreendedorismo Social',
        'Intervenção e Sociedade',
        'Teologia e Sociedade',
        'Pesquisa e Identidade',
        'Leitura e Escrita Acadêmica'
      ],
      progress: '88.6%'
    }
  }

  const ActiveIcon = kpis[activeKpi].icon

  return (
    <div className="ipb-glass-card p-4 flex flex-col justify-between h-full transition-all duration-300">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[7.5px] uppercase tracking-wider font-bold" style={{ color: theme.primary }}>KPIs Estratégicos</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#d4b87a]/10 border border-[#d4b87a]/20 text-[#d4b87a] font-mono">Executive Mode</span>
        </div>
        <h4 className="text-[12px] font-bold text-white/90 mt-1">Indicadores de Competência (30 Disciplinas)</h4>
      </div>

      {/* Grid: 2 rows of 3 columns for 6 KPIs */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {Object.entries(kpis).map(([key, kpi]) => {
          const isSelected = activeKpi === key
          const Icon = kpi.icon
          return (
            <button
              key={key}
              onClick={() => setActiveKpi(key as any)}
              className="p-2 rounded-lg border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer"
              style={{
                background: isSelected ? 'rgba(212,184,122,0.08)' : 'rgba(255,255,255,0.01)',
                borderColor: isSelected ? theme.primary : 'rgba(255,255,255,0.04)',
                boxShadow: isSelected ? `0 0 12px ${theme.glow}` : 'none'
              }}
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-[7px] uppercase tracking-wider text-white/35 font-bold truncate max-w-[80px]">
                  {kpi.title.split(' ')[0]}
                </span>
                <Icon className="h-2.5 w-2.5 opacity-30" style={{ color: theme.primary }} />
              </div>
              <span className="text-[12.5px] font-extrabold text-white mt-1 leading-none">{kpi.metric}</span>
              <div className="w-full h-0.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  className="h-full" 
                  style={{ backgroundColor: theme.primary }}
                  initial={{ width: 0 }}
                  animate={{ width: kpi.progress.includes('%') ? kpi.progress : '90%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* KPI Dynamic Details with Subject List Tags */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKpi}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-4 p-3.5 rounded-lg bg-black/40 border border-white/[0.04] flex flex-col gap-1.5"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ActiveIcon className="h-3.5 w-3.5" style={{ color: theme.primary }} />
              <span className="text-[9.5px] font-bold text-white/80">{kpis[activeKpi].title}</span>
            </div>
            <span className="text-[7.5px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40">
              {kpis[activeKpi].badge}
            </span>
          </div>
          <span className="text-[8px] font-mono text-white/35">{kpis[activeKpi].desc}</span>
          <p className="text-[9.5px] text-white/50 leading-relaxed text-justify mt-1 border-b border-white/[0.04] pb-2" style={{ borderBottom: '0.2px solid rgba(255,255,255,0.04)' }}>
            {kpis[activeKpi].detail}
          </p>
          
          {/* Subjects Sub-list */}
          <div className="mt-1.5">
            <span className="text-[7px] uppercase tracking-widest text-[#d4b87a] font-bold block mb-1">Disciplinas Integradas ({kpis[activeKpi].subjects.length})</span>
            <div className="flex flex-wrap gap-1 max-h-[72px] overflow-y-auto ipb-thinscroll pr-1">
              {kpis[activeKpi].subjects.map((sub, sIdx) => (
                <span 
                  key={sIdx} 
                  className="text-[7.5px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 hover:text-white transition duration-150"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  )
}

const STRATEGIC_NODES = [
  { id: 'N1', label: 'Liderança', x: 18, y: 22, desc: 'Comportamento regulatório & clareza de OKRs de alta performance' },
  { id: 'N2', label: 'Segurança', x: 34, y: 72, desc: 'Segurança psicológica (Modelo Aristotle do Google)' },
  { id: 'N3', label: 'Dados', x: 50, y: 28, desc: 'Inteligência competitiva & modelagem preditiva baseada em dados' },
  { id: 'N4', label: 'ESG', x: 66, y: 68, desc: 'Mitigação rigorosa de riscos ambientais, sociais e de governança' },
  { id: 'N5', label: 'Governança', x: 82, y: 24, desc: 'Controle de documentação, conformidade regulatória e LGPD' },
]

function StrategicRoadmapBoard({ moduleId }: { moduleId?: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M4'] || MODULE_THEMES.M4
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <div className="relative w-full h-[142px] rounded-lg overflow-hidden bg-radial-glow mt-2" style={{
      background: `radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 80%)`
    }}>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 18,33 Q 26,70 34,108 T 50,42 T 66,102 T 82,36"
          fill="none"
          stroke={`url(#pathGradient-${moduleId || 'M4'})`}
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />

        <defs>
          <linearGradient id={`pathGradient-${moduleId || 'M4'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.primary} stopOpacity="0.2" />
            <stop offset="50%" stopColor={theme.secondary} stopOpacity="0.7" />
            <stop offset="100%" stopColor={theme.primary} stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <div 
        className="absolute w-2 h-2 rounded-full animate-pulse"
        style={{
          left: `calc(50% - 4px)`,
          top: `calc(32% - 4px)`,
          background: `radial-gradient(circle, ${theme.secondary}, ${theme.primary})`,
          boxShadow: `0 0 12px ${theme.primary}`,
          zIndex: 10
        }}
      />

      {STRATEGIC_NODES.map((node, i) => {
        const isHovered = hoveredNode === node.id
        return (
          <div key={node.id}>
            
            <motion.div
              className="absolute w-3.5 h-3.5 rounded-full cursor-pointer flex items-center justify-center border"
              animate={{ scale: isHovered ? 1.3 : [1, 1.08, 1] }}
              transition={{ duration: isHovered ? 0.2 : 2.5 + i * 0.3, repeat: isHovered ? 0 : Infinity, ease: 'easeInOut' }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                left: `calc(${node.x}% - 7px)`,
                top: `calc(${node.y}% - 7px)`,
                borderColor: isHovered ? theme.primary : 'rgba(255,255,255,0.2)',
                background: isHovered 
                  ? `radial-gradient(circle, ${theme.primary} 0%, rgba(20,16,8,0.95) 100%)` 
                  : `radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(10,10,10,0.9) 100%)`,
                boxShadow: isHovered 
                  ? `0 0 14px ${theme.accent}, inset 0 1px 1px rgba(255,255,255,0.2)` 
                  : `0 0 6px rgba(0,0,0,0.5)`,
                zIndex: 15
              }}
            >
              <span className="text-[6.5px] font-bold" style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                {i + 1}
              </span>
            </motion.div>

            <span 
              className="absolute text-[7.5px] font-medium tracking-wide pointer-events-none text-center select-none"
              style={{
                left: `${node.x}%`,
                top: `calc(${node.y}% + 9px)`,
                transform: 'translateX(-50%)',
                color: isHovered ? '#fff' : 'rgba(255,255,255,0.3)',
                fontWeight: isHovered ? 700 : 500
              }}
            >
              {node.label}
            </span>

          </div>
        )
      })}

      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-2 inset-x-2 p-2 rounded bg-black/85 border border-[#d4b87a]/30 backdrop-blur-md z-20 flex flex-col gap-0.5"
          >
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-white uppercase tracking-wider">
                Fluxo {STRATEGIC_NODES.findIndex(n => n.id === hoveredNode) + 1}: {STRATEGIC_NODES.find(n => n.id === hoveredNode)?.label}
              </span>
              <span className="text-[7px] font-mono text-[#d4b87a] font-semibold">Foco Estratégico</span>
            </div>
            <p className="text-[8.5px] text-white/70 leading-snug">
              {STRATEGIC_NODES.find(n => n.id === hoveredNode)?.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

function ExecutiveStudyBriefing({
  moduleId,
  activeTopicId,
  activeTheme
}: {
  moduleId: string
  activeTopicId: string | null
  activeTheme: any
}) {
  const [module, setModule] = useState<any>(null)
  const [showFullSummary, setShowFullSummary] = useState(false)

  useEffect(() => {
    import('@/data/caderno-content-m4').then(m => {
      setModule(m.M4_CONTENT)
    })
  }, [])

  if (!module) return <div className="h-48 flex items-center justify-center text-white/30 font-mono text-[10px]">Carregando briefing estratégico...</div>

  const resolvedTopicId = activeTopicId || module.topics[0]?.id || ''
  const activeTopic = module.topics.find((t: any) => t.id === resolvedTopicId) ?? module.topics[0]

  if (!activeTopic) return null

  const slideBlocks = activeTopic.blocks.filter((b: any) => b.type === 'slides')
  const textBlocks = activeTopic.blocks.filter((b: any) => b.type === 'text')

  return (
    <div className="ipb-soft relative overflow-hidden rounded-[2rem] p-6 space-y-6">
      
      {/* Top strategic header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] flex-wrap gap-3" style={{ borderBottom: '0.2px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#d4b87a]/10 border border-[#d4b87a]/20 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-[#d4b87a]" />
          </div>
          <div>
            <span className="text-[7.5px] uppercase tracking-[0.25em] font-bold text-[#d4b87a]">Estação de Inteligência Acadêmica</span>
            <h3 className="text-[14px] font-bold text-white/90 leading-none mt-0.5">Briefing Estratégico: {activeTopic.title}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowFullSummary(!showFullSummary)}
            className="flex items-center gap-1.5 font-mono text-[9px] bg-[#d4b87a]/10 hover:bg-[#d4b87a]/20 border border-[#d4b87a]/30 rounded px-2.5 py-1 text-[#d4b87a] cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(212,184,122,0.05)]"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{showFullSummary ? 'FECHAR SUMÁRIO GERAL' : 'SUMÁRIO GERAL (30 DISCIPLINAS)'}</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-[9px] text-white/35 bg-white/5 border border-white/10 rounded px-2.5 py-1">
            <Clock className="h-3 w-3 text-[#d4b87a]" />
            <span>Etapa M4 · T{module.topics.indexOf(activeTopic) + 1}</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showFullSummary && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 rounded-2xl bg-white/[0.01] border border-[#d4b87a]/20 relative overflow-hidden backdrop-blur-xl space-y-4"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)' }}
          >
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
              background: 'radial-gradient(circle at 50% 50%, #d4b87a, transparent 70%)'
            }} />
            
            <div className="flex justify-between items-center pb-2 border-b border-white/[0.06] flex-wrap gap-2">
              <div>
                <span className="text-[7.5px] uppercase tracking-wider font-bold text-[#d4b87a]">Mapeamento Completo</span>
                <h4 className="text-[12px] font-bold text-white/90">Sumário Geral do MBA Executive M4 (30 Disciplinas)</h4>
              </div>
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono">6 Pilares Acadêmicos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {module.topics.map((topic: any, tIdx: number) => {
                const isTopicGold = tIdx % 2 === 0
                const topicColor = isTopicGold ? '#d4b87a' : '#cbd5e1'
                
                return (
                  <div 
                    key={topic.id} 
                    className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.04] flex flex-col justify-between h-full hover:border-white/10 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[8px] font-mono" style={{ color: topicColor }}>PILAR 0{tIdx + 1}</span>
                        <span className="text-[7px] font-mono px-1 py-0.2 rounded" style={{
                          background: `${topicColor}10`,
                          border: `1px solid ${topicColor}20`,
                          color: topicColor
                        }}>
                          {isTopicGold ? 'GOLD' : 'SILVER'}
                        </span>
                      </div>
                      <h5 className="text-[10.5px] font-bold text-white/90 group-hover:text-white transition-colors">{topic.title}</h5>
                      
                      <ul className="space-y-2 mt-3 border-t border-white/[0.03] pt-3">
                        {topic.blocks.filter((b: any) => b.type === 'slides').map((block: any, bIdx: number) => {
                          const isSubGold = bIdx % 2 === 0
                          const subColor = isSubGold ? '#d4b87a' : '#cbd5e1'
                          
                          return (
                            <li key={block.id} className="flex items-start gap-2 text-[9.5px] text-white/60 leading-normal">
                              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: subColor }} />
                              <span className="hover:text-white transition-colors text-justify">{block.title}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Columns: Executive Briefing Deck & Notes */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          
          {/* Slides Executive Deck */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[8.5px] uppercase tracking-widest text-white/40 font-bold">Resumo Analítico (Diretoria)</span>
              <span className="text-[8.5px] font-mono text-white/35">Base Conceitual</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slideBlocks.map((block: any) => 
                block.slides.map((slide: any, idx: number) => (
                  <div 
                    key={`${block.id}-slide-${idx}`} 
                    className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-white/10 flex flex-col justify-between h-full group"
                    style={{
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.15)'
                    }}
                  >
                    <div className="absolute inset-0 opacity-[0.015] pointer-events-none group-hover:opacity-[0.03] transition-all" style={{
                      background: 'radial-gradient(circle at 0% 0%, #d4b87a, transparent 50%)'
                    }} />

                    <div>
                      <h4 className="text-[11.5px] font-bold text-white/90 leading-tight tracking-tight uppercase border-b border-white/[0.06] pb-1.5 w-full" style={{ borderBottom: '0.2px solid rgba(255,255,255,0.06)' }}>
                        {slide.title}
                      </h4>
                      <ul className="space-y-2 mt-3.5">
                        {slide.bullets.map((bullet: string, bIdx: number) => (
                          <li key={bIdx} className="text-[10px] text-white/55 leading-relaxed flex items-start gap-2 text-justify">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#d4b87a]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {slide.highlight && (
                      <div className="mt-4 rounded-xl p-3 bg-[#d4b87a]/5 border border-[#d4b87a]/15">
                        <p className="text-[9.5px] italic text-[#d4b87a]/70 leading-relaxed text-justify">
                          {slide.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Texts Extra Notes */}
          {textBlocks.length > 0 && (
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] relative overflow-hidden mt-2">
              <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{
                background: 'radial-gradient(circle at 100% 100%, #d4b87a, transparent 50%)'
              }} />
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-3.5 w-3.5 text-[#d4b87a]" />
                <span className="text-[8px] uppercase tracking-widest font-bold text-white/40">Notas de Implementação Operacional</span>
              </div>
              {textBlocks.map((block: any) => (
                <div key={block.id} className="space-y-1">
                  {block.title && <h5 className="text-[10.5px] font-bold text-white/80">{block.title}</h5>}
                  <p className="text-[10px] text-white/45 leading-relaxed text-justify">{block.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Strategic connection map & Pillars connected */}
        <div className="lg:col-span-1 flex flex-col justify-between p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            background: `radial-gradient(circle at 100% 0%, #d4b87a, transparent 50%)`
          }} />
          
          <div className="relative z-10 mb-2">
            <span className="text-[8px] uppercase tracking-wider font-bold text-[#d4b87a]">Fluxo de Valor</span>
            <h3 className="text-[13px] font-bold text-white/90 mt-0.5">Alinhamento Estratégico</h3>
            <p className="text-[10px] text-white/44 leading-relaxed text-justify mt-1">
              Mapeamento dinâmico das conexões táticas corporativas e fluxo de governança executiva.
            </p>
          </div>

          <div className="my-2">
            <StrategicRoadmapBoard moduleId="M4" />
          </div>
          
          {/* Pillars of Knowledge inside Connection Map */}
          <div className="pt-4 border-t border-white/[0.04]" style={{ borderTop: '0.2px solid rgba(255,255,255,0.04)' }}>
            <span className="text-[8px] uppercase tracking-wider font-bold text-white/30 block mb-2.5">Pilares Corporativos</span>
            <ul className="space-y-2">
              {activeTopic.title ? (
                // Highlight concepts matching active topic
                activeTopic.id === 'M4-T1' ? [
                  'Liderança de impacto e escuta ativa regulatória',
                  'Construção de segurança psicológica nos times',
                  'Redução de entropia e alinhamento de OKRs'
                ] : activeTopic.id === 'M4-T2' ? [
                  'Análise dinâmica de ecossistema concorrencial',
                  'Cultura orientada a dados (Data-Driven)',
                  'Matriz SWOT Dinâmica e 5 Forças de Porter'
                ] : activeTopic.id === 'M4-T3' ? [
                  'Mitigação de pegada de carbono operacional',
                  'Equidade social e direitos humanos na cadeia',
                  'Ética e compliance vinculados a metas executivas'
                ] : activeTopic.id === 'M4-T4' ? [
                  'Especificidade e foco em fatos observáveis',
                  'Modelo SBI (Situation-Behavior-Impact)',
                  'Feedback bidirecional contínuo de regulação'
                ] : [
                  'Classificação de dados sensíveis (confidencialidade)',
                  'Controle de versão unificado e segurança LGPD',
                  'Estruturação de repositórios baseados em RBAC'
                ]
              ).map((concept: string, idx: number) => (
                <li key={idx} className="text-[9.5px] text-white/55 flex items-start gap-2 text-justify">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#d4b87a]" />
                  <span className="leading-snug">{concept}</span>
                </li>
              )) : null}
            </ul>
          </div>
        </div>

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
    <div className="workspace-sidebar-stretch ipb-soft flex flex-col overflow-hidden rounded-[1.2rem] h-full lg:rounded-[1.65rem]">
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
  const activeTheme = current ? MODULE_THEMES[current.id] : MODULE_THEMES.M4
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
            background: ${activeTheme.gradient} !important;
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
            background: ${activeTheme.gradient} !important;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: 1;
          }
          .ipb-glass-card:hover {
            border-color: ${activeTheme.accent} !important;
            transform: translateY(-2px);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 36px rgba(0,0,0,0.75) !important;
          }
          .workspace-sidebar-stretch {
            height: 100% !important;
            min-height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
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
                      {current.id === 'M4' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-6 pb-6 items-stretch">
                          {/* Card 1: Masterclass playlist cinema spans 2 cols on lg screens */}
                          <div className="lg:col-span-2 flex">
                            <ExecutiveMasterclassTheater 
                              moduleTitle={current.title} 
                              moduleId={current.id} 
                              onSelectTopic={(topicId) => handleSelectTopic(activeIndex!, topicId)}
                              activeTopicId={activeTopicId}
                            />
                          </div>

                          {/* Card 2: Executive Performance Dashboard */}
                          <div className="lg:col-span-1 flex">
                            <ExecutivePerformanceDashboard moduleId={current.id} />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6 items-stretch">
                          {/* Card 1: Vídeo Aula */}
                          <div className="flex">
                            <FloatingVideoPlayer moduleTitle={current.title} moduleId={current.id} />
                          </div>

                          {/* Card 2: Sumário e Telemetria */}
                          <div className="ipb-glass-card p-4 flex flex-col justify-between">
                            <div>
                              <span className="text-[7.5px] uppercase tracking-wider font-medium" style={{ color: activeTheme.primary }}>Sumário</span>
                              <h4 className="text-xs font-semibold text-white/90 mt-1">Mapeamento e Telemetria</h4>
                            </div>
                            <TelemetriaSparkline moduleId={current.id} />
                          </div>
                        </div>
                      )}

                      {/* Material de Apoio Support Grid */}
                      <div className="border-t border-white/[0.04] px-6 py-5 bg-black/20">
                        <h4 className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-3">Material de Apoio</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          
                           {/* Tutor Card */}
                           <div className="ipb-glass-card p-3 flex items-center justify-between cursor-pointer group">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-all duration-300" style={{
                                 borderColor: activeTheme.accent,
                                 color: activeTheme.primary
                               }}>
                                 {current.id === 'M4' ? (
                                   <Briefcase className="h-4 w-4" />
                                 ) : (
                                   <Brain className="h-4 w-4" />
                                 )}
                               </div>
                               <div className="flex flex-col">
                                 <span className="text-[10.5px] font-semibold text-white/90 leading-tight">
                                   {current.id === 'M4' ? 'Executive Board Advisor IA' : 'Tutor Acadêmico IA'}
                                 </span>
                                 <span className="text-[9px] text-white/30">
                                   {current.id === 'M4' ? 'Briefing estratégico e mentoria de negócios' : 'Apoio clínico e cognitivo via IA'}
                                 </span>
                               </div>
                             </div>
                             <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-all" style={{ color: activeTheme.primary }} />
                           </div>

                          {/* Slides Card */}
                          <div className="ipb-glass-card p-3 flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-all duration-300" style={{
                                borderColor: activeTheme.accent,
                                color: activeTheme.primary
                              }}>
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10.5px] font-semibold text-white/90 leading-tight">Notas de Aula</span>
                                <span className="text-[9px] text-white/30">Esquemas e anotações resumidas</span>
                              </div>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-all" style={{ color: activeTheme.primary }} />
                          </div>

                        </div>
                      </div>

                    </div>

                    {/* Operational Notebook Content Viewer / Estação Unificada de Estudos */}
                    {current.id === 'M4' ? (
                      <ExecutiveStudyBriefing 
                        moduleId={current.id} 
                        activeTopicId={activeTopicId} 
                        activeTheme={activeTheme} 
                      />
                    ) : (
                      <div className="ipb-soft relative overflow-hidden rounded-[2rem]">
                        <div className="p-5 md:p-6">
                          
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                            
                            {/* Left Column: Fundamentos & Caderno (takes 2 cols) */}
                            <div className="lg:col-span-2 space-y-6">
                              
                              {/* Fundamentos Header & Overview */}
                              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.03]" style={{
                                  background: `radial-gradient(circle at 0% 0%, ${activeTheme.primary}, transparent 50%)`
                                }} />
                                
                                <div className="space-y-3 relative z-10">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[8px] uppercase tracking-wider font-bold" style={{ color: activeTheme.primary }}>Fundamentos</span>
                                    <span className="text-[9px] text-white/30 font-mono">{current.id} · Core Concepts</span>
                                  </div>
                                  <h3 className="text-base font-bold text-white/90">Conceito de {current.title}</h3>
                                  <p className="text-[11px] text-white/50 leading-relaxed">
                                    {current.overview}
                                  </p>
                                </div>
                              </div>

                              {/* Interactive Notebook */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-1">
                                  <BookOpen className="h-4 w-4" style={{ color: activeTheme.primary }} />
                                  <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">Caderno Interativo de Conteúdo</span>
                                </div>
                                <CadernoModulePanel moduleId={current.id} openTopicId={activeTopicId} />
                              </div>

                            </div>

                            {/* Right Column: Mapa de Conexões / Simulações (takes 1 col) */}
                            <div className="space-y-6 lg:sticky lg:top-4">
                              
                              {/* Connection Map & Simulation Panel */}
                              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex flex-col justify-between h-full relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.03]" style={{
                                  background: `radial-gradient(circle at 100% 0%, ${activeTheme.primary}, transparent 50%)`
                                }} />
                                
                                <div className="relative z-10 mb-4">
                                  <span className="text-[8px] uppercase tracking-wider font-bold" style={{ color: activeTheme.primary }}>
                                    {current.id === 'M4' ? 'Fluxo de Valor' : 'Mapa de Conexões'}
                                  </span>
                                  <h3 className="text-sm font-bold text-white/90 mt-1">
                                    {current.id === 'M4' ? 'Alinhamento Estratégico' : 'Rede Neuronal & Simulações'}
                                  </h3>
                                  <p className="text-[10.5px] text-white/44 leading-relaxed mt-1.5">
                                    {current.id === 'M4' 
                                      ? 'Mapeamento dinâmico das conexões táticas corporativas e fluxo de governança executiva.'
                                      : 'Estrutura neuronal dinâmica que simula o fluxo cognitivo e as correlações teóricas do módulo.'}
                                  </p>
                                </div>

                                {current.id === 'M4' ? (
                                  <StrategicRoadmapBoard moduleId={current.id} />
                                ) : (
                                  <MiniNetworkGraph moduleId={current.id} />
                                )}
                                
                                {/* Pillars of Knowledge inside Connection Map */}
                                <div className="mt-6 pt-4 border-t border-white/[0.04]">
                                  <span className="text-[8px] uppercase tracking-wider font-bold text-white/30 block mb-2.5">
                                    {current.id === 'M4' ? 'Pilares Corporativos' : 'Pilares do Conhecimento'}
                                  </span>
                                  <ul className="space-y-2">
                                    {current.concepts.map((concept, idx) => (
                                      <li key={idx} className="text-[9.5px] text-white/60 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: activeTheme.primary }} />
                                        <span className="leading-snug">{concept}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                            </div>

                          </div>

                        </div>
                      </div>
                    )}

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
