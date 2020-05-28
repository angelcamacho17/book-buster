import { createAction, props } from '@ngrx/store';
import { OrderArticle } from '../models/order-article.model';

export const refreshOrderArticlesRequest = createAction('[Order Article] Refresh Order Articles Request');
export const refreshOrderArticlesDone = createAction('[Order Article] Refresh Order Article Done', props<{orderArticles: OrderArticle[] }>());
export const appendOrderArticleRequest = createAction('[Order Article] Append Order Article to Order Article Request', props<{orderArticle: OrderArticle }>());
export const replaceOrderArticleRequest = createAction('[Order Article] Replace Order Article in Order Article Request', props<{orderArticle: OrderArticle }>());
export const deleteOrderArticleRequest = createAction('[Order Article] Delete Order Article of Order Article Request', props<{orderArticleId: number}>());
export const editOrderArticleRequest = createAction('[Order Article] Edit Order Article Request', props<{orderArticleId: number}>());
export const cancelOrderArticle = createAction('[Order Article] Cancel Order Article');
