import { StarWarsMoviesPageComponent } from './star-wars-movies-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: StarWarsMoviesPageComponent },
  {
    path: ':slug',
    component: StarWarsMoviesPageComponent,
  },
  {
    path: ':slug/:detailsId',
    component: StarWarsMoviesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarWarsMoviesPageRoutingModule {}