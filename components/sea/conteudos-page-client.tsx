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
  Lightbulb,
  LayoutGrid,
  Scale,
  LineChart,
  Globe,
  Compass,
  Sliders,
  Fingerprint,
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { SUBJECTS_DB } from '@/data/caderno-content-m1-m8'
import { IpbBackground } from '@/components/sea/ipb-background'

// ── Module data ───────────────────────────────────────────────────────────────

type Module = {
  id: string
  title: string
  icon: LucideIcon
  eyebrow: string
  overview: string
  concepts: string[]
}

const MODULES: Module[] = [
  {
    id: 'M1',
    title: 'Inovação e Sustentabilidade',
    icon: Lightbulb,
    eyebrow: 'M1 · Innovation & ESG',
    overview: 'Gestão da inovação, criatividade, transformação digital e sustentabilidade circular corporativa.',
    concepts: [
      'Inovação, Transformação e Ferramentas Digitais',
      'Pensamento Criativo e Habilidades Cognitivas',
      'Sustentabilidade em Negócios e Economia Circular'
    ]
  },
  {
    id: 'M2',
    title: 'Fundamentos de Gestão',
    icon: LayoutGrid,
    eyebrow: 'M2 · Management Foundations',
    overview: 'Processos de gestão de negócios, relatórios patrimoniais, DRE, IFRS e matemática financeira.',
    concepts: [
      'Gestão de Negócios e OKRs',
      'Demonstrações Contábeis e Balanço (IFRS)',
      'Matemática Financeira e Fluxos de Amortização'
    ]
  },
  {
    id: 'M3',
    title: 'Mercado e Pessoas',
    icon: Users,
    eyebrow: 'M3 · Market & People',
    overview: 'Microeconomia, concorrência, forças de mercado, liderança situacional e segurança psicológica.',
    concepts: [
      'Economia de Empresa e Análise Mercadológica (Porter)',
      'Liderança e Gestão de Equipes de Alta Performance',
      'Cultura Organizacional e Captação de Talentos'
    ]
  },
  {
    id: 'M4',
    title: 'Lógica e Humanidades',
    icon: Scale,
    eyebrow: 'M4 · Logic & Humanities',
    overview: 'Filosofia corporativa, ética utilitarista, lógica analítica, derivadas e otimização estatística.',
    concepts: [
      'Filosofia, Pensamento Crítico e Ética nos Negócios',
      'Cálculo Aplicado a Negócios e Otimização Marginal',
      'Análise Estatística, Regressões e Previsão de Demanda'
    ]
  },
  {
    id: 'M5',
    title: 'Empreendedorismo e Estratégia',
    icon: Target,
    eyebrow: 'M5 · Strategy & Ventures',
    overview: 'Modelagem de novos negócios, canvas, lean startup, redação de alto impacto e ambiente macroeconômico.',
    concepts: [
      'Leitura e Escrita Acadêmica e Comunicação Científica',
      'Empreendedorismo e Inovação Exponencial',
      'Ambiente Macroeconômico e Políticas Monetárias'
    ]
  },
  {
    id: 'M6',
    title: 'Finanças Avançadas',
    icon: LineChart,
    eyebrow: 'M6 · Advanced Finance',
    overview: 'Valuation, DCF, estrutura de capital, WACC, markup, precificação dinâmica e governança ética.',
    concepts: [
      'Análise Financeira, EBITDA, ROIC e Valuation',
      'Precificação Dinâmica e Elasticidade de Preço',
      'Ética, Compliance e Integridade Corporativa'
    ]
  },
  {
    id: 'M7',
    title: 'Intervenção e Sociedade',
    icon: Globe,
    eyebrow: 'M7 · Social Intervention',
    overview: 'Empreendedorismo social, métricas SROI, teologia do trabalho, diagnóstico operacional e PDCA.',
    concepts: [
      'Empreendedorismo Social e ODS/ONU',
      'Teologia e Sociedade (Dignidade Humana)',
      'Projeto de Intervenção em Negócios e Ciclo PDCA'
    ]
  },
  {
    id: 'M8',
    title: 'Pesquisa e Identidade',
    icon: Compass,
    eyebrow: 'M8 · Research & Purpose',
    overview: 'Metodologias científicas de validação, responsabilidade social, PDIs e projetos de vida.',
    concepts: [
      'Educação, Identidade e Solidariedade (DEI)',
      'Pesquisa Aplicada a Negócios (Quali/Quanti)',
      'Construção de Projetos de Vida e Liderança'
    ]
  }
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
    primary: '#2dd4bf', // Teal Green
    secondary: '#14b8a6',
    accent: 'rgba(45, 212, 191, 0.22)',
    glow: 'rgba(20, 184, 166, 0.12)',
    badgeBg: 'rgba(45, 212, 191, 0.10)',
    badgeText: '#2dd4bf',
    gradient: 'linear-gradient(90deg, #14b8a6 0%, #2dd4bf 100%)'
  },
  M2: {
    primary: '#38bdf8', // Ice Blue
    secondary: '#0ea5e9',
    accent: 'rgba(56, 189, 248, 0.22)',
    glow: 'rgba(14, 165, 233, 0.12)',
    badgeBg: 'rgba(56, 189, 248, 0.10)',
    badgeText: '#38bdf8',
    gradient: 'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%)'
  },
  M3: {
    primary: '#fb7185', // Coral Rose
    secondary: '#f43f5e',
    accent: 'rgba(251, 113, 133, 0.22)',
    glow: 'rgba(244, 63, 94, 0.12)',
    badgeBg: 'rgba(251, 113, 133, 0.10)',
    badgeText: '#fb7185',
    gradient: 'linear-gradient(90deg, #f43f5e 0%, #fb7185 100%)'
  },
  M4: {
    primary: '#d4b87a', // Gold
    secondary: '#b39556',
    accent: 'rgba(212, 184, 122, 0.25)',
    glow: 'rgba(212, 184, 122, 0.12)',
    badgeBg: 'rgba(212, 184, 122, 0.10)',
    badgeText: '#d4b87a',
    gradient: 'linear-gradient(90deg, #b39556 0%, #d4b87a 100%)'
  },
  M5: {
    primary: '#a78bfa', // Purple Violet
    secondary: '#8b5cf6',
    accent: 'rgba(167, 139, 250, 0.22)',
    glow: 'rgba(139, 92, 246, 0.12)',
    badgeBg: 'rgba(167, 139, 250, 0.10)',
    badgeText: '#a78bfa',
    gradient: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)'
  },
  M6: {
    primary: '#34d399', // Emerald Mint
    secondary: '#10b981',
    accent: 'rgba(52, 211, 153, 0.22)',
    glow: 'rgba(16, 185, 129, 0.12)',
    badgeBg: 'rgba(52, 211, 153, 0.10)',
    badgeText: '#34d399',
    gradient: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
  },
  M7: {
    primary: '#fb923c', // Warm Orange
    secondary: '#f97316',
    accent: 'rgba(251, 146, 60, 0.22)',
    glow: 'rgba(249, 115, 22, 0.12)',
    badgeBg: 'rgba(251, 146, 60, 0.10)',
    badgeText: '#fb923c',
    gradient: 'linear-gradient(90deg, #f97316 0%, #fb923c 100%)'
  },
  M8: {
    primary: '#94a3b8', // Silver Slate
    secondary: '#64748b',
    accent: 'rgba(148, 163, 184, 0.22)',
    glow: 'rgba(100, 116, 139, 0.12)',
    badgeBg: 'rgba(148, 163, 184, 0.10)',
    badgeText: '#94a3b8',
    gradient: 'linear-gradient(90deg, #64748b 0%, #94a3b8 100%)'
  }
}

const ease = [0.16, 1, 0.3, 1] as const

type ModuleTopicsMap = Record<string, { id: string; title: string }[]>

