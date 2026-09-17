// Matéria: três camadas em revelação progressiva num único fluxo de leitura.
(function (C) {
  const estadoCamadas = {}; // por slug: { entendimento: bool, profundidade: bool }
  const renderProfundidade = (m) => m.profundidade
    .replace(/\{\{grafico:(\w+)\}\}/g, (_, id) => C.grafico(C.indicador(id), { anos: 10 }))
    .replace(/\{\{focus\}\}/g, () => C.tabelaFocus());

  C.screens.materia = {
    titulo: (p) => { const m = C.materia(p.slug); return m ? m.titulo : 'Matéria'; },
    render(params) {
      const m = C.materia(params.slug);
      if (!m) return `<div class="container"><div class="vazio"><div class="ico">📰</div>Matéria não encontrada. <a href="#/arquivo">Ver o arquivo</a>.</div></div>`;
      const ed = C.edicao(m.edicao); const ind = C.indicador(m.indicador);
      const st = estadoCamadas[m.slug] || (estadoCamadas[m.slug] = { entendimento: C.estado.mostrarTudo, profundidade: C.estado.mostrarTudo });
      const podeProfundidade = C.estado.assinante || m.acesso === 'gratis';
      const camadaAtual = st.profundidade ? 3 : st.entendimento ? 2 : 1;
      const proximosRel = C.eventos.filter((e) => e.status === 'previsto' && m.indicadores.includes(e.indicador)).slice(0, 3);
      const termosCitados = [...new Set([...(m.entendimento + m.profundidade).matchAll(/<t>(.*?)<\/t>/g)].map((x) => C.termoPorChave(x[1])).filter(Boolean).map((g) => g.termo))];
      const relacionadas = C.materias.filter((x) => x.slug !== m.slug && x.indicadores.some((i) => m.indicadores.includes(i))).slice(0, 3);
      return `<div class="container">
        <nav class="breadcrumb" aria-label="Você está em"><a href="#/edicao/${ed.id}">Edição nº ${ed.numero} · ${C.esc(ed.titulo)}</a> › Matéria</nav>
        <div class="materia-layout">
          <article>
            <header class="materia-cabecalho">
              <p class="gatilho">${C.esc(m.tipo).toUpperCase()} · Publicada às ${m.publicadaHora} de ${C.timeTag(m.publicadaEm)} · ${C.esc(m.gatilho)} ${m.acesso === 'gratis' ? '<span class="selo selo-gratis">Grátis</span>' : ''}</p>
              <h1>${C.esc(m.titulo)}</h1>
              <p class="linha-fina">${C.esc(m.linhaFina)}</p>
            </header>
            ${C.cartaoDado(ind, 'hero')}
            <div class="progresso-camadas" aria-label="Progresso de leitura">
              ${[1, 2, 3].map((n) => `<span class="ponto" data-ativo="${n <= camadaAtual}"></span>`).join('')}
              <span>Camada ${camadaAtual} de 3</span>
              <button type="button" class="btn btn-terciario btn-pequeno mostrar-tudo" data-mostrar-tudo>${st.entendimento && st.profundidade ? 'Recolher' : 'Mostrar tudo'}</button>
            </div>
            <div class="camadas">
              <section class="camada camada-parabola" data-estado="lendo" aria-labelledby="c1">
                <div class="camada-cabecalho"><span class="numero" aria-hidden="true">1</span><span class="nome" id="c1">A parábola</span><span class="tempo">1 min</span></div>
                <div class="camada-corpo">${C.esc(m.parabola)}</div>
              </section>
              <section class="camada camada-entendimento" data-estado="${st.entendimento ? 'aberta' : 'fechada'}" aria-labelledby="c2">
                <button type="button" class="camada-cabecalho" data-camada="entendimento" aria-expanded="${st.entendimento}" aria-controls="corpo-entendimento"><span class="numero" aria-hidden="true">2</span><span class="nome" id="c2">O entendimento</span><span class="tempo">+${m.tempoLeitura.entendimento} min</span>${st.entendimento ? '' : '<span class="acao">Continuar ▸</span>'}</button>
                <div class="camada-corpo editorial" id="corpo-entendimento" tabindex="-1">${C.termos(m.entendimento)}</div>
              </section>
              <section class="camada camada-profundidade" data-estado="${st.profundidade ? 'aberta' : 'fechada'}" aria-labelledby="c3">
                <button type="button" class="camada-cabecalho" data-camada="profundidade" aria-expanded="${st.profundidade}" aria-controls="corpo-profundidade"><span class="numero" aria-hidden="true">3</span><span class="nome" id="c3">A profundidade</span><span class="tempo">+${m.tempoLeitura.profundidade} min</span>${st.profundidade ? '' : podeProfundidade ? '<span class="acao">Ir mais fundo ▸</span>' : '<span class="acao">🔒 Assinantes</span>'}</button>
                <div class="camada-corpo editorial" id="corpo-profundidade" tabindex="-1">${podeProfundidade ? C.termos(renderProfundidade(m)) : C.paywall(m)}</div>
              </section>
            </div>
            ${C.aviso()}
            <section class="secao"><h2 class="secao-titulo">Nesta matéria</h2>
              <div class="grid grid-2">
                <div><p class="rotulo">Indicadores citados</p><ul class="lista-simples">${m.indicadores.map((i) => { const x = C.indicador(i); return `<li><a href="#/indicador/${x.id}">${C.esc(x.nome)}</a> — ${C.valorFormatado(x)} ${C.esc(x.unidade)} · próximo ${C.fmtDataCurta(x.proximaDivulgacao)}</li>`; }).join('')}</ul></div>
                <div><p class="rotulo">Termos do glossário</p><p>${termosCitados.map((t) => `<button type="button" class="chip chip-btn" data-termo="${C.esc(t)}">${C.esc(t)}</button>`).join(' ') || '—'}</p></div>
              </div></section>
            ${relacionadas.length ? `<section class="secao"><h2 class="secao-titulo">Matérias relacionadas</h2><div class="grid grid-3">${relacionadas.map(C.cartaoMateria).join('')}</div></section>` : ''}
          </article>
          <aside class="lateral">
            <div class="cartao"><h4>Próximas divulgações relacionadas</h4>${proximosRel.map((e) => C.itemEvento(e, true)).join('') || '<p class="microcopy">Nenhuma nos próximos dias.</p>'}</div>
            <div class="cartao"><h4>Compartilhar a parábola</h4><p class="microcopy">A parábola é sempre aberta — mesmo para quem não assina.</p><button type="button" class="btn btn-secundario btn-pequeno btn-bloco" data-compartilhar>Copiar a parábola com o link</button></div>
            <div class="cartao"><h4>Como ler esta matéria</h4><p style="font-size:14px;margin:0">Pare onde quiser. Cada camada deixa você com algo verdadeiro: a história, o significado ou a técnica.</p></div>
          </aside>
        </div>
      </div>`;
    },
    depois(params) {
      const m = C.materia(params.slug); if (!m) return;
      const st = estadoCamadas[m.slug];
      document.getElementById('app').onclick = (e) => {
        const b = e.target.closest('[data-camada]');
        if (b) {
          const qual = b.dataset.camada;
          if (qual === 'profundidade' && !(C.estado.assinante || m.acesso === 'gratis') && !st.profundidade) { st.profundidade = true; }
          else st[qual] = !st[qual];
          if (qual === 'profundidade' && st.profundidade) st.entendimento = true;
          C._manterScroll = true; C.render();
          const corpo = document.getElementById('corpo-' + qual); if (corpo && st[qual]) { corpo.focus({ preventScroll: true }); corpo.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
          return;
        }
        if (e.target.closest('[data-mostrar-tudo]')) { const tudo = st.entendimento && st.profundidade; st.entendimento = !tudo; st.profundidade = !tudo; C.estado.mostrarTudo = !tudo; C.salvar(); C._manterScroll = true; C.render(); return; }
        if (e.target.closest('[data-compartilhar]')) { C.copiar(`${m.parabola}\n\n— ${m.titulo}. Como Está o País: ${location.origin}${location.pathname}#/materia/${m.slug}`); return; }
      };
    }
  };
})(window.CEP);
