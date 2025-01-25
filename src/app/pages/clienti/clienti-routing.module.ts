import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiComponent } from './clienti.component';
import { RegisterClientiComponent } from './register-clienti/register-clienti.component';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';

const routes: Routes = [
  { path: '', component: ClientiComponent },
  { path: 'register', component: RegisterClientiComponent },
  { path: 'register/:id', component: RegisterClientiComponent },
  { path: 'dashboard/:id', component: DashboardClienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientiRoutingModule {}
