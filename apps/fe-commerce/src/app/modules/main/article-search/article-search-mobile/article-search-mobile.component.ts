import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleSearchComponent } from '../article-search.component';
import { Store, select } from '@ngrx/store';
import { OrderService, IArticle, IOrder, refreshArticlesRequest, getCurrentOrderRequest, IOrderArticle } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'article-search-mobile',
  templateUrl: './article-search-mobile.component.html',
  styleUrls: ['./article-search-mobile.component.scss']
})
export class ArticleSearchMobileComponent extends ArticleSearchComponent implements OnInit, OnDestroy {

  constructor(
    public store: Store<{ articles: IArticle[], currentOrder: IOrder, orderArticles: IOrderArticle[]  }>,
    public ordSer: OrderService,
    public router: Router,
    public layoutService: LayoutService,
    public snackBar: MatSnackBar,
    public eventService: EventService
  ) {
    super(store, ordSer, router, layoutService, snackBar, eventService)
  }

  ngOnInit(): void {

    this._articles$ = this.store.pipe(select('articles'));

    this._subscriptions.add(
      this._articles$.subscribe(data => {
        this.articles = data;
      })
    );

    this._currentOrder$ = this.store.pipe(select('currentOrder'));
    this._subscriptions.add(this._currentOrder$.subscribe(data => {
      this.currentOrder = data;
    }));

    this._orderArticles$ = this.store.pipe(select('orderArticles'));
    this._subscriptions.add(this._orderArticles$.subscribe(data => {
      this.orderArticles = data;
    }));

    this.store.dispatch(getCurrentOrderRequest());
    this.store.dispatch(refreshArticlesRequest());

    setTimeout(()=>{
      this.scanner = true;
    }, 100);

  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
