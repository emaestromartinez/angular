import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const CAR_BRANDS_URL = 'https://www.doctori.com/coche/brands ';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _httpClient: HttpClient) {}

  getCardBrands(): Observable<any> {
    return this._httpClient
      .get<any>(CAR_BRANDS_URL, {
        headers: {
          Authentication:
            '48NkpNZfYNOaefCGCTXcWXngT7EEhiQf1hMxaXpE9TYqMqtcttIqbnxW0sQG1mM8ZgzeV0TEyhn',
        },
      })
      .pipe(catchError((error) => throwError(error)));
  }
}
