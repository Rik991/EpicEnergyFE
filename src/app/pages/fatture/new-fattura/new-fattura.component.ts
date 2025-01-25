import { ClientiService } from './../../../services/clienti.service';
import { FattureService } from './../../../services/fatture.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { iFatturaRequest } from '../../../interfaces/i-fattura-request';
import { iFattura, iStatoFattura } from '../../../interfaces/i-fatture';
import { iCliente } from '../../../interfaces/i-clienti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-fattura',
  templateUrl: './new-fattura.component.html',
  styleUrls: ['./new-fattura.component.scss'],
})
export class NewFatturaComponent implements OnInit {
  form!: FormGroup;
  statoFatture: iStatoFattura[] = [];
  clienti: iCliente[] = [];
  clienteSelezionato?: iCliente;
  numeroFattura: number = 0;
  isEditMode = false;
  fatturaId?: number;

  @ViewChild('fattura', { static: false }) fatturaElement!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private fattureService: FattureService,
    private clientiService: ClientiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  private initForm(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.form = this.fb.group({
      ragioneSociale: ['', Validators.required],
      importoFattura: ['', Validators.required],
      dataFatturazione: [currentDate, Validators.required],
      statoFattura: ['non pagata', Validators.required],
    });
  }

  private loadData(): void {
    // Subscribe to selected fattura
    this.fattureService.selectedFattura$.subscribe((fattura) => {
      if (fattura) {
        this.isEditMode = true;
        this.precompilaForm(fattura);
      } else {
        this.isEditMode = false;
        this.getUltimoNumeroFattura();
      }
    });

    this.getAllClienti();
    this.getAllStatoFattura();
  }

  private precompilaForm(fattura: iFattura): void {
    this.numeroFattura = Number(fattura.numero);
    this.clienteSelezionato = fattura.cliente;

    // Wait for clienti and statoFatture to be loaded
    Promise.all([this.getAllClienti(), this.getAllStatoFattura()]).then(() => {
      this.form.patchValue({
        ragioneSociale: fattura.cliente.ragioneSociale,
        importoFattura: fattura.importo,
        dataFatturazione: fattura.data,
        statoFattura: fattura.statoFattura.nome,
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const fatturaDto: iFatturaRequest = {
        data: this.form.value.dataFatturazione,
        importo: Number(this.form.value.importoFattura),
        numero: this.numeroFattura.toString(),
        statoFatturaNome: this.form.value.statoFattura,
        clienteId: this.clienteSelezionato?.id,
      };

      if (this.isEditMode) {
        this.fattureService
          .updateFattura(this.numeroFattura.toString(), fatturaDto)
          .subscribe({
            next: (response) => {
              this.router.navigate(['/fatture']);
            },
            error: (error) => console.error('Update error:', error),
          });
      } else {
        this.fattureService
          .createFattura(this.form.value.ragioneSociale, fatturaDto)
          .subscribe({
            next: (response) => {
              this.router.navigate(['/fatture']);
            },
            error: (error) => console.error('Create error:', error),
          });
      }
    }
  }

  getUltimoNumeroFattura(): void {
    this.fattureService.getUltimoNumeroFattura().subscribe({
      next: (response) => {
        this.numeroFattura = response + 1; // Incrementa l'ultimo numero di fattura
      },
      error: (error) => {
        console.error(
          "Errore nel recupero dell'ultimo numero di fattura:",
          error
        );
      },
    });
  }

  createStatoFattura(nome: string) {
    this.fattureService.createStatoFattura(nome).subscribe({
      next: (response) => {
        this.getAllStatoFattura();
        this.form.patchValue({ statoFattura: response.nome });
      },
      error: (error) => {
        console.error('Errore nella creazione dello stato Fattura:', error);
        alert('Errore nella creazione dello stato fattura. Riprovare.');
      },
    });
  }

  onStatoFatturaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    // Verifica se l'opzione selezionata è "Aggiungi nuovo stato..."
    if (selectElement.value === 'new') {
      const nuovoStato = prompt('Inserisci il nome del nuovo stato:');

      // Controlla che l'utente abbia effettivamente inserito un valore
      if (nuovoStato && nuovoStato.trim() !== '') {
        this.createStatoFattura(nuovoStato.trim());
      } else {
        alert('Il nome dello stato non può essere vuoto.');
      }
    }
  }

  onClienteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const ragioneSociale = selectElement.value;
    this.clienteSelezionato = this.clienti.find(
      (cliente) => cliente.ragioneSociale === ragioneSociale
    );
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

  getAllClienti() {
    this.clientiService.getAllClienti().subscribe({
      next: (data) => {
        this.clienti = data;
      },
      error: (error) => {
        console.error('Errore nel recupero dei clienti:', error);
      },
    });
  }

  createFattura() {
    if (this.form.valid) {
      const fatturaDto: iFatturaRequest = {
        data: this.form.value.dataFatturazione,
        importo: Number(this.form.value.importoFattura),
        numero: '', // Numero fattura lasciato vuoto
        statoFatturaNome: this.form.value.statoFattura,
      };
      this.fattureService
        .createFattura(this.form.value.ragioneSociale, fatturaDto)
        .subscribe({
          next: (response) => {
            console.log('Fattura creata con successo:', response);
          },
          error: (error) => {
            console.error('Errore nella creazione della fattura:', error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.fattureService.clearSelectedFattura();
  }

  downloadPDF(): void {
    if (this.fatturaElement) {
      const data = this.fatturaElement.nativeElement;
      html2canvas(data).then((canvas) => {
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('fattura.pdf');
      });
    } else {
      console.error('Fattura element is not defined');
    }
  }
}
