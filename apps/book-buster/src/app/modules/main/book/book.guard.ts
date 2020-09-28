import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class BookGuard implements CanActivate {

  constructor(private _mainSer: MainService, private _router: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._mainSer.currentBook) {
      this._router.navigate(['/main/book-search'])
      return false;
    } else {
      return true;
    }
  }
  
}
