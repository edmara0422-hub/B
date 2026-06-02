const fs = require('fs');
const file = '/Users/edmararocha/Documents/Business Syllabus/data/caderno-content-m1-m8.ts';
let content = fs.readFileSync(file, 'utf8');

const newModule = `
  {
    "id": "M4-T1-S5",
    "code": "M4-05",
    "title": "Balanço Patrimonial e DRE",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: O que é o Balanço Patrimonial?",
        "description": "Uma fotografia da situação financeira e patrimonial da entidade em uma data específica.",
        "subsections": [
          {
            "title": "A Fotografia Financeira",
            "content": "O Balanço Patrimonial, como indica seu nome, retrata o equilíbrio entre os bens e direitos (ativos) e as obrigações relacionadas a esses recursos, tanto de terceiros (passivos) quanto dos proprietários (patrimônio líquido) em uma determinada data. Por registrar uma situação específica em um momento preciso, o Balanço Patrimonial é comparado metaforicamente a uma fotografia da situação financeira e patrimonial da entidade.",
            "quote": "Balanço Patrimonial é a fotografia; a DRE é o filme do exercício.",
            "studyCase": {
              "title": "Entendendo as Colunas",
              "body": "Essa demonstração contábil é dividida tecnicamente em duas colunas, em que ambas as colunas possuem o mesmo total monetário: Ativos e Passivos + Patrimônio Líquido. No lado esquerdo, temos os Ativos, os recursos da empresa, como dinheiro, clientes, estoques, equipamentos etc. Tudo que a entidade tem ou que pode converter em dinheiro. Já no lado direito, temos os Passivos e o Patrimônio Líquido, ou seja, o que a empresa deve (fornecedor, salários, impostos, empréstimos etc.) e a diferença entre os Ativos e os Passivos, que é o Patrimônio Líquido (capital social, reservas etc.)."
            },
            "deepDive": "Sempre lembre da equação fundamental da contabilidade: Ativo = Passivo + Patrimônio Líquido."
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "O Balanço Patrimonial é uma fotografia exata da saúde da empresa em uma data específica.",
            "A soma dos Ativos deve ser exatamente igual à soma dos Passivos mais o Patrimônio Líquido.",
            "Ativos representam onde o dinheiro foi aplicado (bens e direitos). Passivos representam de onde o dinheiro veio (obrigações)."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Ativo Circulante e Não Circulante",
        "description": "Grau de liquidez e a disposição de recursos no curto e longo prazo.",
        "subsections": [
          {
            "title": "Ativo Circulante",
            "content": "De acordo com a Lei das S/As, art. 178, § 1º, 'No ativo, as contas serão dispostas em ordem decrescente de grau de liquidez'. Ativo Circulante são os recursos que a empresa espera utilizar ou converter em dinheiro no ciclo operacional normal, em um prazo de até um ano. Inclui Disponibilidades (dinheiro em caixa ou equivalentes), Contas a receber (clientes) e Estoques.",
            "quote": "Liquidez é a velocidade com que um ativo se converte em dinheiro.",
            "studyCase": undefined,
            "deepDive": "Se a empresa tiver excesso de ativo circulante e pouca rentabilidade, pode significar dinheiro parado no caixa ou estoques encalhados."
          },
          {
            "title": "Ativo Não Circulante",
            "content": "São os recursos que não têm a expectativa de serem utilizados ou convertidos em dinheiro no curto prazo. Subdivide-se em: Ativo realizável a longo prazo (após um ano), Investimentos (ações em outras empresas), Ativo imobilizado (bens tangíveis, equipamentos, prédios) e Ativo intangível (marcas, patentes, softwares).",
            "quote": "",
            "studyCase": undefined,
            "deepDive": "Investimentos maciços no intangível (como softwares e marca) têm sido o grande diferencial de valuation de empresas de tecnologia modernas."
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "A ordem no Ativo é ditada pelo grau de liquidez (do mais líquido para o menos líquido).",
            "Ativo Circulante gira a operação da empresa (caixa, estoques, clientes no curto prazo).",
            "Ativo Não Circulante garante a infraestrutura e valor futuro (imóveis, máquinas, patentes e marcas)."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Passivo e Patrimônio Líquido",
        "description": "Obrigações de curto prazo, longo prazo e o capital dos acionistas.",
        "subsections": [
          {
            "title": "Passivo Circulante e Não Circulante",
            "content": "De acordo com a Lei das S/As, art 178, § 2º, no passivo as contas são dispostas de acordo com a exigibilidade. O Passivo Circulante abrange obrigações a quitar no curto prazo (geralmente um ano), como Fornecedores, Empréstimos de curto prazo, Salários e Obrigações Tributárias. Já o Passivo Não Circulante refere-se a longo prazo (superior a um ano), incluindo Empréstimos longos, Debêntures e Provisões.",
            "quote": "Dívida não é ruim por si só, ruim é não ter fluxo de caixa para pagá-la.",
            "studyCase": undefined,
            "deepDive": "O descompasso entre o ciclo do ativo circulante e o passivo circulante é o que quebra a maioria das empresas por estrangulamento de caixa."
          },
          {
            "title": "Patrimônio Líquido",
            "content": "É a diferença entre Ativos e Passivos, representando o valor residual pertencente aos proprietários. É composto por: Capital Social (valor investido pelos acionistas), Reservas de Capital (ágio na emissão de ações), Reservas de Lucros (lucros retidos na empresa em vez de distribuídos) e Prejuízos Acumulados.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": "Se o Patrimônio Líquido ficar negativo (Passivo a Descoberto), a empresa deve mais a terceiros do que o valor total de todos os seus bens e direitos."
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Passivo Circulante exige gestão de caixa diária para honrar impostos, fornecedores e salários.",
            "Passivo Não Circulante estrutura o crescimento de longo prazo sem sufocar a operação.",
            "Patrimônio Líquido mede a riqueza real gerada ou destruída para os donos da empresa ao longo do tempo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
`;

// Insert the new module after the opening array bracket of SUBJECTS_DB
const insertIndex = content.indexOf('export const SUBJECTS_DB: SubjectContent[] = [') + 'export const SUBJECTS_DB: SubjectContent[] = ['.length;
content = content.slice(0, insertIndex) + newModule + content.slice(insertIndex);

fs.writeFileSync(file, content);
console.log("Successfully added M4-T1-S5 module to caderno-content-m1-m8.ts");