import { ForbiddenPageComponent } from './forbidden-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ForbiddenPageComponent },
  {
    path: 'unprotected',
    component: ForbiddenPageComponent,
  },
  {
    path: 'protected',
    component: ForbiddenPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForbiddenPageRoutingModule {}
