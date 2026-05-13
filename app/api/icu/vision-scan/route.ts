import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY || ''

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
    const base64Image = Buffer.from(arrayBuffer).toString('base64')
    const mimeType = file.type

    // Prompt clínico refinado com foco em medição e tradução
    const prompt = `Você é um Radiologista de UTI de elite. Analise a imagem e forneça um laudo em PORTUGUÊS (Brasil).

OBJETIVO PRINCIPAL: MENSURAÇÃO DO TUBO ORO-TRAQUEAL (TOT)
1. Localize a ponta do TOT e a Carina.
2. MENSURAÇÃO (Régua Digital): Estime a distância exata da ponta do TOT até a Carina em centímetros.
   - O IDEAL é entre 2cm e 3cm acima da carina.
   - Abaixo de 2cm: Risco de intubação seletiva.
   - Acima de 5cm: Risco de extubação acidental.

3. OUTROS DISPOSITIVOS:
   - Sonda Nasoentérica (SNE): Confirme se está pós-pilórica (duodenal) ou gástrica.
   - Acesso Central: Posição da ponta.

4. ANÁLISE PULMONAR: Descreva consolidações, derrames ou pneumotórax.

RESPONDA EXCLUSIVAMENTE EM JSON:
{
  "findings": ["Achado 1", "Achado 2"],
  "report": "Laudo descritivo em português",
  "measurements": {
    "tot_to_carina_cm": 2.5,
    "status": "Adequado | Baixo (Seletivo) | Alto",
    "alert": "Aviso se estiver fora de 2-3cm"
  },
  "deviceStatus": {
    "tot": "descrição detalhada",
    "sne": "posição confirmada"
  }
}

Importante: Se a imagem não permitir ver a carina, descreva como 'Inconclusivo por má visualização'. Traduza termos como 'ground-glass' para 'vidro fosco'.`

    console.log(`[Vision API] Processando arquivo: ${file.name} (${file.size} bytes)`)

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.2-11b-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Vision API] Erro Groq:', response.status, errorText)
      return NextResponse.json({ error: `Groq API Error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content
    
    if (!content) {
      throw new Error('Resposta vazia da IA')
    }

    const aiResult = JSON.parse(content)

    // --- Integração com Tavily (Busca de Evidência Clínica) ---
    if (process.env.TAVILY_API_KEY && aiResult.findings?.length > 0) {
      try {
        const { tavilySearch } = require('@/lib/tavily')
        const mainFinding = aiResult.findings[0]
        const tavQuery = `${mainFinding} ICU clinical guidelines 2024 2025 management`
        
        const tav = await tavilySearch({
          query: tavQuery,
          searchDepth: 'basic',
          maxResults: 2
        })

        if (tav.results?.length > 0) {
          aiResult.evidence = tav.results.map((r: any) => ({
            title: r.title,
            url: r.url,
            snippet: r.content.slice(0, 200)
          }))
        }
      } catch (tavErr) {
        console.warn('[Vision API] Tavily search failed:', tavErr)
      }
    }

    console.log('[Vision API] Sucesso no processamento')
    return NextResponse.json(aiResult)

  } catch (error: any) {
    console.error('[Vision API] Erro Crítico:', error)
    return NextResponse.json({ error: error.message || 'Erro interno no servidor' }, { status: 500 })
  }
}
