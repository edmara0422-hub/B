import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-admin'
import { tavilySearch, type TavilyResult } from '@/lib/tavily'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['erbusiness0422@gmail.com'])
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

// Cache 6h — lista de alvos não muda toda hora
let cache: { data: unknown; expiresAt: number } | null = null
const CACHE_TTL_MS = 6 * 60 * 60 * 1000

export async function GET(request: Request) {
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

  const url = new URL(request.url)
  const force = url.searchParams.get('refresh') === '1'
  if (!force && cache && cache.expiresAt > Date.now()) {
    return NextResponse.json({ ...cache.data as Record<string, unknown>, cached: true })
  }

  const GROQ_KEY = process.env.GROQ_API_KEY
  if (!GROQ_KEY) return NextResponse.json({ error: 'GROQ_API_KEY não configurada' }, { status: 500 })
  if (!process.env.TAVILY_API_KEY) return NextResponse.json({ error: 'TAVILY_API_KEY não configurada' }, { status: 500 })

  // 2 buscas paralelas — hospitais alvo + investors healthtech
  const queries = [
    { tag: 'hospitals', q: 'maiores hospitais terciários UTI Sao Paulo Rio Janeiro fisioterapia intensiva' },
    { tag: 'investors', q: 'venture capital healthtech digital health Brasil seed series A 2025 2026' },
    { tag: 'competitors', q: 'app fisioterapia hospital UTI brasil concorrentes saas saude' },
  ]

  type QueryResult = { tag: string; results: TavilyResult[]; answer?: string }
  let allResults: QueryResult[] = []
  try {
    const settled = await Promise.allSettled(
      queries.map(({ tag, q }): Promise<QueryResult> =>
        tavilySearch({ query: q, searchDepth: 'basic', maxResults: 5, includeAnswer: true })
          .then((r) => ({ tag, results: r.results, answer: r.answer })),
      ),
    )
    allResults = settled
      .filter((s): s is PromiseFulfilledResult<QueryResult> => s.status === 'fulfilled')
      .map((s) => s.value)
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'tavily fail' }, { status: 500 })
  }

  if (allResults.length === 0) {
    return NextResponse.json({ error: 'Sem resultados do Tavily' }, { status: 500 })
  }

  const contextSections = allResults.map(({ tag, results, answer }) => {
    const items = results.slice(0, 4).map((r) => `• ${r.title}\n  ${r.content.slice(0, 250)}\n  ${r.url}`).join('\n\n')
    return `## ${tag.toUpperCase()}${answer ? `\nResumo: ${answer}` : ''}\n\n${items}`
  }).join('\n\n---\n\n')

  const systemPrompt = `Você é um BizDev de healthtech brasileira, especialista em prospecção de hospitais clientes e investidores.

Sua função: extrair dos resultados de pesquisa uma lista ACIONÁVEL de:
1. Hospitais alvo prioritários (SP/RJ que têm UTI grande e usariam um app pra fisioterapia)
2. VCs healthtech brasileiros ativos em 2025/2026
3. Concorrentes diretos (apps de fisio/saúde digital)

REGRAS:
- Português brasileiro, direto, sem rodeios
- Cada item ≤ 25 palavras
- Inclua cidade + link sempre que possível
- Priorize APROVEITAMENTO (ex: hospital com UTI grande > hospital pequeno)

RETORNE JSON (sem markdown):
{
  "hospitals": [
    { "name": "Nome do hospital", "city": "São Paulo", "why": "porque é alvo (1 linha)", "url": "link público se houver", "priority": "high|medium|low" }
  ],
  "investors": [
    { "name": "Nome VC", "focus": "early-stage healthtech", "ticket": "tamanho cheque estimado", "url": "link", "priority": "high|medium|low" }
  ],
  "competitors": [
    { "name": "Nome", "positioning": "como se posicionam (1 linha)", "url": "link", "threat": "high|medium|low" }
  ]
}

Mínimo 5 hospitais, 3 investors, 2 concorrentes.`

  let aiData: Record<string, unknown>
  try {
    const groqRes = await fetch(GROQ_API, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Resultados da web (Tavily):\n\n${contextSections}\n\nExtraia listas acionáveis.` },
        ],
        temperature: 0.3,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      }),
    })
    if (!groqRes.ok) {
      const errText = await groqRes.text()
      return NextResponse.json({ error: `Groq ${groqRes.status}: ${errText.slice(0, 200)}` }, { status: 500 })
    }
    const groqJson = await groqRes.json()
    aiData = JSON.parse(groqJson?.choices?.[0]?.message?.content ?? '{}')
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'AI fail' }, { status: 500 })
  }

  const result = {
    ...aiData,
    generatedAt: new Date().toISOString(),
    cached: false,
  }
  cache = { data: result, expiresAt: Date.now() + CACHE_TTL_MS }
  return NextResponse.json(result)
}
