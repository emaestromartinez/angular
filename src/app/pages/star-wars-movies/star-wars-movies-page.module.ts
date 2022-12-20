import { ApiStarWarsFilmsService } from './../../api/star-wars/films.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsMoviesPageComponent } from './star-wars-movies-page.component';
import { StarWarsMoviesPageRoutingModule } from './star-wars-movies-page-routing.module';
import { RouterModule } from '@angular/router';
import { StarWarsMoviesPageService } from './star-wars-movies-page.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StarWarsMoviesPageRoutingModule,
  ],
  declarations: [StarWarsMoviesPageComponent],
  providers: [StarWarsMoviesPageService, ApiStarWarsFilmsService],
})
export class StarWarsMoviesPageModule {}
