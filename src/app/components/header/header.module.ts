import { InputModule } from 'src/app/components/input/input.module';
import { HeaderService } from './header.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, InputModule],
  providers: [HeaderService],
  exports: [HeaderComponent],
})
export class HeaderModule {}
