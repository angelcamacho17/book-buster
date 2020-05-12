import { Component, OnInit, Input } from '@angular/core';
import { Article, Order, getArticleRequest, OrderArticle, appendOrderArticleRequest } from '@fecommerce-workspace/data-store-lib';
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
  article: Article;
  private _subscriptions = new Subscription();

  constructor(
    private _store: Store<{ article: Article, currentOrder: Order }>,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._article$ = this._store.pipe(select('article'));
    this._article$.subscribe(data => {
      console.log(data)
      this.article = data;
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
    this.amount--;
  }

  addToOrder() {
    const orderArticle: OrderArticle = {
      article: this.article,
      quantity: this.amount
    }
    this._store.dispatch(appendOrderArticleRequest({ orderArticle }));
    this._router.navigate(['/article']);
  }
}
