import { Component, OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
export class MainComponent implements OnInit {
  public render = true;
  public layout = 'mobile';
  @ViewChild('drawer') drawer;

  constructor(
    public layoutService: LayoutService,
    public router: Router
  ) {
  }

  public tog() {
    console.log('HEREE')
  }

  public routeTo(url: string) {
    this.drawer.toggle();
    this.router.navigate(['/main/' + url]);
  }

  ngOnInit(): void {
    this.layout = this.layoutService.layout;
    //this._reload();
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
