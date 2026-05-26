import React from 'react'
import { Target, BarChart3, Radio } from 'lucide-react'
import { useSigPessoasStore } from './store'

export function SigPessoasEmpresa() {
  const { empresaTab, setEmpresaTab } = useSigPessoasStore()

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex gap-2 p-1.5 bg-[#080808]/80 border border-white/10 rounded-2xl w-fit">
        {[
          { id: 'estrategia', label: 'Estratégia (OKRs)' },
          { id: 'bi', label: 'BI & Clima' },
          { id: 'canais', label: 'Canais de Ruído' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setEmpresaTab(t.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
              empresaTab === t.id 
                ? 'bg-[#d4b87a] text-black shadow-[0_0_20px_rgba(212,184,122,0.3)]' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {empresaTab === 'estrategia' && (
        <div className="p-12 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex flex-col items-center text-center">
          <Target className="w-12 h-12 text-[#d4b87a] mb-4" />
          <h3 className="text-base font-semibold text-white/90 mb-2">OKRs Trimestrais</h3>
          <p className="text-xs text-white/50 max-w-lg mb-8 leading-relaxed">Conecte a estratégia da empresa às ações do time.<br/>Métrica recomendada (Intel): 60-70% de atingimento significa que a meta foi desafiadora o suficiente.</p>
          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6">
             <span className="text-[10px] uppercase text-white/30 tracking-widest block mb-4">Novo OKR</span>
             <button className="w-full py-3 rounded-xl bg-white/10 text-white/80 text-xs font-medium hover:bg-[#d4b87a]/20 hover:text-[#d4b87a] transition-colors uppercase tracking-widest">+ Definir Objetivo</button>
          </div>
        </div>
      )}

      {empresaTab === 'bi' && (
        <div className="p-12 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex flex-col items-center text-center">
          <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-base font-semibold text-white/90 mb-2">ROI de Clima Organizacional</h3>
          <p className="text-xs text-white/50 max-w-lg mb-8 leading-relaxed">Cálculo de turnover, custo de latência de comunicação e retrabalho.</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
             <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Risco Turnover</span>
                <span className="text-xl font-bold text-red-400 block mt-2">15%</span>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Custo Oculto/Mês</span>
                <span className="text-xl font-bold text-yellow-400 block mt-2">R$ 12.450</span>
             </div>
          </div>
        </div>
      )}

      {empresaTab === 'canais' && (
        <div className="p-12 rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-xl flex flex-col items-center text-center">
          <Radio className="w-12 h-12 text-[#fac775] mb-4" />
          <h3 className="text-base font-semibold text-white/90 mb-2">Score de Ruído de Canais</h3>
          <p className="text-xs text-white/50 max-w-lg mb-8 leading-relaxed">Avalie se o seu time está usando os canais certos (síncrono vs assíncrono) baseado na complexidade da mensagem.</p>
          <button className="px-6 py-3 rounded-xl bg-white/10 text-white/80 text-xs font-medium hover:bg-white/20 transition-colors uppercase tracking-widest">Calcular Sincronia ALX</button>
        </div>
      )}
    </div>
  )
}
