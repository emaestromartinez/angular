import { HomeModule } from './../home/home.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/components/header/header.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule, HeaderModule],
})
export class MainModule {}
