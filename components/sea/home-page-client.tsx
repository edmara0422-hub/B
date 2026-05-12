'use client'

import dynamic from 'next/dynamic'
import { BookOpen, Cpu, Brain } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import BusinessClock from '@/components/sea/greeting-clock-card'
import { PerformanceBar } from '@/components/sea/performance-bar'
import { TopBarSEA } from '@/components/sea/top-bar-sea'

const SimulationsMarquee = dynamic(
  () => import('@/components/sea/simulations-grid').then((mod) => mod.SimulationsMarquee),
  {
    ssr: false,
    loading: () => <div className="h-[clamp(210px,38vw,290px)] animate-pulse rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }} />,
  }
)

export default function HomePageClient() {
  return (
    <div className="relative overflow-hidden text-white">
      <TopBarSEA />

      <main className="relative z-10 px-2 pb-0 pt-20 md:px-4 md:pt-24">

        {/* 3D Simulations marquee — full width */}
        <SimulationsMarquee />

        {/* Edge-to-edge: sem max-w, acompanha TopBar/BottomNav que também não têm max */}
        <div className="w-full">
          {/* Performance */}
          <div className="mt-5">
            <PerformanceBar />
          </div>
        </div>
      </main>
    </div>
  )
}

