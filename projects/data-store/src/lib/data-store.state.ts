import { ActionReducerMap, State } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Order } from './models/order.model';
import { Header } from './models/header.model';
import { RouterStateUrl } from './router/router.reducer';
import { ordersReducer } from './order/order.reducer';
import { headerReducer } from './header/header.reducer';

export const FEATURE_NAME = 'examples';

export const reducers: ActionReducerMap<AppState> = {
  orders: ordersReducer,
  header: headerReducer,
  router: routerReducer
};

export interface AppState {
  orders: Order[],
  header: string,
  router: RouterReducerState<RouterStateUrl>
}
