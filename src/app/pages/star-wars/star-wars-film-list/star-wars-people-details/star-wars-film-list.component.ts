import { Component, Input, OnInit } from '@angular/core';
import { STAR_WARS_ROUTES_URL } from '../../star-wars-page.constants';
import { Film } from '../../star-wars-page.interface';

@Component({
  selector: 'app-star-wars-film-list',
  templateUrl: './star-wars-film-list.component.html',
})
export class StarWarsFilmListComponent implements OnInit {
  @Input() filmList: Film[];

  starWarsRoutesURL = STAR_WARS_ROUTES_URL;

  constructor() {}

  ngOnInit() {}
}
