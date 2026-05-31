import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { user_id, name, email, message } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "A mensagem de suporte é obrigatória" }, { status: 400 });
    }

    let insertErr = null;

    // 1. Tenta salvar o ticket no Supabase support_tickets table (encapsulado e resiliente)
    try {
      const db = supabaseAdmin();
      const insertObj = {
        user_id: user_id || null,
        name: name || "Usuária",
        email: email || "sem-email@ipb.app",
        message: message.trim()
      };

      const { error } = await db
        .from("support_tickets")
        .insert(insertObj);
      
      insertErr = error;

      // Fallback gracioso caso dê algum erro de chave estrangeira com cache do perfil
      if (insertErr) {
        console.warn("[support] Falha ao inserir com user_id, tentando como nulo:", insertErr.message);
        const { error: retryErr } = await db
          .from("support_tickets")
          .insert({
            user_id: null,
            name: name || "Usuária",
            email: email || "sem-email@ipb.app",
            message: message.trim()
          });
        
        insertErr = retryErr;
      }
    } catch (dbErr: any) {
      console.warn("[support-api-db-warn] Supabase não configurado ou inacessível:", dbErr.message);
    }

    // 2. Envia o e-mail administrativo de suporte com o assunto estrito
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #c9943a; border-radius: 12px; padding: 24px; background-color: #000; color: #ffffff;">
        <h2 style="color: #c9943a; border-bottom: 1px solid #222; padding-bottom: 12px; margin-top: 0; font-weight: 300;">Novo Chamado de Suporte</h2>
        
        <div style="background-color: #111; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="font-size: 12px; color: #c9943a; text-transform: uppercase; margin: 0 0 8px; font-weight: bold;">Mensagem do Usuário</p>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message.trim()}</p>
        </div>

        <div style="border-top: 1px solid #222; padding-top: 16px; font-size: 13px; color: #aaa;">
          <p style="margin: 4px 0;"><strong>Nome:</strong> ${name || "Não informado"}</p>
          <p style="margin: 4px 0;"><strong>E-mail de Contato:</strong> ${email || "Não informado"}</p>
          <p style="margin: 4px 0;"><strong>ID da Usuária:</strong> ${user_id || "Não rastreado"}</p>
          <p style="margin: 4px 0;"><strong>Data do Chamado:</strong> ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
        </div>
        
        <footer style="margin-top: 24px; border-top: 1px solid #222; padding-top: 12px; text-align: center; font-size: 11px; color: #444;">
          IPB App · Sistema de Relatório de Helpdesk
        </footer>
      </div>
    `;

    // Envia o e-mail de suporte de qualquer forma!
    await sendMail({
      to: "erbusiness0422@gmail.com",
      subject: "Suporte IPB App", // Assunto estruturado obrigatório
      html: htmlContent
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[support-api]", err);
    return NextResponse.json({ error: err.message || "Erro interno de suporte" }, { status: 500 });
  }
}
