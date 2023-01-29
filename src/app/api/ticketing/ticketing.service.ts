import { ticketingBaseUrl } from './commons';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiTicketingList } from './ticketing.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiTicketingService {
  constructor(private _http: HttpClient) {}

  getEvents(
    params?: ApiTicketingList.Get.Request.Params
  ): Observable<ApiTicketingList.Get.Response.Body[]> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    const url = `${ticketingBaseUrl}/events`;

    return this._http
      .get<ApiTicketingList.Get.Response.Body[]>(url, {
        params: httpParams,
      })
      .pipe(catchError((error) => throwError(error)));
  }
}
