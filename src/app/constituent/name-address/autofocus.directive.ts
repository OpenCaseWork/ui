import { Directive, ElementRef, AfterViewInit, Renderer } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer) { };

  ngAfterViewInit() {
    console.log('focus control');
    this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
    // this.el.nativeElement.focus();
  }
}
