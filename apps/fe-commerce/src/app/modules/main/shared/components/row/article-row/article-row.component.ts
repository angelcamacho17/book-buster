import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { IArticle, changedNavigationRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { RowComponent } from '../row.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'article-row',
  templateUrl: './article-row.component.html',
  styleUrls: ['./article-row.component.scss']
})
export class ArticleRowComponent implements OnInit {

  @Input() item: any;

  constructor(private _router: Router,
              private _store: Store) { }

  ngOnInit(): void {
  }

  openArticleDetail(item) {
    this._router.navigate(['/article/detail', item.id]);
  }
}
