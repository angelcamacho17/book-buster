import { ActionReducerMap, State } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Order } from './models/order.model';
import { RouterStateUrl } from './router/router.reducer';
import { ordersReducer, currentOrderReducer } from './order/order.reducer';
import { customersReducer } from './customer/customer.reducer';
import { Customer } from './models/customer.model';
import { articlesReducer } from './article/article.reducer';
import { Article } from './models/article.model';

export const FEATURE_NAME = 'examples';

export const reducers: ActionReducerMap<AppState> = {
  orders: ordersReducer,
  router: routerReducer,
  customers: customersReducer,
  currentOrder: currentOrderReducer,
  articles: articlesReducer
};

export interface AppState {
  orders: Order[],
  router: RouterReducerState<RouterStateUrl>,
  customers: Customer[],
  currentOrder: Order,
  articles: Article[]
}
