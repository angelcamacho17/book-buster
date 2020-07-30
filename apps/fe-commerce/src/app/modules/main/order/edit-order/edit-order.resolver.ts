import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IHeader, setHeaderRequest } from '@fecommerce-workspace/data-store-lib';

@Injectable()
export class EditOrderResolver implements Resolve<any> {
  constructor( private _store: Store<{}>,) {}

  resolve(): Observable<any> {
    const header: IHeader = {
      title: 'orderover',
      leftIcon:'close',
      rightIcon: 'delete_outline',
      titClass: 'mat-title',
      lastUrl: 'home',
      centered: true
    }

    this._store.dispatch(setHeaderRequest({header}))
    return of(null);
  }
}