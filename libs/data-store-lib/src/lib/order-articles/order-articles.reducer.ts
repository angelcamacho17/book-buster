import { createReducer, on } from '@ngrx/store';
import { refreshOrderArticlesDone } from './order-articles.actions';
import { IOrderArticle, IOrderArticlesState } from '../models/order-article.model';

export const initialState: IOrderArticlesState = {
  orderArticles: []
};

export const orderArticlesReducer = createReducer<IOrderArticle[]>(initialState.orderArticles,
  on(refreshOrderArticlesDone, (_, action) => {
    return action.orderArticles }),
);

