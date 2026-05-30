'use client'

import { useState, useEffect, useMemo } from 'react'
import { Sparkles, TrendingUp, Globe, Users, Leaf, ShieldAlert } from 'lucide-react'

import dynamic from 'next/dynamic'

// Lightweight Mini components are imported from separate lightweight files
import { MiniEstrategia } from './mini-estrategia'
import { MiniCapitalHumano } from './mini-capital-humano'
import { MiniEsg } from './mini-esg'
import { MiniAi } from './mini-ai'

// Heavy HUD components are lazy loaded to prevent UI blocking
const HudEstrategia = dynamic(() => import('./hud-estrategia').then(m => m.HudEstrategia), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudCapitalHumano = dynamic(() => import('./hud-capital-humano').then(m => m.HudCapitalHumano), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudFinancas = dynamic(() => import('./hud-financas').then(m => m.HudFinancas), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudEsg = dynamic(() => import('./hud-esg').then(m => m.HudEsg), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudAi = dynamic(() => import('./hud-ai').then(m => m.HudAi), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })

type SystemId = 'financas' | 'capital_humano' | 'estrategia' | 'esg' | 'ai'

interface SystemDef {
  id: SystemId
  title: string
  icon: any
  color: string
}

const SYSTEMS: Record<SystemId, SystemDef> = {
  financas: { id: 'financas', title: 'Finanças & Controladoria', icon: TrendingUp, color: '#d4b87a' },
  capital_humano: { id: 'capital_humano', title: 'Pessoas & Liderança', icon: Users, color: '#d4b87a' },
  estrategia: { id: 'estrategia', title: 'Estratégia & Economia', icon: Globe, color: '#d4b87a' },
  esg: { id: 'esg', title: 'Sustentabilidade & ESG', icon: Leaf, color: '#d4b87a' },
  ai: { id: 'ai', title: 'IPB AI Assistant', icon: Sparkles, color: '#d4b87a' },
}

export function InteractiveCockpit() {
  const [activePanel, setActivePanel] = useState<SystemId>('financas')

  // Telemetria real-time integrada para a Matriz de Interdependência da Home
  const [faturamento, setFaturamento] = useState(150)
  const [cac, setCac] = useState(350)
  const [opex, setOpex] = useState(60)
  const [clientes, setClientes] = useState(1200)
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  useEffect(() => {
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setFaturamento(telemetry.faturamento ?? 150)
        setCac(telemetry.cac ?? 350)
        setOpex(telemetry.opex ?? 60)
        setClientes(telemetry.clientes ?? 1200)
        setPressaoMetas(telemetry.pressaoMetas ?? 5)
        setCenario(telemetry.cenario ?? 'normal')
      }
    }
    handleTelemetry()
    window.addEventListener('ipb-telemetry', handleTelemetry)
    return () => window.removeEventListener('ipb-telemetry', handleTelemetry)
  }, [])

  // --- ANÁLISE DE DADOS EM TEMPO REAL CONECTADA ÀS EQUAÇÕES EXATAS DO IPB ---
  const eebBurnout = useMemo(() => {
    return Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  }, [pressaoMetas])

  const turnover = useMemo(() => {
    return Number((38 + Math.pow(pressaoMetas, 1.4) * 2.5).toFixed(1))
  }, [pressaoMetas])

  const iaeStress = useMemo(() => {
    return Number((9.3 + pressaoMetas * 7.5).toFixed(1))
  }, [pressaoMetas])

  const ebitdaMarginVal = useMemo(() => {
    const base = 83.5 - (eebBurnout * 0.18)
    return Number((base > 0 ? base : 10).toFixed(1))
  }, [eebBurnout])

  const wacc = useMemo(() => {
    return cenario === 'juros_altos' ? 18.9 : 17.2
  }, [cenario])

  const ltvCac = useMemo(() => {
    const ticketMedio = (faturamento * 1000) / (clientes || 1)
    const churn = 0.025
    const ltv = ticketMedio / churn
    return cac > 0 ? Number((ltv / cac).toFixed(2)) : 3.2
  }, [faturamento, clientes, cac])

  const selicVal = cenario === 'juros_altos' ? 15.50 : 14.40
  const ipca = 4.39

  // --- MATRIZ DE INTERDEPENDÊNCIA & REGRAS DE DECISÃO CRUZADAS (IA) ---
  const dynamicRules = useMemo(() => {
    const rules = []
    
    // Regra 1: O Custo Financeiro do Esgotamento Humano (Turnover & LTV/CAC)
    if (eebBurnout > 25 && ltvCac > 3.0) {
      const custoEstimadoAnual = Math.round(turnover * 1.5 * 30)
      rules.push({
        type: 'critical',
        title: 'CASCATA 1: ESGOTAMENTO HUMANO',
        desc: `Burnout Coletivo em ${eebBurnout}% E LTV/CAC saudável em ${ltvCac}x. Custo estimado de Turnover anualizado de R$ ${custoEstimadoAnual}k. Ação automatizada: Reduzir metas operacionais em 15% esta semana para estancar perdas e evitar fadiga comercial.`
      })
    }

    // Regra 2: Alocação de Caixa vs WACC & SELIC
    if (selicVal > 14.0) {
      rules.push({
        type: 'warning',
        title: 'CASCATA 2: PROTEÇÃO DE CAIXA',
        desc: `SELIC elevada a ${selicVal}%. O custo da dívida explodiu, pressionando o WACC corporativo para ${wacc}%. Ação: Travar imediatamente novos empréstimos PJ e alocar 40% do caixa líquido operacional em ativos CDI de alta liquidez.`
      })
    }

    // Regra 3: Eficiência Saudável (EBITDA / Estresse)
    if (iaeStress > 45.0) {
      rules.push({
        type: 'alert',
        title: 'CASCATA 3: CRESCIMENTO INSUSTENTÁVEL',
        desc: `Faturamento active, mas Ansiedade PSS-10 atingiu nível crítico de ${iaeStress}%. Sinistralidade médica escalou 28%. Ação recomendada: Iniciar escala reduzida 4x3 e rotatividade preventiva de lideranças para blindar a produtividade.`
      })
    }

    return rules
  }, [eebBurnout, ltvCac, turnover, cenario, wacc, ebitdaMarginVal, iaeStress, selicVal])

  const renderHeroContent = () => {
    switch (activePanel) {
      case 'financas': return <HudFinancas />
      case 'capital_humano': return <HudCapitalHumano />
      case 'estrategia': return <HudEstrategia />
      case 'esg': return <HudEsg />
      case 'ai': return <HudAi />
      default: return <HudFinancas />
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Cabeçalho Executivo Dourado do Cockpit com Abas de Navegação */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-black/45 border border-white/5 p-4 rounded-2xl backdrop-blur-md select-none gap-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#d4b87a] animate-pulse" />
          <h1 className="text-white text-base font-black tracking-widest uppercase">
            BUSINESS INTELLIGENCE <span className="text-[#d4b87a]">COCKPIT 6D</span>
          </h1>
        </div>
        
        {/* Elegant Gold Switcher Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-1.5 p-1 bg-black/40 border border-white/5 rounded-xl">
          {(Object.keys(SYSTEMS) as SystemId[]).map((sysId) => {
            const sys = SYSTEMS[sysId]
            const active = activePanel === sysId
            return (
              <button
                key={sysId}
                onClick={() => setActivePanel(sysId)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  active 
                    ? 'bg-[#d4b87a]/15 border border-[#d4b87a]/35 text-white shadow-[0_0_12px_rgba(212,184,122,0.15)]'
                    : 'border border-transparent text-white/40 hover:text-white/70'
                }`}
              >
                {sys.title.split(' ')[0]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grade Principal de 2 Colunas Fixas (Igual ao Mockup e Estrutura da Home) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[38%_62%] gap-6 items-stretch min-h-[750px]">
        
        {/* COLUNA ESQUERDA: Os 4 Mini-Cards Analíticos Reais em SVG */}
        <div className="flex flex-col gap-5 justify-between">
          
          {/* Card 1: CAP. HUMANO */}
          <div 
            onClick={() => setActivePanel('capital_humano')}
            className={`group relative overflow-hidden flex flex-col justify-between p-1 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl transition-all duration-300 cursor-pointer select-none h-[220px] ${
              activePanel === 'capital_humano' 
                ? 'border-[#d4b87a] shadow-[0_0_20px_rgba(212,184,122,0.15)] bg-[#0f0e0a]/90' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <MiniCapitalHumano />
          </div>

          {/* Card 2: ESTRATÉGIA */}
          <div 
            onClick={() => setActivePanel('estrategia')}
            className={`group relative overflow-hidden flex flex-col justify-between p-1 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl transition-all duration-300 cursor-pointer select-none h-[220px] ${
              activePanel === 'estrategia' 
                ? 'border-[#d4b87a] shadow-[0_0_20px_rgba(212,184,122,0.15)] bg-[#0f0e0a]/90' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <MiniEstrategia />
          </div>

          {/* Card 3: GOVERNANÇA & ESG */}
          <div 
            onClick={() => setActivePanel('esg')}
            className={`group relative overflow-hidden flex flex-col justify-between p-1 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl transition-all duration-300 cursor-pointer select-none h-[220px] ${
              activePanel === 'esg' 
                ? 'border-[#d4b87a] shadow-[0_0_20px_rgba(212,184,122,0.15)] bg-[#0f0e0a]/90' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <MiniEsg />
          </div>

          {/* Card 4: IPB AI ASSISTANT */}
          <div 
            onClick={() => setActivePanel('ai')}
            className={`group relative overflow-hidden flex flex-col justify-between p-1 bg-[#0a0a0c]/85 border rounded-3xl backdrop-blur-xl transition-all duration-300 cursor-pointer select-none h-[220px] ${
              activePanel === 'ai' 
                ? 'border-[#d4b87a] shadow-[0_0_20px_rgba(212,184,122,0.15)] bg-[#0f0e0a]/90' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <MiniAi />
          </div>

        </div>

        {/* COLUNA DIREITA: O Painel de Análise Dinâmico Ativo + Matriz 6D no rodapé */}
        <div className="flex-1 flex flex-col gap-5 justify-between">
          
          {/* Main Hero HUD Panel */}
          <div className="flex-1 min-h-[500px]">
            {renderHeroContent()}
          </div>

          {/* MATRIZ DE INTERDEPENDÊNCIA & REGRAS DE DECISÃO CRUZADAS (IA) no rodapé do HUD */}
          <div className="p-4 rounded-3xl backdrop-blur-xl border select-none" style={{ background: 'rgba(15, 12, 8, 0.65)', borderColor: 'rgba(212, 184, 122, 0.15)' }}>
            <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(212, 184, 122, 0.15)' }}>
              <ShieldAlert className="h-4 w-4 text-[#d4b87a]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#d4b87a]">
                MATRIZ DE INTERDEPENDÊNCIA 6D • REGRAS DE DECISÃO DE IA
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {dynamicRules.map((rule, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl p-3 border text-[9px] leading-normal flex flex-col gap-1"
                  style={{
                    borderColor: rule.type === 'critical' ? 'rgba(248,113,113,0.2)' : rule.type === 'warning' ? 'rgba(250,204,21,0.2)' : 'rgba(96,165,250,0.2)',
                    background: rule.type === 'critical' ? 'rgba(248,113,113,0.03)' : rule.type === 'warning' ? 'rgba(250,204,21,0.03)' : 'rgba(96,165,250,0.02)',
                  }}
                >
                  <span 
                    className="font-bold tracking-wider text-[8.5px] uppercase"
                    style={{
                      color: rule.type === 'critical' ? '#fca5a5' : rule.type === 'warning' ? '#fde68a' : '#93c5fd'
                    }}
                  >
                    {rule.title}
                  </span>
                  <p className="text-white/65 mt-0.5">{rule.desc}</p>
                </div>
              ))}
              {dynamicRules.length === 0 && (
                <div className="col-span-3 text-center text-white/35 py-2 text-[9px] font-semibold">
                  Nenhum risco cruzado crítico detectado. Operação está em perfeito equilíbrio.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
