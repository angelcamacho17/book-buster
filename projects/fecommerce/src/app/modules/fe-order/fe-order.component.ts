import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setHeaderTitleRequest } from 'projects/data-store-lib/src/lib/header/header.actions';
import { Customer } from 'projects/data-store-lib/src/lib/models/customer.model';
import { Observable } from 'rxjs';
import { refreshCustomersRequest } from 'projects/data-store-lib/src/lib/customer/customer.actions';

@Component({
  selector: 'app-fe-order',
  templateUrl: './fe-order.component.html',
  styleUrls: ['./fe-order.component.scss']
})
export class FeOrderComponent implements OnInit {

  constructor( private store: Store<{customers: Customer[]}>) {
    this.store.dispatch(setHeaderTitleRequest({title: 'order'}));
  }

  ngOnInit(): void {
  }

}
