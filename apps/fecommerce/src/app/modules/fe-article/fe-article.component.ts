import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Article, Order, refreshArticlesRequest, changedNavigationRequest, setCurrentOrderRequest, OrderService } from '@fecommerce-workspace/data-store-lib';
import { FeArticleRowComponent } from '../shared/components/fe-row/fe-article-row/fe-article-row.component';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fe-article',
  templateUrl: './fe-article.component.html',
  styleUrls: ['./fe-article.component.scss']
})
export class FeArticleComponent implements OnInit, OnDestroy {

  public rowType = FeArticleRowComponent;
  public articles: Article[] = [];
  private _articles$: Observable<Article[]>;
  // private _currentOrder$: Observable<Order>;
  // public currentOrder: Order;
  private _subscriptions: Subscription;
  public display = false;
  public navigation$: Observable<string>;
  public hide = false;
  public nodata = false;
  public shadow = false;
  public lastUrl = 'neworder';

  constructor(private _store: Store<{ articles: Article[], currentOrder: Order }>,
              private _ordSer: OrderService,
              private _router: Router) {

    this._articles$ = this._store.pipe(select('articles'));

    this._subscriptions = this._articles$.subscribe(data => {
      this.articles = data;

      });
    if (this._ordSer.currentOrder?.id) {
      this.lastUrl = 'orderitems';
    }
    this._store.dispatch(refreshArticlesRequest());
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public overviewOrder(): void {
    this._router.navigate(['/order']);
  }

  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
  }

  public removeDark(): void {
    this.shadow = false;
    this.hide = false;
  }

  public noDataPlaceholder(show: boolean): void {
    this.nodata = show;
  }


}
