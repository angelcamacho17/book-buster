import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'dist/data-store/lib/models/customer.model';
import { Store, select } from '@ngrx/store';
import { setHeaderTitleRequest } from 'projects/data-store-lib/src/lib/header/header.actions';
import { refreshCustomersRequest } from 'projects/data-store-lib/src/lib/customer/customer.actions';

@Component({
  selector: 'app-fe-new-order',
  templateUrl: './fe-new-order.component.html',
  styleUrls: ['./fe-new-order.component.scss']
})
export class FeNewOrderComponent implements OnInit {

  public $customers: Observable<Customer[]>;
  public customers: Customer[];

  constructor( private store: Store<{customers: Customer[]}>) {
    this.store.dispatch(setHeaderTitleRequest({title: 'new order'}));
    this.$customers = this.store.pipe(select('customers'));
    this.$customers.subscribe(data => {
      this.customers = data;
    });
    this.store.dispatch(refreshCustomersRequest());
  }

  ngOnInit(): void {
  }

}