const INITIAL_TOPICS_MAP: ModuleTopicsMap = {
  M1: [
    { id: 'M1-S1', title: 'Gestão da Inovação e Ferramentas Digitais' },
    { id: 'M1-S2', title: 'Pensamento Criativo' },
    { id: 'M1-S3', title: 'Sustentabilidade em Negócios' }
  ],
  M2: [
    { id: 'M2-S1', title: 'Gestão de Negócios' },
    { id: 'M2-S2', title: 'Demonstrações Contábeis' },
    { id: 'M2-S3', title: 'Matemática Financeira' }
  ],
  M3: [
    { id: 'M3-S1', title: 'Economia de Empresa e Análise Mercadológica' },
    { id: 'M3-S2', title: 'Liderança e Gestão de Equipes' }
  ],
  M4: [
    { id: 'M4-S1', title: 'Filosofia' },
    { id: 'M4-S2', title: 'Cálculo Aplicado a Negócios' },
    { id: 'M4-S3', title: 'Análise Estatística' }
  ],
  M5: [
    { id: 'M5-S1', title: 'Leitura e Escrita Acadêmica' },
    { id: 'M5-S2', title: 'Empreendedorismo e Inovação' },
    { id: 'M5-S3', title: 'Ambiente Macroeconômico' }
  ],
  M6: [
    { id: 'M6-S1', title: 'Análise Financeira' },
    { id: 'M6-S2', title: 'Precificação' },
    { id: 'M6-S3', title: 'Ética' }
  ],
  M7: [
    { id: 'M7-S1', title: 'Empreendedorismo Social' },
    { id: 'M7-S2', title: 'Teologia e Sociedade' },
    { id: 'M7-S3', title: 'Projeto de Intervenção em Negócios' }
  ],
  M8: [
    { id: 'M8-S1', title: 'Educação, Identidade e Solidariedade' },
    { id: 'M8-S2', title: 'Pesquisa Aplicada a Negócios' }
  ]
}

const ACADEMIC_SYLLABUS = [
  { id: 'M1-S1', subtitle: 'M1 · Ferramentas Digitais', duration: '22:15' },
  { id: 'M1-S2', subtitle: 'M1 · Pensamento Criativo', duration: '18:40' },
  { id: 'M1-S3', subtitle: 'M1 · Economia Circular', duration: '25:10' },
  { id: 'M2-S1', subtitle: 'M2 · Gestão e OKRs', duration: '20:30' },
  { id: 'M2-S2', subtitle: 'M2 · Contabilidade IFRS', duration: '24:15' },
  { id: 'M2-S3', subtitle: 'M2 · Matemática Financeira', duration: '22:45' },
  { id: 'M3-S1', subtitle: 'M3 · Análise de Porter', duration: '19:50' },
  { id: 'M3-S2', subtitle: 'M3 · Alta Performance', duration: '21:20' },
  { id: 'M4-S1', subtitle: 'M4 · Ética e Lógica', duration: '23:10' },
  { id: 'M4-S2', subtitle: 'M4 · Cálculo e Otimização', duration: '26:40' },
  { id: 'M4-S3', subtitle: 'M4 · Estatística Regressiva', duration: '24:50' },
  { id: 'M5-S1', subtitle: 'M5 · Comunicação Premium', duration: '17:30' },
  { id: 'M5-S2', subtitle: 'M5 · Lean Canvas Setup', duration: '25:20' },
  { id: 'M5-S3', subtitle: 'M5 · Ambiente Macro', duration: '21:10' },
  { id: 'M6-S1', subtitle: 'M6 · Valuation & DCF', duration: '27:40' },
  { id: 'M6-S2', subtitle: 'M6 · Elasticidade-Preço', duration: '20:15' },
  { id: 'M6-S3', subtitle: 'M6 · Compliance & Ética', duration: '22:30' },
  { id: 'M7-S1', subtitle: 'M7 · Métricas SROI', duration: '23:45' },
  { id: 'M7-S2', subtitle: 'M7 · Teologia do Trabalho', duration: '19:10' },
  { id: 'M7-S3', subtitle: 'M7 · Gestão com PDCA', duration: '24:20' },
  { id: 'M8-S1', subtitle: 'M8 · Cultura DEI', duration: '18:50' },
  { id: 'M8-S2', subtitle: 'M8 · Validação Científica', duration: '22:15' }
]

const SUBJECT_KPIS: Record<string, {
  metric1: { label: string; value: string; progress: number; sparkline: number[] }
  metric2: { label: string; value: string; chartData: number[] }
  metric3: { label: string; value: string; badge: string }
}> = {
  'M1-S1': {
    metric1: { label: 'Adoção Digital', value: '92.4%', progress: 92.4, sparkline: [40, 55, 62, 78, 85, 92] },
    metric2: { label: 'Time-to-Market', value: '5.2d', chartData: [12, 10, 8, 7, 6, 5] },
    metric3: { label: 'Nível TRL', value: 'TRL 9', badge: 'Alta Automação' }
  },
  'M1-S2': {
    metric1: { label: 'Geração de Ideias', value: '96.8%', progress: 96.8, sparkline: [30, 45, 60, 80, 88, 96] },
    metric2: { label: 'Bloqueio Cognitivo', value: '-82%', chartData: [90, 70, 50, 35, 25, 18] },
    metric3: { label: 'Fluência Guilford', value: 'Excepcional', badge: 'Alta Divergência' }
  },
  'M1-S3': {
    metric1: { label: 'Circularidade', value: '88.5%', progress: 88.5, sparkline: [20, 35, 50, 68, 78, 88] },
    metric2: { label: 'Resíduos Mitigados', value: '-42.8%', chartData: [100, 85, 72, 60, 50, 42] },
    metric3: { label: 'Selo ESG', value: 'AAA', badge: 'Cradle-to-Cradle' }
  },
  'M2-S1': {
    metric1: { label: 'Uso de OKRs', value: '94.2%', progress: 94.2, sparkline: [50, 65, 72, 85, 90, 94] },
    metric2: { label: 'Aproveitamento', value: '91.5%', chartData: [60, 70, 78, 82, 88, 91] },
    metric3: { label: 'Métricas Ágeis', value: 'Grau A', badge: 'Alta Eficiência' }
  },
  'M2-S2': {
    metric1: { label: 'Acurácia Contábil', value: '100%', progress: 100, sparkline: [95, 98, 99, 100, 100, 100] },
    metric2: { label: 'Auditabilidade', value: '99.8%', chartData: [80, 88, 92, 95, 98, 99] },
    metric3: { label: 'Normas IFRS', value: 'Padrão Ext.', badge: 'Confiança de Mercado' }
  },
  'M2-S3': {
    metric1: { label: 'Cálculo de Juros', value: '98.5%', progress: 98.5, sparkline: [80, 85, 90, 93, 96, 98] },
    metric2: { label: 'Base de Amortização', value: '12 meses', chartData: [12, 10, 8, 6, 4, 2] },
    metric3: { label: 'Modelo SAC/Price', value: 'SAC Vencedor', badge: 'Custo Minimizado' }
  },
  'M3-S1': {
    metric1: { label: 'Gargalo Concorrencial', value: 'Sob Controle', progress: 90, sparkline: [40, 50, 65, 78, 82, 90] },
    metric2: { label: 'Forças de Porter', value: 'Pressão 12%', chartData: [35, 30, 25, 20, 15, 12] },
    metric3: { label: 'Oceano Azul', value: 'Grau Máximo', badge: 'Diferencial Forte' }
  },
  'M3-S2': {
    metric1: { label: 'Segurança Psicológica', value: '96.4%', progress: 96.4, sparkline: [60, 75, 82, 90, 93, 96] },
    metric2: { label: 'Retenção de Talentos', value: '94.8%', chartData: [80, 84, 88, 91, 93, 94] },
    metric3: { label: 'eNPS', value: '+78 pts', badge: 'Cultura Altamente Segura' }
  },
  'M4-S1': {
    metric1: { label: 'Rigor Ético', value: '99.1%', progress: 99.1, sparkline: [90, 93, 95, 97, 98, 99] },
    metric2: { label: 'Consciência Crítica', value: '94.5%', chartData: [70, 75, 82, 88, 91, 94] },
    metric3: { label: 'Ikigai Corporativo', value: 'Alinhado', badge: 'Rigor Filosófico' }
  },
  'M4-S2': {
    metric1: { label: 'Otimização de Lucro', value: '95.2%', progress: 95.2, sparkline: [70, 80, 85, 90, 93, 95] },
    metric2: { label: 'Marginal Revenue R\'', value: 'R\' = C\'', chartData: [40, 30, 20, 10, 5, 0] },
    metric3: { label: 'Derivada Aplicada', value: 'Ponto Ótimo', badge: 'Margem Máxima' }
  },
  'M4-S3': {
    metric1: { label: 'Confiança Estatística', value: '95%', progress: 95, sparkline: [85, 88, 90, 92, 94, 95] },
    metric2: { label: 'Desvio Padrão (σ)', value: 'σ = 1.2', chartData: [2.5, 2.0, 1.8, 1.5, 1.3, 1.2] },
    metric3: { label: 'Previsibilidade', value: 'Excelente', badge: 'Regressão Bayesiana' }
  },
  'M5-S1': {
    metric1: { label: 'Acurácia Científica', value: '98.2%', progress: 98.2, sparkline: [80, 85, 90, 94, 96, 98] },
    metric2: { label: 'Rigor Metodológico', value: 'Padrão APA', chartData: [10, 8, 6, 4, 2, 1] },
    metric3: { label: 'Integridade Textual', value: 'Zero Plágio', badge: 'Comunicação Premium' }
  },
  'M5-S2': {
    metric1: { label: 'Disrupção do Modelo', value: '91.8%', progress: 91.8, sparkline: [40, 55, 68, 78, 85, 91] },
    metric2: { label: 'CAC / LTV Ratio', value: '1 : 4.5', chartData: [1.5, 2.0, 2.8, 3.5, 4.0, 4.5] },
    metric3: { label: 'Escala Exponencial', value: 'Valido', badge: 'Canvas & Lean Setup' }
  },
  'M5-S3': {
    metric1: { label: 'Proteção Cambial', value: '88.4%', progress: 88.4, sparkline: [60, 70, 78, 82, 85, 88] },
    metric2: { label: 'Mapeamento Taxas', value: 'Selic/FED', chartData: [50, 40, 30, 25, 20, 15] },
    metric3: { label: 'Resiliência Choque', value: 'Grau Forte', badge: 'Inteligência Macro' }
  },
  'M6-S1': {
    metric1: { label: 'Valuation Preciso', value: '96.2%', progress: 96.2, sparkline: [50, 65, 78, 88, 93, 96] },
    metric2: { label: 'Retorno Operacional', value: '+34.2%', chartData: [15, 20, 24, 28, 31, 34] },
    metric3: { label: 'Margem EBITDA', value: '34.2%', badge: 'High ROI & Margins' }
  },
  'M6-S2': {
    metric1: { label: 'Excedente do Produtor', value: '94.5%', progress: 94.5, sparkline: [70, 78, 85, 90, 93, 94] },
    metric2: { label: 'Markup Adicionado', value: '1.8x Média', chartData: [1.2, 1.4, 1.5, 1.6, 1.7, 1.8] },
    metric3: { label: 'Elasticidade-Preço', value: 'Equilibrada', badge: 'Preço Dinâmico' }
  },
  'M6-S3': {
    metric1: { label: 'Segurança e Compliance', value: '100%', progress: 100, sparkline: [95, 98, 99, 100, 100, 100] },
    metric2: { label: 'Whistleblowing', value: '0 Pendência', chartData: [5, 3, 2, 1, 0, 0] },
    metric3: { label: 'Tone from the Top', value: 'Radical', badge: 'Ética Absoluta' }
  },
  'M7-S1': {
    metric1: { label: 'Multiplicador Social', value: '88.6%', progress: 88.6, sparkline: [40, 55, 68, 78, 83, 88] },
    metric2: { label: 'SROI Calculado', value: 'R$ 3.5 : R$ 1', chartData: [1.5, 2.0, 2.5, 2.8, 3.2, 3.5] },
    metric3: { label: 'Metas ODS/ONU', value: '12 Alinhadas', badge: 'Impacto Autossustentável' }
  },
  'M7-S2': {
    metric1: { label: 'Coesão Social', value: '93.5%', progress: 93.5, sparkline: [60, 72, 80, 86, 90, 93] },
    metric2: { label: 'Solidariedade', value: 'Alta', chartData: [10, 25, 45, 65, 80, 93] },
    metric3: { label: 'Justiça e Propósito', value: 'Padrão Ético', badge: 'Dignidade Humana' }
  },
  'M7-S3': {
    metric1: { label: 'Correção de Falhas', value: '95.4%', progress: 95.4, sparkline: [50, 68, 78, 88, 92, 95] },
    metric2: { label: 'Ciclos PDCA', value: 'Concluídos', chartData: [1, 2, 3, 4, 5, 6] },
    metric3: { label: 'Priorização GUT', value: 'Score Preciso', badge: 'Execução de Projetos' }
  },
  'M8-S1': {
    metric1: { label: 'Score de Equidade DEI', value: '94.2%', progress: 94.2, sparkline: [60, 72, 80, 88, 92, 94] },
    metric2: { label: 'Diversidade Interna', value: '91.8%', chartData: [50, 65, 78, 85, 89, 91] },
    metric3: { label: 'Cultura Inclusiva', value: 'Padrão Ouro', badge: 'Responsabilidade Coletiva' }
  },
  'M8-S2': {
    metric1: { label: 'Acurácia Quali/Quanti', value: '97.5%', progress: 97.5, sparkline: [75, 82, 88, 92, 95, 97] },
    metric2: { label: 'Validação de Hipóteses', value: '99%', chartData: [40, 60, 75, 85, 92, 99] },
    metric3: { label: 'Metodologia', value: 'Científica', badge: 'Pesquisa Profissional' }
  }
}

