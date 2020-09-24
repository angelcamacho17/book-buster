import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthTokenService } from '../sdp/hcs/auth/auth-token-service/auth-token.service';
import { switchMap, map } from 'rxjs/operators';
import { KeyValueStoreService } from '../sdp/keyvaluestore/keyvaluestore.service';

@Injectable({providedIn: 'root'})
export class FeAuthGuard implements CanActivate {
    constructor(private router: Router,
                private key: KeyValueStoreService,
                private auth: AuthTokenService) {}

    canActivate(): Observable<boolean> {
      return this.auth.isAuthenticatedAsObservable().pipe(
          switchMap((isAuthenticated) => {
              if (isAuthenticated) {
                  return of(true);
              } else {
                  return this.key.get('remember').pipe(map((value: any) => {
                      if (value) {
                          /* if remembered, relogin again with service and after that
                           * return true to enable navigation to attendance board
                           */
                          this.router.navigate(['/login']);
                          return false;
                      } else {
                          this.router.navigate(['/login']);
                          return false;
                      }
                  }));
              }
          })
      );
  }
}
