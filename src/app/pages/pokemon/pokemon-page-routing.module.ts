import { PokemonPageComponent } from './pokemon-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PokemonPageComponent,
  },
  {
    path: ':slug',
    component: PokemonPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonPageRoutingModule {}
