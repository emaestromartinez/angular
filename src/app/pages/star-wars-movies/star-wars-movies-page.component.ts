import { NgSwitch } from '@angular/common';
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

  subscriptions: Subscription[] = [];

  showFilmDetails(film: Film) {}

  ngOnInit(): void {
    this.currentUrl = this._route.snapshot.params['slug'];
    this.detailsId = this._route.snapshot.params['detailsId'];

    console.log('slug', this._route.snapshot.params['slug']);
    console.log('detailsId', this._route.snapshot.params['detailsId']);

    this.getInformation();
    const routeChangeSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('slug2', this._route.snapshot.params['slug']);
        console.log('detailsId2', this._route.snapshot.params['detailsId']);
        // this.currentUrl = fullUrlSplit.pop();
      }
    });
    this.subscriptions.push(routeChangeSub);
  }

  getInformation() {
    switch (this.currentUrl) {
      case 'films':
        if (!this.films) {
          const getFilmsSub = this._starWarsMoviesPageService
            .getFilms()
            .subscribe((films) => {
              this.films = films;
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
