import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { refreshOrdersRequest } from 'projects/data-store/src/lib/order/order.actions';
import { Order } from 'projects/data-store/src/lib/models/order.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public orders$: Observable<Order>;
  public orders: Order;

  constructor( private storeOrders: Store<{order: Order}>) {
    this.orders$ = storeOrders.pipe(select('order'));
    this.orders$.subscribe(data => {
      this.orders = data;
    })
    this.storeOrders.dispatch(refreshOrdersRequest());
  }

  ngOnInit(): void {
  }


  // increment() {
  //   this.store.dispatch(increment());
  // }

  // decrement() {
  //   this.store.dispatch(decrement());
  // }

  // reset() {
  //   this.store.dispatch(reset());
  // }

}
