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
  private _subs: Subscription;

  constructor(private _store: Store<{ articles: Article[], currentOrder: Order }>,
    private _router: Router) {
    this._articles$ = this._store.pipe(select('articles'));

    this._subs = this._articles$.subscribe(data => {
      this.articles = data;
      console.log(data)
    });
    this._store.dispatch(refreshArticlesRequest());
    // console.log("asd", data)
    // console.log("articles", this.articles)

    // this._currentOrder$ = this._store.pipe(select('currentOrder'));
    // this._subs = this._currentOrder$.subscribe(data => {
    //   this.currentOrder = data;
    // });

    // this._store.dispatch(getCurrentOrderRequest());
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subs) {
      this._subs.unsubscribe();
    }
  }

  public overviewOrder(): void {

    setTimeout(() => {
      this._router.navigate(['/order']);
    }, 100);

  }
}
