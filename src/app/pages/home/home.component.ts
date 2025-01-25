import { ClientiService } from './../../services/clienti.service';
import { Component, OnInit } from '@angular/core';
import { iFilterClienti } from '../../interfaces/i-filter-clienti';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { FattureService } from '../../services/fatture.service';
import { IFilterFatture } from '../../interfaces/i-filter-fatture';
import { iStatoFattura } from '../../interfaces/i-fatture';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  user!: iUser | undefined;
  name: string | undefined = '';
  profileImg: string =
    'https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg';
  statoFatture: iStatoFattura[] = [];
  constructor(
    private clientiSvc: ClientiService,
    private authSvc: AuthService,
    private fattureSvc: FattureService
  ) {}

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => (this.user = user));

    if (this.user?.avatar) {
      this.profileImg = this.user?.avatar;
    }
    this.name = this.user?.nome;

    this.getAllStatoFattura();
  }

  data: iFilterClienti = {
    key: 1,
    ragioneSociale: '',
    dataIniziale: '',
    dataFinale: '',
    fatturatoMin: '',
    fatturatoMax: '',
  };

  sendData(key: number) {
    this.data.key = key;
    this.clientiSvc.sendData(this.data);
  }

  dataFatture: IFilterFatture = {
    key: 1,
    ragioneSociale: '',
    dataIniziale: '',
    dataFinale: '',
    importoMin: '',
    importoMax: '',
    statoFattura: '',
    numeroFattura: '',
    anno: '',
  };

  sendDataFatture(key: number) {
    this.dataFatture.key = key;
    this.fattureSvc.sendData(this.dataFatture);
  }

  getAllStatoFattura() {
    this.fattureSvc.getAllStatoFattura().subscribe({
      next: (response) => {
        console.log('Stati Fattura:', response);
        this.statoFatture = response;
      },
      error: (error) => {
        console.error('Errore nel recupero degli stati Fattura:', error);
      },
    });
  }
}
