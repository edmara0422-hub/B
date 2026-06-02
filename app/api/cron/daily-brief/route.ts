import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// ─────────────────────────────────────────────────────────────
// Vercel Cron Job — chamado automaticamente às 06:00 BRT
// Configurar em vercel.json: { "crons": [{ "path": "/api/cron/daily-brief", "schedule": "0 9 * * *" }] }
// ─────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  // Verificação de segurança: só Vercel Cron pode chamar esta rota
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'https://bs-intelligence.vercel.app'

  try {
    // 1. Gera o brief diário (força novo)
    const briefRes = await fetch(`${baseUrl}/api/admin/strategy/daily-brief`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Usa service key para bypass de auth em execução cron
        'x-cron-secret': cronSecret ?? '',
      },
      body: JSON.stringify({ force: true }),
    })

    // 2. Roda a análise de alertas estratégicos
    const notifyRes = await fetch(`${baseUrl}/api/admin/strategy/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cron-secret': cronSecret ?? '',
      },
    })

    const [briefData, notifyData] = await Promise.all([
      briefRes.json().catch(() => ({})),
      notifyRes.json().catch(() => ({})),
    ])

    console.log('[cron] brief gerado:', briefData)
    console.log('[cron] alertas gerados:', notifyData)

    return NextResponse.json({
      ok: true,
      brief: briefData.brief ?? null,
      alerts_triggered: notifyData.triggered ?? 0,
      ran_at: new Date().toISOString(),
    })
  } catch (e) {
    console.error('[cron] erro:', e)
    return NextResponse.json({ error: 'Cron falhou', detail: String(e) }, { status: 500 })
  }
}