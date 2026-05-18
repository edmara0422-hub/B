'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Activity, AlertTriangle, BarChart3, Brain, Briefcase, Building2, 
  CheckSquare, Crown, Database, DollarSign, ExternalLink, Eye, 
  FileText, Flag, Gauge, Goal, Heart, Hospital, LayoutGrid, 
  Map as MapIcon, Network, RefreshCw, Rocket, Square, Target, 
  TrendingUp, Trophy, Users, Users2, Zap, Shield, ChevronRight, 
  MessageSquare, Layers, Search, MousePointer2, Clock, Globe, ArrowUpRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdminTelemetry } from './admin-telemetry'

type Financials = { mrr: number; arr: number; pricing: number; active_subs: number; trial_subs: number; cancelled_subs: number; churn_rate_pct: number; runway_months: number }
type UsersStats = { total: number; new_30d: number; active_7d: number; active_30d: number; dau7d_pct: number; dau30d_pct: number }
type Engagement = { events_30d: number; feedbacks: number; nps_net: number | null }
type Compliance = { score: number; max: number; items: Record<string, boolean> }

type CockpitData = {
  state: {
    trl?: { level: number; label: string; max: number }
    hype_cycle?: { position: string; label: string; stage_num: number }
    phase?: { current: string; label: string; goal_users: number }
    financials?: { mrr?: number; pricing?: number; target_first_revenue?: number }
    adoption_trail?: { current_stage: number; stages: string[] }
    company_trail?: { current_stage: number; stages: string[] }
    market_trail?: { current_stage: number; stages: string[] }
    maturity_sgi?: { projects: number; processes: number; culture: number; results: number }
    maturity_dddm?: { collection: number; analysis: number; visualization: number; integration: number }
    innovation_horizons?: { h1: number; h2: number; h3: number }
    innovation_funnel?: { stage: number; items: Record<string, boolean> }
    leadership_process?: { clarity: number; alignment: number; training: number; execution: number; results: number }
    sprint_alpha?: { started_at: string | null; current_day: number; completed_days: number[] }
    weekly_checks?: { week: string | null; completed: string[] }
    compliance?: Record<string, boolean>
  }
  cockpit: {
    financials: Financials
    users: UsersStats
    engagement: Engagement
    compliance: Compliance
  }
  timestamp: string
}

type StrategicAlert = { id: string; level: 'info' | 'warning' | 'critical'; title: string; message: string; action?: string; created_at: string; read: boolean }

