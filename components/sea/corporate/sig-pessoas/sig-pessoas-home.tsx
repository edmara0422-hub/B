import React from 'react'
import { CheckSquare, Square, Radar } from 'lucide-react'
import { useSigPessoasStore } from './store'

export function SigPessoasHome() {
  const { team, manifesto, toggleManifesto, setActiveTab } = useSigPessoasStore()

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 4 Blocos Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: 'lideres', title: 'Líderes', desc: 'Recrutar & Você', color: 'text-[#d4b87a]' },
          { id: 'time', title: 'Time', desc: 'Formar & Aliança', color: 'text-white' },
          { id: 'gerir', title: 'Gerir', desc: 'Diário & 1:1', color: 'text-white' },
          { id: 'empresa', title: 'Empresa', desc: 'OKRs & Estratégia', color: 'text-white' }
        ].map(b => (
          <button 
            key={b.id}
            onClick={() => setActiveTab(b.id as any)}
            className="group relative flex flex-col p-5 rounded-2xl bg-[#0c0905]/80 border border-white/5 hover:border-[#d4b87a]/40 overflow-hidden transition-all text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
            <span className={`text-xs font-mono tracking-wider uppercase ${b.color}`}>{b.title}</span>
            <span className="text-[10px] text-white/30 mt-1">{b.desc}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Radar 6D & Pulse */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4b87a]/10 blur-[50px] mix-blend-screen" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-xs font-mono text-[#d4b87a] tracking-widest uppercase">Saúde 6D</h3>
              <Radar className="w-4 h-4 text-white/20" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {[
                { label: 'D1 Cultura', val: '82%', color: 'bg-green-500/20 text-green-400' },
                { label: 'D2 Liderança', val: '76%', color: 'bg-yellow-500/20 text-yellow-400' },
                { label: 'D3 Confiança', val: '91%', color: 'bg-green-500/20 text-green-400' },
                { label: 'D4 Entrega', val: '88%', color: 'bg-green-500/20 text-green-400' },
                { label: 'D5 Clareza', val: '64%', color: 'bg-red-500/20 text-red-400' },
                { label: 'D6 Engajamento', val: '74%', color: 'bg-yellow-500/20 text-yellow-400' },
              ].map(d => (
                <div key={d.label} className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest">{d.label}</span>
                  <span className={`text-lg font-light ${d.color.split(' ')[1]}`}>{d.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-[#d4b87a]/20 backdrop-blur-xl shadow-[0_0_30px_rgba(212,184,122,0.05)]">
            <h3 className="text-xs font-mono text-white/60 tracking-widest uppercase mb-4">Pulso Semanal</h3>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-white/40 uppercase mb-2 block">Sua Energia (1-5)</span>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} className="flex-1 py-1.5 rounded-md bg-white/5 hover:bg-[#d4b87a]/20 text-white/50 text-xs border border-white/5 hover:border-[#d4b87a]/50 transition-colors">{n}</button>
                  ))}
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-[#d4b87a]/10 text-[#d4b87a] text-xs font-medium border border-[#d4b87a]/30 hover:bg-[#d4b87a]/20 transition-all uppercase tracking-widest">
                Salvar Pulso
              </button>
            </div>
          </div>
        </div>

        {/* Col 2: Manifesto & Passos */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex-1">
            <h3 className="text-xs font-mono text-white/60 tracking-widest uppercase mb-5">Saúde Manifesto</h3>
            <div className="space-y-3">
              {manifesto.map(p => (
                <div key={p.id} onClick={() => toggleManifesto(p.id)} className="cursor-pointer flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#d4b87a]/30 transition-all">
                  <div className={`w-5 h-5 flex-shrink-0 rounded-md flex items-center justify-center ${p.status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {p.status ? <CheckSquare className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                  </div>
                  <span className={`text-xs ${p.status ? 'text-white/90' : 'text-white/50'}`}>{p.id} - {p.txt}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl">
            <h3 className="text-xs font-mono text-white/60 tracking-widest uppercase mb-4">Primeiros Passos</h3>
            <div className="space-y-3">
              <div className="text-[11px] text-white/50 bg-white/5 p-3 rounded-lg border border-white/5">1. Escreva a 1ª entrada do Diário IE</div>
              <div className="text-[11px] text-white/50 bg-white/5 p-3 rounded-lg border border-white/5">2. Registre um SBI de reconhecimento</div>
              <div className="text-[11px] text-white/50 bg-white/5 p-3 rounded-lg border border-white/5">3. Defina 1 OKR trimestral</div>
            </div>
          </div>
        </div>

        {/* Col 3: Mapa do Time */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex-1 relative flex flex-col">
            <h3 className="text-xs font-mono text-[#d4b87a] tracking-widest uppercase mb-2">Mapa de Influência</h3>
            <p className="text-[10px] text-white/40 mb-6">Impacto x Influência (NASA OS)</p>
            
            <div className="flex-1 min-h-[200px] border border-white/10 rounded-2xl relative bg-white/[0.02]">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-white/10" />
                <div className="h-full w-px bg-white/10 absolute" />
              </div>
              {/* Quadrant labels */}
              <span className="absolute top-2 left-2 text-[8px] text-white/30 uppercase font-mono">Orientar</span>
              <span className="absolute top-2 right-2 text-[8px] text-[#5dcaa5]/50 uppercase font-mono">Delegar</span>
              <span className="absolute bottom-2 left-2 text-[8px] text-red-400/50 uppercase font-mono">Direcionar</span>
              <span className="absolute bottom-2 right-2 text-[8px] text-[#fac775]/50 uppercase font-mono">Apoiar</span>

              {/* Dots */}
              {team.map(t => (
                <div 
                  key={t.id}
                  className="absolute w-3 h-3 rounded-full bg-[#d4b87a] shadow-[0_0_10px_rgba(212,184,122,0.8)] -ml-1.5 -mt-1.5 cursor-pointer group"
                  style={{ left: `${50 + (t.influence/2)}%`, top: `${50 - (t.impact/2)}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 rounded bg-black/90 border border-white/10 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.name} ({t.type})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
