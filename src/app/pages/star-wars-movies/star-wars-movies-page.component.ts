import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-star-wars-movies-page',
  templateUrl: './star-wars-movies-page.component.html',
})
export class StarWarsMoviesPageComponent implements OnInit {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  currentUrl: string | undefined;

  ngOnInit(): void {
    this.currentUrl = this._router.url.split('/').pop();
    console.log('current route: ', this.currentUrl);

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fullUrlSplit = event.url.split('/');
        this.currentUrl = fullUrlSplit.pop();
        console.log('current route: ', this.currentUrl);
      }
    });
  }
}
