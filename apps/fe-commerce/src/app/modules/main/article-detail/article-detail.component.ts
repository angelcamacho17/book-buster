import { Component, OnInit } from '@angular/core';
import { IArticle, IOrder, IOrderArticle, getCurrentOrderRequest, getArticleRequest, setOrderArticlesRequest, replaceOrderArticleRequest, appendOrderArticleRequest, replaceCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public amount = 1;
  private _article$: Observable<IArticle>;
  private _currentOrder$: Observable<IOrder>;
  private _orderArticles$: Observable<IOrderArticle[]>
  article: IArticle;
  orderArticles: IOrderArticle[];
  currentOrder: IOrder;
  private _subscriptions = new Subscription();


  constructor(
    private _store: Store<{ article: IArticle, currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
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
    let orderArticle: IOrderArticle = {
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

  public updatedOrder(): IOrder {
    const order: IOrder = {
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
