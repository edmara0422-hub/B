import fs from 'fs'

const file = 'components/business-syllabus/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M4-S3 (Análise Estatística): 4 SIMULAÇÕES 6D NASA-LEVEL
// ============================================================================

export function SimStatisticalFoundations({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [dispersion, setDispersion] = useState(15) // Desvio padrão

  useEffect(() => {
    if(addLog) {
      if(dispersion < 10) addLog("Alta precisão detectada. Dados concentrados perto da média.")
      else if(dispersion > 25) addLog("Alta variância. O processo está instável e imprevisível.")
    }
  }, [dispersion])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">CURVA DE GAUSS E DISPERSÃO (68-95-99.7)</div>

      <div className="relative w-80 h-48 border-b border-white/20 flex items-end justify-center mb-8">
         <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
           {/* Bell Curve */}
           <path 
             d={\`M 0 192 \` + Array.from({length: 100}).map((_, i) => {
               const x = (i/100) * 320
               // Gaussian function: a * e^(-(x-b)^2 / (2*c^2))
               // a = height (150), b = mean (160), c = dispersion (15 to 40)
               const mean = 160
               const height = 150 * (15/dispersion) // Scale height based on width to conserve area
               const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(dispersion*2, 2))
               const y = 192 - (height * Math.exp(exponent))
               return \`L \${x} \${Math.max(0, y)}\`
             }).join(' ') + \` L 320 192 Z\`}
             fill="rgba(0,255,208,0.2)" stroke="#00ffd0" strokeWidth="2"
           />

           {/* Mean Line */}
           <line x1="160" y1="20" x2="160" y2="192" stroke="#ffffff" strokeDasharray="4 4" />
           <text x="160" y="15" fill="#ffffff" fontSize="8" textAnchor="middle">MÉDIA</text>

           {/* 1 Standard Deviation */}
           <line x1={160 - (dispersion*2)} y1="40" x2={160 - (dispersion*2)} y2="192" stroke="rgba(255,0,85,0.8)" strokeDasharray="2 2" />
           <line x1={160 + (dispersion*2)} y1="40" x2={160 + (dispersion*2)} y2="192" stroke="rgba(255,0,85,0.8)" strokeDasharray="2 2" />
           <path d={\`M \${160 - (dispersion*2)} 60 Q 160 50 \${160 + (dispersion*2)} 60\`} fill="none" stroke="rgba(255,0,85,0.5)" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
           <text x="160" y="55" fill="#ff0055" fontSize="8" textAnchor="middle">68% DOS DADOS (1σ)</text>
         </svg>
         
         <div className="absolute -bottom-8 w-full flex justify-between px-4 text-[8px] text-white/50">
            <span>Anomalia (-)</span>
            <span>Comportamento Esperado</span>
            <span>Anomalia (+)</span>
         </div>
      </div>

      <div className="w-full max-w-sm px-4 z-20">
         <div className="flex justify-between text-[10px] mb-2 font-bold text-[#00ffd0]">
            <span>Consistência (Desvio Padrão)</span>
            <span>σ = {dispersion.toFixed(1)}</span>
         </div>
         <input type="range" min="8" max="40" value={dispersion} onChange={(e)=>setDispersion(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
      </div>

      <div className="mt-8 text-center text-[9px] text-white/50 max-w-md">
        O <strong>Desvio Padrão</strong> mede a consistência. Se a curva for muito larga (alto desvio), o negócio é imprevisível. Em uma distribuição normal, resultados além de 2 ou 3 desvios padrão são estatisticamente anômalos.
      </div>
    </div>
  )
}

export function SimHypothesisTesting({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [sampleSize, setSampleSize] = useState(100) // 100 a 10000
  const [running, setRunning] = useState(false)
  
  const [convA, setConvA] = useState(0)
  const [convB, setConvB] = useState(0)

  // A converte ~4.0%, B converte ~5.5% (B é melhor)
  const runTest = () => {
    setRunning(true)
    let a = 0; let b = 0
    // Simulando binomial
    for(let i=0; i<sampleSize/2; i++) { if(Math.random() < 0.04) a++ }
    for(let i=0; i<sampleSize/2; i++) { if(Math.random() < 0.055) b++ }
    
    setTimeout(() => {
      setConvA(a)
      setConvB(b)
      setRunning(false)
      if(addLog) {
        if(sampleSize > 2000) addLog(\`Teste A/B concluído. Diferença estatisticamente significativa (p < 0.05).\`)
        else addLog(\`Teste A/B inconclusivo. Amostra muito pequena para garantir significância estatística.\`)
      }
    }, 1500)
  }

  // Calculo simplificado de significância
  const rateA = sampleSize > 0 ? convA / (sampleSize/2) : 0
  const rateB = sampleSize > 0 ? convB / (sampleSize/2) : 0
  const diff = rateB - rateA
  const significant = sampleSize > 2000 && diff > 0

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden p-6">
      <div className="absolute top-4 right-4 text-[9px] text-[#ff0055]">MÉTODO CIENTÍFICO: TESTE A/B E P-VALOR</div>

      <div className="flex w-full max-w-lg gap-8 mb-8 relative">
         {/* Variante A */}
         <div className="flex-1 border border-white/20 bg-white/5 rounded p-4 flex flex-col items-center relative overflow-hidden">
            {running && <div className="absolute inset-0 bg-[#00ffd0]/10 animate-pulse" />}
            <div className="text-[14px] font-bold text-white mb-4">VERSÃO A (Controle)</div>
            <div className="text-[24px] font-black text-white/50 mb-2">{convA}</div>
            <div className="text-[10px] text-[#00ffd0]">Conversões</div>
            <div className="text-[10px] text-white/50 mt-2">Taxa: {(rateA*100).toFixed(1)}%</div>
         </div>

         {/* Variante B */}
         <div className="flex-1 border border-[#ff0055]/50 bg-[#ff0055]/10 rounded p-4 flex flex-col items-center relative overflow-hidden">
            {running && <div className="absolute inset-0 bg-[#ff0055]/20 animate-pulse" />}
            <div className="text-[14px] font-bold text-[#ff0055] mb-4">VERSÃO B (Teste)</div>
            <div className="text-[24px] font-black text-[#ff0055] mb-2">{convB}</div>
            <div className="text-[10px] text-[#ff0055]">Conversões</div>
            <div className="text-[10px] text-white/50 mt-2">Taxa: {(rateB*100).toFixed(1)}%</div>
         </div>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center z-20">
         <div className="flex justify-between w-full text-[10px] text-white/70 mb-2">
            <span>Tamanho da Amostra (Tráfego):</span>
            <span className="font-bold">{sampleSize} visitantes</span>
         </div>
         <input type="range" min="100" max="10000" step="100" value={sampleSize} onChange={(e)=>setSampleSize(Number(e.target.value))} className="w-full accent-[#ff0055] mb-4" />
         
         <button onClick={runTest} disabled={running} 
                 className={\`px-6 py-2 border font-bold text-[10px] tracking-widest \${running ? 'border-white/20 text-white/20' : 'border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055]/20'}\`}>
           {running ? 'TESTANDO...' : 'RODAR TESTE A/B'}
         </button>
      </div>

      <div className="mt-8 h-12 flex items-center justify-center">
         {convA > 0 && (
           significant 
             ? <div className="text-[#00ffd0] text-[10px] font-bold px-4 py-2 bg-[#00ffd0]/10 border border-[#00ffd0]">p-valor &lt; 0.05: SIGNIFICÂNCIA ESTATÍSTICA ALCANÇADA. A versão B é vencedora.</div>
             : <div className="text-[#ff7700] text-[10px] font-bold px-4 py-2 bg-[#ff7700]/10 border border-[#ff7700]">p-valor &gt; 0.05: INCONCLUSIVO. A diferença pode ser apenas sorte (acaso). Aumente a amostra.</div>
         )}
      </div>
    </div>
  )
}

export function SimCohortStorytelling({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [hovered, setHovered] = useState<number | null>(null)

  // Matriz de Retenção (Cohort)
  const cohort = [
    [100, 80, 75, 70, 65, 60], // Jan
    [100, 82, 76, 72, 68, 0],  // Fev
    [100, 79, 45, 40, 0, 0],   // Março (Buraco detectado!)
    [100, 85, 80, 0, 0, 0],    // Abr
    [100, 88, 0, 0, 0, 0],     // Mai
    [100, 0, 0, 0, 0, 0]       // Jun
  ]

  useEffect(() => {
    if(addLog) addLog("A matriz Cohort isola o comportamento temporal de clientes adquiridos no mesmo período.")
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#d4b87a]">ANÁLISE DE COHORT: RETENÇÃO</div>

      <div className="flex gap-4">
        {/* Gráfico de Matriz de Calor */}
        <div className="grid grid-cols-7 gap-1 bg-white/5 p-4 rounded border border-white/10">
          <div className="text-[8px] font-bold text-white/50 flex items-center justify-center">Safra</div>
          {[0,1,2,3,4,5].map(m => <div key={m} className="text-[8px] font-bold text-white/50 text-center">Mês {m}</div>)}
          
          {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'].map((month, r) => (
            <React.Fragment key={month}>
              <div className="text-[10px] text-white flex items-center justify-end pr-2">{month}</div>
              {cohort[r].map((val, c) => {
                if (val === 0) return <div key={c} className="w-10 h-8 bg-black border border-white/5" />
                
                // Color scale based on value (100 = green, 40 = red)
                const isHole = val === 45 || val === 40
                const color = isHole ? '#ff0055' : val > 75 ? '#00ffd0' : '#ff7700'
                const opacity = isHole ? 0.8 : (val/100) * 0.5
                
                return (
                  <div key={c} 
                       onMouseEnter={() => setHovered(isHole ? 1 : null)}
                       onMouseLeave={() => setHovered(null)}
                       className={\`w-10 h-8 flex items-center justify-center text-[8px] font-bold cursor-help transition-all \${isHole ? 'animate-pulse' : ''}\`}
                       style={{ backgroundColor: \`\${color}\${Math.floor(opacity*255).toString(16).padStart(2,'0')}\`, color: val > 60 ? 'black' : 'white' }}>
                    {val}%
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Data Storytelling Panel */}
        <div className="w-64 border border-white/10 bg-white/5 p-4 text-[10px]">
           <div className="text-[#d4b87a] font-bold mb-2">DATA STORYTELLING</div>
           <div className="mb-4 text-white/60">
             Sem cohort, a média geral de cancelamento esconde os problemas estruturais.
           </div>
           
           <div className={\`p-2 border transition-all \${hovered === 1 ? 'border-[#ff0055] bg-[#ff0055]/10' : 'border-transparent'}\`}>
             <div className={\`font-bold \${hovered === 1 ? 'text-[#ff0055]' : 'text-white/30'}\`}>⚠️ INSIGHT REVELADO</div>
             <div className={\`mt-1 \${hovered === 1 ? 'text-white' : 'text-white/30'}\`}>
               Passe o mouse na zona vermelha de Março.<br/><br/>
               "Os clientes de Março sofreram uma queda abrupta de retenção no Mês 2 (de 79% para 45%). A culpa não é do produto geral, mas de um bug específico no Onboarding lançado em Março."
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export function SimMachineLearningPredictive({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [running, setRunning] = useState(false)
  const [clusters, setClusters] = useState<{x:number, y:number, type:string}[]>([])

  const runClustering = () => {
    setRunning(true)
    if(addLog) addLog("Executando K-Means Clustering no Data Lake...")
    
    // Gerar pontos aleatórios
    const pts = Array.from({length: 80}).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: 'unknown'
    }))
    setClusters(pts)

    setTimeout(() => {
      // Classificar baseado na posição (X=frequência, Y=reclamações)
      const classified = pts.map(p => {
        if(p.x < 30 && p.y > 60) return { ...p, type: 'churn_risk' } // Baixa freq, alta reclamação
        if(p.x > 70 && p.y < 40) return { ...p, type: 'loyal' } // Alta freq, baixa reclamação
        return { ...p, type: 'average' }
      })
      setClusters(classified)
      setRunning(false)
      if(addLog) addLog("Classificação Preditiva concluída. Clientes em risco de churn isolados na área vermelha.")
    }, 2000)
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#a855f7]">MACHINE LEARNING E PREDITIVA</div>

      <div className="flex gap-8 items-center mb-6">
        <div className="relative w-64 h-64 border border-white/20 bg-white/5 rounded">
          {/* Gráfico de Dispersão */}
          {clusters.map((p, i) => (
             <div key={i} className="absolute w-2 h-2 rounded-full transition-colors duration-1000"
                  style={{ 
                    left: \`\${p.x}%\`, bottom: \`\${p.y}%\`,
                    backgroundColor: p.type === 'unknown' ? '#ffffff50' : 
                                     p.type === 'churn_risk' ? '#ff0055' : 
                                     p.type === 'loyal' ? '#00ffd0' : '#a855f750',
                    boxShadow: p.type === 'churn_risk' ? '0 0 10px #ff0055' : 'none'
                  }} />
          ))}

          {/* Eixos */}
          <div className="absolute -bottom-6 w-full text-center text-[8px] text-white/50">Frequência de Uso</div>
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] text-white/50">Reclamações</div>
          
          {/* Zonas de Destaque (aparecem após rodar) */}
          {!running && clusters.length > 0 && (
             <>
               <div className="absolute top-0 left-0 w-[30%] h-[40%] bg-[#ff0055]/10 border border-[#ff0055]/50 flex items-start p-1 text-[8px] text-[#ff0055] font-bold">ALTO RISCO DE CHURN</div>
               <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-[#00ffd0]/10 border border-[#00ffd0]/50 flex items-end p-1 justify-end text-[8px] text-[#00ffd0] font-bold">ALTA RETENÇÃO</div>
             </>
          )}
        </div>

        <div className="flex flex-col gap-4">
           <button onClick={runClustering} disabled={running} 
                   className="px-4 py-3 border border-[#a855f7] text-[#a855f7] text-[10px] font-bold tracking-widest hover:bg-[#a855f7]/20 flex items-center gap-2">
             <Radar size={14} className={running ? "animate-spin" : ""} />
             {running ? 'TREINANDO MODELO...' : 'EXECUTAR CLUSTERING ML'}
           </button>
           
           {!running && clusters.length > 0 && (
             <div className="border border-[#ff0055] bg-[#ff0055]/10 p-4 text-[10px] w-48">
                <div className="text-[#ff0055] font-bold mb-2">AÇÃO RECOMENDADA</div>
                <div className="text-white/80">O algoritmo identificou {clusters.filter(c=>c.type==='churn_risk').length} usuários com padrão pré-cancelamento. Disparar e-mail de desconto personalizado agora (Ex: Spotify).</div>
             </div>
           )}
        </div>
      </div>

      <div className="text-center text-[9px] text-white/50 max-w-lg px-4">
        Machine Learning encontra padrões que humanos não veem. A Classificação prediz o cancelamento (Churn) <strong>antes</strong> que ele aconteça, permitindo que a empresa aja preventivamente em vez de reativamente.
      </div>
    </div>
  )
}
`

if (!content.includes('SimStatisticalFoundations')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended M4-S3 Estatistica simulations!')
} else {
  console.log('Already appended.')
}