'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Activity, AlertTriangle, BarChart3, Brain, Briefcase, Building2, 
  CheckSquare, Crown, Database, DollarSign, ExternalLink, Eye, 
  FileText, Flag, Gauge, Goal, Heart, Hospital, LayoutGrid, 
  Map as MapIcon, Network, RefreshCw, Rocket, Square, Target, 
  TrendingUp, Trophy, Users, Users2, Zap, Shield, ChevronRight, 
  MessageSquare, Layers, Search, MousePointer2, Clock, Globe, ArrowUpRight, HelpCircle
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
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#a78bfa]/10 border-t-[#a78bfa] shadow-[0_0_20px_rgba(167,139,250,0.15)]" />
        <Brain className="absolute h-6 w-6 text-[#a78bfa] animate-pulse" />
      </div>
      <div className="text-center space-y-1.5">
        <p className="text-sm font-semibold tracking-[0.2em] text-[#a78bfa] uppercase">Sincronizando Cockpit de IA</p>
        <p className="text-xs text-white/40">Carregando telemetria e dados de maturidade clínica...</p>
      </div>
    </div>
  )

  if (error && !data) return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-12 text-center backdrop-blur-2xl max-w-lg mx-auto shadow-2xl">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Falha na Sincronização</h3>
      <p className="text-sm text-red-400 mb-6 leading-relaxed">{error}</p>
      <button onClick={fetchData} className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all uppercase tracking-wider">Tentar Reconexão</button>
    </div>
  )

  if (!data) return null

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-32">
      {/* 🚀 HEADER PREMIUM: STATUS DO SISTEMA */}
      <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-6 md:p-8 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Zap className="h-64 w-64 text-[#a78bfa]" />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_8px_30px_rgba(124,58,237,0.3)] border border-violet-400/20">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                SEA FISIO COCKPIT ESTRATÉGICO
              </h1>
              <div className="flex items-center flex-wrap gap-2 mt-1.5">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Diagnostic
                </span>
                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded">v2.5 Autonomous</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
             <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between min-w-[140px] hover:border-white/10 transition-all">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">Maturidade TRL</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-white">{data.state.trl?.level || 7}</span>
                  <div className="flex-1">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]" style={{ width: `${((data.state.trl?.level || 7)/9)*100}%` }} />
                    </div>
                    <span className="text-[8px] text-white/40 mt-1 block uppercase">Nível {data.state.trl?.level || 7}/9</span>
                  </div>
                </div>
             </div>
             <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between min-w-[140px] hover:border-white/10 transition-all">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">Fase do Negócio</p>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Target className="h-4.5 w-4.5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white uppercase tracking-wider block">{data.state.phase?.label || 'Validação'}</span>
                    <span className="text-[8px] text-white/40 block uppercase">Alvo: {data.state.phase?.goal_users || 10} Fisios</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6">
           <CompactTrails data={data} />
        </div>
      </header>

      {/* 🧭 NAVEGAÇÃO DE ALTA PERFORMANCE */}
      <nav className="flex p-1.5 bg-slate-950/70 border border-white/10 rounded-2xl sticky top-4 z-40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {[
          { id: 'guia', label: 'PLANO DE AÇÃO', icon: Brain, color: '#a78bfa' },
          { id: 'metricas', label: 'FINANÇAS & TRAÇÃO', icon: DollarSign, color: '#10B981' },
          { id: 'inovacao', label: 'ROADMAP & INOVAÇÃO', icon: LayoutGrid, color: '#38bdf8' },
          { id: 'lideranca', label: 'EXECUÇÃO & OKRs', icon: Users2, color: '#fbbf24' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-1 items-center justify-center gap-2.5 py-3 px-3 rounded-xl text-xs font-black transition-all duration-300 relative overflow-hidden ${
              activeTab === tab.id 
                ? 'text-white' 
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute inset-0 z-0 bg-gradient-to-br opacity-[0.08]" 
                style={{ backgroundColor: tab.color }}
              />
            )}
            {activeTab === tab.id && (
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-t-full shadow-[0_0_15px_currentColor]" 
                style={{ color: tab.color, backgroundColor: 'currentColor' }}
              />
            )}
            <tab.icon className={`h-4.5 w-4.5 relative z-10 transition-all duration-300 ${activeTab === tab.id ? 'scale-110' : 'opacity-50'}`} style={{ color: activeTab === tab.id ? tab.color : undefined }} />
            <span className="relative z-10 hidden md:inline tracking-wider uppercase">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 🎭 PALCO DINÂMICO (ABAS) */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'guia' && (
            <motion.div 
              key="guia"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* ALERTA CRÍTICO: FLASH DESIGN */}
              {alerts.filter(a => !a.read && a.level === 'critical').map(alert => (
                <div key={alert.id} className="relative overflow-hidden rounded-3xl bg-red-500/10 border-2 border-red-500/20 p-6 shadow-[0_0_40px_rgba(239,68,68,0.15)] animate-pulse">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-500/30 shrink-0">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-black text-red-400 uppercase tracking-[0.2em] mb-1.5">{alert.title}</h3>
                      <p className="text-[15px] text-white font-semibold leading-relaxed">{alert.message}</p>
                      {alert.action && (
                        <div className="mt-4.5 inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 rounded-xl border border-red-500/30">
                          <Zap className="h-3.5 w-3.5 text-red-400" />
                          <span className="text-xs font-bold text-white">{alert.action}</span>
                        </div>
                      )}
                    </div>
                    <button onClick={() => dismissAlert(alert.id)} className="p-1.5 hover:bg-white/10 rounded-full transition text-white/30 hover:text-white shrink-0">✕</button>
                  </div>
                </div>
              ))}

              {/* IA BRIEFING: THE BRAIN */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-950/40 to-slate-900/60 border border-violet-500/20 p-6 md:p-8 shadow-[0_15px_40px_rgba(139,92,246,0.05)]">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                    <Brain className="h-72 w-72 text-[#a78bfa]" />
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 border border-violet-400/20">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-base font-extrabold text-white tracking-tight">AI Diagnostic Panel</h2>
                          <p className="text-[9px] text-violet-400 uppercase font-black tracking-widest">Processamento Neural Ativo</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded text-[8px] font-black text-violet-400 uppercase tracking-widest">
                        <div className="h-1 w-1 rounded-full bg-violet-400 animate-ping" />
                        Online
                      </div>
                    </div>

                    {brief ? (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                             <MessageSquare className="h-3.5 w-3.5 text-violet-400" />
                             <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Pergunta Estratégica do Fundador</span>
                          </div>
                          <div className="bg-slate-950/40 rounded-2xl border border-white/5 p-5">
                            <p className="text-lg md:text-xl font-bold text-white leading-relaxed italic">
                              "{brief.question}"
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                             <Zap className="h-3.5 w-3.5 text-amber-400" />
                             <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Plano de Execução Imediata</span>
                          </div>
                          <div className="bg-gradient-to-r from-violet-500/10 to-transparent border-l-4 border-[#a78bfa] p-5 rounded-r-2xl">
                            <p className="text-sm font-semibold text-white leading-relaxed">{brief.action}</p>
                          </div>
                        </div>
                        
                        <div className="flex pt-2">
                          <button 
                            onClick={fetchBrief}
                            disabled={briefLoading}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-violet-300 hover:bg-white/10 transition-all disabled:opacity-30 uppercase tracking-widest"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${briefLoading ? 'animate-spin' : ''}`} />
                            Atualizar Diagnóstico
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-16 text-center space-y-6 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                          <HelpCircle className="h-6 w-6 text-white/30" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-white/60 text-sm font-bold">Briefing aguardando sincronização</p>
                          <p className="text-xs text-white/40">A IA está pronta para consolidar as métricas mais recentes e gerar a recomendação.</p>
                        </div>
                        <button onClick={fetchBrief} className="px-6 py-2.5 rounded-xl bg-[#a78bfa] text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-[#b59dfb] transition-all">
                          Gerar Diretriz Estratégica
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

              {/* ALERTAS SECUNDÁRIOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AlertsList alerts={alerts.filter(a => !a.read && a.level !== 'critical')} onDismiss={dismissAlert} onRun={runAnalysis} loading={alertsLoading} />
                <div className="rounded-3xl border border-white/10 bg-slate-900/20 p-6 flex flex-col justify-center items-center text-center space-y-4 hover:border-white/20 transition-all shadow-lg">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Compliance Guard Ativo</p>
                    <p className="text-xs text-white/60 px-6 leading-relaxed">
                      Auditor automático ativado. O sistema monitora mudanças regulatórias e segurança na nuvem 24 horas por dia.
                    </p>
                  </div>
                  <span className="text-[9px] font-bold text-white/30 uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded">LGPD / RLS Check</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'metricas' && (
            <motion.div 
              key="metricas"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <FinancialCockpitCard cockpit={data.cockpit} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DDDMMaturityCard state={data.state.maturity_dddm} onReload={() => reloadRef.current?.()} />
                <ComplianceTrackerCard compliance={data.cockpit.compliance} onReload={() => reloadRef.current?.()} />
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 backdrop-blur-3xl shadow-xl">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Telemetria e Atividade em Tempo Real</h3>
                      <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Atividade real dos fisioterapeutas no sistema</p>
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
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <LeadershipProcessCard state={data.state.leadership_process} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2">
                    <OKRGeneratorCard />
                 </div>
                 <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/40 to-slate-950/60 p-6 md:p-8 flex flex-col items-center justify-between text-center space-y-6 shadow-xl">
                    <div className="space-y-4 w-full flex flex-col items-center">
                      <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Users className="h-7 w-7 text-amber-400" />
                      </div>
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-widest">Cultura de Execução</h4>
                      <p className="text-xs text-white/50 leading-relaxed max-w-[240px]">
                        "Estratégia sem execução é apenas uma alucinação." Mantenha rituais semanais ativos para garantir o foco estratégico.
                      </p>
                    </div>
                    
                    <div className="w-full space-y-2">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-white/40 tracking-wider">
                        <span>Saúde do Time</span>
                        <span className="text-amber-400 font-extrabold">65%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                    
                    <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">Alinhamento Ativo</span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ───────────────────────────── COMPONENTES AUXILIARES REDESENHADOS ─────────────────────────────

function CompactTrails({ data }: { data: CockpitData }) {
  const company = data.state.company_trail ?? { current_stage: 2 }
  const market = data.state.market_trail ?? { current_stage: 2 }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-violet-400" />
            <p className="text-[10px] font-black text-white/60 uppercase tracking-wider">Roadmap do Produto (Clínico)</p>
          </div>
          <span className="text-xs font-black text-violet-400 uppercase tracking-widest">Fase {company.current_stage}</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className="h-2 flex-1 rounded-full relative overflow-hidden bg-white/5">
              {s <= company.current_stage && (
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapIcon className="h-4 w-4 text-sky-400" />
            <p className="text-[10px] font-black text-white/60 uppercase tracking-wider">Adoção Comercial (Hospitais)</p>
          </div>
          <span className="text-xs font-black text-sky-400 uppercase tracking-widest">Fase {market.current_stage}</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className="h-2 flex-1 rounded-full relative overflow-hidden bg-white/5">
              {s <= market.current_stage && (
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
              )}
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
  const phase = data.state.phase ?? { current: 'validacao', label: 'Validação', goal_users: 10 }
  const maturity = data.state.maturity_sgi ?? { projects: 1, processes: 1, culture: 0, results: 1 }
  const structuralReadiness = (maturity.projects + maturity.processes) / 6 // 0 a 1
  const hasStructuralBlocker = data.state.compliance?.technical_blocker === true
  const mrr = data.cockpit.financials.mrr
  
  const windowOpen = trl.level >= 7 && (hype.stage_num === 3 || hype.stage_num === 4)
  const isRevenueGap = mrr === 0 && trl.level >= 7
  const isStructuralGap = structuralReadiness < 0.5 || hasStructuralBlocker

  const status = isRevenueGap && !isStructuralGap ? 'ALERTA TRAÇÃO' : isStructuralGap ? 'ESTRUTURA FRÁGIL' : windowOpen ? 'OPORTUNIDADE' : 'EVOLUÇÃO'
  const statusColor = isRevenueGap && !isStructuralGap ? '#ef4444' : isStructuralGap ? '#f97316' : windowOpen ? '#eab308' : '#6b7280'
  const statusBg = isRevenueGap && !isStructuralGap ? 'bg-red-500/10 border-red-500/20' : isStructuralGap ? 'bg-orange-500/10 border-orange-500/20' : windowOpen ? 'bg-amber-500/10 border-amber-500/20' : 'bg-slate-500/10 border-slate-500/20'

  const toggleBlocker = async () => {
    try {
      await fetch('/api/admin/strategy/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'compliance', value: { ...data.state.compliance, technical_blocker: !hasStructuralBlocker } })
      })
      onReload()
    } catch { /* ... */ }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/30 p-6 space-y-5 shadow-xl hover:border-white/15 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4.5 w-4.5 text-white/40" />
          <h3 className="text-xs font-black text-white/70 uppercase tracking-widest">SÍNTESE DE POSIÇÃO</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleBlocker}
            className={`px-2.5 py-1 rounded-lg text-[9px] font-black border transition-all ${
              hasStructuralBlocker 
                ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                : 'border-white/10 text-white/30 hover:text-white/50 hover:bg-white/5'
            }`}
          >
            {hasStructuralBlocker ? '🛠️ ERRO SINALIZADO' : 'SINALIZAR INSTABILIDADE'}
          </button>
          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black border uppercase tracking-wider ${statusBg}`} style={{ color: statusColor }}>
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col justify-center">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-wider mb-1">MRR Atual</p>
          <p className={`text-xl font-black tabular-nums tracking-tighter ${mrr === 0 ? 'text-red-400' : 'text-emerald-400'}`}>R${mrr}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center relative group flex flex-col justify-center cursor-help">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-wider mb-1">Prontidão Técnica</p>
          <p className={`text-sm font-black uppercase ${isStructuralGap ? 'text-orange-400' : 'text-sky-400'}`}>
            {isStructuralGap ? 'Instável' : 'Sólida'}
          </p>
          <div className="mt-2 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-current rounded-full" style={{ width: `${structuralReadiness * 100}%`, color: isStructuralGap ? '#f97316' : '#38bdf8' }} />
          </div>
          {/* Tooltip explicativo */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-52 p-4 bg-slate-950 border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 shadow-2xl text-left">
            <p className="text-[10px] text-white/60 leading-relaxed">
              Calculado via <span className="text-white font-bold">Maturidade SGI</span> (Projetos + Processos). Se {'<'} 50% ou com Bloqueio ativo, a IA prioriza <span className="text-orange-400 font-bold">Estabilidade</span> sobre Vendas.
            </p>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-2xl border ${
        isRevenueGap && !isStructuralGap ? 'bg-red-500/5 border-red-500/20' :
        isStructuralGap ? 'bg-orange-500/5 border-orange-500/20' :
        windowOpen ? 'bg-amber-500/5 border-amber-500/20' : 'bg-slate-500/5 border-slate-500/20'
      }`}>
         <p className="text-[11px] font-bold leading-relaxed" style={{ color: statusColor }}>
           {isRevenueGap && !isStructuralGap 
             ? "⚠️ ALERTA CRÍTICO: O produto está maduro (TRL 7 Clínico) e com estrutura estável, mas o faturamento é nulo. Ação comercial imediata requerida!"
             : isStructuralGap
             ? "🛠️ AJUSTE DE RUTA: A fundação operacional e os processos clínicos precisam ser consolidados antes de acelerar aquisição em larga escala."
             : windowOpen 
             ? "🚀 JANELA DE MERCADO: O SEA FISIO atingiu a maturação ideal e o público de fisioterapeutas intensivistas está receptivo. Foco total em tracionar planos pagos."
             : "🏗️ ESTÁGIO DE VALIDAÇÃO: Continue coletando feedbacks clínicos dos fisioterapeutas ativos para otimizar as calculadoras e simulações."}
         </p>
      </div>
    </div>
  )
}


