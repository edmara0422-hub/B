import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createGateway } from '@ai-sdk/gateway'

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1/ai',
})

const GATEWAY_MODELS = [
  'google/gemini-2.5-flash-preview-05-20',
  'anthropic/claude-sonnet-4-5',
  'openai/gpt-4o',
  'google/gemini-2.5-pro-preview-06-05',
]

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const GROQ_MODELS = [
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'llama-3.2-11b-vision-preview',
]

const EIT_PROMPT = `Você é um intensivista lendo um monitor de Tomografia por Bioimpedância Elétrica (EIT/PulmoVista) do pulmão.

Equipamentos típicos: Drager PulmoVista 500 (Infinity C500), Sentec LuMon, Timpel Enlight, Swisstom BB². O cinto eletrodos divide o tórax em ROIs (regiões de interesse) — geralmente 4 ROIs (anterior superior → posterior inferior, isto é, ROI 1 = ventral, ROI 4 = dorsal em decúbito dorsal).

Podem chegar 1 a 10 imagens. Combine as informações de todas.

═══ O QUE EXTRAIR ═══

1) **DISTRIBUIÇÃO DA VENTILAÇÃO POR ROI (%)**
   - TV Global = 100 (referência)
   - TV ROI 1 (ventral/anterior superior): % e valor numérico
   - TV ROI 2: %
   - TV ROI 3: %
   - TV ROI 4 (dorsal/posterior inferior): %
   Os números aparecem geralmente à direita da tela em colunas TV ROI 1-4

2) **FREQUÊNCIA RESPIRATÓRIA** (Freq. corr. /min)

3) **CURVAS GLOBAIS E POR ROI** — descreva o padrão visível:
   - Picos sincrônicos → ventilação homogênea
   - ROI 4 (dorsal) com amplitude muito menor → atelectasia posterior
   - ROIs ventrais com amplitude muito maior → distribuição preferencial ventral (típico SDRA)
   - Aumento de amplitude posterior pós-manobra → recrutamento eficaz

4) **IMAGEM DINÂMICA / TIDAL** — observe áreas:
   - Azul intenso = ventilando bem
   - Branco/cor diferente = pouca ventilação ou silent space
   - Distribuição assimétrica E-D = atelectasia/pneumonia lobar
   - Áreas pretas no campo torácico = silent spaces / atelectasia

═══ CÁLCULOS DERIVADOS ═══

▸ **Center of Ventilation (CoV)** — calcular se possível:
   CoV = (ROI 1 × 0.125 + ROI 2 × 0.375 + ROI 3 × 0.625 + ROI 4 × 0.875) / 100
   - 0.5 (50%) = centro ideal (ventilação equilibrada)
   - <0.45 (<45%) = ventilação preferencial ventral (atelectasia dorsal)
   - >0.55 (>55%) = ventilação preferencial dorsal (raro, sobrecarga dorsal)

▸ **Razão Anterior/Posterior**:
   (ROI 1 + ROI 2) / (ROI 3 + ROI 4)
   - ~1.0 = equilibrado
   - >1.5 = heterogeneidade significativa (recrutamento limitado posterior)
   - >2.0 = atelectasia dorsal crítica

▸ **Silent Spaces (estimativa)**:
   Áreas com ventilação <10% comparada ao restante → silent spaces dependentes (atelectasia) ou não-dependentes (hiperdistensão)

═══ INTERPRETAÇÃO CLÍNICA ═══

▸ **Atelectasia dorsal**: ROI 3+4 muito baixos (<30% somados) + áreas pretas posteriores
  Conduta: PRONA + RECRUTAMENTO + PEEP otimizada (titular por EIT)

▸ **Hiperdistensão ventral**: ROI 1+2 muito altos com PEEP alta + perda de complacência ventral
  Conduta: REDUZIR PEEP + reduzir VC

▸ **Resposta ao recrutamento**:
  - Compare TVs antes/depois: se ROI 3+4 aumentou e CoV se desloca para 50% = SUCESSO
  - Sem alteração ou piora dos ROIs ventrais = falha do recrutamento

▸ **Indicação de prona**:
  CoV <0.45 + atelectasia dorsal + P/F <150 → forte indicação de prona

═══ FORMATO DE RETORNO ═══

Retorne APENAS JSON válido:
{
  "freq_corr": 22,
  "tv_global_pct": 100,
  "rois": {
    "roi1_pct": 42,
    "roi2_pct": 30,
    "roi3_pct": 18,
    "roi4_pct": 6
  },
  "cov": 0.32,
  "razao_ant_post": 4.0,
  "distribuicao": "ventral predominante" | "equilibrada" | "dorsal predominante",
  "atelectasia_dorsal": true | false,
  "hiperdistensao_ventral": true | false,
  "silent_spaces": "dorsal" | "ventral" | "nenhum",
  "padroes": [
    "Atelectasia dorsal severa",
    "Heterogeneidade pulmonar",
    "Silent spaces posteriores"
  ],
  "condutas_sugeridas": [
    "Considerar posição prona (P/F <150 + CoV <0.45)",
    "Titular PEEP por EIT (recrutamento)",
    "Avaliar manobra de recrutamento"
  ],
  "confidence": "alta" | "media" | "baixa",
  "notes": "Observação clínica breve"
}

REGRAS:
- Se a foto não mostra os valores das ROIs claramente, retorne null nos campos numéricos
- Não invente valores — só retorne o que conseguir ler
- Em "padroes" e "condutas_sugeridas", retorne strings descritivas curtas em pt-BR`

