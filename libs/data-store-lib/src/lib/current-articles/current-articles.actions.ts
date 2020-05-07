import { createAction, props } from '@ngrx/store';
import { Article } from '../models/Article.model';

export const refreshArticlesRequest = createAction('[Article] Refresh Articles Request');
export const refreshArticlesDone = createAction('[Article] Refresh Article Done', props<{Articles: Article[] }>());
export const appendArticleRequest = createAction('[Article] Append Article Request', props<{Article: Article }>());
export const replaceArticleRequest = createAction('[Article] Replace Article Request', props<{Article: Article }>());
export const deleteArticleRequest = createAction('[Article] Delete Article Request', props<{articleId: number}>());
export const editArticle = createAction('[Article] Edit Article', props<{articleId: number}>());
export const cancelArticle = createAction('[Article] Cancel Article');
