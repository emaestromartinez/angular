import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/components/shared/header/header.service';
import { STAR_WARS_ROUTES_URL } from './star-wars-page.constants';
import {
  Film,
  FilmDetails,
  People,
  PeopleDetails,
  PeopleList,
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

  starWarsRoutesURL = STAR_WARS_ROUTES_URL;
  initialCall = true;

  lastSearch: string;

  films: Film[];
  filteredFilms: Film[] = [];
  selectedFilm: FilmDetails;
  isFilmsFiltered = false;

  peopleList: PeopleList;
  filteredPeople: PeopleList;
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
        this.refreshInformation();
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
        if (!this.detailsId) {
          this.isFilmsFiltered = true;
          this.filteredFilms = this.films?.filter((film) => {
            if (
              film.title.toUpperCase().includes(this.lastSearch.toUpperCase())
            )
              return true;
            else return false;
          });
        }
        break;

      case 'people':
        if (!this.detailsId) {
          this.isPeopleFiltered = true;
          this.filteredPeople.people = this.peopleList?.people?.filter(
            (people) => {
              if (
                people.title
                  .toUpperCase()
                  .includes(this.lastSearch.toUpperCase())
              )
                return true;
              else return false;
            }
          );
          this.filteredPeople.pagination = this.peopleList?.pagination;
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
          if (!this.films || this.isFilmsFiltered) {
            this.loading = true;
            const getFilmsSub = this._starWarsPageService
              .getFilms()
              .subscribe((films) => {
                this.films = films;
                this.filteredFilms = films;
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
          if (!this.peopleList?.people || this.isPeopleFiltered) {
            this.loading = true;
            const getPeopleSub = this._starWarsPageService
              .getPeople()
              .subscribe((peopleList) => {
                this.peopleList = peopleList;

                this.filteredPeople = {
                  people: peopleList.people,
                  pagination: peopleList.pagination,
                };

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
  refreshInformation() {
    this.filteredFilms = this.films;
    this.filteredPeople.people = this.peopleList?.people;
    this.filteredPeople.pagination = this.peopleList?.pagination;
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
