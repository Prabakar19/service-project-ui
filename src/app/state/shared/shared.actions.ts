import { createAction, props } from '@ngrx/store';

export const SET_LOADING = '[SHARED] set loading';
export const SET_ERROR = '[SHARED] set error message';

export const setLoading = createAction(SET_LOADING, props<{ status: boolean }>());
export const setErrorMessage = createAction(SET_ERROR, props<{ errorMsg: string }>());
