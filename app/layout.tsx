import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'IPB - Innovation Prototyping Board',
  description: 'Plataforma imersiva de aprendizado com simulacoes avancadas.',
  icons: {
    icon: '/icon.svg?v=2',
    shortcut: '/icon.svg?v=2',
    apple: '/icon.svg?v=2',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" style={{ background: '#010101', WebkitTextSizeAdjust: 'none' }}>
      <body style={{ background: '#010101' }}>
        {children}
      </body>
    </html>
  )
}
