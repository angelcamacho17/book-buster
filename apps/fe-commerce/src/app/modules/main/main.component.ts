import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routesAnimations } from '../animations/routes.animation';
import { ComponentService } from './shared/services/component.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    routesAnimations
  ]
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('header', { read: ElementRef }) private headerElement: ElementRef<any>;
  public render = false;
  constructor(
    private componentService: ComponentService
    ) {
      if (!localStorage.getItem('foo')) {
        localStorage.setItem('foo', 'no reload');
        location.reload();
      } else {
        this.render = true;
        localStorage.removeItem('foo');
      }
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.componentService.headerElement = this.headerElement;
    console.log(this.componentService.headerElement);
  }

  public prepareRoute(outlet: RouterOutlet) {
    /* tslint:disable:no-string-literal */
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