export function AdminStrategicCockpit() {
  const [data, setData] = useState<CockpitData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [brief, setBrief] = useState<{question: string; action: string} | null>(null)
  const [briefLoading, setBriefLoading] = useState(false)
  const [alerts, setAlerts] = useState<StrategicAlert[]>([])
  const [alertsLoading, setAlertsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'guia' | 'metricas' | 'inovacao' | 'lideranca'>('guia')
  const reloadRef = useRef<() => void>(() => {})

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/strategy/cockpit')
      const json = await res.json()
      if (!res.ok) { setError(json?.error || 'erro'); return }
      setData(json as CockpitData)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'erro de rede')
    } finally { setLoading(false) }
  }

  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/admin/strategy/notify')
      const json = await res.json()
      if (res.ok) setAlerts(json.alerts ?? [])
    } catch { /* silencioso */ }
  }

  const fetchBrief = async () => {
    setBriefLoading(true)
    try {
      const res = await fetch('/api/admin/strategy/daily-brief')
      const json = await res.json()
      if (res.ok && json.brief) {
        setBrief({ question: json.brief.question, action: json.brief.action })
      }
    } catch { /* silencioso */ } finally { setBriefLoading(false) }
  }

  const runAnalysis = async () => {
    setAlertsLoading(true)
    try {
      const res = await fetch('/api/admin/strategy/notify', { method: 'POST' })
      const json = await res.json()
      if (res.ok) setAlerts(json.alerts ?? [])
    } catch { /* silencioso */ } finally { setAlertsLoading(false) }
  }

  const dismissAlert = async (id: string) => {
    await fetch('/api/admin/strategy/notify', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a))
  }

  useEffect(() => { fetchData(); fetchBrief(); fetchAlerts() }, [])
  reloadRef.current = fetchData

  if (loading && !data) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-indigo-500" />
        <div className="absolute h-10 w-10 animate-ping rounded-full border-2 border-indigo-500/25 opacity-75" />
        <Brain className="absolute h-6 w-6 text-indigo-400 animate-pulse" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Sincronizando Rede Neural SEA...
        </p>
        <p className="text-[9px] text-white/35 font-mono">Carregando métricas e modelos de decisão autonômos</p>
      </div>
    </div>
  )

  if (error && !data) return (
    <div className="rounded-[2.5rem] border border-red-500/25 bg-red-500/5 p-12 text-center backdrop-blur-2xl max-w-lg mx-auto shadow-[0_0_50px_rgba(239,68,68,0.1)]">
      <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>
      <h3 className="text-[15px] font-black text-white uppercase tracking-wider mb-2">Erro de Rede Neural</h3>
      <p className="text-[12px] text-white/50 leading-relaxed font-mono mb-6">{error}</p>
      <button 
        onClick={fetchData} 
        className="px-8 py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-[10px] font-black text-red-300 hover:bg-red-500/35 transition-all duration-300 uppercase tracking-widest"
      >
        Reconectar Cockpit
      </button>
    </div>
  )

  if (!data) return null

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-32 px-4 select-none">
      {/* 🚀 HEADER PREMIUM: DESIGN NASA / SCI-FI */}
      <header className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-8 shadow-2xl backdrop-blur-3xl">
        {/* Decorative Grid and Ambient Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] pointer-events-none opacity-50" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:scale-105 transition-all duration-500">
              <div className="h-full w-full rounded-2xl bg-[#09090e] flex items-center justify-center">
                <Rocket className="h-7 w-7 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-[22px] font-black text-white tracking-tight uppercase">SEA COCKPIT ESTRATÉGICO</h1>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-mono text-white/50 tracking-wider">v3.0.4</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  DIAGNÓSTICO EM TEMPO REAL
                </span>
                <span className="text-[9px] text-white/30 uppercase font-black tracking-widest hidden sm:inline">PROCESSO DECISÓRIO AUTÔNOMO</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:w-auto w-full">
             <div className="px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1.5">Maturidade TRL</p>
                <div className="flex items-center gap-3">
                  <span className="text-[20px] font-black text-white leading-none font-mono">{data.state.trl?.level || 7}</span>
                  <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden relative">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${((data.state.trl?.level || 7)/9)*100}%` }} />
                  </div>
                </div>
             </div>
             <div className="px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1.5">Fase da Startup</p>
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-amber-500/15 border border-amber-500/20">
                    <Target className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <span className="text-[13px] font-black text-white uppercase tracking-wider">{data.state.phase?.label || 'Validação'}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
           <CompactTrails data={data} />
        </div>
      </header>

      {/* 🧭 NAVEGAÇÃO DE ALTA PERFORMANCE (Sci-Fi Deck style) */}
      <nav className="flex p-1.5 bg-[#09090e]/80 border border-white/5 rounded-2.5xl sticky top-4 z-50 backdrop-blur-3xl shadow-2xl">
        {[
          { id: 'guia', label: 'PLANO DE HOJE', icon: Brain, color: '#6366f1', desc: 'Diretrizes Estratégicas' },
          { id: 'metricas', label: 'COCKPIT COMERCIAL', icon: DollarSign, color: '#10b981', desc: 'Métricas & Telemetria' },
          { id: 'inovacao', label: 'RADAR DE INOVAÇÃO', icon: LayoutGrid, color: '#3b82f6', desc: '3 Horizontes & Funil' },
          { id: 'lideranca', label: 'LIDERANÇA & EXECUÇÃO', icon: Users2, color: '#f59e0b', desc: 'OKRs & Gestão de Pessoas' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex flex-1 flex-col items-center justify-center py-3.5 px-4 rounded-xl transition-all duration-300 relative overflow-hidden group"
          >
            {activeTab === tab.id ? (
              <motion.div 
                layoutId="activeTabGlow" 
                className="absolute inset-0 z-0 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-xl"
              />
            ) : (
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 bg-white/[0.01] transition-opacity duration-300 rounded-xl" />
            )}
            
            {/* Top Indicator Accent */}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabLine"
                className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full shadow-[0_0_12px_rgba(99,102,241,1)]"
                style={{ backgroundColor: tab.color }}
              />
            )}

            <div className="flex items-center gap-2.5 relative z-10">
              <tab.icon className={`h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110 ${activeTab === tab.id ? '' : 'opacity-40'}`} style={{ color: activeTab === tab.id ? tab.color : undefined }} />
              <span className={`text-[12px] font-black uppercase tracking-wider transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : 'text-white/40'}`}>
                {tab.label}
              </span>
            </div>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest mt-1 hidden lg:block relative z-10">
              {tab.desc}
            </span>
          </button>
        ))}
      </nav>

      {/* 🎭 PALCO DINÂMICO (ABAS COM TRANSIÇÕES SUAVES) */}
      <main className="min-h-[600px] relative">
        <AnimatePresence mode="wait">
          {activeTab === 'guia' && (
            <motion.div 
              key="guia"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* ALERTA CRÍTICO: FLASH DESIGN */}
              {alerts.filter(a => !a.read && a.level === 'critical').map(alert => (
                <div key={alert.id} className="relative overflow-hidden rounded-[2rem] bg-red-500/[0.03] border border-red-500/25 p-6 shadow-[0_0_50px_rgba(239,68,68,0.06)] backdrop-blur-md">
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-500 to-pink-500" />
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20 shadow-lg animate-pulse shrink-0">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping" />
                        <h3 className="text-[9px] font-black text-red-400 uppercase tracking-[0.25em] font-mono">{alert.title}</h3>
                      </div>
                      <p className="text-[15px] text-white/95 font-medium leading-relaxed">{alert.message}</p>
                      {alert.action && (
                        <div className="mt-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-red-500/10 rounded-xl border border-red-500/20">
                          <Zap className="h-3.5 w-3.5 text-red-400" />
                          <span className="text-[11px] font-mono font-bold text-white/80">{alert.action}</span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => dismissAlert(alert.id)} 
                      className="p-1.5 hover:bg-white/5 rounded-full transition text-white/20 hover:text-white"
                      title="Dispensar Alerta"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              {/* IA BRIEFING: THE NEURAL BRAIN DECK */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-500/[0.04] via-purple-500/[0.01] to-transparent border border-indigo-500/20 p-8 shadow-xl">
                  {/* Glowing background meshes */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute -top-20 -right-20 p-8 opacity-[0.02] pointer-events-none">
                    <Brain className="h-72 w-72 text-indigo-400" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                          <Brain className="h-6 w-6 text-indigo-400" />
                        </div>
                        <div>
                          <h2 className="text-[16px] font-black text-white uppercase tracking-tight">IA CO-PILOTO ESTRATÉGICO</h2>
                          <p className="text-[9px] text-indigo-400 uppercase font-mono tracking-widest">DIAGNÓSTICO E PRESCRIÇÃO NEURAL</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/15 text-[8px] font-mono text-indigo-300">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
                        </span>
                        DECISION MODEL V3
                      </div>
                    </div>

                    {brief ? (
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                             <MessageSquare className="h-3.5 w-3.5 text-indigo-400/60" />
                             <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Questionamento Provocativo para o Fundador</span>
                          </div>
                          <blockquote className="text-[20px] md:text-[23px] font-bold text-white/95 leading-snug italic tracking-tight border-l-2 border-indigo-500/30 pl-4 py-1">
                            "{brief.question}"
                          </blockquote>
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t border-white/5">
                          <div className="flex items-center gap-2">
                             <Zap className="h-3.5 w-3.5 text-amber-400" />
                             <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Prescrição Tática Recomendada</span>
                          </div>
                          <div className="bg-gradient-to-r from-indigo-500/[0.08] via-indigo-500/[0.01] to-transparent border-l-4 border-indigo-500 p-6 rounded-r-2xl">
                            <p className="text-[16px] font-bold text-white leading-relaxed">{brief.action}</p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={fetchBrief}
                          disabled={briefLoading}
                          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-[10px] font-black text-indigo-300 hover:text-indigo-200 transition-all duration-300 disabled:opacity-30 uppercase tracking-widest"
                        >
                          <RefreshCw className={`h-3.5 w-3.5 ${briefLoading ? 'animate-spin' : ''}`} />
                          Atualizar Diagnóstico de IA
                        </button>
                      </div>
                    ) : (
                      <div className="py-20 text-center space-y-6">
                        <p className="text-white/40 text-[11px] uppercase font-black tracking-widest">Briefing aguardando processamento neural</p>
                        <button 
                          onClick={fetchBrief} 
                          className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                          Gerar Briefing Estratégico
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <PositionSynthesisCard data={data} onReload={fetchData} />
                  <SprintAlphaCard state={data.state.sprint_alpha} onReload={() => reloadRef.current?.()} />
                </div>
              </div>

              {/* ALERTAS SECUNDÁRIOS & COMPLIANCE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AlertsList alerts={alerts.filter(a => !a.read && a.level !== 'critical')} onDismiss={dismissAlert} onRun={runAnalysis} loading={alertsLoading} />
                <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-8 flex flex-col justify-center items-center text-center space-y-5 relative overflow-hidden">
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <Shield className="h-8 w-8 text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] font-mono">COMPLIANCE GUARD ATIVO</p>
                    <p className="text-[12px] text-white/50 leading-relaxed max-w-xs">
                      O SEA monitora vulnerabilidades, logs e políticas regulatórias de forma automatizada 24 horas por dia.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    INTEGRIDADE ASSEGURADA
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'metricas' && (
            <motion.div 
              key="metricas"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <FinancialCockpitCard cockpit={data.cockpit} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DDDMMaturityCard state={data.state.maturity_dddm} onReload={() => reloadRef.current?.()} />
                <ComplianceTrackerCard compliance={data.cockpit.compliance} onReload={() => reloadRef.current?.()} />
              </div>

              {/* TELEMETRIA AO VIVO */}
              <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-8 shadow-xl">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Painel de Telemetria Operacional</h3>
                        <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Monitoramento Clínico de Eventos</p>
                      </div>
                    </div>
                 </div>
                 <AdminTelemetry />
              </div>

              <AdoptionTrailCard state={data.state.adoption_trail} onReload={() => reloadRef.current?.()} />
            </motion.div>
          )}

          {activeTab === 'inovacao' && (
            <motion.div 
              key="inovacao"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InnovationHorizonsCard state={data.state.innovation_horizons} onReload={() => reloadRef.current?.()} />
                <MaturityExecutionCard state={data.state.maturity_sgi} onReload={() => reloadRef.current?.()} />
              </div>

              <InnovationFunnelCard data={data} onReload={() => reloadRef.current?.()} />
              
              <TargetsRadarCard />
            </motion.div>
          )}

          {activeTab === 'lideranca' && (
            <motion.div 
              key="lideranca"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <LeadershipProcessCard state={data.state.leadership_process} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2">
                    <OKRGeneratorCard />
                 </div>
                 <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                      <Users className="h-10 w-10 text-amber-400" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[14px] font-black text-white uppercase tracking-wider">Cultura de Execução</h4>
                      <p className="text-[12px] text-white/40 leading-relaxed">
                        "Estratégia é 1%. Execução pura é 99%." Mantenha os alinhamentos semanais e rituais táticos de time para consolidar a cultura.
                      </p>
                    </div>
                    
                    <div className="w-full space-y-2 pt-2">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }} />
                      </div>
                      <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest">Saúde de Performance do Time: 65%</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

// ───────────────────────────── COMPONENTES AUXILIARES REDESENHADOS ─────────────────────────────

function CompactTrails({ data }: { data: CockpitData }) {
  const company = data.state.company_trail ?? { current_stage: 2 }
  const market = data.state.market_trail ?? { current_stage: 2 }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="px-5 py-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest font-mono">ROADMAP OPERACIONAL DA EMPRESA</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400">FASE {company.current_stage}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className="flex-1 space-y-1">
              <div className={`h-2 rounded-full transition-all duration-1000 ${s <= company.current_stage ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(99,102,241,0.35)]' : 'bg-white/5'}`} />
              <p className="text-[6.5px] font-mono text-center text-white/15">S0{s}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-5 py-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest font-mono">ADOÇÃO CLÍNICA DE MERCADO</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400">FASE {market.current_stage}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className="flex-1 space-y-1">
              <div className={`h-2 rounded-full transition-all duration-1000 ${s <= market.current_stage ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_12px_rgba(16,185,129,0.35)]' : 'bg-white/5'}`} />
              <p className="text-[6.5px] font-mono text-center text-white/15">S0{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PositionSynthesisCard({ data, onReload }: { data: CockpitData; onReload: () => void }) {
  const trl = data.state.trl ?? { level: 7, label: 'Produção', max: 9 }
  const hype = data.state.hype_cycle ?? { position: 'encosta_iluminacao', label: 'Encosta da Iluminação', stage_num: 4 }
  const maturity = data.state.maturity_sgi ?? { projects: 0, processes: 0, culture: 0, results: 0 }
  const structuralReadiness = (maturity.projects + maturity.processes) / 6
  const hasStructuralBlocker = data.state.compliance?.technical_blocker === true
  const mrr = data.cockpit.financials.mrr
  
  const windowOpen = trl.level >= 7 && (hype.stage_num === 3 || hype.stage_num === 4)
  const isRevenueGap = mrr === 0 && trl.level >= 7
  const isStructuralGap = structuralReadiness < 0.5 || hasStructuralBlocker

  const status = isRevenueGap && !isStructuralGap ? 'ATENÇÃO COMERCIAL' : isStructuralGap ? 'ESTRUTURA FRÁGIL' : windowOpen ? 'OPORTUNIDADE' : 'TRAÇÃO'
  const statusColor = isRevenueGap && !isStructuralGap ? '#ef4444' : isStructuralGap ? '#f59e0b' : windowOpen ? '#3b82f6' : '#10b981'

  const toggleBlocker = async () => {
    try {
      await fetch('/api/admin/strategy/update', {
        method: 'POST',
        body: JSON.stringify({ key: 'compliance', value: { ...data.state.compliance, technical_blocker: !hasStructuralBlocker } })
      })
      onReload()
    } catch { /* ... */ }
  }

  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent p-6 space-y-6 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-white/30" />
          <h3 className="text-[10px] font-black text-white/55 uppercase tracking-widest font-mono">SÍNTESE DE POSIÇÃO</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleBlocker}
            className={`px-2 py-0.5 rounded text-[8px] font-mono border transition-all ${hasStructuralBlocker ? 'bg-red-500/20 border-red-500/40 text-red-300' : 'border-white/10 text-white/30 hover:border-white/20'}`}
          >
            {hasStructuralBlocker ? 'BLOQUEIO DETECTADO' : 'SINALIZAR ERROS'}
          </button>
          <span className="px-2 py-0.5 rounded text-[8px] font-mono border" style={{ color: statusColor, borderColor: `${statusColor}40`, backgroundColor: `${statusColor}10` }}>
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/[0.015] border border-white/5 text-center">
          <p className="text-[8px] font-black text-white/35 uppercase tracking-widest mb-1 font-mono">MRR REAL</p>
          <p className={`text-[20px] font-black font-mono tracking-tighter ${mrr === 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            R$ {mrr.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.015] border border-white/5 text-center relative group">
          <p className="text-[8px] font-black text-white/35 uppercase tracking-widest mb-1 font-mono">PRONTIDÃO ESTRUTURAL</p>
          <p className={`text-[12px] font-black uppercase tracking-wider ${isStructuralGap ? 'text-amber-400' : 'text-emerald-400'}`}>
            {isStructuralGap ? 'Instável' : 'Sólida'}
          </p>
          <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-current rounded-full" style={{ width: `${structuralReadiness * 100}%`, color: isStructuralGap ? '#f59e0b' : '#10b981' }} />
          </div>
          
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-[#0c0d14] border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-2xl">
            <p className="text-[9px] text-white/60 leading-relaxed text-left font-mono">
              Baseado na <span className="text-white font-bold">Maturidade SGI</span> (Projetos + Processos). Se for inferior a 50%, a IA prioriza <span className="text-amber-400 font-bold">Estabilidade interna</span> antes de tração.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border bg-white/[0.01]" style={{ borderColor: `${statusColor}20` }}>
         <p className="text-[12px] font-semibold leading-relaxed" style={{ color: statusColor }}>
           {isRevenueGap && !isStructuralGap 
             ? "⚠️ ALERTA DE MERCADO: TRL alto e infraestrutura estável atingidos, mas MRR é nulo. Evite perfeccionismo. Foco prioritário em fechamentos comerciais."
             : isStructuralGap
             ? "🛠️ AJUSTE INTERNO: Maturidade técnica instável. Evite escalar tráfego comercial até que os bugs e processos críticos sejam estabilizados."
             : windowOpen 
             ? "🚀 ACELERAÇÃO: Maturidade e mercado perfeitamente alinhados. Tração comercial máxima recomendada."
             : "🏗️ ESTRUTURAÇÃO: Continue refinando e validando hipóteses clínicas com grupos piloto para elevar o TRL."}
         </p>
      </div>
    </div>
  )
}

function InnovationHorizonsCard({ state, onReload }: { state?: CockpitData['state']['innovation_horizons']; onReload: () => void }) {
  const h = state ?? { h1: 60, h2: 30, h3: 10 }
  
  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-8">
      <div className="flex items-center gap-3.5 mb-8">
        <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-500/5">
          <Layers className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Os Três Horizontes de Inovação</h3>
          <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Alocação de Energia de Desenvolvimento</p>
        </div>
      </div>

      <div className="space-y-6">
        {[
          { id: 'h1', label: 'H1 · PRODUTO CORE', desc: 'Melhorias incrementais no SEA principal', val: h.h1, color: '#3b82f6', target: '60%' },
          { id: 'h2', label: 'H2 · EXPANSÃO ADJACENTE', desc: 'Novas features premium e modelos paralelos', val: h.h2, color: '#8b5cf6', target: '30%' },
          { id: 'h3', label: 'H3 · DESCOBERTA DISRUPTIVA', desc: 'Pesquisa e IA clínica avançada', val: h.h3, color: '#f59e0b', target: '10%' },
        ].map(item => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-end">
               <div>
                 <p className="text-[11px] font-black text-white/90">{item.label}</p>
                 <p className="text-[8px] text-white/35 font-mono uppercase">{item.desc}</p>
               </div>
               <div className="text-right">
                 <span className="text-[13px] font-mono font-black" style={{ color: item.color }}>{item.val}%</span>
                 <p className="text-[8px] text-white/20 font-mono">Alvo: {item.target}</p>
               </div>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${item.val}%` }}
                 className="h-full rounded-full shadow-lg"
                 style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}35` }}
               />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-white/[0.01] border border-white/5">
         <p className="text-[10px] text-white/40 leading-relaxed font-mono">
           O balanço clássico 60/30/10 protege a empresa de obsolescência futura mantendo a eficiência operacional imediata.
         </p>
      </div>
    </div>
  )
}

function InnovationFunnelCard({ data, onReload }: { data: CockpitData; onReload: () => void }) {
  const funnel = data.state.innovation_funnel ?? { stage: 1, items: {} }
  const stages = [
    { id: 1, label: 'Ideação', desc: 'Brainstorm' },
    { id: 2, label: 'Triagem', desc: 'Stage Gate 1' },
    { id: 3, label: 'Protótipo', desc: 'Desenvolvimento' },
    { id: 4, label: 'Decisão', desc: 'Stage Gate 2' },
    { id: 5, label: 'Escala', desc: 'Lançamento' },
  ]

  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-[#09090e]/60 p-8 shadow-xl">
      <div className="flex items-center gap-3.5 mb-10">
        <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-lg shadow-purple-500/5">
          <Target className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Funil de Maturidade de Inovação</h3>
          <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Fluxo Sistemático de Ideias e Patentes</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between relative px-4">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-0 hidden md:block" />
        
        {stages.map((s, idx) => {
          const isCurrent = s.id === funnel.stage
          const isPast = s.id < funnel.stage
          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-3 w-full md:w-auto">
               <div className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 font-mono ${
                 isCurrent ? 'bg-gradient-to-br from-purple-500 to-indigo-600 border-purple-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] scale-110' : 
                 isPast ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
                 'bg-white/[0.02] border-white/10 text-white/20'
               }`}>
                  {isPast ? <CheckSquare className="h-4.5 w-4.5" /> : <span className="text-[14px] font-black">{s.id}</span>}
               </div>
               <div className="text-center">
                 <p className={`text-[11px] font-black uppercase tracking-wider ${isCurrent ? 'text-white font-bold' : 'text-white/40'}`}>{s.label}</p>
                 <p className="text-[8px] text-white/20 font-mono uppercase">{s.desc}</p>
               </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LeadershipProcessCard({ state }: { state?: CockpitData['state']['leadership_process'] }) {
  const p = state ?? { clarity: 0, alignment: 0, training: 0, execution: 0, results: 0 }
  
  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#f59e0b]/[0.02] to-transparent p-8">
      <div className="flex items-center gap-3.5 mb-10">
        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-xl shadow-amber-500/5">
          <Users2 className="h-6 w-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-[16px] font-black text-white uppercase tracking-tight">Processo Sistemático de Liderança</h3>
          <p className="text-[10px] text-amber-400 uppercase font-mono tracking-widest font-bold">Motor de Escala Humana e Processos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { id: 'clarity', label: 'Clareza', sub: 'Métrica + KPIs', val: p.clarity, icon: Eye },
          { id: 'alignment', label: 'Alinhamento', sub: 'Pactos & Acordos', val: p.alignment, icon: Network },
          { id: 'training', label: 'Capacitação', sub: 'Treinos e PDIs', val: p.training, icon: Rocket },
          { id: 'execution', label: 'Execução', sub: 'Rituais Ágeis', val: p.execution, icon: Activity },
          { id: 'results', label: 'Resultado', sub: 'Performance Real', val: p.results, icon: Trophy },
        ].map(item => (
          <div key={item.id} className="relative p-6 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col items-center text-center space-y-4 hover:bg-white/[0.03] transition-all duration-300 group">
             <div className="p-3 rounded-xl bg-white/5 group-hover:bg-amber-500/10 transition-colors duration-300">
               <item.icon className={`h-5 w-5 ${item.val > 50 ? 'text-amber-400' : 'text-white/20'}`} />
             </div>
             <div>
               <p className="text-[11px] font-black text-white uppercase tracking-wider">{item.label}</p>
               <p className="text-[8px] text-white/35 font-mono uppercase">{item.sub}</p>
             </div>
             <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-1 relative">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${item.val}%` }} />
             </div>
             <span className="text-[11px] font-mono font-black text-amber-400">{item.val}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FinancialCockpitCard({ cockpit }: { cockpit: CockpitData['cockpit'] }) {
  const { financials, users, engagement } = cockpit
  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/5">
            <DollarSign className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Cockpit Financeiro & Conversão</h3>
            <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Indicadores Comercial & SaaS em Tempo Real</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
           <p className="text-[8px] font-black text-white/35 uppercase tracking-widest font-mono">Runway Estimado</p>
           <p className="text-[18px] font-black text-white tracking-tighter font-mono">{financials.runway_months === Infinity ? '∞ MESES' : `${financials.runway_months} Meses`}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiBox label="MRR Estimado" value={`R$ ${financials.mrr.toLocaleString('pt-BR')}`} color={financials.mrr > 0 ? '#10b981' : '#ef4444'} icon={TrendingUp} />
        <KpiBox label="ARR Projetado" value={`R$ ${financials.arr.toLocaleString('pt-BR')}`} color="#10b981" icon={Globe} />
        <KpiBox label="Ticket Médio" value={`R$ ${financials.pricing.toLocaleString('pt-BR')}`} color="#94a3b8" icon={DollarSign} />
        <KpiBox label="Assinantes Ativos" value={financials.active_subs} color="#3b82f6" icon={Users} />
        <KpiBox label="Churn Rate" value={`${financials.churn_rate_pct}%`} color={financials.churn_rate_pct > 10 ? '#ef4444' : '#94a3b8'} icon={Activity} />
        <KpiBox label="NPS Geral" value={engagement.nps_net === null ? '—' : `${engagement.nps_net > 0 ? '+' : ''}${engagement.nps_net}`} color={engagement.nps_net !== null && engagement.nps_net > 0 ? '#10b981' : '#94a3b8'} icon={Heart} />
      </div>
    </div>
  )
}

function KpiBox({ label, value, color, icon: Icon }: { label: string; value: string | number; color: string; icon: any }) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.03] transition-all duration-300 hover:scale-[1.02]">
      <div className="p-2.5 rounded-xl bg-white/5 mb-3 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <p className="text-[8px] font-black text-white/35 uppercase tracking-widest mb-1.5 font-mono">{label}</p>
      <p className="text-[16px] font-black tabular-nums font-mono tracking-tighter" style={{ color }}>{value}</p>
    </div>
  )
}

function DDDMMaturityCard({ state, onReload }: { state?: CockpitData['state']['maturity_dddm']; onReload: () => void }) {
  const current = state ?? { collection: 1, analysis: 1, visualization: 1, integration: 0 }
  const items = [
    { key: 'collection', label: 'Coleta de Dados', icon: Database },
    { key: 'analysis', label: 'Modelos de Análise', icon: Brain },
    { key: 'visualization', label: 'Dashboard & Visuals', icon: BarChart3 },
    { key: 'integration', label: 'Integração de APIs', icon: Network },
  ] as const

  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-8 shadow-xl">
       <div className="flex items-center gap-3.5 mb-8">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/5">
            <Database className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white uppercase tracking-tight">DDDM · Maturidade Analítica</h3>
            <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Nível de Decisão Baseada em Dados (Data-Driven)</p>
          </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.key} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
               <div className="flex items-center justify-between">
                  <item.icon className="h-4.5 w-4.5 text-white/30" />
                  <span className="text-[10px] font-mono font-bold text-white/80">{current[item.key]}/3</span>
               </div>
               <p className="text-[11px] font-black text-white/60 uppercase tracking-wide">{item.label}</p>
               <div className="flex gap-1.5 pt-1">
                  {[1, 2, 3].map(step => (
                    <div key={step} className={`h-1.5 flex-1 rounded-full ${step <= current[item.key] ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-white/5'}`} />
                  ))}
               </div>
            </div>
          ))}
       </div>
    </div>
  )
}

