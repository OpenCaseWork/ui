import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Injectable()
export class ValidatorService {
  public emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

  constructor() {
  }


}


