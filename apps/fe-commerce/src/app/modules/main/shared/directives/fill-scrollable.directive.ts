import { Directive, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[feFillScrollable]'
})
export class FillScrollableDirective implements AfterViewInit {
  // @ViewChild('main') main: ElementRef
  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setMaxHeight();
    });
  }

  private _setMaxHeight() {
    const main = document.getElementById('fede');
    this._renderer2.setStyle(this._elementRef.nativeElement, 'max-height', main.offsetHeight + 'px');
  }
}
