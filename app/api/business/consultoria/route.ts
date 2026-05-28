import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1/ai',
});

export const maxDuration = 60; // 60 segundos de timeout para garantir tempo de sobra para a IA analisar o texto.

const CONSULTORIA_PROMPT = `
Você é um Consultor Estratégico de Negócios e Especialista em Administração de Alto Nível (com base em Henry Mintzberg, John Doerr, e Patrick Lencioni).
O usuário conduziu uma entrevista de prospecção com um gestor de uma empresa e fornecerá os dados brutos.

Sua tarefa é elaborar um **Relatório de Consultoria em Gestão** estritamente baseado nesses dados e nas teorias acadêmicas de gestão.

### DADOS FORNECIDOS PELO USUÁRIO (ENTREVISTA)
História: {historia}
Produto/Serviço: {produto}
Concorrentes: {concorrentes}
Diferencial: {diferencial}
Forças: {forcas}
Fraquezas: {fraquezas}
Rotina do Gestor: {rotina}
Planejamento: {planejamento}
Organização de Recursos: {organizacao}

### INSTRUÇÕES DE SAÍDA
Retorne APENAS um JSON válido. Não inclua blocos de markdown ou crases.
O JSON DEVE seguir EXATAMENTE a interface abaixo:

{
  "macroambiente": "Análise profunda (250-350 palavras) de como fatores políticos, econômicos, socioculturais e tecnológicos (PESTEL) afetam a empresa.",
  "microambiente": "Análise profunda (250-350 palavras) sobre a concorrência (preço vs qualidade), poder de negociação dos fornecedores, comportamento dos clientes e ameaça de produtos substitutos.",
  "stakeholders": "Análise (250-350 palavras) mapeando os principais stakeholders, quem tem maior poder e interesse, e sugerindo como devem ser gerenciados de perto.",
  "estrutura_controle": "Análise (250-350 palavras) deduzindo o organograma (mecanicista ou orgânica), os sistemas de controle existentes e as vantagens/desvantagens dessa estrutura.",
  "plano_acao": [
    {
      "titulo": "Título da Solução 1",
      "descricao": "Proposta de melhoria fundamentada na teoria (ex: Delegação E4, OKRs, Reestruturação), com no mínimo 200 palavras."
    },
    {
      "titulo": "Título da Solução 2",
      "descricao": "Proposta de melhoria fundamentada na teoria, com no mínimo 200 palavras."
    },
    {
      "titulo": "Título da Solução 3",
      "descricao": "Proposta de melhoria fundamentada na teoria, com no mínimo 200 palavras."
    }
  ]
}

### DIRETRIZES
1. Seja incisivo, acadêmico, e use jargões de consultoria de forma precisa (ex: "estágio de Forming", "gestão vs liderança", "índice 6D").
2. Evite elogiar ou criticar sem base; todo argumento deve ter suporte nos dados fornecidos.
3. Foque em resolver o "Saber-ser" da gestão.
`;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Constrói o prompt com os dados
    let finalPrompt = CONSULTORIA_PROMPT
      .replace('{historia}', data.historia || 'Não informado.')
      .replace('{produto}', data.produto || 'Não informado.')
      .replace('{concorrentes}', data.concorrentes || 'Não informado.')
      .replace('{diferencial}', data.diferencial || 'Não informado.')
      .replace('{forcas}', data.forcas || 'Não informado.')
      .replace('{fraquezas}', data.fraquezas || 'Não informado.')
      .replace('{rotina}', data.rotina || 'Não informado.')
      .replace('{planejamento}', data.planejamento || 'Não informado.')
      .replace('{organizacao}', data.organizacao || 'Não informado.');

    // Roda via AI Gateway usando Gemini Pro ou Flash
    const GATEWAY_MODELS = [
      'google/gemini-1.5-flash',
      'google/gemini-1.5-pro',
      'openai/gpt-4o'
    ];

    let rawText = '';
    let success = false;
    for (const modelId of GATEWAY_MODELS) {
      try {
        console.log(`[Consultoria API] Tentando modelo: ${modelId}`);
        const result = await generateText({
          model: gateway(modelId),
          prompt: finalPrompt,
        });
        rawText = result.text.trim();
        success = true;
        console.log(`[Consultoria API] Sucesso: ${modelId}`);
        break;
      } catch (err) {
        console.warn(`[Consultoria API] Falhou modelo ${modelId}:`, err);
      }
    }

    if (!success) {
      throw new Error('Todos os modelos de IA falharam na análise de consultoria.');
    }
    
    // Tenta fazer o parse do JSON
    try {
      const parsed = JSON.parse(rawText.replace(/^```json|```$/g, ''));
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("Erro ao parsear JSON:", parseError);
      return NextResponse.json({ 
        error: 'A IA não retornou um JSON válido.', 
        rawText 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Erro na API Consultoria:', error);
    return NextResponse.json({ error: 'Erro ao processar a análise.' }, { status: 500 });
  }
}
