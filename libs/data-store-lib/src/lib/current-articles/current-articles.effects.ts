import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CurrentArticlesService } from './current-articles.service';
import { refreshCurrentArticlesRequest, refreshCurrentArticlesDone, replaceCurrentArticleRequest, appendCurrentArticleRequest, deleteCurrentArticleRequest } from './current-articles.actions';

@Injectable()
export class ArticleEffects{
  constructor(private currentArticlesService: CurrentArticlesService,
              private actions$: Actions) { }

  refreshCurrentArticles$ = createEffect(() => this.actions$.pipe(
    ofType(refreshCurrentArticlesRequest),
    mergeMap(() => {
      return this.currentArticlesService.all().pipe(
        map(articles => refreshCurrentArticlesDone({ articles })),
        catchError(() => EMPTY)
      );
    })
  ))

  appendArticle$ = createEffect(():any => this.actions$.pipe(
    ofType(appendCurrentArticleRequest),
    mergeMap((action) => {
      return this.currentArticlesService.append(action.article).pipe(
        map(() => refreshCurrentArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  replaceArticle$ = createEffect(():any => this.actions$.pipe(
    ofType(replaceCurrentArticleRequest),
    mergeMap((action) => {
      return this.currentArticlesService.replace(action.article).pipe(
        map(() => refreshCurrentArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

  deleteArticle$ = createEffect(():any =>
    this.actions$.pipe(
    ofType(deleteCurrentArticleRequest),
    mergeMap((action) => {
      return this.currentArticlesService.delete(action.articleId).pipe(
        map(() => refreshCurrentArticlesRequest()),
        catchError(() => EMPTY)
      );
    })
  ))

}
