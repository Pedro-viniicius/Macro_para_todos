// Painel de indicadores: seis cartões + Focus. Grátis. "Copiar resumo" para briefing.
(function (C) {
  let filtro = 'todos';
  const TEMAS = [['todos', 'Todos'], ['juros', 'Juros'], ['inflacao', 'Inflação'], ['atividade', 'Atividade'], ['emprego', 'Emprego'], ['cambio', 'Câmbio'], ['contas_publicas', 'Contas públicas']];
  C.screens.painel = {
    titulo: () => 'Painel de indicadores',
    render() {
      const prio = (C.estado.interesses || []).map((t) => C.TEMA_IND[t]);
      const lista = [...C.indicadores].filter((i) => filtro === 'todos' || i.tema === filtro).sort((a, b) => { const ia = prio.indexOf(a.id), ib = prio.indexOf(b.id); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib); });
      return `<div class="container">
        <header class="cabecalho-tela"><h1>Painel de indicadores</h1><p>O termômetro do país em seis números — cada um com fonte, período, data de publicação e próxima divulgação. ${C.estado.assinante ? '' : 'O painel é grátis; as séries históricas e a profundidade são para assinantes.'}</p>
          <div class="acoes"><div class="acoes" role="group" aria-label="Filtrar por tema">${TEMAS.map(([id, n]) => `<button type="button" class="chip chip-btn chip-filtro" data-filtro="${id}" aria-pressed="${filtro === id}">${n}</button>`).join('')}</div><span class="espaco"></span><button type="button" class="btn btn-secundario btn-pequeno" data-copiar-resumo>Copiar resumo</button></div></header>
        <div class="grid grid-3">${lista.map((i) => C.cartaoDado(i, 'padrao')).join('')}</div>
        <section class="secao"><h2 class="secao-titulo">Expectativas do mercado (Boletim Focus) <a href="#/materia/focus-14-setembro-2026">Ler a matéria →</a></h2>
          <div class="cartao editorial" style="font-family:var(--sans);font-size:15px">${C.tabelaFocus()}</div></section>
        <section class="secao"><h2 class="secao-titulo">Outros dados citados nesta edição</h2>
          <div class="grid grid-2">${Object.values(C.secundarios).map((s) => { const f = C.fonte(s.fonte); return `<div class="cartao cartao-dado cartao-compacto"><div class="topo-cartao"><span class="nome">${C.esc(s.nome)}</span><span class="selos"><span class="selo selo-atual">Atual</span>${C.seloIlustrativo()}</span></div><div class="valor-linha"><span class="valor num">${s.valor}</span></div><div class="periodo">${s.periodo}</div><div class="rodape-cartao"><div>Fonte: <a href="${f.urlHumana}" target="_blank" rel="noopener">${f.instituicao} · ${f.sistema} ↗</a></div><div>Publicado ${C.timeTag(s.publicadoEm)}</div></div></div>`; }).join('')}</div></section>
        ${C.aviso()}
      </div>`;
    },
    depois() {
      document.getElementById('app').onclick = (e) => {
        const f = e.target.closest('[data-filtro]'); if (f) { filtro = f.dataset.filtro; C._manterScroll = true; C.render(); return; }
        if (e.target.closest('[data-copiar-resumo]')) {
          const linhas = C.indicadores.map((i) => `${i.nome}: ${C.valorFormatado(i)} ${i.unidade} (${i.periodoReferencia}) · Fonte: ${C.fonte(i.fonte).instituicao}/${C.fonte(i.fonte).sistema} · Publicado ${C.fmtData(i.publicadoEm)} · Próximo: ${C.fmtData(i.proximaDivulgacao)}`);
          C.copiar(`Como Está o País — resumo de ${C.fmtData('2026-09-17')} (dados ilustrativos)\n\n${linhas.join('\n')}\n\nInformação, não recomendação.`);
        }
      };
    }
  };
})(window.CEP);
