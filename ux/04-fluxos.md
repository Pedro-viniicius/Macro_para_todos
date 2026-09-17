# 04 · Fluxos

Diagramas em Mermaid. Cada fluxo indica o ponto em que o leitor pode parar e ainda sair com algo útil.

## 1. Onboarding (menos de 1 minuto)

```mermaid
flowchart TD
    A[Chegada: link, busca ou indicação] --> B{Já tem conta?}
    B -- Sim --> Z[Capa da edição]
    B -- Não --> C[Tela 1: 'Quem é você?'<br/>5 perfis, um toque]
    C --> D[Tela 2: 'O que quer acompanhar?'<br/>6 interesses, multi]
    D --> E[Tela 3: 'Quer avisos?'<br/>sugerimos 2 alertas com base nos interesses]
    E -- Ativar --> F[Pedir permissão de notificação<br/>ou e-mail]
    E -- Agora não --> G
    F --> G[Pronto: 'Sua amostra grátis está aberta']
    G --> Z
    C -. Pular .-> Z
    D -. Pular .-> Z
```

Regras: nenhuma etapa pede cartão, CPF ou senha. E-mail só é pedido quando o leitor ativa um alerta ou assina. "Pular" sempre visível.

## 2. Ler uma matéria (três camadas)

```mermaid
flowchart TD
    A[Abre a matéria] --> B[Cabeçalho: título, linha fina,<br/>edição, data, gatilho da divulgação]
    B --> C[Cartão do indicador central:<br/>valor · período · fonte · publicado · próximo]
    C --> D[Camada 1 · A parábola<br/>sempre visível, 3–5 frases]
    D --> E{Leitor continua?}
    E -- Para aqui --> P1([Sai sabendo o mecanismo])
    E -- 'Continuar para o entendimento' --> F[Camada 2 · O entendimento<br/>expande no mesmo fluxo]
    F --> G{Leitor continua?}
    G -- Para aqui --> P2([Sai sabendo o que aconteceu<br/>e por que importa])
    G -- 'Ir mais fundo' --> H{Assinante?}
    H -- Sim --> I[Camada 3 · A profundidade<br/>gráfico, série, metodologia, fonte]
    H -- Não --> J[Paywall suave: mostra o sumário<br/>da profundidade + botão Assinar]
    I --> K[Rodapé: termos do glossário,<br/>indicadores citados, próxima divulgação, aviso]
    K --> P3([Sai com dado, contexto e fonte])
    J --> L[Planos]
```

Comportamentos:
- O botão de cada camada mostra o tempo estimado ("+2 min", "+5 min").
- Ao expandir, a rolagem continua naturalmente; o título da camada fica fixo no topo enquanto ela é lida (indicador de posição).
- Um controle "Mostrar tudo" no cabeçalho abre as três camadas de uma vez (para quem já conhece o formato).
- Termos técnicos aparecem com sublinhado pontilhado; toque abre a gaveta do glossário sem sair da matéria.

## 3. Explorar um indicador

```mermaid
flowchart TD
    A[Painel de indicadores] --> B[Toca no cartão 'Selic']
    B --> C[Detalhe do indicador]
    C --> D[Valor atual em destaque + selo de frescor<br/>+ chip 'Próximo: 04/11/2026']
    D --> E[Parábola do indicador]
    E --> F[Gráfico da série<br/>seletor: 1 ano · 5 anos · 10 anos · máx.]
    F --> G{Quer ver os dados?}
    G -- Sim --> H[Tabela equivalente ao gráfico<br/>com botão 'Copiar' e 'Abrir na fonte']
    G -- Não --> I
    H --> I[Definição técnica + metodologia]
    I --> J[Matérias que citaram este indicador]
    J --> K[Alerta: 'Me avise na próxima divulgação']
    K --> L[Aviso: informação, não recomendação]
```

## 4. Seguir o calendário de lançamentos

