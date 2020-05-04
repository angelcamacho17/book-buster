import { ActionReducerMap, State } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Order } from './models/order.model';
import { RouterStateUrl } from './router/router.reducer';
import { ordersReducer, currentOrderReducer } from './order/order.reducer';
import { headerReducer } from './header/header.reducer';
import { customersReducer } from './customer/customer.reducer';
import { Customer } from './models/customer.model';

export const FEATURE_NAME = 'examples';

export const reducers: ActionReducerMap<AppState> = {
  orders: ordersReducer,
  header: headerReducer,
  router: routerReducer,
  customers: customersReducer,
  currentOrder: currentOrderReducer
};

export interface AppState {
  orders: Order[],
  header: string,
  router: RouterReducerState<RouterStateUrl>,
  customers: Customer[],
  currentOrder: Order
}
