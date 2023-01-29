import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticketing-page',
  templateUrl: './ticketing-page.component.html',
})
export class TicketingPageComponent implements OnInit, OnDestroy {
  constructor(private _router: Router, private _route: ActivatedRoute) {}

  currentUrl: string;
  detailsId: number;

  loading = false;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
