import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
      description: 'articles envelope'
    },
    {
      id: 2,
      name: 'Box',
      description: 'articles box'
    },
    {
      id: 3,
      name: 'Food',
      description: 'articles foos'
    },
    {
      id: 4,
      name: 'Wood',
      description: 'articles wood'
    },
    {
      id: 5,
      name: 'Wires',
      description: 'articles wires'
    },
    {
      id: 6,
      name: 'Alcohol',
      description: 'articles alcohol'
    },
    {
      id: 7,
      name: 'Wines',
      description: 'articles wines'
    },

  ];

  constructor( private _store: Store) {
  }

  ngOnInit(): void {
  }

}
