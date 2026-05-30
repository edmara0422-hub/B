'use client'

import { useState, useEffect, useMemo } from 'react'
import { Sparkles, TrendingUp, Globe, Users, Leaf, ChevronRight, AlertTriangle, Zap, CheckCircle2, ShieldAlert } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'

// Importando os componentes tridimensionais procedurais exportados
import { BrainParticles } from './mini-capital-humano'
import { StrategyGlobe } from './mini-estrategia'
import { EsgShield } from './mini-esg'

// Importação dinâmica dos painéis de detalhes (HUDs) para performance impecável
const HudEstrategia = dynamic(() => import('./hud-estrategia').then(m => m.HudEstrategia), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudCapitalHumano = dynamic(() => import('./hud-capital-humano').then(m => m.HudCapitalHumano), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudFinancas = dynamic(() => import('./hud-financas').then(m => m.HudFinancas), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudEsg = dynamic(() => import('./hud-esg').then(m => m.HudEsg), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })
const HudAi = dynamic(() => import('./hud-ai').then(m => m.HudAi), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-3xl" /> })

type SystemId = 'financas' | 'capital_humano' | 'estrategia' | 'esg' | 'ai'

export function InteractiveCockpit() {
  const [activePanel, setActivePanel] = useState<SystemId>('financas')
  const [mounted, setMounted] = useState(false)

  // Telemetria real-time integrada para cálculo de dados do dashboard
  const [faturamento, setFaturamento] = useState(150)
  const [opex, setOpex] = useState(60)
  const [cac, setCac] = useState(350)
  const [clientes, setClientes] = useState(1200)
  const [pressaoMetas, setPressaoMetas] = useState(5)
  const [cenario, setCenario] = useState<'normal' | 'juros_altos' | 'ia_boom'>('normal')

  useEffect(() => {
    setMounted(true)
    const handleTelemetry = () => {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry) {
        setFaturamento(telemetry.faturamento ?? 150)
        setOpex(telemetry.opex ?? 60)
        setCac(telemetry.cac ?? 350)
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
  
  // PILAR 1: GESTÃO DE PESSOAS, LIDERANÇA E SAÚDE MENTAL
  const eebBurnout = useMemo(() => {
    return Math.round(Math.min(98, 5 + Math.pow(pressaoMetas, 2.1)))
  }, [pressaoMetas])

  const turnover = useMemo(() => {
    // Escala com base na pressão de metas, partindo da alarmante base nacional de 38%
    return Number((38 + Math.pow(pressaoMetas, 1.4) * 2.5).toFixed(1))
  }, [pressaoMetas])

  const iaeStress = useMemo(() => {
    // Índice de Ansiedade e Estresse Clínico (PSS-10) com base nacional de 9.3%
    return Number((9.3 + pressaoMetas * 7.5).toFixed(1))
  }, [pressaoMetas])

  // PILAR 2: FINANÇAS, MATEMÁTICA E CONTROLADORIA
  const ebitdaMarginVal = useMemo(() => {
    // ebitda opera de forma inversa ao estresse (equipes esgotadas quebram a margem)
    const base = 83.5 - (eebBurnout * 0.18)
    return Number((base > 0 ? base : 10).toFixed(1))
  }, [eebBurnout])

  const wacc = useMemo(() => {
    // WACC médio nacional de 17.2%, sofrendo aumento por custo da dívida se Selic sobe
    return cenario === 'juros_altos' ? 18.9 : 17.2
  }, [cenario])

  const ltvCac = useMemo(() => {
    const ticketMedio = (faturamento * 1000) / (clientes || 1)
    const churn = 0.025
    const ltv = ticketMedio / churn
    return cac > 0 ? Number((ltv / cac).toFixed(2)) : 3.2
  }, [faturamento, clientes, cac])

  // PILAR 3: ECONOMIA, MERCADO E TENDÊNCIAS
  const jurosReais = useMemo(() => {
    const selicVal = cenario === 'juros_altos' ? 15.50 : 14.40
    const ipca = 4.39
    return Number((((1 + selicVal / 100) / (1 + ipca / 100) - 1) * 100).toFixed(2)) // ~10.01%
  }, [cenario])

  const peRatio = useMemo(() => {
    // P/E Ratio da Bolsa (8.2x no Brasil vs 17.2x no mundo)
    return cenario === 'juros_altos' ? 7.4 : 8.2
  }, [cenario])

  // --- MATRIZ DE INTERDEPENDÊNCIA & REGRAS DE DECISÃO CRUZADAS (IA) ---
  const dynamicRules = useMemo(() => {
    const rules = []
    
    // Regra 1: O Custo Financeiro do Esgotamento Humano (Turnover & LTV/CAC)
    if (eebBurnout > 25 && ltvCac > 3.0) {
      const custoEstimadoAnual = Math.round(turnover * 1.5 * 30) // Exemplo de cálculo real
      rules.push({
        type: 'critical',
        title: 'CASCATA 1: ESGOTAMENTO HUMANO',
        desc: `Burnout Coletivo em ${eebBurnout}% E LTV/CAC saudável em ${ltvCac}x. Custo estimado de Turnover anualizado de R$ ${custoEstimadoAnual}k. Ação automatizada: Reduzir metas operacionais em 15% esta semana para estancar perdas e evitar fadiga comercial.`
      })
    }

    // Regra 2: Alocação de Caixa vs WACC & SELIC
    const selicVal = cenario === 'juros_altos' ? 15.50 : 14.40
    if (selicVal > 14.0) {
      rules.push({
        type: 'warning',
        title: 'CASCATA 2: PROTEÇÃO DE CAIXA',
        desc: `SELIC elevada a ${selicVal}%. O custo da dívida explodiu, pressionando o WACC corporativo para ${wacc}%. Ação: Travar imediatamente novos financiamentos PJ e alocar 40% do caixa líquido operacional em ativos CDI de alta liquidez.`
      })
    }

    // Regra 3: Eficiência Saudável (EBITDA / Estresse)
    const eficienciaSaudavel = Number((ebitdaMarginVal / (iaeStress || 1) * 10).toFixed(2))
    if (iaeStress > 45.0) {
      rules.push({
        type: 'alert',
        title: 'CASCATA 3: CRESCIMENTO INSUSTENTÁVEL',
        desc: `Faturamento ativo, mas Ansiedade PSS-10 atingiu nível crítico de ${iaeStress}%. Sinistralidade médica escalou 28%. Ação recomendada: Iniciar escala reduzida 4x3 e rotatividade preventiva de lideranças para blindar a produtividade.`
      })
    }

    return rules
  }, [eebBurnout, ltvCac, turnover, cenario, wacc, ebitdaMarginVal, iaeStress])

  // Renderiza o painel ativo na coluna direita
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
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-container {
          background: rgba(10, 10, 12, 0.45);
          border: 1px solid rgba(212, 184, 122, 0.08);
        }
        .cockpit-side-card {
          height: 235px;
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cockpit-side-card:hover {
          border-color: rgba(212, 184, 122, 0.40) !important;
          background: rgba(15, 14, 12, 0.85) !important;
          box-shadow: 0 0 25px rgba(212, 184, 122, 0.15) !important;
        }
        .matrix-box {
          background: rgba(15, 12, 8, 0.7);
          border: 1px solid rgba(212, 184, 122, 0.2);
        }
      `}} />

      {/* Cabeçalho Executivo Dourado do Cockpit */}
      <div className="w-full flex justify-between items-center dashboard-container p-4 rounded-2xl backdrop-blur-md select-none">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#d4b87a] animate-pulse" />
          <h1 className="text-white text-lg font-black tracking-widest uppercase">
            BUSINESS INTELLIGENCE <span className="text-[#d4b87a]">COCKPIT</span>
          </h1>
        </div>
        <span className="text-xs font-mono text-white/40 font-bold uppercase tracking-wider">
          SEP 2024
        </span>
      </div>

      {/* Grade Principal de 2 Colunas Fixas (Mockup Idêntico) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[38%_62%] gap-6 items-stretch min-h-[750px]">
        
        {/* COLUNA ESQUERDA: Os 3 Cards Analíticos Tridimensionais Fixados */}
        <div className="flex flex-col gap-5 justify-between">
          
          {/* Card 1: CAP. HUMANO */}
          <div 
            onClick={() => setActivePanel('capital_humano')}
            className={`cockpit-side-card cockpit-card mini-sim-card neuro flex flex-col justify-between cursor-pointer select-none rounded-3xl ${
              activePanel === 'capital_humano' ? 'border-[#d4b87a] bg-[#0f0e0a]/95 shadow-[0_0_25px_rgba(212,184,122,0.2)]' : 'border-white/10'
            }`}
          >
            {/* Background WebGL 3D Canvas - Alinhado à esquerda */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas camera={{ position: [0.45, 0, 1.8], fov: 45 }}>
                  <ambientLight intensity={1.8} />
                  <BrainParticles pressaoMetas={pressaoMetas} />
                </Canvas>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-[10.5px] font-bold text-white tracking-widest uppercase">1) CAP. HUMANO</span>
              <button className="text-[9.5px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5 hover:text-white transition-colors">
                Cap. Humano <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Content (Métricas Douradas Direitas do Mockup) */}
            <div className="flex-1 w-full flex items-center z-10 pointer-events-none select-none">
              <div className="ml-auto w-[52%] flex flex-col justify-center pl-2 space-y-2.5">
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Engagement (Humor)</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{engagement}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Retention (Turnover)</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{retention}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Talent Index</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{talent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: ESTRATÉGIA */}
          <div 
            onClick={() => setActivePanel('estrategia')}
            className={`cockpit-side-card cockpit-card mini-sim-card cardio flex flex-col justify-between cursor-pointer select-none rounded-3xl ${
              activePanel === 'estrategia' ? 'border-[#d4b87a] bg-[#0f0e0a]/95 shadow-[0_0_25px_rgba(212,184,122,0.2)]' : 'border-white/10'
            }`}
          >
            {/* Background WebGL 3D Canvas - Alinhado à esquerda */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas camera={{ position: [0.45, 0, 1.8], fov: 45 }}>
                  <ambientLight intensity={1.8} />
                  <StrategyGlobe cenario={cenario} />
                </Canvas>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-[10.5px] font-bold text-white tracking-widest uppercase">2) ESTRATÉGIA</span>
              <button className="text-[9.5px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5 hover:text-white transition-colors">
                Estratégia <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Content (Métricas Douradas Direitas do Mockup) */}
            <div className="flex-1 w-full flex items-center z-10 pointer-events-none select-none">
              <div className="ml-auto w-[52%] flex flex-col justify-center pl-2 space-y-2.5">
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Global Market Share</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">+{globalMarketSharePercent}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Market Share Brasil</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">88%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Growth Outlook</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">${growthOutlookVal}k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: SUSTENTABILIDADE */}
          <div 
            onClick={() => setActivePanel('esg')}
            className={`cockpit-side-card cockpit-card mini-esg-card flex flex-col justify-between cursor-pointer select-none rounded-3xl ${
              activePanel === 'esg' ? 'border-[#d4b87a] bg-[#0f0e0a]/95 shadow-[0_0_25px_rgba(212,184,122,0.2)]' : 'border-white/10'
            }`}
          >
            {/* Background WebGL 3D Canvas - Alinhado à esquerda */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas camera={{ position: [0.45, 0, 1.8], fov: 45 }}>
                  <ambientLight intensity={1.8} />
                  <EsgShield />
                </Canvas>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-[10.5px] font-bold text-white tracking-widest uppercase">3) SUSTENTABILIDADE</span>
              <button className="text-[9.5px] font-mono font-bold text-[#d4b87a] flex items-center gap-0.5 hover:text-white transition-colors">
                Sustentabilidade <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Content (Métricas Douradas Direitas do Mockup) */}
            <div className="flex-1 w-full flex items-center z-10 pointer-events-none select-none">
              <div className="ml-auto w-[52%] flex flex-col justify-center pl-2 space-y-4">
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">ESG Performance</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{esgPerformance}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] uppercase tracking-wider text-white/35 font-bold">Carbon Footprint</span>
                  <span className="text-[20px] font-bold text-[#d4b87a] font-mono leading-none mt-0.5">{carbonFootprint}M</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA: O Painel de Análise Dinâmico Ativo */}
        <div className="flex-1 flex flex-col gap-5 justify-between">
          
          {/* O HUD Analítico Ativo */}
          <div className="flex-1">
            {renderHeroContent()}
          </div>

          {/* MATRIZ DE INTERDEPENDÊNCIA & REGRAS DE DECISÃO CRUZADAS (IA) */}
          <div className="matrix-box p-4 rounded-3xl select-none backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#d4b87a]/15">
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
