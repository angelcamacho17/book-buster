import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../modules/main/shared/services/layout.service';

@Injectable({
  providedIn: 'root'
})
export class NotSupportedGuard implements CanActivate {
  constructor(private _layoutSer: LayoutService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this._layoutSer.layout !== 'mobile') {
        return true;
      } else {
        this._router.navigate(['/main/home'])
        return false;
      }
  }
  
}
