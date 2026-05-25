import fs from 'fs'

const file = 'components/sea/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M5-S2 (Empreendedorismo e Inovação): 4 SIMULAÇÕES 6D NASA-LEVEL
// ============================================================================

export function SimEffectuationLogic({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [logic, setLogic] = useState(0) // 0: Causation, 1: Effectuation

  useEffect(() => {
    if(addLog) {
      if(logic === 0) addLog("Causation ativado: Planejamento linear para mercados previsíveis e maduros.")
      if(logic === 1) addLog("Effectuation ativado: Expansão orgânica a partir dos recursos atuais (Incerteza alta).")
    }
  }, [logic])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">LÓGICAS DE DECISÃO: CAUSATION VS EFFECTUATION</div>

      <div className="relative w-80 h-64 border border-white/10 bg-white/5 flex items-center justify-center mb-6">
         {/* Causation: Linear Path */}
         {logic === 0 && (
           <div className="absolute inset-0 flex items-center justify-between px-8">
             <div className="flex flex-col items-center gap-2">
               <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-[10px]">A</div>
               <div className="text-[8px] text-white/50">Recursos</div>
             </div>
             
             {/* Path */}
             <div className="relative flex-1 h-1 bg-white/20 mx-4 overflow-hidden">
               <div className="absolute top-0 left-0 h-full bg-[#00ffd0] animate-[scan_2s_linear_infinite]" style={{ width: '10%' }} />
             </div>

             <div className="flex flex-col items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-[#00ffd0]/20 border border-[#00ffd0] flex items-center justify-center text-[10px] text-[#00ffd0] shadow-[0_0_10px_#00ffd0]">B</div>
               <div className="text-[8px] text-[#00ffd0]">Objetivo Fixo</div>
             </div>
           </div>
         )}

         {/* Effectuation: Organic Network */}
         {logic === 1 && (
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-full h-full">
               {/* Center Node (Pássaro na mão) */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[#ff0055] bg-[#ff0055]/20 flex items-center justify-center text-[8px] text-[#ff0055] z-10 shadow-[0_0_15px_#ff0055]">VOCÊ</div>
               
               {/* Growing Network (Colcha de retalhos / Limonada) */}
               {[0, 60, 120, 180, 240, 300].map(angle => (
                 <div key={angle} className="absolute top-1/2 left-1/2 w-32 h-[1px] origin-left" style={{ transform: \`rotate(\${angle}deg)\` }}>
                   <div className="w-full h-full bg-gradient-to-r from-[#ff0055] to-transparent animate-pulse" />
                   {/* Possible futures */}
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/30 bg-black animate-ping" style={{ animationDelay: \`\${angle}ms\` }} />
                 </div>
               ))}
               
               <div className="absolute bottom-4 w-full text-center text-[8px] text-[#ff0055] font-bold">O OBJETIVO É CRIADO PELO CAMINHO</div>
             </div>
           </div>
         )}
      </div>

      <div className="flex gap-4 z-20">
        <button onClick={()=>setLogic(0)} className={\`px-4 py-2 border text-[10px] \${logic===0?'border-[#00ffd0] text-[#00ffd0] bg-[#00ffd0]/10':'border-white/20 text-white/50'}\`}>Causation (MBA)</button>
        <button onClick={()=>setLogic(1)} className={\`px-4 py-2 border text-[10px] \${logic===1?'border-[#ff0055] text-[#ff0055] bg-[#ff0055]/10':'border-white/20 text-white/50'}\`}>Effectuation (Empreendedor)</button>
      </div>

      <div className="mt-6 text-center text-[10px] text-white/50 max-w-md h-12">
        {logic === 0 && "Você tenta prever o futuro. Define um alvo e otimiza os recursos para chegar lá. Falha quando o mercado é desconhecido."}
        {logic === 1 && "Você cria o futuro. Olha para o que tem hoje (Pássaro na mão), cocria com parceiros (Colcha de retalhos) e inventa o modelo de negócio."}
      </div>
    </div>
  )
}

export function SimLeanStartupMVP({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [cycle, setCycle] = useState(0) // 0:Idea, 1:Build, 2:Measure, 3:Learn (Valid/Invalid)
  const [validated, setValidated] = useState<boolean | null>(null)

  const runCycle = () => {
    setCycle(1)
    setTimeout(() => setCycle(2), 1000)
    setTimeout(() => {
      setCycle(3)
      const success = Math.random() > 0.5
      setValidated(success)
      if(addLog) {
        if(success) addLog("Hipótese Validada (Product-Market Fit). Perseverar e Escalar.")
        else addLog("Hipótese Invalidada. Pivotar: O produto não gerou valor para o usuário.")
      }
    }, 2500)
    setTimeout(() => {
      setCycle(0)
      setValidated(null)
    }, 5000)
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#ff7700]">LEAN STARTUP: BUILD-MEASURE-LEARN</div>

      <div className="relative w-64 h-64 mb-8">
         {/* The Cycle Circle */}
         <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]">
            <circle cx="128" cy="128" r="100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            
            {/* Active Arc */}
            {cycle > 0 && (
              <path d="M 128 28 A 100 100 0 0 1 228 128" fill="none" stroke="#ff7700" strokeWidth="6" strokeLinecap="round" 
                    className={\`transition-all duration-1000 \${cycle >= 1 ? 'opacity-100' : 'opacity-0'}\`} />
            )}
            {cycle > 1 && (
              <path d="M 228 128 A 100 100 0 0 1 128 228" fill="none" stroke="#00ffd0" strokeWidth="6" strokeLinecap="round"
                    className="transition-all duration-1000 opacity-100" />
            )}
            {cycle > 2 && (
              <path d="M 128 228 A 100 100 0 0 1 28 128" fill="none" stroke={validated ? "#00ffd0" : "#ff0055"} strokeWidth="6" strokeLinecap="round"
                    className="transition-all duration-1000 opacity-100" />
            )}
         </svg>

         {/* Center Content */}
         <div className="absolute inset-0 flex flex-col items-center justify-center">
            {cycle === 0 && <div className="text-[14px] font-bold text-white/50">HIPÓTESE</div>}
            {cycle === 1 && <div className="text-[14px] font-bold text-[#ff7700] animate-pulse">BUILD (MVP)</div>}
            {cycle === 2 && <div className="text-[14px] font-bold text-[#00ffd0] animate-pulse">MEASURE (Dados)</div>}
            {cycle === 3 && (
              <div className={\`text-[16px] font-black \${validated ? 'text-[#00ffd0]' : 'text-[#ff0055]'}\`}>
                {validated ? 'PERSEVERAR' : 'PIVOTAR'}
              </div>
            )}
         </div>

         {/* Labels */}
         <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black px-2 text-[10px] text-white/50">IDÉIA</div>
         <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-black py-2 text-[10px] text-white/50">PRODUTO</div>
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black px-2 text-[10px] text-white/50">DADOS</div>
      </div>

      <button onClick={runCycle} disabled={cycle !== 0} 
              className={\`px-6 py-2 border font-bold text-[10px] tracking-widest \${cycle !== 0 ? 'border-white/20 text-white/20' : 'border-[#ff7700] text-[#ff7700] hover:bg-[#ff7700]/20'}\`}>
        {cycle !== 0 ? 'RODANDO EXPERIMENTO...' : 'LANÇAR MVP'}
      </button>

      <div className="mt-6 text-center text-[9px] text-white/50 max-w-sm">
        O <strong>MVP</strong> não é a versão mais barata do produto. É o <strong>experimento</strong> mais barato para validar uma hipótese e evitar construir algo que ninguém quer.
      </div>
    </div>
  )
}

export function SimUnitEconomics({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [cac, setCac] = useState(150)
  const [ltv, setLtv] = useState(300)

  const ratio = ltv / cac
  const isHealthy = ratio >= 3

  useEffect(() => {
    if(addLog) {
      if(ratio < 1) addLog("ALERTA CRÍTICO: LTV/CAC < 1. Cada cliente traz prejuízo. Escalar agora é suicídio.")
      else if(ratio >= 3) addLog("Métrica Saudável: LTV/CAC > 3. A unidade é lucrativa. O negócio pode ser escalado de forma sustentável.")
    }
  }, [ratio])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">UNIT ECONOMICS (LTV / CAC)</div>

      <div className="flex gap-12 items-center justify-center mb-8 h-48">
         {/* Custo de Aquisição (CAC) */}
         <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] text-[#ff0055] font-bold">CAC</div>
            <div className="relative w-16 bg-[#ff0055]/20 border border-[#ff0055] rounded-b-full flex items-end justify-center overflow-hidden transition-all duration-300" 
                 style={{ height: \`\${(cac/500)*160}px\` }}>
               <div className="w-full bg-[#ff0055] opacity-50" style={{ height: '100%' }} />
            </div>
            <div className="text-[12px] font-bold text-white">R$ {cac}</div>
         </div>

         {/* Funil de Conversão Central */}
         <div className="flex flex-col items-center justify-center h-full">
            <div className="text-[24px] font-black tracking-tighter" style={{ color: isHealthy ? '#00ffd0' : ratio < 1 ? '#ff0055' : '#ff7700' }}>
               {ratio.toFixed(1)}x
            </div>
            <div className="text-[8px] text-white/50">LTV / CAC RATIO</div>
            
            <div className={\`mt-4 text-[9px] font-bold px-2 py-1 border \${isHealthy ? 'border-[#00ffd0] text-[#00ffd0]' : ratio < 1 ? 'border-[#ff0055] text-[#ff0055] animate-pulse' : 'border-[#ff7700] text-[#ff7700]'}\`}>
               {ratio < 1 ? 'QUEIMANDO CAIXA' : ratio < 3 ? 'SOBREVIVENDO' : 'MÁQUINA DE LUCRO'}
            </div>
         </div>

         {/* Valor do Ciclo de Vida (LTV) */}
         <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] text-[#00ffd0] font-bold">LTV</div>
            <div className="relative w-16 bg-[#00ffd0]/20 border border-[#00ffd0] rounded-t-full flex items-start justify-center overflow-hidden transition-all duration-300"
                 style={{ height: \`\${(ltv/1000)*160}px\` }}>
               <div className="w-full bg-[#00ffd0] opacity-50" style={{ height: '100%' }} />
            </div>
            <div className="text-[12px] font-bold text-white">R$ {ltv}</div>
         </div>
      </div>

      <div className="w-full max-w-md grid grid-cols-2 gap-8 px-4 z-20">
         <div>
           <div className="text-[10px] text-white/50 mb-1">Custo de Aquisição (Marketing/Vendas)</div>
           <input type="range" min="50" max="500" value={cac} onChange={(e)=>setCac(Number(e.target.value))} className="w-full accent-[#ff0055]" />
         </div>
         <div>
           <div className="text-[10px] text-white/50 mb-1">Lifetime Value (Receita Recorrente)</div>
           <input type="range" min="100" max="1000" value={ltv} onChange={(e)=>setLtv(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
         </div>
      </div>

      <div className="mt-8 text-center text-[9px] text-white/50 max-w-md">
        Se a unidade (1 cliente) dá prejuízo (LTV &lt; CAC), o crescimento só acelera a falência. A meta de qualquer modelo de negócio é atingir uma proporção LTV/CAC acima de 3.
      </div>
    </div>
  )
}

export function SimVCFundingJourney({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [stage, setStage] = useState(0) // 0:Boot, 1:Angel, 2:Seed, 3:Series A

  const stages = [
    { n: 'Bootstrap', cap: '$0', val: '$100K', eq: '100%', c: '#ffffff' },
    { n: 'Anjo', cap: '$100K', val: '$1M', eq: '85%', c: '#00ffd0' },
    { n: 'Seed (VC)', cap: '$2M', val: '$10M', eq: '65%', c: '#ff7700' },
    { n: 'Série A', cap: '$10M', val: '$50M', eq: '45%', c: '#a855f7' }
  ]

  useEffect(() => {
    if(addLog && stage > 0) addLog(\`Rodada \${stages[stage].n} levantada. Valuation saltou, mas o controle societário (Equity) diluiu.\`)
  }, [stage])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#a855f7]">JORNADA DE FINANCIAMENTO (VC)</div>

      <div className="flex w-full max-w-lg items-end justify-center h-48 mb-8 gap-2">
         {stages.map((s, i) => (
           <div key={i} className={\`relative flex flex-col items-center justify-end w-24 transition-all duration-500 \${i <= stage ? 'opacity-100' : 'opacity-20 grayscale'}\`}>
             <div className="text-[12px] font-black mb-2" style={{ color: s.c }}>{s.val}</div>
             <div className="w-full border-x border-t border-white/20 flex flex-col justify-end overflow-hidden"
                  style={{ height: \`\${(i+1)*35}px\`, backgroundColor: \`\${s.c}20\` }}>
                {/* Equity Fill */}
                <div className="w-full transition-all duration-1000" style={{ height: s.eq, backgroundColor: s.c }} />
             </div>
             <div className="text-[10px] text-white mt-2 font-bold">{s.n}</div>
             <div className="text-[8px] text-white/50">{s.cap} captado</div>
             <div className="absolute top-1/2 text-[10px] font-bold text-black drop-shadow-md">{s.eq}</div>
           </div>
         ))}
      </div>

      <div className="flex gap-4 z-20">
         <button onClick={()=>setStage(Math.max(0, stage-1))} disabled={stage === 0} className="px-4 py-2 border border-white/20 text-white/50 text-[10px] disabled:opacity-30">&lt; VOLTAR</button>
         <button onClick={()=>setStage(Math.min(3, stage+1))} disabled={stage === 3} className="px-4 py-2 border border-[#a855f7] text-[#a855f7] hover:bg-[#a855f7]/20 font-bold tracking-widest text-[10px] disabled:opacity-30">
           {stage === 3 ? 'IPO / EXIT' : 'LEVANTAR RODADA'}
         </button>
      </div>

      <div className="mt-8 text-center text-[9px] text-white/50 max-w-md">
        A diluição é o preço da aceleração. Em cada rodada, você vende um pedaço da empresa (Equity diminui) para injetar capital (Cap) e aumentar o valor total do bolo (Valuation). 10% de um melancia vale mais que 100% de uma uva.
      </div>
    </div>
  )
}
`

if (!content.includes('SimEffectuationLogic')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended M5-S2 Empreendedorismo simulations!')
} else {
  console.log('Already appended.')
}