```mermaid
flowchart TD
    A[Calendário] --> B[Lista cronológica: hoje em destaque<br/>filtros: instituição · tema · próximos 7/30 dias]
    B --> C[Evento: 'IPCA — setembro/2026<br/>IBGE · 09/10 · 9h']
    C --> D{Status}
    D -- Previsto --> E[Mostra: o que o Focus espera<br/>+ último valor + botão 'Me avise']
    D -- Divulgado --> F[Mostra: valor divulgado + link para a matéria]
    D -- Atrasado --> G[Mostra aviso honesto:<br/>'O IBGE ainda não publicou. Avisaremos.']
    E --> H[Toca em 'Me avise']
    H --> I{Tem e-mail/notificação?}
    I -- Não --> J[Pede e-mail ou permissão<br/>uma vez só]
    I -- Sim --> K[Alerta ativo: chip muda para 'Aviso ativo ✓']
    J --> K
```

## 5. Configurar alertas

```mermaid
flowchart TD
    A[Conta › Alertas] --> B[Lista de indicadores com interruptor]
    B --> C[Para cada um: 'Aviso na divulgação'<br/>e opcional 'Lembrete no dia anterior']
    C --> D[Canal: notificação · e-mail · ambos]
    D --> E[Horário silencioso: não avisar entre 22h e 7h<br/>ativo por padrão]
    E --> F[Salvar]
    F --> G[Confirmação: 'Você será avisado(a) de 3 divulgações<br/>nos próximos 30 dias']
```

Regras: nenhum alerta é ativado sem ação do leitor; desligar é um toque; o produto nunca envia alerta promocional pelo mesmo canal dos alertas de dados.

## 6. Assinar

```mermaid
flowchart TD
    A[Origem: paywall na profundidade,<br/>botão 'Assinar' ou tela Planos] --> B[Planos: um plano mensal<br/>R$ 19,90 · plano estudante R$ 9,90]
    B --> C[O que inclui · o que a amostra grátis já dá<br/>· como cancelar, na mesma tela]
    C --> D[Botão 'Assinar por R$ 19,90/mês']
    D --> E{Tem conta?}
    E -- Não --> F[E-mail + senha ou link mágico]
    E -- Sim --> G
    F --> G[Pagamento: Pix, cartão<br/>renovação automática explicada em uma frase]
    G --> H[Confirmação: 'Pronto. Próxima cobrança em 17/10/2026.<br/>Cancele quando quiser em Conta.']
    H --> I[Volta para onde estava<br/>com a profundidade aberta]
```

## 7. Cancelar (simples e honesto)

```mermaid
flowchart TD
    A[Conta › Assinatura] --> B[Botão visível: 'Cancelar assinatura']
    B --> C[Tela única:<br/>'Sua assinatura termina em 17/10/2026.<br/>Até lá, acesso completo.']
    C --> D[Opcional: 'Quer nos dizer o motivo?'<br/>4 opções + pular]
    D --> E[Botão 'Confirmar cancelamento']
    E --> F[Confirmação na tela + e-mail]
    F --> G[Conta continua com amostra grátis e alertas]
    C -. 'Voltar' .-> A
```

O que **não** existe neste fluxo: segunda tela de confirmação, oferta de desconto, ligação obrigatória, contagem regressiva, botões com hierarquia invertida.

## 8. Dia de divulgação (visão de sistema)

```mermaid
sequenceDiagram
    participant Cal as Calendário oficial
    participant Col as Coletor de dados
    participant Ed as Redação
    participant App as Produto
    participant L as Leitor

    Cal->>Col: 09/10 09:00 — IPCA setembro publicado (SIDRA)
    Col->>Col: Busca tabela 1737, valida período e publicação
    Col->>App: Atualiza indicador (valor, período, publicadoEm, próxima)
    App->>L: Alerta 'Saiu o IPCA: 0,28 % em setembro' (se ativo)
    Ed->>App: Publica matéria (parábola + entendimento) em até 30 min
    Ed->>App: Publica profundidade (gráficos, comparação) em até 2 h
    App->>L: Matéria atualizada; capa da edição ganha destaque
    App->>App: Marca evento como 'divulgado' e agenda o próximo (IPCA outubro, 10/11)
```
