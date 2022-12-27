import { StarWarsPeopleListComponent } from './star-wars-people-list/star-wars-people-details/star-wars-people-list.component';
import { StarWarsPeopleDetailsComponent } from './star-wars-people-detail/star-wars-people-details/star-wars-people-details.component';
import { ApiStarWarsFilmsService } from '../../api/star-wars/films.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsPageComponent } from './star-wars-page.component';
import { StarWarsPageRoutingModule } from './star-wars-page-routing.module';
import { RouterModule } from '@angular/router';
import { StarWarsPageService } from './star-wars-page.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiStarWarsPeopleService } from 'src/app/api/star-wars/people.service';
import { ApiStarWarsPlanetsService } from 'src/app/api/star-wars/planets.service';
import { LoaderModule } from 'src/app/components/shared/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StarWarsPageRoutingModule,
    LoaderModule,
  ],
  declarations: [
    StarWarsPageComponent,
    StarWarsPeopleDetailsComponent,
    StarWarsPeopleListComponent,
  ],
  providers: [
    StarWarsPageService,
    ApiStarWarsFilmsService,
    ApiStarWarsPeopleService,
    ApiStarWarsPlanetsService,
  ],
})
export class StarWarsPageModule {}
