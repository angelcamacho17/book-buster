import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[feFocus]'
})
export class FocusDirective implements AfterViewInit {

  constructor(
    private element: ElementRef
  ) { }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.element.nativeElement.focus();
    });
  }

}
