import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { refreshOrdersRequest, appendOrderRequest } from 'projects/data-store/src/lib/order/order.actions';
import { Order } from 'projects/data-store/src/lib/models/order.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public orders$: Observable<Order>;
  public orders: Order;

  constructor( private storeOrders: Store<{order: Order}>) {
    this.orders$ = storeOrders.pipe(select('order'));
    this.orders$.subscribe(data => {
      this.orders = data;
    })
  }

  ngOnInit(): void {
  }

  createOrder(): void {
    const order: Order = {
      articles: [],
      descrip: 'Order'
    }
    this.storeOrders.dispatch(appendOrderRequest({order}));
  }
}
