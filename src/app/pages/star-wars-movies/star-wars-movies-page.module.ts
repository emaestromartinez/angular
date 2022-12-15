import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsMoviesPageComponent } from './star-wars-movies-page.component';
import { StarWarsMoviesPageRoutingModule } from './star-wars-movies-page-routing.module';
import { RouterModule } from '@angular/router';
import { StarWarsMoviesPageService } from './star-wars-movies-page.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiQuotesService } from 'src/app/api/quotes/qod.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StarWarsMoviesPageRoutingModule,
  ],
  declarations: [StarWarsMoviesPageComponent],
  providers: [StarWarsMoviesPageService, ApiQuotesService],
})
export class StarWarsMoviesPageModule {}
