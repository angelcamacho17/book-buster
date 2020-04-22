import { Article } from './article.model';

export interface Order {
  id?: any,
  descrip: string,
  amount: number,
  createdBy: string, //User
  articles: Article[]
}

export interface OrderState {
  orders: Order[]
}
