import { ApiStarWarsFilmsService } from '../../api/star-wars/films.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsPageComponent } from './star-wars-page.component';
import { StarWarsPageRoutingModule } from './star-wars-page-routing.module';
import { RouterModule } from '@angular/router';
import { StarWarsPageService } from './star-wars-page.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from 'src/app/components/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StarWarsPageRoutingModule,
    LoaderModule,
  ],
  declarations: [StarWarsPageComponent],
  providers: [StarWarsPageService, ApiStarWarsFilmsService],
})
export class StarWarsPageModule {}
