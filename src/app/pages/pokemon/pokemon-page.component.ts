import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/components/shared/header/header.service';

import { POKEMON_ROUTES_URL } from './pokemon-page.constants';
import { PokemonList } from './pokemon-page.interface';

import { PokemonPageService } from './pokemon-page.service';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
})
export class PokemonPageComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _pokemonPageService: PokemonPageService,
    private _headerService: HeaderService
  ) {}

  pokemonRoutesURL = POKEMON_ROUTES_URL;

  pokemonList: PokemonList;
  filteredPokemon: PokemonList;
  isPokemonFiltered = false;

  currentUrl: string;

  loading = false;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {}
  filterList() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
