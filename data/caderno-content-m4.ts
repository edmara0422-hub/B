import type { CadernoModuleContent } from '@/types/caderno'

export const M4_CONTENT: CadernoModuleContent = {
  moduleId: 'M4',
  topics: [
    {
      id: 'M4-T1',
      title: 'Liderança e Gestão de Times',
      blocks: [
        {
          id: 'M4-T1-slides-1',
          type: 'slides',
          title: 'Liderança de Alta Performance',
          slides: [
            {
              title: 'O Papel do Líder Moderno',
              bullets: [
                'Liderança não é cargo — é comportamento regulatório e catalisador',
                'O líder atua como integrador de competências, direcionando esforço coletivo sob incerteza',
                'Alinhamento de propósito e metas claras reduz a entropia organizacional',
                'Foco em segurança psicológica: base para inovação e alto rendimento',
              ],
              highlight: 'Liderança de impacto orienta a performance através de clareza, empatia e metas sólidas.',
            },
            {
              title: 'Segurança Psicológica',
              bullets: [
                'Permite que membros do time expressem ideias sem medo de retaliação',
                'Promove aprendizado rápido com erros construtivos',
                'Aumenta a retenção de talentos e o engajamento de longo prazo',
                'Segundo estudos do Google (Aristotle), é o fator #1 em equipes de sucesso',
              ],
              highlight: 'Sem segurança psicológica, o silêncio corporativo drena a eficiência.',
            },
          ],
        },
        {
          id: 'M4-T1-text-1',
          type: 'text',
          title: 'Comunicação e Alinhamento',
          body: 'A comunicação clara e recorrente evita desalinhamentos e retrabalhos. Liderar equipes de alta performance exige transparência radical, estabelecimento de metas ambiciosas (OKRs) e canais abertos de comunicação bidirecional.',
        },
      ],
    },
    {
      id: 'M4-T2',
      title: 'Inteligência de Mercado e Empresas',
      blocks: [
        {
          id: 'M4-T2-slides-1',
          type: 'slides',
          title: 'Inteligência Competitiva',
          slides: [
            {
              title: 'Análise de Ecossistema',
              bullets: [
                'Mapeamento ativo de concorrentes, substitutos e novos entrantes',
                'Coleta de sinais fracos e análise de tendências de consumo',
                'Tomada de decisão baseada em dados reais, não em intuição isolada',
                'Uso de frameworks clássicos: 5 Forças de Porter e Matriz SWOT Dinâmica',
              ],
              highlight: 'A inteligência antecipa as movimentações do mercado antes que se tornem ameaças.',
            },
            {
              title: 'Cultura Orientada a Dados (Data-Driven)',
              bullets: [
                'Democratização do acesso a métricas e KPIs importantes do negócio',
                'Decisões fundamentadas em testes A/B, pesquisas e análises estatísticas',
                'Redução de vieses cognitivos na formulação de estratégias corporativas',
                'Agilidade operacional através do monitoramento em tempo real',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'M4-T3',
      title: 'Sustentabilidade e ESG Corporativo',
      blocks: [
        {
          id: 'M4-T3-slides-1',
          type: 'slides',
          title: 'Os Três Pilares do ESG',
          slides: [
            {
              title: 'Environmental (Ambiental)',
              bullets: [
                'Gestão de carbono e pegada ecológica nas operações corporativas',
                'Transição energética e eficiência no uso de recursos naturais',
                'Economia circular: do design do produto até a reciclagem de resíduos',
                'Preservação da biodiversidade e conformidade regulatória rigorosa',
              ],
              highlight: 'O pilar ambiental garante a sustentabilidade ecológica da cadeia de valor.',
            },
            {
              title: 'Social (Social)',
              bullets: [
                'Inclusão, diversidade e equidade em todos os níveis da empresa',
                'Segurança, saúde e bem-estar do colaborador',
                'Impacto positivo e engajamento com comunidades locais',
                'Direitos humanos na cadeia de fornecedores globais',
              ],
            },
            {
              title: 'Governance (Governança)',
              bullets: [
                'Ética nos negócios, transparência financeira e compliance robusto',
                'Direitos dos acionistas e estrutura balanceada do conselho de administração',
                'Combate ativo à corrupção e canais seguros de denúncia',
                'Alinhamento de compensação executiva a metas ESG',
              ],
              highlight: 'A governança sólida protege a reputação e mitiga riscos operacionais severos.',
            },
          ],
        },
      ],
    },
    {
      id: 'M4-T4',
      title: 'Feedback Estratégico',
      blocks: [
        {
          id: 'M4-T4-slides-1',
          type: 'slides',
          title: 'Cultura de Feedback Constante',
          slides: [
            {
              title: 'Princípios do Feedback Construtivo',
              bullets: [
                'Feedback deve ser específico, baseado em fatos observáveis, não em suposições',
                'Foco no comportamento e no impacto, nunca na personalidade do colaborador',
                'Processo contínuo: feedbacks semanais/quinzenais, não apenas avaliações anuais',
                'Clareza sobre os próximos passos e plano de ação conjunto',
              ],
              highlight: 'O feedback é a principal ferramenta de regulação e desenvolvimento de talentos.',
            },
            {
              title: 'Modelo SBI (Situation-Behavior-Impact)',
              bullets: [
                'Situação: contextualize o momento exato onde o comportamento ocorreu',
                'Comportamento: descreva o que o colaborador fez ou disse (fatos objetivos)',
                'Impacto: explique como esse comportamento afetou o time, o cliente ou o projeto',
                'Estimule a cocriação do plano de melhoria ou celebração do acerto',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'M4-T5',
      title: 'Gestão de Arquivos corporativos',
      blocks: [
        {
          id: 'M4-T5-slides-1',
          type: 'slides',
          title: 'Organização de Documentação e Ativos',
          slides: [
            {
              title: 'Governança da Informação',
              bullets: [
                'Classificação rigorosa de dados corporativos (confidencial, interno, público)',
                'Controle de versão unificado e prevenção de perda de dados (DLP)',
                'Políticas claras de retenção e expurgo seguro de documentos',
                'Conformidade com a LGPD e regulamentações setoriais de privacidade',
              ],
              highlight: 'A gestão profissional de arquivos evita vazamentos de dados e multas pesadas.',
            },
            {
              title: 'Estruturação de Repositórios',
              bullets: [
                'Nomenclatura padronizada e taxonomia clara de diretórios',
                'Acesso baseado em papéis (RBAC) e autenticação multifator (MFA)',
                'Facilidade de busca e indexação automatizada via metadados',
                'Backups redundantes e planos de recuperação de desastres',
              ],
            },
          ],
        },
      ],
    },
  ],
}
