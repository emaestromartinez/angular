import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { STAR_WARS_ROUTES_URL } from '../star-wars-page.constants';
import { PeopleList, People } from '../star-wars-page.interface';
import { StarWarsPageService } from '../star-wars-page.service';

@Component({
  selector: 'app-star-wars-people-list',
  templateUrl: './star-wars-people-list.component.html',
})
export class StarWarsPeopleListComponent implements OnInit, OnChanges {
  @Input() peopleList: PeopleList;

  columnsToDisplay = ['title', 'gender', 'homeworld', 'height'];

  starWarsRoutesURL = STAR_WARS_ROUTES_URL;

  // Pagination
  pageEvent: PageEvent;

  length: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;
  // PaginationEnd

  @ViewChild(MatTable) table: MatTable<People>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<People>;

  isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _starWarsPageService: StarWarsPageService
  ) {}

  ngOnInit() {
    this.length = this.peopleList?.pagination.count;
    this.dataSource = new MatTableDataSource<People>(
      this.peopleList?.people.slice()
    );
  }

  ngOnChanges() {
    this.replacePeopleList();
  }

  replacePeopleList(data?: People[]) {
    if (data) {
      if (this.dataSource) {
        this.dataSource.data = data;
      } else {
        this.dataSource = new MatTableDataSource<People>(
          this.peopleList?.people.slice()
        );
      }
    }

    this.table?.renderRows();
  }

  showPersonDetails(person: People) {
    if (!this.isLoading) {
      this._router.navigate([person.personId], { relativeTo: this._route });
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    if (event.previousPageIndex || event.previousPageIndex === 0) {
      this._starWarsPageService.pagination.next({
        count: event.length,
        next: event.pageIndex,
        previous: event.previousPageIndex,
      });
      this.isLoading = true;
      this._starWarsPageService
        .getNewPagePeople()
        .subscribe((newPageValues) => {
          this.replacePeopleList(newPageValues.people);
          this.isLoading = false;
        });
    }
  }
}
