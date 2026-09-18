# Central Macroeconômica — protótipo web de alta fidelidade

Plataforma de inteligência macroeconômica por assinatura (R$ 19,90/mês): landing de vendas + aplicação web com 17 telas, design system e fluxos clicáveis. HTML/CSS/JS puros, sem build. **Todos os dados são ilustrativos (mock).**

## Rodar

```bash
cd plataforma && python3 -m http.server 8766   # ou: npx serve plataforma
```

## Telas (rotas por hash)

| Rota | Tela |
|---|---|
| `#/` | Landing de vendas (hero, Brasil agora, dor, transformação, diferencial, relações, recursos, público, calendário, relatório, credibilidade, transparência, preço, valor, FAQ, CTA, rodapé) |
| `#/entrar` · `#/criar-conta` | Login e criação de conta |
| `#/onboarding` | Como pretende usar + temas (2 passos) |
| `#/assinar` | Assinatura (plano único, pagamento simulado) |
| `#/app/panorama` | **Panorama da Economia** — 6 indicadores, "O que está acontecendo?", Mapa da Economia, próximas divulgações, Minha Lista |
| `#/app/cenario` | Cenário Econômico — Mapa da Economia completo e legenda dos estados semânticos |
| `#/app/inflacao` `juros` `atividade` `emprego` `credito` `cambio` `fiscal` `mercados` `expectativas` | Páginas temáticas (decomposição do IPCA, linha do tempo do Copom, curva DI, grupos da atividade, CAGED, câmbio com variações, fiscal com cartões explicativos, expectativas por ano com "há 1 mês / há 3 meses") |
| `#/app/indicadores` | Biblioteca pesquisável (40 indicadores, 9 categorias) |
| `#/app/indicador/:id` | Detalhe reutilizável: valor → o que mudou → histórico (1A/3A/5A/10A/Máx.) → como interpretar → por que importa → relacionados → fonte; abas Resumo/Histórico/Metodologia/Relacionados |
| `#/app/comparar` | Comparador (até 3 séries, normalização base 100, período, frequência — opções avançadas por revelação progressiva) |
| `#/app/lista` | Minha Lista (última leitura, variação, próxima divulgação, tendência) |
| `#/app/calendario` | Calendário Econômico (data, indicador, instituição, referência, anterior, consenso) |
| `#/app/relatorios` · `#/app/relatorio/2026-09` | Relatórios e leitura editorial (Fraunces + Source Serif 4, sumário fixo) |
| `#/app/plano` · `#/app/conta` · `#/app/configuracoes` | Assinatura com cancelamento honesto, conta, preferências e nível de detalhe |

## Refino de UX: "Complexidade por trás. Clareza na frente."

A interface segue a ordem **pergunta → resposta → número → contexto → detalhe**. Cada indicador tem seis níveis de linguagem (título humano → significado → valor → leitura → nome técnico → metodologia), definidos em `js/conteudo.js` — separados dos dados (`js/data.js`) para que a futura integração com APIs não toque no texto editorial.

- **Onboarding em 3 passos** sem termos técnicos como escolha (o que quer entender → o que quer acompanhar, com siglas só como referência → quanto detalhe quer ver).
- **Visão Geral**: "Como está a economia?", bloco "Em 1 minuto" com três coisas para acompanhar, "Brasil agora" (6 dimensões em frases), "O que mudou recentemente?", "O que isso significa?", "A história do momento" (sem causalidade simplista) e Mapa da economia.
- **Detalhe do indicador** começa pela resposta; "O que é X?" e "Ver detalhes técnicos" (metodologia, unidade, ajuste sazonal, endpoint, tabela) vêm por último.
- **Interruptor "Explicações"** no topo: ligado, linguagem simples; desligado, painel analítico compacto — uma plataforma só para iniciantes e analistas.
- **Gráficos** com título em forma de pergunta, rótulo técnico secundário e anotações de contexto ("Inflação atingiu pico", "Início do ciclo de alta"). No celular, ficam atrás de "Ver gráfico".
- **Busca** aceita linguagem humana ("preços", "desemprego", "dívida") ou técnica ("IPCA", "PNAD", "DBGG").
- **Navegação** em linguagem humana (Inflação, Juros, Economia, Emprego, Dólar, Crédito, Contas Públicas, Expectativas); o vocabulário técnico aparece dentro das páginas e em tooltips.
- Estados semânticos (Acima da meta, Restritivo, Aquecido, Atenção…) em vez de verde/vermelho.

## Fluxo principal

Landing → Criar conta → Onboarding → Panorama → indicador → Comparar → Minha Lista. Navegação lateral entre todas as seções.

## Design system (`css/`)

Tokens idênticos aos do arquivo Figma: verde institucional `#123C32`, azul analítico `#163A5F`, ouro `#D8A928`, fundo quente `#F7F6F1`; estados semânticos (Pressão, Atenção, Expansão/Aquecido, Restritivo, Estável/Neutro) em vez de verde/vermelho; Inter para UI e dados, Fraunces para títulos editoriais, Source Serif 4 para relatórios. Componentes: botões, selo de estado, cartão de indicador, rótulo de fonte, chips, seletor de período, abas, tooltip de termos (glossário), inputs, tabela, contêiner de gráfico com tabela de dados, linha do tempo, item de calendário, estados vazio/carregando/erro, aviso, plano, FAQ. Responsivo: 1440 (principal), 1024 (barra lateral reduzida, colunas empilhadas) e abaixo.

## Importar para o Figma

Com o plugin **html.to.design**, cole a URL publicada de cada rota para gerar frames editáveis com auto layout. O arquivo Figma já iniciado (Foundations + 20 componentes + hero da landing) está em https://www.figma.com/design/MF7BEkwk5I39g1BRhZDwTc.
