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

function buildEitPrompt(mode: 'simples' | 'titulacao'): string {
  return mode === 'titulacao' ? EIT_TITULACAO_PROMPT : EIT_BASE_PROMPT
}

const EIT_BASE_PROMPT = `Você é um intensivista lendo um monitor de Tomografia por Impedância Elétrica (TIE/EIT) do pulmão.

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
- Em "padroes" e "condutas_sugeridas", retorne strings descritivas curtas em pt-BR

═══ ORIENTAÇÃO ANATÔMICA ═══
- PULMÃO DIREITO = lado ESQUERDO da tela (convenção radiológica universal — todos os fabricantes)
- VENTRAL/anterior = TOPO da imagem (decúbito dorsal)
- DORSAL/posterior = BASE da imagem (decúbito dorsal)
- ROI 1 (topo/ventral) → ROI 4 (base/dorsal) em decúbito dorsal padrão

═══ ALERTAS A IDENTIFICAR (técnicos e clínicos) ═══
- "Baixa qualidade do sinal" / "Eletrodos fora de faixa" → impedância pele >100-200 Ohm
- "Filtro de artefatos ativado" → ruído cardíaco/tremor sendo filtrado
- "Assimetria de ventilação" → intubação seletiva ou pneumotórax
- "Hiperdistensão detectada" → PEEP excessiva nas zonas ventrais
- "Volume corrente baixo" → desconexão ou obstrução maciça

═══ VALORES DE REFERÊNCIA EM DECÚBITO DORSAL SAUDÁVEL ═══
- Ventral (ROI 1 + ROI 2): 35-40% do volume total
- Dorsal (ROI 3 + ROI 4): 60-65% do volume total
- Dorsal ABAIXO de 60% = atelectasia/colapso (necessita PEEP)
- Dorsal ACIMA de 65% = superdistensão dorsal ou pendelluft
- Ventral ABAIXO de 35% = hipoventilação anterior
- Ventral ACIMA de 40% = hiperdistensão compensatória → risco VILI`

const EIT_TITULACAO_PROMPT = `Você é um intensivista analisando uma manobra de TITULAÇÃO DECREMENTAL DE PEEP em monitor de TIE/EIT (Drager PulmoVista, Sentec LuMon, Timpel Enlight, Swisstom).

A imagem geralmente mostra MÚLTIPLAS letras (A, B, C, D, E, F...) marcadas durante a titulação decremental, com:
- 1ª FILEIRA: imagens dinâmicas/tidal de cada degrau
- 2ª FILEIRA: mapa de COLAPSO POR ALTA PRESSÃO (C loss HP) — cor LARANJA = hiperdistensão (zonas ventrais)
- 3ª FILEIRA: mapa de COLAPSO POR BAIXA PRESSÃO (C loss LP) — cor BRANCA/AZUL CLARO = atelectasia (zonas dorsais)
- GRÁFICO DE LINHAS no rodapé: linha amarela = hiperdistensão %, linha branca = colapso %, cruzam-se no PEEP ideal

═══ INTERPRETAÇÃO ═══

▸ **Hiperdistensão (laranja, ventral)**: alvéolos ventrais esticados demais pela PEEP alta. Em PEEPs altas (letras iniciais A, B) é máxima e decresce com a redução da PEEP.

▸ **Colapso (branco, dorsal)**: alvéolos dorsais fechando por PEEP insuficiente. Em PEEPs altas é zero e aumenta progressivamente nas PEEPs baixas (letras finais).

▸ **PEEP IDEAL**: ponto exato onde a SOMA (colapso% + hiperdistensão%) é MÍNIMA. Visualmente: onde as duas linhas do gráfico se cruzam ou ficam mais próximas.

▸ **Margem de segurança**: somar +2 cmH₂O ao valor da PEEP ideal teórica antes de programar no ventilador (previne fechamento tardio).

▸ **Tolerância clínica máxima**: 5-10% de cada (colapso E hiperdistensão simultaneamente).

═══ O QUE EXTRAIR ═══

Para cada letra marcada (A, B, C...), tente extrair:
- PEEP correspondente (se visível)
- % Colapso (C loss LP) — branco/azul
- % Hiperdistensão (C loss HP) — laranja

Calcular:
- Soma colapso + hiperdistensão por degrau
- Letra/PEEP com soma mínima = PEEP IDEAL TEÓRICA
- PEEP recomendada = ideal + 2 cmH₂O

═══ RETORNO ═══

Retorne APENAS JSON válido:
{
  "modo_analise": "titulacao_peep",
  "degraus": [
    { "letra": "A", "peep": 24, "colapso_pct": 0, "hiperdistensao_pct": 25, "soma": 25 },
    { "letra": "B", "peep": 22, "colapso_pct": 0, "hiperdistensao_pct": 18, "soma": 18 },
    { "letra": "C", "peep": 20, "colapso_pct": 2, "hiperdistensao_pct": 12, "soma": 14 },
    { "letra": "D", "peep": 18, "colapso_pct": 5, "hiperdistensao_pct": 6, "soma": 11 },
    { "letra": "E", "peep": 16, "colapso_pct": 8, "hiperdistensao_pct": 3, "soma": 11 },
    { "letra": "F", "peep": 14, "colapso_pct": 15, "hiperdistensao_pct": 1, "soma": 16 }
  ],
  "peep_ideal_teorica": 18,
  "peep_recomendada": 20,
  "letra_ideal": "D",
  "tolerancia_clinica": "5-10% de cada (colapso + hiperdistensão)",
  "interpretacao": "PEEP ideal entre 16-18 cmH₂O (letras D-E). Recomenda-se 20 cmH₂O para segurança (+2 cmH₂O margem).",
  "alertas": [
    "Sinal de boa qualidade",
    "Pulmão recrutável: bases responderam à pressão alta"
  ],
  "confidence": "alta" | "media" | "baixa",
  "notes": "Observações clínicas adicionais"
}

REGRAS:
- Se não conseguir ler valores de algum degrau, retorne null nos campos numéricos
- Se a imagem não é de titulação (apenas tela normal), retorne degraus = [] e indique em notes
- Universal para Drager (C loss HP/LP), Sentec, Timpel — todos têm o mesmo conceito visual`

