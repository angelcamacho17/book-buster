import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHeaderTitleRequest } from '@fecommerce-workspace/data-store-lib';
import { Article } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'fe-article',
  templateUrl: './fe-article.component.html',
  styleUrls: ['./fe-article.component.scss']
})
export class FeArticleComponent implements OnInit {

  public articles: Article[] = [
    {
      id: 1,
      name: 'Envelope',
      descrip: 'articles envelope'
    },
    {
      id: 2,
      name: 'Box',
      descrip: 'articles box'
    },
    {
      id: 3,
      name: 'Food',
      descrip: 'articles foos'
    },
    {
      id: 4,
      name: 'Wood',
      descrip: 'articles wood'
    },
    {
      id: 5,
      name: 'Wires',
      descrip: 'articles wires'
    },
    {
      id: 6,
      name: 'Alcohol',
      descrip: 'articles alcohol'
    },
    {
      id: 7,
      name: 'Wines',
      descrip: 'articles wines'
    },

  ];

  constructor( private _store: Store) {
    this._store.dispatch(setHeaderTitleRequest({title: 'New order'}));
  }

  ngOnInit(): void {
  }

}
