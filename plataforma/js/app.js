// Roteador por hash, estado local (lista, onboarding, plano), tooltips de termos e eventos globais.
window.CM = window.CM || {};
(function (M) {
  const CHAVE = 'cm-prototipo-v1';
  M.estado = { lista: ['ipca', 'selic', 'cambio', 'pib', 'desemprego'], onboarding: false, perfil: null, temas: [], nivel: 'essencial', explicacoes: true, assinante: true, email: null };
  try { Object.assign(M.estado, JSON.parse(localStorage.getItem(CHAVE) || '{}')); } catch (e) { /* sem armazenamento */ }
  M.salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(M.estado)); } catch (e) { /* ignora */ } };
  let tt; M.toast = (m) => { const t = document.getElementById('toast'); t.textContent = m; t.dataset.on = 'true'; clearTimeout(tt); tt = setTimeout(() => (t.dataset.on = 'false'), 2800); };
  M.alternarLista = (id) => { const i = M.estado.lista.indexOf(id); if (i >= 0) { M.estado.lista.splice(i, 1); M.toast('Removido da Minha Lista.'); } else { M.estado.lista.push(id); M.toast('Adicionado à Minha Lista.'); } M.salvar(); M._manter = true; M.render(); };

  M.rotas = [
    [/^\/?$/, 'landing'], [/^\/entrar$/, 'login'], [/^\/criar-conta$/, 'criarConta'], [/^\/onboarding$/, 'onboarding'], [/^\/assinar$/, 'assinar'],
    [/^\/app\/panorama$/, 'panorama'], [/^\/app\/cenario$/, 'cenario'],
    [/^\/app\/(inflacao|juros|atividade|emprego|credito|cambio|fiscal|mercados|expectativas)$/, 'tema', ['tema']],
    [/^\/app\/indicadores$/, 'indicadores'], [/^\/app\/indicador\/([\w-]+)$/, 'indicador', ['id']],
    [/^\/app\/comparar$/, 'comparar'], [/^\/app\/lista$/, 'lista'], [/^\/app\/calendario$/, 'calendario'],
    [/^\/app\/relatorios$/, 'relatorios'], [/^\/app\/relatorio\/([\w-]+)$/, 'relatorio', ['id']],
    [/^\/app\/plano$/, 'plano'], [/^\/app\/conta$/, 'conta'], [/^\/app\/configuracoes$/, 'configuracoes']
  ];
  M.screens = M.screens || {};
  M.rotaAtual = () => { const bruto = location.hash.replace(/^#/, '') || '/'; const [caminho, q = ''] = bruto.split('?'); const query = Object.fromEntries(new URLSearchParams(q)); for (const [re, tela, ps] of M.rotas) { const m = caminho.match(re); if (m) { const params = {}; (ps || []).forEach((p, i) => (params[p] = m[i + 1])); return { tela, params, query, caminho }; } } return { tela: 'landing', params: {}, query, caminho }; };
  M.render = () => {
    const r = M.rotaAtual(); const tela = M.screens[r.tela] || M.screens.landing;
    const root = document.getElementById('app'); root.innerHTML = tela.render(r.params, r.query, r.caminho);
    document.title = (tela.titulo ? tela.titulo(r.params) + ' · ' : '') + 'Central Macroeconômica';
    if (tela.depois) tela.depois(r.params, r.query);
    if (!M._manter) window.scrollTo(0, 0); M._manter = false;
    const b = document.getElementById('busca-global'); if (b) b.onkeydown = (e) => { if (e.key === 'Enter') location.hash = '#/app/indicadores?q=' + encodeURIComponent(b.value); };
    const sw = document.getElementById('sw-expl'); if (sw) sw.onchange = () => { M.estado.explicacoes = sw.checked; M.salvar(); M._manter = true; M.render(); M.toast(sw.checked ? 'Explicações ligadas: linguagem simples em destaque.' : 'Explicações desligadas: visão analítica compacta.'); };
  };
  // Tooltip de termos
  const tip = () => document.getElementById('tooltip');
  document.addEventListener('mouseover', (e) => { const t = e.target.closest('[data-termo]'); if (!t) return; const el = tip(); el.innerHTML = `<b>${M.esc(t.dataset.termo)}</b>${M.esc(M.glossario[t.dataset.termo])}`; const r = t.getBoundingClientRect(); el.style.left = Math.min(r.left, window.innerWidth - 320) + 'px'; el.style.top = (r.bottom + 8) + 'px'; el.dataset.on = 'true'; });
  document.addEventListener('mouseout', (e) => { if (e.target.closest('[data-termo]')) tip().dataset.on = 'false'; });
  document.addEventListener('focusin', (e) => { const t = e.target.closest('[data-termo]'); if (t) t.dispatchEvent(new Event('mouseover', { bubbles: true })); });
  document.addEventListener('focusout', (e) => { if (e.target.closest('[data-termo]')) tip().dataset.on = 'false'; });
  document.addEventListener('click', (e) => {
    const l = e.target.closest('[data-lista]'); if (l) { e.preventDefault(); M.alternarLista(l.dataset.lista); return; }
    const vg = e.target.closest('[data-ver-grafico]'); if (vg) { const f = vg.closest('.grafico'); f.classList.toggle('aberto'); vg.textContent = f.classList.contains('aberto') ? 'Ocultar gráfico' : 'Ver gráfico'; return; }
    const t = e.target.closest('[data-termo]'); if (t) { e.preventDefault(); location.hash = '#/app/indicador/' + ({ Selic: 'selic', IPCA: 'ipca', PIB: 'pib', Copom: 'selic', Focus: 'exp-ipca', PTAX: 'cambio', 'dívida bruta': 'divida-bruta', 'resultado primário': 'primario', 'juro real': 'selic-real', 'núcleo': 'ipca-nucleo', CDS: 'risco' }[t.dataset.termo] || 'ipca'); }
  });
  window.addEventListener('hashchange', M.render);
  window.addEventListener('DOMContentLoaded', M.render);
})(window.CM);
