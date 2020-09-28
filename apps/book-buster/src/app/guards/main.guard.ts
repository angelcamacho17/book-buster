import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../modules/main/main.service';
import { LayoutService } from '../modules/main/shared/services/layout.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(private _layoutSer: LayoutService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._layoutSer.layout === 'mobile') {
      return true;
    } else {
      this._router.navigate(['not-supported'])
      return false;
    }
  }
  
}
