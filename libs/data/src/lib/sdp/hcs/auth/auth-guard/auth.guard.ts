import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthTokenService } from '../auth-token-service/auth-token.service';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthTokenService, private router: Router, private configService: ConfigService) { }

    /**
     * returns true (as an observable) if a user is authenticated, otherwise false
     */
    canActivate(): Observable<boolean> {
        // Observable is nodig, want de eerste keer moeten de gegevens uit de keyvaluestore gelezen worden,
        // en dat gebeurt via Observables/Promise
        return this.auth.isAuthenticatedAsObservable().pipe(
            map((isAuthenticated) => {
                if (isAuthenticated) {
                    return true;
                } else {
                    // not logged in so redirect to login page with the return url
                    // I think the redirection route does not belong in the queryParams!

                    this.router.navigate([this.configService.get('LOGINURL')], {
                        queryParams: { returnUrl: this.auth.getQueryParam(this.router) }
                    });
                    return false;
                }
            })
        );
    }
}
