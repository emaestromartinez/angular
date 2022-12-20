import { ExampleFormService } from './example-form.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/components/input/input.module';
import { SelectModule } from 'src/app/components/select/select.module';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { ExampleFormComponent } from './example-form.component';
import { ExampleFormRoutingModule } from './example-form-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExampleFormRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    SelectModule,
    CheckboxModule,
  ],
  declarations: [ExampleFormComponent],
  providers: [ExampleFormService],
  exports: [ExampleFormComponent],
})
export class ExampleFormModule {}
