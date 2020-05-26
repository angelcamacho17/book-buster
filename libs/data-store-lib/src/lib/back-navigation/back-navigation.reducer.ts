import { createReducer, on } from '@ngrx/store';
import { BackNavigationState } from '../models/back-navigation.model';
import { refreshBackNavigationDone } from './back-navigation.actions';

export const initialState: BackNavigationState = {
    url: null
};

export const backNavigationReducer = createReducer<string>(initialState.url,
    on(refreshBackNavigationDone, (_, action) => action.url)
);

