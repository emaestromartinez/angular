import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ApiStarWarsPeopleDetails,
  ApiStarWarsPeople,
} from './people.interface';
import { starWarsBaseUrl } from './commons';

@Injectable({
  providedIn: 'root',
})
export class ApiStarWarsPeopleService {
  constructor(private _http: HttpClient) {}

  getPeople(
    params?: ApiStarWarsPeople.Get.Request.Params
  ): Observable<ApiStarWarsPeople.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    return this._http
      .get<ApiStarWarsPeople.Get.Response.Body>(`${starWarsBaseUrl}/people`, {
        params: httpParams,
      })
      .pipe(catchError((error) => throwError(error)));
  }

  getPeopleDetails(
    peopleId: number,
    params?: ApiStarWarsPeople.Get.Request.Params
  ): Observable<ApiStarWarsPeopleDetails.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    return this._http
      .get<ApiStarWarsPeopleDetails.Get.Response.Body>(
        `${starWarsBaseUrl}/people/${peopleId}`,
        {
          params: httpParams,
        }
      )
      .pipe(catchError((error) => throwError(error)));
  }
}
