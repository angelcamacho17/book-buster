import { createReducer, on } from '@ngrx/store';
import { refreshCurrentArticlesDone } from './current-articles.actions';
import { Article, ArticleState } from '../models/article.model';

export const initialState: ArticleState = {
  articles: []
};

export const articlesReducer = createReducer<Article[]>(initialState.articles,
  on(refreshCurrentArticlesDone, (_, action) => action.articles),
);

