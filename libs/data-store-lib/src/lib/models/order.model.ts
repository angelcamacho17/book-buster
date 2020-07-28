import { IArticle } from './article.model';
import { ICustomer } from './customer.model';
import { IOrderArticle } from './order-article.model';

export interface IOrder {
  id?: any,
  description: string,
  amount: number,
  createdBy: string,
  articles: IOrderArticle[],
  customer: ICustomer
}

export interface IOrderState {
  order: IOrder
}
export interface IOrdersState {
  orders: IOrder[]
}
