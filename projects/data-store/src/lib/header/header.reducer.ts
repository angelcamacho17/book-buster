import { createReducer, on } from '@ngrx/store';
import { refresHeaderDone } from './header.actions';
import { Header } from '../models/header.model';

export const initialState: Header = {
  title: ''
};

export const headerReducer = createReducer<string>(initialState.title,
  on(refresHeaderDone, (_, action) => action.title),
);

