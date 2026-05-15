import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''

// Fallback model chain: tenta modelos em ordem até ter sucesso
const VISION_MODELS = [
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'meta-llama/llama-4-maverick-17b-128e-instruct',
  'llama-3.2-11b-vision-preview',
]

const prompt = `Você é um sistema especialista em análise de imagens médicas de UTI. Analise esta imagem com rigor clínico.

TAREFAS OBRIGATÓRIAS:
1. Identifique o tipo de exame (RX, TC, USG, RM, Broncoscopia, etc.) e região anatômica.
2. Liste TODOS os achados clínicos relevantes em português: pulmonares, cardíacos, pleurais, mediastinais, abdominais, neurológicos, vasculares e ósseos.
3. Se for RX ou TC de Tórax com Tubo Orotraqueal (TOT) visível:
   a. Identifique a Carina (bifurcação traqueal) — normalmente em T4-T5.
   b. Localize a ponta do TOT.
   c. Meça a distância da ponta do TOT até a Carina em centímetros.
   d. Aplique RIGOROSAMENTE esta classificação clínica:
      - ADEQUADO: ponta do TOT a 2-3 cm ACIMA da carina → posição correta
      - ALERTA_SUBIDO: ponta do TOT a mais de 3 cm da carina → tubo alto demais, risco de extubação acidental. Conduta: avançar o tubo.
      - ALERTA_BAIXO: ponta do TOT a menos de 2 cm da carina → tubo próximo demais, risco de intubação seletiva. Conduta: retrair o tubo.
      - CRITICO_SELETIVO: ponta do TOT no brônquio direito ou esquerdo (abaixo da carina) → intubação seletiva. Achados: hipotransparência unilateral, colapso do pulmão contralateral.
   e. Se houver graduação visível no tubo ou inferível, estime a fixação no lábio em cm.
   f. direction deve refletir o problema: "SUBIDO" (>3cm da carina), "PROXIMO_CARINA" (<2cm), "ADEQUADO" (2-3cm), "SELETIVO" (no brônquio).
   g. OBRIGATÓRIO: estime as coordenadas da ponta do TOT e da carina como fração da imagem (0.0 = borda esquerda/topo, 1.0 = borda direita/baixo). Use os marcos anatômicos visíveis para posicionar com a maior precisão possível.
4. Avalie o posicionamento de TODOS os dispositivos: TOT, SNE, CVC, Swan-Ganz, drenos, marca-passos.
5. Gere um laudo sucinto e objetivo em português.

ATENÇÃO CRÍTICA: Distância grande do TOT à carina = tubo SUBIDO (muito alto na traqueia). NÃO confunda com "próximo à carina". Exemplo: TOT a 4,5 cm da carina = tubo SUBIDO, não próximo.

RETORNE APENAS JSON válido, sem markdown, sem texto extra:
{
  "findings": ["Achado 1", "Achado 2"],
  "report": "Laudo em português com interpretação clínica e conduta sugerida",
  "measurements": {
    "tot_to_carina_cm": 0,
    "status": "ADEQUADO|ALERTA_SUBIDO|ALERTA_BAIXO|CRITICO_SELETIVO",
    "direction": "ADEQUADO|SUBIDO|PROXIMO_CARINA|SELETIVO",
    "alert": "Descrição do problema e conduta (null se ADEQUADO)",
    "rim_labial_cm": 0,
    "seletiva": false,
    "seletiva_side": "direita|esquerda|null",
    "tube_tip_pct": { "x": 0.5, "y": 0.35 },
    "carina_pct":   { "x": 0.5, "y": 0.55 }
  },
  "deviceStatus": {
    "tot": "descrição do posicionamento",
    "sne": "descrição ou null",
    "central_access": "descrição ou null",
    "outros": "outros dispositivos ou null"
  }
}`

async function callGroq(base64Image: string, model: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
            { type: 'text', text: prompt },
          ],
        },
      ],
      temperature: 0.1,
      max_tokens: 1500,
    }),
  })

  return response
}

function extractJson(content: string): string {
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (jsonMatch) return jsonMatch[0]
  if (content.includes('```json')) return content.split('```json')[1].split('```')[0]
  if (content.includes('```')) return content.split('```')[1].split('```')[0]
  return content.trim()
}

export async function POST(req: NextRequest) {
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ_API_KEY não configurada' }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64Image = Buffer.from(arrayBuffer).toString('base64').replace(/[\r\n]/g, '')

    console.log(`[Vision API] Imagem: ${file.name} (${Math.round(arrayBuffer.byteLength / 1024)} KB)`)

    let lastError = ''
    let aiResult: Record<string, unknown> | null = null

    for (const model of VISION_MODELS) {
      try {
        console.log(`[Vision API] Tentando modelo: ${model}`)
        const response = await callGroq(base64Image, model)

        if (!response.ok) {
          const errorText = await response.text()
          console.warn(`[Vision API] ${model} falhou (${response.status}):`, errorText.slice(0, 300))
          lastError = `${model}: HTTP ${response.status}`
          continue
        }

        const data = await response.json()
        const rawContent = data.choices?.[0]?.message?.content

        if (!rawContent) {
          lastError = `${model}: resposta vazia`
          continue
        }

        const jsonStr = extractJson(rawContent)
        aiResult = JSON.parse(jsonStr)
        console.log(`[Vision API] Sucesso com modelo: ${model}`)
        break
      } catch (modelErr: unknown) {
        const errMsg = modelErr instanceof Error ? modelErr.message : String(modelErr)
        console.warn(`[Vision API] Erro com ${model}:`, errMsg)
        lastError = `${model}: ${errMsg}`
      }
    }

    if (!aiResult) {
      return NextResponse.json(
        { error: 'Todos os modelos de visão falharam', details: lastError },
        { status: 502 }
      )
    }

    // Integração Tavily (evidência clínica)
    if (process.env.TAVILY_API_KEY && Array.isArray(aiResult.findings) && aiResult.findings.length > 0) {
      try {
        const { tavilySearch } = require('@/lib/tavily')
        const mainFinding = aiResult.findings[0]
        const tav = await tavilySearch({
          query: `${mainFinding} ICU clinical guidelines 2024 2025 management`,
          searchDepth: 'basic',
          maxResults: 2,
        })
        if (tav.results?.length > 0) {
          aiResult.evidence = tav.results.map((r: { title: string; url: string; content: string }) => ({
            title: r.title,
            url: r.url,
            snippet: r.content.slice(0, 200),
          }))
        }
      } catch {
        // Tavily é opcional — falha silenciosa
      }
    }

    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno no servidor'
    console.error('[Vision API] Erro crítico:', errMsg)
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}