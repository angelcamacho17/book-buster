import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setHeaderTitleRequest } from 'projects/data-store-lib/src/lib/header/header.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'projects/data-store-lib/src/lib/models/order.model';
import { refreshOrdersRequest } from 'projects/data-store-lib/src/lib/order/order.actions';

@Component({
  selector: 'app-fe-home',
  templateUrl: './fe-home.component.html',
  styleUrls: ['./fe-home.component.scss']
})
export class FeHomeComponent implements OnInit {
  public orders$: Observable<Order>;
  public orders: Order;

  constructor(
    private _store: Store,
    private _router: Router,
    private _storeOrders: Store<{ order: Order }>
  ) {
    this._store.dispatch(setHeaderTitleRequest({ title: 'home' }));
    this.orders$ = this._storeOrders.pipe(select('order'));
    this.orders$.subscribe(data => {
      console.log(data)
      this.orders = data;
    })
    this._storeOrders.dispatch(refreshOrdersRequest())
  }

  ngOnInit(): void {
    // console.log(this.orders)
  }

  public createOrder(): void {
    this._router.navigate(['/neworder']);
  }

}
