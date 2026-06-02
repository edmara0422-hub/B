import fs from 'fs'

const file = 'components/business-syllabus/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSimulations = `

// ============================================================================
// M2-S2: DEMONSTRAÇÕES CONTÁBEIS (5 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimAccountingLedger({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [dataFlow, setDataFlow] = useState<{id: number, type: string, val: number}[]>([])
  const [processed, setProcessed] = useState({ reg: 0, class: 0, aval: 0 })

  useEffect(() => {
    const t = setInterval(() => {
      setDataFlow(prev => {
        if(prev.length > 15) prev.shift()
        return [...prev, { 
          id: Date.now(), 
          type: Math.random() > 0.5 ? 'ENTRADA' : 'SAÍDA', 
          val: Math.floor(Math.random() * 5000) 
        }]
      })
    }, 800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        RAZÃO HOLOGRÁFICO (LEDGER)
      </div>

      <div className="flex w-full h-full gap-4 relative z-10">
        {/* Caos de Dados */}
        <div className="w-1/3 h-full border-r border-white/10 flex flex-col justify-end overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
          {dataFlow.map(d => (
            <div key={d.id} className="text-[8px] font-mono whitespace-nowrap mb-1 opacity-50" style={{ color: d.type === 'ENTRADA' ? '#00ffd0' : '#ff0055' }}>
              0x{d.id.toString(16).toUpperCase()} | {d.type} | {d.val}
            </div>
          ))}
        </div>

        {/* Laser de Processamento */}
        <div className="w-2/3 h-full flex flex-col items-center justify-center gap-4">
          <div className="flex gap-2 w-full justify-center">
            <button onClick={() => { setProcessed(p => ({...p, reg: p.reg + 1})); if(addLog) addLog('Registrando transações brutas.') }} className="px-3 py-1 border border-white/20 rounded text-[9px] hover:bg-white/10 transition">1. REGISTRAR</button>
            <button onClick={() => { setProcessed(p => ({...p, class: p.class + 1})); if(addLog) addLog('Classificando ativos e passivos.') }} className="px-3 py-1 border border-white/20 rounded text-[9px] hover:bg-white/10 transition">2. CLASSIFICAR</button>
            <button onClick={() => { setProcessed(p => ({...p, aval: p.aval + 1})); if(addLog) addLog('Avaliando desempenho (DRE/Balanço).') }} className="px-3 py-1 border border-white/20 rounded text-[9px] hover:bg-white/10 transition">3. AVALIAR</button>
          </div>
          
          <div className="w-full h-24 border border-white/10 bg-black/50 relative flex items-center justify-center overflow-hidden">
            {/* Feixe de luz se processado */}
            <div className="absolute inset-0 flex items-center">
               <div className="w-full h-1 bg-[#00ffd0]/20" />
            </div>
            {(processed.reg > 0 || processed.class > 0 || processed.aval > 0) && (
              <div className="absolute left-0 h-[2px] w-full bg-[#00ffd0] shadow-[0_0_15px_#00ffd0] animate-[scan_2s_linear_infinite]" />
            )}
            
            <div className="flex flex-col text-[10px] font-mono z-10 text-center">
              <span className="text-[#00ffd0]">Dados Tratados: {processed.reg + processed.class + processed.aval} blocos</span>
              <span className="text-white/40 text-[8px] mt-1">A Contabilidade traduz a entropia em informação acionável.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimBalanceScale({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [ativo, setAtivo] = useState(100)
  const [passivo, setPassivo] = useState(50)
  const [pl, setPl] = useState(50)
  
  const diff = ativo - (passivo + pl)
  const angle = Math.max(-30, Math.min(30, diff * 0.5)) // max 30 degrees tilt

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        BALANÇA GYROSCÓPICA (BP)
      </div>

      <div className="flex gap-4 mb-8">
        <button onClick={() => { setAtivo(a => a + 10); if(addLog) addLog('Adquirindo Ativo (+10). Desnível gerado.') }} className="px-2 py-1 bg-white/5 border border-white/20 text-[9px] hover:bg-white/10 rounded">+ ATIVO</button>
        <button onClick={() => { setPassivo(p => p + 10); if(addLog) addLog('Contraindo Dívida (+10). Desnível gerado.') }} className="px-2 py-1 bg-white/5 border border-white/20 text-[9px] hover:bg-white/10 rounded">+ PASSIVO</button>
        <button onClick={() => { 
          if(diff !== 0) {
            if(diff > 0) setPl(p => p + diff)
            else setAtivo(a => a - diff)
            if(addLog) addLog('Balança Nivelada! Equação Fundamental restaurada (A = P + PL).')
          }
        }} className="px-2 py-1 border border-[#00ffd0] text-[#00ffd0] bg-[#00ffd0]/10 text-[9px] hover:bg-[#00ffd0]/20 rounded">
          EQUILIBRAR BALANÇO
        </button>
      </div>

      {/* Balança Base */}
      <div className="relative w-64 h-32 flex flex-col items-center perspective-[800px]">
        {/* Haste Central */}
        <div className="w-2 h-20 bg-white/20 absolute bottom-0 z-10" />
        <div className="w-8 h-4 border-2 border-white/20 rounded-t-full absolute bottom-0 bg-black z-20" />
        
        {/* Braço Articulado */}
        <div className="w-full h-2 bg-white/30 absolute bottom-20 origin-center transition-transform duration-700 ease-out flex items-center justify-between px-4"
             style={{ transform: \`rotate(\${angle}deg)\`, backgroundColor: diff === 0 ? '#00ffd0' : '#ff0055' }}>
             
             {/* Prato Ativo */}
             <div className="w-16 h-16 border-b-2 border-l-2 border-r-2 border-white/30 rounded-b-full flex items-end justify-center pb-2 translate-y-8 relative shadow-[inset_0_-10px_20px_rgba(0,255,208,0.2)]">
               <span className="text-[10px] font-bold text-[#00ffd0]">A: {ativo}</span>
             </div>
             
             {/* Prato Passivo + PL */}
             <div className="w-16 h-16 border-b-2 border-l-2 border-r-2 border-white/30 rounded-b-full flex items-end justify-center pb-2 translate-y-8 relative shadow-[inset_0_-10px_20px_rgba(255,0,85,0.2)]">
               <span className="text-[10px] font-bold text-[#ff0055]">P+PL: {passivo + pl}</span>
             </div>
        </div>
      </div>

      {diff !== 0 && (
        <span className="absolute bottom-4 text-[9px] text-[#ff0055] animate-pulse font-mono bg-[#ff0055]/10 px-2 py-1 rounded">
          ALERTA: EQUAÇÃO DESALINHADA (Diferença: {Math.abs(diff)})
        </span>
      )}
    </div>
  )
}

export function SimIncomeWaterfall({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [drops, setDrops] = useState<{id: number, type: string, top: number}[]>([])
  
  useEffect(() => {
    let t = 0
    const interval = setInterval(() => {
      t++
      // Spawn new drop
      const newDrop = { id: Date.now(), type: 'receita', top: 0 }
      
      setDrops(prev => {
        let next = [...prev, newDrop].map(d => ({ ...d, top: d.top + 5 }))
        
        // At certain heights, change type (loss of energy)
        next = next.map(d => {
          if(d.top > 25 && d.type === 'receita' && Math.random() > 0.6) return { ...d, type: 'cmv' }
          if(d.top > 50 && d.type === 'receita' && Math.random() > 0.7) return { ...d, type: 'despesa' }
          if(d.top > 75 && d.type === 'receita' && Math.random() > 0.8) return { ...d, type: 'imposto' }
          return d
        })
        
        // Remove drops that fall out or get destroyed
        return next.filter(d => d.top < 100 && d.type === 'receita')
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full w-full relative p-4 items-center justify-center">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        CACHOEIRA TERMODINÂMICA (DRE)
      </div>

      <div className="flex gap-4 w-full max-w-[250px] h-48 relative border-x border-white/10 px-4">
         {/* Etiquetas Laterais */}
         <div className="absolute -left-12 top-[10%] text-[8px] text-white/50">Receita Bruta</div>
         <div className="absolute -right-12 top-[30%] text-[8px] text-[#ff0055]">- CMV</div>
         <div className="absolute -left-12 top-[55%] text-[8px] text-orange-400">- Despesas</div>
         <div className="absolute -right-12 top-[80%] text-[8px] text-yellow-400">- Impostos</div>
         
         {/* Esgotos / Exaustores */}
         <div className="absolute right-0 top-[25%] w-4 h-1 bg-[#ff0055] shadow-[0_0_10px_#ff0055] opacity-50" />
         <div className="absolute left-0 top-[50%] w-4 h-1 bg-orange-400 shadow-[0_0_10px_orange] opacity-50" />
         <div className="absolute right-0 top-[75%] w-4 h-1 bg-yellow-400 shadow-[0_0_10px_yellow] opacity-50" />

         {/* Queda de energia */}
         <div className="w-full h-full relative overflow-hidden">
           {drops.map(d => (
             <div key={d.id} className="absolute w-[2px] h-3 bg-[#00ffd0] shadow-[0_0_5px_#00ffd0] rounded"
                  style={{ top: \`\${d.top}%\`, left: \`\${(d.id % 20) * 5}%\` }} />
           ))}
         </div>
         
         {/* Tanque Base (Lucro Liquido) */}
         <div className="absolute bottom-0 left-0 w-full h-4 border-t border-white/20 bg-[#00ffd0]/20 flex items-center justify-center">
            <span className="text-[9px] font-bold text-[#00ffd0]">Lucro Líquido (Margem)</span>
         </div>
      </div>
    </div>
  )
}

export function SimCashflowTanks({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [op, setOp] = useState(60)
  const [inv, setInv] = useState(20)
  const [fin, setFin] = useState(10)

  useEffect(() => {
    // Drenagem operacional constante (Runway)
    const t = setInterval(() => {
      setOp(prev => Math.max(0, prev - 2))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col h-full w-full items-center justify-center relative p-2">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        TANQUES CRIOGÊNICOS (FLUXO CAIXA)
      </div>

      <div className="flex gap-4 items-end justify-center w-full h-32 mt-6">
        
        {/* Financiamento */}
        <div className="flex flex-col items-center">
          <span className="text-[7px] mb-1 text-white/50">FINANCIAMENTO</span>
          <div className="w-10 h-24 border border-white/20 rounded-t-lg relative overflow-hidden bg-black/50">
             <div className="absolute bottom-0 w-full bg-[#d4b87a] transition-all duration-500" style={{ height: \`\${fin}%\` }} />
          </div>
          <button onClick={() => { setFin(f => Math.min(100, f + 20)); if(addLog) addLog('Empréstimo captado: Injeção no Fluxo de Financiamento.') }} className="mt-2 text-[8px] px-2 py-0.5 border border-[#d4b87a] text-[#d4b87a] rounded">+ CAPTAR</button>
        </div>

        {/* Transferência Fin -> Op */}
        <button onClick={() => {
          if(fin >= 10) { setFin(f => f - 10); setOp(o => Math.min(100, o + 10)); if(addLog) addLog('Transferindo caixa de Financiamento para cobrir Operação.') }
        }} className="mb-8 text-[12px] hover:text-[#00ffd0]">→</button>

        {/* Operacional (Runway) */}
        <div className="flex flex-col items-center">
          <span className="text-[7px] mb-1 text-white/50">OPERACIONAL</span>
          <div className={\`w-14 h-32 border \${op < 20 ? 'border-[#ff0055] shadow-[0_0_15px_#ff0055]' : 'border-white/20'} rounded-t-lg relative overflow-hidden bg-black/50\`}>
             <div className="absolute bottom-0 w-full bg-[#00ffd0] transition-all duration-300" style={{ height: \`\${op}%\`, backgroundColor: op < 20 ? '#ff0055' : '#00ffd0' }} />
          </div>
          <span className="mt-2 text-[8px] font-mono" style={{ color: op < 20 ? '#ff0055' : '#00ffd0' }}>RUNWAY: {op}d</span>
        </div>

        {/* Transferência Op -> Inv */}
        <button onClick={() => {
          if(op >= 10) { setOp(o => o - 10); setInv(i => Math.min(100, i + 10)); if(addLog) addLog('Investindo caixa operacional em novos ativos (Capex).') }
        }} className="mb-8 text-[12px] hover:text-[#00ffd0]">→</button>

        {/* Investimento */}
        <div className="flex flex-col items-center">
          <span className="text-[7px] mb-1 text-white/50">INVESTIMENTO</span>
          <div className="w-10 h-24 border border-white/20 rounded-t-lg relative overflow-hidden bg-black/50">
             <div className="absolute bottom-0 w-full bg-orange-400 transition-all duration-500" style={{ height: \`\${inv}%\` }} />
          </div>
          <button onClick={() => { setInv(i => Math.max(0, i - 10)); setOp(o => Math.min(100, o + 10)); if(addLog) addLog('Venda de Ativos: Liquidez gerada pelo Fluxo de Investimentos.') }} className="mt-2 text-[8px] px-2 py-0.5 border border-orange-400 text-orange-400 rounded">LIQUIDAR</button>
        </div>

      </div>
    </div>
  )
}

export function SimDoubleEntryOrbit({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [particles, setParticles] = useState<{id: number, angle: number}[]>([])

  const spawnTransaction = () => {
    if(addLog) addLog('Transação realizada: Débito e Crédito simultâneos gerados (Partidas Dobradas).')
    setParticles(p => [...p, { id: Date.now(), angle: Math.random() * 360 }])
  }

  useEffect(() => {
    const t = setInterval(() => {
      setParticles(prev => prev.map(p => ({ ...p, angle: (p.angle + 2) % 360 })))
    }, 50)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col h-full w-full items-center justify-center relative p-4">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        ACELERADOR DE PARTÍCULAS (MÉTODO DAS PARTIDAS DOBRADAS)
      </div>

      <button onClick={spawnTransaction} className="absolute bottom-4 z-30 px-3 py-1 border border-white/30 text-[9px] hover:bg-white/10 rounded tracking-widest">
        DISPARAR TRANSAÇÃO
      </button>

      <div className="relative w-48 h-48 flex items-center justify-center perspective-[800px]" style={{ transform: 'rotateX(60deg)' }}>
        
        {/* Núcleo (Patrimônio) */}
        <div className="absolute w-8 h-8 bg-white/10 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/30 flex items-center justify-center" style={{ transform: 'rotateX(-60deg)' }}>
           <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>

        {/* Órbita 1 (Débito) */}
        <div className="absolute w-32 h-32 rounded-full border border-[#00ffd0]/20" />
        {/* Órbita 2 (Crédito) */}
        <div className="absolute w-48 h-48 rounded-full border border-[#ff0055]/20" />

        {/* Partículas acopladas */}
        {particles.map(p => {
          // Débito na orbita interna
          const rad1 = p.angle * (Math.PI / 180)
          const x1 = Math.cos(rad1) * 64 // half of 128 (w-32)
          const y1 = Math.sin(rad1) * 64
          
          // Crédito na orbita externa (diametralmente oposto)
          const rad2 = (p.angle + 180) * (Math.PI / 180)
          const x2 = Math.cos(rad2) * 96 // half of 192 (w-48)
          const y2 = Math.sin(rad2) * 96

          return (
            <React.Fragment key={p.id}>
              {/* Partícula Débito */}
              <div className="absolute w-3 h-3 bg-[#00ffd0] rounded-full shadow-[0_0_10px_#00ffd0]"
                   style={{ transform: \`translate(\${x1}px, \${y1}px) rotateX(-60deg)\` }} />
              {/* Partícula Crédito */}
              <div className="absolute w-3 h-3 bg-[#ff0055] rounded-full shadow-[0_0_10px_#ff0055]"
                   style={{ transform: \`translate(\${x2}px, \${y2}px) rotateX(-60deg)\` }} />
              
              {/* Feixe de conexão visual entre as duas para provar dependência */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ transform: 'rotateX(0deg)' }}>
                 <line x1={x1 + 96} y1={y1 + 96} x2={x2 + 96} y2={y2 + 96} stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
              </svg>
            </React.Fragment>
          )
        })}

      </div>
    </div>
  )
}
`

// Find the last simulation and append after it.
content = content.replace(/\/\/ ──────────────────────────────────────────────────────────────────────────\s*$/, newSimulations)

if (!content.includes('SimAccountingLedger')) {
  content += newSimulations
}

fs.writeFileSync(file, content)
console.log('Appended 5 simulations for M2-S2')