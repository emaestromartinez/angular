import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule, HeaderModule],
})
export class MainModule {}
