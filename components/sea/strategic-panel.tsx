'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { RefreshCw, CheckSquare, Square, ChevronDown, ChevronUp, Sparkles, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

type PhaseId = 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6'

type Metrics = {
  totalUsers: number; activeWeek: number; retention7d: number
  nps: number | null; subsActive: number; loadedAt: string
}

type Directive = {
  foco: string; diretiva: string; acoes: string[]; bloqueio: string; sinal: string
}

type CheckItem = {
  label: string
  ok: boolean
  fonte: string       // "via Supabase", "via Vercel", "via analytics", etc.
  detalhe?: string    // extra line below
}

// ─── Static knowledge about SEA FISIO stack ───────────────────────────────────

const PHASES: { id: PhaseId; label: string; sublabel: string }[] = [
  { id: 'f1', label: 'F1', sublabel: 'Infra' },
  { id: 'f2', label: 'F2', sublabel: 'Processo' },
  { id: 'f3', label: 'F3', sublabel: 'Estratégia' },
  { id: 'f4', label: 'F4', sublabel: 'Digitização' },
  { id: 'f5', label: 'F5', sublabel: 'Digitalização' },
  { id: 'f6', label: 'F6', sublabel: 'Transformação' },
]

function detectPhase(m: Metrics): PhaseId {
  if (m.totalUsers >= 500 && m.retention7d >= 50) return 'f6'
  if (m.totalUsers >= 200 && m.retention7d >= 40) return 'f5'
  if (m.totalUsers >= 50  && m.retention7d >= 30) return 'f4'
  if (m.totalUsers >= 20  && m.retention7d >= 20) return 'f3'
  if (m.totalUsers >= 5)                           return 'f2'
  return 'f1'
}

// ─── SGI: Sistemas Integrados ─────────────────────────────────────────────────

function getSGI(m: Metrics): CheckItem[] {
  return [
    { label: 'Autenticação e perfis de usuário', ok: true, fonte: 'Supabase Auth', detalhe: 'Login, roles admin/user, perfis clínicos' },
    { label: 'Prontuário eletrônico clínico', ok: true, fonte: 'stack SEA', detalhe: 'Ventilação, sedação, RASS, prontuário completo' },
    { label: 'Calculadoras clínicas especializadas', ok: true, fonte: 'stack SEA', detalhe: 'S1–S6: ventilatórias, hemodinâmicas, sedação' },
    { label: 'Simulações 3D interativas', ok: true, fonte: 'React Three Fiber', detalhe: 'Pulmão, coração, posicionamento prona' },
    { label: 'IA Tutora (Groq/LLaMA)', ok: true, fonte: 'Groq API', detalhe: 'llama-3.3-70b-versatile em /api/tutor' },
    { label: 'Banco de dados estruturado', ok: true, fonte: 'Supabase Postgres', detalhe: 'Profiles, subscriptions, feedback, app_config' },
    { label: 'App mobile (iOS/Android)', ok: true, fonte: 'Capacitor', detalhe: 'Build nativo via capacitor.config.ts' },
    { label: 'Sistema de assinaturas', ok: m.subsActive > 0, fonte: 'Supabase subscriptions', detalhe: m.subsActive > 0 ? `${m.subsActive} ativa(s)` : 'Tabela criada, sem assinantes ativos' },
    { label: 'NPS e feedback estruturado', ok: m.nps !== null, fonte: 'sea_feedback table', detalhe: m.nps !== null ? `NPS atual: ${m.nps}` : 'Tabela criada, aguardando respostas' },
  ]
}

// ─── DDDM: Decisão Baseada em Dados ──────────────────────────────────────────

function getDDDM(m: Metrics): CheckItem[] {
  return [
    { label: 'Métricas de usuários em tempo real', ok: true, fonte: 'Supabase + admin panel', detalhe: `${m.totalUsers} usuários cadastrados, ${m.activeWeek} ativos/semana` },
    { label: 'Retenção 7 dias monitorada', ok: m.retention7d > 0 || m.totalUsers === 0, fonte: 'admin analytics', detalhe: m.totalUsers > 0 ? `${m.retention7d}% ret. 7d atual` : 'Sem usuários para calcular ainda' },
    { label: 'Funil de conversão rastreado', ok: m.subsActive > 0, fonte: 'subscriptions table', detalhe: m.subsActive > 0 ? `Trial → Pago: ${m.subsActive} ativos` : 'Aguarda primeiro assinante pago' },
    { label: 'NPS coletado e calculado', ok: m.nps !== null, fonte: 'sea_feedback NPS', detalhe: m.nps !== null ? `NPS = ${m.nps}` : 'Implementar coleta ativa de NPS' },
    { label: 'Analytics de eventos de uso', ok: false, fonte: 'a implementar', detalhe: 'Rastrear quais calculadoras/seções mais usadas' },
    { label: 'Dashboard de saúde do produto', ok: true, fonte: 'admin /estrategia', detalhe: 'Painel ativo com métricas reais do Supabase' },
  ]
}

// ─── Tendências de mercado ────────────────────────────────────────────────────

function getTendencias(): CheckItem[] {
  return [
    { label: 'IA no cuidado intensivo (critcal care AI)', ok: true, fonte: 'tendência 2024–2026', detalhe: 'SEA já opera com IA tutora — alinhado à tendência' },
    { label: 'SaaS especializado para fisioterapia', ok: true, fonte: 'posicionamento SEA', detalhe: 'Vertical estreita, alta especificidade clínica — vantagem defensiva' },
    { label: 'Digitalização de prontuários em UTI', ok: true, fonte: 'regulação CFM/COFFITO', detalhe: 'Prontuário eletrônico em expansão regulatória' },
    { label: 'Simulação clínica baseada em dados', ok: true, fonte: 'mercado educação médica', detalhe: 'Diferencial competitivo alto — 3D + calculadoras integradas' },
    { label: 'Plataformas mobile-first para saúde', ok: true, fonte: 'App Store / Google Play', detalhe: 'Build Capacitor pronto para distribuição' },
    { label: 'Expansão LatAm de health tech', ok: false, fonte: 'roadmap F5–F6', detalhe: 'Oportunidade futura — internacionalização em fase pós-tração' },
  ]
}

