import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routesAnimations } from './modules/animations/routes.animation';

@Component({
  selector: 'fecommerce-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routesAnimations
  ]
})
export class AppComponent {
  title = 'fe-commerce';

  prepareRoute(outlet: RouterOutlet) {
    /* tslint:disable:no-string-literal */
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
