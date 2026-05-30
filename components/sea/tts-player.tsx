'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, Loader2, Square, VolumeX } from 'lucide-react'

export function TTSPlayer({ text, className = '' }: { text: string; className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Cleanup áudio quando desmontar ou texto mudar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [text])

  const handleToggle = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlaying(false)
      return
    }

    if (audioRef.current) {
      // Se já carregou o áudio para este texto, apenas toca de novo
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
      return
    }

    // Gerar novo áudio
    try {
      setIsLoading(true)
      setError(false)
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) throw new Error('Erro na API')

      const { audioContent } = await res.json()
      
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`)
      audio.onended = () => setIsPlaying(false)
      audioRef.current = audio
      
      await audio.play()
      setIsPlaying(true)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading || !text}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.4)] ${
        isPlaying
          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white/90 border border-[#c9943a]/30 ring-1 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
          : error
          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          : 'bg-black/40 text-slate-400 hover:text-white hover:bg-black/60 border border-white/5 hover:border-white/10'
      } ${className}`}
      title={isPlaying ? 'Parar leitura' : 'Ouvir conteúdo'}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#c9943a] [.theme-silver_&]:text-[#cbd5e1]" />
      ) : isPlaying ? (
        <Square className="w-4 h-4 fill-current" />
      ) : error ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
      
      {/* Ripple effect quando tocando */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" style={{ animationDuration: '2s' }} />
      )}
    </button>
  )
}