// ─── Sustentabilidade ─────────────────────────────────────────────────────────

function getSustentabilidade(m: Metrics): CheckItem[] {
  return [
    { label: 'Modelo de receita recorrente (SaaS)', ok: true, fonte: 'modelo de negócio', detalhe: 'Assinatura mensal/anual — LTV previsível' },
    { label: 'Infra serverless (custo escala com uso)', ok: true, fonte: 'Vercel + Supabase', detalhe: 'Sem servidor fixo — custo zero em idle' },
    { label: 'Plano gratuito/trial para aquisição', ok: true, fonte: 'subscriptions model', detalhe: 'Entrada low-friction, conversão por valor demonstrado' },
    { label: 'Churn abaixo de 5%/mês', ok: m.retention7d >= 40, fonte: 'métricas retenção', detalhe: m.retention7d >= 40 ? `Ret. ${m.retention7d}% — saudável` : `Ret. ${m.retention7d}% — trabalhar engajamento` },
    { label: 'CAC orgânico via indicação', ok: m.totalUsers >= 10, fonte: 'base de usuários', detalhe: m.totalUsers >= 10 ? 'Base suficiente para crescimento orgânico' : 'Construir base inicial primeiro' },
  ]
}

// ─── OKRs por fase ───────────────────────────────────────────────────────────

function getPhaseOKRs(phase: PhaseId, m: Metrics) {
  const okrsByPhase: Record<PhaseId, { objetivo: string; krs: { descricao: string; progresso: number }[] }[]> = {
    f1: [
      {
        objetivo: 'Atingir os primeiros 10 usuários reais e validar o produto',
        krs: [
          { descricao: `Realizar 5 demos ao vivo com fisioterapeutas de UTI (hoje: ${m.totalUsers} usuários)`, progresso: Math.min(100, m.totalUsers * 10) },
          { descricao: 'Obter 1 feedback clínico detalhado por usuário cadastrado', progresso: 0 },
          { descricao: 'Retenção 7 dias acima de 40% na primeira quinzena de uso', progresso: Math.min(100, m.retention7d) },
        ],
      },
      {
        objetivo: 'Garantir que a infra suporta crescimento sem intervenção manual',
        krs: [
          { descricao: 'Supabase auth + perfis funcionando sem erros reportados', progresso: 100 },
          { descricao: 'CI/CD via Vercel ativo — deploy automático em cada push', progresso: 100 },
          { descricao: 'App mobile buildado e testado em iOS e Android', progresso: 75 },
        ],
      },
    ],
    f2: [
      {
        objetivo: `Engajar e reter os ${m.totalUsers} usuários atuais antes de crescer`,
        krs: [
          { descricao: 'Entrevistar 100% dos usuários cadastrados (gravação ou notas)', progresso: 0 },
          { descricao: `Identificar e corrigir o principal ponto de fricção no onboarding`, progresso: 0 },
          { descricao: `Retenção 7d acima de 50% (hoje: ${m.retention7d}%)`, progresso: Math.min(100, m.retention7d * 2) },
        ],
      },
      {
        objetivo: 'Mapear e automatizar o processo de onboarding',
        krs: [
          { descricao: 'Usuário cria primeiro prontuário em menos de 5 minutos', progresso: 50 },
          { descricao: 'Mensagem de boas-vindas automática no cadastro ativa', progresso: 0 },
          { descricao: 'Fluxo de onboarding documentado e testado', progresso: 0 },
        ],
      },
    ],
    f3: [
      {
        objetivo: 'Definir e comunicar o diferencial competitivo do SEA',
        krs: [
          { descricao: 'Entrevistar os 5 usuários mais engajados sobre motivo de uso', progresso: 0 },
          { descricao: `NPS acima de 30 com ao menos 10 respostas (hoje: ${m.nps ?? 'não coletado'})`, progresso: m.nps !== null ? Math.min(100, ((m.nps + 100) / 200) * 100) : 0 },
          { descricao: '1 feature core única lançada e validada com usuários reais', progresso: 50 },
        ],
      },
    ],
    f4: [
      {
        objetivo: `Converter usuários em assinantes pagantes (hoje: ${m.subsActive} ativos)`,
        krs: [
          { descricao: 'MRR > R$ 1.000 (primeiro marco de receita real)', progresso: m.subsActive > 0 ? 25 : 0 },
          { descricao: 'Churn mensal abaixo de 5%', progresso: 0 },
          { descricao: `Taxa de conversão trial→pago acima de 15%`, progresso: 0 },
        ],
      },
    ],
    f5: [
      {
        objetivo: 'Crescimento sustentável sem operação manual da fundadora',
        krs: [
          { descricao: 'Pelo menos 1 novo usuário/semana via canal orgânico', progresso: 0 },
          { descricao: 'MRR > R$ 5.000 com churn < 5%', progresso: 0 },
          { descricao: '1 parceria B2B institucional (hospital ou clínica) fechada', progresso: 0 },
        ],
      },
    ],
    f6: [
      {
        objetivo: 'Expansão LatAm: SEA em 1 novo mercado em 12 meses',
        krs: [
          { descricao: 'Publicar 1 relatório de impacto clínico com dados reais do SEA', progresso: 0 },
          { descricao: 'Fechar 1 parceiro estratégico internacional (piloto)', progresso: 0 },
          { descricao: `NPS acima de 60 com ${m.totalUsers}+ usuários ativos`, progresso: 0 },
        ],
      },
    ],
  }
  return okrsByPhase[phase]
}

// ─── Governança ───────────────────────────────────────────────────────────────

