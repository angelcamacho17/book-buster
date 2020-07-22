import { Component, HostListener } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { routesAnimations } from './animations/routes.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routesAnimations
  ]
})
export class AppComponent{
  title = 'fecommerce';

  constructor(public router: Router) { }

  prepareRoute(outlet: RouterOutlet) {
    /* tslint:disable:no-string-literal */
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
