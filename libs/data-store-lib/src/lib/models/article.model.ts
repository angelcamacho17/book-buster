export interface Article {
  id?: number;
  name: string;
  description: string;
  price?: number;
}

export interface ArticleState {
  articles: Article[];
}
