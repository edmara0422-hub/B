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
    <>
      {/* SVG gradient definitions — prata e ouro metálico para ícones */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <linearGradient id="tb-silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="20%"  stopColor="#f1f5f9" />
            <stop offset="45%"  stopColor="#cbd5e1" />
            <stop offset="65%"  stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="tb-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff8e7" />
            <stop offset="30%"  stopColor="#f0d080" />
            <stop offset="60%"  stopColor="#d2af5a" />
            <stop offset="85%"  stopColor="#b8975a" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>

      {/*
        Wrapper fixo com borda gradiente: esquerda=prata → direita=dourado
        O header fica dentro como conteudo sem border própria
      */}
      <div
        className="fixed z-40"
        style={{
          width: 'calc(100% - 32px)',
          maxWidth: '1400px',
          left: '16px',
          right: '16px',
          top: '12px',
          borderRadius: '100px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.75), 0 0 20px rgba(201, 148, 58,0.10)',
        }}
      >
      <header
        className="px-4 py-2 md:px-6"
        style={{
          background: 'rgba(3, 3, 5, 0.75)',
          backdropFilter: 'blur(28px) saturate(140%)',
          WebkitBackdropFilter: 'blur(28px) saturate(140%)',
          borderRadius: '100px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
      {/* Hollow gradient border: silver on the left, gold on the right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '0.2px',
          background: 'linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 45%, #d2af5a 55%, #b8975a 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 30,
        }}
      />
      {/* Chrome shimmer line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 8%, rgba(255,255,255,0.05) 28%, rgba(201, 148, 58,0.20) 50%, rgba(255,255,255,0.05) 72%, transparent 92%)',
          opacity: 0.82,
        }}
      />
      <div className="flex w-full items-center justify-between gap-2">
        {/* ── ESQUERDA: logo IPB metálico + tagline ── */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Logo square — dourado champanhe mesclado com prata (estilo premium) */}
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.55rem] relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #e8f0f8 0%, #cbd5e1 20%, #d2af5a 50%, #b8975a 75%, #8b6914 100%)',
              border: '0.2px solid rgba(201, 148, 58,0.50)',
              boxShadow:
                'inset 0 1px 2px rgba(255,255,255,0.55), inset 0 -1px 2px rgba(0,0,0,0.35), 0 0 14px rgba(201, 148, 58,0.35), 0 4px 12px rgba(0,0,0,0.55)',
            }}
          >
            {/* Reflexo brilhante superior — polido */}
            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-[0.55rem]" />
            {/* Texto IPB — prata claro sobre fundo dourado */}
            <span
              className="text-[0.5rem] font-black tracking-[0.03em] md:text-[0.6rem] relative z-10"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 40%, #cbd5e1 70%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
              }}
            >
              IPB
            </span>
          </div>
          {/* Tagline — prata puro */}
          <p
            className="hidden text-[8px] uppercase tracking-[0.15em] sm:block md:text-[9px]"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 200,
              background: 'linear-gradient(135deg, #ffffff 0%, #e8edf5 28%, #cbd5e1 58%, #94a3b8 88%, #64748b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.15))',
            }}
          >
            Intelligence Platform Business
          </p>
        </div>

        {/* ── CENTRO: saudação + data (estilo IPB) ── */}
        <div className="flex items-center gap-2">
          {mounted && (
            <>
              <div
                className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1"
                style={{ border: '0.2px solid rgba(255, 255, 255, 0.1)' }}
              >
                <GreetIcon className="h-2.5 w-2.5 text-white/50" />
                <span
                  className="text-[9px] text-white/45"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
                >
                  {greeting}{firstName ? `, ${firstName}` : ''}
                </span>
              </div>
              <span
                className="text-[8px] uppercase tracking-[0.12em] text-white/25 sm:text-[9px]"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
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
            className="flex items-center gap-0.5 overflow-hidden rounded-[0.6rem]"
            style={{ background: zoomShellBg, border: '0.2px solid rgba(255, 255, 255, 0.1)' }}
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

          {/* Bell — prata metálica */}
          <div className="relative" ref={notifRef}>
            <button
              aria-label="Notificações"
              onClick={handleBellClick}
              className="flex h-6 w-6 items-center justify-center rounded-[0.5rem] transition md:h-7 md:w-7 md:rounded-[0.6rem]"
              style={{
                background: btnShellBg,
                border: '0.2px solid rgba(200,210,220,0.16)',
                boxShadow: 'inset 0 0.2px 0 rgba(255,255,255,0.08)',
              }}
            >
              <Bell
                className="h-3 w-3"
                style={{
                  stroke: 'url(#tb-silver-grad)',
                  strokeWidth: '2px',
                  filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.3))',
                }}
              />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-white text-[6px] font-bold text-black">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Perfil — dourado champanhe */}
          <button
            aria-label="Perfil"
            onClick={() => router.push('/profile')}
            className="flex h-6 w-6 items-center justify-center rounded-[0.5rem] transition md:h-7 md:w-7 md:rounded-[0.6rem]"
            style={{
              background: btnShellBg,
              border: '0.2px solid rgba(201, 148, 58,0.24)',
              boxShadow: 'inset 0 0.2px 0 rgba(255,255,255,0.08), 0 0 8px rgba(201, 148, 58,0.10)',
            }}
          >
            {profile?.photo_url ? (
              <img src={profile.photo_url} alt="" className="h-full w-full rounded-[0.3rem] object-cover" />
            ) : (
              <User
                className="h-3 w-3"
                style={{
                  stroke: 'url(#tb-gold-grad)',
                  strokeWidth: '2px',
                  filter: 'drop-shadow(0 0 4px rgba(201, 148, 58,0.4))',
                }}
              />
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
    </div>
    </>
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
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/60" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>Notificações</p>
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
                    <p className="text-[9px] text-white/70" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>{n.title}</p>
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
