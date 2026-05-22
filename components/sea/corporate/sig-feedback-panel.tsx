'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Star, Smile, Frown, Award, Plus, Trash2, ArrowRight } from 'lucide-react'

type FeedbackLog = {
  id: string
  squad: string
  time: string
  metrics: string
  text: string
}

export function SigFeedbackPanel() {
  const [energy, setEnergy] = useState(75)
  const [focus, setFocus] = useState(80)
  const [comment, setComment] = useState('')
  
  // SBI Form States
  const [sbiSit, setSbiSit] = useState('')
  const [sbiBeh, setSbiBeh] = useState('')
  const [sbiImp, setSbiImp] = useState('')
  const [sbiResult, setSbiResult] = useState<string | null>(null)

  const [feedbacks, setFeedbacks] = useState<FeedbackLog[]>([
    { id: 'f-1', squad: 'CS Squad', time: 'Há 2h', metrics: 'Energia 80% · Foco 90%', text: 'O novo fluxo de onboarding resolveu 100% dos blockers operacionais de integração.' },
    { id: 'f-2', squad: 'Vendas Squad', time: 'Ontem', metrics: 'Energia 60% · Foco 55%', text: 'Falta clareza nas metas de comissão deste trimestre. Aguardamos reunião de alinhamento com a diretoria.' }
  ])

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  function triggerToast(msg: string) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  function handlePulseSubmit() {
    if (!comment.trim()) {
      triggerToast('Por favor, escreva um feedback antes de enviar.')
      return
    }

    const newFeed: FeedbackLog = {
      id: `f-${Date.now()}`,
      squad: 'Operações (Você)',
      time: 'Agora',
      metrics: `Energia ${energy}% · Foco ${focus}%`,
      text: comment
    }

    setFeedbacks([newFeed, ...feedbacks])
    setComment('')
    triggerToast('Mural Pulse semanal atualizado!')
  }

  function handleBuildSbi() {
    if (!sbiSit.trim() || !sbiBeh.trim() || !sbiImp.trim()) {
      triggerToast('Por favor, preencha todos os campos do modelo SBI.')
      return
    }

    setSbiResult(
      `"Durante a reunião de passagem de plantão ontem na UTI (Situação), você apresentou os relatórios de calibração de complacência de forma calma e estruturada (Comportamento), o que permitiu ao time tomar decisões clínicas rápidas e assertivas sobre os parâmetros dos pacientes (Impacto)."`
    )
    triggerToast('Comentário SBI compilado pelo Coach de IA!')
  }

  return (
    <div className="ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] space-y-6">
      {/* Toast Alert floating */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 px-4 py-2 rounded-lg text-xs font-medium shadow-2xl backdrop-blur-md border bg-black/90 text-[#d4b87a] border-[#d4b87a]/20"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
        <div>
          <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">SIG · ESCUTA ATIVA</span>
          <h3 className="text-sm font-semibold text-white/90">Mural Pulse &amp; Net Promoter Score (NPS)</h3>
          <p className="text-[10px] text-white/40">Calibração semanal do termômetro cultural e clima interno do time</p>
        </div>
        <div className="text-right">
          <span className="text-[7.5px] uppercase tracking-widest text-white/40 block">NPS Categoria</span>
          <span className="text-sm font-bold font-mono text-[#d4b87a]">NPS 42</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: NPS Display & Pulse form */}
        <div className="lg:col-span-6 space-y-4">
          {/* NPS Box */}
          <div className="p-4 bg-black/25 border border-white/[0.03] rounded-[0.8rem] space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-wide">Net Promoter Score</span>
              <span className="text-[9px] text-[#5dcaa5]">▲ +4 pts vs S20</span>
            </div>
            
            {/* NPS Progress bar */}
            <div className="h-2.5 bg-black/50 rounded-full overflow-hidden flex">
              <div className="bg-[#5dcaa5] h-full" style={{ width: '58%' }} title="Promotores" />
              <div className="bg-[#fac775] h-full" style={{ width: '26%' }} title="Neutros" />
              <div className="bg-red-400 h-full" style={{ width: '16%' }} title="Detratores" />
            </div>
            
            <div className="flex justify-between text-[8px] text-white/40 font-mono">
              <span className="flex items-center gap-1"><Smile className="h-2.5 w-2.5 text-[#5dcaa5]" /> Promotores: 58%</span>
              <span className="flex items-center gap-1"><Award className="h-2.5 w-2.5 text-[#fac775]" /> Neutros: 26%</span>
              <span className="flex items-center gap-1"><Frown className="h-2.5 w-2.5 text-red-400" /> Detratores: 16%</span>
            </div>
          </div>

          {/* Pulse Clima Semanal Form */}
          <div className="p-4 bg-black/25 border border-white/[0.03] rounded-[0.8rem] space-y-3">
            <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a] block">Pulse Semanal (Clima)</span>
            
            {/* Energy Slider */}
            <div>
              <div className="flex justify-between text-[10px] text-white/60 mb-1">
                <span>Energia / Ânimo</span>
                <b className="font-mono text-[#d4b87a]">{energy}%</b>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-[#d4b87a]"
              />
            </div>

            {/* Focus Slider */}
            <div>
              <div className="flex justify-between text-[10px] text-white/60 mb-1">
                <span>Foco / Direção</span>
                <b className="font-mono text-[#d4b87a]">{focus}%</b>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={focus}
                onChange={(e) => setFocus(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-[#d4b87a]"
              />
            </div>

            <div>
              <span className="text-[10px] text-white/60 block mb-1">Feedback Anônimo (Opcional)</span>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escreva seu blocker ou sugestão semanal..."
                className="w-full h-[55px] bg-black/40 border border-white/[0.08] rounded-[0.6rem] p-3 text-[11px] outline-none text-white placeholder:text-white/20 resize-none focus:border-[#d4b87a]/45 transition"
              />
            </div>

            <button 
              onClick={handlePulseSubmit}
              className="w-full bg-[#d4b87a]/15 hover:bg-[#d4b87a]/25 border border-[#d4b87a]/30 py-2 rounded-[0.6rem] text-[10px] font-mono uppercase tracking-widest text-[#d4b87a] transition"
            >
              Submeter Pulse
            </button>
          </div>
        </div>

        {/* Right Column: Live Feed & SBI Coaching */}
        <div className="lg:col-span-6 space-y-4">
          {/* SBI Feedback Builder */}
          <div className="p-4 bg-black/25 border border-white/[0.03] rounded-[0.8rem] space-y-3">
            <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a] block">SBI COACHING: Mapeador de Feedback</span>
            
            <div className="space-y-2">
              <input 
                value={sbiSit}
                onChange={(e) => setSbiSit(e.target.value)}
                placeholder="Situação (Onde/Quando?)"
                className="w-full bg-black/40 border border-white/[0.08] rounded-[0.5rem] px-3 py-1.5 text-[10.5px] outline-none text-white"
              />
              <input 
                value={sbiBeh}
                onChange={(e) => setSbiBeh(e.target.value)}
                placeholder="Comportamento (O que fez concretamente?)"
                className="w-full bg-black/40 border border-white/[0.08] rounded-[0.5rem] px-3 py-1.5 text-[10.5px] outline-none text-white"
              />
              <input 
                value={sbiImp}
                onChange={(e) => setSbiImp(e.target.value)}
                placeholder="Impacto (Qual foi o resultado prático?)"
                className="w-full bg-black/40 border border-white/[0.08] rounded-[0.5rem] px-3 py-1.5 text-[10.5px] outline-none text-white"
              />
            </div>

            {sbiResult && (
              <div className="p-3 bg-[#d4b87a]/5 border border-[#d4b87a]/15 rounded-[0.5rem] text-[11px] leading-relaxed text-[#d4b87a]/90 font-medium italic">
                {sbiResult}
              </div>
            )}

            <button 
              onClick={handleBuildSbi}
              className="w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] py-2 rounded-[0.6rem] text-[10px] font-medium text-white transition flex items-center justify-center gap-1.5"
            >
              Compilar Modelo SBI <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Feed mural */}
          <div className="space-y-2">
            <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70 block font-mono">Feed Mural Anônimo</span>
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {feedbacks.map(feed => (
                <div key={feed.id} className="p-3 bg-black/20 border border-white/[0.03] rounded-[0.6rem] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-[#d4b87a]">{feed.squad} · {feed.time}</span>
                    <span className="text-[8px] text-white/40 font-mono">{feed.metrics}</span>
                  </div>
                  <p className="text-[10px] text-white/70 leading-normal">{feed.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
