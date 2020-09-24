import { IArticle, ISalesPrice, ISalesUnit, IVat } from './article.model';
import { ICustomer } from './customer.model';

export interface ITotal {
  currency?: string;
  excl: number;
  incl?: number;
  vat?: IVat[];
}

export interface IOrder {
  uuid?: number;
  articlesLines?: IArticleLine[];
  created: number;
  customer: ICustomer;
  documentNr: string;
  total: ITotal;
  createdBy?: any
}

export interface IArticleLine {
  uuid?: number;
  articleId?: number;
  article: IArticle;
  lineNr?: number;
  salesPrice?: ISalesPrice;
  salesUnit?: ISalesUnit;
  total?: ISalesPrice;
  qty: number;
  modifiedByUser?: boolean;
}

export interface IOrderState {
  order: IOrder;
}
export interface IOrdersState {
  orders: IOrder[];
}
