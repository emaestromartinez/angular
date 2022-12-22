import { ApiStarWarsFilmsService } from '../../api/star-wars/films.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsPageComponent } from './star-wars-page.component';
import { StarWarsPageRoutingModule } from './star-wars-page-routing.module';
import { RouterModule } from '@angular/router';
import { StarWarsPageService } from './star-wars-page.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { ApiStarWarsPeopleService } from 'src/app/api/star-wars/people.service';
import { ApiStarWarsPlanetsService } from 'src/app/api/star-wars/planets.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StarWarsPageRoutingModule,
    LoaderModule,
  ],
  declarations: [StarWarsPageComponent],
  providers: [
    StarWarsPageService,
    ApiStarWarsFilmsService,
    ApiStarWarsPeopleService,
    ApiStarWarsPlanetsService,
  ],
})
export class StarWarsPageModule {}
