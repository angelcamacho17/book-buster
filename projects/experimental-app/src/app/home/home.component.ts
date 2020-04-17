import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Score } from 'projects/data-store/src/lib/models/score.model';
import { increment, decrement, reset } from 'projects/data-store/src/lib/actions/score.actions';
import { HomeService } from './home.service';
import { Order } from 'projects/models-lib/src/lib/models/order.model';
import { refreshOrdersRequest } from 'projects/data-store/src/lib/order/order.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public orders$: Observable<Order>;
  public orders: Order;
  public score: Score;

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
