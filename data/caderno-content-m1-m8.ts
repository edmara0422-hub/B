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
            "title": "Definição",
            "content": "• Rede complexa e especializada de células distribuída por todo o organismo\n• Coordena todas as funções vitais e comportamentais\n• Capta informações, processa dados, integra sinais e gera respostas para sobrevivência",
            "deepDive": ""
          },
          {
            "title": "Funções Fundamentais",
            "content": "• Captar estímulos sensoriais do ambiente externo e meio interno\n• Processar e integrar informações em múltiplos níveis de complexidade\n• Coordenar respostas motoras voluntárias e involuntárias\n• Regular funções viscerais e autonômicas essenciais à homeostase\n• Permitir processos cognitivos: memória, linguagem e consciência",
            "deepDive": ""
          },
          {
            "title": "SNC e SNP",
            "content": "• SNC: encéfalo (cérebro, cerebelo, tronco) + medula espinhal\n• Protegido por crânio, coluna, meninges, LCR e barreira hematoencefálica\n• SNP: nervos cranianos e espinhais → somático (voluntário) + autônomo (simpático/parassimpático)",
            "deepDive": "Sistema Nervoso = SNC + SNP — sistema integrado de detecção, processamento e resposta."
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
        "title": "O Que é Respiração?",
        "subsections": [
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
          }
        ]
      },
      {
        "title": "Além da Respiração: 5 Funções Extras",
        "subsections": [
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
      "id": "M4-T1-S2",
      "code": "M4-T1-S2",
      "title": "Pensamento Criativo",
      "videoUrls": [],
      "chapters": [
          {
              "title": "O que é Pensamento Criativo",
              "description": "Da neurociência ao modelo de Guilford — criatividade como competência treinável",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Pensamento criativo é a capacidade cognitiva de gerar ideias, soluções ou conexões que são simultaneamente {originais e úteis}. Diferente do senso comum, criatividade não é um dom exclusivo de artistas — é uma competência treinável, mensurável e essencial para a sobrevivência empresarial.\n\nPesquisas com fMRI (ressonância magnética funcional) revelam que a criatividade não reside em um hemisfério específico. O neurocientista Rex Jung (Universidade do Novo México) demonstrou que o processo criativo envolve três redes cerebrais simultâneas que trabalham em colaboração.\n\n3 REDES CEREBRAIS DA CRIATIVIDADE (REX JUNG, 2013)\n\n💭\n\nDMN — Default Mode\n\nAtiva durante devaneios e associações livres. É a rede da imaginação — gera conexões inesperadas quando a mente vagueia.\n\n📋\n\nECN — Executive Control\n\nAvalia, refina e seleciona ideias. É o editor interno que filtra o que a DMN produz.\n\n⚡\n\nSN — Salience Network\n\nAlterna entre DMN e ECN. Detecta quando uma ideia merece atenção — é o detector de eureka.\n\nO insight criativo (momento \"eureka\") ocorre quando a Salience Network detecta uma conexão inesperada gerada pela DMN e a passa para validação pela ECN. Isso explica por que muitas ideias brilhantes surgem no chuveiro ou durante caminhadas — momentos em que a DMN opera livremente.\n\nO QUE DEFINE UMA PESSOA CRIATIVA\n\n🔍\n\nCuriosidade\n\nInteresse genuíno por como as coisas funcionam e por que são como são.\n\n🔄\n\nÂngulo inusitado\n\nCapacidade de ver as coisas de forma que outros não veem.\n\n💪\n\nPerseverança\n\nNão desistir na primeira dificuldade. O processo criativo é lento e trabalhoso.\n\n🤝\n\nHumildade\n\nPerceber os próprios limites e pedir ajuda. Criatividade raramente é solo.\n\nOS 4 PS DA CRIATIVIDADE (MEL RHODES, 1961)\n\n🧠\n\nPerson\n\nTraços cognitivos e de personalidade: abertura a experiências, tolerância à ambiguidade.\n\n<truncated 45218 bytes>\n\ntação de alto nível. Qualquer pessoa entende. Subconjunto reduzido de símbolos. Foco no happy path. Ideal para manuais e apresentações a executivos.\n\n2\n\nAnalítico\n\nAnálise de desempenho e melhoria. Trata todas as exceções e regras complexas. Permite simulações de carga e tempo. Ferramentas como Bizagi atribuem custos a cada tarefa.\n\n3\n\nTécnico/Executável\n\nAutomação total. Detalhes técnicos para interpretação por BPMS: scripts, formulários, conectores de banco. Fidelidade à semântica BPMN 2.0 é inegociável.\n\nA transição para a visão de processos ponta a ponta é um dos pilares do BPM moderno. Diferente da gestão funcional clássica, o foco no processo permite que a organização visualize como o valor é criado para o cliente final, atravessando fronteiras departamentais e eliminando silos que geram ineficiência.\n\nBPMN é o tradutor universal entre negócio e TI. Os 4 gateways (XOR, AND, OR, Evento) controlam fluxo. Swimlanes definem responsabilidades. E os 3 níveis de maturidade (descritivo → analítico → executável) guiam a evolução da modelagem.\n\nToken: instância ativa que percorre o diagrama. Gateways criam, dividem e fundem tokens.\n\nGateway Paralelo (AND): só prossegue quando TODOS os caminhos terminam — sincronização obrigatória.\n\n3 níveis: descritivo (todos entendem), analítico (simulações), executável (automação em BPMS)."
                  }
              ]
          },
          {
              "title": "Certificações, Selos e Indicadores Globais",
              "description": "B Corps, Instituto Ethos, Great Place to Work, Fair Trade e mais — como medir e provar sustentabilidade",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Sustentabilidade sem certificação é promessa. Selos e indicadores globais padronizam a avaliação e permitem que empresas brasileiras sejam comparadas a organizações internacionais — ganhando visibilidade no cenário global.\n\nCERTIFICAÇÕES DE EMPRESA\n\nB Corps (Empresas B)\n\nPropósito + Lucro\n\nCertificadas pela B Lab — c\n\n<truncated 253431 bytes>\n\nNOTE: The output was truncated because it was too long. Use a more targeted query or a smaller range to get the information you need."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-T1-S6",
      "code": "M4-T1-S6",
      "title": "Matematica Financeira",
      "videoUrls": [],
      "chapters": [
          {
              "title": "O que é Matemática Financeira",
              "description": "O valor do dinheiro muda com o tempo — entenda isso antes de qualquer cálculo",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Matemática financeira parece difícil, mas parte de uma ideia simples: R$ 100 hoje valem mais que R$ 100 daqui a um ano. Por quê? Porque hoje você pode investir esse dinheiro — e no futuro terá mais. Essa lógica governa tudo: juros, empréstimos, investimentos e dívidas.\n\nPara Assaf Neto (2023), a matemática financeira \"trata, em essência, da avaliação do valor do dinheiro no tempo através da aplicação de técnicas e conceitos de matemática. O objetivo é efetuar comparações e análises dos vários fluxos de entradas e saídas de dinheiro verificados em diferentes momentos.\" Em outras palavras: é a ferramenta que te ajuda a comparar dinheiro de hoje com dinheiro do futuro — e a tomar decisões melhores com isso.\n\nPessoa Física\n\nIndivíduo com CPF\n\nÉ qualquer pessoa com certidão de nascimento e Cadastro de Pessoa Física (CPF). Quando você faz um financiamento, investe em um CDB ou paga o rotativo do cartão, está operando como pessoa física.\n\n▸ Exemplo cotidiano · 2024\n\nMaria investe R$ 1.000 por mês no Tesouro Direto. Para saber quanto terá em 5 anos, ela usa matemática financeira. Sem essa ferramenta, seria puro chute.\n\nPessoa Jurídica\n\nEmpresa com CNPJ\n\nÉ qualquer entidade que opera com um Cadastro Nacional de Pessoa Jurídica (CNPJ) — MEI, sociedade limitada, S.A. Todas usam matemática financeira para decidir preços, financiamentos, investimentos e análise de projetos.\n\n▸ Padaria do João · 2024\n\nJoão avalia comprar um forno a prazo (24 × R$ 800) ou à vista (R$ 15.000). Para saber qual sai mais barato, precisa calcular o custo real dos juros. Sem matemática financeira, pode escolher o pior caminho sem perceber.\n\nTAXA DE JUROS — O \"PREÇO DO DINHEIRO\"\n\nA taxa de juros indica o percentual aplicado sobre um valor inicial (o capital) durante um período, resultando em um valor futuro. Para Ferreira (2025), é o \"\n\n<truncated 7625 bytes>\n\nas de curto prazo. Acima de 1 = saudável. Abaixo de 1 = alerta.\n\n▸ Varejo brasileiro · 2023\n\nLiquidez média do varejo BR: 1.2. Magazine Luiza em crise (2022): liquidez caiu para 0.95 — cada R$ 1 de dívida tinha apenas R$ 0,95 em caixa. Reestruturou e voltou a 1.1.\n\nEndividamento\n\nQuanto é de terceiros\n\nFórmula: Passivo Total / Ativo Total × 100. Quanto do ativo é financiado por dívida de terceiros. Acima de 70% = risco elevado. Acima de 90% = zona de perigo.\n\n▸ Americanas · 2023\n\nEndividamento real (após fraude descoberta): acima de 100% — devia mais do que tinha. Passivo de R$ 42 bilhões contra ativo de R$ 22 bilhões. Insolvência técnica.\n\nOUTROS INDICADORES ESSENCIAIS\n\n📊\n\nEBITDA\n\nLucro antes de juros, impostos, depreciação e amortização. Mede geração de caixa operacional. Usado em valuation.\n\nOperacional\n\npuro\n\n🔄\n\nGiro do Ativo\n\nReceita / Ativo Total. Quantas vezes o ativo \"gira\" em receita por ano. Mede eficiência no uso dos recursos.\n\n💰\n\nMargem EBITDA\n\nEBITDA / Receita. Rentabilidade operacional sem distorções contábeis. Ambev: ~35%. Varejo: ~8%.\n\n> 15%\n\nbom\n\n⏱️\n\nCiclo Financeiro\n\nPrazo médio estoque + prazo recebimento - prazo pagamento. Quantos dias a empresa financia a operação com capital próprio.\n\nROI mede retorno. Liquidez mede capacidade de pagar. Endividamento mede dependência de terceiros. Os 3 juntos dão o diagnóstico financeiro mínimo de qualquer empresa.\n\nROI não considera tempo. Compare ROI sempre no mesmo horizonte.\n\nLiquidez muito alta (> 3.0) = dinheiro parado. Ótimo: 1.2 a 2.0.\n\nDívida que gera retorno acima dos juros é alavancagem. Abaixo, é armadilha."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-T1-S7",
      "code": "M4-T1-S7",
      "title": "Economia de Empresa e Analise Mercadologica",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Fundamentos de Economia e Marketing",
              "description": "Escassez, custo de oportunidade e a evolução do marketing — de trocas a ecossistemas",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Marketing pode ser definido como uma série de atividades que levam a uma transação de troca com lucro entre comprador e vendedor. Mas antes de existir anúncio, marca ou estratégia, existe um problema mais profundo: como organizar trocas em um mundo onde recursos são limitados e escolhas têm custo?\n\nA economia define escassez não como falta absoluta, mas como a condição estrutural na qual os recursos disponíveis são insuficientes para atender a todas as necessidades e desejos simultaneamente. Toda escolha implica custo de oportunidade — o valor da melhor alternativa que foi sacrificada. Quando a empresa aloca R$ 1 milhão em marketing, está dizendo \"não\" a R$ 1 milhão em P&D, contratação ou expansão.\n\nO composto de marketing — produto, preço, ponto-de-venda e promoção — são as atividades que precisam ser conduzidas para que a empresa consiga consumidores dispostos a pagar um preço que, ao mesmo tempo, proporcione lucro.\n\nA EVOLUÇÃO DO MARKETING\n\nMarketing nasce no ponto em que economia e psicologia se encontram: entender o que as pessoas querem, por que querem, e como fazer essa troca funcionar para ambos os lados.\n\nEra da Produção (até 1930)\n\nFoco no produto\n\n\"Um bom produto se vende sozinho.\" Demanda superava oferta. Foco em eficiência produtiva. Bastava fabricar — o mercado absorvia.\n\n▸ Ford · 1908\n\nHenry Ford: \"O cliente pode ter o carro da cor que quiser, desde que seja preto.\" Modelo T: 15 milhões de unidades, 1 cor, 1 modelo. Produção em massa como estratégia.\n\nEra do Marketing (1950-2000)\n\nFoco no cliente\n\nOferta supera demanda. Não basta fabricar — precisa entender o que o cliente quer. Kotler (Northwestern) sistematiza: segmentação, targeting, posicionamento. Os 4Ps entram em cena.\n\n▸ Coca-Cola · 1985\n\nNew Coke: mudou a fórmula baseada em pesquisa. Clientes rejeitaram\n\n<truncated 8355 bytes>\n\nROBLEMA CENTRAL\n\nEconomia da recorrência\n\nRetenção > Aquisição\n\nCARACTERÍSTICAS\n\nCRM e programas de fidelidade\n\nCustomer Lifetime Value\n\nMarketing de relacionamento\n\n2000–2020\n\nEra Digital\n\nERA\n\n07/08\n\nPROBLEMA CENTRAL\n\nEscassez de atenção\n\nAtenção como recurso escasso\n\nCARACTERÍSTICAS\n\nSobrecarga informacional\n\nMúltiplos canais simultâneos\n\nFadiga de escolha\n\n2020–ATUAL\n\nEra da Decisão\n\nERA\n\n08/08\n\nPROBLEMA CENTRAL\n\nCusto cognitivo e risco decisório\n\nMarketing como engenharia de decisão\n\nCARACTERÍSTICAS\n\nSaturação extrema de ofertas\n\nDesconfiança institucional\n\nCusto cognitivo elevado\n\nMapa de Definições: Richers, Drucker e Kotler\n\nCompare as definições clássicas e conecte cada autor à sua visão.\n\nTRÊS DEFINIÇÕES. UM NÚCLEO.\n\nTRÊS DEFINIÇÕES. UM NÚCLEO.\n\n1981\n\nRaimar Richers\n\n↓\n\n\"Marketing é a intenção de entender e atender o mercado.\"\n\nNÚCLEO\n\nComeça na leitura da realidade, não no produto\n\nMarketing não começa com criação. Começa com escuta.\n\nSÉC. XX\n\nPeter Drucker\n\n↓\n\n\"O objetivo do marketing é tornar a venda supérflua.\"\n\nNÚCLEO\n\nDecisão preparada antes da transação\n\nQuando marketing funciona, o cliente já decidiu antes de ser abordado.\n\nCONTEMPORÂNEO\n\nPhilip Kotler\n\n↓\n\n\"Processo social pelo qual indivíduos e grupos obtêm o que necessitam por meio da criação, oferta e troca de produtos de valor.\"\n\nNÚCLEO\n\nSistema de troca sob condições de restrição\n\nNão é persuasão. É viabilização de escolha.\n\nNÚCLEO EM COMUM\n\nTROCA\n\nVALOR\n\nESCOLHA\n\nESCASSEZ\n\nDECISÃO\n\nIndependente do autor, o núcleo é sempre o mesmo: organizar trocas sob escassez, reduzindo o custo de decisão do comprador."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-T1-S8",
      "code": "M4-T1-S8",
      "title": "Lideranca e Gestao de Equipes",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Liderança, Teorias e Inteligência Emocional",
              "description": "Liderança ≠ Gestão — as 5 teorias e por que IE importa mais que QI",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Liderança e gestão são complementares, mas não são sinônimos. Gestão = fazer as coisas certas acontecerem. Liderança = inspirar pessoas a quererem que aconteçam. Confundir os dois é o erro mais comum em organizações.\n\nGestão lida com complexidade: planejamento, orçamento, organização, controle. Liderança lida com mudança: visão, alinhamento, motivação, inspiração. Uma empresa precisa de ambos. O problema é que a maioria promove gestores esperando que virem líderes — e a maioria das formações ensina gestão, não liderança.\n\nAS 5 TEORIAS DE LIDERANÇA\n\nTeoria dos Traços (1900-1940)\n\nNasce-se líder?\n\n\"Líderes nascem prontos.\" Buscava traços universais: carisma, inteligência, determinação. Falhou porque não explica por que pessoas com os mesmos traços às vezes lideram e às vezes não.\n\n▸ Estudo histórico · 1940\n\nRevisão de Stogdill (1948): analisou 124 estudos de traços. Conclusão: nenhum traço garante liderança. Contexto importa tanto quanto personalidade.\n\nTeoria Comportamental (1940-1960)\n\nO que líderes FAZEM?\n\nFoco nos comportamentos, não nos traços. Liderança pode ser aprendida. Dois eixos: orientação para tarefas vs orientação para pessoas.\n\n▸ Ohio State / Michigan · 1950\n\nEstudos de Ohio State e Michigan identificaram 2 dimensões: estrutura (tarefa) e consideração (pessoas). Líderes eficazes pontuam alto em ambas.\n\nLiderança Situacional (1969)\n\nDepende do contexto\n\nHersey & Blanchard: não existe estilo melhor — existe o estilo certo para o nível de maturidade do liderado. 4 estilos: Direcionar (iniciante), Orientar (aprendiz), Apoiar (capaz mas inseguro), Delegar (autônomo).\n\n▸ Gestão prática · 2024\n\nFuncionário novo: precisa de direção (o que fazer, como fazer). Sênior: precisa de autonomia (defina o resultado, ele define o caminho). Usar o mesmo estilo para ambos é\n\n<truncated 24583 bytes>\n\nmais probabilidade de superar pares em lucratividade. Equipes diversas tomam melhores decisões — mas diversidade sem inclusão gera conflito e rotatividade. O líder inclusivo tem consciência de seus vieses inconscientes e cria ativamente um ambiente onde diferenças são fontes de vantagem competitiva.\n\nÉTICA, ESG E LIDERANÇA SUSTENTÁVEL\n\nNa terceira década do século XXI, a liderança é julgada não apenas pelos resultados financeiros, mas pelo compromisso com ESG (Ambiental, Social e Governança). A liderança servidora (Greenleaf) ganha relevância renovada: o líder que serve à equipe, aos clientes e à comunidade constrói marcas resilientes e engaja Millennials e Geração Z, que buscam propósito no trabalho.\n\nA cultura organizacional é o reflexo do comportamento dos líderes. O que celebram, o que toleram e como reagem em crises define o \"DNA\" da empresa. Coerência entre discurso e prática é o pilar da autoridade moral do líder — e a única forma de liderança que sobrevive ao longo prazo.\n\nLiderança no século XXI é contextual: ágil em VUCA, clara no remoto, relacional no contexto lusófono, inclusiva na diversidade e ética no ESG. O líder que integra tudo isso não apenas gera resultados — transforma a organização em ecossistema de crescimento.\n\nVUCA/BANI: liderança autocrática falha. Liderança distribuída — autoridade vai para quem está perto da informação.\n\nContexto lusófono: equilibrar calor humano com objetividade. Frieza é percebida como autoritarismo.\n\nESG: cultura = reflexo dos líderes. Coerência entre discurso e prática é a única liderança que dura."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-T1-S9",
      "code": "M4-T1-S9",
      "title": "Filosofia",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Pensamento Crítico e Lógica nos Negócios",
              "description": "Por que filosofia importa — falácias, vieses e como pensar com rigor",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Filosofia não é abstração inútil. É a disciplina que treina o pensamento rigoroso — questionar suposições, construir argumentos e tomar decisões sob incerteza. Todo gestor que já tomou uma decisão baseada em suposição não verificada precisava de filosofia.\n\nPensamento crítico é a capacidade de avaliar informações de forma objetiva, identificar vieses e construir conclusões fundamentadas. É a competência mais valorizada por CEOs globais (World Economic Forum, 2023) — acima de liderança e comunicação.\n\nFERRAMENTAS DO PENSAMENTO CRÍTICO\n\n🔍\n\nAnálise de argumentos\n\nSeparar premissa de conclusão. A conclusão decorre das premissas? Ou tem salto lógico?\n\n⚠️\n\nIdentificação de vieses\n\nViés de confirmação (buscar só o que confirma), ancoragem (primeira informação domina), efeito halo.\n\n🧪\n\nMétodo socrático\n\nPerguntar \"por quê?\" até chegar à premissa fundamental. Se a premissa é falsa, toda conclusão cai.\n\n❌\n\nDetecção de falácias\n\nArgumentos que parecem válidos mas não são: apelo à autoridade, falsa dicotomia, ad hominem, correlação ≠ causalidade.\n\nFalácia do Apelo à Autoridade\n\nErro lógico #1 em negócios\n\n\"O CEO da empresa X disse que funciona, logo funciona.\" Autoridade não prova verdade. Até especialistas erram. A pergunta certa: quais são os dados, independente de quem falou?\n\n▸ WeWork · 2019\n\nAdam Neumann (CEO) convenceu investidores com carisma, não dados. Valuation de US$ 47 bilhões caiu para US$ 9 bilhões quando os números foram analisados. Autoridade sem dado = bolha.\n\nCorrelação ≠ Causalidade\n\nErro lógico #2 em dados\n\n\"Vendas subiram depois da campanha, logo a campanha causou a subida.\" Pode ser coincidência, sazonalidade ou outro fator. Correlação mostra associação, não causa.\n\n▸ Marketing digital · 2024\n\nEmpresa investiu R$ 500k em branding. Vendas subiram 20%. Mas o mercado inteiro\n\n<truncated 9261 bytes>\n\nência sensorial. Dieter Rams (Braun/Vitsoe): \"bom design é o mínimo de design possível.\" Estética sustentável: produtos que envelhecem com dignidade em vez de virar lixo.\n\nFILOSOFIA DA TECNOLOGIA E ÉTICA DA IA\n\nA tecnologia nunca é neutra. Toda ferramenta carrega os valores de quem a criou. Martin Heidegger alertou que a tecnologia moderna transforma tudo em \"recurso a ser otimizado\" — inclusive pessoas. A IA generativa amplifica vieses existentes. Quem decide o que a IA \"aprende\" decide o que ela reproduz. A pergunta não é \"a IA pode fazer isso?\" — é \"a IA deve fazer isso?\"\n\nDILEMAS DA IA QUE GESTORES ENFRENTAM\n\n🔍\n\nViés algorítmico\n\nIA treinada com dados históricos reproduz discriminação histórica. Recrutamento por IA pode discriminar gênero e raça.\n\n👁️\n\nVigilância\n\nMonitoramento de produtividade: eficiência ou invasão de privacidade? Onde está o limite?\n\n🤖\n\nSubstituição\n\nAutomatizar para reduzir custo: legítimo ou irresponsável socialmente? Quem absorve os desempregados?\n\n🧬\n\nTranshumanismo\n\nImplantes neurais, edição genética, extensão de vida. A pergunta: quem terá acesso? Pode criar desigualdade biológica irreversível.\n\nFilosofia oriental ensina equilíbrio. Linguagem cria realidade. Estética diferencia. E a tecnologia nunca é neutra — quem programa a IA programa os valores que ela reproduz.\n\nLao Tzu: o melhor líder é aquele que o povo mal sabe que existe. Liderar é criar condições.\n\nWittgenstein: \"limites da linguagem = limites do mundo.\" Renomear muda a percepção.\n\nHeidegger: tecnologia transforma tudo em recurso. A pergunta não é \"pode?\" — é \"deve?\""
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-S2",
      "code": "M4-S2",
      "title": "Calculo Aplicado a Negocios",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Funções, Derivadas e Otimização",
              "description": "A matemática da mudança — como derivadas encontram o ponto ótimo de lucro",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Cálculo não é abstração acadêmica. É a matemática da mudança — e negócios são sobre mudança: preço muda, demanda muda, custo muda. Quem domina cálculo toma decisões melhores porque entende como variáveis se relacionam.\n\nUma função descreve a relação entre variáveis. Receita = Preço × Quantidade. Lucro = Receita - Custo. Demanda = f(Preço). No mundo dos negócios, tudo é função — e entender a função é entender o negócio.\n\nDERIVADAS — TAXAS DE VARIAÇÃO\n\nA derivada mede a taxa de variação instantânea. Em negócios: \"se eu aumentar o preço em R$ 1, quanto muda a demanda?\" Essa resposta é a derivada. Quando a derivada do lucro = 0, encontramos o ponto máximo (ou mínimo). É assim que se otimiza.\n\nReceita Marginal\n\nDerivada da receita\n\nQuanto a receita aumenta ao vender uma unidade a mais. Enquanto receita marginal > custo marginal, vale produzir mais. Quando se igualam, é o ponto ótimo.\n\n▸ Netflix · 2023\n\nCada novo assinante tem receita marginal de ~R$ 40/mês. Custo marginal de atender 1 a mais é quase zero (streaming). Por isso o modelo escala: marginal positiva em cada unidade.\n\nCusto Marginal\n\nDerivada do custo\n\nQuanto custa produzir uma unidade a mais. Em fábricas: cresce com capacidade (hora extra, desgaste). Em SaaS: quase zero. Entender custo marginal define precificação.\n\n▸ Ambev · 2023\n\nProduzir 1 cerveja a mais custa R$ 0,80 (matéria-prima + energia). Vende por R$ 3,50. Margem por unidade: R$ 2,70. Por isso volume é estratégia — cada unidade gera lucro.\n\nELASTICIDADE — COMO PREÇO AFETA DEMANDA\n\nElasticidade-preço mede a sensibilidade da demanda ao preço. Se |E| > 1 = elástico (sobe preço, demanda cai muito — ex: pizza delivery). Se |E| < 1 = inelástico (sobe preço, demanda mal muda — ex: remédio, combustível). Entender elasticidade é a diferença entre precificar certo\n\n<truncated 4815 bytes>\n\nnal baixíssimo).\n\nDEPRECIAÇÃO E AMORTIZAÇÃO\n\nDepreciação é o custo invisível dos ativos. Uma máquina de R$ 500k que dura 10 anos deprecia R$ 50k/ano. Não sai dinheiro do caixa — mas reduz o valor do ativo e o lucro contábil. Gestores que ignoram depreciação acham que o negócio é mais lucrativo do que realmente é.\n\n**Amortização** é o mesmo conceito aplicado a ativos intangíveis: patentes, softwares, marcas. Um software de R$ 120k amortizado em 3 anos = R$ 40k/ano de custo. Impacta DRE mas não impacta caixa — por isso EBITDA (que exclui depreciação e amortização) é tão usado em valuation.\n\nMATEMÁTICA NO DIA A DIA DO GESTOR\n\n📊\n\nBreak-Even\n\nCustos Fixos ÷ Margem de Contribuição = unidades mínimas. Saber esse número muda a estratégia inteira.\n\n📉\n\nDepreciação\n\nCusto do ativo distribuído no tempo. Não sai dinheiro mas reduz lucro contábil e valor do ativo.\n\n📈\n\nMargem de Contribuição\n\nPreço - Custo Variável. Quanto cada unidade contribui para pagar fixos. A métrica mais importante de precificação.\n\n🎯\n\nAlavancagem Operacional\n\nQuanto o lucro cresce para cada % de aumento em vendas. Custos fixos altos = alta alavancagem = alto risco e alto retorno.\n\nBreak-even é o número que todo gestor deve saber de cor. Depreciação é o custo que ninguém vê mas que afeta o lucro real. E a margem de contribuição define se vale a pena vender mais.\n\nRestaurante que não sabe break-even opera no escuro. É o número #1.\n\nSaaS: custo marginal baixíssimo. Depois do break-even, escala = lucro brutal.\n\nDepreciação: não sai dinheiro do caixa mas reduz lucro. Por isso existe EBITDA."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-S3",
      "code": "M4-S3",
      "title": "Analise Estatistica",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Fundamentos de Estatística",
              "description": "Média, dispersão e probabilidade — a base de toda decisão por dados",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Estatística é a ciência de tomar decisões sob incerteza. Todo dado de negócio — vendas, churn, NPS, conversão — é estatística. Quem não domina o básico toma decisões por achismo disfarçado de análise.\n\nMEDIDAS DE TENDÊNCIA CENTRAL\n\n📊\n\nMédia\n\nSoma ÷ quantidade. Útil mas sensível a outliers. Salário médio brasileiro parece alto porque poucos bilionários puxam pra cima.\n\nΣx/n\n\nfórmula\n\n📈\n\nMediana\n\nValor do meio quando ordenado. Imune a outliers. Mediana salarial é muito mais representativa que média.\n\n50º percentil\n\nmetade acima, metade abaixo\n\n🏆\n\nModa\n\nValor mais frequente. Útil em pesquisa de mercado: qual tamanho mais vendido? Qual preço mais escolhido?\n\nMax freq\n\nmais comum\n\nMEDIDAS DE DISPERSÃO\n\n↔️\n\nAmplitude\n\nMaior - menor valor. Simples mas ignora a distribuição no meio. Útil como primeira olhada.\n\n📉\n\nDesvio Padrão\n\nQuanto os dados se afastam da média. Desvio padrão pequeno = dados concentrados. Grande = espalhados.\n\nσ\n\nsímbolo\n\n📐\n\nVariância\n\nDesvio padrão ao quadrado. Usada em fórmulas estatísticas. Na prática, use desvio padrão (mais intuitivo).\n\n📊\n\nCoeficiente de Variação\n\nDesvio padrão ÷ média × 100. Permite comparar dispersão entre datasets com unidades diferentes.\n\nPROBABILIDADE APLICADA\n\nProbabilidade quantifica incerteza. Em negócios: qual a probabilidade de o cliente comprar? De o projeto atrasar? De a receita superar R$ 1M? Sem probabilidade, previsão é chute. Com probabilidade, previsão tem intervalo de confiança.\n\nDistribuição Normal (curva de Gauss): a maioria dos fenômenos de negócio segue esse padrão — valores concentrados no centro, poucos nos extremos. 68% dos dados ficam a 1 desvio padrão da média. 95% a 2 desvios. 99.7% a 3 desvios. Se um resultado está a 3+ desvios da média, é estatisticamente anômalo.\n\nMédia mente quando tem outlier — use mediana. Desvio padrão mede consist\n\n<truncated 7007 bytes>\n\n%.\n\nML de Recomendação\n\nPersonalização\n\nModelo sugere produtos/conteúdo baseado em comportamento: \"quem comprou X também comprou Y.\" Amazon: 35% das vendas vêm de recomendações algorítmicas.\n\n▸ Netflix · 2023\n\nO algoritmo de recomendação economiza US$ 1 bilhão/ano em retenção. Sem recomendação personalizada, usuários não encontram o que assistir e cancelam.\n\nEXCEL/SHEETS — O KIT DE SOBREVIVÊNCIA\n\nApesar do hype de IA e ML, a ferramenta mais usada para análise de dados no mundo ainda é o Excel/Google Sheets. Dominar o básico resolve 80% dos problemas analíticos de uma PME.\n\nFUNÇÕES ESSENCIAIS DO EXCEL PARA GESTORES\n\n📊\n\nPROCV / XLOOKUP\n\nCruzar dados entre tabelas. \"Qual o faturamento do cliente X?\" Busca em outra planilha e retorna valor.\n\n📈\n\nTabela Dinâmica\n\nResumir milhares de linhas em painel interativo. Arrastar campos, filtrar, agrupar. A ferramenta mais poderosa do Excel.\n\n🔢\n\nSE / SOMASE / CONT.SE\n\nLógica condicional: \"se vendas > meta, verde; senão, vermelho.\" Contar quantos clientes atendem critério.\n\n📉\n\nGráficos\n\nBarra para comparar, linha para tendência, dispersão para correlação. Pizza nunca (quase sempre ruim).\n\nML não é mágica — é estatística automatizada. Regressão prevê números, classificação categoriza, clustering agrupa. E o Excel resolve 80% dos problemas analíticos de uma PME.\n\nSpotify: ML de churn prevê cancelamento 14 dias antes. Ação preventiva reduz 25%.\n\nNetflix: recomendação economiza $1B/ano em retenção. 80% do conteúdo assistido via algoritmo.\n\nExcel: PROCV + Tabela Dinâmica + SE resolvem 80% dos problemas analíticos de PME."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M5-S1",
      "code": "M5-S1",
      "title": "Leitura e Escrita Academica",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Escrever com Clareza",
              "description": "Da clareza de pensamento à clareza de texto — como gestores comunicam para quem decide",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Escrever bem não é talento — é método. No mundo corporativo, quem escreve com clareza pensa com clareza. 73% do tempo de executivos é gasto lendo e escrevendo (McKinsey). Propostas mal escritas perdem investimento não por falta de mérito — por falta de clareza.\n\nHá uma distinção fundamental entre escrita acadêmica e escrita corporativa: a acadêmica preza rigor metodológico, referências e linguagem formal; a corporativa preza clareza, objetividade e ação. O que têm em comum é mais importante do que a diferença — estrutura lógica, evidências e argumentação fundamentada.\n\nOS 3 PRINCÍPIOS UNIVERSAIS DA BOA ESCRITA\n\n🔍\n\nClareza\n\nSe pode ser mal interpretado, será mal interpretado. Reescreva até não restar ambiguidade.\n\n✂️\n\nConcisão\n\nSe pode ser dito em menos palavras, deve ser. Cada palavra extra custa atenção do leitor.\n\n🏗️\n\nEstrutura\n\nSe o leitor precisa reler para entender a lógica, reorganize — o problema é seu, não dele.\n\nCEOs e diretores leem centenas de documentos por semana. Você tem 30 segundos para capturar atenção e 2 minutos para convencer. A Pirâmide de Minto (Barbara Minto, McKinsey) é a estrutura mais poderosa para isso: começa pela conclusão, não pelo contexto.\n\nNível 1 — Texto Confuso\n\nO jeito errado\n\n\"Analisamos o mercado nos últimos 6 meses. Observamos que a demanda está crescendo. Nossos concorrentes estão investindo. A oportunidade é grande. Por isso, recomendamos expandir.\" — Só chegou na recomendação na última frase. O CEO já parou de ler na segunda.\n\n▸ Erro comum em relatórios · 2024\n\nEmails confusos geram retrabalho — cada email mal escrito custa em média 25 minutos de follow-up. Relatórios sem estrutura não são lidos: se o CEO não entende na primeira página, ele para de ler.\n\nNível 2 — Texto Estruturado\n\nO jeito melhorado\n\nContexto → Problema → Anális\n\n<truncated 10358 bytes>\n\nrefaça. Um slide = uma ideia = um visual. Texto: máximo 6 palavras no título. Números: destaque o número, não a frase — \"340%\" deve ser grande, o contexto é pequeno.\n\nOS 7 SLIDES ESSENCIAIS\n\n🎯\n\nTítulo\n\n1 frase impactante + sua proposta. Quem você é e por que importa.\n\n⚡\n\nProblema\n\nEstatística chocante + visual. O problema que você resolve.\n\n✅\n\nSolução\n\nAntes/depois ou demonstração. O que muda com você.\n\n📊\n\nDados\n\n1 gráfico, 1 insight, 1 conclusão. Sem mais que isso por slide.\n\n🏆\n\nProva social\n\nLogos de clientes, métricas reais, depoimentos. Evidência de que funciona.\n\n📅\n\nTimeline\n\n3-5 marcos com datas. {{Quando} as coisas acontecem.\n\n🚀\n\nCall to action\n\nO que você quer que o público faça agora. Específico e com data.\n\nOs primeiros 30 segundos ganham ou perdem a audiência. Comece com dado surpreendente, pergunta provocativa ou história — nunca com \"bom dia, meu nome é X e hoje vou falar sobre...\". Nunca leia o slide: o slide é para o público, você fala o que não está no slide. Silêncio é poder: pause 2 segundos após um dado impactante.\n\nComunicação eficaz não é sobre você — é sobre o seu leitor ou audiência. Escolha o formato que respeita o tempo deles. Use a estrutura que organiza o seu pensamento. E lembre: clareza é respeito.\n\nA estrutura Duarte cria tensão narrativa alternando realidade e possibilidade — é o padrão de todas as apresentações que movem pessoas.\n\nUm slide = uma ideia = um visual. Qualquer coisa além disso divide a atenção e dilui a mensagem.\n\nOs primeiros 30 segundos são decisivos — comece com impacto, nunca com apresentação pessoal."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M5-S2",
      "code": "M5-S2",
      "title": "Empreendedorismo e Inovacao",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Empreender — O que É e Como Pensar",
              "description": "De Schumpeter à Effectuation — as duas lógicas que separam empreendedores que criam do que os que apenas executam",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Empreendedorismo não é \"abrir empresa\". É identificar oportunidades e criar valor onde antes não existia — com recursos limitados e sob incerteza. 53 milhões de empreendedores ativos no Brasil (GEM, 2024), mas 70% empreendem por necessidade, não por oportunidade. A diferença muda tudo: estratégia, ritmo, capital e probabilidade de sucesso.\n\nTrês pensadores definiram o que é empreender de formas complementares. Schumpeter: o empreendedor é agente da destruição criativa — destrói o velho para criar o novo (Nubank destruiu o banco com agências). Drucker: empreendedorismo é a prática de transformar recursos em riqueza por meio de uma nova capacidade. Sarasvathy: empreendedores não preveem o futuro — eles o constroem.\n\nMITOS QUE PRECISAM MORRER\n\n🧬\n\n\"Nascem prontos\"\n\nFalso. Pesquisa do MIT: treinamento formal aumenta probabilidade de sucesso em 2,5x. É habilidade treinável.\n\n💡\n\n\"Precisa de ideia genial\"\n\nFalso. 90% dos negócios de sucesso não são ideias originais — são execuções superiores. McDonald's não inventou o hambúrguer.\n\n💰\n\n\"Precisa de dinheiro\"\n\nFalso. 70% das startups do Vale começaram com menos de US$ 10K. Bootstrapping é a norma, não a exceção.\n\n🎲\n\n\"Amam risco\"\n\nFalso. Bons empreendedores gerenciam risco — calculam, mitigam, assumem risco calculado. Não risco cego.\n\nSaras Sarasvathy estudou como empreendedores experientes realmente pensam — e descobriu que a lógica é oposta ao que se ensina em MBA. Enquanto o planejamento tradicional parte do objetivo e trabalha para trás (Causation), empreendedores experientes partem do que têm e trabalham para frente (Effectuation).\n\nCausation — Planejamento tradicional\n\nMercados estáveis\n\n\"Defina o objetivo → Planeje → Execute → Meça.\" Lógica: prever o futuro e se preparar. Ferramentas: business plan, pes\n\n<truncated 12347 bytes>\n\nória), Solução (mostre, não conte), Por que agora?, Tamanho de mercado (TAM/SAM/SOM — o VC olha o SOM), Modelo de negócio, Tração, Competição (nunca diga \"não temos concorrente\"), Equipe, Go-to-market, Financeiro (3-5 anos com premissas), Ask (o que precisa e para quê).\n\n▸ Airbnb — primeiro pitch · 2009\n\nO pitch original do Airbnb para YCombinator tinha 10 slides simples. Tração real: 10.000 usuários. A equipe já tinha passado por rejeição de 5 fundos antes. Paul Graham aceitou porque a ideia parecia \"estranha mas os números eram reais.\" Tração honesta sempre supera narrativa bonita.\n\nO ecossistema brasileiro em 2025: ~15.000 startups ativas, 15 unicórnios, US$ 3,5B em VC. Os principais VCs: Kaszek (maior da AL — Nubank, QuintoAndar), Monashees (Rappi, Loggi), Canary (seed stage — maior deal flow). Programas públicos: BNDES Garagem, FINEP (subvenção econômica = dinheiro não reembolsável), FAPESP PIPE. Não aceite dinheiro de quem não agrega valor além do capital.\n\nCapital é combustível — mas sem direção, acelera na direção errada. A fonte certa no momento certo é estratégia. Não aceite dinheiro de quem não agrega valor além do cheque — o investidor errado pode ser mais destrutivo do que a falta de capital.\n\nValide antes de buscar capital externo: sem evidência de problema real, nenhum investidor sério vai entrar.\n\nDiluição é o preço da velocidade: manter 10% de empresa grande é melhor que 100% de empresa pequena — o tamanho do bolo importa mais.\n\nO pitch não vende a ideia — vende a equipe e a evidência. Tração honesta supera narrativa bonita."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M5-S3",
      "code": "M5-S3",
      "title": "Ambiente Macroeconomico",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Os 5 Indicadores — Lendo o Ambiente",
              "description": "PIB, IPCA, Selic, câmbio e desemprego: o painel que nenhum gestor pode ignorar.",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Macroeconomia é o ambiente externo que afeta todas as empresas ao mesmo tempo. Você não controla inflação, juros ou câmbio — mas precisa saber lê-los para decidir quando investir, quando proteger e quando esperar.\n\nOS 5 INDICADORES FUNDAMENTAIS\n\n📊\n\nPIB\n\nSoma de tudo que o país produz. Crescendo = mercado expandindo. Caindo 2 trimestres = recessão técnica → prepare caixa.\n\n🔥\n\nIPCA\n\nTaxa de inflação oficial. Alta → BC sobe juros → crédito caro → consumo cai. Acompanhe pelo IBGE mensalmente.\n\n🏦\n\nSelic\n\nJuros básicos definidos pelo COPOM. Alta = empréstimos caros, priorize caixa. Baixa = crédito barato, invista e expanda.\n\n💱\n\nCâmbio\n\nReal fraco = importações caras, exportações competitivas. Real forte = importações baratas, exportações perdem margem.\n\n👷\n\nDesemprego\n\nAlto = consumo fraco + mão de obra disponível. Baixo = consumo forte + guerra por talentos e pressão salarial.\n\nPOLÍTICA MONETÁRIA E FISCAL\n\nO Banco Central usa a Selic para controlar inflação: sobe juros para frear preços, desce para estimular a economia. O governo usa política fiscal — gastar mais estimula no curto prazo, mas pode pressionar inflação. Quando as duas políticas conflitam (governo expansionista + BC contracionista), o resultado é juros altos com crescimento baixo: o pior cenário para empresas.\n\nMacroeconomia não é para prever o futuro — é para não ser pego de surpresa. Quem lê os indicadores com antecedência renegocia dívidas no pico, expande no vale e protege caixa na contração.\n\nOs 5 indicadores (PIB, IPCA, Selic, câmbio, desemprego) formam um painel. Leia o conjunto, não cada um isolado.\n\nSelic alta = priorize caixa. Selic baixa = invista. Esta regra simples evita os erros mais caros.\n\nPolítica monetária e fiscal em conflito = pior cenário. Aprenda a identificar quando as duas estão alinhadas vs. brigand\n\n<truncated 5259 bytes>\n\ndelo híbrido. Empresas 100% presenciais perdem candidatos. Dado: híbrido retém 12% mais talentos (McKinsey 2024).\n\n3\n\nGig economy e pejotização\n\n25M trabalhadores informais. Pejotização reduz encargos mas cria risco jurídico se relação é subordinada e contínua.\n\n4\n\nDiversidade como resultado\n\nEmpresas com diversidade étnica: 36% mais chance de superar a média (McKinsey). Diversidade de gênero na liderança: 25% mais lucratividade.\n\n5\n\nIA não substitui empregos — substitui tarefas\n\n30% das tarefas atuais podem ser automatizadas. A pergunta certa: \"alguém usando IA vai substituir quem não usa\" — e a resposta é sim.\n\nSISTEMA FINANCEIRO — O QUE O GESTOR PRECISA SABER\n\nBCB define a Selic e opera o PIX (2,4 bilhões de transações/mês). Big 5 bancos concentram 80% dos ativos. Nubank com 100M+ clientes e fintechs forçaram custo zero em contas. Open Banking permite comparar crédito de múltiplos bancos automaticamente. Regra de caixa: mínimo 3-6 meses de despesas em CDB 100% CDI — nunca em cheque especial (>300%/ano).\n\nTrabalho e dinheiro são os dois recursos mais escassos de qualquer empresa. Quem gerencia bem o caixa sobrevive à crise. Quem gerencia bem o talento vence na expansão. Os dois juntos constroem empresas que duram.\n\nMercado de trabalho: escassez de qualificados é estrutural. Upskilling interno custa menos que competir por candidatos prontos.\n\nRegra de caixa: 3-6 meses de despesas em liquidez diária. Nunca use cheque especial — é o crédito mais caro que existe.\n\nOpen Banking e PIX mudaram as regras do sistema financeiro. Quem ainda ignora essas ferramentas paga mais caro por tudo."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M6-S1",
      "code": "M6-S1",
      "title": "Analise Financeira",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Análise Vertical e Horizontal — Lendo as Entrelinhas",
              "description": "Demonstrações contábeis são um mapa. Sem análise, são apenas números.",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "A análise financeira transforma dados em diagnóstico. Dois olhares complementares revelam o que os números escondem: a composição de cada período (vertical) e a tendência ao longo do tempo (horizontal). Juntos, dizem se a empresa está melhorando ou piorando — e onde.\n\nANÁLISE VERTICAL — A ESTRUTURA\n\nCompara cada item com um referencial dentro do mesmo período. Na DRE: cada linha como % da Receita Líquida. No Balanço: cada conta como % do Ativo Total. Exemplo: CMV representando 65% da receita quando o setor é 45% — a operação está ineficiente. Problema: preço de compra alto, desperdício ou produto subprecificado.\n\nANÁLISE HORIZONTAL — A TENDÊNCIA\n\nCompara o mesmo item ao longo de diferentes períodos. Receita cresceu 15%/ano? Lucro cresceu junto ou foi consumido por despesas? Despesas administrativas subiram 40% enquanto receita cresceu 10%? A estrutura está inchando. A horizontal expõe tendências que a vertical nunca mostraria.\n\nÍNDICES FUNDAMENTAIS DE ANÁLISE\n\n⏱️\n\nCiclo Operacional\n\nPME + PMR. Quanto tempo entre comprar insumo e receber do cliente. Quanto menor, menos capital imobilizado.\n\n🔄\n\nCiclo Financeiro\n\nCiclo Operacional − PMP. Quanto tempo a empresa financia com capital próprio. Negativo = recebe antes de pagar (ideal: iFood, Mercado Livre).\n\n📈\n\nGiro do Ativo\n\nReceita ÷ Ativo Total. Quantas vezes o ativo gira em receita. Varejo: 3–5x. Indústria pesada: 0,5–1x.\n\n💰\n\nMargem de Contribuição\n\nPreço − Custos Variáveis. O quanto cada venda contribui para cobrir fixos. MC negativa = vender mais aumenta o prejuízo.\n\nA análise mais poderosa cruza vertical com horizontal: a vertical mostra onde está o problema na estrutura, a horizontal mostra quando o problema começou e se está piorando. Juntas revelam o diagnóstico completo.\n\nNunca analise um indicador isolado. ROE alto com endividam\n\n<truncated 5312 bytes>\n\nonde está o problema. Horizontal mostra quando começou e se piora.\n\n💼\n\nValuation\n\nDCF para fluxo previsível, múltiplos para comparáveis, patrimonial para asset-heavy. Triangule os três — o número certo está no cruzamento.\n\n⚙️\n\nCapital de Giro\n\nPME + PMR − PMP = Ciclo Financeiro. Negativo = autofinancia. Positivo = precisa de capital externo. 60% das falências são por má gestão do ciclo.\n\n💲\n\nPrecificação\n\nCusto define o piso, mercado define a faixa, valor define o teto. Markup de 50% ≠ margem de 50%. Break-even define quantas vendas precisa para sobreviver.\n\nO DIAGNÓSTICO EM 4 PERGUNTAS\n\n1) A estrutura está saudável? (Análise Vertical — CMV, margem bruta, despesas como % da receita). 2) A tendência está melhorando? (Análise Horizontal — evolução dos indicadores no tempo). 3) O dinheiro está circulando? (Capital de Giro — ciclo financeiro, PME, PMR, PMP). 4) O preço está correto? (Precificação — markup vs. margem, break-even, margem de segurança). Quatro perguntas, quatro respostas — esse é o mapa financeiro completo.\n\nAnálise financeira, valuation, capital de giro e precificação são quatro lentes do mesmo negócio. Gestores que dominam os quatro tomam decisões melhores — porque enxergam o que os outros não veem.\n\nO diagnóstico em 4 perguntas: estrutura saudável? Tendência melhorando? Dinheiro circulando? Preço correto?\n\nFatura bem mas falta caixa = capital de giro. Vende mas não lucra = estrutura (V/H). Cresce e piora = precificação.\n\nNenhum indicador isolado conta a história completa. A análise financeira é cruzamento — não checklist individual."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M6-S3",
      "code": "M6-S3",
      "title": "Etica",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Os 4 Frameworks — A Bússola das Decisões Éticas",
              "description": "Quando a lei não dá resposta, a filosofia entra em cena. Quatro lentes para não decidir no escuro.",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Ética empresarial não é filantropia nem compliance — é o sistema de princípios que guia decisões quando o manual não ajuda. Gestores que dominam os 4 frameworks éticos tomam decisões mais sólidas, constroem reputação mais duradoura e dormem melhor à noite.\n\nOS 4 FRAMEWORKS FILOSÓFICOS APLICADOS A NEGÓCIOS\n\n⚖️\n\nUtilitarismo\n\nPergunta: qual decisão gera o maior bem para o maior número? Prático e mensurável. Risco: pode justificar sacrificar uma minoria pelo bem coletivo. Base de análises custo-benefício.\n\n📜\n\nDeontologia\n\nPergunta: isso seria aceitável como regra universal? Kant: aja só segundo princípios que você universalizaria. Princípios invioláveis — independente do resultado financeiro.\n\n🌟\n\nÉtica das Virtudes\n\nPergunta: uma pessoa de caráter exemplar faria isso? Foco no agente, não na ação. Base para culturas organizacionais e formação de líderes éticos.\n\n🤝\n\nContratualismo\n\nRawls: se você não soubesse seu papel na situação, aceitaria essa decisão? Base para políticas de equidade, diversidade e justiça salarial nas organizações.\n\nNa prática, esses 4 frameworks funcionam como filtros em série. Se todos apontam na mesma direção, a resposta é clara. Se divergem, o dilema é genuíno e merece deliberação coletiva. O erro mais comum: usar apenas um filtro e chamar isso de \"decisão ética\".\n\nÉtica não é sobre ter respostas certas — é sobre fazer as perguntas certas antes de agir. O gestor que conhece os 4 frameworks tem vocabulário para argumentar, escutar e decidir com consistência. O que não tem framework decide por instinto — e às vezes acerta, mas não sabe por quê nem consegue replicar.\n\nSe os 4 frameworks convergem: a decisão é clara. Se divergem: o dilema é real — reserve deliberação coletiva antes de agir.\n\nCompliance é o mínimo. Seguir a lei é\n\n<truncated 5994 bytes>\n\ndireta da empresa.\n\n🏛️\n\nG — Governança\n\nTransparência, conselho independente, política de remuneração executiva, canal de denúncias, auditoria externa. Governança fraca é o maior preditor de escândalo corporativo — 80% das crises têm falha de G como raiz.\n\n📋\n\nCompliance como Diferencial\n\nEmpresas com compliance robusto pagam menos por crédito, atraem mais investidores institucionais e sofrem multas menores. Compliance não é custo — é seguro e vantagem competitiva mensurável.\n\nO mercado precificou ESG. Fundos ESG movimentam +US$ 35 trilhões globalmente. Empresas com rating ESG alto têm custo de capital 1,5–2% menor. No Brasil, o ISE (Índice de Sustentabilidade Empresarial) da B3 historicamente supera o Ibovespa em períodos de crise. Ética deixou de ser custo e virou vantagem competitiva mensurável.\n\nESG não é o futuro dos negócios — é o presente dos negócios que querem sobreviver. Investidores, consumidores, reguladores e os melhores talentos do mercado já tomam decisões baseados nisso. A empresa que ignora essa mudança não está sendo pragmática — está acumulando passivo que vai cobrar um preço.\n\nCusto de capital: empresas com rating ESG elevado tomam crédito 1,5–2% mais barato. Em um financiamento de R$ 100M, isso é R$ 1,5–2M por ano de diferença real.\n\nG é o pilar mais negligenciado e o mais impactante. 80% dos escândalos corporativos têm falha de governança como causa raiz, não de intenção individual.\n\nO teste prático de ESG: pergunte ao funcionário da linha de produção o que a empresa faz pelo meio ambiente e pela comunidade. A resposta diz tudo."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M7-S1",
      "code": "M7-S1",
      "title": "Empreendedorismo Social",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Os 3 Modelos de Impacto Social — Qual Estrutura Escolher?",
              "description": "Negócio Social, Empresa B e ONG: três caminhos para resolver problemas reais com sustentabilidade financeira.",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Empreendedorismo social aplica a lógica empresarial para resolver problemas sociais e ambientais. Muhammad Yunus provou com o Grameen Bank: os mais pobres pagam suas dívidas (inadimplência < 2%) e negócios podem existir para resolver problemas — não só para lucrar.\n\nOS 4 MODELOS DE IMPACTO SOCIAL\n\n🏦\n\nNegócio Social (Yunus)\n\nCobre custos e gera lucro moderado, mas reinveste tudo na missão. Não distribui dividendos. Modelo: Grameen Bank, Vivenda (reforma de moradias precárias). Completamente autossustentável.\n\n🌿\n\nEmpresa B (B Corp)\n\nEmpresa tradicional com compromisso formal de gerar impacto. Certificada pelo B Lab. Distribui lucro, mas equilibra retorno com impacto social/ambiental. Natura: primeira B Corp listada em bolsa na América Latina.\n\n🤝\n\nONG / OSCIP\n\nImpacto social puro. Não distribui lucro, não existe. Depende de doações, grants e editais. Escala limitada pela captação. Exemplo: Gerando Falcões — ecossistema de impacto em favelas.\n\n🔀\n\nOrganização Híbrida\n\nCombina receita de mercado com doações e grants. Comum em educação e saúde. Exemplo: Geekie (edtech para escolas públicas) — parte da receita via mercado, parte via setor público e fundações.\n\nA tendência global é convergência: empresas tradicionais incorporam impacto (ESG), e negócios sociais adotam práticas de mercado. O modelo \"puro\" de cada tipo está ficando raro. A pergunta não é \"qual modelo é melhor\" — é \"qual modelo serve melhor ao problema que você quer resolver\".\n\nEmpreendedorismo social não é filantropia com CNPJ — é inovação no modelo de negócio. A pergunta não é \"podemos fazer bem ao mundo?\" — é \"como construímos um modelo financeiro que sustente o bem que queremos fazer por décadas?\"\n\nEmpresa que doa 1% do lucro para caridade NÃO é negócio social. O imp\n\n<truncated 6971 bytes>\n\nem bootcamps para contratar talentos formados. Win-win-win.\n\n4\n\nReceita de Mercado\n\nO projeto se paga via venda de produtos/serviços. Vantagem: máxima independência e escalabilidade. Desvantagem: pode excluir os mais vulneráveis se o preço for barreira. Solução: modelo freemium, subsídio cruzado ou tiered pricing por capacidade de pagamento.\n\nO dilema clássico: investidor oferece capital mas exige que parte do público-alvo pague mensalidade. Isso excluiria os mais vulneráveis — exatamente quem o projeto nasceu para atender. Gerando Falcões resolveu esse dilema com o modelo híbrido: grandes empresas financiam programas sociais em troca de impacto mensurável. Escala sem cobrar do público-alvo.\n\nO dilema \"escala vs missão\" é falso quando você inova no modelo de financiamento. A criatividade no negócio de impacto não é só no produto — é em como pagar por ele sem comprometer quem você nasceu para servir. Gerando Falcões prova que é possível crescer rápido sem cobrar do público mais vulnerável.\n\nModelo híbrido resolve o dilema clássico: quem tem capacidade de pagar (empresas) financia quem não tem (beneficiários). O impacto acontece, o beneficiário não paga, a empresa ganha acesso e associação de marca.\n\nSubsídio cruzado é estratégia, não filantropia. Cobrar mais de quem pode pagar para subsidiar quem não pode é o modelo do Nubank, da Natura e de centenas de negócios de impacto pelo mundo.\n\nGovernança protege a missão quando chega o investidor. Antes de aceitar capital, defina por escrito: quais aspectos da missão são não-negociáveis independente de pressão financeira."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M7-S2",
      "code": "M7-S2",
      "title": "Teologia e Sociedade",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Os 4 Princípios da Doutrina Social — A Base Ética dos Negócios",
              "description": "Dignidade humana, bem comum, subsidiariedade e solidariedade: o framework ético que governa decisões quando o lucro e as pessoas entram em conflito.",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "A Doutrina Social não é teoria religiosa — é filosofia aplicada. Bob Chapman (Barry-Wehmiller) aplicou esses princípios em 2008: ao invés de demitir 1.000 pessoas para cortar custos, fez licenças não-remuneradas rotativas. Resultado: ninguém foi demitido, a empresa sobreviveu, e a moral subiu. \"Cada pessoa importa\" não é slogan — foi estratégia.\n\nOS 4 PRINCÍPIOS DA DOUTRINA SOCIAL APLICADOS A NEGÓCIOS\n\n👤\n\nDignidade da Pessoa Humana\n\nPessoas não são recursos descartáveis. Cada funcionário, cliente ou fornecedor tem dignidade intrínseca que não pode ser violada em nome da eficiência. Exemplo: demissão em massa sem aviso vs. plano de transição com apoio.\n\n🤝\n\nBem Comum\n\nDecisões devem considerar o impacto no conjunto da sociedade, não só nos acionistas. Uma empresa que polui para reduzir custos privatiza ganhos e socializa prejuízos — o oposto do bem comum.\n\n🏛️\n\nSubsidiariedade\n\nDecisões devem ser tomadas no nível mais próximo possível do problema. Micro-gerência viola subsidiariedade. Times autônomos que resolvem seus próprios problemas honram esse princípio.\n\n🌍\n\nSolidariedade\n\nInterdependência reconhecida como responsabilidade mútua. Empresas que prosperam em comunidades empobrecidas violam solidariedade. Cadeias de fornecimento com preços justos honram esse princípio.\n\nA tensão real não é entre ética e lucro — é entre curto e longo prazo. Empresas que violam esses princípios sistematicamente acumulam passivos invisíveis: desmotivação, turnover, reputação, litígios. A Johnson & Johnson retirou o Tylenol das prateleiras em 1982 (custo: US$ 100M) porque o credo da empresa colocava pacientes antes de acionistas. Resultado: recuperou 100% do market share em 1 ano.\n\nPrincípios éticos são ativo\n\n<truncated 7355 bytes>\n\nucional. Cultura que depende de 1 pessoa é fragilidade estratégica.\n\n📢\n\nComportamento dos líderes\n\nLíderes são o propósito em ação. A equipe não ouve o que a empresa diz — observa o que os líderes fazem. Um CEO que fala em sustentabilidade e viaja de jato particular sem compensação revela o propósito real.\n\nA Patagonia deu a empresa inteira para o planeta em 2022. O fundador Yvon Chouinard transferiu a propriedade para fundos ambientais. Esse ato — irreversível, custoso — foi a prova de propósito mais clara possível. Antes disso, a empresa já recusava ser vendida a fundos que não mantivessem seus valores. Propósito não é o que você escreve no site — é o que você protege quando o custo de proteger é alto.\n\nPropósito é o que você protege quando custa algo. Toda empresa tem valores escritos em parede e site. O que diferencia é o que acontece quando esses valores entram em conflito com pressão de resultados, com conveniência, com oportunidade. Nesses momentos — e só nesses — o propósito real se revela.\n\nO teste definitivo do propósito: o que a empresa faz quando ninguém está olhando? Quando é caro manter os valores? Quando é conveniente abandoná-los? A resposta é o propósito real.\n\nAlocação de orçamento não mente. Se quiser saber o que uma empresa realmente valoriza, leia o relatório financeiro — não o relatório de sustentabilidade. Dinheiro é o voto mais honesto.\n\nPropósito institucional é mais robusto que propósito pessoal. Se o propósito da empresa depende do CEO atual, é frágil. O objetivo é criar cultura que persiste independente de quem lidera."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M7-S3",
      "code": "M7-S3",
      "title": "Projeto de Intervencao em Negocios",
      "videoUrls": [],
      "chapters": [
          {
              "title": "As 4 Ferramentas de Diagnóstico — Mapeie Antes de Agir",
              "description": "Ishikawa, 5 Porquês, Matriz GUT e PDCA: cada ferramenta ataca o problema de um ângulo diferente. Usar a errada é pior que não usar nenhuma.",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "A Toyota parou uma linha de produção inteira por uma máquina quebrada. Em vez de trocar a peça e retomar, o engenheiro perguntou \"por quê?\" cinco vezes. Descobriu que o real problema era falta de um filtro de óleo — que custava R$ 2. Sem diagnóstico correto, você resolve o sintoma e o problema volta em 3 meses, mais caro.\n\nAS 4 FERRAMENTAS DE DIAGNÓSTICO E QUANDO USAR CADA UMA\n\n🦴\n\nDiagrama de Ishikawa (Espinha de Peixe)\n\nMapeia todas as causas possíveis de um problema em 6 categorias: Método, Máquina, Material, Mão de obra, Meio ambiente, Medida. Use quando o problema tem múltiplas causas possíveis e você precisa visualizar todas antes de priorizar.\n\n❓\n\n5 Porquês\n\nEncontra a causa-raiz profunda perguntando \"por quê?\" cinco vezes consecutivas. Inventado pela Toyota. Use quando a causa aparente é superficial e você suspeita que há algo mais profundo — o que parece óbvio raramente é a causa real.\n\n📊\n\nMatriz GUT\n\nPrioriza problemas por Gravidade × Urgência × Tendência (cada um de 1 a 5). GUT = G×U×T. Use quando você tem uma lista de problemas e precisa decidir por qual começar. O maior score = ataque primeiro.\n\n🔄\n\nCiclo PDCA\n\nMelhoria contínua em 4 etapas: Plan → Do → Check → Act. Repita até atingir o padrão desejado. Use para qualquer processo que precisa melhorar continuamente. Deming trouxe para o Japão após a 2ª Guerra — e o Japão dominou a qualidade industrial por 20 anos.\n\nA combinação certa é sequencial: use Ishikawa para MAPEAR todas as causas possíveis, 5 Porquês para APROFUNDAR a principal suspeita, GUT para PRIORIZAR qual atacar primeiro, e PDCA para EXECUTAR e AJUSTAR a intervenção. Usar só uma ferramenta é como diagnosticar uma doença sem fazer exame.\n\nDiagnóstico correto é metade da\n\n<truncated 8577 bytes>\n\nhorou o quanto em relação ao que esperávamos?\" Sem métrica pré-definida, qualquer resultado parece aceitável.\n\n4\n\nACT — Padronize ou ajuste\n\nSe funcionou: padronize e escale. Se não funcionou: ajuste o plano com o que aprendeu e reinicie o ciclo. O ACT não termina o projeto — decide se vai escalar ou voltar ao Plan com mais informação.\n\nO erro mais comum no PDCA: pular o CHECK ou fazer o CHECK sem comparar com a meta. \"Melhorou\" não é informação suficiente — \"melhorou 12% em vez dos 30% planejados\" gera ação. Outro erro: executar em escala total antes de validar (pular o piloto no DO). Um piloto mal executado custa R$ 10k; escalar um projeto ruim pode custar R$ 1M.\n\nPDCA não é metodologia — é disciplina. A maioria das empresas faz o Plan (às vezes) e o Do (sempre). Raramente faz o Check com rigor. Quase nunca faz o Act de forma sistemática. O ciclo só funciona completo — e só gera vantagem competitiva quando é repetido consistentemente.\n\nPiloto antes de escalar é PDCA na prática. Cada vez que você escala sem testar, está apostando. Cada vez que testa em escopo controlado primeiro, está aprendendo com risco minimizado.\n\nMeça o que importava no Plan, não o que foi fácil de medir. \"As pessoas gostaram\" é fácil de medir. \"Erros caíram 30%\" é o que importava. O Check que usa a métrica errada é mais perigoso que não medir — porque gera falsa sensação de sucesso.\n\nO ciclo do PDCA termina no ACT — que recomeça no PLAN. Não há ponto final em melhoria contínua. Empresas que \"concluem\" o PDCA e param melhoram até o concorrente que não parou superar o padrão atingido."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M8-S1",
      "code": "M8-S1",
      "title": "Educacao, Identidade e Solidariedade",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Andragogia — Como Adultos Realmente Aprendem",
              "description": "Malcolm Knowles descobriu que adultos aprendem de forma completamente diferente de crianças. Ignorar isso é a razão pela qual treinamentos corporativos custam caro e não mudam nada.",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "A maioria dos treinamentos corporativos usa pedagogia — o modelo de ensinar crianças — em adultos experientes. Resultado: 8 horas de PowerPoint, 200 slides, retenção abaixo de 10%. Malcolm Knowles criou a andragogia em 1968: adultos têm experiência prévia, sabem por que precisam aprender e querem aplicar imediatamente. Ignorar isso é literalmente jogar dinheiro fora.\n\nOS 4 PRINCÍPIOS DA ANDRAGOGIA QUE TRANSFORMAM TREINAMENTOS\n\n🎯\n\nOrientação para Problema\n\nAdultos aprendem melhor quando o conteúdo resolve um problema real que já enfrentam. Errado: \"hoje vamos estudar comunicação assertiva\". Certo: \"vamos resolver aquela situação com cliente difícil que você relatou na semana passada\".\n\n🏗️\n\nExperiência como Base\n\nO adulto chega com repertório que deve ser aproveitado, não ignorado. \"Alguém já passou por situação parecida?\" ativa mais aprendizado do que qualquer slide. Ignorar a experiência do grupo é desperdiçar o maior ativo da sala.\n\n🔍\n\nProntidão para Aprender\n\nAdultos aprendem quando percebem que precisam daquele conhecimento agora, não quando o RH decide que é hora de treinar. Treinamento de compliance obrigatório sem contexto de aplicação = baixo engajamento garantido.\n\n⚡\n\nAplicação Imediata\n\nO adulto quer usar o que aprendeu em horas, não semanas. Microlearning (5-15 min de conteúdo aplicável imediatamente) supera aulas longas em retenção e transferência. Conhecimento sem aplicação imediata tem vida curta.\n\nA diferença prática: um treinamento pedagógico diz \"hoje você vai aprender técnicas de negociação\" (o professor decide o que é relevante). Um treinamento andragógico começa com \"qual negociação difícil você tem pela frente?\" e constrói a partir da n\n\n<truncated 9248 bytes>\n\ncrutamento\n\nA empresa rejeita candidatos tecnicamente excelentes mas culturalmente desalinhados? Se a resposta for \"nunca\" — os valores não orientam decisões de RH. Empresas com valores genuínos sabem que contratar contra a cultura tem custo maior que manter a vaga aberta.\n\nMissão poderosa é específica e diferenciadora. \"Ser a melhor empresa do setor\" não é missão — é ambição genérica que qualquer empresa poderia ter. A missão da Patagonia: \"Estamos no negócio para salvar nosso planeta\". Isso orientou a decisão de dar a empresa inteira para fundos ambientais em 2022. Quando missão e decisão difícil coincidem — a missão é genuína.\n\nMissão, visão e valores genuínos são os que você seria capaz de defender quando custam algo. Qualquer empresa consegue ter valores quando é conveniente. O teste real é o que a empresa faz quando o valor entra em conflito com a oportunidade — e o custo de honrar o valor é alto.\n\nMissão genuína é específica e excludente. Se a missão não exclui clientes, projetos ou parceiros que não se encaixam, ela não está orientando decisão nenhuma. Missão que serve para tudo não serve para nada.\n\nValores sem consequência são decoração. Valor praticado = existe prova de que a empresa tomou decisão custosa para honrá-lo. Sem essa prova, o valor existe apenas no discurso — e os funcionários sabem disso antes da primeira semana.\n\nA Enron nos ensinou a lição mais cara: palavras bonitas em valores declarados não protegem contra comportamento contraditório. O que protege são sistemas, processos e lideranças que tornam o desvio visível e custoso."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M8-S2",
      "code": "M8-S2",
      "title": "Pesquisa Aplicada a Negocios",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Quanti vs Quali — Escolha o Método Certo para Cada Pergunta",
              "description": "Pesquisa quantitativa diz O QUE e QUANTO. Qualitativa diz POR QUÊ. Usar o método errado é mais prejudicial do que não pesquisar — gera falsa certeza.",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Steve Blank ficou famoso por uma frase: \"Nenhum plano de negócio sobrevive ao primeiro contato com o cliente.\" Empresas quebram não por falta de pesquisa — mas por usar o método errado e tomar a resposta como verdade. Pesquisa com 10 pessoas não é quantitativa. Focus group não valida demanda. Cada método tem uma pergunta para a qual é a resposta certa — e perguntas para as quais é a resposta errada.\n\nOS 4 MÉTODOS DE PESQUISA APLICADA E QUANDO USAR CADA UM\n\n📊\n\nPesquisa Quantitativa\n\nUsa números e amostras grandes para responder \"O QUE\" e \"QUANTO\". Questionários, NPS, surveys com 100+ respondentes. Gera dados generalizáveis e estatisticamente válidos. Use quando já tem hipóteses e quer validar com escala.\n\n🎙️\n\nPesquisa Qualitativa\n\nEntrevistas em profundidade, observação, grupos focais. Responde \"POR QUÊ\" e \"COMO\". Amostra pequena (10-30 pessoas) com análise interpretativa. Use quando não sabe ainda o que está causando o problema — ou quando os números dizem o quê mas não o porquê.\n\n🔀\n\nMétodo Misto\n\nCombina quali + quanti em sequência estratégica. O quali gera as hipóteses; o quanti valida em escala. É o método mais robusto para decisões importantes — e o mais subestimado. 10 entrevistas + 200 questionários superam 500 questionários sozinhos.\n\n🧪\n\nPesquisa Experimental (A/B Test)\n\nTesta uma variável de cada vez com grupos de controle. Elimina viés de opinião — mede comportamento real, não intenção declarada. Padrão em digital (e-commerce, apps). \"Pessoas dizem que preferem X; quando testamos, escolhem Y\" é a lição mais cara do marketing.\n\nO erro mais caro: confundir intenção declarada com comportamento real. Em pesquisa qualitativa, 90% das pessoas dizem que pagariam por produto sustent\n\n<truncated 9383 bytes>\n\nceita previsível que o negócio gera mensalmente. MRR = Número de clientes × Ticket médio. MRR crescente com churn controlado = negócio saudável. MRR crescendo com churn acelerado = balde furado — você está enchendo e esvaziando ao mesmo tempo.\n\nA matemática do churn é contraintuitiva: churn de 8% ao mês parece manejável. Mas significa: em 1 mês, perde 8% da base. Em 3 meses, perdeu ~23%. Em 6 meses, perdeu ~40%. Em 12 meses, quase 63% da base que existia no início foi substituída. Se a aquisição não supera esse ritmo, a empresa está encolhendo enquanto parece ocupada. A alternativa correta: atacar o churn antes de escalar aquisição.\n\nLTV > 3× CAC é a regra de ouro — não uma aspiração. Abaixo dela, crescimento é aceleração do problema. Churn é o multiplicador invisível: reduzir churn de 5% para 2% ao mês dobra o LTV sem tocar em nenhum outro parâmetro. Em negócios recorrentes, a batalha mais importante é retenção — não aquisição.\n\nChurn é o vilão silencioso. Uma empresa com churn de 8%/mês que cresce 10% ao mês está encolhendo — só não percebe porque novos clientes mascaram a perda dos antigos. Calcule sempre: novos clientes > clientes perdidos?\n\nLTV/CAC < 1 significa que o modelo de negócio está errado — não a execução. Se você gasta mais para adquirir do que ganha com o cliente, nenhuma melhoria operacional resolve. O modelo precisa mudar antes de qualquer escala.\n\nA alavanca de maior ROI geralmente é o churn, não o CAC. Reduzir CAC em 20% melhora o ratio em 25%. Reduzir churn em 50% pode dobrar o LTV. Onde você investe primeiro define o resultado."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-T1-S3",
      "code": "M4-T1-S3",
      "title": "Sustentabilidade em Negocios",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Por que Sustentabilidade Virou Estratégia",
              "description": "Do TBL ao modelo de Círculos Aninhados — sustentabilidade como pilar de negócio",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "A sustentabilidade deixou de ser filantropia. Hoje é o eixo central da governança corporativa — e ignorá-la é risco financeiro. A pressão vem de investidores (critérios ESG), consumidores (escolha consciente), reguladores (LGPD, marco ESG europeu) e funcionários (propósito).\n\nA sustentabilidade nas empresas ganhou tração global a partir da década de 1990. Antes, a gestão era dominada pela visão de Milton Friedman, que pregava que a única responsabilidade social de uma empresa seria aumentar seus lucros. No entanto, crises ambientais globais e o aumento da desigualdade evidenciaram a insuficiência dessa abordagem.\n\nO entendimento de que os recursos naturais são finitos e de que a estabilidade social é pré-requisito para a continuidade econômica levou à criação de novos modelos de gestão. Em 1994, John Elkington introduziu o Triple Bottom Line — a premissa de que empresas devem prestar contas não apenas em termos econômicos, mas também sociais e ambientais.\n\nEm 2023, mais de US$ 35 trilhões em ativos globais foram geridos sob critérios ESG (Global Sustainable Investment Alliance). No Brasil, o ISE B3 mostra que empresas sustentáveis superam o Ibovespa em retorno ajustado ao risco no longo prazo. Sustentabilidade não é custo — é vantagem competitiva mensurável.\n\nTRIPLE BOTTOM LINE (TBL) — OS 3PS\n\nJohn Elkington (1994) propôs que o sucesso de uma empresa seja medido em três dimensões simultâneas — não apenas no lucro. O TBL expandiu a contabilidade corporativa para incluir impacto social e ambiental.\n\nPeople — Pessoas\n\nImpacto social\n\nCondições de trabalho, diversidade, impacto na comunidade, cadeia de fornecedores. Como a empresa afeta as pessoas ao seu redor — funcionários, comunidade, fornecedores.\n\n▸ Natura · 2010\n\nModelo de comunidades fornecedoras na Amazônia. Mais de 2.000 famíl\n\n<truncated 32274 bytes>\n\nrest Stewardship Council. Garante que papel ou madeira vem de florestas manejadas de forma responsável. Três tipos: FSC 100%, FSC Misto e FSC Reciclado.\n\n▸ Suzano · 2023\n\nMaior produtora de celulose do mundo. 100% das operações com certificação FSC. 2.4 milhões de hectares de florestas plantadas certificadas no Brasil.\n\nCradle to Cradle (C2C)\n\nEconomia circular\n\nCertifica produtos baseados na economia circular: tudo é reaproveitado, nada vira lixo. Avalia material, reutilização, energia, água e justiça social.\n\n▸ Interface (pisos) · 2020\n\nFabricante de carpetes com certificação C2C Gold. Coleta carpetes usados e transforma em novos produtos. Zero resíduo em aterro desde 2020.\n\nOUTRAS ALTERNATIVAS\n\n**1% for the Planet**: empresas que doam 1% das vendas totais para causas ambientais (Patagonia é cofundadora). **Pacto Global da ONU**: 10 princípios universais em direitos humanos, trabalho, meio ambiente e anticorrupção. **CSRD** (Corporate Sustainability Reporting Directive): diretiva europeia que torna reporte ESG obrigatório para empresas que operam na UE — afeta exportadores brasileiros.\n\nCertificações se dividem em 3 níveis: empresa inteira (B Corp, GPTW, Ethisphere), reporte (GRI, SASB, CDP, TCFD) e produto/cadeia (Fair Trade, FSC, C2C, Rainforest Alliance). Ter certificação diferencia no mercado. Não ter é risco reputacional crescente.\n\nB Corp certifica a empresa inteira — não um produto. 7.000+ empresas no mundo.\n\nCDP, TCFD e CSRD estão tornando reporte ESG obrigatório, não voluntário.\n\nCradle to Cradle é o mais exigente: prova que o ciclo é 100% fechado — zero resíduo."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-T1-S4",
      "code": "M4-T1-S4",
      "title": "Gestao de Negocios",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Fundamentos da Gestão",
              "description": "As 4 funções clássicas + visão sistêmica — a base que sustenta tudo",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "Gestão empresarial é um processo intrinsecamente dinâmico, fundamentado na administração eficiente de recursos materiais e humanos para alcançar objetivos estratégicos. Ela é influenciada por fatores econômicos, sociais e políticos, e visa o crescimento sustentável do negócio. Como aponta Damian (2018), a gestão se ancora em quatro funções essenciais: planejamento, organização, direção e controle.\n\nBrito et al. (2016) destacam que práticas gerenciais sólidas elevam padrões de qualidade, antecipam falhas e favorecem a sustentabilidade organizacional. Mas o ponto que diferencia gestor amador de gestor maduro está em ENXERGAR a empresa de forma sistêmica — não como áreas isoladas. A compreensão das interações entre áreas, recursos e pessoas transforma a gestão de mera formalidade técnica em instrumento de liderança e geração de valor.\n\nPlanejamento\n\nFunção 1 — Onde queremos chegar\n\nDefinir objetivos, metas e o caminho pra alcançá-los. Inclui análise de cenários, alocação de recursos e estabelecimento de prazos. Sem planejamento, a empresa opera por reação — toma decisão no susto. Planejamento transforma decisão em escolha consciente.\n\n▸ Damian (2018) · 2018\n\nPesquisa de Damian mostra que empresas com planejamento estratégico formal têm 30% mais chances de sobreviver os primeiros 5 anos comparadas às que operam por reação. O Capítulo 3 deste módulo aprofunda as ferramentas de planejamento (SWOT, 5 Forças, BCG).\n\nOrganização\n\nFunção 2 — Como nos estruturamos\n\nEstruturar recursos (humanos, financeiros, físicos, informacionais) pra executar o que foi planejado. Inclui definir hierarquias, processos, papéis e responsabilidades. Estrutura sem clareza vira retrabalho e fricção interna.\n\n▸ Chiavenato (2014) · 2014\n\nIdalberto Chiavenato, em \"Introdução à Teoria Geral da Administração\" (8ª ed., 2014), argumenta\n\n<truncated 17308 bytes>\n\nernança corporativa formal.\n\n▸ Magazine Luiza · 2015\n\nMigrou de LTDA familiar para S.A. aberta na B3. Permitiu captar capital para a transformação digital que multiplicou valor por 100x. Estrutura jurídica habilitou a estratégia.\n\nREGIMES TRIBUTÁRIOS\n\n3 REGIMES TRIBUTÁRIOS NO BRASIL\n\n📦\n\nSimples Nacional\n\n8 tributos em 1 guia. Alíquota de 6% a 33% conforme faturamento e atividade. Até R$ 4.8M/ano. O mais simples mas nem sempre mais barato.\n\n5.7M\n\nempresas\n\n📊\n\nLucro Presumido\n\nBase de cálculo presumida (8% comércio, 32% serviços). Até R$ 78M/ano. Pode ser mais barato que Simples para margens altas.\n\nR$ 78M\n\nlimite anual\n\n📈\n\nLucro Real\n\nImposto sobre lucro efetivo. Obrigatório acima de R$ 78M ou setores regulados. Mais complexo mas mais justo para margens baixas.\n\nObrigatório\n\nbancos, seguradoras\n\nA escolha do regime impacta diretamente quanto a empresa paga de imposto. Um restaurante com margem de 15% no Simples pode pagar mais do que no Presumido. Um SaaS com margem de 60% no Presumido pode pagar mais do que no Simples. A resposta é sempre: depende do caso. Contador é investimento, não custo.\n\nEstrutura jurídica e regime tributário são decisões estratégicas, não burocráticas. MEI para começar, ME para crescer, S.A. para escalar. Simples para simplificar, Presumido para otimizar, Real para margens baixas.\n\n15 milhões de MEIs no Brasil. Porta de entrada: R$ 70/mês e CNPJ em 15 minutos.\n\nSimples nem sempre é mais barato. Acima de certo faturamento, Presumido pode economizar 30%+.\n\nMagazine Luiza: LTDA → S.A. habilitou a transformação digital. Estrutura jurídica = habilitador estratégico."
                  }
              ]
          }
      ]
  }
  ,
  {
      "id": "M4-T1-S5",
      "code": "M4-T1-S5",
      "title": "Demonstracoes Contabeis",
      "videoUrls": [],
      "chapters": [
          {
              "title": "Fundamentos da Contabilidade",
              "description": "A linguagem universal dos negócios — o que ela é, por que existe e quem usa",
              "subsections": [
                  {
                      "title": "Conteúdo",
                      "content": "A contabilidade é a linguagem universal dos negócios. Reconhecida como ciência social aplicada, ela combina princípios contábeis com economia, administração e comportamento humano para registrar, classificar e resumir as atividades financeiras de uma empresa. É o sistema que transforma transações complexas em informações compreensíveis para gestores, investidores e órgãos reguladores.\n\nImagine a contabilidade como o idioma que as empresas usam para comunicar informações financeiras. Assim como as palavras formam frases e histórias, os números e relatórios contábeis formam a narrativa financeira de uma empresa. Sem ela, o mundo dos negócios seria um lugar muito mais incerto — gestores tomariam decisões no escuro, investidores não saberiam onde colocar dinheiro e o sistema financeiro não teria base para funcionar.\n\nRegistrar transações\n\nObjetivo 1\n\nRegistrar TODAS as transações financeiras: vendas, compras, gastos, receitas e qualquer atividade que envolva dinheiro. Esses registros são a matéria-prima de toda análise financeira — sem eles, não há histórico, não há diagnóstico, não há decisão informada.\n\n▸ Pequeno empresário típico · 2024\n\nMEI sem registro contábil sistemático fica sem saber a margem real de cada produto. Erra preço, erra estoque, erra imposto. 60% dos pequenos negócios brasileiros fecham em até 5 anos — e má gestão financeira aparece como causa principal (Sebrae, 2023).\n\nClassificar e resumir\n\nObjetivo 2\n\nOrganizar os dados em categorias claras para que possam ser compreendidos e analisados. Não basta registrar — precisa classificar (esse gasto é custo ou despesa? esse pagamento é dívida ou patrimônio?) e resumir em relatórios padronizados.\n\n▸ Plano de contas · 2024\n\nEmpresa que não classifica bem mistura tudo. Confunde investimento (compra de máquina) com despesa (conta de luz)\n\n<truncated 21229 bytes>\n\nos aportaram ao abrir ou capitalizar a empresa. É o ponto de partida do PL. Aparece no contrato social.\n\n2\n\nReservas de Lucro\n\nParcela do lucro que ficou na empresa em anos anteriores — não foi distribuída como dividendos. Aumenta o PL ao longo do tempo.\n\n3\n\nResultado do Exercício\n\nLucro ou prejuízo do ano corrente. Se lucro: PL sobe. Se prejuízo: PL desce. Ao fechar o exercício, vai para reservas ou é distribuído.\n\n4\n\nPL Negativo\n\nQuando as obrigações superam os bens + direitos. Empresa deve mais do que possui. Em startups em crescimento, pode ser estratégico por tempo limitado.\n\nExemplo completo: empresa tem R$ 500.000 em bens (máquinas + estoque) + R$ 100.000 em direitos (contas a receber) = R$ 600.000 de ativo. Deve R$ 200.000 a fornecedores + R$ 50.000 de empréstimo = R$ 250.000 de passivo. PL = R$ 600.000 − R$ 250.000 = R$ 350.000. Esse é o valor dos sócios.\n\nO patrimônio é composto por bens + direitos (o que a empresa tem e tem a receber) menos obrigações (o que ela deve). O resultado é o Patrimônio Líquido — o valor que pertence aos donos. Bens podem ser tangíveis (físicos: móveis ou imóveis) ou intangíveis (sem corpo físico). Direitos são ativos futuros. Obrigações são passivos presentes.\n\nPL = (Bens + Direitos) − Obrigações. Equação simples, interpretação poderosa — revela quem realmente possui a empresa.\n\nBens tangíveis imóveis (terrenos) não depreciam. Móveis e construções, sim. Intangíveis amortizam conforme a vida útil.\n\nObrigações trabalhistas e fiscais têm prioridade em caso de falência — ficam à frente de bancos e fornecedores. Nunca ignorar."
                  }
              ]
          }
      ]
  }

, SIG_PESSOAS
];
