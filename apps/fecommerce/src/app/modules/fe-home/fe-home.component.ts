import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '@fecommerce-workspace/data-store-lib';
import { refreshOrdersRequest } from '@fecommerce-workspace/data-store-lib';
// import * as ordersData from '../../../assets/data/orders.json';

@Component({
  selector: 'fe-home',
  templateUrl: './fe-home.component.html',
  styleUrls: ['./fe-home.component.scss'],
})
export class FeHomeComponent implements OnInit {
  public orders$: Observable<Order[]>;
  public orders: Order[];
  public display = false;

  constructor(
    private _store: Store,
    private _router: Router,
    private _storeOrders: Store<{ orders: Order[] }>
  ) {
    this.orders$ = this._storeOrders.pipe(select('orders'));
    
    this.orders$.subscribe(data => {
      this.orders = data;
    })
    
    this._storeOrders.dispatch(refreshOrdersRequest())
  }

  ngOnInit(): void {
    // console.log(this.orders)
    // console.log(ordersData.orders)
  }

  public createOrder(): void {
    this._router.navigate(['/neworder']);
  }

  public openOrder(order: Order): void {
    this._storeOrders.dispatch(setCurrentOrderRequest({order}))
    this._router.navigate(['/order']);
  }

}
