import { iIndirizzo } from './i-indirizzo';
import { iTipoCliente } from './i-tipo-cliente';

export interface iCliente {
  id?: number;
  ragioneSociale: string;
  partitaIva: string;
  email: string;
  dataInserimento?: string;
  dataUltimoContatto?: string;
  fatturatoAnnuale: number;
  pec: string;
  telefono: string;
  emailContatto?: string;
  nomeContatto?: string;
  cognomeContatto?: string;
  telefonoContatto?: string;
  tipoCliente: iTipoCliente;
  sedeLegale: iIndirizzo;
  sedeOperativa: iIndirizzo;
  logoAziendale?: string;
}
