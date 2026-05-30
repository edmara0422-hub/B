export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#010101] text-white px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-[12px] font-bold mb-4">Termos de Uso — IPB</h1>
      <p className="text-[8px] text-white/40 mb-6">Ultima atualizacao: 18 de maio de 2026.</p>
      <div className="space-y-4 text-[8px] leading-relaxed text-white/60">
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">1. Aceitacao dos Termos</h2>
          <p>Ao acessar e utilizar o aplicativo IPB, voce concorda com estes Termos de Uso. Caso nao concorde, nao utilize o aplicativo.</p>
        </section>
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">2. Descricao do Servico</h2>
          <p>O IPB e uma plataforma educacional voltada para profissionais de fisioterapia. O app oferece ferramentas de estudo, prontuario inteligente, calculadoras clinicas, simulacoes 3D e conteudos especializados. O app NAO substitui o julgamento clinico profissional.</p>
        </section>
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">3. Conta do Usuario</h2>
          <p>Voce e responsavel por manter a confidencialidade da sua senha e por todas as atividades realizadas na sua conta. Notifique-nos imediatamente em caso de uso nao autorizado.</p>
        </section>
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">4. Uso Adequado e Analises Automatizadas (LGPD Art. 20)</h2>
          <p>O conteudo do app e para fins educacionais e de apoio a decisao clinica. O IPB realiza analises automatizadas (calculo de escores, interpretacao de exames, alertas, recomendacoes, deteccao de TOT em imagens). Estas analises:</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            <li>Sao ferramentas de apoio — NAO substituem o julgamento clinico.</li>
            <li>NAO devem ser utilizadas como unica base para decisoes clinicas — sempre correlacione com a avaliacao presencial do paciente.</li>
            <li>Sao baseadas em diretrizes clinicas publicas (com excecao da analise de imagem por IA).</li>
          </ul>
          <p className="mt-1">Conforme a LGPD Art. 20, voce tem direito a solicitar revisao das decisoes automatizadas e informacoes sobre os criterios utilizados, entrando em contato com o Encarregado pelo email indicado na Politica de Privacidade.</p>
        </section>
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">5. Responsabilidade do Usuario quanto a Dados do Paciente</h2>
          <p>O IPB e uma ferramenta de apoio clinico anonimo, projetada para nao identificar pacientes. Voce, como usuario profissional de saude, concorda em:</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            <li><span className="text-white/70">NAO inserir dados identificaveis do paciente</span> nos campos abertos do app (Historia Clinica, Diagnostico, observacoes), incluindo: nome, CPF, RG, data de nascimento, numero de prontuario, endereco, contato ou nome de familiares.</li>
            <li>Utilizar apenas descricao clinica do caso (diagnostico, parametros, evolucao) e o numero do leito como referencia interna.</li>
            <li>Nao identificar o hospital, clinica, unidade ou instituicao onde o paciente esta sendo atendido.</li>
            <li>Em caso de descumprimento, o usuario assume integral responsabilidade por eventual identificacao indevida do paciente, isentando o IPB de qualquer dano decorrente.</li>
          </ul>
          <p className="mt-1">A arquitetura tecnica do app nao impede a digitacao desses dados em campos de texto livre — a responsabilidade pela anonimizacao no preenchimento e do usuario.</p>
        </section>
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">6. Propriedade Intelectual</h2>
          <p>Todo o conteudo, design, codigo e marca IPB sao propriedade da desenvolvedora. E proibida a reproducao, distribuicao ou modificacao sem autorizacao.</p>
        </section>
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">7. Cancelamento e Exclusao</h2>
          <p>Voce pode cancelar sua conta a qualquer momento nas configuracoes do perfil. Ao excluir a conta, todos os dados sao removidos permanentemente conforme a LGPD.</p>
        </section>
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">8. Limitacao de Responsabilidade</h2>
          <p>O IPB e fornecido "como esta". Nao garantimos disponibilidade ininterrupta ou ausencia de erros. Nao nos responsabilizamos por decisoes clinicas tomadas com base no conteudo do app.</p>
        </section>
        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">9. Contato</h2>
          <p>Duvidas ou solicitacoes: erbusiness0422@gmail.com</p>
        </section>
      </div>
    </div>
  )
}
