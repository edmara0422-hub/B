import fs from 'fs'

const file = 'components/business-syllabus/simulations-6d.tsx'

const newComponents = `

// ============================================================================
// M1-S3: SUSTENTABILIDADE EM NEGÓCIOS (7 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimNestedSustainability({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [isNested, setIsNested] = useState(false)
  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    const i = setInterval(() => setRotate(r => (r + 1) % 360), 50)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative perspective-[1000px]">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest">
        TOPOLOGIA: {isNested ? 'CÍRCULOS ANINHADOS' : 'TRIPLE BOTTOM LINE (TBL)'}
      </div>
      
      <div className="flex-1 w-full flex items-center justify-center relative mt-6" style={{ transformStyle: 'preserve-3d' }}>
        {/* TBL Mode */}
        <div className={\`absolute inset-0 flex items-center justify-center transition-all duration-1000 \${isNested ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}\`}>
          <div className="relative w-40 h-40">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-2 border-[#00ffd0] bg-[#00ffd0]/10 flex items-top justify-center pt-2 text-[10px] font-bold text-[#00ffd0] mix-blend-screen shadow-[0_0_15px_rgba(0,255,208,0.3)]">PLANET</div>
            <div className="absolute bottom-4 left-2 w-24 h-24 rounded-full border-2 border-[#d4b87a] bg-[#d4b87a]/10 flex items-end justify-start pb-4 pl-3 text-[10px] font-bold text-[#d4b87a] mix-blend-screen shadow-[0_0_15px_rgba(212,184,122,0.3)]">PEOPLE</div>
            <div className="absolute bottom-4 right-2 w-24 h-24 rounded-full border-2 border-[#ff0055] bg-[#ff0055]/10 flex items-end justify-end pb-4 pr-3 text-[10px] font-bold text-[#ff0055] mix-blend-screen shadow-[0_0_15px_rgba(255,0,85,0.3)]">PROFIT</div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 animate-pulse mix-blend-overlay shadow-[0_0_20px_#fff]" />
          </div>
        </div>

        {/* Nested Mode */}
        <div className={\`absolute inset-0 flex items-center justify-center transition-all duration-1000 \${!isNested ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100 scale-100'}\`}>
          <div className="relative flex items-center justify-center" style={{ transform: \`rotateX(60deg) rotateZ(\${rotate}deg)\` }}>
            {/* Meio Ambiente */}
            <div className="absolute w-48 h-48 rounded-full border border-[#00ffd0]/50 bg-[#00ffd0]/5 flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,255,208,0.2)]">
              <span className="absolute -top-4 text-[8px] text-[#00ffd0] font-mono tracking-widest whitespace-nowrap" style={{ transform: \`rotateZ(-\${rotate}deg)\` }}>MEIO AMBIENTE (LIMITES GLOBAIS)</span>
            </div>
            {/* Sociedade */}
            <div className="absolute w-32 h-32 rounded-full border-2 border-[#d4b87a] bg-[#d4b87a]/10 flex items-center justify-center shadow-[0_0_20px_rgba(212,184,122,0.4)]">
              <span className="absolute -left-6 text-[8px] text-[#d4b87a] font-mono tracking-widest" style={{ transform: \`rotateZ(-\${rotate}deg)\` }}>SOCIEDADE</span>
            </div>
            {/* Economia */}
            <div className="absolute w-16 h-16 rounded-full border-2 border-[#ff0055] bg-[#ff0055]/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,0,85,0.5)]">
              <span className="text-[8px] text-[#ff0055] font-bold" style={{ transform: \`rotateZ(-\${rotate}deg) rotateX(-60deg)\` }}>ECONOMIA</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => {
          setIsNested(!isNested)
          if(addLog) addLog(!isNested ? 'Transição para Paradigma de Círculos Aninhados: Economia subordinada à Biosfera.' : 'Retorno ao TBL (1994): Trade-offs de métricas independentes ativados.')
        }}
        className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-[9px] font-mono text-white tracking-widest transition-all z-10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
      >
        {isNested ? 'REVERTER PARA TBL' : 'EVOLUIR PARA NESTED CIRCLES'}
      </button>
    </div>
  )
}

export function SimESGScanner({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [scanning, setScanning] = useState<'E' | 'S' | 'G' | null>(null)
  
  const pillars = {
    E: { name: 'ENVIRONMENTAL', color: '#00ffd0', desc: 'Emissões Escopo 1-3, Água, Resíduos', risk: 'Risco Climático Físico / Multas Ambientais' },
    S: { name: 'SOCIAL', color: '#d4b87a', desc: 'Diversidade, Direitos Humanos, Segurança', risk: 'Risco de Reputação / Boicote de Consumidor' },
    G: { name: 'GOVERNANCE', color: '#ff0055', desc: 'Comitê de Auditoria, Ética, Anti-Corrupção', risk: 'Fraude Contábil / Risco Regulatório' }
  }

  const runScan = (k: 'E'|'S'|'G') => {
    setScanning(k)
    if(addLog) addLog(\`[SCAN INICIADO] Espectro \${pillars[k].name}. Rastreado: \${pillars[k].desc}.\`)
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex gap-2 mb-4">
        {(['E','S','G'] as const).map(k => (
          <button 
            key={k} onClick={() => runScan(k)}
            className={\`flex-1 py-1.5 text-[10px] font-bold font-mono rounded border transition-all \${scanning === k ? 'bg-white/10' : 'bg-transparent border-white/10 text-white/40'}\`}
            style={{ borderColor: scanning === k ? pillars[k].color : undefined, color: scanning === k ? pillars[k].color : undefined, textShadow: scanning === k ? \`0 0 10px \${pillars[k].color}\` : 'none' }}
          >
            {pillars[k].name}
          </button>
        ))}
      </div>

      <div className="flex-1 relative border border-white/10 bg-black/50 rounded-lg overflow-hidden flex flex-col items-center justify-center">
        {scanning ? (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-bounce" style={{ filter: \`drop-shadow(0 0 8px \${pillars[scanning].color})\` }} />
            
            <div className="w-3/4 space-y-3">
              <div className="flex justify-between text-[9px] font-mono">
                <span className="text-white/50">MÉTRICAS ATIVAS:</span>
                <span style={{ color: pillars[scanning].color }}>{pillars[scanning].desc}</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full animate-pulse" style={{ width: '100%', backgroundColor: pillars[scanning].color }} />
              </div>
              
              <div className="p-2 border rounded bg-black/80 mt-4" style={{ borderColor: \`\${pillars[scanning].color}40\` }}>
                <span className="text-[8px] uppercase tracking-widest text-red-400 block mb-1">Risco Material Detectado</span>
                <span className="text-[10px] text-white/90">{pillars[scanning].risk}</span>
              </div>
            </div>
          </>
        ) : (
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest animate-pulse">AGUARDANDO SELEÇÃO DE ESPECTRO...</span>
        )}
      </div>
    </div>
  )
}

export function SimFrameworkConstellation({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activeFw, setActiveFw] = useState<number>(0)
  const frameworks = [
    { id: 'GRI', target: 'Stakeholders Amplos', focus: 'Impacto da empresa no mundo', color: '#00ffd0' },
    { id: 'SASB', target: 'Investidores', focus: 'Impacto do mundo no financeiro da empresa', color: '#d4b87a' },
    { id: 'ODS', target: 'Agenda ONU 2030', focus: 'Metas globais de impacto social/ambiental', color: '#3b82f6' },
    { id: 'CSV', target: 'Vantagem Competitiva', focus: 'Lucro através da solução de problemas sociais', color: '#ff0055' }
  ]

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div className="flex justify-between items-center bg-black/40 border border-white/10 rounded-lg p-2 mb-3">
        {frameworks.map((fw, i) => (
          <button 
            key={i} onClick={() => { setActiveFw(i); if(addLog) addLog(\`Protocolo \${fw.id} ativo. Foco em \${fw.target}.\`) }}
            className={\`px-2 py-1 rounded text-[10px] font-mono transition-all \${activeFw === i ? 'font-bold' : 'text-white/40'}\`}
            style={{ backgroundColor: activeFw === i ? \`\${fw.color}20\` : 'transparent', color: activeFw === i ? fw.color : undefined }}
          >
            {fw.id}
          </button>
        ))}
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {/* Orbital Rings */}
        <div className="absolute w-40 h-40 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-28 h-28 rounded-full border border-white/10 animate-[spin_7s_linear_infinite_reverse]" />
        
        {/* Center Node */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-bold z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-colors duration-500"
             style={{ backgroundColor: \`\${frameworks[activeFw].color}30\`, color: frameworks[activeFw].color, border: \`1px solid \${frameworks[activeFw].color}\` }}>
          {frameworks[activeFw].id}
        </div>

        {/* Dynamic Beam */}
        <div className="absolute w-full h-[1px] top-1/2 left-0 -translate-y-1/2 transition-all duration-500 flex justify-end items-center pr-6"
             style={{ background: \`linear-gradient(90deg, transparent, \${frameworks[activeFw].color}80, transparent)\`, transform: \`rotate(\${activeFw * 45}deg)\` }}>
          <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: frameworks[activeFw].color }} />
        </div>
      </div>

      <div className="text-center mt-2 p-2 rounded bg-white/5 border border-white/5">
        <div className="text-[8px] text-white/50 uppercase tracking-widest">Público Alvo: <span style={{ color: frameworks[activeFw].color }}>{frameworks[activeFw].target}</span></div>
        <div className="text-[10px] text-white/90 mt-1">{frameworks[activeFw].focus}</div>
      </div>
    </div>
  )
}

export function SimGreenwashingFilter({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [filterOn, setFilterOn] = useState(false)

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="absolute top-0 right-0 z-10">
        <button 
          onClick={() => { setFilterOn(!filterOn); if(addLog) addLog(filterOn ? 'Filtro UV Desativado.' : 'ALERTA: Filtro de Espectro Revelador Ativado. Analisando "7 Pecados".') }}
          className={\`px-3 py-1.5 rounded text-[9px] font-mono font-bold border transition-all \${filterOn ? 'bg-[#ff0055]/20 border-[#ff0055] text-[#ff0055] animate-pulse shadow-[0_0_15px_rgba(255,0,85,0.4)]' : 'bg-white/10 border-white/20 text-white'}\`}
        >
          {filterOn ? 'DESATIVAR RADAR' : 'APLICAR FILTRO UV'}
        </button>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden relative mt-8 border border-white/10 group">
        {/* Falsa Sustentabilidade (Green) */}
        <div className={\`absolute inset-0 bg-[#002211] flex flex-col items-center justify-center transition-all duration-1000 \${filterOn ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100'}\`}>
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500 mb-2 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
            <span className="text-2xl">🌱</span>
          </div>
          <span className="text-green-400 font-bold tracking-widest uppercase">100% Eco-Friendly</span>
          <span className="text-[9px] text-green-300/50 mt-1">Produto da Natureza</span>
        </div>

        {/* Realidade (Red Glitch) */}
        <div className={\`absolute inset-0 bg-[#220000] flex flex-col items-center justify-center p-4 transition-all duration-1000 \${filterOn ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-md pointer-events-none'}\`}
             style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,85,0.1) 2px, rgba(255,0,85,0.1) 4px)' }}>
          <div className="text-[#ff0055] text-[10px] font-mono w-full space-y-2">
             <div className="border-l-2 border-[#ff0055] pl-2 animate-[pulse_2s_infinite]">
               <span className="font-bold">PECADO #1 (TRADE-OFF OCULTO):</span><br/>
               Embalagem reciclável, mas produção desmata florestas primárias.
             </div>
             <div className="border-l-2 border-[#ff0055] pl-2 animate-[pulse_2.5s_infinite]">
               <span className="font-bold">PECADO #3 (VAGUEZA):</span><br/>
               "Eco-Friendly" não possui padrão técnico ou regulatório.
             </div>
             <div className="border-l-2 border-[#ff0055] pl-2 animate-[pulse_3s_infinite]">
               <span className="font-bold">PECADO #4 (FALSO SELO):</span><br/>
               Certificação criada pela própria agência de marketing da marca.
             </div>
          </div>
        </div>
        
        {/* Scanner Line */}
        {filterOn && <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ff0055] shadow-[0_0_10px_#ff0055] animate-[scan_2s_ease-in-out_infinite]" />}
      </div>
      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      \`}} />
    </div>
  )
}

export function SimSMARTLock({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [locks, setLocks] = useState([false, false, false, false, false])
  const letters = ['S', 'M', 'A', 'R', 'T']
  const descriptions = [
    'Específico: "Reduzir 15% de CO2 na logística"',
    'Mensurável: KPIs com linha de base',
    'Atingível: Possível com recursos atuais',
    'Relevante: Alinhado à estratégia',
    'Temporal: "Até Dezembro de 2026"'
  ]

  const unlock = (i: number) => {
    if(locks[i]) return
    const newLocks = [...locks]
    newLocks[i] = true
    setLocks(newLocks)
    if(addLog) addLog(\`Trava \${letters[i]} (\${descriptions[i].split(':')[0]}) alinhada e trancada!\`)
  }

  const allUnlocked = locks.every(l => l)

  return (
    <div className="flex flex-col h-full w-full justify-center items-center relative">
      <div className="relative w-40 h-40 flex items-center justify-center mb-4">
        {/* Anéis Concentricos */}
        {locks.map((isLocked, i) => {
          const size = 160 - (i * 24)
          return (
            <div key={i} 
                 className={\`absolute rounded-full border-2 flex items-top justify-center transition-all duration-1000 \${isLocked ? 'border-[#00ffd0] shadow-[0_0_10px_rgba(0,255,208,0.5)]' : 'border-white/10 border-dashed animate-[spin_10s_linear_infinite]'}\`}
                 style={{ width: size, height: size, animationDirection: i % 2 === 0 ? 'normal' : 'reverse', zIndex: 10 - i }}>
              <button 
                onClick={() => unlock(i)}
                className={\`absolute -top-2 w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center transition-colors \${isLocked ? 'bg-[#00ffd0] text-black' : 'bg-black border border-white/30 text-white/50 hover:bg-white/20'}\`}
              >
                {letters[i]}
              </button>
            </div>
          )
        })}

        {/* Core Central */}
        <div className={\`w-12 h-12 rounded-full flex items-center justify-center text-[8px] font-bold z-20 transition-all duration-1000 \${allUnlocked ? 'bg-[#00ffd0] text-black shadow-[0_0_30px_#00ffd0] scale-110' : 'bg-black border-2 border-white/10 text-white/20'}\`}>
          {allUnlocked ? 'POLICY ACTIVE' : 'LOCKED'}
        </div>
      </div>

      <div className="text-[9px] font-mono text-center w-full max-w-[200px] h-10">
        {!allUnlocked ? (
          <span className="text-white/50">Alinhe os 5 anéis SMART para validar a Política de Sustentabilidade.</span>
        ) : (
          <span className="text-[#00ffd0] animate-pulse">Integração ESG completa. Política pronta para governança corporativa.</span>
        )}
      </div>
    </div>
  )
}

export function SimBPMNFlow({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [gateway, setGateway] = useState<'XOR' | 'AND'>('XOR')
  const [tokenActive, setTokenActive] = useState(false)

  const fireToken = () => {
    if(tokenActive) return
    setTokenActive(true)
    if(addLog) addLog(\`Token instanciado. Gateway: \${gateway} (\${gateway === 'XOR' ? 'Exclusivo - Um ou Outro' : 'Paralelo - Todos Simultâneos'}).\`)
    setTimeout(() => setTokenActive(false), 3000)
  }

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setGateway('XOR')} className={\`px-2 py-1 text-[9px] font-bold font-mono rounded border \${gateway === 'XOR' ? 'bg-[#d4b87a]/20 border-[#d4b87a] text-[#d4b87a]' : 'bg-transparent border-white/20 text-white/50'}\`}>XOR (Exclusivo)</button>
        <button onClick={() => setGateway('AND')} className={\`px-2 py-1 text-[9px] font-bold font-mono rounded border \${gateway === 'AND' ? 'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0]' : 'bg-transparent border-white/20 text-white/50'}\`}>AND (Paralelo)</button>
        <button onClick={fireToken} disabled={tokenActive} className="px-3 py-1 bg-white text-black text-[9px] font-bold rounded hover:bg-white/80 disabled:opacity-50">START TOKEN</button>
      </div>

      <div className="flex-1 relative border border-white/10 rounded-lg bg-[#000810] flex items-center p-4">
        {/* Linhas de Fluxo Estáticas */}
        <div className="absolute top-1/2 left-4 w-12 h-[2px] bg-white/20" />
        <div className="absolute top-1/2 left-16 w-8 h-8 -mt-4 -ml-4 rotate-45 border-2 border-white/40 flex items-center justify-center text-[8px] font-bold text-white/60">
          <span className="-rotate-45">{gateway === 'XOR' ? 'X' : '+'}</span>
        </div>
        
        {/* Caminho Superior */}
        <div className="absolute top-[30%] left-16 w-8 h-[2px] bg-white/20 origin-left -rotate-45" />
        <div className="absolute top-[30%] left-[86px] w-20 h-[2px] bg-white/20" />
        <div className="absolute top-[30%] left-[166px] w-12 h-6 border-2 border-white/20 rounded -mt-3 flex items-center justify-center text-[7px] text-white/40">Tarefa A</div>
        
        {/* Caminho Inferior */}
        <div className="absolute top-[70%] left-16 w-8 h-[2px] bg-white/20 origin-left rotate-45" />
        <div className="absolute top-[70%] left-[86px] w-20 h-[2px] bg-white/20" />
        <div className="absolute top-[70%] left-[166px] w-12 h-6 border-2 border-white/20 rounded -mt-3 flex items-center justify-center text-[7px] text-white/40">Tarefa B</div>

        {/* Tokens Animados */}
        {tokenActive && (
          <>
            <div className="absolute top-1/2 left-4 w-3 h-3 bg-white rounded-full -mt-1.5 animate-[tokenStart_1s_linear_forwards] shadow-[0_0_10px_#fff]" />
            
            {/* Se XOR, vai só para A. Se AND, vai para A e B */}
            <div className="absolute top-[30%] left-[86px] w-3 h-3 rounded-full -mt-1.5 shadow-[0_0_10px_currentColor] opacity-0 animate-[tokenPathA_2s_linear_1s_forwards]"
                 style={{ backgroundColor: gateway === 'XOR' ? '#d4b87a' : '#00ffd0', color: gateway === 'XOR' ? '#d4b87a' : '#00ffd0' }} />
            
            {gateway === 'AND' && (
              <div className="absolute top-[70%] left-[86px] w-3 h-3 bg-[#00ffd0] text-[#00ffd0] rounded-full -mt-1.5 opacity-0 animate-[tokenPathB_2s_linear_1s_forwards] shadow-[0_0_10px_#00ffd0]" />
            )}
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes tokenStart { 0% { left: 1rem; } 100% { left: 4rem; } }
        @keyframes tokenPathA { 0% { left: 86px; opacity: 1; } 80% { left: 180px; opacity: 1; } 100% { left: 180px; opacity: 0; } }
        @keyframes tokenPathB { 0% { left: 86px; opacity: 1; } 80% { left: 180px; opacity: 1; } 100% { left: 180px; opacity: 0; } }
      \`}} />
    </div>
  )
}

export function SimCertGlobe({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activePin, setActivePin] = useState<number | null>(null)
  
  const certs = [
    { name: 'B Corps', desc: 'Propósito + Lucro (Global)', x: '20%', y: '30%', color: '#00ffd0' },
    { name: 'ISE B3', desc: 'Maturidade ESG (Brasil)', x: '35%', y: '65%', color: '#ff0055' },
    { name: 'Fair Trade', desc: 'Preço Mínimo & Ética', x: '50%', y: '50%', color: '#d4b87a' },
    { name: 'Cradle to Cradle', desc: 'Zero Resíduo (Economia Circular)', x: '70%', y: '25%', color: '#3b82f6' }
  ]

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex gap-1 mb-2 overflow-x-auto pb-1 no-scrollbar">
        {certs.map((c, i) => (
          <button 
            key={i} onClick={() => { setActivePin(i); if(addLog) addLog(\`Satélite Localizador: \${c.name}. \${c.desc}.\`) }}
            className={\`px-2 py-1 text-[8px] font-bold font-mono rounded whitespace-nowrap border \${activePin === i ? 'bg-white/20 text-white' : 'bg-transparent border-white/10 text-white/40'}\`}
            style={{ borderColor: activePin === i ? c.color : undefined }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex-1 relative rounded-xl border border-white/10 overflow-hidden bg-[#001122]">
        {/* Globo Wireframe Falso SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 0 50 Q 50 0 100 50 Q 50 100 0 50" fill="none" stroke="#00ffd0" strokeWidth="0.5" />
          <path d="M 20 50 Q 50 20 80 50 Q 50 80 20 50" fill="none" stroke="#00ffd0" strokeWidth="0.5" />
          <path d="M 50 0 L 50 100" fill="none" stroke="#00ffd0" strokeWidth="0.5" />
          <path d="M 0 50 L 100 50" fill="none" stroke="#00ffd0" strokeWidth="0.5" />
        </svg>

        {/* Pins Dinâmicos */}
        {certs.map((c, i) => (
          <div key={i} className={\`absolute flex flex-col items-center transition-all duration-500 \${activePin === i ? 'opacity-100 scale-125 z-10' : 'opacity-30 scale-75'}\`}
               style={{ left: c.x, top: c.y }}>
            <div className="w-2 h-2 rounded-full relative" style={{ backgroundColor: c.color, boxShadow: \`0 0 10px \${c.color}\` }}>
              {activePin === i && <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: c.color }} />}
            </div>
            {activePin === i && (
              <div className="mt-1 bg-black/80 border rounded px-1.5 py-0.5 text-[7px] font-mono whitespace-nowrap" style={{ borderColor: c.color, color: c.color }}>
                {c.desc}
              </div>
            )}
          </div>
        ))}
        
        {/* Efeito de Scanner Linear */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 animate-[scan_4s_linear_infinite]" />
      </div>
    </div>
  )
}
`

fs.appendFileSync(file, newComponents)
console.log('Successfully appended 7 simulations for M1-S3')