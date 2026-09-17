// Componentes compartilhados: formatação, cartão de dado, gráfico, termos do glossário, avisos.
window.CEP = window.CEP || {};
(function (C) {
  const HOJE = new Date('2026-09-17T10:00:00-03:00'); // Data fixa do protótipo
  C.HOJE = HOJE;
  const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const MESES_LONGO = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  C.esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  C.fmtNum = (v, dec = 2, sinal = false) => {
    const s = Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (v < 0) return '−' + s;
    return (sinal && v > 0 ? '+' : '') + s;
  };
  C.parseData = (iso) => { const [a, m, d] = iso.split('-').map(Number); return new Date(a, m - 1, d); };
  C.fmtData = (iso) => { const d = C.parseData(iso); return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`; };
  C.fmtDataCurta = (iso) => { const d = C.parseData(iso); return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`; };
  C.fmtMesLongo = (iso) => { const d = C.parseData(iso); return `${MESES_LONGO[d.getMonth()]} de ${d.getFullYear()}`; };
  C.diaMes = (iso) => { const d = C.parseData(iso); return { dia: d.getDate(), mes: MESES[d.getMonth()], semana: DIAS[d.getDay()], ano: d.getFullYear() }; };
  C.timeTag = (iso, texto) => `<time datetime="${iso}">${texto || C.fmtData(iso)}</time>`;
  C.diasAte = (iso) => Math.round((C.parseData(iso) - new Date(HOJE.getFullYear(), HOJE.getMonth(), HOJE.getDate())) / 86400000);
  C.ehHoje = (iso) => C.diasAte(iso) === 0;

  C.indicador = (id) => C.indicadores.find((i) => i.id === id);
  C.materia = (slug) => C.materias.find((m) => m.slug === slug);
  C.edicao = (id) => C.edicoes.find((e) => e.id === id);
  C.fonte = (id) => C.fontes[id];
  C.termoPorChave = (txt) => { const k = txt.toLowerCase().trim(); return C.glossario.find((g) => g.termo.toLowerCase() === k || g.chaves.includes(k)); };

  C.valorFormatado = (ind, v = ind.valorAtual) => `${ind.prefixo || ''}${C.fmtNum(v, ind.decimais, !!ind.sinal)}`;

  C.tendencia = (t) => {
    const map = { alta: ['↑', 'alta'], baixa: ['↓', 'baixa'], estavel: ['→', 'estável'] };
    const [seta, txt] = map[t] || map.estavel;
    return `<span class="tendencia tendencia-${t}"><span aria-hidden="true">${seta}</span> ${txt}</span>`;
  };

  C.frescor = (ind) => {
    const dias = -C.diasAte(ind.publicadoEm);
    if (C.ehHoje(ind.proximaDivulgacao)) return `<span class="selo selo-aguardando">Sai hoje ${ind.proximaHora}</span>`;
    if (dias <= 2) return `<span class="selo selo-novo">Novo</span>`;
    return `<span class="selo selo-atual">Atual</span>`;
  };
  C.seloIlustrativo = () => `<span class="selo selo-ilustrativo" title="Valor de exemplo, não é o dado real">Ilustrativo</span>`;

  C.chipProximo = (ind, comAlerta = true) => {
    const hoje = C.ehHoje(ind.proximaDivulgacao);
    const txt = hoje ? `Hoje, ${ind.proximaHora}` : `${C.fmtDataCurta(ind.proximaDivulgacao)}, ${ind.proximaHora}`;
    const ativo = C.estado.alertas.includes(ind.id);
    return `<span class="chip chip-proximo" title="${C.esc(ind.proximaDescricao)}"><span aria-hidden="true">📅</span> Próximo: ${txt}</span>` +
      (comAlerta ? C.botaoAlerta(ind.id, ativo) : '');
  };
  C.botaoAlerta = (id, ativo) => `<button class="chip chip-btn ${ativo ? 'chip-ativo' : ''}" data-alerta="${id}" aria-pressed="${ativo}">${ativo ? '✓ Aviso ativo' : '🔔 Me avise'}</button>`;

  // Cartão de dado — obrigatório onde houver número. Responde: o quê, por quê, fonte, próximo.
  C.cartaoDado = (ind, variante = 'padrao', { link = true } = {}) => {
    const f = C.fonte(ind.fonte);
    const tag = link ? 'a' : 'div';
    const href = link ? ` href="#/indicador/${ind.id}"` : '';
    const extra = ind.id === 'ipca' ? `<span class="unidade">no mês: ${C.fmtNum(ind.valorMes, 2)} %</span>` : ind.id === 'pib' ? `<span class="unidade">em 12 meses: ${C.fmtNum(ind.valorAnual, 1, true)} %</span>` : '';
    return `<${tag}${href} class="cartao cartao-dado cartao-${variante}" aria-label="${C.esc(ind.nome)}: ${C.valorFormatado(ind)} ${C.esc(ind.unidade)}">
      <div class="topo-cartao"><span class="nome">${C.esc(ind.nome)}</span><span class="selos">${C.frescor(ind)}${C.seloIlustrativo()}</span></div>
      <div class="valor-linha"><span class="valor num">${C.valorFormatado(ind)}</span><span class="unidade">${C.esc(ind.unidade)}</span>${C.tendencia(ind.tendencia)}${extra}</div>
      <div class="periodo">${C.esc(ind.periodoReferencia)}</div>
      ${variante !== 'compacto' ? `<p class="parabola-curta">${C.esc(ind.parabolaCurta)}</p>` : ''}
      <div class="rodape-cartao">
        <div>Fonte: ${link ? C.esc(f.instituicao) + ' · ' + C.esc(f.sistema) : `<a href="${f.urlHumana}" target="_blank" rel="noopener">${C.esc(f.instituicao)} · ${C.esc(f.sistema)} ↗</a>`}</div>
        <div class="linha-frescor"><span>Publicado ${C.timeTag(ind.publicadoEm)}</span><span>Próximo: ${C.fmtDataCurta(ind.proximaDivulgacao)}, ${ind.proximaHora}</span></div>
      </div>
    </${tag}>`;
  };

  C.aviso = (curto = false) => curto
    ? `<p class="microcopy">Informação, não recomendação.</p>`
    : `<aside class="aviso" role="note"><span class="ico" aria-hidden="true">💬</span><div><strong>Isto não é recomendação de investimento.</strong> Explicamos o que aconteceu na economia e o que costuma significar. O que fazer com essa informação é decisão sua. Não somos consultores de valores mobiliários registrados na CVM.</div></aside>`;

  // Converte <t>termo</t> em botões de glossário
  C.termos = (html) => html.replace(/<t>(.*?)<\/t>/g, (_, txt) => {
    const g = C.termoPorChave(txt);
    if (!g) return txt;
    return `<button type="button" class="termo" data-termo="${C.esc(g.termo)}" aria-haspopup="dialog">${txt}</button>`;
  });

  // Gráfico SVG de linha com tabela equivalente
  C.grafico = (ind, opts = {}) => {
    const anos = opts.anos || 5;
    const id = `g-${ind.id}-${Math.random().toString(36).slice(2, 7)}`;
    const pontos = anos === 0 ? ind.serie : ind.serie.slice(-(anos * 4 + 1));
    const W = 640, H = 260, pl = 44, pr = 16, pt = 20, pb = 36;
    let min = Math.min(...pontos.map((p) => p.valor)), max = Math.max(...pontos.map((p) => p.valor));
    if (ind.faixaMeta) { min = Math.min(min, ind.faixaMeta.min); max = Math.max(max, ind.faixaMeta.max); }
    if (ind.sinal) { min = Math.min(min, 0); max = Math.max(max, 0); }
    const pad = (max - min) * 0.12 || 1; min -= pad; max += pad;
    const x = (i) => pl + (i / (pontos.length - 1)) * (W - pl - pr);
    const y = (v) => pt + (1 - (v - min) / (max - min)) * (H - pt - pb);
    const path = pontos.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.valor).toFixed(1)}`).join(' ');
    const ticks = 4; let grade = '';
    for (let t = 0; t <= ticks; t++) { const v = min + ((max - min) * t) / ticks; grade += `<line class="grade" x1="${pl}" x2="${W - pr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/><text class="eixo-t" x="${pl - 6}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="currentColor" opacity=".6">${C.fmtNum(v, ind.decimais > 1 ? 1 : ind.decimais)}</text>`; }
    let eixoX = ''; const passo = Math.max(1, Math.round(pontos.length / 6));
    pontos.forEach((p, i) => { if (i % passo === 0 || i === pontos.length - 1) eixoX += `<text x="${x(i).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="currentColor" opacity=".6">${p.periodo.replace('-T', '/T')}</text>`; });
    let meta = '';
    if (ind.faixaMeta) meta = `<rect class="area-meta" x="${pl}" y="${y(ind.faixaMeta.max).toFixed(1)}" width="${W - pl - pr}" height="${(y(ind.faixaMeta.min) - y(ind.faixaMeta.max)).toFixed(1)}"/><line class="linha-meta" x1="${pl}" x2="${W - pr}" y1="${y(ind.faixaMeta.centro).toFixed(1)}" y2="${y(ind.faixaMeta.centro).toFixed(1)}"/>`;
    const zero = ind.sinal ? `<line class="zero" x1="${pl}" x2="${W - pr}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}"/>` : '';
    const ult = pontos[pontos.length - 1]; const prim = pontos[0];
    const desc = `${ind.nome}: de ${C.valorFormatado(ind, prim.valor)} em ${prim.rotulo} para ${C.valorFormatado(ind, ult.valor)} em ${ult.rotulo}. Máximo ${C.valorFormatado(ind, Math.max(...pontos.map((p) => p.valor)))}, mínimo ${C.valorFormatado(ind, Math.min(...pontos.map((p) => p.valor)))}.`;
    const f = C.fonte(ind.fonte);
    const tabela = `<table class="grafico-tabela" id="${id}-tabela" hidden><caption class="sr-only">${C.esc(ind.nome)} — ${C.esc(ind.transformacao)}</caption><thead><tr><th>Período</th><th>${C.esc(ind.unidade)}</th></tr></thead><tbody>${pontos.map((p) => `<tr><td>${p.rotulo}</td><td class="num">${C.valorFormatado(ind, p.valor)}</td></tr>`).join('')}</tbody></table>`;
    return `<figure class="grafico" data-grafico="${ind.id}" data-anos="${anos}" id="${id}">
      <div class="grafico-cabecalho"><div><div class="grafico-titulo">${C.esc(ind.nome)} — ${C.esc(ind.unidade)}</div><div class="grafico-sub">${C.esc(ind.transformacao)}${ind.faixaMeta ? ' · faixa sombreada: ' + C.esc(ind.faixaMeta.rotulo) : ''}</div></div>
      <div class="periodos" role="group" aria-label="Período do gráfico">${[[1, '1 ano'], [5, '5 anos'], [10, '10 anos'], [0, 'Máx.']].map(([a, r]) => `<button type="button" data-periodo="${a}" aria-pressed="${a === anos}">${r}</button>`).join('')}</div></div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${C.esc(desc)}"><desc>${C.esc(desc)}</desc>${meta}${grade}${zero}<path class="linha" d="${path}"/><circle class="ponto-atual" cx="${x(pontos.length - 1).toFixed(1)}" cy="${y(ult.valor).toFixed(1)}" r="5"/><text class="rotulo-atual" x="${(x(pontos.length - 1) - 8).toFixed(1)}" y="${(y(ult.valor) - 10).toFixed(1)}" text-anchor="end">${C.valorFormatado(ind, ult.valor)}</text>${eixoX}</svg>
      <figcaption class="grafico-rodape"><span>Fonte: <a href="${f.urlHumana}" target="_blank" rel="noopener">${C.esc(f.instituicao)} · ${C.esc(f.identificador)} ↗</a> · <strong>Dados ilustrativos</strong></span><span class="acoes"><button type="button" class="btn btn-terciario btn-pequeno" data-ver-tabela="${id}-tabela" aria-expanded="false">Ver tabela</button><button type="button" class="btn btn-terciario btn-pequeno" data-copiar-dados="${ind.id}">Copiar dados</button></span></figcaption>
      ${tabela}
    </figure>`;
  };

  C.tabelaFocus = () => {
    const f = C.fonte(C.focus.fonte);
    return `<table class="tabela"><thead><tr><th>Indicador</th><th>Mediana</th><th>Semana anterior</th></tr></thead><tbody>${C.focus.itens.map((i) => `<tr><td>${i.indicador}</td><td class="num">${i.valor} ${C.tendencia(i.direcao)}</td><td class="num">${i.anterior}</td></tr>`).join('')}</tbody></table><p class="nota">Boletim Focus de ${C.fmtData(C.focus.publicadoEm)} · Fonte: <a href="${f.urlHumana}" target="_blank" rel="noopener">${f.instituicao} · ${f.sistema} ↗</a> · Próximo: ${C.fmtData(C.focus.proximaDivulgacao)}, 8h25 · Dados ilustrativos.</p>`;
  };

  C.paywall = (materia) => `<div class="paywall">
    <h4>O que tem na profundidade desta matéria</h4>
    <ul>${materia.profundidadeSumario.map((s) => `<li>${C.esc(s)}</li>`).join('')}</ul>
    <p class="preco">Assinatura mensal por <strong>R$ 19,90</strong>. Cancele quando quiser, em dois toques, e mantenha o acesso até o fim do período pago.</p>
    <div class="acoes"><a class="btn btn-primario" href="#/planos?volta=${encodeURIComponent('#/materia/' + materia.slug)}">Assinar para ir mais fundo</a><a class="btn btn-terciario" href="#/planos">Ver o que é grátis</a></div>
  </div>`;

  C.cartaoMateria = (m) => {
    const ed = C.edicao(m.edicao);
    return `<a class="cartao cartao-materia" href="#/materia/${m.slug}">
      <div class="acoes"><span class="chip">${C.esc(m.tipo)}</span>${m.acesso === 'gratis' ? '<span class="selo selo-gratis">Grátis</span>' : '<span class="selo selo-assinante">Assinantes</span>'}</div>
      <h3>${C.esc(m.titulo)}</h3>
      <p class="linha-fina">${C.esc(m.linhaFina)}</p>
      <div class="meta"><span>${C.timeTag(m.publicadaEm)}</span><span>·</span><span>Edição nº ${ed.numero}</span><span>·</span><span>${1 + m.tempoLeitura.entendimento + m.tempoLeitura.profundidade} min no total</span></div>
    </a>`;
  };

  C.rodape = () => `<footer class="rodape container">
    <p><strong>Como Está o País</strong> — revista mensal de macroeconomia brasileira. Publicamos no calendário oficial de BCB, IBGE, Tesouro Nacional, IPEA e MTE.</p>
    <p>Protótipo com <strong>dados ilustrativos</strong>. Fontes e endpoints citados são os oficiais; os valores não são reais.</p>
    <p><a href="#/sobre">Método editorial e aviso completo</a> · <a href="#/glossario">Glossário</a> · <a href="#/planos">Planos</a></p>
  </footer>`;
})(window.CEP);
