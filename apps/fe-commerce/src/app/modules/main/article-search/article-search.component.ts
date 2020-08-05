import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ArticleRowComponent } from '../shared/components/row/article-row/article-row.component';
import { IArticle, OrderService, IOrder, refreshArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent implements OnInit, OnDestroy {
  public rowType = ArticleRowComponent;
  public articles: IArticle[] = [];
  private _articles$: Observable<IArticle[]>;
  private _subscriptions: Subscription[] = [];
  public display = false;
  public navigation$: Observable<string>;
  public hide = false;
  public nodata = false;
  public shadow = false;
  public lastUrl = 'neworder';
  public emptyResults = true;
  public filteredResults: IArticle[] = [];
  constructor(
    private _store: Store<{ articles: IArticle[], currentOrder: IOrder }>,
    private _ordSer: OrderService,
    private _router: Router
  ) {

    this._articles$ = this._store.pipe(select('articles'));

    this._subscriptions.push(
      this._articles$.subscribe(data => {
        this.articles = data;
      })
    );
    if (this._ordSer.currentOrder?.id) {
      this.lastUrl = 'orderitems';
    }
    this._store.dispatch(refreshArticlesRequest());

  }

  ngOnInit(): void {
  }

  public overviewOrder(): void {
    if (this._ordSer.currentOrder?.id) {
      this._router.navigate(['/main/order-overview']);
    } else {
      this._router.navigate(['/main/order-overview']);
    }
  }

  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
  }


  public removeShadow(): void {
    this.shadow = false;
    this.hide = false;
  }

  public noDataPlaceholder(show: boolean): void {
    this.nodata = show;
  }

  handleSearchResults(results: any[]): void {
    this.emptyResults = results.length === 0;
    this.filteredResults = results;
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
  }
}

