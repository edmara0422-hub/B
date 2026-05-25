import fs from 'fs'

const file = 'components/sea/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M4-T1-S9: FILOSOFIA (4 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimCriticalThinking({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activeFilter, setActiveFilter] = useState(0) // 0: Nenhum, 1: Autoridade, 2: Confirmação, 3: Causalidade
  const [shattered, setShattered] = useState(false)

  const applyFilter = (index: number) => {
    setActiveFilter(index)
    if(index !== 0) {
      setShattered(true)
      setTimeout(() => setShattered(false), 2000)
    }
  }

  useEffect(() => {
    if(addLog) {
      if(activeFilter === 1) addLog("Filtro Lógico: Detectada Falácia de Autoridade.")
      if(activeFilter === 2) addLog("Filtro Lógico: Detectado Viés de Confirmação.")
      if(activeFilter === 3) addLog("Filtro Lógico: Correlação não implica Causalidade.")
    }
  }, [activeFilter])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">FILTRO DE PENSAMENTO CRÍTICO</div>

      {/* Objeto de Argumento */}
      <div className="relative w-48 h-48 flex items-center justify-center perspective-[1000px] mb-12">
        {!shattered ? (
           // Argumento "sólido" (ilusão)
           <div className="w-32 h-32 bg-white/10 border border-white/50 backdrop-blur-sm flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                style={{ transform: \`rotateY(\${activeFilter * 15}deg) rotateX(\${activeFilter * -10}deg)\` }}>
             <div className="text-white font-bold tracking-widest">ARGUMENTO</div>
           </div>
        ) : (
           // Argumento estilhaçado
           <div className="relative w-32 h-32">
             {Array.from({length: 12}).map((_, i) => (
               <div key={i} className="absolute w-8 h-8 border border-[#ff0055] bg-[#ff0055]/20 animate-ping"
                    style={{ 
                      top: '50%', left: '50%',
                      transform: \`translate(-50%, -50%) rotate(\${Math.random()*360}deg) translate(\${40 + Math.random()*60}px)\`,
                      opacity: 0
                    }} />
             ))}
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-[#ff0055] font-bold text-[12px] tracking-widest animate-pulse">FALÁCIA DETECTADA</div>
             </div>
           </div>
        )}
      </div>

      {/* Filtros */}
      <div className="flex gap-4 z-20">
        <button onClick={()=>applyFilter(1)} className="px-3 py-2 border border-white/20 text-[9px] text-white/70 hover:bg-white/10">Apelo à Autoridade</button>
        <button onClick={()=>applyFilter(2)} className="px-3 py-2 border border-white/20 text-[9px] text-white/70 hover:bg-white/10">Viés de Confirmação</button>
        <button onClick={()=>applyFilter(3)} className="px-3 py-2 border border-white/20 text-[9px] text-white/70 hover:bg-white/10">Falsa Causalidade</button>
      </div>

      <div className="mt-6 text-center text-[10px] text-white/50 max-w-md h-12">
        {activeFilter === 0 && "Selecione um filtro lógico para testar a robustez do argumento."}
        {activeFilter === 1 && <><span className="text-[#ff0055] font-bold">"O CEO disse que funciona."</span> O argumento depende de QUEM falou, não dos dados. O cubo lógico desmorona.</>}
        {activeFilter === 2 && <><span className="text-[#ff0055] font-bold">Ignorar evidências contrárias.</span> A ilusão de solidez quebra quando exposta a dados que contradizem a crença inicial.</>}
        {activeFilter === 3 && <><span className="text-[#ff0055] font-bold">Vendas subiram e choveu.</span> Logo a chuva causou as vendas? O filtro separa correlação sazonal de causalidade real.</>}
      </div>
    </div>
  )
}

export function SimEthicsFrameworks({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [lens, setLens] = useState(0) // 0: Utilitarismo, 1: Kant, 2: Virtude, 3: Cuidado

  useEffect(() => {
    if(addLog) {
      const msgs = [
        "Lente Utilitarista ativada: Maximização de utilidade.",
        "Lente Kantiana ativada: Imperativo Categórico.",
        "Lente da Virtude ativada: Análise de Caráter.",
        "Lente do Cuidado ativada: Teia de Relacionamentos."
      ]
      addLog(msgs[lens])
    }
  }, [lens])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-white/50">LENTES ÉTICAS MULTIDIMENSIONAIS</div>

      <div className="relative w-64 h-64 border border-white/20 flex items-center justify-center mb-8 rounded"
           style={{ 
             borderColor: lens===0 ? '#ff0055' : lens===1 ? '#00ffd0' : lens===2 ? '#d4b87a' : '#a855f7',
             boxShadow: \`inset 0 0 50px \${lens===0 ? 'rgba(255,0,85,0.1)' : lens===1 ? 'rgba(0,255,208,0.1)' : lens===2 ? 'rgba(212,184,122,0.1)' : 'rgba(168,85,247,0.1)'}\`
           }}>
        
        {/* Cena do Dilema (Abstrata) */}
        <div className="absolute w-16 h-16 bg-white/10 backdrop-blur" />

        {/* Utilitarismo: Balança de números */}
        {lens === 0 && (
          <div className="flex flex-col items-center text-[#ff0055]">
            <div className="text-[12px] font-bold mb-2">CUSTO VS BENEFÍCIO</div>
            <div className="flex gap-8 text-[10px]">
               <div className="text-center"><span className="block text-[14px]">-$49M</span>Indenizações</div>
               <div className="text-center"><span className="block text-[14px]">-$137M</span>Recall</div>
            </div>
            <div className="mt-4 text-[8px] tracking-widest border border-[#ff0055] px-2 py-1">AÇÃO ESCOLHIDA: NÃO FAZER RECALL</div>
          </div>
        )}

        {/* Kant: Regra Universal */}
        {lens === 1 && (
          <div className="flex flex-col items-center text-[#00ffd0]">
            <div className="text-[12px] font-bold mb-2">DEVER INCONDICIONAL</div>
            <div className="w-32 h-[1px] bg-[#00ffd0] my-2" />
            <div className="text-[10px] text-center max-w-[150px]">"É justificável envenenar clientes para economizar?" -> NÃO.</div>
            <div className="mt-4 text-[8px] tracking-widest border border-[#00ffd0] px-2 py-1">AÇÃO ESCOLHIDA: RECALL TOTAL ($100M)</div>
          </div>
        )}

        {/* Virtude: Caráter */}
        {lens === 2 && (
          <div className="flex flex-col items-center text-[#d4b87a]">
            <div className="text-[12px] font-bold mb-2">CARÁTER DA EMPRESA</div>
            <div className="w-24 h-24 border-4 border-[#d4b87a] rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
               <div className="text-[8px] rotate-45">PRUDÊNCIA</div>
               <div className="text-[8px] -rotate-45 ml-2">JUSTIÇA</div>
            </div>
            <div className="absolute bottom-4 text-[8px] tracking-widest bg-black px-2">AÇÃO ESCOLHIDA: O QUE UMA BOA EMPRESA FARIA</div>
          </div>
        )}

        {/* Cuidado: Teia */}
        {lens === 3 && (
          <div className="flex flex-col items-center text-[#a855f7]">
            <svg className="w-32 h-32 absolute animate-pulse">
               <circle cx="64" cy="64" r="50" fill="none" stroke="#a855f7" strokeDasharray="4 4" />
               <line x1="64" y1="64" x2="14" y2="64" stroke="#a855f7" />
               <line x1="64" y1="64" x2="114" y2="64" stroke="#a855f7" />
               <line x1="64" y1="64" x2="64" y2="14" stroke="#a855f7" />
               <line x1="64" y1="64" x2="64" y2="114" stroke="#a855f7" />
            </svg>
            <div className="z-10 text-[10px] font-bold bg-black px-2 mt-8">RESPONSABILIDADE</div>
            <div className="z-10 text-[8px] text-center max-w-[120px] mt-2 bg-black">Como esta decisão afeta quem confia em nós?</div>
          </div>
        )}
      </div>

      <div className="flex gap-2 z-20">
        <button onClick={()=>setLens(0)} className={\`px-2 py-1 text-[9px] border transition-all \${lens===0 ? 'bg-[#ff0055]/20 border-[#ff0055] text-[#ff0055]' : 'border-white/20'}\`}>Utilitarismo</button>
        <button onClick={()=>setLens(1)} className={\`px-2 py-1 text-[9px] border transition-all \${lens===1 ? 'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0]' : 'border-white/20'}\`}>Deontologia</button>
        <button onClick={()=>setLens(2)} className={\`px-2 py-1 text-[9px] border transition-all \${lens===2 ? 'bg-[#d4b87a]/20 border-[#d4b87a] text-[#d4b87a]' : 'border-white/20'}\`}>Virtude</button>
        <button onClick={()=>setLens(3)} className={\`px-2 py-1 text-[9px] border transition-all \${lens===3 ? 'bg-[#a855f7]/20 border-[#a855f7] text-[#a855f7]' : 'border-white/20'}\`}>Cuidado</button>
      </div>
    </div>
  )
}

export function SimPoliticalPhilosophy({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [system, setSystem] = useState(0) // 0: Smith, 1: Marx, 2: Rawls
  
  useEffect(() => {
    if(addLog) {
      if(system===0) addLog("Sistema Ativado: Mão Invisível (Livre Mercado).")
      if(system===1) addLog("Sistema Ativado: Crítica Marxista (Acúmulo e Discrepância).")
      if(system===2) addLog("Sistema Ativado: Véu da Ignorância (Justiça como Equidade).")
    }
  }, [system])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-white/50">MACROESTRUTURAS FILOSÓFICAS</div>

      <div className="relative w-72 h-48 border border-white/10 mb-8 overflow-hidden bg-white/5">
        
        {/* Adam Smith */}
        {system === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Partículas caóticas se alinhando magicamente */}
            {Array.from({length: 30}).map((_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-[#00ffd0] rounded-full"
                   style={{ 
                     animation: \`smith-flow 3s ease-in-out infinite alternate\`,
                     animationDelay: \`\${Math.random()}s\`,
                     left: \`\${Math.random()*100}%\`,
                     top: \`\${Math.random()*100}%\`
                   }} />
            ))}
            <div className="text-[12px] text-[#00ffd0] font-bold tracking-widest z-10 bg-black/50 px-2 py-1">A MÃO INVISÍVEL</div>
          </div>
        )}

        {/* Karl Marx */}
        {system === 1 && (
          <div className="absolute inset-0">
             {/* Concentração de riqueza no topo */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#ff0055]/30 flex items-center justify-center border border-[#ff0055]">
                <div className="text-[10px] text-[#ff0055] font-bold">CAPITAL (ACÚMULO)</div>
             </div>
             {/* Setas subindo da base (Mais-valia) */}
             <div className="absolute bottom-4 w-full flex justify-around px-4">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="w-1 h-16 bg-gradient-to-t from-transparent to-[#ff0055] animate-[slide-up_1s_linear_infinite]" />
                ))}
             </div>
             <div className="absolute bottom-0 w-full text-center text-[10px] text-white/40 mb-2">TRABALHO (GIG ECONOMY)</div>
          </div>
        )}

        {/* John Rawls */}
        {system === 2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
             <div className="absolute inset-0 bg-white/10 backdrop-blur-md z-10 flex items-center justify-center">
               <div className="text-[14px] text-white font-bold tracking-widest text-center px-4">
                 O VÉU DA IGNORÂNCIA <br/>
                 <span className="text-[8px] font-normal text-white/70 mt-2 block">Você não sabe em qual posição vai nascer no sistema. Como você desenharia as regras para se proteger caso nasça na base?</span>
               </div>
             </div>
             {/* Base system randomly shifting underneath the blur */}
             <div className="absolute bottom-0 w-full h-8 bg-gradient-to-r from-[#ff0055] via-[#d4b87a] to-[#00ffd0] animate-pulse" />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button onClick={()=>setSystem(0)} className={\`px-3 py-1 text-[9px] border \${system===0?'border-[#00ffd0] text-[#00ffd0]':'border-white/20 text-white/40'}\`}>Adam Smith</button>
        <button onClick={()=>setSystem(1)} className={\`px-3 py-1 text-[9px] border \${system===1?'border-[#ff0055] text-[#ff0055]':'border-white/20 text-white/40'}\`}>Karl Marx</button>
        <button onClick={()=>setSystem(2)} className={\`px-3 py-1 text-[9px] border \${system===2?'border-white text-white':'border-white/20 text-white/40'}\`}>John Rawls</button>
      </div>

      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes smith-flow { 0% { transform: translateY(0); } 100% { transform: translateY(-50px) translateX(20px); } }
        @keyframes slide-up { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-30px); opacity: 0; } }
      \`}} />
    </div>
  )
}

export function SimEasternAesthetics({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [zen, setZen] = useState(0) // 0 to 100

  useEffect(() => {
    if(addLog) addLog(\`Taxa de entropia orgânica Wabi-Sabi: \${zen}%\`)
  }, [zen])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#d4b87a]">ESTÉTICA WABI-SABI E WU WEI</div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
         {/* O Objeto (Começa rígido/tech, vira orgânico/imperfeito) */}
         <div 
           className="transition-all duration-700 ease-out flex items-center justify-center"
           style={{
             width: \`\${150 + (zen * 0.5)}px\`,
             height: \`\${150 + (zen * 0.2)}px\`,
             borderRadius: \`\${(zen * 0.5)}%\`,
             backgroundColor: zen === 0 ? '#ffffff' : 'transparent',
             border: \`\${1 + (zen * 0.05)}px solid rgba(212, 184, 122, \${0.2 + (zen * 0.008)})\`,
             transform: \`rotate(\${zen * 0.4}deg)\`,
             boxShadow: zen > 50 ? \`inset 0 0 \${zen}px rgba(212,184,122,0.1)\` : 'none'
           }}
         >
           <div className="transition-all duration-700"
                style={{ 
                  opacity: 1 - (zen/100),
                  transform: \`scale(\${1 - (zen/100)})\`
                }}>
             <div className="w-16 h-16 bg-black border border-white/50 rotate-45 flex items-center justify-center text-[8px] text-white tracking-widest font-bold">PERFEITO</div>
           </div>

           <div className="absolute transition-all duration-700 text-[#d4b87a] text-[12px] font-bold tracking-widest"
                style={{ opacity: (zen/100) }}>
             IMPERMANENTE
           </div>
         </div>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center">
         <div className="flex justify-between w-full text-[9px] text-[#d4b87a] mb-2">
            <span>Rígido (Controle Ocidental)</span>
            <span>Orgânico (Fluxo Oriental)</span>
         </div>
         <input type="range" min="0" max="100" value={zen} onChange={(e)=>setZen(Number(e.target.value))} className="w-full accent-[#d4b87a]" />
      </div>

      <div className="mt-8 text-center text-[10px] text-white/50 max-w-md">
        <strong>Wabi-Sabi:</strong> A beleza da imperfeição e impermanência. Em inovação, significa lançar o MVP em vez de buscar a perfeição paralisante. <strong>Wu wei (Não-ação):</strong> Liderar sem forçar, criando condições para o fluxo natural.
      </div>
    </div>
  )
}
`

if (!content.includes('SimCriticalThinking')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended Filosofia simulations!')
} else {
  console.log('Already appended.')
}
