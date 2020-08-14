import { Directive, ElementRef, Input, HostListener, AfterViewInit, Renderer2 } from '@angular/core';
import { FeHeaderComponent } from '../components/fe-header/fe-header.component';

@Directive({
  selector: '[feSetHeight]'
})
export class SetHeightDirective implements AfterViewInit {

  @Input() feSetHeight: any;

  constructor(private renderer: Renderer2,
              private _el: ElementRef) { }

  ngAfterViewInit(): void {
    this.setHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setHeight();
  }

  private setHeight(): void {
    const height = window.innerHeight - this.feSetHeight.height + 'px';
    this.renderer.setStyle(
      this._el.nativeElement,
      'height',
      height
    );
  }

}
