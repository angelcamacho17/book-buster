import { createAction, props } from '@ngrx/store';
import { Customer } from '../models/customer.model';

export const refreshCustomersRequest = createAction('[Customer] Refresh Customers Request');
export const refreshCustomersDone = createAction('[Customer] Refresh Customer Done', props<{customers: Customer[] }>());
export const appendCustomerRequest = createAction('[Customer] Append Customer Request', props<{customer: Customer }>());
export const replaceCustomerRequest = createAction('[Customer] Replace Customer Request', props<{customer: Customer }>());
export const deleteCustomerRequest = createAction('[Customer] Delete Customer Request', props<{customerId: number}>());
export const editCustomer = createAction('[Customer] Edit Customer', props<{customerId: number}>());
export const cancelCustomer = createAction('[Customer] Cancel Customer');
