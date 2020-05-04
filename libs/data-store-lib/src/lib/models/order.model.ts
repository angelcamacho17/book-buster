import { Article } from './article.model';
import { Customer } from './customer.model';

export interface Order {
  id?: any,
  description: string,
  amount: number,
  createdBy: string, // User
  articles: Article[],
  customer: Customer
}

export interface OrderState {
  order: Order
}
export interface OrdersState {
  orders: Order[]
}
