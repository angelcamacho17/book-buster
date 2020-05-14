import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { KeyValueStoreService } from '../sdp/keyvaluestore/keyvaluestore.service';
import { AuthTokenService } from '../sdp/hcs/auth/auth-token-service/auth-token.service';

@Injectable()
export class CustomerKeyResolver implements Resolve<string> {

    constructor(private keyStore: KeyValueStoreService, private router: Router, private auth: AuthTokenService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.auth.isAuthenticatedAsObservable().pipe(
            switchMap((isAuthenticated) => {
                if (isAuthenticated) {
                    this.router.navigate(['/login']);
                    return of(null);
                } else {
                    const id = route.paramMap.get('customerKey');
                    if (localStorage.getItem('CUSTOMER_KEY')) {
                        if (localStorage.getItem('CUSTOMER_KEY') !== id) {
                            localStorage.setItem('CUSTOMER_KEY', id);
                            localStorage.setItem('HIDE_CUSTOMER_KEY', 'true');
                            this.router.navigate(['/login', { customerKey: id }]);
                            return of(id);
                        } else {
                            localStorage.setItem('HIDE_CUSTOMER_KEY', 'true');
                            this.router.navigate(['/login', { customerKey: id }]);
                            return of(id);
                        }
                    } else {
                        localStorage.setItem('CUSTOMER_KEY', id);
                        localStorage.setItem('HIDE_CUSTOMER_KEY', 'true');
                        this.router.navigate(['/login', { customerKey: id }]);
                        return of(id);
                    }
                }
            })
        );
    }
}
