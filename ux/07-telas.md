# 07 · Telas

Cada tela abaixo indica como responde às quatro perguntas: **O que aconteceu? Por que importa? Qual é a fonte? Quando sai o próximo dado?**

Rotas do protótipo entre parênteses.

## 1. Onboarding (`#/onboarding`)

**O que é.** Três passos em uma tela só, com barra de progresso. Menos de um minuto.

1. *Quem é você?* — cinco cartões grandes (Pequeno negócio, Gestão de empresa, Autônomo(a), Estudante, Curioso(a)), um toque.
2. *O que quer acompanhar?* — seis chips (Juros e crédito, Inflação e preços, Emprego, Crescimento, Dólar, Contas do governo), múltipla escolha, pré-marcados conforme o perfil.
3. *Quer avisos?* — dois alertas sugeridos com data da próxima divulgação; "Ativar" ou "Agora não".

**Racional.** O perfil não esconde nada — só ordena. Não pedimos e-mail, cartão nem senha; a primeira relação com o produto é de leitura, não de cadastro. "Pular" está sempre visível. Ao final: "Sua amostra grátis está aberta" e vai para a capa.

**Quatro perguntas.** Não se aplicam (sem dados) — mas os alertas sugeridos já mostram "quando sai o próximo dado".

## 2. Capa da edição (`#/` e `#/edicao/2026-09`)

**O que é.** Primeira página de jornal.

- Cabeçalho de edição: "Edição nº 3 · Setembro de 2026 · em andamento · 6 matérias até agora".
- **Manchete**: a matéria mais importante do mês (Copom), com título, linha fina e a parábola inteira visível — o leitor lê a camada 1 sem clicar.
- **Faixa de indicadores**: os seis indicadores em cartões compactos (valor, seta, próximo), rolável horizontalmente no mobile.
- **O que mudou desde a última edição**: lista de 5 linhas, cada uma com indicador, de → para, seta com texto, fonte e data.
- **Destaques**: 3 matérias em cartões com título, linha fina, gatilho e tempo de leitura.
- **Próximos 7 dias**: 3 eventos do calendário com botão "Me avise".
- Aviso padrão no rodapé.

**Racional.** A capa é o resumo executivo do Rodrigo e a porta de entrada da Juliana ao mesmo tempo. A parábola da manchete exposta é a "amostra" mais importante do produto.

**Quatro perguntas.** Manchete (o que aconteceu) · linha fina e "o que mudou" (por que importa) · fonte em cada cartão · "próximos 7 dias" e chip em cada indicador.

## 3. Matéria (`#/materia/{slug}`)

**O que é.** A tela central do produto.

- Breadcrumb: Edição › Matéria. Gatilho: "Publicada às 18h42 de 16/09/2026, após a decisão do Copom das 18h30".
- Título (Fraunces 44 px) e linha fina.
- Cartão de dado `hero` do indicador central.
- **① A parábola** — sempre aberta, tipografia de destaque (serifa 20 px, filete lateral em `--acento`).
- **② O entendimento** — botão "Continuar para o entendimento · +2 min". Ao expandir: subtítulos "O que aconteceu", "Por que importa", "No dia a dia", "Para o negócio".
- **③ A profundidade** — "Ir mais fundo · +5 min". Assinante: abre com gráfico, tabela, metodologia, "o que os economistas discutem", fontes. Não assinante: paywall suave com sumário.
- Indicador de progresso de camada fixo no topo (mobile) ou na barra lateral (desktop).
- Barra lateral (desktop): cartão do indicador, termos do glossário citados, próximas divulgações relacionadas, "Compartilhar a parábola".
- Rodapé: termos, indicadores citados, matérias relacionadas, aviso padrão.

**Racional.** Revelação progressiva num único fluxo, na ordem fixa história → significado → técnica. O leitor que parar em qualquer ponto sai com algo verdadeiro. "Mostrar tudo" atende quem já conhece o formato.

**Quatro perguntas.** Título e parábola · entendimento · cartão hero (fonte, publicação) · chip "próximo".

## 4. Painel de indicadores (`#/painel`)

**O que é.** Grade de seis cartões de dado (Selic, IPCA, Câmbio, PIB, Desemprego, Dívida/PIB), mais uma linha "Expectativas (Focus)" com IPCA e Selic esperados para o fim do ano. Botão "Copiar resumo" gera um texto com valor, período, fonte e próxima divulgação de todos. Filtro por tema. Ordenação padrão: pelos interesses do perfil.

**Racional.** O painel é grátis: mostra o "termômetro" do país sem custo. O detalhe (série, profundidade) é de assinante. É a tela do Rodrigo na véspera da reunião.

**Quatro perguntas.** Cada cartão responde às quatro; "por que importa" via a parábola de uma frase abaixo do valor.

