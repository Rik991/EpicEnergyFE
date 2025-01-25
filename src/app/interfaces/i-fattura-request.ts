export interface iFatturaRequest {
  data: string;
  importo: number;
  numero: string;
  clienteId?: number;
  statoFatturaNome: string;
}
