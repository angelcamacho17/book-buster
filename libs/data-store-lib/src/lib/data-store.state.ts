import { ActionReducerMap, State } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Order } from './models/order.model';
import { RouterStateUrl } from './router/router.reducer';
import { ordersReducer, currentOrderReducer } from './order/order.reducer';
import { headerReducer } from './header/header.reducer';
import { customersReducer } from './customer/customer.reducer';
import { Customer } from './models/customer.model';
import { articlesReducer } from './article/article.reducer';
import { Article } from './models/article.model';

export const FEATURE_NAME = 'examples';

export const reducers: ActionReducerMap<AppState> = {
  articles: articlesReducer,
  orders: ordersReducer,
  header: headerReducer,
  router: routerReducer,
  customers: customersReducer,
  currentOrder: currentOrderReducer
};

export interface AppState {
  articles: Article[],
  orders: Order[],
  header: string,
  router: RouterReducerState<RouterStateUrl>,
  customers: Customer[],
  currentOrder: Order
}
