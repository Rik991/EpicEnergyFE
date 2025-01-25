import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { iFatturaRequest } from '../interfaces/i-fattura-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { iFattura, iStatoFattura } from '../interfaces/i-fatture';
import { iPageFatture } from '../interfaces/i-page-fatture';
import { IFilterFatture } from '../interfaces/i-filter-fatture';

@Injectable({
  providedIn: 'root',
})
export class FattureService {
  fattureUrl: string = environment.fattureUrl;
  StatoFatturaUrl: string = environment.statoFatturaUrl;
  fatturaByRagioneSocialeUrl: string = environment.fattureByRagioneSocialeUrl;
  fatturaByStatoFatturaUrl: string = environment.fattureByStatoFatturaUrl;
  private fatturaByDataUrl = environment.fattureByRangeDataUrl;
  private fatturaByAnnoUrl = environment.fattureByAnnoUrl;
  private fatturaByImportoRangeUrl = environment.fattureByRangeImportoUrl;

  private selectedFatturaSubject = new BehaviorSubject<iFattura | null>(null);
  selectedFattura$ = this.selectedFatturaSubject.asObservable();

  constructor(private http: HttpClient) {}

  private filtroFattureSubject = new BehaviorSubject<IFilterFatture>({
    key: 1,
    ragioneSociale: '',
    dataIniziale: '',
    dataFinale: '',
    importoMin: '',
    importoMax: '',
    statoFattura: '',
    numeroFattura: '',
    anno: '',
  });
  filtroFatture$ = this.filtroFattureSubject.asObservable();

  sendData(data: IFilterFatture) {
    this.filtroFattureSubject.next(data);
  }

  getAllStatoFattura(): Observable<iStatoFattura[]> {
    return this.http.get<iStatoFattura[]>(this.StatoFatturaUrl);
  }

  createStatoFattura(nome: string) {
    const params = new HttpParams().set('nome', nome);
    return this.http.post<iStatoFattura>(environment.statoFatturaUrl, null, {
      params,
    });
  }

  createFattura(
    ragioneSociale: string,
    fatturaDto: iFatturaRequest
  ): Observable<iFattura> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<iFattura>(
      `${this.fattureUrl}?ragioneSociale=${ragioneSociale}`,
      fatturaDto,
      { headers }
    );
  }

  getAllFatture(page: number): Observable<iPageFatture> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '12');
    return this.http.get<iPageFatture>(this.fattureUrl, { params });
  }

  getByRagioneSociale(
    ragioneSociale: string,
    page: number
  ): Observable<iPageFatture> {
    let params = new HttpParams()
      .set('ragioneSociale', ragioneSociale)
      .set('page', page.toString())
      .set('size', '12');
    return this.http.get<iPageFatture>(this.fatturaByRagioneSocialeUrl, {
      params,
    });
  }

  getByStatoFattura(
    statoFattura: string,
    page: number
  ): Observable<iPageFatture> {
    let params = new HttpParams()
      .set('statoFatturaNome', statoFattura) // Deve corrispondere al nome definito in Java
      .set('page', page.toString())
      .set('size', '12');

    console.log('Params:', params.toString()); // Debug per confermare
    return this.http.get<iPageFatture>(this.fatturaByStatoFatturaUrl, {
      params,
    });
  }

  getByData(
    dataInizio: string,
    dataFine: string,
    page: number
  ): Observable<iPageFatture> {
    let params = new HttpParams()
      .set('dataInizio', dataInizio)
      .set('dataFine', dataFine)
      .set('page', page.toString())
      .set('size', '12');
    return this.http.get<iPageFatture>(this.fatturaByDataUrl, { params });
  }

  getByAnno(anno: number, page: number): Observable<iPageFatture> {
    let params = new HttpParams()
      .set('anno', anno.toString())
      .set('page', page.toString())
      .set('size', '12');
    return this.http.get<iPageFatture>(this.fatturaByAnnoUrl, { params });
  }

  getByImportoRange(
    minImporto: number,
    maxImporto: number,
    page: number
  ): Observable<iPageFatture> {
    let params = new HttpParams()
      .set('minImporto', minImporto.toString())
      .set('maxImporto', maxImporto.toString())
      .set('page', page.toString())
      .set('size', '12');
    return this.http.get<iPageFatture>(this.fatturaByImportoRangeUrl, {
      params,
    });
  }

  getUltimoNumeroFattura(): Observable<number> {
    return this.http.get<number>(`${this.fattureUrl}/ultimo-numero`);
  }

  updateFattura(
    numero: string,
    fattura: iFatturaRequest
  ): Observable<iFattura> {
    return this.http.put<iFattura>(`${this.fattureUrl}/${numero}`, fattura);
  }
  setSelectedFattura(fattura: iFattura) {
    this.selectedFatturaSubject.next(fattura);
  }

  clearSelectedFattura() {
    this.selectedFatturaSubject.next(null);
  }
}
