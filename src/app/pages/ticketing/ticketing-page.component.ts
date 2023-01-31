import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEvent, IEventInfo } from './ticketing-page.interface';
import { TicketingPageService } from './ticketing-page.service';

@Component({
  selector: 'app-ticketing-page',
  templateUrl: './ticketing-page.component.html',
})
export class TicketingPageComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _ticketingPageService: TicketingPageService
  ) {}

  events: IEvent[];
  selectedEvent: IEvent | undefined;
  selectedEventInfo: IEventInfo | undefined;

  currentUrl: string;
  detailsId: number;

  isLoading = false;
  eventDetailsNotFound = false;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getEvents();
    this.updateCurrentRoute();

    const routeChangeSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute();
        this.getEvents();
      }
    });
    this.subscriptions.push(routeChangeSub);
  }

  getEvents() {
    if (!this.detailsId) {
      this._ticketingPageService.getEvents().subscribe((events) => {
        this.events = events;
        this.updateCurrentRoute();
      });
    }
  }
  getEventInfo(detailsId?: string) {
    console.log('Gettin Event Info: ', this.detailsId);
    this._ticketingPageService.getEventInfo(detailsId).subscribe(
      (event) => {
        console.log('Got Event Info: ', this.detailsId);
        this.selectedEventInfo = event;
        this.updateCurrentRoute();
      },
      (error) => {
        this.eventDetailsNotFound = true;
      }
    );
  }

  updateCurrentRoute() {
    // We need to know if the current ID is the same as before or if it's new;
    const newId = this.detailsId !== this._route.snapshot.params['detailsId'];

    this.currentUrl = this._route.snapshot.params['slug'];
    this.detailsId = this._route.snapshot.params['detailsId'];
    if (this._route.snapshot.params['detailsId'] && newId) {
      this.getEventInfo(this.detailsId.toString());
    }
    if (!this.detailsId) {
      this.selectedEvent = undefined;
    } else if (!this.selectedEvent && this.events) {
      this.selectedEvent = this.events.find((event) => {
        return event.id === this.detailsId.toString();
      });
    }
  }

  openDetails(event: IEvent) {
    this.selectedEvent = event;
    if (!this.isLoading) {
      this._router.navigate([event.id], { relativeTo: this._route });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
