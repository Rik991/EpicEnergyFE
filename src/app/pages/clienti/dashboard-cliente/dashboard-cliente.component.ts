import { Component, OnInit } from '@angular/core';
import { ClientiService } from '../../../services/clienti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iCliente } from '../../../interfaces/i-clienti';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.component.html',
  styleUrl: './dashboard-cliente.component.scss',
})
export class DashboardClienteComponent implements OnInit {
  cliente!: iCliente;
  comuneLegale!: string;
  comuneOperativo!: string;
  id!: number;
  constructor(
    private clientiService: ClientiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.id = parseInt(id);

    this.route.params.subscribe((params) => {
      this.clientiService.getClientiById(parseInt(id)).subscribe((res) => {
        this.cliente = res;

        let comuneLegale = JSON.stringify(res.sedeLegale.comune);
        comuneLegale = JSON.parse(comuneLegale).denominazione;
        this.comuneLegale = comuneLegale;

        let comuneOperativo = JSON.stringify(res.sedeOperativa.comune);
        comuneOperativo = JSON.parse(comuneOperativo).denominazione;
        this.comuneOperativo = comuneOperativo;
      });
    });
  }

  deleteCliente() {
    this.clientiService.deleteClienti(this.id).subscribe(() => {
      this.router.navigate(['/clienti']);
    });
  }

  editCliente() {
    this.router.navigate(['/clienti/register', this.id]);
  }

  goBack() {
    this.router.navigate(['/clienti']);
  }
}
