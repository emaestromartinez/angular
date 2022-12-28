/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEmailComponent } from './input-email.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExampleFormService } from 'src/app/pages/example-form/example-form.service';
import { HttpClient } from '@angular/common/http';

describe('InputEmailComponent', () => {
  let component: InputEmailComponent;
  let fixture: ComponentFixture<InputEmailComponent>;

  let _exampleFormService: ExampleFormService;
  let _exampleFormServiceSpy: jasmine.SpyObj<ExampleFormService>;

  beforeEach(async(() => {
    const exampleFormServiceSpy = jasmine.createSpyObj('ExampleFormService', [
      'createEmailValidator',
    ]);

    TestBed.configureTestingModule({
      declarations: [InputEmailComponent],
      providers: [{ ExampleFormService, useValue: exampleFormServiceSpy }],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEmailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
