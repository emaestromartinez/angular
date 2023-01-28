/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputModule } from '../input/input.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SWHeaderComponent } from './sw-header.component';
import { SWHeaderService } from './sw-header.service';

describe('SWHeaderComponent', () => {
  let component: SWHeaderComponent;
  let fixture: ComponentFixture<SWHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SWHeaderComponent],
      imports: [CommonModule, RouterTestingModule, InputModule],
      providers: [SWHeaderService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SWHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
