import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { OrderArticlesService } from './order-articles.service';
import { refreshOrderArticlesRequest, refreshOrderArticlesDone, appendOrderArticleRequest, deleteOrderArticleRequest } from './order-articles.actions';

@Injectable()
export class OrderArticleEffects{
  constructor(private orderArticlesService: OrderArticlesService,
              private actions$: Actions) { }

  refreshOrderArticles$ = createEffect(() => this.actions$.pipe(
    ofType(refreshOrderArticlesRequest),
    mergeMap(() => {
      return this.orderArticlesService.all().pipe(
        map(orderArticles => {
          console.log(orderArticles);
          return refreshOrderArticlesDone({ orderArticles })
         }),
        catchError(() => EMPTY)
      );
    })
  ))

  appendArticle$ = createEffect(():any => this.actions$.pipe(
    ofType(appendOrderArticleRequest),
    mergeMap((action) => {
      return this.orderArticlesService.append(action.orderArticle).pipe(
        map(() => refreshOrderArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  /* replaceArticle$ = createEffect(():any => this.actions$.pipe(
    ofType(replaceCurrentArticleRequest),
    mergeMap((action) => {
      return this.orderArticlesService.replace(action.article).pipe(
        map(() => refreshOrderArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))*/

  deleteArticle$ = createEffect(():any =>
    this.actions$.pipe(
    ofType(deleteOrderArticleRequest),
    mergeMap((action) => {
      return this.orderArticlesService.delete(action.orderArticleId).pipe(
        map(() => refreshOrderArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ));

}
