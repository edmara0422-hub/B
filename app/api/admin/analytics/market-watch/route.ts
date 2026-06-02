import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-admin'
import { tavilySearch, type TavilyResult } from '@/lib/tavily'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['erbusiness0422@gmail.com'])
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

// Cache em memória — 1h TTL (notícias da semana não precisam refresh agressivo)
let cache: { data: unknown; expiresAt: number } | null = null
const CACHE_TTL_MS = 60 * 60 * 1000

export async function GET(request: Request) {
  // Verify admin
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
  const forceRefresh = url.searchParams.get('refresh') === '1'

  if (!forceRefresh && cache && cache.expiresAt > Date.now()) {
    return NextResponse.json({ ...cache.data as Record<string, unknown>, cached: true })
  }

  const GROQ_KEY = process.env.GROQ_API_KEY
  if (!GROQ_KEY) return NextResponse.json({ error: 'GROQ_API_KEY não configurada' }, { status: 500 })

  // Queries paralelas — clinical + market
  const queries = [
    { tag: 'clinical', q: 'fisioterapia intensiva UTI ventilação mecânica novidades 2026' },
    { tag: 'evidence', q: 'ARDS protective ventilation driving pressure latest guidelines 2025 2026' },
    { tag: 'market', q: 'healthtech fisioterapia hospital brasil startup app digital' },
    { tag: 'compliance', q: 'LGPD ANVISA RDC fisioterapia teleconsulta digital saude 2026' },
  ]

  type QueryResult = { tag: string; results: TavilyResult[]; answer?: string }
  let allResults: QueryResult[] = []
  try {
    const settled = await Promise.allSettled(
      queries.map(({ tag, q }): Promise<QueryResult> =>
        tavilySearch({
          query: q,
          searchDepth: 'basic',
          maxResults: 5,
          includeAnswer: true,
          topic: 'general',
        }).then((r) => ({ tag, results: r.results, answer: r.answer })),
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

  // Monta contexto pra Groq — top 3 por categoria
  const contextSections = allResults.map(({ tag, results, answer }) => {
    const items = results.slice(0, 3).map((r) => `• ${r.title}\n  ${r.content.slice(0, 250)}\n  ${r.url}`).join('\n\n')
    return `## ${tag.toUpperCase()}${answer ? `\nResumo Tavily: ${answer}` : ''}\n\n${items}`
  }).join('\n\n---\n\n')

  const systemPrompt = `Você é um analista de mercado especializado em healthtech brasileira, com foco em fisioterapia intensiva e plataformas SaaS clínicas.

REGRAS:
- Português brasileiro técnico e direto
- Cada item ≤ 25 palavras
- Cite a fonte (domínio do URL) entre parênteses
- Foque em IMPLICAÇÕES PRÁTICAS pro Business Syllabus, não em resumo descritivo
- Se algo é hype/marketing, ignore — só evidência ou movimento de mercado real

RETORNE JSON ESTRITO (sem markdown, sem \`\`\`):
{
  "summary": "1 frase resumindo a semana (máx 80 chars)",
  "items": [
    {
      "category": "clinical|evidence|market|compliance",
      "title": "título do achado (4-7 palavras)",
      "implication": "o que isso significa pro SEA (máx 20 palavras)",
      "source_url": "URL completa",
      "source_domain": "ex: amib.org.br",
      "priority": "high|medium|low"
    }
  ],
  "action_for_sea": "1 ação concreta pra SEA fazer essa semana baseada nos achados (máx 25 palavras)"
}

Mínimo 4, máximo 8 items. Priorize compliance > evidência > mercado > clínico.`

  const userPrompt = `Resultados de pesquisa da web (Tavily) sobre temas críticos pro Business Syllabus:

${contextSections}

Analisa e devolve o JSON estruturado. Pense como consultor de fundadora de healthtech.`

  let aiData: Record<string, unknown>
  try {
    const groqRes = await fetch(GROQ_API, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    })
    if (!groqRes.ok) {
      const errText = await groqRes.text()
      return NextResponse.json({ error: `Groq ${groqRes.status}: ${errText.slice(0, 200)}` }, { status: 500 })
    }
    const groqJson = await groqRes.json()
    const content = groqJson?.choices?.[0]?.message?.content ?? '{}'
    aiData = JSON.parse(content)
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'AI fail' }, { status: 500 })
  }

  const result = {
    ...aiData,
    rawCounts: allResults.reduce((acc, r) => { acc[r.tag] = r.results.length; return acc }, {} as Record<string, number>),
    generatedAt: new Date().toISOString(),
    cached: false,
  }

  cache = { data: result, expiresAt: Date.now() + CACHE_TTL_MS }

  return NextResponse.json(result)
}