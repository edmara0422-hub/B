// SeaBackdrop — fundo espacial completo do app.
// IpbBackground (2D: partículas douradas + halos + raios + grade) + VineCanvas
// (3D Three.js: estrelas + sparkles + bloom + vinhas). VineCanvas é lazy via
// dynamic import com ssr:false pra não pesar o initial bundle.
'use client'

import dynamic from 'next/dynamic'
import { IpbBackground } from './ipb-background'

const VineCanvas = dynamic(() => import('./vine-canvas'), { ssr: false })

export function SeaBackdrop() {
  return (
    <>
      <VineCanvas />
      <IpbBackground />
    </>
  )
}
