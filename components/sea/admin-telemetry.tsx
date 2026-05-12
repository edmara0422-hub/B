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
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/analytics/realtime')
      if (res.ok) {
        const json = await res.json()
        setData(json)
        setLastUpdate(new Date())
      }
    } catch { /* silent */ }
    finally { setLoading(false) }
  }

  useEffect(() => {
    fetchData()
    intervalRef.current = setInterval(fetchData, 30_000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  if (loading && !data) return <p className="py-6 text-center text-[10px] text-white/40">Carregando telemetria…</p>

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
