import { createAction, props } from '@ngrx/store';

export const refresHeaderDone = createAction('[Header] Refresh Header Request', props<{title: string }>());
export const setHeaderTitleRequest = createAction('[Header] Refresh Header Done', props<{title: string }>());
