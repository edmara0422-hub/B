'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Globe, MapPin, Smartphone, Zap } from 'lucide-react'

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
      if (!res.ok) { setError(json?.error || `HTTP ${res.status}`); return }
      setError(null)
      setData(json)
      setLastUpdate(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro de rede')
    } finally { setLoading(false) }
  }

  useEffect(() => {
    fetchData()
    intervalRef.current = setInterval(fetchData, 30_000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  if (loading && !data) return <p className="py-6 text-center text-[10px] text-white/40">Sincronizando fluxo de telemetria…</p>

  if (error && !data) return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Erro de Sincronização</p>
      <p className="mt-1 text-[9px] text-white/40">{error}</p>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Live status bar */}
      <div className="flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-50" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500">Live Telemetry Stream</p>
        </div>
        <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">
          {lastUpdate ? `Updated ${lastUpdate.toLocaleTimeString('pt-BR')}` : 'Syncing...'} · 30s poll
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LiveFeedCard feed={data?.feed ?? []} />
        <ConcurrentChart rows={data?.concurrent ?? []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <DevicePieCard devices={data?.devices ?? []} />
        </div>
        <div className="lg:col-span-2">
          <HeatmapCard heatmap={data?.heatmap ?? []} />
        </div>
      </div>

      <GeographyCard geography={data?.geography ?? []} />
    </div>
  )
}

function LiveFeedCard({ feed }: { feed: FeedRow[] }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-green-500" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Feed</p>
        <span className="text-[8px] text-white/20">({feed.length} events)</span>
      </div>
      {feed.length === 0 ? (
        <p className="py-8 text-center text-[10px] text-white/20 uppercase font-bold tracking-widest">Waiting for events...</p>
      ) : (
        <div className="max-h-[220px] space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {feed.map((event, i) => {
            const ageMs = Date.now() - new Date(event.created_at).getTime()
            const ageLabel = ageMs < 60000 ? `${Math.floor(ageMs / 1000)}s` : ageMs < 3600000 ? `${Math.floor(ageMs / 60000)}m` : `${Math.floor(ageMs / 3600000)}h`
            return (
              <motion.div
                key={`${event.user_id}-${event.created_at}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] px-3 py-2"
              >
                <span className="shrink-0 rounded px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest bg-white/5 text-white/40">
                  {event.event_type}
                </span>
                <p className="min-w-0 flex-1 truncate text-[10px] text-white/70">
                  <span className="font-bold text-white">{event.user_name || event.user_email || 'Anônimo'}</span>
                  <span className="text-white/20"> · {event.device}</span>
                </p>
                <span className="shrink-0 text-[8px] tabular-nums text-white/20">{ageLabel}</span>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ConcurrentChart({ rows }: { rows: ConcurrentRow[] }) {
  const now = new Date()
  const buckets: { hour: Date; users: number }[] = []
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now)
    d.setHours(d.getHours() - i, 0, 0, 0)
    const match = rows.find((r) => new Date(r.hour_bucket).getTime() === d.getTime())
    buckets.push({ hour: d, users: match?.unique_users ?? 0 })
  }
  const maxUsers = Math.max(...buckets.map((b) => b.users), 1)
  const peakBucket = buckets.reduce((max, b) => (b.users > max.users ? b : max), buckets[0])

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#facc15]" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Concurrent Users (24h)</p>
        </div>
        <p className="text-[8px] text-white/20 font-bold uppercase">
          Peak: {peakBucket.users} @ {peakBucket.hour.getHours()}h
        </p>
      </div>
      <div className="flex h-[120px] items-end gap-1 px-1">
        {buckets.map((b, i) => {
          const heightPct = (b.users / maxUsers) * 100
          return (
            <div key={i} className="group relative flex flex-1 flex-col items-center h-full justify-end">
              <div
                className="w-full rounded-t-sm transition-all duration-500 hover:brightness-125"
                style={{
                  height: `${Math.max(heightPct, 4)}%`,
                  background: b.users > 0 ? 'linear-gradient(180deg, #facc15 0%, rgba(250,204,21,0.1) 100%)' : 'rgba(255,255,255,0.02)',
                }}
              />
              {i % 4 === 0 && (
                <span className="absolute -bottom-5 text-[7px] font-bold text-white/20">{b.hour.getHours()}h</span>
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
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 h-full">
      <div className="mb-4 flex items-center gap-2">
        <Smartphone className="h-4 w-4 text-blue-400" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Devices (30d)</p>
      </div>
      {total === 0 ? (
        <p className="py-8 text-center text-[10px] text-white/20">No data available</p>
      ) : (
        <div className="space-y-3">
          {devices.map((d) => {
            const pct = (Number(d.count) / total) * 100
            const color = DEVICE_COLORS[d.device] ?? '#94a3b8'
            return (
              <div key={d.device} className="space-y-1">
                <div className="flex items-center justify-between text-[8px] font-bold uppercase">
                  <span className="text-white/60">{d.device}</span>
                  <span className="text-white/40">{pct.toFixed(0)}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full" style={{ backgroundColor: color }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function HeatmapCard({ heatmap }: { heatmap: HeatmapRow[] }) {
  const cells: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0))
  heatmap.forEach((r) => { cells[r.day_of_week][r.hour_of_day] = Number(r.count) })
  const max = Math.max(1, ...heatmap.map((r) => Number(r.count)))

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 h-full">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-purple-400" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Activity Heatmap</p>
      </div>
      <div className="space-y-1">
        {cells.map((row, dow) => (
          <div key={dow} className="flex items-center gap-2">
            <span className="w-6 shrink-0 text-[7px] font-black text-white/20 uppercase">{DAY_NAMES[dow]}</span>
            <div className="flex flex-1 gap-1">
              {row.map((count, hr) => (
                <div
                  key={hr}
                  className="aspect-square flex-1 rounded-sm transition-all"
                  style={{
                    background: count === 0 ? 'rgba(255,255,255,0.02)' : `rgba(167,139,250,${0.2 + (count/max) * 0.8})`,
                  }}
                  title={`${DAY_NAMES[dow]} ${hr}h: ${count} events`}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="mt-2 flex items-center justify-between text-[7px] font-bold text-white/10 px-8">
          <span>00H</span><span>06H</span><span>12H</span><span>18H</span><span>23H</span>
        </div>
      </div>
    </div>
  )
}

function GeographyCard({ geography }: { geography: GeographyRow[] }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-emerald-400" />
          <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Global Distribution</p>
        </div>
        <p className="text-[8px] text-white/20 font-bold uppercase">{geography.length} Active Nodes</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {geography.slice(0, 8).map((g, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01]">
            <MapPin className="h-4 w-4 text-white/10" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold text-white/80">{g.city || 'Unknown Node'}</p>
              <p className="truncate text-[8px] text-white/20 font-mono">{g.ip}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-emerald-500">{g.events}</p>
              <p className="text-[7px] text-white/20 uppercase">Hits</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
