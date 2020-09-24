export interface IArticle {
  uuid?: number;
  code: string;
  name: string;
  salesPrice?: ISalesPrice;
  salesUnit?: ISalesUnit
}

export interface ISalesUnit {
  code: string,
  description: number
}

export interface ISalesPrice {
  currency: string,
  excl: number,
  incl: number,
  vat: IVat
}

export interface IVat {
  amount: number,
  code: string,
  percentage: number
}

export interface IArticlesState {
  articles: IArticle[];
}

export interface IArticleState {
  article: IArticle;
}
