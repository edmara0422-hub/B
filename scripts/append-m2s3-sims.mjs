import fs from 'fs'

const file = 'components/business-syllabus/simulations-6d.tsx'
let content = fs.readFileSync(file, 'utf8')

const newSims = `

// ============================================================================
// M2-S3: MATEMÁTICA FINANCEIRA (4 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimTimeDilator({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [years, setYears] = useState(5)
  
  useEffect(() => {
    if(addLog) addLog(\`Malha temporal ajustada para Horizonte de \${years} anos\`)
  }, [years])

  // Simple: J = C * i * t -> M = C(1 + it)
  // Compound: M = C(1+i)^t
  // Assuming C=1000, i=10%
  const data = Array.from({length: years + 1}).map((_, i) => ({
    x: i,
    simples: 1000 * (1 + 0.10 * i),
    composto: 1000 * Math.pow(1.10, i)
  }))

  const maxVal = 1000 * Math.pow(1.10, 30)

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden font-mono text-white/80 p-6">
      <div className="absolute top-4 left-4 text-[10px] tracking-widest text-[#00ffd0]">
        MOTOR DE DILATAÇÃO TEMPORAL [CAPITAL: 1K | TAXA: 10%]
      </div>

      <div className="w-full max-w-md h-48 relative border-b border-l border-white/20 mt-8">
        <svg className="absolute inset-0 w-full h-full" viewBox={\`0 0 \${Math.max(years, 1)} \${maxVal}\`} preserveAspectRatio="none">
          {/* Malha de fundo que se curva */}
          {Array.from({length: 10}).map((_,i) => (
             <path key={i} d={\`M 0 \${maxVal - (maxVal/10)*i} Q \${years/2} \${maxVal - (maxVal/10)*i - (years*years*i)} \${years} \${maxVal - (maxVal/10)*i}\`} fill="none" stroke="rgba(255,255,255,0.02)" />
          ))}
          
          <polyline 
            points={data.map(d => \`\${d.x},\${maxVal - d.simples}\`).join(' ')}
            fill="none" stroke="#cbd5e1" strokeWidth="0.05" strokeDasharray="0.1,0.1" 
          />
          <polyline 
            points={data.map(d => \`\${d.x},\${maxVal - d.composto}\`).join(' ')}
            fill="none" stroke="#d4b87a" strokeWidth="0.1"
            style={{ filter: 'drop-shadow(0 0 4px #d4b87a)' }}
          />
        </svg>

        {/* Eixo X - Anos */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[8px] text-white/40">
           <span>Ano 0</span>
           <span>Ano {years}</span>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-2 w-full max-w-md">
        <div className="flex justify-between w-full text-[9px]">
           <span>Dilatação T (Anos)</span>
           <span>{years} a</span>
        </div>
        <input 
          type="range" min="1" max="30" value={years} 
          onChange={e => setYears(Number(e.target.value))}
          className="w-full accent-[#d4b87a]"
        />
        <div className="flex justify-between w-full text-[9px] mt-2 border border-white/10 p-2 rounded bg-white/5">
          <div>LINEAR (Simples): <span className="text-[#cbd5e1] font-bold">R$ {data[years].simples.toFixed(0)}</span></div>
          <div>EXPONENCIAL (Composto): <span className="text-[#d4b87a] font-bold">R$ {data[years].composto.toFixed(0)}</span></div>
        </div>
      </div>
    </div>
  )
}

export function SimCompoundGravity({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [rate, setRate] = useState(12)
  const [active, setActive] = useState(false)

  const rule72 = (72 / rate).toFixed(1)

  useEffect(() => {
    if(active && addLog) addLog(\`Anomalia gravitacional dobrando massa em \${rule72} anos (Regra dos 72)\`)
  }, [active, rule72])

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden perspective-[800px]">
      
      {/* Central Mass */}
      <div className="absolute w-12 h-12 bg-[#d4b87a] rounded-full shadow-[0_0_50px_#d4b87a] flex items-center justify-center z-10">
        <div className="w-8 h-8 bg-black/40 rounded-full animate-pulse" />
      </div>

      {/* Orbit Rings representing years */}
      {Array.from({length: 6}).map((_, i) => {
        const radius = 80 + (i * 30 * (rate / 5))
        return (
          <div key={i} className="absolute rounded-full border border-white/10" 
               style={{ width: radius*2, height: radius*2, transform: 'rotateX(70deg)' }} />
        )
      })}

      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
         <div className="text-[10px] text-white/60 tracking-widest">FORÇA DA GRAVIDADE COMPOSTA</div>
         <div className="flex items-center gap-2">
            <span className="text-[8px]">TAXA (%)</span>
            <input type="range" min="1" max="30" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-24 accent-[#d4b87a]"/>
            <span className="text-[10px] font-bold">{rate}%</span>
         </div>
         <button onClick={() => setActive(true)} className="mt-2 px-3 py-1 border border-[#00ffd0]/40 text-[#00ffd0] text-[9px] hover:bg-[#00ffd0]/10 rounded uppercase">
            Ativar Regra dos 72
         </button>
      </div>

      {active && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-20">
           <div className="text-[12px] text-[#00ffd0] tracking-widest animate-pulse">
              MASSA DOBRADA DETECTADA
           </div>
           <div className="text-[20px] font-bold text-white mt-1">
              T = {rule72} anos
           </div>
        </div>
      )}

    </div>
  )
}

export function SimVPLSpectrometer({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [wacc, setWacc] = useState(10)
  const [fc, setFc] = useState([200, 300, 500])
  const invest = 700

  // Calcula VPL
  const vpl = fc.reduce((acc, val, t) => acc + (val / Math.pow(1 + wacc/100, t + 1)), 0) - invest
  const isViable = vpl > 0

  useEffect(() => {
    if(addLog) addLog(\`Espectrômetro VPL realinhado. Desvio: R$ \${vpl.toFixed(2)}\`)
  }, [vpl])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden font-mono p-4">
      <div className="absolute top-4 right-4 text-[9px] text-right text-white/50">
        ESPECTRÔMETRO VPL/TIR
      </div>

      {/* Laser Simulation Area */}
      <div className="relative w-full max-w-lg h-64 flex items-center mt-4 border border-white/5 bg-white/[0.02] rounded-lg">
         {/* Prisma WACC */}
         <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-8 h-32 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="text-[10px] -rotate-90">WACC {wacc}%</span>
         </div>

         {/* Feixes de Fluxo de Caixa (FC) */}
         <div className="absolute left-0 top-0 bottom-0 w-1/3 flex flex-col justify-around py-4">
            {fc.map((val, i) => (
              <div key={i} className="flex items-center gap-2 px-2">
                 <span className="text-[8px] text-white/40">Ano {i+1}</span>
                 <div className="h-[1px] bg-[#d4b87a] flex-1 relative" style={{ opacity: val/500 }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#d4b87a] rounded-full blur-sm animate-pulse" />
                 </div>
              </div>
            ))}
         </div>

         {/* Feixe Resultante (VPL) */}
         <div className="absolute left-1/3 right-0 top-1/2 -translate-y-1/2 h-16 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
               <path d="M 0 32 Q 50 32 100 32 T 250 32" fill="none" stroke={isViable ? '#00ffd0' : '#ff0055'} strokeWidth={Math.abs(vpl)/50} className="opacity-60" style={{ filter: \`drop-shadow(0 0 8px \${isViable ? '#00ffd0' : '#ff0055'})\` }}/>
            </svg>
            <div className={\`z-10 px-4 py-2 rounded border backdrop-blur-lg \${isViable ? 'border-[#00ffd0]/50 bg-[#00ffd0]/10 text-[#00ffd0]' : 'border-[#ff0055]/50 bg-[#ff0055]/10 text-[#ff0055]'}\`}>
               VPL: {vpl > 0 ? '+' : ''}R$ {vpl.toFixed(2)}
            </div>
         </div>
      </div>

      <div className="w-full max-w-lg mt-6 flex justify-between gap-4">
         <div className="flex-1 flex flex-col gap-1">
            <span className="text-[8px]">TAXA DE DESCONTO (WACC)</span>
            <input type="range" min="1" max="30" value={wacc} onChange={e=>setWacc(Number(e.target.value))} className="accent-[#d4b87a]" />
         </div>
         <div className="flex-1 border-l border-white/10 pl-4">
            <span className="text-[8px] block mb-1">INVESTIMENTO INICIAL: R$ 700</span>
            <div className="text-[10px] text-white/60">
              {isViable ? 'PROJETO GERA VALOR' : 'PROJETO DESTRÓI VALOR'}
            </div>
         </div>
      </div>
    </div>
  )
}

export function SimCorporateGyroscope({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [roi, setRoi] = useState(25)
  const [liq, setLiq] = useState(1.5)
  const [debt, setDebt] = useState(50)

  const isHealthy = roi > 10 && liq >= 1.0 && debt < 70
  const isDanger = debt > 90 || liq < 0.8

  useEffect(() => {
    if(addLog) {
      if(isDanger) addLog(\`ALERTA CRÍTICO: Integridade do giroscópio corporativo comprometida!\`)
      else if(!isHealthy) addLog(\`Aviso: Desestabilização térmica detectada.\`)
    }
  }, [roi, liq, debt])

  // Velocidade e rotação dependem da saúde
  const animDuration = isHealthy ? '10s' : isDanger ? '1s' : '3s'
  const wobble = isDanger ? 'rotateX(45deg) rotateY(45deg)' : 'rotateX(0deg) rotateY(0deg)'
  const color = isDanger ? '#ff0055' : isHealthy ? '#00ffd0' : '#d4b87a'

  return (
    <div className="relative w-full h-full flex bg-black overflow-hidden font-mono text-white p-6">
      <div className="w-1/2 flex flex-col justify-center gap-6 z-20">
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span>ROI (Eficiência)</span> <span>{roi}%</span>
          </div>
          <input type="range" min="-20" max="100" value={roi} onChange={e=>setRoi(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span>LIQUIDEZ (Oxigênio)</span> <span>{liq.toFixed(2)}</span>
          </div>
          <input type="range" min="0" max="3" step="0.1" value={liq} onChange={e=>setLiq(Number(e.target.value))} className="w-full accent-[#00ffd0]" />
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span>ENDIVIDAMENTO (Gravidade)</span> <span>{debt}%</span>
          </div>
          <input type="range" min="0" max="120" value={debt} onChange={e=>setDebt(Number(e.target.value))} className="w-full accent-[#ff0055]" />
        </div>
      </div>

      <div className="w-1/2 relative perspective-[1000px] flex items-center justify-center">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
         
         <div className="w-48 h-48 relative transform-style-3d transition-all duration-1000" style={{ transform: wobble }}>
            {/* Eixos do Giroscópio */}
            <div className="absolute inset-0 rounded-full border-2" 
                 style={{ borderColor: color, animation: \`spin-slow \${animDuration} linear infinite\`, opacity: 0.6 }} />
            <div className="absolute inset-0 rounded-full border-2" 
                 style={{ borderColor: color, animation: \`spin-slow \${animDuration} linear infinite reverse\`, transform: 'rotateX(60deg)', opacity: 0.4 }} />
            <div className="absolute inset-0 rounded-full border-2" 
                 style={{ borderColor: color, animation: \`spin-slow \${animDuration} linear infinite\`, transform: 'rotateY(60deg)', opacity: 0.4 }} />
            
            {/* Núcleo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-[0_0_40px_currentColor] flex items-center justify-center" style={{ color: color, backgroundColor: color }}>
              {isDanger && <div className="w-full h-full rounded-full bg-white animate-ping opacity-50" />}
            </div>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .transform-style-3d { transform-style: preserve-3d; }
      \`}} />
    </div>
  )
}
`

if (!content.includes('SimTimeDilator')) {
  fs.writeFileSync(file, content + newSims)
  console.log('Appended new simulations!')
} else {
  console.log('Already appended.')
}