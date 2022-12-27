import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleFormService {
  constructor(private _httpClient: HttpClient) {}

  emailValidationRegEx = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  phoneValidationRegEx = new RegExp(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
  );

  private validZipcodes = ['00000', '00024', '08800', '08860'];

  createEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isEmailValid = this.emailValidationRegEx.test(value);

      return !isEmailValid ? { emailIsInvalid: true } : null;
    };
  }

  createPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isPhoneValid = this.phoneValidationRegEx.test(value);

      return !isPhoneValid ? { phoneIsInvalid: true } : null;
    };
  }

  fakeZipCodeHttp(value: string) {
    return of(this.validZipcodes.includes(value)).pipe(delay(1250));
  }

  createPostalCodeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.fakeZipCodeHttp(control.value).pipe(
        map((result: boolean) => (result ? null : { invalidPostalCode: true }))
      );
    };
  }
}
