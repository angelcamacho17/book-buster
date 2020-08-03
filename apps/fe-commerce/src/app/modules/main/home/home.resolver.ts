import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IHeader, setHeaderRequest } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class HomeResolver implements Resolve<any> {
  orders$: Observable<unknown>;
  constructor( private _store: Store<{}>,) {}

  resolve(): Observable<any> {
    const header: IHeader = {
      title: 'home',
      rightIcon: 'exit_to_app',
      titClass: 'mat-display-1',
      centered: true
    }

    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }
}
