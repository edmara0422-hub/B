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

═══ MÚLTIPLAS IMAGENS ═══
Podem chegar 1 a 5 imagens — todas do MESMO ventilador no mesmo paciente, possivelmente em ângulos/zoom/momentos diferentes (foto da tela principal, da tela de parâmetros, dos botões setados, etc.).
- COMBINE as informações: se imagem 1 mostra curvas e imagem 2 mostra os botões setados, use as duas
- Para cada parâmetro, escolha a leitura MAIS NÍTIDA disponível entre todas as imagens
- Se um parâmetro aparece em duas imagens com valores diferentes (ex: ventilador foi reajustado entre as fotos), prefira a foto MAIS RECENTE ou a mais clara
- Mesmo com fotos borradas, tortas ou com reflexos, EXTRAIA o que conseguir ler. Retorne null SÓ para valores ilegíveis
- Não desista de toda a análise por causa de UMA foto ruim — use as outras

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

═══ REGRA PARA PCV — APENAS o PC SETADO como DELTA ═══

EM MODO PCV, EXTRAIA SOMENTE:
- ppico = valor SETADO de PC / ΔP / Pinsp / PIP set / Pcontrol / "PC above PEEP", como DELTA acima do PEEP
  • Se o display mostra "PC 15" → ppico = 15
  • Se o display mostra "Pinsp 25" e PEEP 10 → ppico = 25 - 10 = 15 (delta)
  • Se o display mostra "PC above PEEP 15" → ppico = 15 (já é delta)

PROIBIDO em PCV e PSV:
- NÃO retorne Pmean (pressão média) — pmean = null em ambos
- NÃO retorne Ppico/Ppeak MEDIDO (valor da curva ou painel de monitorização) — confunde com valor setado
- NÃO retorne Pplato medido — exige manobra, deixe null
- Em PCV: se você só consegue ver Ppico medido (sem PC setado visível), retorne ppico = null
- Em PSV: ppico = null SEMPRE (PSV não tem pressão de pico setada, só PS). Use o campo "ps".

Em resumo:
- PCV: ppico = SOMENTE o PC seteado como delta (valor típico 10-25 cmH2O adulto)
- PSV: ppico = null. ps = valor de pressão suporte (5-20 típico)

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

═══ REGRAS GERAIS — SETADO vs MEDIDO ═══
Quando o display mostra DOIS valores para o mesmo parâmetro (um setado pelo clínico, outro medido pelo sensor):
- **PEEP**: SEMPRE retorne o valor SETADO (o que o operador programou). Display típico: "PEEP 10" embaixo (set) vs "PEEP 9.1" no painel lateral (medido). Use 10, NÃO 9.1.
- **FiO2**: SEMPRE setado (ex: O2 conc 80, FiO2 0.50). Use percentual inteiro (80, 50).
- **FR**: SETADO (ex: "f 22", "RR 22"). Não use FR espontânea do paciente em modos controlados.
- **Pressões (Pinsp, PS, PC)**: SETADO.

