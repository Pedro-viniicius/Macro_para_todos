// Roteador por hash, estado local (perfil, alertas, assinatura), tema, gaveta do glossário e toasts.
window.CEP = window.CEP || {};
(function (C) {
  const CHAVE = 'cep-prototipo-v1';
  const padrao = { perfil: null, interesses: [], alertas: [], assinante: false, assinaturaDesde: null, canceladaEm: null, onboardingFeito: false, mostrarTudo: false, tema: null, email: null, plano: 'mensal' };
  C.estado = Object.assign({}, padrao);
  try { Object.assign(C.estado, JSON.parse(localStorage.getItem(CHAVE) || '{}')); } catch (e) { /* armazenamento indisponível */ }
  C.salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(C.estado)); } catch (e) { /* ignora */ } };
  C.reiniciar = () => { C.estado = Object.assign({}, padrao); C.salvar(); location.hash = '#/onboarding'; };

  // Tema
  const aplicarTema = () => { if (C.estado.tema) document.documentElement.setAttribute('data-theme', C.estado.tema); else document.documentElement.removeAttribute('data-theme'); };
  C.alternarTema = () => {
    const escuroAgora = C.estado.tema === 'dark' || (!C.estado.tema && matchMedia('(prefers-color-scheme: dark)').matches);
    C.estado.tema = escuroAgora ? 'light' : 'dark'; C.salvar(); aplicarTema();
  };
  aplicarTema();

  // Toast
  let toastTimer;
  C.toast = (msg) => {
    const el = document.getElementById('toast'); el.textContent = msg; el.dataset.visivel = 'true';
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.dataset.visivel = 'false'; }, 3200);
  };

  // Alertas
  C.alternarAlerta = (id) => {
    const i = C.estado.alertas.indexOf(id);
    if (i >= 0) { C.estado.alertas.splice(i, 1); C.salvar(); C.toast('Aviso desativado.'); }
    else {
      C.estado.alertas.push(id); C.salvar();
      const ind = C.indicador(id);
      const ev = C.eventos.find((e) => e.status === 'previsto' && (e.indicador === id || e.id === id));
      const quando = ind ? `${C.fmtDataCurta(ind.proximaDivulgacao)}, às ${ind.proximaHora}` : ev ? `${C.fmtDataCurta(ev.data)}, às ${ev.hora}` : 'na próxima divulgação';
      C.toast(`Pronto. Avisaremos em ${quando}.`);
    }
    C.render();
  };

  // Gaveta do glossário
  let ultimoFoco = null;
  C.abrirTermo = (nome, origem) => {
    const g = C.glossario.find((t) => t.termo === nome); if (!g) return;
    ultimoFoco = origem || document.activeElement;
    const gav = document.getElementById('gaveta-glossario'), fundo = document.getElementById('gaveta-fundo');
    gav.innerHTML = `<button class="btn-icone fechar" type="button" aria-label="Fechar" data-fechar-gaveta>✕</button>
      <p class="rotulo">Glossário</p><h2 id="gaveta-titulo">${C.esc(g.termo)}</h2>
      <p class="parabola">${C.esc(g.parabola)}</p>
      <p class="definicao"><strong>Tecnicamente:</strong> ${C.esc(g.definicao)}</p>
      <div class="relacionados">${(g.relacionados || []).map((r) => `<button type="button" class="chip chip-btn" data-termo="${C.esc(r)}">${C.esc(r)}</button>`).join('')}</div>
      <p style="margin-top:16px" class="acoes">${g.indicador ? `<a class="btn btn-secundario btn-pequeno" href="#/indicador/${g.indicador}" data-fechar-gaveta>Ver o indicador</a>` : ''}<a class="btn btn-terciario btn-pequeno" href="#/glossario" data-fechar-gaveta>Glossário completo</a></p>`;
    gav.dataset.aberta = 'true'; fundo.dataset.aberta = 'true';
    gav.querySelector('.fechar').focus();
  };
  C.fecharGaveta = () => {
    const gav = document.getElementById('gaveta-glossario'), fundo = document.getElementById('gaveta-fundo');
    gav.dataset.aberta = 'false'; fundo.dataset.aberta = 'false';
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  };

  // Roteamento
  C.rotas = [
    { padrao: /^\/?$/, tela: 'capa' },
    { padrao: /^\/edicao\/([\w-]+)$/, tela: 'capa', params: ['edicaoId'] },
    { padrao: /^\/materia\/([\w-]+)$/, tela: 'materia', params: ['slug'] },
    { padrao: /^\/painel$/, tela: 'painel' },
    { padrao: /^\/indicador\/([\w-]+)$/, tela: 'indicador', params: ['id'] },
    { padrao: /^\/calendario$/, tela: 'calendario' },
    { padrao: /^\/arquivo$/, tela: 'arquivo' },
    { padrao: /^\/glossario$/, tela: 'glossario' },
    { padrao: /^\/onboarding$/, tela: 'onboarding' },
    { padrao: /^\/planos$/, tela: 'planos' },
    { padrao: /^\/conta$/, tela: 'conta' },
    { padrao: /^\/sobre$/, tela: 'sobre' }
  ];
  C.screens = C.screens || {};
  C.rotaAtual = () => {
    const bruto = location.hash.replace(/^#/, '') || '/';
    const [caminho, query = ''] = bruto.split('?');
    const q = Object.fromEntries(new URLSearchParams(query));
    for (const r of C.rotas) {
      const m = caminho.match(r.padrao);
      if (m) { const params = {}; (r.params || []).forEach((p, i) => (params[p] = m[i + 1])); return { tela: r.tela, params, query: q, caminho }; }
    }
    return { tela: 'capa', params: {}, query: q, caminho };
  };

  C.navPrincipal = (atual) => {
    const itens = [['#/', 'Edição', '📰', /^\/(edicao|materia|$)/], ['#/painel', 'Indicadores', '📊', /^\/(painel|indicador)/], ['#/calendario', 'Calendário', '📅', /^\/calendario/], ['#/arquivo', 'Arquivo', '🗂', /^\/arquivo/], ['#/glossario', 'Glossário', '📖', /^\/glossario/]];
    const ativo = (re) => (re.test(atual) ? ' aria-current="page"' : '');
    return {
      desktop: itens.map(([h, n, , re]) => `<a href="${h}"${ativo(re)}>${n}</a>`).join(''),
      mobile: itens.slice(0, 4).map(([h, n, i, re]) => `<a href="${h}"${ativo(re)}><span class="ico" aria-hidden="true">${i}</span>${n}</a>`).join('') + `<a href="#/conta"${ativo(/^\/(conta|planos|glossario|sobre|onboarding)/)}><span class="ico" aria-hidden="true">≡</span>Mais</a>`
    };
  };

  C.render = () => {
    const rota = C.rotaAtual();
    if (!C.estado.onboardingFeito && rota.tela === 'capa' && !rota.params.edicaoId && !rota.query.pular) { location.hash = '#/onboarding'; return; }
    const nav = C.navPrincipal(rota.caminho);
    document.getElementById('nav-desktop').innerHTML = nav.desktop;
    document.getElementById('nav-mobile').innerHTML = nav.mobile;
    document.getElementById('acao-topo').innerHTML = C.estado.assinante ? `<a class="btn btn-secundario btn-pequeno" href="#/conta">Conta</a>` : `<a class="btn btn-primario btn-pequeno" href="#/planos">Assinar</a>`;
    const tela = C.screens[rota.tela] || C.screens.capa;
    const root = document.getElementById('app');
    root.innerHTML = `<main class="tela" id="conteudo">${tela.render(rota.params, rota.query)}</main>${C.rodape()}`;
    if (tela.depois) tela.depois(rota.params, rota.query);
    document.title = (tela.titulo ? tela.titulo(rota.params) + ' · ' : '') + 'Como Está o País';
    if (!C._manterScroll) window.scrollTo(0, 0); C._manterScroll = false;
  };

  // Delegação de eventos global
  document.addEventListener('click', (e) => {
    const termo = e.target.closest('[data-termo]'); if (termo) { e.preventDefault(); C.abrirTermo(termo.dataset.termo, termo); return; }
    if (e.target.closest('[data-fechar-gaveta]') || e.target.id === 'gaveta-fundo') { C.fecharGaveta(); return; }
    const alerta = e.target.closest('[data-alerta]'); if (alerta) { e.preventDefault(); C._manterScroll = true; C.alternarAlerta(alerta.dataset.alerta); return; }
    const tema = e.target.closest('[data-tema]'); if (tema) { C.alternarTema(); return; }
    const vt = e.target.closest('[data-ver-tabela]'); if (vt) { const t = document.getElementById(vt.dataset.verTabela); const aberto = !t.hidden; t.hidden = aberto; vt.setAttribute('aria-expanded', String(!aberto)); vt.textContent = aberto ? 'Ver tabela' : 'Ocultar tabela'; return; }
    const cp = e.target.closest('[data-copiar-dados]'); if (cp) { const ind = C.indicador(cp.dataset.copiarDados); const txt = `${ind.nome} (${ind.unidade}) — ${ind.transformacao}\nFonte: ${C.fonte(ind.fonte).instituicao} · ${C.fonte(ind.fonte).identificador} · Dados ilustrativos\n` + ind.serie.map((p) => `${p.rotulo}\t${C.valorFormatado(ind, p.valor)}`).join('\n'); C.copiar(txt); return; }
    const per = e.target.closest('[data-periodo]'); if (per) { const fig = per.closest('.grafico'); const ind = C.indicador(fig.dataset.grafico); fig.outerHTML = C.grafico(ind, { anos: Number(per.dataset.periodo) }); return; }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') C.fecharGaveta(); });
  C.copiar = (txt) => { (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => C.toast('Copiado.')).catch(() => C.toast('Não foi possível copiar automaticamente.')); };

  window.addEventListener('hashchange', C.render);
  window.addEventListener('DOMContentLoaded', C.render);
})(window.CEP);
