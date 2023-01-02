import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { STAR_WARS_ROUTES_URL } from '../../star-wars-page.constants';
import { People } from '../../star-wars-page.interface';

@Component({
  selector: 'app-star-wars-people-list',
  templateUrl: './star-wars-people-list.component.html',
})
export class StarWarsPeopleListComponent implements OnInit, AfterViewInit {
  @Input() peopleList: People[];

  columnsToDisplay = ['title', 'gender', 'homeworld', 'height'];

  starWarsRoutesURL = STAR_WARS_ROUTES_URL;

  // Pagination
  pageEvent: PageEvent;

  length = 5;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  // PaginationEnd

  @ViewChild(MatTable) table: MatTable<People>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<People>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<People>(this.peopleList.slice());
  }

  handlePageEvent(event: PageEvent) {
    console.log('event', event);
    this.pageEvent = event;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
