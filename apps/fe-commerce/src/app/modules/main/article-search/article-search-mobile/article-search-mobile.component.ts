import { Component, OnInit } from '@angular/core';
import { ArticleSearchComponent } from '../article-search.component';
import { Store, select } from '@ngrx/store';
import { OrderService, IArticle, IOrder, refreshArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'article-search-mobile',
  templateUrl: './article-search-mobile.component.html',
  styleUrls: ['./article-search-mobile.component.scss']
})
export class ArticleSearchMobileComponent extends ArticleSearchComponent implements OnInit {

  constructor(
    public store: Store<{ articles: IArticle[], currentOrder: IOrder }>,
    public ordSer: OrderService,
    public router: Router,
    public layoutService: LayoutService
  ) {
    super(store, ordSer, router, layoutService)
  }

  ngOnInit(): void {

    this._articles$ = this.store.pipe(select('articles'));

    this._subscriptions.add(
      this._articles$.subscribe(data => {
        this.articles = data;
      })
    );
    if (this.ordSer.currentOrder?.id) {
      this.lastUrl = 'orderitems';
    }
    this.store.dispatch(refreshArticlesRequest());
  }

}
