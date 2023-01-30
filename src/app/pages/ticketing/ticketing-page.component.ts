import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEvent } from './ticketing-page.interface';
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

  currentUrl: string;
  detailsId: number;

  isLoading = false;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getInformation();

    const routeChangeSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute();
        this.getInformation();
      }
    });
    this.subscriptions.push(routeChangeSub);
  }

  getInformation() {
    this._ticketingPageService.getEvents().subscribe((events) => {
      this.events = events;
      this.updateCurrentRoute();
    });
  }
  updateCurrentRoute() {
    this.currentUrl = this._route.snapshot.params['slug'];
    this.detailsId = this._route.snapshot.params['detailsId'];
    if (!this.detailsId) {
      this.selectedEvent = undefined;
    } else if (!this.selectedEvent) {
      this.selectedEvent = this.events.find((event) => {
        return event.id === this.detailsId.toString();
      });
    }
    console.log('this.detailsId', this.detailsId);
    console.log('this.selectedEvent', this.selectedEvent);
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