function getGovernanca(m: Metrics, phase: PhaseId) {
  const phaseIdx = ['f1','f2','f3','f4','f5','f6'].indexOf(phase)
  return [
    {
      pilar: 'Tecnologia',
      items: [
        { label: 'Stack moderno e escalável',         ok: true,           fonte: 'Next.js 15 + Supabase + Vercel' },
        { label: 'Deploy contínuo (CI/CD)',            ok: true,           fonte: 'Vercel git integration' },
        { label: 'Segurança de dados e autenticação', ok: true,           fonte: 'Supabase Auth + RLS policies' },
        { label: 'Monitoramento e alertas de erros',  ok: false,          fonte: 'a implementar — Sentry ou similar' },
      ],
    },
    {
      pilar: 'Processos',
      items: [
        { label: 'Onboarding documentado',            ok: phaseIdx >= 1,  fonte: phaseIdx >= 1 ? 'fluxo definido' : 'a documentar em F2' },
        { label: 'Processo de coleta de feedback',    ok: m.nps !== null, fonte: m.nps !== null ? 'NPS ativo' : 'implementar NPS' },
        { label: 'Ciclo de sprint/revisão semanal',   ok: false,          fonte: 'a formalizar' },
        { label: 'Processo de onboarding de usuário', ok: phaseIdx >= 2,  fonte: phaseIdx >= 2 ? 'mapeado em F2' : 'definir fluxo' },
      ],
    },
    {
      pilar: 'Estratégia',
      items: [
        { label: 'Posicionamento de nicho definido',  ok: true,           fonte: 'fisioterapia intensivista — vertical estreita' },
        { label: 'Modelo de receita definido',        ok: true,           fonte: 'SaaS assinatura mensal/anual' },
        { label: 'OKRs do ciclo estabelecidos',       ok: phaseIdx >= 1,  fonte: phaseIdx >= 1 ? 'painel estratégico' : 'definir OKRs F1' },
        { label: 'Roadmap de produto público',        ok: false,          fonte: 'a publicar' },
      ],
    },
    {
      pilar: 'Pessoas',
      items: [
        { label: 'Fundadora com visão e execução',    ok: true,           fonte: 'Edmara Rocha — fundadora técnica-clínica' },
        { label: 'Comunidade de usuários ativa',      ok: m.totalUsers >= 5, fonte: m.totalUsers >= 5 ? `${m.totalUsers} usuários` : 'construir base' },
        { label: 'Parceiros ou colaboradores',        ok: false,          fonte: 'a construir em F3' },
        { label: 'Programa de feedback com usuários', ok: m.nps !== null, fonte: m.nps !== null ? 'NPS + feedback ativo' : 'ativar coleta estruturada' },
      ],
    },
  ]
}

// ─── Norte: Síntese ───────────────────────────────────────────────────────────

function getNorte(phase: PhaseId, m: Metrics): { onde: string; proximo: string; aposta: string } {
  const norteByPhase: Record<PhaseId, { onde: string; proximo: string; aposta: string }> = {
    f1: {
      onde: `SEA está em F1 · Infra. Produto construído, stack completo, zero usuários reais. A plataforma existe — o mercado ainda não sabe.`,
      proximo: `F2 exige 5 usuários com uso real e feedback documentado. A transição é humana, não técnica.`,
      aposta: `A aposta estratégica do SEA é ser o único SaaS clínico de alta especificidade para fisioterapeutas de UTI no Brasil. Nenhum concorrente tem prontuário + calculadoras + IA + simulação 3D integrados.`,
    },
    f2: {
      onde: `SEA em F2 · Processo. ${m.totalUsers} usuário(s) cadastrado(s). A pergunta agora é: eles voltam?`,
      proximo: `F3 exige 20 usuários ativos com retenção 7d acima de 20%. Foco total em engajamento dos atuais.`,
      aposta: `SEA tem diferencial técnico único. O risco é não ousar falar com os usuários e continuar construindo sem validação real.`,
    },
    f3: {
      onde: `SEA em F3 · Estratégia. ${m.totalUsers} usuários, ${m.activeWeek} ativos/semana. Diferenciação define quem escala.`,
      proximo: `F4 exige 50 usuários com retenção 30%+ e os primeiros assinantes pagos.`,
      aposta: `A aposta é que a especificidade clínica (UTI intensivista) é o diferencial defensivo — difícil de replicar, alto valor percebido.`,
    },
    f4: {
      onde: `SEA em F4 · Digitização. ${m.totalUsers} usuários, ${m.subsActive} assinantes. Momento de monetizar o que foi construído.`,
      proximo: `F5 exige MRR crescendo, churn < 5%, e crescimento sem operação manual.`,
      aposta: `A aposta é que o cliente que usa o SEA diariamente em UTI paga para manter o acesso — o valor clínico justifica.`,
    },
    f5: {
      onde: `SEA em F5 · Digitalização. Modelo comprovado, escala em curso. Foco em crescimento sustentável.`,
      proximo: `F6 exige transformação organizacional — time, parcerias B2B, expansão LatAm.`,
      aposta: `A aposta é crescimento orgânico via indicação clínica — fisioterapeuta indica para colega de UTI.`,
    },
    f6: {
      onde: `SEA em F6 · Transformação. Produto maduro, mercado brasileiro estabelecido. A próxima fronteira é LatAm.`,
      proximo: `Expansão: 1 mercado piloto LatAm em 12 meses, programa de certificação SEA.`,
      aposta: `A aposta é que o SEA vira a plataforma de referência para fisioterapia intensivista na América Latina.`,
    },
  }
  return norteByPhase[phase]
}

// ─── Monitor: Saúde do Produto ────────────────────────────────────────────────

