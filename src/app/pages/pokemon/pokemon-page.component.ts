import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { Subscription } from 'rxjs';
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
    private _pokemonPageService: PokemonPageService,
    private _SWHeaderService: SWHeaderService
  ) {}

  pokemonRoutesURL = POKEMON_ROUTES_URL;

  pokemonList: PokemonList;
  filteredPokemon: PokemonList;
  isPokemonFiltered = false;

  currentUrl: string;

  loading = false;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.updateCurrentRoute();
    this.getInformation();

    const routeChangeSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute();
      }
    });
    this.subscriptions.push(routeChangeSub);
  }

  getInformation() {
    switch (this.currentUrl) {
      case 'list':
        if (!this.pokemonList?.pokemon || this.isPokemonFiltered) {
          this.loading = true;
          const getPokemonSub = this._pokemonPageService
            .getPokemon()
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
          this.subscriptions.push(getPokemonSub);
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
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
