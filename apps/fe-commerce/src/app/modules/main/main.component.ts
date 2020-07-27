import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routesAnimations } from '../animations/routes.animation';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    routesAnimations
  ]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  prepareRoute(outlet: RouterOutlet) {
    /* tslint:disable:no-string-literal */
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
