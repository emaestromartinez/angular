import { SWHeaderModule } from 'src/app/components/shared/sw-header/sw-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketingPageComponent } from './ticketing-page.component';
import { TicketingPageRoutingModule } from './ticketing-page-routing.module';
import { RouterModule } from '@angular/router';
import { TicketingPageService } from './ticketing-page.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from 'src/app/components/shared/loader/loader.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    TicketingPageRoutingModule,
    LoaderModule,
    MatTableModule,
    MatPaginatorModule,
    SWHeaderModule,
  ],
  declarations: [TicketingPageComponent],
  providers: [TicketingPageService],
})
export class TicketingPageModule {}
