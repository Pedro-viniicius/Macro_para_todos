// Detalhe do indicador: página de referência — valor, parábola, série, metodologia, fonte, matérias, alerta.
(function (C) {
  C.screens.indicador = {
    titulo: (p) => { const i = C.indicador(p.id); return i ? i.nome : 'Indicador'; },
    render(params) {
      const i = C.indicador(params.id);
      if (!i) return `<div class="container"><div class="vazio"><div class="ico">📊</div>Indicador não encontrado. <a href="#/painel">Ver o painel</a>.</div></div>`;
      const f = C.fonte(i.fonte);
      const materias = C.materias.filter((m) => m.indicadores.includes(i.id)).sort((a, b) => b.publicadaEm.localeCompare(a.publicadaEm));
      const podeSerie = C.estado.assinante;
      return `<div class="container">
        <nav class="breadcrumb" aria-label="Você está em"><a href="#/painel">Painel de indicadores</a> › ${C.esc(i.nome)}</nav>
        <div class="materia-layout">
          <article>
            <h1>${C.esc(i.nome)}</h1>
            ${C.cartaoDado(i, 'hero', { link: false })}
            <div class="acoes" style="margin:12px 0 24px">${C.chipProximo(i)}<span class="chip">${C.esc(i.frequencia)}</span></div>
            <section class="camada camada-parabola" data-estado="lendo"><div class="camada-cabecalho"><span class="numero" aria-hidden="true">1</span><span class="nome">A parábola</span></div><div class="camada-corpo">${C.esc(i.parabola)}</div></section>
            <section class="camada" data-estado="aberta"><div class="camada-cabecalho"><span class="numero" aria-hidden="true">2</span><span class="nome">O que significa</span></div><div class="camada-corpo editorial">${C.termos(i.significado)}</div></section>
            <section class="camada" data-estado="aberta"><div class="camada-cabecalho"><span class="numero" aria-hidden="true">3</span><span class="nome">A série e a técnica</span>${podeSerie ? '' : '<span class="acao">🔒 Assinantes</span>'}</div>
              <div class="camada-corpo editorial">
                ${podeSerie ? C.grafico(i, { anos: 5 }) : `<div class="paywall"><h4>Para assinantes</h4><ul><li>Gráfico da série desde 2016, com seletor de período${i.faixaMeta ? ' e faixa da meta' : ''}</li><li>Tabela de dados para copiar</li><li>Link direto para a série na fonte (${C.esc(f.identificador)})</li></ul><p class="preco">Assinatura mensal por <strong>R$ 19,90</strong>. Cancele quando quiser.</p><a class="btn btn-primario" href="#/planos?volta=${encodeURIComponent('#/indicador/' + i.id)}">Assinar</a></div>`}
                <h3>Como é calculado</h3>${C.termos(i.metodologia)}
                <h3>Fonte oficial</h3>
                <p><strong>${C.esc(f.instituicao)}</strong> · ${C.esc(f.sistema)} · ${C.esc(f.identificador)}</p>
                <ul><li><a href="${f.urlHumana}" target="_blank" rel="noopener">Abrir na fonte ↗</a></li><li><a href="${f.metodologia}" target="_blank" rel="noopener">Nota metodológica ↗</a></li><li>Endpoint: <code style="font-size:13px;word-break:break-all">${C.esc(f.url)}</code></li></ul>
              </div></section>
            ${C.aviso()}
            <section class="secao"><h2 class="secao-titulo">Matérias que citaram ${C.esc(i.nome)}</h2><div class="grid grid-3">${materias.map(C.cartaoMateria).join('') || '<div class="vazio">Nenhuma matéria ainda.</div>'}</div></section>
          </article>
          <aside class="lateral">
            <div class="cartao"><h4>Ficha</h4><ul class="lista-simples">
              <li><strong>Unidade:</strong> ${C.esc(i.unidade)}</li><li><strong>Período de referência:</strong> ${C.esc(i.periodoReferencia)}</li><li><strong>Publicado em:</strong> ${C.fmtData(i.publicadoEm)}, ${i.publicadoHora}</li><li><strong>Próxima divulgação:</strong> ${C.fmtData(i.proximaDivulgacao)}, ${i.proximaHora} (${C.esc(i.proximaDescricao)})</li><li><strong>Frequência:</strong> ${C.esc(i.frequencia)}</li><li><strong>Fonte:</strong> ${C.esc(f.instituicao)} · ${C.esc(f.identificador)}</li></ul></div>
            <div class="cartao"><h4>Definição</h4><p style="font-size:14px;margin:0">${C.esc(i.definicao)}</p></div>
          </aside>
        </div></div>`;
    }
  };
})(window.CEP);
