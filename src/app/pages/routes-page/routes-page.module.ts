import { RoutesPageService } from './routes-page.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'src/app/components/shared/checkbox/checkbox.module';
import { RoutesPageComponent } from './routes-page.component';
import { RoutesPageRoutingModule } from './routes-page-routing.module';
import { InputModule } from 'src/app/components/shared/input/input.module';
import { SelectModule } from 'src/app/components/shared/select/select.module';
import { InputEmailModule } from 'src/app/components/shared/input-email/input-email.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RoutesPageRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    InputEmailModule,
    SelectModule,
    CheckboxModule,
  ],
  declarations: [RoutesPageComponent],
  providers: [RoutesPageService],
  exports: [RoutesPageComponent],
})
export class RoutesPageModule {}
