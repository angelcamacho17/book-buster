import { createAction, props } from '@ngrx/store';
import { IOrder, IArticleLine } from '../models/order.model';
import { ICustomer } from '@fecommerce-workspace/data';

// App Orders
export const appendOrderRequest = createAction('[Order] Append Order Request', props<{ order: IOrder }>());

// New webservices actions
export const getOrderRequest = createAction('[Order] Get Order Request', props<{ orderId: number }>());
export const refreshOrdersRequest = createAction('[Order] Refresh Orders Request');
export const refreshOrdersDone = createAction('[Order] Refresh Orders Done', props<{ orders: IOrder[] }>());
export const createOrderRequest = createAction('[Order] Create Order Request', props<{ customer: ICustomer }>());
export const switchCustomerRequest = createAction('[Order] Edit Order Request', props<{ orderId: number, customer: ICustomer }>());
export const handleOrderRequest = createAction('[Order] Handle Order Request', props<{ order: IOrder }>());
export const deleteOrderRequest = createAction('[Order] Delete Order Request');
export const handleArticleLineRequest = createAction('[Order] Handle Order Request', props<{ orderId: number, articleLine: IArticleLine }>());
export const addArticleLineToOrderRequest = createAction('[Order] Add Article Line to Order Request', props<{ orderId: number, articleLine: IArticleLine }>());
export const editArticleLineFromOrderRequest = createAction('[Order] Edit Article Line from Order Request', props<{ orderId: number, articleLineId: number, quantity: number }>());
export const deleteArticleLineFromOrderRequest = createAction('[Order] Delete Article Line from Order Request', props<{ orderId: number, articleLineId: number }>());

// Current Order
export const refreshOrderRequest = createAction('[Current Order] Refresh Order Request');
export const setCurrentOrderRequest = createAction('[Current Order] Set Current Order Done', props<{ order: IOrder }>());
export const clearCurrentOrderRequest = createAction('[Current Order] Clear Current Order Done');
export const getCurrentOrderRequest = createAction('[Current Order] Get Current Order Done');
export const refreshOrderDone = createAction('[Current Order] Refresh Order Done', props<{ order: IOrder }>());
export const refreshOrderSetted = createAction('[Current Order] Refresh Order Setted');
export const replaceArticlesOnCurrentOrder = createAction('[Current Order] Replace articles on Current Order', props<{ orderArticles: IArticleLine[] }>());
