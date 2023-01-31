import { ticketingBaseUrl } from './commons';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiTicketingEvent, ApiTicketingList } from './ticketing.interface';

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
    // const url = `/assets/events.json`; // Working!
    const url = `/app/api/ticketing/ticketing-assets/data/events.json`;

    return (
      this._http
        // .get<ApiTicketingList.Get.Response.Body[]>(url)
        .get<any>(url)
        .pipe(catchError((error) => throwError(error)))
    );
  }

  getEventInfo(
    detailsId?: string,
    params?: ApiTicketingEvent.Get.Request.Params
  ): Observable<ApiTicketingEvent.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });

    const url = `/app/api/ticketing/ticketing-assets/data/event-info-${detailsId}.json`;

    return this._http
      .get<ApiTicketingEvent.Get.Response.Body>(url)
      .pipe(catchError((error) => throwError(error)));
  }
}
