import { MainFormService } from './main-form.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './main-form-routing.module';
import { InputModule } from 'src/app/components/input/input.module';
import { MainFormComponent } from './main-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
  ],
  declarations: [MainFormComponent],
  providers: [MainFormService],
  exports: [MainFormComponent],
})
export class MainFormModule {}
