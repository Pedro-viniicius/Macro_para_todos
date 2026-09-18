# Macro para todos

Dois protótipos de UX no mesmo repositório:

| Pasta | Produto | Publicado |
|---|---|---|
| `prototipo/` | **Como Está o País** — revista mensal de macroeconomia em três camadas (parábola, entendimento, profundidade) | https://macro-para-todos.vercel.app |
| `plataforma/` | **Central Macroeconômica** — plataforma SaaS de inteligência macroeconômica (landing de vendas + app com 17 telas), ver `plataforma/README.md` | https://central-macroeconomica.vercel.app |

---

# Como Está o País — revista mensal de macroeconomia brasileira

Protótipo clicável e documentação de UX de uma revista digital por assinatura mensal que publica no **calendário oficial** (BCB, IBGE, Tesouro Nacional, IPEA, MTE) e explica cada dado em **três camadas**: a parábola, o entendimento e a profundidade.

> **Todos os números do protótipo são ilustrativos.** Não representam dados reais. As fontes, os identificadores de série e os endpoints citados são os oficiais. A faixa amarela no topo do protótipo lembra isso em toda tela.

## Como rodar

Não há build nem dependências. É HTML, CSS e JavaScript puros.

```bash
# opção 1: qualquer servidor estático
cd prototipo
python3 -m http.server 8765
# abra http://localhost:8765

# opção 2: npx
npx serve prototipo
```

Também funciona abrindo `prototipo/index.html` direto no navegador (roteamento por hash, sem chamadas de rede além das fontes do Google Fonts).

### Rotas do protótipo

| Rota | Tela |
|---|---|
| `#/onboarding` | Perfil, interesses e avisos (< 1 min) |
| `#/` e `#/edicao/2026-09` | Capa da edição |
| `#/materia/copom-setembro-2026` | Matéria com as três camadas (esta é a grátis da edição) |
| `#/painel` | Painel de indicadores |
| `#/indicador/selic` | Detalhe do indicador (série, parábola, técnica, fonte) |
| `#/calendario` | Calendário de lançamentos com "Me avise" |
| `#/arquivo` | Arquivo de edições |
| `#/glossario` | Glossário (parábola + definição por termo) |
| `#/planos` | Planos, amostra grátis, assinatura simulada |
| `#/conta` | Conta, avisos, cancelamento |
| `#/sobre` | Método editorial e aviso completo |

Na tela **Conta** há o botão *Reiniciar o protótipo* (limpa o estado guardado no navegador: perfil, avisos, assinatura).

## Por que HTML/CSS/JS puros

O repositório estava vazio. Para um protótipo de UX, o valor está no conteúdo, nos fluxos e no design system — não na arquitetura de front-end. Sem build, qualquer pessoa abre e avalia em segundos; o design system já está em tokens CSS e componentes isolados, então migrar para React/Next.js depois é direto.

## Estrutura

```
ux/                         Documentação de UX (pt-BR)
  01-visao-e-principios.md
  02-personas-e-jornadas.md
  03-arquitetura-da-informacao.md   (inclui endpoints reais de SGS, Olinda, SIDRA, IPEADATA, Tesouro)
  04-fluxos.md                      (Mermaid)
  05-guia-editorial.md              (5 parábolas completas + glossário)
  06-design-system.md
  07-telas.md
prototipo/
  index.html
  css/   tokens.css (claro/escuro) · base.css · components.css
  js/    app.js (roteador, estado, tema, gaveta do glossário) · components.js (cartão de dado, gráfico SVG, termos, aviso, paywall)
  js/screens/   onboarding · capa · materia · painel · indicador · calendario · arquivo (+ glossário) · planos (+ conta, sobre)
  data/  indicadores.js · edicoes.js · calendario.js · glossario.js   ← DADOS ILUSTRATIVOS
```

## O que é dado ilustrativo

Tudo em `prototipo/data/`:

- **Valores atuais e séries** dos seis indicadores (Selic, IPCA, dólar, PIB, desocupação, dívida/PIB). As séries trimestrais aproximam a história pública até 2025 e são ficção de protótipo de 2026 em diante.
- **Boletim Focus**, CAGED e Resultado do Tesouro.
- **Valores "último" e "esperado"** no calendário.
- **As matérias** (três edições, dez matérias) — conteúdo editorial de exemplo, escrito segundo o guia editorial.

O que **não** é ilustrativo: nomes das instituições, sistemas, identificadores de série (ex.: SGS 432, SIDRA 1737), URLs de endpoints e o padrão de datas dos calendários oficiais.

## Nome do produto — três opções

1. **Como Está o País** (usado no protótipo) — é a pergunta que todo leitor faz antes de decidir qualquer coisa; direto, coloquial, sem jargão.
2. **Boletim Parábola** — carrega o princípio editorial no nome e evoca o formato periódico.
3. **A Feira** — a metáfora central da economia cotidiana (preços, troco, negociação); curto e fácil de virar marca.

## Perguntas em aberto

1. **Preço.** R$ 19,90/mês e R$ 9,90 (estudante) são hipóteses. Testar disposição a pagar por persona.
2. **O que é grátis.** Hoje: capa, painel, parábola + entendimento de tudo, uma matéria completa por edição, calendário e avisos. É generoso de propósito; medir conversão na camada 3.
3. **Verificação de estudante.** E-mail institucional basta? Ou integrar com um serviço de verificação?
4. **Camada 2 grátis ou paga?** A decisão atual (grátis) maximiza compartilhamento; pode reduzir conversão.
5. **Frequência de e-mail.** Além dos avisos por dado, um resumo semanal (segunda, após o Focus)?
6. **Revisões de dados.** Como mostrar na interface que o IBGE revisou um trimestre do PIB sem confundir? (Proposta: selo "Revisado" com tooltip e nota na matéria.)
7. **Aviso CVM.** Validar o texto do disclaimer com assessoria jurídica; verificar se o modelo de negócio exige algum registro.
8. **Acessibilidade dos gráficos.** A tabela equivalente resolve leitores de tela; testar com usuários reais.

## Próximos passos sugeridos

1. **Integração real com as APIs** — um coletor (Node ou Python) que consulta SGS, Olinda, SIDRA e Tesouro Transparente, valida período/publicação e grava um JSON versionado. Endpoints já documentados em `ux/03-arquitetura-da-informacao.md`. CAGED não tem API estável: download mensal agendado.
2. **Motor de calendário** — importar os calendários anuais (Copom, IBGE, Tesouro) e marcar automaticamente `previsto → divulgado → atrasado`.
3. **Notificações** — Web Push + e-mail transacional; horário silencioso; nunca misturar promoção com aviso de dado.
4. **Fluxo editorial** — CMS leve com os três campos por matéria (parábola, entendimento, profundidade), checklist do guia editorial (tamanho da parábola, presença de fonte, ausência de termos proibidos) e revisão por economista antes de publicar.
5. **Pagamento** — assinatura recorrente com Pix automático e cartão; cancelamento self-service em uma tela, como no protótipo.
6. **Migração de stack** — se o produto avançar, Next.js com os mesmos tokens e componentes; o conteúdo já está modelado (edição → matéria → indicador → série → fonte).
7. **Analítica de camadas** — medir em que camada cada leitor para; é a métrica central do produto.
8. **Testes de usabilidade** — 5 sessões por persona com as tarefas das jornadas de `ux/02-personas-e-jornadas.md`.
