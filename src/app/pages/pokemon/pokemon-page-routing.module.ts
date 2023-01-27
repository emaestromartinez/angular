import { PokemonPageComponent } from './pokemon-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PokemonPageComponent },
  // {
  //   path: 'list',
  //   component: PokemonListComponent,
  // },
  // {
  //   path: 'add',
  //   component: PokemonAddComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonPageRoutingModule {}
