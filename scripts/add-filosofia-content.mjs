import fs from 'fs'

const file = 'data/caderno-content-m1-m8.ts'
let content = fs.readFileSync(file, 'utf8')

const newSubject = `
  ,{
    "id": "M4-T1-S9",
    "code": "M4-T1-S9",
    "title": "Filosofia",
    "videoUrls": [],
    "chapters": [
      {
        "title": "1: Pensamento Crítico e Lógica nos Negócios",
        "content": "Filosofia não é abstração inútil. É a disciplina que treina o pensamento rigoroso — questionar suposições, construir argumentos e tomar decisões sob incerteza. Pensamento crítico é a capacidade de avaliar informações de forma objetiva, identificar vieses e construir conclusões fundamentadas. É a competência mais valorizada por CEOs globais (World Economic Forum, 2023).\\n\\n**FERRAMENTAS DO PENSAMENTO CRÍTICO**\\n\\n🔍 **Análise de argumentos:** Separar premissa de conclusão.\\n⚠️ **Identificação de vieses:** Viés de confirmação, ancoragem, efeito halo.\\n🧪 **Método socrático:** Perguntar 'por quê?' até chegar à premissa fundamental.\\n❌ **Detecção de falácias:** Argumentos que parecem válidos mas não são.\\n\\n**Falácia do Apelo à Autoridade:** 'O CEO da empresa X disse que funciona, logo funciona.' Autoridade não prova verdade.\\n**Correlação ≠ Causalidade:** 'Vendas subiram depois da campanha, logo a campanha causou a subida.' Pode ser sazonalidade.\\n**Viés de Confirmação:** Buscar apenas informações que confirmam o que já acredita. Ignorar ou desqualificar evidências contrárias.",
        "quote": "Estudos de caso (Erros lógicos):",
        "studyCase": {
          "title": "WeWork & Kodak",
          "body": "Adam Neumann (CEO) convenceu investidores com carisma, não dados. Valuation de US$ 47 bilhões caiu para US$ 9 bilhões. Na Kodak, o viés de confirmação custou 130 anos de história ao ignorar as câmeras digitais."
        },
        "deepDive": "Pensamento crítico é a competência #1 do século XXI. O antídoto: dados, método e humildade intelectual."
      },
      {
        "title": "2: Ética Empresarial e Epistemologia",
        "content": "Toda decisão empresarial tem dimensão ética. Demitir, precificar, terceirizar, usar dados — cada ação afeta pessoas. Os 4 frameworks éticos dão estrutura para decidir quando não há resposta fácil:\\n\\n1. **Utilitarismo (Consequências):** Bentham/Mill. A ação correta produz o maior bem para o maior número.\\n2. **Deontologia (Dever e regras):** Kant. O dever moral importa mais que a consequência.\\n3. **Ética das Virtudes (Caráter):** Aristóteles. A ação ética vem do caráter do agente.\\n4. **Ética do Cuidado (Relacionamentos):** Gilligan. Ética baseada em responsabilidade com os outros.\\n\\n**EPISTEMOLOGIA:** Como sabemos o que sabemos? Estuda o conhecimento. Karl Popper afirma que conhecimento científico é aquele que pode ser falsificado. Se não pode ser provado falso, é crença, não ciência.",
        "quote": "Ford Pinto (1978) vs Johnson & Johnson (1982)",
        "studyCase": {
          "title": "Cálculo vs Princípio",
          "body": "Ford calculou que indenizações por mortes ($49M) eram mais baratas que consertar o carro ($137M) - utilitarismo puro. A J&J gastou $100M para recolher Tylenol envenenado por dever moral (kantiano) e salvou a marca."
        },
        "deepDive": "Não existe framework ético 'melhor'. Usar os 4 juntos é a abordagem mais robusta."
      },
      {
        "title": "3: Filosofia Política, Ciência e Propósito",
        "content": "Todo modelo de negócio opera dentro de um sistema econômico baseado em premissas filosóficas.\\n\\n**Adam Smith — Mão Invisível:** O interesse próprio, guiado pela competição, leva ao bem coletivo.\\n**Karl Marx — Crítica ao Capital:** A contradição entre capital e trabalho é insolúvel, gerando exploração (mais-valia).\\n**John Rawls — Véu da Ignorância:** Se você não soubesse qual posição ocuparia na sociedade, que regras criaria? Proteção aos mais vulneráveis.\\n\\n**EXISTENCIALISMO E PROPÓSITO:** Sartre afirma que 'estamos condenados a ser livres'. Viktor Frankl ensina que pessoas que encontram significado são mais resilientes. Empresas com propósito claro têm 3x mais engajamento.",
        "quote": "Gig Economy vs Silicon Valley",
        "studyCase": {
          "title": "Sistemas em choque",
          "body": "Silicon Valley opera no extremo de Adam Smith. A Gig Economy (entregadores recebendo o mínimo por gerar bilhões) levanta debates tipicamente Marxistas sobre a mais-valia digital."
        },
        "deepDive": "Sem propósito, a empresa é máquina de lucro sem alma. Propósito não é marketing — é decisão."
      },
      {
        "title": "4: Filosofia Oriental, Linguagem, Estética e Tecnologia",
        "content": "A filosofia oriental oferece perspectivas complementares à ocidental:\\n- **Taoísmo:** Wu wei (não-ação). Criar condições para que as coisas aconteçam.\\n- **Zen Budismo:** Shoshin (mente de principiante).\\n- **Wabi-Sabi:** Aceitar o imperfeito (aplicação: MVP).\\n\\n**LINGUAGEM E ESTÉTICA:** A linguagem cria realidade (Wittgenstein). 'Reestruturação' não é o mesmo que 'Demissão'. A estética é diferencial competitivo (Apple cobrou premium por beleza e experiência).\\n\\n**FILOSOFIA DA TECNOLOGIA E ÉTICA DA IA:** A tecnologia nunca é neutra. Amplifica vieses existentes. A IA carrega os valores de quem a programou.",
        "quote": "Dilemas da IA",
        "studyCase": {
          "title": "Viés, Vigilância e Substituição",
          "body": "Monitoramento de produtividade vs privacidade. Substituição de empregos e viés algorítmico no recrutamento são as novas fronteiras éticas corporativas."
        },
        "deepDive": "A pergunta da tecnologia nunca deve ser apenas 'a IA pode fazer isso?', mas 'a IA deve fazer isso?'"
      }
    ]
  }
`

const lastBracketIndex = content.lastIndexOf(']')
if (lastBracketIndex !== -1 && !content.includes('"id": "M4-T1-S9"')) {
  const newContent = content.substring(0, lastBracketIndex) + newSubject + '\\n' + content.substring(lastBracketIndex)
  fs.writeFileSync(file, newContent)
  console.log('Filosofia content added successfully!')
} else {
  console.log('Already exists or not found.')
}
