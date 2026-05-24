// Generated Automatically from INTELLIGENCE_TEXTO_COMPLETO_M1_M8.md
export interface SubsectionContent {
  title: string
  content: string
  quote?: string
  studyCase?: { title: string; body: string } | null
  deepDive?: string
}

export interface ChapterContent {
  title: string
  description?: string
  subsections: SubsectionContent[]
  synthesis?: {
    title: string
    bullets: string[]
    insights: string[]
  }
}

export interface SubjectContent {
  id: string
  code: string
  title: string
  videoUrls: { title: string; url: string }[]
  chapters: ChapterContent[]
}

export const SUBJECTS_DB: SubjectContent[] = [
  {
    "id": "M1-S1",
    "code": "M1-0",
    "title": "Gestao da Inovacao, Transformacao e Ferramentas Digitais",
    "videoUrls": [
      {
        "title": "M1-01 Inovação, Transformação e Ferramentas Digitais",
        "url": "https://qvvqbngiwqfuxsbgcxtc.supabase.co/storage/v1/object/public/videos/IPB/Inovacao.mp4"
      },
      {
        "title": "M1-01 A Dupla Face da IA",
        "url": "https://qvvqbngiwqfuxsbgcxtc.supabase.co/storage/v1/object/public/videos/IPB/A_Dupla_Face_da_IA.mp4"
      }
    ],
    "chapters": [
      {
        "title": "1: Era Digital · As 3 Fases da Tecnologia",
        "description": "Como o papel da TI mudou nas empresas — de bastidor operacional a coração do negócio",
        "subsections": [
          {
            "title": "Fase 1 — Infraestrutura (Anos 2000)",
            "content": "Foco na estabilidade de servidores e redes operacionais. A TI era setor de suporte: o sucesso era medido em **uptime**, não em receita. Manter os sistemas no ar para que o negócio acontecesse era a função inteira. Investir em tecnologia significava comprar hardware, contratar suporte e rezar para nada cair.",
            "quote": "Estudo de Caso — Banco do Brasil (2003):",
            "studyCase": {
              "title": "Banco do Brasil (2003)",
              "body": "R$ 2 bilhões investidos em datacenter para sustentar 5.000 agências em rede. Cada hora de queda custava R$ 40 milhões em transações perdidas. TI era custo necessário, não diferencial competitivo."
            },
            "deepDive": "O paradoxo da Fase 1: TI virou pré-requisito de existir, não diferencial de competir. A consequência inevitável foi a corrida para a Fase 2 — quando estabilidade já era esperada e o jogo passou a ser eficiência."
          },
          {
            "title": "Fase 2 — Processo (Anos 2010)",
            "content": "Integração de sistemas como **ERPs** e CRMs no cotidiano da gestão. A informação para de morrer em planilhas isoladas e começa a fluir entre setores. A TI vira ferramenta de organização e padronização — mas ainda a serviço de um modelo de negócio existente. Aqui a pergunta dos diretores muda: \"como otimizar?\".",
            "quote": "Estudo de Caso — Natura (2012):",
            "studyCase": {
              "title": "Natura (2012)",
              "body": "Integração de 7 países sob um único SAP. Decisões logísticas que levavam semanas viraram horas. Planilhas regionais viraram dashboards globais — mas a operação continuava sendo venda direta + varejo, só que mais rápida e auditável."
            },
            "deepDive": "A Fase 2 entrega eficiência mas não cria modelos de negócio novos. O teto da Fase 2 é o quanto o modelo antigo aguenta — quando a digitalização chega no limite, ou se rompe o modelo (Fase 3) ou se estagna."
          },
          {
            "title": "Fase 3 — Estratégia (Anos 2020 →)",
            "content": "A tecnologia define a criação de produtos, o atendimento ao cliente e a capacidade de inovar — tornando-se pilar de competitividade e reputação. A TI deixa de ser área de apoio e vira o próprio negócio. Dados, algoritmos e **efeitos de rede** criam vantagens que se auto-reforçam: mais usuários geram mais dados, que melhoram o algoritmo, que atrai mais usuários.\n\nA pergunta que separa empresas que sobrevivem das que lideram não é \"qual tecnologia adotar?\" — é \"em qual fase estamos hoje, e em qual fase o mercado ao redor já chegou?\". A diferença entre as duas respostas é o **gap** que precisa ser fechado. E quanto maior o gap, mais doloroso o salto.\n\nEmpresas que operam em fase de Processo enquanto o mercado está em fase de Estratégia perdem competitividade de forma sistemática e silenciosa. O problema é que essa perda é **invisível** até que um concorrente digital capture seus clientes. Quando percebe, o gap já é grande demais para fechar com investimento incremental.",
            "quote": "Estudo de Caso — iFood (2023):",
            "studyCase": {
              "title": "iFood (2023)",
              "body": "R$ 100 bilhões/ano movimentados sem cozinha própria nem motoboy próprio. A plataforma é o produto. Sem o algoritmo de matching e a infraestrutura digital, simplesmente não existe negócio para operar."
            },
            "deepDive": "A Fase 3 inverte o jogo: TI deixa de ser custo a se controlar e vira ativo a se multiplicar. O investimento se mede em retorno de produto, não em uptime. E quem fica preso em Fase 1 ou 2 perde o jogo sem perceber que ele mudou."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Mover-se entre fases não é só comprar tecnologia nova — é **repensar o papel da TI** dentro da empresa. Nem toda empresa precisa estar na Fase 3, mas toda empresa precisa saber em qual fase está e por quê. Esse repensar — essa mudança de identidade da organização — é o que se chama Transformação Digital.\n\n**Principais Insights:**\n\n- TI deixa de ser bastidor quando dados e algoritmos criam vantagens que se **auto-reforçam**.\n- Não existe atalho entre fases — cada salto exige redesenhar o papel da tecnologia, não só comprar mais dela.\n- O risco maior não é estar atrasado, é **não saber em qual fase você está** hoje.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "se entre fases não é só comprar tecnologia nova — é repensar o papel da TI dentro da empresa. Nem toda empresa precisa estar na Fase 3, mas toda empresa precisa saber em qual fase está e por quê. Esse repensar — essa mudança de identidade da organização — é o que se chama Transformação Digital.",
            "TI deixa de ser bastidor quando dados e algoritmos criam vantagens que se auto-reforçam.",
            "Não existe atalho entre fases — cada salto exige redesenhar o papel da tecnologia, não só comprar mais dela.",
            "O risco maior não é estar atrasado, é não saber em qual fase você está hoje."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Transformação Digital",
        "description": "Não é comprar tecnologia — é repensar como a empresa cria e entrega valor",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Transformação digital não é sobre comprar tecnologia — é sobre **repensar como a empresa cria e entrega valor**. Rogers (Columbia, 2016): os 4 domínios devem ser transformados simultaneamente, não sequencialmente.\n\n**Principais Insights:**\n\n- Digitização ≠ Digitalização ≠ Transformação — a confusão custa **bilhões** em investimentos mal direcionados.\n- SGI + TD integrados geram benefícios em 4 frentes: projetos, processos, cultura e **resultados mensuráveis**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Digitização ≠ Digitalização ≠ Transformação — a confusão custa bilhões em investimentos mal direcionados.",
            "SGI + TD integrados geram benefícios em 4 frentes: projetos, processos, cultura e resultados mensuráveis."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Governança Digital, Cultura e Gestão da Mudança",
        "description": "Os 4 pilares que sustentam — e os 5 passos que executam",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Governança não é burocracia — é o que impede que um ransomware apague seus dados, que um ex-funcionário acesse seu CRM, ou que você pague 5 ferramentas para fazer o trabalho de 2. Os 5 passos da mudança são o caminho comprovado: de **Kotter** (Harvard) a **Edmondson** (Harvard).\n\n**Principais Insights:**\n\n- Kotter (1996): **70% das transformações falham** — motivo #1 é liderança, não tecnologia.\n- Governança para PME: R$ 0-50/mês. Renner perdeu **R$ 20M** sem ela.\n- Segurança psicológica (Edmondson, Harvard 2018) é o fator **#1** de equipes de alta performance.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "funcionário acesse seu CRM, ou que você pague 5 ferramentas para fazer o trabalho de 2. Os 5 passos da mudança são o caminho comprovado: de Kotter (Harvard) a Edmondson (Harvard).",
            "Kotter (1996): 70% das transformações falham — motivo #1 é liderança, não tecnologia.",
            "Governança para PME: R$ 0-50/mês. Renner perdeu R$ 20M sem ela.",
            "Segurança psicológica (Edmondson, Harvard 2018) é o fator #1 de equipes de alta performance."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Ferramentas Digitais, LGPD e Tendências",
        "description": "De Analytics-to-Value à era dos agentes autônomos",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Ferramentas digitais sem cultura data-driven são como Ferrari na garagem. A LGPD não é obstáculo — é framework de confiança. E os agentes de IA estão redefinindo o que significa **governar** tecnologia: não basta controlar ferramentas, agora é preciso gerenciar entidades que decidem sozinhas.\n\n**Principais Insights:**\n\n- DDDM depende de 4 pilares: Coleta → Análise → Visualização → **Integração** nos processos diários.\n- LGPD + sandbox regulatório = inovação **dentro da lei**, não apesar dela.\n- Agentes de IA + RegTech transformam compliance de custo em **motor de confiança**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "driven são como Ferrari na garagem. A LGPD não é obstáculo — é framework de confiança. E os agentes de IA estão redefinindo o que significa governar tecnologia: não basta controlar ferramentas, agora é preciso gerenciar entidades que decidem sozinhas.",
            "DDDM depende de 4 pilares: Coleta → Análise → Visualização → Integração nos processos diários.",
            "LGPD + sandbox regulatório = inovação dentro da lei, não apesar dela.",
            "Agentes de IA + RegTech transformam compliance de custo em motor de confiança."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "5: Tipos e Intensidade da Inovação",
        "description": "De produto a modelo de negócio — e de rotina a arquitetônica",
        "subsections": [
          {
            "title": "Inovação de Produto/Serviço (O mais comum)",
            "content": "Mudança de produtos e serviços através de melhoria em design, usabilidade, desempenho, funcionalidade. É a forma mais **palpável** de inovar — impacta diretamente no faturamento. Pode ser algo que concorrentes já praticam (refrigerante zero açúcar) ou inédito (refrigerante com café).",
            "quote": "Estudo de Caso — Havaianas (1994):",
            "studyCase": {
              "title": "Havaianas (1994)",
              "body": "Mesmo produto desde 1962, reinventado por design e posicionamento. De R$ 2 a produto global em 100+ países. Criatividade no marketing, não na borracha."
            },
            "deepDive": "Essencial para toda empresa manter ou expandir seu mercado. Não precisa ser revolucionário — precisa gerar valor."
          },
          {
            "title": "Inovação Organizacional (Estrutural e abrangente)",
            "content": "Mudanças na cultura, equipes, hierarquia, processos internos. Pode afetar contratação, treinamento, gerenciamento, espaço físico, plano de carreiras. Maior investimento financeiro e de **esforço organizacional**.",
            "quote": "Estudo de Caso — Spotify (2012):",
            "studyCase": {
              "title": "Spotify (2012)",
              "body": "Organizou equipes em squads autônomos de 6-8 pessoas. Combinou velocidade de startup com escala corporativa. Magazine Luiza adotou modelo similar para transformar lojas em plataforma."
            },
            "deepDive": "Equipes ágeis não são só TI — são cultura organizacional. Requer mudança em contratação, avaliação e incentivos."
          },
          {
            "title": "Inovação de Processo (Eficiência e fluxo)",
            "content": "Mudanças significativas em fluxos organizacionais: gestão da inovação, marketing, vendas, qualidade, logística, TI. Objetivo: maior eficiência, menor custo, mais engajamento, menor impacto **ambiental**.",
            "quote": "Estudo de Caso — Natura (2012):",
            "studyCase": {
              "title": "Natura (2012)",
              "body": "SAP integrou 7 países. Decisões logísticas que levavam semanas viraram horas. Economia projetada de ~R$ 500M. O processo mudou — o modelo de negócio não."
            },
            "deepDive": "Pode ser pontual (uma área) ou impactar todos os processos. A maioria das inovações de processo é incremental."
          },
          {
            "title": "Inovação de Modelo de Negócio (Mudança no core)",
            "content": "Mudança significativa nas atividades core. Altera o valor agregado ao cliente e a forma de conduzir o negócio. Maior risco, mas pode garantir **sobrevivência** ou levar a outro patamar.\n\n#### 🏷️ Intensidade da inovação\n\n#### 🏛️ 4 níveis de intensidade",
            "quote": "Estudo de Caso — Xerox (2000):",
            "studyCase": {
              "title": "Xerox (2000)",
              "body": "Mudou de venda de impressoras para prestação de serviços de impressão. Garantiu negócio mais sustentável e receita recorrente. Mesmo hardware, modelo completamente diferente."
            },
            "deepDive": "Pode ou não impactar o propósito/missão, mas altera significativamente como o valor é entregue ao cliente."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Inovação não é sinônimo de tecnologia. Pode ser no **produto**, no **processo**, na **organização** ou no **modelo de negócio**. A intensidade vai de rotina (incremental) a arquitetônica (tudo muda). O tipo e a intensidade determinam o risco, o investimento e o impacto.\n\n**Principais Insights:**\n\n- Inovação sem implementação é apenas **ideia**. Precisa gerar impacto mensurável.\n- Inovação de modelo de negócio tem maior risco mas pode garantir a **sobrevivência** da empresa.\n- Inovação arquitetônica afeta modelo de negócio E tecnologia — é a mais **transformadora**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Inovação sem implementação é apenas ideia. Precisa gerar impacto mensurável.",
            "Inovação de modelo de negócio tem maior risco mas pode garantir a sobrevivência da empresa.",
            "Inovação arquitetônica afeta modelo de negócio E tecnologia — é a mais transformadora."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "6: Gestão da Inovação na Prática",
        "description": "Canvas CIE, funil, stage gates, horizontes e corporate ventures",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Gestão da inovação não é improviso — é **processo**. O Canvas CIE responde 5 perguntas essenciais. Os 3 horizontes distribuem risco (70/20/10). O funil com stage gates filtra ideias. E corporate ventures conectam grandes empresas com o ecossistema de startups.\n\n**Principais Insights:**\n\n- Funil de inovação: quanto mais ideias no **topo**, melhor. A maioria DEVE morrer na triagem — isso é positivo.\n- Stage gates (Cooper, 2001): decisões **go/no-go** em cada fase previnem investimento em projetos fadados ao fracasso.\n- Spin-in e spin-off são os dois movimentos que materializam a inovação no **mercado**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Funil de inovação: quanto mais ideias no topo, melhor. A maioria DEVE morrer na triagem — isso é positivo.",
            "Stage gates (Cooper, 2001): decisões go/no-go em cada fase previnem investimento em projetos fadados ao fracasso.",
            "Spin-in e spin-off são os dois movimentos que materializam a inovação no mercado."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "7: Cultura de Inovação",
        "description": "Dimensão interna, externa, liderança e maturidade tecnológica",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Cultura de inovação tem duas dimensões: **interna** (valores, liderança, clima) e **externa** (profissionais, patentes, ecossistema). TRL mede maturidade técnica. Hype Cycle mede expectativa de mercado. Sem cultura, as melhores ferramentas viram burocracia.\n\n**Principais Insights:**\n\n- Liderança inovadora não é centralizadora. \"O chefe tem ideias e nós executamos\" = **dependência** perigosa.\n- TRL (NASA, 1974): 9 níveis de maturidade. Quanto mais recente, mais **incerteza** e risco.\n- Hype Cycle: toda tecnologia passa por expectativa inflada → desilusão → **produtividade real**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Liderança inovadora não é centralizadora. \"O chefe tem ideias e nós executamos\" = dependência perigosa.",
            "TRL (NASA, 1974): 9 níveis de maturidade. Quanto mais recente, mais incerteza e risco.",
            "Hype Cycle: toda tecnologia passa por expectativa inflada → desilusão → produtividade real."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "8: Inteligência Organizacional e Projeto de BI",
        "description": "Do OBI ao protótipo funcional — como dados viram decisões estratégicas",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "OBI transforma a empresa em uma organização que aprende com seus próprios dados. As **4 camadas** (Dados → Integração → Analítica → Apresentação) formam o pipeline completo. Um projeto de BI segue o ciclo Kimball: requisitos → modelagem → ETL → visualização → governança. **Prototipar** antes de construir é a decisão mais inteligente.\n\n**Principais Insights:**\n\n- Inmon vs Kimball: dois paradigmas de DW. Kimball (dimensional) é mais adotado para **BI ágil**. Inmon (normalizado) para ambientes enterprise de longo prazo.\n- Regra de ouro do dashboard: **1 insight por tela**. Múltiplas métricas competindo = nenhuma decisão clara.\n- Star Schema: mais rápido, mais simples. Snowflake: mais econômico em storage, mas mais **joins**. Para BI operacional: Star vence na maioria dos casos.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Inmon vs Kimball: dois paradigmas de DW. Kimball (dimensional) é mais adotado para BI ágil. Inmon (normalizado) para ambientes enterprise de longo prazo.",
            "Regra de ouro do dashboard: 1 insight por tela. Múltiplas métricas competindo = nenhuma decisão clara.",
            "Star Schema: mais rápido, mais simples. Snowflake: mais econômico em storage, mas mais joins. Para BI operacional: Star vence na maioria dos casos.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M1-S2",
    "code": "M1-1",
    "title": "Pensamento Criativo",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: O que é Pensamento Criativo",
        "description": "Da neurociência ao modelo de Guilford — criatividade como competência treinável",
        "subsections": [
          {
            "title": "\"Criatividade é inata\" (FALSO)",
            "content": "Estudos longitudinais de **George Land** (NASA) mostraram que 98% das crianças de 5 anos são \"gênios criativos\", mas apenas 2% dos adultos mantêm esse nível. A criatividade é **desaprendida**, não ausente.",
            "quote": "Estudo de Caso — NASA / George Land (1968):",
            "studyCase": {
              "title": "NASA / George Land (1968)",
              "body": "Teste aplicado a 1.600 crianças de 4-5 anos e repetido ao longo de 15 anos. Resultado: 98% (5 anos) → 30% (10 anos) → 12% (15 anos) → 2% adultos."
            },
            "deepDive": "A criatividade não é adicionada pela educação — é removida por ela. O sistema premia convergência (resposta certa) e pune divergência (resposta diferente)."
          },
          {
            "title": "\"Brainstorming sempre funciona\" (PARCIALMENTE FALSO)",
            "content": "Sem estrutura adequada, grupos produzem **menos** e piores ideias que indivíduos trabalhando sozinhos. O problema: bloqueio de produção (só um fala por vez), medo de julgamento e free-riding.",
            "quote": "Estudo de Caso — Universidade de Tübingen (1987):",
            "studyCase": {
              "title": "Universidade de Tübingen (1987)",
              "body": "Diehl & Stroebe publicaram no Journal of Personality and Social Psychology: grupos sem regras geram menos ideias que a soma dos indivíduos sozinhos. Solução: brainwriting estruturado."
            },
            "deepDive": "A solução não é abolir brainstorming — é estruturá-lo. Brainwriting 6-3-5 elimina os 3 problemas de uma vez."
          },
          {
            "title": "\"Pressão mata criatividade\" (PARCIALMENTE VERDADEIRO)",
            "content": "**Teresa Amabile** (Harvard) mostrou que pressão moderada com propósito claro pode aumentar criatividade, mas pressão por **controle** a destrói. A diferença: pressão com significado vs pressão com medo.\n\n#### 🏷️ Guilford: pensamento divergente vs convergente\n\nJoy Paul Guilford, considerado o mentor do estudo científico da criatividade, criou em 1967 um conceito decisivo: a diferenciação entre pensamento convergente (raciocínio analítico que leva a uma solução) e pensamento divergente (que apresenta várias alternativas para o mesmo problema). Os dois são importantes e se **retroalimentam**.",
            "quote": "Estudo de Caso — Harvard Business School (1996):",
            "studyCase": {
              "title": "Harvard Business School (1996)",
              "body": "Amabile estudou diários de 238 profissionais em projetos criativos. Resultado: motivação intrínseca (significado, autonomia) aumenta criatividade. Recompensas extrínsecas e deadlines apertados a destroem."
            },
            "deepDive": "A pergunta não é \"quanta pressão?\" — é \"que tipo de pressão?\". Pressão por propósito energiza. Pressão por controle paralisa."
          },
          {
            "title": "Criatividade de Produto (Reinventar o que se vende)",
            "content": "A mesma base técnica, reinventada por design e posicionamento. Criatividade aplicada ao **marketing**, não ao produto em si.",
            "quote": "Estudo de Caso — Havaianas (1994):",
            "studyCase": {
              "title": "Havaianas (1994)",
              "body": "De chinelo de R$ 2 a produto global em 100+ países. O produto é o mesmo desde 1962 — a criatividade foi no posicionamento."
            },
            "deepDive": "Inovação de produto não exige mudar o produto — exige mudar como o mercado percebe o produto."
          },
          {
            "title": "Criatividade de Modelo (Reinventar como captura valor)",
            "content": "8 pessoas reimaginaram a experiência bancária. A criatividade não foi tecnológica — foi no **modelo** e na experiência.",
            "quote": "Estudo de Caso — Nubank (2013):",
            "studyCase": {
              "title": "Nubank (2013)",
              "body": "80 milhões de clientes. CAC de R$ 30-50 vs R$ 800+ bancário. Maior banco digital do mundo fora da China."
            },
            "deepDive": "Christensen: inovação disruptiva começa atendendo quem ninguém atende — os excluídos."
          },
          {
            "title": "Criatividade Estratégica (Competir onde ninguém compete)",
            "content": "Não tentou ser maior — criou aviões para **nichos** que as gigantes ignoravam.",
            "quote": "Estudo de Caso — Embraer (2000):",
            "studyCase": {
              "title": "Embraer (2000)",
              "body": "Jatos de 70-130 assentos. Líder mundial aviação regional. Receita US$ 5B+."
            },
            "deepDive": "Chan Kim (INSEAD): Oceano Azul é criar mercado sem concorrência. Embraer criou o oceano azul dos regionais."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Criatividade não é dom — é {competência treinável}. Guilford provou que pode ser medida (fluência, flexibilidade, originalidade, elaboração). O ambiente (Ekvall) importa mais que o talento individual. E o processo criativo tem 6 etapas — não é eureka mágico.\n\n**Principais Insights:**\n\n- George Land (NASA): {98%} das crianças de 5 anos são gênios criativos. Adultos: 2%. Criatividade é desaprendida.\n- Guilford (1967): pensamento {divergente} gera ideias, {convergente} seleciona. Nunca faça os dois na mesma reunião.\n- Ekvall: o ambiente criativo tem {9 dimensões} mensuráveis. A mais baixa é o gargalo.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "George Land (NASA): {98%} das crianças de 5 anos são gênios criativos. Adultos: 2%. Criatividade é desaprendida.",
            "Guilford (1967): pensamento {divergente} gera ideias, {convergente} seleciona. Nunca faça os dois na mesma reunião.",
            "Ekvall: o ambiente criativo tem {9 dimensões} mensuráveis. A mais baixa é o gargalo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Métodos de Criatividade",
        "description": "Design Thinking, Brainstorming Estruturado e SCAMPER — as ferramentas que funcionam",
        "subsections": [
          {
            "title": "Fase 1 — Empatizar (Observar)",
            "content": "Técnicas: entrevistas em profundidade (5 Porquês da Toyota), observação etnográfica (**shadowing**), mapa de empatia (o que o usuário diz, pensa, faz e sente).",
            "quote": "Estudo de Caso — IDEO (1999):",
            "studyCase": {
              "title": "IDEO (1999)",
              "body": "Redesenhou carrinhos de supermercado passando dias em lojas. Descobertas: idosos têm medo de carrinhos pesados, mães precisam de espaço para crianças. Nenhuma pesquisa quantitativa revelaria isso."
            },
            "deepDive": "Empatia não é pesquisa de mercado. É observar o que as pessoas fazem quando ninguém está olhando."
          },
          {
            "title": "Fase 2 — Definir (Sintetizar)",
            "content": "Sintetizar observações em POV acionável: \"[Usuário] precisa de [Necessidade] porque [**Insight surpreendente**]\".",
            "quote": "Estudo de Caso — Airbnb (2009):",
            "studyCase": {
              "title": "Airbnb (2009)",
              "body": "POV: \"Viajantes econômicos precisam de experiências autênticas porque hotéis os fazem sentir turistas, não moradores.\" Redirecionou de \"quartos baratos\" para \"pertencer a qualquer lugar\"."
            },
            "deepDive": "Um bom POV muda a direção da empresa inteira. Um ruim desperdiça meses de ideação."
          },
          {
            "title": "Fase 3 — Idear (Divergir)",
            "content": "Geração volumétrica seguindo regras da IDEO: adiar julgamento, uma conversa por vez, construir sobre ideias dos outros, encorajar ideias selvagens, ser visual, buscar **quantidade**.",
            "quote": "Estudo de Caso — Google (2004):",
            "studyCase": {
              "title": "Google (2004)",
              "body": "Gmail nasceu do \"20% time\" — tempo livre para ideias selvagens. Funcionários podiam trabalhar em projetos pessoais 1 dia por semana. Resultado: Gmail, Google Maps, AdSense."
            },
            "deepDive": "Regra IDEO: as melhores ideias surgem após a #50. Se você julgou antes, matou o potencial."
          },
          {
            "title": "Fase 4 — Prototipar (Construir)",
            "content": "\"Se uma imagem vale mil palavras, um protótipo vale **mil reuniões**.\" Deve ser rápido, barato e descartável.",
            "quote": "Estudo de Caso — Natura (2000):",
            "studyCase": {
              "title": "Natura (2000)",
              "body": "Protótipos de embalagem Ekos com materiais reciclados testados em lojas. Descoberta: a textura importava mais que o visual. Redesenho evitou erro de milhões."
            },
            "deepDive": "Protótipo de papel, role-playing, Mágico de Oz (simular funcionalidade manualmente). Não precisa de código."
          },
          {
            "title": "Fase 5 — Testar (Aprender)",
            "content": "Não é validação — é **aprendizado**. Observar uso real, iterar. Falhar rápido e barato é o objetivo.\n\n**DT para PME em 3 dias:** Dia 1 (Empatia) — ligue para 5 clientes e pergunte a última frustração. Dia 2 (Ideação) — equipe gera soluções via brainwriting. Dia 3 (Protótipo) — versão mais simples possível, teste com 3 clientes. Custo: **R$ 0**.\n\n#### 🏷️ Brainstorming estruturado",
            "quote": "Estudo de Caso — Dropbox (2008):",
            "studyCase": {
              "title": "Dropbox (2008)",
              "body": "Validou o produto inteiro com um vídeo de demonstração antes de construir a tecnologia. O vídeo gerou 75.000 sign-ups overnight. Sem uma linha de código."
            },
            "deepDive": "Nielsen: 5 usuários revelam 85% dos problemas de usabilidade. Não precisa de centenas."
          },
          {
            "title": "S — Substituir (Trocar componentes)",
            "content": "O que pode ser substituído? Materiais, pessoas, processos, ingredientes.",
            "quote": "Estudo de Caso — Beyond Meat (2016):",
            "studyCase": {
              "title": "Beyond Meat (2016)",
              "body": "Substituiu proteína animal por vegetal — mesmo produto (hambúrguer), ingrediente diferente, mercado bilionário."
            },
            "deepDive": "Pergunta-chave: \"E se eu substituísse [X] por [Y]?\""
          },
          {
            "title": "C — Combinar (Unir funções)",
            "content": "O que pode ser combinado? Funções, mercados, ideias, materiais.",
            "quote": "Estudo de Caso — Apple (2007):",
            "studyCase": {
              "title": "Apple (2007)",
              "body": "iPhone combinou telefone + câmera + GPS + player + computador. Não inventou nada — combinou tudo."
            },
            "deepDive": "A maioria das inovações é combinação, não invenção."
          },
          {
            "title": "E — Eliminar (Remover o desnecessário)",
            "content": "O que pode ser removido sem perder a função essencial?\n\nComo usar: defina o produto a inovar → passe por cada operador (7-10 min cada) → gere pelo menos 3 ideias por operador (**mínimo 21 total**) → avalie e combine as melhores → prototipe os 2-3 mais promissores.",
            "quote": "Estudo de Caso — IKEA (1958):",
            "studyCase": {
              "title": "IKEA (1958)",
              "body": "Eliminou a montagem na fábrica — transferiu para o consumidor. Custo -30-50%, criou experiência de \"monte seu móvel\"."
            },
            "deepDive": "Eliminar é a forma mais subestimada de inovação."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Nenhum método é universalmente superior. Design Thinking resolve problemas de {usuário}. Brainstorming gera {volume}. SCAMPER evolui {produto existente}. A maestria é saber qual usar quando.\n\n**Principais Insights:**\n\n- IDEO: as melhores ideias surgem após a {ideia #50}. Separe divergir de convergir.\n- Diehl & Stroebe (1987): brainstorming sem estrutura produz {MENOS} que indivíduos sozinhos.\n- SCAMPER aplicado ao iPhone: Combinou (C), Eliminou teclado (E), Substituiu por touch (S).",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "IDEO: as melhores ideias surgem após a {ideia #50}. Separe divergir de convergir.",
            "Diehl & Stroebe (1987): brainstorming sem estrutura produz {MENOS} que indivíduos sozinhos.",
            "SCAMPER aplicado ao iPhone: Combinou (C), Eliminou teclado (E), Substituiu por touch (S)."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Ferramentas Avançadas e Bloqueios Criativos",
        "description": "Pensamento Lateral, TRIZ, Mapas Mentais — e os 5 bloqueios que matam criatividade",
        "subsections": [
          {
            "title": "Bloqueio Perceptivo (Não ver o problema)",
            "content": "O cérebro \"trava\" em uma representação fixa. **Fixação funcional**: ver objetos apenas no uso convencional. Delimitação prematura: definir o problema estreito demais.",
            "quote": "Estudo de Caso — Uber (2009):",
            "studyCase": {
              "title": "Uber (2009)",
              "body": "Perguntar \"como fazer um carro melhor?\" produz incrementos. Perguntar \"como mover pessoas sem carro?\" produziu Uber, Lime, Hyperloop."
            },
            "deepDive": "Solução: mudar o enquadramento. A pergunta errada produz a resposta certa para o problema errado."
          },
          {
            "title": "Bloqueio Emocional (Medo de julgamento)",
            "content": "Causa #1 de silêncio em brainstorming. Desconforto com ambiguidade, medo do fracasso, **síndrome do impostor**.",
            "quote": "Estudo de Caso — Google (2015):",
            "studyCase": {
              "title": "Google (2015)",
              "body": "Projeto Aristotle: 180 equipes estudadas. Fator #1 de alta performance: segurança psicológica — poder errar sem medo. Não era talento individual."
            },
            "deepDive": "Solução: exercícios de \"pior ideia possível\". Quando pede para serem propositalmente ruins, relaxam."
          },
          {
            "title": "Bloqueio Cultural (\"Sempre fizemos assim\")",
            "content": "Normas organizacionais que punem pensamento diferente. **Groupthink**: grupos coesos suprimem dissidência. Hierarquia rígida: chefe sempre tem razão = criatividade morre.",
            "quote": "Estudo de Caso — CIA / Red Teams (2001):",
            "studyCase": {
              "title": "CIA / Red Teams (2001)",
              "body": "Após falhas de inteligência, CIA criou Red Teams — equipes designadas para atacar a ideia dominante. Evita Groupthink em decisões críticas. Empresas podem designar \"advogado do diabo\" rotativo."
            },
            "deepDive": "A frase mais cara da história corporativa: \"Sempre fizemos assim\"."
          },
          {
            "title": "Bloqueio Ambiental (Sem tempo, sem espaço)",
            "content": "Interrupções constantes (cérebro leva **23 minutos** para retomar foco), ambientes monótonos, excesso de reuniões, ferramentas inadequadas.\n\n#### 🏷️ Prototipagem rápida\n\nA prototipagem rápida é o antídoto para o excesso de planejamento. Uma ideia no papel não vale nada até ser testada com pessoas reais. A velocidade de aprendizado é diretamente proporcional à velocidade de **prototipagem**.",
            "quote": "Estudo de Caso — 3M (1948):",
            "studyCase": {
              "title": "3M (1948)",
              "body": "3M permite 15% do tempo para projetos pessoais. O Post-it nasceu daí — Spencer Silver descobriu o adesivo em 1968, Art Fry aplicou em marcadores de livro em 1974. Sem tempo livre, não existiria."
            },
            "deepDive": "Cal Newport (Deep Work): blocos de 90+ minutos sem interrupção para trabalho criativo."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Bloqueios criativos não são falta de talento — são {sintomas do ambiente, cultura e hábito}. Identificar o tipo de bloqueio é metade da solução. A outra metade é escolher a ferramenta certa: Pensamento Lateral para impasses, TRIZ para contradições, Mapas Mentais para complexidade.\n\n**Principais Insights:**\n\n- De Bono: \"Se fábricas poluem rios, obriguem-nas a captar água {abaixo} e devolver {acima}.\" Provocação gera insight.\n- Altshuller analisou {200.000 patentes} e encontrou 40 princípios que se repetem. Inovação tem padrão.\n- Os 5 bloqueios (perceptivo, cultural, emocional, cognitivo, ambiental) são {mensuráveis e tratáveis}.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "De Bono: \"Se fábricas poluem rios, obriguem-nas a captar água {abaixo} e devolver {acima}.\" Provocação gera insight.",
            "Altshuller analisou {200.000 patentes} e encontrou 40 princípios que se repetem. Inovação tem padrão.",
            "Os 5 bloqueios (perceptivo, cultural, emocional, cognitivo, ambiental) são {mensuráveis e tratáveis}.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M1-S3",
    "code": "M1-2",
    "title": "Sustentabilidade em Negocios",
    "videoUrls": [
      {
        "title": "M1-03 O Tripé da Sustentabilidade",
        "url": "https://qvvqbngiwqfuxsbgcxtc.supabase.co/storage/v1/object/public/videos/IPB/Sustentabilidade.mp4"
      }
    ],
    "chapters": [
      {
        "title": "1: Por que Sustentabilidade Virou Estratégia",
        "description": "Do TBL ao modelo de Círculos Aninhados — sustentabilidade como pilar de negócio",
        "subsections": [
          {
            "title": "People — Pessoas (Impacto social)",
            "content": "Condições de trabalho, diversidade, impacto na comunidade, cadeia de fornecedores. Como a empresa afeta as **pessoas** ao seu redor — funcionários, comunidade, fornecedores.",
            "quote": "Estudo de Caso — Natura (2010):",
            "studyCase": {
              "title": "Natura (2010)",
              "body": "Modelo de comunidades fornecedoras na Amazônia. Mais de 2.000 famílias extrativistas com renda garantida e preservação ambiental. Negócio rentável E social."
            },
            "deepDive": "People não é filantropia — é cadeia de suprimentos sustentável que reduz risco e gera valor."
          },
          {
            "title": "Planet — Planeta (Impacto ambiental)",
            "content": "Emissões de carbono, uso de água, resíduos, biodiversidade, energia renovável. Não é só \"não poluir\" — é **regenerar** o que foi degradado.",
            "quote": "Estudo de Caso — Ambev (2018):",
            "studyCase": {
              "title": "Ambev (2018)",
              "body": "Meta de usar 100% de energia renovável até 2025. Reduziu consumo de água por litro de bebida em 30% desde 2012. Cada real economizado em água é lucro operacional."
            },
            "deepDive": "Planet é gestão de recursos escassos. Água, energia e materiais custam dinheiro — eficiência ambiental = eficiência financeira."
          },
          {
            "title": "Profit — Lucro (Viabilidade econômica)",
            "content": "Sem lucro sustentável, People e Planet são insustentáveis. O TBL não é anti-lucro — é **lucro responsável** que não destrói as bases da sua própria existência.\n\nA maioria das pessoas imagina sustentabilidade como 3 círculos que se sobrepõem — economia, sociedade e meio ambiente com uma \"zona ideal\" no centro. Elkington criticou esse modelo: na prática, empresas otimizam o círculo econômico e tratam os outros como **secundários**. O modelo de Círculos Aninhados inverte: a economia está DENTRO da sociedade, que está DENTRO do meio ambiente. Sem planeta viável, não há sociedade. Sem sociedade funcional, não há economia.\n\nEm 2018, o próprio Elkington publicou um artigo na Harvard Business Review pedindo o \"recall\" do TBL. Não porque estava errado, mas porque foi **cooptado** por relatórios corporativos que medem os 3Ps sem mudar nada de verdade. O TBL virou ferramenta de relações públicas em vez de ferramenta de transformação.",
            "quote": "Estudo de Caso — Magazine Luiza (2020):",
            "studyCase": {
              "title": "Magazine Luiza (2020)",
              "body": "Programa de trainee exclusivo para pessoas negras gerou controvérsia mas aumentou vendas: clientes se identificaram com a marca. Inclusão virou diferencial de mercado, não só de imagem."
            },
            "deepDive": "TBL funciona quando as 3 dimensões se reforçam. People gera brand loyalty. Planet reduz custos. Profit sustenta ambos."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Sustentabilidade não é custo — é **estratégia**. O TBL mede em 3 dimensões (People, Planet, Profit). Os Círculos Aninhados mostram a hierarquia real: economia depende de sociedade que depende de meio ambiente.\n\n**Principais Insights:**\n\n- Elkington pediu o \"recall\" do próprio TBL em 2018 — estava sendo usado para **relações públicas**, não transformação.\n- US$ 35 trilhões em ativos sob critérios ESG. Ignorar sustentabilidade é ignorar o **mercado**.\n- People + Planet + Profit se **reforçam**. Inclusão gera vendas. Eficiência ambiental reduz custos.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Elkington pediu o \"recall\" do próprio TBL em 2018 — estava sendo usado para relações públicas, não transformação.",
            "US$ 35 trilhões em ativos sob critérios ESG. Ignorar sustentabilidade é ignorar o mercado.",
            "People + Planet + Profit se reforçam. Inclusão gera vendas. Eficiência ambiental reduz custos."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: ESG — Como o Mercado Avalia Sustentabilidade",
        "description": "Environmental, Social, Governance — de relatório a critério de investimento",
        "subsections": [
          {
            "title": "E — Environmental (Ambiental)",
            "content": "Emissões de carbono (Escopo 1, 2, 3), gestão de resíduos, uso de água, energia renovável, biodiversidade. O pilar mais **mensurável** e o mais regulado.",
            "quote": "Estudo de Caso — Vale (2019):",
            "studyCase": {
              "title": "Vale (2019)",
              "body": "Brumadinho: 270 mortes por falha ambiental. Valor de mercado caiu R$ 70 bilhões em dias. O E do ESG não é relatório — é risco existencial."
            },
            "deepDive": "Falha ambiental não é multa — é risco de extinção da empresa. Brumadinho é o caso mais caro da história corporativa brasileira."
          },
          {
            "title": "S — Social (Social)",
            "content": "Direitos humanos, diversidade, condições de trabalho, impacto na comunidade, segurança do consumidor. O pilar mais **difícil de medir** mas que mais afeta reputação.",
            "quote": "Estudo de Caso — Magazine Luiza (2020):",
            "studyCase": {
              "title": "Magazine Luiza (2020)",
              "body": "Trainee exclusivo para negros. Vendas subiram 12%. Provou que inclusão não é custo — é conexão com 53% da população brasileira que é negra."
            },
            "deepDive": "Social gera brand loyalty. Consumidores escolhem marcas que representam seus valores."
          },
          {
            "title": "G — Governance (Governança)",
            "content": "Composição do conselho, transparência, ética, combate à corrupção, políticas de remuneração. O pilar que **sustenta** os outros dois.\n\nO rating ESG é feito por agências como MSCI, Sustainalytics, S&P Global e Moodys. Varia de AAA (líder) a CCC (laggard). Empresas com rating alto acessam capital mais barato, atraem talentos e **reduzem risco regulatório**. No Brasil, o ISE B3 é o principal índice de sustentabilidade — inclui ~40 empresas que atendem critérios rigorosos em E, S e G.",
            "quote": "Estudo de Caso — Americanas (2023):",
            "studyCase": {
              "title": "Americanas (2023)",
              "body": "Fraude contábil de R$ 20 bilhões. Falha de governança pura: conselho não supervisionou, auditorias falharam. Prova que G sem enforcement é decorativo."
            },
            "deepDive": "Sem Governance, Environmental e Social são promessas vazias. G é o alicerce."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "ESG não é relatório — é **critério de investimento**. E mede impacto ambiental, S mede impacto social, G sustenta ambos. Sem Governance, o resto é promessa vazia.\n\n**Principais Insights:**\n\n- Vale/Brumadinho: falha no E custou **R$ 70 bilhões** e 270 vidas.\n- Americanas: falha no G escondeu fraude de **R$ 20 bilhões**.\n- ISE B3: empresas sustentáveis superam Ibovespa em retorno ajustado ao **risco**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Vale/Brumadinho: falha no E custou R$ 70 bilhões e 270 vidas.",
            "Americanas: falha no G escondeu fraude de R$ 20 bilhões.",
            "ISE B3: empresas sustentáveis superam Ibovespa em retorno ajustado ao risco."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Frameworks de Reporte e Valor Compartilhado",
        "description": "GRI, SASB, ODS e CSV — o framework certo para cada público",
        "subsections": [
          {
            "title": "GRI — Global Reporting Initiative (Stakeholders amplos)",
            "content": "Padrão mais usado no mundo para relatos de sustentabilidade. **75%** das 250 maiores empresas globais usam GRI. Foco em materialidade: reportar o que é relevante para TODOS os stakeholders (investidores, comunidade, governo, funcionários).",
            "quote": "Estudo de Caso — Natura (2002):",
            "studyCase": {
              "title": "Natura (2002)",
              "body": "Primeira empresa brasileira a publicar relatório GRI. Hoje publica relatório integrado anual com 400+ indicadores. Referência global em transparência corporativa."
            },
            "deepDive": "GRI responde: \"qual é o impacto total da empresa no mundo?\" — para quem quer transparência completa."
          },
          {
            "title": "SASB — Sustainability Accounting Standards (Investidores)",
            "content": "Complemento financeiro do GRI. Fala direto com investidores. Define **métricas específicas** por setor — o que é material para uma mineradora é diferente do que é material para um banco.",
            "quote": "Estudo de Caso — Itaú (2020):",
            "studyCase": {
              "title": "Itaú (2020)",
              "body": "Adotou SASB para comunicar riscos ESG aos investidores internacionais em linguagem financeira. Resultado: inclusão em índices globais de sustentabilidade, capital mais barato."
            },
            "deepDive": "SASB responde: \"quais riscos ESG afetam o valor da empresa?\" — para quem investe."
          },
          {
            "title": "ODS — Objetivos de Desenvolvimento Sustentável (Agenda global 2030)",
            "content": "17 objetivos da ONU que funcionam como **bússola estratégica**. Para empresas, a pergunta é: \"quais ODS meu negócio impacta positiva ou negativamente?\" Não é para abraçar todos — é para ser honesto sobre onde gera valor e onde gera dano.",
            "quote": "Estudo de Caso — Ambev (2019):",
            "studyCase": {
              "title": "Ambev (2019)",
              "body": "Conectou estratégia de sustentabilidade a 5 ODS específicos: Água Limpa (6), Energia (7), Trabalho Decente (8), Produção Responsável (12) e Ação Climática (13)."
            },
            "deepDive": "ODS responde: \"onde meu negócio conecta com o futuro do planeta?\" — para posicionamento estratégico."
          },
          {
            "title": "CSV — Creating Shared Value (Vantagem competitiva)",
            "content": "Michael Porter e Mark Kramer (Harvard, 2011) propuseram que valor compartilhado não é RSC — é **estratégia**. A empresa lucra PORQUE resolve um problema social, não apesar dele.\n\nPerspectivas complementares: o GRI olha de \"**dentro para fora**\", focando em como a empresa impacta economia, ambiente e sociedade — fala com funcionários, ONGs, governos. O SASB olha de \"**fora para dentro**\", medindo como questões ESG afetam o desempenho financeiro — fala com investidores, credores e analistas.\n\nO CSV (Porter & Kramer, Harvard 2011) difere fundamentalmente da CSR tradicional. A CSR redistribui lucro existente; o CSV **expande** o bolo econômico e social simultaneamente. Três níveis: reconceber produtos/mercados (atender necessidades não supridas), redefinir produtividade na cadeia (investir em bem-estar de funcionários e fornecedores), e desenvolver **clusters locais** (fortalecer ecossistema de fornecedores e instituições).",
            "quote": "Estudo de Caso — Nestlé (2006):",
            "studyCase": {
              "title": "Nestlé (2006)",
              "body": "Programa de fornecedores locais de café na África. Treinou agricultores, garantiu qualidade e fornecimento estável. Lucrou mais E desenvolveu comunidades. CSV na prática."
            },
            "deepDive": "CSV responde: \"como lucrar resolvendo um problema social?\" — para vantagem competitiva sustentável."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Não existe framework \"melhor\" — existe o **certo para o público**. GRI para transparência ampla. SASB para investidores. ODS para posicionamento global. CSV para estratégia de valor compartilhado.\n\n**Principais Insights:**\n\n- GRI: **75%** das 250 maiores empresas usam. É o padrão de transparência.\n- SASB: 77 setores com métricas **específicas**. Fala a linguagem do investidor.\n- CSV (Porter, Harvard 2011): lucrar PORQUE resolve problema social, não **apesar** dele.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "GRI: 75% das 250 maiores empresas usam. É o padrão de transparência.",
            "SASB: 77 setores com métricas específicas. Fala a linguagem do investidor.",
            "CSV (Porter, Harvard 2011): lucrar PORQUE resolve problema social, não apesar dele."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Greenwashing, Índices e Política de Sustentabilidade",
        "description": "Como separar substância de discurso — e implementar na prática",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Sustentabilidade real tem **métricas**, **governança** e **transparência**. Greenwashing tem marketing. Os 8 passos transformam intenção em política implementável. E os Cisnes Verdes de Elkington apontam o futuro: não minimizar dano, mas gerar abundância.\n\n**Principais Insights:**\n\n- TerraChoice: 7 pecados do greenwashing. O mais comum: **trade-off oculto** (destacar 1 coisa boa escondendo 10 ruins).\n- ISE B3: ~40 empresas. Capital mais barato + sinalização de **maturidade** ESG.\n- Política sem governança é documento. Com governança é **transformação**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "TerraChoice: 7 pecados do greenwashing. O mais comum: trade-off oculto (destacar 1 coisa boa escondendo 10 ruins).",
            "ISE B3: ~40 empresas. Capital mais barato + sinalização de maturidade ESG.",
            "Política sem governança é documento. Com governança é transformação."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "5: Política de Sustentabilidade na Prática",
        "description": "Como criar, implementar e manter — do diagnóstico à comunicação de resultados",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Política de sustentabilidade sem **implementação** é documento morto. Os 8 passos de Toledo & Farias Filho (2023) transformam intenção em ação: diagnosticar, planejar, agir, envolver, implementar, monitorar, comunicar e ajustar.\n\n**Principais Insights:**\n\n- Toledo & Farias Filho (2023): nenhuma política terá sucesso sem alinhamento à **estratégia global**.\n- Comece pelo simples: LED, reciclagem, redução de plástico. Não espere a mudança **perfeita**.\n- Mensurar é essencial. Se não mede, não sabe se **funciona**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Toledo & Farias Filho (2023): nenhuma política terá sucesso sem alinhamento à estratégia global.",
            "Comece pelo simples: LED, reciclagem, redução de plástico. Não espere a mudança perfeita.",
            "Mensurar é essencial. Se não mede, não sabe se funciona."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "6: BPMN — Modelagem de Processos de Negócio",
        "description": "Como mapear, analisar e otimizar processos usando a notação padrão global",
        "subsections": [
          {
            "title": "Gateway Exclusivo (XOR) (Ou um ou outro)",
            "content": "O mais comum. Apenas **um caminho** de saída pode ser seguido. Na convergência, repassa o primeiro token que chega. Perguntas devem ser objetivas.",
            "quote": "Estudo de Caso — Exemplo prático (2024):",
            "studyCase": {
              "title": "Exemplo prático (2024)",
              "body": "Check-in de hotel: cliente tem reserva? SIM → busca dados. NÃO → verifica disponibilidade. Apenas um caminho é seguido."
            },
            "deepDive": "Use quando a decisão é binária ou com opções mutuamente exclusivas."
          },
          {
            "title": "Gateway Paralelo (AND) (Todos ao mesmo tempo)",
            "content": "Cria caminhos que ocorrem **simultaneamente**. Na divergência, cria tokens para todos os caminhos. Na convergência, só prossegue quando TODOS chegarem — ponto de sincronização.",
            "quote": "Estudo de Caso — Exemplo prático (2024):",
            "studyCase": {
              "title": "Exemplo prático (2024)",
              "body": "Pedido online: após pagamento confirmado, simultaneamente separa estoque + gera nota fiscal + notifica transportadora. Só despacha quando os 3 terminarem."
            },
            "deepDive": "Essencial para evitar race conditions — garante sincronização antes de prosseguir."
          },
          {
            "title": "Gateway Inclusivo (OR) (Um ou mais caminhos)",
            "content": "Permite que **um ou mais** caminhos sejam seguidos com base em condições. Na convergência, aguarda apenas os fluxos que foram ativados. O mais complexo dos gateways.",
            "quote": "Estudo de Caso — Exemplo prático (2024):",
            "studyCase": {
              "title": "Exemplo prático (2024)",
              "body": "Aprovação de crédito: pode precisar de análise financeira E/OU análise cadastral E/OU visita presencial, dependendo do valor. Cada condição ativa um caminho."
            },
            "deepDive": "Devido à complexidade, muitas vezes é substituído por combinações de XOR + AND para maior clareza visual."
          },
          {
            "title": "Gateway Baseado em Eventos (Quem chegar primeiro)",
            "content": "Não decide por dados mas por qual **evento externo** ocorre primeiro. O primeiro evento \"vence\" e define o caminho, consumindo os outros.\n\n#### 🏷️ Swimlanes — quem faz o quê\n\nBPMN usa swimlanes para dividir e organizar atividades. **Pools** representam organizações — especificam \"quem faz o quê\" em áreas separadas. **Lanes** representam departamentos ou funções dentro de uma organização. Um pool é a empresa, uma lane é o **departamento** dentro dela.",
            "quote": "Estudo de Caso — Exemplo prático (2024):",
            "studyCase": {
              "title": "Exemplo prático (2024)",
              "body": "Aguardando fornecedor: resposta do fornecedor OU vencimento do prazo (30 dias). Se o prazo vence primeiro, cancela pedido automaticamente."
            },
            "deepDive": "Ideal para processos com prazos e dependências externas imprevisíveis."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "BPMN é o **tradutor universal** entre negócio e TI. Os 4 gateways (XOR, AND, OR, Evento) controlam fluxo. Swimlanes definem responsabilidades. E os 3 níveis de maturidade (descritivo → analítico → executável) guiam a evolução da modelagem.\n\n**Principais Insights:**\n\n- Token: instância ativa que percorre o diagrama. Gateways **criam, dividem e fundem** tokens.\n- Gateway Paralelo (AND): só prossegue quando **TODOS** os caminhos terminam — sincronização obrigatória.\n- 3 níveis: descritivo (todos entendem), analítico (simulações), executável (**automação** em BPMS).",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Token: instância ativa que percorre o diagrama. Gateways criam, dividem e fundem tokens.",
            "Gateway Paralelo (AND): só prossegue quando TODOS os caminhos terminam — sincronização obrigatória.",
            "3 níveis: descritivo (todos entendem), analítico (simulações), executável (automação em BPMS)."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "7: Certificações, Selos e Indicadores Globais",
        "description": "B Corps, Instituto Ethos, Great Place to Work, Fair Trade e mais — como medir e provar sustentabilidade",
        "subsections": [
          {
            "title": "B Corps (Empresas B) (Propósito + Lucro)",
            "content": "Certificadas pela **B Lab** — cumprem altos padrões de desempenho social, ambiental, transparência e responsabilidade legal. Equilibram propósito e lucro. Focam em benefícios para TODOS os stakeholders, não apenas acionistas.",
            "quote": "Estudo de Caso — Natura (2014):",
            "studyCase": {
              "title": "Natura (2014)",
              "body": "Primeira empresa de capital aberto do mundo a receber certificação B Corp. Avaliada em trabalhadores, comunidade, meio ambiente e clientes. Recertifica periodicamente com pontuação mínima na B Impact Assessment."
            },
            "deepDive": "B Corp não certifica produto — certifica a empresa inteira. Avalia impacto abrangente em todas as dimensões."
          },
          {
            "title": "Great Place to Work (Ambiente de trabalho)",
            "content": "Organização internacional que avalia e certifica empresas pela qualidade do ambiente de trabalho e **satisfação dos colaboradores**. Pesquisas de clima, feedbacks, análise de gestão de pessoas.",
            "quote": "Estudo de Caso — Magazine Luiza (2022):",
            "studyCase": {
              "title": "Magazine Luiza (2022)",
              "body": "Consistentemente no ranking GPTW Brasil. Pesquisa de satisfação com 92% de aprovação dos funcionários. Foco em desenvolvimento de carreira, benefícios e cultura inclusiva."
            },
            "deepDive": "GPTW prova que ambiente bom = retenção de talentos. Empresas no ranking têm turnover 50% menor."
          },
          {
            "title": "Instituto Ethos (Referência brasileira)",
            "content": "Organização brasileira sem fins lucrativos que mobiliza empresas para práticas sustentáveis e responsáveis. Oferece **indicadores** para medir e melhorar práticas sociais, ambientais e econômicas.",
            "quote": "Estudo de Caso — Itaú (2010):",
            "studyCase": {
              "title": "Itaú (2010)",
              "body": "Usa indicadores Ethos como base para relatório de sustentabilidade. Alinhamento com ODS da ONU e práticas visíveis globalmente, mesmo tendo foco brasileiro."
            },
            "deepDive": "Ethos permite empresas brasileiras serem comparadas a organizações internacionais em padrões reconhecidos."
          },
          {
            "title": "Ethisphere (Ética global)",
            "content": "Publica anualmente o ranking das empresas mais éticas do mundo (World's Most Ethical Companies). Avalia governança corporativa, responsabilidade social, transparência, **cultura ética** e integridade.\n\n#### 🏷️ Rankings e índices de sustentabilidade\n\n#### 🏛️ Índices que medem sustentabilidade corporativa",
            "quote": "Estudo de Caso — Natura (2023):",
            "studyCase": {
              "title": "Natura (2023)",
              "body": "Única empresa brasileira de cosméticos no ranking Ethisphere. Avaliação por questionário extenso, análise de documentos e auditorias independentes."
            },
            "deepDive": "Estar no ranking Ethisphere é sinal de que ética não é discurso — é prática auditada."
          },
          {
            "title": "Fair Trade International (Comércio justo)",
            "content": "Garante **comércio justo**: preços mínimos para pequenos produtores e proibição de trabalho infantil. Selo reconhecido globalmente em café, cacau, algodão e mais.",
            "quote": "Estudo de Caso — Café brasileiro (2023):",
            "studyCase": {
              "title": "Café brasileiro (2023)",
              "body": "Brasil é o maior produtor de café Fair Trade do mundo. Cooperativas em Minas Gerais exportam com prêmio de preço de 20-30% acima do mercado convencional."
            },
            "deepDive": "Fair Trade prova que pagar mais ao produtor não reduz margem — aumenta qualidade e fidelidade da cadeia."
          },
          {
            "title": "Rainforest Alliance (O selo do sapinho)",
            "content": "Atesta que o produto vem de fazendas que protegem **biodiversidade** e respeitam trabalhadores. O famoso sapinho verde em embalagens de chá, café, chocolate e banana.",
            "quote": "Estudo de Caso — Nestlé (2020):",
            "studyCase": {
              "title": "Nestlé (2020)",
              "body": "KitKat usa cacau 100% Rainforest Alliance. Rastreabilidade da fazenda à fábrica. Investimento em comunidades produtoras do Oeste da África."
            },
            "deepDive": "Consumidor reconhece o sapinho — é o selo de produto sustentável mais visível no varejo global."
          },
          {
            "title": "FSC (Florestas responsáveis)",
            "content": "Forest Stewardship Council. Garante que papel ou madeira vem de florestas manejadas de forma **responsável**. Três tipos: FSC 100%, FSC Misto e FSC Reciclado.",
            "quote": "Estudo de Caso — Suzano (2023):",
            "studyCase": {
              "title": "Suzano (2023)",
              "body": "Maior produtora de celulose do mundo. 100% das operações com certificação FSC. 2.4 milhões de hectares de florestas plantadas certificadas no Brasil."
            },
            "deepDive": "FSC é pré-requisito para exportar papel e madeira para Europa e América do Norte."
          },
          {
            "title": "Cradle to Cradle (C2C) (Economia circular)",
            "content": "Certifica produtos baseados na **economia circular**: tudo é reaproveitado, nada vira lixo. Avalia material, reutilização, energia, água e justiça social.\n\n#### 🏷️ Outras alternativas\n\n**1% for the Planet**: empresas que doam 1% das vendas totais para causas ambientais (Patagonia é cofundadora). **Pacto Global da ONU**: 10 princípios universais em direitos humanos, trabalho, meio ambiente e anticorrupção. **CSRD** (Corporate Sustainability Reporting Directive): diretiva europeia que torna reporte ESG **obrigatório** para empresas que operam na UE — afeta exportadores brasileiros.",
            "quote": "Estudo de Caso — Interface (pisos) (2020):",
            "studyCase": {
              "title": "Interface (pisos) (2020)",
              "body": "Fabricante de carpetes com certificação C2C Gold. Coleta carpetes usados e transforma em novos produtos. Zero resíduo em aterro desde 2020."
            },
            "deepDive": "C2C é o padrão mais exigente — não basta reciclar, precisa provar que o ciclo é 100% fechado."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Certificações se dividem em 3 níveis: **empresa inteira** (B Corp, GPTW, Ethisphere), **reporte** (GRI, SASB, CDP, TCFD) e **produto/cadeia** (Fair Trade, FSC, C2C, Rainforest Alliance). Ter certificação diferencia no mercado. Não ter é risco reputacional crescente.\n\n**Principais Insights:**\n\n- B Corp certifica a empresa **inteira** — não um produto. 7.000+ empresas no mundo.\n- CDP, TCFD e CSRD estão tornando reporte ESG **obrigatório**, não voluntário.\n- Cradle to Cradle é o mais exigente: prova que o ciclo é **100% fechado** — zero resíduo.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "B Corp certifica a empresa inteira — não um produto. 7.000+ empresas no mundo.",
            "CDP, TCFD e CSRD estão tornando reporte ESG obrigatório, não voluntário.",
            "Cradle to Cradle é o mais exigente: prova que o ciclo é 100% fechado — zero resíduo.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M2-S1",
    "code": "M2-0",
    "title": "Gestao de Negocios",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Fundamentos da Gestão",
        "description": "As 4 funções clássicas + visão sistêmica — a base que sustenta tudo",
        "subsections": [
          {
            "title": "Planejamento (Função 1 — Onde queremos chegar)",
            "content": "Definir objetivos, metas e o caminho pra alcançá-los. Inclui análise de cenários, alocação de recursos e estabelecimento de prazos. Sem planejamento, a empresa opera por reação — toma decisão no susto. **Planejamento** transforma decisão em escolha consciente.",
            "quote": "Estudo de Caso — Damian (2018) (2018):",
            "studyCase": {
              "title": "Damian (2018) (2018)",
              "body": "Pesquisa de Damian mostra que empresas com planejamento estratégico formal têm 30% mais chances de sobreviver os primeiros 5 anos comparadas às que operam por reação. O Capítulo 3 deste módulo aprofunda as ferramentas de planejamento (SWOT, 5 Forças, BCG)."
            },
            "deepDive": "Planejar é escolher antes de precisar escolher. Decisão sob pressão é decisão pior. Quem planeja, decide com calma."
          },
          {
            "title": "Organização (Função 2 — Como nos estruturamos)",
            "content": "Estruturar recursos (humanos, financeiros, físicos, informacionais) pra executar o que foi planejado. Inclui definir hierarquias, processos, papéis e responsabilidades. **Estrutura** sem clareza vira retrabalho e fricção interna.",
            "quote": "Estudo de Caso — Chiavenato (2014) (2014):",
            "studyCase": {
              "title": "Chiavenato (2014) (2014)",
              "body": "Idalberto Chiavenato, em \"Introdução à Teoria Geral da Administração\" (8ª ed., 2014), argumenta que organizações que adaptam estrutura à estratégia superam concorrentes em 15-20% de produtividade média. O Capítulo 4 deste módulo conecta com Cadeia de Valor de Porter."
            },
            "deepDive": "Estrutura segue estratégia (Chandler, 1962). Quem desenha organograma primeiro e depois pensa estratégia, organiza contra o objetivo."
          },
          {
            "title": "Direção (Função 3 — Como conduzimos pessoas)",
            "content": "Conduzir pessoas pra que executem o planejado. Inclui liderança, motivação, comunicação e coordenação. Damian (2018) lembra: a direção dá VIDA ao planejamento — sem ela, plano vira papel morto. **Liderar** pessoas é a função que separa gestor de chefe.",
            "quote": "Estudo de Caso — Goleman (HBR, 2000) (2000):",
            "studyCase": {
              "title": "Goleman (HBR, 2000) (2000)",
              "body": "Daniel Goleman, no artigo \"Leadership That Gets Results\" (Harvard Business Review, 2000), mostra que líderes com inteligência emocional alta entregam 20-30% mais resultado que líderes só técnicos. Esse tema é central no Módulo 4 (Liderança) e conecta com gestão de pessoas como ferramenta estratégica."
            },
            "deepDive": "Plano sem direção é intenção. Direção sem plano é caos. Os dois juntos é gestão."
          },
          {
            "title": "Controle (Função 4 — Como acompanhamos)",
            "content": "Medir desempenho, comparar com o planejado e corrigir desvios. Inclui KPIs, relatórios contábeis e feedback. **Controle** sem ação é estatística; ação sem controle é palpite. As demonstrações contábeis (Módulo M2-1) são as principais ferramentas de controle financeiro.\n\nAs 4 funções formam o ciclo PDCA estendido — Plan (Planejamento), Do (Organização + Direção), Check (Controle), Act (corrige e reinicia). Damian (2018) reforça que a estratégia organizacional reside na capacidade de fazer **escolhas deliberadas** pra se diferenciar e construir vantagem competitiva sustentável — não é processo rígido, é comportamento dinâmico que alinha condições internas com oportunidades e ameaças do ambiente externo.\n\n#### 🏛️ Visão Sistêmica — o que diferencia gestor maduro",
            "quote": "Estudo de Caso — Brito et al. (2016) (2016):",
            "studyCase": {
              "title": "Brito et al. (2016) (2016)",
              "body": "Brito e colaboradores demonstram que empresas com ciclo de controle mensal (não só anual) detectam desvios em média de 30 dias — antes que virem crise. Sem controle frequente, problema só aparece quando já é tarde. O módulo seguinte (M2-2 Demonstrações Contábeis) ensina as ferramentas de controle financeiro."
            },
            "deepDive": "O que não é medido não é gerenciado (Peter Drucker, 1954). Controle fecha o ciclo PDCA e abre o próximo."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Gestão = 4 funções (Planejamento · Organização · Direção · Controle) operadas com **visão sistêmica**. Brito et al. (2016) e Damian (2018) convergem: o que diferencia gestão amadora de profissional não é o que se faz, mas como cada função se **integra** às outras. Esse capítulo é o ALICERCE — os próximos vão detalhar como aplicar cada função na prática.\n\n**Principais Insights:**\n\n- Damian (2018): gestão é **processo dinâmico**, não checklist. Adapta-se a contexto econômico, social e político.\n- Brito et al. (2016): práticas gerenciais sólidas + visão sistêmica = **30% mais chance** de sobreviver 5 anos.\n- Chandler (1962, atemporal): estrutura segue **estratégia** — quem inverte, organiza contra o objetivo.\n- Drucker (1954): o que não é **medido** não é gerenciado. Função de controle fecha o ciclo PDCA.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Damian (2018): gestão é processo dinâmico, não checklist. Adapta-se a contexto econômico, social e político.",
            "Brito et al. (2016): práticas gerenciais sólidas + visão sistêmica = 30% mais chance de sobreviver 5 anos.",
            "Chandler (1962, atemporal): estrutura segue estratégia — quem inverte, organiza contra o objetivo.",
            "Drucker (1954): o que não é medido não é gerenciado. Função de controle fecha o ciclo PDCA."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Modelos de Negócio e Canvas",
        "description": "Como uma empresa cria, entrega e captura valor — do conceito ao Canvas",
        "subsections": [
          {
            "title": "Canvas na Prática — Nubank (Fintech)",
            "content": "Proposta de valor: banco sem tarifa, sem agência, 100% app. Segmento: **jovens** e excluídos bancários. Canais: app + indicação. Receita: interchange + crédito. Custo: 100% cloud, zero agência.",
            "quote": "Estudo de Caso — Nubank (2013):",
            "studyCase": {
              "title": "Nubank (2013)",
              "body": "8 pessoas, 1 apartamento. Canvas inteiro cabia num guardanapo: sem agência = sem custo fixo = tarifa zero = aquisição por indicação. Hoje: 80M clientes."
            },
            "deepDive": "O Canvas do Nubank eliminava 3 blocos inteiros (lojas, vendedores, custo fixo) — e isso ERA a inovação."
          },
          {
            "title": "Canvas na Prática — iFood (Plataforma)",
            "content": "Proposta de valor: conveniência (qualquer restaurante, qualquer hora). Segmento: **3 lados** (consumidor, restaurante, entregador). Receita: comissão por pedido. Recurso-chave: algoritmo.",
            "quote": "Estudo de Caso — iFood (2023):",
            "studyCase": {
              "title": "iFood (2023)",
              "body": "R$ 100B GMV/ano sem cozinha própria. O Canvas é pura plataforma: cada bloco conecta 3 stakeholders diferentes. Complexidade no modelo, simplicidade na experiência."
            },
            "deepDive": "Plataformas têm Canvas com múltiplos segmentos — cada lado precisa da proposta de valor própria."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "O Canvas reduz um modelo de negócio inteiro a **9 blocos** numa página. É ferramenta de pensamento, não de burocracia. Quando não consegue preencher um bloco, encontrou o gap estratégico.\n\n**Principais Insights:**\n\n- Osterwalder & Pigneur (2010): Canvas permite **visualizar** o modelo de negócio completo numa página.\n- Plataformas (iFood, Uber) têm Canvas com **múltiplos segmentos** — cada lado tem proposta de valor própria.\n- O bloco mais crítico é Proposta de Valor — se não resolve **problema real**, os outros 8 não salvam.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Osterwalder & Pigneur (2010): Canvas permite visualizar o modelo de negócio completo numa página.",
            "Plataformas (iFood, Uber) têm Canvas com múltiplos segmentos — cada lado tem proposta de valor própria.",
            "O bloco mais crítico é Proposta de Valor — se não resolve problema real, os outros 8 não salvam."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Planejamento Estratégico",
        "description": "SWOT, 5 Forças de Porter e Objetivos — definir direção antes de agir",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "SWOT analisa a empresa **por dentro e por fora**. Porter analisa o setor inteiro. BCG analisa o portfólio de produtos. SMART transforma análise em ação. Os quatro juntos = estratégia completa, diagnosticada e acionável.\n\n**Principais Insights:**\n\n- SWOT: o poder está nos **cruzamentos** — Força × Oportunidade = ação estratégica prioritária.\n- Porter (1979): **5 forças** determinam a rentabilidade do setor, não só a rivalidade direta.\n- BCG (Chiavenato, 2014): portfólio diversificado precisa de Vacas Leiteiras financiando Estrelas e bancando **apostas** (Pontos de Interrogação).\n- Objetivo sem prazo é desejo. Com SMART, vira **meta acionável**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "SWOT: o poder está nos cruzamentos — Força × Oportunidade = ação estratégica prioritária.",
            "Porter (1979): 5 forças determinam a rentabilidade do setor, não só a rivalidade direta.",
            "BCG (Chiavenato, 2014): portfólio diversificado precisa de Vacas Leiteiras financiando Estrelas e bancando apostas (Pontos de Interrogação).",
            "Objetivo sem prazo é desejo. Com SMART, vira meta acionável."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Gestão de Processos e Cadeia de Valor",
        "description": "Como cada atividade cria (ou destrói) valor para o cliente",
        "subsections": [
          {
            "title": "Atividades Primárias (Criam valor diretamente)",
            "content": "**Logística de entrada** (receber matéria-prima), **Operações** (transformar insumo em produto), **Logística de saída** (entregar ao cliente), **Marketing e Vendas** (atrair e converter), **Serviço** (pós-venda e suporte).",
            "quote": "Estudo de Caso — Amazon (2023):",
            "studyCase": {
              "title": "Amazon (2023)",
              "body": "A vantagem competitiva da Amazon está na logística de saída: entrega em 1 dia (Prime). Investiu US$ 60B+ em centros de distribuição. A atividade primária mais forte define a empresa."
            },
            "deepDive": "A atividade primária mais forte da cadeia de valor define a vantagem competitiva da empresa."
          },
          {
            "title": "Atividades de Suporte (Sustentam as primárias)",
            "content": "**Infraestrutura** (gestão, planejamento, finanças), **RH** (recrutamento, treinamento), **Desenvolvimento de Tecnologia** (P&D, sistemas), **Aquisição** (compras, fornecedores).\n\nA margem é a diferença entre o valor total gerado e o custo total das atividades. Para aumentar margem, ou **aumenta valor percebido** (diferenciação) ou **reduz custo** das atividades (eficiência). Porter: estratégia é escolher quais atividades fazer diferente do concorrente.\n\n#### 🏷️ Gestão à Vista — tornando processos VISÍVEIS",
            "quote": "Estudo de Caso — Google (2023):",
            "studyCase": {
              "title": "Google (2023)",
              "body": "A atividade de suporte mais forte do Google é Desenvolvimento de Tecnologia (P&D). Investe US$ 40B+/ano em pesquisa. A busca é a primária, mas a IA que sustenta é suporte."
            },
            "deepDive": "Atividades de suporte invisíveis para o cliente podem ser a maior fonte de vantagem competitiva."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "A Cadeia de Valor mostra que toda atividade ou **cria valor** ou gera custo sem valor. A Gestão à Vista coloca o resultado dessas atividades VISÍVEL pra todos — operação inteira vira controle em tempo real. Vantagem competitiva = fazer atividades diferentes + tornar o processo transparente pra detectar desvios cedo.\n\n**Principais Insights:**\n\n- Porter (1985): estratégia é **escolher** quais atividades fazer diferente do concorrente.\n- Amazon: US$ 60B+ em logística. A atividade primária mais forte **define** a empresa.\n- Silva & Loos (2017): Gestão à Vista transforma o ambiente em **comunicação visual** — acelera detecção de desvio em horas.\n- Toyota construiu vantagem competitiva tornando a operação VISUAL (Andon, Kanban). O que está à vista é **gerenciado em tempo real**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Porter (1985): estratégia é escolher quais atividades fazer diferente do concorrente.",
            "Amazon: US$ 60B+ em logística. A atividade primária mais forte define a empresa.",
            "Silva & Loos (2017): Gestão à Vista transforma o ambiente em comunicação visual — acelera detecção de desvio em horas.",
            "Toyota construiu vantagem competitiva tornando a operação VISUAL (Andon, Kanban). O que está à vista é gerenciado em tempo real."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "5: Tipos de Empresa e Regime Tributário",
        "description": "MEI, ME, LTDA, Simples, Presumido — a estrutura que define quanto você paga",
        "subsections": [
          {
            "title": "MEI — Microempreendedor Individual (Até R$ 81k/ano)",
            "content": "Faturamento até R$ 81 mil/ano. Pode ter **1 funcionário**. Impostos fixos (~R$ 70/mês). Sem sócio. CNPJ simplificado. Ideal para começar ou formalizar atividade autônoma.",
            "quote": "Estudo de Caso — Estatística Brasil (2024):",
            "studyCase": {
              "title": "Estatística Brasil (2024)",
              "body": "15 milhões de MEIs no Brasil. 70% da formalização de novos negócios. Custo fixo de ~R$ 70/mês cobre INSS + ISS/ICMS. O caminho mais rápido de CPF para CNPJ."
            },
            "deepDive": "MEI é porta de entrada, não destino. Ao ultrapassar R$ 81k, migra para ME automaticamente."
          },
          {
            "title": "ME / EPP — Microempresa (Até R$ 4.8M/ano)",
            "content": "Faturamento até R$ 4.8 milhões/ano. Pode ter sócios e mais funcionários. Acesso ao **Simples Nacional** (tributação unificada). Maioria das PMEs brasileiras.",
            "quote": "Estudo de Caso — Sebrae (2023):",
            "studyCase": {
              "title": "Sebrae (2023)",
              "body": "Simples Nacional atende 5.7 milhões de empresas. Unifica 8 tributos em 1 guia (DAS). Alíquota inicia em 6% para comércio e 15.5% para serviços."
            },
            "deepDive": "Simples simplifica mas nem sempre é o mais barato. Acima de certo faturamento, Lucro Presumido pode pagar menos."
          },
          {
            "title": "LTDA / S.A. (Sem limite)",
            "content": "LTDA: responsabilidade limitada ao capital social. S.A.: pode ter ações negociadas em bolsa. Obrigatória para empresas maiores, investimento externo e **governança corporativa** formal.\n\n#### 🏷️ Regimes tributários\n\n#### 🏛️ 3 regimes tributários no Brasil",
            "quote": "Estudo de Caso — Magazine Luiza (2015):",
            "studyCase": {
              "title": "Magazine Luiza (2015)",
              "body": "Migrou de LTDA familiar para S.A. aberta na B3. Permitiu captar capital para a transformação digital que multiplicou valor por 100x. Estrutura jurídica habilitou a estratégia."
            },
            "deepDive": "A estrutura jurídica não é burocracia — é habilitador estratégico. S.A. abre portas que LTDA não abre."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Estrutura jurídica e regime tributário são decisões **estratégicas**, não burocráticas. MEI para começar, ME para crescer, S.A. para escalar. Simples para simplificar, Presumido para otimizar, Real para margens baixas.\n\n**Principais Insights:**\n\n- 15 milhões de MEIs no Brasil. Porta de entrada: R$ 70/mês e **CNPJ** em 15 minutos.\n- Simples nem sempre é mais barato. Acima de certo faturamento, Presumido pode **economizar** 30%+.\n- Magazine Luiza: LTDA → S.A. habilitou a transformação digital. Estrutura jurídica = **habilitador estratégico**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "15 milhões de MEIs no Brasil. Porta de entrada: R$ 70/mês e CNPJ em 15 minutos.",
            "Simples nem sempre é mais barato. Acima de certo faturamento, Presumido pode economizar 30%+.",
            "Magazine Luiza: LTDA → S.A. habilitou a transformação digital. Estrutura jurídica = habilitador estratégico.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M2-S2",
    "code": "M2-1",
    "title": "Demonstracoes Contabeis",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Fundamentos da Contabilidade",
        "description": "A linguagem universal dos negócios — o que ela é, por que existe e quem usa",
        "subsections": [
          {
            "title": "Registrar transações (Objetivo 1)",
            "content": "Registrar TODAS as transações financeiras: vendas, compras, gastos, receitas e qualquer atividade que envolva dinheiro. Esses registros são a **matéria-prima** de toda análise financeira — sem eles, não há histórico, não há diagnóstico, não há decisão informada.",
            "quote": "Estudo de Caso — Pequeno empresário típico (2024):",
            "studyCase": {
              "title": "Pequeno empresário típico (2024)",
              "body": "MEI sem registro contábil sistemático fica sem saber a margem real de cada produto. Erra preço, erra estoque, erra imposto. 60% dos pequenos negócios brasileiros fecham em até 5 anos — e má gestão financeira aparece como causa principal (Sebrae, 2023)."
            },
            "deepDive": "Registro contábil em dia separa empresa profissional de aventura. É o primeiro ato de gestão — não o último."
          },
          {
            "title": "Classificar e resumir (Objetivo 2)",
            "content": "Organizar os dados em categorias claras para que possam ser compreendidos e analisados. Não basta registrar — precisa **classificar** (esse gasto é custo ou despesa? esse pagamento é dívida ou patrimônio?) e resumir em relatórios padronizados.",
            "quote": "Estudo de Caso — Plano de contas (2024):",
            "studyCase": {
              "title": "Plano de contas (2024)",
              "body": "Empresa que não classifica bem mistura tudo. Confunde investimento (compra de máquina) com despesa (conta de luz). Resultado: lucro contábil parece bem maior do que é. Quando o IR audita, a multa chega."
            },
            "deepDive": "Classificar bem é tão importante quanto registrar. Mistura na classe = decisão ruim no topo."
          },
          {
            "title": "Avaliar o desempenho (Objetivo 3)",
            "content": "Permitir que a empresa avalie seu desempenho financeiro **ao longo do tempo**. Cria relatórios que mostram lucros, perdas, ativos, passivos. Esses relatórios não são fim — são insumo pra responder: \"está melhor ou pior que mês passado? Por quê? O que mudar?\"\n\n#### 🏛️ 4 Finalidades da Contabilidade\n\n- **🎯 Tomada de decisões**: Os dados contábeis fornecem as informações que a empresa precisa pra escolher o melhor caminho: investir em novos projetos, cortar despesas ou expandir. **Decisão sem dado** é palpite — e palpite custa caro.\n  - *Métrica:* **#1** (razão de existir)\n- **📋 Prestação de contas**: Cria registro transparente das atividades financeiras pra investidores, órgãos reguladores e outras partes interessadas. É o que separa empresa profissional de **caixa preta**.\n  - *Métrica:* **Auditoria** (Big 4 anuais)\n- **⚙️ Controle financeiro**: Permite monitorar operações e ajustá-las pra atingir metas. Detecta **desvio** antes que vire crise. Empresa sem controle financeiro vive em emergência permanente.\n  - *Métrica:* **Mensal** (frequência mínima)\n- **📊 Análise de desempenho**: Avalia desempenho passado e atual pra identificar áreas de melhoria e medir progresso em direção a objetivos estratégicos. É o **retrovisor** que orienta o volante.\n  - *Métrica:* **KPIs** (definidos por área)",
            "quote": "Estudo de Caso — Análise mensal vs anual (2024):",
            "studyCase": {
              "title": "Análise mensal vs anual (2024)",
              "body": "Empresa que olha balanço só uma vez por ano descobre problema tarde demais. Quem olha mensalmente (DRE simplificada) detecta queda de margem em 30 dias e corrige. Diferença entre quebrar e ajustar."
            },
            "deepDive": "Frequência da análise contábil diferencia gestor de \"dono que paga conta\". Quem olha mensal, decide melhor."
          },
          {
            "title": "Usuários internos (Dentro da empresa)",
            "content": "**Gerência e direção**: tomam decisões estratégicas, planejam o futuro e avaliam o desempenho. **Funcionários**: querem entender a saúde financeira e como ela afeta a estabilidade dos empregos. **Departamento de finanças**: garantem que a empresa atenda às obrigações financeiras e controla o **fluxo de caixa**.",
            "quote": "Estudo de Caso — Padrão de empresa madura (2024):",
            "studyCase": {
              "title": "Padrão de empresa madura (2024)",
              "body": "Empresa que faz reunião mensal de resultado com TODA gerência (não só finanças) tem 3x mais chance de antecipar problemas. Apresentar números pra gerência operacional faz cada um ver como sua área impacta o resultado consolidado — vira accountability natural."
            },
            "deepDive": "Quem olha contabilidade dentro da empresa decide o que ela vai ser. Sem clareza interna, externa não acredita."
          },
          {
            "title": "Usuários externos (Fora da empresa)",
            "content": "**Investidores e acionistas**: avaliam desempenho passado e futuro pra decidir investir. **Credores e instituições financeiras** (bancos): avaliam a capacidade de pagar empréstimos. **Governo e órgãos reguladores**: garantem cumprimento das leis fiscais. **Fornecedores e clientes**: querem garantias de pagamento e **estabilidade**.",
            "quote": "Estudo de Caso — Americanas (2023):",
            "studyCase": {
              "title": "Americanas (2023)",
              "body": "R$ 20 bilhões em fraude contábil destruíram a confiança de TODOS os usuários externos ao mesmo tempo: investidores fugiram (-97% das ações), bancos cancelaram crédito, fornecedores travaram entregas, clientes fugiram. Confiança contábil é base de tudo."
            },
            "deepDive": "Cada usuário externo vê a empresa pelas lentes contábeis. Manipular o número é destruir relação com todo mundo de uma vez."
          },
          {
            "title": "Contabilidade Financeira (Foco: público externo)",
            "content": "Voltada pra fora da empresa: prepara relatórios públicos (Balanço, DRE, Fluxo de Caixa) divulgados a acionistas e órgãos reguladores. Garante **conformidade** com normas contábeis (IFRS/CPC) e regulamentações governamentais. É o que investidores e analistas usam pra avaliar valor da empresa.",
            "quote": "Estudo de Caso — IFRS no Brasil (2010):",
            "studyCase": {
              "title": "IFRS no Brasil (2010)",
              "body": "O Brasil adotou as normas IFRS via CPC em 2010 — alinhando a contabilidade brasileira ao padrão internacional. Antes, balanços de empresas BR eram difíceis de comparar com estrangeiras; depois, investidores globais passaram a olhar a B3 com olhos comparáveis. A IPO da Petrobras (2010, US$ 70B) foi a primeira grande beneficiada."
            },
            "deepDive": "Contabilidade financeira é a cara pública da empresa. Tem regras rígidas e ninguém negocia formato."
          },
          {
            "title": "Contabilidade de Gestão (Foco: público interno)",
            "content": "Voltada pra dentro: fornece informações detalhadas pra gerência tomar decisões operacionais (preço, alocação de recursos, metas). Auxilia no **controle de custos**, análise de rentabilidade por produto/departamento, e avaliação de desempenho interno. NÃO segue padrão rígido — adapta-se ao que a empresa precisa.",
            "quote": "Estudo de Caso — Ambev (2023):",
            "studyCase": {
              "title": "Ambev (2023)",
              "body": "A Ambev é famosa pelo rigor em contabilidade de gestão: sabe a margem EXATA de cada SKU (skol latão 350ml vs garrafa 600ml) em cada região do Brasil. Resultado: margem líquida ~20% vs 3-5% do varejo médio. Não é só negociação com fornecedor — é visibilidade granular do custo."
            },
            "deepDive": "Contabilidade de gestão é a cozinha da empresa. Quem usa bem, opera com clareza; quem ignora, dirige no escuro."
          },
          {
            "title": "Tributária, Custos & Auditoria (Especializações)",
            "content": "**Tributária**: cumprimento de obrigações fiscais — cálculo e declaração de impostos devidos. **Custos**: acompanha e atribui custos a produtos ou serviços, base pra precificação. **Auditoria**: verifica a precisão das informações financeiras, fornecendo **segurança** para investidores e demais interessados.\n\nEm resumo: a contabilidade é a ferramenta que traduz as complexidades financeiras em informações compreensíveis. É o **alicerce** de todo o sistema financeiro. Os próximos capítulos exploram os 3 relatórios principais que ela produz: Balanço Patrimonial (o que a empresa tem, deve e quanto sobra), DRE (lucrou ou perdeu?) e Fluxo de Caixa (o oxigênio do negócio).",
            "quote": "Estudo de Caso — Big 4 e o caso Enron (2001):",
            "studyCase": {
              "title": "Big 4 e o caso Enron (2001)",
              "body": "Em 2001, a Arthur Andersen (uma das Big 5 da época) foi cúmplice da fraude da Enron e desapareceu em 1 ano. Hoje sobraram 4 (Deloitte, PwC, EY, KPMG) que auditam ~80% das empresas listadas no mundo. Auditoria independente é o pilar que sustenta TODA a confiança contábil — quando falha, mercado inteiro tremem."
            },
            "deepDive": "Cada especialização atende um problema específico. Empresa madura usa as 3 + financeira + gestão = 5 olhares sobre o mesmo número."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Contabilidade = **linguagem universal** dos negócios. 3 objetivos (registrar · classificar · avaliar), 4 finalidades (decisão · prestação · controle · análise), 2 públicos (interno · externo) e múltiplas especializações (financeira · gestão · tributária · custos · auditoria). Sem essa base, os relatórios dos próximos capítulos seriam só números soltos.\n\n**Principais Insights:**\n\n- Contabilidade é **ciência social aplicada** — combina técnica financeira com comportamento humano e leitura social.\n- 60% das PMEs brasileiras fecham em 5 anos — má gestão financeira aparece como **causa #1**. Registro bem feito não é burocracia: é sobrevivência.\n- Cada usuário (interno vs externo) lê o mesmo número com **lente diferente**. CFO vê controle, investidor vê retorno, banco vê risco. Mesma contabilidade, perguntas diferentes.\n- Fraude contábil (caso Americanas R$ 20B) destrói confiança de TODOS os usuários ao mesmo tempo — **efeito dominó** em meses.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Contabilidade é ciência social aplicada — combina técnica financeira com comportamento humano e leitura social.",
            "60% das PMEs brasileiras fecham em 5 anos — má gestão financeira aparece como causa #1. Registro bem feito não é burocracia: é sobrevivência.",
            "Cada usuário (interno vs externo) lê o mesmo número com lente diferente. CFO vê controle, investidor vê retorno, banco vê risco. Mesma contabilidade, perguntas diferentes.",
            "Fraude contábil (caso Americanas R$ 20B) destrói confiança de TODOS os usuários ao mesmo tempo — efeito dominó em meses."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Balanço Patrimonial",
        "description": "A fotografia financeira — o que a empresa tem, deve e quanto sobra",
        "subsections": [
          {
            "title": "Ativo — O que a empresa TEM (Lado esquerdo)",
            "content": "**Ativo Circulante**: bens e direitos que viram dinheiro em até 12 meses — caixa, banco, contas a receber, estoque. **Ativo Não Circulante**: bens de longo prazo — imóveis, máquinas, veículos, **investimentos** de longo prazo, intangíveis (marca, patente).",
            "quote": "Estudo de Caso — Magazine Luiza (2023):",
            "studyCase": {
              "title": "Magazine Luiza (2023)",
              "body": "Ativo total: R$ 35 bilhões. Ativo circulante (estoque + recebíveis) = 60%. O marketplace (intangível) vale mais que todas as lojas físicas juntas."
            },
            "deepDive": "Em empresas digitais, o ativo mais valioso é intangível — marca, plataforma, base de dados. Não aparece no prédio."
          },
          {
            "title": "Passivo — O que a empresa DEVE (Lado direito (dívidas))",
            "content": "**Passivo Circulante**: obrigações de até 12 meses — fornecedores, salários, impostos, empréstimos de curto prazo. **Passivo Não Circulante**: dívidas de longo prazo — financiamentos, debêntures, **provisões** trabalhistas.",
            "quote": "Estudo de Caso — Americanas (2023):",
            "studyCase": {
              "title": "Americanas (2023)",
              "body": "Fraude contábil de R$ 20 bilhões escondida no passivo. Fornecedores não contabilizados. O balanço \"saudável\" era mentira. Prova de que ler o balanço é tão importante quanto produzi-lo."
            },
            "deepDive": "O passivo conta a história real da empresa. Se está inflado ou oculto, o balanço inteiro é mentira."
          },
          {
            "title": "Patrimônio Líquido — O que SOBRA (Lado direito (donos))",
            "content": "PL = Ativo - Passivo. É o que pertence aos sócios/acionistas. Inclui capital social, reservas de lucros e **lucros acumulados**. PL negativo = empresa deve mais do que tem = insolvência técnica.\n\nA equação Ativo = Passivo + PL SEMPRE fecha. Se não fecha, tem erro contábil (ou fraude). O balanço é auditado anualmente por empresas independentes (Big 4: Deloitte, PwC, EY, KPMG). Ler o balanço é a habilidade financeira mais importante para qualquer **gestor** — não só para contadores.\n\n#### 🏛️ Indicadores-chave do Balanço",
            "quote": "Estudo de Caso — Nubank (2022):",
            "studyCase": {
              "title": "Nubank (2022)",
              "body": "PL negativo por anos — estratégia deliberada: investir em crescimento antes de lucrar. Em 2023, primeiro ano de lucro: R$ 1 bilhão. PL virou positivo. Investidores financiaram o gap."
            },
            "deepDive": "PL negativo não é sempre ruim. Startups em hipercrescimento queimam caixa de propósito. O que importa é o caminho para o positivo."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Balanço = **fotografia**. Ativo (tem) = Passivo (deve) + PL (sobra). Sempre fecha. Se não fecha, tem problema. Liquidez, endividamento e ROE são os 3 indicadores que todo gestor deve saber ler.\n\n**Principais Insights:**\n\n- Ativo = Passivo + PL. Se não fecha, tem erro ou **fraude** (Americanas R$ 20B).\n- Em empresas digitais, o ativo mais valioso é **intangível** — marca, plataforma, dados.\n- PL negativo pode ser estratégico em startups. O que importa é o **caminho** para o positivo.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Ativo = Passivo + PL. Se não fecha, tem erro ou fraude (Americanas R$ 20B).",
            "Em empresas digitais, o ativo mais valioso é intangível — marca, plataforma, dados.",
            "PL negativo pode ser estratégico em startups. O que importa é o caminho para o positivo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: DRE — Demonstração do Resultado",
        "description": "Da receita bruta ao lucro líquido — onde a empresa ganha e onde perde",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "A DRE é um **funil**: receita entra no topo, custos e despesas são subtraídos, lucro (ou prejuízo) sai embaixo. Cada linha é uma alavanca. Margem caindo = sinal de alerta. Margem subindo = eficiência melhorando.\n\n**Principais Insights:**\n\n- DRE de cima para baixo: Receita → (-) CMV → Lucro Bruto → (-) Despesas → EBIT → (-) IR → **Lucro Líquido**.\n- Margem bruta alta + margem líquida baixa = empresa eficiente na produção mas **inchada** na operação.\n- Ambev: margem líquida ~20%. Varejo brasileiro: ~3-5%. O setor define o **benchmark**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "DRE de cima para baixo: Receita → (-) CMV → Lucro Bruto → (-) Despesas → EBIT → (-) IR → Lucro Líquido.",
            "Margem bruta alta + margem líquida baixa = empresa eficiente na produção mas inchada na operação.",
            "Ambev: margem líquida ~20%. Varejo brasileiro: ~3-5%. O setor define o benchmark."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Fluxo de Caixa",
        "description": "O oxigênio do negócio — por que empresas lucrativas quebram",
        "subsections": [
          {
            "title": "Fluxo Operacional (O dia a dia)",
            "content": "Entradas e saídas da **operação**: recebimento de vendas, pagamento de fornecedores, salários, impostos. É o coração do negócio. Se o operacional é negativo recorrente, o modelo tem problema.",
            "quote": "Estudo de Caso — iFood (2020):",
            "studyCase": {
              "title": "iFood (2020)",
              "body": "Fluxo operacional negativo por anos — queimava caixa para crescer (subsídios a entregadores e restaurantes). Estratégia: dominar mercado primeiro, monetizar depois. Em 2023, operacional virou positivo."
            },
            "deepDive": "Queimar caixa é estratégia válida SE tem plano para virar positivo. Sem plano, é caminho para falência."
          },
          {
            "title": "Fluxo de Investimento (O futuro)",
            "content": "Compra/venda de ativos de longo prazo: equipamentos, imóveis, **aquisições**, investimentos. Normalmente negativo em empresas que crescem (investindo). Positivo pode significar que está vendendo ativos.",
            "quote": "Estudo de Caso — Ambev (2023):",
            "studyCase": {
              "title": "Ambev (2023)",
              "body": "Investiu R$ 4 bilhões em novas fábricas e automação. Fluxo de investimento fortemente negativo. O investimento de hoje é a margem de amanhã."
            },
            "deepDive": "Fluxo de investimento positivo em empresa que não está crescendo = vendendo os móveis para pagar o aluguel."
          },
          {
            "title": "Fluxo de Financiamento (De onde vem o dinheiro)",
            "content": "Captação e pagamento de dívidas, emissão de ações, dividendos. **Como** a empresa se financia: capital próprio (ações) ou de terceiros (dívida).\n\n**Runway** é quanto tempo a empresa sobrevive com o caixa atual, sem nova receita. Fórmula: Caixa ÷ Queima Mensal = meses de sobrevivência. Startups consideram **6 meses** o mínimo seguro. Abaixo disso, é emergência de captação.",
            "quote": "Estudo de Caso — Nubank (2021):",
            "studyCase": {
              "title": "Nubank (2021)",
              "body": "IPO na NYSE captou US$ 2.6 bilhões. Fluxo de financiamento massivamente positivo. Esse dinheiro financiou o crescimento que gerou 80M de clientes."
            },
            "deepDive": "Financiar por ação (equity) dilui sócios mas não gera juros. Por dívida não dilui mas gera obrigação fixa."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Lucro ≠ Caixa. Empresa lucrativa quebra por falta de **oxigênio** (caixa). Os 3 fluxos (operacional, investimento, financiamento) contam histórias complementares. Runway = quanto tempo você sobrevive.\n\n**Principais Insights:**\n\n- Vendeu R$ 100k em janeiro, cliente paga em abril. Na DRE = lucro. No caixa = **zero**.\n- iFood queimou caixa por anos de propósito. Sem plano de virar positivo, queima = **falência**.\n- Runway < 6 meses = emergência. Acima de 12 meses = **tranquilidade** para focar em produto.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Vendeu R$ 100k em janeiro, cliente paga em abril. Na DRE = lucro. No caixa = zero.",
            "iFood queimou caixa por anos de propósito. Sem plano de virar positivo, queima = falência.",
            "Runway < 6 meses = emergência. Acima de 12 meses = tranquilidade para focar em produto."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "5: Patrimônio e Método das Partidas Dobradas",
        "description": "Bens, Direitos, Obrigações e PL — os 4 pilares que formam todo patrimônio empresarial",
        "subsections": [
          {
            "title": "Bens Tangíveis (Físicos e palpáveis)",
            "content": "São recursos com **presença física** — você toca, vê e mede. Incluem imóveis, máquinas, veículos, estoques, equipamentos. Se está em forma física e gera benefício econômico para a empresa, é um bem tangível.",
            "quote": "Estudo de Caso — Exemplo prático (2024):",
            "studyCase": {
              "title": "Exemplo prático (2024)",
              "body": "Uma padaria possui: forno (bem tangível), estoque de farinha (tangível) e ponto comercial (imóvel — tangível imóvel). Todos aparecem no balanço como Ativo Não Circulante (imóvel, forno) ou Ativo Circulante (estoque)."
            },
            "deepDive": "Bens tangíveis são a espinha dorsal operacional de empresas industriais e comerciais. Em empresas digitais, perderam espaço para os intangíveis."
          },
          {
            "title": "Bens Tangíveis Móveis (Deslocáveis sem dano)",
            "content": "São tangíveis que podem ser **transferidos de lugar** sem perder utilidade. Máquinas, veículos, estoques, computadores, mobiliário. A característica-chave: mover não os destrói nem reduz sua função.",
            "quote": "Estudo de Caso — Frota logística (2024):",
            "studyCase": {
              "title": "Frota logística (2024)",
              "body": "Uma transportadora possui 50 caminhões — cada um é um bem tangível móvel. Eles são registrados como Ativo Imobilizado no balanço e sofrem depreciação anual. Quando vendidos, geram receita não operacional."
            },
            "deepDive": "Bens móveis depreciam — perdem valor contábil ao longo do tempo. Esse gasto (depreciação) aparece na DRE mesmo sem sair dinheiro do caixa."
          },
          {
            "title": "Bens Tangíveis Imóveis (Fixos ao solo)",
            "content": "Terrenos, edifícios, instalações industriais — bens que **não podem ser deslocados** sem dano ou perda significativa de valor. A diferença crucial: terrenos **não depreciam**; construções, sim.",
            "quote": "Estudo de Caso — Petrobras (2023):",
            "studyCase": {
              "title": "Petrobras (2023)",
              "body": "Plataformas de petróleo são bens imóveis fixos ao mar. R$ 300 bilhões em ativos imobilizados. Cada plataforma é registrada separadamente com vida útil e depreciação próprias. Terrenos sob refinarias são registrados sem depreciação."
            },
            "deepDive": "Terreno é o único bem tangível que não perde valor contábil com o tempo — ao contrário, tende a valorizar."
          },
          {
            "title": "Bens Intangíveis (Sem substância física)",
            "content": "Existem e geram valor, mas não podem ser tocados: **marcas registradas, patentes, direitos autorais, softwares, goodwill**. São ativos que refletem a reputação, o conhecimento e a inovação da empresa.\n\n#### 🏷️ Os Direitos — o que a empresa tem a receber\n\nDireitos representam valores que a empresa **tem o direito de receber** de terceiros. Eles são ativos, mesmo que o dinheiro ainda não esteja em caixa. Contas a receber de clientes, títulos de investimentos, adiantamentos dados a fornecedores, depósitos judiciais — todos são direitos. A empresa os registra como ativo porque representam **entrada futura de recursos**.",
            "quote": "Estudo de Caso — Coca-Cola (2023):",
            "studyCase": {
              "title": "Coca-Cola (2023)",
              "body": "A marca Coca-Cola vale US$ 106 bilhões (Interbrand 2023) — mais do que todas as fábricas, caminhões e estoques combinados. É um bem intangível puro. Empresas como Apple e Google têm mais de 80% de seu valor em intangíveis."
            },
            "deepDive": "Intangíveis são o ativo mais valioso da economia moderna — e os mais difíceis de mensurar. O goodwill aparece só quando uma empresa é comprada por mais do que seu valor patrimonial."
          },
          {
            "title": "Dívidas e Empréstimos (Passivo financeiro)",
            "content": "Financiamentos bancários, debêntures, CRIs, CRAs — o que a empresa deve a **credores financeiros**. Dividem-se entre curto prazo (circulante) e longo prazo (não circulante) conforme o vencimento.",
            "quote": "Estudo de Caso — Via Varejo / Casas Bahia (2023):",
            "studyCase": {
              "title": "Via Varejo / Casas Bahia (2023)",
              "body": "Dívida bruta de R$ 4 bilhões com vencimentos no curto prazo — pressão de liquidez. A incapacidade de refinanciar levou a pedido de recuperação judicial. Obrigações financeiras mal geridas destroem empresa saudável operacionalmente."
            },
            "deepDive": "O que importa não é o tamanho da dívida — é o prazo e custo. Dívida longa e barata é saudável. Dívida curta e cara é risco."
          },
          {
            "title": "Fornecedores e Contas a Pagar (Passivo operacional)",
            "content": "O que a empresa deve a seus **fornecedores** de mercadorias e serviços. Estender o prazo de pagamento aos fornecedores é uma alavanca de capital de giro — desde que não prejudique o relacionamento.",
            "quote": "Estudo de Caso — Americanas (2023):",
            "studyCase": {
              "title": "Americanas (2023)",
              "body": "R$ 20 bilhões em dívidas com fornecedores não contabilizadas. O passivo de fornecedores foi manipulado — aparecia como muito menor. Quando a fraude veio à tona, o balanço inteiro ruiu, pois essa obrigação era o coração do negócio de varejo."
            },
            "deepDive": "Estender pagamento a fornecedor gera capital de giro grátis. Mas tem limite — relação deve ser sustentável."
          },
          {
            "title": "Salários, Encargos e Impostos (Passivo trabalhista e fiscal)",
            "content": "Folha de pagamento a liquidar, FGTS, INSS, férias provisionadas, 13º proporcional, impostos apurados mas ainda não pagos (IR, PIS, COFINS, ICMS). São obrigações **recorrentes e inegociáveis** — atraso gera multa e risco jurídico.\n\n#### 🏷️ Patrimônio Líquido — o resultado da equação\n\nO **Patrimônio Líquido (PL)** é o valor que sobra após subtrair todas as obrigações dos bens e direitos. Fórmula: **PL = (Bens + Direitos) − Obrigações**. Ele representa a parcela que **realmente pertence aos proprietários** da empresa. É composto por: capital social (o que os sócios investiram), reservas (lucros que ficaram na empresa) e resultado do exercício (lucro ou prejuízo do período atual).",
            "quote": "Estudo de Caso — Empresa em dificuldade (2024):",
            "studyCase": {
              "title": "Empresa em dificuldade (2024)",
              "body": "Empresa que atrasa FGTS por 3 meses acumula multa de 100% sobre o valor + juros + possibilidade de ação trabalhista. Cada dia de atraso piora o passivo. Obrigações trabalhistas têm preferência em recuperação judicial — passam à frente de quase tudo."
            },
            "deepDive": "Provisionar 13º e férias mensalmente é obrigação contábil, não escolha. Quem não provisiona acumula passivo invisível."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "O patrimônio é composto por **bens + direitos** (o que a empresa tem e tem a receber) menos **obrigações** (o que ela deve). O resultado é o Patrimônio Líquido — o valor que pertence aos donos. Bens podem ser tangíveis (físicos: móveis ou imóveis) ou intangíveis (sem corpo físico). Direitos são ativos futuros. Obrigações são passivos presentes.\n\n**Principais Insights:**\n\n- PL = (Bens + Direitos) − Obrigações. Equação simples, interpretação poderosa — revela quem **realmente possui** a empresa.\n- Bens tangíveis imóveis (terrenos) **não depreciam**. Móveis e construções, sim. Intangíveis amortizam conforme a vida útil.\n- Obrigações trabalhistas e fiscais têm **prioridade** em caso de falência — ficam à frente de bancos e fornecedores. Nunca ignorar.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "PL = (Bens + Direitos) − Obrigações. Equação simples, interpretação poderosa — revela quem realmente possui a empresa.",
            "Bens tangíveis imóveis (terrenos) não depreciam. Móveis e construções, sim. Intangíveis amortizam conforme a vida útil.",
            "Obrigações trabalhistas e fiscais têm prioridade em caso de falência — ficam à frente de bancos e fornecedores. Nunca ignorar.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M2-S3",
    "code": "M2-2",
    "title": "Matematica Financeira",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: O que é Matemática Financeira",
        "description": "O valor do dinheiro muda com o tempo — entenda isso antes de qualquer cálculo",
        "subsections": [
          {
            "title": "Pessoa Física (Indivíduo com CPF)",
            "content": "É qualquer pessoa com certidão de nascimento e **Cadastro de Pessoa Física (CPF)**. Quando você faz um financiamento, investe em um CDB ou paga o rotativo do cartão, está operando como pessoa física.",
            "quote": "Estudo de Caso — Exemplo cotidiano (2024):",
            "studyCase": {
              "title": "Exemplo cotidiano (2024)",
              "body": "Maria investe R$ 1.000 por mês no Tesouro Direto. Para saber quanto terá em 5 anos, ela usa matemática financeira. Sem essa ferramenta, seria puro chute."
            },
            "deepDive": "Pessoa física ou jurídica, o princípio é o mesmo: dinheiro no tempo tem valor diferente. A matemática financeira serve para ambas."
          },
          {
            "title": "Pessoa Jurídica (Empresa com CNPJ)",
            "content": "É qualquer entidade que opera com um **Cadastro Nacional de Pessoa Jurídica (CNPJ)** — MEI, sociedade limitada, S.A. Todas usam matemática financeira para decidir preços, financiamentos, investimentos e análise de projetos.\n\n#### 🏷️ Taxa de juros — o \"preço do dinheiro\"\n\nA taxa de juros indica o **percentual aplicado sobre um valor inicial** (o capital) durante um período, resultando em um valor futuro. Para Ferreira (2025), é o \"preço do dinheiro no tempo.\" Se você paga 2% ao mês em um empréstimo, está pagando 2% de aluguel sobre o dinheiro que pegou emprestado. Toda operação financeira tem dois prazos que precisam andar juntos: o prazo da taxa (ao mês ou ao ano) e o prazo de capitalização (quando os juros são cobrados). Se não casam, é preciso converter.",
            "quote": "Estudo de Caso — Padaria do João (2024):",
            "studyCase": {
              "title": "Padaria do João (2024)",
              "body": "João avalia comprar um forno a prazo (24 × R$ 800) ou à vista (R$ 15.000). Para saber qual sai mais barato, precisa calcular o custo real dos juros. Sem matemática financeira, pode escolher o pior caminho sem perceber."
            },
            "deepDive": "Empresa que não entende matemática financeira paga mais caro em tudo — crédito, leasing, fornecedor. Conhecimento reduz custo."
          },
          {
            "title": "Mensal → Anual (proporcional) (Multiplicação linear — juros simples)",
            "content": "Taxa mensal de 2% → taxa anual proporcional = 2% × 12 = **24% ao ano**. Simples assim. Divide para ir no sentido contrário: 24% ÷ 12 = 2% ao mês.",
            "quote": "Estudo de Caso — Cartão de crédito (2024):",
            "studyCase": {
              "title": "Cartão de crédito (2024)",
              "body": "Juros do cartão: 15% ao mês. Anual proporcional: 15% × 12 = 180% ao ano. Isso é a taxa nominal — o custo real com composição é ainda maior. Por isso o cartão é tão perigoso."
            },
            "deepDive": "Proporcional = multiplicação simples. Mas atenção: só vale para juros simples. Com juros compostos (o padrão do mercado), o cálculo é diferente."
          },
          {
            "title": "Taxas equivalentes (Conversão exponencial — juros compostos)",
            "content": "No regime de juros compostos, a conversão é **exponencial** — porque os juros gerados em cada período são incorporados ao capital, gerando novos juros. Duas taxas são equivalentes quando produzem o mesmo resultado no mesmo período.",
            "quote": "Estudo de Caso — Tesouro Direto (2024):",
            "studyCase": {
              "title": "Tesouro Direto (2024)",
              "body": "Selic: 10,5% ao ano. Para saber a taxa mensal equivalente: (1 + 0,105)^(1/12) − 1 = 0,837% ao mês. Não é 10,5 ÷ 12 = 0,875%. A diferença importa no longo prazo."
            },
            "deepDive": "Segundo Schmidt, Huffel e Alves (2020): nos mesmos prazos, juros simples e compostos produzem valores diferentes. Saber qual regime estamos usando é o primeiro passo de qualquer cálculo."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Matemática financeira é a ferramenta que compara **valores em momentos diferentes**. Pessoa física ou jurídica, o princípio é o mesmo. Taxas proporcionais: para juros simples (linear). Taxas equivalentes: para juros compostos (exponencial — padrão do mercado).\n\n**Principais Insights:**\n\n- Taxa proporcional: multiplica ou divide. Serve para **juros simples**.\n- Taxa equivalente: fórmula (1+i)^n. Serve para **juros compostos** — o padrão do mercado.\n- Prazo da taxa e prazo de capitalização precisam **sempre casar**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Taxa proporcional: multiplica ou divide. Serve para juros simples.",
            "Taxa equivalente: fórmula (1+i)^n. Serve para juros compostos — o padrão do mercado.",
            "Prazo da taxa e prazo de capitalização precisam sempre casar."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Juros Simples vs Juros Compostos",
        "description": "A diferença que muda tudo — por que Einstein chamou os juros compostos de 8ª maravilha",
        "subsections": [
          {
            "title": "Juros Simples (Crescimento linear)",
            "content": "Fórmula: J = C × i × t. Os juros incidem apenas sobre o **capital inicial**. R$ 10.000 a 10% a.a. por 5 anos = R$ 5.000 de juros. Total: R$ 15.000. Crescimento previsível e constante.",
            "quote": "Estudo de Caso — Exemplo prático (2024):",
            "studyCase": {
              "title": "Exemplo prático (2024)",
              "body": "Empréstimo de R$ 50.000 a juros simples de 2% a.m. por 12 meses: juros = R$ 50.000 × 0.02 × 12 = R$ 12.000. Total a pagar: R$ 62.000. Cada mês paga o mesmo valor de juros."
            },
            "deepDive": "Juros simples são usados em pouquíssimas situações reais. O mercado financeiro opera quase exclusivamente com compostos."
          },
          {
            "title": "Juros Compostos (Crescimento exponencial)",
            "content": "Fórmula: M = C × (1 + i)^t. Juros incidem sobre **juros anteriores**. R$ 10.000 a 10% a.a. por 5 anos = R$ 16.105. Diferença de R$ 1.105 vs simples. Em 30 anos: R$ 174.494 vs R$ 40.000.\n\nA regra dos 72: divida 72 pela taxa anual para saber em quantos anos o dinheiro dobra. Taxa de 12% a.a. → 72 ÷ 12 = **6 anos** para dobrar. Taxa de 6% → 12 anos. Ferramenta mental rápida para avaliar investimentos e dívidas.",
            "quote": "Estudo de Caso — Investimento real (2024):",
            "studyCase": {
              "title": "Investimento real (2024)",
              "body": "R$ 1.000/mês a 1% a.m. (Selic ~12% a.a.) por 20 anos: aporte total R$ 240.000. Valor final: R$ 989.000. Os juros compostos geraram R$ 749.000 — mais de 3x o que você colocou."
            },
            "deepDive": "Einstein (atribuído): \"Juros compostos são a 8ª maravilha do mundo. Quem entende, ganha. Quem não entende, paga.\""
          },
          {
            "title": "Síntese e Fechamento",
            "content": "A diferença entre simples e compostos parece pequena no curto prazo. No longo prazo, é a diferença entre **riqueza e estagnação**. Em 30 anos a 10% a.a.: simples dá R$ 40k; compostos dá R$ 174k.\n\n**Principais Insights:**\n\n- Regra dos 72: 72 ÷ taxa = anos para **dobrar**. Selic 12% = 6 anos.\n- R$ 1.000/mês a 1% a.m. por 20 anos: aporte R$ 240k, resultado **R$ 989k**.\n- Juros compostos são padrão no mercado. Quem não entende, paga **caro**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Regra dos 72: 72 ÷ taxa = anos para dobrar. Selic 12% = 6 anos.",
            "R$ 1.000/mês a 1% a.m. por 20 anos: aporte R$ 240k, resultado R$ 989k.",
            "Juros compostos são padrão no mercado. Quem não entende, paga caro."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Valor do Dinheiro no Tempo",
        "description": "VP, VF, VPL e TIR — as ferramentas de decisão de investimento",
        "subsections": [
          {
            "title": "VPL na Prática (Decisão de investir)",
            "content": "Investimento: R$ 500k. Fluxos esperados: R$ 150k/ano por 5 anos. Taxa de desconto: 12%. VPL = **R$ 40.837**. Como VPL > 0, o investimento gera valor acima do custo de capital.",
            "quote": "Estudo de Caso — Expansão de fábrica (2024):",
            "studyCase": {
              "title": "Expansão de fábrica (2024)",
              "body": "Ambev avalia nova linha de produção: investimento R$ 80M, fluxos de R$ 25M/ano por 6 anos. VPL a 10%: R$ 28.8M positivo. Aprovado — gera valor."
            },
            "deepDive": "VPL > 0 não garante sucesso — garante que, SE os fluxos se confirmarem, o projeto gera valor acima do custo de capital."
          },
          {
            "title": "TIR na Prática (Comparação de retorno)",
            "content": "Mesmo projeto da Ambev: TIR = **18.7%**. Como 18.7% > 10% (WACC), confirma que gera valor. Mas se outro projeto tem TIR de 25% com mesmo risco, priorize o de TIR maior.",
            "quote": "Estudo de Caso — Startup vs Renda Fixa (2024):",
            "studyCase": {
              "title": "Startup vs Renda Fixa (2024)",
              "body": "Investir R$ 100k numa startup com TIR projetada de 35% ou num CDB de 12%? A TIR maior justifica o risco maior — desde que a projeção seja confiável."
            },
            "deepDive": "TIR alta com projeção otimista = risco. Sempre faça cenários pessimista, base e otimista."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "R$ 100 hoje ≠ R$ 100 amanhã. VPL traduz fluxos futuros em **valor presente**. TIR dá a taxa de retorno. Payback dá o tempo. Quando VPL e TIR divergem, priorize VPL.\n\n**Principais Insights:**\n\n- VPL > 0 = investimento **gera valor** acima do custo de capital. Regra de ouro.\n- TIR > WACC = retorno supera o custo do dinheiro. Mas cuidado com projeções **otimistas**.\n- Payback ignora o que acontece depois. Projeto de payback longo pode ser o mais **lucrativo**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "VPL > 0 = investimento gera valor acima do custo de capital. Regra de ouro.",
            "TIR > WACC = retorno supera o custo do dinheiro. Mas cuidado com projeções otimistas.",
            "Payback ignora o que acontece depois. Projeto de payback longo pode ser o mais lucrativo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Indicadores Financeiros",
        "description": "ROI, Liquidez e Endividamento — os 3 números que todo gestor precisa saber",
        "subsections": [
          {
            "title": "ROI — Retorno sobre Investimento (O básico dos básicos)",
            "content": "Fórmula: ROI = (Ganho - Custo) / Custo × 100. Mede o **retorno percentual** de qualquer investimento. ROI de 50% = para cada R$ 1 investido, voltaram R$ 1,50.",
            "quote": "Estudo de Caso — Marketing Digital (2024):",
            "studyCase": {
              "title": "Marketing Digital (2024)",
              "body": "Campanha Google Ads: investiu R$ 10.000, gerou R$ 35.000 em vendas. ROI = (35k - 10k) / 10k = 250%. Para cada R$ 1, voltaram R$ 3,50. Campanha excelente."
            },
            "deepDive": "ROI não considera tempo. ROI de 100% em 1 mês é melhor que 100% em 5 anos. Compare sempre no mesmo horizonte."
          },
          {
            "title": "Liquidez Corrente (Capacidade de pagar)",
            "content": "Fórmula: Ativo Circulante / Passivo Circulante. Mede se a empresa consegue pagar suas dívidas de **curto prazo**. Acima de 1 = saudável. Abaixo de 1 = alerta.",
            "quote": "Estudo de Caso — Varejo brasileiro (2023):",
            "studyCase": {
              "title": "Varejo brasileiro (2023)",
              "body": "Liquidez média do varejo BR: 1.2. Magazine Luiza em crise (2022): liquidez caiu para 0.95 — cada R$ 1 de dívida tinha apenas R$ 0,95 em caixa. Reestruturou e voltou a 1.1."
            },
            "deepDive": "Liquidez muito alta (> 3.0) pode significar dinheiro parado que deveria estar investido. O ótimo é entre 1.2 e 2.0."
          },
          {
            "title": "Endividamento (Quanto é de terceiros)",
            "content": "Fórmula: Passivo Total / Ativo Total × 100. Quanto do ativo é financiado por **dívida de terceiros**. Acima de 70% = risco elevado. Acima de 90% = zona de perigo.\n\n#### 🏛️ Outros indicadores essenciais\n\n- **📊 EBITDA**: Lucro antes de juros, impostos, depreciação e amortização. Mede geração de caixa **operacional**. Usado em valuation.\n  - *Métrica:* **Operacional** (puro)\n- **🔄 Giro do Ativo**: Receita / Ativo Total. Quantas vezes o ativo \"gira\" em receita por ano. Mede **eficiência** no uso dos recursos.\n- **💰 Margem EBITDA**: EBITDA / Receita. Rentabilidade operacional sem distorções contábeis. Ambev: ~35%. Varejo: **~8%**.\n  - *Métrica:* **> 15%** (bom)\n- **⏱️ Ciclo Financeiro**: Prazo médio estoque + prazo recebimento - prazo pagamento. Quantos dias a empresa financia a **operação** com capital próprio.",
            "quote": "Estudo de Caso — Americanas (2023):",
            "studyCase": {
              "title": "Americanas (2023)",
              "body": "Endividamento real (após fraude descoberta): acima de 100% — devia mais do que tinha. Passivo de R$ 42 bilhões contra ativo de R$ 22 bilhões. Insolvência técnica."
            },
            "deepDive": "Dívida não é ruim por si. Dívida que gera retorno acima dos juros é alavancagem. Dívida que não gera retorno é armadilha."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "ROI mede **retorno**. Liquidez mede **capacidade de pagar**. Endividamento mede **dependência de terceiros**. Os 3 juntos dão o diagnóstico financeiro mínimo de qualquer empresa.\n\n**Principais Insights:**\n\n- ROI não considera tempo. Compare ROI sempre no **mesmo horizonte**.\n- Liquidez muito alta (> 3.0) = dinheiro **parado**. Ótimo: 1.2 a 2.0.\n- Dívida que gera retorno acima dos juros é **alavancagem**. Abaixo, é armadilha.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "ROI não considera tempo. Compare ROI sempre no mesmo horizonte.",
            "Liquidez muito alta (> 3.0) = dinheiro parado. Ótimo: 1.2 a 2.0.",
            "Dívida que gera retorno acima dos juros é alavancagem. Abaixo, é armadilha.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M3-S1",
    "code": "M3-0",
    "title": "Economia de Empresa e Analise Mercadologica",
    "videoUrls": [
      {
        "title": "M3-01 Economia de Empresa e Análise Mercadológica",
        "url": "https://qvvqbngiwqfuxsbgcxtc.supabase.co/storage/v1/object/public/videos/IPB/Economia_Mercado.mp4"
      }
    ],
    "chapters": [
      {
        "title": "1: Fundamentos de Economia e Marketing",
        "description": "Escassez, custo de oportunidade e a evolução do marketing — de trocas a ecossistemas",
        "subsections": [
          {
            "title": "Era da Produção (até 1930) (Foco no produto)",
            "content": "\"Um bom produto se vende sozinho.\" Demanda superava oferta. Foco em **eficiência produtiva**. Bastava fabricar — o mercado absorvia.",
            "quote": "Estudo de Caso — Ford (1908):",
            "studyCase": {
              "title": "Ford (1908)",
              "body": "Henry Ford: \"O cliente pode ter o carro da cor que quiser, desde que seja preto.\" Modelo T: 15 milhões de unidades, 1 cor, 1 modelo. Produção em massa como estratégia."
            },
            "deepDive": "Funcionou enquanto demanda > oferta. Quando GM ofereceu cores e modelos, Ford perdeu liderança."
          },
          {
            "title": "Era do Marketing (1950-2000) (Foco no cliente)",
            "content": "Oferta supera demanda. Não basta fabricar — precisa entender o que o cliente quer. **Kotler** (Northwestern) sistematiza: segmentação, targeting, posicionamento. Os 4Ps entram em cena.",
            "quote": "Estudo de Caso — Coca-Cola (1985):",
            "studyCase": {
              "title": "Coca-Cola (1985)",
              "body": "New Coke: mudou a fórmula baseada em pesquisa. Clientes rejeitaram — não era só sabor, era identidade. Voltou atrás em 79 dias. Marketing precisa entender emoção, não só dados."
            },
            "deepDive": "Kotler: marketing não é vender o que você faz — é fazer o que vale para o cliente."
          },
          {
            "title": "Era Digital (2000+) (Foco em ecossistema)",
            "content": "Dados, algoritmos e plataformas redefinem marketing. O cliente não é mais audiência — é **participante** que co-cria valor. Marketing vira ciência de dados + psicologia + tecnologia.\n\n#### 🏷️ Definições clássicas de Marketing\n\n#### 🏛️ 3 visões que definem o campo",
            "quote": "Estudo de Caso — Amazon (2023):",
            "studyCase": {
              "title": "Amazon (2023)",
              "body": "35% das vendas da Amazon vêm de recomendações algorítmicas. O marketing não é campanha — é o próprio produto. Cada clique treina o algoritmo que vende mais."
            },
            "deepDive": "No marketing digital, o produto é o marketing. Recomendação, UX, dados — tudo é venda."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Marketing evoluiu de \"fabricar e vender\" para \"**entender e servir**\". A escassez obriga escolhas. O custo de oportunidade dá peso a cada decisão. E as 3 eras mostram que quem não evolui com o mercado, desaparece.\n\n**Principais Insights:**\n\n- Toda escolha tem **custo de oportunidade** — o valor da melhor alternativa sacrificada.\n- Kotler: marketing não é vender o que faz, é fazer o que **vale** para o cliente.\n- Amazon: 35% das vendas por recomendação. No digital, o produto **é** o marketing.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Toda escolha tem custo de oportunidade — o valor da melhor alternativa sacrificada.",
            "Kotler: marketing não é vender o que faz, é fazer o que vale para o cliente.",
            "Amazon: 35% das vendas por recomendação. No digital, o produto é o marketing."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Valor — O Conceito Central do Marketing",
        "description": "Valor não está no produto — está na percepção do cliente",
        "subsections": [
          {
            "title": "Valor vs Preço — Havaianas (Mesmo produto, valor diferente)",
            "content": "Chinelo de borracha: custo de produção ~R$ 3. Versão básica: R$ 15. Versão designer: R$ 80. Colaboração exclusiva: R$ 300+. A borracha é a **mesma**. O valor percebido é radicalmente diferente.",
            "quote": "Estudo de Caso — Havaianas (2020):",
            "studyCase": {
              "title": "Havaianas (2020)",
              "body": "Colaboração com Dolce & Gabbana: chinelo a R$ 350. Esgotou em horas. O produto funcional é idêntico ao de R$ 15. O valor social (exclusividade, marca, escassez) justifica 23x o preço."
            },
            "deepDive": "O marketing não muda o produto — muda o valor percebido. E valor percebido determina quanto o cliente paga."
          },
          {
            "title": "Valor vs Preço — Nubank (Mesmo serviço, valor diferente)",
            "content": "Cartão de crédito: produto idêntico ao de qualquer banco. Diferença: **zero tarifa**, app intuitivo, atendimento humano rápido. O valor econômico (economia) + funcional (facilidade) + emocional (respeito) gera 80M de clientes.",
            "quote": "Estudo de Caso — Nubank (2023):",
            "studyCase": {
              "title": "Nubank (2023)",
              "body": "NPS (Net Promoter Score) de 87 — o mais alto do setor financeiro brasileiro. Bancos tradicionais: NPS de 20-40. Mesma funcionalidade, 4x mais satisfação. Valor está na experiência."
            },
            "deepDive": "Valor percebido não é só funcional. Nubank vende respeito ao cliente — algo que bancos tradicionais nunca priorizaram."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Valor = Benefício percebido ÷ Custo percebido. Não está no produto — está na **mente** do cliente. Os 4 tipos (funcional, emocional, social, econômico) determinam quanto o cliente paga e se volta.\n\n**Principais Insights:**\n\n- Havaianas: mesma borracha, preço de R$ 15 a R$ 350. A diferença é **valor percebido**, não custo.\n- Nubank NPS 87 vs bancos 20-40. Mesmo produto, 4x mais satisfação. Valor = **experiência**.\n- Os 4Ps são 4 formas de gerenciar valor: criar (produto), sinalizar (preço), comunicar (promoção), **entregar** (distribuição).",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Havaianas: mesma borracha, preço de R$ 15 a R$ 350. A diferença é valor percebido, não custo.",
            "Nubank NPS 87 vs bancos 20-40. Mesmo produto, 4x mais satisfação. Valor = experiência.",
            "Os 4Ps são 4 formas de gerenciar valor: criar (produto), sinalizar (preço), comunicar (promoção), entregar (distribuição)."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Necessidade, Desejo e Demanda",
        "description": "A diferença que separa marketing eficiente de marketing desperdiçado",
        "subsections": [
          {
            "title": "Necessidade (Universal e inata)",
            "content": "Carência humana básica, fisiológica ou psicológica. **Independe** de cultura. Fome, sede, segurança, pertencimento, autoestima — existem em qualquer sociedade, em qualquer época.",
            "quote": "Estudo de Caso — Maslow (1943) (1943):",
            "studyCase": {
              "title": "Maslow (1943) (1943)",
              "body": "Pirâmide de Maslow: 5 níveis de necessidade — fisiológicas, segurança, sociais, estima, autorrealização. Marketing opera em todos os níveis, não só no básico."
            },
            "deepDive": "Marketing NÃO cria necessidades. Necessidades existem. Marketing cria desejos e habilita demanda."
          },
          {
            "title": "Desejo (Cultural e aprendido)",
            "content": "Forma culturalmente específica de satisfazer uma necessidade. Necessidade de alimentação é universal. Desejo de **sushi** é cultural. O desejo é aprendido — moldado por cultura, família, mídia e experiência.",
            "quote": "Estudo de Caso — Starbucks (2000):",
            "studyCase": {
              "title": "Starbucks (2000)",
              "body": "Necessidade: energia (cafeína). Desejo: experiência Starbucks (ambiente, status, ritual). Ninguém PRECISA de café de R$ 25. Mas milhões DESEJAM a experiência que ele proporciona."
            },
            "deepDive": "O marketing transforma necessidade em desejo específico. A necessidade é de cafeína. O desejo é de Starbucks."
          },
          {
            "title": "Demanda (Desejo + poder de compra)",
            "content": "Desejo acompanhado de **capacidade e disposição** de pagar. Muitos desejam um iPhone. Nem todos podem pagar R$ 8.000. Demanda = desejo viável. É onde o marketing encontra o mercado real.\n\nA distinção é estratégica: empresas que confundem necessidade com desejo lançam produtos genéricos. Empresas que confundem desejo com demanda lançam produtos que ninguém **compra** (tem vontade mas não tem dinheiro). O marketing eficiente atua nos três níveis: identifica necessidades, molda desejos e converte em demanda.",
            "quote": "Estudo de Caso — Xiaomi (2020):",
            "studyCase": {
              "title": "Xiaomi (2020)",
              "body": "Necessidade: comunicação. Desejo: smartphone premium. Barreira: preço. Xiaomi oferece 90% das funcionalidades por 30% do preço. Converteu desejo frustrado em demanda real."
            },
            "deepDive": "Xiaomi não criou necessidade nem desejo — converteu desejo existente em demanda acessível. Esse é o poder do preço."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Marketing NÃO cria necessidades — elas **existem**. Marketing molda desejos (cultural) e converte em demanda (poder de compra). Confundir os três é desperdiçar orçamento.\n\n**Principais Insights:**\n\n- Maslow: 5 níveis de necessidade. Marketing opera em **todos** — não só no básico.\n- Starbucks: necessidade de cafeína → desejo de experiência → demanda de R$ 25. **8x** o preço da padaria.\n- Xiaomi: não criou necessidade nem desejo — converteu desejo frustrado em **demanda acessível**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Maslow: 5 níveis de necessidade. Marketing opera em todos — não só no básico.",
            "Starbucks: necessidade de cafeína → desejo de experiência → demanda de R$ 25. 8x o preço da padaria.",
            "Xiaomi: não criou necessidade nem desejo — converteu desejo frustrado em demanda acessível.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M3-S2",
    "code": "M3-1",
    "title": "Lideranca e Gestao de Equipes",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Liderança, Teorias e Inteligência Emocional",
        "description": "Liderança ≠ Gestão — as 5 teorias e por que IE importa mais que QI",
        "subsections": [
          {
            "title": "Teoria dos Traços (1900-1940) (Nasce-se líder?)",
            "content": "\"Líderes nascem prontos.\" Buscava traços universais: carisma, inteligência, determinação. **Falhou** porque não explica por que pessoas com os mesmos traços às vezes lideram e às vezes não.",
            "quote": "Estudo de Caso — Estudo histórico (1940):",
            "studyCase": {
              "title": "Estudo histórico (1940)",
              "body": "Revisão de Stogdill (1948): analisou 124 estudos de traços. Conclusão: nenhum traço garante liderança. Contexto importa tanto quanto personalidade."
            },
            "deepDive": "Traços ajudam mas não determinam. Liderança é contexto + competência, não destino genético."
          },
          {
            "title": "Teoria Comportamental (1940-1960) (O que líderes FAZEM?)",
            "content": "Foco nos comportamentos, não nos traços. Liderança pode ser **aprendida**. Dois eixos: orientação para tarefas vs orientação para pessoas.",
            "quote": "Estudo de Caso — Ohio State / Michigan (1950):",
            "studyCase": {
              "title": "Ohio State / Michigan (1950)",
              "body": "Estudos de Ohio State e Michigan identificaram 2 dimensões: estrutura (tarefa) e consideração (pessoas). Líderes eficazes pontuam alto em ambas."
            },
            "deepDive": "Se liderança é comportamento, pode ser treinada. Primeira teoria com implicação prática para RH."
          },
          {
            "title": "Liderança Situacional (1969) (Depende do contexto)",
            "content": "Hersey & Blanchard: não existe estilo melhor — existe o estilo certo para o **nível de maturidade** do liderado. 4 estilos: Direcionar (iniciante), Orientar (aprendiz), Apoiar (capaz mas inseguro), Delegar (autônomo).",
            "quote": "Estudo de Caso — Gestão prática (2024):",
            "studyCase": {
              "title": "Gestão prática (2024)",
              "body": "Funcionário novo: precisa de direção (o que fazer, como fazer). Sênior: precisa de autonomia (defina o resultado, ele define o caminho). Usar o mesmo estilo para ambos é falha de liderança."
            },
            "deepDive": "O líder que usa um estilo só está acertando em 25% dos casos e errando em 75%."
          },
          {
            "title": "Liderança Transformacional (1978) (Inspirar mudança)",
            "content": "James MacGregor Burns: líderes transformacionais inspiram seguidores a transcender interesses individuais em prol de um **propósito maior**. 4 componentes: influência idealizada, motivação inspiradora, estimulação intelectual, consideração individualizada.",
            "quote": "Estudo de Caso — Natura (2014):",
            "studyCase": {
              "title": "Natura (2014)",
              "body": "Luiz Seabra (fundador) criou cultura de propósito que sobreviveu à sua saída. Colaboradores veem a empresa como causa, não emprego. Turnover 3x menor que mercado."
            },
            "deepDive": "Transformacional funciona quando o líder genuinamente acredita no propósito. Se é performance, a equipe percebe."
          },
          {
            "title": "Liderança Servidora (1970) (Servir para liderar)",
            "content": "Robert Greenleaf: o líder existe para servir a equipe, não o contrário. O líder remove **obstáculos**, fornece recursos e desenvolve pessoas. A equipe entrega resultado porque tem condições de fazer.\n\n#### 🏷️ Inteligência Emocional — a competência #1\n\nDaniel Goleman demonstrou que a inteligência emocional (IE) responde por **67%** das competências necessárias para performance superior em liderança — o dobro da importância de competências técnicas e QI combinados.",
            "quote": "Estudo de Caso — Nubank (2020):",
            "studyCase": {
              "title": "Nubank (2020)",
              "body": "David Vélez pratica liderança servidora: \"meu trabalho é garantir que vocês tenham o que precisam para resolver o problema do cliente.\" Resultado: equipes autônomas, decisão descentralizada."
            },
            "deepDive": "Servidora é a teoria mais moderna e a mais difícil de praticar — exige ego baixo do líder."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Liderança não é cargo — é **comportamento**. As 5 teorias mostram a evolução: de \"nasce líder\" para \"líder serve\". E Goleman provou que IE importa 2x mais que QI para liderar.\n\n**Principais Insights:**\n\n- Gestão = complexidade. Liderança = **mudança**. Empresa precisa dos dois.\n- Liderança Situacional: 4 estilos para 4 níveis de maturidade. Um estilo só = **75% de erro**.\n- Goleman: IE responde por **67%** das competências de liderança superior.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Gestão = complexidade. Liderança = mudança. Empresa precisa dos dois.",
            "Liderança Situacional: 4 estilos para 4 níveis de maturidade. Um estilo só = 75% de erro.",
            "Goleman: IE responde por 67% das competências de liderança superior."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Formação de Equipes e Ferramentas de Gestão",
        "description": "Tuckman, Feedback SBI, Delegação e o custo de não delegar",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Equipe não nasce — se **forma** em 5 fases. Feedback SBI (Situação-Comportamento-Impacto) é a ferramenta #1 de desenvolvimento. E delegar é aceitar 80% hoje para ter 100% amanhã.\n\n**Principais Insights:**\n\n- Tuckman: **70%** das equipes ficam presas em Storming. Líder que evita conflito impede amadurecimento.\n- Feedback SBI: Situação específica + Comportamento observável + Impacto **real**.\n- Regra de delegação: se alguém faz 80% tão bem quanto você, **delegue**.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Comportamento-Impacto) é a ferramenta #1 de desenvolvimento. E delegar é aceitar 80% hoje para ter 100% amanhã.",
            "Tuckman: 70% das equipes ficam presas em Storming. Líder que evita conflito impede amadurecimento.",
            "Feedback SBI: Situação específica + Comportamento observável + Impacto real.",
            "Regra de delegação: se alguém faz 80% tão bem quanto você, delegue."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Conflitos, Motivação e Segurança Psicológica",
        "description": "Como transformar tensão em resultado e construir equipes que inovam",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Conflito bem gerenciado **fortalece**. Motivação real vem de autonomia, maestria e propósito — não de dinheiro. 1:1 é a ferramenta mais subutilizada. E segurança psicológica é o fator #1 de alta performance.\n\n**Principais Insights:**\n\n- Thomas-Kilmann: **5 abordagens** de conflito. Nenhuma é sempre certa — o contexto define.\n- Daniel Pink (2009): Autonomia + Maestria + Propósito > dinheiro para motivação em trabalho **complexo**.\n- Google Aristotle (180 equipes): segurança psicológica = fator **#1** de alta performance.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Thomas-Kilmann: 5 abordagens de conflito. Nenhuma é sempre certa — o contexto define.",
            "Daniel Pink (2009): Autonomia + Maestria + Propósito > dinheiro para motivação em trabalho complexo.",
            "Google Aristotle (180 equipes): segurança psicológica = fator #1 de alta performance."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Comunicação Estratégica na Liderança",
        "description": "CNV, Feedforward, Candura Radical e a matemática dos canais",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Comunicação estratégica não é sobre falar melhor — é sobre **criar significado compartilhado**. CNV elimina a reatividade. Feedforward constrói futuro. Candura Radical combina cuidado com verdade.\n\n**Principais Insights:**\n\n- CNV: Observação + Sentimento + Necessidade + Pedido. Elimina **julgamento** e foca na solução.\n- Candura Radical: cuidado + desafio = feedback que **transforma** sem destruir.\n- Equipe de 15 = **105 canais** de comunicação. Rituais e simplicidade são a resposta.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "CNV: Observação + Sentimento + Necessidade + Pedido. Elimina julgamento e foca na solução.",
            "Candura Radical: cuidado + desafio = feedback que transforma sem destruir.",
            "Equipe de 15 = 105 canais de comunicação. Rituais e simplicidade são a resposta."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "5: Disfunções, OKRs e Desenvolvimento de Líderes",
        "description": "Lencioni, Nine Box, Jim Collins e como construir um pipeline de liderança",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Equipes de alta performance são **construídas**, não encontradas. Confiança → Conflito produtivo → Comprometimento → Responsabilidade → Resultados. OKRs alinham estratégia. Nine Box identifica quem desenvolver. Nível 5 define como liderar.\n\n**Principais Insights:**\n\n- Lencioni: tudo começa pela confiança. Sem vulnerabilidade, há **zero** aprendizado organizacional.\n- OKRs: Objetivo inspirador + KRs mensuráveis. Taxa ideal de atingimento: **70%** — não 100%.\n- Jim Collins: Liderança Nível 5 = humildade pessoal + vontade **feroz**. Oposto do CEO carismático.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Lencioni: tudo começa pela confiança. Sem vulnerabilidade, há zero aprendizado organizacional.",
            "OKRs: Objetivo inspirador + KRs mensuráveis. Taxa ideal de atingimento: 70% — não 100%.",
            "Jim Collins: Liderança Nível 5 = humildade pessoal + vontade feroz. Oposto do CEO carismático."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "6: Liderança Digital, Contexto Lusófono e ESG",
        "description": "VUCA/BANI, equipes remotas, Hofstede, DE&I e liderança sustentável",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Liderança no século XXI é **contextual**: ágil em VUCA, clara no remoto, relacional no contexto lusófono, inclusiva na diversidade e ética no ESG. O líder que integra tudo isso não apenas gera resultados — transforma a organização em ecossistema de crescimento.\n\n**Principais Insights:**\n\n- VUCA/BANI: liderança autocrática falha. Liderança **distribuída** — autoridade vai para quem está perto da informação.\n- Contexto lusófono: equilibrar **calor humano** com objetividade. Frieza é percebida como autoritarismo.\n- ESG: cultura = reflexo dos líderes. **Coerência** entre discurso e prática é a única liderança que dura.",
            "quote": "",
            "studyCase": null,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "VUCA/BANI: liderança autocrática falha. Liderança distribuída — autoridade vai para quem está perto da informação.",
            "Contexto lusófono: equilibrar calor humano com objetividade. Frieza é percebida como autoritarismo.",
            "ESG: cultura = reflexo dos líderes. Coerência entre discurso e prática é a única liderança que dura.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M4-S1",
    "code": "M4-0",
    "title": "Filosofia",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Pensamento Crítico e Lógica nos Negócios",
        "description": "Por que filosofia importa — falácias, vieses e como pensar com rigor",
        "subsections": [
          {
            "title": "Falácia do Apelo à Autoridade (Erro lógico #1 em negócios)",
            "content": "\"O CEO da empresa X disse que funciona, logo funciona.\" Autoridade não prova verdade. Até especialistas erram. A pergunta certa: quais são os **dados**, independente de quem falou?",
            "quote": "Estudo de Caso — WeWork (2019):",
            "studyCase": {
              "title": "WeWork (2019)",
              "body": "Adam Neumann (CEO) convenceu investidores com carisma, não dados. Valuation de US$ 47 bilhões caiu para US$ 9 bilhões quando os números foram analisados. Autoridade sem dado = bolha."
            },
            "deepDive": "Falácia de autoridade é o viés mais caro do mundo corporativo. Dados vencem cargo."
          },
          {
            "title": "Correlação ≠ Causalidade (Erro lógico #2 em dados)",
            "content": "\"Vendas subiram depois da campanha, logo a campanha causou a subida.\" Pode ser coincidência, sazonalidade ou outro fator. Correlação mostra **associação**, não causa.",
            "quote": "Estudo de Caso — Marketing digital (2024):",
            "studyCase": {
              "title": "Marketing digital (2024)",
              "body": "Empresa investiu R$ 500k em branding. Vendas subiram 20%. Mas o mercado inteiro subiu 18%. O branding contribuiu 2%, não 20%. Sem grupo controle, atribuição é chute."
            },
            "deepDive": "Para provar causalidade: grupo controle, teste A/B ou análise contrafactual. Sem isso, é opinião."
          },
          {
            "title": "Viés de Confirmação (O viés mais perigoso)",
            "content": "Buscar apenas informações que confirmam o que já acredita. Ignorar ou desqualificar evidências **contrárias**. Todo ser humano tem. Gestores disciplinados combatem ativamente.",
            "quote": "Estudo de Caso — Kodak (1997):",
            "studyCase": {
              "title": "Kodak (1997)",
              "body": "Diretoria tinha dados mostrando crescimento de câmeras digitais. Mas buscava relatórios que confirmassem que filme era superior. Viés de confirmação custou 130 anos de história."
            },
            "deepDive": "Antídoto: designar um \"Red Team\" que ataque a ideia dominante. CIA e militares usam. Empresas deveriam."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Pensamento crítico é a competência **#1** do século XXI (WEF 2023). Falácias e vieses custam bilhões — WeWork ($47B→$9B), Kodak (130 anos). O antídoto: dados, método e humildade intelectual.\n\n**Principais Insights:**\n\n- WEF 2023: pensamento crítico é a competência mais valorizada por CEOs — acima de **liderança**.\n- WeWork: falácia de autoridade custou **US$ 38 bilhões** em valuation.\n- Viés de confirmação: designar Red Team que ataque a ideia dominante. Se **sobrevive**, é robusta.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "WEF 2023: pensamento crítico é a competência mais valorizada por CEOs — acima de liderança.",
            "WeWork: falácia de autoridade custou US$ 38 bilhões em valuation.",
            "Viés de confirmação: designar Red Team que ataque a ideia dominante. Se sobrevive, é robusta."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Ética Empresarial e Epistemologia",
        "description": "4 frameworks éticos + como separar conhecimento válido de achismo",
        "subsections": [
          {
            "title": "Utilitarismo (Consequências)",
            "content": "Jeremy Bentham e John Stuart Mill. A ação correta é a que produz o **maior bem para o maior número**. Foco nas consequências, não nas intenções.",
            "quote": "Estudo de Caso — Ford Pinto (1978):",
            "studyCase": {
              "title": "Ford Pinto (1978)",
              "body": "Ford calculou: consertar tanque = US$ 137M. Indenizações por mortes = US$ 49M. Decisão utilitarista: não consertar. Resultado: escândalo, destruição de reputação, lição sobre os limites do cálculo."
            },
            "deepDive": "Utilitarismo funciona para decisões de escala (política pública, alocação de recursos). Falha quando reduz vidas a números."
          },
          {
            "title": "Deontologia (Kant) (Dever e regras)",
            "content": "Immanuel Kant: a ação é ética se pode ser **universalizada** sem contradição. \"Mentir é errado\" — mesmo que a verdade cause prejuízo. O dever moral importa mais que a consequência.",
            "quote": "Estudo de Caso — Johnson & Johnson (1982):",
            "studyCase": {
              "title": "Johnson & Johnson (1982)",
              "body": "Tylenol envenenado matou 7 pessoas. J&J recolheu 31 milhões de frascos, custando US$ 100M. Decisão kantiana: \"se fosse nosso filho?\" Resultado: confiança reconstruída, marca fortalecida."
            },
            "deepDive": "Kant funciona quando a ação pode ser universalizada: \"se todos fizessem isso, o mundo seria melhor?\""
          },
          {
            "title": "Ética das Virtudes (Aristóteles) (Caráter)",
            "content": "Aristóteles: a ação ética vem do **caráter** do agente, não de regras ou cálculos. Cultive virtudes (coragem, temperança, justiça, prudência) e as decisões éticas seguem naturalmente.",
            "quote": "Estudo de Caso — Patagonia (2022):",
            "studyCase": {
              "title": "Patagonia (2022)",
              "body": "Yvon Chouinard doou a empresa inteira (US$ 3 bilhões) para combate às mudanças climáticas. Não por cálculo nem por regra — por caráter. \"Earth is now our only shareholder.\""
            },
            "deepDive": "Virtude não se ensina em PowerPoint — se cultiva ao longo do tempo. É a ética mais difícil e mais duradoura."
          },
          {
            "title": "Ética do Cuidado (Relacionamentos)",
            "content": "Carol Gilligan (Harvard, 1982): ética baseada em **relacionamentos e responsabilidade** com os outros. A pergunta não é \"o que é justo?\" mas \"quem será afetado e como posso cuidar?\"\n\n#### 🏷️ Epistemologia — como sabemos o que sabemos?\n\nEpistemologia estuda o conhecimento: o que é verdade? Como justificar uma crença? A maioria das decisões empresariais é baseada em suposições não verificadas — \"o mercado quer isso\", \"nosso diferencial é qualidade\", \"o problema é preço\". Epistemologia ensina a perguntar: \"como eu **sei** isso? Qual a evidência?\"",
            "quote": "Estudo de Caso — Natura (2010):",
            "studyCase": {
              "title": "Natura (2010)",
              "body": "Relação com comunidades amazônicas: não como fornecedores descartáveis mas como parceiros de longo prazo. 2.000+ famílias com renda garantida. Cuidado como modelo de negócio."
            },
            "deepDive": "Ética do cuidado é a base da sustentabilidade real: tratar stakeholders como pessoas, não como variáveis."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Não existe framework ético \"melhor\". Utilitarismo para **escala**, Kant para **princípios**, Virtude para **caráter**, Cuidado para **relações**. Usar os 4 juntos é a abordagem mais robusta.\n\n**Principais Insights:**\n\n- Ford Pinto: utilitarismo puro reduz vidas a números. Consequências importam mas não são **tudo**.\n- J&J Tylenol: decisão kantiana custou $100M mas salvou a marca. Princípio > **cálculo** de curto prazo.\n- Popper: se não pode ser **falsificado**, não é conhecimento — é crença.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Ford Pinto: utilitarismo puro reduz vidas a números. Consequências importam mas não são tudo.",
            "J&J Tylenol: decisão kantiana custou $100M mas salvou a marca. Princípio > cálculo de curto prazo.",
            "Popper: se não pode ser falsificado, não é conhecimento — é crença."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Filosofia Política, Ciência e Propósito",
        "description": "Smith, Marx, Rawls — e por que existencialismo importa para gestores",
        "subsections": [
          {
            "title": "Adam Smith — Mão Invisível (Liberalismo econômico)",
            "content": "\"A Riqueza das Nações\" (1776). O interesse próprio, guiado pela competição, leva ao **bem coletivo**. A \"mão invisível\" do mercado aloca recursos melhor que o Estado.",
            "quote": "Estudo de Caso — Silicon Valley (2024):",
            "studyCase": {
              "title": "Silicon Valley (2024)",
              "body": "Modelo de startups: competição feroz, auto-interesse dos fundadores, mas o resultado agrega valor para milhões de usuários. Smith aplicado ao extremo."
            },
            "deepDive": "Smith não era anti-Estado. Defendia que o Estado garantisse regras do jogo — educação, justiça, defesa. Laissez-faire puro não é Smith."
          },
          {
            "title": "Karl Marx — Crítica ao Capital (Conflito de classes)",
            "content": "\"O Capital\" (1867). O capitalismo gera **desigualdade** estrutural. O trabalhador produz mais valor do que recebe (mais-valia). A contradição entre capital e trabalho é insolúvel dentro do sistema.",
            "quote": "Estudo de Caso — Gig Economy (2024):",
            "studyCase": {
              "title": "Gig Economy (2024)",
              "body": "Entregadores de iFood/Uber: produzem bilhões em GMV, recebem salário mínimo. Marx diria: mais-valia digital. O debate sobre regulação da gig economy é marxismo aplicado."
            },
            "deepDive": "Não é preciso ser marxista para reconhecer que desigualdade extrema desestabiliza mercados e sociedades."
          },
          {
            "title": "John Rawls — Véu da Ignorância (Justiça como equidade)",
            "content": "\"Uma Teoria da Justiça\" (1971). Se você não soubesse qual posição ocuparia na sociedade (**véu da ignorância**), que regras criaria? As regras justas são as que protegem os mais vulneráveis.\n\n#### 🏷️ Existencialismo e propósito\n\nO existencialismo coloca liberdade e responsabilidade individual no centro. Sartre: \"estamos condenados a ser **livres**\" — cada escolha define quem somos. Para negócios: por que essa empresa existe? Se a resposta é apenas \"lucro\", funcionários, clientes e investidores cada vez mais procuram outra empresa com resposta **melhor**.",
            "quote": "Estudo de Caso — Políticas de diversidade (2024):",
            "studyCase": {
              "title": "Políticas de diversidade (2024)",
              "body": "Rawls fundamenta cotas e programas de inclusão: se você não soubesse se nasceria homem ou mulher, negro ou branco, rico ou pobre — apoiaria igualdade de oportunidades."
            },
            "deepDive": "Rawls é a base filosófica do ESG social: criar regras que protejam os mais vulneráveis, não os mais poderosos."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Smith, Marx e Rawls não são história — são as lentes pelas quais **toda** decisão econômica e política é debatida hoje. E o existencialismo lembra: sem propósito, a empresa é máquina de lucro sem alma.\n\n**Principais Insights:**\n\n- Smith: mercado livre cria riqueza. Mas Smith também defendia que o Estado garantisse **regras do jogo**.\n- Marx: desigualdade extrema **desestabiliza**. Gig economy é o debate marxista do século XXI.\n- Frankl: empresas com propósito têm **3x** mais engajamento. Propósito não é marketing — é decisão.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Smith: mercado livre cria riqueza. Mas Smith também defendia que o Estado garantisse regras do jogo.",
            "Marx: desigualdade extrema desestabiliza. Gig economy é o debate marxista do século XXI.",
            "Frankl: empresas com propósito têm 3x mais engajamento. Propósito não é marketing — é decisão."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Filosofia Oriental, Linguagem, Estética e Tecnologia",
        "description": "Zen e liderança, poder das palavras, beleza como diferencial e ética da IA",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Filosofia oriental ensina **equilíbrio**. Linguagem cria realidade. Estética diferencia. E a tecnologia nunca é neutra — quem programa a IA programa os **valores** que ela reproduz.\n\n**Principais Insights:**\n\n- Lao Tzu: o melhor líder é aquele que o povo mal sabe que **existe**. Liderar é criar condições.\n- Wittgenstein: \"limites da linguagem = limites do **mundo**.\" Renomear muda a percepção.\n- Heidegger: tecnologia transforma tudo em recurso. A pergunta não é \"pode?\" — é \"**deve**?\"",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Lao Tzu: o melhor líder é aquele que o povo mal sabe que existe. Liderar é criar condições.",
            "Wittgenstein: \"limites da linguagem = limites do mundo.\" Renomear muda a percepção.",
            "Heidegger: tecnologia transforma tudo em recurso. A pergunta não é \"pode?\" — é \"deve?\"",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M4-S2",
    "code": "M4-1",
    "title": "Calculo Aplicado a Negocios",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Funções, Derivadas e Otimização",
        "description": "A matemática da mudança — como derivadas encontram o ponto ótimo de lucro",
        "subsections": [
          {
            "title": "Receita Marginal (Derivada da receita)",
            "content": "Quanto a receita aumenta ao vender **uma unidade a mais**. Enquanto receita marginal > custo marginal, vale produzir mais. Quando se igualam, é o ponto ótimo.",
            "quote": "Estudo de Caso — Netflix (2023):",
            "studyCase": {
              "title": "Netflix (2023)",
              "body": "Cada novo assinante tem receita marginal de ~R$ 40/mês. Custo marginal de atender 1 a mais é quase zero (streaming). Por isso o modelo escala: marginal positiva em cada unidade."
            },
            "deepDive": "Negócios digitais têm custo marginal tendendo a zero — cada unidade adicional é quase lucro puro."
          },
          {
            "title": "Custo Marginal (Derivada do custo)",
            "content": "Quanto custa produzir **uma unidade a mais**. Em fábricas: cresce com capacidade (hora extra, desgaste). Em SaaS: quase zero. Entender custo marginal define precificação.\n\n#### 🏷️ Elasticidade — como preço afeta demanda\n\nElasticidade-preço mede a sensibilidade da demanda ao preço. Se |E| > 1 = **elástico** (sobe preço, demanda cai muito — ex: pizza delivery). Se |E| < 1 = **inelástico** (sobe preço, demanda mal muda — ex: remédio, combustível). Entender elasticidade é a diferença entre precificar certo e perder clientes.",
            "quote": "Estudo de Caso — Ambev (2023):",
            "studyCase": {
              "title": "Ambev (2023)",
              "body": "Produzir 1 cerveja a mais custa R$ 0,80 (matéria-prima + energia). Vende por R$ 3,50. Margem por unidade: R$ 2,70. Por isso volume é estratégia — cada unidade gera lucro."
            },
            "deepDive": "Ponto ótimo de produção: onde Receita Marginal = Custo Marginal. Antes disso, produzir mais. Depois, parar."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Derivadas encontram o **ponto ótimo**. Receita Marginal = Custo Marginal define quando parar de produzir. Elasticidade define como precificar. Cálculo não é teoria — é a linguagem das decisões de negócio.\n\n**Principais Insights:**\n\n- Ponto ótimo: onde Receita Marginal = Custo Marginal. Antes: produzir mais. Depois: **parar**.\n- Netflix: custo marginal ~R$ 0 por assinante. Por isso escala = **lucro puro**.\n- Elasticidade: pizza = elástico (alternativas). Insulina = inelástico (sem **alternativa**).",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Ponto ótimo: onde Receita Marginal = Custo Marginal. Antes: produzir mais. Depois: parar.",
            "Netflix: custo marginal ~R$ 0 por assinante. Por isso escala = lucro puro.",
            "Elasticidade: pizza = elástico (alternativas). Insulina = inelástico (sem alternativa)."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Investimentos e Valor do Dinheiro",
        "description": "Integrais, juros compostos, VPL e TIR — decidir onde colocar dinheiro",
        "subsections": [
          {
            "title": "VPL na Prática (Decisão de investir)",
            "content": "Nova linha de produção: investimento R$ 2M. Fluxos de R$ 600k/ano por 5 anos. Taxa: 12%. VPL = **R$ 163k** positivo. Investir — gera valor acima do custo de capital.",
            "quote": "Estudo de Caso — Expansão industrial (2024):",
            "studyCase": {
              "title": "Expansão industrial (2024)",
              "body": "Empresa avalia 2 projetos: Projeto A (VPL R$ 300k, TIR 18%) vs Projeto B (VPL R$ 150k, TIR 25%). Escolha: se mutuamente exclusivos, priorize VPL (A). Se independentes, faça ambos."
            },
            "deepDive": "VPL > 0 não garante sucesso — garante que SE os fluxos se confirmarem, o projeto gera valor."
          },
          {
            "title": "Juros Compostos na Prática (O poder do tempo)",
            "content": "R$ 1.000/mês a 1% a.m. por 20 anos: aporte R$ 240k. Resultado: **R$ 989k**. Os juros geraram R$ 749k — mais de 3x o que você colocou. Tempo é o ingrediente secreto.",
            "quote": "Estudo de Caso — Investimento pessoal (2024):",
            "studyCase": {
              "title": "Investimento pessoal (2024)",
              "body": "Warren Buffett começou a investir aos 11 anos. Aos 30, tinha US$ 1M. Aos 60, US$ 3.8B. Aos 90, US$ 100B+. 99% da riqueza veio depois dos 60 — juros compostos + tempo."
            },
            "deepDive": "A variável mais importante dos juros compostos não é a taxa — é o tempo. Comece cedo."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Integrais acumulam. Juros compostos multiplicam. VPL decide se vale. TIR compara retornos. **Tempo** é a variável mais poderosa — Buffett provou.\n\n**Principais Insights:**\n\n- VPL > 0 = investir. Quando VPL e TIR divergem, priorize **VPL**.\n- Juros compostos: R$ 1.000/mês × 20 anos × 1% a.m. = **R$ 989k** (aporte: R$ 240k).\n- Buffett: 99% da riqueza veio depois dos 60. O ingrediente secreto é **tempo**.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "VPL > 0 = investir. Quando VPL e TIR divergem, priorize VPL.",
            "Juros compostos: R$ 1.000/mês × 20 anos × 1% a.m. = R$ 989k (aporte: R$ 240k).",
            "Buffett: 99% da riqueza veio depois dos 60. O ingrediente secreto é tempo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Break-Even, Depreciação e Aplicações",
        "description": "Quando a empresa para de perder dinheiro — e o custo invisível dos ativos",
        "subsections": [
          {
            "title": "Break-Even de Restaurante (Exemplo prático)",
            "content": "Custo fixo: R$ 30.000/mês (aluguel + salários). Ticket médio: R$ 45. Custo variável por refeição: R$ 18. Margem de contribuição: R$ 27. Break-even: 30.000 ÷ 27 = **1.111 refeições/mês** = ~37/dia.",
            "quote": "Estudo de Caso — Restaurante médio SP (2024):",
            "studyCase": {
              "title": "Restaurante médio SP (2024)",
              "body": "Se atende 50 refeições/dia, lucra (50-37) × R$ 27 × 30 = R$ 10.530/mês. Se atende 30, prejuízo de (37-30) × R$ 27 × 30 = -R$ 5.670/mês."
            },
            "deepDive": "Todo restaurante que não sabe seu break-even está operando no escuro. É o número #1 do negócio."
          },
          {
            "title": "Break-Even de SaaS (Modelo digital)",
            "content": "Custo fixo: R$ 200k/mês (equipe + infra). Assinatura: R$ 99/mês. Custo variável por cliente: R$ 5/mês. Margem: R$ 94. Break-even: **2.128 assinantes**.\n\n#### 🏷️ Depreciação e amortização\n\nDepreciação é o custo invisível dos ativos. Uma máquina de R$ 500k que dura 10 anos deprecia R$ 50k/ano. Não sai dinheiro do caixa — mas reduz o valor do ativo e o **lucro contábil**. Gestores que ignoram depreciação acham que o negócio é mais lucrativo do que realmente é.",
            "quote": "Estudo de Caso — Startup SaaS BR (2024):",
            "studyCase": {
              "title": "Startup SaaS BR (2024)",
              "body": "Com 3.000 assinantes: lucro = (3.000 - 2.128) × R$ 94 = R$ 81.968/mês. A alavancagem do SaaS: depois do break-even, cada cliente é quase lucro puro (custo marginal baixíssimo)."
            },
            "deepDive": "SaaS tem custo variável baixíssimo. Depois do break-even, a escala é brutal — margem cresce com volume."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Break-even é o número que todo gestor deve saber de cor. Depreciação é o custo que ninguém vê mas que afeta o **lucro real**. E a margem de contribuição define se vale a pena vender mais.\n\n**Principais Insights:**\n\n- Restaurante que não sabe break-even opera no **escuro**. É o número #1.\n- SaaS: custo marginal baixíssimo. Depois do break-even, escala = **lucro brutal**.\n- Depreciação: não sai dinheiro do caixa mas reduz lucro. Por isso existe **EBITDA**.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "even é o número que todo gestor deve saber de cor. Depreciação é o custo que ninguém vê mas que afeta o lucro real. E a margem de contribuição define se vale a pena vender mais.",
            "Restaurante que não sabe break-even opera no escuro. É o número #1.",
            "SaaS: custo marginal baixíssimo. Depois do break-even, escala = lucro brutal.",
            "Depreciação: não sai dinheiro do caixa mas reduz lucro. Por isso existe EBITDA.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M4-S3",
    "code": "M4-2",
    "title": "Analise Estatistica",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Fundamentos de Estatística",
        "description": "Média, dispersão e probabilidade — a base de toda decisão por dados",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Média mente quando tem outlier — use **mediana**. Desvio padrão mede consistência. Distribuição normal: 95% dos dados estão a 2 desvios da média. Fora disso, é **anomalia**.\n\n**Principais Insights:**\n\n- Mediana salarial é mais honesta que média — poucos bilionários **distorcem** a média.\n- Desvio padrão pequeno = dados concentrados = processo **consistente**.\n- Distribuição Normal: **68-95-99.7%** a 1-2-3 desvios padrão. Regra de ouro da estatística.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Mediana salarial é mais honesta que média — poucos bilionários distorcem a média.",
            "Desvio padrão pequeno = dados concentrados = processo consistente.",
            "Distribuição Normal: 68-95-99.7% a 1-2-3 desvios padrão. Regra de ouro da estatística."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Regressão, Hipóteses e Teste A/B",
        "description": "Prever, testar e provar — a estatística que separa dado de achismo",
        "subsections": [
          {
            "title": "Regressão Linear (Previsão)",
            "content": "Encontra a relação entre variáveis: \"quanto mais invisto em marketing, mais vendo?\" A reta de regressão prevê Y a partir de X. O **R²** mede quanto da variação Y é explicada por X (0 a 1).",
            "quote": "Estudo de Caso — E-commerce (2024):",
            "studyCase": {
              "title": "E-commerce (2024)",
              "body": "Regressão: investimento em Google Ads × vendas. R² = 0.82 — 82% das vendas são explicadas pelo investimento em ads. Os outros 18% são sazonalidade, orgânico, marca."
            },
            "deepDive": "R² alto não prova causalidade — prova correlação. Chuva e vendas de guarda-chuva correlacionam, mas chuva causa vendas (não o contrário)."
          },
          {
            "title": "Teste de Hipóteses (Prova estatística)",
            "content": "Pergunta: \"o resultado é real ou pode ser acaso?\" Hipótese nula (H0): não há efeito. Hipótese alternativa (H1): há efeito. Se p-valor < 0.05, rejeitamos H0 — resultado é **estatisticamente significativo**.",
            "quote": "Estudo de Caso — Farmacêutica (2024):",
            "studyCase": {
              "title": "Farmacêutica (2024)",
              "body": "Novo remédio reduz colesterol em 15% vs placebo. p-valor = 0.003. Como p < 0.05, a diferença é real — não acaso. Se p-valor fosse 0.12, a diferença poderia ser coincidência."
            },
            "deepDive": "p-valor NÃO mede o tamanho do efeito — mede a probabilidade de o resultado ser acaso. Efeito pequeno pode ser significativo com amostra grande."
          },
          {
            "title": "Teste A/B (Método científico do marketing)",
            "content": "Duas versões (A e B), mesmas condições, público aleatório. Mede qual performa melhor com **significância estatística**. É o padrão ouro de decisão em marketing digital.\n\nCorrelação ≠ Causalidade. Regressão mostra associação, não causa. Para provar causa: **experimento controlado** (teste A/B) ou análise contrafactual. Sem isso, é inferência — não prova.",
            "quote": "Estudo de Caso — Booking.com (2023):",
            "studyCase": {
              "title": "Booking.com (2023)",
              "body": "Roda mais de 1.000 testes A/B simultâneos. Cada botão, cor, texto, posição é testado. Resultado: conversão 25% maior que concorrentes que decidem por opinião."
            },
            "deepDive": "Teste A/B resolve o debate \"eu acho que X é melhor\" com dados. Opinião do CEO ≠ dado."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Regressão **prevê**. Teste de hipótese **prova**. Teste A/B **compara**. Sem essas 3 ferramentas, decisão por dados é ilusão.\n\n**Principais Insights:**\n\n- R² = quanto da variação é explicada. R² de 0.82 = **82%** explicado.\n- p < 0.05 = resultado significativo. Mas p-valor não mede tamanho do **efeito**.\n- Booking.com: 1.000+ testes A/B simultâneos. Opinião do CEO ≠ **dado**.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "R² = quanto da variação é explicada. R² de 0.82 = 82% explicado.",
            "p < 0.05 = resultado significativo. Mas p-valor não mede tamanho do efeito.",
            "Booking.com: 1.000+ testes A/B simultâneos. Opinião do CEO ≠ dado."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: KPIs, Cohort e Data Storytelling",
        "description": "As métricas que importam e como transformar números em narrativa",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "KPIs sem interpretação são números mortos. Cohort revela **tendências** que a média esconde. Data storytelling transforma dado em ação: contexto → dado → visual → insight → recomendação.\n\n**Principais Insights:**\n\n- LTV/CAC > 3 = negócio saudável. Abaixo de 1 = cada cliente dá **prejuízo**.\n- Cohort: não é \"30% cancelaram\". É \"clientes de janeiro cancelaram 15%, março **25%**.\" A diferença é o insight.\n- Data storytelling: 1 gráfico + 1 insight + 1 recomendação > 30 gráficos sem **contexto**.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "LTV/CAC > 3 = negócio saudável. Abaixo de 1 = cada cliente dá prejuízo.",
            "Cohort: não é \"30% cancelaram\". É \"clientes de janeiro cancelaram 15%, março 25%.\" A diferença é o insight.",
            "Data storytelling: 1 gráfico + 1 insight + 1 recomendação > 30 gráficos sem contexto."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Análise Preditiva e Ferramentas",
        "description": "Machine learning para negócios e Excel como kit de sobrevivência",
        "subsections": [
          {
            "title": "ML de Churn (Classificação)",
            "content": "Modelo prevê quais clientes vão cancelar nos próximos 30 dias. Variáveis: frequência de uso, reclamações, tempo desde última compra, **padrão de pagamento**. Permite ação preventiva.",
            "quote": "Estudo de Caso — Spotify (2023):",
            "studyCase": {
              "title": "Spotify (2023)",
              "body": "Modelo de churn identifica usuários em risco 14 dias antes do cancelamento. Dispara playlist personalizada + oferta de desconto. Reduziu churn em 25%."
            },
            "deepDive": "ML de churn não substitui bom produto — complementa. Se o produto é ruim, prever cancelamento não adianta."
          },
          {
            "title": "ML de Recomendação (Personalização)",
            "content": "Modelo sugere produtos/conteúdo baseado em comportamento: \"quem comprou X também comprou Y.\" Amazon: **35%** das vendas vêm de recomendações algorítmicas.\n\n#### 🏷️ Excel/Sheets — o kit de sobrevivência\n\nApesar do hype de IA e ML, a ferramenta mais usada para análise de dados no mundo ainda é o **Excel/Google Sheets**. Dominar o básico resolve 80% dos problemas analíticos de uma PME.",
            "quote": "Estudo de Caso — Netflix (2023):",
            "studyCase": {
              "title": "Netflix (2023)",
              "body": "O algoritmo de recomendação economiza US$ 1 bilhão/ano em retenção. Sem recomendação personalizada, usuários não encontram o que assistir e cancelam."
            },
            "deepDive": "Recomendação é o maior caso de ROI de ML no mundo. Personalização em escala = vantagem competitiva."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "ML não é mágica — é **estatística automatizada**. Regressão prevê números, classificação categoriza, clustering agrupa. E o Excel resolve 80% dos problemas analíticos de uma PME.\n\n**Principais Insights:**\n\n- Spotify: ML de churn prevê cancelamento **14 dias** antes. Ação preventiva reduz 25%.\n- Netflix: recomendação economiza **$1B/ano** em retenção. 80% do conteúdo assistido via algoritmo.\n- Excel: PROCV + Tabela Dinâmica + SE resolvem **80%** dos problemas analíticos de PME.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Spotify: ML de churn prevê cancelamento 14 dias antes. Ação preventiva reduz 25%.",
            "Netflix: recomendação economiza $1B/ano em retenção. 80% do conteúdo assistido via algoritmo.",
            "Excel: PROCV + Tabela Dinâmica + SE resolvem 80% dos problemas analíticos de PME.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M5-S1",
    "code": "M5-0",
    "title": "Leitura e Escrita Academica",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Escrever com Clareza",
        "description": "Da clareza de pensamento à clareza de texto — como gestores comunicam para quem decide",
        "subsections": [
          {
            "title": "Nível 1 — Texto Confuso (O jeito errado)",
            "content": "\"Analisamos o mercado nos últimos 6 meses. Observamos que a demanda está crescendo. Nossos concorrentes estão investindo. A oportunidade é grande. **Por isso, recomendamos expandir.**\" — Só chegou na recomendação na última frase. O CEO já parou de ler na segunda.",
            "quote": "Estudo de Caso — Erro comum em relatórios (2024):",
            "studyCase": {
              "title": "Erro comum em relatórios (2024)",
              "body": "Emails confusos geram retrabalho — cada email mal escrito custa em média 25 minutos de follow-up. Relatórios sem estrutura não são lidos: se o CEO não entende na primeira página, ele para de ler."
            },
            "deepDive": "O paradoxo: quanto mais longo o texto, menos ele comunica. Prolixidade não é profundidade — é falta de disciplina para cortar."
          },
          {
            "title": "Nível 2 — Texto Estruturado (O jeito melhorado)",
            "content": "Contexto → Problema → Análise → Recomendação. A estrutura IMRAD (Introdução → Metodologia → Resultados → Análise → Conclusão) garante que qualquer leitor encontre o que precisa. Funciona para **relatórios e artigos** — mas ainda não é o padrão executivo ideal.",
            "quote": "Estudo de Caso — Escrita acadêmica e técnica (2024):",
            "studyCase": {
              "title": "Escrita acadêmica e técnica (2024)",
              "body": "A estrutura IMRAD é universal em artigos científicos e white papers. Permite replicabilidade: outro leitor entende o método e pode validar os resultados. É o padrão da escrita técnica séria."
            },
            "deepDive": "Para leitura eficiente de artigos: leia Abstract → Conclusão → Figuras → Metodologia → Introdução. Nunca na ordem linear."
          },
          {
            "title": "Nível 3 — Pirâmide de Minto (O padrão McKinsey)",
            "content": "\"Recomendamos investir **R$ 2M** no Nordeste até Q3 — retorno projetado de **R$ 7,5M** em 3 anos. Três razões: (1) mercado cresceu 22%/ano — 3x a média nacional; (2) zero concorrente premium na região — janela de 18 meses; (3) piloto em Recife validou o modelo em 6 meses.\" Conclusão na primeira frase. Pronto.\n\nFormato errado = mensagem ignorada. Um email de 3 páginas não é lido. Um memo sobre assunto complexo não convence. Escolha o formato que respeita o tempo do leitor: **memo** para decisões rápidas (1 página), executive summary para resumir relatório longo (2-3 páginas), deck para pitch (10-15 slides), email estratégico para ação imediata (5 linhas).",
            "quote": "Estudo de Caso — Barbara Minto / McKinsey (1973):",
            "studyCase": {
              "title": "Barbara Minto / McKinsey (1973)",
              "body": "Barbara Minto desenvolveu a estrutura enquanto era consultora da McKinsey. Hoje é padrão em todas as grandes consultorias do mundo. A regra: o leitor deve entender sua posição antes de ler qualquer evidência."
            },
            "deepDive": "A Pirâmide de Minto inverte a lógica aristotélica: você não constrói o argumento para chegar à conclusão. Você parte da conclusão e a sustenta."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "A escrita não é sobre mostrar o quanto você sabe — é sobre **fazer o leitor entender** o que você quer que ele faça. A Pirâmide de Minto força essa clareza: se você não consegue escrever sua conclusão em uma frase, você ainda não sabe o que quer.\n\n**Principais Insights:**\n\n- Clareza de texto é clareza de pensamento: quem não consegue escrever a tese em uma frase não sabe o que está argumentando.\n- A Pirâmide de Minto inverte a lógica: **conclusão primeiro**, argumentos depois. Isso respeita o tempo do leitor.\n- Formato importa: memo (1 página), executive summary (2-3 páginas), deck (10-15 slides), email (5 linhas) — cada situação tem seu **veículo**.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Clareza de texto é clareza de pensamento: quem não consegue escrever a tese em uma frase não sabe o que está argumentando.",
            "A Pirâmide de Minto inverte a lógica: conclusão primeiro, argumentos depois. Isso respeita o tempo do leitor.",
            "Formato importa: memo (1 página), executive summary (2-3 páginas), deck (10-15 slides), email (5 linhas) — cada situação tem seu veículo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Argumentar com Rigor",
        "description": "Do Modelo Toulmin aos 10 erros que destroem credibilidade — como construir teses que convencem",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Um argumento sem dados é opinião. Um argumento com dados mas sem justificativa é correlação. Um argumento Toulmin completo — com tese, dados, justificativa, qualificador e contra-argumento — é a **base da influência** em qualquer organização.\n\n**Principais Insights:**\n\n- A tese em uma frase é o teste mais simples: se não consegue escrever, não sabe o que está argumentando.\n- Antecipar o contra-argumento não enfraquece sua posição — ela **fortalece**, porque mostra que você considerou o outro lado.\n- Dados vagos são piores que nenhum dado: \"bastante\", \"muito\", \"sempre\" destroem credibilidade.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "argumento — é a base da influência em qualquer organização.",
            "A tese em uma frase é o teste mais simples: se não consegue escrever, não sabe o que está argumentando.",
            "Antecipar o contra-argumento não enfraquece sua posição — ela fortalece, porque mostra que você considerou o outro lado.",
            "Dados vagos são piores que nenhum dado: \"bastante\", \"muito\", \"sempre\" destroem credibilidade."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Ler e Pesquisar",
        "description": "Leitura crítica, métodos de pesquisa e revisão bibliográfica — as fundações do conhecimento aplicado",
        "subsections": [
          {
            "title": "Pesquisa Exploratória (\"O que está acontecendo?\")",
            "content": "Objetivo: entender fenômeno pouco conhecido e gerar hipóteses. Métodos: entrevistas em profundidade, grupos focais, observação. Resultado: **hipóteses**, não conclusões. Use no início — quando nem sabe as perguntas certas.",
            "quote": "Estudo de Caso — Nubank — pesquisa inicial (2013):",
            "studyCase": {
              "title": "Nubank — pesquisa inicial (2013)",
              "body": "Antes de lançar, David Vélez entrevistou centenas de brasileiros sobre sua relação com bancos. Descobriu o problema real: não era o cartão de crédito — era a raiva do banco. Isso foi exploratório puro."
            },
            "deepDive": "A pesquisa exploratória responde \"o quê e por quê\" — não \"quanto\". Misturar exploratória com causal é o erro mais comum em projetos de pesquisa."
          },
          {
            "title": "Pesquisa Descritiva (\"Qual o tamanho e perfil?\")",
            "content": "Objetivo: descrever uma população com precisão. Métodos: survey, censo, dados secundários. Resultado: **números, percentuais, distribuições**. Use quando já sabe o que perguntar e precisa quantificar.",
            "quote": "Estudo de Caso — IBGE / CETIC.br (2022):",
            "studyCase": {
              "title": "IBGE / CETIC.br (2022)",
              "body": "A pesquisa CETIC.br TIC Empresas 2022 mostrou que apenas 5% das PMEs brasileiras usam dados para decisão. Survey com 6.000 empresas — descritivo puro: mapeou o estado atual sem testar causa."
            },
            "deepDive": "Correlação não é causalidade — é o mantra da pesquisa descritiva. Descrever que X e Y coexistem não prova que X causa Y."
          },
          {
            "title": "Pesquisa Causal (\"X realmente causa Y?\")",
            "content": "Objetivo: estabelecer relação de causa e efeito. Métodos: experimento controlado, teste A/B, quasi-experimento. Resultado: **evidência causal** — não só correlação. Use quando precisa provar que uma ação específica gera um resultado específico.\n\nA revisão bibliográfica é a fundação de qualquer trabalho acadêmico. Não é listar autores — é mapear o que já se sabe e **identificar o gap** que sua pesquisa vai preencher. Use bases como Scopus, Web of Science e Periódicos CAPES. Organize por temas, não por autor. Identifique onde a literatura contradiz, onde há lacunas e onde seu contexto foi pouco estudado.",
            "quote": "Estudo de Caso — Amazon — teste A/B (2024):",
            "studyCase": {
              "title": "Amazon — teste A/B (2024)",
              "body": "A Amazon roda mais de 1.000 testes A/B por mês. Cada mudança de layout, cor, preço ou copy é um experimento causal: grupo controle vs. grupo tratamento. Nenhuma mudança vai ao ar sem evidência causal."
            },
            "deepDive": "O experimento causal é o único método que prova causa e efeito. Todo o resto prova associação. A diferença importa quando você decide investir R$ 2M numa mudança."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Ler criticamente e pesquisar com rigor são as duas faces da mesma moeda: **separar o que se sabe do que se acredita**. Todo argumento forte começa por saber em qual tipo de evidência ele está ancorado.\n\n**Principais Insights:**\n\n- Viés de confirmação é o inimigo da leitura crítica: leia para questionar, não para confirmar.\n- Método de pesquisa errado invalida o estudo inteiro — não importa a qualidade da execução.\n- Correlação não é causalidade: **só o experimento** prova causa e efeito.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Viés de confirmação é o inimigo da leitura crítica: leia para questionar, não para confirmar.",
            "Método de pesquisa errado invalida o estudo inteiro — não importa a qualidade da execução.",
            "Correlação não é causalidade: só o experimento prova causa e efeito."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Apresentar com Impacto",
        "description": "Storytelling com dados, design de slides e a estrutura que move pessoas à ação",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Comunicação eficaz não é sobre você — é sobre o seu **leitor ou audiência**. Escolha o formato que respeita o tempo deles. Use a estrutura que organiza o seu pensamento. E lembre: clareza é respeito.\n\n**Principais Insights:**\n\n- A estrutura Duarte cria tensão narrativa alternando realidade e possibilidade — é o padrão de **todas as apresentações que movem pessoas**.\n- Um slide = uma ideia = um visual. Qualquer coisa além disso divide a atenção e dilui a mensagem.\n- Os primeiros 30 segundos são decisivos — comece com impacto, nunca com apresentação pessoal.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "A estrutura Duarte cria tensão narrativa alternando realidade e possibilidade — é o padrão de todas as apresentações que movem pessoas.",
            "Um slide = uma ideia = um visual. Qualquer coisa além disso divide a atenção e dilui a mensagem.",
            "Os primeiros 30 segundos são decisivos — comece com impacto, nunca com apresentação pessoal.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M5-S2",
    "code": "M5-1",
    "title": "Empreendedorismo e Inovacao",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Empreender — O que É e Como Pensar",
        "description": "De Schumpeter à Effectuation — as duas lógicas que separam empreendedores que criam do que os que apenas executam",
        "subsections": [
          {
            "title": "Causation — Planejamento tradicional (Mercados estáveis)",
            "content": "\"Defina o objetivo → Planeje → Execute → Meça.\" Lógica: prever o futuro e se preparar. Ferramentas: business plan, pesquisa de mercado, projeções financeiras. Funciona quando o mercado é **estável**, a informação está disponível e a incerteza é baixa.",
            "quote": "Estudo de Caso — Expansão Natura para Europa (2017):",
            "studyCase": {
              "title": "Expansão Natura para Europa (2017)",
              "body": "Natura usou Causation para expandir internacionalmente: análise de mercado profunda, projeção de 5 anos, entrada faseada por país. Mercado maduro, modelo provado — planejar fazia sentido."
            },
            "deepDive": "Causation não é ruim — é inadequada para alta incerteza. Na expansão de negócio existente em mercado maduro, funciona perfeitamente."
          },
          {
            "title": "Effectuation — Lógica empreendedora (Mercados incertos)",
            "content": "\"Com o que tenho → O que posso criar? → Teste → Adapte.\" Os 5 princípios: Pássaro na Mão (comece com o que tem), Perda Aceitável (quanto pode perder sem se destruir?), Colcha de Retalhos (parceiros mudam o rumo), **Limonada** (surpresas são oportunidades) e Piloto do Avião (você cria o futuro).",
            "quote": "Estudo de Caso — Airbnb — fundação (2008):",
            "studyCase": {
              "title": "Airbnb — fundação (2008)",
              "body": "Os fundadores tinham: um apartamento com quarto vazio + uma conferência lotando os hotéis de São Francisco. Sem plano, sem projeção — usaram o que tinham. O produto emergiu das conversas com os primeiros 3 hóspedes."
            },
            "deepDive": "Post-it nasceu de adesivo que \"falhou\". Slack nasceu de jogo que fracassou. Limonada é o princípio mais difícil de aprender — e o mais valioso."
          },
          {
            "title": "Pivot — Quando aprender muda o rumo (Aprendizado aplicado)",
            "content": "Pivot não é fracasso — é aprendizado que muda a direção. Instagram era Burbn (app de check-in). Twitter era Odeo (plataforma de podcast). Slack era um jogo online. **O produto certo nasceu do produto errado** quando os fundadores prestaram atenção no que os usuários realmente usavam.",
            "quote": "Estudo de Caso — Instagram (2010):",
            "studyCase": {
              "title": "Instagram (2010)",
              "body": "Burbn tinha dezenas de funcionalidades. Os usuários só usavam uma: compartilhar fotos com filtros. Kevin Systrom cortou tudo e lançou só essa função. 13 dias depois, 25.000 usuários. Pivot total."
            },
            "deepDive": "A diferença entre pivot e desistência: pivot mantém a missão e muda o produto. Desistência abandona tudo. Kevin Systrom manteve a missão (conectar pessoas por imagem) e mudou tudo o mais."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Não existe lógica certa — existe a lógica **adequada ao contexto**. Causation para mercados maduros. Effectuation para mercados incertos. Pivot quando o aprendizado contradiz o plano. O empreendedor competente transita entre as três.\n\n**Principais Insights:**\n\n- Destruição criativa não é sobre destruir — é sobre criar algo que torna o antigo **desnecessário**.\n- Effectuation: a pergunta não é \"o que preciso para atingir X?\" — é \"o que posso criar com o que tenho **agora**?\"\n- Pivot mantém a missão e muda o produto. Quem muda a missão a cada semana não pivotou — perdeu o rumo.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Destruição criativa não é sobre destruir — é sobre criar algo que torna o antigo desnecessário.",
            "Effectuation: a pergunta não é \"o que preciso para atingir X?\" — é \"o que posso criar com o que tenho agora?\"",
            "Pivot mantém a missão e muda o produto. Quem muda a missão a cada semana não pivotou — perdeu o rumo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Validar Antes de Construir",
        "description": "Lean Startup, MVP e Product-Market Fit — o método que evita construir algo que ninguém quer",
        "subsections": [
          {
            "title": "Build — O MVP (Construir o mínimo)",
            "content": "MVP não é o produto final com menos funcionalidades. É o experimento mais barato para aprender se a hipótese é verdadeira. Dropbox: **vídeo de 3 minutos** mostrando como funcionaria → 75.000 inscritos em uma noite. Zero código. Zappos: fotografou sapatos em lojas, postou online, comprava quando alguém pedia. Validou demanda **sem estoque**.",
            "quote": "Estudo de Caso — Buffer (2010):",
            "studyCase": {
              "title": "Buffer (2010)",
              "body": "Joel Gascoigne criou uma landing page com preços. Quando alguém clicava em \"assinar\", aparecia: \"ainda não estamos prontos — deixe seu email.\" Mediu interesse real antes de escrever uma linha de código. Hoje: US$ 20M+ em ARR."
            },
            "deepDive": "A pergunta antes de qualquer MVP: \"qual é a hipótese mais arriscada do nosso modelo?\" Essa é a hipótese a testar primeiro — não a mais fácil de testar."
          },
          {
            "title": "Measure — Métricas que importam (Medir o certo)",
            "content": "Métricas de vaidade: downloads, pageviews, seguidores — parecem bons, **não dizem nada**. Métricas acionáveis: taxa de conversão, retenção D7, LTV/CAC, NPS. Teste: \"se essa métrica mudar, minha decisão muda?\" Se não — é vaidade.",
            "quote": "Estudo de Caso — Slack — métrica Aha (2013):",
            "studyCase": {
              "title": "Slack — métrica Aha (2013)",
              "body": "Slack descobriu que equipes que trocam 2.000 mensagens nunca cancelam. Isso virou a única métrica que importava no onboarding: fazer a equipe trocar as primeiras 2.000 mensagens o mais rápido possível."
            },
            "deepDive": "Métricas de retenção são as mais honestas: se o usuário volta, o produto tem valor. Se não volta, o problema é do produto — não do marketing."
          },
          {
            "title": "Learn — Pivotar ou Perseverar (Decidir com dados)",
            "content": "Hipótese validada → Persevere. Escale. Hipótese invalidada → Pivote. Mude a abordagem. Marc Andreessen: \"**Product-market fit** é a única coisa que importa.\" Teste de Sean Ellis: pergunte aos usuários \"Como se sentiria se não pudesse mais usar este produto?\" Se **40%+** responde \"muito desapontado\" → PMF. Se <40% → continue iterando.\n\nOs **4 estágios da validação**: (1) Problem-Solution Fit — o problema existe e é doloroso o suficiente para alguém pagar? (2) MVP e primeiros usuários — a solução resolve de verdade? (3) Product-Market Fit — o mercado puxa o produto sem precisar ser convencido? (4) Scale — só escale após PMF. Escalar sem PMF é gastar dinheiro para descobrir mais rápido que não funciona.",
            "quote": "Estudo de Caso — WhatsApp (2009):",
            "studyCase": {
              "title": "WhatsApp (2009)",
              "body": "Sem marketing, sem anúncio, sem growth hack. As pessoas baixavam porque todo mundo usava. Crescimento orgânico explosivo = PMF nítido. Jan Koum não precisou do teste de Sean Ellis — os dados eram óbvios."
            },
            "deepDive": "PMF não é declaração — é comportamento. Indicadores reais: crescimento orgânico (pessoas indicam sem você pedir), retenção estável ou crescente, demanda maior que capacidade."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "A validação não é uma fase do projeto — é uma **mentalidade permanente**. Startups que escalam sem PMF queimam capital para descobrir mais rápido que o produto não funciona. As que têm PMF e escalam devagar desperdiçam a janela de mercado.\n\n**Principais Insights:**\n\n- MVP não é o produto mais simples — é o experimento mais barato para aprender se **a hipótese principal é verdadeira**.\n- Métricas de vaidade enganam: downloads e pageviews não provam valor. **Retenção** é a métrica mais honesta.\n- PMF é comportamento, não declaração: crescimento orgânico, retenção crescente e demanda maior que capacidade são os sinais reais.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "MVP não é o produto mais simples — é o experimento mais barato para aprender se a hipótese principal é verdadeira.",
            "Métricas de vaidade enganam: downloads e pageviews não provam valor. Retenção é a métrica mais honesta.",
            "PMF é comportamento, não declaração: crescimento orgânico, retenção crescente e demanda maior que capacidade são os sinais reais."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Modelo de Negócio e Unit Economics",
        "description": "Business Model Canvas, CAC, LTV e o funil AARRR — se a unidade não funciona, escalar é escalar o prejuízo",
        "subsections": [
          {
            "title": "AARRR — Acquisition (Como o usuário te descobre?)",
            "content": "Canais: SEO, ads, indicação, PR, conteúdo, parcerias. Métrica: custo por lead, volume de leads qualificados. Pergunta crítica: \"**qual canal traz mais clientes ao menor CAC?**\" Não escale o canal mais fácil — escale o mais eficiente.",
            "quote": "Estudo de Caso — Nubank (2014):",
            "studyCase": {
              "title": "Nubank (2014)",
              "body": "CAC de ~R$ 30 via indicação vs. R$ 800+ dos bancos tradicionais via TV e agências. A indicação viral não foi acidental — foi construída deliberadamente: produto tão bom que os clientes queriam indicar. Aquisição como consequência de produto."
            },
            "deepDive": "O canal mais barato de aquisição é o produto extraordinário que gera indicação espontânea. Antes de gastar em ads, pergunte: meus clientes indicam hoje? Se não — o problema não é aquisição."
          },
          {
            "title": "AARRR — Retention (O usuário volta?)",
            "content": "A métrica mais importante — e a mais ignorada. Sem retenção, aquisição é **balde furado**. Regra: se retenção D30 < 20%, o produto não resolve o problema bem o suficiente. Não invista em aquisição antes de resolver retenção. É o erro mais caro das startups.",
            "quote": "Estudo de Caso — iFood (2023):",
            "studyCase": {
              "title": "iFood (2023)",
              "body": "Com pedido médio de R$ 45 e margem por pedido baixa, o modelo só funciona pela frequência: cliente médio faz 4+ pedidos/mês. A retenção não é \"alguém vai usar de novo\" — é \"vai usar esta semana\"."
            },
            "deepDive": "DAU/MAU (usuários diários / mensais) revela a intensidade de uso: 50%+ = hábito formado. 20% = uso ocasional. 5% = produto dispensável."
          },
          {
            "title": "AARRR — Referral (O usuário indica?)",
            "content": "O canal mais barato e confiável de aquisição. K > 1: cada cliente traz mais de 1 novo → crescimento viral orgânico. Dropbox: indicação = +500MB para o indicador e o indicado. **Signups subiram 60%** com o programa. A indicação não é sorte — é feature.",
            "quote": "Estudo de Caso — Hotmail — 1996 (1996):",
            "studyCase": {
              "title": "Hotmail — 1996 (1996)",
              "body": "\"PS: Get your free email at Hotmail\" no rodapé de cada email enviado. 12 milhões de usuários em 18 meses. Zero gasto em marketing. O produto se auto-distribuía a cada uso — o viral coefficient mais famoso da história da internet."
            },
            "deepDive": "Referral não é marketing — é produto. Se seus clientes não indicam, o produto não gerou valor suficiente. Corrija o produto antes de criar programa de indicação."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "A regra de ouro: **se a unidade não funciona, escalar não vai salvar — vai acelerar a falência**. Corrija CAC, retenção ou margem antes de pisar no acelerador.\n\n**Principais Insights:**\n\n- Business Model Canvas: cada bloco é hipótese, não verdade. Teste o mais arriscado primeiro.\n- LTV/CAC > 3 = sustentável. > 5 = excelente. < 1 = cada cliente é prejuízo — **pare de crescer e corrija a unidade**.\n- Retenção é o número mais honesto: se o usuário volta, o produto tem valor. Sem retenção, aquisição é balde furado.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Business Model Canvas: cada bloco é hipótese, não verdade. Teste o mais arriscado primeiro.",
            "LTV/CAC > 3 = sustentável. > 5 = excelente. < 1 = cada cliente é prejuízo — pare de crescer e corrija a unidade.",
            "Retenção é o número mais honesto: se o usuário volta, o produto tem valor. Sem retenção, aquisição é balde furado."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Financiamento, Pitch e Ecossistema",
        "description": "Do bootstrap ao VC — a fonte certa de capital no estágio certo, e como apresentar para investidores",
        "subsections": [
          {
            "title": "Estágio 1 — Ideação (Pré-Revenue)",
            "content": "Fontes: Bootstrap (capital próprio), FFF (Friends, Family & Fools), Aceleradoras (R$ 50K-500K por 5-10% de equity + mentoria), Editais públicos (FINEP, FAPESP, BNDES Garagem). Regra: **valide antes de buscar capital externo**. Com dinheiro de aceleradora, você compra tempo para testar — não para construir o produto final.",
            "quote": "Estudo de Caso — Hotmart — origem (2011):",
            "studyCase": {
              "title": "Hotmart — origem (2011)",
              "body": "João Pedro Resende e João Paulo Trajano criaram o Hotmart com recursos próprios e sem investidor externo por anos. Bootstrapping total até atingir escala suficiente para captar em condições favoráveis. Hoje: líder em infoprodutos na América Latina."
            },
            "deepDive": "Aceleradora não é só dinheiro — é rede, credibilidade e pressão produtiva. O mentor certo vale mais que o cheque."
          },
          {
            "title": "Estágio 2-3 — Validação a Crescimento (Early Revenue → Tração)",
            "content": "Anjo (R$ 50K-500K): pessoa física, traz rede de contatos, menos burocracia. Seed VC (R$ 500K-5M): primeiro VC, foco em provar que o modelo escala. Série A (R$ 5-30M): escalar aquisição de clientes. Série B+ (R$ 30M+): expansão geográfica, novas linhas, domínio de mercado. Diluição: **10-25% por rodada** — é o preço da aceleração.",
            "quote": "Estudo de Caso — QuintoAndar (2013):",
            "studyCase": {
              "title": "QuintoAndar (2013)",
              "body": "Gabriel Braga começou com Anjo → Seed (Kaszek) → Série A → B → C. Cada rodada com tese clara: Anjo para validar o modelo, Seed para provar escala em SP, Série A para RJ e BH, B para Brasil inteiro. Resultado: US$ 5,1B de valuation."
            },
            "deepDive": "Diluição: manter 10% de empresa de R$ 100M é melhor que 100% de empresa de R$ 1M. O bolo maior importa mais do que o tamanho da fatia."
          },
          {
            "title": "O Pitch de 12 Slides (Sequoia Capital) (Como convencer investidores)",
            "content": "Um VC vê 200+ decks por mês. Gasta **3 min 44 seg** por deck em média (DocSend, 2023). Os 12 slides: Título, Problema (dado impactante + história), Solução (mostre, não conte), Por que agora?, Tamanho de mercado (TAM/SAM/**SOM — o VC olha o SOM**), Modelo de negócio, Tração, Competição (nunca diga \"não temos concorrente\"), Equipe, Go-to-market, Financeiro (3-5 anos com premissas), Ask (o que precisa e para quê).\n\nO ecossistema brasileiro em 2025: **~15.000 startups** ativas, 15 unicórnios, US$ 3,5B em VC. Os principais VCs: Kaszek (maior da AL — Nubank, QuintoAndar), Monashees (Rappi, Loggi), Canary (seed stage — maior deal flow). Programas públicos: BNDES Garagem, FINEP (subvenção econômica = dinheiro não reembolsável), FAPESP PIPE. **Não aceite dinheiro de quem não agrega valor além do capital.**",
            "quote": "Estudo de Caso — Airbnb — primeiro pitch (2009):",
            "studyCase": {
              "title": "Airbnb — primeiro pitch (2009)",
              "body": "O pitch original do Airbnb para YCombinator tinha 10 slides simples. Tração real: 10.000 usuários. A equipe já tinha passado por rejeição de 5 fundos antes. Paul Graham aceitou porque a ideia parecia \"estranha mas os números eram reais.\" Tração honesta sempre supera narrativa bonita."
            },
            "deepDive": "Erros que matam o pitch: TAM de \"trilhões\" sem SOM realista, \"não temos concorrentes\" (demonstra ingenuidade), projeção hockey stick sem premissas."
          },
          {
            "title": "Síntese e Fechamento",
            "content": "Capital é combustível — mas **sem direção, acelera na direção errada**. A fonte certa no momento certo é estratégia. Não aceite dinheiro de quem não agrega valor além do cheque — o investidor errado pode ser mais destrutivo do que a falta de capital.\n\n**Principais Insights:**\n\n- Valide antes de buscar capital externo: sem evidência de problema real, nenhum investidor sério vai entrar.\n- Diluição é o preço da velocidade: manter 10% de empresa grande é melhor que 100% de empresa pequena — o tamanho do bolo importa mais.\n- O pitch não vende a ideia — vende a **equipe e a evidência**. Tração honesta supera narrativa bonita.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Valide antes de buscar capital externo: sem evidência de problema real, nenhum investidor sério vai entrar.",
            "Diluição é o preço da velocidade: manter 10% de empresa grande é melhor que 100% de empresa pequena — o tamanho do bolo importa mais.",
            "O pitch não vende a ideia — vende a equipe e a evidência. Tração honesta supera narrativa bonita.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M5-S3",
    "code": "M5-2",
    "title": "Ambiente Macroeconomico",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Os 5 Indicadores — Lendo o Ambiente",
        "description": "PIB, IPCA, Selic, câmbio e desemprego: o painel que nenhum gestor pode ignorar.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Macroeconomia não é para prever o futuro — é para **não ser pego de surpresa**. Quem lê os indicadores com antecedência renegocia dívidas no pico, expande no vale e protege caixa na contração.\n\n**Principais Insights:**\n\n- Os 5 indicadores (PIB, IPCA, Selic, câmbio, desemprego) formam um painel. Leia o conjunto, não cada um isolado.\n- Selic alta = priorize caixa. Selic baixa = invista. **Esta regra simples evita os erros mais caros**.\n- Política monetária e fiscal em conflito = pior cenário. Aprenda a identificar quando as duas estão alinhadas vs. brigando.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Os 5 indicadores (PIB, IPCA, Selic, câmbio, desemprego) formam um painel. Leia o conjunto, não cada um isolado.",
            "Selic alta = priorize caixa. Selic baixa = invista. Esta regra simples evita os erros mais caros.",
            "Política monetária e fiscal em conflito = pior cenário. Aprenda a identificar quando as duas estão alinhadas vs. brigando."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Ciclos Econômicos — Quando Expandir e Quando Proteger",
        "description": "A economia oscila em 4 fases. A estratégia certa no momento errado é a estratégia errada.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "A regra de Buffett funciona porque é contraintuitiva: **tenha medo quando os outros são gananciosos e seja ganancioso quando os outros têm medo**. O ciclo econômico transforma covardia em inteligência — se você ler a fase certa.\n\n**Principais Insights:**\n\n- Expansão: invista, mas guarde reserva. Pico: venda ativos, reduza dívida. Contração: preserve caixa. Vale: compre o futuro barato.\n- Indicadores antecipam a virada: curva invertida → recessão em 12-18 meses. **Quem espera o PIB cair para proteger, chegou tarde**.\n- Na contração, concorrentes enfraquecem, talentos ficam disponíveis e ativos ficam baratos. Caixa na crise é poder.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Expansão: invista, mas guarde reserva. Pico: venda ativos, reduza dívida. Contração: preserve caixa. Vale: compre o futuro barato.",
            "Indicadores antecipam a virada: curva invertida → recessão em 12-18 meses. Quem espera o PIB cair para proteger, chegou tarde.",
            "Na contração, concorrentes enfraquecem, talentos ficam disponíveis e ativos ficam baratos. Caixa na crise é poder."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Brasil — Estrutura, Desafios e Oportunidades",
        "description": "Da reforma tributária ao agronegócio: entender o Brasil é vantagem competitiva.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "O Brasil exige uma leitura dupla: **os desafios são reais, mas as oportunidades estão exatamente onde os outros desistem**. Energia renovável, agro-tech, economia digital e biodiversidade são vantagens competitivas globais ainda sendo exploradas.\n\n**Principais Insights:**\n\n- Reforma Tributária: serviços pagam mais, indústria paga menos. Simule o impacto na sua empresa antes de 2026.\n- Brasil tem 5 desafios estruturais e 5 oportunidades globais. Conhecer os dois é diferencial estratégico para qualquer gestor.\n- **Vantagem comparativa não é sorte — é decisão**. O Brasil domina agro, energia limpa e biodiversidade. Onde sua empresa pode ancorar nisso?",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "tech, economia digital e biodiversidade são vantagens competitivas globais ainda sendo exploradas.",
            "Reforma Tributária: serviços pagam mais, indústria paga menos. Simule o impacto na sua empresa antes de 2026.",
            "Brasil tem 5 desafios estruturais e 5 oportunidades globais. Conhecer os dois é diferencial estratégico para qualquer gestor.",
            "Vantagem comparativa não é sorte — é decisão. O Brasil domina agro, energia limpa e biodiversidade. Onde sua empresa pode ancorar nisso?"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Trabalho e Dinheiro — O Sistema que Move o Negócio",
        "description": "Mercado de trabalho em transformação + sistema financeiro: o que todo gestor precisa dominar.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Trabalho e dinheiro são os dois recursos mais escassos de qualquer empresa. **Quem gerencia bem o caixa sobrevive à crise. Quem gerencia bem o talento vence na expansão**. Os dois juntos constroem empresas que duram.\n\n**Principais Insights:**\n\n- Mercado de trabalho: escassez de qualificados é estrutural. Upskilling interno custa menos que competir por candidatos prontos.\n- Regra de caixa: 3-6 meses de despesas em liquidez diária. **Nunca use cheque especial — é o crédito mais caro que existe**.\n- Open Banking e PIX mudaram as regras do sistema financeiro. Quem ainda ignora essas ferramentas paga mais caro por tudo.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Mercado de trabalho: escassez de qualificados é estrutural. Upskilling interno custa menos que competir por candidatos prontos.",
            "Regra de caixa: 3-6 meses de despesas em liquidez diária. Nunca use cheque especial — é o crédito mais caro que existe.",
            "Open Banking e PIX mudaram as regras do sistema financeiro. Quem ainda ignora essas ferramentas paga mais caro por tudo.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M6-S1",
    "code": "M6-0",
    "title": "Analise Financeira",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Análise Vertical e Horizontal — Lendo as Entrelinhas",
        "description": "Demonstrações contábeis são um mapa. Sem análise, são apenas números.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "A análise mais poderosa cruza vertical com horizontal: a vertical mostra **onde está o problema** na estrutura, a horizontal mostra **quando o problema começou** e se está piorando. Juntas revelam o diagnóstico completo.\n\n**Principais Insights:**\n\n- Nunca analise um indicador isolado. ROE alto com endividamento explosivo é bomba-relógio. Liquidez alta com ROI baixo é ineficiência.\n- Ciclo Financeiro negativo é o ideal: empresa recebe antes de pagar, sem precisar de capital de giro externo.\n- **CMV acima do benchmark do setor não é dado — é diagnóstico**. Alguma coisa está errada em compra, produção ou precificação.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Nunca analise um indicador isolado. ROE alto com endividamento explosivo é bomba-relógio. Liquidez alta com ROI baixo é ineficiência.",
            "Ciclo Financeiro negativo é o ideal: empresa recebe antes de pagar, sem precisar de capital de giro externo.",
            "CMV acima do benchmark do setor não é dado — é diagnóstico. Alguma coisa está errada em compra, produção ou precificação."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Valuation — Quanto Vale Sua Empresa?",
        "description": "DCF, múltiplos e valor patrimonial: três lentes para chegar ao mesmo número.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Valuation não é matemática — é narrativa com números. **DCF conta o futuro, múltiplos contam o mercado, patrimonial conta o presente**. O analista sério usa os três e triangula. O número final é aquele que a lógica e o mercado sustentam juntos.\n\n**Principais Insights:**\n\n- DCF: poderoso mas perigoso. Pequenas mudanças na taxa de crescimento ou desconto mudam o resultado em 30-50%.\n- Múltiplos de mercado americano não valem para PME brasileira. Risco país + taxa de juros mudam o denominador de tudo.\n- **Triangule sempre**: se DCF e múltiplos apontam faixas diferentes, o valor justo está no meio — o patrimonial é o piso.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "DCF: poderoso mas perigoso. Pequenas mudanças na taxa de crescimento ou desconto mudam o resultado em 30-50%.",
            "Múltiplos de mercado americano não valem para PME brasileira. Risco país + taxa de juros mudam o denominador de tudo.",
            "Triangule sempre: se DCF e múltiplos apontam faixas diferentes, o valor justo está no meio — o patrimonial é o piso."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Capital de Giro — O Motor da Operação",
        "description": "60% das falências no Brasil não são por falta de vendas. São por má gestão do dinheiro que circula.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "60% das falências no Brasil são por má gestão de capital de giro — não por falta de vendas. **A empresa pode vender muito e quebrar se o dinheiro chegar tarde demais**. Gestão de ciclo financeiro é a habilidade mais subvalorizada em finanças empresariais.\n\n**Principais Insights:**\n\n- Ciclo Financeiro negativo = empresa se autofinancia. Positivo = precisa de capital externo. Cada dia conta.\n- Primeira alavanca: negocie prazo com fornecedor. É financiamento gratuito. Segunda: reduza estoque. Terceira: antecipe recebíveis.\n- **Cheque especial é o produto financeiro mais caro do mercado**. Usar para cobrir operação é sinal de que o ciclo está quebrado.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Ciclo Financeiro negativo = empresa se autofinancia. Positivo = precisa de capital externo. Cada dia conta.",
            "Primeira alavanca: negocie prazo com fornecedor. É financiamento gratuito. Segunda: reduza estoque. Terceira: antecipe recebíveis.",
            "Cheque especial é o produto financeiro mais caro do mercado. Usar para cobrir operação é sinal de que o ciclo está quebrado."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Diagnóstico Integrado — O Mapa Financeiro do Negócio",
        "description": "Análise V/H, valuation, capital de giro e precificação: quatro lentes do mesmo negócio.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Análise financeira, valuation, capital de giro e precificação são **quatro lentes do mesmo negócio**. Gestores que dominam os quatro tomam decisões melhores — porque enxergam o que os outros não veem.\n\n**Principais Insights:**\n\n- O diagnóstico em 4 perguntas: estrutura saudável? Tendência melhorando? Dinheiro circulando? Preço correto?\n- Fatura bem mas falta caixa = capital de giro. Vende mas não lucra = estrutura (V/H). Cresce e piora = precificação.\n- **Nenhum indicador isolado conta a história completa**. A análise financeira é cruzamento — não checklist individual.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "O diagnóstico em 4 perguntas: estrutura saudável? Tendência melhorando? Dinheiro circulando? Preço correto?",
            "Fatura bem mas falta caixa = capital de giro. Vende mas não lucra = estrutura (V/H). Cresce e piora = precificação.",
            "Nenhum indicador isolado conta a história completa. A análise financeira é cruzamento — não checklist individual.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M6-S2",
    "code": "M6-1",
    "title": "Precificacao",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: 3 Abordagens de Precificação — O Método Define o Resultado",
        "description": "Preço é a única variável do mix que gera receita. Cobrar errado pode destruir um negócio excelente.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Se você cobra por custo, compete por preço. Se cobra por valor, compete por resultado. **A mudança de método de precificação é a alavanca de margem mais rápida que existe** — sem mudar produto, equipe ou estrutura.\n\n**Principais Insights:**\n\n- Custo define o PISO, mercado define a FAIXA, valor define o TETO. Use os 3 — não apenas um.\n- Tiered pricing aumenta receita média por cliente em 30–50%. A opção do meio vende sozinha.\n- **Cobrar pelo resultado entregue, não pela hora trabalhada** é o salto de margem que transforma consultores em referências.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Custo define o PISO, mercado define a FAIXA, valor define o TETO. Use os 3 — não apenas um.",
            "Tiered pricing aumenta receita média por cliente em 30–50%. A opção do meio vende sozinha.",
            "Cobrar pelo resultado entregue, não pela hora trabalhada é o salto de margem que transforma consultores em referências."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Elasticidade e Psicologia do Preço",
        "description": "O preço que o cliente vê não é o mesmo preço que ele sente. Entender isso é vantagem.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Conhecer a elasticidade do seu produto é saber **quanto poder de precificação você tem**. Demanda inelástica = você pode aumentar preço sem perder volume. Elástica = diferenciação antes de reajuste. Sem saber a elasticidade, qualquer reajuste é aposta.\n\n**Principais Insights:**\n\n- Elástico = substitutos fáceis. Inelástico = sem alternativa ou custo de troca alto. Produtos inelásticos têm margem estruturalmente maior.\n- Preço âncora é o contexto que define o valor percebido. **Sempre mostre de onde vem o preço atual** — comparação ativa o juízo de valor.\n- Tiered pricing não é sobre dar opções — é sobre fazer a opção do meio parecer obviamente a melhor escolha.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Elástico = substitutos fáceis. Inelástico = sem alternativa ou custo de troca alto. Produtos inelásticos têm margem estruturalmente maior.",
            "Preço âncora é o contexto que define o valor percebido. Sempre mostre de onde vem o preço atual — comparação ativa o juízo de valor.",
            "Tiered pricing não é sobre dar opções — é sobre fazer a opção do meio parecer obviamente a melhor escolha."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Markup vs Margem — A Confusão que Custa Caro",
        "description": "Markup de 50% não é margem de 50%. É margem de 33%. Este erro custa 17% do lucro esperado.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Markup e margem são dois números sobre o mesmo lucro — com bases diferentes. **Confundir os dois é planejar em cima de uma ilusão**. Antes de definir meta de crescimento ou distribuição, certifique-se de qual número você está usando.\n\n**Principais Insights:**\n\n- Markup usa o custo como base. Margem usa o preço. Markup de 50% = margem de 33% — **nunca são iguais**.\n- A fórmula correta para margem definida: Preço = Custo ÷ (1 − Margem%). Não multiplique — divida.\n- Desconto concedido precisa ser calculado sobre a margem disponível, não sobre o preço. Descontar sem saber o custo real é vender no escuro.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "se de qual número você está usando.",
            "Markup usa o custo como base. Margem usa o preço. Markup de 50% = margem de 33% — nunca são iguais.",
            "A fórmula correta para margem definida: Preço = Custo ÷ (1 − Margem%). Não multiplique — divida.",
            "Desconto concedido precisa ser calculado sobre a margem disponível, não sobre o preço. Descontar sem saber o custo real é vender no escuro."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Break-Even e Margem de Contribuição — O Piso do Negócio",
        "description": "Quantas unidades preciso vender para não ter prejuízo? Qualquer gestor deve responder isso de cabeça.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "Break-even não é destino — é piso. **Operar abaixo do PE é sangriar lentamente**. A meta é margem de segurança > 20%: significa que o negócio aguenta surpresas sem entrar em crise imediata.\n\n**Principais Insights:**\n\n- MC negativa: vender mais piora. Corrija preço ou custo variável antes de qualquer coisa — crescimento não resolve.\n- Margem de segurança < 15% = empresa vulnerável. Qualquer choque externo vira crise.\n- **PE não é meta de vendas — é o piso de sobrevivência**. A meta é operar 30%+ acima do PE para ter colchão real.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "even não é destino — é piso. Operar abaixo do PE é sangriar lentamente. A meta é margem de segurança > 20%: significa que o negócio aguenta surpresas sem entrar em crise imediata.",
            "MC negativa: vender mais piora. Corrija preço ou custo variável antes de qualquer coisa — crescimento não resolve.",
            "Margem de segurança < 15% = empresa vulnerável. Qualquer choque externo vira crise.",
            "PE não é meta de vendas — é o piso de sobrevivência. A meta é operar 30%+ acima do PE para ter colchão real.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M6-S3",
    "code": "M6-2",
    "title": "Etica",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Os 4 Frameworks — A Bússola das Decisões Éticas",
        "description": "Quando a lei não dá resposta, a filosofia entra em cena. Quatro lentes para não decidir no escuro.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Ética não é sobre ter respostas certas — é sobre fazer as perguntas certas antes de agir**. O gestor que conhece os 4 frameworks tem vocabulário para argumentar, escutar e decidir com consistência. O que não tem framework decide por instinto — e às vezes acerta, mas não sabe por quê nem consegue replicar.\n\n**Principais Insights:**\n\n- Se os 4 frameworks convergem: a decisão é clara. Se divergem: o dilema é real — reserve deliberação coletiva antes de agir.\n- **Compliance é o mínimo**. Seguir a lei é obrigação. Ética começa onde a lei termina — na zona cinzenta que define a cultura real de uma empresa.\n- O teste do jornal: \"Se essa decisão saísse na capa do jornal amanhã, eu ficaria confortável?\" — filtro rápido e poderoso antes de qualquer escolha importante.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Se os 4 frameworks convergem: a decisão é clara. Se divergem: o dilema é real — reserve deliberação coletiva antes de agir.",
            "Compliance é o mínimo. Seguir a lei é obrigação. Ética começa onde a lei termina — na zona cinzenta que define a cultura real de uma empresa.",
            "O teste do jornal: \"Se essa decisão saísse na capa do jornal amanhã, eu ficaria confortável?\" — filtro rápido e poderoso antes de qualquer escolha importante."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Dilemas do Século XXI — IA, Dados e Trabalho",
        "description": "A tecnologia criou dilemas éticos sem precedentes. Gestores precisam navegar sem mapa pronto.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "A empresa que navega dilemas éticos tecnológicos com transparência **constrói ativo que não aparece no balanço: reputação de integridade**. Consumidores, funcionários e reguladores escolhem com quem ficam — e a ética virou critério de seleção tão importante quanto preço.\n\n**Principais Insights:**\n\n- **LGPD não é burocracia — é lei**. Multa por violação chega a 2% do faturamento no Brasil, limitado a R$ 50M por infração. Ignorar tem preço definido.\n- Viés algorítmico é risco jurídico real. Nos EUA, empresas pagaram bilhões por discriminação via IA em crédito e contratação nos últimos 5 anos.\n- O teste de Rawls para tecnologia: se você fosse o usuário mais vulnerável do seu produto, aceitaria como ele é tratado agora?",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "LGPD não é burocracia — é lei. Multa por violação chega a 2% do faturamento no Brasil, limitado a R$ 50M por infração. Ignorar tem preço definido.",
            "Viés algorítmico é risco jurídico real. Nos EUA, empresas pagaram bilhões por discriminação via IA em crédito e contratação nos últimos 5 anos.",
            "O teste de Rawls para tecnologia: se você fosse o usuário mais vulnerável do seu produto, aceitaria como ele é tratado agora?"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: O Método das Decisões Éticas — 4 Passos para Não Errar",
        "description": "Ética sem método é intenção. Com método, é prática replicável em qualquer pressão.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Ética sem processo é promessa. Processo sem cultura é teatro**. O que sustenta uma empresa íntegra não é o código de conduta na parede — é o gestor que aplica o método quando ninguém está olhando, especialmente quando custa dinheiro e posição.\n\n**Principais Insights:**\n\n- Decisões éticas documentadas resistem a processos judiciais, escândalos e rotatividade de liderança. Escreva o raciocínio, não só a conclusão.\n- **Cultura é o que você tolera**. Toda irregularidade ignorada comunica ao time que aquele comportamento é aceitável — mesmo sem nenhuma palavra dita.\n- Versão moderna do Teste do Jornal: \"Eu ficaria confortável se um funcionário júnior tweetasse exatamente o que aconteceu aqui?\" Se não — reavalie antes de agir.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Decisões éticas documentadas resistem a processos judiciais, escândalos e rotatividade de liderança. Escreva o raciocínio, não só a conclusão.",
            "Cultura é o que você tolera. Toda irregularidade ignorada comunica ao time que aquele comportamento é aceitável — mesmo sem nenhuma palavra dita.",
            "Versão moderna do Teste do Jornal: \"Eu ficaria confortável se um funcionário júnior tweetasse exatamente o que aconteceu aqui?\" Se não — reavalie antes de agir."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: ESG e Governança — Ética que Aparece no Balanço",
        "description": "ESG deixou de ser tendência e virou critério de investimento, contratação e reputação de mercado.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**ESG não é o futuro dos negócios — é o presente dos negócios que querem sobreviver**. Investidores, consumidores, reguladores e os melhores talentos do mercado já tomam decisões baseados nisso. A empresa que ignora essa mudança não está sendo pragmática — está acumulando passivo que vai cobrar um preço.\n\n**Principais Insights:**\n\n- Custo de capital: empresas com rating ESG elevado tomam crédito 1,5–2% mais barato. Em um financiamento de R$ 100M, isso é R$ 1,5–2M por ano de diferença real.\n- **G é o pilar mais negligenciado e o mais impactante**. 80% dos escândalos corporativos têm falha de governança como causa raiz, não de intenção individual.\n- O teste prático de ESG: pergunte ao funcionário da linha de produção o que a empresa faz pelo meio ambiente e pela comunidade. A resposta diz tudo.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Custo de capital: empresas com rating ESG elevado tomam crédito 1,5–2% mais barato. Em um financiamento de R$ 100M, isso é R$ 1,5–2M por ano de diferença real.",
            "G é o pilar mais negligenciado e o mais impactante. 80% dos escândalos corporativos têm falha de governança como causa raiz, não de intenção individual.",
            "O teste prático de ESG: pergunte ao funcionário da linha de produção o que a empresa faz pelo meio ambiente e pela comunidade. A resposta diz tudo.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M7-S1",
    "code": "M7-0",
    "title": "Empreendedorismo Social",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Os 3 Modelos de Impacto Social — Qual Estrutura Escolher?",
        "description": "Negócio Social, Empresa B e ONG: três caminhos para resolver problemas reais com sustentabilidade financeira.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Empreendedorismo social não é filantropia com CNPJ — é inovação no modelo de negócio**. A pergunta não é \"podemos fazer bem ao mundo?\" — é \"como construímos um modelo financeiro que sustente o bem que queremos fazer por décadas?\"\n\n**Principais Insights:**\n\n- Empresa que doa 1% do lucro para caridade NÃO é negócio social. O impacto precisa estar no **modelo** — não no destino de uma fração do lucro.\n- Grameen Bank: inadimplência < 2% entre os mais pobres de Bangladesh. O mercado subestimou um segmento — Yunus viu uma oportunidade onde todos viam risco.\n- Natura: prova de que impacto e retorno financeiro não são opostos. **Primeira B Corp listada em bolsa na América Latina** e entre as maiores empresas de cosméticos do mundo.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Empresa que doa 1% do lucro para caridade NÃO é negócio social. O impacto precisa estar no modelo — não no destino de uma fração do lucro.",
            "Grameen Bank: inadimplência < 2% entre os mais pobres de Bangladesh. O mercado subestimou um segmento — Yunus viu uma oportunidade onde todos viam risco.",
            "Natura: prova de que impacto e retorno financeiro não são opostos. Primeira B Corp listada em bolsa na América Latina e entre as maiores empresas de cosméticos do mundo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Teoria da Mudança — Da Ideia ao Impacto Real",
        "description": "Sem conectar ação a resultado, qualquer projeto é bem-intencionado mas não comprovado.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Sem medir, não há como provar impacto. Sem provar, não há como escalar.** A mensuração de impacto social é o equivalente ao DRE para negócios tradicionais — não é burocracia, é o instrumento que conecta ação a resultado e resultado a financiamento.\n\n**Principais Insights:**\n\n- Comece simples: 3-5 indicadores que conectam sua atividade ao resultado na vida das pessoas. Meça trimestralmente. Relate com transparência — inclusive os fracassos.\n- **Deadweight**: o que teria acontecido sem o seu projeto? Se 40% dos jovens teriam se empregado de qualquer forma, seu impacto real é nos outros 60% — não em todos.\n- Financiadores estão migrando para financiamento por outcomes: só pagam se o resultado for comprovado. Quem não mede fica fora dessa corrida por capital de impacto.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Comece simples: 3-5 indicadores que conectam sua atividade ao resultado na vida das pessoas. Meça trimestralmente. Relate com transparência — inclusive os fracassos.",
            "Deadweight: o que teria acontecido sem o seu projeto? Se 40% dos jovens teriam se empregado de qualquer forma, seu impacto real é nos outros 60% — não em todos.",
            "Financiadores estão migrando para financiamento por outcomes: só pagam se o resultado for comprovado. Quem não mede fica fora dessa corrida por capital de impacto."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: SROI e Métricas — Quanto Vale o Impacto que Você Gera?",
        "description": "O que não é medido não é gerenciado — e no impacto social, o que não é provado não é financiado.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**O mercado de capital de impacto está crescendo — e cada vez mais seletivo**. Fundos de impacto globais movimentam trilhões de dólares, mas exigem mensuração séria. Projetos que medem outcomes com rigor têm acesso a capital de qualidade. Os que não medem competem só por doações.\n\n**Principais Insights:**\n\n- SROI > 3:1 é o benchmark mínimo para capital de impacto competitivo. Gerando Falcões reporta SROI de 6:1 — cada R$ 1 investido gera R$ 6 em valor social mensurável.\n- **Deadweight é honestidade**. Todo projeto tem impacto que teria acontecido sem ele. Quem não desconta o deadweight superestima o SROI e perde credibilidade com auditores.\n- Comece com 3 indicadores: 1 de output (o que entregamos), 1 de outcome (o que mudou) e 1 de contexto (o que aconteceria sem nós). Simples, mas suficiente para começar a provar valor.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "SROI > 3:1 é o benchmark mínimo para capital de impacto competitivo. Gerando Falcões reporta SROI de 6:1 — cada R$ 1 investido gera R$ 6 em valor social mensurável.",
            "Deadweight é honestidade. Todo projeto tem impacto que teria acontecido sem ele. Quem não desconta o deadweight superestima o SROI e perde credibilidade com auditores.",
            "Comece com 3 indicadores: 1 de output (o que entregamos), 1 de outcome (o que mudou) e 1 de contexto (o que aconteceria sem nós). Simples, mas suficiente para começar a provar valor."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Escalando o Impacto — Financiamento e Dilemas Reais",
        "description": "O dilema \"escala vs missão\" é falso — quando você inova no modelo de financiamento.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**O dilema \"escala vs missão\" é falso quando você inova no modelo de financiamento**. A criatividade no negócio de impacto não é só no produto — é em como pagar por ele sem comprometer quem você nasceu para servir. Gerando Falcões prova que é possível crescer rápido sem cobrar do público mais vulnerável.\n\n**Principais Insights:**\n\n- Modelo híbrido resolve o dilema clássico: quem tem capacidade de pagar (empresas) financia quem não tem (beneficiários). O impacto acontece, o beneficiário não paga, a empresa ganha acesso e associação de marca.\n- **Subsídio cruzado é estratégia, não filantropia**. Cobrar mais de quem pode pagar para subsidiar quem não pode é o modelo do Nubank, da Natura e de centenas de negócios de impacto pelo mundo.\n- Governança protege a missão quando chega o investidor. Antes de aceitar capital, defina por escrito: quais aspectos da missão são não-negociáveis independente de pressão financeira.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Modelo híbrido resolve o dilema clássico: quem tem capacidade de pagar (empresas) financia quem não tem (beneficiários). O impacto acontece, o beneficiário não paga, a empresa ganha acesso e associação de marca.",
            "Subsídio cruzado é estratégia, não filantropia. Cobrar mais de quem pode pagar para subsidiar quem não pode é o modelo do Nubank, da Natura e de centenas de negócios de impacto pelo mundo.",
            "Governança protege a missão quando chega o investidor. Antes de aceitar capital, defina por escrito: quais aspectos da missão são não-negociáveis independente de pressão financeira.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M7-S2",
    "code": "M7-1",
    "title": "Teologia e Sociedade",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Os 4 Princípios da Doutrina Social — A Base Ética dos Negócios",
        "description": "Dignidade humana, bem comum, subsidiariedade e solidariedade: o framework ético que governa decisões quando o lucro e as pessoas entram em conflito.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Princípios éticos são ativos estratégicos de longo prazo**. Empresas que os tratam como \"custo\" acumulam passivos invisíveis que eventualmente se tornam visíveis — em litígios, desengajamento ou colapso reputacional.\n\n**Principais Insights:**\n\n- A pergunta não é \"ética ou lucro\" — é \"que tipo de empresa quero ser em 10 anos?\". Curto prazo recompensa violações; longo prazo penaliza.\n- **Dignidade é inegociável**. Você pode negociar preço, prazo, escopo. Não pode negociar como trata seres humanos sem pagar um preço invisível.\n- Subsidiariedade é eficiência: equipes que resolvem seus próprios problemas são mais rápidas e comprometidas do que hierarquias que centralizam tudo.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "A pergunta não é \"ética ou lucro\" — é \"que tipo de empresa quero ser em 10 anos?\". Curto prazo recompensa violações; longo prazo penaliza.",
            "Dignidade é inegociável. Você pode negociar preço, prazo, escopo. Não pode negociar como trata seres humanos sem pagar um preço invisível.",
            "Subsidiariedade é eficiência: equipes que resolvem seus próprios problemas são mais rápidas e comprometidas do que hierarquias que centralizam tudo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Liderança Servidora — Poder a Serviço das Pessoas",
        "description": "Robert Greenleaf inverteu a pirâmide: o líder existe para servir a equipe, não o contrário. As 5 características que separam líderes servidores de líderes tradicionais.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**A pergunta do líder servidor não é \"como posso usar minha equipe para atingir resultados?\" — é \"como posso servir minha equipe para que ela entregue o melhor que pode?\"**. A diferença parece sutil; os resultados de longo prazo são dramáticos.\n\n**Principais Insights:**\n\n- Segurança psicológica é pré-requisito da inovação. Times com medo de errar param de tentar. Times onde o erro é aprendizado experimentam mais — e inovam mais.\n- **O teste real da liderança servidora**: sua equipe cresce com você? Se os melhores talentos estão saindo, a resposta é não — independente do que você acredita sobre si mesmo.\n- Liderança servidora não é fraqueza. Greenleaf foi claro: o servidor-líder tem visão clara e coragem de defender princípios. Servir não é ceder — é colocar o outro antes do ego.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Segurança psicológica é pré-requisito da inovação. Times com medo de errar param de tentar. Times onde o erro é aprendizado experimentam mais — e inovam mais.",
            "O teste real da liderança servidora: sua equipe cresce com você? Se os melhores talentos estão saindo, a resposta é não — independente do que você acredita sobre si mesmo.",
            "Liderança servidora não é fraqueza. Greenleaf foi claro: o servidor-líder tem visão clara e coragem de defender princípios. Servir não é ceder — é colocar o outro antes do ego."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Decisões Éticas em Crise — Quando Não Há Resposta Fácil",
        "description": "Três frameworks para navegar dilemas reais: quando demitir viola dignidade, mas não demitir ameaça a empresa. Como decidir com ética quando tudo parece errado.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Ética não é ausência de dilemas — é a qualidade do processo de decisão quando os dilemas aparecem**. Os 3 filtros não eliminam a dificuldade; estruturam a reflexão para que decisões difíceis sejam tomadas com consciência e responsabilidade.\n\n**Principais Insights:**\n\n- Dilemas éticos reais não têm resposta perfeita — têm respostas melhores e piores. Os 3 filtros revelam qual opção tem mais integridade no processo de decisão.\n- **O filtro do espelho é prático**: se você precisaria esconder a decisão, a forma ou o raciocínio — algo está errado. Transparência é o proxy mais simples de integridade.\n- Decisões éticas custam no curto prazo (Tylenol custou US$ 100M). O retorno vem em confiança, reputação e cultura — ativos que levam anos para construir e dias para destruir.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Dilemas éticos reais não têm resposta perfeita — têm respostas melhores e piores. Os 3 filtros revelam qual opção tem mais integridade no processo de decisão.",
            "O filtro do espelho é prático: se você precisaria esconder a decisão, a forma ou o raciocínio — algo está errado. Transparência é o proxy mais simples de integridade.",
            "Decisões éticas custam no curto prazo (Tylenol custou US$ 100M). O retorno vem em confiança, reputação e cultura — ativos que levam anos para construir e dias para destruir."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Propósito Organizacional — Do Discurso à Prática",
        "description": "Toda empresa tem um propósito declarado. Poucas têm um propósito real. Como identificar a diferença — e o que construir quando há desalinhamento.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Propósito é o que você protege quando custa algo**. Toda empresa tem valores escritos em parede e site. O que diferencia é o que acontece quando esses valores entram em conflito com pressão de resultados, com conveniência, com oportunidade. Nesses momentos — e só nesses — o propósito real se revela.\n\n**Principais Insights:**\n\n- O teste definitivo do propósito: o que a empresa faz quando ninguém está olhando? Quando é caro manter os valores? Quando é conveniente abandoná-los? A resposta é o propósito real.\n- **Alocação de orçamento não mente**. Se quiser saber o que uma empresa realmente valoriza, leia o relatório financeiro — não o relatório de sustentabilidade. Dinheiro é o voto mais honesto.\n- Propósito institucional é mais robusto que propósito pessoal. Se o propósito da empresa depende do CEO atual, é frágil. O objetivo é criar cultura que persiste independente de quem lidera.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "O teste definitivo do propósito: o que a empresa faz quando ninguém está olhando? Quando é caro manter os valores? Quando é conveniente abandoná-los? A resposta é o propósito real.",
            "Alocação de orçamento não mente. Se quiser saber o que uma empresa realmente valoriza, leia o relatório financeiro — não o relatório de sustentabilidade. Dinheiro é o voto mais honesto.",
            "Propósito institucional é mais robusto que propósito pessoal. Se o propósito da empresa depende do CEO atual, é frágil. O objetivo é criar cultura que persiste independente de quem lidera.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M7-S3",
    "code": "M7-2",
    "title": "Projeto de Intervencao em Negocios",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: As 4 Ferramentas de Diagnóstico — Mapeie Antes de Agir",
        "description": "Ishikawa, 5 Porquês, Matriz GUT e PDCA: cada ferramenta ataca o problema de um ângulo diferente. Usar a errada é pior que não usar nenhuma.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Diagnóstico correto é metade da solução**. A maioria dos projetos de intervenção falha porque resolve sintomas com velocidade, em vez de resolver causas com precisão. Cada ferramenta tem seu momento — a sequência certa multiplica o resultado.\n\n**Principais Insights:**\n\n- Sintoma vs. causa-raiz: \"avaliações caindo\" é sintoma. \"Entregadores sem rota otimizada causando atraso\" é causa. Só a segunda gera intervenção que resolve o problema permanentemente.\n- **GUT antes de agir**. Antes de qualquer intervenção, classifique os problemas por Gravidade, Urgência e Tendência. O problema mais urgente raramente é o mais grave — e confundi-los é um erro clássico de gestão.\n- PDCA não é projeto — é mentalidade. Uma intervenção que termina sem ciclo de Check e Act é uma aposta, não uma melhoria. Meça sempre, ajuste sempre.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Sintoma vs. causa-raiz: \"avaliações caindo\" é sintoma. \"Entregadores sem rota otimizada causando atraso\" é causa. Só a segunda gera intervenção que resolve o problema permanentemente.",
            "GUT antes de agir. Antes de qualquer intervenção, classifique os problemas por Gravidade, Urgência e Tendência. O problema mais urgente raramente é o mais grave — e confundi-los é um erro clássico de gestão.",
            "PDCA não é projeto — é mentalidade. Uma intervenção que termina sem ciclo de Check e Act é uma aposta, não uma melhoria. Meça sempre, ajuste sempre."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Os 5 Porquês — Da Causa Aparente à Causa Raiz",
        "description": "A Toyota transformou qualidade industrial com uma técnica simples: pergunte por quê cinco vezes. A causa que parece óbvia é quase sempre apenas o primeiro nível de um problema mais profundo.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**A causa-raiz é identificada quando a intervenção resolve o problema permanentemente — não quando parece convincente**. O teste real não é \"faz sentido?\" — é \"o problema volta se não mantivermos a intervenção?\" Se volta, não chegou à raiz.\n\n**Principais Insights:**\n\n- O 5º por quê é onde mora o dinheiro. Empresas que treinam, treinam e treinam para o mesmo problema nunca perguntaram por que o treinamento não resolve. A raiz está no sistema, não na pessoa.\n- **Causa-raiz vs. sintoma: o teste da recorrência**. Se o problema volta quando você para a intervenção, você tratou o sintoma. Se não volta, chegou à raiz. Simples — e raramente aplicado.\n- Atenção: 5 Porquês pode gerar falsos positivos em problemas complexos. Se você encontra causas completamente diferentes em cada ramo, use Ishikawa primeiro para mapear e depois aprofunde o ramo mais relevante.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "raiz é identificada quando a intervenção resolve o problema permanentemente — não quando parece convincente. O teste real não é \"faz sentido?\" — é \"o problema volta se não mantivermos a intervenção?\" Se volta, não chegou à raiz.",
            "O 5º por quê é onde mora o dinheiro. Empresas que treinam, treinam e treinam para o mesmo problema nunca perguntaram por que o treinamento não resolve. A raiz está no sistema, não na pessoa.",
            "Causa-raiz vs. sintoma: o teste da recorrência. Se o problema volta quando você para a intervenção, você tratou o sintoma. Se não volta, chegou à raiz. Simples — e raramente aplicado.",
            "Atenção: 5 Porquês pode gerar falsos positivos em problemas complexos. Se você encontra causas completamente diferentes em cada ramo, use Ishikawa primeiro para mapear e depois aprofunde o ramo mais relevante."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: 5W2H — Transforme Diagnóstico em Plano de Ação",
        "description": "Sete perguntas que transformam uma boa ideia em um projeto executável: o que, por que, onde, quando, quem, como e quanto. Sem qualquer uma delas, o plano tem brechas.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Um projeto de intervenção sem as 7 respostas do 5W2H não é um projeto — é uma intenção**. A diferença prática: intenções não têm responsável, prazo ou orçamento. Projetos têm. E apenas projetos são executados, medidos e melhorados.\n\n**Principais Insights:**\n\n- O WHO com nome específico é a pergunta mais importante. \"A equipe\" não é responsável. \"Marcos Alves, gerente de operações, responde toda sexta\" — esse projeto acontece.\n- **Marcos intermediários salvam projetos**. Um projeto de 60 dias sem marco intermediário só descobre o problema no dia 59. Dois marcos = duas oportunidades de corrigir o rumo antes do prazo final.\n- HOW MUCH não é burocracia — é comprometimento. Estimar custo força o responsável a pensar na execução real, não em um cenário ideal. Projeto sem custo estimado não foi pensado seriamente.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "O WHO com nome específico é a pergunta mais importante. \"A equipe\" não é responsável. \"Marcos Alves, gerente de operações, responde toda sexta\" — esse projeto acontece.",
            "Marcos intermediários salvam projetos. Um projeto de 60 dias sem marco intermediário só descobre o problema no dia 59. Dois marcos = duas oportunidades de corrigir o rumo antes do prazo final.",
            "HOW MUCH não é burocracia — é comprometimento. Estimar custo força o responsável a pensar na execução real, não em um cenário ideal. Projeto sem custo estimado não foi pensado seriamente."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: PDCA — Execute, Meça e Melhore Continuamente",
        "description": "Plan → Do → Check → Act: o ciclo que transformou o Japão na potência industrial do século XX. Toda intervenção sem PDCA é um experimento que não aprende com seus resultados.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**PDCA não é metodologia — é disciplina**. A maioria das empresas faz o Plan (às vezes) e o Do (sempre). Raramente faz o Check com rigor. Quase nunca faz o Act de forma sistemática. O ciclo só funciona completo — e só gera vantagem competitiva quando é repetido consistentemente.\n\n**Principais Insights:**\n\n- Piloto antes de escalar é PDCA na prática. Cada vez que você escala sem testar, está apostando. Cada vez que testa em escopo controlado primeiro, está aprendendo com risco minimizado.\n- **Meça o que importava no Plan, não o que foi fácil de medir**. \"As pessoas gostaram\" é fácil de medir. \"Erros caíram 30%\" é o que importava. O Check que usa a métrica errada é mais perigoso que não medir — porque gera falsa sensação de sucesso.\n- O ciclo do PDCA termina no ACT — que recomeça no PLAN. Não há ponto final em melhoria contínua. Empresas que \"concluem\" o PDCA e param melhoram até o concorrente que não parou superar o padrão atingido.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Piloto antes de escalar é PDCA na prática. Cada vez que você escala sem testar, está apostando. Cada vez que testa em escopo controlado primeiro, está aprendendo com risco minimizado.",
            "Meça o que importava no Plan, não o que foi fácil de medir. \"As pessoas gostaram\" é fácil de medir. \"Erros caíram 30%\" é o que importava. O Check que usa a métrica errada é mais perigoso que não medir — porque gera falsa sensação de sucesso.",
            "O ciclo do PDCA termina no ACT — que recomeça no PLAN. Não há ponto final em melhoria contínua. Empresas que \"concluem\" o PDCA e param melhoram até o concorrente que não parou superar o padrão atingido.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M8-S1",
    "code": "M8-0",
    "title": "Educacao, Identidade e Solidariedade",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Andragogia — Como Adultos Realmente Aprendem",
        "description": "Malcolm Knowles descobriu que adultos aprendem de forma completamente diferente de crianças. Ignorar isso é a razão pela qual treinamentos corporativos custam caro e não mudam nada.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**O ROI de treinamento se mede em mudança de comportamento, não em horas assistidas**. Andragogia não é tendência pedagógica — é respeito pela realidade de como adultos aprendem. Empresas que aplicam isso cortam custo de treinamento e aumentam resultado ao mesmo tempo.\n\n**Principais Insights:**\n\n- A pergunta que transforma qualquer treinamento: \"Qual problema real você vai resolver com isso amanhã?\". Se o facilitador não consegue responder, o treinamento não tem contexto andragógico.\n- **Microlearning > maratonas**. 5 sessões de 15 minutos com aplicação imediata entre elas superam 8 horas contínuas em qualquer métrica de retenção e transferência para a prática.\n- Experiência prévia é o maior ativo da sala. O instrutor que ignora o que os participantes já sabem e viveram está desperdiçando o recurso mais valioso disponível — e criando ressentimento no processo.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "A pergunta que transforma qualquer treinamento: \"Qual problema real você vai resolver com isso amanhã?\". Se o facilitador não consegue responder, o treinamento não tem contexto andragógico.",
            "Microlearning > maratonas. 5 sessões de 15 minutos com aplicação imediata entre elas superam 8 horas contínuas em qualquer métrica de retenção e transferência para a prática.",
            "Experiência prévia é o maior ativo da sala. O instrutor que ignora o que os participantes já sabem e viveram está desperdiçando o recurso mais valioso disponível — e criando ressentimento no processo."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: As 5 Disciplinas da Organização que Aprende",
        "description": "Peter Senge identificou em 1990 as 5 capacidades que separam empresas que evoluem das que se tornam obsoletas. A mais importante integra todas as outras — e é a mais ignorada.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**A organização que para de aprender começa a morrer — mesmo que o balanço ainda esteja positivo**. A Kodak tinha lucro recorde quando ignorou a fotografia digital. A Nokia dominava o mercado quando ignorou os smartphones. Aprender mais rápido que o ambiente muda não é vantagem — é sobrevivência.\n\n**Principais Insights:**\n\n- Identifique a disciplina mais fraca — ela é o gargalo real. Fortalecer as outras sem resolver o gargalo é investimento de baixo retorno. Uma empresa com ótimo domínio pessoal mas sem visão compartilhada tem 200 talentos puxando em 200 direções.\n- **Pensamento sistêmico é a mais ignorada e a mais crítica**. Eventos isolados (vendas caindo, turnover subindo, custo aumentando) raramente são problemas independentes. São sintomas de dinâmicas sistêmicas. Quem não enxerga o sistema atrás dos eventos está sempre apagando incêndios.\n- Aprendizagem em equipe começa com diálogo — suspender julgamento para explorar juntos. Reunião que só debate (cada um defende sua posição) ou só cobra (accountability sem aprendizado) não é aprendizagem em equipe.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Identifique a disciplina mais fraca — ela é o gargalo real. Fortalecer as outras sem resolver o gargalo é investimento de baixo retorno. Uma empresa com ótimo domínio pessoal mas sem visão compartilhada tem 200 talentos puxando em 200 direções.",
            "Pensamento sistêmico é a mais ignorada e a mais crítica. Eventos isolados (vendas caindo, turnover subindo, custo aumentando) raramente são problemas independentes. São sintomas de dinâmicas sistêmicas. Quem não enxerga o sistema atrás dos eventos está sempre apagando incêndios.",
            "Aprendizagem em equipe começa com diálogo — suspender julgamento para explorar juntos. Reunião que só debate (cada um defende sua posição) ou só cobra (accountability sem aprendizado) não é aprendizagem em equipe."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Cultura Organizacional — Os 3 Níveis de Schein",
        "description": "Edgar Schein revelou que a cultura real de uma empresa opera em 3 camadas. As duas primeiras são visíveis. A terceira — a que realmente governa o comportamento — é invisível. E é a mais poderosa.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Cultura não é o que está escrito — é o que acontece quando ninguém está olhando**. E mais revelador ainda: o que acontece quando alguém erra, quando há conflito entre valores e resultados, quando a pressão chega. Nesses momentos, os pressupostos básicos emergem com clareza — e mostram a cultura real.\n\n**Principais Insights:**\n\n- O diagnóstico mais rápido de cultura: pergunte \"o que acontece quando alguém comete um erro aqui?\". A resposta (honesta, não a oficial) revela o pressuposto básico mais importante da empresa.\n- **Mudar cultura começa pelos pressupostos, não pelos artefatos**. Nova logo, novo escritório, novo manual de valores — nada disso muda cultura. O que muda: o que é recompensado, o que é punido, o que os líderes modelam no dia a dia.\n- Gap entre valores declarados e pressupostos reais é percebido pelos funcionários em semanas e pelos clientes em meses. Essa contradição corrói confiança e engajamento — silenciosamente, mas consistentemente.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "O diagnóstico mais rápido de cultura: pergunte \"o que acontece quando alguém comete um erro aqui?\". A resposta (honesta, não a oficial) revela o pressuposto básico mais importante da empresa.",
            "Mudar cultura começa pelos pressupostos, não pelos artefatos. Nova logo, novo escritório, novo manual de valores — nada disso muda cultura. O que muda: o que é recompensado, o que é punido, o que os líderes modelam no dia a dia.",
            "Gap entre valores declarados e pressupostos reais é percebido pelos funcionários em semanas e pelos clientes em meses. Essa contradição corrói confiança e engajamento — silenciosamente, mas consistentemente."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: Missão, Visão e Valores — Do Genérico ao Genuíno",
        "description": "Toda empresa tem missão, visão e valores. Poucas têm os genuínos. O teste: esses elementos orientam decisões difíceis — ou são decoração de parede?",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Missão, visão e valores genuínos são os que você seria capaz de defender quando custam algo**. Qualquer empresa consegue ter valores quando é conveniente. O teste real é o que a empresa faz quando o valor entra em conflito com a oportunidade — e o custo de honrar o valor é alto.\n\n**Principais Insights:**\n\n- Missão genuína é específica e excludente. Se a missão não exclui clientes, projetos ou parceiros que não se encaixam, ela não está orientando decisão nenhuma. Missão que serve para tudo não serve para nada.\n- **Valores sem consequência são decoração**. Valor praticado = existe prova de que a empresa tomou decisão custosa para honrá-lo. Sem essa prova, o valor existe apenas no discurso — e os funcionários sabem disso antes da primeira semana.\n- A Enron nos ensinou a lição mais cara: palavras bonitas em valores declarados não protegem contra comportamento contraditório. O que protege são sistemas, processos e lideranças que tornam o desvio visível e custoso.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Missão genuína é específica e excludente. Se a missão não exclui clientes, projetos ou parceiros que não se encaixam, ela não está orientando decisão nenhuma. Missão que serve para tudo não serve para nada.",
            "Valores sem consequência são decoração. Valor praticado = existe prova de que a empresa tomou decisão custosa para honrá-lo. Sem essa prova, o valor existe apenas no discurso — e os funcionários sabem disso antes da primeira semana.",
            "A Enron nos ensinou a lição mais cara: palavras bonitas em valores declarados não protegem contra comportamento contraditório. O que protege são sistemas, processos e lideranças que tornam o desvio visível e custoso.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
  {
    "id": "M8-S2",
    "code": "M8-1",
    "title": "Pesquisa Aplicada a Negocios",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Quanti vs Quali — Escolha o Método Certo para Cada Pergunta",
        "description": "Pesquisa quantitativa diz O QUE e QUANTO. Qualitativa diz POR QUÊ. Usar o método errado é mais prejudicial do que não pesquisar — gera falsa certeza.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Pesquisa ruim é mais perigosa que nenhuma pesquisa**. Ela gera certeza falsa. A empresa que pesquisa 10 amigos e conclui que há mercado, ou que faz focus group e projeta demanda — está tomando decisão de risco com sensação de segurança. Método correto primeiro, dados depois.\n\n**Principais Insights:**\n\n- A sequência correta: quali (entende o problema) → quanti (valida a escala) → experimental (testa a solução). Pular etapas economiza tempo no curto prazo e cria erros caros no médio.\n- **Intenção declarada ≠ comportamento real**. Esse é o viés mais caro da pesquisa de mercado. As pessoas dizem o que acham que deveriam dizer — ou o que imaginam que fariam. O A/B test e a observação revelam o que realmente fazem.\n- Amostra importa mais que tamanho. 20 entrevistas com o público correto superam 500 questionários com o público errado. A questão não é quantos responderam — é se os que responderam representam quem você precisa entender.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "A sequência correta: quali (entende o problema) → quanti (valida a escala) → experimental (testa a solução). Pular etapas economiza tempo no curto prazo e cria erros caros no médio.",
            "Intenção declarada ≠ comportamento real. Esse é o viés mais caro da pesquisa de mercado. As pessoas dizem o que acham que deveriam dizer — ou o que imaginam que fariam. O A/B test e a observação revelam o que realmente fazem.",
            "Amostra importa mais que tamanho. 20 entrevistas com o público correto superam 500 questionários com o público errado. A questão não é quantos responderam — é se os que responderam representam quem você precisa entender."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "2: Desenhando Pesquisa de Qualidade — Do Problema à Conclusão",
        "description": "Uma pesquisa mal desenhada produz dados que confirmam o que você já acredita. Cinco etapas para construir pesquisa que revela o que você precisa saber — não o que quer ouvir.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**Pesquisa que confirma o que você já acredita não é pesquisa — é validação de viés**. O valor real da pesquisa está em revelar o que você não sabe e potencialmente não quer saber. Hipóteses escritas antes da coleta e perguntas neutras são os dois principais antídotos contra pesquisa que confirma em vez de investigar.\n\n**Principais Insights:**\n\n- Escreva as hipóteses antes de escrever as perguntas. Se você escrever as perguntas primeiro, elas já estarão enviesadas pelo que você acredita. A hipótese explícita te força a testar — não a confirmar.\n- **Pergunta de pesquisa ≠ pergunta de instrumento**. \"Por que alunos cancelam?\" é a pergunta de pesquisa. \"Qual foi o principal motivo do cancelamento?\" é a pergunta do instrumento. Confundir as duas gera pesquisa que responde a si mesma.\n- Inclua na amostra quem você menos quer ouvir. Ex-clientes, detratores, quem recusou comprar. São eles que revelam o que precisa mudar — não os fãs que já compraram.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Escreva as hipóteses antes de escrever as perguntas. Se você escrever as perguntas primeiro, elas já estarão enviesadas pelo que você acredita. A hipótese explícita te força a testar — não a confirmar.",
            "Pergunta de pesquisa ≠ pergunta de instrumento. \"Por que alunos cancelam?\" é a pergunta de pesquisa. \"Qual foi o principal motivo do cancelamento?\" é a pergunta do instrumento. Confundir as duas gera pesquisa que responde a si mesma.",
            "Inclua na amostra quem você menos quer ouvir. Ex-clientes, detratores, quem recusou comprar. São eles que revelam o que precisa mudar — não os fãs que já compraram."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "3: Os 4 Níveis de Análise de Dados — Onde Sua Empresa Está?",
        "description": "Descritiva, diagnóstica, preditiva e prescritiva: cada nível adiciona mais valor à decisão. A maioria das empresas brasileiras está presa no primeiro nível — e chama isso de \"análise de dados\".",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**A maioria das empresas investe em BI e recebe relatórios mais bonitos do mesmo nível descritivo**. O salto de valor está na progressão: descritiva → diagnóstica → preditiva → prescritiva. Cada nível requer o anterior funcionando bem. Antes de contratar cientista de dados, certifique-se que os dados do nível 1 são confiáveis.\n\n**Principais Insights:**\n\n- Dado sem decisão é custo. Para cada análise produzida, exija: \"qual decisão isso habilita?\" Se a resposta for \"nenhuma — é só informação\", o nível ainda é descritivo independente da complexidade do modelo.\n- **O gargalo mais comum é a qualidade dos dados básicos**. Machine learning treinado em dados inconsistentes gera predições piores que intuição humana. Antes de subir de nível, limpe e valide os dados do nível atual.\n- Diagnóstica é o nível de maior ROI para a maioria das empresas brasileiras. A passagem de \"vendas caíram\" para \"vendas caíram porque X\" já habilita decisões muito melhores — sem precisar de Python ou IA.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "se que os dados do nível 1 são confiáveis.",
            "Dado sem decisão é custo. Para cada análise produzida, exija: \"qual decisão isso habilita?\" Se a resposta for \"nenhuma — é só informação\", o nível ainda é descritivo independente da complexidade do modelo.",
            "O gargalo mais comum é a qualidade dos dados básicos. Machine learning treinado em dados inconsistentes gera predições piores que intuição humana. Antes de subir de nível, limpe e valide os dados do nível atual.",
            "Diagnóstica é o nível de maior ROI para a maioria das empresas brasileiras. A passagem de \"vendas caíram\" para \"vendas caíram porque X\" já habilita decisões muito melhores — sem precisar de Python ou IA."
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      },
      {
        "title": "4: LTV, CAC e Churn — As 3 Métricas que Definem a Saúde do Negócio",
        "description": "Um negócio saudável tem LTV > 3× CAC e churn abaixo de 3% ao mês. Fora desses parâmetros, crescimento é aceleração para o buraco. Entenda por que e como calcular.",
        "subsections": [
          {
            "title": "Síntese e Fechamento",
            "content": "**LTV > 3× CAC é a regra de ouro — não uma aspiração**. Abaixo dela, crescimento é aceleração do problema. Churn é o multiplicador invisível: reduzir churn de 5% para 2% ao mês dobra o LTV sem tocar em nenhum outro parâmetro. Em negócios recorrentes, a batalha mais importante é retenção — não aquisição.\n\n**Principais Insights:**\n\n- Churn é o vilão silencioso. Uma empresa com churn de 8%/mês que cresce 10% ao mês está encolhendo — só não percebe porque novos clientes mascaram a perda dos antigos. Calcule sempre: novos clientes > clientes perdidos?\n- **LTV/CAC < 1 significa que o modelo de negócio está errado — não a execução**. Se você gasta mais para adquirir do que ganha com o cliente, nenhuma melhoria operacional resolve. O modelo precisa mudar antes de qualquer escala.\n- A alavanca de maior ROI geralmente é o churn, não o CAC. Reduzir CAC em 20% melhora o ratio em 25%. Reduzir churn em 50% pode dobrar o LTV. Onde você investe primeiro define o resultado.",
            "quote": "",
            "studyCase": undefined,
            "deepDive": ""
          }
        ],
        "synthesis": {
          "title": "Síntese Estratégica",
          "bullets": [
            "Churn é o vilão silencioso. Uma empresa com churn de 8%/mês que cresce 10% ao mês está encolhendo — só não percebe porque novos clientes mascaram a perda dos antigos. Calcule sempre: novos clientes > clientes perdidos?",
            "LTV/CAC < 1 significa que o modelo de negócio está errado — não a execução. Se você gasta mais para adquirir do que ganha com o cliente, nenhuma melhoria operacional resolve. O modelo precisa mudar antes de qualquer escala.",
            "A alavanca de maior ROI geralmente é o churn, não o CAC. Reduzir CAC em 20% melhora o ratio em 25%. Reduzir churn em 50% pode dobrar o LTV. Onde você investe primeiro define o resultado.",
            "--"
          ],
          "insights": [
            "Alinhamento operacional imediato",
            "Rigor analítico na governança"
          ]
        }
      }
    ]
  },
{
  "id": "M4-S1",
  "code": "M4-0",
  "title": "Inovacao, Transformacao e Ferramentas Digitais",
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
      "title": "1: Era Digital · As 3 Fases da Tecnologia",
      "description": "Como o papel da TI mudou nas empresas — de bastidor operacional a coração do negócio",
      "subsections": [
        {
          "title": "A Evolução em Três Fases",
          "content": "A evolução da tecnologia nas empresas pode ser segmentada em três fases distintas. Cada fase redefiniu o papel da TI dentro do negócio — de bastidor operacional a coração estratégico. Entender em qual fase sua empresa está hoje é o primeiro passo para qualquer transformação digital real.\n\nNão são degraus de uma escada — são **modos de operar**. O que importa é reconhecer onde está o centro de gravidade da sua TI hoje.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        },
        {
          "title": "Fase 1 — Infraestrutura (Anos 2000)",
          "content": "Foco na estabilidade de servidores e redes operacionais. A TI era setor de suporte: o sucesso era medido em **uptime**, não em receita. Manter os sistemas no ar para que o negócio acontecesse era a função inteira. Investir em tecnologia significava comprar hardware, contratar suporte e rezar para nada cair.",
          "quote": "Estudo de Caso — Banco do Brasil (2003):",
          "studyCase": {
            "title": "Banco do Brasil (2003)",
            "body": "R$ 2 bilhões investidos em datacenter para sustentar 5.000 agências em rede. Cada hora de queda custava R$ 40 milhões em transações perdidas. TI era custo necessário, não diferencial competitivo."
          },
          "deepDive": "O paradoxo da Fase 1: TI virou pré-requisito de existir, não diferencial de competir. A consequência inevitável foi a corrida para a Fase 2 — quando estabilidade já era esperada e o jogo passou a ser eficiência."
        },
        {
          "title": "Fase 2 — Processo (Anos 2010)",
          "content": "Integração de sistemas como **ERPs** e CRMs no cotidiano da gestão. A informação para de morrer em planilhas isoladas e começa a fluir entre setores. A TI vira ferramenta de organização e padronização — mas ainda a serviço de um modelo de negócio existente. Aqui a pergunta dos diretores muda: \"como otimizar?\".",
          "quote": "Estudo de Caso — Natura (2012):",
          "studyCase": {
            "title": "Natura (2012)",
            "body": "Integração de 7 países sob um único SAP. Decisões logísticas que levavam semanas viraram horas. Planilhas regionais viraram dashboards globais — mas a operação continuava sendo venda direta + varejo, só que mais rápida e auditável."
          },
          "deepDive": "A Fase 2 entrega eficiência mas não cria modelos de negócio novos. O teto da Fase 2 é o quanto o modelo antigo aguenta — quando a digitalização chega no limite, ou se rompe o modelo (Fase 3) ou se estagna."
        },
        {
          "title": "Fase 3 — Estratégia (Anos 2020 →)",
          "content": "A tecnologia define a criação de produtos, o atendimento ao cliente e a capacidade de inovar — tornando-se pilar de competitividade e reputação. A TI deixa de ser área de apoio e vira o próprio negócio. Dados, algoritmos e **efeitos de rede** criam vantagens que se auto-reforçam: mais usuários geram mais dados, que melhoram o algoritmo, que atrai mais usuários.\n\nA pergunta que separa empresas que sobrevivem das que lideram não é \"qual tecnologia adotar?\" — é \"em qual fase estamos hoje, e em qual fase o mercado ao redor já chegou?\". A diferença entre as duas respostas é o **gap** que precisa ser fechado. E quanto maior o gap, mais doloroso o salto.\n\nEmpresas que operam em fase de Processo enquanto o mercado está em fase de Estratégia perdem competitividade de forma sistemática e silenciosa. O problema é que essa perda é **invisível** até que um concorrente digital capture seus clientes. O custo de ficar parado é composto: enquanto uma empresa estagnada perde eficiência linearmente (5-8% ao ano), seus concorrentes digitalizados crescem exponencialmente via efeitos de rede.",
          "quote": "Estudo de Caso — iFood (2023):",
          "studyCase": {
            "title": "iFood (2023)",
            "body": "R$ 100 bilhões/ano movimentados sem cozinha própria nem motoboy próprio. A plataforma é o produto. Sem o algoritmo de matching e a infraestrutura digital, simplesmente não existe negócio para operar."
          },
          "deepDive": "A Fase 3 inverte o jogo: TI deixa de ser custo a se controlar e vira ativo a se multiplicar. Mover-se entre fases não é só comprar tecnologia nova — é repensar o papel da TI dentro da empresa. Esse repensar — essa mudança de identidade da organização — é o que se chama Transformação Digital."
        },
        {
          "title": "Síntese e Fechamento",
          "content": "**TI deixa de ser bastidor** quando dados e algoritmos criam vantagens que se auto-reforçam.\n\nNão existe atalho entre fases — cada salto exige redesenhar o papel da tecnologia, não só comprar mais dela.\n\nO risco maior não é estar atrasado, é **não saber em qual fase você está** hoje.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        }
      ],
      "synthesis": {
        "title": "Síntese Estratégica",
        "bullets": [
          "TI deixa de ser bastidor quando dados e algoritmos criam vantagens que se auto-reforçam.",
          "Não existe atalho entre fases — cada salto exige redesenhar o papel da tecnologia, não só comprar mais dela.",
          "O risco maior não é estar atrasado, é não saber em qual fase você está hoje."
        ],
        "insights": [
          "Banco do Brasil Fase 1: R$ 2B em datacenter — TI como custo, não como diferencial",
          "iFood Fase 3: R$ 100B/ano sem ativo físico próprio — plataforma é o negócio"
        ]
      }
    },
    {
      "title": "2: Transformação Digital",
      "description": "Não é comprar tecnologia — é repensar como a empresa cria e entrega valor",
      "subsections": [
        {
          "title": "O que é Transformação Digital (e o que NÃO é)",
          "content": "A transformação digital é o processo de integração de tecnologias digitais em todas as áreas de uma organização, mudando a forma como ela opera e entrega valor aos seus clientes. Não se trata apenas de implementar novas tecnologias, mas de uma **mudança cultural** que exige que as organizações desafiem continuamente o status quo, experimentem e se sintam confortáveis com o fracasso.\n\nAqui é fundamental distinguir três conceitos que costumam ser confundidos — e a confusão custa bilhões em investimentos mal direcionados:\n\n- **Digitização**: converter papel em PDF — condição necessária mas insuficiente\n- **Digitalização**: automatizar fluxos usando tecnologia — o processo continua o mesmo, só fica mais rápido\n- **Transformação Digital**: fundamentalmente repensar o modelo de negócio e a proposta de valor usando capacidades digitais",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Segundo IBGE (PINTEC 2020) e pesquisas do Sebrae, apenas 23% das PMEs brasileiras utilizam algum sistema integrado, e menos de 5% utilizam dados para decisão (CETIC.br, TIC Empresas 2022). A maioria ainda está na digitização."
        },
        {
          "title": "Os 4 Domínios da Transformação (Rogers, Columbia 2016)",
          "content": "David Rogers (Columbia Business School, 2016) identificou 4 domínios que devem ser transformados **simultaneamente**, não sequencialmente:\n\n**Clientes**: De audiência passiva a rede ativa que co-cria valor. Não pergunte o que querem — observe o que fazem. Nubank: 80M de clientes sem agência, CAC R$ 30-50 vs R$ 800+ bancário tradicional.\n\n**Competição**: Não vem mais só do setor. Plataformas redefinem fronteiras — iFood compete com restaurantes E com supermercados. GMV de R$ 100B sem cozinha própria.\n\n**Dados**: De subproduto caro a ativo estratégico sempre ligado. Quem não decide por dados decide por opinião. Mercado Livre: 2B+ eventos/dia, personalização em tempo real para 200M+ usuários.\n\n**Inovação**: De produto acabado a MVP contínuo. Lançar rápido, medir, iterar. Falhar barato e cedo. Google Design Sprint: ciclo de 5 dias para validar ideias.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Rogers: os 4 domínios devem ser transformados simultaneamente — transformar só clientes sem transformar dados e inovação cria desalinhamento estratégico caro."
        },
        {
          "title": "Teoria da Inovação Aplicada a Negócios",
          "content": "**Joseph Schumpeter (1942)** cunhou o conceito de destruição criativa — a inovação como motor do capitalismo que destrói o velho para criar o novo. Toda empresa que inova canibaliza algo que existia antes. A Kodak inventou a câmera digital mas não canibalizou o filme — e faliu. O Nubank canibalizou a agência bancária — e virou o maior banco digital do mundo fora da China.\n\n**Clayton Christensen (Harvard, 1997)** separou inovação em tipos: incremental (melhorar o que existe — Havaianas reinventando design), radical (criar categoria nova — PIX substituindo TED/DOC) e disruptiva (começar por baixo e dominar — Nubank atendendo quem bancos tradicionais ignoravam). Distinção crítica: iPhone NÃO é disruptivo por Christensen — nasceu premium. Disruptiva começa simples e barata.\n\n**Eric Ries (2011)** propôs o Lean Startup: construir-medir-aprender. Em vez de planejar 2 anos e lançar produto acabado, lançar o MVP em semanas, medir o que funciona e iterar.\n\n**Chan Kim e Renée Mauborgne (INSEAD, 2005)**: Estratégia do Oceano Azul — criar mercado novo onde não há concorrência. O iFood não competiu com restaurantes — criou uma nova categoria de consumo.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Henry Chesbrough (Berkeley, 2003) introduziu a inovação aberta: empresas não precisam inovar sozinhas. Podem importar ideias de fora (universidades, startups, fornecedores). O oposto — inovação fechada — é o modelo que matou a Kodak."
        },
        {
          "title": "Frameworks Prescritivos: Como Executar",
          "content": "**OKRs** (Objectives and Key Results) — framework usado por Google, Nubank e iFood para alinhar inovação com resultado. Objetivo = o que quero alcançar. Key Results = como vou medir. Diferente de KPIs tradicionais, OKRs são ambiciosos por definição — atingir 70% já é sucesso.\n\n**Design Sprint** (Google Ventures, 2016) — método de 5 dias para validar uma ideia sem construir produto: mapear o problema (segunda), desenhar soluções (terça), decidir a melhor (quarta), prototipar (quinta), testar com usuários (sexta).\n\n**Agile/Scrum** não é metodologia de TI — é cultura organizacional. Ciclos curtos (sprints de 2 semanas), entrega contínua, feedback do cliente a cada ciclo. Spotify organizou equipes em squads (times autônomos de 6-8 pessoas). No Brasil, a Magazine Luiza adotou squads para transformar lojas em plataforma.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "A sinergia entre Sistemas de Gestão da Inovação (SGI) e Transformação Digital: o SGI estrutura processos para alta incerteza, a TD fornece ferramentas para potencializar esses sistemas. Empresas que integram os dois domínios reportam ciclos de inovação 40% mais curtos e taxa de sucesso de novos projetos 2x maior."
        },
        {
          "title": "Síntese e Fechamento",
          "content": "Transformação digital não é sobre comprar tecnologia — é sobre **repensar como a empresa cria e entrega valor**.\n\n**Principais Insights:**\n\n- Digitização ≠ Digitalização ≠ Transformação — a confusão custa **bilhões** em investimentos mal direcionados.\n- Rogers (Columbia, 2016): os 4 domínios (Clientes, Competição, Dados, Inovação) devem ser transformados **simultaneamente**.\n- SGI + TD integrados: ciclos de inovação **40% mais curtos**, taxa de sucesso **2x maior**.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        }
      ],
      "synthesis": {
        "title": "Síntese Estratégica",
        "bullets": [
          "Digitização ≠ Digitalização ≠ Transformação — a confusão custa bilhões em investimentos mal direcionados.",
          "SGI + TD integrados geram benefícios em 4 frentes: projetos, processos, cultura e resultados mensuráveis.",
          "Schumpeter: toda inovação canibaliza algo — a Kodak inventou a câmera digital mas não canibalizou o filme."
        ],
        "insights": [
          "Nubank canibalizou a agência bancária e virou o maior banco digital fora da China",
          "Rogers: 4 domínios transformados simultaneamente — não sequencialmente"
        ]
      }
    },
    {
      "title": "3: Governança Digital, Cultura e Gestão da Mudança",
      "description": "Os 4 pilares que sustentam — e os 5 passos que executam",
      "subsections": [
        {
          "title": "O que é Governança Digital e Por que Importa",
          "content": "A governança digital é o conjunto de práticas que garantem que a tecnologia seja usada de maneira **eficiente e alinhada** às estratégias organizacionais. Em um ambiente em que os dados são o principal ativo, não dar o devido valor à governança pode colocar em risco a sustentabilidade de uma organização.\n\nAs principais atribuições da governança digital incluem:\n- **Segurança da informação**: proteger informações sensíveis contra ameaças internas e externas\n- **Alinhamento estratégico**: garantir que o uso da tecnologia esteja alinhado à estratégia de longo prazo\n- **Melhoria da eficiência**: processos automatizados reduzem desperdícios e promovem inovação\n- **Conformidade legal**: LGPD no Brasil e GDPR na Europa tornaram a governança digital essencial",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Pilares são estruturas que mantêm algo em pé — se um falha, a casa desaba. Para a governança digital manter-se sólida, seus pilares devem ser bem construídos e funcionar conjuntamente."
        },
        {
          "title": "Os 4 Pilares da Governança Digital",
          "content": "**Estratégia**: Estabelece como a tecnologia será usada para atingir objetivos. Prioridades, investimentos e indicadores. Não faz sentido investir em tech desalinhada do futuro da empresa. Ambev BEES: +30% em pedidos digitais, 1M+ PDVs conectados.\n\n**Riscos e Segurança**: Identificar, avaliar e mitigar ameaças. Criptografia, 2FA, treinamento contínuo. A maior vulnerabilidade não é técnica — é humana. IBM 2024: custo médio de um breach = US$ 4,88M. Renner perdeu R$ 20M por ransomware em 2021.\n\n**Políticas e Procedimentos**: Regras claras padronizam processos. Quanto mais padronizado, mais fidedignos os dados — e mais seguras as decisões. Inclui uso de dispositivos, acesso a dados sensíveis, escolha de fornecedores. Itaú: relatórios de 5 dias para 2 horas com open data e governança.\n\n**Monitoramento Contínuo**: O monitoramento garante que sistemas sejam ajustados conforme a tecnologia avança. Mercado Livre: 2B+ eventos/dia com auto-scaling sem intervenção humana.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Governança para PME não é burocracia — é evitar que um ransomware apague seus dados, que um ex-funcionário acesse seu CRM, ou que você pague 5 ferramentas para fazer o trabalho de 2."
        },
        {
          "title": "Cultura Organizacional e Gestão da Mudança",
          "content": "A tecnologia é apenas um dos componentes da transformação digital; o **fator humano** e a cultura organizacional representam os maiores desafios e, simultaneamente, os maiores facilitadores do sucesso.\n\nAs barreiras mais comuns incluem:\n- Medo do erro, resistência à mudança e punição ao fracasso — inibem a experimentação necessária\n- Culturas centralizadoras que inibem o protagonismo dos colaboradores\n- Desalinhamento entre o discurso da liderança e as práticas diárias\n- Falta de visão integrada — transformação vista como responsabilidade só do setor de TI",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        },
        {
          "title": "5 Passos para a Mudança Bem-Sucedida",
          "content": "**1. Diagnóstico e Alinhamento Estratégico**: Compreender o cenário atual e definir a visão estratégica. Cada investimento em tecnologia deve contribuir para o alcance das metas. Magazine Luiza: Trajano fez diagnóstico antes de investir — identificou lojas como ativo, não passivo.\n\n**2. Liderança Ativa**: Líderes devem ser os primeiros a incorporar comportamentos digitais. Se o diretor não usa o CRM, a equipe também não vai. Kotter, Harvard (1996): 70% das transformações falham por falta de urgência no topo. Natura: CEO nos treinamentos SAP — adoção acelerou 40% vs cronograma.\n\n**3. Comunicação Transparente**: Explicar o \"porquê\" da mudança para gerar engajamento. Decisões baseadas em dados, não em hierarquia. Nubank: explicou novo sistema de IA a todos — zero sabotagem interna.\n\n**4. Treinamento e Capacitação**: Desenvolver habilidades técnicas e comportamentais. Brynjolfsson (MIT, 2003): investimentos complementares em treinamento são 5-10x maiores que em tech. TOTVS: 500+ cursos. Com treinamento: 85% retenção. Sem: 40%.\n\n**5. Espaços Seguros para Experimentar**: Criar ambientes onde ideias possam ser testadas sem medo de punição. Edmondson (Harvard, 2018): segurança psicológica = fator #1 de alta performance. Google Aristotle (180 equipes): segurança psicológica é o fator #1.",
          "quote": "Kotter (Harvard, 1996):",
          "studyCase": {
            "title": "Por que 70% das Transformações Falham",
            "body": "Kotter estudou centenas de transformações organizacionais e identificou que o principal motivo de falha não é tecnologia — é liderança. Sem urgência no topo e sem patrocinador executivo visível, o middle management resiste e a transformação morre na média gerência."
          },
          "deepDive": "Edmondson (Harvard, 2018): segurança psicológica é a capacidade de se expressar sem medo de consequências negativas. Equipes com alta segurança psicológica erram mais — mas aprendem mais rápido e inovam mais."
        },
        {
          "title": "Frameworks de Governança: COBIT, ISO 38500 e ITIL 4",
          "content": "**COBIT** (ISACA, 1996/2019) é a referência global para governança de TI no nível estratégico — conecta objetivos de negócio às metas de tecnologia, definindo papéis, responsabilidades e métricas de controle.\n\n**ISO/IEC 38500** (2008/2015) fornece princípios para dirigentes: avaliação do uso atual e futuro da TI, direção para implementação de planos e políticas, e monitoramento de conformidade.\n\n**ITIL 4** (2019) foca na parte tática e operacional, organizando fluxos de entrega integrando IA e cloud.\n\n**Para PMEs** — governança simplificada:\n- Backup automático diário (R$ 0-50/mês)\n- Autenticação em dois fatores em todas as contas (R$ 0)\n- Um responsável por tecnologia (mesmo acumulando função)\n- Política de senhas com gerenciador\n- Revisão trimestral de ferramentas e custos",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Estruturas excessivamente centralizadoras, em que o gestor exige assumir todas as decisões, comprometem a velocidade de decisão — e velocidade é diferencial competitivo."
        },
        {
          "title": "Síntese e Fechamento",
          "content": "Governança não é burocracia — é o que impede que um ransomware apague seus dados, que um ex-funcionário acesse seu CRM, ou que você pague 5 ferramentas para fazer o trabalho de 2.\n\n**Principais Insights:**\n\n- Kotter (1996): **70% das transformações falham** — motivo #1 é liderança, não tecnologia.\n- Governança para PME: R$ 0-50/mês. Renner perdeu **R$ 20M** sem ela.\n- Segurança psicológica (Edmondson, Harvard 2018) é o fator **#1** de equipes de alta performance.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        }
      ],
      "synthesis": {
        "title": "Síntese Estratégica",
        "bullets": [
          "Kotter (1996): 70% das transformações falham — motivo #1 é liderança, não tecnologia.",
          "Governança para PME: R$ 0-50/mês. Renner perdeu R$ 20M sem ela.",
          "Segurança psicológica (Edmondson, Harvard 2018) é o fator #1 de equipes de alta performance."
        ],
        "insights": [
          "Renner: R$ 20M perdidos por ransomware em 2021 — custo da ausência de governança",
          "Google Aristotle: 180 equipes, 1 fator diferenciador — segurança psicológica"
        ]
      }
    },
    {
      "title": "4: Ferramentas Digitais, LGPD e Tendências",
      "description": "De Analytics-to-Value à era dos agentes autônomos",
      "subsections": [
        {
          "title": "Tomada de Decisão Baseada em Dados (DDDM)",
          "content": "A Tomada de Decisão Baseada em Dados (Data-Driven Decision Making — **DDDM**) é definida como o uso de fatos, métricas e dados para orientar decisões comerciais estratégicas.\n\nOs **4 pilares da decisão baseada em dados**:\n\n1. **Coleta e Armazenamento**: Habilidade de capturar dados de forma eficiente. APIs, IoT, formulários, integrações automáticas.\n2. **Análise e Processamento**: Extração de informações relevantes através de modelos estatísticos e machine learning.\n3. **Visualização e Comunicação**: Apresentação clara de resultados para que não-especialistas possam agir sobre eles.\n4. **Integração Estratégica**: Uso dos insights nos processos decisórios diários da liderança — não num relatório que ninguém lê.\n\nA tecnologia de análise sozinha não é suficiente; é necessário criar uma **cultura** que estimule o pensamento crítico e a curiosidade em todos os níveis.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Empresas líderes estão adotando práticas que exploram dados em larga escala para otimizar portfólio e decisões. Mas ferramentas sozinhas não bastam."
        },
        {
          "title": "LGPD e o Marco Regulatório Brasileiro",
          "content": "A transformação digital no Brasil ocorre sob um rigoroso arcabouço legal. A **Lei Geral de Proteção de Dados** (LGPD, Lei 13.709/2018) e a Lei do Governo Digital (14.129/2021) são os pilares desse ecossistema.\n\nO **sandbox regulatório** é um ambiente experimental que permite a testagem de modelos de negócios inovadores com flexibilidade temporária em normas e penalidades. O Marco Civil das Startups (LC 182/21) institucionalizou essa prática.\n\nRecentemente, a ANPD lançou um sandbox focado em **Inteligência Artificial e Proteção de Dados**, com ênfase em:\n- Transparência algorítmica\n- Mitigação de vieses\n- Segurança de dados pessoais em modelos generativos",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "A LGPD não é obstáculo — é framework de confiança. Empresas que tratam compliance como diferencial competitivo atraem mais parceiros, mais investimento e mais clientes institucionais."
        },
        {
          "title": "3 Tendências que Redefinem Governança (2025-2026)",
          "content": "**1. Agentes de IA Autônomos**: Diferente da automação robótica tradicional (RPA), os agentes de IA possuem capacidades de percepção, raciocínio adaptativo e ação autônoma. Isso redefine a governança: empresas agora gerenciam agentes que tomam decisões independentes e acessam dados sensíveis. A **observabilidade** torna-se prioridade número um.\n\n**2. RegTech e Compliance Automatizado**: As RegTechs (Regulatory Technology) utilizam IA para automatizar verificações de KYC (Know Your Customer) e triagens de AML (Anti-Money Laundering). Em 2025, o compliance deixa de ser focado apenas em evitar multas para se tornar um **motor de confiança e reputação**.\n\n**3. Inovação Ambidestra**: Manter a eficiência operacional (exploração do modelo atual) enquanto se explora novas fronteiras (experimentação com modelos novos). O maior desafio organizacional da próxima década: fazer os dois ao mesmo tempo sem que um sabote o outro.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Quem é responsável quando um agente de IA nega um empréstimo injustamente? A liability da IA corporativa é o maior buraco jurídico de 2025. Empresas que implementam IA sem trilha de auditoria (observabilidade) estão criando risco legal que pode superar o benefício operacional."
        },
        {
          "title": "Cases Brasileiros de Transformação Digital",
          "content": "**B3** (Bolsa de Valores): transformou-se de pregão viva-voz em hub fintech — hoje processa 13 milhões de ordens por dia com latência de microssegundos.\n\n**Stone**: provou que dá para competir com Cielo e Rede começando por microempreendedores que ninguém atendia — modelo disruptivo clássico de Christensen.\n\n**Embraer**: inova em indústria pesada competindo com Boeing e Airbus criando aviões para nichos que as gigantes ignoram — jatos regionais onde nenhuma grande quer investir.\n\n**Mercado Pago**: virou o maior banco digital da América Latina por volume de transações — sem pedir licença bancária tradicional. Começou como meio de pagamento do marketplace e expandiu para crédito, investimento e seguros.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Mercado Pago é o exemplo perfeito de como plataforma cria ecossistema financeiro sem precisar ser banco. A expansão se deu organicamente a partir de um produto já existente — não de uma estratégia de banco traditional."
        },
        {
          "title": "IA Generativa: ROI, Riscos e Sustentabilidade Digital",
          "content": "O maior desafio da IA generativa em 2025 não é técnico — é de **ROI**. A maioria das empresas que adotou ChatGPT/Copilot ainda não consegue medir retorno concreto (McKinsey, 2024). IA generativa é excelente para tarefas pontuais mas difícil de escalar para processos críticos sem governança de dados.\n\n**Sustentabilidade Digital e ESG**: Data centers globais consomem 1-2% da eletricidade mundial — equivalente à aviação comercial. Cada consulta a um modelo de IA gasta 10x mais energia que uma busca no Google. Empresas como Microsoft se comprometeram a ser carbono negativo até 2030.\n\n**Em 2025, as três frentes que definem quem lidera:**\n1. Governança de modelos de IA (políticas para uso ético e responsável)\n2. Infraestrutura de dados em nuvem (base para escalabilidade e segurança)\n3. Cultura de dados (o maior diferencial não será a tecnologia, mas a capacidade humana de interpretá-la)",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Prompt engineering — a habilidade de instruir modelos de linguagem — está se tornando disciplina formal, não gambiarra."
        },
        {
          "title": "Síntese e Fechamento",
          "content": "Ferramentas digitais sem cultura data-driven são como Ferrari na garagem. A LGPD não é obstáculo — é framework de confiança. E os agentes de IA estão redefinindo o que significa **governar** tecnologia.\n\n**Principais Insights:**\n\n- DDDM depende de 4 pilares: Coleta → Análise → Visualização → **Integração** nos processos diários.\n- LGPD + sandbox regulatório = inovação **dentro da lei**, não apesar dela.\n- Agentes de IA + RegTech transformam compliance de custo em **motor de confiança**.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        }
      ],
      "synthesis": {
        "title": "Síntese Estratégica",
        "bullets": [
          "DDDM depende de 4 pilares: Coleta → Análise → Visualização → Integração nos processos diários.",
          "LGPD + sandbox regulatório = inovação dentro da lei, não apesar dela.",
          "Agentes de IA + RegTech transformam compliance de custo em motor de confiança."
        ],
        "insights": [
          "B3: de pregão viva-voz a 13M de ordens/dia com latência de microssegundos",
          "McKinsey 2024: maioria das empresas com IA generativa ainda não mede ROI concreto"
        ]
      }
    },
    {
      "title": "5: Tipos e Intensidade da Inovação",
      "description": "De produto a modelo de negócio — e de rotina a arquitetônica",
      "subsections": [
        {
          "title": "O que é Inovação (de verdade)",
          "content": "Uma inovação necessariamente precisa ser **implementada** e proporcionar impactos econômicos e sociais mensuráveis para empresas, indivíduos, governos e a sociedade. Do contrário, trata-se apenas de mera ideia ou invenção.\n\nSão consideradas inovações as modificações que resultem em melhor desempenho, usabilidade, eficiência, redução de custos e acessibilidade. Com o crescimento da pauta de sustentabilidade, responsabilidade social e economia circular, o design de produto vem ganhando maior relevância.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        },
        {
          "title": "Inovação de Produto/Serviço (O mais comum)",
          "content": "Mudança de produtos e serviços através de melhoria em design, usabilidade, desempenho, funcionalidade. É a forma mais **palpável** de inovar — impacta diretamente no faturamento. Pode ser algo que concorrentes já praticam (refrigerante zero açúcar) ou inédito (refrigerante com café).",
          "quote": "Estudo de Caso — Havaianas (1994):",
          "studyCase": {
            "title": "Havaianas (1994)",
            "body": "Mesmo produto desde 1962, reinventado por design e posicionamento. De R$ 2 a produto global em 100+ países. Criatividade no marketing, não na borracha."
          },
          "deepDive": "Inovação de produto não exige mudar o produto — exige mudar como o mercado percebe o produto."
        },
        {
          "title": "Inovação Organizacional (Estrutural e abrangente)",
          "content": "Mudanças na cultura, equipes, hierarquia, processos internos. Pode afetar contratação, treinamento, gerenciamento, espaço físico, plano de carreiras. Maior investimento financeiro e de **esforço organizacional**.",
          "quote": "Estudo de Caso — Spotify (2012):",
          "studyCase": {
            "title": "Spotify (2012)",
            "body": "Organizou equipes em squads autônomos de 6-8 pessoas. Combinou velocidade de startup com escala corporativa. Magazine Luiza adotou modelo similar para transformar lojas em plataforma."
          },
          "deepDive": "Equipes ágeis não são só TI — são cultura organizacional. Requer mudança em contratação, avaliação e incentivos."
        },
        {
          "title": "Inovação de Processo (Eficiência e fluxo)",
          "content": "Mudanças significativas em fluxos organizacionais: gestão da inovação, marketing, vendas, qualidade, logística, TI. Objetivo: maior eficiência, menor custo, mais engajamento, menor impacto **ambiental**.",
          "quote": "Estudo de Caso — Natura (2012):",
          "studyCase": {
            "title": "Natura (2012)",
            "body": "SAP integrou 7 países. Decisões logísticas que levavam semanas viraram horas. Economia projetada de ~R$ 500M. O processo mudou — o modelo de negócio não."
          },
          "deepDive": "Pode ser pontual (uma área) ou impactar todos os processos. A maioria das inovações de processo é incremental."
        },
        {
          "title": "Inovação de Modelo de Negócio (Mudança no core)",
          "content": "Mudança significativa nas atividades core. Altera o valor agregado ao cliente e a forma de conduzir o negócio. Maior risco, mas pode garantir **sobrevivência** ou levar a outro patamar.",
          "quote": "Estudo de Caso — Xerox (2000):",
          "studyCase": {
            "title": "Xerox (2000)",
            "body": "Mudou de venda de impressoras para prestação de serviços de impressão. Garantiu negócio mais sustentável e receita recorrente. Mesmo hardware, modelo completamente diferente."
          },
          "deepDive": "Pode ou não impactar o propósito/missão, mas altera significativamente como o valor é entregue ao cliente."
        },
        {
          "title": "Os 4 Níveis de Intensidade da Inovação",
          "content": "**🔄 Rotina**: Renovação natural para atender à dinâmica de mercado. Baixo impacto no modelo e nas capacidades técnicas. A política interna de incentivo é capaz de promovê-la.\n\n**🚀 Radical**: Mantém bases do modelo de negócio mas exige novas competências tecnológicas. Investimentos elevados e alto impacto no perfil dos colaboradores.\n\n**💥 Disruptiva**: Requer reavaliação e mudança no modelo de negócio. Foco nas escolhas estratégicas. Maior enfoque na mudança cultural.\n\n**🏗️ Arquitetônica**: Maior impacto e risco — afeta tanto o modelo de negócio quanto a tecnologia. Muitas vezes em continuidade a uma inovação disruptiva ou radical.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "O tipo e a intensidade determinam o risco, o investimento e o impacto. Nem toda empresa precisa de inovação arquitetônica — mas toda empresa precisa saber em qual nível está operando."
        },
        {
          "title": "Síntese e Fechamento",
          "content": "Inovação não é sinônimo de tecnologia. Pode ser no **produto**, no **processo**, na **organização** ou no **modelo de negócio**. A intensidade vai de rotina (incremental) a arquitetônica (tudo muda).\n\n**Principais Insights:**\n\n- Inovação sem implementação é apenas **ideia**. Precisa gerar impacto mensurável.\n- Inovação de modelo de negócio tem maior risco mas pode garantir a **sobrevivência** da empresa.\n- Inovação arquitetônica afeta modelo de negócio E tecnologia — é a mais **transformadora**.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        }
      ],
      "synthesis": {
        "title": "Síntese Estratégica",
        "bullets": [
          "Inovação sem implementação é apenas ideia. Precisa gerar impacto mensurável.",
          "Inovação de modelo de negócio tem maior risco mas pode garantir a sobrevivência da empresa.",
          "Inovação arquitetônica afeta modelo de negócio E tecnologia — é a mais transformadora."
        ],
        "insights": [
          "Havaianas: mesmo produto desde 1962, reinventado por posicionamento — inovação de produto sem mudar o produto",
          "Xerox: mesmo hardware, modelo completamente diferente — inovação de modelo de negócio"
        ]
      }
    },
    {
      "title": "6: Gestão da Inovação na Prática",
      "description": "Canvas CIE, funil, stage gates, horizontes e corporate ventures",
      "subsections": [
        {
          "title": "Os 4Ps da Inovação — Como Inovar",
          "content": "Inovar não consiste somente em ter ideias disruptivas. É um processo que exige planejamento, disciplina e recursos.\n\n**Propósito**: O porquê de inovar. Toda decisão liga-se a resultados: receita, custos, sustentabilidade. Deve dar suporte à missão e visão da empresa.\n\n**Processos**: O como será desenvolvida. O funil de inovação é o método mais conhecido: geração de ideias → triagem → desenvolvimento → lançamento.\n\n**Pessoas**: Profissionais com espírito empreendedor, gestores ágeis com mentalidade Lean. Eventos e congressos desenvolvem pensamento amplo.\n\n**Políticas**: Criar ambiente propício dando ênfase ao aprendizado, não só ao erro. Definir formas de mensurar sucesso e recompensar resultados.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "O Canvas da Inovação Estratégica responde 5 perguntas: O que inovar? Como? Onde? Com quais recursos? Qual estrutura?"
        },
        {
          "title": "Os Três Horizontes da Inovação",
          "content": "Steve Blank (2015) destaca que o primeiro horizonte é o nível do conhecido: o modelo de negócio atual.\n\n**H1 — Core (70% dos esforços)**: Principais produtos e serviços. Inovações incrementais, domínio total. Quick wins e eficiência.\n\n**H2 — Adjacente (20% dos esforços)**: Áreas próximas ao core. Novos canais, novos clientes, mesma tecnologia. Risco moderado. Terreno parcialmente conhecido.\n\n**H3 — Disruptivo (10% dos esforços)**: Projetos que se distanciam da operação tradicional. Novos mercados. Risco alto, retorno exponencial.\n\nA distribuição 70/20/10 garante que a empresa mantenha a operação atual enquanto constrói o futuro. Empresas que alocam 100% no H1 estão morrendo lentamente.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        },
        {
          "title": "Funil de Inovação e Stage Gates",
          "content": "O funil de inovação e os estágios de decisão (stage gates, **Robert Cooper 2001**) são as ferramentas mais utilizadas para representar o fluxo criativo.\n\n**1. Fuzzy Front-End (FFE)**: Conjunto difuso de ideias. Incertezas sobre mercado, tecnologia e gestão. Quanto mais ideias nessa fase, melhor. Divergir é necessário. A saída é um conceito sobre o produto ou solução.\n\n**2. Stage Gate 1 — Triagem**: Avaliação inicial: alinhamento estratégico, viabilidade técnica, potencial de mercado. Go/no-go. Cooper: banco de ideias permite revisitar projetos estacionados.\n\n**3. Desenvolvimento**: Prototipagem, testes, validação técnica e de mercado. TRL (NASA, 1974): mede maturidade da tecnologia em 9 níveis.\n\n**4. Stage Gate 2 — Decisão Final**: Produto pronto? Mercado validado? ROI projetado atende? Lançar ou pivotar. Hype Cycle (Gartner) acompanha maturidade e potencial.\n\n**5. Lançamento e Escala**: Go-to-market. Métricas de adoção, receita, satisfação. O ciclo reinicia com aprendizados do mercado.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Funil de inovação: quanto mais ideias no topo, melhor. A maioria DEVE morrer na triagem — isso é positivo. Stage gates previnem investimento em projetos fadados ao fracasso."
        },
        {
          "title": "Corporate Ventures e Ecossistema de Startups",
          "content": "Corporate ventures são grandes organizações que investem capital em startups ou em ideias inovadoras dos colaboradores internos.\n\n**Classificações:**\n- **CVC** (Corporate Venture Capital): compra ações de startup\n- **CVE** (Externo): cede ajuda como espaço, marca, canais\n- **CVI** (Interno): investe em ideias dos colaboradores\n\n**Dois movimentos de materialização:**\n- **Spin-in**: integração da startup ao negócio da investidora, via aquisição total\n- **Spin-off**: quando o investimento interno se torna independente, geralmente com criação de nova empresa\n\nO **Business Model Canvas** (Osterwalder & Pigneur, 2011) permite definir e visualizar modelos de negócio em uma única página. Pode ser usado em 3 momentos: o atual, o de inovação e o de disrupção.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Hubs de inovação aberta das grandes organizações abrem portas para incubar startups com potencial de spin-in. A Natura faz isso com comunidades da Amazônia; a Embraer com centros de pesquisa internacionais."
        },
        {
          "title": "Síntese e Fechamento",
          "content": "Gestão da inovação não é improviso — é **processo**. O Canvas CIE responde 5 perguntas essenciais. Os 3 horizontes distribuem risco (70/20/10). O funil com stage gates filtra ideias.\n\n**Principais Insights:**\n\n- Funil de inovação: quanto mais ideias no **topo**, melhor. A maioria DEVE morrer na triagem — isso é positivo.\n- Stage gates (Cooper, 2001): decisões **go/no-go** em cada fase previnem investimento em projetos fadados ao fracasso.\n- Spin-in e spin-off são os dois movimentos que materializam a inovação no **mercado**.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        }
      ],
      "synthesis": {
        "title": "Síntese Estratégica",
        "bullets": [
          "Funil de inovação: quanto mais ideias no topo, melhor. A maioria DEVE morrer na triagem — isso é positivo.",
          "Stage gates (Cooper, 2001): decisões go/no-go em cada fase previnem investimento em projetos fadados ao fracasso.",
          "Spin-in e spin-off são os dois movimentos que materializam a inovação no mercado."
        ],
        "insights": [
          "Distribuição 70/20/10: H1 sustenta operação, H2 expande, H3 cria o futuro",
          "Business Model Canvas: modelo atual vs inovação vs disrupção — 3 versões em paralelo"
        ]
      }
    },
    {
      "title": "7: Cultura de Inovação",
      "description": "Dimensão interna, externa, liderança e maturidade tecnológica",
      "subsections": [
        {
          "title": "O que é Cultura de Inovação",
          "content": "Cultura de inovação é um conjunto de práticas e valores compartilhados que favorecem atitudes inovadoras. Tem duas dimensões: a **interna** (a própria organização) e a **externa** (o setor e a sociedade).\n\nSem cultura, ferramentas e processos viram burocracia.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        },
        {
          "title": "Cultura Interna: Elementos da Organização",
          "content": "Cada empresa possui uma cultura corporativa: um conjunto de regras, tácitas e explícitas, que condiciona as atitudes de todos. Os elementos básicos incluem:\n\n- **Linguagem e Grupos**: Padrões de tratamento e interação entre pessoas\n- **Normas**: Regras do grupo — dress code, rituais, o que é aceito e o que não é\n- **Valores**: Confiança, responsabilidade, transparência — o que a empresa diz que valoriza vs o que pratica\n- **Clima**: Percepção do ambiente físico e psicológico\n\n**Liderança inovadora, mas não centralizadora**: A inovação precisa começar na alta administração. Mas o problema em organizações comandadas por um \"gênio criativo\" é que as novas ideias costumam vir apenas dele. Cria-se a regra tácita de \"o chefe tem ideias e nós as executamos\" — **dependência** perigosa porque torna a empresa dependente de uma única pessoa.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        },
        {
          "title": "Cultura Externa: Contexto Setorial e Social",
          "content": "Um profissional inovador precisa de sólida formação na área em que atua — criação tem tudo a ver com conhecimento. Mas e se a oferta de profissionais qualificados é baixa? Se não existe sistema de patentes? Se não há acesso a bancos de dados públicos? Se a transferência de tecnologia é difícil?\n\nEsses são problemas da segunda dimensão da cultura de inovação: o **contexto setorial e social**. Uma empresa pode ter excelente cultura interna mas estar inserida em um ecossistema que dificulta a inovação.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        },
        {
          "title": "Nível de Maturidade Tecnológica (TRL)",
          "content": "O **TRL** (Technology Readiness Level) é uma metodologia desenvolvida pela NASA em 1974 para mensurar e comparar a evolução da maturidade de novas tecnologias. Muito utilizada por empresas e agentes de fomento na tomada de decisão da alocação de recursos conforme milestones são superados.\n\nQuanto mais recente a tecnologia, maiores as incertezas e chances de fracasso. O TRL varia de 1 (princípio básico observado) a 9 (sistema comprovado e qualificado através de operações bem-sucedidas).\n\nEmpresa e agentes de fomento usam o TRL para decidir onde alocar recursos — tecnologias em TRL 1-3 recebem investimento de pesquisa, TRL 4-6 recebem desenvolvimento, TRL 7-9 recebem escala.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "TRL foi criado para a NASA avaliar tecnologias espaciais mas tornou-se padrão global para avaliação de maturidade tecnológica em qualquer setor."
        },
        {
          "title": "Hype Cycle (Curva Gartner) — As 5 Fases",
          "content": "O **Hype Cycle** é uma curva de padrões que tendem a se repetir no ciclo de vida de uma tecnologia, desenvolvida pela Gartner em 2018. A consultoria divulga anualmente mais de 100 Hype Cycles para acompanhar a maturidade da inovação.\n\n**1. Gatilho Tecnológico**: Nova tecnologia surge. Primeiras provas de conceito geram interesse da mídia e investidores.\n\n**2. Pico de Expectativas Infladas**: Publicidade gera entusiasmo excessivo. Expectativas irrealistas. Muitas startups surgem.\n\n**3. Vale da Desilusão**: Implementações falham. Interesse diminui. Empresas mais fracas morrem. Mídia perde interesse.\n\n**4. Encosta da Iluminação**: Casos de uso reais começam a funcionar. Benefícios ficam mais claros e práticos.\n\n**5. Platô de Produtividade**: Tecnologia madura, amplamente adotada. Critérios de viabilidade comprovados. Mercado consolidado.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Em 2023-2024, a IA Generativa estava no Pico de Expectativas Infladas. Em 2025, está atravessando o Vale da Desilusão — implementações reais não entregam o hype prometido. O Platô virá com governança e casos de uso comprovados."
        },
        {
          "title": "Síntese e Fechamento",
          "content": "Cultura de inovação tem duas dimensões: **interna** (valores, liderança, clima) e **externa** (profissionais, patentes, ecossistema). TRL mede maturidade técnica. Hype Cycle mede expectativa de mercado. Sem cultura, as melhores ferramentas viram burocracia.\n\n**Principais Insights:**\n\n- Liderança inovadora não é centralizadora. \"O chefe tem ideias e nós executamos\" = **dependência** perigosa.\n- TRL (NASA, 1974): 9 níveis de maturidade. Quanto mais recente, mais **incerteza** e risco.\n- Hype Cycle: toda tecnologia passa por expectativa inflada → desilusão → **produtividade real**.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        }
      ],
      "synthesis": {
        "title": "Síntese Estratégica",
        "bullets": [
          "Liderança inovadora não é centralizadora. \"O chefe tem ideias e nós executamos\" = dependência perigosa.",
          "TRL (NASA, 1974): 9 níveis de maturidade. Quanto mais recente, mais incerteza e risco.",
          "Hype Cycle: toda tecnologia passa por expectativa inflada → desilusão → produtividade real."
        ],
        "insights": [
          "TRL 1-9: NASA usava para tecnologia espacial, hoje é padrão global de maturidade",
          "IA Generativa em 2025: atravessando o Vale da Desilusão rumo à produtividade real"
        ]
      }
    },
    {
      "title": "8: Inteligência Organizacional e Projeto de BI",
      "description": "Do OBI ao protótipo funcional — como dados viram decisões estratégicas",
      "subsections": [
        {
          "title": "O que é OBI — Organizational Business Intelligence",
          "content": "Business Intelligence não é um software isolado — é uma **capacidade organizacional**. O OBI (Organizational Business Intelligence) integra dados de toda a empresa para transformar cada decisão gerencial em ação baseada em evidência.\n\nEnquanto o BI clássico foca em dados transacionais — vendas, estoque, financeiro — o OBI integra dimensões humanas e processuais: desempenho de equipes, eficiência de fluxos, padrões de colaboração e saúde organizacional. O resultado é uma visão 360° que conecta operação, pessoas e estratégia.\n\n**William Inmon (1990)**, considerado o \"pai do Data Warehouse\", definiu que a inteligência organizacional começa pela separação entre sistemas transacionais (OLTP — registro de eventos) e sistemas analíticos (OLAP — análise de padrões). Misturar os dois é o erro mais comum — e mais caro — em projetos de BI.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "OLTP vs OLAP: OLTP é o sistema que registra — o ERP que processa um pedido. OLAP é o sistema que analisa — o BI que mostra tendências. Quando você faz queries analíticas no banco transacional, você paralisa a operação."
        },
        {
          "title": "As 4 Camadas do OBI",
          "content": "**🗄️ Camada de Dados**: Coleta e armazenamento de dados brutos — transacionais, operacionais e comportamentais. ERP, CRM, IoT, planilhas. A qualidade aqui determina tudo o que vem depois. 70% do tempo do projeto é ETL.\n\n**🔄 Camada de Integração**: ETL (Extract, Transform, Load) padroniza e consolida dados de fontes heterogêneas. Qualidade de dados determina qualidade das decisões. Garbage in = garbage out. 80% dos projetos falham nessa etapa.\n\n**🧠 Camada Analítica**: OLAP, modelos preditivos e algoritmos de IA transformam dados em padrões acionáveis. Aqui nascem os insights — análise dimensional, drill-down, slice and dice. 10x mais rápido que SQL direto.\n\n**📊 Camada de Apresentação**: Dashboards, relatórios e alertas entregam informação no momento certo, para a pessoa certa, no formato certo. KPI = pergunta + métrica + meta + frequência. Regra de ouro: 1 insight por tela.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "80% dos projetos de BI falham na camada de integração (ETL). O motivo: dados de fontes diferentes têm nomenclaturas diferentes, formatos diferentes, fusos horários diferentes. Harmonizar isso é arte e ciência."
        },
        {
          "title": "Ciclo de Vida do Projeto de BI (Metodologia Kimball)",
          "content": "Um projeto de BI bem executado começa pelo negócio, não pela tecnologia. **Ralph Kimball (1996)** definiu o padrão ouro: dimensional modeling primeiro, ferramenta depois.\n\n**1. Levantamento de Requisitos**: Entender quais decisões precisam ser suportadas. Entrevistar stakeholders, mapear fontes de dados, definir KPIs prioritários. Magazine Luiza: levantamento revelou que gerentes precisavam de sell-through por SKU — não de receita total.\n\n**2. Modelagem Dimensional**: Definir fatos (o que medir) e dimensões (como analisar). Star Schema ou Snowflake Schema. Kimball: \"Escolha a granularidade mais baixa possível — você pode sempre agregar, nunca desagregar.\"\n\n**3. ETL — Extração, Transformação e Carga**: 70% do tempo de projetos de BI é gasto aqui. Renner: dados de estoque vinham de 3 sistemas com nomenclaturas diferentes. Harmonização levou 4 meses.\n\n**4. Desenvolvimento de Visualizações**: Regra: 1 insight por tela. Stephen Few (2006): bons dashboards comunicam, não impressionam. Ambev: reduziu de 40 métricas para 7 KPIs — adoção subiu de 30% para 85% em 90 dias.\n\n**5. Deploy e Governança**: RBAC, treinamento, ciclo de atualização. DAMA-DMBOK (2017): Data Governance = pessoas + processos + tecnologia. Tecnologia é a menor parte.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Inmon vs Kimball: dois paradigmas. Kimball (dimensional) é mais adotado para BI ágil. Inmon (normalizado) para ambientes enterprise de longo prazo. Para a maioria das empresas brasileiras: Kimball."
        },
        {
          "title": "Prototipagem em BI: 3 Fases",
          "content": "Prototipar antes de construir é a prática que mais reduz retrabalho em projetos de BI. O custo de mudar um wireframe é zero. O custo de mudar um modelo dimensional em produção pode ser meses de trabalho.\n\n**✏️ Wireframe (Baixa Fidelidade)**: Esboço visual das telas e layouts. Sem dados reais — apenas estrutura. Ferramentas: papel, Balsamiq, Figma sketch. Valida: o que aparece onde e qual hierarquia de informação.\n\n**🎨 Mockup (Média Fidelidade)**: Design visual com dados fictícios. Simula a aparência final — cores, tipografia, ícones. Ferramentas: Figma, Adobe XD. Valida: linguagem visual e consistência antes de codar.\n\n**⚡ Protótipo Funcional (Alta Fidelidade)**: Dashboard real com amostra de dados reais. Ferramentas: Power BI, Tableau, Metabase. Valida: usabilidade e valor do insight antes do deploy completo — expõe problemas de dados cedo.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Protótipos definem expectativas reais entre analistas e stakeholders antes de qualquer linha de código ou query SQL — e evitam o cenário clássico: \"não era isso que eu queria.\""
        },
        {
          "title": "Ferramentas de BI: Power BI, Tableau, Metabase e Qlik",
          "content": "A escolha da ferramenta de BI deve seguir o contexto, não a moda. Três variáveis determinam a escolha: maturidade da equipe, volume de dados e integração com sistemas existentes.\n\n**🟡 Power BI (Microsoft)**: Integração nativa com Excel, Azure e Teams. Curva de aprendizado mais baixa. Licenciamento Microsoft 365. Ideal: empresas já no ecossistema Microsoft. #1 mercado corporativo global (2024).\n\n**🔵 Tableau (Salesforce)**: Referência em visualização avançada e análise exploratória. Maior curva de aprendizado. NPS de 94 entre analistas de dados. Ideal: analistas avançados que precisam de flexibilidade visual.\n\n**🟢 Metabase (Open-source)**: Gratuito, deploy rápido, acessível para não-técnicos. Ideal: startups e equipes com orçamento limitado. Grátis no open-source, pago no cloud.\n\n**🟠 Qlik Sense**: Motor de associação único — navega por dados sem joins predefinidos. Forte em Europa — menor adoção no Brasil. #3 Gartner Magic Quadrant 2024.\n\nGartner (2024): Power BI e Tableau lideram o Quadrante Mágico de Analytics por 9 anos consecutivos.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": "Star Schema vs Snowflake Schema: Star é mais rápido e mais simples. Snowflake é mais econômico em storage, mas exige mais joins. Para BI operacional: Star vence na maioria dos casos."
        },
        {
          "title": "Síntese e Fechamento",
          "content": "OBI transforma a empresa em uma organização que aprende com seus próprios dados. As **4 camadas** (Dados → Integração → Analítica → Apresentação) formam o pipeline completo. Um projeto de BI segue o ciclo Kimball: requisitos → modelagem → ETL → visualização → governança. **Prototipar** antes de construir é a decisão mais inteligente.\n\n**Principais Insights:**\n\n- Inmon vs Kimball: Kimball (dimensional) é mais adotado para **BI ágil**. Inmon (normalizado) para ambientes enterprise.\n- Regra de ouro do dashboard: **1 insight por tela**. Múltiplas métricas competindo = nenhuma decisão clara.\n- Star Schema: mais rápido, mais simples. Snowflake: mais econômico em storage, mas mais **joins**. Para BI operacional: Star vence.",
          "quote": undefined,
          "studyCase": undefined,
          "deepDive": undefined
        }
      ],
      "synthesis": {
        "title": "Síntese Estratégica",
        "bullets": [
          "Inmon vs Kimball: dois paradigmas de DW. Kimball (dimensional) é mais adotado para BI ágil.",
          "Regra de ouro do dashboard: 1 insight por tela. Múltiplas métricas competindo = nenhuma decisão clara.",
          "Star Schema: mais rápido, mais simples. Para BI operacional: Star vence na maioria dos casos."
        ],
        "insights": [
          "Ambev: 40 métricas → 7 KPIs, adoção 30% → 85% em 90 dias",
          "Renner: 3 sistemas com nomenclaturas diferentes — harmonização ETL levou 4 meses"
        ]
      }
    }
  ]
}

]
