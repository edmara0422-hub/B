'use client'

import dynamic from 'next/dynamic'
import { RouteScreenFallback } from '@/components/business-syllabus/route-screen-fallback'

const SistemasPageClient = dynamic(() => import('@/components/business-syllabus/sistemas-page-client'), {
  ssr: false,
})

export function SistemasPageEntry() {
  return <SistemasPageClient />
}