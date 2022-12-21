import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiStarWarsFilmsService } from 'src/app/api/star-wars/films.service';
import { Film, FilmDetails } from './star-wars-page.interface';

@Injectable({
  providedIn: 'root',
})
export class StarWarsPageService {
  constructor(private _apiStarWarsFilmsService: ApiStarWarsFilmsService) {}

  getFilmDetails(detailsId: number): Observable<FilmDetails> {
    return this._apiStarWarsFilmsService.getFilmDetails(detailsId).pipe(
      map((result) => {
        const film = {
          filmId: detailsId,
          title: result.title,
          director: result.director,
          producer: result.producer,
          release_date: result.release_date,
          opening_crawl: result.opening_crawl,
        } as FilmDetails;

        return film;
      })
    );
  }
  getFilms(): Observable<Film[]> {
    return this._apiStarWarsFilmsService.getFilms().pipe(
      map((result) => {
        const films = result.results.map((film) => {
          return {
            title: film.title,
            director: film.director,
            filmId: film.episode_id,
          } as Film;
        });
        return films;
      })
    );
  }
}
