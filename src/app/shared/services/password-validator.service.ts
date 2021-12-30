import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {
  constructor() {}

  specialCharacterValidator(control: FormControl): { [key: string]: boolean } | null {
    const symbolRegexp: RegExp = /.*\W.*/;
    if (control.value && symbolRegexp.test(control.value)) {
      return null;
    }
    return { noSymbols: true };
  }

  uppercaseCharacterValidator(control: FormControl): { [key: string]: boolean } | null {
    const upperCaseRegexp: RegExp = /.*[A-Z].*/;
    if (control.value && upperCaseRegexp.test(control.value)) {
      return null;
    }
    return { noUpperCase: true };
  }

  digitValidator(control: FormControl): { [key: string]: boolean } | null {
    const digitRegExp: RegExp = /.*[0-9].*/;
    if (control.value && digitRegExp.test(control.value)) {
      return null;
    }
    return { noDigits: true };
  }

  areFieldsTheSame(field1: string, field2: string) {
    return function (form) {
      let field1Value = form.get(field1).value;
      let field2Value = form.get(field2).value;
      return field1Value === field2Value ? null : { noMatch: true };
    };
  }
}
