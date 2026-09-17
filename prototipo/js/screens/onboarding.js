// Onboarding: perfil, interesses e alertas em menos de 1 minuto. Não pede e-mail, cartão nem senha.
(function (C) {
  const PERFIS = [
    { id: 'pequeno_negocio', ico: '🏪', titulo: 'Pequeno negócio', desc: 'Loja, oficina, serviço. Decido preço e crédito.', interesses: ['juros', 'inflacao'] },
    { id: 'gestao', ico: '🏢', titulo: 'Gestão de empresa', desc: 'Preciso de um briefing mensal com fonte.', interesses: ['juros', 'cambio', 'contas_publicas'] },
    { id: 'autonomo', ico: '💻', titulo: 'Autônomo(a)', desc: 'Trabalho por conta. Quero entender sem jargão.', interesses: ['inflacao', 'juros'] },
    { id: 'estudante', ico: '🎓', titulo: 'Estudante', desc: 'Quero entender os mecanismos e achar a fonte.', interesses: ['atividade', 'juros', 'inflacao'] },
    { id: 'curioso', ico: '🔎', titulo: 'Curioso(a)', desc: 'Só quero saber como está o país.', interesses: ['inflacao', 'emprego'] }
  ];
  const INTERESSES = [['juros', 'Juros e crédito'], ['inflacao', 'Inflação e preços'], ['emprego', 'Emprego'], ['atividade', 'Crescimento (PIB)'], ['cambio', 'Dólar e câmbio'], ['contas_publicas', 'Contas do governo']];
  const TEMA_IND = { juros: 'selic', inflacao: 'ipca', emprego: 'desemprego', atividade: 'pib', cambio: 'cambio', contas_publicas: 'divida' };
  C.PERFIS = PERFIS; C.INTERESSES = INTERESSES; C.TEMA_IND = TEMA_IND;
  let passo = 1, perfil = null, interesses = [], alertasSugeridos = [];

  const passo1 = () => `<h1>Quem é você?</h1><p class="muted">Isso só muda a ordem dos destaques. Nada fica escondido.</p>
    <div class="opcoes-grid">${PERFIS.map((p) => `<button type="button" class="opcao" data-perfil="${p.id}" aria-pressed="${perfil === p.id}"><span class="ico" aria-hidden="true">${p.ico}</span><span class="titulo">${p.titulo}</span><span class="desc">${p.desc}</span></button>`).join('')}</div>`;
  const passo2 = () => `<h1>O que quer acompanhar?</h1><p class="muted">Marque quantos quiser. Sugerimos alguns com base no seu perfil.</p>
    <div class="acoes" style="gap:10px">${INTERESSES.map(([id, nome]) => `<button type="button" class="chip chip-btn chip-filtro" data-interesse="${id}" aria-pressed="${interesses.includes(id)}">${nome}</button>`).join('')}</div>`;
  const passo3 = () => {
    alertasSugeridos = interesses.slice(0, 2).map((t) => TEMA_IND[t]).filter(Boolean);
    if (!alertasSugeridos.length) alertasSugeridos = ['ipca', 'selic'];
    return `<h1>Quer que a gente avise?</h1><p class="muted">Só avisamos quando um dado oficial sai. Nunca promoção. Desligar é um toque.</p>
    ${alertasSugeridos.map((id) => { const i = C.indicador(id); return `<div class="cartao" style="margin-bottom:12px"><strong>${C.esc(i.nome)}</strong><div class="microcopy">${C.esc(i.proximaDescricao)} · ${C.fmtData(i.proximaDivulgacao)}, ${i.proximaHora} · ${C.esc(C.fonte(i.fonte).instituicao)}</div></div>`; }).join('')}
    <div class="acoes"><button type="button" class="btn btn-primario" data-ativar-alertas>Ativar avisos</button><button type="button" class="btn btn-secundario" data-concluir>Agora não</button></div>`;
  };

  C.screens.onboarding = {
    titulo: () => 'Começar',
    render() {
      return `<div class="container coluna-leitura" style="margin:0 auto">
        <div class="progresso" aria-label="Passo ${passo} de 3">${[1, 2, 3].map((n) => `<span data-feito="${n <= passo}"></span>`).join('')}</div>
        <div id="onb-passo">${passo === 1 ? passo1() : passo === 2 ? passo2() : passo3()}</div>
        <hr class="hr">
        <div class="acoes">${passo > 1 ? '<button type="button" class="btn btn-terciario" data-voltar>Voltar</button>' : ''}<span class="espaco"></span>
          ${passo < 3 ? `<button type="button" class="btn btn-primario" data-avancar ${passo === 1 && !perfil ? 'disabled' : ''}>Continuar</button>` : ''}
          <button type="button" class="btn btn-terciario" data-concluir>Pular</button></div>
        <p class="microcopy" style="margin-top:24px">Não pedimos e-mail, cartão nem senha agora. A amostra grátis abre em seguida.</p>
      </div>`;
    },
    depois() {
      const root = document.getElementById('app');
      root.onclick = (e) => {
        const p = e.target.closest('[data-perfil]'); if (p) { perfil = p.dataset.perfil; interesses = [...PERFIS.find((x) => x.id === perfil).interesses]; C.render(); return; }
        const i = e.target.closest('[data-interesse]'); if (i) { const id = i.dataset.interesse; const k = interesses.indexOf(id); k >= 0 ? interesses.splice(k, 1) : interesses.push(id); C.render(); return; }
        if (e.target.closest('[data-avancar]')) { passo++; C.render(); return; }
        if (e.target.closest('[data-voltar]')) { passo--; C.render(); return; }
        if (e.target.closest('[data-ativar-alertas]')) { alertasSugeridos.forEach((id) => { if (!C.estado.alertas.includes(id)) C.estado.alertas.push(id); }); concluir(`Avisos ativados. Sua amostra grátis está aberta.`); return; }
        if (e.target.closest('[data-concluir]')) { concluir('Sua amostra grátis está aberta.'); return; }
      };
      const concluir = (msg) => { C.estado.perfil = perfil; C.estado.interesses = interesses; C.estado.onboardingFeito = true; C.salvar(); passo = 1; root.onclick = null; location.hash = '#/'; C.toast(msg); };
    }
  };
})(window.CEP);
