import { createReducer, on } from '@ngrx/store';
import { refreshOrderArticlesDone } from './order-articles.actions';
import { OrderArticle, OrderArticlesState } from '../models/order-article.model';

export const initialState: OrderArticlesState = {
  orderArticles: []
};

export const orderArticlesReducer = createReducer<OrderArticle[]>(initialState.orderArticles,
  on(refreshOrderArticlesDone, (_, action) => {
    return action.orderArticles }),
);

