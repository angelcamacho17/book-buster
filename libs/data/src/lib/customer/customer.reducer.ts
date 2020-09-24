import { createReducer, on } from '@ngrx/store';
import { refreshCustomersDone, editCustomer, cancelCustomer, refreshScannedCustomerDone } from './customer.actions';
import { ICustomerState, ICustomer, ICustomersState } from '../models/customer.model';

export const initialState: ICustomersState = {
  customers: []
};

export const initialCustomerState: ICustomerState = {
  customer: null
};

export const customersReducer = createReducer<ICustomer[]>(initialState.customers,
  on(refreshCustomersDone, (_, action) => action.customers),
);

export const customerReducer = createReducer<ICustomer>(initialCustomerState.customer,
  on(refreshScannedCustomerDone, (_, action) => action.customer)
);


