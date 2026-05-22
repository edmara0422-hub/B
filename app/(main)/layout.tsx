import { MainShell } from '@/components/sea/main-shell'
import { AuthGuard } from '@/components/sea/auth-guard'
import { SeaBackdrop } from '@/components/sea/sea-backdrop'
import { LgpdWatcher } from '@/components/sea/lgpd-watcher'
import { PrivacyShield } from '@/components/sea/privacy-shield'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      {/* Apaga dados clínicos do localStorage se o cutoff do plantão já passou.
          Roda em qualquer página autenticada, não só no painel SEA. */}
      <LgpdWatcher />
      <PrivacyShield />
      {/* Fundo espacial montado UMA vez no layout — persiste em todas as transições
          de página (Home→Explore→Perfil→Admin) sem recriar o canvas.
          subtle = brilhos espaciais discretos no app (splash mantém intensidade cheia). */}
      <SeaBackdrop subtle={false} />
      <MainShell>{children}</MainShell>
    </AuthGuard>
  )
}
