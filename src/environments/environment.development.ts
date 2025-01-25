export const environment = {
  registerUrl: 'http://localhost:8080/api/auth/register',
  loginUrl: 'http://localhost:8080/api/auth/login',
  clientiUrl: 'http://localhost:8080/api/clienti',
  clientiByRagioneSocialeUrl:
    'http://localhost:8080/api/clienti/search_by_ragione_sociale',
  clientiByRangeDataInserimentoUrl:
    'http://localhost:8080/api/clienti/registrazioni_tra_date_inserimento',
  clientiByRangeFatturatoAnnualeUrl:
    'http://localhost:8080/api/clienti/fatturato_annuale_range',
  clientiByDataUltimoContattoUrl:
    'http://localhost:8080/api/clienti/date_ultimo_contatto',
  fattureUrl: 'http://localhost:8080/api/fatture',
  fattureByStatoFatturaUrl: 'http://localhost:8080/api/fatture/stato_fattura',
  fattureByRagioneSocialeUrl:
    'http://localhost:8080/api/fatture/ragione_sociale',
  fattureByRangeImportoUrl: 'http://localhost:8080/api/fatture/importo_range',
  fattureByRangeDataUrl: 'http://localhost:8080/api/fatture/data',
  fattureByAnnoUrl: 'http://localhost:8080/api/fatture/anno',
  statoFatturaUrl: 'http://localhost:8080/api/stato_fattura',
  comuneUrl: 'http://localhost:8080/api/comuni',
};
