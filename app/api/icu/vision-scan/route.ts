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

    // Prompt clínico focado em UTI
    const prompt = `Você é um Radiologista especializado em Terapia Intensiva (UTI). 
Analise esta imagem médica e forneça um relatório estruturado em JSON.

FOCO DA ANÁLISE:
1. Identifique o tipo de exame (RX Tórax, TC, USG, etc).
2. POSICIONAMENTO DE DISPOSITIVOS INVASIVOS:
   - Tubo Oro-Traqueal (TOT): Está acima da carina? Distância aproximada? (Ideal 3-5cm).
   - Sonda Nasoentérica (SNE): Posição gástrica ou duodenal (pós-pilorica)?
   - Acesso Venoso Central (CVC): Ponta em veia cava superior?
3. ACHADOS RADIOLÓGICOS:
   - Consolidações, Atelectasias, Derrame Pleural, Pneumotórax, Congestão, Edema.
   - Padrões de Vidro Fosco ou Infiltrado Bilateral.

RESPONDA EXCLUSIVAMENTE NO FORMATO JSON ABAIXO:
{
  "findings": ["Achado 1", "Achado 2"],
  "report": "Relatório descritivo detalhado aqui",
  "deviceStatus": {
    "tot": "descrição",
    "sne": "descrição"
  }
}

Importante: Use termos técnicos médicos em português. Se não for possível identificar algo com certeza, use "Inconclusivo".`

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
      const error = await response.json()
      throw new Error(error.error?.message || 'Falha na API do Groq')
    }

    const data = await response.json()
    const aiResponse = JSON.parse(data.choices[0].message.content)

    return NextResponse.json(aiResponse)

  } catch (error: any) {
    console.error('Vision Scan Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
