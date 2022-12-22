import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ApiStarWarsPlanetDetails,
  ApiStarWarsPlanets,
} from './planets.interface';
import { starWarsBaseUrl } from './commons';

@Injectable({
  providedIn: 'root',
})
export class ApiStarWarsPlanetsService {
  constructor(private _http: HttpClient) {}

  getPlanetDetails(
    planetId: number,
    params?: ApiStarWarsPlanetDetails.Get.Request.Params
  ): Observable<ApiStarWarsPlanetDetails.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    return this._http
      .get<ApiStarWarsPlanetDetails.Get.Response.Body>(
        `${starWarsBaseUrl}/planets/${planetId}`,
        {
          params: httpParams,
        }
      )
      .pipe(catchError((error) => throwError(error)));
  }

  getPlanet(
    params?: ApiStarWarsPlanets.Get.Request.Params
  ): Observable<ApiStarWarsPlanets.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    return this._http
      .get<ApiStarWarsPlanets.Get.Response.Body>(`${starWarsBaseUrl}/planets`, {
        params: httpParams,
      })
      .pipe(catchError((error) => throwError(error)));
  }
}
