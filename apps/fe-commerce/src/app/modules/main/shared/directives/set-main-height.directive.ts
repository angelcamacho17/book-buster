import { Directive, HostListener, Renderer2, ElementRef, Input, AfterViewInit } from '@angular/core';
import { ComponentService } from '../services/component.service';

@Directive({
  selector: '[feSetMainHeight]'
})
export class SetMainHeightDirective implements AfterViewInit {

  @Input() feSetHeight: any;

  constructor(
    private renderer: Renderer2,
    private _el: ElementRef,
    private componentService: ComponentService) { }

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
    console.log('HEADER: '+this.componentService?.headerElement?.nativeElement?.offsetHeight);
    const height = 'calc(100vh - ' + this.componentService.headerElement?.nativeElement?.offsetHeight + 'px)';
    this.renderer.setStyle(
      this._el.nativeElement,
      'height',
      height
    );
  }

}
