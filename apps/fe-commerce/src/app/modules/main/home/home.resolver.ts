import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IOrder, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest, IHeader, setHeaderRequest } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class HomeResolver implements Resolve<any> {
  orders$: Observable<unknown>;
  constructor( private _store: Store<{}>,) {}

  resolve(): Observable<any> {
    const header: IHeader = {
      title: 'home',
      leftIcon: null,
      rightIcon: null,
      titClass: 'mat-display-1',
      lastUrl: null,
    }

    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }
}
