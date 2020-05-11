import { createReducer, on } from '@ngrx/store';
import { Article, ArticleState, ArticlesState } from '../models/article.model';
import { refreshArticlesDone, getArticleDone } from './article.actions';

export const initialArticlesState: ArticlesState = {
    articles: []
};

export const initialArticleState: ArticleState = {
    article: null
};

export const articlesReducer = createReducer<Article[]>(initialArticlesState.articles,
    on(refreshArticlesDone, (_, action) => action.articles)
);

export const articleReducer = createReducer<Article>(initialArticleState.article,
    on(getArticleDone, (_, action) => action.article)
);