function MiniNetworkGraph({ moduleId }: { moduleId?: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M1'] || MODULE_THEMES.M1
  const center = { x: 50, y: 50 }
  const nodes = [
    { x: 18, y: 25 }, { x: 82, y: 22 }, { x: 14, y: 70 },
    { x: 85, y: 75 }, { x: 50, y: 12 }, { x: 50, y: 88 },
  ]

  return (
    <div className="relative w-full h-[120px] rounded-lg overflow-hidden bg-black/40 border border-white/[0.04] mt-2">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => (
          <line
            key={i}
            x1={`${center.x}%`}
            y1={`${center.y}%`}
            x2={`${node.x}%`}
            y2={`${node.y}%`}
            stroke={theme.primary}
            strokeWidth="0.5"
            strokeOpacity="0.15"
          />
        ))}
      </svg>

      <div 
        className="absolute w-3.5 h-3.5 rounded-full flex items-center justify-center border animate-pulse"
        style={{
          left: `calc(${center.x}% - 7px)`,
          top: `calc(${center.y}% - 7px)`,
          borderColor: theme.primary,
          background: `radial-gradient(circle at 30% 28%, ${theme.primary} 0%, rgba(20,16,8,0.95) 100%)`,
          boxShadow: `0 0 12px ${theme.accent}`
        }}
      >
        <span className="text-[6.5px] font-bold text-white">★</span>
      </div>

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full border"
          style={{
            left: `calc(${node.x}% - 4px)`,
            top: `calc(${node.y}% - 4px)`,
            borderColor: 'rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.06)'
          }}
          whileHover={{ scale: 1.4, boxShadow: `0 0 10px ${theme.primary}` }}
        />
      ))}
    </div>
  )
}

function STRATEGIC_NODES_MAPPING(moduleId: string) {
  return [
    { id: '1', x: 18, y: 35, label: 'Mapeamento', desc: 'Identificação de core-capabilities e gaps organizacionais' },
    { id: '2', x: 38, y: 70, label: 'Alinhamento', desc: 'Conexão transversal tática baseada em frameworks OKR' },
    { id: '3', x: 50, y: 25, label: 'Implementação', desc: 'Deploy acelerado de ferramentas e automatizações digitais' },
    { id: '4', x: 68, y: 65, label: 'Mapeamento Metódico', desc: 'Monitoramento contínuo da governança sob compliance rigoroso' },
    { id: '5', x: 82, y: 30, label: 'Telemetria do Valor', desc: 'Entrega final de ROI, sustentabilidade real e margens máximas' }
  ]
}

