import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
@Directive({
  selector: '[scroller]'
})
export class ScrollerDirective {
  constructor(
    private _elementRef: ElementRef,
  ) { }

  @HostListener('touchstart') scrolling() {
    const element = this._elementRef.nativeElement;
    disableBodyScroll(element);
    }
}