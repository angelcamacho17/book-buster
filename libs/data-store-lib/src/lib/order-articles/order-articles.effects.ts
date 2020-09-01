import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY, merge } from 'rxjs';
import { OrderArticlesService } from './order-articles.service';
import { refreshOrderArticlesRequest, refreshOrderArticlesDone, appendOrderArticleRequest, setOrderArticlesRequest, deleteOrderArticleRequest, replaceOrderArticleRequest } from './order-articles.actions';

@Injectable()
export class OrderArticleEffects{
  constructor(private orderArticlesService: OrderArticlesService,
              private actions$: Actions) { }

  refreshOrderArticles$ = createEffect(() => this.actions$.pipe(
    ofType(refreshOrderArticlesRequest),
    mergeMap(() => {
      return this.orderArticlesService.getAll().pipe(
        map(orderArticles => {
          return refreshOrderArticlesDone({ orderArticles })
         }),
        catchError(() => EMPTY)
      );
    })
  ))

  setOrderArticles$ = createEffect((): any => this.actions$.pipe(
    ofType(setOrderArticlesRequest),
    mergeMap((action) => {
      return this.orderArticlesService.setOrderArticles(action.orderArticles).pipe(
        map(orderArticles =>{
          this.orderArticlesService.setTotal();
          return refreshOrderArticlesDone({ orderArticles })
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  appendArticle$ = createEffect(():any => this.actions$.pipe(
    ofType(appendOrderArticleRequest),
    mergeMap((action) => {
      this.orderArticlesService.setTotal();
      return this.orderArticlesService.append(action.orderArticle).pipe(
        map(() => refreshOrderArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  replaceArticle$ = createEffect(():any => this.actions$.pipe(
    ofType(replaceOrderArticleRequest),
    mergeMap((action) => {
      this.orderArticlesService.setTotal();
      return this.orderArticlesService.replace(action.orderArticle).pipe(
        map(() => refreshOrderArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  deleteArticle$ = createEffect(():any =>
    this.actions$.pipe(
    ofType(deleteOrderArticleRequest),
    mergeMap((action) => {
      this.orderArticlesService.setTotal();
      return this.orderArticlesService.delete(action.orderArticleId).pipe(
        map(() => refreshOrderArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ));

}
