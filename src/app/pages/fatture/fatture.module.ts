import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FattureRoutingModule } from './fatture-routing.module';
import { FattureComponent } from './fatture.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewFatturaComponent } from './new-fattura/new-fattura.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FattureComponent, NewFatturaComponent],
  imports: [
    CommonModule,
    FattureRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class FattureModule {}
