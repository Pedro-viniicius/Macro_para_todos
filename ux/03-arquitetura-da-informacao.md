# 03 · Arquitetura da informação

## Mapa do site

```
/                         Capa da edição corrente
/edicao/2026-09           Capa de uma edição específica
/materia/{slug}           Matéria (3 camadas)
/painel                   Painel de indicadores
/indicador/{id}           Detalhe do indicador (série, parábola, técnica, fonte)
/calendario               Calendário de lançamentos + alertas
/arquivo                  Arquivo de edições
/glossario                Glossário completo (também acessível por tooltip/gaveta em qualquer termo)
/onboarding               Perfil e interesses (< 1 min)
/planos                   Planos, amostra grátis, assinatura
/conta                    Conta, alertas, assinatura, cancelamento
/sobre                    Quem faz, método editorial, política de fontes, aviso CVM
```

## Navegação

**Mobile (barra inferior, 4 itens + menu):**
`Edição` · `Indicadores` · `Calendário` · `Arquivo` · `≡` (Glossário, Planos, Conta, Sobre)

**Desktop (cabeçalho):**
Marca à esquerda · `Edição` `Indicadores` `Calendário` `Arquivo` `Glossário` · à direita: alternância de tema, `Assinar` / avatar.

**Cabeçalho de edição (abaixo da navegação, só em Capa e Matéria):**
`Edição nº 3 · Setembro de 2026 · fechada em 30/09/2026` ou `em andamento · 6 matérias até agora`.

Regras:
- Sempre há um caminho de volta: breadcrumb em desktop (`Edição › Matéria`), "Voltar" em mobile.
- O leitor nunca cai numa tela sem saber em que edição está.
- A matéria linka os indicadores que cita; o indicador linka as matérias que o citaram (relação bidirecional).

## Modelo de conteúdo

```
Edição ──< Matéria ──< Indicador ──< Série ──── Fonte
   │          │           │
   │          │           └── Glossário (termos)
   │          └── Autor(es), data, camadas (parábola, entendimento, profundidade)
   └── Manchete, destaques, "o que mudou", status (em andamento | fechada)
```

### Edição
| Campo | Tipo | Exemplo |
|---|---|---|
| id | `AAAA-MM` | `2026-09` |
| numero | inteiro | 3 |
| titulo | texto | "Setembro de 2026" |
| status | `em_andamento` \| `fechada` | `em_andamento` |
| manchete | referência a Matéria | `copom-setembro-2026` |
| destaques | lista de Matéria (2–4) | |
| oQueMudou | lista de {indicador, de, para, direcao, fonte} | |
| fechadaEm | data | 30/09/2026 |

### Matéria
| Campo | Tipo | Observação |
|---|---|---|
| slug | texto | `copom-setembro-2026` |
| edicao | ref | |
| gatilho | ref a evento do Calendário | a divulgação que originou a matéria |
| titulo, linhaFina | texto | manchete e subtítulo |
| parabola | texto (3–5 frases) | camada 1 |
| entendimento | markdown | camada 2 |
| profundidade | markdown + gráficos | camada 3 |
| indicadores | lista de ref | citados no texto |
| termos | lista de ref ao Glossário | |
| publicadaEm, atualizadaEm | data-hora | |
| acesso | `gratis` \| `assinante` | uma matéria por edição é sempre `gratis` |

### Indicador
| Campo | Tipo | Exemplo |
|---|---|---|
| id | texto | `selic` |
| nome | texto | "Selic (meta)" |
| unidade | texto | `% a.a.` |
| valorAtual | número | 14,25 |
| periodoReferencia | texto | "Reunião de 16/09/2026" |
| publicadoEm | data | 16/09/2026 |
| proximaDivulgacao | data + hora | 04/11/2026 18:30 |
| frequencia | texto | "A cada 45 dias (8 reuniões/ano)" |
| tendencia | `alta` \| `baixa` \| `estavel` | comparação com o dado anterior |
| parabola, definicaoTecnica | texto | camadas resumidas |
| serie | ref | |
| fonte | ref | |
| ilustrativo | booleano | **true** em todo o protótipo |

### Série
| Campo | Tipo |
|---|---|
| indicador | ref |
| pontos | lista de {periodo, valor} |
| transformacao | `nivel` \| `var_mensal` \| `var_12m` \| `acumulado_ano` |
| dessazonalizada | booleano |

### Fonte
| Campo | Exemplo |
|---|---|
| instituicao | Banco Central do Brasil |
| sistema | SGS |
| identificador | Série 432 |
| url | https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json |
| urlHumana | https://www3.bcb.gov.br/sgspub/ |
| metodologiaUrl | link para nota metodológica |
| licenca | Dados abertos |

### Evento do calendário
| Campo | Exemplo |
|---|---|
| id | `ipca-2026-09` |
| indicador | `ipca` |
| titulo | "IPCA — setembro/2026" |
| instituicao | IBGE |
| dataHora | 09/10/2026 09:00 |
| periodoReferencia | setembro/2026 |
| status | `previsto` \| `divulgado` \| `atrasado` |
| materia | ref (quando divulgado) |
| alertaAtivo | booleano (por usuário) |

