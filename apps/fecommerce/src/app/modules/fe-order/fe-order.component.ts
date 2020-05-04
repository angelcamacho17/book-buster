import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setHeaderTitleRequest, Order } from '@fecommerce-workspace/data-store-lib';
import { Customer } from '@fecommerce-workspace/data-store-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'fe-order',
  templateUrl: './fe-order.component.html',
  styleUrls: ['./fe-order.component.scss']
})
export class FeOrderComponent implements OnInit {

  public $order: Observable<Order>;
  public order: Order;

  constructor( private _store: Store<{currentOrder: Order}>) {
    this.$order = this._store.pipe(select('currentOrder'));
    this.$order.subscribe(data => {
      this.order = data;
    })
  }

  ngOnInit(): void {
  }

}
