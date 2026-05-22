'use client'

import { ReactNode, useLayoutEffect, useState, useCallback, startTransition, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { BottomNav } from '@/components/sea/bottom-nav'
import { PremiumSplash } from '@/components/sea/premium-splash'
import { SeaLanding } from '@/components/sea/sea-landing'
import { useAccessibility } from '@/hooks/use-accessibility'
import { usePresenceHeartbeat } from '@/hooks/use-presence-heartbeat'

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

// Versão do app: aumente este número para que TODOS os usuários vejam o splash
// novamente após um update importante. Boas práticas: bump em deploys com
// mudanças visuais ou funcionais relevantes; mantenha estável em fixes menores.
const APP_VERSION = '1.0.0'

// localStorage (persiste entre sessões) com a última versão vista.
// Se versão atual ≠ última vista → mostra splash + atualiza versão.
// Reload comum (sem mudança de versão): sessionStorage flag pula splash.
const APP_VERSION_KEY = 'sea-app-version'
const SPLASH_SHOWN_KEY = 'sea-splash-shown'

function shouldShowSplash(): boolean {
  if (typeof window === 'undefined') return false
  return true
}

function markSplashShown() {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(SPLASH_SHOWN_KEY, '1')
    localStorage.setItem(APP_VERSION_KEY, APP_VERSION)
  } catch { /* ignore */ }
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
  usePresenceHeartbeat()

  // Prefetch Next.js routes so server response is instant
  useEffect(() => {
    router.prefetch('/explore')
    router.prefetch('/explore/conteudos')
    router.prefetch('/explore/sistemas')
  }, [router])
  // Após login (sessionStorage limpo pelo signIn), inicia direto no splash —
  // skip landing porque o usuário já passou pela tela de auth e quer ver SEA.
  // Reload simples (flag set) → 'ready' direto, mantendo o usuário onde estava.
  const [phase, setPhase] = useState<'landing' | 'splash' | 'ready'>('ready')
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
        <PremiumSplash durationMs={3500} exitHoldMs={1000} onComplete={() => setPhase('ready')} />
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
