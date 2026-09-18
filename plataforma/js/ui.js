// Componentes de interface: cartão de indicador, selo, fonte, barra lateral, cabeçalho, tooltip de termos, calendário.
window.CM = window.CM || {};
(function (M) {
  const esc = M.esc;
  M.selo = (estado, txt) => `<span class="selo selo-${estado}">${esc(txt)}</span>`;
  M.fonteLabel = (ind, extra = '') => { const f = M.fontes[ind.fonte]; return `<div class="fonte"><span class="ico"></span><b>Fonte: ${esc(f.nome)}</b><span>·</span><span>Última divulgação: ${esc(ind.ultima)}</span><span>·</span><span>Referência: ${esc(ind.ref)}</span><span>·</span><span>Periodicidade: ${esc(ind.freq)}</span>${extra}<span>·</span><a href="${f.url}" target="_blank" rel="noopener">Ver fonte original ↗</a></div>`; };
  M.valor = (ind) => M.fmt(ind.valor, ind.fmt);
  M.cardInd = (ind, variante = '') => {
    const ult = ind.serie.slice(-12);
    return `<a class="card ind ${variante}" href="#/app/indicador/${ind.id}" aria-label="${esc(ind.nome)}: ${esc(M.valor(ind))}">
      <div class="topo"><div><div class="nome">${esc(ind.nome)}</div><div class="desc">${esc(ind.desc)}</div></div>${M.selo(ind.estado, ind.estadoTxt)}</div>
      <div class="valor-linha"><span class="valor num">${esc(M.valor(ind))}</span><span class="var var-${ind.varTipo}">${esc(ind.varTxt)}</span></div>
      <div class="periodo">${esc(ind.periodo)}</div>
      ${variante.includes('compacto') ? '' : M.sparkline(ult)}
      <div class="contexto">${esc(ind.contexto)}</div>
      <div class="rodape"><span>Fonte: ${esc(M.fontes[ind.fonte].nome)}</span><span>·</span><span>Anterior: ${esc(M.fmt(ind.anterior, ind.fmt))}</span><span>·</span><span>Próxima: ${esc(ind.proxima)}</span></div>
    </a>`;
  };
  M.termos = (html) => html.replace(/\[\[(.+?)\]\]/g, (_, t) => { const k = Object.keys(M.glossario).find((g) => g.toLowerCase() === t.toLowerCase()); return k ? `<button type="button" class="termo" data-termo="${esc(k)}">${esc(t)}</button>` : t; });
  const NAV = [['', [['#/app/panorama', 'Visão Geral'], ['#/app/cenario', 'Cenário Econômico']]], ['TEMAS', [['#/app/inflacao', 'Inflação'], ['#/app/juros', 'Juros'], ['#/app/atividade', 'Atividade Econômica'], ['#/app/emprego', 'Emprego'], ['#/app/credito', 'Crédito'], ['#/app/cambio', 'Câmbio'], ['#/app/fiscal', 'Fiscal'], ['#/app/mercados', 'Mercados'], ['#/app/expectativas', 'Expectativas']]], ['FERRAMENTAS', [['#/app/indicadores', 'Indicadores'], ['#/app/comparar', 'Comparar Indicadores'], ['#/app/calendario', 'Calendário Econômico'], ['#/app/relatorios', 'Relatórios'], ['#/app/lista', 'Minha Lista']]]];
  M.sidebar = (atual) => { const item = ([h, n]) => `<a class="nav-i" href="${h}" ${atual.startsWith(h.replace('#', '')) ? 'aria-current="page"' : ''}><span class="ic"></span>${n}</a>`; return `<aside class="sidebar"><a class="marca" href="#/app/panorama"><span class="sigla">CM</span>Central Macroeconômica</a>${NAV.map(([g, its]) => (g ? `<div class="nav-g">${g}</div>` : '') + its.map(item).join('')).join('')}<div class="espaco"></div><div class="nav-g">CONTA</div>${[['#/app/configuracoes', 'Configurações'], ['#/app/conta', 'Conta'], ['#/app/plano', 'Plano']].map(item).join('')}</aside>`; };
  M.topbar = (titulo) => `<header class="topbar"><h1>${esc(titulo)}</h1><div class="grow"></div><label class="busca"><span aria-hidden="true">⌕</span><input id="busca-global" placeholder="Pesquisar indicador..." aria-label="Pesquisar indicador"></label><span class="small faint">Atualizado há 12 minutos</span><a class="avatar" href="#/app/conta" aria-label="Conta"></a></header>`;
  M.shell = (rota, titulo, corpo) => `<div class="app">${M.sidebar(rota)}<div class="main">${M.topbar(titulo)}<main class="conteudo tela" id="conteudo">${corpo}</main></div></div>`;
  M.calItem = (e, hoje = false) => { const naLista = M.estado.lista.includes(e.ind); return `<div class="cal-item ${hoje ? 'hoje' : ''}"><div class="data"><div class="dia">${e.dia}</div><div class="mes">${e.mes}</div></div><div><div class="tit"><a href="#/app/indicador/${e.ind}">${esc(e.titulo)}</a></div><div class="meta">${esc(e.inst)} · ${esc(e.hora)} · ${esc(e.ref)}</div><div class="vals">Anterior: ${esc(e.anterior)} · Consenso: ${esc(e.consenso)}</div></div><button class="btn btn-t btn-sm" data-lista="${e.ind}">${naLista ? '✓ Na lista' : '+ Minha Lista'}</button></div>`; };
  M.aviso = () => `<div class="aviso"><b>Informação para apoiar decisões — não para decidir por você.</b> A plataforma organiza e contextualiza informações econômicas. Ela não substitui análise profissional, planejamento financeiro ou recomendação de investimento.</div>`;
  M.relacionados = (ids) => `<div class="row" style="gap:8px">${ids.map((id) => { const i = M.ind(id); return i ? `<a class="chip chip-azul" href="#/app/indicador/${id}">${esc(i.sigla)} <span class="faint">${esc(M.fmt(i.valor, i.fmt))}</span></a>` : ''; }).join('')}</div>`;
  M.leituraInd = (ind) => `<div class="card leitura"><h3>Como interpretar este indicador?</h3><p>${M.termos(esc(ind.interpretar || ind.desc))}</p>${ind.importa ? `<div class="importa"><h4>Por que isso importa?</h4><ul>${ind.importa.map((i) => `<li>${M.termos(esc(i))}</li>`).join('')}</ul></div>` : ''}</div>`;
})(window.CM);
