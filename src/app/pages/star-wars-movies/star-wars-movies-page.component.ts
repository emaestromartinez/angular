import { Component, OnInit } from '@angular/core';
import { StarWarsMoviesPageService } from './star-wars-movies-page.service';

@Component({
  selector: 'app-star-wars-movies-page',
  templateUrl: './star-wars-movies-page.component.html',
})
export class StarWarsMoviesPageComponent implements OnInit {
  constructor(private _starWarsMoviesPageService: StarWarsMoviesPageService) {}

  ngOnInit() {}
}
