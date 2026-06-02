import fs from 'fs'

const file = 'components/business-syllabus/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M3-S1: ECONOMIA E ANÁLISE MERCADOLÓGICA (3 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimMarketEras({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const eras = [
    { id: 'producao', name: 'ERA DA PRODUÇÃO', desc: 'Foco no produto. Oferta cria sua demanda.', color: '#d4b87a' },
    { id: 'marketing', name: 'ERA DO MARKETING', desc: 'Foco no cliente. Entender para atender.', color: '#00ffd0' },
    { id: 'digital', name: 'ERA DIGITAL', desc: 'Foco no ecossistema. Co-criação algorítmica.', color: '#ff0055' }
  ]
  const [activeEra, setActiveEra] = useState(0)

  useEffect(() => {
    if(addLog) addLog(\`Comutador histórico: \${eras[activeEra].name} ativada.\`)
  }, [activeEra])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden font-mono p-6">
      {/* HUD Header */}
      <div className="absolute top-4 left-4 text-[9px] text-white/50 tracking-widest">
        CRONOGRAMA EVOLUTIVO DE MERCADO
      </div>

      {/* Main Visualizer */}
      <div className="relative w-64 h-64 flex items-center justify-center perspective-[1000px]">
        {/* Fundo Rotativo (Grid) */}
        <div className="absolute inset-0 border border-white/5 rounded-full" style={{ transform: 'rotateX(70deg)' }} />

        {/* ERA 0: Produção */}
        {activeEra === 0 && (
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Fábrica / Linha de montagem */}
             <div className="absolute w-24 h-4 bg-[#d4b87a]/20 border border-[#d4b87a] rounded flex items-center justify-around overflow-hidden shadow-[0_0_15px_#d4b87a]">
                {Array.from({length: 3}).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-[#d4b87a] animate-[slide-right_2s_linear_infinite]" style={{ animationDelay: \`\${i * 0.6}s\` }} />
                ))}
             </div>
             <div className="absolute bottom-10 text-[10px] text-[#d4b87a] tracking-widest">PRODUTO PADRONIZADO (FORD T)</div>
          </div>
        )}

        {/* ERA 1: Marketing */}
        {activeEra === 1 && (
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Cliente no centro, radares buscando necessidades */}
             <div className="w-8 h-8 bg-[#00ffd0] rounded-full shadow-[0_0_20px_#00ffd0] animate-pulse z-10" />
             <div className="absolute w-40 h-40 border border-[#00ffd0] rounded-full animate-ping opacity-20" />
             {/* Setas direcionadas ao centro */}
             {Array.from({length: 4}).map((_, i) => (
               <div key={i} className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ffd0] to-transparent opacity-50"
                    style={{ transform: \`rotate(\${i * 45}deg)\` }} />
             ))}
             <div className="absolute bottom-10 text-[10px] text-[#00ffd0] tracking-widest">SEGMENTAÇÃO & TARGETING</div>
          </div>
        )}

        {/* ERA 2: Digital */}
        {activeEra === 2 && (
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Ecossistema Neural */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,85,0.2)_0%,transparent_60%)]" />
             {Array.from({length: 20}).map((_, i) => {
               const angle = Math.random() * 360
               const dist = 30 + Math.random() * 80
               return (
                 <div key={i} className="absolute w-1 h-1 bg-[#ff0055] rounded-full shadow-[0_0_5px_#ff0055]"
                      style={{ 
                        transform: \`rotate(\${angle}deg) translateY(\${dist}px)\`,
                        animation: \`pulse-opacity \${1+Math.random()*2}s infinite\`
                      }} />
               )
             })}
             <div className="w-12 h-12 rounded-full border border-[#ff0055] animate-[spin_4s_linear_infinite] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-t border-b border-[#ff0055] animate-[spin_2s_linear_infinite_reverse]" />
             </div>
             <div className="absolute bottom-10 text-[10px] text-[#ff0055] tracking-widest">ALGORITMOS & CO-CRIAÇÃO (AMAZON)</div>
          </div>
        )}
      </div>

      {/* Controllers */}
      <div className="flex gap-4 mt-8 z-20">
        {eras.map((era, i) => (
          <button 
            key={i} 
            onClick={() => setActiveEra(i)}
            className={\`px-3 py-2 text-[9px] border rounded transition-all \${activeEra === i ? 'bg-white/10 shadow-[0_0_10px_currentColor]' : 'opacity-40 hover:opacity-100 border-white/20'}\`}
            style={{ color: activeEra === i ? era.color : 'white', borderColor: activeEra === i ? era.color : '' }}
          >
            {era.name}
          </button>
        ))}
      </div>
      <div className="mt-4 text-[10px] text-white/70 text-center max-w-sm h-8">
        {eras[activeEra].desc}
      </div>
      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes slide-right { 0% { transform: translateX(-40px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(40px); opacity: 0; } }
        @keyframes pulse-opacity { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
      \`}} />
    </div>
  )
}

export function SimValuePerception({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [func, setFunc] = useState(50)
  const [emo, setEmo] = useState(10)
  const [soc, setSoc] = useState(0)
  const [cost, setCost] = useState(60)

  const benefitTotal = func + emo + soc
  const valueRatio = benefitTotal / (cost || 1)
  const isSale = valueRatio >= 1.0

  useEffect(() => {
    if(addLog) {
      if(isSale) addLog(\`Transação liberada. Razão de Valor: \${valueRatio.toFixed(2)}\`)
      else addLog(\`Transação retida. Custo excede percepção de benefício.\`)
    }
  }, [isSale])

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden font-mono p-4">
      {/* HUD Header */}
      <div className="absolute top-4 right-4 text-[9px] text-white/50 text-right">
        BALANÇA TERMODINÂMICA DE VALOR
      </div>

      <div className="w-full max-w-2xl flex items-center gap-8">
        {/* Sliders de Benefício */}
        <div className="w-1/3 flex flex-col gap-4 z-20">
           <div className="text-[10px] text-[#00ffd0] tracking-widest border-b border-[#00ffd0]/30 pb-1">BENEFÍCIO PERCEBIDO</div>
           <div>
             <div className="flex justify-between text-[9px] mb-1"><span>Funcional (O que faz)</span> <span>{func}</span></div>
             <input type="range" min="0" max="100" value={func} onChange={e=>setFunc(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
           </div>
           <div>
             <div className="flex justify-between text-[9px] mb-1"><span>Emocional (Como me sinto)</span> <span>{emo}</span></div>
             <input type="range" min="0" max="100" value={emo} onChange={e=>setEmo(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
           </div>
           <div>
             <div className="flex justify-between text-[9px] mb-1"><span>Social (O que diz sobre mim)</span> <span>{soc}</span></div>
             <input type="range" min="0" max="100" value={soc} onChange={e=>setSoc(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
           </div>
        </div>

        {/* Balança Visual */}
        <div className="flex-1 relative h-64 flex flex-col items-center justify-center">
           {/* Eixo central */}
           <div className="absolute bottom-10 w-2 h-20 bg-white/20 rounded-t-full" />
           
           {/* Haste da balança */}
           <div className="absolute bottom-30 w-48 h-1 bg-white/40 transition-transform duration-500 ease-out origin-center"
                style={{ transform: \`rotate(\${(cost - benefitTotal) * 0.15}deg)\` }}>
              
              {/* Prato Esquerdo (Benefício) */}
              <div className="absolute left-0 -translate-x-1/2 top-0 flex flex-col items-center">
                 <div className="w-[1px] h-10 bg-white/30" />
                 <div className="w-12 h-2 bg-[#00ffd0]/50 rounded-full shadow-[0_0_15px_#00ffd0]" />
                 <div className="mt-2 text-[10px] text-[#00ffd0] font-bold">{benefitTotal}</div>
              </div>

              {/* Prato Direito (Custo) */}
              <div className="absolute right-0 translate-x-1/2 top-0 flex flex-col items-center">
                 <div className="w-[1px] h-10 bg-white/30" />
                 <div className="w-12 h-2 bg-[#ff0055]/50 rounded-full shadow-[0_0_15px_#ff0055]" />
                 <div className="mt-2 text-[10px] text-[#ff0055] font-bold">{cost}</div>
              </div>
           </div>

           {/* Status Central */}
           <div className="absolute top-0 text-center">
              <div className={\`text-[14px] font-bold tracking-widest \${isSale ? 'text-[#00ffd0]' : 'text-[#ff0055]'}\`}>
                {isSale ? 'VENDA REALIZADA' : 'VENDA REJEITADA'}
              </div>
              <div className="text-[9px] text-white/50 mt-1">Valor = Benefícios ÷ Custos</div>
           </div>
        </div>

        {/* Slider de Custo */}
        <div className="w-1/3 flex flex-col gap-4 z-20">
           <div className="text-[10px] text-[#ff0055] tracking-widest border-b border-[#ff0055]/30 pb-1 text-right">CUSTO PERCEBIDO</div>
           <div>
             <div className="flex justify-between text-[9px] mb-1"><span>Preço / Tempo / Risco</span> <span>{cost}</span></div>
             <input type="range" min="10" max="200" value={cost} onChange={e=>setCost(Number(e.target.value))} className="w-full accent-[#ff0055]" dir="rtl" />
           </div>
           
           <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded text-[8px] text-white/60">
             <div className="text-white font-bold mb-1">CASE: Havaianas (R$ 15 vs R$ 350)</div>
             A mesma borracha funcional. O que eleva o preço em 23x é a injeção maciça de <strong>Valor Social</strong> e <strong>Emocional</strong>. Ajuste os sliders para simular.
           </div>
        </div>
      </div>
    </div>
  )
}

export function SimNeedsDesiresDemand({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activeLayer, setActiveLayer] = useState(0) // 0: Necessidade, 1: Desejo, 2: Demanda

  useEffect(() => {
    if(addLog) {
      if(activeLayer === 0) addLog("Acessando camada basal (Carência Fisiológica/Segurança).")
      if(activeLayer === 1) addLog("Acessando camada cultural (Formatação de Desejo).")
      if(activeLayer === 2) addLog("Acessando camada de conversão (Poder de Compra).")
    }
  }, [activeLayer])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden font-mono p-4">
       <div className="absolute top-4 left-4 text-[9px] text-white/50">
        MODELO CONCÊNTRICO DE CONVERSÃO
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center perspective-[1000px] mt-4" style={{ transform: 'rotateX(40deg)' }}>
        
        {/* Layer 3: Demanda (Outer) */}
        <div onClick={() => setActiveLayer(2)} className={\`absolute w-64 h-64 rounded-full border-2 transition-all cursor-pointer \${activeLayer >= 2 ? 'border-[#00ffd0] shadow-[inset_0_0_20px_rgba(0,255,208,0.2)]' : 'border-white/10 hover:border-white/30'}\`} />
        
        {/* Layer 2: Desejo (Middle) */}
        <div onClick={() => setActiveLayer(1)} className={\`absolute w-40 h-40 rounded-full border-2 transition-all cursor-pointer \${activeLayer >= 1 ? 'border-[#d4b87a] shadow-[inset_0_0_20px_rgba(212,184,122,0.2)]' : 'border-white/20 hover:border-white/40'}\`} />

        {/* Layer 1: Necessidade (Core) */}
        <div onClick={() => setActiveLayer(0)} className={\`absolute w-16 h-16 rounded-full border-2 transition-all cursor-pointer \${activeLayer >= 0 ? 'border-[#ff0055] bg-[#ff0055]/20 shadow-[0_0_30px_#ff0055]' : 'border-white/40 hover:border-white/60'}\`} />

        {/* Connection Ray (only when Demanda is reached) */}
        {activeLayer === 2 && (
          <div className="absolute w-[2px] h-32 bg-white/80 origin-bottom animate-ping" style={{ transform: 'rotate(45deg) translateY(-32px)' }} />
        )}
      </div>

      <div className="mt-8 flex gap-4 w-full max-w-lg z-20">
        <div className={\`flex-1 p-3 rounded border transition-all \${activeLayer >= 0 ? 'border-[#ff0055]/50 bg-[#ff0055]/10' : 'border-white/10 opacity-30'}\`}>
          <div className="text-[10px] text-[#ff0055] font-bold mb-1">1. NECESSIDADE</div>
          <div className="text-[8px] text-white/70">Fome, segurança, pertencimento. É universal e inata. O marketing não cria.</div>
        </div>
        <div className={\`flex-1 p-3 rounded border transition-all \${activeLayer >= 1 ? 'border-[#d4b87a]/50 bg-[#d4b87a]/10' : 'border-white/10 opacity-30'}\`}>
          <div className="text-[10px] text-[#d4b87a] font-bold mb-1">2. DESEJO</div>
          <div className="text-[8px] text-white/70">A forma cultural que a necessidade assume. Ex: Necessidade de status = Desejo de um Rolex.</div>
        </div>
        <div className={\`flex-1 p-3 rounded border transition-all \${activeLayer >= 2 ? 'border-[#00ffd0]/50 bg-[#00ffd0]/10' : 'border-white/10 opacity-30'}\`}>
          <div className="text-[10px] text-[#00ffd0] font-bold mb-1">3. DEMANDA</div>
          <div className="text-[8px] text-white/70">Desejo + Poder de Compra. É aqui que a transação ocorre. Desejo sem dinheiro é só frustração.</div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-white/40">
        Clique nos anéis (de dentro para fora) para evoluir a necessidade até a transação.
      </div>
    </div>
  )
}
`

if (!content.includes('SimMarketEras')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended M3-S1 simulations!')
} else {
  console.log('Already appended.')
}