import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge/badge.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BadgeComponent],
  imports: [CommonModule, NgbDropdownModule],
  exports: [BadgeComponent],
})
export class SharedModule {}
