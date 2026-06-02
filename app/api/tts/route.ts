import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { text, voice } = await req.json()
    if (!text) {
      return NextResponse.json({ error: 'Texto não fornecido' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_TTS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave de API do Google TTS não configurada' }, { status: 500 })
    }

    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'pt-BR',
          name: voice || 'pt-BR-Neural2-A', // Feminina padrão
        },
        audioConfig: {
          audioEncoding: 'MP3',
        },
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('[TTS Error]', err)
      return NextResponse.json({ error: 'Erro na API do Google Cloud' }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({ audioContent: data.audioContent })
  } catch (error) {
    console.error('[TTS Exception]', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}