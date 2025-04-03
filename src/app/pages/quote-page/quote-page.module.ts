import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotePageComponent } from './quote-page.component';
import { QuotePageRoutingModule } from './quote-page-routing.module';
import { RouterModule } from '@angular/router';
import { QuotePageService } from './quote-page.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApiQuotesService } from 'src/app/api/quotes/qod.service';

@NgModule({
  declarations: [QuotePageComponent],
  imports: [CommonModule, RouterModule, QuotePageRoutingModule],
  providers: [
    QuotePageService,
    ApiQuotesService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class QuotePageModule {}
