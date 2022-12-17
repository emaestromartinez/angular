import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  StarWarsMoviesPageService,
  Film,
} from './star-wars-movies-page.service';

@Component({
  selector: 'app-star-wars-movies-page',
  templateUrl: './star-wars-movies-page.component.html',
})
export class StarWarsMoviesPageComponent implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _starWarsMoviesPageService: StarWarsMoviesPageService
  ) {}

  films: Film[];

  currentUrl: string | undefined;

  showFilmDetails(film: Film) {}

  ngOnInit(): void {
    this.currentUrl = this._router.url.split('/').pop();
    console.log('current route: ', this.currentUrl);
    console.log('Caracolillo', this._route.snapshot.params['slug']);

    if (this.currentUrl?.includes('films')) {
      this._starWarsMoviesPageService.getFilms().subscribe((films) => {
        this.films = films;
      });
    }

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fullUrlSplit = event.url.split('/');
        this.currentUrl = fullUrlSplit.pop();
        console.log('current route: ', this.currentUrl);
      }
    });
  }
}