function InnovationHorizonsCard({ state, onReload }: { state?: CockpitData['state']['innovation_horizons']; onReload: () => void }) {
  const h = state ?? { h1: 60, h2: 30, h3: 10 }
  
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-2xl bg-sky-500/10 flex items-center justify-center">
          <Layers className="h-6 w-6 text-sky-400" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight">Três Horizontes de Inovação</h3>
          <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Alocação de Energia e Recursos</p>
        </div>
      </div>

      <div className="space-y-6">
        {[
          { id: 'h1', label: 'Horizonte 1 · core do produto', desc: 'Melhorias nas Calculadoras de UTI e Prontuários (hoje)', val: h.h1, color: '#38bdf8', target: '60%' },
          { id: 'h2', label: 'Horizonte 2 · adjacências de valor', desc: 'Módulos de Escalas de Sedação e Simulações Avançadas (amanhã)', val: h.h2, color: '#a78bfa', target: '30%' },
          { id: 'h3', label: 'Horizonte 3 · disruptivo e futuro', desc: 'Integração de IA Generativa de Diagnóstico e Assistentes por Voz (depois)', val: h.h3, color: '#fbbf24', target: '10%' },
        ].map(item => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-end gap-4">
               <div className="min-w-0">
                 <p className="text-xs font-extrabold text-white/90 truncate uppercase tracking-wider">{item.label}</p>
                 <p className="text-[9px] text-white/40 leading-relaxed">{item.desc}</p>
               </div>
               <div className="text-right shrink-0">
                 <span className="text-base font-black tracking-tight" style={{ color: item.color }}>{item.val}%</span>
                 <p className="text-[8px] text-white/30 uppercase font-bold">Meta: {item.target}</p>
               </div>
            </div>
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${item.val}%` }}
                 className="h-full rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                 style={{ backgroundColor: item.color }}
               />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
         <p className="text-[10px] text-white/40 leading-relaxed italic text-center">
           O equilíbrio 60/30/10 garante que o core clinical (H1) funcione de forma exceptional enquanto pavimentamos o caminho da liderança de mercado (H2/H3).
         </p>
      </div>
    </div>
  )
}

function InnovationFunnelCard({ data, onReload }: { data: CockpitData; onReload: () => void }) {
  const funnel = data.state.innovation_funnel ?? { stage: 1, items: {} }
  const stages = [
    { id: 1, label: 'Ideação', desc: 'Levantamento de Necessidades na UTI' },
    { id: 2, label: 'Triagem', desc: 'Feedback e Usabilidade de Fisios' },
    { id: 3, label: 'Protótipo', desc: 'Desenvolvimento e Teste do Algoritmo' },
    { id: 4, label: 'Validação', desc: 'Homologação com Mentores de UTI' },
    { id: 5, label: 'Escala', desc: 'Publicação no Painel SEA FISIO' },
  ]

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-12 w-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
          <Target className="h-6 w-6 text-sky-400" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight">Funil de Maturidade de Funcionalidades</h3>
          <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Pipelines de Evolução de Ferramentas</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between relative px-2">
        {/* Linha conectora */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-0 hidden lg:block" />
        
        {stages.map((s, idx) => {
          const isCurrent = s.id === funnel.stage
          const isPast = s.id < funnel.stage
          return (
            <div key={s.id} className="relative z-10 flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
               <div className="flex flex-col items-center gap-2">
                 <div className={`h-12 w-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shrink-0 ${
                   isCurrent ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-110' : 
                   isPast ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
                   'bg-white/5 border-white/10 text-white/20'
                 }`}>
                    {isPast ? <CheckSquare className="h-5 w-5" /> : <span className="text-sm font-extrabold">{s.id}</span>}
                 </div>
                 <div className="text-center lg:w-32">
                   <p className={`text-[11px] font-black uppercase tracking-wider ${isCurrent ? 'text-white' : 'text-white/40'}`}>{s.label}</p>
                   <p className="text-[8px] text-white/25 mt-0.5 leading-snug">{s.desc}</p>
                 </div>
               </div>
               {idx < stages.length - 1 && <ChevronRight className="hidden lg:block h-5 w-5 text-white/10 shrink-0" />}
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
    <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Users2 className="h-6 w-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight">Ritmo de Gestão e Liderança</h3>
          <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Ritual e Engajamento da Equipe Fundadora</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { id: 'clarity', label: 'Clareza', sub: 'Visão, Metas e KPIs Clínicos', val: p.clarity, icon: Eye },
          { id: 'alignment', label: 'Alinhamento', sub: '1:1s e Acordos de Operação', val: p.alignment, icon: Network },
          { id: 'training', label: 'Capacitação', sub: 'Treinamento e PDI do Time', val: p.training, icon: Rocket },
          { id: 'execution', label: 'Execução', sub: 'Rituais e Reuniões de Sprints', val: p.execution, icon: Activity },
          { id: 'results', label: 'Resultados', sub: 'Performance e Impacto Real', val: p.results, icon: Trophy },
        ].map(item => (
          <div key={item.id} className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between items-center text-center space-y-4 hover:bg-white/[0.04] transition-all group">
             <div className="p-3 rounded-xl bg-white/5 group-hover:bg-amber-400/10 transition-all">
               <item.icon className={`h-6 w-6 transition-all duration-300 ${item.val > 50 ? 'text-amber-400 scale-110' : 'text-white/20'}`} />
             </div>
             <div>
               <p className="text-xs font-black text-white uppercase tracking-wider">{item.label}</p>
               <p className="text-[9px] text-white/30 leading-snug mt-1">{item.sub}</p>
             </div>
             <div className="w-full space-y-1.5">
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000 rounded-full" style={{ width: `${item.val}%` }} />
               </div>
               <span className="text-[10px] font-black text-amber-400 block">{item.val}%</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FinancialCockpitCard({ cockpit }: { cockpit: CockpitData['cockpit'] }) {
  const { financials, users, engagement } = cockpit
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-slate-950/60 p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <DollarSign className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">Indicadores de Finanças e Tração</h3>
            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Real-time Performance Metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
           <div className="text-left">
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Runway Estimado</p>
              <p className="text-lg font-black text-white tracking-tighter tabular-nums">
                {financials.runway_months === Infinity || financials.runway_months === 0 ? '∞ ilimitado' : `${financials.runway_months} Meses`}
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiBox label="MRR (Mensal)" value={`R$${financials.mrr}`} color={financials.mrr > 0 ? '#34d399' : '#f87171'} icon={TrendingUp} sub="Faturamento Recorrente" />
        <KpiBox label="ARR (Anual)" value={`R$${financials.arr}`} color="#34d399" icon={Globe} sub="Projeção Anualizada" />
        <KpiBox label="Mensalidade" value={`R$${financials.pricing}`} color="#94a3b8" icon={TagIconCustom} sub="Preço de Referência" />
        <KpiBox label="Assinantes Ativos" value={financials.active_subs} color="#38bdf8" icon={Users} sub={`${financials.trial_subs} Contas Teste`} />
        <KpiBox label="Taxa de Churn" value={`${financials.churn_rate_pct}%`} color={financials.churn_rate_pct > 15 ? '#f87171' : '#94a3b8'} icon={Activity} sub="Perda de Assinantes" />
        <KpiBox label="NPS Geral" value={engagement.nps_net === null ? '—' : engagement.nps_net} color={engagement.nps_net !== null && engagement.nps_net >= 50 ? '#34d399' : '#94a3b8'} icon={Heart} sub={`${engagement.feedbacks} Feedbacks`} />
      </div>
    </div>
  )
}

function KpiBox({ label, value, color, icon: Icon, sub }: { label: string; value: string | number; color: string; icon: any; sub?: string }) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between items-center text-center group hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 shadow-md">
      <div className="flex flex-col items-center">
        <div className="p-2.5 rounded-xl bg-white/5 mb-3.5 group-hover:scale-110 transition-all duration-300">
          <Icon className="h-4.5 w-4.5" style={{ color }} />
        </div>
        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black tabular-nums tracking-tight" style={{ color }}>{value}</p>
      </div>
      {sub && <p className="text-[9px] text-white/40 mt-2 font-medium">{sub}</p>}
    </div>
  )
}

function TagIconCustom(props: any) {
  return <DollarSign {...props} />
}

// ───────────────────────────── COMPONENTS FROM OLD FILE (KEEPING LOGIC, UPDATING UI) ─────────────────────────────

function DDDMMaturityCard({ state, onReload }: { state?: CockpitData['state']['maturity_dddm']; onReload: () => void }) {
  const current = state ?? { collection: 1, analysis: 1, visualization: 1, integration: 0 }
  const items = [
    { key: 'collection', label: 'Coleta de Dados', icon: Database, desc: 'Registros clínicos na UTI' },
    { key: 'analysis', label: 'Análise Estruturada', icon: Brain, desc: 'Processamento de fórmulas' },
    { key: 'visualization', label: 'Visualização UI', icon: BarChart3, desc: 'Painéis e telemetria claros' },
    { key: 'integration', label: 'Integração de APIs', icon: Network, desc: 'Supabase Realtime e BD' },
  ] as const

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 shadow-xl">
       <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Database className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">DDDM · Maturidade de Dados</h3>
            <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Data-Driven Decision Making</p>
          </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.key} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/10 transition-all flex flex-col justify-between">
               <div>
                 <div className="flex items-center justify-between mb-1">
                    <item.icon className="h-4.5 w-4.5 text-white/30" />
                    <span className="text-[10px] font-black text-violet-400 bg-violet-400/5 px-2 py-0.5 rounded border border-violet-400/10">Nível {current[item.key]}/3</span>
                 </div>
                 <p className="text-xs font-black text-white/80 uppercase tracking-wide">{item.label}</p>
                 <p className="text-[9px] text-white/40 leading-snug">{item.desc}</p>
               </div>
               <div className="flex gap-1 pt-2">
                  {[1, 2, 3].map(step => (
                    <div key={step} className={`h-1.5 flex-1 rounded-full ${step <= current[item.key] ? 'bg-gradient-to-r from-violet-500 to-indigo-500' : 'bg-white/5'}`} />
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
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 shadow-xl">
       <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Mapeamento de Regulação (LGPD)</h3>
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Segurança de Prontuários e Dados Clínicos</p>
            </div>
          </div>
          <div className="text-right">
             <span className="text-sm font-black text-orange-400 bg-orange-400/5 border border-orange-400/10 px-3 py-1 rounded-xl">
               {Math.round((compliance.score / compliance.max) * 100)}% Coberto
             </span>
          </div>
       </div>

       <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 scrollbar-hide">
          {Object.entries(compliance.items).map(([label, active]) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
               <span className="text-xs font-semibold text-white/80">{label}</span>
               <div className={`h-5 w-5 rounded-lg border flex items-center justify-center shrink-0 ${active ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/10' : 'border-white/10 bg-white/5'}`}>
                 {active && <CheckSquare className="h-3.5 w-3.5" />}
               </div>
            </div>
          ))}
       </div>
    </div>
  )
}

