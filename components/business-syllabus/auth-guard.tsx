'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'
import { PremiumSplash } from '@/components/business-syllabus/premium-splash'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, initialized, initialize } = useAuthStore()
  const router = useRouter()
  const [splashComplete, setSplashComplete] = useState(false)

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    if (initialized && !isLoading && !user) {
      router.replace('/auth')
    }
  }, [initialized, isLoading, user, router])

  const showSplash = !initialized || isLoading || (user && !splashComplete)

  if (showSplash) {
    if (initialized && !isLoading && !user) {
      return null
    }

    return (
      <PremiumSplash
        durationMs={3500}
        exitHoldMs={1000}
        onComplete={() => setSplashComplete(true)}
      />
    )
  }

  if (!user) return null

  return <>{children}</>
}