"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, HeartPulse, Send, CheckCircle2 } from "lucide-react"

function SurveyFormContent() {
  const searchParams = useSearchParams()
  const category = searchParams ? searchParams.get("c") || "Pesquisa Geral" : "Pesquisa Geral"
  const rawQuestion = searchParams ? searchParams.get("q") || "Como você avalia nosso ambiente de trabalho?" : "Como você avalia nosso ambiente de trabalho?"

  // Se a pergunta contiver múltiplos itens divididos por " | ", parsear como array
  const questions = rawQuestion.includes(" | ") 
    ? rawQuestion.split(" | ") 
    : [rawQuestion]

  const [ratings, setRatings] = useState<Record<number, number>>({})
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Inicializa notas
  useEffect(() => {
    const initialRatings: Record<number, number> = {}
    questions.forEach((_, idx) => {
      initialRatings[idx] = 5 // Padrão excelente
    })
    setRatings(initialRatings)
  }, [rawQuestion])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg(null)

    // Calcula a nota média
    const ratingValues = Object.values(ratings)
    const averageScore = ratingValues.length 
      ? Math.round((ratingValues.reduce((acc, v) => acc + v, 0) / ratingValues.length) * 10) / 10
      : 5

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          question: rawQuestion,
          score: averageScore,
          text: comment
        })
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        const errData = await res.json()
        setErrorMsg(errData.error || "Houve uma falha ao enviar sua resposta. Tente novamente.")
      }
    } catch (err: any) {
      setErrorMsg("Erro de rede. Verifique sua conexão e tente novamente.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-xl p-6 bg-[#050507]/90 border border-[#d2af5a]/20 rounded-3xl backdrop-blur-2xl text-left shadow-2xl relative overflow-hidden">
      {/* Glare background */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#d2af5a]/5 blur-[90px] mix-blend-screen pointer-events-none" />

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Header */}
            <div className="border-b border-white/10 pb-4 text-center">
              <span className="text-[9px] font-mono text-[#d2af5a] font-bold uppercase tracking-widest block mb-1">
                Business Syllabus · Pesquisa de Pulso Anônima
              </span>
              <h2 className="text-[15px] font-bold text-white tracking-wide uppercase">
                🌱 ESCALA DE {category}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d2af5a]/10 border border-[#d2af5a]/30 rounded-full text-[9px] font-mono text-[#d2af5a] mt-2.5">
                <HeartPulse className="h-3 w-3" />
                <span>TECNOLOGIA DE PRIVACIDADE COGNITIVA HABILITADA</span>
              </div>
            </div>

            <p className="text-[10px] text-white/50 leading-relaxed text-center font-sans">
              O BS assegura confidencialidade absoluta. Sua avaliação não carrega identificadores e é tratada com total criptografia na governança do PGR (NR-1).
            </p>

            {/* Questions List */}
            <div className="space-y-4 pt-2">
              {questions.map((q, idx) => (
                <div key={idx} className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                  <span className="text-[8px] font-mono text-[#fac775] block uppercase tracking-widest font-bold">Item de Avaliação 0{idx + 1}</span>
                  <h3 className="text-[11.5px] font-bold text-white leading-relaxed font-sans">{q}</h3>
                  
                  {/* Rating Selector */}
                  <div className="flex justify-between items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setRatings({ ...ratings, [idx]: score })}
                        className={`flex-1 py-2 rounded-xl border text-[10.5px] font-mono font-bold tracking-wider transition-all hover:scale-[1.03] ${
                          ratings[idx] === score
                            ? "bg-[#d2af5a] border-[#d2af5a] text-black shadow-md"
                            : "bg-black/40 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[7.5px] text-white/30 font-mono">
                    <span>1 (Muito Ruim)</span>
                    <span>3 (Neutro)</span>
                    <span>5 (Excelente)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <label className="block text-[8.5px] uppercase font-mono text-white/45 tracking-wider">
                Depoimento Qualitativo Anônimo (Opcional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Compartilhe seus comentários qualitativos, sugestões de ergonomia cognitiva ou observações construtivas..."
                className="w-full bg-black/55 border border-[#d2af5a]/20 rounded-2xl py-2 px-3 text-[10.5px] text-white/80 outline-none focus:border-[#d2af5a]/60 font-sans resize-none leading-relaxed"
              />
              <span className="block text-[7.5px] text-white/35 font-mono leading-none">
                💡 A inteligência artificial cruzará esses dados via processamento de linguagem natural (NLP).
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl text-red-400 text-[10px] text-center font-mono">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#d2af5a] hover:bg-[#e0c887] text-black font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all shadow-[0_4px_20px_rgba(210,175,90,0.25)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              {submitting ? "ENVIANDO..." : "SUBMETER RESPOSTA ANÔNIMA"}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 px-4 text-center space-y-4"
          >
            <div className="inline-flex h-16 w-16 rounded-full bg-[#d2af5a]/10 border border-[#d2af5a] text-[#d2af5a] items-center justify-center animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-wide">AVALIAÇÃO RECEBIDA!</h2>
            <p className="text-[11px] text-white/60 font-sans max-w-sm mx-auto leading-relaxed">
              Sua avaliação anônima foi gravada com sucesso nas trilhas de governança do Business Syllabus. A Inteligência Artificial já está integrando seus feedbacks socioemocionais.
            </p>
            <div className="pt-4">
              <span className="text-[8px] font-mono text-[#d2af5a] uppercase tracking-widest block bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit mx-auto">
                🔒 CONEXÃO ENCERRADA COM PRIVACIDADE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PesquisaPage() {
  return (
    <div 
      className="min-h-screen bg-[#020204] text-white flex flex-col items-center justify-center p-4"
      style={{ fontFamily: "'Poppins', -apple-system, system-ui, sans-serif" }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,175,90,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Suspense fallback={
          <div className="p-8 text-center text-white/40 font-mono text-xs animate-pulse">
            Carregando criptografia do formulário Business Syllabus...
          </div>
        }>
          <SurveyFormContent />
        </Suspense>
      </div>
    </div>
  )
}