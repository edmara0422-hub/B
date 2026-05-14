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

    const prompt = `Analise este exame de imagem médica (Raio-X, TC, USG ou RM).
    
    DIRETRIZES:
    1. Identifique o tipo de exame e a região anatômica.
    2. Liste achados clínicos relevantes (pulmonares, cardíacos, neurológicos, abdominais ou vasculares).
    3. Se for RX de Tórax, identifique a Carina e meça a distância do Tubo Orotraqueal (TOT) até ela.
    4. Avalie o posicionamento de dispositivos (TOT, Sonda, Acesso Central).
    5. Retorne APENAS um JSON no seguinte formato:
    {
      "findings": ["Achado 1", "Achado 2"],
      "report": "Descrição detalhada do laudo em português",
      "measurements": { "tot_to_carina_cm": 0, "status": "ADEQUADO|ALERTA|CRITICO", "alert": "Mensagem de alerta se necessário" },
      "deviceStatus": { "tot": "descrição", "sne": "descrição", "central_access": "descrição" }
    }`


    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.2-90b-vision-preview',
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
        ],
        temperature: 0.1,
        max_tokens: 1024
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Vision API] Erro Groq:', response.status, errorText)
      // Tenta extrair a mensagem de erro específica do JSON se houver
      let errorMsg = errorText
      try {
        const errJson = JSON.parse(errorText)
        errorMsg = errJson.error?.message || errorText
      } catch {}
      return NextResponse.json({ error: `Groq API Error: ${response.status}`, details: errorMsg }, { status: response.status })
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
