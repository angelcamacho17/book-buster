import { Observable } from 'rxjs';

export interface IHCSClient {
  login(loginname: string, loginpassword: string, options?: any): Observable<any>;
  setUser(res: any, isRemember?: boolean): void;
  purgeData(): void;
  logout(): Observable<any>;
  head(url: string, options?: any): Observable<any>;
  get(url: string, options?: any): Observable<any>;
  post(url: string, options?: any): Observable<any>;
  put(url: string, options?: any): Observable<any>;
  options(url: string, options?: any): Observable<any>;
  patch(url: string, options?: any): Observable<any>;
  delete(url: string, options?: any): Observable<any>;
  request(method: string, url: string, options?: any): Observable<any>;
}
