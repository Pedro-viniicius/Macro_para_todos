// Edições e matérias — conteúdo editorial de exemplo (dados ILUSTRATIVOS).
// Termos entre <t>...</t> viram termos do glossário na interface.
window.CEP = window.CEP || {};

CEP.materias = [
  {
    slug: 'copom-setembro-2026', edicao: '2026-09', tipo: 'decisão', tema: 'juros', acesso: 'gratis',
    indicador: 'selic', indicadores: ['selic', 'ipca', 'divida'],
    titulo: 'Copom mantém a Selic em 14,25 % e pede paciência',
    linhaFina: 'Segunda manutenção seguida. O comitê diz que a inflação cede, mas ainda está longe da meta de 3 %; cortes ficam para as próximas reuniões.',
    publicadaEm: '2026-09-16', publicadaHora: '18:42', gatilho: 'Decisão do Copom das 18h30 de 16/09/2026',
    tempoLeitura: { entendimento: 2, profundidade: 5 },
    parabola: 'Imagine que o dinheiro tem um aluguel. Quem empresta cobra esse aluguel de quem pega emprestado. A Selic é o aluguel-base do país: quando o Banco Central aumenta esse aluguel, fica mais caro pegar dinheiro para abrir uma loja ou comprar uma geladeira a prazo, e as pessoas pensam duas vezes antes de gastar. Menos gente gastando, os preços sobem mais devagar. Hoje o Banco Central decidiu deixar o aluguel como estava — alto, para que a inflação continue cedendo.',
    entendimento: `
<h3>O que aconteceu</h3>
<p>O Comitê de Política Monetária (<t>Copom</t>) manteve a <t>Selic</t> em 14,25 % ao ano pela segunda reunião seguida. No comunicado, o comitê disse que a <t>inflação</t> está cedendo, mas ainda acima da <t>meta de inflação</t> de 3 %, e que prefere esperar mais dados antes de voltar a cortar.</p>
<h3>Por que importa</h3>
<p>A Selic é a referência para quase todo crédito no país. Cartão, cheque especial, financiamento de veículo, <t>capital de giro</t> — tudo é calculado "em cima" dela. Com a Selic parada em patamar alto, o custo desses empréstimos tende a continuar alto pelos próximos meses.</p>
<h3>No dia a dia</h3>
<p>Parcelas longas continuam caras; quem tem dívida atrelada ao <t>CDI</t> (que anda colado na Selic) não vê alívio ainda.</p>
<h3>Para o negócio</h3>
<p>O capital de giro segue custando o que custava. Se o plano era esperar a queda dos juros para tomar crédito, o Copom sinalizou que isso deve começar a acontecer só nas próximas reuniões — sem prometer quando. A próxima decisão é em 04/11/2026; a ata desta reunião, com mais detalhes, sai em 22/09/2026.</p>`,
    profundidadeSumario: ['Gráfico de 10 anos da Selic e o ciclo 2024–2026', 'Juro real e a comparação com a inflação esperada', 'Os três pontos que os economistas discutem'],
    profundidade: `
<h3>O que é, tecnicamente</h3>
<p>A Selic é a taxa básica de juros da economia brasileira: a meta para a taxa média dos financiamentos diários lastreados em títulos públicos federais no Sistema Especial de Liquidação e de Custódia (daí o nome). O Copom define a meta a cada 45 dias, em 8 reuniões anuais; o BCB opera no mercado aberto para manter a taxa efetiva (série SGS 11) próxima da meta (série SGS 432).</p>
<h3>Como chega na inflação</h3>
<p>O canal principal é o crédito e a demanda: juros mais altos encarecem o consumo a prazo e o investimento das empresas, reduzem a demanda agregada e, com defasagem de 6 a 18 meses, diminuem a pressão sobre os preços. Há canais secundários: o <t>câmbio</t> (juros altos tendem a atrair capital externo e valorizar o real, barateando importados) e as <t>expectativas</t> (se o mercado acredita que o BC vai agir, reajusta menos os preços).</p>
{{grafico:selic}}
<h3>O contexto de hoje</h3>
<p>A Selic subiu de 10,50 % (meados de 2024) até 15,00 % (meados de 2025), começou a cair no início de 2026 e está em 14,25 % desde junho. O IPCA em 12 meses caiu de 5,5 % no início de 2026 para 4,10 % em agosto, ainda acima da meta de 3 % (tolerância de 1,5 ponto). O Boletim Focus de 14/09/2026 projeta Selic de 14,00 % no fim de 2026 e 11,50 % no fim de 2027 — ou seja, o mercado espera que os cortes sejam retomados ainda este ano.</p>
<h3>Juro real</h3>
<p>Descontando a inflação esperada para os próximos 12 meses (cerca de 3,9 %), o <t>juro real</t> ex-ante está perto de 10 % ao ano, um dos mais altos do mundo. É esse número, mais que a Selic nominal, que mede o "aperto" da política monetária.</p>
<h3>O que os economistas discutem</h3>
<ol><li>Se a defasagem já "entregou" o suficiente para retomar os cortes;</li><li>Quanto do recuo da inflação é efeito da Selic e quanto é câmbio e alimentos;</li><li>O papel do gasto público em manter a demanda aquecida apesar dos juros (ver a matéria sobre a <a href="#/materia/divida-julho-2026">dívida pública</a>).</li></ol>
<h3>Fontes</h3>
<ul><li>Comunicado do Copom — bcb.gov.br/controleinflacao</li><li>SGS séries 432 (meta) e 11 (efetiva)</li><li>Boletim Focus (Olinda, ExpectativasMercadoAnuais)</li><li>Relatório de Política Monetária (trimestral)</li></ul>`
  },
  {
    slug: 'ipca-agosto-2026', edicao: '2026-09', tipo: 'divulgação', tema: 'inflacao', acesso: 'assinante',
    indicador: 'ipca', indicadores: ['ipca', 'selic'],
    titulo: 'Inflação de agosto é 0,32 %; em 12 meses, cai para 4,10 %',
    linhaFina: 'Alimentos ainda pesam, mas energia mais barata e passagens aéreas em queda seguram o índice. É o quarto mês seguido de desaceleração no acumulado.',
    publicadaEm: '2026-09-10', publicadaHora: '09:31', gatilho: 'Divulgação do IPCA pelo IBGE às 9h de 10/09/2026',
    tempoLeitura: { entendimento: 2, profundidade: 5 },
    parabola: 'Dona Cida faz a mesma compra do mês toda vez: arroz, feijão, óleo, gás, passagem de ônibus, remédio da pressão. Ela anota tudo num caderno há anos. O IPCA é o caderno de Dona Cida em tamanho país: o IBGE anota os preços de centenas de coisas em 16 regiões e vê quanto a mesma cesta ficou mais cara. Em agosto, a cesta subiu um pouquinho; olhando um ano inteiro, ficou 4,10 % mais cara. Se o salário de alguém não subiu isso, essa pessoa está comprando menos com o mesmo dinheiro.',
    entendimento: `
<h3>O que aconteceu</h3>
<p>O <t>IPCA</t> de agosto foi 0,32 %, abaixo dos 0,41 % de julho. Em 12 meses, a inflação acumulada caiu para 4,10 % — ainda acima da <t>meta de inflação</t> de 3 %, mas dentro da faixa de tolerância (1,5 % a 4,5 %).</p>
<p>O que puxou: alimentação em casa subiu 0,6 %, com destaque para carnes e café. O que segurou: energia elétrica caiu com a <t>bandeira tarifária</t> verde, e passagens aéreas recuaram.</p>
<h3>Por que importa</h3>
<p>O IPCA é o índice que reajusta aluguel (em muitos contratos), salário mínimo, aposentadorias e a meta do Banco Central — é o que a <t>Selic</t> tenta controlar. Quando ele cede, o <t>Copom</t> ganha espaço para cortar juros mais adiante.</p>
<h3>No dia a dia</h3>
<p>Se você reajusta seu preço ou sua hora de trabalho uma vez por ano, 4,10 % é a referência do quanto o "custo de vida médio" subiu. Reajustar abaixo disso é perder poder de compra.</p>
<h3>Para o negócio</h3>
<p>Custos de alimentação e serviços seguem subindo mais que a média; energia dá folga. Vale comparar o seu próprio custo com a composição do índice, na profundidade.</p>`,
    profundidadeSumario: ['Agosto grupo a grupo (alimentação, transportes, habitação…)', 'Os núcleos: a inflação "de fundo" ainda não convergiu', 'Série de 10 anos do IPCA com a faixa da meta'],
    profundidade: `
<h3>O que é</h3>
<p>Índice Nacional de Preços ao Consumidor Amplo, calculado pelo IBGE desde 1980. Mede a variação de preços de uma cesta consumida por famílias com renda de 1 a 40 salários mínimos, em 16 áreas urbanas, com cerca de 430 mil preços coletados por mês. Divulgado por volta do dia 10 do mês seguinte, às 9h.</p>
<h3>Agosto por grupo (variação no mês)</h3>
<table class="tabela"><thead><tr><th>Grupo</th><th>Peso</th><th>Variação</th></tr></thead><tbody>
<tr><td>Alimentação e bebidas</td><td>21 %</td><td class="num">+0,60 %</td></tr>
<tr><td>Transportes</td><td>21 %</td><td class="num">+0,15 %</td></tr>
<tr><td>Habitação</td><td>15 %</td><td class="num">−0,20 %</td></tr>
<tr><td>Saúde e cuidados pessoais</td><td>13 %</td><td class="num">+0,45 %</td></tr>
<tr><td>Despesas pessoais</td><td>10 %</td><td class="num">+0,50 %</td></tr>
<tr><td>Educação</td><td>6 %</td><td class="num">+0,10 %</td></tr>
<tr><td>Vestuário</td><td>5 %</td><td class="num">+0,30 %</td></tr>
<tr><td>Comunicação</td><td>4 %</td><td class="num">+0,05 %</td></tr>
<tr><td>Artigos de residência</td><td>4 %</td><td class="num">−0,10 %</td></tr>
</tbody></table>
<p class="nota">Dados ilustrativos. Fonte real: SIDRA, tabela 7060.</p>
<h3>Núcleos</h3>
<p>O BCB acompanha cinco medidas de <t>núcleo de inflação</t> que excluem itens voláteis. A média dos núcleos ficou em 0,30 % no mês e 3,9 % em 12 meses — a inflação "de fundo" ainda não convergiu para 3 %. É esse número que o Copom cita quando pede paciência.</p>
{{grafico:ipca}}
<h3>Meta</h3>
<p>Desde 2025 a meta é contínua: 3 % em 12 meses, com tolerância de 1,5 ponto para cada lado. O BC "descumpre" se o acumulado em 12 meses ficar fora da faixa por 6 meses seguidos.</p>
<h3>Diferença para outros índices</h3>
<p>INPC (famílias de 1 a 5 salários mínimos; reajusta o salário mínimo) · IPCA-15 (prévia, coleta do dia 15 ao 15) · IGP-M (inclui preços no atacado e construção; reajusta muitos aluguéis).</p>
<h3>Fontes</h3>
<ul><li>SIDRA tabelas 1737 (índice) e 7060 (grupos e itens)</li><li>Nota técnica do IPCA (ibge.gov.br)</li><li>SGS série 433</li></ul>`
  },
  {
    slug: 'pib-2tri-2026', edicao: '2026-09', tipo: 'divulgação', tema: 'atividade', acesso: 'assinante',
    indicador: 'pib', indicadores: ['pib', 'desemprego', 'selic'],
    titulo: 'Economia cresce 0,4 % no 2º trimestre, puxada por serviços',
    linhaFina: 'Consumo das famílias sustenta o resultado; indústria e investimento recuam sob juros altos. Em 12 meses, alta de 2,1 %.',
    publicadaEm: '2026-09-02', publicadaHora: '09:40', gatilho: 'Divulgação das Contas Nacionais Trimestrais pelo IBGE às 9h de 02/09/2026',
    tempoLeitura: { entendimento: 2, profundidade: 6 },
    parabola: 'Pense numa cidade pequena onde todo mundo produz alguma coisa: o padeiro faz pão, a costureira faz roupa, o pedreiro levanta parede, a professora dá aula. Se você somasse o valor de tudo o que a cidade produziu num ano, teria o "PIB da cidade". O PIB do Brasil é isso, para o país inteiro. Neste trimestre, a cidade produziu um pouco mais que no anterior — o padeiro vendeu mais pão, mas o pedreiro teve menos obra. Crescer 0,4 % em três meses é andar devagar, mas para a frente.',
    entendimento: `
<h3>O que aconteceu</h3>
<p>O <t>PIB</t> cresceu 0,4 % no 2º trimestre de 2026 em relação ao 1º (já descontando efeitos de época do ano — o <t>dessazonalizado</t>). Comparado ao mesmo trimestre de 2025, a alta foi de 2,1 %. Nos quatro trimestres somados, a economia cresceu 2,3 %.</p>
<p>O que puxou: serviços (+0,6 %), que respondem por 70 % da economia, e o consumo das famílias (+0,5 %), sustentado pelo mercado de trabalho aquecido. O que pesou: indústria (−0,3 %), afetada pelos juros altos, e o <t>investimento (FBCF)</t> (−1,1 %).</p>
<h3>Por que importa</h3>
<p>O PIB é a medida mais ampla de "se a economia está andando". Crescimento baixo com juros altos é o resultado esperado da política monetária — o Banco Central está freando de propósito. A pergunta que os economistas fazem é se a freada está forte demais ou de menos.</p>
<h3>No dia a dia</h3>
<p>Serviços crescendo significa emprego em comércio, saúde, educação, transporte. Indústria encolhendo significa menos vagas em fábricas e menos horas extras.</p>
<h3>Para o negócio</h3>
<p>Quem vende para família (varejo, serviços) tem demanda; quem vende para fábrica ou para obra sente o freio. O investimento em queda é o sinal mais importante: empresas estão adiando compra de máquina e construção.</p>`,
    profundidadeSumario: ['As três óticas e as duas comparações que confundem', 'Detalhe por setor e por componente da demanda', 'Taxa de investimento e o teto do crescimento potencial'],
    profundidade: `
<h3>O que é</h3>
<p>Produto Interno Bruto: soma de todos os bens e serviços finais produzidos no território nacional num período, a preços de mercado. Calculado pelo IBGE nas Contas Nacionais Trimestrais, divulgado cerca de 60 dias após o fim de cada trimestre.</p>
<h3>Três óticas, duas comparações</h3>
<p><strong>Óticas:</strong> produção (agropecuária, indústria, serviços), demanda (consumo das famílias, consumo do governo, investimento, exportações − importações) e renda. As três chegam ao mesmo total.</p>
<p><strong>Comparações:</strong> "trimestre contra trimestre anterior, com ajuste sazonal" (mede o ritmo recente; é o +0,4 %) e "trimestre contra o mesmo trimestre do ano anterior" (mede o acumulado; é o +2,1 %). Nunca compare uma com a outra.</p>
<h3>Detalhe do 2º trimestre (contra o 1º, dessazonalizado)</h3>
<table class="tabela"><thead><tr><th>Componente</th><th>Variação</th></tr></thead><tbody>
<tr><td>Agropecuária</td><td class="num">−1,5 %</td></tr>
<tr><td>Indústria</td><td class="num">−0,3 %</td></tr>
<tr><td>Serviços</td><td class="num">+0,6 %</td></tr>
<tr><td>Consumo das famílias</td><td class="num">+0,5 %</td></tr>
<tr><td>Consumo do governo</td><td class="num">+0,2 %</td></tr>
<tr><td>Investimento (FBCF)</td><td class="num">−1,1 %</td></tr>
<tr><td>Exportações</td><td class="num">+1,8 %</td></tr>
<tr><td>Importações</td><td class="num">+0,9 %</td></tr>
</tbody></table>
<p class="nota">Dados ilustrativos. Fonte real: SIDRA, tabela 5932.</p>
{{grafico:pib}}
<h3>Taxa de investimento</h3>
<p>16,8 % do PIB — baixa para padrões de países em desenvolvimento (China acima de 40 %, Índia perto de 30 %). É o número que limita o crescimento potencial do país no longo prazo.</p>
<h3>Revisões</h3>
<p>O IBGE revisa os trimestres anteriores a cada divulgação e faz uma revisão anual maior em novembro. Revisão não é erro; é incorporação de dados mais completos, como a Pesquisa Industrial Anual.</p>
<h3>Fontes</h3>
<ul><li>SIDRA tabelas 5932 (variações) e 1620 (índice encadeado dessazonalizado)</li><li>Nota metodológica das Contas Nacionais Trimestrais</li><li>Boletim Focus para a projeção anual (+2,0 % em 2026)</li></ul>`
  },
  {
    slug: 'focus-14-setembro-2026', edicao: '2026-09', tipo: 'expectativa', tema: 'expectativas', acesso: 'assinante',
    indicador: 'selic', indicadores: ['selic', 'ipca', 'cambio'],
    titulo: 'Focus: mercado já vê Selic em 14,00 % no fim do ano',
    linhaFina: 'Mediana das projeções para o IPCA de 2026 recua para 4,05 %. É a quinta semana seguida de revisão para baixo.',
    publicadaEm: '2026-09-14', publicadaHora: '09:05', gatilho: 'Boletim Focus das 8h25 de 14/09/2026',
    tempoLeitura: { entendimento: 1, profundidade: 3 },
    parabola: 'Antes da colheita, os agricultores de uma região se reúnem e cada um diz quanto acha que vai colher. Ninguém sabe ao certo — mas a média dos palpites costuma acertar mais que qualquer palpite sozinho, porque cada um viu um pedaço do campo. O Boletim Focus é essa roda de palpites, com cerca de cem bancos e consultorias. Esta semana, a roda passou a achar que a inflação vai fechar o ano um pouco mais baixa, e que o Banco Central vai cortar o juro uma vez antes de dezembro.',
    entendimento: `
<h3>O que aconteceu</h3>
<p>A mediana das <t>expectativas</t> para o <t>IPCA</t> de 2026 caiu de 4,10 % para 4,05 %. Para a <t>Selic</t> no fim de 2026, o mercado passou a projetar 14,00 % (antes, 14,25 %) — ou seja, um corte de 0,25 ponto até dezembro. O dólar esperado para o fim do ano recuou para R$ 5,40.</p>
<h3>Por que importa</h3>
<p>O Focus não é previsão do governo: é o que o mercado acha. Mas o <t>Copom</t> olha muito para ele, porque expectativas bem ancoradas ajudam a inflação a cair. Quando o Focus recua, é sinal de que o mercado acredita no trabalho do BC.</p>
<h3>Para o negócio</h3>
<p>Se você usa uma taxa de juros ou de inflação em planilha de orçamento para 2027, a mediana do Focus é a referência mais usada e mais defensável. Não é garantia — é consenso.</p>`,
    profundidadeSumario: ['A tabela completa da semana', 'Como o Focus é coletado e por que a mediana', 'Focus versus projeção do próprio Banco Central'],
    profundidade: `
<h3>A semana em números</h3>
{{focus}}
<h3>Como funciona</h3>
<p>O BCB coleta projeções de cerca de 100 instituições (bancos, gestoras, consultorias) até a sexta-feira e publica a mediana, a média e o desvio-padrão na segunda-feira às 8h25. Usa-se a mediana porque ela não é distorcida por projeções extremas. O "Top 5" destaca as instituições que mais acertaram nos últimos meses.</p>
<h3>Focus versus BC</h3>
<p>O Banco Central publica a própria projeção no Relatório de Política Monetária (trimestral) e no comunicado do Copom. Quando a projeção do BC está acima do Focus, o BC costuma sinalizar cautela — foi o caso desta reunião: 4,2 % contra 4,05 %.</p>
<h3>Fontes</h3>
<ul><li>Olinda — ExpectativasMercadoAnuais e ExpectativaMercadoMensais</li><li>Boletim Focus em PDF: bcb.gov.br/publicacoes/focus</li></ul>`
  },
  {
    slug: 'pnad-julho-2026', edicao: '2026-08', tipo: 'divulgação', tema: 'emprego', acesso: 'assinante',
    indicador: 'desemprego', indicadores: ['desemprego', 'selic', 'pib'],
    titulo: 'Desemprego fica em 6,4 %, perto da mínima histórica',
    linhaFina: 'Renda média real sobe 3,2 % em um ano. Informalidade segue perto de 38 %. Para o Banco Central, é um sinal de que a demanda continua forte.',
    publicadaEm: '2026-08-28', publicadaHora: '09:35', gatilho: 'Divulgação da PNAD Contínua pelo IBGE às 9h de 28/08/2026',
    tempoLeitura: { entendimento: 2, profundidade: 5 },
    parabola: 'Numa rua com cem pessoas adultas, algumas trabalham, algumas estão procurando emprego e algumas nem estão procurando — cuidam da casa, estudam, se aposentaram. O IBGE bate de porta em porta, todo mês, em 211 mil casas pelo país, e faz a pergunta: "Você trabalhou na semana passada? Se não, procurou?". Quem procurou e não achou é "desocupado". Hoje, de cada cem pessoas que trabalham ou procuram trabalho, pouco mais de seis não acharam. É um dos números mais baixos desde que essa conta começou, em 2012.',
    entendimento: `
<h3>O que aconteceu</h3>
<p>A <t>taxa de desocupação</t> ficou em 6,4 % no trimestre encerrado em julho, perto da mínima histórica da PNAD Contínua (5,6 % no fim de 2025). São 7,1 milhões de pessoas procurando trabalho. A população ocupada chegou a 103,5 milhões.</p>
<p>O rendimento médio real (descontada a inflação) subiu 3,2 % em um ano, para R$ 3.480. A <t>informalidade</t> ficou em 37,8 % — quase 4 em cada 10 trabalhadores sem carteira ou CNPJ.</p>
<h3>Por que importa</h3>
<p>Emprego alto e renda subindo sustentam o consumo — é por isso que serviços e comércio crescem apesar dos juros. Mas, para o Banco Central, um mercado de trabalho muito aquecido é um sinal de alerta: salários subindo rápido tendem a pressionar os preços de serviços. É uma das razões de a <t>Selic</t> seguir alta.</p>
<h3>No dia a dia</h3>
<p>Mais fácil achar emprego, mais difícil para o empregador achar gente. Salário de admissão tende a subir.</p>
<h3>Para o negócio</h3>
<p>Custo de contratação em alta; rotatividade maior; concorrência por mão de obra qualificada. Em serviços, o salário é o principal custo — vale acompanhar o rendimento médio, não só a taxa.</p>`,
    profundidadeSumario: ['Ocupado, desocupado, fora da força: os conceitos', 'PNAD versus CAGED: por que os dois se complementam', 'A "taxa que não acelera a inflação" e o argumento do BC'],
    profundidade: `
<h3>O que é</h3>
<p>Pesquisa Nacional por Amostra de Domicílios Contínua, do IBGE. Amostra de cerca de 211 mil domicílios por trimestre. Taxa de desocupação = desocupados ÷ força de trabalho × 100. Divulgação mensal, mas cada dado é um <t>trimestre móvel</t>, o que suaviza a série e explica por que "julho" é "maio a julho".</p>
<h3>Conceitos que importam</h3>
<p><strong>Ocupado:</strong> trabalhou pelo menos 1 hora na semana de referência, com ou sem carteira. <strong>Desocupado:</strong> não trabalhou, procurou e estava disponível. <strong>Fora da força:</strong> não trabalhou e não procurou. <strong>Subutilização:</strong> soma de desocupados, subocupados por insuficiência de horas e força de trabalho potencial — em 15,2 %, é uma medida mais ampla da folga no mercado.</p>
{{grafico:desemprego}}
<h3>Sazonalidade</h3>
<p>O desemprego costuma subir no 1º trimestre (dispensa dos temporários de fim de ano) e cair no 2º semestre. Comparar mai–jul com fev–abr exagera a melhora; o correto é comparar com mai–jul do ano anterior.</p>
<h3>PNAD versus CAGED</h3>
<p>A PNAD é pesquisa domiciliar (inclui informais); o CAGED é registro administrativo do Ministério do Trabalho (só empregos com carteira). O CAGED de julho registrou saldo de +115 mil vagas formais. O CAGED sai antes e mostra o formal; a PNAD mostra o quadro completo.</p>
<h3>A taxa que não acelera a inflação</h3>
<p>Economistas estimam uma taxa de desemprego "neutra" para o Brasil entre 7 % e 8 %. Com a taxa abaixo disso, há pressão salarial — é o argumento do BCB para manter a Selic alta.</p>
<h3>Fontes</h3>
<ul><li>SIDRA tabelas 6381 (taxa), 6390 (rendimento) e 4093 (subutilização)</li><li>Novo CAGED (pdet.mte.gov.br)</li><li>Nota técnica da PNAD Contínua</li></ul>`
  },
  {
    slug: 'divida-julho-2026', edicao: '2026-08', tipo: 'divulgação', tema: 'contas_publicas', acesso: 'assinante',
    indicador: 'divida', indicadores: ['divida', 'selic', 'pib'],
    titulo: 'Dívida bruta chega a 78,9 % do PIB, alta de 2,8 pontos em um ano',
    linhaFina: 'Juros de R$ 850 bilhões em 12 meses e déficit primário explicam a subida. O que faz a conta parar de crescer — e o que não faz.',
    publicadaEm: '2026-08-29', publicadaHora: '09:10', gatilho: 'Estatísticas fiscais do BCB às 8h30 de 29/08/2026',
    tempoLeitura: { entendimento: 2, profundidade: 6 },
    parabola: 'Seu Antônio tem uma oficina que fatura R$ 10 mil por mês e deve R$ 7.900 no banco. Ninguém olha só o tamanho da dívida — olha a dívida comparada ao que ele ganha. Se a oficina crescer, a mesma dívida fica mais leve; se ele pegar mais empréstimo do que fatura, fica mais pesada. E tem o aluguel do dinheiro: quanto mais alto o juro, mais a dívida cresce sozinha, mesmo sem ele pegar um real a mais. O governo brasileiro está na situação de Seu Antônio: deve quase 79 % do que o país produz num ano, e o juro alto faz essa conta subir todo mês.',
    entendimento: `
<h3>O que aconteceu</h3>
<p>A <t>dívida bruta/PIB</t> do governo geral (União, estados e municípios) chegou a 78,9 % em julho, alta de 0,4 ponto em um mês e de 2,8 pontos em 12 meses. Em reais, são R$ 9,6 trilhões.</p>
<p>O que faz a dívida subir: o governo gasta mais do que arrecada (o <t>déficit primário</t> foi de R$ 12,3 bilhões em julho, segundo o Tesouro) e paga juros sobre o que já deve — com a <t>Selic</t> em 14,25 %, os juros somaram R$ 850 bilhões em 12 meses, cerca de 7 % do PIB. O que faz cair: crescimento do <t>PIB</t> e inflação, que aumentam o denominador.</p>
<h3>Por que importa</h3>
<p>Quanto maior a dívida, mais o mercado cobra para emprestar ao governo — e o juro que o governo paga vira o piso para o juro que todo mundo paga. É um dos motivos de o Brasil ter <t>juro real</t> tão alto: a dívida crescente exige um prêmio maior.</p>
<h3>No dia a dia</h3>
<p>Dívida alta não aparece na sua conta de luz, mas aparece na taxa do seu financiamento e na dificuldade de o Banco Central cortar a Selic.</p>
<h3>Para o negócio</h3>
<p>Acompanhe a relação dívida/PIB como um termômetro do "custo Brasil" no crédito. Quando ela para de subir, o mercado tende a exigir menos prêmio e as taxas longas costumam ceder.</p>`,
    profundidadeSumario: ['Dívida bruta versus dívida líquida', 'A equação da dinâmica da dívida, com os números de hoje', 'Composição da dívida e comparação com 7 países'],
    profundidade: `
<h3>Duas medidas</h3>
<p><strong>Dívida bruta do governo geral (DBGG):</strong> tudo o que União, estados e municípios devem, sem descontar o que têm em caixa. É a mais usada internacionalmente e pelas agências de risco. <strong>Dívida líquida do setor público (DLSP):</strong> desconta os ativos (<t>reservas internacionais</t>, créditos do BNDES) e inclui estatais e o BCB. Em julho: 63,5 % do PIB. A diferença vem principalmente das reservas (US$ 350 bi).</p>
<h3>A dinâmica</h3>
<p>Variação da dívida/PIB ≈ (juro real − crescimento real) × dívida/PIB − superávit primário. Com juro real de ~10 % e crescimento de ~2 %, o primeiro termo é +6 pontos ao ano; para estabilizar a dívida seria preciso superávit primário próximo de 3 % do PIB — o país tem déficit. É isso que os economistas chamam de "dinâmica desfavorável".</p>
{{grafico:divida}}
<h3>Resultado primário</h3>
<p>Receitas menos despesas, sem contar juros. O Governo Central teve déficit primário de R$ 12,3 bi em julho e R$ 48 bi em 12 meses (0,4 % do PIB). A meta do <t>arcabouço fiscal</t> para 2026 é resultado zero, com tolerância de 0,25 ponto.</p>
<h3>Composição da dívida pública federal (Tesouro, julho)</h3>
<table class="tabela"><thead><tr><th>Indexador</th><th>Participação</th></tr></thead><tbody>
<tr><td>Flutuante (Selic)</td><td class="num">46 %</td></tr>
<tr><td>Índice de preços (IPCA)</td><td class="num">28 %</td></tr>
<tr><td>Prefixada</td><td class="num">22 %</td></tr>
<tr><td>Câmbio</td><td class="num">4 %</td></tr>
</tbody></table>
<p class="nota">Dados ilustrativos. Prazo médio: 4,1 anos. A fatia atrelada à Selic é o motivo de a alta dos juros pesar tão rápido na dívida.</p>
<h3>Comparação internacional (dívida bruta, 2025, FMI)</h3>
<p>Brasil 78 % · México 55 % · Chile 41 % · Índia 82 % · África do Sul 76 % · EUA 121 % · Japão 250 %. O Brasil não é o mais endividado, mas paga um dos juros mais altos sobre a dívida.</p>
<h3>O que os economistas discutem</h3>
<ol><li>Se o arcabouço fiscal é suficiente para estabilizar a dívida;</li><li>O peso das despesas obrigatórias no orçamento;</li><li>Se a alta dos juros é causa ou consequência da dívida.</li></ol>
<h3>Fontes</h3>
<ul><li>SGS 13762 (DBGG) e 4513 (DLSP) — Estatísticas Fiscais do BCB</li><li>Resultado do Tesouro Nacional e Relatório Mensal da Dívida (Tesouro Transparente)</li><li>FMI, Fiscal Monitor</li></ul>`
  },
  {
    slug: 'copom-julho-2026', edicao: '2026-08', tipo: 'decisão', tema: 'juros', acesso: 'gratis',
    indicador: 'selic', indicadores: ['selic'],
    titulo: 'Copom interrompe cortes e mantém a Selic em 14,25 %',
    linhaFina: 'Depois de três reduções seguidas, o comitê pausa: inflação de serviços e mercado de trabalho aquecido pedem cautela.',
    publicadaEm: '2026-07-29', publicadaHora: '18:45', gatilho: 'Decisão do Copom das 18h30 de 29/07/2026',
    tempoLeitura: { entendimento: 2, profundidade: 4 },
    parabola: 'Quem já dirigiu na serra sabe: na descida, o freio não pode ser solto de uma vez. Solta um pouco, sente o carro, solta mais. Desde o começo do ano o Banco Central vinha soltando o freio do aluguel do dinheiro — e hoje resolveu segurar. Não porque a estrada piorou, mas porque quer ter certeza de que o carro não vai embalar.',
    entendimento: `<h3>O que aconteceu</h3><p>O <t>Copom</t> manteve a <t>Selic</t> em 14,25 % após três cortes seguidos (março, maio e junho). O comunicado citou a inflação de serviços e o mercado de trabalho aquecido.</p><h3>Por que importa</h3><p>A pausa sinaliza que a fase de cortes rápidos acabou; o crédito deve ficar caro por mais tempo do que se esperava em junho.</p>`,
    profundidadeSumario: ['O ciclo de cortes de 2026 até aqui', 'Inflação de serviços: o problema que não cede'],
    profundidade: `<h3>O ciclo de 2026</h3><p>Janeiro: 15,00 % → Março: 14,75 % → Maio: 14,50 % → Junho: 14,25 % → Julho: pausa.</p>{{grafico:selic}}<h3>Fontes</h3><ul><li>Comunicado do Copom de 29/07/2026</li><li>SGS série 432</li></ul>`
  },
  {
    slug: 'ipca-julho-2026', edicao: '2026-08', tipo: 'divulgação', tema: 'inflacao', acesso: 'assinante',
    indicador: 'ipca', indicadores: ['ipca'],
    titulo: 'IPCA de julho sobe 0,41 % com energia e combustíveis',
    linhaFina: 'Bandeira amarela e reajuste da gasolina pesam. Em 12 meses, 4,35 %.',
    publicadaEm: '2026-08-11', publicadaHora: '09:30', gatilho: 'Divulgação do IPCA pelo IBGE às 9h de 11/08/2026',
    tempoLeitura: { entendimento: 2, profundidade: 4 },
    parabola: 'Quando chove pouco, a conta de luz de Dona Cida vem com um aviso amarelo — é a usina cara que entrou no lugar da hidrelétrica. Em julho foi assim, e a gasolina também subiu. O caderno dela fechou o mês um pouco mais pesado do que em junho.',
    entendimento: `<h3>O que aconteceu</h3><p>O <t>IPCA</t> de julho foi 0,41 %, acima dos 0,26 % de junho. A energia elétrica subiu 2,1 % com a <t>bandeira tarifária</t> amarela; a gasolina, 1,8 %. Em 12 meses: 4,35 %.</p><h3>Por que importa</h3><p>Energia e combustíveis são "choques": sobem e descem por motivos que o juro não controla. O <t>Copom</t> olha mais para os <t>núcleos</t>.</p>`,
    profundidadeSumario: ['Julho por grupo', 'Choques versus núcleos'],
    profundidade: `<h3>Julho por grupo</h3><p>Habitação +1,2 % · Transportes +0,7 % · Alimentação +0,3 % · Saúde +0,4 %.</p>{{grafico:ipca}}<h3>Fontes</h3><ul><li>SIDRA 1737 e 7060</li></ul>`
  },
  {
    slug: 'copom-junho-2026', edicao: '2026-07', tipo: 'decisão', tema: 'juros', acesso: 'gratis',
    indicador: 'selic', indicadores: ['selic'],
    titulo: 'Copom corta a Selic para 14,25 %, terceira redução do ano',
    linhaFina: 'Corte de 0,25 ponto, como esperado. O comitê fala em "cautela adicional" nas próximas decisões.',
    publicadaEm: '2026-06-17', publicadaHora: '18:40', gatilho: 'Decisão do Copom das 18h30 de 17/06/2026',
    tempoLeitura: { entendimento: 2, profundidade: 4 },
    parabola: 'O aluguel do dinheiro baixou mais um pouquinho. Não é ainda um aluguel barato — está longe disso — mas é o terceiro mês em que o dono do imóvel aceita cobrar menos. Quem estava esperando para alugar começa a fazer as contas.',
    entendimento: `<h3>O que aconteceu</h3><p>O <t>Copom</t> reduziu a <t>Selic</t> de 14,50 % para 14,25 %.</p><h3>Por que importa</h3><p>Cada corte de 0,25 ponto reduz um pouco o custo de todo crédito indexado ao <t>CDI</t>, com defasagem de semanas a meses.</p>`,
    profundidadeSumario: ['O comunicado, frase a frase'],
    profundidade: `<p>Comunicado disponível em bcb.gov.br/controleinflacao.</p>{{grafico:selic}}`
  },
  {
    slug: 'pib-1tri-2026', edicao: '2026-07', tipo: 'divulgação', tema: 'atividade', acesso: 'assinante',
    indicador: 'pib', indicadores: ['pib'],
    titulo: 'PIB cresce 0,3 % no 1º trimestre com safra recorde',
    linhaFina: 'Agropecuária avança 8 %; indústria e serviços ficam estáveis.',
    publicadaEm: '2026-06-02', publicadaHora: '09:45', gatilho: 'Divulgação das Contas Nacionais Trimestrais pelo IBGE às 9h de 02/06/2026',
    tempoLeitura: { entendimento: 2, profundidade: 5 },
    parabola: 'Na cidade do padeiro e da costureira, este trimestre quem carregou o resultado foi o sítio: a colheita de soja veio grande. O resto da cidade ficou mais ou menos igual.',
    entendimento: `<h3>O que aconteceu</h3><p>O <t>PIB</t> cresceu 0,3 % no 1º trimestre de 2026 (<t>dessazonalizado</t>). A agropecuária subiu 8,0 % com a safra de soja e milho.</p><h3>Por que importa</h3><p>Crescimento puxado por safra é "de uma vez só": não se repete no trimestre seguinte.</p>`,
    profundidadeSumario: ['Setores e componentes', 'Por que a safra concentra no 1º trimestre'],
    profundidade: `{{grafico:pib}}<h3>Fontes</h3><ul><li>SIDRA 5932</li></ul>`
  }
];

