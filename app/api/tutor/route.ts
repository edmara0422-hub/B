import { NextRequest, NextResponse } from 'next/server'
import { tavilySearch, type TavilyResult } from '@/lib/tavily'

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? ''
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Detecta se a pergunta merece busca de evidência fresca (Tavily)
// Aciona quando há palavras-chave indicando: guidelines, estudos, novas evidências, controvérsias
function needsEvidence(question: string, selectedText?: string): boolean {
  const fullText = `${question} ${selectedText ?? ''}`.toLowerCase()
  const evidenceTriggers = [
    'guideline', 'diretriz', 'evidência', 'evidencia', 'estudo recente', 'recente',
    'meta-análise', 'meta-analise', 'revisão', 'revisao', 'consenso', 'atualizado',
    'atualização', 'atualizacao', '2024', '2025', '2026', 'novo', 'nova', 'novidade',
    'controvers', 'debate', 'comparativ', 'qual melhor', 'qual e melhor', 'qual a melhor',
    'pesquisa', 'publicado', 'amib', 'sbpt', 'ats', 'ers', 'esicm',
  ]
  return evidenceTriggers.some((kw) => fullText.includes(kw))
}

// Constrói query específica de fisioterapia/medicina pra Tavily
function buildClinicalQuery(question: string, topicTitle: string, moduleId: string): string {
  const moduleKw: Record<string, string> = {
    M1: 'neurology physiotherapy ICU',
    M2: 'mechanical ventilation respiratory therapy ICU',
    M3: 'cardiology rehabilitation ICU',
  }
  const ctx = moduleKw[moduleId] ?? 'physiotherapy intensive care'
  // Usa parte da pergunta + contexto do módulo + tópico atual + filtros temporais
  const cleanQuestion = question.replace(/[?!]/g, '').slice(0, 100)
  return `${cleanQuestion} ${ctx} ${topicTitle} 2024 2025 evidence guidelines`
}

const MODULE_CONTEXT: Record<string, string> = {
  M1: `Módulo 1 — Neurologia e Neurociência aplicada à Fisioterapia:
- Neuroplasticidade, reorganização cortical, mapas somatotópicos
- AVC: classificação, territórios vasculares, escalas (NIHSS, Barthel, Fugl-Meyer)
- Lesão medular: níveis, classificação ASIA, reabilitação funcional
- TCE: escalas de Glasgow, Rancho Los Amigos, manejo em UTI
- Avaliação neurológica: tônus, reflexos, sensibilidade, coordenação
- Doenças neurodegenerativas: Parkinson, Alzheimer, ELA
- Estimulação elétrica funcional, biofeedback, realidade virtual em neuro`,

  M2: `Módulo 2 — Pneumologia e Ventilação Mecânica:
- Fisiologia respiratória: mecânica pulmonar, troca gasosa, V/Q
- Ventilação mecânica invasiva: VCV, PCV, PSV, PRVC, SIMV
- Parâmetros ventilatórios: VT, FR, PEEP, FiO₂, Tinsp, I:E, fluxo
- Mecânica respiratória: complacência estática/dinâmica, resistência, driving pressure
- Monitorização: curvas P×T, F×T, V×T, loops P×V e F×V
- Assincronia paciente-ventilador: tipos, detecção, correção
- SDRA: definição de Berlin, ventilação protetora, prona, recrutamento alveolar
- Desmame ventilatório: critérios de elegibilidade, TRE, preditores (RSBI, P0.1, Pimax)
- Cuff-Leak Test, extubação, VNI pós-extubação
- Gasometria arterial: interpretação, distúrbios ácido-base
- Oxigenoterapia: cateter, máscara, Venturi, HFNC
- Análise gráfica: histerese, WOB, padrão obstrutivo/restritivo
- PEEP test, titulação de PEEP, MRA`,

  M3: `Módulo 3 — Cardiologia e Hemodinâmica:
- Eletrocardiograma: ritmos, arritmias, isquemia, IAM
- Hemodinâmica invasiva: PAM, PVC, Swan-Ganz, DC, SvO₂
- Insuficiência cardíaca: classificação NYHA, fração de ejeção
- Reabilitação cardiovascular: fases, prescrição de exercício
- Drogas vasoativas: noradrenalina, dobutamina, vasopressina
- Monitorização não-invasiva: SpO₂, capnografia
- Exercício em cardiopatas: estratificação de risco, testes funcionais
- TC6, teste ergométrico, limiar anaeróbio`,
}

