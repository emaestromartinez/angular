import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/components/header/header.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, HeaderModule, HomeRoutingModule],
})
export class HomeModule {}
