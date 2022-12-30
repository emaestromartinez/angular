import { ForbiddenPageService } from './forbidden-page.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ForbiddenPageComponent } from './forbidden-page.component';
import { ForbiddenPageRoutingModule } from './forbidden-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ForbiddenPageRoutingModule,
    RouterModule,
  ],
  declarations: [ForbiddenPageComponent],
  providers: [ForbiddenPageService],
  exports: [ForbiddenPageComponent],
})
export class ForbiddenPageModule {}
