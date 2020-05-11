export interface Article {
  id?: number;
  name: string;
  description: string;
  price?: string;
}

export interface ArticlesState {
  articles: Article[];
}

export interface ArticleState {
  article: Article;
}
