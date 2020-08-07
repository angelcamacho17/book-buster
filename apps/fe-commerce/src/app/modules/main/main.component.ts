import { Component, OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routesAnimations } from '../animations/routes.animation';
import { LayoutService } from './shared/services/layout.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    routesAnimations
  ]
})
export class MainComponent implements OnInit, AfterViewChecked {
  public render = false;
  public layout = 'mobile';

  constructor(
    public layoutService: LayoutService
  ) {
  }
  ngAfterViewChecked(): void {
    setTimeout(() => this.layout = this.layoutService.layout, 0);
  }

  ngOnInit(): void {
    this._reload();
  }

  private _reload() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      this.render = true;
      localStorage.removeItem('foo');
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    /* tslint:disable:no-string-literal */
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
