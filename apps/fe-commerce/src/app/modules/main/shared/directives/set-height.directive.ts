import { Directive, HostListener, Renderer2, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[feSetHeight]'
})
export class SetHeightDirective implements AfterViewInit{

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
    if (this.feSetHeight){
      height = 'calc(100vh - ' + this.feSetHeight + ')';
    } else {
      height = 'calc(100vh - '+document.getElementById('header').offsetHeight + 'px)';
    }
    console.log(height);
    this.renderer.setStyle(
      this._el.nativeElement,
      'height',
      height
    );
  }

}
