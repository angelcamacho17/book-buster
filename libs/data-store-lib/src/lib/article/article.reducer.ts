import { createReducer, on } from '@ngrx/store';
import { IArticle, IArticleState, IArticlesState } from '../models/article.model';
import { refreshArticlesDone, getArticleDone } from './article.actions';

export const initialArticlesState: IArticlesState = {
    articles: []
};

export const initialArticleState: IArticleState = {
    article: null
};

export const articlesReducer = createReducer<IArticle[]>(initialArticlesState.articles,
    on(refreshArticlesDone, (_, action) => action.articles)
);

export const articleReducer = createReducer<IArticle>(initialArticleState.article,
    on(getArticleDone, (_, action) => action.article)
);
