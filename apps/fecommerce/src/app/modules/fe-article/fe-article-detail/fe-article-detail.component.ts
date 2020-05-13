import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
export class FeArticleDetailComponent implements OnInit, OnDestroy {
  title = "Article detail";
  amount = 0;
  private _article$: Observable<Article>;
  article: Article;
  private _subs = new Subscription();


  constructor(
    private _store: Store<{ article: Article, currentOrder: Order }>,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
     this._article$ = this._store.pipe(select('article'));
     this._subs = this._article$.subscribe(data => {
      console.log(data)
      this.article = data;
    })
  }

  ngOnInit(): void {
    this.getArticle()
  }

  public getArticle() {
    let articleId: number;
    this._subs.add(
      this._route.paramMap.pipe(
        map((params: ParamMap) => articleId = +params.get('id'))
      ).subscribe(() => {
        this._store.dispatch(getArticleRequest({ articleId }));
      })
    );
  }

  public addQuantity() {
    this.amount++;
  }

  public removeQuantity() {
    this.amount--;
  }

  public addToOrder() {
    const orderArticle: OrderArticle = {
      article: this.article,
      quantity: this.amount
    }
    this._store.dispatch(appendOrderArticleRequest({ orderArticle }));
    this._router.navigate(['/article']);
  }

  ngOnDestroy(): void {
    if (this._subs) {
      this._subs.unsubscribe();
    }
  }
}
