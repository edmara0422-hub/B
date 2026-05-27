const fs = require('fs');

const file = '/Users/edmararocha/Documents/IPB/data/caderno-content-m1-m8.ts';
let dbContent = fs.readFileSync(file, 'utf8');

const newChapter = {
  "title": "8: Inteligência Organizacional e Projeto de BI",
  "description": "Da administração estratégica aos Sistemas de Informação, Prototipagem e MVP",
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
    },
    {
      "title": "Prototipagem e MVP",
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
      "A estratégia precisa de monitoramento contínuo através de Sistemas de Informação.",
      "O Protótipo e o MVP servem para errar rápido e consertar rápido com baixo custo.",
      "O Road Map mantém a visão do projeto clara para todos os stakeholders envolvidos."
    ],
    "insights": ["Pensamento Estratégico", "Mínimo Produto Viável"]
  }
};

// 1. Extract the header
const headerMatch = dbContent.match(/([\s\S]*?)(?=export const SUBJECTS_DB)/);
const header = headerMatch ? headerMatch[1] : '';

// 2. Extract the array string
const arrayStart = dbContent.indexOf('export const SUBJECTS_DB');
let arrayStr = dbContent.slice(arrayStart).replace(/export const SUBJECTS_DB: SubjectContent\[\] = /, '').trim();
if (arrayStr.endsWith(';')) {
  arrayStr = arrayStr.slice(0, -1);
}

// Evaluate it safely by mocking SIG_PESSOAS
const SIG_PESSOAS = { id: 'MOCKED_SIG_PESSOAS' };
let subjects = eval(arrayStr);

// 3. Find and append
let count = 0;
subjects.forEach(subject => {
  if (subject.id === 'M4-S1') {
    const existingIndex = subject.chapters.findIndex(c => c.title.startsWith("8:"));
    if (existingIndex > -1) {
      subject.chapters.splice(existingIndex, 1);
    }
    subject.chapters.push(newChapter);
    count++;
  }
});

console.log(`Modified ${count} instances of M4-S1`);

// 4. Serialize back
// We need to restore SIG_PESSOAS at the end
const lastItem = subjects[subjects.length - 1];
let newArrayStr;
if (lastItem && lastItem.id === 'MOCKED_SIG_PESSOAS') {
  subjects.pop();
  newArrayStr = JSON.stringify(subjects, null, 2);
  // remove the closing bracket and append , SIG_PESSOAS]
  newArrayStr = newArrayStr.replace(/\]\s*$/, '  , SIG_PESSOAS\n]');
} else {
  newArrayStr = JSON.stringify(subjects, null, 2);
}

const newDbContent = header + "export const SUBJECTS_DB: SubjectContent[] = " + newArrayStr + ";\n";
fs.writeFileSync(file, newDbContent);

