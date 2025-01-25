import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientiRoutingModule } from './clienti-routing.module';
import { ClientiComponent } from './clienti.component';
import { RegisterClientiComponent } from './register-clienti/register-clienti.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';

@NgModule({
  declarations: [
    ClientiComponent,
    RegisterClientiComponent,
    DashboardClienteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientiRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbDropdownModule,
  ],
})
export class ClientiModule {}
