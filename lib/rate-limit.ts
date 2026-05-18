import { NextRequest, NextResponse } from 'next/server'

type RateLimitEntry = { count: number; resetAt: number }

const store = new Map<string, RateLimitEntry>()

function cleanup() {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}

export function rateLimit(options: { limit: number; windowMs: number }) {
  return function check(request: NextRequest): NextResponse | null {
    cleanup()

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'

    const key = `${request.nextUrl.pathname}:${ip}`
    const now = Date.now()
    const entry = store.get(key)

    if (!entry || entry.resetAt < now) {
      store.set(key, { count: 1, resetAt: now + options.windowMs })
      return null
    }

    if (entry.count >= options.limit) {
      return NextResponse.json(
        { error: 'Muitas requisições. Tente novamente em instantes.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
          },
        }
      )
    }

    entry.count++
    return null
  }
}