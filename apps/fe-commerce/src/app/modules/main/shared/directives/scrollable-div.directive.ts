import { Directive, Renderer2, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[feScrollableDiv]'
})
export class ScrollableDivDirective implements AfterViewInit {

  @Input() feScrollableDiv: any;

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
    console.log('main: ' +document.getElementById('main').offsetHeight);
    const mainHei = (document.getElementById('main').offsetHeight - 192) + 'px';
    console.log(mainHei);
    this._renderer.setStyle(
      this._el.nativeElement,
      'max-height',
      mainHei
      )
    }, );

  }

}
