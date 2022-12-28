/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExampleFormComponent } from './example-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'src/app/components/shared/checkbox/checkbox.module';
import { InputEmailModule } from 'src/app/components/shared/input-email/input-email.module';
import { InputModule } from 'src/app/components/shared/input/input.module';
import { SelectModule } from 'src/app/components/shared/select/select.module';
import { ExampleFormRoutingModule } from './example-form-routing.module';
import { ExampleFormService } from './example-form.service';

describe('ExampleFormComponent', () => {
  let component: ExampleFormComponent;
  let fixture: ComponentFixture<ExampleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleFormComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        ExampleFormRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        InputEmailModule,
        SelectModule,
        CheckboxModule,
      ],
      providers: [ExampleFormService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate that empty form is invalid', () => {
    component.form.setValue({
      username: '',
      email: '',
      phone: '',
      postalCode: '',
      carBrand: '',
      termsAndConditions: '',
    });
    expect(component.form.valid).toEqual(false);
  });

  it('should validate that a properly filled form is valid', fakeAsync(() => {
    component.form.setValue({
      username: 'Usernamo',
      email: 'correctEmail@gmail.com',
      phone: '654 65 46 54',
      postalCode: '00000',
      carBrand: {
        value: 'doritos',
        name: 'Doritos',
      },
      termsAndConditions: true,
    });
    fixture.detectChanges();
    tick(3300);
    fixture.detectChanges();
    console.log(component.username.valid);
    console.log(component.email.valid);
    console.log(component.phone.valid);
    console.log(component.postalCode.valid);
    console.log(component.carBrand.valid);
    console.log(component.termsAndConditions.valid);
    expect(component.postalCode.valid).toEqual(true);
  }));

  it('should validate that username form control is required', () => {
    component.username.setValue('');
    expect(component.username.valid).toEqual(false);
    component.username.setValue('Username');
    expect(component.username.valid).toEqual(true);
  });
  it('should validate that email form control is required', () => {
    component.email.setValue('');
    expect(component.email.valid).toEqual(false);
    component.email.setValue('email@email.com');
    expect(component.email.valid).toEqual(true);
  });
  it('should validate that email pattern is properly validated', () => {
    component.email.setValue('email@email');
    expect(component.email.valid).toEqual(false);
    component.email.setValue('emailemailemail');
    expect(component.email.valid).toEqual(false);
    component.email.setValue('@emaisd.com');
    expect(component.email.valid).toEqual(false);
    component.email.setValue('@emaisdasdasdcom');
    expect(component.email.valid).toEqual(false);

    component.email.setValue('correct-email@gmail.com');
    expect(component.email.valid).toEqual(true);
  });

  it('should validate that phone form control is required', () => {
    component.phone.setValue('');
    expect(component.phone.valid).toEqual(false);
    component.phone.setValue('654 65 46 54');
    expect(component.phone.valid).toEqual(true);
  });
  it('should validate that phone pattern is properly validated', () => {
    component.phone.setValue('dawdasdasdaw');
    expect(component.phone.valid).toEqual(false);
    component.phone.setValue('123ugy123gjh1232j1h2');
    expect(component.phone.valid).toEqual(false);

    component.phone.setValue('6565654646');
    expect(component.phone.valid).toEqual(true);
    component.phone.setValue('+34 645645645');
    expect(component.phone.valid).toEqual(true);
    component.phone.setValue('+34 (127) 645645645');
    expect(component.phone.valid).toEqual(true);
  });

  it('should validate that termsAndConditions form control is requiredTrue', () => {
    component.termsAndConditions.setValue(false);
    expect(component.termsAndConditions.valid).toEqual(false);
    component.termsAndConditions.setValue(true);
    expect(component.termsAndConditions.valid).toEqual(true);
  });

  it('should validate that carBrand form control is required', () => {
    component.carBrand.setValue({
      value: 'doritos',
      name: 'Doritos',
    });
    expect(component.carBrand.valid).toEqual(true);
    component.carBrand.setValue('');
    expect(component.carBrand.valid).toEqual(false);
  });
});
