import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FattureComponent } from './fatture.component';
import { NewFatturaComponent } from './new-fattura/new-fattura.component';

const routes: Routes = [
  { path: '', component: FattureComponent },
  { path: 'newfattura', component: NewFatturaComponent },
  { path: 'newfattura/:numero', component: NewFatturaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FattureRoutingModule {}
