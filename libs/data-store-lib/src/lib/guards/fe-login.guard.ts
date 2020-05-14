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
      console.log('in here');
      return this.auth.isAuthenticatedAsObservable().pipe(
        switchMap((isAuthenticated) => {
          console.log('login '+isAuthenticated);

            if (!isAuthenticated) {
                    return this.key.get('remember').pipe(map((value) => {
                        if (value) {
                            /* if remembered, relogin again with service and after that
                             * return false to redirect to attendance board with proper user
                             */
                          console.log('go to home');
                            this.router.navigate(['/home']);
                            return false;
                        } else {
                          console.log('go to home 2');

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
