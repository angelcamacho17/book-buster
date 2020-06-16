import { createAction, props } from '@ngrx/store';

export const refreshBackNavigationRequest = createAction('[Back Navigation] Refresh Back Navigation Request');
export const refreshBackNavigationDone = createAction('[Back Navigation] Refresh Back Navigation Done', props<{ url: string }>());
export const appendBackNavigationRequest = createAction('[Back Navigation] Append Back Navigation Request', props<{ url: string }>());
export const changedNavigationRequest = createAction('[Back Navigation] Changed Navigation Request');
export const goBackNavigationRequest = createAction('[Back Navigation] Get Back Navigation Request');
export const switchCustomerRequest = createAction('[Back Navigation] Switch Customer Navigation Request');
