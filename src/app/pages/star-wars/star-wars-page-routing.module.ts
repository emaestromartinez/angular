import { StarWarsPageComponent } from './star-wars-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: StarWarsPageComponent },
  {
    path: ':slug',
    component: StarWarsPageComponent,
  },
  {
    path: ':slug/:detailsId',
    component: StarWarsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarWarsPageRoutingModule {}
