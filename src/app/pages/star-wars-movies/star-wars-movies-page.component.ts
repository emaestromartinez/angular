import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  StarWarsMoviesPageService,
  Film,
} from './star-wars-movies-page.service';

@Component({
  selector: 'app-star-wars-movies-page',
  templateUrl: './star-wars-movies-page.component.html',
})
export class StarWarsMoviesPageComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _starWarsMoviesPageService: StarWarsMoviesPageService
  ) {}

  films: Film[];

  currentUrl: string;
  detailsId: string;

  loading = false;
  subscriptions: Subscription[] = [];

  showFilmDetails(film: Film) {
    this._router.navigate([film.filmId], { relativeTo: this._route });
  }

  ngOnInit(): void {
    this.updateCurrentRoute();
    this.getInformation();
    const routeChangeSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // this.currentUrl = fullUrlSplit.pop();
        this.updateCurrentRoute();
        this.getInformation();
      }
    });
    this.subscriptions.push(routeChangeSub);
  }

  updateCurrentRoute() {
    this.currentUrl = this._route.snapshot.params['slug'];
    this.detailsId = this._route.snapshot.params['detailsId'];
  }

  getInformation() {
    switch (this.currentUrl) {
      case 'films':
        if (!this.films) {
          this.loading = true;
          const getFilmsSub = this._starWarsMoviesPageService
            .getFilms()
            .subscribe((films) => {
              this.films = films;
              this.loading = false;
            });
          this.subscriptions.push(getFilmsSub);
        }
        break;

      default:
        break;
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
