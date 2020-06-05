import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article, Order, getArticleRequest, getCurrentOrderRequest, appendOrderArticleRequest, OrderArticle, replaceCurrentOrderRequest, setOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fe-article-detail',
  templateUrl: './fe-article-detail.component.html',
  styleUrls: ['./fe-article-detail.component.scss']
})
export class FeArticleDetailComponent implements OnInit, OnDestroy {
  public title = "Article detail";
  public amount = 0;
  private _article$: Observable<Article>;
  private _currentOrder$: Observable<Order>;
  private _orderArticles$: Observable<OrderArticle[]>
  article: Article;
  orderArticles: OrderArticle[];
  currentOrder: Order;
  private _subscriptions = new Subject<any>();


  constructor(
    private _store: Store<{ article: Article, currentOrder: Order, orderArticles: OrderArticle[] }>,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._article$ = this._store.pipe(select('article'));
    this._article$.pipe(takeUntil(this._subscriptions))
      .subscribe(data => {
        this.article = data;
      });

    this._currentOrder$ = this._store.pipe(select('currentOrder'));
    this._currentOrder$.pipe(takeUntil(this._subscriptions))
      .subscribe(data => {
        this.currentOrder = data;
      });
    this._store.dispatch(getCurrentOrderRequest())

    this._orderArticles$ = this._store.pipe(select('orderArticles'));
    this._orderArticles$.pipe(takeUntil(this._subscriptions))
      .subscribe(data => {
        this.orderArticles = data;
      });
  }

  ngOnInit(): void {
    this.getArticle()
  }

  public getArticle() {
    let articleId: number;

    this._route.paramMap.pipe(
      takeUntil(this._subscriptions),
      map((params: ParamMap) => articleId = +params.get('id'))
    ).subscribe(() => {
      this._store.dispatch(getArticleRequest({ articleId }));
    })
  }

  public addQuantity() {
    this.amount++;
  }

  removeQuantity() {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  public addToOrder() {
    const orderArticle: OrderArticle = {
      article: this.article,
      quantity: this.amount
    }

    const orderArticles = this.currentOrder.articles;
    if (orderArticles.length > 0) {
      this._store.dispatch(setOrderArticlesRequest({ orderArticles }));
    }
    this._store.dispatch(appendOrderArticleRequest({ orderArticle }));
    if (this.updatedOrder() === null) {
    }
    this._store.dispatch(replaceCurrentOrderRequest({ order: this.updatedOrder() }))
    this._router.navigate(['/article']);
  }

  public returnUrl(): void {
    this._router.navigate(['/article']);
  }

  public updatedOrder(): Order {
    const order: Order = {
      id: this.currentOrder?.id,
      description: this.currentOrder.description,
      articles: this.orderArticles,
      amount: this.currentOrder.amount,
      customer: this.currentOrder.customer,
      createdBy: this.currentOrder.createdBy
    };
    return order;
  }

  ngOnDestroy(): void {
    this._subscriptions.next();
    this._subscriptions.complete();
  }
}