function extractJson(content: string): string {
  const m = content.match(/\{[\s\S]*\}/)
  if (m) return m[0]
  if (content.includes('```json')) return content.split('```json')[1].split('```')[0]
  if (content.includes('```')) return content.split('```')[1].split('```')[0]
  return content.trim()
}

type ContentBlock = { type: 'image'; image: string } | { type: 'text'; text: string }

async function callGroqFallback(images: { base64: string; mime: string }[]): Promise<Record<string, unknown>> {
  const imageBlocks = images.map(img => ({
    type: 'image_url' as const,
    image_url: { url: `data:${img.mime};base64,${img.base64}` },
  }))
  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: [...imageBlocks, { type: 'text', text: EIT_PROMPT }] }],
          temperature: 0.1,
          max_tokens: 1200,
        }),
      })
      if (!response.ok) continue
      const data = await response.json()
      const raw = data.choices?.[0]?.message?.content
      if (!raw) continue
      return JSON.parse(extractJson(raw))
    } catch {
      continue
    }
  }
  throw new Error('Todos os modelos Groq falharam')
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]
    if (!files.length) return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 })

    const images = await Promise.all(
      files.map(async (file) => {
        const ab = await file.arrayBuffer()
        return { base64: Buffer.from(ab).toString('base64').replace(/[\r\n]/g, ''), mime: file.type || 'image/jpeg' }
      })
    )

    console.log(`[EIT Scan] ${images.length} imagem(ns) recebida(s)`)
    let aiResult: Record<string, unknown> | null = null

    if (process.env.AI_GATEWAY_API_KEY) {
      for (const modelId of GATEWAY_MODELS) {
        try {
          const contentBlocks: ContentBlock[] = [
            ...images.map(img => ({ type: 'image' as const, image: `data:${img.mime};base64,${img.base64}` })),
            { type: 'text', text: EIT_PROMPT },
          ]
          const { text } = await generateText({
            model: gateway(modelId),
            messages: [{ role: 'user', content: contentBlocks }],
            temperature: 0.1,
          })
          aiResult = JSON.parse(extractJson(text))
          break
        } catch (err) {
          console.warn(`[EIT Scan] Gateway falhou (${modelId}):`, err instanceof Error ? err.message : err)
        }
      }
    }

    if (!aiResult && GROQ_API_KEY) {
      aiResult = await callGroqFallback(images)
    }

    if (!aiResult) return NextResponse.json({ error: 'Todos os modelos de visão falharam' }, { status: 502 })
    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}
