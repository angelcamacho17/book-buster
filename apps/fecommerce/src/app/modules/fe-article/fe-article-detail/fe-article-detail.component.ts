import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article, Order, getArticleRequest, getCurrentOrderRequest, appendOrderArticleRequest, OrderArticle, replaceCurrentOrderRequest, setOrderArticlesRequest, replaceOrderArticleRequest } from '@fecommerce-workspace/data-store-lib';
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
  public amount = 1;
  private _article$: Observable<Article>;
  private _currentOrder$: Observable<Order>;
  private _orderArticles$: Observable<OrderArticle[]>
  article: Article;
  orderArticles: OrderArticle[];
  currentOrder: Order;
  private _subscriptions = new Subscription();


  constructor(
    private _store: Store<{ article: Article, currentOrder: Order, orderArticles: OrderArticle[] }>,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._article$ = this._store.pipe(select('article'));
    this._subscriptions = this._article$.subscribe(data => {
      this.article = data;
    });

    this._currentOrder$ = this._store.pipe(select('currentOrder'));
    this._subscriptions = this._currentOrder$.subscribe(data => {
      this.currentOrder = data;
    });
    this._store.dispatch(getCurrentOrderRequest())

    this._orderArticles$ = this._store.pipe(select('orderArticles'));
    this._subscriptions = this._orderArticles$.subscribe(data => {
      this.orderArticles = data;
    });
  }

  ngOnInit(): void {
    this.getArticle()
  }

  public getArticle() {
    let articleId: number;

    this._route.paramMap.pipe(
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
    let orderArticle: OrderArticle = {
      article: this.article,
      quantity: this.amount
    }
    const orderArticles = this.currentOrder.articles;
    if (orderArticles.length > 0) {
      this._store.dispatch(setOrderArticlesRequest({ orderArticles }));
    }
    const existingOrderArticle = this.orderArticles.find((o) => o.article.id === this.article.id);
    if (existingOrderArticle) {
      orderArticle = {
        id: existingOrderArticle.id,
        article: this.article,
        quantity: (existingOrderArticle.quantity + this.amount)
      }
      this._store.dispatch(replaceOrderArticleRequest({ orderArticle }))
    } else {
      this._store.dispatch(appendOrderArticleRequest({ orderArticle }));
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
    this._subscriptions.unsubscribe();
  }
}
