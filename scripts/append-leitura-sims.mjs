import fs from 'fs'

const file = 'components/business-syllabus/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M5-S1 (Leitura e Escrita Acadêmica): 4 SIMULAÇÕES 6D NASA-LEVEL
// ============================================================================

export function SimMintoPyramid({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [structure, setStructure] = useState(0) // 0 = Confuso, 1 = IMRAD, 2 = Minto

  useEffect(() => {
    if(addLog) {
      if(structure === 0) addLog("Estrutura Confusa: A recomendação está enterrada no fim. O executivo parou de ler antes de chegar lá.")
      if(structure === 1) addLog("Estrutura IMRAD: Lógica acadêmica impecável, mas exige tempo para chegar à conclusão.")
      if(structure === 2) addLog("Pirâmide de Minto: Conclusão primeiro. Retenção de atenção maximizada.")
    }
  }, [structure])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">ARQUITETURA DA INFORMAÇÃO: PIRÂMIDE DE MINTO</div>

      <div className="relative w-72 h-64 flex items-center justify-center mb-4 perspective-[1000px]">
        {/* Document Hologram */}
        <div className={\`relative flex flex-col gap-2 w-48 transition-all duration-1000 \${structure === 0 ? 'rotate-0' : structure === 1 ? 'rotate-0' : 'rotate-180'}\`}>
           
           {/* Bloco 1 */}
           <div className={\`w-full h-10 border flex items-center justify-center text-[10px] font-bold transition-all duration-1000
                \${structure === 0 ? 'bg-white/5 border-white/20 text-white/50' : 
                  structure === 1 ? 'bg-white/10 border-white/30 text-white/70' : 
                  'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0] shadow-[0_0_15px_rgba(0,255,208,0.3)] rotate-180'}\`}>
              {structure === 0 ? 'CONTEXTO (Histórico)' : structure === 1 ? 'INTRODUÇÃO / MÉTODO' : 'CONCLUSÃO & AÇÃO (Tese)'}
           </div>

           {/* Bloco 2 */}
           <div className={\`w-full h-10 border flex items-center justify-center text-[10px] font-bold transition-all duration-1000
                \${structure === 0 ? 'bg-white/10 border-white/30 text-white/70' : 
                  structure === 1 ? 'bg-white/20 border-white/40 text-white' : 
                  'bg-white/20 border-white/40 text-white rotate-180'}\`}>
              {structure === 0 ? 'PROBLEMA & ANÁLISE' : structure === 1 ? 'RESULTADOS (Dados)' : 'ARGUMENTOS (Por quê?)'}
           </div>

           {/* Bloco 3 */}
           <div className={\`w-full h-10 border flex items-center justify-center text-[10px] font-bold transition-all duration-1000
                \${structure === 0 ? 'bg-[#ff0055]/20 border-[#ff0055] text-[#ff0055]' : 
                  structure === 1 ? 'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0]' : 
                  'bg-white/5 border-white/20 text-white/50 rotate-180'}\`}>
              {structure === 0 ? 'CONCLUSÃO (Enterrada)' : structure === 1 ? 'CONCLUSÃO (No fim)' : 'CONTEXTO & DADOS DE APOIO'}
           </div>

           {/* Leitor Eye-tracking (Simulado) */}
           <div className="absolute -left-12 top-0 w-8 h-full flex flex-col items-center">
              <div className="w-4 h-4 rounded-full border border-white/50 flex items-center justify-center mb-1">
                <div className="w-1 h-1 bg-[#ff0055] rounded-full animate-ping" />
              </div>
              <div className="text-[8px] text-white/50 -rotate-90 mt-8">Atenção do Leitor</div>
              {/* Barra de Atenção */}
              <div className="absolute right-0 top-2 w-1 h-full bg-gradient-to-b from-[#00ffd0] via-[#ff7700] to-transparent" />
           </div>
        </div>
      </div>

      <div className="flex gap-2 z-20 bg-black/50 p-2 border border-white/10">
        <button onClick={()=>setStructure(0)} className={\`px-3 py-1 text-[9px] border \${structure===0 ? 'border-[#ff0055] text-[#ff0055]' : 'border-white/20 text-white/50'}\`}>Amador</button>
        <button onClick={()=>setStructure(1)} className={\`px-3 py-1 text-[9px] border \${structure===1 ? 'border-white text-white' : 'border-white/20 text-white/50'}\`}>Acadêmico</button>
        <button onClick={()=>setStructure(2)} className={\`px-3 py-1 text-[9px] border \${structure===2 ? 'border-[#00ffd0] text-[#00ffd0] bg-[#00ffd0]/10' : 'border-white/20 text-white/50'}\`}>Executivo (Minto)</button>
      </div>

      <div className="mt-4 text-center text-[9px] text-white/50 max-w-sm">
        {structure === 0 && "Você perde o leitor antes de entregar o valor. O texto morre na metade."}
        {structure === 1 && "Lógica de pesquisa perfeita, mas não respeita o tempo (curto) de quem decide."}
        {structure === 2 && "A Pirâmide de Minto inverte a lógica: Conclusão e Recomendação primeiro. Quem lê já sabe o que você defende na primeira linha."}
      </div>
    </div>
  )
}

export function SimToulminModel({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const nodes = [
    { id: 'claim', label: 'TESE (Claim)', desc: 'Sua recomendação principal em 1 frase.', pos: 'top-10 left-1/2 -translate-x-1/2', color: '#00ffd0' },
    { id: 'data', label: 'DADOS (Data)', desc: 'Evidência concreta (números, fatos).', pos: 'bottom-10 left-10', color: '#ff7700' },
    { id: 'warrant', label: 'JUSTIFICATIVA (Warrant)', desc: 'A ponte lógica que conecta os dados à tese.', pos: 'top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2', color: '#ffffff' },
    { id: 'backing', label: 'SUPORTE (Backing)', desc: 'Validação externa para a justificativa.', pos: 'bottom-10 right-10', color: '#a855f7' },
    { id: 'qualifier', label: 'QUALIFICADOR (Qualifier)', desc: 'Grau de certeza ("Na maioria dos casos...").', pos: 'top-1/4 right-10', color: '#d4b87a' },
    { id: 'rebuttal', label: 'CONTRA-ARG. (Rebuttal)', desc: 'Antecipação de objeções.', pos: 'top-1/4 left-10', color: '#ff0055' }
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-white/50">MODELO TOULMIN (ARGUMENTAÇÃO)</div>

      <div className="relative w-[340px] h-[260px] border border-white/10 bg-white/5 mb-4">
         {/* Conexões SVG */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Data -> Warrant -> Claim */}
            <path d="M 60 220 L 170 130 L 170 60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
            {/* Backing -> Warrant */}
            <path d="M 280 220 L 170 130" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Qualifier -> Claim */}
            <path d="M 280 80 L 190 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Rebuttal -> Claim */}
            <path d="M 60 80 L 150 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
         </svg>

         {nodes.map(n => (
           <div key={n.id} 
                onMouseEnter={() => { setActiveNode(n.id); if(addLog) addLog(\`Inspecionando nó: \${n.label}\`) }}
                onMouseLeave={() => setActiveNode(null)}
                className={\`absolute \${n.pos} px-2 py-1 text-[9px] font-bold border transition-all cursor-crosshair
                  \${activeNode === n.id ? 'scale-110 z-20' : 'scale-100 z-10'}\`}
                style={{ 
                  borderColor: n.color, 
                  backgroundColor: activeNode === n.id ? \`\${n.color}20\` : '#000000',
                  color: n.color,
                  boxShadow: activeNode === n.id ? \`0 0 15px \${n.color}40\` : 'none'
                }}>
             {n.label}
           </div>
         ))}
      </div>

      <div className="h-16 flex items-center justify-center text-center px-4 w-full max-w-sm border border-white/20 bg-black">
         <span className="text-[10px] text-white/70">
           {activeNode 
             ? nodes.find(n => n.id === activeNode)?.desc 
             : "Um argumento sem Dados é opinião. Um argumento sem Tese é apenas relatório. Passe o mouse para montar a arquitetura da persuasão."}
         </span>
      </div>
    </div>
  )
}

export function SimCriticalReadingSQ3R({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [step, setStep] = useState(0) // 0:S, 1:Q, 2:R1, 3:R2, 4:R3

  const steps = [
    { s: 'S (Survey)', t: 'Varredura: Título, Resumo, Conclusão' },
    { s: 'Q (Question)', t: 'Formular perguntas antes de ler' },
    { s: 'R (Read)', t: 'Ler buscando respostas' },
    { s: 'R (Recite)', t: 'Resumir em voz alta sem olhar' },
    { s: 'R (Review)', t: 'Revisar apenas os gaps' }
  ]

  useEffect(() => {
    if(addLog) addLog(\`Ativando protocolo de leitura SQ3R: Passo \${step+1} - \${steps[step].s}\`)
  }, [step])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#ff7700]">PROTOCOLO DE LEITURA CRÍTICA: SQ3R</div>

      <div className="relative w-64 h-64 border-2 border-white/10 bg-white/5 mb-6 overflow-hidden flex flex-col">
         {/* Documento simulado */}
         <div className="w-full h-8 bg-white/10 mb-2 mt-4 mx-4 w-[80%]" />
         <div className="w-full h-2 bg-white/5 mb-1 mx-4 w-[90%]" />
         <div className="w-full h-2 bg-white/5 mb-1 mx-4 w-[90%]" />
         <div className="w-full h-2 bg-white/5 mb-1 mx-4 w-[60%]" />
         
         <div className="w-full h-6 bg-white/10 mb-2 mt-4 mx-4 w-[50%]" />
         <div className="w-full h-2 bg-white/5 mb-1 mx-4 w-[90%]" />
         <div className="w-full h-2 bg-white/5 mb-1 mx-4 w-[85%]" />
         <div className="w-full h-2 bg-white/5 mb-1 mx-4 w-[95%]" />
         <div className="w-full h-2 bg-white/5 mb-1 mx-4 w-[70%]" />

         {/* Scanner UI */}
         {step === 0 && (
           <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4">
             <div className="w-full h-12 border-2 border-[#ff7700] bg-[#ff7700]/20 animate-pulse" />
             <div className="w-full h-16 border-2 border-[#ff7700] bg-[#ff7700]/20 animate-pulse" />
           </div>
         )}
         {step === 1 && (
           <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
             <div className="text-[24px] text-[#00ffd0] font-bold">? ? ?</div>
           </div>
         )}
         {step === 2 && (
           <div className="absolute inset-0 pointer-events-none">
             <div className="w-full h-1 bg-[#00ffd0] shadow-[0_0_10px_#00ffd0] absolute top-1/2 animate-[scan_2s_linear_infinite]" />
           </div>
         )}
         {step === 3 && (
           <div className="absolute inset-0 bg-black/90 flex items-center justify-center text-center px-4">
             <span className="text-[12px] text-[#ff0055] font-bold tracking-widest">FECHE O TEXTO E FALE</span>
           </div>
         )}
         {step === 4 && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-12 h-12 border border-[#a855f7] rounded-full flex items-center justify-center">
               <div className="w-1 h-1 bg-[#a855f7] rounded-full animate-ping" />
             </div>
           </div>
         )}
      </div>

      <div className="flex w-full max-w-md justify-between px-4 z-20">
         {steps.map((s, i) => (
           <button key={i} onClick={() => setStep(i)}
                   className={\`flex flex-col items-center gap-1 transition-all \${step === i ? 'scale-110' : 'scale-90 opacity-50'}\`}>
             <div className={\`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold
                  \${step === i ? 'border-[#ff7700] text-[#ff7700] bg-[#ff7700]/10' : 'border-white/30 text-white/50'}\`}>
               {s.s.split(' ')[0]}
             </div>
             <div className="text-[8px] text-white w-16 text-center">{s.s.split(' ')[1]}</div>
           </button>
         ))}
      </div>
      
      <div className="mt-6 text-[10px] text-white/70 h-4">{steps[step].t}</div>

      <style dangerouslySetInnerHTML={{__html:\`@keyframes scan { 0% { top: 10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 90%; opacity: 0; } }\`}} />
    </div>
  )
}

export function SimDuarteStorytelling({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [position, setPosition] = useState(0) // 0 to 100 ao longo da curva
  
  useEffect(() => {
    if(addLog) {
      if(position < 20) addLog("Apresentação iniciada: Estabelecendo a realidade atual ('O que é').")
      else if(position > 40 && position < 60) addLog("Pico de Tensão: Contrastando a dor atual com a visão de futuro ('O que poderia ser').")
      else if(position > 90) addLog("Clímax Narrativo atingido. Call to Action disparado.")
    }
  }, [position])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">ESTRUTURA DUARTE: TENSÃO NARRATIVA</div>

      <div className="relative w-80 h-48 border-b border-white/20 mb-8 flex items-end">
         {/* Baseline - Status Quo */}
         <line x1="0" y1="140" x2="320" y2="140" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
         <text x="5" y="155" fill="rgba(255,255,255,0.5)" fontSize="8">STATUS QUO (O que é)</text>
         
         {/* Topline - Visão */}
         <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(0,255,208,0.2)" strokeDasharray="4 4" />
         <text x="5" y="35" fill="rgba(0,255,208,0.5)" fontSize="8">VISÃO (O que poderia ser)</text>

         {/* Curva de Sparkline (Storytelling) */}
         <svg className="absolute inset-0 w-full h-full overflow-visible">
            <path d="M 0 140 C 40 140, 40 40, 80 40 C 120 40, 120 140, 160 140 C 200 140, 200 40, 240 40 C 280 40, 280 20, 320 20" 
                  fill="none" stroke="#ffffff" strokeWidth="2" />
            
            {/* Ponto atual */}
            {(() => {
              // Aproximação do Y baseado na posição X (0 a 100) -> px (0 a 320)
              const px = (position/100) * 320
              // Basic sine wave mapping to match the bezier curve above roughly
              let py = 140
              if(px < 80) py = 140 - Math.sin((px/80)*(Math.PI/2))*100
              else if(px < 160) py = 40 + Math.sin(((px-80)/80)*(Math.PI/2))*100
              else if(px < 240) py = 140 - Math.sin(((px-160)/80)*(Math.PI/2))*100
              else py = 40 - Math.sin(((px-240)/80)*(Math.PI/2))*20
              
              return (
                <g>
                  {/* Linha de Tensão (Gap) */}
                  <line x1={px} y1={px < 160 && px > 80 ? 40 : 140} x2={px} y2={py} stroke="#ff0055" strokeDasharray="2 2" className="animate-pulse" />
                  <circle cx={px} cy={py} r="5" fill="#00ffd0" className="drop-shadow-[0_0_8px_#00ffd0]" />
                </g>
              )
            })()}
         </svg>
      </div>

      <div className="w-full max-w-sm px-4 z-20">
         <input type="range" min="0" max="100" value={position} onChange={(e)=>setPosition(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
      </div>

      <div className="mt-6 text-center text-[10px] text-white border border-white/10 bg-white/5 p-3 w-72 h-16 flex items-center justify-center">
         {position < 15 && "Problema Atual: '73% das empresas quebram por má gestão.'"}
         {position >= 15 && position < 35 && "A Visão: 'Imagine prever o caixa com 6 meses de folga.'"}
         {position >= 35 && position < 65 && "A Realidade: 'Mas hoje usamos 10 planilhas desconectadas.'"}
         {position >= 65 && position < 85 && "A Solução: 'Nossa plataforma centraliza tudo em tempo real.'"}
         {position >= 85 && <span className="text-[#00ffd0] font-bold">CALL TO ACTION: 'Assine agora e salve sua empresa.'</span>}
      </div>
    </div>
  )
}
`

if (!content.includes('SimMintoPyramid')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended M5-S1 Leitura simulations!')
} else {
  console.log('Already appended.')
}