function getMonitor(m: Metrics, phase: PhaseId): { label: string; status: 'ok' | 'atencao' | 'critico'; valor: string }[] {
  return [
    {
      label: 'Usuários totais',
      status: m.totalUsers >= 5 ? 'ok' : m.totalUsers > 0 ? 'atencao' : 'critico',
      valor: `${m.totalUsers} cadastrados`,
    },
    {
      label: 'Engajamento semanal',
      status: m.activeWeek >= 3 ? 'ok' : m.activeWeek > 0 ? 'atencao' : 'critico',
      valor: `${m.activeWeek} ativos/sem`,
    },
    {
      label: 'Retenção 7 dias',
      status: m.retention7d >= 40 ? 'ok' : m.retention7d >= 20 ? 'atencao' : 'critico',
      valor: `${m.retention7d}%`,
    },
    {
      label: 'NPS',
      status: m.nps === null ? 'atencao' : m.nps >= 30 ? 'ok' : m.nps >= 0 ? 'atencao' : 'critico',
      valor: m.nps !== null ? String(m.nps) : 'não coletado',
    },
    {
      label: 'Assinaturas ativas',
      status: m.subsActive >= 1 ? 'ok' : phase === 'f1' || phase === 'f2' ? 'atencao' : 'critico',
      valor: `${m.subsActive} ativa(s)`,
    },
    {
      label: 'IA tutora',
      status: 'ok',
      valor: 'Groq / LLaMA 70b',
    },
    {
      label: 'Deploy contínuo',
      status: 'ok',
      valor: 'Vercel / git main',
    },
  ]
}

// ─── Directive (static fallback) ─────────────────────────────────────────────

function getDirective(phase: PhaseId, m: Metrics): Directive {
  if (phase === 'f1' && m.totalUsers === 0) return {
    foco: 'O SEA está pronto. Falta o único ingrediente que nenhuma linha de código resolve: usuários reais.',
    diretiva: 'Abra o WhatsApp agora e mande mensagem para 3 fisioterapeutas de UTI que você conhece pessoalmente. Não mande link — marque uma demo ao vivo. 30 minutos. Mostre o prontuário, as calculadoras, as simulações.',
    acoes: [
      'Liste agora os 5 fisioterapeutas de UTI mais próximos de você. Manda mensagem hoje para cada um.',
      'Faz 1 demo ao vivo ainda esta semana. Não precisa ser perfeita — precisa ser real.',
      'Registra na sexta: o que funcionou, o que não funcionou, o que surpreendeu.',
    ],
    bloqueio: 'O bloqueio não é técnico. O SEA já funciona. O bloqueio é comercial — sair do computador e falar com pessoas.',
    sinal: 'Um fisioterapeuta abrir o SEA sozinho, sem você pedir — esse é o sinal de que tem valor real.',
  }
  if (phase === 'f1') return {
    foco: `${m.totalUsers} usuário(s) cadastrado(s). Cada um é ouro — converse com todos esta semana.`,
    diretiva: 'Fale com cada usuário individualmente. Pergunte: o que você usou? O que travou? O que faltou? As respostas valem mais do que qualquer analytics.',
    acoes: [
      'Entrevista individual com cada usuário: 20 min, sem script, escuta ativa.',
      'Documente o fluxo clínico real: o que eles fazem no SEA, passo a passo.',
      'Identifique 1 ponto de fricção crítico e corrija ainda esta semana.',
    ],
    bloqueio: 'Com poucos usuários, o risco é ignorá-los e continuar construindo. O produto se define agora — ouça antes de decidir.',
    sinal: `Retenção 7 dias acima de 40% (hoje: ${m.retention7d}%) e usuários voltando sem você pedir.`,
  }
  if (phase === 'f2') return {
    foco: `${m.totalUsers} usuários · ${m.retention7d}% retenção. Processos definem se o crescimento vai escalar ou travar.`,
    diretiva: 'Mapeie o fluxo clínico do fisioterapeuta no SEA do início ao fim. Onde o usuário para, hesita ou sai? Esse é o processo a corrigir primeiro.',
    acoes: [
      'Grave ou anote o fluxo completo: novo usuário → primeiro prontuário → primeira calculadora.',
      'Identifique o "momento aha" — o que faz o usuário entender o valor do SEA.',
      'Configure 1 automação: novo cadastro → mensagem de boas-vindas automática.',
    ],
    bloqueio: `Retenção em ${m.retention7d}% significa que ${100 - m.retention7d}% dos usuários não voltam. Entenda por que antes de atrair mais.`,
    sinal: 'Usuário cria prontuário nos primeiros 5 minutos e volta no dia seguinte sem você pedir.',
  }
  if (phase === 'f3') return {
    foco: `${m.totalUsers} usuários · ${m.activeWeek} ativos/semana. A diferenciação define quem sobrevive nessa fase.`,
    diretiva: 'Responda: o que o SEA faz que nenhum concorrente consegue replicar em 6 meses? Se você não souber, os usuários também não saberão.',
    acoes: [
      'Entreviste os 5 usuários mais engajados: por que eles usam o SEA toda semana?',
      'Defina 1 feature core que nenhuma alternativa tem — e invista 80% do sprint nela.',
      'Ative coleta de NPS: envie para todos os ativos da semana.',
    ],
    bloqueio: `NPS ${m.nps ?? 'não coletado'} · Sem NPS, você não sabe se tem promotores ou detratores.`,
    sinal: `NPS acima de 30 com pelo menos 20 respostas. Hoje: ${m.nps ?? 'não coletado'}.`,
  }
  if (phase === 'f4') return {
    foco: `${m.totalUsers} usuários · ${m.subsActive} assinantes. Dados são a vantagem — quem decide com dados move mais rápido.`,
    diretiva: 'Toda decisão de produto da próxima sprint precisa ter uma métrica associada. Dados primeiro, feature depois.',
    acoes: [
      'Identifique as 3 métricas que determinam o sucesso do produto esta semana.',
      'Lance 1 feature premium mensurável — algo que usuários pagariam separadamente.',
      'Revise o churn: quem cancelou nos últimos 30 dias e por quê?',
    ],
    bloqueio: `Cada cancelamento é LTV destruído com CAC já pago. Entenda o motivo real antes de qualquer ação de crescimento.`,
    sinal: `MRR crescendo 10%+ mês a mês com churn abaixo de 5%. Assinaturas ativas: ${m.subsActive}.`,
  }
  if (phase === 'f5') return {
    foco: `${m.totalUsers} usuários · Digital-first: o modelo funciona sem você operando manualmente?`,
    diretiva: 'Teste: se você sair de férias por 30 dias, o SEA continua crescendo? Onde você ainda é indispensável é o próximo gargalo.',
    acoes: [
      'Mapeie os 3 processos onde sua presença ainda é necessária — automatize 1 deles.',
      'Ative growth loop: como um usuário traz o próximo sem custo de aquisição?',
      'Prospecte 1 parceria B2B institucional — hospital ou clínica com contrato anual.',
    ],
    bloqueio: `Retenção ${m.retention7d}% · Digital-first exige retenção acima de 40%.`,
    sinal: 'MRR > R$ 5.000 com churn < 5% e 1 novo usuário chegando por semana sem ads.',
  }
  return {
    foco: `${m.totalUsers} usuários · Transformação em curso. O SEA é o produto — e a plataforma.`,
    diretiva: 'A pergunta agora é escala internacional: o que é necessário para levar o SEA para 1 mercado LatAm em 12 meses?',
    acoes: [
      'Publique o primeiro relatório de impacto clínico do SEA com dados reais.',
      'Identifique 1 parceiro estratégico em outro país para expansão piloto.',
      'Lance programa de certificação SEA para fisioterapeutas intensivistas.',
    ],
    bloqueio: 'O bloqueio nessa fase é governança e escala organizacional — o produto está provado. Construa o time.',
    sinal: `NPS acima de 60, ${m.totalUsers}+ usuários ativos, 1 novo mercado pilotado.`,
  }
}

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'sea-strategy-v7'
const EMPTY_METRICS: Metrics = { totalUsers: 0, activeWeek: 0, retention7d: 0, nps: null, subsActive: 0, loadedAt: '' }

