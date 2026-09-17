// Planos, amostra grátis, assinatura simulada, conta e cancelamento honesto.
(function (C) {
  let etapa = 'planos'; // planos | dados | pagamento | pronto
  let planoEscolhido = 'mensal';
  const PRECOS = { mensal: 'R$ 19,90', estudante: 'R$ 9,90' };
  const proximaCobranca = '2026-10-17';

  const colunaGratis = () => `<div class="cartao plano"><p class="rotulo">Amostra grátis</p><div class="preco">R$ 0<small> · sem cartão</small></div>
    <ul><li>Capa de cada edição, com a parábola da manchete</li><li>Painel com os valores atuais dos seis indicadores</li><li>Parábola e entendimento de todas as matérias</li><li>Uma matéria completa por edição (as três camadas)</li><li>Calendário de lançamentos e avisos</li><li>Glossário</li><li class="nao">Profundidade das demais matérias</li><li class="nao">Séries históricas, gráficos e tabelas</li><li class="nao">Arquivo completo</li></ul>
    <p class="microcopy">É o que você já tem agora.</p></div>`;
  const colunaPaga = () => `<div class="cartao plano plano-destaque"><p class="rotulo">Assinatura mensal</p><div class="preco">${PRECOS[planoEscolhido]}<small> /mês</small></div>
    <div class="acoes" role="group" aria-label="Plano"><button type="button" class="chip chip-btn chip-filtro" data-plano="mensal" aria-pressed="${planoEscolhido === 'mensal'}">Mensal · R$ 19,90</button><button type="button" class="chip chip-btn chip-filtro" data-plano="estudante" aria-pressed="${planoEscolhido === 'estudante'}">Estudante · R$ 9,90</button></div>
    <ul><li>Tudo da amostra grátis</li><li>A profundidade de todas as matérias</li><li>Séries históricas desde 2016, gráficos e tabelas para copiar</li><li>Link direto para cada série na fonte oficial</li><li>Arquivo completo de edições</li><li>"Copiar resumo" do painel para reuniões</li></ul>
    <p style="font-size:14px;margin:0"><strong>Cancele quando quiser</strong>, em dois toques, e mantenha o acesso até o fim do período pago. Renovação automática todo mês, avisada por e-mail 3 dias antes.</p>
    ${C.estado.assinante ? `<a class="btn btn-secundario" href="#/conta">Você já assina · ver conta</a>` : `<button type="button" class="btn btn-primario" data-assinar>Assinar por ${PRECOS[planoEscolhido]}/mês</button>`}
    ${planoEscolhido === 'estudante' ? '<p class="microcopy">Plano estudante: exige e-mail de instituição de ensino.</p>' : ''}</div>`;

  C.screens.planos = {
    titulo: () => 'Planos e assinatura',
    render(params, query) {
      const volta = query.volta || '#/';
      if (etapa === 'dados') return `<div class="container coluna-leitura" style="margin:0 auto"><nav class="breadcrumb"><a href="#/planos">Planos</a> › Sua conta</nav><h1>Sua conta</h1><p class="muted">Só o necessário para você entrar e receber a nota fiscal.</p>
        <form id="form-dados"><div class="campo"><label for="email">E-mail</label><input id="email" type="email" required placeholder="voce@exemplo.com.br" value="${C.esc(C.estado.email || '')}"></div>
        <div class="campo"><label for="senha">Senha (ou deixe em branco para receber um link de acesso por e-mail)</label><input id="senha" type="password" autocomplete="new-password"></div>
        <div class="acoes"><button type="button" class="btn btn-terciario" data-etapa="planos">Voltar</button><span class="espaco"></span><button class="btn btn-primario" type="submit">Continuar para o pagamento</button></div></form></div>`;
      if (etapa === 'pagamento') return `<div class="container coluna-leitura" style="margin:0 auto"><nav class="breadcrumb"><a href="#/planos">Planos</a> › Conta › Pagamento</nav><h1>Pagamento</h1>
        <div class="cartao" style="margin-bottom:16px"><strong>Assinatura ${planoEscolhido === 'estudante' ? 'estudante' : 'mensal'} · ${PRECOS[planoEscolhido]}/mês</strong><div class="microcopy">Primeira cobrança hoje, 17/09/2026. Próxima em ${C.fmtData(proximaCobranca)}. Renovação automática; cancele quando quiser.</div></div>
        <p class="rotulo">Forma de pagamento (simulada no protótipo)</p>
        <label class="radio"><input type="radio" name="pg" value="pix" checked> <span><strong>Pix</strong><br><span class="microcopy">Cobrança mensal por Pix automático, com aviso por e-mail 3 dias antes.</span></span></label>
        <label class="radio"><input type="radio" name="pg" value="cartao"> <span><strong>Cartão de crédito</strong><br><span class="microcopy">Cobrança recorrente. A fatura mostra "COMO ESTA O PAIS".</span></span></label>
        <div class="acoes" style="margin-top:16px"><button type="button" class="btn btn-terciario" data-etapa="dados">Voltar</button><span class="espaco"></span><button type="button" class="btn btn-primario" data-confirmar-pagamento>Confirmar assinatura de ${PRECOS[planoEscolhido]}/mês</button></div>
        <p class="microcopy" style="margin-top:16px">Nenhum pagamento real é feito neste protótipo.</p></div>`;
      if (etapa === 'pronto') return `<div class="container coluna-leitura" style="margin:0 auto;text-align:center;padding-top:32px"><div style="font-size:48px" aria-hidden="true">✓</div><h1>Pronto. Você assina Como Está o País.</h1><p class="muted">Sua próxima cobrança é em ${C.fmtData(proximaCobranca)}. Cancele quando quiser em <a href="#/conta">Conta</a>. Enviamos a confirmação para ${C.esc(C.estado.email)}.</p>
        <div class="acoes" style="justify-content:center"><a class="btn btn-primario" href="${C.esc(volta)}" data-etapa="planos">Voltar para onde você estava</a><a class="btn btn-secundario" href="#/" data-etapa="planos">Ir para a capa</a></div></div>`;
      return `<div class="container">
        <header class="cabecalho-tela"><h1>Planos</h1><p>Um plano só, mensal, sem fidelidade. Antes de assinar, veja o que a amostra grátis já dá — não queremos que você descubra o paywall por acidente.</p></header>
        <div class="grid grid-2">${colunaGratis()}${colunaPaga()}</div>
        <section class="secao coluna-leitura"><h2 class="secao-titulo">Perguntas frequentes</h2><div class="faq">
          <details><summary>Como cancelo?</summary><p>Em <a href="#/conta">Conta › Assinatura › Cancelar assinatura</a>. Uma tela, um botão de confirmação. Sem ligação, sem chat, sem oferta de última hora. O acesso continua até o fim do período pago.</p></details>
          <details><summary>A renovação é automática?</summary><p>Sim, todo mês, na data em que você assinou. Avisamos por e-mail 3 dias antes de cada cobrança.</p></details>
          <details><summary>Emitem nota fiscal?</summary><p>Sim, por e-mail, a cada cobrança.</p></details>
          <details><summary>O que acontece quando cancelo?</summary><p>Você mantém a conta, a amostra grátis e os avisos que ativou. Só a profundidade e as séries deixam de abrir.</p></details>
          <details><summary>Vocês dão dicas de investimento?</summary><p>Não. Explicamos o que aconteceu na economia e o que costuma significar. O que fazer com o seu dinheiro é decisão sua — não somos consultores registrados na CVM.</p></details>
        </div></section>
        ${C.aviso()}
      </div>`;
    },
    depois(params, query) {
      const root = document.getElementById('app');
      root.onclick = (e) => {
        const p = e.target.closest('[data-plano]'); if (p) { planoEscolhido = p.dataset.plano; C._manterScroll = true; C.render(); return; }
        if (e.target.closest('[data-assinar]')) { etapa = 'dados'; C.render(); return; }
        const et = e.target.closest('[data-etapa]'); if (et) { etapa = et.dataset.etapa; if (!et.getAttribute('href')) C.render(); return; }
        if (e.target.closest('[data-confirmar-pagamento]')) { C.estado.assinante = true; C.estado.assinaturaDesde = '2026-09-17'; C.estado.canceladaEm = null; C.estado.plano = planoEscolhido; C.salvar(); etapa = 'pronto'; C.render(); C.toast(`Pronto. Sua próxima cobrança é em ${C.fmtData(proximaCobranca)}.`); return; }
      };
      const f = document.getElementById('form-dados'); if (f) f.onsubmit = (e) => { e.preventDefault(); C.estado.email = document.getElementById('email').value; C.salvar(); etapa = 'pagamento'; C.render(); };
    }
  };

  // ===== Conta e cancelamento =====
  let cancelando = false, cancelado = false;
  C.screens.conta = {
    titulo: () => 'Conta',
    render() {
      const perfil = (C.PERFIS || []).find((p) => p.id === C.estado.perfil);
      if (cancelando) return `<div class="container coluna-leitura" style="margin:0 auto"><nav class="breadcrumb"><a href="#/conta">Conta</a> › Cancelar assinatura</nav><h1>Cancelar assinatura</h1>
        <div class="cartao" style="margin-bottom:16px"><p style="margin:0"><strong>Sua assinatura termina em ${C.fmtData(proximaCobranca)}.</strong> Até lá, você tem acesso completo. Depois, a conta continua com a amostra grátis e os avisos.</p></div>
        <p class="rotulo">Quer nos dizer o motivo? (opcional)</p>
        <label class="radio"><input type="radio" name="motivo" value="preco"> Está caro para mim agora</label>
        <label class="radio"><input type="radio" name="motivo" value="uso"> Não estou lendo o suficiente</label>
        <label class="radio"><input type="radio" name="motivo" value="conteudo"> O conteúdo não é o que eu esperava</label>
        <label class="radio"><input type="radio" name="motivo" value="outro"> Outro motivo</label>
        <div class="acoes" style="margin-top:24px"><button type="button" class="btn btn-secundario" data-cancelar-voltar>Voltar</button><button type="button" class="btn btn-primario" data-cancelar-confirmar>Confirmar cancelamento</button></div>
        <p class="microcopy" style="margin-top:16px">Sem segunda confirmação, sem oferta, sem ligação. Enviaremos um e-mail confirmando.</p></div>`;
      return `<div class="container coluna-leitura" style="margin:0 auto">
        <header class="cabecalho-tela"><h1>Conta</h1></header>
        ${cancelado ? `<div class="cartao" style="margin-bottom:24px;border-left:3px solid var(--baixa)"><strong>Cancelado.</strong> Você tem acesso completo até ${C.fmtData(proximaCobranca)}. Enviamos um e-mail de confirmação${C.estado.email ? ` para ${C.esc(C.estado.email)}` : ''}.</div>` : ''}
        <section class="secao" style="margin-top:0"><h2 class="secao-titulo">Assinatura</h2>
          ${C.estado.assinante ? `<p><strong>Assinatura ${C.estado.plano === 'estudante' ? 'estudante · R$ 9,90' : 'mensal · R$ 19,90'}/mês</strong> · desde ${C.fmtData(C.estado.assinaturaDesde)}${C.estado.canceladaEm ? ` · <span class="selo selo-aguardando">termina em ${C.fmtData(proximaCobranca)}</span>` : ` · próxima cobrança em ${C.fmtData(proximaCobranca)}`}</p>
            <div class="acoes">${C.estado.canceladaEm ? `<button type="button" class="btn btn-secundario" data-reativar>Reativar assinatura</button>` : `<button type="button" class="btn btn-secundario" data-cancelar>Cancelar assinatura</button>`}</div>`
          : `<p>Você está na <strong>amostra grátis</strong>. <a href="#/planos">Ver planos</a>.</p>`}</section>
        <section class="secao"><h2 class="secao-titulo">Perfil e interesses</h2>
          <p>${perfil ? `${perfil.ico} <strong>${perfil.titulo}</strong>` : 'Perfil não definido'} · ${(C.estado.interesses || []).map((i) => (C.INTERESSES.find((x) => x[0] === i) || [])[1]).filter(Boolean).join(', ') || 'sem interesses marcados'}</p>
          <div class="acoes"><a class="btn btn-terciario btn-pequeno" href="#/onboarding">Refazer o onboarding</a></div></section>
        <section class="secao"><h2 class="secao-titulo">Avisos</h2>
          <p class="microcopy">Só avisamos quando um dado oficial sai. Nunca promoção pelo mesmo canal.</p>
          ${C.indicadores.map((i) => `<label class="interruptor"><span><strong>${C.esc(i.nome)}</strong><div class="desc">${C.esc(i.proximaDescricao)} · ${C.fmtData(i.proximaDivulgacao)}, ${i.proximaHora}</div></span><input type="checkbox" data-alerta-toggle="${i.id}" ${C.estado.alertas.includes(i.id) ? 'checked' : ''} aria-label="Aviso de ${C.esc(i.nome)}"></label>`).join('')}
          <label class="interruptor"><span><strong>Boletim Focus</strong><div class="desc">Toda segunda-feira, 8h25</div></span><input type="checkbox" data-alerta-toggle="focus" ${C.estado.alertas.includes('focus') ? 'checked' : ''} aria-label="Aviso do Boletim Focus"></label>
          <label class="interruptor"><span><strong>Horário silencioso</strong><div class="desc">Não avisar entre 22h e 7h</div></span><input type="checkbox" checked aria-label="Horário silencioso"></label>
          ${C.estado.alertas.length === 0 ? '<div class="vazio" style="margin-top:12px">Você ainda não tem avisos. Escolha um indicador acima ou no <a href="#/calendario">calendário</a>.</div>' : ''}</section>
        <section class="secao"><h2 class="secao-titulo">Aparência</h2><div class="acoes"><button type="button" class="btn btn-secundario btn-pequeno" data-tema>Alternar modo claro/escuro</button></div></section>
        <section class="secao"><h2 class="secao-titulo">Protótipo</h2><p class="microcopy">Os dados desta conta ficam só no seu navegador.</p><button type="button" class="btn btn-terciario btn-pequeno" data-reiniciar>Reiniciar o protótipo</button></section>
      </div>`;
    },
    depois() {
      const root = document.getElementById('app');
      root.onclick = (e) => {
        if (e.target.closest('[data-cancelar]')) { cancelando = true; C.render(); return; }
        if (e.target.closest('[data-cancelar-voltar]')) { cancelando = false; C.render(); return; }
        if (e.target.closest('[data-cancelar-confirmar]')) { C.estado.canceladaEm = '2026-09-17'; C.salvar(); cancelando = false; cancelado = true; C.render(); C.toast(`Cancelado. Acesso completo até ${C.fmtData(proximaCobranca)}.`); return; }
        if (e.target.closest('[data-reativar]')) { C.estado.canceladaEm = null; C.salvar(); cancelado = false; C.render(); C.toast('Assinatura reativada.'); return; }
        if (e.target.closest('[data-reiniciar]')) { C.reiniciar(); return; }
      };
      root.onchange = (e) => { const t = e.target.closest('[data-alerta-toggle]'); if (t) { C._manterScroll = true; C.alternarAlerta(t.dataset.alertaToggle); } };
    }
  };

  C.screens.sobre = {
    titulo: () => 'Sobre',
    render() {
      return `<div class="container coluna-leitura editorial" style="margin:0 auto">
        <h1>Sobre</h1>
        <h3>O que é</h3><p>Como Está o País é uma revista digital mensal de macroeconomia brasileira. Publicamos no ritmo do calendário oficial: quando o IBGE divulga o IPCA, quando o Copom decide a Selic, quando o Tesouro fecha as contas. As matérias do mês formam a edição.</p>
        <h3>Método editorial: três camadas</h3><p>Toda matéria e todo indicador têm <strong>a parábola</strong> (uma história curta do dia a dia que carrega o mecanismo econômico), <strong>o entendimento</strong> (o que aconteceu, por que importa, o que tende a afetar) e <strong>a profundidade</strong> (a técnica, os números, a série histórica e a fonte). Pare onde quiser: cada camada deixa você com algo verdadeiro.</p>
        <h3>Política de fontes</h3><p>Só usamos dados oficiais — Banco Central do Brasil (SGS e Olinda), IBGE (SIDRA), Tesouro Nacional (Tesouro Transparente), IPEA (IPEADATA) e Ministério do Trabalho (Novo CAGED). Todo número mostra a fonte, o período de referência, a data de publicação e a próxima divulgação. Quando uma instituição revisa um dado, dizemos.</p>
        <h3>O que nunca fazemos</h3><p>Não recomendamos comprar, vender ou aplicar em nada. Não somos consultores de valores mobiliários registrados na CVM. Não torcemos por governo nem por oposição: explicamos mecanismos. Não usamos "dispara", "explode" ou "à beira de".</p>
        <h3>Este protótipo</h3><p>Todos os valores exibidos são <strong>ilustrativos</strong> — exemplos para demonstrar a experiência. As fontes, os identificadores de série e os endpoints citados são os oficiais.</p>
        ${C.aviso()}
      </div>`;
    }
  };
})(window.CEP);
