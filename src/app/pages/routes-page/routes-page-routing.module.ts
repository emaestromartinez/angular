import { RoutesPageComponent } from './routes-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: RoutesPageComponent },
  {
    path: 'unprotected',
    component: RoutesPageComponent,
  },
  {
    path: 'protected',
    component: RoutesPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesPageRoutingModule {}
