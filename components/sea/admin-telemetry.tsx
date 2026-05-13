'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertCircle, AlertTriangle, Brain, ExternalLink, Globe, Heart, MapPin, MessageSquare, Radar, RefreshCw, ShieldAlert, Smartphone, ThumbsDown, ThumbsUp, Zap } from 'lucide-react'

type DeviceRow = { device: string; count: number }
type HeatmapRow = { day_of_week: number; hour_of_day: number; count: number }
type FeedRow = { user_id: string; user_email: string | null; user_name: string | null; device: string; event_type: string; ip: string | null; created_at: string }
type ConcurrentRow = { hour_bucket: string; unique_users: number; total_events: number }
type GeographyRow = { ip: string; city: string | null; region: string | null; country: string | null; latitude: number | null; longitude: number | null; events: number; unique_users: number }

type TelemetryData = {
  devices: DeviceRow[]
  heatmap: HeatmapRow[]
  feed: FeedRow[]
  concurrent: ConcurrentRow[]
  geography: GeographyRow[]
  timestamp: string
}

const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const DEVICE_COLORS: Record<string, string> = {
  iPhone: '#60a5fa',
  iPad: '#7dd3fc',
  Android: '#4ade80',
  Mac: '#c4b5fd',
  Windows: '#fbbf24',
  Linux: '#fb923c',
  Outros: '#94a3b8',
}

