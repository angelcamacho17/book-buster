import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Order, getCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'fe-fe-order-items',
  templateUrl: './fe-order-items.component.html',
  styleUrls: ['./fe-order-items.component.scss']
})
export class FeOrderItemsComponent implements OnInit, OnDestroy {

  public $order: Observable<Order>;
  public order: Order;
  private _subs: Subscription;

  constructor(private _store: Store<{currentOrder: Order}>,
              private _router: Router) {
    this.$order = this._store.pipe(select('currentOrder'));
    this._subs = this.$order.subscribe(data => {
      this.order = data;
    })

    this._store.dispatch(getCurrentOrderRequest());
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this._subs) {
      this._subs.unsubscribe();
    }
  }

}
