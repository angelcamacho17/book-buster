import { createAction, props } from '@ngrx/store';
import { IArticle } from '../models/article.model';

export const refreshArticlesRequest = createAction('[Article] Refresh Articles Request');
export const refreshArticlesDone = createAction('[Article] Refresh Article Done', props<{ articles: IArticle[] }>());
export const appendArticleRequest = createAction('[Article] Append Article Request', props<{ article: IArticle }>());
export const replaceArticleRequest = createAction('[Article] Replace Article Request', props<{ article: IArticle }>());
export const deleteArticleRequest = createAction('[Article] Delete Article Request', props<{ articleId: number }>());
export const editArticle = createAction('[Article] Edit Article', props<{ articleId: number }>());

export const getArticleRequest = createAction('[Article] Get Article Request', props<{ articleId: number }>());
export const getArticleDone = createAction('[Article] Get Article Done', props<{ article: IArticle }>());
