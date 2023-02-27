import { FriendsGroup } from './payments-page.interface';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PaymentsPageService } from './payments-page.service';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
})
export class PaymentsPageComponent implements OnInit {
  constructor(
    private _paymentsPageService: PaymentsPageService,
    private _router: Router
  ) {}

  unsubscribe$: Subject<void> = new Subject<void>();

  friendsGroup: FriendsGroup;

  loading = false;

  ngOnInit() {
    this.getFriendsGroup();
  }

  getFriendsGroup() {
    this.loading = true;
    const getPeopleSub = this._paymentsPageService
      .getFriendsGroup()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((friendsGroup) => {
        this.friendsGroup = friendsGroup;
        console.log('this.friendsGroup', this.friendsGroup);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
