import fs from 'fs'

const file = 'components/sea/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSimulations = `

// ============================================================================
// M2-S1: GESTÃO DE NEGÓCIOS (5 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimPDCACycle({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activeStage, setActiveStage] = useState<number | null>(null)
  
  const stages = [
    { name: 'PLAN', color: '#00ffd0', desc: 'Análise de Cenários e Metas', angle: 0 },
    { name: 'DO', color: '#ff0055', desc: 'Organização e Direção (Execução)', angle: 90 },
    { name: 'CHECK', color: '#d4b87a', desc: 'Controle e Medição de KPIs', angle: 180 },
    { name: 'ACT', color: '#3b82f6', desc: 'Correção de Desvios (Melhoria Contínua)', angle: 270 }
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest">
        NÚCLEO DE REATOR PDCA
      </div>
      
      <div className="flex-1 w-full flex items-center justify-center relative perspective-[800px]">
        {/* Reator central */}
        <div className="relative w-48 h-48 rounded-full border border-white/10 flex items-center justify-center shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]"
             style={{ transformStyle: 'preserve-3d', transform: 'rotateX(45deg)' }}>
          
          {/* Anéis de energia */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Fases do PDCA */}
          {stages.map((stage, i) => {
            const isActive = activeStage === i
            return (
              <button 
                key={i}
                onClick={() => {
                  setActiveStage(i)
                  if(addLog) addLog(\`Ciclo PDCA: \${stage.name} ativado. Foco em: \${stage.desc}\`)
                }}
                className={\`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex flex-col items-center justify-center transition-all duration-500 \${isActive ? 'scale-125 z-20' : 'scale-100 opacity-50 z-10'}\`}
                style={{ 
                  left: \`\${50 + 50 * Math.cos(stage.angle * Math.PI / 180)}%\`,
                  top: \`\${50 + 50 * Math.sin(stage.angle * Math.PI / 180)}%\`,
                  backgroundColor: isActive ? \`\${stage.color}40\` : '#000',
                  borderColor: stage.color,
                  borderWidth: isActive ? 2 : 1,
                  boxShadow: isActive ? \`0 0 20px \${stage.color}\` : 'none',
                  transform: 'rotateX(-45deg)' // Counter-rotate so text is flat
                }}
              >
                <span className="text-[10px] font-bold" style={{ color: isActive ? stage.color : '#fff' }}>{stage.name}</span>
              </button>
            )
          })}
          
          {/* Core Energy */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border border-white/30"
               style={{ backgroundColor: activeStage !== null ? stages[activeStage].color + '20' : 'transparent', boxShadow: activeStage !== null ? \`0 0 40px \${stages[activeStage].color}\` : 'none' }}>
             <div className="w-full h-full animate-ping opacity-20" style={{ backgroundColor: activeStage !== null ? stages[activeStage].color : '#fff' }} />
          </div>
        </div>
      </div>
      
      <div className="h-16 w-full max-w-[250px] p-2 bg-white/5 border border-white/10 rounded text-center mt-4 flex items-center justify-center">
        {activeStage !== null ? (
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: stages[activeStage].color }}>{stages[activeStage].name}</span>
            <span className="text-[9px] text-white/70">{stages[activeStage].desc}</span>
          </div>
        ) : (
          <span className="text-[9px] text-white/40 uppercase tracking-widest animate-pulse">Aguardando ativação de ciclo...</span>
        )}
      </div>
    </div>
  )
}

export function SimBusinessCanvas({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activeBlock, setActiveBlock] = useState<number | null>(null)
  
  // Canvas structure simplified for 3x3 isometric display
  const blocks = [
    { id: 'Parcerias', group: 'Custo', color: '#3b82f6' },
    { id: 'Atividades', group: 'Custo', color: '#3b82f6' },
    { id: 'Proposta de Valor', group: 'Valor', color: '#00ffd0' },
    { id: 'Relacionamento', group: 'Receita', color: '#d4b87a' },
    { id: 'Segmentos', group: 'Receita', color: '#d4b87a' },
    { id: 'Recursos', group: 'Custo', color: '#3b82f6' },
    { id: 'Canais', group: 'Receita', color: '#d4b87a' },
    { id: 'Custos', group: 'Base', color: '#ff0055' },
    { id: 'Receitas', group: 'Base', color: '#ff0055' }
  ]

  return (
    <div className="flex flex-col items-center h-full w-full relative">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        BUSINESS MODEL CANVAS (Osterwalder)
      </div>

      <div className="flex-1 w-full flex items-center justify-center relative perspective-[1200px]">
        {/* Isometric Grid */}
        <div className="grid grid-cols-3 gap-2" style={{ transform: 'rotateX(55deg) rotateZ(-45deg)' }}>
          {blocks.map((b, i) => {
            const isActive = activeBlock === i
            const isRelated = activeBlock !== null && blocks[activeBlock].group === b.group
            return (
              <button 
                key={i}
                onClick={() => {
                  setActiveBlock(i)
                  if(addLog) addLog(\`Módulo BMC acessado: \${b.id} (\${b.group}).\`)
                }}
                className={\`w-16 h-16 md:w-20 md:h-20 border flex items-center justify-center transition-all duration-500 \${isActive ? 'bg-white/20 -translate-y-4' : isRelated ? 'bg-white/10 -translate-y-2' : 'bg-black/50 hover:bg-white/5'}\`}
                style={{ 
                  borderColor: isActive ? b.color : isRelated ? \`\${b.color}50\` : 'rgba(255,255,255,0.1)',
                  boxShadow: isActive ? \`-10px 10px 20px \${b.color}40, inset 0 0 15px \${b.color}80\` : 'none'
                }}
              >
                <span className="text-[7px] md:text-[8px] font-bold text-center rotate-45 px-1 leading-tight" style={{ color: isActive ? '#fff' : isRelated ? b.color : 'rgba(255,255,255,0.4)' }}>
                  {b.id}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-[9px] font-mono text-center w-full max-w-[200px] h-10 mt-4">
        {activeBlock !== null ? (
          <span className="text-white">Alinhamento sistêmico focado em <b style={{ color: blocks[activeBlock].color }}>{blocks[activeBlock].group}</b>.</span>
        ) : (
          <span className="text-white/40">Selecione um bloco do Canvas para ver dependências.</span>
        )}
      </div>
    </div>
  )
}

export function SimStrategicTripod({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [face, setFace] = useState<number>(0) // 0: SWOT, 1: Porter, 2: BCG
  
  const frameworks = [
    { name: 'SWOT', color: '#00ffd0', desc: 'Forças, Fraquezas, Oportunidades, Ameaças' },
    { name: 'PORTER (5 Forças)', color: '#ff0055', desc: 'Rivalidade, Entrantes, Substitutos, Fornecedores, Compradores' },
    { name: 'MATRIZ BCG', color: '#d4b87a', desc: 'Estrela, Vaca Leiteira, Ponto de Interrogação, Vira-Lata' }
  ]

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="flex gap-2 mb-8 z-20">
        {frameworks.map((f, i) => (
          <button 
            key={i} onClick={() => { setFace(i); if(addLog) addLog(\`Carregando Framework Tático: \${f.name}.\`) }}
            className={\`px-2 py-1 text-[8px] font-bold rounded border transition-colors \${face === i ? 'bg-white/20' : 'bg-transparent border-white/20 text-white/50'}\`}
            style={{ borderColor: face === i ? f.color : undefined, color: face === i ? f.color : undefined }}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center perspective-[800px]">
        {/* 3D Prism Container */}
        <div className="w-40 h-40 relative transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: \`rotateY(\${face * -120}deg)\` }}>
          
          {/* Face 0: SWOT */}
          <div className="absolute w-40 h-40 border-2 bg-black/80 flex flex-wrap items-center justify-center p-2 backface-hidden"
               style={{ borderColor: '#00ffd0', transform: 'rotateY(0deg) translateZ(35px)', boxShadow: face === 0 ? '0 0 30px rgba(0,255,208,0.3)' : 'none' }}>
            <div className="w-1/2 h-1/2 border border-[#00ffd0]/30 flex items-center justify-center text-[10px] text-[#00ffd0] font-bold">S</div>
            <div className="w-1/2 h-1/2 border border-[#00ffd0]/30 flex items-center justify-center text-[10px] text-[#00ffd0] font-bold">W</div>
            <div className="w-1/2 h-1/2 border border-[#00ffd0]/30 flex items-center justify-center text-[10px] text-[#00ffd0] font-bold">O</div>
            <div className="w-1/2 h-1/2 border border-[#00ffd0]/30 flex items-center justify-center text-[10px] text-[#00ffd0] font-bold">T</div>
          </div>
          
          {/* Face 1: Porter */}
          <div className="absolute w-40 h-40 border-2 bg-black/80 flex flex-col items-center justify-center p-2 backface-hidden space-y-1"
               style={{ borderColor: '#ff0055', transform: 'rotateY(120deg) translateZ(35px)', boxShadow: face === 1 ? '0 0 30px rgba(255,0,85,0.3)' : 'none' }}>
            <div className="w-full py-1 text-center text-[8px] border border-[#ff0055]/30 text-[#ff0055]">Entrantes</div>
            <div className="flex w-full gap-1">
               <div className="flex-1 py-4 text-center text-[8px] border border-[#ff0055]/30 text-[#ff0055]">Forn.</div>
               <div className="flex-1 py-4 text-center border border-[#ff0055] bg-[#ff0055]/20 text-[8px] font-bold text-[#ff0055]">Rivalidade</div>
               <div className="flex-1 py-4 text-center text-[8px] border border-[#ff0055]/30 text-[#ff0055]">Comp.</div>
            </div>
            <div className="w-full py-1 text-center text-[8px] border border-[#ff0055]/30 text-[#ff0055]">Substitutos</div>
          </div>
          
          {/* Face 2: BCG */}
          <div className="absolute w-40 h-40 border-2 bg-black/80 flex flex-wrap items-center justify-center p-2 backface-hidden"
               style={{ borderColor: '#d4b87a', transform: 'rotateY(240deg) translateZ(35px)', boxShadow: face === 2 ? '0 0 30px rgba(212,184,122,0.3)' : 'none' }}>
            <div className="w-1/2 h-1/2 border border-[#d4b87a]/30 flex items-center justify-center text-xl">⭐</div>
            <div className="w-1/2 h-1/2 border border-[#d4b87a]/30 flex items-center justify-center text-xl">❓</div>
            <div className="w-1/2 h-1/2 border border-[#d4b87a]/30 flex items-center justify-center text-xl">🐄</div>
            <div className="w-1/2 h-1/2 border border-[#d4b87a]/30 flex items-center justify-center text-xl">🐕</div>
          </div>

        </div>
      </div>

      <div className="text-[9px] font-mono text-center text-white/60 mt-4 max-w-[200px]">
        {frameworks[face].desc}
      </div>
    </div>
  )
}

export function SimValueChain({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [bottleneck, setBottleneck] = useState(false)
  
  const fixBottleneck = () => {
    if(!bottleneck) return
    setBottleneck(false)
    if(addLog) addLog('Gestão à Vista: Gargalo identificado em Atividade de Suporte e resolvido via Kaizen rápido.')
  }

  useEffect(() => {
    const t = setInterval(() => {
      setBottleneck(true)
      if(addLog) addLog('ALERTA DE DESVIO: Custo sem valor detectado na infraestrutura.')
    }, 8000)
    return () => clearInterval(t)
  }, [addLog])

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="absolute top-2 right-2 text-[9px] font-mono tracking-widest px-2 py-1 border rounded" style={{ borderColor: bottleneck ? '#ff0055' : '#00ffd0', color: bottleneck ? '#ff0055' : '#00ffd0' }}>
        STATUS: {bottleneck ? 'DESVIO DETECTADO' : 'FLUXO IDEAL'}
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center mt-6 gap-2">
        {/* Atividades de Suporte (Topo) */}
        <div className="w-full max-w-[240px] h-12 border-2 border-dashed border-white/20 rounded flex items-center justify-around relative">
           <span className="absolute -top-3 left-2 text-[7px] text-white/50 bg-black px-1 uppercase">Suporte</span>
           <div className="w-6 h-6 rounded bg-white/10" />
           <div className="w-6 h-6 rounded bg-white/10" />
           <button 
             onClick={fixBottleneck}
             className={\`w-6 h-6 rounded flex items-center justify-center text-[10px] transition-all \${bottleneck ? 'bg-[#ff0055] animate-pulse shadow-[0_0_15px_#ff0055]' : 'bg-white/10'}\`}
           >
             {bottleneck ? '⚠️' : ''}
           </button>
           <div className="w-6 h-6 rounded bg-white/10" />
        </div>

        {/* Esteira Principal (Fibra Óptica) */}
        <div className="w-full h-[2px] bg-white/20 relative my-2 overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <div className="absolute top-0 left-0 h-full w-1/3 animate-[scan_2s_linear_infinite]" 
               style={{ background: \`linear-gradient(90deg, transparent, \${bottleneck ? '#ff0055' : '#00ffd0'}, transparent)\` }} />
        </div>

        {/* Atividades Primárias (Baixo) */}
        <div className="w-full max-w-[240px] h-16 border border-white/30 rounded flex items-center justify-between p-1 relative">
           <span className="absolute -bottom-3 right-2 text-[7px] text-white/50 bg-black px-1 uppercase">Cadeia Primária (Margem)</span>
           {['Inbound', 'Ops', 'Outbound', 'MKT', 'Serviço'].map((a, i) => (
             <div key={i} className="flex-1 h-full mx-0.5 bg-[#d4b87a]/20 border border-[#d4b87a]/40 flex items-center justify-center text-[7px] font-bold text-[#d4b87a] rotate-180" style={{ writingMode: 'vertical-rl' }}>
               {a}
             </div>
           ))}
           {/* Flecha de Margem */}
           <div className="w-0 h-0 border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-l-[20px] ml-1" style={{ borderLeftColor: bottleneck ? '#ff005550' : '#00ffd0' }} />
        </div>
      </div>
      
      {bottleneck && (
        <div className="absolute inset-0 bg-[#ff0055]/5 pointer-events-none animate-pulse mix-blend-screen" />
      )}
    </div>
  )
}

export function SimTaxMatrix({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [revenue, setRevenue] = useState(50) // in K

  const limitMEI = 81
  const isMeiBlown = revenue > limitMEI

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-2">
      <div className="w-full mb-6">
        <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
          <span>Receita Bruta (Faturamento)</span>
          <span className="text-white font-bold">R$ {revenue}k / ano</span>
        </div>
        <input 
          type="range" min="10" max="250" value={revenue} 
          onChange={e => {
            setRevenue(Number(e.target.value))
            if(Number(e.target.value) > limitMEI && !isMeiBlown && addLog) {
              addLog('ALERTA: Teto do MEI (81k) rompido. Transição obrigatória para Microempresa (Simples Nacional).')
            }
          }} 
          className="w-full h-1 bg-white/20 rounded outline-none" 
        />
      </div>

      <div className="flex w-full gap-2 justify-center">
        {/* MEI Speedometer */}
        <div className={\`flex-1 p-2 border rounded flex flex-col items-center relative overflow-hidden transition-all \${isMeiBlown ? 'border-[#ff0055] bg-[#ff0055]/10' : 'border-[#00ffd0] bg-[#00ffd0]/10'}\`}>
          <span className="text-[9px] uppercase font-bold text-white/70 mb-2">MEI</span>
          
          <div className="w-12 h-12 rounded-full border-2 border-white/20 relative flex items-center justify-center">
            {/* Ponteiro */}
            <div className="absolute w-[2px] h-5 bg-white origin-bottom -mt-5 transition-transform duration-200"
                 style={{ transform: \`rotate(\${Math.min(revenue / limitMEI * 180 - 90, 90)}deg)\` }} />
          </div>
          
          <span className="text-[10px] font-mono mt-2" style={{ color: isMeiBlown ? '#ff0055' : '#00ffd0' }}>
            {isMeiBlown ? '⚠️ ESTOURO' : '~R$ 70/mês'}
          </span>
          {isMeiBlown && <div className="absolute inset-0 bg-[#ff0055]/20 animate-pulse pointer-events-none" />}
        </div>

        {/* Simples Speedometer */}
        <div className="flex-1 p-2 border border-white/20 rounded bg-white/5 flex flex-col items-center">
          <span className="text-[9px] uppercase font-bold text-white/70 mb-2">SIMPLES</span>
          <div className="w-12 h-12 rounded-full border-2 border-white/20 relative flex items-center justify-center">
            <div className="absolute w-[2px] h-5 bg-[#d4b87a] origin-bottom -mt-5 transition-transform duration-200"
                 style={{ transform: \`rotate(\${(revenue / 300) * 180 - 90}deg)\` }} />
          </div>
          <span className="text-[10px] font-mono mt-2 text-[#d4b87a]">
            {isMeiBlown ? \`~\${(revenue * 0.06).toFixed(1)}k imposto\` : 'Inativo'}
          </span>
        </div>
      </div>
    </div>
  )
}
`

// Find the last simulation and append after it.
content = content.replace(/\/\/ ──────────────────────────────────────────────────────────────────────────\s*$/, newSimulations)

if (!content.includes('SimTaxMatrix')) {
  content += newSimulations
}

fs.writeFileSync(file, content)
console.log('Appended 5 simulations for M2-S1')
