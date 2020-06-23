import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[feAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(
    private element: ElementRef
  ) { }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.element.nativeElement.focus();
    });
  }

}
