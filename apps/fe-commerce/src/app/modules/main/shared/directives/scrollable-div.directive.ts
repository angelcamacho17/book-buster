import { Directive, Renderer2, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';
import { ComponentService } from '../services/component.service';

@Directive({
  selector: '[feScrollableDiv]'
})
export class ScrollableDivDirective implements AfterViewInit {

  @Input() feScrollableDiv: any;

  constructor(
    private _renderer: Renderer2,
    private _el: ElementRef,
    private componentService: ComponentService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setMaxHeight();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setMaxHeight();
  }

  private setMaxHeight() {
    const maxHeight = (this.componentService.mainElement.nativeElement.offsetHeight - 192) + 'px';
    this._renderer.setStyle(
      this._el.nativeElement,
      'max-height',
      maxHeight
    );
  }
}
