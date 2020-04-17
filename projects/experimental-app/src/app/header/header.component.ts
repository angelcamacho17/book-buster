import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from 'projects/models-lib/src/lib/models/order.model';
import { refreshOrdersRequest, appendOrderRequest } from 'projects/data-store/src/lib/order/order.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public orders$: Observable<Order>;

  constructor( private storeOrders: Store<{order: Order}>) {
    this.orders$ = storeOrders.pipe(select('order'));
    this.orders$.subscribe(data => {
      console.log(data);
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
