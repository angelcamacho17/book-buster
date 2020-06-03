import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BackNavigationService {
  private _urls: string[] = [];
  private _currentUrl: string;
  private _changedNav = ['foward', 'back'];
  private _index = 0;

  constructor() { }

  public watchChanged(): Observable<string> {
    // Change the index to always update the state and be able to listen.
    this._index = this._index === 1 ? 0 : 1;
    return of(this._changedNav[this._index]);

  }

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
