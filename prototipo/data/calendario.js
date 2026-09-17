// Calendário de divulgações oficiais — datas seguem o padrão dos calendários das instituições.
// Valores "esperado" e "divulgado" são ILUSTRATIVOS.
window.CEP = window.CEP || {};
CEP.eventos = [
  { id: 'pib-2026-t2', data: '2026-09-02', hora: '09:00', instituicao: 'IBGE', indicador: 'pib', titulo: 'PIB — 2º trimestre de 2026', periodo: '2º tri/2026', status: 'divulgado', valor: '+0,4 % no trimestre', materia: 'pib-2tri-2026' },
  { id: 'focus-2026-09-08', data: '2026-09-08', hora: '08:25', instituicao: 'BCB', indicador: 'focus', titulo: 'Boletim Focus', periodo: 'Semana de 08/09', status: 'divulgado', valor: 'IPCA 2026: 4,10 %' },
  { id: 'ipca-2026-08', data: '2026-09-10', hora: '09:00', instituicao: 'IBGE', indicador: 'ipca', titulo: 'IPCA — agosto de 2026', periodo: 'Agosto/2026', status: 'divulgado', valor: '0,32 % no mês · 4,10 % em 12 meses', materia: 'ipca-agosto-2026' },
  { id: 'focus-2026-09-14', data: '2026-09-14', hora: '08:25', instituicao: 'BCB', indicador: 'focus', titulo: 'Boletim Focus', periodo: 'Semana de 14/09', status: 'divulgado', valor: 'IPCA 2026: 4,05 % · Selic fim 2026: 14,00 %', materia: 'focus-14-setembro-2026' },
  { id: 'copom-2026-09', data: '2026-09-16', hora: '18:30', instituicao: 'BCB', indicador: 'selic', titulo: 'Decisão do Copom', periodo: 'Reunião de 15–16/09', status: 'divulgado', valor: 'Selic mantida em 14,25 % a.a.', esperado: 'Manutenção em 14,25 % (Focus)', materia: 'copom-setembro-2026' },
  { id: 'ptax-2026-09-17', data: '2026-09-17', hora: '13:15', instituicao: 'BCB', indicador: 'cambio', titulo: 'PTAX do dia', periodo: '17/09/2026', status: 'previsto', ultimo: 'Ontem: R$ 5,32' },
  { id: 'focus-2026-09-21', data: '2026-09-21', hora: '08:25', instituicao: 'BCB', indicador: 'focus', titulo: 'Boletim Focus', periodo: 'Semana de 21/09', status: 'previsto', ultimo: 'IPCA 2026: 4,05 %' },
  { id: 'ata-copom-2026-09', data: '2026-09-22', hora: '08:00', instituicao: 'BCB', indicador: 'selic', titulo: 'Ata do Copom', periodo: 'Reunião de 15–16/09', status: 'previsto', ultimo: 'Decisão: manutenção em 14,25 %', esperado: 'Detalhes sobre quando os cortes podem começar' },
  { id: 'ipca15-2026-09', data: '2026-09-25', hora: '09:00', instituicao: 'IBGE', indicador: 'ipca', titulo: 'IPCA-15 — setembro de 2026', periodo: 'Prévia de setembro', status: 'previsto', ultimo: 'IPCA-15 de agosto: 0,35 %', esperado: '0,30 % (Focus)' },
  { id: 'rti-2026-09', data: '2026-09-25', hora: '08:00', instituicao: 'BCB', indicador: 'selic', titulo: 'Relatório de Política Monetária', periodo: '3º trimestre', status: 'previsto', ultimo: 'Projeção do BC para o IPCA 2026: 4,2 %' },
  { id: 'focus-2026-09-28', data: '2026-09-28', hora: '08:25', instituicao: 'BCB', indicador: 'focus', titulo: 'Boletim Focus', periodo: 'Semana de 28/09', status: 'previsto', ultimo: 'IPCA 2026: 4,05 %' },
  { id: 'rtn-2026-08', data: '2026-09-29', hora: '14:30', instituicao: 'Tesouro Nacional', indicador: 'divida', titulo: 'Resultado do Tesouro Nacional — agosto', periodo: 'Agosto/2026', status: 'previsto', ultimo: 'Julho: déficit de R$ 12,3 bi', esperado: 'Déficit de R$ 8 bi (mediana Prisma Fiscal)' },
  { id: 'caged-2026-08', data: '2026-09-30', hora: '10:00', instituicao: 'MTE', indicador: 'desemprego', titulo: 'Novo CAGED — agosto', periodo: 'Agosto/2026', status: 'previsto', ultimo: 'Julho: +115 mil vagas' },
  { id: 'pnad-2026-08', data: '2026-09-30', hora: '09:00', instituicao: 'IBGE', indicador: 'desemprego', titulo: 'PNAD Contínua — junho a agosto', periodo: 'Trimestre móvel jun–ago/2026', status: 'previsto', ultimo: 'mai–jul: 6,4 %', esperado: '6,3 % (consenso)' },
  { id: 'fiscais-2026-08', data: '2026-09-30', hora: '08:30', instituicao: 'BCB', indicador: 'divida', titulo: 'Estatísticas fiscais — agosto', periodo: 'Agosto/2026', status: 'previsto', ultimo: 'Julho: dívida bruta em 78,9 % do PIB' },
  { id: 'focus-2026-10-05', data: '2026-10-05', hora: '08:25', instituicao: 'BCB', indicador: 'focus', titulo: 'Boletim Focus', periodo: 'Semana de 05/10', status: 'previsto' },
  { id: 'ipca-2026-09', data: '2026-10-09', hora: '09:00', instituicao: 'IBGE', indicador: 'ipca', titulo: 'IPCA — setembro de 2026', periodo: 'Setembro/2026', status: 'previsto', ultimo: 'Agosto: 0,32 %', esperado: '0,28 % no mês (Focus)' },
  { id: 'focus-2026-10-13', data: '2026-10-13', hora: '08:25', instituicao: 'BCB', indicador: 'focus', titulo: 'Boletim Focus', periodo: 'Semana de 13/10', status: 'previsto' },
  { id: 'ipca15-2026-10', data: '2026-10-24', hora: '09:00', instituicao: 'IBGE', indicador: 'ipca', titulo: 'IPCA-15 — outubro de 2026', periodo: 'Prévia de outubro', status: 'previsto' },
  { id: 'rtn-2026-09', data: '2026-10-29', hora: '14:30', instituicao: 'Tesouro Nacional', indicador: 'divida', titulo: 'Resultado do Tesouro Nacional — setembro', periodo: 'Setembro/2026', status: 'previsto' },
  { id: 'pnad-2026-09', data: '2026-10-30', hora: '09:00', instituicao: 'IBGE', indicador: 'desemprego', titulo: 'PNAD Contínua — julho a setembro', periodo: 'Trimestre móvel jul–set/2026', status: 'previsto' },
  { id: 'fiscais-2026-09', data: '2026-10-30', hora: '08:30', instituicao: 'BCB', indicador: 'divida', titulo: 'Estatísticas fiscais — setembro', periodo: 'Setembro/2026', status: 'previsto' },
  { id: 'copom-2026-11', data: '2026-11-04', hora: '18:30', instituicao: 'BCB', indicador: 'selic', titulo: 'Decisão do Copom', periodo: 'Reunião de 03–04/11', status: 'previsto', ultimo: 'Setembro: manutenção em 14,25 %', esperado: 'Corte de 0,25 p.p. (Focus: 14,00 % no fim do ano)' },
  { id: 'ipca-2026-10', data: '2026-11-10', hora: '09:00', instituicao: 'IBGE', indicador: 'ipca', titulo: 'IPCA — outubro de 2026', periodo: 'Outubro/2026', status: 'previsto' },
  { id: 'pib-2026-t3', data: '2026-12-03', hora: '09:00', instituicao: 'IBGE', indicador: 'pib', titulo: 'PIB — 3º trimestre de 2026', periodo: '3º tri/2026', status: 'previsto', ultimo: '2º tri: +0,4 %', esperado: '+0,3 % (Focus)' },
  { id: 'copom-2026-12', data: '2026-12-09', hora: '18:30', instituicao: 'BCB', indicador: 'selic', titulo: 'Decisão do Copom', periodo: 'Reunião de 08–09/12', status: 'previsto' }
];
CEP.calendariosOficiais = [
  { nome: 'Calendário do Copom (BCB)', url: 'https://www.bcb.gov.br/controleinflacao/copom' },
  { nome: 'Calendário de divulgações do IBGE', url: 'https://www.ibge.gov.br/calendario-de-divulgacoes-novoportal.html' },
  { nome: 'Boletim Focus (BCB)', url: 'https://www.bcb.gov.br/publicacoes/focus' },
  { nome: 'Tesouro Transparente', url: 'https://www.tesourotransparente.gov.br/' },
  { nome: 'Novo CAGED (MTE)', url: 'https://pdet.mte.gov.br/novo-caged' }
];
