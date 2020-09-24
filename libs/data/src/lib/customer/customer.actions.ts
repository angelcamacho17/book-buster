import { createAction, props } from '@ngrx/store';
import { ICustomer } from '../models/customer.model';

export const refreshCustomersRequest = createAction('[Customer] Refresh Customers Request');
export const getCustomersRequest = createAction('[Customer] Get Customers Request', props<{filter: string }>());
export const refreshCustomersDone = createAction('[Customer] Refresh Customer Done', props<{customers: ICustomer[] }>());
export const appendCustomerRequest = createAction('[Customer] Append Customer Request', props<{customer: ICustomer }>());
export const replaceCustomerRequest = createAction('[Customer] Replace Customer Request', props<{customer: ICustomer }>());
export const deleteCustomerRequest = createAction('[Customer] Delete Customer Request', props<{customerId: number}>());
export const editCustomer = createAction('[Customer] Edit Customer', props<{customerId: number}>());
export const cancelCustomer = createAction('[Customer] Cancel Customer');

export const getCustomerScannedRequest = createAction('[Customer] Get Customer Scanned Request', props<{barcode: string }>());
export const refreshScannedCustomerDone = createAction('[Customer] Get Customer Scanned Done', props<{ customer: ICustomer }>());
