import { Article } from './article.model';

export interface OrderArticle {
    id?: number,
    article: Article,
    quantity: number
}

export interface OrderArticlesState {
    orderArticles: OrderArticle[]
}