CEP.edicoes = [
  {
    id: '2026-09', numero: 3, titulo: 'Setembro de 2026', status: 'em_andamento', fechadaEm: null,
    manchete: 'copom-setembro-2026',
    destaques: ['ipca-agosto-2026', 'pib-2tri-2026', 'focus-14-setembro-2026'],
    oQueMudou: [
      { indicador: 'selic', de: '14,25 %', para: '14,25 %', direcao: 'estavel', nota: 'mantida em 16/09', fonte: 'BCB' },
      { indicador: 'ipca', de: '4,35 %', para: '4,10 %', direcao: 'baixa', nota: 'em 12 meses, agosto', fonte: 'IBGE' },
      { indicador: 'pib', de: '+0,3 %', para: '+0,4 %', direcao: 'alta', nota: '2º trimestre', fonte: 'IBGE' },
      { indicador: 'cambio', de: 'R$ 5,38', para: 'R$ 5,32', direcao: 'baixa', nota: 'PTAX de 16/09', fonte: 'BCB' },
      { indicador: 'focus', de: '4,10 %', para: '4,05 %', direcao: 'baixa', nota: 'IPCA esperado para 2026', fonte: 'BCB/Focus' }
    ],
    editorial: 'Setembro é o mês em que o país olhou para os juros. O Copom parou de cortar, o mercado ainda espera um corte antes do Natal, e a inflação — devagar — continua cedendo.'
  },
  {
    id: '2026-08', numero: 2, titulo: 'Agosto de 2026', status: 'fechada', fechadaEm: '2026-08-31',
    manchete: 'pnad-julho-2026',
    destaques: ['divida-julho-2026', 'ipca-julho-2026', 'copom-julho-2026'],
    oQueMudou: [
      { indicador: 'selic', de: '14,25 %', para: '14,25 %', direcao: 'estavel', nota: 'pausa em 29/07', fonte: 'BCB' },
      { indicador: 'ipca', de: '4,50 %', para: '4,35 %', direcao: 'baixa', nota: 'em 12 meses, julho', fonte: 'IBGE' },
      { indicador: 'desemprego', de: '6,5 %', para: '6,4 %', direcao: 'baixa', nota: 'mai–jul', fonte: 'IBGE' },
      { indicador: 'divida', de: '78,5 %', para: '78,9 %', direcao: 'alta', nota: 'do PIB, julho', fonte: 'BCB' }
    ],
    editorial: 'Agosto foi o mês do emprego e da dívida: o mercado de trabalho continua forte, e a conta do governo continua subindo. Os dois fatos se conectam pelos juros.'
  },
  {
    id: '2026-07', numero: 1, titulo: 'Julho de 2026', status: 'fechada', fechadaEm: '2026-07-31',
    manchete: 'copom-junho-2026',
    destaques: ['pib-1tri-2026'],
    oQueMudou: [
      { indicador: 'selic', de: '14,50 %', para: '14,25 %', direcao: 'baixa', nota: 'corte em 17/06', fonte: 'BCB' },
      { indicador: 'pib', de: '+0,2 %', para: '+0,3 %', direcao: 'alta', nota: '1º trimestre', fonte: 'IBGE' }
    ],
    editorial: 'Primeira edição. Começamos pelo básico: o que é a Selic, por que ela caiu, e o que a safra fez pelo PIB.'
  }
];
