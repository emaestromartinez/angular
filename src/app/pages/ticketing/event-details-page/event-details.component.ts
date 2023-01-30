import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEvent } from '../ticketing-page.interface';
import { TicketingPageService } from '../ticketing-page.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _ticketingPageService: TicketingPageService
  ) {}

  @Input() selectedEvent: IEvent;

  isLoading = false;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {}

  openDetails(detailsID: string) {
    if (!this.isLoading) {
      this._router.navigate([detailsID], { relativeTo: this._route });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