### Termo do glossário
| Campo | Exemplo |
|---|---|
| termo | "Selic" |
| parabola | "É o aluguel-base do dinheiro no país: quando sobe, pegar emprestado fica mais caro para todo mundo." |
| definicao | "Taxa básica de juros definida pelo Copom a cada 45 dias; referência para as demais taxas da economia." |
| indicador | `selic` (opcional) |
| relacionados | ["Copom", "juros reais"] |

## Fontes de dados e endpoints

Endpoints públicos documentados pelas instituições (verificados na documentação oficial; no protótipo todos os valores são **ilustrativos** e não vêm de chamadas reais).

| Indicador | Instituição | Sistema | Identificador | Endpoint |
|---|---|---|---|---|
| Selic (meta) | BCB | SGS | série 432 | `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=dd/mm/aaaa&dataFinal=dd/mm/aaaa` |
| Selic efetiva (diária) | BCB | SGS | série 11 | `bcdata.sgs.11` |
| Câmbio PTAX venda (USD) | BCB | SGS | série 1 | `bcdata.sgs.1` |
| IPCA (var. mensal) | IBGE via BCB | SGS | série 433 | `bcdata.sgs.433` |
| IPCA (tabela completa) | IBGE | SIDRA | tabela 1737 | `https://apisidra.ibge.gov.br/values/t/1737/n1/all/v/63,2265/p/last%2013` |
| IPCA (grupos) | IBGE | SIDRA | tabela 7060 | `https://apisidra.ibge.gov.br/values/t/7060/...` |
| PIB trimestral (var.) | IBGE | SIDRA | tabela 5932 | `https://apisidra.ibge.gov.br/values/t/5932/n1/all/v/6564/p/last%2012/c11255/90707` |
| Taxa de desocupação | IBGE | SIDRA | tabela 6381 (PNAD Contínua) | `https://apisidra.ibge.gov.br/values/t/6381/n1/all/v/4099/p/last%2012` |
| Expectativas (Focus) | BCB | Olinda | ExpectativasMercadoAnuais | `https://olinda.bcb.gov.br/olinda/servico/Expectativas/versao/v1/odata/ExpectativasMercadoAnuais?$filter=Indicador%20eq%20'IPCA'&$orderby=Data%20desc&$top=10&$format=json` |
| Dívida bruta do governo geral (% PIB) | BCB | SGS | série 13762 | `bcdata.sgs.13762` |
| Resultado primário do Governo Central | Tesouro | Tesouro Transparente | Resultado do Tesouro Nacional (RTN) | `https://www.tesourotransparente.gov.br/ckan/api/3/action/package_show?id=resultado-do-tesouro-nacional` |
| Dívida pública federal | Tesouro | Tesouro Transparente | Relatório Mensal da Dívida | `https://www.tesourotransparente.gov.br/ckan/...` |
| Saldo de empregos formais | MTE | Novo CAGED | painel PDET | `https://pdet.mte.gov.br/novo-caged` (sem API estável; download mensal) |
| Séries históricas diversas | IPEA | IPEADATA | ex.: `PAN12_IPCAG12` | `http://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PAN12_IPCAG12')` |

### Calendários oficiais
- Copom: calendário anual publicado pelo BCB (8 reuniões/ano; decisão na quarta-feira às 18h30; ata na terça seguinte às 8h).
- IBGE: calendário de divulgações anual (IPCA por volta do dia 10, às 9h; PNAD Contínua mensal no fim do mês; PIB trimestral ~60 dias após o fim do trimestre).
- Focus: toda segunda-feira, 8h25.
- Tesouro: RTN até o último dia útil do mês seguinte; dívida pública por volta do dia 25.
- CAGED: última semana do mês seguinte.

## Taxonomia

### Temas (eixo principal)
`juros` · `inflação` · `atividade` · `emprego` · `câmbio` · `contas públicas` · `expectativas`

### Instituições
`BCB` · `IBGE` · `Tesouro Nacional` · `IPEA` · `MTE` · `Copom`

### Tipo de matéria
`decisão` (Copom) · `divulgação` (IPCA, PIB, PNAD, CAGED, RTN) · `expectativa` (Focus) · `ata/relatório` (ata do Copom, RTI) · `síntese` (capa mensal)

### Nível de acesso
`grátis` · `assinante`

### Perfis (onboarding)
`Pequeno negócio` · `Gestão de empresa` · `Autônomo(a)` · `Estudante` · `Curioso(a)`

### Interesses (onboarding, multi)
`Juros e crédito` · `Inflação e preços` · `Emprego` · `Crescimento (PIB)` · `Dólar e câmbio` · `Contas do governo`

O perfil e os interesses **não escondem conteúdo**; apenas ordenam os destaques da capa e sugerem alertas iniciais.
