import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Article, Order, getCurrentOrderRequest, refreshArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { FeArticleRowComponent } from '../shared/components/fe-row/fe-article-row/fe-article-row.component';
import { Observable, Subscription, Subscriber } from 'rxjs';
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
  private _subscriptions = new Subscription();

  constructor(private _store: Store<{ articles: Article[], currentOrder: Order }>,
    private _router: Router) {
    this._articles$ = this._store.pipe(select('articles'));

    this._subscriptions.add(this._articles$.subscribe(data => {
      this.articles = data;
    }));
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

    setTimeout(() => {
      this._router.navigate(['/order']);
    }, 100);

  }
}