function ComplianceTrackerCard({ compliance, onReload }: { compliance: Compliance; onReload: () => void }) {
  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-8 shadow-xl">
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/5">
              <Shield className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Compliance & Segurança</h3>
              <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Requisitos LGPD Clínicos & Segurança</p>
            </div>
          </div>
          <div className="text-right">
             <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono font-bold text-amber-400">
               {Math.round((compliance.score / compliance.max) * 100)}%
             </span>
          </div>
       </div>

       <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar scrollbar-hide">
          {Object.entries(compliance.items).map(([label, active]) => (
            <div key={label} className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
               <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-all ${active ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-white/15 bg-white/5'}`}>
                 {active && <CheckSquare className="h-3.5 w-3.5" />}
               </div>
               <span className={`text-[11px] font-bold ${active ? 'text-white/90' : 'text-white/35 font-mono'}`}>{label}</span>
            </div>
          ))}
       </div>
    </div>
  )
}

function AdoptionTrailCard({ state, onReload }: { state?: CockpitData['state']['adoption_trail']; onReload: () => void }) {
  const current = state ?? { current_stage: 1, stages: ['Validação', 'Piloto', 'Multi-centro', 'Comercial B2C', 'Comercial B2B'] }
  
  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-indigo-500/[0.02] to-transparent p-8 shadow-xl">
       <div className="flex items-center gap-3.5 mb-10">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/5">
            <MapIcon className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Trilho de Adoção Clínica</h3>
            <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Progresso de Validação Científica & Comercial</p>
          </div>
       </div>

       <div className="flex flex-col md:flex-row items-center justify-between relative px-4 gap-6 md:gap-4">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-0 hidden md:block" />
          {current.stages.map((label, i) => {
            const isDone = i + 1 < current.current_stage
            const isCurrent = i + 1 === current.current_stage
            return (
              <div key={label} className="relative z-10 flex flex-col items-center gap-3 w-full md:w-auto">
                 <div className={`h-11 w-11 rounded-full border-2 flex items-center justify-center transition-all duration-500 font-mono ${
                   isCurrent ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] scale-110' : 
                   isDone ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
                   'bg-white/[0.02] border-white/10 text-white/20'
                 }`}>
                   {isDone ? <CheckSquare className="h-4.5 w-4.5" /> : <span className="text-[12px] font-black">{i + 1}</span>}
                 </div>
                 <div className="text-center">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${isCurrent ? 'text-white font-bold' : 'text-white/35'}`}>{label}</p>
                    {isCurrent && <span className="text-[7.5px] font-mono font-black text-indigo-400 uppercase tracking-widest block mt-0.5 animate-pulse">ESTÁGIO ATUAL</span>}
                 </div>
              </div>
            )
          })}
       </div>
    </div>
  )
}

function MaturityExecutionCard({ state, onReload }: { state?: CockpitData['state']['maturity_sgi']; onReload: () => void }) {
  const [updating, setUpdating] = useState<string | null>(null)
  const current = state ?? { projects: 1, processes: 1, culture: 0, results: 1 }
  const items = [
    { key: 'projects', label: 'Maturidade de Projetos', icon: Briefcase },
    { key: 'processes', label: 'Eficiência de Processos', icon: Activity },
    { key: 'culture', label: 'Cultura & Alinhamento', icon: Heart },
    { key: 'results', label: 'Métricas de Resultados', icon: Trophy },
  ] as const

  const updateLevel = async (key: string, val: number) => {
    setUpdating(key)
    try {
      await fetch('/api/admin/strategy/update', {
        method: 'POST',
        body: JSON.stringify({ key: 'maturity_sgi', value: { ...current, [key]: val } })
      })
      onReload()
    } catch { /* ... */ } finally { setUpdating(null) }
  }

  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-8 shadow-xl">
       <div className="flex items-center gap-3.5 mb-8">
          <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shadow-lg shadow-pink-500/5">
            <Rocket className="h-5 w-5 text-pink-400" />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Maturidade de Gestão Interna</h3>
            <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Interaja para atualizar a telemetria em tempo real</p>
          </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.key} className={`p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 transition-all duration-300 ${updating === item.key ? 'opacity-40 scale-[0.98]' : ''}`}>
               <div className="flex items-center justify-between">
                  <item.icon className="h-4.5 w-4.5 text-white/30" />
                  <span className="text-[10px] font-mono font-bold text-white/80">{current[item.key as keyof typeof current]}/3</span>
               </div>
               <p className="text-[11px] font-black text-white/60 uppercase tracking-wide">{item.label}</p>
               <div className="flex gap-1.5 pt-1">
                  {[0, 1, 2, 3].map(step => (
                    <button 
                      key={step} 
                      disabled={updating !== null}
                      onClick={() => updateLevel(item.key, step)}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 hover:scale-y-150 ${step <= current[item.key as keyof typeof current] ? 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]' : 'bg-white/5'}`} 
                    />
                  ))}
               </div>
            </div>
          ))}
       </div>
    </div>
  )
}

