# 06 · Design system

Nome interno do sistema: **Tipografia de Feira** — editorial como um jornal, claro como uma tabela de preços.

## Tipografia

| Papel | Fonte | Peso | Tamanho (mobile / desktop) | Uso |
|---|---|---|---|---|
| Manchete | **Fraunces** (serifa com eixo óptico) | 600 | 32 / 44 px | Manchete da capa, título da matéria |
| Título de seção | Fraunces | 600 | 24 / 28 px | Camadas ("A parábola"), títulos de tela |
| Corpo editorial | **Source Serif 4** | 400 | 18 / 19 px, entrelinha 1,6 | Parábola, entendimento, profundidade |
| Interface | **Inter** | 400 / 500 / 600 | 16 px base | Navegação, botões, rótulos, cartões |
| Dados | Inter com `font-variant-numeric: tabular-nums` | 600 | 28 / 36 px (valor principal) | Valores nos cartões e gráficos |
| Microcopy | Inter | 400 | 13–14 px | Fonte, período, selo de frescor |

Fallbacks: `Georgia, "Times New Roman", serif` para serifas; `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` para Inter.

Regras:
- Corpo editorial nunca abaixo de 18 px; interface nunca abaixo de 13 px.
- Largura máxima de coluna de leitura: 68 caracteres (≈ 640 px).
- Números sempre tabulares (alinham em colunas) e com formatação brasileira (`1.234,56`, `14,25 %`).
- Fraunces em `font-optical-sizing: auto` para ganhar contraste em tamanhos grandes.

## Cores (tokens)

Princípio: **papel e tinta**. O fundo lembra papel-jornal; a tinta é quase preta; uma única cor de destaque (vermelho-anil) para ações; cores semânticas para alta/baixa **sempre acompanhadas de seta e texto**.

### Modo claro

| Token | Valor | Uso |
|---|---|---|
| `--papel` | `#F7F4EE` | Fundo da página |
| `--papel-2` | `#EFEAE1` | Cartões, faixas |
| `--papel-3` | `#E4DDD0` | Bordas, divisores |
| `--tinta` | `#1A1917` | Texto principal (contraste 15:1) |
| `--tinta-2` | `#4A4742` | Texto secundário (8:1) |
| `--tinta-3` | `#77726A` | Microcopy, fonte (4,6:1) |
| `--acento` | `#8C2F1E` | Links, botões primários, marca (6,4:1 sobre papel) |
| `--acento-hover` | `#6E2416` | |
| `--acento-suave` | `#F3DED8` | Fundo de chips, destaque de camada |
| `--alta` | `#9A3F00` | Tendência de alta (usada com ↑) — tom queimado, não "vermelho de erro" |
| `--baixa` | `#1F5A3C` | Tendência de baixa (usada com ↓) |
| `--estavel` | `#4A4742` | Tendência estável (usada com →) |
| `--novo` | `#1F4E79` | Selo "Novo" |
| `--aviso` | `#7A5A00` | Fundo/texto do aviso "Dados ilustrativos" (sobre `#FFF3C4`) |
| `--foco` | `#1F4E79` | Anel de foco de teclado, 3 px |

### Modo escuro

| Token | Valor |
|---|---|
| `--papel` | `#161513` |
| `--papel-2` | `#201F1C` |
| `--papel-3` | `#2E2C28` |
| `--tinta` | `#EDE8DF` |
| `--tinta-2` | `#BDB6AA` |
| `--tinta-3` | `#8E877B` |
| `--acento` | `#E8836D` |
| `--acento-hover` | `#F09A87` |
| `--acento-suave` | `#3A221C` |
| `--alta` | `#F0A060` |
| `--baixa` | `#7CC99B` |
| `--estavel` | `#BDB6AA` |
| `--novo` | `#7FB3E0` |
| `--aviso` | `#F5D67A` (sobre `#3A3010`) |
| `--foco` | `#7FB3E0` |

Nota semântica: **alta não é "ruim" nem baixa é "boa"**. Inflação subindo é alta (laranja-queimado); PIB subindo também é alta (mesma cor). A cor marca direção, não juízo. O juízo fica no texto.