const SYSTEM_PROMPT = `Você é o **SEA Tutor** — um tutor de elite em Fisioterapia intensiva, respiratória, neurológica e cardiovascular.

## Quem você é
- Fisioterapeuta especialista com pós-doutorado em terapia intensiva
- Professor de referência em VM, neuroreabilitação e cardio
- Raciocínio clínico afiado, baseado em evidências (guidelines AMIB, SBPT, ATS, ERS)
- Linguagem clara, didática e envolvente — usa analogias quando ajuda

## Como responder
1. **Comece pela resposta direta** — sem enrolação
2. **Explique o porquê** — fisiopatologia, mecanismo, evidência
3. **Conecte com a prática clínica** — "na beira do leito isso significa..."
4. **Use exemplos reais** quando possível — "imagine um paciente com DPOC em PSV..."
5. **Destaque pontos-chave** com negrito ou bullets
6. **Se houver controvérsia**, apresente os dois lados e diga qual tem mais evidência

## Regras
- NUNCA diga "como IA" ou "como modelo de linguagem"
- Responda em português brasileiro
- Máximo 5 parágrafos — seja denso e objetivo
- Use termos técnicos com explicação entre parênteses quando necessário
- Se o aluno perguntar algo fora do escopo da fisioterapia, redirecione gentilmente
- Cite referências quando relevante (autor, ano ou guideline)
- Se o trecho selecionado tiver erro, corrija educadamente

## Formatação
- Use **negrito** para conceitos importantes
- Use listas quando organizar melhor o conteúdo
- Use emojis com moderação (⚠️ para alertas, ✅ para correto, 💡 para dicas)
`

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: NextRequest) {
  try {
    const { selectedText, question, topicTitle, moduleId, history = [], forceEvidence = false } = await req.json()

    if (!question?.trim()) {
      return NextResponse.json({ error: 'Pergunta obrigatória' }, { status: 400, headers: CORS_HEADERS })
    }

    const moduleContext = MODULE_CONTEXT[moduleId] ?? 'fisioterapia clínica geral'

    // Busca evidência fresca via Tavily quando a pergunta tem trigger OU foi pedido explicitamente
    let evidenceBlock = ''
    let evidenceSources: Array<{ title: string; url: string }> = []
    const shouldFetchEvidence = forceEvidence || needsEvidence(question, selectedText)

    if (shouldFetchEvidence && process.env.TAVILY_API_KEY) {
      try {
        const tavQuery = buildClinicalQuery(question, topicTitle ?? '', moduleId ?? '')
        const tav = await tavilySearch({
          query: tavQuery,
          searchDepth: 'basic',
          maxResults: 4,
          includeAnswer: true,
        })
        const topResults = tav.results.slice(0, 4) as TavilyResult[]
        if (topResults.length > 0) {
          evidenceSources = topResults.map((r) => ({ title: r.title, url: r.url }))
          evidenceBlock = `\n\n[Evidência fresca da web · Tavily ${new Date().toLocaleDateString('pt-BR')}]\n${tav.answer ? `Resumo: ${tav.answer}\n\n` : ''}${topResults.map((r, i) => `[${i + 1}] ${r.title}\n${r.content.slice(0, 350)}\nFonte: ${r.url}`).join('\n\n')}\n\nUSE essa evidência se for relevante e CITE entre colchetes (ex: [1] ou [2]) no fim das frases que usaram a fonte.`
        }
      } catch (e) {
        console.warn('[tutor] Tavily failed (continuing without evidence):', e instanceof Error ? e.message : e)
      }
    }

    const contextMsg = `[Contexto do módulo]\n${moduleContext}\n\n[Tópico atual]\n${topicTitle}${selectedText ? `\n\n[Trecho selecionado pelo aluno]\n"${selectedText}"` : ''}${evidenceBlock}`

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: contextMsg },
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user', content: question },
    ]

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 1200,
        temperature: 0.4,
        top_p: 0.9,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errBody = await response.text()
      console.error('[tutor] Groq error:', response.status, errBody)
      return NextResponse.json(
        { response: 'Erro ao consultar o tutor. Tente novamente.', source: 'error' },
        { status: 500, headers: CORS_HEADERS }
      )
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content ?? 'Sem resposta do tutor.'

    return NextResponse.json(
      {
        response: text,
        source: evidenceSources.length > 0 ? 'groq+tavily' : 'groq',
        evidence: evidenceSources, // [{ title, url }] — front-end pode renderizar links
      },
      { headers: CORS_HEADERS },
    )
  } catch (err) {
    console.error('[tutor]', err)
    return NextResponse.json(
      { response: 'Não foi possível responder agora. Tente novamente em instantes.' },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
