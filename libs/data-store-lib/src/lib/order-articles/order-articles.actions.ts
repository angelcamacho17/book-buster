import { createAction, props } from '@ngrx/store';
import { OrderArticle } from '../models/order-article.model';

export const refreshOrderArticlesRequest = createAction('[Order Article] Refresh Articles Request');
export const refreshOrderArticlesDone = createAction('[Order Article] Refresh Article Done', props<{orderArticles: OrderArticle[] }>());
export const setOrderArticlesRequest = createAction('[Order Article] Set Order Articles Request', props<{orderArticles: OrderArticle[] }>());
export const appendOrderArticleRequest = createAction('[Order Article] Append Article to Order Article Request', props<{orderArticle: OrderArticle }>());
export const replaceOrderArticleRequest = createAction('[Order Article] Replace Article in Order Article Request', props<{orderArticle: OrderArticle }>());
export const deleteOrderArticleRequest = createAction('[Order Article] Delete Article of Order Article Request', props<{orderArticleId: number}>());
export const editOrderArticleRequest = createAction('[Order Article] Edit Order Article Request', props<{orderArticleId: number}>());
export const cancelOrderArticle = createAction('[Order Article] Cancel Order Article');
