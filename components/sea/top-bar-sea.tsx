'use client'

import { Bell, User, X, BellOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, MoonStar, SunMedium } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/authStore'
import { useNotifications } from '@/hooks/useNotifications'
import { useAccessibility } from '@/hooks/use-accessibility'

export function TopBarSEA() {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const [showNotif, setShowNotif] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { profile } = useAuthStore()
  const { notifications, unreadCount, markAllRead, enabled: notifEnabled } = useNotifications()
  const fontScale = useAccessibility((s) => s.fontScale)
  const increaseFontScale = useAccessibility((s) => s.increaseFontScale)
  const decreaseFontScale = useAccessibility((s) => s.decreaseFontScale)
  const scalePct = Math.round(fontScale * 100)

  useEffect(() => {
    setMounted(true)
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    router.prefetch('/profile')
    return () => clearInterval(id)
  }, [router])

  useEffect(() => {
    if (!showNotif) return
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotif(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showNotif])

  function handleBellClick() {
    if (!showNotif && unreadCount > 0) markAllRead()
    setShowNotif(v => !v)
  }

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const isDay = hour >= 6 && hour < 18
  const GreetingIcon = isDay ? SunMedium : MoonStar

  const dateLabel = mounted
    ? new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).format(now)
    : ''
  const timeLabel = mounted
    ? new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now)
    : ''

  // Fundo dos botões internos (Bell, Profile, Zoom container)
  const shellBackground =
    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(8,8,10,0.92) 100%)'

  const btnClass = 'flex h-7 w-7 items-center justify-center rounded-[0.5rem] border border-white/10 text-white/70 transition hover:text-white active:scale-95'

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-2.5 pt-3 md:px-8 md:pt-4">
      <div
        className="mx-auto flex max-w-2xl items-center justify-between gap-2 overflow-hidden rounded-[1.2rem] border border-white/8 p-1.5 px-2.5 text-white shadow-[0_6px_16px_rgba(0,0,0,0.32)] backdrop-blur-xl md:px-3"
        style={{
          background: 'rgba(5,5,5,0.82)',
          borderBottom: '1px solid rgba(192,192,192,0.06)',
        }}
      >
        {/* Left: SEA logo metálico + saudação + data */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[0.5rem] border border-white/16"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(219,225,232,0.36) 16%, rgba(96,101,108,0.94) 42%, rgba(14,15,18,0.98) 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(255,255,255,0.05), 0 8px 16px rgba(0,0,0,0.36)',
            }}
          >
            <span
              className="text-[0.45rem] font-semibold tracking-[0.28em] text-white"
              style={{ fontFamily: 'Poppins, sans-serif', paddingLeft: '0.32em' }}
            >
              SEA
            </span>
          </div>

          {mounted && (
            <>
              <div className="flex items-center gap-1 rounded-full border border-white/12 bg-black/18 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.15em] text-white/74">
                <GreetingIcon className="h-2.5 w-2.5 text-white/74" />
                <span>{greeting}</span>
              </div>

              <div className="flex items-center gap-1 text-[7px] text-white/55">
                <CalendarDays className="h-2.5 w-2.5 text-white/50" />
                <span className="uppercase tracking-[0.08em]">{dateLabel}</span>
              </div>
            </>
          )}
        </div>

        {/* Right: time + zoom + buttons */}
        <div className="flex shrink-0 items-center gap-1.5">
          {mounted && (
            <span className="hidden text-[8px] font-bold tabular-nums tracking-[0.12em] text-white/75 sm:inline">
              {timeLabel}
            </span>
          )}

          {/* Zoom A−/A+ — funciona em mobile e desktop */}
          <div
            className="flex items-center gap-0.5 overflow-hidden rounded-[0.5rem] border border-white/12"
            style={{ background: shellBackground }}
          >
            <button
              onClick={decreaseFontScale}
              disabled={scalePct <= 60}
              aria-label="Diminuir texto"
              title="Diminuir texto"
              className="flex h-6 w-5 items-center justify-center text-[8px] font-bold text-white/55 transition hover:text-white disabled:opacity-25"
              style={{ fontFamily: 'monospace' }}
            >
              A−
            </button>
            <span className="select-none px-0.5 text-[7px] tabular-nums text-white/35" style={{ fontFamily: 'monospace' }}>
              {scalePct}
            </span>
            <button
              onClick={increaseFontScale}
              disabled={scalePct >= 160}
              aria-label="Aumentar texto"
              title="Aumentar texto"
              className="flex h-6 w-5 items-center justify-center text-[10px] font-bold text-white/55 transition hover:text-white disabled:opacity-25"
              style={{ fontFamily: 'monospace' }}
            >
              A+
            </button>
          </div>

          {/* Bell */}
          <div className="relative" ref={notifRef}>
            <button
              aria-label="Notificacoes"
              onClick={handleBellClick}
              className={btnClass}
              style={{ background: shellBackground }}
            >
              <Bell className="h-3.5 w-3.5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-white text-[6px] font-bold text-black">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          <button
            aria-label="Perfil"
            onClick={() => router.push('/profile')}
            className={btnClass}
            style={{ background: shellBackground }}
          >
            {profile?.photo_url ? (
              <img src={profile.photo_url} alt="" className="h-5 w-5 rounded-[0.3rem] object-cover" />
            ) : (
              <User className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Painel fora do overflow-hidden para não ser cortado */}
      {showNotif && (
        <div className="fixed right-2.5 top-16 z-50 md:right-8">
          <NotificationPanel
            notifications={notifications}
            enabled={notifEnabled}
            onClose={() => setShowNotif(false)}
          />
        </div>
      )}
    </header>
  )
}

type Notif = { id: string; title: string; body: string; read: boolean; created_at: string }

function NotificationPanel({ notifications, enabled, onClose }: { notifications: Notif[]; enabled: boolean; onClose: () => void }) {
  function formatDate(iso: string) {
    const d = new Date(iso)
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d)
  }

  return (
    <div
      className="absolute right-0 top-8 z-50 w-72 rounded-[1.2rem] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      style={{ background: 'linear-gradient(180deg, rgba(22,22,22,0.99) 0%, rgba(8,8,8,1) 100%)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/6 px-4 py-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">Notificações</p>
        <button onClick={onClose} className="text-white/30 hover:text-white">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* List */}
      <div className="max-h-[50vh] overflow-y-auto">
        {!enabled ? (
          <div className="flex flex-col items-center gap-2 px-4 py-8">
            <BellOff className="h-6 w-6 text-white/15" />
            <p className="text-[8px] text-white/30">Notificações desativadas</p>
            <p className="text-[7px] text-white/20">Ative em Perfil para receber avisos</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-8">
            <BellOff className="h-6 w-6 text-white/15" />
            <p className="text-[8px] text-white/30">Nenhuma notificação ainda</p>
          </div>
        ) : (
          <div className="divide-y divide-white/4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`px-4 py-3 ${!n.read ? 'bg-white/[0.03]' : ''}`}
              >
                <div className="flex items-start gap-2">
                  {!n.read && (
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                  )}
                  <div className={!n.read ? '' : 'pl-3.5'}>
                    <p className="text-[9px] font-semibold text-white/70">{n.title}</p>
                    <p className="mt-0.5 text-[8px] leading-relaxed text-white/40">{n.body}</p>
                    <p className="mt-1 text-[7px] text-white/25">{formatDate(n.created_at)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
