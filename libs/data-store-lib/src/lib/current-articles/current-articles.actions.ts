import { createAction, props } from '@ngrx/store';
import { Article } from '../models/Article.model';

export const refreshCurrentArticlesRequest = createAction('[Article] Refresh Articles Request');
export const refreshCurrentArticlesDone = createAction('[Article] Refresh Article Done', props<{articles: Article[] }>());
export const appendCurrentArticleRequest = createAction('[Article] Append Article Request', props<{article: Article }>());
export const replaceCurrentArticleRequest = createAction('[Article] Replace Article Request', props<{article: Article }>());
export const deleteCurrentArticleRequest = createAction('[Article] Delete Article Request', props<{articleId: number}>());
export const editCurrentArticle = createAction('[Article] Edit Article', props<{articleId: number}>());
export const cancelCurrentArticle = createAction('[Article] Cancel Article');
