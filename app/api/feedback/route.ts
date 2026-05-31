import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { user_id, score, text } = body;

    if (score === undefined || score < 0 || score > 10) {
      return NextResponse.json({ error: "Nota de NPS (0 a 10) obrigatória" }, { status: 400 });
    }

    const db = supabaseAdmin();

    // 1. Salva o feedback no Supabase feedbacks table
    let { error: insertErr } = await db
      .from("feedbacks")
      .insert({
        user_id: user_id || null,
        score,
        text: text || ""
      });

    // Fallback gracioso: se houver erro de chave estrangeira com o ID do perfil desatualizado,
    // salva o feedback vinculando o user_id como nulo para nunca perder a avaliação!
    if (insertErr) {
      console.warn("[feedback] Falha ao inserir com user_id, tentando como nulo:", insertErr.message);
      const { error: retryErr } = await db
        .from("feedbacks")
        .insert({
          user_id: null,
          score,
          text: text || ""
        });
      
      insertErr = retryErr;
    }

    if (insertErr) {
      return NextResponse.json({ error: `Database Error: ${insertErr.message}` }, { status: 500 });
    }

    // 2. Busca informações detalhadas da usuária (opcional)
    let userName = "Usuária Anônima";
    let userEmail = "Não disponível";
    if (user_id) {
      const { data: profile } = await db
        .from("user_profile_cache")
        .select("name")
        .eq("user_id", user_id)
        .single();
      
      if (profile?.name) userName = profile.name;
      
      try {
        const { data: { users: authUsers } } = await db.auth.admin.listUsers();
        const authUser = authUsers?.find(au => au.id === user_id);
        if (authUser?.email) userEmail = authUser.email;
      } catch {}
    }

    // 3. Envia o e-mail de alerta administrativo estilizado (Luxo)
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0b85e; border-radius: 12px; padding: 24px; background-color: #050505; color: #ffffff;">
        <h2 style="color: #e0b85e; border-bottom: 1px solid #222; padding-bottom: 12px; margin-top: 0; font-weight: 300;">Nova Avaliação NPS Recebida</h2>
        
        <div style="margin: 20px 0;">
          <p style="font-size: 14px; color: #888; margin: 0;">Nota Atribuída</p>
          <p style="font-size: 48px; font-weight: bold; color: #e0b85e; margin: 4px 0 16px;">${score} <span style="font-size: 18px; font-weight: normal; color: #888;">/ 10</span></p>
        </div>

        <div style="background-color: #111; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <p style="font-size: 12px; color: #e0b85e; text-transform: uppercase; margin: 0 0 8px; font-weight: bold;">Comentário / Feedback</p>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">"${text || "Sem comentário adicional."}"</p>
        </div>

        <div style="border-top: 1px solid #222; padding-top: 16px; font-size: 13px; color: #aaa;">
          <p style="margin: 4px 0;"><strong>Usuária:</strong> ${userName}</p>
          <p style="margin: 4px 0;"><strong>E-mail:</strong> ${userEmail}</p>
          <p style="margin: 4px 0;"><strong>ID:</strong> ${user_id || "Não rastreado"}</p>
          <p style="margin: 4px 0;"><strong>Data:</strong> ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
        </div>
        
        <footer style="margin-top: 24px; border-top: 1px solid #222; padding-top: 12px; text-align: center; font-size: 11px; color: #555;">
          IPB App · Sistema Automatizado de Alertas de Experiência
        </footer>
      </div>
    `;

    await sendMail({
      to: "erbusiness0422@gmail.com",
      subject: `NPS - IPB App`,
      html: htmlContent
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[feedback-api]", err);
    return NextResponse.json({ error: err.message || "Erro interno" }, { status: 500 });
  }
}
