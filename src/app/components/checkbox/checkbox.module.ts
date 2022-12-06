import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from './checkbox.component';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
