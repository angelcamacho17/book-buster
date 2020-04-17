import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ShoppingItem } from 'projects/data-store/src/lib/models/shopping,model';
import { AppState } from 'projects/data-store/src/lib/models/app-state.model';
import { appendOrderRequest, refreshOrdersRequest } from 'projects/data-store/src/lib/order/order.actions';
import { Score } from 'projects/data-store/src/lib/models/score.model';
import { Order } from 'dist/data-store/lib/models/order.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public scores$: Observable<Score>;
  public orders$: Observable<Order>;
  public score: Score;
  shoppingItems: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = { id: '', name: '' }

  ngOnInit() {
    this.shoppingItems = this.storeShopping.select(storeShopping => storeShopping.shopping);
  }

  constructor(private store: Store<{ score: Score}>, private storeShopping: Store<AppState>,
              private storeOrders: Store<{order: Order}>) {
    // this.scores$ = store.pipe(select('score'));
    // this.scores$.subscribe(data => {
    //   this.score = data;
    // })
    this.orders$ = storeOrders.pipe(select('order'));
    this.orders$.subscribe(data => {
      console.log(data);
    })
    this.storeOrders.dispatch(refreshOrdersRequest());
  }

  addOrder() {
    // const order: Order = {
    //   articles: ['e', 'r', 't']
    // }
    // this.storeOrders.dispatch(appendOrderRequest({order}));
  }
}
