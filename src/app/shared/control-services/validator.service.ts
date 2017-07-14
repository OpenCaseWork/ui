import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export const EMAIL_REGEX: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const SSN_REGEX: RegExp = /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
export const PHONE_REGEX: RegExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
export const YES_NO_REGEX: RegExp = /Y|N/;
export const BIRTH_DATE_REGEX: RegExp = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
export const DATE_REGEX: RegExp = /(\d{4})-(\d{2})-(\d{2})/;

export const dateMask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
export const yesNoMask = [/[YyNn]/];


@Injectable()
export class ValidatorService {
  // public emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

  constructor() {
  }

  createEmailControl(value: string): FormControl {
    return new FormControl(value || '', [ Validators.pattern(EMAIL_REGEX)]);
  }

  createPhoneControl(value: string): FormControl {
    return new FormControl(value || '', Validators.pattern(PHONE_REGEX));
  }

  emailRegex(): RegExp {
    return EMAIL_REGEX;
  }

  ssnRegex(): RegExp {
    return SSN_REGEX;
  }

  yesNoRegex(): RegExp {
    return YES_NO_REGEX;
  }

  dateRegex(): RegExp {
    return DATE_REGEX;
  }

  birthDateRegex(): RegExp {
    return BIRTH_DATE_REGEX;
  }

  triggerFormValidation(form: FormGroup) {
     Object.keys(form.controls).map((controlName) => {
      form.get(controlName).markAsTouched({onlySelf: true});
    });
  }


}


