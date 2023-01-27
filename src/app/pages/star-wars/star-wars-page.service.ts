import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  first,
  forkJoin,
  map,
  mergeMap,
  Observable,
} from 'rxjs';
import { ApiStarWarsFilmsService } from 'src/app/api/star-wars/films.service';
import { ApiStarWarsPeople } from 'src/app/api/star-wars/people.interface';
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
  PeopleList,
  PlanetDetails,
  SWPagination,
} from './star-wars-page.interface';

@Injectable({
  providedIn: 'root',
})
export class StarWarsPageService {
  pagination = new BehaviorSubject<SWPagination>({
    count: 0,
    next: 0,
    previous: 0,
  });

  homeworlds: Map<string, ApiStarWarsPlanets.Get.Response.Results> = new Map<
    string,
    ApiStarWarsPlanets.Get.Response.Results
  >();

  constructor(
    private _http: HttpClient,
    private _apiStarWarsFilmsService: ApiStarWarsFilmsService,
    private _apiStarWarsPeopleService: ApiStarWarsPeopleService,
    private _apiStarWarsPlanetsService: ApiStarWarsPlanetsService
  ) {}

  getNewPagePeople(): Observable<PeopleList> {
    return this.getPeople();
  }

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

  getPeople(): Observable<PeopleList> {
    return this._apiStarWarsPeopleService
      .getPeople({ page: this.pagination.value.next + 1 || 1 })
      .pipe(
        first(),
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
                  // We add the already mapped homeworld to the homeworlds map, which will allow for a cheap search later.
                  this.homeworlds.set(
                    homeworld[index]['url'],
                    homeworld[index]
                  );

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
              const peopleList = {
                people: people,
                pagination: {
                  count: +result.count,
                  next: +result.next,
                  previous: +result.previous,
                },
              };
              return peopleList;
            })
          );
        })
      );
  }

  getFilms(): Observable<Film[]> {
    return this._apiStarWarsFilmsService.getFilms().pipe(
      map((result) => {
        const films = result.results.map((film) => {
          const filmUrlSplit = film.url.split('/');
          const filmId = filmUrlSplit[filmUrlSplit.length - 2];
          return {
            title: film.title,
            director: film.director,
            filmId: filmId,
          } as Film;
        });
        return films;
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
}
