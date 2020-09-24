import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { IOrder } from './models/order.model';
import { RouterStateUrl } from './router/router.reducer';
import { ordersReducer, currentOrderReducer } from './order/order.reducer';
import { customersReducer, customerReducer } from './customer/customer.reducer';
import { ICustomer } from './models/customer.model';
import { IArticle } from './models/article.model';
import { articlesReducer, articleReducer } from './article/article.reducer';
import { IHeader } from './models/header.model';
import { headersReducer } from './header/header.reducer';

export const FEATURE_NAME = 'examples';

export const reducers: ActionReducerMap<AppState> = {
  orders: ordersReducer,
  router: routerReducer,
  customers: customersReducer,
  customer: customerReducer,
  currentOrder: currentOrderReducer,
  article: articleReducer,
  articles: articlesReducer,
  header: headersReducer
};

export interface AppState {
  orders: IOrder[],
  router: RouterReducerState<RouterStateUrl>,
  customers: ICustomer[],
  customer: ICustomer,
  currentOrder: IOrder,
  article: IArticle,
  articles: IArticle[],
  header: IHeader
}
