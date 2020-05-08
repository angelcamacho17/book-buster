import { Article } from './article.model';
import { Customer } from './customer.model';
import { OrderArticle } from './order-article.model';

export interface Order {
  id?: any,
  description: string,
  amount: number,
  createdBy: string,
  articles: OrderArticle[],
  customer: Customer
}

export interface OrderState {
  order: Order
}
export interface OrdersState {
  orders: Order[]
}
