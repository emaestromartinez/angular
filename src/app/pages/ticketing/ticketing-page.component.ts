import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
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

  unsubscribe$: Subject<void> = new Subject<void>();

  events: IEvent[];
  selectedEventInfo: IEventInfo;

  currentUrl: string;
  detailsId: number;

  isLoading = false;
  eventDetailsNotFound = false;

  ngOnInit(): void {
    this.getEvents();
    this.updateCurrentRoute();

    const routeChangeSub = this._router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateCurrentRoute();
          this.getEvents();
        }
      });
  }

  getEvents() {
    if (!this.detailsId) {
      const getEventsSub = this._ticketingPageService
        .getEvents()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((events) => {
          this.events = events;
        });
    }
  }

  getEventInfo(detailsId?: string) {
    const getEventInfoSub = this._ticketingPageService
      .getEventInfo(detailsId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
