import { Component, Input, OnInit } from '@angular/core';
import { FilmDetails } from '../../star-wars-page.interface';

@Component({
  selector: 'app-star-wars-film-details',
  templateUrl: './star-wars-film-details.component.html',
})
export class StarWarsFilmDetailsComponent implements OnInit {
  @Input() selectedFilm: FilmDetails;

  constructor() {}

  ngOnInit() {}
}
