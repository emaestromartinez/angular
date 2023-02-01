import { Injectable } from '@angular/core';
import { Observable, map, first, BehaviorSubject } from 'rxjs';
import { ApiTicketingService } from 'src/app/api/ticketing/ticketing.service';
import { CartEvent, IEvent, IEventInfo } from './ticketing-page.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketingPageService {
  constructor(private _apiTicketingService: ApiTicketingService) {}

  private readonly _cart = new Map<string, CartEvent[]>();
  private readonly _cart$ = new BehaviorSubject<Map<string, CartEvent[]>>(
    this._cart
  );

  get cart$(): Observable<Map<string, CartEvent[]>> {
    return this._cart$.asObservable();
  }

  addEvent(eventName: string, date: string, tickets: number) {
    let event = this._cart.get(eventName);
    if (!event) {
      event = [];
      this._cart.set(eventName, event);
    }
    let dateIndex = event.findIndex((d) => {
      return d.date === date;
    });

    if (dateIndex === -1) {
      event.push({ date, tickets });
    } else {
      event[dateIndex].tickets = tickets;
    }
  }
  updateCart(eventTitle: string) {
    console.log('this._cart', this._cart);
    const cartEvent = this._cart.get(eventTitle);
    if (cartEvent) {
      const notEmptyIndex = cartEvent.findIndex((event) => {
        return event.tickets > 0;
      });
      if (notEmptyIndex === -1) this._cart.delete(eventTitle);
    }
    this._cart$.next(this._cart);
  }

  removeEvent(eventName: string, date: string) {
    const event = this._cart.get(eventName);
    if (event) {
      const dateIndex = event.findIndex((d) => d.date === date);
      if (dateIndex !== -1) {
        event.splice(dateIndex, 1);
        if (event.length === 0) {
          this._cart.delete(eventName);
        }
        this._cart$.next(this._cart);
      }
    }
  }

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
        const sessions = event.sessions.map((session) => {
          return { date: session.date, availability: session.availability };
        });
        return {
          event: {
            id: event.event.id,
            title: event.event.title,
            subtitle: event.event.subtitle,
            image: event.event.image,
          },
          sessions: sessions,
        } as IEventInfo;
      })
    );
  }
}
