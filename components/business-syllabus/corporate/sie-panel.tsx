'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, HelpCircle, Lightbulb, Edit3, Sparkles, Copy, Check, Calendar, Loader2 } from 'lucide-react'

type SieSubTab = 'forecast' | 'inovacao' | 'canvas'

export function SiePanel({ initialTab }: { initialTab?: SieSubTab }) {
  const [subTab, setSubTab] = useState<SieSubTab>(initialTab || 'forecast')

  useEffect(() => {
    if (initialTab) {
      setSubTab(initialTab)
    }
  }, [initialTab])
  
  // State for Pitch Simulator
  const [pitchName, setPitchName] = useState('BUSINESS SYLLABUS')
  const [pitchTarget, setPitchTarget] = useState('startups e PMEs de escala')
  const [pitchPain, setPitchPain] = useState('tomar decisões demoradas e erradas por falta de dados centralizados')
  const [pitchMarket, setPitchMarket] = useState('cockpit operacional inteligente')
  const [pitchDifference, setPitchDifference] = useState('nossa IA que correlaciona a saúde comportamental dos líderes com os números financeiros')
  const [pitchResult, setPitchResult] = useState('')
  const [optimizing, setOptimizing] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // State for Canvas Blocks (Interactive)
  const [canvasData, setCanvasData] = useState({
    problema: `• Decisões demoradas por falta de dados unificados.\n• Dificuldade em cruzar scores comportamentais (HHS) com runway financeiro.\n• Alternativas existentes: planilhas desconectadas e relatórios manuais.`,
    solucao: `• Cockpit operacional e estratégico unificado.\n• Score Lencioni/HHS nativo e automatizado.\n• AI Advisor em tempo real.`,
    metricas: `• LTV/CAC Ratio > 3x.\n• Runway > 18 meses.\n• Retenção Mensal (NDR) > 105%.`,
    proposta: `• Transformamos o caos operacional em previsibilidade financeira e alinhamento de liderança em 5 minutos diários.\n• Tese: Organização saudável + Finanças calibradas = Tração.`,
    vantagem: `• Algoritmo proprietário de correlação de produtividade comportamental e queima de caixa (Runway).`,
    canais: `• Vendas enterprise diretas (Outbound).\n• Redes de investidores e aceleradoras associadas.`,
    clientes: `• Startups de tecnologia em estágio de escala (Series A/B).\n• PMEs digitais em rápida expansão com times remotos.\n• Early adopters: C-Levels, Founders.`,
    custos: `• APIs de IA e Infraestrutura Cloud (40%)\n• R&D de Engenharia e Produto (40%)\n• CAC & Marketing Digital (20%)`,
    receitas: `• Assinatura SaaS recorrente por Tier (Setup: $5k flat, Licença: $1.2k/mês).\n• Upsells de análises preditivas customizadas de IA ($400/mês).`
  })

  // State for Forecast Sliders (Live Update)
  const [runwayMultiplier, setRunwayMultiplier] = useState(1)

  // Estados do Design Sprint (Google Ventures, 2016)
  const [activeSprintDay, setActiveSprintDay] = useState<number>(0)
  const [sprintChallenge, setSprintChallenge] = useState<string>('denuncias')
  const [sprintCustomText, setSprintCustomText] = useState<string>('')
  const [generatingSprint, setGeneratingSprint] = useState<boolean>(false)
  const [generationStep, setGenerationStep] = useState<string>('')
  const [sprintResult, setSprintResult] = useState<any | null>(null)

  // Estados para Diagnóstico de Maturidade Digital (Fases 1, 2, 3)
  const [empresaFase, setEmpresaFase] = useState<number>(2) // Padrão: Fase 2
  const [mercadoFase, setMercadoFase] = useState<number>(3) // Padrão: Fase 3
  const [analyzingGap, setAnalyzingGap] = useState<boolean>(false)
  const [gapAnalysisResult, setGapAnalysisResult] = useState<any | null>(null)

  const handleUpdateMaturity = (empresa: number, mercado: number) => {
    setEmpresaFase(empresa)
    setMercadoFase(mercado)
    setAnalyzingGap(true)
    
    setTimeout(() => {
      let diagnosis = ''
      let actions: string[] = []
      let metric = ''

      if (empresa === mercado) {
        if (empresa === 1) {
          diagnosis = 'Sua empresa e o mercado estão ambos na Fase 1 (Infraestrutura básica). Embora alinhado, há uma oportunidade competitiva brutal de saltar etapas direto para a Fase 3 e digitalizar de ponta a ponta.'
          actions = [
            'Migrar servidores locais legados para nuvem eficiente e paperless.',
            'Adotar o Cockpit Financeiro Business Syllabus para gerenciar liquidez em tempo real.',
            'Capacitar lideranças com ferramentas de IA para agilizar rotinas operacionais.'
          ]
          metric = '+40% de Agilidade e Redução de Papelada'
        } else if (empresa === 2) {
          diagnosis = 'Ambos operam na Fase 2 (Eficiência de Processos). Seus fluxos gerenciais são automatizados, mas o mercado está prestes a avançar rumo à Fase 3 orientada a dados comportamentais e IA.'
          actions = [
            'Cruzar dados de turnover com custos financeiros para monitorar queima de caixa.',
            'Substituir relatórios mensais manuais por telemetrias dinâmicas integradas.',
            'Capacitar times com sprints de inovação (Google Ventures) para validar ideias em 5 dias.'
          ]
          metric = '-15% de Tempo de Consolidação Estratégica'
        } else {
          diagnosis = 'Excelente! Sua empresa e o mercado operam na Fase 3 (Estratégia & IA). Para manter a liderança absoluta, é vital aprimorar modelos dinâmicos proprietários e ética de compliance.'
          actions = [
            'Calibrar algoritmos de Smart Pricing no checkout para otimização de margens.',
            'Escalar a cultura de squads de alto rendimento baseada no modelo dinâmico Business Syllabus.',
            'Fortalecer a governança ética com canais de denúncia anônimos com segurança técnica.'
          ]
          metric = '+2.5x em Margem LTV/CAC e Retenção'
        }
      } else if (empresa < mercado) {
        if (empresa === 1 && mercado === 2) {
          diagnosis = 'Sua empresa opera em Infraestrutura (Fase 1), enquanto o mercado já se consolidou em processos digitais eficientes (Fase 2). O gap de 1 fase limita seriamente a velocidade de escala de suas squads.'
          actions = [
            'Centralizar a comunicação operacional em nuvem, eliminando conversas informais soltas.',
            'Integrar um sistema de ERP unificado e paperless para gestão contábil transparente.',
            'Implementar check-ins rápidos digitais para medir atrito de líderes em squads.'
          ]
          metric = '+35% de Produtividade em Silos'
        } else if (empresa === 1 && mercado === 3) {
          diagnosis = 'Alerta Crítico: Sua empresa ainda lida com Infraestrutura básica (Fase 1) enquanto o mercado opera na Fase 3 (IA e dados preditivos). Há um sério risco de obsolescência competitiva acelerada.'
          actions = [
            'Ignorar a burocracia clássica de TI e saltar direto para soluções integradas em nuvem e IA.',
            'Adotar o AI Advisor BS para analisar a correlação entre caixa (Runway) e produtividade.',
            'Rodar uma Design Sprint de 5 dias para estruturar o primeiro MVP de tecnologia interna.'
          ]
          metric = 'Previsão de Caixa Preditiva Ativa Imediatamente'
        } else { // empresa === 2, mercado === 3
          diagnosis = 'Transição Estratégica: Sua empresa tem processos digitais sólidos (Fase 2), mas o mercado competitivo de vanguarda exige IA e tomadas de decisão preditivas em tempo real (Fase 3).'
          actions = [
            'Substituir relatórios retrospectivos baseados em planilhas por telemetrias comportamentais.',
            'Calibrar precificação dinâmica inteligente para responder à intenção de saída do cliente.',
            'Instaurar cultura de NPS e feedbacks automatizados após ações críticas de usuários.'
          ]
          metric = '+20% em Margem Operacional sobre Concorrência'
        }
      } else { // empresa > mercado
        if (empresa === 2 && mercado === 1) {
          diagnosis = 'Liderança de Processos: Sua empresa já automatizou fluxos (Fase 2) enquanto concorrentes operam com infraestrutura defasada (Fase 1). Use isso para acelerar sua captação de clientes.'
          actions = [
            'Refinar o funil de vendas digital integrando automações de CRM robustas.',
            'Otimizar o Runway financeiro com controle restrito de despesas no cockpit.',
            'Estabelecer rituais de governança corporativa no pilar gerencial do Business Syllabus.'
          ]
          metric = '-30% de Custos Operacionais contra Mercado'
        } else if (empresa === 3 && mercado === 1) {
          diagnosis = 'Liderança Disruptiva Absoluta: Sua empresa está na Fase 3 (IA & Dados Preditivos) em um mercado legado operando na Fase 1. A sua velocidade de inovação permite capturar market share de forma agressiva.'
          actions = [
            'Lançar ofertas financeiras dinâmicas e inteligentes antes que os concorrentes se atualizem.',
            'Utilizar algoritmos proprietários de IA para prever tendências do nicho.',
            'Atrair os melhores talentos de tecnologia promovendo squads ágeis autônomas.'
          ]
          metric = 'Crescimento de Escala 3x Mais Rápido que Concorrência'
        } else { // empresa === 3, mercado === 2
          diagnosis = 'Liderança Estratégica: Sua empresa opera orientada a dados em tempo real e IA (Fase 3), um passo à frente dos concorrentes focados apenas em ERPs tradicionais de processos (Fase 2).'
          actions = [
            'Aproveitar o AI Advisor para calibrar custos fixos com precisão preditiva diária.',
            'Instaurar o framework de Design Sprint para validar novas ideias em apenas 5 dias sem custo.',
            'Refinar canais de compliance para reter a confiança e segurança ética absoluta.'
          ]
          metric = '+18% em Retenção de Talentos e Clientes (NDR)'
        }
      }

      setGapAnalysisResult({
        diagnosis,
        actions,
        metric
      })
      setAnalyzingGap(false)
    }, 400)
  }

  // Inicializa o gap estratégico com Fase 2 vs Fase 3
  useEffect(() => {
    handleUpdateMaturity(2, 3)
  }, [])

  const handleGenerateSprint = () => {
    if (sprintChallenge === 'custom' && !sprintCustomText.trim()) {
      alert('Por favor, descreva o seu desafio customizado!')
      return
    }
    setGeneratingSprint(true)
    setGenerationStep('Mapeando o problema estratégico...')
    
    setTimeout(() => {
      setGenerationStep('Estruturando soluções e rascunhos de design...')
      setTimeout(() => {
        setGenerationStep('Definindo critérios de votação e storyboard...')
        setTimeout(() => {
          setGenerationStep('Modelando fachada de prototipagem rápida...')
          setTimeout(() => {
            setGenerationStep('Criando roteiro de teste com usuários finais...')
            setTimeout(() => {
              let challengeTitle = 'Desafio Customizado'
              let customText = sprintCustomText
              if (sprintChallenge === 'denuncias') {
                challengeTitle = 'Canal de Denúncias Anônimo & Seguro Business Syllabus'
              } else if (sprintChallenge === 'telemetria') {
                challengeTitle = 'MVP de Telemetria & Saúde Comportamental de Lideranças BS'
              } else if (sprintChallenge === 'pricing') {
                challengeTitle = 'Smart Pricing Dinâmico baseado em IA para Assinaturas'
              }

              const presetDays = [
                {
                  focus: sprintChallenge === 'denuncias' 
                    ? 'Mapear a jornada de um colaborador ao relatar uma conduta sensível.' 
                    : sprintChallenge === 'telemetria'
                    ? 'Mapear como a liderança monitora o esgotamento (burnout) e a fadiga dos times.'
                    : sprintChallenge === 'pricing'
                    ? 'Mapear o processo de perda de conversão (churn e abandono de carrinho).'
                    : `Mapear o problema central: ${customText}`,
                  instructions: sprintChallenge === 'denuncias'
                    ? 'Identifique os pontos críticos onde o colaborador pode sentir medo de identificação ou retaliação. Mapeie os canais atuais (geralmente e-mail ou reuniões individuais) e defina o Alvo Principal do Sprint: Garantir anonimato técnico absoluto com 100% de sentimento de segurança visual.'
                    : sprintChallenge === 'telemetria'
                    ? 'Mapeie os fluxos de atrito semanais entre squads. O Alvo Principal é criar um painel centralizado que cruze horas extras com indicadores subjetivos de stress sem sobrecarregar os gestores.'
                    : sprintChallenge === 'pricing'
                    ? 'Mapeie os pontos de preço atuais e a elasticidade do cliente BS. Defina o Alvo Principal: Testar um sistema de cupons dinâmicos da IA que detecta intenção de saída na página de checkout.'
                    : `Analise as dores, processos atuais e frustrações ligadas ao desafio "${customText}". Monte um mapa simples de jornada do usuário final e defina o Alvo Principal do Sprint: validar a menor fração possível da ideia na sexta-feira.`,
                  deliverable: 'Mapa de Jornada do Usuário & Alvo Definido',
                  tip: 'O Decisor deve dar a palavra final sobre qual área focar no mapa de fluxo para evitar desperdício.'
                },
                {
                  focus: sprintChallenge === 'denuncias'
                    ? 'Rascunhar soluções de interface ultra-seguras.'
                    : sprintChallenge === 'telemetria'
                    ? 'Pesquisar soluções de health metrics corporativas.'
                    : sprintChallenge === 'pricing'
                    ? 'Buscar modelos de e-commerce e SaaS de alta conversão.'
                    : 'Rascunhar soluções práticas baseadas em benchmarks.',
                  instructions: sprintChallenge === 'denuncias'
                    ? 'Pesquise referências de sistemas de criptografia simples (ex: Bitwarden, Proton). Cada participante do squad desenha individualmente o fluxo ideal de denúncia em 3 telas (envio rápido, recebimento de chave token única de 12 palavras, e chat anônimo temporário sem cadastro).'
                    : sprintChallenge === 'telemetria'
                    ? 'Faça Lightning Demos de ferramentas como Gallup Q12 e Slack health-checks. Desenhe um widget de check-in diário de 3 segundos que roda direto no chat corporativo do Business Syllabus.'
                    : sprintChallenge === 'pricing'
                    ? 'Pesquise como Netflix e Amazon oferecem upsells. Desenhe individualmente um pop-up inteligente que oferece desconto progressivo ou extensão de trial de forma ultra-personalizada.'
                    : `Pesquise no mercado quem já resolveu desafios semelhantes. Faça rascunhos rápidos individuais (sendo 8 variações em 8 minutos usando Crazy Eights) e prepare uma proposta em 3 etapas com foco em extrema facilidade de uso.`,
                  deliverable: 'Desenho de Solução Executivo de 3 Etapas',
                  tip: 'Não se preocupe com beleza artística, o foco total é na clareza e estrutura do fluxo lógico.'
                },
                {
                  focus: sprintChallenge === 'denuncias'
                    ? 'Escolher a melhor proposta sem discussões exaustivas.'
                    : sprintChallenge === 'telemetria'
                    ? 'Avaliar os painéis de visualização dos gestores.'
                    : sprintChallenge === 'pricing'
                    ? 'Votar na melhor oferta de valor dinâmica.'
                    : 'Criticar rascunhos, votar na melhor tese e criar Storyboard.',
                  instructions: sprintChallenge === 'denuncias'
                    ? 'Exponha os rascunhos na parede virtual. Realize a Crítica Silenciosa com dot-voting (votos em adesivos) para criar um mapa de calor das ideias mais confiáveis. Escolha a vencedora e monte o Storyboard detalhado passo a passo de como o protótipo funcionará.'
                    : sprintChallenge === 'telemetria'
                    ? 'Decida pelo layout de semáforo (Verde/Amarelo/Vermelho) para saúde das equipes. Monte o Storyboard do fluxo de alerta automático quando uma squad entra em zona crítica de burnout por 3 dias seguidos.'
                    : sprintChallenge === 'pricing'
                    ? 'Escolha o rascunho de pop-up que oferece um "upgrade de plano com desconto por 3 meses" ao invés de redução de preço permanente. Desenhe o Storyboard de checkout completo.'
                    : `Cole os desenhos na parede virtual de forma anônima. Realize uma crítica em silêncio marcando pontos de interesse com votos rápidos (dot-voting). O Decisor escolhe o vencedor estratégico. Com base na escolha, desenhe o Storyboard passo-a-passo (6 a 8 quadros).`,
                  deliverable: 'Storyboard Aprovado de 8 Passos',
                  tip: 'Use a técnica do Supervoto para dar ao Decisor a decisão final sobre o escopo que será de fato desenvolvido.'
                },
                {
                  focus: sprintChallenge === 'denuncias'
                    ? 'Construir uma fachada interativa realista (Fake it before you make it).'
                    : sprintChallenge === 'telemetria'
                    ? 'Montar a interface do dashboard estratégico no Business Syllabus App.'
                    : sprintChallenge === 'pricing'
                    ? 'Prototipar a experiência de finalização de compra.'
                    : 'Construir a "fachada" realista e interativa.',
                  instructions: sprintChallenge === 'denuncias'
                    ? 'Use ferramentas no-code (Figma, Tailwind, formulários estáticos) para criar uma tela de denúncia premium, com selo de criptografia simulado e o gerador de chave de acompanhamento. O protótipo deve parecer 100% real, embora não tenha banco de dados robusto por trás ainda.'
                    : sprintChallenge === 'telemetria'
                    ? 'Crie o mockup de telemetria com gráficos dinâmicos de stress acumulado e sugestões de intervenção ágil da IA. Use dados mockados realistas para dar substância.'
                    : sprintChallenge === 'pricing'
                    ? 'Monte uma landing page de checkout simulando a IA calculando o preço ideal em tempo real. Adicione uma barra de carregamento premium com a chamada "Ajustando plano ao perfil do Business Syllabus".'
                    : `Use as melhores ferramentas visuais disponíveis para simular a experiência real para o desafio "${challengeTitle}". Construa apenas o necessário para simular o Storyboard de quarta-feira. Deve parecer um produto polido e finalizado.`,
                  deliverable: 'Protótipo Interativo em Alta Fidelidade (Mock real)',
                  tip: 'Divida o time: um "Criador" desenha as telas, outro escreve os textos ("Redator") e um reúne tudo.'
                },
                {
                  focus: sprintChallenge === 'denuncias'
                    ? 'Testar com 5 colaboradores reais em sessões individuais.'
                    : sprintChallenge === 'telemetria'
                    ? 'Validar com 5 Gerentes de Squad e C-Levels.'
                    : sprintChallenge === 'pricing'
                    ? 'Testar com 5 potenciais clientes das PMEs.'
                    : 'Conduzir testes individuais com 5 usuários reais.',
                  instructions: sprintChallenge === 'denuncias'
                    ? 'Conduza 5 entrevistas de 45 minutos com colaboradores de diferentes squads. Peça para usarem o protótipo para denunciar um cenário fictício. Monitore suas expressões, hesitações e se o gerador de token de 12 palavras transmite confiança técnica real.'
                    : sprintChallenge === 'telemetria'
                    ? 'Coloque os gestores para simular uma tomada de decisão ao ver o alerta crítico de uma squad. Avalie se eles sabem exatamente qual ação corretiva tomar com base no dashboard.'
                    : sprintChallenge === 'pricing'
                    ? 'Apresente o protótipo a 5 Founders que abandonaram cadastros anteriores. Veja se a oferta da IA parece justa e se os incentiva a finalizar a compra imediatamente.'
                    : `Agende sessões de 1 hora com 5 usuários que representem o público-alvo real. Peça para executarem tarefas no protótipo enquanto pensam em voz alta. Documente reações, hesitações e feedbacks. Ao fim, classifique o resultado para tomar a decisão de escala.`,
                  deliverable: 'Matriz de Padrões de Feedback & Decisão Executiva',
                  tip: 'Geralmente 5 entrevistas estruturadas encontram mais de 85% de todos os problemas críticos de usabilidade e proposta de valor.'
                }
              ]

              setSprintResult({
                challenge: challengeTitle,
                customText: sprintChallenge === 'custom' ? customText : '',
                days: presetDays,
                team: {
                  decisor: sprintChallenge === 'denuncias' ? 'DPO / Diretor de Compliance' : sprintChallenge === 'telemetria' ? 'CHRO / VP de Gente e Gestão' : sprintChallenge === 'pricing' ? 'CFO / Diretor de Receita (CRO)' : 'Diretor Executivo (CEO)',
                  facilitador: 'Agile Coach / Facilitador Certificado',
                  design: 'Product Designer (UX/UI)',
                  tech: 'Engenheiro de Software Sênior',
                  experts: sprintChallenge === 'denuncias' ? 'Analista do RH e Advogado de LGPD' : sprintChallenge === 'telemetria' ? 'Líder de Squad e Especialista de D&I' : sprintChallenge === 'pricing' ? 'Gerente de Vendas e CS' : 'Especialista de Operações'
                },
                risks: {
                  title: sprintChallenge === 'denuncias' 
                    ? 'Medo de identificação pessoal por parte do colaborador.'
                    : sprintChallenge === 'telemetria'
                    ? 'Lideranças não agindo frente aos alertas por sobrecarga de rotina.'
                    : sprintChallenge === 'pricing'
                    ? 'Rejeição de clientes por variação dinâmica percebida de preços.'
                    : 'Falta de engajamento do público-alvo nos testes de sexta-feira.',
                  mitigation: sprintChallenge === 'denuncias'
                    ? 'Garantir que a arquitetura não grave IPs ou cookies e usar tokens descartáveis.'
                    : sprintChallenge === 'telemetria'
                    ? 'Implementar regras claras que barram reuniões de squads com burnout detectado.'
                    : sprintChallenge === 'pricing'
                    ? 'Limpar as regras oferecendo descontos exclusivos ao invés de penalizar o usuário comum.'
                    : 'Agendar com antecedência de 3 dias oferecendo incentivos de valor real.'
                }
              })
              setGeneratingSprint(false)
              setActiveSprintDay(0)
            }, 600)
          }, 600)
        }, 600)
      }, 600)
    }, 600)
  }

  const handleCanvasChange = (key: keyof typeof canvasData, val: string) => {
    setCanvasData(prev => ({ ...prev, [key]: val }))
  }

  const handleSimulatePitch = () => {
    if (!pitchName || !pitchTarget || !pitchPain || !pitchMarket || !pitchDifference) {
      alert('Por favor, preencha todos os campos do Pitch!')
      return
    }
    const pitch = `Para ${pitchTarget} que sofrem com ${pitchPain}, o ${pitchName} é um ${pitchMarket} que entrega máxima clareza estratégica. Ao contrário de planilhas engessadas e relatórios manuais, nosso grande diferencial competitivo é ${pitchDifference}. Quer conhecer em uma demo de 5 minutos?`
    setPitchResult(pitch)
    setCopied(false)
  }

  const handleCopyPitch = () => {
    if (!pitchResult) return
    navigator.clipboard.writeText(pitchResult)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOptimizePitch = () => {
    if (!pitchResult) return
    setOptimizing(true)
    setTimeout(() => {
      let optimized = pitchResult.replace('entrega máxima clareza estratégica.', 'transforma dados desconectados em $120k economizados de desperdício em média.')
      optimized = optimized.replace('Quer conhecer em uma demo de 5 minutos?', 'Podemos sincronizar uma demonstração nesta terça às 14h?')
      setPitchResult(optimized)
      setOptimizing(false)
    }, 1000)
  }

  return (
    <div className="w-full space-y-4">
      <style>{`
        .dash-card-systems {
          background: rgba(5, 5, 5, 0.45) !important;
          backdrop-filter: blur(28px) saturate(130%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
          border: none !important;
          border-radius: 14px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(0, 0, 0, 0.85),
            0 12px 40px rgba(0, 0, 0, 0.55) !important;
          transition: all .3s cubic-bezier(.22,.61,.36,1);
        }
        .dash-card-systems::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(90deg, #cbd5e1 0%, #d2af5a 100%) !important;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .system-tab-btn {
          font-family: inherit; font-size: 11px; letter-spacing: .03em;
          color: #8a9098; background: transparent; border: none;
          padding: 6px 16px; border-radius: 6px; cursor: pointer;
          transition: all .2s ease-in-out;
        }
        .system-tab-btn.active {
          background: rgba(201, 148, 58, 0.1) !important;
          border: 0.2px solid rgba(201, 148, 58, 0.3) !important;
          color: #e0c887 !important;
        }
      `}</style>
      {/* Sub tabs Row */}
      <div className="flex gap-2 border-b border-white/[0.06] pb-2.5">
        {(['forecast', 'inovacao', 'canvas'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`system-tab-btn flex items-center gap-1.5 ${subTab === tab ? 'active' : ''}`}
          >
            {tab === 'forecast' && (
              <>
                <span>Meu Negócio, Cenários & Forecast</span>
                <span className="text-[7px] font-mono opacity-50 bg-white/10 px-1 py-0.2 rounded border border-white/5">IE</span>
              </>
            )}
            {tab === 'inovacao' && (
              <>
                <span>Inovação</span>
                <span className="text-[7px] font-mono opacity-50 bg-white/10 px-1 py-0.2 rounded border border-white/5">IE</span>
              </>
            )}
            {tab === 'canvas' && (
              <>
                <span>Canvas & Pitch</span>
                <span className="text-[7px] font-mono opacity-50 bg-white/10 px-1 py-0.2 rounded border border-white/5">IE</span>
              </>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'forecast' && (
          <motion.div
            key="forecast"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 01 ◆ Cenários & Forecast</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Cockpit <span className="text-[#d2af5a] font-medium">Estratégico</span>
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-lg">
                    Onde estamos hoje? Para onde vamos? Projeções de caixa e forecast de crescimento.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d2af5a]/5 border border-[#d2af5a]/15 text-[8.5px] font-mono text-[#d2af5a]">
                  <TrendingUp className="h-3 w-3" />
                  <span>PREVISÃO INTERATIVA</span>
                </div>
              </div>

              {/* Diagnóstico de Transformação Digital & Gap Analyzer */}
              <div className="bg-black/25 border border-white/[0.04] p-5 rounded-xl mb-6 space-y-5">
                <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                  <div>
                    <span className="block text-[8px] font-mono font-bold tracking-wider text-[#d2af5a] uppercase">DIAGNÓSTICO ESTRATÉGICO</span>
                    <h4 className="text-[12px] font-semibold text-white mt-0.5">Fases de Transformação Digital & Análise de Gap</h4>
                  </div>
                  <span className="text-[8px] font-mono bg-[#d2af5a]/15 text-[#e0c887] px-2 py-0.5 rounded uppercase">AUTO-AVALIAÇÃO</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Seleção de Fases */}
                  <div className="space-y-4">
                    {/* Fase da Empresa */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">
                        1. Em qual fase sua empresa está hoje?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: 1, label: 'Fase 1', desc: 'Infraestrutura (Anos 2000)' },
                          { val: 2, label: 'Fase 2', desc: 'Processo (Anos 2010)' },
                          { val: 3, label: 'Fase 3', desc: 'Estratégia (Anos 2020 →)' }
                        ].map(f => (
                          <button
                            key={f.val}
                            onClick={() => handleUpdateMaturity(f.val, mercadoFase)}
                            className={`p-2 rounded-lg border text-left transition cursor-pointer select-none flex flex-col justify-between min-h-[64px] ${
                              empresaFase === f.val 
                                ? 'bg-[#d2af5a]/10 border-[#d2af5a]/50 text-white shadow-[0_0_10px_rgba(210,175,90,0.1)]'
                                : 'bg-black/25 border-white/[0.04] text-white/40 hover:border-white/10 hover:text-white/60'
                            }`}
                          >
                            <span className="block text-[8.5px] font-mono tracking-wider font-bold uppercase">{f.label}</span>
                            <span className="block text-[7.5px] leading-tight mt-1">{f.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fase do Mercado */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">
                        2. Em qual fase o mercado ao redor já chegou?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: 1, label: 'Fase 1', desc: 'Infraestrutura (Anos 2000)' },
                          { val: 2, label: 'Fase 2', desc: 'Processo (Anos 2010)' },
                          { val: 3, label: 'Fase 3', desc: 'Estratégia (Anos 2020 →)' }
                        ].map(f => (
                          <button
                            key={f.val}
                            onClick={() => handleUpdateMaturity(empresaFase, f.val)}
                            className={`p-2 rounded-lg border text-left transition cursor-pointer select-none flex flex-col justify-between min-h-[64px] ${
                              mercadoFase === f.val 
                                ? 'bg-[#d2af5a]/10 border-[#d2af5a]/50 text-white shadow-[0_0_10px_rgba(210,175,90,0.1)]'
                                : 'bg-black/25 border-white/[0.04] text-white/40 hover:border-white/10 hover:text-white/60'
                            }`}
                          >
                            <span className="block text-[8.5px] font-mono tracking-wider font-bold uppercase">{f.label}</span>
                            <span className="block text-[7.5px] leading-tight mt-1">{f.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Gap Analysis Result Display */}
                  <div className="relative border border-[#d2af5a]/15 bg-gradient-to-br from-[#1c150c]/30 to-[#0a0a0c]/80 rounded-xl p-4 flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(201,148,58,0.04),transparent_60%)]" />
                    
                    {analyzingGap ? (
                      <div className="flex flex-col justify-center items-center h-full min-h-[140px] text-center gap-2">
                        <Loader2 className="h-5 w-5 text-[#d2af5a] animate-spin" />
                        <span className="text-[9px] font-mono text-[#d2af5a] animate-pulse">AI Advisor analisando gap digital...</span>
                      </div>
                    ) : gapAnalysisResult ? (
                      <div className="space-y-3 relative z-10 animate-fadeIn">
                        {/* Status / Title */}
                        <div className="flex justify-between items-center text-[8px] font-mono">
                          <span className="text-[#d2af5a] uppercase font-bold tracking-wider">ANÁLISE DE GAP DIGITAL</span>
                          {empresaFase > mercadoFase && <span className="text-[#5dcaa5] font-bold">✓ VANGUARDA / LIDERANÇA</span>}
                          {empresaFase === mercadoFase && <span className="text-[#fac775] font-bold">● ALINHADO COM MERCADO</span>}
                          {empresaFase < mercadoFase && <span className="text-[#e24b4a] font-bold">⚠️ GAP ESTRATÉGICO DETECTADO</span>}
                        </div>

                        {/* Diagnostic */}
                        <p className="text-[10px] leading-relaxed text-white/95">
                          {gapAnalysisResult.diagnosis}
                        </p>

                        {/* Action Plan */}
                        <div className="space-y-1 border-t border-white/[0.05] pt-2">
                          <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider">PLANO DE AÇÃO ESTRATÉGICO IA</span>
                          <ul className="space-y-1">
                            {gapAnalysisResult.actions.map((act: string, idx: number) => (
                              <li key={idx} className="text-[9px] text-white/70 flex items-start gap-1">
                                <span className="text-[#d2af5a] mt-0.5">•</span>
                                <span className="leading-snug">{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Metric */}
                        <div className="flex justify-between items-center border-t border-white/[0.05] pt-2 text-[8px] font-mono">
                          <span className="text-white/40">RETORNO ESTIMADO (KPI)</span>
                          <span className="text-[#5dcaa5] font-bold">{gapAnalysisResult.metric}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Forecast adjustment slider */}
              <div className="bg-black/25 border border-white/[0.04] p-4 rounded-xl mb-6 space-y-2">
                <div className="flex justify-between text-[9px] font-mono text-white/55">
                  <span>AJUSTE MULTIPLICADOR DE TRAÇÃO</span>
                  <span className="text-[#d2af5a] font-bold">{runwayMultiplier.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={runwayMultiplier}
                  onChange={(e) => setRunwayMultiplier(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d2af5a]"
                />
              </div>

              {/* Forecast SVG Chart */}
              <div className="w-full bg-black/15 p-4 rounded-xl border border-white/[0.04]">
                <svg viewBox="0 0 800 280" className="w-full h-[220px] lg:h-[260px]">
                  <defs>
                    <linearGradient id="fcA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#e8cc88" stop-opacity={0.35 * runwayMultiplier}/>
                      <stop offset="100%" stop-color="#e8cc88" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  <g stroke="rgba(180,145,70,0.06)">
                    <line x1="0" y1="60" x2="800" y2="60"/>
                    <line x1="0" y1="120" x2="800" y2="120"/>
                    <line x1="0" y1="180" x2="800" y2="180"/>
                    <line x1="0" y1="240" x2="800" y2="240"/>
                  </g>
                  
                  {/* Fill Area Optimistic */}
                  <path d={`M0,230 L66,210 L133,190 L200,${165 / runwayMultiplier} L266,${140 / runwayMultiplier} L333,${110 / runwayMultiplier} L400,${85 / runwayMultiplier} L466,${65 / runwayMultiplier} L533,${50 / runwayMultiplier} L600,${38 / runwayMultiplier} L666,${30 / runwayMultiplier} L733,${22 / runwayMultiplier} L800,${18 / runwayMultiplier} L800,280 L0,280 Z`} fill="url(#fcA)"/>
                  
                  {/* Optimistic Line (Gold) */}
                  <path d={`M0,230 L66,210 L133,190 L200,${165 / runwayMultiplier} L266,${140 / runwayMultiplier} L333,${110 / runwayMultiplier} L400,${85 / runwayMultiplier} L466,${65 / runwayMultiplier} L533,${50 / runwayMultiplier} L600,${38 / runwayMultiplier} L666,${30 / runwayMultiplier} L733,${22 / runwayMultiplier} L800,${18 / runwayMultiplier}`} fill="none" stroke="#e8cc88" strokeWidth="2.5"/>
                  
                  {/* Base Line (Silver) */}
                  <path d={`M0,240 L66,232 L133,222 L200,${210 / (runwayMultiplier * 0.9)} L266,${196 / (runwayMultiplier * 0.9)} L333,${182 / (runwayMultiplier * 0.9)} L400,${166 / (runwayMultiplier * 0.9)} L466,${150 / (runwayMultiplier * 0.9)} L533,${138 / (runwayMultiplier * 0.9)} L600,${124 / (runwayMultiplier * 0.9)} L666,${114 / (runwayMultiplier * 0.9)} L733,${104 / (runwayMultiplier * 0.9)} L800,${96 / (runwayMultiplier * 0.9)}`} fill="none" stroke="#c0c5cc" strokeWidth="2"/>
                  
                  {/* Pessimistic Line (Dotted Gray) */}
                  <path d="M0,250 L66,246 L133,242 L200,236 L266,230 L333,222 L400,214 L466,208 L533,200 L600,194 L666,188 L733,182 L800,176" fill="none" stroke="#6e6a70" strokeWidth="1.8" strokeDasharray="6 4"/>
                  
                  {/* X Axis Labels */}
                  <g fill="#b8975a" font-family="Poppins, sans-serif" font-size="9" font-weight="500">
                    <text x="0" y="270">JAN</text>
                    <text x="200" y="270">ABR</text>
                    <text x="400" y="270">JUL</text>
                    <text x="600" y="270">OUT</text>
                    <text x="770" y="270">DEZ</text>
                  </g>

                  {/* Dynamic value chips */}
                  <g font-family="Poppins, sans-serif" font-size="10.5" font-weight="600">
                    <text x="796" y={Math.max(25, 18 / runwayMultiplier)} textAnchor="end" fill="#e8cc88">Otimista · R$ {(142 * runwayMultiplier).toFixed(0)}k</text>
                    <text x="796" y={Math.max(105, 96 / (runwayMultiplier * 0.9))} textAnchor="end" fill="#c0c5cc">Base · R$ {(98 * runwayMultiplier).toFixed(0)}k</text>
                    <text x="796" y="180" textAnchor="end" fill="#7a7680">Pessimista · R$ 62k</text>
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'inovacao' && (
          <motion.div
            key="inovacao"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 animate-fadeIn"
          >
            {/* DESIGN SPRINT WORKSPACE - GOOGLE VENTURES */}
            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">
                    METODOLOGIA ÁGIL ◆ GOOGLE VENTURES (2016)
                  </div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Design Sprint <span className="text-[#d2af5a] font-medium">Guiado por IA</span>
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-xl">
                    Valide ideias críticas em apenas 5 dias sem construir produto: mapear o problema (segunda), desenhar soluções (terça), decidir a melhor (quarta), prototipar (quinta) e testar com usuários (sexta).
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d2af5a]/5 border border-[#d2af5a]/15 text-[8.5px] font-mono text-[#d2af5a]">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  <span>SPRINT COPILOT ATIVO</span>
                </div>
              </div>

              {/* AI Copilot Input Box */}
              <div className="bg-black/25 border border-white/[0.04] p-5 rounded-xl mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase text-[#d2af5a] tracking-wider">
                      Selecione o Desafio do Sprint
                    </label>
                    <select
                      value={sprintChallenge}
                      onChange={(e) => setSprintChallenge(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition cursor-pointer"
                    >
                      <option value="denuncias">Canal de Denúncias Anônimo & Seguro (Compliance)</option>
                      <option value="telemetria">MVP de Telemetria de Liderança (Capital Humano)</option>
                      <option value="pricing">Smart Pricing Dinâmico de Assinaturas (Financeiro)</option>
                      <option value="custom">Descrever um Desafio Customizado...</option>
                    </select>
                  </div>

                  {sprintChallenge === 'custom' && (
                    <div className="space-y-1.5 animate-fadeIn">
                      <label className="block text-[9px] font-mono uppercase text-[#d2af5a] tracking-wider">
                        Descreva o seu Desafio de Negócio
                      </label>
                      <input
                        type="text"
                        value={sprintCustomText}
                        onChange={(e) => setSprintCustomText(e.target.value)}
                        placeholder="Ex: Criar um onboarding automatizado para clientes enterprise"
                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-xs text-white placeholder-white/35 outline-none focus:border-[#d2af5a]/50 transition"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleGenerateSprint}
                    disabled={generatingSprint}
                    className="px-5 py-2.5 rounded-md bg-[#d2af5a] hover:bg-[#c5a55a] text-black font-semibold text-xs tracking-wide transition flex items-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    {generatingSprint ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Planejando Sprint...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Gerar Roteiro Customizado de 5 Dias com IA</span>
                      </>
                    )}
                  </button>

                  {generatingSprint && (
                    <span className="text-[10px] font-mono text-[#d2af5a] animate-pulse">
                      {generationStep}
                    </span>
                  )}
                </div>
              </div>

              {/* Design Sprint Timeline & Details */}
              {sprintResult ? (
                <div className="space-y-6 border-t border-white/[0.06] pt-6 animate-fadeIn">
                  {/* Selected Challenge Badge */}
                  <div className="flex justify-between items-center bg-[#d2af5a]/5 border-l-2 border-[#d2af5a] px-4 py-2.5 rounded-r-md">
                    <div className="text-[11.5px] text-white/90">
                      🎯 Sprint Planejado para: <strong className="text-[#e0c887] font-semibold">{sprintResult.challenge}</strong>
                    </div>
                    <span className="text-[8px] font-mono bg-[#d2af5a]/10 text-[#d2af5a] px-1.5 py-0.5 rounded uppercase">
                      5 Dias Ativos
                    </span>
                  </div>

                  {/* 5-Day Visual Timeline Tabs */}
                  <div className="grid grid-cols-5 gap-2">
                    {['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map((dayLabel, index) => {
                      const isActive = activeSprintDay === index
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveSprintDay(index)}
                          className={`p-3 rounded-lg border text-center transition flex flex-col justify-center items-center gap-1 cursor-pointer select-none ${
                            isActive 
                              ? 'bg-[#d2af5a]/10 border-[#d2af5a]/50 text-white shadow-[0_0_15px_rgba(210,175,90,0.15)]'
                              : 'bg-black/15 border-white/[0.04] text-white/40 hover:border-white/10 hover:text-white/60'
                          }`}
                        >
                          <span className="block text-[8px] font-mono tracking-widest font-bold uppercase">{dayLabel}</span>
                          <span className="block text-[9.5px] font-medium leading-none truncate max-w-full">
                            {index === 0 && 'Mapear'}
                            {index === 1 && 'Desenhar'}
                            {index === 2 && 'Decidir'}
                            {index === 3 && 'Prototipar'}
                            {index === 4 && 'Testar'}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Day Content Card */}
                  <div className="bg-black/20 border border-white/[0.04] rounded-xl p-5 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-white/[0.05] pb-3">
                      <div>
                        <span className="block text-[8.5px] font-mono text-[#d2af5a] tracking-wider uppercase font-semibold">
                          DIA {activeSprintDay + 1} ◆ DETALHAMENTO DO ROTEIRO
                        </span>
                        <h4 className="text-sm font-semibold text-white mt-0.5">
                          {activeSprintDay === 0 && 'Segunda-feira: Mapear o Problema Principal'}
                          {activeSprintDay === 1 && 'Terça-feira: Desenhar Soluções Alternativas'}
                          {activeSprintDay === 2 && 'Quarta-feira: Decidir as Melhores Ideias'}
                          {activeSprintDay === 3 && 'Quinta-feira: Prototipar a Fachada do Produto'}
                          {activeSprintDay === 4 && 'Sexta-feira: Entrevistar Usuários Reais'}
                        </h4>
                      </div>
                      <div className="self-start sm:self-center px-2 py-0.5 rounded bg-[#d2af5a]/10 text-[9px] font-mono text-[#d2af5a] border border-[#d2af5a]/20">
                        {activeSprintDay === 0 && 'MAPEAMENTO E ALVO'}
                        {activeSprintDay === 1 && 'BENCHMARK E ESBOÇO'}
                        {activeSprintDay === 2 && 'VOTAÇÃO E STORYBOARD'}
                        {activeSprintDay === 3 && 'CONSTRUÇÃO DE FACHADA'}
                        {activeSprintDay === 4 && 'VALIDAÇÃO EM CAMPO'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Col 1: Cronograma Hora a Hora */}
                      <div className="bg-black/35 p-3.5 border border-white/[0.04] rounded-xl space-y-3">
                        <span className="block text-[8px] font-mono text-[#d2af5a] font-bold uppercase tracking-wider">⏱️ CRONOGRAMA</span>
                        <div className="space-y-2.5 text-[9px] font-mono text-white/75">
                          {activeSprintDay === 0 && (
                            <>
                              <div><strong className="text-[#d2af5a]">09h00:</strong> Meta de Longo Prazo</div>
                              <div><strong className="text-[#d2af5a]">10h30:</strong> Mapear Jornada</div>
                              <div><strong className="text-[#d2af5a]">14h00:</strong> Ouvir Especialistas</div>
                              <div><strong className="text-[#d2af5a]">16h30:</strong> Escolha do Alvo</div>
                            </>
                          )}
                          {activeSprintDay === 1 && (
                            <>
                              <div><strong className="text-[#d2af5a]">09h00:</strong> Lightning Demos</div>
                              <div><strong className="text-[#d2af5a]">11h00:</strong> Buscar Benchmarks</div>
                              <div><strong className="text-[#d2af5a]">14h00:</strong> Crazy Eights</div>
                              <div><strong className="text-[#d2af5a]">16h00:</strong> Desenho 3 Etapas</div>
                            </>
                          )}
                          {activeSprintDay === 2 && (
                            <>
                              <div><strong className="text-[#d2af5a]">09h00:</strong> Museu de Arte</div>
                              <div><strong className="text-[#d2af5a]">10h00:</strong> Crítica Silenciosa</div>
                              <div><strong className="text-[#d2af5a]">11h30:</strong> Supervoto Decisor</div>
                              <div><strong className="text-[#d2af5a]">14h00:</strong> Storyboard Final</div>
                            </>
                          )}
                          {activeSprintDay === 3 && (
                            <>
                              <div><strong className="text-[#d2af5a]">09h00:</strong> Escolha de Mocks</div>
                              <div><strong className="text-[#d2af5a]">10h30:</strong> Divisão de Papéis</div>
                              <div><strong className="text-[#d2af5a]">13h30:</strong> Construção Rápida</div>
                              <div><strong className="text-[#d2af5a]">16h30:</strong> Teste Seco Interno</div>
                            </>
                          )}
                          {activeSprintDay === 4 && (
                            <>
                              <div><strong className="text-[#d2af5a]">09h00:</strong> Setup Sala de Testes</div>
                              <div><strong className="text-[#d2af5a]">10h00:</strong> Entrevistas 1 e 2</div>
                              <div><strong className="text-[#d2af5a]">13h00:</strong> Quadro de Padrões</div>
                              <div><strong className="text-[#d2af5a]">14h30:</strong> Entrevistas 3, 4 e 5</div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Col 2-3: Foco e Instruções Principais */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="space-y-1">
                          <span className="block text-[9px] font-mono text-white/40 uppercase">Foco Estratégico do Dia</span>
                          <p className="text-xs text-white/90 leading-relaxed font-semibold">
                            {sprintResult.days[activeSprintDay].focus}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <span className="block text-[9px] font-mono text-white/40 uppercase">Instruções de Execução da IA</span>
                          <p className="text-xs text-white/70 leading-relaxed">
                            {sprintResult.days[activeSprintDay].instructions}
                          </p>
                        </div>
                      </div>

                      {/* Col 4: Entregável & Governança */}
                      <div className="bg-[#d2af5a]/[0.02] border-l border-white/10 p-4 rounded-r-xl space-y-4">
                        <div className="space-y-1">
                          <span className="block text-[8px] font-mono text-[#5dcaa5] uppercase font-bold tracking-wider">ENTREGÁVEL DO DIA</span>
                          <span className="block text-xs font-bold text-white/90 leading-snug">
                            📌 {sprintResult.days[activeSprintDay].deliverable}
                          </span>
                        </div>

                        <div className="space-y-1 border-t border-white/[0.05] pt-3">
                          <span className="block text-[8px] font-mono text-[#fac775] uppercase font-bold tracking-wider">RISCO & MITIGAÇÃO</span>
                          <p className="text-[10px] text-white/60 leading-relaxed">
                            ⚠️ <strong>{sprintResult.risks.title}</strong><br />
                            {sprintResult.risks.mitigation}
                          </p>
                        </div>

                        <div className="space-y-1 border-t border-white/[0.05] pt-3">
                          <span className="block text-[8px] font-mono text-[#d2af5a] uppercase font-bold tracking-wider">DICA ESTRATÉGICA</span>
                          <p className="text-[10.5px] italic text-white/50 leading-relaxed">
                            💡 "{sprintResult.days[activeSprintDay].tip}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Suggested Team Section */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 border-t border-white/[0.06] pt-4 font-sans select-none">
                    <div className="text-[9px] font-mono text-white/40 uppercase flex items-center">
                      👥 Time Sugerido do Sprint:
                    </div>
                    <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                      <span className="block text-[7.5px] font-mono text-[#d2af5a] uppercase font-bold">👑 Decisor</span>
                      <span className="block text-[9.5px] text-white/80 mt-0.5 truncate">{sprintResult.team.decisor}</span>
                    </div>
                    <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                      <span className="block text-[7.5px] font-mono text-[#5dcaa5] uppercase font-bold">🗣️ Facilitador</span>
                      <span className="block text-[9.5px] text-white/80 mt-0.5 truncate">{sprintResult.team.facilitador}</span>
                    </div>
                    <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                      <span className="block text-[7.5px] font-mono text-[#fac775] uppercase font-bold">🎨 Designer</span>
                      <span className="block text-[9.5px] text-white/80 mt-0.5 truncate">{sprintResult.team.design}</span>
                    </div>
                    <div className="p-2 bg-white/[0.01] border border-white/[0.03] rounded-lg">
                      <span className="block text-[7.5px] font-mono text-[#c8cdd3] uppercase font-bold">💻 Dev / Tech</span>
                      <span className="block text-[9.5px] text-white/80 mt-0.5 truncate">{sprintResult.team.tech}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-white/10 rounded-xl p-8 text-center bg-black/10">
                  <Calendar className="h-8 w-8 text-[#d2af5a]/50 mx-auto mb-3" />
                  <h4 className="text-xs font-semibold text-white mb-1">Aguardando desafio para planejar o Design Sprint</h4>
                  <p className="text-[10px] text-white/40 max-w-sm mx-auto leading-relaxed">
                    Selecione ou descreva o desafio crítico do seu negócio e use nosso AI Copilot acima para gerar um roteiro de validação Google Ventures completo e adaptado de 5 dias.
                  </p>
                </div>
              )}
            </div>

            {/* MATRIZ DE INOVAÇÃO & GOVERNANÇA DE P&D COMPLEMENTAR */}
            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 03 ◆ Inovação</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Governança e <span className="text-[#d2af5a] font-medium">Matriz de Inovação</span>
                  </h3>
                  <p className="text-[10px] text-white/45 mt-0.5">Complementação de alocação P&D e maturidade no Hype Cycle</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d2af5a]/5 border border-[#d2af5a]/15 text-[8.5px] font-mono text-[#d2af5a]">
                  <Lightbulb className="h-3 w-3" />
                  <span>AMBIENTE P&D</span>
                </div>
              </div>

              {/* Tipo e Intensidade layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tipo de Inovação */}
                <div className="bg-black/15 p-5 rounded-xl border border-white/[0.04]">
                  <h4 className="text-[11px] lg:text-xs font-semibold text-white tracking-wider border-b border-white/[0.06] pb-3 mb-4 uppercase">
                    TIPO DE PRÁTICA DO BS
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d2af5a] focus:ring-0 focus:ring-offset-0 accent-[#d2af5a]" />
                      <span>📦 Produto / Serviço</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d2af5a] focus:ring-0 focus:ring-offset-0 accent-[#d2af5a]" />
                      <span>⚙️ Processo</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer select-none">
                      <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d2af5a] focus:ring-0 focus:ring-offset-0 accent-[#d2af5a]" />
                      <span>🏛️ Organizacional</span>
                    </label>
                    <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#d2af5a] focus:ring-0 focus:ring-offset-0 accent-[#d2af5a]" />
                      <span>♟️ Modelo de Negócio</span>
                    </label>
                  </div>
                </div>

                {/* Intensidade */}
                <div className="bg-black/15 p-5 rounded-xl border border-white/[0.04]">
                  <h4 className="text-[11px] lg:text-xs font-semibold text-white tracking-wider border-b border-white/[0.06] pb-3 mb-4 uppercase">
                    NÍVEL DE INTENSIDADE
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">
                      <span className="block text-[11px] font-bold text-[#5dcaa5]">Rotina</span>
                      <span className="block text-[10px] text-white/50 mt-0.5">Renovação incremental — baixo risco, baixo impacto.</span>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">
                      <span className="block text-[11px] font-bold text-[#fac775]">Radical</span>
                      <span className="block text-[10px] text-white/50 mt-0.5">Novas competências tecnológicas — alto investimento.</span>
                    </div>
                    <div className="p-3 bg-[#d2af5a]/5 border-l-2 border-[#d2af5a] rounded-r-lg">
                      <div className="flex justify-between items-center">
                        <span className="block text-[11px] font-bold text-[#d2af5a]">Disruptiva</span>
                        <span className="text-[7.5px] font-mono bg-[#d2af5a]/15 text-[#e0c887] px-1 rounded">ATUAL</span>
                      </div>
                      <span className="block text-[10px] text-white/70 mt-0.5">Mudança no modelo de negócio — escolhas estratégicas.</span>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">
                      <span className="block text-[11px] font-bold text-[#e24b4a]">Arquitetônica</span>
                      <span className="block text-[10px] text-white/50 mt-0.5">Maior impacto — afeta modelo E tecnologia simultaneamente.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hype Cycle Section */}
              <div className="mt-8">
                <h4 className="text-[11px] lg:text-xs font-semibold text-white tracking-wider border-b border-white/[0.06] pb-3 mb-5 uppercase">
                  HYPE CYCLE — ONDE ESTAMOS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-black/25 border border-white/[0.04] p-4 rounded-xl relative overflow-hidden">
                    <span className="absolute top-2 right-3 text-[14px] font-mono font-bold text-white/10">1</span>
                    <span className="block text-xs font-bold text-[#5dcaa5] mb-1">Gatilho Tecnológico</span>
                    <span className="block text-[10.5px] text-white/45 leading-relaxed">Tecnologia surge. Primeiras provas de conceito.</span>
                  </div>
                  <div className="bg-black/25 border border-white/[0.04] p-4 rounded-xl relative overflow-hidden">
                    <span className="absolute top-2 right-3 text-[14px] font-mono font-bold text-white/10">2</span>
                    <span className="block text-xs font-bold text-[#fac775] mb-1">Pico de Expectativas</span>
                    <span className="block text-[10.5px] text-white/45 leading-relaxed">Entusiasmo excessivo. Expectativas irrealistas.</span>
                  </div>
                  <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/30 p-4 rounded-xl relative overflow-hidden">
                    <span className="absolute top-2 right-3 text-[11px] font-mono font-bold bg-[#d2af5a] text-black px-1.5 py-0.5 rounded">3 - NÓS</span>
                    <span className="block text-xs font-bold text-[#d2af5a] mb-1">Vale da Desilusão</span>
                    <span className="block text-[10.5px] text-white/80 leading-relaxed">Implementações falham. Interesse diminui. Onde os fortes constroem.</span>
                  </div>
                  <div className="bg-black/25 border border-white/[0.04] p-4 rounded-xl relative overflow-hidden">
                    <span className="absolute top-2 right-3 text-[14px] font-mono font-bold text-white/10">4</span>
                    <span className="block text-xs font-bold text-[#5dcaa5] mb-1">Encosta da Iluminação</span>
                    <span className="block text-[10.5px] text-white/45 leading-relaxed">Casos reais funcionam. Benefícios ficam claros.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'canvas' && (
          <motion.div
            key="canvas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 animate-fadeIn"
          >
            {/* Embedded styles for canvas layout */}
            <style>{`
              .canvas-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: auto auto auto;
                gap: 12px;
              }
              @media (max-width: 1024px) {
                .canvas-grid {
                  grid-template-columns: 1fr;
                  grid-template-rows: auto;
                }
              }
              .canvas-block {
                background: rgba(5, 5, 5, 0.45) !important;
                border: 0.2px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 10px;
                padding: 15px;
                transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                display: flex;
                flex-direction: column;
                gap: 8px;
                backdrop-filter: blur(12px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
              }
              .canvas-block:hover {
                border-color: rgba(255, 255, 255, 0.2) !important;
                background: rgba(10, 10, 12, 0.55) !important;
                transform: translateY(-2px);
              }
              .canvas-block h4 {
                font-family: var(--f-mono);
                font-size: 9px;
                color: #d2af5a;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin: 0;
                border-bottom: 0.2px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 6px;
                display: flex;
                align-items: center;
                gap: 6px;
              }
              .canvas-textarea {
                background: transparent;
                border: none;
                resize: none;
                font-size: 11px;
                color: #cbd5e1;
                width: 100%;
                min-height: 80px;
                outline: none;
                line-height: 1.5;
                font-family: var(--f-body);
              }
              .canvas-textarea:focus {
                color: #fff;
              }
            `}</style>

            <div className="dash-card-systems">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-[7.5px] font-mono text-[#d2af5a] tracking-[0.2em] font-bold uppercase mb-1">SEC · 03 ◆ Canvas & Pitch</div>
                  <h3 className="text-[15px] lg:text-xl font-light text-white tracking-wide">
                    Modelagem <span className="text-[#d2af5a] font-medium">Lean Canvas</span> & Pitch Simulator
                  </h3>
                  <p className="text-[10px] lg:text-[11.5px] text-white/50 mt-1 max-w-lg">
                    Esboce a tese do negócio e simule um elevator pitch de alto impacto com IA.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#fac775]/5 border border-[#fac775]/15 text-[8.5px] font-mono text-[#fac775]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fac775] animate-pulse"></span>
                  <span>MODO SIMULAÇÃO ATIVO</span>
                </div>
              </div>

              <div className="bg-[#d2af5a]/[0.02] border-l-2 border-[#d2af5a] p-3 rounded-r-md text-[11px] text-white/80 leading-relaxed mb-6">
                💡 <b>Edição Dinâmica:</b> Clique diretamente em qualquer bloco do Lean Canvas para editar seu conteúdo em tempo real. As alterações alimentam as variáveis do simulador de pitch abaixo.
              </div>

              {/* LEAN CANVAS GRID */}
              <div className="canvas-grid">
                {/* Problema */}
                <div className="canvas-block lg:col-span-1 lg:row-span-2">
                  <h4>⚠️ Problema</h4>
                  <textarea
                    value={canvasData.problema}
                    onChange={(e) => handleCanvasChange('problema', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Quais as dores dos clientes?"
                  />
                </div>

                {/* Solução */}
                <div className="canvas-block lg:col-span-1 lg:row-span-1">
                  <h4>✔️ Solução</h4>
                  <textarea
                    value={canvasData.solucao}
                    onChange={(e) => handleCanvasChange('solucao', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Quais as soluções?"
                  />
                </div>

                {/* Métricas Chave */}
                <div className="canvas-block lg:col-span-1 lg:row-span-1">
                  <h4>📊 Métricas Chave</h4>
                  <textarea
                    value={canvasData.metricas}
                    onChange={(e) => handleCanvasChange('metricas', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Quais KPIs monitorar?"
                  />
                </div>

                {/* Proposta de Valor */}
                <div className="canvas-block lg:col-span-1 lg:row-span-2">
                  <h4>💎 Proposta de Valor</h4>
                  <textarea
                    value={canvasData.proposta}
                    onChange={(e) => handleCanvasChange('proposta', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Qual a sua promessa de valor?"
                  />
                </div>

                {/* Vantagem Injusta */}
                <div className="canvas-block lg:col-span-1 lg:row-span-1">
                  <h4>🛡️ Vantagem Injusta</h4>
                  <textarea
                    value={canvasData.vantagem}
                    onChange={(e) => handleCanvasChange('vantagem', e.target.value)}
                    className="canvas-textarea"
                    placeholder="O que te faz único?"
                  />
                </div>

                {/* Canais */}
                <div className="canvas-block lg:col-span-1 lg:row-span-1">
                  <h4>📣 Canais</h4>
                  <textarea
                    value={canvasData.canais}
                    onChange={(e) => handleCanvasChange('canais', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Como chegar ao cliente?"
                  />
                </div>

                {/* Segmento de Clientes */}
                <div className="canvas-block lg:col-span-1 lg:row-span-2">
                  <h4>👥 Clientes</h4>
                  <textarea
                    value={canvasData.clientes}
                    onChange={(e) => handleCanvasChange('clientes', e.target.value)}
                    className="canvas-textarea"
                    placeholder="Quem é o comprador ideal?"
                  />
                </div>

                {/* Custos */}
                <div className="canvas-block lg:col-span-2 lg:row-span-1">
                  <h4>💸 Estrutura de Custos</h4>
                  <textarea
                    value={canvasData.custos}
                    onChange={(e) => handleCanvasChange('custos', e.target.value)}
                    className="canvas-textarea !min-height-[60px]"
                    placeholder="Quais os principais custos?"
                  />
                </div>

                {/* Receitas */}
                <div className="canvas-block lg:col-span-3 lg:row-span-1">
                  <h4>💰 Fluxo de Receitas</h4>
                  <textarea
                    value={canvasData.receitas}
                    onChange={(e) => handleCanvasChange('receitas', e.target.value)}
                    className="canvas-textarea !min-height-[60px]"
                    placeholder="Como a empresa ganha dinheiro?"
                  />
                </div>
              </div>

              {/* ELEVATOR PITCH SIMULATOR SECTION */}
              <div className="mt-8 border-t border-white/[0.06] pt-8 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-[#d2af5a] tracking-wider uppercase mb-1">SIMULADOR DE ELEVATOR PITCH</h3>
                  <p className="text-[10px] text-white/40">Calibre as variáveis do Pitch para gerar sua tese resumida de vendas</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* LHS Form Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">Nome do Produto/Startup</label>
                      <input
                        type="text"
                        value={pitchName}
                        onChange={(e) => setPitchName(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">Público Alvo (Segmento)</label>
                      <input
                        type="text"
                        value={pitchTarget}
                        onChange={(e) => setPitchTarget(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">A Dor Principal do Cliente</label>
                      <input
                        type="text"
                        value={pitchPain}
                        onChange={(e) => setPitchPain(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">Categoria de Mercado</label>
                      <input
                        type="text"
                        value={pitchMarket}
                        onChange={(e) => setPitchMarket(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono uppercase text-white/50 tracking-wider">O Seu Grande Diferencial</label>
                      <input
                        type="text"
                        value={pitchDifference}
                        onChange={(e) => setPitchDifference(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-[#d2af5a]/50 transition"
                      />
                    </div>
                    <button
                      onClick={handleSimulatePitch}
                      className="w-full py-2.5 rounded-md bg-[#d2af5a] hover:bg-[#c5a55a] text-black font-semibold text-xs tracking-wide transition flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>⚡ Simular Pitch de Elevador</span>
                    </button>
                  </div>

                  {/* RHS Result Display */}
                  <div className="relative border border-[#d2af5a]/20 bg-gradient-to-br from-[#1c150c]/60 to-[#0c0b0e]/85 rounded-xl p-6 flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(201, 148, 58,0.06),transparent_70%)]" />
                    
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-center text-[8.5px] font-mono text-[#d2af5a] tracking-wider">
                        <span>PITCH DE PONTO DE VISTA</span>
                        {pitchResult ? (
                          <span className="text-[#5dcaa5]">✓ PRONTO PARA EXECUTAR</span>
                        ) : (
                          <span className="text-white/30">AGUARDANDO SIMULAÇÃO</span>
                        )}
                      </div>
                      
                      <p className="text-white/80 text-[12.5px] leading-relaxed italic min-h-[120px] flex items-center">
                        {optimizing ? (
                          <span className="animate-pulse text-[#d2af5a]">Advisor analisando e aprimorando...</span>
                        ) : pitchResult ? (
                          `"${pitchResult}"`
                        ) : (
                          'Clique no botão "Simular Pitch de Elevador" ao lado para carregar e estruturar seu elevator pitch executivo com base nas variáveis do Lean Canvas...'
                        )}
                      </p>
                    </div>

                    <div className="flex gap-3 relative z-10 mt-6">
                      <button
                        onClick={handleCopyPitch}
                        disabled={!pitchResult}
                        className="flex-1 py-2 rounded border border-white/10 hover:border-white/20 bg-white/[0.02] text-xs font-medium transition flex items-center justify-center gap-1 text-white/80 disabled:opacity-40 disabled:pointer-events-none"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-[#5dcaa5]" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copied ? 'Copiado!' : '📋 Copiar Pitch'}</span>
                      </button>
                      <button
                        onClick={handleOptimizePitch}
                        disabled={!pitchResult || optimizing}
                        className="flex-1 py-2 rounded bg-[#d2af5a] text-black font-semibold text-xs transition flex items-center justify-center gap-1 disabled:opacity-40 disabled:pointer-events-none"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>🧠 Otimizar com AI Advisor</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}