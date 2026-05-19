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

function buildVmPrompt(perfil?: string, modoSelecionado?: string): string {
  const perfilHint = perfil ? `\n\nPERFIL DO PACIENTE: ${perfil.toUpperCase()}.
Ajuste as faixas esperadas:
- Adulto: VC 6-8 mL/kg, FR 12-20 rpm, Ti via I:E (1:2), PEEP 5-10, Trigger 2-3 L/min, Ciclagem PSV 25%
- Pediátrico: VC 5-8 mL/kg, FR 20-30 rpm, Ti FIXO 0.6-0.8s, PEEP 5-8, Trigger 0.8-1.5 L/min, Ciclagem PSV 10-15%
- Neonatal: VC 4-6 mL/kg, FR 30-60 rpm, Ti FIXO 0.35-0.5s, PEEP 4-6, Trigger 0.2-0.4 L/min, Ciclagem PSV 5-10%, VTe SEMPRE proximal\n` : ''
  const modoHint = modoSelecionado ? `\nMODO SELECIONADO PELO USUÁRIO: ${modoSelecionado}. Se a foto mostrar modo diferente, retorne o modo real lido e mencione em notes.\n` : ''
  return VM_BASE_PROMPT + perfilHint + modoHint
}

const VM_BASE_PROMPT = `Você é um intensivista lendo o display de um ventilador mecânico de UTI.
Você NÃO precisa identificar a marca do equipamento. Foco total em: 1) IDENTIFICAR O MODO, 2) EXTRAIR PARÂMETROS.

Podem ser enviadas múltiplas imagens (tela principal, tela de curvas, painel de parâmetros, fotos de partes diferentes). Analise todas juntas.

═══ PASSO 1 — IDENTIFICAR O MODO (PRIORIDADE MÁXIMA) ═══

PRIMEIRO: Procure por TEXTO explícito na tela:
- "VOLUME CONTROL" / "VCV" / "VC" / "Volume A/C" → VCV
- "PRESSURE CONTROL" / "PCV" / "PC" / "Pressão A/C" / "Pinsp Control" → PCV
- "PSV" / "Pressure Support" / "PS" / "SPN-CPAP" / "SPN" / "SPONT" / "ΔPsup" → PSV
- "PRVC" / "VC+" / "AutoFlow" / "VG" / "Volume Garantido" → PRVC
- "BIPAP" / "BiLevel" / "BiVent" → BIPAP
- "APRV" → APRV
- "HFOV" / "Oscillator" → HFOV
- "NAVA" → NAVA
- "PAV" / "PAV+" → PAV

SE NÃO HOUVER TEXTO CLARO, ANALISE AS CURVAS:

▸ Curva de PRESSÃO:
  - Sobe pico, depois CAI para um platô horizontal antes de descer → **VCV** (com pausa)
  - Sobe rápido até um nível e MANTÉM platô durante TODA a inspiração → **PCV** ou **PSV**
  - Várias respirações com mesmo formato controlado: **PCV/VCV** (sincronizado ou não)
  - Respiração disparada pelo paciente (deflexão negativa inicial) + platô curto: **PSV**

▸ Curva de FLUXO:
  - QUADRADO (constante na inspiração) → **VCV** com onda quadrada
  - DESACELERADO LINEAR → VCV onda desacelerada OU PCV (ambos podem)
  - DESACELERADO LIVRE seguindo esforço do paciente → **PSV**
  - Inspiração não corta no zero (cycles em % do pico) → **PSV** (ciclagem por fluxo)

▸ Curva de VOLUME:
  - Atinge platô fixo no topo de cada ciclo → **VCV/PRVC** (volume garantido)
  - Varia ciclo a ciclo (resultante da pressão) → **PCV/PSV**

REGRA DE OURO: Se vir "VOLUME CONTROL" no topo da tela, é VCV — NÃO interprete como PCV mesmo que veja platô na curva (o platô em VCV é exatamente a pausa inspiratória usada para medir Pplato).

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

═══ REGRA PARA PCV — PC sempre como DELTA acima do PEEP ═══
- Se o display mostra explicitamente "PC" ou "ΔP" com valor pequeno (10-25 típico), use direto como ppico
- Se o display mostra "Pinsp" ou "PIP" como valor MAIOR (>PEEP+10), calcule: ppico = Pinsp - PEEP
- Se o display mostra Ppeak/Ppico medido (curva), NÃO use esse valor — não é o PC seteado
- Em resumo: ppico em PCV = pressão DELTA acima do PEEP (10-25 típico em adulto)

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
- vt (mL — VOLUME CORRENTE EXALADO = VTe, é o que o paciente realmente eliminou. Procure rótulo "VTe", "VT exp", "VT", "Vexh", "VT(L)". Se em Litros 0.402 → converta para 402 mL)
- vc (mL — VC ALVO seteado, só usado em PRVC/VS/ASV/PCV-VG; não confundir com VTe medido)
- ve (L/min — VOLUME MINUTO. Faixa típica adulto: 4-15 L/min. Procure "VE", "MV", "MVe", "MVi". ATENÇÃO: NÃO confunda com I:E (que é uma RAZÃO tipo "1:2"). Se VE não estiver visível, CALCULE: ve = vt × fr / 1000)
- fr (rpm — frequência respiratória, procure "FR", "RR", "f")
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

RETORNE APENAS JSON VÁLIDO (sem markdown, sem texto fora do JSON):
{
  "mode": "VCV",
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

async function callGroqFallback(images: { base64: string; mime: string }[], prompt: string): Promise<Record<string, unknown>> {
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
          messages: [{ role: 'user', content: [...imageBlocks, { type: 'text', text: prompt }] }],
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

    const perfil = (formData.get('perfil') as string | null) ?? undefined
    const modoSelecionado = (formData.get('modoSelecionado') as string | null) ?? undefined
    const prompt = buildVmPrompt(perfil, modoSelecionado)

    const images = await Promise.all(
      files.map(async (file) => {
        const ab = await file.arrayBuffer()
        return {
          base64: Buffer.from(ab).toString('base64').replace(/[\r\n]/g, ''),
          mime: file.type || 'image/jpeg',
        }
      })
    )

    console.log(`[VM Scan] ${images.length} imagem(ns) · perfil=${perfil ?? 'auto'} · modo=${modoSelecionado ?? 'auto'}`)

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
            { type: 'text', text: prompt },
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
      aiResult = await callGroqFallback(images, prompt)
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
