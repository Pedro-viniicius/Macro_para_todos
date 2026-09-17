// Calendário de lançamentos: lista cronológica, hoje em destaque, filtros e "Me avise".
(function (C) {
  let fInst = 'todas', fJanela = 30;
  const INST = ['todas', 'BCB', 'IBGE', 'Tesouro Nacional', 'MTE'];
  C.itemEvento = (e, compacto = false) => {
    const d = C.diaMes(e.data); const dias = C.diasAte(e.data); const hoje = dias === 0;
    const alertaId = e.indicador === 'focus' ? 'focus' : e.indicador;
    const ativo = C.estado.alertas.includes(alertaId);
    const status = e.status === 'divulgado' ? `<span class="selo selo-atual">Divulgado</span>` : hoje ? `<span class="selo selo-aguardando">Hoje</span>` : dias < 0 ? `<span class="selo selo-aguardando">Aguardando ${C.esc(e.instituicao)}</span>` : '';
    return `<div class="evento ${hoje ? 'evento-hoje' : ''}">
      <div class="data"><span class="dia">${d.dia}</span><span class="mes">${d.mes}</span><span class="semana">${d.semana}</span></div>
      <div>
        <div class="titulo">${e.materia ? `<a href="#/materia/${e.materia}">${C.esc(e.titulo)}</a>` : C.esc(e.titulo)} ${status}</div>
        <div class="meta"><span>${C.esc(e.instituicao)}</span><span>·</span><span>${e.hora}</span><span>·</span><span>${C.esc(e.periodo)}</span></div>
        ${e.status === 'divulgado' ? `<div class="detalhe"><strong>Saiu:</strong> ${C.esc(e.valor)}${e.materia ? ` · <a href="#/materia/${e.materia}">Ler a matéria</a>` : ''}</div>` : ''}
        ${e.status !== 'divulgado' && !compacto ? `<div class="detalhe">${e.ultimo ? `<strong>Último:</strong> ${C.esc(e.ultimo)}` : ''}${e.ultimo && e.esperado ? ' · ' : ''}${e.esperado ? `<strong>Esperado:</strong> ${C.esc(e.esperado)}` : ''}</div>` : ''}
        ${e.status !== 'divulgado' ? `<div class="acoes">${C.botaoAlerta(alertaId, ativo)}</div>` : ''}
      </div></div>`;
  };
  C.screens.calendario = {
    titulo: () => 'Calendário de lançamentos',
    render() {
      const lista = C.eventos.filter((e) => (fInst === 'todas' || e.instituicao === fInst) && C.diasAte(e.data) >= -15 && C.diasAte(e.data) <= fJanela).sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora));
      let html = '', mesAtual = '';
      for (const e of lista) { const mes = C.fmtMesLongo(e.data); if (mes !== mesAtual) { mesAtual = mes; html += `<h2 class="mes-titulo">${mes.charAt(0).toUpperCase() + mes.slice(1)}</h2>`; } html += C.itemEvento(e); }
      const nAlertas = C.estado.alertas.length;
      return `<div class="container">
        <header class="cabecalho-tela"><h1>Calendário de lançamentos</h1><p>Publicamos no ritmo das instituições. Hoje é ${C.timeTag('2026-09-17', 'quinta-feira, 17/09/2026')}. ${nAlertas ? `Você tem ${nAlertas} aviso${nAlertas > 1 ? 's' : ''} ativo${nAlertas > 1 ? 's' : ''}.` : 'Toque em <em>Me avise</em> para receber um aviso quando o dado sair.'}</p>
          <div class="acoes"><div class="acoes" role="group" aria-label="Instituição">${INST.map((i) => `<button type="button" class="chip chip-btn chip-filtro" data-inst="${i}" aria-pressed="${fInst === i}">${i === 'todas' ? 'Todas' : i}</button>`).join('')}</div><span class="espaco"></span><div class="periodos" role="group" aria-label="Janela">${[[7, '7 dias'], [30, '30 dias'], [90, '90 dias']].map(([d, r]) => `<button type="button" data-janela="${d}" aria-pressed="${fJanela === d}">${r}</button>`).join('')}</div></div></header>
        ${html || '<div class="vazio"><div class="ico">📅</div>Nenhuma divulgação com esses filtros.</div>'}
        <section class="secao"><h2 class="secao-titulo">Calendários oficiais</h2><ul class="lista-simples">${C.calendariosOficiais.map((c) => `<li><a href="${c.url}" target="_blank" rel="noopener">${C.esc(c.nome)} ↗</a></li>`).join('')}</ul><p class="microcopy" style="margin-top:12px">Datas seguem o padrão dos calendários oficiais; valores "último" e "esperado" são ilustrativos.</p></section>
        ${C.aviso(true)}
      </div>`;
    },
    depois() {
      document.getElementById('app').onclick = (e) => {
        const i = e.target.closest('[data-inst]'); if (i) { fInst = i.dataset.inst; C._manterScroll = true; C.render(); return; }
        const j = e.target.closest('[data-janela]'); if (j) { fJanela = Number(j.dataset.janela); C._manterScroll = true; C.render(); return; }
      };
    }
  };
})(window.CEP);
