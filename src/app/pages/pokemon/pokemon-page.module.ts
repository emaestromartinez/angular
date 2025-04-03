import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonPageComponent } from './pokemon-page.component';
import { PokemonPageRoutingModule } from './pokemon-page-routing.module';
import { RouterModule } from '@angular/router';
import { PokemonPageService } from './pokemon-page.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoaderModule } from 'src/app/components/shared/loader/loader.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { ApiPokemonService } from 'src/app/api/pokemon/pokemon.service';

@NgModule({
  declarations: [PokemonPageComponent, PokemonListComponent],
  imports: [
    CommonModule,
    RouterModule,
    PokemonPageRoutingModule,
    LoaderModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [
    PokemonPageService,
    ApiPokemonService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class PokemonPageModule {}
