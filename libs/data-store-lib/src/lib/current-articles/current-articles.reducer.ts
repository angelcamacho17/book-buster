import { createReducer, on } from '@ngrx/store';
import { refreshCustomersDone, editCustomer, cancelCustomer } from './customer.actions';
import { Article } from '../models/article.model';

export const initialState: CurrentArticlesState = {
  articles: []
};

export const customersReducer = createReducer<Article[]>(initialState.articles,
  on(refreshArticlesDone, (_, action) => action.articles),
);

