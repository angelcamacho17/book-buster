import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IOrder, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest, IHeader, setHeaderRequest } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class CustomerSearchResolver implements Resolve<any> {
  orders$: Observable<unknown>;
  constructor( private _store: Store<{}>,) {}

  resolve(): Observable<any> {
    const header: IHeader = {
      title: 'neworder',
      leftIcon: 'close',
      rightIcon: null,
      titClass: 'mat-title',
      lastUrl: 'main/home',
      centered: true
    }

    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }
}
