import fs from 'fs'

const file = 'components/sea/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M5-S3 (Ambiente Macroeconômico): 4 SIMULAÇÕES 6D NASA-LEVEL
// ============================================================================

export function SimMacroIndicatorsPanel({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [selic, setSelic] = useState(10.5)
  
  // Modelos simplificados
  const ipca = Math.max(2, 10 - (selic - 5)) // Se selic sobe, IPCA cai
  const pib = (12 - selic) * 0.8 // Se selic sobe, PIB cai (crédito caro)
  const desemprego = 5 + (selic - 2) * 0.5 // Se selic sobe, desemprego aumenta
  const cambio = 4.5 + (15 - selic) * 0.1 // Simplificação: juros altos trazem dólar, baixando câmbio

  useEffect(() => {
    if(addLog) {
      if(selic > 12) addLog("Aperto Monetário: Selic alta freia a inflação, mas destrói o crescimento (PIB) e aumenta desemprego. Priorize CAIXA.")
      else if(selic < 6) addLog("Estímulo Monetário: Selic baixa explode o PIB e o consumo, mas a inflação (IPCA) ameaça fugir do controle. HORA DE EXPANDIR.")
    }
  }, [selic])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">PAINEL MACRO: O EFEITO DA SELIC</div>

      {/* Control Panel */}
      <div className="w-full max-w-sm border border-[#00ffd0]/50 bg-[#00ffd0]/5 p-4 mb-8">
         <div className="flex justify-between text-[10px] text-[#00ffd0] font-bold mb-2">
            <span>TAXA SELIC (O Freio/Acelerador)</span>
            <span>{selic.toFixed(2)}%</span>
         </div>
         <input type="range" min="2" max="15" step="0.25" value={selic} onChange={(e)=>setSelic(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
      </div>

      {/* Gauges Grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-sm px-4">
         {/* IPCA */}
         <div className="flex flex-col items-center p-2 border border-white/10 bg-black">
            <div className="text-[10px] text-white/50">IPCA (Inflação)</div>
            <div className={\`text-[20px] font-black \${ipca > 6 ? 'text-[#ff0055]' : 'text-[#00ffd0]'}\`}>{ipca.toFixed(1)}%</div>
            <div className="w-full h-1 bg-white/10 mt-2"><div className="h-full bg-[#ff0055]" style={{ width: \`\${(ipca/15)*100}%\` }} /></div>
         </div>

         {/* PIB */}
         <div className="flex flex-col items-center p-2 border border-white/10 bg-black">
            <div className="text-[10px] text-white/50">Crescimento PIB</div>
            <div className={\`text-[20px] font-black \${pib < 1 ? 'text-[#ff0055]' : 'text-[#00ffd0]'}\`}>{pib.toFixed(1)}%</div>
            <div className="w-full h-1 bg-white/10 mt-2"><div className="h-full bg-[#00ffd0]" style={{ width: \`\${Math.max(0, (pib/8)*100)}%\` }} /></div>
         </div>

         {/* Desemprego */}
         <div className="flex flex-col items-center p-2 border border-white/10 bg-black">
            <div className="text-[10px] text-white/50">Desemprego</div>
            <div className={\`text-[20px] font-black \${desemprego > 10 ? 'text-[#ff0055]' : 'text-[#d4b87a]'}\`}>{desemprego.toFixed(1)}%</div>
            <div className="w-full h-1 bg-white/10 mt-2"><div className="h-full bg-[#d4b87a]" style={{ width: \`\${(desemprego/15)*100}%\` }} /></div>
         </div>

         {/* Cambio */}
         <div className="flex flex-col items-center p-2 border border-white/10 bg-black">
            <div className="text-[10px] text-white/50">Câmbio (US$)</div>
            <div className="text-[20px] font-black text-white">R$ {cambio.toFixed(2)}</div>
            <div className="w-full h-1 bg-white/10 mt-2"><div className="h-full bg-white" style={{ width: \`\${(cambio/7)*100}%\` }} /></div>
         </div>
      </div>

      <div className="mt-8 text-center text-[9px] text-white/50 max-w-sm">
        A Macroeconomia é um sistema de vasos comunicantes. O Banco Central sobe a Selic para matar a inflação (IPCA), mas o preço disso é encarecer o crédito, destruir o PIB e gerar desemprego. Você não controla isso, mas precisa reagir a isso.
      </div>
    </div>
  )
}

export function SimEconomicCyclesWave({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [time, setTime] = useState(0)
  const [action, setAction] = useState<{type:string, time:number, success:boolean} | null>(null)

  useEffect(() => {
    const t = setInterval(() => setTime(t => (t + 1) % 360), 50)
    return () => clearInterval(t)
  }, [])

  // Seno simplificado para ciclo (0 a 360)
  // 0-90: Expansão, 90-180: Pico/Início Queda, 180-270: Contração, 270-360: Vale/Início Alta
  const wave = Math.sin((time * Math.PI) / 180)
  
  // Lógica de acerto:
  // Expandir é bom no Vale (270-360) e Expansão (0-60)
  // Proteger é bom no Pico (60-150) e Contração (150-240)
  
  const handleAction = (type: string) => {
    let success = false
    if(type === 'EXPANDIR') {
      if(time > 270 || time < 60) success = true
    } else {
      if(time >= 60 && time <= 240) success = true
    }
    
    setAction({ type, time, success })
    if(addLog) {
      if(success) addLog(\`Decisão CORRETA: \${type} na fase adequada do ciclo.\`)
      else addLog(\`Decisão ERRADA: \${type} na fase errada do ciclo. Você vai queimar caixa ou perder a janela.\`)
    }
    setTimeout(() => setAction(null), 2000)
  }

  const phase = time < 90 ? 'EXPANSÃO' : time < 180 ? 'PICO' : time < 270 ? 'CONTRAÇÃO' : 'VALE'
  const phaseColor = time < 90 ? '#00ffd0' : time < 180 ? '#ff7700' : time < 270 ? '#ff0055' : '#a855f7'

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#ff7700]">OSCICLAÇÕES: CICLO ECONÔMICO</div>

      <div className="relative w-80 h-48 border-y border-white/20 flex items-center mb-8">
         {/* Linha Zero (Trend de longo prazo) */}
         <line x1="0" y1="96" x2="320" y2="96" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" className="absolute" />
         
         {/* Ondas fantasma para contexto */}
         <svg className="absolute inset-0 w-full h-full">
           <path d="M 0 96 Q 40 16 80 96 T 160 96 T 240 96 T 320 96" fill="none" stroke="rgba(255,255,255,0.1)" />
         </svg>

         {/* Ponto atual */}
         <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-75"
              style={{ top: \`\${96 - (wave * 70)}px\` }}>
            <div className="w-4 h-4 rounded-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: phaseColor, color: phaseColor }} />
            <div className="absolute top-6 text-[10px] font-bold" style={{ color: phaseColor }}>{phase}</div>
         </div>
      </div>

      <div className="flex gap-4 z-20">
         <button onClick={()=>handleAction('EXPANDIR')} className="px-6 py-3 border border-[#00ffd0] text-[#00ffd0] font-bold text-[10px] hover:bg-[#00ffd0]/20 tracking-widest">
           INVESTIR / EXPANDIR
         </button>
         <button onClick={()=>handleAction('PROTEGER')} className="px-6 py-3 border border-[#ff0055] text-[#ff0055] font-bold text-[10px] hover:bg-[#ff0055]/20 tracking-widest">
           PROTEGER CAIXA
         </button>
      </div>

      {action && (
         <div className={\`absolute top-1/4 px-4 py-2 text-[12px] font-black border \${action.success ? 'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0]' : 'bg-[#ff0055]/20 border-[#ff0055] text-[#ff0055]'}\`}>
           {action.success ? 'ACERTO ESTRELAR' : 'FALÊNCIA IMINENTE'}
         </div>
      )}

      <div className="mt-8 text-center text-[9px] text-white/50 max-w-sm">
        A estratégia certa no momento errado é a estratégia errada. Quem protege o caixa no <strong>Vale</strong> e expande na <strong>Expansão</strong> captura riqueza. Quem faz o oposto, quebra.
      </div>
    </div>
  )
}

export function SimBrazilStructuralChallenges({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)

  const forces = [
    { id: 'tax', type: 'desafio', label: 'Custo Brasil (Impostos)', desc: '33% do PIB em tributos + 1500 horas/ano em burocracia.', color: '#ff0055' },
    { id: 'juros', type: 'desafio', label: 'Custo de Capital', desc: 'Spread bancário abusivo restringe crescimento.', color: '#ff0055' },
    { id: 'infra', type: 'desafio', label: 'Gargalo Logístico', desc: 'Custo de frete corrói a margem da indústria.', color: '#ff0055' },
    { id: 'agro', type: 'oportunidade', label: 'Potência Agro', desc: '25% das exportações. Eficiência global em food-tech.', color: '#00ffd0' },
    { id: 'energy', type: 'oportunidade', label: 'Matriz Limpa', desc: '80%+ renovável. Vantagem absurda em ESG e carbono.', color: '#00ffd0' },
    { id: 'biodiv', type: 'oportunidade', label: 'Bioeconomia', desc: 'Maior biodiversidade do mundo inexplorada.', color: '#00ffd0' }
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#d4b87a]">BRASIL: PARADOXOS ESTRUTURAIS</div>

      <div className="flex w-full max-w-lg justify-between gap-4 mb-8 h-64">
         {/* Desafios */}
         <div className="flex-1 flex flex-col gap-2 p-4 border border-[#ff0055]/30 bg-[#ff0055]/5">
            <div className="text-[10px] text-[#ff0055] font-bold text-center mb-4">FORÇAS DE ATRITO (Custo Brasil)</div>
            {forces.filter(f=>f.type==='desafio').map(f => (
               <div key={f.id} 
                    onMouseEnter={() => setHovered(f.id)} onMouseLeave={() => setHovered(null)}
                    className={\`p-2 text-[9px] border cursor-help transition-all \${hovered===f.id ? 'border-[#ff0055] bg-[#ff0055]/20 text-white' : 'border-[#ff0055]/20 text-[#ff0055]/70'}\`}>
                 {f.label}
               </div>
            ))}
         </div>

         {/* Oportunidades */}
         <div className="flex-1 flex flex-col gap-2 p-4 border border-[#00ffd0]/30 bg-[#00ffd0]/5">
            <div className="text-[10px] text-[#00ffd0] font-bold text-center mb-4">VANTAGENS COMPARATIVAS</div>
            {forces.filter(f=>f.type==='oportunidade').map(f => (
               <div key={f.id} 
                    onMouseEnter={() => setHovered(f.id)} onMouseLeave={() => setHovered(null)}
                    className={\`p-2 text-[9px] border cursor-help transition-all \${hovered===f.id ? 'border-[#00ffd0] bg-[#00ffd0]/20 text-white' : 'border-[#00ffd0]/20 text-[#00ffd0]/70'}\`}>
                 {f.label}
               </div>
            ))}
         </div>
      </div>

      <div className="w-full max-w-lg h-16 border border-white/20 bg-black flex items-center justify-center px-4 text-center">
        <span className="text-[10px] text-white/70">
           {hovered ? forces.find(f=>f.id===hovered)?.desc : "Passe o mouse. Entender o Brasil é ler duas realidades simultâneas: um ambiente hostil à execução, mas o solo mais fértil do mundo para quem resolve o problema."}
        </span>
      </div>
    </div>
  )
}

export function SimWorkforceFinanceSystem({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [strategy, setStrategy] = useState(0) // 0: Demitir e Contratar Pronto, 1: Upskilling Interno
  const [aiEnabled, setAiEnabled] = useState(false)

  const cost = strategy === 0 ? 100 : 30
  const speed = strategy === 0 ? 80 : 50
  const output = (strategy === 0 ? 70 : 90) * (aiEnabled ? 1.5 : 1)

  useEffect(() => {
    if(addLog) {
      if(strategy === 1) addLog("Estratégia de Upskilling: Custo menor, retenção maior. O talento é moldado, não comprado.")
      if(aiEnabled) addLog("Aceleração de IA Ativada: 30% das tarefas operacionais foram automatizadas. Produtividade humana ampliada.")
    }
  }, [strategy, aiEnabled])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#a855f7]">O SISTEMA: TALENTO E AUTOMAÇÃO</div>

      <div className="flex gap-8 mb-8">
         {/* Controles */}
         <div className="flex flex-col gap-4 w-48">
            <div className="text-[10px] text-white/50 mb-2">Estratégia de Talento:</div>
            <button onClick={()=>setStrategy(0)} className={\`px-3 py-2 text-[9px] border text-left \${strategy===0 ? 'border-white bg-white/10 text-white' : 'border-white/20 text-white/50'}\`}>
               Comprar do Mercado (Headhunter)
            </button>
            <button onClick={()=>setStrategy(1)} className={\`px-3 py-2 text-[9px] border text-left \${strategy===1 ? 'border-[#00ffd0] bg-[#00ffd0]/10 text-[#00ffd0]' : 'border-white/20 text-white/50'}\`}>
               Upskilling Interno (Treinamento)
            </button>

            <div className="mt-4 border-t border-white/20 pt-4">
              <button onClick={()=>setAiEnabled(!aiEnabled)} className={\`w-full px-3 py-3 font-bold text-[10px] border flex items-center justify-between \${aiEnabled ? 'border-[#a855f7] bg-[#a855f7]/20 text-[#a855f7]' : 'border-white/20 text-white/50'}\`}>
                 <span>INTEGRAR IA OPERACIONAL</span>
                 <div className={\`w-3 h-3 rounded-full \${aiEnabled ? 'bg-[#a855f7] shadow-[0_0_10px_#a855f7]' : 'border border-white/50'}\`} />
              </button>
            </div>
         </div>

         {/* Dashboard */}
         <div className="w-64 border border-white/10 bg-white/5 p-4 flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                 <span className="text-[#ff0055]">Custo Financeiro</span>
                 <span className="text-white/50">{cost}K</span>
              </div>
              <div className="w-full h-1 bg-white/10"><div className="h-full bg-[#ff0055] transition-all duration-500" style={{width: \`\${cost}%\`}} /></div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                 <span className="text-[#d4b87a]">Velocidade de Setup</span>
                 <span className="text-white/50">{speed}d</span>
              </div>
              <div className="w-full h-1 bg-white/10"><div className="h-full bg-[#d4b87a] transition-all duration-500" style={{width: \`\${speed}%\`}} /></div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-[12px] font-bold mb-2">
                 <span className={aiEnabled ? "text-[#a855f7]" : "text-[#00ffd0]"}>OUTPUT / PRODUTIVIDADE</span>
                 <span className="text-white">{output.toFixed(0)} pts</span>
              </div>
              <div className="w-full h-2 bg-white/10"><div className={\`h-full transition-all duration-500 \${aiEnabled ? 'bg-[#a855f7]' : 'bg-[#00ffd0]'}\`} style={{width: \`\${Math.min(100, (output/150)*100)}%\`}} /></div>
            </div>
         </div>
      </div>

      <div className="text-center text-[9px] text-white/50 max-w-lg px-4">
        Em um mercado com 1% de desemprego em tecnologia, comprar talentos é financeiramente destrutivo. O <strong>Upskilling</strong> aliado à <strong>Automação (IA)</strong> é a única matemática operacional sustentável a longo prazo.
      </div>
    </div>
  )
}
`

if (!content.includes('SimMacroIndicatorsPanel')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended M5-S3 Macro simulations!')
} else {
  console.log('Already appended.')
}
