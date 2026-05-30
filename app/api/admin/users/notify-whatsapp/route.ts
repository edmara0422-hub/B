import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-admin'
import { sendWhatsAppNotification } from '@/lib/notifications/whatsapp'

export const runtime = 'nodejs'

const ALWAYS_ADMIN_EMAILS = new Set<string>(['edmararbusiness1@gmail.com', 'erbusiness0422@gmail.com'])

export async function POST(request: Request) {
  try {
    const { phone, message } = await request.json()
    if (!phone || !message) {
      return NextResponse.json({ error: 'Telefone e mensagem são obrigatórios' }, { status: 400 })
    }

    // 1. Verifica se o emissor é um administrador (camada de segurança)
    const supa = await getSupabaseServerClient()
    const { data: { user }, error: userErr } = await supa.auth.getUser()
    if (userErr || !user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }
    
    const callerEmail = (user.email ?? '').toLowerCase()
    const { data: profile } = await supa.from('profiles').select('role').eq('id', user.id).single()
    const isAllowed = profile?.role === 'admin' || ALWAYS_ADMIN_EMAILS.has(callerEmail)
    if (!isAllowed) {
      return NextResponse.json({ error: 'Permissão negada' }, { status: 403 })
    }

    // 2. Dispara a notificação pelo módulo de WhatsApp
    const success = await sendWhatsAppNotification(phone, message)
    return NextResponse.json({ success })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Erro no servidor' }, { status: 500 })
  }
}
