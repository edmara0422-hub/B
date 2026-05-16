import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''

// Fallback model chain: tenta modelos em ordem até ter sucesso
const VISION_MODELS = [
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'meta-llama/llama-4-maverick-17b-128e-instruct',
  'llama-3.2-11b-vision-preview',
]

const prompt = `Você é um radiologista de UTI experiente. Analise a imagem com precisão clínica.

═══ PASSO 1: IDENTIFIQUE O TIPO DE EXAME ═══
Determine: RX-Tórax | RX-Abdome | RX-Coluna | RX-Membro | TC-Tórax | TC-Crânio | TC-Abdome-Pelve | TC-Coluna | USG-Abdome | USG-Pleural | USG-Cardíaco | USG-Vascular | RM-Crânio | RM-Coluna | RM-Articular | Broncoscopia | Outro.

═══ PASSO 2: ACHADOS ESPECÍFICOS POR TIPO ═══

▸ RX-TÓRAX — avalie TODAS as áreas:
  • Pulmão D: consolidação, atelectasia (segmento/lobo), infiltrado, pneumotórax, hiperinsuflação, padrão intersticial, nódulos
  • Pulmão E: idem
  • Pleura: derrame (D/E, volume: mínimo/moderado/volumoso), pneumotórax, espessamento
  • Coração: índice cardiotorácico (normal <0,5), contornos, câmaras
  • Mediastino: alargamento (>8cm), desvio de traqueia, alargamento hilar
  • Diafragma: elevação (D/E), retificação, subdiafragmático
  • Ossos: fraturas costais, clavícula, escápula, vértebras visíveis
  • Partes moles: enfisema subcutâneo, calcificações

▸ RX-ABDOME — avalie:
  • Distribuição gasosa: pneumoperitônio (sinal da falce), pneumatose intestinal, ausência de gás
  • Alças intestinais: dilatação (delgado >3cm, cólon >6cm), níveis hidroaéreos, íleo paralítico vs obstrutivo
  • Silhueta de órgãos: fígado (hepatomegalia), baço, rins, bexiga
  • Calcificações: cálculos renais/biliares, aórticas, pancreáticas
  • Sondas e drenos visíveis

▸ TC-TÓRAX — avalie:
  • Parênquima: consolidação (lobo/segmento), vidro fosco (distribuição), atelectasia (tipo), bronquiectasias, nódulos (tamanho/densidade), cavidades, fibrose
  • Vasos pulmonares: falhas de enchimento sugestivas de TEP (artéria acometida)
  • Pleura: derrame (D/E, volume estimado em mL), pneumotórax, espessamento pleural, empiema
  • Pericárdio: derrame, espessamento
  • Mediastino: linfadenopatias (cadeia/tamanho), massas, estruturas vasculares
  • Parede torácica: fraturas costais, lesões de partes moles

▸ TC-CRÂNIO — avalie:
  • Parênquima: hipodensidades (localização/território vascular), hiperdensidades espontâneas, edema cerebral
  • Hemorragias: epidural (biconvexa), subdural (crescente), subaracnóide (cisternas), intraparenquimatosa (lobo/profunda), intraventricular
  • Desvio de linha média: em mm e direção
  • Sistema ventricular: hidrocefalia, tamanho dos ventrículos laterais/3º/4º
  • Cisternas basais: pérvias ou comprimidas
  • Sulcos: apagamento (edema/PIC elevada), alargamento (atrofia)
  • Osso: fraturas (linear, cominutiva, afundamento), pneumoencéfalo
  • Vasos: hiperdensidade de artéria (sinal da artéria densa — ACM, basilar)

▸ TC-ABDOME-PELVE — avalie:
  • Fígado: densidade, lesões focais (hipodensa/hiperdensa/cística), ductos (dilatação)
  • Vias biliares: colédoco (diâmetro), vesícula (espessura, cálculos, líquido)
  • Pâncreas: parênquima, ducto, coleções peripancreáticas, necrose
  • Baço: tamanho, lesões, esplenomegalia
  • Rins: tamanho, cálculos, hidronefrose, lesões, captação de contraste
  • Intestino: espessamento de alça, pneumatose, isquemia, obstrução, dilatação
  • Vasos: aorta (diâmetro, dissecção), artérias mesentéricas (trombose), veia porta
  • Líquido livre: localização (perihepático, perisplênico, pelve), volume estimado
  • Linfonodos: cadeias acometidas, tamanho
  • Pelve: bexiga, útero/ovários ou próstata, reto

▸ USG — avalie estruturas visíveis com achados específicos:
  • USG-Pleural: derrame (anecoico/ecoico, volume, septações), pneumotórax (ausência de deslizamento pleural, ponto pulmonar)
  • USG-Abdome: órgãos sólidos, líquido livre (FAST), ductos, vasculatura
  • USG-Cardíaco: FE estimada, câmaras (dilatação, hipocinesia), valvas, derrame pericárdico, VCI
  • USG-Vascular: perviedade, trombose (compressibilidade, fluxo Doppler)

▸ RM — avalie sequências visíveis (T1/T2/FLAIR/DWI/T2*):
  • RM-CRÂNIO: lesões em DWI (restrição à difusão → isquemia aguda), FLAIR (hiperintensidades), T2* (sangue), realce pós-contraste, estruturas da fossa posterior
  • RM-COLUNA: canal (estenose, compressão medular/radicular), disco (protrusão/extrusão), medula (sinal, compressão), vértebras (fratura, infiltração), partes moles

▸ BRONCOSCOPIA — avalie: vias aéreas (mucosa, secreções, obstrução, sangramento, lesões endobrônquicas), posição do TOT, carina, brônquios principais

═══ PASSO 3: DISPOSITIVOS ═══
Para cada dispositivo visível, avalie o posicionamento:
• TOT: ponta em relação à carina
• SNE: trajeto e posição da ponta (gástrica/duodenal/esofágica)
• CVC/PICC: trajeto e ponta (veia cava superior/junção cavo-atrial/má-posição)
• Swan-Ganz: posição da ponta (artéria pulmonar)
• Marca-passo: eletrodos (câmaras), gerador
• Drenos torácicos/abdominais: posição e trajeto
• IABP: posição (aorta descendente, abaixo da subclávia E)

═══ PASSO 4: ANÁLISE DO TOT (somente se visível) ═══
SE houver TOT visível em RX ou TC de tórax:
  a. Identifique a CARINA (bifurcação traqueal, nível T4-T5 — ponto em Y onde a traqueia se divide)
  b. Identifique a PONTA DO TOT (extremidade distal do tubo, geralmente com balão de cuff visível)
  c. Estime a distância ponta-carina em cm
  d. Classifique RIGOROSAMENTE:
     • ADEQUADO: 2-3 cm acima da carina → correto
     • ALERTA_SUBIDO: >3 cm acima → tubo alto, avançar o tubo
     • ALERTA_BAIXO: <2 cm acima → tubo baixo, risco de intubação seletiva, retrair
     • CRITICO_SELETIVO: abaixo da carina (dentro do brônquio D ou E) → intubação seletiva, reposicionar URGENTE
  e. Estime coordenadas normalizadas (0.0=borda, 1.0=borda oposta):
     tube_tip_pct: posição da PONTA do TOT (x: esquerda→direita, y: topo→baixo)
     carina_pct: posição da CARINA (x: esquerda→direita, y: topo→baixo)
  f. Estime fixação labial em cm se graduação visível

REGRA: distância GRANDE (>3cm) = tubo SUBIDO. 4,5 cm da carina = SUBIDO, NÃO próximo.
SE não houver TOT → "measurements": null

═══ PASSO 5: LAUDO ═══
Redija laudo clínico objetivo em português com: tipo de exame, principais achados, dispositivos, conduta sugerida.

═══ RETORNE APENAS JSON VÁLIDO (sem markdown, sem texto extra): ═══
{
  "findings": [
    "Pulmão D: consolidação em lobo inferior com broncograma aéreo",
    "Pulmão E: atelectasia de base",
    "Pleura: derrame pleural D moderado",
    "Coração: índice cardiotorácico 0,54, contornos normais",
    "Mediastino: sem alargamento, traqueia centrada",
    "Diafragma: hemidiafragma E elevado",
    "TOT: ponta projetada em T3, aproximadamente 4 cm acima da carina — tubo subido"
  ],
  "report": "Laudo clínico completo em português com interpretação e conduta",
  "measurements": {
    "tot_to_carina_cm": 2.5,
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
    "tot": "ponta em T3, 4 cm acima da carina — tubo subido",
    "sne": "trajeto gástrico, ponta projetada em hipocôndrio E — posição adequada",
    "central_access": "CVC em jugular D, ponta em veia cava superior — adequado",
    "outros": null
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