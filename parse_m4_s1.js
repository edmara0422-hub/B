const fs = require('fs');

const file = '/Users/edmararocha/Documents/Business Syllabus/data/caderno-content-m1-m8.ts';
let dbContent = fs.readFileSync(file, 'utf8');

const newData = {
  "id": "M4-S1",
  "code": "M4-01",
  "title": "Inovação, Transformação e Ferramentas Digitais",
  "videoUrls": [
    {
      "title": "M4-01 Inovação, Transformação e Ferramentas Digitais",
      "url": "https://qvvqbngiwqfuxsbgcxtc.supabase.co/storage/v1/object/public/videos/IPB/Inovacao.mp4"
    },
    {
      "title": "M4-01 A Dupla Face da IA",
      "url": "https://qvvqbngiwqfuxsbgcxtc.supabase.co/storage/v1/object/public/videos/IPB/A_Dupla_Face_da_IA.mp4"
    }
  ],
  "chapters": [
    {
      "title": "1: Inteligência Organizacional (OBI)",
      "description": "Da administração estratégica aos Sistemas de Informação",
      "subsections": [
        {
          "title": "Etapas da Administração Estratégica",
          "content": "São cinco as etapas com relação ao sistema de administração estratégica: analisar o ambiente (interno e externo - SWOT), estabelecer a diretriz organizacional (missão, visão e objetivos), formular estratégias, implementar estratégias e elaborar o controle estratégico (monitorar com sistemas de informações).\n\nO pensamento estratégico é a arte de criar estratégias com efetividade. Pensar estrategicamente e agir operacionalmente significam dominar o presente e conquistar o futuro.",
          "quote": "As organizações são inteligentes quando aplicam a inovação de maneira participativa e integrada.",
          "deepDive": "Inteligência organizacional é o somatório de inovação, criatividade, qualidade, produtividade, efetividade e gestão do conhecimento."
        },
        {
          "title": "Dado, Informação e Conhecimento",
          "content": "Dado é um conjunto de números ou letras que isoladamente não transmite conhecimento. Informação é o dado trabalhado ou tratado, com valor agregado e sentido lógico para quem usa (ex: saldo bancário).\n\nQuando a informação é trabalhada por pessoas e recursos para gerar cenários e simulações, chama-se conhecimento (ex: percepção de práticas a utilizar baseado no cenário atual).",
          "quote": "Sistemas de Informação se dividem em Operacional (SIO), Gerencial (SIG) e Estratégico (SIE)."
        }
      ],
      "synthesis": {
        "title": "Síntese",
        "bullets": [
          "A estratégia precisa de monitoramento contínuo através de Sistemas de Informação.",
          "Dados se transformam em informação, que geram o conhecimento estratégico.",
          "O modelo OBI (Organizational Business Intelligence) integra desde RH até processos financeiros."
        ],
        "insights": ["Pensamento Estratégico", "Inteligência Competitiva"]
      }
    },
    {
      "title": "2: Prototipagem e MVP",
      "description": "Como testar antes de produzir em massa",
      "subsections": [
        {
          "title": "O que é Protótipo",
          "content": "Protótipo é o modelo preliminar do projeto, utilizado para prova de conceito ou MVP (Minimum Viable Product). Sem a etapa de geração de ideias não é possível criar protótipos e avaliar com o cliente se o projeto está no caminho certo.\n\nA execução da etapa de protótipo reduz a incerteza na aparência, usabilidade e desempenho, evitando prejuízos altos caso o produto vá direto para a produção sem ser validado pelo usuário.",
          "quote": "O MVP permite que empreendedores validem ideias antes de desenvolver o produto definitivo.",
          "studyCase": {
            "title": "Road Map e Customer Development",
            "body": "O road map é a bússola gerencial que alinha todos os stakeholders sobre a evolução do produto. As etapas de Customer Development incluem: 1. Descoberta do Cliente; 2. Validação do Cliente; 3. Construção da Empresa; 4. Execução do Negócio."
          }
        },
        {
          "title": "Tipos de Testes",
          "content": "Teste de Funcionalidade verifica o desempenho do protótipo nas mãos do usuário. Teste de Usabilidade avalia se o protótipo é fácil de usar sem necessidade de manuais extensos (UX Design).\n\nTeste A/B é uma análise comparativa que visa testar diferentes versões do produto simultaneamente para ver qual performa melhor com o público.",
          "deepDive": "Os custos na fase de testes são muito menores se comparados com o prejuízo de lançar um produto defeituoso no mercado final."
        }
      ],
      "synthesis": {
        "title": "Síntese",
        "bullets": [
          "O Protótipo e o MVP servem para errar rápido e consertar rápido com baixo custo.",
          "Testes de Funcionalidade, Usabilidade e A/B garantem que o produto resolve a dor do cliente.",
          "O Road Map mantém a visão do projeto clara para todos os stakeholders envolvidos."
        ],
        "insights": ["Testes A/B", "Mínimo Produto Viável"]
      }
    }
  ]
};

// We will use a regex to replace every M4-S1 object.
// The regex finds `{\n  "id": "M4-S1",` and matches everything up to the next `\n  },\n  {` or `\n  }\n];`
// Since M4-S1 has duplicates, this is the safest way to replace them all.

const regex = /\{\s*"id":\s*"M4-S1"[\s\S]*?(?=\n\s*\},\n\s*\{|\n\s*\}\n\];)/g;

if (dbContent.match(regex)) {
  dbContent = dbContent.replace(regex, JSON.stringify(newData, null, 2).replace(/\n/g, '\n  '));
  fs.writeFileSync(file, dbContent);
  console.log("Successfully replaced M4-S1");
} else {
  console.log("Could not find M4-S1 using regex");
}