## 5. Detalhe do indicador (`#/indicador/{id}`)

**O que é.**
- Cartão `hero` com valor, tendência, período, selo de frescor, fonte, próximo.
- Parábola do indicador (a curta, de uma frase, expandida para 3–5 frases).
- Gráfico da série com seletor de período e faixa de meta (quando houver), botão "Ver tabela", "Abrir na fonte" (link para SGS/SIDRA), "Copiar dados".
- "O que significa" (entendimento genérico do indicador, não do mês).
- "Como é calculado" (metodologia, frequência, período de referência, revisões, o identificador da série na fonte).
- Matérias que citaram este indicador (cronológico).
- "Me avise na próxima divulgação".
- Aviso padrão.

**Racional.** É a página de referência — a que o Gabriel salva nos favoritos. Diferente da matéria, não fala de um mês: fala do indicador.

**Quatro perguntas.** Valor atual · "o que significa" · fonte com link e identificador · chip próximo.

## 6. Calendário de lançamentos (`#/calendario`)

**O que é.** Lista cronológica de eventos oficiais, hoje em destaque. Filtros: instituição (BCB, IBGE, Tesouro, MTE), tema, "próximos 7 dias / 30 dias / mês". Cada item: data grande, hora, instituição, indicador, período de referência, status (previsto/divulgado/aguardando), o último valor, o que o Focus espera (quando houver) e "Me avise". Eventos divulgados linkam à matéria. Rodapé: "Calendários oficiais: BCB · IBGE · Tesouro · MTE" com links.

**Racional.** A espinha dorsal do produto e o principal gancho de retorno. A Márcia planeja a semana por aqui.

**Quatro perguntas.** Eventos divulgados: valor · link à matéria · instituição · próximo. Eventos previstos: "o que se espera" · instituição · data e hora.

## 7. Arquivo de edições (`#/arquivo`)

**O que é.** Lista de edições, mais recente primeiro: número, mês, status, manchete, número de matérias, "o que mudou" em uma linha. Busca por indicador ou termo. Edições fechadas mostram "fechada em dd/mm/aaaa". Ao abrir uma edição antiga, o cabeçalho avisa: "Você está lendo a edição de julho de 2026. Os dados podem ter sido revisados. Ver valores atuais."

**Racional.** Mostra a continuidade e permite comparar o que se dizia com o que aconteceu. "Você acompanha desde setembro/2026" reforça pertencimento.

## 8. Planos e assinatura (`#/planos`)

**O que é.**
- Duas colunas lado a lado: **Amostra grátis** (o que já dá: capa, painel, parábola e entendimento de todas as matérias, uma matéria completa por edição, calendário e alertas) e **Assinatura mensal — R$ 19,90** (tudo da amostra + profundidade de todas as matérias, séries históricas e tabelas, arquivo completo, "copiar resumo"). Plano estudante R$ 9,90 com e-mail institucional.
- Frase fixa: "Cancele quando quiser, em dois toques, e mantenha o acesso até o fim do período pago."
- Perguntas frequentes curtas: renovação automática, Pix/cartão, nota fiscal, o que acontece ao cancelar.
- Aviso padrão (CVM).
- Fluxo de assinatura simulado: e-mail → pagamento (simulado) → confirmação com data da próxima cobrança.

**Racional.** Comparação honesta: dizemos claramente o que é grátis para o leitor não descobrir o paywall por acidente.

## 9. Conta e cancelamento (`#/conta`)

**O que é.** Perfil, interesses, alertas (lista com interruptores, canal, horário silencioso), assinatura (status, próxima cobrança, botão "Cancelar assinatura" visível). Cancelamento: uma tela com a data de término, motivo opcional (4 opções + pular) e "Confirmar cancelamento", com o botão "Voltar" de mesma hierarquia. Confirmação na tela.

**Racional.** Sem dark patterns. O caminho para cancelar tem o mesmo número de toques que o caminho para assinar.

## 10. Glossário (`#/glossario`)

**O que é.** Lista alfabética; cada termo com parábola (serifa) e definição (sans), link para o indicador quando houver. Busca. A mesma fonte alimenta os tooltips/gavetas em todo o produto.

## 11. Sobre (`#/sobre`)

**O que é.** Método editorial (as três camadas), política de fontes (só oficiais, com link), política de correções e revisões, o aviso completo sobre não ser recomendação de investimento, quem faz.

## Elementos globais

- **Faixa "Dados ilustrativos"** fixa no topo (só no protótipo).
- **Navegação inferior** (mobile): Edição · Indicadores · Calendário · Arquivo · Menu.
- **Cabeçalho** (desktop): marca, navegação, tema, Assinar/Conta.
- **Gaveta do glossário** disponível em qualquer tela.
- **Aviso padrão** no rodapé de toda tela com dado.
