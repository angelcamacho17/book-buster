import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Order } from './models/order.model';
import { RouterStateUrl } from './router/router.reducer';
import { ordersReducer, currentOrderReducer } from './order/order.reducer';
import { customersReducer } from './customer/customer.reducer';
import { Customer } from './models/customer.model';
import { Article } from './models/article.model';
import { articlesReducer, articleReducer } from './article/article.reducer';
import { orderArticlesReducer } from './order-articles/order-articles.reducer';
import { OrderArticle } from './models/order-article.model';
import { backNavigationReducer } from './back-navigation/back-navigation.reducer';
import { Header } from './models/header.model';
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
  orders: Order[],
  router: RouterReducerState<RouterStateUrl>,
  customers: Customer[],
  currentOrder: Order,
  article: Article,
  articles: Article[],
  orderArticles: OrderArticle[],
  backNavigation: string,
  header: Header
}
