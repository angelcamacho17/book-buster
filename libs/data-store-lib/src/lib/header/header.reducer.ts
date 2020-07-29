import { createReducer, on } from '@ngrx/store';
import { refreshHeaderDone } from './header.actions';
import { IHeaderState, IHeader } from '../models/header.model';

export const initialState: IHeaderState = {
  header: null
};

export const headersReducer = createReducer<IHeader>(initialState.header,
  on(refreshHeaderDone, (_, action) => action.header),
);

