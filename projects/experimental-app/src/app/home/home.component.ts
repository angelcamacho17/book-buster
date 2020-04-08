import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Score } from '../store-data/models/score.model';
import { AppState } from './../app.state';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../store-data/actions/score.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public scores$: Observable<Score>;
  public score: Score;

  constructor(private store: Store<{ score: Score}>) {
    this.scores$ = store.pipe(select('score'));
    this.scores$.subscribe(data => {
      this.score = data;
    })
  }

  ngOnInit(): void {
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

}
