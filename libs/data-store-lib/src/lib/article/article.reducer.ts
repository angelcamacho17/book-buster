import { createReducer, on } from '@ngrx/store';
import { Article, ArticleState } from '../models/article.model';
import { refreshArticlesDone } from './article.actions';

export const initialState: ArticleState = {
    articles: []
};

export const articlesReducer = createReducer<Article[]>(initialState.articles,
    on(refreshArticlesDone, (_, action) => action.articles)
);
