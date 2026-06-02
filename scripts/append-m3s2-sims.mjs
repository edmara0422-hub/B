import fs from 'fs'

const file = 'components/business-syllabus/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M3-S2: LIDERANÇA E GESTÃO DE EQUIPES (6 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimLeadershipTheories({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [active, setActive] = useState(0)
  const theories = [
    { name: 'Traços (1940)', desc: 'Carisma inato. (Falhou pois ignora contexto)', color: '#d4b87a' },
    { name: 'Comportamental (1950)', desc: 'Foco na Tarefa vs Pessoas.', color: '#00ffd0' },
    { name: 'Situacional (1969)', desc: 'Adaptar o estilo à maturidade.', color: '#ff0055' },
    { name: 'Transformacional (1978)', desc: 'Inspirar propósito maior.', color: '#a855f7' },
    { name: 'Servidora (1970)', desc: 'Líder remove obstáculos para equipe.', color: '#3b82f6' }
  ]

  useEffect(() => {
    if(addLog) addLog(\`Paradigma de liderança alterado: \${theories[active].name}\`)
  }, [active])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden font-mono p-4">
      <div className="absolute top-4 left-4 text-[9px] text-white/50">EVOLUÇÃO PARADIGMÁTICA (1940-ATUAL)</div>
      
      <div className="relative w-full max-w-2xl h-64 flex items-center justify-center">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-10 right-10 h-[1px] bg-white/10 -translate-y-1/2" />
        
        {theories.map((t, i) => {
          const isActive = active === i
          const isPast = i < active
          return (
            <div key={i} className="absolute flex flex-col items-center transition-all duration-700"
                 style={{ left: \`\${20 + i * 15}%\`, transform: isActive ? 'scale(1.5) translateY(-10px)' : 'scale(1)' }}>
              
              <button 
                onClick={() => setActive(i)}
                className={\`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer z-10 \${isActive ? 'shadow-[0_0_20px_currentColor]' : ''}\`}
                style={{ 
                  color: t.color, 
                  borderColor: isActive || isPast ? t.color : 'rgba(255,255,255,0.2)',
                  backgroundColor: isActive ? \`\${t.color}20\` : 'black'
                }}
              >
                <div className={\`w-2 h-2 rounded-full transition-all \${isActive || isPast ? 'opacity-100' : 'opacity-0'}\`} style={{ backgroundColor: t.color }} />
              </button>
              
              <div className={\`mt-4 text-center transition-all \${isActive ? 'opacity-100' : 'opacity-30'}\`}>
                <div className="text-[8px] font-bold" style={{ color: t.color }}>{t.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-8 p-4 border rounded max-w-lg w-full text-center transition-all duration-500" 
           style={{ borderColor: \`\${theories[active].color}40\`, backgroundColor: \`\${theories[active].color}10\` }}>
        <div className="text-[12px] mb-2 font-bold" style={{ color: theories[active].color }}>{theories[active].name}</div>
        <div className="text-[10px] text-white/70">{theories[active].desc}</div>
      </div>
    </div>
  )
}

export function SimTuckmanModel({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [stage, setStage] = useState(1) // 0:Forming, 1:Storming, 2:Norming, 3:Performing, 4:Adjourning
  
  useEffect(() => {
    const stages = ["Formação (Forming) - Cautela e Polidez", "Conflito (Storming) - Atrito e Disputa", "Normatização (Norming) - Alinhamento e Papéis", "Performance (Performing) - Autonomia e Alta Eficiência", "Dissolução (Adjourning) - Celebração e Fim"]
    if(addLog) addLog(\`Fase de equipe: \${stages[stage]}\`)
  }, [stage])

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-white/50">MODELO DE TUCKMAN (1965)</div>
      
      <div className="w-full max-w-3xl flex items-center justify-between px-8">
        {/* Viewport de Partículas */}
        <div className="relative w-64 h-64 border border-white/20 rounded-full flex items-center justify-center overflow-hidden">
          
          {/* Forming */}
          {stage === 0 && Array.from({length: 8}).map((_, i) => (
             <div key={i} className="absolute w-4 h-4 bg-white/20 border border-white/50 rounded-full transition-all duration-1000"
                  style={{ transform: \`translate(\${Math.cos(i*45)*40}px, \${Math.sin(i*45)*40}px)\` }} />
          ))}

          {/* Storming */}
          {stage === 1 && Array.from({length: 8}).map((_, i) => (
             <div key={i} className="absolute w-4 h-4 bg-[#ff0055] rounded shadow-[0_0_10px_#ff0055] animate-[spin_1s_linear_infinite]"
                  style={{ 
                    left: \`\${10 + Math.random()*80}%\`, top: \`\${10 + Math.random()*80}%\`,
                    animationDuration: \`\${0.5 + Math.random()}s\` 
                  }} />
          ))}

          {/* Norming */}
          {stage === 2 && Array.from({length: 8}).map((_, i) => (
             <div key={i} className="absolute w-4 h-4 bg-[#d4b87a] rounded-sm transition-all duration-1000"
                  style={{ transform: \`rotate(\${i*45}deg) translateY(-60px)\` }} />
          ))}

          {/* Performing */}
          {stage === 3 && (
            <div className="absolute inset-0 animate-[spin_4s_linear_infinite] flex items-center justify-center">
              <div className="w-20 h-20 bg-[#00ffd0]/20 rounded-full shadow-[0_0_30px_#00ffd0]" />
              {Array.from({length: 8}).map((_, i) => (
                 <div key={i} className="absolute w-3 h-3 bg-[#00ffd0] rounded-full shadow-[0_0_10px_#00ffd0]"
                      style={{ transform: \`rotate(\${i*45}deg) translateY(-40px)\` }} />
              ))}
            </div>
          )}

          {/* Adjourning */}
          {stage === 4 && Array.from({length: 8}).map((_, i) => (
             <div key={i} className="absolute w-2 h-2 bg-white rounded-full transition-all duration-1000 animate-ping"
                  style={{ transform: \`translate(\${Math.cos(i*45)*100}px, \${Math.sin(i*45)*100}px)\` }} />
          ))}
        </div>

        {/* Controles e Textos */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex gap-2">
            {['Forming', 'Storming', 'Norming', 'Performing', 'Adjourning'].map((s, i) => (
              <button key={i} onClick={() => setStage(i)}
                      className={\`px-2 py-1 text-[9px] border rounded transition-all \${stage === i ? 'bg-white/20 border-white text-white' : 'border-white/10 text-white/40 hover:text-white'}\`}>
                {s}
              </button>
            ))}
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded min-h-[100px]">
            {stage === 0 && <div className="text-[10px] text-white/80"><span className="text-white font-bold mb-2 block">Formação:</span> Grupo cauteloso, polido. Membros se conhecem. Parece harmonia, mas é superficialidade. Dependência total do líder.</div>}
            {stage === 1 && <div className="text-[10px] text-[#ff0055]"><span className="font-bold mb-2 block">Conflito (O Gargalo):</span> Tensão e disputa por papéis. 70% das equipes ficam presas aqui. O líder não deve evitar o conflito, mas mediá-lo para gerar maturidade.</div>}
            {stage === 2 && <div className="text-[10px] text-[#d4b87a]"><span className="font-bold mb-2 block">Normatização:</span> Regras estabelecidas. Confiabilidade mútua aumenta. A equipe começa a agir como unidade em vez de indivíduos isolados.</div>}
            {stage === 3 && <div className="text-[10px] text-[#00ffd0]"><span className="font-bold mb-2 block">Alta Performance:</span> Autonomia máxima. Grupo resolve problemas sozinhos. Foco em execução. Líder vira facilitador.</div>}
            {stage === 4 && <div className="text-[10px] text-white/80"><span className="text-white font-bold mb-2 block">Dissolução:</span> Fim do projeto. Retrospectiva e aprendizados para a próxima formação.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimMotivationPsychology({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [reward, setReward] = useState(0) // Extrínseco (0-100)
  const [purpose, setPurpose] = useState(0) // Intrínseco (0-100)

  const output = (reward * 0.4) + (purpose * 1.5) // Intrínseco gera muito mais energia

  useEffect(() => {
    if(addLog) addLog(\`Calibração Motora: Extrínseca [\${reward}] | Intrínseca [\${purpose}]\`)
  }, [reward, purpose])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">MOTOR DE ALTA PERFORMANCE (DANIEL PINK)</div>

      <div className="w-full max-w-xl flex gap-10 items-end justify-center mb-10">
        
        {/* Bateria Extrínseca */}
        <div className="flex flex-col items-center">
          <div className="text-[9px] text-[#ff0055] mb-2 tracking-widest">MOTIVAÇÃO EXTRÍNSECA (Bônus, Dinheiro)</div>
          <div className="relative w-16 h-32 border-2 border-[#ff0055] rounded-lg overflow-hidden flex flex-col-reverse">
            <div className="w-full bg-[#ff0055] transition-all duration-300" style={{ height: \`\${reward}%\` }} />
          </div>
          <input type="range" min="0" max="100" value={reward} onChange={(e)=>setReward(Number(e.target.value))} className="mt-4 accent-[#ff0055] w-24" />
        </div>

        {/* Gerador Central */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full border-4 flex items-center justify-center overflow-hidden transition-all duration-300"
               style={{ 
                 borderColor: output > 100 ? '#00ffd0' : 'rgba(255,255,255,0.2)',
                 boxShadow: output > 100 ? \`0 0 \${output}px rgba(0,255,208,0.5)\` : 'none'
               }}>
            {/* Plasma Interno */}
            <div className="absolute inset-0 bg-[#00ffd0] transition-all duration-300 opacity-20"
                 style={{ 
                   transform: \`scale(\${Math.min(output/100, 1)})\`,
                   animation: output > 50 ? \`pulse-opacity \${200/output}s infinite\` : 'none'
                 }} />
            <div className="z-10 text-[16px] font-bold" style={{ color: output > 100 ? '#00ffd0' : 'white' }}>
              {Math.min(Math.round(output), 150)}%
            </div>
          </div>
          <div className="text-[10px] mt-2 text-white/50">ENERGIA DE EXECUÇÃO</div>
        </div>

        {/* Bateria Intrínseca */}
        <div className="flex flex-col items-center">
          <div className="text-[9px] text-[#00ffd0] mb-2 tracking-widest text-center">MOTIVAÇÃO INTRÍNSECA<br/>(Autonomia, Maestria, Propósito)</div>
          <div className="relative w-16 h-32 border-2 border-[#00ffd0] rounded-lg overflow-hidden flex flex-col-reverse">
            <div className="w-full bg-[#00ffd0] transition-all duration-300 shadow-[0_0_15px_#00ffd0]" style={{ height: \`\${purpose}%\` }} />
          </div>
          <input type="range" min="0" max="100" value={purpose} onChange={(e)=>setPurpose(Number(e.target.value))} className="mt-4 accent-[#00ffd0] w-24" />
        </div>

      </div>

      <div className="max-w-md text-center text-[10px] text-white/60">
        Tarefas mecânicas respondem bem ao dinheiro (Extrínseco). Para trabalhos cognitivos complexos, recompensas financeiras têm teto baixo. O multiplicador real (x1.5) vem de <strong>Autonomia, Maestria e Propósito</strong>.
      </div>
    </div>
  )
}

export function SimCommunicationChannels({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [members, setMembers] = useState(5)
  const channels = (members * (members - 1)) / 2

  useEffect(() => {
    if(addLog) addLog(\`Cálculo nodal: \${members} membros = \${channels} canais de comunicação cruzada.\`)
  }, [members])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden p-6">
      <div className="absolute top-4 left-4 text-[9px] text-[#ff0055]">COMPLEXIDADE DE CANAIS (C = n(n-1)/2)</div>
      
      <div className="text-center mb-6 z-20">
        <div className="text-[14px] font-bold text-white">Membros da Equipe: {members}</div>
        <div className="text-[20px] font-bold text-[#ff0055] mt-1 shadow-sm">Canais: {channels}</div>
        <input type="range" min="3" max="25" value={members} onChange={(e)=>setMembers(Number(e.target.value))} className="w-64 accent-[#ff0055] mt-4" />
      </div>

      <div className="relative w-72 h-72 border border-white/10 rounded-full flex items-center justify-center bg-[#ff0055]/5 perspective-[1000px]">
        {/* Render lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 2px rgba(255,0,85,0.5))' }}>
          {Array.from({length: members}).map((_, i) => {
             return Array.from({length: members}).map((_, j) => {
               if(j > i) {
                 const x1 = 144 + Math.cos((i * 2 * Math.PI) / members) * 130
                 const y1 = 144 + Math.sin((i * 2 * Math.PI) / members) * 130
                 const x2 = 144 + Math.cos((j * 2 * Math.PI) / members) * 130
                 const y2 = 144 + Math.sin((j * 2 * Math.PI) / members) * 130
                 return (
                   <line key={\`\${i}-\${j}\`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,0,85,0.4)" strokeWidth="0.5" />
                 )
               }
               return null
             })
          })}
        </svg>

        {/* Render nodes */}
        {Array.from({length: members}).map((_, i) => (
           <div key={i} className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                style={{ 
                  transform: \`translate(\${Math.cos((i * 2 * Math.PI) / members) * 130}px, \${Math.sin((i * 2 * Math.PI) / members) * 130}px)\` 
                }} />
        ))}
      </div>

      <div className="mt-8 text-center text-[10px] text-white/50 max-w-sm">
        A complexidade da comunicação cresce exponencialmente. Por isso, gerenciar 15 pessoas (105 canais) sem processos rigorosos e ferramentas assíncronas resulta em caos absoluto e ruído generalizado.
      </div>
    </div>
  )
}

export function SimTeamDysfunctions({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [built, setBuilt] = useState([true, true, true, true, true]) // 0:Confiança(base), 1:Conflito, 2:Comprometimento, 3:Responsabilidade, 4:Resultados(topo)

  const toggleLayer = (index: number) => {
    setBuilt(prev => {
      const next = [...prev]
      const state = !next[index]
      next[index] = state
      // Efeito cascata: se remove a base, todos acima desmoronam
      if(!state) {
        for(let i=index+1; i<5; i++) next[i] = false
      }
      return next
    })
  }

  useEffect(() => {
    if(addLog) {
      if(built.every(b => b)) addLog("Pirâmide Lencioni estável. Equipe de alta performance.")
      else addLog("Falha estrutural detectada na arquitetura da equipe.")
    }
  }, [built])

  const layers = [
    { name: 'Confiança (Vulnerabilidade)', color: '#d4b87a', w: 'w-64' },
    { name: 'Conflito Produtivo', color: '#ff7700', w: 'w-52' },
    { name: 'Comprometimento', color: '#ff0055', w: 'w-40' },
    { name: 'Responsabilidade Mútua', color: '#a855f7', w: 'w-28' },
    { name: 'Foco em Resultados', color: '#00ffd0', w: 'w-16' }
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden p-4">
      <div className="absolute top-4 right-4 text-[9px] text-[#d4b87a]">AS 5 DISFUNÇÕES DE EQUIPE (LENCIONI)</div>

      <div className="relative h-72 flex flex-col-reverse items-center justify-start pb-10">
        {layers.map((layer, i) => {
          const isBuilt = built[i]
          return (
            <div 
              key={i} 
              onClick={() => toggleLayer(i)}
              className={\`h-10 \${layer.w} mb-1 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all duration-700 border-b-4\`}
              style={{ 
                backgroundColor: isBuilt ? \`\${layer.color}20\` : 'rgba(255,255,255,0.05)',
                borderColor: isBuilt ? layer.color : 'rgba(255,255,255,0.1)',
                color: isBuilt ? layer.color : 'rgba(255,255,255,0.3)',
                transform: isBuilt ? 'translateY(0) scale(1)' : \`translateY(\${(4-i)*20}px) scale(0.95) rotate(\${(i%2==0?1:-1)*5}deg)\`,
                opacity: isBuilt ? 1 : 0.4
              }}
            >
              {layer.name}
            </div>
          )
        })}
      </div>

      <div className="text-center text-[10px] text-white/50 max-w-sm mt-4">
        Clique na camada da <strong>Confiança (Base)</strong>. Sem vulnerabilidade, o medo do conflito emerge, não há comprometimento real, as pessoas param de se responsabilizar e o foco em resultados desmorona.
      </div>
    </div>
  )
}

export function SimVUCALeadership({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [style, setStyle] = useState<'comando' | 'distribuido'>('comando')

  useEffect(() => {
    if(addLog) addLog(\`Topologia de Liderança ativada: \${style.toUpperCase()}\`)
  }, [style])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#a855f7]">AMBIENTES VUCA/BANI E LIDERANÇA ÁGIL</div>

      <div className="flex gap-4 mb-8 z-20">
        <button onClick={()=>setStyle('comando')} className={\`px-4 py-2 border text-[10px] \${style==='comando'?'bg-white text-black':'text-white border-white/20'}\`}>Comando Centralizado</button>
        <button onClick={()=>setStyle('distribuido')} className={\`px-4 py-2 border text-[10px] \${style==='distribuido'?'bg-[#00ffd0] text-black border-[#00ffd0]':'text-white border-white/20'}\`}>Autoridade Distribuída</button>
      </div>

      <div className="relative w-80 h-80 border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)] overflow-hidden">
        
        {/* VUCA Background Noise */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] animate-[slide-right_5s_linear_infinite]" />

        {style === 'comando' && (
          <>
            {/* Líder Centralizado (Gargalo) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#ff0055] rounded shadow-[0_0_20px_#ff0055] z-10 animate-pulse" />
            
            {/* Problemas (Partículas batendo no centro) */}
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="absolute w-2 h-2 bg-white/50 rounded-full animate-[ping_2s_ease-out_infinite]"
                   style={{ 
                     top: '50%', left: '50%',
                     transform: \`rotate(\${i*30}deg) translateY(-80px)\`,
                     animationDelay: \`\${Math.random()*2}s\`
                   }} />
            ))}
            
            {/* Linhas vermelhas de estresse */}
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="absolute top-1/2 left-1/2 w-[1px] h-32 bg-[#ff0055]/50 origin-bottom"
                   style={{ transform: \`rotate(\${i*60}deg) translateY(-32px)\` }} />
            ))}
            <div className="absolute bottom-4 w-full text-center text-[10px] text-[#ff0055] font-bold">LÍDER COMO GARGALO (SOBRECARGA)</div>
          </>
        )}

        {style === 'distribuido' && (
          <>
             {/* Líder Facilitador */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-transparent border-2 border-[#00ffd0] rounded-full shadow-[0_0_20px_#00ffd0] z-10 opacity-50" />
             
             {/* Equipes Autônomas (Squads) resolvendo problemas na borda */}
             {[
               {x: 20, y: 20}, {x: 80, y: 20}, {x: 20, y: 80}, {x: 80, y: 80}
             ].map((pos, i) => (
               <div key={i} className="absolute flex items-center justify-center" style={{ top: \`\${pos.y}%\`, left: \`\${pos.x}%\` }}>
                 <div className="absolute w-12 h-12 border border-[#00ffd0]/50 rounded-full animate-[spin_3s_linear_infinite]" />
                 <div className="w-3 h-3 bg-[#00ffd0] rounded shadow-[0_0_10px_#00ffd0]" />
                 {/* Conexão com o líder */}
                 <svg className="absolute w-32 h-32 -z-10 overflow-visible">
                   <line x1="0" y1="0" x2={(50-pos.x)*3.2} y2={(50-pos.y)*3.2} stroke="rgba(0,255,208,0.2)" strokeDasharray="4 4" className="animate-[slide-right_1s_linear_infinite]" />
                 </svg>
               </div>
             ))}
             <div className="absolute bottom-4 w-full text-center text-[10px] text-[#00ffd0] font-bold">LÍDER COMO FACILITADOR (AGILIDADE)</div>
          </>
        )}

      </div>
      
      <div className="mt-4 text-center text-[10px] text-white/50 max-w-sm">
        Em um mundo previsível, centralizar funciona. No mundo VUCA (Volátil, Incerto), empurrar o poder de decisão para a borda (perto do cliente e do problema) é a única forma de reagir a tempo.
      </div>
    </div>
  )
}
`

if (!content.includes('SimLeadershipTheories')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended M3-S2 simulations!')
} else {
  console.log('Already appended.')
}