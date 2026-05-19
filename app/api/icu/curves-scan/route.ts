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

// Opções EXATAS (precisam bater com as strings do form para selecionar os checkboxes)
const PXT = [
  'Normal - Sincronico Controlado',
  'Normal - Sincronico A/C',
  'Normal - Sincronico Espontaneo',
  'Pico elevado (resistencia aumentada)',
  'Plato elevado (complacencia reduzida)',
  'Pico e Plato elevados',
  'Auto-PEEP (pressao expiratoria final elevada)',
  'Curva concava (obstrutiva)',
  'Pressao negativa excessiva (esforco aumentado)',
  'Overshoot (excesso de pressao inicial)',
  'Undershoot (pressao insuficiente)',
  'Duplo disparo',
  'Esforco ineficaz (trigger nao detectado)',
  'Ciclagem precoce',
  'Ciclagem tardia',
]
const FXT = [
  'Normal - Sincronico Controlado',
  'Normal - Sincronico A/C',
  'Normal - Sincronico Espontaneo',
  'Fluxo desacelerado (PCV normal)',
  'Fluxo quadrado (VCV normal)',
  'Fluxo expiratorio nao retorna a zero (auto-PEEP)',
  'Pico de fluxo expiratorio reduzido (obstrucao)',
  'Fluxo inspiratorio insuficiente (assincronia de fluxo)',
  'Duplo pico inspiratorio',
  'Fluxo reverso (ciclagem tardia)',
  'Esforco ineficaz visivel no fluxo',
]
const VXT = [
  'Normal - Sincronico Controlado',
  'Normal - Sincronico A/C',
  'Normal - Sincronico Espontaneo',
  'Volume nao retorna a zero (vazamento)',
  'Volume reduzido (obstrucao ou restricao)',
  'Volume excessivo (auto-trigger)',
  'Curva em degrau (duplo disparo)',
  'Volume instavel ciclo a ciclo',
]
const LPV = [
  'Normal - Padrao sigmoide',
  'Histerese aumentada (recrutamento)',
  'Histerese reduzida (pulmao rigido)',
  'Ponto de inflexao inferior evidente',
  'Ponto de inflexao superior evidente (hiperdistensao)',
  'Beak sign (hiperdistensao)',
  'Deslocamento para direita (reducao complacencia)',
  'Deslocamento para esquerda (melhora complacencia)',
]
const LFV = [
  'Normal - Formato sigmoide',
  'Loop achatado (restricao)',
  'Concavidade expiratoria (obstrucao)',
  'Volume reduzido (restricao grave)',
  'Fluxo expiratorio limitado',
  'Loop irregular (assincronia)',
  'Alargamento do loop (resistencia aumentada)',
]
const ASY = [
  'Sem assincronias',
  'Esforco ineficaz (Ineffective Effort)',
  'Duplo disparo (Double Triggering)',
  'Auto-trigger',
  'Assincronia de fluxo (Flow Starvation)',
  'Ciclagem precoce (Premature Cycling)',
  'Ciclagem tardia (Delayed Cycling)',
  'Disparo reverso (Reverse Triggering)',
  'Breath Stacking',
  'Assincronia de PEEP (PEEP insuficiente)',
]

