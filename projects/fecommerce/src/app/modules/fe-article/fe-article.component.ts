import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHeaderTitleRequest } from 'projects/data-store-lib/src/lib/header/header.actions';

@Component({
  selector: 'app-fe-article',
  templateUrl: './fe-article.component.html',
  styleUrls: ['./fe-article.component.scss']
})
export class FeArticleComponent implements OnInit {

  constructor( private _store: Store) {
    this._store.dispatch(setHeaderTitleRequest({title: 'article'}));
  }

  ngOnInit(): void {
  }

}
