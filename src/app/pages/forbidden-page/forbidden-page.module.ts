import { ForbiddenPageService } from './forbidden-page.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ForbiddenPageComponent } from './forbidden-page.component';
import { ForbiddenPageRoutingModule } from './forbidden-page-routing.module';

@NgModule({
  declarations: [ForbiddenPageComponent],
  exports: [ForbiddenPageComponent],
  imports: [CommonModule, ForbiddenPageRoutingModule, RouterModule],
  providers: [
    ForbiddenPageService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class ForbiddenPageModule {}