function extractJson(content: string): string {
  const m = content.match(/\{[\s\S]*\}/)
  if (m) return m[0]
  if (content.includes('```json')) return content.split('```json')[1].split('```')[0]
  if (content.includes('```')) return content.split('```')[1].split('```')[0]
  return content.trim()
}

type ContentBlock = { type: 'image'; image: string } | { type: 'text'; text: string }

async function callGroqFallback(images: { base64: string; mime: string }[], prompt: string): Promise<Record<string, unknown>> {
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
          messages: [{ role: 'user', content: [...imageBlocks, { type: 'text', text: prompt }] }],
          temperature: 0.1,
          max_tokens: 1800,
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

    const modeParam = (formData.get('mode') as string | null) ?? 'simples'
    const mode: 'simples' | 'titulacao' = modeParam === 'titulacao' ? 'titulacao' : 'simples'
    const prompt = buildEitPrompt(mode)

    const images = await Promise.all(
      files.map(async (file) => {
        const ab = await file.arrayBuffer()
        return { base64: Buffer.from(ab).toString('base64').replace(/[\r\n]/g, ''), mime: file.type || 'image/jpeg' }
      })
    )

    console.log(`[EIT Scan] ${images.length} imagem(ns) · modo=${mode}`)
    let aiResult: Record<string, unknown> | null = null

    const externalCallPromise = (async () => {
      let result: Record<string, unknown> | null = null
      if (process.env.AI_GATEWAY_API_KEY) {
        for (const modelId of GATEWAY_MODELS) {
          try {
            const contentBlocks: ContentBlock[] = [
              ...images.map(img => ({ type: 'image' as const, image: `data:${img.mime};base64,${img.base64}` })),
              { type: 'text', text: prompt },
            ]
            const { text } = await generateText({
              model: gateway(modelId),
              messages: [{ role: 'user', content: contentBlocks }],
              temperature: 0.1,
            })
            result = JSON.parse(extractJson(text))
            break
          } catch (err) {
            console.warn(`[EIT Scan] Gateway falhou (${modelId}):`, err instanceof Error ? err.message : err)
          }
        }
      }

      if (!result && GROQ_API_KEY) {
        console.log('[EIT Scan] Usando fallback Groq')
        try {
          result = await callGroqFallback(images, prompt)
        } catch (err) {
          console.warn('[EIT Scan] Fallback Groq falhou:', err)
        }
      }
      return result
    })()

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => {
        console.log('[EIT Scan] Timeout de 15 segundos atingido para chamadas remotas')
        resolve(null)
      }, 15000)
    )

    aiResult = await Promise.race([externalCallPromise, timeoutPromise])

    if (!aiResult) {
      console.log('[EIT Scan] Falha ou timeout na análise da IA e nenhum fallback simulado ativo')
      return NextResponse.json(
        { error: 'Não foi possível analisar a imagem de EIT. Por favor, tente novamente ou insira os dados manualmente.' },
        { status: 504 }
      )
    }
    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}
