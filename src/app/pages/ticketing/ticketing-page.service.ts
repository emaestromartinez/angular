import { Injectable } from '@angular/core';
import { Observable, map, first } from 'rxjs';
import { ApiTicketingService } from 'src/app/api/ticketing/ticketing.service';
import { IEvent, IEventInfo } from './ticketing-page.interface';

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

  getEventInfo(detailsId?: string): Observable<IEventInfo> {
    return this._apiTicketingService.getEventInfo(detailsId).pipe(
      first(),
      map((event) => {
        return {
          event: {
            id: event.event.id,
            title: event.event.title,
            subtitle: event.event.subtitle,
            image: event.event.image,
          },
        } as IEventInfo;
      })
    );
  }
}
