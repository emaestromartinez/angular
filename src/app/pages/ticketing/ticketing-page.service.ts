import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiTicketingService } from 'src/app/api/ticketing/ticketing.service';
import { Film } from '../star-wars/star-wars-page.interface';
import { IEvent } from './ticketing-page.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketingPageService {
  constructor(
    private _http: HttpClient,
    private _apiTicketingService: ApiTicketingService
  ) {}

  getEvents(): Observable<IEvent[]> {
    return this._apiTicketingService.getEvents().pipe(
      map((result) => {
        const events = result.map((film) => {
          return {
            id: '',
            title: '',
            subtitle: '',
            image: '',
            place: '',
            startDate: '',
            endDate: '',
            description: '',
          } as IEvent;
        });
        return events;
      })
    );
  }
}