const CURVES_PROMPT = `Você é um intensivista lendo curvas e loops de um ventilador mecânico.
Você NÃO precisa identificar marca. Foco em: 1) identificar PADRÕES nas curvas, 2) detectar ASSINCRONIAS.

Podem chegar 1 a 10 imagens das curvas (P×T, F×T, V×T, loops P-V e F-V). Analise TODAS.

═══ PADRÕES POR CURVA ═══

▸ PRESSÃO × TEMPO (P×T):
- VCV normal: pico + descida + platô (se houver pausa) — onda triangular/trapezoidal
- PCV normal: subida rápida + platô quadrado durante toda inspiração
- PSV normal: deflexão negativa (esforço) + platô curto
- Pico elevado: pressão de pico >>> platô (resistência alta)
- Platô elevado: platô >35 cmH2O (complacência reduzida)
- Auto-PEEP: pressão expiratória não retorna à PEEP setada
- Curva côncava (obstrutiva): pressão sobe lentamente
- Overshoot: espícula pontiaguda no início (fluxo/rise time alto)
- Undershoot: pressão insuficiente para alcançar set
- Duplo disparo: dois ciclos colados sem expiração entre
- Esforço ineficaz: deflexão negativa SEM ciclo subsequente
- Ciclagem precoce/tardia: TI corta antes/depois do desejo do paciente

▸ FLUXO × TEMPO (F×T):
- Quadrado constante na inspiração → VCV onda quadrada
- Desacelerado linear → VCV desacelerado OU PCV (livre)
- Não retorna a zero antes do próximo ciclo → AUTO-PEEP
- Pico expiratório reduzido → obstrução
- Fluxo inspiratório côncavo/scooping → demanda > oferta (flow starvation)
- Duplo pico → duplo disparo
- Fluxo reverso (positivo no final da inspiração) → ciclagem tardia

▸ VOLUME × TEMPO (V×T):
- Sobe + platô + desce até zero → normal
- Não retorna a zero → vazamento (cuff/circuito)
- Volume excessivo súbito → auto-trigger
- Em degrau → duplo disparo (air stacking)
- Volume instável → assincronia ciclo a ciclo

▸ LOOP PRESSÃO × VOLUME (P-V):
- Sigmoide com histerese moderada → normal
- Histerese larga → recrutamento (PEEP útil)
- Histerese estreita/fina → pulmão rígido (fibrose/SARA tardia)
- Joelho inferior visível → PII (PEEP ótima = PII+2)
- Beak sign (bico) no topo → hiperdistensão
- Loop "deitado" para direita → complacência caiu
- Loop "em pé" para esquerda → complacência melhorou

▸ LOOP FLUXO × VOLUME (F-V):
- Sigmoide normal → fechado na origem
- Achatado → restrição extrapulmonar
- Concavidade expiratória ("scoop" / asa de gaivota) → obstrução/broncoespasmo
- Volume reduzido → restrição grave
- Platô reto na expiração → flow limitation
- Borda serrilhada → assincronia (tosse, água, vibração)
- Não fecha na origem → vazamento ou auto-PEEP

═══ ASSINCRONIAS ═══
- Esforço ineficaz: deflexão na pressão sem fluxo subsequente. Correção: aumentar trigger ou reduzir auto-PEEP
- Duplo disparo: 2 ciclos colados. Correção: aumentar TI/VC
- Auto-trigger: ciclos sem esforço (água no circuito, oscilação cardíaca). Correção: drenar circuito, reduzir sensibilidade
- Flow starvation (fluxo insuficiente): pressão côncava em VCV. Correção: aumentar fluxo ou migrar para PCV
- Ciclagem precoce: TI curto, esforço residual. Correção: aumentar TI (PCV) ou reduzir % ciclagem (PSV→10-15%)
- Ciclagem tardia: TI longo, espícula terminal. Correção: reduzir TI (PCV) ou aumentar % ciclagem (PSV→40-50%)
- Disparo reverso: ciclo controlado dispara contração reflexa. Correção: ajustar sedação
- Breath stacking: volumes empilhados. Correção: aumentar tempo expiratório

═══ INSTRUÇÕES DE RETORNO ═══
Retorne JSON com arrays — cada array contém EXATAMENTE as strings de cada lista abaixo que se aplicam:

curvaPxT: ${JSON.stringify(PXT)}
curvaFxT: ${JSON.stringify(FXT)}
curvaVxT: ${JSON.stringify(VXT)}
loopPV: ${JSON.stringify(LPV)}
loopFV: ${JSON.stringify(LFV)}
assincronia: ${JSON.stringify(ASY)}

REGRAS:
- Use APENAS strings das listas acima, exatamente como escritas
- Para cada curva visível, escolha 1 a 3 padrões que melhor descrevem
- Se a curva não está visível na foto, retorne array vazio []
- Em assincronia, se nenhuma anormalidade, use ["Sem assincronias"]
- "mode" pode ser preenchido se detectar (VCV/PCV/PSV/etc) — opcional

RETORNE APENAS JSON VÁLIDO:
{
  "mode": "VCV" | null,
  "curvaPxT": ["..."],
  "curvaFxT": ["..."],
  "curvaVxT": ["..."],
  "loopPV": ["..."],
  "loopFV": ["..."],
  "assincronia": ["..."],
  "confidence": "alta" | "media" | "baixa",
  "notes": "observação breve"
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
        headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: [...imageBlocks, { type: 'text', text: CURVES_PROMPT }] }],
          temperature: 0.1,
          max_tokens: 1500,
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

    console.log(`[Curves Scan] ${images.length} imagem(ns) recebida(s)`)
    let aiResult: Record<string, unknown> | null = null

    if (process.env.AI_GATEWAY_API_KEY) {
      for (const modelId of GATEWAY_MODELS) {
        try {
          const contentBlocks: ContentBlock[] = [
            ...images.map(img => ({ type: 'image' as const, image: `data:${img.mime};base64,${img.base64}` })),
            { type: 'text', text: CURVES_PROMPT },
          ]
          const { text } = await generateText({
            model: gateway(modelId),
            messages: [{ role: 'user', content: contentBlocks }],
            temperature: 0.1,
          })
          aiResult = JSON.parse(extractJson(text))
          break
        } catch (err) {
          console.warn(`[Curves Scan] Gateway falhou (${modelId}):`, err instanceof Error ? err.message : err)
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
