import { EventDetailsComponent } from './event-details-page/event-details.component';
import { SWHeaderModule } from 'src/app/components/shared/sw-header/sw-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketingPageComponent } from './ticketing-page.component';
import { TicketingPageRoutingModule } from './ticketing-page-routing.module';
import { RouterModule } from '@angular/router';
import { TicketingPageService } from './ticketing-page.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoaderModule } from 'src/app/components/shared/loader/loader.module';
import { ApiTicketingService } from 'src/app/api/ticketing/ticketing.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TicketingPageComponent, EventDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    TicketingPageRoutingModule,
    LoaderModule,
    ReactiveFormsModule,
  ],
  providers: [
    TicketingPageService,
    ApiTicketingService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class TicketingPageModule {}
