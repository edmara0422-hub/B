import fs from 'fs'

const file = 'components/business-syllabus/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M4-S2 (Cálculo): 3 SIMULAÇÕES 6D NASA-LEVEL
// ============================================================================

export function SimCalculusOptimization({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [price, setPrice] = useState(50) // 0 a 100
  const [elasticity, setElasticity] = useState(1.5) // 0.5 (inelástico) a 2.5 (elástico)

  // Lucro = (Preço - Custo) * Demanda
  // Demanda base = 1000 - (Price * Elasticidade * 10)
  const cost = 20
  const demand = Math.max(0, 1000 - (price * elasticity * 8))
  const profit = (price - cost) * demand

  // Encontrar o preço ótimo matematicamente:
  // dL/dP = 0 => P_opt = (1000 + 8 * E * Cost) / (16 * E)
  const optimalPrice = (1000 + 8 * elasticity * cost) / (16 * elasticity)

  useEffect(() => {
    if(addLog) {
      if(Math.abs(price - optimalPrice) < 2) {
        addLog("Ponto de otimização atingido: Receita Marginal = Custo Marginal.")
      }
    }
  }, [price, optimalPrice])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">OTIMIZAÇÃO VIA DERIVADAS (RM = CM)</div>

      <div className="relative w-72 h-48 border-b border-l border-white/20 mb-8 flex items-end">
         {/* Eixo Y: Lucro, Eixo X: Preço */}
         <svg className="absolute inset-0 w-full h-full overflow-visible">
            {/* Desenhar a curva da parábola de lucro */}
            <path 
              d={\`M 0 \${192} \` + Array.from({length: 20}).map((_, i) => {
                const p = i * 5
                const d = Math.max(0, 1000 - (p * elasticity * 8))
                const l = (p - cost) * d
                const y = Math.max(0, 192 - (l / 80)) // Scale factor
                const x = (p / 100) * 288
                return \`L \${x} \${y}\`
              }).join(' ')}
              fill="none" stroke="rgba(0,255,208,0.5)" strokeWidth="2"
            />
            
            {/* Ponto Ótimo (Pico da Parábola) */}
            <circle cx={(optimalPrice/100)*288} cy={192 - (((optimalPrice - cost) * Math.max(0, 1000 - (optimalPrice * elasticity * 8))) / 80)} r="4" fill="#ff0055" className="animate-ping" />
            <line x1={(optimalPrice/100)*288} y1={192} x2={(optimalPrice/100)*288} y2={192 - (((optimalPrice - cost) * Math.max(0, 1000 - (optimalPrice * elasticity * 8))) / 80)} stroke="#ff0055" strokeDasharray="2 2" />
            
            {/* Posicionamento Atual (Derivada) */}
            <circle cx={(price/100)*288} cy={192 - (profit/80)} r="6" fill="#00ffd0" />
            
            {/* Linha Tangente (A Derivada) */}
            {(() => {
               const pX = (price/100)*288
               const pY = 192 - (profit/80)
               // Aproximação simples da derivada no gráfico (inclinação)
               const deltaP = 1
               const nextProfit = (price+deltaP - cost) * Math.max(0, 1000 - ((price+deltaP) * elasticity * 8))
               const nextY = 192 - (nextProfit/80)
               const nextX = ((price+deltaP)/100)*288
               const slope = (nextY - pY) / (nextX - pX)
               return (
                 <line x1={pX - 40} y1={pY - slope*40} x2={pX + 40} y2={pY + slope*40} stroke="#ffffff" strokeWidth="1" />
               )
            })()}
         </svg>

         {/* Legendas Gráfico */}
         <div className="absolute -bottom-4 w-full text-center text-[8px] text-white/50">PREÇO DO PRODUTO</div>
         <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] text-white/50">LUCRO TOTAL</div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4 z-20 bg-black/50 p-2 border border-white/10">
         <div className="flex justify-between text-[10px]">
           <span className="text-white">Preço: <strong className="text-[#00ffd0]">R$ {price.toFixed(2)}</strong></span>
           <span className="text-white">Lucro: <strong className="text-[#00ffd0]">R$ {profit.toFixed(0)}</strong></span>
         </div>
         <input type="range" min="20" max="100" value={price} onChange={(e)=>setPrice(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
         
         <div className="flex justify-between text-[10px] mt-2">
           <span className="text-white/70">Sensibilidade (Elasticidade):</span>
           <span className={elasticity > 1 ? "text-[#ff0055]" : "text-[#a855f7]"}>{elasticity > 1 ? "Elástico (Pizza)" : "Inelástico (Insulina)"}</span>
         </div>
         <input type="range" min="0.5" max="2.5" step="0.1" value={elasticity} onChange={(e)=>setElasticity(Number(e.target.value))} className="w-full accent-white/50" />
      </div>

      <div className="mt-4 text-center text-[9px] text-white/50 max-w-md">
        A <strong>Derivada (linha branca)</strong> mostra a taxa de variação. Quando a derivada é plana (inclinação zero), a Receita Marginal se iguala ao Custo Marginal. É o ponto de lucro máximo (ponto vermelho).
      </div>
    </div>
  )
}

export function SimFinancialIntegrals({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [time, setTime] = useState(5) // Anos
  const rate = 0.12 // 12% a.a
  const aporte = 1000 // por mês

  const meses = time * 12
  const valorFinal = aporte * ((Math.pow(1 + (rate/12), meses) - 1) / (rate/12))
  const valorInvestido = aporte * meses
  const juros = valorFinal - valorInvestido

  useEffect(() => {
    if(addLog && time === 30) addLog("O Efeito Exponencial foi ativado. Integração maciça de juros compostos.")
  }, [time])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#a855f7]">INTEGRAL ACUMULADA: JUROS COMPOSTOS</div>

      <div className="relative w-72 h-48 border-b border-l border-white/20 mb-8 flex items-end justify-start">
         <svg className="absolute inset-0 w-full h-full overflow-visible">
            {/* Área sob a curva (A integral) */}
            <path 
              d={\`M 0 192 \` + Array.from({length: time}).map((_, i) => {
                const x = ((i+1)/30) * 288
                const v = aporte * ((Math.pow(1 + (rate/12), (i+1)*12) - 1) / (rate/12))
                const y = 192 - (v / 15000) // Scale factor for visual
                return \`L \${x} \${Math.max(0, y)}\`
              }).join(' ') + \` L \${(time/30)*288} 192 Z\`}
              fill="rgba(168,85,247,0.2)" stroke="none"
            />
            {/* Curva Exponencial (Juros Compostos) */}
            <path 
              d={\`M 0 192 \` + Array.from({length: time}).map((_, i) => {
                const x = ((i+1)/30) * 288
                const v = aporte * ((Math.pow(1 + (rate/12), (i+1)*12) - 1) / (rate/12))
                const y = 192 - (v / 15000)
                return \`L \${x} \${Math.max(0, y)}\`
              }).join(' ')}
              fill="none" stroke="#a855f7" strokeWidth="3" className="drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
            />
            {/* Linha Linear (Aporte Físico) */}
            <path 
              d={\`M 0 192 \` + Array.from({length: time}).map((_, i) => {
                const x = ((i+1)/30) * 288
                const v = aporte * (i+1)*12
                const y = 192 - (v / 15000)
                return \`L \${x} \${Math.max(0, y)}\`
              }).join(' ')}
              fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4"
            />
         </svg>

         <div className="absolute right-0 bottom-full -mb-4 text-[12px] font-bold text-[#a855f7]">
            R$ {(valorFinal/1000).toFixed(0)}k
         </div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-2 z-20 text-[10px]">
         <div className="flex justify-between text-white/50">
            <span>Aporte: R$ 1.000/mês a 12% a.a</span>
            <span>Anos: <strong className="text-white text-[12px]">{time}</strong></span>
         </div>
         <input type="range" min="1" max="30" value={time} onChange={(e)=>setTime(Number(e.target.value))} className="w-full accent-[#a855f7]" />
         
         <div className="grid grid-cols-2 gap-4 mt-4 text-center">
            <div className="border border-white/20 p-2 bg-white/5">
               <div className="text-white/50 mb-1">Total Investido (Linear)</div>
               <div className="text-white font-bold">R$ {(valorInvestido/1000).toFixed(0)}k</div>
            </div>
            <div className="border border-[#a855f7]/50 p-2 bg-[#a855f7]/10">
               <div className="text-[#a855f7] mb-1">Juros Gerados (Integral)</div>
               <div className="text-[#a855f7] font-bold text-[14px]">R$ {(juros/1000).toFixed(0)}k</div>
            </div>
         </div>
      </div>

      <div className="mt-4 text-center text-[9px] text-white/50 max-w-sm">
        A <strong>Integral</strong> acumula a área sob a curva ao longo do tempo. Nos juros compostos, o tempo eleva o ganho a uma potência. 99% da riqueza vem no último terço do gráfico.
      </div>
    </div>
  )
}

export function SimBreakEvenLeverage({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [volume, setVolume] = useState(500) // Unidades vendidas

  const preco = 50
  const custoFixo = 20000
  const custoVariavel = 20
  
  const margemContribuicao = preco - custoVariavel
  const breakEven = Math.ceil(custoFixo / margemContribuicao)
  
  const receita = volume * preco
  const custoTotal = custoFixo + (volume * custoVariavel)
  const lucro = receita - custoTotal

  useEffect(() => {
    if(addLog) {
      if(volume === breakEven) addLog("PONTO DE EQUILÍBRIO ATINGIDO. O risco operacional foi zerado.")
      else if(volume > breakEven && volume < breakEven + 10) addLog("Entrando em zona de Lucro Puro (Alavancagem Operacional).")
    }
  }, [volume, breakEven])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#ff7700]">PONTO DE EQUILÍBRIO E ALAVANCAGEM</div>

      <div className="flex gap-10 items-end justify-center h-48 mb-12">
         {/* CUSTOS */}
         <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] text-[#ff0055]">CUSTOS TOTAIS</div>
            <div className="relative w-16 border border-white/10 rounded flex flex-col-reverse justify-start overflow-hidden bg-white/5" style={{ height: '160px' }}>
               <div className="w-full bg-[#ff0055]/30 flex items-center justify-center text-[8px]" style={{ height: \`\${(custoFixo/50000)*160}px\` }}>FIXO</div>
               <div className="w-full bg-[#ff0055]/80 transition-all duration-300" style={{ height: \`\${((volume*custoVariavel)/50000)*160}px\` }} />
            </div>
            <div className="text-[12px] font-bold text-white">R$ {(custoTotal/1000).toFixed(1)}k</div>
         </div>

         {/* BALANÇA (VISUAL) */}
         <div className="h-full flex flex-col justify-end pb-8">
            <div className={\`text-[20px] font-bold transition-all duration-500 \${lucro < 0 ? 'text-[#ff0055]' : lucro > 0 ? 'text-[#00ffd0]' : 'text-white'}\`}>
              {lucro < 0 ? '<' : lucro > 0 ? '>' : '='}
            </div>
         </div>

         {/* RECEITA */}
         <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] text-[#00ffd0]">RECEITA TOTAL</div>
            <div className="relative w-16 border border-white/10 rounded flex flex-col-reverse justify-start overflow-hidden bg-white/5" style={{ height: '160px' }}>
               <div className="w-full bg-[#00ffd0]/80 transition-all duration-300 flex items-center justify-center" style={{ height: \`\${(receita/50000)*160}px\` }} />
            </div>
            <div className="text-[12px] font-bold text-white">R$ {(receita/1000).toFixed(1)}k</div>
         </div>
      </div>

      <div className="w-full max-w-sm px-4">
         <div className="flex justify-between text-[10px] mb-2 font-bold">
            <span className="text-white/50">Volume de Vendas: {volume} unid.</span>
            <span className={lucro < 0 ? "text-[#ff0055]" : lucro > 0 ? "text-[#00ffd0]" : "text-white"}>
              Lucro: R$ {lucro.toFixed(0)}
            </span>
         </div>
         <div className="relative w-full h-2 bg-white/10 rounded">
            {/* Marcador do Break-even */}
            <div className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white" style={{ left: \`\${(breakEven/1000)*100}%\` }} />
            <div className="absolute -top-4 text-[8px] text-white/50 -translate-x-1/2" style={{ left: \`\${(breakEven/1000)*100}%\` }}>Break-Even ({breakEven})</div>
            
            {/* Preenchimento atual */}
            <input type="range" min="0" max="1000" value={volume} onChange={(e)=>setVolume(Number(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer z-10" />
            <div className={\`h-full rounded transition-all duration-300 \${volume < breakEven ? 'bg-[#ff0055]' : 'bg-[#00ffd0]'}\`} style={{ width: \`\${(volume/1000)*100}%\` }} />
         </div>
      </div>

      <div className="mt-8 text-center text-[9px] text-white/50 max-w-md">
        O <strong>Ponto de Equilíbrio (Break-Even)</strong> é onde as linhas se cruzam. Antes dele, você opera para pagar o Custo Fixo (Prejuízo). Depois dele, a margem de contribuição vai direto para o bolso (Alavancagem / Lucro).
      </div>
    </div>
  )
}
`

if (!content.includes('SimCalculusOptimization')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended M4-S2 Calculus simulations!')
} else {
  console.log('Already appended.')
}