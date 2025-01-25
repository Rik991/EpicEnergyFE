export interface iDtoCliente {
  id: number;
  codiceProvincia: string;
  progressivo: string;
  denominazione: string;
  provincia: Provincia;
}

export interface Provincia {
  id: number;
  sigla: string;
  nome: string;
  regione: string;
}
