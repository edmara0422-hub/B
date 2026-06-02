const fs = require('fs');
const contentM1M8 = fs.readFileSync('data/caderno-content-m1-m8.ts', 'utf8');

const neuroContentStr = `
  {
    id: 'N1-S1',
    code: 'NEURO-01',
    title: 'O Organismo e o SN',
    videoUrls: [
      { title: 'O Cérebro: Servo do Corpo', url: 'https://qvvqbngiwqfuxsbgcxtc.supabase.co/storage/v1/object/public/videos/SEA%20FISIO/O_Cerebro__Servo_do_Corpo.mp4' }
    ],
    chapters: [
      {
        title: 'Fundamentos Biológicos',
        subsections: [
          {
            title: 'Fundamentos',
            content: 'Um organismo não existe porque pensa — ele pensa porque consegue manter estrutura. Todo sistema vivo enfrenta manter organização interna em um universo que tende à desordem. Sistemas vivos são dissipativos: não estão em equilíbrio, lutam contra a entropia e colapsam rapidamente quando o suprimento energético cessa.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'O cérebro como sistema regulatório distribuído sob restrição energética e incerteza ambiental.' },
            deepDive: 'A membrana lipídica funciona como um capacitor biológico, separando cargas e permitindo energia armazenada na forma de gradientes iônicos (mantidos ativamente pela bomba Na⁺/K⁺-ATPase).'
          }
        ]
      },
      {
        title: 'ATP e Bomba Na⁺/K⁺',
        subsections: [
          {
            title: 'Moeda Energética',
            content: 'Toda energia utilizável nas células é intermediada por ATP (adenosina trifosfato). Sem ATP não há vida. A bomba Na⁺/K⁺-ATPase expulsa 3 Na⁺ e traz 2 K⁺, consumindo 1 ATP por ciclo. 60–80% da energia cerebral é gasta apenas para manter essas bombas funcionando.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: '3 Na⁺ (out) + 2 K⁺ (in) + 1 ATP → gradiente eletroquímico — Attwell & Laughlin, 2001.' },
            deepDive: 'O potencial de repouso é um estado de tensão elétrica mantida artificialmente. O cérebro não é caro porque pensa, ele pensa porque já é caro para existir.'
          }
        ]
      },
      {
        title: 'O que é o Sistema Nervoso',
        subsections: [
          {
            title: 'SNC e SNP',
            content: 'Rede complexa e especializada de células distribuída por todo o organismo. Coordena funções vitais, capta informações, processa dados, integra sinais e gera respostas para sobrevivência.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'Sistema Nervoso = SNC + SNP — sistema integrado de detecção, processamento e resposta.' },
            deepDive: 'O SNC abrange encéfalo e medula, protegido por crânio, meninges e BHE. O SNP conecta esse centro ao resto do corpo.'
          }
        ]
      },
      {
        title: 'Regulação, Racionalidade e Predição',
        subsections: [
          {
            title: 'A Máquina Preditiva',
            content: 'O SN deve ser compreendido como um sistema de regulação distribuída, não existindo um comando único. Racionalidade emerge de sistemas regulatórios mais antigos e é frequentemente justificativa post-hoc.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'Compreender isso é essencial para não projetar sobre o sistema nervoso propriedades que ele não possui.' },
            deepDive: 'Free Energy e Predictive Processing: o cérebro como máquina de inferência bayesiana. O cérebro não reage, ele antecipa para minimizar erros e poupar energia.'
          }
        ]
      }
    ]
  },
  {
    id: 'N1-S2',
    code: 'NEURO-02',
    title: 'Neurodesenvolvimento',
    videoUrls: [],
    chapters: [
      {
        title: 'O que é Neurodesenvolvimento',
        subsections: [
          {
            title: 'Decisões Moleculares',
            content: 'Processo de formação e maturação do SN, da 3ª semana de gestação até o início da vida adulta. Não é crescimento passivo, mas uma coreografia molecular rigorosamente orquestrada.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'O neurodesenvolvimento é uma sequência de decisões moleculares que transformam uma única camada de células no órgão mais complexo do universo conhecido.' },
            deepDive: 'Após a fecundação, a notocorda libera Sonic Hedgehog (SHH), induzindo a placa neural, que se dobra no tubo neural.'
          }
        ]
      },
      {
        title: 'Arquitetura das Vesículas e Neurogênese',
        subsections: [
          {
            title: 'Explosão Celular',
            content: 'O tubo neural se expande em 3 vesículas primárias, que se subdividem em 5 (Telencéfalo, Diencéfalo, Mesencéfalo, Metencéfalo, Mielencéfalo). Em seguida, há proliferação explosiva e migração neuronal guiada pela glia radial.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'Seleção, não expansão — o cérebro produz excessos e depois elimina o que não é necessário (apoptose e poda sináptica).' },
            deepDive: 'A sinaptogênese (0-3 anos) gera instabilidade e custo energético alto. A poda sináptica (3-10 anos) prioriza eficiência. A mielinização (20-25 anos) otimiza os circuitos finais.'
          }
        ]
      },
      {
        title: 'Períodos Críticos e Relevância Clínica',
        subsections: [
          {
            title: 'Janelas de Oportunidade',
            content: 'Períodos críticos são janelas temporais em que o cérebro é maximamente responsivo. A privação nessas janelas pode causar perdas irreversíveis (ex: visão binocular e linguagem).',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'O que não é estimulado na janela certa pode não se desenvolver plenamente.' },
            deepDive: 'Falhas no desenvolvimento geram anencefalia, lissencefalia, autismo. Na fisioterapia (ex: paralisia cerebral), trabalha-se aproveitando a plasticidade preservada.'
          }
        ]
      }
    ]
  },
  {
    id: 'N1-S3',
    code: 'NEURO-03',
    title: 'Base Celular e Fisiológica',
    videoUrls: [],
    chapters: [
      {
        title: 'Excitabilidade e Estrutura',
        subsections: [
          {
            title: 'O Capacitor Biológico',
            content: 'Uma célula excitável altera rapidamente seu potencial elétrico. A base física exige uma membrana isolante, gradientes iônicos e canais iônicos.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'Excitabilidade nasce de: membrana isolante + gradientes iônicos + canais reguláveis.' },
            deepDive: 'O SN possui neurônios (sinalizadores básicos) e glia (células de suporte). A neuróglia representa mais da metade do peso encefálico.'
          }
        ]
      },
      {
        title: 'O Neurônio: Soma, Dendritos e Axônio',
        subsections: [
          {
            title: 'Anatomia Funcional',
            content: 'O soma é o centro metabólico; os dendritos recebem sinais; o axônio conduz os potenciais de ação. Proteínas precisam ser levadas do soma para o axônio via transporte axonal.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'O soma é o "centro de comando" — sem ele, o neurônio morre. O axônio não possui ribossomos.' },
            deepDive: 'O transporte rápido via microtúbulos usa proteínas motoras e é essencial para manter as sinapses funcionais a longas distâncias.'
          }
        ]
      },
      {
        title: 'Condução Saltatória e Tipos Celulares',
        subsections: [
          {
            title: 'Mielina e Eficiência',
            content: 'A bainha de mielina (oligodendrócitos no SNC, células de Schwann no SNP) isola axônios, permitindo condução saltatória, até 60x mais rápida e econômica que a condução contínua.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'Mielina = velocidade + eficiência energética.' },
            deepDive: 'A neuróglia (astrócitos, microglia, etc.) fornece regulação, poda sináptica, imunidade e barreira, sendo indispensável para a viabilidade do sistema.'
          }
        ]
      }
    ]
  },
  {
    id: 'N1-S4',
    code: 'NEURO-04',
    title: 'Suporte, Nutrição e Proteção',
    videoUrls: [],
    chapters: [
      {
        title: 'A Cadeia Metabólica Neural',
        subsections: [
          {
            title: 'O Custo da Operação',
            content: 'O cérebro não é um processador abstrato, é metabolicamente caro e vulnerável. Consome 20% do O₂ e 25% da glicose do organismo, sem ter reservas significativas.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'Função cerebral não é produto da vontade. É produto de viabilidade metabólica.' },
            deepDive: 'Se quebrar qualquer elo (O₂, ATP, Bombas, Potencial), o sistema colapsa imediatamente.'
          }
        ]
      },
      {
        title: 'Barreira Hematoencefálica (BHE)',
        subsections: [
          {
            title: 'A Fronteira Inteligente',
            content: 'A BHE não é só uma parede; é uma interface ativa formada por endotélio, pericitos e pés astrocitários. Controla rigorosamente o que entra e sai do tecido neural.',
            quote: 'Destaque:',
            studyCase: { title: 'Ponto Chave', body: 'A BHE é a fronteira inteligente entre o sangue e o tecido neural.' },
            deepDive: 'Moléculas lipossolúveis (O₂, CO₂, anestésicos) passam livremente; substâncias hidrossolúveis exigem transporte ativo. Protege o SNC contra flutuações químicas do corpo.'
          }
        ]
      }
    ]
  },
`;

const insertPoint = contentM1M8.indexOf('export const SUBJECTS_DB: SubjectContent[] = [') + 'export const SUBJECTS_DB: SubjectContent[] = ['.length;
const newContent = contentM1M8.slice(0, insertPoint) + '\n' + neuroContentStr + contentM1M8.slice(insertPoint);

fs.writeFileSync('data/caderno-content-m1-m8.ts', newContent);
console.log('Appended proper Neuro DB format');