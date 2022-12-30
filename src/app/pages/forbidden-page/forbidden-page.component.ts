import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ForbiddenPageService } from './forbidden-page.service';

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
})
export class ForbiddenPageComponent implements OnInit {
  constructor(
    private _forbiddenPageService: ForbiddenPageService,
    private _router: Router
  ) {}

  ngOnInit() {}
}
