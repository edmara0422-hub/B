'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * IpbBackground — fundo espacial completo do kit IPB.
 * Canvas 2D: 24 partículas (18% douradas) com drift + fade + linhas de conexão.
 * Halos: interno dourado pulsante + exterior prata + 4 raios verticais + grade.
 *
 * Spec exata do kit: rgba(210,175,90,...) pro dourado, rgba(200,205,215,...)
 * pro prata. Não trocar.
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
    const N = 24
    const CONN2 = 90 * 90
    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.04,
      r: Math.random() * 1.6 + 0.5,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.005,
      gold: Math.random() < 0.18, // 18% partículas douradas
    }))

    let raf = 0
    let last = 0
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (now - last < 50) return // ~20fps — economiza CPU
      last = now
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Linhas de conexão entre partículas próximas
      ctx.lineWidth = 0.6
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < CONN2) {
            const alpha = (1 - Math.sqrt(d2) / 130) * 0.12
            const isGold = pts[i].gold || pts[j].gold
            ctx.strokeStyle = isGold
              ? `rgba(210,175,90,${alpha.toFixed(3)})`
              : `rgba(200,205,215,${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Partículas com fade infinito de alpha + drift
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        p.a += p.va
        if (p.a < 0.05) p.a = 0.7
        if (p.a > 1) p.a = 0.1
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        const alpha = p.a * 0.95
        const size = p.r * 2.2
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = p.gold
          ? `rgba(224,185,80,${alpha.toFixed(3)})`
          : `rgba(210,215,225,${alpha.toFixed(3)})`
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
      {/* Halo central dourado pulsante */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '50%', left: '50%',
          width: 'min(80vw, 700px)', height: 'min(80vw, 700px)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(210,175,90,0.06) 0%, rgba(210,175,90,0.02) 40%, transparent 70%)',
          border: '1px solid rgba(210,175,90,0.08)',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Halo exterior prata */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '50%', left: '50%',
          width: 'min(110vw, 960px)', height: 'min(110vw, 960px)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(192,200,215,0.04) 0%, transparent 65%)',
          border: '1px solid rgba(192,200,215,0.05)',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Raios de luz verticais — alternando dourado e prata */}
      {[12, 34, 58, 78].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{ left: `${pos}%`, width: 1 }}
          animate={{ opacity: [0, 0.18, 0] }}
          transition={{ duration: 5 + i * 0.9, repeat: Infinity, delay: i * 1.3, ease: 'easeInOut' }}
        >
          <div
            className="w-full h-full"
            style={{
              background: i % 2 === 0
                ? 'linear-gradient(180deg, transparent 0%, rgba(210,175,90,0.6) 50%, transparent 100%)'
                : 'linear-gradient(180deg, transparent 0%, rgba(192,200,215,0.55) 50%, transparent 100%)',
            }}
          />
        </motion.div>
      ))}

      {/* Grade sutil 72x72 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(192,192,192,0.018) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(192,192,192,0.018) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
    </div>
  )
}

export function IpbBackground() {
  return (
    <>
      {/* Base preto */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#050507' }} />
      <CanvasGlow />
      <HalosDourados />
    </>
  )
}