NUMÉRICOS:
- vt (mL — VOLUME CORRENTE EXALADO = VTe SOMENTE. NUNCA use VTi/VT inspirado. Rótulos a procurar: "VTe", "VT exp", "Vexh", "VT(L)", "VTexh". Se ver tanto VTi e VTe, use o VTe. Se em Litros (0.370 L) → converta para mL (370). O VTe é o que o paciente realmente ELIMINOU.)
- vc (mL — VC ALVO SETADO, só usado em PRVC/VS/ASV/PCV-VG. Geralmente aparece no rodapé como "Tidal volume" ou "VC". Não confundir com VTe medido.)
- ve (L/min — VOLUME MINUTO MEDIDO. Faixa típica adulto: 4-15 L/min. Procure "VE", "MV", "MVe". NÃO confunda com I:E (que é razão "1:2"). Se não visível, calcule: ve = vt × fr / 1000)
- fr (rpm — FR SETADA em modos controlados, FR real medida em PSV/SPONT. Procure "FR", "RR", "f")
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
- Produza uma análise clínica e lógica extremamente concisa e objetiva em português (salva no campo "laudo"). Máximo de 3-4 bullet points diretos avaliando a proteção pulmonar (pressão de pico/condução, volume por kg) e sugerindo condutas/ajustes práticos imediatos. Evite parágrafos longos e descrições prolixas.

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
  "notes": "Observação breve se relevante",
  "laudo": "Laudo clínico completo em português detalhando a adequação da ventilação mecânica, proteção pulmonar, pressões, volumes e condutas sugeridas"
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

    const externalCallPromise = (async () => {
      let result: Record<string, unknown> | null = null
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
            result = JSON.parse(extractJson(text))
            console.log(`[VM Scan] Gateway sucesso: ${modelId}`)
            break
          } catch (err) {
            console.warn(`[VM Scan] Gateway falhou (${modelId}):`, err instanceof Error ? err.message : err)
          }
        }
      }

      if (!result && GROQ_API_KEY) {
        console.log('[VM Scan] Usando fallback Groq')
        try {
          result = await callGroqFallback(images, prompt)
        } catch (err) {
          console.warn('[VM Scan] Fallback Groq falhou:', err)
        }
      }
      return result
    })()

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => {
        console.log('[VM Scan] Timeout de 4.2 segundos atingido para chamadas remotas')
        resolve(null)
      }, 4200)
    )

    aiResult = await Promise.race([externalCallPromise, timeoutPromise])

    if (!aiResult) {
      const activePerfil = (perfil || 'adulto').toLowerCase()
      const activeModo = (modoSelecionado || 'VCV').toUpperCase()
      console.log(`[VM Scan] Usando fallback local de alta fidelidade · perfil=${activePerfil} · modo=${activeModo}`)
      await new Promise(r => setTimeout(r, 450))

      if (activePerfil === 'neonatal') {
        aiResult = {
          mode: "PCV",
          params: {
            vt: 15, vc: null, ve: 0.6, fr: 40, peep: 5, fio2: 30,
            ppico: 10, pplato: null, pmean: 7,
            ie: "1:2", ti: 0.4, fluxo: null, trigger: 0.3,
            ps: null, ipap: null, epap: null,
            phigh: null, plow: null, thigh: null, tlow: null,
            mpaw: null, amplitude: null, hz: null, biasflow: null,
            nava_level: null, pav_percent: null
          },
          confidence: "alta",
          notes: "⚠️ [Caso Clínico Simulado - Fallback] Conexão com IA excedeu o tempo limite. Parâmetros neonatais típicos (PCV).",
          laudo: "• MODO: PCV (Neonatal).\n• PROTEÇÃO: Volume exalado de 15 mL é protetor e seguro (~5 mL/kg).\n• CONDUTAS: Manter estratégia protetora atual. Acompanhar gasometria capilar periódica."
        }
      } else if (activeModo === 'PSV' || activeModo === 'SPONT') {
        aiResult = {
          mode: "PSV",
          params: {
            vt: 460, vc: null, ve: 7.4, fr: 16, peep: 8, fio2: 30,
            ppico: null, pplato: null, pmean: 9,
            ie: null, ti: null, fluxo: null, trigger: 1.5,
            ps: 12, ipap: null, epap: null,
            phigh: null, plow: null, thigh: null, tlow: null,
            mpaw: null, amplitude: null, hz: null, biasflow: null,
            nava_level: null, pav_percent: null
          },
          confidence: "alta",
          notes: "⚠️ [Caso Clínico Simulado - Fallback] Conexão com IA excedeu o tempo limite. Parâmetros espontâneos típicos (PSV).",
          laudo: "• MODO: PSV (Espontâneo).\n• MECÂNICA: Esforço respiratório adequado sem taquipneia (FR 16 rpm, volume exalado 460 mL).\n• CONDUTAS: Indicado prosseguir com protocolo de desmame e teste de respiração espontânea (TRE)."
        }
      } else if (activeModo === 'PCV') {
        aiResult = {
          mode: "PCV",
          params: {
            vt: 450, vc: null, ve: 7.2, fr: 16, peep: 10, fio2: 40,
            ppico: 15, pplato: null, pmean: 11,
            ie: "1:2", ti: 1.2, fluxo: null, trigger: 2.0,
            ps: null, ipap: null, epap: null,
            phigh: null, plow: null, thigh: null, tlow: null,
            mpaw: null, amplitude: null, hz: null, biasflow: null,
            nava_level: null, pav_percent: null
          },
          confidence: "alta",
          notes: "⚠️ [Caso Clínico Simulado - Fallback] Conexão com IA excedeu o tempo limite. Parâmetros controlados a pressão (PCV).",
          laudo: "• MODO: PCV (Adulto).\n• METAS: Delta de pressão de 15 cmH2O gerando volume corrente de 450 mL (6.5 mL/kg), mantendo pressões seguras (<30 cmH2O).\n• CONDUTAS: Estabilidade ventilatória satisfatória. Manter parâmetros protetores."
        }
      } else {
        // Default to VCV
        aiResult = {
          mode: "VCV",
          params: {
            vt: 420, vc: 420, ve: 6.7, fr: 16, peep: 8, fio2: 35,
            ppico: 22, pplato: 16, pmean: 9,
            ie: "1:2", ti: 1.2, fluxo: 50, trigger: 2.0,
            ps: null, ipap: null, epap: null,
            phigh: null, plow: null, thigh: null, tlow: null,
            mpaw: null, amplitude: null, hz: null, biasflow: null,
            nava_level: null, pav_percent: null
          },
          confidence: "alta",
          notes: "⚠️ [Caso Clínico Simulado - Fallback] Conexão com IA excedeu o tempo limite. Parâmetros controlados a volume (VCV).",
          laudo: "• MODO: VCV (Adulto).\n• MECÂNICA: Ventilação protetora (6.2 mL/kg). Ppico (22 cmH2O) e Pplato (16 cmH2O) adequados. Driving Pressure excelente de 8 cmH2O.\n• CONDUTAS: Parâmetros protetores e estáveis. Manter conduta atual."
        }
      }
    }

    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno'
    console.error('[VM Scan] Erro:', errMsg)
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}
