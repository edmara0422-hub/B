'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity, AlertTriangle, BarChart3, Brain, Briefcase, Building2, CheckSquare, Crown, Database, DollarSign, ExternalLink, Eye, FileText, Flag, Gauge, Goal, Heart, Hospital, LayoutGrid, Map as MapIcon, Network, RefreshCw, Rocket, Square, Target, TrendingUp, Trophy, Users, Users2 } from 'lucide-react'

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
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#a78bfa] border-t-transparent" />
      <p className="text-[10px] uppercase tracking-widest text-white/40">Sincronizando Assistente Estratégico…</p>
    </div>
  )

  if (error && !data) return (
    <div className="rounded-[0.7rem] border border-[#f8717125] bg-[#f8717108] p-4 text-center">
      <AlertTriangle className="mx-auto mb-2 h-6 w-6 text-[#f87171]" />
      <p className="text-[11px] text-[#fca5a5]">{error}</p>
      <button onClick={fetchData} className="mt-3 text-[10px] font-bold text-[#f87171] underline uppercase">Tentar novamente</button>
    </div>
  )

  if (!data) return null

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* HEADER: A Trilha de Progresso (F1-F6) */}
      <div className="ipb-soft rounded-[1rem] p-4 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#a78bfa15] rounded-lg">
              <Rocket className="h-4 w-4 text-[#a78bfa]" />
            </div>
            <div>
              <h2 className="text-[12px] font-bold text-white/90">IPB Strategic Assistant</h2>
              <p className="text-[9px] text-white/40 uppercase tracking-tighter">Automated Innovation Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-bold text-green-500 uppercase">Diagnóstico Ativo</span>
          </div>
        </div>
        
        <CompactTrails data={data} onReload={() => reloadRef.current?.()} />
      </div>

      {/* NAVEGAÇÃO POR ABAS */}
      <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-xl">
        {[
          { id: 'guia', label: 'Plano de Hoje', icon: <Brain className="h-3 w-3" /> },
          { id: 'metricas', label: 'Cockpit Real', icon: <DollarSign className="h-3 w-3" /> },
          { id: 'inovacao', label: 'Inovação', icon: <LayoutGrid className="h-3 w-3" /> },
          { id: 'lideranca', label: 'Liderança', icon: <Users2 className="h-3 w-3" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold transition ${
              activeTab === tab.id ? 'bg-[#a78bfa15] text-[#a78bfa] border border-[#a78bfa20]' : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTEÚDO DINÂMICO */}
      <div className="min-h-[400px]">
        {activeTab === 'guia' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* ALERTA CRÍTICO */}
            {alerts.filter(a => !a.read && a.level === 'critical').map(alert => (
              <div key={alert.id} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-4 items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-[11px] font-bold text-red-400 uppercase tracking-wider">{alert.title}</h3>
                  <p className="text-[13px] text-white/80 mt-1 leading-relaxed">{alert.message}</p>
                  {alert.action && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-red-500 uppercase">Ação Imediata:</span>
                      <p className="text-[11px] text-white font-medium">{alert.action}</p>
                    </div>
                  )}
                </div>
                <button onClick={() => dismissAlert(alert.id)} className="text-white/20 hover:text-white/40">✕</button>
              </div>
            ))}

            {/* ASSISTENTE: Briefing Principal */}
            <div className="bg-gradient-to-br from-[#a78bfa08] to-transparent border border-[#a78bfa15] rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Brain className="h-32 w-32" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#a78bfa] flex items-center justify-center shadow-lg shadow-[#a78bfa30]">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-white">IA Strategist Diagnostic</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Passo a Passo Automático</p>
                  </div>
                </div>

                {brief ? (
                  <div className="space-y-4">
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                      <p className="text-[10px] text-[#a78bfa] uppercase font-bold mb-2">Pergunta para o Fundador:</p>
                      <p className="text-[16px] font-medium text-white leading-relaxed italic">"{brief.question}"</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[10px] text-white/40 uppercase font-bold px-1">Seu Próximo Passo Hoje:</p>
                      <div className="bg-gradient-to-r from-[#a78bfa20] to-transparent border-l-4 border-[#a78bfa] p-4 rounded-r-2xl">
                        <p className="text-[14px] font-bold text-white leading-snug">{brief.action}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={fetchBrief}
                      disabled={briefLoading}
                      className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#a78bfa] hover:opacity-80 transition disabled:opacity-30"
                    >
                      <RefreshCw className={`h-3 w-3 ${briefLoading ? 'animate-spin' : ''}`} />
                      ATUALIZAR DIAGNÓSTICO
                    </button>
                  </div>
                ) : (
                  <button onClick={fetchBrief} className="w-full py-4 rounded-2xl bg-[#a78bfa] text-white font-bold text-[12px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition">
                    Gerar Briefing de Hoje
                  </button>
                )}
              </div>
            </div>

            {/* SÍNTESE DE POSIÇÃO (TRL + HYPE) */}
            <PositionSynthesisCard data={data} />
            
            {/* ALERTAS SECUNDÁRIOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SprintAlphaCard state={data.state.sprint_alpha} onReload={() => reloadRef.current?.()} />
              <AlertsList alerts={alerts.filter(a => !a.read && a.level !== 'critical')} onDismiss={dismissAlert} onRun={runAnalysis} loading={alertsLoading} />
            </div>
          </div>
        )}

        {activeTab === 'metricas' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <FinancialCockpitCard cockpit={data.cockpit} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DDDMMaturityCard state={data.state.maturity_dddm} onReload={() => reloadRef.current?.()} />
              <ComplianceTrackerCard compliance={data.cockpit.compliance} onReload={() => reloadRef.current?.()} />
            </div>
            <AdoptionTrailCard state={data.state.adoption_trail} onReload={() => reloadRef.current?.()} />
          </div>
        )}

        {activeTab === 'inovacao' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <InnovationFunnelCard data={data} onReload={() => reloadRef.current?.()} />
            <TargetsRadarCard />
            <MaturityExecutionCard state={data.state.maturity_sgi} onReload={() => reloadRef.current?.()} />
          </div>
        )}

        {activeTab === 'lideranca' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <LeadershipProcessCard state={data.state.leadership_process} onReload={() => reloadRef.current?.()} />
            <OKRGeneratorCard />
          </div>
        )}
      </div>
    </div>
  )
}

// ───────────────────────────── COMPONENTES AUXILIARES ─────────────────────────────

function CompactTrails({ data, onReload }: { data: CockpitData; onReload: () => void }) {
  const company = data.state.company_trail ?? { current_stage: 2 }
  const market = data.state.market_trail ?? { current_stage: 2 }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <p className="text-[8px] font-bold text-white/30 uppercase w-12 shrink-0">Empresa</p>
        <div className="flex flex-1 gap-1">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= company.current_stage ? 'bg-[#a78bfa]' : 'bg-white/5'}`} />
          ))}
        </div>
        <p className="text-[10px] font-bold text-[#a78bfa] w-6 text-right">F{company.current_stage}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-[8px] font-bold text-white/30 uppercase w-12 shrink-0">Mercado</p>
        <div className="flex flex-1 gap-1">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= market.current_stage ? 'bg-[#60a5fa]' : 'bg-white/5'}`} />
          ))}
        </div>
        <p className="text-[10px] font-bold text-[#60a5fa] w-6 text-right">F{market.current_stage}</p>
      </div>
    </div>
  )
}

function AlertsList({ alerts, onDismiss, onRun, loading }: { alerts: StrategicAlert[], onDismiss: (id: string) => void, onRun: () => void, loading: boolean }) {
  return (
    <div className="ipb-soft rounded-[1.5rem] p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Alertas Secundários</h4>
        <button onClick={onRun} disabled={loading} className="p-1.5 hover:bg-white/5 rounded-lg transition text-white/40 hover:text-white">
          <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto max-h-[150px] pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <p className="text-[9px] text-white/20 italic text-center py-8">Nenhum alerta pendente</p>
        ) : (
          alerts.map(a => (
            <div key={a.id} className="p-2 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-2 group">
              <div className={`h-1.5 w-1.5 rounded-full mt-1.5 ${a.level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-white/80 leading-tight">{a.title}</p>
              </div>
              <button onClick={() => onDismiss(a.id)} className="opacity-0 group-hover:opacity-100 transition text-white/20 hover:text-white/60">✕</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ───────────────────────────── ALERTS PANEL ─────────────────────────────

function AlertsPanel({
  alerts, loading, onRun, onDismiss
}: {
  alerts: StrategicAlert[]
  loading: boolean
  onRun: () => void
  onDismiss: (id: string) => void
}) {
  const unread = alerts.filter((a) => !a.read)
  const levelColor = (level: StrategicAlert['level']) =>
    level === 'critical' ? '#f87171' : level === 'warning' ? '#facc15' : '#60a5fa'
  const levelBg = (level: StrategicAlert['level']) =>
    level === 'critical' ? 'rgba(248,113,113,0.06)' : level === 'warning' ? 'rgba(250,204,21,0.06)' : 'rgba(96,165,250,0.06)'

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3 text-[#f87171]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Alertas Estratégicos</p>
          {unread.length > 0 && (
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#f87171] text-[7px] font-bold text-white">
              {unread.length}
            </span>
          )}
        </div>
        <button
          onClick={onRun}
          disabled={loading}
          className="flex h-5 items-center gap-1 rounded-[0.4rem] border border-white/10 bg-white/[0.04] px-1.5 text-[8px] text-white/55 hover:text-white disabled:opacity-30"
        >
          <RefreshCw className={`h-2.5 w-2.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Analisando…' : 'Analisar Agora'}
        </button>
      </div>

      {unread.length === 0 && (
        <p className="text-[9px] text-white/35">
          {alerts.length > 0 ? '✅ Todos os alertas foram revisados.' : 'Clique em "Analisar Agora" para o agente verificar seus dados.'}
        </p>
      )}

      <div className="space-y-1.5">
        {unread.map((alert) => (
          <div
            key={alert.id}
            className="rounded-[0.4rem] border px-2 py-1.5"
            style={{ borderColor: `${levelColor(alert.level)}30`, background: levelBg(alert.level) }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-[9px] font-bold" style={{ color: levelColor(alert.level) }}>{alert.title}</p>
                <p className="text-[8.5px] text-white/65 mt-0.5">{alert.message}</p>
                {alert.action && (
                  <p className="text-[8px] text-white/45 mt-0.5">✅ {alert.action}</p>
                )}
              </div>
              <button
                onClick={() => onDismiss(alert.id)}
                className="mt-0.5 shrink-0 text-[7px] text-white/25 hover:text-white/60"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ───────────────────────────── DAILY BRIEF CARD ─────────────────────────────

function DailyBriefCard({ brief, onRefresh }: { brief: { question: string; action: string }; onRefresh: () => void }) {
  return (
    <div className="rounded-[0.7rem] border border-[#a78bfa30] bg-[#a78bfa08] p-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Brain className="h-3 w-3 text-[#a78bfa]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Pergunta do Dia · IA Cockpit</p>
        </div>
        <button
          onClick={onRefresh}
          className="flex h-5 items-center gap-1 rounded-[0.4rem] border border-white/10 bg-white/[0.04] px-1.5 text-[8px] text-white/55 hover:text-white"
        >
          <RefreshCw className="h-2.5 w-2.5" />
          Atualizar
        </button>
      </div>
      <p className="text-[10px] font-semibold text-white/85 mb-1">❓ {brief.question}</p>
      <p className="text-[9px] text-white/55">💡 Ação: {brief.action}</p>
    </div>
  )
}

// ───────────────────────────── POSITION SYNTHESIS ─────────────────────────────

function PositionSynthesisCard({ data }: { data: CockpitData }) {
  const trl = data.state.trl ?? { level: 7, label: 'Produção', max: 9 }
  const hype = data.state.hype_cycle ?? { position: 'encosta_iluminacao', label: 'Encosta da Iluminação', stage_num: 4 }
  const phase = data.state.phase ?? { current: 'validacao', label: 'Validação', goal_users: 10 }
  const mrr = data.cockpit.financials.mrr

  const windowOpen = trl.level >= 7 && (hype.stage_num === 3 || hype.stage_num === 4)
  const dangerSignal = mrr === 0 && trl.level >= 7
  const synthesis = dangerSignal
    ? 'Produto em TRL 7 mas MRR R$0 — morte por perfeccionismo. Pare de construir, comece a vender.'
    : windowOpen
    ? 'Janela aberta — produto pronto + mercado disposto. Foco máximo em aquisição.'
    : 'Continue construindo, validando hipóteses antes de escalar.'

  const synthColor = dangerSignal ? '#f87171' : windowOpen ? '#facc15' : '#94a3b8'

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center gap-1.5">
        <Gauge className="h-3 w-3 text-[#a78bfa]" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Posição síntese · diagnóstico</p>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <div className="ipb-soft rounded-[0.5rem] p-2 text-center">
          <p className="text-[7px] uppercase tracking-[0.14em] text-white/35">TRL</p>
          <p className="text-[16px] font-bold tabular-nums text-white/90">{trl.level}<span className="text-[10px] text-white/35">/{trl.max}</span></p>
          <p className="text-[7px] text-white/45">{trl.label}</p>
        </div>
        <div className="ipb-soft rounded-[0.5rem] p-2 text-center">
          <p className="text-[7px] uppercase tracking-[0.14em] text-white/35">Hype Cycle</p>
          <p className="text-[10px] font-bold text-white/90 leading-tight">{hype.label.split(' ')[0]}</p>
          <p className="text-[7px] text-white/45">{hype.label.split(' ').slice(1).join(' ')}</p>
        </div>
        <div className="ipb-soft rounded-[0.5rem] p-2 text-center">
          <p className="text-[7px] uppercase tracking-[0.14em] text-white/35">MRR</p>
          <p className={`text-[16px] font-bold tabular-nums ${mrr === 0 ? 'text-[#f87171]' : 'text-[#4ade80]'}`}>R${mrr}</p>
          <p className="text-[7px] text-white/45">{phase.label}</p>
        </div>
      </div>

      <div
        className="mt-2 rounded-[0.5rem] border px-2.5 py-1.5"
        style={{ borderColor: `${synthColor}40`, background: `${synthColor}10` }}
      >
        <p className="text-[10px] font-semibold leading-snug" style={{ color: synthColor }}>{synthesis}</p>
      </div>
    </div>
  )
}

// ───────────────────────────── FINANCIAL COCKPIT ─────────────────────────────

function FinancialCockpitCard({ cockpit }: { cockpit: CockpitData['cockpit'] }) {
  const { financials, users, engagement } = cockpit
  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center gap-1.5">
        <DollarSign className="h-3 w-3 text-[#4ade80]" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Cockpit Financeiro · ao vivo</p>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        <KpiBox label="MRR" value={`R$${financials.mrr}`} color={financials.mrr > 0 ? '#4ade80' : '#f87171'} />
        <KpiBox label="ARR" value={`R$${financials.arr}`} color="#4ade80" />
        <KpiBox label="Pricing" value={`R$${financials.pricing}`} color="#94a3b8" />
        <KpiBox label="Ativos" value={financials.active_subs} color="#60a5fa" />
        <KpiBox label="Trial" value={financials.trial_subs} color="#facc15" />
        <KpiBox label="Cancel." value={financials.cancelled_subs} color="#fb923c" />
        <KpiBox label="Churn" value={`${financials.churn_rate_pct}%`} color={financials.churn_rate_pct > 10 ? '#f87171' : '#94a3b8'} />
        <KpiBox label="Users" value={users.total} color="#a78bfa" />
        <KpiBox label="DAU 7d" value={`${users.dau7d_pct}%`} color="#60a5fa" />
        <KpiBox label="DAU 30d" value={`${users.dau30d_pct}%`} color="#60a5fa" />
        <KpiBox label="Eventos" value={engagement.events_30d} color="#a78bfa" />
        <KpiBox label="NPS" value={engagement.nps_net === null ? '—' : engagement.nps_net.toString()} color={engagement.nps_net !== null && engagement.nps_net > 0 ? '#4ade80' : '#94a3b8'} />
      </div>
    </div>
  )
}

function KpiBox({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="ipb-soft rounded-[0.4rem] px-1.5 py-1 text-center">
      <p className="text-[7px] uppercase tracking-[0.10em] text-white/35">{label}</p>
      <p className="text-[11px] font-bold tabular-nums" style={{ color }}>{value}</p>
    </div>
  )
}

// ───────────────────────────── ADOPTION TRAIL ─────────────────────────────

// ───────────────────────────── COMPANY & MARKET TRAILS ─────────────────────────────

const TRAIL_STAGES = [
  'F1 · Infra',
  'F2 · Processo',
  'F3 · Estratégia',
  'F4 · Digitização',
  'F5 · Digitalização',
  'F6 · Transformação'
]

function CompanyMarketTrailsCard({ data, onReload }: { data: CockpitData; onReload: () => void }) {
  const company = data.state.company_trail ?? { current_stage: 2, stages: TRAIL_STAGES }
  const market = data.state.market_trail ?? { current_stage: 2, stages: TRAIL_STAGES }

  const updateTrail = async (key: 'company_trail' | 'market_trail', newStage: number) => {
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: { current_stage: newStage, stages: TRAIL_STAGES } }),
    })
    onReload()
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5 space-y-4">
      <TrailRow label="Trilho da Empresa" current={company.current_stage} onSelect={(s) => updateTrail('company_trail', s)} icon={<Building2 className="h-3 w-3 text-[#a78bfa]" />} />
      <TrailRow label="Trilho do Mercado" current={market.current_stage} onSelect={(s) => updateTrail('market_trail', s)} icon={<LayoutGrid className="h-3 w-3 text-[#60a5fa]" />} />
    </div>
  )
}

function TrailRow({ label, current, onSelect, icon }: { label: string; current: number; onSelect: (s: number) => void; icon: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5">
        {icon}
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">{label}</p>
      </div>
      <div className="flex items-center gap-1">
        {TRAIL_STAGES.map((stage, i) => {
          const stageNum = i + 1
          const isDone = stageNum < current
          const isCurrent = stageNum === current
          return (
            <button
              key={stage}
              onClick={() => onSelect(stageNum)}
              className="group flex flex-1 flex-col items-center gap-1"
            >
              <div
                className="flex h-6 w-full items-center justify-center rounded-[0.3rem] border text-[8px] font-bold transition"
                style={{
                  borderColor: isDone ? 'rgba(74,222,128,0.4)' : isCurrent ? 'rgba(250,204,21,0.4)' : 'rgba(255,255,255,0.1)',
                  background: isDone ? 'rgba(74,222,128,0.1)' : isCurrent ? 'rgba(250,204,21,0.1)' : 'rgba(255,255,255,0.02)',
                  color: isDone ? '#86efac' : isCurrent ? '#fde68a' : 'rgba(255,255,255,0.3)',
                }}
              >
                F{stageNum}
              </div>
              <p className="text-center text-[6px] leading-tight text-white/40">{stage.split(' · ')[1]}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────────── MATURITY MATRICES (SGI & DDDM) ─────────────────────────────

function MaturityExecutionCard({ state, onReload }: { state?: CockpitData['state']['maturity_sgi']; onReload: () => void }) {
  const current = state ?? { projects: 1, processes: 1, culture: 0, results: 1 }
  const items = [
    { key: 'projects', label: 'Projetos', icon: <Briefcase className="h-2.5 w-2.5" /> },
    { key: 'processes', label: 'Processos', icon: <Activity className="h-2.5 w-2.5" /> },
    { key: 'culture', label: 'Cultura', icon: <Heart className="h-2.5 w-2.5" /> },
    { key: 'results', label: 'Resultados', icon: <TrendingUp className="h-2.5 w-2.5" /> }
  ]

  const update = async (key: string, val: number) => {
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'maturity_sgi', value: { ...current, [key]: val } }),
    })
    onReload()
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center gap-1.5">
        <Target className="h-3 w-3 text-[#fb923c]" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">SGI + TD · Maturidade de Execução</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {items.map(it => (
          <MaturityRow key={it.key} label={it.label} icon={it.icon} value={current[it.key as keyof typeof current]} onSelect={(v) => update(it.key, v)} />
        ))}
      </div>
    </div>
  )
}

function DDDMMaturityCard({ state, onReload }: { state?: CockpitData['state']['maturity_dddm']; onReload: () => void }) {
  const current = state ?? { collection: 2, analysis: 1, visualization: 2, integration: 1 }
  const items = [
    { key: 'collection', label: 'Coleta', icon: <Database className="h-2.5 w-2.5" /> },
    { key: 'analysis', label: 'Análise', icon: <Brain className="h-2.5 w-2.5" /> },
    { key: 'visualization', label: 'Visualização', icon: <BarChart3 className="h-2.5 w-2.5" /> },
    { key: 'integration', label: 'Integração', icon: <Network className="h-2.5 w-2.5" /> }
  ]

  const update = async (key: string, val: number) => {
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'maturity_dddm', value: { ...current, [key]: val } }),
    })
    onReload()
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center gap-1.5">
        <Database className="h-3 w-3 text-[#60a5fa]" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">DDDM · Decisão Baseada em Dados</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {items.map(it => (
          <MaturityRow key={it.key} label={it.label} icon={it.icon} value={current[it.key as keyof typeof current]} onSelect={(v) => update(it.key, v)} />
        ))}
      </div>
    </div>
  )
}

function MaturityRow({ label, icon, value, onSelect }: { label: string; icon: React.ReactNode; value: number; onSelect: (v: number) => void }) {
  const levels = ['Não iniciado', 'Em desenvolvimento', 'Implementado', 'Otimizado']
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 w-20">
        <div className="text-white/40">{icon}</div>
        <p className="text-[8px] font-semibold text-white/60">{label}</p>
      </div>
      <div className="flex flex-1 gap-1">
        {levels.map((lvl, i) => (
          <button
            key={lvl}
            onClick={() => onSelect(i)}
            className={`h-4 flex-1 rounded-[0.2rem] border text-[6px] font-bold transition flex items-center justify-center`}
            style={{
              borderColor: i <= value ? (i === 3 ? '#4ade8050' : i === 2 ? '#60a5fa50' : i === 1 ? '#facc1550' : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.05)',
              background: i <= value ? (i === 3 ? '#4ade8015' : i === 2 ? '#60a5fa15' : i === 1 ? '#facc1515' : 'rgba(255,255,255,0.02)') : 'transparent',
              color: i <= value ? (i === 3 ? '#86efac' : i === 2 ? '#93c5fd' : i === 1 ? '#fde68a' : 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.15)',
            }}
          >
            {i}
          </button>
        ))}
      </div>
      <p className="text-[7px] text-white/30 w-24 text-right truncate">{levels[value]}</p>
    </div>
  )
}

// ───────────────────────────── GESTÃO DE INOVAÇÃO (HORIZONTES + FUNIL) ─────────────────────────────

function InnovationFunnelCard({ data, onReload }: { data: CockpitData; onReload: () => void }) {
  const funnel = data.state.innovation_funnel ?? { stage: 3, items: { ffe: true, sg1: true, dev: true, sg2: false, scale: false } }
  const horizons = data.state.innovation_horizons ?? { h1: 60, h2: 30, h3: 10 }

  const updateHorizons = async (h1: number, h2: number, h3: number) => {
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'innovation_horizons', value: { h1, h2, h3 } }),
    })
    onReload()
  }

  const toggleFunnel = async (key: string) => {
    const newItems = { ...funnel.items, [key]: !funnel.items[key] }
    const stage = Object.values(newItems).filter(Boolean).length
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'innovation_funnel', value: { stage, items: newItems } }),
    })
    onReload()
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5 space-y-4">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <LayoutGrid className="h-3 w-3 text-[#facc15]" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">3 Horizontes de Inovação</p>
          </div>
          <div className="flex gap-1">
            <button onClick={() => updateHorizons(60, 30, 10)} className="text-[7px] text-white/30 hover:text-white/50 px-1 border border-white/10 rounded">Padrão</button>
            <button onClick={() => updateHorizons(70, 20, 10)} className="text-[7px] text-white/30 hover:text-white/50 px-1 border border-white/10 rounded">Eficiente</button>
          </div>
        </div>
        <div className="flex h-3 gap-0.5 overflow-hidden rounded-full bg-white/5 mb-1.5">
          <div className="h-full bg-[#4ade80] opacity-60" style={{ width: `${horizons.h1}%` }} />
          <div className="h-full bg-[#60a5fa] opacity-60" style={{ width: `${horizons.h2}%` }} />
          <div className="h-full bg-[#a78bfa] opacity-60" style={{ width: `${horizons.h3}%` }} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <HorizonInfo label="H1 Core" val={horizons.h1} color="#4ade80" />
          <HorizonInfo label="H2 Adjacente" val={horizons.h2} color="#60a5fa" />
          <HorizonInfo label="H3 Disruptivo" val={horizons.h3} color="#a78bfa" />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-1.5">
          <Rocket className="h-3 w-3 text-[#fb923c]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Funil de Inovação</p>
        </div>
        <div className="space-y-0.5">
          {[
            { key: 'ffe', label: '1. Fuzzy Front-End (Ideias)' },
            { key: 'sg1', label: '2. Stage Gate 1 (Triagem)' },
            { key: 'dev', label: '3. Desenvolvimento (Prototipagem)' },
            { key: 'sg2', label: '4. Stage Gate 2 (Decisão Final)' },
            { key: 'scale', label: '5. Lançamento e Escala' }
          ].map((it) => (
            <button
              key={it.key}
              onClick={() => toggleFunnel(it.key)}
              className="flex w-full items-center gap-2 rounded-[0.3rem] border border-white/6 bg-white/[0.01] px-2 py-1 text-left hover:bg-white/[0.03]"
            >
              {funnel.items[it.key as keyof typeof funnel.items] ? <CheckSquare className="h-3 w-3 text-[#4ade80]" /> : <Square className="h-3 w-3 text-white/20" />}
              <p className={`text-[8px] font-semibold ${funnel.items[it.key as keyof typeof funnel.items] ? 'text-white/80' : 'text-white/40'}`}>{it.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function HorizonInfo({ label, val, color }: { label: string; val: number; color: string }) {
  return (
    <div className="text-center">
      <p className="text-[7px] uppercase tracking-wider text-white/40 mb-0.5">{label}</p>
      <p className="text-[10px] font-bold" style={{ color }}>{val}%</p>
    </div>
  )
}

// ───────────────────────────── PROCESSO DE LIDERANÇA ─────────────────────────────

function LeadershipProcessCard({ state, onReload }: { state?: CockpitData['state']['leadership_process']; onReload: () => void }) {
  const current = state ?? { clarity: 0, alignment: 0, training: 0, execution: 0, results: 0 }
  const items = [
    { key: 'clarity', label: 'Clareza (Meta + KPI)' },
    { key: 'alignment', label: 'Alinhamento (1:1 + Acordos)' },
    { key: 'training', label: 'Capacitação (Habilidade + PDI)' },
    { key: 'execution', label: 'Execução (Rituais de Time)' },
    { key: 'results', label: 'Resultado (Performance + Reconhecimento)' }
  ]

  const update = async (key: string, val: number) => {
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'leadership_process', value: { ...current, [key]: val } }),
    })
    onReload()
  }

  const score = Object.values(current).reduce((a, b) => a + b, 0)
  const totalScore = (score / 15) * 100

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Users2 className="h-3 w-3 text-[#a78bfa]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Processo de Liderança</p>
        </div>
        <p className="text-[10px] font-bold" style={{ color: totalScore >= 70 ? '#4ade80' : totalScore >= 40 ? '#facc15' : '#f87171' }}>{Math.round(totalScore)}/100</p>
      </div>
      <div className="space-y-2">
        {items.map(it => (
          <div key={it.key} className="space-y-1">
            <div className="flex justify-between items-center">
              <p className="text-[8px] text-white/50">{it.label}</p>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map(v => (
                  <button
                    key={v}
                    onClick={() => update(it.key, v)}
                    className={`h-2.5 w-4 rounded-[0.15rem] border transition ${current[it.key as keyof typeof current] === v ? 'border-white/40 bg-white/20' : 'border-white/5 bg-white/5'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdoptionTrailCard({ state, onReload }: { state?: CockpitData['state']['adoption_trail']; onReload: () => void }) {
  const stages = state?.stages ?? ['Validação', 'Piloto Hospitalar', 'Multi-centro', 'Comercial B2C', 'Comercial B2B']
  const current = state?.current_stage ?? 1

  const updateStage = async (newStage: number) => {
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'adoption_trail', value: { current_stage: newStage, stages } }),
    })
    onReload()
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center gap-1.5">
        <Hospital className="h-3 w-3 text-[#60a5fa]" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Trilho de Adoção Clínica</p>
      </div>

      <div className="flex items-center gap-1">
        {stages.map((stage, i) => {
          const stageNum = i + 1
          const isDone = stageNum < current
          const isCurrent = stageNum === current
          return (
            <button
              key={stage}
              onClick={() => updateStage(stageNum)}
              className="group flex flex-1 flex-col items-center gap-1"
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold transition"
                style={{
                  borderColor: isDone ? 'rgba(74,222,128,0.6)' : isCurrent ? 'rgba(250,204,21,0.6)' : 'rgba(255,255,255,0.15)',
                  background: isDone ? 'rgba(74,222,128,0.15)' : isCurrent ? 'rgba(250,204,21,0.15)' : 'rgba(255,255,255,0.04)',
                  color: isDone ? '#86efac' : isCurrent ? '#fde68a' : 'rgba(255,255,255,0.45)',
                }}
              >
                {stageNum}
              </div>
              <p className="text-center text-[7px] leading-tight text-white/55">{stage}</p>
              {isCurrent && <span className="rounded-full bg-[#facc1520] px-1 text-[6px] uppercase text-[#fde68a]">AGORA</span>}
            </button>
          )
        })}
      </div>
      <p className="mt-1 text-[7px] text-white/30">Clique no estágio pra atualizar</p>
    </div>
  )
}

// ───────────────────────────── SPRINT ALPHA 7 DIAS ─────────────────────────────

const SPRINT_DAYS = [
  { day: 1, title: 'Lista de Alvos', desc: 'Identifique 20 fisioterapeutas/hospitais alvo no LinkedIn' },
  { day: 2, title: 'Convite Beta', desc: 'Mande pitch curto: "preciso de olhar crítico antes de lançar"' },
  { day: 3, title: 'Demo de Stress', desc: 'Mostre o app — objetivo: ver se entendem o valor clínico' },
  { day: 4, title: 'Coleta de Atrito', desc: 'Anote onde travou. UX falhou se não entenderam' },
  { day: 5, title: '"Sim Hipotético"', desc: '"R$X/mês, assinaria?" — valida disposição a pagar' },
  { day: 6, title: 'Ajuste de Rota', desc: 'Priorize código com base no feedback real' },
  { day: 7, title: 'Documentação', desc: 'Atualize OKRs/Roadmap com o que ouviu' },
]

function SprintAlphaCard({ state, onReload }: { state?: CockpitData['state']['sprint_alpha']; onReload: () => void }) {
  const completed = state?.completed_days ?? []

  const toggleDay = async (day: number) => {
    const newCompleted = completed.includes(day) ? completed.filter((d) => d !== day) : [...completed, day]
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'sprint_alpha', value: { ...state, completed_days: newCompleted, current_day: Math.max(...newCompleted, 0) + 1 } }),
    })
    onReload()
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Rocket className="h-3 w-3 text-[#fb923c]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Sprint Validação Alpha</p>
        </div>
        <p className="text-[8px] text-white/40">{completed.length}/7 dias</p>
      </div>

      <div className="space-y-1">
        {SPRINT_DAYS.map((d) => {
          const isDone = completed.includes(d.day)
          return (
            <button
              key={d.day}
              onClick={() => toggleDay(d.day)}
              className="flex w-full items-start gap-2 rounded-[0.4rem] border border-white/8 bg-white/[0.02] px-2 py-1.5 text-left transition hover:bg-white/[0.04]"
            >
              {isDone
                ? <CheckSquare className="mt-0.5 h-3 w-3 shrink-0 text-[#4ade80]" />
                : <Square className="mt-0.5 h-3 w-3 shrink-0 text-white/35" />
              }
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                  <span>Dia {d.day}</span>
                  <span className="text-white/75">·</span>
                  <span className="normal-case tracking-normal text-white/85">{d.title}</span>
                </p>
                <p className={`text-[9px] leading-snug ${isDone ? 'text-white/40 line-through' : 'text-white/65'}`}>
                  {d.desc}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────────── COMPLIANCE TRACKER ─────────────────────────────

const COMPLIANCE_ITEMS = [
  { key: 'lgpd', label: 'Política LGPD publicada', hint: 'Documento de conformidade Lei 13.709/2018' },
  { key: 'privacy', label: 'Política de Privacidade no site', hint: '/privacidade publicado' },
  { key: 'terms', label: 'Termos de Uso publicados', hint: '/termos publicado' },
  { key: 'cookies', label: 'Política de Cookies', hint: 'Banner + texto explicativo' },
  { key: 'dpo', label: 'DPO designado', hint: 'Encarregado de proteção de dados nomeado' },
  { key: 'canal_denuncias', label: 'Canal de denúncias ativo', hint: 'Formulário anônimo no app' },
]

function ComplianceTrackerCard({ compliance, onReload }: { compliance: Compliance; onReload: () => void }) {
  const pct = compliance.max > 0 ? Math.round((compliance.score / compliance.max) * 100) : 0

  const toggleItem = async (key: string) => {
    const newItems = { ...compliance.items, [key]: !compliance.items[key] }
    await fetch('/api/admin/strategy/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'compliance', value: newItems }),
    })
    onReload()
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Crown className="h-3 w-3 text-[#facc15]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Compliance Tracker</p>
        </div>
        <p className="text-[10px] font-bold tabular-nums" style={{ color: pct >= 80 ? '#4ade80' : pct >= 40 ? '#facc15' : '#f87171' }}>
          {compliance.score}/{compliance.max} · {pct}%
        </p>
      </div>

      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div className="h-full transition-all" style={{ width: `${pct}%`, background: pct >= 80 ? '#4ade80' : pct >= 40 ? '#facc15' : '#f87171' }} />
      </div>

      <div className="space-y-0.5">
        {COMPLIANCE_ITEMS.map((it) => {
          const done = !!compliance.items[it.key]
          return (
            <button
              key={it.key}
              onClick={() => toggleItem(it.key)}
              className="flex w-full items-center gap-2 rounded-[0.4rem] border border-white/8 bg-white/[0.02] px-2 py-1 text-left hover:bg-white/[0.04]"
            >
              {done
                ? <CheckSquare className="h-3 w-3 shrink-0 text-[#4ade80]" />
                : <Square className="h-3 w-3 shrink-0 text-white/35" />
              }
              <div className="min-w-0 flex-1">
                <p className={`text-[9px] font-semibold ${done ? 'text-white/55 line-through' : 'text-white/80'}`}>{it.label}</p>
                <p className="text-[8px] text-white/35">{it.hint}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────────── OKR GENERATOR IA ─────────────────────────────

type OKR = { horizon?: string; rationale?: string; objectives?: Array<{ id: number; title: string; key_results: Array<{ id: number; kr: string }> }>; cached?: boolean; generatedAt?: string; error?: string }

function OKRGeneratorCard() {
  const [data, setData] = useState<OKR | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchOKRs = async (refresh = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/strategy/okr-generator${refresh ? '?refresh=1' : ''}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setData({ error: e instanceof Error ? e.message : 'erro' })
    } finally { setLoading(false); setHasFetched(true) }
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Target className="h-3 w-3 text-[#a78bfa]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">OKR Generator · IA</p>
        </div>
        <button
          onClick={() => fetchOKRs(hasFetched)}
          disabled={loading}
          className="flex h-5 items-center gap-1 rounded-[0.4rem] border border-white/10 bg-white/[0.04] px-1.5 text-[8px] text-white/55 transition hover:text-white disabled:opacity-30"
        >
          <RefreshCw className={`h-2.5 w-2.5 ${loading ? 'animate-spin' : ''}`} />
          {hasFetched ? (loading ? 'Gerando' : 'Refazer') : 'Gerar OKRs'}
        </button>
      </div>

      {!hasFetched && (
        <p className="text-[9px] text-white/40">IA gera OKRs trimestrais baseado em TRL, fase e MRR atual</p>
      )}

      {data?.error && <p className="rounded-[0.4rem] border border-[#f8717125] bg-[#f8717108] px-2 py-1.5 text-[9px] text-[#fca5a5]">{data.error}</p>}

      {data && !data.error && data.objectives && (
        <>
          {data.horizon && <p className="mb-1 text-[8px] uppercase tracking-[0.14em] text-white/45">Horizonte: <span className="text-white/75">{data.horizon}</span></p>}
          {data.rationale && (
            <div className="mb-2 rounded-[0.4rem] border border-[#a78bfa20] bg-[#a78bfa08] px-2 py-1">
              <p className="text-[9px] text-[#c4b5fd]">💡 {data.rationale}</p>
            </div>
          )}
          {data.objectives.map((obj) => (
            <div key={obj.id} className="mb-1.5 rounded-[0.4rem] border border-white/8 bg-white/[0.02] px-2 py-1.5">
              <p className="text-[10px] font-semibold text-white/85">
                <Goal className="mr-1 inline h-3 w-3 text-[#facc15]" />
                Objetivo {obj.id}: {obj.title}
              </p>
              <ul className="mt-1 space-y-0.5 pl-4">
                {obj.key_results.map((kr) => (
                  <li key={kr.id} className="text-[9px] text-white/55">
                    <span className="font-mono text-[#a78bfa]">KR{kr.id}:</span> {kr.kr}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

// ───────────────────────────── TARGETS RADAR (Tavily) ─────────────────────────────

type Targets = {
  hospitals?: Array<{ name: string; city?: string; why?: string; url?: string; priority?: 'high' | 'medium' | 'low' }>
  investors?: Array<{ name: string; focus?: string; ticket?: string; url?: string; priority?: 'high' | 'medium' | 'low' }>
  competitors?: Array<{ name: string; positioning?: string; url?: string; threat?: 'high' | 'medium' | 'low' }>
  cached?: boolean
  generatedAt?: string
  error?: string
}

function TargetsRadarCard() {
  const [data, setData] = useState<Targets | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchTargets = async (refresh = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/strategy/targets${refresh ? '?refresh=1' : ''}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setData({ error: e instanceof Error ? e.message : 'erro' })
    } finally { setLoading(false); setHasFetched(true) }
  }

  const onToggle = () => {
    if (!open && !hasFetched) fetchTargets(false)
    setOpen(!open)
  }

  const pillColor = (p?: 'high' | 'medium' | 'low') => p === 'high' ? '#f87171' : p === 'medium' ? '#facc15' : '#94a3b8'

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-2 text-left">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-3 w-3 text-[#facc15]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Targets Radar · Hospitais + VCs + Concorrentes</p>
          {data?.cached && <span className="text-[7px] text-white/30">cache 6h</span>}
        </div>
        <span className="text-[8px] text-white/40">{open ? '▼' : '▶'}</span>
      </button>

      {open && (
        <div className="mt-2 space-y-3">
          {loading && !data && <p className="py-2 text-center text-[10px] text-white/40">Tavily pesquisando + IA estruturando…</p>}
          {data?.error && <p className="rounded-[0.4rem] border border-[#f8717125] bg-[#f8717108] px-2 py-1.5 text-[9px] text-[#fca5a5]">{data.error}</p>}

          {data && !data.error && (
            <>
              {hasFetched && (
                <button
                  onClick={(e) => { e.stopPropagation(); fetchTargets(true) }}
                  disabled={loading}
                  className="ml-auto flex h-5 items-center gap-1 rounded-[0.4rem] border border-white/10 bg-white/[0.04] px-1.5 text-[8px] text-white/55 hover:text-white disabled:opacity-30"
                >
                  <RefreshCw className={`h-2.5 w-2.5 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
              )}

              {/* Hospitais */}
              {data.hospitals && data.hospitals.length > 0 && (
                <div>
                  <p className="mb-1 flex items-center gap-1 text-[8px] uppercase tracking-[0.14em] text-[#93c5fd]">
                    <Building2 className="h-2.5 w-2.5" /> Hospitais alvo ({data.hospitals.length})
                  </p>
                  <div className="space-y-0.5">
                    {data.hospitals.map((h, i) => (
                      <div key={i} className="rounded-[0.4rem] border border-white/6 bg-white/[0.02] px-2 py-1">
                        <div className="flex items-center gap-1.5">
                          <p className="flex-1 text-[10px] font-semibold text-white/85">{h.name}</p>
                          {h.priority && <span className="rounded-full px-1.5 py-px text-[7px] font-bold uppercase" style={{ color: pillColor(h.priority), background: `${pillColor(h.priority)}14`, border: `1px solid ${pillColor(h.priority)}30` }}>{h.priority === 'high' ? 'ALTA' : h.priority === 'medium' ? 'MÉD' : 'BX'}</span>}
                        </div>
                        {h.why && <p className="text-[8.5px] text-white/55">{h.city ? `${h.city} · ` : ''}{h.why}</p>}
                        {h.url && <a href={h.url} target="_blank" rel="noopener noreferrer" className="text-[7px] text-[#93c5fd] hover:text-[#bfdbfe]"><ExternalLink className="mr-0.5 inline h-2 w-2" />{h.url.replace(/^https?:\/\//, '').split('/')[0]}</a>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Investors */}
              {data.investors && data.investors.length > 0 && (
                <div>
                  <p className="mb-1 flex items-center gap-1 text-[8px] uppercase tracking-[0.14em] text-[#fde68a]">
                    <TrendingUp className="h-2.5 w-2.5" /> VCs ({data.investors.length})
                  </p>
                  <div className="space-y-0.5">
                    {data.investors.map((v, i) => (
                      <div key={i} className="rounded-[0.4rem] border border-white/6 bg-white/[0.02] px-2 py-1">
                        <div className="flex items-center gap-1.5">
                          <p className="flex-1 text-[10px] font-semibold text-white/85">{v.name}</p>
                          {v.priority && <span className="rounded-full px-1.5 py-px text-[7px] font-bold uppercase" style={{ color: pillColor(v.priority), background: `${pillColor(v.priority)}14`, border: `1px solid ${pillColor(v.priority)}30` }}>{v.priority === 'high' ? 'ALTA' : v.priority === 'medium' ? 'MÉD' : 'BX'}</span>}
                        </div>
                        {v.focus && <p className="text-[8.5px] text-white/55">{v.focus}{v.ticket ? ` · ${v.ticket}` : ''}</p>}
                        {v.url && <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-[7px] text-[#93c5fd] hover:text-[#bfdbfe]"><ExternalLink className="mr-0.5 inline h-2 w-2" />{v.url.replace(/^https?:\/\//, '').split('/')[0]}</a>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Competitors */}
              {data.competitors && data.competitors.length > 0 && (
                <div>
                  <p className="mb-1 flex items-center gap-1 text-[8px] uppercase tracking-[0.14em] text-[#fca5a5]">
                    <AlertTriangle className="h-2.5 w-2.5" /> Concorrentes ({data.competitors.length})
                  </p>
                  <div className="space-y-0.5">
                    {data.competitors.map((c, i) => (
                      <div key={i} className="rounded-[0.4rem] border border-white/6 bg-white/[0.02] px-2 py-1">
                        <div className="flex items-center gap-1.5">
                          <p className="flex-1 text-[10px] font-semibold text-white/85">{c.name}</p>
                          {c.threat && <span className="rounded-full px-1.5 py-px text-[7px] font-bold uppercase" style={{ color: pillColor(c.threat), background: `${pillColor(c.threat)}14`, border: `1px solid ${pillColor(c.threat)}30` }}>{c.threat === 'high' ? 'ALTA' : c.threat === 'medium' ? 'MÉD' : 'BX'}</span>}
                        </div>
                        {c.positioning && <p className="text-[8.5px] text-white/55">{c.positioning}</p>}
                        {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-[7px] text-[#93c5fd] hover:text-[#bfdbfe]"><ExternalLink className="mr-0.5 inline h-2 w-2" />{c.url.replace(/^https?:\/\//, '').split('/')[0]}</a>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {!open && !hasFetched && (
        <p className="mt-1 text-[8px] text-white/35">Clica pra ativar — Tavily mapeia 5+ hospitais alvo, 3+ VCs healthtech e 2+ concorrentes diretos</p>
      )}
    </div>
  )
}
