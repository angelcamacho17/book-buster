import { createAction, props } from '@ngrx/store';
import { Order } from '../models/order.model';

export const refreshOrdersRequest = createAction('[Order] Refresh Orders Request');
export const refreshOrdersDone = createAction('[Order] Refresh Orders Done', props<{ orders: Order[] }>());
export const refreshOrderDone = createAction('[Order] Refresh Order Done', props<{ order: Order }>());
export const appendOrderRequest = createAction('[Order] Append Order Request', props<{ order: Order }>());
export const replaceOrderRequest = createAction('[Order] Replace Order Request', props<{ order: Order }>());
export const deleteOrderRequest = createAction('[Order] Delete Order Request', props<{ orderId: number }>());
export const orderOverviewRequest = createAction('[Order] Overview Order Request', props<{ order: Order }>());
export const editOrder = createAction('[Order] Edit Order', props<{ orderId: number }>());
export const cancelOrder = createAction('[Order] Cancel Order');