### Gráficos
Paleta sequencial de uma tonalidade (série principal em `--tinta`, comparação em `--acento`, faixa de meta em `--acento-suave` com hachura). Máximo de 3 séries por gráfico. Linhas de grade em `--papel-3`. Ponto atual sempre destacado com rótulo textual.

## Espaçamento e grade

Escala de 4 px: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`. Raio de borda: `6 px` (chips, botões) e `10 px` (cartões). Grade: coluna única até 720 px; 8 colunas de 720 a 1080; 12 colunas acima, com coluna de leitura central de 640 px e barra lateral de 320 px em Matéria e Indicador.

Breakpoints: `sm 480 · md 720 · lg 1080 · xl 1360`.

## Componentes

### 1. Cartão de dado (`data-card`)
Obrigatório em qualquer lugar em que um número apareça.

```
┌─────────────────────────────────────────┐
│ SELIC (META)              [Novo] [Ilust.]│  ← nome (Inter 13 caps) + selos
│ 14,25 % a.a.        → estável           │  ← valor (Inter 600 28px) + tendência com seta e texto
│ Reunião de 16/09/2026                   │  ← período de referência
│ ─────────────────────────────────────── │
│ Fonte: BCB · Copom  ↗                   │  ← fonte com link
│ Publicado 16/09/2026 · Próximo 04/11    │  ← frescor + chip próximo lançamento
└─────────────────────────────────────────┘
```
Variantes: `compacto` (painel, sem período longo), `hero` (topo do indicador, valor a 44 px), `inline` (dentro do texto da matéria).

Estados: `novo` (≤ 48 h), `atual`, `aguardando` (a divulgação é hoje e ainda não saiu), `ilustrativo` (sempre presente no protótipo).

### 2. Selo de frescor (`freshness-badge`)
`Novo` (azul) · `Atual` (neutro) · `Aguardando hoje 9h` (aviso) · `Revisado` (neutro, com tooltip explicando a revisão). Sempre texto, nunca só ponto colorido.

### 3. Chip "Próximo lançamento" (`next-release-chip`)
`📅 Próximo: 09/10, 9h · IBGE` + ação `Me avise` (vira `Aviso ativo ✓`). Em todo cartão de dado e no topo de cada indicador. Se a divulgação é hoje: `Hoje, 9h`. Se atrasou: `Aguardando IBGE`.

### 4. Alternador de camadas (`layer-toggle`)
Não é um tab. É uma sequência vertical de três seções; cada uma tem cabeçalho fixo com número, nome e tempo estimado:

```
①  A parábola                      lendo
②  O entendimento          +2 min  ▸ Continuar
③  A profundidade          +5 min  🔒 Assinantes  (ou ▸ Ir mais fundo)
```
Comportamento: ao tocar em "Continuar", a seção expande com animação de 200 ms (respeita `prefers-reduced-motion`) e a rolagem segue. Um mini-indicador de progresso (três pontos) fica no topo em mobile e mostra em que camada o leitor está. "Mostrar tudo" abre todas. A preferência ("sempre mostrar tudo") é salva.

### 5. Tooltip / gaveta de glossário (`term`)
Termo com sublinhado pontilhado em `--acento`. Desktop: tooltip ao passar o mouse/foco, com parábola (serifa) + definição (sans) + link "Ver no glossário". Mobile: gaveta inferior (bottom sheet) com o mesmo conteúdo. Acessível: `role="button"`, `aria-describedby`, fecha com Esc.

### 6. Gráfico (`chart`)
SVG responsivo. Sempre acompanhado de: título (o que mede), subtítulo (unidade e transformação), eixo com rótulos em formato brasileiro, ponto atual rotulado, faixa de meta quando aplicável, fonte no rodapé e um botão "Ver tabela" que revela a tabela de dados equivalente (`<table>` real). Seletor de período: `1 ano · 5 anos · 10 anos · máx.`. `aria-label` descritivo e `<desc>` com resumo textual ("A Selic subiu de 10,50 % em mai/2024 para 14,25 % em mar/2025 e permanece estável desde então").

### 7. Aviso (`disclaimer`)
Caixa discreta, fundo `--papel-2`, borda esquerda em `--acento`, ícone de balão de conversa:
> **Informação, não recomendação.** Explicamos o que aconteceu e o que costuma significar. O que fazer com isso é decisão sua. Não somos consultores registrados na CVM.

Aparece: rodapé de toda matéria, indicador e painel; tela de planos; e-mails de alerta.

### 8. Aviso "Dados ilustrativos" (`sample-banner`)
Faixa amarela fixa no topo do protótipo: *"Protótipo com dados ilustrativos — os valores não são reais. Fontes e endpoints indicados são os oficiais."* Não pode ser fechada no protótipo.

### 9. Paywall suave (`paywall`)
Nunca esconde o que já foi lido. Aparece no lugar da camada 3 com: um resumo em 3 bullets do que a profundidade contém ("Gráfico de 10 anos da Selic", "Juro real e comparação com 12 países", "O que os economistas discutem"), o preço, "cancele quando quiser" e o botão. Sem contagem regressiva, sem escurecer a tela.

### 10. Botões
Primário (`--acento`, texto `--papel`), secundário (borda `--tinta-2`), terciário (texto). Altura mínima 44 px. Rótulos com verbo: "Assinar por R$ 19,90/mês", "Me avise", "Ver tabela", "Confirmar cancelamento". O botão de cancelar tem a **mesma** hierarquia visual do botão de assinar.

### 11. Cabeçalho de edição (`edition-masthead`)
Marca, número e mês da edição, status ("em andamento · 6 matérias" / "fechada em 30/09/2026"), data de hoje. Estilo de cabeçalho de jornal, com filete duplo.

### 12. Item de calendário (`calendar-item`)
Data grande à esquerda (dia + mês abreviado), instituição, título, hora, status, "o que o Focus espera" (quando houver) e o botão "Me avise". Hoje tem fundo `--acento-suave`.

### 13. Cartão de plano (`plan-card`)
Preço em destaque, lista do que inclui, lista do que a amostra grátis já inclui (ao lado, para comparação honesta), frase de cancelamento, botão.

## Acessibilidade (WCAG 2.1 AA)

- Contraste de texto ≥ 4,5:1; texto grande e ícones ≥ 3:1. Todos os tokens acima foram calculados para isso.
- **Nenhum significado só por cor**: tendências têm seta (↑ ↓ →) e palavra (alta, baixa, estável); selos têm texto; gráficos têm rótulos e tabela.
- Foco visível de 3 px (`--foco`) em todo elemento interativo; ordem de tabulação lógica.
- Alvos de toque ≥ 44 × 44 px.
- Gráficos: `role="img"` com `aria-label` + `<desc>`; tabela equivalente sempre disponível.
- Camadas: `aria-expanded` nos botões; a seção expandida recebe foco.
- Gaveta do glossário: `role="dialog"`, foco preso, Esc fecha, retorna o foco ao termo.
- `prefers-reduced-motion`: sem animações de expansão.
- `prefers-color-scheme` respeitado; alternância manual salva.
- Texto redimensionável até 200 % sem quebra de layout.
- Idioma declarado (`lang="pt-BR"`); datas em formato legível por leitor de tela (`<time datetime="2026-09-16">16/09/2026</time>`).
- Nada pisca, nada rola automaticamente.

## Microcopy padrão

| Situação | Texto |
|---|---|
| Estado vazio de alertas | "Você ainda não tem avisos. Escolha um indicador no calendário e toque em *Me avise*." |
| Estado vazio de arquivo | "A primeira edição fechou em julho de 2026. Novas edições aparecem aqui todo mês." |
| Dado aguardando | "O IBGE divulga hoje às 9h. Atualizamos em até 30 minutos." |
| Dado atrasado | "O IBGE ainda não publicou o IPCA de setembro. Avisaremos assim que sair." |
| Erro de rede | "Não conseguimos atualizar agora. Os dados abaixo são de 16/09/2026." |
| Confirmação de alerta | "Pronto. Avisaremos em 09/10, às 9h." |
| Confirmação de assinatura | "Pronto. Sua próxima cobrança é em 17/10/2026. Cancele quando quiser em *Conta*." |
| Confirmação de cancelamento | "Cancelado. Você tem acesso completo até 17/10/2026. Enviamos um e-mail de confirmação." |
