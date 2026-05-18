import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createGateway } from '@ai-sdk/gateway'

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1/ai',
})

const GATEWAY_MODELS = [
  'google/gemini-2.5-flash-preview-05-20',
  'google/gemini-2.5-pro-preview-06-05',
  'anthropic/claude-opus-4-5',
  'anthropic/claude-sonnet-4-5',
  'openai/gpt-4o',
  'meta-llama/llama-4-scout',
]

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
const GROQ_MODELS = [
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'meta-llama/llama-4-maverick-17b-128e-instruct',
  'llama-3.2-11b-vision-preview',
]

function buildPrompt(examType?: string): string {
  const examHint = examType
    ? `\n⚠ ATENÇÃO: O CLÍNICO CLASSIFICOU ESTE EXAME COMO "${examType}". Priorize a análise específica para este tipo. Se a imagem claramente contradizer essa classificação, indique no laudo, mas analise conforme o tipo informado.\n`
    : ''

  return `Você é um radiologista e ultrassonografista de UTI com 20 anos de experiência. Analise a imagem com máxima precisão clínica.
${examHint}
═══ PASSO 1: IDENTIFIQUE O TIPO DE EXAME ═══
Determine com base VISUAL na imagem:
RX-Tórax | RX-Abdome | RX-Coluna-Cervical | RX-Coluna-Lombar | RX-Bacia | RX-MMSS | RX-MMII | RX-Crânio |
TC-Tórax | TC-Crânio | TC-Abdome-Pelve | TC-Coluna | TC-Face | AngioTC-Pulmonar | AngioTC-Coronária |
USG-Pleural | USG-Cardíaco | USG-Abdome | USG-Vias-Biliares | USG-Renal | USG-Vascular | USG-Obstetrico | USG-Tireoide | USG-Partes-Moles | USG-FAST |
RM-Crânio | RM-Coluna | RM-Abdome | RM-Articular | RM-Mama |
Broncoscopia | Endoscopia | Fluoroscopia | Cintilografia | PET-CT | Outro.

SE o tipo informado pelo clínico divergir do que você vê: analise como o tipo informado E mencione a discrepância no laudo.

═══ PASSO 2: ACHADOS POR TIPO DE EXAME ═══

▸ RX-TÓRAX — avalie sistematicamente:
  • Pulmão D: consolidação (lobo/segmento), atelectasia, infiltrado, pneumotórax, hiperinsuflação, padrão intersticial (reticular/reticulonodular/miliar), nódulos
  • Pulmão E: idem
  • Pleura: derrame (D/E — volume: mínimo <175mL/moderado 175-500mL/volumoso >500mL), pneumotórax (tamanho: parcial <20%/subtotal/total), espessamento
  • Coração: índice cardiotorácico (normal <0,5 — especifique o valor estimado), silhueta, arco aórtico
  • Mediastino: alargamento (>8cm ao nível da carina), desvio de traqueia, alargamento hilar (hipertensão pulmonar/adenopatia)
  • Diafragma: elevação (D/E), subdiafragmático livre
  • Ossos: fraturas costais (especifique arcos e numeração), escápulas, clavículas, vértebras visíveis, costelas cervicais
  • Partes moles: enfisema subcutâneo, calcinose, marca-passo, próteses
  • Qualidade técnica: PA/AP, rotação, inspiração (conta costelas posteriores ≥9 = boa)

▸ RX-ABDOME — avalie:
  • Distribuição gasosa: pneumoperitônio (sinal da falce subdiafragmática), pneumatose intestinal, pneumobilia, ausência de gás
  • Alças: dilatação (delgado >3cm, cólon >6cm, ceco >9cm), níveis hidroaéreos (número/distribuição — centrais=delgado/periférico=cólon), íleo paralítico vs obstrutivo
  • Silhueta: fígado (hepatomegalia — span normal <15cm), baço, rins (tamanho normal 9-12cm), bexiga, útero/próstata
  • Calcificações: renais, biliares, aórticas (aterosclerose), pancreáticas, flebólitos
  • Sondas/drenos: posição e trajeto

▸ RX-COLUNA — avalie: alinhamento, platôs vertebrais, espaços discais, pedículos, processos espinhosos, partes moles paravertebrais, deformidade (escoliose/cifose — grau Cobb), fraturas (tipo AO), osteólise

▸ RX-MEMBRO (MMSS/MMII/Bacia/Crânio) — avalie: alinhamento ósseo, traço de fratura (localização/tipo/desvio), densidade, articulações (espaço/erosões/calcificações), partes moles, implantes/próteses

▸ TC-TÓRAX — avalie:
  • Parênquima: consolidação (lobo/segmento), vidro fosco (distribuição: difuso/parcheado/centrolobular/GGO puro), atelectasia (laminar/subsegmentar/lobar), bronquiectasias (tipo/distribuição), nódulos (tamanho em mm/densidade/morfologia), cavidades, faveolamento, fibrose (UIP/NSIP/outros padrões), árvore-em-brotamento
  • Vasos pulmonares: TEP — especifique artéria acometida (tronco/lobar D-E/segmentares), índice de obstrução estimado, sinais de sobrecarga de VD (relação VD/VE>0,9, septo interventricular abaulado)
  • Pleura: derrame (volume estimado em mL — fórmula de Light), pneumotórax (porcentagem), espessamento (difuso/focal), empiema (septações/realce pleural)
  • Pericárdio: derrame (volume/densidade/sinais de tamponamento)
  • Mediastino: linfadenopatias (cadeia/eixo curto em mm — patológico >1cm), massas, hematoma
  • Aorta: diâmetro em cada nível, dissecção (tipo Stanford A/B), aneurisma
  • Parede torácica: fraturas costais (número e localização), lesões de partes moles

▸ TC-CRÂNIO — avalie:
  • Parênquima: hipodensidades (território vascular/tempo estimado pela atenuação), hiperdensidades espontâneas, edema cerebral (difuso/focal — TOAST/ASPECTS score se AVCi)
  • Hemorragias: epidural (biconvexa — volume pelo ABC/2), subdural (crescente — aguda>60HU/subaguda 30-60HU/crônica<30HU — volume/desvio), subaracnóide (cisternas/sulcos acometidos — escala Fisher), intraparenquimatosa (lobo/núcleos/fossa posterior — volume/extensão ventricular), intraventricular
  • Linha média: desvio em mm e direção
  • Ventrículos: hidrocefalia (índice de Evans>0,3), tamanho ventricular
  • Cisternas: pérvias/comprimidas/apagadas
  • Sulcos: apagamento focal/difuso, alargamento
  • Osso: fraturas (linear/cominutiva/afundamento/base de crânio), pneumoencéfalo
  • Vasos: sinal da artéria densa (ACM/basilar/ACAD/ACAE), calcificações ateromatosas

▸ TC-ABDOME-PELVE — avalie:
  • Fígado: dimensões, densidade (esteatose se <40HU), lesões focais (hipodensa/hiperdensa/cística — tamanho/número/realce), ductos biliares intra/extra-hepáticos (dilatação — VBEH normal <6mm, pós-colecistectomia <8mm)
  • Vesícula/vias biliares: espessura (normal <3mm), cálculos, colecistite (sinal de Murphy CT, líquido pericolecístico, gás na parede)
  • Pâncreas: parênquima (necrose — porcentagem/grau Balthazar), ducto (Wirsung dilatado >3mm), coleções peri/intrapancreáticas (tipo — WOPN/pseudocisto/necrose encapsulada), calcificações
  • Baço: dimensões (esplenomegalia >12cm), lesões, fragmentação (trauma)
  • Rins: tamanho (normal 9-12cm), cálculos (tamanho/localização/obstrução), hidronefrose (grau I-IV), lesões (Bosniak), captação de contraste (nefrogram/pyélogram)
  • Intestino: espessamento de alça (>3mm focal/difuso), pneumatose, isquemia (hipoperfusão/pneumatose/gás portal), obstrução (ponto de transição/alça fechada)
  • Vasos: aorta (diâmetro/dissecção/trombose), TC mesentérica (trombose/isquemia), veia porta (trombose/diâmetro)
  • Líquido livre: localização (perihepático/perisplênico/goteiras/pelve) — volume estimado
  • Linfonodos: cadeias acometidas, tamanho (patológico >1cm eixo curto)
  • Pelve: bexiga (espessura/lesão), útero/ovários (dimensões/cistos/massas), próstata (volume — normal <30mL), reto, paramétrios

▸ TC-COLUNA — avalie: fraturas (tipo AO/Magerl — para cervical adiciona SUBAXIAL/ASIA), listese (grau Meyerding), estenose do canal (diâmetro AP — cervical normal >13mm/lombar normal >12mm), hérnias discais (tipo/nível/compressão radicular/medular), edema de partes moles, hematoma epidural

▸ USG-PLEURAL — avalie:
  • Derrame: anecoico (transudato)/ecoico com septações (exsudato/empiema)/heterogêneo (hemotórax)
  • Volume estimado (fórmula de Mayo: máxima profundidade × 70)
  • Pneumotórax: ausência de deslizamento pleural (lung sliding), ponto pulmonar (confirma pneumotórax parcial), código de barras no M-mode, ausência de cauda de cometa
  • Consolidação: hepatização pulmonar, broncograma aéreo/fluido

▸ USG-CARDÍACO (POCUS/ecocardiograma) — avalie:
  • Janelas usadas (paraesternal/apical/subcostal/supraesternal)
  • FE estimada (Simpson/visual — normal >55%)
  • VE: dimensões (DDVE/DSVE), espessura septal/posterior (HVE se >12mm), motilidade segmentar (normo/hipo/aqui/discinesia — por território: DA/CX/CD)
  • VD: dimensões (dilatado se DDVD>42mm base), espessura (HVD se >5mm), função (TAPSE — normal >17mm, excursão visual)
  • Valvas: IM/IT/IA/IE (grau visual I-IV), calcificações, vegetações
  • Pericárdio: derrame (mínimo <10mm/moderado 10-20mm/volumoso >20mm), colapso de AD/VD (tamponamento)
  • VCI: diâmetro (normal <21mm) e colapsabilidade (>50% = PVC baixa)
  • Aorta ascendente: dilatação

▸ USG-ABDOME — avalie: órgãos sólidos (tamanho/textura/lesões), ductos, ascite (FAST — perihepático/pelve/perisplênico), vasculatura (doppler se disponível)

▸ USG-VASCULAR — avalie: perviedade (compressibilidade — VT se ausente), trombose (localização/extensão), fluxo Doppler (resistência/velocidade pico sistólico), placa (morfologia/estenosante)

▸ RM — avalie sequências visíveis:
  • RM-CRÂNIO: DWI/ADC (restrição à difusão = isquemia aguda — localização/território/volume), FLAIR (hiperintensidades — vascular/desmielinizante/encefalite), T2* /SWI (microhemorragias/depósitos de hemossiderina/veias trombosadas), T1 (necrose/gordura/proteína), T1+Gd (realce — tipo: paquimeníngeo/leptomeníngeo/anel/nodular/linear), espectroscopia (se disponível)
  • RM-COLUNA: T2 cord (hiperintensidade medular — mielopatia/contusão/isquemia), T1 vértebra (substituição gordurosa vs infiltração — Modic I/II/III), T2 disco (degeneração — baixo sinal), tamanho e tipo de hérnia, extensão foraminal, estenose dinâmica
  • RM-ARTICULAR: cartilagem (espessura/defeito focal), menisco (signal intrameniscal/ruptura — tipo), LCA/LCP/ligamentos colaterais, tendões (espessura/degeneração/ruptura parcial-total), sinovite, edema ósseo (contusão/necrose avascular — Ficat)
  • RM-ABDOME: lesões focais hepáticas (LI-RADS se cirrótico), características de sinal multi-sequência
  • RM-MAMA: BI-RADS MRI, realce (cinética — wash-in/plateau/wash-out), massa vs realce não-nodular

▸ BRONCOSCOPIA — avalie: mucosa (eritema/edema/friabilidade/granuloma/lesão), secreções (purulenta/hemática/mucosa/cáseo — localização), obstrução (extrínseca/intrínseca — grau), sangramento (fonte/intensidade), lesões endobrônquicas, posição do TOT, carina (alargada/afilada), brônquios principais/lobares/segmentares

▸ OUTROS EXAMES — analise os achados relevantes presentes na imagem, identificando estruturas e alterações patológicas

═══ PASSO 3: DISPOSITIVOS ═══
Para CADA dispositivo visível, avalie o posicionamento com precisão:
• TOT: ponta em relação à carina (vide Passo 4)
• SNE/SNG: trajeto (esôfago→estômago→duodeno) e posição da ponta — se ponta em posição gástrica: adequado; se duodenal: especificar; se esofágica ou pulmonar: CRÍTICO
• CVC (subclávia/jugular/femoral): trajeto e ponta (veia cava superior — posição ideal: junção cavo-atrial / VCS distal); má-posição: veia ázigos/VCI/AD/VD/artéria
• PICC: trajeto e ponta (VCS distal/junção cavo-atrial)
• Swan-Ganz: posição da ponta (artéria pulmonar — não muito distal para evitar infarto)
• Marca-passo: tipo (unicameral/bicameral/ressincronizador), eletrodos (VD apex/septo/AD/VE via SC), gerador, limiar estimado
• Drenos torácicos: posição e trajeto (ápice para pneumotórax/base para derrame)
• Dreno abdominal: localização
• IABP (balão intra-aórtico): ponta na aorta descendente, 2cm abaixo da subclávia esquerda
• ECMO: cânulas de drenagem/retorno (posição)
• Cateter de diálise: trajeto e ponta

═══ PASSO 4: ANÁLISE DO TOT ═══
SE houver TOT em RX ou TC de tórax:
  a. Identifique a CARINA (bifurcação traqueal — nível T4-T5 em PA, ponto em Y)
  b. Identifique a PONTA DO TOT (extremidade distal — balloon cuff visível)
  c. Estime a distância ponta-carina em cm
  d. Classifique conforme posição clínica real em UTI:
     • ADEQUADO: 2–5 cm acima da carina → posição segura (range considera variação de 4cm com flexão/extensão cervical)
     • ALERTA_BAIXO: 1–2 cm acima da carina → próximo à carina — verificar se há flexão do pescoço; risco de intubação seletiva ao fletir
     • CRITICO_BAIXO: <1 cm acima da carina → risco iminente de intubação seletiva; retrair cuidadosamente
     • ALERTA_SUBIDO: 5–7 cm acima da carina → tubo alto; monitorar e avaliar reposicionamento
     • CRITICO_SUBIDO: >7 cm acima → extubação iminente ao fletir; avançar o tubo
     • CRITICO_SELETIVO: abaixo da carina (brônquio D ou E) → INTUBAÇÃO SELETIVA — reposicionar URGENTE
  e. Estime coordenadas normalizadas (0.0=borda, 1.0=borda oposta):
     tube_tip_pct: posição da PONTA (x: esquerda→direita, y: topo→baixo)
     carina_pct: posição da CARINA (x: esquerda→direita, y: topo→baixo)
  f. Estime fixação labial em cm se graduação visível no tubo

SE não houver TOT → "measurements": null

═══ PASSO 5: LAUDO CLÍNICO COMPLETO ═══
Redija laudo estruturado em português:
1. TIPO DE EXAME e qualidade técnica
2. ACHADOS (sistemáticos por região/estrutura)
3. DISPOSITIVOS (todos os visíveis com posicionamento)
4. IMPRESSÃO DIAGNÓSTICA (principais diagnósticos — diferencial se necessário)
5. CONDUTA SUGERIDA (ações imediatas se achados críticos)

═══ RETORNE APENAS JSON VÁLIDO (sem markdown): ═══
{
  "findings": [
    "Pulmão D: consolidação em lobo inferior com broncograma aéreo — pneumonia",
    "Pleura D: derrame pleural moderado (estimativa ~300mL)",
    "Coração: índice cardiotorácico 0,52",
    "TOT: ponta projetada em T4, aproximadamente 4cm acima da carina — adequado"
  ],
  "report": "Laudo clínico completo e preciso em português",
  "measurements": {
    "tot_to_carina_cm": 4.0,
    "status": "ADEQUADO",
    "direction": "ADEQUADO",
    "alert": null,
    "rim_labial_cm": 22,
    "seletiva": false,
    "seletiva_side": null,
    "tube_tip_pct": { "x": 0.48, "y": 0.38 },
    "carina_pct":   { "x": 0.50, "y": 0.52 }
  },
  "deviceStatus": {
    "tot": "ponta em T4, 4cm acima da carina — adequado",
    "sne": null,
    "central_access": null,
    "outros": null
  }
}`
}

