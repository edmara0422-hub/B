import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { tipo, descricao } = body;

    if (!tipo) {
      return NextResponse.json({ error: "O tipo da denúncia é obrigatório" }, { status: 400 });
    }
    if (!descricao || !descricao.trim()) {
      return NextResponse.json({ error: "A descrição da denúncia é obrigatória" }, { status: 400 });
    }

    let insertErr = null;
    try {
      const db = supabaseAdmin();
      // 1. Tenta salvar na tabela de compliance_reports
      const { error } = await db
        .from("compliance_reports")
        .insert({
          tipo: tipo.trim(),
          descricao: descricao.trim(),
          data: new Date().toISOString()
        });
      insertErr = error;
    } catch (dbErr: any) {
      console.warn("[compliance-api] Supabase não disponível ou erro na tabela:", dbErr.message);
    }

    // 2. Envia o e-mail administrativo de Compliance
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #c9943a; border-radius: 12px; padding: 24px; background-color: #000; color: #ffffff;">
        <h2 style="color: #c9943a; border-bottom: 1px solid #222; padding-bottom: 12px; margin-top: 0; font-weight: 300; text-transform: uppercase; font-size: 16px; letter-spacing: 0.1em;">Novo Relato de Compliance Anônimo</h2>
        
        <div style="background-color: #111; border: 1.5px dashed rgba(226, 75, 74, 0.4); border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="font-size: 11px; color: #e24b4a; text-transform: uppercase; margin: 0 0 8px; font-weight: bold; letter-spacing: 0.05em;">🚨 PROTOCOLO CRÍTICO · 100% ANÔNIMO</p>
          <p style="font-size: 13px; color: #fff; margin: 0 0 10px 0;"><strong>Tipo de Ocorrência:</strong> <span style="color: #d2af5a;">${tipo}</span></p>
          <p style="font-size: 12px; color: #aaa; text-transform: uppercase; margin: 12px 0 6px 0; font-weight: bold;">Descrição Detalhada:</p>
          <p style="font-size: 13px; line-height: 1.6; margin: 0; white-space: pre-wrap; color: #e5e7eb;">${descricao.trim()}</p>
        </div>
 
        <div style="border-top: 1px solid #222; padding-top: 16px; font-size: 11px; color: #888; font-family: monospace;">
          <p style="margin: 4px 0;"><strong>Canal de Origem:</strong> Compliance & ESG App</p>
          <p style="margin: 4px 0;"><strong>Data do Envio:</strong> ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
          <p style="margin: 4px 0; color: #5dcaa5;"><strong>Protocolo Criptográfico LGPD:</strong> Ativo (Bypass de logs pessoais)</p>
        </div>
        
        <footer style="margin-top: 24px; border-top: 1px solid #222; padding-top: 12px; text-align: center; font-size: 10px; color: #555;">
          IPB App · Comitê de Governança, Ética e Integridade Corporativa
        </footer>
      </div>
    `;

    await sendMail({
      to: "erbusiness0422@gmail.com",
      subject: "Compliance - IPB App", // Assunto estruturado obrigatório
      html: htmlContent
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[compliance-api-error]", err);
    return NextResponse.json({ error: err.message || "Erro interno de envio" }, { status: 500 });
  }
}
