import { createReducer, on } from '@ngrx/store';
import { IBackNavigationState } from '../models/back-navigation.model';
import { refreshBackNavigationDone } from './back-navigation.actions';

export const initialState: IBackNavigationState = {
    url: null
};

export const backNavigationReducer = createReducer<string>(initialState.url,
    on(refreshBackNavigationDone, (_, action) => action.url)
);

