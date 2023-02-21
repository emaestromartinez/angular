import { PaymentsPageService } from './payments-page.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaymentsPageComponent } from './payments-page.component';
import { PaymentsPageRoutingModule } from './payments-page-routing.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, PaymentsPageRoutingModule],
  declarations: [PaymentsPageComponent],
  providers: [PaymentsPageService],
  exports: [PaymentsPageComponent],
})
export class PaymentsPageModule {}
