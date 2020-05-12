export interface Article {
  id?: number;
  name: string;
  description: string;
  price?: number;
}

export interface ArticlesState {
  articles: Article[];
}

export interface ArticleState {
  article: Article;
}
