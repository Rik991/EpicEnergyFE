import { ClientiService } from './../../services/clienti.service';
import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { iCliente } from '../../interfaces/i-clienti';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  // da fare
  @Input() cliente!: iCliente;
  @Output() deleteCliente = new EventEmitter<number>();

  constructor(private Router: Router, private ClientiSvc: ClientiService) {}

  visualizza(id: number) {
    this.Router.navigate(['clienti/dashboard', id]);
  }

  edit(id: number) {
    this.Router.navigate(['clienti/register', id]);
  }

  delete(id: number) {
    this.deleteCliente.emit(id);
  }
}
