import { HeaderService } from './header.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, InputModule],
  providers: [HeaderService],
  exports: [HeaderComponent],
})
export class HeaderModule {}
