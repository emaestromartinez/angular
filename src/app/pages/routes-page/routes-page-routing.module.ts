import { RoutesPageComponent } from './routes-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: RoutesPageComponent },
  {
    path: 'unprotected',
    component: RoutesPageComponent,
  },
  {
    path: 'protected',
    component: RoutesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesPageRoutingModule {}
