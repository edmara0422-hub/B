'use client'

import { Bell, User, X, BellOff, MoonStar, SunMedium } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'
import { useNotifications } from '@/hooks/useNotifications'
import { useAccessibility } from '@/hooks/use-accessibility'

export function TopBarSEA() {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const [showNotif, setShowNotif] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { profile, user } = useAuthStore()
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
  const GreetIcon = isDay ? SunMedium : MoonStar

  const displayName = profile?.name ?? user?.user_metadata?.name ?? user?.email?.split('@')[0] ?? ''
  const firstName = displayName.split(' ')[0]

  // Data formato IPB: "06.MAI.2026"
  const dateLabel = mounted
    ? `${String(now.getDate()).padStart(2, '0')}.${['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'][now.getMonth()]}.${now.getFullYear()}`
    : ''

  // Fundo dos botões internos da direita (Zoom, Bell, Profile)
  const btnShellBg =
    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(10,10,12,0.40) 60%, rgba(3,3,5,0.75) 100%)'
  const zoomShellBg =
    'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(3,3,5,0.55) 100%)'

  return (
    <header
      className="fixed left-0 right-0 top-0 z-40 px-3 pt-2.5 pb-2.5 md:px-6"
      style={{
        background: 'rgba(3, 3, 5, 0.60)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        paddingTop: 'max(0.6rem, env(safe-area-inset-top))',
      }}
    >
      {/* Chrome shimmer line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 8%, rgba(255,255,255,0.05) 28%, rgba(212,184,122,0.20) 50%, rgba(255,255,255,0.05) 72%, transparent 92%)',
          opacity: 0.82,
        }}
      />
      <div className="flex w-full items-center justify-between gap-2">
        {/* ── ESQUERDA: logo IPB metálico + tagline ── */}
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.55rem] border border-[#d4b87a]/35 relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #d4b87a 40%, #a08040 70%, #1a1a1e 100%)',
              boxShadow:
                'inset 0 1px 2px rgba(255,255,255,0.5), 0 0 10px rgba(212,184,122,0.25), 0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            {/* Gloss shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            <span
              className="text-[0.5rem] font-extrabold tracking-[0.03em] text-black md:text-[0.6rem] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              IPB
            </span>
          </div>
          <p
            className="hidden text-[8px] font-bold uppercase tracking-[0.15em] sm:block md:text-[9px]"
            style={{
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #d4b87a 50%, #9a7a42 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 12px rgba(212, 184, 122, 0.1)',
            }}
          >
            Intelligence Platform Business
          </p>
        </div>

        {/* ── CENTRO: saudação + data (estilo IPB) ── */}
        <div className="flex items-center gap-2">
          {mounted && (
            <>
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                <GreetIcon className="h-2.5 w-2.5 text-white/50" />
                <span
                  className="text-[9px] font-medium text-white/45"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {greeting}{firstName ? `, ${firstName}` : ''}
                </span>
              </div>
              <span
                className="text-[8px] uppercase tracking-[0.12em] text-white/25 sm:text-[9px]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {dateLabel}
              </span>
            </>
          )}
        </div>

        {/* ── DIREITA: zoom A−/A+ + bell + perfil ── */}
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          {/* Zoom A−/A+ — visível em mobile e desktop */}
          <div
            className="flex items-center gap-0.5 overflow-hidden rounded-[0.6rem] border border-white/10"
            style={{ background: zoomShellBg }}
          >
            <button
              onClick={decreaseFontScale}
              disabled={scalePct <= 20}
              aria-label="Diminuir texto"
              title="Diminuir texto"
              className="flex h-6 w-6 items-center justify-center text-white/40 transition hover:text-white/75 disabled:opacity-20 disabled:cursor-not-allowed md:h-7 md:w-7"
            >
              <span className="text-[9px] font-bold" style={{ fontFamily: 'monospace' }}>A−</span>
            </button>
            <span
              className="hidden select-none px-1 text-[8px] tabular-nums text-white/25 w-[28px] text-center md:inline-block"
              style={{ fontFamily: 'monospace' }}
            >
              {scalePct}%
            </span>
            <button
              onClick={increaseFontScale}
              disabled={scalePct >= 200}
              aria-label="Aumentar texto"
              title="Aumentar texto"
              className="flex h-6 w-6 items-center justify-center text-white/40 transition hover:text-white/75 disabled:opacity-20 disabled:cursor-not-allowed md:h-7 md:w-7"
            >
              <span className="text-[11px] font-bold" style={{ fontFamily: 'monospace' }}>A+</span>
            </button>
          </div>

          {/* Bell */}
          <div className="relative" ref={notifRef}>
            <button
              aria-label="Notificações"
              onClick={handleBellClick}
              className="flex h-6 w-6 items-center justify-center rounded-[0.5rem] border border-white/12 text-white/70 transition hover:text-white md:h-7 md:w-7 md:rounded-[0.6rem]"
              style={{ background: btnShellBg }}
            >
              <Bell className="h-3 w-3" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-white text-[6px] font-bold text-black">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Perfil */}
          <button
            aria-label="Perfil"
            onClick={() => router.push('/profile')}
            className="flex h-6 w-6 items-center justify-center rounded-[0.5rem] border border-white/12 text-white/70 transition hover:text-white md:h-7 md:w-7 md:rounded-[0.6rem]"
            style={{ background: btnShellBg }}
          >
            {profile?.photo_url ? (
              <img src={profile.photo_url} alt="" className="h-full w-full rounded-[0.3rem] object-cover" />
            ) : (
              <User className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>

      {/* Painel de notificações */}
      {showNotif && (
        <div className="fixed right-2 top-14 z-50 md:right-6">
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
      <div className="flex items-center justify-between border-b border-white/6 px-4 py-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">Notificações</p>
        <button onClick={onClose} className="text-white/30 hover:text-white">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

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
