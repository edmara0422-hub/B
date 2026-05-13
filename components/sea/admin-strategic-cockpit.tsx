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

  if (loading && !data) return <p className="py-6 text-center text-[10px] text-white/40">Carregando cockpit estratégico…</p>
  if (error && !data) return <p className="rounded-[0.4rem] border border-[#f8717125] bg-[#f8717108] px-2 py-1.5 text-[9px] text-[#fca5a5]">{error}</p>
  if (!data) return null

  return (
    <div className="space-y-3">
      {/* Alertas Estratégicos */}
      <AlertsPanel alerts={alerts} loading={alertsLoading} onRun={runAnalysis} onDismiss={dismissAlert} />

      {/* Brief Diário – Pergunta do dia */}
      {brief && <DailyBriefCard brief={brief} onRefresh={fetchBrief} />}
      {/* Posição síntese — TRL + Hype + Fase + Janela */}
      <PositionSynthesisCard data={data} />

      {/* Cockpit Financeiro */}
      <FinancialCockpitCard cockpit={data.cockpit} />

      {/* Trilho de Adoção Clínica */}
      <AdoptionTrailCard state={data.state.adoption_trail} onReload={() => reloadRef.current?.()} />

      {/* Trilhos de Evolução (Empresa vs Mercado) */}
      <CompanyMarketTrailsCard data={data} onReload={() => reloadRef.current?.()} />

      {/* Maturidade de Execução (SGI + TD) */}
      <MaturityExecutionCard state={data.state.maturity_sgi} onReload={() => reloadRef.current?.()} />

      {/* DDDM — Decisão Baseada em Dados */}
      <DDDMMaturityCard state={data.state.maturity_dddm} onReload={() => reloadRef.current?.()} />

      {/* Gestão de Inovação (Horizontes + Funil) */}
      <InnovationFunnelCard data={data} onReload={() => reloadRef.current?.()} />

      {/* Processo de Liderança */}
      <LeadershipProcessCard state={data.state.leadership_process} onReload={() => reloadRef.current?.()} />

      {/* Sprint Alpha 7 dias */}
      <SprintAlphaCard state={data.state.sprint_alpha} onReload={() => reloadRef.current?.()} />

      {/* Compliance Tracker */}
      <ComplianceTrackerCard compliance={data.cockpit.compliance} onReload={() => reloadRef.current?.()} />

      {/* OKR Generator IA */}
      <OKRGeneratorCard />

      {/* Hospitais Alvo + Investor Radar + Concorrentes */}
      <TargetsRadarCard />
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
