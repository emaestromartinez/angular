import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film, FilmDetails, People } from './star-wars-page.interface';
import { StarWarsPageService } from './star-wars-page.service';

@Component({
  selector: 'app-star-wars-page',
  templateUrl: './star-wars-page.component.html',
})
export class StarWarsPageComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _starWarsPageService: StarWarsPageService
  ) {}

  initialCall = true;

  films: Film[];
  selectedFilm: FilmDetails;
  people: People[];

  currentUrl: string;
  detailsId: number;

  loading = false;
  subscriptions: Subscription[] = [];

  showFilmDetails(filmId: number) {
    this._router.navigate([filmId], { relativeTo: this._route });
  }

  ngOnInit(): void {
    this.updateCurrentRoute();
    this.getInformation();

    const routeChangeSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
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
        if (!this.detailsId) {
          if (!this.films) {
            this.loading = true;
            const getFilmsSub = this._starWarsPageService
              .getFilms()
              .subscribe((films) => {
                this.films = films;
                this.loading = false;
              });
            this.subscriptions.push(getFilmsSub);
          }
        } else if (this.detailsId) {
          if (this.detailsId !== this.selectedFilm?.filmId) {
            this.getFilmDetails(this.detailsId);
          }
        }
        break;
      case 'people':
        if (!this.detailsId) {
          if (!this.people) {
            this.loading = true;
            const getFilmsSub = this._starWarsPageService
              .getPeople()
              .subscribe((people) => {
                this.people = people;
                this.loading = false;
              });
            this.subscriptions.push(getFilmsSub);
          }
        } else if (this.detailsId) {
          if (this.detailsId !== this.selectedFilm?.filmId) {
            // this.getPeopleDetails(this.detailsId);
          }
        }
        break;

      default:
        break;
    }
  }

  getFilmDetails(detailsId: number) {
    this.loading = true;
    const getFilmsSub = this._starWarsPageService
      .getFilmDetails(detailsId)
      .subscribe((film) => {
        this.selectedFilm = film;
        this.loading = false;
      });
    this.subscriptions.push(getFilmsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
