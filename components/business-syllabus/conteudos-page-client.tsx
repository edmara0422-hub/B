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
  Layers,
  MessageSquare,
  Send,
  Cpu,
  Calculator
} from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/authStore'
import { useAccessibility } from '@/hooks/use-accessibility'
import { CadernoModulePanel } from '@/components/caderno/caderno-module'
import { loadModuleContent } from '@/data/caderno-content-loader'
import { IpbBackground } from '@/components/business-syllabus/ipb-background'
import { 
  SimAlignIT, SimRogersReactor, SimNeuralMatrix, SimServerlessFlow,
  SimInnovationIgnition, SimHorizonsBalancer, SimPsychologicalShield, SimDataLakehouse,
  SimNeuroCreativity, SimIdeationFunnel, SimSixHatsMatrix,
  SimNestedSustainability, SimESGScanner, SimFrameworkConstellation, SimGreenwashingFilter, SimSMARTLock, SimBPMNFlow, SimCertGlobe,
  SimPDCACycle, SimBusinessCanvas, SimStrategicTripod, SimValueChain, SimTaxMatrix,
  SimAccountingLedger, SimBalanceScale, SimIncomeWaterfall, SimCashflowTanks, SimDoubleEntryOrbit,
  SimTimeDilator, SimCompoundGravity, SimVPLSpectrometer, SimCorporateGyroscope,
  SimMarketEras, SimValuePerception, SimNeedsDesiresDemand,
  SimLeadershipTheories, SimTuckmanModel, SimMotivationPsychology, SimCommunicationChannels, SimTeamDysfunctions, SimVUCALeadership,
  SimCriticalThinking, SimEthicsFrameworks, SimPoliticalPhilosophy, SimEasternAesthetics,
  SimCalculusOptimization, SimFinancialIntegrals, SimBreakEvenLeverage,
  SimStatisticalFoundations, SimHypothesisTesting, SimCohortStorytelling, SimMachineLearningPredictive,
  SimMintoPyramid, SimToulminModel, SimCriticalReadingSQ3R, SimDuarteStorytelling,
  SimEffectuationLogic, SimLeanStartupMVP, SimUnitEconomics, SimVCFundingJourney,
  SimMacroIndicatorsPanel, SimEconomicCyclesWave, SimBrazilStructuralChallenges, SimWorkforceFinanceSystem,
  SimFinancialAnalysisVH, SimValuationTriangulation, SimWorkingCapitalCycle, SimIntegratedDiagnostics
} from '@/components/business-syllabus/simulations-6d'
import { NEURO_SIMS } from '@/components/caderno/sim-registry-neuro'
import { RESPIRATORY_SIMS } from '@/components/caderno/sim-registry-respiratory'
import { TTSPlayer } from '@/components/business-syllabus/tts-player'
import { SUBJECTS_DB } from '@/data/caderno-content-m1-m8'

const SYLLABUS_TO_DB_MAP: Record<string, string> = {
  // Pilar Neuro (M1)
  'M1-T1-S1': 'N1-S1',
  'M1-T2-S1': 'N1-S2',
  'M1-T3-S1': 'N1-S3',
  'M1-T4-S1': 'N1-S4',
  'M2-T1-S1': 'P2-S1',
  'M2-T2-S1': 'P2-S2',
  'M2-T3-S1': 'P2-S3',
  'M2-T4-S1': 'P2-S4',
  'M2-T5-S1': 'P2-S5',
  'M2-T6-S1': 'P2-S6',
  'M2-T7-S1': 'P2-S7',
  'M2-T8-S1': 'P2-S8',
  'M2-T9-S1': 'P2-S9',
  'M2-T10-S1': 'P2-S10',
  'M2-T11-S1': 'P2-S11',
  'M2-T12-S1': 'P2-S12',
  'M2-T13-S1': 'P2-S13',
  'M2-T14-S1': 'P2-S14',

  // Pilar 1: Inovação e Estratégia
  'M4-T1-S1': 'M4-S1', // Inovação, Transformação e Ferramentas Digitais
  'M4-T1-S2': 'M4-T1-S2', // Pensamento Criativo
  'M4-T1-S3': 'M4-T1-S3', // Sustentabilidade em Negócios
  'M4-T1-S4': 'M4-T1-S4', // Gestão de Negócios
  'M4-T1-S5': 'M4-T1-S5', // Demonstrações Contábeis
  'M4-T1-S6': 'M4-T1-S6', // Matemática Financeira
  'M4-T1-S7': 'M4-T1-S7', // Economia de Empresa e Análise Mercadológica
  'M4-T1-S8': 'M4-T1-S8', // Liderança e Gestão de Equipes
  'M4-T1-S9': 'M4-T1-S9', // Filosofia Aplicada aos Negócios
  'M4-T1-S10': 'M4-T1-S10', // Cálculo Aplicado a Negócios
  'M4-T1-S11': 'M4-T1-S11', // Análise Estatística
  'M4-T1-S12': 'M4-T1-S12', // Leitura e Escrita Acadêmica
  'M4-T1-S13': 'M4-T1-S13', // Empreendedorismo e Inovação
  'M4-T1-S14': 'M4-T1-S14', // Ambiente Macroeconômico
  'M4-T1-S15': 'M4-T1-S15', // Novo Módulo 15
  'M4-T1-S16': 'M4-T1-S16', // Ética Empresarial
  'M4-T1-S17': 'M4-T1-S17', // Empreendedorismo Social
  'M4-T1-S18': 'M4-T1-S18', // Pesquisa Aplicada a Negócios
  
  // Pilar 2: Finanças e Inteligência Quantitativa
  'M4-T2-S1': 'M6-S1', // Análise Financeira (M6-S1 no BD)
  'M4-T2-S2': 'M4-T2-S2', // Análise Financeira
  'M4-T2-S3': 'M4-T1-S6', // Matemática Financeira
  'M4-T2-S4': 'M4-T1-S5', // Demonstrações Contábeis
  'M4-T2-S5': 'M6-S2', // Precificação (M6-S2 no BD)
  'M4-T2-S6': 'M4-S2', // Cálculo Aplicado a Negócios (M4-S2 no BD)
  'M4-T2-S7': 'M4-S3', // Análise Estatística (M4-S3 no BD)
  
  // Pilar 3: Liderança, Pessoas e Cultura
  'M4-T3-S1': 'M4-T3-S1', // Liderança e Gestão de Equipes
  'M4-T3-S2': 'M4-T3-S2', // Liderança e Gestão de Equipes
  'M4-T3-S3': 'M8-S1', // Educação, Identidade e Solidariedade (M8-S1 no BD)
  'M4-T3-S4': 'M6-S3', // Ética (M6-S3 no BD)
  
  // Pilar 4: Gestão e Operações Corporativas
  'M4-T4-S1': 'M4-T4-S1', // Gestão de Negócios
  'M4-T4-S2': 'M4-T4-S2', // Gestão de Negócios
  'M4-T4-S3': 'M1-S3', // Sustentabilidade em Negócios (M1-S3 no BD)
  
  // Pilar 5: Mercado e Macroeconomia
  'M4-T5-S1': 'M4-T5-S1', // Economia de Empresa e Análise Mercadológica
  'M4-T5-S2': 'M5-S3', // Ambiente Macroeconômico (M5-S3 no BD)
  'M4-T5-S3': 'M4-S1', // Filosofia (M4-S1 no BD)
  'M4-T5-S4': 'M4-S1', // Filosofia (M4-S1 no BD)
  
  // Pilar 6: Impacto Social e Intervenção
  'M4-T6-S1': 'M8-S2', // Pesquisa Aplicada a Negócios (M8-S2 no BD)
  'M4-T6-S2': 'M7-S3', // Projeto de Intervenção em Negócios (M7-S3 no BD)
  'M4-T6-S3': 'M7-S1', // Empreendedorismo Social (M7-S1 no BD)
  'M4-T6-S4': 'M7-S1', // Empreendedorismo Social (M7-S1 no BD)
  'M4-T6-S5': 'M7-S2', // Teologia e Sociedade (M7-S2 no BD)
  'M4-T6-S6': 'M8-S1', // Educação, Identidade e Solidariedade (M8-S1 no BD)
  'M4-T6-S7': 'M5-S1',

  // Pilar 7: SIG PESSOAS
  'M5-T1': 'sig-pessoas',
  'M5-T2': 'sig-pessoas',
  'M5-T3': 'sig-pessoas',
  'M5-T4': 'sig-pessoas',
  'M5-T5': 'sig-pessoas',
  'M5-T6': 'sig-pessoas',

}

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
    primary: '#2dd4bf', // soft mint/teal green
    secondary: '#14b8a6', // teal
    accent: 'rgba(45, 212, 191, 0.25)',
    glow: 'rgba(20, 184, 166, 0.12)',
    badgeBg: 'rgba(45, 212, 191, 0.10)',
    badgeText: '#2dd4bf',
    gradient: 'linear-gradient(90deg, #14b8a6 0%, #2dd4bf 100%)'
  },
  M2: {
    primary: '#38bdf8', // soft ice/sky blue
    secondary: '#0ea5e9', // sky blue
    accent: 'rgba(56, 189, 248, 0.25)',
    glow: 'rgba(14, 165, 233, 0.12)',
    badgeBg: 'rgba(56, 189, 248, 0.10)',
    badgeText: '#38bdf8',
    gradient: 'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%)'
  },
  M3: {
    primary: '#fb7185', // soft rose/coral red
    secondary: '#f43f5e', // rose red
    accent: 'rgba(251, 113, 133, 0.25)',
    glow: 'rgba(244, 63, 94, 0.12)',
    badgeBg: 'rgba(251, 113, 133, 0.10)',
    badgeText: '#fb7185',
    gradient: 'linear-gradient(90deg, #f43f5e 0%, #fb7185 100%)'
  },
  M4: {
    primary: '#d2af5a', // gold
    secondary: '#cbd5e1', // silver
    accent: 'rgba(201, 148, 58, 0.35)',
    glow: 'rgba(201, 148, 58, 0.18)',
    badgeBg: 'rgba(201, 148, 58, 0.14)',
    badgeText: '#d2af5a',
    gradient: 'linear-gradient(90deg, #cbd5e1 0%, #d2af5a 100%)'
  },
  M5: {
    primary: '#a855f7', // purple
    secondary: '#d8b4fe', // light purple
    accent: 'rgba(168, 85, 247, 0.25)',
    glow: 'rgba(168, 85, 247, 0.12)',
    badgeBg: 'rgba(168, 85, 247, 0.10)',
    badgeText: '#a855f7',
    gradient: 'linear-gradient(90deg, #d8b4fe 0%, #a855f7 100%)'
  }
}

const ease = [0.16, 1, 0.3, 1] as const

// ── Sub-components from mockup ────────────────────────────────────────────────