// ─── Sub-components ───────────────────────────────────────────────────────────

function Sec({ label, badge, open, toggle, children }: {
  label: string; badge?: string; open: boolean; toggle: () => void; children: React.ReactNode
}) {
  return (
    <div className="border-t border-white/5 pt-3">
      <button onClick={toggle} className="flex w-full items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">{label}</p>
          {badge && <span className="rounded-full border border-white/12 px-2 py-0.5 text-[8px] text-white/35">{badge}</span>}
        </div>
        {open ? <ChevronUp className="h-3.5 w-3.5 text-white/25" /> : <ChevronDown className="h-3.5 w-3.5 text-white/20" />}
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  )
}

function CheckRow({ item }: { item: CheckItem }) {
  return (
    <div className={`flex items-start gap-2.5 rounded-[0.6rem] px-2.5 py-2 ${item.ok ? 'bg-white/[0.03]' : 'bg-transparent'}`}>
      {item.ok
        ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/45" />
        : <Circle       className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/18" />
      }
      <div className="flex-1 min-w-0">
        <p className={`text-[9px] leading-snug ${item.ok ? 'text-white/72' : 'text-white/35'}`}>{item.label}</p>
        {item.detalhe && <p className="text-[8px] text-white/32 mt-0.5 leading-snug">{item.detalhe}</p>}
      </div>
    </div>
  )
}

