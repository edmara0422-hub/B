import { NextRequest, NextResponse } from "next/server"
import { sendMail } from "@/lib/mail"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { emails, category, question, surveyType } = body

    if (!emails || !Array.isArray(emails) || emails.length === 0 || !category || !question) {
      return NextResponse.json({ error: "Campos 'emails' (array), 'category' e 'question' são obrigatórios." }, { status: 400 })
    }

    // Identificar a origem de rede dinâmica para o link de resposta
    const origin = req.nextUrl.origin

    let providerUsed = "simulated_console"
    const sendPromises = emails.map(async (email) => {
      // Monta o e-mail estilizado com a linguagem de design Dourado e Preto do IPB
      const encodedCategory = encodeURIComponent(category)
      const encodedQuestion = encodeURIComponent(question)
      const surveyLink = `${origin}/pesquisa?c=${encodedCategory}&q=${encodedQuestion}`

      const htmlContent = `
        <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d2af5a; border-radius: 16px; padding: 32px; background-color: #050507; color: #ffffff; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="text-align: center; border-bottom: 1px solid rgba(210,175,90,0.15); padding-bottom: 20px; margin-bottom: 24px;">
            <span style="font-size: 10px; font-weight: bold; letter-spacing: 2px; color: #d2af5a; font-family: monospace; display: block; margin-bottom: 4px;">SIG · SISTEMA INTEGRADO DE GESTÃO COGNITIVA</span>
            <h2 style="font-size: 16px; font-weight: bold; margin: 0; color: #ffffff; letter-spacing: 0.5px;">🌱 PESQUISA DE PULSO DE CLIMA CORPORATIVO</h2>
          </div>

          <p style="font-size: 12px; line-height: 1.6; color: #8a9098; margin-bottom: 20px;">
            Olá, colaborador(a).<br />
            Para garantir um ambiente de trabalho psicologicamente seguro, saudável e produtivo, a diretoria ativou uma pesquisa de pulso. 
            Sua participação é <b>100% anônima e criptografada</b> — nenhuma resposta pode ser associada à sua identidade.
          </p>

          <div style="background-color: rgba(210,175,90,0.05); border: 1px solid rgba(210,175,90,0.15); border-radius: 12px; padding: 20px; margin-bottom: 28px;">
            <span style="font-size: 9px; font-weight: bold; letter-spacing: 1.5px; color: #d2af5a; font-family: monospace; display: block; margin-bottom: 8px; text-transform: uppercase;">
              Categoria: ${category}
            </span>
            <p style="font-size: 13px; line-height: 1.5; color: #ffffff; margin: 0; font-weight: 500;">
              ${surveyType === 'validated' 
                ? "Este formulário avalia múltiplos itens validados cientificamente para sua segurança psicossocial."
                : `"${question}"`
              }
            </p>
          </div>

          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${surveyLink}" style="display: inline-block; background-color: #d2af5a; color: #000000; font-size: 11px; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 8px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(210,175,90,0.3); transition: all 0.3s ease;">
              Responder Pesquisa Anônima
            </a>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; font-size: 10px; color: #8a9098; line-height: 1.5;">
            <p style="margin: 0 0 4px;">• <b>Conformidade de Segurança:</b> Esta pesquisa atende os quesitos do Programa de Gerenciamento de Riscos (PGR - NR-1).</p>
            <p style="margin: 0;">• <b>Privacidade por Design:</b> O IPB garante a anonimização técnica irrevogável das respostas recolhidas.</p>
          </div>

          <footer style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px; text-align: center; font-size: 10px; color: #555555;">
            IPB App · Gestão Cognitiva de Equipes e Telemetria Humana
          </footer>
        </div>
      `;

      const result = await sendMail({
        to: email,
        subject: `Pesquisa de Clima IPB - ${category}`,
        html: htmlContent
      });

      if (result?.provider) {
        providerUsed = result.provider;
      }
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true, provider: providerUsed, count: emails.length });
  } catch (err: any) {
    console.error("[survey-send-api-error]", err);
    return NextResponse.json({ error: err.message || "Erro interno" }, { status: 500 });
  }
}
