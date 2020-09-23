import { Component, OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routesAnimations } from '../animations/routes.animation';
import { LayoutService } from './shared/services/layout.service';
import { Subscription } from 'rxjs';
import { HCSClient, AuthService, TranslationService, OrderService } from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    routesAnimations
  ]
})
export class MainComponent implements OnInit, OnDestroy {
  public render = true;
  public layout = 'mobile';
  private _logoutSub = new Subscription();


  constructor(
    public layoutService: LayoutService,
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
    private _hcsClient: HCSClient,
    private _transServ: TranslationService,
    private _ordSer: OrderService

  ) {
    this._logoutSub.add(this._hcsClient.onBeforeLogout.subscribe((res: any) => {
      if (res && res.error && res.error.error) {
        this.notificateLogout(res.error.error.description);
      }
    }));
  }

  ngOnInit(): void {
    this.layout = this.layoutService.layout;
    localStorage.setItem('CAMERA_ALLOWED', 'true')
    if (localStorage.getItem('POI_currentOrder')!==null && localStorage.getItem('POI_currentOrder')!==undefined && localStorage.getItem('POI_currentOrder')!=='') {
      this._ordSer.orderFlow = 'edit'
    } else {
      this._ordSer.orderFlow = 'new'
    }
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

  private notificateLogout(message: string): void {
    let msg = this._transServ.get('logoutInactive');
    if (message === 'Token not found') {
      msg = this._transServ.get('logoutUser');
    }
    this._snackBar.open(msg, '', {
     duration: 5000,
    });
    this._authService.logout();
  }

  ngOnDestroy(): void {
    if (this._logoutSub) {
      this._logoutSub.unsubscribe();
    }
    if (localStorage.getItem('CAMERA_ALLOWED')){
      localStorage.removeItem('CAMERA_ALLOWED');
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    /* tslint:disable:no-string-literal */
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }



}