function MonitorDot({ status }: { status: 'ok' | 'atencao' | 'critico' }) {
  const cls = status === 'ok' ? 'bg-white/50' : status === 'atencao' ? 'bg-white/25' : 'bg-white/10'
  return <span className={`inline-block h-2 w-2 rounded-full shrink-0 ${cls}`} />
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function StrategicPanel() {
  const [metrics, setMetrics]     = useState<Metrics>(EMPTY_METRICS)
  const [loadingM, setLoadingM]   = useState(true)
  const [weekDone, setWeekDone]   = useState<string[]>([])
  const [aiDirective, setAiDirective] = useState<Directive | null>(null)
  const [loadingAI, setLoadingAI] = useState(false)
  const [aiError, setAiError]     = useState(false)

  const [open, setOpen] = useState<Record<string, boolean>>({
    diretiva: true, acoes: true, td: false, sgi: false, dddm: false,
    tend: false, sust: false, okrs: true, gov: false, norte: true, monitor: false,
  })

  const tog = (k: string) => setOpen(p => ({ ...p, [k]: !p[k] }))

  const loadMetrics = useCallback(async () => {
    if (!supabase) { setLoadingM(false); return }
    setLoadingM(true)
    const DAY = 86400000; const now = Date.now()
    const [{ data: profiles }, { data: subs }, { data: fb }] = await Promise.all([
      supabase.from('profiles').select('id, last_login, role'),
      supabase.from('subscriptions').select('status, user_id'),
      supabase.from('sea_feedback').select('score, type'),
    ])
    const real  = (profiles ?? []).filter((p: { role?: string }) => p.role !== 'admin')
    const total = real.length
    const week  = real.filter((p: { last_login?: string | null }) => p.last_login && now - new Date(p.last_login).getTime() < DAY * 7).length
    const ret7  = total > 0 ? Math.round((week / total) * 100) : 0
    const npsE  = (fb ?? []).filter((f: { type: string; score: number | null }) => f.type === 'nps' && f.score !== null)
    let nps: number | null = null
    if (npsE.length > 0) {
      const pr = npsE.filter((f: { score: number }) => f.score >= 9).length
      const de = npsE.filter((f: { score: number }) => f.score <= 6).length
      nps = Math.round(((pr - de) / npsE.length) * 100)
    }
    const realIds    = new Set(real.map((p: { id: string }) => p.id))
    const subsActive = (subs ?? []).filter((s: { user_id: string; status: string }) => realIds.has(s.user_id) && s.status === 'active').length
    const m = { totalUsers: total, activeWeek: week, retention7d: ret7, nps, subsActive, loadedAt: new Date().toLocaleTimeString('pt-BR') }
    setMetrics(m)
    setLoadingM(false)
    fetchAI(m, detectPhase(m))
  }, [])

  const fetchAI = useCallback(async (m: Metrics, ph: PhaseId) => {
    setLoadingAI(true); setAiError(false)
    try {
      const res = await fetch('/api/strategic-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics: m, phase: ph }),
      })
      if (!res.ok) throw new Error('api error')
      const data = await res.json()
      if (data.foco && data.diretiva && data.acoes) setAiDirective(data as Directive)
      else setAiError(true)
    } catch { setAiError(true) }
    setLoadingAI(false)
  }, [])

  useEffect(() => { loadMetrics() }, [loadMetrics])

  const phase     = useMemo(() => detectPhase(metrics), [metrics])
  const directive = useMemo(() => aiDirective ?? getDirective(phase, metrics), [aiDirective, phase, metrics])
  const phaseIdx  = PHASES.findIndex(p => p.id === phase)

  const sgi    = useMemo(() => getSGI(metrics),             [metrics])
  const dddm   = useMemo(() => getDDDM(metrics),            [metrics])
  const tend   = useMemo(() => getTendencias(),             [])
  const sust   = useMemo(() => getSustentabilidade(metrics),[metrics])
  const okrs   = useMemo(() => getPhaseOKRs(phase, metrics),[phase, metrics])
  const gov    = useMemo(() => getGovernanca(metrics, phase),[metrics, phase])
  const norte  = useMemo(() => getNorte(phase, metrics),    [phase, metrics])
  const monitor= useMemo(() => getMonitor(metrics, phase),  [metrics, phase])

  const sgiOk  = sgi.filter(i => i.ok).length
  const dddmOk = dddm.filter(i => i.ok).length
  const tendOk = tend.filter(i => i.ok).length
  const sustOk = sust.filter(i => i.ok).length

  function toggleWeek(i: number) {
    const key = `w${i}`
    setWeekDone(prev => {
      const next = prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]
      try { localStorage.setItem(`${STORAGE_KEY}-week`, JSON.stringify(next)) } catch {}
      return next
    })
  }

  useEffect(() => {
    try {
      const r = localStorage.getItem(`${STORAGE_KEY}-week`)
      if (r) setWeekDone(JSON.parse(r))
    } catch {}
  }, [])

  if (loadingM) return (
    <div className="flex items-center justify-center py-16">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
    </div>
  )

  return (
    <div className="space-y-6 text-white font-sans p-2">
      {/* ── TOP NAV: TIMELINE DE FASES DE CRESCIMENTO (IPB Soft style) ── */}
      <div className="ipb-soft rounded-[1.2rem] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d2af5a] animate-pulse" />
            <span className="text-[7.5px] md:text-[9px] uppercase tracking-[0.25em] font-mono font-bold text-white/50">SEA FISIO STRATEGIC COCKPIT</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[#d2af5a]/35 bg-[#d2af5a]/5 px-2.5 py-0.5 text-[8px] font-mono font-bold text-[#d2af5a]">
            {phase.toUpperCase()} ATIVA
          </div>
        </div>
        
        <div className="relative flex items-center justify-between mt-4 px-4">
          {/* Background Line */}
          <div className="absolute left-6 right-6 top-1/2 h-[1px] -translate-y-1/2 bg-white/5" />
          {/* Active Highlight Line */}
          <div 
            className="absolute left-6 top-1/2 h-[1px] -translate-y-1/2 bg-[#d2af5a] shadow-[0_0_8px_rgba(210,175,90,0.6)] transition-all duration-500" 
            style={{ width: `${(phaseIdx / (PHASES.length - 1)) * 100}%` }}
          />
          
          {PHASES.map((ph, i) => {
            const isActive = i === phaseIdx
            const isPast = i < phaseIdx
            return (
              <div key={ph.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 font-mono text-[9px] font-bold ${
                    isActive 
                      ? 'border-[#d2af5a] bg-[#0c0c0c] text-[#d2af5a] shadow-[0_0_12px_rgba(210,175,90,0.4)] scale-110' 
                      : isPast 
                        ? 'border-white/40 bg-white/20 text-white/90' 
                        : 'border-white/10 bg-[#030303] text-white/20'
                  }`}
                >
                  {ph.label}
                </div>
                <span className={`text-[7.5px] mt-1 font-mono tracking-wider transition-colors ${isActive ? 'text-[#d2af5a] font-bold' : 'text-white/20'}`}>
                  {ph.sublabel}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── CENTRAL GRID: 3 COLUMNS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUNA 1: METRICAS E SAUDE CLINICA (IPB Soft) */}
        <div className="ipb-soft rounded-[1.2rem] p-5 flex flex-col justify-between">
          <div>
            <p className="text-[7.5px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-[#d2af5a] mb-4 border-b border-white/5 pb-2">Clinical & Business Metrics</p>
            
            <div className="space-y-4">
              {/* Card 1: Users */}
              <div className="chrome-subtle rounded-[1rem] p-4 transition-all hover:border-[#d2af5a]/30">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[7.5px] md:text-[8px] font-mono tracking-wider text-white/30 uppercase">Total Patients</p>
                    <p className="text-[24px] font-bold text-white tracking-tight mt-1 font-mono">{metrics.totalUsers}</p>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-[#d2af5a] px-2 py-0.5 rounded-full bg-[#d2af5a]/5 border border-[#d2af5a]/20">Active</span>
                </div>
                {/* Decorative sparkline */}
                <div className="h-10 mt-3 flex items-end">
                  <svg className="w-full h-full text-[#d2af5a]/50" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path d="M0,25 Q15,10 30,20 T60,5 T90,12 T100,2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M0,25 Q15,10 30,20 T60,5 T90,12 T100,2 L100,30 L0,30 Z" fill="url(#goldGrad)" opacity="0.06" />
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d2af5a" />
                        <stop offset="100%" stopColor="#d2af5a" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Card 2: Weekly Activity */}
              <div className="chrome-subtle rounded-[1rem] p-4 transition-all hover:border-[#d2af5a]/30">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[7.5px] md:text-[8px] font-mono tracking-wider text-white/30 uppercase">Weekly Activity</p>
                    <p className="text-[24px] font-bold text-white tracking-tight mt-1 font-mono">{metrics.activeWeek}</p>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">Sessions</span>
                </div>
                {/* Simple mini-bar chart */}
                <div className="h-8 mt-4 flex items-end gap-1 px-1">
                  {[20, 35, 25, 45, 60, 40, 55, 70, 50, 65, 80].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-[#d2af5a]/20 hover:bg-[#d2af5a] transition-all" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* Card 3: 7d Retention */}
              <div className="chrome-subtle rounded-[1rem] p-4 transition-all hover:border-[#d2af5a]/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[7.5px] md:text-[8px] font-mono tracking-wider text-white/30 uppercase">7d Retention</p>
                    <p className="text-[24px] font-bold text-white tracking-tight font-mono">{metrics.retention7d}%</p>
                    <p className="text-[7px] text-white/20 font-mono">Target: &gt; 40%</p>
                  </div>
                  <div className="relative h-12 w-12 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-white/5" stroke="currentColor" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#d2af5a] transition-all duration-1000" strokeDasharray={`${metrics.retention7d}, 100`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[8.5px] font-mono font-bold text-[#d2af5a]">
                      {metrics.retention7d}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: NPS & Subscriptions */}
              <div className="chrome-subtle rounded-[1rem] p-4 transition-all hover:border-[#d2af5a]/30">
                <div className="grid grid-cols-2 gap-2 divide-x divide-white/5">
                  <div className="pr-2">
                    <p className="text-[7.5px] md:text-[8px] font-mono tracking-wider text-white/30 uppercase">NPS Score</p>
                    <p className={`text-[18px] font-bold tracking-tight mt-1 font-mono ${metrics.nps === null ? 'text-white/30' : metrics.nps >= 30 ? 'text-[#d2af5a]' : 'text-white/70'}`}>
                      {metrics.nps ?? 'N/A'}
                    </p>
                  </div>
                  <div className="pl-4">
                    <p className="text-[7.5px] md:text-[8px] font-mono tracking-wider text-white/30 uppercase">Active Subs</p>
                    <p className="text-[18px] font-bold text-white tracking-tight mt-1 font-mono">{metrics.subsActive}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {metrics.loadedAt && (
            <p className="text-[7px] text-white/20 mt-4 text-right">Telemetria sync: {metrics.loadedAt}</p>
          )}
        </div>

        {/* COLUNA 2: LLaMA AI ADVISOR (IPB Soft) */}
        <div className="ipb-soft rounded-[1.2rem] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <div className="flex flex-col">
                <p className="text-[7.5px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-[#d2af5a]">LLaMA AI Advisor</p>
                <span className="text-[7px] font-mono text-white/30">Groq • LLaMA 70b</span>
              </div>
              <button onClick={() => fetchAI(metrics, phase)} disabled={loadingAI}
                className="flex items-center gap-1.5 rounded border border-[#d2af5a]/35 bg-[#d2af5a]/5 px-2.5 py-1 text-[8px] font-mono font-bold text-[#d2af5a] hover:bg-[#d2af5a]/15 transition-all disabled:opacity-30">
                <Sparkles className="h-2.5 w-2.5 animate-pulse" />{loadingAI ? '...' : 'REGENERAR'}
              </button>
            </div>

            {/* AI Focus Block */}
            <div className="relative overflow-hidden rounded-[1rem] border border-[#d2af5a]/20 bg-[#d2af5a]/5 p-4 mb-4 shadow-[0_0_15px_rgba(210,175,90,0.03)]">
              <p className="text-[7.5px] md:text-[8px] font-mono tracking-wider text-[#d2af5a] uppercase">Current Focus</p>
              <p className="text-[11px] md:text-[12px] font-semibold leading-snug text-white mt-1.5">{directive.foco}</p>
            </div>

            {/* Strategic Directives */}
            <div className="chrome-subtle rounded-[1rem] p-4 mb-4">
              <p className="text-[7.5px] md:text-[8px] font-mono tracking-wider text-white/30 uppercase mb-2">Directives</p>
              <p className="text-[9px] md:text-[10px] leading-relaxed text-white/70">{directive.diretiva}</p>
            </div>
          </div>

          {/* Blockages & Signals */}
          <div className="grid grid-cols-1 gap-3 pt-3 border-t border-white/5">
            <div className="chrome-subtle rounded-[0.8rem] p-3">
              <p className="text-[7.5px] md:text-[8px] font-mono font-semibold uppercase tracking-[0.12em] text-[#C0C0C0] mb-1">Bloqueio Crítico</p>
              <p className="text-[8.5px] leading-relaxed text-white/40 italic">{directive.bloqueio}</p>
            </div>
            <div className="rounded-[0.8rem] bg-[#d2af5a]/5 border border-[#d2af5a]/10 p-3">
              <p className="text-[7.5px] md:text-[8px] font-mono font-semibold uppercase tracking-[0.12em] text-[#d2af5a] mb-1">Sinal de Avanço</p>
              <p className="text-[8.5px] leading-relaxed text-white/70">{directive.sinal}</p>
            </div>
          </div>
        </div>

        {/* COLUNA 3: CHECKLIST & OKRs (IPB Soft) */}
        <div className="ipb-soft rounded-[1.2rem] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <div className="flex flex-col">
                <p className="text-[7.5px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-[#d2af5a]">Weekly Checklist</p>
                <span className="text-[7px] font-mono text-white/30">Tasks (Week {phaseIdx + 1})</span>
              </div>
              <div className="flex items-center gap-1 text-[#d2af5a] font-mono text-[9px] font-bold">
                {Math.round((weekDone.length / directive.acoes.length) * 100)}%
              </div>
            </div>

            {/* Checklist cards */}
            <div className="space-y-2 mb-4">
              {directive.acoes.map((acao, i) => {
                const done = weekDone.includes(`w${i}`)
                return (
                  <button key={i} onClick={() => toggleWeek(i)}
                    className={`flex w-full items-start gap-3 rounded-[0.8rem] border p-3 text-left transition-all ${done ? 'border-[#d2af5a]/22 bg-[#d2af5a]/5 hover:bg-[#d2af5a]/10' : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'}`}>
                    {done
                      ? <CheckSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d2af5a]" />
                      : <Square      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/20" />
                    }
                    <div className="flex-1 min-w-0">
                      <span className={`text-[8.5px] leading-relaxed ${done ? 'text-white/30 line-through' : 'text-white/70'}`}>
                        {acao}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* OKRs */}
          <div className="border-t border-white/5 pt-4">
            <p className="text-[7.5px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-[#d2af5a] mb-3">Cycle OKRs ({phase.toUpperCase()})</p>
            <div className="space-y-3">
              {okrs.map((okr, oi) => (
                <div key={oi} className="chrome-subtle rounded-[0.8rem] p-3 space-y-2.5">
                  <p className="text-[8.5px] font-bold text-white/80 leading-snug">O{oi + 1}. {okr.objetivo}</p>
                  {okr.krs.map((kr, ki) => (
                    <div key={ki} className="flex items-start gap-2 pt-1.5 border-t border-white/5">
                      <span className="text-[7px] font-mono text-white/30 shrink-0 mt-0.5">KR{ki + 1}</span>
                      <div className="flex-1">
                        <p className="text-[8px] text-white/50 leading-snug mb-1">{kr.descricao}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#d2af5a] rounded-full transition-all duration-500" style={{ width: `${kr.progresso}%` }} />
                          </div>
                          <span className="text-[7px] font-mono text-white/30 w-6 text-right">{kr.progresso}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── NORTE ESTRATÉGICO COMPACTO (IPB Soft) ── */}
      <div className="ipb-soft rounded-[1.2rem] p-5">
        <p className="text-[7.5px] md:text-[9px] font-bold uppercase tracking-[0.2em] font-mono text-[#d2af5a] mb-3">Norte Estratégico</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="pb-3 md:pb-0">
            <p className="text-[7px] font-semibold font-mono uppercase tracking-[0.15em] text-white/20 mb-1">Situação Atual</p>
            <p className="text-[8.5px] leading-relaxed text-white/50">{norte.onde}</p>
          </div>
          <div className="pt-3 md:pt-0 md:pl-4">
            <p className="text-[7px] font-semibold font-mono uppercase tracking-[0.15em] text-white/20 mb-1">Próximo Objetivo</p>
            <p className="text-[8.5px] leading-relaxed text-white/50">{norte.proximo}</p>
          </div>
          <div className="pt-3 md:pt-0 md:pl-4">
            <p className="text-[7px] font-semibold font-mono uppercase tracking-[0.15em] text-[#d2af5a]/75 mb-1">Aposta Estratégica</p>
            <p className="text-[8.5px] leading-relaxed text-white/70 font-medium">{norte.aposta}</p>
          </div>
        </div>
      </div>

      {/* ── ADVANCED PANEL: GOVERNANÇA E CONTROLE (GAVETA COLAPSÁVEL COM IPB-SOFT) ── */}
      <div className="border-t border-white/5 pt-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.25em] font-mono text-[#d2af5a]">Governance & Advanced Architecture</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* SGI */}
          <Sec label="Digital Integration Map (SGI)" badge={`${sgiOk}/${sgi.length}`} open={open.sgi} toggle={() => tog('sgi')}>
            <div className="space-y-1 ipb-soft p-2.5 rounded-[0.8rem]">
              {sgi.map((item, i) => <CheckRow key={i} item={item} />)}
            </div>
          </Sec>

          {/* DDDM */}
          <Sec label="Data-Driven Strategy (DDDM)" badge={`${dddmOk}/${dddm.length}`} open={open.dddm} toggle={() => tog('dddm')}>
            <div className="space-y-1 ipb-soft p-2.5 rounded-[0.8rem]">
              {dddm.map((item, i) => <CheckRow key={i} item={item} />)}
            </div>
          </Sec>

          {/* Trends */}
          <Sec label="Market Trends" badge={`${tendOk}/${tend.length}`} open={open.tend} toggle={() => tog('tend')}>
            <div className="space-y-1 ipb-soft p-2.5 rounded-[0.8rem]">
              {tend.map((item, i) => <CheckRow key={i} item={item} />)}
            </div>
          </Sec>

          {/* Sustentabilidade */}
          <Sec label="Sustentabilidade" badge={`${sustOk}/${sust.length}`} open={open.sust} toggle={() => tog('sust')}>
            <div className="space-y-1 ipb-soft p-2.5 rounded-[0.8rem]">
              {sust.map((item, i) => <CheckRow key={i} item={item} />)}
            </div>
          </Sec>

          {/* Governança */}
          <Sec label="Corporate Governance" open={open.gov} toggle={() => tog('gov')}>
            <div className="space-y-2 ipb-soft p-2.5 rounded-[0.8rem]">
              {gov.map((pilar, pi) => {
                const okCount = pilar.items.filter(i => i.ok).length
                return (
                  <div key={pi} className="rounded-[0.6rem] border border-white/5 p-2.5 space-y-1 bg-white/[0.005]">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[8px] font-mono font-bold text-white/40">{pilar.pilar}</p>
                      <span className="text-[7px] font-mono text-white/20">{okCount}/{pilar.items.length}</span>
                    </div>
                    {pilar.items.map((item, ii) => (
                      <div key={ii} className="flex items-start gap-1">
                        {item.ok
                          ? <CheckCircle2 className="mt-0.5 h-2.5 w-2.5 shrink-0 text-[#d2af5a]/80" />
                          : <AlertCircle className="mt-0.5 h-2.5 w-2.5 shrink-0 text-white/20" />
                        }
                        <div className="flex-1 min-w-0">
                          <p className={`text-[7.5px] font-mono leading-tight ${item.ok ? 'text-white/60' : 'text-white/25'}`}>{item.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </Sec>

          {/* Monitor */}
          <Sec label="Strategic Telemetry Monitor" open={open.monitor} toggle={() => tog('monitor')}>
            <div className="space-y-2 ipb-soft p-2.5 rounded-[0.8rem]">
              <div className="grid grid-cols-2 gap-1.5">
                {monitor.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 rounded-[0.5rem] border border-white/5 px-2 py-1.5 bg-white/[0.01]">
                    <MonitorDot status={item.status} />
                    <div className="min-w-0">
                      <p className="text-[7px] font-mono text-white/30 truncate">{item.label}</p>
                      <p className="text-[7px] font-mono font-bold text-white/70">{item.valor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Sec>
        </div>
      </div>
    </div>
  )
}
