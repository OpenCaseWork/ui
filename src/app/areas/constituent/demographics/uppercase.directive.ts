import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
@Directive({
  selector: '[ngModel][uppercase]'
})
export class UppercaseDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event) {
    console.log('uppercase fired', $event.target.value);
    this.value = $event.target.value.toUpperCase();
    console.log(this.value);
    this.ngModelChange.emit(this.value);
  }
}