'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Brain, Server, Rocket, Cpu, ShieldAlert, Database, Hexagon, Network, Zap } from 'lucide-react'

// Common interfaces
interface SimulationProps {
  theme?: {
    primary: string
    secondary: string
    glow: string
    accent: string
  }
  addLog?: (msg: string) => void
}

// ──────────────────────────────────────────────────────────────────────────
// Video Background Component (HUD Style)
// ──────────────────────────────────────────────────────────────────────────
function VideoBg({ ytId }: { ytId: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-40 mix-blend-screen pointer-events-none flex items-center justify-center">
      {/* We scale the iframe up to hide any YouTube titles or black bars */}
      <iframe
        className="absolute w-[250%] h-[250%] max-w-none pointer-events-none"
        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-10 pointer-events-none" />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 1: Simulador de Alinhamento Estratégico (IT-Business)
// ──────────────────────────────────────────────────────────────────────────
export function SimAlignIT({ theme, addLog }: SimulationProps) {
  const [alignment, setAlignment] = useState(50)
  
  return (
    <div className="space-y-6 select-none relative z-10 w-full h-full flex flex-col justify-center">
      <div className="relative w-full h-48 md:h-56 flex flex-col justify-end p-4 rounded-2xl bg-black border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        {/* Video HUD Background */}
        <VideoBg ytId="kwmHaXUAa0M" />
        
        {/* HUD Elements on top */}
        <div className="relative z-20 flex-1 flex items-center justify-center w-full">
           <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
           <motion.div 
             className="absolute h-1 rounded-full shadow-[0_0_15px_#fff]"
             style={{ background: theme?.primary }}
             animate={{ width: `${alignment}%`, opacity: alignment > 80 ? 1 : 0.6 }}
             transition={{ type: 'spring', stiffness: 50 }}
           />

           <motion.div 
             className="absolute w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-black/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
             style={{ left: `calc(${50 - (alignment/2)}% - 32px)` }}
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 3, repeat: Infinity }}
           >
             <Cpu className="text-white/80 h-6 w-6" />
           </motion.div>

           <motion.div 
             className="absolute w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-black/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
             style={{ right: `calc(${50 - (alignment/2)}% - 32px)` }}
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 4, repeat: Infinity }}
           >
             <Activity className="text-white/80 h-6 w-6" />
           </motion.div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-[10px] font-mono text-white/60">
          <span>Isolamento</span>
          <span className="font-bold text-white text-xs">{alignment}% <span style={{ color: theme?.primary }}>Fusão</span></span>
        </div>
        <input 
          type="range" min="10" max="100" value={alignment}
          onChange={e => {
             setAlignment(Number(e.target.value))
             if (addLog) addLog(`Sincronização ajustada para ${e.target.value}%`)
          }}
          className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-white/10"
          style={{ accentColor: theme?.primary }}
        />
        
        <div className="grid grid-cols-2 gap-3">
           <div className="p-3 bg-black/40 rounded-xl border border-white/5 backdrop-blur-md">
             <span className="text-[8px] uppercase tracking-widest text-white/40 block mb-1">Vazão Estratégica</span>
             <span className="text-xl font-mono text-green-400 font-bold drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">{Math.round(alignment * 1.8)} TB/s</span>
           </div>
           <div className="p-3 bg-black/40 rounded-xl border border-white/5 backdrop-blur-md">
             <span className="text-[8px] uppercase tracking-widest text-white/40 block mb-1">Gargalo</span>
             <span className="text-xl font-mono text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">{100 - alignment}%</span>
           </div>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 2: Reator de Domínios de Rogers (Radar 6D)
