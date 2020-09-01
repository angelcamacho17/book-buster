import { Directive, HostListener, Renderer2, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[feSetMainHeight]'
})
export class SetMainHeightDirective implements AfterViewInit {

  @Input() feSetHeight: any;

  constructor(
    private renderer: Renderer2,
    private _el: ElementRef,) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setElHeight();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setElHeight();
  }

  private setElHeight(): void {
  }

}
