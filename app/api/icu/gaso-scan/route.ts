import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createGateway } from '@ai-sdk/gateway'

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1/ai',
})

const GATEWAY_MODELS = [
  'google/gemini-1.5-flash',
  'openai/gpt-4o-mini',
  'openai/gpt-4o',
  'google/gemini-1.5-pro',
  'anthropic/claude-3-5-sonnet',
]

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const GROQ_MODELS = [
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'llama-3.2-11b-vision-preview',
]

const GASO_PROMPT = `Você é um intensivista lendo uma gasometria (arterial ou venosa).
 
 Podem ser enviadas múltiplas imagens (frente/verso do laudo, fotos de partes diferentes). Analise todas juntas.
 
 OBJETIVO: Extrair os 8 valores essenciais, classificar se é arterial ou venosa, E produzir uma análise clínica direta, lógica e concisa.
 
 VALORES A EXTRAIR:
 1. pH (ex: 7.36)
 2. PaCO2 / pCO2 (mmHg, ex: 45)
 3. PaO2 / pO2 (mmHg, ex: 80 arterial / 35-45 venosa)
 4. HCO3 / Bicarbonato (mEq/L ou mmol/L, ex: 24)
 5. BE / Base Excess (mEq/L, pode ser negativo, ex: -2 ou +3)
 6. SaO2 / SatO2 / SO2 (%, ex: 96 arterial / 65-75 venosa)
 7. Lactato (mmol/L ou mg/dL — se em mg/dL, converter dividindo por 9 para mmol/L)
 8. FiO2 (% — valor da fração inspirada de O2 no momento da coleta. Procure por "FiO2", "FIO2", "FIO₂", "O2 insp", "ar ambiente=21%". Aceita formato 0.40 → converter para 40)
 9. laudo (Uma análise clínica e lógica extremamente concisa e objetiva em português. Máximo de 3-4 bullet points rápidos apontando o diagnóstico ácido-base e sugestões de condutas práticas e ajustes terapêuticos. Sem enrolação, sem parágrafos longos, focado em tomadas de decisão rápidas à beira do leito.)
 
 CLASSIFICAÇÃO ARTERIAL vs VENOSA:
 - ARTERIAL: PaO2 normalmente 70-100 mmHg, SaO2 >90%, pH 7.35-7.45
 - VENOSA: PvO2 normalmente 35-45 mmHg, SvO2 65-75%, pH 7.32-7.42
 - Use o conjunto dos valores para decidir, não um isolado
 - Se o laudo declarar explicitamente "arterial" ou "venoso", use isso
 
 REGRAS:
 - Se um valor estiver ausente ou ilegível, retorne null
 - IMPORTANTE: Se a FiO2 NÃO estiver escrita explicitamente no papel da gasometria, retorne "fio2": null. É proibido deduzir ou inventar um valor (como 21%) se ele não constar na imagem. Se "fio2" for null, NÃO calcule e nem cite a relação PaO2/FiO2 na análise lógica ("laudo"), registrando que a relação P/F não pôde ser medida por falta da FiO2.
 - Lactato: aceitar formatos "1.5 mmol/L", "13.5 mg/dL" (converter), "Lac 2.0"
 - BE: pode aparecer como "BE", "EB", "Base Excess" — pode ser positivo ou negativo
 - FiO2: se ar ambiente, retorne 21. Se vier como 0.21–1.00, converta para 21–100
 - Ignore valores duplicados (alguns laudos repetem ABG e VBG)
 
 RETORNE APENAS JSON VÁLIDO (sem markdown, sem texto fora do JSON):
 {
   "ph": 7.36,
   "paco2": 45,
   "pao2": 80,
   "hco3": 24,
   "be": -2,
   "sao2": 96,
   "lactato": 1.5,
   "fio2": 40,
   "type": "arterial" | "venosa" | "indefinido",
   "confidence": "alta" | "media" | "baixa",
   "notes": "observação breve, ex: lactato convertido de mg/dL, valor ilegível, etc",
   "laudo": "Análise lógica e ajustes sugeridos (direto e conciso em poucas linhas de bullet points)"
 }`

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
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{
            role: 'user',
            content: [...imageBlocks, { type: 'text', text: GASO_PROMPT }],
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

    console.log(`[Gaso Scan] ${images.length} imagem(ns) recebida(s)`)

    let aiResult: Record<string, unknown> | null = null

    const externalCallPromise = (async () => {
      let result: Record<string, unknown> | null = null
      if (process.env.AI_GATEWAY_API_KEY) {
        for (const modelId of GATEWAY_MODELS) {
          try {
            console.log(`[Gaso Scan] Gateway tentando: ${modelId}`)
            const contentBlocks: ContentBlock[] = [
              ...images.map(img => ({
                type: 'image' as const,
                image: `data:${img.mime};base64,${img.base64}`,
              })),
              { type: 'text', text: GASO_PROMPT },
            ]
            const { text } = await generateText({
              model: gateway(modelId),
              messages: [{ role: 'user', content: contentBlocks }],
              temperature: 0.1,
            })
            result = JSON.parse(extractJson(text))
            console.log(`[Gaso Scan] Gateway sucesso: ${modelId}`)
            break
          } catch (err) {
            console.warn(`[Gaso Scan] Gateway falhou (${modelId}):`, err instanceof Error ? err.message : err)
          }
        }
      }

      if (!result && GROQ_API_KEY) {
        console.log('[Gaso Scan] Usando fallback Groq')
        try {
          result = await callGroqFallback(images)
        } catch (err) {
          console.warn('[Gaso Scan] Fallback Groq falhou:', err)
        }
      }
      return result
    })()

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => {
        console.log('[Gaso Scan] Timeout de 15 segundos atingido para chamadas remotas')
        resolve(null)
      }, 15000)
    )

    aiResult = await Promise.race([externalCallPromise, timeoutPromise])

    if (!aiResult) {
      console.log('[Gaso Scan] Falha ou timeout na análise da IA e nenhum fallback simulado ativo')
      return NextResponse.json(
        { error: 'Não foi possível analisar a gasometria. Por favor, tente novamente ou insira os dados manualmente.' },
        { status: 504 }
      )
    }

    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno'
    console.error('[Gaso Scan] Erro:', errMsg)
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}