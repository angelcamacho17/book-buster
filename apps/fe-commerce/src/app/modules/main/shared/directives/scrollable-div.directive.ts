import { Directive, Renderer2, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[feScrollableDiv]'
})
export class ScrollableDivDirective implements AfterViewInit {

  constructor(
    private _renderer: Renderer2,
    private _el: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.setMaxHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setMaxHeight();
  }

  private setMaxHeight() {
   setTimeout(() => {
    const headerExt = (document.getElementById('header').offsetHeight);
    console.log(headerExt)
    console.log(document.getElementById('main').offsetHeight);
    const mainHei = (document.getElementById('main').offsetHeight - 160 - headerExt) + 'px';
    console.log(mainHei);
    this._renderer.setStyle(
      this._el.nativeElement,
      'height',
      mainHei
      )
    }, );

  }

}
