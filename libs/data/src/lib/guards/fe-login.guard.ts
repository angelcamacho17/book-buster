import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { KeyValueStoreService } from '../sdp/keyvaluestore/keyvaluestore.service';
import { AuthTokenService } from '../sdp/hcs/auth/auth-token-service/auth-token.service';

@Injectable()
export class FeLoginGuard implements CanActivate {

    constructor(private key: KeyValueStoreService, private auth: AuthTokenService, private router: Router) { }

    canActivate(): Observable<boolean> {
      return this.auth.isAuthenticatedAsObservable().pipe(
        switchMap((isAuthenticated) => {
            if (!isAuthenticated) {
                    return this.key.get('remember').pipe(map((value) => {
                        if (value) {
                            /* if remembered, relogin again with service and after that
                             * return false to redirect to attendance board with proper user
                             */
                            this.router.navigate(['/home']);
                            return false;
                        } else {
                            return true;
                        }
                    }));
            } else {
                    this.router.navigate(['/home']);
                    return of(false);
              }
            })
        );
    }
}
