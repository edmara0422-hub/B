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

const BH_PROMPT = `Você é um especialista em UTI analisando folha(s) de balanço hídrico.

Podem ser enviadas múltiplas imagens (páginas diferentes ou ângulos da mesma folha) — analise todas juntas.

OBJETIVO: Extrair os valores finais de balanço hídrico:
1. BH 24h — balanço das últimas 24 horas (total entradas menos total saídas do dia)
2. BH Acumulado — balanço total desde a internação ou o início registrado

REGRAS DE LEITURA:
- Procure pelos TOTAIS FINAIS, não valores parciais intermediários
- Valores podem estar em mL ou Litros. Se em Litros (ex: "1.5", "-0.8L"), converta para mL (1500, -800)
- Valores POSITIVOS = entradas > saídas (balanço positivo/ganho)
- Valores NEGATIVOS = saídas > entradas (balanço negativo/perda) — pode aparecer como "-500", "(-500)", "500 neg"
- Se houver colunas "Entradas" e "Saídas" sem total explícito, some as colunas e calcule a diferença
- Se uma folha mostrar só BH24 (sem acumulado), retorne null para bhac_ml
- Se não conseguir ler um valor com segurança, retorne null para aquele campo
- Ignore bordas sujas, manchas, rabiscos — foque nos números escritos claramente

RETORNE APENAS JSON VÁLIDO (sem markdown, sem explicação fora do JSON):
{
  "bh24_ml": 500,
  "bhac_ml": 2500,
  "bh24_raw": "texto exato lido para BH24, ex: +500mL ou 1.5L",
  "bhac_raw": "texto exato lido para BHAc, ex: +2500mL",
  "confidence": "alta | media | baixa",
  "notes": "observação breve se relevante, ex: letra ilegível em parte, valor calculado por soma, etc"
}`

function extractJson(content: string): string {
  const m = content.match(/\{[\s\S]*\}/)
  if (m) return m[0]
  if (content.includes('```json')) return content.split('```json')[1].split('```')[0]
  if (content.includes('```')) return content.split('```')[1].split('```')[0]
  return content.trim()
}

type ImageBlock = { type: 'image'; image: string } | { type: 'text'; text: string }

async function callGroqFallback(images: { base64: string; mime: string }[]): Promise<Record<string, unknown>> {
  const imageBlocks = images.map(img => ({
    type: 'image_url' as const,
    image_url: { url: `data:${img.mime};base64,${img.base64}` },
  }))

  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{
            role: 'user',
            content: [...imageBlocks, { type: 'text', text: BH_PROMPT }],
          }],
          temperature: 0.1,
          max_tokens: 800,
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
        return {
          base64: Buffer.from(ab).toString('base64').replace(/[\r\n]/g, ''),
          mime: file.type || 'image/jpeg',
        }
      })
    )

    console.log(`[BH Scan] ${images.length} imagem(ns) recebida(s)`)

    let aiResult: Record<string, unknown> | null = null

    if (process.env.AI_GATEWAY_API_KEY) {
      for (const modelId of GATEWAY_MODELS) {
        try {
          console.log(`[BH Scan] Gateway tentando: ${modelId}`)
          const contentBlocks: ImageBlock[] = [
            ...images.map(img => ({
              type: 'image' as const,
              image: `data:${img.mime};base64,${img.base64}`,
            })),
            { type: 'text', text: BH_PROMPT },
          ]
          const { text } = await generateText({
            model: gateway(modelId),
            messages: [{ role: 'user', content: contentBlocks }],
            temperature: 0.1,
          })
          aiResult = JSON.parse(extractJson(text))
          console.log(`[BH Scan] Gateway sucesso: ${modelId}`)
          break
        } catch (err) {
          console.warn(`[BH Scan] Gateway falhou (${modelId}):`, err instanceof Error ? err.message : err)
        }
      }
    }

    if (!aiResult && GROQ_API_KEY) {
      console.log('[BH Scan] Usando fallback Groq')
      aiResult = await callGroqFallback(images)
    }

    if (!aiResult) {
      return NextResponse.json({ error: 'Todos os modelos de visão falharam' }, { status: 502 })
    }

    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno'
    console.error('[BH Scan] Erro:', errMsg)
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}