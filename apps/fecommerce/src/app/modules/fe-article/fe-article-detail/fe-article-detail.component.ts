import { Component, OnInit, Input } from '@angular/core';
import { Article, Order, getArticleRequest, getCurrentOrderRequest, appendOrderArticleRequest, refreshOrderArticlesRequest, OrderArticle, replaceArticlesOnCurrentOrder } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'fe-article-detail',
  templateUrl: './fe-article-detail.component.html',
  styleUrls: ['./fe-article-detail.component.scss']
})
export class FeArticleDetailComponent implements OnInit {
  title = "Article detail";
  amount = 0;
  private _article$: Observable<Article>;
  private _currentOrder$: Observable<Order>;
  private _orderArticles$: Observable<OrderArticle[]>
  orderArticles: OrderArticle[];
  article: Article;
  private _subscriptions = new Subscription();

  constructor(
    private _store: Store<{ article: Article, currentOrder: Order, orderArticles: OrderArticle[] }>,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this._article$ = this._store.pipe(select('article'));
    this._article$.subscribe(data => {
      // console.log("article data",data)
      this.article = data;
    });
    
    this._currentOrder$ = this._store.pipe(select('currentOrder'));
    /* this._currentOrder$.subscribe(data => {
      console.log("current order data", data)
    })
    this._store.dispatch(getCurrentOrderRequest()) */
    
    this._orderArticles$ = this._store.pipe(select('orderArticles'));
    this._orderArticles$.subscribe(data => {
      console.log("order articles updated.", data)
      this.orderArticles = data;
    })
  }
  
  ngOnInit(): void {
    this.getArticle()
  }
  
  getArticle() {
    let articleId: number;
    this._subscriptions.add(
      this._route.paramMap.pipe(
        map((params: ParamMap) => articleId = +params.get('id'))
      ).subscribe(() => {
        this._store.dispatch(getArticleRequest({ articleId }));
      })
    );
  }

  addQuantity() {
    this.amount++;
  }

  removeQuantity() {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  addToOrder() {
    const orderArticle: OrderArticle = {
      article: this.article,
      quantity: this.amount
    }
    this._store.dispatch(appendOrderArticleRequest({ orderArticle }));
    this._store.dispatch(refreshOrderArticlesRequest())
    this._store.dispatch(getCurrentOrderRequest())
    this._store.dispatch(replaceArticlesOnCurrentOrder({ orderArticles: this.orderArticles }));
    this._router.navigate(['/article']);
  }
}
