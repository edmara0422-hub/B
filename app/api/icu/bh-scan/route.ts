import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createGateway } from '@ai-sdk/gateway'

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1/ai',
})

const GATEWAY_MODELS = [
  'google/gemini-1.5-flash',
  'google/gemini-1.5-pro',
  'openai/gpt-4o-mini',
  'openai/gpt-4o',
  'anthropic/claude-3-5-sonnet',
]

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const GROQ_MODELS = [
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'llama-3.2-11b-vision-preview',
]

const BH_PROMPT = `

OBRIGATÓRIO: Em sua análise final, você DEVE incorporar as seguintes perspectivas, garantindo uma abordagem multidisciplinar intensiva:
1. COMO CORRIGIR O CASO: Propor intervenções clínicas e ajustes imediatos baseados nos achados.
2. EVOLUÇÃO VENTILATÓRIA (O QUE ESTÁ ACONTECENDO?): Descreva o momento atual da mecânica ventilatória e o prognóstico em curto prazo.
3. INFLUÊNCIA MULTISSISTÊMICA (LABORATÓRIO, NEURO, CARDIO, GASO): Explique explicitamente como o estado neurológico, hemodinâmica cardiovascular, distúrbios laboratoriais/metabólicos e a gasometria estão influenciando ou podem vir a influenciar a evolução ventilatória deste paciente.
4. PARÂMETROS DE DESMAME: Especifique quais metas ou índices devem ser atingidos para iniciar o desmame ventilatório neste contexto.
Você é um intensivista especialista em UTI analisando folha(s) de balanço hídrico (entradas e saídas de fluidos de pacientes).

Podem ser enviadas múltiplas imagens (páginas diferentes ou ângulos da mesma folha) — analise todas juntas.

OBJETIVO: Extrair com precisão matemática absoluta os valores finais de balanço hídrico de 24 horas e acumulado.

═══ PASSO A PASSO PARA EVITAR ERROS (CRÍTICO) ═══
Para garantir que você não leia valores errados ou cometa erros de digitação/OCR:

1. IDENTIFIQUE E REGISTRE A ESTRUTURA DO BALANÇO:
   - Identifique as colunas de "ENTRADAS" (Soros, Expansões, Medicação, Dieta/Enteral, Via Oral, Sangue/Hemoderivados).
   - Identifique as colunas de "SAÍDAS" (Diurese, Drenos, Evacuação, Sonda Nasogástrica/SNG, Ultrafiltração, Outros).

2. DETECTE DIGITAÇÕES OU ESCRITAS MANUAIS E MATEMÁTICA:
   - Se houver valores por horário (ex: das 07h às 06h), some as entradas e as saídas manualmente para confrontar com o total final escrito na folha.
   - Esboce mentalmente a soma: se o total final lido na folha divergir da sua soma dos horários, analise se houve erro de OCR (ex: ler 0 como 8, ou 1 como 7) na linha de algum horário, e use o valor matematicamente coerente.
   - PRIORIZE a exatidão matemática: se a soma real das linhas der 1500 e o papel estiver escrito 1500, confirme. Se o papel estiver rasurado, calcule a soma exata.

3. ATENÇÃO MÁXIMA A VÍRGULAS E UNIDADES (CUIDADO COM DECIMAIS):
   - "1.5 L" ou "1,5 L" significa 1500 mL.
   - "-0.8 L" significa -800 mL.
   - Valores menores (ex: "150", "200") são em mL.
   - Certifique-se de retornar os valores finais convertidos estritamente para mL (Mililitros) inteiros.

4. SEPARAÇÃO DE VALORES:
   - bh24_ml: Total de Entradas de 24h menos Total de Saídas de 24h.
   - bhac_ml: Balanço acumulado desde a internação (geralmente marcado no topo ou fim como "Acumulado" ou "BH Ac"). Se não estiver escrito na folha, retorne null.

RETORNE APENAS JSON VÁLIDO (sem markdown, sem explicações fora do JSON):
{
  "bh24_ml": 500,
  "bhac_ml": 2500,
  "bh24_raw": "texto exato lido para BH24, ex: +500mL ou 1.5L",
  "bhac_raw": "texto exato lido para BHAc, ex: +2500mL",
  "confidence": "alta" | "media" | "baixa",
  "notes": "Explicação concisa do cálculo matemático realizado e se houve divergência ou rasura resolvida (em português)"
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

    const externalCallPromise = (async () => {
      let result: Record<string, unknown> | null = null
      if (process.env.AI_GATEWAY_API_KEY) {
        for (const modelId of GATEWAY_MODELS) {
          const controller = new AbortController()
          const idTimeout = setTimeout(() => {
            console.log(`[BH Scan] Abortando ${modelId} devido a timeout de 30s`)
            controller.abort()
          }, 30000)

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
              abortSignal: controller.signal,
            })
            clearTimeout(idTimeout)
            result = JSON.parse(extractJson(text))
            console.log(`[BH Scan] Gateway sucesso: ${modelId}`)
            break
          } catch (err) {
            clearTimeout(idTimeout)
            console.warn(`[BH Scan] Gateway falhou ou abortou (${modelId}):`, err instanceof Error ? err.message : err)
          }
        }
      }

      if (!result && GROQ_API_KEY) {
        console.log('[BH Scan] Usando fallback Groq')
        try {
          result = await callGroqFallback(images)
        } catch (err) {
          console.warn('[BH Scan] Fallback Groq falhou:', err)
        }
      }
      return result
    })()

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => {
        console.log('[BH Scan] Timeout de 35 segundos atingido para chamadas remotas')
        resolve(null)
      }, 35000)
    )

    aiResult = await Promise.race([externalCallPromise, timeoutPromise])

    if (!aiResult) {
      console.log('[BH Scan] Falha ou timeout na análise da IA e nenhum fallback simulado ativo')
      return NextResponse.json(
        { error: 'Não foi possível analisar a folha de balanço hídrico. Por favor, tente novamente ou insira os dados manualmente.' },
        { status: 504 }
      )
    }

    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno'
    console.error('[BH Scan] Erro:', errMsg)
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}