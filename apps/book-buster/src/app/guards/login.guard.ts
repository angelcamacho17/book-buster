import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MainService } from '../modules/main/main.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private _router: Router,
    private _mainSer: MainService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this._mainSer.currentUser !== null) {
        console.log('curr ',this._mainSer.currentUser)
        console.log('LOGIN GUARD')
        this._router.navigate(['/main/home']);
        return false;
      } else {
        return true;
      }

  }
  
}
