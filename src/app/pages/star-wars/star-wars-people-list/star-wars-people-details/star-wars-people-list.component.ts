import { Component, Input, OnInit } from '@angular/core';
import { STAR_WARS_ROUTES_URL } from '../../star-wars-page.constants';
import { People } from '../../star-wars-page.interface';

@Component({
  selector: 'app-star-wars-people-list',
  templateUrl: './star-wars-people-list.component.html',
})
export class StarWarsPeopleListComponent implements OnInit {
  @Input() peopleList: People[];

  starWarsRoutesURL = STAR_WARS_ROUTES_URL;

  constructor() {}

  ngOnInit() {}
}
