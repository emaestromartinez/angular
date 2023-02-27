import { GetFriendsGroup } from './../../../mocks/payments/person';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiPaymentsFriendsGroup } from './payments.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiPaymentsService {
  constructor(private _http: HttpClient) {}

  getFriendsGroup(
    id: string,
    params?: ApiPaymentsFriendsGroup.Get.Request.Params
  ): Observable<ApiPaymentsFriendsGroup.Get.Response.Body> {
    const dataParams = {
      ...params,
    };
    let httpParams = new HttpParams({
      fromObject: dataParams as {
        [param: string]: string | ReadonlyArray<string>;
      },
    });
    const url = `/friends-group/${id}`;

    return this._http
      .get<ApiPaymentsFriendsGroup.Get.Response.Body>(url)
      .pipe(catchError((error) => throwError(error)));
  }
}
