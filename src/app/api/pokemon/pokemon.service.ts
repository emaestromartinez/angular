import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { pokemonBaseUrl } from './commons';
import { ApiPokemonList } from './pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiPokemonService {
  constructor(private _http: HttpClient) {}

  getPokemon(
    nextPageURL?: string | null,
    params?: ApiPokemonList.Get.Request.Params
  ): Observable<ApiPokemonList.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    const url = nextPageURL ? nextPageURL : `${pokemonBaseUrl}/pokemon`;

    return this._http
      .get<ApiPokemonList.Get.Response.Body>(url, {
        params: httpParams,
      })
      .pipe(catchError((error) => throwError(error)));
  }
}
