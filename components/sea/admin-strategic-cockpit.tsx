'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Building2, CheckSquare, Crown, DollarSign, ExternalLink, Eye, Flag, Gauge, Goal, Heart, Hospital, Map as MapIcon, RefreshCw, Rocket, Square, Target, TrendingUp, Trophy, Users } from 'lucide-react'

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

export function AdminStrategicCockpit() {
  const [data, setData] = useState<CockpitData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  useEffect(() => { fetchData() }, [])
  reloadRef.current = fetchData

  if (loading && !data) return <p className="py-6 text-center text-[10px] text-white/40">Carregando cockpit estratégico…</p>
  if (error && !data) return <p className="rounded-[0.4rem] border border-[#f8717125] bg-[#f8717108] px-2 py-1.5 text-[9px] text-[#fca5a5]">{error}</p>
  if (!data) return null

  return (
    <div className="space-y-3">
      {/* Posição síntese — TRL + Hype + Fase + Janela */}
      <PositionSynthesisCard data={data} />

      {/* Cockpit Financeiro */}
      <FinancialCockpitCard cockpit={data.cockpit} />

      {/* Trilho de Adoção Clínica */}
      <AdoptionTrailCard state={data.state.adoption_trail} onReload={() => reloadRef.current?.()} />

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
