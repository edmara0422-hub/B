// SeaBackdrop — fundo espacial completo do app (mounted UMA vez no layout).
// IpbBackground 2D (partículas + halos) + VineCanvas 3D (estrelas + bloom).
// Como vive no layout, só monta 1× na sessão — não impacta navegação entre páginas.
'use client'

import dynamic from 'next/dynamic'
import { IpbBackground } from './ipb-background'

const VineCanvas = dynamic(() => import('./vine-canvas'), { ssr: false })

/**
 * `subtle` (default true para layout do app) reduz a intensidade dos brilhos
 * espaciais em Home/Explorar/Perfil — splash NUNCA usa SeaBackdrop, fica intacto.
 */
export function SeaBackdrop({ subtle = true }: { subtle?: boolean } = {}) {
  return (
    <>
      {/* Fundo 3D: estrelas + bloom + vinhas — wrapper de opacity para discretizar */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, opacity: subtle ? 0.5 : 1 }}>
        <VineCanvas />
      </div>
      {/* Fundo 2D: partículas douradas/prata + halos pulsantes + raios + grid */}
      <IpbBackground subtle={subtle} />
    </>
  )
}
