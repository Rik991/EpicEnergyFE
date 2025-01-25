import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClientiService } from '../../services/clienti.service';
import { iPageClienti } from '../../interfaces/i-page-clienti';
import { iCliente } from '../../interfaces/i-clienti';
import { iFilterClienti } from '../../interfaces/i-filter-clienti';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrl: './clienti.component.scss',
})
export class ClientiComponent implements OnInit {
  filterData!: iFilterClienti;
  pageClienti!: iPageClienti;
  clientiArray: iCliente[] = [];
  currentPage: number = 1;

  constructor(private clientiSvc: ClientiService) {}

  ngOnInit(): void {
    this.clientiSvc.filtroClienti$.subscribe((data) => {
      this.filterData = data;
    });

    this.onPageChange(this.currentPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pageClienti.totalPages) {
      this.onPageChange(page);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    switch (this.filterData.key) {
      case 1:
        this.getAll(page);
        break;
      case 2:
        this.getByRagione(this.filterData.ragioneSociale, page);
        break;
      case 3:
        this.getByDataUltimoContatto(
          this.filterData.dataIniziale,
          this.filterData.dataFinale,
          page
        );
        break;
      case 4:
        this.getByRangeDataInserimento(
          this.filterData.dataIniziale,
          this.filterData.dataFinale,
          page
        );
        break;
      case 5:
        this.getByRangeFatturatoAnnuale(
          this.filterData.fatturatoMin,
          this.filterData.fatturatoMax,
          page
        );
        break;
    }
  }

  getAll(page: number): void {
    const currentPage = page - 1;
    this.clientiSvc.getClienti(currentPage).subscribe((pageClienti) => {
      this.pageClienti = pageClienti;
      this.clientiArray = pageClienti.content;
    });
  }

  getByRagione(ragioneSociale: string, page: number): void {
    const currentPage = page - 1;
    this.clientiSvc
      .getByRagioneSociale(ragioneSociale, currentPage)
      .subscribe((pageClienti) => {
        this.pageClienti = pageClienti;
        this.clientiArray = pageClienti.content;
      });
  }

  getByRangeDataInserimento(
    dataInizio: string,
    dataFine: string,
    page: number
  ): void {
    const currentPage = page - 1;
    this.clientiSvc
      .getClientiByRangeDataInserimento(dataInizio, dataFine, currentPage)
      .subscribe((pageClienti) => {
        this.pageClienti = pageClienti;
        this.clientiArray = pageClienti.content;
      });
  }

  getByRangeFatturatoAnnuale(min: string, max: string, page: number): void {
    const currentPage = page - 1;
    this.clientiSvc
      .getClientiByRangeFatturatoAnnuale(min, max, currentPage)
      .subscribe((pageClienti) => {
        this.pageClienti = pageClienti;
        this.clientiArray = pageClienti.content;
      });
  }

  getByDataUltimoContatto(
    dataInizio: string,
    dataFine: string,
    page: number
  ): void {
    const currentPage = page - 1;
    this.clientiSvc
      .getclientiByDataUltimoContatto(dataInizio, dataFine, currentPage)
      .subscribe((pageClienti) => {
        this.pageClienti = pageClienti;
        this.clientiArray = pageClienti.content;
      });
  }

  onDeleteCliente(id: number): void {
    this.clientiSvc.deleteClienti(id).subscribe(() => {
      this.onPageChange(this.currentPage);
    });
  }
}
