// Panorama da Economia (tela principal), Cenário Econômico (Mapa da Economia), detalhe e explorador de indicadores.
(function (M) {
  const esc = M.esc;
  const ordenar = (ids) => { const p = (M.estado.temas || []).map((t) => ({ 'Inflação': 'ipca', 'Juros': 'selic', 'Atividade Econômica': 'pib', 'Emprego': 'desemprego', 'Câmbio': 'cambio' }[t])).filter(Boolean); return [...ids].sort((a, b) => { const ia = p.indexOf(a), ib = p.indexOf(b); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib); }); };
  M.screens.panorama = {
    titulo: () => 'Panorama da Economia',
    render(p, q, rota) {
      const top = ordenar(['ipca', 'selic', 'pib', 'cambio', 'desemprego', 'ibcbr']).map(M.ind);
      const prox = M.calendario.slice(0, 3);
      const corpo = `<div class="cab-tela"><div class="row between"><div><span class="kicker">Panorama da Economia</span><h1 style="font-size:28px;margin:6px 0">Como está a economia agora</h1><p>Seis indicadores de alta prioridade, um resumo do que está acontecendo e o mapa das dimensões da economia. Quinta-feira, 17 de setembro de 2026.</p></div><div class="row"><a class="btn btn-s btn-sm" href="#/app/relatorio/2026-09">Ler o relatório do mês</a></div></div></div>
      <div class="grid g3">${top.map((i) => M.cardInd(i)).join('')}</div>
      <div class="duas secao"><div><div class="card"><h2 style="font-size:18px">O que está acontecendo na economia?</h2><div class="stack" style="gap:10px;margin-top:12px">${M.resumo.map((r) => { const i = M.ind(r.ind); return `<a class="row" style="gap:12px;align-items:flex-start;color:inherit;text-decoration:none" href="#/app/indicador/${r.ind}"><span style="width:6px;height:6px;border-radius:50%;background:var(--ouro);margin-top:8px;flex-shrink:0"></span><span style="flex:1;font-size:15px;line-height:1.5">${esc(r.t)}</span><span class="chip chip-azul">${esc(i.sigla)} ${esc(M.fmt(i.valor, i.fmt))}</span></a>`; }).join('')}</div><p class="small faint" style="margin:14px 0 0">Síntese editorial revisada a cada divulgação oficial. Última revisão: 17 set. 2026, 9h30.</p></div>
        <div class="secao"><div class="secao-t"><h2>Mapa da Economia</h2><a href="#/app/cenario">Ver cenário completo →</a></div><div class="grid g4">${M.mapa.map((m) => `<a class="card card-sm mapa-card" href="${m.rota}"><span class="dim">${esc(m.dim)}</span>${M.selo(m.estado, m.estadoTxt)}<span class="leitura">${esc(m.leitura)}</span></a>`).join('')}</div></div></div>
        <aside class="lateral"><div class="card"><div class="secao-t"><h2 style="font-size:15px">Próximas divulgações</h2><a href="#/app/calendario">Calendário</a></div>${prox.map((e) => `<div class="cal-item" style="grid-template-columns:44px 1fr;gap:12px;padding:10px 0"><div class="data"><div class="dia" style="font-size:22px">${e.dia}</div><div class="mes">${e.mes}</div></div><div><div class="tit" style="font-size:14px"><a href="#/app/indicador/${e.ind}">${esc(e.titulo)}</a></div><div class="meta">${esc(e.inst)} · ${e.hora}</div></div></div>`).join('')}</div>
        <div class="card"><div class="secao-t"><h2 style="font-size:15px">Minha Lista</h2><a href="#/app/lista">Ver todos</a></div>${M.estado.lista.slice(0, 5).map((id) => { const i = M.ind(id); return i ? `<a class="row between" style="padding:8px 0;border-bottom:1px solid var(--borda);color:inherit;text-decoration:none" href="#/app/indicador/${id}"><span style="font-size:13px;font-weight:500">${esc(i.sigla)}</span><span class="num" style="font-size:13px">${esc(M.fmt(i.valor, i.fmt))} <span class="var var-${i.varTipo} small">${esc(i.varTxt.split(' ')[0])}</span></span></a>` : ''; }).join('') || '<div class="vazio small">Sua lista está vazia.</div>'}</div>
        ${M.aviso()}</aside></div>`;
      return M.shell(rota, 'Panorama da Economia', corpo);
    }
  };
  M.screens.cenario = {
    titulo: () => 'Cenário Econômico',
    render(p, q, rota) {
      const corpo = `<div class="cab-tela"><span class="kicker">Cenário Econômico</span><h1 style="font-size:28px;margin:6px 0">Mapa da Economia</h1><p>Oito dimensões, cada uma com uma leitura semântica em vez de "positivo/negativo". Subir nem sempre é bom: inflação e desemprego em alta são pressão, não expansão. Clique em uma dimensão para explorar os indicadores.</p></div>
      <div class="grid g4">${M.mapa.map((m) => `<a class="card mapa-card" href="${m.rota}"><span class="dim">${esc(m.dim)}</span>${M.selo(m.estado, m.estadoTxt)}<span class="leitura">${esc(m.leitura)}</span><span class="small" style="color:var(--azul);font-weight:500">Ver indicadores →</span></a>`).join('')}</div>
      <div class="secao card"><h2 style="font-size:18px">Como ler os estados</h2><div class="grid g4" style="margin-top:12px;font-size:13px">${[['pressao', 'Pressão', 'Movimento que tende a exigir resposta de política ou pesa sobre o orçamento das famílias.'], ['atencao', 'Atenção', 'Fora do intervalo confortável, mas sem sinal claro de piora.'], ['expansao', 'Expansão / Aquecido', 'Crescimento ou mercado apertado. Bom para renda; pode pressionar preços.'], ['restritivo', 'Restritivo', 'Política monetária ou crédito em nível que desacelera a economia de propósito.']].map(([e, t, d]) => `<div>${M.selo(e, t)}<p class="muted" style="margin-top:8px">${d}</p></div>`).join('')}</div></div>
      <div class="secao"><div class="secao-t"><h2>Leitura do mês</h2><a href="#/app/relatorio/2026-09">Relatório completo →</a></div><div class="card" style="font-family:var(--serif-c);font-size:17px;line-height:1.65">${M.relatorio.secoes[0].paras.map((p) => `<p>${M.termos(esc(p))}</p>`).join('')}</div></div>${M.aviso()}`;
      return M.shell(rota, 'Cenário Econômico', corpo);
    }
  };
  // Detalhe do indicador
  const periodos = { '1A': 12, '3A': 36, '5A': 60, '10A': 120, 'Máx.': 999 };
  let periodo = '5A', aba = 'Resumo';
  M.screens.indicador = {
    titulo: (p) => (M.ind(p.id) || {}).nome || 'Indicador',
    render(p, q, rota) {
      const i = M.ind(p.id); if (!i) return M.shell(rota, 'Indicador', '<div class="vazio">Indicador não encontrado. <a href="#/app/indicadores">Explorar indicadores</a>.</div>');
      const n = Math.min(periodos[periodo], i.serie.length); const serie = i.serie.slice(-n); const labels = (i.trimestral ? Array.from({ length: i.serie.length }, (_, k) => `${(k % 4) + 1}T${String(2016 + Math.floor(k / 4)).slice(2)}`) : i.curva ? i.curva : M.labels120.slice(-i.serie.length)).slice(-n);
      const naLista = M.estado.lista.includes(i.id); const f = M.fontes[i.fonte];
      const stats = [['Valor atual', M.fmt(i.valor, i.fmt)], ['Leitura anterior', M.fmt(i.anterior, i.fmt)], i.expectativa !== undefined ? ['Expectativa do mercado', M.fmt(i.expectativa, i.fmt)] : null, i.anual !== undefined ? ['Em 12 meses', M.fmt(i.anual, 'pct1s')] : i.mes !== undefined ? ['No mês', M.fmt(i.mes, 'pct2')] : null, i.media10 !== undefined ? ['Média de 10 anos', M.fmt(i.media10, i.fmt)] : null].filter(Boolean);
      const controles = `<div class="seg" role="group" aria-label="Período">${Object.keys(periodos).map((k) => `<button data-periodo="${k}" aria-pressed="${k === periodo}">${k}</button>`).join('')}</div>`;
      const graf = M.grafico({ titulo: `${i.nome} — evolução histórica`, sub: `${i.longo} · ${i.unidade} · ${i.freq.toLowerCase()} · ${labels[0]} a ${labels[labels.length - 1]}`, svg: M.linha([{ nome: i.sigla, valores: serie, fmt: i.fmt }], labels, { fmt: i.fmt, faixa: i.id === 'ipca' ? { min: 1.5, max: 4.5, centro: 3, rotulo: 'Meta 3% (±1,5)' } : null, zero: /s$/.test(i.fmt), area: true }), controles, fonte: f.nome, ref: `Referência: ${i.ref}`, tabela: { labels, series: [{ nome: i.unidade, valores: serie, fmt: i.fmt }] } });
      const abas = ['Resumo', 'Histórico', 'Metodologia', 'Relacionados'];
      const corpo = `<nav class="small faint" style="margin-bottom:12px"><a href="#/app/${i.tema}">${esc(M.temas[i.tema])}</a> › ${esc(i.nome)}</nav>
      <div class="duas"><article>
        <div class="row between" style="align-items:flex-start"><div><h1 style="font-size:28px">${esc(i.nome)}</h1><p class="muted">${esc(i.longo)}. ${esc(i.desc)}</p></div><div class="row"><button class="btn ${naLista ? 'btn-s' : 'btn-p'} btn-sm" data-lista="${i.id}">${naLista ? '✓ Na Minha Lista' : '+ Adicionar à Minha Lista'}</button><a class="btn btn-s btn-sm" href="#/app/comparar?a=${i.id}">Comparar</a></div></div>
        <div class="card ind ind-hero"><div class="topo"><span class="kicker faint">Valor atual · ${esc(i.periodo)}</span>${M.selo(i.estado, i.estadoTxt)}</div><div class="valor-linha"><span class="valor num">${esc(M.fmt(i.valor, i.fmt))}</span><span class="var var-${i.varTipo}" style="font-size:15px">${esc(i.varTxt)}</span></div><p style="font-size:16px;margin:4px 0 0">${esc(i.contexto)}</p></div>
        <div class="grid" style="grid-template-columns:repeat(${stats.length},1fr);margin:16px 0">${stats.map(([k, v]) => `<div class="card card-sm"><span class="kicker faint">${k}</span><div class="num" style="font-size:20px;font-weight:600;margin-top:4px">${esc(v)}</div></div>`).join('')}</div>
        <div class="abas" style="margin-bottom:16px" role="tablist">${abas.map((a) => `<button role="tab" data-aba="${a}" aria-selected="${a === aba}">${a}</button>`).join('')}</div>
        ${aba === 'Resumo' || aba === 'Histórico' ? graf : ''}
        ${aba === 'Resumo' ? `<div style="margin-top:16px">${M.leituraInd(i)}</div>` : ''}
        ${aba === 'Histórico' ? `<div class="card" style="margin-top:16px"><h3>Últimas 12 leituras</h3><table class="tabela"><thead><tr><th>Período</th><th class="num">Valor</th><th class="num">Variação</th></tr></thead><tbody>${labels.slice(-12).map((l, k, arr) => { const idx = serie.length - 12 + k; const v = serie[idx], a = serie[idx - 1]; return `<tr><td>${l}</td><td class="num">${esc(M.fmt(v, i.fmt))}</td><td class="num ${v - a > 0 ? 'var-pressao' : 'var-expansao'}">${a !== undefined ? esc(M.fmt(v - a, /s$/.test(i.fmt) ? i.fmt : 'pct2s')) : '—'}</td></tr>`; }).reverse().join('')}</tbody></table></div>` : ''}
        ${aba === 'Metodologia' ? `<div class="card leitura"><h3>Metodologia e ficha técnica</h3><p>${M.termos(esc(i.interpretar || i.desc))}</p><table class="tabela" style="margin-top:12px"><tbody>${[['Nome completo', i.longo], ['Sigla', i.sigla], ['Unidade', i.unidade], ['Periodicidade', i.freq], ['Período de referência', i.ref], ['Última divulgação', i.ultima], ['Próxima divulgação', i.proxima], ['Fonte', f.longo]].map(([k, v]) => `<tr><td class="muted" style="width:220px">${k}</td><td>${esc(v)}</td></tr>`).join('')}</tbody></table><p class="small faint" style="margin-top:12px">Revisões: quando a instituição revisa um dado, a plataforma marca a leitura como "Revisada" e mantém o valor anterior no histórico.</p></div>` : ''}
        ${aba === 'Relacionados' ? `<div class="card"><h3>Indicadores relacionados</h3><p class="muted">Séries que costumam se mover junto com ${esc(i.sigla)} — relações de tendência, não de causa garantida.</p><div class="grid g2" style="margin-top:12px">${(i.relacionados || []).map((id) => { const r = M.ind(id); return r ? M.cardInd(r, 'ind-compacto') : ''; }).join('')}</div></div>` : ''}
        <div style="margin-top:20px">${M.fonteLabel(i, `<span>·</span><span>Próxima divulgação: ${esc(i.proxima)}</span>`)}</div>
        <div style="margin-top:20px">${M.aviso()}</div>
      </article>
      <aside class="lateral"><div class="card"><h3 style="font-size:14px">Indicadores relacionados</h3>${M.relacionados(i.relacionados || [])}</div><div class="card"><h3 style="font-size:14px">Atualização</h3><div class="small stack" style="gap:6px"><div>Atualizado há 12 minutos</div><div>Última divulgação: <b>${esc(i.ultima)}</b></div><div>Próxima divulgação: <b>${esc(i.proxima)}</b></div><div>Periodicidade: ${esc(i.freq)}</div></div></div><div class="card"><h3 style="font-size:14px">Ver detalhes</h3><p class="small muted" style="margin:0">Metodologia, unidade, revisões e série completa nas abas acima. Para comparar com outros indicadores, use o <a href="#/app/comparar?a=${i.id}">Comparador</a>.</p></div></aside></div>`;
      return M.shell('/app/' + i.tema, i.nome, corpo);
    },
    depois() { document.getElementById('conteudo').onclick = (e) => { const p = e.target.closest('[data-periodo]'); if (p) { periodo = p.dataset.periodo; M._manter = true; M.render(); } const a = e.target.closest('[data-aba]'); if (a) { aba = a.dataset.aba; M._manter = true; M.render(); } }; }
  };
  // Explorador
  let cat = 'todos';
  M.screens.indicadores = {
    titulo: () => 'Indicadores',
    render(p, q, rota) {
      const busca = (q.q || '').toLowerCase();
      const lista = M.indicadores.filter((i) => (cat === 'todos' || i.tema === cat) && (!busca || (i.nome + i.sigla + i.longo + i.desc).toLowerCase().includes(busca)));
      const cats = [['todos', 'Todos'], ...Object.entries(M.temas).filter(([k]) => k !== 'global')];
      const corpo = `<div class="cab-tela"><h1 style="font-size:28px">Biblioteca de indicadores</h1><p>${M.indicadores.length} indicadores de fontes oficiais. Cada um com nome completo, explicação curta, fonte, último valor e periodicidade.</p><label class="busca" style="max-width:480px;margin:12px 0"><span aria-hidden="true">⌕</span><input id="busca-ind" placeholder="Pesquisar indicador..." value="${esc(q.q || '')}" aria-label="Pesquisar indicador"></label><div class="row" style="gap:8px">${cats.map(([k, n]) => `<button class="chip" data-cat="${k}" aria-pressed="${cat === k}">${n}</button>`).join('')}</div></div>
      ${lista.length ? `<div class="card" style="padding:0;overflow:hidden"><table class="tabela"><thead><tr><th>Indicador</th><th>Sigla</th><th>O que é</th><th>Fonte</th><th class="num">Último valor</th><th>Periodicidade</th><th></th></tr></thead><tbody>${lista.map((i) => `<tr><td><a href="#/app/indicador/${i.id}" style="font-weight:500;color:inherit">${esc(i.nome)}</a><div class="small faint">${esc(i.longo)}</div></td><td class="small">${esc(i.sigla)}</td><td class="small muted" style="max-width:260px">${esc(i.desc)}</td><td class="small">${esc(M.fontes[i.fonte].nome)}</td><td class="num"><b>${esc(M.fmt(i.valor, i.fmt))}</b><div class="small">${M.selo(i.estado, i.estadoTxt)}</div></td><td class="small">${esc(i.freq)}</td><td><button class="btn btn-t btn-sm" data-lista="${i.id}">${M.estado.lista.includes(i.id) ? '✓' : '+'}</button></td></tr>`).join('')}</tbody></table></div>` : `<div class="vazio"><b>Nenhum indicador encontrado para "${esc(q.q)}".</b><p class="small">Tente pela sigla (IPCA, Selic, PIB) ou pelo tema.</p></div>`}`;
      return M.shell(rota, 'Indicadores', corpo);
    },
    depois(p, q) { const b = document.getElementById('busca-ind'); b.oninput = () => { const pos = b.selectionStart; location.hash = '#/app/indicadores' + (b.value ? '?q=' + encodeURIComponent(b.value) : ''); M._manter = true; setTimeout(() => { const nb = document.getElementById('busca-ind'); nb.focus(); nb.setSelectionRange(pos, pos); }, 0); }; document.getElementById('conteudo').onclick = (e) => { const c = e.target.closest('[data-cat]'); if (c) { cat = c.dataset.cat; M._manter = true; M.render(); } }; }
  };
})(window.CM);
