import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _title = 'header';

  constructor() { }

  public setTitle(title: string): Observable<string> {
    this._title = title;
    return of(this._title);
  }

}