// ──────────────────────────────────────────────────────────────────────────
export function SimRogersReactor({ theme, addLog }: SimulationProps) {
  const [data, setData] = useState({ dados: 40, inova: 40, cliente: 40, valor: 40 })
  const roi = Math.round((data.dados + data.inova + data.cliente + data.valor) / 4 * 3.5)
  
  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center">
      <div className="relative w-full h-56 bg-black rounded-2xl border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        <VideoBg ytId="X-HL-r5TOiU" />
        
        {/* HUD Overlay */}
        <div className="relative z-20 w-48 h-48 flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full border border-white/20 animate-ping-slow shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
          <div className="absolute w-48 h-48 rounded-full border border-[#00ffd0]/30 border-dashed animate-spin-slow" />
          
          <motion.div 
            className="absolute w-12 h-12 rounded-full blur-xl mix-blend-screen"
            style={{ background: roi > 250 ? '#00ffd0' : theme?.primary }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {Object.entries(data).map(([key, val], i) => {
             const angle = (i * Math.PI) / 2
             const distance = (val / 100) * 80
             const x = Math.cos(angle) * distance
             const y = Math.sin(angle) * distance
             return (
               <motion.div key={key} className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]" animate={{ x, y }} transition={{ type: 'spring', stiffness: 40 }}>
                  <div className="absolute -bottom-5 -left-4 w-12 text-center text-[8px] font-mono text-white/80 uppercase backdrop-blur-sm bg-black/40 rounded py-0.5">{key}</div>
               </motion.div>
             )
          })}
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen drop-shadow-[0_0_10px_rgba(0,255,208,0.5)]">
            <motion.polygon 
               fill="#00ffd0" fillOpacity="0.1" stroke="#00ffd0" strokeWidth="2"
               animate={{ 
                 points: Object.values(data).map((val, i) => {
                   const a = (i * Math.PI) / 2
                   const d = (val / 100) * 80
                   return `${96 + Math.cos(a)*d},${96 + Math.sin(a)*d}`
                 }).join(' ')
               }}
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.keys(data).map(k => (
          <div key={k} className="flex flex-col gap-1">
             <span className="text-[9px] uppercase font-mono text-white/60">{k}</span>
             <input type="range" min="10" max="100" value={data[k as keyof typeof data]}
                onChange={e => {
                  setData(p => ({ ...p, [k]: Number(e.target.value) }))
                  if(addLog) addLog(`Otimizando Domínio: ${k.toUpperCase()}`)
                }}
                className="h-1 rounded bg-white/10" style={{ accentColor: theme?.primary }}
             />
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-black/60 backdrop-blur-lg rounded-xl border border-white/5 flex justify-between items-center">
         <div>
            <span className="text-[8px] uppercase tracking-widest text-[#00ffd0] block">Estimativa ROI 6D</span>
            <span className="text-[9px] text-white/40 block mt-0.5">Potencial Exponencial</span>
         </div>
         <motion.span 
           key={roi} initial={{ scale: 1.5, color: '#fff' }} animate={{ scale: 1, color: '#00ffd0' }}
           className="text-3xl font-mono font-black drop-shadow-[0_0_10px_rgba(0,255,208,0.5)]"
         >
           +{roi}%
         </motion.span>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 3: Matriz de Redes Neurais (Grid/Sandbox 6D)
// ──────────────────────────────────────────────────────────────────────────
export function SimNeuralMatrix({ theme, addLog }: SimulationProps) {
  const [params, setParams] = useState(70)
  const isHeavy = params > 50

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center">
      <div className="relative w-full h-48 md:h-56 bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center group perspective-[1000px] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        <VideoBg ytId="Fhgn25C2IuM" />
        
        {/* HUD Overlay */}
        <Brain className="relative z-20 w-20 h-20 text-white drop-shadow-[0_0_20px_rgba(255,255,255,1)]" />
        
        <div className="absolute z-20 inset-0 pointer-events-none">
          {Array.from({ length: Math.floor(params / 4) }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#00ffd0] rounded-full shadow-[0_0_10px_#00ffd0]"
              initial={{ left: '50%', top: '50%', opacity: 0 }}
              animate={{ 
                left: `${10 + Math.random() * 80}%`, 
                top: `${10 + Math.random() * 80}%`,
                opacity: [0, 1, 0]
              }}
              transition={{ duration: Math.random() * 1.5 + 0.5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between text-[10px] font-mono text-white/50 mb-2">
           <span>Model Size</span>
           <span className="font-bold text-white">{params}B Parâmetros</span>
        </div>
        <input 
          type="range" min="1" max="175" value={params}
          onChange={e => {
            setParams(Number(e.target.value))
            if(addLog) addLog(`Ajustando arquitetura para ${e.target.value} Bilhões de parâmetros.`)
          }}
          className="w-full h-1 rounded bg-white/10" style={{ accentColor: theme?.primary }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg">
           <span className="text-[8px] uppercase text-white/40 block">Latência de Inferência</span>
           <span className="text-sm font-mono font-bold" style={{ color: isHeavy ? '#f87171' : '#4ade80' }}>
             {Math.round(params * 1.5)} ms/token
           </span>
        </div>
        <div className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg">
           <span className="text-[8px] uppercase text-white/40 block">Consumo VRAM</span>
           <span className="text-sm font-mono font-bold text-[#00ffd0] drop-shadow-[0_0_5px_rgba(0,255,208,0.5)]">
             {Math.round(params * 2.2)} GB
           </span>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 4: Pipeline Serverless (Edge to Core flow)
// ──────────────────────────────────────────────────────────────────────────
export function SimServerlessFlow({ theme, addLog }: SimulationProps) {
  const [switches, setSwitches] = useState({ edge: false, autoScale: false })
  
  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center">
      <div className="relative w-full h-48 md:h-56 bg-black rounded-2xl border border-white/10 flex shadow-[0_0_30px_rgba(0,0,0,0.8)]">
         
         <VideoBg ytId="wjQq0nSGS28" />

         <div className="absolute z-20 inset-0 flex flex-col justify-around py-6 px-4">
            <div className="relative h-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 flex items-center px-1 overflow-hidden">
               <span className="absolute left-3 text-[8px] font-mono text-white/50 z-10">CORE</span>
               <motion.div className="w-16 h-2 rounded-full" style={{ background: theme?.primary }} animate={{ x: [0, 300] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
            </div>
            
            <div className="relative h-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 flex items-center px-1 overflow-hidden" style={{ opacity: switches.edge ? 1 : 0.4 }}>
               <span className="absolute left-3 text-[8px] font-mono text-white/50 z-10">EDGE</span>
               <motion.div className="w-24 h-2 rounded-full bg-[#00ffd0] shadow-[0_0_10px_#00ffd0]" animate={switches.edge ? { x: [0, 300] } : {}} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} />
               {!switches.edge && <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-red-500 uppercase">Blocked</span>}
            </div>
            
            <div className="relative h-6 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 flex items-center px-1 overflow-hidden" style={{ opacity: switches.autoScale ? 1 : 0.4 }}>
               <span className="absolute left-3 text-[8px] font-mono text-white/50 z-10">SCALE</span>
               {switches.autoScale && Array.from({length: 5}).map((_, i) => (
                 <motion.div key={i} className="absolute w-8 h-2 rounded-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]" animate={{ x: [-50, 300] }} transition={{ duration: Math.random()*1 + 1, repeat: Infinity, delay: i * 0.2, ease: 'linear' }} />
               ))}
               {!switches.autoScale && <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-red-500 uppercase">Blocked</span>}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => {
             setSwitches(s => ({...s, edge: !s.edge}))
             if(addLog) addLog(`Comutação EDGE nodes: ${!switches.edge ? 'ON' : 'OFF'}`)
          }}
          className={`p-4 rounded-xl border transition-all backdrop-blur-md ${switches.edge ? 'bg-[#00ffd0]/20 border-[#00ffd0] shadow-[0_0_20px_rgba(0,255,208,0.3)]' : 'bg-black/60 border-white/10'}`}
        >
           <Network className={`h-6 w-6 mb-2 ${switches.edge ? 'text-[#00ffd0]' : 'text-white/30'}`} />
           <span className="text-[10px] uppercase font-mono block text-left">Deploy Edge</span>
        </button>

        <button 
          onClick={() => {
             setSwitches(s => ({...s, autoScale: !s.autoScale}))
             if(addLog) addLog(`Comutação Auto-Scale: ${!switches.autoScale ? 'ON' : 'OFF'}`)
          }}
          className={`p-4 rounded-xl border transition-all backdrop-blur-md ${switches.autoScale ? 'bg-[#ff00ff]/20 border-[#ff00ff] shadow-[0_0_20px_rgba(255,0,255,0.3)]' : 'bg-black/60 border-white/10'}`}
        >
           <Server className={`h-6 w-6 mb-2 ${switches.autoScale ? 'text-[#ff00ff]' : 'text-white/30'}`} />
           <span className="text-[10px] uppercase font-mono block text-left">Auto-Scale</span>
        </button>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 5: Acelerador de Prototipagem (Concentric ignition rings)
// ──────────────────────────────────────────────────────────────────────────
export function SimInnovationIgnition({ theme, addLog }: SimulationProps) {
  const [ignited, setIgnited] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if(ignited) {
      let v = 0
      const int = setInterval(() => {
        v += 2; setProgress(v)
        if(v >= 100) {
          clearInterval(int)
          setTimeout(() => { setIgnited(false); setProgress(0) }, 2000)
        }
      }, 50)
      return () => clearInterval(int)
    }
  }, [ignited])

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center items-center">
      <div className="relative w-full h-56 flex items-center justify-center rounded-2xl bg-black border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
         
         <VideoBg ytId="eFMbpir3rvg" />

         <div className="relative z-20 w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
           <motion.div className="absolute inset-0 rounded-full border-[3px] border-t-transparent border-white/30" animate={{ rotate: ignited ? 360 : 0 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
           <motion.div className="absolute inset-4 rounded-full border-2 border-b-transparent border-[#d4b87a]" animate={{ rotate: ignited ? -360 : 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
           <motion.div className="absolute inset-8 rounded-full border border-x-transparent border-[#00ffd0]" animate={{ rotate: ignited ? 720 : 0 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }} />

           <button
             onClick={() => {
                if(!ignited) {
                   setIgnited(true)
                   if(addLog) addLog('Ignition sequence initiated. Building MVP...')
                }
             }}
             className="relative z-30 w-24 h-24 rounded-full bg-black/80 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)]"
           >
             {ignited ? (
               <span className="text-xl font-black font-mono text-[#00ffd0] drop-shadow-[0_0_10px_rgba(0,255,208,0.8)]">{progress}%</span>
             ) : (
               <>
                 <Rocket className="text-white/80 h-6 w-6 mb-1 drop-shadow-[0_0_5px_#fff]" />
                 <span className="text-[9px] uppercase tracking-widest font-mono text-white/80">Ignição</span>
               </>
             )}
             {ignited && <div className="absolute bottom-0 inset-x-0 bg-[#00ffd0]/30" style={{ height: `${progress}%` }} />}
           </button>
         </div>
      </div>

      <div className="text-center w-full p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
         <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Status do MVP Rápido</span>
         <span className="text-sm font-bold text-white mt-1 block">
           {ignited ? (progress < 100 ? 'Processando Hipóteses...' : 'MVP Validado!') : 'Aguardando Ignição'}
         </span>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 6: Balanceador 3 Horizontes (Fluid pyramids/bars)
// ──────────────────────────────────────────────────────────────────────────
export function SimHorizonsBalancer({ theme, addLog }: SimulationProps) {
  const [h1, setH1] = useState(60)
  const [h2, setH2] = useState(30)
  const h3 = Math.max(0, 100 - h1 - h2)

  const handleH1 = (v: number) => { if(v + h2 > 100) setH2(100 - v); setH1(v) }
  const handleH2 = (v: number) => { if(v + h1 > 100) setH1(100 - v); setH2(v) }

  const ilc = Math.round((h1*0.5) + (h2*1.2) + (h3*3))

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center">
       <div className="relative flex items-end justify-around h-56 bg-black rounded-2xl border border-white/10 p-4 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
         
         <VideoBg ytId="Im7slkFMtI8" />

         <div className="absolute z-20 inset-0 flex flex-col">
            {[20, 40, 60, 80].map(l => (
              <div key={l} className="flex-1 border-b border-white/[0.05] w-full" />
            ))}
         </div>

         <div className="relative w-16 h-full flex items-end justify-center z-30 group">
           <motion.div className="w-full rounded-t-lg shadow-[0_0_15px_#cbd5e1]" style={{ background: 'rgba(203, 213, 225, 0.8)' }} animate={{ height: `${h1}%` }} transition={{ type: 'spring' }} />
           <div className="absolute -bottom-2 bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-white/10 flex flex-col items-center">
             <span className="text-[8px] font-mono text-white/50">H1</span>
             <span className="text-xs font-bold text-white">{h1}%</span>
           </div>
         </div>
         <div className="relative w-16 h-full flex items-end justify-center z-30">
           <motion.div className="w-full rounded-t-lg shadow-[0_0_15px_#d4b87a]" style={{ background: 'rgba(212, 184, 122, 0.8)' }} animate={{ height: `${h2}%` }} transition={{ type: 'spring' }} />
           <div className="absolute -bottom-2 bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-white/10 flex flex-col items-center">
             <span className="text-[8px] font-mono text-white/50">H2</span>
             <span className="text-xs font-bold text-white">{h2}%</span>
           </div>
         </div>
         <div className="relative w-16 h-full flex items-end justify-center z-30">
           <motion.div className="w-full rounded-t-lg shadow-[0_0_15px_#00ffd0]" style={{ background: 'rgba(0, 255, 208, 0.8)' }} animate={{ height: `${h3}%` }} transition={{ type: 'spring' }} />
           <div className="absolute -bottom-2 bg-black/80 px-2 py-1 rounded backdrop-blur-sm border border-white/10 flex flex-col items-center">
             <span className="text-[8px] font-mono text-white/50">H3</span>
             <span className="text-xs font-bold text-white">{h3}%</span>
           </div>
         </div>
       </div>

       <div className="space-y-4 pt-4">
         <input type="range" min="0" max="100" value={h1} onChange={e => handleH1(Number(e.target.value))} className="w-full h-1.5 rounded bg-[#cbd5e1]/30" style={{ accentColor: '#cbd5e1' }} />
         <input type="range" min="0" max="100" value={h2} onChange={e => handleH2(Number(e.target.value))} className="w-full h-1.5 rounded bg-[#d4b87a]/30" style={{ accentColor: theme?.primary }} />
       </div>

       <div className="p-3 bg-[#00ffd0]/10 backdrop-blur-md rounded-xl border border-[#00ffd0]/30 flex justify-between items-center shadow-[0_0_20px_rgba(0,255,208,0.1)]">
         <span className="text-[9px] uppercase tracking-widest text-[#00ffd0] font-bold">Índice de Longevidade (ILC)</span>
         <span className="text-2xl font-mono font-black text-[#00ffd0] drop-shadow-[0_0_10px_rgba(0,255,208,0.8)]">{ilc}</span>
       </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 7: Vigilância & Segurança Psicológica (Force field radar)
// ──────────────────────────────────────────────────────────────────────────
export function SimPsychologicalShield({ theme, addLog }: SimulationProps) {
  const [shield, setShield] = useState(80)
  const safe = shield > 50

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center items-center">
      <div className="relative w-full h-56 bg-black rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        <VideoBg ytId="1Of7tzR9be8" />

        {/* The Shield */}
        <motion.div 
          className="absolute z-20 rounded-full border-[5px]"
          style={{ 
            borderColor: safe ? '#4ade80' : '#f87171',
            opacity: shield / 100,
            width: '180px', height: '180px',
            boxShadow: safe ? 'inset 0 0 50px rgba(74,222,128,0.5), 0 0 50px rgba(74,222,128,0.5)' : 'inset 0 0 50px rgba(248,113,113,0.8), 0 0 50px rgba(248,113,113,0.8)'
          }}
          animate={!safe ? { x: [-4, 4, -4], y: [2, -2, 2] } : { scale: [1, 1.05, 1] }}
          transition={!safe ? { duration: 0.1, repeat: Infinity } : { duration: 2, repeat: Infinity }}
        />

        {/* Team Center */}
        <div className="z-30 flex items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)]"><IconUser s={18}/></div>
           <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.4)]"><IconUser s={24}/></div>
           <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)]"><IconUser s={18}/></div>
        </div>

        {/* Attacks */}
        <motion.div 
          className="absolute z-30 top-10 right-10"
          animate={{ x: [-50, 0], y: [50, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ShieldAlert className="w-8 h-8 text-red-500 drop-shadow-[0_0_10px_rgba(248,113,113,1)]" />
        </motion.div>

        {!safe && <div className="absolute z-10 inset-0 bg-red-500/20 pointer-events-none mix-blend-color-burn" />}
      </div>

      <div className="w-full space-y-4">
        <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
           <span>Cultura de Punição</span>
           <span className="font-bold text-white text-xs">{shield}% <span className={safe ? 'text-green-400' : 'text-red-400'}>Confiança</span></span>
        </div>
        <input 
          type="range" min="10" max="100" value={shield}
          onChange={e => {
            setShield(Number(e.target.value))
            if(addLog) addLog(`Segurança Psicológica ajustada para ${e.target.value}%`)
          }}
          className="w-full h-1.5 rounded-full bg-white/10" style={{ accentColor: safe ? '#4ade80' : '#f87171' }}
        />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Cap 8: Kimball Lakehouse (Data Cubes ETL flow)
// ──────────────────────────────────────────────────────────────────────────
export function SimDataLakehouse({ theme, addLog }: SimulationProps) {
  const [ingestion, setIngestion] = useState(50)

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center">
      <div className="relative w-full h-56 bg-black rounded-2xl border border-white/10 flex items-center justify-between p-4 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        <VideoBg ytId="aDcw3wtgkdI" />

        {/* Left: Sources */}
        <div className="flex flex-col gap-4 z-20">
          {[Database, Zap, Hexagon].map((Icon, i) => (
             <div key={i} className="w-12 h-12 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
               <Icon className="w-6 h-6 text-white/80" />
             </div>
          ))}
        </div>

        {/* Center Pipes */}
        <div className="absolute z-20 inset-x-20 inset-y-0 flex flex-col justify-center gap-14 opacity-80 pointer-events-none">
          {[1,2,3].map(i => (
             <div key={i} className="h-1 w-full bg-gradient-to-r from-transparent via-[#00ffd0]/50 to-transparent relative overflow-hidden">
                <motion.div 
                  className="w-32 h-full bg-white shadow-[0_0_20px_#fff]"
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 3 - (ingestion / 50), repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
                />
             </div>
          ))}
        </div>

        {/* Right: The Cube */}
        <motion.div 
           className="relative z-30 w-28 h-28 bg-[#00ffd0]/20 border-[2px] border-[#00ffd0] flex items-center justify-center mix-blend-screen shadow-[0_0_50px_rgba(0,255,208,0.5)] backdrop-blur-sm"
           style={{ transformStyle: 'preserve-3d', rotateX: 20, rotateY: -30 }}
           animate={{ rotateY: [-30, 330] }}
           transition={{ duration: 10 - (ingestion / 15), repeat: Infinity, ease: 'linear' }}
        >
           <Database className="w-12 h-12 text-[#00ffd0] drop-shadow-[0_0_10px_#00ffd0]" />
        </motion.div>
      </div>

      <div>
        <div className="flex justify-between text-[10px] font-mono text-white/50 mb-2">
           <span>Pipeline Speed</span>
           <span className="font-bold text-[#00ffd0] text-sm drop-shadow-[0_0_5px_rgba(0,255,208,0.5)]">{Math.round(ingestion * 5.5)} Gbps</span>
        </div>
        <input 
          type="range" min="10" max="100" value={ingestion}
          onChange={e => {
            setIngestion(Number(e.target.value))
            if(addLog) addLog(`Acelerando ingestão ETL para ${e.target.value}%`)
          }}
          className="w-full h-1.5 rounded bg-[#00ffd0]/20" style={{ accentColor: '#00ffd0' }}
        />
      </div>
    </div>
  )
}

// Reusable SVG for psych safety
const IconUser = ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4" /><path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" /></svg>

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
                left: `${10 + Math.random() * 80}%`, 
                top: `${10 + Math.random() * 80}%`,
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
          className={`p-2 rounded-lg border transition-all text-[9px] uppercase font-bold ${activeNetwork === 0 ? 'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0]' : 'bg-black/60 border-white/10 text-white/40'}`}
        >
          DMN (Devaneio)
        </button>
        <button 
          onClick={() => { setActiveNetwork(1); if(addLog) addLog('Ativando Executive Control (ECN). Refinando e selecionando ideias...') }}
          className={`p-2 rounded-lg border transition-all text-[9px] uppercase font-bold ${activeNetwork === 1 ? 'bg-[#ff00ff]/20 border-[#ff00ff] text-[#ff00ff]' : 'bg-black/60 border-white/10 text-white/40'}`}
        >
          ECN (Foco)
        </button>
        <button 
          onClick={() => { setActiveNetwork(2); if(addLog) addLog('Ativando Salience Network (SN). Eureka! Conexão detectada.') }}
          className={`p-2 rounded-lg border transition-all text-[9px] uppercase font-bold ${activeNetwork === 2 ? 'bg-[#d4b87a]/20 border-[#d4b87a] text-[#d4b87a]' : 'bg-black/60 border-white/10 text-white/40'}`}
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
             style={{ width: `${divergence}%`, height: `${divergence}%` }}
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
             if(addLog) addLog(`Ajustando funil para ${Number(e.target.value) > 60 ? 'Divergência (Brainstorming/SCAMPER)' : 'Convergência (Design Thinking/Seleção)'}`)
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
            onClick={() => { setActiveHat(i); if(addLog) addLog(`Análise Trocada: Perspectiva Chapéu ${hat.name} (${hat.desc}).`) }}
            className={`py-1.5 px-1 rounded-lg border transition-all text-[8px] uppercase font-bold flex flex-col items-center gap-1 ${activeHat === i ? 'bg-white/20' : 'bg-black/60 border-white/10 text-white/40'}`}
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
