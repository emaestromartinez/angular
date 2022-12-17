import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ApiStarWarsFilmsService } from 'src/app/api/star-wars/films.service';

export interface Film {
  filmId: number;
  title: string;
  director: string;
  year: string;
}

@Injectable({
  providedIn: 'root',
})
export class StarWarsMoviesPageService {
  constructor(private _apiStarWarsFilmsService: ApiStarWarsFilmsService) {}

  getFilms(): Observable<Film[]> {
    return this._apiStarWarsFilmsService.getFilms().pipe(
      map((result) => {
        const films = result.results.map((film) => {
          return {
            title: film.title,
            director: film.director,
            year: film.created,
            filmId: film.episode_id,
          } as Film;
        });
        return films;
      })
    );
  }
}
