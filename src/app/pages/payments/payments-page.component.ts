import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
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

  ngOnInit() {}
}
