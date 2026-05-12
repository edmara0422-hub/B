// Wrapper do Tavily Search API — usado pra research em tempo real
// no Briefing IA, no Tutor clínico e no Market Watch do admin.
// Docs: https://docs.tavily.com/docs/rest-api/api-reference

const TAVILY_API = 'https://api.tavily.com/search'

export type TavilyResult = {
  title: string
  url: string
  content: string
  score: number
  published_date?: string
}

export type TavilySearchOptions = {
  query: string
  searchDepth?: 'basic' | 'advanced'
  maxResults?: number
  includeAnswer?: boolean
  includeDomains?: string[]
  excludeDomains?: string[]
  topic?: 'general' | 'news'
  days?: number // só p/ topic=news
}

export type TavilyResponse = {
  query: string
  answer?: string
  results: TavilyResult[]
  responseTime?: number
}

/**
 * Pesquisa via Tavily com timeout de 10s.
 * Retorna { query, answer, results } ou lança erro.
 */
export async function tavilySearch(opts: TavilySearchOptions): Promise<TavilyResponse> {
  const apiKey = process.env.TAVILY_API_KEY
  if (!apiKey) {
    throw new Error('TAVILY_API_KEY não configurada')
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(TAVILY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query: opts.query,
        search_depth: opts.searchDepth ?? 'basic',
        max_results: opts.maxResults ?? 5,
        include_answer: opts.includeAnswer ?? true,
        include_domains: opts.includeDomains,
        exclude_domains: opts.excludeDomains,
        topic: opts.topic ?? 'general',
        days: opts.days,
      }),
      signal: controller.signal,
    })
    clearTimeout(timer)
    if (!res.ok) {
      const txt = await res.text()
      throw new Error(`Tavily ${res.status}: ${txt.slice(0, 200)}`)
    }
    const data = await res.json()
    return {
      query: data.query,
      answer: data.answer,
      results: (data.results ?? []) as TavilyResult[],
      responseTime: data.response_time,
    }
  } finally {
    clearTimeout(timer)
  }
}
