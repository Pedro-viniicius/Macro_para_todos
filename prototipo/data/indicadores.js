// Dados ILUSTRATIVOS — nenhum valor abaixo deve ser lido como real.
// Fontes e identificadores de série são os oficiais; os números são exemplo de protótipo.
window.CEP = window.CEP || {};

// Séries trimestrais (fim de trimestre). Formato: [ "AAAA-Tn", valor ]
// Valores até 2025 aproximam a história pública; de 2026 em diante são ficção de protótipo.
function serieTrimestral(inicioAno, valores) {
  const pts = [];
  let ano = inicioAno, tri = 1;
  for (const v of valores) {
    pts.push({ periodo: `${ano}-T${tri}`, rotulo: `${tri}º tri ${ano}`, valor: v });
    tri++; if (tri > 4) { tri = 1; ano++; }
  }
  return pts;
}

CEP.fontes = {
  bcb_sgs_432: { instituicao: 'Banco Central do Brasil', sistema: 'SGS', identificador: 'Série 432 (meta Selic)', url: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json', urlHumana: 'https://www3.bcb.gov.br/sgspub/', metodologia: 'https://www.bcb.gov.br/controleinflacao/taxaselic' },
  bcb_sgs_1: { instituicao: 'Banco Central do Brasil', sistema: 'SGS', identificador: 'Série 1 (PTAX venda)', url: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados?formato=json', urlHumana: 'https://www3.bcb.gov.br/sgspub/', metodologia: 'https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes' },
  ibge_sidra_1737: { instituicao: 'IBGE', sistema: 'SIDRA', identificador: 'Tabela 1737 (IPCA)', url: 'https://apisidra.ibge.gov.br/values/t/1737/n1/all/v/63,2265/p/last%2013', urlHumana: 'https://sidra.ibge.gov.br/tabela/1737', metodologia: 'https://www.ibge.gov.br/estatisticas/economicas/precos-e-custos/9256-indice-nacional-de-precos-ao-consumidor-amplo.html' },
  ibge_sidra_5932: { instituicao: 'IBGE', sistema: 'SIDRA', identificador: 'Tabela 5932 (PIB, variações)', url: 'https://apisidra.ibge.gov.br/values/t/5932/n1/all/v/6564/p/last%2012/c11255/90707', urlHumana: 'https://sidra.ibge.gov.br/tabela/5932', metodologia: 'https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9300-contas-nacionais-trimestrais.html' },
  ibge_sidra_6381: { instituicao: 'IBGE', sistema: 'SIDRA', identificador: 'Tabela 6381 (PNAD Contínua)', url: 'https://apisidra.ibge.gov.br/values/t/6381/n1/all/v/4099/p/last%2012', urlHumana: 'https://sidra.ibge.gov.br/tabela/6381', metodologia: 'https://www.ibge.gov.br/estatisticas/sociais/trabalho/9173-pesquisa-nacional-por-amostra-de-domicilios-continua-trimestral.html' },
  bcb_sgs_13762: { instituicao: 'Banco Central do Brasil', sistema: 'SGS', identificador: 'Série 13762 (DBGG % PIB)', url: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.13762/dados?formato=json', urlHumana: 'https://www3.bcb.gov.br/sgspub/', metodologia: 'https://www.bcb.gov.br/estatisticas/estatisticasfiscais' },
  bcb_olinda_focus: { instituicao: 'Banco Central do Brasil', sistema: 'Olinda', identificador: 'ExpectativasMercadoAnuais', url: "https://olinda.bcb.gov.br/olinda/servico/Expectativas/versao/v1/odata/ExpectativasMercadoAnuais?$top=10&$format=json", urlHumana: 'https://www.bcb.gov.br/publicacoes/focus', metodologia: 'https://www.bcb.gov.br/publicacoes/focus' },
  tesouro_rtn: { instituicao: 'Tesouro Nacional', sistema: 'Tesouro Transparente', identificador: 'Resultado do Tesouro Nacional', url: 'https://www.tesourotransparente.gov.br/ckan/api/3/action/package_show?id=resultado-do-tesouro-nacional', urlHumana: 'https://www.tesourotransparente.gov.br/publicacoes/resultado-do-tesouro-nacional-rtn/', metodologia: 'https://www.tesourotransparente.gov.br/' },
  mte_caged: { instituicao: 'Ministério do Trabalho e Emprego', sistema: 'Novo CAGED', identificador: 'Painel PDET', url: 'https://pdet.mte.gov.br/novo-caged', urlHumana: 'https://pdet.mte.gov.br/novo-caged', metodologia: 'https://pdet.mte.gov.br/novo-caged' },
  ipeadata: { instituicao: 'IPEA', sistema: 'IPEADATA', identificador: 'API OData', url: "http://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PAN12_IPCAG12')", urlHumana: 'http://www.ipeadata.gov.br/', metodologia: 'http://www.ipeadata.gov.br/' }
};

CEP.indicadores = [
  {
    id: 'selic', nome: 'Selic (meta)', tema: 'juros', unidade: '% a.a.', decimais: 2,
    valorAtual: 14.25, valorAnterior: 14.25, tendencia: 'estavel',
    periodoReferencia: 'Reunião de 16/09/2026', publicadoEm: '2026-09-16', publicadoHora: '18:30',
    proximaDivulgacao: '2026-11-04', proximaHora: '18:30', proximaDescricao: 'Próxima decisão do Copom',
    frequencia: 'A cada 45 dias (8 reuniões por ano)', fonte: 'bcb_sgs_432',
    parabolaCurta: 'É o aluguel-base do dinheiro no país: quando sobe, pegar emprestado fica mais caro para todo mundo.',
    parabola: 'Imagine que o dinheiro tem um aluguel. Quem empresta cobra esse aluguel de quem pega emprestado. A Selic é o aluguel-base do país: quando o Banco Central aumenta esse aluguel, fica mais caro pegar dinheiro para abrir uma loja ou comprar uma geladeira a prazo, e as pessoas pensam duas vezes antes de gastar. Menos gente gastando, os preços sobem mais devagar.',
    definicao: 'Taxa básica de juros da economia, definida pelo Comitê de Política Monetária (Copom) do Banco Central a cada 45 dias. É a meta para a taxa média dos financiamentos diários lastreados em títulos públicos e serve de referência para as demais taxas.',
    significado: '<p>A Selic é o principal instrumento do Banco Central para controlar a <t>inflação</t>. Quando ela sobe, o crédito fica mais caro, o consumo e o investimento desaceleram e os preços tendem a subir mais devagar — com uma defasagem de 6 a 18 meses. Quando cai, acontece o contrário.</p><p>Quase todo juro cobrado no país é calculado "em cima" da Selic: cartão, cheque especial, financiamento, capital de giro. Por isso, uma decisão do <t>Copom</t> chega ao seu bolso mesmo que você nunca tenha ouvido falar dela.</p>',
    metodologia: '<p><strong>O que mede.</strong> A meta para a taxa Selic, definida pelo Copom. A taxa efetiva (série SGS 11) é a média diária das operações compromissadas de um dia com títulos públicos; o BCB atua no mercado para mantê-la próxima da meta.</p><p><strong>Frequência.</strong> 8 reuniões por ano, às terças e quartas; decisão divulgada na quarta às 18h30. A ata sai na terça-feira seguinte, às 8h.</p><p><strong>Revisões.</strong> Não há revisão: a meta vale a partir do dia útil seguinte à reunião.</p><p><strong>Onde encontrar.</strong> SGS, série 432 (meta) e série 11 (efetiva diária). Comunicados e atas em bcb.gov.br/controleinflacao.</p>',
    faixaMeta: null,
    serie: serieTrimestral(2016, [14.25,14.25,14.25,13.75, 12.25,10.25,8.25,7.00, 6.50,6.50,6.50,6.50, 6.50,6.50,5.50,4.50, 3.75,2.25,2.00,2.00, 2.75,4.25,6.25,9.25, 11.75,13.25,13.75,13.75, 13.75,13.75,12.75,11.75, 10.75,10.50,10.75,12.25, 14.25,15.00,15.00,15.00, 14.75,14.25,14.25]),
    transformacao: 'Nível, fim do trimestre'
  },
  {
    id: 'ipca', nome: 'IPCA', tema: 'inflacao', unidade: '% em 12 meses', decimais: 2,
    valorAtual: 4.10, valorAnterior: 4.35, tendencia: 'baixa',
    valorMes: 0.32, valorMesAnterior: 0.41,
    periodoReferencia: 'Agosto de 2026', publicadoEm: '2026-09-10', publicadoHora: '09:00',
    proximaDivulgacao: '2026-10-09', proximaHora: '09:00', proximaDescricao: 'IPCA de setembro',
    frequencia: 'Mensal, por volta do dia 10', fonte: 'ibge_sidra_1737',
    parabolaCurta: 'É o caderno de compras do país: mede quanto a mesma cesta ficou mais cara.',
    parabola: 'Dona Cida faz a mesma compra do mês toda vez: arroz, feijão, óleo, gás, passagem de ônibus, remédio da pressão. Ela anota tudo num caderno há anos. O IPCA é o caderno de Dona Cida em tamanho país: o IBGE anota os preços de centenas de coisas em 16 regiões e vê quanto a mesma cesta ficou mais cara. Se o salário de alguém não subiu isso, essa pessoa está comprando menos com o mesmo dinheiro.',
    definicao: 'Índice Nacional de Preços ao Consumidor Amplo, calculado pelo IBGE. Mede a variação de preços de uma cesta de bens e serviços para famílias com renda de 1 a 40 salários mínimos em 16 áreas urbanas. É o índice oficial de inflação e a referência da meta do Banco Central.',
    significado: '<p>O IPCA é o número que reajusta aluguéis, salário mínimo, aposentadorias e a <t>meta de inflação</t>. Quando ele sobe, o mesmo dinheiro compra menos; quando cede, o <t>Copom</t> ganha espaço para reduzir a <t>Selic</t> mais adiante.</p><p>O valor "em 12 meses" é a referência para saber se um reajuste de preço ou de salário acompanhou o custo de vida. O valor "no mês" mostra o ritmo recente.</p>',
    metodologia: '<p><strong>O que mede.</strong> Variação do custo de uma cesta com cerca de 430 mil preços coletados por mês em 16 áreas urbanas, ponderada pela Pesquisa de Orçamentos Familiares.</p><p><strong>Grupos e pesos aproximados.</strong> Alimentação 21 % · Transportes 21 % · Habitação 15 % · Saúde 13 % · Despesas pessoais 10 % · Educação 6 % · Vestuário 5 % · Comunicação 4 % · Residência 4 %.</p><p><strong>Frequência.</strong> Mensal, divulgado por volta do dia 10 do mês seguinte, às 9h. O IPCA-15 é a prévia (coleta de 15 a 15).</p><p><strong>Revisões.</strong> Não há revisão do índice publicado.</p><p><strong>Onde encontrar.</strong> SIDRA, tabelas 1737 (índice geral) e 7060 (grupos e itens). SGS série 433.</p>',
    faixaMeta: { min: 1.5, max: 4.5, centro: 3.0, rotulo: 'Meta 3 % (tolerância 1,5 % a 4,5 %)' },
    serie: serieTrimestral(2016, [9.4,8.8,8.5,6.3, 4.6,3.0,2.5,2.9, 2.7,4.4,4.5,3.7, 4.6,3.4,2.9,4.3, 3.3,2.1,3.1,4.5, 6.1,8.4,10.2,10.1, 11.3,11.9,7.2,5.8, 4.7,3.2,5.2,4.6, 3.9,4.2,4.4,4.8, 5.5,5.4,5.2,5.3, 5.0,4.5,4.1]),
    transformacao: 'Variação acumulada em 12 meses, fim do trimestre'
  },
  {
    id: 'cambio', nome: 'Dólar (PTAX venda)', tema: 'cambio', unidade: 'por US$ 1', decimais: 2, prefixo: 'R$ ',
    valorAtual: 5.32, valorAnterior: 5.38, tendencia: 'baixa',
    periodoReferencia: 'Fechamento de 16/09/2026', publicadoEm: '2026-09-16', publicadoHora: '13:15',
    proximaDivulgacao: '2026-09-17', proximaHora: '13:15', proximaDescricao: 'PTAX de hoje',
    frequencia: 'Diária (dias úteis), por volta das 13h', fonte: 'bcb_sgs_1',
    parabolaCurta: 'É o preço do dólar em reais no fim do dia — o "preço oficial" usado em contratos.',
    parabola: 'Seu Jorge vende peças de carro importadas. Ele compra em dólar e vende em real. Se o dólar sobe, a peça que custava R$ 500 passa a custar R$ 550 — e ele tem que repassar, ou perde dinheiro. O câmbio é isso: quantos reais custa um dólar. Como muita coisa que a gente compra tem um pedaço importado (trigo, remédio, celular, combustível), o dólar mais caro chega à prateleira aos poucos.',
    definicao: 'Taxa de câmbio de referência calculada pelo Banco Central a partir da média das cotações consultadas junto a dealers ao longo do dia, divulgada diariamente. Usada como referência em contratos e liquidações.',
    significado: '<p>O dólar afeta os preços de tudo o que é importado ou cotado em dólar (combustível, trigo, eletrônicos, remédios) e a receita de quem exporta (soja, minério, carne). Um dólar mais alto tende a pressionar a <t>inflação</t>; um dólar mais baixo alivia.</p><p>O câmbio reage a juros (dentro e fora do país), a risco fiscal e ao humor global — e por isso é o indicador mais volátil desta lista.</p>',
    metodologia: '<p><strong>O que mede.</strong> A PTAX é a média das taxas informadas por instituições credenciadas em quatro janelas de consulta ao longo do dia, expressa em R$ por US$ 1.</p><p><strong>Frequência.</strong> Diária, em dias úteis, divulgada por volta das 13h15.</p><p><strong>Onde encontrar.</strong> SGS, série 1 (venda) e 10813 (compra).</p>',
    faixaMeta: null,
    serie: serieTrimestral(2016, [3.56,3.21,3.25,3.26, 3.17,3.31,3.17,3.31, 3.32,3.86,4.00,3.87, 3.90,3.83,4.16,4.03, 5.20,5.48,5.64,5.20, 5.70,5.00,5.44,5.58, 4.74,5.24,5.41,5.22, 5.08,4.82,5.01,4.84, 5.01,5.59,5.45,6.18, 5.74,5.46,5.32,5.40, 5.50,5.38,5.32]),
    transformacao: 'Cotação de fim de trimestre'
  },
  {
    id: 'pib', nome: 'PIB', tema: 'atividade', unidade: '% no trimestre', decimais: 1, sinal: true,
    valorAtual: 0.4, valorAnterior: 0.3, tendencia: 'alta',
    valorAnual: 2.1,
    periodoReferencia: '2º trimestre de 2026 (dessazonalizado)', publicadoEm: '2026-09-02', publicadoHora: '09:00',
    proximaDivulgacao: '2026-12-03', proximaHora: '09:00', proximaDescricao: 'PIB do 3º trimestre',
    frequencia: 'Trimestral, cerca de 60 dias após o fim do trimestre', fonte: 'ibge_sidra_5932',
    parabolaCurta: 'É a soma de tudo o que o país produziu num período — o "faturamento" do Brasil.',
    parabola: 'Pense numa cidade pequena onde todo mundo produz alguma coisa: o padeiro faz pão, a costureira faz roupa, o pedreiro levanta parede, a professora dá aula. Se você somasse o valor de tudo o que a cidade produziu num ano, teria o "PIB da cidade". O PIB do Brasil é isso, para o país inteiro. Crescer 0,4 % em três meses é andar devagar, mas para a frente.',
    definicao: 'Produto Interno Bruto: soma de todos os bens e serviços finais produzidos no território nacional em um período, a preços de mercado. Calculado pelo IBGE nas Contas Nacionais Trimestrais.',
    significado: '<p>O PIB é a medida mais ampla de "se a economia está andando". Ele cresce quando famílias consomem, empresas investem, o governo gasta e o país exporta mais do que importa.</p><p>Duas comparações que confundem: "contra o trimestre anterior, <t>dessazonalizado</t>" mede o ritmo recente; "contra o mesmo trimestre do ano anterior" mede o acumulado. Nunca compare uma com a outra.</p>',
    metodologia: '<p><strong>O que mede.</strong> Valor adicionado da agropecuária, indústria e serviços, mais impostos, a preços de mercado. Também pela ótica da demanda (consumo das famílias, governo, investimento, exportações e importações).</p><p><strong>Frequência.</strong> Trimestral, cerca de 60 dias após o fim do trimestre, às 9h.</p><p><strong>Revisões.</strong> Os trimestres anteriores são revisados a cada divulgação; há uma revisão anual maior em novembro. Revisão não é erro: é incorporação de dados mais completos.</p><p><strong>Onde encontrar.</strong> SIDRA, tabelas 5932 (variações) e 1620 (índice encadeado dessazonalizado).</p>',
    faixaMeta: null,
    serie: serieTrimestral(2016, [-0.5,-0.4,-0.6,-0.3, 1.1,0.3,0.3,0.1, 0.4,0.0,0.6,0.2, -0.1,0.6,0.5,0.4, -1.9,-9.0,7.9,2.9, 1.2,-0.3,0.4,0.7, 1.1,1.0,0.5,0.1, 1.3,0.9,0.0,0.1, 1.0,1.3,0.7,0.2, 1.4,0.4,0.3,0.2, 0.3,0.4]),
    transformacao: 'Variação contra o trimestre anterior, com ajuste sazonal'
  },
  {
    id: 'desemprego', nome: 'Taxa de desocupação', tema: 'emprego', unidade: '%', decimais: 1,
    valorAtual: 6.4, valorAnterior: 6.5, tendencia: 'baixa',
    periodoReferencia: 'Trimestre móvel maio–julho de 2026', publicadoEm: '2026-08-28', publicadoHora: '09:00',
    proximaDivulgacao: '2026-09-30', proximaHora: '09:00', proximaDescricao: 'PNAD Contínua, junho–agosto',
    frequencia: 'Mensal (trimestre móvel), no fim do mês', fonte: 'ibge_sidra_6381',
    parabolaCurta: 'De cada cem pessoas que trabalham ou procuram trabalho, quantas não acharam.',
    parabola: 'Numa rua com cem pessoas adultas, algumas trabalham, algumas estão procurando emprego e algumas nem estão procurando — cuidam da casa, estudam, se aposentaram. O IBGE bate de porta em porta, todo mês, em 211 mil casas pelo país, e pergunta: "Você trabalhou na semana passada? Se não, procurou?". Quem procurou e não achou é "desocupado". Hoje, de cada cem pessoas que trabalham ou procuram trabalho, pouco mais de seis não acharam.',
    definicao: 'Percentual de pessoas desocupadas (sem trabalho, que procuraram e estavam disponíveis) na força de trabalho, medido pela PNAD Contínua do IBGE em trimestres móveis.',
    significado: '<p>Desemprego baixo e renda subindo sustentam o consumo — é por isso que serviços e comércio crescem apesar dos juros altos. Mas um mercado de trabalho muito aquecido tende a pressionar salários e, com eles, os preços de serviços. É uma das razões de a <t>Selic</t> seguir alta.</p><p>Olhe também o rendimento médio e a <t>informalidade</t>: a taxa sozinha não conta a história inteira.</p>',
    metodologia: '<p><strong>O que mede.</strong> Desocupados ÷ força de trabalho × 100. Amostra de cerca de 211 mil domicílios por trimestre. Cada dado é um <t>trimestre móvel</t>: "julho" significa "maio a julho".</p><p><strong>Sazonalidade.</strong> O desemprego costuma subir no 1º trimestre e cair no 2º semestre; compare sempre com o mesmo trimestre do ano anterior.</p><p><strong>Frequência.</strong> Mensal, no fim do mês seguinte ao trimestre, às 9h.</p><p><strong>Onde encontrar.</strong> SIDRA, tabelas 6381 (taxa), 6390 (rendimento) e 4093 (subutilização). O Novo CAGED (MTE) complementa com o saldo de empregos formais.</p>',
    faixaMeta: null,
    serie: serieTrimestral(2016, [10.9,11.3,11.8,12.0, 13.7,13.0,12.4,11.8, 13.1,12.4,11.9,11.6, 12.7,12.0,11.8,11.0, 12.2,13.3,14.6,13.9, 14.7,14.1,12.6,11.1, 11.1,9.3,8.7,7.9, 8.8,8.0,7.7,7.4, 7.9,6.9,6.4,6.2, 7.0,6.2,5.6,6.1, 7.0,6.5,6.4]),
    transformacao: 'Trimestre móvel encerrado no fim do trimestre'
  },
  {
    id: 'divida', nome: 'Dívida bruta / PIB', tema: 'contas_publicas', unidade: '% do PIB', decimais: 1,
    valorAtual: 78.9, valorAnterior: 78.5, tendencia: 'alta',
    periodoReferencia: 'Julho de 2026', publicadoEm: '2026-08-29', publicadoHora: '08:30',
    proximaDivulgacao: '2026-09-30', proximaHora: '08:30', proximaDescricao: 'Estatísticas fiscais de agosto',
    frequencia: 'Mensal, por volta do dia 30', fonte: 'bcb_sgs_13762',
    parabolaCurta: 'É quanto o governo deve comparado com quanto o país produz num ano.',
    parabola: 'Seu Antônio tem uma oficina que fatura R$ 10 mil por mês e deve R$ 7.900 no banco. Ninguém olha só o tamanho da dívida — olha a dívida comparada ao que ele ganha. Se a oficina crescer, a mesma dívida fica mais leve; se ele pegar mais empréstimo do que fatura, fica mais pesada. E tem o aluguel do dinheiro: quanto mais alto o juro, mais a dívida cresce sozinha, mesmo sem ele pegar um real a mais.',
    definicao: 'Dívida Bruta do Governo Geral (União, estados e municípios) dividida pelo PIB nominal acumulado em 12 meses. Não desconta ativos como as reservas internacionais; é a medida usada nas comparações internacionais.',
    significado: '<p>Quanto maior a dívida, mais o mercado cobra para emprestar ao governo — e o juro que o governo paga vira o piso do juro que todo mundo paga. É um dos motivos de o Brasil ter <t>juro real</t> tão alto.</p><p>A dívida sobe com <t>déficit primário</t> e com juros; cai com crescimento do PIB e inflação (que aumentam o denominador).</p>',
    metodologia: '<p><strong>O que mede.</strong> DBGG em % do PIB. A dívida líquida (DLSP, série 4513) desconta ativos e inclui o BCB e estatais.</p><p><strong>A dinâmica.</strong> Variação ≈ (juro real − crescimento) × dívida/PIB − superávit primário.</p><p><strong>Frequência.</strong> Mensal, nas Estatísticas Fiscais do BCB, por volta do dia 30, às 8h30. O Tesouro publica o Resultado do Tesouro Nacional e o Relatório Mensal da Dívida com o detalhe do Governo Central.</p><p><strong>Onde encontrar.</strong> SGS série 13762 (DBGG) e 4513 (DLSP); Tesouro Transparente (RTN e RMD).</p>',
    faixaMeta: null,
    serie: serieTrimestral(2016, [68.0,69.6,70.6,69.8, 71.0,72.7,73.6,73.7, 74.7,76.4,76.8,75.3, 76.5,76.8,77.0,74.4, 77.5,83.5,89.0,86.9, 85.0,82.5,80.6,77.3, 77.4,76.9,75.7,71.7, 71.9,73.2,73.8,73.8, 75.5,76.6,77.3,76.1, 76.8,77.0,77.8,77.5, 78.0,78.5,78.9]),
    transformacao: 'Nível, fim do trimestre'
  }
];

// Boletim Focus (mediana das expectativas) — ILUSTRATIVO
CEP.focus = {
  publicadoEm: '2026-09-14', proximaDivulgacao: '2026-09-21', fonte: 'bcb_olinda_focus',
  itens: [
    { indicador: 'IPCA 2026', valor: '4,05 %', anterior: '4,10 %', direcao: 'baixa' },
    { indicador: 'IPCA 2027', valor: '3,60 %', anterior: '3,60 %', direcao: 'estavel' },
    { indicador: 'Selic fim de 2026', valor: '14,00 % a.a.', anterior: '14,25 % a.a.', direcao: 'baixa' },
    { indicador: 'Selic fim de 2027', valor: '11,50 % a.a.', anterior: '11,50 % a.a.', direcao: 'estavel' },
    { indicador: 'PIB 2026', valor: '+2,0 %', anterior: '+2,0 %', direcao: 'estavel' },
    { indicador: 'Dólar fim de 2026', valor: 'R$ 5,40', anterior: 'R$ 5,45', direcao: 'baixa' }
  ]
};

// Indicadores secundários citados em matérias e no calendário — ILUSTRATIVO
CEP.secundarios = {
  caged: { nome: 'Saldo de empregos formais (CAGED)', valor: '+115 mil', periodo: 'Julho de 2026', publicadoEm: '2026-08-28', fonte: 'mte_caged' },
  rtn: { nome: 'Resultado primário do Governo Central', valor: '−R$ 12,3 bi', periodo: 'Julho de 2026', publicadoEm: '2026-08-28', fonte: 'tesouro_rtn' }
};