function AdoptionTrailCard({ state, onReload }: { state?: CockpitData['state']['adoption_trail']; onReload: () => void }) {
  const current = state ?? { current_stage: 1, stages: ['Validação Técnica', 'Piloto UTI', 'Multi-centro', 'Escala B2C', 'Venda Hospitalar B2B'] }
  
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 mt-6 shadow-xl">
       <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <MapIcon className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Trilho de Adoção Setorial</h3>
            <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Roadmap de Entrada no Mercado de Fisioterapia</p>
          </div>
       </div>

       <div className="flex flex-col lg:flex-row items-center justify-between relative px-2 gap-6 lg:gap-0">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-0 hidden lg:block" />
          {current.stages.map((label, i) => {
            const isDone = i + 1 < current.current_stage
            const isCurrent = i + 1 === current.current_stage
            return (
              <div key={label} className="relative z-10 flex flex-col items-center gap-3">
                 <div className={`h-11 w-11 rounded-2xl border-2 flex items-center justify-center transition-all duration-700 shrink-0 ${
                   isCurrent ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-110' : 
                   isDone ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
                   'bg-white/5 border-white/10 text-white/20'
                 }`}>
                   {isDone ? <CheckSquare className="h-5 w-5" /> : <span className="text-xs font-black">{i + 1}</span>}
                 </div>
                 <div className="text-center lg:w-32">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${isCurrent ? 'text-white' : 'text-white/30'}`}>{label}</p>
                    {isCurrent && <span className="text-[8px] font-black text-sky-400 uppercase tracking-widest bg-sky-400/5 px-2 py-0.5 rounded border border-sky-400/10 mt-1 inline-block">Ativo</span>}
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
    { key: 'projects', label: 'Projetos de UTI', icon: Briefcase, desc: 'Testes clínicos' },
    { key: 'processes', label: 'Processos Internos', icon: Activity, desc: 'Garantia de qualidade' },
    { key: 'culture', label: 'Cultura Médica', icon: Heart, desc: 'Comunidade engajada' },
    { key: 'results', label: 'Métricas de Resultados', icon: Trophy, desc: 'Conversão e engajamento' },
  ] as const

  const updateLevel = async (key: string, val: number) => {
    setUpdating(key)
    try {
      await fetch('/api/admin/strategy/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'maturity_sgi', value: { ...current, [key]: val } })
      })
      onReload()
    } catch { /* ... */ } finally { setUpdating(null) }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 shadow-xl">
       <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center animate-pulse">
            <Rocket className="h-6 w-6 text-pink-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">Maturidade Operacional</h3>
            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Níveis operacionais reais do SEA FISIO</p>
          </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.key} className={`p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 transition-all flex flex-col justify-between ${updating === item.key ? 'opacity-50 scale-[0.98]' : ''}`}>
               <div>
                 <div className="flex items-center justify-between mb-1">
                    <item.icon className="h-4.5 w-4.5 text-white/30" />
                    <span className="text-[10px] font-black text-pink-400 bg-pink-400/5 px-2 py-0.5 rounded border border-pink-400/10">Maturidade {current[item.key as keyof typeof current]}/3</span>
                 </div>
                 <p className="text-xs font-black text-white/80 uppercase tracking-wide">{item.label}</p>
                 <p className="text-[9px] text-white/40 leading-snug">{item.desc}</p>
               </div>
               <div className="flex gap-1.5 pt-2">
                  {[0, 1, 2, 3].map(step => (
                    <button 
                      key={step} 
                      disabled={updating !== null}
                      onClick={() => updateLevel(item.key, step)}
                      className={`h-2 flex-1 rounded-full transition-all hover:scale-y-125 ${
                        step <= current[item.key as keyof typeof current] 
                          ? 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.3)]' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`} 
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
    <div className="rounded-3xl border border-white/10 bg-slate-900/30 p-6 space-y-4 shadow-xl">
       <div className="flex items-center gap-3">
          <Clock className="h-4.5 w-4.5 text-[#a78bfa]" />
          <h3 className="text-xs font-black text-white/70 uppercase tracking-widest">Sprint Alpha · 21 Dias</h3>
       </div>
       <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 21 }).map((_, i) => {
            const day = i + 1
            const done = s.completed_days.includes(day)
            const current = day === s.current_day
            return (
              <div 
                key={day} 
                className={`h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${
                  done ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 
                  current ? 'bg-gradient-to-br from-violet-500 to-indigo-600 border-violet-400 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)] scale-110' : 
                  'bg-white/5 border-white/10 text-white/30'
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
    <div className="rounded-3xl border border-white/10 bg-slate-900/30 p-6 flex flex-col h-full shadow-xl">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4.5 w-4.5 text-[#a78bfa]" />
          <h4 className="text-xs font-black text-white/80 uppercase tracking-widest">Alertas Estratégicos</h4>
        </div>
        <button onClick={onRun} disabled={loading} className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition text-[#a78bfa] disabled:opacity-30">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 opacity-30 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
             <Shield className="h-10 w-10 text-white/50" />
             <div className="space-y-1">
               <p className="text-xs font-black uppercase tracking-wider text-white">Nenhum Alerta Pendente</p>
               <p className="text-[10px] text-white/50 px-6">O sistema está estável e operando dentro de conformidades normativas.</p>
             </div>
          </div>
        ) : (
          alerts.map(a => (
            <div key={a.id} className="p-4 bg-white/[0.01] border border-white/5 hover:border-[#a78bfa]/35 rounded-2xl flex items-start gap-4 group transition-all duration-300">
              <div className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${a.level === 'warning' ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-extrabold text-white leading-tight mb-1">{a.title}</p>
                <p className="text-[10px] text-white/50 leading-relaxed">{a.message}</p>
              </div>
              <button onClick={() => onDismiss(a.id)} className="opacity-0 group-hover:opacity-100 transition-all text-white/20 hover:text-white shrink-0 p-1 hover:bg-white/5 rounded">✕</button>
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
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 shadow-xl">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Goal className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">OKR Generator Inteligente</h3>
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Alinhamento Estratégico do Próximo Ciclo</p>
            </div>
          </div>
          {!okrs && (
            <button onClick={generate} disabled={loading} className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-widest hover:bg-amber-300 transition-all hover:scale-105 active:scale-95 disabled:opacity-30 shadow-lg shadow-amber-400/10 shrink-0">
              {loading ? 'Processando...' : 'Gerar Proposta OKR'}
            </button>
          )}
       </div>

       {okrs ? (
         <div className="space-y-5">
            {okrs.map((o: any, i: number) => (
               <div key={i} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3">
                     <span className="text-xs font-black text-amber-400 bg-amber-400/5 border border-amber-400/10 px-2 py-0.5 rounded">OBJETIVO {i+1}</span>
                     <p className="text-sm font-bold text-white">{o.objective}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-white/10">
                     {o.key_results.map((kr: string, j: number) => (
                       <div key={j} className="flex gap-2.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400/40 mt-1.5 shrink-0" />
                          <p className="text-xs text-white/60 leading-relaxed">{kr}</p>
                       </div>
                     ))}
                  </div>
               </div>
            ))}
            <button onClick={() => setOkrs(null)} className="text-[9px] font-black text-white/30 uppercase hover:text-white transition-all tracking-widest">Recomeçar Processo</button>
         </div>
       ) : (
         <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01] opacity-50">
            <p className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 px-6">
              A IA analisará a fase atual e proporá Objetivos e Resultados-Chave personalizados para o SEA FISIO.
            </p>
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
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/30 p-6 md:p-8 shadow-xl">
       <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Search className="h-5 w-5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Radar de Parceiros Clínicos e Hospitais</h3>
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Grandes Centros Médicos e Oportunidades Acadêmicas</p>
            </div>
          </div>
          {!data ? (
            <button onClick={() => fetchTargets()} disabled={loading} className="px-5 py-2 rounded-xl border border-sky-500/20 text-sky-400 text-xs font-black uppercase tracking-widest hover:bg-sky-500/10 transition-all disabled:opacity-30 shadow-md">
              {loading ? 'Pesquisando...' : 'Ativar Radar'}
            </button>
          ) : (
            <button onClick={() => fetchTargets(true)} disabled={loading} className="p-2 hover:bg-white/5 border border-white/10 rounded-xl transition text-white/30 hover:text-white">
               <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
       </div>

       {data && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Hospitais de UTI Alvo', 'Centros e Parceiros Acadêmicos', 'Benchmark Setorial'].map((category, idx) => {
              const keys = ['hospitals', 'vcs', 'competitors'] as const
              const items = data[keys[idx]] || []
              return (
                <div key={category} className="space-y-4">
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{category}</p>
                   <div className="space-y-3">
                      {items.map((it: any, i: number) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-sky-500/20 transition-all duration-300 group flex flex-col justify-between h-full">
                           <div>
                             <div className="flex items-center justify-between mb-1.5 gap-2">
                                <p className="text-xs font-extrabold text-white group-hover:text-sky-400 transition-all leading-tight">{it.name}</p>
                                <ExternalLink className="h-3.5 w-3.5 text-white/0 group-hover:text-white/30 transition-all shrink-0" />
                             </div>
                             <p className="text-[10px] text-white/45 leading-relaxed">{it.relevance || it.description}</p>
                           </div>
                        </div>
                      ))}
                      {items.length === 0 && (
                        <p className="text-[10px] text-white/30 italic">Radar buscando novos registros...</p>
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
