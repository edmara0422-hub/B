'use client'

import { usePathname, useRouter } from 'next/navigation'

export function BottomNav({
  onSwitch,
}: {
  active?: string
  onSwitch?: (tab: string) => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  const p = pathname?.replace(/\/$/, '') ?? ''
  const isHome    = p === '/sea' || p === '/home' || p === ''
  const isExplore = p === '/explore' || p.startsWith('/explore/')

  const handleSwitchTab = (tab: 'home' | 'explore') => {
    if (onSwitch) {
      onSwitch(tab === 'home' ? 'home' : 'explorar')
    } else {
      if (tab === 'home') {
        router.push('/sea')
      } else {
        router.push('/explore')
      }
    }
  }

  return (
    <div className="bottombar">
      <div className="bb-container">
        <button
          className={`bb-btn ${isHome ? 'on' : ''}`}
          id="bb-btn-home"
          onClick={() => handleSwitchTab('home')}
        >
          <span className="ic">⌂</span>
          Home
        </button>
        <button
          className={`bb-btn ${isExplore ? 'on' : ''}`}
          id="bb-btn-explore"
          onClick={() => handleSwitchTab('explore')}
        >
          <span className="ic">⌖</span>
          Explorar
        </button>

      </div>
    </div>
  )
}


