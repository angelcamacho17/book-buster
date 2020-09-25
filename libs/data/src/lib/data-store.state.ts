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
import { IBook } from './models/book.model';
import { booksReducer, currentBookReducer } from './book/book.reducer';
import { IUser } from './models/user.model';
import { userReducer, usersReducer } from './user/user.reducer';

export const FEATURE_NAME = 'examples';

export const reducers: ActionReducerMap<AppState> = {
  orders: ordersReducer,
  router: routerReducer,
  customers: customersReducer,
  customer: customerReducer,
  currentOrder: currentOrderReducer,
  article: articleReducer,
  articles: articlesReducer,
  header: headersReducer,
  books: booksReducer,
  currentBook: currentBookReducer,
  user: userReducer,
  users: usersReducer
};

export interface AppState {
  orders: IOrder[],
  router: RouterReducerState<RouterStateUrl>,
  customers: ICustomer[],
  customer: ICustomer,
  currentOrder: IOrder,
  article: IArticle,
  articles: IArticle[],
  header: IHeader,
  books: IBook[],
  currentBook: IBook,
  users: IUser[],
  user: IUser
}