export function AdminTelemetry() {
  const [data, setData] = useState<TelemetryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/analytics/realtime')
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || `HTTP ${res.status}`)
        return
      }
      setError(null)
      setData(json)
      setLastUpdate(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de rede')
    }
    finally { setLoading(false) }
  }

  useEffect(() => {
    fetchData()
    intervalRef.current = setInterval(fetchData, 30_000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  if (loading && !data) return <p className="py-6 text-center text-[10px] text-white/40">Carregando telemetria…</p>

  if (error && !data) return (
    <div className="rounded-[0.6rem] border border-[#f8717125] bg-[#f8717108] px-3 py-2.5">
      <p className="text-[10px] font-semibold text-[#fca5a5]">Erro ao carregar telemetria</p>
      <p className="mt-1 text-[9px] text-white/45">{error}</p>
    </div>
  )

  return (
    <div className="space-y-3">
      {/* Status bar */}
      <div className="flex items-center justify-between rounded-[0.5rem] border border-[#4ade8025] bg-[#4ade8008] px-2.5 py-1.5">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80] opacity-70" />
          </div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#86efac]">Telemetria ao vivo</p>
        </div>
        <p className="text-[8px] text-white/40">
          {lastUpdate ? `Atualizado ${lastUpdate.toLocaleTimeString('pt-BR')}` : 'Aguardando'} · refresh 30s
        </p>
      </div>

      {/* AI Briefing — análise IA dos últimos 30 dias com cache 15min */}
      <AIBriefingCard />

      {/* Market Watch — Tavily + IA monitora evidências/mercado/compliance */}
      <MarketWatchCard />

      {/* NPS Sentiment — IA classifica feedbacks em positivo/neutro/negativo + temas */}
      <NPSSentimentCard />

      {/* Anomaly Detection — score composto 0-100 por usuário com sinais */}
      <AnomalyDetectionCard />

      {/* Live feed */}
      <LiveFeedCard feed={data?.feed ?? []} />

      {/* Concurrent 24h chart */}
      <ConcurrentChart rows={data?.concurrent ?? []} />

      {/* Grid: devices + heatmap */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <DevicePieCard devices={data?.devices ?? []} />
        <HeatmapCard heatmap={data?.heatmap ?? []} />
      </div>

      {/* Geography */}
      <GeographyCard geography={data?.geography ?? []} />
    </div>
  )
}

function LiveFeedCard({ feed }: { feed: FeedRow[] }) {
  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-1.5 flex items-center gap-1.5">
        <Activity className="h-3 w-3 text-[#4ade80]" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Feed ao vivo</p>
        <span className="text-[8px] text-white/30">({feed.length})</span>
      </div>
      {feed.length === 0 ? (
        <p className="py-2 text-center text-[10px] text-white/30">Sem eventos ainda. Faça um login pra popular o feed.</p>
      ) : (
        <div className="ipb-thinscroll max-h-[200px] space-y-0.5 overflow-y-auto">
          {feed.map((event, i) => {
            const ageMs = Date.now() - new Date(event.created_at).getTime()
            const ageLabel = ageMs < 60000 ? `${Math.floor(ageMs / 1000)}s` : ageMs < 3600000 ? `${Math.floor(ageMs / 60000)}min` : ageMs < 86400000 ? `${Math.floor(ageMs / 3600000)}h` : `${Math.floor(ageMs / 86400000)}d`
            return (
              <motion.div
                key={`${event.user_id}-${event.created_at}-${i}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 rounded-[0.4rem] border border-white/6 bg-white/[0.02] px-2 py-1"
              >
                <span
                  className="shrink-0 rounded-full px-1.5 py-px text-[7px] font-semibold uppercase tracking-[0.10em]"
                  style={{
                    background: event.event_type === 'login' ? 'rgba(74,222,128,0.12)' : 'rgba(96,165,250,0.12)',
                    color: event.event_type === 'login' ? '#86efac' : '#93c5fd',
                  }}
                >
                  {event.event_type}
                </span>
                <p className="min-w-0 flex-1 truncate text-[9px] text-white/65">
                  <span className="font-semibold text-white/85">{event.user_name || event.user_email || 'Anônimo'}</span>
                  <span className="text-white/35"> · {event.device}</span>
                  {event.ip && <span className="text-white/30"> · {event.ip}</span>}
                </p>
                <span className="shrink-0 text-[8px] tabular-nums text-white/35">{ageLabel}</span>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ConcurrentChart({ rows }: { rows: ConcurrentRow[] }) {
  // Gera 24 buckets fixos pras últimas 24h (preenche zero onde não tem dado)
  const now = new Date()
  const buckets: { hour: Date; users: number }[] = []
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now)
    d.setHours(d.getHours() - i, 0, 0, 0)
    const match = rows.find((r) => new Date(r.hour_bucket).getTime() === d.getTime())
    buckets.push({ hour: d, users: match?.unique_users ?? 0 })
  }
  const maxUsers = Math.max(...buckets.map((b) => b.users), 1)
  const totalUnique = new Set(rows.map((r) => r.unique_users)).size
  const peakBucket = buckets.reduce((max, b) => (b.users > max.users ? b : max), buckets[0])

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-[#facc15]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Usuários únicos · 24h</p>
        </div>
        <p className="text-[8px] text-white/40">
          Pico: {peakBucket.users} às {peakBucket.hour.getHours().toString().padStart(2, '0')}h
        </p>
      </div>
      <div className="flex h-[100px] items-end gap-[2px]">
        {buckets.map((b, i) => {
          const heightPct = (b.users / maxUsers) * 100
          const hour = b.hour.getHours()
          return (
            <div key={i} className="group relative flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t-[2px] transition-all"
                style={{
                  height: `${Math.max(heightPct, 2)}%`,
                  background: b.users > 0 ? 'linear-gradient(180deg, rgba(74,222,128,0.85) 0%, rgba(74,222,128,0.30) 100%)' : 'rgba(255,255,255,0.05)',
                }}
                title={`${hour}h: ${b.users} usuário(s)`}
              />
              {i % 4 === 0 && (
                <span className="absolute -bottom-3 text-[7px] text-white/35">{hour}h</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DevicePieCard({ devices }: { devices: DeviceRow[] }) {
  const total = devices.reduce((sum, d) => sum + Number(d.count), 0)

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center gap-1.5">
        <Smartphone className="h-3 w-3 text-[#60a5fa]" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Dispositivos · 30d</p>
      </div>
      {total === 0 ? (
        <p className="py-2 text-center text-[10px] text-white/30">Sem dados ainda.</p>
      ) : (
        <div className="space-y-1.5">
          {/* Donut visual em barras horizontais (mais legível em mobile que pizza) */}
          {devices.map((d) => {
            const pct = total > 0 ? (Number(d.count) / total) * 100 : 0
            const color = DEVICE_COLORS[d.device] ?? '#94a3b8'
            return (
              <div key={d.device}>
                <div className="mb-0.5 flex items-center justify-between text-[8px]">
                  <span className="font-semibold text-white/75">{d.device}</span>
                  <span className="tabular-nums text-white/45">{d.count} · {pct.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            )
          })}
          <p className="mt-1 text-[7px] text-white/30">Total: {total} eventos</p>
        </div>
      )}
    </div>
  )
}

function HeatmapCard({ heatmap }: { heatmap: HeatmapRow[] }) {
  // grid 7 dias × 24 horas
  const cells: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0))
  heatmap.forEach((r) => { cells[r.day_of_week][r.hour_of_day] = Number(r.count) })
  const max = Math.max(1, ...heatmap.map((r) => Number(r.count)))

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center gap-1.5">
        <Activity className="h-3 w-3 text-[#a78bfa]" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Heatmap · 30d</p>
      </div>
      <div className="space-y-0.5">
        {cells.map((row, dow) => (
          <div key={dow} className="flex items-center gap-1">
            <span className="w-5 shrink-0 text-[7px] text-white/35">{DAY_NAMES[dow]}</span>
            <div className="flex flex-1 gap-[1px]">
              {row.map((count, hr) => {
                const intensity = count / max
                return (
                  <div
                    key={hr}
                    className="aspect-square flex-1 rounded-sm transition-all"
                    style={{
                      background: count === 0 ? 'rgba(255,255,255,0.03)' : `rgba(167,139,250,${0.2 + intensity * 0.8})`,
                      minHeight: 8,
                    }}
                    title={`${DAY_NAMES[dow]} ${hr}h: ${count} eventos`}
                  />
                )
              })}
            </div>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between text-[7px] text-white/35">
          <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>23h</span>
        </div>
      </div>
    </div>
  )
}

type Insight = { icon: string; title: string; body: string; priority: 'high' | 'medium' | 'low' }
type Briefing = {
  headline?: string
  mood?: 'ok' | 'alert' | 'win'
  insights?: Insight[]
  next_action?: string
  stats?: { totalUsers: number; newLast7Days: number; activeLast7Days: number; peakConcurrent: number; npsNet: number | null; totalFeedbacks: number }
  generatedAt?: string
  cached?: boolean
  error?: string
}

function AIBriefingCard() {
  const [briefing, setBriefing] = useState<Briefing | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchBriefing = async (refresh = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics/briefing${refresh ? '?refresh=1' : ''}`)
      const json = await res.json()
      setBriefing(json)
    } catch (e) {
      setBriefing({ error: e instanceof Error ? e.message : 'erro de rede' })
    } finally {
      setLoading(false)
      setHasFetched(true)
    }
  }

  useEffect(() => { fetchBriefing(false) }, [])

  const moodColor = briefing?.mood === 'alert' ? '#f87171' : briefing?.mood === 'win' ? '#4ade80' : '#a78bfa'
  const moodBg = briefing?.mood === 'alert' ? 'rgba(248,113,113,0.08)' : briefing?.mood === 'win' ? 'rgba(74,222,128,0.08)' : 'rgba(167,139,250,0.08)'
  const moodBorder = briefing?.mood === 'alert' ? 'rgba(248,113,113,0.30)' : briefing?.mood === 'win' ? 'rgba(74,222,128,0.30)' : 'rgba(167,139,250,0.30)'

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Brain className="h-3 w-3 text-[#a78bfa]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Briefing IA · Groq Llama 3.3</p>
        </div>
        <button
          onClick={() => fetchBriefing(true)}
          disabled={loading}
          className="flex h-5 items-center gap-1 rounded-[0.4rem] border border-white/10 bg-white/[0.04] px-1.5 text-[8px] text-white/55 transition hover:text-white disabled:opacity-30"
        >
          <RefreshCw className={`h-2.5 w-2.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Analisando' : briefing?.cached ? 'Cache' : 'Atualizar'}
        </button>
      </div>

      {!hasFetched && loading && (
        <p className="py-3 text-center text-[10px] text-white/40">IA analisando últimos 30 dias…</p>
      )}

      {briefing?.error && (
        <p className="rounded-[0.4rem] border border-[#f8717125] bg-[#f8717108] px-2 py-1.5 text-[9px] text-[#fca5a5]">
          {briefing.error}
        </p>
      )}

      {briefing && !briefing.error && (
        <>
          {/* Headline */}
          {briefing.headline && (
            <div
              className="mb-2 rounded-[0.5rem] border px-2.5 py-2"
              style={{ borderColor: moodBorder, background: moodBg }}
            >
              <p className="text-[10px] font-semibold leading-snug" style={{ color: moodColor }}>
                {briefing.headline}
              </p>
            </div>
          )}

          {/* Insights */}
          {briefing.insights && briefing.insights.length > 0 && (
            <div className="space-y-1">
              {briefing.insights.map((insight, i) => {
                const pColor = insight.priority === 'high' ? '#f87171' : insight.priority === 'medium' ? '#facc15' : '#94a3b8'
                return (
                  <div key={i} className="rounded-[0.4rem] border border-white/8 bg-white/[0.02] px-2 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px]">{insight.icon}</span>
                      <p className="flex-1 text-[10px] font-semibold text-white/85">{insight.title}</p>
                      <span
                        className="rounded-full px-1 py-px text-[7px] font-bold uppercase"
                        style={{ color: pColor, background: `${pColor}14`, border: `1px solid ${pColor}30` }}
                      >
                        {insight.priority === 'high' ? 'ALTA' : insight.priority === 'medium' ? 'MÉDIA' : 'BAIXA'}
                      </span>
                    </div>
                    <p className="mt-0.5 pl-5 text-[9px] leading-relaxed text-white/55">{insight.body}</p>
                  </div>
                )
              })}
            </div>
          )}

          {/* Next action */}
          {briefing.next_action && (
            <div className="mt-2 rounded-[0.5rem] border border-[#4ade8030] bg-[#4ade8008] px-2.5 py-1.5">
              <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#86efac]">Próxima ação hoje</p>
              <p className="mt-0.5 text-[10px] text-white/85">{briefing.next_action}</p>
            </div>
          )}

          {briefing.generatedAt && (
            <p className="mt-1.5 text-right text-[7px] text-white/30">
              Gerado {new Date(briefing.generatedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
              {briefing.cached ? ' · cache 15min' : ''}
            </p>
          )}
        </>
      )}
    </div>
  )
}

type MarketItem = {
  category: 'clinical' | 'evidence' | 'market' | 'compliance'
  title: string
  implication: string
  source_url: string
  source_domain: string
  priority: 'high' | 'medium' | 'low'
}
type MarketWatch = {
  summary?: string
  items?: MarketItem[]
  action_for_sea?: string
  rawCounts?: Record<string, number>
  generatedAt?: string
  cached?: boolean
  error?: string
}

function MarketWatchCard() {
  const [data, setData] = useState<MarketWatch | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchData = async (refresh = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics/market-watch${refresh ? '?refresh=1' : ''}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setData({ error: e instanceof Error ? e.message : 'erro de rede' })
    } finally {
      setLoading(false)
      setHasFetched(true)
    }
  }

  // Não busca automaticamente — usuário clica pra ativar (economiza quota Tavily)
  const onToggle = () => {
    if (!open && !hasFetched) fetchData(false)
    setOpen(!open)
  }

  const categoryColors: Record<string, string> = {
    compliance: '#f87171',
    evidence: '#60a5fa',
    market: '#facc15',
    clinical: '#4ade80',
  }
  const categoryLabels: Record<string, string> = {
    compliance: 'Compliance',
    evidence: 'Evidência',
    market: 'Mercado',
    clinical: 'Clínica',
  }

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-2 text-left">
        <div className="flex items-center gap-1.5">
          <Radar className="h-3 w-3 text-[#34d399]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Market Watch · Tavily + IA</p>
          {data?.cached && <span className="text-[7px] text-white/30">cache 1h</span>}
        </div>
        <div className="flex items-center gap-1.5">
          {hasFetched && (
            <button
              onClick={(e) => { e.stopPropagation(); fetchData(true) }}
              disabled={loading}
              className="flex h-5 items-center gap-1 rounded-[0.4rem] border border-white/10 bg-white/[0.04] px-1.5 text-[8px] text-white/55 transition hover:text-white disabled:opacity-30"
            >
              <RefreshCw className={`h-2.5 w-2.5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Buscando' : 'Atualizar'}
            </button>
          )}
          <span className="text-[8px] text-white/40">{open ? '▼' : '▶'}</span>
        </div>
      </button>

      {open && (
        <div className="mt-2 space-y-1.5">
          {loading && !data && (
            <p className="py-3 text-center text-[10px] text-white/40">Tavily pesquisando + IA analisando…</p>
          )}

          {data?.error && (
            <p className="rounded-[0.4rem] border border-[#f8717125] bg-[#f8717108] px-2 py-1.5 text-[9px] text-[#fca5a5]">
              {data.error}
            </p>
          )}

          {data && !data.error && (
            <>
              {data.summary && (
                <div className="rounded-[0.5rem] border border-[#34d39930] bg-[#34d39908] px-2.5 py-1.5">
                  <p className="text-[10px] font-semibold leading-snug text-[#6ee7b7]">{data.summary}</p>
                </div>
              )}

              {data.items && data.items.length > 0 && (
                <div className="space-y-1">
                  {data.items.map((item, i) => {
                    const catColor = categoryColors[item.category] ?? '#94a3b8'
                    const pColor = item.priority === 'high' ? '#f87171' : item.priority === 'medium' ? '#facc15' : '#94a3b8'
                    return (
                      <div key={i} className="rounded-[0.4rem] border border-white/8 bg-white/[0.02] px-2 py-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="shrink-0 rounded-full px-1.5 py-px text-[7px] font-bold uppercase"
                            style={{ color: catColor, background: `${catColor}14`, border: `1px solid ${catColor}30` }}
                          >
                            {categoryLabels[item.category]}
                          </span>
                          <p className="flex-1 truncate text-[10px] font-semibold text-white/85">{item.title}</p>
                          <span
                            className="shrink-0 rounded-full px-1 py-px text-[7px] font-bold"
                            style={{ color: pColor, background: `${pColor}14`, border: `1px solid ${pColor}30` }}
                          >
                            {item.priority === 'high' ? 'ALTA' : item.priority === 'medium' ? 'MÉD' : 'BX'}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[9px] leading-relaxed text-white/55">{item.implication}</p>
                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 flex items-center gap-1 text-[7px] text-white/35 hover:text-white/65"
                        >
                          <ExternalLink className="h-2 w-2" />
                          {item.source_domain}
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}

              {data.action_for_sea && (
                <div className="mt-1.5 rounded-[0.5rem] border border-[#a78bfa30] bg-[#a78bfa08] px-2.5 py-1.5">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#c4b5fd]">Ação SEA esta semana</p>
                  <p className="mt-0.5 text-[10px] text-white/85">{data.action_for_sea}</p>
                </div>
              )}

              {data.generatedAt && (
                <p className="text-right text-[7px] text-white/30">
                  Gerado {new Date(data.generatedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  {data.cached ? ' · cache' : ''}
                </p>
              )}
            </>
          )}
        </div>
      )}

      {!open && !hasFetched && (
        <p className="mt-1 text-[8px] text-white/35">
          Clica pra ativar — Tavily pesquisa evidência clínica + compliance + mercado, IA Groq resume em ações
        </p>
      )}
    </div>
  )
}

type Theme = { theme: string; count: number; tone: 'positive' | 'neutral' | 'negative'; sample: string }
type CriticalFb = { id: string; excerpt: string; severity: 'high' | 'medium' }
type PraiseFb = { id: string; excerpt: string }
type NPSSentiment = {
  summary?: string
  sentiment_distribution?: { positive: number; neutral: number; negative: number }
  top_themes?: Theme[]
  critical?: CriticalFb[]
  praise?: PraiseFb[]
  total?: number
  generatedAt?: string
  cached?: boolean
  error?: string
}

function NPSSentimentCard() {
  const [data, setData] = useState<NPSSentiment | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchData = async (refresh = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics/nps-sentiment${refresh ? '?refresh=1' : ''}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setData({ error: e instanceof Error ? e.message : 'erro de rede' })
    } finally {
      setLoading(false)
      setHasFetched(true)
    }
  }

  useEffect(() => { fetchData(false) }, [])

  const dist = data?.sentiment_distribution ?? { positive: 0, neutral: 0, negative: 0 }
  const total = dist.positive + dist.neutral + dist.negative
  const positivePct = total > 0 ? (dist.positive / total) * 100 : 0
  const neutralPct = total > 0 ? (dist.neutral / total) * 100 : 0
  const negativePct = total > 0 ? (dist.negative / total) * 100 : 0

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Heart className="h-3 w-3 text-[#f87171]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">NPS Sentiment · IA</p>
          {data?.total !== undefined && <span className="text-[8px] text-white/35">({data.total} feedbacks)</span>}
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={loading}
          className="flex h-5 items-center gap-1 rounded-[0.4rem] border border-white/10 bg-white/[0.04] px-1.5 text-[8px] text-white/55 transition hover:text-white disabled:opacity-30"
        >
          <RefreshCw className={`h-2.5 w-2.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Analisando' : data?.cached ? 'Cache' : 'Atualizar'}
        </button>
      </div>

      {!hasFetched && loading && (
        <p className="py-3 text-center text-[10px] text-white/40">IA classificando feedbacks…</p>
      )}

      {data?.error && (
        <p className="rounded-[0.4rem] border border-[#f8717125] bg-[#f8717108] px-2 py-1.5 text-[9px] text-[#fca5a5]">
          {data.error}
        </p>
      )}

      {data && !data.error && (
        <>
          {data.summary && (
            <div className="mb-2 rounded-[0.5rem] border border-white/8 bg-white/[0.02] px-2.5 py-1.5">
              <p className="text-[10px] font-semibold text-white/85">{data.summary}</p>
            </div>
          )}

          {/* Sentiment bar */}
          {total > 0 && (
            <div className="mb-2">
              <div className="mb-1 flex items-center justify-between text-[8px]">
                <span className="text-[#86efac]"><ThumbsUp className="mr-0.5 inline h-2.5 w-2.5" />{dist.positive}</span>
                <span className="text-white/45">{dist.neutral}</span>
                <span className="text-[#fca5a5]"><ThumbsDown className="mr-0.5 inline h-2.5 w-2.5" />{dist.negative}</span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-white/5">
                {positivePct > 0 && <div style={{ width: `${positivePct}%`, background: '#4ade80' }} />}
                {neutralPct > 0 && <div style={{ width: `${neutralPct}%`, background: '#94a3b8' }} />}
                {negativePct > 0 && <div style={{ width: `${negativePct}%`, background: '#f87171' }} />}
              </div>
              <div className="mt-0.5 flex justify-between text-[7px] text-white/30">
                <span>{positivePct.toFixed(0)}% positivo</span>
                <span>{neutralPct.toFixed(0)}% neutro</span>
                <span>{negativePct.toFixed(0)}% negativo</span>
              </div>
            </div>
          )}

          {/* Top themes */}
          {data.top_themes && data.top_themes.length > 0 && (
            <div className="mb-2">
              <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/45">Top temas</p>
              <div className="space-y-1">
                {data.top_themes.map((t, i) => {
                  const tColor = t.tone === 'positive' ? '#4ade80' : t.tone === 'negative' ? '#f87171' : '#94a3b8'
                  return (
                    <div key={i} className="flex items-center gap-1.5 rounded-[0.4rem] border border-white/6 bg-white/[0.02] px-2 py-1">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tColor }} />
                      <p className="flex-1 truncate text-[9px] font-semibold text-white/80">{t.theme}</p>
                      <span className="shrink-0 text-[7px] tabular-nums text-white/40">{t.count}x</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Critical feedbacks */}
          {data.critical && data.critical.length > 0 && (
            <div className="mb-2">
              <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#fca5a5]">
                <AlertCircle className="mr-0.5 inline h-2.5 w-2.5" />Críticos
              </p>
              <div className="space-y-1">
                {data.critical.map((c, i) => (
                  <div key={i} className="rounded-[0.4rem] border border-[#f8717120] bg-[#f8717108] px-2 py-1">
                    <p className="text-[9px] text-white/75">"{c.excerpt}"</p>
                    <p className="mt-0.5 text-[7px] uppercase text-[#fca5a5]/65">severidade: {c.severity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Praise */}
          {data.praise && data.praise.length > 0 && (
            <div>
              <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#86efac]">
                <ThumbsUp className="mr-0.5 inline h-2.5 w-2.5" />Elogios
              </p>
              <div className="space-y-1">
                {data.praise.map((p, i) => (
                  <div key={i} className="rounded-[0.4rem] border border-[#4ade8020] bg-[#4ade8008] px-2 py-1">
                    <p className="text-[9px] text-white/75">"{p.excerpt}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.generatedAt && (
            <p className="mt-1.5 text-right text-[7px] text-white/30">
              Gerado {new Date(data.generatedAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
              {data.cached ? ' · cache 30min' : ''}
            </p>
          )}
        </>
      )}
    </div>
  )
}

type AnomalyRow = {
  user_id: string
  user_email: string | null
  user_name: string | null
  score: number
  level: 'high' | 'medium' | 'low'
  signals: {
    multi_ip: number
    simultaneous_diff_ip: number
    cities: number
    late_night_events: number
    inactive_days: number | null
  }
  last_seen: string | null
  total_events: number
  unique_ips: number
  unique_devices: number
  cities_count: number
}

function AnomalyDetectionCard() {
  const [anomalies, setAnomalies] = useState<AnomalyRow[]>([])
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/analytics/anomalies')
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || `HTTP ${res.status}`)
        return
      }
      setAnomalies(json.anomalies ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'erro de rede')
    } finally {
      setLoading(false)
      setHasFetched(true)
    }
  }

  useEffect(() => { fetchData() }, [])

  const highCount = anomalies.filter((a) => a.level === 'high').length
  const mediumCount = anomalies.filter((a) => a.level === 'medium').length

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="h-3 w-3 text-[#fb923c]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">
            Anomalias · score composto
          </p>
          {anomalies.length > 0 && (
            <span className="text-[8px] text-white/40">
              ({highCount > 0 && <span className="text-[#fca5a5]">{highCount} alta</span>}
              {highCount > 0 && mediumCount > 0 && ' · '}
              {mediumCount > 0 && <span className="text-[#fde68a]">{mediumCount} média</span>}
              {highCount === 0 && mediumCount === 0 && 'tudo normal'})
            </span>
          )}
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex h-5 items-center gap-1 rounded-[0.4rem] border border-white/10 bg-white/[0.04] px-1.5 text-[8px] text-white/55 transition hover:text-white disabled:opacity-30"
        >
          <RefreshCw className={`h-2.5 w-2.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Calculando' : 'Atualizar'}
        </button>
      </div>

      {!hasFetched && loading && (
        <p className="py-3 text-center text-[10px] text-white/40">Calculando scores de anomalia…</p>
      )}

      {error && (
        <p className="rounded-[0.4rem] border border-[#f8717125] bg-[#f8717108] px-2 py-1.5 text-[9px] text-[#fca5a5]">
          {error}
        </p>
      )}

      {hasFetched && !error && anomalies.length === 0 && (
        <p className="rounded-[0.4rem] border border-white/8 bg-white/[0.02] px-2 py-2 text-[9px] text-white/40">
          Sem dados de usuários ainda. Quando tiver atividade real, anomalias aparecem aqui.
        </p>
      )}

      {anomalies.length > 0 && (
        <div className="space-y-1">
          {anomalies.slice(0, 10).map((a) => {
            const isHigh = a.level === 'high'
            const isMed = a.level === 'medium'
            const color = isHigh ? '#f87171' : isMed ? '#facc15' : '#94a3b8'
            const sigParts: string[] = []
            if (a.signals.simultaneous_diff_ip > 0) sigParts.push(`🚩 ${a.signals.simultaneous_diff_ip} sessões simultâneas em IPs distintos`)
            if (a.signals.multi_ip >= 3) sigParts.push(`🌍 ${a.signals.multi_ip} IPs distintos`)
            if (a.signals.cities > 1) sigParts.push(`📍 ${a.signals.cities} cidades`)
            if (a.signals.late_night_events > 0) sigParts.push(`🕐 ${a.signals.late_night_events} eventos madrugada`)
            if (a.signals.inactive_days !== null && a.signals.inactive_days > 7) sigParts.push(`💤 inativo há ${a.signals.inactive_days}d`)
            if (sigParts.length === 0) sigParts.push('Padrão normal — sem sinais suspeitos')

            return (
              <div
                key={a.user_id}
                className="rounded-[0.5rem] border px-2 py-1.5"
                style={{
                  borderColor: isHigh ? 'rgba(248,113,113,0.30)' : isMed ? 'rgba(250,204,21,0.25)' : 'rgba(255,255,255,0.08)',
                  background: isHigh ? 'rgba(248,113,113,0.06)' : isMed ? 'rgba(250,204,21,0.04)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <div className="flex items-center gap-2">
                  {isHigh && <AlertTriangle className="h-3 w-3 shrink-0 text-[#f87171]" />}
                  {isMed && <AlertCircle className="h-3 w-3 shrink-0 text-[#facc15]" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-white/85">
                      {a.user_name || a.user_email || 'Anônimo'}
                    </p>
                    <p className="truncate text-[8px] text-white/40">{a.user_email}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[12px] font-bold tabular-nums" style={{ color }}>{a.score}</p>
                    <p className="text-[7px] uppercase" style={{ color }}>{a.level === 'high' ? 'ALTA' : a.level === 'medium' ? 'MÉDIA' : 'BAIXA'}</p>
                  </div>
                </div>
                <ul className="mt-1 space-y-0.5 pl-5 text-[8.5px] text-white/55">
                  {sigParts.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )
          })}
          {anomalies.length > 10 && (
            <p className="text-center text-[7px] text-white/30">+ {anomalies.length - 10} usuário(s) mais</p>
          )}
        </div>
      )}

      {/* Legenda dos sinais */}
      <details className="mt-2">
        <summary className="cursor-pointer text-[7px] uppercase tracking-[0.14em] text-white/30 hover:text-white/55">
          Como funciona o score
        </summary>
        <div className="mt-1 space-y-0.5 rounded-[0.4rem] border border-white/6 bg-white/[0.02] px-2 py-1.5 text-[8px] text-white/45">
          <p>• 3+ IPs distintos → até <span className="text-white/70">30 pts</span></p>
          <p>• Sessões simultâneas em IPs diferentes → até <span className="text-white/70">35 pts</span> (sinal forte de compartilhamento)</p>
          <p>• Múltiplas cidades → até <span className="text-white/70">15 pts</span></p>
          <p>• &gt;30% eventos em madrugada → <span className="text-white/70">10 pts</span></p>
          <p>• Inativo &gt;7 dias → <span className="text-white/70">10 pts</span> (churn risk)</p>
          <p className="mt-1 text-white/35">Limite: 100. Alta ≥50, Média ≥25, Baixa &lt;25.</p>
        </div>
      </details>
    </div>
  )
}

function GeographyCard({ geography }: { geography: GeographyRow[] }) {
  const withCity = geography.filter((g) => g.city)
  const totalEvents = geography.reduce((sum, g) => sum + Number(g.events), 0)
  const totalUsers = new Set(geography.flatMap((g) => g.unique_users)).size

  return (
    <div className="ipb-soft rounded-[0.7rem] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Globe className="h-3 w-3 text-[#34d399]" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">Geografia · 30d</p>
        </div>
        <p className="text-[8px] text-white/40">{geography.length} IP(s) · {totalEvents} eventos</p>
      </div>
      {geography.length === 0 ? (
        <p className="py-2 text-center text-[10px] text-white/30">Sem IPs registrados ainda.</p>
      ) : (
        <div className="space-y-1">
          {geography.slice(0, 10).map((g, i) => (
            <div key={i} className="flex items-center gap-2 rounded-[0.4rem] border border-white/6 bg-white/[0.02] px-2 py-1">
              <MapPin className="h-3 w-3 shrink-0 text-white/45" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] text-white/75">
                  {g.city ? `${g.city}, ${g.region ?? ''} · ${g.country ?? ''}` : g.ip}
                </p>
                {g.city && (
                  <p className="truncate text-[7px] text-white/35">{g.ip}</p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[9px] font-semibold tabular-nums text-white/75">{g.events}</p>
                <p className="text-[7px] text-white/35">{g.unique_users} user(s)</p>
              </div>
            </div>
          ))}
          {geography.length > 10 && (
            <p className="text-center text-[7px] text-white/30">+ {geography.length - 10} IP(s) mais</p>
          )}
        </div>
      )}
      {withCity.length === 0 && geography.length > 0 && (
        <p className="mt-1 text-[7px] text-white/30">Geolocalizando IPs… recarregue em 10s.</p>
      )}
    </div>
  )
}
