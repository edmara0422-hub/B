'use client'

import { ReactNode, useLayoutEffect, useState, useCallback, startTransition, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { BottomNav } from '@/components/sea/bottom-nav'
import { PremiumSplash } from '@/components/sea/premium-splash'
import { SeaLanding } from '@/components/sea/sea-landing'
import { useAccessibility } from '@/hooks/use-accessibility'

// Lazy-load both pages once — they stay mounted forever after
const HomePageClient = dynamic(
  () => import('@/components/sea/home-page-client'),
  { ssr: false }
)
const ExplorePageClient = dynamic(
  () => import('@/components/sea/explore-page-client'),
  { ssr: false }
)

// Preload sub-route chunks in background so navigation is instant
function usePreloadRoutes() {
  useEffect(() => {
    const id = setTimeout(() => {
      import('@/components/sea/conteudos-page-client')
      import('@/components/sea/sistemas-page-client')
      import('@/components/sea/explore-page-client')
    }, 1500)
    return () => clearTimeout(id)
  }, [])
}

// Flag em sessionStorage: persiste entre reloads mas é apagado quando o app é
// completamente fechado/reaberto. Reload = pula landing/splash; fechar+reabrir
// = mostra landing/splash de novo.
const SPLASH_SHOWN_KEY = 'sea-splash-shown'
function readSplashShown(): boolean {
  if (typeof window === 'undefined') return false
  try { return sessionStorage.getItem(SPLASH_SHOWN_KEY) === '1' } catch { return false }
}
function markSplashShown() {
  if (typeof window === 'undefined') return
  try { sessionStorage.setItem(SPLASH_SHOWN_KEY, '1') } catch { /* ignore */ }
}

type Tab = 'home' | 'explore' | 'other'

function pathToTab(p: string | null): Tab {
  const s = p?.replace(/\/$/, '') ?? ''
  if (s === '/sea' || s === '/home' || s === '' || s === '/sea/index') return 'home'
  if (s === '/explore') return 'explore'
  return 'other'
}

export function MainShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  usePreloadRoutes()

  // Prefetch Next.js routes so server response is instant
  useEffect(() => {
    router.prefetch('/explore')
    router.prefetch('/explore/conteudos')
    router.prefetch('/explore/sistemas')
  }, [router])
  // Landing/splash only on a fresh app open (sessionStorage cleared). After a
  // simple reload, jump straight to 'ready' so the user stays on Home/Explore.
  const [phase, setPhase] = useState<'landing' | 'splash' | 'ready'>(() =>
    readSplashShown() ? 'ready' : 'landing'
  )
  // Once we reach 'ready', persist the flag so reloads skip the intro.
  useEffect(() => {
    if (phase === 'ready') markSplashShown()
  }, [phase])
  const [activeTab, setActiveTab] = useState<Tab>(() => pathToTab(pathname))
  const [visited, setVisited] = useState<Record<'home' | 'explore', boolean>>(() => ({
    home: pathToTab(pathname) === 'home',
    explore: pathToTab(pathname) === 'explore',
  }))

  // Sync tab with pathname
  useLayoutEffect(() => {
    const tab = pathToTab(pathname)
    setActiveTab(tab)
    if (tab === 'home' || tab === 'explore') {
      setVisited((v) => ({ ...v, [tab]: true }))
    }
  }, [pathname])

  const handleSwitch = useCallback((tab: string) => {
    const t = tab === 'home' ? 'home' : tab === 'explorar' ? 'explore' : 'other'
    // Instant visual switch
    setActiveTab(t as Tab)
    if (t === 'home' || t === 'explore') {
      setVisited((v) => ({ ...v, [t]: true }))
    }
    // Update URL in background without blocking
    startTransition(() => {
      router.push(t === 'home' ? '/sea' : '/explore', { scroll: false })
    })
  }, [router])

  const isMainTab = activeTab === 'home' || activeTab === 'explore'

  return (
    <>
      {/* 1. Landing — sempre aparece primeiro */}
      {phase === 'landing' && (
        <SeaLanding onEnter={() => setPhase('splash')} />
      )}

      {/* 2. Splash SEA — aparece depois do "Entrar no SEA" */}
      {phase === 'splash' && (
        <PremiumSplash durationMs={2400} exitHoldMs={500} onComplete={() => setPhase('ready')} />
      )}

      {/* Home content — only visible when ready */}
      {phase === 'ready' && (
        <ShellWithZoom activeTab={activeTab} visited={visited} isMainTab={isMainTab} handleSwitch={handleSwitch}>
          {children}
        </ShellWithZoom>
      )}
    </>
  )
}

// Wrapper que aplica o zoom de acessibilidade do useAccessibility na área de
// conteúdo (Home/Explore/sub-rotas). O TopBar e o BottomNav ficam FORA do
// zoom para sempre permanecerem alcançáveis (clicáveis com tamanho normal).
function ShellWithZoom({
  activeTab, visited, isMainTab, handleSwitch, children,
}: {
  activeTab: Tab
  visited: Record<'home' | 'explore', boolean>
  isMainTab: boolean
  handleSwitch: (t: string) => void
  children: ReactNode
}) {
  const fontScale = useAccessibility((s) => s.fontScale)
  return (
    <div className="sea-shell-root">
      <main
        className="pb-16"
        style={{ zoom: fontScale } as React.CSSProperties}
      >
        {visited.home && (
          <div style={{ display: activeTab === 'home' ? 'block' : 'none' }}>
            <HomePageClient />
          </div>
        )}
        {visited.explore && (
          <div style={{ display: activeTab === 'explore' ? 'block' : 'none' }}>
            <ExplorePageClient />
          </div>
        )}
        {!isMainTab && children}
      </main>
      <BottomNav onSwitch={handleSwitch} />
    </div>
  )
}
