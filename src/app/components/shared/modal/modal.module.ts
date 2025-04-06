import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [CommonModule, A11yModule],
  exports: [ModalComponent],
  declarations: [ModalComponent],
})
export class ModalModule {}
