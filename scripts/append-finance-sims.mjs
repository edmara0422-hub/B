import fs from 'fs'

const file = 'components/sea/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M6-S1 (Análise Financeira): 4 SIMULAÇÕES 6D NASA-LEVEL
// ============================================================================

export function SimFinancialAnalysisVH({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [mode, setMode] = useState<'V' | 'H'>('V')

  // Dados simulados DRE
  const data = [
    { label: 'Receita Líquida', val1: 1000, val2: 1200 },
    { label: 'CMV', val1: 450, val2: 600 },
    { label: 'Lucro Bruto', val1: 550, val2: 600 },
    { label: 'Despesas Op.', val1: 300, val2: 450 },
    { label: 'Lucro Líquido', val1: 250, val2: 150 }
  ]

  useEffect(() => {
    if(addLog) {
      if(mode === 'V') addLog("Análise Vertical: Lendo a Estrutura. O CMV e as Despesas consumiram uma fatia maior da receita no Ano 2.")
      if(mode === 'H') addLog("Análise Horizontal: Lendo a Tendência. A Receita cresceu 20%, mas as Despesas explodiram 50%. A estrutura inchou.")
    }
  }, [mode])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden p-4">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">ANÁLISE VERTICAL VS HORIZONTAL</div>

      <div className="flex gap-4 mb-6">
        <button onClick={()=>setMode('V')} className={\`px-4 py-2 text-[10px] border \${mode==='V'?'border-[#00ffd0] bg-[#00ffd0]/10 text-[#00ffd0]':'border-white/20 text-white/50'}\`}>VERTICAL (Estrutura)</button>
        <button onClick={()=>setMode('H')} className={\`px-4 py-2 text-[10px] border \${mode==='H'?'border-[#ff7700] bg-[#ff7700]/10 text-[#ff7700]':'border-white/20 text-white/50'}\`}>HORIZONTAL (Tendência)</button>
      </div>

      <div className="w-full max-w-md border border-white/20 bg-black p-4">
         <div className="grid grid-cols-4 text-[9px] text-white/50 border-b border-white/20 pb-2 mb-2">
            <div className="col-span-2">DRE Simplificado</div>
            <div className="text-right">Ano 1</div>
            <div className="text-right">Ano 2</div>
         </div>

         {data.map((row, i) => {
            const v1 = (row.val1 / data[0].val1) * 100
            const v2 = (row.val2 / data[0].val2) * 100
            const h = ((row.val2 - row.val1) / row.val1) * 100
            const isDanger = (i === 1 || i === 3) && h > 20

            return (
              <div key={i} className="grid grid-cols-4 text-[10px] py-2 border-b border-white/5 items-center relative group">
                 <div className="col-span-2 text-white">{row.label}</div>
                 
                 {mode === 'V' ? (
                   <>
                     <div className="text-right text-white/70">{v1.toFixed(1)}%</div>
                     <div className={\`text-right font-bold \${v2 > v1 && i !== 0 ? 'text-[#ff0055]' : 'text-[#00ffd0]'}\`}>{v2.toFixed(1)}%</div>
                   </>
                 ) : (
                   <>
                     <div className="text-right text-white/70">R$ {row.val1}</div>
                     <div className="text-right text-white/70">R$ {row.val2}</div>
                     <div className={\`absolute right-0 translate-x-full pl-4 font-bold text-[9px] \${isDanger ? 'text-[#ff0055] animate-pulse' : h > 0 && i===0 ? 'text-[#00ffd0]' : 'text-white/50'}\`}>
                       {h > 0 ? '+' : ''}{h.toFixed(1)}%
                     </div>
                   </>
                 )}
              </div>
            )
         })}
      </div>

      <div className="mt-6 text-center text-[9px] text-white/50 max-w-md">
        {mode === 'V' ? 'A Análise Vertical expõe a estrutura interna. Veja como o CMV passou de 45% para 50% da receita. Algo encareceu a operação.' : 'A Análise Horizontal revela que as Despesas cresceram 50% (muito acima dos 20% da receita). A empresa vendeu mais e lucrou menos.'}
      </div>
    </div>
  )
}

export function SimValuationTriangulation({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [dcf, setDcf] = useState(10)
  const [mult, setMult] = useState(8)
  const [patr, setPatr] = useState(4)

  const avg = (dcf + mult) / 2

  useEffect(() => {
    if(addLog) {
      addLog(\`Triangulação: DCF aponta \${dcf}M, Múltiplos apontam \${mult}M. Patrimonial (\${patr}M) é o piso. Valor justo estimado: \${avg.toFixed(1)}M.\`)
    }
  }, [dcf, mult, patr])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden p-4">
      <div className="absolute top-4 right-4 text-[9px] text-[#a855f7]">VALUATION: TRIANGULAÇÃO</div>

      <div className="relative w-full max-w-md h-32 flex flex-col justify-center border-x border-white/20 mb-12">
         {/* Eixo R$ */}
         <div className="absolute bottom-0 w-full h-[1px] bg-white/20" />
         
         {/* Faixa de Valor Justo */}
         <div className="absolute top-0 h-full bg-[#a855f7]/20 transition-all duration-300"
              style={{ left: \`\${Math.min(dcf, mult)*5}%\`, right: \`\${100 - Math.max(dcf, mult)*5}%\` }}>
            <div className="absolute -top-6 w-full text-center text-[9px] text-[#a855f7] font-bold">ZONA DE VALOR JUSTO (R$ {avg.toFixed(1)}M)</div>
         </div>

         {/* Marcadores */}
         <div className="absolute top-1/2 -translate-y-1/2 w-4 h-12 bg-[#ff0055] transition-all duration-300 -ml-2 flex flex-col items-center justify-end" style={{ left: \`\${dcf*5}%\` }}>
            <div className="absolute -bottom-6 text-[8px] text-[#ff0055]">DCF</div>
         </div>
         
         <div className="absolute top-1/2 -translate-y-1/2 w-4 h-12 bg-[#00ffd0] transition-all duration-300 -ml-2 flex flex-col items-center justify-start" style={{ left: \`\${mult*5}%\` }}>
            <div className="absolute -top-6 text-[8px] text-[#00ffd0]">MÚLT.</div>
         </div>

         <div className="absolute top-1/2 -translate-y-1/2 w-1 h-16 bg-white/50 transition-all duration-300 flex flex-col items-center" style={{ left: \`\${patr*5}%\` }}>
            <div className="absolute -bottom-8 text-[8px] text-white/50">PISO (PATRIMONIAL)</div>
         </div>
      </div>

      <div className="w-full max-w-md grid grid-cols-3 gap-4 z-20">
         <div>
           <div className="text-[9px] text-[#ff0055] mb-1 text-center">DCF (R$ {dcf}M)</div>
           <input type="range" min="5" max="20" value={dcf} onChange={(e)=>setDcf(Number(e.target.value))} className="w-full accent-[#ff0055]" />
         </div>
         <div>
           <div className="text-[9px] text-[#00ffd0] mb-1 text-center">Múltiplos (R$ {mult}M)</div>
           <input type="range" min="5" max="20" value={mult} onChange={(e)=>setMult(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
         </div>
         <div>
           <div className="text-[9px] text-white/50 mb-1 text-center">Patrimonial (R$ {patr}M)</div>
           <input type="range" min="1" max="10" value={patr} onChange={(e)=>setPatr(Number(e.target.value))} className="w-full accent-white" />
         </div>
      </div>

      <div className="mt-8 text-center text-[9px] text-white/50 max-w-sm">
        Valuation não é matemática pura, é <strong>argumentação triangulada</strong>. O DCF estima o futuro, os Múltiplos leem o mercado, e o Patrimonial garante o piso. O preço real fecha na intersecção.
      </div>
    </div>
  )
}

export function SimWorkingCapitalCycle({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [pme, setPme] = useState(45) // Prazo Medio Estoque
  const [pmr, setPmr] = useState(30) // Prazo Medio Recebimento
  const [pmp, setPmp] = useState(30) // Prazo Medio Pagamento

  const cicloOperacional = pme + pmr
  const cicloFinanceiro = cicloOperacional - pmp
  const isHealthy = cicloFinanceiro <= 0

  useEffect(() => {
    if(addLog) {
      if(isHealthy) addLog(\`Ciclo Financeiro NEGATIVO (\${cicloFinanceiro} dias). A empresa recebe antes de pagar. É uma máquina de gerar caixa!\`)
      else addLog(\`Ciclo Financeiro POSITIVO (\${cicloFinanceiro} dias). A empresa financia clientes e precisa de Capital de Giro externo.\`)
    }
  }, [cicloFinanceiro])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden p-4">
      <div className="absolute top-4 left-4 text-[9px] text-[#ff7700]">CICLO FINANCEIRO E CAPITAL DE GIRO</div>

      {/* Timeline Visual */}
      <div className="relative w-full max-w-lg h-32 border-l-2 border-white/20 mb-8 pl-4 flex flex-col justify-center gap-2">
         {/* Ciclo Operacional (Estoque + Recebimento) */}
         <div className="flex text-[9px] font-bold text-black h-6">
            <div className="bg-[#ff7700] flex items-center justify-center transition-all duration-300" style={{ width: \`\${(pme/120)*100}%\` }}>ESTOQUE ({pme}d)</div>
            <div className="bg-[#ff0055] flex items-center justify-center transition-all duration-300" style={{ width: \`\${(pmr/120)*100}%\` }}>RECEB. ({pmr}d)</div>
         </div>

         {/* Ciclo de Pagamento */}
         <div className="flex text-[9px] font-bold text-black h-6">
            <div className="bg-[#00ffd0] flex items-center justify-center transition-all duration-300" style={{ width: \`\${(pmp/120)*100}%\` }}>PAGAMENTO ({pmp}d)</div>
         </div>

         {/* Ciclo Financeiro GAP */}
         <div className="absolute bottom-0 h-4 border-b-2 border-dashed border-white/50 transition-all duration-300 flex items-end justify-center pb-1 text-[10px] font-black"
              style={{ 
                left: isHealthy ? \`\${((cicloOperacional)/120)*100}%\` : \`\${(pmp/120)*100}%\`,
                width: \`\${(Math.abs(cicloFinanceiro)/120)*100}%\`,
                marginLeft: '16px',
                borderColor: isHealthy ? '#00ffd0' : '#ff0055',
                color: isHealthy ? '#00ffd0' : '#ff0055'
              }}>
            {isHealthy ? 'CAIXA LIVRE' : 'GAP DE CAIXA'}
         </div>
      </div>

      <div className="w-full max-w-lg grid grid-cols-3 gap-6 z-20 px-4">
         <div>
           <div className="text-[9px] text-[#ff7700] mb-1">Prazo Estoque (PME)</div>
           <input type="range" min="0" max="60" value={pme} onChange={(e)=>setPme(Number(e.target.value))} className="w-full accent-[#ff7700]" />
         </div>
         <div>
           <div className="text-[9px] text-[#ff0055] mb-1">Prazo Recebimento (PMR)</div>
           <input type="range" min="0" max="60" value={pmr} onChange={(e)=>setPmr(Number(e.target.value))} className="w-full accent-[#ff0055]" />
         </div>
         <div>
           <div className="text-[9px] text-[#00ffd0] mb-1">Prazo Pagamento (PMP)</div>
           <input type="range" min="0" max="60" value={pmp} onChange={(e)=>setPmp(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
         </div>
      </div>

      <div className="mt-8 text-center text-[16px] font-black" style={{ color: isHealthy ? '#00ffd0' : '#ff0055' }}>
        CICLO FINANCEIRO: {cicloFinanceiro} DIAS
      </div>
      <div className="text-center text-[9px] text-white/50 max-w-md mt-2">
        {isHealthy ? 'Genial. Negociando prazos maiores e recebendo rápido, você zerou a necessidade de capital de giro.' : 'Perigo. A cada venda você precisa de capital para cobrir o buraco de dias entre pagar fornecedor e receber do cliente.'}
      </div>
    </div>
  )
}

export function SimIntegratedDiagnostics({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [active, setActive] = useState(0)

  const lenses = [
    { n: 'ESTRUTURA', sub: 'Análise Vertical', q: 'A estrutura está saudável?', c: '#00ffd0', desc: 'Mapeia custos e despesas como % da receita. Expõe ineficiências ocultas (CMV alto, margem corroída).' },
    { n: 'TENDÊNCIA', sub: 'Análise Horizontal', q: 'A tendência está melhorando?', c: '#ff7700', desc: 'Mede o crescimento real. Revela se a empresa está inchando (despesas sobem mais rápido que receita).' },
    { n: 'DINHEIRO', sub: 'Capital de Giro', q: 'O dinheiro está circulando?', c: '#ff0055', desc: 'Mede os ciclos (PME, PMR, PMP). Aponta se a empresa se autofinancia ou queima caixa rodando.' },
    { n: 'PREÇO', sub: 'Precificação', q: 'O preço está correto?', c: '#a855f7', desc: 'Valida se o Markup e o Break-Even fecham a conta ou se você está subsidiando o cliente.' }
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden p-4">
      <div className="absolute top-4 right-4 text-[9px] text-white/50">DIAGNÓSTICO INTEGRADO (AS 4 LENTES)</div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md h-64 mb-6">
         {lenses.map((l, i) => (
           <div key={i} onClick={() => { setActive(i); if(addLog) addLog(\`Ativando Lente: \${l.n}. \${l.q}\`) }}
                className={\`relative cursor-pointer border p-4 flex flex-col items-start justify-between transition-all duration-300 \${active === i ? 'bg-white/10' : 'bg-black opacity-50 hover:opacity-100'}\`}
                style={{ borderColor: active === i ? l.c : 'rgba(255,255,255,0.2)' }}>
              
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: l.c }} />
              
              <div>
                <div className="text-[14px] font-black" style={{ color: l.c }}>{l.n}</div>
                <div className="text-[8px] text-white/50 tracking-widest">{l.sub}</div>
              </div>
              
              <div className="text-[10px] text-white font-bold mt-4">{l.q}</div>
           </div>
         ))}
      </div>

      <div className="w-full max-w-md border border-white/20 bg-[#111] p-4 min-h-[80px] flex items-center justify-center text-center">
         <span className="text-[10px] text-white/70">{lenses[active].desc}</span>
      </div>
    </div>
  )
}
`

if (!content.includes('SimFinancialAnalysisVH')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended M6-S1 Analise Financeira simulations!')
} else {
  console.log('Already appended.')
}