function extractJson(content: string): string {
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (jsonMatch) return jsonMatch[0]
  if (content.includes('```json')) return content.split('```json')[1].split('```')[0]
  if (content.includes('```')) return content.split('```')[1].split('```')[0]
  return content.trim()
}

async function callGroqFallback(base64Image: string, examType?: string): Promise<Record<string, unknown>> {
  const prompt = buildPrompt(examType)
  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
              { type: 'text', text: prompt },
            ],
          }],
          temperature: 0.1,
          max_tokens: 2500,
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
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })

    const examType = formData.get('examType') as string | null ?? undefined

    const arrayBuffer = await file.arrayBuffer()
    const base64Image = Buffer.from(arrayBuffer).toString('base64').replace(/[\r\n]/g, '')
    const mimeType = file.type || 'image/jpeg'
    const prompt = buildPrompt(examType)

    console.log(`[Vision API] Imagem: ${file.name} (${Math.round(arrayBuffer.byteLength / 1024)} KB) | Tipo: ${examType || 'auto'}`)

    let aiResult: Record<string, unknown> | null = null

    if (process.env.AI_GATEWAY_API_KEY) {
      for (const modelId of GATEWAY_MODELS) {
        try {
          console.log(`[Vision API] Gateway tentando: ${modelId}`)
          const { text } = await generateText({
            model: gateway(modelId),
            messages: [{
              role: 'user',
              content: [
                { type: 'image', image: `data:${mimeType};base64,${base64Image}` },
                { type: 'text', text: prompt },
              ],
            }],
            temperature: 0.1,
          })
          aiResult = JSON.parse(extractJson(text))
          console.log(`[Vision API] Gateway sucesso: ${modelId}`)
          break
        } catch (err) {
          console.warn(`[Vision API] Gateway falhou (${modelId}):`, err instanceof Error ? err.message : err)
        }
      }
    }

    if (!aiResult && GROQ_API_KEY) {
      console.log('[Vision API] Usando fallback Groq')
      aiResult = await callGroqFallback(base64Image, examType)
    }

    if (!aiResult) {
      return NextResponse.json({ error: 'Todos os modelos de visão falharam' }, { status: 502 })
    }

    return NextResponse.json(aiResult)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Erro interno no servidor'
    console.error('[Vision API] Erro crítico:', errMsg)
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}