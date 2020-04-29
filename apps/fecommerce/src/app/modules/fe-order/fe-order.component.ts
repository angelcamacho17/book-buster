import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHeaderTitleRequest } from '@fecommerce-workspace/data-store-lib';
import { Customer } from '@fecommerce-workspace/data-store-lib';

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
