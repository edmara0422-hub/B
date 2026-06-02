'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'
import ConteudosPageClient from '@/components/business-syllabus/conteudos-page-client'

export default function ConteudosArquivadosPage() {
  const router = useRouter()
  const { isAdmin, initialized } = useAuthStore()

  useEffect(() => {
    if (initialized && !isAdmin) {
      router.replace('/bs')
    }
  }, [initialized, isAdmin, router])

  if (!initialized || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white/50">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#d4b87a]" />
      </div>
    )
  }

  return <ConteudosPageClient mode="archived" />
}