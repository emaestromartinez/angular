import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
import { ApiStarWarsFilmsService } from 'src/app/api/star-wars/films.service';
import {
  ApiStarWarsPeople,
  ApiStarWarsPeopleDetails,
} from 'src/app/api/star-wars/people.interface';
import { ApiStarWarsPeopleService } from 'src/app/api/star-wars/people.service';
import {
  ApiStarWarsPlanetDetails,
  ApiStarWarsPlanets,
} from 'src/app/api/star-wars/planets.interface';
import { ApiStarWarsPlanetsService } from 'src/app/api/star-wars/planets.service';
import {
  Film,
  FilmDetails,
  People,
  PeopleDetails,
  PlanetDetails,
} from './star-wars-page.interface';

@Injectable({
  providedIn: 'root',
})
export class StarWarsPageService {
  constructor(
    private _http: HttpClient,
    private _apiStarWarsFilmsService: ApiStarWarsFilmsService,
    private _apiStarWarsPeopleService: ApiStarWarsPeopleService,
    private _apiStarWarsPlanetsService: ApiStarWarsPlanetsService
  ) {}

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

  getPlanetDetails(detailsId: number): Observable<PlanetDetails> {
    return this._apiStarWarsPlanetsService.getPlanetDetails(detailsId).pipe(
      map((result) => {
        const planet = {
          title: result.name,
          population: result.population,
          terrain: result.terrain,
          climate: result.climate,
          diameter: result.diameter,
        } as PlanetDetails;

        return planet;
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

  getPeople(): Observable<People[]> {
    return this._apiStarWarsPeopleService.getPeople().pipe(
      mergeMap((result) => {
        const homeworldSubscriptionArray = [];
        for (let index = 0; index < result.results.length; index++) {
          homeworldSubscriptionArray.push(
            this._http.get<ApiStarWarsPlanets.Get.Response.Results>(
              result.results[index].homeworld
            )
          );
        }
        return forkJoin(homeworldSubscriptionArray).pipe(
          map((homeworld) => {
            const people = result.results.map(
              (
                people: ApiStarWarsPeople.Get.Response.Results,
                index: number
              ) => {
                const personUrlSplit = people.url.split('/');
                const personId = personUrlSplit[personUrlSplit.length - 2];
                return {
                  title: people.name,
                  gender: people.gender,
                  homeworld: homeworld[index].name,
                  height:
                    +people.height > 200
                      ? `High (${people.height})`
                      : +people.height < 100
                      ? `Low (${people.height})`
                      : `Medium (${people.height})`,
                  personId: personId,
                } as People;
              }
            );
            return people;
          })
        );
      })
    );
  }

  getPeopleDetails(detailsId: number): Observable<PeopleDetails> {
    return this._apiStarWarsPeopleService.getPeopleDetails(detailsId).pipe(
      mergeMap((result) => {
        return this._http
          .get<ApiStarWarsPlanetDetails.Get.Response.Body>(result.homeworld)
          .pipe(
            map((homeworld) => {
              console.log('homeworld', homeworld);
              const person = {
                title: result.name,
                gender: result.gender,
                birth_year: result.birth_year,
                eye_color: result.eye_color,
                hair_color: result.hair_color,
                height: result.height,
                skin_color: result.skin_color,
                homeworld: homeworld.name,
                personId: detailsId.toString(),
              } as PeopleDetails;

              return person;
            })
          );
      })
    );
  }
  // getPeopleDetails(detailsId: number): Observable<PeopleDetails> {
  //   return this._apiStarWarsPeopleService.getPeopleDetails(detailsId).pipe(
  //     map((result) => {
  //       const person = {
  //         title: result.name,
  //         gender: result.gender,
  //         birth_year: result.birth_year,
  //         eye_color: result.eye_color,
  //         hair_color: result.hair_color,
  //         height: result.height,
  //         skin_color: result.skin_color,
  //         homeworld: result.homeworld,
  //         personId: detailsId.toString(),
  //       } as PeopleDetails;

  //       return person;
  //     })
  //   );
  // }
}