function MiniNetworkGraph({ moduleId }: { moduleId?: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M4'] || MODULE_THEMES.M4
  
  return (
    <div className="mt-2 flex flex-col gap-3">
      {/* Central Intelligence Board */}
      <div className="relative w-full rounded-xl overflow-hidden bg-[#0c0905]/80 border border-white/[0.04] p-4 flex flex-col justify-between backdrop-blur-md">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{
          background: `radial-gradient(circle at 100% 0%, ${theme.glow} 0%, transparent 60%)`
        }} />
        
        <div className="flex justify-between items-start z-10 mb-6">
          <div>
            <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/40 block mb-1">Processamento Cognitivo</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-mono font-black" style={{ color: theme.primary }}>98.4</span>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">TFlops</span>
            </div>
          </div>
          
          <div className="relative w-12 h-12 flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 rounded-full border border-white/5 border-t-[#d2af5a] [.theme-silver_&]:border-t-[#cbd5e1] border-r-[#d2af5a] [.theme-silver_&]:border-r-[#cbd5e1]"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div 
              className="absolute inset-2 rounded-full border border-white/10 border-b-[#d2af5a] [.theme-silver_&]:border-b-[#cbd5e1]"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-[#d2af5a] [.theme-silver_&]:bg-[#cbd5e1] shadow-[0_0_10px_#d2af5a] [.theme-silver_&]:shadow-[0_0_10px_#cbd5e1] animate-pulse" />
          </div>
        </div>

        <div className="z-10 space-y-3">
          {[
            { label: 'Análise Preditiva de Cenários', val: 94 },
            { label: 'Síntese de Modelos Mentais', val: 88 },
            { label: 'Mapeamento de Correlações', val: 99 }
          ].map((bar, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between items-center text-[8.5px] font-mono uppercase tracking-wider text-white/60">
                <span>{bar.label}</span>
                <span style={{ color: theme.primary }}>{bar.val}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.val}%` }}
                  transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
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

// ── Module Playlists ───────────────────────────────────────────────────────────────


const SIG_PESSOAS_PLAYLIST = [
  { id: 'M5-T1', topicId: 'sig-pessoas', title: 'Recrutamento e Formação', subtitle: 'Capítulo 1', duration: '15:00' },
  { id: 'M5-T2', topicId: 'sig-pessoas', title: 'Gestão, Delegação e 6D', subtitle: 'Capítulo 2', duration: '20:00' },
  { id: 'M5-T3', topicId: 'sig-pessoas', title: 'Equipe, Influência e OKRs', subtitle: 'Capítulo 3', duration: '18:00' },
  { id: 'M5-T4', topicId: 'sig-pessoas', title: 'Comportamento e Impacto', subtitle: 'Capítulo 4', duration: '22:00' },
  { id: 'M5-T5', topicId: 'sig-pessoas', title: 'Tuckman, Dados e ALX', subtitle: 'Capítulo 5', duration: '19:00' },
  { id: 'M5-T6', topicId: 'sig-pessoas', title: 'Comunicação e Conflitos', subtitle: 'Capítulo 6', duration: '25:00' }
]

const BUSINESS_PLAYLIST = [
  { id: 'M4-T1', topicId: 'M4-T1', title: 'Liderança e Gestão de Times', subtitle: 'Aula 01 · Estratégia de Equipes e Propósito', duration: '28:30' },
  { id: 'M4-T2', topicId: 'M4-T2', title: 'Inteligência de Mercado e Empresas', subtitle: 'Aula 02 · Concorrência e Análise do Ecossistema', duration: '32:15' },
  { id: 'M4-T3', topicId: 'M4-T3', title: 'Sustentabilidade e ESG Corporativo', subtitle: 'Aula 03 · Logística Reversa e Pegada Ecológica', duration: '25:40' },
  { id: 'M4-T4', topicId: 'M4-T4', title: 'Feedback Estratégico', subtitle: 'Aula 04 · Modelo SBI e Regulação de Performance', duration: '19:20' },
  { id: 'M4-T5', topicId: 'M4-T5', title: 'Gestão de Arquivos corporativos', subtitle: 'Aula 05 · Repositórios baseados em RBAC e Segurança', duration: '22:15' }
]

const PNEUMO_PLAYLIST = [
  { id: 'M2-T1', topicId: 'P2-S1', title: "Anatomofisiologia Respiratória", subtitle: 'Aula 01 · 12 slides · 3 simulações', duration: '20:00' },
  { id: 'M2-T2', topicId: 'P2-S2', title: "Zona Condutora e Respiratória", subtitle: 'Aula 02 · 20 slides · 2 simulações', duration: '20:00' },
  { id: 'M2-T3', topicId: 'P2-S3', title: "Mecânica Respiratória", subtitle: 'Aula 03 · 7 slides · 1 simulações', duration: '20:00' },
  { id: 'M2-T4', topicId: 'P2-S4', title: "Difusão e Transporte de Gases", subtitle: 'Aula 04 · 10 slides · 1 simulações', duration: '20:00' },
  { id: 'M2-T5', topicId: 'P2-S5', title: "Controle Respiratório", subtitle: 'Aula 05 · 7 slides · 1 simulações', duration: '20:00' },
  { id: 'M2-T6', topicId: 'P2-S6', title: "Volumes e Capacidades Pulmonares", subtitle: 'Aula 06 · 4 slides · 1 simulações', duration: '20:00' },
  { id: 'M2-T7', topicId: 'P2-S7', title: "Oxigenoterapia", subtitle: 'Aula 07 · 7 slides · 1 simulações', duration: '20:00' },
  { id: 'M2-T8', topicId: 'P2-S8', title: "Semiologia Pulmonar", subtitle: 'Aula 08 · 11 slides · 1 simulações', duration: '20:00' },
  { id: 'M2-T9', topicId: 'P2-S9', title: "Patologias Respiratórias", subtitle: 'Aula 09 · 0 slides · 0 simulações', duration: '20:00' },
  { id: 'M2-T10', topicId: 'P2-S10', title: "VNI — Ventilação Não Invasiva", subtitle: 'Aula 10 · 16 slides · 1 simulações', duration: '20:00' },
  { id: 'M2-T11', topicId: 'P2-S11', title: "VMI — Ventilação Mecânica Invasiva", subtitle: 'Aula 11 · 33 slides · 3 simulações', duration: '20:00' },
  { id: 'M2-T12', topicId: 'P2-S12', title: "Assincronias Paciente-Ventilador", subtitle: 'Aula 12 · 12 slides · 9 simulações', duration: '20:00' },
  { id: 'M2-T13', topicId: 'P2-S13', title: "Modalidades & Análise Gráfica", subtitle: 'Aula 13 · 12 slides · 5 simulações', duration: '20:00' },
  { id: 'M2-T14', topicId: 'P2-S14', title: "Desmame Ventilatório", subtitle: 'Aula 14 · 27 slides · 1 simulações', duration: '20:00' },
]

const PNEUMO_SYLLABUS = [
  // Pilar Pneumo (M2)
  { id: 'M2-T1-S1', topicId: 'P2-S1', title: "Anatomofisiologia Respiratória", subtitle: 'Pneumo · 12 slides', duration: '20:00' },
  { id: 'M2-T2-S1', topicId: 'P2-S2', title: "Zona Condutora e Respiratória", subtitle: 'Pneumo · 20 slides', duration: '20:00' },
  { id: 'M2-T3-S1', topicId: 'P2-S3', title: "Mecânica Respiratória", subtitle: 'Pneumo · 7 slides', duration: '20:00' },
  { id: 'M2-T4-S1', topicId: 'P2-S4', title: "Difusão e Transporte de Gases", subtitle: 'Pneumo · 10 slides', duration: '20:00' },
  { id: 'M2-T5-S1', topicId: 'P2-S5', title: "Controle Respiratório", subtitle: 'Pneumo · 7 slides', duration: '20:00' },
  { id: 'M2-T6-S1', topicId: 'P2-S6', title: "Volumes e Capacidades Pulmonares", subtitle: 'Pneumo · 4 slides', duration: '20:00' },
  { id: 'M2-T7-S1', topicId: 'P2-S7', title: "Oxigenoterapia", subtitle: 'Pneumo · 7 slides', duration: '20:00' },
  { id: 'M2-T8-S1', topicId: 'P2-S8', title: "Semiologia Pulmonar", subtitle: 'Pneumo · 11 slides', duration: '20:00' },
  { id: 'M2-T9-S1', topicId: 'P2-S9', title: "Patologias Respiratórias", subtitle: 'Pneumo · 0 slides', duration: '20:00' },
  { id: 'M2-T10-S1', topicId: 'P2-S10', title: "VNI — Ventilação Não Invasiva", subtitle: 'Pneumo · 16 slides', duration: '20:00' },
  { id: 'M2-T11-S1', topicId: 'P2-S11', title: "VMI — Ventilação Mecânica Invasiva", subtitle: 'Pneumo · 33 slides', duration: '20:00' },
  { id: 'M2-T12-S1', topicId: 'P2-S12', title: "Assincronias Paciente-Ventilador", subtitle: 'Pneumo · 12 slides', duration: '20:00' },
  { id: 'M2-T13-S1', topicId: 'P2-S13', title: "Modalidades & Análise Gráfica", subtitle: 'Pneumo · 12 slides', duration: '20:00' },
  { id: 'M2-T14-S1', topicId: 'P2-S14', title: "Desmame Ventilatório", subtitle: 'Pneumo · 27 slides', duration: '20:00' },
]



const NEURO_PLAYLIST = [
  { id: 'M1-T1', topicId: 'M1-S1', title: 'O Organismo e o SN', subtitle: 'Aula 01 · 15 slides · 2 simulações', duration: '20:00' },
  { id: 'M1-T2', topicId: 'M1-S2', title: 'Neurodesenvolvimento', subtitle: 'Aula 02 · 19 slides · 2 simulações', duration: '25:00' },
  { id: 'M1-T3', topicId: 'M1-S3', title: 'Base Celular e Fisiológica', subtitle: 'Aula 03 · 17 slides · 5 simulações', duration: '30:00' },
  { id: 'M1-T4', topicId: 'M1-S4', title: 'Suporte, Nutrição e Proteção', subtitle: 'Aula 04 · 12 slides · 3 simulações', duration: '18:00' }
]

const NEURO_SYLLABUS = [
  // Pilar Neuro (M1)
  { id: 'M1-T1-S1', topicId: 'M1-S1', title: 'O Organismo e o SN', subtitle: 'Neuro · 15 slides', duration: '20:00' },
  { id: 'M1-T2-S1', topicId: 'M1-S2', title: 'Neurodesenvolvimento', subtitle: 'Neuro · 19 slides', duration: '25:00' },
  { id: 'M1-T3-S1', topicId: 'M1-S3', title: 'Base Celular e Fisiológica', subtitle: 'Neuro · 17 slides', duration: '30:00' },
  { id: 'M1-T4-S1', topicId: 'M1-S4', title: 'Suporte, Nutrição e Proteção', subtitle: 'Neuro · 12 slides', duration: '18:00' }
]

const BUSINESS_SYLLABUS = [
  { id: 'M4-T1-S1', topicId: 'M4-T1', title: 'Inovação, Transformação e Ferramentas Digitais', subtitle: 'IE · Era Digital e Automação', duration: '22:15' },
  { id: 'M4-T1-S2', topicId: 'M4-T1', title: 'Pensamento Criativo', subtitle: 'IE · Neurociência e Ideação', duration: '18:45' },
  { id: 'M4-T1-S3', topicId: 'M4-T1', title: 'Sustentabilidade em Negócios', subtitle: 'IE · ESG e Valor Compartilhado', duration: '25:30' },
  { id: 'M4-T1-S4', topicId: 'M4-T1', title: 'Gestão de Negócios', subtitle: 'IE · Canvas e Estratégia Corporativa', duration: '35:40' },
  { id: 'M4-T1-S5', topicId: 'M4-T1', title: 'Demonstrações Contábeis', subtitle: 'IE · Balanço, DRE e Fluxo de Caixa', duration: '31:20' },
  { id: 'M4-T1-S6', topicId: 'M4-T1', title: 'Matemática Financeira', subtitle: 'IE · VPL, TIR e Juros Compostos', duration: '28:15' },
  { id: 'M4-T1-S7', topicId: 'M4-T1', title: 'Economia de Empresa e Análise Mercadológica', subtitle: 'IE · Escassez e Valor Percebido', duration: '33:10' },
  { id: 'M4-T1-S8', topicId: 'M4-T1', title: 'Liderança e Gestão de Equipes', subtitle: 'IE · IE e Segurança Psicológica', duration: '41:50' },
  { id: 'M4-T1-S9', topicId: 'M4-T1', title: 'Filosofia', subtitle: 'IE · Ética e Pensamento Crítico', duration: '24:45' },
  { id: 'M4-T1-S10', topicId: 'M4-T1', title: 'Cálculo Aplicado a Negócios', subtitle: 'IE · Derivadas e Break-Even', duration: '29:30' },
  { id: 'M4-T1-S11', topicId: 'M4-T1', title: 'Análise Estatística', subtitle: 'IE · Média, Dispersão e Teste A/B', duration: '38:10' },
  { id: 'M4-T1-S12', topicId: 'M4-T1', title: 'Leitura e Escrita Acadêmica', subtitle: 'IE · Minto, Toulmin e Pesquisa', duration: '26:20' },
  { id: 'M4-T1-S13', topicId: 'M4-T1', title: 'Empreendedorismo e Inovação', subtitle: 'IE · Canvas e Lógica Effectuation', duration: '32:45' },
  { id: 'M4-T1-S14', topicId: 'M4-T1', title: 'Ambiente Macroeconômico', subtitle: 'IE · Indicadores e Ciclos Econômicos', duration: '36:15' },
  { id: 'M4-T1-S15', topicId: 'M4-T1', title: 'Análise Financeira', subtitle: 'IE · DRE Vertical, Valuation e Giro', duration: '40:20' },
  { id: 'M4-T1-S16', topicId: 'M4-T1', title: 'Ética Empresarial', subtitle: 'IE · Dilemas e Teste de ESG', duration: '34:50' },
  { id: 'M4-T1-S17', topicId: 'M4-T1', title: 'Empreendedorismo Social', subtitle: 'IE · SROI e Teoria da Mudança', duration: '27:10' },
  { id: 'M4-T1-S18', topicId: 'M4-T1', title: 'Pesquisa Aplicada a Negócios', subtitle: 'IE · Quali/Quanti, Dados e CAC', duration: '31:40' }
]

function ExecutiveMasterclassTheater({ 
  moduleTitle, 
  moduleId,
  onSelectTopic,
  activeTopicId,
  activeLessonIndex,
  onChangeLessonIndex
}: { 
  moduleTitle: string; 
  moduleId?: string;
  onSelectTopic?: (topicId: string) => void;
  activeTopicId?: string | null;
  activeLessonIndex: number;
  onChangeLessonIndex: (index: number) => void;
}) {
  const theme = MODULE_THEMES[moduleId ?? 'M4'] || MODULE_THEMES.M4
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(24)
  
  const playlist = moduleId === 'M1' ? NEURO_PLAYLIST : BUSINESS_PLAYLIST

  // Sync with activeTopicId if set from outside
  useEffect(() => {
    if (activeTopicId) {
      const activeItem = playlist[activeLessonIndex]
      if (activeItem?.topicId !== activeTopicId) {
        const idx = playlist.findIndex(item => item.topicId === activeTopicId)
        if (idx !== -1) {
          onChangeLessonIndex(idx)
        }
      }
    }
  }, [activeTopicId, playlist])

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4))
    }, 500)
    return () => clearInterval(interval)
  }, [playing])

  const activeLesson = playlist[activeLessonIndex] ?? playlist[0]

  const handleLessonSelect = (index: number) => {
    onChangeLessonIndex(index)
    setProgress(0)
    setPlaying(false)
    if (onSelectTopic) {
      onSelectTopic(playlist[index].topicId)
    }
  }

  return (
    <div className="ipb-glass-card w-full flex flex-col pointer-events-auto transition-all duration-300">
      {/* Video Cinema screen occupies full width (100%) */}
      <div className="relative aspect-[21/9] bg-black flex items-center justify-center overflow-hidden rounded-t-xl">
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

        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="text-[7.5px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-black/50 border border-white/10" style={{ color: theme.primary }}>
            {moduleId === 'M1' ? 'Módulo 1 · Neurociência' : moduleId === 'M2' ? 'Módulo 2 · Pneumologia e VM' : 'Masterclass M4 · Aula ' + (activeLessonIndex + 1)}
          </span>
          <span className="text-[7.5px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-black/50 border border-white/10 text-white/50">
            {activeLesson.duration}
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
              <div className="w-1.5 h-4 bg-white/95 rounded-sm" />
              <div className="w-1.5 h-4 bg-white/95 rounded-sm" />
            </div>
          ) : (
            <Play className="h-5 w-5 text-white/95 fill-white/80 ml-1" />
          )}
        </motion.button>
      </div>

      {/* Control bar and timeline progress */}
      <div className="p-4 flex flex-col justify-between bg-black/30 border-t border-white/[0.04] space-y-4">
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
              <span>{Math.floor((progress/100)*28)}:14 / {activeLesson.duration}</span>
            </div>
          </div>
        </div>
        
        {/* Timeline Bar */}
        <div className="relative">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
            <div className="h-full transition-all duration-300" style={{ 
              width: `${progress}%`,
              background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
            }} />
          </div>
        </div>

        {/* Masterclass Ribbon Selector (Replacing the bulky right playlist column) */}
        <div className="pt-2 border-t border-white/[0.04]">
          <span className="text-[7.5px] uppercase tracking-wider text-white/30 font-bold block mb-2">Playlist da Aula Executiva</span>
          <div className="flex flex-wrap gap-2">
            {playlist.map((item, idx) => {
              const isSelected = idx === activeLessonIndex
              const isGold = idx % 2 === 0
              const itemColor = isGold ? '#d2af5a' : '#cbd5e1'
              const itemBgSelected = isGold ? 'rgba(var(--theme-primary-rgb),0.12)' : 'rgba(203,213,225,0.12)'
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleLessonSelect(idx)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-left cursor-pointer transition-all duration-300"
                  style={{
                    background: isSelected ? itemBgSelected : 'rgba(255,255,255,0.01)',
                    borderColor: isSelected ? itemColor : 'rgba(255,255,255,0.04)',
                  }}
                >
                  <span className="font-mono text-[8px] font-bold" style={{ color: isSelected ? itemColor : 'rgba(255,255,255,0.3)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-semibold leading-tight truncate max-w-[110px] ${isSelected ? 'text-white' : 'text-white/60'}`}>
                      {item.title}
                    </span>
                    <span className="text-[6.5px] text-white/35 font-mono mt-0.5">{item.duration} · {isGold ? 'OURO' : 'PRATA'}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function CompetencyRadarChart({ activeKpi, theme }: { activeKpi: string; theme: any }) {
  const cx = 100
  const cy = 82
  const R = 54

  const axes = [
    { key: 'ie', label: 'IE', score: 0.942 },
    { key: 'fiq', label: 'FIQ', score: 0.85 },
    { key: 'lpc', label: 'LPC', score: 1.0 },
    { key: 'goc', label: 'GOC', score: 0.915 },
    { key: 'mme', label: 'MME', score: 0.93 },
    { key: 'isi', label: 'ISI', score: 0.886 }
  ]

  const getHexPath = (radius: number) => {
    return axes.map((_, i) => {
      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2
      const x = cx + radius * Math.cos(angle)
      const y = cy + radius * Math.sin(angle)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ') + ' Z'
  }

  const scorePath = axes.map((axis, i) => {
    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2
    const x = cx + R * axis.score * Math.cos(angle)
    const y = cy + R * axis.score * Math.sin(angle)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ') + ' Z'

  return (
    <div className="relative w-full flex items-center justify-center py-1.5 bg-black/35 rounded-xl border border-white/[0.03] overflow-hidden my-2.5">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        background: `radial-gradient(circle at 50% 50%, ${theme.primary}, transparent 75%)`,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '6px 6px'
      }} />

      <svg width="200" height="152" className="relative overflow-visible">
        <path d={getHexPath(R)} fill="none" stroke="rgba(var(--theme-primary-rgb),0.14)" strokeWidth="0.8" />
        <path d={getHexPath(R * 0.75)} fill="none" stroke="rgba(var(--theme-primary-rgb),0.06)" strokeWidth="0.5" strokeDasharray="2 2" />
        <path d={getHexPath(R * 0.5)} fill="none" stroke="rgba(var(--theme-primary-rgb),0.06)" strokeWidth="0.5" strokeDasharray="2 2" />
        <path d={getHexPath(R * 0.25)} fill="none" stroke="rgba(var(--theme-primary-rgb),0.06)" strokeWidth="0.5" />

        {axes.map((_, i) => {
          const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2
          const x = cx + R * Math.cos(angle)
          const y = cy + R * Math.sin(angle)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.8"
            />
          )
        })}

        <motion.path
          d={scorePath}
          fill="rgba(var(--theme-primary-rgb),0.15)"
          stroke={theme.primary}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 3px ${theme.glow})` }}
        />

        {axes.map((axis, i) => {
          const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2
          const isSelected = activeKpi === axis.key
          
          const labelDist = R + 12
          const lx = cx + labelDist * Math.cos(angle)
          const ly = cy + labelDist * Math.sin(angle) + 2.5

          const dx = cx + R * axis.score * Math.cos(angle)
          const dy = cy + R * axis.score * Math.sin(angle)

          return (
            <g key={axis.key}>
              <circle
                cx={dx}
                cy={dy}
                r={isSelected ? 3.5 : 2}
                fill={isSelected ? '#fff' : theme.primary}
                stroke={theme.accent}
                strokeWidth={isSelected ? 1.5 : 0}
                style={{ filter: isSelected ? `drop-shadow(0 0 5px ${theme.primary})` : 'none' }}
              />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                className="text-[7px] font-mono font-bold leading-none select-none pointer-events-none"
                fill={isSelected ? '#fff' : 'rgba(255,255,255,0.35)'}
              >
                {axis.label}
              </text>
            </g>
          )
        })}
      </svg>
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
    <div className="w-full flex-1 ipb-glass-card p-4 flex flex-col justify-between h-full transition-all duration-300 pointer-events-auto">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[7.5px] uppercase tracking-wider font-bold" style={{ color: theme.primary }}>KPIs Estratégicos</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#d2af5a]/10 [.theme-silver_&]:bg-[#cbd5e1]/10 border border-[#d2af5a]/20 [.theme-silver_&]:border-[#cbd5e1]/20 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] font-mono">Executive Mode</span>
        </div>
        <h4 className="text-[12px] font-bold text-white/90 mt-1">Indicadores de Competência (30 Disciplinas)</h4>
      </div>

      {/* Futuristic Competency Radar Chart */}
      <CompetencyRadarChart activeKpi={activeKpi} theme={theme} />

      {/* Grid: Responsive columns for 6 KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
        {Object.entries(kpis).map(([key, kpi]) => {
          const isSelected = activeKpi === key
          const Icon = kpi.icon
          return (
            <button
              key={key}
              onClick={() => setActiveKpi(key as any)}
              className="p-1.5 rounded-lg border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer"
              style={{
                background: isSelected ? 'rgba(var(--theme-primary-rgb),0.08)' : 'rgba(255,255,255,0.01)',
                borderColor: isSelected ? theme.primary : 'rgba(255,255,255,0.04)',
                boxShadow: isSelected ? `0 0 10px ${theme.glow}` : 'none'
              }}
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-[7px] uppercase tracking-wider text-white/35 font-bold truncate max-w-[80px]">
                  {kpi.title.split(' ')[0]}
                </span>
                <Icon className="h-2.5 w-2.5 opacity-30" style={{ color: theme.primary }} />
              </div>
              <span className="text-[11.5px] font-extrabold text-white mt-0.5 leading-none">{kpi.metric}</span>
              <div className="w-full h-0.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
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

      {/* Sleek and Compact KPI Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKpi}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-2.5 p-2 rounded-lg bg-black/40 border border-white/[0.03] flex items-center justify-between"
        >
          <div className="flex items-center gap-2 min-w-0">
            <ActiveIcon className="h-3.5 w-3.5 shrink-0" style={{ color: theme.primary }} />
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-bold text-white/80 truncate leading-none">{kpis[activeKpi].title}</span>
              <span className="text-[7.5px] font-mono text-white/45 truncate mt-1 leading-none">{kpis[activeKpi].badge}</span>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[11px] font-mono font-bold" style={{ color: theme.primary }}>{kpis[activeKpi].metric}</span>
            <span className="text-[6.5px] font-mono text-white/35 uppercase mt-1 leading-none">{kpis[activeKpi].subjects.length} DISCIPLINAS</span>
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
            className="absolute bottom-2 inset-x-2 p-2 rounded bg-black/85 border border-[#d2af5a]/30 [.theme-silver_&]:border-[#cbd5e1]/30 backdrop-blur-md z-20 flex flex-col gap-0.5"
          >
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-white uppercase tracking-wider">
                Fluxo {STRATEGIC_NODES.findIndex(n => n.id === hoveredNode) + 1}: {STRATEGIC_NODES.find(n => n.id === hoveredNode)?.label}
              </span>
              <span className="text-[7px] font-mono text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] font-semibold">Foco Estratégico</span>
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

function NASA6DSimulator({ dbId, chapterIndex, theme }: { dbId: string; chapterIndex: number; theme: any }) {
  const [selectedSim, setSelectedSim] = useState<'pump' | 'potential'>('pump')
  const [logs, setLogs] = useState<string[]>([
    'NASA 6D Core Online. Pronto para testes de impacto cognitivo.',
    'Aguardando telemetria do caderno de estudos...'
  ])

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 4)])
  }

  const [c1Phase, setC1Phase] = useState(2) 
  const [c2CxFocus, setC2CxFocus] = useState(60)
  const [c2Agile, setC2Agile] = useState(50)
  const [c3Params, setC3Params] = useState(7) 
  const [c3Quant, setC3Quant] = useState<'FP16' | 'INT8' | 'INT4'>('INT8')
  const [c4Scaling, setC4Scaling] = useState(true)
  const [c4Edge, setC4Edge] = useState(false)
  const [c4Cache, setC4Cache] = useState(true)
  const [c5Accelerator, setC5Accelerator] = useState(false)
  const [c5SuccessRate, setC5SuccessRate] = useState(65)
  const [c6H1, setC6H1] = useState(70)
  const [c6H2, setC6H2] = useState(20)
  const [c6H3, setC6H3] = useState(10)
  const [c7Safety, setC7Safety] = useState(80)
  const [c8ActiveLayer, setC8ActiveLayer] = useState<number>(0)
  const [c8Transferring, setC8Transferring] = useState(false)

  const handleC6Change = (horizon: 'h1' | 'h2' | 'h3', val: number) => {
    if (horizon === 'h1') {
      const remaining = 100 - val
      setC6H1(val)
      setC6H2(Math.round(remaining * 0.7))
      setC6H3(Math.round(remaining * 0.3))
    } else if (horizon === 'h2') {
      const remaining = 100 - val
      setC6H2(val)
      setC6H1(Math.round(remaining * 0.8))
      setC6H3(Math.round(remaining * 0.2))
    } else {
      const remaining = 100 - val
      setC6H3(val)
      setC6H1(Math.round(remaining * 0.7))
      setC6H2(Math.round(remaining * 0.3))
    }
  }

  const triggerPrototype = () => {
    setC5Accelerator(true)
    addLog('ACELERADOR LIGADO: Injetando feixe de ideias no vácuo de prototipagem...')
    setTimeout(() => {
      setC5Accelerator(false)
      const rolled = Math.random() * 100
      if (rolled < c5SuccessRate) {
        addLog(`SUCESSO COGNITIVO: Protótipo validado! Margem Est: +350%, Tempo: 12 dias.`)
      } else {
        const pivots = ['Canibalização de Produto', 'Pivoteamento B2B', 'Adequação de UI/UX', 'Ajuste de Preço']
        const randomPivot = pivots[Math.floor(Math.random() * pivots.length)]
        addLog(`PIVOT DETECTADO: Validação falhou, mas mitigada cedo. Pivotado para: ${randomPivot}.`)
      }
    }, 1500)
  }

  const triggerCrisis = () => {
    addLog('CRISE ACADÊMICA: Simulando erro grave no pipeline operacional do time...')
    setTimeout(() => {
      if (c7Safety > 70) {
        addLog('SBI RETORNOU: O time reportou o erro de imediato. Resolvido em 8 minutos via Radical Candor!')
      } else {
        addLog('SILÊNCIO TÓXICO: Time ocultou a falha por medo de feedback. Retrabalho gerou prejuízo est. de R$ 42K.')
      }
    }, 1000)
  }

  const triggerETL = () => {
    setC8Transferring(true)
    addLog(`ETL INGESTÃO: Injetando dados transacionais no Lakehouse Layer ${c8ActiveLayer + 1}...`)
    setTimeout(() => {
      setC8Transferring(false)
      const stages = ['Raw Layer Ingested', 'Kimball Star Schema Balanced', 'Gold Datamart Optimized', 'BI Telemetry Refreshed']
      addLog(`STATUS LAYER: ${stages[c8ActiveLayer]} successfully calculated. Query: < 12ms.`)
    }, 1200)
  }

  const has6DSimulations = (dbId.startsWith('N1-') && (dbId !== 'N1-S1' || chapterIndex === 0)) || dbId.startsWith('P2-') || dbId === 'M4-S1' || dbId === 'M1-S1' || dbId === 'M1-S2' || dbId === 'M1-S3' || dbId === 'M2-S1' || dbId === 'M2-S2' || dbId === 'M2-S3' || dbId === 'M3-S1' || dbId === 'M3-S2' || dbId === 'M4-T1-S9' || dbId === 'M4-S2' || dbId === 'M4-S3' || dbId === 'M5-S1' || dbId === 'M5-S2' || dbId === 'M5-S3' || dbId === 'M6-S1'

  return (
    <div className="flex flex-col justify-between h-full w-full space-y-4">
      <div className="flex-1 min-h-[320px] bg-black/40 border border-white/[0.03] rounded-2xl p-4 flex flex-col justify-between relative overflow-y-auto">
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.primary}, transparent 80%)`,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '10px 10px'
        }} />

        {!has6DSimulations ? (
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-[8px] px-1.5 py-0.5 rounded font-mono bg-white/5 border border-white/10 text-white/45 uppercase tracking-widest">TACTICAL DECISION BOARD</span>
              <h5 className="text-xs font-bold text-white/80 mt-1">Conexões de Governança Estratégica</h5>
            </div>
            
            <div className="my-auto">
              <StrategicRoadmapBoard moduleId={dbId} />
            </div>

            <p className="text-[10px] text-white/40 text-justify mt-2 leading-relaxed">
              Consolo telemétrico integrado. Módulos clínicos operam em topologia linear clássica, enquanto o Módulo Business (M4) utiliza simuladores ativos 6D de tomada de decisão executiva em tempo real.
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[8.5px] px-2 py-0.5 rounded font-mono bg-[#d2af5a]/10 [.theme-silver_&]:bg-[#cbd5e1]/10 border border-[#d2af5a]/20 [.theme-silver_&]:border-[#cbd5e1]/20 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] uppercase font-bold tracking-wider">
                  NASA 6D CORE · CAPÍTULO {chapterIndex + 1}
                </span>
                <h5 className="text-xs font-bold text-white/95 mt-1">
                {dbId === 'N1-S1' && (
                  <>
                    {chapterIndex === 0 && (selectedSim === 'pump' ? 'Bomba Na⁺/K⁺-ATPase Interativa' : 'Potencial de Ação Interativo')}
                  </>
                )}
                {dbId === 'N1-S2' && (
                  <>
                    {chapterIndex === 0 && 'Formação do Tubo Neural (3D)'}
                    {chapterIndex === 1 && 'Densidade Sináptica ao Longo da Vida'}
                    {chapterIndex === 2 && 'Períodos Críticos e Ambliopia'}
                  </>
                )}
                {dbId === 'N1-S3' && (
                  <>
                    {chapterIndex === 0 && 'Anatomia Interativa do Neurônio'}
                    {chapterIndex === 1 && 'Transporte Axonal: Lento vs Rápido'}
                    {chapterIndex === 2 && 'Ecossistema Neuroglial'}
                  </>
                )}
                {dbId === 'N1-S4' && (
                  <>
                    {chapterIndex === 0 && 'Cadeia Metabólica Neural'}
                    {chapterIndex === 1 && 'Barreira Hematoencefálica e Junções'}
                  </>
                )}
                
                        {dbId === 'P2-S1' && (
              <div className="h-full w-full relative">
                {chapterIndex < 2 && (() => { const C = RESPIRATORY_SIMS['respiratory-system']; return <C /> })()}
                {chapterIndex === 2 && (() => { const C = RESPIRATORY_SIMS['respiratory-gas-exchange']; return <C /> })()}
                {chapterIndex > 2 && (() => { const C = RESPIRATORY_SIMS['respiratory-defense']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S2' && (
              <div className="h-full w-full relative">
                {chapterIndex < 5 && (() => { const C = RESPIRATORY_SIMS['respiratory-cough']; return <C /> })()}
                {chapterIndex >= 5 && (() => { const C = RESPIRATORY_SIMS['respiratory-membrane']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S3' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-ventilation']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S4' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-oxyhb-curve']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S5' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-control']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S6' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-volumes']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S7' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-oxytherapy']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S8' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-spirometry']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S10' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-vni-modes']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S11' && (
              <div className="h-full w-full relative">
                {chapterIndex < 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-ventilator']; return <C /> })()}
                {chapterIndex === 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-peep']; return <C /> })()}
                {chapterIndex > 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-mechanics']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S12' && (
              <div className="h-full w-full relative">
                {chapterIndex <= 1 && (() => { const C = RESPIRATORY_SIMS['async-ineffective']; return <C /> })()}
                {chapterIndex === 2 && (() => { const C = RESPIRATORY_SIMS['async-double']; return <C /> })()}
                {chapterIndex === 3 && (() => { const C = RESPIRATORY_SIMS['async-reverse']; return <C /> })()}
                {chapterIndex === 4 && (() => { const C = RESPIRATORY_SIMS['async-auto']; return <C /> })()}
                {chapterIndex === 5 && (() => { const C = RESPIRATORY_SIMS['async-premature']; return <C /> })()}
                {chapterIndex === 6 && (() => { const C = RESPIRATORY_SIMS['async-delayed']; return <C /> })()}
                {chapterIndex === 7 && (() => { const C = RESPIRATORY_SIMS['async-flow-starve']; return <C /> })()}
                {chapterIndex === 8 && (() => { const C = RESPIRATORY_SIMS['async-flow-excess']; return <C /> })()}
                {chapterIndex >= 9 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-asynchrony']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S13' && (
              <div className="h-full w-full relative">
                {chapterIndex <= 1 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-vcv-analysis']; return <C /> })()}
                {chapterIndex === 2 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-pcv-analysis']; return <C /> })()}
                {chapterIndex === 3 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-psv-analysis']; return <C /> })()}
                {chapterIndex === 4 && (() => { const C = RESPIRATORY_SIMS['respiratory-vmi-loops']; return <C /> })()}
                {chapterIndex >= 5 && (() => { const C = RESPIRATORY_SIMS['respiratory-peep-test']; return <C /> })()}
              </div>
            )}
            {dbId === 'P2-S14' && (
              <div className="h-full w-full relative">
                {(() => { const C = RESPIRATORY_SIMS['respiratory-cuff-leak']; return <C /> })()}
              </div>
            )}

{dbId === 'M1-S1' && (
                  <>
                    {chapterIndex === 0 && 'Simulador de Alinhamento e Fases da TI'}
                    {chapterIndex === 1 && 'Reator de 4 Domínios de Rogers'}
                    {chapterIndex === 2 && 'Matriz de Redes Neurais e IA'}
                    {chapterIndex === 3 && 'Pipeline Serverless & Cloud Optimizer'}
                    {chapterIndex === 4 && 'Innovation Prototyping Accelerator'}
                    {chapterIndex === 5 && 'Balanceador 3 Horizontes (McKinsey)'}
                    {chapterIndex === 6 && 'Vigilância e Segurança Psicológica Aristotle'}
                    {chapterIndex === 7 && 'Kimball Lakehouse Data Ingestion Cube'}
                  </>
                )}
                {dbId === 'M1-S2' && (
                  <>
                    {chapterIndex === 0 && 'Neuro-Criatividade (3 Redes Cerebrais)'}
                    {chapterIndex === 1 && 'Funil de Ideação (Design Thinking & SCAMPER)'}
                    {chapterIndex === 2 && 'Matriz de Bloqueios & 6 Chapéus (De Bono)'}
                  </>
                )}
                {dbId === 'M1-S3' && (
                  <>
                    {chapterIndex === 0 && 'Círculos Aninhados de Sustentabilidade'}
                    {chapterIndex === 1 && 'Scanner Biométrico de Risco ESG'}
                    {chapterIndex === 2 && 'Constelação Orbital de Frameworks'}
                    {chapterIndex === 3 && 'Radar Espectral de Greenwashing'}
                    {chapterIndex === 4 && 'Cofre Criogênico de Políticas SMART'}
                    {chapterIndex === 5 && 'Circuito BPMN de Processos'}
                    {chapterIndex === 6 && 'Globo Tático de Certificações (C2C)'}
                  </>
                )}
                {dbId === 'M2-S1' && (
                  <>
                    {chapterIndex === 0 && 'Núcleo de Reator PDCA'}
                    {chapterIndex === 1 && 'Mosaico Isométrico do Canvas'}
                    {chapterIndex === 2 && 'Prisma Estratégico 3D (SWOT/BCG/Porter)'}
                    {chapterIndex === 3 && 'Cadeia de Valor: Fibra Óptica'}
                    {chapterIndex === 4 && 'Telemetria Tributária'}
                  </>
                )}
                {dbId === 'M2-S2' && (
                  <>
                    {chapterIndex === 0 && 'Livro-Razão Holográfico'}
                    {chapterIndex === 1 && 'Balança Gyroscópica (Ativo=Passivo)'}
                    {chapterIndex === 2 && 'Cachoeira Termodinâmica (DRE)'}
                    {chapterIndex === 3 && 'Tanques Criogênicos (Fluxo de Caixa)'}
                    {chapterIndex === 4 && 'Acelerador de Partículas (Partidas Dobradas)'}
                  </>
                )}
              </h5>
            </div>
            <div className="flex items-center gap-1.5 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d2af5a] [.theme-silver_&]:bg-[#cbd5e1] animate-ping" />
              <span className="text-[7.5px] font-mono font-bold tracking-wider">TELEMETRIA ATIVA</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {dbId === 'N1-S1' && (
              <div className="h-full w-full relative flex flex-col min-h-0">
                {chapterIndex === 0 ? (
                  <div className="flex-1 flex flex-col h-full w-full min-h-0">
                    <div className="flex gap-2 mb-2 shrink-0">
                      <button
                        onClick={() => setSelectedSim('pump')}
                        className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-wider rounded-lg border transition-all cursor-pointer ${
                          selectedSim === 'pump'
                            ? 'bg-teal-500/10 border-teal-500/30 text-teal-400 font-bold shadow-[0_0_15px_rgba(45,212,191,0.1)]'
                            : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'
                        }`}
                      >
                        ⚡ Bomba Na⁺/K⁺
                      </button>
                      <button
                        onClick={() => setSelectedSim('potential')}
                        className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-wider rounded-lg border transition-all cursor-pointer ${
                          selectedSim === 'potential'
                            ? 'bg-teal-500/10 border-teal-500/30 text-teal-400 font-bold shadow-[0_0_15px_rgba(45,212,191,0.1)]'
                            : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'
                        }`}
                      >
                        📈 Potencial de Ação
                      </button>
                    </div>
                    <div className="flex-1 min-h-0 relative">
                      {selectedSim === 'pump' ? (
                        (() => { const C = NEURO_SIMS['neuro-pump']; return <C /> })()
                      ) : (
                        (() => { const C = NEURO_SIMS['neuro-action-potential']; return <C /> })()
                      )}
                    </div>
                  </div>
                ) : (
                  (() => { const C = NEURO_SIMS['neuro-action-potential']; return <C /> })()
                )}
              </div>
            )}
            {dbId === 'N1-S2' && (
              <div className="h-full w-full relative">
                {chapterIndex === 1 && (() => { const C = NEURO_SIMS['neuro-tube']; return <C /> })()}
                {chapterIndex === 4 && (() => { const C = NEURO_SIMS['neuro-synapse-timeline']; return <C /> })()}
                {(chapterIndex !== 1 && chapterIndex !== 4) && (() => { const C = NEURO_SIMS['neuro-tube']; return <C /> })()}
              </div>
            )}
            {dbId === 'N1-S3' && (
              <div className="h-full w-full relative">
                {chapterIndex === 2 && (() => { const C = NEURO_SIMS['neuro-neuron-anatomy']; return <C /> })()}
                {chapterIndex === 3 && (() => { const C = NEURO_SIMS['neuro-axon-transport']; return <C /> })()}
                {chapterIndex === 4 && (() => { const C = NEURO_SIMS['neuro-saltatory-conduction']; return <C /> })()}
                {chapterIndex === 5 && (() => { const C = NEURO_SIMS['neuro-neuron-types']; return <C /> })()}
                {chapterIndex === 6 && (() => { const C = NEURO_SIMS['neuro-glia-ecosystem']; return <C /> })()}
                {(chapterIndex < 2) && (() => { const C = NEURO_SIMS['neuro-neuron-anatomy']; return <C /> })()}
              </div>
            )}
            {dbId === 'N1-S4' && (
              <div className="h-full w-full relative">
                {chapterIndex === 0 && (() => { const C = NEURO_SIMS['neuro-metabolic-chain']; return <C /> })()}
                {chapterIndex === 1 && (() => { const C = NEURO_SIMS['neuro-bhe']; return <C /> })()}
              </div>
            )}
            {dbId === 'M1-S1' && (
              <>
                {chapterIndex === 0 && <SimAlignIT theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimRogersReactor theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimNeuralMatrix theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimServerlessFlow theme={theme} addLog={addLog} />}
                {chapterIndex === 4 && <SimInnovationIgnition theme={theme} addLog={addLog} />}
                {chapterIndex === 5 && <SimHorizonsBalancer theme={theme} addLog={addLog} />}
                {chapterIndex === 6 && <SimPsychologicalShield theme={theme} addLog={addLog} />}
                {chapterIndex === 7 && <SimDataLakehouse theme={theme} addLog={addLog} />}
              </>
            )}
            {dbId === 'M1-S2' && (
              <>
                {chapterIndex === 0 && <SimNeuroCreativity theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimIdeationFunnel theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimSixHatsMatrix theme={theme} addLog={addLog} />}
              </>
            )}
            {dbId === 'M1-S3' && (
              <>
                {chapterIndex === 0 && <SimNestedSustainability theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimESGScanner theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimFrameworkConstellation theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimGreenwashingFilter theme={theme} addLog={addLog} />}
                {chapterIndex === 4 && <SimSMARTLock theme={theme} addLog={addLog} />}
                {chapterIndex === 5 && <SimBPMNFlow theme={theme} addLog={addLog} />}
                {chapterIndex === 6 && <SimCertGlobe theme={theme} addLog={addLog} />}
              </>
            )}
            {dbId === 'M2-S1' && (
              <>
                {chapterIndex === 0 && <SimPDCACycle theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimBusinessCanvas theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimStrategicTripod theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimValueChain theme={theme} addLog={addLog} />}
                {chapterIndex === 4 && <SimTaxMatrix theme={theme} addLog={addLog} />}
              </>
            )}
            {dbId === 'M2-S2' && (
              <>
                {chapterIndex === 0 && <SimAccountingLedger theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimBalanceScale theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimIncomeWaterfall theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimCashflowTanks theme={theme} addLog={addLog} />}
                {chapterIndex === 4 && <SimDoubleEntryOrbit theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M2-S3' && (
              <>
                {chapterIndex === 0 && <SimTimeDilator theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimCompoundGravity theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimVPLSpectrometer theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimCorporateGyroscope theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M3-S1' && (
              <>
                {chapterIndex === 0 && <SimMarketEras theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimValuePerception theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimNeedsDesiresDemand theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M3-S2' && (
              <>
                {chapterIndex === 0 && <SimLeadershipTheories theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimTuckmanModel theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimMotivationPsychology theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimCommunicationChannels theme={theme} addLog={addLog} />}
                {chapterIndex === 4 && <SimTeamDysfunctions theme={theme} addLog={addLog} />}
                {chapterIndex === 5 && <SimVUCALeadership theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M4-T1-S9' && (
              <>
                {chapterIndex === 0 && <SimCriticalThinking theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimEthicsFrameworks theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimPoliticalPhilosophy theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimEasternAesthetics theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M4-S2' && (
              <>
                {chapterIndex === 0 && <SimCalculusOptimization theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimFinancialIntegrals theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimBreakEvenLeverage theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M4-S3' && (
              <>
                {chapterIndex === 0 && <SimStatisticalFoundations theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimHypothesisTesting theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimCohortStorytelling theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimMachineLearningPredictive theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M5-S1' && (
              <>
                {chapterIndex === 0 && <SimMintoPyramid theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimToulminModel theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimCriticalReadingSQ3R theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimDuarteStorytelling theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M5-S2' && (
              <>
                {chapterIndex === 0 && <SimEffectuationLogic theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimLeanStartupMVP theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimUnitEconomics theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimVCFundingJourney theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M5-S3' && (
              <>
                {chapterIndex === 0 && <SimMacroIndicatorsPanel theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimEconomicCyclesWave theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimBrazilStructuralChallenges theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimWorkforceFinanceSystem theme={theme} addLog={addLog} />}
              </>
            )}

            {dbId === 'M6-S1' && (
              <>
                {chapterIndex === 0 && <SimFinancialAnalysisVH theme={theme} addLog={addLog} />}
                {chapterIndex === 1 && <SimValuationTriangulation theme={theme} addLog={addLog} />}
                {chapterIndex === 2 && <SimWorkingCapitalCycle theme={theme} addLog={addLog} />}
                {chapterIndex === 3 && <SimIntegratedDiagnostics theme={theme} addLog={addLog} />}
              </>
            )}
          </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-black/60 rounded-xl border border-white/[0.04] font-mono h-[96px] overflow-hidden shrink-0 flex flex-col justify-between">
        <div className="flex justify-between items-center pb-1.5 border-b border-white/[0.04]">
          <span className="text-[7.5px] uppercase font-bold text-white/35">Advisor Terminal Diagnostic Logs</span>
          <span className="text-[7px] text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] font-bold">STATUS: OK</span>
        </div>
        <div className="flex-1 flex flex-col justify-start space-y-1 mt-1.5 select-none pointer-events-none">
          {logs.map((log, idx) => (
            <div key={idx} className="text-[7.5px] truncate text-white/40 leading-normal" style={{ color: idx === 0 ? 'var(--theme-primary)' : undefined }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExecutiveStudyBriefing({
  moduleId,
  activeTopicId,
  activeTheme,
  activeSubjectIndex,
  onChangeSubjectIndex
}: {
  moduleId: string
  activeTopicId: string | null
  activeTheme: any
  activeSubjectIndex: number
  onChangeSubjectIndex: (index: number) => void
}) {
  const isGoldTheme = activeSubjectIndex % 2 === 0
  const [activeTab, setActiveTab] = useState<'summary' | 'tutor' | 'notes'>('summary')
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const [tutorInput, setTutorInput] = useState('')
  const [isTutorLoading, setIsTutorLoading] = useState(false)
  const [tutorHistory, setTutorHistory] = useState<any[]>([
    { role: 'assistant', content: 'Bem-vindo ao Advisor de Diretoria IA. Como seu consultor estratégico de negócios, estou pronto para detalhar WACC, valuation, segurança psicológica, frameworks organizacionais ou metodologias científicas de sua trilha. O que deseja analisar hoje?' }
  ])
  const [notes, setNotes] = useState('')

  const syllabusList = moduleId === 'M1' ? NEURO_SYLLABUS : moduleId === 'M2' ? PNEUMO_SYLLABUS : BUSINESS_SYLLABUS
  const syllabusItem = syllabusList[activeSubjectIndex] ?? syllabusList[0]
  const dbId = SYLLABUS_TO_DB_MAP[syllabusItem.id] ?? 'M1-S1'
  const activeSubjectData = SUBJECTS_DB.find(s => s.id === dbId) ?? {
    id: dbId,
    code: "EM-BREVE",
    title: "Conteúdo em Produção",
    videoUrls: [],
    chapters: [{
      title: "Em breve",
      description: "Este conteúdo está sendo estruturado.",
      subsections: [{
        title: "Aguarde",
        content: "O material completo para este módulo estará disponível em breve.",
        quote: ""
      }],
      synthesis: { title: "Síntese", bullets: ["Em produção"], insights: [] }
    }]
  }

  useEffect(() => {
    setActiveChapterIndex(0)
  }, [activeSubjectIndex])

  useEffect(() => {
    const saved = localStorage.getItem(`ipb-notes-${syllabusItem.id}`)
    setNotes(saved ?? '')
  }, [syllabusItem.id])

  const handleSaveNotes = (val: string) => {
    setNotes(val)
    localStorage.setItem(`ipb-notes-${syllabusItem.id}`, val)
  }

  const handleAskTutor = async (question: string) => {
    if (!question.trim()) return
    setTutorInput('')
    const updated = [...tutorHistory, { role: 'user', content: question }]
    setTutorHistory(updated)
    setIsTutorLoading(true)

    setTimeout(() => {
      let reply = ''
      const q = question.toLowerCase()

      let bestMatch = ''
      let matchScore = 0

      activeSubjectData.chapters.forEach(ch => {
        ch.subsections.forEach(sub => {
          let score = 0
          const words = q.split(/\s+/)
          words.forEach(w => {
            if (w.length > 2 && sub.content.toLowerCase().includes(w)) score += 1
            if (w.length > 2 && sub.title.toLowerCase().includes(w)) score += 2
          })

          if (score > matchScore) {
            matchScore = score
            bestMatch = sub.content
            if (sub.deepDive) bestMatch += '\n\n**Aprofundamento:** ' + sub.deepDive
            if (sub.studyCase) bestMatch += `\n\n**Estudo de Caso — ${sub.studyCase.title}:** ${sub.studyCase.body}`
          }
        })
      })

      if (matchScore > 1) {
        reply = `Com base no material oficial da disciplina *${activeSubjectData.title}*:\n\n${bestMatch}`
      } else {
        if (q.includes('wacc') || q.includes('valuation') || q.includes('finanças') || q.includes('calculo') || q.includes('ebitda')) {
          reply = 'Excelente ponto quantitativo. A maximização de retorno exige governança rigorosa sobre o custo de capital (WACC) e o cálculo das margens de contribuição operacional. No valuation via DCF, a modelagem de crescimento estável deve respeitar a elasticidade mercadológica observada.'
        } else if (q.includes('segurança') || q.includes('liderança') || q.includes('aristotle') || q.includes('equipe') || q.includes('cultura')) {
          reply = 'O maior fator de alavancagem operacional é a densidade de talentos aliada à segurança psicológica (Modelo Aristotle do Google). Recomendo instituir canais transparentes e feedbacks estruturados via modelo SBI para mitigar desalinhamentos cognitivos de equipe.'
        } else if (q.includes('lean') || q.includes('startup') || q.includes('inovação') || q.includes('canvas') || q.includes('estratégia')) {
          reply = 'Compreendo sua meta de aceleração. Para consolidar este ecossistema disruptivo, recomendo implementar o framework Lean Startup com ciclos curtos de feedback e validação rápida. Focar no mapeamento de core capabilities e oceanos azuis blindará a empresa contra concorrência agressiva.'
        } else {
          reply = `Como seu consultor estratégico de negócios para a disciplina *${activeSubjectData.title}*, analisei sua pergunta. Para obtermos maior eficiência operacional e impacto estratégico, recomendo cruzar os dados de desempenho com o roadmap tático do módulo. Se desejar, posso aprofundar em algum capítulo específico do nosso Sumário.`
        }
      }

      setTutorHistory([...updated, { role: 'assistant', content: reply }])
      setIsTutorLoading(false)
    }, 800)
  }

  return (
    <div className="ipb-soft relative overflow-hidden rounded-[2rem] p-6 space-y-6">
      
      {/* Top Strategic Navigation Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] flex-wrap gap-3" style={{ borderBottom: '0.2px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#d2af5a]/10 [.theme-silver_&]:bg-[#cbd5e1]/10 border border-[#d2af5a]/20 [.theme-silver_&]:border-[#cbd5e1]/20 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]">MBA Executive Cockpit</span>
            <h3 className="text-base font-bold text-white/95 leading-none mt-1">{syllabusItem.title}</h3>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
          {[
            { id: 'summary', label: 'SUMÁRIO', icon: BookOpen },
            { id: 'tutor', label: 'ADVISOR IA', icon: MessageSquare },
            { id: 'notes', label: 'MEMORANDO', icon: FileText }
          ].map((tab) => {
            const isSelected = activeTab === tab.id
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer"
                style={{
                  background: isSelected ? 'rgba(var(--theme-primary-rgb),0.12)' : 'transparent',
                  color: isSelected ? activeTheme.primary : 'rgba(255,255,255,0.4)'
                }}
              >
                <TabIcon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 30-Discipline Horizontal Rail Selector (Replaces Vertical Sidebar) */}
      <div className="border-b border-white/[0.04] pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider font-bold text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]">Grade de Disciplinas</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 font-mono uppercase">Mapeamento Integrado</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 pr-2 ipb-thinscroll select-none scroll-smooth">
          {syllabusList.map((item, idx) => {
            const isSelected = idx === activeSubjectIndex
            const isGold = idx % 2 === 0
            const itemColor = isGold ? '#d2af5a' : '#cbd5e1'
            
            return (
              <button
                key={item.id}
                onClick={() => onChangeSubjectIndex(idx)}
                className="flex-shrink-0 px-4 py-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2.5 cursor-pointer text-left"
                style={{
                  background: isSelected 
                    ? 'rgba(255, 255, 255, 0.04)' 
                    : 'rgba(255, 255, 255, 0.01)',
                  borderColor: isSelected 
                    ? activeTheme.primary 
                    : 'rgba(255, 255, 255, 0.05)',
                  boxShadow: isSelected 
                    ? '0 0 12px rgba(201, 148, 58, 0.15)' 
                    : 'none'
                }}
              >
                <span className="font-mono text-xs" style={{ color: isSelected ? itemColor : 'rgba(255,255,255,0.3)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col">
                  <span className={`text-xs ${isSelected ? 'text-white font-semibold' : 'text-white/60'}`}>
                    {item.title}
                  </span>
                  <span className="text-[8px] font-mono tracking-wider opacity-50 uppercase mt-0.5" style={{ color: itemColor }}>
                    {isGold ? 'OURO' : 'PRATA'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 items-stretch">
        
        {/* Main Work Panel (Takes full width now) */}
        <div className="space-y-6 flex flex-col justify-between w-full">
          
          <AnimatePresence mode="wait">
            
            {/* Tab 1: Detailed split textbook + simulation side-by-side on lg */}
            {activeTab === 'summary' && activeSubjectData && (
              <motion.div
                key="summary-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 flex-1 w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left Column: Textbook content (Spacious text) */}
                  <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0c0905]/40 border border-white/[0.04] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-[#d2af5a]/20 [.theme-silver_&]:hover:border-[#cbd5e1]/20 [.theme-silver_&]:border-[#cbd5e1]/20 flex flex-col h-[600px] lg:h-[720px] group"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.15)' }}
                  >
                    <div className="absolute inset-0 opacity-[0.015] pointer-events-none group-hover:opacity-[0.03] transition-all" style={{
                      background: `radial-gradient(circle at 0% 0%, ${isGoldTheme ? '#d2af5a' : '#cbd5e1'}, transparent 50%)`
                    }} />

                    <div className="overflow-y-auto space-y-4 pr-2 ipb-thinscroll h-full">
                      <div className="flex justify-between items-start border-b border-white/[0.06] pb-3 w-full sticky top-0 bg-[#0c0905]/95 backdrop-blur-md z-10">
                        <div>
                          <span className="text-xs px-2 py-0.5 rounded font-mono bg-[#d2af5a]/10 [.theme-silver_&]:bg-[#cbd5e1]/10 border border-[#d2af5a]/20 [.theme-silver_&]:border-[#cbd5e1]/20 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] uppercase">SUMÁRIO ACADÊMICO</span>
                          <h4 className="text-base font-bold text-white/95 leading-tight mt-1 uppercase">
                            {syllabusItem.title}
                          </h4>
                          <span className="text-xs text-white/50 block mt-0.5">{activeSubjectData.title}</span>
                        </div>
                      </div>

                      {/* Chapter Pagination Pills */}
                      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/[0.06] ipb-thinscroll sticky top-[57px] bg-[#0c0905]/95 backdrop-blur-md z-10">
                        {activeSubjectData.chapters.map((chap: any, idx: number) => {
                          const isSelected = activeChapterIndex === idx
                          return (
                            <button
                              key={idx}
                              onClick={() => setActiveChapterIndex(idx)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-[#d2af5a]/15 [.theme-silver_&]:bg-[#cbd5e1]/15 text-[#d2af5a] border border-[#d2af5a]/30 [.theme-silver_&]:border-[#cbd5e1]/30 font-bold'
                                  : 'bg-white/[0.02] text-white/60 border border-white/[0.04] hover:bg-white/[0.05] hover:text-white/80'
                              }`}
                            >
                              <span>Cap {idx + 1}</span>
                            </button>
                          )
                        })}
                      </div>

                      <div className="space-y-6 mt-4">
                        {(() => {
                          const chapter = activeSubjectData.chapters[activeChapterIndex] ?? activeSubjectData.chapters[0]
                          if (!chapter) return null
                          const cIdx = activeSubjectData.chapters.indexOf(chapter)
                          return (
                            <div key={cIdx} className="space-y-4 pb-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-2.5">
                                  <span className="text-xs font-mono font-bold text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] mt-0.5">Cap {cIdx + 1}</span>
                                  <div>
                                    <h5 className="text-sm font-bold text-white/90 leading-tight uppercase">
                                      {chapter.title}
                                    </h5>
                                    {chapter.description && (
                                      <p className="text-xs text-white/50 italic mt-1 leading-relaxed">{chapter.description}</p>
                                    )}
                                  </div>
                                </div>
                                <TTSPlayer text={chapter.subsections.map((s: any) => s.content).join('. ')} className="shrink-0" />
                              </div>

                              <div className="space-y-4 pl-3 border-l border-white/[0.06] ml-2 mt-3">
                                {chapter.subsections.map((sub: any, sIdx: number) => (
                                  <div key={sIdx} className="space-y-2">
                                    {sub.title && (
                                      <h6 className="text-xs font-bold text-white/80 leading-snug flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" />
                                        {sub.title}
                                      </h6>
                                    )}
                                    <p className="text-xs lg:text-sm text-white/60 leading-relaxed text-justify whitespace-pre-line">
                                      {sub.content}
                                    </p>

                                    {sub.studyCase && (
                                      <div className="mt-3 rounded-xl p-4 bg-[#d2af5a]/5 [.theme-silver_&]:bg-[#cbd5e1]/5 border-l-2 border-[#d2af5a] [.theme-silver_&]:border-[#cbd5e1] border border-[#d2af5a]/10 [.theme-silver_&]:border-[#cbd5e1]/10 space-y-1.5">
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] block">Estudo de Caso · {sub.studyCase.title}</span>
                                        <p className="text-xs text-[#d2af5a]/80 [.theme-silver_&]:text-[#cbd5e1]/80 leading-relaxed text-justify whitespace-pre-line">
                                          {sub.studyCase.body}
                                        </p>
                                      </div>
                                    )}

                                    {sub.deepDive && (
                                      <div className="mt-3 rounded-xl p-3.5 bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#cbd5e1]/50 block">Aprofundamento Técnico</span>
                                        <p className="text-xs text-white/50 leading-relaxed text-justify whitespace-pre-line">
                                          {sub.deepDive}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}

                                {chapter.synthesis && (
                                  <div className="mt-4 rounded-xl p-4 bg-white/[0.01] border border-white/[0.04] space-y-2.5">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#d2af5a]/80 [.theme-silver_&]:text-[#cbd5e1]/80 block">Síntese Estratégica & Insights</span>
                                    <ul className="space-y-2">
                                      {chapter.synthesis.bullets.map((bullet: string, bIdx: number) => (
                                        <li key={bIdx} className="text-xs text-white/60 leading-relaxed flex items-start gap-2.5 text-justify">
                                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#cbd5e1]" />
                                          <span>{bullet}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Simulation Board & Pillars inside the content */}
                  <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-md relative overflow-y-auto ipb-thinscroll flex flex-col justify-between h-[600px] lg:h-[720px]"
                    style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                  >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                      background: `radial-gradient(circle at 100% 0%, ${isGoldTheme ? '#d2af5a' : '#cbd5e1'}, transparent 50%)`
                    }} />

                    <div className="space-y-4 flex-1 flex flex-col">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]">
                          {dbId === 'M4-S1' ? 'Simulador NASA 6D Ativo' : 'Simulador Ativo'}
                        </span>
                        <h4 className="text-sm font-bold text-white/95 mt-1">
                          {dbId === 'M4-S1' ? 'Ambiente Realista de Simulação de Negócios' : 'Conexões Estratégicas de Negócios'}
                        </h4>
                        <p className="text-xs text-white/50 leading-relaxed mt-1 text-justify">
                          {dbId === 'M4-S1' 
                            ? `Simulador executivo de alto realismo com base em equações de modelagem e dinâmica de sistemas para a disciplina de *${syllabusItem.title}*. Ajuste os parâmetros operacionais abaixo para observar o impacto em tempo real.`
                            : `Mapeamento dinâmico que simula o fluxo cognitivo, as correlações teóricas e o impacto prático na disciplina de *${syllabusItem.title}*. Interaja com os nós operacionais abaixo para visualizar as dependências transversais de governança.`}
                        </p>
                      </div>

                      <div className="my-2 border border-white/5 rounded-xl overflow-hidden bg-black/40 flex-1 flex flex-col min-h-[380px]">
                        <NASA6DSimulator dbId={dbId} chapterIndex={activeChapterIndex} theme={activeTheme} />
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* Tab 2: AI Advisor Chatbot (Spacious full width) */}
            {activeTab === 'tutor' && (
              <motion.div
                key="tutor-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 flex-1 flex flex-col justify-between w-full"
              >
                <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-md flex flex-col justify-between h-[600px] lg:h-[720px] relative overflow-hidden"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                >
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 ipb-thinscroll">
                    {tutorHistory.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className="max-w-[75%] rounded-xl p-4 text-xs lg:text-sm leading-relaxed text-justify whitespace-pre-line"
                          style={{
                            background: msg.role === 'user' ? 'rgba(var(--theme-primary-rgb),0.12)' : 'rgba(255,255,255,0.03)',
                            border: msg.role === 'user' ? '1px solid rgba(var(--theme-primary-rgb),0.22)' : '1px solid rgba(255,255,255,0.05)',
                            color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.75)'
                          }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTutorLoading && (
                      <div className="flex justify-start">
                        <div className="rounded-xl p-3 bg-white/5 border border-white/10 text-xs text-white/40 font-mono">
                          Advisor analisando dados...
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 my-3">
                    {['Explicar Conceito', 'Aplicar ao meu Negócio', 'Análise SWOT'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleAskTutor(`${chip} da disciplina ${syllabusItem.title}`)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 cursor-pointer transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 border-t border-white/[0.06] pt-4 shrink-0">
                    <input
                      value={tutorInput}
                      onChange={(e) => setTutorInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskTutor(tutorInput)}
                      placeholder="Faça uma pergunta sobre o sumário executivo..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs lg:text-sm text-white outline-none focus:border-[#d2af5a]/40 [.theme-silver_&]:focus:border-[#cbd5e1]/40 [.theme-silver_&]:border-[#cbd5e1]/40"
                    />
                    <button
                      onClick={() => handleAskTutor(tutorInput)}
                      className="px-4 py-2.5 rounded-lg bg-[#d2af5a] [.theme-silver_&]:bg-[#cbd5e1] hover:bg-[#d2af5a]/80 [.theme-silver_&]:hover:bg-[#cbd5e1]/80 text-black flex items-center justify-center shrink-0 cursor-pointer transition-all"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Memorando / Custom notes (Spacious full width) */}
            {activeTab === 'notes' && (
              <motion.div
                key="notes-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 flex-1 flex flex-col justify-between w-full"
              >
                <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] relative overflow-hidden h-[600px] lg:h-[720px] flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{
                    background: `radial-gradient(circle at 100% 100%, ${isGoldTheme ? '#d2af5a' : '#cbd5e1'}, transparent 50%)`
                  }} />
                  <div className="flex flex-col h-full space-y-4">
                    <div className="flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-5 w-5 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]" />
                        <span className="text-xs uppercase tracking-widest font-bold text-white/40">Notas de Implementação Operacional</span>
                      </div>
                      <span className="text-xs text-white/30 font-mono">Salvo automaticamente</span>
                    </div>

                    <textarea
                      value={notes}
                      onChange={(e) => handleSaveNotes(e.target.value)}
                      placeholder={`Escreva suas notas estratégicas e memorandos de implementação para a disciplina: ${syllabusItem.title}...`}
                      className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-xs lg:text-sm text-white/80 leading-relaxed outline-none focus:border-[#d2af5a]/30 [.theme-silver_&]:focus:border-[#cbd5e1]/30 [.theme-silver_&]:border-[#cbd5e1]/30 resize-none placeholder:text-white/20 ipb-thinscroll"
                    />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
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
        style={{ borderBottom: '1px solid rgba(var(--theme-primary-rgb),0.12)' }}
      >
        <div className="mb-2 flex items-center justify-between lg:mb-3">
          <p className="text-[7px] uppercase tracking-[0.22em] text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] lg:text-[9px] lg:tracking-[0.44em]">Academic Trilha</p>
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
                        background: 'linear-gradient(135deg, rgba(var(--theme-primary-rgb),0.12), rgba(20,16,8,0.7))',
                        border: '1px solid rgba(var(--theme-primary-rgb),0.32)',
                        boxShadow: 'inset 0 1px 0 rgba(var(--theme-primary-rgb),0.18)',
                      }
                    : { border: '1px solid transparent' }
                }
              >
                <div className={`module-icon flex h-6 w-6 items-center justify-center rounded-[6px] shrink-0 ${isActive ? 'bg-[#d2af5a]/15 [.theme-silver_&]:bg-[#cbd5e1]/15 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]' : 'bg-white/5 text-white/32'}`}>
                  <ModIcon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[7px] uppercase tracking-[0.16em] lg:text-[8px] lg:tracking-[0.22em] ${
                      isActive ? 'text-[#d2af5a]/80 [.theme-silver_&]:text-[#cbd5e1]/80' : 'text-white/20'
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
                <div className={`h-[1px] w-[1px] rounded-full transition-all duration-300 lg:h-1 lg:w-1 ${
                    isActive ? 'bg-[#d2af5a] [.theme-silver_&]:bg-[#cbd5e1] shadow-[0_0_6px_rgba(var(--theme-primary-rgb),0.8)] [.theme-silver_&]:shadow-[0_0_6px_rgba(203,213,225,0.8)]' : 'bg-white/16'
                  }`} />
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
                                background: 'rgba(var(--theme-primary-rgb),0.06)',
                                boxShadow: 'inset 0 0 0 1px rgba(var(--theme-primary-rgb),0.18)',
                              }
                            : { background: 'transparent' }
                        }
                      >
                        <FileText
                          className={`h-2.5 w-2.5 shrink-0 lg:h-3 lg:w-3 ${isTopicActive ? 'text-[#d2af5a]' : 'text-white/28'}`}
                        />
                        <span
                          className={`shrink-0 font-mono text-[7px] tracking-[0.04em] lg:text-[7.5px] lg:tracking-[0.06em] ${
                            isTopicActive ? 'text-[#d2af5a]/70 [.theme-silver_&]:text-[#cbd5e1]/70' : 'text-white/26'
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
  const isAdmin = useAuthStore((s) => s.isAdmin)
  const ARCHIVED_MODULE_IDS = ['M2', 'M3']

  return (
    <div className="ipb-soft relative overflow-hidden rounded-[1.8rem] px-5 py-6 md:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[0.7rem] border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <BookOpen className="h-4 w-4 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]">Trilhas Acadêmicas</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8.5px] px-2 py-0.5 rounded font-mono bg-[#d2af5a]/10 [.theme-silver_&]:bg-[#cbd5e1]/10 border border-[#d2af5a]/20 [.theme-silver_&]:border-[#cbd5e1]/20 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]">TRILHA OURO</span>
          <span className="text-[8.5px] px-2 py-0.5 rounded font-mono bg-[#cbd5e1]/10 border border-[#cbd5e1]/20 text-[#cbd5e1]">TRILHA PRATA</span>
        </div>
      </div>

      {/* Unified Rail nodes with parallel gold and silver tracks layered vertically */}
      <div className="relative px-2 md:px-4">
        {/* Upper Track Line (Gold - Dourado) */}
        <div className="pointer-events-none absolute inset-x-0 top-[2.05rem] h-[1.5px]" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(var(--theme-primary-rgb),0.08) 12%, rgba(var(--theme-primary-rgb),0.38) 45%, rgba(var(--theme-primary-rgb),0.48) 50%, rgba(var(--theme-primary-rgb),0.38) 55%, rgba(var(--theme-primary-rgb),0.08) 88%, transparent 100%)',
          boxShadow: '0 0 4px rgba(201, 148, 58, 0.2)'
        }} />

        {/* Lower Track Line (Silver - Prata) */}
        <div className="pointer-events-none absolute inset-x-0 top-[2.45rem] h-[1.5px]" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(203,213,225,0.08) 12%, rgba(203,213,225,0.28) 45%, rgba(203,213,225,0.38) 50%, rgba(203,213,225,0.28) 55%, rgba(203,213,225,0.08) 88%, transparent 100%)',
          boxShadow: '0 0 4px rgba(203, 213, 225, 0.15)'
        }} />

        <div className="relative flex items-start justify-between gap-2 md:gap-4">
          {modules.map((module, index) => {
            const active = index === activeIndex
            const done = activeIndex !== null && index < activeIndex
            const ModuleIcon = module.icon
            const isGold = module.id === 'M4'
            const itemColor = isGold ? '#d2af5a' : '#cbd5e1'
            const isArchived = ARCHIVED_MODULE_IDS.includes(module.id)

            return (
              <button
                key={module.id}
                onClick={() => onSelect(index)}
                className="group flex min-w-0 flex-1 flex-col items-center gap-2 text-center cursor-pointer relative"
                title={module.title}
                style={{ opacity: isArchived && !active ? 0.6 : 1 }}
              >
                <div className="flex flex-col items-center gap-2 relative">
                  <motion.div
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 md:h-11 md:w-11"
                    style={
                      active
                        ? {
                            borderColor: isGold ? 'rgba(201, 148, 58, 0.55)' : 'rgba(203, 213, 225, 0.55)',
                            background: isGold 
                              ? 'radial-gradient(circle at 30% 28%, rgba(var(--theme-primary-rgb),0.55) 0%, rgba(var(--theme-primary-rgb),0.35) 45%, rgba(40,28,8,0.95) 100%)'
                              : 'radial-gradient(circle at 30% 28%, rgba(203,213,225,0.45) 0%, rgba(203,213,225,0.25) 45%, rgba(15,18,22,0.95) 100%)',
                            boxShadow: isGold
                              ? '0 0 16px rgba(201, 148, 58, 0.32), 0 0 32px rgba(201, 148, 58, 0.16), inset 0 0.2px 0.2px rgba(255,235,180,0.32)'
                              : '0 0 16px rgba(203, 213, 225, 0.22), 0 0 32px rgba(203, 213, 225, 0.11), inset 0 0.2px 0.2px rgba(255,255,255,0.22)',
                            color: '#fff',
                          }
                        : done
                        ? {
                            borderColor: isGold ? 'rgba(201, 148, 58, 0.32)' : 'rgba(203, 213, 225, 0.32)',
                            background: isGold
                              ? 'linear-gradient(180deg, rgba(var(--theme-primary-rgb),0.18) 0%, rgba(20,16,8,0.92) 100%)'
                              : 'linear-gradient(180deg, rgba(203,213,225,0.18) 0%, rgba(12,14,18,0.92) 100%)',
                            color: 'rgba(255,255,255,0.8)',
                          }
                        : {
                            borderColor: 'rgba(200,205,215,0.14)',
                            background: 'linear-gradient(180deg, rgba(200,205,215,0.06) 0%, rgba(20,22,28,0.92) 100%)',
                            color: 'rgba(255,255,255,0.4)',
                          }
                    }
                  >
                    <ModuleIcon className="h-3.5 w-3.5" />
                    {isAdmin && isArchived && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d2af5a]/20 border border-[#d2af5a]/40 text-[8px] text-[#e0b85e] shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                        📦
                      </span>
                    )}
                  </motion.div>
                </div>

                <div
                  className="h-1.5 w-1.5 rounded-full transition-all duration-300 mt-1"
                  style={
                    active
                      ? { background: itemColor, boxShadow: `0 0 8px ${itemColor}` }
                      : done
                      ? { background: `${itemColor}80` }
                      : { background: 'rgba(200,205,215,0.20)' }
                  }
                />

                <span
                  className="max-w-[5rem] text-center text-[9px] leading-tight tracking-[0.06em] mt-1 transition-colors duration-200"
                  style={{ color: active ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.28)' }}
                >
                  {module.title}
                  {isAdmin && isArchived && (
                    <span className="block text-[6.5px] text-[#d2af5a]/80 font-bold uppercase tracking-widest mt-0.5">(Arquivado)</span>
                  )}
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

export default function ConteudosPageClient({ mode = 'normal' }: { mode?: 'normal' | 'archived' }) {
  const isAdmin = useAuthStore((s) => s.isAdmin)
  const fontScale = useAccessibility((s) => s.fontScale)
  const increaseFontScale = useAccessibility((s) => s.increaseFontScale)
  const decreaseFontScale = useAccessibility((s) => s.decreaseFontScale)
  const scalePct = Math.round(fontScale * 100)

  const visibleModules = MODULES.filter((m) => mode === 'archived' ? (m.id === 'M2' || m.id === 'M3') : (m.id === 'M1' || m.id === 'M4'))

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const [topicsMap, setTopicsMap] = useState<ModuleTopicsMap>({})
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null)
  const [clockTime, setClockTime] = useState('14:45')
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0)

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
  const baseTheme = current ? MODULE_THEMES[current.id] : MODULE_THEMES.M4
  const isGlobalGold = activeSubjectIndex % 2 === 0
  const activeTheme = {
    ...baseTheme,
    primary: isGlobalGold ? baseTheme.primary : '#cbd5e1',
    badgeText: isGlobalGold ? baseTheme.badgeText : '#cbd5e1',
    gradient: isGlobalGold ? baseTheme.gradient : 'linear-gradient(90deg, #94a3b8 0%, #cbd5e1 100%)'
  }
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

  const filteredActiveIndex = activeIndex !== null 
    ? visibleModules.findIndex(m => m.id === MODULES[activeIndex].id) 
    : null;

  const handleSelectModuleFiltered = (filteredIndex: number) => {
    if (filteredIndex === -1 || filteredIndex === undefined || filteredIndex === null) return;
    const selectedModule = visibleModules[filteredIndex];
    if (!selectedModule) return;
    const originalIndex = MODULES.findIndex(m => m.id === selectedModule.id);
    handleSelectModule(originalIndex);
  };

  function handleSelectTopic(moduleIndex: number, topicId: string) {
    setActiveIndex(moduleIndex)
    setActiveTopicId(null)
    requestAnimationFrame(() => {
      setActiveTopicId(topicId)
      // Automatically jump to the first lesson belonging to this topic/KPI
      const activeModuleId = MODULES[moduleIndex]?.id
      const playlist = activeModuleId === 'M1' ? NEURO_PLAYLIST : activeModuleId === 'M2' ? PNEUMO_PLAYLIST : BUSINESS_PLAYLIST
      const idx = playlist.findIndex(item => item.topicId === topicId)
      if (idx !== -1) {
        setActiveLessonIndex(idx)
      }
    })
  }

  // Sync masterclass video with the academic syllabus subjects
  useEffect(() => {
    const activeModuleId = MODULES[activeIndex ?? 0]?.id
    const playlist = activeModuleId === 'M1' ? NEURO_PLAYLIST : activeModuleId === 'M2' ? PNEUMO_PLAYLIST : BUSINESS_PLAYLIST
    const syllabusList = activeModuleId === 'M1' ? NEURO_SYLLABUS : activeModuleId === 'M2' ? PNEUMO_SYLLABUS : BUSINESS_SYLLABUS
    const lesson = playlist[activeLessonIndex]
    if (lesson) {
      const firstSubjectIdx = syllabusList.findIndex(s => s.topicId === lesson.topicId)
      if (firstSubjectIdx !== -1) {
        setActiveSubjectIndex(firstSubjectIdx)
      }
    }
  }, [activeLessonIndex, activeIndex])

  // Sync academic subject back to masterclass video if they click on the index
  function handleSubjectIndexChange(idx: number) {
    setActiveSubjectIndex(idx)
    const activeModuleId = MODULES[activeIndex ?? 0]?.id
    const syllabusList = activeModuleId === 'M1' ? NEURO_SYLLABUS : activeModuleId === 'M2' ? PNEUMO_SYLLABUS : BUSINESS_SYLLABUS
    const subject = syllabusList[idx]
    if (subject) {
      // Find which masterclass video maps to this topic
      const playlist = activeModuleId === 'M1' ? NEURO_PLAYLIST : BUSINESS_PLAYLIST
      const lessonIdx = playlist.findIndex(l => l.topicId === subject.topicId)
      if (lessonIdx !== -1 && lessonIdx !== activeLessonIndex) {
        setActiveLessonIndex(lessonIdx)
        setActiveTopicId(subject.topicId)
      }
    }
  }

  return (
    <div 
      className={`relative min-h-screen overflow-hidden text-white ${!isGlobalGold ? 'theme-silver' : ''}`}
      style={{
        '--theme-primary': activeTheme.primary,
        '--theme-primary-rgb': !isGlobalGold ? '203, 213, 225' : '212, 184, 122',
        zoom: fontScale,
      } as React.CSSProperties}
    >
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
              <Link href={mode === 'archived' ? '/profile' : '/explore'}>
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
                >
                  <ArrowLeft className="h-4 w-4 text-white/60" />
                </motion.div>
              </Link>
              <div className="h-px w-24 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent)]" />
              
              {/* Zoom A−/A+ — visível em mobile e desktop */}
              <div
                className="flex items-center gap-0.5 overflow-hidden rounded-[0.6rem] bg-black/45"
                style={{ border: '0.2px solid rgba(255, 255, 255, 0.1)' }}
              >
                <button
                  onClick={decreaseFontScale}
                  disabled={scalePct <= 20}
                  aria-label="Diminuir texto"
                  title="Diminuir texto"
                  className="flex h-7 w-7 items-center justify-center text-white/40 transition hover:text-white/75 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="text-[9px] font-bold" style={{ fontFamily: 'monospace' }}>A−</span>
                </button>
                <span
                  className="hidden select-none px-1 text-[8px] tabular-nums text-white/25 w-[28px] text-center md:inline-block"
                  style={{ fontFamily: 'monospace' }}
                >
                  {scalePct}%
                </span>
                <button
                  onClick={increaseFontScale}
                  disabled={scalePct >= 200}
                  aria-label="Aumentar texto"
                  title="Aumentar texto"
                  className="flex h-7 w-7 items-center justify-center text-white/40 transition hover:text-white/75 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="text-[11px] font-bold" style={{ fontFamily: 'monospace' }}>A+</span>
                </button>
              </div>

            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]">
                {mode === 'archived' ? 'Acervo Clínico Arquivado' : 'Academic Cockpit'}
              </span>
            </div>
          </div>

          {/* Content Layout — Full Width */}
          <div className="flex flex-col gap-6">

              {/* Premium Archived Systems Launcher (Only for Admin in Archived Mode) */}
              {mode === 'archived' && (
                <div className="ipb-soft relative overflow-hidden rounded-[1.8rem] px-5 py-6 md:px-8 bg-gradient-to-br from-amber-500/5 to-transparent border border-[#d2af5a]/10">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[0.7rem] border border-[#d2af5a]/20 bg-[#d2af5a]/10">
                      <Calculator className="h-4 w-4 text-[#d2af5a]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d2af5a] block">Sistemas Clínicos de Plantão</span>
                      <span className="text-[7.5px] text-white/45 uppercase tracking-wider font-mono">Ferramentas homologadas para suporte à decisão na beira do leito</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'S1', title: 'IPB ICU', desc: 'Prontuário clínico eletrônico e monitoramento de leitos', icon: Cpu },
                      { id: 'S2', title: 'Calculadoras VM', desc: 'Ventilação Mecânica Protetora, desmame e VNI', icon: Calculator },
                      { id: 'S3', title: 'Referência Clínica', desc: 'Protocolos de intensivismo, fisiologia e ventilação', icon: FileText }
                    ].map((sys) => (
                      <Link 
                        key={sys.id} 
                        href={`/explore/sistemas?active=${sys.id}&clinical=true`}
                        className="group relative flex flex-col p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#d2af5a]/20 transition-all duration-300 pointer-events-auto"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <sys.icon className="h-5 w-5 text-white/50 group-hover:text-[#d2af5a] transition-colors" />
                          <span className="text-[7px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 group-hover:border-[#d2af5a]/20 group-hover:text-[#e0b85e] transition-all">{sys.id}</span>
                        </div>
                        <h4 className="text-[11.5px] font-bold text-white/95 group-hover:text-[#e0b85e] transition-colors leading-tight">{sys.title}</h4>
                        <p className="text-[9px] text-white/40 leading-snug mt-1">{sys.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Timeline Track */}
              <ModuleRail modules={visibleModules} activeIndex={filteredActiveIndex} onSelect={handleSelectModuleFiltered} />

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
                          <Radar className="h-3.5 w-3.5 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]" />
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
                              background: 'radial-gradient(circle at 30% 25%, rgba(var(--theme-primary-rgb),0.35) 0%, rgba(var(--theme-primary-rgb),0.20) 50%, rgba(20,16,8,0.95) 100%)',
                              border: '0.2px solid rgba(201, 148, 58, 0.40)',
                              boxShadow: 'inset 0 1px 1px rgba(255,235,180,0.22), 0 0 16px rgba(var(--theme-primary-rgb),0.18)'
                            }}
                          >
                            <span className="text-[12px] font-bold text-white tracking-wider">{current.id}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] uppercase tracking-[0.25em] font-semibold">{current.eyebrow}</span>
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
                      {(current.id === 'M4' || current.id === 'M1' || current.id === 'M2') ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-6 pb-6 items-stretch w-full">
                          {/* Card 1: Masterclass playlist cinema */}
                          <div className="flex w-full">
                            <ExecutiveMasterclassTheater 
                              moduleTitle={current.title} 
                              moduleId={current.id} 
                              onSelectTopic={(topicId) => handleSelectTopic(activeIndex!, topicId)}
                              activeTopicId={activeTopicId}
                              activeLessonIndex={activeLessonIndex}
                              onChangeLessonIndex={setActiveLessonIndex}
                            />
                          </div>

                          {/* Card 2: Executive Performance Dashboard */}
                          <div className="flex w-full">
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



                    </div>

                    {/* Operational Notebook Content Viewer / Estação Unificada de Estudos */}
                    {(current.id === 'M4' || current.id === 'M1' || current.id === 'M2') ? (
                      <ExecutiveStudyBriefing 
                        moduleId={current.id} 
                        activeTopicId={activeTopicId} 
                        activeTheme={activeTheme} 
                        activeSubjectIndex={activeSubjectIndex}
                        onChangeSubjectIndex={handleSubjectIndexChange}
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
                                    <span className="text-[8px] uppercase tracking-wider font-bold" style={{ color: activeTheme.primary }}>
                                      {current.id === 'M4' ? 'Diretoria Executiva' : 'Fundamentos'}
                                    </span>
                                    <span className="text-[9px] text-white/30 font-mono">{current.id} · Core Concepts</span>
                                  </div>
                                  <h3 className="text-base font-bold text-white/90">
                                    {current.id === 'M4' ? 'Estação de Inteligência Acadêmica' : `Conceito de ${current.title}`}
                                  </h3>
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
                                    {(current.id === 'M4' || current.id === 'M1' || current.id === 'M2') ? 'Pilares Corporativos' : 'Pilares do Conhecimento'}
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
                        <BookOpen className="h-7 w-7 text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1]" />
                      </motion.div>
                      <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <p className="text-[10px] uppercase tracking-[0.38em] text-[#d2af5a] [.theme-silver_&]:text-[#cbd5e1] font-semibold">Plataforma Acadêmica IPB</p>
                      <p className="max-w-xs text-[12px] leading-relaxed text-white/44">
                        Selecione um dos módulos acadêmicos acima na trilha para inicializar o cockpit operacional e carregar o caderno de estudos.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

        </div>
      </main>
    </div>
  )
}
