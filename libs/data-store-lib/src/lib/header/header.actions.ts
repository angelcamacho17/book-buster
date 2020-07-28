import { createAction, props } from '@ngrx/store';
import { IHeader } from '../models/header.model';

export const refreshHeaderRequest = createAction('[Header] Refresh Headers Request');
export const refreshHeaderDone = createAction('[Header] Refresh Header Done', props<{header: IHeader }>());
export const setHeaderRequest = createAction('[Header] Set Header Request', props<{header: IHeader }>());
