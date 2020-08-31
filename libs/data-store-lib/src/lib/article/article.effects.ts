import { Injectable, ReflectiveInjector } from "@angular/core";
import { ArticleService } from './article.service';
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { refreshArticlesRequest, refreshArticlesDone, replaceArticleRequest, deleteArticleRequest, appendArticleRequest, getArticleRequest, getArticleDone } from './article.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY, merge } from 'rxjs';

@Injectable()
export class ArticleEffects {
    constructor(
        private articleService: ArticleService,
        private actions$: Actions
    ) { }

    getArticle$ = createEffect(() => this.actions$.pipe(
        ofType(getArticleRequest),
        mergeMap((action) => {
            return this.articleService.getArticle(action.articleId).pipe(
                map(article => getArticleDone({ article })),
                catchError(() => EMPTY)
            )
        })
    ));

    refreshArticles$ = createEffect(() => this.actions$.pipe(
        ofType(refreshArticlesRequest),
        mergeMap(() => {
            return this.articleService.getAll().pipe(
                map(articles => refreshArticlesDone({ articles })),
                catchError(() => EMPTY)
            )
        })
    ));

    appendArticle$ = createEffect((): any => this.actions$.pipe(
        ofType(appendArticleRequest),
        mergeMap((action) => {
            return this.articleService.replace(action.article).pipe(
                map(articles => refreshArticlesDone({ articles }))
            )
        })
    ));

    replaceArticle$ = createEffect((): any => this.actions$.pipe(
        ofType(replaceArticleRequest),
        mergeMap((action) => {
            return this.articleService.replace(action.article).pipe(
                map(() => refreshArticlesRequest()),
                catchError(() => EMPTY)
            )
        })
    ));

    deleteArticle = createEffect((): any => this.actions$.pipe(
        ofType(deleteArticleRequest),
        mergeMap((action) => {
            return this.articleService.delete(action.articleId).pipe(
                map(() => refreshArticlesRequest()),
                catchError(() => EMPTY)
            );
        })
    ));
}
