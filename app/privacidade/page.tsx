export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#010101] text-white px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-[12px] font-bold mb-4">Politica de Privacidade — SEA Fisio</h1>
      <p className="text-[8px] text-white/40 mb-6">Ultima atualizacao: 18 de maio de 2026.</p>
      <div className="space-y-4 text-[8px] leading-relaxed text-white/60">

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">1. Dados que Coletamos</h2>
          <p className="mb-1">Coletamos apenas os dados necessarios para o funcionamento do app, organizados por categoria:</p>

          <p className="text-white/70 mt-1 mb-0.5">a) Dados de conta</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Nome, email e foto de perfil fornecidos no cadastro.</li>
          </ul>

          <p className="text-white/70 mt-1 mb-0.5">b) Dados de acesso e seguranca</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Registro de login: data, hora, endereco IP e informacoes do dispositivo (user agent). Finalidade: auditoria de seguranca e deteccao de acessos nao autorizados.</li>
            <li>Cache de geolocalizacao de IP: pais, regiao e cidade estimados a partir do IP de acesso. Dados mantidos em cache por ate 30 dias para reducao de chamadas externas. Acesso bloqueado a usuarios.</li>
          </ul>

          <p className="text-white/70 mt-1 mb-0.5">c) Dados clinicos do prontuario (dados sensiveis de saude)</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Para usuarios comuns: armazenados exclusivamente no dispositivo (localStorage). Nunca enviados ao servidor. Apagados automaticamente ao fim do plantao pelo temporizador de conformidade LGPD.</li>
            <li>Para a administradora: sincronizados com servidor seguro (Supabase/AWS) com criptografia em transito (TLS 1.3) e em repouso.</li>
          </ul>

          <p className="text-white/70 mt-1 mb-0.5">d) Dados de uso anonimizados</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Eventos de interacao (funcionalidades acessadas, tempo de uso) vinculados ao ID de usuario. Utilizados para melhoria do app. Nao incluem conteudo clinico.</li>
          </ul>

          <p className="text-white/70 mt-2 mb-0.5">O que o SEA Fisio NAO coleta sobre o paciente</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Nome, CPF, RG, data de nascimento ou qualquer identificador direto do paciente.</li>
            <li>Hospital, clinica, instituicao ou unidade onde o paciente esta internado.</li>
            <li>Cidade, estado ou qualquer localizacao geografica do atendimento.</li>
            <li>Numero de prontuario externo, registro institucional ou prontuario eletronico.</li>
            <li>Foto, contato ou dados de familiares do paciente.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">2. Anonimizacao por Design (LGPD Art. 12)</h2>
          <p>O SEA Fisio foi arquitetado com o principio de privacidade por padrao: o paciente nunca e identificado no sistema. A estrutura tecnica do app impede a coleta de dados que vinculem os parametros clinicos a um individuo especifico, ao hospital ou a localizacao.</p>
          <p className="mt-1">Cada registro contem apenas: numero do leito (sem vinculo institucional), parametros antropometricos (idade, sexo, peso, altura — necessarios para calculos clinicos), historia clinica e diagnostico descritos pelo profissional. Conforme a LGPD Art. 12, dados anonimizados deixam de ser considerados dados pessoais.</p>
          <p className="mt-1">Mesmo no servidor da administradora (Supabase, AWS Sao Paulo), nao ha como identificar de qual hospital, cidade ou instituicao os dados clinicos foram inseridos — apenas o usuario que os inseriu.</p>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">3. Base Legal para Tratamento (LGPD Art. 7 e Art. 11)</h2>
          <ul className="list-disc pl-4 space-y-0.5">
            <li><span className="text-white/70">Dados de conta e acesso:</span> execucao de contrato e legitimo interesse de seguranca (Art. 7, V).</li>
            <li><span className="text-white/70">Dados clinicos (dados sensiveis de saude):</span> consentimento explicito do titular (Art. 11, I), coletado no momento do cadastro.</li>
            <li><span className="text-white/70">Analytics:</span> legitimo interesse para melhoria do servico (Art. 7, IX), com dados anonimizados sempre que possivel.</li>
            <li><span className="text-white/70">Registros de login e IP:</span> legitimo interesse de seguranca e prevencao a fraudes (Art. 7, IX).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">4. Armazenamento, Seguranca e Retencao</h2>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Dados armazenados no Supabase (infraestrutura AWS, regiao sa-east-1 — Sao Paulo) com criptografia em repouso e TLS 1.3 em transito.</li>
            <li>Acesso ao banco de dados protegido por politicas de seguranca em nivel de linha (RLS): cada usuario acessa apenas seus proprios dados.</li>
            <li><span className="text-white/70">Retencao de registros de login:</span> apagados automaticamente apos 90 dias via rotina do banco de dados.</li>
            <li><span className="text-white/70">Retencao de cache de geolocalizacao:</span> apagado automaticamente apos 30 dias.</li>
            <li><span className="text-white/70">Retencao de analytics:</span> apagados automaticamente apos 1 ano.</li>
            <li><span className="text-white/70">Dados clinicos (usuarios comuns):</span> apagados automaticamente no dispositivo ao fim de cada plantao — nunca chegam ao servidor.</li>
            <li><span className="text-white/70">Apos exclusao de conta:</span> todos os dados pessoais removidos permanentemente em ate 7 dias uteis.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">5. Protecao de Dados Clinicos no Dispositivo</h2>
          <p>O app implementa medidas tecnicas para proteger dados clinicos no dispositivo:</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            <li>Temporizador de plantao: dados apagados automaticamente ao fim do turno configurado.</li>
            <li>Verificacao no inicio de cada sessao: se o horario de corte ja passou, os dados sao apagados antes de qualquer renderizacao.</li>
            <li>Impressao bloqueada: o app impede a impressao de dados clinicos pelo navegador.</li>
            <li>Marca d agua de rastreabilidade: identificador do usuario sobreposto a tela para rastreamento de capturas de tela.</li>
            <li>Bloqueio de tela ao trocar de aplicativo: conteudo ocultado automaticamente quando o app perde o foco.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">6. Analises Automatizadas (LGPD Art. 20)</h2>
          <p>O SEA Fisio realiza analises automatizadas sobre os dados clinicos inseridos para apoiar a tomada de decisao profissional. Estas analises incluem:</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            <li>Calculo de escores clinicos (Glasgow, RASS, RSBI, NRS, BPS, P/F, HACOR, SOFA e outros).</li>
            <li>Interpretacao de parametros laboratoriais com alertas coloridos por gravidade.</li>
            <li>Analise de tendencia de drogas vasoativas (DVA): subida, descida, suspensao, washout.</li>
            <li>Analise de balanco hidrico e estimativa de perdas insensiveis.</li>
            <li>Deteccao automatizada de posicionamento de tubo orotraqueal e intubacao seletiva via analise de imagem (IA).</li>
            <li>Recomendacoes clinicas baseadas em diretrizes (sedacao, desmame, balanco, alvos ventilatorios).</li>
          </ul>
          <p className="mt-2">Conforme a LGPD Art. 20, voce tem direito a:</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            <li>Solicitar informacoes sobre os criterios e procedimentos utilizados nas analises automatizadas.</li>
            <li>Solicitar revisao dessas analises por agente humano (a propria desenvolvedora).</li>
            <li>Ser informado quando uma analise automatica contribuiu para uma decisao clinica.</li>
          </ul>
          <p className="mt-2 text-white/72">Importante: as analises automatizadas sao <span className="text-white/85">ferramentas de apoio</span>. A decisao clinica final e sempre do profissional de saude usuario — o app NAO substitui o julgamento clinico. Os criterios usados sao baseados em diretrizes clinicas publicas (SCCM, ATS, Sociedade Brasileira de Pneumologia, etc.) e nao em modelos opacos de aprendizado de maquina (com excecao da analise de imagem de RX/TC de torax, que utiliza modelos de IA — neste caso, as medidas sao sempre apresentadas com a possibilidade de revisao manual).</p>
          <p className="mt-1">Para exercer o direito de revisao: <span className="text-white/70">edmararbusiness1@gmail.com</span></p>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">7. Compartilhamento de Dados</h2>
          <p>NAO vendemos, alugamos ou compartilhamos dados pessoais com terceiros para fins comerciais. Utilizamos os seguintes prestadores de servico essenciais:</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            <li>Supabase (banco de dados e autenticacao) — politica em supabase.com/privacy.</li>
            <li>Vercel (hospedagem do app) — politica em vercel.com/legal/privacy-policy.</li>
            <li>Resend (envio de emails transacionais) — politica em resend.com/legal/privacy-policy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">8. Seus Direitos (LGPD Art. 18)</h2>
          <p>Voce tem direito a:</p>
          <ul className="list-disc pl-4 mt-1 space-y-0.5">
            <li>Confirmar a existencia de tratamento dos seus dados.</li>
            <li>Acessar seus dados pessoais.</li>
            <li>Corrigir dados incorretos ou incompletos.</li>
            <li>Anonimizar, bloquear ou eliminar dados desnecessarios.</li>
            <li>Solicitar a portabilidade dos dados.</li>
            <li>Revogar o consentimento a qualquer momento (sem prejuizo da legalidade do tratamento anterior).</li>
            <li>Excluir sua conta e todos os dados associados (Perfil → Excluir minha conta).</li>
          </ul>
          <p className="mt-1">Para exercer seus direitos: <span className="text-white/70">edmararbusiness1@gmail.com</span></p>
          <p className="mt-0.5">Prazo de resposta: ate 15 dias uteis conforme LGPD Art. 18, §5.</p>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">9. Notificacao de Incidentes</h2>
          <p>Em caso de incidente de seguranca que possa acarretar risco ou dano relevante aos titulares, comunicaremos a Autoridade Nacional de Protecao de Dados (ANPD) e os usuarios afetados no prazo de ate 2 dias uteis apos a ciencia do evento, conforme LGPD Art. 48. A comunicacao incluira: natureza dos dados afetados, usuarios envolvidos, medidas tecnicas adotadas e contato do Encarregado.</p>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">10. Cookies e Armazenamento Local</h2>
          <p>O app utiliza localStorage do navegador para manter dados clinicos temporarios e preferencias de sessao. Nao utilizamos cookies de rastreamento de terceiros para publicidade. O armazenamento local e apagado automaticamente ao fim do plantao (dados clinicos) ou ao excluir a conta.</p>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">11. Menores de Idade</h2>
          <p>O app e destinado exclusivamente a profissionais de saude maiores de 18 anos. Nao coletamos intencionalmente dados de menores.</p>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">12. Alteracoes nesta Politica</h2>
          <p>Podemos atualizar esta politica periodicamente. Notificaremos sobre mudancas significativas via app ou email com antecedencia minima de 15 dias.</p>
        </section>

        <section>
          <h2 className="text-[9px] font-semibold text-white/80 mb-1">13. Encarregado de Protecao de Dados (DPO)</h2>
          <p>Responsavel pelo tratamento de dados: <span className="text-white/70">Edmara Rocha</span></p>
          <p>Email: <span className="text-white/70">edmararbusiness1@gmail.com</span></p>
          <p className="mt-0.5 text-white/40">SEA Fisio — Plataforma educacional para profissionais de fisioterapia.</p>
        </section>

      </div>
    </div>
  )
}