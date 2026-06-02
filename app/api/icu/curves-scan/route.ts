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

const CURVES_PROMPT = `

OBRIGATÓRIO: Em sua análise final, você DEVE incorporar as seguintes perspectivas, garantindo uma abordagem multidisciplinar intensiva:
1. COMO CORRIGIR O CASO: Propor intervenções clínicas e ajustes imediatos baseados nos achados.
2. EVOLUÇÃO VENTILATÓRIA (O QUE ESTÁ ACONTECENDO?): Descreva o momento atual da mecânica ventilatória e o prognóstico em curto prazo.
3. INFLUÊNCIA MULTISSISTÊMICA (LABORATÓRIO, NEURO, CARDIO, GASO): Explique explicitamente como o estado neurológico, hemodinâmica cardiovascular, distúrbios laboratoriais/metabólicos e a gasometria estão influenciando ou podem vir a influenciar a evolução ventilatória deste paciente.
4. PARÂMETROS DE DESMAME: Especifique quais metas ou índices devem ser atingidos para iniciar o desmame ventilatório neste contexto.
Você É o ventilador mecânico interpretando seu próprio display.
Tarefa: ler as curvas e loops com rigor clínico, identificar EXATAMENTE os padrões presentes e detectar assincronias com confiança visual alta.

Podem chegar 1 a 10 imagens (P×T, F×T, V×T, loops P-V e F-V). Use todas combinadas.

═══ PRINCÍPIO DE CONSERVADORISMO ═══
Marque um padrão SOMENTE se a assinatura visual está claramente presente. Em dúvida, NÃO marque. Pior errar adicionando padrão inexistente do que omitir. Para assincronias, exigir ocorrência em ≥2 ciclos visíveis (não disparar com 1 ciclo isolado).

═══ PASSO 1 — IDENTIFICAR O MODO (filtra opções compatíveis) ═══
- "VOLUME CONTROL"/"VCV"/"VC-AC" + fluxo quadrado ou desacelerado linear + volume em rampa fixa → VCV
- "PRESSURE CONTROL"/"PCV" + pressão em platô quadrado + fluxo desacelerado livre + volume curvilíneo → PCV
- "PSV"/"SPN-CPAP"/"PS"/"ΔPsup" + deflexão negativa inicial + fluxo desacelerado triggered → PSV

Regra de exclusão por modo (NÃO marque):
- "Fluxo quadrado (VCV normal)" só em VCV
- "Fluxo desacelerado (PCV normal)" só em PCV ou PSV
- Em VCV, NÃO marque "Pico" elevado se for o pico fisiológico da fase resistiva — só se Ppico-Pplato > 10 cmH2O ou clara desproporção

═══ PASSO 2 — ASSINATURAS VISUAIS POR CURVA ═══

▸ PRESSÃO × TEMPO (P×T)

  "Normal - Sincronico Controlado": ciclos idênticos, sem deflexão negativa, intervalo regular → modos controlados sem esforço
  "Normal - Sincronico A/C": ciclos com deflexão negativa pequena no disparo, traçado típico do modo → modo assistido sincronizado
  "Normal - Sincronico Espontaneo": deflexões negativas claras (esforço paciente), platô curto, ciclos irregulares → PSV/SPONT
  "Pico elevado (resistencia aumentada)": Ppico-Pplato > 10 cmH2O OU pico claramente desproporcional ao platô (assinatura: "agulha alta" antes de cair para platô estável). NÃO use em PCV puro (sem pausa não há platô visível).
  "Plato elevado (complacencia reduzida)": platô >30 cmH2O (acima de 35 é crítico). Visível apenas com pausa inspiratória ou em PCV.
  "Pico e Plato elevados": ambos os critérios acima simultaneamente. NÃO marque junto com os 2 isolados.
  "Auto-PEEP (pressao expiratoria final elevada)": final da expiração NÃO retorna à linha PEEP esperada — patamar elevado persistente ANTES do próximo ciclo. Confirmar com F×T (fluxo expiratório não zera).
  "Curva concava (obstrutiva)": subida da pressão é côncava (escavada) em vez de reta/convexa — típico em obstrução
  "Pressao negativa excessiva (esforco aumentado)": deflexão negativa > 5 cmH2O abaixo do PEEP no disparo (esforço grande)
  "Overshoot (excesso de pressao inicial)": espícula pontiaguda isolada NO INÍCIO da inspiração que cai rapidamente — rise time muito rápido
  "Undershoot (pressao insuficiente)": pressão não alcança o setpoint, fica abaixo do alvo esperado
  "Duplo disparo": DOIS picos consecutivos sem expiração entre eles. Marque também em V×T como "Curva em degrau".
  "Esforco ineficaz (trigger nao detectado)": deflexão negativa visível SEM ciclo de pressurização que segue. Marque em ≥2 ocorrências.
  "Ciclagem precoce": TI mais curto que o esforço (geralmente F×T mostra fluxo positivo residual no final). Pressão termina antes da curva fluxo zerar.
  "Ciclagem tardia": espícula/calombo NO FINAL da inspiração (paciente expirando contra a máquina). F×T mostra fluxo já caindo a zero mas pressão ainda alta.

▸ FLUXO × TEMPO (F×T)

  "Fluxo quadrado (VCV normal)": inspiração constante horizontal seguida de queda abrupta. EXCLUSIVO de VCV onda quadrada.
  "Fluxo desacelerado (PCV normal)": pico inicial alto descendo linearmente até 0 ou patamar baixo. Compatível com VCV desacelerado, PCV, PSV.
  "Fluxo expiratorio nao retorna a zero (auto-PEEP)": expiração corta no próximo ciclo SEM tocar zero. Assinatura inequívoca de auto-PEEP/aprisionamento.
  "Pico de fluxo expiratorio reduzido (obstrucao)": pico negativo expiratório baixo (< 30 L/min em adulto) — obstrução
  "Fluxo inspiratorio insuficiente (assincronia de fluxo)": fluxo inspiratório com "scoop" (concavidade côncava) em VCV — paciente puxando mais que oferta
  "Duplo pico inspiratorio": dois picos inspiratórios em um único ciclo — relacionado a duplo disparo
  "Fluxo reverso (ciclagem tardia)": fluxo se torna POSITIVO de novo já no fim da inspiração — paciente exalando contra ciclo
  "Esforco ineficaz visivel no fluxo": pequena variação positiva durante expiração sem disparar ciclo

▸ VOLUME × TEMPO (V×T)

  "Volume nao retorna a zero (vazamento)": V×T fecha em valor positivo, não em zero — diferença = vazamento
  "Volume reduzido (obstrucao ou restricao)": amplitude do volume <300 mL em adulto sem justificativa de tamanho
  "Volume excessivo (auto-trigger)": ciclos com volumes anormais sem disparo do paciente
  "Curva em degrau (duplo disparo)": dois patamares no volume com pequeno vale entre — air stacking
  "Volume instavel ciclo a ciclo": variação >25% entre ciclos consecutivos

▸ LOOP PRESSÃO × VOLUME (P-V)

  "Normal - Padrao sigmoide": forma de S clássica, histerese moderada, fechado na origem
  "Histerese aumentada (recrutamento)": espaço entre as curvas insp/exp LARGO — pulmão recrutável
  "Histerese reduzida (pulmao rigido)": curvas quase coladas, histerese mínima — fibrose/SARA tardia
  "Ponto de inflexao inferior evidente": joelho claro na subida (base) — PII = PEEP ótima estimada
  "Ponto de inflexao superior evidente (hiperdistensao)": joelho no topo — alvéolos atingiram limite
  "Beak sign (hiperdistensao)": topo do loop em forma de BICO de pato (pressão sobe sem ganho de volume) — hiperdistensão crítica
  "Deslocamento para direita (reducao complacencia)": loop "deitado" para direita — menos volume por unidade de pressão
  "Deslocamento para esquerda (melhora complacencia)": loop "em pé" para esquerda — mais volume por unidade de pressão

▸ LOOP FLUXO × VOLUME (F-V)

  "Normal - Formato sigmoide": metade superior arqueada (inspiração), metade inferior triangular (expiração), fecha na origem
  "Loop achatado (restricao)": amplitude horizontal pequena, forma preservada — restrição extrapulmonar
  "Concavidade expiratoria (obstrucao)": curva expiratória "escavada" (asa de gaivota) — broncoespasmo/obstrução
  "Volume reduzido (restricao grave)": loop minúsculo no canto
  "Fluxo expiratorio limitado": platô horizontal reto durante expiração — limitação física
  "Loop irregular (assincronia)": bordas serrilhadas/denteadas — tosse, água, vibração
  "Alargamento do loop (resistencia aumentada)": loop largo verticalmente, fluxo demora a zerar OU não fecha na origem (auto-PEEP/vazamento)

▸ ASSINCRONIAS (campo separado)

  "Esforco ineficaz (Ineffective Effort)": deflexão pressão sem ciclo subsequente, ≥2 ocorrências. Causa: trigger pouco sensível ou auto-PEEP.
  "Duplo disparo (Double Triggering)": 2 ciclos consecutivos colados. Causa: TI ou VC curtos para a demanda.
  "Auto-trigger": ciclos sem deflexão negativa, frequência alta sem motivo. Causa: água, oscilação cardíaca, trigger muito sensível.
  "Assincronia de fluxo (Flow Starvation)": pressão côncava (scoop) em VCV. Causa: fluxo programado abaixo da demanda.
  "Ciclagem precoce (Premature Cycling)": TI corta antes do esforço terminar. Causa: TI curto (PCV) ou % ciclagem alta (PSV).
  "Ciclagem tardia (Delayed Cycling)": espícula terminal, fluxo reverso. Causa: TI longo ou % ciclagem baixa.
  "Disparo reverso (Reverse Triggering)": ciclo controlado induz contração reflexa entrelaçada. Sedação profunda + SARA grave.
  "Breath Stacking": volumes empilhados visíveis em V×T. Risco de barotrauma.
  "Assincronia de PEEP (PEEP insuficiente)": curva P×T mostra disparos sem propulsão por PEEP intrínseca acima da setada.

═══ LIMIARES QUANTITATIVOS (DOS SIMULADORES INTERNOS) ═══

▸ ASSINCRONIAS — assinaturas precisas:
- **Esforço Ineficaz**: deflexão inspiratória de -8 a -10 cmH2O no diafragma (visível como queda abaixo do PEEP), sem fluxo sucessivo. Pequena deflexão positiva no fluxo NÃO atinge limiar de trigger.
- **Duplo Disparo**: 2 ciclos em sequência. Volume EMPILHA (~750-800 mL vs ~450 mL normal = +120% extra). Mini-expiração ~200ms entre os ciclos (fluxo cruza zero brevemente mas não esvazia).
- **Disparo Reverso (PCV)**: reflexo diafragmático no FINAL da inspiração (60-95% do TI). Visual: pequeno "bump" secundário no fluxo + queda de pressão de ~-4 cmH2O + volume extra +35 mL.
- **Autodisparo**: ciclos completos em frequência alta (~2.5x normal) SEM deflexão negativa no disparo. Pode haver oscilações cardíacas na baseline expiratória ou água no circuito.
- **Ciclagem Precoce (PSV)**: pressão cai 6 cmH2O ABAIXO do PEEP após ciclagem (esforço residual ~0.5s). Fluxo vai negativo MAS volta positivo (~35% da amplitude). "Notch" positivo no fluxo pós-ciclagem.
- **Ciclagem Tardia (PCV)**: fluxo CRUZA ZERO e fica NEGATIVO antes do fim do TI (45%+). SPIKE de pressão acima do set no final (paciente empurra contra ventilador). Volume começa a CAIR.
- **Flow Starvation (VCV)**: CONCAVIDADE/SCOOPING patognomônica na curva de PRESSÃO (~8 cmH2O afundamento no meio da inspiração). FLUXO permanece CONSTANTE (onda quadrada). Volume rampa linear normal.
- **Fluxo Excessivo**: OVERSHOOT de pressão ~10 cmH2O acima do set no início. Fluxo pico altíssimo (~80 L/min). Rise Time muito curto (~30ms).

▸ LOOPS F-V — TRÍADE DE OBSTRUÇÃO (confirmação dupla):
1) Pico fluxo exp BAIXO (~-8 L/min vs ~-70 L/min normal)
2) Constantes de tempo equivalentes ou exp >> insp (RC_exp > 0.7s típico DPOC)
3) Loop NÃO fecha na origem (volume residual ~60 mL = auto-PEEP)

▸ LOOPS F-V — RESTRIÇÃO:
- Pico fluxo exp ELEVADO (~-95 L/min vs -70 normal — ar sai rápido)
- VC reduzido (~300 mL vs 600 normal)
- Loop comprimido HORIZONTALMENTE (forma de diamante)
- RC_exp < 0.5s típico SARA

▸ STRESS INDEX (curva de subida da pressão em VCV):
- SI = 1 LINEAR (reta) → complacência constante → ventilação protetora ideal
- SI > 1 CÔNCAVA PRA CIMA (acelera no final, fica mais íngreme) → complacência DIMINUI → hiperdistensão/volutrauma
- SI < 1 CONVEXA (desacelera, achata no final) → complacência AUMENTA → recrutamento alveolar

═══ DESAMBIGUAÇÃO CRÍTICA ═══
1. **Pico elevado vs Pico+Platô elevados**: se Pplato também >30, use "Pico e Plato elevados" (NÃO marque os 2 separados).
2. **Flow Starvation vs Ciclagem Precoce**: starvation tem PRESSÃO côncava em VCV com fluxo QUADRADO constante. Premature tem FLUXO voltando positivo após ciclagem em PSV.
3. **Duplo Disparo vs Autodisparo**: duplo = 2 ciclos colados com EMPILHAMENTO de volume (~750 mL). Auto = ciclos rápidos cheios SEM deflexão de trigger, volumes normais.
4. **Ciclagem Tardia vs Disparo Reverso**: tardia (PCV) = paciente EXPIRA contra ciclo (fluxo negativo no meio do TI). Reverso = contração REFLEXA durante insuflação (bump positivo no fluxo, paciente sedado).
5. **Obstrução vs Restrição (F-V)**: obstrução = pico exp BAIXO + loop ABERTO. Restrição = pico exp ALTO + loop COMPRIMIDO horizontalmente.
6. **Auto-PEEP requer DUPLA confirmação**: P×T patamar elevado + F×T fluxo expiratório não zera ANTES do próximo ciclo. Os dois juntos = certeza, isolado = baixa confiança.
7. **Duplo disparo em P×T DEVE vir** com "Curva em degrau" em V×T + idealmente "Duplo pico inspiratorio" em F×T.
8. **Recorrência ≥2 ciclos**: assinatura precisa aparecer em mais da metade dos ciclos visíveis. 1 ciclo isolado NÃO conta como padrão estabelecido.

═══ CONTEXTO CLÍNICO POR PATOLOGIA (T12) ═══
- **Restritivo (fibrose, SDRA)**: tende a CICLAGEM PRECOCE em PSV (Ti neural curto)
- **Obstrutivo (DPOC, asma)**: tende a CICLAGEM TARDIA em PSV (Ti neural longo) + auto-PEEP recorrente
- **SDRA com drive alto**: risco de DUPLO DISPARO + PENDELLUFT
- **Sedação profunda + SDRA grave**: risco de DISPARO REVERSO
- **Auto-PEEP em DPOC**: titular PEEP externa < auto-PEEP medida (geralmente 70-80%)

═══ PARÂMETROS DE ESFORÇO MUSCULAR (T11) ═══
- Pmusc / 0.75 × Pocc: insuficiente <3-5 cmH₂O | normal 3-15 | excessivo >15
- ΔPes (esofágica): normal −2 a −8 | excessivo < −8 a −12 | insuficiente > −2 a −3
- TFdi (espessamento diafragmático): <15% disfunção/esforço insuficiente | >15% normal
- P0.1: <1.6 sobre-assistência | 1.6-3.5 ideal | >3.5 sub-assistência | >4 falha desmame
- Esses contextos ajudam a confirmar disparo ineficaz (Pmusc alto + sem disparo) vs auto-disparo (Pmusc baixo + ciclos)

═══ INSTRUÇÕES DE RETORNO ═══

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
- Produza uma análise gráfica das curvas e loops de forma extremamente concisa e objetiva em português (salva no campo "laudo"). Máximo de 3-4 bullet points diretos identificando a assincronia ou padrão de onda, e sugerindo os ajustes mecânicos práticos e imediatos no respirador. Sem textos longos.
 
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
   "notes": "observação breve",
   "laudo": "Análise lógica de curvas e ajustes sugeridos (direto e conciso em bullet points rápidos)"
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

    const externalCallPromise = (async () => {
      let result: Record<string, unknown> | null = null
      if (process.env.AI_GATEWAY_API_KEY) {
        for (const modelId of GATEWAY_MODELS) {
          const controller = new AbortController()
          const idTimeout = setTimeout(() => {
            console.log(`[Curves Scan] Abortando ${modelId} devido a timeout de 30s`)
            controller.abort()
          }, 30000)

          try {
            const contentBlocks: ContentBlock[] = [
              ...images.map(img => ({ type: 'image' as const, image: `data:${img.mime};base64,${img.base64}` })),
              { type: 'text', text: CURVES_PROMPT },
            ]
            const { text } = await generateText({
              model: gateway(modelId),
              messages: [{ role: 'user', content: contentBlocks }],
              temperature: 0.1,
              abortSignal: controller.signal,
            })
            clearTimeout(idTimeout)
            result = JSON.parse(extractJson(text))
            break
          } catch (err) {
            clearTimeout(idTimeout)
            console.warn(`[Curves Scan] Gateway falhou ou abortou (${modelId}):`, err instanceof Error ? err.message : err)
          }
        }
      }

      if (!result && GROQ_API_KEY) {
        console.log('[Curves Scan] Usando fallback Groq')
        try {
          result = await callGroqFallback(images)
        } catch (err) {
          console.warn('[Curves Scan] Fallback Groq falhou:', err)
        }
      }
      return result
    })()

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => {
        console.log('[Curves Scan] Timeout de 35 segundos atingido para chamadas remotas')
        resolve(null)
      }, 35000)
    )

    aiResult = await Promise.race([externalCallPromise, timeoutPromise])

    if (!aiResult) {
      console.log('[Curves Scan] Falha ou timeout na análise da IA e nenhum fallback simulado ativo')
      return NextResponse.json(
        { error: 'Não foi possível analisar as curvas de ventilação. Por favor, tente novamente ou insira os dados manualmente.' },
        { status: 504 }
      )
    }

    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}