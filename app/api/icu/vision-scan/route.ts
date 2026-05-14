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
    const base64Image = Buffer.from(arrayBuffer).toString('base64').replace(/[\r\n]/g, '')
    
    console.log(`[Vision API] Processando: ${file.name} (${Math.round(arrayBuffer.byteLength / 1024)} KB)`)

    const prompt = `Analise este Raio-X de Tórax. 
    Retorne APENAS um JSON:
    {
      "findings": ["Descreva os achados"],
      "report": "Laudo resumido",
      "measurements": { "tot_to_carina_cm": 0, "status": "NORMAL", "alert": "" },
      "deviceStatus": { "tot": "ok", "sne": "ok", "central_access": "ok" }
    }`


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
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              },
              { type: 'text', text: prompt }
            ]
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Vision API] Erro Groq:', response.status, errorText)
      return NextResponse.json({ error: `Groq API Error: ${response.status}`, details: errorText }, { status: response.status })
    }

    const data = await response.json()
    let content = data.choices?.[0]?.message?.content
    
    if (!content) {
      throw new Error('Resposta vazia da IA')
    }

    // Extrai JSON se a IA retornar markdown code blocks
    if (content.includes('```json')) {
      content = content.split('```json')[1].split('```')[0]
    } else if (content.includes('```')) {
      content = content.split('```')[1].split('```')[0]
    }

    const aiResult = JSON.parse(content.trim())

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