function SprintAlphaCard({ state, onReload }: { state?: CockpitData['state']['sprint_alpha']; onReload: () => void }) {
  const s = state ?? { started_at: null, current_day: 1, completed_days: [] }
  if (!s.started_at) return null

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4 shadow-xl">
       <div className="flex items-center gap-3">
          <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/20">
            <Clock className="h-3.5 w-3.5 text-indigo-400" />
          </div>
          <h3 className="text-[10px] font-black text-white/55 uppercase tracking-widest font-mono">Sprint Alpha · Desafio 21 Dias</h3>
       </div>
       <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 21 }).map((_, i) => {
            const day = i + 1
            const done = s.completed_days.includes(day)
            const isCurrent = day === s.current_day
            return (
              <div 
                key={day} 
                className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold border font-mono transition-all duration-300 hover:scale-105 ${
                  done ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
                  isCurrent ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_12px_rgba(99,102,241,0.45)]' : 
                  'bg-white/5 border-white/10 text-white/25'
                }`}
              >
                {day}
              </div>
            )
          })}
       </div>
    </div>
  )
}

function AlertsList({ alerts, onDismiss, onRun, loading }: { alerts: StrategicAlert[], onDismiss: (id: string) => void, onRun: () => void, loading: boolean }) {
  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-6 flex flex-col h-full shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-white/30" />
          <h4 className="text-[10px] font-black text-white/55 uppercase tracking-widest font-mono">ALERTAS ESTRATÉGICOS</h4>
        </div>
        <button 
          onClick={onRun} 
          disabled={loading} 
          className="p-2 hover:bg-white/5 rounded-xl transition text-indigo-400 disabled:opacity-30"
          title="Executar Auditoria de IA"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3 opacity-25">
             <div className="p-3.5 rounded-full border border-white/10 bg-white/5">
              <Shield className="h-6 w-6" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest font-mono">Nenhuma Anomalia Detectada</p>
          </div>
        ) : (
          alerts.map(a => (
            <div key={a.id} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-start gap-4 group hover:border-indigo-500/30 hover:bg-white/[0.02] transition-all duration-300">
              <div className={`h-2 w-2 rounded-full mt-2 shrink-0 animate-pulse ${a.level === 'warning' ? 'bg-amber-400' : 'bg-indigo-400'}`} />
              <div className="flex-1">
                <p className="text-[12px] font-bold text-white/90 leading-tight mb-1">{a.title}</p>
                <p className="text-[10px] text-white/45 leading-relaxed font-mono">{a.message}</p>
              </div>
              <button 
                onClick={() => onDismiss(a.id)} 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/20 hover:text-white"
                title="Ignorar"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function OKRGeneratorCard() {
  const [loading, setLoading] = useState(false)
  const [okrs, setOkrs] = useState<any[] | null>(null)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/strategy/okr-generator', { method: 'POST' })
      const json = await res.json()
      setOkrs(json.okrs)
    } catch { /* ... */ } finally { setLoading(false) }
  }

  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.015] to-transparent p-8 shadow-xl">
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/5">
              <Goal className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-[14px] font-black text-white uppercase tracking-tight">OKR Generator · Inteligência SEA</h3>
              <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Alinhamento e Desdobramento Trimestral</p>
            </div>
          </div>
          {!okrs && (
            <button 
              onClick={generate} 
              disabled={loading} 
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#09090e] text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-30 shadow-lg shadow-amber-500/15"
            >
              {loading ? 'Processando...' : 'Gerar OKRs'}
            </button>
          )}
       </div>

       {okrs ? (
         <div className="space-y-6">
            {okrs.map((o: any, i: number) => (
               <div key={i} className="p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-4">
                  <div className="flex items-center gap-3">
                     <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono font-bold text-amber-400">OBJ {i+1}</span>
                     <p className="text-[14px] font-bold text-white">{o.objective}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-white/5">
                     {o.key_results.map((kr: string, j: number) => (
                       <div key={j} className="flex gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500/40 mt-2 shrink-0" />
                          <p className="text-[11px] text-white/50 leading-relaxed">{kr}</p>
                       </div>
                     ))}
                  </div>
               </div>
            ))}
            <button onClick={() => setOkrs(null)} className="text-[9px] font-black text-white/35 uppercase hover:text-white transition tracking-widest font-mono">Reiniciar Diagnóstico de OKRs</button>
         </div>
       ) : (
         <div className="py-16 text-center border border-dashed border-white/5 rounded-2xl bg-white/[0.005]">
            <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.25em] font-mono">Pressione o botão para a IA propor seus OKRs do trimestre</p>
         </div>
       )}
    </div>
  )
}

function TargetsRadarCard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchTargets = async (refresh = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/strategy/targets${refresh ? '?refresh=1' : ''}`)
      const json = await res.json()
      setData(json)
    } catch { /* ... */ } finally { setLoading(false) }
  }

  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-[#09090e]/60 p-8 shadow-xl relative overflow-hidden">
       {/* Visual Scan Animation in background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.015)_0%,transparent_60%)] pointer-events-none" />
       
       <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/5">
              <Search className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Radar Analítico do Mercado</h3>
              <p className="text-[9px] text-white/30 uppercase font-mono tracking-widest">Monitor de Hospitais Alvo · VCs · Concorrentes</p>
            </div>
          </div>
          {!data ? (
            <button 
              onClick={() => fetchTargets()} 
              disabled={loading} 
              className="px-6 py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-30"
            >
              {loading ? 'Varrendo mercado...' : 'Ativar Varredura'}
            </button>
          ) : (
            <button 
              onClick={() => fetchTargets(true)} 
              disabled={loading} 
              className="p-2 hover:bg-white/5 rounded-xl transition text-white/35 hover:text-white"
            >
               <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
       </div>

       {data && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {['HOSPITAIS ALVO', 'INVESTIDORES (VCs)', 'CONCORRENTES DIRECT'].map((category, idx) => {
              const keys = ['hospitals', 'vcs', 'competitors'] as const
              const items = data[keys[idx]] || []
              return (
                <div key={category} className="space-y-4">
                   <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                     <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                     <p className="text-[9px] font-black text-white/40 uppercase tracking-widest font-mono">{category}</p>
                   </div>
                   <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-hide">
                      {items.map((it: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-indigo-500/20 hover:bg-white/[0.02] transition-all duration-300 group">
                           <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[11px] font-black text-white">{it.name}</p>
                              <ArrowUpRight className="h-3.5 w-3.5 text-white/0 group-hover:text-white/35 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                           </div>
                           <p className="text-[10px] text-white/45 leading-relaxed font-mono">{it.relevance || it.description}</p>
                        </div>
                      ))}
                      {items.length === 0 && (
                        <p className="text-[10px] text-white/20 italic font-mono">Nenhum nó de dados mapeado.</p>
                      )}
                   </div>
                </div>
              )
            })}
         </div>
       )}
    </div>
  )
}
