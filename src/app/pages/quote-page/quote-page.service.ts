import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiQuotesService } from 'src/app/api/quotes/qod.service';

export interface Quote {
  author: string;
  quote: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuotePageService {
  constructor(private _apiQuotesService: ApiQuotesService) {}

  getQuoteOfTheDay(): Observable<Quote> {
    return this._apiQuotesService.getQOD().pipe(
      map((result) => {
        return {
          author: result.contents.quotes[0].author,
          quote: result.contents.quotes[0].quote,
          image: result.contents.quotes[0].image,
        };
      })
    );
  }
}
