import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const SSN_REGEX: RegExp = /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;

@Injectable()
export class ValidatorService {
  public emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

  constructor() {
  }

  emailRegex(): RegExp {
    return EMAIL_REGEX;
  }

  ssnRegex(): RegExp {
    return SSN_REGEX;
  }


}


