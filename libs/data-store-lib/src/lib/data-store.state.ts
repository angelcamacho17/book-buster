import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { IOrder } from './models/order.model';
import { RouterStateUrl } from './router/router.reducer';
import { ordersReducer, currentOrderReducer } from './order/order.reducer';
import { customersReducer } from './customer/customer.reducer';
import { ICustomer } from './models/customer.model';
import { IArticle } from './models/article.model';
import { articlesReducer, articleReducer } from './article/article.reducer';
import { orderArticlesReducer } from './order-articles/order-articles.reducer';
import { IOrderArticle } from './models/order-article.model';
import { backNavigationReducer } from './back-navigation/back-navigation.reducer';
import { IHeader } from './models/header.model';
import { headersReducer } from './header/header.reducer';

export const FEATURE_NAME = 'examples';

export const reducers: ActionReducerMap<AppState> = {
  orders: ordersReducer,
  router: routerReducer,
  customers: customersReducer,
  currentOrder: currentOrderReducer,
  article: articleReducer,
  articles: articlesReducer,
  orderArticles: orderArticlesReducer,
  backNavigation: backNavigationReducer,
  header: headersReducer
};

export interface AppState {
  orders: IOrder[],
  router: RouterReducerState<RouterStateUrl>,
  customers: ICustomer[],
  currentOrder: IOrder,
  article: IArticle,
  articles: IArticle[],
  orderArticles: IOrderArticle[],
  backNavigation: string,
  header: IHeader
}
