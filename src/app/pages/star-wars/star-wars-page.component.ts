import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SWHeaderService } from 'src/app/components/shared/sw-header/sw-header.service';
import { STAR_WARS_ROUTES_URL } from './star-wars-page.constants';
import {
  Film,
  FilmDetails,
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
    private _SWHeaderService: SWHeaderService
  ) {}

  unsubscribe$: Subject<void> = new Subject<void>();

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

  showFilmDetails(filmId: number) {
    this._router.navigate([filmId], { relativeTo: this._route });
  }

  ngOnInit(): void {
    this.updateCurrentRoute();

    this.getInformation();

    this._SWHeaderService.searchFilter$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lastSearch) => {
        if (lastSearch) {
          this.lastSearch = lastSearch;
          this.filterList();
        } else {
          this.refreshInformation();
        }
      });

    const routeChangeSub = this._router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateCurrentRoute();
          this.getInformation();
        }
      });
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
          this.filteredPeople.pagination = this.peopleList?.pagination;
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
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((films) => {
                this.films = films;
                this.filteredFilms = films;
                this.loading = false;
              });
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
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((peopleList) => {
                this.peopleList = peopleList;

                this.filteredPeople = {
                  people: peopleList.people,
                  pagination: peopleList.pagination,
                };

                this.loading = false;
              });
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
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((film) => {
        this.selectedFilm = film;
        this.loading = false;
      });
  }

  getPeopleDetails(detailsId: number) {
    this.loading = true;
    const getPersonSub = this._starWarsPageService
      .getPeopleDetails(detailsId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((person) => {
        this.selectedPerson = person;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
