// SeaBackdrop — fundo espacial usado em todas as páginas internas (Home,
// Explore, Conteúdos, Sistemas, Perfil, Admin). Apenas o IpbBackground 2D
// (canvas leve com partículas+halos) — VineCanvas 3D fica EXCLUSIVO do splash
// pra não pesar a navegação entre páginas.
import { IpbBackground } from './ipb-background'

export function SeaBackdrop() {
  return <IpbBackground />
}
