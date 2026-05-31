export interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Dispara e-mails utilizando a API oficial do Resend.
 * Se falhar ou não estiver configurado, realiza fallback automático para SMTP clássico via Nodemailer.
 */
export async function sendMail({ to, subject, html }: MailOptions) {
  // Prioridade 1: Resend API (Chave injetada pelo usuário no Vercel ou fallback local)
  const resendApiKey = process.env.RESEND_API_KEY || "re_UQLGFkbq_Adg9Pa2myC8KgDfxwhj43ziM";

  if (resendApiKey) {
    try {
      console.log("[sendMail] Tentando envio direto de e-mail via Resend API...");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev", // Default onboarding do Resend para envio sandbox
          to,
          subject,
          html,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("[sendMail] E-mail enviado com sucesso via Resend:", data);
        return { success: true, provider: "resend", data };
      } else {
        const errText = await response.text();
        console.warn("[sendMail] Falha na chamada da API do Resend, tentando SMTP:", errText);
      }
    } catch (err) {
      console.error("[sendMail] Erro na requisição para Resend API, tentando SMTP:", err);
    }
  }

  // Prioridade 2 (Fallback): SMTP clássico via Nodemailer
  console.log("[sendMail] Iniciando envio fallback via SMTP/Nodemailer...");
  try {
    const nodemailer = require("nodemailer");
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.warn("[sendMail] Sem credenciais de SMTP em .env.local para realizar fallback.");
      return { skipped: true, reason: "SMTP credentials missing and Resend failed/absent" };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"IPB App" <${user}>`,
      to,
      subject,
      html,
    });

    console.log("[sendMail] E-mail enviado com sucesso via SMTP:", info.messageId);
    return { success: true, provider: "smtp", info };
  } catch (smtpErr) {
    console.error("[sendMail] Falha ao disparar e-mail no fallback SMTP:", smtpErr);
    throw smtpErr;
  }
}
