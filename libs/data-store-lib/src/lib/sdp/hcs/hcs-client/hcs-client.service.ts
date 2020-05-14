import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, EMPTY } from 'rxjs';
import { catchError, switchMap, tap, shareReplay } from 'rxjs/operators';
import { AuthTokenService } from '../auth/auth-token-service/auth-token.service';
import { Httpheadername } from './httpheadername.enum';
import { HCSLoad } from './hcs-load';
import { IHCSClient } from './hcs-client.interface';
import { isDefined } from '../../utils/types/value.util';
import { ConfigService } from '../../config/config.service';
import { KeyValueStoreService } from '../../keyvaluestore/keyvaluestore.service';

@Injectable()
export class HCSClient implements IHCSClient {
  /* refreshtokens concurrency*/
  private isRefreshingToken = false;
  private refreshObservable: Observable<any>;

  public onBeforeLogout = new Subject();
  public onServerError = new Subject();

  constructor(private http: HttpClient,
              public authTokenService: AuthTokenService,
              protected configService: ConfigService,
              protected store: KeyValueStoreService,
              private load: HCSLoad) { }

  /**
   * logs in to the ERP backend via the hcs, generating auth-tokens
   * @param loginname username to login
   * @param loginpassword password to login
   */
  public login(loginname: string, loginpassword: string, options?: any): Observable<any> {
    let customerKey;
    if (options && options.customerKey) {
      customerKey = options.customerKey;
    }
    const headers = this.assembleLoginHeaders(loginname, loginpassword, customerKey);

    return this.http.post(this.configService.get('ENDPOINT') + '/login', null, { headers, observe: 'response' })
      .pipe(
        tap(res => {
          if (res.headers.get(Httpheadername.token) && res.headers.get(Httpheadername.refreshtoken)) {
            this.authTokenService.setTokens(res.headers.get(Httpheadername.token), res.headers.get(Httpheadername.refreshtoken));
            this.setUser(res);
          } else {
            this.load.key = undefined;
          }
        }));
  }

  /**
   * Sets the user in the indexed database
   */
  public setUser(res: any, isRemember?: boolean): void {
    if (res.body.data !== undefined && res.body.data.user !== undefined) {
      this.store.delete(this.configService.get('APPKEY') + '_USER').subscribe(() => {
        this.store.set(this.configService.get('APPKEY') + '_USER', res.body.data.user).subscribe();
      });
    }
  }

  /**
   * Purges the user from the indexed database
   */
  public purgeData(): void {
    this.load.key = undefined;
    this.store.delete(this.configService.get('APPKEY') + '_USER').subscribe();
    this.store.delete(this.configService.get('APPKEY') + '_CUSTOMER_KEY').subscribe();
  }

  /**
   * logs out to the ERP backend via the hcs
   */
  public logout(): Observable<any> {
    const options = this.injectOptions();
    this.authTokenService.purgeTokens();
    this.purgeData();
    return this.http.post(this.configService.get('ENDPOINT') + '/logout', null, options);
  }

  /**
   * head request to the erp
   * @param url url to the hcs-api
   * @param options http options
   */
  public head(url: string, options?: any): Observable<any> {
    return this.request('HEAD', url, options as any);
  }


  /**
   * get request to the erp
   * @param url url to the hcs-api
   * @param options http options
   */
  public get(url: string, options?: any, throwErr?: boolean): Observable<any> {
    return this.request('GET', url, options as any, throwErr);
  }


  /**
   * post request to the erp
   * @param url url to the hcs-api
   * @param options http options
   */
  public post(url: string, options?: any): Observable<any> {
    return this.request('POST', url, options as any);
  }

  /**
   * put request to the erp
   * @param url url to the hcs-api
   * @param options http options
   */
  public put(url: string, options?: any): Observable<any> {
    return this.request('PUT', url, options as any);
  }

  /**
   * options request to the erp
   * @param url url to the hcs-api
   * @param options http options
   */
  public options(url: string, options?: any): Observable<any> {
    return this.request('OPTIONS', url, options as any);
  }

  /**
   * patch request to the erp
   * @param url url to the hcs-api
   * @param options http options
   */
  public patch(url: string, options?: any): Observable<any> {
    return this.request('PATCH', url, options as any);
  }

  /**
   * delete request to the erp
   * @param url url to the hcs-api
   * @param options http options
   */
  public delete(url: string, options?: any): Observable<any> {
    return this.request('DELETE', url, options as any);
  }

