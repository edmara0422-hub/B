'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { BookOpen, ChevronLeft, ChevronRight as ChevronRightIcon, Cpu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// Defer carousel mount by 1 frame — clock renders instantly, carousel after
function useDeferredMount() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const id = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(id) }, [])
  return ready
}

const spring = { type: 'spring', stiffness: 380, damping: 32 } as const

const CARDS = [
  {
    href: '/explore/conteudos',
    icon: BookOpen,
    title: 'Conteudos',
    sub: 'Protocolos, referencias e fluxos clinicos para a beira do leito',
    color: '#A8B8FF',
    glow: 'rgba(168,184,255,0.18)',
    grain: 'from-[#1a1e3a] via-[#0d0f1e] to-[#010101]',
  },
  {
    href: '/explore/sistemas',
    icon: Cpu,
    title: 'Sistemas',
    sub: 'Modulos interativos — neuro, cardio, pneumo e mais',
    color: '#7EEFC0',
    glow: 'rgba(126,239,192,0.14)',
    grain: 'from-[#0e2420] via-[#081410] to-[#010101]',
  },
] as const

export default function ExplorePageClient() {
  const ready = useDeferredMount()

  return (
    <div className="relative min-h-screen text-white">
      {/* Carrossel posicionado no terço superior+ pra não ficar grudado no topo */}
      <main className="relative z-10 w-full px-2 md:px-4 pt-24 md:pt-32">
        {ready
          ? <Carousel3D />
          : <div className="w-full rounded-[2rem] bg-white/3" style={{ height: 'clamp(360px, 58vh, 560px)' }} />
        }
      </main>
    </div>
  )
}

function Carousel3D() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const router = useRouter()

  useEffect(() => {
    CARDS.forEach((c) => router.prefetch(c.href))
  }, [router])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth)
      setActive(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="space-y-4 w-full">
      {/* Carrossel full-width — mesmo padrão do Home (scroll-snap horizontal) */}
      <div
        ref={scrollRef}
        className="ipb-thinscroll flex w-full snap-x snap-mandatory overflow-x-auto [&>*]:snap-center [&>*]:snap-always [&>*]:shrink-0 [&>*]:w-full"
        style={{ scrollbarWidth: 'none', height: 'clamp(360px, 58vh, 560px)' }}
      >
        {CARDS.map((card) => (
          <div key={card.href} className="w-full px-1 md:px-2">
            <FlatCard card={card} onClick={() => router.push(card.href)} />
          </div>
        ))}
      </div>

      {/* Setas + dots */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => goTo(Math.max(0, active - 1))}
          disabled={active === 0}
          aria-label="Anterior"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/55 transition hover:bg-white/[0.10] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Card ${i + 1}`}
              className="flex items-center justify-center"
            >
              <motion.span
                animate={{
                  width: active === i ? 24 : 5,
                  background: active === i ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.14)',
                }}
                transition={spring}
                className="block h-1 rounded-full"
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(Math.min(CARDS.length - 1, active + 1))}
          disabled={active === CARDS.length - 1}
          aria-label="Próximo"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/55 transition hover:bg-white/[0.10] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ─── Card flat (sem rotação 3D) — full width estilo Home ───
function FlatCard({ card, onClick }: { card: (typeof CARDS)[number]; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotX = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 160, damping: 20 })
  const rotY = useSpring(useTransform(mx, [0, 1], [-3, 3]), { stiffness: 160, damping: 20 })
  const glowX = useTransform(mx, [0, 1], [20, 80])
  const glowY = useTransform(my, [0, 1], [20, 80])
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(340px circle at ${x}% ${y}%, rgba(255,255,255,0.055), transparent 65%)`,
  )

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { mx.set(0.5); my.set(0.5) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ rotateX: rotX, rotateY: rotY }}
      className="h-full w-full cursor-pointer"
    >
      <div
        className="ipb-soft relative h-full w-full overflow-hidden rounded-[1.75rem]"
        style={{
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10)',
        }}
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glowBackground }} />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12)_50%,transparent)]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between">
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/8"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <card.icon className="h-5 w-5 text-white/50" />
            </motion.div>
            <motion.div
              whileHover={{ x: 2, y: -2, scale: 1.06 }}
              transition={spring}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <ChevronRightIcon className="h-3.5 w-3.5 text-white/45" />
            </motion.div>
          </div>

          <div className="space-y-2.5">
            <motion.div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.4), transparent)' }} />
            <div className="space-y-1.5">
              <h2
                className="font-light leading-none tracking-[0.12em] text-white/85"
                style={{ fontSize: 'clamp(1.75rem, 7vw, 2.8rem)' }}
              >
                {card.title}
              </h2>
              <p className="text-[11px] leading-relaxed tracking-[0.04em] text-white/35 max-w-[28ch]">
                {card.sub}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={spring}
              className="mt-1 inline-flex items-center gap-1.5 rounded-[0.8rem] border border-white/10 bg-white/5 px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/50"
            >
              Abrir
              <ChevronRightIcon className="h-3 w-3" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

