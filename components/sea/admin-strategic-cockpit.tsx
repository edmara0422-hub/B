'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Activity, AlertTriangle, BarChart3, Brain, Briefcase, Building2, 
  CheckSquare, Crown, Database, DollarSign, ExternalLink, Eye, 
  FileText, Flag, Gauge, Goal, Heart, Hospital, LayoutGrid, 
  Map as MapIcon, Network, RefreshCw, Rocket, Square, Target, 
  TrendingUp, Trophy, Users, Users2, Zap, Shield, ChevronRight, 
  MessageSquare, Layers, Search, MousePointer2, Clock, Globe
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
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#a78bfa]" />
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#a78bfa] animate-pulse">Sincronizando Cockpit de IA...</p>
    </div>
  )

  if (error && !data) return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center backdrop-blur-xl">
      <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-red-500" />
      <p className="text-[14px] font-bold text-red-400 uppercase tracking-wider">{error}</p>
      <button onClick={fetchData} className="mt-4 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black text-red-500 hover:bg-red-500/20 transition uppercase">Tentar Reconexão</button>
    </div>
  )

  if (!data) return null

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-32 px-4">
      {/* 🚀 HEADER PREMIUM: STATUS DO SISTEMA */}
      <header className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent p-6 backdrop-blur-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap className="h-32 w-32 text-[#a78bfa]" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_20px_rgba(167,139,250,0.3)]">
              <Rocket className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-[20px] font-black text-white tracking-tight">IPB STRATEGIC COCKPIT</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[8px] font-black text-green-500 uppercase">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live Diagnostic
                </span>
                <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">v2.4 Autonomous</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[8px] font-bold text-white/30 uppercase mb-1">Maturidade TRL</p>
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-black text-white">{data.state.trl?.level || 7}</span>
                  <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#a78bfa]" style={{ width: `${((data.state.trl?.level || 7)/9)*100}%` }} />
                  </div>
                </div>
             </div>
             <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[8px] font-bold text-white/30 uppercase mb-1">Fase Atual</p>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#facc15]" />
                  <span className="text-[14px] font-black text-white uppercase tracking-tighter">{data.state.phase?.label || 'Validação'}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8">
           <CompactTrails data={data} />
        </div>
      </header>

      {/* 🧭 NAVEGAÇÃO DE ALTA PERFORMANCE */}
      <nav className="flex gap-2 p-1.5 bg-black/40 border border-white/5 rounded-2xl sticky top-4 z-50 backdrop-blur-3xl shadow-2xl">
        {[
          { id: 'guia', label: 'PLANO DE HOJE', icon: Brain, color: '#a78bfa' },
          { id: 'metricas', label: 'COCKPIT REAL', icon: DollarSign, color: '#4ade80' },
          { id: 'inovacao', label: 'INOVAÇÃO', icon: LayoutGrid, color: '#60a5fa' },
          { id: 'lideranca', label: 'LIDERANÇA', icon: Users2, color: '#facc15' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 rounded-xl text-[11px] font-black transition-all duration-300 relative overflow-hidden ${
              activeTab === tab.id 
                ? 'text-white' 
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute inset-0 z-0 bg-gradient-to-br opacity-20" 
                style={{ backgroundColor: tab.color }}
              />
            )}
            <tab.icon className={`h-4 w-4 relative z-10 ${activeTab === tab.id ? '' : 'opacity-50'}`} style={{ color: activeTab === tab.id ? tab.color : undefined }} />
            <span className="relative z-10 hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 🎭 PALCO DINÂMICO (ABAS) */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'guia' && (
            <motion.div 
              key="guia"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* ALERTA CRÍTICO: FLASH DESIGN */}
              {alerts.filter(a => !a.read && a.level === 'critical').map(alert => (
                <div key={alert.id} className="relative overflow-hidden rounded-3xl bg-red-500/10 border-2 border-red-500/20 p-6 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-500/40 animate-pulse">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[12px] font-black text-red-400 uppercase tracking-[0.2em] mb-2">{alert.title}</h3>
                      <p className="text-[16px] text-white font-medium leading-relaxed">{alert.message}</p>
                      {alert.action && (
                        <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 bg-red-500/20 rounded-xl border border-red-500/30">
                          <Zap className="h-4 w-4 text-red-500" />
                          <span className="text-[13px] font-bold text-white">{alert.action}</span>
                        </div>
                      )}
                    </div>
                    <button onClick={() => dismissAlert(alert.id)} className="p-2 hover:bg-white/10 rounded-full transition text-white/20 hover:text-white">✕</button>
                  </div>
                </div>
              ))}

              {/* IA BRIEFING: THE BRAIN */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#a78bfa15] to-[#8b5cf605] border border-[#a78bfa20] p-8">
                  <div className="absolute -top-12 -right-12 p-8 opacity-5">
                    <Brain className="h-64 w-64 text-[#a78bfa]" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-12 w-12 rounded-2xl bg-[#a78bfa] flex items-center justify-center shadow-xl shadow-[#a78bfa40]">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-[16px] font-black text-white uppercase tracking-tight">AI Strategist Diagnostic</h2>
                        <p className="text-[10px] text-[#a78bfa] uppercase font-black tracking-widest">Processamento Neural Ativo</p>
                      </div>
                    </div>

                    {brief ? (
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                             <MessageSquare className="h-3 w-3 text-[#a78bfa]" />
                             <span className="text-[9px] font-black text-[#a78bfa] uppercase tracking-widest">Pergunta para o Fundador</span>
                          </div>
                          <p className="text-[24px] md:text-[28px] font-bold text-white leading-tight italic tracking-tight">
                            "{brief.question}"
                          </p>
                        </div>
                        
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-2">
                             <Zap className="h-3 w-3 text-[#facc15]" />
                             <span className="text-[9px] font-black text-[#facc15] uppercase tracking-widest">Execução Recomendada</span>
                          </div>
                          <div className="bg-gradient-to-r from-[#a78bfa25] to-transparent border-l-4 border-[#a78bfa] p-6 rounded-r-3xl">
                            <p className="text-[18px] font-black text-white leading-snug">{brief.action}</p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={fetchBrief}
                          disabled={briefLoading}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.05] border border-white/10 text-[11px] font-black text-[#a78bfa] hover:bg-white/10 transition disabled:opacity-30 uppercase tracking-widest"
                        >
                          <RefreshCw className={`h-4 w-4 ${briefLoading ? 'animate-spin' : ''}`} />
                          Atualizar Diagnóstico
                        </button>
                      </div>
                    ) : (
                      <div className="py-20 text-center space-y-6">
                        <p className="text-white/40 text-[12px] uppercase font-bold tracking-widest">Briefing aguardando sincronização</p>
                        <button onClick={fetchBrief} className="px-10 py-4 rounded-full bg-[#a78bfa] text-white font-black text-[12px] uppercase tracking-[0.2em] shadow-2xl shadow-[#a78bfa50] hover:scale-105 transition active:scale-95">
                          Gerar Briefing Estratégico
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <PositionSynthesisCard data={data} />
                  <SprintAlphaCard state={data.state.sprint_alpha} onReload={() => reloadRef.current?.()} />
                </div>
              </div>

              {/* ALERTAS SECUNDÁRIOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AlertsList alerts={alerts.filter(a => !a.read && a.level !== 'critical')} onDismiss={dismissAlert} onRun={runAnalysis} loading={alertsLoading} />
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-center items-center text-center space-y-4">
                  <Shield className="h-10 w-10 text-white/10" />
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Compliance Guard Ativo</p>
                  <p className="text-[12px] text-white/50 px-8">O sistema monitora alterações regulatórias e de mercado 24/7 para proteger o Roadmap.</p>
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
              className="space-y-6"
            >
              <FinancialCockpitCard cockpit={data.cockpit} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DDDMMaturityCard state={data.state.maturity_dddm} onReload={() => reloadRef.current?.()} />
                <ComplianceTrackerCard compliance={data.cockpit.compliance} onReload={() => reloadRef.current?.()} />
              </div>

              <div className="rounded-3xl border border-white/5 bg-black/20 p-8">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-[#60a5fa15] border border-[#60a5fa20] flex items-center justify-center">
                      <Activity className="h-5 w-5 text-[#60a5fa]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Telemetria ao Vivo</h3>
                      <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Dados Reais de Uso do Sistema</p>
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <LeadershipProcessCard state={data.state.leadership_process} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-2">
                    <OKRGeneratorCard />
                 </div>
                 <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <Users className="h-12 w-12 text-[#facc15]" />
                    <h4 className="text-[14px] font-black text-white uppercase tracking-widest">Cultura de Execução</h4>
                    <p className="text-[12px] text-white/40 leading-relaxed">
                      "Estratégia é 1%, Execução é 99%."<br/>
                      Mantenha rituais de 1:1 e rituais de time ativos para escalar.
                    </p>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-[#facc15]" style={{ width: '65%' }} />
                    </div>
                    <span className="text-[10px] font-black text-[#facc15] uppercase">Saúde do Time: 65%</span>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.1em]">Roadmap Empresa</p>
          <span className="text-[11px] font-black text-[#a78bfa]">F{company.current_stage}</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-1000 ${s <= company.current_stage ? 'bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] shadow-[0_0_10px_rgba(167,139,250,0.3)]' : 'bg-white/5'}`} />
          ))}
        </div>
      </div>
      <div className="px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.1em]">Adoção de Mercado</p>
          <span className="text-[11px] font-black text-[#60a5fa]">F{market.current_stage}</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-1000 ${s <= market.current_stage ? 'bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] shadow-[0_0_10px_rgba(96,165,250,0.3)]' : 'bg-white/5'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PositionSynthesisCard({ data }: { data: CockpitData }) {
  const trl = data.state.trl ?? { level: 7, label: 'Produção', max: 9 }
  const hype = data.state.hype_cycle ?? { position: 'encosta_iluminacao', label: 'Encosta da Iluminação', stage_num: 4 }
  const phase = data.state.phase ?? { current: 'validacao', label: 'Validação', goal_users: 10 }
  const maturity = data.state.maturity_sgi ?? { projects: 0, processes: 0, culture: 0, results: 0 }
  const structuralReadiness = (maturity.projects + maturity.processes) / 6 // 0 a 1
  const hasStructuralBlocker = data.state.compliance?.technical_blocker === true
  
  const windowOpen = trl.level >= 7 && (hype.stage_num === 3 || hype.stage_num === 4)
  const isRevenueGap = mrr === 0 && trl.level >= 7
  const isStructuralGap = structuralReadiness < 0.5 || hasStructuralBlocker

  const status = isRevenueGap && !isStructuralGap ? 'ALERTA VENDAS' : isStructuralGap ? 'ESTRUTURA' : windowOpen ? 'OPORTUNIDADE' : 'EVOLUÇÃO'
  const statusColor = isRevenueGap && !isStructuralGap ? '#f87171' : isStructuralGap ? '#fb923c' : windowOpen ? '#facc15' : '#94a3b8'

  const toggleBlocker = async () => {
    try {
      await fetch('/api/admin/strategy/update', {
        method: 'POST',
        body: JSON.stringify({ key: 'compliance', value: { ...data.state.compliance, technical_blocker: !hasStructuralBlocker } })
      })
      fetchData()
    } catch { /* ... */ }
  }

  return (
    <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-white/40" />
          <h3 className="text-[11px] font-black text-white/60 uppercase tracking-widest">SÍNTESE DE POSIÇÃO</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleBlocker}
            className={`px-2 py-0.5 rounded-full text-[8px] font-black border transition-all ${hasStructuralBlocker ? 'bg-orange-500 border-orange-500 text-white' : 'border-white/10 text-white/30'}`}
          >
            {hasStructuralBlocker ? 'BLOQUEIO ATIVO' : 'SINALIZAR ERROS'}
          </button>
          <span className="px-2 py-0.5 rounded-full text-[8px] font-black border" style={{ color: statusColor, borderColor: `${statusColor}40`, backgroundColor: `${statusColor}10` }}>
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
          <p className="text-[8px] font-black text-white/30 uppercase mb-1">MRR Atual</p>
          <p className={`text-[20px] font-black ${mrr === 0 ? 'text-red-500' : 'text-green-500'}`}>R${mrr}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center relative group">
          <p className="text-[8px] font-black text-white/30 uppercase mb-1">Prontidão Técnica</p>
          <p className={`text-[12px] font-black uppercase ${isStructuralGap ? 'text-orange-400' : 'text-blue-400'}`}>
            {isStructuralGap ? 'Instável' : 'Sólida'}
          </p>
          <div className="mt-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-current" style={{ width: `${structuralReadiness * 100}%`, color: isStructuralGap ? '#fb923c' : '#60a5fa' }} />
          </div>
          {/* Tooltip explicativo */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-2xl">
            <p className="text-[9px] text-white/60 leading-relaxed">
              Calculado via <span className="text-white font-bold">Maturidade SGI</span> (Projetos + Processos). Se < 50% ou com Bloqueio ativo, a IA prioriza <span className="text-orange-400 font-bold">Estabilidade</span> sobre Vendas.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl border bg-black/40" style={{ borderColor: `${statusColor}20` }}>
         <p className="text-[12px] font-bold leading-relaxed italic" style={{ color: statusColor }}>
           {isRevenueGap && !isStructuralGap 
             ? "⚠️ ALERTA: TRL 7 atingido com estrutura sólida, mas MRR é zero. Zona de 'Morte por Perfeccionismo'. Comece a vender hoje."
             : isStructuralGap
             ? "🛠️ ESTRUTURA FRÁGIL: TRL alto mas processos/projetos imaturos. Corrija erros críticos e estabilize a fundação antes de escalar vendas."
             : windowOpen 
             ? "🚀 JANELA DE MERCADO ABERTA: O produto está maduro e o mercado receptivo. Foco total em tração comercial."
             : "🏗️ ESTÁGIO DE MATURAÇÃO: Continue validando hipóteses e refinando o produto para o próximo TRL."}
         </p>
      </div>
    </div>
  )
}


function InnovationHorizonsCard({ state, onReload }: { state?: CockpitData['state']['innovation_horizons']; onReload: () => void }) {
  const h = state ?? { h1: 60, h2: 30, h3: 10 }
  
  return (
    <div className="rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Layers className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-[15px] font-black text-white uppercase tracking-tight">3 Horizontes de Inovação</h3>
            <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Alocação de Energia Estratégica</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {[
          { id: 'h1', label: 'H1 · CORE', desc: 'Melhorar o produto atual (hoje)', val: h.h1, color: '#60a5fa', target: '60%' },
          { id: 'h2', label: 'H2 · ADJACENTE', desc: 'Novos mercados/features (amanhã)', val: h.h2, color: '#a78bfa', target: '30%' },
          { id: 'h3', label: 'H3 · DISRUPTIVO', desc: 'Futuro radical (depois de amanhã)', val: h.h3, color: '#facc15', target: '10%' },
        ].map(item => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-end">
               <div>
                 <p className="text-[11px] font-black text-white/80">{item.label}</p>
                 <p className="text-[8px] text-white/40 uppercase font-bold">{item.desc}</p>
               </div>
               <div className="text-right">
                 <span className="text-[14px] font-black" style={{ color: item.color }}>{item.val}%</span>
                 <p className="text-[8px] text-white/20 uppercase font-bold">Ideal: {item.target}</p>
               </div>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${item.val}%` }}
                 className="h-full rounded-full shadow-lg"
                 style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }}
               />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
         <p className="text-[10px] text-white/40 leading-relaxed italic">
           O equilíbrio 60/30/10 garante que você não morra hoje por falta de eficiência, nem morra amanhã por obsolescência.
         </p>
      </div>
    </div>
  )
}

function InnovationFunnelCard({ data, onReload }: { data: CockpitData; onReload: () => void }) {
  const funnel = data.state.innovation_funnel ?? { stage: 1, items: {} }
  const stages = [
    { id: 1, label: 'Ideação', desc: 'Fuzzy Front-End' },
    { id: 2, label: 'Triagem', desc: 'Stage Gate 1' },
    { id: 3, label: 'Protótipo', desc: 'Desenvolvimento' },
    { id: 4, label: 'Decisão', desc: 'Stage Gate 2' },
    { id: 5, label: 'Escala', desc: 'Lançamento' },
  ]

  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-black/20 p-8">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
          <Target className="h-5 w-5 text-orange-500" />
        </div>
        <div>
          <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Funil de Inovação</h3>
          <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Fluxo de Maturidade de Ideias</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative">
        {/* Linha conectora */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-0 hidden md:block" />
        
        {stages.map((s, idx) => {
          const isCurrent = s.id === funnel.stage
          const isPast = s.id < funnel.stage
          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-4 w-full md:w-auto">
               <div className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                 isCurrent ? 'bg-orange-500 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-110' : 
                 isPast ? 'bg-green-500/20 border-green-500/40 text-green-500' : 
                 'bg-white/5 border-white/10 text-white/20'
               }`}>
                  {isPast ? <CheckSquare className="h-5 w-5" /> : <span className="text-[14px] font-black">{s.id}</span>}
               </div>
               <div className="text-center">
                 <p className={`text-[11px] font-black uppercase tracking-widest ${isCurrent ? 'text-white' : 'text-white/40'}`}>{s.label}</p>
                 <p className="text-[8px] text-white/20 uppercase font-bold">{s.desc}</p>
               </div>
               {idx < stages.length - 1 && <ChevronRight className="hidden md:block h-4 w-4 text-white/10" />}
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
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#facc1508] to-transparent p-8">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-12 w-12 rounded-2xl bg-[#facc15] flex items-center justify-center shadow-xl shadow-[#facc1530]">
          <Users2 className="h-6 w-6 text-black" />
        </div>
        <div>
          <h3 className="text-[16px] font-black text-white uppercase tracking-tight">Processo de Liderança</h3>
          <p className="text-[10px] text-[#facc15] uppercase font-black tracking-widest">Motor de Escala Humana</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { id: 'clarity', label: 'Clareza', sub: 'Meta + KPI', val: p.clarity, icon: Eye },
          { id: 'alignment', label: 'Alinhamento', sub: '1:1 + Acordos', val: p.alignment, icon: Network },
          { id: 'training', label: 'Capacitação', sub: 'Habilidade + PDI', val: p.training, icon: Rocket },
          { id: 'execution', label: 'Execução', sub: 'Rituais', val: p.execution, icon: Activity },
          { id: 'results', label: 'Resultado', sub: 'Performance', val: p.results, icon: Trophy },
        ].map(item => (
          <div key={item.id} className="relative p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center space-y-4 hover:bg-white/[0.05] transition group">
             <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-[#facc1520] transition">
               <item.icon className={`h-6 w-6 ${item.val > 50 ? 'text-[#facc15]' : 'text-white/20'}`} />
             </div>
             <div>
               <p className="text-[12px] font-black text-white uppercase tracking-widest">{item.label}</p>
               <p className="text-[8px] text-white/30 uppercase font-bold">{item.sub}</p>
             </div>
             <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-[#facc15] transition-all duration-1000" style={{ width: `${item.val}%` }} />
             </div>
             <span className="text-[10px] font-black text-[#facc15]">{item.val}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FinancialCockpitCard({ cockpit }: { cockpit: CockpitData['cockpit'] }) {
  const { financials, users, engagement } = cockpit
  return (
    <div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-green-500/5 to-transparent p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Cockpit Financeiro</h3>
            <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Real-time Performance Metrics</p>
          </div>
        </div>
        <div className="text-right">
           <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Runway Estimado</p>
           <p className="text-[18px] font-black text-white tracking-tighter">{financials.runway_months === Infinity ? '∞' : `${financials.runway_months} Meses`}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <KpiBox label="MRR" value={`R$${financials.mrr}`} color={financials.mrr > 0 ? '#4ade80' : '#f87171'} icon={TrendingUp} />
        <KpiBox label="ARR" value={`R$${financials.arr}`} color="#4ade80" icon={Globe} />
        <KpiBox label="Price" value={`R$${financials.pricing}`} color="#94a3b8" icon={Tag} />
        <KpiBox label="Active" value={financials.active_subs} color="#60a5fa" icon={Users} />
        <KpiBox label="Churn" value={`${financials.churn_rate_pct}%`} color={financials.churn_rate_pct > 10 ? '#f87171' : '#94a3b8'} icon={Activity} />
        <KpiBox label="NPS" value={engagement.nps_net === null ? '—' : engagement.nps_net.toString()} color={engagement.nps_net !== null && engagement.nps_net > 0 ? '#4ade80' : '#94a3b8'} icon={Heart} />
      </div>
    </div>
  )
}

function KpiBox({ label, value, color, icon: Icon }: { label: string; value: string | number; color: string; icon: any }) {
  return (
    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.05] transition">
      <div className="p-2 rounded-lg bg-white/5 mb-3 group-hover:scale-110 transition">
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-[16px] font-black tabular-nums tracking-tighter" style={{ color }}>{value}</p>
    </div>
  )
}

function Tag(props: any) {
  return <div {...props}><DollarSign /></div>
}

// ───────────────────────────── COMPONENTS FROM OLD FILE (KEEPING LOGIC, UPDATING UI) ─────────────────────────────

function DDDMMaturityCard({ state, onReload }: { state?: CockpitData['state']['maturity_dddm']; onReload: () => void }) {
  const current = state ?? { collection: 1, analysis: 1, visualization: 1, integration: 0 }
  const items = [
    { key: 'collection', label: 'Coleta', icon: Database },
    { key: 'analysis', label: 'Análise', icon: Brain },
    { key: 'visualization', label: 'Visualização', icon: BarChart3 },
    { key: 'integration', label: 'Integração', icon: Network },
  ] as const

  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
       <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Database className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white uppercase tracking-tight">DDDM · Maturidade de Dados</h3>
            <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Data-Driven Decision Making</p>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.key} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
               <div className="flex items-center justify-between">
                  <item.icon className="h-4 w-4 text-white/30" />
                  <span className="text-[10px] font-black text-white">{current[item.key]}/3</span>
               </div>
               <p className="text-[11px] font-black text-white/60 uppercase">{item.label}</p>
               <div className="flex gap-1">
                  {[1, 2, 3].map(step => (
                    <div key={step} className={`h-1.5 flex-1 rounded-full ${step <= current[item.key] ? 'bg-purple-500' : 'bg-white/5'}`} />
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
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Compliance Tracker</h3>
              <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Lei 13.709/2018 (LGPD)</p>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[18px] font-black text-orange-500">{Math.round((compliance.score / compliance.max) * 100)}%</p>
          </div>
       </div>

       <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
          {Object.entries(compliance.items).map(([label, active]) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
               <div className={`h-4 w-4 rounded-md border flex items-center justify-center ${active ? 'bg-green-500 border-green-400' : 'border-white/10'}`}>
                 {active && <CheckSquare className="h-3 w-3 text-white" />}
               </div>
               <span className={`text-[10px] font-bold ${active ? 'text-white/80' : 'text-white/30'}`}>{label}</span>
            </div>
          ))}
       </div>
    </div>
  )
}

function AdoptionTrailCard({ state, onReload }: { state?: CockpitData['state']['adoption_trail']; onReload: () => void }) {
  const current = state ?? { current_stage: 1, stages: ['Validação', 'Piloto', 'Multi-centro', 'Comercial B2C', 'Comercial B2B'] }
  
  return (
    <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent p-8 mt-6">
       <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <MapIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Trilho de Adoção Clínica</h3>
            <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Roadmap de Escala Setorial</p>
          </div>
       </div>

       <div className="flex items-center justify-between relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-0" />
          {current.stages.map((label, i) => {
            const isDone = i + 1 < current.current_stage
            const isCurrent = i + 1 === current.current_stage
            return (
              <div key={label} className="relative z-10 flex flex-col items-center gap-4">
                 <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
                   isCurrent ? 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110' : 
                   isDone ? 'bg-green-500 border-green-400 text-white' : 
                   'bg-white/5 border-white/10 text-white/20'
                 }`}>
                   {isDone ? <CheckSquare className="h-4 w-4" /> : <span className="text-[12px] font-black">{i + 1}</span>}
                 </div>
                 <div className="text-center">
                    <p className={`text-[9px] font-black uppercase tracking-widest ${isCurrent ? 'text-white' : 'text-white/30'}`}>{label}</p>
                    {isCurrent && <span className="text-[7px] font-black text-blue-400 uppercase tracking-widest">Agora</span>}
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
    { key: 'projects', label: 'Projetos', icon: Briefcase },
    { key: 'processes', label: 'Processos', icon: Activity },
    { key: 'culture', label: 'Cultura', icon: Heart },
    { key: 'results', label: 'Resultados', icon: Trophy },
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
    <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
       <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white uppercase tracking-tight">SGI + TD · Maturidade de Execução</h3>
            <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Ajuste os níveis conforme a realidade do campo</p>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.key} className={`p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 transition-all ${updating === item.key ? 'opacity-50 scale-[0.98]' : ''}`}>
               <div className="flex items-center justify-between">
                  <item.icon className="h-4 w-4 text-white/30" />
                  <span className="text-[10px] font-black text-white">{current[item.key as keyof typeof current]}/3</span>
               </div>
               <p className="text-[11px] font-black text-white/60 uppercase">{item.label}</p>
               <div className="flex gap-1">
                  {[0, 1, 2, 3].map(step => (
                    <button 
                      key={step} 
                      disabled={updating !== null}
                      onClick={() => updateLevel(item.key, step)}
                      className={`h-1.5 flex-1 rounded-full transition-all hover:scale-y-150 ${step <= current[item.key as keyof typeof current] ? 'bg-pink-500' : 'bg-white/5'}`} 
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
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
       <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-[#a78bfa]" />
          <h3 className="text-[11px] font-black text-white/60 uppercase tracking-widest">Sprint Alpha · 21 Dias</h3>
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
                  done ? 'bg-green-500/20 border-green-500/40 text-green-500' : 
                  current ? 'bg-[#a78bfa] border-[#a78bfa] text-white shadow-[0_0_10px_rgba(167,139,250,0.5)]' : 
                  'bg-white/5 border-white/10 text-white/20'
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
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Alertas Estratégicos</h4>
        <button onClick={onRun} disabled={loading} className="p-2 hover:bg-white/5 rounded-xl transition text-[#a78bfa] disabled:opacity-30">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2 opacity-20">
             <Shield className="h-10 w-10" />
             <p className="text-[10px] font-black uppercase">Nenhuma Anomalia</p>
          </div>
        ) : (
          alerts.map(a => (
            <div key={a.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-4 group hover:border-[#a78bfa40] transition">
              <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${a.level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
              <div className="flex-1">
                <p className="text-[12px] font-black text-white/90 leading-tight mb-1">{a.title}</p>
                <p className="text-[10px] text-white/40 leading-relaxed">{a.message}</p>
              </div>
              <button onClick={() => onDismiss(a.id)} className="opacity-0 group-hover:opacity-100 transition text-white/20 hover:text-white">✕</button>
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
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Goal className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-[14px] font-black text-white uppercase tracking-tight">OKR Generator · IA</h3>
              <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Alinhamento Estratégico Trimestral</p>
            </div>
          </div>
          {!okrs && (
            <button onClick={generate} disabled={loading} className="px-6 py-2 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition active:scale-95 disabled:opacity-30">
              {loading ? 'Processando...' : 'Gerar OKRs'}
            </button>
          )}
       </div>

       {okrs ? (
         <div className="space-y-6">
            {okrs.map((o: any, i: number) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                 <div className="flex items-center gap-3">
                    <span className="text-[11px] font-black text-blue-400">OBJ {i+1}</span>
                    <p className="text-[14px] font-bold text-white">{o.objective}</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-white/5">
                    {o.key_results.map((kr: string, j: number) => (
                      <div key={j} className="flex gap-2">
                         <div className="h-1.5 w-1.5 rounded-full bg-blue-500/40 mt-1.5 shrink-0" />
                         <p className="text-[11px] text-white/50">{kr}</p>
                      </div>
                    ))}
                 </div>
              </div>
            ))}
            <button onClick={() => setOkrs(null)} className="text-[9px] font-black text-white/20 uppercase hover:text-white transition tracking-widest">Recomeçar Processo</button>
         </div>
       ) : (
         <div className="py-12 text-center opacity-30">
            <p className="text-[11px] uppercase font-bold tracking-[0.2em]">Pressione o botão para a IA propor seus OKRs do trimestre</p>
         </div>
       )}
    </div>
  )
}

function TargetsRadarCard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchTargets = async (refresh = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/strategy/targets${refresh ? '?refresh=1' : ''}`)
      const json = await res.json()
      setData(json)
    } catch { /* ... */ } finally { setLoading(false) }
  }

  return (
    <div className="rounded-3xl border border-white/5 bg-black/20 p-8">
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#facc1515] flex items-center justify-center">
              <Search className="h-5 w-5 text-[#facc15]" />
            </div>
            <div>
              <h3 className="text-[14px] font-black text-white uppercase tracking-tight">Targets Radar · Inteligência</h3>
              <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Hospitais + VCs + Concorrentes</p>
            </div>
          </div>
          {!data ? (
            <button onClick={() => fetchTargets()} disabled={loading} className="px-6 py-2 rounded-full border border-[#facc1520] text-[#facc15] text-[10px] font-black uppercase tracking-widest hover:bg-[#facc1510] transition disabled:opacity-30">
              {loading ? 'Pesquisando...' : 'Ativar Radar'}
            </button>
          ) : (
            <button onClick={() => fetchTargets(true)} disabled={loading} className="p-2 hover:bg-white/5 rounded-xl transition text-white/20">
               <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
       </div>

       {data && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Hospitais Alvo', 'Investidores (VCs)', 'Concorrentes'].map((category, idx) => {
              const keys = ['hospitals', 'vcs', 'competitors'] as const
              const items = data[keys[idx]] || []
              return (
                <div key={category} className="space-y-4">
                   <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{category}</p>
                   <div className="space-y-2">
                      {items.map((it: any, i: number) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#facc1530] transition group">
                           <div className="flex items-center justify-between mb-1">
                              <p className="text-[11px] font-black text-white">{it.name}</p>
                              <ExternalLink className="h-3 w-3 text-white/0 group-hover:text-white/20 transition" />
                           </div>
                           <p className="text-[9px] text-white/40 leading-relaxed">{it.relevance || it.description}</p>
                        </div>
                      ))}
                   </div>
                </div>
              )
            })}
         </div>
       )}
    </div>
  )
}

function TagIcon(props: any) {
  return <DollarSign {...props} />
}
