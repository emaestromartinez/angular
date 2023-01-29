import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketingPageComponent } from './ticketing-page.component';

const routes: Routes = [
  { path: '', component: TicketingPageComponent },
  {
    path: ':detailsId',
    component: TicketingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketingPageRoutingModule {}
