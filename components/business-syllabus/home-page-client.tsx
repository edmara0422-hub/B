'use client'

import { TopBarSEA } from '@/components/business-syllabus/top-bar-sea'
import { InteractiveCockpit } from '@/components/business-syllabus/interactive-cockpit'

export default function HomePageClient() {
  return (
    <div className="relative min-h-screen text-white pb-24">
      <TopBarSEA />

      <main className="relative z-10 px-2 pb-0 pt-20 md:px-4 md:pt-24 max-w-[1200px] mx-auto">
        <InteractiveCockpit />
      </main>
    </div>
  )
}
