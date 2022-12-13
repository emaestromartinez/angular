import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiQuotesQOD } from './qod.interface';
import { quotesBaseUrl } from './commons';

@Injectable({
  providedIn: 'root',
})
export class ApiQuotesService {
  constructor(private _http: HttpClient) {}

  getQOD(
    params?: ApiQuotesQOD.Get.Request.Params
  ): Observable<ApiQuotesQOD.Get.Response.Body> {
    const dataParams = {
      ...params,
      // category: '',
      // language: '',
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    return this._http
      .get<ApiQuotesQOD.Get.Response.Body>(`${quotesBaseUrl}/qod`, {
        params: httpParams,
      })
      .pipe(catchError((error) => throwError(error)));
  }
}
