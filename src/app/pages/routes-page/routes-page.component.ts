import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RoutesPageService } from './routes-page.service';

@Component({
  selector: 'app-routes-page',
  templateUrl: './routes-page.component.html',
})
export class RoutesPageComponent implements OnInit {
  constructor(
    private _routespageService: RoutesPageService,
    private _router: Router
  ) {}

  ngOnInit() {}
}
