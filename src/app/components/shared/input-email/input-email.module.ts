import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputEmailComponent } from './input-email.component';

@NgModule({
  declarations: [InputEmailComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputEmailComponent],
})
export class InputEmailModule {}
