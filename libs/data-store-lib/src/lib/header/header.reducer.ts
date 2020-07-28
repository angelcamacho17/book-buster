import { createReducer, on } from '@ngrx/store';
import { refreshHeaderDone } from './header.actions';
import { HeaderState, Header } from '../models/header.model';

export const initialState: HeaderState = {
  header: null
};

export const headersReducer = createReducer<Header>(initialState.header,
  on(refreshHeaderDone, (_, action) => action.header),
);

