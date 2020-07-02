import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Article, Order, refreshArticlesRequest, changedNavigationRequest, setCurrentOrderRequest, OrderService, TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { FeArticleRowComponent } from '../shared/components/fe-row/fe-article-row/fe-article-row.component';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  public emptyResults = true;
  public filteredResults: Article[] = [];
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

    window.addEventListener('keyboardWillShow', (e) => {
      console.log('keyboard will show! ', e);
  });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public overviewOrder(): void {
    if (this._ordSer.currentOrder?.id) {
      this._router.navigate(['/order/edit']);
    } else {
      this._router.navigate(['/order']);
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
}
