import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { KeyValueStoreService } from '../../../keyvaluestore/keyvaluestore.service';
import { ConfigService } from '../../../config/config.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthTokenService {
  private tokenname;
  private refreshtokenname;
  private token;
  private refreshtoken;
  private jwtHelper: JwtHelperService;
  private tokenExpiryOffset = 120;

  constructor(private keyvaluestore: KeyValueStoreService, private configService: ConfigService) {
    this.jwtHelper = new JwtHelperService();
  }

  /**
   * Initializes the tokens before init now
   */
  public initTokens(): Observable<any> {
    this.tokenname = this.configService.get('APPKEY') + '_' + 'hcs_token';
    this.refreshtokenname = this.configService.get('APPKEY') + '_' + 'hcs_refreshtoken';
    return forkJoin(this.keyvaluestore.get(this.tokenname), this.keyvaluestore.get(this.refreshtokenname)).pipe(map((val: Array<any>) => {
      this.token = val[0];
      this.refreshtoken = val[1];
      return undefined;
    }));
  }

  /**
   * sets the token and refreshtoken in the keyvaluestore
   * @param token token to set
   * @param refreshtoken refreshtoken to set
   */
  public setTokens(token: string, refreshtoken: string): void {
    this.purgeTokens();
    this.token = token;
    this.refreshtoken = refreshtoken;
    this.keyvaluestore.set(this.tokenname, token).subscribe();
    this.keyvaluestore.set(this.refreshtokenname, refreshtoken).subscribe();
  }

  /**
   * updates the tokens in the keyvaluestore
   * @param token token to update
   * @param refreshtoken refreshtoken to update
   */
  public updateTokens(token: string, refreshtoken: string): void {
    this.token = token;
    this.refreshtoken = refreshtoken;
    this.keyvaluestore.update(this.tokenname, token).subscribe();
    this.keyvaluestore.update(this.refreshtokenname, refreshtoken).subscribe();
  }

  /**
   * purge the tokens in the keyvaluestore
   */
  public purgeTokens(): void {
    this.token = undefined;
    this.refreshtoken = undefined;
    this.keyvaluestore.delete(this.tokenname).subscribe();
    this.keyvaluestore.delete(this.refreshtokenname).subscribe();
  }

  /**
   * checks if a user is authenticated, returns the boolean as an observable
   */
  public isAuthenticatedAsObservable(): Observable<boolean> {

    const refreshtoken$ = this.keyvaluestore.get(this.refreshtokenname);
    console.log('token '+ this.refreshtokenname);

    return refreshtoken$.pipe(
      map((refreshtoken) => {
        console.log('auth token ser')
        if (refreshtoken === undefined) {
          return false;
        }
        return !this.jwtHelper.isTokenExpired(refreshtoken, this.tokenExpiryOffset);
      })
    );
  }

  /**
   * get the token from the keyvaluestore
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * get the refreshtoken from the keyvaluestore
   */
  public getRefreshtoken(): string {
    return this.refreshtoken;
  }

  /**
   * checks if a user is authenticated
   */
  public isAuthenticated(): boolean {
    return !this.isRefreshTokenExpired();
  }

  /**
   * checks if the token is expired
   */
  public isTokenExpired(): boolean {
    return this.token ? this.jwtHelper.isTokenExpired(this.token, this.tokenExpiryOffset) : true;
  }

  /**
   * checks if the refreshtoken is expired
   */
  public isRefreshTokenExpired(): boolean {
    return this.refreshtoken ? this.jwtHelper.isTokenExpired(this.refreshtoken, this.tokenExpiryOffset) : true;
  }

  /**
   * get the user object from the token
   */
  public getUser(): any {
    return this.token ? this.jwtHelper.decodeToken(this.token).proxyuser : '';
  }

  /**
   * get the username from the token
   */
  public getUsername(): any {
    return this.token ? this.getUser().userData.name : '';
  }

  public getQueryParam(router: Router): string {
    const route = router.routerState.snapshot.url;
    return route.substr(0, route.indexOf('returnUrl') - 1);
  }
}
