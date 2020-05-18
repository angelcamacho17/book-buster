import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Order, getCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'fe-order-items',
  templateUrl: './fe-order-items.component.html',
  styleUrls: ['./fe-order-items.component.scss']
})
export class FeOrderItemsComponent implements OnInit, OnDestroy {

  public $order: Observable<Order>;
  public order: Order;
  private _subscriptions = new Subscription();
  public totalAmount = 0;

  constructor(
    private _store: Store<{ currentOrder: Order }>,
    private _router: Router) {
    this.$order = this._store.pipe(select('currentOrder'));
    this._subscriptions.add(this.$order.subscribe(data => {
      this.order = data;
      this.totalAmount = this.getTotal();
    }));

    this._store.dispatch(getCurrentOrderRequest());
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public getTotal(): number {
    if (this.order == null) {
      return 0;
    }
    
    let total = 0;
    for (const orderArticle of this.order.articles) {
      total = total + orderArticle.article.price;
    }

    return Math.round(total * 100) / 100;
  }

}
