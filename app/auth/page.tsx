import { Suspense } from 'react'
import { AuthForm } from '@/components/sea/auth-form'

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0E1014]" />}>
      <AuthForm />
    </Suspense>
  )
}
