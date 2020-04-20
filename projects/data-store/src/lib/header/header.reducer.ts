import { createReducer, on } from '@ngrx/store';
import { refresHeaderDone } from './header.actions';

export const headerReducer = createReducer<string>('',
  on(refresHeaderDone, (_, action) => action.title),
);

