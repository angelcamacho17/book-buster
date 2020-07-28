import { createAction, props } from '@ngrx/store';
import { IOrder } from '../models/order.model';
import { IArticle } from '../models/article.model';
import { IOrderArticle } from '../models/order-article.model';

// App Orders
export const refreshOrdersRequest = createAction('[Order] Refresh Orders Request');
export const refreshOrdersDone = createAction('[Order] Refresh Orders Done', props<{ orders: IOrder[] }>());
export const handleOrderRequest = createAction('[Order] Handle Order Request', props<{ order: IOrder }>());
export const appendOrderRequest = createAction('[Order] Append Order Request', props<{ order: IOrder }>());
export const replaceOrderRequest = createAction('[Order] Replace Order Request', props<{ order: IOrder }>());
export const deleteOrderRequest = createAction('[Order] Delete Order Request');
export const editOrder = createAction('[Order] Edit Order', props<{ orderId: number }>());
export const cancelOrder = createAction('[Order] Cancel Order');

// Current Order
export const refreshOrderRequest = createAction('[Current Order] Refresh Order Request');
export const setCurrentOrderRequest = createAction('[Current Order] Set Current Order Done', props<{ order: IOrder }>());
export const replaceCurrentOrderRequest = createAction('[Current Order] Replace Current Order Done', props<{ order: IOrder }>());
export const clearCurrentOrderRequest = createAction('[Current Order] Clear Current Order Done');
export const getCurrentOrderRequest = createAction('[Current Order] Get Current Order Done');
export const refreshOrderDone = createAction('[Current Order] Refresh Order Done', props<{ order: IOrder }>());
export const refreshOrderSetted = createAction('[Current Order] Refresh Order Setted');
export const replaceArticlesOnCurrentOrder = createAction('[Current Order] Replace articles on Current Order', props<{ orderArticles: IOrderArticle[] }>());
