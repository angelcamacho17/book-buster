export interface IArticle {
  id?: number;
  name: string;
  description: string;
  price?: number;
}

export interface IArticlesState {
  articles: IArticle[];
}

export interface IArticleState {
  article: IArticle;
}