  /**
   * request to the erp
   * @param method methodname
   * @param url url to the hcs-api
   * @param options http options
   */
  public request(method: string, url: string, options?: any, throwErr?: boolean): Observable<any> {
    if (this.authTokenService.isRefreshTokenExpired() && this.authTokenService.isTokenExpired()) {
      this.purgeAndNotify();
      return of(undefined);
    }

    if (this.authTokenService.isTokenExpired()) {
      const ref = this.refresh();
      if (isDefined(ref)) {
        return ref.pipe(
          switchMap(() => {
            return this.http.request(method, this.configService.get('ENDPOINT') + url, this.injectOptions(options));
          }),
          catchError(this.catchErrorMessage(throwErr))
        );
      } else {
        this.purgeAndNotify();
        return of(undefined);
      }
    } else {
      return this.http.request(method, this.configService.get('ENDPOINT') + url, this.injectOptions(options)).pipe(
        catchError(this.catchErrorMessage())
      );
    }
  }

  /**
   * Assambles the login headers
   * @param loginname Loginname of the client
   * @param loginpassword Login password of the client
   * @param customerKey The customer key (optional)
   */
  private assembleLoginHeaders(loginname: string, loginpassword: string, customerKey: string): HttpHeaders {
    let headers: HttpHeaders;
    if (customerKey === undefined) {
      headers = this.defaultHeaders();
    } else {
      headers = this.customerKeyHeaders(customerKey);
    }

    return headers.set(Httpheadername.loginname, loginname)
      .set(Httpheadername.loginpassword, loginpassword);
  }

  /**
   * This will assemble the headers with default headers (apikey and appkey)
   */
  private defaultHeaders(): HttpHeaders {
    this.load.key = {
      name: Httpheadername.apikey,
      value: this.configService.get('APIKEY')
    };
    return new HttpHeaders().set(Httpheadername.apikey, this.configService.get('APIKEY'))
      .set(Httpheadername.applicationKey, this.configService.get('APPKEY'));
  }

  /**
   * This will assemble the headers with customer key and app key
   * @param customerKey The customer key
   */
  private customerKeyHeaders(customerKey: string): HttpHeaders {
    this.store.delete(this.configService.get('APPKEY') + '_CUSTOMER_KEY').subscribe(() => {
      this.store.set(this.configService.get('APPKEY') + '_CUSTOMER_KEY', customerKey).subscribe();
    });
    this.load.key = {
      name: Httpheadername.customerKey,
      value: customerKey
    };
    return new HttpHeaders().set(Httpheadername.customerKey, customerKey)
      .set(Httpheadername.applicationKey, this.configService.get('APPKEY'));
  }

  private purgeAndNotify(error?: any): void {
    this.onBeforeLogout.next(error);
    this.authTokenService.purgeTokens();
    this.purgeData();
  }

  private notifyServerErr(error?: any): void {
    this.onServerError.next(error);
  }

  /**
   * If this is true the user should be logged out and redirected to the login page
   * @param error The error of the response
   */
  private isErrorLogout(error: any) {
    return (error.status === 401 || (error.error !== undefined && error.error.error !== undefined &&
      (error.error.error.code === 'ACCESS_DENIED' || error.error.error.code === 'TOKEN_NOT_FOUND')));
  }

  /**
   * If this is true the user should be logged out and redirected to the login page
   * @param error The error of the response
   */
  private isServerError(error: any) {
    return (error.status >= 500 && error.status <= 599);
  }

  /**
   * A callback that will catch the error and redirect to login page if the error is fatal
   */
  private catchErrorMessage(throwErr?: boolean): (error: any) => any {
    return (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (this.isErrorLogout(error)) {
          this.purgeAndNotify(error);
        } else if (this.isServerError(error) && throwErr) {
          this.notifyServerErr(error);
        }
      }
      return of(undefined);
    };
  }

  private refresh(): Observable<any> {
    if (this.isRefreshingToken) {
      return this.refreshObservable;
    } else {
      this.isRefreshingToken = true;
      this.refreshObservable = this.http.post(this.configService.get('ENDPOINT') + '/refresh', null, this.injectOptions())
        .pipe(
          catchError((err) => {
            this.isRefreshingToken = false;
            return this.catchErrorMessage()(err);
          }),
          tap((res: any) => {
            if (res.headers.get(Httpheadername.token) && res.headers.get(Httpheadername.refreshtoken)) {
              this.authTokenService.updateTokens(res.headers.get(Httpheadername.token), res.headers.get(Httpheadername.refreshtoken));
            }
            this.isRefreshingToken = false;
          }), shareReplay(1)
        );
      return this.refreshObservable;
    }
  }

  private injectOptions(options?: any): any {
    if (!options) {
      options = {};
    }

    options.headers = this.getHeaders(options.headers);
    options.observe = 'response';

    return options;
  }

  private getHeaders(headers = new HttpHeaders()): HttpHeaders {
    return headers.set(Httpheadername.applicationKey, this.configService.get('APPKEY'))
      .set(this.load.key.name, this.load.key.value)
      .set(Httpheadername.token, this.authTokenService.getToken())
      .set(Httpheadername.refreshtoken, this.authTokenService.getRefreshtoken());
  }
}
