import fs from 'fs'

const newComponents = `
// ──────────────────────────────────────────────────────────────────────────
// Cap 1 (M1-S2): Simulador de Neuro-Criatividade (3 Redes Cerebrais)
// ──────────────────────────────────────────────────────────────────────────
export function SimNeuroCreativity({ theme, addLog }: SimulationProps) {
  const [activeNetwork, setActiveNetwork] = useState<number>(0) // 0: DMN, 1: ECN, 2: SN

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center">
      <div className="relative w-full h-48 md:h-56 bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <VideoBg ytId="Fhgn25C2IuM" />
        
        <Brain className="relative z-20 w-24 h-24 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" style={{ color: activeNetwork === 0 ? '#00ffd0' : activeNetwork === 1 ? '#ff00ff' : '#d4b87a' }} />
        
        <div className="absolute z-20 inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: activeNetwork === 0 ? '#00ffd0' : activeNetwork === 1 ? '#ff00ff' : '#d4b87a' }}
              initial={{ left: '50%', top: '50%', opacity: 0 }}
              animate={{ 
                left: \`\${10 + Math.random() * 80}%\`, 
                top: \`\${10 + Math.random() * 80}%\`,
                opacity: [0, 1, 0]
              }}
              transition={{ duration: Math.random() * 1.5 + 0.5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => { setActiveNetwork(0); if(addLog) addLog('Ativando Default Mode Network (DMN). Gerando ideias divergentes...') }}
          className={\`p-2 rounded-lg border transition-all text-[9px] uppercase font-bold \${activeNetwork === 0 ? 'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0]' : 'bg-black/60 border-white/10 text-white/40'}\`}
        >
          DMN (Devaneio)
        </button>
        <button 
          onClick={() => { setActiveNetwork(1); if(addLog) addLog('Ativando Executive Control (ECN). Refinando e selecionando ideias...') }}
          className={\`p-2 rounded-lg border transition-all text-[9px] uppercase font-bold \${activeNetwork === 1 ? 'bg-[#ff00ff]/20 border-[#ff00ff] text-[#ff00ff]' : 'bg-black/60 border-white/10 text-white/40'}\`}
        >
          ECN (Foco)
        </button>
        <button 
          onClick={() => { setActiveNetwork(2); if(addLog) addLog('Ativando Salience Network (SN). Eureka! Conexão detectada.') }}
          className={\`p-2 rounded-lg border transition-all text-[9px] uppercase font-bold \${activeNetwork === 2 ? 'bg-[#d4b87a]/20 border-[#d4b87a] text-[#d4b87a]' : 'bg-black/60 border-white/10 text-white/40'}\`}
        >
          SN (Eureka)
        </button>
      </div>

      <div className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex justify-between items-center">
         <div>
            <span className="text-[8px] uppercase tracking-widest text-white/40 block">Estado Cognitivo</span>
            <span className="text-[10px] text-white/80 block mt-0.5">
              {activeNetwork === 0 ? 'Associação livre de ideias e imaginação solta.' : activeNetwork === 1 ? 'Foco analítico, edição e crítica refinada.' : 'Detecção de relevância e insight criativo.'}
            </span>
         </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 2 (M1-S2): Funil de Ideação (Design Thinking & SCAMPER)
// ──────────────────────────────────────────────────────────────────────────
export function SimIdeationFunnel({ theme, addLog }: SimulationProps) {
  const [divergence, setDivergence] = useState(80)

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center">
       <div className="relative flex items-center justify-center h-48 md:h-56 bg-black rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
         <VideoBg ytId="kwmHaXUAa0M" />
         
         <div className="relative z-30 w-full h-full flex flex-col items-center justify-center perspective-[500px]">
           <motion.div 
             className="border-2 border-dashed border-[#00ffd0] rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,255,208,0.2)]"
             style={{ width: \`\${divergence}%\`, height: \`\${divergence}%\` }}
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
           >
             <div className="w-10 h-10 bg-[#00ffd0]/20 rounded-full blur-md" />
           </motion.div>
         </div>
       </div>

       <div className="space-y-4">
         <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
            <span>Convergência (Foco)</span>
            <span className="font-bold text-[#00ffd0] text-xs">Divergência (Expansão): {divergence}%</span>
         </div>
         <input 
           type="range" min="20" max="100" value={divergence} 
           onChange={e => {
             setDivergence(Number(e.target.value))
             if(addLog) addLog(\`Ajustando funil para \${e.target.value > 60 ? 'Divergência (Brainstorming/SCAMPER)' : 'Convergência (Design Thinking/Seleção)'}\`)
           }} 
           className="w-full h-1.5 rounded bg-[#00ffd0]/30" style={{ accentColor: '#00ffd0' }} 
         />
       </div>

       <div className="grid grid-cols-2 gap-3">
         <div className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg">
            <span className="text-[8px] uppercase text-white/40 block">Ideias Geradas</span>
            <span className="text-sm font-mono font-bold text-white drop-shadow-[0_0_5px_#fff]">
              {Math.round(divergence * 1.5)}
            </span>
         </div>
         <div className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg">
            <span className="text-[8px] uppercase text-white/40 block">Taxa de Viabilidade</span>
            <span className="text-sm font-mono font-bold" style={{ color: divergence < 50 ? '#4ade80' : '#f87171' }}>
              {Math.max(10, 100 - divergence)}%
            </span>
         </div>
       </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 3 (M1-S2): Matriz de 6 Chapéus & Bloqueios Criativos
// ──────────────────────────────────────────────────────────────────────────
export function SimSixHatsMatrix({ theme, addLog }: SimulationProps) {
  const [activeHat, setActiveHat] = useState(0)
  
  const hats = [
    { color: '#ffffff', name: 'Branco', desc: 'Fatos e Dados' },
    { color: '#ef4444', name: 'Vermelho', desc: 'Intuição e Emoção' },
    { color: '#1f2937', name: 'Preto', desc: 'Riscos e Cautela' },
    { color: '#facc15', name: 'Amarelo', desc: 'Otimismo e Benefícios' },
    { color: '#22c55e', name: 'Verde', desc: 'Criatividade e Alternativas' },
    { color: '#3b82f6', name: 'Azul', desc: 'Processo e Controle' }
  ]

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center items-center">
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center rounded-2xl bg-black border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
         <VideoBg ytId="eFMbpir3rvg" />

         <div className="relative z-30 w-40 h-40 flex items-center justify-center">
           <motion.div 
             className="absolute w-20 h-20 rounded-lg border-2"
             style={{ borderColor: hats[activeHat].color, backgroundColor: hats[activeHat].color + '40' }}
             animate={{ rotate: 45, scale: [1, 1.1, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
           />
           <Hexagon className="w-10 h-10 relative z-40 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ color: hats[activeHat].color }} />
         </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full">
        {hats.map((hat, i) => (
          <button 
            key={i}
            onClick={() => { setActiveHat(i); if(addLog) addLog(\`Análise Trocada: Perspectiva Chapéu \${hat.name} (\${hat.desc}).\`) }}
            className={\`py-1.5 px-1 rounded-lg border transition-all text-[8px] uppercase font-bold flex flex-col items-center gap-1 \${activeHat === i ? 'bg-white/20' : 'bg-black/60 border-white/10 text-white/40'}\`}
            style={{ borderColor: activeHat === i ? hat.color : undefined, color: activeHat === i ? hat.color : undefined }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hat.color }} />
            {hat.name}
          </button>
        ))}
      </div>

      <div className="text-center w-full p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
         <span className="text-[9px] uppercase tracking-widest text-white/40 block">Bloqueio Mitigado</span>
         <span className="text-sm font-bold mt-1 block" style={{ color: hats[activeHat].color }}>
           {hats[activeHat].desc}
         </span>
      </div>
    </div>
  )
}
`

const file = 'components/business-syllabus/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

// If the components already exist, we don't want to append again
if (!content.includes('SimNeuroCreativity')) {
  fs.writeFileSync(file, content + '\\n' + newComponents)
  console.log('Appended 3 new simulations.')
} else {
  console.log('Simulations already exist.')
}