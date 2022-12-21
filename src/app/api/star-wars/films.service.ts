import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiStarWarsFilmDetails, ApiStarWarsFilms } from './films.interface';
import { starWarsBaseUrl } from './commons';

@Injectable({
  providedIn: 'root',
})
export class ApiStarWarsFilmsService {
  constructor(private _http: HttpClient) {}

  getFilmDetails(
    filmId: number,
    params?: ApiStarWarsFilms.Get.Request.Params
  ): Observable<ApiStarWarsFilmDetails.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    return this._http
      .get<ApiStarWarsFilmDetails.Get.Response.Body>(
        `${starWarsBaseUrl}/films/${filmId}`,
        {
          params: httpParams,
        }
      )
      .pipe(catchError((error) => throwError(error)));
  }

  getFilms(
    params?: ApiStarWarsFilms.Get.Request.Params
  ): Observable<ApiStarWarsFilms.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    return this._http
      .get<ApiStarWarsFilms.Get.Response.Body>(`${starWarsBaseUrl}/films`, {
        params: httpParams,
      })
      .pipe(catchError((error) => throwError(error)));
  }
}
