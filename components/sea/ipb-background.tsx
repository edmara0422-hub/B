'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * IpbBackground — fundo espacial. Partículas + halos + raios + grade.
 * Visível desde mobile fraco até desktop. Brilho prata+dourado nas linhas.
 */
function CanvasGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; va: number; gold: boolean }
    // 28 partículas — equilíbrio brilho × performance mobile.
    const N = 28
    const CONN2 = 100 * 100
    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.04,
      r: Math.random() * 1.8 + 0.7,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.005,
      gold: Math.random() < 0.22,
    }))

    let raf = 0
    let last = 0
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (now - last < 50) return
      last = now
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Linhas de conexão entre partículas próximas
      ctx.lineWidth = 0.7
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < CONN2) {
            const alpha = (1 - Math.sqrt(d2) / 150) * 0.18
            const isGold = pts[i].gold || pts[j].gold
            ctx.strokeStyle = isGold
              ? `rgba(224,185,80,${alpha.toFixed(3)})`
              : `rgba(210,215,225,${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Partículas
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        p.a += p.va
        if (p.a < 0.05) p.a = 0.85
        if (p.a > 1) p.a = 0.15
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        const alpha = p.a
        const size = p.r * 2.4
        // Glow externo (halo) — só nas douradas pra criar destaque
        if (p.gold) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, size * 2.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(224,185,80,${(alpha * 0.18).toFixed(3)})`
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = p.gold
          ? `rgba(255,210,120,${alpha.toFixed(3)})`
          : `rgba(220,225,235,${alpha.toFixed(3)})`
        ctx.fill()
      }
    }
    requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 1 }} />
}

function HalosDourados() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Halo central dourado pulsante (mais forte) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '50%', left: '50%',
          width: 'min(80vw, 700px)', height: 'min(80vw, 700px)',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(224,185,80,0.10) 0%, rgba(210,175,90,0.04) 40%, transparent 70%)',
          border: '1px solid rgba(224,185,80,0.12)',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Halo exterior prata */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '50%', left: '50%',
          width: 'min(110vw, 960px)', height: 'min(110vw, 960px)',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(192,200,215,0.07) 0%, transparent 65%)',
          border: '1px solid rgba(192,200,215,0.08)',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Raios verticais alternando dourado e prata */}
      {[12, 34, 58, 78].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{ left: `${pos}%`, width: 1 }}
          animate={{ opacity: [0, 0.25, 0] }}
          transition={{ duration: 5 + i * 0.9, repeat: Infinity, delay: i * 1.3, ease: 'easeInOut' }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                i % 2 === 0
                  ? 'linear-gradient(180deg, transparent 0%, rgba(224,185,80,0.75) 50%, transparent 100%)'
                  : 'linear-gradient(180deg, transparent 0%, rgba(210,215,225,0.7) 50%, transparent 100%)',
            }}
          />
        </motion.div>
      ))}

      {/* Grade sutil */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(192,192,192,0.02) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(192,192,192,0.02) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
    </div>
  )
}

export function IpbBackground() {
  return (
    <>
      {/* Base — preto-azulado IPB */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#050507' }} />
      <CanvasGlow />
      <HalosDourados />
    </>
  )
}
