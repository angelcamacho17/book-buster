import { Directive, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ComponentService } from '../services/component.service';

@Directive({
  selector: '[setHeaderHeight]'
})
export class SetHeaderHeightDirective implements AfterViewInit {

  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
    private _componentService: ComponentService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setHeaderHeight();
    });
  }

  setHeaderHeight() {
    const headerHeight = this._componentService.expectedHeaderHeight - this._elementRef.nativeElement.offsetHeight;
    console.log(headerHeight)
    console.log(this._componentService.expectedHeaderHeight, this._elementRef.nativeElement.offsetHeight)
    console.log(headerHeight)
    this._renderer2.setStyle(this._componentService.headerElement.nativeElement, 'height', `${headerHeight}px`);
  }
}
