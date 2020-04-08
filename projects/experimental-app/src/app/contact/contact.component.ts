import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Score } from 'dist/data-store/lib/models/score.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

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

}
