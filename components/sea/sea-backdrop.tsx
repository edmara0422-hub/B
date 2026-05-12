// SeaBackdrop — fundo espacial completo do app (mounted UMA vez no layout).
// IpbBackground 2D (partículas + halos) + VineCanvas 3D (estrelas + bloom).
// Como vive no layout, só monta 1× na sessão — não impacta navegação entre páginas.
'use client'

import dynamic from 'next/dynamic'
import { IpbBackground } from './ipb-background'

const VineCanvas = dynamic(() => import('./vine-canvas'), { ssr: false })

export function SeaBackdrop() {
  return (
    <>
      {/* Fundo 3D: estrelas + bloom + vinhas */}
      <VineCanvas />
      {/* Fundo 2D: partículas douradas/prata + halos pulsantes + raios + grid */}
      <IpbBackground />
    </>
  )
}
