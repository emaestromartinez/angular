/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputModule } from '../input/input.module';
import { HeaderService } from './header.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [CommonModule, RouterTestingModule, InputModule],
      providers: [HeaderService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
