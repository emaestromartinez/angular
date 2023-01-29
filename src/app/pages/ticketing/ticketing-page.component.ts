import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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

  ngOnInit(): void {
    this.updateCurrentRoute();
    this.getInformation();

    // const eventsSubs = this.

    const routeChangeSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute();
        this.getInformation();
      }
    });
    this.subscriptions.push(routeChangeSub);
  }

  getInformation() {}
  updateCurrentRoute() {
    this.currentUrl = this._route.snapshot.params['slug'];
    this.detailsId = this._route.snapshot.params['detailsId'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
