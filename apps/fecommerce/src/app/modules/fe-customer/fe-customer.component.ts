import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHeaderTitleRequest } from 'libs/data-store-lib/src/lib/header/header.actions';

@Component({
  selector: 'app-fe-customer',
  templateUrl: './fe-customer.component.html',
  styleUrls: ['./fe-customer.component.scss']
})
export class FeCustomerComponent implements OnInit {

  constructor( private _store: Store) {
    this._store.dispatch(setHeaderTitleRequest({title: 'customer'}));
  }

  ngOnInit(): void {
  }

}
