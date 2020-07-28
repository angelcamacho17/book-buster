import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IHeader, setHeaderRequest } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class OrderItemsResolver implements Resolve<any> {
  constructor( private _store: Store<{}>,) {}

  resolve(): Observable<any> {
    const header: IHeader = {
      title: 'orderitems',
      leftIcon: 'keyboard_arrow_left',
      rightIcon: null,
      titClass: 'mat-title',
      lastUrl: 'main/edit-order',
      addArt: true,
      centered: true
    }

    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }
}
