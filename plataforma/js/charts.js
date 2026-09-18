// Gráficos SVG: linha (múltiplas séries), barras, barras empilhadas. Sempre com unidade, período e fonte no envelope.
window.CM = window.CM || {};
(function (M) {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  M.esc = esc;
  const fmts = {
    pct2: (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%',
    pct1: (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%',
    pct1s: (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%',
    pct2s: (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%',
    brl: (v) => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    brl0: (v) => 'R$ ' + Math.round(v).toLocaleString('pt-BR'),
    pts: (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    pts0: (v) => Math.round(v).toLocaleString('pt-BR'),
    mil: (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v)).toLocaleString('pt-BR') + ' mil',
    mi: (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mi'
  };
  M.fmt = (v, f = 'pct2') => (fmts[f] || fmts.pct2)(v);
  const short = (v) => Math.abs(v) >= 1000 ? Math.round(v / 1000).toLocaleString('pt-BR') + ' mil' : v.toLocaleString('pt-BR', { maximumFractionDigits: 1 });

  // series: [{nome, valores, cor}], labels: [], opts: {altura, fmt, faixa:{min,max,centro,rotulo}, zero, normalizar}
  M.linha = (series, labels, o = {}) => {
    const W = 720, H = o.altura || 260, pl = 48, pr = 16, pt = 16, pb = 32;
    let ss = series.map((s) => ({ ...s }));
    if (o.normalizar) ss = ss.map((s) => ({ ...s, valores: s.valores.map((v) => (v / (s.valores[0] || 1)) * 100) }));
    const all = ss.flatMap((s) => s.valores);
    let min = Math.min(...all), max = Math.max(...all);
    if (o.faixa) { min = Math.min(min, o.faixa.min); max = Math.max(max, o.faixa.max); }
    if (o.zero) { min = Math.min(min, 0); max = Math.max(max, 0); }
    const pad = (max - min) * 0.1 || 1; min -= pad; max += pad;
    const n = labels.length;
    const x = (i) => pl + (i / (n - 1)) * (W - pl - pr), y = (v) => pt + (1 - (v - min) / (max - min)) * (H - pt - pb);
    let g = '';
    for (let t = 0; t <= 4; t++) { const v = min + ((max - min) * t) / 4; g += `<line x1="${pl}" x2="${W - pr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="var(--grade)"/><text x="${pl - 6}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--t3)">${o.normalizar ? Math.round(v) : short(v)}</text>`; }
    const passo = Math.max(1, Math.round(n / 8)); let xl = '';
    labels.forEach((l, i) => { if ((i % passo === 0 && i < n - 1 - passo / 2) || i === n - 1) xl += `<text x="${x(i).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="var(--t3)">${esc(l)}</text>`; });
    let faixa = '';
    if (o.faixa) faixa = `<rect x="${pl}" y="${y(o.faixa.max).toFixed(1)}" width="${W - pl - pr}" height="${(y(o.faixa.min) - y(o.faixa.max)).toFixed(1)}" fill="var(--area)" opacity=".7"/><line x1="${pl}" x2="${W - pr}" y1="${y(o.faixa.centro).toFixed(1)}" y2="${y(o.faixa.centro).toFixed(1)}" stroke="var(--verde)" stroke-dasharray="3 3"/><text x="${pl + 4}" y="${(y(o.faixa.max) - 4).toFixed(1)}" text-anchor="start" font-size="10" fill="var(--verde)">${esc(o.faixa.rotulo || 'Meta')}</text>`;
    const zero = o.zero ? `<line x1="${pl}" x2="${W - pr}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}" stroke="var(--t3)"/>` : '';
    const cores = ['var(--serie1)', 'var(--serie2)', 'var(--serie3)'];
    let paths = '', pontos = '';
    ss.forEach((s, k) => {
      const c = s.cor || cores[k % 3];
      const d = s.valores.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
      if (k === 0 && o.area) paths += `<path d="${d} L${x(n - 1).toFixed(1)},${y(min).toFixed(1)} L${x(0).toFixed(1)},${y(min).toFixed(1)} Z" fill="${c}" opacity=".08"/>`;
      paths += `<path d="${d}" fill="none" stroke="${c}" stroke-width="${k === 0 ? 2 : 1.75}" stroke-linejoin="round"/>`;
      const u = s.valores[n - 1]; const rot = o.normalizar ? Math.round(u) : M.fmt(u, s.fmt || o.fmt);
      pontos += `<circle cx="${x(n - 1).toFixed(1)}" cy="${y(u).toFixed(1)}" r="4.5" fill="${k === 0 ? 'var(--ouro)' : c}" stroke="#fff" stroke-width="1.5"/><text x="${(x(n - 1) - 8).toFixed(1)}" y="${(y(u) - 9 - k * 0).toFixed(1)}" text-anchor="end" font-size="12" font-weight="600" fill="var(--t1)">${esc(rot)}</text>`;
    });
    const desc = ss.map((s) => `${s.nome}: de ${M.fmt(s.valores[0], s.fmt || o.fmt)} em ${labels[0]} para ${M.fmt(s.valores[n - 1], s.fmt || o.fmt)} em ${labels[n - 1]}`).join('; ');
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(desc)}"><desc>${esc(desc)}</desc>${faixa}${g}${zero}${paths}${pontos}${xl}</svg>`;
  };

  // barras simples: valores [], labels [], fmt; cor por sinal opcional
  M.barras = (valores, labels, o = {}) => {
    const W = 720, H = o.altura || 220, pl = 48, pr = 16, pt = 16, pb = 32;
    let min = Math.min(0, ...valores), max = Math.max(0, ...valores); const pad = (max - min) * 0.12 || 1; min -= pad; max += pad;
    const n = valores.length, bw = (W - pl - pr) / n, y = (v) => pt + (1 - (v - min) / (max - min)) * (H - pt - pb);
    let g = ''; for (let t = 0; t <= 4; t++) { const v = min + ((max - min) * t) / 4; g += `<line x1="${pl}" x2="${W - pr}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="var(--grade)"/><text x="${pl - 6}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--t3)">${short(v)}</text>`; }
    let b = ''; const passo = Math.max(1, Math.round(n / 10));
    valores.forEach((v, i) => { const x0 = pl + i * bw + bw * 0.15; const h = Math.abs(y(v) - y(0)); const cor = o.cor ? o.cor(v, i) : (v < 0 ? 'var(--pressao)' : 'var(--serie1)'); b += `<rect x="${x0.toFixed(1)}" y="${Math.min(y(v), y(0)).toFixed(1)}" width="${(bw * 0.7).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${cor}" opacity="${i === n - 1 ? 1 : 0.75}"><title>${esc(labels[i])}: ${esc(M.fmt(v, o.fmt))}</title></rect>`; if (i % passo === 0 || i === n - 1) b += `<text x="${(x0 + bw * 0.35).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="var(--t3)">${esc(labels[i])}</text>`; });
    b += `<line x1="${pl}" x2="${W - pr}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}" stroke="var(--t3)"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.desc || 'Gráfico de barras')}">${g}${b}</svg>`;
  };

  // barras horizontais de contribuição (decomposição): itens [{nome, valor}], fmt
  M.contrib = (itens, o = {}) => {
    const max = Math.max(...itens.map((i) => Math.abs(i.valor))) || 1;
    return `<div class="stack" style="gap:8px">${itens.map((i) => `<div class="row" style="gap:12px"><span style="width:${o.lw || 160}px;font-size:13px;color:var(--t2)">${esc(i.nome)}</span><div class="grow" style="height:14px;background:var(--sutil);border-radius:4px;position:relative"><div style="position:absolute;left:${i.valor < 0 ? 50 - (Math.abs(i.valor) / max) * 50 : 50}%;width:${(Math.abs(i.valor) / max) * 50}%;height:100%;background:${i.valor < 0 ? 'var(--expansao)' : 'var(--pressao)'};border-radius:4px;opacity:.85"></div><div style="position:absolute;left:50%;top:-2px;bottom:-2px;width:1px;background:var(--t3)"></div></div><b class="num" style="width:72px;text-align:right;font-size:13px">${esc(M.fmt(i.valor, o.fmt || 'pct2s'))}</b></div>`).join('')}</div>`;
  };

  // Envelope de gráfico
  M.grafico = (o) => `<figure class="grafico" ${o.id ? `id="${o.id}"` : ''}><div class="cab"><div><div class="tit">${esc(o.titulo)}</div><div class="sub">${esc(o.sub || '')}</div></div>${o.controles || ''}</div>${o.svg}<div class="rod">${o.legenda ? `<div class="legenda">${o.legenda.map((l) => `<span style="--c:${l.cor}">${esc(l.nome)}</span>`).join('')}</div>` : '<span></span>'}<span class="fonte"><b>Fonte: ${esc(o.fonte)}</b>${o.ref ? ` · ${esc(o.ref)}` : ''} · Dados ilustrativos</span></div>${o.tabela ? `<details style="margin-top:8px"><summary class="small" style="cursor:pointer;color:var(--azul);font-weight:500">Ver tabela de dados</summary><div class="grafico-tabela"><table class="tabela"><thead><tr><th>Período</th>${o.tabela.series.map((s) => `<th class="num">${esc(s.nome)}</th>`).join('')}</tr></thead><tbody>${o.tabela.labels.map((l, i) => `<tr><td>${esc(l)}</td>${o.tabela.series.map((s) => `<td class="num">${esc(M.fmt(s.valores[i], s.fmt || o.tabela.fmt))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>` : ''}</figure>`;

  M.sparkline = (vals, w = 252, h = 40, cor = 'var(--serie1)') => { const min = Math.min(...vals), max = Math.max(...vals); const pts = vals.map((v, i) => [(i / (vals.length - 1)) * w, h - 3 - ((v - min) / ((max - min) || 1)) * (h - 6)]); const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '); const u = pts[pts.length - 1]; return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="none" stroke="${cor}" stroke-width="1.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><circle cx="${u[0].toFixed(1)}" cy="${u[1].toFixed(1)}" r="3" fill="var(--ouro)"/></svg>`; };
})(window.CM);
