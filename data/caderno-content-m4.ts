import type { CadernoModuleContent } from '@/types/caderno'

export const M4_CONTENT: CadernoModuleContent = {
  moduleId: 'M4',
  topics: [
    {
      id: 'M4-T1',
      title: 'Inovação e Estratégia',
      blocks: [
        {
          id: 'M4-T1-S1',
          type: 'slides',
          title: 'Inovação, Criatividade e Sustentabilidade',
          slides: [
            {
              title: 'Design Thinking e Ecologia',
              bullets: [
                'Uso do pensamento de design focado em soluções circulares de baixo impacto',
                'Estágios clássicos: Empatia, Definição, Ideação, Prototipação e Teste Sustentável',
                'Mitigação de resíduos de ponta a ponta desde a concepção do produto (Cradle-to-Cradle)'
              ],
              highlight: 'Criatividade aliada à sustentabilidade redesenha modelos de negócios para o século XXI.'
            }
          ]
        },
        {
          id: 'M4-T1-S2',
          type: 'slides',
          title: 'Inovação, Transformação e Ferramentas Digitais',
          slides: [
            {
              title: 'Automação e IA em Larga Escala',
              bullets: [
                'Uso de agentes de inteligência artificial para otimização de fluxos operacionais',
                'Ferramentas de computação em nuvem, Big Data e modelagem analítica preditiva',
                'Redução de lead-time através da digitalização de processos burocráticos'
              ],
              highlight: 'A transformação digital não é sobre tecnologia, é sobre agilidade cultural e valor.'
            }
          ]
        },
        {
          id: 'M4-T1-S3',
          type: 'slides',
          title: 'Pensamento Criativo',
          slides: [
            {
              title: 'Lógica Lateral e Habilidades Cognitivas',
              bullets: [
                'Estratégias para quebrar barreiras cognitivas tradicionais e resolver problemas complexos',
                'Técnicas de brainstorming estruturado, mapas mentais dinâmicos e SCAMPER',
                'Incentivo à experimentação ativa e aceitação rápida do fracasso construtivo'
              ],
              highlight: 'O pensamento criativo é o ativo intangível mais valioso de uma corporação sob incerteza.'
            }
          ]
        },
        {
          id: 'M4-T1-S4',
          type: 'slides',
          title: 'Empreendedorismo e Inovação',
          slides: [
            {
              title: 'Criação de Modelos de Negócio Exponenciais',
              bullets: [
                'Uso do framework Lean Startup para validação de hipóteses de mercado',
                'Mapeamento de propostas de valor disruptivas utilizando o Business Model Canvas',
                'Identificação de oceanos azuis e gaps mercadológicos para escalabilidade'
              ],
              highlight: 'Empreender exige alinhar dor do cliente com soluções de alta adaptabilidade.'
            }
          ]
        },
        {
          id: 'M4-T1-S5',
          type: 'slides',
          title: 'Empreendedorismo e Estratégia',
          slides: [
            {
              title: 'Posicionamento e Vantagem Competitiva',
              bullets: [
                'Formulação de estratégias corporativas de longo prazo sob volatilidade (VUCA/BANI)',
                'Definição de objetivos de mercado e core-competence organizacionais',
                'Alinhamento tático de recursos e capabilities para mitigar riscos concorrenciais'
              ],
              highlight: 'A estratégia de alto impacto garante que o amanhã seja planejado com clareza matemática.'
            }
          ]
        }
      ]
    },
    {
      id: 'M4-T2',
      title: 'Finanças e Inteligência Quantitativa',
      blocks: [
        {
          id: 'M4-T2-S1',
          type: 'slides',
          title: 'Finanças Avançadas',
          slides: [
            {
              title: 'Estrutura de Capital e Valuation',
              bullets: [
                'Análise de custo médio ponderado de capital (WACC) e alavancagem financeira',
                'Modelagem de Fluxo de Caixa Descontado (DCF) para avaliação de ativos corporativos',
                'Decisões de investimento complexas baseadas em VPL, TIR e payback dinâmico'
              ],
              highlight: 'A saúde financeira sustentável é medida pela governança de caixa e geração de valor.'
            }
          ]
        },
        {
          id: 'M4-T2-S2',
          type: 'slides',
          title: 'Análise Financeira',
          slides: [
            {
              title: 'Demonstrações de Performance e EBITDA',
              bullets: [
                'Leitura aprofundada de rentabilidade operacional, geração de caixa e passivo circulante',
                'Cálculo e interpretação de ROE, ROIC e giro de ativos corporativos',
                'Monitoramento de liquidez corrente e margens de contribuição por produto'
              ],
              highlight: 'A análise financeira afiada identifica ineficiências invisíveis aos olhos operacionais.'
            }
          ]
        },
        {
          id: 'M4-T2-S3',
          type: 'slides',
          title: 'Matemática Financeira',
          slides: [
            {
              title: 'Juros Compostos e Equivalência de Fluxos',
              bullets: [
                'Cálculos avançados de taxas de juros nominais, efetivas, reais e equivalentes',
                'Amortização de dívidas utilizando tabelas SAC, Price e sistemas mistos',
                'Valor do dinheiro no tempo como princípio fundamental para tomadas de decisão'
              ],
              highlight: 'Dominar o tempo e a taxa é a chave de qualquer modelagem quantitativa de sucesso.'
            },
            {
              title: 'Nomenclatura HP 12C & Capitalização Composta',
              bullets: [
                'O tempo atua como multiplicador geométrico (juro sobre juro) acumulando a cada período',
                'Nomenclatura padrão da HP 12C: PV (valor presente), FV (valor futuro) e PMT (prestação/pagamento)',
                'Controle de prazo (n) e taxa de juros (i) para tomada de decisão em investimentos e empréstimos'
              ],
              highlight: 'O regime composto capitaliza os juros gerados a cada período na nova base de cálculo.'
            },
            {
              title: 'Desconto Composto: Racional vs Comercial',
              bullets: [
                'Desconto Racional (por dentro): calcula o valor atual (PV) de forma equivalente aos juros compostos',
                'Desconto Comercial (por fora): incide sobre o valor nominal (FV) deduzido dos descontos anteriores',
                'Aplicação em títulos antecipados, financiamento de compras e fluxos de caixa corporativos'
              ],
              highlight: 'O desconto racional é a aplicação direta dos juros compostos para obter o capital inicial.'
            }
          ]
        },
        {
          id: 'M4-T2-S4',
          type: 'slides',
          title: 'Demonstrações Contábeis',
          slides: [
            {
              title: 'Balanço Patrimonial e DRE',
              bullets: [
                'Estruturação contábil e conciliação de ativos, passivos e patrimônio líquido',
                'Elaboração e análise da Demonstração do Resultado do Exercício (DRE)',
                'Conformidade técnica internacional (IFRS) para publicação corporativa'
              ],
              highlight: 'A transparência contábil é o alicerce da confiança perante o mercado e auditores.'
            }
          ]
        },
        {
          id: 'M4-T2-S5',
          type: 'slides',
          title: 'Precificação',
          slides: [
            {
              title: 'Estratégias de Preço baseadas em Margem e Valor',
              bullets: [
                'Cálculo de markup, custos fixos, variáveis e ponto de equilíbrio (breakeven)',
                'Táticas de precificação dinâmica, baseada em elasticidade de demanda e valor percebido',
                'Alinhamento de margens corporativas com metas agressivas de market-share'
              ],
              highlight: 'Preço é o que o cliente paga; valor é o que ele percebe e retém.'
            }
          ]
        },
        {
          id: 'M4-T2-S6',
          type: 'slides',
          title: 'Cálculo Aplicado a Negócios',
          slides: [
            {
              title: 'Otimização e Taxas de Variação',
              bullets: [
                'Aplicação de derivadas para maximização de lucro corporativo e minimização de custos',
                'Análise de produtividade marginal de insumos e fatores de produção',
                'Modelos matemáticos determinísticos aplicados ao comportamento de oferta e demanda'
              ],
              highlight: 'O cálculo diferencial fornece a precisão exata para a otimização de limites operacionais.'
            }
          ]
        },
        {
          id: 'M4-T2-S7',
          type: 'slides',
          title: 'Análise Estatística',
          slides: [
            {
              title: 'Inferência de Dados e Previsões',
              bullets: [
                'Uso de regressão linear para previsão de vendas e comportamento de consumidores',
                'Cálculo de desvio padrão, intervalos de confiança e testes de hipóteses de qualidade',
                'Transformação de dados estatísticos brutos em inteligência corporativa e dashboards'
              ],
              highlight: 'Em Deus nós confiamos; para todos os outros, tragam-me dados estatísticos.'
            }
          ]
        }
      ]
    },
    {
      id: 'M4-T3',
      title: 'Liderança, Pessoas e Cultura',
      blocks: [
        {
          id: 'M4-T3-S1',
          type: 'slides',
          title: 'Liderança e Gestão de Equipes',
          slides: [
            {
              title: 'Segurança Psicológica e Performance',
              bullets: [
                'Construção de clima organizacional de transparência extrema (Modelo Google Aristotle)',
                'Delegação ágil de responsabilidades baseada em competências individuais e autonomia',
                'Gestão humanizada e empática focada em retenção de talentos de alto impacto'
              ],
              highlight: 'Líderes modernos não gerenciam tarefas; eles desbloqueiam o potencial humano.'
            }
          ]
        },
        {
          id: 'M4-T3-S2',
          type: 'slides',
          title: 'Mercado e Pessoas',
          slides: [
            {
              title: 'Employer Branding e Captação de Talentos',
              bullets: [
                'Estratégias de posicionamento da empresa como marca empregadora de destaque',
                'Alinhamento entre as expectativas da geração Z/Millennials e os valores corporativos',
                'Estruturação de planos de desenvolvimento individuais (PDI) focados em crescimento mútuo'
              ],
              highlight: 'A principal vantagem competitiva sustentável é a densidade de talentos do seu time.'
            }
          ]
        },
        {
          id: 'M4-T3-S3',
          type: 'slides',
          title: 'Educação, Identidade e Solidariedade',
          slides: [
            {
              title: 'Cultura Inclusiva e Responsabilidade Coletiva',
              bullets: [
                'Promoção de diversidade, equidade e inclusão (DEI) em todos os níveis da corporação',
                'Programas de mentoria coletiva e desenvolvimento social sustentável',
                'Establecimento de conexões solidárias genuínas entre os colaboradores e a sociedade'
              ],
              highlight: 'Uma empresa próspera só existe dentro de uma comunidade saudável e engajada.'
            }
          ]
        },
        {
          id: 'M4-T3-S4',
          type: 'slides',
          title: 'Ética',
          slides: [
            {
              title: 'Compliance e Valores Universais nos Negócios',
              bullets: [
                'Implementação prática de códigos de conduta rigorosos contra fraudes e assédio',
                'Decisões corporativas fundamentadas em princípios éticos invioláveis perante o lucro',
                'Cultura de integridade radical construída pelo exemplo da alta liderança (Tone from the Top)'
              ],
              highlight: 'A reputação corporativa leva décadas para ser construída e minutos para ser destruída por falhas éticas.'
            }
          ]
        }
      ]
    },
    {
      id: 'M4-T4',
      title: 'Gestão e Operações Corporativas',
      blocks: [
        {
          id: 'M4-T4-S1',
          type: 'slides',
          title: 'Fundamentos de Gestão',
          slides: [
            {
              title: 'Funções Administrativas Clássicas',
              bullets: [
                'Planejamento, Organização, Direção e Controle aplicados à realidade contemporânea',
                'Desenho de organogramas eficientes e fluxogramas de redução de gargalos operacionais',
                'Mapeamento tático de recursos escassos visando eficiência produtiva máxima'
              ],
              highlight: 'Gestão sólida é a base que sustenta a criatividade e a disrupção corporativa.'
            }
          ]
        },
        {
          id: 'M4-T4-S2',
          type: 'slides',
          title: 'Gestão de Negócios',
          slides: [
            {
              title: 'OKR e KPIs: Foco em Resultados',
              bullets: [
                'Implementação e monitoramento de Objectives and Key Results (OKRs) ágeis',
                'Criação de painéis de telemetria baseados em Balanced Scorecard (BSC)',
                'Garantia de alinhamento estratégico transversal conectando todos os setores da corporação'
              ],
              highlight: 'O que não é medido não é gerenciado e dificilmente será otimizado.'
            }
          ]
        },
        {
          id: 'M4-T4-S3',
          type: 'slides',
          title: 'Sustentabilidade em Negócios',
          slides: [
            {
              title: 'Economia Circular e Pegada Ecológica',
              bullets: [
                'Transição operacional do modelo linear (extrair, fazer, descartar) para o circular',
                'Desenho de produtos focados em reciclagem, refabricação e logística reversa',
                'Mapeamento ativamente de emissões de carbono com metas sólidas de neutralização'
              ],
              highlight: 'A sustentabilidade não é um custo regulatório, é a longevidade estratégica da empresa.'
            }
          ]
        }
      ]
    },
    {
      id: 'M4-T5',
      title: 'Mercado e Macroeconomia',
      blocks: [
        {
          id: 'M4-T5-S1',
          type: 'slides',
          title: 'Economia de Empresa e Análise Mercadológica',
          slides: [
            {
              title: 'Microeconomia e Forças do Mercado',
              bullets: [
                'Estudo de concorrência perfeita, monopólios, oligopólios e estruturas de custos',
                'Elasticidade de demanda e mapeamento de excedente do consumidor e produtor',
                'Framework das 5 Forças de Porter aplicadas ao ecossistema moderno de tecnologia'
              ],
              highlight: 'Compreender a dinâmica de forças do seu setor é a base do seu diferencial competitivo.'
            }
          ]
        },
        {
          id: 'M4-T5-S2',
          type: 'slides',
          title: 'Ambiente Macroeconômico',
          slides: [
            {
              title: 'Indicadores Globais e Políticas Monetárias',
              bullets: [
                'Impacto de taxas de juros (Selic, FED), inflação e PIB no planejamento corporativo',
                'Análise de ciclos econômicos, balança comercial e volatilidade de câmbio',
                'Formulação de estratégias defensivas para períodos de contração e recessão cambial'
              ],
              highlight: 'Nenhum negócio é uma idia; a inteligência macroeconômica blinda a empresa contra choques globais.'
            }
          ]
        },
        {
          id: 'M4-T5-S3',
          type: 'slides',
          title: 'Lógica e Humanidades',
          slides: [
            {
              title: 'Estruturação de Argumentos e Falácias nos Negócios',
              bullets: [
                'Uso de lógica proposicional aplicada à construção de cenários e tomadas de decisão',
                'Identificação ativa de vieses cognitivos e falácias lógicas em discursos de negociação',
                'Interpretação crítica do comportamento social corporativo sob a ótica das humanidades'
              ],
              highlight: 'A clareza de pensamento lógico poupa milhões em decisões precipitadas ou baseadas em falsas premissas.'
            }
          ]
        },
        {
          id: 'M4-T5-S4',
          type: 'slides',
          title: 'Filosofia',
          slides: [
            {
              title: 'Pensamento Crítico, Ética e Tomada de Decisão',
              bullets: [
                'Exploração de frameworks filosóficos clássicos (utilitarismo, deontologia) aplicados a dilemas modernos',
                'Questionamento analítico de premissas organizacionais estagnadas (Status Quo)',
                'A busca pelo propósito corporativo (Ikigai) e a geração de valor existencial compartilhado'
              ],
              highlight: 'A filosofia ensina a fazer as perguntas certas em vez de aceitar respostas prontas.'
            }
          ]
        }
      ]
    },
    {
      id: 'M4-T6',
      title: 'Impacto Social e Intervenção',
      blocks: [
        {
          id: 'M4-T6-S1',
          type: 'slides',
          title: 'Pesquisa Aplicada a Negócios',
          slides: [
            {
              title: 'Metodologias Científicas de Validação e Mercado',
              bullets: [
                'Estruturação de pesquisas quantitativas, qualitativas e grupos de foco estruturados',
                'Coleta de dados primários e secundários sem vieses analíticos indesejados',
                'Garantia de validação estatística de hipóteses antes de grandes lançamentos de produtos'
              ],
              highlight: 'Pesquisa profissional transforma palpites e intuições corporativas em certezas estratégicas.'
            }
          ]
        },
        {
          id: 'M4-T6-S2',
          type: 'slides',
          title: 'Projeto de Intervenção em Negócios',
          slides: [
            {
              title: 'Diagnóstico Operacional e Resolução de Dores Reais',
              bullets: [
                'Identificação de ineficiências em processos existentes e formulação de planos de intervenção',
                'Aplicação do ciclo PDCA e matriz de priorização (GUT) para correção ágil de falhas',
                'Cronograma de execução baseado em marcos (Milestones) e gestão de stakeholders'
              ],
              highlight: 'Intervir com método gera valor imediato ao converter problemas crônicos em inovação pragmática.'
            }
          ]
        },
        {
          id: 'M4-T6-S3',
          type: 'slides',
          title: 'Empreendedorismo Social',
          slides: [
            {
              title: 'Negócios de Impacto e Valor Compartilhado',
              bullets: [
                'Desenho de modelos autossustentáveis cujo core-business resolve mazelas sociais reais',
                'Definição e acompanhamento de métricas de impacto socioambiental positivo (SROI)',
                'Atuação estratégica em consonância com as Metas de Desenvolvimento Sustentável (ODS/ONU)'
              ],
              highlight: 'Empreender socialmente é provar que é possível lucrar resolvendo dores coletivas profundas.'
            }
          ]
        },
        {
          id: 'M4-T6-S4',
          type: 'slides',
          title: 'Intervenção e Sociedade',
          slides: [
            {
              title: 'Projetos de Extensão e Desenvolvimento Comunitário',
              bullets: [
                'Diagnóstico participativo com comunidades locais para criação de cooperativas sustentáveis',
                'Empoderamento de populações vulneráveis através de capacitação financeira e empreendedora',
                'Mitigação de desigualdades através de ações táticas pontuais integradas ao setor privado'
              ],
              highlight: 'Sociedade fortalecida consome com consciência e retroalimenta o ciclo da economia.'
            }
          ]
        },
        {
          id: 'M4-T6-S5',
          type: 'slides',
          title: 'Teologia e Sociedade',
          slides: [
            {
              title: 'Dimensão Transcendental e o Papel Ético na Comunidade',
              bullets: [
                'Investigação das raízes teológicas e de justiça social que regem o comportamento comunitário',
                'O papel das instituições de fé na coesão social, solidariedade e preservação da dignidade humana',
                'Diálogo inter-religioso e ecumênico visando pacificação e inclusão ética em ecossistemas de negócios'
              ],
              highlight: 'A busca pelo transcendental inspira a responsabilidade ética máxima perante o próximo e a criação.'
            }
          ]
        },
        {
          id: 'M4-T6-S6',
          type: 'slides',
          title: 'Pesquisa e Identidade',
          slides: [
            {
              title: 'Autoconhecimento, História Social e Propósito Acadêmico',
              bullets: [
                'Investigação de raízes identitárias individuais aplicadas ao desenvolvimento profissional',
                'O papel da história social e demográfica na formulação do perfil de liderança',
                'Construção de projetos de vida estruturados a partir de pesquisa e fundamentos reflexivos'
              ],
              highlight: 'Compreender a própria identidade é a âncora que estabiliza a liderança em tempos de tempestades corporativas.'
            }
          ]
        },
        {
          id: 'M4-T6-S7',
          type: 'slides',
          title: 'Leitura e Escrita Acadêmica',
          slides: [
            {
              title: 'Comunicação Científica de Alto Impacto',
              bullets: [
                'Redação estruturada de artigos de pesquisa, relatórios técnicos executivos e resumos estratégicos',
                'Metodologia de citação (ABNT, APA) visando integridade acadêmica absoluta contra plágios',
                'Técnicas de síntese de informação densa para construção de briefings concisos'
              ],
              highlight: 'Escrever com clareza é a manifestação de um pensamento estruturado e rigoroso.'
            }
          ]
        }
      ]
    }
  ]
}
