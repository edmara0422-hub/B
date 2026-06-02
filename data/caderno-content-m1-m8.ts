// Generated Automatically from INTELLIGENCE_TEXTO_COMPLETO_M1_M8.md
export interface SubsectionContent {
  title: string
  content: string
  quote?: string | null
  studyCase?: { title: string; body: string } | null
  deepDive?: string | null
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
import { SIG_PESSOAS } from './caderno-content-sig'

export interface SubjectContent {
  id: string
  code: string
  title: string
  videoUrls: { title: string; url: string }[]
  chapters: ChapterContent[]
}

export const SUBJECTS_DB: SubjectContent[] = [
  {
      "id": "N1-S1",
      "code": "NEURO-01",
      "title": "O Organismo e o SN",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Fundamentos Biológicos",
              "subsections": [
                  {
                      "title": "Organismo e Termodinâmica",
                      "content": "• Um organismo não existe porque pensa — ele pensa porque consegue manter estrutura\n• Todo sistema vivo enfrenta manter organização interna em um universo que tende à desordem\n• Sistemas vivos são dissipativos: não estão em equilíbrio, lutam contra a entropia\n• Colapsam rapidamente quando o suprimento energético cessa",
                      "deepDive": "O cérebro como sistema regulatório distribuído sob restrição energética e incerteza ambiental."
                  },
                  {
                      "title": "ATP — A Moeda Universal",
                      "content": "• Toda energia utilizável nas células é intermediada por ATP (adenosina trifosfato)\n• ATP → ADP + Pi + energia\n• Mitocôndrias produzem ATP por fosforilação oxidativa: glicose + O₂ → ATP + calor + CO₂\n• Sem ATP não há: síntese de proteínas, transporte ativo, manutenção estrutural, gradientes, sinal elétrico, vida",
                      "deepDive": "Sem ATP, nenhum processo biológico se sustenta."
                  },
                  {
                      "title": "Membrana — O Nascimento da Vida",
                      "content": "• A vida celular só é possível porque existe membrana\n• Sem membrana: não existe dentro e fora, não existe gradiente, não existe metabolismo, não existe vida\n• A membrana cria a fronteira que permite ao organismo ser um sistema — separado do ambiente\n• É a estrutura que torna possível acumular energia e manter organização",
                      "deepDive": "Membrana = nascimento da vida como sistema."
                  },
                  {
                      "title": "Bomba Na⁺/K⁺-ATPase",
                      "content": "• Expulsa 3 Na⁺ para fora, traz 2 K⁺ para dentro, consome 1 ATP por ciclo\n• Funciona 24h por dia sem parar — o motor silencioso da vida\n• 60–80% da energia cerebral é consumida apenas para manter essas bombas funcionando\n• Isso antes mesmo de qualquer processamento, pensamento ou sinalização",
                      "deepDive": "3 Na⁺ (out) + 2 K⁺ (in) + 1 ATP → gradiente eletroquímico — Attwell & Laughlin, 2001."
                  },
                  {
                      "title": "Potencial de Repouso",
                      "content": "• Uma célula excitável não está \"em repouso\" — gasta energia continuamente para permanecer pronta\n• O chamado potencial de repouso é um estado de tensão elétrica mantida artificialmente\n• Repouso: ~-70mV · Pico: +40mV · Hiperpolarização · Retorno\n• Estar vivo é estar em dívida energética constante",
                      "deepDive": "O cérebro não é caro porque pensa. Ele pensa porque já é caro para existir."
                  }
              ]
          },
          {
              "title": "Seção 1.0 — O que é o Sistema Nervoso",
              "subsections": [
                  {
                      "title": "Definição e Sistema de Controle",
                      "content": "Praticamente tudo o que o nosso corpo faz, do pensar e sentir ao respirar, mover-se e alimentar-se, é regulado e coordenado pelo sistema nervoso. Ele se destaca como um dos dois principais sistemas de controle do organismo humano, atuando de maneira complementar ao sistema endócrino (que atua como o segundo sistema de controle).\n\nO sistema nervoso é composto por uma rede complexa e altamente especializada de células distribuída por todo o organismo, com a função primordial de captar informações do meio interno e externo, processar dados de forma integrada e gerar respostas rápidas e adaptativas para garantir a sobrevivência."
                  },
                  {
                      "title": "As 5 Funções Reguladoras",
                      "content": "As atividades de regulação e coordenação do sistema nervoso são fundamentais para o funcionamento normal do corpo humano. O sistema realiza esse controle por meio das seguintes funções vitais:\n\n1. **Mantendo a homeostase**: Os trilhões de células do corpo humano não operam de forma isolada, mas integrada. Por exemplo, as células cardíacas precisam contrair a uma taxa exata que garanta a entrega adequada de sangue e oxigênio para todos os tecidos. O sistema nervoso modula ativamente essa e outras atividades (acelerando ou inibindo) para assegurar o equilíbrio fisiológico.\n2. **Recebendo estímulos sensoriais**: Receptores especializados monitoram continuamente estímulos internos e externos. Estamos conscientes de sensações como visão, audição, gosto, cheiro, tato, dor, temperatura e posição corporal. Outros estímulos críticos, como pressão arterial, gases sanguíneos e pH, são monitorados e integrados silenciosamente em nível inconsciente.\n3. **Integrando informações**: O encéfalo e a medula espinal são as centrais de processamento do organismo. Ao receber um estímulo sensorial, o sistema integra e avalia os dados, decidindo se deve produzir uma resposta motora imediata, ignorar a informação ou armazená-la sob a forma de memória.\n4. **Controlando os músculos e as glândulas**: Controla a maior parte dos movimentos corporais por meio da estimulação da musculatura esquelética (que só contrai quando estimulada). Também modula músculos lisos (como os das paredes vasculares) e a secreção de diversas glândulas (sudoríparas, salivares e do trato digestório). O músculo cardíaco e certos músculos viscerais (como o estômago) contraem de forma autorrítmica, dispensando estímulos para cada batimento, porém o sistema nervoso atua ativamente controlando a sua frequência (acelerando ou desacelerando).\n5. **Estabelecendo e mantendo a atividade mental**: O encéfalo concentra e coordena todas as faculdades intelectuais e cognitivas superiores, incluindo a consciência, o pensamento lógico, a memória e a expressão das emoções."
                  },
                  {
                      "title": "Anatomia Estrutural: SNC e SNP",
                      "content": "Embora possuamos apenas um único sistema nervoso integrado, ele é classicamente subdividido em componentes estruturais para fins de estudo:\n\n- **Sistema Nervoso Central (SNC)**: Composto pelo encéfalo (abrigado e protegido dentro da caixa craniana) e pela medula espinal (protegida ao longo do canal vertebral das vértebras). Ambas as estruturas são contínuas entre si, conectando-se na transição do forame magno.\n- **Sistema Nervoso Periférico (SNP)**: Consiste em todas as estruturas neurais situadas fora do SNC. É composto por:\n  - **Receptores Sensoriais**: Terminações nervosas ou células especializadas que detectam estímulos (dor, tato, pressão, som, luz, temperatura). Estão espalhados pela pele, articulações, músculos, orelhas, olhos e órgãos internos.\n  - **Nervos**: Feixes de fibras axonais envolvidos por suas respectivas bainhas conjuntivas que conectam o SNC aos receptores, músculos e glândulas. São compostos por **12 pares de nervos cranianos** (originados no encéfalo) e **31 pares de nervos espinais** (originados na medula espinal).\n  - **Gânglios**: Coleções de corpos celulares de neurônios agrupados fora do SNC.\n  - **Plexos**: Extensas redes de axônios (e às vezes corpos celulares) localizadas externamente ao SNC."
                  },
                  {
                      "title": "Divisões Funcionais do SNP: Sensorial e Motora",
                      "content": "Funcionalmente, o Sistema Nervoso Periférico é dividido em duas grandes vias de comunicação:\n\n- **Divisão Sensorial (Aferente / 'Entrada')**: Transmite potenciais de ação (sinais elétricos) dos receptores periféricos para o SNC. Os corpos celulares dos neurônios sensoriais estão reunidos nos **gânglios da raiz dorsal** próximos à medula espinal, ou em gânglios de nervos cranianos específicos.\n- **Divisão Motora (Eferente / 'Saída')**: Conduz potenciais de ação de resposta do SNC em direção aos órgãos efetores (músculos e glândulas). Divide-se em:\n  - **Sistema Nervoso Somático**: Permite o controle consciente e voluntário sobre os músculos esqueléticos. Os corpos celulares desses neurônios motores residem dentro do SNC e seus axônios estendem-se até as células musculares, comunicando-se por meio de conexões altamente especializadas denominadas **sinapses** (a junção funcional de um neurônio com outra célula).\n  - **Sistema Nervoso Autônomo (SNA)**: Responsável pelas respostas involuntárias do organismo. Subdivide-se em **Divisão Simpática** (ativa durante atividade física, preparando o corpo para fuga ou luta) e **Divisão Parassimpática** (regula funções metabólicas em momentos de repouso, como digestão e excreção)."
                  },
                  {
                      "title": "O Sistema Nervoso Entérico (SNE)",
                      "content": "O **Sistema Nervoso Entérico (SNE)** é uma subdivisão única e independente do SNP, constituída por complexos plexos neuronais embutidos diretamente nas paredes do trato gastrointestinal. \n\nOs neurônios entéricos monitoram e controlam os processos digestórios locais por meio de reflexos autonômicos independentes da interferência do SNC. Contudo, o SNC pode regular e substituir as funções entéricas por meio de estimulações diretas das vias simpáticas e parassimpáticas, tornando o SNE um sistema autônomo perfeitamente integrado e coordenado com o SNA."
                  }
              ]
          },
          {
              "title": "Seção 1.1 — O Lugar do Cérebro",
              "subsections": [
                  {
                      "title": "Perspectiva Clássica",
                      "content": "• Em Guyton & Hall: SN como integração regulatória subordinada ao meio interno\n• Em Kandel: inicia na membrana e potencial de repouso, não em conceitos psicológicos\n• O SN existe para manter viabilidade do organismo em ambiente incerto",
                      "deepDive": "Abordagens que colocam vontade consciente como motor primário partem de premissa biologicamente incorreta."
                  },
                  {
                      "title": "Funções Integradas",
                      "content": "• Homeostase: regula trilhões de células para equilíbrio interno\n• Estímulos: monitora conscientes (visão, tato) e inconscientes (pH, gases, PA)\n• Integração: encéfalo/medula → resposta, memória ou descarte\n• Motor: esqueléticos, lisos, cardíaco e secreção glandular\n• Mental: consciência, pensamento, memória e emoções",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Seções 1.2–1.5 — Regulação, Racionalidade e Predição",
              "subsections": [
                  {
                      "title": "1.2 Sistema Regulatório Distribuído",
                      "content": "• O SN deve ser compreendido como um sistema de regulação distribuída\n• Sua função central é integrar sinais internos e externos e produzir respostas que mantenham o organismo dentro de faixas fisiológicas compatíveis com a vida\n• Não existe centro único de comando — múltiplos sistemas interconectados operam em paralelo\n• Operação limitada por recursos metabólicos e temporais\n• O cérebro não \"pensa\" e depois \"manda\" o corpo agir",
                      "deepDive": "Ele é parte de um sistema corpo–cérebro cuja função primária é regular estados internos e reduzir risco biológico."
                  },
                  {
                      "title": "1.3 Racionalidade como Emergência",
                      "content": "• Se o SN existe para regular e garantir viabilidade, racionalidade não pode ser processo primário\n• Ela emerge de sistemas regulatórios mais antigos\n• \"Decisão racional\" é frequentemente justificativa post-hoc de processos já ocorridos em nível implícito\n• Aproximação heurística sob restrição temporal e computacional\n• Narrativa construída para tornar o comportamento coerente com a autoimagem",
                      "deepDive": ""
                  },
                  {
                      "title": "1.4 Predição e Free Energy",
                      "content": "• Free Energy e Predictive Processing: cérebro como máquina de inferência bayesiana\n• O cérebro tenta continuamente minimizar a surpresa (prediction error)\n• A maior parte da atividade neural é gerativa — prevê o que vai acontecer antes que aconteça",
                      "deepDive": "O cérebro não reage. Ele antecipa."
                  },
                  {
                      "title": "1.4 Vantagens da Antecipação",
                      "content": "• Permite ação eficiente sem esperar pelo estímulo completo\n• Poupa energia metabólica ao preparar respostas antecipadas\n• Protege o organismo de riscos ao antecipar ameaças\n• Quando a predição falha (surpresa), o sistema gera aprendizado e atualiza seus modelos",
                      "deepDive": ""
                  },
                  {
                      "title": "1.5 Conclusão Preliminar",
                      "content": "• O SN não existe para implementar racionalidade, mas para garantir sobrevivência metabólica\n• Regulação interna sob incerteza é a função primária\n• Racionalidade é ferramenta tardia e limitada, subordinada a funções mais antigas\n• Não existe \"eu\" central que decide — existe uma rede distribuída de processos\n• Essa rede negocia constantemente recursos limitados para manter um organismo viável",
                      "deepDive": "Compreender isso é essencial para não projetar sobre o sistema nervoso propriedades que ele não possui."
                  }
              ]
          }
      ]
  },
  {
      "id": "N1-S2",
      "code": "NEURO-02",
      "title": "Neurodesenvolvimento",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Decisões Moleculares que Constroem o Cérebro",
              "subsections": [
                  {
                      "title": "O que é Neurodesenvolvimento",
                      "content": "• Processo de formação e maturação do SN, da 3ª semana de gestação até o início da vida adulta\n• Não é crescimento passivo nem proliferação desordenada\n• Coreografia molecular rigorosamente orquestrada\n• Transforma uma camada de células ectodérmicas em ~86 bilhões de neurônios + número equivalente de glia\n• Interconectados por trilhões de sinapses",
                      "deepDive": "O neurodesenvolvimento é uma sequência de decisões moleculares que transformam uma única camada de células no órgão mais complexo do universo conhecido."
                  }
              ]
          },
          {
              "title": "Indução e Neurulação (Semanas 3–4)",
              "subsections": [
                  {
                      "title": "O Sinalizador",
                      "content": "• Após fecundação e formação do disco embrionário, o SN começa a ser \"escrito\"\n• A notocorda (bastão de células mesodérmicas) libera Sonic Hedgehog (SHH)\n• SHH inibe a BMP-4, forçando o ectoderma a se diferenciar",
                      "deepDive": ""
                  },
                  {
                      "title": "Placa → Tubo → Crista",
                      "content": "• O sinal força o ectoderma a se espessar → Placa Neural\n• A placa se dobra em sulco que se fecha → Tubo Neural (futuro SNC)\n• Células nas bordas formam a Crista Neural → migram para criar o SNP (nervos e gânglios)",
                      "deepDive": "Semanas 3–4: o primeiro corte irreversível — define encéfalo, medula e hierarquia estrutural."
                  }
              ]
          },
          {
              "title": "Arquitetura das Vesículas (Semanas 4–6)",
              "subsections": [
                  {
                      "title": "De 3 para 5 Vesículas",
                      "content": "• O tubo neural não cresce por igual — a parte frontal se expande em 3 vesículas primárias\n• Que se subdividem em 5 vesículas secundárias",
                      "deepDive": ""
                  },
                  {
                      "title": "As 5 Vesículas",
                      "content": "• Telencéfalo — hemisférios cerebrais e córtex\n• Diencéfalo — tálamo e hipotálamo (comando hormonal)\n• Mesencéfalo — reflexos visuais e auditivos\n• Metencéfalo — ponte e cerebelo (equilíbrio e coordenação)\n• Mielencéfalo — bulbo (respiração e batimentos cardíacos)",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Proliferação e Migração",
              "subsections": [
                  {
                      "title": "A Explosão Celular",
                      "content": "• 250.000 neurônios fabricados por minuto no pico da neurogênese\n• Produz muito mais neurônios que o necessário\n• 30–70% morrem por apoptose (morte celular programada)\n• Falha em receber fatores tróficos = morte celular",
                      "deepDive": "Seleção, não expansão — o cérebro elimina o que não é necessário."
                  },
                  {
                      "title": "Migração via Glia Radial",
                      "content": "• Glia radial funciona como \"andaime\" ou trilho para neurônios recém-nascidos\n• Neurônios escalam as fibras gliais para chegar ao topo do córtex\n• Formação de camadas de dentro para fora (inside-out)\n• Se o \"trilho\" falha → malformações corticais graves",
                      "deepDive": "Erro = camada errada, função errada. Arquitetura define função."
                  }
              ]
          },
          {
              "title": "Conectividade e Refinamento",
              "subsections": [
                  {
                      "title": "Sinaptogênese (0–3 anos)",
                      "content": "• Criação de trilhões de sinapses entre neurônios\n• 10.000+ sinapses por neurônio\n• Fase exploratória: alta instabilidade e custo energético\n• Liberdade alta + custo alto",
                      "deepDive": ""
                  },
                  {
                      "title": "Poda Sináptica (3–10 anos)",
                      "content": "• O cérebro produz conexões em excesso e depois \"corta\" as não usadas\n• ≈70% das sinapses são eliminadas\n• Competição por atividade e metabolismo\n• Microglia marca e elimina sinapses fracas\n• No autismo, acredita-se em falha nesse processo de limpeza",
                      "deepDive": "Eficiência sobre quantidade — esculpido por células imunes."
                  },
                  {
                      "title": "Mielinização (20–25 anos)",
                      "content": "• Neurônios encapados com mielina (gordura isolante)\n• Células de Schwann (SNP) e Oligodendrócitos (SNC) envolvem axônios\n• Acelera condução saltatória em até 100x\n• Reduz custo energético por sinal\n• Última área: córtex pré-frontal (julgamento e controle de impulsos)\n• Explica a impulsividade na adolescência",
                      "deepDive": "Regime de eficiência vs. flexibilidade — mielina reduz plasticidade."
                  }
              ]
          },
          {
              "title": "Linha do Tempo Completa",
              "subsections": [
                  {
                      "title": "Tubo Neural (3ª–4ª semana)",
                      "content": "• Define encéfalo e medula\n• Estabelece eixos rostro-caudal e dorso-ventral\n• Cria hierarquia estrutural",
                      "deepDive": "Arquitetura antes da experiência."
                  },
                  {
                      "title": "Neurogênese & Apoptose (2º trimestre)",
                      "content": "• Produção massiva e eliminação seletiva de neurônios\n• Produz muito mais que necessário\n• 30–70% morrem por apoptose\n• Falha em receber fatores tróficos = morte",
                      "deepDive": "Seleção, não expansão."
                  },
                  {
                      "title": "Sinaptogênese → Poda (0–10 anos)",
                      "content": "• Trilhões de sinapses formadas (0–3 anos)\n• Alta instabilidade e custo energético\n• Eliminação de sinapses fracas pela microglia (3–10 anos)",
                      "deepDive": ""
                  },
                  {
                      "title": "Adolescência (11–20 anos)",
                      "content": "• Maturação descompassada: emoção vs. razão\n• Sistema límbico hiper-reativo\n• Pré-frontal ainda maturando\n• Pertencimento social = prioridade biológica",
                      "deepDive": "Emoção > razão (adaptativo, não defeito)."
                  },
                  {
                      "title": "Mielinização → Adulto (20–25+ anos)",
                      "content": "• Otimização de circuitos pré-frontais pela bainha de mielina\n• Circuitos estabilizados — mudança exige mais energia\n• Identidade = circuito vencedor\n• Alta eficiência, baixo ruído, alto custo de mudança",
                      "deepDive": "Estabilidade sináptica."
                  }
              ]
          },
          {
              "title": "Períodos Críticos e Relevância Clínica",
              "subsections": [
                  {
                      "title": "Períodos Críticos / Sensíveis",
                      "content": "• Janelas temporais em que o cérebro é maximamente responsivo a estímulos específicos\n• Visão binocular: primeiros 2 anos — privação causa ambliopia irreversível\n• Linguagem: pico até 5–7 anos — após essa janela, aquisição é muito mais difícil\n• Motricidade fina: moldada nos primeiros anos por interação sensório-motora\n• Após o período crítico, o circuito se estabiliza — a plasticidade diminui drasticamente",
                      "deepDive": "O que não é estimulado na janela certa pode não se desenvolver plenamente."
                  },
                  {
                      "title": "Falhas no Neurodesenvolvimento",
                      "content": "• Defeitos de fechamento do tubo neural → anencefalia, espinha bífida\n• Falha na migração neuronal → lissencefalia (córtex liso, sem giros)\n• Déficit na poda sináptica → implicado no Transtorno do Espectro Autista\n• Mielinização incompleta → disfunção executiva, TDAH\n• Lesão perinatal → paralisia cerebral (PC), alvo central da fisioterapia neuropediátrica",
                      "deepDive": ""
                  },
                  {
                      "title": "Relevância para Fisioterapia",
                      "content": "• Intervenção precoce aproveita janelas de plasticidade máxima\n• Estimulação sensório-motora guiada pode redirecionar circuitos em formação\n• Na PC, a fisioterapia trabalha com o que o neurodesenvolvimento preservou\n• Conhecer a timeline é essencial para definir metas realistas de reabilitação\n• O cérebro infantil é plástico mas não infinitamente — timing importa",
                      "deepDive": "Compreender o neurodesenvolvimento é a base para toda intervenção neurológica precoce."
                  }
              ]
          },
          {
              "title": "Marcos Pós-Natais",
              "subsections": [
                  {
                      "title": "Desenvolvimento Motor",
                      "content": "• Ao nascer: reflexos primitivos (sucção, marcha reflexa)\n• Reflexos devem desaparecer para dar lugar a movimentos voluntários\n• Direção céfalo-caudal: da cabeça para os pés\n• Direção próximo-distal: do centro para as pontas",
                      "deepDive": ""
                  }
              ]
          }
      ]
  },
  {
      "id": "N1-S3",
      "code": "NEURO-03",
      "title": "Base Celular e Fisiológica",
      "videoUrls": [],
      "chapters": [
          {
              "title": "O Que é Uma Célula Excitável?",
              "subsections": [
                  {
                      "title": "Célula Excitável — Definição",
                      "content": "• Nem toda célula viva é capaz de gerar sinais elétricos rápidos\n• Uma célula excitável é aquela cuja membrana consegue alterar rapidamente seu potencial elétrico em resposta a estímulos físicos ou químicos\n• Exemplos: neurônios, fibras musculares, células secretoras especializadas\n• O neurônio não é especial porque \"pensa\" — é especial porque transmite variação elétrica rapidamente e a longa distância",
                      "deepDive": "Excitabilidade nasce de: membrana isolante + gradientes iônicos + canais reguláveis."
                  },
                  {
                      "title": "A Base Física da Excitabilidade",
                      "content": "• 1. Membrana Isolante — separação de cargas (capacitor biológico)\n• 2. Gradientes Iônicos — mantidos ativamente pela bomba Na⁺/K⁺-ATPase\n• 3. Canais Iônicos — reguláveis por voltagem ou ligante\n• A membrana lipídica funciona como um capacitor: separa cargas, armazena diferença de potencial e permite descargas controladas\n• Sem qualquer uma dessas três propriedades, não existe sinal elétrico",
                      "deepDive": "A membrana como capacitor biológico — o fundamento de toda sinalização neural."
                  }
              ]
          },
          {
              "title": "Estrutura Celular do Sistema Nervoso",
              "subsections": [
                  {
                      "title": "Dois Tipos Fundamentais de Células",
                      "content": "• Neurônios — unidades sinalizadoras básicas do sistema nervoso\n• Neuróglia (glia) — células de suporte que auxiliam e protegem os neurônios\n• A neuróglia representa mais da metade do peso encefálico\n• Pode haver 10 a 50 vezes mais neuróglia do que neurônios\n• O neurônio é a unidade funcional: menor estrutura que realiza as funções do sistema",
                      "deepDive": "Neurônios + Neuróglia = os dois pilares celulares do sistema nervoso."
                  },
                  {
                      "title": "O Cérebro como Sistema Regulatório",
                      "content": "• Não é uma \"máquina de pensamento\" — é um sistema regulatório distribuído\n• Neurônios recebem estímulos, conduzem potenciais de ação e transmitem sinais\n• Neuróglia fornece suporte físico e bioquímico essencial\n• Ambos os tipos celulares são indispensáveis para o funcionamento neural",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "O Neurônio: Unidade Funcional",
              "subsections": [
                  {
                      "title": "Corpo Celular (Soma)",
                      "content": "• Centro metabólico do neurônio — essencial para o bem-estar celular\n• Núcleo com DNA: molde para toda a síntese proteica\n• Retículo Endoplasmático: síntese de proteínas e lipídios\n• Mitocôndrias: produção de ATP — energia para o neurônio\n• Aparelho de Golgi: processamento e empacotamento de proteínas",
                      "deepDive": "O soma é o \"centro de comando\" — sem ele, o neurônio morre."
                  },
                  {
                      "title": "Dendritos — Receptores de Sinais",
                      "content": "• Processos finos e ramificados que recebem informação de células vizinhas\n• Aumentam a área de superfície → comunicação com muitos outros neurônios\n• Variam de um único dendrito até ramificações de incrível complexidade\n• Espinhos dendríticos: variam de finos até formato de cogumelo\n• Espinhos podem alterar tamanho e formato em resposta a sinais (plasticidade)",
                      "deepDive": "Dendritos no SNC podem funcionar como compartimentos independentes — enviando sinais bidirecionais."
                  },
                  {
                      "title": "Funções Dendríticas por Localização",
                      "content": "• SNP: receber informação de entrada e transferir para região integradora\n• SNC: função mais complexa — espinhos como compartimentos independentes\n• Espinhos dendríticos enviam sinais de ida e volta com outros neurônios\n• Muitos contêm polirribossomos e podem produzir suas próprias proteínas\n• Plasticidade dendrítica: base celular da aprendizagem e memória",
                      "deepDive": ""
                  },
                  {
                      "title": "Axônio — Condutor de Informação",
                      "content": "• Forma, número e comprimento variam entre neurônios\n• Maioria dos neurônios periféricos: único axônio originado do cone axonal\n• Comprimento: de mais de 1 metro até poucos micrômetros\n• Função primária: transmitir sinais elétricos de saída até as células-alvo\n• Na porção distal: sinal elétrico → secreção de molécula mensageira (neurotransmissor)",
                      "deepDive": "O axônio NÃO possui ribossomos nem RE — proteínas são transportadas do soma via transporte axonal."
                  }
              ]
          },
          {
              "title": "Transporte Axonal",
              "subsections": [
                  {
                      "title": "Transporte Lento — Fluxo Axoplasmático",
                      "content": "• Velocidade: 0,2 – 2,5 mm/dia\n• Transporta enzimas e proteínas do citoesqueleto\n• Componentes que não são consumidos rapidamente\n• Movimento por fluxo citoplasmático contínuo",
                      "deepDive": ""
                  },
                  {
                      "title": "Transporte Rápido — Via Microtúbulos",
                      "content": "• Velocidade: até 400 mm/dia (≈ 15,75 polegadas/dia)\n• Utiliza proteínas motoras (cinesina e dineína) sobre microtúbulos\n• Transporta organelas: mitocôndrias, vesículas sinápticas\n• O transporte rápido é 160× mais rápido que o lento!\n• Essencial para entregar componentes vitais aos terminais axonais distantes",
                      "deepDive": "160× — transporte rápido vs. lento. Sem microtúbulos, o terminal sináptico morre."
                  }
              ]
          },
          {
              "title": "Condução Saltatória e Mielina",
              "subsections": [
                  {
                      "title": "Bainha de Mielina",
                      "content": "• Isolante lipídico que envolve axônios em segmentos (internodos)\n• SNC: formada por oligodendrócitos (1 célula → até 50 axônios)\n• SNP: formada por células de Schwann (1 célula → 1 internodo)\n• Entre os segmentos: nós de Ranvier — gaps com canais iônicos expostos\n• A mielina impede a dissipação da corrente iônica ao longo do axônio",
                      "deepDive": "Mielina = velocidade + eficiência energética. Doenças desmielinizantes (ex: esclerose múltipla) destroem essa vantagem."
                  },
                  {
                      "title": "Condução Saltatória vs. Contínua",
                      "content": "• Saltatória (mielinizada): sinal \"salta\" entre nós de Ranvier — até 120 m/s\n• Contínua (não-mielinizada): despolarização ponto a ponto — 0,5 a 2 m/s\n• Saltatória é ≈60× mais rápida e gasta menos energia (menos canais ativados)\n• Nós de Ranvier: concentração de canais de Na⁺ voltagem-dependentes\n• Entre os nós: corrente passiva (eletrotônica) sob a mielina",
                      "deepDive": "Condução saltatória: velocidade de 120 m/s com economia energética — evolução em ação."
                  }
              ]
          },
          {
              "title": "Classificação dos Neurônios",
              "subsections": [
                  {
                      "title": "Classificação Funcional",
                      "content": "• Sensoriais (aferentes): conduzem potenciais de ação em direção ao SNC\n• Motores (eferentes): conduzem do SNC para músculos ou glândulas\n• Interneurônios: conduzem de um neurônio para outro dentro do SNC",
                      "deepDive": ""
                  },
                  {
                      "title": "Classificação Estrutural",
                      "content": "• Multipolares: vários dendritos + 1 axônio longo — tipo mais comum no SNC\n• Pseudounipolares: corpo celular lateral em processo único em T (neurônios sensoriais)\n• Bipolares: 1 axônio + 1 dendrito — retina e epitélio olfatório\n• Anaxônicos: sem axônio identificável, dendritos difusos — células amácrinas na retina",
                      "deepDive": "Estrutura define função: a forma de cada neurônio é adaptada ao seu papel no circuito."
                  }
              ]
          },
          {
              "title": "Neuróglia — Células de Suporte",
              "subsections": [
                  {
                      "title": "Neuróglia do SNC",
                      "content": "• Oligodendrócitos: produzem mielina no SNC (1 célula → até 50 axônios)\n• Astrócitos: sustentação, barreira hematoencefálica, regulação de K⁺, captação de neurotransmissores\n• Microglia: fagocitose, poda sináptica, resposta inflamatória — o \"sistema imune\" do SNC\n• Células ependimárias: revestem ventrículos, cílios circulam o LCR",
                      "deepDive": ""
                  },
                  {
                      "title": "Neuróglia do SNP",
                      "content": "• Células de Schwann: produzem mielina no SNP (1 célula → 1 internodo)\n• Participam na regeneração axonal — formam tubos de regeneração\n• Células Satélite (anfícitos): envolvem corpos celulares nos gânglios\n• Regulação do microambiente ganglionar e suporte nutricional",
                      "deepDive": ""
                  },
                  {
                      "title": "Funções Integradas da Neuróglia",
                      "content": "• Formação e permeabilidade da barreira hematoencefálica\n• Fagocitose de substâncias estranhas e debris celulares\n• Produção e circulação de líquido cerebrospinal (LCR)\n• Formação de bainha de mielina ao redor dos axônios\n• Apesar de não transmitirem sinais elétricos a longa distância, comunicam-se com neurônios\n• Fornecem suporte físico e bioquímico indispensável",
                      "deepDive": "Neuróglia: >50% do peso encefálico, 10–50× mais numerosas que neurônios — o sistema nervoso NÃO funciona sem elas."
                  }
              ]
          }
      ]
  },
  {
      "id": "N1-S4",
      "code": "NEURO-04",
      "title": "Suporte, Nutrição e Proteção",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Princípio Fundamental",
              "subsections": [
                  {
                      "title": "O Cérebro Não É Um Processador Abstrato",
                      "content": "• Os tratados clássicos (Guyton & Hall, Kandel, Purves, Bear) convergem:\n• O cérebro é um órgão biológico — metabolicamente caro, altamente vulnerável\n• Dependente de suprimento contínuo de O₂ e glicose\n• Pensar, decidir, aprender e regular emoção NÃO são propriedades \"mágicas\" da mente\n• São efeitos emergentes de uma cadeia de suporte metabólico",
                      "deepDive": "Não existe \"vontade\" forte o suficiente para superar falta de O₂ ou glicose. Não existe \"força mental\" capaz de substituir ATP."
                  },
                  {
                      "title": "A Cadeia Metabólica Neural",
                      "content": "• O₂ + Glicose → ATP (fosforilação oxidativa)\n• ATP → Gradientes iônicos (Na⁺/K⁺-ATPase)\n• Gradientes → Potencial de Ação\n• Potencial de Ação → Função Neural\n• Quebrou qualquer elo → o sistema colapsa",
                      "deepDive": "Função cerebral não é produto da vontade. É produto de viabilidade metabólica."
                  },
                  {
                      "title": "Os Números da Dependência",
                      "content": "• Cérebro = 2% do peso corporal total\n• Consome 20% de todo o O₂ do organismo\n• Consome 25% de toda a glicose circulante\n• 60–80% do ATP cerebral vai para as bombas iônicas (Attwell & Laughlin, 2001)\n• Sem reserva significativa de glicose ou O₂ — dependência contínua do sangue",
                      "deepDive": "O cérebro é o órgão mais caro do corpo — e não tem reserva."
                  }
              ]
          },
          {
              "title": "Barreira Hematoencefálica (BHE)",
              "subsections": [
                  {
                      "title": "O Que é a BHE",
                      "content": "• Não é uma \"parede\" — é uma interface regulatória ativa\n• Formada por células endoteliais altamente especializadas nos capilares cerebrais\n• Junções apertadas (tight junctions) entre células endoteliais\n• Pericitos e pés astrocitários completam a barreira\n• Forma a unidade neurovascular junto com neurônios e glia",
                      "deepDive": "A BHE é a fronteira inteligente entre o sangue e o tecido neural."
                  },
                  {
                      "title": "O Que Passa e o Que Não Passa",
                      "content": "• ✓ PASSA: O₂ (difusão livre), glicose (GLUT-1), aminoácidos essenciais (transportadores)\n• ✓ PASSA: Hormônios lipofílicos, moléculas pequenas e apolares\n• ✕ BLOQUEIA: Patógenos (bactérias, vírus), toxinas circulantes\n• ✕ BLOQUEIA: Moléculas grandes, proteínas plasmáticas, maioria dos fármacos\n• Por isso muitos medicamentos não chegam ao cérebro — desafio farmacológico",
                      "deepDive": ""
                  },
                  {
                      "title": "Quando a BHE Falha",
                      "content": "• Danos à BHE → entrada de substâncias neurotóxicas\n• Edema cerebral: acúmulo de líquido no tecido neural\n• Neuroinflamação: ativação descontrolada de micróglia\n• Presente em: esclerose múltipla, AVC, trauma craniano, meningite\n• Comprometimento funcional pode ser irreversível",
                      "deepDive": "BHE intacta = proteção. BHE comprometida = neurotoxicidade, edema, inflamação."
                  }
              ]
          },
          {
              "title": "Glia: A Infraestrutura Invisível",
              "subsections": [
                  {
                      "title": "Glia NÃO São Células Auxiliares Passivas",
                      "content": "• Historicamente subestimadas — \"cola\" neural\n• Na realidade: sistemas ativos de suporte sem os quais neurônios NÃO funcionam\n• Representam >50% do peso encefálico\n• 10 a 50× mais numerosas que neurônios\n• A função neural é emergência de um sistema INTEGRADO neurônio-glia",
                      "deepDive": "Sem glia funcional, o neurônio mais \"inteligente\" colapsa."
                  },
                  {
                      "title": "Astrócitos — O Sistema de Suporte Metabólico",
                      "content": "• Regulação do K⁺ extracelular (previne hiperexcitabilidade)\n• Recaptação de glutamato (previne excitotoxicidade)\n• Fornecimento de lactato como combustível para neurônios\n• Manutenção do pH extracelular\n• Pés astrocitários formam parte da BHE\n• Sem astrócitos: K⁺ acumula → crises epilépticas, glutamato mata neurônios",
                      "deepDive": "Astrócitos: do capilar ao neurônio — a ponte metabólica essencial."
                  },
                  {
                      "title": "Oligodendrócitos e Schwann — Eficiência",
                      "content": "• Oligodendrócitos (SNC): 1 célula mieliniza até 50 axônios\n• Células de Schwann (SNP): 1 célula → 1 internodo\n• Mielina: isolante lipídico que permite condução saltatória\n• Sem mielina: velocidade cai de 120 m/s para ~2 m/s\n• Esclerose múltipla: destruição autoimune da mielina do SNC",
                      "deepDive": ""
                  },
                  {
                      "title": "Micróglia — Vigilância e Manutenção",
                      "content": "• Sistema imune residente do SNC\n• Vigilância contínua: monitora o microambiente 24h\n• Fagocitose: remove debris celulares e patógenos\n• Poda sináptica: marca e elimina sinapses fracas no desenvolvimento\n• Resposta inflamatória: ativação em lesão ou infecção\n• Ativação crônica: associada a doenças neurodegenerativas (Alzheimer, Parkinson)",
                      "deepDive": "Micróglia: zeladora, guardiã e escultora do cérebro."
                  }
              ]
          },
          {
              "title": "Síntese: Infraestrutura como Pré-Requisito",
              "subsections": [
                  {
                      "title": "Conclusão do Capítulo",
                      "content": "• Função cerebral NÃO é produto da vontade — é produto de viabilidade metabólica\n• Sem oxigênio, glicose, barreira e glia, não há cognição, decisão ou comportamento\n• O₂ + Glicose → ATP → Gradientes → PA → Função → Comportamento\n• A BHE protege mas também limita: desafio para tratamentos farmacológicos\n• Glia é infraestrutura ativa, não passiva — co-protagonista da função neural",
                      "deepDive": "Não existe função neural sem infraestrutura. O cérebro é um órgão biológico, não uma abstração."
                  },
                  {
                      "title": "Relevância Clínica",
                      "content": "• AVC: interrupção de O₂ → morte neuronal em minutos\n• Hipoglicemia severa: sem glicose → convulsões, coma\n• Esclerose múltipla: perda de mielina → déficit motor e cognitivo\n• Meningite: BHE comprometida → neuroinflamação grave\n• Alzheimer: micróglia cronicamente ativada → neurodegeneração\n• Entender infraestrutura = entender vulnerabilidades do SN",
                      "deepDive": "Para o fisioterapeuta: conhecer a infraestrutura neural é saber ONDE e POR QUE o sistema falha."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S1",
      "code": "PNEUMO-01",
      "title": "Anatomofisiologia Respiratória",
      "videoUrls": [],
      "chapters": [
          {
              "title": "O Que é Respiração e Funções Extras",
              "subsections": [
                  {
                      "title": "Desafio Fisiológico da Superfície de Troca",
                      "content": "• Os órgãos respiratórios têm diversas formas, porém todos possuem uma grande área de superfície comprimida em um pequeno espaço.\n• Além de necessitar de uma grande superfície de troca, seres humanos e outros animais terrestres enfrentam um desafio fisiológico adicional: a desidratação.\n• A superfície de troca deve ser fina e úmida para permitir que os gases passem do ar para a solução.\n• Ao mesmo tempo, deve ser protegida de secar como resultado da exposição ao ar.",
                      "deepDive": "A fina espessura e umidade da superfície respiratória são pré-requisitos físicos fundamentais para a difusão gasosa passiva eficiente."
                  },
                  {
                      "title": "Internalização e a Bomba Muscular",
                      "content": "• Solução anatômica: um epitélio respiratório internalizado nos pulmões encerrados na cavidade do tórax, limitando o contato direto com o ar exterior.\n• A internalização cria um ambiente úmido ideal para as trocas gasosas com o sangue e protege a delicada superfície alveolar contra danos.\n• Novo desafio: mover o ar entre a atmosfera e a superfície de troca profunda, o que requer uma bomba muscular para criar gradientes de pressão.\n• Sistemas complexos consistem em dois componentes separados: uma bomba muscular (estruturas do tórax) e uma superfície de troca úmida e fina (epitélio alveolar com vasos associados).",
                      "deepDive": "O movimento de ar para os pulmões internalizados necessita do trabalho coordenado de estruturas musculoesqueléticas da caixa torácica."
                  },
                  {
                      "title": "Quatro Processos da Respiração",
                      "content": "• 1. Ventilação: movimento de entrada e saída de ar dos pulmões\n• 2. Hematose (respiração externa): troca gasosa entre ar alveolar e sangue nos capilares pulmonares\n• 3. Transporte: O₂ e CO₂ carregados pelo sangue (hemoglobina e plasma)\n• 4. Respiração interna: troca gasosa entre sangue e tecidos\n• Esses 4 processos são distintos porém interdependentes",
                      "deepDive": "A respiração supre o O₂ para produção de ATP e elimina o CO₂ — ligação direta com respiração celular."
                  },
                  {
                      "title": "Hematose Alveolar",
                      "content": "• Ponto central da respiração: alvéolos ⇄ capilares pulmonares\n• O₂ difunde do ar alveolar para o sangue (PO₂: 104 → 40 mmHg)\n• CO₂ difunde do sangue para o ar alveolar (PCO₂: 45 → 40 mmHg)\n• Difusão por gradiente de pressão parcial (Lei de Fick)\n• Membrana respiratória: apenas 0,2 µm de espessura",
                      "deepDive": ""
                  },
                  {
                      "title": "Transporte de O₂ no Sangue",
                      "content": "• Hemoglobina (Hb): proteína com 4 sítios de ligação ao O₂\n• Hb + 4O₂ ⇄ Hb(O₂)₄ — reação reversível\n• 98,5% do O₂ transportado ligado à Hb\n• 1,5% dissolvido no plasma\n• CO₂ transportado: 7% dissolvido, 23% ligado à Hb, 70% como HCO₃⁻",
                      "deepDive": "Sem hemoglobina, o sangue carregaria apenas 1,5% do O₂ necessário."
                  },
                  {
                      "title": "Quatro Funções Primárias do Sistema",
                      "content": "• 1. Troca de gases: traz o O₂ da atmosfera e o distribui para os tecidos, eliminando o CO₂ metabólico.\n• 2. Regulação homeostática do pH: os pulmões alteram o pH corporal retendo ou eliminando seletivamente o CO₂.\n• 3. Proteção contra patógenos e irritantes inalados: o epitélio é suprido com defesas que capturam e destroem substâncias nocivas.\n• 4. Vocalização: o fluxo de ar move as pregas vocais, gerando as vibrações necessárias para a comunicação falada ou cantada.",
                      "deepDive": "Estas quatro funções integradas atuam simultaneamente para manter o equilíbrio fisiológico corporal e a interação com o ambiente."
                  },
                  {
                      "title": "Outras Funções e Regulação",
                      "content": "• 1. Regulação do pH sanguíneo: alteração rápida do pH através da modificação dos níveis de dióxido de carbono dissolvido.\n• 2. Produção de mediadores químicos: síntese pulmonar da Enzima Conversora de Angiotensina (ECA), regulador crucial da pressão arterial.\n• 3. Produção da voz: pregas vocais como fonte de som com a passagem de fluxo aéreo.\n• 4. Olfação: percepção olfatória desencadeada por moléculas que penetram na cavidade nasal.\n• 5. Proteção integrada: barreira celular e imunológica contra patógenos na superfície respiratória.",
                      "deepDive": "A síntese da ECA pelo endotélio capilar pulmonar ilustra o papel sistêmico do pulmão na homeostase hemodinâmica."
                  },
                  {
                      "title": "Funções Adicionais do Sistema Respiratório",
                      "content": "• 1. Regulação do pH sanguíneo — alterando níveis de CO₂ (tampão bicarbonato)\n• 2. Produção de mediadores químicos — ECA (enzima conversora da angiotensina) → regulação da PA\n• 3. Produção da voz — passagem do ar pelas pregas vocais gera som\n• 4. Olfação — moléculas do ar alcançam epitélio olfatório na cavidade nasal\n• 5. Proteção — barreiras contra microrganismos e partículas",
                      "deepDive": "O pulmão não é apenas para respirar — é órgão endócrino, imunológico e regulador de pH."
                  }
              ]
          },
          {
              "title": "Componentes do Sistema Respiratório",
              "subsections": [
                  {
                      "title": "Estruturas Anatômicas",
                      "content": "• Nariz externo e cavidade nasal: filtração, aquecimento, umidificação\n• Faringe: via comum para ar e alimento (naso, oro e laringofaringe)\n• Laringe: pregas vocais + epiglote (proteção contra aspiração)\n• Traqueia: 16-20 anéis cartilaginosos em C, epitélio mucociliar\n• Brônquios: ramificação dicotômica em 23 gerações\n• Pulmões: direito (3 lobos) e esquerdo (2 lobos + incisura cardíaca)",
                      "deepDive": ""
                  },
                  {
                      "title": "Músculos da Respiração",
                      "content": "• Diafragma: principal músculo inspiratório (inervação: nervo frênico C3-C5)\n• Intercostais externos: elevam as costelas na inspiração\n• Intercostais internos: auxiliam na expiração forçada\n• Músculos acessórios: escalenos, esternocleidomastóideo (inspiração forçada)\n• Abdominais: reto, oblíquos, transverso (expiração forçada/tosse)",
                      "deepDive": "A expiração em repouso é PASSIVA — retorno elástico dos pulmões. Apenas a inspiração requer contração muscular ativa."
                  }
              ]
          },
          {
              "title": "Classificação Funcional: Zonas",
              "subsections": [
                  {
                      "title": "Zona Condutora",
                      "content": "• Do nariz até os bronquíolos terminais\n• Função: movimento, limpeza, aquecimento e umidificação do ar\n• NÃO realiza troca gasosa — apenas conduz\n• Constitui o \"espaço morto anatômico\" (~150 mL)\n• Epitélio pseudoestratificado colunar ciliado com células caliciformes",
                      "deepDive": ""
                  },
                  {
                      "title": "Zona Respiratória",
                      "content": "• Bronquíolos respiratórios → ductos alveolares → sacos alveolares → alvéolos\n• Local da hematose: troca gasosa entre ar e sangue\n• 300-500 milhões de alvéolos nos dois pulmões\n• Superfície total de troca: ~70 m² (tamanho de quadra de tênis)\n• Pneumócitos tipo I (troca gasosa) e tipo II (surfactante)",
                      "deepDive": "Zona condutora = passagem e limpeza. Zona respiratória = hematose. São funcionalmente complementares."
                  }
              ]
          },
          {
              "title": "Mecanismos de Defesa Respiratória",
              "subsections": [
                  {
                      "title": "1ª Barreira: Nariz e Nasofaringe",
                      "content": "• Pelos nasais (vibrissas): filtram partículas grossas\n• Muco: cobre septo e conchas nasais — aprisiona partículas e patógenos\n• Imunoglobulina A (IgA): primeira linha de defesa imunológica\n• Aquecimento: ar frio → temperatura corporal em milissegundos\n• Umidificação: ar seco → saturação de vapor (~100% umidade)",
                      "deepDive": ""
                  },
                  {
                      "title": "2ª Barreira: Aparato Mucociliar",
                      "content": "• Epitélio colunar pseudoestratificado ciliado\n• Células caliciformes produzem muco (camada gel + sol)\n• Cílios batem a 600-900 batimentos/min\n• Movimento rápido ascendente: \"escada rolante mucociliar\"\n• Transporta muco + partículas presas até a faringe (deglutição ou expectoração)\n• Fumo e poluição paralisam os cílios → comprometimento grave da defesa",
                      "deepDive": ""
                  },
                  {
                      "title": "3ª Barreira: Defesa Bioquímica/Imunológica",
                      "content": "• IgA: predominante nas mucosas — neutraliza patógenos na superfície\n• IgG: opsonização e ativação do complemento\n• IgM: resposta primária a novos patógenos\n• Macrófagos alveolares: \"células de poeira\" — fagocitose no alvéolo\n• Surfactante: além de reduzir tensão superficial, tem propriedades antimicrobianas",
                      "deepDive": "3 barreiras integradas: física (pelos/muco) + mecânica (cílios) + bioquímica (imunoglobulinas + macrófagos)."
                  }
              ]
          },
          {
              "title": "Síntese do Capítulo",
              "subsections": [
                  {
                      "title": "A Respiração como Processo Vital",
                      "content": "• Não é apenas \"inspirar e expirar\" — são 4 processos integrados\n• Ventilação → Hematose → Transporte → Troca tecidual\n• O sistema tem dupla classificação: condutor (limpeza) + respiratório (troca)\n• 3 camadas de defesa protegem contra invasão e contaminação\n• O pulmão produz ECA, regula pH e participa do sistema imunológico",
                      "deepDive": "Compreender anatomia e fisiologia respiratória é pré-requisito para toda intervenção em fisioterapia pneumofuncional."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S2",
      "code": "PNEUMO-02",
      "title": "Zona Condutora e Respiratória",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Nariz e Cavidade Nasal",
              "subsections": [
                  {
                      "title": "Estrutura do Nariz",
                      "content": "• Nariz externo: cartilagem hialina + osso nasal + extensões frontal e maxilar\n• Cavidade nasal: estende-se das narinas (externas) até as coanas (aberturas para faringe)\n• Vestíbulo: parte anterior, epitélio escamoso estratificado contínuo com a pele\n• Septo nasal: divisória — parte anterior cartilaginosa, posterior óssea (vômer + etmoide)\n• Palato duro: separa cavidade nasal da oral",
                      "deepDive": ""
                  },
                  {
                      "title": "5 Funções da Cavidade Nasal",
                      "content": "• 1. Passagem de ar — permanece aberta mesmo com boca cheia de comida\n• 2. Filtração — pelos no vestíbulo capturam partículas; conchas tornam fluxo turbulento\n• 3. Aquecimento e umidificação — sangue aquecido nas conchas + muco + lágrimas do canal nasolacrimal\n• 4. Olfato — células receptoras olfatórias na parte superior\n• 5. Ressonância vocal — cavidade nasal e seios paranasais são câmaras de ressonância",
                      "deepDive": "Conchas nasais: 3 cristas ósseas que triplicam a área de superfície e criam fluxo turbulento para máximo contato com a mucosa."
                  },
                  {
                      "title": "Conchas e Meatos",
                      "content": "• Conchas Superior, Média e Inferior — modificam paredes laterais da cavidade nasal\n• Abaixo de cada concha: meato (passagem) — superior, médio e inferior\n• Aumentam turbulência do ar inspirado → maior contato com mucosa\n• Mucosa: epitélio colunar pseudoestratificado ciliado com células caliciformes\n• Muco captura resíduos → cílios movem muco até faringe → deglutido",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Faringe — Via Comum",
              "subsections": [
                  {
                      "title": "Nasofaringe (Somente AR)",
                      "content": "• Atrás das coanas, acima do palato mole\n• Úvula: extensão do palato mole — impede alimento de entrar na nasofaringe\n• Epitélio: colunar pseudoestratificado ciliado com caliciformes\n• Tubas auditivas: abrem-se aqui para equalizar pressão na orelha média\n• Tonsila faríngea (adenoide): defesa contra infecções",
                      "deepDive": ""
                  },
                  {
                      "title": "Orofaringe e Laringofaringe",
                      "content": "• Orofaringe: do palato mole até epiglote — AR + ALIMENTO passam aqui\n• Epitélio: escamoso estratificado úmido (proteção contra abrasão)\n• Tonsilas palatinas e linguais nas fauces\n• Laringofaringe: da epiglote ao esôfago — BIFURCAÇÃO final\n• Anterior → Laringe (via aérea) | Posterior → Esôfago (via digestiva)",
                      "deepDive": "Deglutição: língua empurra → palato mole fecha nasofaringe → epiglote fecha laringe → alimento vai pro esôfago."
                  }
              ]
          },
          {
              "title": "Laringe — 9 Cartilagens",
              "subsections": [
                  {
                      "title": "Cartilagens Não-Pareadas (3)",
                      "content": "• Tireoide: formato de escudo, maior cartilagem (pomo de Adão). Hialina\n• Cricoide: formato de anel completo, base da laringe. Hialina\n• Epiglote: aba livre que fecha a glote na deglutição. ÚNICA cartilagem ELÁSTICA",
                      "deepDive": ""
                  },
                  {
                      "title": "Cartilagens Pareadas (3 pares = 6)",
                      "content": "• Aritenoides (2): formato de concha, articulam com cricoide. Movem pregas vocais\n• Corniculadas (2): formato de corno, sobre as aritenoides\n• Cuneiformes (2): formato de cunha, na membrana mucosa anterior às corniculadas",
                      "deepDive": ""
                  },
                  {
                      "title": "4 Funções da Laringe",
                      "content": "• 1. Manter passagem livre — cartilagens tireoide e cricoide sustentam via aérea aberta\n• 2. Proteção na deglutição — epiglote fecha a abertura da laringe\n• 3. Fonação — pregas vocais vibram com passagem do ar; amplitude = intensidade, frequência = tom\n• 4. Limpeza mucociliar — epitélio ciliado produz muco que captura detritos",
                      "deepDive": "Homens: pregas vocais maiores → voz mais grave. Sem laringe: possível produzir som com vibração do esôfago."
                  }
              ]
          },
          {
              "title": "Traqueia — Anéis em C",
              "subsections": [
                  {
                      "title": "Estrutura da Traqueia",
                      "content": "• 15-20 anéis de cartilagem hialina em formato de \"C\"\n• Parede anterior/lateral: cartilagem sustenta via aérea aberta\n• Parede posterior: SEM cartilagem — membrana elástica + músculo traqueal\n• Músculo traqueal: contrai na tosse → estreita diâmetro → ar move mais rápido\n• Esôfago localizado logo atrás da parede posterior",
                      "deepDive": ""
                  },
                  {
                      "title": "Dimensões e Carina",
                      "content": "• Diâmetro: ~12mm | Comprimento: 10-12cm\n• Bifurcação: nível da 5ª vértebra torácica (T5)\n• Carina: cartilagem mais inferior, forma \"quilha\" que separa brônquios principais\n• Mucosa da carina: MUITO sensível — estimula reflexo de tosse intenso\n• Partículas abaixo da carina NÃO estimulam esse reflexo tão intenso",
                      "deepDive": "Fumantes: epitélio traqueal se transforma em escamoso estratificado → perda de cílios e caliciformes → função de limpeza destruída."
                  }
              ]
          },
          {
              "title": "Reflexos de Proteção",
              "subsections": [
                  {
                      "title": "Espirro e Tosse",
                      "content": "• Espirro: receptores nasais/nasofaringe → velocidade até 150 km/h\n• Tosse: 5 fases — 1) Irritativa 2) Inspiratória (~2,5L) 3) Compressiva (glote fecha, pressão ↑300mmHg)\n• 4) Expulsiva (glote abre, ar até 160 km/h) 5) Relaxamento\n• Tosse reflexa (involuntária) vs. voluntária | Produtiva vs. seca\n• Receptores mais sensíveis: laringe > traqueia > brônquios",
                      "deepDive": ""
                  },
                  {
                      "title": "Outros Mecanismos",
                      "content": "• Broncoconstrição: contração da musculatura lisa brônquica, reduz passagem de ar\n• Reflexo epiglótico: interrompe ventilação brevemente durante deglutição\n• Na asma: contrações da musculatura lisa → ↓diâmetro → ↑resistência → ↓fluxo\n• Tratamento: albuterol relaxa musculatura lisa dos bronquíolos terminais\n• Exercício: diâmetro ↑ → resistência ↓ → volume de ar ↑",
                      "deepDive": "Asma grave: movimento de ar tão restrito que pode ser fatal. Medicamentos broncodilatadores são essenciais."
                  }
              ]
          },
          {
              "title": "Árvore Traqueobronquial — 23 Gerações",
              "subsections": [
                  {
                      "title": "Divisões da Árvore Bronquial",
                      "content": "• Brônquios principais: traqueia divide-se em D (mais vertical/largo) and E\n• Brônquios lobares (secundários): D tem 3, E tem 2\n• Brônquios segmentares (terciários): suprem segmentos broncopulmonares (10D + 9E)\n• Bronquíolos: <1mm diâmetro, se subdividem até bronquíolos terminais\n• Total: ~16 gerações de ramificação da traqueia aos bronquíolos terminais",
                      "deepDive": "Brônquio D mais vertical e largo → substâncias aspiradas se alojam mais facilmente no lado direito."
                  },
                  {
                      "title": "Mudanças nas Paredes",
                      "content": "• Brônquios principais: cartilagens em C + musculatura lisa\n• Brônquios lobares: placas de cartilagem substituem anéis em C\n• À medida que diminuem: cartilagem ↓, musculatura lisa ↑\n• Bronquíolos terminais: SEM cartilagem, camada muscular proeminente\n• Relaxamento/contração da musculatura lisa → modifica fluxo aéreo",
                      "deepDive": ""
                  },
                  {
                      "title": "3 Zonas Funcionais",
                      "content": "• Zona Condutora (gerações 0-16): condução, filtração, aquecimento — SEM troca gasosa\n• Zona de Transição (gerações 17-19): bronquíolos respiratórios, primeiros alvéolos\n• Zona Respiratória (gerações 20-23): ductos alveolares, sacos alveolares — TROCA GASOSA\n• Total: 2²³ = ~8 milhões de vias terminais\n• Área de superfície alveolar: 70-100 m²",
                      "deepDive": "23 gerações: da traqueia (Ø12mm) até alvéolos (Ø250µm) — 300-500 milhões de unidades de troca."
                  }
              ]
          },
          {
              "title": "Alvéolos e Membrana Respiratória",
              "subsections": [
                  {
                      "title": "Estrutura dos Alvéolos",
                      "content": "• 300-500 milhões nos dois pulmões\n• Diâmetro: ~250 µm | Área total: 70-100 m² (quadra de tênis)\n• Pneumócitos tipo I: células finas escamosas — 90% da superfície — TROCA GASOSA\n• Pneumócitos tipo II: células cuboides — produzem SURFACTANTE pulmonar\n• Surfactante: reduz tensão superficial → facilita expansão na inspiração",
                      "deepDive": ""
                  },
                  {
                      "title": "Membrana Respiratória — 6 Camadas",
                      "content": "• 1. Fluido alveolar (surfactante)\n• 2. Epitélio alveolar (pneumócito tipo I)\n• 3. Membrana basal do epitélio\n• 4. Espaço intersticial\n• 5. Membrana basal do endotélio\n• 6. Endotélio capilar",
                      "deepDive": "Espessura total: ~0,5 µm. Difusão ∝ Área × ΔP / Espessura (Lei de Fick)."
                  },
                  {
                      "title": "Limpeza na Zona Respiratória",
                      "content": "• Epitélio dos alvéolos NÃO é ciliado\n• Macrófagos alveolares (\"células de poeira\"): fagocitam detritos na superfície\n• Macrófagos migram para vasos linfáticos ou bronquíolos terminais\n• Nos bronquíolos: ficam retidos no muco → \"varridos\" até a faringe\n• Fibras elásticas ao redor: expansão na inspiração, retração na expiração",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Pulmões — Anatomia Macroscópica",
              "subsections": [
                  {
                      "title": "Estrutura dos Pulmões",
                      "content": "• Formato cônico: base no diafragma, ápice ~2,5cm acima da clavícula\n• Pulmão Direito: 3 lobos (sup, méd, inf) — 2 fissuras — 10 segmentos — ~620g\n• Pulmão Esquerdo: 2 lobos (sup, inf) — 1 fissura — 9 segmentos — ~565g\n• Incisura cardíaca: acomodação do coração no pulmão esquerdo\n• Hilo: região medial onde entram/saem brônquios, vasos, nervos, linfáticos",
                      "deepDive": ""
                  },
                  {
                      "title": "Divisões Funcionais",
                      "content": "• Lobos: separados por fissuras profundas, supridos por brônquios lobares\n• Segmentos broncopulmonares: 10D + 9E, separados por septos de tecido conectivo\n• Segmentos podem ser removidos cirurgicamente sem comprometer o restante\n• Lóbulos: subdivisão dos segmentos, supridos por bronquíolos\n• Pulmões muito elásticos — quando inflados, expelem ar e retornam ao estado original",
                      "deepDive": "Capacidade total: ~6L. Frequência respiratória em repouso: ~15 rpm. Volume corrente: ~500 mL."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S3",
      "code": "PNEUMO-03",
      "title": "Mecânica Respiratória",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Dinâmica do Ciclo Ventilatório",
              "subsections": [
                  {
                      "title": "Inspiração — Processo ATIVO",
                      "content": "• Músculos inspiratórios contraem (diafragma principal)\n• Volume torácico e alveolar AUMENTA\n• Pressão alveolar DIMINUI (fica negativa)\n• P.alveolar < P.atmosférica → ar ENTRA nos pulmões\n• Volume corrente: ~500 mL de ar inspirado",
                      "deepDive": "Inspiração = contração muscular ativa. Sem contração, não há entrada de ar."
                  },
                  {
                      "title": "Expiração — Processo PASSIVO",
                      "content": "• Músculos inspiratórios RELAXAM\n• Retração elástica dos pulmões e da caixa torácica\n• Volume torácico e alveolar DIMINUI\n• Pressão alveolar AUMENTA (fica positiva)\n• P.alveolar > P.atmosférica → ar SAI dos pulmões",
                      "deepDive": "Expiração em repouso é PASSIVA — não requer contração muscular. Apenas a expiração forçada (tosse, exercício) usa músculos."
                  }
              ]
          },
          {
              "title": "Pressões Respiratórias",
              "subsections": [
                  {
                      "title": "Pressão Pleural",
                      "content": "• Pressão do líquido no espaço entre pleura visceral e parietal\n• Normalmente NEGATIVA (sucção que mantém pulmões expandidos)\n• Início da inspiração: -5 cmH₂O\n• Durante inspiração normal: -7,5 cmH₂O (mais negativa)\n• A expansão da caixa torácica cria pressão mais negativa → puxa pulmões",
                      "deepDive": ""
                  },
                  {
                      "title": "Pressão Alveolar",
                      "content": "• Pressão do ar dentro dos alvéolos\n• Com glote aberta e sem fluxo: igual à P.atmosférica (0 cmH₂O)\n• Inspiração: -1 cmH₂O (ligeiramente negativa → ar entra)\n• Expiração: +1 cmH₂O (positiva → empurra 500mL em 2-3 segundos)\n• O gradiente de pressão é PEQUENO: apenas ±1 cmH₂O move meio litro de ar",
                      "deepDive": "Apenas 1 cmH₂O de diferença é suficiente para mover 500mL de ar — a engenharia pulmonar é extraordinariamente eficiente."
                  }
              ]
          },
          {
              "title": "Músculos Respiratórios",
              "subsections": [
                  {
                      "title": "Músculos Inspiratórios",
                      "content": "• Diafragma (C3-C5): PRINCIPAL músculo inspiratório. Movimento crânio-caudal\n• Intercostais Externos (T1-T12): elevam as costelas. Movimento ântero-posterior\n• Escalenos: elevam as duas primeiras costelas (acessório)\n• Esternocleidomastóideo (ECM): eleva o esterno (acessório)\n• Serráteis Anteriores: elevam várias costelas (acessório)",
                      "deepDive": "Diafragma = 75% do trabalho inspiratório. Lesão do nervo frênico (C3-C5) = paralisia diafragmática."
                  },
                  {
                      "title": "Músculos Expiratórios",
                      "content": "• Em repouso: expiração é PASSIVA (retração elástica)\n• Expiração FORÇADA usa músculos ativamente:\n• Reto Abdominal: puxa costelas inferiores para baixo + comprime abdômen contra diafragma\n• Intercostais Internos: puxam a caixa torácica para baixo\n• Oblíquos e Transverso do Abdômen: comprimem conteúdo abdominal",
                      "deepDive": ""
                  },
                  {
                      "title": "Mecanismo Integrado",
                      "content": "• Inspiração: diafragma desce + costelas sobem → ↑ volume → ↓ pressão → ar entra\n• Expiração: diafragma sobe + costelas descem → ↓ volume → ↑ pressão → ar sai\n• Lei de Boyle: P × V = constante (a mesma massa de gás)\n• O pulmão NÃO se expande sozinho — é puxado pela caixa torácica via pleura\n• O acoplamento pleural é essencial: pneumotórax rompe essa ligação → pulmão colapsa",
                      "deepDive": "Lei de Boyle: ↑Volume = ↓Pressão. ↓Volume = ↑Pressão. Toda a ventilação depende dessa relação."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S4",
      "code": "PNEUMO-04",
      "title": "Difusão e Transporte de Gases",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Leis da Difusão Gasosa",
              "subsections": [
                  {
                      "title": "Lei de Fick",
                      "content": "• Quantidade de gás que difunde é PROPORCIONAL à área de superfície da membrana\n• E INVERSAMENTE proporcional à espessura da membrana\n• Membrana respiratória: ~70-100 m² de área × 0,5 µm de espessura\n• Design evolutivo otimizado: máxima área, mínima espessura\n• Edema pulmonar: ↑ espessura → ↓ difusão → hipoxemia",
                      "deepDive": "Fick: Difusão ∝ (Área × ΔP × Solubilidade) / (Espessura × √Peso Molecular)"
                  },
                  {
                      "title": "Lei de Henry e Coeficiente de Difusão",
                      "content": "• Henry: quantidade de gás dissolvido é proporcional à pressão parcial\n• Diferença de pressão parcial = motor da difusão\n• ΔPO₂ = 104 (alveolar) - 40 (venoso) = 64 mmHg\n• ΔPCO₂ = 45 (venoso) - 40 (alveolar) = 5 mmHg\n• Coeficiente de difusão: depende da solubilidade e peso molecular",
                      "deepDive": ""
                  },
                  {
                      "title": "CO₂ vs O₂: Velocidade de Difusão",
                      "content": "• CO₂ difunde ~20× mais rápido que O₂ (alta solubilidade)\n• Por isso, mesmo com ΔP pequeno (5 mmHg), CO₂ se equilibra facilmente\n• O₂ difunde ~2× mais rápido que N₂\n• Tempo de equilíbrio nos capilares: ~0,25 s (sangue fica ~0,75 s)\n• Há reserva funcional: mesmo em exercício, equilíbrio é alcançado",
                      "deepDive": "CO₂ difunde 20× mais rápido que O₂ — por isso, a retenção de CO₂ só ocorre em falha ventilatória grave."
                  }
              ]
          },
          {
              "title": "Transporte de O₂",
              "subsections": [
                  {
                      "title": "Duas Formas de Transporte",
                      "content": "• O₂ DISSOLVIDO no plasma: PaO₂ × 0,003 = 0,3 vol% (apenas 1,5% do total)\n• O₂ LIGADO à Hemoglobina: 98,5% do total — forma oxi-hemoglobina (HbO₂)\n• Cada molécula de Hb liga até 4 moléculas de O₂\n• HbA (adultos): 2 cadeias α + 2 cadeias β\n• HbF (fetal): 2 cadeias α + 2 cadeias γ — maior afinidade pelo O₂",
                      "deepDive": "Sem hemoglobina, o sangue carregaria apenas 0,3 vol% de O₂ — insuficiente para a vida."
                  },
                  {
                      "title": "Curva de Dissociação da Oxi-Hemoglobina",
                      "content": "• Formato SIGMOIDE: cooperatividade positiva (ligação de 1 O₂ facilita as próximas)\n• P50 = 26-27 mmHg: PO₂ na qual Hb está 50% saturada (referência)\n• Pulmões (PO₂ ~100 mmHg): SaO₂ ~97-98% — carga eficiente\n• Tecidos (PO₂ ~40 mmHg): SaO₂ ~75% — liberação de ~22-23% do O₂\n• Equação de Hill: SaO₂ = PO₂ⁿ / (P50ⁿ + PO₂ⁿ), n ≈ 2,7",
                      "deepDive": "O formato sigmoide é genial: platô no topo protege contra variações da PO₂ alveolar; parte íngreme facilita liberação nos tecidos."
                  },
                  {
                      "title": "Desvios da Curva",
                      "content": "• DESVIO DIREITA (Efeito Bohr): ↑P50, ↓afinidade → FACILITA LIBERAÇÃO nos tecidos\n• Causas: ↑temperatura, ↑PCO₂, ↑H⁺ (↓pH), ↑2,3-DPG\n• Ocorre nos tecidos metabolicamente ativos — exatamente onde O₂ é mais necessário\n• DESVIO ESQUERDA (Haldane): ↓P50, ↑afinidade → FACILITA CAPTAÇÃO nos pulmões\n• Causas: ↓temperatura, ↓PCO₂, ↓H⁺ (↑pH), HbF, monóxido de carbono (CO)",
                      "deepDive": ""
                  },
                  {
                      "title": "Graus de Hipoxemia",
                      "content": "• Normal: PaO₂ 80-100 mmHg\n• Hipoxemia Leve: PaO₂ 60-80 mmHg\n• Hipoxemia Moderada: PaO₂ 40-60 mmHg\n• Hipoxemia Grave: PaO₂ 20-40 mmHg\n• Abaixo de 60 mmHg: SaO₂ cai rapidamente (parte íngreme da curva)",
                      "deepDive": "PaO₂ < 60 mmHg é o limiar crítico: a partir daí, pequenas quedas de PO₂ causam grandes quedas de saturação."
                  }
              ]
          },
          {
              "title": "Transporte de CO₂",
              "subsections": [
                  {
                      "title": "Três Formas de Transporte",
                      "content": "• CO₂ DISSOLVIDO no plasma (~8%): coeficiente 0,063 vol%/mmHg — muito mais solúvel que O₂\n• CARBAMINO-HEMOGLOBINA (~12%): CO₂ liga-se à Hb formando HbCO₂\n• BICARBONATO HCO₃⁻ (~80%): PRINCIPAL forma de transporte\n• Reação: CO₂ + H₂O ⇄ H₂CO₃ ⇄ HCO₃⁻ + H⁺\n• Catalisada pela anidrase carbônica dentro das hemácias",
                      "deepDive": "80% do CO₂ viaja como bicarbonato (HCO₃⁻) — conecta diretamente a ventilação ao equilíbrio ácido-base."
                  },
                  {
                      "title": "Mecanismo do Bicarbonato",
                      "content": "• CO₂ entra na hemácia → anidrase carbônica acelera reação (10.000×)\n• CO₂ + H₂O → H₂CO₃ (ácido carbônico, instável)\n• H₂CO₃ → HCO₃⁻ + H⁺ (dissociação rápida)\n• HCO₃⁻ sai da hemácia para o plasma (troca por Cl⁻ — shift de cloreto)\n• H⁺ é tamponado pela própria hemoglobina (Hb atua como tampão)",
                      "deepDive": ""
                  },
                  {
                      "title": "Integração Ventilação × Ácido-Base",
                      "content": "• Hiperventilação → ↓PCO₂ → ↓H⁺ → alcalose respiratória\n• Hipoventilação → ↑PCO₂ → ↑H⁺ → acidose respiratória\n• O pulmão é o regulador RÁPIDO do pH sanguíneo\n• Rim é o regulador LENTO (horas/dias) — reabsorve/excreta HCO₃⁻\n• pH normal: 7,35-7,45 | PaCO₂ normal: 35-45 mmHg",
                      "deepDive": "Ventilação = controle rápido do pH. Toda alteração ventilatória tem consequência ácido-base imediata."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S5",
      "code": "PNEUMO-05",
      "title": "Controle Respiratório",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Centro Respiratório no Tronco Cerebral",
              "subsections": [
                  {
                      "title": "Grupo Respiratório Dorsal (GRD)",
                      "content": "• Localização: porção dorsal do bulbo (Núcleo do Trato Solitário — NTS)\n• Responsável principalmente pela INSPIRAÇÃO\n• Gera o \"sinal em rampa\": inicia fraco, eleva-se por ~2 segundos\n• Após 2s: interrompe abruptamente → expiração passiva por ~3 segundos\n• NTS recebe aferências dos nervos vago (X) e glossofaríngeo (IX)",
                      "deepDive": "O ritmo básico da respiração é gerado no GRD do bulbo — inspiração de 2s + expiração de 3s = 12 ciclos/min."
                  },
                  {
                      "title": "Grupo Respiratório Ventral (GRV)",
                      "content": "• Localização: ventrolateral do bulbo\n• Encarregado basicamente da EXPIRAÇÃO\n• Contém neurônios inspiratórios E expiratórios\n• Inativo durante respiração tranquila (expiração é passiva)\n• Ativo na expiração FORÇADA: tosse, exercício, sopro",
                      "deepDive": ""
                  },
                  {
                      "title": "Centro Pneumotáxico (Ponte)",
                      "content": "• Localização: dorsalmente no núcleo parabraquial da ponte superior\n• Controla o \"ponto de desligamento\" da rampa inspiratória\n• Sinal intenso → ↑frequência (30-40/min) — inspiração curta\n• Sinal débil → ↓frequência (3-5/min) — inspiração longa\n• Função: modular duração da fase inspiratória do ciclo",
                      "deepDive": "Centro pneumotáxico = \"freio\" da inspiração. Controla quanto tempo o GRD fica ativo."
                  }
              ]
          },
          {
              "title": "Reflexo de Hering-Breuer",
              "subsections": [
                  {
                      "title": "Mecanismo de Proteção Pulmonar",
                      "content": "• Receptores de estiramento nas paredes musculares de brônquios e bronquíolos\n• Sinais transmitidos via nervos vagos até o GRD no bulbo\n• Ativado quando volume corrente > 1,5L (3× o normal)\n• NÃO é ativado na respiração tranquila normal\n• Resposta: \"desativa\" a rampa inspiratória → interrompe inspiração",
                      "deepDive": "Hering-Breuer: reflexo protetor contra distensão excessiva dos pulmões. Só ativado em volumes muito altos (>1,5L)."
                  }
              ]
          },
          {
              "title": "Quimiorreceptores",
              "subsections": [
                  {
                      "title": "Quimiorreceptores Centrais",
                      "content": "• Localização: porção ventral do bulbo\n• Principal estímulo: aumento de H⁺ (acidose) no líquor (LCR)\n• CO₂ cruza a BHE → CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻\n• H⁺ estimula diretamente os quimiorreceptores centrais\n• São o principal regulador TÔNICO da ventilação",
                      "deepDive": "CO₂ é o principal regulador da ventilação em condições normais — via conversão em H⁺ no LCR."
                  },
                  {
                      "title": "Quimiorreceptores Periféricos",
                      "content": "• Corpos carotídeos: bifurcação da artéria carótida comum → nervo glossofaríngeo (IX)\n• Corpos aórticos: arco aórtico → nervo vago (X)\n• Principal estímulo: diminuição de PaO₂ (hipoxemia)\n• Ativação significativa quando PaO₂ < 60 mmHg\n• Também respondem a ↑PCO₂ e ↑H⁺, mas são secundários nisso",
                      "deepDive": "Periféricos = sensor de O₂. Centrais = sensor de CO₂/H⁺. Juntos garantem homeostase dos gases sanguíneos."
                  },
                  {
                      "title": "Controle Voluntário vs. Automático",
                      "content": "• Automático: centros no bulbo e ponte — opera 24h sem consciência\n• Voluntário: córtex cerebral pode sobrepor temporariamente (fala, canto, mergulho)\n• Limitação: controle voluntário NÃO supera o drive metabólico indefinidamente\n• Exemplo: é impossível se matar prendendo a respiração — acúmulo de CO₂ vence\n• Integração: quimiorreceptores + mecanorreceptores + córtex → resposta ventilatória final",
                      "deepDive": ""
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S6",
      "code": "PNEUMO-06",
      "title": "Volumes e Capacidades Pulmonares",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Os 4 Volumes Pulmonares",
              "subsections": [
                  {
                      "title": "Volume Corrente e Reservas",
                      "content": "• Volume Corrente (VC): ~500 mL — volume inspirado/expirado em cada respiração normal tranquila\n• Volume de Reserva Inspiratória (VRI): ~3.000 mL — volume EXTRA inspirável além do VC\n• Volume de Reserva Expiratória (VRE): ~1.100 mL — volume EXTRA expirável além do VC\n• Volume Residual (VR): ~1.200 mL — permanece nos pulmões MESMO após expiração máxima\n• VR NÃO pode ser medido por espirometria (pulmão nunca esvazia completamente)",
                      "deepDive": "Os 4 volumes são medidas fundamentais. VC × frequência = ventilação minuto (~6 L/min em repouso)."
                  }
              ]
          },
          {
              "title": "As 4 Capacidades Pulmonares",
              "subsections": [
                  {
                      "title": "Capacidades = Soma de 2+ Volumes",
                      "content": "• Capacidade Inspiratória (CI): VC + VRI = ~3.500 mL — máximo inspirável do nível expiratório normal\n• Capacidade Residual Funcional (CRF): VRE + VR = ~2.300 mL — volume nos pulmões após expiração normal\n• Capacidade Vital (CV): VRI + VC + VRE = ~4.600 mL — máximo de ar mobilizável\n• Capacidade Pulmonar Total (CPT): CV + VR = ~5.800 mL — TODO o ar que os pulmões comportam",
                      "deepDive": "CV é a medida clínica mais importante na espirometria. CV reduzida indica doença restritiva."
                  }
              ]
          },
          {
              "title": "Espaços Mortos",
              "subsections": [
                  {
                      "title": "Ar Que Não Participa da Troca",
                      "content": "• Espaço Morto Anatômico: ~150 mL — volume nas vias condutoras (nariz → bronquíolos terminais)\n• Espaço Morto Alveolar: ~0 mL em pessoa normal — alvéolos ventilados mas não perfundidos\n• Espaço Morto Fisiológico = Anatômico + Alveolar — em pessoa saudável ≈ anatômico\n• Em doença pulmonar: espaço morto fisiológico pode ser até 10× o anatômico (1-2 L)\n• Alvéolos não funcionantes (sem fluxo sanguíneo) aumentam o espaço morto alveolar",
                      "deepDive": "Ventilação alveolar efetiva = (VC - espaço morto) × frequência = (500-150) × 12 = 4.200 mL/min."
                  }
              ]
          },
          {
              "title": "Circulação Pulmonar",
              "subsections": [
                  {
                      "title": "Sistêmica vs. Pulmonar",
                      "content": "• Circulação Sistêmica: alta pressão (120/80 mmHg) — distribui sangue oxigenado ao corpo\n• Circulação Pulmonar: BAIXA pressão (25/10 mmHg) — leva sangue aos pulmões para hematose\n• Artéria pulmonar: sangue DESOXIGENADO (VD → pulmões)\n• Veias pulmonares: sangue OXIGENADO (pulmões → AE)\n• Baixa pressão pulmonar: evita edema, facilita troca gasosa",
                      "deepDive": "A circulação pulmonar opera com 1/5 da pressão sistêmica — design otimizado para troca gasosa sem edema."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S7",
      "code": "PNEUMO-07",
      "title": "Oxigenoterapia",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Fundamentos da Oxigenoterapia",
              "subsections": [
                  {
                      "title": "Definição e Objetivo",
                      "content": "• Definição: administrar O₂ em FiO₂ > 21% (acima da atmosférica)\n• Objetivo: aumentar SaO₂ > 90%, corrigindo hipoxemia\n• FiO₂ atmosférica normal: 21% (fração inspirada de oxigênio)\n• Meta terapêutica: SaO₂ entre 92-96% (maioria dos pacientes)\n• Em DPOC: meta SaO₂ 88-92% (evitar supressão do drive hipóxico)",
                      "deepDive": "Oxigenoterapia NÃO é \"quanto mais, melhor\". Hiperóxia causa toxicidade pulmonar e supressão ventilatória."
                  },
                  {
                      "title": "Definições Importantes",
                      "content": "• Hipoxemia: redução de O₂ no sangue arterial (PaO₂ < 80 mmHg)\n• Hipóxia: redução de O₂ nos tecidos — consequência da hipoxemia\n• Disóxia: O₂ celular insuficiente para fosforilação oxidativa (produção de ATP)\n• Hiperoxemia: aumento excessivo de O₂ no sangue arterial (PaO₂ > 120 mmHg)\n• Hiperóxia: excesso de O₂ nos tecidos → toxicidade por radicais livres",
                      "deepDive": ""
                  },
                  {
                      "title": "Causas de Hipoxemia",
                      "content": "• Altitude: pressão barométrica reduzida → ↓PiO₂\n• Distúrbios de difusão: espessamento da membrana alvéolo-capilar (edema, fibrose)\n• Alteração da relação V/Q: desequilíbrio ventilação-perfusão\n• Shunt: sangue passa pelo pulmão sem realizar hematose\n• Redução do débito cardíaco: ↓fluxo sanguíneo pulmonar",
                      "deepDive": "Sintomas: agitação, irritabilidade, dispneia, confusão mental, cianose, taquicardia, taquipneia."
                  }
              ]
          },
          {
              "title": "Classificação dos Dispositivos",
              "subsections": [
                  {
                      "title": "Baixo Fluxo — FiO₂ Variável",
                      "content": "• Cânula Nasal: 1-6 L/min → FiO₂ 24-44%. Cada 1L/min ≈ +4% FiO₂\n• Máscara Facial Simples: 5-10 L/min → FiO₂ 40-60%. Mín. 5L (evitar reinalação CO₂)\n• Máscara com Reservatório: 10-15 L/min → FiO₂ 60-100%. Válvulas unidirecionais\n• Bolsa Reanimadora (AMBÚ): 15 L/min → FiO₂ 21-100%. Ventilação manual de emergência\n• Característica: FiO₂ VARIÁVEL, depende do padrão respiratório do paciente",
                      "deepDive": ""
                  },
                  {
                      "title": "Alto Fluxo — FiO₂ Controlada",
                      "content": "• Máscara de Venturi: FiO₂ PRECISA (24-50%). Princípio Venturi: mescla O₂ com ar ambiente\n• Peças coloridas: Azul=24%, Amarelo=28%, Laranja=31%, Vermelho=35%, Rosa=40%, Roxo=50%\n• Dispositivo de ESCOLHA para DPOC com hipercapnia — evita supressão do drive hipóxico\n• Cateter Nasal de Alto Fluxo: até 60 L/min, FiO₂ 21-100%, aquecido e umidificado\n• Alto fluxo gera PEEP ~2-5 cmH₂O, reduz espaço morto, melhora mucociliar",
                      "deepDive": "Venturi = DPOC. Alto Fluxo = alternativa à VNI. Baixo Fluxo = maioria dos casos de hipoxemia leve-moderada."
                  }
              ]
          },
          {
              "title": "Máscara de Venturi — Detalhes",
              "subsections": [
                  {
                      "title": "Princípio de Funcionamento",
                      "content": "• O₂ sob pressão passa por um orifício estreito (jato)\n• Cria zona de baixa pressão que ASPIRA ar ambiente (efeito Venturi)\n• Mistura O₂ puro + ar ambiente = FiO₂ precisa e constante\n• Tamanho do orifício determina a FiO₂: menor orifício = mais ar aspirado = menor FiO₂\n• Independe do padrão respiratório do paciente (diferença do baixo fluxo)",
                      "deepDive": ""
                  },
                  {
                      "title": "Peças e Manejo Clínico",
                      "content": "• Azul: 24% (3L/min) — início em DPOC grave\n• Amarelo: 28% (6L/min) — DPOC moderado\n• Laranja: 31% (8L/min) | Vermelho: 35% (10L/min)\n• Rosa: 40% (12L/min) | Roxo: 50% (15L/min)\n• Se SaO₂ não melhora: trocar para peça com maior FiO₂",
                      "deepDive": "Em DPOC com CO₂ retido: SEMPRE iniciar com FiO₂ baixa (24-28%) e titular conforme gasometria."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S8",
      "code": "PNEUMO-08",
      "title": "Semiologia Pulmonar",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Dispneia — Classificação",
              "subsections": [
                  {
                      "title": "Graus de Dispneia",
                      "content": "• Grandes esforços: dispneia apenas em atividades intensas (corrida, escada)\n• Médios esforços: dispneia em atividades moderadas (caminhada rápida)\n• Pequenos esforços: dispneia em atividades leves (vestir-se, caminhar devagar)\n• Repouso: dispneia SEM qualquer esforço — gravidade máxima",
                      "deepDive": ""
                  },
                  {
                      "title": "Tipos Especiais de Dispneia",
                      "content": "• Dispneia Paroxística Noturna: episódio súbito durante o sono (insuficiência cardíaca)\n• Ortopneia: piora em decúbito dorsal, melhora sentado/em pé (↑ retorno venoso → congestão pulmonar)\n• Trepopneia: piora em decúbito lateral específico\n• Platipneia: piora sentado/em pé, melhora deitado (rara, shunt intracardíaco)",
                      "deepDive": "Dispneia é SUBJETIVA — é o que o paciente sente. Não depende apenas da SpO₂ ou gasometria."
                  }
              ]
          },
          {
              "title": "Inspeção do Tórax",
              "subsections": [
                  {
                      "title": "Inspeção Estática",
                      "content": "• Expressão do paciente: sinais de angústia, desconforto, uso de musculatura acessória\n• Estrutura do tórax: simetria, deformidades (barril, escavatum, carinatum)\n• Características anatômicas: formato, postura, posicionamento preferencial",
                      "deepDive": ""
                  },
                  {
                      "title": "Inspeção Dinâmica",
                      "content": "• Frequência Respiratória: normal 12-20 irpm. Taquipneia >20, bradipneia <12\n• Sincronismo: coordenação tóraco-abdominal (respiração paradoxal = fadiga)\n• Ritmo: regular ou irregular (Cheyne-Stokes, Biot, Kussmaul)\n• Tipo respiratório: torácico (costal), abdominal (diafragmático), misto\n• Tiragem: retração intercostal, subcostal, supraclavicular = esforço aumentado\n• Expansibilidade: simétrica ou assimétrica",
                      "deepDive": "Tiragem + uso de acessórios + respiração paradoxal = sinais de insuficiência respiratória."
                  }
              ]
          },
          {
              "title": "Espirometria — Distúrbios Ventilatórios",
              "subsections": [
                  {
                      "title": "Parâmetros Principais",
                      "content": "• CVF (Capacidade Vital Forçada): volume máximo exalado com esforço máximo\n• VEF₁ (Vol. Expiratório Forçado 1s): volume exalado no 1º segundo da CVF\n• VEF₁/CVF: relação — principal índice para classificar o distúrbio\n• PFE (Pico de Fluxo Expiratório): fluxo máximo durante a manobra\n• FEF₂₅₋₇₅%: fluxo médio (sensível para pequenas vias aéreas)",
                      "deepDive": ""
                  },
                  {
                      "title": "Distúrbio Obstrutivo (DVO)",
                      "content": "• VEF₁/CVF REDUZIDA (< LIN — Limite Inferior da Normalidade)\n• Estreitamento de vias aéreas → resistência ao fluxo ↑\n• Curva volume-tempo: ascensão LENTA, achatada\n• Curva fluxo-volume: concavidade característica (scooped out)\n• Exemplos: DPOC, asma, bronquite crônica, bronquiectasias",
                      "deepDive": ""
                  },
                  {
                      "title": "Distúrbio Restritivo (DVR)",
                      "content": "• VEF₁/CVF NORMAL ou aumentada\n• CVF REDUZIDA — pulmão não consegue expandir adequadamente\n• CPT reduzida (confirmação definitiva requer pletismografia)\n• Curva volume-tempo: curva CURTA (menos volume total)\n• Exemplos: fibrose pulmonar, doenças neuromusculares, cifoescoliose",
                      "deepDive": "Obstrutivo = dificuldade de SAÍDA do ar (VEF₁/CVF↓). Restritivo = dificuldade de ENTRADA (CVF↓, ratio normal)."
                  }
              ]
          },
          {
              "title": "Manovacuometria e Peak Flow",
              "subsections": [
                  {
                      "title": "PImáx — Pressão Inspiratória Máxima",
                      "content": "• Avalia força dos músculos INSPIRATÓRIOS (diafragma)\n• Técnica: expiração até VR → esforço inspiratório máximo contra válvula\n• Normal: -80 a -120 cmH₂O\n• Fraqueza: -70 a -45 cmH₂O\n• Fadiga: -45 a -25 cmH₂O | Falência: < -20 cmH₂O",
                      "deepDive": ""
                  },
                  {
                      "title": "PEmáx — Pressão Expiratória Máxima",
                      "content": "• Avalia força dos músculos EXPIRATÓRIOS (abdominais)\n• Técnica: inspiração até CPT → esforço expiratório máximo contra válvula\n• Importante para avaliar capacidade de TOSSE e eliminação de secreções\n• 3 repetições → considerar MAIOR valor\n• PEmáx baixa = risco de retenção de secreções",
                      "deepDive": ""
                  },
                  {
                      "title": "Peak Flow (PFE)",
                      "content": "• Pico de fluxo expiratório — velocidade máxima do ar na expiração forçada\n• Técnica: inspirar profundamente → soprar o mais forte e rápido possível\n• 3 medições → anotar MAIOR valor ou média\n• Uso clínico: monitorização de asma, resposta ao broncodilatador\n• Em VM: PFT > 60 L/min indica força adequada para desmame",
                      "deepDive": "PImáx avalia diafragma. PEmáx avalia tosse. Peak flow monitora asma. Os três são ferramentas essenciais do fisioterapeuta."
                  }
              ]
          },
          {
              "title": "Ventilometria e VVM",
              "subsections": [
                  {
                      "title": "Ventilação Voluntária Máxima (VVM)",
                      "content": "• Reflete: cooperação, potência de via aérea, força muscular, expansão pulmonar\n• Técnica: respirar o mais rápido e profundamente possível por 12-15 segundos\n• Resultado extrapolado para 1 minuto (L/min)\n• Avalia capacidade de resposta ventilatória sob demanda\n• Valores de referência: CVL normal = 65-75 mL/Kg",
                      "deepDive": "VVM reduzida = limitação ventilatória ao exercício. Fundamental para prescrição de exercícios."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S9",
      "code": "PNEUMO-09",
      "title": "Patologias Respiratórias",
      "videoUrls": [],
      "chapters": []
  },
  {
      "id": "P2-S10",
      "code": "PNEUMO-010",
      "title": "VNI — Ventilação Não Invasiva",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Definição e Objetivos da VNI",
              "subsections": [
                  {
                      "title": "O que é VNI?",
                      "content": "• Suporte ventilatório através de máscara, sem necessidade de prótese (TOT/TQT)\n• Melhora ventilação e otimiza trocas gasosas\n• Promove repouso da musculatura respiratória\n• Reduz auto-PEEP e hiperinsuflação dinâmica\n• Alivia dispneia e desconforto respiratório",
                      "deepDive": "VNI = suporte ventilatório SEM intubação. Interface por máscara nasal, oronasal ou facial total."
                  },
                  {
                      "title": "Indicações da VNI",
                      "content": "• Redução do trabalho respiratório (aumento de FR, uso de musculatura acessória)\n• Hipoxemia — SatO₂ < 90% ou PaO₂ < 60 mmHg\n• EAP — Edema Agudo de Pulmão (evidência forte)\n• DPOC exacerbada — acidose respiratória (pH < 7,35)\n• Asma grave — broncoespasmo refratário\n• SDRA leve — PaO₂/FiO₂ entre 200-300\n• PAC — Pneumonia Adquirida na Comunidade\n• Pós-operatório — prevenção de atelectasia",
                      "deepDive": ""
                  },
                  {
                      "title": "Critérios de Sucesso e Tempo",
                      "content": "• Sessão recomendada: 30-120 minutos\n• ✅ Redução da FR (frequência respiratória)\n• ✅ Redução da PaCO₂\n• ✅ Aumento do VC (volume corrente)\n• ✅ Aumento da SatO₂\n• ✅ Redução de tiragens e uso de musculatura acessória\n• ⚠️ Reavaliar em 1-2 horas — se sem melhora → considerar IOT",
                      "deepDive": "Avaliar resposta em 1-2h. Sem melhora clínica = risco de falha. Escala HACOR > 5 = alto risco."
                  }
              ]
          },
          {
              "title": "Contraindicações da VNI",
              "subsections": [
                  {
                      "title": "Contraindicações Relativas",
                      "content": "• RNC — Rebaixamento do nível de consciência (Glasgow < 10 recomendado)\n• Vômitos recentes ou ativos\n• Excesso de secreção nas vias aéreas\n• HOA — Hemorragia de vias aéreas\n• Ansiedade extrema / paciente não tolera máscara\n• Obesidade mórbida (considerar ajuste de interface)",
                      "deepDive": ""
                  },
                  {
                      "title": "Contraindicações Absolutas",
                      "content": "• ❌ PCR — Parada Cardiorrespiratória\n• ❌ Instabilidade hemodinâmica grave\n• ❌ Paciente totalmente não colaborativo\n• ❌ PO de face, esôfago ou via digestiva alta\n• ❌ Trauma ou queimadura de face\n• ❌ Risco iminente de broncoaspiração\n• ❌ Incapacidade de manter vias aéreas pérvias",
                      "deepDive": "Contraindicações absolutas = IOT imediata. Não insistir em VNI quando o risco supera o benefício."
                  }
              ]
          },
          {
              "title": "CPAP — Pressão Positiva Contínua",
              "subsections": [
                  {
                      "title": "CPAP — Um Nível de Pressão",
                      "content": "• CPAP = Continuous Positive Airway Pressure\n• Pressão positiva CONSTANTE durante todo o ciclo (insp + exp)\n• Ventilação espontânea — o paciente respira sozinho\n• Mantém resistência (pressão) no fim da expiração\n• Um ÚNICO nível de pressão = sem diferença insp/exp",
                      "deepDive": ""
                  },
                  {
                      "title": "Indicações e Efeitos do CPAP",
                      "content": "• 🫁 Síndrome da Apneia Obstrutiva do Sono (SAOS)\n• ❤️ Edema Agudo de Pulmão (EAP) — evidência nível A\n• 🔴 Hipoxemia refratária\n• 💨 Atelectasias pós-operatórias\n• Efeito: recruta alvéolos colapsados, melhora CRF\n• Efeito: redistribui líquido extravascular pulmonar\n• Efeito: reduz pré-carga e pós-carga (benefício no EAP)",
                      "deepDive": "CPAP no EAP: reduz edema + melhora oxigenação + reduz trabalho cardíaco. Triplo benefício."
                  }
              ]
          },
          {
              "title": "BIPAP — Dois Níveis de Pressão",
              "subsections": [
                  {
                      "title": "BIPAP — IPAP e EPAP",
                      "content": "• BIPAP = Bilevel Positive Airway Pressure\n• Dois níveis pressóricos: IPAP (inspiração) e EPAP (expiração)\n• Fluxo contínuo e NÃO constante — alterna entre dois níveis\n• PS (Pressão de Suporte) = IPAP − EPAP\n• Exemplo: IPAP 15 / EPAP 5 → PS = 10 cmH₂O",
                      "deepDive": ""
                  },
                  {
                      "title": "IPAP — Pressão Inspiratória",
                      "content": "• Pressão positiva durante a INSPIRAÇÃO\n• Provoca aumento do volume corrente (VC)\n• Melhora a ventilação alveolar\n• Diminui o trabalho respiratório\n• Profundidade relacionada ao nível de esforço\n• Quanto maior o IPAP → maior o suporte ventilatório",
                      "deepDive": ""
                  },
                  {
                      "title": "EPAP — Pressão Expiratória",
                      "content": "• É uma das formas de aplicar PEEP\n• Pressão positiva durante a EXPIRAÇÃO\n• Mantém vias aéreas e alvéolos abertos\n• Melhora a oxigenação (recruta alvéolos)\n• Permite movimentação de ar por trás dos tampões mucosos\n• Aumenta ventilação colateral",
                      "deepDive": "IPAP = ventilação (↑VC, ↓trabalho). EPAP = oxigenação (recruta alvéolos, ↓auto-PEEP)."
                  }
              ]
          },
          {
              "title": "Escala HACOR — Predição de Falha",
              "subsections": [
                  {
                      "title": "Escala HACOR",
                      "content": "• H — Heart Rate (FC): taquicardia indica falha\n• A — Acidosis (pH): acidose não corrigida\n• C — Consciousness (Glasgow): rebaixamento\n• O — Oxygenation (PaO₂/FiO₂): oxigenação inadequada\n• R — Respiratory Rate (FR): taquipneia persistente\n• Pontuação > 5 após 1-2h de VNI = ALTO RISCO de falha\n• ⚠️ Considerar IOT precoce se HACOR > 5",
                      "deepDive": "HACOR > 5 em 1-2h = falha provável. Não aguardar deterioração — IOT precoce salva vidas."
                  }
              ]
          },
          {
              "title": "Protocolos por Patologia",
              "subsections": [
                  {
                      "title": "DPOC Exacerbada",
                      "content": "• Modo: BIPAP ou PS\n• VC: 6 mL/kg peso predito\n• PEEP: ajustar para reduzir auto-PEEP sem piorar hiperinsuflação\n• FR: ajustada pela gasometria (pH e PaCO₂)\n• I:E: fluxo alto → tempo expiratório prolongado\n• Rise time: baixo (fluxo alto, Ti baixo)\n• Objetivo: corrigir acidose respiratória (pH > 7,35)",
                      "deepDive": ""
                  },
                  {
                      "title": "EAP — Edema Agudo de Pulmão",
                      "content": "• Modo: CPAP ou BIPAP ou PS\n• VC: 6 mL/kg peso predito\n• PEEP/EPAP: 10 cmH₂O (avaliar resposta)\n• FR: ajustada pela gasometria\n• Benefício hemodinâmico: ↓ pré-carga + ↓ pós-carga\n• CPAP isolado já tem forte evidência no EAP\n• Reavaliar em 30-60 min",
                      "deepDive": ""
                  },
                  {
                      "title": "Asma Grave",
                      "content": "• Modo: BIPAP ou PS\n• VC: 6 mL/kg peso predito\n• PEEP: ajustar sem piorar hiperinsuflação (ZEEP ou PEEP baixa)\n• FR: ajustada pela gasometria\n• I:E: fluxo alto → tempo expiratório prolongado (↓air trapping)\n• Rise time: baixo — fluxo alto, Ti baixo\n• Cuidado: auto-PEEP pode estar muito elevada",
                      "deepDive": "DPOC e Asma: priorizar tempo expiratório longo + PEEP que não piore hiperinsuflação. Rise time baixo = fluxo rápido."
                  },
                  {
                      "title": "SDRA, Trauma, Pós-operatório",
                      "content": "• SDRA leve: CPAP ou BIPAP — VC 6 mL/kg (leve) ou 4 mL/kg (moderada-grave)\n• SDRA: PEEP pela tabela ARDS Network (avaliar tipo)\n• Trauma torácico: avaliar pneumotórax, hemotórax, contusão antes de iniciar\n• PO: CPAP ou BIPAP — PEEP 5 cmH₂O, VC 6 mL/kg\n• TEP: CPAP ou BIPAP — PEEP 10 cmH₂O\n• Obesidade: CPAP ou BIPAP — PEEP 10 cmH₂O",
                      "deepDive": ""
                  },
                  {
                      "title": "Doenças Neuromusculares",
                      "content": "• Miastenia: BIPAP ou PS — CV <40%, PImáx <30 cmH₂O → iniciar VNI\n• ELA: BIPAP ou PS — CV <50%, PImáx <30, pH ácido → VNI imediata\n• Distrofia: VNI para hipoventilação noturna ou CV <1L\n• EPAP/PEEP: <10 cmH₂O\n• Monitorar sinais de falha: piora da CV, PImáx, gasometria\n• AOS: CPAP — manter perviedade da via aérea durante sono",
                      "deepDive": "Neuromusculares: CV e PImáx são indicadores-chave para iniciar VNI. Monitorar evolução da fraqueza."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S11",
      "code": "PNEUMO-011",
      "title": "VMI — Ventilação Mecânica Invasiva",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Objetivos e Ciclo da VM",
              "subsections": [
                  {
                      "title": "Objetivos da Ventilação Mecânica",
                      "content": "• Manutenção da troca gasosa — garantir oxigenação adequada e remoção de CO₂\n• Aliviar trabalho respiratório — reduzir esforço da musculatura respiratória\n• Correção hipoxemia/hipercapnia — normalizar níveis gasométricos\n• Reverter fadiga muscular — evitar e tratar falência muscular respiratória\n• Reduzir desconforto — melhorar confort e dispneia do paciente\n• Prevenir complicações — evitar barotrauma e lesões associadas",
                      "deepDive": ""
                  },
                  {
                      "title": "4 Fases do Ciclo Ventilatório",
                      "content": "• 1. DISPARO — Início do ciclo: detecção do esforço (assistido) ou tempo programado (controlado)\n• 2. INSPIRAÇÃO — Ar entra nos pulmões por pressão positiva: entrega de VC ou atingir TI\n• 3. CICLAGEM — Transição inspiração → expiração: por volume, tempo, fluxo ou pressão\n• 4. EXPIRAÇÃO — Ar sai dos pulmões (PASSIVA): retração elástica até PEEP",
                      "deepDive": "Sequência contínua: 4 → 1 → 2 → 3 → 4 → ..."
                  },
                  {
                      "title": "Disparo (Trigger)",
                      "content": "• Modo controlado: ventilador inicia pelo tempo programado\n• Modo assistido: detecta esforço inspiratório do paciente\n• Sensibilidade a pressão: −0,5 a −2 cmH₂O\n• Sensibilidade a fluxo: 2 a 4 L/min",
                      "deepDive": ""
                  },
                  {
                      "title": "Ciclagem",
                      "content": "• VCV: cicla por VOLUME — quando VC programado é entregue\n• PCV: cicla por TEMPO — quando TI programado é atingido\n• PSV: cicla por FLUXO — quando fluxo cai a 25% do pico\n• Ciclagem por pressão: raramente usada, limite de segurança",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Modos Ventilatórios — VCV, PCV, PSV",
              "subsections": [
                  {
                      "title": "VCV — Volume Controlado",
                      "content": "• Volume corrente FIXO — entrega o VC programado a cada ciclo\n• Fluxo CONSTANTE (onda quadrada) durante a inspiração\n• Pressão VARIA conforme complacência e resistência do paciente\n• Vantagem: garante ventilação alveolar mínima\n• Desvantagem: pressão pode subir se complacência cair\n• Ciclagem: por VOLUME (quando VC é entregue)",
                      "deepDive": "VCV: Volume fixo + Fluxo quadrado → Pressão varia"
                  },
                  {
                      "title": "PCV — Pressão Controlada",
                      "content": "• Pressão inspiratória FIXA (onda quadrada) — mantém PIP programada\n• Fluxo DESACELERANTE — pico no início da inspiração, decai exponencialmente\n• Volume VARIA conforme complacência e resistência do paciente\n• Vantagem: limita pressão alveolar, melhor distribuição de gás\n• Desvantagem: VC pode cair se complacência piorar\n• Ciclagem: por TEMPO (quando TI é atingido)",
                      "deepDive": "PCV: Pressão fixa + Fluxo desacelerante → Volume varia"
                  },
                  {
                      "title": "PSV — Pressão de Suporte",
                      "content": "• Modo de ventilação ESPONTÂNEA assistida\n• Paciente DISPARA cada ciclo (sensibilidade)\n• Ventilador entrega pressão de suporte programada\n• Fluxo desacelerante — paciente controla FR, TI e VC\n• Ciclagem: por FLUXO — quando cai a 25% do pico inspiratório\n• Usado em desmame ventilatório e transição para extubação",
                      "deepDive": "PSV: Paciente dispara + PS fixa → Cicla por fluxo (25% do pico)"
                  }
              ]
          },
          {
              "title": "Efeitos Vasculares de CO₂ e O₂",
              "subsections": [
                  {
                      "title": "CO₂ — Efeitos Vasculares",
                      "content": "• CO₂ alto (hipercapnia) → vasodilatação cerebral → ↑ fluxo sanguíneo cerebral\n• CO₂ baixo (hipocapnia) → vasoconstrição cerebral → ↓ fluxo sanguíneo cerebral\n• Na circulação pulmonar: CO₂ alto → vasodilatação local\n• Hiperventilação excessiva → hipocapnia → isquemia cerebral",
                      "deepDive": ""
                  },
                  {
                      "title": "O₂ — Efeitos Vasculares",
                      "content": "• O₂ alto (hiperóxia) → vasoconstrição cerebral\n• O₂ baixo (hipoxemia) → vasodilatação cerebral\n• Na circulação pulmonar: resposta OPOSTA ao sistêmico\n• Hipóxia alveolar → vasoconstrição pulmonar hipóxica (mecanismo de Euler-Liljestrand)\n• Hiperóxia → vasodilatação pulmonar",
                      "deepDive": "Sistêmico: CO₂↑ = vasodilata, O₂↑ = vasocontrai | Pulmonar: O₂↓ = vasocontrai (HPV)"
                  }
              ]
          },
          {
              "title": "Disparo, Ciclagem, TI e JT",
              "subsections": [
                  {
                      "title": "Fórmulas do Ciclo Respiratório",
                      "content": "• FR (f) = respiratory rate em bpm\n• JT (tempo total) = 60 / FR segundos por ciclo\n• Ex: FR = 15 bpm → JT = 60/15 = 4,00 s/ciclo\n• TI (tempo inspiratório): tempo entre disparo e ciclagem\n• TE (tempo expiratório): JT − TI\n• Relação I:E = TI : TE (ex: 1:2, 1:3)",
                      "deepDive": ""
                  },
                  {
                      "title": "Trigger & Cycle — Controle",
                      "content": "• Control = Ventilator-triggered: ventilador controla início (trigger) e término (cycle)\n• Assistido = Patient-triggered: paciente inicia, ventilador completa o ciclo\n• A FR é determinada pelo tempo entre cada trigger\n• Sensibilidade: ajusta o limiar de detecção do esforço do paciente",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "PEEP — Conceitos e Efeitos",
              "subsections": [
                  {
                      "title": "PEEP — Pressão Expiratória Final Positiva",
                      "content": "• Mantém alvéolos abertos ao final da expiração → previne colapso e atelectasia\n• Aumenta superfície de troca gasosa disponível (recrutamento)\n• Redistribui edema alveolar para espaços intersticiais\n• Torna a ventilação mais homogênea em zonas dependentes\n• Diminui o shunt intrapulmonar (↑ oxigenação)",
                      "deepDive": ""
                  },
                  {
                      "title": "PEEP e Hemodinâmica",
                      "content": "• PEEP ↑ → ↑ pressão intratorácica → ↓ retorno venoso → ↓ DC\n• Principal mecanismo de comprometimento: ↓ retorno venoso pela ↑ PAD\n• Também: ↓ contratilidade, ↑ pós-carga VD e VE, mediadores humorais\n• Em SDRA: PEEP pode ↓ VS, ↓ DC, ↓ FC, ↑ RVS, ↑ RVP\n• Individualizar: balancear recrutamento alveolar vs efeito hemodinâmico",
                      "deepDive": "PEEP elevada pode comprometer o DC — monitorar VS, DC e PAM ao ajustar."
                  }
              ]
          },
          {
              "title": "Pressões, Complacências e Resistência",
              "subsections": [
                  {
                      "title": "ΔP (Driving Pressure)",
                      "content": "• Fórmula: ΔP = Platô − PEEP\n• Diferença entre pressão de platô e PEEP\n• Representa a pressão necessária para ventilar os pulmões\n• Alvo: < 15 cmH₂O (proteção pulmonar)\n• Melhor preditor de mortalidade em SDRA",
                      "deepDive": "ΔP < 15 cmH₂O: associado a menor mortalidade em SDRA."
                  },
                  {
                      "title": "Pressão Platô e Pressão de Pico",
                      "content": "• Platô: pressão medida após pausa inspiratória — reflete pressão alveolar real\n• Alvo Platô: < 30 cmH₂O (evitar barotrauma)\n• Pico (PIP): pressão máxima no final da inspiração — inclui resistência VA + pressão alveolar\n• Diferença Pico − Platô: reflete a resistência das vias aéreas (RAW)",
                      "deepDive": ""
                  },
                  {
                      "title": "Complacência Estática (Cest)",
                      "content": "• Fórmula: Cest = VC / (Platô − PEEP)\n• Componentes: Pulmão + Caixa Torácica\n• Precisa de pausa inspiratória para medir\n• Normal: > 50 mL/cmH₂O\n• Cest baixa: ↓ distensibilidade (SDRA, fibrose, atelectasia, edema)",
                      "deepDive": ""
                  },
                  {
                      "title": "Complacência Dinâmica (Cdyn)",
                      "content": "• Fórmula: Cdyn = VC / (Pico − PEEP)\n• Inclui Vias Aéreas (não precisa pausa)\n• Referência: ~10 mL/cmH₂O abaixo da Cest\n• Cdyn baixa: indica ↑ resistência das vias aéreas (broncoespasmo, secreção)",
                      "deepDive": ""
                  },
                  {
                      "title": "RAW — Resistência das Vias Aéreas",
                      "content": "• Fórmula: RAW = (Pico − Platô) / Fluxo (L/s)\n• Normal: 7−10 cmH₂O/L/s\n• RAW elevada: broncoconstrição, secreções, edema, tubo OT pequeno\n• Atenção: Fluxo em L/min precisa ser dividido por 60 para converter em L/s",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Interação Cardiopulmonar na VM",
              "subsections": [
                  {
                      "title": "Pressão Intratorácica (PIT)",
                      "content": "• Qualquer mudança na PIT interfere no retorno venoso ao VD e no fluxo do VE\n• ↑ PIT (pressão positiva): ↑ PAD, ↓ pressão transmural, ↓ retorno venoso\n• Respiração espontânea: PIT negativa → favorece retorno venoso\n• VM com pressão positiva: altera fundamentalmente a hemodinâmica cardíaca",
                      "deepDive": ""
                  },
                  {
                      "title": "Ventrículo Direito (VD)",
                      "content": "• VM ↑ volumes pulmonares → ↑ RVP → ↑ pós-carga do VD\n• Inspiração: ↓ retorno venoso → ↓ VS do VD → ↓ dimensões VD\n• Expiração: ↑ retorno venoso → ↑ VS do VD → ↑ dimensões VD\n• Parede livre fina: não adaptado para pressões elevadas\n• Vulnerável a dissincronia e BRE",
                      "deepDive": ""
                  },
                  {
                      "title": "Ventrículo Esquerdo (VE)",
                      "content": "• Alteração no retorno venoso do VD → altera pré-carga do VE\n• ↑ PIT pode reduzir enchimento VD → repercute no VS do VE\n• VS do VE afetado por: volume sanguíneo, FR e VC\n• Pressão positiva pode alterar geometria ventricular\n• Um único ciclo com pressão positiva pode provocar variação no DC",
                      "deepDive": ""
                  },
                  {
                      "title": "Lei de Frank-Starling e Compensações",
                      "content": "• ↑ Pós-carga → aumenta contratilidade miocárdica\n• ↑ Pré-carga → recruta reserva contrátil (Lei de Frank-Starling)\n• VM com pressão positiva: ↑ pressão pleural e ↓ pressão vascular pulmonar transmural\n• Consequência: ↑ pós-carga VD, aumenta zonas de West 1 ou 2",
                      "deepDive": "Monitorar VS, DC e PAM ao ajustar parâmetros ventilatórios. PEEP elevada + hipovolemia = risco."
                  }
              ]
          },
          {
              "title": "P0.1 — Drive Respiratório",
              "subsections": [
                  {
                      "title": "P0.1 — Pressão de Oclusão (100ms)",
                      "content": "• Pressão de oclusão medida em 0,1 s após início do esforço inspiratório contra VA ocluída\n• Avalia atividade do centro respiratório → diretamente relacionada ao estímulo neural\n• Boa correlação com trabalho da respiração\n• Valores de referência: 2 a 4 cmH₂O\n• Normal/adulto saudável: 0,5 − 1,5 cmH₂O (~1 cmH₂O)",
                      "deepDive": ""
                  },
                  {
                      "title": "Interpretação do P0.1",
                      "content": "• < 2 cmH₂O: drive diminuído — centro respiratório hipoestimulado\n• > 4 cmH₂O: drive aumentado — risco de fadiga e falha no desmame\n• > 3,5 cmH₂O: SUB-ASSISTÊNCIA — esforço excessivo, ↑ suporte\n• < 1,6 cmH₂O: SOBRE-ASSISTÊNCIA — esforço insuficiente, ↓ suporte\n• Início contração do ECMT: associado a P0.1 > 2,9 cmH₂O",
                      "deepDive": "P0.1 é não-invasivo, reprodutível e preditor de sucesso no desmame (< 4 cmH₂O)."
                  }
              ]
          },
          {
              "title": "P-SILI — Lesão Autoinfligida",
              "subsections": [
                  {
                      "title": "P-SILI — Patient Self-Inflicted Lung Injury",
                      "content": "• Lesão pulmonar causada pelo esforço respiratório excessivo do próprio paciente durante VM\n• 4 mecanismos principais:\n• 1. Pressão transpulmonar aumentada → hiperdistensão regional\n• 2. Duplo disparo + Pendelluft → volutrauma por empilhamento aéreo\n• 3. Pressão pleural negativa → extravasamento capilar → edema pulmonar\n• 4. VIDD (miotrauma diafragmático) → fraqueza muscular → dificulta desmame",
                      "deepDive": "Ciclo vicioso: esforço excessivo → lesão → piora oxigenação → ↑ dependência de VM."
                  },
                  {
                      "title": "Prevenção da P-SILI",
                      "content": "• Monitorar esforço: P0.1, Pmusc, ΔPes, swing de pressão\n• Ajustar PS/PEEP: evitar sub-assistência (esforço excessivo)\n• Detectar assincronia: duplo disparo, reverse triggering\n• Sedação apropriada: controlar drive respiratório quando necessário\n• Ventilação protetora: VC baixo, Platô < 30, ΔP < 15\n• Bloqueio neuromuscular: SDRA grave com assincronia refratária",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "VILI — Lesão Induzida pelo Ventilador",
              "subsections": [
                  {
                      "title": "6 Mecanismos da VILI",
                      "content": "• 1. Barotrauma: altas pressões → ruptura espaços aéreos → pneumotórax\n• 2. Volutrauma: VC alto → hiperdistensão alveolar (mais lesivo que pressão isolada)\n• 3. Atelectrauma: VM em baixos volumes → abertura/fechamento cíclicos de alvéolos\n• 4. Biotrauma: forças biofísicas → mediadores inflamatórios → lesão sistêmica (SIRS)\n• 5. Fratura por fadiga: altas FR → microfraturas progressivas no parênquima\n• 6. TI aumentado: piora V/Q, ↓ complacência, ↑ edema pulmonar",
                      "deepDive": ""
                  },
                  {
                      "title": "Ventilação Protetora — Prevenindo VILI",
                      "content": "• VC: 6 mL/kg peso predito\n• Platô: < 30 cmH₂O\n• ΔP (Driving Pressure): < 15 cmH₂O\n• PEEP: individualizada (ARDSnet ou decremental)\n• FiO₂: menor possível (SpO₂ 88−95%)",
                      "deepDive": "VILI é prevenível. Driving Pressure é o melhor preditor de mortalidade em SDRA."
                  },
                  {
                      "title": "Stress e Strain",
                      "content": "• Stress (tensão mecânica): distribuição de forças por unidade de área de pulmão\n• Strain (deformação): estiramento em relação ao estado de relaxamento (ΔV / V basal)\n• Deformação excessiva → morte celular\n• Pulmões doentes (SDRA): expansão heterogênea → concentração regional de forças\n• VILI disparada por: tensões elevadas globais OU tensões locais pela heterogeneidade",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Esforço Muscular Respiratório",
              "subsections": [
                  {
                      "title": "Pmusc, Pdi, Pes — Medidas de Esforço",
                      "content": "• Pmusc: pressão dos músculos respiratórios = 0,75 × Pocc\n• Normal: 3−15 cmH₂O | > 15: excessivo | < 3−5: insuficiente\n• Pdi (transdiafragmática): Pdi = Pga − Pes (requer 2 cateteres)\n• ΔPes (esofágica): monitoramento da interação paciente-ventilador\n• Normal: −2 a −8 cmH₂O | < −8 a −12: excessivo | > −2 a −3: insuficiente",
                      "deepDive": ""
                  },
                  {
                      "title": "TFdi e Pocc",
                      "content": "• TFdi (Thickening Fraction): fração de espessamento diafragmático por ultrassom\n• Método não invasivo, à beira do leito\n• < 15%: esforço insuficiente / disfunção diafragmática | > 15%: normal\n• Pocc (pressão de oclusão): deflexão de pressão negativa durante oclusão expiratória\n• Pmusc ≈ 0,75 × Pocc — desmascara o esforço da musculatura respiratória",
                      "deepDive": "Objetivo: detectar esforço excessivo (risco P-SILI) ou insuficiente (risco VIDD)."
                  }
              ]
          },
          {
              "title": "Parâmetros Ventilatórios — VMI",
              "subsections": [
                  {
                      "title": "Parâmetros de Entrada",
                      "content": "• FiO₂: fração inspirada de O₂ (21% a 100%)\n• PEEP: pressão expiratória final positiva (0 a 20 cmH₂O típico)\n• FR: frequência respiratória (6−30 rpm)\n• Sensibilidade (Trigger): pressão (−0,5 a −2 cmH₂O) ou fluxo (2−4 L/min)\n• PI: pressão inspiratória (determinada pela complacência)\n• TI: tempo inspiratório (0,8 a 1,2 s)",
                      "deepDive": ""
                  },
                  {
                      "title": "Parâmetros de Saída e Derivados",
                      "content": "• VC: volume corrente (450−500 mL, 6−8 mL/kg)\n• Fluxo: velocidade do ar na via aérea (40−60 L/min)\n• VM (volume minuto): VC × FR (5−8 L/min)\n• Drive respiratório: comando cerebral à musculatura respiratória\n• Auto-PEEP (intrínseca): pressão patológica por ar aprisionado (DPOC, asma)\n• PEEP extrínseca: pressão positiva gerada pelo ventilador no final da expiração",
                      "deepDive": ""
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S12",
      "code": "PNEUMO-012",
      "title": "Assincronias Paciente-Ventilador",
      "videoUrls": [],
      "chapters": [
          {
              "title": "O que são Assincronias?",
              "subsections": [
                  {
                      "title": "Assincronia Paciente-Ventilador",
                      "content": "• Incoordenação entre esforços/necessidades do paciente e o suporte do ventilador\n• Prevalência: 25-80% dos pacientes ventilados mecanicamente\n• Consequências: ↑ trabalho respiratório, desconforto, maior tempo de VM\n• Risco de lesão pulmonar (VILI/P-SILI) e maior uso de sedação\n• Detecção: análise de curvas de pressão, fluxo e volume",
                      "deepDive": "Assincronias são frequentes e subdiagnosticadas — monitorização contínua é essencial."
                  }
              ]
          },
          {
              "title": "Disparo Ineficaz",
              "subsections": [
                  {
                      "title": "Disparo Ineficaz",
                      "content": "• Esforço do paciente NÃO inicia ciclo ventilatório\n• Na curva: deflexão negativa na pressão SEM fluxo correspondente\n• Fatores ventilador: mau ajuste de sensibilidade, TI prolongado\n• Fatores paciente: ↑ FR muscular, depleção VC, hiperinsuflação (auto-PEEP)\n• Correção: ajustar sensibilidade, ↓ TI, titular PEEP externa < auto-PEEP, ↓ PS no PSV",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Duplo Disparo",
              "subsections": [
                  {
                      "title": "Duplo Disparo",
                      "content": "• Dois ciclos ventilatórios consecutivos com intervalo muito curto\n• Segundo ciclo antes da expiração completa do primeiro → empilhamento aéreo\n• Fatores ventilador: TI muito curto vs tempo neural, VC baixo em VCV\n• Fator paciente: alto drive neural\n• Correção: ↑ TI (VCV/PCV) ou ↓ limiar de ciclagem (PSV), sedação em SDRA grave, PCV (volume variável)",
                      "deepDive": "Duplo disparo → empilhamento aéreo (air stacking) → volutrauma"
                  }
              ]
          },
          {
              "title": "Disparo Reverso",
              "subsections": [
                  {
                      "title": "Disparo Reverso",
                      "content": "• Contração muscular que ocorre DURANTE a expiração, como resposta reflexa à insuflação passiva\n• Reflexo induzido pela distensão pulmonar\n• Correção: ↓ Ti, ↓ FR, ↓ VC (minimizar distensão)\n• Diminuir sedação para permitir respirações espontâneas\n• BNM em casos graves de SDRA",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Autodisparo",
              "subsections": [
                  {
                      "title": "Autodisparo",
                      "content": "• Ventilador inicia ciclo SEM esforço do paciente\n• Causas: sensibilidade excessiva, vazamento no sistema, água no circuito\n• Fator paciente: oscilações de pressão/fluxo por batimentos cardíacos\n• Correção: otimizar sensibilidade, corrigir vazamentos, remover condensados",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Ciclagem Prematura",
              "subsections": [
                  {
                      "title": "Ciclagem Prematura",
                      "content": "• TI do ventilador < TI neural do paciente — ventilador cicla antes\n• Paciente continua esforço inspiratório após início da expiração\n• Padrão restritivo (fibrose pulmonar) em PSV\n• VCV: ↓ fluxo para ↑ TI, ↑ VC ou pausa inspiratória\n• PCV: ↑ TI\n• PSV: ↓ % de ciclagem ou ↑ PS ou ↑ Rise Time",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Ciclagem Tardia",
              "subsections": [
                  {
                      "title": "Ciclagem Tardia",
                      "content": "• TI do ventilador > TI neural — ventilador demora a ciclar\n• Paciente tenta expirar enquanto ventilador ainda insufla\n• Padrão obstrutivo (DPOC) em PSV — overshoot e fluxo excessivo\n• VCV: ↑ fluxo inspiratório\n• PCV: ↓ TI\n• PSV: ↑ % de ciclagem, ↓ PS, ↑ ou ↓ Rise Time",
                      "deepDive": "Ciclagem tardia: PCV/PSV → ↓ PC ou ↓ PS ou ↑ Rise Time para reduzir fluxo."
                  }
              ]
          },
          {
              "title": "Fluxo Insuficiente (Flow Starvation)",
              "subsections": [
                  {
                      "title": "Fluxo Insuficiente (Flow Starvation)",
                      "content": "• Demanda ventilatória > fluxo ofertado pelo ventilador\n• Curva de pressão com CONCAVIDADE (scooping) — assinatura clássica\n• VCV: fluxo ajustado muito baixo\n• PCV/PSV: pressão muito baixa ou Rise Time muito longo\n• Correção VCV: ↑ fluxo inspiratório ou mudar para PCV/PSV (fluxo livre)\n• Correção PCV/PSV: ↓ Rise Time e/ou ↑ pressões\n• Tratar causa: dor, acidose, ansiedade, febre → ↑ demanda",
                      "deepDive": "Concavidade na curva de pressão (scooping) = fluxo insuficiente. Assinatura patognomônica."
                  }
              ]
          },
          {
              "title": "Fluxo Excessivo",
              "subsections": [
                  {
                      "title": "Fluxo Excessivo",
                      "content": "• Fluxo/pressão aplicado excessivamente alto\n• Overshoot de pressão no início da inspiração\n• VCV: fluxo ajustado muito alto\n• PCV/PSV: pressão muito alta ou Rise Time muito curto\n• Correção VCV: ↓ fluxo inspiratório\n• Correção PCV/PSV: ↓ pressão, ↑ Rise Time",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "Impacto Clínico e Manejo",
              "subsections": [
                  {
                      "title": "Impacto Clínico das Assincronias",
                      "content": "• ↑ Trabalho respiratório → fadiga muscular\n• Desconforto, agitação → maior necessidade de sedação\n• Maior tempo de VM → dificulta desmame\n• Lesão pulmonar (VILI/P-SILI) → barotrauma, volutrauma\n• Disfunção hemodinâmica → alteração PIT, retorno venoso, DC",
                      "deepDive": ""
                  },
                  {
                      "title": "Detecção e Monitorização",
                      "content": "• Análise de curvas ventilatórias: pressão × fluxo × volume × tempo\n• Inspeção visual do paciente e do ventilador\n• Pressão esofágica (Pes): medida direta do esforço\n• EAdi (atividade elétrica do diafragma): NAVA\n• Ultrassonografia diafragmática: função e movimento",
                      "deepDive": ""
                  },
                  {
                      "title": "Estratégia Geral de Manejo",
                      "content": "• 1. Identificação precoce: monitorização contínua + vigilância clínica\n• 2. Ajuste de parâmetros: sensibilidade, fluxo, TI, ciclagem\n• 3. Tratar causa base: dor, febre, ansiedade, acidose, auto-PEEP\n• 4. Mudança de modo se necessário: PAV, NAVA, modos adaptativos",
                      "deepDive": "Assincronias são tratáveis: identificar tipo → corrigir parâmetros → tratar causa base."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S13",
      "code": "PNEUMO-013",
      "title": "Modalidades & Análise Gráfica",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Classificação dos Modos Ventilatórios",
              "subsections": [
                  {
                      "title": "Modos Controlados, Assistidos e Mistos",
                      "content": "• Controlados: ventilador controla tudo (VCV, PCV) — paciente passivo\n• Assistidos: paciente dispara, ventilador entrega suporte (A/C, PSV)\n• Mistos: ciclos mandatórios + respirações espontâneas (APRV, híbridos)",
                      "deepDive": ""
                  },
                  {
                      "title": "Regra de Ouro do Disparo",
                      "content": "• Paciente PASSIVO (sedado/curarizado): modo CONTROLADO → disparo por TEMPO (JT)\n• Paciente ATIVO (drive respiratório): modo ASSISTIDO → disparo por SENSIBILIDADE\n• Sensibilidade: Fluxo (2-4 L/min) ou Pressão (-0,5 a -2 cmH₂O)",
                      "deepDive": "Paciente ativo na VM? Disparo = Sensibilidade. Passivo? Disparo = Tempo."
                  }
              ]
          },
          {
              "title": "VCV — Volume Controlado",
              "subsections": [
                  {
                      "title": "VCV — Características",
                      "content": "• Volume Corrente é a variável CONTROLADA — entrega VC programado\n• Fluxo CONSTANTE (onda quadrada) durante inspiração\n• Pressão VARIÁVEL — depende da complacência e resistência do paciente\n• Disparo: Tempo ou Fluxo ou Pressão | Ciclagem: Volume ou Tempo\n• Parâmetros: VC (6-8 mL/kg), FR, Fluxo (40-60 L/min), PEEP, Sensibilidade, FiO₂",
                      "deepDive": "VCV: Volume garantido + Fluxo quadrado → Pressão varia. Risco de barotrauma se complacência cai."
                  },
                  {
                      "title": "Análise Gráfica VCV",
                      "content": "• Pressão × Tempo: ascensão progressiva até Pico, pausa para Platô\n• Stress Index: SI=1 linear (ideal), SI>1 côncava (sobredistensão), SI<1 convexa (recrutamento)\n• Fluxo × Tempo: onda QUADRADA constante (inspiração), exponencial (expiração)\n• Volume × Tempo: rampa ascendente LINEAR\n• Ppico = Resistência + Complacência | Pplatô = Complacência apenas",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "PCV — Pressão Controlada",
              "subsections": [
                  {
                      "title": "PCV — Características",
                      "content": "• Pressão é a variável CONTROLADA — mantém pressão programada\n• Fluxo DESACELERANTE — pico alto que cai progressivamente\n• Volume VARIÁVEL — depende da complacência e resistência\n• Disparo: Tempo (CMV) ou Sensibilidade (ACV) | Ciclagem: sempre por TEMPO (Tinsp)\n• Parâmetros: PC (~15 cmH₂O acima PEEP), FR, Tinsp, PEEP, Rise Time, Sensibilidade, FiO₂",
                      "deepDive": "PCV: Pressão limitada + Fluxo desacelerante → Volume varia. ↓ Risco barotrauma, volume não garantido."
                  },
                  {
                      "title": "Rise Time em PCV",
                      "content": "• Rise Time (RT): tempo de subida até atingir a pressão determinada\n• RT BAIXO → fluxo ALTO → Ti BAIXO → ↑ VC em PCV\n• RT ALTO → fluxo BAIXO → Ti ALTO\n• Rise Time NÃO altera o Tinsp em PCV\n• Cuidado: Pinsp é diferente de Pressão Controlada (PC) — PC = Pinsp - PEEP",
                      "deepDive": ""
                  }
              ]
          },
          {
              "title": "PSV — Pressão de Suporte",
              "subsections": [
                  {
                      "title": "PSV — Características",
                      "content": "• Modo 100% ESPONTÂNEO — paciente dispara e controla FR e Ti\n• Ventilador fornece pressão de suporte (PS) para auxiliar esforço\n• Fluxo desacelerante — cicla quando fluxo cai a 25% do pico\n• Disparo: sempre por SENSIBILIDADE | Ciclagem: sempre por FLUXO\n• Ideal para desmame — requer drive respiratório preservado",
                      "deepDive": ""
                  },
                  {
                      "title": "Ciclagem em PSV (% do Fluxo de Pico)",
                      "content": "• Quanto MAIOR o % de ciclagem → MENOR o Ti (cicla mais cedo)\n• Quanto MENOR o % de ciclagem → MAIOR o Ti (cicla mais tarde)\n• 10%: ciclagem tardia → Ti aumentado → risco de assincronia\n• 25%: ciclagem padrão → Ti normal (recomendado)\n• 40%: ciclagem precoce → Ti diminuído → risco de assincronia",
                      "deepDive": "Padrão típico: 25% do fluxo de pico inspiratório."
                  }
              ]
          },
          {
              "title": "Loops P-V e Interpretação",
              "subsections": [
                  {
                      "title": "Alça Pressão-Volume (P-V)",
                      "content": "• Gráfico que relaciona Pressão (X) com Volume (Y) durante um ciclo completo\n• LIP (Lower Inflection Point): ponto de recrutamento alveolar\n• UIP (Upper Inflection Point): início da hiperdistensão\n• Complacência: inclinação da curva (ΔV/ΔP)\n• Histerese: diferença entre curvas inspiratória e expiratória",
                      "deepDive": ""
                  },
                  {
                      "title": "Aplicação Clínica dos Loops",
                      "content": "• PEEP ideal: acima do LIP (manter recrutamento)\n• Pplatô seguro: abaixo do UIP (evitar hiperdistensão)\n• ↓ Complacência: curva achatada (SDRA, fibrose, edema)\n• ↑ Complacência: curva inclinada (DPOC, enfisema)\n• Driving Pressure < 15 cmH₂O: melhor preditor de mortalidade em SDRA",
                      "deepDive": "PEEP acima do LIP + Pplatô abaixo do UIP = ventilação protetora otimizada."
                  }
              ]
          },
          {
              "title": "Cálculos e Fórmulas",
              "subsections": [
                  {
                      "title": "Parâmetros Derivados das Curvas",
                      "content": "• Cest = VC / (Pplatô − PEEP) | Normal: 50-100 mL/cmH₂O\n• RAW = (Ppico − Pplatô) / Fluxo | Normal: 5-10 cmH₂O/L/s\n• ΔP = Pplatô − PEEP | Meta: < 15 cmH₂O (ideal < 12)\n• VM = VC × FR | Normal: 5-10 L/min (determina eliminação de CO₂)",
                      "deepDive": ""
                  },
                  {
                      "title": "Escolha do Modo Ventilatório",
                      "content": "• Fase aguda / SDRA grave: VCV ou PCV — controle total, VC 6 mL/kg, Pplatô < 30\n• Fase de melhora: A/C ou SIMV+PSV — paciente desperta, redução gradual FR\n• Desmame: PSV — 100% espontâneo, PS progressivamente ↓, meta PS 5-8 cmH₂O\n• TRE (Teste Respiratório Espontâneo): avaliar capacidade de extubação",
                      "deepDive": "Ventilação protetora: VC 6 mL/kg, Pplatô < 30, ΔP < 15, PEEP individualizada."
                  }
              ]
          }
      ]
  },
  {
      "id": "P2-S14",
      "code": "PNEUMO-014",
      "title": "Desmame Ventilatório",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Classificação dos Tipos de Desmame",
              "subsections": [
                  {
                      "title": "O que é Desmame Ventilatório",
                      "content": "• Processo de transição da ventilação mecânica para a respiração espontânea\n• Classificado em 3 tipos com base no número de tentativas e tempo necessário\n• Objetivo: retirar o suporte ventilatório o mais rápido e seguro possível",
                      "deepDive": "O desmame pode representar até 40-50% do tempo total de VM. Abreviá-lo reduz complicações."
                  },
                  {
                      "title": "Desmame SIMPLES",
                      "content": "• Sucesso no 1º TRE (Teste de Respiração Espontânea)\n• Paciente permanece 48h fora da VM sem necessidade de reintubação\n• Prevalência: ~70% dos casos\n• Geralmente não necessitam de preditores complexos",
                      "deepDive": "70% dos pacientes desmamam no primeiro TRE — a busca ativa diária é essencial."
                  },
                  {
                      "title": "Desmame DIFÍCIL",
                      "content": "• Falha no 1º TRE\n• Necessita de até 3 TREs ou ≤ 7 dias após o primeiro TRE\n• Prevalência: ~20% dos casos\n• Requer avaliação cuidadosa das causas da falha",
                      "deepDive": ""
                  },
                  {
                      "title": "Desmame PROLONGADO",
                      "content": "• Falha em > 3 TREs consecutivos\n• Ou necessidade de > 7 dias de desmame após o primeiro TRE\n• Prevalência: ~10% dos casos\n• Pior prognóstico, maior morbidade",
                      "deepDive": "Simples 70% · Difícil 20% · Prolongado 10% — quanto mais prolongado, pior o desfecho."
                  }
              ]
          },
          {
              "title": "Conceitos Fundamentais do Desmame",
              "subsections": [
                  {
                      "title": "Busca Ativa Diária",
                      "content": "• Triagem DIÁRIA identificando pacientes capazes de realizar o desmame\n• Avaliação sistemática dos critérios de elegibilidade em todos os pacientes ventilados\n• Deve ser realizada ao menos uma vez ao dia\n• Reduz tempo de VM e complicações associadas",
                      "deepDive": ""
                  },
                  {
                      "title": "Despertar Diário",
                      "content": "• Interrupção diária da sedação para avaliação do nível de consciência\n• Permite avaliar a capacidade do paciente de manter drive respiratório\n• Avalia proteção de vias aéreas (tosse, deglutição)\n• Associado à busca ativa: SAT (Spontaneous Awakening Trial) + SBT",
                      "deepDive": "SAT + SBT combinados reduzem tempo de VM e mortalidade."
                  },
                  {
                      "title": "Sucesso de Desmame vs. Sucesso de Extubação",
                      "content": "• Sucesso de Desmame: paciente tolera o TRE (ainda conectado ao ventilador)\n• Sucesso de Extubação: paciente extubado (ou desconectado se TQT) e NÃO reintubado em 48h\n• TOT: prótese endolaríngea retirada com sucesso\n• TQT: tolerou desconexão do ventilador por 48h",
                      "deepDive": "Sucesso no TRE ≠ sucesso na extubação. A avaliação de via aérea é etapa separada."
                  }
              ]
          },
          {
              "title": "Critérios de Elegibilidade para Desmame",
              "subsections": [
                  {
                      "title": "Busca Ativa — Critérios Obrigatórios",
                      "content": "• O paciente deve atender a TODOS os critérios para ser elegível ao TRE\n• Realizar a busca ativa DIÁRIA incluindo todos os seguintes\n• A ausência de qualquer critério adia o TRE",
                      "deepDive": "TODOS os critérios devem ser atendidos simultaneamente."
                  },
                  {
                      "title": "Oxigenação e Hemodinâmica",
                      "content": "• Oxigenação adequada: PaO₂ ≥ 60 mmHg, FiO₂ ≤ 0,4 (40%), PEEP ≤ 5-8 cmH₂O\n• Estabilidade hemodinâmica: boa perfusão tecidual\n• Sem ou com doses baixas de vasopressores\n• Ausência de ICC descompensada\n• Ausência de arritmias graves",
                      "deepDive": ""
                  },
                  {
                      "title": "Causa, Drive e Balanço",
                      "content": "• Resolução da causa: falência respiratória resolvida ou controlada\n• Drive respiratório: paciente capaz de iniciar esforços inspiratórios espontâneos\n• Balanço hídrico: zerado ou negativo nas últimas 24h\n• Equilíbrio metabólico: ácido-básico e eletrolítico normais",
                      "deepDive": "Contraindicação relativa: adiar extubação quando houver transporte para exames programado."
                  }
              ]
          },
          {
              "title": "TRE — Teste de Respiração Espontânea",
              "subsections": [
                  {
                      "title": "O que é o TRE?",
                      "content": "• Avalia a capacidade do paciente de manter ventilação espontânea adequada\n• Sem o suporte total do ventilador\n• Existem 5 formas principais de realizar o TRE\n• Duração: 30-120 minutos (estudos recentes: 30 min podem ser suficientes)",
                      "deepDive": ""
                  },
                  {
                      "title": "Método 1: Tubo T",
                      "content": "• Desconexão total do ventilador\n• Paciente conectado a fonte de O₂ umidificado via TOT ou TQT\n• Simula condição real pós-extubação\n• Desvantagem: sem monitorização contínua, não compensa resistência do TOT",
                      "deepDive": ""
                  },
                  {
                      "title": "Método 2: PSV 5-8 cmH₂O + PEEP 5",
                      "content": "• Pressão de suporte mínima — método MAIS UTILIZADO atualmente\n• PS 5-8 cmH₂O compensa resistência do TOT\n• PEEP 5 cmH₂O mantém recrutamento alveolar\n• Monitorização contínua pelo ventilador — mais seguro",
                      "deepDive": "PSV é o método preferido: compensa o TOT, monitora continuamente e é mais seguro."
                  },
                  {
                      "title": "Método 3: CPAP + ATC",
                      "content": "• ATC = Automatic Tube Compensation\n• Mede pressão no início e final do tubo a cada ciclo\n• Calcula e compensa a resistência automaticamente\n• Mais fisiológico — compensa variações (secreções, posição do TOT)\n• Requer ventiladores modernos com essa tecnologia",
                      "deepDive": ""
                  },
                  {
                      "title": "Método 4: PS 0 + PEEP 5 (CPAP puro)",
                      "content": "• PS = 0 (sem suporte pressórico na inspiração)\n• PEEP = 5 cmH₂O mantém recrutamento\n• Mais exigente que PSV (não compensa resistência do TOT)\n• Equivale ao CPAP",
                      "deepDive": ""
                  },
                  {
                      "title": "Método 5: PS 0 + PEEP 0 (ZEEP)",
                      "content": "• Teste MAIS EXIGENTE — sem qualquer suporte\n• Apenas Bias Flow (fluxo contínuo)\n• Risco de atelectasia e dessaturação\n• Raramente utilizado",
                      "deepDive": "Preferir métodos que mantenham ao menos PEEP 5 cmH₂O. ZEEP = maior risco."
                  }
              ]
          },
          {
              "title": "Critérios de Sucesso e Falha do TRE",
              "subsections": [
                  {
                      "title": "Critérios de SUCESSO do TRE",
                      "content": "• FR < 35 ipm\n• SpO₂ > 90%\n• FC < 140 bpm ou variação < 20%\n• PAS 90-180 mmHg\n• Sem sinais de desconforto respiratório\n• Sem sudorese, agitação ou alteração do nível de consciência",
                      "deepDive": "Manter observação contínua por 30-120 minutos. Sucesso = elegível para extubação."
                  },
                  {
                      "title": "Critérios de FALHA — Interromper TRE",
                      "content": "• FR > 35 ipm por > 5 minutos\n• SpO₂ < 90%\n• FC > 140 bpm ou variação > 20%\n• Arritmias graves\n• PAS > 180 ou < 90 mmHg\n• Sinais de desconforto respiratório\n• Sudorese, agitação, alteração do nível de consciência",
                      "deepDive": "Na falha: retornar ao suporte anterior, investigar causa e reavaliar em 24h."
                  }
              ]
          },
          {
              "title": "Estratégias para Otimizar o Desmame",
              "subsections": [
                  {
                      "title": "Protocolo de Desmame",
                      "content": "• 1. Busca ativa diária\n• 2. Despertar diário (SAT)\n• 3. Redução gradual do suporte ventilatório\n• 4. TRE quando critérios atingidos\n• 5. Extubação se sucesso no TRE",
                      "deepDive": ""
                  },
                  {
                      "title": "Preparo do Paciente",
                      "content": "• Fisioterapia respiratória e motora\n• Mobilização precoce\n• Controle hídrico (balanço negativo)\n• Suporte nutricional adequado\n• Manejo da dor",
                      "deepDive": ""
                  },
                  {
                      "title": "Causas Comuns de Falha no Desmame",
                      "content": "• Fraqueza muscular respiratória (VIDD — Ventilator-Induced Diaphragmatic Dysfunction)\n• Sobrecarga hídrica\n• Disfunção cardíaca (weaning-induced cardiac failure)\n• Broncoespasmo\n• Secreções excessivas\n• Delirium / agitação",
                      "deepDive": "Avaliação multidisciplinar: médico, fisio, enfermagem, nutrição, fono."
                  }
              ]
          },
          {
              "title": "Cuff-Leak Test — Teste de Vazamento do Balonete",
              "subsections": [
                  {
                      "title": "O que é o Cuff-Leak Test?",
                      "content": "• Avalia o risco de estridor pós-extubação por edema de laringe\n• Mede a diferença entre volume inspirado e expirado com o cuff desinsuflado\n• Realizado em modo VCV (volume controlado)",
                      "deepDive": ""
                  },
                  {
                      "title": "Como Realizar",
                      "content": "• 1. Aspirar secreções traqueais e orais\n• 2. Ajustar ventilador para VCV\n• 3. Com cuff inflado: registrar VCi e VCe (devem ser similares)\n• 4. Desinsuflar o cuff\n• 5. Registrar VCe durante 6 ciclos (VCe atinge platô após poucos ciclos)\n• 6. Se VCe < VCi em > 10% → teste POSITIVO",
                      "deepDive": ""
                  },
                  {
                      "title": "Interpretação",
                      "content": "• NEGATIVO (tem vazamento): diferença > 110 mL ou > 10%\n• → BAIXA possibilidade de estridor pós-extubação\n• POSITIVO (não tem vazamento): diferença < 110 mL ou < 10%\n• → PODEM desenvolver estridor pós-extubação",
                      "deepDive": "Sensibilidade 27% · Especificidade 88% · Alta especificidade: reconhece quem NÃO tem obstrução."
                  },
                  {
                      "title": "Fatores de Risco para Estridor",
                      "content": "• Intubação traumática\n• VM > 6 dias\n• Tubo com calibre largo\n• Sexo feminino (pregas vocais mais finas, menos colágeno e ácido hialurônico)\n• Reintubação após extubação não planejada",
                      "deepDive": ""
                  },
                  {
                      "title": "Diferenças Anatômicas — Sexo Feminino",
                      "content": "• Pregas vocais mais finas\n• Menor quantidade de colágeno nas pregas vocais\n• Menor quantidade de ácido hialurônico\n• Testosterona nos homens → músculos da laringe mais fortes\n• Colágeno e ácido hialurônico conferem maior resistência nos homens",
                      "deepDive": "Mulheres têm maior risco de estridor pós-extubação por características anatômicas das pregas vocais."
                  },
                  {
                      "title": "Limitações e Cuidados",
                      "content": "• Baixa sensibilidade (27%) — pode não detectar todos os casos\n• Alta especificidade (88%) — útil para identificar quem NÃO terá estridor\n• Não é obrigatório para todos os pacientes\n• Risco: aspiração de secreção contaminada acima do cuff\n• Cuidado: aspirar secreções ANTES do teste\n• Inalação com adrenalina: recomendada como coadjuvante, baixa evidência",
                      "deepDive": ""
                  }
              ]
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
                      "content": "A evolução da tecnologia nas empresas pode ser segmentada em três fases distintas. Cada fase redefiniu o papel da TI dentro do negócio — de bastidor operacional a coração estratégico. Entender em qual fase sua empresa está hoje é o primeiro passo para qualquer transformação digital real.\n\nNão são degraus de uma escada — são **modos de operar**. O que importa é reconhecer onde está o centro de gravidade da sua TI hoje."
                  },
                  {
                      "title": "Fase 1 — Infraestrutura (Anos 2000)",
                      "content": "Foco na estabilidade de servidores e redes operacionais. A TI era setor de suporte: o sucesso era medido em **uptime**, não em receita. Manter os sistemas no ar para que o negócio acontecesse era a função inteira. Investir em tecnologia significava comprar hardware, contratar suporte e rezar para nada cair.",
                      "quote": "Estudo de Caso — Banco do Brasil (2003):",
                      "studyCase": {
                          "title": "Banco do Brasil (2003)",
                          "body": "R$ 2 bilhões investidos em datacenter para sustentar 5.000 agências em rede. Cada hora de queda custava R$ 40 milhões em transações perdidas. TI era custo necessário, não diferencial competitivo."
                      }
                  },
                  {
                      "title": "Fase 2 — Processo (Anos 2010)",
                      "content": "Integração de sistemas como **ERPs** e CRMs no cotidiano da gestão. A informação para de morrer em planilhas isoladas e começa a fluir entre setores. A TI vira ferramenta de organização e padronização — mas ainda a serviço de um modelo de negócio existente. Aqui a pergunta dos diretores muda: \"como otimizar?\".",
                      "quote": "Estudo de Caso — Natura (2012):",
                      "studyCase": {
                          "title": "Natura (2012)",
                          "body": "Integração de 7 países sob um único SAP. Decisões logísticas que levavam semanas viraram horas. Planilhas regionais viraram dashboards globais — mas a operação continuava sendo venda direta + varejo, só que mais rápida e auditável."
                      }
                  },
                  {
                      "title": "Fase 3 — Estratégia (Anos 2020 →)",
                      "content": "A tecnologia define a criação de produtos, o atendimento ao cliente e a capacidade de inovar — tornando-se pilar de competitividade e reputação. A TI deixa de ser área de apoio e vira o próprio negócio. Dados, algoritmos e **efeitos de rede** criam vantagens que se auto-reforçam: mais usuários geram mais dados, que melhoram o algoritmo, que atrai mais usuários.\n\nA pergunta que separa empresas que sobrevivem das que lideram não é \"qual tecnologia adotar?\" — é \"em qual fase estamos hoje, e em qual fase o mercado ao redor já chegou?\". A diferença entre as duas respostas é o **gap** que precisa ser fechado. E quanto maior o gap, mais doloroso o salto.\n\nEmpresas que operam em fase de Processo enquanto o mercado está em fase de Estratégia perdem competitividade de forma sistemática e silenciosa. O custo de ficar parado é composto: enquanto uma empresa estagnada perde eficiência linearmente (5-8% ao ano em custos evitáveis), seus concorrentes digitalizados crescem exponencialmente via efeitos de rede e dados acumulados.",
                      "quote": "Estudo de Caso — iFood (2023):",
                      "studyCase": {
                          "title": "iFood (2023)",
                          "body": "R$ 100 bilhões/ano movimentados sem cozinha própria nem motoboy próprio. A plataforma é o produto. Sem o algoritmo de matching e a infraestrutura digital, simplesmente não existe negócio para operar."
                      },
                      "deepDive": "Mover-se entre fases não é só comprar tecnologia nova — é repensar o papel da TI dentro da empresa. Nem toda empresa precisa estar na Fase 3, mas toda empresa precisa saber em qual fase está e por quê. Esse repensar — essa mudança de identidade da organização — é o que se chama Transformação Digital."
                  },
                  {
                      "title": "Síntese e Fechamento",
                      "content": "**TI deixa de ser bastidor** quando dados e algoritmos criam vantagens que se auto-reforçam.\n\nNão existe atalho entre fases — cada salto exige redesenhar o papel da tecnologia, não só comprar mais dela.\n\nO risco maior não é estar atrasado, é **não saber em qual fase você está** hoje."
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
                      "Banco do Brasil (2003): R$ 2B em datacenter — TI como custo necessário, não diferencial",
                      "iFood (2023): R$ 100B/ano sem ativo físico próprio — a plataforma é o produto"
                  ]
              }
          },
          {
              "title": "2: Transformação Digital",
              "description": "Não é comprar tecnologia — é repensar como a empresa cria e entrega valor",
              "subsections": [
                  {
                      "title": "O que é Transformação Digital (e o que NÃO é)",
                      "content": "A transformação digital é o processo de integração de tecnologias digitais em todas as áreas de uma organização, mudando a forma como ela opera e entrega valor aos seus clientes. Não se trata apenas de implementar novas tecnologias, mas de uma **mudança cultural** que exige que as organizações desafiem continuamente o status quo, experimentem e se sintam confortáveis com o fracasso.\n\nAqui é fundamental distinguir três conceitos que costumam ser confundidos — e a confusão custa bilhões em investimentos mal direcionados:\n\n- **Digitização**: converter papel em PDF — condição necessária mas insuficiente\n- **Digitalização**: automatizar fluxos usando tecnologia — o processo continua o mesmo, só fica mais rápido\n- **Transformação Digital**: fundamentalmente repensar o modelo de negócio e a proposta de valor usando capacidades digitais\n\nSegundo IBGE (PINTEC 2020) e pesquisas do Sebrae, apenas 23% das PMEs brasileiras utilizam algum sistema integrado, e menos de 5% utilizam dados para decisão (CETIC.br, TIC Empresas 2022)."
                  },
                  {
                      "title": "Os 4 Domínios da Transformação (Rogers, Columbia 2016)",
                      "content": "David Rogers (Columbia Business School, 2016) identificou 4 domínios que devem ser transformados **simultaneamente**, não sequencialmente:\n\n**👥 Clientes**: De audiência passiva a rede ativa que co-cria valor. Não pergunte o que querem — observe o que fazem. Nubank: 80M de clientes sem agência, CAC R$ 30-50 vs R$ 800+ bancário tradicional.\n\n**⚔️ Competição**: Não vem mais só do setor. Plataformas redefinem fronteiras — iFood compete com restaurantes E com supermercados. GMV de R$ 100B sem cozinha própria.\n\n**📊 Dados**: De subproduto caro a ativo estratégico sempre ligado. Quem não decide por dados decide por opinião. Mercado Livre: 2B+ eventos/dia, personalização em tempo real para 200M+ usuários.\n\n**💡 Inovação**: De produto acabado a MVP contínuo. Lançar rápido, medir, iterar. Falhar barato e cedo. Google Design Sprint: ciclo de 5 dias para validar ideias."
                  },
                  {
                      "title": "Teoria da Inovação Aplicada a Negócios",
                      "content": "**Joseph Schumpeter (1942)** cunhou o conceito de destruição criativa — a inovação como motor do capitalismo que destrói o velho para criar o novo. A Kodak inventou a câmera digital mas não canibalizou o filme — e faliu. O Nubank canibalizou a agência bancária — e virou o maior banco digital do mundo fora da China.\n\n**Clayton Christensen (Harvard, 1997)** separou inovação em tipos: incremental (Havaianas reinventando design), radical (PIX substituindo TED/DOC) e disruptiva (Nubank atendendo quem bancos tradicionais ignoravam). Distinção crítica: iPhone NÃO é disruptivo por Christensen — nasceu premium. Disruptiva começa simples e barata.\n\n**Eric Ries (2011)** propôs o Lean Startup: construir-medir-aprender. Em vez de planejar 2 anos, lançar o MVP em semanas, medir o que funciona e iterar.\n\n**Chan Kim e Renée Mauborgne (INSEAD, 2005)**: Estratégia do Oceano Azul — criar mercado novo onde não há concorrência. O iFood não competiu com restaurantes — criou uma nova categoria de consumo.\n\n**Henry Chesbrough (Berkeley, 2003)** introduziu a inovação aberta: empresas não precisam inovar sozinhas. Podem importar ideias de fora (universidades, startups, fornecedores) e exportar tecnologias que não usam. O oposto — inovação fechada — é o modelo que matou a Kodak."
                  },
                  {
                      "title": "Frameworks Prescritivos: OKRs, Design Sprint e Agile",
                      "content": "**OKRs** (Objectives and Key Results) — framework usado por Google, Nubank e iFood para alinhar inovação com resultado. Objetivo = o que quero alcançar. Key Results = como vou medir. Diferente de KPIs tradicionais, OKRs são ambiciosos por definição — atingir 70% já é sucesso.\n\n**Design Sprint** (Google Ventures, 2016) — método de 5 dias para validar uma ideia sem construir produto: mapear o problema (segunda), desenhar soluções (terça), decidir a melhor (quarta), prototipar (quinta), testar com usuários (sexta).\n\n**Agile/Scrum** não é metodologia de TI — é cultura organizacional. Ciclos curtos (sprints de 2 semanas), entrega contínua, feedback do cliente a cada ciclo. Spotify organizou equipes em squads (times autônomos de 6-8 pessoas). No Brasil, a Magazine Luiza adotou squads para transformar lojas em plataforma.",
                      "deepDive": "A integração entre SGI (Sistemas de Gestão da Inovação) e TD gera benefícios mútuos em 4 frentes: Estrutura de Projetos (SGI gerencia incertezas, TD fornece ferramentas de colaboração), Processos (SGI organiza a ideação, TD automatiza o funil), Cultura (SGI estimula experimentação, TD democratiza dados) e Resultados (SGI mantém foco no ROI, TD entrega analytics para medir impacto). Empresas que integram os dois domínios reportam ciclos de inovação 40% mais curtos e taxa de sucesso 2x maior."
                  },
                  {
                      "title": "Síntese e Fechamento",
                      "content": "Transformação digital não é sobre comprar tecnologia — é sobre **repensar como a empresa cria e entrega valor**.\n\n**Principais Insights:**\n\n- Digitização ≠ Digitalização ≠ Transformação — a confusão custa **bilhões** em investimentos mal direcionados.\n- Rogers (Columbia, 2016): os 4 domínios devem ser transformados **simultaneamente**, não sequencialmente.\n- SGI + TD integrados geram benefícios em 4 frentes: projetos, processos, cultura e resultados mensuráveis."
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
                      "Nubank: 80M clientes sem agência, CAC R$30-50 vs R$800+ bancário tradicional",
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
                      "content": "A governança digital é o conjunto de práticas que garantem que a tecnologia seja usada de maneira **eficiente e alinhada** às estratégias organizacionais. Em um ambiente em que os dados são o principal ativo, não dar o devido valor à governança pode colocar em risco a sustentabilidade de uma organização ao longo do tempo.\n\nAs principais atribuições da governança digital incluem:\n- **Segurança da informação**: proteger informações sensíveis contra ameaças internas e externas\n- **Alinhamento estratégico**: garantir que o uso da tecnologia esteja alinhado à estratégia de longo prazo\n- **Melhoria da eficiência**: processos automatizados reduzem desperdícios e promovem inovação\n- **Conformidade legal**: LGPD no Brasil e GDPR na Europa tornaram a governança digital essencial\n\nPilares são estruturas que mantêm algo em pé — se um falha, a casa desaba."
                  },
                  {
                      "title": "Os 4 Pilares da Governança Digital",
                      "content": "**🎯 Estratégia**: Estabelece como a tecnologia será usada para atingir objetivos. Prioridades, investimentos e indicadores. Não faz sentido investir em tech desalinhada do futuro da empresa. Ambev BEES: +30% em pedidos digitais, 1M+ PDVs conectados.\n\n**🛡️ Riscos e Segurança**: Identificar, avaliar e mitigar ameaças. Criptografia, 2FA, treinamento contínuo. A maior vulnerabilidade não é técnica — é humana. IBM 2024: custo médio de breach = US$ 4,88M. Renner perdeu R$ 20M por ransomware em 2021.\n\n**📋 Políticas e Procedimentos**: Regras claras padronizam processos. Quanto mais padronizado, mais fidedignos os dados — e mais seguras as decisões. Inclui uso de dispositivos, acesso a dados sensíveis, escolha de fornecedores. Itaú: relatórios de 5 dias para 2 horas com open data e governança.\n\n**🔄 Monitoramento Contínuo**: Não faz sentido construir e não manter. O monitoramento garante que sistemas sejam ajustados conforme a tecnologia avança. Mercado Livre: 2B+ eventos/dia com auto-scaling sem intervenção humana.",
                      "deepDive": "Governança não é burocracia — é o que impede que um ransomware apague seus dados, que um ex-funcionário acesse seu CRM, ou que você pague 5 ferramentas para fazer o trabalho de 2."
                  },
                  {
                      "title": "Cultura Organizacional e Gestão da Mudança",
                      "content": "A tecnologia é apenas um dos componentes da transformação digital; o **fator humano** e a cultura organizacional representam os maiores desafios e, simultaneamente, os maiores facilitadores do sucesso. A resistência à mudança é um fenômeno natural em organizações com identidades culturais fortes.\n\nAs barreiras mais comuns incluem:\n- Medo do erro, resistência à mudança e punição ao fracasso — inibem a experimentação necessária\n- Culturas centralizadoras que inibem o protagonismo dos colaboradores\n- Desalinhamento entre o discurso da liderança e as práticas diárias\n- Falta de visão integrada — transformação vista como responsabilidade só do setor de TI"
                  },
                  {
                      "title": "5 Passos para a Mudança Bem-Sucedida",
                      "content": "**1. Diagnóstico e Alinhamento Estratégico**: Compreender o cenário atual e definir a visão estratégica. Cada investimento em tecnologia deve contribuir para o alcance das metas. Magazine Luiza: Trajano fez diagnóstico antes de investir — identificou lojas como ativo, não passivo.\n\n**2. Liderança Ativa**: Líderes devem ser os primeiros a incorporar comportamentos digitais e valores de inovação. Se o diretor não usa o CRM, a equipe também não vai. Kotter (Harvard, 1996): 70% das transformações falham por falta de urgência no topo. Natura: CEO nos treinamentos SAP — adoção acelerou 40% vs cronograma.\n\n**3. Comunicação Transparente**: Explicar o \"porquê\" da mudança para gerar engajamento. Decisões baseadas em dados, não em hierarquia. Nubank: explicou novo sistema de IA a todos — zero sabotagem interna.\n\n**4. Treinamento e Capacitação**: Desenvolver habilidades técnicas e comportamentais. Brynjolfsson (MIT, 2003): investimentos complementares em treinamento são 5-10x maiores que em tech. TOTVS: 500+ cursos. Com treinamento: 85% retenção. Sem: 40%.\n\n**5. Espaços Seguros para Experimentar**: Criar ambientes onde ideias possam ser testadas sem medo de punição severa. Edmondson (Harvard, 2018): segurança psicológica = fator #1 de alta performance. Google Aristotle (180 equipes): segurança psicológica é o fator #1."
                  },
                  {
                      "title": "Frameworks de Governança: COBIT, ISO 38500 e ITIL 4",
                      "content": "**COBIT** (ISACA, 1996/2019) é a referência global para governança de TI no nível estratégico — conecta objetivos de negócio às metas de tecnologia, definindo papéis, responsabilidades e métricas de controle.\n\n**ISO/IEC 38500** (2008/2015) fornece princípios para dirigentes: avaliação do uso atual e futuro da TI, direção para implementação de planos e políticas, e monitoramento de conformidade.\n\n**ITIL 4** (2019) foca na parte tática e operacional, organizando fluxos de entrega integrando IA e cloud.\n\n**Para PMEs** — governança simplificada: backup automático diário (R$ 0-50/mês), autenticação em dois fatores em todas as contas (R$ 0), um responsável por tecnologia (mesmo acumulando função), política de senhas com gerenciador, revisão trimestral de ferramentas e custos.",
                      "deepDive": "Estruturas excessivamente centralizadoras comprometem a velocidade de decisão — e velocidade é diferencial competitivo."
                  },
                  {
                      "title": "Síntese e Fechamento",
                      "content": "Governança não é burocracia — é o que impede que um ransomware apague seus dados, que um ex-funcionário acesse seu CRM, ou que você pague 5 ferramentas para fazer o trabalho de 2. Os 5 passos da mudança são o caminho comprovado: de Kotter (Harvard) a Edmondson (Harvard).\n\n**Principais Insights:**\n\n- Kotter (1996): **70% das transformações falham** — motivo #1 é liderança, não tecnologia.\n- Governança para PME: R$ 0-50/mês. Renner perdeu **R$ 20M** sem ela.\n- Segurança psicológica (Edmondson, Harvard 2018) é o fator **#1** de equipes de alta performance."
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
                      "content": "Empresas líderes estão adotando práticas que exploram dados em larga escala para otimizar portfólio e decisões. A Tomada de Decisão Baseada em Dados (Data-Driven Decision Making — **DDDM**) é definida como o uso de fatos, métricas e dados para orientar decisões comerciais estratégicas. A tecnologia de análise sozinha não é suficiente; é necessário criar uma **cultura** que estimule o pensamento crítico e a curiosidade em todos os níveis da organização.\n\nOs **4 pilares da decisão baseada em dados**:\n\n1. **Coleta e Armazenamento**: capturar dados de forma eficiente — APIs, IoT, formulários, integrações automáticas\n2. **Análise e Processamento**: extração de informações relevantes através de modelos estatísticos e machine learning\n3. **Visualização e Comunicação**: apresentação clara para que não-especialistas possam agir sobre os dados\n4. **Integração Estratégica**: uso dos insights nos processos decisórios diários da liderança — não num relatório que ninguém lê"
                  },
                  {
                      "title": "Governança de Dados e o Marco Regulatório Brasileiro",
                      "content": "A transformação digital no Brasil ocorre sob um rigoroso arcabouço legal. A **Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018)** e a **Lei do Governo Digital (14.129/2021)** são os pilares desse ecossistema.\n\nO **sandbox regulatório** é um ambiente experimental que permite a testagem de modelos de negócios inovadores com flexibilidade temporária em normas e penalidades. O Marco Civil das Startups (LC 182/21) institucionalizou essa prática. Recentemente, a ANPD lançou um sandbox focado em Inteligência Artificial e Proteção de Dados, com ênfase em transparência algorítmica, mitigação de vieses e segurança de dados pessoais em modelos generativos."
                  },
                  {
                      "title": "3 Tendências que Redefinem Governança (2025-2026)",
                      "content": "**1. Agentes de IA Autônomos**: Diferente da automação robótica tradicional (RPA), os agentes de IA possuem capacidades de percepção, raciocínio adaptativo e ação autônoma. Isso redefine a governança: empresas agora gerenciam agentes que tomam decisões independentes e acessam dados sensíveis. A observabilidade torna-se prioridade número um.\n\n**2. RegTech e Compliance Automatizado**: As RegTechs utilizam IA para automatizar verificações de KYC e triagens de AML. Em 2025, o compliance deixa de ser focado apenas em evitar multas para se tornar um motor de confiança e reputação. A detecção preditiva de anomalias permite responder a riscos em tempo real.\n\n**3. Inovação Ambidestra**: Manter a eficiência operacional (exploração do modelo atual) enquanto se explora novas fronteiras (experimentação com modelos novos). O maior desafio organizacional da próxima década: fazer os dois ao mesmo tempo sem que um sabote o outro."
                  },
                  {
                      "title": "Cases Brasileiros de Transformação",
                      "content": "A **B3** se transformou de pregão viva-voz em hub fintech — hoje processa 13 milhões de ordens por dia com latência de microssegundos.\n\nA **Stone** provou que dá para competir com Cielo e Rede começando por microempreendedores que ninguém atendia — modelo disruptivo clássico de Christensen.\n\nA **Embraer** inova em indústria pesada: compete com Boeing e Airbus criando aviões para nichos que as gigantes ignoram — jatos regionais onde nenhuma grande quer investir.\n\nO **Mercado Pago** virou o maior banco digital da América Latina por volume de transações — sem pedir licença bancária tradicional. Começou como meio de pagamento do marketplace e expandiu para crédito, investimento e seguros. Exemplo perfeito de como plataforma cria ecossistema financeiro."
                  },
                  {
                      "title": "IA Generativa, Sustentabilidade Digital e ESG",
                      "content": "O maior desafio da IA generativa em 2025 não é técnico — é de ROI. A maioria das empresas que adotou ChatGPT/Copilot ainda não consegue medir retorno concreto (McKinsey, 2024). IA generativa é excelente para tarefas pontuais mas difícil de escalar para processos críticos sem governança de dados.\n\nQuem é responsável quando um agente de IA nega um empréstimo injustamente? A liability da IA corporativa é o maior buraco jurídico de 2025. Empresas que implementam IA sem trilha de auditoria (observabilidade) estão criando risco legal que pode superar o benefício operacional.\n\n**Sustentabilidade Digital**: Data centers globais consomem 1-2% da eletricidade mundial — equivalente à aviação comercial. Cada consulta a um modelo de IA gasta 10x mais energia que uma busca no Google. A conexão entre digital e ESG é dupla: tecnologia pode habilitar sustentabilidade (IoT para eficiência energética, IA para otimização logística) mas também pode mascarar greenwashing."
                  },
                  {
                      "title": "Síntese e Fechamento",
                      "content": "Ferramentas digitais sem cultura data-driven são como Ferrari na garagem. A LGPD não é obstáculo — é framework de confiança. E os agentes de IA estão redefinindo o que significa governar tecnologia: não basta controlar ferramentas, agora é preciso gerenciar entidades que decidem sozinhas.\n\n**Principais Insights:**\n\n- DDDM depende de 4 pilares: Coleta → Análise → Visualização → **Integração** nos processos diários.\n- LGPD + sandbox regulatório = inovação dentro da lei, não apesar dela.\n- Agentes de IA + RegTech transformam compliance de **custo** em motor de confiança."
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
                      "B3: de pregão viva-voz para 13M ordens/dia — transformação completa de infraestrutura",
                      "Mercado Pago: de meio de pagamento de marketplace para maior banco digital da América Latina"
                  ]
              }
          },
          {
              "title": "5: Tipos e Intensidade da Inovação",
              "description": "De produto a modelo de negócio — e de rotina a arquitetônica",
              "subsections": [
                  {
                      "title": "O que é Inovação (de verdade)",
                      "content": "Uma inovação necessariamente precisa ser **implementada** e proporcionar impactos econômicos e sociais mensuráveis para empresas, indivíduos, governos e a sociedade. Do contrário, trata-se apenas de mera ideia ou invenção.\n\nA inovação pode ser classificada de acordo com seu tipo. São consideradas inovações as modificações que resultem em melhor desempenho, usabilidade, eficiência, redução de custos e acessibilidade. Com o crescimento da pauta de sustentabilidade, responsabilidade social e economia circular, o design de produto vem ganhando maior relevância e ampliando o conceito de inovação."
                  },
                  {
                      "title": "Inovação de Produto/Serviço",
                      "content": "O mais comum. Mudança de produtos e serviços através de melhoria em design, usabilidade, desempenho, funcionalidade. É a forma mais palpável de inovar — impacta diretamente no faturamento. Pode ser algo que concorrentes já praticam (refrigerante zero açúcar) ou inédito (refrigerante com café).",
                      "quote": "Estudo de Caso — Havaianas (1994):",
                      "studyCase": {
                          "title": "Havaianas (1994)",
                          "body": "Mesmo produto desde 1962, reinventado por design e posicionamento. De R$ 2 a produto global em 100+ países. Criatividade no marketing, não na borracha."
                      }
                  },
                  {
                      "title": "Inovação Organizacional",
                      "content": "Mudanças na cultura, equipes, hierarquia, processos internos. Pode afetar contratação, treinamento, gerenciamento, espaço físico, plano de carreiras. Maior investimento financeiro e de esforço organizacional.",
                      "quote": "Estudo de Caso — Spotify (2012):",
                      "studyCase": {
                          "title": "Spotify (2012)",
                          "body": "Organizou equipes em squads autônomos de 6-8 pessoas. Combinou velocidade de startup com escala corporativa. Magazine Luiza adotou modelo similar para transformar lojas em plataforma."
                      }
                  },
                  {
                      "title": "Inovação de Processo",
                      "content": "Mudanças significativas em fluxos organizacionais: gestão da inovação, marketing, vendas, qualidade, logística, TI. Objetivo: maior eficiência, menor custo, mais engajamento, menor impacto ambiental.",
                      "quote": "Estudo de Caso — Natura (2012):",
                      "studyCase": {
                          "title": "Natura (2012)",
                          "body": "SAP integrou 7 países. Decisões logísticas que levavam semanas viraram horas. Economia projetada de ~R$ 500M. O processo mudou — o modelo de negócio não."
                      }
                  },
                  {
                      "title": "Inovação de Modelo de Negócio",
                      "content": "Mudança significativa nas atividades core. Altera o valor agregado ao cliente e a forma de conduzir o negócio. Maior risco, mas pode garantir sobrevivência ou levar a outro patamar.",
                      "quote": "Estudo de Caso — Xerox (2000):",
                      "studyCase": {
                          "title": "Xerox (2000)",
                          "body": "Mudou de venda de impressoras para prestação de serviços de impressão. Garantiu negócio mais sustentável e receita recorrente. Mesmo hardware, modelo completamente diferente."
                      }
                  },
                  {
                      "title": "Os 4 Níveis de Intensidade da Inovação",
                      "content": "**🔄 Rotina**: Renovação natural para atender à dinâmica de mercado. Baixo impacto no modelo e nas capacidades técnicas. A política interna de incentivo é capaz de promovê-la.\n\n**🚀 Radical**: Mantém bases do modelo de negócio mas exige novas competências tecnológicas. Investimentos elevados e alto impacto no perfil dos colaboradores.\n\n**💥 Disruptiva**: Requer reavaliação e mudança no modelo de negócio. Foco nas escolhas estratégicas. Maior enfoque na mudança cultural.\n\n**🏗️ Arquitetônica**: Maior impacto e risco — afeta tanto o modelo de negócio quanto a tecnologia. Muitas vezes em continuidade a uma inovação disruptiva ou radical.",
                      "deepDive": "O tipo e a intensidade determinam o risco, o investimento e o impacto. Inovação não é sinônimo de tecnologia."
                  },
                  {
                      "title": "Síntese e Fechamento",
                      "content": "Inovação não é sinônimo de tecnologia. Pode ser no **produto**, no **processo**, na **organização** ou no **modelo de negócio**. A intensidade vai de rotina (incremental) a arquitetônica (tudo muda). O tipo e a intensidade determinam o risco, o investimento e o impacto.\n\n**Principais Insights:**\n\n- Inovação sem implementação é apenas **ideia**. Precisa gerar impacto mensurável.\n- Inovação de modelo de negócio tem maior risco mas pode garantir a **sobrevivência** da empresa.\n- Inovação arquitetônica afeta modelo de negócio E tecnologia — é a mais **transformadora**."
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
                      "Havaianas: mesmo produto desde 1962, reinventado por design e posicionamento",
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
                      "content": "Inovar não consiste somente em ter ideias disruptivas. É um processo que exige planejamento, disciplina e recursos. O **Canvas da Inovação Estratégica** responde 5 perguntas: O que inovar? Como? Onde? Com quais recursos? Qual estrutura?\n\n**🎯 Propósito**: O porquê de inovar. Toda decisão liga-se a resultados: receita, custos, sustentabilidade. Deve dar suporte à missão e visão da empresa.\n\n**⚙️ Processos**: O como será desenvolvida. O funil de inovação é o método mais conhecido: geração de ideias → triagem → desenvolvimento → lançamento.\n\n**👥 Pessoas**: Profissionais com espírito empreendedor, gestores ágeis com mentalidade Lean. Eventos e congressos desenvolvem pensamento amplo.\n\n**📋 Políticas**: Criar ambiente propício dando ênfase ao aprendizado, não só ao erro. Definir formas de mensurar sucesso e recompensar resultados."
                  },
                  {
                      "title": "Os Três Horizontes da Inovação",
                      "content": "Steve Blank (2015) destaca que o primeiro horizonte é o nível do conhecido: o modelo de negócio atual. Inovação incremental, quick wins, eficiência. O segundo cria novos produtos/serviços dentro do mesmo modelo — terreno parcialmente conhecido. O terceiro é disruptivo: distancia-se da operação tradicional.\n\n**🎯 H1 — Core (70% dos esforços)**: Principais produtos e serviços. Inovações incrementais, domínio total. Quick wins e eficiência.\n\n**🔭 H2 — Adjacente (20% dos esforços)**: Áreas próximas ao core. Novos canais, novos clientes, mesma tecnologia. Risco moderado.\n\n**🚀 H3 — Disruptivo (10% dos esforços)**: Projetos que se distanciam da operação tradicional. Novos mercados. Risco alto, retorno exponencial.",
                      "deepDive": "Empresas que alocam 100% no H1 estão morrendo lentamente — mantêm a operação mas não constroem o futuro."
                  },
                  {
                      "title": "Funil de Inovação e Stage Gates",
                      "content": "O funil de inovação e os estágios de decisão (stage gates, **Robert Cooper 2001**) são as ferramentas mais utilizadas para representar o fluxo criativo. Cada fase é demarcada por um estágio de decisão que analisa se a ideia avança.\n\n**1. Fuzzy Front-End (FFE)**: Conjunto difuso de ideias. Incertezas sobre mercado, tecnologia e gestão. Quanto mais ideias nessa fase, melhor. Divergir é necessário. A saída é um conceito sobre o produto ou solução a ser desenvolvida.\n\n**2. Stage Gate 1 — Triagem**: Avaliação inicial: alinhamento estratégico, viabilidade técnica, potencial de mercado. Go/no-go. Cooper: banco de ideias permite revisitar projetos estacionados no futuro.\n\n**3. Desenvolvimento**: Prototipagem, testes, validação técnica e de mercado. TRL (NASA, 1974): mede maturidade da tecnologia em 9 níveis.\n\n**4. Stage Gate 2 — Decisão Final**: Produto/serviço está pronto? Mercado validado? ROI projetado atende? Lançar ou pivotar. Hype Cycle (Gartner) acompanha maturidade e potencial.\n\n**5. Lançamento e Escala**: Go-to-market. Métricas de adoção, receita, satisfação. O ciclo reinicia com aprendizados do mercado. Lean Startup: construir-medir-aprender em ciclos contínuos.",
                      "deepDive": "Funil de inovação: quanto mais ideias no topo, melhor. A maioria DEVE morrer na triagem — isso é positivo. Stage gates previnem investimento em projetos fadados ao fracasso."
                  },
                  {
                      "title": "Corporate Ventures e Ecossistema de Startups",
                      "content": "Corporate ventures são grandes organizações que investem capital em startups ou em ideias inovadoras dos colaboradores internos.\n\n**Classificações:**\n- **CVC** (Corporate Venture Capital): compra ações de startup\n- **CVE** (Externo): cede ajuda como espaço, marca, canais\n- **CVI** (Interno): investe em ideias dos colaboradores\n\n**Dois movimentos de materialização:**\n- **Spin-in**: integração da startup ao negócio da investidora, via aquisição total\n- **Spin-off**: quando o investimento interno se torna independente, geralmente com criação de nova empresa\n\nHubs de inovação aberta das grandes organizações abrem portas para incubar startups com potencial de spin-in.\n\nO **Business Model Canvas** (Osterwalder & Pigneur, 2011) permite definir e visualizar modelos de negócio em uma única página. Pode ser usado em 3 momentos: o atual (como a empresa opera hoje), o de inovação (ampliação do escopo) e o de disrupção (negócios não existentes)."
                  },
                  {
                      "title": "Síntese e Fechamento",
                      "content": "Gestão da inovação não é improviso — é **processo**. O Canvas CIE responde 5 perguntas essenciais. Os 3 horizontes distribuem risco (70/20/10). O funil com stage gates filtra ideias. E corporate ventures conectam grandes empresas com o ecossistema de startups.\n\n**Principais Insights:**\n\n- Funil de inovação: quanto mais ideias no **topo**, melhor. A maioria DEVE morrer na triagem — isso é positivo.\n- Stage gates (Cooper, 2001): decisões **go/no-go** em cada fase previnem investimento em projetos fadados ao fracasso.\n- Spin-in e spin-off são os dois movimentos que materializam a inovação no **mercado**."
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
                      "content": "Cultura de inovação é um conjunto de práticas e valores compartilhados que favorecem atitudes inovadoras. Tem duas dimensões: a **interna** (a própria organização) e a **externa** (o setor e a sociedade). Sem cultura, ferramentas e processos viram burocracia."
                  },
                  {
                      "title": "Cultura Interna: Elementos da Organização",
                      "content": "Cada empresa possui uma cultura corporativa: um conjunto de regras, tácitas e explícitas, que condiciona as atitudes de todos que a compõem. Os elementos básicos incluem:\n\n**💬 Linguagem e Grupos**: Padrões de tratamento e interação entre pessoas. Como se formam grupos informais.\n\n**📏 Normas**: Regras do grupo — dress code, dias de pagamento, rituais. O que é aceito e o que não é.\n\n**💎 Valores**: Confiança, responsabilidade, transparência. O que a empresa diz que valoriza vs o que pratica.\n\n**🌡️ Clima**: Percepção do ambiente físico e psicológico. Como as pessoas sentem o local de trabalho.\n\n**Liderança inovadora, mas não centralizadora**: A inovação precisa começar na alta administração. Mas o problema em organizações comandadas por um \"gênio criativo\" é que as novas ideias costumam vir apenas dele. Cria-se a regra tácita de \"o chefe tem ideias e nós as executamos\" — **dependência** perigosa porque torna a empresa dependente de uma única pessoa."
                  },
                  {
                      "title": "Cultura Externa: Contexto Setorial e Social",
                      "content": "Um profissional inovador precisa de sólida formação na área em que atua — criação tem tudo a ver com conhecimento. Mas e se a oferta de profissionais qualificados é baixa? Se não existe sistema de patentes? Se não há acesso a bancos de dados públicos? Se a transferência de tecnologia é difícil?\n\nEsses são problemas da segunda dimensão da cultura de inovação: o **contexto setorial e social**. Uma empresa pode ter excelente cultura interna mas estar inserida em um ecossistema que dificulta a inovação."
                  },
                  {
                      "title": "Nível de Maturidade Tecnológica (TRL)",
                      "content": "O **TRL** (Technology Readiness Level) é uma metodologia desenvolvida pela NASA em 1974 para mensurar e comparar a evolução da maturidade de novas tecnologias. Muito utilizada por empresas e agentes de fomento na tomada de decisão da alocação de recursos conforme milestones são superados.\n\nQuanto mais recente a tecnologia, maiores as incertezas e chances de fracasso. O TRL varia de 1 (princípio básico observado) a 9 (sistema comprovado e qualificado em operações bem-sucedidas).\n\nEmpresa e agentes de fomento usam o TRL para decidir onde alocar recursos — tecnologias em TRL 1-3 recebem investimento de pesquisa, TRL 4-6 recebem desenvolvimento, TRL 7-9 recebem escala."
                  },
                  {
                      "title": "Hype Cycle (Curva Gartner) — As 5 Fases",
                      "content": "O **Hype Cycle** é uma curva de padrões que tendem a se repetir no ciclo de vida de uma tecnologia, desenvolvida pela Gartner em 2018. Desde então, a consultoria divulga anualmente mais de 100 Hype Cycles em vários setores para acompanhar a maturidade da inovação e o potencial futuro das tecnologias.\n\n**1. Gatilho Tecnológico**: Nova tecnologia surge. Primeiras provas de conceito geram interesse da mídia e investidores.\n\n**2. Pico de Expectativas Infladas**: Publicidade gera entusiasmo excessivo. Expectativas irrealistas. Muitas startups surgem.\n\n**3. Vale da Desilusão**: Implementações falham. Interesse diminui. Empresas mais fracas morrem. Mídia perde interesse.\n\n**4. Encosta da Iluminação**: Casos de uso reais começam a funcionar. Benefícios ficam mais claros e práticos.\n\n**5. Platô de Produtividade**: Tecnologia madura, amplamente adotada. Critérios de viabilidade comprovados. Mercado consolidado."
                  },
                  {
                      "title": "Síntese e Fechamento",
                      "content": "Cultura de inovação tem duas dimensões: **interna** (valores, liderança, clima) e **externa** (profissionais, patentes, ecossistema). TRL mede maturidade técnica. Hype Cycle mede expectativa de mercado. Sem cultura, as melhores ferramentas viram burocracia.\n\n**Principais Insights:**\n\n- Liderança inovadora não é centralizadora. \"O chefe tem ideias e nós executamos\" = **dependência** perigosa.\n- TRL (NASA, 1974): 9 níveis de maturidade. Quanto mais recente, mais **incerteza** e risco.\n- Hype Cycle: toda tecnologia passa por expectativa inflada → desilusão → **produtividade real**."
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
                      "Hype Cycle: toda tecnologia segue o mesmo padrão — hype, desilusão, produtividade"
                  ]
              }
          },
          {
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
                  },
                  {
                      "title": "O que é Inteligência Organizacional (OBI)",
                      "content": "Business Intelligence não é um software isolado — é uma capacidade organizacional. O OBI (Organizational Business Intelligence) integra dados de toda a empresa para transformar cada decisão gerencial em ação baseada em evidência. Um projeto de BI transforma essa intenção em realidade operacional mensurável.\n\nO conceito de Inteligência Organizacional (OBI) vai além dos relatórios operacionais tradicionais. Enquanto o BI clássico foca em dados transacionais — vendas, estoque, financeiro — o OBI integra dimensões humanas e processuais: desempenho de equipes, eficiência de fluxos, padrões de colaboração e saúde organizacional. O resultado é uma visão 360° que conecta operação, pessoas e estratégia em um único ambiente analítico.\n\nWilliam Inmon (1990), considerado o \"pai do Data Warehouse\", definiu que a inteligência organizacional começa pela separação entre sistemas transacionais (OLTP — registro de eventos) e sistemas analíticos (OLAP — análise de padrões). Misturar os dois é o erro mais comum — e mais caro — em projetos de BI: relatórios lentos, decisões atrasadas e dados inconsistentes."
                  },
                  {
                      "title": "As 4 Camadas do OBI",
                      "content": "🗄️ Camada de Dados\nColeta e armazenamento de dados brutos — transacionais, operacionais e comportamentais. ERP, CRM, IoT, planilhas. A qualidade aqui determina tudo o que vem depois. 70% do tempo do projeto é ETL.\n\n🔄 Camada de Integração\nETL (Extract, Transform, Load) padroniza e consolida dados de fontes heterogêneas. Qualidade de dados determina qualidade das decisões. Garbage in = garbage out. 80% dos projetos falham nessa etapa.\n\n🧠 Camada Analítica\nOLAP, modelos preditivos e algoritmos de IA transformam dados em padrões acionáveis. Aqui nascem os insights — análise dimensional, drill-down, slice and dice. 10x mais rápido que SQL direto.\n\n📊 Camada de Apresentação\nDashboards, relatórios e alertas entregam informação no momento certo, para a pessoa certa, no formato certo. KPI = pergunta + métrica + meta + frequência. 1 insight por tela — regra de ouro."
                  },
                  {
                      "title": "Projeto de Software de BI — Ciclo de Vida",
                      "content": "Um projeto de BI bem executado começa pelo negócio, não pela tecnologia. O maior erro é começar pelo software — antes de entender o que precisa ser decidido. Ralph Kimball (1996) definiu o padrão ouro: dimensional modeling primeiro, ferramenta depois. Seu livro \"The Data Warehouse Toolkit\" é a referência mais citada da área até hoje e ainda guia projetos modernos em cloud.\n\n▶ PROFESSOR IA✦ CONTEXTUAL\nCICLO DE VIDA DO PROJETO DE BI (METODOLOGIA KIMBALL)\n\n1. Levantamento de Requisitos\nEntender quais decisões precisam ser suportadas. Entrevistar stakeholders, mapear fontes de dados, definir KPIs prioritários. Sem essa fase, projetos entregam dados sem impacto. Magazine Luiza: levantamento revelou que gerentes de loja precisavam de sell-through por SKU — não de receita total.\n\n2. Modelagem Dimensional\nDefinir fatos (o que medir) e dimensões (como analisar). Star Schema ou Snowflake Schema. A granularidade define o nível de detalhe e o desempenho das consultas. Kimball (1996): \"Escolha a granularidade mais baixa possível — você pode sempre agregar, nunca desagregar.\"\n\n3. ETL — Extração, Transformação e Carga\nConectar fontes, limpar e padronizar dados, carregar no Data Warehouse. 70% do tempo de projetos de BI é gasto aqui — e é onde a maioria dos problemas se esconde. Renner: dados de estoque vinham de 3 sistemas com nomenclaturas diferentes. Harmonização levou 4 meses.\n\n4. Desenvolvimento de Visualizações\nConstruir dashboards, relatórios e alertas. Regra: 1 insight por tela. Complexidade visual mata a adoção. Stephen Few (2006): bons dashboards comunicam, não impressionam. Ambev: reduziu painel de 40 métricas para 7 KPIs — adoção subiu de 30% para 85% em 90 dias.\n\n5. Deploy e Governança\nPublicar, criar política de acesso (RBAC), treinar usuários, definir ciclo de atualização. BI sem governança vira caos de versões — cada área com \"a sua verdade\". DAMA-DMBOK (2017): Data Governance = pessoas + processos + tecnologia. Tecnologia é a menor parte."
                  },
                  {
                      "title": "Prototipagem em BI e Ferramentas no Mercado",
                      "content": "PROTOTIPAGEM EM BI\nPrototipar antes de construir é a prática que mais reduz retrabalho em projetos de BI. O custo de mudar um wireframe é zero. O custo de mudar um modelo dimensional em produção pode ser meses de trabalho. Protótipos definem expectativas reais entre analistas e stakeholders antes de qualquer linha de código ou query SQL — e evitam o cenário clássico: \"não era isso que eu queria.\"\n\n3 FASES DA PROTOTIPAGEM EM BI\n✏️ Wireframe (Baixa Fidelidade): Esboço visual das telas e layouts. Sem dados reais — apenas estrutura. Ferramentas: papel, Balsamiq, Figma sketch. Valida: o que aparece onde e qual hierarquia de informação.\n🎨 Mockup (Média Fidelidade): Design visual com dados fictícios. Simula a aparência final — cores, tipografia, ícones. Ferramentas: Figma, Adobe XD. Valida: linguagem visual e consistência antes de codar.\n⚡ Protótipo Funcional (Alta Fidelidade): Dashboard real com amostra de dados reais. Ferramentas: Power BI, Tableau, Metabase. Valida: usabilidade e valor do insight antes do deploy completo — expõe problemas de dados cedo.\n\nFERRAMENTAS DE BI NO MERCADO\nA escolha da ferramenta de BI deve seguir o contexto, não a moda. Três variáveis determinam a escolha certa: maturidade da equipe, volume de dados e integração com sistemas existentes. Gartner (2024): Power BI e Tableau lideram o Quadrante Mágico de Analytics por 9 anos consecutivos.\n\n🟡 Power BI (Microsoft): Integração nativa com Excel, Azure e Teams. Curva de aprendizado mais baixa. Licenciamento por usuário. Ideal: empresas já no ecossistema Microsoft.\n🔵 Tableau (Salesforce): Referência em visualização avançada e análise exploratória. Maior curva de aprendizado. Ideal: analistas avançados que precisam de flexibilidade visual sem limite.\n🟢 Metabase (Open-source): Gratuito, deploy rápido, acessível para não-técnicos. Ideal: startups e equipes com orçamento limitado.\n🟠 Qlik Sense: Motor de associação único. Descoberta de dados mais intuitiva."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A estratégia precisa de monitoramento contínuo através de Sistemas de Informação.",
                      "O Protótipo e o MVP servem para errar rápido e consertar rápido com baixo custo.",
                      "O Road Map mantém a visão do projeto clara para todos os stakeholders envolvidos.",
                      "OBI transforma a empresa em uma organização que aprende com seus próprios dados.",
                      "As 4 camadas (Dados, Integração, Analítica, Apresentação) formam o pipeline completo.",
                      "O ciclo Kimball inclui: requisitos, modelagem, ETL, visualização e governança.",
                      "Prototipar antes de construir é a decisão mais inteligente para reduzir retrabalho."
                  ],
                  "insights": [
                      "Pensamento Estratégico",
                      "Mínimo Produto Viável",
                      "Inmon vs Kimball: Kimball (dimensional) é mais adotado para BI ágil. Inmon (normalizado) para ambientes enterprise de longo prazo.",
                      "Regra de ouro do dashboard: 1 insight por tela. Múltiplas métricas competindo geram indecisão.",
                      "Star Schema vence na maioria dos casos operacionais por ser mais rápido e simples que Snowflake."
                  ]
              }
          }
      ]
  },
  {
      "id": "M4-T1-S2",
      "code": "M4-T1-S2",
      "title": "Pensamento Criativo",
      "description": "Da neurociência ao modelo de Guilford, Design Thinking, SCAMPER e ferramentas de inovação",
      "icon": "Lightbulb",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: O que é Pensamento Criativo",
              "description": "Da neurociência ao modelo de Guilford — criatividade como competência treinável",
              "subsections": [
                  {
                      "title": "Redes Cerebrais e Definição",
                      "content": "Pensamento criativo é a capacidade cognitiva de gerar ideias, soluções ou conexões que são simultaneamente originais e úteis. Diferente do senso comum, criatividade não é um dom exclusivo de artistas — é uma competência treinável, mensurável e essencial para a sobrevivência empresarial.\n\nPesquisas com fMRI (ressonância magnética funcional) revelam que a criatividade não reside em um hemisfério específico. O neurocientista Rex Jung demonstrou que o processo criativo envolve três redes cerebrais: DMN (Default Mode - imaginação), ECN (Executive Control - avalia/filtra) e SN (Salience Network - alterna e detecta eureka)."
                  },
                  {
                      "title": "O que define uma pessoa criativa e os 4 Ps",
                      "content": "Definição de pessoa criativa envolve Curiosidade, Ângulo inusitado, Perseverança e Humildade. Os 4 Ps da Criatividade (Mel Rhodes) são: Person (traços cognitivos), Process (etapas do pensamento), Product (resultado tangível) e Press (o ambiente que facilita ou bloqueia)."
                  },
                  {
                      "title": "Mitos que Precisam Morrer",
                      "content": "Mito 1: \"Criatividade é inata\" (Falso: 98% das crianças são criativas vs 2% dos adultos). Mito 2: \"Brainstorming sempre funciona\" (Parcialmente Falso: grupos sem estrutura geram menos ideias). Mito 3: \"Pressão mata criatividade\" (Parcialmente Verdadeiro: pressão com propósito aumenta, mas com controle destrói)."
                  },
                  {
                      "title": "Guilford: Pensamento Divergente vs Convergente",
                      "content": "A diferença decisiva de Guilford é entre pensamento convergente (raciocínio analítico) e divergente (várias alternativas). As 4 métricas divergentes são: Fluência (quantidade), Flexibilidade (variedade), Originalidade (raridade) e Elaboração (detalhes). O erro mais comum é julgar ideias antes de gerar volume suficiente (as melhores ideias surgem após a ideia #50)."
                  },
                  {
                      "title": "As 6 Etapas do Processo Criativo e Tipos de Criatividade",
                      "content": "As etapas são: Reconhecimento de Insights, Geração de Alternativas, Seleção, Iteração, Transferência ao Mundo Real e Aprendizado.\n\nTipos incluem Criatividade de Produto (ex: Havaianas), Criatividade de Modelo (ex: Nubank) e Criatividade Estratégica (ex: Embraer)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "98% das crianças de 5 anos são gênios criativos. Aos adultos: 2%. Criatividade é desaprendida.",
                      "O pensamento divergente gera ideias, convergente as seleciona. Nunca faça os dois juntos.",
                      "O ambiente tem dimensões mensuráveis que definem a criatividade."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Métodos de Criatividade",
              "description": "Design Thinking, Brainstorming Estruturado e SCAMPER",
              "subsections": [
                  {
                      "title": "Design Thinking",
                      "content": "Design Thinking é uma abordagem centrada no humano com fases: 1. Empatizar (Observar sem perguntar diretamente); 2. Definir (Sintetizar em POV acionável); 3. Idear (Divergir sem julgamento); 4. Prototipar (Construir para testar barato); 5. Testar (Aprender rápido). Exemplo: o case da IDEO com carrinhos de supermercado."
                  },
                  {
                      "title": "Brainstorming Estruturado",
                      "content": "Grupos só geram mais ideias com estrutura. Variantes que funcionam: Brainwriting 6-3-5 (silêncio e volume), Round Robin (contribuição igualitária), Crazy 8s (8 ideias em 8 min) e Brainstorming Reverso (como piorar o problema?)."
                  },
                  {
                      "title": "SCAMPER",
                      "content": "A ferramenta mais prática para inovar sobre algo existente. Substituir (Beyond Meat), Combinar (iPhone unindo funções), Eliminar (IKEA tirando a montagem da fábrica), entre outros operadores."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "IDEO: as melhores ideias surgem após a ideia #50. Separe divergência de convergência.",
                      "Brainstorming sem estrutura produz MENOS do que indivíduos sozinhos.",
                      "SCAMPER evolui produtos existentes (ex: iPhone combinou, eliminou teclado)."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Ferramentas Avançadas e Bloqueios Criativos",
              "description": "Pensamento Lateral, TRIZ, Mapas Mentais e Prototipagem Rápida",
              "subsections": [
                  {
                      "title": "Ferramentas Avançadas",
                      "content": "Quando ideias esgotam: Pensamento Lateral (De Bono, fugir do lógico), TRIZ (Altshuller, 40 princípios para resolver contradições), Mapas Mentais e Restrição Criativa (ex: Twitter 140 chars)."
                  },
                  {
                      "title": "Os Seis Chapéus do Pensamento",
                      "content": "Método de De Bono onde todos usam o mesmo 'chapéu' (modo) ao mesmo tempo: Branco (Fatos), Vermelho (Emoções), Preto (Cautela), Amarelo (Otimismo), Verde (Criatividade), Azul (Processo)."
                  },
                  {
                      "title": "Bloqueios Criativos",
                      "content": "Bloqueio Perceptivo (fixação funcional - não ver o problema), Bloqueio Emocional (medo de julgamento, segurança psicológica é chave), Bloqueio Cultural (Groupthink, 'sempre fizemos assim') e Bloqueio Ambiental (falta de tempo/espaço, como o projeto Post-it da 3M)."
                  },
                  {
                      "title": "Prototipagem Rápida e Restrição",
                      "content": "A velocidade de aprendizado requer prototipagem: Sketch, Storyboard, Mockup Interativo, Protótipo Funcional, MVP. A restrição (tempo, dinheiro, features) atua como um motor criativo contra o perfeccionismo."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Bloqueios não são falta de talento — são sintomas do ambiente. O diagnóstico correto resolve.",
                      "Inovação segue padrões mapeáveis (TRIZ).",
                      "A restrição é o melhor combustível da criatividade prática."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S3",
      "code": "M4-T1-S3",
      "title": "Sustentabilidade em Negócios",
      "description": "ESG, Frameworks de Reporte, Política de Sustentabilidade, Economia Regenerativa e BPMN",
      "icon": "Leaf",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Por que Sustentabilidade Virou Estratégia",
              "description": "Do TBL ao modelo de Círculos Aninhados — sustentabilidade como pilar de negócio",
              "subsections": [
                  {
                      "title": "Contexto e Evolução",
                      "content": "A sustentabilidade deixou de ser filantropia. Hoje é o eixo central da governança corporativa — e ignorá-la é risco financeiro. A pressão vem de investidores (critérios ESG), consumidores, reguladores (LGPD, marco ESG europeu) e funcionários.\n\nAntes, a gestão era dominada pela visão de Milton Friedman, focada apenas no lucro. Em 1994, John Elkington introduziu o Triple Bottom Line, e em 2023 mais de US$ 35 trilhões em ativos eram geridos sob critérios ESG."
                  },
                  {
                      "title": "Triple Bottom Line (TBL) — Os 3Ps",
                      "content": "People — Pessoas: Impacto social, condições de trabalho, diversidade (ex: Natura e comunidades na Amazônia).\nPlanet — Planeta: Impacto ambiental, emissões, água, energia (ex: Ambev reduzindo consumo de água).\nProfit — Lucro: Viabilidade econômica, lucro sustentável (ex: Trainee exclusivo do Magalu gerou identificação e vendas)."
                  },
                  {
                      "title": "Recall do TBL e Círculos Aninhados",
                      "content": "A maioria imagina a sustentabilidade como 3 círculos sobrepostos. O modelo de Círculos Aninhados inverte: a economia está DENTRO da sociedade, que está DENTRO do meio ambiente. Sem planeta viável, não há sociedade nem economia. Elkington pediu o recall do TBL em 2018 porque virou ferramenta de relações públicas (greenwashing) em vez de transformação real."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Elkington pediu o 'recall' do TBL em 2018 pois foi cooptado por greenwashing.",
                      "US$ 35 trilhões sob critérios ESG. Ignorar é ignorar o mercado.",
                      "People + Planet + Profit se reforçam mutuamente."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: ESG — Como o Mercado Avalia Sustentabilidade",
              "description": "Environmental, Social, Governance — de relatório a critério de investimento",
              "subsections": [
                  {
                      "title": "O conceito de ESG",
                      "content": "Lançado em 2004 pela ONU, o ESG transformou o TBL em critério de risco financeiro. ODS é o 'quê' deve ser alcançado, o ESG é o 'como'."
                  },
                  {
                      "title": "E - Environmental (Ambiental)",
                      "content": "Emissões, resíduos, água, biodiversidade. É risco existencial, não só relatório (ex: falha da Vale em Brumadinho custou R$ 70 bi)."
                  },
                  {
                      "title": "S - Social e G - Governance",
                      "content": "Social: Direitos humanos, diversidade, segurança. Afeta reputação.\nGovernance: Composição do conselho, transparência, combate à corrupção. O G sem enforcement é decorativo (ex: Fraude da Americanas de R$ 20 bi)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "ESG não é relatório — é critério de investimento.",
                      "E mede impacto ambiental, S mede impacto social, G sustenta ambos."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Frameworks de Reporte e Valor Compartilhado",
              "description": "GRI, SASB, ODS e CSV",
              "subsections": [
                  {
                      "title": "GRI e SASB",
                      "content": "GRI: Padrão mais usado no mundo. Olha de 'dentro para fora' e foca em todos os stakeholders.\nSASB: Complemento financeiro. Olha de 'fora para dentro' e fala direto com investidores usando métricas específicas por setor."
                  },
                  {
                      "title": "ODS e CSV",
                      "content": "ODS: Os 17 Objetivos da ONU. A empresa escolhe onde gera valor ou dano.\nCSV (Creating Shared Value): Porter e Kramer. Valor compartilhado não é CSR; é estratégia onde se lucra PORQUE se resolve um problema social. 3 níveis: Reconceber produtos/mercados, Redefinir produtividade na cadeia, Desenvolver clusters locais."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "GRI: 75% das 250 maiores empresas usam.",
                      "SASB: 77 setores com métricas específicas para investidores.",
                      "CSV: expande o bolo econômico e social simultaneamente."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Greenwashing e Política de Sustentabilidade",
              "description": "Como separar substância de discurso e Cisnes Verdes",
              "subsections": [
                  {
                      "title": "Greenwashing",
                      "content": "7 pecados (TerraChoice), sendo o mais comum o trade-off oculto (destacar o que é verde, ignorar grandes danos) e a vagueza ('eco-friendly' sem provas)."
                  },
                  {
                      "title": "Cisnes Verdes e Economia Regenerativa",
                      "content": "Cisnes Verdes: inovação regenerativa que cria valor exponencial. A economia regenerativa não busca apenas não causar dano (neutro), mas ser Net-Positive (ex: remover mais CO2 do que emite)."
                  },
                  {
                      "title": "ISE, ISP e Passos para Política",
                      "content": "ISE B3 é índice para ~40 empresas. A política formal precisa de 8 passos: Diagnóstico, Materialidade, Metas SMART, Governança, Capacitação, Processos, Medir/Reportar e Revisar."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Sustentabilidade real tem métricas e governança. Greenwashing tem marketing.",
                      "O futuro aponta para a Economia Regenerativa: gerar abundância."
                  ],
                  "insights": []
              }
          },
          {
              "title": "5: Política de Sustentabilidade na Prática",
              "description": "Como criar e a Metodologia SMART",
              "subsections": [
                  {
                      "title": "Os 3 Pilares e Os 8 Passos (Toledo & Farias)",
                      "content": "Pilar Ambiental, Social e Econômico. Os 8 passos práticos para implementar: 1. Identifique problemas; 2. Defina objetivos; 3. Crie ações; 4. Envolva todos; 5. Implemente; 6. Monitore; 7. Comunique resultados; 8. Ajuste."
                  },
                  {
                      "title": "Metodologia SMART",
                      "content": "Metas eficazes precisam ser: S (Específicas), M (Mensuráveis), A (Atingíveis), R (Relevantes) e T (Temporais)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Comece pelo simples: redução de plásticos e LED.",
                      "Se não medir, não sabe se funciona."
                  ],
                  "insights": []
              }
          },
          {
              "title": "6: BPMN — Modelagem de Processos de Negócio",
              "description": "Como mapear e analisar processos para otimização e sustentabilidade",
              "subsections": [
                  {
                      "title": "A notação BPMN",
                      "content": "BPMN traduz negócios para TI. 4 elementos gráficos: Objetos de Fluxo (Eventos, Atividades, Gateways), Conexão, Swimlanes e Artefatos."
                  },
                  {
                      "title": "Gateways e Swimlanes",
                      "content": "Gateways: XOR (Exclusivo - ou um ou outro), AND (Paralelo - todos ao mesmo tempo, espera concluir), OR (Inclusivo) e Baseado em Eventos.\nSwimlanes: Pools (empresas) e Lanes (departamentos)."
                  },
                  {
                      "title": "Tipos e Maturidade de Processos",
                      "content": "Privado, Abstrato e Colaboração. 3 Níveis de Maturidade: Descritivo (alto nível), Analítico (com regras e exceções) e Técnico/Executável (automação)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "BPMN é o tradutor universal entre negócio e TI.",
                      "Gateways definem como os tokens fluem e se ramificam."
                  ],
                  "insights": []
              }
          },
          {
              "title": "7: Certificações, Selos e Indicadores Globais",
              "description": "Como provar e medir a sustentabilidade",
              "subsections": [
                  {
                      "title": "Certificações de Empresa",
                      "content": "B Corps (Propósito + Lucro), Great Place to Work, Instituto Ethos e Ethisphere (ética corporativa global)."
                  },
                  {
                      "title": "Padrões de Reporte e Rankings",
                      "content": "Corporate Knights, ISE B3, Pacto Global ONU. Padrões: GRI, SASB, CDP e TCFD."
                  },
                  {
                      "title": "Selos de Produto",
                      "content": "Fair Trade (comércio justo), Rainforest Alliance (o sapinho de conservação), FSC (florestas) e Cradle to Cradle (C2C - economia circular, zero resíduo)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "B Corp certifica a empresa inteira.",
                      "Cradle to Cradle é o mais exigente e comprova ciclo fechado."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S4",
      "code": "M4-T1-S4",
      "title": "Gestão de Negócios",
      "description": "Fundamentos de gestão, Business Model Canvas, Planejamento Estratégico e Cadeia de Valor",
      "icon": "Briefcase",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Fundamentos da Gestão",
              "description": "As 4 funções clássicas + visão sistêmica — a base que sustenta tudo",
              "subsections": [
                  {
                      "title": "A Base da Gestão",
                      "content": "Gestão empresarial é um processo dinâmico fundamentado na administração eficiente de recursos materiais e humanos. O gestor maduro enxerga a empresa de forma sistêmica, compreendendo as interações entre áreas."
                  },
                  {
                      "title": "As 4 Funções Clássicas",
                      "content": "1. Planejamento (onde queremos chegar): definir metas e analisar cenários. Empresas com planejamento sobrevivem 30% mais.\n2. Organização (como nos estruturamos): hierarquias, processos e recursos.\n3. Direção (como conduzimos pessoas): liderança e motivação. A direção dá vida ao planejamento.\n4. Controle (como acompanhamos): medir desempenho (KPIs) para correção de desvios. O controle frequente evita crises."
                  },
                  {
                      "title": "Visão Sistêmica",
                      "content": "A interconexão e o alinhamento transformam o esforço em resultado. Adaptação constante e a geração de valor diferenciam a burocracia do resultado prático."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Gestão = Planejamento, Organização, Direção, Controle operados com visão sistêmica.",
                      "O que não é medido não é gerenciado. Controle fecha o ciclo PDCA.",
                      "A estrutura segue a estratégia."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Modelos de Negócio e Canvas",
              "description": "Como uma empresa cria, entrega e captura valor",
              "subsections": [
                  {
                      "title": "Business Model Canvas (BMC)",
                      "content": "Ferramenta de Osterwalder & Pigneur (2010). O BMC divide o modelo em 9 blocos em uma única página: Proposta de Valor, Segmentos de Clientes, Canais, Relacionamento, Fontes de Receita, Recursos Principais, Atividades-Chave, Parcerias Principais e Estrutura de Custos."
                  },
                  {
                      "title": "Canvas na Prática",
                      "content": "Nubank (Fintech): Valor sem tarifa, canais de app e indicação, estrutura 100% cloud.\niFood (Plataforma): 3 segmentos (consumidor, restaurante, entregador), gerando um complexo ecossistema."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "O bloco mais crítico é a Proposta de Valor: se não resolve um problema real, os outros blocos não o salvam.",
                      "Plataformas possuem Canvas complexos com múltiplos segmentos conectados."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Planejamento Estratégico",
              "description": "SWOT, 5 Forças de Porter e Objetivos",
              "subsections": [
                  {
                      "title": "Análise SWOT",
                      "content": "Analisa o ambiente interno (Forças e Fraquezas) e o externo (Oportunidades e Ameaças). O poder está nos cruzamentos: usar Forças para capturar Oportunidades."
                  },
                  {
                      "title": "As 5 Forças de Porter",
                      "content": "Entende a atratividade do setor analisando a Rivalidade, Ameaça de Entrantes, Ameaça de Substitutos, Poder de Fornecedores e Compradores."
                  },
                  {
                      "title": "Matriz BCG",
                      "content": "Gestão de portfólio em 4 quadrantes baseados em crescimento de mercado e participação: Estrelas (alto crescimento, manter), Vacas Leiteiras (geram caixa, ordenhar), Interrogações (investir ou abandonar) e Vira-latas (dogs, liquidar)."
                  },
                  {
                      "title": "Objetivos SMART",
                      "content": "Específicos, Mensuráveis, Atingíveis, Relevantes e Temporais."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "SWOT (dentro e fora) + Porter (setor) + BCG (produtos) + SMART (ação) compõem um diagnóstico estratégico.",
                      "Portfólios saudáveis usam o caixa de vacas leiteiras para sustentar estrelas."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Gestão de Processos e Cadeia de Valor",
              "description": "Como cada atividade cria ou destrói valor",
              "subsections": [
                  {
                      "title": "A Cadeia de Valor",
                      "content": "Modelo de Porter (1985) que divide as atividades em primárias (Logística, Operações, Vendas) e de suporte (Infraestrutura, RH, P&D). Ex: Amazon lidera pela logística primária."
                  },
                  {
                      "title": "Gestão à Vista",
                      "content": "Tornar o processo visível acelera detecção de desvios, cria alinhamento e transparência (ex: Kanban e Andon da Toyota). Onde há variação contínua mostrada visualmente, há Kaizen (melhoria contínua)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A estratégia define quais atividades da Cadeia de Valor fazer diferente.",
                      "Gestão à Vista transforma a operação inteira em controle tempo real."
                  ],
                  "insights": []
              }
          },
          {
              "title": "5: Tipos de Empresa e Regime Tributário",
              "description": "MEI, ME, LTDA, Simples e Presumido",
              "subsections": [
                  {
                      "title": "Tipos Jurídicos",
                      "content": "MEI (Microempreendedor Individual - até R$ 81k), ME/EPP (Microempresa - até R$ 4.8M), e LTDA / S.A. (para escalar com responsabilidade limitada e ações)."
                  },
                  {
                      "title": "Regimes Tributários",
                      "content": "Simples Nacional (unificado), Lucro Presumido (base presumida para margens altas) e Lucro Real (imposto sobre lucro efetivo para margens baixas)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A estrutura jurídica é um habilitador estratégico.",
                      "A escolha do regime afeta a margem final, o contador é essencial."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S5",
      "code": "M4-T1-S5",
      "title": "Demonstrações Contábeis",
      "description": "Fundamentos da Contabilidade, Balanço Patrimonial, DRE, Fluxo de Caixa e Patrimônio",
      "icon": "Calculator",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Fundamentos da Contabilidade",
              "description": "A linguagem universal dos negócios — o que ela é, por que existe e quem usa",
              "subsections": [
                  {
                      "title": "A Ciência Contábil e seus Objetivos",
                      "content": "A contabilidade é a linguagem universal dos negócios, uma ciência social aplicada que transforma transações complexas em informações compreensíveis. Seus 3 grandes objetivos são: 1. Registrar transações (matéria-prima para análise); 2. Classificar e resumir (separar custo de investimento para relatórios padronizados); 3. Avaliar o desempenho (permitir ajustes antes de crises)."
                  },
                  {
                      "title": "As 4 Finalidades",
                      "content": "Tomada de decisões (razão de existir), Prestação de contas (transparência), Controle financeiro (monitoramento e correção) e Análise de desempenho (medir progresso rumo a objetivos)."
                  },
                  {
                      "title": "Usuários e Especializações",
                      "content": "Usuários internos: Gerência, funcionários. Usuários externos: Investidores, credores, governo, fornecedores.\n\nContabilidade Financeira (foco externo, segue normas IFRS/CPC) vs Contabilidade de Gestão (foco interno, auxilia em decisões como preço e recursos).\n\nEspecializações incluem Tributária (impostos), Custos (precificação) e Auditoria (que fornece segurança para o sistema, ex: as Big 4)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Fraude contábil destrói a confiança de todos os usuários ao mesmo tempo.",
                      "60% das PMEs brasileiras fecham em 5 anos; má gestão financeira é a causa #1.",
                      "Cada usuário lê os números contábeis com uma lente diferente (controle vs retorno vs risco)."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Balanço Patrimonial",
              "description": "A fotografia financeira — o que a empresa tem, deve e quanto sobra",
              "subsections": [
                  {
                      "title": "A Equação Fundamental",
                      "content": "O Balanço responde o que a empresa tem, o que deve e o que sobra para os donos. A equação é: Ativo = Passivo + Patrimônio Líquido (PL)."
                  },
                  {
                      "title": "Ativo e Passivo",
                      "content": "Ativo (Lado Esquerdo - O que a empresa tem): Ativo Circulante (até 12 meses, ex: caixa, estoque) e Não Circulante (longo prazo, imóveis, intangíveis como marca e software).\n\nPassivo (Lado Direito - O que deve): Passivo Circulante (dívidas de até 12 meses) e Não Circulante (longo prazo)."
                  },
                  {
                      "title": "Patrimônio Líquido e Indicadores",
                      "content": "Patrimônio Líquido (O que sobra): PL = Ativo - Passivo. Inclui capital social e lucros retidos. PL negativo significa insolvência técnica, embora possa ser estratégico em startups de alto crescimento.\n\nIndicadores-Chave: Liquidez Corrente (Ativo Circulante / Passivo Circulante > 1), Endividamento (Passivo Total / Ativo Total < 70%) e ROE (Lucro Líquido / PL)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A equação Ativo = Passivo + PL deve sempre fechar.",
                      "Empresas digitais têm seu maior ativo como intangível.",
                      "Liquidez, endividamento e ROE são fundamentais para ler a fotografia financeira."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: DRE — Demonstração do Resultado",
              "description": "Da receita bruta ao lucro líquido — onde a empresa ganha e onde perde",
              "subsections": [
                  {
                      "title": "Estrutura da DRE",
                      "content": "A DRE é um filme do desempenho financeiro ao longo do período: 1. Receita Bruta; 2. (-) Deduções = Receita Líquida; 3. (-) CMV/CPV = Lucro Bruto; 4. (-) Despesas Operacionais = EBIT (Lucro Operacional); 5. (-) IR e CSLL = Lucro Líquido."
                  },
                  {
                      "title": "As Margens",
                      "content": "Margem Bruta (Lucro Bruto/Receita Líquida): mede eficiência de produção.\nMargem Operacional (EBIT/Receita Líquida): eficiência geral da operação.\nMargem Líquida (Lucro Líquido/Receita Líquida): o que sobra no bolso final. Cada linha é uma alavanca estratégica."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A DRE é um funil: receita entra no topo, despesas saem, e lucro fica embaixo.",
                      "Margem bruta alta com líquida baixa indica produção eficiente, mas operação inchada."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Fluxo de Caixa",
              "description": "O oxigênio do negócio — por que empresas lucrativas quebram",
              "subsections": [
                  {
                      "title": "Lucro vs Caixa",
                      "content": "A diferença é o regime: DRE é regime de competência (venda registrada na hora), Fluxo é caixa (só quando o dinheiro entra). Uma empresa lucrativa na DRE pode quebrar se os clientes pagarem a prazo e os boletos vencerem hoje."
                  },
                  {
                      "title": "Os 3 Tipos de Fluxo",
                      "content": "1. Operacional: as entradas e saídas do dia a dia. Se for negativo recorrente, o modelo tem problema.\n2. Investimento: aquisição/venda de ativos de longo prazo. Muitas vezes é negativo em fases de expansão.\n3. Financiamento: captação e pagamento de dívidas/emissão de ações.\n\nRunway: meses de sobrevivência sem nova receita. Abaixo de 6 meses é alerta de emergência."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Lucro não é caixa. A empresa quebra por asfixia de fluxo, não por DRE.",
                      "Runway é a principal métrica de fôlego."
                  ],
                  "insights": []
              }
          },
          {
              "title": "5: Patrimônio e Método das Partidas Dobradas",
              "description": "Bens, Direitos, Obrigações e PL — os 4 pilares",
              "subsections": [
                  {
                      "title": "Os Bens",
                      "content": "O que a empresa possui. Bens Tangíveis Móveis (veículos, estoques), Bens Tangíveis Imóveis (terrenos, construções) e Bens Intangíveis (marcas, softwares)."
                  },
                  {
                      "title": "Os Direitos",
                      "content": "O que a empresa tem a receber de terceiros (Ativos futuros): Contas a receber, investimentos, pagamentos antecipados e depósitos judiciais."
                  },
                  {
                      "title": "As Obrigações",
                      "content": "O que a empresa deve (Passivos presentes): Dívidas/empréstimos (bancos), Fornecedores, e Salários/Impostos. Dívidas trabalhistas/fiscais têm sempre prioridade e pesadas multas."
                  },
                  {
                      "title": "Patrimônio Líquido",
                      "content": "PL = (Bens + Direitos) - Obrigações. Formado por: Capital Social (aporte dos sócios), Reservas de Lucro e Resultado do Exercício."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A fórmula básica do patrimônio define quem é o verdadeiro dono do negócio.",
                      "Obrigações trabalhistas e fiscais nunca devem ser ignoradas ou adiadas."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S6",
      "code": "M4-T1-S6",
      "title": "Matemática Financeira",
      "description": "O valor do dinheiro no tempo, juros simples vs compostos, VPL, TIR e indicadores financeiros",
      "icon": "TrendingUp",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: O que é Matemática Financeira",
              "description": "O valor do dinheiro muda com o tempo — entenda isso antes de qualquer cálculo",
              "subsections": [
                  {
                      "title": "O Princípio Básico",
                      "content": "Matemática financeira parte da ideia de que R$ 100 hoje valem mais que R$ 100 daqui a um ano, porque hoje podem ser investidos. Trata da avaliação do valor do dinheiro no tempo, permitindo comparar fluxos de entradas e saídas em momentos diferentes, seja como Pessoa Física ou Pessoa Jurídica."
                  },
                  {
                      "title": "Taxas Proporcionais vs Equivalentes",
                      "content": "Taxas proporcionais (nominais): conversão linear multiplicando ou dividindo (ex: 2% a.m = 24% a.a). Funciona apenas em juros simples.\n\nTaxas equivalentes: conversão exponencial, pois os juros gerados incidem sobre juros. Padrão do mercado. (ex: Selic 10.5% a.a equivale a 0.837% a.m)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Matemática financeira é a ferramenta que compara valores em momentos diferentes.",
                      "Taxa proporcional: multiplicação linear. Taxa equivalente: fórmula (1+i)^n."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Juros Simples vs Juros Compostos",
              "description": "A diferença que muda tudo — por que Einstein chamou os juros compostos de 8ª maravilha",
              "subsections": [
                  {
                      "title": "Juros Simples",
                      "content": "Crescimento linear (J = C × i × t). Os juros incidem apenas sobre o capital inicial. Em 30 anos, R$ 10k a 10% a.a = R$ 40k. Previsível e constante."
                  },
                  {
                      "title": "Juros Compostos",
                      "content": "Crescimento exponencial (M = C × (1 + i)^t). Os juros incidem sobre juros anteriores. Em 30 anos, os mesmos R$ 10k a 10% a.a viram R$ 174k.\n\nA regra dos 72: divida 72 pela taxa anual para saber em quantos anos o dinheiro dobra."
                  },
                  {
                      "title": "Dinâmica Exponencial e Nomenclatura HP 12C",
                      "content": "Diferentemente do que ocorre nos juros simples, o sistema de juros compostos introduz uma dinâmica em que o tempo passa a atuar como um verdadeiro multiplicador do dinheiro. A cada período, os juros não são apenas calculados, mas também incorporados ao capital inicial, formando uma nova base sobre a qual incidem os juros seguintes.\n\nEsse efeito cumulativo explica por que valores aplicados ou dívidas contraídas sob esse regime tendem a crescer de forma cada vez mais acelerada ao longo do tempo. Quando essa lógica composta é aplicada aos descontos, surgem duas abordagens distintas: o desconto racional e o desconto comercial. Eles se diferenciam pelo montante escolhido como referência para o cálculo do desconto, ainda que ambos estejam submetidos ao mesmo princípio de capitalização ao longo do tempo.\n\nNo regime de juros compostos, faz-se necessário conhecer a nomenclatura utilizada na Calculadora HP 12C, como pode ser observado a seguir:\n- PV: Present value (valor presente).\n- FV: Future value (valor futuro).\n- PMT: Valor da prestação.\n- n: Prazo ou Período.\n- i: Taxa de juros."
                  },
                  {
                      "title": "Regime de Juros Compostos (Capitalização)",
                      "content": "Na capitalização por juro composto, ocorre o chamado juro sobre juro – os juros produzidos são acrescidos ao valor aplicado, fazendo com que, no período seguinte, também incidam juros sobre eles. Os juros compostos são os mais utilizados e aplicados em casos de financiamento de compras, aplicações financeiras, fundos de renda fixa, empréstimos bancários, entre outros. Assim, a taxa de juros define qual será o valor da remuneração paga pelo dinheiro recebido por empréstimo ou aplicado em um investimento (Castanheira; Macedo, 2008).\n\nSegundo Assaf Neto (2023, p. 33), no regime de juros compostos, os juros formados em cada período são acrescidos ao capital, formando o montante (capital acrescido o juro do período). 'Este montante, por sua vez, passará a render juros no período seguinte, formando um novo montante', constituído pelo valor acumulado na primeira capitalização acrescido dos juros da segunda capitalização, e assim sucessivamente. A capitalização composta pode ser caracterizada por uma função exponencial que cresce geometricamente. O regime composto é utilizado no sistema financeiro.\n\nA expressão matemática utilizada no regime composto é:\n$$\\text{FV} = \\text{PV} \\times (1 + i)^n$$\nOnde:\n- FV = Montante (valor futuro)\n- PV = Capital inicial (valor presente)\n- i = Taxa de juros\n- n = Período de aplicação"
                  },
                  {
                      "title": "Desconto Composto Racional ou Por Dentro",
                      "content": "O desconto composto racional, de acordo com Assaf Neto (2023), refere-se à diferença entre o valor nominal e o valor atual de um título, cujo pagamento foi antecipado. Nesse contexto, segundo Sobrinho (2018, p. 38), '[...] o desconto composto por dentro nada mais é do que um caso particular de juros compostos quando são conhecidos o montante, o prazo e a taxa de juros e se quer obter o capital inicial e o valor dos juros pagos'.\n\nA expressão matemática utilizada no desconto racional ou por dentro é:\n$$\\text{PV} = \\frac{\\text{FV}}{(1 + i)^n}$$\nOnde:\n- PV = Valor presente\n- FV = Valor futuro\n- i = Taxa de juros\n- n = Período de capitalização"
                  },
                  {
                      "title": "Desconto Composto Comercial ou Por Fora",
                      "content": "O desconto composto comercial ou 'por fora' é caracterizado pela incidência sucessiva da taxa de desconto sobre o valor nominal do título. Com isso, o desconto é deduzido em cada período (Assaf Neto, 2023).\n\nSegundo Sobrinho (2018, p. 36), '[...] o desconto composto é aquele em que a taxa de desconto incide sobre o montante (ou valor futuro), deduzido dos descontos acumulados até o período imediatamente anterior'. O desconto comercial composto, ou 'desconto por fora', é calculado sobre o valor nominal do título (Vereta, 2021).\n\nA expressão matemática utilizada no desconto comercial ou por fora é:\n$$\\text{PV} = \\text{FV} \\times (1 - i)^n$$\nOnde:\n- PV = Valor presente\n- FV = Valor futuro\n- i = Taxa de juros (taxa de desconto)\n- n = Período de capitalização"
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A diferença no longo prazo é entre riqueza e estagnação.",
                      "Regra dos 72: 72 ÷ taxa = anos para dobrar.",
                      "Juros compostos são padrão de mercado. Quem não entende, paga caro.",
                      "A calculadora HP 12C adota a nomenclatura padrão PV, FV, PMT, n, i.",
                      "O desconto racional composto desconta os juros acumulados do montante de forma equivalente aos juros compostos.",
                      "O desconto comercial composto reduz sucessivamente a taxa de desconto sobre o valor nominal do título."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Valor do Dinheiro no Tempo",
              "description": "VP, VF, VPL e TIR — as ferramentas de decisão de investimento",
              "subsections": [
                  {
                      "title": "VP e VF",
                      "content": "Valor Presente (VP): Quanto vale HOJE um valor futuro descontado pela taxa.\nValor Futuro (VF): Quanto vale NO FUTURO um valor de hoje acrescido de juros."
                  },
                  {
                      "title": "VPL e TIR",
                      "content": "VPL (Valor Presente Líquido): Soma de todos os fluxos futuros trazidos a valor presente menos o investimento. VPL > 0 = gera valor.\nTIR (Taxa Interna de Retorno): A taxa que faz o VPL = 0. Se TIR > custo de capital (WACC), o investimento gera valor."
                  },
                  {
                      "title": "Payback e VPL na Prática",
                      "content": "Payback é o tempo de retorno, mas ignora o que ocorre após o período de retorno. VPL é a ferramenta mais confiável quando a TIR e o VPL divergem para projetos excludentes."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "VPL > 0 = investimento gera valor acima do custo de capital. Regra de ouro.",
                      "TIR > WACC = retorno supera o custo do dinheiro."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Indicadores Financeiros",
              "description": "ROI, Liquidez e Endividamento — os 3 números que todo gestor precisa saber",
              "subsections": [
                  {
                      "title": "Os 3 Pilares",
                      "content": "ROI (Retorno sobre Investimento): (Ganho - Custo) / Custo × 100. Mede o retorno percentual.\nLiquidez Corrente: Ativo Circulante / Passivo Circulante. Mede se paga obrigações de curto prazo (> 1 é saudável).\nEndividamento: Passivo Total / Ativo Total × 100. Quanto do ativo é financiado por terceiros (> 70% é risco)."
                  },
                  {
                      "title": "Outros Essenciais",
                      "content": "EBITDA: Geração de caixa operacional puro. Giro do Ativo: Quantas vezes o ativo gera receita por ano. Ciclo Financeiro: Dias que a empresa se financia."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "ROI mede retorno, liquidez mede capacidade de pagar, endividamento mede dependência de terceiros.",
                      "Dívida que gera retorno acima dos juros é alavancagem; abaixo, é armadilha."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S7",
      "code": "M4-T1-S7",
      "title": "Economia de Empresa e Análise Mercadológica",
      "description": "Escassez, custo de oportunidade, conceito de valor, necessidade, desejo e demanda",
      "icon": "LineChart",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Fundamentos de Economia e Marketing",
              "description": "Escassez, custo de oportunidade e a evolução do marketing — de trocas a ecossistemas",
              "subsections": [
                  {
                      "title": "Escassez e Custo de Oportunidade",
                      "content": "A economia define escassez como a insuficiência de recursos para todos os desejos. Toda escolha implica um custo de oportunidade — o valor da melhor alternativa sacrificada. Quando se investe em marketing, diz-se 'não' a outra área."
                  },
                  {
                      "title": "A Evolução do Marketing",
                      "content": "Era da Produção (até 1930): Foco na eficiência, demanda superava oferta (ex: Ford Modelo T).\nEra do Marketing (1950-2000): Foco no cliente, oferta superava demanda, foco em 4Ps.\nEra Digital (2000+): Foco em ecossistema, algoritmos e dados (ex: Amazon)."
                  },
                  {
                      "title": "Definições Clássicas",
                      "content": "Raimar Richers: 'Busca e realização de trocas'.\nPeter Drucker: 'Tornar a venda supérflua. O produto se vende sozinho'.\nPhilip Kotler: 'Processo social de criação, oferta e livre negociação de valor'.\nO núcleo em comum é: organizar trocas sob escassez, reduzindo o custo de decisão."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Toda escolha tem custo de oportunidade.",
                      "Amazon: 35% das vendas vêm de recomendações; no digital, o produto é o marketing."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Valor — O Conceito Central do Marketing",
              "description": "Valor não está no produto — está na percepção do cliente",
              "subsections": [
                  {
                      "title": "Valor Percebido",
                      "content": "Valor não está no produto, está na mente do cliente. É a relação entre Benefício Percebido e Custo Percebido. O cérebro avalia: 'Isso vale o que me custa?'"
                  },
                  {
                      "title": "Os 4 Tipos de Valor Percebido",
                      "content": "1. Funcional: Resolve o problema? (Durabilidade, qualidade).\n2. Emocional: Como se sente ao usar? (Alegria, segurança).\n3. Social: O que diz sobre mim? (Status, tribo).\n4. Econômico: Custo-benefício justo? (Economia de tempo/dinheiro)."
                  },
                  {
                      "title": "Valor vs Preço na Prática",
                      "content": "Havaianas: mesma borracha de R$ 15 pode custar R$ 350 em parceria com D&G. O valor social justifica a margem.\nNubank: mesmo serviço de banco, mas o valor econômico, funcional e emocional gerou o maior NPS do mercado (87)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Valor = Benefício percebido ÷ Custo percebido. É percepção.",
                      "Os 4Ps gerenciam o valor: criar (produto), sinalizar (preço), comunicar (promoção), entregar (distribuição)."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Necessidade, Desejo e Demanda",
              "description": "A diferença que separa marketing eficiente de marketing desperdiçado",
              "subsections": [
                  {
                      "title": "Necessidade vs Desejo vs Demanda",
                      "content": "Necessidade: carência humana básica universal (Maslow: fome, segurança, estima).\nDesejo: forma cultural de satisfazer uma necessidade (ex: necessidade de cafeína, desejo de Starbucks).\nDemanda: desejo acompanhado de poder de compra (ex: Xiaomi transformou o desejo de premium em demanda acessível)."
                  },
                  {
                      "title": "A Estratégia de Marketing",
                      "content": "Marketing NÃO cria necessidades. Ele molda desejos e os converte em demanda viável. Confundir desejo com demanda leva a lançar produtos sem aderência financeira no mercado real."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Necessidade é inata, desejo é cultural, demanda exige dinheiro.",
                      "Confundir necessidade, desejo e demanda desperdiça o orçamento da empresa."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S8",
      "code": "M4-T1-S8",
      "title": "Liderança e Gestão de Equipes",
      "description": "Teorias de liderança, Inteligência Emocional, Tuckman, OKRs e Liderança em VUCA/BANI",
      "icon": "Users",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Liderança, Teorias e Inteligência Emocional",
              "description": "Liderança ≠ Gestão — as 5 teorias e por que IE importa mais que QI",
              "subsections": [
                  {
                      "title": "Liderança vs Gestão",
                      "content": "Gestão lida com complexidade (planejar, organizar). Liderança lida com mudança (visão, alinhamento, inspirar pessoas). Ambas são complementares e necessárias."
                  },
                  {
                      "title": "As 5 Teorias de Liderança",
                      "content": "1. Teoria dos Traços (nascem líderes); 2. Comportamental (foco nas ações); 3. Situacional (Hersey & Blanchard: o estilo certo para a maturidade do liderado); 4. Transformacional (inspirar mudança e propósito); 5. Servidora (o líder remove obstáculos para a equipe, ex: Nubank)."
                  },
                  {
                      "title": "Inteligência Emocional (IE)",
                      "content": "Goleman mostrou que a IE representa 67% das competências de um líder de alta performance (2x mais que QI). As 5 dimensões: Autoconhecimento, Autocontrole, Motivação, Empatia e Habilidade Social."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Liderança Situacional: usar o mesmo estilo para um júnior e um sênior é falha de liderança.",
                      "Inteligência Emocional (Goleman) importa mais que conhecimento técnico para o líder."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Formação de Equipes e Ferramentas de Gestão",
              "description": "Tuckman, Feedback SBI, Delegação e o custo de não delegar",
              "subsections": [
                  {
                      "title": "5 Fases de Tuckman",
                      "content": "Forming (cautela), Storming (conflitos essenciais), Norming (regras claras), Performing (alta performance e segurança psicológica) e Adjourning (dissolução e lições)."
                  },
                  {
                      "title": "Feedback SBI e Delegação",
                      "content": "Feedback estruturado SBI: Situação + Comportamento + Impacto. Remove a agressividade e interpretação pessoal.\nDelegação: gargalo do líder. Se alguém pode fazer 80% tão bem quanto o líder, deve ser delegado."
                  },
                  {
                      "title": "Composição Estratégica",
                      "content": "Equipes se dividem em Nível Estratégico (C-Level), Tático (Gerência), Operacional (Execução), Back Office e Equipe Estendida (Terceirizados)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "70% das equipes ficam presas na fase de Storming (conflitos); evitá-los impede o amadurecimento.",
                      "Se você não delega, a velocidade da empresa é a sua própria velocidade (Bottleneck)."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Conflitos, Motivação e Segurança Psicológica",
              "description": "Como transformar tensão em resultado e construir equipes que inovam",
              "subsections": [
                  {
                      "title": "Gestão de Conflitos",
                      "content": "A matriz Thomas-Kilmann mostra 5 abordagens: Competir, Colaborar, Comprometer, Evitar, Acomodar."
                  },
                  {
                      "title": "Motivação (Daniel Pink)",
                      "content": "Motivação intrínseca supera a extrínseca. Os 3 drivers são: Autonomia (decidir como fazer), Maestria (ficar cada vez melhor) e Propósito (algo que importa)."
                  },
                  {
                      "title": "Segurança Psicológica",
                      "content": "Projeto Aristóteles do Google (180 equipes) provou que segurança psicológica (poder errar sem retaliação interpessoal) é o fator #1 para a alta performance e inovação."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Equipes com baixa segurança psicológica não erram menos — elas apenas escondem os erros.",
                      "Reunião 1:1 frequente é a ferramenta mais importante e subutilizada da liderança."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Comunicação Estratégica na Liderança",
              "description": "CNV, Feedforward, Candura Radical e a matemática dos canais",
              "subsections": [
                  {
                      "title": "A Matemática dos Canais",
                      "content": "Uma equipe de 15 pessoas gera 105 canais de comunicação, causando ineficiência e exigindo rituais de simplificação por parte do líder."
                  },
                  {
                      "title": "CNV e Candura Radical",
                      "content": "CNV (Comunicação Não-Violenta): Observação, Sentimento, Necessidade, Pedido.\nCandura Radical (Kim Scott): Interseção entre o Cuidado Pessoal e o Desafio Direto. Sem ambos, vira empatia ruinosa ou agressividade."
                  },
                  {
                      "title": "Feedforward",
                      "content": "Enquanto o feedback avalia o passado, o feedforward olha para frente e desenvolve o futuro. Líder moderno usa ambos."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "CNV transforma críticas destrutivas em diálogos de resolução de problemas.",
                      "A persuasão executiva (Ethos, Pathos, Logos) converte dados abstratos em visões inspiradoras."
                  ],
                  "insights": []
              }
          },
          {
              "title": "5: Disfunções, OKRs e Desenvolvimento de Líderes",
              "description": "Lencioni, Nine Box, Jim Collins e como construir um pipeline de liderança",
              "subsections": [
                  {
                      "title": "As 5 Disfunções de Lencioni",
                      "content": "A base da falha de uma equipe é a Ausência de Confiança, que gera Medo do Conflito, Falta de Comprometimento, Evitação de Responsabilidades e Falta de Atenção aos Resultados."
                  },
                  {
                      "title": "OKRs (John Doerr)",
                      "content": "Objetivos inspiradores + Resultados-Chaves mensuráveis (KRs). OKRs bem calibrados têm taxa de atingimento ideal de 70%."
                  },
                  {
                      "title": "Jim Collins e o Nine Box",
                      "content": "Liderança Nível 5 (Feitas para Vencer): humildade extrema + vontade feroz. Nine Box é a matriz que mapeia o desempenho x potencial para planejar sucessões reais."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Sem vulnerabilidade do líder, a equipe não cria a confiança necessária para admitir e corrigir falhas.",
                      "Metas coletivas alinham egos e curam a disfunção de atenção individual."
                  ],
                  "insights": []
              }
          },
          {
              "title": "6: Liderança Digital, Contexto Lusófono e ESG",
              "description": "VUCA/BANI, equipes remotas, Hofstede, DE&I e liderança sustentável",
              "subsections": [
                  {
                      "title": "Ambientes VUCA/BANI",
                      "content": "Em cenários complexos, a liderança distribuída e ágil ganha da liderança autocrática. Em metodologias ágeis, o líder atua como Scrum Master/Facilitador."
                  },
                  {
                      "title": "Equipes Remotas",
                      "content": "Gestão por resultados substitui a gestão por presença. A 'Documentação Radical' (o que não está escrito, não existe) e a clareza de expectativas são primordiais."
                  },
                  {
                      "title": "Contexto Lusófono, Diversidade e ESG",
                      "content": "Brasil exige liderança cordial e humanizada, enquanto Portugal respeita forte hierarquia. Equipes diversas superam pares financeiramente quando a inclusão é ativa. O ESG determina que a cultura é reflexo do líder e da coerência de seu discurso."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Microgerenciar equipes remotas destrói produtividade e confiança. Delegue resultado, não o método.",
                      "A coerência ética entre discurso e prática é a única liderança duradoura."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S9",
      "code": "M4-T1-S9",
      "title": "Filosofia e Pensamento Crítico",
      "description": "Lógica, ética, vieses, epistemologia, filosofia política e IA",
      "icon": "BookOpen",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Pensamento Crítico e Lógica nos Negócios",
              "description": "Por que filosofia importa — falácias, vieses e como pensar com rigor",
              "subsections": [
                  {
                      "title": "A Importância do Pensamento Crítico",
                      "content": "Pensamento crítico é avaliar informações objetivamente, identificar vieses e construir conclusões fundamentadas. É a competência mais valorizada por CEOs globais (WEF 2023)."
                  },
                  {
                      "title": "Ferramentas e Falácias",
                      "content": "Análise de argumentos (separar premissa de conclusão), detecção de falácias (apelo à autoridade, falsa dicotomia, ad hominem) e o método socrático.\nFalácia de Autoridade: O CEO da empresa disse, logo funciona (ex: WeWork e Adam Neumann).\nCorrelação ≠ Causalidade: Associações não indicam causa (ex: branding cresceu, mas o mercado todo cresceu)."
                  },
                  {
                      "title": "Viés de Confirmação",
                      "content": "O viés mais perigoso: buscar apenas informações que confirmam o que já se acredita, ignorando evidências contrárias (ex: Kodak ignorando a câmera digital)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Pensamento crítico é a competência #1 do século XXI (WEF 2023).",
                      "Viés de confirmação custa bilhões; o antídoto é dados e humildade intelectual."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Ética Empresarial e Epistemologia",
              "description": "4 frameworks éticos + como separar conhecimento válido de achismo",
              "subsections": [
                  {
                      "title": "Os 4 Frameworks Éticos",
                      "content": "Utilitarismo (Bentham/Mill): o maior bem para o maior número. Consequências importam (ex: Ford Pinto, onde o cálculo falhou moralmente).\nDeontologia (Kant): o dever moral importa. A ação deve ser universal (ex: J&J no caso Tylenol).\nÉtica das Virtudes (Aristóteles): foca no caráter (ex: Patagonia doada para o clima).\nÉtica do Cuidado (Gilligan): relacionamentos e responsabilidade."
                  },
                  {
                      "title": "Epistemologia e Ciência",
                      "content": "Estuda como justificamos uma crença. Karl Popper: o conhecimento científico precisa ser falsificável. Se não se pode provar que é falso, é crença, não dado."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Não existe framework ético 'melhor'. Usar os 4 juntos cria robustez.",
                      "Se uma afirmação de negócio não tem como ser falsificada, é fé, não estratégia."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Filosofia Política, Ciência e Propósito",
              "description": "Smith, Marx, Rawls — e por que existencialismo importa para gestores",
              "subsections": [
                  {
                      "title": "Os Modelos Filosóficos",
                      "content": "Adam Smith (Mão Invisível): o mercado livre aloca recursos. O interesse próprio gera o bem coletivo (ex: Silicon Valley).\nKarl Marx (O Capital): desigualdade estrutural (mais-valia), exemplificado hoje no debate da Gig Economy (iFood/Uber).\nJohn Rawls (Justiça): o 'véu da ignorância' defende regras justas protegendo os mais vulneráveis (cotas e DE&I)."
                  },
                  {
                      "title": "Existencialismo e Propósito",
                      "content": "Sartre: liberdade e responsabilidade individual definem quem somos. Viktor Frankl: o significado gera engajamento. Empresas com propósito claro engajam 3x mais."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Smith, Marx e Rawls são as lentes pelas quais toda decisão política/econômica é debatida.",
                      "Sem propósito, a empresa é máquina de lucro sem alma (e atrai menos talento)."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Filosofia Oriental, Linguagem, Estética e Tecnologia",
              "description": "Zen e liderança, poder das palavras, beleza como diferencial e ética da IA",
              "subsections": [
                  {
                      "title": "Filosofia Oriental",
                      "content": "Taoísmo (não-ação, criar condições), Zen Budismo (mente de principiante, simplicidade), Sun Tzu (antecipação) e Wabi-Sabi (a estética da imperfeição aplicada aos MVPs)."
                  },
                  {
                      "title": "Linguagem e Estética",
                      "content": "Wittgenstein: 'os limites da linguagem são os limites do mundo'. A linguagem cria a realidade.\nEstética: beleza é diferencial competitivo (ex: Apple, Dieter Rams). O design importa."
                  },
                  {
                      "title": "Ética da IA e Tecnologia",
                      "content": "Heidegger: a tecnologia transforma tudo em recurso. A IA nunca é neutra; o viés algorítmico, a vigilância excessiva e a substituição exigem que o líder pergunte 'deve fazer?' em vez de 'pode fazer?'."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A linguagem renomeia a percepção da realidade.",
                      "A tecnologia não é neutra — quem programa a IA programa os valores reproduzidos."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S10",
      "code": "M4-T1-S10",
      "title": "Cálculo Aplicado a Negócios",
      "description": "Funções, derivadas, otimização, elasticidade, integrais e break-even",
      "icon": "Calculator",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Funções, Derivadas e Otimização",
              "description": "A matemática da mudança — como derivadas encontram o ponto ótimo de lucro",
              "subsections": [
                  {
                      "title": "A Matemática da Mudança",
                      "content": "Cálculo é a matemática da mudança, fundamental porque em negócios tudo muda (preço, demanda, custo). Funções descrevem a relação entre variáveis. (Ex: Lucro = Receita - Custo)."
                  },
                  {
                      "title": "Derivadas: Receita e Custo Marginal",
                      "content": "A derivada mede a taxa de variação. Quando a Receita Marginal (derivada da receita) é igual ao Custo Marginal (derivada do custo), encontramos o ponto ótimo.\nReceita Marginal > Custo Marginal = vale produzir mais.\nEm SaaS (ex: Netflix), o custo marginal é próximo a zero, tornando a escala puro lucro."
                  },
                  {
                      "title": "Elasticidade",
                      "content": "Mede a sensibilidade da demanda ao preço. Elástico (|E| > 1): sensível ao preço (ex: pizza). Inelástico (|E| < 1): insensível (ex: remédio). Unitário: equilíbrio proporcional."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Ponto ótimo de produção é onde Receita Marginal = Custo Marginal.",
                      "Elasticidade define a estratégia de precificação de um produto."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Investimentos e Valor do Dinheiro",
              "description": "Integrais, juros compostos, VPL e TIR — decidir onde colocar dinheiro",
              "subsections": [
                  {
                      "title": "Integrais e Acumulação",
                      "content": "Se a derivada mede a mudança, a integral mede o acumulado ao longo do tempo (área sob a curva). Juros compostos e VPL são exemplos práticos de integrais aplicadas em finanças."
                  },
                  {
                      "title": "VPL e TIR na Prática",
                      "content": "VPL soma os fluxos futuros trazidos a valor presente menos investimento. É a ferramenta mais segura (VPL > 0 = investir).\nTIR é a taxa que zera o VPL. Payback é o tempo de retorno (mas ignora fluxos futuros após o período de payback)."
                  },
                  {
                      "title": "A Força do Tempo",
                      "content": "Juros compostos representam crescimento exponencial. Warren Buffett fez 99% da sua fortuna após os 60 anos graças ao tempo + juros compostos."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Integrais acumulam, VPL decide e TIR compara.",
                      "Quando VPL e TIR divergirem em projetos excludentes, priorize o VPL."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Break-Even, Depreciação e Aplicações",
              "description": "Quando a empresa para de perder dinheiro — e o custo invisível dos ativos",
              "subsections": [
                  {
                      "title": "O Ponto de Equilíbrio (Break-Even)",
                      "content": "É o momento em que Receita Total = Custo Total. Fórmula: Custos Fixos ÷ (Preço - Custo Variável). A margem de contribuição (Preço - Custo Variável) paga os fixos e gera lucro.\nModelos de SaaS alavancam rápido porque o custo variável é muito baixo."
                  },
                  {
                      "title": "Depreciação e Amortização",
                      "content": "Depreciação é a perda de valor de ativos físicos; Amortização é de intangíveis. São custos invisíveis que reduzem o lucro contábil, embora não saia dinheiro imediato do caixa (daí a métrica EBITDA, que os exclui)."
                  },
                  {
                      "title": "Alavancagem Operacional",
                      "content": "Custos fixos altos significam alta alavancagem = maior risco, mas maior potencial de retorno quando o volume ultrapassa o Break-Even."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Break-even é a métrica essencial para evitar operar no prejuízo no escuro.",
                      "SaaS tem escala absurda após o break-even por causa de custos marginais mínimos."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S11",
      "code": "M4-T1-S11",
      "title": "Análise Estatística",
      "description": "Média, dispersão, teste A/B, data storytelling, regressão e machine learning.",
      "icon": "BarChart",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Fundamentos de Estatística",
              "description": "Média, dispersão e probabilidade — a base de toda decisão por dados",
              "subsections": [
                  {
                      "title": "Medidas de Tendência Central",
                      "content": "Média: soma ÷ quantidade (sensível a outliers). Mediana: valor central, imune a outliers (ideal para salários). Moda: valor mais frequente."
                  },
                  {
                      "title": "Medidas de Dispersão",
                      "content": "Desvio padrão: mede quanto os dados se afastam da média. Um desvio pequeno indica consistência e processos previsíveis."
                  },
                  {
                      "title": "Probabilidade e Distribuição Normal",
                      "content": "A Curva de Gauss (68-95-99.7%) mostra que 95% dos dados ficam a 2 desvios padrão da média. Acima de 3 desvios, o dado é uma anomalia estatística."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Mediana é mais honesta que média quando há outliers.",
                      "Se um resultado sai 3 desvios padrão do normal, não é rotina — é anomalia."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Regressão, Hipóteses e Teste A/B",
              "description": "Prever, testar e provar — a estatística que separa dado de achismo",
              "subsections": [
                  {
                      "title": "Regressão Linear",
                      "content": "Prevê o futuro com base no passado (reta de regressão). O R² mede o quanto a variação de Y é explicada por X (ex: 82% das vendas explicadas por ads)."
                  },
                  {
                      "title": "Teste de Hipóteses",
                      "content": "P-valor < 0.05 significa que o resultado é estatisticamente significativo (a diferença é real, não mero acaso). Não mede o tamanho do efeito, apenas a sua probabilidade de existir."
                  },
                  {
                      "title": "Teste A/B",
                      "content": "O padrão ouro para marketing e produto (ex: Booking.com roda 1000+ simultâneos). Opinião do executivo vs Teste A/B."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Regressão prevê, teste de hipótese prova, teste A/B compara.",
                      "Correlação não é causalidade. Para provar causa é preciso um Teste A/B."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: KPIs, Cohort e Data Storytelling",
              "description": "As métricas que importam e como transformar números em narrativa",
              "subsections": [
                  {
                      "title": "KPIs Essenciais",
                      "content": "LTV/CAC > 3 (Saúde de E-commerce/SaaS). NRR > 100% (SaaS crescendo sem clientes novos). OEE > 85% (Indústria de alto padrão)."
                  },
                  {
                      "title": "Análise de Cohort",
                      "content": "A métrica que separa amadores de profissionais: agrupa os clientes pelo mês/semana em que entraram, e acompanha como esse grupo específico se comporta ao longo do tempo. Revela problemas pontuais, ocultados pela média."
                  },
                  {
                      "title": "Data Storytelling",
                      "content": "Não basta um número; é preciso uma narrativa: Contexto, Dado chave, Visual (Gráficos), Insight (o significado real do dado) e Recomendação (ação)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Apresentar 30 gráficos sem dizer o que significam é inútil. O formato ideal: 1 Gráfico + 1 Insight + 1 Recomendação.",
                      "Cohort é a diferença entre notar '30% cancelaram' e notar que 'os de janeiro cancelaram 15%, os de março 25%'."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Análise Preditiva e Ferramentas",
              "description": "Machine learning para negócios e Excel como kit de sobrevivência",
              "subsections": [
                  {
                      "title": "Modelos de Machine Learning (ML)",
                      "content": "Regressão (prever número), Classificação (ex: Churn sim/não, como o Spotify faz), Clustering (segmentos/grupos sem rótulo) e Séries Temporais (sazonalidade)."
                  },
                  {
                      "title": "ML de Recomendação",
                      "content": "Personalização gera lucro: A Netflix economiza 1 bilhão por ano em retenção sugerindo conteúdos para os usuários. A Amazon gera 35% de vendas por recomendação."
                  },
                  {
                      "title": "O Excel (A ferramenta #1)",
                      "content": "Apesar da IA, o Excel/Sheets ainda é a base: PROCV (cruzamento), Tabela Dinâmica (resumo poderoso) e SOMASE (condicionais). Dominar isso resolve 80% das necessidades de uma PME."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "ML automatiza estatística: regressão para número, classificação para perfil.",
                      "PROCV, Tabela Dinâmica e funções Lógicas resolvem a maioria dos desafios de negócio."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S12",
      "code": "M4-T1-S12",
      "title": "Leitura e Escrita Acadêmica",
      "description": "Pirâmide de Minto, Modelo Toulmin, pesquisa e storytelling corporativo.",
      "icon": "PenTool",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Escrever com Clareza",
              "description": "Da clareza de pensamento à clareza de texto — como gestores comunicam para quem decide",
              "subsections": [
                  {
                      "title": "Os 3 Princípios",
                      "content": "Clareza (sem ambiguidade), Concisão (menos palavras) e Estrutura (lógica evidente)."
                  },
                  {
                      "title": "A Pirâmide de Minto",
                      "content": "A estrutura mais poderosa de comunicação executiva (criada na McKinsey). Inverte a lógica tradicional: a recomendação e conclusão vêm na primeira frase, não na última. O CEO lê a conclusão em 10 segundos e depois decide se lê as evidências."
                  },
                  {
                      "title": "Formatos Diretos",
                      "content": "Cada situação exige o seu veículo: Memo de 1 página (decisões rápidas), Executive Summary de 2 páginas, Deck de 10-15 slides, Email de 5 linhas."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A escrita executiva é sobre fazer o leitor entender e agir, não sobre mostrar conhecimento.",
                      "Se você não consegue escrever sua tese em uma frase, você ainda não sabe o que quer."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Argumentar com Rigor",
              "description": "Do Modelo Toulmin aos 10 erros que destroem credibilidade — como construir teses que convencem",
              "subsections": [
                  {
                      "title": "O Modelo Toulmin",
                      "content": "A anatomia de um argumento robusto tem 6 elementos: Tese (o que defendo), Dados (números), Justificativa (conexão lógica), Grau de Certeza, Contra-argumento e Suporte adicional."
                  },
                  {
                      "title": "Erros Comuns",
                      "content": "1. Falta de tese clara na primeira frase. 2. Linguagem vaga ('várias empresas'). 3. Citações sem análise. 4. Plágio acidental."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Um argumento sem dados é opinião; com dados e sem justificativa é só correlação.",
                      "Antecipar contra-argumentos fortalece a sua posição."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Ler e Pesquisar",
              "description": "Leitura crítica, métodos de pesquisa e revisão bibliográfica — as fundações do conhecimento",
              "subsections": [
                  {
                      "title": "Leitura Crítica (SQ3R)",
                      "content": "Ler criticamente é questionar premissas, não confirmar ideias prontas. SQ3R: Survey, Question, Read, Recite, Review."
                  },
                  {
                      "title": "Tipos de Pesquisa",
                      "content": "Exploratória (o que acontece? entrevistas); Descritiva (perfil/tamanho? surveys); Causal (X causa Y? teste A/B, experimento controlado)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Viés de confirmação é o inimigo da leitura crítica.",
                      "Pesquisa com método errado invalida o estudo inteiro."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Apresentar com Impacto",
              "description": "Storytelling com dados, design de slides e a estrutura que move pessoas à ação",
              "subsections": [
                  {
                      "title": "Estrutura Duarte",
                      "content": "A narrativa que gera ação alterna entre o 'O que é' (realidade com tensão) e 'O que poderia ser' (a visão e solução), terminando em um Call to Action claro."
                  },
                  {
                      "title": "Design de Slides",
                      "content": "Regra dos 3 segundos: se o leitor não entende em 3 segundos, refaça. Um slide = uma ideia = um visual. Destaque o número gigante, não o texto."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Os primeiros 30 segundos são decisivos: comece com impacto, nunca lendo o slide.",
                      "Qualquer elemento extra no slide divide a atenção da audiência e dilui sua fala."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S13",
      "code": "M4-T1-S13",
      "title": "Empreendedorismo e Inovação",
      "description": "Effectuation, MVP, Product-Market Fit, Unit Economics, Funil AARRR e Venture Capital.",
      "icon": "Rocket",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Empreender — O que É e Como Pensar",
              "description": "De Schumpeter à Effectuation — as duas lógicas que separam criadores de executores",
              "subsections": [
                  {
                      "title": "Destruição Criativa e Mitos",
                      "content": "Schumpeter: empreendedorismo é destruir o velho para criar o novo. Mitos a combater: 'nascem prontos', 'precisam de ideia genial', 'amam risco', 'precisam de muito dinheiro' (70% das startups do Vale começam com < $10k)."
                  },
                  {
                      "title": "Causation vs Effectuation",
                      "content": "Causation (Planejamento): Foco em prever o futuro em mercados maduros. Effectuation (Lógica Empreendedora): Foco em construir o futuro com o que se tem nas mãos em mercados incertos (ex: o surgimento do Airbnb)."
                  },
                  {
                      "title": "Pivot (Pivotar)",
                      "content": "Quando o aprendizado muda o rumo do produto sem mudar a missão. O Instagram nasceu do Burbn quando os fundadores notaram que só a função de fotos com filtros era usada."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A lógica Effectuation: o que posso criar agora com o que tenho?",
                      "Pivot não é fracasso, é aprendizado aplicado; mas quem muda a missão toda semana não pivotou, apenas perdeu o rumo."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Validar Antes de Construir",
              "description": "Lean Startup, MVP e Product-Market Fit — o método que evita construir algo que ninguém quer",
              "subsections": [
                  {
                      "title": "O Ciclo Build-Measure-Learn",
                      "content": "O maior risco é construir algo que ninguém quer (42% de mortalidade). A validação é uma mentalidade permanente, não uma fase. O ciclo começa no 'Learn': definir o que aprender primeiro."
                  },
                  {
                      "title": "MVP (Minimum Viable Product)",
                      "content": "Não é o produto final com menos funcionalidades; é o experimento mais barato possível para testar uma hipótese (ex: landing page do Buffer antes de codificar o app)."
                  },
                  {
                      "title": "Product-Market Fit (PMF)",
                      "content": "Escalar antes do PMF é queimar caixa à toa. PMF é visível através de crescimento orgânico e alta retenção (ex: o início do WhatsApp). Métrica de vaidade (downloads) engana; métrica acionável (retenção) diz a verdade."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "MVP é um experimento, não um produto simples.",
                      "Sem Product-Market Fit, a tração é artificial e dependente de mídia paga de alto custo."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Modelo de Negócio e Unit Economics",
              "description": "Business Model Canvas, CAC, LTV e o funil AARRR — se a unidade falha, a escala falha",
              "subsections": [
                  {
                      "title": "Business Model Canvas",
                      "content": "Substitui planos de negócio densos por 9 blocos interligados. Cada bloco (Segmento, Proposta de Valor, Canais, etc.) é uma hipótese que precisa ser validada com o cliente."
                  },
                  {
                      "title": "Unit Economics",
                      "content": "Análise de uma unidade de negócio. Se o LTV (Lifetime Value) dividido pelo CAC (Customer Acquisition Cost) for menor que 1, a empresa paga para trabalhar. Acima de 3 é sustentável."
                  },
                  {
                      "title": "O Funil AARRR",
                      "content": "Aquisição (como o cliente chega), Retenção (se ele volta — a mais importante), Recomendação (Referral — K > 1 indica crescimento viral, ex: Dropbox e Hotmail)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Se a retenção D30 for menor que 20%, pare tudo e arrume o produto antes de gastar com aquisição.",
                      "Escalar um modelo com Unit Economics negativo é escalar o prejuízo e acelerar a falência."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Financiamento, Pitch e Ecossistema",
              "description": "Do bootstrap ao VC — a fonte certa no estágio certo, e como apresentar para investidores",
              "subsections": [
                  {
                      "title": "Estágios de Capital",
                      "content": "Ideação: Bootstrap, FFF, Aceleradoras, Editais (finep). Validação/Tração: Anjo (smart money). Escala: VC (Seed, Séries A, B, C). A diluição por rodada ronda os 10% a 25%."
                  },
                  {
                      "title": "O Pitch de 12 Slides",
                      "content": "Estrutura Sequoia Capital. VCs olham centenas de decks; o pitch não vende a ideia, vende a equipe, o TAM/SOM e a evidência de tração real."
                  },
                  {
                      "title": "O Ecossistema",
                      "content": "Valide antes de captar. O investidor errado destrói a empresa. Tração honesta (como o Airbnb provou para a YCombinator com 10 mil usuários) sempre vence narrativas bonitas sem números."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Não existe cheque para ideia; existe cheque para tração e evidência.",
                      "Ter 10% de um negócio gigante vale muito mais do que 100% de uma ideia sem mercado."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S14",
      "code": "M4-T1-S14",
      "title": "Ambiente Macroeconômico",
      "description": "Indicadores econômicos, ciclos, mercado brasileiro e o sistema financeiro.",
      "icon": "Globe",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Os 5 Indicadores — Lendo o Ambiente",
              "description": "PIB, IPCA, Selic, câmbio e desemprego: o painel que nenhum gestor pode ignorar.",
              "subsections": [
                  {
                      "title": "Macroeconomia na Prática",
                      "content": "Você não controla a economia, mas precisa saber lê-la para proteger a empresa. Quando política monetária e fiscal conflitam (governo gastando muito e BC subindo juros), ocorre o pior cenário para os negócios."
                  },
                  {
                      "title": "Os 5 Indicadores Básicos",
                      "content": "PIB: Soma da produção (crescendo = expansão). IPCA: Inflação. Selic: Alta significa priorizar caixa, baixa estimula investimentos. Câmbio: Afeta importação e exportação. Desemprego: Baixo desemprego força aumento de salários."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Leia o painel dos 5 indicadores em conjunto, não isoladamente.",
                      "Selic alta = priorize caixa; Selic baixa = invista para expandir."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Ciclos Econômicos — Expandir e Proteger",
              "description": "A economia oscila em 4 fases. A estratégia certa no momento errado é a estratégia errada.",
              "subsections": [
                  {
                      "title": "As 4 Fases do Ciclo",
                      "content": "Expansão (investir com cautela de caixa). Pico (preparar caixa, não acreditar que a euforia será eterna). Contração (proteger caixa e reduzir custos). Vale (comprar o futuro barato, juros caem)."
                  },
                  {
                      "title": "Indicadores que Antecipam a Mudança",
                      "content": "A Curva de juros invertida (curtos maiores que longos) antecipa recessão em 12 a 18 meses com forte precisão. PMI abaixo de 50 aponta retração na indústria."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A estratégia certa na fase errada gera quebra.",
                      "Quem tem caixa na contração compra concorrentes fracos e talentos baratos."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Brasil — Estrutura, Desafios e Oportunidades",
              "description": "Da reforma tributária ao agronegócio: entender o Brasil é vantagem competitiva.",
              "subsections": [
                  {
                      "title": "Matriz Econômica e Desafios",
                      "content": "Serviços são 70% do PIB, indústria 22% e o agro apenas 8% (embora corresponda a 25% das exportações). Os desafios: carga tributária, infraestrutura, desigualdade extrema, spread bancário alto e forte burocracia."
                  },
                  {
                      "title": "A Reforma Tributária",
                      "content": "5 tributos viram 2 (CBS e IBS), formando o IVA e visando simplificar. Serviços tendem a pagar mais, enquanto a indústria tende a pagar menos pela eliminação da cobrança em cascata."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Vantagem comparativa do Brasil: Agro, energia limpa e biodiversidade.",
                      "Entender e se preparar para os impactos da Reforma Tributária (antes de 2026) é diferencial."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Trabalho e Dinheiro — O Sistema",
              "description": "Mercado de trabalho em transformação + sistema financeiro: o que todo gestor precisa dominar.",
              "subsections": [
                  {
                      "title": "Transformações no Trabalho",
                      "content": "Há escassez de talento (desemprego em tech ~1%). Upskilling interno é mais barato do que tentar contratar no mercado. O trabalho híbrido hoje retém 12% mais talentos e IA substitui tarefas, não necessariamente pessoas diretas."
                  },
                  {
                      "title": "Sistema Financeiro",
                      "content": "O BCB regula a Selic e opera o PIX. As regras básicas de caixa: mantenha reserva de emergência (3-6 meses em CDI) e nunca recorra ao cheque especial (>300%/ano)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "O crédito mais caro do mundo é o cheque especial — evite-o a todo custo.",
                      "Equipes diversas (gênero/etnia) têm rentabilidade historicamente maior."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S15",
      "code": "M4-T1-S15",
      "title": "Análise Financeira",
      "description": "Análise vertical/horizontal, valuation, capital de giro e diagnóstico integrado.",
      "icon": "TrendingUp",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Análise Vertical e Horizontal",
              "description": "Lendo as entrelinhas: o que os números escondem sobre a saúde da operação",
              "subsections": [
                  {
                      "title": "Análise Vertical",
                      "content": "A estrutura do negócio: compara cada item (ex: Custos) como percentual da Receita Líquida no mesmo período. Revela ineficiências em proporção."
                  },
                  {
                      "title": "Análise Horizontal",
                      "content": "A tendência no tempo: compara o crescimento da receita com o crescimento dos custos. A estrutura está inchando ou ganhando eficiência?"
                  },
                  {
                      "title": "Índices Fundamentais",
                      "content": "Ciclo Operacional (compra a recebimento), Ciclo Financeiro (quando financiamos a operação), Giro do Ativo e Margem de Contribuição."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Vertical expõe onde o problema está na estrutura; Horizontal expõe quando começou.",
                      "O Ciclo Financeiro negativo é o cenário ideal de autofinanciamento."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Valuation — Quanto Vale Sua Empresa?",
              "description": "DCF, múltiplos e valor patrimonial: três lentes para o valor justo",
              "subsections": [
                  {
                      "title": "DCF (Fluxo de Caixa Descontado)",
                      "content": "Projeta fluxos de caixa futuros e os traz a valor presente usando uma taxa (WACC). Extremamente sensível a premissas de crescimento."
                  },
                  {
                      "title": "Múltiplos de Mercado",
                      "content": "Compara a empresa a outras semelhantes (EV/EBITDA, P/L). Em Varejo, costuma girar entre 6x e 10x EBITDA. Muito usado para transações rápidas."
                  },
                  {
                      "title": "A Triangulação",
                      "content": "Valuation é narrativa apoiada em números. Para definir o valor justo, triangule o DCF (o futuro projetado) com os Múltiplos (o mercado) e o Patrimonial (o piso material)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Valuation não é ciência exata: o valor certo é o que comprador e vendedor concordam.",
                      "Múltiplos do Vale do Silício não se aplicam a PMEs no Brasil por conta da alta Selic e Risco País."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Capital de Giro — O Motor da Operação",
              "description": "60% das falências não são por falta de vendas, mas por falta de caixa no ciclo.",
              "subsections": [
                  {
                      "title": "O que é Capital de Giro Líquido",
                      "content": "Ativo Circulante menos Passivo Circulante. Positivo: folga para operar. Negativo: dependência imediata de terceiros (risco)."
                  },
                  {
                      "title": "Os Componentes do Ciclo",
                      "content": "1. Estoque (dinheiro parado). 2. Contas a Receber (prazo ao cliente). 3. Contas a Pagar (financiamento com o fornecedor). 4. Caixa (segurança vital)."
                  },
                  {
                      "title": "Alavancas de Otimização",
                      "content": "A primeira ação de gestão de caixa é negociar o alongamento com fornecedores (30→60→90 dias) — é financiamento grátis sem juros."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A empresa pode ser lucrativa, vender muito, e quebrar no mês seguinte se o dinheiro não girar rápido.",
                      "O Cheque Especial, sendo o crédito mais caro, é o maior sintoma de um ciclo operacional quebrado."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Diagnóstico Integrado",
              "description": "Análise V/H, valuation, capital de giro e precificação: as quatro lentes unidas.",
              "subsections": [
                  {
                      "title": "A Visão Holística",
                      "content": "Estes pilares não andam sozinhos. Analisar só a receita e ignorar o endividamento gerado pela operação é criar uma bomba-relógio interna."
                  },
                  {
                      "title": "As 4 Perguntas de Ouro",
                      "content": "1. A estrutura está saudável? (V) 2. A tendência melhora? (H) 3. O dinheiro circula bem? (Giro) 4. O preço cobre tudo com lucro? (Precificação)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Fatura mas falta caixa? Olhe o capital de giro. Vende mas não lucra? Olhe a estrutura vertical.",
                      "O diagnóstico integrado transforma números mortos em direções acionáveis para o CEO."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S16",
      "code": "M4-T1-S16",
      "title": "Ética Empresarial",
      "description": "Frameworks filosóficos, dilemas da IA, ESG, governança e o teste do jornal.",
      "icon": "Scale",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Os 4 Frameworks — A Bússola",
              "description": "Quando a lei não dá resposta, a filosofia entra em cena para iluminar a decisão",
              "subsections": [
                  {
                      "title": "O que são",
                      "content": "Utilitarismo (maior bem coletivo), Deontologia (regras universais), Ética das Virtudes (caráter do agente) e Contratualismo (equidade, regra de Rawls)."
                  },
                  {
                      "title": "Como Aplicar",
                      "content": "Aja usando os 4 filtros. Se todos convergem, a decisão é certa. Se divergem, o dilema exige deliberação. O pior erro é usar um só."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Compliance é o mínimo exigido pela lei; a Ética atua na zona cinzenta onde a lei termina.",
                      "O Teste do Jornal: 'Ficaria confortável se isso saísse na capa do jornal amanhã?'"
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Dilemas do Século XXI",
              "description": "A tecnologia criou dilemas éticos sem precedentes. Como navegar sem mapa?",
              "subsections": [
                  {
                      "title": "IA e Algoritmos",
                      "content": "Vieses em algoritmos de recrutamento ou crédito que reproduzem discriminação histórica (quem responde quando a IA erra?)."
                  },
                  {
                      "title": "Dados e Privacidade",
                      "content": "A LGPD pune com multas de até 2% do faturamento (limitado a R$ 50M). O consentimento é obrigatório e Dark Patterns manipulam usuários."
                  },
                  {
                      "title": "Trabalho e Greenwashing",
                      "content": "A gig economy precariza relações; e o greenwashing (marketing verde falso) compra certificações mas gera risco reputacional futuro."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Os dilemas atuais derivam de forte assimetria de poder entre empresa e usuário/trabalhador.",
                      "Empresas pagaram bilhões em multas recentes nos EUA por viés em recrutamento via IA."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: O Método das Decisões",
              "description": "Ética sem método é intenção. Com método, é prática replicável.",
              "subsections": [
                  {
                      "title": "Mapear",
                      "content": "Passo 1: Quem são as partes afetadas? (Incluindo os invisíveis). Passo 2: Aplique os 4 frameworks de filtragem filosófica."
                  },
                  {
                      "title": "Trade-offs",
                      "content": "Passo 3: Toda decisão exige sacrifício; mapeie ganhos, perdas e quem paga o ônus."
                  },
                  {
                      "title": "O Teste do Jornal",
                      "content": "Passo 4: Documente seu raciocínio ético para blindar a escolha. Decisões baseadas em registros claros resistem a pressões."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Bons gestores erram quando pressionados. O método 4-passos atua como escudo sob pressão.",
                      "Cultura é aquilo que se tolera. Uma irregularidade ignorada comunica aprovação."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: ESG e Governança",
              "description": "Ética que Aparece no Balanço: o ESG virou critério financeiro e de talento",
              "subsections": [
                  {
                      "title": "O Padrão ESG",
                      "content": "Ambiental (gestão de resíduos, pegada), Social (diversidade em toda a cadeia de fornecedores) e Governança (conselho independente, combate à corrupção)."
                  },
                  {
                      "title": "Governança e Compliance",
                      "content": "A raiz de 80% dos escândalos não é malícia individual, mas falha grave em Governança. Compliance robusto atrai crédito mais barato e fundos institucionais."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Empresas com alto rating ESG financiam-se a custos 1,5% a 2% menores. Ética gera ROI.",
                      "Investidores exigem integridade não por caridade, mas como gestão preditiva de riscos."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S17",
      "code": "M4-T1-S17",
      "title": "Empreendedorismo Social",
      "description": "Modelos de impacto, Teoria da Mudança, SROI e financiamento.",
      "icon": "Heart",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Os 3 Modelos de Impacto Social",
              "description": "Negócio Social, Empresa B e ONG: caminhos para resolver problemas com sustentabilidade",
              "subsections": [
                  {
                      "title": "Os Modelos",
                      "content": "Negócio Social (Yunus: lucra e reinveste tudo), Empresa B (lucra e distribui, mas equilibra impacto), ONG (impacto puro dependente de doações) e Organização Híbrida."
                  },
                  {
                      "title": "O Dilema",
                      "content": "Não é filantropia com CNPJ. A grande questão é como construir um modelo financeiro que sustente o bem desejado por décadas, de forma escalável."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Empresa que doa 1% do lucro não é negócio social. O impacto deve estar no modelo de negócio.",
                      "O Grameen Bank provou que os mais pobres não representam risco de inadimplência quando há modelo e confiança adequados."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Teoria da Mudança",
              "description": "Da ideia ao impacto real: como medir e provar que você fez a diferença",
              "subsections": [
                  {
                      "title": "Os 5 Níveis de Mudança",
                      "content": "Inputs (o que investe), Atividades (o que faz), Outputs (o que entrega - ex: formou 100 alunos), Outcomes (a mudança na vida - ex: 70 empregados com renda maior) e Impacto (mudança sistêmica de longo prazo)."
                  },
                  {
                      "title": "A Armadilha do Output",
                      "content": "Confundir Output com Outcome. Doadores financiam cada vez mais a mudança (Outcomes). Sem medir, não há como provar o impacto."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Mensuração de impacto é o equivalente ao DRE para negócios tradicionais.",
                      "Deadweight: meça apenas a transformação que não teria acontecido se o projeto não existisse."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: SROI e Métricas",
              "description": "Quanto vale o impacto gerado? Retorno Social sobre Investimento",
              "subsections": [
                  {
                      "title": "SROI",
                      "content": "Para cada R$ 1 investido, quanto volta em valor social? Se SROI > 1, gera valor. Exemplo prático da Gerando Falcões, que tem um SROI de 6:1."
                  },
                  {
                      "title": "Frameworks Globais",
                      "content": "O uso do catálogo IRIS+ (GIIN) e o alinhamento com os ODS da ONU padronizam o diálogo de impacto e atraem fundos globais exigentes."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Evite Cherry-picking: apresentar apenas os números que deram certo afasta financiadores sérios.",
                      "Capital de impacto exige SROI auditado e alinhado a frameworks globais como ODS."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: Escalando o Impacto",
              "description": "Financiamento e Dilemas Reais: como crescer sem distorcer a missão",
              "subsections": [
                  {
                      "title": "Caminhos de Financiamento",
                      "content": "Doações (limitadas), Investimento de Impacto (exige escala e métrica), Modelos Híbridos (onde empresas pagam pela formação do público final) e Receita de Mercado (subsídio cruzado)."
                  },
                  {
                      "title": "Protegendo a Missão",
                      "content": "A governança deve proteger o propósito antes do aceite do capital. O dilema 'Escala vs. Missão' é falso caso a empresa consiga modelar uma estrutura em que um terceiro pague pela vulnerabilidade do usuário final."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Subsídio cruzado (cobrar mais de quem pode pagar para subsidiar os mais vulneráveis) é a principal engrenagem escalável hoje.",
                      "Antes de captar investimento, documente os limites éticos e os inegociáveis do negócio."
                  ],
                  "insights": []
              }
          }
      ]
  },
  {
      "id": "M4-T1-S18",
      "code": "M4-T1-S18",
      "title": "Pesquisa Aplicada a Negócios",
      "description": "Quanti vs Quali, desenho de pesquisa, 4 níveis de análise e LTV/CAC/Churn.",
      "icon": "Search",
      "videoUrls": [],
      "chapters": [
          {
              "title": "1: Quanti vs Quali",
              "description": "Escolha o Método Certo para Cada Pergunta. Quanti diz O QUE; Quali diz POR QUÊ.",
              "subsections": [
                  {
                      "title": "Os 4 Métodos",
                      "content": "Quantitativa (números e escala), Qualitativa (motivações profundas), Misto (quali para hipótese, quanti para validação) e Experimental (A/B Test para comportamento real)."
                  },
                  {
                      "title": "A Armadilha da Intenção",
                      "content": "Confundir intenção com comportamento é o erro mais caro. As pessoas dizem que fariam X, mas na prática escolhem Y. Teste real sempre ganha de focus group."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "A sequência ideal: Quali (entender) → Quanti (dimensionar) → Experimental (testar solução).",
                      "Amostra certa importa muito mais que o tamanho da amostra."
                  ],
                  "insights": []
              }
          },
          {
              "title": "2: Desenhando Pesquisa de Qualidade",
              "description": "Como não enviesar a pesquisa para ouvir apenas o que você quer ouvir.",
              "subsections": [
                  {
                      "title": "O Processo de 5 Etapas",
                      "content": "1. Pergunta clara. 2. Hipóteses explícitas testáveis. 3. Amostra rigorosa. 4. Instrumento neutro. 5. Ação (pesquisa que não gera decisão é apenas custo)."
                  },
                  {
                      "title": "Viés de Confirmação",
                      "content": "Formular hipóteses antes evita que você molde as perguntas para confirmar o que já acreditava (ex: focar no preço quando o problema era horário)."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Sempre inclua os 'detratores' e quem nunca comprou. Fãs não revelam o gargalo.",
                      "Escreva a hipótese antes de escrever as perguntas do formulário."
                  ],
                  "insights": []
              }
          },
          {
              "title": "3: Os 4 Níveis de Análise de Dados",
              "description": "A maioria fica no nível 1 (descritivo) e acha que usa dados para decisão.",
              "subsections": [
                  {
                      "title": "Os 4 Níveis",
                      "content": "1. Descritivo (o que aconteceu?). 2. Diagnóstico (por que aconteceu?). 3. Preditivo (o que vai acontecer?). 4. Prescritivo (o que devemos fazer?)."
                  },
                  {
                      "title": "Não Pule Degraus",
                      "content": "Você não implementa IA Prescritiva se sua base de dados Descritiva está suja. A passagem do Nível 1 para o 2 (Diagnóstico) tem o maior ROI imediato."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "Para cada dashboard, pergunte: qual decisão este dado habilita?",
                      "Preditivo treinado em dado ruim (Lixo Entra, Lixo Sai) gera predições piores que a intuição humana."
                  ],
                  "insights": []
              }
          },
          {
              "title": "4: LTV, CAC e Churn",
              "description": "As 3 métricas que definem se o crescimento da sua empresa é real ou suicida.",
              "subsections": [
                  {
                      "title": "O Tripé",
                      "content": "LTV (valor gerado ao longo da vida do cliente). CAC (custo para trazer o cliente). Churn (taxa de cancelamento que esvazia a base)."
                  },
                  {
                      "title": "A Regra de Ouro",
                      "content": "LTV > 3x CAC. Crescer com um LTV/CAC < 1 significa pagar para trabalhar; quanto mais a empresa cresce, mais rápido ela vai à falência."
                  }
              ],
              "synthesis": {
                  "title": "Síntese",
                  "bullets": [
                      "O Churn é o inimigo silencioso: reduzir o churn em 2% pode dobrar seu LTV.",
                      "Antes de pisar no acelerador da aquisição, tape os buracos da retenção."
                  ],
                  "insights": []
              }
          }
      ]
  }
  , SIG_PESSOAS
];