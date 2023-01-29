import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  first,
  map,
  BehaviorSubject,
  forkJoin,
  mergeMap,
} from 'rxjs';
import {
  ApiPokemonDetails,
  ApiPokemonList,
} from 'src/app/api/pokemon/pokemon.interface';
import { ApiPokemonService } from 'src/app/api/pokemon/pokemon.service';
import { PokemonList, Pokemon } from './pokemon-page.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonPageService {
  pagination = new BehaviorSubject<{
    count: number;
    next: string | null;
    previous: string | null;
  }>({
    count: 0,
    next: null,
    previous: null,
  });
  // pokemonList: Map<string, ApiPokemonList.Get.Response.Body> = new Map<
  //   string,
  //   ApiPokemonList.Get.Response.Body
  // >();

  constructor(
    private _http: HttpClient,
    private _apiPokemonService: ApiPokemonService
  ) {}

  getPokemon(isItNext?: boolean): Observable<PokemonList> {
    const nextPageURL = isItNext
      ? this.pagination.value.next
      : this.pagination.value.previous;
    return this._apiPokemonService.getPokemon(nextPageURL).pipe(
      first(),
      mergeMap((result) => {
        const pokemonSubscriptionArray = [];
        for (let index = 0; index < result.results.length; index++) {
          pokemonSubscriptionArray.push(
            this._http.get<ApiPokemonDetails.Get.Response.Body>(
              result.results[index].url
            )
          );
        }
        return forkJoin(pokemonSubscriptionArray).pipe(
          map((pokemon) => {
            const mappedPokemon = pokemon.map(
              (pokemon: ApiPokemonDetails.Get.Response.Body, index: number) => {
                // We add the already mapped pokemon to the pokemon map, which will allow for a cheap search later.
                // this.pokemonList.set(pokemon[index]['url'], pokemon[index]);

                const pokemonTypes = pokemon.types.map((type) => {
                  return type.type.name;
                });

                return {
                  pokemonId: pokemon.id.toString(),
                  name: pokemon.name,
                  weight: pokemon.weight,
                  types: pokemonTypes,
                  sprite: pokemon.sprites.front_shiny,
                } as Pokemon;
              }
            );
            const pokemonList = {
              pokemon: mappedPokemon,
              count: +result.count,
              next: result.next,
              previous: result.previous,
            };
            return pokemonList;
          })
        );
      })
    );
  }
}
