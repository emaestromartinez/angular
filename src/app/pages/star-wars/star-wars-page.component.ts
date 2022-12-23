import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/components/header/header.service';
import {
  Film,
  FilmDetails,
  People,
  PeopleDetails,
} from './star-wars-page.interface';
import { StarWarsPageService } from './star-wars-page.service';

@Component({
  selector: 'app-star-wars-page',
  templateUrl: './star-wars-page.component.html',
})
export class StarWarsPageComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _starWarsPageService: StarWarsPageService,
    private _headerService: HeaderService
  ) {}

  initialCall = true;

  lastSearch: string;

  films: Film[];
  selectedFilm: FilmDetails;

  people: People[];
  selectedPerson: PeopleDetails;
  isPeopleFiltered = false;

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

    this._headerService.searchFilter$.subscribe((lastSearch) => {
      if (lastSearch) {
        this.lastSearch = lastSearch;
        this.filterList();
      } else {
        this.getInformation();
      }
    });

    const routeChangeSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoute();
        this.getInformation();
      }
    });
    this.subscriptions.push(routeChangeSub);
  }
  filterList() {
    switch (this.currentUrl) {
      case 'films':
        break;

      case 'people':
        if (!this.detailsId) {
          this.isPeopleFiltered = true;
          this.people = this.people.filter((people) => {
            if (
              people.title.toUpperCase().includes(this.lastSearch.toUpperCase())
            )
              return true;
            else return false;
          });
        }
        break;

      default:
        break;
    }
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
          if (!this.people || this.isPeopleFiltered) {
            this.loading = true;
            const getPeopleSub = this._starWarsPageService
              .getPeople()
              .subscribe((people) => {
                this.people = people;
                this.loading = false;
              });
            this.subscriptions.push(getPeopleSub);
          }
        } else if (this.detailsId) {
          if (this.detailsId !== +this.selectedPerson?.personId) {
            this.getPeopleDetails(this.detailsId);
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
  getPeopleDetails(detailsId: number) {
    this.loading = true;
    const getPersonSub = this._starWarsPageService
      .getPeopleDetails(detailsId)
      .subscribe((person) => {
        this.selectedPerson = person;
        this.loading = false;
      });
    this.subscriptions.push(getPersonSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
