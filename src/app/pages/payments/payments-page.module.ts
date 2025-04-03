import { PaymentsPageService } from './payments-page.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { PaymentsPageComponent } from './payments-page.component';
import { PaymentsPageRoutingModule } from './payments-page-routing.module';
import { ApiPaymentsService } from 'src/app/api/payments/payments.service';

@NgModule({
  declarations: [PaymentsPageComponent],
  exports: [PaymentsPageComponent],
  imports: [CommonModule, PaymentsPageRoutingModule],
  providers: [
    PaymentsPageService,
    ApiPaymentsService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class PaymentsPageModule {}
