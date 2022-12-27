/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
