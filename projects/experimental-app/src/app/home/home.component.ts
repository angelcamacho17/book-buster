import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Score } from 'projects/data-store/src/lib/models/score.model';
import { increment, decrement, reset } from 'projects/data-store/src/lib/actions/score.actions';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public scores$: Observable<Score>;
  public score: Score;

  constructor(private store: Store<{ score: Score}>,
              private hs: HomeService) {
    this.scores$ = store.pipe(select('score'));
    this.scores$.subscribe(data => {
      this.score = data;
    })

    this.hs.all().subscribe(data=>{
      console.log(data)
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
