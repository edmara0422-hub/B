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
- VCV ↔ "Volume Control", "VC", "IPPV", "CMV", "AC-VC", "A/C Volume", "VC-AC", "VCV-AC", "Volume A/C", "VOLUME CONTROL"
- PCV ↔ "Pressure Control", "PC", "AC-PC", "A/C Pressure", "PC-AC", "PCV-AC", "Pressão A/C", "PRESSURE CONTROL", "PRESSÃO A/C"
- PSV ↔ "Pressure Support", "PS", "ASB", "SPONT", "CPAP+PS", "PSV/CPAP", "SPN-CPAP", "SPN", "SPONT-CPAP", "Spontaneous CPAP", "CPAP/PS", "PEDIATRIC PS", "ΔPsup"
- PRVC ↔ "Pressure Regulated Volume Control", "VC+", "AutoFlow", "VG", "VC AutoFlow", "VCRP", "PCV-VG"
- BIPAP ↔ "BiLevel", "DuoPAP", "BiVent", "BIPAP Vision", "Bi-Level", "BiPAP-AC"
- APRV ↔ "Bi-Vent APRV", "Bilevel APRV"
- VS ↔ "Volume Support", "VSV"
- ASV ↔ "Adaptive Support Ventilation"

DICA DE DESAMBIGUAÇÃO:
- Se vir "SPN-CPAP" ou "SPN-..." → é PSV (modo espontâneo), NÃO PCV
- Se vir "ΔPsup" no display → indica suporte pressórico, modo PSV
- Se vir botões IPAP/EPAP → BIPAP
- Se vir curvas com plateau quadrado e fluxo descendente típico → PCV
- Se vir curvas com fluxo constante (quadrado) e pressão crescente → VCV
- Se vir curvas com esforço do paciente disparando ciclos com pressão constante → PSV

═══ CRÍTICO — PCV (P_insp / PC / Pcontrol / ΔP) ═══
Em PCV, o valor de PC pode ter 3 convenções dependendo do ventilador:

GRUPO 1 — SOMA (PC é DELTA acima do PEEP):
  Marcas: Drager (Evita XL/V300/V500/V600/V800/Savina), Hamilton (G5/C1/C2/C3/C6/T1),
  Mindray (SynoVent E3/E5, SVT, A7/A9, SV300/600/800), Intermed (Montage, iX5, Ruah),
  Puritan-Bennett 980 (PB980 — moderno), GE Carescape/Engström/Aisys/Avance,
  Leistung Luft/Luft3, Weinmann MEDUMAT, SEA FISIO (brasileiro).
  → PIP = PEEP + PC.

GRUPO 2 — SUBTRAI (PC é PIP ABSOLUTO, máquina calcula delta interno):
  Marcas: Magnamed (OxyMag, FlexiMag, BabyMag), Maquet/Getinge (Servo-i, Servo-s,
  alguns Servo-u/n antigos), Vyaire/CareFusion (Vela, T-Bird, Avea),
  Puritan-Bennett 840 (PB840 — antigo), Tecme (GraphNet Advance/Neo/Ts).
  → PIP = Pinsp. Delta interno = Pinsp - PEEP.

GRUPO 3 — VNI / DOMICILIAR (IPAP/EPAP — ajustado absoluto na via aérea):
  Marcas: Philips Respironics (V60, V60 Plus, Trilogy 100/200/Evo, BiPAP Focus),
  ResMed (Astral 100/150, Stellar 100/150, Lumis).
  → Esses geralmente são BIPAP, não PCV — classifique como BIPAP.

REGRAS DE RETORNO POR MODO:

▸ **PCV** — REGRA OBRIGATÓRIA: "ppico" deve ser o valor de PC/Pinsp SETADO, e SEMPRE como DELTA acima do PEEP:
  - Se a marca pertence ao GRUPO 1 (Drager/Hamilton/Mindray/Intermed/etc) e display mostra "PC 15" → ppico = 15
  - Se a marca pertence ao GRUPO 2 (Magnamed/Servo/PB840/etc) e display mostra "Pinsp 35" com PEEP 20 → ppico = 35 - 20 = 15
  - NÃO retorne o PIP medido (Ppeak/Ppico no monitor lateral) como ppico
  - NÃO retorne o valor absoluto da pressão de pico — apenas o DELTA
  - Em "notes", indique a convenção detectada (ex: "Drager Grupo 1 — PC delta direto: 15")
  - Se não conseguir determinar a marca, retorne ppico = null e explique em "notes"

▸ **VCV / PRVC** — "ppico" = PIP medido (peak inspiratory pressure observado no manômetro/curva)

▸ **PSV** — "ps" = nível de pressão suporte (acima do PEEP). "ppico" = null (não relevante).

▸ **BIPAP** — "ipap" e "epap" como valores absolutos lidos. ppico = null.

▸ **APRV** — phigh/plow/thigh/tlow conforme display. ppico = null.

▸ **HFOV** — mpaw, amplitude, hz, biasflow. ppico = null.

═══ POR MODO — painel completo ═══

▸ **VCV / PRVC (modos a VOLUME)**:
  Ajustes a ler: FiO2, PEEP, VC (mL set), Fluxo (L/min), FR, Trigger, Ti (s) ou I:E
  Monitores: VTe (mL — volume exalado, é o que importa, mais relevante que VC set), VE
  P.Pico medido (Ppeak/Ppico): sempre que visível
  Mapeamento: VC set → vc | VTe medido → vt | Pico medido → ppico

▸ **PCV (modo a PRESSÃO)**:
  Ajustes a ler: FiO2, PEEP, PC/Pinsp/ΔP (com REGRA DELTA acima), FR, Ti (s) ou I:E, Trigger, Rampa (Rise Time/Pramp)
  Monitores: VTe (mL), VE, %Ciclagem (se modo permitir)
  Mapeamento: PC delta → ppico | VTe → vt | rampa → ti (se não tem campo dedicado, usar notes)

▸ **PSV / SPN-CPAP / SPONT (modo ESPONTÂNEO)**:
  Ajustes a ler: FiO2, PEEP, PS/ASB/ΔPsup (suporte acima do PEEP), Trigger, Rampa, %Ciclagem (E-cycle %)
  Monitores: VTe (mL), VE, FR REAL do paciente (não setada!)
  Mapeamento: PS → ps | VTe → vt | FR real → fr

▸ **BIPAP / VNI**:
  Ajustes: IPAP, EPAP, FR, FiO2, Trigger, Rampa
  Mapeamento: IPAP → ipap | EPAP → epap

▸ **APRV**: P-High, T-High, P-Low, T-Low, FiO2
▸ **HFOV**: mPaw, ΔP (amplitude), Hz, TI%, Bias Flow, FiO2
▸ **NAVA**: NAVA level (μV), Trigger Edi (μV), PEEP, FiO2
▸ **PAV**: % Suporte, PEEP, FiO2, Trigger

═══ NEONATAL / PEDIÁTRICO — atenção especial ═══
Em pacientes pediátricos/neonatais:
- **VTe sempre relevante** (tubo sem cuff = vazamento, set ≠ entregue ≠ exalado)
- **Ti em segundos** (0.35–0.6s típico), NÃO use I:E
- **Trigger ultra-sensível**: 0.2–0.5 L/min (não 2–3 como adulto)
- **FR alta**: 30–60 rpm normal
Se detectar paciente neo (Ti <1s + FR >25), mencione em "notes".

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
