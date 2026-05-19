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

const VM_PROMPT = `Você é um intensivista lendo o display de um ventilador mecânico de UTI. Pode ser qualquer fabricante/modelo:
- Hamilton (G5, C1, C2, C3, C6, T1, MR1)
- Drager (Evita V500/V600/V800, Evita XL/4/2 Dura, Evita Infinity, Savina)
- Maquet/Servo (Servo i, Servo u, Servo s, Servo n, Servo Air)
- GE (Carescape R860, Engström, Aisys CS², Avance)
- Puritan-Bennett / Medtronic / Covidien (840, 980, PB840)
- Mindray (SV300/600/800, SynoVent E5)
- Philips (V60, Respironics V200/V680, Trilogy)
- Newport (HT70/HT70 Plus, e360, e360T)
- Leistung (Luft/Luft3/Luft Pro, Graphnet TS, Tucano)
- Magnamed (FlexiMag, Oxymag, Vita)
- KTK (Compacto Plus)
- Inter5 / Inter7
- Bird (Avian, T-Bird), Vela
- Carefusion AVEA
- VM antigas analógicas com manômetros e mostradores físicos

Podem ser enviadas múltiplas imagens (tela principal, tela de curvas, painel de parâmetros, fotos de partes diferentes). Analise todas juntas.

PASSO 1 — IDENTIFICAÇÃO:
- Marca/modelo (se visível na tela ou pelo layout característico)
- Modo ventilatório atual

MODOS POSSÍVEIS (use exatamente um destes valores):
VCV | PCV | PSV | TuboT | CPAP | BIPAP | PRVC | HFOV | MMV | APRV | VS | ASV | IntelliVENT | SmartCare | PAV | NAVA

Mapeamento de nomes alternativos:
- VCV ↔ "Volume Control", "VC", "IPPV", "CMV", "AC-VC", "A/C Volume", "VC-AC"
- PCV ↔ "Pressure Control", "PC", "AC-PC", "A/C Pressure", "PC-AC"
- PSV ↔ "Pressure Support", "PS", "ASB", "SPONT", "CPAP+PS", "PSV/CPAP"
- PRVC ↔ "Pressure Regulated Volume Control", "VC+", "AutoFlow", "VG", "VC AutoFlow", "VCRP", "PCV-VG"
- BIPAP ↔ "BiLevel", "DuoPAP", "BiVent", "BIPAP Vision", "Bi-Level"
- APRV ↔ "Bi-Vent APRV", "Bilevel APRV"
- VS ↔ "Volume Support", "VSV"
- ASV ↔ "Adaptive Support Ventilation"

═══ CRÍTICO — PCV (P_insp / PC / Pcontrol) ═══
Em PCV, o valor de PC pode ter 2 convenções dependendo do ventilador:
- **Acima do PEEP** (Drager Evita, alguns Servo antigos, Maquet, GE Carescape, Bird, Newport, maioria dos VMs brasileiros): "Pinsp" ou "PC" = valor ADICIONADO ao PEEP. PIP total = PEEP + PC.
- **Absoluto** (Hamilton, Servo i/u modernos, alguns Puritan-Bennett): "Pinsp" ou "Pcontrol" = pressão total absoluta. PIP = Pinsp.

REGRAS DE RETORNO POR MODO:

▸ **PCV** — Em modo PCV, **"ppico" deve ser o valor de PC/Pinsp SETADO no botão/display**, NÃO o PIP medido no manômetro:
  - Se o display/botão mostra "PC 15" (convenção delta), retorne ppico = 15
  - Se o display mostra "Pinsp 35" absoluto com PEEP 20, retorne ppico = 35 - 20 = 15 (delta acima do PEEP)
  - SEMPRE retorne ppico como DELTA acima do PEEP em PCV
  - Use "notes" para indicar a convenção lida ("Drager — PC delta", "Hamilton — Pinsp absoluto convertido para delta")
  - O PIP medido (peak no manômetro/curva) NÃO é o que deve ir em "ppico" para PCV

▸ **VCV / PRVC** — "ppico" = PIP medido (peak inspiratory pressure observado no manômetro/curva)

▸ **PSV** — "ps" = nível de pressão suporte (acima do PEEP). "ppico" = null (não relevante).

▸ **BIPAP** — "ipap" e "epap" como valores absolutos lidos. ppico = null.

▸ **APRV** — phigh/plow/thigh/tlow conforme display. ppico = null.

▸ **HFOV** — mpaw, amplitude, hz, biasflow. ppico = null.

═══ POR MODO — onde focar ═══
- VCV/PRVC: VT (set + medido), Flow (fluxo), PEEP, FiO2, FR, I:E ou TI, Trigger, P.Pico medido. Pause/Pplato só se aparecer (geralmente exige manobra)
- PCV: Pinsp/PC (com regra acima), PEEP, FiO2, FR, TI, Trigger, VT medido (resultante)
- PSV: PS/ASB (suporte), PEEP, FiO2, Trigger, VT medido, FR espontânea
- BIPAP: IPAP, EPAP, FR, FiO2, Trigger
- APRV: P-High, T-High, P-Low, T-Low, FiO2
- HFOV: mPaw, ΔP (amplitude), Hz, TI%, Bias Flow, FiO2
- NAVA: NAVA level (μV), Trigger Edi (μV), PEEP, FiO2
- PAV: % Suporte, PEEP, FiO2, Trigger

PASSO 2 — EXTRAIR PARÂMETROS (use null se não estiver visível):

NUMÉRICOS:
- vt (mL — volume corrente exalado/seteado)
- vc (mL — volume corrente alvo, usado em PRVC/VS/ASV)
- ve (L/min — volume minuto)
- fr (rpm — frequência respiratória)
- peep (cmH2O)
- fio2 (% — 21 a 100; se vier 0.21–1.0, multiplicar por 100)
- ppico (cmH2O — Peak/PIP/Ppeak)
- pplato (cmH2O — Plateau/Pplat — só se visível, normalmente exige manobra)
- pmean (cmH2O — MAP/Pmean)
- ie (string formato "1:2" ou "1:1.5")
- ti (s — tempo inspiratório)
- fluxo (L/min — Flow/Vmax)
- trigger (cmH2O ou L/min — sensibilidade)
- ps (cmH2O — pressão suporte / PS / ASB)
- ipap (cmH2O — BIPAP)
- epap (cmH2O — BIPAP)
- phigh (cmH2O — APRV)
- plow (cmH2O — APRV)
- thigh (s — APRV)
- tlow (s — APRV)
- mpaw (cmH2O — HFOV)
- amplitude (cmH2O — ΔP HFOV)
- hz (Hz — HFOV)
- biasflow (L/min — HFOV)
- nava_level (μV — NAVA, "NAVA Level")
- pav_percent (% — PAV %Support)

REGRAS:
- Se FiO2 aparece como fração (0.40), converta para % (40)
- I:E pode aparecer como "1:2.0" → mantenha "1:2"
- Se valor estiver dual (set/measured), prefira o medido para Ppico/VT exalado
- Em VM antiga analógica, leia o manômetro de pressão (P. Pico) e outros mostradores
- Confidence: alta (tela digital nítida), media (alguns valores ilegíveis), baixa (VM antiga, foto difícil)

RETORNE APENAS JSON VÁLIDO (sem markdown):
{
  "mode": "VCV",
  "brand": "Hamilton G5",
  "params": {
    "vt": 450, "vc": null, "ve": 8.5, "fr": 18, "peep": 10, "fio2": 40,
    "ppico": 28, "pplato": null, "pmean": 12,
    "ie": "1:2", "ti": 1.0, "fluxo": 60, "trigger": -2,
    "ps": null, "ipap": null, "epap": null,
    "phigh": null, "plow": null, "thigh": null, "tlow": null,
    "mpaw": null, "amplitude": null, "hz": null, "biasflow": null,
    "nava_level": null, "pav_percent": null
  },
  "confidence": "alta",
  "notes": "Observação breve se relevante"
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
          messages: [{ role: 'user', content: [...imageBlocks, { type: 'text', text: VM_PROMPT }] }],
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
        return {
          base64: Buffer.from(ab).toString('base64').replace(/[\r\n]/g, ''),
          mime: file.type || 'image/jpeg',
        }
      })
    )

    console.log(`[VM Scan] ${images.length} imagem(ns) recebida(s)`)

    let aiResult: Record<string, unknown> | null = null

    if (process.env.AI_GATEWAY_API_KEY) {
      for (const modelId of GATEWAY_MODELS) {
        try {
          console.log(`[VM Scan] Gateway tentando: ${modelId}`)
          const contentBlocks: ContentBlock[] = [
            ...images.map(img => ({
              type: 'image' as const,
              image: `data:${img.mime};base64,${img.base64}`,
            })),
            { type: 'text', text: VM_PROMPT },
          ]
          const { text } = await generateText({
            model: gateway(modelId),
            messages: [{ role: 'user', content: contentBlocks }],
            temperature: 0.1,
          })
          aiResult = JSON.parse(extractJson(text))
          console.log(`[VM Scan] Gateway sucesso: ${modelId}`)
          break
        } catch (err) {
          console.warn(`[VM Scan] Gateway falhou (${modelId}):`, err instanceof Error ? err.message : err)
        }
      }
    }

    if (!aiResult && GROQ_API_KEY) {
      console.log('[VM Scan] Usando fallback Groq')
      aiResult = await callGroqFallback(images)
    }

    if (!aiResult) {
      return NextResponse.json({ error: 'Todos os modelos de visão falharam' }, { status: 502 })
    }

    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno'
    console.error('[VM Scan] Erro:', errMsg)
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}
