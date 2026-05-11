'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Fundo espacial leve: canvas 2D com partículas + halos pulsantes + raios
 * verticais + grade sutil. Inspirado no IPB Design Kit.
 *
 * Performance: ~20fps fixo no canvas (debounced), CSS-only nos halos.
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

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; va: number; silver: boolean }
    const N = 22
    const CONN2 = 90 * 90
    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.04,
      r: Math.random() * 1.6 + 0.5,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.005,
      silver: Math.random() < 0.18,
    }))

    let raf = 0
    let last = 0
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (now - last < 50) return
      last = now
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.lineWidth = 0.6
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < CONN2) {
            const alpha = (1 - Math.sqrt(d2) / 130) * 0.12
            const accent = pts[i].silver || pts[j].silver
            ctx.strokeStyle = accent
              ? `rgba(220,225,235,${alpha.toFixed(3)})`
              : `rgba(180,185,195,${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.a += p.va
        if (p.a < 0.05) p.a = 0.7
        if (p.a > 1) p.a = 0.1
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        const alpha = p.a * 0.85
        const size = p.r * 2.0
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = p.silver
          ? `rgba(232,236,242,${alpha.toFixed(3)})`
          : `rgba(195,200,210,${alpha.toFixed(3)})`
        ctx.fill()
      }
    }
    requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 1 }} />
}

function HaloLayer() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Halo central pulsante (prata translúcido) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '50%', left: '50%',
          width: 'min(80vw, 700px)', height: 'min(80vw, 700px)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(220,225,235,0.05) 0%, rgba(220,225,235,0.018) 40%, transparent 70%)',
          border: '1px solid rgba(220,225,235,0.06)',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Halo exterior */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '50%', left: '50%',
          width: 'min(110vw, 960px)', height: 'min(110vw, 960px)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(192,200,215,0.035) 0%, transparent 65%)',
          border: '1px solid rgba(192,200,215,0.04)',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      {/* Raios de luz verticais */}
      {[12, 34, 58, 78].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{ left: `${pos}%`, width: 1 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 5 + i * 0.9, repeat: Infinity, delay: i * 1.3, ease: 'easeInOut' }}
        >
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(220,225,235,0.55) 50%, transparent 100%)',
            }}
          />
        </motion.div>
      ))}
      {/* Grade sutil */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(192,192,192,0.015) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(192,192,192,0.015) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
    </div>
  )
}

export function IpbBackground() {
  return (
    <>
      {/* Base preto-azulado */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#050507' }} />
      <CanvasGlow />
      <HaloLayer />
    </>
  )
}
