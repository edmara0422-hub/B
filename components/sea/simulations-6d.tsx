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
