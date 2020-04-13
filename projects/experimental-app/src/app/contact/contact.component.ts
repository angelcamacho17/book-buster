import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Score } from 'dist/data-store/lib/models/score.model';
import { ShoppingItem } from 'projects/data-store/src/lib/models/shopping,model';
import { AppState } from 'projects/data-store/src/lib/models/app-state.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public scores$: Observable<Score>;
  public score: Score;
  shoppingItems: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = { id: '', name: '' }

  ngOnInit() {
    this.shoppingItems = this.storeShopping.select(storeShopping => storeShopping.shopping);
  }

  constructor(private store: Store<{ score: Score}>, private storeShopping: Store<AppState>) {
    this.scores$ = store.pipe(select('score'));
    this.scores$.subscribe(data => {
      this.score = data;
    })
  }
}
