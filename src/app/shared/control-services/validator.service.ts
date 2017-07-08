import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const EMAIL_REGEX: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const SSN_REGEX: RegExp = /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
const PHONE_REGEX: RegExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

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

  triggerFormValidation(form: FormGroup) {
     Object.keys(form.controls).map((controlName) => {
      form.get(controlName).markAsTouched({onlySelf: true});
    });
  }


}


