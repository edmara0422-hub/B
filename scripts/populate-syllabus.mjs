import fs from 'fs'

const file = 'components/business-syllabus/conteudos-page-client.tsx'
let content = fs.readFileSync(file, 'utf8')

// Fix mapping to make Pensamento Criativo S2
content = content.replace(/'M4-T1-S3': 'M1-S2', \/\/ Pensamento Criativo/, "'M4-T1-S2': 'M1-S2', // Pensamento Criativo")

// Replace ACADEMIC_SYLLABUS
const newSyllabus = `const ACADEMIC_SYLLABUS = [
  // Pilar 1: Inovação e Estratégia
  { id: 'M4-T1-S1', topicId: 'M4-T1', title: 'Inovação, Transformação e Ferramentas Digitais', subtitle: 'IE · Era Digital e Automação', duration: '22:15' },
  { id: 'M4-T1-S2', topicId: 'M4-T1', title: 'Pensamento Criativo', subtitle: 'IE · Neurociência e Ideação', duration: '18:45' },
  { id: 'M4-T1-S4', topicId: 'M4-T1', title: 'Empreendedorismo e Inovação Exponencial (P1)', subtitle: 'IE · Mindset de Crescimento', duration: '20:00' },
  { id: 'M4-T1-S5', topicId: 'M4-T1', title: 'Empreendedorismo e Inovação Exponencial (P2)', subtitle: 'IE · Escalabilidade', duration: '21:30' },
  
  // Pilar 2: Finanças e Inteligência Quantitativa
  { id: 'M4-T2-S1', topicId: 'M4-T2', title: 'Análise Financeira (P1)', subtitle: 'FIQ · Modelagem e Valuation', duration: '24:10' },
  { id: 'M4-T2-S2', topicId: 'M4-T2', title: 'Análise Financeira (P2)', subtitle: 'FIQ · KPIs de Mercado', duration: '25:00' },
  { id: 'M4-T2-S3', topicId: 'M4-T2', title: 'Matemática Financeira', subtitle: 'FIQ · Juros e Amortizações', duration: '19:40' },
  { id: 'M4-T2-S4', topicId: 'M4-T2', title: 'Demonstrações Contábeis', subtitle: 'FIQ · Balanços e DRE', duration: '22:15' },
  { id: 'M4-T2-S5', topicId: 'M4-T2', title: 'Precificação', subtitle: 'FIQ · Estratégia de Pricing', duration: '21:05' },
  { id: 'M4-T2-S6', topicId: 'M4-T2', title: 'Cálculo Aplicado a Negócios', subtitle: 'FIQ · Otimização de Lucros', duration: '18:50' },
  { id: 'M4-T2-S7', topicId: 'M4-T2', title: 'Análise Estatística', subtitle: 'FIQ · Probabilidade e Dados', duration: '23:30' },
  
  // Pilar 3: Liderança, Pessoas e Cultura
  { id: 'M4-T3-S1', topicId: 'M4-T3', title: 'Liderança e Gestão de Equipes (P1)', subtitle: 'LPC · Cultura Organizacional', duration: '26:15' },
  { id: 'M4-T3-S2', topicId: 'M4-T3', title: 'Liderança e Gestão de Equipes (P2)', subtitle: 'LPC · Feedback e Performance', duration: '27:00' },
  { id: 'M4-T3-S3', topicId: 'M4-T3', title: 'Educação, Identidade e Solidariedade', subtitle: 'LPC · Propósito e Visão', duration: '19:20' },
  { id: 'M4-T3-S4', topicId: 'M4-T3', title: 'Ética', subtitle: 'LPC · Integridade Corporativa', duration: '20:45' },
  
  // Pilar 4: Gestão e Operações Corporativas
  { id: 'M4-T4-S1', topicId: 'M4-T4', title: 'Gestão de Negócios (P1)', subtitle: 'GOC · Modelagem Operacional', duration: '22:10' },
  { id: 'M4-T4-S2', topicId: 'M4-T4', title: 'Gestão de Negócios (P2)', subtitle: 'GOC · Eficiência e Processos', duration: '21:30' },
  { id: 'M4-T4-S3', topicId: 'M4-T4', title: 'Sustentabilidade em Negócios', subtitle: 'GOC · ESG e Práticas Verdes', duration: '24:00' },
  
  // Pilar 5: Mercado e Macroeconomia
  { id: 'M4-T5-S1', topicId: 'M4-T5', title: 'Economia de Empresa e Análise Mercadológica', subtitle: 'MM · Dinâmica de Mercado', duration: '28:15' },
  { id: 'M4-T5-S2', topicId: 'M4-T5', title: 'Ambiente Macroeconômico', subtitle: 'MM · Cenários e Tendências', duration: '25:40' },
  { id: 'M4-T5-S3', topicId: 'M4-T5', title: 'Filosofia (P1)', subtitle: 'MM · Pensamento Estruturado', duration: '20:10' },
  { id: 'M4-T5-S4', topicId: 'M4-T5', title: 'Filosofia (P2)', subtitle: 'MM · Ética e Mercado', duration: '21:00' },
  
  // Pilar 6: Impacto Social e Intervenção
  { id: 'M4-T6-S1', topicId: 'M4-T6', title: 'Pesquisa Aplicada a Negócios', subtitle: 'ISI · Metodologia Científica', duration: '22:30' },
  { id: 'M4-T6-S2', topicId: 'M4-T6', title: 'Projeto de Intervenção em Negócios', subtitle: 'ISI · Aplicação Prática', duration: '24:15' },
  { id: 'M4-T6-S3', topicId: 'M4-T6', title: 'Empreendedorismo Social (P1)', subtitle: 'ISI · Impacto e Comunidade', duration: '19:40' },
  { id: 'M4-T6-S4', topicId: 'M4-T6', title: 'Empreendedorismo Social (P2)', subtitle: 'ISI · Negócios com Propósito', duration: '20:10' },
  { id: 'M4-T6-S5', topicId: 'M4-T6', title: 'Teologia e Sociedade', subtitle: 'ISI · Visão Humanística', duration: '18:50' },
  { id: 'M4-T6-S6', topicId: 'M4-T6', title: 'Educação, Identidade e Solidariedade', subtitle: 'ISI · Cidadania Corporativa', duration: '21:05' },
  { id: 'M4-T6-S7', topicId: 'M4-T6', title: 'Leitura e Escrita Acadêmica', subtitle: 'ISI · Comunicação Formal', duration: '17:30' }
]`

const syllabusRegex = /const ACADEMIC_SYLLABUS = \[\s*\{\s*id: 'M4-T1-S1'.*?\s*\]/ms
content = content.replace(syllabusRegex, newSyllabus)

fs.writeFileSync(file, content)
console.log('Successfully updated ACADEMIC_SYLLABUS')