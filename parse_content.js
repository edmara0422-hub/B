const fs = require('fs');

const file = '/Users/edmararocha/Documents/Business Syllabus/data/caderno-content-m1-m8.ts';

const data = {
  "M4-T1-S2": {
    "id": "M4-T1-S2",
    "code": "M4-02",
    "title": "Pensamento Criativo",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: O que é Pensamento Criativo",
        "description": "Da neurociência ao modelo de Guilford — criatividade como competência treinável",
        "subsections": [
          {
            "title": "Redes Cerebrais e o que define a criatividade",
            "content": "Pensamento criativo é a capacidade cognitiva de gerar ideias, soluções ou conexões que são simultaneamente originais e úteis. Diferente do senso comum, criatividade não é um dom exclusivo de artistas — é uma competência treinável, mensurável e essencial para a sobrevivência empresarial.\n\nPesquisas com fMRI revelam que a criatividade envolve três redes cerebrais simultâneas: DMN (Default Mode Network) para imaginação, ECN (Executive Control Network) para refinar e selecionar ideias, e SN (Salience Network) que alterna entre as duas. O insight ocorre quando a SN detecta uma conexão inesperada gerada pela DMN e a passa para validação pela ECN.\n\nO que define uma pessoa criativa: Curiosidade, Ângulo inusitado, Perseverança e Humildade.",
            "quote": "Criatividade não reside em um hemisfério específico, mas na colaboração entre diferentes redes.",
            "deepDive": "Estudos longitudinais de George Land mostraram que 98% das crianças de 5 anos são 'gênios criativos', mas apenas 2% dos adultos mantêm esse nível. A criatividade é desaprendida."
          },
          {
            "title": "Pensamento Divergente vs Convergente",
            "content": "Joy Paul Guilford criou a diferenciação entre pensamento convergente (raciocínio analítico) e divergente (várias alternativas). As 4 métricas do pensamento divergente são: Fluência (quantidade), Flexibilidade (variedade), Originalidade (raridade) e Elaboração (detalhe).\n\nO erro mais comum em empresas é convergir prematuramente. Separe fisicamente sessões divergentes das convergentes.\n\nEstilos criativos (Michael Kirton): Adaptadores melhoram o que existe (incremental); Inovadores mudam o sistema (radical).",
            "quote": "As melhores ideias surgem após a ideia #50.",
            "studyCase": {
              "title": "Criatividade Estratégica na Prática",
              "body": "Nubank: 8 pessoas reimaginaram a experiência bancária. A criatividade não foi tecnológica, foi no modelo. Embraer: criou jatos para nichos que as gigantes ignoravam (70-130 assentos). Havaianas: O produto é o mesmo desde 1962, a criatividade foi no posicionamento."
            }
          }
        ],
        "synthesis": {
          "title": "Síntese",
          "bullets": [
            "Criatividade é competência treinável, não um dom mágico.",
            "Separe os momentos de gerar ideias (divergente) de julgar ideias (convergente).",
            "As 4 métricas principais: Fluência, Flexibilidade, Originalidade e Elaboração."
          ],
          "insights": ["Ambiente seguro para falhar", "Velocidade na ideação"]
        }
      },
      {
        "title": "2: Métodos de Criatividade",
        "description": "Design Thinking, Brainstorming Estruturado e SCAMPER",
        "subsections": [
          {
            "title": "Design Thinking",
            "content": "Abordagem de resolução de problemas centrada no ser humano. Fase 1 (Empatizar): observar o que o usuário faz. Fase 2 (Definir): Sintetizar necessidades em POV. Fase 3 (Idear): Geração volumétrica. Fase 4 (Prototipar): Construir rápido e barato. Fase 5 (Testar): Falhar rápido para aprender.",
            "quote": "Se uma imagem vale mil palavras, um protótipo vale mil reuniões.",
            "studyCase": {
              "title": "Prototipagem de Sucesso",
              "body": "IDEO redesenhou carrinhos de supermercado focando no usuário. Dropbox validou o produto inteiro com um vídeo de demonstração antes de escrever o código. Natura evitou perda de milhões testando protótipos de embalagem em lojas."
            }
          },
          {
            "title": "Brainstorming e SCAMPER",
            "content": "Brainstorming precisa de estrutura (ex: Brainwriting 6-3-5, Round Robin, Crazy 8s). Sem regras, grupos produzem menos que sozinhos.\n\nSCAMPER (Substituir, Combinar, Adaptar, Modificar, Propor outro uso, Eliminar, Reorganizar) é ideal para inovar sobre algo que já existe. Exemplo de Combinar: iPhone combinou telefone, GPS, player e computador. Eliminar: IKEA eliminou montagem na fábrica.",
            "quote": "Nenhum método é universalmente superior. Saiba qual usar.",
            "deepDive": "Design Thinking resolve problemas de usuário. Brainstorming gera volume. SCAMPER evolui produto existente."
          }
        ],
        "synthesis": {
          "title": "Síntese",
          "bullets": [
            "Brainstorming não estruturado é menos produtivo que trabalho individual.",
            "Prototipar rápido e barato é essencial para aprender rápido.",
            "O SCAMPER é a ferramenta mais prática para aprimorar algo já existente."
          ],
          "insights": ["Agilidade na validação", "Foco no usuário real"]
        }
      },
      {
        "title": "3: Ferramentas Avançadas e Bloqueios",
        "description": "Pensamento Lateral, TRIZ, Mapas Mentais e os 5 bloqueios da criatividade",
        "subsections": [
          {
            "title": "Os Seis Chapéus do Pensamento",
            "content": "Edward de Bono propôs o uso de 'chapéus' para organizar o raciocínio em grupo. Branco (Fatos), Vermelho (Emoções), Preto (Cautela/Riscos), Amarelo (Otimismo), Verde (Criatividade) e Azul (Processo/Meta-pensamento). Todos usam o mesmo chapéu simultaneamente para evitar conflitos de ego e permitir exploração paralela.",
            "quote": "Limites geram inovação. Restrição de tempo, dinheiro ou recursos força o pensamento criativo."
          },
          {
            "title": "Bloqueios Criativos",
            "content": "Bloqueios são estados cognitivos previsíveis. Bloqueio Perceptivo (fixação funcional - não ver usos alternativos). Bloqueio Emocional (medo de julgamento - afeta brainstorming). Bloqueio Cultural (pune pensamento diferente, Groupthink). Bloqueio Ambiental (falta de tempo e espaço adequados).",
            "studyCase": {
              "title": "Superando Bloqueios",
              "body": "Projeto Aristotle do Google descobriu que Segurança Psicológica (poder errar sem medo) é o fator #1 de alta performance. CIA usa 'Red Teams' para atacar ideias dominantes e evitar Groupthink. A 3M dá 15% de tempo livre, gerando inovações como o Post-it."
            }
          }
        ],
        "synthesis": {
          "title": "Síntese",
          "bullets": [
            "Identificar bloqueios (emocionais, culturais, ambientais) é o primeiro passo.",
            "Os 6 Chapéus garantem que a equipe olhe sob a mesma perspectiva simultaneamente.",
            "Restrições agem como motor produtivo e não como limite criativo."
          ],
          "insights": ["Segurança psicológica", "Inovação sob pressão"]
        }
      }
    ]
  },
  "M4-T1-S3": {
    "id": "M4-T1-S3",
    "code": "M4-03",
    "title": "Sustentabilidade em Negócios",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Por que Sustentabilidade Virou Estratégia",
        "description": "Do TBL ao modelo de Círculos Aninhados",
        "subsections": [
          {
            "title": "Triple Bottom Line (TBL)",
            "content": "A sustentabilidade deixou de ser filantropia e virou gestão de risco e vantagem competitiva (critérios ESG). O TBL (John Elkington, 1994) mede sucesso em 3Ps: People (pessoas e impacto social), Planet (impacto ambiental e regeneração) e Profit (viabilidade econômica responsável).\n\nNo entanto, em 2018 Elkington pediu o 'recall' do TBL pois virou ferramenta de Greenwashing. O modelo ideal é o de 'Círculos Aninhados': a economia está dentro da sociedade, que está dentro do meio ambiente. Sem planeta, não há sociedade nem economia.",
            "quote": "Sustentabilidade não é custo — é vantagem competitiva mensurável."
          }
        ],
        "synthesis": {
          "title": "Síntese",
          "bullets": [
            "TBL foca em Pessoas, Planeta e Lucro.",
            "O meio ambiente engloba a sociedade e a economia.",
            "Ações sustentáveis reais minimizam riscos financeiros de longo prazo."
          ],
          "insights": ["Gestão de Risco Integrada", "Relevância ESG"]
        }
      },
      {
        "title": "2: ESG e Frameworks de Reporte",
        "description": "Environmental, Social, Governance, GRI, SASB e ODS",
        "subsections": [
          {
            "title": "O Tripé do Mercado: ESG",
            "content": "E (Ambiental) trata de emissões, água e biodiversidade (ex: falha da Vale em Brumadinho). S (Social) trata de diversidade, comunidade e condições (ex: Magalu e trainee). G (Governance) trata de transparência e conselho (ex: caso Americanas).\n\nFrameworks de Reporte: GRI (stakeholders amplos e impactos universais), SASB (para investidores e métricas financeiras setoriais) e ODS (17 metas da ONU para erradicar problemas globais até 2030).",
            "quote": "ESG não é relatório — é critério de investimento.",
            "deepDive": "CSV (Creating Shared Value) de Porter: lucrar porque resolve problema social, não apesar dele. A empresa reconcebe produtos, redefine produtividade na cadeia e desenvolve clusters locais."
          }
        ],
        "synthesis": {
          "title": "Síntese",
          "bullets": [
            "ESG transforma ética corporativa em avaliação de risco.",
            "GRI foca no impacto amplo, enquanto SASB foca em impacto financeiro direto.",
            "Valor Compartilhado é gerar lucro através da resolução de gargalos sociais."
          ],
          "insights": ["Transparência Auditável", "Inovação Estratégica"]
        }
      },
      {
        "title": "3: Greenwashing e Implementação Prática",
        "description": "Como separar substância de discurso e aplicar os 8 passos",
        "subsections": [
          {
            "title": "Greenwashing e a Economia Regenerativa",
            "content": "Greenwashing é projetar imagem sustentável sem prática. Os 7 pecados incluem o 'Trade-off oculto' (destacar um atributo verde enquanto gera poluição maior), alegações vagas e selos falsos.\n\nA economia regenerativa busca ir além da redução de danos ('Cisnes Verdes'): criar impacto Net-Positive (ex: remover mais CO2 do que emite), aplicando circularidade total nos produtos.",
            "quote": "Política sem governança é apenas um documento."
          },
          {
            "title": "Implementando a Política (8 Passos)",
            "content": "1. Diagnóstico de impactos atuais; 2. Definir materialidade (temas relevantes); 3. Metas SMART (específicas, mensuráveis, atingíveis, relevantes, com prazo); 4. Criar governança (Comitê ativo); 5. Capacitar equipe; 6. Implementar processos; 7. Medir e reportar; 8. Revisar e iterar. \n\nA regra de ouro: O primeiro passo não precisa ser perfeito, apenas constante. Comece com redução de papel, energia ou plásticos.",
            "studyCase": {
              "title": "Metas SMART",
              "body": "Não diga 'Vamos poluir menos'. Diga 'Reduzir emissões de CO2 na operação logística em 15% até Dezembro de 2026'. O CONAR proíbe termos vagos como 'Amigo da Natureza' em peças de marketing sem comprovação técnica rigorosa."
            }
          }
        ],
        "synthesis": {
          "title": "Síntese",
          "bullets": [
            "Identifique e elimine qualquer traço de Greenwashing.",
            "A política deve ser amparada por metas SMART e governança forte.",
            "A nova economia não quer apenas neutralidade, busca regeneração."
          ],
          "insights": ["Alinhamento Operacional", "Ética Comprovada"]
        }
      }
    ]
  },
  "M4-T1-S4": {
    "id": "M4-T1-S4",
    "code": "M4-04",
    "title": "BPMN e Modelagem de Processos",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Elementos e Notações (BPMN)",
        "description": "Como mapear e otimizar processos na notação padrão global",
        "subsections": [
          {
            "title": "Os 4 Tipos de Elementos",
            "content": "BPMN funciona como um tradutor universal entre negócios e TI. 1. Objetos de Fluxo (Eventos, Atividades e Gateways). 2. Objetos de Conexão (Fluxo de sequência e mensagens). 3. Swimlanes (Pools para organizações, Lanes para departamentos). 4. Artefatos (Objetos de dados, anotações).\n\nO conceito de 'Token' é a instância ativa que percorre o diagrama desde o evento de início até o fim.",
            "quote": "BPMN elimina silos ao visualizar o processo de ponta a ponta.",
            "deepDive": "Níveis de maturidade: Descritivo (alto nível e manuais), Analítico (trata exceções e cenários) e Executável (para automação via BPMS como Bizagi)."
          },
          {
            "title": "Gateways: Filtros de Decisão",
            "content": "Gateways controlam o token: XOR (Exclusivo - ou um caminho ou outro, baseado em condição), AND (Paralelo - todas as tarefas simultâneas, exige sincronização), OR (Inclusivo - um ou mais caminhos dependendo da regra), e Baseado em Eventos (quem ocorrer primeiro vence).",
            "studyCase": {
              "title": "Exemplo Prático de AND Gateway",
              "body": "Em um e-commerce: após o pagamento ser aprovado, o Gateway AND divide o token para 1. Separar produto no estoque; 2. Gerar Nota Fiscal; 3. Notificar Transportadora. O Gateway final AND sincroniza tudo e só deixa o processo continuar quando os 3 acabarem."
            }
          }
        ],
        "synthesis": {
          "title": "Síntese",
          "bullets": [
            "BPMN traz uma linguagem visual unificada para negócio e desenvolvedores.",
            "Gateways governam o desvio, criação ou união de fluxos (tokens).",
            "Piscinas (Pools) separam empresas, Raias (Lanes) separam departamentos."
          ],
          "insights": ["Automação de Processos", "Visualização Ponta a Ponta"]
        }
      }
    ]
  }
};

let dbContent = fs.readFileSync(file, 'utf8');

// Insert the new objects directly inside the SUBJECTS_DB array
const insertStr = Object.values(data).map(obj => JSON.stringify(obj, null, 2) + ",").join("\n");

const insertIndex = dbContent.indexOf('export const SUBJECTS_DB: SubjectContent[] = [') + 'export const SUBJECTS_DB: SubjectContent[] = ['.length;
dbContent = dbContent.slice(0, insertIndex) + "\n" + insertStr + dbContent.slice(insertIndex);

fs.writeFileSync(file, dbContent);
console.log("Successfully added M4-T1-S2, M4-T1-S3, M4-T1-S4 modules");