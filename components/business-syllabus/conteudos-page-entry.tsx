'use client'

import dynamic from 'next/dynamic'
import { RouteScreenFallback } from '@/components/business-syllabus/route-screen-fallback'

const ConteudosPageClient = dynamic(() => import('@/components/business-syllabus/conteudos-page-client'), {
  ssr: false,
  loading: () => <RouteScreenFallback eyebrow="Carregando conteudos" title="Preparando o trilho de estudo" />,
})

export function ConteudosPageEntry() {
  return <ConteudosPageClient />
}
