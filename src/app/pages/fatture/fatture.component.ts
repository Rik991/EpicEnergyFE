import { FattureService } from './../../services/fatture.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientiService } from '../../services/clienti.service';
import { iFattura, iStatoFattura } from '../../interfaces/i-fatture';
import { IFilterFatture } from '../../interfaces/i-filter-fatture';
import { iPageFatture } from '../../interfaces/i-page-fatture';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss'],
})
export class FattureComponent implements OnInit {
  form!: FormGroup;
  fatture!: IFilterFatture;
  currentPage: number = 1;
  fattureArray: iFattura[] = [];
  pageFatture!: iPageFatture;
  statoFatture: iStatoFattura[] = [];
  dataFatture = {
    ragioneSociale: '',
    statoFatturaNome: '',
  };

  @ViewChild('fattura', { static: false }) fatturaElement!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private fattureService: FattureService,
    private clientiService: ClientiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ragioneSociale: [''],
      importoFattura: [''],
      dataFatturazione: [''],
      statoFattura: [''],
    });

    this.fattureService.filtroFatture$.subscribe((fatture) => {
      this.fatture = fatture;
      this.onPageChange(this.currentPage);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    switch (this.fatture.key) {
      case 1:
        this.getAllFatture(page);
        break;
      case 2:
        this.getByRagioneSociale(this.fatture.ragioneSociale, page);
        break;
      case 3:
        this.getByStatoFattura(this.fatture.statoFattura, page);
        break;
      case 4:
        this.getByData(
          this.fatture.dataIniziale,
          this.fatture.dataFinale,
          page
        );
        break;
      case 5:
        this.getByAnno(Number(this.fatture.anno), page);
        break;
      case 6:
        this.getByImportoRange(
          Number(this.fatture.importoMin),
          Number(this.fatture.importoMax),
          page
        );
        break;
    }
  }

  getAllFatture(page: number): void {
    const currentPage = page - 1;
    this.fattureService.getAllFatture(currentPage).subscribe((pageFatture) => {
      this.pageFatture = pageFatture;
      this.fattureArray = pageFatture.content;
    });
  }

  getByRagioneSociale(ragioneSociale: string, page: number): void {
    const currentPage = page - 1;
    this.fattureService
      .getByRagioneSociale(ragioneSociale, currentPage)
      .subscribe((pageFatture) => {
        this.pageFatture = pageFatture;
        this.fattureArray = pageFatture.content;
      });
  }

  getByStatoFattura(statoFatturaNome: string, page: number): void {
    const currentPage = page - 1;
    this.fattureService
      .getByStatoFattura(statoFatturaNome, currentPage)
      .subscribe((pageFatture) => {
        this.pageFatture = pageFatture;
        this.fattureArray = pageFatture.content;
      });
  }

  getByData(dataInizio: string, dataFine: string, page: number): void {
    const currentPage = page - 1;
    this.fattureService
      .getByData(dataInizio, dataFine, currentPage)
      .subscribe((pageFatture) => {
        this.pageFatture = pageFatture;
        this.fattureArray = pageFatture.content;
      });
  }

  getByAnno(anno: number, page: number): void {
    const currentPage = page - 1;
    this.fattureService
      .getByAnno(anno, currentPage)
      .subscribe((pageFatture) => {
        this.pageFatture = pageFatture;
        this.fattureArray = pageFatture.content;
      });
  }

  getByImportoRange(
    minImporto: number,
    maxImporto: number,
    page: number
  ): void {
    const currentPage = page - 1;
    this.fattureService
      .getByImportoRange(minImporto, maxImporto, currentPage)
      .subscribe((pageFatture) => {
        this.pageFatture = pageFatture;
        this.fattureArray = pageFatture.content;
      });
  }

  getAllStatoFattura() {
    this.fattureService.getAllStatoFattura().subscribe({
      next: (response) => {
        this.statoFatture = response;
      },
      error: (error) => {
        console.error('Errore nel recupero degli stati Fattura:', error);
      },
    });
  }

  editFattura(fattura: iFattura): void {
    this.fattureService.setSelectedFattura(fattura);
    this.router.navigate(['/fatture/newfattura']);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pageFatture.totalPages) {
      this.onPageChange(page);
    }
  }

  getBadgeClass(statoFatturaNome: string): string {
    if (
      statoFatturaNome.toLowerCase() === 'scaduta' ||
      statoFatturaNome.toLowerCase() === 'non pagata'
    ) {
      return 'badge bg-danger';
    }
    return 'badge bg-succesSaturo';
  }
}
