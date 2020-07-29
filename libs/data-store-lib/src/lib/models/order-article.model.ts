import { IArticle } from './article.model';

export interface IOrderArticle {
    id?: number,
    article: IArticle,
    quantity: number
}

export interface IOrderArticlesState {
    orderArticles: IOrderArticle[]
}
