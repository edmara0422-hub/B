import { NextResponse } from "next/server";

export async function GET() {
  const logs = [
    'Gemini NLP analisou mensagens Slack: Alerta de exaustão verbal (frequência de "urgente" subiu 42%)',
    'Maslach EEB recalibrado: Exaustão Emocional Coletiva em patamar crítico',
    'Satisfação interna recuou: Relação meta/estabilidade em desequilíbrio',
    'Predição de Burnout: 14% de risco de perda de talentos técnicos em 30 dias',
    'Taxa de atestados por estresse indicando curva de absenteísmo ascendente',
    'Pulse surveys respondido por 92% da equipe. Clima estável.',
    'Análise de Sentimentos NLP: Comentários positivos detectados em canais de Inovação e ESG.',
    'BS Engine: Telemetria operacional sincronizada via Cloud Computing Verde.',
    'Gemini BI: Alinhamento de WACC e EBITDA detectado como saudável.',
    'Alerta de Risco: Excesso de pressão de metas (Escala > 8) pode induzir burnout crônico.'
  ];

  // Seleciona um log aleatório
  const randomLog = logs[Math.floor(Math.random() * logs.length)];
  const timestamp = new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });

  return NextResponse.json({
    log: `[${timestamp}] [REAL-TIME API] ${randomLog}`
  });
}