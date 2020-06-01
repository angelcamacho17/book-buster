import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { Order, getCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fe-order-items',
  templateUrl: './fe-order-items.component.html',
  styleUrls: ['./fe-order-items.component.scss']
})
export class FeOrderItemsComponent implements OnInit, OnDestroy {

  public $order: Observable<Order>;
  public order: Order;
  private _subscriptions = new Subject<any>();
  public totalAmount = 0;

  constructor(
    private _store: Store<{ currentOrder: Order }>,
    private _router: Router) {
    this.$order = this._store.pipe(select('currentOrder'));
    this.$order.pipe(takeUntil(this._subscriptions))
    .subscribe(data => {
      this.order = data;
      this.totalAmount = this.getTotal();
    });

    this._store.dispatch(getCurrentOrderRequest());
  }


  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this._subscriptions.next();
    this._subscriptions.complete();
  }

}
