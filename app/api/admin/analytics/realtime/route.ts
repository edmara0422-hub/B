import { NextResponse } from 'next/server'
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['erbusiness0422@gmail.com'])

// Geolocaliza IPs novos via ip-api.com (sem chave, free tier: 45 req/min).
// Resultado vai pro cache em public.ip_geolocation.
// IMPORTANTE: paralelo + timeout de 3s pra não estourar timeout da serverless function.
async function geolocateMissingIps(admin: ReturnType<typeof getSupabaseAdminClient>, ips: string[]) {
  if (ips.length === 0) return
  const { data: cached } = await admin
    .from('ip_geolocation')
    .select('ip')
    .in('ip', ips)
  const cachedSet = new Set((cached ?? []).map((r: any) => r.ip))
  const missing = ips.filter((ip) => !cachedSet.has(ip))
  if (missing.length === 0) return

  // Limita a 3 IPs por request, em paralelo, com timeout total de 4s
  const toLookup = missing.slice(0, 3)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 4000)

  await Promise.allSettled(
    toLookup.map(async (ip) => {
      try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon`, {
          signal: controller.signal,
        })
        const data = await res.json()
        if (data?.status === 'success') {
          await admin.from('ip_geolocation').upsert({
            ip,
            country: data.country ?? null,
            region: data.regionName ?? null,
            city: data.city ?? null,
            latitude: data.lat ?? null,
            longitude: data.lon ?? null,
          })
        }
      } catch { /* silent — timeout ou erro de rede */ }
    }),
  )
  clearTimeout(timeoutId)
}

export async function GET() {
  // Verify caller is admin
  try {
    const supa = await getSupabaseServerClient()
    const { data: { user }, error: userErr } = await supa.auth.getUser()
    if (userErr || !user) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    const callerEmail = (user.email ?? '').toLowerCase()
    const { data: profile } = await supa.from('profiles').select('role').eq('id', user.id).single()
    const isAllowed = profile?.role === 'admin' || ALWAYS_ADMIN_EMAILS.has(callerEmail)
    if (!isAllowed) return NextResponse.json({ error: 'Permissão negada.' }, { status: 403 })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'auth fail' }, { status: 500 })
  }

  const admin = getSupabaseAdminClient()

  // Fetch all analytics in parallel
  const [devicesRes, heatmapRes, feedRes, concurrentRes, geoRes] = await Promise.all([
    admin.rpc('admin_analytics_devices', { days_back: 30 }),
    admin.rpc('admin_analytics_hourly_heatmap', { days_back: 30 }),
    admin.rpc('admin_analytics_live_feed', { limit_n: 30 }),
    admin.rpc('admin_analytics_concurrent_24h'),
    admin.rpc('admin_analytics_geography', { days_back: 30 }),
  ])

  // Geolocaliza IPs novos FIRE-AND-FORGET (sem await — não bloqueia o response)
  // Próxima chamada (em 30s) vai pegar o cache populado
  const allIps = ((geoRes.data ?? []) as { ip: string }[]).map((r) => r.ip).filter(Boolean)
  if (allIps.length > 0) {
    void geolocateMissingIps(admin, allIps).catch(() => { /* silent */ })
  }

  return NextResponse.json({
    devices: devicesRes.data ?? [],
    heatmap: heatmapRes.data ?? [],
    feed: feedRes.data ?? [],
    concurrent: concurrentRes.data ?? [],
    geography: geoRes.data ?? [],
    timestamp: new Date().toISOString(),
  })
}
