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
// Cap 1: Simulador de Alinhamento Estratégico (IT-Business)
// ──────────────────────────────────────────────────────────────────────────
export function SimAlignIT({ theme, addLog }: SimulationProps) {
  const [alignment, setAlignment] = useState(50)
  
  return (
    <div className="space-y-6 select-none relative z-10 w-full h-full flex flex-col justify-center">
      <div className="relative w-full h-32 md:h-48 flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/5">
        
        {/* Connection Axis */}
        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Core Link */}
        <motion.div 
          className="absolute h-1.5 rounded-full"
          style={{ background: theme?.primary }}
          animate={{ 
            width: `${alignment}%`,
            opacity: alignment > 80 ? 1 : 0.4
          }}
          transition={{ type: 'spring', stiffness: 50 }}
        />

        {/* Sphere IT */}
        <motion.div 
          className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md mix-blend-screen"
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${theme?.primary}80, transparent)`,
            boxShadow: `0 0 ${alignment}px ${theme?.primary}40`,
            left: `calc(${50 - (alignment/2)}% - 40px)`
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Cpu className="text-white/80 h-6 w-6" />
        </motion.div>

        {/* Sphere Business */}
        <motion.div 
          className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md mix-blend-screen"
          style={{ 
            background: `radial-gradient(circle at 70% 30%, ${theme?.secondary}80, transparent)`,
            boxShadow: `0 0 ${alignment}px ${theme?.secondary}40`,
            right: `calc(${50 - (alignment/2)}% - 40px)`
          }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Activity className="text-white/80 h-6 w-6" />
        </motion.div>
        
        {alignment > 90 && (
           <motion.div 
             className="absolute w-24 h-24 rounded-full mix-blend-plus-lighter"
             style={{ background: `radial-gradient(circle, ${theme?.primary}90, transparent)` }}
             animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
           />
        )}
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
           <div className="p-3 bg-black/40 rounded-xl border border-white/5">
             <span className="text-[8px] uppercase tracking-widest text-white/40 block mb-1">Vazão Estratégica</span>
             <span className="text-xl font-mono text-green-400 font-bold">{Math.round(alignment * 1.8)} TB/s</span>
           </div>
           <div className="p-3 bg-black/40 rounded-xl border border-white/5">
             <span className="text-[8px] uppercase tracking-widest text-white/40 block mb-1">Atrito (Gargalo)</span>
             <span className="text-xl font-mono text-red-400 font-bold">{100 - alignment}%</span>
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
      <div className="relative w-full h-48 md:h-56 bg-[#050505]/60 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Radar Rings */}
        <div className="absolute w-32 h-32 rounded-full border border-white/10 animate-ping-slow" />
        <div className="absolute w-48 h-48 rounded-full border border-white/5 border-dashed animate-spin-slow" />
        
        {/* Core */}
        <motion.div 
          className="absolute w-12 h-12 rounded-full blur-xl mix-blend-screen"
          style={{ background: roi > 250 ? '#00ffd0' : theme?.primary }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* 4 Nodes */}
        {Object.entries(data).map(([key, val], i) => {
           const angle = (i * Math.PI) / 2
           const distance = (val / 100) * 80
           const x = Math.cos(angle) * distance
           const y = Math.sin(angle) * distance
           return (
             <motion.div
               key={key}
               className="absolute w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_white]"
               animate={{ x, y }}
               transition={{ type: 'spring', stiffness: 40 }}
             >
                <div className="absolute -bottom-4 text-[8px] font-mono text-white/50 uppercase">{key}</div>
             </motion.div>
           )
        })}
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen">
          <motion.polygon 
             fill={theme?.primary}
             fillOpacity="0.1"
             stroke={theme?.primary}
             strokeWidth="2"
             animate={{ 
               points: Object.values(data).map((val, i) => {
                 const a = (i * Math.PI) / 2
                 const d = (val / 100) * 80
                 return `${100 + Math.cos(a)*d},${100 + Math.sin(a)*d}` // assuming center 100,100 (rough logic)
               }).join(' ')
             }}
          />
        </svg>
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
                className="h-1 rounded bg-white/10"
                style={{ accentColor: theme?.primary }}
             />
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex justify-between items-center">
         <div>
            <span className="text-[8px] uppercase tracking-widest text-[#00ffd0] block">Estimativa ROI 6D</span>
            <span className="text-[9px] text-white/40 block mt-0.5">Potencial Exponencial</span>
         </div>
         <motion.span 
           key={roi}
           initial={{ scale: 1.5, color: '#fff' }}
           animate={{ scale: 1, color: '#00ffd0' }}
           className="text-3xl font-mono font-black"
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
      <div className="relative w-full h-48 md:h-56 bg-black rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center group perspective-[1000px]">
        
        {/* 3D Grid */}
        <motion.div 
           className="absolute inset-x-0 bottom-0 h-[150%] w-[150%] origin-bottom"
           style={{ 
             background: `
               linear-gradient(to top, ${theme?.primary}40, transparent 40%),
               linear-gradient(to right, ${theme?.primary}20 1px, transparent 1px),
               linear-gradient(to bottom, ${theme?.primary}20 1px, transparent 1px)
             `,
             backgroundSize: '100% 100%, 20px 20px, 20px 20px',
             rotateX: 65,
             y: '20%'
           }}
           animate={{
             backgroundPosition: ['0px 0px', '0px 20px']
           }}
           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Neural Core */}
        <Brain className="relative z-10 w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
        
        {/* Synapses Firing */}
        {Array.from({ length: Math.floor(params / 5) }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ 
              x: (Math.random() - 0.5) * 200, 
              y: (Math.random() - 0.5) * 150,
              opacity: [0, 1, 0]
            }}
            transition={{ duration: Math.random() * 2 + 0.5, repeat: Infinity }}
          />
        ))}
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
          className="w-full h-1 rounded bg-white/10"
          style={{ accentColor: theme?.primary }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-black/50 border border-white/5 rounded-lg">
           <span className="text-[8px] uppercase text-white/40 block">Latência de Inferência</span>
           <span className="text-sm font-mono font-bold" style={{ color: isHeavy ? '#f87171' : '#4ade80' }}>
             {Math.round(params * 1.5)} ms/token
           </span>
        </div>
        <div className="p-3 bg-black/50 border border-white/5 rounded-lg">
           <span className="text-[8px] uppercase text-white/40 block">Consumo VRAM</span>
           <span className="text-sm font-mono font-bold text-[#00ffd0]">
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
      <div className="relative w-full h-48 md:h-56 bg-gradient-to-b from-[#020202] to-[#0c0f1a] rounded-2xl border border-white/5 flex overflow-hidden">
         
         <div className="absolute inset-0 flex flex-col justify-around py-6 px-4">
            
            {/* Track 1: Normal Flow */}
            <div className="relative h-4 bg-white/5 rounded-full flex items-center px-1 overflow-hidden">
               <motion.div 
                 className="w-16 h-2 rounded-full"
                 style={{ background: theme?.primary }}
                 animate={{ x: [0, 300] }}
                 transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
               />
            </div>
            
            {/* Track 2: Edge Flow */}
            <div className="relative h-4 bg-white/5 rounded-full flex items-center px-1 overflow-hidden" style={{ opacity: switches.edge ? 1 : 0.2 }}>
               <motion.div 
                 className="w-24 h-2 rounded-full bg-[#00ffd0] shadow-[0_0_10px_#00ffd0]"
                 animate={switches.edge ? { x: [0, 300] } : {}}
                 transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
               />
               {!switches.edge && <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-red-500 uppercase">Blocked</span>}
            </div>
            
            {/* Track 3: Auto-Scale Multi-Flow */}
            <div className="relative h-4 bg-white/5 rounded-full flex items-center px-1 overflow-hidden" style={{ opacity: switches.autoScale ? 1 : 0.2 }}>
               {switches.autoScale && Array.from({length: 5}).map((_, i) => (
                 <motion.div 
                   key={i}
                   className="absolute w-8 h-2 rounded-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]"
                   animate={{ x: [-50, 300] }}
                   transition={{ duration: Math.random()*1 + 1, repeat: Infinity, delay: i * 0.2, ease: 'linear' }}
                 />
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
          className={`p-4 rounded-xl border transition-all ${switches.edge ? 'bg-[#00ffd0]/10 border-[#00ffd0] shadow-[0_0_20px_rgba(0,255,208,0.2)]' : 'bg-black/40 border-white/10'}`}
        >
           <Network className={`h-6 w-6 mb-2 ${switches.edge ? 'text-[#00ffd0]' : 'text-white/30'}`} />
           <span className="text-[10px] uppercase font-mono block text-left">Deploy Edge</span>
        </button>

        <button 
          onClick={() => {
             setSwitches(s => ({...s, autoScale: !s.autoScale}))
             if(addLog) addLog(`Comutação Auto-Scale: ${!switches.autoScale ? 'ON' : 'OFF'}`)
          }}
          className={`p-4 rounded-xl border transition-all ${switches.autoScale ? 'bg-[#ff00ff]/10 border-[#ff00ff] shadow-[0_0_20px_rgba(255,0,255,0.2)]' : 'bg-black/40 border-white/10'}`}
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
        v += 2
        setProgress(v)
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
      <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
         
         {/* Rings */}
         <motion.div 
           className="absolute inset-0 rounded-full border-4 border-t-transparent border-white/10"
           animate={{ rotate: ignited ? 360 : 0 }}
           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
         />
         <motion.div 
           className="absolute inset-4 rounded-full border-2 border-b-transparent border-[#d4b87a]/40"
           animate={{ rotate: ignited ? -360 : 0 }}
           transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
         />
         <motion.div 
           className="absolute inset-8 rounded-full border border-x-transparent border-[#00ffd0]/30"
           animate={{ rotate: ignited ? 720 : 0 }}
           transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
         />

         {/* Core Button */}
         <button
           onClick={() => {
              if(!ignited) {
                 setIgnited(true)
                 if(addLog) addLog('Ignition sequence initiated. Building MVP...')
              }
           }}
           className="relative z-10 w-24 h-24 rounded-full bg-black/60 border border-white/20 flex flex-col items-center justify-center hover:bg-white/5 active:scale-95 transition-all overflow-hidden"
         >
           {ignited ? (
             <span className="text-xl font-black font-mono text-[#00ffd0]">{progress}%</span>
           ) : (
             <>
               <Rocket className="text-white/60 h-6 w-6 mb-1" />
               <span className="text-[9px] uppercase tracking-widest font-mono text-white/50">Ignição</span>
             </>
           )}
           
           {/* Progress Fill */}
           {ignited && (
             <div className="absolute bottom-0 inset-x-0 bg-[#00ffd0]/20" style={{ height: `${progress}%` }} />
           )}
         </button>

         {/* Glow when ignited */}
         <AnimatePresence>
           {ignited && (
             <motion.div 
               className="absolute inset-0 rounded-full mix-blend-screen pointer-events-none"
               style={{ background: `radial-gradient(circle, ${theme?.primary} 0%, transparent 60%)` }}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: [0, 0.5, 0], scale: 1.2 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5, repeat: Infinity }}
             />
           )}
         </AnimatePresence>
      </div>

      <div className="text-center">
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

  const handleH1 = (v: number) => {
     if(v + h2 > 100) setH2(100 - v)
     setH1(v)
  }
  const handleH2 = (v: number) => {
     if(v + h1 > 100) setH1(100 - v)
     setH2(v)
  }

  const ilc = Math.round((h1*0.5) + (h2*1.2) + (h3*3))

  return (
    <div className="space-y-6 w-full h-full flex flex-col justify-center">
       <div className="flex items-end justify-around h-48 md:h-56 bg-black/40 rounded-2xl border border-white/5 p-4 relative overflow-hidden">
         
         <div className="absolute inset-0 flex flex-col">
            {[20, 40, 60, 80].map(l => (
              <div key={l} className="flex-1 border-b border-white/[0.02] w-full" />
            ))}
         </div>

         <div className="relative w-16 h-full flex items-end justify-center z-10 group">
           <motion.div className="w-full rounded-t-sm" style={{ background: '#cbd5e1' }} animate={{ height: `${h1}%` }} transition={{ type: 'spring' }} />
           <span className="absolute -bottom-6 text-[9px] font-mono text-white/50">H1 (Core)</span>
           <span className="absolute bottom-2 text-xs font-bold text-black drop-shadow-md">{h1}%</span>
         </div>
         <div className="relative w-16 h-full flex items-end justify-center z-10">
           <motion.div className="w-full rounded-t-sm" style={{ background: theme?.primary }} animate={{ height: `${h2}%` }} transition={{ type: 'spring' }} />
           <span className="absolute -bottom-6 text-[9px] font-mono text-white/50">H2 (Expansão)</span>
           <span className="absolute bottom-2 text-xs font-bold text-black drop-shadow-md">{h2}%</span>
         </div>
         <div className="relative w-16 h-full flex items-end justify-center z-10">
           <motion.div className="w-full rounded-t-sm bg-[#00ffd0]" animate={{ height: `${h3}%` }} transition={{ type: 'spring' }} />
           <span className="absolute -bottom-6 text-[9px] font-mono text-white/50">H3 (Disrupção)</span>
           <span className="absolute bottom-2 text-xs font-bold text-black drop-shadow-md">{h3}%</span>
         </div>
       </div>

       <div className="space-y-4 pt-4">
         <input type="range" min="0" max="100" value={h1} onChange={e => handleH1(Number(e.target.value))} className="w-full h-1 rounded bg-[#cbd5e1]/30" style={{ accentColor: '#cbd5e1' }} />
         <input type="range" min="0" max="100" value={h2} onChange={e => handleH2(Number(e.target.value))} className="w-full h-1 rounded bg-[#d4b87a]/30" style={{ accentColor: theme?.primary }} />
       </div>

       <div className="p-3 bg-[#00ffd0]/10 rounded-xl border border-[#00ffd0]/20 flex justify-between items-center">
         <span className="text-[9px] uppercase tracking-widest text-[#00ffd0]">Índice de Longevidade (ILC)</span>
         <span className="text-xl font-mono font-bold text-[#00ffd0]">{ilc}</span>
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
      <div className="relative w-full h-48 md:h-56 bg-[#050505] rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
        
        {/* The Shield */}
        <motion.div 
          className="absolute rounded-full border-[4px]"
          style={{ 
            borderColor: safe ? '#4ade80' : '#f87171',
            opacity: shield / 100,
            width: '180px', height: '180px',
            boxShadow: safe ? 'inset 0 0 40px rgba(74,222,128,0.3), 0 0 40px rgba(74,222,128,0.3)' : 'inset 0 0 20px rgba(248,113,113,0.5)'
          }}
          animate={!safe ? { x: [-2, 2, -2], y: [1, -1, 1] } : { scale: [1, 1.02, 1] }}
          transition={!safe ? { duration: 0.1, repeat: Infinity } : { duration: 2, repeat: Infinity }}
        />

        {/* Team Center */}
        <div className="z-10 flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20"><IconUser s={16}/></div>
           <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]"><IconUser s={20}/></div>
           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20"><IconUser s={16}/></div>
        </div>

        {/* Attacks (Errors/Stressors) */}
        <motion.div 
          className="absolute top-10 right-10"
          animate={{ x: [-50, 0], y: [50, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ShieldAlert className="w-5 h-5 text-red-500" />
        </motion.div>

        {!safe && (
          <div className="absolute inset-0 bg-red-500/10 pointer-events-none mix-blend-color-burn" />
        )}
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
          className="w-full h-1.5 rounded-full bg-white/10"
          style={{ accentColor: safe ? '#4ade80' : '#f87171' }}
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
      <div className="relative w-full h-48 md:h-56 bg-black rounded-2xl border border-white/10 flex items-center justify-between p-4 overflow-hidden">
        
        {/* Left: Sources */}
        <div className="flex flex-col gap-4 z-10">
          {[Database, Zap, Hexagon].map((Icon, i) => (
             <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
               <Icon className="w-5 h-5 text-white/40" />
             </div>
          ))}
        </div>

        {/* Center Pipes */}
        <div className="absolute inset-x-16 inset-y-0 flex flex-col justify-center gap-12 opacity-50">
          {[1,2,3].map(i => (
             <div key={i} className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#00ffd0] to-transparent relative overflow-hidden">
                <motion.div 
                  className="w-24 h-full bg-white shadow-[0_0_10px_#fff]"
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 3 - (ingestion / 50), repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
                />
             </div>
          ))}
        </div>

        {/* Right: The Cube */}
        <motion.div 
           className="relative z-10 w-24 h-24 bg-[#00ffd0]/10 border border-[#00ffd0]/40 flex items-center justify-center mix-blend-screen shadow-[0_0_30px_rgba(0,255,208,0.2)]"
           style={{ transformStyle: 'preserve-3d', rotateX: 20, rotateY: -30 }}
           animate={{ rotateY: [-30, 330] }}
           transition={{ duration: 10 - (ingestion / 15), repeat: Infinity, ease: 'linear' }}
        >
           <Database className="w-10 h-10 text-[#00ffd0]" />
        </motion.div>
      </div>

      <div>
        <div className="flex justify-between text-[10px] font-mono text-white/50 mb-2">
           <span>Pipeline Speed</span>
           <span className="font-bold text-[#00ffd0]">{Math.round(ingestion * 5.5)} Gbps</span>
        </div>
        <input 
          type="range" min="10" max="100" value={ingestion}
          onChange={e => {
            setIngestion(Number(e.target.value))
            if(addLog) addLog(`Acelerando ingestão ETL para ${e.target.value}%`)
          }}
          className="w-full h-1 rounded bg-[#00ffd0]/20"
          style={{ accentColor: '#00ffd0' }}
        />
      </div>
    </div>
  )
}

// Reusable SVG for psych safety
const IconUser = ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4" /><path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" /></svg>
