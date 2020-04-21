import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHeaderTitleRequest } from 'projects/data-store-lib/src/lib/header/header.actions';

@Component({
  selector: 'app-fe-order',
  templateUrl: './fe-order.component.html',
  styleUrls: ['./fe-order.component.scss']
})
export class FeOrderComponent implements OnInit {

  constructor( private storeOrders: Store) {
    this.storeOrders.dispatch(setHeaderTitleRequest({title: 'new order'}));
  }

  ngOnInit(): void {
  }

}
