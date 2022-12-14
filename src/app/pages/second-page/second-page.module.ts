import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondPageComponent } from './second-page.component';
import { SecondPageRoutingModule } from './second-page-routing.module';
import { RouterModule } from '@angular/router';
import { SecondPageService } from './second-page.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiQuotesService } from 'src/app/api/quotes/qod.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SecondPageRoutingModule,
  ],
  declarations: [SecondPageComponent],
  providers: [SecondPageService, ApiQuotesService],
})
export class SecondPageModule {}
