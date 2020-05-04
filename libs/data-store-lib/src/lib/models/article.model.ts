export interface Article {
  id?: number;
  name: string;
  description: string;
  price: string;
}

export interface ArticleState {
  articles: Article[];
}