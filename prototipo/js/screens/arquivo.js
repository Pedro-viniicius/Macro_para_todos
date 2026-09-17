// Arquivo de edições e glossário completo.
(function (C) {
  let busca = '';
  C.screens.arquivo = {
    titulo: () => 'Arquivo de edições',
    render() {
      const q = busca.trim().toLowerCase();
      const eds = [...C.edicoes].sort((a, b) => b.id.localeCompare(a.id));
      const mats = q ? C.materias.filter((m) => (m.titulo + ' ' + m.linhaFina + ' ' + m.indicadores.join(' ')).toLowerCase().includes(q)) : [];
      return `<div class="container">
        <header class="cabecalho-tela"><h1>Arquivo de edições</h1><p>Uma edição por mês desde julho de 2026. Você acompanha desde <strong>setembro de 2026</strong>.</p>
          <div class="campo" style="max-width:420px"><label for="busca">Buscar matéria ou indicador</label><input id="busca" type="text" placeholder="ex.: Selic, PIB, desemprego" value="${C.esc(busca)}"></div></header>
        ${q ? `<section class="secao" style="margin-top:0"><h2 class="secao-titulo">${mats.length} resultado${mats.length === 1 ? '' : 's'} para "${C.esc(busca)}"</h2><div class="grid grid-3">${mats.map(C.cartaoMateria).join('') || '<div class="vazio">Nada encontrado. Tente um termo do <a href="#/glossario">glossário</a>.</div>'}</div></section>` : ''}
        ${eds.map((e) => { const m = C.materia(e.manchete); const n = C.materias.filter((x) => x.edicao === e.id).length; return `<a class="edicao-item" href="#/edicao/${e.id}"><div class="numero">${e.numero}<small>Edição</small></div><div><h3>${C.esc(e.titulo)}</h3><div class="status">${e.status === 'fechada' ? `Fechada em ${C.fmtData(e.fechadaEm)}` : 'Em andamento'} · ${n} matéria${n === 1 ? '' : 's'}</div><p class="manchete-txt">${C.esc(m.titulo)}</p><div class="microcopy">${e.oQueMudou.map((x) => `${(C.indicador(x.indicador) || { nome: 'Focus' }).nome} ${x.de} → ${x.para}`).join(' · ')}</div></div></a>`; }).join('')}
        <div class="vazio" style="margin-top:24px">A primeira edição fechou em julho de 2026. Novas edições aparecem aqui todo mês.</div>
      </div>`;
    },
    depois() { const b = document.getElementById('busca'); if (b) b.oninput = (e) => { busca = e.target.value; const pos = b.selectionStart; C._manterScroll = true; C.render(); const nb = document.getElementById('busca'); nb.focus(); nb.setSelectionRange(pos, pos); }; }
  };

  let buscaG = '';
  C.screens.glossario = {
    titulo: () => 'Glossário',
    render() {
      const q = buscaG.trim().toLowerCase();
      const lista = [...C.glossario].sort((a, b) => a.termo.localeCompare(b.termo, 'pt-BR')).filter((g) => !q || (g.termo + g.parabola + g.definicao).toLowerCase().includes(q));
      return `<div class="container coluna-leitura" style="margin:0 auto">
        <header class="cabecalho-tela"><h1>Glossário</h1><p>Cada termo em duas frases: a parábola e a definição técnica. Os mesmos textos aparecem nos tooltips em todo o produto.</p>
          <div class="campo"><label for="busca-g">Buscar termo</label><input id="busca-g" type="text" value="${C.esc(buscaG)}" placeholder="ex.: juro real"></div></header>
        ${lista.map((g) => `<div class="glossario-item"><h3>${C.esc(g.termo)}</h3><p class="parabola">${C.esc(g.parabola)}</p><p class="definicao"><strong>Tecnicamente:</strong> ${C.esc(g.definicao)}</p><div class="acoes">${g.indicador ? `<a class="chip" href="#/indicador/${g.indicador}">Ver indicador →</a>` : ''}${(g.relacionados || []).map((r) => `<button type="button" class="chip chip-btn" data-termo="${C.esc(r)}">${C.esc(r)}</button>`).join('')}</div></div>`).join('') || '<div class="vazio">Nenhum termo encontrado.</div>'}
      </div>`;
    },
    depois() { const b = document.getElementById('busca-g'); if (b) b.oninput = (e) => { buscaG = e.target.value; const pos = b.selectionStart; C._manterScroll = true; C.render(); const nb = document.getElementById('busca-g'); nb.focus(); nb.setSelectionRange(pos, pos); }; }
  };
})(window.CEP);
