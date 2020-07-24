import { Directive, HostListener, Renderer2, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[feSetHeight]'
})
export class SetHeightDirective implements AfterViewInit {

  @Input() feSetHeight: any;

  constructor(private renderer: Renderer2,
    private _el: ElementRef) { }

  ngAfterViewInit(): void {
    this.setElHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setElHeight();
  }

  private setElHeight(): void {
    let height = null;
    height = 'calc(100vh - ' + document.getElementById('header').offsetHeight + 'px)';
    this.renderer.setStyle(
      this._el.nativeElement,
      'height',
      height
    );
  }

}
