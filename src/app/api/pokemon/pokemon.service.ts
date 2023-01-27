import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiPokemonPeopleDetails, ApiPokemonPeople } from './pokemon.interface';
import { pokemonBaseUrl } from './commons';

@Injectable({
  providedIn: 'root',
})
export class ApiPokemonPeopleService {
  constructor(private _http: HttpClient) {}
}
