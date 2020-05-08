import { createAction, props } from '@ngrx/store';
import { OrderArticle } from '../models/order-article.model';

export const refreshOrderArticlesRequest = createAction('[Article] Refresh Articles Request');
export const refreshOrderArticlesDone = createAction('[Article] Refresh Article Done', props<{orderArticles: OrderArticle[] }>());
export const appendOrderArticleRequest = createAction('[Article] Append Article to Order Article Request', props<{orderArticle: OrderArticle }>());
export const replaceOrderArticleRequest = createAction('[Article] Replace Article in Order Article Request', props<{orderArticle: OrderArticle }>());
export const deleteOrderArticleRequest = createAction('[Article] Delete Article of Order Article Request', props<{orderArticleId: number}>());
export const editOrderArticleRequest = createAction('[Article] Edit Order Article Request', props<{orderArticleId: number}>());
export const cancelOrderArticle = createAction('[Article] Cancel Order Article');
