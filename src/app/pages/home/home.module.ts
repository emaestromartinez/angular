import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderModule } from 'src/app/components/shared/header/header.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, HeaderModule, HomeRoutingModule],
})
export class HomeModule {}
