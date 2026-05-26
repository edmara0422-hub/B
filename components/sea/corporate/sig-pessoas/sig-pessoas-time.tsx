import React from 'react'
import { Rocket } from 'lucide-react'
import { useSigPessoasStore } from './store'

export function SigPessoasTime() {
  const { timeTab, setTimeTab, team } = useSigPessoasStore()

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex gap-2 p-1.5 bg-[#080808]/80 border border-white/10 rounded-2xl w-fit">
        {[
          { id: 'pessoas', label: 'Pessoas (Equipe)' },
          { id: 'formar', label: 'Formar (Tuckman)' },
          { id: 'influencia', label: 'Influência' },
          { id: 'significado', label: 'Significado' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTimeTab(t.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
              timeTab === t.id 
                ? 'bg-[#d4b87a] text-black shadow-[0_0_20px_rgba(212,184,122,0.3)]' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {timeTab === 'pessoas' && (
        <div className="p-6 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl min-h-[400px]">
          <h3 className="text-xs font-mono text-[#d4b87a] tracking-widest uppercase mb-6">Sua Equipe Oficial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map(t => (
              <div key={t.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#d4b87a]/40 transition-all flex flex-col gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white/90">{t.name}</h4>
                  <span className="text-[10px] text-[#d4b87a]/70">{t.role}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/30 uppercase tracking-widest">Score 6D</span>
                    <span className="text-xs text-white/80">{t.d6}%</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] text-white/30 uppercase tracking-widest">Maturidade</span>
                    <span className="text-xs text-[#5dcaa5] font-bold">{t.maturity}</span>
                  </div>
                </div>
              </div>
            ))}
            {team.length === 0 && (
              <div className="col-span-3 py-12 text-center text-xs text-white/30 italic">Nenhum membro no time. Recrute na aba LÍDERES.</div>
            )}
          </div>
        </div>
      )}

      {timeTab === 'formar' && (
        <div className="p-8 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex flex-col items-center text-center">
          <Rocket className="w-12 h-12 text-[#fac775] mb-4" />
          <h3 className="text-base font-semibold text-white/90 mb-2">Dinâmica de Tuckman</h3>
          <p className="text-xs text-white/50 max-w-lg mb-8 leading-relaxed">Forming ➔ Storming ➔ Norming ➔ Performing.<br/>Acelere a fase de Normatização e evite conflitos destrutivos criando Regras de Ouro claras.</p>
          <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
            <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-mono border-b border-white/5 pb-2">Contrato de Aliança Ativo</h4>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-white/70">1. Feedback direto e respeitoso sempre em ambiente privado.</div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-white/70">2. Conflito produtivo na reunião, unidade total na execução após a decisão.</div>
          </div>
        </div>
      )}
      
      {/* Fallback for influenia and significado */}
      {(timeTab === 'influencia' || timeTab === 'significado') && (
        <div className="p-12 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl text-center">
          <p className="text-xs text-white/40">Módulo em construção para {timeTab} (Matriz ALX / Simulador de Missão).</p>
        </div>
      )}
    </div>
  )
}
