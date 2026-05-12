import { MainShell } from '@/components/sea/main-shell'
import { AuthGuard } from '@/components/sea/auth-guard'
import { SeaBackdrop } from '@/components/sea/sea-backdrop'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      {/* Fundo espacial montado UMA vez no layout — persiste em todas as transições
          de página (Home→Explore→Perfil→Admin) sem recriar o canvas.
          subtle = brilhos espaciais discretos no app (splash mantém intensidade cheia). */}
      <SeaBackdrop subtle />
      <MainShell>{children}</MainShell>
    </AuthGuard>
  )
}
