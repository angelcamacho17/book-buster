import { Directive, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[setHeaderHeight]'
})
export class SetHeaderHeightDirective implements AfterViewInit {

  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setHeaderHeight();
    });
  }

  setHeaderHeight() {
  }
}
