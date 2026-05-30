import { NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: 'Email obrigatório' }, { status: 400 })
    }

    const admin = getSupabaseAdminClient()
    
    // Verifica se o usuário de fato existe e está bloqueado (camada de segurança)
    const { data: profile } = await admin
      .from('profiles')
      .select('name, blocked')
      .eq('email', email)
      .single()

    if (!profile?.blocked) {
      return NextResponse.json({ error: 'Usuário não está bloqueado' }, { status: 400 })
    }

    // Coleta dados adicionais (IP e User-Agent) de quem tentou o login
    const ip = request.headers.get('x-forwarded-for') || 'IP Desconhecido'
    const ua = request.headers.get('user-agent') || 'Dispositivo Desconhecido'

    const resendKey = process.env.RESEND_API_KEY
    const emailTo = process.env.ALERT_EMAIL_TO 
      ? process.env.ALERT_EMAIL_TO.split(',').map((e: string) => e.trim()) 
      : ['erbusiness0422@gmail.com', 'erbusiness0422@gmail.com']

    if (resendKey) {
      const nowStr = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      
      // Parse amigável do User Agent para exibir no e-mail
      let deviceLabel = 'Desconhecido'
      const lower = ua.toLowerCase()
      if (/iphone/.test(lower)) deviceLabel = 'iPhone'
      else if (/ipad/.test(lower)) deviceLabel = 'iPad'
      else if (/android/.test(lower)) deviceLabel = 'Android'
      else if (/macintosh|mac os x/.test(lower)) deviceLabel = 'Mac'
      else if (/windows/.test(lower)) deviceLabel = 'Windows'
      else if (/linux/.test(lower)) deviceLabel = 'Linux'

      let browserLabel = ''
      if (/edg\//.test(lower)) browserLabel = 'Edge'
      else if (/chrome/.test(lower) && !/edg/.test(lower)) browserLabel = 'Chrome'
      else if (/firefox/.test(lower)) browserLabel = 'Firefox'
      else if (/safari/.test(lower) && !/chrome/.test(lower)) browserLabel = 'Safari'

      const deviceFriendly = browserLabel ? `${deviceLabel} · ${browserLabel}` : deviceLabel

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${resendKey}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          from: 'seguranca@sea-fisio.com.br',
          to: emailTo,
          subject: `⚠️ [Segurança IPB] Tentativa de Login Bloqueado: ${email}`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; color: #1e293b; max-width: 600px; border: 1px solid #f8717130; border-radius: 16px; background-color: #0b0f19; background-image: radial-gradient(at top left, rgba(239, 68, 68, 0.05), transparent);">
              <h2 style="color: #f87171; margin-top: 0; display: flex; align-items: center; gap: 8px; font-size: 18px; letter-spacing: 0.05em; text-transform: uppercase;">
                ⚠️ Tentativa de Acesso Bloqueado
              </h2>
              <p style="font-size: 13px; line-height: 1.6; color: #94a3b8;">
                O sistema de segurança da plataforma <strong>IPB (Intelligence Platform Business)</strong> interceptou com sucesso uma tentativa de login em uma conta bloqueada pelo administrador.
              </p>
              
              <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; margin: 20px 0;">
                <table style="width: 100%; font-size: 12px; border-collapse: collapse; color: #cbd5e1;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: bold; width: 130px;">USUÁRIO:</td>
                    <td style="padding: 6px 0; font-weight: bold;">${profile.name || 'Sem nome'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: bold;">E-MAIL:</td>
                    <td style="padding: 6px 0; color: #f87171; font-weight: bold;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: bold;">STATUS DA CONTA:</td>
                    <td style="padding: 6px 0;"><span style="background-color: rgba(239, 68, 68, 0.15); color: #f87171; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; border: 1px solid rgba(239, 68, 68, 0.2)">BLOQUEADO</span></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: bold;">DATA / HORA:</td>
                    <td style="padding: 6px 0;">${nowStr} (Horário de Brasília)</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: bold;">ENDEREÇO IP:</td>
                    <td style="padding: 6px 0; font-family: monospace; color: #38bdf8;">${ip}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: bold;">DISPOSITIVO / NAVEGADOR:</td>
                    <td style="padding: 6px 0; color: #94a3b8;">${deviceFriendly} <span style="font-size: 9px; color: #475569;">(${ua})</span></td>
                  </tr>
                </table>
              </div>
              
              <p style="font-size: 11px; color: #475569; text-align: center; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
                Este é um alerta automático de segurança do IPB. O acesso foi sumariamente impedido e nenhuma ação corretiva imediata é requerida.
              </p>
            </div>
          `,
        }),
      })
    }

    // Opcional: dispara para o Webhook geral (ex: Slack) se estiver configurado
    const webhookUrl = process.env.ALERT_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `⚠️ *Tentativa de Acesso Bloqueado interceptada no IPB*\n*Usuário:* ${profile.name || 'Sem nome'}\n*E-mail:* ${email}\n*IP:* ${ip}\n*Dispositivo:* ${ua}`,
          }),
        })
      } catch {}
    }

    return NextResponse.json({ sent: true })
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}
