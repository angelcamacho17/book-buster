import { Article } from './article.model';

export interface Order {
  id?: any,
  descrip: string,
  articles: Article[]
}
