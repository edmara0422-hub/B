'use client'

import { TopBarSEA } from '@/components/sea/top-bar-sea'
import { InteractiveCockpit } from '@/components/sea/interactive-cockpit'

export default function HomePageClient() {
  return (
    <div className="relative overflow-hidden text-white">
      <TopBarSEA />

      <main className="relative z-10 px-2 pb-0 pt-20 md:px-4 md:pt-24 max-w-[1560px] mx-auto">
        <InteractiveCockpit />
      </main>
    </div>
  )
}

