import { Directive, Renderer2, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';
import { ComponentService } from '../services/component.service';

@Directive({
  selector: '[feScrollableDiv]'
})
export class ScrollableDivDirective implements AfterViewInit {

  constructor(
    private _renderer: Renderer2,
    private _el: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    console.log('aiusfahsdfuhsai')
    setTimeout(() => {
      this.setMaxHeight();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setMaxHeight();
  }

  private setMaxHeight() {
    const nextDiv = this._el.nativeElement.parentNode.nextSibling;
    const elementTop = this._el.nativeElement.offsetTop;
    const nextDivTop = nextDiv.offsetTop;
    const maxHeight = (nextDivTop - elementTop) - 8;
    this._renderer.setStyle(
      this._el.nativeElement,
      'max-height',
      maxHeight + 'px'
    );
  }
}
