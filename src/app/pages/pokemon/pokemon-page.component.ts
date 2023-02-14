import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SWHeaderService } from 'src/app/components/shared/sw-header/sw-header.service';

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
    private _pokemonPageService: PokemonPageService
  ) {}

  unsubscribe$: Subject<void> = new Subject<void>();

  pokemonRoutesURL = POKEMON_ROUTES_URL;

  pokemonList: PokemonList;
  filteredPokemon: PokemonList;
  isPokemonFiltered = false;

  currentUrl: string;

  loading = false;

  ngOnInit(): void {
    this.updateCurrentRoute();
    this.getInformation();

    const routeChangeSub = this._router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateCurrentRoute();
        }
      });
  }

  getInformation() {
    switch (this.currentUrl) {
      case 'list':
        if (!this.pokemonList?.pokemon || this.isPokemonFiltered) {
          this.loading = true;
          const getPokemonSub = this._pokemonPageService
            .getPokemon()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((pokemonList) => {
              this.pokemonList = pokemonList;

              this.filteredPokemon = {
                pokemon: pokemonList.pokemon,
                count: pokemonList.count,
                next: pokemonList.next,
                previous: pokemonList.previous,
              };

              this._pokemonPageService.pagination.next({
                count: pokemonList.count,
                next: pokemonList.next,
                previous: pokemonList.previous,
              });

              this.loading = false;
            });
        }

        break;

      default:
        break;
    }
  }

  refreshInformation() {
    this.filteredPokemon = this.pokemonList;
  }

  updateCurrentRoute() {
    this.currentUrl = this._route.snapshot.params['slug'];
  }

  filterList() {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
