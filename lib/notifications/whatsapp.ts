/**
 * BS - Módulo de Disparo de Notificações via WhatsApp
 * 
 * Este módulo gerencia o envio de mensagens automáticas de alertas e atualizações
 * utilizando um gateway de API de WhatsApp (como Evolution API, Z-API, ou similar).
 */

export interface WhatsAppPayload {
  number: string
  message: string
}

/**
 * Envia uma mensagem de WhatsApp para o destinatário informado.
 * 
 * @param to Número do destinatário formatado com DDI (ex: "5511999999999")
 * @param message Corpo do texto a ser enviado
 * @returns boolean indicando sucesso ou falha no disparo
 */
export async function sendWhatsAppNotification(to: string, message: string): Promise<boolean> {
  const apiUrl = process.env.WHATSAPP_API_URL
  const apiKey = process.env.WHATSAPP_API_KEY
  const instanceId = process.env.WHATSAPP_INSTANCE_ID // Opcional, usado em Evolution API/Z-API

  // Limpa o número de telefone (mantém apenas dígitos)
  const cleanNumber = to.replace(/\D/g, '')
  if (!cleanNumber) {
    console.warn('[WhatsApp] Número de telefone inválido ou vazio.')
    return false
  }

  // Se o serviço não estiver configurado nas variáveis de ambiente, apenas simula com sucesso
  // e loga no painel, garantindo estabilidade ao app.
  if (!apiUrl || !apiKey) {
    console.info(`[WhatsApp] [Simulação] Mensagem para ${cleanNumber}: "${message}" (Configuração pendente em .env.local)`)
    return true
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'apikey': apiKey, // Compatibilidade com Evolution API
      },
      body: JSON.stringify({
        number: cleanNumber,
        message: message,
        instance: instanceId, // Compatibilidade
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error(`[WhatsApp] Erro ao enviar mensagem para ${cleanNumber}:`, errText)
      return false
    }

    console.info(`[WhatsApp] Mensagem enviada com sucesso para ${cleanNumber}`)
    return true
  } catch (error) {
    console.error(`[WhatsApp] Falha de conexão ao disparar mensagem para ${cleanNumber}:`, error)
    return false
  }
}