import { Article } from './article.model';

export interface Order {
  id?: any,
  descrip: string,
  price: number,
  createdBy: string, //User
  articles: Article[]
}

export interface OrderState {
  orders: Order[]
}
