// SeaBackdrop — fundo espacial do app (Splash, Home, Explore, Conteúdos, Sistemas).
// Renderiza o IpbBackground (partículas 2D + halos pulsantes + raios + grade)
// inspirado no IPB Design Kit. Centralizado aqui para que todas as páginas que
// usam SeaBackdrop ganhem o novo visual sem mudanças individuais.
import { IpbBackground } from './ipb-background'

export function SeaBackdrop() {
  return <IpbBackground />
}
