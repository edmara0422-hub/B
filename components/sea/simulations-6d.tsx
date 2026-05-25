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
        
        <Brain className="relative z-20 w-24 h-24 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" style={{ color: activeNetwork === 0 ? '#00ffd0' : activeNetwork === 1 ? '#ff00ff' : '#c0c0c0' }} />
        
        <div className="absolute z-20 inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: activeNetwork === 0 ? '#00ffd0' : activeNetwork === 1 ? '#ff00ff' : '#c0c0c0' }}
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
          className={`p-2 rounded-lg border transition-all text-[9px] uppercase font-bold ${activeNetwork === 2 ? 'bg-[#c0c0c0]/20 border-[#c0c0c0] text-[#c0c0c0]' : 'bg-black/60 border-white/10 text-white/40'}`}
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
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isNested ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
          <div className="relative w-40 h-40">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-2 border-[#00ffd0] bg-[#00ffd0]/10 flex items-top justify-center pt-2 text-[10px] font-bold text-[#00ffd0] mix-blend-screen shadow-[0_0_15px_rgba(0,255,208,0.3)]">PLANET</div>
            <div className="absolute bottom-4 left-2 w-24 h-24 rounded-full border-2 border-[#d4b87a] bg-[#d4b87a]/10 flex items-end justify-start pb-4 pl-3 text-[10px] font-bold text-[#d4b87a] mix-blend-screen shadow-[0_0_15px_rgba(212,184,122,0.3)]">PEOPLE</div>
            <div className="absolute bottom-4 right-2 w-24 h-24 rounded-full border-2 border-[#ff0055] bg-[#ff0055]/10 flex items-end justify-end pb-4 pr-3 text-[10px] font-bold text-[#ff0055] mix-blend-screen shadow-[0_0_15px_rgba(255,0,85,0.3)]">PROFIT</div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 animate-pulse mix-blend-overlay shadow-[0_0_20px_#fff]" />
          </div>
        </div>

        {/* Nested Mode */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${!isNested ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="relative flex items-center justify-center" style={{ transform: `rotateX(60deg) rotateZ(${rotate}deg)` }}>
            {/* Meio Ambiente */}
            <div className="absolute w-48 h-48 rounded-full border border-[#00ffd0]/50 bg-[#00ffd0]/5 flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,255,208,0.2)]">
              <span className="absolute -top-4 text-[8px] text-[#00ffd0] font-mono tracking-widest whitespace-nowrap" style={{ transform: `rotateZ(-${rotate}deg)` }}>MEIO AMBIENTE (LIMITES GLOBAIS)</span>
            </div>
            {/* Sociedade */}
            <div className="absolute w-32 h-32 rounded-full border-2 border-[#d4b87a] bg-[#d4b87a]/10 flex items-center justify-center shadow-[0_0_20px_rgba(212,184,122,0.4)]">
              <span className="absolute -left-6 text-[8px] text-[#d4b87a] font-mono tracking-widest" style={{ transform: `rotateZ(-${rotate}deg)` }}>SOCIEDADE</span>
            </div>
            {/* Economia */}
            <div className="absolute w-16 h-16 rounded-full border-2 border-[#ff0055] bg-[#ff0055]/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,0,85,0.5)]">
              <span className="text-[8px] text-[#ff0055] font-bold" style={{ transform: `rotateZ(-${rotate}deg) rotateX(-60deg)` }}>ECONOMIA</span>
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
    if(addLog) addLog(`[SCAN INICIADO] Espectro ${pillars[k].name}. Rastreado: ${pillars[k].desc}.`)
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex gap-2 mb-4">
        {(['E','S','G'] as const).map(k => (
          <button 
            key={k} onClick={() => runScan(k)}
            className={`flex-1 py-1.5 text-[10px] font-bold font-mono rounded border transition-all ${scanning === k ? 'bg-white/10' : 'bg-transparent border-white/10 text-white/40'}`}
            style={{ borderColor: scanning === k ? pillars[k].color : undefined, color: scanning === k ? pillars[k].color : undefined, textShadow: scanning === k ? `0 0 10px ${pillars[k].color}` : 'none' }}
          >
            {pillars[k].name}
          </button>
        ))}
      </div>

      <div className="flex-1 relative border border-white/10 bg-black/50 rounded-lg overflow-hidden flex flex-col items-center justify-center">
        {scanning ? (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-bounce" style={{ filter: `drop-shadow(0 0 8px ${pillars[scanning].color})` }} />
            
            <div className="w-3/4 space-y-3">
              <div className="flex justify-between text-[9px] font-mono">
                <span className="text-white/50">MÉTRICAS ATIVAS:</span>
                <span style={{ color: pillars[scanning].color }}>{pillars[scanning].desc}</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full animate-pulse" style={{ width: '100%', backgroundColor: pillars[scanning].color }} />
              </div>
              
              <div className="p-2 border rounded bg-black/80 mt-4" style={{ borderColor: `${pillars[scanning].color}40` }}>
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
            key={i} onClick={() => { setActiveFw(i); if(addLog) addLog(`Protocolo ${fw.id} ativo. Foco em ${fw.target}.`) }}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${activeFw === i ? 'font-bold' : 'text-white/40'}`}
            style={{ backgroundColor: activeFw === i ? `${fw.color}20` : 'transparent', color: activeFw === i ? fw.color : undefined }}
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
             style={{ backgroundColor: `${frameworks[activeFw].color}30`, color: frameworks[activeFw].color, border: `1px solid ${frameworks[activeFw].color}` }}>
          {frameworks[activeFw].id}
        </div>

        {/* Dynamic Beam */}
        <div className="absolute w-full h-[1px] top-1/2 left-0 -translate-y-1/2 transition-all duration-500 flex justify-end items-center pr-6"
             style={{ background: `linear-gradient(90deg, transparent, ${frameworks[activeFw].color}80, transparent)`, transform: `rotate(${activeFw * 45}deg)` }}>
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
          className={`px-3 py-1.5 rounded text-[9px] font-mono font-bold border transition-all ${filterOn ? 'bg-[#ff0055]/20 border-[#ff0055] text-[#ff0055] animate-pulse shadow-[0_0_15px_rgba(255,0,85,0.4)]' : 'bg-white/10 border-white/20 text-white'}`}
        >
          {filterOn ? 'DESATIVAR RADAR' : 'APLICAR FILTRO UV'}
        </button>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden relative mt-8 border border-white/10 group">
        {/* Falsa Sustentabilidade (Green) */}
        <div className={`absolute inset-0 bg-[#002211] flex flex-col items-center justify-center transition-all duration-1000 ${filterOn ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100'}`}>
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500 mb-2 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
            <span className="text-2xl">🌱</span>
          </div>
          <span className="text-green-400 font-bold tracking-widest uppercase">100% Eco-Friendly</span>
          <span className="text-[9px] text-green-300/50 mt-1">Produto da Natureza</span>
        </div>

        {/* Realidade (Red Glitch) */}
        <div className={`absolute inset-0 bg-[#220000] flex flex-col items-center justify-center p-4 transition-all duration-1000 ${filterOn ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-md pointer-events-none'}`}
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
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
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
    if(addLog) addLog(`Trava ${letters[i]} (${descriptions[i].split(':')[0]}) alinhada e trancada!`)
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
                 className={`absolute rounded-full border-2 flex items-top justify-center transition-all duration-1000 ${isLocked ? 'border-[#00ffd0] shadow-[0_0_10px_rgba(0,255,208,0.5)]' : 'border-white/10 border-dashed animate-[spin_10s_linear_infinite]'}`}
                 style={{ width: size, height: size, animationDirection: i % 2 === 0 ? 'normal' : 'reverse', zIndex: 10 - i }}>
              <button 
                onClick={() => unlock(i)}
                className={`absolute -top-2 w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center transition-colors ${isLocked ? 'bg-[#00ffd0] text-black' : 'bg-black border border-white/30 text-white/50 hover:bg-white/20'}`}
              >
                {letters[i]}
              </button>
            </div>
          )
        })}

        {/* Core Central */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[8px] font-bold z-20 transition-all duration-1000 ${allUnlocked ? 'bg-[#00ffd0] text-black shadow-[0_0_30px_#00ffd0] scale-110' : 'bg-black border-2 border-white/10 text-white/20'}`}>
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
    if(addLog) addLog(`Token instanciado. Gateway: ${gateway} (${gateway === 'XOR' ? 'Exclusivo - Um ou Outro' : 'Paralelo - Todos Simultâneos'}).`)
    setTimeout(() => setTokenActive(false), 3000)
  }

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setGateway('XOR')} className={`px-2 py-1 text-[9px] font-bold font-mono rounded border ${gateway === 'XOR' ? 'bg-[#d4b87a]/20 border-[#d4b87a] text-[#d4b87a]' : 'bg-transparent border-white/20 text-white/50'}`}>XOR (Exclusivo)</button>
        <button onClick={() => setGateway('AND')} className={`px-2 py-1 text-[9px] font-bold font-mono rounded border ${gateway === 'AND' ? 'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0]' : 'bg-transparent border-white/20 text-white/50'}`}>AND (Paralelo)</button>
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tokenStart { 0% { left: 1rem; } 100% { left: 4rem; } }
        @keyframes tokenPathA { 0% { left: 86px; opacity: 1; } 80% { left: 180px; opacity: 1; } 100% { left: 180px; opacity: 0; } }
        @keyframes tokenPathB { 0% { left: 86px; opacity: 1; } 80% { left: 180px; opacity: 1; } 100% { left: 180px; opacity: 0; } }
      `}} />
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
            key={i} onClick={() => { setActivePin(i); if(addLog) addLog(`Satélite Localizador: ${c.name}. ${c.desc}.`) }}
            className={`px-2 py-1 text-[8px] font-bold font-mono rounded whitespace-nowrap border ${activePin === i ? 'bg-white/20 text-white' : 'bg-transparent border-white/10 text-white/40'}`}
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
          <div key={i} className={`absolute flex flex-col items-center transition-all duration-500 ${activePin === i ? 'opacity-100 scale-125 z-10' : 'opacity-30 scale-75'}`}
               style={{ left: c.x, top: c.y }}>
            <div className="w-2 h-2 rounded-full relative" style={{ backgroundColor: c.color, boxShadow: `0 0 10px ${c.color}` }}>
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


// ============================================================================
// M2-S1: GESTÃO DE NEGÓCIOS (5 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimPDCACycle({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activeStage, setActiveStage] = useState<number | null>(null)
  
  const stages = [
    { name: 'PLAN', color: '#00ffd0', desc: 'Análise de Cenários e Metas', angle: 0 },
    { name: 'DO', color: '#ff0055', desc: 'Organização e Direção (Execução)', angle: 90 },
    { name: 'CHECK', color: '#d4b87a', desc: 'Controle e Medição de KPIs', angle: 180 },
    { name: 'ACT', color: '#3b82f6', desc: 'Correção de Desvios (Melhoria Contínua)', angle: 270 }
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest">
        NÚCLEO DE REATOR PDCA
      </div>
      
      <div className="flex-1 w-full flex items-center justify-center relative perspective-[800px]">
        {/* Reator central */}
        <div className="relative w-48 h-48 rounded-full border border-white/10 flex items-center justify-center shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]"
             style={{ transformStyle: 'preserve-3d', transform: 'rotateX(45deg)' }}>
          
          {/* Anéis de energia */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Fases do PDCA */}
          {stages.map((stage, i) => {
            const isActive = activeStage === i
            return (
              <button 
                key={i}
                onClick={() => {
                  setActiveStage(i)
                  if(addLog) addLog(`Ciclo PDCA: ${stage.name} ativado. Foco em: ${stage.desc}`)
                }}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${isActive ? 'scale-125 z-20' : 'scale-100 opacity-50 z-10'}`}
                style={{ 
                  left: `${50 + 50 * Math.cos(stage.angle * Math.PI / 180)}%`,
                  top: `${50 + 50 * Math.sin(stage.angle * Math.PI / 180)}%`,
                  backgroundColor: isActive ? `${stage.color}40` : '#000',
                  borderColor: stage.color,
                  borderWidth: isActive ? 2 : 1,
                  boxShadow: isActive ? `0 0 20px ${stage.color}` : 'none',
                  transform: 'rotateX(-45deg)' // Counter-rotate so text is flat
                }}
              >
                <span className="text-[10px] font-bold" style={{ color: isActive ? stage.color : '#fff' }}>{stage.name}</span>
              </button>
            )
          })}
          
          {/* Core Energy */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border border-white/30"
               style={{ backgroundColor: activeStage !== null ? stages[activeStage].color + '20' : 'transparent', boxShadow: activeStage !== null ? `0 0 40px ${stages[activeStage].color}` : 'none' }}>
             <div className="w-full h-full animate-ping opacity-20" style={{ backgroundColor: activeStage !== null ? stages[activeStage].color : '#fff' }} />
          </div>
        </div>
      </div>
      
      <div className="h-16 w-full max-w-[250px] p-2 bg-white/5 border border-white/10 rounded text-center mt-4 flex items-center justify-center">
        {activeStage !== null ? (
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: stages[activeStage].color }}>{stages[activeStage].name}</span>
            <span className="text-[9px] text-white/70">{stages[activeStage].desc}</span>
          </div>
        ) : (
          <span className="text-[9px] text-white/40 uppercase tracking-widest animate-pulse">Aguardando ativação de ciclo...</span>
        )}
      </div>
    </div>
  )
}

export function SimBusinessCanvas({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [activeBlock, setActiveBlock] = useState<number | null>(null)
  
  // Canvas structure simplified for 3x3 isometric display
  const blocks = [
    { id: 'Parcerias', group: 'Custo', color: '#3b82f6' },
    { id: 'Atividades', group: 'Custo', color: '#3b82f6' },
    { id: 'Proposta de Valor', group: 'Valor', color: '#00ffd0' },
    { id: 'Relacionamento', group: 'Receita', color: '#d4b87a' },
    { id: 'Segmentos', group: 'Receita', color: '#d4b87a' },
    { id: 'Recursos', group: 'Custo', color: '#3b82f6' },
    { id: 'Canais', group: 'Receita', color: '#d4b87a' },
    { id: 'Custos', group: 'Base', color: '#ff0055' },
    { id: 'Receitas', group: 'Base', color: '#ff0055' }
  ]

  return (
    <div className="flex flex-col items-center h-full w-full relative">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        BUSINESS MODEL CANVAS (Osterwalder)
      </div>

      <div className="flex-1 w-full flex items-center justify-center relative perspective-[1200px]">
        {/* Isometric Grid */}
        <div className="grid grid-cols-3 gap-2" style={{ transform: 'rotateX(55deg) rotateZ(-45deg)' }}>
          {blocks.map((b, i) => {
            const isActive = activeBlock === i
            const isRelated = activeBlock !== null && blocks[activeBlock].group === b.group
            return (
              <button 
                key={i}
                onClick={() => {
                  setActiveBlock(i)
                  if(addLog) addLog(`Módulo BMC acessado: ${b.id} (${b.group}).`)
                }}
                className={`w-16 h-16 md:w-20 md:h-20 border flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-white/20 -translate-y-4' : isRelated ? 'bg-white/10 -translate-y-2' : 'bg-black/50 hover:bg-white/5'}`}
                style={{ 
                  borderColor: isActive ? b.color : isRelated ? `${b.color}50` : 'rgba(255,255,255,0.1)',
                  boxShadow: isActive ? `-10px 10px 20px ${b.color}40, inset 0 0 15px ${b.color}80` : 'none'
                }}
              >
                <span className="text-[7px] md:text-[8px] font-bold text-center rotate-45 px-1 leading-tight" style={{ color: isActive ? '#fff' : isRelated ? b.color : 'rgba(255,255,255,0.4)' }}>
                  {b.id}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-[9px] font-mono text-center w-full max-w-[200px] h-10 mt-4">
        {activeBlock !== null ? (
          <span className="text-white">Alinhamento sistêmico focado em <b style={{ color: blocks[activeBlock].color }}>{blocks[activeBlock].group}</b>.</span>
        ) : (
          <span className="text-white/40">Selecione um bloco do Canvas para ver dependências.</span>
        )}
      </div>
    </div>
  )
}

export function SimStrategicTripod({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [face, setFace] = useState<number>(0) // 0: SWOT, 1: Porter, 2: BCG
  
  const frameworks = [
    { name: 'SWOT', color: '#00ffd0', desc: 'Forças, Fraquezas, Oportunidades, Ameaças' },
    { name: 'PORTER (5 Forças)', color: '#ff0055', desc: 'Rivalidade, Entrantes, Substitutos, Fornecedores, Compradores' },
    { name: 'MATRIZ BCG', color: '#d4b87a', desc: 'Estrela, Vaca Leiteira, Ponto de Interrogação, Vira-Lata' }
  ]

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="flex gap-2 mb-8 z-20">
        {frameworks.map((f, i) => (
          <button 
            key={i} onClick={() => { setFace(i); if(addLog) addLog(`Carregando Framework Tático: ${f.name}.`) }}
            className={`px-2 py-1 text-[8px] font-bold rounded border transition-colors ${face === i ? 'bg-white/20' : 'bg-transparent border-white/20 text-white/50'}`}
            style={{ borderColor: face === i ? f.color : undefined, color: face === i ? f.color : undefined }}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center perspective-[800px]">
        {/* 3D Prism Container */}
        <div className="w-40 h-40 relative transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: `rotateY(${face * -120}deg)` }}>
          
          {/* Face 0: SWOT */}
          <div className="absolute w-40 h-40 border-2 bg-black/80 flex flex-wrap items-center justify-center p-2 backface-hidden"
               style={{ borderColor: '#00ffd0', transform: 'rotateY(0deg) translateZ(35px)', boxShadow: face === 0 ? '0 0 30px rgba(0,255,208,0.3)' : 'none' }}>
            <div className="w-1/2 h-1/2 border border-[#00ffd0]/30 flex items-center justify-center text-[10px] text-[#00ffd0] font-bold">S</div>
            <div className="w-1/2 h-1/2 border border-[#00ffd0]/30 flex items-center justify-center text-[10px] text-[#00ffd0] font-bold">W</div>
            <div className="w-1/2 h-1/2 border border-[#00ffd0]/30 flex items-center justify-center text-[10px] text-[#00ffd0] font-bold">O</div>
            <div className="w-1/2 h-1/2 border border-[#00ffd0]/30 flex items-center justify-center text-[10px] text-[#00ffd0] font-bold">T</div>
          </div>
          
          {/* Face 1: Porter */}
          <div className="absolute w-40 h-40 border-2 bg-black/80 flex flex-col items-center justify-center p-2 backface-hidden space-y-1"
               style={{ borderColor: '#ff0055', transform: 'rotateY(120deg) translateZ(35px)', boxShadow: face === 1 ? '0 0 30px rgba(255,0,85,0.3)' : 'none' }}>
            <div className="w-full py-1 text-center text-[8px] border border-[#ff0055]/30 text-[#ff0055]">Entrantes</div>
            <div className="flex w-full gap-1">
               <div className="flex-1 py-4 text-center text-[8px] border border-[#ff0055]/30 text-[#ff0055]">Forn.</div>
               <div className="flex-1 py-4 text-center border border-[#ff0055] bg-[#ff0055]/20 text-[8px] font-bold text-[#ff0055]">Rivalidade</div>
               <div className="flex-1 py-4 text-center text-[8px] border border-[#ff0055]/30 text-[#ff0055]">Comp.</div>
            </div>
            <div className="w-full py-1 text-center text-[8px] border border-[#ff0055]/30 text-[#ff0055]">Substitutos</div>
          </div>
          
          {/* Face 2: BCG */}
          <div className="absolute w-40 h-40 border-2 bg-black/80 flex flex-wrap items-center justify-center p-2 backface-hidden"
               style={{ borderColor: '#d4b87a', transform: 'rotateY(240deg) translateZ(35px)', boxShadow: face === 2 ? '0 0 30px rgba(212,184,122,0.3)' : 'none' }}>
            <div className="w-1/2 h-1/2 border border-[#d4b87a]/30 flex items-center justify-center text-xl">⭐</div>
            <div className="w-1/2 h-1/2 border border-[#d4b87a]/30 flex items-center justify-center text-xl">❓</div>
            <div className="w-1/2 h-1/2 border border-[#d4b87a]/30 flex items-center justify-center text-xl">🐄</div>
            <div className="w-1/2 h-1/2 border border-[#d4b87a]/30 flex items-center justify-center text-xl">🐕</div>
          </div>

        </div>
      </div>

      <div className="text-[9px] font-mono text-center text-white/60 mt-4 max-w-[200px]">
        {frameworks[face].desc}
      </div>
    </div>
  )
}

export function SimValueChain({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [bottleneck, setBottleneck] = useState(false)
  
  const fixBottleneck = () => {
    if(!bottleneck) return
    setBottleneck(false)
    if(addLog) addLog('Gestão à Vista: Gargalo identificado em Atividade de Suporte e resolvido via Kaizen rápido.')
  }

  useEffect(() => {
    const t = setInterval(() => {
      setBottleneck(true)
      if(addLog) addLog('ALERTA DE DESVIO: Custo sem valor detectado na infraestrutura.')
    }, 8000)
    return () => clearInterval(t)
  }, [addLog])

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="absolute top-2 right-2 text-[9px] font-mono tracking-widest px-2 py-1 border rounded" style={{ borderColor: bottleneck ? '#ff0055' : '#00ffd0', color: bottleneck ? '#ff0055' : '#00ffd0' }}>
        STATUS: {bottleneck ? 'DESVIO DETECTADO' : 'FLUXO IDEAL'}
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center mt-6 gap-2">
        {/* Atividades de Suporte (Topo) */}
        <div className="w-full max-w-[240px] h-12 border-2 border-dashed border-white/20 rounded flex items-center justify-around relative">
           <span className="absolute -top-3 left-2 text-[7px] text-white/50 bg-black px-1 uppercase">Suporte</span>
           <div className="w-6 h-6 rounded bg-white/10" />
           <div className="w-6 h-6 rounded bg-white/10" />
           <button 
             onClick={fixBottleneck}
             className={`w-6 h-6 rounded flex items-center justify-center text-[10px] transition-all ${bottleneck ? 'bg-[#ff0055] animate-pulse shadow-[0_0_15px_#ff0055]' : 'bg-white/10'}`}
           >
             {bottleneck ? '⚠️' : ''}
           </button>
           <div className="w-6 h-6 rounded bg-white/10" />
        </div>

        {/* Esteira Principal (Fibra Óptica) */}
        <div className="w-full h-[2px] bg-white/20 relative my-2 overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          <div className="absolute top-0 left-0 h-full w-1/3 animate-[scan_2s_linear_infinite]" 
               style={{ background: `linear-gradient(90deg, transparent, ${bottleneck ? '#ff0055' : '#00ffd0'}, transparent)` }} />
        </div>

        {/* Atividades Primárias (Baixo) */}
        <div className="w-full max-w-[240px] h-16 border border-white/30 rounded flex items-center justify-between p-1 relative">
           <span className="absolute -bottom-3 right-2 text-[7px] text-white/50 bg-black px-1 uppercase">Cadeia Primária (Margem)</span>
           {['Inbound', 'Ops', 'Outbound', 'MKT', 'Serviço'].map((a, i) => (
             <div key={i} className="flex-1 h-full mx-0.5 bg-[#d4b87a]/20 border border-[#d4b87a]/40 flex items-center justify-center text-[7px] font-bold text-[#d4b87a] rotate-180" style={{ writingMode: 'vertical-rl' }}>
               {a}
             </div>
           ))}
           {/* Flecha de Margem */}
           <div className="w-0 h-0 border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-l-[20px] ml-1" style={{ borderLeftColor: bottleneck ? '#ff005550' : '#00ffd0' }} />
        </div>
      </div>
      
      {bottleneck && (
        <div className="absolute inset-0 bg-[#ff0055]/5 pointer-events-none animate-pulse mix-blend-screen" />
      )}
    </div>
  )
}

export function SimTaxMatrix({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [revenue, setRevenue] = useState(50) // in K

  const limitMEI = 81
  const isMeiBlown = revenue > limitMEI

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-2">
      <div className="w-full mb-6">
        <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
          <span>Receita Bruta (Faturamento)</span>
          <span className="text-white font-bold">R$ {revenue}k / ano</span>
        </div>
        <input 
          type="range" min="10" max="250" value={revenue} 
          onChange={e => {
            setRevenue(Number(e.target.value))
            if(Number(e.target.value) > limitMEI && !isMeiBlown && addLog) {
              addLog('ALERTA: Teto do MEI (81k) rompido. Transição obrigatória para Microempresa (Simples Nacional).')
            }
          }} 
          className="w-full h-1 bg-white/20 rounded outline-none" 
        />
      </div>

      <div className="flex w-full gap-2 justify-center">
        {/* MEI Speedometer */}
        <div className={`flex-1 p-2 border rounded flex flex-col items-center relative overflow-hidden transition-all ${isMeiBlown ? 'border-[#ff0055] bg-[#ff0055]/10' : 'border-[#00ffd0] bg-[#00ffd0]/10'}`}>
          <span className="text-[9px] uppercase font-bold text-white/70 mb-2">MEI</span>
          
          <div className="w-12 h-12 rounded-full border-2 border-white/20 relative flex items-center justify-center">
            {/* Ponteiro */}
            <div className="absolute w-[2px] h-5 bg-white origin-bottom -mt-5 transition-transform duration-200"
                 style={{ transform: `rotate(${Math.min(revenue / limitMEI * 180 - 90, 90)}deg)` }} />
          </div>
          
          <span className="text-[10px] font-mono mt-2" style={{ color: isMeiBlown ? '#ff0055' : '#00ffd0' }}>
            {isMeiBlown ? '⚠️ ESTOURO' : '~R$ 70/mês'}
          </span>
          {isMeiBlown && <div className="absolute inset-0 bg-[#ff0055]/20 animate-pulse pointer-events-none" />}
        </div>

        {/* Simples Speedometer */}
        <div className="flex-1 p-2 border border-white/20 rounded bg-white/5 flex flex-col items-center">
          <span className="text-[9px] uppercase font-bold text-white/70 mb-2">SIMPLES</span>
          <div className="w-12 h-12 rounded-full border-2 border-white/20 relative flex items-center justify-center">
            <div className="absolute w-[2px] h-5 bg-[#d4b87a] origin-bottom -mt-5 transition-transform duration-200"
                 style={{ transform: `rotate(${(revenue / 300) * 180 - 90}deg)` }} />
          </div>
          <span className="text-[10px] font-mono mt-2 text-[#d4b87a]">
            {isMeiBlown ? `~${(revenue * 0.06).toFixed(1)}k imposto` : 'Inativo'}
          </span>
        </div>
      </div>
    </div>
  )
}


// ============================================================================
// M2-S2: DEMONSTRAÇÕES CONTÁBEIS (5 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimAccountingLedger({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [dataFlow, setDataFlow] = useState<{id: number, type: string, val: number}[]>([])
  const [processed, setProcessed] = useState({ reg: 0, class: 0, aval: 0 })

  useEffect(() => {
    const t = setInterval(() => {
      setDataFlow(prev => {
        if(prev.length > 15) prev.shift()
        return [...prev, { 
          id: Date.now(), 
          type: Math.random() > 0.5 ? 'ENTRADA' : 'SAÍDA', 
          val: Math.floor(Math.random() * 5000) 
        }]
      })
    }, 800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        RAZÃO HOLOGRÁFICO (LEDGER)
      </div>

      <div className="flex w-full h-full gap-4 relative z-10">
        {/* Caos de Dados */}
        <div className="w-1/3 h-full border-r border-white/10 flex flex-col justify-end overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
          {dataFlow.map(d => (
            <div key={d.id} className="text-[8px] font-mono whitespace-nowrap mb-1 opacity-50" style={{ color: d.type === 'ENTRADA' ? '#00ffd0' : '#ff0055' }}>
              0x{d.id.toString(16).toUpperCase()} | {d.type} | {d.val}
            </div>
          ))}
        </div>

        {/* Laser de Processamento */}
        <div className="w-2/3 h-full flex flex-col items-center justify-center gap-4">
          <div className="flex gap-2 w-full justify-center">
            <button onClick={() => { setProcessed(p => ({...p, reg: p.reg + 1})); if(addLog) addLog('Registrando transações brutas.') }} className="px-3 py-1 border border-white/20 rounded text-[9px] hover:bg-white/10 transition">1. REGISTRAR</button>
            <button onClick={() => { setProcessed(p => ({...p, class: p.class + 1})); if(addLog) addLog('Classificando ativos e passivos.') }} className="px-3 py-1 border border-white/20 rounded text-[9px] hover:bg-white/10 transition">2. CLASSIFICAR</button>
            <button onClick={() => { setProcessed(p => ({...p, aval: p.aval + 1})); if(addLog) addLog('Avaliando desempenho (DRE/Balanço).') }} className="px-3 py-1 border border-white/20 rounded text-[9px] hover:bg-white/10 transition">3. AVALIAR</button>
          </div>
          
          <div className="w-full h-24 border border-white/10 bg-black/50 relative flex items-center justify-center overflow-hidden">
            {/* Feixe de luz se processado */}
            <div className="absolute inset-0 flex items-center">
               <div className="w-full h-1 bg-[#00ffd0]/20" />
            </div>
            {(processed.reg > 0 || processed.class > 0 || processed.aval > 0) && (
              <div className="absolute left-0 h-[2px] w-full bg-[#00ffd0] shadow-[0_0_15px_#00ffd0] animate-[scan_2s_linear_infinite]" />
            )}
            
            <div className="flex flex-col text-[10px] font-mono z-10 text-center">
              <span className="text-[#00ffd0]">Dados Tratados: {processed.reg + processed.class + processed.aval} blocos</span>
              <span className="text-white/40 text-[8px] mt-1">A Contabilidade traduz a entropia em informação acionável.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SimBalanceScale({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [ativo, setAtivo] = useState(100)
  const [passivo, setPassivo] = useState(50)
  const [pl, setPl] = useState(50)
  
  const diff = ativo - (passivo + pl)
  const angle = Math.max(-30, Math.min(30, diff * 0.5)) // max 30 degrees tilt

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        BALANÇA GYROSCÓPICA (BP)
      </div>

      <div className="flex gap-4 mb-8">
        <button onClick={() => { setAtivo(a => a + 10); if(addLog) addLog('Adquirindo Ativo (+10). Desnível gerado.') }} className="px-2 py-1 bg-white/5 border border-white/20 text-[9px] hover:bg-white/10 rounded">+ ATIVO</button>
        <button onClick={() => { setPassivo(p => p + 10); if(addLog) addLog('Contraindo Dívida (+10). Desnível gerado.') }} className="px-2 py-1 bg-white/5 border border-white/20 text-[9px] hover:bg-white/10 rounded">+ PASSIVO</button>
        <button onClick={() => { 
          if(diff !== 0) {
            if(diff > 0) setPl(p => p + diff)
            else setAtivo(a => a - diff)
            if(addLog) addLog('Balança Nivelada! Equação Fundamental restaurada (A = P + PL).')
          }
        }} className="px-2 py-1 border border-[#00ffd0] text-[#00ffd0] bg-[#00ffd0]/10 text-[9px] hover:bg-[#00ffd0]/20 rounded">
          EQUILIBRAR BALANÇO
        </button>
      </div>

      {/* Balança Base */}
      <div className="relative w-64 h-32 flex flex-col items-center perspective-[800px]">
        {/* Haste Central */}
        <div className="w-2 h-20 bg-white/20 absolute bottom-0 z-10" />
        <div className="w-8 h-4 border-2 border-white/20 rounded-t-full absolute bottom-0 bg-black z-20" />
        
        {/* Braço Articulado */}
        <div className="w-full h-2 bg-white/30 absolute bottom-20 origin-center transition-transform duration-700 ease-out flex items-center justify-between px-4"
             style={{ transform: `rotate(${angle}deg)`, backgroundColor: diff === 0 ? '#00ffd0' : '#ff0055' }}>
             
             {/* Prato Ativo */}
             <div className="w-16 h-16 border-b-2 border-l-2 border-r-2 border-white/30 rounded-b-full flex items-end justify-center pb-2 translate-y-8 relative shadow-[inset_0_-10px_20px_rgba(0,255,208,0.2)]">
               <span className="text-[10px] font-bold text-[#00ffd0]">A: {ativo}</span>
             </div>
             
             {/* Prato Passivo + PL */}
             <div className="w-16 h-16 border-b-2 border-l-2 border-r-2 border-white/30 rounded-b-full flex items-end justify-center pb-2 translate-y-8 relative shadow-[inset_0_-10px_20px_rgba(255,0,85,0.2)]">
               <span className="text-[10px] font-bold text-[#ff0055]">P+PL: {passivo + pl}</span>
             </div>
        </div>
      </div>

      {diff !== 0 && (
        <span className="absolute bottom-4 text-[9px] text-[#ff0055] animate-pulse font-mono bg-[#ff0055]/10 px-2 py-1 rounded">
          ALERTA: EQUAÇÃO DESALINHADA (Diferença: {Math.abs(diff)})
        </span>
      )}
    </div>
  )
}

export function SimIncomeWaterfall({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [drops, setDrops] = useState<{id: number, type: string, top: number}[]>([])
  
  useEffect(() => {
    let t = 0
    const interval = setInterval(() => {
      t++
      // Spawn new drop
      const newDrop = { id: Date.now(), type: 'receita', top: 0 }
      
      setDrops(prev => {
        let next = [...prev, newDrop].map(d => ({ ...d, top: d.top + 5 }))
        
        // At certain heights, change type (loss of energy)
        next = next.map(d => {
          if(d.top > 25 && d.type === 'receita' && Math.random() > 0.6) return { ...d, type: 'cmv' }
          if(d.top > 50 && d.type === 'receita' && Math.random() > 0.7) return { ...d, type: 'despesa' }
          if(d.top > 75 && d.type === 'receita' && Math.random() > 0.8) return { ...d, type: 'imposto' }
          return d
        })
        
        // Remove drops that fall out or get destroyed
        return next.filter(d => d.top < 100 && d.type === 'receita')
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full w-full relative p-4 items-center justify-center">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        CACHOEIRA TERMODINÂMICA (DRE)
      </div>

      <div className="flex gap-4 w-full max-w-[250px] h-48 relative border-x border-white/10 px-4">
         {/* Etiquetas Laterais */}
         <div className="absolute -left-12 top-[10%] text-[8px] text-white/50">Receita Bruta</div>
         <div className="absolute -right-12 top-[30%] text-[8px] text-[#ff0055]">- CMV</div>
         <div className="absolute -left-12 top-[55%] text-[8px] text-orange-400">- Despesas</div>
         <div className="absolute -right-12 top-[80%] text-[8px] text-yellow-400">- Impostos</div>
         
         {/* Esgotos / Exaustores */}
         <div className="absolute right-0 top-[25%] w-4 h-1 bg-[#ff0055] shadow-[0_0_10px_#ff0055] opacity-50" />
         <div className="absolute left-0 top-[50%] w-4 h-1 bg-orange-400 shadow-[0_0_10px_orange] opacity-50" />
         <div className="absolute right-0 top-[75%] w-4 h-1 bg-yellow-400 shadow-[0_0_10px_yellow] opacity-50" />

         {/* Queda de energia */}
         <div className="w-full h-full relative overflow-hidden">
           {drops.map(d => (
             <div key={d.id} className="absolute w-[2px] h-3 bg-[#00ffd0] shadow-[0_0_5px_#00ffd0] rounded"
                  style={{ top: `${d.top}%`, left: `${(d.id % 20) * 5}%` }} />
           ))}
         </div>
         
         {/* Tanque Base (Lucro Liquido) */}
         <div className="absolute bottom-0 left-0 w-full h-4 border-t border-white/20 bg-[#00ffd0]/20 flex items-center justify-center">
            <span className="text-[9px] font-bold text-[#00ffd0]">Lucro Líquido (Margem)</span>
         </div>
      </div>
    </div>
  )
}

export function SimCashflowTanks({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [op, setOp] = useState(60)
  const [inv, setInv] = useState(20)
  const [fin, setFin] = useState(10)

  useEffect(() => {
    // Drenagem operacional constante (Runway)
    const t = setInterval(() => {
      setOp(prev => Math.max(0, prev - 2))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col h-full w-full items-center justify-center relative p-2">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        TANQUES CRIOGÊNICOS (FLUXO CAIXA)
      </div>

      <div className="flex gap-4 items-end justify-center w-full h-32 mt-6">
        
        {/* Financiamento */}
        <div className="flex flex-col items-center">
          <span className="text-[7px] mb-1 text-white/50">FINANCIAMENTO</span>
          <div className="w-10 h-24 border border-white/20 rounded-t-lg relative overflow-hidden bg-black/50">
             <div className="absolute bottom-0 w-full bg-[#d4b87a] transition-all duration-500" style={{ height: `${fin}%` }} />
          </div>
          <button onClick={() => { setFin(f => Math.min(100, f + 20)); if(addLog) addLog('Empréstimo captado: Injeção no Fluxo de Financiamento.') }} className="mt-2 text-[8px] px-2 py-0.5 border border-[#d4b87a] text-[#d4b87a] rounded">+ CAPTAR</button>
        </div>

        {/* Transferência Fin -> Op */}
        <button onClick={() => {
          if(fin >= 10) { setFin(f => f - 10); setOp(o => Math.min(100, o + 10)); if(addLog) addLog('Transferindo caixa de Financiamento para cobrir Operação.') }
        }} className="mb-8 text-[12px] hover:text-[#00ffd0]">→</button>

        {/* Operacional (Runway) */}
        <div className="flex flex-col items-center">
          <span className="text-[7px] mb-1 text-white/50">OPERACIONAL</span>
          <div className={`w-14 h-32 border ${op < 20 ? 'border-[#ff0055] shadow-[0_0_15px_#ff0055]' : 'border-white/20'} rounded-t-lg relative overflow-hidden bg-black/50`}>
             <div className="absolute bottom-0 w-full bg-[#00ffd0] transition-all duration-300" style={{ height: `${op}%`, backgroundColor: op < 20 ? '#ff0055' : '#00ffd0' }} />
          </div>
          <span className="mt-2 text-[8px] font-mono" style={{ color: op < 20 ? '#ff0055' : '#00ffd0' }}>RUNWAY: {op}d</span>
        </div>

        {/* Transferência Op -> Inv */}
        <button onClick={() => {
          if(op >= 10) { setOp(o => o - 10); setInv(i => Math.min(100, i + 10)); if(addLog) addLog('Investindo caixa operacional em novos ativos (Capex).') }
        }} className="mb-8 text-[12px] hover:text-[#00ffd0]">→</button>

        {/* Investimento */}
        <div className="flex flex-col items-center">
          <span className="text-[7px] mb-1 text-white/50">INVESTIMENTO</span>
          <div className="w-10 h-24 border border-white/20 rounded-t-lg relative overflow-hidden bg-black/50">
             <div className="absolute bottom-0 w-full bg-orange-400 transition-all duration-500" style={{ height: `${inv}%` }} />
          </div>
          <button onClick={() => { setInv(i => Math.max(0, i - 10)); setOp(o => Math.min(100, o + 10)); if(addLog) addLog('Venda de Ativos: Liquidez gerada pelo Fluxo de Investimentos.') }} className="mt-2 text-[8px] px-2 py-0.5 border border-orange-400 text-orange-400 rounded">LIQUIDAR</button>
        </div>

      </div>
    </div>
  )
}

export function SimDoubleEntryOrbit({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [particles, setParticles] = useState<{id: number, angle: number}[]>([])

  const spawnTransaction = () => {
    if(addLog) addLog('Transação realizada: Débito e Crédito simultâneos gerados (Partidas Dobradas).')
    setParticles(p => [...p, { id: Date.now(), angle: Math.random() * 360 }])
  }

  useEffect(() => {
    const t = setInterval(() => {
      setParticles(prev => prev.map(p => ({ ...p, angle: (p.angle + 2) % 360 })))
    }, 50)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col h-full w-full items-center justify-center relative p-4">
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 tracking-widest z-20">
        ACELERADOR DE PARTÍCULAS (MÉTODO DAS PARTIDAS DOBRADAS)
      </div>

      <button onClick={spawnTransaction} className="absolute bottom-4 z-30 px-3 py-1 border border-white/30 text-[9px] hover:bg-white/10 rounded tracking-widest">
        DISPARAR TRANSAÇÃO
      </button>

      <div className="relative w-48 h-48 flex items-center justify-center perspective-[800px]" style={{ transform: 'rotateX(60deg)' }}>
        
        {/* Núcleo (Patrimônio) */}
        <div className="absolute w-8 h-8 bg-white/10 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/30 flex items-center justify-center" style={{ transform: 'rotateX(-60deg)' }}>
           <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>

        {/* Órbita 1 (Débito) */}
        <div className="absolute w-32 h-32 rounded-full border border-[#00ffd0]/20" />
        {/* Órbita 2 (Crédito) */}
        <div className="absolute w-48 h-48 rounded-full border border-[#ff0055]/20" />

        {/* Partículas acopladas */}
        {particles.map(p => {
          // Débito na orbita interna
          const rad1 = p.angle * (Math.PI / 180)
          const x1 = Math.cos(rad1) * 64 // half of 128 (w-32)
          const y1 = Math.sin(rad1) * 64
          
          // Crédito na orbita externa (diametralmente oposto)
          const rad2 = (p.angle + 180) * (Math.PI / 180)
          const x2 = Math.cos(rad2) * 96 // half of 192 (w-48)
          const y2 = Math.sin(rad2) * 96

          return (
            <React.Fragment key={p.id}>
              {/* Partícula Débito */}
              <div className="absolute w-3 h-3 bg-[#00ffd0] rounded-full shadow-[0_0_10px_#00ffd0]"
                   style={{ transform: `translate(${x1}px, ${y1}px) rotateX(-60deg)` }} />
              {/* Partícula Crédito */}
              <div className="absolute w-3 h-3 bg-[#ff0055] rounded-full shadow-[0_0_10px_#ff0055]"
                   style={{ transform: `translate(${x2}px, ${y2}px) rotateX(-60deg)` }} />
              
              {/* Feixe de conexão visual entre as duas para provar dependência */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ transform: 'rotateX(0deg)' }}>
                 <line x1={x1 + 96} y1={y1 + 96} x2={x2 + 96} y2={y2 + 96} stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
              </svg>
            </React.Fragment>
          )
        })}

      </div>
    </div>
  )
}


// ============================================================================
// M2-S3: MATEMÁTICA FINANCEIRA (4 SIMULAÇÕES 6D NASA-LEVEL)
// ============================================================================

export function SimTimeDilator({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [years, setYears] = useState(5)
  
  useEffect(() => {
    if(addLog) addLog(`Malha temporal ajustada para Horizonte de ${years} anos`)
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
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${Math.max(years, 1)} ${maxVal}`} preserveAspectRatio="none">
          {/* Malha de fundo que se curva */}
          {Array.from({length: 10}).map((_,i) => (
             <path key={i} d={`M 0 ${maxVal - (maxVal/10)*i} Q ${years/2} ${maxVal - (maxVal/10)*i - (years*years*i)} ${years} ${maxVal - (maxVal/10)*i}`} fill="none" stroke="rgba(255,255,255,0.02)" />
          ))}
          
          <polyline 
            points={data.map(d => `${d.x},${maxVal - d.simples}`).join(' ')}
            fill="none" stroke="#cbd5e1" strokeWidth="0.05" strokeDasharray="0.1,0.1" 
          />
          <polyline 
            points={data.map(d => `${d.x},${maxVal - d.composto}`).join(' ')}
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
    if(active && addLog) addLog(`Anomalia gravitacional dobrando massa em ${rule72} anos (Regra dos 72)`)
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
    if(addLog) addLog(`Espectrômetro VPL realinhado. Desvio: R$ ${vpl.toFixed(2)}`)
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
               <path d="M 0 32 Q 50 32 100 32 T 250 32" fill="none" stroke={isViable ? '#00ffd0' : '#ff0055'} strokeWidth={Math.abs(vpl)/50} className="opacity-60" style={{ filter: `drop-shadow(0 0 8px ${isViable ? '#00ffd0' : '#ff0055'})` }}/>
            </svg>
            <div className={`z-10 px-4 py-2 rounded border backdrop-blur-lg ${isViable ? 'border-[#00ffd0]/50 bg-[#00ffd0]/10 text-[#00ffd0]' : 'border-[#ff0055]/50 bg-[#ff0055]/10 text-[#ff0055]'}`}>
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
      if(isDanger) addLog(`ALERTA CRÍTICO: Integridade do giroscópio corporativo comprometida!`)
      else if(!isHealthy) addLog(`Aviso: Desestabilização térmica detectada.`)
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
                 style={{ borderColor: color, animation: `spin-slow ${animDuration} linear infinite`, opacity: 0.6 }} />
            <div className="absolute inset-0 rounded-full border-2" 
                 style={{ borderColor: color, animation: `spin-slow ${animDuration} linear infinite reverse`, transform: 'rotateX(60deg)', opacity: 0.4 }} />
            <div className="absolute inset-0 rounded-full border-2" 
                 style={{ borderColor: color, animation: `spin-slow ${animDuration} linear infinite`, transform: 'rotateY(60deg)', opacity: 0.4 }} />
            
            {/* Núcleo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-[0_0_40px_currentColor] flex items-center justify-center" style={{ color: color, backgroundColor: color }}>
              {isDanger && <div className="w-full h-full rounded-full bg-white animate-ping opacity-50" />}
            </div>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .transform-style-3d { transform-style: preserve-3d; }
      `}} />
    </div>
  )
}


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
    if(addLog) addLog(`Comutador histórico: ${eras[activeEra].name} ativada.`)
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
                  <div key={i} className="w-4 h-4 bg-[#d4b87a] animate-[slide-right_2s_linear_infinite]" style={{ animationDelay: `${i * 0.6}s` }} />
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
                    style={{ transform: `rotate(${i * 45}deg)` }} />
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
                        transform: `rotate(${angle}deg) translateY(${dist}px)`,
                        animation: `pulse-opacity ${1+Math.random()*2}s infinite`
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
            className={`px-3 py-2 text-[9px] border rounded transition-all ${activeEra === i ? 'bg-white/10 shadow-[0_0_10px_currentColor]' : 'opacity-40 hover:opacity-100 border-white/20'}`}
            style={{ color: activeEra === i ? era.color : 'white', borderColor: activeEra === i ? era.color : '' }}
          >
            {era.name}
          </button>
        ))}
      </div>
      <div className="mt-4 text-[10px] text-white/70 text-center max-w-sm h-8">
        {eras[activeEra].desc}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-right { 0% { transform: translateX(-40px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(40px); opacity: 0; } }
        @keyframes pulse-opacity { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
      `}} />
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
      if(isSale) addLog(`Transação liberada. Razão de Valor: ${valueRatio.toFixed(2)}`)
      else addLog(`Transação retida. Custo excede percepção de benefício.`)
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
                style={{ transform: `rotate(${(cost - benefitTotal) * 0.15}deg)` }}>
              
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
              <div className={`text-[14px] font-bold tracking-widest ${isSale ? 'text-[#00ffd0]' : 'text-[#ff0055]'}`}>
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
        <div onClick={() => setActiveLayer(2)} className={`absolute w-64 h-64 rounded-full border-2 transition-all cursor-pointer ${activeLayer >= 2 ? 'border-[#00ffd0] shadow-[inset_0_0_20px_rgba(0,255,208,0.2)]' : 'border-white/10 hover:border-white/30'}`} />
        
        {/* Layer 2: Desejo (Middle) */}
        <div onClick={() => setActiveLayer(1)} className={`absolute w-40 h-40 rounded-full border-2 transition-all cursor-pointer ${activeLayer >= 1 ? 'border-[#d4b87a] shadow-[inset_0_0_20px_rgba(212,184,122,0.2)]' : 'border-white/20 hover:border-white/40'}`} />

        {/* Layer 1: Necessidade (Core) */}
        <div onClick={() => setActiveLayer(0)} className={`absolute w-16 h-16 rounded-full border-2 transition-all cursor-pointer ${activeLayer >= 0 ? 'border-[#ff0055] bg-[#ff0055]/20 shadow-[0_0_30px_#ff0055]' : 'border-white/40 hover:border-white/60'}`} />

        {/* Connection Ray (only when Demanda is reached) */}
        {activeLayer === 2 && (
          <div className="absolute w-[2px] h-32 bg-white/80 origin-bottom animate-ping" style={{ transform: 'rotate(45deg) translateY(-32px)' }} />
        )}
      </div>

      <div className="mt-8 flex gap-4 w-full max-w-lg z-20">
        <div className={`flex-1 p-3 rounded border transition-all ${activeLayer >= 0 ? 'border-[#ff0055]/50 bg-[#ff0055]/10' : 'border-white/10 opacity-30'}`}>
          <div className="text-[10px] text-[#ff0055] font-bold mb-1">1. NECESSIDADE</div>
          <div className="text-[8px] text-white/70">Fome, segurança, pertencimento. É universal e inata. O marketing não cria.</div>
        </div>
        <div className={`flex-1 p-3 rounded border transition-all ${activeLayer >= 1 ? 'border-[#d4b87a]/50 bg-[#d4b87a]/10' : 'border-white/10 opacity-30'}`}>
          <div className="text-[10px] text-[#d4b87a] font-bold mb-1">2. DESEJO</div>
          <div className="text-[8px] text-white/70">A forma cultural que a necessidade assume. Ex: Necessidade de status = Desejo de um Rolex.</div>
        </div>
        <div className={`flex-1 p-3 rounded border transition-all ${activeLayer >= 2 ? 'border-[#00ffd0]/50 bg-[#00ffd0]/10' : 'border-white/10 opacity-30'}`}>
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
    if(addLog) addLog(`Paradigma de liderança alterado: ${theories[active].name}`)
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
                 style={{ left: `${20 + i * 15}%`, transform: isActive ? 'scale(1.5) translateY(-10px)' : 'scale(1)' }}>
              
              <button 
                onClick={() => setActive(i)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer z-10 ${isActive ? 'shadow-[0_0_20px_currentColor]' : ''}`}
                style={{ 
                  color: t.color, 
                  borderColor: isActive || isPast ? t.color : 'rgba(255,255,255,0.2)',
                  backgroundColor: isActive ? `${t.color}20` : 'black'
                }}
              >
                <div className={`w-2 h-2 rounded-full transition-all ${isActive || isPast ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: t.color }} />
              </button>
              
              <div className={`mt-4 text-center transition-all ${isActive ? 'opacity-100' : 'opacity-30'}`}>
                <div className="text-[8px] font-bold" style={{ color: t.color }}>{t.name}</div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-8 p-4 border rounded max-w-lg w-full text-center transition-all duration-500" 
           style={{ borderColor: `${theories[active].color}40`, backgroundColor: `${theories[active].color}10` }}>
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
    if(addLog) addLog(`Fase de equipe: ${stages[stage]}`)
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
                  style={{ transform: `translate(${Math.cos(i*45)*40}px, ${Math.sin(i*45)*40}px)` }} />
          ))}

          {/* Storming */}
          {stage === 1 && Array.from({length: 8}).map((_, i) => (
             <div key={i} className="absolute w-4 h-4 bg-[#ff0055] rounded shadow-[0_0_10px_#ff0055] animate-[spin_1s_linear_infinite]"
                  style={{ 
                    left: `${10 + Math.random()*80}%`, top: `${10 + Math.random()*80}%`,
                    animationDuration: `${0.5 + Math.random()}s` 
                  }} />
          ))}

          {/* Norming */}
          {stage === 2 && Array.from({length: 8}).map((_, i) => (
             <div key={i} className="absolute w-4 h-4 bg-[#d4b87a] rounded-sm transition-all duration-1000"
                  style={{ transform: `rotate(${i*45}deg) translateY(-60px)` }} />
          ))}

          {/* Performing */}
          {stage === 3 && (
            <div className="absolute inset-0 animate-[spin_4s_linear_infinite] flex items-center justify-center">
              <div className="w-20 h-20 bg-[#00ffd0]/20 rounded-full shadow-[0_0_30px_#00ffd0]" />
              {Array.from({length: 8}).map((_, i) => (
                 <div key={i} className="absolute w-3 h-3 bg-[#00ffd0] rounded-full shadow-[0_0_10px_#00ffd0]"
                      style={{ transform: `rotate(${i*45}deg) translateY(-40px)` }} />
              ))}
            </div>
          )}

          {/* Adjourning */}
          {stage === 4 && Array.from({length: 8}).map((_, i) => (
             <div key={i} className="absolute w-2 h-2 bg-white rounded-full transition-all duration-1000 animate-ping"
                  style={{ transform: `translate(${Math.cos(i*45)*100}px, ${Math.sin(i*45)*100}px)` }} />
          ))}
        </div>

        {/* Controles e Textos */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex gap-2">
            {['Forming', 'Storming', 'Norming', 'Performing', 'Adjourning'].map((s, i) => (
              <button key={i} onClick={() => setStage(i)}
                      className={`px-2 py-1 text-[9px] border rounded transition-all ${stage === i ? 'bg-white/20 border-white text-white' : 'border-white/10 text-white/40 hover:text-white'}`}>
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
    if(addLog) addLog(`Calibração Motora: Extrínseca [${reward}] | Intrínseca [${purpose}]`)
  }, [reward, purpose])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono">
      <div className="absolute top-4 left-4 text-[9px] text-[#00ffd0]">MOTOR DE ALTA PERFORMANCE (DANIEL PINK)</div>

      <div className="w-full max-w-xl flex gap-10 items-end justify-center mb-10">
        
        {/* Bateria Extrínseca */}
        <div className="flex flex-col items-center">
          <div className="text-[9px] text-[#ff0055] mb-2 tracking-widest">MOTIVAÇÃO EXTRÍNSECA (Bônus, Dinheiro)</div>
          <div className="relative w-16 h-32 border-2 border-[#ff0055] rounded-lg overflow-hidden flex flex-col-reverse">
            <div className="w-full bg-[#ff0055] transition-all duration-300" style={{ height: `${reward}%` }} />
          </div>
          <input type="range" min="0" max="100" value={reward} onChange={(e)=>setReward(Number(e.target.value))} className="mt-4 accent-[#ff0055] w-24" />
        </div>

        {/* Gerador Central */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full border-4 flex items-center justify-center overflow-hidden transition-all duration-300"
               style={{ 
                 borderColor: output > 100 ? '#00ffd0' : 'rgba(255,255,255,0.2)',
                 boxShadow: output > 100 ? `0 0 ${output}px rgba(0,255,208,0.5)` : 'none'
               }}>
            {/* Plasma Interno */}
            <div className="absolute inset-0 bg-[#00ffd0] transition-all duration-300 opacity-20"
                 style={{ 
                   transform: `scale(${Math.min(output/100, 1)})`,
                   animation: output > 50 ? `pulse-opacity ${200/output}s infinite` : 'none'
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
            <div className="w-full bg-[#00ffd0] transition-all duration-300 shadow-[0_0_15px_#00ffd0]" style={{ height: `${purpose}%` }} />
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
    if(addLog) addLog(`Cálculo nodal: ${members} membros = ${channels} canais de comunicação cruzada.`)
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
                   <line key={`${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,0,85,0.4)" strokeWidth="0.5" />
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
                  transform: `translate(${Math.cos((i * 2 * Math.PI) / members) * 130}px, ${Math.sin((i * 2 * Math.PI) / members) * 130}px)` 
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
              className={`h-10 ${layer.w} mb-1 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all duration-700 border-b-4`}
              style={{ 
                backgroundColor: isBuilt ? `${layer.color}20` : 'rgba(255,255,255,0.05)',
                borderColor: isBuilt ? layer.color : 'rgba(255,255,255,0.1)',
                color: isBuilt ? layer.color : 'rgba(255,255,255,0.3)',
                transform: isBuilt ? 'translateY(0) scale(1)' : `translateY(${(4-i)*20}px) scale(0.95) rotate(${(i%2==0?1:-1)*5}deg)`,
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
    if(addLog) addLog(`Topologia de Liderança ativada: ${style.toUpperCase()}`)
  }, [style])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      <div className="absolute top-4 left-4 text-[9px] text-[#a855f7]">AMBIENTES VUCA/BANI E LIDERANÇA ÁGIL</div>

      <div className="flex gap-4 mb-8 z-20">
        <button onClick={()=>setStyle('comando')} className={`px-4 py-2 border text-[10px] ${style==='comando'?'bg-white text-black':'text-white border-white/20'}`}>Comando Centralizado</button>
        <button onClick={()=>setStyle('distribuido')} className={`px-4 py-2 border text-[10px] ${style==='distribuido'?'bg-[#00ffd0] text-black border-[#00ffd0]':'text-white border-white/20'}`}>Autoridade Distribuída</button>
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
                     transform: `rotate(${i*30}deg) translateY(-80px)`,
                     animationDelay: `${Math.random()*2}s`
                   }} />
            ))}
            
            {/* Linhas vermelhas de estresse */}
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="absolute top-1/2 left-1/2 w-[1px] h-32 bg-[#ff0055]/50 origin-bottom"
                   style={{ transform: `rotate(${i*60}deg) translateY(-32px)` }} />
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
               <div key={i} className="absolute flex items-center justify-center" style={{ top: `${pos.y}%`, left: `${pos.x}%` }}>
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
                style={{ transform: `rotateY(${activeFilter * 15}deg) rotateX(${activeFilter * -10}deg)` }}>
             <div className="text-white font-bold tracking-widest">ARGUMENTO</div>
           </div>
        ) : (
           // Argumento estilhaçado
           <div className="relative w-32 h-32">
             {Array.from({length: 12}).map((_, i) => (
               <div key={i} className="absolute w-8 h-8 border border-[#ff0055] bg-[#ff0055]/20 animate-ping"
                    style={{ 
                      top: '50%', left: '50%',
                      transform: `translate(-50%, -50%) rotate(${Math.random()*360}deg) translate(${40 + Math.random()*60}px)`,
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
             boxShadow: `inset 0 0 50px ${lens===0 ? 'rgba(255,0,85,0.1)' : lens===1 ? 'rgba(0,255,208,0.1)' : lens===2 ? 'rgba(212,184,122,0.1)' : 'rgba(168,85,247,0.1)'}`
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
            <div className="text-[10px] text-center max-w-[150px]">"É justificável envenenar clientes para economizar?" -&gt; NÃO.</div>
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
        <button onClick={()=>setLens(0)} className={`px-2 py-1 text-[9px] border transition-all ${lens===0 ? 'bg-[#ff0055]/20 border-[#ff0055] text-[#ff0055]' : 'border-white/20'}`}>Utilitarismo</button>
        <button onClick={()=>setLens(1)} className={`px-2 py-1 text-[9px] border transition-all ${lens===1 ? 'bg-[#00ffd0]/20 border-[#00ffd0] text-[#00ffd0]' : 'border-white/20'}`}>Deontologia</button>
        <button onClick={()=>setLens(2)} className={`px-2 py-1 text-[9px] border transition-all ${lens===2 ? 'bg-[#d4b87a]/20 border-[#d4b87a] text-[#d4b87a]' : 'border-white/20'}`}>Virtude</button>
        <button onClick={()=>setLens(3)} className={`px-2 py-1 text-[9px] border transition-all ${lens===3 ? 'bg-[#a855f7]/20 border-[#a855f7] text-[#a855f7]' : 'border-white/20'}`}>Cuidado</button>
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
                     animation: `smith-flow 3s ease-in-out infinite alternate`,
                     animationDelay: `${Math.random()}s`,
                     left: `${Math.random()*100}%`,
                     top: `${Math.random()*100}%`
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
        <button onClick={()=>setSystem(0)} className={`px-3 py-1 text-[9px] border ${system===0?'border-[#00ffd0] text-[#00ffd0]':'border-white/20 text-white/40'}`}>Adam Smith</button>
        <button onClick={()=>setSystem(1)} className={`px-3 py-1 text-[9px] border ${system===1?'border-[#ff0055] text-[#ff0055]':'border-white/20 text-white/40'}`}>Karl Marx</button>
        <button onClick={()=>setSystem(2)} className={`px-3 py-1 text-[9px] border ${system===2?'border-white text-white':'border-white/20 text-white/40'}`}>John Rawls</button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smith-flow { 0% { transform: translateY(0); } 100% { transform: translateY(-50px) translateX(20px); } }
        @keyframes slide-up { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-30px); opacity: 0; } }
      `}} />
    </div>
  )
}

export function SimEasternAesthetics({ theme, addLog }: { theme: any, addLog?: (msg: string) => void }) {
  const [zen, setZen] = useState(0) // 0 to 100

  useEffect(() => {
    if(addLog) addLog(`Taxa de entropia orgânica Wabi-Sabi: ${zen}%`)
  }, [zen])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] font-mono overflow-hidden">
      <div className="absolute top-4 right-4 text-[9px] text-[#d4b87a]">ESTÉTICA WABI-SABI E WU WEI</div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
         {/* O Objeto (Começa rígido/tech, vira orgânico/imperfeito) */}
         <div 
           className="transition-all duration-700 ease-out flex items-center justify-center"
           style={{
             width: `${150 + (zen * 0.5)}px`,
             height: `${150 + (zen * 0.2)}px`,
             borderRadius: `${(zen * 0.5)}%`,
             backgroundColor: zen === 0 ? '#ffffff' : 'transparent',
             border: `${1 + (zen * 0.05)}px solid rgba(212, 184, 122, ${0.2 + (zen * 0.008)})`,
             transform: `rotate(${zen * 0.4}deg)`,
             boxShadow: zen > 50 ? `inset 0 0 ${zen}px rgba(212,184,122,0.1)` : 'none'
           }}
         >
           <div className="transition-all duration-700"
                style={{ 
                  opacity: 1 - (zen/100),
                  transform: `scale(${1 - (zen/100)})`
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