function StrategicRoadmapBoard({ moduleId }: { moduleId?: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M1'] || MODULE_THEMES.M1
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const nodes = STRATEGIC_NODES_MAPPING(moduleId ?? 'M1')

  return (
    <div className="relative w-full h-[142px] rounded-lg overflow-hidden bg-radial-glow mt-2" style={{
      background: `radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 80%)`
    }}>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 18,35 Q 28,70 38,70 T 50,25 T 68,65 T 82,30"
          fill="none"
          stroke={`url(#pathGradient-${moduleId || 'M1'})`}
          strokeWidth="0.8"
          strokeDasharray="3 2"
        />

        <defs>
          <linearGradient id={`pathGradient-${moduleId || 'M1'}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          top: `calc(25% - 4px)`,
          background: `radial-gradient(circle, ${theme.secondary}, ${theme.primary})`,
          boxShadow: `0 0 12px ${theme.primary}`,
          zIndex: 10
        }}
      />

      {nodes.map((node, i) => {
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
                Fluxo {nodes.findIndex(n => n.id === hoveredNode) + 1}: {nodes.find(n => n.id === hoveredNode)?.label}
              </span>
              <span className="text-[7px] font-mono text-[#d4b87a] font-semibold">Foco Estratégico</span>
            </div>
            <p className="text-[8.5px] text-white/70 leading-snug">
              {nodes.find(n => n.id === hoveredNode)?.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

function InteractiveSimulation({ subjectCode, theme }: { subjectCode: string; theme: any }) {
  const [val1, setVal1] = useState(50)
  const [val2, setVal2] = useState(50)
  const [toggle, setToggle] = useState(false)
  const [okrs, setOkrs] = useState([false, false, false])
  const [scamper, setScamper] = useState('S')

  if (subjectCode === 'M1-0') {
    const phases = [
      { name: 'Infraestrutura', gap: 'R$ 9.2M', cagr: '+5%', uptime: '99.9%', desc: 'TI de bastidor, foco em estabilidade, servidores e uptime de suporte comercial.' },
      { name: 'Processos', gap: 'R$ 4.8M', cagr: '+18%', uptime: '99.99%', desc: 'TI de processo, integração total de sistemas via ERP, CRM e fluxos corporativos.' },
      { name: 'Estratégia', gap: 'R$ 0.0M (Você Lidera)', cagr: '+42%', uptime: '99.999% + Realtime', desc: 'TI estratégica core, criação de produtos de rede digitais altamente lucrativos e ágeis.' }
    ]
    const idx = Math.min(2, Math.floor((val1 / 101) * 3))
    const currentPhase = phases[idx]
    return (
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 font-sans">
        <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-bold">Simulação: Fases da TI & Transformação Digital</span>
        <div className="flex justify-between text-[10px] text-white/80">
          <span>Nível de Maturidade: <strong style={{ color: theme.primary }}>{currentPhase.name}</strong></span>
          <span>Gap Concorrencial: <strong>{currentPhase.gap}</strong></span>
        </div>
        <input 
          type="range" 
          value={val1} 
          onChange={(e) => setVal1(Number(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4b87a]"
        />
        <div className="grid grid-cols-3 gap-2 text-center mt-1">
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[7.5px] text-white/45 block">Uptime</span>
            <span className="text-[10px] font-bold text-white/90">{currentPhase.uptime}</span>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[7.5px] text-white/45 block">Efeito CAGR</span>
            <span className="text-[10px] font-bold text-white/90">{currentPhase.cagr}</span>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[7.5px] text-white/45 block">Foco Core</span>
            <span className="text-[10px] font-bold text-[#d4b87a]">99%</span>
          </div>
        </div>
        <p className="text-[9px] text-white/55 leading-relaxed italic text-justify">{currentPhase.desc}</p>
      </div>
    )
  }
  
  if (subjectCode === 'M1-1') {
    const prompts: Record<string, string> = {
      S: 'Substituir: E se substituíssemos a equipe humana de atendimento telefônico por agentes cognitivos de IA integrados, utilizando humanos apenas para negociações complexas de alto valor?',
      C: 'Combinar: E se combinássemos o seu serviço de mentoria empresarial clássico com uma plataforma SaaS de acompanhamento de telemetria, gerando receita dupla combinada?',
      A: 'Adaptar: Como podemos adaptar o modelo de vendas rápidas de varejo (supermarket checkout) para a contratação de planos educacionais corporativos premium?',
      M: 'Modificar: E se modificássemos a frequência de pagamento de assinaturas recorrentes tradicionais para royalties de sucesso partilhados trimestralmente?',
      P: 'Propor outros usos: Como podemos reaproveitar a infraestrutura física de escritórios de TI ociosos aos finais de semana para realizar hackathons e open-innovation?',
      E: 'Eliminar: E se eliminássemos inteiramente a burocracia de cadastros longos integrando APIs automáticas de Open Finance na jornada do cliente?',
      R: 'Reverter: E se revertermos o fluxo de vendas tradicional e fizermos o cliente receber e usar o produto ANTES de pagar, faturando-o proporcionalmente após 15 dias?'
    }
    return (
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 font-sans">
        <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-bold">Simulação: SCAMPER / Lógica Lateral</span>
        <div className="flex gap-1 justify-between">
          {['S','C','A','M','P','E','R'].map(letter => (
            <button
              key={letter}
              onClick={() => setScamper(letter)}
              className="w-7 h-7 rounded border text-[9px] font-bold transition cursor-pointer"
              style={{
                borderColor: scamper === letter ? theme.primary : 'rgba(255,255,255,0.06)',
                background: scamper === letter ? theme.accent : 'rgba(255,255,255,0.02)',
                color: scamper === letter ? '#fff' : 'rgba(255,255,255,0.4)'
              }}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5 min-h-[70px]">
          <p className="text-[9.5px] text-white/80 leading-relaxed text-justify">{prompts[scamper]}</p>
        </div>
      </div>
    )
  }

  if (subjectCode === 'M1-2') {
    return (
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 font-sans">
        <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-bold">Simulação: Economia Circular (Cradle-to-Cradle)</span>
        <div className="flex justify-between items-center text-[10px]">
          <span>Modelo de Cadeia: <strong style={{ color: theme.primary }}>{toggle ? 'CIRCULAR (Loop)' : 'LINEAR (Descarte)'}</strong></span>
          <button 
            onClick={() => setToggle(!toggle)}
            className="px-2 py-0.5 rounded text-[8px] bg-white/5 border border-white/10 text-white/70 cursor-pointer hover:bg-white/10 transition"
          >
            Mudar
          </button>
        </div>
        <div className="p-3 rounded bg-black/40 border border-white/5 grid grid-cols-2 gap-3 text-center">
          <div>
            <span className="text-[7.5px] text-white/45 block">Resíduos Mitigados</span>
            <span className="text-[11px] font-bold text-white/90">{toggle ? '88.5% (AAA)' : '0.0% (Alto Risco)'}</span>
          </div>
          <div>
            <span className="text-[7.5px] text-white/45 block">Margem Operacional</span>
            <span className="text-[11px] font-bold text-white/90" style={{ color: toggle ? theme.primary : '#fff' }}>{toggle ? '+6.4% (Reciclagem)' : '0.0% (Linear)'}</span>
          </div>
        </div>
        <p className="text-[9px] text-white/55 leading-relaxed text-justify">
          {toggle 
            ? 'O modelo circular reintegra subprodutos de volta ao ciclo de fabricação, reduzindo a compra de matéria-prima virgem e eliminando multas regulatórias.'
            : 'O modelo linear tradicional (extrair, fabricar, descartar) acumula despesas crescentes com gerenciamento de resíduos industriais e impostos ecológicos.'
          }
        </p>
      </div>
    )
  }

  if (subjectCode === 'M2-0') {
    const handleToggleOkr = (idx: number) => {
      const copy = [...okrs]
      copy[idx] = !copy[idx]
      setOkrs(copy)
    }
    const score = Math.round((okrs.filter(Boolean).length / 3) * 100)
    return (
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 font-sans">
        <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-bold">Simulação: Painel Cascating OKR</span>
        <div className="flex justify-between items-center text-[10px] text-white/80">
          <span>Objetivo: <strong>Maximização Operacional</strong></span>
          <span className="font-mono text-xs font-bold animate-pulse" style={{ color: theme.primary }}>{score}%</span>
        </div>
        <div className="space-y-2">
          {[
            'KR 1: Conectar 90% dos PDVs ativos via plataforma dinâmica (BEES)',
            'KR 2: Reduzir custos logísticos de last-mile em 20%',
            'KR 3: Alcançar eNPS de alta segurança psicológica de equipe (+75)'
          ].map((kr, idx) => (
            <div 
              key={idx}
              onClick={() => handleToggleOkr(idx)}
              className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between cursor-pointer hover:border-white/10 transition"
            >
              <span className={`text-[9.5px] max-w-[200px] truncate ${okrs[idx] ? 'line-through text-white/40' : 'text-white/80'}`}>{kr}</span>
              <div className="w-3.5 h-3.5 rounded-sm border border-white/20 flex items-center justify-center shrink-0">
                {okrs[idx] && <span className="text-[8px] font-bold" style={{ color: theme.primary }}>✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (subjectCode === 'M2-2') {
    const rate = val1 / 500
    const principal = 100000
    const pricePayment = (principal * rate * Math.pow(1 + rate, 12)) / (Math.pow(1 + rate, 12) - 1)
    const priceTotal = pricePayment * 12
    const sacTotal = principal + (principal * rate * 13) / 2
    return (
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 font-sans">
        <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-bold">Simulação: SAC vs PRICE Amortization</span>
        <div className="flex justify-between text-[10px] text-white/80">
          <span>Principal: <strong>R$ 100.000 (12m)</strong></span>
          <span>Taxa a.m: <strong style={{ color: theme.primary }}>{Math.round(rate * 100 * 100)/100}%</strong></span>
        </div>
        <input 
          type="range" 
          value={val1} 
          min={10}
          max={100}
          onChange={(e) => setVal1(Number(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4b87a]"
        />
        <div className="grid grid-cols-2 gap-2 text-center mt-1">
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[7.5px] text-[#cbd5e1] block">Sistema Price (Total)</span>
            <span className="text-[10px] font-bold text-white/90 font-mono">R$ {Math.round(priceTotal).toLocaleString('pt-BR')}</span>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[7.5px] text-[#d4b87a] block">Sistema SAC (Total)</span>
            <span className="text-[10px] font-bold text-white/90 font-mono">R$ {Math.round(sacTotal).toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>
    )
  }

  if (subjectCode === 'M6-0') {
    const ke = val1 / 5
    const kd = 6
    const tc = 34
    const equityWeight = 0.6
    const debtWeight = 0.4
    const wacc = (ke * equityWeight) + (kd * (1 - tc/100) * debtWeight)
    const initialFlow = 5000000
    const growth = 3
    const valuation = initialFlow / ((wacc/100) - (growth/100))
    return (
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 font-sans">
        <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-bold">Simulação: WACC & DCF Valuation</span>
        <div className="flex justify-between text-[10px] text-white/80">
          <span>Custo do Capital (Ke): <strong style={{ color: theme.primary }}>{Math.round(ke * 10)/10}%</strong></span>
          <span>WACC: <strong>{Math.round(wacc * 100)/100}%</strong></span>
        </div>
        <input 
          type="range" 
          value={val1} 
          min={25}
          max={95}
          onChange={(e) => setVal1(Number(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4b87a]"
        />
        <div className="p-2.5 rounded bg-black/40 border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[7.5px] text-white/45 block">Valuation DCF Estimado</span>
          <span className="text-[13px] font-bold text-white mt-0.5 font-mono animate-pulse" style={{ color: theme.primary }}>
            {valuation > 0 ? `R$ ${Math.round(valuation / 1000000).toLocaleString('pt-BR')} Milhões` : 'Taxa Inviável'}
          </span>
        </div>
      </div>
    )
  }

  if (subjectCode === 'M6-1') {
    const cost = 100
    const markup = val1 / 50
    const price = cost * (1 + markup)
    const baseDemand = 1000
    const elasticity = 1.8
    const priceIncreaseRatio = price / 150
    const dynamicDemand = Math.round(baseDemand / Math.pow(priceIncreaseRatio, elasticity))
    const totalRev = dynamicDemand * price
    return (
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 font-sans">
        <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-bold">Simulação: Elasticidade de Preços & Markup</span>
        <div className="flex justify-between text-[10px] text-white/80">
          <span>Markup Adicionado: <strong style={{ color: theme.primary }}>{Math.round(markup * 100)/100}x</strong></span>
          <span>Preço Final: <strong>R$ {Math.round(price).toLocaleString('pt-BR')}</strong></span>
        </div>
        <input 
          type="range" 
          value={val1} 
          min={25}
          max={95}
          onChange={(e) => setVal1(Number(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4b87a]"
        />
        <div className="grid grid-cols-2 gap-2 text-center mt-1">
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[7.5px] text-white/45 block">Volume de Demanda</span>
            <span className="text-[10px] font-bold text-white/90">{dynamicDemand} un</span>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[7.5px] text-[#d4b87a] block">Receita Total</span>
            <span className="text-[10px] font-bold text-white/90 font-mono">R$ {Math.round(totalRev).toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>
    )
  }

  // Default GUT matrix
  const gut = Math.round((val1 / 20) * (val2 / 20) * 4)
  let status = 'MODERADO'
  let color = '#fff'
  if (gut >= 16) {
    status = 'IMEDIATO'
    color = '#f43f5e'
  } else if (gut >= 9) {
    status = 'ALTO'
    color = '#fb923c'
  }
  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 font-sans">
      <span className="text-[8px] uppercase tracking-wider text-[#d4b87a] font-bold">Simulação: Matriz de Priorização GUT</span>
      <div className="flex justify-between text-[10px] text-white/80">
        <span>Gravidade (G): <strong>{Math.round(val1/20)}/5</strong></span>
        <span>Urgência (U): <strong>{Math.round(val2/20)}/5</strong></span>
      </div>
      <div className="flex flex-col gap-2">
        <input 
          type="range" 
          value={val1} 
          min={20}
          max={100}
          onChange={(e) => setVal1(Number(e.target.value))}
          className="w-full h-0.5 bg-white/10 rounded appearance-none cursor-pointer accent-[#cbd5e1]"
        />
        <input 
          type="range" 
          value={val2} 
          min={20}
          max={100}
          onChange={(e) => setVal2(Number(e.target.value))}
          className="w-full h-0.5 bg-white/10 rounded appearance-none cursor-pointer accent-[#cbd5e1]"
        />
      </div>
      <div className="p-2.5 rounded bg-black/40 border border-white/5 flex items-center justify-between mt-1">
        <div className="flex flex-col">
          <span className="text-[7.5px] text-white/45 block">Prioridade</span>
          <span className="text-[10px] font-bold leading-tight" style={{ color }}>{status}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[7.5px] text-white/45 block">GUT Score</span>
          <span className="text-[11px] font-bold text-white font-mono" style={{ color: theme.primary }}>{gut} pts</span>
        </div>
      </div>
    </div>
  )
}

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
  const theme = MODULE_THEMES[moduleId ?? 'M1'] || MODULE_THEMES.M1
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const activeSubjectsList = SUBJECTS_DB.filter(s => s.id.startsWith(moduleId ?? 'M1'))
  const activeSubject = activeSubjectsList[activeLessonIndex] ?? activeSubjectsList[0]

  useEffect(() => {
    setProgress(0)
    setPlaying(false)
  }, [activeLessonIndex, moduleId])

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
    }, 500)
    return () => clearInterval(interval)
  }, [playing])

  const currentVideo = activeSubject.videoUrls[0]

  const handleLessonSelect = (index: number) => {
    onChangeLessonIndex(index)
    setProgress(0)
    setPlaying(false)
    if (onSelectTopic) {
      onSelectTopic(activeSubjectsList[index].id)
    }
  }

  return (
    <div className="ipb-glass-card w-full flex flex-col pointer-events-auto transition-all duration-300">
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
            {moduleId} · Aula {activeLessonIndex + 1}
          </span>
          <span className="text-[7.5px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-black/50 border border-white/10 text-white/50">
            {activeSubject.code}
          </span>
        </div>

        {currentVideo && playing ? (
          <video 
            src={currentVideo.url} 
            controls 
            autoPlay 
            className="absolute inset-0 w-full h-full object-cover z-0"
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 p-4 text-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/40 mb-2">
              {moduleId === 'M1' ? <Lightbulb className="h-5 w-5" /> : moduleId === 'M6' ? <LineChart className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
            </div>
            <span className="text-[8.5px] uppercase tracking-widest text-[#d4b87a] font-semibold">Briefing de Mídia</span>
            <span className="text-[10px] text-white/40 mt-1 max-w-[280px]">{currentVideo ? 'Vídeo Disponível. Clique para iniciar.' : 'Sem transmissão de vídeo. Clique para simular Briefing de Áudio.'}</span>
          </div>
        )}

        {!playing && (
          <motion.button 
            onClick={() => setPlaying(true)}
            whileHover={{ scale: 1.08, boxShadow: `0 0 24px ${theme.accent}` }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: `radial-gradient(circle at 30% 25%, ${theme.accent} 0%, rgba(15,12,8,0.95) 100%)`,
              border: `0.5px solid ${theme.primary}`,
              boxShadow: `0 0 20px ${theme.accent}, inset 0 1px 1px rgba(255,255,255,0.2)`
            }}
          >
            <Play className="h-4.5 w-4.5 text-white/95 fill-white/80 ml-0.5" />
          </motion.button>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between bg-black/30 border-t border-white/[0.04] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="min-w-0">
            <span className="text-[7.5px] uppercase tracking-widest font-bold" style={{ color: theme.primary }}>Execução de Masterclass</span>
            <h4 className="text-[11.5px] font-bold text-white/90 leading-tight mt-0.5 truncate">{activeSubject.title}</h4>
            <p className="text-[9px] text-white/40 truncate mt-0.5">{currentVideo ? `Vídeo Aula: ${currentVideo.title}` : 'Sem transmissão de vídeo · Briefing de áudio ativado'}</p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0 mt-2 md:mt-0">
            <div className="flex justify-between items-center text-[9px] text-white/40 font-mono gap-3">
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8.5px]" style={{ color: playing ? theme.primary : 'inherit' }}>
                {playing ? 'Reproduzindo' : 'Pausado'}
              </span>
              <span>{playing ? `${Math.floor((progress/100)*22)}:15` : '00:00'} / {ACADEMIC_SYLLABUS.find(s => s.id === activeSubject.id)?.duration ?? '22:00'}</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
            <div className="h-full transition-all duration-300" style={{ 
              width: `${progress}%`,
              background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
            }} />
          </div>
        </div>

        <div className="pt-2 border-t border-white/[0.04]">
          <span className="text-[7.5px] uppercase tracking-wider text-white/30 font-bold block mb-2">Playlist da Trilha Selecionada</span>
          <div className="flex flex-wrap gap-2">
            {activeSubjectsList.map((item, idx) => {
              const isSelected = idx === activeLessonIndex
              const isGold = ['M1-S1', 'M1-S3', 'M2-S1', 'M3-S1', 'M4-S1', 'M5-S2', 'M6-S1', 'M7-S1', 'M8-S1'].includes(item.id)
              const itemColor = isGold ? '#d4b87a' : '#cbd5e1'
              const itemBgSelected = isGold ? 'rgba(212,184,122,0.12)' : 'rgba(203,213,225,0.12)'
              const itemDuration = ACADEMIC_SYLLABUS.find(s => s.id === item.id)?.duration ?? '22:00'
              
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
                    <span className="text-[6.5px] text-white/35 font-mono mt-0.5">{itemDuration} · {isGold ? 'OURO' : 'PRATA'}</span>
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

function ExecutivePerformanceDashboard({ moduleId, activeSubjectId }: { moduleId?: string; activeSubjectId: string }) {
  const theme = MODULE_THEMES[moduleId ?? 'M1'] || MODULE_THEMES.M1
  const kpiData = SUBJECT_KPIS[activeSubjectId] || SUBJECT_KPIS['M1-S1']

  return (
    <div className="ipb-glass-card w-full flex flex-col p-5 pointer-events-auto transition-all duration-300 relative overflow-hidden justify-between">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        background: `radial-gradient(circle at 100% 0%, ${theme.primary}, transparent 50%)`
      }} />

      <div className="relative z-10 space-y-4">
        <div>
          <span className="text-[7.5px] uppercase tracking-wider font-bold" style={{ color: theme.primary }}>KPI de Performance Ativa</span>
          <h4 className="text-[12px] font-bold text-white/90 leading-tight mt-0.5">Telemetria da Disciplina</h4>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.04]">
          <div className="flex justify-between items-center text-[9px] text-white/40">
            <span>{kpiData.metric1.label}</span>
            <span className="font-mono text-white/90 font-bold" style={{ color: theme.primary }}>{kpiData.metric1.value}</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1.5">
            <div className="h-full" style={{ width: `${kpiData.metric1.progress}%`, backgroundColor: theme.primary }} />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] text-white/45 block">{kpiData.metric2.label}</span>
            <span className="text-xs font-mono font-bold text-white/90 mt-0.5">{kpiData.metric2.value}</span>
          </div>
          <div className="flex gap-1 items-end h-6 pr-1">
            {kpiData.metric2.chartData.map((h, idx) => (
              <div 
                key={idx}
                className="w-0.5 rounded-t"
                style={{
                  height: `${h * 5}%`,
                  backgroundColor: theme.primary,
                  opacity: 0.3 + (idx * 0.12)
                }}
              />
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] text-white/45 block">{kpiData.metric3.label}</span>
            <span className="text-[10px] font-bold text-white/90 mt-0.5">{kpiData.metric3.value}</span>
          </div>
          <span className="text-[7.5px] px-2 py-0.5 rounded font-mono font-bold border shrink-0"
            style={{
              color: theme.primary,
              borderColor: `${theme.primary}30`,
              backgroundColor: `${theme.primary}08`
            }}
          >
            {kpiData.metric3.badge}
          </span>
        </div>
      </div>

      <div className="text-[7.5px] text-white/30 mt-4 border-t border-white/[0.04] pt-2 flex justify-between font-mono shrink-0">
        <span>GOVERNANÇA: ALTO RIGOR</span>
        <span>STATUS: EXCELENTE</span>
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
  const [activeTab, setActiveTab] = useState<'summary' | 'tutor' | 'notes' | 'sim'>('summary')
  const [tutorInput, setTutorInput] = useState('')
  const [isTutorLoading, setIsTutorLoading] = useState(false)
  const [tutorHistory, setTutorHistory] = useState<any[]>([
    { role: 'assistant', content: 'Bem-vindo ao Advisor de Diretoria IA. Como seu consultor estratégico de negócios, estou pronto para detalhar WACC, valuation, segurança psicológica, frameworks organizacionais ou metodologias científicas de sua trilha. O que deseja analisar hoje?' }
  ])
  const [userNotes, setUserNotes] = useState<Record<string, string>>({})

  const activeSubjectsList = SUBJECTS_DB.filter(s => s.id.startsWith(moduleId))
  const activeSubject = activeSubjectsList[activeSubjectIndex] ?? activeSubjectsList[0]

  if (!activeSubject) return <div className="h-48 flex items-center justify-center text-white/30 font-mono text-[10px]">Carregando briefing estratégico...</div>

  const activeChapter = activeSubject.chapters?.[0]

  const handleAskTutor = async (question: string) => {
    if (!question.trim()) return
    setTutorInput('')
    const updated = [...tutorHistory, { role: 'user', content: question }]
    setTutorHistory(updated)
    setIsTutorLoading(true)

    setTimeout(() => {
      let reply = 'Interessante questão estratégica. Alinhar o fluxo de processos operacionais com os objetivos transversais de OKR é a recomendação para o presente cenário, minimizando gargalos cognitivos nos times.'
      const q = question.toLowerCase()

      if (q.includes('wacc') || q.includes('valuation') || q.includes('finanças') || q.includes('calculo') || q.includes('ebitda')) {
        reply = 'Excelente ponto quantitativo. A maximização de retorno exige governança rigorosa sobre o custo de capital (WACC) e o cálculo das margens de contribuição operacional. No valuation via DCF, a modelagem de crescimento estável deve respeitar a elasticidade mercadológica observada.'
      } else if (q.includes('segurança') || q.includes('liderança') || q.includes('aristotle') || q.includes('equipe') || q.includes('cultura')) {
        reply = 'O maior fator de alavancagem operacional é a densidade de talentos aliada à segurança psicológica (Modelo Aristotle do Google). Recomendo instituir canais transparentes e feedbacks estruturados via modelo SBI para mitigar desalinhamentos cognitivos de equipe.'
      } else if (q.includes('lean') || q.includes('startup') || q.includes('inovação') || q.includes('canvas') || q.includes('estratégia')) {
        reply = 'Compreendo sua meta de aceleração. Para consolidar este ecossistema disruptivo, recomendo implementar o framework Lean Startup com ciclos curtos de feedback e validação rápida. Focar no mapeamento de core capabilities e oceanos azuis blindará a empresa contra concorrência agressiva.'
      }

      setTutorHistory([...updated, { role: 'assistant', content: reply }])
      setIsTutorLoading(false)
    }, 1000)
  }

  return (
    <div className="ipb-soft relative overflow-hidden rounded-[2rem] p-6 space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] flex-wrap gap-3" style={{ borderBottom: '0.2px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#d4b87a]/10 border border-[#d4b87a]/20 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-[#d4b87a]" />
          </div>
          <div>
            <span className="text-[7.5px] uppercase tracking-[0.25em] font-bold text-[#d4b87a]">MBA Executive Cockpit</span>
            <h3 className="text-[14px] font-bold text-white/90 leading-none mt-0.5">{activeSubject.title}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
          {[
            { id: 'summary', label: 'SUMÁRIO', icon: BookOpen },
            { id: 'tutor', label: 'ADVISOR IA', icon: MessageSquare },
            { id: 'notes', label: 'NOTAS', icon: FileText },
            { id: 'sim', label: 'SIMULAÇÕES', icon: Target }
          ].map((tab) => {
            const isSelected = activeTab === tab.id
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[8.5px] font-mono tracking-wider transition-all duration-300 cursor-pointer"
                style={{
                  background: isSelected ? 'rgba(212,184,122,0.12)' : 'transparent',
                  color: isSelected ? '#d4b87a' : 'rgba(255,255,255,0.4)'
                }}
              >
                <TabIcon className="h-3 w-3" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between min-w-0">
          
          <AnimatePresence mode="wait">
            
            {activeTab === 'summary' && activeChapter && (
              <motion.div
                key="summary-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 flex-1 flex flex-col justify-between min-w-0"
              >
                <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-[#d4b87a]/20 flex flex-col justify-between h-full group"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.15)' }}
                >
                  <div className="absolute inset-0 opacity-[0.015] pointer-events-none group-hover:opacity-[0.03] transition-all" style={{
                    background: 'radial-gradient(circle at 0% 0%, #d4b87a, transparent 50%)'
                  }} />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/[0.06] pb-2.5 w-full">
                      <h4 className="text-[11.5px] font-bold text-white/90 leading-tight tracking-tight uppercase truncate max-w-[240px]">
                        {activeChapter.title}
                      </h4>
                      <span className="text-[8px] px-1.5 py-0.5 rounded font-mono bg-[#d4b87a]/10 border border-[#d4b87a]/20 text-[#d4b87a] shrink-0">TEXTBOOK ESTRATÉGICO</span>
                    </div>

                    {activeChapter.description && (
                      <p className="text-[10px] text-white/40 italic leading-relaxed text-justify">
                        &ldquo;{activeChapter.description}&rdquo;
                      </p>
                    )}

                    <div className="space-y-4 mt-2">
                      {activeChapter.subsections.slice(0, 3).map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-1.5">
                          <h5 className="text-[10.5px] font-bold text-white/90 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.primary }} />
                            {sub.title}
                          </h5>
                          <p className="text-[10px] text-white/60 leading-relaxed text-justify pl-3.5">
                            {sub.content}
                          </p>

                          {sub.studyCase && (
                            <div className="ml-3.5 mt-2 p-3 rounded-lg bg-black/40 border border-[#d4b87a]/15 text-[9px] text-white/80 leading-relaxed text-justify">
                              <strong className="text-[#d4b87a] block mb-1">Estudo de Caso — {sub.studyCase.title}:</strong>
                              {sub.studyCase.body}
                            </div>
                          )}

                          {sub.deepDive && (
                            <div className="ml-3.5 mt-2 p-2.5 rounded-lg bg-white/[0.015] border border-white/[0.05] text-[9px] text-white/44 leading-relaxed text-justify">
                              <strong className="text-white/60 block mb-1">✎ Exploração Avançada:</strong>
                              {sub.deepDive}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tutor' && (
              <motion.div
                key="tutor-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 flex-1 flex flex-col justify-between min-w-0"
              >
                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] backdrop-blur-md flex flex-col justify-between h-[360px] relative overflow-hidden"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                >
                  <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 ipb-thinscroll">
                    {tutorHistory.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className="max-w-[85%] rounded-xl p-3 text-[10px] leading-relaxed text-justify font-sans"
                          style={{
                            background: msg.role === 'user' ? 'rgba(212,184,122,0.12)' : 'rgba(255,255,255,0.03)',
                            border: msg.role === 'user' ? '1px solid rgba(212,184,122,0.22)' : '1px solid rgba(255,255,255,0.05)',
                            color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.75)'
                          }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTutorLoading && (
                      <div className="flex justify-start">
                        <div className="rounded-xl p-3 bg-white/5 border border-white/10 text-[9px] text-white/40 font-mono">
                          Advisor analisando dados...
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-3 shrink-0">
                    {['Explicar Conceito', 'Aplicar ao meu Negócio', 'Análise SWOT'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleAskTutor(`${chip} da disciplina ${activeSubject.title}`)}
                        className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/50 text-[8px] hover:bg-white/10 cursor-pointer transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 border-t border-white/[0.06] pt-3 shrink-0">
                    <input
                      value={tutorInput}
                      onChange={(e) => setTutorInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskTutor(tutorInput)}
                      placeholder="Faça uma pergunta sobre o sumário executivo..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white outline-none focus:border-[#d4b87a]/40"
                    />
                    <button
                      onClick={() => handleAskTutor(tutorInput)}
                      className="p-2 rounded-lg bg-[#d4b87a] hover:bg-[#d4b87a]/80 text-black flex items-center justify-center shrink-0 cursor-pointer transition-all"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notes' && (
              <motion.div
                key="notes-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 flex-1 flex flex-col justify-between min-w-0"
              >
                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{
                    background: 'radial-gradient(circle at 100% 100%, #d4b87a, transparent 50%)'
                  }} />
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#d4b87a]" />
                        <span className="text-[8.5px] uppercase tracking-widest font-bold text-white/40">Notas de Implementação Operacional</span>
                      </div>
                      <span className="text-[7.5px] text-white/30 font-mono">AUTOSAVE ATIVO</span>
                    </div>

                    <textarea
                      value={userNotes[activeSubject.id] ?? ''}
                      onChange={(e) => setUserNotes({ ...userNotes, [activeSubject.id]: e.target.value })}
                      placeholder={`Escreva suas notas e planos estratégicos específicos para a disciplina ${activeSubject.title}...`}
                      className="flex-1 w-full min-h-[200px] bg-transparent border-0 outline-none text-[10px] leading-relaxed text-white/80 placeholder:text-white/20 resize-none font-mono"
                    />

                    <p className="text-[7.5px] text-white/30 leading-snug">
                      As notas adicionadas neste bloco são salvas localmente em cache para a sua trilha de inteligência acadêmica corporativa.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sim' && (
              <motion.div
                key="sim-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 flex-1 flex flex-col justify-between min-w-0"
              >
                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="border-b border-white/[0.06] pb-2">
                      <span className="text-[8px] uppercase tracking-wider font-bold text-[#d4b87a]">Estação de Simulação Interativa</span>
                      <h3 className="text-[12px] font-bold text-white/90 mt-0.5">{activeSubject.title}</h3>
                    </div>
                    <InteractiveSimulation subjectCode={activeSubject.code} theme={activeTheme} />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="lg:col-span-1 flex flex-col p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] relative overflow-hidden h-[360px] lg:h-[400px]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            background: `radial-gradient(circle at 100% 0%, #d4b87a, transparent 50%)`
          }} />
          
          <div className="relative z-10 mb-3 shrink-0">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-2">
              <span className="text-[8px] uppercase tracking-wider font-bold text-[#d4b87a]">Sumário do Caderno</span>
              <span className="text-[8px] px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-white/40 font-mono">{activeSubjectsList.length} MATÉRIAS</span>
            </div>
            <h3 className="text-[12px] font-bold text-white/90 mt-1 font-sans">Índice do Caderno</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 ipb-thinscroll shrink-0">
            {activeSubjectsList.map((item, idx) => {
              const isSelected = idx === activeSubjectIndex
              const isGold = ['M1-S1', 'M1-S3', 'M2-S1', 'M3-S1', 'M4-S1', 'M5-S2', 'M6-S1', 'M7-S1', 'M8-S1'].includes(item.id)
              const itemColor = isGold ? '#d4b87a' : '#cbd5e1'
              
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeSubjectIndex(idx)}
                  className="flex items-center justify-between w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: isSelected ? itemColor : 'rgba(255,255,255,0.02)',
                    background: isSelected ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.005)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full shrink-0" 
                      style={{ 
                        backgroundColor: isSelected ? itemColor : 'rgba(255,255,255,0.15)',
                        boxShadow: isSelected ? `0 0 6px ${itemColor}` : 'none'
                      }} 
                    />
                    <div className="flex flex-col">
                      <span className={`text-[9.5px] font-bold font-sans ${isSelected ? 'text-white' : 'text-white/50'}`}>
                        {item.title}
                      </span>
                      <span className="text-[7px] text-white/25 mt-0.5">{ACADEMIC_SYLLABUS.find(s => s.id === item.id)?.subtitle ?? ''}</span>
                    </div>
                  </div>
                  
                  <ChevronRight className="h-3 w-3 shrink-0 text-white/20" style={{ color: isSelected ? itemColor : 'inherit' }} />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

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
                        background: 'rgba(212,184,122,0.08)',
                        color: '#fff',
                        boxShadow: 'inset 0 1px 0 rgba(255,235,180,0.08)',
                      }
                    : { color: 'rgba(255,255,255,0.45)' }
                }
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[0.5rem] border transition duration-200 lg:h-7 lg:w-7 lg:rounded-[0.6rem]"
                  style={
                    isActive
                      ? {
                          borderColor: 'rgba(212,184,122,0.35)',
                          background: 'rgba(212,184,122,0.14)',
                          color: '#d4b87a',
                        }
                      : {
                          borderColor: 'rgba(255,255,255,0.06)',
                          background: 'rgba(255,255,255,0.01)',
                          color: 'rgba(255,255,255,0.3)',
                        }
                  }
                >
                  <ModIcon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[7px] font-bold text-white/30 lg:text-[8px]">{mod.id}</span>
                  </div>
                  <p className="truncate text-[9.5px] font-bold tracking-tight text-white/80 lg:text-[10.5px]">
                    {mod.title}
                  </p>
                </div>
              </button>

              {isActive && visibleTopics.length > 0 && (
                <div className="mt-1 pl-6 space-y-1">
                  {visibleTopics.map((topic) => {
                    const isTopicActive = activeTopicId === topic.id
                    return (
                      <button
                        key={topic.id}
                        onClick={() => onSelectTopic(idx, topic.id)}
                        className="flex w-full items-center gap-1.5 rounded-[0.55rem] py-1 pl-2 pr-1 text-left text-[9px] font-semibold transition hover:bg-white/[0.03] lg:text-[9.5px]"
                        style={{
                          color: isTopicActive ? '#d4b87a' : 'rgba(255,255,255,0.36)',
                        }}
                      >
                        <span
                          className="h-1 w-1 shrink-0 rounded-full"
                          style={{
                            backgroundColor: isTopicActive ? '#d4b87a' : 'rgba(255,255,255,0.15)',
                          }}
                        />
                        <span className="truncate flex-1">{topic.title}</span>
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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[0.7rem] border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <BookOpen className="h-4 w-4 text-[#d4b87a]" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4b87a]">Trilhas Acadêmicas</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8.5px] px-2 py-0.5 rounded font-mono bg-[#d4b87a]/10 border border-[#d4b87a]/20 text-[#d4b87a]">TRILHA OURO</span>
          <span className="text-[8.5px] px-2 py-0.5 rounded font-mono bg-[#cbd5e1]/10 border border-[#cbd5e1]/20 text-[#cbd5e1]">TRILHA PRATA</span>
        </div>
      </div>

      <div className="relative px-2 md:px-4">
        {/* Upper Track Line (Gold - Dourado) */}
        <div className="pointer-events-none absolute inset-x-0 top-[2.05rem] h-[1.5px]" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,184,122,0.08) 12%, rgba(212,184,122,0.38) 45%, rgba(212,184,122,0.48) 50%, rgba(212,184,122,0.38) 55%, rgba(212,184,122,0.08) 88%, transparent 100%)',
          boxShadow: '0 0 4px rgba(212, 184, 122, 0.2)'
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
            const isGold = ['M1', 'M3', 'M5', 'M7'].includes(module.id)
            const itemColor = isGold ? '#d4b87a' : '#cbd5e1'

            return (
              <button
                key={module.id}
                onClick={() => onSelect(index)}
                className="group flex min-w-0 flex-1 flex-col items-center gap-2 text-center cursor-pointer font-sans"
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
                            borderColor: isGold ? 'rgba(212, 184, 122, 0.55)' : 'rgba(203, 213, 225, 0.55)',
                            background: isGold 
                              ? 'radial-gradient(circle at 30% 28%, rgba(212,184,122,0.55) 0%, rgba(212,184,122,0.35) 45%, rgba(40,28,8,0.95) 100%)'
                              : 'radial-gradient(circle at 30% 28%, rgba(203,213,225,0.45) 0%, rgba(203,213,225,0.25) 45%, rgba(15,18,22,0.95) 100%)',
                            boxShadow: isGold
                              ? '0 0 16px rgba(212, 184, 122, 0.32), 0 0 32px rgba(212, 184, 122, 0.16), inset 0 0.2px 0.2px rgba(255,235,180,0.32)'
                              : '0 0 16px rgba(203, 213, 225, 0.22), 0 0 32px rgba(203, 213, 225, 0.11), inset 0 0.2px 0.2px rgba(255,255,255,0.22)',
                            color: '#fff',
                          }
                        : done
                        ? {
                            borderColor: isGold ? 'rgba(212, 184, 122, 0.32)' : 'rgba(203, 213, 225, 0.32)',
                            background: isGold ? 'rgba(212,184,122,0.06)' : 'rgba(203,213,225,0.06)',
                            color: itemColor,
                          }
                        : {
                            borderColor: 'rgba(255,255,255,0.05)',
                            background: 'rgba(5,5,5,0.5)',
                            color: 'rgba(255,255,255,0.22)',
                          }
                    }
                  >
                    <ModuleIcon className="h-4 w-4 md:h-4.5 md:w-4.5" />

                    {active && (
                      <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                    )}
                  </motion.div>

                  <div
                    className="h-1.5 w-1.5 rounded-full transition-all duration-300"
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
                  </span>
                </div>
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
  const [topicsMap, setTopicsMap] = useState<ModuleTopicsMap>(INITIAL_TOPICS_MAP)
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null)
  const [clockTime, setClockTime] = useState('14:45')
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0)

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

  const current = activeIndex !== null ? MODULES[activeIndex] : null
  const activeTheme = current ? MODULE_THEMES[current.id] : MODULE_THEMES.M1
  const CurrentIcon = current?.icon

  function handleSelectModule(index: number) {
    if (activeIndex === index) {
      setActiveIndex(null)
      setActiveTopicId(null)
    } else {
      setActiveIndex(index)
      setActiveTopicId(null)
      setActiveLessonIndex(0)
      setActiveSubjectIndex(0)
    }
  }

  function handleSelectTopic(moduleIndex: number, topicId: string) {
    setActiveIndex(moduleIndex)
    setActiveTopicId(topicId)
    const activeModule = MODULES[moduleIndex]
    const activeSubjectsList = SUBJECTS_DB.filter(s => s.id.startsWith(activeModule.id))
    const subjectIdx = activeSubjectsList.findIndex(s => s.id === topicId)
    if (subjectIdx !== -1) {
      setActiveLessonIndex(subjectIdx)
      setActiveSubjectIndex(subjectIdx)
    }
  }

  function handleSubjectIndexChange(idx: number) {
    setActiveSubjectIndex(idx)
    setActiveLessonIndex(idx)
    const activeModule = MODULES[activeIndex!]
    const activeSubjectsList = SUBJECTS_DB.filter(s => s.id.startsWith(activeModule.id))
    const subject = activeSubjectsList[idx]
    if (subject) {
      setActiveTopicId(subject.id)
    }
  }

  // Active Subject details for KPI matching
  const activeSubjectsList = current ? SUBJECTS_DB.filter(s => s.id.startsWith(current.id)) : []
  const activeSubject = activeSubjectsList[activeSubjectIndex] ?? activeSubjectsList[0]

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <IpbBackground subtle={true} />

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
                        <div className="flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-widest font-mono">
                          <Radar className="h-3.5 w-3.5 text-[#d4b87a] animate-pulse" />
                          <span>Operational Module System · Active: {clockTime}</span>
                        </div>
                      </div>

                      {/* Hero Section */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 pt-6 pb-4">
                        <div className="flex items-center gap-4">
                          {/* Hero Module Orb */}
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              background: `radial-gradient(circle at 30% 25%, ${activeTheme.accent} 0%, rgba(20,16,8,0.95) 50%, rgba(5,5,5,0.98) 100%)`,
                              border: `0.5px solid ${activeTheme.primary}`,
                              boxShadow: `inset 0 1px 1px rgba(255,255,255,0.22), 0 0 16px ${activeTheme.accent}`
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
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-6 pb-6 items-stretch">
                        <div className="lg:col-span-2 flex">
                          <ExecutiveMasterclassTheater 
                            moduleTitle={current.title} 
                            moduleId={current.id} 
                            onSelectTopic={(topicId) => handleSelectTopic(activeIndex!, topicId)}
                            activeTopicId={activeTopicId}
                            activeLessonIndex={activeLessonIndex}
                            onChangeLessonIndex={setActiveLessonIndex}
                          />
                        </div>

                        <div className="lg:col-span-1 flex">
                          <ExecutivePerformanceDashboard 
                            moduleId={current.id} 
                            activeSubjectId={activeSubject ? activeSubject.id : 'M1-S1'} 
                          />
                        </div>
                      </div>

                    </div>

                    {/* Operational Notebook Content Viewer / Estação Unificada de Estudos */}
                    <ExecutiveStudyBriefing 
                      moduleId={current.id} 
                      activeTopicId={activeTopicId} 
                      activeTheme={activeTheme} 
                      activeSubjectIndex={activeSubjectIndex}
                      onChangeSubjectIndex={handleSubjectIndexChange}
                    />

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
