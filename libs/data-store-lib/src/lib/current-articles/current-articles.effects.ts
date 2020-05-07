import { ArticleService } from './Article.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { refreshArticlesRequest, refreshArticlesDone, appendArticleRequest, replaceArticleRequest, deleteArticleRequest } from './Article.actions';
import { EMPTY } from 'rxjs';

@Injectable()
export class ArticleEffects{
  constructor(private ArticleService: ArticleService,
              private actions$: Actions) { }

  refreshArticles$ = createEffect(() =>this.actions$.pipe(
    ofType(refreshArticlesRequest),
    mergeMap(() => {
      return this.ArticleService.all().pipe(
        map(Articles => refreshArticlesDone({Articles})),
        catchError(() => EMPTY)
      );
    })
  ))

  appendArticle$ = createEffect(():any => this.actions$.pipe(
    ofType(appendArticleRequest),
    mergeMap((action) => {
      return this.ArticleService.append(action.Article).pipe(
        map(() => refreshArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  replaceArticle$ = createEffect(():any => this.actions$.pipe(
    ofType(replaceArticleRequest),
    mergeMap((action) => {
      console.log('replace effect');
      console.log(action.Article);
      return this.ArticleService.replace(action.Article).pipe(
        map(() => refreshArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  deleteArticle$ = createEffect(():any =>
    this.actions$.pipe(
    ofType(deleteArticleRequest),
    mergeMap((action) => {
      return this.ArticleService.delete(action.ArticleId).pipe(
        map(() => refreshArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

}
