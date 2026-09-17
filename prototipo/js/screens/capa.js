// Capa da edição: manchete com a parábola exposta, faixa de indicadores, "o que mudou", destaques e próximos 7 dias.
(function (C) {
  const ordenarPorInteresse = (lista) => {
    const prio = (C.estado.interesses || []).map((t) => C.TEMA_IND[t]);
    return [...lista].sort((a, b) => { const ia = prio.indexOf(a.id), ib = prio.indexOf(b.id); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib); });
  };
  C.screens.capa = {
    titulo: (p) => { const e = C.edicao(p.edicaoId || '2026-09'); return e ? `Edição nº ${e.numero} · ${e.titulo}` : 'Capa'; },
    render(params) {
      const ed = C.edicao(params.edicaoId || '2026-09'); if (!ed) return `<div class="container"><div class="vazio">Edição não encontrada.</div></div>`;
      const manchete = C.materia(ed.manchete);
      const indM = C.indicador(manchete.indicador);
      const materiasEd = C.materias.filter((m) => m.edicao === ed.id);
      const proximos = C.eventos.filter((e) => e.status === 'previsto' && C.diasAte(e.data) >= 0 && C.diasAte(e.data) <= 7);
      const antiga = ed.status === 'fechada';
      return `<div class="container">
        ${antiga ? `<div class="cartao" style="margin-bottom:16px;font-size:14px">Você está lendo a edição de <strong>${C.esc(ed.titulo)}</strong>, fechada em ${C.fmtData(ed.fechadaEm)}. Os dados podem ter sido revisados desde então. <a href="#/">Ver a edição atual</a>.</div>` : ''}
        <header class="cabecalho-edicao">
          <div class="nome-jornal">Como Está o País</div>
          <div class="linha-edicao"><span>Edição nº ${ed.numero}</span><span>·</span><span>${C.esc(ed.titulo)}</span><span>·</span><span>${ed.status === 'fechada' ? `Fechada em ${C.fmtData(ed.fechadaEm)}` : `Em andamento · ${materiasEd.length} matérias até agora`}</span><span>·</span><span>Hoje, ${C.timeTag('2026-09-17')}</span></div>
        </header>
        <section class="manchete" aria-labelledby="manchete-titulo">
          <div>
            <p class="rotulo" style="margin-bottom:8px">Manchete · ${C.esc(manchete.gatilho)}</p>
            <h1 id="manchete-titulo"><a href="#/materia/${manchete.slug}">${C.esc(manchete.titulo)}</a></h1>
            <p class="linha-fina">${C.esc(manchete.linhaFina)}</p>
            <div class="parabola-capa"><span class="rotulo-parabola">① A parábola</span>${C.esc(manchete.parabola)}</div>
            <p style="margin-top:16px" class="acoes"><a class="btn btn-primario" href="#/materia/${manchete.slug}">Continuar para o entendimento · +${manchete.tempoLeitura.entendimento} min</a>${manchete.acesso === 'gratis' ? '<span class="selo selo-gratis">Matéria grátis desta edição</span>' : ''}</p>
          </div>
          <div>${C.cartaoDado(indM, 'padrao')}<p class="microcopy" style="margin-top:8px">${C.esc(ed.editorial)}</p></div>
        </section>
        <section class="secao" aria-labelledby="sec-ind"><h2 class="secao-titulo" id="sec-ind">Termômetro <a href="#/painel">Painel completo →</a></h2>
          <div class="faixa-scroll">${ordenarPorInteresse(C.indicadores).map((i) => C.cartaoDado(i, 'compacto')).join('')}</div></section>
        <div class="grid grid-2" style="margin-top:32px">
          <section aria-labelledby="sec-mudou"><h2 class="secao-titulo" id="sec-mudou">O que mudou desde a última edição</h2>
            ${ed.oQueMudou.map((m) => { const i = C.indicador(m.indicador); const nome = i ? i.nome : 'Focus · IPCA 2026'; return `<div class="mudanca"><div><span class="nome">${C.esc(nome)}</span><div class="nota">${C.esc(m.nota)} · Fonte: ${C.esc(m.fonte)}</div></div><div class="de-para">${m.de} → <strong>${m.para}</strong> ${C.tendencia(m.direcao)}</div></div>`; }).join('')}
            <p class="microcopy" style="margin-top:8px">Dados ilustrativos.</p></section>
          <section aria-labelledby="sec-prox"><h2 class="secao-titulo" id="sec-prox">Próximos 7 dias <a href="#/calendario">Calendário →</a></h2>
            ${proximos.length ? proximos.map((e) => C.itemEvento(e, true)).join('') : '<div class="vazio">Nenhuma divulgação oficial nos próximos 7 dias.</div>'}</section>
        </div>
        <section class="secao" aria-labelledby="sec-dest"><h2 class="secao-titulo" id="sec-dest">Nesta edição</h2>
          <div class="grid grid-3">${materiasEd.filter((m) => m.slug !== manchete.slug).map(C.cartaoMateria).join('')}</div></section>
        ${C.aviso()}
      </div>`;
    }
  };
})(window.CEP);
