import { iCliente } from './i-clienti';

export interface iFattura {
  id: number;
  data: string;
  importo: number;
  numero: string;
  statoFattura: iStatoFattura;
  cliente: iCliente;
}

export interface iStatoFattura {
  id?: number;
  nome: string;
}
