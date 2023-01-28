import { SWHeaderService } from './sw-header.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SWHeaderComponent } from './sw-header.component';
import { RouterModule } from '@angular/router';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [SWHeaderComponent],
  imports: [CommonModule, RouterModule, InputModule],
  providers: [SWHeaderService],
  exports: [SWHeaderComponent],
})
export class SWHeaderModule {}
