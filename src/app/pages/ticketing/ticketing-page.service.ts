import { Injectable } from '@angular/core';
import { Observable, map, first } from 'rxjs';
import { ApiTicketingService } from 'src/app/api/ticketing/ticketing.service';
import { IEvent } from './ticketing-page.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketingPageService {
  constructor(private _apiTicketingService: ApiTicketingService) {}

  getEvents(): Observable<IEvent[]> {
    return this._apiTicketingService.getEvents().pipe(
      first(),
      map((result) => {
        const events = result.map((event) => {
          return {
            id: event.id,
            title: event.title,
            subtitle: event.subtitle,
            image: event.image,
            place: event.place,
            startDate: event.startDate,
            endDate: event.endDate,
            description: event.description,
          } as IEvent;
        });
        return events;
      })
    );
  }
}
