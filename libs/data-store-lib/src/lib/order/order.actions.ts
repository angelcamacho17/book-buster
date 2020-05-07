import { createAction, props } from '@ngrx/store';
import { Order } from '../models/order.model';
import { Article } from '../models/article.model';

// App Orders
export const refreshOrdersRequest = createAction('[Order] Refresh Orders Request');
export const refreshOrdersDone = createAction('[Order] Refresh Orders Done', props<{ orders: Order[] }>());
export const appendOrderRequest = createAction('[Order] Append Order Request', props<{ order: Order }>());
export const replaceOrderRequest = createAction('[Order] Replace Order Request', props<{ order: Order }>());
export const deleteOrderRequest = createAction('[Order] Delete Order Request', props<{ orderId: number }>());
export const editOrder = createAction('[Order] Edit Order', props<{ orderId: number }>());
export const cancelOrder = createAction('[Order] Cancel Order');

// Current Order
export const setCurrentOrderRequest = createAction('[Current Order] Set Current Order Done', props<{ order: Order }>());
export const getCurrentOrderRequest = createAction('[Current Order] Get Current Order Done');
export const refreshOrderDone = createAction('[Current Order] Refresh Order Done', props<{ order: Order }>());
export const refreshOrderSetted = createAction('[Current Order] Refresh Order Setted');
export const appendArtsToOrdRequest = createAction('[Current Order] Edit Order', props<{ orderId: number, articles: Article[] }>());
