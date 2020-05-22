import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BackNavigationService {
  private _urls: string[] = [];
  private _currentUrl: string;

  constructor() { }

  public getUrl(): Observable<string> {
    return of(this._currentUrl);
  }

  public goBack(): Observable<string> {
    this._urls.pop();
    const last = this._urls.pop();
    return of(last);
  }

  public add(url: string): Observable<string> {
    this._urls.push(url);
    this._currentUrl = url;
    return of('');
  }
}
