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
  selectedEventInfo: IEventInfo;

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
      });
    }
  }
  getEventInfo(detailsId?: string) {
    this._ticketingPageService.getEventInfo(detailsId).subscribe(
      (event) => {
        this.selectedEventInfo = event;
      },
      (error) => {
        this.eventDetailsNotFound = true;
      }
    );
  }

  updateCurrentRoute() {
    // We need to know if the current ID is the same as before or if it's new;

    this.currentUrl = this._route.snapshot.params['slug'];
    this.detailsId = this._route.snapshot.params['detailsId'];
    if (this.detailsId) {
      this.getEventInfo(this.detailsId.toString());
    }
  }

  openDetails(event: IEvent) {
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
