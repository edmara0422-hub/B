import { create } from 'zustand'

export type Candidate = {
  id: string
  name: string
  role: string
  type: 'liderado' | 'gestor' | 'lider-gestor' | 'lider'
  score: string
  stage: 'triagem' | 'entrevista' | 'decisao' | 'onboarding' | 'efetivado'
}

export type TeamMember = {
  id: string
  name: string
  role: string
  type: 'liderado' | 'gestor' | 'lider-gestor' | 'lider'
  d6: number
  influence: number
  impact: number
  maturity: 'M1' | 'M2' | 'M3' | 'M4'
}

export type ManifestoCheck = {
  id: string
  txt: string
  status: boolean
}

type SigPessoasState = {
  activeTab: 'home' | 'lideres' | 'time' | 'empresa'
  lideresTab: 'recrutar' | 'voce' | 'gerir' | 'delegar'
  timeTab: 'formar' | 'pessoas' | 'influencia' | 'significado'
  empresaTab: 'estrategia' | 'bi' | 'relatorio' | 'canais'
  
  candidates: Candidate[]
  team: TeamMember[]
  manifesto: ManifestoCheck[]
  
  setActiveTab: (tab: 'home' | 'lideres' | 'time' | 'empresa') => void
  setLideresTab: (tab: 'recrutar' | 'voce' | 'gerir' | 'delegar') => void
  setTimeTab: (tab: 'formar' | 'pessoas' | 'influencia' | 'significado') => void
  setEmpresaTab: (tab: 'estrategia' | 'bi' | 'relatorio' | 'canais') => void

  addCandidate: (c: Candidate) => void
  updateCandidateStage: (id: string, stage: Candidate['stage']) => void
  addTeamMember: (m: TeamMember) => void
  toggleManifesto: (id: string) => void
}

export const useSigPessoasStore = create<SigPessoasState>((set) => ({
  activeTab: 'home',
  lideresTab: 'recrutar',
  timeTab: 'pessoas',
  empresaTab: 'estrategia',
  
  candidates: [
    { id: 'c1', name: 'Ana Beatriz', role: 'Head de Growth', type: 'lider', score: 'HHS A / Lencioni 9.2', stage: 'triagem' },
    { id: 'c2', name: 'Bruno Melo', role: 'Dev Pleno', type: 'liderado', score: 'HHS B+', stage: 'entrevista' },
  ],
  team: [
    { id: 't1', name: 'Rodrigo Silva', role: 'Coordenador', type: 'gestor', d6: 82, influence: 80, impact: 60, maturity: 'M3' }
  ],
  manifesto: [
    { id: 'P01', txt: 'Lidero pelo exemplo antes de exigir', status: true },
    { id: 'P02', txt: 'Desenvolvo pessoas como legado', status: false },
    { id: 'P03', txt: 'Feedback é presente, não punição', status: true },
    { id: 'P04', txt: 'Conflito gerenciado gera inovação', status: true },
    { id: 'P05', txt: 'Saúde emocional do time', status: false },
  ],

  setActiveTab: (tab) => set({ activeTab: tab }),
  setLideresTab: (tab) => set({ lideresTab: tab }),
  setTimeTab: (tab) => set({ timeTab: tab }),
  setEmpresaTab: (tab) => set({ empresaTab: tab }),

  addCandidate: (c) => set((state) => ({ candidates: [...state.candidates, c] })),
  updateCandidateStage: (id, stage) => set((state) => ({
    candidates: state.candidates.map(c => c.id === id ? { ...c, stage } : c)
  })),
  addTeamMember: (m) => set((state) => ({ team: [...state.team, m] })),
  toggleManifesto: (id) => set((state) => ({
    manifesto: state.manifesto.map(m => m.id === id ? { ...m, status: !m.status } : m)
  })),
}))
